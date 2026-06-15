// tests/shelfware.mjs — låser shelfware-modellen som RÅDGIVANDE REVISOR (lib/shelfware.js).
// Gapet seatCount−employees är ett FAKTUM, inte garanterat svinn. Ingen besparing räknas
// förrän kunden bekräftat hur överskottet används (knownExceptions). Vinsten räknas alltid
// på kundens EGNA pris/plats (ur fakturan), aldrig en extern benchmark. Kör via tests/run.mjs.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeShelfware } from '../lib/shelfware.js';

describe('SH · Shelfware — review-läge (undantag ej redovisade)', () => {
  test('120 licenser, 100 anställda, inga exceptions → revisorsfråga, INGEN besparing', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100 });
    assert.notStrictEqual(r, null);
    assert.strictEqual(r.needsReview, true);
    assert.strictEqual(r.unverifiedGap, 20);
    assert.strictEqual(r.confirmedIdle, 0);
    assert.strictEqual(r.annualWaste, null, 'ingen siffra utan källa i review-läge');
    assert.strictEqual(r.potentialAnnualWaste, Math.round(20 * 119.48 * 12)); // tak: 28 675
    assert.strictEqual(r.knownExceptions, null);
    assert.strictEqual(r.tierMismatch, null, 'tier-mismatch är en hook, null tills per-tier-data finns');
  });

  test('reviewPrompt bär de verkliga talen och frågar (inte anklagar)', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100 });
    assert.match(r.reviewPrompt, /100 anställda/);
    assert.match(r.reviewPrompt, /120 licenser/);
    assert.match(r.reviewPrompt, /20 licenser/);
    assert.match(r.reviewPrompt, /mötesrum/);
    assert.match(r.reviewPrompt, /\?$/, 'det är en fråga, inte ett påstående');
  });

  test('review-läge undertrycks om HELA gapet ändå understiger golvet (ingen friktion)', () => {
    // 1 plats gap × 30 kr/mån × 12 = 360 < 500 → inte värt att ens fråga
    assert.strictEqual(computeShelfware({ seatCount: 101, pricePerSeatMonthly: 30, employees: 100 }), null);
  });
});

describe('SH · Shelfware — bekräftat läge (undantag redovisade)', () => {
  test('20 gap − 8 redovisade (mötesrum/konsulter) → 12 bekräftat svinn på EGET pris', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 8 });
    assert.strictEqual(r.needsReview, false);
    assert.strictEqual(r.unverifiedGap, 20);
    assert.strictEqual(r.knownExceptions, 8);
    assert.strictEqual(r.confirmedIdle, 12);
    assert.strictEqual(r.annualWaste, Math.round(12 * 119.48 * 12)); // 17 205
    assert.strictEqual(r.annualWaste, 17205);
    assert.strictEqual(r.reviewPrompt, null);
  });

  test('vinsten räknas på kundens EGNA pris, inte en benchmark', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 250, employees: 100, knownExceptions: 8 });
    assert.strictEqual(r.annualWaste, Math.round(12 * 250 * 12)); // 36 000
  });

  test('alla gap-platser förklarade (exceptions = gap) → inget svinn → null', () => {
    assert.strictEqual(computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 20 }), null);
  });

  test('exceptions kan aldrig överstiga gapet (clamp)', () => {
    // knownExceptions=50 > gap=20 → exceptions klamras till 20 → confirmedIdle 0 → null
    assert.strictEqual(computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 50 }), null);
  });

  test('exceptions = 0 (kunden säger uttryckligen "inga undantag") → hela gapet är svinn', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 0 });
    assert.strictEqual(r.needsReview, false);
    assert.strictEqual(r.confirmedIdle, 20);
    assert.strictEqual(r.annualWaste, Math.round(20 * 119.48 * 12)); // 28 675
  });

  test('bekräftat svinn under golvet → null', () => {
    // 1 bekräftat idle × 30 × 12 = 360 < 500
    const r = computeShelfware({ seatCount: 102, pricePerSeatMonthly: 30, employees: 100, knownExceptions: 1 });
    assert.strictEqual(r, null);
  });

  test('noten bär hela uträkningen (ingen siffra utan källa)', () => {
    const r = computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 8 });
    assert.match(r.note, /12 bekräftat oanvända platser/);
    assert.match(r.note, /20 över anställda − 8 redovisade undantag/);
    assert.match(r.note, /119\.48 kr\/plats\/mån/);
    assert.match(r.note, /17205 kr\/år/);
  });
});

describe('SH · Shelfware — gränsfall & validering', () => {
  test('seatCount = employees → inget gap → null', () => {
    assert.strictEqual(computeShelfware({ seatCount: 100, pricePerSeatMonthly: 119.48, employees: 100 }), null);
  });

  test('seatCount < employees → gap = 0 → null (aldrig negativ)', () => {
    assert.strictEqual(computeShelfware({ seatCount: 80, pricePerSeatMonthly: 119.48, employees: 100 }), null);
  });

  test('saknad data → null (seatCount, pris eller employees)', () => {
    assert.strictEqual(computeShelfware({ seatCount: null, pricePerSeatMonthly: 119.48, employees: 100 }), null);
    assert.strictEqual(computeShelfware({ seatCount: 120, pricePerSeatMonthly: null, employees: 100 }), null);
    assert.strictEqual(computeShelfware({ seatCount: 120, pricePerSeatMonthly: 119.48, employees: null }), null);
  });

  test('icke-positiva tal avvisas (noll/negativa platser eller pris)', () => {
    assert.strictEqual(computeShelfware({ seatCount: 0, pricePerSeatMonthly: 119.48, employees: 0 }), null);
    assert.strictEqual(computeShelfware({ seatCount: 120, pricePerSeatMonthly: 0, employees: 100 }), null);
    assert.strictEqual(computeShelfware({ seatCount: -5, pricePerSeatMonthly: 119.48, employees: 100 }), null);
  });

  test('employees = 0 är giltigt (enmansbolag med flera platser) → review-läge', () => {
    const r = computeShelfware({ seatCount: 6, pricePerSeatMonthly: 119.48, employees: 0 });
    assert.notStrictEqual(r, null);
    assert.strictEqual(r.unverifiedGap, 6);
    assert.strictEqual(r.needsReview, true);
  });
});
