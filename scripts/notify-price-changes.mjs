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
 *   3. Segment-signal    — getSegmentStats() → "X av Y bolag vi följer för <kategori>"
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
import { computeImpactKr, parseCheckPrice } from '../lib/price-impact.js';
import { extractSupplierKeyword } from '../lib/supplier-keyword.js';
import { catLabel } from '../lib/format.js';

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
// extractSupplierKeyword bor nu i lib/supplier-keyword.js (regel 1: en källa, tre konsumenter).

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

    const seatCount    = customer.seatCount ?? null;
    const primaryAlert = groupAlerts[0];

    // Deterministisk impact-beräkning via strukturerade prisfält från Haiku.
    // parseCheckPrice() extraherar exakt numeric+currency+unit ur check.name.
    // Haiku returnerar nu extractedNumeric/extractedCurrency/extractedUnit.
    // Inga regex, inga "× 12 om < 1000"-heuristiker.
    const currentPrice = parseCheckPrice(primaryAlert?.check ?? '');
    const haiku        = primaryAlert?.haiku ?? null;
    const impact = currentPrice && haiku?.extractedNumeric != null
      ? computeImpactKr({
          currentNumeric:  currentPrice.numeric,
          currentCurrency: currentPrice.currency,
          currentUnit:     currentPrice.unit,
          newNumeric:      haiku.extractedNumeric,
          newCurrency:     haiku.extractedCurrency ?? currentPrice.currency,
          newUnit:         haiku.extractedUnit     ?? currentPrice.unit,
          seatCount,
          fxRates: null, // fallback: 10.42 kr/USD i lib/price-impact.js
        })
      : null;

    const impactKrYear = impact?.impactKrYear ?? null;
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
            segStats, impact,
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

    // Subject: exakt om vi har siffror, generisk annars
    const subject = impact && impactKrYear > 0
      ? `${supplierName}: +${fmt(impactKrYear)} kr/år — Arvo har detekterat en prishöjning`
      : impact && impactKrYear < 0
      ? `${supplierName} sänkte priset — ${fmt(Math.abs(impactKrYear))} kr/år påverkan`
      : `Arvo har noterat en prisändring hos ${supplierName}`;

    const html = buildAlertEmail({
      customer, supplierName, groupAlerts, segStats,
      impact, briefingUrl, date: reportDate,
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
function buildPriceAlertInsight({ keyword, category, supplierName, customer, groupAlerts, segStats, impact }) {
  const isIncrease       = impact ? impact.impactKrYear > 0 : true;
  const impactKrYear     = impact?.impactKrYear ?? null;
  const hasExactNumbers  = impact != null;

  const headline = hasExactNumbers && isIncrease
    ? `${supplierName} höjde priset ${impact.deltaPct > 0 ? `+${impact.deltaPct}%` : ''} — ${fmt(impact.impactKrYear)} kr/år extra`
    : `Prisändring hos ${supplierName} — Arvo har detekterat`;

  const segSignal = segStats.total >= 3
    ? `${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)} använder ${supplierName}.`
    : null;

  const breakdownContext = hasExactNumbers
    ? `${impact.oldKrMonth} kr/säte/mth → ${impact.newKrMonth} kr/säte/mth (${isIncrease ? '+' : ''}${impact.deltaPct}%). ${impact.seats} licenser × ${Math.abs(impact.deltaKrMonth)} kr/mth × 12 = ${fmt(Math.abs(impactKrYear))} kr/år.`
    : null;

  return {
    id:   crypto.randomUUID(),
    type: 'price_alert',
    headline,
    subheadline: hasExactNumbers
      ? `Exakt påverkan: ${isIncrease ? '+' : ''}${fmt(impactKrYear)} kr/år för ${impact.seats} licenser`
      : 'Prisändring detekterad — Arvo granskar om den är befogad',
    metric: impactKrYear ? {
      primary:   { value: Math.abs(impactKrYear), label: 'kr/år identifierad påverkan' },
      secondary: { value: customer.annualCost, label: 'nuvarande kostnad/år' },
    } : null,
    context: [
      `Arvo bevakar ${supplierName}:s priser nattligen och detekterade en förändring.`,
      breakdownContext,
      segSignal,
      isIncrease
        ? 'Smyghöjningar utan kundinformation är vanliga och kan ifrågasättas direkt.'
        : 'Arvo analyserar om förändringen är permanent och om ert avtal påverkas.',
    ].filter(Boolean).join(' '),
    supplier:   supplierName,
    category,
    analysisId: null,
    action: {
      label:              isIncrease ? 'Be Arvo granska och förhandla' : 'Se fullständig analys',
      type:               isIncrease ? 'renegotiate' : 'review',
      estimatedNetSaving: impactKrYear && isIncrease ? Math.round(impactKrYear * 0.85) : 0,
    },
  };
}

// ── Alert-mail HTML — Bloomberg Terminal-standard ───────────────────────────
// Princip: ett exakt tal, ett beslut, en knapp. Inget generiskt.
// En CFO fattar beslut på siffror, inte på "kan ha förändrats".
function buildAlertEmail({ customer, supplierName, groupAlerts, segStats, impact, briefingUrl, date }) {
  const brand   = '#1B7A6E';
  const brandDk = '#1B6E66';
  const ink     = '#0E1A17';
  const muted   = '#5C6E68';
  const bg      = '#F1F6F3';
  const border  = '#D5E2DC';
  const white   = '#FFFFFF';

  const isIncrease     = impact ? impact.impactKrYear > 0 : true;
  const impactKrYear   = impact?.impactKrYear ?? null;
  const hasExactImpact = impact != null && impactKrYear != null;
  const primaryAlert   = groupAlerts[0];

  // Hero-block: exakt kr/år + breakdown om vi har siffror
  const heroBlock = hasExactImpact ? `
    <table width="100%" cellpadding="0" cellspacing="0"
      style="background:${isIncrease ? '#FEF2F2' : '#F0FDF4'};border:1px solid ${isIncrease ? '#FECACA' : '#BBF7D0'};border-radius:12px;margin:0 0 24px;overflow:hidden">
      <tr><td style="padding:20px 24px">
        <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:${isIncrease ? '#991B1B' : '#166534'};text-transform:uppercase;letter-spacing:.1em">
          ${isIncrease ? 'Bekräftad prishöjning' : 'Prissänkning'}
        </p>
        <p style="margin:0 0 12px;font-size:36px;font-weight:800;color:${ink};letter-spacing:-.04em;line-height:1">
          ${isIncrease ? '+' : ''}${fmt(impactKrYear)} kr/år
        </p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          <tr>
            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Gammalt pris</td>
            <td style="padding:4px 0;font-size:13px;font-weight:600;color:${ink}">${impact.oldKrMonth} kr/säte/mth</td>
          </tr>
          <tr>
            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Nytt pris</td>
            <td style="padding:4px 0;font-size:13px;font-weight:700;color:${isIncrease ? '#991B1B' : '#166534'}">${impact.newKrMonth} kr/säte/mth (${isIncrease ? '+' : ''}${impact.deltaPct}%)</td>
          </tr>
          <tr>
            <td style="padding:4px 12px 4px 0;font-size:13px;color:${muted}">Er flotta</td>
            <td style="padding:4px 0;font-size:13px;color:${ink}">${impact.seats} licenser × ${Math.abs(impact.deltaKrMonth)} kr/mth × 12</td>
          </tr>
        </table>
      </td></tr>
    </table>` : `
    <p style="margin:0 0 20px;font-size:15px;color:${ink};line-height:1.65">
      Arvo bevakar era leverantörskostnader nattligen. Vi har detekterat en förändring
      hos <strong>${supplierName}</strong> och kontaktar er innan det syns på er faktura.
    </p>`;

  // Segment-signal: nätverkseffekten som gör Arvo unik
  const segBlock = segStats.total >= 3
    ? `<p style="margin:0 0 24px;padding:14px 18px;background:#EEF9F7;border-left:3px solid ${brand};border-radius:0 8px 8px 0;font-size:13px;color:${brand};font-weight:600;line-height:1.5">
        ${segStats.withSupplier} av ${segStats.total} bolag vi följer för ${catLabel(category)}
        använder ${supplierName} — Arvo ser hela prisbilden, ni ser er del.
      </p>`
    : '';

  const ctaLabel = isIncrease ? 'Låt Arvo omförhandla' : 'Se fullständig analys';

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:${bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:40px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
  style="background:${white};border-radius:16px;overflow:hidden;max-width:560px;width:100%;box-shadow:0 2px 20px rgba(14,26,23,0.10)">

  <tr><td style="height:3px;background:linear-gradient(90deg,#5DD6CA,${brandDk});font-size:0">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="padding:28px 32px 20px;border-bottom:1px solid ${border}">
      <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:${brand};text-transform:uppercase;letter-spacing:.12em">
        Arvo Intelligence
      </p>
      <p style="margin:0;font-size:20px;font-weight:800;color:${ink};letter-spacing:-.025em;line-height:1.3">
        ${hasExactImpact && isIncrease
          ? `${supplierName} höjde priset ${impact.deltaPct > 0 ? `+${impact.deltaPct}%` : ''}`
          : `Prisändring detekterad hos ${supplierName}`}
      </p>
      <p style="margin:5px 0 0;font-size:11px;color:${muted}">${date}</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:24px 32px">
      ${heroBlock}
      ${segBlock}

      <!-- CTA -->
      <table cellpadding="0" cellspacing="0" style="margin:0 0 24px">
        <tr>
          <td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,${brandDk})">
            <a href="${briefingUrl}"
               style="display:inline-block;color:${white};font-weight:700;font-size:15px;
                      padding:14px 32px;text-decoration:none;letter-spacing:.01em">
              ${ctaLabel} &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Rådata för transparens -->
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:${brand};text-transform:uppercase;letter-spacing:.1em">Detekterad avvikelse</p>
      <table width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid ${border};border-radius:8px;overflow:hidden;font-size:12px">
        <tr style="background:#F8FAF9">
          <th style="padding:8px 14px;text-align:left;color:${muted};font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:10px">Förväntad prissträng</th>
          <th style="padding:8px 14px;text-align:left;color:${muted};font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:10px">AI-detekterat</th>
        </tr>
        ${groupAlerts.slice(0, 3).map(a => `
        <tr>
          <td style="padding:9px 14px;border-top:1px solid ${border};color:${ink}">${a.check ?? '–'}</td>
          <td style="padding:9px 14px;border-top:1px solid ${border};color:${isIncrease ? '#991B1B' : '#166534'};font-weight:600">${a.haiku?.extractedPrice ?? 'Detekterad förändring'}</td>
        </tr>`).join('')}
      </table>

      <p style="margin:16px 0 0;font-size:11px;color:${muted};line-height:1.6">
        Arvo bevakar listpriser nattligen. Exakta tal beräknas från era lagrade analysdata.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:16px 32px;border-top:1px solid ${border};text-align:center">
      <p style="margin:0;font-size:10px;color:${muted}">
        Arvo Flow &nbsp;·&nbsp; <a href="${BASE_URL}" style="color:${brand};text-decoration:none">arvoflow.se</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
