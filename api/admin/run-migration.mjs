// api/admin/run-migration.mjs — Engångsanrop för att skapa nya DB-tabeller.
// Anropas EN gång via admin-sidan, sedan kan den lämnas kvar (skyddad av ADMIN_TOKEN).
import { getDb } from '../../lib/db.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  const results = [];

  const steps = [
    {
      name: 'waitlist',
      sql: `CREATE TABLE IF NOT EXISTS waitlist (
        id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
        email      TEXT        NOT NULL,
        source     TEXT        NOT NULL DEFAULT 'review_queue',
        reason     TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (email, source)
      )`,
    },
    {
      name: 'invoice_feedback',
      sql: `CREATE TABLE IF NOT EXISTS invoice_feedback (
        id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        fingerprint TEXT NOT NULL,
        supplier    TEXT,
        category    TEXT,
        vote        TEXT NOT NULL CHECK (vote IN ('up', 'down')),
        comment     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'magic_tokens',
      sql: `CREATE TABLE IF NOT EXISTS magic_tokens (
        id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        token      TEXT NOT NULL UNIQUE,
        email      TEXT NOT NULL,
        note       TEXT,
        used_at    TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'idx_magic_tokens_token',
      sql: `CREATE INDEX IF NOT EXISTS idx_magic_tokens_token ON magic_tokens (token)`,
    },
    {
      name: 'idx_feedback_fingerprint',
      sql: `CREATE INDEX IF NOT EXISTS idx_feedback_fingerprint ON invoice_feedback (fingerprint, created_at DESC)`,
    },
  ];

  for (const step of steps) {
    try {
      await db.unsafe(step.sql);
      results.push({ name: step.name, ok: true });
    } catch (err) {
      results.push({ name: step.name, ok: false, error: err.message });
    }
  }

  const allOk = results.every((r) => r.ok);
  return send(res, allOk ? 200 : 207, { ok: allOk, results });
}
