// lib/price-db.js — CRUD för supplier_prices + supplier_price_history + invoice_benchmarks.
// Används av price-monitor (skriva bekräftade prisändringar), seed-script,
// aggregate-invoice-benchmarks (läsa) och API-routes (läsa).

import { getDb } from './db.js';

// ── Upsert ────────────────────────────────────────────────────────────────────
// Infogar eller uppdaterar ett aktuellt pris.
// Om priset faktiskt ändrades: markera gammal rad is_current=false, infoga ny.
// Returnerar { inserted, changed, oldPrice, newPrice }.
export async function upsertPrice({
  supplier,
  product,
  tier = null,
  category,
  priceMonthly = null,
  priceAnnual  = null,
  priceUnit    = 'per_seat',
  currency     = 'SEK',
  usdMonthly   = null,
  usdAnnual    = null,
  sourceType,
  sourceUrl    = null,
  confidence   = 0.90,
  lastVerified = null,
  changedBy    = 'system',
  metadata     = null,
}) {
  const db = getDb();
  if (!db) return { inserted: false, changed: false };

  try {
    // Kolla om det finns ett aktuellt pris
    const [existing] = await db`
      SELECT id, price_monthly, price_annual
      FROM supplier_prices
      WHERE supplier = ${supplier}
        AND product  = ${product}
        AND (tier IS NOT DISTINCT FROM ${tier})
        AND is_current = true
      LIMIT 1
    `;

    if (!existing) {
      // Nytt pris — infoga direkt
      await db`
        INSERT INTO supplier_prices
          (supplier, product, tier, category, price_monthly, price_annual, price_unit,
           currency, usd_monthly, usd_annual, source_type, source_url, confidence,
           last_verified, is_current, metadata)
        VALUES
          (${supplier}, ${product}, ${tier}, ${category}, ${priceMonthly}, ${priceAnnual}, ${priceUnit},
           ${currency}, ${usdMonthly}, ${usdAnnual}, ${sourceType}, ${sourceUrl}, ${confidence},
           ${lastVerified}, true, ${metadata ? JSON.stringify(metadata) : null})
        ON CONFLICT (supplier, product, tier, is_current) DO NOTHING
      `;
      return { inserted: true, changed: false };
    }

    const samePrice =
      Math.abs((existing.price_monthly ?? 0) - (priceMonthly ?? 0)) < 0.01 &&
      Math.abs((existing.price_annual  ?? 0) - (priceAnnual  ?? 0)) < 0.01;

    if (samePrice) {
      // Pris oförändrat — uppdatera bara last_verified och confidence
      await db`
        UPDATE supplier_prices
        SET last_verified = ${lastVerified ?? new Date().toISOString().slice(0, 10)},
            confidence    = ${confidence},
            source_url    = ${sourceUrl},
            updated_at    = NOW()
        WHERE id = ${existing.id}
      `;
      return { inserted: false, changed: false };
    }

    // Pris ändrat — arkivera gammal rad, infoga ny
    await db`
      UPDATE supplier_prices SET is_current = false, updated_at = NOW()
      WHERE id = ${existing.id}
    `;

    await db`
      INSERT INTO supplier_prices
        (supplier, product, tier, category, price_monthly, price_annual, price_unit,
         currency, usd_monthly, usd_annual, source_type, source_url, confidence,
         last_verified, is_current, metadata)
      VALUES
        (${supplier}, ${product}, ${tier}, ${category}, ${priceMonthly}, ${priceAnnual}, ${priceUnit},
         ${currency}, ${usdMonthly}, ${usdAnnual}, ${sourceType}, ${sourceUrl}, ${confidence},
         ${lastVerified ?? new Date().toISOString().slice(0, 10)}, true,
         ${metadata ? JSON.stringify(metadata) : null})
    `;

    await db`
      INSERT INTO supplier_price_history
        (supplier, product, tier, category,
         old_price_monthly, new_price_monthly, old_price_annual, new_price_annual,
         currency, source_type, source_url, changed_by)
      VALUES
        (${supplier}, ${product}, ${tier}, ${category},
         ${existing.price_monthly}, ${priceMonthly}, ${existing.price_annual}, ${priceAnnual},
         ${currency}, ${sourceType}, ${sourceUrl}, ${changedBy})
    `;

    return {
      inserted: false,
      changed: true,
      oldPrice: existing.price_monthly,
      newPrice: priceMonthly,
    };
  } catch (err) {
    console.error('[price-db] upsertPrice error:', err.message);
    return { inserted: false, changed: false, error: err.message };
  }
}

