// src/lib/prisavvikelse.js — fakturavyns besked när licensprövningen stoppade prissättningen.
//
// Svaret för `price_anomaly` bär `prisprov` (api/test-invoice.mjs): 'rad' när en Microsoft-nivårad
// kostar mer än 2 × nivåns listpris, 'per_plats' när mains tak på projektion ÷ platser slog till.
// Mains tak gäller Microsoft, Google och Adobe (lib/supplier-price-intel.js). Meningen får därför inte
// namnge en leverantörs produkter, och den får inte påstå att priset är fel: taket stoppar också
// korrekta fakturor, till exempel Adobe Creative Cloud Pro till listpris och E5 med Copilot (sjätte
// granskningen, P-1). Texten bor här, inte i vyn, så att LT-11 kan pröva vilken mening varje värde ger.

export const PRISAVVIKELSE_RUBRIK = 'Vi stoppade prissättningen.';

const MENING = Object.freeze({
  per_plats: 'Kostnaden per licens och månad, räknad som fakturans löpande belopp delat med antalet '
    + 'licenser, är högre än den gräns vi prövar automatiskt för leverantören. Det behöver inte betyda '
    + 'att priset är fel: gränsen finns för att fånga tal vi kan ha läst fel, till exempel en kvartals- '
    + 'eller årssumma som ett månadspris, men den stoppar också vissa korrekta fakturor, till exempel med '
    + 'tillägg eller till ett högre listpris.',
  rad: 'Priset på en licensrad är högre än vi kan bekräfta automatiskt, så vi kan ha läst ett tal fel, '
    + 'till exempel en kvartals- eller årssumma som ett månadspris.',
});

// Ett svar utan `prisprov` ska inte förekomma: cachen höjdes till v32 i samma commit som fältet. Om
// det ändå gör det får kunden en mening som är sann för båda prövningarna.
const RESERV = 'Kostnaden per licens på fakturan är högre än vi kan bekräfta automatiskt, så vi kan ha '
  + 'läst ett tal fel, till exempel en kvartals- eller årssumma som ett månadspris.';

export const PRISAVVIKELSE_SLUT = 'Därför visar vi inga besparingssiffror för den här fakturan.';

/** Meningen för en prisavvikelse, per prövning. */
export function prisavvikelseMening(prisprov) {
  return prisprov === 'per_plats' || prisprov === 'rad' ? MENING[prisprov] : RESERV;
}
