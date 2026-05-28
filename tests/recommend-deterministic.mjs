// tests/recommend-deterministic.mjs
// Enhetstester för de deterministic-exporterade funktionerna i recommend.js
// samt formler för avfall-guard, managed-print click-ratio och licenseOverage.
//
// Kör: node --test tests/recommend-deterministic.mjs
// Eller via: npm run test:algo

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  SAAS_DOWNGRADE_TARGET,
  getDominantSaasTierKey,
  computeLikeForLikeSaasTarget,
} from '../agents/recommender/recommend.js';
import { getBenchmark, BRANCHINDEX } from '../agents/recommender/branchindex.js';

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

// ── RD-01 ────────────────────────────────────────────────────────────────────
// SAAS_DOWNGRADE_TARGET — nyckelmappningar
describe('RD-01 · SAAS_DOWNGRADE_TARGET — nedgraderingsmappningar', () => {
  const cases = [
    ['business-premium',  'business-standard'],
    ['e3',                'business-premium'],
    ['e5',                'e3'],
    ['business-standard', 'business-standard'],
    ['business-basic',    'business-basic'],
  ];
  for (const [from, to] of cases) {
    test(`${from} → ${to}`, () => assert.strictEqual(SAAS_DOWNGRADE_TARGET[from], to));
  }
});

// ── RD-02 ────────────────────────────────────────────────────────────────────
// getDominantSaasTierKey — fallback när lineItems är tomma/null
describe('RD-02 · getDominantSaasTierKey — fallback via licenseType / productFamily', () => {
  test('tom array + licenseType "business premium" → business-premium', () => {
    assert.strictEqual(getDominantSaasTierKey([], 'business premium', null), 'business-premium');
  });
  test('tom array + licenseType "E3" → e3', () => {
    assert.strictEqual(getDominantSaasTierKey([], 'E3', null), 'e3');
  });
  test('null lineItems + licenseType "Enterprise E5" → e5', () => {
    assert.strictEqual(getDominantSaasTierKey(null, 'Enterprise E5', null), 'e5');
  });
  test('tom array + productFamily "slack" → slack-pro', () => {
    assert.strictEqual(getDominantSaasTierKey([], null, 'slack'), 'slack-pro');
  });
  test('tom array + licenseType "Zoom Business Plus" → zoom-business', () => {
    assert.strictEqual(getDominantSaasTierKey([], 'Zoom Business Plus', 'zoom'), 'zoom-business');
  });
  test('tom array + licenseType "Google Workspace Starter" → google-starter', () => {
    assert.strictEqual(getDominantSaasTierKey([], 'Google Workspace Starter', 'google'), 'google-starter');
  });
  test('tom array + ingen licenseType/pf → null', () => {
    assert.strictEqual(getDominantSaasTierKey([], null, null), null);
  });
});

// ── RD-03 ────────────────────────────────────────────────────────────────────
// getDominantSaasTierKey — dominant tier via lineItems-belopp
describe('RD-03 · getDominantSaasTierKey — dominant tier via belopp', () => {
  test('E3 (5 000) vs Business Premium (2 000) → e3', () => {
    const li = [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3', amount: 5000 },
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium', amount: 2000 },
    ];
    assert.strictEqual(getDominantSaasTierKey(li, null, null), 'e3');
  });

  test('Business Standard (3 000) slår Basic (1 000) och Premium (500)', () => {
    const li = [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic', amount: 1000 },
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', amount: 3000 },
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium', amount: 500 },
    ];
    assert.strictEqual(getDominantSaasTierKey(li, null, null), 'business-standard');
  });

  test('variable_usage ignoreras — recurring_subscription avgör', () => {
    const li = [
      { type: 'variable_usage', description: 'Microsoft 365 E3 overage', amount: 9999 },
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic', amount: 100 },
    ];
    assert.strictEqual(getDominantSaasTierKey(li, null, null), 'business-basic');
  });

  test('inga tier-matchande rader → fallback till licenseType', () => {
    const li = [
      { type: 'recurring_subscription', description: 'Acronis Backup', amount: 500 },
    ];
    assert.strictEqual(getDominantSaasTierKey(li, 'E3', null), 'e3');
  });
});

