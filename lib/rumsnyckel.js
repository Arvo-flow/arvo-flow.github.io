// lib/rumsnyckel.js — RUMMET ÖPPNAS BARA MED EN NYCKEL SOM INTE GÅR ATT GISSA.
//
// ══ VARFÖR (grundarorder 2026-09-23, ur undersökningen) ═══════════════════════════════════════
// Rummets datadörr (`api/invoice-history`) lämnade ut analyser — leverantörer, kostnader,
// besparingar — på enbart ett `fingerprint`. Tre sorters fingeravtryck fanns, och alla tre gick
// att räkna fram utifrån:
//   · webbläsaren: en sha256-hash av userAgent|språk|skärm|tidszon|kärnor, kapad till 24 tecken. Ingen
//     slump. Två likadant inställda datorer fick SAMMA nyckel, och en vanlig konfiguration går att
//     räkna fram utan att ha rört kundens dator.
//   · mail-in:   `mail:<sha16(avsändaradress)>`   — den som vet adressen vet nyckeln.
//   · kontoret:  `kontor:<sha16(e-post)>`          — samma sak.
// `api/send-report` tog dessutom emot fingeravtryck + VALFRI e-postadress och mejlade analyserna
// dit. Den är raderad; ingen sida anropade den.
//
// Regeln nu: en rumsnyckel är 128 bitar slump, skapad i webbläsaren med `crypto.getRandomValues`
// (`src/utils/rumsnyckel.js`), och servern läser historik ENBART på en nyckel i exakt det formatet.
// Allt annat nekas FÖRE databasen.
//
// FÅNGAR: en läsning på ett deterministiskt fingeravtryck (gammalt format), på en syntetisk
//   nyckel härledd ur en e-postadress, och på tomma/korta värden (RN-01..03).
// BLIND: formatet bevisar att nyckeln SER slumpad ut, aldrig att den ÄR det. En klient som själv
//   räknar fram 32 hex ur något gissbart skulle passera — men då finns ingen ANNAN kunds data
//   under den, eftersom varje riktig klient slumpar sin (RN-05 låser att klienten gör det).
//   Grinden skyddar alltså mot att gissa någon annans nyckel, inte mot en klient som väljer en
//   svag nyckel åt sig själv.
//
// Kostnaden, mätt 2026-09-23 (probe-undersokning U1): de 6 anonyma raderna i produktion ligger
// under gamla nycklar och når inte längre sitt webbläsarrum. 3 är repots testfakturor, 3 är
// webbuppladdningar 5/8 sep. Rader med e-post nås som förut via magic-länk/session.

export const RUMSNYCKEL_RE = /^[0-9a-f]{32}$/;

/** true = nyckeln har formatet för en slumpad rumsnyckel och får användas för att LÄSA historik. */
export function arRumsnyckel(v) {
  return typeof v === 'string' && RUMSNYCKEL_RE.test(v);
}
