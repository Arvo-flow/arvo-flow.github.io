// api/token.mjs — Utfärdar kortlivade HMAC-tokens till webbläsarsessioner.
// Tokens valideras i api/test-invoice.mjs för att säkerställa att anrop
// kommer från en riktig webbläsarsession, inte ett automatiserat script.

import { createHmac, randomBytes } from 'node:crypto';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Only POST' });

  const secret = process.env.ARVO_HMAC_SECRET;
  if (!secret) {
    // Dev-läge: ingen secret konfigurerad → returnera passthrough-token
    return send(res, 200, { token: 'dev' });
  }

  const ts    = Date.now().toString();
  const nonce = randomBytes(16).toString('hex');
  const payload = `${ts}.${nonce}`;
  const sig   = createHmac('sha256', secret).update(payload).digest('hex');

  return send(res, 200, { token: `${payload}.${sig}` });
}
