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
import { genitiv } from '../src/utils/format.js';

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
