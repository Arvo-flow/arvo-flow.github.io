#!/usr/bin/env node
/**
 * P4.1 — Proaktiva kundalertar vid prisändring
 *
 * Läser price-monitor-rapport, identifierar kunder med aktiva analyser
 * hos berörda leverantörer och skickar ett personaliserat alert-mail per kund.
 *
 * Kör efter price-monitor.mjs när minst en prisändring bekräftats.
 *
 * Användning:
 *   node scripts/notify-price-changes.mjs [/path/to/report.json]
 *
 * Env:
 *   DATABASE_URL     — Neon Postgres (läser gate_emails + invoice_analyses)
 *   RESEND_API_KEY   — Resend API-nyckel
 */

import 'dotenv/config';
import { readFileSync } from 'fs';
import { Resend } from 'resend';
import { getAffectedCustomers } from '../lib/price-alert-store.js';

const REPORT_PATH = process.argv[2] ?? '/tmp/price-monitor-report.json';
const FROM        = 'Arvo Flow <onboarding@resend.dev>';
const APP_URL     = 'https://arvoflow.se/testa-faktura';
const T = {
  brand:  '#1B7A6E',
  brandDk:'#1B6E66',
  ink:    '#0E1A17',
  muted:  '#5C6E68',
  bg:     '#F1F6F3',
  border: '#D5E2DC',
  white:  '#FFFFFF',
};

// ── Leverantörs-nyckelord ─────────────────────────────────────────────────────
// Mappar verbose price-monitor-namn till sökbart nyckelord för ILIKE-query.
function extractSupplierKeyword(alertSupplier) {
  const s = alertSupplier.toLowerCase();
  if (s.includes('microsoft'))    return 'microsoft';
  if (s.includes('google'))       return 'google';
  if (s.includes('adobe'))        return 'adobe';
  if (s.includes('tele2'))        return 'tele2';
  if (s.includes('telia'))        return 'telia';
  if (s.includes('telenor'))      return 'telenor';
  if (s.includes('slack'))        return 'slack';
  if (s.includes('zoom'))         return 'zoom';
  if (s.includes('atlassian'))    return 'atlassian';
  if (s.includes('fortnox'))      return 'fortnox';
  if (s.includes('bahnhof'))      return 'bahnhof';
  if (s.includes('sector alarm')) return 'sector alarm';
  if (s.includes('sumup'))        return 'sumup';
  if (s.includes('zettle'))       return 'zettle';
  // Fallback: första ordet i leverantörsnamnet
  return s.split(/\s+/)[0];
}

// Presentationsnamn för kunden (gissas från DB-värde eller nyckelord)
function displaySupplier(dbSupplier, keyword) {
  if (dbSupplier) {
    // Kapitalisera första bokstaven i varje ord för presentationsnamn
    return dbSupplier.replace(/\b\w/g, c => c.toUpperCase());
  }
  return keyword.replace(/\b\w/g, c => c.toUpperCase());
}

// ── Rapport-inläsning ─────────────────────────────────────────────────────────
let report;
try {
  report = JSON.parse(readFileSync(REPORT_PATH, 'utf8'));
} catch (err) {
  console.error(`Kunde inte läsa rapport: ${REPORT_PATH} — ${err.message}`);
  process.exit(0); // Mjuk exit — blockera inte CI
}

const alerts = report.alerts ?? [];
if (!alerts.length) {
  console.log('Inga prisändringar i rapporten — inga kundnotifieringar behövs.');
  process.exit(0);
}

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY saknas — kundnotifieringar kan inte skickas.');
  process.exit(0);
}

// ── Steg 1: Gruppera alerts per leverantörsnyckelord ──────────────────────────
const alertsByKeyword = new Map();
for (const alert of alerts) {
  const keyword = extractSupplierKeyword(alert.supplier);
  if (!alertsByKeyword.has(keyword)) alertsByKeyword.set(keyword, []);
  alertsByKeyword.get(keyword).push(alert);
}

// ── Steg 2: Hitta berörda kunder per leverantör ───────────────────────────────
// email → { customer, alerts: [] }
const customerMap = new Map();

for (const [keyword, supplierAlerts] of alertsByKeyword) {
  console.log(`Söker kunder för leverantör: "${keyword}"…`);
  const customers = await getAffectedCustomers({ supplierKeyword: keyword });
  console.log(`  → ${customers.length} kund(er) hittade`);

  for (const customer of customers) {
    if (!customerMap.has(customer.email)) {
      customerMap.set(customer.email, { customer, alerts: [] });
    }
    customerMap.get(customer.email).alerts.push(...supplierAlerts);
  }
}

if (!customerMap.size) {
  console.log('Inga kunder matchade berörda leverantörer — inga mail skickas.');
  process.exit(0);
}

// ── Steg 3: Skicka ett mail per kund ─────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);
const date   = new Date().toLocaleDateString('sv-SE', {
  timeZone: 'Europe/Stockholm', year: 'numeric', month: 'long', day: 'numeric',
});

let sent = 0, failed = 0;

