// api/admin/dorr-tratt.mjs — avläsningen av dörrens tratt (grundarbeslut 2026-08-13).
//
// GET /api/admin/dorr-tratt?dagar=30&per_vy=1
// Header: x-admin-token: <ADMIN_TOKEN>   (samma mönster som benchmark-stats)
//
// Svaret räknar UNIKA SESSIONER per steg, aldrig råa klick — se lib/dorrstat.js. Ett tomt
// underlag ger `null` i andelarna, aldrig "0 %": noll besökare är inte samma sak som noll
// procent, och skillnaden är precis den regel 4 handlar om.
import { hamtaTratt, HANDELSER } from '../../lib/dorrstat.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Endast GET stöds' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) return send(res, 401, { error: 'Ej behörig' });

  const url = new URL(req.url, 'http://x');
  const dagar = Number(url.searchParams.get('dagar') ?? 30);
  const perVy = ['1', 'true', 'ja'].includes(String(url.searchParams.get('per_vy') ?? '').toLowerCase());

  const tratt = await hamtaTratt({ dagar, perVy });
  if (!tratt) return send(res, 503, { error: 'Ingen databas konfigurerad eller läsningen misslyckades' });

  return send(res, 200, { ok: true, steg: HANDELSER, ...tratt });
}
