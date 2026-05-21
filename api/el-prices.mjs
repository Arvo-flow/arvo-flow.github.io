// api/el-prices.mjs
// Vercel Serverless Function — returnerar Nordpool-spotpris och leverantörsjämförelse.
//
// GET /api/el-prices?kwh=30000&price=1.35&supplier=Fortum
//
// Parametrar:
//   kwh      — årsförbrukning kWh (default 30 000)
//   price    — nuvarande allt-in-pris kr/kWh (default 1.35)
//   supplier — leverantörsnamn för zoninferens (default 'Fortum')
//
// Cachad i Vercel KV 1h så Nordpool-API:t inte hammras vid hög trafik.
// Cache-nyckel inkluderar zonen (härledd från leverantörsnamn) + kwh + avrundad price.

import { getKv } from '../lib/kv.js';
import { getElIntelligence } from '../lib/el-intelligence.js';

export const config = {
  maxDuration: 15,
};

const CACHE_TTL_SECONDS = 60 * 60; // 1 h

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return send(res, 405, { error: 'Endast GET stöds' });
  }

  const query = req.query ?? {};

  const kwh      = Number(query.kwh ?? 30_000);
  const price    = Number(query.price ?? 1.35);
  const supplier = typeof query.supplier === 'string' ? query.supplier : 'Fortum';

  if (!Number.isFinite(kwh) || kwh < 100 || kwh > 10_000_000) {
    return send(res, 400, { error: 'kwh måste vara 100–10 000 000' });
  }
  if (!Number.isFinite(price) || price < 0.1 || price > 20) {
    return send(res, 400, { error: 'price måste vara 0.10–20 kr/kWh' });
  }

  // Cache-nyckel: leverantör (normaliserat) + kwh + pris avrundat till 2 decimaler.
  // Zone ingår implicit via leverantörssträngen.
  const roundedPrice = Math.round(price * 100) / 100;
  const supplierKey  = supplier.toLowerCase().replace(/\s+/g, '_');
  const key          = `el:v1:${supplierKey}:${Math.round(kwh)}:${roundedPrice}`;

  const kv = getKv();
  if (kv) {
    try {
      const cached = await kv.get(key);
      if (cached) return send(res, 200, { ...cached, cached: true });
    } catch { /* non-fatal */ }
  }

  let result;
  try {
    result = await getElIntelligence({
      annualKwh:       Math.round(kwh),
      currentPriceKwh: price,
      supplierName:    supplier,
    });
  } catch (err) {
    console.error('[el-prices] getElIntelligence fel:', err.message);
    return send(res, 500, { error: 'Kunde inte hämta elpriser — försök igen.' });
  }

  const body = { ok: true, ...result };

  if (kv) {
    try {
      await kv.set(key, body, { ex: CACHE_TTL_SECONDS });
    } catch { /* non-fatal */ }
  }

  return send(res, 200, body);
}
