// api/briefing.mjs — Hämtar och uppdaterar Interactive Briefing via magic token.
//
// GET  /api/briefing?token=TOKEN → returnerar briefing JSON
// POST /api/briefing?token=TOKEN → { insightId, action } → sparar åtgärd + skickar internt alert
//
// Token-autentisering: magic_tokens.token (32-byte hex) + expires_at-validering.
// Briefingen märks viewed_at vid första GET.

import { getDb } from '../lib/db.js';
import { Resend } from 'resend';

const FROM     = process.env.RESEND_FROM       ?? 'Arvo Flow <analys@arvoflow.se>';
const ALERT_TO = process.env.ARVO_ALERT_EMAIL  ?? 'team@arvoflow.se';

export const config = { maxDuration: 15 };

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
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  const token = new URL(req.url, 'https://x').searchParams.get('token');
  if (!token) return send(res, 400, { error: 'token saknas' });

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej tillgänglig' });

  // ── GET: Hämta briefing ────────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const rows = await db`
        SELECT
          br.id, br.customer_email, br.period,
          br.insights, br.actions_taken,
          br.total_saving_potential, br.total_invoices_analyzed, br.insight_count,
          br.generated_at, br.viewed_at, br.expires_at
        FROM briefing_reports br
        JOIN magic_tokens mt ON mt.id = br.token_id
        WHERE mt.token    = ${token}
          AND mt.expires_at > NOW()
          AND br.expires_at > NOW()
        LIMIT 1
      `;

      if (!rows.length) {
        return send(res, 404, { error: 'Briefingen hittades inte eller har gått ut' });
      }

      const br = rows[0];

      if (!br.viewed_at) {
        db`UPDATE briefing_reports SET viewed_at = NOW() WHERE id = ${br.id}`.catch(() => {});
      }

      return send(res, 200, {
        ok: true,
        briefing: {
          id:                    br.id,
          period:                br.period,
          insights:              br.insights ?? [],
          actionsTaken:          br.actions_taken ?? {},
          totalSavingPotential:  br.total_saving_potential,
          totalInvoicesAnalyzed: br.total_invoices_analyzed,
          insightCount:          br.insight_count,
          generatedAt:           br.generated_at,
        },
      });
    } catch (err) {
      console.error('[briefing] GET error:', err.message);
      return send(res, 500, { error: 'Internt fel' });
    }
  }

  // ── POST: Fånga åtgärd ─────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { insightId, action } = await readBody(req);
    if (!insightId || !action) return send(res, 400, { error: 'insightId och action krävs' });

    try {
      const rows = await db`
        SELECT br.id, br.customer_email, br.period, br.insights, br.actions_taken
        FROM briefing_reports br
        JOIN magic_tokens mt ON mt.id = br.token_id
        WHERE mt.token    = ${token}
          AND br.expires_at > NOW()
        LIMIT 1
      `;

      if (!rows.length) return send(res, 404, { error: 'Briefingen hittades inte' });

      const br = rows[0];
      const insight = (br.insights ?? []).find(i => i.id === insightId);
      if (!insight) return send(res, 404, { error: 'Insikt hittades inte' });

      const updated = {
        ...(br.actions_taken ?? {}),
        [insightId]: {
          action,
          takenAt:            new Date().toISOString(),
          supplier:           insight.supplier,
          category:           insight.category,
          type:               insight.action?.type,
          estimatedNetSaving: insight.action?.estimatedNetSaving,
        },
      };

      await db`
        UPDATE briefing_reports
        SET actions_taken = ${JSON.stringify(updated)}::jsonb
        WHERE id = ${br.id}
      `;

      // Layer 2-utfallsspårning: varje kundaktivering skapar en rad i activation_outcomes.
      // fee_kr = generated column = 20% av verified_saving_kr när kunden bekräftar utfallet.
      if (insight.action?.type === 'approve_switch' || insight.action?.type === 'renegotiate') {
        db`
          INSERT INTO activation_outcomes
            (briefing_id, customer_email, supplier, category, action_type, predicted_saving_kr)
          VALUES
            (${br.id}, ${br.customer_email}, ${insight.supplier ?? ''},
             ${insight.category ?? ''}, ${insight.action.type},
             ${insight.action?.estimatedNetSaving ?? null})
          ON CONFLICT DO NOTHING
        `.catch(err => console.error('[briefing] activation_outcomes insert failed:', err.message));
      }

      // Internt Resend-alert
      if (process.env.RESEND_API_KEY) {
        const fmtKr = (n) => Math.round(n ?? 0).toLocaleString('sv-SE');
        const ts    = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
        new Resend(process.env.RESEND_API_KEY).emails.send({
          from: FROM,
          to:   ALERT_TO,
          subject: `[Arvo Intelligence] Kund aktiverade: ${insight.action?.type} · ${insight.supplier}`,
          html: `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#EEF4F1;font-family:Arial,sans-serif">
<table width="560" style="background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto">
<tr><td>
  <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.12em">Arvo Intelligence — Kundåtgärd</p>
  <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#0E1A17">${insight.action?.type === 'approve_switch' ? 'Bytesaktivering' : 'Förhandlingsuppdrag'}</p>
  <table width="100%">
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8"><span style="color:#5C6E68;font-size:13px">Kund</span></td>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8;text-align:right;font-size:13px;font-weight:600">${br.customer_email}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8"><span style="color:#5C6E68;font-size:13px">Leverantör</span></td>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8;text-align:right;font-size:13px;font-weight:600">${insight.supplier} (${insight.category})</td>
    </tr>
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8"><span style="color:#5C6E68;font-size:13px">Potentiell besparing</span></td>
      <td style="padding:8px 0;border-bottom:1px solid #E2EDE8;text-align:right;font-size:13px;font-weight:700;color:#1B7A6E">${fmtKr(insight.action?.estimatedNetSaving)} kr/år</td>
    </tr>
    <tr>
      <td style="padding:8px 0"><span style="color:#5C6E68;font-size:13px">Period</span></td>
      <td style="padding:8px 0;text-align:right;font-size:13px">${br.period}</td>
    </tr>
  </table>
  <p style="margin:20px 0 0;font-size:11px;color:#8A9E97">Arvo Flow · ${ts}</p>
</td></tr>
</table>
</body></html>`,
        }).catch(err => console.error('[briefing] alert email failed:', err.message));
      }

      return send(res, 200, { ok: true, actionsTaken: updated });
    } catch (err) {
      console.error('[briefing] POST error:', err.message);
      return send(res, 500, { error: 'Internt fel' });
    }
  }

  return send(res, 405, { error: 'Metod inte tillåten' });
}
