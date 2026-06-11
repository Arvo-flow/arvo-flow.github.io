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

// ── Verklig faktura: Nordic Managed IT 8840219 (Lynxeye AB, juni 2026) ────────
// 58 × E3 à 420 kr + tilläggstjänster. Låser: (a) besparing claimas ENBART på
// E3-gapet, tilläggen passerar orörda, (b) billedUnitMonthly = radens à-pris
// (420), aldrig den blandade per-seat-totalen (683 — attribueringsfelet).

describe('Like-for-like — NMIT 8840219 (E3 + tilläggstjänster)', () => {
  const NMIT_LINES = [
    { type: 'recurring_subscription', description: 'Microsoft 365 E3 - Enterprise License', amount: 24_360, quantity: 58, unitPrice: 420, is_addon: false, addon_type: null, is_prorata: false },
    { type: 'recurring_subscription', description: 'Endpoint Protection Advanced', amount: 3_770, quantity: 58, unitPrice: 65, is_addon: true, addon_type: 'other', is_prorata: false },
    { type: 'recurring_subscription', description: 'Email Security & DMARC Premium', amount: 2_990, quantity: 1, unitPrice: 2_990, is_addon: true, addon_type: 'other', is_prorata: false },
    { type: 'recurring_subscription', description: 'SLA Avtal - Standard Support (8x5)', amount: 8_500, quantity: 1, unitPrice: 8_500, is_addon: true, addon_type: 'sla', is_prorata: false },
  ];
  const NMIT_ANNUAL = 39_620 * 12; // 475 440

  test('mål 450 871 kr — E3 till årsavtal, tilläggen orörda', async () => {
    const { computeLikeForLikeSaasTarget } = await import('../agents/recommender/recommend.js');
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const r = computeLikeForLikeSaasTarget(NMIT_LINES, BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, NMIT_ANNUAL);
    assert.equal(r.suggestedAnnualCost, 450_871);
    assert.equal(r.savingPerYear, 24_569);
  });

  test('billedUnitMonthly = E3-radens à-pris 420 kr (inte blandade 683)', async () => {
    const { computeLikeForLikeSaasTarget } = await import('../agents/recommender/recommend.js');
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const r = computeLikeForLikeSaasTarget(NMIT_LINES, BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, NMIT_ANNUAL);
    const e3 = r.tierLines.find(t => t.key === 'e3');
    assert.equal(e3.billedUnitMonthly, 420);
    assert.equal(e3.quantity, 58);
  });

  test('tilläggen passerar till fullt fakturapris (183 120 kr/år)', async () => {
    const { computeLikeForLikeSaasTarget } = await import('../agents/recommender/recommend.js');
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const r = computeLikeForLikeSaasTarget(NMIT_LINES, BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, NMIT_ANNUAL);
    const addonSum = r.addonLines.reduce((s, a) => s + a.addonAnnual, 0);
    assert.equal(addonSum, 183_120);
  });
});

// ── Attribueringslåset — LFL-resonemanget skrivs av kod, inte AI ──────────────
// 683-felet återkom i produktion 2026-06-11 TROTS ATTRIBUERING-regeln i prompten
// (färska körningar verifierade i Vercel-loggar). Promptregler är råd; detta är låset.

