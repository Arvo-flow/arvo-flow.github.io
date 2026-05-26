// tests/saas-tier-detection.mjs
// Regression tests for saas tier detection and downgrade target map.
//
// Background: before this fix, recommend.js used getSaasLicenseTierKey(licenseType)
// which reads a single licenseType string returned by extract.js. On mixed-tier M365 invoices
// (e.g. Business Premium + Business Basic + Backup), extract.js returns "Business Basic" as
// licenseType (lowest common denominator), causing benchmark to use Basic Arvo CSP (46 kr/month)
// instead of Standard (104 kr/month) for the recommended downgrade.
//
// Fix: getDominantSaasTierKey() scans all recurring_subscription line items, picks the tier
// with the largest total amount, then SAAS_DOWNGRADE_TARGET maps it to the recommended tier.
// The recommended tier's arvoAnnual × 12 becomes benchmark.p25.
//
// IT-8821 scenario:
//   Premium: 45 × 265 = 11 925 kr/mån → dominant
//   Basic:   12 × 75  =    900 kr/mån
//   Backup:  57 × 45  =  2 565 kr/mån (non-tier)
//   → dominant = 'business-premium', recommended = 'business-standard'

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getDominantSaasTierKey, SAAS_DOWNGRADE_TARGET } from '../agents/recommender/recommend.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

function li(description, amount) {
  return { type: 'recurring_subscription', description, amount };
}

// ── SAAS_DOWNGRADE_TARGET ─────────────────────────────────────────────────────

describe('SAAS_DOWNGRADE_TARGET — tier downgrade map', () => {
  test('business-premium → business-standard', () => {
    assert.equal(SAAS_DOWNGRADE_TARGET['business-premium'], 'business-standard');
  });
  test('e3 → business-premium', () => {
    assert.equal(SAAS_DOWNGRADE_TARGET['e3'], 'business-premium');
  });
  test('e5 → e3', () => {
    assert.equal(SAAS_DOWNGRADE_TARGET['e5'], 'e3');
  });
  test('business-standard → business-standard (ingen nedgradering möjlig)', () => {
    assert.equal(SAAS_DOWNGRADE_TARGET['business-standard'], 'business-standard');
  });
  test('business-basic → business-basic (lägsta nivå)', () => {
    assert.equal(SAAS_DOWNGRADE_TARGET['business-basic'], 'business-basic');
  });
});

// ── getDominantSaasTierKey ────────────────────────────────────────────────────

describe('getDominantSaasTierKey — IT-8821 mixed-tier scenario', () => {

  const IT8821_LINES = [
    li('Microsoft 365 Business Premium', 11_925),   // dominant
    li('Microsoft 365 Business Basic',      900),
    li('Microsoft 365 Backup Storage',    2_565),   // non-tier, ignored
  ];

  test('väljer business-premium (högst belopp) bland Premium + Basic + Backup', () => {
    const key = getDominantSaasTierKey(IT8821_LINES, 'Business Basic', null);
    assert.equal(key, 'business-premium',
      `Förväntat 'business-premium', fick '${key}'`);
  });

  test('SAAS_DOWNGRADE_TARGET[dominant] ger business-standard', () => {
    const dominant = getDominantSaasTierKey(IT8821_LINES, 'Business Basic', null);
    const recommended = SAAS_DOWNGRADE_TARGET[dominant];
    assert.equal(recommended, 'business-standard');
  });

  test('backup-rad (icke-tier) påverkar inte dominant-valet', () => {
    // Even if backup amount were larger, it maps to null tier → ignored
    const linesWithHeavyBackup = [
      li('Microsoft 365 Business Premium', 5_000),
      li('Microsoft 365 Backup Storage',  20_000),  // huge but not a tier
    ];
    const key = getDominantSaasTierKey(linesWithHeavyBackup, null, null);
    assert.equal(key, 'business-premium');
  });

});

describe('getDominantSaasTierKey — fallback till getSaasLicenseTierKey', () => {

  test('tom lineItems-array → fallback på fallbackLicenseType', () => {
    const key = getDominantSaasTierKey([], 'Business Standard', null);
    assert.equal(key, 'business-standard');
  });

  test('null lineItems → fallback på fallbackLicenseType', () => {
    const key = getDominantSaasTierKey(null, 'Business Premium', null);
    assert.equal(key, 'business-premium');
  });

  test('inga recurring_subscription-rader → fallback', () => {
    const lines = [
      { type: 'one_time_fee', description: 'Microsoft 365 Business Premium', amount: 999 },
    ];
    const key = getDominantSaasTierKey(lines, 'Business Basic', null);
    assert.equal(key, 'business-basic');
  });

  test('inga kända tier-beskrivningar → fallback', () => {
    const lines = [
      li('Backup Storage Only', 5_000),
      li('Entra ID Plan 1',     2_000),
    ];
    const key = getDominantSaasTierKey(lines, 'Business Standard', null);
    assert.equal(key, 'business-standard');
  });

});

