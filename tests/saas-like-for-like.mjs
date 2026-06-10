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
//   - Premium seats are benchmarked at Premium price (210,29 kr/mth, MS sv-se 2026-05-27).
//   - Basic seats are benchmarked at Basic price (57,40 kr/mth).
//   - Backup add-on is passed through at invoice price (2 565 kr/mth × 12).
//   - No tier downgrade is performed.
//   - Pro-rata lines (one_time_fee + is_prorata) count at FULL quantity in the target —
//     excluding them compares N licenses' cost against (N−k) licenses' target and
//     inflates the saving by the new licenses' entire annual cost (CR-88412-buggen).
//
// IT-8821 arithmetic (Microsoft-priser verifierade 2026-05-27):
//   tierAnnual(Premium)  = 210,29 × 45 × 12 = 113 557 kr
//   tierAnnual(Basic)    =  57,40 × 12 × 12 =   8 266 kr
//   addonAnnual(Backup)  = 2 565   × 12     =  30 780 kr
//   suggestedAnnualCost  = 152 603 kr
//   annualCost           = 184 680 kr
//   savingPerYear        =  32 077 kr
//   arvoFee (20%)        =   6 415 kr
//   netSaving            =  25 662 kr

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

  test('returnerar korrekt suggestedAnnualCost = 152 603 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.ok(result !== null, 'Ska ej returnera null när quantity finns');
    assert.equal(result.suggestedAnnualCost, 152_603,
      `Förväntat 152 603, fick ${result.suggestedAnnualCost}`);
  });

  test('savingPerYear = 32 077 kr (ej 89 640 — ingen nedgradering)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.savingPerYear, 32_077,
      `Förväntat 32 077 kr, fick ${result.savingPerYear} — kontrollera att SAAS_DOWNGRADE_TARGET inte används`);
  });

  test('dominantTierKey = business-premium (ingen nedgradering till standard)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    assert.equal(result.dominantTierKey, 'business-premium',
      'Dominant tier ska vara Premium, inte Standard');
  });

  test('backup add-on ingår i suggestedAnnualCost (ej borttappad)', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    // If backup were excluded, suggestedAnnualCost would be 113 557 + 8 266 = 121 823.
    // With backup: 152 603. Difference = 30 780 = backup passthrough.
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

  test('tierLines: Premium 45 seats × 210,29 kr × 12 = 113 557 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const premiumLine = result.tierLines.find(t => t.key === 'business-premium');
    assert.ok(premiumLine, 'business-premium saknas i tierLines');
    assert.equal(premiumLine.quantity, 45);
    assert.equal(premiumLine.benchmarkMonthly, 210.29);
    assert.equal(premiumLine.tierAnnual, 113_557);
  });

  test('tierLines: Basic 12 seats × 57,40 kr × 12 = 8 266 kr', () => {
    const result = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const basicLine = result.tierLines.find(t => t.key === 'business-basic');
    assert.ok(basicLine, 'business-basic saknas i tierLines');
    assert.equal(basicLine.quantity, 12);
    assert.equal(basicLine.benchmarkMonthly, 57.40);
    assert.equal(basicLine.tierAnnual, 8_266);
  });

});

