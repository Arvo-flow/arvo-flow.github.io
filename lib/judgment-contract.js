// lib/judgment-contract.js — bedömningskravet (bibelns regel 4, 2026-06-21).
//
// En "grundad bedömning" (prognos/förvarning) får nå kunden ENDAST om den bär alla tre:
//   (1) GRUND      — proveniens, varför vi tror det (källbelagt)
//   (2) KONFIDENS  — en uttalad nivå, märkt som bedömning (aldrig maskerad som fakta)
//   (3) ASYMMETRI  — vad som händer om vi har fel, och varför felet är kundens vinst
//
// Det här är den maskinella definitionen — sifferrevisorns och prosakravets syskon.
// scripts/bedomningskrav.mjs kör varje registrerad bedömnings-PRODUCENT över ett batteri
// av indata och hävdar att VARJE producerad bedömning klarar `assertJudgment`. Växer med
// varje ny producent: registrera den i JUDGMENT_PRODUCERS så låses invarianten för den med.

import { priceHikeForecast } from './price-forecast.js';

export const JUDGMENT_KINDS = new Set(['price-forecast']);
const CONFIDENCE_LEVELS = new Set(['low', 'medium', 'high']);

// Är detta fynd en bedömning (kontra ren fakta)? Två signaler: explicit kind, eller
// förekomst av ett confidence-fält (en bedömning bär alltid en konfidensnivå).
export function isJudgment(finding) {
  if (!finding || typeof finding !== 'object') return false;
  return JUDGMENT_KINDS.has(finding.kind) || CONFIDENCE_LEVELS.has(finding.confidence);
}

const present = (s) => typeof s === 'string' && s.trim().length > 0;
// Når delen FAKTISKT kunden? Kräver att en igenkännbar bit av den finns i den renderade texten.
const reaches = (part, text) =>
  present(part) && String(text).includes(String(part).trim().slice(0, 24));

/**
 * @param {object} finding
 * @returns {{ ok: boolean, missing: string[] }}
 */
export function assertJudgment(finding) {
  const missing = [];
  if (!finding || typeof finding !== 'object') return { ok: false, missing: ['ej-objekt'] };
  const text = String(finding.text ?? '');

  // (1) GRUND
  if (!present(finding.basis)) missing.push('grund');
  else if (!reaches(finding.basis, text)) missing.push('grund-når-ej-texten');

  // (2) KONFIDENS — strukturerad nivå + synlig märkning i texten (aldrig maskerad som fakta)
  if (!CONFIDENCE_LEVELS.has(finding.confidence)) missing.push('konfidens');
  if (!/bedömning \(ej fakta\)|sannolikhet|m[öo]jlig/i.test(text)) missing.push('konfidensmärkning-i-texten');

  // (3) ASYMMETRI
  if (!present(finding.asymmetry)) missing.push('asymmetri');
  else if (!reaches(finding.asymmetry, text)) missing.push('asymmetri-når-ej-texten');

  return { ok: missing.length === 0, missing };
}

// ── Registret av bedömnings-producenter ───────────────────────────────────────
// Varje producent: ett namn + en funktion som returnerar batteriet av (indata → fynd)
// som bedömningskravet ska köra. Lägg till en rad när en ny bedömningsmotor föds.
const sph = (date, oldM, newM) => ({ changed_at: date, old_price_monthly: oldM, new_price_monthly: newM });

export const JUDGMENT_PRODUCERS = [
  {
    name: 'price-forecast (Maktkalendern)',
    run: () => [
      // Säsongsmönster — hög konfidens
      priceHikeForecast(
        [sph('2022-02-15', 100, 106), sph('2023-01-20', 106, 113), sph('2024-03-01', 113, 121), sph('2025-02-10', 121, 130)],
        { supplier: 'Telia' },
      ),
      // Svag/spridd — låg konfidens
      priceHikeForecast([sph('2023-02-01', 100, 105), sph('2024-08-01', 105, 110)], { supplier: 'Acme' }),
      // Medelhög
      priceHikeForecast([sph('2023-03-01', 100, 107), sph('2024-03-15', 107, 114), sph('2025-09-01', 114, 120)], { supplier: 'Tele2' }),
    ].filter(Boolean),
  },
];
