// lib/price-impact.js — Deterministisk kr-påverkanberäkning
//
// Inga regex, inga heuristiker om prissättning.
// Strukturerade prisfält in (från Haiku-extraktion + check-definition) → exakt kr/år ut.
//
// Formel: (nytt_pris_per_säte_kr_mth − gammalt_pris_per_säte_kr_mth) × seats × 12

const FALLBACK_USD_SEK = 10.42;
const FALLBACK_EUR_SEK = 11.50;

// Normaliserar ett pris till kr/säte/månad.
function toKrPerSeatMonth(numeric, currency, unit, seats, fxRates) {
  if (numeric == null || isNaN(numeric)) return null;

  let kr = numeric;
  if (currency === 'USD') kr = numeric * (fxRates?.usdSek ?? FALLBACK_USD_SEK);
  if (currency === 'EUR') kr = numeric * (fxRates?.eurSek ?? FALLBACK_EUR_SEK);

  const s = (seats && seats > 0) ? seats : 1;
  switch (unit) {
    case 'per_seat_month':    return kr;
    case 'per_seat_year':     return kr / 12;
    case 'per_company_month': return kr / s;
    case 'per_company_year':  return kr / s / 12;
    case 'flat_month':        return kr / s;
    default:                  return kr;
  }
}

/**
 * Beräknar exakt kr/år-påverkan av en prisändring.
 *
 * Returnerar null om in-data saknas eller är ofullständig
 * (t.ex. check utan exact pris, range-pris, procentsatser).
 *
 * @param {object} opts
 * @param {number}  opts.currentNumeric   — befintligt pris (från check-definitionen)
 * @param {string}  opts.currentCurrency  — 'SEK' | 'USD' | 'EUR'
 * @param {string}  opts.currentUnit      — 'per_seat_month' | 'per_seat_year' | etc.
 * @param {number}  opts.newNumeric       — nytt pris (från Haiku extractedNumeric)
 * @param {string}  opts.newCurrency      — 'SEK' | 'USD' | 'EUR' (default: currentCurrency)
 * @param {string}  opts.newUnit          — unit från Haiku (default: currentUnit)
 * @param {number}  opts.seatCount        — antal licenser/SIM-kort från invoice_analyses
 * @param {object}  opts.fxRates          — { usdSek, eurSek } (live från pricing.js)
 *
 * @returns {{ impactKrYear, deltaPct, oldKrMonth, newKrMonth, deltaKrMonth, seats } | null}
 */
export function computeImpactKr({
  currentNumeric, currentCurrency, currentUnit,
  newNumeric, newCurrency, newUnit,
  seatCount, fxRates,
}) {
  const seats = (seatCount && seatCount > 0) ? seatCount : 1;

  const oldPerSeat = toKrPerSeatMonth(currentNumeric, currentCurrency, currentUnit, seats, fxRates);
  const newPerSeat = toKrPerSeatMonth(
    newNumeric,
    newCurrency ?? currentCurrency,
    newUnit     ?? currentUnit,
    seats,
    fxRates,
  );

  if (oldPerSeat == null || newPerSeat == null || oldPerSeat === 0) return null;

  const deltaKrMonth = newPerSeat - oldPerSeat;
  const deltaPct     = Math.round((deltaKrMonth / oldPerSeat) * 1000) / 10;
  const impactKrYear = Math.round(deltaKrMonth * 12 * seats);

  return {
    impactKrYear,
    deltaPct,
    oldKrMonth:   Math.round(oldPerSeat * 100) / 100,
    newKrMonth:   Math.round(newPerSeat * 100) / 100,
    deltaKrMonth: Math.round(deltaKrMonth * 100) / 100,
    seats,
  };
}

/**
 * Parsear ett check.name till strukturerat prisfält.
 * Returnerar null för range-priser och procentsatser (dessa kan inte beräknas exakt).
 *
 * Exempel:
 *   "Bas 299 kr/mth"               → { numeric: 299,   currency: 'SEK', unit: 'per_seat_month' }
 *   "Standard $14/user/mth annual" → { numeric: 14,    currency: 'USD', unit: 'per_seat_month' }
 *   "E3 årsavtal 384 kr/user/mth"  → { numeric: 384,   currency: 'SEK', unit: 'per_seat_month' }
 *   "~1,75 % transaktionsavgift"   → null
 *   "299–499 kr/mth startpris"     → null (range)
 */
export function parseCheckPrice(checkName) {
  if (!checkName) return null;

  // Hoppa över procentsatser och rangepriser
  if (/[%–−-]\d|\d[–−-]\d/.test(checkName)) return null;
  if (/%/.test(checkName)) return null;

  // USD: "$7", "$14/user/mth", "$13.33/user/mth annual"
  const usd = checkName.match(/\$\s*([\d.]+)/);
  if (usd) return { numeric: parseFloat(usd[1]), currency: 'USD', unit: 'per_seat_month' };

  // SEK per säte: "299 kr/mth", "119,48 kr/user/mth", "384 kr/user/mth", "699 kr/user/mth"
  const sekSeat = checkName.match(/([\d]+[,.]?[\d]*)\s*kr\/(?:user\/mth|mth)$/i);
  if (sekSeat) return { numeric: parseFloat(sekSeat[1].replace(',', '.')), currency: 'SEK', unit: 'per_seat_month' };

  // SEK med mer text efteråt men tydligt per-seat: "119,48 kr/user/mth (årsavtal)"
  const sekSeat2 = checkName.match(/([\d]+[,.]?[\d]*)\s*kr\/(?:user\/mth|mth)\b/i);
  if (sekSeat2) return { numeric: parseFloat(sekSeat2[1].replace(',', '.')), currency: 'SEK', unit: 'per_seat_month' };

  return null;
}
