// api/quote-request.mjs
// Tar emot offertleads från "Kräver offert"-blocket.
// 1. Genererar en copy-paste-ready RFQ-email via Claude Haiku
// 2. Skickar bekräftelse till kunden
// 3. Skickar internt larm till Arvo med all data + färdig RFQ-draft
// 4. Lagrar lead i Postgres quote_requests

import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';

const FROM_ALERT = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const ALERT_TO   = process.env.ARVO_ALERT_EMAIL ?? 'team@arvo-flow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// ── RFQ-generering via Claude Haiku ──────────────────────────────────────────
async function generateRfq({ contactCompany, supplier, extractedData }) {
  const client = new Anthropic();

  const fixedLines = (extractedData?.lineItems ?? [])
    .filter((l) => l.type === 'recurring_subscription')
    .map((l) => `- ${l.description}: ${(l.amount ?? 0).toLocaleString('sv-SE')} kr/mån`)
    .join('\n');

  const variableLines = (extractedData?.lineItems ?? [])
    .filter((l) => l.type === 'variable_usage')
    .map((l) => {
      const qty = l.quantity != null ? `${Number(l.quantity).toLocaleString('sv-SE')} sidor` : '';
      const unit = l.unitPrice != null ? ` à ${l.unitPrice} kr/sida` : '';
      return `- ${l.description}${qty ? ': ' + qty : ''}${unit} = ${(l.amount ?? 0).toLocaleString('sv-SE')} kr/mån`;
    })
    .join('\n');

  const company = contactCompany || 'vår kund';

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    system: `Du är inköpskonsult på Arvo Flow och kontaktar leverantörer å kunders vägnar.

Skriv en komplett, kliniskt formaterad email-draft som är redo att skickas direkt.

Format (följ exakt):
Till: [ange leverantörens e-postadress]
Ämne: [passande ämne]

[brödtext på professionell affärssvenska]

Med vänliga hälsningar,
Arvo Flow — Inköpsavdelningen

KRITISKT: Skriv ENBART emailen. Noll meta-kommentarer, noll förklaringar, ingen inledning som "Här är ett förslag". Första raden ska vara "Till:".
Till-raden ska ALLTID vara exakt: "Till: [ange leverantörens e-postadress]" — du vet inte vilken leverantör vi kontaktar.
Formulera listan med "Vi tar nu in konkurrerande offerter för vår klients räkning och ber er specificera följande:" som intro till kravpunkterna.`,
    messages: [{
      role: 'user',
      content: `Skriv offertförfrågan för skrivarleasing/Managed Print.

Kund vi representerar: ${company}
Nuvarande leverantör: ${supplier}

Fasta avgifter per månad:
${fixedLines || '- Se bifogad specifikation'}

Rörliga klickkostnader per månad:
${variableLines || '- Se bifogad specifikation'}

Kravpunkter att specificera:
1. Fast maskinhyra/leasingavgift (kr/mån)
2. Klickpris per sida: svartvit och färg (SEK)
3. Inkluderade tjänster (service, toner, support-SLA)
4. Bindningstid och uppsägningstid

Avslutningsdatum för svar: ${new Date(Date.now() + 5 * 86400000).toLocaleDateString('sv-SE')}.`,
    }],
  });

  return msg.content[0].text.trim();
}

// ── Fullmakts-version (bumpa vid textändring) ─────────────────────────────────
const FULLMAKT_VERSION = 'v1-2026-05-19';
const FULLMAKT_TEXT    = 'Jag ger Arvo Flow fullmakt att begära in, sammanställa och presentera offerter från leverantörer å mitt bolags vägnar.';

// ── Mandate-loggning ──────────────────────────────────────────────────────────
async function storeMandateLog({ email, company, ipAddress }) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      CREATE TABLE IF NOT EXISTS mandate_log (
        id               SERIAL PRIMARY KEY,
        email            TEXT NOT NULL,
        company          TEXT,
        ip_address       TEXT,
        fullmakt_version TEXT NOT NULL,
        fullmakt_text    TEXT NOT NULL,
        created_at       TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await db`
      INSERT INTO mandate_log (email, company, ip_address, fullmakt_version, fullmakt_text)
      VALUES (${email}, ${company ?? null}, ${ipAddress ?? null}, ${FULLMAKT_VERSION}, ${FULLMAKT_TEXT})
    `;
  } catch (err) {
    console.error('[quote-request] storeMandateLog error:', err.message);
  }
}

