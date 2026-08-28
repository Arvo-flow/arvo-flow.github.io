// lib/price-alert.js
// Detects smyghöjningar and market intelligence from day 1.
//
// detectPriceAlert: compares pricePerSeatMonthly against verified list prices
//   in supplier_prices — works on the very first invoice without accumulation.
//
// getMarketIntelligence: cross-customer aggregation from invoice_analyses —
//   shows what OTHER companies with the same supplier actually pay.

import { getDb } from './db.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { lasLicensniva } from './licensniva.js';

/**
 * Returnerar en prissignal om kunden betalar mer än verifierat listpris.
 * Kräver att supplier_prices är seedat via migrationen — fungerar på faktura #1.
 *
 * @returns {Promise<null|{overListPrice:boolean, percentOver:number, ...}>}
 */
export async function detectPriceAlert({ normalizedSupplier, pricePerSeatMonthly, category, lineItems }) {
  if (!normalizedSupplier || !(pricePerSeatMonthly > 0)) return null;
  const db = getDb();
  if (!db) return null;

  try {
    // ── GOLVET MÅSTE MÄTA KUNDENS PRIS, INTE KUNDENS PRODUKTVAL (2026-08-24, H5) ─────────────
    // Frågan löd `ORDER BY price_monthly ASC LIMIT 1` — kategorins BILLIGASTE produkt, oavsett
    // vad kunden faktiskt har. Mätt mot de fyra Microsoft-raderna i seed-price-db:
    //   E3-kund på EXAKT E3:s listpris (462 kr)   → percentOver 571, golv 69 (Basic)
    //   Premium-kund på exakt listpris (252,35)   → percentOver 266, golv 69
    //   Standard-kund på exakt listpris (143,38)  → percentOver 108, golv 69
    // Tre av fyra kunder som betalar leverantörens EGEN publicerade prislapp flaggades som att
    // de blöder. Det är E3/E5-fyndet från 20 augusti ordagrant — spännvidden är 6,7× här — i en
    // modul som aldrig fick spärren `kraverBekraftadNiva`.
    //
    // Spärren är MÄTT, inte tyckt: saas har 9,6× spann och kräver bekräftad nivå; mobil har 1,1×
    // och får behålla kategorigolvet. Deklarationen läses ur prisboken, hårdkodas inte per
    // kategori. Nivån läses med samma funktion som LFL använder (regel 1 — ingen ny tier-läsning).
    const kraverNiva = BRANCHINDEX[category]?.kraverBekraftadNiva === true;
    const niva = kraverNiva ? lasLicensniva(lineItems) : null;

    const rows = kraverNiva && niva
      ? await db`
          SELECT price_monthly, product, tier, source_type, last_verified
          FROM supplier_prices
          WHERE LOWER(supplier) = LOWER(${normalizedSupplier})
            AND category        = ${category}
            AND tier            = ${niva.nyckel}
            AND is_current      = true
            AND price_monthly   IS NOT NULL
          ORDER BY price_monthly ASC
          LIMIT 1
        `
      : await db`
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

    // Kategorin kräver bekräftad nivå men fakturan bevisar ingen: FAKTA står kvar, PÅSTÅENDET
    // uteblir. Fail-closed på anspråket, fail-open på informationen — samma mönster som
    // ovissNiva i prisunderlaget.
    if (kraverNiva && !niva) {
      return {
        overListPrice:             null,
        percentOver:               null,
        nivaOviss:                 true,
        customerPriceMonthly:      Math.round(pricePerSeatMonthly),
        verifiedListPriceMonthly:  null,
        verifiedProduct:           null,
        sourceType:                rows[0].source_type,
        lastVerified:              rows[0].last_verified,
      };
    }

    const listPrice   = Number(rows[0].price_monthly);
    const percentOver = Math.round(((pricePerSeatMonthly - listPrice) / listPrice) * 100);

    if (percentOver < 5) return null;

    return {
      overListPrice:             true,
      percentOver,
      nivaOviss:                 false,
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
    // En kund = en röst. Räkna DISTINKTA kunder (user_email, annars fingerprint), aldrig rådata —
    // annars blir ett testkontos 5 uppladdningar "5 bolag" (falsk kollektiv sanning). Ett representativt
    // värde per kund (senaste) → statistiken skevar inte av en tung uppladdare.
    const rows = await db`
      WITH per_customer AS (
        SELECT DISTINCT ON (COALESCE(NULLIF(user_email, ''), fingerprint))
               COALESCE(NULLIF(user_email, ''), fingerprint) AS cust,
               annual_cost
        FROM invoice_analyses
        WHERE normalized_supplier = ${normalizedSupplier}
          AND category            = ${category}
          AND route               = 'auto'
          AND annual_cost         > 500
          AND annual_cost         < 5000000
        ORDER BY COALESCE(NULLIF(user_email, ''), fingerprint), created_at DESC
      )
      SELECT
        COUNT(*)::int                                                           AS n,
        ROUND(AVG(annual_cost))::int                                            AS avg_cost,
        ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY annual_cost))::int   AS p25,
        ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY annual_cost))::int   AS median,
        MIN(annual_cost)::int                                                   AS min_cost,
        MAX(annual_cost)::int                                                   AS max_cost
      FROM per_customer
    `;

    const r = rows[0];
    if (!r || r.n < 3) return null;                  // minst 3 DISTINKTA bolag, annars ingen kollektiv sanning
    if (r.max_cost <= r.min_cost) return null;        // ingen spridning → ingen fördelning att visa (regel 3)

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
