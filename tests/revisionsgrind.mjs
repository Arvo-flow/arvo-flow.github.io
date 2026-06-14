// tests/revisionsgrind.mjs — Revisionsgrinden: precision eller tystnad som arkitektur.
//
// Låser kontraktet i lib/revision-gate.js: en oreviderad kategori kan ALDRIG
// visa en siffra för kund — den faller till talfritt offert-läge före all
// beräkning och före AI-anropet. scripts/sifferrevisor.mjs bevisar samma
// garanti uttömmande i pre-commit; den här sviten låser kontraktets form.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isAudited, ungatedQuoteResponse, REVIDERADE_KATEGORIER } from '../lib/revision-gate.js';
import { recommend } from '../agents/recommender/recommend.js';
import { CATEGORIES } from '../agents/categorizer/categories.js';

const input = (category) => ({
  customer:    { industry: 'konsult', employees: 10 },
  categorized: { category, normalizedSupplier: 'Testleverantör AB', confidence: 0.9 },
  invoice: {
    recurringAmount: 5_000, variableCharges: 0, annualCost: 60_000,
    billingPeriod: 'monthly',
    lineItems: [{ type: 'recurring_subscription', description: 'Tjänst', amount: 5_000, quantity: 1, unitPrice: 5_000 }],
  },
});

describe('Revisionsgrinden — tystnadsgarantin', () => {

  test('oreviderad kategori → offert-läge utan en enda siffra', async () => {
    const r = await recommend(input('saas-crm'));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.revisionGate, 'unaudited');
    assert.equal(r.grossSaving, null);
    assert.equal(r.netSaving, null);
    assert.equal(r.suggestedAnnualCost, null);
    assert.ok(!/\d/.test(r.reasoning), `copyn ska vara talfri: "${r.reasoning}"`);
  });

  test('grinden kortsluter FÖRE beräkning — ingen benchmark, inget AI-anrop', async () => {
    // Inget API-nyckelkrav, ingen nätverksåtkomst: körbar offline = beviset.
    const r = await recommend(input('forsakring-foretag'));
    assert.equal(r.benchmark, null);
    assert.equal(r.usage.input_tokens, 0);
  });

  test('reviderade kategorier passerar grinden', () => {
    for (const cat of ['saas-productivity', 'mobil', 'bredband', 'el', 'kortterminal']) {
      assert.equal(isAudited(cat), true, `${cat} ska vara reviderad`);
    }
  });

  test('skrivarleasing är GATAD (ingen publik klickpris-källa) → ej reviderad', () => {
    assert.equal(isAudited('skrivarleasing'), false,
      'skrivarleasing ska vara gatad till offert-läge tills verifierbar källa finns');
  });

  test('varje reviderad kategori finns i kategoriserarens utrymme', () => {
    for (const cat of REVIDERADE_KATEGORIER.keys()) {
      assert.ok(CATEGORIES[cat], `'${cat}' i grinden saknas i CATEGORIES`);
    }
  });

  test('offert-copyn är talfri per konstruktion, även med okänd etikett', () => {
    assert.ok(!/\d/.test(ungatedQuoteResponse('x', null).reasoning));
    assert.ok(!/\d/.test(ungatedQuoteResponse('saas-crm', 'CRM-system').reasoning));
  });

  test('skrivarleasing faller till talfritt offert-läge efter grinden (offline)', async () => {
    // Samma klickdominanta Svea-faktura — men skrivarleasing är nu GATAD: inga siffror får nå kund.
    const r = await recommend({
      customer:    { industry: 'konsult', employees: 10 },
      categorized: { category: 'skrivarleasing', normalizedSupplier: 'Svea Kontorsprint & Leasing AB', confidence: 0.95 },
      invoice: {
        recurringAmount: 5_395, variableCharges: 10_930, annualCost: 64_740,
        billingPeriod: 'monthly',
        lineItems: [
          { type: 'recurring_subscription', description: 'Hyra MFP Kopiator (Avtal: 60 mån)', amount: 4_900, quantity: 2, unitPrice: 2_450 },
          { type: 'variable_usage', description: 'Utskrifter Svart/Vit (avläst)', amount: 3_550, quantity: 14_200, unitPrice: 0.25 },
          { type: 'variable_usage', description: 'Utskrifter Färg (avläst)', amount: 7_380, quantity: 4_100, unitPrice: 1.8 },
          { type: 'recurring_subscription', description: 'Miljö- och adminavgift (Ny tariff)', amount: 495, quantity: 1, unitPrice: 495 },
        ],
      },
    });
    assert.equal(r.revisionGate, 'unaudited');
    assert.equal(r.requiresQuote, true);
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.ok(!r.clickRateAnalysis, 'inga klick-siffror får nå kund i offert-läge');
    assert.ok(!/\d/.test(r.reasoning), 'offert-copyn ska vara talfri');
  });

});