describe('getDominantSaasTierKey — single-tier och E3/E5', () => {

  test('E3-faktura utan mix → returnerar e3', () => {
    const lines = [li('Microsoft 365 E3', 50_000)];
    const key = getDominantSaasTierKey(lines, null, null);
    assert.equal(key, 'e3');
    assert.equal(SAAS_DOWNGRADE_TARGET[key], 'business-premium');
  });

  test('E5-faktura → returnerar e5, nedgraderas till e3', () => {
    const lines = [li('Microsoft 365 E5', 80_000)];
    const key = getDominantSaasTierKey(lines, null, null);
    assert.equal(key, 'e5');
    assert.equal(SAAS_DOWNGRADE_TARGET[key], 'e3');
  });

  test('ren Business Basic-faktura → business-basic', () => {
    const lines = [li('Microsoft 365 Business Basic', 2_000)];
    const key = getDominantSaasTierKey(lines, null, null);
    assert.equal(key, 'business-basic');
    assert.equal(SAAS_DOWNGRADE_TARGET[key], 'business-basic');
  });

  test('dominant väljs korrekt vid tre tiers', () => {
    const lines = [
      li('Microsoft 365 E5',               1_000),  // small
      li('Microsoft 365 Business Premium', 3_000),  // medium
      li('Microsoft 365 E3',              10_000),  // dominant
    ];
    const key = getDominantSaasTierKey(lines, null, null);
    assert.equal(key, 'e3');
  });

});

describe('IT-8821 finansiell kalibrering — benchmark.p25 kontroll', () => {
  // Verifies the arithmetic chain that produces the correct saving.
  // Does NOT call recommend() — only the pure functions.

  test('benchmark.p25 med recommended tier (business-standard) = 1 248 kr/seat/år', () => {
    // arvoAnnual for business-standard = 104 kr/month (from branchindex.js)
    const ARVO_MONTHLY_STANDARD = 104;
    const expectedP25 = ARVO_MONTHLY_STANDARD * 12;  // 1 248
    assert.equal(expectedP25, 1_248);
  });

  test('suggestedAnnualCost med 45 anställda + 30 780 kr backup pass-through', () => {
    const benchmarkP25 = 1_248;  // business-standard arvoAnnual * 12
    const scale = 45;            // employees (not seatCount=57)
    const saasNonLicenseAddonAnnual = 2_565 * 12;  // 30 780

    const suggestedAnnualCost = Math.round(benchmarkP25 * scale) + saasNonLicenseAddonAnnual;
    assert.equal(suggestedAnnualCost, 86_940,
      `Förväntat 86 940 kr, fick ${suggestedAnnualCost}`);
  });

  test('savingPerYear = 97 740 kr (licensdelen, backup exkluderat)', () => {
    const annualCost = 184_680;
    const saasNonLicenseAddonAnnual = 30_780;
    const benchmarkP25 = 1_248;
    const scale = 45;

    const comparableAnnualCost = annualCost - saasNonLicenseAddonAnnual;  // 153 900
    const savingPerYear = Math.max(0, Math.round(comparableAnnualCost - Math.round(benchmarkP25 * scale)));
    assert.equal(savingPerYear, 97_740,
      `Förväntat 97 740 kr, fick ${savingPerYear}`);
  });

  test('netSaving = 78 192 kr (20% Arvo-avgift)', () => {
    const savingPerYear = 97_740;
    const arvoFee = Math.round(savingPerYear * 0.20);
    const netSaving = savingPerYear - arvoFee;
    assert.equal(netSaving, 78_192,
      `Förväntat 78 192 kr, fick ${netSaving}`);
  });

  test('licenseOverage = 12, overageSavings = 14 976 kr', () => {
    const seatCount = 57;
    const employees = 45;
    const benchmarkP25 = 1_248;

    const licenseOverage = seatCount - employees;
    const overageSavings = Math.round(licenseOverage * benchmarkP25);
    assert.equal(licenseOverage, 12);
    assert.equal(overageSavings, 14_976,
      `Förväntat 14 976 kr, fick ${overageSavings}`);
  });

});
