// api/admin/prospects.mjs
// GET /api/admin/prospects — Returns outbound prospect list + stats.
// Auth: x-admin-token (same ADMIN_TOKEN used by the rest of /api/admin/*)

import { getDb } from '../../lib/db.js';

export const config = { maxDuration: 10 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'method not allowed' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'unauthorized' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'db unavailable' });

  const [prospects, statsRows] = await Promise.all([
    db`
      SELECT id, company_name, industry, segment, size_bucket, employees,
             contact_email, email_sent_at, opened_at, action, action_at,
             created_at, created_by,
             (estimates->'totalSavingHigh')::int AS saving_high
      FROM outbound_prospects
      ORDER BY created_at DESC
      LIMIT 300
    `,
    db`
      SELECT
        COUNT(*)                                                  AS total,
        COUNT(email_sent_at)                                      AS email_sent,
        COUNT(opened_at)                                          AS opened,
        COUNT(CASE WHEN action IN ('upload','activate') THEN 1 END) AS converted,
        COUNT(CASE WHEN action = 'upload'   THEN 1 END)          AS uploaded,
        COUNT(CASE WHEN action = 'activate' THEN 1 END)          AS activated
      FROM outbound_prospects
    `,
  ]);

  send(res, 200, {
    ok:        true,
    prospects: prospects ?? [],
    stats:     statsRows[0] ?? {},
  });
}
