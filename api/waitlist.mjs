// api/waitlist.mjs — Lagrar e-postadresser från review_queue-fångst och andra waitlists.
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

  const { email, source = 'review_queue', reason } = body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }

  const cleanEmail = email.trim().toLowerCase().slice(0, 254);
  const cleanSource = String(source).slice(0, 64);
  const cleanReason = reason ? String(reason).slice(0, 128) : null;

  const db = getDb();
  if (!db) {
    console.warn('[waitlist] DB ej konfigurerad — e-post loggad men ej sparad:', cleanEmail);
    return send(res, 200, { ok: true, stored: false });
  }

  try {
    await db`
      CREATE TABLE IF NOT EXISTS waitlist (
        id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
        email      TEXT        NOT NULL,
        source     TEXT        NOT NULL DEFAULT 'review_queue',
        reason     TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (email, source)
      )
    `;
    await db`
      INSERT INTO waitlist (email, source, reason)
      VALUES (${cleanEmail}, ${cleanSource}, ${cleanReason})
      ON CONFLICT (email, source) DO UPDATE SET reason = EXCLUDED.reason
    `;
  } catch (err) {
    console.error('[waitlist] DB-fel:', err.message);
    return send(res, 200, { ok: true, stored: false });
  }

  return send(res, 200, { ok: true, stored: true });
}
