// tests/cacheversion.mjs — CV-01/CV-02: cachen får aldrig servera ett svar från en äldre pipeline.
//
// ══ VARFÖR (2026-09-05) ═════════════════════════════════════════════════════════════════════
//
// Regel 7 säger: «bumpa cache-versioner vid varje pipelineändring som påverkar resultat». Den
// regeln har levt i MINNET i tre månader, och den 5 september höll jag på att glömma den.
//
// Leasing-fixen i `lib/forensics.js` gör att en faktura med raden «Leasing … (Månad 48 av 36)»
// får ett fynd på 29 400 kr som den inte fick förut. Utan en bumpad cache hade grundaren laddat
// upp samma PDF, fått det GAMLA cachade svaret utan fyndet, och dragit slutsatsen att fixen inte
// fungerade. En korrekt fix osynliggjord av en cache är omöjlig att skilja från en trasig fix.
//
// FÅNGAR: att `pdf:result`-versionen står kvar på ett tal som föregår en känd resultatändring.
// BLIND: vakten kan inte veta om en FRAMTIDA pipelineändring bumpats — den låser bara de
//   kopplingar som redan är kända. Varje ny resultatändring måste lägga sitt eget par här, och
//   det är med flit: en vakt som försöker gissa framtiden blir antingen tyst eller falsklarmande.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
const FORENSIK = readFileSync(join(ROT, 'lib/forensics.js'), 'utf8');

/** Versionen ur den enda cacheKey-raden — aldrig ur en kommentar. */
function cacheVersion() {
  const m = API.match(/const cacheKey = `pdf:result:v(\d+):/);
  assert.ok(m, 'cacheKey-raden hittades inte — bytte den form?');
  return Number(m[1]);
}

describe('CV · Cachen får aldrig servera ett svar från en äldre pipeline', () => {
  test('CV-01 · leasing-fixen och cache-versionen hänger ihop', () => {
    // Kopplingen är hela poängen: finns fixen i forensiken MÅSTE cachen ha bumpats förbi den
    // version som gällde före den. Annars serveras det gamla, tomma svaret för varje faktura
    // med en leasingrad — och 29 400 kr förblir osynliga trots att koden ser dem.
    const harLeasingFix = /AMORT_OVERPAID_RE\s*=/.test(FORENSIK) && /\|leasing\|/.test(FORENSIK);
    if (!harLeasingFix) return;                 // fixen borttagen → FO-01 äger det fallet
    assert.ok(cacheVersion() >= 15,
      `leasing-fixen finns men pdf:result står på v${cacheVersion()} — cachen serverar då `
      + 'gamla svar utan fyndet, och fixen ser ut att ha misslyckats');
  });

  test('CV-03 · riktningskravet och cache-versionen hänger ihop', () => {
    // Samma koppling, ny resultatändring (2026-09-05, Atea-kortet): finns den kodskrivna
    // inte-gap-texten i recommend.js MÅSTE cachen ha bumpats förbi v15. Annars läser en kund som
    // laddar upp samma PDF igen kvar den falska meningen «Microsofts listpris är lägre» ur cachen,
    // och rättningen ser ut att ha misslyckats — exakt CV-01:s sjukdom, en version senare.
    const REC = readFileSync(join(ROT, 'agents/recommender/recommend.js'), 'utf8');
    const harRiktningskrav = /function buildInteGapReasoning/.test(REC) && /export function lflPrisgap/.test(REC);
    if (!harRiktningskrav) return;              // rättningen borttagen → RK-02 äger det fallet
    assert.ok(cacheVersion() >= 16,
      `riktningskravet finns men pdf:result står på v${cacheVersion()} — cachen serverar då den `
      + 'gamla, falska prosan för varje redan analyserad faktura');
  });

  test('CV-02 · det finns EXAKT en cacheKey — ingen kopia som kan glida isär', () => {
    // Två cache-nycklar är två sanningar, och den som bumpas är inte nödvändigtvis den som läses.
    const traffar = [...API.matchAll(/pdf:result:v\d+/g)].map((m) => m[0]);
    const unika = [...new Set(traffar)];
    assert.equal(unika.length, 1, `flera versioner i samma fil: ${unika.join(', ')}`);
  });
});
