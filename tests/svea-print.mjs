// tests/svea-print.mjs — Svea Kontorsprint 440192 (Lynxeye AB, juni 2026).
//
// Fakturan som avslöjade fyra fel i print-analysen (regel 7 — varje fel låses):
//   1. Frontend ×0,80-haircut → 85 440 istället för kodens 106 800 (claims-audit låser)
//   2. "85 % mer per färgsida" — andel-av-priset-formeln felmärkt som "mer än"
//   3. Syntetiskt intervall "0,28–0,32" (= benchmark × 1,15) — fördelningsspråk utan fördelning
//   4. PRINT_BENCHMARKS (0,065/0,275) motsade BRANCHINDEX egen SMF-dokumentation
// Plus två missade fynd: "Ny tariff"-avgiften (5 940 kr/år) och maskinhyran (60 mån bindning).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeClickRates } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { detectFeeSignals } from '../lib/fee-signals.js';
import { judgeProjection, judgeLineArithmetic } from '../lib/extraction-integrity.js';

// Verklig faktura 440192 — netto 16 325 kr, klickandel 67 % (> 35 % ⇒ requires_quote)
const SVEA = [
  { type: 'recurring_subscription', description: 'Hyra MFP Kopiator (Avtal: 60 mån)',   amount: 4_900, quantity: 2,      unitPrice: 2_450 },
  { type: 'variable_usage',         description: 'Utskrifter Svart/Vit (avläst)',        amount: 3_550, quantity: 14_200, unitPrice: 0.25 },
  { type: 'variable_usage',         description: 'Utskrifter Färg (avläst)',             amount: 7_380, quantity: 4_100,  unitPrice: 1.80 },
  { type: 'recurring_subscription', description: 'Miljö- och adminavgift (Ny tariff)',   amount: 495,   quantity: 1,      unitPrice: 495 },
];

const run = () => analyzeClickRates(SVEA, 'Svea Kontorsprint & Leasing AB', { billingPeriod: 'monthly' });

describe('Svea 440192 — klickanalys med bandbenchmark', () => {

  test('fakturan är radbalanserad (B2)', () => {
    const r = judgeLineArithmetic({ lineItems: SVEA });
    assert.equal(r.balanced, true, JSON.stringify(r.violations));
  });

  test('benchmarken läses ur BRANCHINDEX — en källa (regel 1)', () => {
    const bm = BRANCHINDEX.skrivarleasing.clickRateBenchmarks;
    assert.deepEqual(bm.bw,    { low: 0.08, high: 0.15 });
    assert.deepEqual(bm.color, { low: 0.55, high: 1.00 });
    assert.equal(bm.source, 'estimated');
    const r = run();
    assert.deepEqual(r.bwBand, bm.bw);
    assert.deepEqual(r.colorBand, bm.color);
    assert.equal(r.benchmarkSource, 'estimated');
  });

  test('besparingsbandet är miniräknar-reproducerbart: 56 400–90 468 kr/år', () => {
    // low  = [3 550×(0,25−0,15)/0,25 + 7 380×(1,80−1,00)/1,80] × 12 = (1 420 + 3 280) × 12
    // high = [3 550×(0,25−0,08)/0,25 + 7 380×(1,80−0,55)/1,80] × 12 = (2 414 + 5 125) × 12
    const r = run();
    assert.equal(r.estimatedAnnualSavingsLow,  56_400);
    assert.equal(r.estimatedAnnualSavingsHigh, 90_468);
    assert.equal(r.estimatedAnnualSavingsGross, 56_400, 'alias = konservativa änden');
  });

  test('gap-procent har korrekt semantik: mot bandets topp, inte andel-av-priset', () => {
    const r = run();
    assert.equal(r.colorGapPct, 80,  '(1,80−1,00)/1,00 = 80 % mer än bandtopp');
    assert.equal(r.bwGapPct,    67,  '(0,25−0,15)/0,15 = 67 % mer än bandtopp');
  });

  test('85-felen kan aldrig återuppstå i copyn', () => {
    const r = run();
    assert.ok(!/85\s*%/.test(r.reasoning),        'andel-av-priset (85 %) får inte kallas "mer"');
    assert.ok(!/välförhandlat/.test(r.reasoning),  'inget "välförhandlat" utan partneravtal (regel 9)');
    assert.ok(!/0,28|0,32/.test(r.reasoning),      'det syntetiska intervallet är borta');
    assert.match(r.reasoning, /0,55–1 kr\/sida|0,55–1,00|0,55–1\b/, 'riktiga SMF-bandet visas');
    assert.match(r.reasoning, /estimat/,           'bandet märks som estimat (prisbokens semantik)');
  });

  test('Ny tariff-avgiften upptäcks: 495 kr/mån = 5 940 kr/år, först i copyn', () => {
    const r = run();
    assert.equal(r.feeSignals.length, 1);
    assert.equal(r.feeSignals[0].annualImpact, 5_940);
    assert.match(r.reasoning, /^Notera: leverantören har själv markerat en ny avgift/);
    assert.match(r.reasoning, /5 940 kr\/år/);
  });

  test('maskinhyran analyseras: 2 450 kr/mån, 2 maskiner, 60 mån bindning', () => {
    const r = run();
    assert.equal(r.lease.perMachineMonthly, 2_450);
    assert.equal(r.lease.machineCount, 2);
    assert.equal(r.lease.contractMonths, 60);
    assert.match(r.reasoning, /A4-normen 200–400 kr\/mån/);
    assert.match(r.reasoning, /60 månader överstiger marknadsnormen 36/);
  });

  test('multiplar i copyn: färg 1,8–3,3× och s/v 1,7–3,1×', () => {
    const r = run();
    assert.match(r.reasoning, /1,8–3,3×/);
    assert.match(r.reasoning, /1,7–3,1×/);
  });

  test('priceGapScore är ett tal 5–100 (pipeline-kontraktet)', () => {
    const r = run();
    assert.ok(typeof r.priceGapScore === 'number' && r.priceGapScore >= 5 && r.priceGapScore <= 100);
  });

  test('under bandet ⇒ ingen besparing claimas, fail-open utan klickrader', () => {
    const cheap = [
      { type: 'variable_usage', description: 'Utskrifter Svart/Vit', amount: 710, quantity: 14_200, unitPrice: 0.05 },
    ];
    const r = analyzeClickRates(cheap, 'X', { billingPeriod: 'monthly' });
    assert.equal(r.estimatedAnnualSavingsLow, null);
    assert.equal(r.estimatedAnnualSavingsHigh, null);
    assert.equal(analyzeClickRates([], 'X', null), null);
    assert.equal(analyzeClickRates(null, 'X', null), null);
  });

});

