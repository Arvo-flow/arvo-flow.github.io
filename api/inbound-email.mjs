// api/inbound-email.mjs — Ingest-arbetaren: mailen är dörren, kontoret är rummet.
//
// POST — Resend inbound-webhook (email.received). Flöde:
//   faktura-PDF mejlas/vidarebefordras in → samma pipeline som /testa-faktura
//   (via internt POST /api/test-invoice — EN pipeline, aldrig en kopia, regel 1)
//   → datapunkt i prisboken → analysen som mailsvar TILL AVSÄNDAREN med
//   magic link in i kontoret (/portfolio).
//
// Identitet: avsändaradressen (regel: svar går ENBART till avsändaren —
// ingen kan mata in någon annans fakturor och läsa resultatet).
//
// Säkerhet:
//   • Webhook-auth: ?secret=<INBOUND_WEBHOOK_SECRET> i webhook-URL:en (constant-time-jämförs)
//   • Idempotens: KV-nyckel per inbound email_id (webhook-retries dubbelkör aldrig)
//   • Rate limit: 10 mail/avsändare/dygn (KV)
//   • Endast PDF-bilagor, max 2 per mail, max ~6 MB styck
//
// Setup (engångs, dokumenterat i CLAUDE.md):
//   1. Resend → Domains → lägg till inbound-domän (MX för inbox.arvoflow.se → Resend)
//   2. Resend → Webhooks → email.received → https://arvoflow.se/api/inbound-email?secret=…
//   3. Env: INBOUND_WEBHOOK_SECRET (slumpad, samma som i webhook-URL:en)

import { LOFTEN } from '../lib/kundmeningar.js';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';
import { getKv } from '../lib/kv.js';
import { fmtNumber } from '../lib/format.js';
import { enqueueJobs, bokforAvvisade, DAGSGRANS_SKAL } from '../lib/ingest-queue.js';
import { mottagarnyckel, slaUppAdress, intagsIdentitet, gmailKod, sparaGmailKod, markeraMottagen } from '../lib/inkorgsadress.js';
import { isTestRecipient, resetTestSurfaceIfStale, TEST_EMAIL, TEST_FINGERPRINT } from '../lib/test-surface.js';

export const config = { maxDuration: 60 };

let _resend = null;
const getResend = () =>
  process.env.RESEND_API_KEY ? (_resend ??= new Resend(process.env.RESEND_API_KEY)) : null;
const FROM     = process.env.RESEND_FROM ?? 'Arvo Intelligence <analys@arvoflow.se>';
const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';

const MAX_PDFS_PER_MAIL  = 2;            // ≤ detta antal analyseras INLINE (synkront, svar med resultat).
const INLINE_LIMIT       = 2;            // > detta → ASYNK kö (bulk: 50–100 fakturor på en gång).
const MAX_BULK_PDFS      = 100;          // tak per mail i bulk-läge
const MAX_PDF_BYTES      = 6 * 1024 * 1024;
// ── TAKET RÄKNAR MAIL, INTE FAKTUROR (mätt 2026-08-24, före testkundslanseringen) ─────────────
// `kv.incr` körs EN gång per invokation, före bilage-loopen. Taket är alltså «N MAIL per
// avsändare och dygn» — och ett enda mail får bära upp till MAX_BULK_PDFS = 100 fakturor.
//
// Det upphäver den kollision bibeln bokfört («vi säljer 50–100 fakturor medan gränsen är 40»):
// en kund som vidarebefordrar hela pärmen i ETT mail förbrukar 1 av 40. Jag påstod motsatsen för
// grundaren och hade fel — läst, inte mätt.
//
// Den VERKLIGA risken är den motsatta: droppvis vidarebefordran. En kund som skickar fakturorna
// en och en medan hen går igenom mappen — minst lika naturligt som att zippa ihop dem — slår i
// väggen vid 40. Det är onboardingens vanligaste beteende, och där får produkten inte säga nej.
//
// 150 tar bort den väggen och behåller det taket faktiskt skyddar mot: en vidarebefordringsloop
// (en auto-forward-regel genererar tusentals, inte hundratals), inte budgeten.
//
// UTTALAD, OSTÄNGD LUCKA: taket bounder INTE antalet analyser. 150 mail × 100 PDF = upp till
// 15 000 analyser per avsändare och dygn, och varje analys är tre modellanrop (opus extract,
// sonnet categorize, opus recommend — kostnaden loggas som `cost_usd` per steg men har aldrig
// aggregerats). För 20 KÄNDA testkunder är exponeringen bunden av verkligheten, inte av grinden.
// Före publik lansering behövs ett tak på FAKTUROR, inte på mail. Det är ett medvetet uppskjutet
// beslut, inte ett förbisett.
const RATE_LIMIT_PER_DAY = Number(process.env.INBOUND_RATE_LIMIT_PER_DAY) || 150;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function secretOk(provided) {
  const secret = process.env.INBOUND_WEBHOOK_SECRET;
  if (!secret || !provided) return false;
  const a = Buffer.from(String(provided));
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

const sha16 = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);

// ── Bilagehämtning — Resend skickar ALDRIG innehåll i webhooken ────────────────
// email.received-payloaden innehåller bara metadata (id, filename, content_type).
// Innehållet hämtas i ett andra steg: lista bilagor → signerad download_url → bytes.
// (Designat så av Resend för stora filer i serverless-miljöer.)

export async function fetchInboundPdfs(emailId, { fetchImpl = fetch } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return [];
  const data = await listInboundAttachments(emailId, { fetchImpl });   // paginerad (en sanning, regel 1)

  const pdfMeta = data
    .filter((a) => a.content_type === 'application/pdf' || /\.pdf$/i.test(a.filename ?? ''))
    .slice(0, MAX_PDFS_PER_MAIL);

  const out = [];
  for (const a of pdfMeta) {
    const filename = a.filename ?? 'faktura.pdf';
    if (a.size > MAX_PDF_BYTES) {
      out.push({ filename, tooBig: true });
      continue;
    }
    const dl = await fetchImpl(a.download_url);
    if (!dl.ok) throw new Error(`bilagenedladdning misslyckades (HTTP ${dl.status})`);
    const buf = Buffer.from(await dl.arrayBuffer());
    out.push({ filename, content: buf.toString('base64') });
  }
  return out;
}

