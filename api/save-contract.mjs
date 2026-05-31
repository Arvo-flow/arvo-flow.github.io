// api/save-contract.mjs — Sparar avtalsdatum för en faktura-analys.
// POST { analysisId, contractEndDate, email? } → { ok: true }
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

  const { analysisId, contractEndDate, email } = body;

  if (!analysisId || typeof analysisId !== 'string') {
    return send(res, 400, { error: 'analysisId saknas' });
  }
  if (!contractEndDate || isNaN(Date.parse(contractEndDate))) {
    return send(res, 400, { error: 'Ogiltigt datum' });
  }

  // Validera att datumet är i framtiden (rimlighetskontroll)
  const date = new Date(contractEndDate);
  if (date < new Date()) {
    return send(res, 400, { error: 'Avtalsdatum måste vara i framtiden' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  try {
    const cleanEmail = email ? email.trim().toLowerCase() : null;
    await db`
      UPDATE invoice_analyses
      SET
        contract_end_date = ${date.toISOString().split('T')[0]},
        user_email = COALESCE(${cleanEmail}, user_email)
      WHERE id = ${analysisId}::uuid
    `;
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[save-contract] DB-fel:', err.message);
    return send(res, 500, { error: 'Kunde inte spara' });
  }
}
