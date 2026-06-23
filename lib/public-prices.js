// lib/public-prices.js — läs/skriv för offentlig sektors prisdata.
//
// Detta är vår första MOAT-data innan kundflywheelet finns: verkliga
// kontraktspriser ur svensk öppen data (statliga + kommunala ramavtal,
// kommunal leverantörsreskontra, upphandlingstilldelningar). Per ENHET där
// det går (per användare/mån, per abonnemang/mån, öre/kWh) så att det är
// jämförbart med ett SMB:s pris trots att köparen är en storköpare.
//
// Alla funktioner fail-open (null/[] när DB saknas).
import { getDb } from './db.js';

// Kanonisk enhet per kategori — säkrar att vi aldrig jämför äpplen och päron.
export const CATEGORY_UNIT = {
  'saas-productivity': 'per_user_month',
  'saas-creative':     'per_user_month',
  'saas-crm':          'per_user_month',
  mobil:               'per_subscription_month',
  bredband:            'per_subscription_month',
  el:                  'ore_per_kwh',
};

const MIN_PUBLIC_POINTS = 3; // gate: en sourcad sanning kräver ≥3 observationer

export function normalizeSupplierName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\b(ab|asa|as|oy|gmbh|inc|ltd|sverige|sweden|filial|publ)\b/g, '')
    .replace(/[^a-z0-9åäö]+/g, ' ')
    .trim();
}

/**
 * Batch-insert av normaliserade observationer. Returnerar antal nya rader.
 * Varje record: { source, sourceRef?, sourceUrl?, buyer?, buyerType?, supplier,
 *   category, product?, unit, unitPrice, observedAt?, region?, raw? }
 */
export async function ingestPublicPricePoints(records = []) {
  const db = getDb();
  if (!db || !records.length) return 0;
  let inserted = 0;
  for (const r of records) {
    const unit = r.unit ?? CATEGORY_UNIT[r.category];
    if (!r.supplier || !r.category || !unit || !(r.unitPrice > 0)) continue;
    const normalized = normalizeSupplierName(r.supplier);
    try {
      const rows = await db`
        INSERT INTO public_price_points
          (source, source_ref, source_url, buyer, buyer_type, supplier, normalized_supplier,
           category, product, unit, unit_price, currency, observed_at, region, raw)
        VALUES
          (${r.source}, ${r.sourceRef ?? null}, ${r.sourceUrl ?? null}, ${r.buyer ?? null},
           ${r.buyerType ?? null}, ${r.supplier}, ${normalized}, ${r.category}, ${r.product ?? null},
           ${unit}, ${Math.round(Number(r.unitPrice) * 100) / 100}, ${r.currency ?? 'SEK'},
           ${r.observedAt ?? null}, ${r.region ?? null}, ${r.raw ? JSON.stringify(r.raw) : null})
        ON CONFLICT DO NOTHING
        RETURNING id
      `;
      if (rows.length) inserted++;
    } catch (err) {
      console.warn('[public-prices] insert failed:', err.message);
    }
  }
  return inserted;
}

/**
 * Vad betalar offentlig sektor (per enhet) för en kategori — valfritt filtrerat
 * på leverantör. Returnerar VERKLIGA citerbara observationer (med produkt, köpare
 * och källa), inte en konstruerad median. Gate:ad på ≥2 (ett spann) — ett enskilt
 * pris är en referens, flera blir en sanning. Returnerar null annars.
 */
export async function getPublicBenchmark({ category, normalizedSupplier = null }) {
  const db = getDb();
  if (!db || !category) return null;
  const unit = CATEGORY_UNIT[category];
  if (!unit) return null;
  try {
    const obs = normalizedSupplier
      ? await db`
          SELECT supplier, product, buyer, buyer_type, unit_price, source, source_ref, observed_at
          FROM public_price_points
          WHERE category = ${category} AND unit = ${unit} AND normalized_supplier = ${normalizedSupplier}
          ORDER BY unit_price ASC LIMIT 12`
      : await db`
          SELECT supplier, product, buyer, buyer_type, unit_price, source, source_ref, observed_at
          FROM public_price_points
          WHERE category = ${category} AND unit = ${unit}
          ORDER BY unit_price ASC LIMIT 12`;
    if (!obs || obs.length < 3) return null;     // ≥3 prispunkter (bibeln) — 2 är för tunt för ett golv
    const prices = obs.map((o) => Number(o.unit_price));
    const sorted = prices.slice().sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    return {
      n: obs.length,
      unit,
      min: Math.min(...prices),
      max: Math.max(...prices),
      median,
      observations: obs.slice(0, 5).map((o) => ({
        supplier: o.supplier, product: o.product, buyer: o.buyer, type: o.buyer_type,
        unitPrice: Number(o.unit_price), source: o.source, sourceRef: o.source_ref, observedAt: o.observed_at,
      })),
    };
  } catch (err) {
    console.warn('[public-prices] getPublicBenchmark failed:', err.message);
    return null;
  }
}