// ── RD-04 ────────────────────────────────────────────────────────────────────
// computeLikeForLikeSaasTarget — E3-återförsäljaröverdebitering (20 seats)
// Kund betalar 600 kr/seat/mån hos återförsäljare; MSRP årsavtal = 384,70 kr/seat/mån.
// Besparing = 144 000 − 92 328 = 51 672 kr/år (prisgap, ej tierdowngrade).
describe('RD-04 · computeLikeForLikeSaasTarget — E3 återförsäljaröverdebitering', () => {
  const annualCost = 144000;  // 12 000 kr/mån × 12
  const li = [
    { type: 'recurring_subscription', description: 'Microsoft 365 E3', quantity: 20, amount: 12000 },
  ];
  let result;
  test('returnerar icke-null', () => {
    result = computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.notStrictEqual(result, null);
  });
  test('dominantTierKey = "e3"', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.dominantTierKey, 'e3');
  });
  test('suggestedAnnualCost = Math.round(384,70 × 20 × 12) = 92 328', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.suggestedAnnualCost, 92328);
  });
  test('savingPerYear = 144 000 − 92 328 = 51 672', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.savingPerYear, 51672);
  });
  test('tierLines innehåller rätt entry', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.tierLines.length, 1);
    assert.strictEqual(result.tierLines[0].key, 'e3');
    assert.strictEqual(result.tierLines[0].quantity, 20);
    assert.strictEqual(result.tierLines[0].tierAnnual, 92328);
  });
  test('addonLines är tom', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.addonLines.length, 0);
  });
});

// ── RD-05 ────────────────────────────────────────────────────────────────────
// computeLikeForLikeSaasTarget — blandad M365-faktura (Business Standard + Premium + Acronis)
describe('RD-05 · computeLikeForLikeSaasTarget — blandad tier-faktura med add-on', () => {
  const annualCost = 39600;  // (1 800 + 1 300 + 200) × 12
  const li = [
    { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', quantity: 15, amount: 1800 },
    { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium', quantity: 5, amount: 1300 },
    { type: 'recurring_subscription', description: 'Acronis Backup', quantity: 1, amount: 200 },
  ];
  let result;

  test('returnerar icke-null', () => {
    result = computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.notStrictEqual(result, null);
  });
  test('dominantTierKey = "business-standard" (21 506 > 12 617)', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.dominantTierKey, 'business-standard');
  });
  test('suggestedAnnualCost = 21 506 + 12 617 + 2 400 = 36 523', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.suggestedAnnualCost, 36523);
  });
  test('savingPerYear = 39 600 − 36 523 = 3 077', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.savingPerYear, 3077);
  });
  test('Business Standard tierAnnual = Math.round(119,48 × 15 × 12) = 21 506', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    const bs = result.tierLines.find(t => t.key === 'business-standard');
    assert.ok(bs, 'business-standard rad saknas i tierLines');
    assert.strictEqual(bs.tierAnnual, 21506);
  });
  test('Business Premium tierAnnual = Math.round(210,29 × 5 × 12) = 12 617', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    const bp = result.tierLines.find(t => t.key === 'business-premium');
    assert.ok(bp, 'business-premium rad saknas i tierLines');
    assert.strictEqual(bp.tierAnnual, 12617);
  });
  test('Acronis add-on passthrough = 200 × 12 = 2 400', () => {
    result ??= computeLikeForLikeSaasTarget(li, TIERS, annualCost);
    assert.strictEqual(result.addonLines.length, 1);
    assert.strictEqual(result.addonLines[0].addonAnnual, 2400);
  });
});

