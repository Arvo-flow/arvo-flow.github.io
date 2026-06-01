// api/corrections.mjs
// POST /api/corrections — tar emot manuella operatörskorrektioner.
// Används av admin-UI:t när en operatör granskar en flaggad faktura
// och korrigerar ett fält (t.ex. recurring, category).

import { saveOperatorCorrection } from '../lib/labeled-corrections.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { analysisId, field, originalValue, correctedValue, reason, category, supplier } = req.body ?? {};

  if (!field || correctedValue === undefined) {
    return res.status(400).json({ error: 'field och correctedValue krävs' });
  }

  const id = await saveOperatorCorrection({
    analysisId: analysisId ?? null,
    field,
    originalValue,
    correctedValue,
    reason,
    category,
    supplier,
  });

  return res.status(200).json({ ok: true, id });
}
