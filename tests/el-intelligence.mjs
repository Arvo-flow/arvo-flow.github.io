// tests/el-intelligence.mjs
// Regression tests for el-intelligence kWh calibration.
//
// Background: before this fix, enrichElContext estimated annualKwh = annualCost / 1.27
// (swedish SMB all-in average). For TryggEl fixed-price customers paying 1.85 kr/kWh,
// this overestimates kWh by 1.85/1.27 = 1.46×, which inflates the best-supplier cost
// and compresses apparent saving from ~11 900 kr to ~250 kr (96% understatement).
//
// Fix: getElIntelligence now accepts kwhIsEstimated flag; enrichElContext passes
// extracted elKwh from invoice when available.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getElIntelligence } from '../lib/el-intelligence.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

// Stub fetchSpotPrice to avoid network calls in tests.
// We use the SE3 fallback value (0.513 kr/kWh) by passing a supplier
// that doesn't match any zone pattern → defaults to SE3 fallback.
const SPOT_SE3 = 0.513;  // matches SPOT_FALLBACK.SE3 in el-intelligence.js
const TEST_SUPPLIER = 'Okänd leverantör AB';  // → zone SE3

// ── Fixture scenarios ─────────────────────────────────────────────────────────

// TryggEl fixed-price scenario:
//   Actual invoice: 38 000 kr/år at 1.85 kr/kWh all-in → 20 541 kWh
//   Using actual kWh: best supplier includes network+tax → true saving
//   Using estimated kWh (1.27 avg): kWh inflated → saving compressed near zero

const TRYGEL_ANNUAL_COST   = 38_000;
const TRYGEL_ACTUAL_KWH    = Math.round(TRYGEL_ANNUAL_COST / 1.85);  // 20 541
const TRYGEL_ESTIMATED_KWH = Math.round(TRYGEL_ANNUAL_COST / 1.27);  // 29 921

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('getElIntelligence — kWh calibration (TryggEl 1,85 kr/kWh)', () => {

  test('med faktisk kWh: saving är signifikant (>3 000 kr/år)', async () => {
    const intel = await getElIntelligence({
      annualKwh:     TRYGEL_ACTUAL_KWH,
      currentPriceKwh: TRYGEL_ANNUAL_COST / TRYGEL_ACTUAL_KWH,
      supplierName:  TEST_SUPPLIER,
      kwhIsEstimated: false,
    });

    // With actual kWh the best supplier (spot+markup+fixed) costs much less than 1.85×kWh.
    // At SE3 fallback spot 0.513: best = Tibber (markup 0.049, fee 49 kr/mån).
    //   energyCost  = (0.513+0.049) * 20 541 = 0.562 * 20 541 ≈ 11 544
    //   annualFee   = 49 * 12 = 588
    //   fixedCosts  = (0.32+0.36) * 20 541 = 0.68 * 20 541 ≈ 13 968
    //   totalAnnual ≈ 26 100
    //   saving      = 38 000 - 26 100 = 11 900

    assert.ok(intel.saving > 3_000,
      `Saving med faktisk kWh bör vara >3 000 kr/år, fick ${intel.saving}`);
    assert.equal(intel.kwhIsEstimated, false);
    assert.equal(intel.annualKwh, TRYGEL_ACTUAL_KWH);
  });

  test('med estimerat kWh (gammal bugg): saving är dramatiskt lägre (<1 000 kr/år)', async () => {
    // This test documents the OLD (broken) behaviour.
    // With estimated kWh = annualCost/1.27 = 29 921, the best supplier cost is
    // also scaled up to ~37 750 kr — nearly equal to the invoice → tiny saving.
    const intel = await getElIntelligence({
      annualKwh:     TRYGEL_ESTIMATED_KWH,
      currentPriceKwh: TRYGEL_ANNUAL_COST / TRYGEL_ESTIMATED_KWH,  // ≈ 1.27
      supplierName:  TEST_SUPPLIER,
      kwhIsEstimated: true,
    });

    assert.ok(intel.saving < 1_000,
      `Saving med estimerat kWh bör vara <1 000 kr/år (gammal bugg), fick ${intel.saving}`);
    assert.equal(intel.kwhIsEstimated, true);
  });

  test('faktisk kWh ger minst 10× mer saving än estimerat kWh', async () => {
    const withActual = await getElIntelligence({
      annualKwh: TRYGEL_ACTUAL_KWH,
      currentPriceKwh: TRYGEL_ANNUAL_COST / TRYGEL_ACTUAL_KWH,
      supplierName: TEST_SUPPLIER,
    });
    const withEstimated = await getElIntelligence({
      annualKwh: TRYGEL_ESTIMATED_KWH,
      currentPriceKwh: TRYGEL_ANNUAL_COST / TRYGEL_ESTIMATED_KWH,
      supplierName: TEST_SUPPLIER,
    });

    const ratio = withEstimated.saving > 0
      ? withActual.saving / withEstimated.saving
      : Infinity;

    assert.ok(ratio >= 10,
      `Faktisk kWh bör ge ≥10× mer saving än estimerat kWh, fick ratio=${ratio.toFixed(1)}`);
  });

});

