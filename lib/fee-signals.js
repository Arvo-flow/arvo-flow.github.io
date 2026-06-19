// lib/fee-signals.js — Ny avgift/tariff-detektorn (smyghöjning på pränt).
//
// Svea-läxan (faktura 440192): leverantören skrev SJÄLV "Miljö- och adminavgift
// (Ny tariff)" på fakturan — 5 940 kr/år i ny avgift — och analysen sa ingenting.
// När leverantören dokumenterar sin egen höjning i radbeskrivningen ska Arvo
// läsa det högt. Deterministisk regex, ingen AI (regel 2). Fail-open.

// Exporteras som EN sanning — lib/forensics.js konsumerar samma regex (regel 1).
export const FEE_SIGNAL_RE =
  /ny tariff|ny avgift|nytt pris|prisjustering|justerad (?:avgift|tariff|taxa)|höjd avgift|avgiftshöjning|indexuppräkning|indexjustering/i;

/**
 * Skannar radbeskrivningar efter leverantörens egna höjningsmarkörer.
 *
 * @param {Array}  lineItems         - extraherade fakturarader
 * @param {number} periodMultiplier  - perioder per år (12 för månadsfaktura)
 * @returns {Array<{description: string, match: string, amount: number, annualImpact: number}>}
 */
export function detectFeeSignals(lineItems, periodMultiplier = 12) {
  const signals = [];
  for (const item of lineItems ?? []) {
    const desc = item?.description ?? '';
    const m = desc.match(FEE_SIGNAL_RE);
    if (!m) continue;
    const amount = item.amount ?? 0;
    signals.push({
      description: desc,
      match: m[0],
      amount,
      annualImpact: Math.round(amount * periodMultiplier),
    });
  }
  return signals;
}
