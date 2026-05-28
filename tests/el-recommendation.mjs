// tests/el-recommendation.mjs
// Enhetstester för computeElRecommendation — lib/el-recommendation.js
//
// Kör: node --test tests/el-recommendation.mjs
// Eller via: npm run test:algo (inkluderas i run.mjs)
//
// Varje testfall speglar ett faktiskt bugg-scenario eller en kritisk gren
// i beräkningslogiken. Rätta värden är beräknade för hand mot kända konstanter.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeElRecommendation,
  INDUSTRY_MONTHLY_FRACTIONS,
  EL_BENCHMARK_KWH,
  ENERGISKATT_ESTIMATE_KWH,
} from '../lib/el-recommendation.js';

// ── Hjälpfunktion ─────────────────────────────────────────────────────────────

function elRec(overrides) {
  return computeElRecommendation({
    elKwh:           10_000,
    elBillingMonth:  'mars',
    elOmrade:        'SE3',
    elEnergiPerKwh:  0.800,
    elPriceExplicit: true,
    elSkatterKr:     1_000,
    lineItems:       [],
    ...overrides,
  }, overrides._industry ?? 'ovrigt');
}

// ── EL-REC-01 ─────────────────────────────────────────────────────────────────
// Nordic Kraft-caset (den verkliga buggen vi fixade):
// Kombinerad faktura juli/tillverkning — fast nätavgift × 12, rörlig / fraction.
describe('EL-REC-01 · Nordic Kraft kombinerad — fast nätavgift ×12, rörlig /fraction', () => {
  // Kända värden: fraction(tillverkning, juli) = 0.055
  const FRACTION = INDUSTRY_MONTHLY_FRACTIONS.tillverkning.juli; // 0.055
  const KWH      = 10_120;
  const NAT_FAST = 1_250;
  const NAT_VAR  = 2_285;
  const ENERGI   = 0.650;

  const expectedAnnualKwh      = Math.round(KWH / FRACTION);               // 184 000
  const expectedNatFixed       = NAT_FAST * 12;                             // 15 000
  const expectedNatVar         = Math.round(NAT_VAR / FRACTION);            // 41 545
  const expectedNatavgift      = expectedNatFixed + expectedNatVar;         // 56 545
  const expectedCurrentGross   = Math.round(ENERGI * expectedAnnualKwh);   // 119 600
  const expectedBenchmark      = Math.round(EL_BENCHMARK_KWH.SE3.summer * expectedAnnualKwh); // 73 600
  const expectedGrossSaving    = expectedCurrentGross - expectedBenchmark;  // 46 000
  const expectedNetSaving      = expectedGrossSaving - Math.round(expectedGrossSaving * 0.20); // 36 800

  let result;
  test('setup', () => {
    result = computeElRecommendation({
      elKwh:            KWH,
      elBillingMonth:   'juli',
      elOmrade:         'SE3',
      elEnergiPerKwh:   ENERGI,
      elPriceExplicit:  true,
      elSkatterKr:      4_331,
      elNatFastAvgiftKr: NAT_FAST,
      elFastAvgiftKr:   null,
      lineItems: [
        { description: 'Elnät fast abonnemangsavgift', type: 'recurring_subscription', amount: NAT_FAST },
        { description: 'Rörlig överföringsavgift',     type: 'recurring_subscription', amount: NAT_VAR  },
      ],
    }, 'tillverkning');
    assert.notStrictEqual(result, null, 'ska returnera ett resultat');
  });

  test('annualKwh = 184 000', () => assert.strictEqual(result.annualKwh, expectedAnnualKwh));
  test('elNatavgiftAnnual = 56 545 (fast×12 + rörlig/fraction)', () => assert.strictEqual(result.elNatavgiftAnnual, expectedNatavgift));
  test('currentAnnualGross = 119 600', () => assert.strictEqual(result.currentAnnualGross, expectedCurrentGross));
  test('netSaving = 36 800', () => assert.strictEqual(result.netSaving, expectedNetSaving));
  test('shouldSwitch = true', () => assert.strictEqual(result.shouldSwitch, true));
  test('nätägarens avgift ingår INTE i currentAnnualGross (fast abonnemang = null)', () => {
    // Om nätavgiften felaktigt hade inkluderats vore currentAnnualGross ~134 600
    assert.ok(result.currentAnnualGross < 130_000, `currentAnnualGross ${result.currentAnnualGross} ska vara < 130 000`);
  });
});

// ── EL-REC-02 ─────────────────────────────────────────────────────────────────
// Ingen nätavgift i lineItems men elNatFastAvgiftKr satt → fallback till ×12.
describe('EL-REC-02 · Fallback: elNatFastAvgiftKr utan lineItems → ×12', () => {
  test('elNatavgiftAnnual = natFast × 12 när inga lineItems matchar regex', () => {
    const result = elRec({ elNatFastAvgiftKr: 800, lineItems: [] });
    // Ingen rörlig del → 800 × 12 = 9 600
    assert.strictEqual(result.elNatavgiftAnnual, 800 * 12);
  });
});

