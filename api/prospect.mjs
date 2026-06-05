// api/prospect.mjs
// GET  /api/prospect?token=XXX  — returns prospect briefing data (public magic link)
// POST /api/prospect?token=XXX  — records prospect action { action: 'upload'|'activate' }

import { getDb } from '../lib/db.js';

export const config = { maxDuration: 10 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  const { token } = req.query ?? {};
  if (!token) return send(res, 400, { error: 'token required' });

  const db = getDb();

  if (req.method === 'GET') {
    if (!db) return send(res, 503, { error: 'db unavailable' });

    const [row] = await db`
      SELECT id, company_name, industry, segment, size_bucket, employees, estimates, created_at
      FROM outbound_prospects
      WHERE token = ${token}
      LIMIT 1
    `;

    if (!row) return send(res, 404, { error: 'not found' });

    // Record first open (idempotent)
    await db`
      UPDATE outbound_prospects
      SET opened_at = COALESCE(opened_at, now())
      WHERE token = ${token}
    `.catch(() => {});

    return send(res, 200, {
      ok: true,
      prospect: {
        companyName: row.company_name,
        industry:    row.industry,
        segment:     row.segment,
        sizeBucket:  row.size_bucket,
        employees:   row.employees,
        estimates:   row.estimates,
        generatedAt: row.created_at,
      },
    });
  }

  if (req.method === 'POST') {
    const { action } = req.body ?? {};
    if (!['upload', 'activate', 'dismissed'].includes(action)) {
      return send(res, 400, { error: 'action must be upload | activate | dismissed' });
    }
    if (db) {
      await db`
        UPDATE outbound_prospects
        SET action = ${action}, action_at = COALESCE(action_at, now())
        WHERE token = ${token}
      `.catch(() => {});
    }
    return send(res, 200, { ok: true });
  }

  send(res, 405, { error: 'method not allowed' });
}
