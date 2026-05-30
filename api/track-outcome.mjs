// P3.2 — Outcome tracking endpoint
// POST /api/track-outcome
// Kunden (eller intern) rapporterar om de faktiskt bytte och vad de sparade.
// Används för inlärningsloopen och prediktionskalibrering (P3.3).

import { storeOutcome } from '../lib/outcome-store.js';

export const config = { maxDuration: 10 };

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Endast POST stöds' }));
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'Ogiltig JSON' }));
  }

  const {
    fingerprint,
    supplier,
    category,
    predictedNet,
    actualNet,
    switched,
    switchedAt,
    notes,
  } = body;

  if (!supplier || !category) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'supplier och category är obligatoriska' }));
  }
  if (typeof switched !== 'boolean') {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'switched måste vara true eller false' }));
  }

  await storeOutcome({
    fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
    supplier,
    category,
    predictedNet: predictedNet != null ? Math.round(Number(predictedNet)) : null,
    actualNet:    actualNet    != null ? Math.round(Number(actualNet))    : null,
    switched,
    switchedAt:   switchedAt ?? null,
    notes:        typeof notes === 'string' ? notes.slice(0, 500) : null,
    source:       'customer',
  });

  res.statusCode = 200;
  res.end(JSON.stringify({ ok: true }));
}