describe('computeLikeForLikeSaasTarget — arvoFee och netSaving kalibrering', () => {

  test('arvoFee (20%) = 6 415 kr', () => {
    const { savingPerYear } = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const arvoFee = Math.round(savingPerYear * 0.20);
    assert.equal(arvoFee, 6_415,
      `Förväntat arvoFee 6 415 kr, fick ${arvoFee}`);
  });

  test('netSaving = 25 662 kr', () => {
    const { savingPerYear } = computeLikeForLikeSaasTarget(IT8821_LINES, tierBm, IT8821_ANNUAL);
    const arvoFee = Math.round(savingPerYear * 0.20);
    const netSaving = savingPerYear - arvoFee;
    assert.equal(netSaving, 25_662,
      `Förväntat netSaving 25 662 kr, fick ${netSaving}`);
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

  test('ren Premium-faktura: 10 seats × 210,29 × 12 = 25 235 kr föreslagen', () => {
    const lines = [
      li('Microsoft 365 Business Premium', 2_650, 10, 265),
    ];
    const annualCost = 2_650 * 12;
    const result = computeLikeForLikeSaasTarget(lines, tierBm, annualCost);
    assert.equal(result.suggestedAnnualCost, 25_235);
    assert.equal(result.savingPerYear, Math.max(0, annualCost - 25_235));
    assert.equal(result.dominantTierKey, 'business-premium');
  });

  test('ren Standard-faktura: jämförs mot Standard (ej nedgraderas till Basic)', () => {
    const lines = [
      li('Microsoft 365 Business Standard', 1_430, 10, 143),
    ];
    const annualCost = 1_430 * 12;
    const result = computeLikeForLikeSaasTarget(lines, tierBm, annualCost);
    assert.equal(result.dominantTierKey, 'business-standard');
    // 10 seats × 119,48 kr × 12 = 14 338
    assert.equal(result.suggestedAnnualCost, 14_338);
  });

});

// ── Pro-rata-regression — CloudReseller CR-88412 ──────────────────────────────
//
// Verklig faktura 2026-05-31: 45 Premium + 20 Standard ordinarie, plus 5 Premium
// och 3 Standard tillagda under perioden (prorata-rader, typade one_time_fee).
// Pre-fix: prorata-raderna filtrerades bort ur målpriset → 65 licensers mål
// (142 232 kr) jämfördes mot 73 licensers annualCost (184 260 kr) och
// besparingen blåstes upp till 42 028 kr. Korrekt: 159 150 kr mål, 25 110 kr.

describe('computeLikeForLikeSaasTarget — prorata-rader (CR-88412)', () => {

  const CR88412_LINES = [
    { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium',                    amount: 11_025, quantity: 45, unitPrice: 245, is_addon: false, addon_type: null, is_prorata: false },
    { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard',                   amount: 2_700,  quantity: 20, unitPrice: 135, is_addon: false, addon_type: null, is_prorata: false },
    { type: 'one_time_fee',           description: 'Microsoft 365 Business Premium (Prorata tillägg)',  amount: 613,    quantity: 5,  unitPrice: 245, is_addon: false, addon_type: null, is_prorata: true  },
    { type: 'one_time_fee',           description: 'Microsoft 365 Business Standard (Prorata tillägg)', amount: 135,    quantity: 3,  unitPrice: 135, is_addon: false, addon_type: null, is_prorata: true  },
  ];
  const CR88412_ANNUAL = 184_260; // (13 725 ordinarie + 5×245 + 3×135 run-rate) × 12

  test('prorata-licenser ingår i målpriset: 50 Premium + 23 Standard = 159 150 kr', () => {
    const result = computeLikeForLikeSaasTarget(CR88412_LINES, tierBm, CR88412_ANNUAL);
    assert.ok(result !== null);
    assert.equal(result.suggestedAnnualCost, 159_150,
      `Förväntat 159 150 kr (50×210,29 + 23×119,48 × 12), fick ${result.suggestedAnnualCost}`);
  });

  test('REGRESSION: målet är INTE 142 232 kr (65 licenser — buggen som gav 188 kr/anv)', () => {
    const result = computeLikeForLikeSaasTarget(CR88412_LINES, tierBm, CR88412_ANNUAL);
    assert.notEqual(result.suggestedAnnualCost, 142_232,
      'Prorata-raderna har exkluderats ur målpriset — täljare/nämnare-mismatch är tillbaka');
  });

  test('savingPerYear = 25 110 kr (ej uppblåsta 42 028 kr)', () => {
    const result = computeLikeForLikeSaasTarget(CR88412_LINES, tierBm, CR88412_ANNUAL);
    assert.equal(result.savingPerYear, 25_110,
      `Förväntat 25 110 kr, fick ${result.savingPerYear}`);
  });

  test('tierLines slår ihop ordinarie + prorata per tier (50 resp. 23 licenser)', () => {
    const result = computeLikeForLikeSaasTarget(CR88412_LINES, tierBm, CR88412_ANNUAL);
    const premium  = result.tierLines.find(t => t.key === 'business-premium');
    const standard = result.tierLines.find(t => t.key === 'business-standard');
    assert.equal(premium.quantity,  50, 'Premium: 45 ordinarie + 5 prorata');
    assert.equal(standard.quantity, 23, 'Standard: 20 ordinarie + 3 prorata');
    assert.equal(premium.tierAnnual,  126_174);
    assert.equal(standard.tierAnnual, 32_976);
  });

  test('prorata-rad utan quantity → null (kräver offert, gissa aldrig)', () => {
    const linesNoQty = [
      CR88412_LINES[0],
      { ...CR88412_LINES[2], quantity: null },
    ];
    const result = computeLikeForLikeSaasTarget(linesNoQty, tierBm, CR88412_ANNUAL);
    assert.equal(result, null);
  });

  test('faktura utan prorata-rader påverkas inte av fixen', () => {
    const plain = CR88412_LINES.slice(0, 2);
    const annual = 13_725 * 12;
    const result = computeLikeForLikeSaasTarget(plain, tierBm, annual);
    // 45×210,29×12 = 113 557 + 20×119,48×12 = 28 675 → 142 232 kr.
    // Samma tal som buggen gav för CR-88412 — men HÄR är det rätt: fakturan
    // har bara 65 licenser, och annualCost-baslinjen räknar samma 65.
    assert.equal(result.suggestedAnnualCost, 142_232);
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
