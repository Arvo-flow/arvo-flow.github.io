// src/lib/prisavvikelse.js — fakturavyns besked när licensprövningen stoppade prissättningen.
//
// Svaret för `price_anomaly` bär `prisprov` (api/test-invoice.mjs): 'rad' när en Microsoft-nivårad
// kostar mer än 2 × nivåns listpris, 'per_plats' när mains tak på projektion ÷ platser slog till.
// Mains tak gäller Microsoft, Google och Adobe (lib/supplier-price-intel.js). Meningen får därför inte
// namnge en leverantörs produkter, och den får inte påstå att priset är fel: taket stoppar också
// korrekta fakturor, till exempel Adobe Creative Cloud Pro till listpris och E5 med Copilot (sjätte
// granskningen, P-1). Texten bor här, inte i vyn, så att LT-11 kan pröva vilken mening varje värde ger.

export const PRISAVVIKELSE_RUBRIK = 'Vi stoppade prissättningen.';

// Varje mening beskriver bara det prövningen räknar (åttonde granskningen, Q-1: «delat med antalet
// licenser» var fel nämnare, för priset per plats delas med antalet användare extraktionen läste, och
// för flera produkter per användare gav meningens egen uträkning ett tal under gränsen). Ett exempel
// står bara som exempel på vad gränsen stoppar i allmänhet, aldrig som skälet för just den fakturan.
const MENING = Object.freeze({
  // pricePerSeatMonthly = den löpande kostnaden för nästa fulla period ÷ antal användare ÷ periodens
  // månader (agents/test-invoice/extract.js), prövad mot mains tröskel för leverantören.
  per_plats: 'Fakturans löpande kostnad per månad, delad med det antal användare vi läste på fakturan, '
    + 'är högre än den gräns vi prövar automatiskt för leverantören. Det behöver inte betyda att priset '
    + 'är fel: gränsen stoppar också korrekta fakturor, till exempel när användarna har flera produkter '
    + 'eller tillägg, eller när ett listpris ligger över gränsen. Den finns för att fånga tal vi kan ha '
    + 'läst fel, till exempel en kvartals- eller årssumma som ett månadspris.',
  // Radprövningen: radens belopp ÷ antal per månad > 2 × nivåns högsta listpris i prisboken.
  rad: 'Priset per licens på en licensrad är mer än dubbelt så högt som planens listpris, så vi kan ha '
    + 'läst ett tal fel, till exempel en kvartals- eller årssumma som ett månadspris. Det behöver inte '
    + 'betyda att priset är fel.',
});

// Ett svar utan `prisprov` ska inte förekomma: cachen höjdes till v32 i samma commit som fältet. Om
// det ändå gör det får kunden en mening som är sann för båda prövningarna.
const RESERV = 'Fakturans kostnad per licens eller användare ligger utanför det vi kan pröva automatiskt, '
  + 'så vi kan ha läst ett tal fel, till exempel en kvartals- eller årssumma som ett månadspris.';

export const PRISAVVIKELSE_SLUT = 'Därför visar vi inga besparingssiffror för den här fakturan.';

/** Meningen för en prisavvikelse, per prövning. */
export function prisavvikelseMening(prisprov) {
  return prisprov === 'per_plats' || prisprov === 'rad' ? MENING[prisprov] : RESERV;
}
