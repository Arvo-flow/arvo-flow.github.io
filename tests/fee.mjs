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
    const items = detectHardwareInstallments([hwLine], { perioderPerAr: 12 });
    assert.equal(items.length, 1);
    assert.equal(items[0].monthsRemaining, 17);
    assert.equal(items[0].remainingCost, 17 * 320);
  });

  test('slutbetald rad (månad 24 av 24) detekteras inte', () => {
    assert.deepEqual(detectHardwareInstallments([{ ...hwLine, description: 'Delbetalning — månad 24 av 24' }], { perioderPerAr: 12 }), []);
  });

  test('abonnemangsrad utan avbetalningsmönster detekteras inte', () => {
    assert.deepEqual(detectHardwareInstallments([{ description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' }], { perioderPerAr: 12 }), []);
  });
});

describe('Hårdvarujusteringen · justerade tal', () => {
  // Produktionens tal: extraktionen typar avbetalningen `hardware`, så `annualCost` bär bara abonnemanget
  // (1 745 × 12 = 20 940) och `projectedRecurringAmount` är 1 745. Här stod förut annualCost 24 780, alltså
  // ett tal där avbetalningen ingick, som produktionen aldrig ger för en `hardware`-rad (X-1).
  const lineItems = [
    { description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' },
    { description: 'Delbetalning iPhone 15 Pro — månad 7 av 24', amount: 320, type: 'hardware' },
  ];
  const bas = { lineItems, annualCost: 20_940, projectedRecurringAmount: 1_745, suggestedAnnualCost: 17_940 };

  test('handräknat fall: bas, arvode, netto och break-even', () => {
    const adj = computeHardwareAdjustment({ ...bas, shouldSwitch: true });
    assert.equal(adj.hwAnnualCost, 3_840);                    // 320 × 12
    assert.equal(adj.hwTotalRemaining, 5_440);                // 17 × 320
    assert.equal(adj.adjAnnualCost, 20_940);                  // avbetalningen ingick aldrig i årskostnaden
    assert.equal(adj.adjGrossSaving, 3_000);                  // 20 940 − 17 940
    assert.equal(adj.adjArvoFee, 600);                        // feeOf(3 000)
    assert.equal(adj.adjNetSaving, 2_400);
    assert.equal(adj.breakEvenYears, 1.8);                    // 5 440 / 3 000 = 1,813… → 1,8
  });

  test('inget byte → null (justeringen är bytesspecifik)', () => {
    assert.equal(computeHardwareAdjustment({ ...bas, shouldSwitch: false }), null);
  });

  test('ingen hårdvara → null (ordinarie tal gäller rakt av)', () => {
    assert.equal(computeHardwareAdjustment({ ...bas, lineItems: [lineItems[0]], shouldSwitch: true }), null);
  });

  test('noll besparing efter justering → breakEvenYears null (aldrig division med noll)', () => {
    const adj = computeHardwareAdjustment({ ...bas, suggestedAnnualCost: 21_000, shouldSwitch: true });
    assert.equal(adj.adjGrossSaving, 0);
    assert.equal(adj.breakEvenYears, null);
  });
});

describe('Hårdvarujusteringen · bara det årskostnaden bar, i fakturans period (X-1)', () => {
  test('HJ-01 · en avbetalning typad hardware dras inte av: «Ni betalar idag» är abonnemangen', () => {
    // Den tolfte blickens fall (lins12/g2): bredband 699 + mobil 269 + delbetalning 100 kr (hardware), per månad.
    const adj = computeHardwareAdjustment({
      lineItems: [
        { description: 'Företagsbredband Fiber 1000/1000', amount: 699, type: 'recurring_subscription' },
        { description: 'Mobilabonnemang Jobbmobil (1 st)', amount: 269, type: 'recurring_subscription' },
        { description: 'Delbetalning iPhone 15, månad 12 av 36', amount: 100, type: 'hardware' },
      ],
      annualCost: 11_616, projectedRecurringAmount: 968, suggestedAnnualCost: 9_000, shouldSwitch: true,
    });
    assert.equal(adj.adjAnnualCost, 11_616, 'på grenen före lagningen 10 416: avbetalningen drogs från ett tal som aldrig bar den');
    assert.equal(adj.hwAnnualCost, 1_200);
    assert.equal(adj.adjGrossSaving, 2_616);
    assert.equal(adj.skuldenIArskostnaden, false);
  });

  test('HJ-02 · en avbetalning typad som abonnemang ingår i årskostnaden och dras av', () => {
    const adj = computeHardwareAdjustment({
      lineItems: [
        { description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' },
        { description: 'Delbetalning iPhone 15 Pro — månad 7 av 24', amount: 320, type: 'recurring_subscription' },
      ],
      annualCost: 24_780, projectedRecurringAmount: 2_065, suggestedAnnualCost: 17_940, shouldSwitch: true,
    });
    assert.equal(adj.adjAnnualCost, 20_940);                  // 24 780 − 320 × 12
    assert.equal(adj.adjGrossSaving, 3_000);
    assert.equal(adj.skuldenIArskostnaden, true);
  });

  test('HJ-03 · kvartalsfaktura: radbeloppet bär tre månader, årsbeloppet är × 4', () => {
    // Den femtonde blickens fall: 1 347 kr per kvartal (449 kr/mån), månad 10 av 36.
    const adj = computeHardwareAdjustment({
      lineItems: [
        { description: 'Jobbmobil M (5 st)', amount: 5_235, type: 'recurring_subscription' },
        { description: 'Delbetalning iPhone 15 Pro, månad 10 av 36', amount: 1_347, type: 'hardware' },
      ],
      annualCost: 20_940, projectedRecurringAmount: 5_235, suggestedAnnualCost: 17_940, shouldSwitch: true,
    });
    assert.equal(adj.hwAnnualCost, 5_388, '× 12 hade gett 16 164');
    assert.equal(adj.items[0].monthlyCost, 449);
    assert.equal(adj.items[0].remainingCost, 26 * 449);
    assert.equal(adj.adjAnnualCost, 20_940);
  });

  test('HJ-04 · blandat: bara raden som årskostnaden bar dras av, och skulden räknas inte som inräknad', () => {
    const adj = computeHardwareAdjustment({
      lineItems: [
        { description: 'Jobbmobil M (5 st)', amount: 1745, type: 'recurring_subscription' },
        { description: 'Delbetalning iPhone 15 Pro — månad 7 av 24', amount: 320, type: 'recurring_subscription' },
        { description: 'Delbetalning router, månad 3 av 24', amount: 59, type: 'hardware' },
      ],
      annualCost: 24_780, projectedRecurringAmount: 2_065, suggestedAnnualCost: 17_940, shouldSwitch: true,
    });
    assert.equal(adj.adjAnnualCost, 20_940);
    assert.equal(adj.hwAnnualCost, 3_840 + 708);
    assert.equal(adj.skuldenIArskostnaden, false);
  });

  test('HJ-05 · utan perioden finns inget månadsbelopp: ett glömt argument smäller', () => {
    assert.throws(() => detectHardwareInstallments([{ description: 'Delbetalning, månad 1 av 24', amount: 100, type: 'hardware' }]),
      /perioderPerAr krävs/);
    assert.throws(() => computeHardwareAdjustment({
      lineItems: [], annualCost: 12_000, suggestedAnnualCost: 9_000, shouldSwitch: true,
    }), /projectedRecurringAmount krävs/);
  });
});