// ── RD-06 ────────────────────────────────────────────────────────────────────
// computeLikeForLikeSaasTarget — edge cases
describe('RD-06 · computeLikeForLikeSaasTarget — edge cases', () => {
  test('saknat quantity → returnerar null (kan inte beräkna like-for-like)', () => {
    const li = [{ type: 'recurring_subscription', description: 'Microsoft 365 Business Standard', amount: 1800 }];
    assert.strictEqual(computeLikeForLikeSaasTarget(li, TIERS, 21600), null);
  });

  test('tom array → null', () => {
    assert.strictEqual(computeLikeForLikeSaasTarget([], TIERS, 5000), null);
  });

  test('savingPerYear = 0 när kunden betalar under benchmarkpriset', () => {
    // kund betalar 47,8 kr/seat/mån (under Business Basic MSRP 57,40)
    const li = [{ type: 'recurring_subscription', description: 'Microsoft 365 Business Basic', quantity: 10, amount: 478 }];
    const result = computeLikeForLikeSaasTarget(li, TIERS, 5736);
    assert.notStrictEqual(result, null);
    assert.strictEqual(result.savingPerYear, 0);
    assert.strictEqual(result.suggestedAnnualCost, 6888);  // 57,40 × 10 × 12
  });

  test('Slack Pro (icke-M365) klassas som add-on passthrough med billMult=12', () => {
    const li = [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic', quantity: 10, amount: 580 },
      { type: 'recurring_subscription', description: 'Slack Pro', amount: 200 },
    ];
    const result = computeLikeForLikeSaasTarget(li, TIERS, 9360);
    assert.notStrictEqual(result, null);
    assert.strictEqual(result.dominantTierKey, 'business-basic');
    assert.strictEqual(result.addonLines.length, 1);
    assert.strictEqual(result.addonLines[0].addonAnnual, 2400);  // 200 × 12
    assert.strictEqual(result.suggestedAnnualCost, 9288);         // 6888 + 2400
  });
});

// ── RD-07 ────────────────────────────────────────────────────────────────────
// Avfall-guard — shouldSwitch-tröskel (annualCost > p25 × 1,10)
// Formel replicas direkt från recommend.js avfall-blocket.
describe('RD-07 · Avfall-guard — shouldSwitch-tröskel', () => {
  const bm = getBenchmark({ category: 'avfall-atervinning', industry: 'konsult', employees: 5 });
  const p25 = bm.p25;  // 9 500 kr/år

  function shouldSwitch(annualCost) {
    return annualCost > p25 * 1.10;
  }

  test('p25 från branchindex = 9 500', () => {
    assert.strictEqual(p25, 9500);
  });
  test('annualCost = p25 × 1,10 (10 450) → INTE switch (ej strikt >)', () => {
    assert.strictEqual(shouldSwitch(10450), false);
  });
  test('annualCost = 10 451 → switch', () => {
    assert.strictEqual(shouldSwitch(10451), true);
  });
  test('annualCost = 30 000 → switch', () => {
    assert.strictEqual(shouldSwitch(30000), true);
  });
  test('annualCost = 9 000 (< p25) → INTE switch', () => {
    assert.strictEqual(shouldSwitch(9000), false);
  });
  test('annualCost = p25 exakt → INTE switch', () => {
    assert.strictEqual(shouldSwitch(p25), false);
  });
});

// ── RD-08 ────────────────────────────────────────────────────────────────────
// Avfall-guard — grossSaving / arvoFee / netSaving-aritmetik
// Täcker "stora abonnemang"-caset (Salesforce-ekvivalent stor faktura).
describe('RD-08 · Avfall-guard — grossSaving / arvoFee / netSaving-aritmetik', () => {
  const bm = getBenchmark({ category: 'avfall-atervinning', industry: 'konsult', employees: 5 });
  const p25 = bm.p25;  // 9 500 kr/år

  function avfallMath(annualCost) {
    const grossSaving = Math.max(0, annualCost - p25);
    const arvoFee     = Math.round(grossSaving * 0.20);
    const netSaving   = grossSaving - arvoFee;
    return { grossSaving, arvoFee, netSaving };
  }

  test('annualCost = 30 000: grossSaving = 20 500', () => {
    assert.strictEqual(avfallMath(30000).grossSaving, 20500);
  });
  test('annualCost = 30 000: arvoFee = Math.round(20 500 × 0,20) = 4 100', () => {
    assert.strictEqual(avfallMath(30000).arvoFee, 4100);
  });
  test('annualCost = 30 000: netSaving = 16 400', () => {
    assert.strictEqual(avfallMath(30000).netSaving, 16400);
  });

  // Stor faktura — verifierar arvoFee-matematik för höga belopp
  test('annualCost = 200 000: grossSaving = 190 500', () => {
    assert.strictEqual(avfallMath(200000).grossSaving, 190500);
  });
  test('annualCost = 200 000: arvoFee = 38 100 (20 %)', () => {
    assert.strictEqual(avfallMath(200000).arvoFee, 38100);
  });
  test('annualCost = 200 000: netSaving = 152 400', () => {
    assert.strictEqual(avfallMath(200000).netSaving, 152400);
  });

  test('annualCost = p25 exakt: grossSaving = 0, arvoFee = 0, netSaving = 0', () => {
    const { grossSaving, arvoFee, netSaving } = avfallMath(p25);
    assert.strictEqual(grossSaving, 0);
    assert.strictEqual(arvoFee, 0);
    assert.strictEqual(netSaving, 0);
  });

  test('arvoFee avrundas korrekt (Math.round, ej floor)', () => {
    // grossSaving = 1001 → fee = Math.round(200,2) = 200 (ej 201)
    const bm2 = getBenchmark({ category: 'avfall-atervinning', industry: 'konsult', employees: 5 });
    const gross = 1001;
    const fee = Math.round(gross * 0.20);
    assert.strictEqual(fee, 200);
    assert.strictEqual(gross - fee, 801);
  });
});