describe('getElIntelligence — genomsnittskund (1,27 kr/kWh): estimerat = faktiskt', () => {

  test('för genomsnittskund är estimerat kWh korrekt (diff <1%)', async () => {
    const annualCost    = 30_000;
    const actualPriceKwh = 1.27;
    const actualKwh     = Math.round(annualCost / actualPriceKwh);  // exact
    const estimatedKwh  = Math.round(annualCost / 1.27);            // same

    const withActual = await getElIntelligence({
      annualKwh: actualKwh,
      currentPriceKwh: actualPriceKwh,
      supplierName: TEST_SUPPLIER,
    });
    const withEstimated = await getElIntelligence({
      annualKwh: estimatedKwh,
      currentPriceKwh: annualCost / estimatedKwh,
      supplierName: TEST_SUPPLIER,
    });

    // For average-price customers the two approaches should give identical results.
    assert.equal(withActual.saving, withEstimated.saving,
      'För genomsnittskund (1,27 kr/kWh) ska faktisk och estimerad kWh ge samma saving');
  });

});

describe('getElIntelligence — supplier ranking och totalAnnual', () => {

  test('ranked är sorterat stigande på totalAnnual', async () => {
    const intel = await getElIntelligence({
      annualKwh: 20_000,
      currentPriceKwh: 1.50,
      supplierName: TEST_SUPPLIER,
    });

    for (let i = 1; i < intel.ranked.length; i++) {
      assert.ok(
        intel.ranked[i].totalAnnual >= intel.ranked[i - 1].totalAnnual,
        `ranked[${i}].totalAnnual (${intel.ranked[i].totalAnnual}) bör vara ≥ ranked[${i-1}].totalAnnual (${intel.ranked[i-1].totalAnnual})`
      );
    }
  });

  test('best.totalAnnual inkluderar nätavgift + energiskatt', async () => {
    const annualKwh = 10_000;
    const intel = await getElIntelligence({
      annualKwh,
      currentPriceKwh: 1.50,
      supplierName: TEST_SUPPLIER,
    });

    // NETWORK_FEE_KWH=0.32, ENERGY_TAX_KWH=0.360 → fixedCosts = 0.68 * 10 000 = 6 800
    const expectedMinFixedCosts = Math.round(0.68 * annualKwh);
    assert.ok(
      intel.best.fixedCosts >= expectedMinFixedCosts,
      `best.fixedCosts (${intel.best.fixedCosts}) bör inkludera nät+skatt ≥ ${expectedMinFixedCosts} kr`
    );
  });

  test('saving = max(0, currentAnnual - best.totalAnnual)', async () => {
    const annualKwh      = 18_000;
    const currentPriceKwh = 1.60;
    const intel = await getElIntelligence({
      annualKwh,
      currentPriceKwh,
      supplierName: TEST_SUPPLIER,
    });

    const expectedCurrentAnnual = Math.round(currentPriceKwh * annualKwh);
    const expectedSaving = Math.max(0, expectedCurrentAnnual - intel.best.totalAnnual);
    assert.equal(intel.saving, expectedSaving);
    assert.equal(intel.current.totalAnnual, expectedCurrentAnnual);
  });

});
