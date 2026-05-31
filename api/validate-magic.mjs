// api/validate-magic.mjs — Validerar magic link-token och returnerar bypass-värde.
// POST { token } → { ok, bypass } där bypass = ARVO_BYPASS_SECRET
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

  const { token } = body;
  if (!token || typeof token !== 'string') return send(res, 400, { error: 'token saknas' });

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej tillgänglig' });

  let rows;
  try {
    rows = await db`
      SELECT id, email, expires_at, used_at
      FROM   magic_tokens
      WHERE  token = ${token}
      LIMIT  1
    `;
  } catch (err) {
    return send(res, 500, { error: 'DB-fel' });
  }

  if (!rows.length) return send(res, 404, { error: 'Ogiltig länk' });

  const row = rows[0];
  if (new Date(row.expires_at) < new Date()) {
    return send(res, 410, { error: 'Länken har gått ut — kontakta oss för en ny.' });
  }

  // Markera som använd (men tillåt återanvändning — stämplar bara första gången)
  if (!row.used_at) {
    await db`UPDATE magic_tokens SET used_at = NOW() WHERE id = ${row.id}`.catch(() => {});
  }

  const bypass = process.env.ARVO_BYPASS_SECRET;
  if (!bypass) return send(res, 500, { error: 'Servern är inte konfigurerad för magic links' });

  return send(res, 200, { ok: true, bypass, email: row.email });
}
