// tests/fee.mjs — lib/fee.js (EN sanning för arvodet) + lib/hardware-installments.js
// (hårdvarujusteringen, flyttad från frontend).
//
// Kärnlåset: avrundningskonventionen fee = round(gross×0,20), net = gross − fee är
// EXAKT lika med den historiska round(gross×0,80) för alla heltalsbelopp — så att
// centraliseringen bevisligen inte ändrade ett enda kundtal (korpusdiff låser samma
// sak på pipelinenivå).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { ARVO_FEE_RATE, feeOf, netOf } from '../lib/fee.js';
import { detectHardwareInstallments, computeHardwareAdjustment } from '../lib/hardware-installments.js';

describe('Fee · EN sanning för arvodet', () => {
  test('ARVO_FEE_RATE är 20 % (bibelns affärsmodell)', () => {
    assert.equal(ARVO_FEE_RATE, 0.20);
  });

  test('identiteten net = gross − fee håller alltid', () => {
    for (const g of [1, 3, 7, 500, 4321, 85_440, 119_643, 1_000_000]) {
      assert.equal(netOf(g), g - feeOf(g), `gross=${g}`);
    }
  });

  test('konventionen är exakt lika med historiska round(gross × 0,80) för heltal', () => {
    for (let g = 0; g <= 10_000; g++) {
      assert.equal(netOf(g), Math.round(g * 0.80), `gross=${g}`);
    }
  });

  test('icke-positiva belopp ger 0 (aldrig negativa arvoden)', () => {
    for (const g of [0, -100, null, undefined, NaN]) {
      assert.equal(feeOf(g), 0);
      assert.equal(netOf(g), 0);
    }
  });
});

describe('Hårdvarujusteringen · detektion', () => {
  const hwLine = { description: 'Delbetalning iPhone 15 Pro — månad 7 av 24', amount: 320, type: 'hardware' };

  test('avbetalningsrad detekteras med rätt kvarvarande skuld', () => {
    const items = detectHardwareInstallments([hwLine]);
    assert.equal(items.length, 1);
    assert.equal(items[0].monthsRemaining, 17);
    assert.equal(items[0].remainingCost, 17 * 320);
  });

  test('slutbetald rad (månad 24 av 24) detekteras inte', () => {
    assert.deepEqual(detectHardwareInstallments([{ ...hwLine, description: 'Delbetalning — månad 24 av 24' }]), []);
  });

  test('abonnemangsrad utan avbetalningsmönster detekteras inte', () => {
    assert.deepEqual(detectHardwareInstallments([{ description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' }]), []);
  });
});

describe('Hårdvarujusteringen · justerade tal (speglar frontends historiska formel exakt)', () => {
  const lineItems = [
    { description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' },
    { description: 'Delbetalning iPhone 15 Pro — månad 7 av 24', amount: 320, type: 'hardware' },
  ];

  test('handräknat fall: bas, arvode, netto och break-even', () => {
    const adj = computeHardwareAdjustment({
      lineItems, annualCost: 24_780, suggestedAnnualCost: 17_940, shouldSwitch: true,
    });
    assert.equal(adj.hwAnnualCost, 3_840);                    // 320 × 12
    assert.equal(adj.hwTotalRemaining, 5_440);                // 17 × 320
    assert.equal(adj.adjAnnualCost, 20_940);                  // 24 780 − 3 840
    assert.equal(adj.adjGrossSaving, 3_000);                  // 20 940 − 17 940
    assert.equal(adj.adjArvoFee, 600);                        // feeOf(3 000)
    assert.equal(adj.adjNetSaving, 2_400);
    assert.equal(adj.breakEvenYears, 1.8);                    // 5 440 / 3 000 = 1,813… → 1,8
  });

  test('inget byte → null (justeringen är bytesspecifik)', () => {
    assert.equal(computeHardwareAdjustment({ lineItems, annualCost: 24_780, suggestedAnnualCost: 17_940, shouldSwitch: false }), null);
  });

  test('ingen hårdvara → null (ordinarie tal gäller rakt av)', () => {
    assert.equal(computeHardwareAdjustment({
      lineItems: [lineItems[0]], annualCost: 20_940, suggestedAnnualCost: 17_940, shouldSwitch: true,
    }), null);
  });

  test('noll besparing efter justering → breakEvenYears null (aldrig division med noll)', () => {
    const adj = computeHardwareAdjustment({
      lineItems, annualCost: 21_780, suggestedAnnualCost: 17_940, shouldSwitch: true,
    });
    assert.equal(adj.adjGrossSaving, 0);
    assert.equal(adj.breakEvenYears, null);
  });
});
