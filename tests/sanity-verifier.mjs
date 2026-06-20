// tests/sanity-verifier.mjs — låser att den adversariella sanity-checken litar på VERIFIERADE
// publika listpriser (Tele2-läxan) men behåller det deterministiska taket som backstop.
// Dessa vägar returnerar FÖRE Haiku-anropet → inget API behövs.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { verifySanity } from '../lib/sanity-verifier.js';

describe('Sanity · verifierat listpris hoppar över Haiku-gissningen', () => {
  test('bredband 50% mot tele2-verified → pass utan Haiku (verifierat faktum)', async () => {
    const r = await verifySanity({ category: 'bredband', annualCost: 23388, savingPct: 50, supplier: 'Tele2 Företag', benchmarkSource: 'tele2-verified' });
    assert.equal(r.pass, true);
    assert.equal(r.method, 'skip_verified');
  });
  test('real-public + live_analyses litas också på', async () => {
    assert.equal((await verifySanity({ category: 'mobil', annualCost: 50000, savingPct: 52, supplier: 'X', benchmarkSource: 'real-public' })).method, 'skip_verified');
    assert.equal((await verifySanity({ category: 'mobil', annualCost: 50000, savingPct: 52, supplier: 'X', benchmarkSource: 'live_analyses' })).method, 'skip_verified');
  });
});

describe('Sanity · det HÅRDA taket gäller ÄVEN verifierade källor (backstop mot räknefel)', () => {
  test('bredband 70% > taket 65% → fail deterministiskt trots verifierad källa', async () => {
    const r = await verifySanity({ category: 'bredband', annualCost: 23388, savingPct: 70, supplier: 'Tele2', benchmarkSource: 'tele2-verified' });
    assert.equal(r.pass, false);
    assert.equal(r.method, 'deterministic');
    assert.match(r.reason, /exceeds_max_65/);
  });
  test('negativ besparing → fail', async () => {
    assert.equal((await verifySanity({ category: 'bredband', annualCost: 1, savingPct: -5, supplier: 'X', benchmarkSource: 'tele2-verified' })).pass, false);
  });
});

describe('Sanity · estimerade benchmarks rörs inte (Haiku-vägen kvar)', () => {
  test('låg besparing (<45%) → skip_low oavsett källa', async () => {
    assert.equal((await verifySanity({ category: 'saas-crm', annualCost: 50000, savingPct: 30, supplier: 'X', benchmarkSource: 'estimated' })).method, 'skip_low');
  });
});
