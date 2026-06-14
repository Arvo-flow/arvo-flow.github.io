// tests/branchindex.mjs
// Enhetstester för branchindex.js: getBenchmark, bucketForSize och dataintegritet.
//
// Kör: node --test tests/branchindex.mjs
// Eller via: npm run test:algo

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  BRANCHINDEX,
  INDUSTRY_SEGMENT_MAP,
  getBenchmark,
  bucketForSize,
} from '../agents/recommender/branchindex.js';
import { usdToSek, FALLBACK_RATE_USD_SEK } from '../agents/recommender/pricing.js';

// ── BI-01 ─────────────────────────────────────────────────────────────────────
// bucketForSize — alla gränsvärden
describe('BI-01 · bucketForSize — storleksbuckets', () => {
  const cases = [
    [1, 'micro'], [5, 'micro'], [9, 'micro'],
    [10, 'small'], [20, 'small'], [49, 'small'],
    [50, 'mid'], [100, 'mid'], [249, 'mid'],
    [250, 'micro'],  // faller utanför → fallback 'micro'
    [500, 'micro'],
  ];
  for (const [n, expected] of cases) {
    test(`${n} anst → '${expected}'`, () => assert.strictEqual(bucketForSize(n), expected));
  }
});

// ── BI-02 ─────────────────────────────────────────────────────────────────────
// getBenchmark — korrekt matrix-lookup för kända kombinationer
describe('BI-02 · getBenchmark — matrix-lookup', () => {
  test('mobil + konsult + 5 anst → byraer.micro { p25:2868, median:3348 }', () => {
    const bm = getBenchmark({ category: 'mobil', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    2868);
    assert.strictEqual(bm.median, 3348);
    assert.strictEqual(bm.industry, 'byraer');
    assert.strictEqual(bm.size, 'micro');
  });

  test('bredband + tillverkning + 50 anst → hantverkare.mid { p25:26400, median:36000 }', () => {
    const bm = getBenchmark({ category: 'bredband', industry: 'tillverkning', employees: 50 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    26400);
    assert.strictEqual(bm.median, 36000);
  });

  test('kortterminal.verifiedRates låser de live-verifierade raterna (Zettle 1,85 / Stripe 1,40+1,00)', () => {
    const vr = BRANCHINDEX.kortterminal.verifiedRates;
    assert.ok(vr && Array.isArray(vr.rates), 'verifiedRates.rates måste finnas');
    const byName = Object.fromEntries(vr.rates.map((r) => [r.supplier, r]));
    assert.strictEqual(byName['Zettle by PayPal'].pct, 1.85);
    assert.strictEqual(byName['Stripe Terminal'].pct, 1.40);
    assert.strictEqual(byName['Stripe Terminal'].fixed, 1.00);
  });

  test('avfall-atervinning + konsult + 5 anst → byraer.micro { p25:9500, median:16000 }', () => {
    const bm = getBenchmark({ category: 'avfall-atervinning', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    9500);
    assert.strictEqual(bm.median, 16000);
  });

  test('skrivarleasing + konsult + 5 anst → byraer.micro { p25:11400, median:16800 }', () => {
    const bm = getBenchmark({ category: 'skrivarleasing', industry: 'konsult', employees: 5 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    11400);
    assert.strictEqual(bm.median, 16800);
  });

  test('saas-productivity + konsult + 10 anst → byraer.small { p25:1704, median:2640 }', () => {
    const bm = getBenchmark({ category: 'saas-productivity', industry: 'konsult', employees: 10 });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.p25,    1704);
    assert.strictEqual(bm.median, 2640);
  });

  test('okänd kategori → null', () => {
    const bm = getBenchmark({ category: 'nonexistent-xyz', industry: 'konsult', employees: 5 });
    assert.strictEqual(bm, null);
  });

  test('employees null/undefined → fallback micro', () => {
    const bm = getBenchmark({ category: 'mobil', industry: 'konsult', employees: undefined });
    assert.notStrictEqual(bm, null);
    assert.strictEqual(bm.size, 'micro');
  });
});

// ── BI-03 ─────────────────────────────────────────────────────────────────────
// requiresVolumeData-kategorier → getBenchmark returnerar null.
// OBS: saas-crm och saas-finance flyttade UT ur listan (kalibrerade estimated-
// benchmarks juni 2026 — Pipedrive/Zoho/HubSpot resp. Fortnox/Visma) — de
// asserteras nedan som estimated istället.
describe('BI-03 · requiresVolumeData-kategorier → null', () => {
  const volumeCats = [
    'saas-creative', 'saas-other',
    'leasing-bil', 'utrustningsleasing', 'serverhosting',
    'städ-rengöring', 'transport-frakt', 'kontorsmaterial',
  ];
  for (const cat of volumeCats) {
    test(`${cat} → null`, () => {
      const bm = getBenchmark({ category: cat, industry: 'konsult', employees: 10 });
      assert.strictEqual(bm, null, `${cat} ska returnera null (requiresVolumeData)`);
    });
  }
  for (const cat of ['saas-crm', 'saas-finance']) {
    test(`${cat} → estimated benchmark (kalibrerad juni 2026)`, () => {
      const bm = getBenchmark({ category: cat, industry: 'konsult', employees: 10 });
      assert.ok(bm, `${cat} ska ha benchmark`);
      assert.equal(bm.source, 'estimated', `${cat} är estimat tills livedata bär`);
      assert.ok(bm.p25 > 0 && bm.p25 <= bm.median, `${cat}: p25 ≤ median`);
    });
  }
});

// ── BI-04 ─────────────────────────────────────────────────────────────────────
// INDUSTRY_SEGMENT_MAP — alla kunder mappar till ett giltigt segment
describe('BI-04 · INDUSTRY_SEGMENT_MAP — fullständig täckning', () => {
  const validSegments = new Set(['byraer', 'hantverkare', 'ehandel', 'tillverkning']);
  const industries = ['ehandel', 'tillverkning', 'it-tech', 'bygg', 'hotell', 'konsult', 'transport', 'vard', 'ovrigt'];
  for (const ind of industries) {
    test(`${ind} → giltigt segment`, () => {
      const seg = INDUSTRY_SEGMENT_MAP[ind];
      assert.ok(validSegments.has(seg), `'${ind}' → '${seg}' är inte ett giltigt segment`);
    });
  }
});

// ── BI-05 ─────────────────────────────────────────────────────────────────────
// Dataintegritet: p25 ≤ median för alla matrixceller
describe('BI-05 · Dataintegritet — p25 ≤ median i alla celler', () => {
  for (const [catKey, catDef] of Object.entries(BRANCHINDEX)) {
    if (!catDef.matrix) continue;
    for (const [segment, sizes] of Object.entries(catDef.matrix)) {
      for (const [size, cell] of Object.entries(sizes)) {
        test(`${catKey} / ${segment} / ${size}: p25 (${cell.p25}) ≤ median (${cell.median})`, () => {
          assert.ok(
            cell.p25 <= cell.median,
            `p25 ${cell.p25} > median ${cell.median} — omöjligt`
          );
        });
      }
    }
  }
});

// ── BI-06 ─────────────────────────────────────────────────────────────────────
// USD-tiers i saas-productivity: rätt struktur och valutatyp
describe('BI-06 · USD-tiers — korrekt struktur (Slack, Zoom, Google)', () => {
  const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;

  const usdTiers = [
    'slack-pro', 'slack-business-plus',
    'zoom-pro', 'zoom-business',
    'google-starter', 'google-standard', 'google-plus',
    'atlassian-jira-standard', 'atlassian-jira-premium',
  ];
  for (const key of usdTiers) {
    test(`${key}: currency='USD' + usdMonthly > 0`, () => {
      const t = tiers[key];
      assert.ok(t, `Tier '${key}' saknas`);
      assert.strictEqual(t.currency, 'USD');
      assert.ok(t.usdMonthly > 0, `usdMonthly saknas eller 0`);
    });
  }

  test('Microsoft-tiers har currency:"SEK" och msrpMonthly > 0', () => {
    const msTiers = ['business-basic', 'business-standard', 'business-premium', 'e3', 'e5'];
    for (const key of msTiers) {
      const t = tiers[key];
      assert.ok(t, `Tier '${key}' saknas`);
      assert.strictEqual(t.currency, 'SEK', `${key} ska ha currency:'SEK'`);
      assert.ok(t.msrpMonthly > 0, `${key}.msrpMonthly saknas`);
      assert.ok(t.msrpAnnual != null && t.msrpAnnual > 0, `${key}.msrpAnnual ska vara > 0`);
      // Årsavtal ska alltid vara billigare än månadsavtal
      assert.ok(t.msrpAnnual < t.msrpMonthly, `${key}: årsavtal (${t.msrpAnnual}) ska vara < månadsavtal (${t.msrpMonthly})`);
    }
  });

  test('Atlassian-tiers har usdAnnual = null (tier-bucket, ej per-user)', () => {
    for (const key of ['atlassian-jira-standard', 'atlassian-jira-premium',
                       'atlassian-confluence-standard', 'atlassian-confluence-premium']) {
      assert.strictEqual(tiers[key].usdAnnual, null, `${key}.usdAnnual ska vara null`);
    }
  });
});

// ── BI-07 ─────────────────────────────────────────────────────────────────────
// usdToSek: matematisk korrekthet med FALLBACK_RATE_USD_SEK
describe('BI-07 · usdToSek — konverteringsaritmetik', () => {
  test('usdToSek(18.00, FALLBACK) = round(18.00 × FALLBACK)', () => {
    const expected = Math.round(18.00 * FALLBACK_RATE_USD_SEK);
    assert.strictEqual(usdToSek(18.00, FALLBACK_RATE_USD_SEK), expected);
  });

  test('usdToSek(15.30, FALLBACK) = round(15.30 × FALLBACK)', () => {
    const expected = Math.round(15.30 * FALLBACK_RATE_USD_SEK);
    assert.strictEqual(usdToSek(15.30, FALLBACK_RATE_USD_SEK), expected);
  });

  test('Slack Business+ SEK-pris = round(usdMonthly × rate) (Salesforce-caset: USD→SEK)', () => {
    const tier = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['slack-business-plus'];
    const rate = FALLBACK_RATE_USD_SEK;
    const sekMonthly = usdToSek(tier.usdMonthly, rate);
    const sekAnnual  = usdToSek(tier.usdAnnual,  rate);
    // Arvo-pris ska vara < MSRP
    const sekArvo    = usdToSek(tier.usdArvoAnnual, rate);
    assert.strictEqual(sekMonthly, Math.round(tier.usdMonthly * rate));
    assert.strictEqual(sekAnnual,  Math.round(tier.usdAnnual  * rate));
    assert.ok(sekArvo < sekMonthly, 'arvoAnnual ska vara < msrpMonthly');
  });

  test('Zoom Pro: årsavtal billigare än månadsavtal efter konvertering', () => {
    const tier = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks['zoom-pro'];
    const rate = FALLBACK_RATE_USD_SEK;
    const monthly = usdToSek(tier.usdMonthly, rate);
    const annual  = usdToSek(tier.usdAnnual, rate);
    assert.ok(annual < monthly, `Zoom Pro årsavtal (${annual}) ska vara < månadsavtal (${monthly})`);
  });
});

// ── BI-08 ─────────────────────────────────────────────────────────────────────
// Bredband speedTierBenchmarks: p25 < median, täcker 100/250/500/1000
describe('BI-08 · Bredband speedTierBenchmarks', () => {
  const speeds = [100, 250, 500, 1000];
  const tiers = BRANCHINDEX.bredband.speedTierBenchmarks;
  for (const s of speeds) {
    test(`${s} Mbit: existerar + p25 < median`, () => {
      const t = tiers[s];
      assert.ok(t, `Saknar speedTierBenchmark för ${s} Mbit`);
      assert.ok(t.p25 < t.median, `${s} Mbit: p25 (${t.p25}) >= median (${t.median})`);
    });
  }
  test('1000 Mbit verifierat listpris: p25 = 10 200 (Tele2 849×12), median = 10 800', () => {
    // p25 höjdes medvetet från 9 000: ett mål under dokumenterat listpris är ett
    // löfte ingen kund kan realisera (samma felklass som print-kortets 0,275).
    const t = tiers[1000];
    assert.strictEqual(t.p25,    10200);
    assert.strictEqual(t.median, 10800);
  });
});
