// api/recompute-shelfware.mjs — live omräkning av licensrevisionen (shelfware).
//
// Stänger dialogen: kunden anger hur många av överskottsplatserna som används till
// annat (mötesrum/konsulter/servicekonton) → vi räknar confirmedIdle och svinnet i
// kronor på kundens EGNA pris/plats. Ren, tillståndslös, deterministisk — frontend gör
// ALDRIG kr-aritmetik själv (regel 2: AI/kod räknar, klienten visar bara).
import { computeShelfware } from '../lib/shelfware.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : Number.parseFloat(v));

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const seatCount           = num(body.seatCount);
  const pricePerSeatMonthly = num(body.pricePerSeatMonthly);
  const employees           = num(body.employees);
  const knownExceptionsRaw  = body.knownExceptions;

  if (![seatCount, pricePerSeatMonthly, employees].every(Number.isFinite)) {
    return send(res, 400, { error: 'seatCount, pricePerSeatMonthly och employees krävs (numeriska)' });
  }

  // knownExceptions: tillåt 0 (uttryckligt "inga undantag"); negativt klamras till 0.
  let knownExceptions = null;
  if (knownExceptionsRaw != null && knownExceptionsRaw !== '') {
    const ke = num(knownExceptionsRaw);
    if (!Number.isFinite(ke)) return send(res, 400, { error: 'knownExceptions måste vara ett tal' });
    knownExceptions = Math.max(0, Math.floor(ke));
  }

  const shelfware = computeShelfware({ seatCount, pricePerSeatMonthly, employees, knownExceptions });
  return send(res, 200, { shelfware: shelfware ?? null });
}