describe('Ny avgift-detektorn — detectFeeSignals', () => {

  test('svenska höjningsmarkörer fångas', () => {
    const hit = (d) => detectFeeSignals([{ description: d, amount: 100 }], 12).length === 1;
    assert.ok(hit('Miljö- och adminavgift (Ny tariff)'));
    assert.ok(hit('Serviceavgift — prisjustering 2026'));
    assert.ok(hit('Justerad avgift enligt index'));
    assert.ok(hit('Avgiftshöjning Q3'));
    assert.ok(hit('Indexuppräkning avtal'));
  });

  test('vanliga rader ger inga falsklarm', () => {
    assert.equal(detectFeeSignals([
      { description: 'Hyra MFP Kopiator (Avtal: 60 mån)', amount: 4_900 },
      { description: 'Utskrifter Färg (avläst)', amount: 7_380 },
      { description: 'Microsoft 365 Business Premium', amount: 11_025 },
    ], 12).length, 0);
  });

  test('annualImpact följer fakturaperioden', () => {
    assert.equal(detectFeeSignals([{ description: 'Ny avgift', amount: 100 }], 4)[0].annualImpact, 400);
  });

  test('fail-open: null kraschar aldrig', () => {
    assert.deepEqual(detectFeeSignals(null), []);
    assert.deepEqual(detectFeeSignals([{ description: null }]), []);
  });

});

describe('Projektionskravet — judgeProjection', () => {

  test('AI-projektion nära radsumman passerar (≤2 %)', () => {
    assert.equal(judgeProjection({ projectedFromAI: 5_400, recurringAmount: 5_395, proRataCount: 0 }).ok, true);
  });

  test('momsfaktor-avvikelse (×0,8 / ×1,25) underkänns', () => {
    const r1 = judgeProjection({ projectedFromAI: 4_316, recurringAmount: 5_395, proRataCount: 0 });
    assert.equal(r1.ok, false);
    assert.equal(r1.deviationPct, 20);
    const r2 = judgeProjection({ projectedFromAI: 6_743.75, recurringAmount: 5_395, proRataCount: 0 });
    assert.equal(r2.ok, false);
    assert.equal(r2.deviationPct, 25);
  });

  test('prorata-fakturor undantas — där ÄR projektionen avsiktligt avvikande', () => {
    assert.equal(judgeProjection({ projectedFromAI: 9_999, recurringAmount: 5_395, proRataCount: 2 }).ok, true);
  });

  test('fail-open: saknad data underkänner aldrig', () => {
    assert.equal(judgeProjection({ projectedFromAI: null, recurringAmount: 5_395, proRataCount: 0 }).ok, true);
    assert.equal(judgeProjection({ projectedFromAI: 5_000, recurringAmount: 0, proRataCount: 0 }).ok, true);
  });

});
