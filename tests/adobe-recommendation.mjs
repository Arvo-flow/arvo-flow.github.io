// tests/adobe-recommendation.mjs — DEDIKERAD revisionssvit för saas-creative (Adobe). recommend() kortsluter
// till den deterministiska Adobe-grenen FÖRE AI-anropet (som fortnox/google) → körs offline. Låser att
// All Apps → Single App-rådgivningen når kund med verifierad exkl-moms-siffra, advisory (optimizationSaving
// null), och att en team-faktura aldrig jämförs mot individpris. Detta är beviset revisionsgrinden kräver.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../agents/recommender/recommend.js';

const adobeInvoice = (desc, amount, quantity = null, seatCount = null) => ({
  customer:    { industry: 'byraer', employees: 6 },
  categorized: { category: 'saas-creative', subType: 'adobe', normalizedSupplier: 'Adobe', confidence: 0.95 },
  invoice:     { annualCost: (amount ?? 0) * 12, billingPeriod: 'monthly', seatCount,
                 lineItems: [{ type: 'recurring_subscription', description: desc, amount, quantity }] },
});

describe('Adobe · recommend() end-to-end (deterministisk, ingen AI)', () => {
  test('Team All Apps × 4 → optimize: Single App, 28 992 kr/år advisory, ingen realiserad siffra', async () => {
    const r = await recommend(adobeInvoice('Adobe Creative Cloud for Teams - Alla program', 3940, 4, 4));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.requiresQuote, false);
    assert.equal(r.shouldSwitch, false);
    assert.equal(r.revisionGate, 'audited');
    assert.ok(r.adobeRightsizing, 'adobeRightsizing-data ska finnas');
    assert.equal(r.adobeRightsizing.sku, 'team');
    assert.equal(r.adobeRightsizing.targetTier, 'single-app');
    assert.equal(r.adobeRightsizing.perSeatDelta, 604);
    assert.equal(r.adobeRightsizing.annualSaving, 28992);
    assert.equal(r.suggestedSupplier, 'Adobe Fristående program (Single App)');
    // Advisory/review: ingen påstådd realiserad besparing förrän kunden bekräftat.
    assert.equal(r.optimizationSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.grossSaving, null);
    assert.match(r.reasoning, /985,00 kr\/licens\/mån exkl moms/);
  });

  test('Individ All Apps × 3 → optimize med de-momsade tal (746→249, 17 892 kr/år)', async () => {
    const r = await recommend(adobeInvoice('Adobe Creative Cloud Alla program', 1000, 3, 3));
    assert.equal(r.recommendationType, 'optimize');
    assert.equal(r.adobeRightsizing.sku, 'individual');
    assert.equal(r.adobeRightsizing.currentMonthlyExVat, 746);
    assert.equal(r.adobeRightsizing.annualSaving, 17892);
    assert.equal(r.optimizationSaving, null);
  });

  test('Redan Single App → offert-läge, ingen nedförsäljning (adobeRightsizing null)', async () => {
    const r = await recommend(adobeInvoice('Adobe Photoshop', 400, 2, 2));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.adobeRightsizing, null);
    assert.equal(r.revisionGate, 'audited');
    assert.equal(r.suggestedAnnualCost, null);
  });

  test('Oigenkänd kreativ-rad → talfritt offert-läge', async () => {
    const r = await recommend(adobeInvoice('Designtjänst diverse', 800, 1, 1));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.adobeRightsizing, null);
    assert.ok(!/\d[\d\s.,]*\s*kr/i.test(r.reasoning), 'offert-copy ska vara talfri om paket okänt');
  });
});
