// tests/formatgenitiv.mjs — SVENSK GENITIV PÅ LEVERANTÖRSNAMN, TESTLÅST.
//
// Fyndet kom ur en SKÄRMDUMP (regel 8), inte ur ett test: rätt-storlekskortets proveniensmening
// gjordes leverantörsberoende 2026-09-22 och renderade då «mot Fortnoxs publika listpris» och
// «mot Spiriss publika listpris». Båda är fel — svenska namn på s/x/z tar ingen genitivändelse —
// och båda hade passerat varje maskinvakt vi har, eftersom de är korrekt interpolerade strängar.
//
// FÅNGAR: en böjning som lägger `s` på ett namn som redan slutar på s, x eller z, och en tom
//   indata som skulle ge ett ensamt `s` i kundtexten.
// BLIND: modulen kan inte veta om ett namn är ett EGENNAMN. «Arvos» är rätt, «Arvo Flows» är
//   rätt, men en förkortning som uttalas bokstav för bokstav (SEB → «SEB:s») böjs med kolon och
//   det hanteras INTE här. Det är uttalat i stället för gissat: dyker en sådan leverantör upp i
//   prisboken är rätt drag att utöka modulen, aldrig att skriva böjningen i en yta.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { genitiv, krPerAr } from '../src/utils/format.js';
import { strippaStrangar } from '../lib/kalltextlexer.js';

describe('GEN · genitiv på leverantörsnamn', () => {
  test('GEN-01 · namn på s, x eller z får INGEN ändelse', () => {
    // De två som faktiskt finns i motorn i dag — felet stod renderat i skärmdumpen.
    assert.equal(genitiv('Fortnox'), 'Fortnox');
    assert.equal(genitiv('Spiris'), 'Spiris');
    for (const n of ['Telefonix', 'Sanoz', 'Mats']) assert.equal(genitiv(n), n);
  });

  test('GEN-02 · MOTPROVET: övriga namn får sitt s, annars vaktar GEN-01 ingenting', () => {
    assert.equal(genitiv('Visma'), 'Vismas');
    assert.equal(genitiv('Telia'), 'Telias');
    assert.equal(genitiv('Microsoft'), 'Microsofts');
  });

  test('GEN-03 · tomhet ger tomhet, aldrig ett ensamt «s» i kundtexten', () => {
    for (const v of [null, undefined, '', '   ']) assert.equal(genitiv(v), '');
    assert.equal(genitiv('  Visma  '), 'Vismas', 'blanksteg ska inte gömma namnet');
  });
});

// ── FÖ · ENHETEN SÄTTS AV FUNKTIONEN, ALDRIG AV ANROPAREN ────────────────────────────────────
// Mätt i DOM:en 2026-09-22: «220 kr/mån = 2 640 kr kr/år». `formatKr` lägger själv på « kr», och
// tolv ställen i TestaFaktura skrev ändå `{formatKr(x)} kr/år`. Varje besparingssiffra i
// huvudfunneln bar alltså en dubblerad enhet.
describe('FÖ · kr/år', () => {
  test('FÖ-01 · krPerAr sätter enheten EN gång', () => {
    // sv-SE grupperar med hårt blanksteg (U+00A0) — skrivet ut, inte dolt i ett .replace().
    assert.equal(krPerAr(2640), '2\u00a0640 kr/år');
    assert.equal(krPerAr(2640).match(/kr/g).length, 1, 'enheten får stå exakt en gång');
  });

  test('FÖ-02 · ingen yta lägger på « kr» efter formatKr', () => {
    const filer = [];
    (function svep(dir) {
      for (const namn of readdirSync(dir)) {
        if (namn === 'node_modules') continue;
        const p = join(dir, namn);
        if (statSync(p).isDirectory()) svep(p);
        else if (/\.(js|jsx)$/.test(namn)) filer.push(p);
      }
    })(new URL('../src', import.meta.url).pathname);
    // Grön av tomhet är felfamiljen — svepet måste hitta ett träd.
    assert.ok(filer.length > 20, `svepet hittade bara ${filer.length} filer`);
    // `strippaStrangar` först — annars fäller svepet den här regelns EGEN dokumentation i
    // src/utils/format.js, vilket det gjorde på första körningen. Fjärde gången samma fälla
    // (RD-08, PV-17, SF-03, nu FÖ-02): en källtextvakt måste skilja kod från prosa.
    const brott = filer.filter((f) =>
      /\{formatKr\([^}]*\)\}\s*kr/.test(strippaStrangar(readFileSync(f, 'utf8'))));
    assert.deepEqual(brott, [], 'dubblerad enhet: formatKr lägger redan på « kr»');
  });
});
