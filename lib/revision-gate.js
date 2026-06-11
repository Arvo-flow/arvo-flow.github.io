// lib/revision-gate.js — Revisionsgrinden: precision eller tystnad som ARKITEKTUR.
//
// Regel 4 säger att vi aldrig visar en siffra vi inte kan stå för. Hittills har
// det varit en granskningsfråga — varje kategorikort har fått sina fel upptäckta
// i efterhand (188, 683, teaterkortet, Svea ×4). Grinden vänder på bevisbördan:
//
//   En kategori får visa siffror för kund ENDAST om den är reviderad —
//   dvs. har en dedikerad regressionssvit som låser kortets aritmetik och copy.
//   Alla andra kategorier faller automatiskt till ärligt offert-läge, utan
//   en enda siffra. Okända fel når aldrig en kund; de kan bara drabba kategorier
//   som redan bär maskinlås.
//
// Väg in i listan (sifferrevisorn verifierar i pre-commit):
//   1. Fixturfaktura + dedikerad regressionssvit som låser varje kundsynlig siffra
//   2. Grönt i hela testsviten
//   3. Kategorin läggs till här MED hänvisning till sviten
//
// Att ta bort en kategori ur listan är alltid tillåtet (mer tystnad är aldrig fel).
// Att lägga till utan svit ska fastna i code review — hänvisningen är obligatorisk.

export const REVIDERADE_KATEGORIER = new Map([
  ['saas-productivity', 'tests/saas-like-for-like.mjs + tests/saas-tier-detection.mjs + tests/balanskrav.mjs (NMIT 8840219)'],
  // OBS: 'saas-devtools' finns i recommend.js men INTE i kategoriserarens CATEGORIES —
  // kategoriseraren kan aldrig emittera den, så den hålls utanför grinden (tystnad är default).
  ['mobil',             'tests/fixtures/01-mobil.mjs + 03-combined.mjs + 08-realistic.mjs via tests/run.mjs'],
  ['bredband',          'tests/fixtures/02-bredband.mjs + speed-tier-svit i tests/branchindex.mjs (BI-08)'],
  ['el',                'tests/el-intelligence.mjs + tests/el-recommendation.mjs + tests/fixtures/04-el.mjs'],
  ['skrivarleasing',    'tests/svea-print.mjs (faktura 440192) + tests/fixtures/06-skrivarleasing.mjs'],
  ['kortterminal',      'deterministisk requires_quote-guard i recommend.js (variabelandel > 0) — visar inga siffror'],
]);

export function isAudited(category) {
  return REVIDERADE_KATEGORIER.has(category);
}

/**
 * Ärligt offert-svar för en oreviderad kategori. Innehåller AVSIKTLIGT inga
 * siffror — copyn är talfri per konstruktion så att den aldrig kan ljuga.
 *
 * @param {string} category     - kategorinyckel
 * @param {string} categoryLabel - svensk etikett (för copyn)
 */
export function ungatedQuoteResponse(category, categoryLabel) {
  return {
    shouldSwitch:        false,
    requiresQuote:       true,
    recommendationType:  'requires_quote',
    reasoning:
      `Arvo har ännu inte verifierade prisdata för ${categoryLabel ?? 'denna kategori'} i er profil. ` +
      `Vi gör en manuell genomgång istället för att visa en siffra vi inte kan stå för — ` +
      `starta offertprocessen så jämför vi mot faktiska leverantörsofferter.`,
    revisionGate:        'unaudited',
    suggestedSupplier:   null,
    suggestedAnnualCost: null,
    grossSaving:         null,
    arvoFee:             null,
    netSaving:           null,
    confidence:          'low',
    switchSteps:         [],
    licenseOverage:      null,
    overageSavings:      null,
    optimizationSaving:  null,
    benchmark:           null,
    usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
  };
}
