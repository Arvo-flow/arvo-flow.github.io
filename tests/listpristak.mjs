// tests/listpristak.mjs — LT · licenspriset prövas mot prisboken, och inga prisseedar finns kvar (SS).
//
// Grundarbeslut 2026-10-21: prisboken (agents/recommender/branchindex.js) är enda sanningen, och
// repot bär inga parallella prislistor. Avläst samma dag:
// · lib/supplier-price-intel.js bar en egen majtabell. I kundvägen skickade den en Adobe
//   Creative Cloud Pro-licens till verifierat listpris (985 kr) och Microsoft 365 E5 på
//   månadsfakturering (769,42 kr) till granskning i stället för prissättning.
// · api/admin/run-migration.mjs och scripts/seed-price-db.mjs skrev 46 majpriser till supplier_prices.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { validateSeatPrice } from '../lib/supplier-price-intel.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const prova = (normalizedSupplier, pricePerSeatMonthly) => validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly });

describe('LT · licenspriset prövas mot prisboken', () => {
  test('LT-01 · verifierat listpris går aldrig till granskning: Adobe team, Microsoft 365 E5 månadsvis', () => {
    const team = BRANCHINDEX['saas-creative'].adobeVerified.teamExVatMonthly;
    for (const pris of Object.values(team)) assert.equal(prova('adobe', pris).anomaly, false, `Adobe ${pris}`);
    const m365 = Object.values(BRANCHINDEX['saas-productivity'].licenseTierBenchmarks).filter((t) => t.currency === 'SEK');
    for (const t of m365) {
      for (const pris of [t.msrpAnnual, t.msrpMonthly].filter(Number.isFinite)) {
        assert.equal(prova('Microsoft 365', pris).anomaly, false, `Microsoft ${pris}`);
      }
    }
    // De två fallen som majtabellen skickade till granskning, med talen som avlästes 21 okt.
    assert.equal(prova('adobe', 985).anomaly, false);
    assert.equal(prova('microsoft', 769.42).anomaly, false);
  });

  test('LT-02 · taket följer prisboken: ändras boken, ändras svaret (boken återställs)', () => {
    const team = BRANCHINDEX['saas-creative'].adobeVerified.teamExVatMonthly;
    const fore = { ...team };
    try {
      for (const k of Object.keys(team)) team[k] = 500;
      const r = prova('adobe', 985);
      assert.equal(r.anomaly, true, 'med bokens tak 500 är 985 över 1,30 × 500');
      assert.equal(r.msrp, 500);
    } finally {
      Object.assign(team, fore);
    }
    assert.equal(prova('adobe', 985).anomaly, false);
  });

  test('LT-03 · ett felavläst pris fälls, Google prövas bara mot avläsningströskeln, okänd leverantör prövas inte', () => {
    // Microsofts tak: 1,30 × 769,42 = 1000,25. Adobes: 1,30 × 985 = 1280,50.
    assert.equal(prova('microsoft', 1000.25).anomaly, false, 'på taket');
    assert.equal(prova('microsoft', 1000.26).anomaly, true, 'över Microsofts tak');
    assert.equal(prova('microsoft', 769.42 * 12).anomaly, true, 'en årssumma läst som månad');
    assert.equal(prova('adobe', 1300).anomaly, true, 'över Adobes tak');
    assert.equal(prova('adobe', 1100).anomaly, false, 'under 1,30 × 985');
    // Google: prisboken bär bara USD. Ett SEK-tal därur vore en gissning, så bara taket prövas.
    assert.equal(prova('google workspace', 20).anomaly, false);
    assert.equal(prova('google workspace', 20).msrp, null);
    assert.equal(prova('google workspace', 700).anomaly, true);
    assert.equal(prova('okänd leverantör', 5000).anomaly, false);
    assert.equal(prova('microsoft', 0).anomaly, false);
  });

  test('LT-05 · höjer leverantören sin dyraste nivå 5 % och boken följer, prissätts listpriset fortfarande', () => {
    // Andra blicken på uppföljningen (K-2): ett fast tak på 800 kr låg 4 % över E5:s månadspris.
    const T = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const team = BRANCHINDEX['saas-creative'].adobeVerified.teamExVatMonthly;
    const fore = { e5: { ...T.e5 }, team: { ...team } };
    try {
      T.e5.msrpMonthly = Math.round(T.e5.msrpMonthly * 1.05 * 100) / 100;
      T.e5.msrpAnnual = Math.round(T.e5.msrpAnnual * 1.05 * 100) / 100;
      assert.equal(prova('microsoft', T.e5.msrpMonthly).anomaly, false, `E5 ${T.e5.msrpMonthly}`);
      for (const k of Object.keys(team)) team[k] = Math.round(team[k] * 1.05 * 100) / 100;
      for (const pris of Object.values(team)) assert.equal(prova('adobe', pris).anomaly, false, `Adobe ${pris}`);
    } finally {
      Object.assign(T.e5, fore.e5);
      Object.assign(team, fore.team);
    }
    assert.equal(prova('microsoft', 769.42).anomaly, false, 'boken återställd');
  });

  test('LT-06 · en USD-nivå med ett msrp-fält flyttar inte Microsofts tak (SEK-filtrets tand)', () => {
    const T = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const fore = prova('microsoft', 1500).anomaly;
    try {
      T['usd-med-msrp'] = { currency: 'USD', msrpMonthly: 5000, msrpAnnual: 5000 };
      assert.equal(prova('microsoft', 1500).anomaly, true, 'taket ska fortfarande vara 1,30 × högsta SEK-nivån');
    } finally {
      delete T['usd-med-msrp'];
    }
    assert.equal(fore, true, 'motprov: 1500 är över taket utan USD-nivån');
  });

  test('LT-04 · modulen bär ingen egen prislista', () => {
    const kod = readFileSync(rot('lib/supplier-price-intel.js'), 'utf8');
    assert.doesNotMatch(kod, /msrp(?:Monthly|Annual):\s*\d/, 'en hårdkodad prisrad är en parallell prislista');
    assert.doesNotMatch(kod, /SUPPLIER_PRICE_INTEL/);
    assert.match(kod, /BRANCHINDEX\['saas-productivity'\]/, 'Microsofts tak ska läsas ur prisboken');
    assert.match(kod, /adobeVerified/, 'Adobes tak ska läsas ur prisboken');
  });
});

describe('SS · inga prisseedar i repot', () => {
  test('SS-01 · migreringen skapar tabeller men skriver inga priser, och seedskriptet är borta', () => {
    const mig = readFileSync(rot('api/admin/run-migration.mjs'), 'utf8');
    assert.doesNotMatch(mig, /upsertPrice/, 'run-migration skriver priser igen');
    assert.doesNotMatch(mig, /name: 'seed:/);
    assert.match(mig, /CREATE TABLE IF NOT EXISTS/, 'motprov: migreringen finns kvar och skapar tabeller');
    assert.equal(existsSync(rot('scripts/seed-price-db.mjs')), false);
    const flode = readFileSync(rot('.github/workflows/setup-price-db.yml'), 'utf8');
    assert.doesNotMatch(flode, /seed-price-db/);
    assert.match(flode, /migrate-price-db\.mjs/, 'motprov: arbetsflödet skapar fortfarande schemat');
  });
});