// ── EL-REC-03 ─────────────────────────────────────────────────────────────────
// Tidigare bug: nätägarens avgift hamnade i currentAnnualGross via elFastAvgiftKr.
// elFastAvgiftKr ska ENBART vara elhandlarens avgift.
describe('EL-REC-03 · elFastAvgiftKr ×12 ingår i currentAnnualGross (elhandlare)', () => {
  test('elhandlarens fasta avgift 50 kr/mån → +600 kr/år i currentAnnualGross', () => {
    const withFee    = elRec({ elFastAvgiftKr: 50 });
    const withoutFee = elRec({ elFastAvgiftKr: null });
    assert.strictEqual(
      withFee.currentAnnualGross - withoutFee.currentAnnualGross,
      50 * 12,
    );
  });

  test('elNatFastAvgiftKr ingår INTE i currentAnnualGross', () => {
    const withNat    = elRec({ elNatFastAvgiftKr: 1_250, lineItems: [] });
    const withoutNat = elRec({ elNatFastAvgiftKr: null,  lineItems: [] });
    assert.strictEqual(
      withNat.currentAnnualGross,
      withoutNat.currentAnnualGross,
      'nätägarens avgift ska inte påverka currentAnnualGross',
    );
  });
});

// ── EL-REC-04 ─────────────────────────────────────────────────────────────────
// Energiskatt inbakad: explicit kr/kWh men ingen separat skatterrad.
describe('EL-REC-04 · Energiskatt inbakad — dras av ur energiPerKwhNet', () => {
  test('energiPerKwh reduceras med ENERGISKATT_ESTIMATE_KWH när elSkatterKr saknas', () => {
    const result = elRec({ elPriceExplicit: true, elSkatterKr: null, elEnergiPerKwh: 1.000 });
    assert.strictEqual(result.energiPerKwh, Math.max(0, 1.000 - ENERGISKATT_ESTIMATE_KWH));
  });

  test('energiPerKwh oförändrat när elSkatterKr är angivet', () => {
    const result = elRec({ elPriceExplicit: true, elSkatterKr: 500, elEnergiPerKwh: 0.800 });
    assert.strictEqual(result.energiPerKwh, 0.800);
  });

  test('energiPerKwh oförändrat när elPriceExplicit = false (deriverat pris)', () => {
    const result = elRec({ elPriceExplicit: false, elSkatterKr: null, elEnergiPerKwh: 0.700 });
    assert.strictEqual(result.energiPerKwh, 0.700);
  });
});

// ── EL-REC-05 ─────────────────────────────────────────────────────────────────
// Konkurrenskraftigt avtal — shouldSwitch = false.
describe('EL-REC-05 · Konkurrenskraftigt avtal — shouldSwitch = false', () => {
  test('pris under benchmark → grossSaving = 0, shouldSwitch = false', () => {
    // SE3 sommar benchmark = 0.40 kr/kWh. Faktura 0.35 → under benchmark.
    const result = computeElRecommendation({
      elKwh: 5_000, elBillingMonth: 'juli', elOmrade: 'SE3',
      elEnergiPerKwh: 0.35, elPriceExplicit: true, elSkatterKr: 200, lineItems: [],
    }, 'konsult');
    assert.strictEqual(result.shouldSwitch, false);
    assert.strictEqual(result.grossSaving, 0);
    assert.strictEqual(result.netSaving, 0);
    assert.notStrictEqual(result.monitoringNote, null, 'ska ha monitoringNote');
  });

  test('precis på gränsen (< 500 kr besparing) → shouldSwitch = false', () => {
    // Konstruera så att grossSaving = 499
    const fraction     = INDUSTRY_MONTHLY_FRACTIONS.ovrigt.mars;   // 0.094
    const annualKwh    = Math.round(1_000 / fraction);
    const benchmark    = EL_BENCHMARK_KWH.SE3.spring_fall;          // 0.63
    // Energipris som ger precis 499 kr under benchmark
    const targetGross  = Math.round(benchmark * annualKwh) + 499;
    const neededPerKwh = targetGross / annualKwh;
    const result = computeElRecommendation({
      elKwh: 1_000, elBillingMonth: 'mars', elOmrade: 'SE3',
      elEnergiPerKwh: neededPerKwh, elPriceExplicit: true, elSkatterKr: 50, lineItems: [],
    }, 'ovrigt');
    assert.strictEqual(result.shouldSwitch, false);
  });
});

