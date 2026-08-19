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
    // VAD GOLVET ÄR PRISET PÅ (2026-08-18). "Billigaste publicerade pris 1 606 kr" på en Google
    // Workspace-rad läses av varje finansdirektör som Googles pris — men talet är M365 Business
    // Standard. Utan produktnamnet är raden en antydan, inte en jämförelse. Maskinvakt: MK-08
    // kräver att varje real-public-kategori bär sitt referensProdukt.
    referensProdukt: ankare?.referensProdukt ?? null,
    underGolv: perEnhet <= golv,
    avstandPct,
    // Vad talet faktiskt jämförs med, utskrivet — så att ingen yta kan kalla det "marknaden".
    jamfortMot: 'billigaste publicerade priset',
  };
}

// ── SCOREN ÄR EN FUNKTION AV JÄMFÖRELSEN — INTE ETT ANDRA OMDÖME ────────────────────────────
// KONTRAKTSÄNDRING 2026-08-19, och skälet ska stå här. Den här modulen fick tidigare ALDRIG
// producera ett score; talet bodde i recommend.js och lagrades som health_score. Motiveringen var
// regel 1 (en sanning per fråga) och den var rätt — men uppdelningen gjorde det MÖJLIGT för talet
// och dess bevis att glida isär, och det gjorde de.
//
// Grundarens skärmdump: Arvo Score 92 och RÄTT PRISSATT rakt ovanför "Ni ligger 184 % över det
// billigaste priset". Mätt ur hans egen rad:
//   scorens golv  = getBenchmark p25 184 680 kr × 10 platser = 1 846 800 kr   → ratio 0,02 → 96
//   bevisets golv = getPublicListBenchmark p25 1 606 kr × 10 = 16 060 kr      → ratio 2,84 → 15
// 184 680 är en TOTALSUMMA ur invoice_datapoints — vad hela bolag betalar per år — som scoren
// behandlade som ett styckpris och multiplicerade med antalet licenser. Golvet blev 115 gånger för
// högt, kvoten nära noll, och scoren fastnade i taket oavsett vad kunden betalade.
//
// Det är enhetsfelet, och det är ankarkortets bugg ett lager ned: den 15 augusti fann jag att
// kortet läste getBenchmark (som riktigt föredrar livedata, och livedatan är totalsummor) och
// bytte det till getPublicListBenchmark. Jag kontrollerade aldrig om SCOREN gick samma väg.
//
// Därför bor talet nu i samma funktionskedja som beviset: scoren är en ren funktion av perEnhet
// och golv — de två tal kortet skriver ut. Ett score som motsäger sitt eget underlag är därmed
// inte längre ett fel som kan uppstå; det är ett tillstånd koden inte kan representera.
//
// Kurvan är oförändrad (samma tal recommend.js räknade), så bara jämförelsen har rättats.
export function scoreUrUnderlag(u) {
  if (!u || !(u.perEnhet > 0) || !(u.golv > 0)) return null;   // inget underlag → inget score
  const ratio = u.perEnhet / u.golv;                            // 1,0 = exakt på verifierat golv
  if (ratio <= 1.0) return Math.min(96, Math.round(88 + (1 - ratio) * 40));
  if (ratio <= 1.5) return Math.round(88 - (ratio - 1) * 96);
  return Math.max(15, Math.round(40 - (ratio - 1.5) * 30));
}
