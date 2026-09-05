// lib/grindpaus.js — EN sanning för när e-postgrinden är tillfälligt öppen.
//
// ══ GRUNDARBESLUT 2026-09-05 ═══════════════════════════════════════════════════════════════
//
// Grundaren begärde grinden borttagen i 24 timmar för att kunna testa hela flödet i skarpt
// läge. Jag invände en gång — en tidsbegränsning som lever i ett MINNE är precis den felfamilj
// vi jagat hela veckan: ett tillfälligt tillstånd som ser exakt likadant ut som ett permanent,
// och som ingen kommer ihåg att stänga. Grundaren stod fast, och då är det hans beslut.
//
// Invändningen byggs därför in i stället för att upprepas: **fönstret stänger sig självt.**
// Ingen människa behöver göra något den 6 september. Passerar klockan `till` är grinden
// tillbaka, även om varenda person som visste om ändringen har glömt den. Det är skillnaden
// mellan en påminnelse och en mekanism.
//
// EXPONERINGEN, uttalad: under fönstret gäller detta VARJE besökare, inte bara grundaren.
// Kvar står de två spärrar som skyddar plånboken och inte konverteringen:
//   · rate limit 5 analyser/IP/dygn (api/test-invoice.mjs)
//   · globaltaket 200 analyser/dygn (checkGlobalCap) — gäller alla, även bypass-nyckeln
// Kostnadstaket är alltså oförändrat; det enda som pausas är kravet på e-postadress.
//
// FÅNGAR: att pausen blir permanent genom glömska — `till` är hårdkodad och läses vid varje
//   anrop, så det finns inget tillstånd någon kan missa att återställa.
// BLIND: modulen vet inget om VEM som frågar. Under fönstret är grinden öppen för alla, och
//   det är hela innebörden av beslutet — inte en lucka. Den kan heller inte se om någon
//   flyttar fram `till` i en senare commit; det skyddet är GP-04 (fönstret får vara högst 48 h)
//   plus en människas blick på diffen.

/** Pausfönstret. Ändras BARA av ett uttalat grundarbeslut — och GP-04 begränsar dess längd. */
export const GRIND_PAUS = {
  fran: '2026-09-05T18:00:00Z',
  till: '2026-09-06T18:00:00Z',
  skal: 'grundarbeslut 2026-09-05 — fullskaligt test av hela analysflödet',
};

/**
 * Är e-postgrinden pausad just nu?
 * @param {number} nu  epoch-ms; injicerbar så att sviten kan pröva alla tre lägena utan att
 *                     vänta på kalendern (ett test som bara kan köras ett visst dygn är inget test).
 */
export function grindPausad(nu = Date.now()) {
  const fran = Date.parse(GRIND_PAUS.fran);
  const till = Date.parse(GRIND_PAUS.till);
  if (!Number.isFinite(fran) || !Number.isFinite(till)) return false;  // obegripligt fönster → grinden står kvar
  return nu >= fran && nu < till;
}