// ── EL-REC-06 ─────────────────────────────────────────────────────────────────
// Spotpris-cap: benchmark justeras upp om spotpris > benchmarkRaw.
describe('EL-REC-06 · Spotpris-cap — benchmark justeras upp', () => {
  test('invoiceSpotPrice > benchmark → benchmarkKwh = spotPrice + 0.020', () => {
    const highSpot = EL_BENCHMARK_KWH.SE3.summer + 0.10; // 0.50 > 0.40
    const result = computeElRecommendation({
      elKwh: 5_000, elBillingMonth: 'juli', elOmrade: 'SE3',
      elEnergiPerKwh: 0.55, elPriceExplicit: true, elSkatterKr: 200,
      elSpotPriceKwh: highSpot, lineItems: [],
    }, 'konsult');
    assert.strictEqual(result.benchmarkKwh, highSpot + 0.020);
  });

  test('invoiceSpotPrice < benchmark → benchmarkKwh oförändrat', () => {
    const lowSpot = EL_BENCHMARK_KWH.SE3.summer - 0.10; // 0.30 < 0.40
    const result = computeElRecommendation({
      elKwh: 5_000, elBillingMonth: 'juli', elOmrade: 'SE3',
      elEnergiPerKwh: 0.60, elPriceExplicit: true, elSkatterKr: 200,
      elSpotPriceKwh: lowSpot, lineItems: [],
    }, 'konsult');
    assert.strictEqual(result.benchmarkKwh, EL_BENCHMARK_KWH.SE3.summer);
  });
});

// ── EL-REC-07 ─────────────────────────────────────────────────────────────────
// Säsongsfrakter: hotell juli (hög säsong) → annualKwh LÄGRE än tillverkning juli.
describe('EL-REC-07 · Branschfraktioner — hotell juli vs tillverkning juli', () => {
  test('hotell juli (0.115) → lägre annualKwh än tillverkning juli (0.055)', () => {
    const kwh = 5_000;
    const hotell      = computeElRecommendation({ elKwh: kwh, elBillingMonth: 'juli', elOmrade: 'SE3', elEnergiPerKwh: 0.80, elPriceExplicit: true, elSkatterKr: 100, lineItems: [] }, 'hotell');
    const tillverkning = computeElRecommendation({ elKwh: kwh, elBillingMonth: 'juli', elOmrade: 'SE3', elEnergiPerKwh: 0.80, elPriceExplicit: true, elSkatterKr: 100, lineItems: [] }, 'tillverkning');
    assert.ok(
      hotell.annualKwh < tillverkning.annualKwh,
      `hotell ${hotell.annualKwh} ska vara < tillverkning ${tillverkning.annualKwh}`,
    );
  });

  test('ovrigt (default) används om okänd bransch', () => {
    const result = computeElRecommendation({ elKwh: 5_000, elBillingMonth: 'mars', elOmrade: 'SE3', elEnergiPerKwh: 0.80, elPriceExplicit: true, elSkatterKr: 100, lineItems: [] }, 'okänd-bransch');
    const fraction = INDUSTRY_MONTHLY_FRACTIONS.ovrigt.mars;
    assert.strictEqual(result.annualKwh, Math.round(5_000 / fraction));
  });
});

// ── EL-REC-08 ─────────────────────────────────────────────────────────────────
// Inga kWh → null.
describe('EL-REC-08 · Saknar kWh-data → null', () => {
  test('elKwh = null → null', () => {
    const result = computeElRecommendation({ elKwh: null, elBillingMonth: 'mars', elOmrade: 'SE3', elEnergiPerKwh: 0.80, elPriceExplicit: true, lineItems: [] });
    assert.strictEqual(result, null);
  });

  test('elKwh = 0 → null', () => {
    const result = computeElRecommendation({ elKwh: 0, elBillingMonth: 'mars', elOmrade: 'SE3', elEnergiPerKwh: 0.80, elPriceExplicit: true, lineItems: [] });
    assert.strictEqual(result, null);
  });
});

// ── EL-REC-09 ─────────────────────────────────────────────────────────────────
// Priset deriverat (inget explicit kr/kWh) — beräknas från recurringAmount.
describe('EL-REC-09 · Deriverat energipris från recurringAmount', () => {
  test('energiPerKwh = recurringAmount / kwh när elEnergiPerKwh saknas', () => {
    const kwh = 8_000;
    const recurring = 6_400; // → 0.80 kr/kWh
    const result = computeElRecommendation({
      elKwh: kwh, elBillingMonth: 'mars', elOmrade: 'SE3',
      elEnergiPerKwh: null, elPriceExplicit: false,
      recurringAmount: recurring, lineItems: [],
    }, 'ovrigt');
    assert.notStrictEqual(result, null);
    // energiPerKwh (gross) = 0.80 — visas som energiPerKwhGross
    assert.strictEqual(result.energiPerKwhGross, 0.80);
  });
});

// ── EL-REC-10 ─────────────────────────────────────────────────────────────────
// arvoFee = 20 % av grossSaving, netSaving = grossSaving - arvoFee.
describe('EL-REC-10 · Besparingsaritmetik — arvoFee 20 %, netSaving korrekt', () => {
  test('arvoFee = round(grossSaving × 0.20), netSaving = grossSaving − arvoFee', () => {
    const result = elRec({ elEnergiPerKwh: 1.20, elBillingMonth: 'januari', _industry: 'ovrigt' });
    assert.strictEqual(result.arvoFee, Math.round(result.grossSaving * 0.20));
    assert.strictEqual(result.netSaving, result.grossSaving - result.arvoFee);
  });
});