// ── Postgres-lagring ──────────────────────────────────────────────────────────
async function storeQuoteRequest({ contactEmail, contactName, contactCompany, supplier, annualCost, variableCharges, rfqDraft }) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id               SERIAL PRIMARY KEY,
        contact_email    TEXT NOT NULL,
        contact_name     TEXT,
        contact_company  TEXT,
        supplier         TEXT,
        annual_cost      INTEGER,
        variable_charges INTEGER,
        rfq_draft        TEXT,
        created_at       TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    await db`
      INSERT INTO quote_requests
        (contact_email, contact_name, contact_company, supplier, annual_cost, variable_charges, rfq_draft)
      VALUES
        (${contactEmail}, ${contactName ?? null}, ${contactCompany ?? null},
         ${supplier ?? null}, ${annualCost ?? null}, ${variableCharges ?? null}, ${rfqDraft})
    `;
  } catch (err) {
    console.error('[quote-request] storeQuoteRequest error:', err.message);
  }
}

// ── SVG-logo (inline, email-safe) ─────────────────────────────────────────────
function logoSvg(id, size = 28) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="display:block"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#${id})" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;
}

// ── Email till kunden ─────────────────────────────────────────────────────────
function buildCustomerEmail({ contactName, supplier, annualCost, variableCharges }) {
  const firstName = contactName ? contactName.split(' ')[0] : null;
  const heroLine  = firstName ? `Vi tar det härifrån, ${firstName}` : 'Vi tar det härifrån';
  const ac = annualCost      != null ? annualCost.toLocaleString('sv-SE')      + ' kr' : '–';
  const vc = variableCharges != null ? variableCharges.toLocaleString('sv-SE') + ' kr' : '–';
  const ts = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

  const stepCircle = (n) =>
    `<table cellpadding="0" cellspacing="0"><tr><td style="width:28px;height:28px;border-radius:50%;background:linear-gradient(160deg,#5DD6CA 0%,#1B7A6E 100%);text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#fff;font-family:Arial,sans-serif">${n}</td></tr></table>`;

  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><style>:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}@media(prefers-color-scheme:dark){:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}}</style></head>
