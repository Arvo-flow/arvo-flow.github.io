// tests/loneadmin-recommendation.mjs — DEDIKERAD svit för löneadministration (Hög B-kategorin).
// Låser den deterministiska löne-rätt-storleken: kundens faktiska per-anställd-kostnad (normaliserad,
// exkl moms) mot Fortnox Löns VERIFIERADE publika golv (199 kr/mån + 25 kr/anställd, exkl moms). Ingen
// FX, ingen hård besparing renderad — annualSaving är gated review. Detta är beviset revisionsgrinden kräver.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { deriveLoneadminHeadcount } from '../lib/loneadmin-rightsizing.js';

const inv = (lineItems, seatCount, employees) => ({
  customer:    { industry: 'konsult', employees: employees ?? null },
  categorized: { category: 'loneadmin', subType: 'program', normalizedSupplier: null, confidence: 0.95 },
  invoice:     { lineItems, seatCount, billingPeriod: 'monthly' },
});
const line = (description, amount, quantity) => ({ type: 'recurring_subscription', description, amount, quantity });

describe('Löneadmin · prisboken (Fortnox Lön-ankare, exkl moms verifierat)', () => {
  test('fortnoxLonVerified bär 199 fast + 25/anställd + 5/lönebesked, exkl moms', () => {
    const fv = BRANCHINDEX.loneadmin.fortnoxLonVerified;
    assert.equal(fv.vatBasis, 'exkl');
    assert.equal(fv.fixedMonthly, 199);
    assert.equal(fv.perEmployeeMonthly, 25);
    assert.equal(fv.perPayslip, 5);
  });
});

describe('Löneadmin · anställd-härledning (aldrig en gissning)', () => {
  test('seatCount har företräde', () => {
    assert.equal(deriveLoneadminHeadcount({ seatCount: 30, lineItems: [] }, { employees: 5 }), 30);
  });
  test('störst rad-quantity (per-anställd-fakturering)', () => {
    assert.equal(deriveLoneadminHeadcount({ lineItems: [line('Visma Lön', 1200, 20)] }, null), 20);
  });
  test('"(N anställda)" ur radtext', () => {
    assert.equal(deriveLoneadminHeadcount({ lineItems: [line('Lönekörning (18 anställda)', 1080)] }, null), 18);
  });
  test('inget antal → null (faller till offert)', () => {
    assert.equal(deriveLoneadminHeadcount({ lineItems: [line('Lönehantering', 5000)] }, { employees: 0 }), null);
  });
});

describe('Löneadmin · recommend() — deterministisk, Zero Trust (ingen AI, ingen FX)', () => {
  test('Visma över golvet → per-anställd exkl, Fortnox-golv, gated annualSaving, ingen hård besparing', async () => {
    const r = await recommend(inv([line('Visma Lön lönekörning', 1200, 20)], 20));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.revisionGate, 'audited');
    assert.ok(r.loneadminRightsizing, 'loneadminRightsizing ska finnas');
    assert.equal(r.loneadminRightsizing.headcount, 20);
    assert.equal(r.loneadminRightsizing.perEmployeeMonthly, 60);     // 1200/20
    assert.equal(r.loneadminRightsizing.floorTotalMonthly, 699);     // 199 + 25×20
    assert.equal(r.loneadminRightsizing.floorPerEmployee, 34.95);    // 699/20
    assert.equal(r.loneadminRightsizing.overFloorPct, 72);           // (60−34.95)/34.95
    assert.equal(r.loneadminRightsizing.annualSaving, 6012);         // (1200−699)×12
    assert.equal(r.loneadminRightsizing.aboveFloor, true);
    assert.equal(r.suggestedSupplier, 'Fortnox Lön');
    // Zero Trust: ingen hård besparing renderas — bara den gated potentialen.
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.optimizationSaving, null);
    assert.match(r.reasoning, /60,00 kr\/anställd/);
    assert.match(r.reasoning, /199 kr\/mån \+ 25 kr\/anställd/);
    assert.match(r.reasoning, /kr\/år/);
  });

  test('redan på Fortnox Lön → ingen besparing, ingen föreslagen leverantör', async () => {
    const r = await recommend(inv([line('Fortnox Lön', 700, 20)], 20));
    assert.equal(r.loneadminRightsizing.alreadyFortnox, true);
    assert.equal(r.loneadminRightsizing.annualSaving, null);
    assert.equal(r.loneadminRightsizing.aboveFloor, false);
    assert.equal(r.suggestedSupplier, null);
    assert.match(r.reasoning, /redan på Fortnox Löns verifierade nivå/);
  });

  test('i nivå med/under golvet → ingen fabricerad besparing', async () => {
    const r = await recommend(inv([line('Hogia Lön', 600, 20)], 20));
    assert.equal(r.loneadminRightsizing.aboveFloor, false);
    assert.equal(r.loneadminRightsizing.annualSaving, null);
    assert.equal(r.suggestedSupplier, null);
    assert.match(r.reasoning, /i nivå med Fortnox Löns verifierade golv/);
  });

  test('lönebesked-rad EXKLUDERAS ur golvjämförelsen (per-anställd förblir 60, ej 65)', async () => {
    const r = await recommend(inv([
      line('Visma Lön', 1200, 20),
      line('Lönebesked Kivra-utskick', 100, 20),
    ], 20));
    assert.equal(r.loneadminRightsizing.hasPayslip, true);
    assert.equal(r.loneadminRightsizing.excludedPayslipMonthly, 100);
    assert.equal(r.loneadminRightsizing.perEmployeeMonthly, 60);   // 1200/20 — INTE 1300/20 = 65
    assert.equal(r.loneadminRightsizing.overFloorPct, 72);         // golvgapet blåses inte upp av rörlig rad
    assert.equal(r.loneadminRightsizing.annualSaving, 6012);       // (1200−699)×12, payslip ej med
    assert.match(r.reasoning, /Lönebesked.*rörliga/i);
  });

  test('ej normaliserbar (saknar anställda) → talfritt offert-läge, ingen siffra', async () => {
    const r = await recommend(inv([line('Lönehantering', 5000)], null, null));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.revisionGate, 'audited');
    assert.equal(r.loneadminRightsizing, null);
    assert.equal(r.suggestedAnnualCost, null);
    assert.ok(!/\d[\d\s.,]*\s*kr/i.test(r.reasoning), 'offert-copy ska vara talfri om pengabelopp');
  });
});
