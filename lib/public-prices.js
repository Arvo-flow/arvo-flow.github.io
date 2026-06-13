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
 * på leverantör. Gate:ad på ≥3 observationer (regel 3/4). Returnerar null annars.
 */
export async function getPublicBenchmark({ category, normalizedSupplier = null }) {
  const db = getDb();
  if (!db || !category) return null;
  const unit = CATEGORY_UNIT[category];
  if (!unit) return null;
  try {
    const rows = normalizedSupplier
      ? await db`
          SELECT COUNT(*)::int AS n,
            ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY unit_price)::numeric, 2) AS median,
            ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY unit_price)::numeric, 2) AS p25,
            MAX(observed_at) AS latest
          FROM public_price_points
          WHERE category = ${category} AND unit = ${unit}
            AND normalized_supplier = ${normalizedSupplier}`
      : await db`
          SELECT COUNT(*)::int AS n,
            ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY unit_price)::numeric, 2) AS median,
            ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY unit_price)::numeric, 2) AS p25,
            MAX(observed_at) AS latest
          FROM public_price_points
          WHERE category = ${category} AND unit = ${unit}`;
    const r = rows[0];
    if (!r || r.n < MIN_PUBLIC_POINTS) return null;

    // Ett par exempel-köpare för proveniens i kundytan.
    const ex = await db`
      SELECT buyer, buyer_type, unit_price, product, source
      FROM public_price_points
      WHERE category = ${category} AND unit = ${unit}
        ${normalizedSupplier ? db`AND normalized_supplier = ${normalizedSupplier}` : db``}
        AND buyer IS NOT NULL
      ORDER BY observed_at DESC NULLS LAST
      LIMIT 3
    `;
    return {
      n: r.n,
      unit,
      median: Number(r.median),
      p25: Number(r.p25),
      latest: r.latest,
      buyers: ex.map((b) => ({ buyer: b.buyer, type: b.buyer_type, unitPrice: Number(b.unit_price), product: b.product, source: b.source })),
    };
  } catch (err) {
    console.warn('[public-prices] getPublicBenchmark failed:', err.message);
    return null;
  }
}