describe('Attribueringslåset — buildLikeForLikeReasoning (NMIT 8840219)', () => {
  const NMIT_LFL_LINES = [
    { type: 'recurring_subscription', description: 'Microsoft 365 E3 - Enterprise License', amount: 24_360, quantity: 58, unitPrice: 420, is_addon: false, addon_type: null, is_prorata: false },
    { type: 'recurring_subscription', description: 'Endpoint Protection Advanced', amount: 3_770, quantity: 58, unitPrice: 65, is_addon: true, addon_type: 'other', is_prorata: false },
    { type: 'recurring_subscription', description: 'Email Security & DMARC Premium', amount: 2_990, quantity: 1, unitPrice: 2_990, is_addon: true, addon_type: 'other', is_prorata: false },
    { type: 'recurring_subscription', description: 'SLA Avtal - Standard Support (8x5)', amount: 8_500, quantity: 1, unitPrice: 8_500, is_addon: true, addon_type: 'sla', is_prorata: false },
  ];

  async function buildNmitReasoning() {
    const { computeLikeForLikeSaasTarget, buildLikeForLikeReasoning } = await import('../agents/recommender/recommend.js');
    const { BRANCHINDEX } = await import('../agents/recommender/branchindex.js');
    const lfl = computeLikeForLikeSaasTarget(NMIT_LFL_LINES, BRANCHINDEX['saas-productivity'].licenseTierBenchmarks, 475_440);
    const text = buildLikeForLikeReasoning({
      supplier: 'Nordic Managed IT Services AB',
      lfl,
      annualCost: 475_440,
      suggestedAnnualCost: 450_871,
      savingPerYear: 24_569,
      billingCycleType: 'monthly',
    });
    // sv-SE-tusentalsavgränsare är hårt mellanslag (U+00A0/U+202F) — normalisera för asserts
    return text.replace(/[  ]/g, ' ');
  }

  test('texten attribuerar rätt: 420 kr = E3-radens à-pris, 384,70 = årsavtalet', async () => {
    const r = await buildNmitReasoning();
    assert.match(r, /420 kr per användare och månad för era 58 E3-licenser/);
    assert.match(r, /årsavtalspris[^.]*384,70 kr/);
  });

  test('683 (blandade per-seat-totalen) kan ALDRIG förekomma i texten', async () => {
    const r = await buildNmitReasoning();
    assert.ok(!r.includes('683'), `683-attribueringen återuppstod: "${r}"`);
  });

  test('årssiffrorna är kortets exakta tal: 475 440 → 450 871, gap 24 569', async () => {
    const r = await buildNmitReasoning();
    assert.match(r, /475 440 kr i dag mot 450 871 kr för identisk licensmix — 24 569 kr/);
  });

  test('tilläggen redovisas separat (183 120 kr/år) och E3-advisoryn är talfri', async () => {
    const r = await buildNmitReasoning();
    assert.match(r, /tilläggstjänster \(183 120 kr\/år\) ingår oförändrade/);
    assert.match(r, /Saknar ni E3-nivåns compliance-funktioner/);
  });

  test('varje tal i texten har källtäckning i LFL-fakta (prosakravet på oss själva)', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    const r = await buildNmitReasoning();
    const facts = '420 · 384,70 · 58 · 475 440 · 450 871 · 24 569 · 183 120 kr';
    const check = checkProseNumbers(r, facts);
    assert.equal(check.ok, true, JSON.stringify(check.violations));
  });

  test('ingen besparing → null (texten lovar aldrig utan grund)', async () => {
    const { buildLikeForLikeReasoning } = await import('../agents/recommender/recommend.js');
    assert.equal(buildLikeForLikeReasoning({ supplier: 'X', lfl: { tierLines: [] }, annualCost: 1, suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' }), null);
  });
});

// ── Prosakravet — varje tal i AI-prosa måste ha källtäckning ──────────────────

describe('Prosakravet — checkProseNumbers', () => {

  test('683-felet fångas: tal i prosan som saknas i fakta', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    const facts = 'Aktuellt pris/seat: 683 kr/mån. E3: 58 licenser · fakturerat à-pris 420 kr/mån → 384,70 kr/mån = 267 751 kr/år';
    // AI hittar på ett eget tal (t.ex. egen multiplikation 58×35,3 = 2047,4 → "2 047 kr")
    const r = checkProseNumbers('Ni sparar 2 047 kr per månad på gapet.', facts);
    assert.equal(r.ok, false);
    assert.ok(r.violations.includes('2047'));
  });

  test('sv-SE-format normaliseras: "475 440" i prosa = "475 440" i fakta', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    const r = checkProseNumbers(
      'Er årskostnad är 475 440 kr och årsavtalet kostar 384,70 kr per användare.',
      'annualCost: 475 440 kr · msrpAnnual 384.70 kr'
    );
    assert.equal(r.ok, true, JSON.stringify(r.violations));
  });

  test('decimalvarianter tillåts: 384,7 ↔ 384,70', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    assert.equal(checkProseNumbers('priset är 384,7 kr', 'fakta: 384,70 kr').ok, true);
    assert.equal(checkProseNumbers('priset är 384,70 kr', 'fakta: 384,7 kr').ok, true);
  });

  test('små uppräkningstal och arvodesprocent kräver ingen källa', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    const r = checkProseNumbers('I 3 steg: Arvo tar 20 % och återkommer inom 24 timmar.', 'inga tal här');
    assert.equal(r.ok, true, JSON.stringify(r.violations));
  });

  test('fail-open: tom/null prosa kraschar aldrig', async () => {
    const { checkProseNumbers } = await import('../lib/prose-guard.js');
    assert.equal(checkProseNumbers('', 'fakta').ok, true);
    assert.equal(checkProseNumbers(null, null).ok, true);
  });

});
