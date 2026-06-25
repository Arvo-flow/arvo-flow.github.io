// api/cron/run-price-alerts.mjs — Arvo Intelligence alertpipeline
//
// Kallas av GitHub Actions direkt efter price-monitor.mjs via HTTP POST med
// rapportens JSON som body. Autentiseras med CRON_SECRET (Bearer-token).
//
// Vercel kör denna som serverless funktion (maxDuration: 60s).
// GH Actions-alternativet är scripts/notify-price-changes.mjs (direkt Node.js).
//
// POST /api/cron/run-price-alerts
//   Body: price-monitor-rapport (samma format som /tmp/price-monitor-report.json)
//   Auth: Authorization: Bearer <CRON_SECRET>
//
// Returnerar: { ok, processed, sent, skipped, failed }

import crypto from 'crypto';
import { Resend } from 'resend';
import { getDb } from '../../lib/db.js';
import {
  getAffectedCustomers,
  getSegmentStats,
  hasAlertBeenSent,
  markAlertSent,
} from '../../lib/price-alert-store.js';
import { computeImpactKr, parseCheckPrice } from '../../lib/price-impact.js';
import { extractSupplierKeyword } from '../../lib/supplier-keyword.js';

export const config = { maxDuration: 60 };

const FROM     = process.env.RESEND_FROM    ?? 'Arvo Flow <analys@arvoflow.se>';
const BASE_URL = process.env.ARVO_BASE_URL  ?? 'https://arvoflow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => { data += c; });
    req.on('end', () => {
      try { resolve(JSON.parse(data)); }
      catch { resolve(null); }
    });
    req.on('error', reject);
  });
}

