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
 * KOHORTKORTET ÄR AVSTÄNGT (grundarorder 2026-09-24: «bygg om det per enhet, eller döda det tills datan finns»).
 *
 * Kortet ställde kundens TOTALSUMMA mot andra avsändares totalsummor och kallade skillnaden «N % mer».
 * En total för 40 abonnemang mot en total för 5 säger ingenting om priset — «vad är talet per?» (21 aug).
 * Per enhet går inte att bygga ärligt i dag: nämnaren i lagringen (`seat_count`, `price_per_seat_monthly`)
 * fylls av modellen i extraktionen, inte ur fakturans avlästa antalskolumn (antalsdoktrinen, 9 sep), och
 * ett per-enhetspris ur en modellfylld nämnare är precision vi inte har.
 * Mätt 24 sep (`probe-lagrade-kundtexter`, K3): 0 av 15 leverantör×kategori-celler nådde ens tröskeln för
 * totalsummor, så ingen kund förlorar ett kort. Kortet återkommer när nämnaren är avläst radvis
 * (lib/radobservation.js) och en cell bär — då byggs det här, och KO-01 skrivs om med det.
 *
 * @returns {Promise<null>} alltid null — konsumenterna (rummet, fakturavyn) tiger när svaret saknas
 */
export async function getMarketIntelligence() {
  return null;
}
