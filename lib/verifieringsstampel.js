// lib/verifieringsstampel.js — får en grön verifierare stämpla om `lastVerified`, och för vilka nycklar?
//
// VARFÖR (2026-08-21). Price-audit larmade i varje körning under hela obduktionen:
//
//     [INAKTUELLT] Tier 'google-starter' verifierat 2026-06-17 (65d, gräns 60d)
//
// Jag såg raden tolv gånger och behandlade den som bakgrundsbrus. Det var fel av mig — men
// larmet hade också rätt att gå av, och det är det som är felet: **`lastVerified` uppdateras
// bara när ett pris ÄNDRAS.** `scripts/apply-price-proposals.mjs` stämplar dagens datum när ett
// förslag appliceras; bekräftar verifieraren att priset är OFÖRÄNDRAT händer ingenting.
//
// Följden: varje STABILT pris larmar efter 60 dagar, för alltid, hur många gånger vakten än
// bekräftat det. Ett larm som går av på rätt beteende. Fältet hette `lastVerified` men bar
// «senast ÄNDRAT» — samma familj som «25 LÄSTA» (12 augusti): ett fält vars NAMN lovar mer än
// värdet, och en yta som läser namnet.
//
// Och det är exakt mekanismen bakom den dyraste incidenten i den här kodbasen: smyghöjningsvakten
// stängdes av 20 juli för att den skrek på fel saker, och under de 16 dygn som följde höjde
// Microsoft och Tele2 sina priser utan att någon såg det. Workflowens egen rubrik säger det:
// «ett larm som skriker på fel saker blir avstängt, och en avstängd vakt är värre än ingen».
// Att låta larmet fortsätta gå av på ett stabilt pris är att gödsla för nästa avstängning.
//
// FÅNGAR: att ett datum stämplas av en verifierare som inte läste något (noll checkar), som
//   drivit, som väntar på en credential, eller som stämplar en nyckel den inte deklarerat sig
//   bevaka. Alla fyra hade gjort «verifierat» till ett tomt ord.
// BLIND: modulen avgör OM stämpeln får sättas, aldrig om verifieraren läste RÄTT tal. Att en
//   check jämför mot rätt produkt är verifierarens eget ansvar (bevakadeTiers + price-audit).
//   Den vet heller ingenting om en källa som svarar med en cachad sida — ett oförändrat svar
//   från en död sida ser likadant ut som ett bekräftat pris.

import { bedomVerifierarutfall, UTFALL } from './verifierarutfall.js';

/**
 * @param {{ verifierare: {id?: string, bevakadeTiers?: string[]}, resultat: object, idag: string }} p
 * @returns {{ stampla: boolean, nycklar: string[], skal: string }}
 */
export function stampelbeslut({ verifierare, resultat, idag } = {}) {
  const dom = bedomVerifierarutfall(resultat);
  if (dom.utfall !== UTFALL.GRON) {
    return { stampla: false, nycklar: [], skal: `utfallet är ${dom.utfall} — bara en grön verifierare stämplar` };
  }
  const checks = Array.isArray(resultat?.checks) ? resultat.checks : [];
  if (checks.length === 0) {
    // Kan inte nås via GRON i dag (noll checkar ger ROTT), men spärren står kvar: en vakt som
    // inte läste något har inte verifierat något, oavsett hur domen råkar formuleras i framtiden.
    return { stampla: false, nycklar: [], skal: 'noll checkar — en vakt som inte läste något har inte verifierat något' };
  }
  // BACKSTOP, inte ett lager: bedomVerifierarutfall fäller redan drift som ROTT och når hit
  // aldrig i dag (VS-03 bevisar att drift ger `stampla: false` — men via domen, inte via den här
  // raden). Den står kvar för det fall domen ändras, och är märkt så att nästa läsare inte tror
  // att den är det som håller.
  if (checks.some((c) => c?.ok === false)) {
    return { stampla: false, nycklar: [], skal: 'minst en check visar drift — då ska priset rättas, inte datumet flyttas' };
  }
  const nycklar = Array.isArray(verifierare?.bevakadeTiers) ? verifierare.bevakadeTiers.filter(Boolean) : [];
  if (nycklar.length === 0) {
    // Kategorivakter (tom bevakadeTiers) är ett giltigt SVAR, inte ett fel — de har bara inga
    // licensnivåer att stämpla. Deras färskhet mäts på leverantörsnivån av price-audit.
    return { stampla: false, nycklar: [], skal: 'verifieraren deklarerar inga bevakade nivåer' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(idag ?? ''))) {
    return { stampla: false, nycklar: [], skal: 'inget giltigt datum att stämpla med' };
  }
  return { stampla: true, nycklar, skal: `${checks.length} tal bekräftade mot källan` };
}

/**
 * Skriver om `lastVerified` för de angivna nycklarna i branchindex-källan. Ren strängoperation
 * på EXAKT den nyckelns block — aldrig en global sökning som kan träffa en granne.
 * @returns {{ kalla: string, andrade: string[], oforandrade: string[] }}
 */
export function stamplaKalla(kalla, nycklar, idag) {
  let ut = kalla;
  const andrade = [];
  const oforandrade = [];
  for (const nyckel of nycklar) {
    // Blocket är från nyckeln till dess avslutande klammer. `[^{}]*` hindrar att matchningen
    // svälner in i nästa nivå — en global replace på lastVerified hade stämplat hela prisboken.
    const re = new RegExp(`('${nyckel}':\\s*\\{[^{}]*?lastVerified:\\s*')([^']+)(')`, 's');
    const m = ut.match(re);
    if (!m) { oforandrade.push(nyckel); continue; }
    if (m[2] === idag) { oforandrade.push(nyckel); continue; }
    ut = ut.replace(re, `$1${idag}$3`);
    andrade.push(nyckel);
  }
  return { kalla: ut, andrade, oforandrade };
}
