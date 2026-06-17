// tests/spiris.mjs — låser Spiris (tidigare Visma eEkonomi) verifierade listprisankare.
// Verifierat live 2026-06-17 mot spiris.se/priser. Driftvakten (verify.mjs spiris) larmar vid drift.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

describe('Spiris — verifierade listpriser låsta i prisboken (saas-finance, andra benet)', () => {
  const sv = BRANCHINDEX['saas-finance']?.spirisVerified;

  test('spirisVerified-blocket finns med källa + datum + url + rebrand-not', () => {
    assert.ok(sv, 'spirisVerified saknas');
    assert.equal(sv.source, 'spiris-prislista');
    assert.match(sv.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(sv.url, /spiris\.se\/priser/);
    assert.equal(sv.formerlyKnownAs, 'Visma eEkonomi');
  });

  test('abonnemangsnivåerna bär de live-verifierade priserna (kr/mån exkl moms)', () => {
    assert.equal(sv.niva.Starta, 199);
    assert.equal(sv.niva.Driva, 349);
    assert.equal(sv.niva.Skala, 549);
    assert.equal(sv.niva['Växa'], 749);
    assert.equal(sv.niva.Lyfta, 1249);
  });

  test('kärnmodulen Lön till anställda 299 kr', () => {
    assert.equal(sv.moduler['Lön till anställda'], 299);
  });

  test('nivåerna strikt stigande Starta < Driva < Skala < Växa < Lyfta', () => {
    const v = sv.niva;
    assert.ok(v.Starta < v.Driva);
    assert.ok(v.Driva < v.Skala);
    assert.ok(v.Skala < v['Växa']);
    assert.ok(v['Växa'] < v.Lyfta);
  });
});
