// lib/price-alert.js
// Detects smyghöjningar and market intelligence from day 1.
//
// detectPriceAlert: compares pricePerSeatMonthly against verified list prices
//   in supplier_prices — works on the very first invoice without accumulation.
//
// getMarketIntelligence: cross-customer aggregation from invoice_analyses —
//   shows what OTHER companies with the same supplier actually pay.

import { getDb } from './db.js';

/**
 * Returnerar en prissignal om kunden betalar mer än verifierat listpris.
 * Kräver att supplier_prices är seedat via migrationen — fungerar på faktura #1.
 *
 * @returns {Promise<null|{overListPrice:boolean, percentOver:number, ...}>}
 */
export async function detectPriceAlert({ normalizedSupplier, pricePerSeatMonthly, category }) {
  if (!normalizedSupplier || !(pricePerSeatMonthly > 0)) return null;
  const db = getDb();
  if (!db) return null;

  try {
    const rows = await db`
      SELECT price_monthly, product, tier, source_type, last_verified
      FROM supplier_prices
      WHERE LOWER(supplier) = LOWER(${normalizedSupplier})
        AND category        = ${category}
        AND is_current      = true
        AND price_monthly   IS NOT NULL
      ORDER BY price_monthly ASC
      LIMIT 1
    `;

    if (!rows.length || !rows[0].price_monthly) return null;

    const listPrice   = Number(rows[0].price_monthly);
    const percentOver = Math.round(((pricePerSeatMonthly - listPrice) / listPrice) * 100);

    if (percentOver < 5) return null;

    return {
      overListPrice:             true,
      percentOver,
      customerPriceMonthly:      Math.round(pricePerSeatMonthly),
      verifiedListPriceMonthly:  Math.round(listPrice),
      verifiedProduct:           rows[0].product,
      sourceType:                rows[0].source_type,
      lastVerified:              rows[0].last_verified,
    };
  } catch (err) {
    console.warn('[price-alert] detectPriceAlert failed:', err.message);
    return null;
  }
}

/**
 * Cross-customer intelligence: vad betalar ANDRA bolag hos samma leverantör?
 * Aktiveras vid ≥3 analyserade fakturor för leverantören — visar marknadsmönster
 * som ingen enskild kund kan se men som Arvo ser tack vare nätverkseffekten.
 *
 * @returns {Promise<null|{supplierDataPoints:number, supplierAvgCost:number, supplierP25:number, supplierMedian:number}>}
 */
export async function getMarketIntelligence({ normalizedSupplier, category }) {
  if (!normalizedSupplier || !category) return null;
  const db = getDb();
  if (!db) return null;

  try {
    const rows = await db`
      SELECT
        COUNT(*)::int                                                             AS n,
        ROUND(AVG(annual_cost))::int                                             AS avg_cost,
        ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY annual_cost))::int   AS p25,
        ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY annual_cost))::int   AS median
      FROM invoice_analyses
      WHERE normalized_supplier = ${normalizedSupplier}
        AND category            = ${category}
        AND route               = 'auto'
        AND annual_cost         > 500
        AND annual_cost         < 5000000
    `;

    const r = rows[0];
    if (!r || r.n < 3) return null;

    return {
      supplierDataPoints: r.n,
      supplierAvgCost:    r.avg_cost,
      supplierP25:        r.p25,
      supplierMedian:     r.median,
    };
  } catch (err) {
    console.warn('[price-alert] getMarketIntelligence failed:', err.message);
    return null;
  }
}
