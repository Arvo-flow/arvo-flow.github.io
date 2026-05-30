// api/admin/dashboard.mjs — Samlad admin-vy: review_queue, waitlist, feedback, statistik.
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

  const [reviewQueue, waitlist, feedback, stats] = await Promise.all([
    db`
      SELECT id, supplier, normalized_supplier, category, route,
             annual_cost, net_saving, industry, employees, created_at
      FROM   invoice_analyses
      WHERE  route = 'review_queue'
      ORDER  BY created_at DESC
      LIMIT  100
    `.catch(() => []),

    db`
      SELECT id, email, source, reason, created_at
      FROM   waitlist
      ORDER  BY created_at DESC
      LIMIT  200
    `.catch(() => []),

    db`
      SELECT id, supplier, category, vote, comment, created_at
      FROM   invoice_feedback
      ORDER  BY created_at DESC
      LIMIT  200
    `.catch(() => []),

    db`
      SELECT
        COUNT(*)                                              AS total_analyses,
        COUNT(*) FILTER (WHERE route = 'auto')               AS auto_count,
        COUNT(*) FILTER (WHERE route = 'review_queue')       AS review_count,
        COUNT(*) FILTER (WHERE route = 'unsupported')        AS unsupported_count,
        COUNT(*) FILTER (WHERE should_switch = true)         AS switch_recommended,
        ROUND(AVG(net_saving) FILTER (WHERE net_saving > 0)) AS avg_net_saving,
        COUNT(DISTINCT fingerprint)                          AS unique_users
      FROM invoice_analyses
    `.catch(() => [{}]),
  ]);

  return send(res, 200, {
    ok: true,
    stats:       stats[0] ?? {},
    reviewQueue,
    waitlist,
    feedback,
  });
}
