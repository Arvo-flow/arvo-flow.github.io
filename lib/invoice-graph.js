// lib/invoice-graph.js
// Invoice graph: relationer mellan leverantörer, kunder, priser och kontrakt
// över tid. Grunden för automatisk benchmarking och proaktiv intelligens.
//
// Fas 3–4 i flywheel-arkitekturen: när ≥10 datapunkter/segment finns
// ersätter invoice_graph-data de statiska mock-priserna i branchindex.js.
//
// Alla funktioner fail-open.

import { getDb } from './db.js';

// ── Suppliers ─────────────────────────────────────────────────────────────────

/**
 * Skapar eller uppdaterar en leverantör. Returnerar supplier-id.
 */
export async function upsertSupplier({ name, normalizedName, category }) {
  const db = getDb();
  if (!db || !normalizedName) return null;
  try {
    const rows = await db`
      INSERT INTO graph_suppliers (name, normalized_name, category)
      VALUES (${name}, ${normalizedName}, ${category ?? null})
      ON CONFLICT (normalized_name) DO UPDATE
        SET invoice_count = graph_suppliers.invoice_count + 1,
            updated_at    = NOW(),
            category      = COALESCE(EXCLUDED.category, graph_suppliers.category)
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.warn('[invoice-graph] upsertSupplier failed:', err.message);
    return null;
  }
}

// ── Supplier prices ───────────────────────────────────────────────────────────

/**
 * Sparar en prisdatapunkt för en leverantör i ett segment.
 * Byggs upp automatiskt från varje faktura vi processar.
 */
export async function recordSupplierPrice({
  supplierId,
  segment,
  sizeBucket,
  pricePerSeat = null,
  annualCost,
  seats = null,
  invoiceDate,
  source = 'invoice',
}) {
  const db = getDb();
  if (!db || !supplierId || !annualCost) return null;
  try {
    const rows = await db`
      INSERT INTO graph_supplier_prices
        (supplier_id, segment, size_bucket, price_per_seat, annual_cost, seats, invoice_date, source)
      VALUES
        (${supplierId}, ${segment}, ${sizeBucket}, ${pricePerSeat},
         ${annualCost}, ${seats}, ${invoiceDate}, ${source})
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.warn('[invoice-graph] recordSupplierPrice failed:', err.message);
    return null;
  }
}

// ── Contract timelines ────────────────────────────────────────────────────────

/**
 * Sparar en kontraktssnapshot. Möjliggör framtida förfallodatumsdetektering
 * och proaktiva påminnelser.
 */
export async function recordContractTimeline({
  analysisId,
  supplierId,
  seats = null,
  annualCost,
  invoiceDate,
}) {
  const db = getDb();
  if (!db || !annualCost) return null;
  try {
    const rows = await db`
      INSERT INTO graph_contract_timelines
        (analysis_id, supplier_id, seats, annual_cost, invoice_date)
      VALUES
        (${analysisId ?? null}, ${supplierId ?? null}, ${seats},
         ${annualCost}, ${invoiceDate})
      RETURNING id
    `;
    return rows[0]?.id ?? null;
  } catch (err) {
    console.warn('[invoice-graph] recordContractTimeline failed:', err.message);
    return null;
  }
}

// ── Intelligence queries ──────────────────────────────────────────────────────

/**
 * Hämtar prishistorik för en leverantör i ett segment.
 * Används för att detektera smyghöjningar.
 */
export async function getSupplierPriceHistory({ normalizedName, segment, sizeBucket }) {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT sp.price_per_seat, sp.annual_cost, sp.seats, sp.invoice_date, sp.source
      FROM graph_supplier_prices sp
      JOIN graph_suppliers s ON s.id = sp.supplier_id
      WHERE s.normalized_name = ${normalizedName}
        AND sp.segment     = ${segment}
        AND sp.size_bucket = ${sizeBucket}
      ORDER BY sp.invoice_date DESC
      LIMIT 50
    `;
  } catch (err) {
    console.warn('[invoice-graph] getSupplierPriceHistory failed:', err.message);
    return [];
  }
}

/**
 * Aggregerad prisintelligens för ett segment — ersätter branchindex mock-data
 * när tillräckligt med datapunkter finns (≥10).
 *
 * Returnerar null om <10 datapunkter (branchindex-fallback används då).
 */
export async function getPriceIntelligence({ category, segment, sizeBucket, minDataPoints = 10 }) {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db`
      SELECT
        COUNT(*)::int                            AS data_points,
        PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY sp.price_per_seat) AS p25_per_seat,
        PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY sp.price_per_seat) AS median_per_seat,
        PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY sp.price_per_seat) AS p75_per_seat,
        MIN(sp.invoice_date)                     AS oldest_datapoint,
        MAX(sp.invoice_date)                     AS newest_datapoint
      FROM graph_supplier_prices sp
      JOIN graph_suppliers s ON s.id = sp.supplier_id
      WHERE s.category       = ${category}
        AND sp.segment        = ${segment}
        AND sp.size_bucket    = ${sizeBucket}
        AND sp.price_per_seat IS NOT NULL
        AND sp.invoice_date  > NOW() - INTERVAL '2 years'
    `;
    const r = rows[0];
    if (!r || r.data_points < minDataPoints) return null;
    return {
      dataPoints:    r.data_points,
      p25PerSeat:    Math.round(r.p25_per_seat),
      medianPerSeat: Math.round(r.median_per_seat),
      p75PerSeat:    Math.round(r.p75_per_seat),
      oldestDatapoint: r.oldest_datapoint,
      newestDatapoint: r.newest_datapoint,
      source: 'invoice_graph',
    };
  } catch (err) {
    console.warn('[invoice-graph] getPriceIntelligence failed:', err.message);
    return null;
  }
}

/**
 * Proaktiv intelligens: leverantörer som höjt priset senaste 12 månaderna.
 * Körs periodvis (cron) och triggar notifieringar.
 */
export async function detectPriceIncreases({ minIncreasePct = 5 } = {}) {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      WITH ranked AS (
        SELECT
          s.normalized_name,
          s.category,
          sp.segment,
          sp.size_bucket,
          sp.price_per_seat,
          sp.invoice_date,
          LAG(sp.price_per_seat) OVER (
            PARTITION BY s.id, sp.segment, sp.size_bucket
            ORDER BY sp.invoice_date
          ) AS prev_price
        FROM graph_supplier_prices sp
        JOIN graph_suppliers s ON s.id = sp.supplier_id
        WHERE sp.price_per_seat IS NOT NULL
          AND sp.invoice_date > NOW() - INTERVAL '2 years'
      )
      SELECT
        normalized_name,
        category,
        segment,
        size_bucket,
        prev_price,
        price_per_seat AS current_price,
        ROUND(((price_per_seat - prev_price)::numeric / prev_price) * 100, 1) AS increase_pct,
        invoice_date
      FROM ranked
      WHERE prev_price > 0
        AND price_per_seat > prev_price
        AND ((price_per_seat - prev_price)::numeric / prev_price) * 100 >= ${minIncreasePct}
      ORDER BY increase_pct DESC
      LIMIT 100
    `;
  } catch (err) {
    console.warn('[invoice-graph] detectPriceIncreases failed:', err.message);
    return [];
  }
}
