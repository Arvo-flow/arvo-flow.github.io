// tests/price-verdict.mjs — låser verifieringsjuryn + den oberoende extraktorn.
// GRUNDARBESLUT 2026-06-26: maskinell verifiering ersätter människan-i-loopen — men "verifierat"
// måste FÖRTJÄNAS av flera oberoende grindar. Dessa tester är juryns maskinvakt.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { priceChangeVerdict } from '../lib/price-verdict.js';
import { extractPriceTokens, pageConfirmsPrice, pageMentionsProduct } from '../lib/price-extract.js';

// ── Den oberoende extraktorn ───────────────────────────────────────────────────
describe('price-extract · oberoende vittnet', () => {
  test('hittar svenska pris-token (mellanslag, :-, decimaler, SEK)', () => {
    const t = extractPriceTokens('Obegränsad 279 kr/mån. Kampanj 1 234 kr. Bas 199:- . Pro 1 499,50 kr. X 89 SEK.');
    assert.ok(t.includes(279));
    assert.ok(t.includes(1234));
    assert.ok(t.includes(199));
    assert.ok(t.includes(1499.5));
    assert.ok(t.includes(89));
  });

  test('pageConfirmsPrice: bekräftar närvarande pris, nekar frånvarande (anti-hallucination)', () => {
    const page = 'Företagsabonnemang Obegränsad 298 kr/mån inkl moms.';
    assert.equal(pageConfirmsPrice(page, 298), true);
    assert.equal(pageConfirmsPrice(page, 298.5), true);   // öres-tolerans
    assert.equal(pageConfirmsPrice(page, 349), false);    // siffra ej på sidan → ingen konsensus
  });

  test('pageMentionsProduct: kräver meningsbärande nyckelord, ignorerar brus', () => {
    const page = 'Telia Företag Mobil Obegränsad 298 kr.';
    assert.equal(pageMentionsProduct(page, ['Obegränsad']), true);
    assert.equal(pageMentionsProduct(page, ['kr', 'ab']), false);   // brusord räknas inte
    assert.equal(pageMentionsProduct(page, []), false);
  });
});

// ── Juryn ──────────────────────────────────────────────────────────────────────
const base = {
  oldNumeric: 279, newNumeric: 298, haikuConfidence: 0.92,
  productPresent: true, pageConfirmsNew: true, priorSeen: true,
};

describe('price-verdict · alla grindar → verified', () => {
  test('komplett bevis → verified (får kallas "verifierat")', () => {
    const v = priceChangeVerdict(base);
    assert.equal(v.tier, 'verified');
    assert.ok(v.confidence >= 0.9);
  });
});

describe('price-verdict · saknad stabilitet/konsensus → provisional (bara prognos)', () => {
  test('ej sedd över 2 körningar → provisional', () => {
    assert.equal(priceChangeVerdict({ ...base, priorSeen: false }).tier, 'provisional');
  });
  test('sidan bekräftar inte siffran (möjlig hallucination) → provisional, ALDRIG verified', () => {
    assert.equal(priceChangeVerdict({ ...base, pageConfirmsNew: false }).tier, 'provisional');
  });
  test('låg AI-konfidens → provisional', () => {
    assert.equal(priceChangeVerdict({ ...base, haikuConfidence: 0.6 }).tier, 'provisional');
  });
});

describe('price-verdict · hårda integritetsfel → rejected (tystnad)', () => {
  test('fel produkt (ej på sidan) → rejected', () => {
    assert.equal(priceChangeVerdict({ ...base, productPresent: false }).tier, 'rejected');
  });
  test('orimlig magnitud (+400 %) → rejected (artefakt)', () => {
    assert.equal(priceChangeVerdict({ ...base, newNumeric: 1400 }).tier, 'rejected');
  });
  test('brus-ändring (<0,5 %) → rejected', () => {
    assert.equal(priceChangeVerdict({ ...base, newNumeric: 279.5 }).tier, 'rejected');
  });
  test('nytt pris utanför kategoriband → rejected', () => {
    assert.equal(priceChangeVerdict({ ...base, categoryBand: { min: 100, max: 250 } }).tier, 'rejected');
  });
  test('ogiltigt gammalt pris → rejected', () => {
    assert.equal(priceChangeVerdict({ ...base, oldNumeric: 0 }).tier, 'rejected');
  });
});

describe('price-verdict · asymmetri-tröskeln är medveten', () => {
  test('korroboration höjer konfidensen men krävs inte för verified', () => {
    const withC = priceChangeVerdict({ ...base, corroborated: true });
    const without = priceChangeVerdict(base);
    assert.equal(withC.tier, 'verified');
    assert.ok(withC.confidence >= without.confidence);
  });
});