function fmt(n) { return Math.round(n ?? 0).toLocaleString('sv-SE'); }

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'POST krävs' });

  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return send(res, 401, { error: 'unauthorized' });
  }

  const report = await readBody(req);
  if (!report?.alerts) return send(res, 400, { error: 'Ogiltig rapport-payload' });

  const alerts = (report.alerts ?? []).filter(
    a => a.haiku?.actionRequired !== 'false_positive',
  );

  if (!alerts.length) {
    return send(res, 200, { ok: true, processed: 0, sent: 0, skipped: 0, failed: 0 });
  }

  const resend      = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const db          = getDb();
  const monitorRunId = report.runAt;
  const reportDate   = new Date(report.runAt).toLocaleDateString('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: 'long', day: 'numeric',
  });

  // Gruppera alerts per (leverantörsnyckelord, kategori)
  const alertGroups = new Map();
  for (const alert of alerts) {
    const keyword  = extractSupplierKeyword(alert.supplier);
    const groupKey = `${keyword}::${alert.category}`;
    if (!alertGroups.has(groupKey)) alertGroups.set(groupKey, { keyword, category: alert.category, items: [] });
    alertGroups.get(groupKey).items.push(alert);
  }

  let totalSent = 0, totalSkipped = 0, totalFailed = 0;

  for (const [, { keyword, category, items: groupAlerts }] of alertGroups) {
    const alreadySent = await hasAlertBeenSent({ monitorRunId, supplier: keyword, category });
    if (alreadySent) { totalSkipped++; continue; }

    const customers = await getAffectedCustomers({ supplierKeyword: keyword, category });
    if (!customers.length) {
      await markAlertSent({ monitorRunId, supplier: keyword, category, emailsSent: 0, totalImpactKr: 0 });
      continue;
    }

    const segStats = await getSegmentStats({ category, supplierKeyword: keyword });
    let groupSent = 0, groupImpact = 0;

    for (const customer of customers) {
      if (!resend) continue;

      const supplierName = (customer.supplier || keyword).replace(/\b\w/g, c => c.toUpperCase());
      const seatCount    = customer.seatCount ?? null;
      const primaryAlert = groupAlerts[0];

      // Deterministisk impact via parseCheckPrice + computeImpactKr
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
            fxRates: null,
          })
        : null;

      const impactKrYear = impact?.impactKrYear ?? null;
      if (impactKrYear) groupImpact += Math.abs(impactKrYear);

      // Magic token + briefing_reports
      let briefingUrl = `${BASE_URL}/testa-faktura`;
      if (db) {
        try {
          const token   = crypto.randomBytes(32).toString('hex');
          const expires = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
          const tokenRows = await db`
            INSERT INTO magic_tokens (token, email, note, expires_at)
            VALUES (${token}, ${customer.email}, ${'price-alert:' + monitorRunId}, ${expires.toISOString()})
            RETURNING id
          `;
          const tokenId = tokenRows[0]?.id;
          if (tokenId) {
            const period  = 'alert-' + new Date(report.runAt).toISOString().slice(0, 7);
            const insight = {
              id: crypto.randomUUID(), type: 'price_alert',
              headline: `${supplierName} har ändrat sin prisbild`,
              subheadline: impact && impact.impactKrYear > 0
                ? `${fmt(impact.impactKrYear)} kr/år — ${impact.deltaPct > 0 ? '+' : ''}${impact.deltaPct}%`
                : 'Arvo granskar om förändringen är befogad',
              supplier: supplierName, category,
              metric: impact && impact.impactKrYear > 0 ? {
                primary:   { value: impact.impactKrYear, label: 'Kostnadspåverkan/år' },
                secondary: { value: impact.deltaPct,    label: `+% (${impact.seats} licenser)` },
              } : null,
              context: impact && impact.impactKrYear > 0
                ? `Priset gick från ${fmt(impact.oldKrMonth)} till ${fmt(impact.newKrMonth)} kr/licens/mån.`
                : null,
              action: {
                label: 'Låt Arvo förhandla tillbaka priset', type: 'renegotiate',
                estimatedNetSaving: impact && impact.impactKrYear > 0 ? Math.round(impact.impactKrYear * 0.80) : 0,
              },
            };
            await db`
              INSERT INTO briefing_reports
                (customer_email, period, insights, total_saving_potential,
                 total_invoices_analyzed, insight_count, token_id)
              VALUES
                (${customer.email}, ${period},
                 ${JSON.stringify([insight])}::jsonb,
                 ${impactKrYear ? Math.abs(impactKrYear) : 0},
                 1, 1, ${tokenId})
              ON CONFLICT (customer_email, period) DO UPDATE
                SET insights = EXCLUDED.insights, token_id = EXCLUDED.token_id
            `;
            briefingUrl = `${BASE_URL}/briefing/${token}`;
          }
        } catch (dbErr) {
          console.warn('[run-price-alerts] magic token failed (non-fatal):', dbErr.message);
        }
      }

      // Skicka alert-mail
      const subject = impact && impact.impactKrYear > 0
        ? `${supplierName}: +${fmt(impact.impactKrYear)} kr/år — Arvo har detekterat en prishöjning`
        : `Arvo har noterat en prisändring hos ${supplierName}`;

      const html = buildAlertEmail({ supplierName, groupAlerts, segStats, impact, briefingUrl, date: reportDate });

      try {
        const { error } = await resend.emails.send({ from: FROM, to: customer.email, subject, html });
        if (error) throw new Error(JSON.stringify(error));
        groupSent++;
        totalSent++;
      } catch (emailErr) {
        console.error('[run-price-alerts] email failed:', customer.email, emailErr.message);
        totalFailed++;
      }
    }

    await markAlertSent({ monitorRunId, supplier: keyword, category, emailsSent: groupSent, totalImpactKr: groupImpact, haikuAnalysis: groupAlerts[0]?.haiku ?? null });
  }

  return send(res, 200, { ok: true, processed: alertGroups.size, sent: totalSent, skipped: totalSkipped, failed: totalFailed });
}