for (const [email, { customer, alerts: customerAlerts }] of customerMap) {
  // Deduplicera alerts på supplier+check (kan ha kommit från flera anrop ovan)
  const seen  = new Set();
  const deduped = customerAlerts.filter(a => {
    const key = `${a.supplier}::${a.check}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Unika leverantörer i detta mail
  const uniqueSuppliers = [...new Set(deduped.map(a => extractSupplierKeyword(a.supplier)))];
  const supplierName    = displaySupplier(customer.supplier, uniqueSuppliers[0]);
  const multiSupplier   = uniqueSuppliers.length > 1;

  const subject = multiSupplier
    ? `Arvo: Prisändringar detekterade hos ${uniqueSuppliers.length} av era leverantörer`
    : `Arvo: Prisändring detekterad hos ${supplierName}`;

  const html = buildCustomerEmail({ email, customer, alerts: deduped, supplierName, multiSupplier, date });

  try {
    const { error } = await resend.emails.send({ from: FROM, to: email, subject, html });
    if (error) throw new Error(JSON.stringify(error));
    console.log(`✅  Skickat till ${email} (${deduped.length} alert(ar))`);
    sent++;
  } catch (err) {
    console.error(`❌  Misslyckades för ${email}: ${err.message}`);
    failed++;
  }
}

console.log(`\nNotifiering klar: ${sent} skickade, ${failed} misslyckades.`);
if (failed > 0) process.exit(1);

// ── HTML-builder ──────────────────────────────────────────────────────────────
function buildCustomerEmail({ customer, alerts, supplierName, multiSupplier, date }) {
  const annualFmt = customer.annualCost
    ? `${customer.annualCost.toLocaleString('sv-SE')} kr/år`
    : null;

  const alertRows = alerts.map(a => {
    const oldPrice = a.check ?? '–';
    const newPrice = a.haiku?.extractedPrice ?? 'Ny prisbild';
    return `
      <tr>
        <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:${T.ink}">${a.supplier}</td>
        <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:#b91c1c;font-weight:600">${oldPrice}</td>
        <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:#15803d;font-weight:600">${newPrice}</td>
      </tr>`;
  }).join('');

  const analysisContext = annualFmt
    ? `<p style="margin:0 0 20px;font-size:14px;color:${T.muted};line-height:1.6">
        Er senaste Arvo-analys visade <strong style="color:${T.ink}">${annualFmt}</strong> i kostnader
        hos ${supplierName}. Med den nya prisbilden kan er besparing ha förändrats —
        ladda upp er senaste faktura för en uppdaterad beräkning.
      </p>`
    : `<p style="margin:0 0 20px;font-size:14px;color:${T.muted};line-height:1.6">
        Er tidigare analys hos ${supplierName} via Arvo kan ha förändrats i och med
        den nya prisbilden. Ladda upp er senaste faktura för en uppdaterad beräkning.
      </p>`;

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Arvo — Prisändring detekterad</title>
</head>
<body style="margin:0;padding:0;background:${T.bg}">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${T.bg};padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0"
  style="background:${T.white};border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 2px 16px rgba(14,26,23,0.08)">

  <!-- Accentbar -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA,${T.brandDk});font-size:0">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="padding:28px 36px 22px;border-bottom:1px solid ${T.border}">
      <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.1em">
        Arvo — Proaktiv prisbevakning
      </p>
      <p style="margin:0;font-size:22px;font-weight:700;color:${T.ink}">
        ${multiSupplier ? 'Prisändringar detekterade' : `Prisändring hos ${supplierName}`}
      </p>
      <p style="margin:6px 0 0;font-size:12px;color:${T.muted}">${date}</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:28px 36px">

      <p style="margin:0 0 16px;font-size:15px;color:${T.ink};line-height:1.65;font-weight:500">
        Vi bevakar era leverantörskostnader löpande.
        ${multiSupplier
          ? `Arvo har nu detekterat prisändringar hos <strong>${alerts.length > 1 ? 'flera av era leverantörer' : supplierName}</strong>.`
          : `Arvo har nu detekterat en möjlig prisändring hos <strong>${supplierName}</strong>.`}
      </p>

      ${analysisContext}

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" style="margin:0 0 28px">
        <tr>
          <td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,${T.brandDk})">
            <a href="${APP_URL}"
               style="display:inline-block;color:${T.white};font-weight:700;font-size:15px;
                      padding:15px 36px;text-decoration:none;letter-spacing:.02em">
              Ladda upp ny faktura &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Detekterade ändringar -->
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.08em">
        Detekterade prisavvikelser
      </p>
      <table width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid ${T.border};border-radius:8px;overflow:hidden">
        <tr style="background:#f8faf9">
          <th style="padding:9px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Leverantör</th>
          <th style="padding:9px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Tidigare pris</th>
          <th style="padding:9px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">AI-förslag</th>
        </tr>
        ${alertRows}
      </table>

      <p style="margin:20px 0 0;font-size:12px;color:${T.muted};line-height:1.6">
        Arvo bevakar priser nattligen och meddelar er vid förändringar.
        En uppdaterad analys tar under 30 sekunder.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="padding:18px 36px;border-top:1px solid ${T.border};text-align:center">
      <p style="margin:0;font-size:11px;color:${T.muted}">
        Arvo Flow &nbsp;·&nbsp;
        <a href="${APP_URL}" style="color:${T.brand};text-decoration:none">arvoflow.se</a>
      </p>
      <p style="margin:4px 0 0;font-size:10px;color:#aaa">
        Du får detta mail för att du analyserat en faktura via Arvo.
        AI-extraherade priser är indikativa — er uppdaterade analys ger exakta siffror.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
