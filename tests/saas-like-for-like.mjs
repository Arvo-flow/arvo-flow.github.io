// tests/saas-like-for-like.mjs
// TDD regression tests for the "like-for-like" SaaS tier calculation.
//
// Problem (pre-fix):
//   SAAS_DOWNGRADE_TARGET mapped 'business-premium' → 'business-standard'.
//   IT-8821 (45× Premium + 12× Basic + Backup) got benchmarked against Standard
//   prices → inflated saving of 89 640 kr that included a silent Intune/Defender
//   removal. Also, the Backup add-on was excluded from the comparable annual cost,
//   creating the impression the customer could drop the backup.
//
// Fix (this file proves):
//   computeLikeForLikeSaasTarget() mirrors the input license mix exactly.
//   - Premium seats are benchmarked at Premium price (210 kr/mth).
//   - Basic seats are benchmarked at Basic price (57 kr/mth).
//   - Backup add-on is passed through at invoice price (2 565 kr/mth × 12).
//   - No tier downgrade is performed.
//
// IT-8821 arithmetic:
//   tierAnnual(Premium)  = 210 × 45 × 12 = 113 400 kr
//   tierAnnual(Basic)    =  57 × 12 × 12 =   8 208 kr
//   addonAnnual(Backup)  = 2 565  × 12   =  30 780 kr
//   suggestedAnnualCost  = 152 388 kr
//   annualCost           = 184 680 kr
//   savingPerYear        =  32 292 kr
//   arvoFee (20%)        =   6 458 kr
//   netSaving            =  25 834 kr

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeLikeForLikeSaasTarget } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const fixture = JSON.parse(
  readFileSync(new URL('./fixtures/it-8821-ms365.json', import.meta.url), 'utf-8')
);

const tierBm = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

// ── Fixture helpers ────────────────────────────────────────────────────────────

function li(description, amount, quantity, unitPrice, is_addon = false, addon_type = null) {
  return { type: 'recurring_subscription', description, amount, quantity, unitPrice, is_addon, addon_type };
}

const IT8821_LINES = fixture.lineItems;
const IT8821_ANNUAL = fixture.annualCost;  // 184 680

// ── computeLikeForLikeSaasTarget ───────────────────────────────────────────────

describe('computeLikeForLikeSaasTarget — IT-8821 like-for-like kalkyl', () => {

  test('returnerar korrekt suggestedAnnualCost = 152 388 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.ok(result !== null, 'Ska ej returnera null när quantity finns');
    assert.equal(result.suggestedAnnualCost, 152_388,
      `Förväntat 152 388, fick ${result.suggestedAnnualCost}`);
  });

  test('savingPerYear = 32 292 kr (ej 89 640 — ingen nedgradering)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.savingPerYear, 32_292,
      `Förväntat 32 292 kr, fick ${result.savingPerYear} — kontrollera att SAAS_DOWNGRADE_TARGET inte används`);
  });

  test('dominantTierKey = business-premium (ingen nedgradering till standard)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.dominantTierKey, 'business-premium',
      'Dominant tier ska vara Premium, inte Standard');
  });

  test('backup add-on ingår i suggestedAnnualCost (ej borttappad)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    // If backup were excluded, suggestedAnnualCost would be 113 400 + 8 208 = 121 608.
    // With backup: 152 388. Difference = 30 780 = backup passthrough.
    const backupPassthrough = result.suggestedAnnualCost
      - result.tierLines.reduce((s, t) => s + t.tierAnnual, 0);
    assert.equal(backupPassthrough, 30_780,
      `Backup passthrough ska vara 30 780 kr, fick ${backupPassthrough}`);
  });

  test('addonLines innehåller backup med addon_type cloud_backup', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const backup = result.addonLines.find(a => a.addon_type === 'cloud_backup');
    assert.ok(backup, 'Backup-rad saknas i addonLines');
    assert.equal(backup.addonAnnual, 30_780);
  });

  test('tierLines: Premium 45 seats × 210 kr × 12 = 113 400 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const premiumLine = result.tierLines.find(t => t.key === 'business-premium');
    assert.ok(premiumLine, 'business-premium saknas i tierLines');
    assert.equal(premiumLine.quantity, 45);
    assert.equal(premiumLine.benchmarkMonthly, 210);
    assert.equal(premiumLine.tierAnnual, 113_400);
  });

  test('tierLines: Basic 12 seats × 57 kr × 12 = 8 208 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const basicLine = result.tierLines.find(t => t.key === 'business-basic');
    assert.ok(basicLine, 'business-basic saknas i tierLines');
    assert.equal(basicLine.quantity, 12);
    assert.equal(basicLine.benchmarkMonthly, 57);
    assert.equal(basicLine.tierAnnual, 8_208);
  });

});

