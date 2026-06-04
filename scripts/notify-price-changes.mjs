#!/usr/bin/env node
/**
 * Arvo Intelligence — Proaktiv prisändringsnotifiering
 *
 * Körs av GitHub Actions direkt efter price-monitor.mjs när minst en
 * prisändring bekräftats. Identifierar berörda kunder via invoice_analyses,
 * skapar magic links till Decision Board och skickar personaliserade alert-mail.
 *
 * Det proaktiva mailen — inte dashboard, inte rapport — ÄR Arvo Intelligence.
 *
 * Flöde per leverantör:
 *   1. Idempotens-check  — har detta alert redan skickats för denna monitor-körning?
 *   2. Hitta kunder      — getAffectedCustomers() via gate_emails JOIN invoice_analyses
 *   3. Segment-signal    — getSegmentStats() → "X av Y bolag i er bransch"
 *   4. Beräkna impact    — seat_count × pris-delta × 12 = kr/år per kund
 *   5. Magic link        — magic_tokens INSERT + briefing_reports upsert per kund
 *   6. Skicka mail       — personaliserat med kr-impact och magic link till Decision Board
 *   7. Markera skickat   — markAlertSent() för idempotens
 *
 * Env:
 *   DATABASE_URL    — Neon Postgres
 *   RESEND_API_KEY  — Resend API-nyckel
 *   ARVO_BASE_URL   — valfritt, default https://arvoflow.se
 *
 * Användning:
 *   node scripts/notify-price-changes.mjs [/path/to/report.json]
 */

import 'dotenv/config';
import { readFileSync } from 'fs';
import crypto from 'crypto';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';
import { getAffectedCustomers, getSegmentStats, hasAlertBeenSent, markAlertSent } from '../lib/price-alert-store.js';

const REPORT_PATH = process.argv[2] ?? '/tmp/price-monitor-report.json';
const FROM        = process.env.RESEND_FROM    ?? 'Arvo Flow <analys@arvo-flow.se>';
const BASE_URL    = process.env.ARVO_BASE_URL  ?? 'https://arvoflow.se';

// ── Rapport-inläsning ─────────────────────────────────────────────────────────
let report;
try {
  report = JSON.parse(readFileSync(REPORT_PATH, 'utf8'));
} catch (err) {
  console.error(`Kunde inte läsa rapport: ${REPORT_PATH} — ${err.message}`);
  process.exit(0);
}

const alerts = (report.alerts ?? []).filter(a => {
  // Skicka bara alert för bekräftade prisändringar eller osäkra ändringar.
  // false_positive hoppar vi över — pris-mönstret hittades inte men priset verkar detsamma.
  if (a.haiku?.actionRequired === 'false_positive') return false;
  return true;
});

if (!alerts.length) {
  console.log('Inga prisändringar att notifiera om.');
  process.exit(0);
}

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY saknas — hoppar över kundnotifieringar.');
  process.exit(0);
}

const resend   = new Resend(process.env.RESEND_API_KEY);
const db       = getDb();
const monitorRunId = report.runAt;
const reportDate   = new Date(report.runAt).toLocaleDateString('sv-SE', {
  timeZone: 'Europe/Stockholm', year: 'numeric', month: 'long', day: 'numeric',
});

// ── Leverantörs-nyckelord ─────────────────────────────────────────────────────
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
  if (s.includes('pipedrive'))    return 'pipedrive';
  if (s.includes('hubspot'))      return 'hubspot';
  if (s.includes('zoho'))         return 'zoho';
  if (s.includes('sector alarm')) return 'sector alarm';
  if (s.includes('sumup'))        return 'sumup';
  if (s.includes('zettle'))       return 'zettle';
  return s.split(/\s+/)[0];
}

