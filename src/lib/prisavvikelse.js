// src/lib/prisavvikelse.js — fakturavyns besked när licensprövningen stoppade prissättningen.
//
// Svaret för `price_anomaly` bär `prisprov` (api/test-invoice.mjs): 'rad' när en Microsoft-nivårad
// kostar mer än 2 × nivåns listpris, 'per_plats' när mains tak på projektion ÷ platser slog till.
// Mains tak gäller Microsoft, Google och Adobe (lib/supplier-price-intel.js). Meningen får därför inte
// namnge en leverantörs produkter, och den får inte påstå att priset är fel: taket stoppar också
// korrekta fakturor, till exempel Adobe Creative Cloud Pro till listpris och E5 med Copilot (sjätte
// granskningen, P-1). Texten bor här, inte i vyn, så att LT-11 kan pröva vilken mening varje värde ger.

export const PRISAVVIKELSE_RUBRIK = 'Vi stoppade prissättningen.';

// TALET ÄR VÅRT, INTE FAKTURANS (nionde granskningen, R-1/R-2; fjärde gången samma form efter N-1, P-1
// och Q-1). Prövningen finns för att fånga felläsningar. En mening som beskriver talet som ett faktum
// om fakturan («fakturans kostnad», «priset på licensraden») blir därför falsk precis när prövningen gör
// rätt: perioden, projektionen eller antalet var fel läst, ibland av vår egen regel. Meningarna säger
// bara vad vi räknade fram och vad gränsen är till för. Exemplet i förbehållet gäller gränsens syfte,
// aldrig skälet för just den fakturan.
const FORBEHALL = 'Det behöver inte betyda att priset är fel: gränsen finns för att fånga tal vi kan ha '
  + 'läst fel, till exempel en kvartalssumma som ett månadspris, och den stoppar också vissa korrekta '
  + 'fakturor.';

const MENING = Object.freeze({
  // pricePerSeatMonthly ur extraktionen: projektionen ÷ antal användare ÷ periodens månader, prövad mot
  // mains tröskel för leverantören.
  per_plats: 'Kostnaden per användare och månad som vi räknade fram ur fakturan ligger över den gräns '
    + `vi prövar automatiskt för leverantören. ${FORBEHALL}`,
  // Radprövningen: radens belopp ÷ antal per månad > 2 × nivåns högsta listpris i prisboken.
  rad: 'Priset per licens och månad som vi räknade fram ur en licensrad är mer än dubbelt så högt som '
    + `planens listpris. ${FORBEHALL}`,
});

// Ett svar utan `prisprov` ska inte förekomma: cachen höjdes till v32 i samma commit som fältet. Om
// det ändå gör det får kunden en mening som är sann för båda prövningarna.
const RESERV = `Ett pris som vi räknade fram ur fakturan ligger utanför det vi kan pröva automatiskt. ${FORBEHALL}`;

export const PRISAVVIKELSE_SLUT = 'Därför visar vi inga besparingssiffror för den här fakturan.';

/** Meningen för en prisavvikelse, per prövning. */
export function prisavvikelseMening(prisprov) {
  return prisprov === 'per_plats' || prisprov === 'rad' ? MENING[prisprov] : RESERV;
}