// ── RD-09 ────────────────────────────────────────────────────────────────────
// Managed Print — click-ratio-tröskel (> 0,35 → requiresQuote)
// Formel replicas från recommend.js skrivarleasing-blocket.
describe('RD-09 · Managed Print — click-ratio-tröskel', () => {
  function ratio(fixed, clicks) {
    const total = fixed + clicks;
    return total > 0 ? clicks / total : 0;
  }
  function requiresQuote(fixed, clicks) {
    return ratio(fixed, clicks) > 0.35;
  }

  test('fixed=1 000, clicks=350: ratio ≈ 0,259 → EJ quote', () => {
    assert.strictEqual(requiresQuote(1000, 350), false);
  });
  test('fixed=650, clicks=350: ratio = 0,35 exakt → INTE > 0,35 → EJ quote', () => {
    assert.strictEqual(requiresQuote(650, 350), false);
  });
  test('fixed=649, clicks=351: ratio = 0,351 → quote', () => {
    assert.strictEqual(requiresQuote(649, 351), true);
  });
  test('fixed=0, clicks=500: ratio = 1,0 → quote', () => {
    assert.strictEqual(requiresQuote(0, 500), true);
  });
  test('fixed=1 500, clicks=600: ratio ≈ 0,286 → EJ quote', () => {
    assert.strictEqual(requiresQuote(1500, 600), false);
  });
  test('fixed=1 500, clicks=900: ratio = 0,375 → quote', () => {
    assert.strictEqual(requiresQuote(1500, 900), true);
  });
  test('fixed=0, clicks=0: ratio = 0 → EJ quote', () => {
    assert.strictEqual(requiresQuote(0, 0), false);
  });
});

// ── RD-10 ────────────────────────────────────────────────────────────────────
// licenseOverage = seatCount − employees (kod-formel, ej AI)
// Korrelat till recommend.js-blocket: result.licenseOverage = seatCount - employees.
describe('RD-10 · licenseOverage-formel', () => {
  function computeOverage(seatCount, employees, p25PerSeat) {
    if (seatCount != null && seatCount > employees) {
      const licenseOverage = seatCount - employees;
      const overageSavings = Math.round(licenseOverage * p25PerSeat);
      return { licenseOverage, overageSavings };
    }
    return { licenseOverage: null, overageSavings: null };
  }

  const p25PerSeat = 119.48;  // business-standard msrpAnnual (per seat/mån)

  test('seatCount=69, employees=57 → licenseOverage=12', () => {
    const r = computeOverage(69, 57, p25PerSeat);
    assert.strictEqual(r.licenseOverage, 12);
  });
  test('seatCount=69, employees=57 → overageSavings = Math.round(12 × 119,48) = 1 434', () => {
    const r = computeOverage(69, 57, p25PerSeat);
    assert.strictEqual(r.overageSavings, 1434);
  });
  test('seatCount=57, employees=57 (lika) → licenseOverage = null', () => {
    const r = computeOverage(57, 57, p25PerSeat);
    assert.strictEqual(r.licenseOverage, null);
    assert.strictEqual(r.overageSavings, null);
  });
  test('seatCount=40, employees=57 (seat < employees) → licenseOverage = null', () => {
    const r = computeOverage(40, 57, p25PerSeat);
    assert.strictEqual(r.licenseOverage, null);
  });
  test('seatCount=null → licenseOverage = null', () => {
    const r = computeOverage(null, 57, p25PerSeat);
    assert.strictEqual(r.licenseOverage, null);
  });
});
