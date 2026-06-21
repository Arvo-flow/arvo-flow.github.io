// api/cron/generate-briefings.mjs — Månadsvis Interactive Briefing-generering.
// Kör 1:a varje månad kl 09:00 UTC — genererar insikter för förra månaden.
//
// vercel.json: { "crons": [{ "path": "/api/cron/generate-briefings", "schedule": "0 9 1 * *" }] }
//
// Flöde per email:
//   1. Hämta alla auto-route-analyser för förra månaden
//   2. Generera insikter (deterministic, ingen AI)
//   3. Skapa magic token (30 dagars TTL)
//   4. Upserta briefing_reports
//   5. Skicka hook-email med magic link

import { getDb }                    from '../../lib/db.js';
import { generateBriefingInsights } from '../../lib/briefing-generator.js';
import { Resend }                   from 'resend';
import crypto                       from 'crypto';

const FROM     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvoflow.se>';
const BASE_URL = process.env.ARVO_BASE_URL    ?? 'https://arvoflow.se';

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const db = getDb();
  if (!db) return res.status(503).json({ error: 'DB ej tillgänglig' });

  const now = new Date();

  // Period = förra månaden
  const periodDate  = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const period      = `${periodDate.getFullYear()}-${String(periodDate.getMonth() + 1).padStart(2, '0')}`;
  const periodStart = periodDate.toISOString();
  const periodEnd   = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const periodLabel = periodDate.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
  const periodDisplay = periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1);

  // Alla unika emails med analyser förra månaden (max 50/körning)
  const emails = await db`
    SELECT DISTINCT user_email
    FROM invoice_analyses
    WHERE user_email  IS NOT NULL
      AND route        = 'auto'
      AND created_at  >= ${periodStart}
      AND created_at   < ${periodEnd}
    LIMIT 50
  `;

  const resend  = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const results = [];

  for (const { user_email: email } of emails) {
    try {
      // Hoppa över om redan genererad
      const existing = await db`
        SELECT id FROM briefing_reports
        WHERE customer_email = ${email} AND period = ${period}
        LIMIT 1
      `;
      if (existing.length) {
        results.push({ email, ok: true, skipped: true });
        continue;
      }

      // Generera insikter
      const data = await generateBriefingInsights({ email, periodStart, periodEnd });
      if (!data || data.insightCount === 0) {
        results.push({ email, ok: true, skipped: true, reason: 'no_insights' });
        continue;
      }

      // Magic token (30 dagar)
      const token       = crypto.randomBytes(32).toString('hex');
      const tokenExpiry = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      const tokenRows   = await db`
        INSERT INTO magic_tokens (token, email, note, expires_at)
        VALUES (${token}, ${email}, ${'briefing:' + period}, ${tokenExpiry.toISOString()})
        RETURNING id
      `;
      const tokenId = tokenRows[0]?.id;

      // Upsert briefing_reports
      await db`
        INSERT INTO briefing_reports
          (customer_email, period, insights, total_saving_potential,
           total_invoices_analyzed, insight_count, token_id)
        VALUES
          (${email}, ${period},
           ${JSON.stringify(data.insights)}::jsonb,
           ${data.totalSavingPotential},
           ${data.totalInvoicesAnalyzed},
           ${data.insightCount},
           ${tokenId})
        ON CONFLICT (customer_email, period) DO UPDATE
          SET insights               = EXCLUDED.insights,
              total_saving_potential = EXCLUDED.total_saving_potential,
              insight_count          = EXCLUDED.insight_count
      `;

      // Hook-email
      if (resend) {
        const briefingUrl = `${BASE_URL}/briefing/${token}`;
        await resend.emails.send({
          from:    FROM,
          to:      email,
          subject: `Arvo Intelligence · ${periodDisplay} · ${Math.round(data.totalSavingPotential).toLocaleString('sv-SE')} kr/år identifierat`,
          html:    buildHookEmail({
            insightCount: data.insightCount,
            totalSaving:  data.totalSavingPotential,
            period:       periodDisplay,
            briefingUrl,
          }),
        });
      }

      results.push({ email, ok: true, insightCount: data.insightCount, totalSaving: data.totalSavingPotential });
    } catch (err) {
      console.error(`[generate-briefings] Error for ${email}:`, err.message);
      results.push({ email, ok: false, error: err.message });
    }
  }

  return res.status(200).json({
    ok:        true,
    period,
    processed: results.length,
    sent:      results.filter(r => r.ok && !r.skipped).length,
    results,
  });
}

// Premium hook-email — kortare än ett bankkort, tyngre än ett revisorsutlåtande.
// Principen: ett tal, ett beslut, en knapp. Inget mer.
function buildHookEmail({ insightCount, totalSaving, period, briefingUrl }) {
  const fmt = (n) => Math.round(n).toLocaleString('sv-SE');
  const finding = insightCount === 1
    ? 'Vi identifierade ett avtal som avviker från marknadsnivå.'
    : `Vi identifierade ${insightCount} avtal som avviker från marknadsnivå.`;

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0A1512;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A1512;padding:56px 16px">
<tr><td align="center">
<table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%">

  <!-- Avsändare -->
  <tr><td style="padding-bottom:40px">
    <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1DB09A;text-transform:uppercase;letter-spacing:.22em">Arvo Intelligence</p>
    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25)">${period}</p>
  </td></tr>

  <!-- Separatorlinje -->
  <tr><td style="border-top:1px solid rgba(29,176,154,0.18);padding-bottom:44px"></td></tr>

  <!-- Det enda som spelar roll: siffran -->
  <tr><td style="padding-bottom:10px">
    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.30);letter-spacing:.04em">Möjlig besparing</p>
  </td></tr>
  <tr><td style="padding-bottom:32px">
    <p style="margin:0;font-size:68px;font-weight:800;color:#ffffff;line-height:1;letter-spacing:-.04em">
      ${fmt(totalSaving)}<span style="font-size:26px;font-weight:300;color:rgba(255,255,255,0.28);margin-left:8px">kr/år</span>
    </p>
  </td></tr>

  <!-- Korthugget fynd — inte en knapp-instruktion -->
  <tr><td style="padding-bottom:44px">
    <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.50);line-height:1.65">${finding}</p>
  </td></tr>

  <!-- CTA — en dörr, inte en reklambanner -->
  <tr><td style="padding-bottom:56px">
    <a href="${briefingUrl}"
       style="display:inline-block;background:linear-gradient(135deg,#1DB09A 0%,#0A6B5C 100%);color:#ffffff;text-decoration:none;padding:16px 28px;border-radius:10px;font-size:15px;font-weight:700;letter-spacing:.01em">
      Se analysen →
    </a>
  </td></tr>

  <!-- Footer — diskret, inte ursäktande -->
  <tr><td style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);line-height:1.8">
      Arvo Intelligence &nbsp;·&nbsp; Konfidentiellt &nbsp;·&nbsp;
      <a href="https://arvoflow.se" style="color:rgba(255,255,255,0.20);text-decoration:none">arvoflow.se</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
