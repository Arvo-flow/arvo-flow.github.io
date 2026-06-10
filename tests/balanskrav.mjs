// tests/balanskrav.mjs — Balanskravet B2 (per-rad-aritmetik) + rad-först-skuggan.
//
// B1 (radsumma = fakturatotal) gatar redan i routeExtraction Ring 1.
// B2 dömer varje rad: antal × à-pris = radbelopp — kontrollen som fångar
// felläst kvantitet/à-pris innan exakt matematik körs på fel siffror.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
import { aggregateByCategory, classifyLine, shadowReport } from '../lib/invoice-lines.js';

const li = (description, amount, quantity, unitPrice, extra = {}) =>
  ({ type: 'recurring_subscription', description, amount, quantity, unitPrice, is_addon: false, is_prorata: false, ...extra });

// CloudReseller CR-88412 — verklig faktura med prorata, ska vara balanserad
const CR88412 = [
  li('Microsoft 365 Business Premium', 11_025, 45, 245),
  li('Microsoft 365 Business Standard', 2_700, 20, 135),
  li('Microsoft 365 Business Premium (Prorata tillägg)', 613, 5, 245, { type: 'one_time_fee', is_prorata: true }),
  li('Microsoft 365 Business Standard (Prorata tillägg)', 135, 3, 135, { type: 'one_time_fee', is_prorata: true }),
];

// Telenor 44991208 — 35 SIM à 299 + rörlig utlandssamtal
const TELENOR = [
  li('Telenor Företag 100GB', 10_465, 35, 299),
  li('Samtal Utland (Zon 2 - Rörligt)', 432, 1, 432, { type: 'variable_usage' }),
];

describe('Balanskravet B2 — judgeLineArithmetic', () => {

  test('CR-88412 (prorata-faktura) är balanserad', () => {
    const r = judgeLineArithmetic({ lineItems: CR88412 });
    assert.equal(r.balanced, true, JSON.stringify(r.violations));
    assert.equal(r.judged, 4);
  });

  test('Telenor-fakturan är balanserad (variable_usage bedöms inte)', () => {
    const r = judgeLineArithmetic({ lineItems: TELENOR });
    assert.equal(r.balanced, true);
    assert.equal(r.judged, 1, 'endast SIM-raden ska dömas');
  });

  test('felläst kvantitet fångas: 35 SIM lästa som 3', () => {
    const bad = [li('Telenor Företag 100GB', 10_465, 3, 299)]; // 3×299=897 ≠ 10 465
    const r = judgeLineArithmetic({ lineItems: bad });
    assert.equal(r.balanced, false);
    assert.equal(r.violations[0].reason, 'antal_x_apris_matchar_inte_radbelopp');
  });

  test('prorata-belopp ÖVER fullt pris fångas', () => {
    const bad = [li('Premium (Prorata)', 2_000, 5, 245, { type: 'one_time_fee', is_prorata: true })]; // > 5×245
    const r = judgeLineArithmetic({ lineItems: bad });
    assert.equal(r.balanced, false);
    assert.equal(r.violations[0].reason, 'prorata_belopp_överstiger_fullt_pris');
  });

  test('rader utan antal/à-pris hoppar fail-open (kan inte dömas)', () => {
    const r = judgeLineArithmetic({ lineItems: [li('Klumpsumma', 5_000, null, null)] });
    assert.equal(r.balanced, true);
    assert.equal(r.judged, 0);
  });

  test('öresavrundning inom tolerans (±max(2 kr, 2 %))', () => {
    const r = judgeLineArithmetic({ lineItems: [li('Abonnemang', 1_001, 10, 100)] }); // 1 kr diff
    assert.equal(r.balanced, true);
  });

  test('fail-open: null/sopig input kraschar aldrig', () => {
    assert.equal(judgeLineArithmetic(null).balanced, true);
    assert.equal(judgeLineArithmetic({}).balanced, true);
  });

});

describe('Rad-först-skuggan — aggregateByCategory', () => {

  test('blandad faktura (mobil + bredband) detekteras som flerkategori', () => {
    const lines = [
      li('Mobilabonnemang Företag 5 st', 1_745, 5, 349),
      li('Fiber 500 Mbit', 850, 1, 850),
    ];
    const agg = aggregateByCategory(lines);
    assert.equal(agg.isMultiCategory, true);
    assert.equal(agg.primary, 'mobil');
  });

  test('renodlad SaaS-faktura är enkategori, prorata till fullt pris i run-rate', () => {
    const agg = aggregateByCategory(CR88412);
    assert.equal(agg.isMultiCategory, false);
    assert.equal(agg.primary, 'saas');
    // run-rate = 13 725 ordinarie + 5×245 + 3×135 = 15 355
    assert.equal(agg.periodicTotal, 15_355);
  });

  test('engångsavgifter ingår inte i run-rate', () => {
    const lines = [li('Abonnemang', 1_000, 10, 100), li('Startavgift', 5_000, 1, 5_000, { type: 'one_time_fee' })];
    assert.equal(aggregateByCategory(lines).periodicTotal, 1_000);
  });

  test('classifyLine: svenska fakturaformuleringar', () => {
    assert.equal(classifyLine('Telenor Företag 100GB abonnemang'), 'mobil');
    assert.equal(classifyLine('Microsoft 365 Business Premium'), 'saas');
    assert.equal(classifyLine('Fiber 1000/1000 Mbit'), 'bredband');
    assert.equal(classifyLine('Elhandel rörligt pris 4 200 kWh'), 'el');
  });

  test('shadowReport kraschar aldrig och innehåller pipeline-kategorin', () => {
    assert.match(shadowReport(TELENOR, 'mobil'), /pipeline=mobil/);
    assert.match(shadowReport(null, 'mobil'), /SKUGGA/);
  });

});
