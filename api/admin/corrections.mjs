// api/admin/corrections.mjs
// GET  /api/admin/corrections          — hämtar korrektioner för granskning
// GET  /api/admin/corrections?patterns — aggregerade mönster för regelderivering

import { getCorrections, getPatterns } from '../../lib/labeled-corrections.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { patterns, category, field, correctedBy, limit } = req.query;

  if (patterns !== undefined) {
    const data = await getPatterns();
    return res.status(200).json({ ok: true, patterns: data });
  }

  const data = await getCorrections({
    category:    category ?? null,
    field:       field ?? null,
    correctedBy: correctedBy ?? null,
    limit:       Math.min(parseInt(limit ?? '100', 10), 500),
  });

  return res.status(200).json({ ok: true, corrections: data, count: data.length });
}
