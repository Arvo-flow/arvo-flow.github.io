// tests/forensics.mjs — låser den universella forensik-passningen (mekanism-domen).
// Zero Trust: varje fynds tal kommer ur kundens egen rad. Category-agnostiskt — samma motor på
// telekom, SaaS, försäkring, allt. Detta är beviset att forensiken kan visas även där vi inte
// kan prissätta kategorin (egna rader ≠ marknadstal → revisionsgrindens tystnad gäller inte).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectForensicFindings } from '../lib/forensics.js';

const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Forensik · leverantörens egen dokumenterade höjning (smyghöjning på pränt)', () => {
  test('"prisjustering"-rad → high-fynd med årsimpact ur kundens egen rad', () => {
    const f = detectForensicFindings([line('Prisjustering enligt index', 500, 1)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'supplier_documented_hike');
    assert.equal(f[0].severity, 'high');
    assert.equal(f[0].monthly, 500);
    assert.equal(f[0].annualImpact, 6000);   // 500 × 12 — kundens egen rad, ingen marknadssiffra
    assert.equal(f[0].negotiable, true);
  });

  test('årsfaktura → periodMultiplier 1 (ingen dubblering)', () => {
    const f = detectForensicFindings([line('Ny tariff miljöavgift', 5940, 1)], { periodMultiplier: 1 });
    assert.equal(f[0].annualImpact, 5940);
  });

  test('ingen höjningsmarkör → inget fynd', () => {
    assert.equal(detectForensicFindings([line('Mobilabonnemang', 349, 10)], {}).length, 0);
  });
});

describe('Forensik · hårdvaruavbetalning förklädd till löpande tjänst', () => {
  test('"avbetalning"-rad → medium-fynd', () => {
    const f = detectForensicFindings([line('Avbetalning telefoner', 280, 5)], { periodMultiplier: 12 });
    assert.equal(f.length, 1);
    assert.equal(f[0].type, 'hardware_financing');
    assert.equal(f[0].annualImpact, 3360);   // 280 × 12
  });

  test('restvärde/hyrköp fångas också', () => {
    assert.equal(detectForensicFindings([line('Restvärde utrustning', 100)], {})[0].type, 'hardware_financing');
    assert.equal(detectForensicFindings([line('Hyrköp dator', 200)], {})[0].type, 'hardware_financing');
  });
});

describe('Forensik · rangordning (high före medium, störst årsimpact först)', () => {
  test('höjning leder över avbetalning oavsett belopp', () => {
    const f = detectForensicFindings([
      line('Avbetalning skrivare', 900, 1),       // medium, hög impact
      line('Indexuppräkning', 200, 1),            // high, lägre impact
    ], { periodMultiplier: 12 });
    assert.equal(f[0].type, 'supplier_documented_hike');  // high vinner
    assert.equal(f[1].type, 'hardware_financing');
  });

  test('tom/saknad faktura → tom lista (fail-open)', () => {
    assert.deepEqual(detectForensicFindings(null, {}), []);
    assert.deepEqual(detectForensicFindings([], {}), []);
  });
});
