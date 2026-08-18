// lib/prisunderlag.js — HUR LANDADE VI I TALET? JÄMFÖRELSEN, UTSKRIVEN.
//
// VARFÖR (grundarbeslut 2026-08-16): rummet visar en ring med ett tal och etiketten RÄTT PRISSATT.
// En finansdirektör kan inte ta ställning till det. Vad är verifierat listpris? Vad betalar vi per
// enhet? Hur långt ifrån ligger vi, och när kontrollerades priset senast? Utan de fyra raderna är
// scoren ett omdöme utan bevis — och ett omdöme utan bevis är precis vad en CFO betalar oss för
// att slippa.
//
// VAD DEN HÄR MODULEN ÄR OCH INTE ÄR: den producerar ALDRIG ett score. Talet räknas i recommend.js
// (regel 1 — en sanning per fråga) och lagras som health_score. Här byggs bara JÄMFÖRELSEN som
// talet vilar på, ur samma storheter: kundens pris per enhet, det verifierade golvet, avståndet.
// Två producenter av samma tal vore exakt den motsägelse vi rensat ut ur resten av rummet.
//
// FAIL-CLOSED, som uppdelningen: saknas antal enheter, årskostnad eller ett verifierat ankare
// returnerar vi null och kortet säger ingenting. Hellre inget underlag än ett halvt.

const tal = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

/**
 * @param {object} o
 * @param {number} o.annualCost  - kundens årskostnad (lagrad)
 * @param {number} o.seats       - antal enheter ur kundens egen faktura
 * @param {object} o.ankare      - branchAnchor för kategorin: { p25, median, unitLabel, lastVerified }
 * @returns {{perEnhet,golv,median,unitLabel,lastVerified,underGolv,avstandPct,jamfortMot}|null}
 */
export function byggPrisunderlag({ annualCost, seats, ankare } = {}) {
  const kostnad = tal(annualCost);
  const enheter = tal(seats);
  const golv = tal(ankare?.p25);
  const median = tal(ankare?.median);
  if (!(kostnad > 0) || !(enheter > 0) || !(golv > 0)) return null;

  // Per enhet är den ENDA jämförbara storheten. Att ställa en totalsumma mot ett per-enhet-pris
  // var enhetsfelet som enhetskarantänen finns för att stoppa — det får aldrig ske i en kundyta.
  const perEnhet = Math.round(kostnad / enheter);

  // Avståndet räknas mot GOLVET (billigaste publicerade priset), för det är vad scoren mäter mot.
  // Formeln är (pris − golv) / golv: "hur många procent över det billigaste ligger ni". Att i
  // stället dela med priset ger ett annat tal och en annan mening — det var 85-felet (Svea-läxan).
  const avstandPct = Math.round(((perEnhet - golv) / golv) * 100);

  return {
    perEnhet,
    golv,
    median: median > 0 ? median : null,
    unitLabel: ankare?.unitLabel ?? null,
    lastVerified: ankare?.lastVerified ?? null,
    underGolv: perEnhet <= golv,
    avstandPct,
    // Vad talet faktiskt jämförs med, utskrivet — så att ingen yta kan kalla det "marknaden".
    jamfortMot: 'billigaste publicerade priset',
  };
}