<body style="margin:0;padding:0;background:#EEF4F1;font-family:Arial,Helvetica,sans-serif;color-scheme:light">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF4F1;padding:36px 16px;color-scheme:light">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%">

  <!-- Logobar -->
  <tr><td style="padding:18px 32px;border-bottom:1px solid #E2EDE8">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="padding-right:9px;vertical-align:middle">${logoSvg('cLogo', 26)}</td>
      <td style="vertical-align:middle;font-size:17px;font-weight:700;color:#0E1A17;letter-spacing:-.02em">Arvo <em style="font-weight:400;font-style:italic;color:#5C6E68">Flow</em></td>
    </tr></table>
  </td></tr>

  <!-- Hero -->
  <tr><td style="background:linear-gradient(145deg,#0E4F47 0%,#1B7A6E 100%);padding:36px 32px 32px">
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:rgba(93,214,202,0.90);text-transform:uppercase;letter-spacing:.13em">Offertprocess startad</p>
    <h1 style="margin:0 0 14px;font-size:26px;font-weight:700;color:#ffffff;line-height:1.22;letter-spacing:-.015em">${heroLine}</h1>
    <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.82);line-height:1.55">
      Er faktura från <strong style="color:#5DD6CA;font-weight:600">${supplier}</strong> är mottagen.<br>
      Arvo initierar nu offertprocessen hos kvalificerade Print-leverantörer.
    </p>
  </td></tr>

  <!-- Steps -->
  <tr><td style="padding:28px 32px 4px">
    <p style="margin:0 0 18px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Vad händer nu</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px"><tr>
      <td style="width:28px;vertical-align:top">${stepCircle(1)}</td>
      <td style="padding-left:14px;vertical-align:top">
        <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0E1A17">Arvo analyserar era klickvolymer</p>
        <p style="margin:0;font-size:13px;color:#5C6E68;line-height:1.5">Vi granskar ert utskriftsmönster för ett rättvist benchmarkpris per sida.</p>
      </td>
    </tr></table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px"><tr>
      <td style="width:28px;vertical-align:top">${stepCircle(2)}</td>
      <td style="padding-left:14px;vertical-align:top">
        <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0E1A17">Vi begär in konkurrerande offerter</p>
        <p style="margin:0;font-size:13px;color:#5C6E68;line-height:1.5">Arvo kontaktar kvalificerade Print-leverantörer med era volymer och nuvarande prisbild.</p>
      </td>
    </tr></table>

    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="width:28px;vertical-align:top">${stepCircle(3)}</td>
      <td style="padding-left:14px;vertical-align:top">
        <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0E1A17">Ni får bästa erbjudandet presenterat</p>
        <p style="margin:0;font-size:13px;color:#5C6E68;line-height:1.5">Godkänner ni — sköter Arvo hela leverantörsbytet. Ni hör av oss inom <strong style="color:#0E1A17">1–2 arbetsdagar</strong>.</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- Cost table -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Er nuvarande kostnad</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D5E2DC;border-radius:10px;overflow:hidden">
      <tr style="background:#F4F9F7">
        <td style="padding:13px 16px;font-size:14px;color:#0E1A17">Fasta avgifter / år</td>
        <td style="padding:13px 16px;font-size:15px;font-weight:700;color:#0E1A17;text-align:right">${ac}</td>
      </tr>
      <tr>
        <td style="padding:13px 16px;font-size:13px;color:#5C6E68;border-top:1px solid #E2EDE8">Rörliga klickkostnader / mån</td>
        <td style="padding:13px 16px;font-size:13px;color:#5C6E68;text-align:right;border-top:1px solid #E2EDE8">${vc}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Fee note -->
  <tr><td style="padding:16px 32px 32px">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#E0F1ED;border-left:3px solid #1B7A6E;border-radius:0 8px 8px 0;padding:14px 18px">
        <p style="margin:0;font-size:13px;color:#0E4F47;line-height:1.55">
          <strong>Arvo tar 20 % av realiserad besparing</strong> — ni betalar ingenting om vi inte lyckas.
        </p>
      </td>
    </tr></table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="border-top:1px solid #D5E2DC;padding:16px 32px;background:#F4F9F7">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:8px;vertical-align:middle">${logoSvg('fLogo', 16)}</td>
          <td style="vertical-align:middle;font-size:13px;font-weight:700;color:#0E1A17">Arvo <em style="font-style:italic;font-weight:400;color:#5C6E68">Flow</em></td>
        </tr></table>
      </td>
      <td style="text-align:right;font-size:11px;color:#8A9E97">${ts} · arvoflow.se</td>
    </tr></table>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ── Internt larm till Arvo med RFQ-draft ─────────────────────────────────────
