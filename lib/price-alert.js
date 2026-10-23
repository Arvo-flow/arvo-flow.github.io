// lib/price-alert.js
// Detects smyghöjningar and market intelligence from day 1.
//
// detectPriceAlert: compares pricePerSeatMonthly against the price book's verified list prices
//   (bokfortListpris) — works on the very first invoice without accumulation.
//
// getMarketIntelligence: cross-customer aggregation from invoice_analyses —
//   shows what OTHER companies with the same supplier actually pay.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { lasLicensniva } from './licensniva.js';
import { leverantorsnyckel } from './supplier-price-intel.js';

/**
 * Bokfört listpris per licens och månad ur prisboken, eller null. Larmets enda källa för golvet.
 *
 * PRISBOKEN, INTE supplier_prices (grundarbeslut 2026-10-21: inga parallella prislistor). Golvet lästes
 * förut ur tabellen supplier_prices, som seedades med majpriser ur repot. Seedarna är borttagna (SS-01),
 * och raderna i tabellen följde aldrig boken. Nu täcks bara det prisboken bär per leverantör OCH produkt:
 * Microsoft 365 med bevisad nivå, mot nivåns pris vid månadsfakturering (msrpMonthly, samma grund som
 * seedarnas price_monthly). Allt annat ger null, alltså inget larm (LU-22):
 * · Telia, Telenor och Tre larmades förut mot opålitliga majtal.
 * · Tele2 mobil har inget plannamn att läsa. Bokens golv är den billigaste planen (269), och 349 är
 *   också ett publicerat listpris. Med larmets tröskel på 5 % hade en kund på 349-planen till
 *   listpris larmats +30 %, alltså produktvalet mätt som pris (E3/E5-fällan, 20 aug).
 */
const arMicrosoftSaas = (normalizedSupplier, category) =>
  category === 'saas-productivity' && leverantorsnyckel(normalizedSupplier) === 'microsoft';

export function bokfortListpris({ normalizedSupplier, category, niva }) {
  if (!arMicrosoftSaas(normalizedSupplier, category) || !niva) return null;
  const t = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[niva.nyckel];
  if (!t || t.currency !== 'SEK' || !(t.msrpMonthly > 0)) return null;
  return { pris: t.msrpMonthly, produkt: niva.namn, lastVerified: t.lastVerified ?? null };
}

/**
 * Returnerar en prissignal om kunden betalar mer än det bokförda listpriset, eller null.
 * @returns {Promise<null|{overListPrice:boolean|null, percentOver:number|null, ...}>}
 */
export async function detectPriceAlert({ normalizedSupplier, pricePerSeatMonthly, category, lineItems }) {
  if (!normalizedSupplier || !(pricePerSeatMonthly > 0)) return null;

  // ── GOLVET MÅSTE MÄTA KUNDENS PRIS, INTE KUNDENS PRODUKTVAL (2026-08-24, H5) ─────────────────
  // Frågan löd en gång `ORDER BY price_monthly ASC LIMIT 1`, kategorins BILLIGASTE produkt. En E3-kund
  // på exakt E3:s listpris flaggades då +571 % mot Basic. Spärren är mätt: saas har 9,6× spann och
  // kräver bekräftad nivå, mobil har 1,1× och behåller kategorigolvet. Deklarationen läses ur
  // prisboken, och nivån läses med samma funktion som LFL använder (regel 1).
  const kraverNiva = BRANCHINDEX[category]?.kraverBekraftadNiva === true;
  const niva = kraverNiva ? lasLicensniva(lineItems) : null;

  // Kategorin kräver bekräftad nivå men fakturan bevisar ingen: FAKTA står kvar, PÅSTÅENDET uteblir.
  // Bara för en leverantör vars nivåer boken bär, annars finns inget att stå kvar med.
  if (kraverNiva && !niva) {
    if (!arMicrosoftSaas(normalizedSupplier, category)) return null;
    return {
      overListPrice:             null,
      percentOver:               null,
      nivaOviss:                 true,
      customerPriceMonthly:      Math.round(pricePerSeatMonthly),
      verifiedListPriceMonthly:  null,
      verifiedProduct:           null,
      sourceType:                'prisboken',
      lastVerified:              null,
    };
  }

  const bok = bokfortListpris({ normalizedSupplier, category, niva });
  if (!bok) return null;
  const percentOver = Math.round(((pricePerSeatMonthly - bok.pris) / bok.pris) * 100);
  if (percentOver < 5) return null;

  return {
    overListPrice:             true,
    percentOver,
    nivaOviss:                 false,
    customerPriceMonthly:      Math.round(pricePerSeatMonthly),
    verifiedListPriceMonthly:  Math.round(bok.pris),
    verifiedProduct:           bok.produkt,
    sourceType:                'prisboken',
    lastVerified:              bok.lastVerified,
  };
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
