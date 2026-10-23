// tests/listpristak.mjs — LT · licenspriset prövas mot mains avläsningströsklar, och inga prisseedar finns kvar (SS).
//
// Grundarbeslut 2026-10-21: prisboken (agents/recommender/branchindex.js) är enda sanningen, och
// repot bär inga parallella prislistor. lib/supplier-price-intel.js bar en egen majtabell, och
// api/admin/run-migration.mjs och scripts/seed-price-db.mjs skrev 46 majpriser till supplier_prices.
//
// Prövningens BETEENDE är mains, med flit (fjärde granskningen av PR #86, F4-1). Tre försök att
// härleda taket ur prisboken gjorde var sitt fel vanligare. Talen nedan är mains utfall, avlästa i
// granskningarna av PR #86 (ops/GRANSKNING-ssot-tele2-lagningen.md, -tredje.md, -fjarde.md).
// Radprövningen mot prisboken byggs i nästa PR (ops/ARBETSORDER-VAG1.md, T-2).
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { validateSeatPrice } from '../lib/supplier-price-intel.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const prova = (normalizedSupplier, pricePerSeatMonthly) => validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly });

describe('LT · licenspriset prövas mot mains avläsningströsklar', () => {
  test('LT-01 · trösklarna är mains: på tröskeln prissätts, en öre över går till granskning', () => {
    for (const [lev, troskel] of [['microsoft', 765.7], ['google workspace', 468], ['adobe', 908.7]]) {
      assert.equal(prova(lev, troskel).anomaly, false, `${lev} på ${troskel}`);
      assert.equal(prova(lev, Math.round((troskel + 0.01) * 100) / 100).anomaly, true, `${lev} över ${troskel}`);
    }
  });

  test('LT-02 · mains mätta utfall står kvar: Basic × 12 till granskning, Copilot-fallen prissätts', () => {
    // Business Basic läst som årssumma per månad (L-1): main skickade båda till granskning.
    assert.equal(prova('microsoft', 66.91 * 12).anomaly, true, '802,92');
    assert.equal(prova('microsoft', 80.29 * 12).anomaly, true, '963,48');
    // Korrekt lästa fakturor med tillägg som main prissatte (T-1).
    for (const pps of [133.82 + 286.80, 66.91 + 200.70, 66.91 + 286.80, 80.29 + 95.60 + 28.70, 210.29 + 286.80]) {
      assert.equal(prova('microsoft', pps).anomaly, false, String(pps));
    }
    // Förexisterande, lagas i nästa PR: E5 på månadsfakturering och Adobe till listpris går till granskning.
    assert.equal(prova('microsoft', 769.42).anomaly, true, 'E5 månadspris, som på main');
    assert.equal(prova('adobe', 985).anomaly, true, 'Adobe Creative Cloud Pro, som på main');
  });

  test('LT-03 · en okänd leverantör, ett nollpris och ett saknat namn prövas inte', () => {
    assert.equal(prova('okänd leverantör', 5000).anomaly, false);
    assert.equal(prova('microsoft', 0).anomaly, false);
    assert.equal(prova(null, 5000).anomaly, false);
  });

  test('LT-04 · modulen bär ingen prislista, och test-invoice skickar bara namn och pris', () => {
    const kod = readFileSync(rot('lib/supplier-price-intel.js'), 'utf8');
    assert.doesNotMatch(kod, /msrp(?:Monthly|Annual)\s*:\s*\d/, 'en hårdkodad prisrad är en parallell prislista');
    assert.doesNotMatch(kod, /SUPPLIER_PRICE_INTEL\s*=/);
    const api = readFileSync(rot('api/test-invoice.mjs'), 'utf8');
    const i = api.indexOf('validateSeatPrice({');
    assert.ok(i > 0, 'anropet finns');
    assert.match(api.slice(i, i + 200), /validateSeatPrice\(\{\s*normalizedSupplier:\s*categorized\.normalizedSupplier,\s*pricePerSeatMonthly:\s*extracted\.pricePerSeatMonthly,\s*\}\)/);
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

  test('SS-02 · ingen skrivning till supplier_prices finns kvar, och den falska historikraden seedas inte igen', () => {
    // Steg b i ops/ARBETSORDER-VAG1.md: apply-price-proposals skrev till en tabell som ingen kundväg läser,
    // och seed-price-history bar «Business Standard 12,50 → 14,00, 2022-03-01», som Microsofts post
    // 2021-08-19 inte innehåller (avläst 23 okt).
    const apply = readFileSync(rot('scripts/apply-price-proposals.mjs'), 'utf8');
    assert.doesNotMatch(apply, /upsertPrice|INSERT INTO supplier_prices/, 'apply-price-proposals skriver till supplier_prices igen');
    assert.match(apply, /applyAlert|summary/, 'motprov: skriptet finns kvar och gör sitt huvudjobb');
    const seed = readFileSync(rot('scripts/seed-price-history.mjs'), 'utf8');
    const kod = seed.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    assert.doesNotMatch(kod, /changedAt:\s*'2022-03-01'/, 'den falska 2022-raden seedas igen');
    assert.match(kod, /changedAt:\s*'2026-07-01'/, 'motprov: 2026-raden står kvar');
    // Städskriptet raderar bara när antalen ur läsningen stämmer, och räknar om efteråt.
    const stada = readFileSync(rot('scripts/stada-prisdata.mjs'), 'utf8');
    assert.match(stada, /fore\.p\.maj !== vantadePriser \|\| fore\.h\.falska !== vantadHistorik/, 'radering utan antalskontroll');
    assert.match(stada, /efter\.p\.ovriga !== fore\.p\.ovriga/, 'motprovet efter raderingen saknas');
    const flode = readFileSync(rot('.github/workflows/stada-prisdata.yml'), 'utf8');
    assert.match(flode, /set -o pipefail/);
    const runBlock = flode.slice(flode.lastIndexOf('run: |'));
    assert.match(runBlock, /node scripts\/stada-prisdata\.mjs "\$LAGE"/, 'run-blocket hittades inte');
    assert.doesNotMatch(runBlock, /\$\{\{/, 'indata interpoleras i run-blocket (skriptinjektion)');
  });
});