// Listar ALLA bilagor för ett mottaget mejl. KRITISKT: Resends listning defaultar till 20 bilagor
// (has_more=true) — den nakna endpointen tappar allt med index ≥20. Verifierat 2026-06-27 mot riktiga
// maskinen: ett 26-bilagors mejl gav bara idx 0–19; ?limit=100 gav alla 26 (has_more=false). Vi
// paginerar via offset tills has_more är false → säkert även bortom 100 (moaten: 50–100 fakturor/mejl).
export async function listInboundAttachments(emailId, { fetchImpl = fetch } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return [];
  const base = `https://api.resend.com/emails/receiving/${emailId}/attachments`;
  const all = [];
  for (let offset = 0; offset <= 5000; offset += 100) {
    const list = await fetchImpl(`${base}?limit=100&offset=${offset}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!list.ok) throw new Error(`bilagelistning misslyckades (HTTP ${list.status})`);
    const body = await list.json();
    const batch = Array.isArray(body?.data) ? body.data : [];
    all.push(...batch);
    if (!body?.has_more || batch.length === 0) break;   // sista sidan
  }
  return all;
}

// ── BULKJOBBETS BILAGA VÄLJS PÅ IDENTITET, ALDRIG PÅ POSITION (2026-09-23) ─────────────────────
// ⚠️ MÄTT I PRODUKTION, 4 AV 4: varje prövbart bulkjobb i grundarens 25-bunt analyserade en ANNAN
// leverantörs faktura än filnamnet angav (Atlassian → Securitas, Securitas → Adobe, DHL → Telenor,
// Scandic → Fortnox; scripts/probe-jobbmatchning.mjs, Actions 35821426552, med motprov).
//
// Orsaken: köaren (`api/inbound-email.mjs`, bulkgrenen) numrerade PDF:erna i WEBHOOKENS
// bilagelista och sparade filnamnet därifrån. Drainen hämtade sedan PDF nummer N ur RESENDS
// API-lista. Två listor ur två källor, ihopkopplade med ett POSITIONSNUMMER — och Resend
// returnerar dem inte i samma ordning. Jobbets etikett och jobbets innehåll kom alltså ur olika
// dokument. Raden i rummet var intern konsekvent (leverantören lästes ur den PDF som faktiskt
// analyserades), men allt som namnger en bulkfil — kundens «vi kunde inte läsa X.pdf»,
// `koa-om-fil` — pekade på fel dokument.
//
// De gamla testerna kunde aldrig se det: de matade köaren och drainen från SAMMA mocklista.
// Mekanismen prövad, matningen aldrig (femte gången: LFL 12 aug, holdings 19 aug, ...).
//
// Nu: bilagan väljs på `id` om jobbet bär ett, annars på FILNAMN — det namn kunden själv såg.
// Exakt en träff krävs. Noll eller flera är ett ÄRLIGT fel med skäl, aldrig en gissning: att falla
// tillbaka på positionen vore att återinföra precis det fel som mättes.
//
// FÅNGAR: ett jobb som skulle få en annan bilaga än den det heter · två bilagor med samma namn.
// BLIND: två PDF:er med IDENTISKT filnamn i samma mejl kan inte skiljas åt utan `id`; de vägras
//   båda med `bilaga_ej_entydig` i stället för att en av dem analyseras under fel etikett.

/**
 * Väljer jobbets bilaga ur API-listans PDF:er. Ren funktion — ingen nätverkstrafik.
 * @returns {{ bilaga: object } | { fel: 'bilaga_utan_namn' | 'bilaga_saknas' | 'bilaga_ej_entydig', antal?: number }}
 */
export function valjBilaga(pdfs = [], { filename = null, attachmentId = null } = {}) {
  if (attachmentId) {
    const viaId = pdfs.filter((a) => a?.id === attachmentId);
    if (viaId.length === 1) return { bilaga: viaId[0] };
  }
  const namn = typeof filename === 'string' ? filename.trim() : '';
  if (!namn) return { fel: 'bilaga_utan_namn' };
  const traffar = pdfs.filter((a) => String(a?.filename ?? '').trim() === namn);
  if (traffar.length === 1) return { bilaga: traffar[0] };
  return { fel: traffar.length === 0 ? 'bilaga_saknas' : 'bilaga_ej_entydig', antal: traffar.length };
}

/**
 * Hämtar ETT bulkjobbs PDF, vald på identitet (se ovan). Signerade download_url:er är färska vid
 * varje listning, så listningen görs vid analystillfället.
 * @returns {Promise<null | { fel: string, antal?: number } | { filename: string, tooBig: true } | { filename: string, content: string }>}
 */
export async function fetchInboundPdfForJob(emailId, { filename = null, attachmentId = null } = {}, { fetchImpl = fetch } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return null;
  const data = await listInboundAttachments(emailId, { fetchImpl });
  const pdfs = data.filter((a) => a.content_type === 'application/pdf' || /\.pdf$/i.test(a.filename ?? ''));
  const val = valjBilaga(pdfs, { filename, attachmentId });
  if (val.fel) return val;
  const a = val.bilaga;
  const namn = a.filename ?? 'faktura.pdf';
  if (a.size > MAX_PDF_BYTES) return { filename: namn, tooBig: true };
  const dl = await fetchImpl(a.download_url);
  if (!dl.ok) throw new Error(`bilagenedladdning misslyckades (HTTP ${dl.status})`);
  const buf = Buffer.from(await dl.arrayBuffer());
  return { filename: namn, content: buf.toString('base64') };
}

/** Magic link in i kontoret — samma tabell/format som request-magic-link.mjs. */
/** Brödtexten i ett mottaget mejl (Resend), eller null. Används bara för Gmails verifieringskod. */
/**
 * Det mottagna mejlet ur Resend (alla fält). Svarar { mejl } eller { mejl: null, skal, tillfalligt } —
 * `tillfalligt` (nätfel, tidsgräns, 429, 5xx) betyder «vet inte», och får aldrig läsas som «ingen adress» (IA-17).
 */
export async function hamtaMottaget(emailId, { fetchImpl = fetch, nyckel = process.env.RESEND_API_KEY, tidsgransMs = 8000 } = {}) {
  if (!nyckel) return { mejl: null, skal: 'ingen_nyckel', tillfalligt: false };
  if (!emailId) return { mejl: null, skal: 'inget_id', tillfalligt: false };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), tidsgransMs);
  try {
    const r = await fetchImpl(`https://api.resend.com/emails/receiving/${emailId}`, { headers: { Authorization: `Bearer ${nyckel}` }, signal: ctrl.signal });
    if (r.ok) return { mejl: await r.json(), skal: null, tillfalligt: false };
    return { mejl: null, skal: `http_${r.status}`, tillfalligt: r.status === 429 || r.status >= 500 };
  } catch (err) {
    return { mejl: null, skal: err?.name === 'AbortError' ? 'tidsgrans' : 'natfel', tillfalligt: true };
  } finally { clearTimeout(t); }
}

async function hamtaMejltext(emailId, { fetchImpl = fetch } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return null;
  try {
    const r = await fetchImpl(`https://api.resend.com/emails/receiving/${emailId}`, { headers: { Authorization: `Bearer ${key}` } });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.text ?? (j?.html ? String(j.html).replace(/<[^>]+>/g, ' ') : null);
  } catch { return null; }
}

async function mintPortalLink(db, email) {
  if (!db || !email) return null;   // en rumsadress utan bevisad ägare har ingen e-post att knyta länken till
  try {
    const token     = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
    await db`
      INSERT INTO magic_tokens (token, email, note, expires_at)
      VALUES (${token}, ${email}, ${'inbound-email-reply'}, ${expiresAt})
    `;
    return `${BASE_URL}/portfolio?magic=${token}`;
  } catch { return null; }
}

// ── Mailsvaret — analysen i mail-form, kontoret som CTA ───────────────────────
//
// E-postklienter (Gmail!) stödjer INTE flexbox/grid — allt är tabeller med
// inline-styles (Gmail-läxan: .row{display:flex} klistrade ihop etikett+belopp).
// Palett och tonalitet = theme.dossier (mörk header, teal accent, serif display).
// Regel 5: mejlets siffror och besked ska vara IDENTISKA med kontorets.

const M = {
  bg: '#F1F6F3', card: '#FFFFFF', dark: '#050B09', band: '#0B1612',
  teal: '#2BC4AC', tealBright: '#5DD6CA', ink: '#0E1A17', inkSoft: '#3A5248',
  muted: '#5B8070', faint: '#8AA89E', hairline: '#E2EDE8',
  sans: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  serif: "Georgia,'Times New Roman',serif",
};

const rowHtml = (label, value, { strong = false, teal = false } = {}) => `
  <tr>
    <td style="padding:7px 0;font-family:${M.sans};font-size:13px;color:${M.inkSoft};">${label}</td>
    <td align="right" style="padding:7px 0;font-family:${M.sans};font-size:14px;font-weight:${strong ? 700 : 600};color:${teal ? '#1B7A6E' : M.ink};white-space:nowrap;">${value}</td>
  </tr>`;

export function buildReplySubject(results) {
  const okCount = results.filter((r) => r.ok).length;
  const best = results.filter((r) => r.ok).sort((a, b) => (b.netSaving ?? 0) - (a.netSaving ?? 0))[0];
  if (best?.netSaving > 0) {
    return `Er analys: ${best.supplier ?? 'fakturan'} — ${fmtNumber(best.netSaving)} kr/år i möjlig nettobesparing`;
  }
  if (okCount > 0) {
    const names = results.filter((r) => r.ok).map((r) => r.supplier).filter(Boolean).join(', ');
    return `Er analys är klar — ${names || 'fakturan'}`;
  }
  return 'Vi kunde inte analysera ert mail';
}

export function replyHtml({ results, portalLink }) {
  const cards = results.map((r) => {
    if (!r.ok) {
      return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
        <tr><td style="background:#F6FAF8;border:1px solid ${M.hairline};border-radius:12px;padding:18px 22px;">
          <p style="margin:0 0 6px;font-family:${M.sans};font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${M.muted};">${r.filename}</p>
          <p style="margin:0;font-family:${M.sans};font-size:13px;line-height:1.6;color:${M.inkSoft};">${r.message}</p>
        </td></tr>
      </table>`;
    }

    const verdict = r.netSaving > 0
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
          <tr><td align="center" bgcolor="${M.band}" style="background:${M.band};border-radius:10px;padding:16px 18px;">
            <p style="margin:0 0 3px;font-family:${M.sans};font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Möjlig nettobesparing</p>
            <p style="margin:0;font-family:${M.serif};font-size:26px;font-weight:700;color:${M.tealBright};">+${fmtNumber(r.netSaving)} kr/år</p>
          </td></tr>
        </table>`
      : r.requiresQuote
        ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
            <tr><td align="center" bgcolor="${M.band}" style="background:${M.band};border-radius:10px;padding:14px 18px;">
              <p style="margin:0;font-family:${M.sans};font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);">Kräver offert för exakt jämförelse — öppna kontoret för nästa steg</p>
            </td></tr>
          </table>`
        : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
            <tr><td align="center" bgcolor="${M.band}" style="background:${M.band};border-radius:10px;padding:14px 18px;">
              <p style="margin:0;font-family:${M.sans};font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);">Inget byte att rekommendera — vi hittar inget verifierat pris att byta ned till</p>
            </td></tr>
          </table>`;

    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
      <tr><td style="background:#F6FAF8;border:1px solid ${M.hairline};border-radius:12px;padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${M.sans};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${M.muted};">${r.supplier ?? 'Leverantör'}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${r.annualCost ? rowHtml('Årskostnad i dag', `${fmtNumber(r.annualCost)} kr/år`) : ''}
          ${r.suggestedAnnualCost && r.netSaving > 0 ? rowHtml('Verifierat publikt listpris, samma tjänst', `${fmtNumber(r.suggestedAnnualCost)} kr/år`, { teal: true }) : ''}
        </table>
        ${verdict}
      </td></tr>
    </table>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${M.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${M.bg}" style="background:${M.bg};">
    <tr><td align="center" style="padding:36px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${M.card};border-radius:16px;overflow:hidden;border:1px solid ${M.hairline};">
        <tr><td bgcolor="${M.dark}" style="background:${M.dark};padding:30px 34px 26px;">
          <p style="margin:0 0 12px;font-family:${M.sans};font-size:11px;font-weight:700;letter-spacing:0.42em;color:${M.tealBright};">ARVO</p>
          <p style="margin:0;font-family:${M.serif};font-size:25px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;">Er analys är klar.</p>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,${M.teal} 35%,${M.tealBright} 50%,${M.teal} 65%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:26px 30px 8px;">
          ${cards}
          ${portalLink ? `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 6px;">
            <tr><td align="center">
              <a href="${portalLink}" style="display:inline-block;background:linear-gradient(140deg,#4ECDC4 0%,#1DB09A 52%,#178A7B 100%);background-color:#1DB09A;color:#FFFFFF;text-decoration:none;font-family:${M.sans};font-size:15px;font-weight:700;padding:15px 38px;border-radius:100px;">Öppna ert Arvo-kontor&nbsp;→</a>
            </td></tr>
            <tr><td align="center" style="padding-top:10px;">
              <p style="margin:0;font-family:${M.sans};font-size:12px;line-height:1.6;color:${M.faint};">Hela analysen, er historik och er bevakning — länken är personlig och gäller 24 timmar.</p>
            </td></tr>
          </table>` : ''}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0;border-top:1px solid ${M.hairline};">
            <tr><td style="padding:16px 2px 18px;">
              <p style="margin:0;font-family:${M.sans};font-size:12.5px;line-height:1.65;color:${M.faint};"><strong style="color:${M.inkSoft};">Gör Arvo permanent:</strong> sätt en vidarebefordringsregel för era leverantörsfakturor till den här adressen, så analyserar Arvo varje ny faktura automatiskt — och hör av sig bara när något är fel prissatt.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:16px 30px;border-top:1px solid ${M.hairline};">
          <p style="margin:0;font-family:${M.sans};font-size:11px;line-height:1.6;color:#9AADA8;text-align:center;">Svaret skickas alltid och enbart till avsändaradressen · Arvo läser bara det ni skickar hit · arvoflow.se</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// Bulk-kvittot — när en kund matar in många fakturor: svara DIREKT att vi tog emot dem och att
// kontoret fylls medan analyserna körs (regel 9: löftet bärs av kön + drain-cronen, inte tomt prat).
export function bulkReceivedHtml({ count, portalLink }) {
  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${M.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${M.bg}" style="background:${M.bg};">
    <tr><td align="center" style="padding:36px 14px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${M.card};border-radius:16px;overflow:hidden;border:1px solid ${M.hairline};">
        <tr><td bgcolor="${M.dark}" style="background:${M.dark};padding:30px 34px 26px;">
          <p style="margin:0 0 12px;font-family:${M.sans};font-size:11px;font-weight:700;letter-spacing:0.42em;color:${M.tealBright};">ARVO</p>
          <p style="margin:0;font-family:${M.serif};font-size:25px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;">Vi tog emot ${count} fakturor.</p>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,transparent 0%,${M.teal} 35%,${M.tealBright} 50%,${M.teal} 65%,transparent 100%);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:26px 30px 8px;">
          <p style="margin:0 0 18px;font-family:${M.sans};font-size:14px;line-height:1.65;color:${M.inkSoft};">Arvo analyserar dem nu, en i taget mot verifierat publikt listpris. <strong>Ert kontor fylls i takt med att de blir klara</strong> — håll det öppet så ser ni varje fynd landa.</p>
          ${portalLink ? `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 6px;">
            <tr><td align="center">
              <a href="${portalLink}" style="display:inline-block;background:linear-gradient(140deg,#4ECDC4 0%,#1DB09A 52%,#178A7B 100%);background-color:#1DB09A;color:#FFFFFF;text-decoration:none;font-family:${M.sans};font-size:15px;font-weight:700;padding:15px 38px;border-radius:100px;">Öppna ert Arvo-kontor&nbsp;→</a>
            </td></tr>
            <tr><td align="center" style="padding-top:10px;">
              <p style="margin:0;font-family:${M.sans};font-size:12px;line-height:1.6;color:${M.faint};">Länken är personlig och gäller 24 timmar.</p>
            </td></tr>
          </table>` : ''}
        </td></tr>
        <tr><td style="padding:16px 30px;border-top:1px solid ${M.hairline};">
          <p style="margin:0;font-family:${M.sans};font-size:11px;line-height:1.6;color:#9AADA8;text-align:center;">Svaret skickas alltid och enbart till avsändaradressen · arvoflow.se</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });

  const url = new URL(req.url, 'http://x');
  if (!secretOk(url.searchParams.get('secret'))) {
    return send(res, 401, { error: 'unauthorized' });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch { return send(res, 400, { error: 'ogiltig JSON' }); }

  if (body.type !== 'email.received') {
    console.log(`[inbound-email] hoppar över event av typ '${body.type}'`);
    return send(res, 200, { ok: true, skipped: body.type });
  }
  const data = body.data ?? {};

  const sender = (Array.isArray(data.from) ? data.from[0]?.email ?? data.from[0] : data.from?.email ?? data.from)
    ?.toString().trim().toLowerCase();
  if (!sender || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sender)) {
    console.log('[inbound-email] hoppar över: ogiltig avsändare');
    return send(res, 200, { ok: true, skipped: 'ogiltig avsändare' });
  }

  const kv = getKv();
  const mailId = data.email_id ?? data.id ?? sha16(JSON.stringify(data).slice(0, 2000));

  // ── EN PÅBÖRJAD BEHANDLING ÄR INTE EN AVSLUTAD (2026-08-24) ────────────────────────────────
  // Nyckeln hette `inbound:done:` och sattes HÄR — i samma sekund mejlet togs EMOT. Dör
  // invokationen efter det men före svaret (maxDuration 60 s, två inline-analyser utan egen
  // timeout), avvisas Resends omleverans som «redan hanterad». Fakturan är borta, kunden får
  // aldrig något svarsmail, och loggraden är identisk med den för en äkta dubblett — ett värde
  // som betyder «påbörjat» lagrat på en plats som läses som «avslutat».
  //
  // Nu två nycklar med skilda innebörder:
  //   inbound:done:<id>     — satt EFTER att svaret gått iväg. Bara den avvisar en omleverans.
  //   inbound:started:<id>  — satt här, kort TTL. Fångar den ÄKTA samtidiga dubbletten (Resend
  //                           levererar om inom sekunder) utan att göra ett krascharv permanent.
  // En omleverans efter att `started` löpt ut kör alltså om analysen. Det är rätt avvägning:
  // en dubbelanalys kostar ett API-anrop och dedupas på pdf_hash i invoice-store; en tappad
  // faktura kostar kundens förtroende och syns aldrig. (Rate-limit-grenen valde redan samma
  // sida: «vi säger hellre ifrån än låter en faktura försvinna tyst».)
  const STARTED_TTL_S = 120;
  if (kv) {
    try {
      const klar = await kv.get(`inbound:done:${mailId}`);
      if (klar) {
        console.log(`[inbound-email] hoppar över: ${mailId} redan SLUTFÖRT (idempotens)`);
        return send(res, 200, { ok: true, skipped: 'redan hanterad' });
      }
      const pagar = await kv.set(`inbound:started:${mailId}`, 1, { ex: STARTED_TTL_S, nx: true });
      if (pagar === null) {
        console.log(`[inbound-email] hoppar över: ${mailId} PÅGÅR redan (samtidig leverans)`);
        return send(res, 200, { ok: true, skipped: 'pågår redan' });
      }
    } catch { /* non-fatal */ }
  }
  // Markerar SLUTFÖRT. Anropas på varje väg som faktiskt svarat kunden — aldrig i en catch som
  // inte hann svara, för då vore vi tillbaka i att ett avbrott ser ut som ett avslut.
  const markeraSlutfort = async () => {
    if (!kv) return;
    try { await kv.set(`inbound:done:${mailId}`, 1, { ex: 86400 }); } catch { /* non-fatal */ }
  };

  // ── RUMMETS ADRESS: MOTTAGAREN ÄR IDENTITETEN (grundarorder 2026-09-24, lib/inkorgsadress.js) ──
  // Ett mejl till faktura+<nyckel>@inbox.arvoflow.se tillhör adressens rum — oavsett vem som skickade
  // det. Avsändaren kan vara en kollega eller leverantören själv, och får då aldrig vare sig identiteten
  // eller svaret (IA-03/IA-04). Avgörs FÖRE rate limit: en leverantör som skickar till tio kunder är tio
  // rum, inte en avsändare.
  // Webhookens fält först; hittas ingen rumsadress där läses det mottagna mejlet ur Resend, eftersom en
  // vidarebefordran bär kundens egen adress i To och rumsadressen bara i kuvert/leveransrubrik (IA-14).
  let traff = mottagarnyckel(data);
  if (!traff) {
    const hamtat = await hamtaMottaget(data.email_id ?? data.id);
    // «Kunde inte läsa» är inte «ingen rumsadress»: ett tillfälligt fel hade skickat en vidarebefordran till
    // avsändarens (leverantörens) rum och svaret till leverantören. Svara 500 och släpp startnyckeln så
    // Resend levererar om (IA-17). Ett definitivt 4xx eller en saknad nyckel läses som webhookens data.
    if (hamtat.tillfalligt) {
      console.error(`[inbound-email] mottaget mejl kunde inte läsas (${hamtat.skal}) — Resend får leverera om`);
      if (kv) { try { await kv.del(`inbound:started:${mailId}`); } catch { /* non-fatal */ } }
      return send(res, 500, { error: 'mottaget mejl kunde inte läsas' });
    }
    if (hamtat.skal) console.warn(`[inbound-email] mottaget mejl lästes inte (${hamtat.skal}) — webhookens fält gäller`);
    traff = mottagarnyckel(hamtat.mejl);
  }
  const adressnyckel = traff?.nyckel ?? null;
  if (traff) console.log(`[inbound-email] rumsadress i fältet ${traff.falt}`);
  let adress = null;
  if (adressnyckel) {
    const dbA = getDb();
    let rad;
    try {
      if (!dbA) throw new Error('ingen databas');
      rad = await slaUppAdress(dbA, adressnyckel);
    } catch (err) {
      // OKÄNT ÄR INTE «OKÄND ADRESS». Svara 500 så Resend levererar om — och släpp startnyckeln, annars
      // avvisas omleveransen som «pågår redan» och mejlet är borta för alltid.
      console.error('[inbound-email] adressuppslag misslyckades:', err.message);
      if (kv) { try { await kv.del(`inbound:started:${mailId}`); } catch { /* non-fatal */ } }
      return send(res, 500, { error: 'adressuppslag misslyckades' });
    }
    adress = intagsIdentitet({ nyckel: adressnyckel, rad, avsandare: sender });
    if (adress.lage === 'okand_adress') {
      console.log(`[inbound-email] okänd rumsadress från=${sha16(sender)} — analyseras inte`);
      try {
        const resend = getResend();
        if (resend) {
          await resend.emails.send({
            from: FROM, to: sender,
            subject: 'Adressen är inte kopplad till något rum hos Arvo',
            html: `<p>Hej,</p><p>Mejlet skickades till en Arvo-adress som inte är kopplad till något rum.
<strong>Inget analyserades och inget sparades.</strong> Kontrollera adressen i ert rum och skicka igen.</p><p>— Arvo</p>`,
          });
        }
      } catch (err) { console.error('[inbound-email] besked om okänd adress misslyckades:', err.message); }
      await markeraSlutfort();
      return send(res, 200, { ok: true, skipped: 'okänd rumsadress' });
    }
    // GMAILS VERIFIERINGSMEJL: kunden har lagt till adressen som vidarebefordran i Gmail, och Gmail
    // skickar en kod hit. Koden visas i kundens rum (api/inkorgsadress), så hen slipper leta. Mejlet
    // analyseras inte och besvaras inte. Koden och Gmail-kontots adress skrivs aldrig i loggen.
    if (sender === 'forwarding-noreply@google.com') {
      let kod = gmailKod({ avsandare: sender, amne: data.subject });
      if (!kod) kod = gmailKod({ avsandare: sender, text: await hamtaMejltext(data.email_id ?? data.id) });
      if (kod) {
        try {
          await sparaGmailKod(dbA, adressnyckel, kod);
          console.log('[inbound-email] Gmail-verifieringskod fångad för en rumsadress');
        } catch (err) {
          // Koden kunde inte sparas: markera INTE slutfört — omleveransen ska få försöka igen.
          console.error('[inbound-email] Gmail-koden kunde inte sparas:', err.message);
          if (kv) { try { await kv.del(`inbound:started:${mailId}`); } catch { /* non-fatal */ } }
          return send(res, 500, { error: 'gmail-koden kunde inte sparas' });
        }
      } else {
        console.warn('[inbound-email] mejl från Gmails vidarebefordran utan igenkänd kod — formen stämmer inte med IA-06');
      }
      await markeraSlutfort();
      return send(res, 200, { ok: true, gmailKod: Boolean(kod) });
    }
    await markeraMottagen(dbA, adressnyckel);
  }
  // Svaret går till adressens ägare (eller ingen) på en rumsadress — till avsändaren på gamla vägen.
  const svaraTill = adress ? adress.svaraTill : sender;

  // Rate limit per avsändare — per rumsadress när mejlet gick dit
  if (kv) {
    try {
      const rk = adress ? `inbound:rate:adress:${adressnyckel}` : `inbound:rate:${sha16(sender)}`;
      const n  = await kv.incr(rk);
      if (n === 1) await kv.expire(rk, 86400);
      if (n > RATE_LIMIT_PER_DAY) {
        // ── EN TAPPAD FAKTURA MÅSTE KUNDEN FÅ VETA OM (obduktion 2026-08-20) ────────────────
        // Raden returnerade tyst 200: ingen logg, inget svarsmail. En kund som vidarebefordrade
        // sin bunt och passerade taket fick ABSOLUT TYSTNAD. Hen tror att Arvo tagit emot dem;
        // Arvo tror att ingenting hänt. Fakturorna är borta.
        //
        // Det är den tysta tappen i ytterdörren — samma klass som bokföringsplikten finns för att
        // stoppa, men värre: här är det kunden som gjort allt rätt.
        //
        // Och taket krockar med löftet: vi säljer bulk-intaget som "50–100 fakturor på en gång"
        // medan gränsen är 40 per dygn. Den kollisionen är designad, inte olycklig — men den får
        // aldrig lösas med tystnad.
        console.warn(`[inbound-email] RATE LIMIT för ${sha16(sender)}: ${n} > ${RATE_LIMIT_PER_DAY} — svarar avsändaren`);
        let varnad = false;
        // En rumsadress har ett rum: varje PDF bokförs där FÖRST, med skälet «dagsgränsen» — så att den syns
        // och kan köras om med «Försök igen» även när adressen saknar ägare att mejla (IA-13), och så att
        // mejlet nedan kan säga samma sak som rummet (regel 5, IA-15).
        let bokfort = 0;
        if (adress) {
          const pdfer = (data.attachments ?? []).filter((a) => a.content_type === 'application/pdf' || /\.pdf$/i.test(a.filename ?? ''));
          bokfort = await bokforAvvisade(pdfer.slice(0, MAX_BULK_PDFS).map((a, idx) => ({
            emailId: mailId, sender, filename: a.filename ?? `faktura-${idx + 1}.pdf`, attachmentIndex: idx,
            fingerprint: adress.fingerprint, agareEpost: adress.userEmail ?? null,
          })), DAGSGRANS_SKAL) ?? 0;
          if (bokfort > 0) varnad = true;
        }
        const iRummet = bokfort > 0;
        try {
          const resend = getResend();
          if (resend && svaraTill) {
            await resend.emails.send({
              from: FROM,
              to: svaraTill,
              subject: iRummet ? 'Dagsgränsen är nådd — fakturorna väntar i ert rum' : 'Vi tog inte emot det här mejlet — dagsgränsen är nådd',
              html: iRummet ? `<p>Hej,</p>
<p>Er adress har tagit emot ${RATE_LIMIT_PER_DAY} mejl det senaste dygnet, vilket är vår nuvarande gräns.
<strong>Fakturorna i det här mejlet har därför inte analyserats än.</strong> De ligger i ert rum,
markerade som mottagna efter dagsgränsen.</p>
<p>Tryck «Försök igen» i rummet så analyserar vi dem. Inget nytt mejl behövs.</p>
<p>— Arvo</p>` : `<p>Hej,</p>
<p>Vi har tagit emot ${RATE_LIMIT_PER_DAY} fakturor från er adress det senaste dygnet, vilket är
vår nuvarande gräns. <strong>Det här mejlet analyserades därför inte</strong> — vi har det inte,
och ni behöver skicka om det.</p>
<p>Vidarebefordra det igen om ett dygn, eller svara på det här mejlet så höjer vi gränsen för er.</p>
<p>Vi säger hellre ifrån än låter en faktura försvinna tyst.</p>
<p>— Arvo</p>`,
            });
            varnad = true;
          } else {
            console.error(`[inbound-email] RATE LIMIT: ${svaraTill ? 'RESEND_API_KEY saknas' : 'adressen saknar ägare'} — ingen kunde varnas per mejl`);
          }
        } catch (err) {
          console.error('[inbound-email] RATE LIMIT: varningsmail misslyckades:', err.message);
        }
        // ── «KUNDEN ÄR BESVARAD» VAR ETT PÅSTÅENDE KODEN INTE HÖLL (2026-08-24) ──────────────
        // Min egen kommentar intygade att varningsmailet gått iväg — men både den saknade
        // API-nyckeln och ett kastande utskick faller hit. Då markerade vi ÄNDÅ mejlet som
        // slutfört, vilket gör Resends omleverans till en tyst dubblett: kunden får varken
        // analys eller besked, för alltid. Och svaret påstod `avsandareVarnad: true`.
        // Slutfört betyder «kunden vet något» — annars ska omleveransen få försöka igen.
        if (varnad) await markeraSlutfort();
    return send(res, 200, { ok: true, skipped: 'rate limit', avsandareVarnad: varnad });
      }
    } catch { /* non-fatal */ }
  }

  const db = getDb();

  // ── TESTYTA: mail till test-mottagaradress → isolerad testidentitet, auto-nollställs per pass ──
  // Lagras på TEST_EMAIL (ej avsändaren) så riktig kunddata aldrig rörs. Svar går ändå till avsändaren.
  const testMode = !adress && isTestRecipient(data.to);
  const identityEmail = adress ? adress.userEmail : testMode ? TEST_EMAIL : sender;
  const identityFp = adress ? adress.fingerprint : testMode ? TEST_FINGERPRINT : `mail:${sha16(sender)}`;
  if (testMode) {
    const { reset, deleted } = await resetTestSurfaceIfStale();
    console.log(`[inbound-email] TESTYTA: ${reset ? `nollställde ${deleted} rader (nytt pass)` : 'samma pass (ingen nollställning)'}`);
  }

  // ── BULK-läge: >2 PDF:er → köa + svara direkt, drain-cronen betar av (moaten: 50–100 på en gång) ──
  // Serverless kan inte analysera 100 PDF:er i ETT 60s-anrop. Vi köar ett jobb per PDF (snabbt) och
  // svarar "vi tog emot N — kontoret fylls medan vi kör". api/cron/drain-ingest analyserar dem.
  const pdfAtts = (data.attachments ?? [])
    .filter((a) => a.content_type === 'application/pdf' || /\.pdf$/i.test(a.filename ?? ''));
  if (pdfAtts.length > INLINE_LIMIT) {
    // Overflow bortom taket får ALDRIG tappas tyst (regel 9). Med pagineringen läser vi alla bilagor,
    // men vår egen kö-cap är MAX_BULK_PDFS — överskottet redovisas, aldrig svaldas.
    const overflow = Math.max(0, pdfAtts.length - MAX_BULK_PDFS);
    if (overflow > 0) console.warn(`[inbound-email] BULK overflow: ${pdfAtts.length} PDF:er > tak ${MAX_BULK_PDFS} — ${overflow} ej köade (be kunden dela upp)`);
    const jobs = pdfAtts.slice(0, MAX_BULK_PDFS).map((a, idx) => ({
      emailId: mailId, sender: adress ? sender : identityEmail, filename: a.filename ?? `faktura-${idx + 1}.pdf`, attachmentIndex: idx,
      // Rumsadressens identitet följer jobbet genom kön (jobbIdentitet i lib/ingest-queue.js).
      fingerprint: adress?.fingerprint ?? null, agareEpost: adress?.userEmail ?? null,
    }));
    const added = await enqueueJobs(jobs);
    // Sparka igång drainen DIREKT (best-effort) så bulken börjar analyseras inom sekunder i stället
    // för att vänta upp till en cron-tick. Vi väntar inte in hela körningen — bara att den startar
    // (AbortController efter 1,5s; drain-invokationen körs vidare server-side även om vi släpper den).
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 1500);
      await fetch(`${BASE_URL}/api/cron/drain-ingest`, {
        method: 'POST',
        headers: process.env.CRON_SECRET ? { Authorization: `Bearer ${process.env.CRON_SECRET}` } : {},
        signal: ctrl.signal,
      }).catch(() => {});                 // timeout/abort är väntat — drainen rullar vidare
      clearTimeout(t);
    } catch { /* best-effort kick, kön betas av av cronen oavsett */ }
    const portalLink = await mintPortalLink(db, identityEmail);
    try {
      const resend = getResend();
      if (resend && svaraTill) {
        await resend.emails.send({
          from: FROM, to: svaraTill,
          subject: `Vi tog emot ${added} fakturor — Arvo analyserar dem nu`,
          html: bulkReceivedHtml({ count: added, portalLink }),
        });
      } else {
        console.error('[inbound-email] RESEND_API_KEY saknas — bulk-kvitto ej skickat');
      }
    } catch (err) { console.error('[inbound-email] bulk-kvitto misslyckades:', err.message); }
    console.log(`[inbound-email] BULK från=${sha16(sender)}: köade ${added}/${pdfAtts.length} jobb`);
    await markeraSlutfort();            // jobben ligger i kön och kvittot är skickat — arbetet ÄR utfört
  return send(res, 200, { ok: true, mode: 'async', queued: added });
  }

  // Inline-innehåll om Resend någonsin skickar det — annars hämtas via Attachments-API:t
  // (webhooken innehåller ALDRIG innehåll i dag, bara metadata — Resend-designval).
  let pdfs = (data.attachments ?? [])
    .filter((a) => (a.content_type === 'application/pdf' || /\.pdf$/i.test(a.filename ?? '')) && a.content)
    .slice(0, MAX_PDFS_PER_MAIL);

  if (pdfs.length === 0 && (data.attachments ?? []).length > 0) {
    // Prova båda id-fälten — payload-varianter har förekommit (email_id vs id)
    const candidateIds = [...new Set([data.email_id, data.id].filter(Boolean))];
    let lastErr = null;
    for (const id of candidateIds) {
      try {
        pdfs = await fetchInboundPdfs(id);
        lastErr = null;
        break;
      } catch (err) { lastErr = err; }
    }
    if (lastErr) {
      console.error(
        '[inbound-email] bilagehämtning misslyckades:', lastErr.message,
        '· data-nycklar:', Object.keys(data).join(','),
        '· id-kandidater:', candidateIds.map(i => String(i).slice(0, 40)).join(' | ') || '(inga)',
        '· bilaga0-nycklar:', Object.keys(data.attachments?.[0] ?? {}).join(','),
      );
    }
  }
  console.log(`[inbound-email] från=${sha16(sender)} bilagor=${(data.attachments ?? []).length} pdf=${pdfs.length}`);

  const results = [];

  if (pdfs.length === 0) {
    results.push({ ok: false, filename: 'Ingen faktura hittades',
      message: 'Vi hittade ingen PDF-bilaga i ert mail. Vidarebefordra fakturan med PDF:en bifogad så analyserar Arvo den inom ett par minuter.' });
  }

  for (const att of pdfs) {
    const filename = att.filename ?? 'faktura.pdf';
    try {
      if (att.tooBig) {
        results.push({ ok: false, filename, message: 'Filen är större än 6 MB — mejla en mindre version.' });
        continue;
      }
      const pdfBase64 = att.content;
      if (Buffer.byteLength(pdfBase64, 'base64') > MAX_PDF_BYTES) {
        results.push({ ok: false, filename, message: 'Filen är större än 6 MB — mejla en mindre version.' });
        continue;
      }
      // EN pipeline (regel 1): internt anrop till samma analys som /testa-faktura.
      // Syntetisk fingerprint per avsändare så historiken hänger ihop i kontoret.
      const r = await fetch(`${BASE_URL}/api/test-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          industry:    'ovrigt',           // okänd vid mail-in — förfinas i kontoret
          employees:   10,
          bypass:      process.env.ARVO_BYPASS_SECRET,
          email:       identityEmail,
          userEmail:   identityEmail,
          fingerprint: identityFp,
          // industry/employees ovan är ANTAGNA, inte avlästa — flaggan hindrar att de skrivs
          // till prisboken som om de vore observerade (regel 3). Analysen och kundens svar rörs inte.
          segmentOkant: true,
        }),
      });
      const a = await r.json().catch(() => null);

      if (a?.ok && a.route === 'auto') {
        // OBS: API-svaret exponerar netSaving/grossSaving — INTE savingPerYear.
        // (Fältläxan: fel fältnamn → alltid 0 → "inget prisgap" bredvid två olika priser.)
        results.push({
          ok: true, filename,
          supplier:            a.extracted?.supplier ?? null,
          annualCost:          a.extracted?.annualCost ?? null,
          suggestedAnnualCost: a.recommendation?.suggestedAnnualCost ?? null,
          netSaving:           a.recommendation?.netSaving ?? 0,
          requiresQuote:       a.recommendation?.requiresQuote ?? false,
        });
      } else if (a?.ok) {
        // Här stod «Arvo återkommer till er per mail när analysen är verifierad» — för varje rutt som
        // inte prissattes, även bevakade avtal och fakturor utanför vårt område. Ingen utskicksväg
        // mejlar tillbaka efter en granskning. Rummet visar varje sådan faktura med sitt skäl (KM-05).
        results.push({ ok: false, filename,
          message: a.route === 'monitoring'
            ? 'Avtalet är tidsbundet och står under bevakning i ert rum, med sin avtalsklocka.'
            : `Vi prissätter inte den här fakturan automatiskt. ${LOFTEN.skalIRummet.text}` });
      } else {
        results.push({ ok: false, filename,
          message: 'Analysen misslyckades — kontrollera att PDF:en är en leverantörsfaktura och försök igen.' });
      }
    } catch (err) {
      console.error('[inbound-email] pipeline-fel:', err.message);
      results.push({ ok: false, filename, message: 'Tekniskt fel vid analysen — försök igen om en stund.' });
    }
  }

  // Svar — till avsändaren på gamla vägen, till adressens ägare på en rumsadress, och annars till ingen:
  // rummet visar varje analys, och en leverantör som skickat sin egen faktura ska aldrig få vår analys.
  const portalLink = await mintPortalLink(db, identityEmail);
  const okCount    = results.filter((r) => r.ok).length;
  const subject    = buildReplySubject(results);

  try {
    const resend = getResend();
    if (resend && svaraTill) {
      await resend.emails.send({
        from: FROM,
        to: svaraTill,
        subject,
        html: replyHtml({ results, portalLink }),
      });
    } else {
      console.error('[inbound-email] RESEND_API_KEY saknas — svarsmail ej skickat');
    }
  } catch (err) {
    console.error('[inbound-email] svarsmail misslyckades:', err.message);
  }

  await markeraSlutfort();            // svarsmailet har gått iväg — först NU är mejlet slutbehandlat
  return send(res, 200, { ok: true, analyzed: okCount, total: results.length });
}