// ── Läs aktuella priser ───────────────────────────────────────────────────────
export async function getCurrentPrices({ supplier, category } = {}) {
  const db = getDb();
  if (!db) return [];
  try {
    if (supplier && category) {
      return await db`
        SELECT * FROM supplier_prices
        WHERE supplier = ${supplier} AND category = ${category} AND is_current = true
        ORDER BY product
      `;
    }
    if (supplier) {
      return await db`
        SELECT * FROM supplier_prices
        WHERE supplier = ${supplier} AND is_current = true
        ORDER BY category, product
      `;
    }
    if (category) {
      return await db`
        SELECT * FROM supplier_prices
        WHERE category = ${category} AND is_current = true
        ORDER BY supplier, product
      `;
    }
    return await db`
      SELECT * FROM supplier_prices WHERE is_current = true ORDER BY category, supplier, product
    `;
  } catch (err) {
    console.error('[price-db] getCurrentPrices error:', err.message);
    return [];
  }
}

// ── Prishistorik ──────────────────────────────────────────────────────────────
export async function getPriceHistory({ supplier, product, months = 12 }) {
  const db = getDb();
  if (!db) return [];
  try {
    return await db`
      SELECT * FROM supplier_price_history
      WHERE supplier = ${supplier}
        AND product  = ${product}
        AND changed_at >= NOW() - ${months} * INTERVAL '1 month'
      ORDER BY changed_at DESC
    `;
  } catch (err) {
    console.error('[price-db] getPriceHistory error:', err.message);
    return [];
  }
}

// ── Prishistorik per leverantör + kategori (för prognosmotorn) ─────────────────
// Bredare än getPriceHistory (som kräver exakt product) — Maktkalenderns prognos
// vill se ALLA prisändringar för en leverantör i en kategori.
export async function getSupplierCategoryChanges({ supplier, category, months = 48 }) {
  const db = getDb();
  if (!db || !supplier) return [];
  try {
    return await db`
      SELECT supplier, product, category, old_price_monthly, new_price_monthly,
             old_price_annual, new_price_annual, changed_at
      FROM supplier_price_history
      WHERE supplier = ${supplier}
        ${category ? db`AND category = ${category}` : db``}
        AND changed_at >= NOW() - ${months} * INTERVAL '1 month'
      ORDER BY changed_at DESC
    `;
  } catch (err) {
    console.error('[price-db] getSupplierCategoryChanges error:', err.message);
    return [];
  }
}

// ── Invoice benchmarks ────────────────────────────────────────────────────────
// Hämtar aggregerade benchmarks från kunddata (bättre än branchindex om sample_size ≥ 10).
export async function getInvoiceBenchmark({ category, companySize, industry }) {
  const db = getDb();
  if (!db) return null;
  try {
    const [row] = await db`
      SELECT p25, median, p75, sample_size, computed_at
      FROM invoice_benchmarks
      WHERE category     = ${category}
        AND company_size = ${companySize}
        AND industry     = ${industry}
        AND metric       = 'annual_cost'
      ORDER BY computed_at DESC
      LIMIT 1
    `;
    return row ?? null;
  } catch (err) {
    console.error('[price-db] getInvoiceBenchmark error:', err.message);
    return null;
  }
}

// Skriver aggregerade benchmarks (anropas av aggregate-invoice-benchmarks.mjs).
export async function upsertInvoiceBenchmark({
  category, companySize, industry, metric = 'annual_cost',
  p25, median, p75, sampleSize,
}) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      INSERT INTO invoice_benchmarks (category, company_size, industry, metric, p25, median, p75, sample_size, computed_at)
      VALUES (${category}, ${companySize}, ${industry}, ${metric}, ${p25}, ${median}, ${p75}, ${sampleSize}, NOW())
      ON CONFLICT (category, company_size, industry, metric)
      DO UPDATE SET p25 = EXCLUDED.p25, median = EXCLUDED.median, p75 = EXCLUDED.p75,
                    sample_size = EXCLUDED.sample_size, computed_at = NOW()
    `;
  } catch (err) {
    console.error('[price-db] upsertInvoiceBenchmark error:', err.message);
  }
}

// ── Statistik för adminvy ──────────────────────────────────────────────────────
export async function getPriceDbStats() {
  const db = getDb();
  if (!db) return null;
  try {
    const [stats] = await db`
      SELECT
        COUNT(*)                                      AS total_products,
        COUNT(DISTINCT supplier)                      AS total_suppliers,
        COUNT(DISTINCT category)                      AS total_categories,
        MIN(last_verified)                            AS oldest_verified,
        MAX(last_verified)                            AS newest_verified,
        COUNT(*) FILTER (WHERE source_type = 'official_web')       AS official_web_count,
        COUNT(*) FILTER (WHERE source_type = 'customer_invoice')   AS customer_invoice_count,
        COUNT(*) FILTER (WHERE source_type = 'manual')             AS manual_count
      FROM supplier_prices
      WHERE is_current = true
    `;
    return stats;
  } catch (err) {
    console.error('[price-db] getPriceDbStats error:', err.message);
    return null;
  }
}
