// lib/enhetsfras.js — ENHETEN FÖR ETT PER-ENHETSTAL I EN KUNDYTA (flyttad ur api/invoice-history 2026-09-24).
//
// Enhetsfras per kategori — BRANCHINDEX-medianen är PER ENHET (per användare/år, per
// abonnemang/år), aldrig en totalsumma. unit-fältet ('kr/år') ljuger; noten bär sanningen.
// Därför en explicit allowlist: en kategori utan känd enhetsfras får ALDRIG bli ett ankare
// (då skulle vi riskera att märka ett per-enhet-tal som vore det en totalsumma — enhetsfelet
// som enhetskarantänen finns för att stoppa). Bandet visas, kundjämförelse görs ALDRIG här
// (den bor i innehavskortet, byggt ur kundens egen verifierade analys).
export const BRANCH_ANCHOR_UNIT = {
  'saas-productivity': { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  'saas-creative':     { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  'saas-crm':          { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
  mobil:               { label: 'per abonnemang/år', noun: 'abonnemang', nounPl: 'abonnemang' },
  bredband:            { label: 'per anslutning/år', noun: 'anslutning', nounPl: 'anslutningar' },
  // loneadmin saknades här till 2026-08-19 — kategorin är real-public med ett verifierat golv
  // (Fortnox Lön, härlett ur avgiftsstrukturen), men utan en enhet i listan skippar
  // buildBranchAnchors den och rummet kunde aldrig visa golvet. Enheten är INTE gissad: prisboken
  // säger "Per anställd/år" i klartext, och härledningen räknar per anställd. Allowlistan finns
  // för att vi aldrig ska gissa enheten — inte för att tiga om en vi känner.
  loneadmin:           { label: 'per anställd/år',   noun: 'anställd',   nounPl: 'anställda' },
};
