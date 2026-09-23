// lib/rattstorleksfynd.js — RÄTT-STORLEKSFYNDET SOM MOTORN RÄKNADE SKA NÅ RUMMET.
//
// ══ VARFÖR (grundarbeslut 2026-09-23, fyndgraden) ═══════════════════════════════════════════
// `recommend()` räknar fyra rätt-storleksfynd — verifierad listprisskillnad mellan kundens nivå och
// nivån under (saas-finance, M365, Adobe, löneadmin). `storeAnalysis` sparade inget av dem: de
// levde bara i svaret till fakturasidan och kastades vid lagring. Mätt med scripts/probe-fyndgrad:
// övre gräns 9 av 43 riktiga analyser i kategorier med en sådan motor — fynd som redan är
// beräknade och som rummet aldrig kunde visa. Det enda mätta läckaget i fyndgraden där arbetet
// redan var gjort.
//
// ══ EN SANNING (regel 1) — MED EN SPEGEL, OCH VARFÖR ════════════════════════════════════════
// Vilka fält som är rätt-storleksfynd avgörs av `NIVASANKNINGSKORT` i src/lib/diagnos.js — samma
// register som fakturavyns rubrik frågar. Den här modulen kan inte IMPORTERA det: `lib/` är
// deklarerad ESM (lib/package.json) men `src/` är det inte, så en import härifrån hade gjort
// produktionsvägen beroende av att Vercels Node-version gissar modulformatet (mätt: Node varnar
// MODULE_TYPELESS_PACKAGE_JSON vid importen). Listan speglas därför här, och RS-09 kräver att
// spegeln är IDENTISK med registret — en lista som glider isär fäller sviten, inte kunden.
//
// FÅNGAR: vilket rätt-storleksfynd den senaste körningen gjorde, med motorns egna tal.
// BLIND: det lagrade objektet är motorns tal VID ANALYSEN. Listpriset kan ändras efteråt; talen
//   följer då inte med förrän fakturan analyseras om (analysstämpeln visar hur gammal domen är).

export const RATTSTORLEK_FALT = [
  'saasFinanceRightsizing', 'm365Rightsizing', 'adobeRightsizing', 'loneadminRightsizing',
];

/**
 * Det rätt-storleksfynd rekommendationen bär, som ett lagringsbart objekt — eller `null`.
 * `falt` följer med så att läsaren vet vilken motor som räknade (formerna skiljer sig).
 * Bär rekommendationen flera (ska inte hända — varje motor äger sin kategori) vinner den första
 * i registrets ordning, och det står här i stället för att vara en tyst följd av en loop.
 */
export function valjRattstorlek(recommendation) {
  for (const falt of RATTSTORLEK_FALT) {
    const rs = recommendation?.[falt];
    if (rs && typeof rs === 'object') {
      // Prosan (reviewPrompt/note) lagras inte: den skrivs vid läsning ur talen, så att en
      // copyrättelse når varje lagrad rad utan omkörning — samma drag som scoren 19 aug.
      const { reviewPrompt, note, ...tal } = rs;
      return { falt, ...tal };
    }
  }
  return null;
}
