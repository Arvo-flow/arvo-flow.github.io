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

import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';
import { getKv } from '../lib/kv.js';
import { fmtNumber } from '../lib/format.js';

export const config = { maxDuration: 60 };

let _resend = null;
const getResend = () =>
  process.env.RESEND_API_KEY ? (_resend ??= new Resend(process.env.RESEND_API_KEY)) : null;
const FROM     = process.env.RESEND_FROM ?? 'Arvo Intelligence <analys@arvoflow.se>';
const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';

const MAX_PDFS_PER_MAIL  = 2;
const MAX_PDF_BYTES      = 6 * 1024 * 1024;
const RATE_LIMIT_PER_DAY = 10;

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
  const list = await fetchImpl(`https://api.resend.com/emails/receiving/${emailId}/attachments`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  if (!list.ok) {
    const body = typeof list.text === 'function' ? await list.text().catch(() => '') : '';
    throw new Error(`bilagelistning misslyckades (HTTP ${list.status}): ${body.slice(0, 300)}`);
  }
  const { data } = await list.json();

  const pdfMeta = (data ?? [])
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

/** Magic link in i kontoret — samma tabell/format som request-magic-link.mjs. */
async function mintPortalLink(db, email) {
  if (!db) return null;
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
              <p style="margin:0;font-family:${M.sans};font-size:13px;font-weight:600;color:rgba(255,255,255,0.85);">Marknadsmässigt pris — inget prisgap mot verifierat marknadspris</p>
            </td></tr>
          </table>`;

    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
      <tr><td style="background:#F6FAF8;border:1px solid ${M.hairline};border-radius:12px;padding:20px 22px;">
        <p style="margin:0 0 12px;font-family:${M.sans};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${M.muted};">${r.supplier ?? 'Leverantör'}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${r.annualCost ? rowHtml('Årskostnad i dag', `${fmtNumber(r.annualCost)} kr/år`) : ''}
          ${r.suggestedAnnualCost && r.netSaving > 0 ? rowHtml('Marknadspris, samma tjänst', `${fmtNumber(r.suggestedAnnualCost)} kr/år`, { teal: true }) : ''}
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

  // Idempotens — webhook-retries får aldrig dubbelköra analys eller dubbelsvara
  if (kv) {
    try {
      const seen = await kv.set(`inbound:done:${mailId}`, 1, { ex: 86400, nx: true });
      if (seen === null) {
        console.log(`[inbound-email] hoppar över: ${mailId} redan hanterad (idempotens)`);
        return send(res, 200, { ok: true, skipped: 'redan hanterad' });
      }
    } catch { /* non-fatal */ }
  }

  // Rate limit per avsändare
  if (kv) {
    try {
      const rk = `inbound:rate:${sha16(sender)}`;
      const n  = await kv.incr(rk);
      if (n === 1) await kv.expire(rk, 86400);
      if (n > RATE_LIMIT_PER_DAY) return send(res, 200, { ok: true, skipped: 'rate limit' });
    } catch { /* non-fatal */ }
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

  const db = getDb();
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
          email:       sender,
          userEmail:   sender,
          fingerprint: `mail:${sha16(sender)}`,
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
        results.push({ ok: false, filename,
          message: 'Fakturan kräver manuell granskning — Arvo återkommer till er per mail när analysen är verifierad.' });
      } else {
        results.push({ ok: false, filename,
          message: 'Analysen misslyckades — kontrollera att PDF:en är en leverantörsfaktura och försök igen.' });
      }
    } catch (err) {
      console.error('[inbound-email] pipeline-fel:', err.message);
      results.push({ ok: false, filename, message: 'Tekniskt fel vid analysen — försök igen om en stund.' });
    }
  }

  // Svar — ALLTID och ENBART till avsändaren
  const portalLink = await mintPortalLink(db, sender);
  const okCount    = results.filter((r) => r.ok).length;
  const subject    = buildReplySubject(results);

  try {
    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: FROM,
        to: sender,
        subject,
        html: replyHtml({ results, portalLink }),
      });
    } else {
      console.error('[inbound-email] RESEND_API_KEY saknas — svarsmail ej skickat');
    }
  } catch (err) {
    console.error('[inbound-email] svarsmail misslyckades:', err.message);
  }

  return send(res, 200, { ok: true, analyzed: okCount, total: results.length });
}