function buildInternalEmail({ contactName, contactEmail, contactCompany, supplier, annualCost, variableCharges, extractedData, rfqDraft }) {
  const ts  = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  const ac  = annualCost      != null ? annualCost.toLocaleString('sv-SE')      + ' kr' : '–';
  const vc  = variableCharges != null ? variableCharges.toLocaleString('sv-SE') + ' kr' : '–';

  const typeLabel = { recurring_subscription: 'Återkommande', variable_usage: 'Rörlig', one_time_fee: 'Engång', hardware: 'Hårdvara' };
  const typeColor = { recurring_subscription: '#065F46', variable_usage: '#92400E', one_time_fee: '#1E40AF', hardware: '#4B5563' };
  const typeBg    = { recurring_subscription: '#D1FAE5', variable_usage: '#FEF3C7', one_time_fee: '#DBEAFE', hardware: '#F3F4F6' };

  const rowsHtml = (extractedData?.lineItems ?? []).map((l) => {
    const t   = l.type ?? '';
    const lbl = typeLabel[t] ?? t;
    const fg  = typeColor[t] ?? '#374151';
    const bg  = typeBg[t]   ?? '#F9FAFB';
    return `<tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E2EDE8;font-size:13px;color:#0E1A17;font-family:Arial,sans-serif">${l.description ?? ''}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #E2EDE8;font-size:13px;font-weight:600;color:#0E1A17;text-align:right;white-space:nowrap;font-family:Arial,sans-serif">${(l.amount ?? 0).toLocaleString('sv-SE')} kr</td>
      <td style="padding:10px 14px;border-bottom:1px solid #E2EDE8;font-family:Arial,sans-serif">
        <span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:${bg};color:${fg}">${lbl}</span>
      </td>
    </tr>`;
  }).join('');

  const rfqHtml = rfqDraft
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><style>:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}@media(prefers-color-scheme:dark){:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}}</style></head>
<body style="margin:0;padding:0;background:#EEF4F1;font-family:Arial,Helvetica,sans-serif;color-scheme:light">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF4F1;padding:36px 16px;color-scheme:light">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:620px;width:100%">

  <!-- Logobar -->
  <tr><td style="padding:18px 32px;border-bottom:1px solid #E2EDE8">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:9px;vertical-align:middle">${logoSvg('iLogo', 24)}</td>
          <td style="vertical-align:middle;font-size:16px;font-weight:700;color:#0E1A17;letter-spacing:-.02em">Arvo <em style="font-weight:400;font-style:italic;color:#5C6E68">Flow</em></td>
        </tr></table>
      </td>
      <td style="text-align:right;vertical-align:middle">
        <span style="display:inline-block;padding:4px 10px;border-radius:20px;background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">INTERN</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- Lead header -->
  <tr><td style="background:linear-gradient(145deg,#7C2D12 0%,#9F3B22 100%);padding:28px 32px">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:rgba(254,202,202,0.85);text-transform:uppercase;letter-spacing:.13em">Ny offertlead</p>
    <h2 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-.015em">${supplier ?? 'Okänd leverantör'}</h2>
  </td></tr>

  <!-- Contact + KPIs -->
  <tr><td style="padding:24px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:44%;vertical-align:top;padding-right:16px">
          <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Kontakt</p>
          <p style="margin:0;font-size:15px;font-weight:700;color:#0E1A17">${contactName || '–'}</p>
          ${contactCompany ? `<p style="margin:2px 0 0;font-size:13px;color:#1F2E2A">${contactCompany}</p>` : ''}
          <p style="margin:4px 0 0;font-size:13px;color:#1B7A6E;font-weight:500">${contactEmail}</p>
        </td>
        <td style="width:28%;vertical-align:top;padding:0 8px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Fast / år</p>
          <p style="margin:0;font-size:26px;font-weight:700;color:#0E1A17;letter-spacing:-.02em">${ac}</p>
        </td>
        <td style="width:28%;vertical-align:top;padding-left:8px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Rörligt / mån</p>
          <p style="margin:0;font-size:26px;font-weight:700;color:#0E1A17;letter-spacing:-.02em">${vc}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Line items -->
  ${rowsHtml ? `
  <tr><td style="padding:20px 32px 0">
    <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.10em">Fakturarader</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #D5E2DC;border-radius:10px;overflow:hidden">
      <tr style="background:#F4F9F7">
        <th style="padding:9px 14px;text-align:left;font-size:10px;color:#5C6E68;font-weight:700;letter-spacing:.06em;font-family:Arial,sans-serif">Beskrivning</th>
        <th style="padding:9px 14px;text-align:right;font-size:10px;color:#5C6E68;font-weight:700;letter-spacing:.06em;font-family:Arial,sans-serif">Belopp</th>
        <th style="padding:9px 14px;text-align:left;font-size:10px;color:#5C6E68;font-weight:700;letter-spacing:.06em;font-family:Arial,sans-serif">Typ</th>
      </tr>
      ${rowsHtml}
    </table>
  </td></tr>` : ''}

  <!-- RFQ block -->
  <tr><td style="padding:24px 32px">
    <div style="background:#0C1410;border-radius:10px;padding:22px 24px">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px"><tr>
        <td>
          <p style="margin:0;font-size:10px;font-weight:700;color:#4ADE80;text-transform:uppercase;letter-spacing:.14em;font-family:monospace">✉ KLAR ATT SKICKA TILL LEVERANTÖR</p>
        </td>
        <td style="text-align:right">
          <span style="font-size:10px;color:#6B8C7A;font-family:monospace">Öppna nytt mail → klistra in → skicka</span>
        </td>
      </tr></table>
      <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;font-size:13.5px;line-height:1.85;color:#D4EDDA;font-family:monospace;white-space:pre-wrap">${rfqHtml}</div>
    </div>
  </td></tr>

  <!-- Footer -->
  <tr><td style="border-top:1px solid #D5E2DC;padding:14px 32px;background:#F4F9F7">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:7px;vertical-align:middle">${logoSvg('ifLogo', 14)}</td>
          <td style="vertical-align:middle;font-size:12px;font-weight:700;color:#0E1A17">Arvo <em style="font-style:italic;font-weight:400;color:#5C6E68">Flow</em></td>
        </tr></table>
      </td>
      <td style="text-align:right;font-size:11px;color:#8A9E97">${ts}</td>
    </tr></table>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Only POST' });
  if (!process.env.ANTHROPIC_API_KEY) return send(res, 500, { error: 'ANTHROPIC_API_KEY saknas' });

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const { contactEmail, contactName, contactCompany, mandateAccepted, extractedData, categorized } = body;

  if (!contactEmail || typeof contactEmail !== 'string' || !contactEmail.includes('@')) {
    return send(res, 400, { error: 'contactEmail krävs' });
  }
  if (mandateAccepted !== true) {
    return send(res, 400, { error: 'Fullmakt krävs för att starta offertprocessen.' });
  }

  // Klientens IP — Vercel sätter x-forwarded-for, ta första adressen
  const ipAddress = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || null;

  const supplier        = extractedData?.supplier ?? 'Okänd leverantör';
  const annualCost      = extractedData?.annualCost      ?? null;
  const variableCharges = extractedData?.variableCharges ?? null;

  // Generera RFQ — om Haiku failar fortsätter vi ändå med en fallback-text
  let rfqDraft;
  try {
    rfqDraft = await generateRfq({ contactCompany, supplier, extractedData });
  } catch (err) {
    console.error('[quote-request] generateRfq error:', err.message);
    rfqDraft = `Till: [ange leverantörens e-postadress]\nÄmne: Offertförfrågan — skrivarleasing\n\n[RFQ-generering misslyckades — fyll i manuellt]\n\nMed vänliga hälsningar,\nArvo Flow — Inköpsavdelningen`;
  }

  // Lagra lead + fullmaktslogg parallellt (fire-and-forget)
  storeQuoteRequest({ contactEmail, contactName, contactCompany, supplier, annualCost, variableCharges, rfqDraft })
    .catch((err) => console.error('[quote-request] storeQuoteRequest error:', err.message));
  storeMandateLog({ email: contactEmail, company: contactCompany, ipAddress })
    .catch((err) => console.error('[quote-request] storeMandateLog error:', err.message));

  // Skicka båda emails parallellt
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await Promise.allSettled([
      resend.emails.send({
        from:    FROM_ALERT,
        to:      contactEmail,
        subject: `Arvo Flow — offertprocessen för ${supplier} är igång`,
        html:    buildCustomerEmail({ contactName, supplier, annualCost, variableCharges }),
      }),
      resend.emails.send({
        from:    FROM_ALERT,
        to:      ALERT_TO,
        subject: `[Offertlead] ${supplier} · ${annualCost != null ? annualCost.toLocaleString('sv-SE') + ' kr/år' : '?'} fast + ${variableCharges != null ? variableCharges.toLocaleString('sv-SE') + ' kr/mån' : '?'} rörligt`,
        html:    buildInternalEmail({ contactName, contactEmail, contactCompany, supplier, annualCost, variableCharges, extractedData, rfqDraft }),
      }),
    ]);
  }

  return send(res, 200, { ok: true });
}
