// lib/fee-signals.js — Ny avgift/tariff-detektorn (smyghöjning på pränt).
//
// Svea-läxan (faktura 440192): leverantören skrev SJÄLV "Miljö- och adminavgift
// (Ny tariff)" på fakturan — 5 940 kr/år i ny avgift — och analysen sa ingenting.
// När leverantören dokumenterar sin egen höjning i radbeskrivningen ska Arvo
// läsa det högt. Deterministisk regex, ingen AI (regel 2). Fail-open.

// Exporteras som EN sanning — lib/forensics.js konsumerar samma regex (regel 1).
// Radtyper som utgör den löpande kostnaden — de enda som får annualiseras (samma mängd som
// lib/fakturarader.js LOPANDE och lib/forensics.js LOPANDE_RADTYPER).
const LOPANDE_RADTYPER = new Set(['recurring_subscription', 'recurring', 'subscription']);

export const FEE_SIGNAL_RE =
  /ny tariff|ny avgift|nytt pris|prisjustering|justerad (?:avgift|tariff|taxa)|höjd avgift|avgiftshöjning|indexuppräkning|indexjustering/i;

/**
 * Skannar radbeskrivningar efter leverantörens egna höjningsmarkörer.
 *
 * @param {Array}  lineItems         - extraherade fakturarader
 * @param {number|null} periodMultiplier  - perioder per år ur lib/faktureringsperiod.js.
 *   `null` betyder «perioden är inte bestämd» och ger `annualImpact: null` — ALDRIG ett
 *   antaget tal. Här stod `= 12` som default, vilket gjorde varje obestämd period till
 *   ett påstående om månadsvis fakturering.
 * @returns {Array<{description: string, match: string, amount: number, annualImpact: number|null}>}
 */
export function detectFeeSignals(lineItems, periodMultiplier = null) {
  const signals = [];
  for (const item of lineItems ?? []) {
    const desc = item?.description ?? '';
    const m = desc.match(FEE_SIGNAL_RE);
    if (!m) continue;
    const amount = item.amount ?? 0;
    // Bara LÖPANDE rader har ett årstal. En engångsavgift återkommer inte — att gånga den med
    // periodfaktorn gav «4 500 kr startavgift = 54 000 kr/år» i kundens prosa.
    const lopande = LOPANDE_RADTYPER.has(String(item?.type));
    signals.push({
      description: desc,
      match: m[0],
      amount,
      engangsbelopp: !lopande,
      annualImpact: lopande && periodMultiplier > 0 ? Math.round(amount * periodMultiplier) : null,
    });
  }
  return signals;
}
