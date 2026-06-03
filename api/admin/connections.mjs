// api/admin/connections.mjs — OAuth-anslutningar: lista alla inkopplade inkorgar.
// Autentisering: x-admin-token header måste matcha ADMIN_TOKEN env-variabeln.
import { getDb } from '../../lib/db.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Endast GET stöds' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad' });

  const connections = await db`
    SELECT
      id,
      email,
      provider,
      scope,
      token_expiry,
      created_at,
      updated_at,
      CASE WHEN token_expiry > NOW() THEN true ELSE false END AS token_valid
    FROM oauth_connections
    ORDER BY updated_at DESC
    LIMIT 500
  `.catch(() => []);

  const stats = await db`
    SELECT
      provider,
      COUNT(*)                                                     AS total,
      COUNT(*) FILTER (WHERE token_expiry > NOW())                 AS active,
      COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '7d')  AS last_7d
    FROM oauth_connections
    GROUP BY provider
  `.catch(() => []);

  return send(res, 200, { ok: true, connections, stats });
}
