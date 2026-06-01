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

const FROM     = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
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
          subject: `Arvo-briefing ${periodDisplay} — ${data.insightCount} ${data.insightCount === 1 ? 'insikt' : 'insikter'} identifierade`,
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

function buildHookEmail({ insightCount, totalSaving, period, briefingUrl }) {
  const fmt = (n) => Math.round(n).toLocaleString('sv-SE');
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Arvo-briefing ${period}</title>
</head>
<body style="margin:0;padding:0;background:#0A1512;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0A1512;padding:48px 16px">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%">

  <!-- Avsändare-chip -->
  <tr><td style="padding-bottom:36px;text-align:center">
    <p style="margin:0 0 8px;font-size:11px;color:#1DB09A;text-transform:uppercase;letter-spacing:.18em;font-weight:700">Arvo Intelligence</p>
    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.35)">${period}</p>
  </td></tr>

  <!-- Huvudkort -->
  <tr><td style="background:#0F2018;border:1px solid rgba(29,176,154,0.20);border-radius:20px;padding:44px 40px">

    <!-- Besparing -->
    <p style="margin:0 0 6px;font-size:11px;color:rgba(255,255,255,0.40);text-transform:uppercase;letter-spacing:.12em">Potentiell besparing</p>
    <p style="margin:0 0 28px;font-size:52px;font-weight:800;color:#ffffff;line-height:1;letter-spacing:-.02em">
      ${fmt(totalSaving)}<span style="font-size:22px;font-weight:400;color:rgba(255,255,255,0.40);margin-left:8px">kr/år</span>
    </p>

    <!-- Brödtext -->
    <p style="margin:0 0 36px;font-size:16px;color:rgba(255,255,255,0.70);line-height:1.6">
      Arvo har identifierat <strong style="color:#fff">${insightCount} ${insightCount === 1 ? 'besparingsinsikt' : 'besparingsinsikter'}</strong> för ert bolag denna period.
      Varje insikt är en konkret åtgärd du kan aktivera med ett klick — Arvo sköter resten.
    </p>

    <!-- CTA -->
    <a href="${briefingUrl}"
       style="display:block;background:linear-gradient(135deg,#1DB09A 0%,#0B7A6A 100%);color:#ffffff;text-decoration:none;text-align:center;padding:18px 24px;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:.02em">
      Öppna Arvo-briefingen →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding-top:28px;text-align:center">
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.20);line-height:1.7">
      Arvo Intelligence · Automatiskt genererad för ert bolag<br>
      <a href="https://arvoflow.se" style="color:rgba(255,255,255,0.25);text-decoration:none">arvoflow.se</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
