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

export const config = { maxDuration: 60 };

const FROM     = process.env.RESEND_FROM    ?? 'Arvo Flow <analys@arvo-flow.se>';
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
  if (s.includes('pipedrive'))    return 'pipedrive';
  if (s.includes('hubspot'))      return 'hubspot';
  if (s.includes('zoho'))         return 'zoho';
  return s.split(/\s+/)[0];
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
      const annualCost   = Number(customer.annualCost ?? 0);
      const seatCount    = customer.seatCount ?? null;
      const haikuPrice   = groupAlerts[0]?.haiku?.extractedPrice;

      // Per-säte impact-estimat
      let impactKrYear = null;
      if (seatCount && haikuPrice && annualCost > 0) {
        const perSeatYear = annualCost / seatCount;
        const numMatch = haikuPrice.match(/[\d\s]+[,.]?[\d]*/);
        if (numMatch) {
          const n = parseFloat(numMatch[0].replace(/\s/g, '').replace(',', '.'));
          if (!isNaN(n)) {
            const newPerSeatYear = n < 1000 ? n * 12 : n;
            impactKrYear = Math.round((newPerSeatYear - perSeatYear) * seatCount);
          }
        }
      }
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
              subheadline: impactKrYear && impactKrYear > 0
                ? `${fmt(impactKrYear)} kr/år identifierad påverkan`
                : 'Arvo granskar om förändringen är befogad',
              supplier: supplierName, category,
              action: {
                label: 'Låt Arvo granska och förhandla', type: 'renegotiate',
                estimatedNetSaving: impactKrYear && impactKrYear > 0 ? Math.round(impactKrYear * 0.85) : 0,
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
      const subject = impactKrYear && impactKrYear > 0
        ? `Arvo: ${supplierName} har höjt priset — ${fmt(impactKrYear)} kr/år påverkan`
        : `Arvo har noterat en prisändring hos ${supplierName}`;

      const html = buildAlertEmail({ supplierName, groupAlerts, segStats, impactKrYear, seatCount, briefingUrl, date: reportDate });

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

// ── Minimal alert-mail ────────────────────────────────────────────────────────
function buildAlertEmail({ supplierName, groupAlerts, segStats, impactKrYear, seatCount, briefingUrl, date }) {
  const isIncrease = impactKrYear != null ? impactKrYear > 0 : true;
  const segLine    = segStats.total >= 3
    ? `<p style="margin:0 0 16px;padding:12px 16px;background:#EEF9F7;border-radius:8px;font-size:13px;color:#1B7A6E;font-weight:600">Arvo följer ${segStats.total} bolag med liknande profil — ${segStats.withSupplier} av dessa använder ${supplierName}.</p>`
    : '';
  const impactLine = impactKrYear && impactKrYear > 0
    ? `<p style="margin:0 0 20px;font-size:28px;font-weight:800;color:#0E1A17;letter-spacing:-.03em">+${fmt(Math.abs(impactKrYear))} kr/år${seatCount ? `<span style="font-size:14px;font-weight:400;color:#5C6E68;margin-left:8px">${seatCount} licenser</span>` : ''}</p>`
    : '';

  return `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F6F3;font-family:-apple-system,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:600px;box-shadow:0 2px 16px rgba(14,26,23,0.08)">
<tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA,#1B6E66)">&nbsp;</td></tr>
<tr><td style="padding:28px 36px 22px;border-bottom:1px solid #D5E2DC">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.1em">Arvo Intelligence</p>
  <p style="margin:0;font-size:22px;font-weight:800;color:#0E1A17">${isIncrease ? `${supplierName} har höjt priset` : `Prisändring hos ${supplierName}`}</p>
  <p style="margin:6px 0 0;font-size:12px;color:#5C6E68">${date}</p>
</td></tr>
<tr><td style="padding:28px 36px">
  <p style="margin:0 0 20px;font-size:15px;color:#0E1A17;line-height:1.65">Arvo bevakar era leverantörskostnader nattligen och har detekterat en förändring hos <strong>${supplierName}</strong>.</p>
  ${impactLine}
  ${segLine}
  <table cellpadding="0" cellspacing="0" style="margin:0 0 24px">
    <tr><td style="border-radius:10px;background:linear-gradient(135deg,#5DD6CA,#1B6E66)">
      <a href="${briefingUrl}" style="display:inline-block;color:#fff;font-weight:700;font-size:15px;padding:15px 36px;text-decoration:none">
        ${isIncrease ? 'Låt Arvo granska och förhandla' : 'Se fullständig analys'} &rarr;
      </a>
    </td></tr>
  </table>
  <p style="margin:0;font-size:12px;color:#5C6E68">AI-extraherade priser är indikativa — den fullständiga analysen finns i briefingen ovan.</p>
</td></tr>
<tr><td style="padding:16px 36px;border-top:1px solid #D5E2DC;text-align:center">
  <p style="margin:0;font-size:11px;color:#5C6E68">Arvo Flow · <a href="${BASE_URL}/testa-faktura" style="color:#1B7A6E;text-decoration:none">arvoflow.se</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}
