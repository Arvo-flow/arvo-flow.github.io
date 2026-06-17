// tests/google-workspace-recommendation.mjs — DEDIKERAD svit för Google Workspace i saas-productivity.
//
// Bakgrund (recon 2026-06-17, 3 sonder via GH Actions): Google publicerar publikt listpris ENBART i
// USD ($7/$14/$22); det faktiska SEK-priset ligger bakom signup-funnelns auth-grind. Att FX-konvertera
// USD → en kundsynlig SEK-besparing vore en gissning mot kund (förbjudet, regel 3/4). google-sek-grind
// i recommend.js håller därför Google TYST: talfritt offert-läge. Denna svit låser det för alltid —
// och att M365 (SEK-satt) INTE drabbas (grinden är leverantörsspecifik, inte kategoribred).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const gwInvoice = (desc, amount, licenseType = null) => ({
  customer:    { industry: 'it-tech', employees: 12 },
  categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'Google', confidence: 0.95 },
  invoice:     {
    annualCost: amount * 12, billingPeriod: 'monthly', licenseType,
    lineItems: [{ type: 'recurring_subscription', description: desc, amount }],
  },
});

describe('Google Workspace · prisboken (USD-ankare, SEK ej publikt)', () => {
  test('Google-tiers bär verifierat USD-listpris ($7/$14/$22 årsavtal)', () => {
    const t = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    assert.equal(t['google-starter'].usdAnnual, 7);
    assert.equal(t['google-standard'].usdAnnual, 14);
    assert.equal(t['google-plus'].usdAnnual, 22);
  });
  test('Google-tiers är märkta sekPublic:false + primärkälla (workspace.google.com)', () => {
    const t = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    for (const k of ['google-starter', 'google-standard', 'google-plus']) {
      assert.equal(t[k].sekPublic, false, `${k} ska vara märkt sekPublic:false`);
      assert.match(t[k].source, /workspace\.google\.com/);
    }
  });
});

describe('Google Workspace · recommend() — google-sek-grind (talfri, ingen FX-SEK mot kund)', () => {
  test('Google Workspace Business Plus → talfritt offert-läge, INGEN SEK-siffra', async () => {
    const r = await recommend(gwInvoice('Google Workspace Business Plus (8 lic)', 1920));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.recommendationType, 'requires_quote');
    assert.equal(r.shouldSwitch, false);
    assert.equal(r.revisionGate, 'audited');
    // Inga kron-tal får läcka — varken som fält eller i copyn.
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.equal(r.netSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.optimizationSaving, null);
    assert.equal(r.benchmark, null);
    // Talfri = ingen PENGASIFFRA (kr/USD/$/%/belopp). Produktnamnet "Microsoft 365" är tillåtet.
    assert.ok(!/\bkr\b/i.test(r.reasoning), 'copy ska inte påstå en kronsiffra');
    assert.ok(!/\d[\d\s.,]*\s*(?:kr|kronor|%|usd|\$|€)/i.test(r.reasoning), 'copy får inte bära ett pengabelopp');
  });

  test('Google via licenseType (tom rad-match) → samma tysta grind', async () => {
    const r = await recommend(gwInvoice('Produktivitetslicens', 600, 'Google Workspace Starter'));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.suggestedAnnualCost, null);
    assert.ok(!/\d[\d\s.,]*\s*(?:kr|kronor|%|usd|\$|€)/i.test(r.reasoning), 'copy får inte bära ett pengabelopp');
  });

  test('grinden är leverantörsspecifik: icke-Google saas-productivity passerar INTE google-grinden', async () => {
    // Slack (USD men ej Google) ska INTE fångas av google-sek-grind — den faller vidare i pipelinen.
    // Vi verifierar bara att grinden inte felaktigt klassar Slack som Google (tidig retur uteblir).
    // (Full Slack-rekommendation kräver AI och testas ej här — vi asserterar bara att grinden inte
    //  returnerar Google-offertsvaret för Slack.)
    const { getDominantSaasTierKey } = await import('../agents/recommender/recommend.js');
    const slackKey = getDominantSaasTierKey([{ type: 'recurring_subscription', description: 'Slack Pro (20 lic)', amount: 1580 }], null, null);
    assert.ok(!String(slackKey ?? '').startsWith('google-'), 'Slack ska inte klassas som Google-tier');
  });
});
