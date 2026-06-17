// tests/spiris-recommendation.mjs — DEDIKERAD revisionssvit för saas-finance (Spiris/Visma eEkonomi).
// Låser rätt-storleks-aritmetiken mot TVÅ verifierade publika Spiris-priser + att den vendor-
// agnostiska motorn dispatchar rätt (Fortnox vs Spiris). Del av beviset revisionsgrinden kräver.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { saasFinanceRightsizing } from '../lib/fortnox-rightsizing.js';
import { recommend } from '../agents/recommender/recommend.js';

const inv = (desc, amount = null) => [{ type: 'recurring_subscription', description: desc, amount }];

describe('Spiris · rätt-storleks-rådgivning (verifierad prisskillnad)', () => {
  test('Skala → Driva: 200 kr/mån × 12 = 2 400 kr/år', () => {
    const r = saasFinanceRightsizing(inv('Spiris Skala', 549));
    assert.equal(r.vendor, 'Spiris');
    assert.equal(r.currentPaket, 'Skala');
    assert.equal(r.targetPaket, 'Driva');
    assert.equal(r.deltaMonthly, 200);
    assert.equal(r.annualSaving, 2400);
    assert.equal(r.needsReview, true);
  });
  test('Lyfta → Växa: 500 kr/mån × 12 = 6 000 kr/år', () => {
    const r = saasFinanceRightsizing(inv('Spiris Lyfta', 1249));
    assert.equal(r.targetPaket, 'Växa');
    assert.equal(r.annualSaving, 6000);
  });
  test('Driva → Starta: 150 kr/mån × 12 = 1 800 kr/år', () => {
    assert.equal(saasFinanceRightsizing(inv('Spiris Driva', 349)).annualSaving, 1800);
  });
  test('Starta → null (billigaste nivån)', () => {
    assert.equal(saasFinanceRightsizing(inv('Spiris Starta', 199)), null);
  });
  test('legacy "Visma eEkonomi"-rad känns igen på nuvarande nivånamn', () => {
    const r = saasFinanceRightsizing(inv('Visma eEkonomi Skala', 549));
    assert.equal(r.vendor, 'Spiris');
    assert.equal(r.targetPaket, 'Driva');
  });
  test('reviewPrompt bär rätt vendor + verifierade tal', () => {
    const r = saasFinanceRightsizing(inv('Spiris Skala', 549));
    assert.match(r.reviewPrompt, /Spiris-nivån Skala \(549 kr\/mån\)/);
    assert.match(r.reviewPrompt, /Driva, kostar 349 kr\/mån/);
    assert.match(r.reviewPrompt, /realiserar vi 2400 kr\/år/);
    assert.match(r.note, /spiris\.se\/priser/);
  });
});

describe('saas-finance · vendor-agnostisk dispatch', () => {
  test('Fortnox-faktura → Fortnox-config', () => {
    assert.equal(saasFinanceRightsizing(inv('Fortnox Paket Stor', 710)).vendor, 'Fortnox');
  });
  test('Spiris-faktura → Spiris-config', () => {
    assert.equal(saasFinanceRightsizing(inv('Spiris Skala', 549)).vendor, 'Spiris');
  });
  test('okänt system → null (ingen estimerad siffra)', () => {
    assert.equal(saasFinanceRightsizing(inv('Bokio Gratis', 0)), null);
  });
});

describe('Spiris · recommend() end-to-end (deterministisk, ingen AI)', () => {
  const spirisInvoice = (desc, amount) => ({
    customer:    { industry: 'konsult', employees: 8 },
    categorized: { category: 'saas-finance', subType: 'affärssystem', normalizedSupplier: 'Spiris', confidence: 0.95 },
    invoice:     { annualCost: amount * 12, billingPeriod: 'monthly', lineItems: [{ type: 'recurring_subscription', description: desc, amount }] },
  });

  test('Spiris Skala → komplett rätt-storleks-rekommendation (Driva, 2 400 kr/år potential)', async () => {
    const r = await recommend(spirisInvoice('Spiris Skala', 549));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.suggestedSupplier, 'Spiris Driva');
    assert.equal(r.fortnoxRightsizing.vendor, 'Spiris');
    assert.equal(r.fortnoxRightsizing.annualSaving, 2400);
    assert.equal(r.optimizationSaving, null); // advisory/review
    assert.match(r.reasoning, /2400 kr\/år/);
  });
});
