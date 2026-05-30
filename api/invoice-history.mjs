// api/invoice-history.mjs — GET /api/invoice-history?fingerprint=<fp>
// Returnerar de senaste analyserna för en given browser-fingerprint.
import { getAnalysesByFingerprint } from '../lib/invoice-store.js';

export const config = { maxDuration: 10 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Endast GET stöds' });

  const fp = req.query?.fingerprint;
  if (!fp || typeof fp !== 'string' || fp.length < 8) {
    return send(res, 400, { error: 'fingerprint krävs (minst 8 tecken)' });
  }

  const analyses = await getAnalysesByFingerprint(fp);
  return send(res, 200, { ok: true, analyses });
}
