// tests/listpristak.mjs — LT · licenspriset prövas per nivårad och mot mains tak per plats, och inga prisseedar finns kvar (SS).
//
// Grundarbeslut 2026-10-21: prisboken (agents/recommender/branchindex.js) är enda sanningen, och
// repot bär inga parallella prislistor. lib/supplier-price-intel.js bar en egen majtabell, och
// api/admin/run-migration.mjs och scripts/seed-price-db.mjs skrev 46 majpriser till supplier_prices.
//
// T-2 (ops/ARBETSORDER-VAG1.md): varje nivårad prövas mot sin nivå i prisboken, och mains tak per plats
// står kvar på mains exakta namn. LT-06 mäter utfallen mot mains (origin/main 4f8f2326) åt båda håll.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { validateSeatPrice, prisprovningensIndata, leverantorsnyckel } from '../lib/supplier-price-intel.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const prova = (normalizedSupplier, pricePerSeatMonthly) => validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly });
const rad = (description, unitPrice, quantity = 10, extra = {}) =>
  ({ description, type: 'recurring_subscription', quantity, unitPrice, amount: Math.round(unitPrice * quantity * 100) / 100, ...extra });
const provaRader = (normalizedSupplier, lineItems, billingPeriod = 'monthly', pricePerSeatMonthly = null) =>
  validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, lineItems, billingPeriod });

// Listpriser ur prisboken, avlästa 26 okt: [årsåtagande, månadsfakturering] i kr per licens och månad.
const MS = {
  'business-basic': [66.91, 80.29], 'business-standard': [133.82, 160.58], 'business-premium': [210.29, 252.35],
  e3: [416.77, 500.12], e5: [641.18, 769.42],
};
const NAMN = {
  'business-basic': 'Microsoft 365 Business Basic', 'business-standard': 'Microsoft 365 Business Standard',
  'business-premium': 'Microsoft 365 Business Premium', e3: 'Microsoft 365 E3', e5: 'Microsoft 365 E5',
};

// Mains prövning (origin/main 4f8f2326, lib/supplier-price-intel.js): exakta namn, fasta trösklar.
const MAINS_TROSKEL = { microsoft: 765.7, google: 468, adobe: 908.7 };
const mainsUtfall = (lev, pps) => {
  if (!pps || pps <= 0 || !lev) return false;
  const k = leverantorsnyckel(lev);
  return k ? pps > MAINS_TROSKEL[k] : false;
};

