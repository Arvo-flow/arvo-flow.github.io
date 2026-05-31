// api/outcome-survey.mjs — Registrerar utfall från 60-dagars uppföljning.
// POST { analysisId, switched, actualAnnualCost? } → { ok: true }
import { getDb } from '../lib/db.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const { analysisId, switched, actualAnnualCost } = body;
  if (!analysisId || typeof analysisId !== 'string') {
    return send(res, 400, { error: 'analysisId saknas' });
  }
  if (typeof switched !== 'boolean') {
    return send(res, 400, { error: 'switched måste vara boolean' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  try {
    // Hämta analysdata för att kunna lagra i arvo_outcomes
    const analyses = await db`
      SELECT id, supplier, normalized_supplier, category,
             annual_cost, suggested_annual_cost, net_saving, user_email
      FROM invoice_analyses
      WHERE id = ${analysisId}::uuid
      LIMIT 1
    `;
    if (!analyses.length) return send(res, 404, { error: 'Analys hittades inte' });
    const a = analyses[0];

    if (switched) {
      const actual    = actualAnnualCost != null ? Number(actualAnnualCost) : null;
      const actualNet = actual != null ? (a.annual_cost ?? 0) - actual : null;

      await db`
        INSERT INTO arvo_outcomes (
          analysis_id, fingerprint, supplier, category,
          predicted_net, actual_net,
          predicted_annual_cost, actual_annual_cost,
          switched, switched_at, source
        ) VALUES (
          ${a.id},
          null,
          ${a.normalized_supplier ?? a.supplier},
          ${a.category},
          ${a.net_saving ?? null},
          ${actualNet},
          ${a.suggested_annual_cost ?? null},
          ${actual},
          true,
          NOW(),
          'outcome-survey'
        )
        ON CONFLICT (analysis_id) DO UPDATE
          SET actual_net          = EXCLUDED.actual_net,
              actual_annual_cost  = EXCLUDED.actual_annual_cost,
              switched_at         = EXCLUDED.switched_at
      `;
    }

    // Markera att utfallet är registrerat (oavsett svar)
    await db`
      UPDATE invoice_analyses
      SET outcome_email_sent_at = COALESCE(outcome_email_sent_at, NOW())
      WHERE id = ${analysisId}::uuid
    `;

    return send(res, 200, { ok: true, switched, supplier: a.supplier });
  } catch (err) {
    console.error('[outcome-survey] fel:', err.message);
    return send(res, 500, { error: 'Kunde inte spara utfall' });
  }
}
