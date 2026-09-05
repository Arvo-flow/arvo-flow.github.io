// src/utils/grindpaus.js — SPEGEL av lib/grindpaus.js.
//
// Frontend-bygget (CRA) kan inte importera utanför src/, så den här filen finns av samma skäl
// som src/utils/format.js speglar lib/format.js. Två filer är två sanningar som kan glida isär —
// därför läser GP-05 i tests/grindpaus.mjs BÅDA filernas källtext och underkänner sviten om
// tidsstämplarna inte är identiska tecken för tecken.
//
// Ändra ALDRIG den här filen ensam. Fönstret bor i lib/grindpaus.js; det här är avskriften.

export const GRIND_PAUS = {
  fran: '2026-09-05T18:00:00Z',
  till: '2026-09-06T18:00:00Z',
  skal: 'grundarbeslut 2026-09-05 — fullskaligt test av hela analysflödet',
};

export function grindPausad(nu = Date.now()) {
  const fran = Date.parse(GRIND_PAUS.fran);
  const till = Date.parse(GRIND_PAUS.till);
  if (!Number.isFinite(fran) || !Number.isFinite(till)) return false;
  return nu >= fran && nu < till;
}