// ── Bloomberg Terminal alert-mail ─────────────────────────────────────────────
function buildAlertEmail({ supplierName, groupAlerts, segStats, impact, briefingUrl, date }) {
  const hasImpact  = impact && impact.impactKrYear > 0;
  const isIncrease = hasImpact;

  // Segment intelligence — "X av Y bolag i er segment"
  const segLine = segStats.total >= 3
    ? `<tr><td colspan="2" style="padding:12px 14px;background:#EEF9F7;border-radius:8px;font-size:13px;color:#1B7A6E;font-weight:600;margin-bottom:20px;display:block">
        Arvo ser samma höjning hos ${segStats.withSupplier} av ${segStats.total} bolag i ert segment
       </td></tr>`
    : '';

  // Exakt kr-beräkning i tabellrad
  const breakdownRows = hasImpact ? `
    <tr style="border-top:1px solid #D5E2DC">
      <td style="padding:10px 0;font-size:13px;color:#5C6E68;width:200px">Gammalt pris/licens/mån</td>
      <td style="padding:10px 0;font-size:13px;color:#0E1A17;font-weight:600;text-align:right">${fmt(impact.oldKrMonth)} kr</td>
    </tr>
    <tr>
      <td style="padding:10px 0;font-size:13px;color:#5C6E68">Nytt pris/licens/mån</td>
      <td style="padding:10px 0;font-size:13px;color:#C0392B;font-weight:700;text-align:right">+${fmt(impact.newKrMonth)} kr (+${impact.deltaPct}%)</td>
    </tr>
    <tr>
      <td style="padding:10px 0;font-size:13px;color:#5C6E68">Antal licenser</td>
      <td style="padding:10px 0;font-size:13px;color:#0E1A17;font-weight:600;text-align:right">${impact.seats} st</td>
    </tr>
    <tr style="border-top:2px solid #0E1A17">
      <td style="padding:14px 0 6px;font-size:14px;color:#0E1A17;font-weight:700">Total påverkan/år</td>
      <td style="padding:14px 0 6px;font-size:20px;color:#C0392B;font-weight:800;text-align:right">+${fmt(impact.impactKrYear)} kr</td>
    </tr>` : '';

  const impactHeadline = hasImpact
    ? `<p style="margin:0 0 8px;font-size:36px;font-weight:800;color:#C0392B;letter-spacing:-.04em">+${fmt(impact.impactKrYear)} kr/år</p>
       <p style="margin:0 0 24px;font-size:13px;color:#5C6E68">${impact.oldKrMonth} → ${impact.newKrMonth} kr/licens/mån · ${impact.seats} licenser · +${impact.deltaPct}%</p>`
    : `<p style="margin:0 0 24px;font-size:15px;color:#5C6E68">Arvo granskar om förändringen är befogad och kontaktar er med en rekommendation.</p>`;

  return `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F6F3;font-family:-apple-system,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:600px;box-shadow:0 2px 16px rgba(14,26,23,0.08)">
<tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA,#1B6E66)">&nbsp;</td></tr>
<tr><td style="padding:28px 36px 22px;border-bottom:1px solid #D5E2DC">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.1em">Arvo Intelligence · Prishöjningsvarning</p>
  <p style="margin:0;font-size:22px;font-weight:800;color:#0E1A17">
    ${isIncrease ? `${supplierName} har höjt priset` : `Prisändring hos ${supplierName}`}
  </p>
  <p style="margin:6px 0 0;font-size:12px;color:#5C6E68">${date}</p>
</td></tr>
<tr><td style="padding:28px 36px">
  ${impactHeadline}
  ${hasImpact ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-radius:10px;background:#F8FAF9;padding:4px 16px;border:1px solid #D5E2DC">
    ${segLine}
    ${breakdownRows}
  </table>` : ''}
  <table cellpadding="0" cellspacing="0" style="margin:0 0 20px">
    <tr><td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,#1B6E66)">
      <a href="${briefingUrl}" style="display:inline-block;color:#fff;font-weight:700;font-size:15px;padding:15px 36px;text-decoration:none">
        ${isIncrease ? 'Låt Arvo förhandla tillbaka priset' : 'Se fullständig analys'} &rarr;
      </a>
    </td></tr>
  </table>
  <p style="margin:0;font-size:12px;color:#5C6E68">Beräkningen baseras på er senaste faktura. Fullständig verifiering i briefingen ovan.</p>
</td></tr>
<tr><td style="padding:16px 36px;border-top:1px solid #D5E2DC;text-align:center">
  <p style="margin:0;font-size:11px;color:#5C6E68">Arvo Flow · <a href="${BASE_URL}/testa-faktura" style="color:#1B7A6E;text-decoration:none">arvoflow.se</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}
