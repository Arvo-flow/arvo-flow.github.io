// api/admin/benchmark-stats.mjs
// Skyddad admin-endpoint: visar antal datapunkter per segment.
// Autentisering via ADMIN_TOKEN-headern (sätt env var i Vercel).
//
// GET /api/admin/benchmark-stats
// Header: x-admin-token: <ADMIN_TOKEN>

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
  if (!db) return send(res, 503, { error: 'DB ej konfigurerad — sätt POSTGRES_URL i Vercel' });

  const segments = await db`
    SELECT
      category,
      industry,
      size_bucket,
      COUNT(*)::int                                                          AS n,
      ROUND(percentile_cont(0.5)  WITHIN GROUP (ORDER BY annual_cost))::int AS median,
      ROUND(percentile_cont(0.25) WITHIN GROUP (ORDER BY annual_cost))::int AS p25,
      MIN(created_at)                                                        AS first_at,
      MAX(created_at)                                                        AS last_at
    FROM invoice_datapoints
    GROUP BY category, industry, size_bucket
    ORDER BY category, industry, size_bucket
  `;

  const total = segments.reduce((s, r) => s + r.n, 0);
  const readySegments = segments.filter((r) => r.n >= 10).length;

  // Cellstatus driver outbound-urvalet: celler NÄRA tröskeln fylls medvetet
  // (lead-listor väljs på SNI-koder som tippar dem över) — prisboken som styrt bygge.
  const cells = segments.map((r) => ({
    ...r,
    status: r.n >= 10 ? 'BÄR' : r.n >= 5 ? 'LIVE-LIGHT' : r.n >= 3 ? 'NÄRA' : 'MOCK',
  }));

  return send(res, 200, {
    total_datapoints: total,
    segments_with_real_data: readySegments,
    segments_still_on_mock: segments.length - readySegments,
    min_points_threshold: 10,
    live_light_threshold: 5,
    segments: cells,
  });
}
