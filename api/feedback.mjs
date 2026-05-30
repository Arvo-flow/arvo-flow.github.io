// api/feedback.mjs — Lagrar "Stämde detta?" röster från analysresultaten.
import { createHash } from 'node:crypto';
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

  const { fingerprint, supplier, category, vote, comment } = body;

  if (!fingerprint || !vote || !['up', 'down'].includes(vote)) {
    return send(res, 400, { error: 'fingerprint och vote (up|down) är obligatoriska' });
  }

  const hashedFp = createHash('sha256').update(String(fingerprint)).digest('hex').slice(0, 32);

  const db = getDb();
  if (!db) return send(res, 200, { ok: true, stored: false });

  try {
    await db`
      CREATE TABLE IF NOT EXISTS invoice_feedback (
        id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        fingerprint TEXT NOT NULL,
        supplier    TEXT,
        category    TEXT,
        vote        TEXT NOT NULL CHECK (vote IN ('up', 'down')),
        comment     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await db`
      INSERT INTO invoice_feedback (fingerprint, supplier, category, vote, comment)
      VALUES (
        ${hashedFp},
        ${supplier ? String(supplier).slice(0, 200) : null},
        ${category ? String(category).slice(0, 64)  : null},
        ${vote},
        ${comment  ? String(comment).slice(0, 500)  : null}
      )
    `;
  } catch (err) {
    console.error('[feedback] DB-fel:', err.message);
    return send(res, 200, { ok: true, stored: false });
  }

  return send(res, 200, { ok: true });
}
