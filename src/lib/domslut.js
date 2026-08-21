// src/lib/domslut.js — VILKET LÄGE veckodomen är i, och om det läget gör ett positivt
// påstående om kundens PRIS.
//
// VARFÖR MODULEN FINNS (2026-08-21, ur den första skärmdumpen på hela obduktionen).
// Rummet visade i samma vy:
//
//     ARVO BEDÖMER:  «Håll kursen. Era priser står sig mot verifierat listpris.»
//     ARVO SCORE:    15/100        MARKNADSLÄGE: SÄMRE
//     BEVAKNING:     «Era priser står sig — inga byten på bordet just nu.»
//     H1:            «Allt är under kontroll.»
//
// Score 15 betyder att kunden ligger långt över golvet. Tre av fyra ytor sa att det var bra.
// Orsaken: rubrikens `!acting`-gren läste ALDRIG `standing` — den sa «era priser står sig» så
// snart det saknades ett byte att lägga fram. Det är 19 augusti-felet igen (ringen och pillen
// rättades då; veckodomen grep:ades aldrig), och kommentaren ovanför raden PÅSTOD att rubriken
// höll med mätaren. **En kommentar som intygar en invariant koden inte håller är värre än ingen
// kommentar — nästa läsare kontrollerar den inte.**
//
// Den bärande satsen, tredje gången i den här kodbasen: **frånvaron av ett verifierat bytesmål
// säger ingenting om huruvida kunden betalar rätt.** Att inte ha ett byte att lägga fram är ett
// påstående om VÅRT underlag, aldrig om kundens pris.
//
// Modulen gör motsägelsen omöjlig att representera i stället för att lappa den fjärde ytan:
// varje läge deklarerar om det gör ett positivt prispåstående, och maskinvakten kräver att ett
// sådant läge bara kan väljas när mätaren faktiskt säger «bättre».
//
// FÅNGAR: att en yta beröm-formulerar sig på en rad där scoren säger motsatsen, och att en ny
//   gren införs utan att deklarera vad den påstår.
// BLIND: modulen dömer LÄGET, inte den slutliga svenskan. Skriver någon en berömmande mening i
//   ett läge som deklarerats neutralt ser vakten det inte — texten och deklarationen bor ihop
//   här just för att hålla avståndet kort, men avståndet är inte noll.

/**
 * Lägena veckodomen kan stå i. `positivtPrispastaende` är deklarationen vakten prövar:
 * säger texten något gott om kundens PRIS, eller bara om vad vi gör?
 */
export const DOMLAGEN = {
  // Inget att agera på
  lugn_battre:      { positivtPrispastaende: true,  kravNiva: 'battre' },
  lugn_i_niva:      { positivtPrispastaende: false, kravNiva: 'i-niva' },
  lugn_over_golvet: { positivtPrispastaende: false, kravNiva: 'samre'  },
  lugn_omatt:       { positivtPrispastaende: false, kravNiva: null     },
  // Byte på bordet
  byte_battre:      { positivtPrispastaende: true,  kravNiva: 'battre' },
  byte_i_niva:      { positivtPrispastaende: false, kravNiva: 'i-niva' },
  byte_samre:       { positivtPrispastaende: false, kravNiva: 'samre'  },
  byte_omatt:       { positivtPrispastaende: false, kravNiva: null     },
  // Fynd utan byte
  fynd:             { positivtPrispastaende: false, kravNiva: null     },
};

/**
 * @param {{ acting: boolean, hasSwitchAction: boolean, standing: {satt?: boolean, niva?: string|null} }} p
 * @returns {keyof DOMLAGEN}
 */
export function domensLage({ acting, hasSwitchAction, standing } = {}) {
  const satt = standing?.satt === true;
  const niva = satt ? standing.niva : null;
  if (!acting) {
    if (!satt) return 'lugn_omatt';
    return niva === 'battre' ? 'lugn_battre' : niva === 'i-niva' ? 'lugn_i_niva' : 'lugn_over_golvet';
  }
  if (!hasSwitchAction) return 'fynd';
  if (!satt) return 'byte_omatt';
  return niva === 'battre' ? 'byte_battre' : niva === 'i-niva' ? 'byte_i_niva' : 'byte_samre';
}

/** Gör läget ett positivt påstående om kundens pris? Enda vägen för konsumenter att fråga. */
export function beromsLage(lage) {
  return DOMLAGEN[lage]?.positivtPrispastaende === true;
}