describe('LT · licenspriset prövas per nivårad och mot mains tak per plats', () => {
  test('LT-01 · taket per plats: E5:s månadspris, 1,10 × Adobes högsta teampris och mains Google-tröskel', () => {
    for (const [lev, tak] of [['microsoft', 769.42], ['google workspace', 468], ['adobe', 1083.5]]) {
      assert.equal(prova(lev, tak).anomaly, false, `${lev} på ${tak}`);
      assert.equal(prova(lev, Math.round((tak + 0.01) * 100) / 100).anomaly, true, `${lev} över ${tak}`);
    }
  });

  test('LT-02 · mains rätta utfall står kvar, och två förexisterande fel är lagade', () => {
    // Business Basic läst som årssumma per månad (L-1): till granskning, som på main.
    assert.equal(prova('microsoft', 66.91 * 12).anomaly, true, '802,92');
    assert.equal(prova('microsoft', 80.29 * 12).anomaly, true, '963,48');
    // Korrekt lästa fakturor med tillägg som main prissatte (T-1).
    for (const pps of [133.82 + 286.80, 66.91 + 200.70, 66.91 + 286.80, 80.29 + 95.60 + 28.70, 210.29 + 286.80]) {
      assert.equal(prova('microsoft', pps).anomaly, false, String(pps));
    }
    // T-2: main skickade dessa korrekta fakturor till granskning.
    assert.equal(prova('microsoft', 769.42).anomaly, false, 'E5 på månadsfakturering');
    assert.equal(prova('adobe', 985).anomaly, false, 'Adobe Creative Cloud Pro till listpris');
    // Motprov: Single App läst som kvartalssumma går till granskning, som på main.
    assert.equal(prova('adobe', 381 * 3).anomaly, true, '1 143');
  });

  test('LT-03 · en okänd leverantör utan nivårad, ett nollpris och ett saknat namn prövas inte', () => {
    assert.equal(prova('okänd leverantör', 5000).anomaly, false);
    assert.equal(prova('microsoft', 0).anomaly, false);
    assert.equal(prova(null, 5000).anomaly, false);
    assert.equal(validateSeatPrice({}).prov, null, 'inget prövat');
  });

  test('LT-04 · modulen bär ingen prislista, och test-invoice skickar prisprovningensIndata', () => {
    const kod = readFileSync(rot('lib/supplier-price-intel.js'), 'utf8');
    assert.doesNotMatch(kod, /msrp(?:Monthly|Annual)\s*:\s*\d/, 'en hårdkodad prisrad är en parallell prislista');
    assert.doesNotMatch(kod, /SUPPLIER_PRICE_INTEL\s*=/);
    const api = readFileSync(rot('api/test-invoice.mjs'), 'utf8');
    assert.equal(api.match(/validateSeatPrice\(/g)?.length, 1, 'ett anrop');
    assert.match(api, /validateSeatPrice\(prisprovningensIndata\(extracted, categorized\)\)/);
    // Indata är fälten produktionen bär efter aggregeringen (T-4).
    const rader = [rad(NAMN.e3, 416.77)];
    assert.deepEqual(
      prisprovningensIndata({ pricePerSeatMonthly: 416.77, lineItems: rader, billingPeriod: 'quarterly', annat: 1 }, { normalizedSupplier: 'Crayon AS' }),
      { normalizedSupplier: 'Crayon AS', pricePerSeatMonthly: 416.77, lineItems: rader, billingPeriod: 'quarterly' });
    assert.deepEqual(prisprovningensIndata({}, {}), { normalizedSupplier: null, pricePerSeatMonthly: null, lineItems: [], billingPeriod: null });
    assert.deepEqual(prisprovningensIndata({ lineItems: 'inte en lista' }, null).lineItems, []);
  });

  test('LT-05 · varje nivårad prövas mot sin nivå, oavsett leverantörens namn', () => {
    for (const lev of ['Microsoft Ireland Operations Ltd', 'Crayon AS', 'Microsoft', null]) {
      for (const [niva, [ars, man]] of Object.entries(MS)) {
        for (const [pris, vantat, vad] of [[ars, false, 'årsåtagande'], [man, false, 'månadsfakturering'],
          [man * 1.15, false, 'påslag 15 %'], [ars * 3, true, 'kvartalssumma'], [ars * 12, true, 'årssumma']]) {
          const u = provaRader(lev, [rad(NAMN[niva], pris)], 'unknown');
          assert.equal(u.anomaly, vantat, `${lev} · ${niva} · ${vad}`);
          assert.equal(u.prov, 'rad');
        }
      }
    }
    // Perioden: ett kvartals- eller årspris på en kvartals- eller årsfaktura är rätt läst.
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 416.77 * 3)], 'quarterly').anomaly, false);
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 416.77 * 12)], 'annual').anomaly, false);
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 416.77 * 12)], 'quarterly').anomaly, true, 'årssumma på kvartalsfaktura');
    // En engångsfaktura har inget månadspris, och en rad som inte är en licensrad prövas inte.
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 5000)], 'one_time').prov, null);
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 5000, 1, { type: 'one_time_fee' })]).prov, null);
    // Öresfältet går före kronorfältet, åt båda håll: kronor 1 000 med öre 133,82 prissätts, kronor 100
    // med öre 802,92 (Basic × 12) går till granskning.
    assert.equal(provaRader('Crayon AS', [rad(NAMN['business-basic'], 1000, 10, { unitPriceOre: 13382 })]).anomaly, false, 'öre 133,82');
    assert.equal(provaRader('Crayon AS', [rad(NAMN['business-basic'], 100, 10, { unitPriceOre: 80292 })]).anomaly, true, 'öre 802,92');
    // Utan à-pris räknas belopp ÷ antal; utan antal prövas raden inte.
    assert.equal(provaRader('Crayon AS', [{ description: NAMN.e3, type: 'recurring_subscription', quantity: 10, amount: 50012 }]).anomaly, true);
    assert.equal(provaRader('Crayon AS', [{ description: NAMN.e3, type: 'recurring_subscription', amount: 50012 }]).prov, null);
    // F4-2: en Business Basic EES-årssumma går till granskning när nivån står i radtexten.
    assert.equal(provaRader('Microsoft Ireland Operations Ltd', [rad('Microsoft 365 Business Basic (EES)', 57.40 * 12)], 'unknown').anomaly, true);
    // Tillägg prövas inte per rad: Azure och Dynamics kostar mer än varje M365-plan och är korrekta.
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 416.77), rad('Azure-förbrukning oktober', 4500, 1), rad('Dynamics 365 Sales Enterprise', 1100, 5)]).anomaly, false);
  });

  test('LT-06 · svepet mot main: noll fall där main hade rätt och den nya prövningen fel', () => {
    const TILLAGG = [['', 0], ['Microsoft Defender for Business', 28.70], ['Teams Phone Standard', 95.60], ['Microsoft 365 Copilot', 286.80]];
    const LEV = ['Microsoft', 'Microsoft Ireland Operations Ltd', 'Crayon AS'];
    const utfall = [];
    const fall = (f) => utfall.push({ ...f, main: mainsUtfall(f.lev, f.pps), ny: provaRader(f.lev, f.rader, f.period, f.pps).anomaly });
    for (const [niva, [ars, man]] of Object.entries(MS)) {
      for (const [variant, faktor, fel] of [['årslistpris', 1, false], ['månadslistpris', 1, false], ['påslag 15 %', 1.15, false], ['kvartalssumma', 3, true], ['årssumma', 12, true]]) {
        const bas = variant === 'månadslistpris' ? man : ars;
        for (const [tnamn, tpris] of TILLAGG) for (const lev of LEV) for (const medNiva of [true, false]) for (const period of ['monthly', 'unknown', 'annual']) {
          if (period === 'annual' && fel) continue;
          const u = period === 'annual' ? bas * 12 : bas * faktor;
          const t = period === 'annual' ? tpris * 12 : tpris * (fel ? faktor : 1);
          const rader = [rad(medNiva ? NAMN[niva] : 'Microsoft 365 licens', u)];
          if (tnamn) rader.push(rad(tnamn, t));
          fall({ lev, period, rader, fel, pps: Math.round(((u + t) / (period === 'annual' ? 12 : 1)) * 100) / 100 });
        }
      }
      // Bara tillägget felläst: nivåraden till listpris, tillägget läst som kvartals- eller årssumma.
      for (const [tnamn, tpris] of TILLAGG.slice(1)) for (const faktor of [3, 12]) for (const lev of LEV) for (const medNiva of [true, false]) for (const period of ['monthly', 'unknown']) {
        const rader = [rad(medNiva ? NAMN[niva] : 'Microsoft 365 licens', ars), rad(tnamn, tpris * faktor)];
        fall({ lev, period, rader, fel: true, pps: Math.round((ars + tpris * faktor) * 100) / 100 });
      }
    }
    // Korrekta fakturor med rader dyrare än varje M365-plan, och E3 med kraftigt påslag.
    for (const lev of LEV) for (const period of ['monthly', 'unknown']) {
      fall({ lev, period, fel: false, pps: 866.77, rader: [rad(NAMN.e3, 416.77), rad('Azure-förbrukning oktober', 4500, 1)] });
      fall({ lev, period, fel: false, pps: 644.51, rader: [rad(NAMN.e3, 416.77), rad('Dynamics 365 Sales Enterprise', 1100, 5)] });
      fall({ lev, period, fel: false, pps: 800, rader: [rad(NAMN.e3, 800)] });
    }
    const ADOBE = { 'all-apps': 985, 'single-app': 381, acrobat: 273 };
    for (const [produkt, pris] of Object.entries(ADOBE)) for (const [faktor, fel] of [[1, false], [1.10, false], [3, true], [12, true]]) for (const lev of ['Adobe', 'Adobe Systems Software Ireland Limited']) for (const period of ['monthly', 'unknown']) {
      fall({ lev, period, fel, pps: Math.round(pris * faktor * 100) / 100, rader: [rad(`Adobe Creative Cloud ${produkt}`, pris * faktor, 5)] });
    }
    const ratt = (x, vem) => x[vem] === x.fel;
    const raknat = {
      fall: utfall.length,
      main: utfall.filter((x) => ratt(x, 'main')).length,
      ny: utfall.filter((x) => ratt(x, 'ny')).length,
      forsamrat: utfall.filter((x) => ratt(x, 'main') && !ratt(x, 'ny')).length,
      battre: utfall.filter((x) => !ratt(x, 'main') && ratt(x, 'ny')).length,
    };
    // Exakta tal ur körningen 26 okt. Ett ändrat tal är en ändrad prövning och kräver ett nytt svep.
    assert.deepEqual(raknat, { fall: 1986, main: 1266, ny: 1460, forsamrat: 0, battre: 194 });
    // Motprov: referensen är mains, inte den nya prövningen. Den stoppar E5 på månadsfakturering.
    assert.equal(mainsUtfall('Microsoft', 769.42), true);
    assert.equal(provaRader('Microsoft', [rad(NAMN.e5, 769.42)], 'monthly', 769.42).anomaly, false);
  });

  test('LT-07 · taket per plats nycklas på mains exakta namn (F5-1); ett ändrat uppslag kräver svepet', () => {
    for (const lev of ['Microsoft', 'microsoft 365', ' Microsoft Corporation ', 'Google', 'google llc', 'Adobe', 'adobe systems']) {
      assert.equal(prova(lev, 5000).anomaly, true, lev);
    }
    // Det juridiska namnet utan nivårad prövas inte per plats: ett varumärkesnycklat tak skickade
    // korrekta E3- och E5-fakturor med tillägg därifrån till granskning (svepet, regel 13).
    for (const lev of ['Microsoft Ireland Operations Ltd', 'Adobe Systems Software Ireland Limited', 'Crayon AS']) {
      assert.equal(prova(lev, 5000).anomaly, false, lev);
    }
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

  test('SS-03 · lib/price-db.js varken skriver eller läser supplier_prices', () => {
    // T-2: upsertPrice och fem läsare saknade anropare. Tabellen är tom sedan 23 okt (stada-prisdata).
    const kod = readFileSync(rot('lib/price-db.js'), 'utf8').split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    assert.doesNotMatch(kod, /\bsupplier_prices\b/, 'en fråga mot supplier_prices');
    assert.doesNotMatch(kod, /export async function (upsertPrice|getCurrentPrices|getPriceHistory|getSupplierCategoryChanges|getInvoiceBenchmark|getPriceDbStats)\b/);
    // Motprov: ändringsloggens skrivare och rummets två läsare finns kvar.
    for (const f of ['recordVerifiedChange', 'getSupplierCategoryChangesByKeyword', 'getRecentHike', 'upsertInvoiceBenchmark']) {
      assert.match(kod, new RegExp(`export async function ${f}\\b`), f);
    }
    assert.match(kod, /supplier_price_history/, 'motprov: skanningen läser frågorna');
  });
});
