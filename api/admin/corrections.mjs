// api/admin/corrections.mjs
// GET  /api/admin/corrections          — hämtar korrektioner för granskning
// GET  /api/admin/corrections?patterns — aggregerade mönster för regelderivering

import { getCorrections, getPatterns, saveOperatorCorrection } from '../../lib/labeled-corrections.js';

export default async function handler(req, res) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { analysisId, field, originalValue, correctedValue, reason, category, supplier } = req.body ?? {};
    if (!field || correctedValue == null) {
      return res.status(400).json({ error: 'field och correctedValue är obligatoriska' });
    }
    const id = await saveOperatorCorrection({
      analysisId: analysisId ?? null,
      field,
      originalValue: originalValue ?? '',
      correctedValue: String(correctedValue),
      reason: reason || 'operator_manual_review',
      category: category ?? null,
      supplier: supplier ?? null,
    });
    return res.status(200).json({ ok: true, id });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
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
