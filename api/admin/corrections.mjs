// api/admin/corrections.mjs
// GET  /api/admin/corrections            — korrektioner för granskning
// GET  /api/admin/corrections?patterns   — aggregerade mönster för regelderivering
// GET  /api/admin/corrections?learning   — active learning queue (okända leverantörer)
// GET  /api/admin/corrections?market     — marknadsunderrättelse från korrektioner
// POST /api/admin/corrections            — spara operatörskorrektion

import { getCorrections, getPatterns, saveOperatorCorrection, getActiveLearningQueue } from '../../lib/labeled-corrections.js';
import { getDb } from '../../lib/db.js';

export default async function handler(req, res) {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { analysisId, field, originalValue, correctedValue, reason, category, supplier, operatorReasoning } = req.body ?? {};
    if (!field || correctedValue == null) {
      return res.status(400).json({ error: 'field och correctedValue är obligatoriska' });
    }
    const id = await saveOperatorCorrection({
      analysisId:        analysisId ?? null,
      field,
      originalValue:     originalValue ?? '',
      correctedValue:    String(correctedValue),
      reason:            reason || 'operator_manual_review',
      category:          category ?? null,
      supplier:          supplier ?? null,
      operatorReasoning: operatorReasoning || null,
    });
    return res.status(200).json({ ok: true, id });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { patterns, learning, market, category, field, correctedBy, limit } = req.query;

  if (patterns !== undefined) {
    const data = await getPatterns();
    return res.status(200).json({ ok: true, patterns: data });
  }

  if (learning !== undefined) {
    const data = await getActiveLearningQueue({ limit: 100 });
    return res.status(200).json({ ok: true, queue: data, count: data.length });
  }

  if (market !== undefined) {
    const db = getDb();
    if (!db) return res.status(503).json({ error: 'DB ej konfigurerad' });
    try {
      const [categoryDist, topSuppliers, discoveryTrend] = await Promise.all([
        db`
          SELECT corrected_value AS category, COUNT(*)::int AS count
          FROM labeled_corrections
          WHERE corrected_by = 'operator' AND field = 'category'
            AND corrected_value IS NOT NULL
          GROUP BY corrected_value
          ORDER BY count DESC
          LIMIT 20
        `,
        db`
          SELECT supplier, COUNT(*)::int AS correction_count,
                 MAX(created_at) AS last_corrected
          FROM labeled_corrections
          WHERE corrected_by = 'operator' AND supplier IS NOT NULL
          GROUP BY supplier
          ORDER BY correction_count DESC
          LIMIT 20
        `,
        db`
          SELECT DATE_TRUNC('week', created_at)::date AS week,
                 COUNT(*)::int AS new_suppliers
          FROM labeled_corrections
          WHERE reason = 'new_unknown_supplier'
            AND created_at > NOW() - INTERVAL '90 days'
          GROUP BY week
          ORDER BY week ASC
        `,
      ]);
      return res.status(200).json({ ok: true, categoryDist, topSuppliers, discoveryTrend });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const data = await getCorrections({
    category:    category ?? null,
    field:       field ?? null,
    correctedBy: correctedBy ?? null,
    limit:       Math.min(parseInt(limit ?? '100', 10), 500),
  });

  return res.status(200).json({ ok: true, corrections: data, count: data.length });
}
