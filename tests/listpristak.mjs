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

  test('LT-03 · ett felavläst pris fälls, Google prövas bara mot det absoluta taket, okänd leverantör prövas inte', () => {
    assert.equal(prova('microsoft', 801).anomaly, true, 'över Microsofts absoluta tak');
    assert.equal(prova('adobe', 1300).anomaly, true, 'över Adobes absoluta tak');
    assert.equal(prova('adobe', 1100).anomaly, false, 'under taket och under 1,30 × 985');
    // Google: prisboken bär bara USD. Ett SEK-tal därur vore en gissning, så bara taket prövas.
    assert.equal(prova('google workspace', 20).anomaly, false);
    assert.equal(prova('google workspace', 20).msrp, null);
    assert.equal(prova('google workspace', 700).anomaly, true);
    assert.equal(prova('okänd leverantör', 5000).anomaly, false);
    assert.equal(prova('microsoft', 0).anomaly, false);
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
