// tests/molnvaxel-recommendation.mjs — DEDIKERAD svit för molnväxel (Vallgrav-kategorin).
// Låser den deterministiska växel-rekommendationen: kundens faktiska per-användare-kostnad (normaliserad,
// exkl moms) mot Telias VERIFIERADE instegsgolv (Smart Connect, exkl moms bekräftat) + exakta add-on-
// priser. Ingen FX, ingen hård besparing från ett "från"-pris. Detta är beviset revisionsgrinden kräver.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const inv = (lineItems, seatCount) => ({
  customer:    { industry: 'konsult', employees: seatCount ?? 10 },
  categorized: { category: 'molnvaxel', subType: 'växel', normalizedSupplier: 'Telia', confidence: 0.95 },
  invoice:     { lineItems, seatCount, billingPeriod: 'monthly' },
});
const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Molnväxel · prisboken (Telia-ankare, exkl moms bekräftat)', () => {
  test('teliaVerified bär instegsgolv T1 89 / T2 118 + add-ons, exkl moms', () => {
    const tv = BRANCHINDEX.molnvaxel.teliaVerified;
    assert.equal(tv.vatBasis, 'exkl');
    assert.equal(tv.tiers.T1.fromMonthly, 89);
    assert.equal(tv.tiers.T2.fromMonthly, 118);
    assert.equal(tv.addons.funktionsnummer, 99);
    assert.equal(tv.addons.softphone, 29);
    assert.equal(tv.addons.extraNummer, 39);
  });
});

describe('Molnväxel · recommend() — deterministisk, Zero Trust (ingen AI, ingen FX)', () => {
  test('T2-växel (köhantering) → per-user exkl + Telia-golv 118, ingen hård besparing', async () => {
    const r = await recommend(inv([line('Telia Smart Connect växel med köhantering', 3000, 20)], 20));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.revisionGate, 'audited');
    assert.ok(r.molnvaxel, 'molnvaxel-data ska finnas');
    assert.equal(r.molnvaxel.tier, 'T2');
    assert.equal(r.molnvaxel.seats, 20);
    assert.equal(r.molnvaxel.perUserMonthlyExVat, 150);   // 3000/20
    assert.equal(r.molnvaxel.teliaFloor, 118);
    // Zero Trust: ingen påhittad besparing från ett från-pris.
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.optimizationSaving, null);
    assert.match(r.reasoning, /150,00 kr\/användare/);
    assert.match(r.reasoning, /från 118 kr/);
  });

  test('T1 + funktionsnummer-tillägg → golv 89 + add-on-rätt-storlek (99 kr, verifierat)', async () => {
    const r = await recommend(inv([
      line('Mobil växel samtalsstyrning', 1800, 15),
      line('Funktionsnummer företaget', 99, 1),
    ], 15));
    assert.equal(r.molnvaxel.tier, 'T1');
    assert.equal(r.molnvaxel.teliaFloor, 89);
    assert.ok(r.molnvaxel.addons.some((a) => a.addon === 'funktionsnummer' && a.monthlyExVat === 99));
    assert.match(r.reasoning, /funktionsnummer \(99 kr\/mån\)/);
    assert.equal(r.grossSaving, null);
  });

  test('T3 kontaktcenter (inspelning/statistik) → offert-läge (inget fast golv)', async () => {
    const r = await recommend(inv([line('Kontaktcenter med samtalsinspelning och statistik', 6000, 20)], 20));
    assert.equal(r.molnvaxel.tier, 'T3');
    assert.equal(r.molnvaxel.teliaFloor, null);
    assert.equal(r.requiresQuote, true);
    assert.equal(r.benchmark, null);
    assert.equal(r.suggestedAnnualCost, null);
  });

  test('ej normaliserbar (saknar säten) → talfritt offert-läge, ingen siffra', async () => {
    const r = await recommend(inv([line('Växeltjänst', 5000)], null));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.molnvaxel, null);
    assert.equal(r.suggestedAnnualCost, null);
    assert.ok(!/\d[\d\s.,]*\s*kr/i.test(r.reasoning), 'offert-copy ska vara talfri om pengabelopp');
  });
});