describe('computeLikeForLikeSaasTarget — arvoFee och netSaving kalibrering', () => {

  test('arvoFee (20%) = 6 458 kr', () => {
    const { savingPerYear } = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const arvoFee = Math.round(savingPerYear * 0.20);
    assert.equal(arvoFee, 6_458,
      `Förväntat arvoFee 6 458 kr, fick ${arvoFee}`);
  });

  test('netSaving = 25 834 kr', () => {
    const { savingPerYear } = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const arvoFee = Math.round(savingPerYear * 0.20);
    const netSaving = savingPerYear - arvoFee;
    assert.equal(netSaving, 25_834,
      `Förväntat netSaving 25 834 kr, fick ${netSaving}`);
  });

});

describe('computeLikeForLikeSaasTarget — quantity-saknas fallback', () => {

  test('returnerar null när quantity saknas på tier-rad (kräver quote)', () => {
    const linesNoQty = [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium', amount: 11_925, quantity: null, is_addon: false, addon_type: null },
    ];
    const result = computeLikeForLikeSaasTarget(linesNoQty, tierBm, 143_100);
    assert.equal(result, null, 'Ska returnera null när quantity saknas');
  });

  test('tom lineItems-array returnerar null', () => {
    const result = computeLikeForLikeSaasTarget([], tierBm, 0);
    assert.equal(result, null);
  });

  test('null lineItems returnerar null', () => {
    const result = computeLikeForLikeSaasTarget(null, tierBm, 0);
    assert.equal(result, null);
  });

});

describe('computeLikeForLikeSaasTarget — single-tier utan add-ons', () => {

  test('ren Premium-faktura: 10 seats × 210 × 12 = 25 200 kr föreslagen', () => {
    const lines = [
      li('Microsoft 365 Business Premium', 2_650, 10, 265),
    ];
    const annualCost = 2_650 * 12;
    const result = computeLikeForLikeSaasTarget(lines, tierBm, annualCost);
    assert.equal(result.suggestedAnnualCost, 25_200);
    assert.equal(result.savingPerYear, Math.max(0, annualCost - 25_200));
    assert.equal(result.dominantTierKey, 'business-premium');
  });

  test('ren Standard-faktura: jämförs mot Standard (ej nedgraderas till Basic)', () => {
    const lines = [
      li('Microsoft 365 Business Standard', 1_430, 10, 143),
    ];
    const annualCost = 1_430 * 12;
    const result = computeLikeForLikeSaasTarget(lines, tierBm, annualCost);
    assert.equal(result.dominantTierKey, 'business-standard');
    // 10 seats × 119 kr × 12 = 14 280
    assert.equal(result.suggestedAnnualCost, 14_280);
  });

});

describe('computeLikeForLikeSaasTarget — fixture-konsistens', () => {

  test('fixture expected.suggestedAnnualCost matchar beräknat värde', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.suggestedAnnualCost, fixture.expected.suggestedAnnualCost);
  });

  test('fixture expected.savingPerYear matchar beräknat värde', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.savingPerYear, fixture.expected.savingPerYear);
  });

  test('fixture expected.tierBreakdown stämmer med tierLines', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    for (const [key, exp] of Object.entries(fixture.expected.tierBreakdown)) {
      const line = result.tierLines.find(t => t.key === key);
      assert.ok(line, `Tier-rad '${key}' saknas`);
      assert.equal(line.quantity,         exp.quantity);
      assert.equal(line.benchmarkMonthly, exp.benchmarkMonthly);
      assert.equal(line.tierAnnual,       exp.tierAnnual);
    }
  });

});
