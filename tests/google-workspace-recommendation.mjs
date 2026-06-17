// tests/google-workspace-recommendation.mjs — DEDIKERAD svit för Google Workspace i saas-productivity.
//
// Bakgrund (recon 2026-06-17, 3 sonder via GH Actions): Google publicerar publikt listpris ENBART i
// USD ($7/$14/$22); det faktiska SEK-priset ligger bakom signup-funnelns auth-grind. Att FX-konvertera
// USD → en kundsynlig SEK-besparing vore en gissning mot kund (förbjudet, regel 3/4). google-sek-grind
// i recommend.js håller därför Google TYST om sitt eget pris: ingen Google-siffra, ingen besparing.
//
// MEN: den BEVISADE datan (M365, verifierat SEK) agerar benchmark för den OBEVISADE. Kortet bär vad den
// LIKVÄRDIGA Microsoft-sviten kostar i SEK för kundens volym — Microsofts pris, aldrig en Google-proxy.
// Denna svit låser: (a) ingen Google-siffra/FX/besparing, (b) korrekt M365-referens (rätt nivå × säten),
// (c) M365 (SEK-satt) drabbas inte av grinden.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../agents/recommender/recommend.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { m365EquivalentForGoogle, deriveGoogleSeats } from '../lib/m365-equivalent.js';

const gwInvoice = (desc, amount, licenseType = null, extra = {}) => ({
  customer:    { industry: 'it-tech', employees: 12 },
  categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'Google', confidence: 0.95 },
  invoice:     {
    annualCost: amount * 12, billingPeriod: 'monthly', licenseType,
    lineItems: [{ type: 'recurring_subscription', description: desc, amount }], ...extra,
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

describe('M365-referens · bevisad data benchmarkar obevisad (enhetstester)', () => {
  test('seat-härledning: seatCount > "(N lic)" > rad-quantity; aldrig employees', () => {
    assert.equal(deriveGoogleSeats({ seatCount: 14, lineItems: [] }), 14);
    assert.equal(deriveGoogleSeats({ lineItems: [{ description: 'Google Workspace Business Plus (8 lic)' }] }), 8);
    assert.equal(deriveGoogleSeats({ lineItems: [{ description: 'Google Workspace Standard', quantity: 11 }] }), 11);
    assert.equal(deriveGoogleSeats({ lineItems: [{ description: 'Något annat utan licensantal' }] }), null);
  });

  test('Google Plus → M365 Business Premium, 210,29 kr/anv/mån × 8 = 1 682 kr/mån (verifierat SEK)', () => {
    const r = m365EquivalentForGoogle('google-plus', 8);
    assert.equal(r.m365Tier, 'business-premium');
    assert.equal(r.perSeatMonthly, 210.29);
    assert.equal(r.perSeatMonthlyLabel, '210,29');
    assert.equal(r.seats, 8);
    assert.equal(r.monthlyTotal, 1682);          // round(210.29 × 8)
    assert.equal(r.annualTotal, 1682 * 12);
    assert.match(r.source, /microsoft\.com/);
  });
  test('Google Standard → M365 Business Standard, 119,48 × 10 = 1 195 kr/mån', () => {
    const r = m365EquivalentForGoogle('google-standard', 10);
    assert.equal(r.m365Tier, 'business-standard');
    assert.equal(r.perSeatMonthly, 119.48);
    assert.equal(r.monthlyTotal, 1195);          // round(119.48 × 10)
  });
  test('Google Starter → M365 Business Basic; utan säten visas bara per-säte (ingen total)', () => {
    const r = m365EquivalentForGoogle('google-starter', null);
    assert.equal(r.m365Tier, 'business-basic');
    assert.equal(r.perSeatMonthly, 57.40);
    assert.equal(r.seats, null);
    assert.equal(r.monthlyTotal, null);
  });
  test('okänd nivå → null (ingen referens hellre än fel referens)', () => {
    assert.equal(m365EquivalentForGoogle('google-okänd', 5), null);
  });
});

describe('Google Workspace · recommend() — google-sek-grind + verifierad M365-referens', () => {
  test('Plus 8 lic → ingen Google-siffra, men M365 Business Premium-referens (1 682 kr/mån)', async () => {
    const r = await recommend(gwInvoice('Google Workspace Business Plus (8 lic)', 1920));
    // (a) Ingen Google-siffra, ingen besparing, ingen FX.
    assert.equal(r.requiresQuote, true);
    assert.equal(r.recommendationType, 'requires_quote');
    assert.equal(r.shouldSwitch, false);
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.equal(r.netSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.optimizationSaving, null);
    assert.equal(r.benchmark, null);
    // (b) Verifierad M365-referens bärs strukturerat.
    assert.ok(r.m365Equivalent, 'm365Equivalent ska finnas');
    assert.equal(r.m365Equivalent.m365Tier, 'business-premium');
    assert.equal(r.m365Equivalent.perSeatMonthly, 210.29);
    assert.equal(r.m365Equivalent.seats, 8);
    assert.equal(r.m365Equivalent.monthlyTotal, 1682);
    // (c) Copyn säger uttryckligen att talet är Microsofts pris, inte Googles.
    assert.match(r.reasoning, /Business Premium/);
    assert.match(r.reasoning, /210,29 kr/);
    assert.match(r.reasoning, /1\s*682 kr per månad/);
    assert.match(r.reasoning, /inte ert Google-pris/);
  });

  test('Google via licenseType utan säten → per-säte-referens, ingen total, ingen Google-siffra', async () => {
    const r = await recommend(gwInvoice('Produktivitetslicens', 600, 'Google Workspace Starter'));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.suggestedAnnualCost, null);
    assert.ok(r.m365Equivalent, 'M365-referens ska finnas även utan säten');
    assert.equal(r.m365Equivalent.m365Tier, 'business-basic');
    assert.equal(r.m365Equivalent.monthlyTotal, null);
    assert.match(r.reasoning, /Business Basic/);
    assert.match(r.reasoning, /57,40 kr/);
    assert.match(r.reasoning, /inte ert Google-pris/);
  });

  test('grinden är leverantörsspecifik: icke-Google saas-productivity klassas inte som Google', async () => {
    const { getDominantSaasTierKey } = await import('../agents/recommender/recommend.js');
    const slackKey = getDominantSaasTierKey([{ type: 'recurring_subscription', description: 'Slack Pro (20 lic)', amount: 1580 }], null, null);
    assert.ok(!String(slackKey ?? '').startsWith('google-'), 'Slack ska inte klassas som Google-tier');
  });
});