function displaySupplier(dbSupplier, keyword) {
  const s = dbSupplier || keyword;
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

function fmt(n) {
  return Math.round(n ?? 0).toLocaleString('sv-SE');
}

// ── Gruppera alerts per (leverantörsnyckelord, kategori) ─────────────────────
const alertGroups = new Map();
for (const alert of alerts) {
  const keyword = extractSupplierKeyword(alert.supplier);
  const groupKey = `${keyword}::${alert.category}`;
  if (!alertGroups.has(groupKey)) {
    alertGroups.set(groupKey, { keyword, category: alert.category, items: [] });
  }
  alertGroups.get(groupKey).items.push(alert);
}

// ── Per grupp: hitta kunder, beräkna impact, skicka mail ─────────────────────
let totalSent = 0, totalSkipped = 0, totalFailed = 0;

for (const [groupKey, { keyword, category, items: groupAlerts }] of alertGroups) {
  console.log(`\n── [${category}] ${keyword} (${groupAlerts.length} alert(ar)) ──`);

  // Idempotens: har detta alert redan skickats för denna monitor-körning?
  const alreadySent = await hasAlertBeenSent({ monitorRunId, supplier: keyword, category });
  if (alreadySent) {
    console.log(`  ⏭  Redan skickat (idempotens). Hoppar över.`);
    totalSkipped++;
    continue;
  }

  // Hitta berörda kunder
  const customers = await getAffectedCustomers({ supplierKeyword: keyword, category });
  console.log(`  👥 ${customers.length} berörd(a) kund(er)`);

  if (!customers.length) {
    await markAlertSent({ monitorRunId, supplier: keyword, category, emailsSent: 0, totalImpactKr: 0 });
    continue;
  }

  // Segment-signal: "X av Y bolag i er bransch"
  const segStats = await getSegmentStats({ category, supplierKeyword: keyword });
  console.log(`  📊 Segmentstatistik: ${segStats.withSupplier} av ${segStats.total} bolag`);

  let groupEmailsSent = 0;
  let groupTotalImpactKr = 0;

  for (const customer of customers) {
    const supplierName = displaySupplier(customer.supplier, keyword);

    // Per-säte-beräkning av impact om seat_count finns
    const seatCount  = customer.seatCount ?? null;
    const annualCost = Number(customer.annualCost ?? 0);

    // Försök extrahera pris-delta från Haiku-analysen
    // Haiku rapporterar t.ex. "349 kr/mth" — jämför med befintligt pris i checken
    const primaryAlert = groupAlerts[0];
    const haikuPrice   = primaryAlert?.haiku?.extractedPrice;

    // Estimera impact: om vi kan tolka det nya priset och seat_count finns
    let impactKrYear  = null;
    if (seatCount && haikuPrice && annualCost > 0) {
      // Enkel heuristik: annualCost / seatCount = nuvarande pris/säte/år
      const currentPerSeatYear = annualCost / seatCount;
      // Matcha numerisk del ur Haiku-priset (t.ex. "349 kr/mth" → 349 × 12)
      const numMatch = haikuPrice.match(/[\d\s]+[,.]?[\d]*/);
      if (numMatch) {
        const haikuNum = parseFloat(numMatch[0].replace(/\s/g, '').replace(',', '.'));
        if (!isNaN(haikuNum)) {
          const newPerSeatYear = haikuNum < 1000 ? haikuNum * 12 : haikuNum;
          impactKrYear = Math.round((newPerSeatYear - currentPerSeatYear) * seatCount);
        }
      }
    } else if (annualCost > 0) {
      // Utan seatCount: estimera impact som 10% av annual (konservativ)
      impactKrYear = null;
    }

    if (impactKrYear) groupTotalImpactKr += Math.abs(impactKrYear);

    // Skapa magic token och briefing_reports-rad
    let briefingUrl = `${BASE_URL}/testa-faktura`;
    if (db) {
      try {
        const token      = crypto.randomBytes(32).toString('hex');
        const expires    = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 dagar
        const tokenNote  = `price-alert:${monitorRunId}:${keyword}`;

        const tokenRows = await db`
          INSERT INTO magic_tokens (token, email, note, expires_at)
          VALUES (${token}, ${customer.email}, ${tokenNote}, ${expires.toISOString()})
          RETURNING id
        `;
        const tokenId = tokenRows[0]?.id;

        if (tokenId) {
          // Upsert briefing_reports med price_alert-insikt
          const alertPeriod  = new Date(report.runAt).toISOString().slice(0, 7); // YYYY-MM
          const priceAlertInsight = buildPriceAlertInsight({
            keyword, category, supplierName, customer, groupAlerts,
            segStats, impactKrYear, haikuPrice,
          });

          await db`
            INSERT INTO briefing_reports
              (customer_email, period, insights, total_saving_potential,
               total_invoices_analyzed, insight_count, token_id)
            VALUES
              (${customer.email}, ${'alert-' + alertPeriod},
               ${JSON.stringify([priceAlertInsight])}::jsonb,
               ${impactKrYear ? Math.abs(impactKrYear) : 0},
               1, 1, ${tokenId})
            ON CONFLICT (customer_email, period) DO UPDATE
              SET insights               = EXCLUDED.insights,
                  total_saving_potential = EXCLUDED.total_saving_potential,
                  insight_count          = EXCLUDED.insight_count,
                  token_id               = EXCLUDED.token_id
          `;

          briefingUrl = `${BASE_URL}/briefing/${token}`;
        }
      } catch (dbErr) {
        console.warn(`  ⚠️  Magic token-fel för ${customer.email} (non-fatal): ${dbErr.message}`);
      }
    }

    // Bygg och skicka alert-mail
    const subject = impactKrYear && impactKrYear > 0
      ? `Arvo: ${supplierName} har höjt priset — ${fmt(impactKrYear)} kr/år påverkan`
      : `Arvo har noterat en prisändring hos ${supplierName}`;

    const html = buildAlertEmail({
      customer, supplierName, groupAlerts, segStats,
      impactKrYear, haikuPrice, annualCost, seatCount,
      briefingUrl, date: reportDate,
    });

    try {
      const { error } = await resend.emails.send({ from: FROM, to: customer.email, subject, html });
      if (error) throw new Error(JSON.stringify(error));
      console.log(`  ✅ Skickat till ${customer.email}${impactKrYear ? ` (impact: ${fmt(impactKrYear)} kr/år)` : ''}`);
      groupEmailsSent++;
      totalSent++;
    } catch (emailErr) {
      console.error(`  ❌ Misslyckades för ${customer.email}: ${emailErr.message}`);
      totalFailed++;
    }
  }

  // Markera alert som skickat för denna monitor-körning (idempotens)
  await markAlertSent({
    monitorRunId,
    supplier:       keyword,
    category,
    emailsSent:     groupEmailsSent,
    totalImpactKr:  groupTotalImpactKr,
    haikuAnalysis:  groupAlerts[0]?.haiku ?? null,
  });

  console.log(`  ✓ ${groupEmailsSent} mail skickade, total impact ${fmt(groupTotalImpactKr)} kr/år`);
}

console.log(`\n══════════════════════════════════════`);
console.log(`Klart: ${totalSent} skickade, ${totalSkipped} överhoppade (idempotens), ${totalFailed} misslyckades`);
if (totalFailed > 0) process.exit(1);

// ── Insight-objekt för briefing_reports ──────────────────────────────────────
function buildPriceAlertInsight({ keyword, category, supplierName, customer, groupAlerts, segStats, impactKrYear, haikuPrice }) {
  const isIncrease = impactKrYear != null ? impactKrYear > 0 : true;
  const headline = isIncrease
    ? `${supplierName} har höjt priset — Arvo agerar åt er`
    : `Prisändring hos ${supplierName} — Arvo har granskat`;

  const segSignal = segStats.total >= 3
    ? `${segStats.withSupplier} av ${segStats.total} bolag vi följer i er bransch använder ${supplierName}.`
    : null;

  return {
    id:          crypto.randomUUID(),
    type:        'price_alert',
    headline,
    subheadline: impactKrYear && impactKrYear > 0
      ? `Prisökning på ${Math.round(impactKrYear).toLocaleString('sv-SE')} kr/år identifierad av Arvo`
      : 'Prisändring detekterad — Arvo granskar om den är befogad',
    metric: impactKrYear ? {
      primary:   { value: Math.abs(impactKrYear), label: 'kr/år identifierad påverkan' },
      secondary: { value: customer.annualCost, label: 'nuvarande kostnad/år' },
    } : null,
    context: [
      `Arvo bevakar ${supplierName}:s priser nattligen och detekterade en förändring.`,
      segSignal,
      isIncrease
        ? 'Smyghöjningar utan kundinformation är vanliga och kan ifrågasättas. Arvo granskar om höjningen är befogad och agerar direkt.'
        : 'Arvo har analyserat förändringen och bedömer om den påverkar ert avtal.',
    ].filter(Boolean).join(' '),
    supplier:   supplierName,
    category,
    analysisId: null,
    action: {
      label:              isIncrease ? 'Be Arvo granska och förhandla' : 'Se fullständig analys',
      type:               isIncrease ? 'renegotiate' : 'review',
      estimatedNetSaving: impactKrYear && impactKrYear > 0 ? Math.round(impactKrYear * 0.85) : 0,
    },
  };
}

// ── Alert-mail HTML ──────────────────────────────────────────────────────────
function buildAlertEmail({ customer, supplierName, groupAlerts, segStats, impactKrYear, haikuPrice, annualCost, seatCount, briefingUrl, date }) {
  const T = {
    brand:   '#1B7A6E',
    brandDk: '#1B6E66',
    ink:     '#0E1A17',
    muted:   '#5C6E68',
    bg:      '#F1F6F3',
    border:  '#D5E2DC',
    white:   '#FFFFFF',
    red:     '#C41C1C',
    green:   '#15803d',
  };

  const isIncrease = impactKrYear != null ? impactKrYear > 0 : true;

  const impactBlock = impactKrYear
    ? `<table width="100%" cellpadding="0" cellspacing="0"
         style="background:#FEF3F2;border:1px solid #FCA5A5;border-radius:10px;margin:0 0 24px;overflow:hidden">
        <tr>
          <td style="padding:16px 20px">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:${T.red};text-transform:uppercase;letter-spacing:.08em">
              Identifierad påverkan på ert avtal
            </p>
            <p style="margin:0;font-size:28px;font-weight:800;color:${T.ink};letter-spacing:-.03em">
              +${fmt(Math.abs(impactKrYear))} kr/år
            </p>
            ${seatCount ? `<p style="margin:4px 0 0;font-size:12px;color:${T.muted}">${seatCount} licenser/abonnemang</p>` : ''}
          </td>
        </tr>
      </table>`
    : '';

  const segBlock = segStats.total >= 3
    ? `<p style="margin:0 0 20px;padding:14px 16px;background:#EEF9F7;border-radius:8px;
               font-size:13px;color:${T.brand};font-weight:600;line-height:1.5">
        Arvo följer ${segStats.total} bolag med liknande profil.
        ${segStats.withSupplier} av dessa använder ${supplierName}.
      </p>`
    : '';

  const alertRows = groupAlerts.slice(0, 3).map(a => {
    const oldPrice = a.check ?? '–';
    const newPrice = a.haiku?.extractedPrice ?? 'Ny prisbild';
    return `<tr>
      <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:${T.ink}">${a.supplier}</td>
      <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:#9B1C1C;font-weight:600">${oldPrice}</td>
      <td style="padding:10px 16px;border-top:1px solid ${T.border};font-size:13px;color:${T.green};font-weight:600">${newPrice}</td>
    </tr>`;
  }).join('');

  const ctaLabel = isIncrease ? 'Låt Arvo granska och förhandla' : 'Se fullständig analys';

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Arvo — Prisändring detekterad</title>
</head>
<body style="margin:0;padding:0;background:${T.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${T.bg};padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0"
  style="background:${T.white};border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 2px 16px rgba(14,26,23,0.08)">

  <tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA,${T.brandDk});font-size:0">&nbsp;</td></tr>

  <tr>
    <td style="padding:28px 36px 22px;border-bottom:1px solid ${T.border}">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.1em">
        Arvo Intelligence — Proaktiv prisbevakning
      </p>
      <p style="margin:0;font-size:22px;font-weight:800;color:${T.ink};letter-spacing:-.02em;line-height:1.3">
        ${isIncrease ? `${supplierName} har höjt priset` : `Prisändring detekterad hos ${supplierName}`}
      </p>
      <p style="margin:6px 0 0;font-size:12px;color:${T.muted}">${date}</p>
    </td>
  </tr>

  <tr>
    <td style="padding:28px 36px">

      <p style="margin:0 0 20px;font-size:15px;color:${T.ink};line-height:1.65;font-weight:500">
        ${isIncrease
          ? `Arvo bevakar era leverantörskostnader nattligen och har nu detekterat att <strong>${supplierName}</strong> har ändrat sin prisbild. Vi kontaktar er innan avgiften syns på er faktura.`
          : `Arvo har detekterat en förändring hos <strong>${supplierName}</strong> och granskar om den påverkar ert avtal.`
        }
      </p>

      ${impactBlock}
      ${segBlock}

      <!-- CTA — Magic link till Decision Board -->
      <table cellpadding="0" cellspacing="0" style="margin:0 0 28px">
        <tr>
          <td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,${T.brandDk})">
            <a href="${briefingUrl}"
               style="display:inline-block;color:${T.white};font-weight:700;font-size:15px;
                      padding:15px 36px;text-decoration:none;letter-spacing:.02em">
              ${ctaLabel} &rarr;
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
          <th style="padding:9px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Förväntad prissträng</th>
          <th style="padding:9px 16px;font-size:11px;font-weight:700;color:${T.muted};text-align:left;text-transform:uppercase;letter-spacing:.06em">Ny prisbild (AI)</th>
        </tr>
        ${alertRows}
      </table>

      <p style="margin:20px 0 0;font-size:12px;color:${T.muted};line-height:1.6">
        Arvo Intelligence bevakar era leverantörspriser automatiskt och kontaktar er vid förändringar.
        AI-extraherade priser är indikativa — er fullständiga analys finns i briefingen ovan.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:18px 36px;border-top:1px solid ${T.border};text-align:center">
      <p style="margin:0;font-size:11px;color:${T.muted}">
        Arvo Flow &nbsp;·&nbsp;
        <a href="${BASE_URL}/testa-faktura" style="color:${T.brand};text-decoration:none">arvoflow.se</a>
      </p>
      <p style="margin:4px 0 0;font-size:10px;color:#aaa">
        Du får detta mail för att Arvo bevakar era leverantörskostnader.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
