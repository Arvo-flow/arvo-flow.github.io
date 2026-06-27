// api/ingest/retry.mjs — POST: "Försök igen" på fallna fakturor för den inloggade identiteten.
// Återställer status='failed' → 'pending' så drain-cronen kör om dem (PDF:en hämtas på nytt ur Resend
// via email_id + bilage-index — inget nytt mejl behövs). Återhämtar transienta fel (kredit-slut, timeout).
//
// SÄKERHET: ägarskap krävs (varaktig session ELLER färsk magic-token) — du kan bara köra om DINA egna.
import { getDb } from '../../lib/db.js';
import { verifySession } from '../../lib/session.js';
import { retryFailedBySender } from '../../lib/ingest-queue.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function emailFromMagic(token) {
  if (!token || typeof token !== 'string' || token.length < 32) return null;
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`SELECT email FROM magic_tokens WHERE token = ${token} AND expires_at > NOW() LIMIT 1`;
    return rows[0]?.email ?? null;
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'POST krävs' });

  let body;
  try { body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}'); }
  catch { return send(res, 400, { error: 'ogiltig JSON' }); }

  const email = verifySession(body.session)?.email || await emailFromMagic(body.magic);
  if (!email) return send(res, 401, { error: 'ägarskap krävs (session eller magic)' });

  const requeued = await retryFailedBySender(email);
  return send(res, 200, { ok: true, requeued });
}
