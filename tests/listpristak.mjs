// tests/listpristak.mjs — LT · licenspriset prövas per nivårad och mot mains tak per plats, och inga prisseedar finns kvar (SS).
//
// Grundarbeslut 2026-10-21: prisboken (agents/recommender/branchindex.js) är enda sanningen, och
// repot bär inga parallella prislistor. lib/supplier-price-intel.js bar en egen majtabell, och
// api/admin/run-migration.mjs och scripts/seed-price-db.mjs skrev 46 majpriser till supplier_prices.
//
// T-2 (ops/ARBETSORDER-VAG1.md): mains tak per plats står oförändrat och prövas alltid, och varje nivårad
// prövas dessutom mot sin nivå i prisboken. LT-06 mäter utfallen mot mains (origin/main 4f8f2326).
// Andra blicken (ops/GRANSKNING-t2-licenstaket.md) blockerade ett första försök som höjde taken
// (T2-1..T2-6). Ett andra försök hoppade över taket när varje rad var en prövad nivårad; den andra
// granskaren dog på sessionsgränsen, och dess oprövade anteckningar visade felet, återskapat i LT-09.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { validateSeatPrice, prisprovningensIndata, leverantorsnyckel, radensPrisPerManad } from '../lib/supplier-price-intel.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const r2 = (x) => Math.round(x * 100) / 100;
const prova = (normalizedSupplier, pricePerSeatMonthly) => validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly });
const rad = (description, unitPrice, quantity = 10, extra = {}) =>
  ({ description, type: 'recurring_subscription', quantity, unitPrice: r2(unitPrice), amount: r2(unitPrice * quantity), ...extra });
const provaRader = (normalizedSupplier, lineItems, billingPeriod = 'monthly', pricePerSeatMonthly = null, category = 'saas-productivity') =>
  validateSeatPrice({ normalizedSupplier, pricePerSeatMonthly, category, lineItems, billingPeriod });

// Listpriser ur prisboken, avlästa 27 okt: [årsåtagande, månadsfakturering] i kr per licens och månad.
const MS = {
  'business-basic': [66.91, 80.29], 'business-standard': [133.82, 160.58], 'business-premium': [210.29, 252.35],
  e3: [416.77, 500.12], e5: [641.18, 769.42],
};
const NAMN = {
  'business-basic': 'Microsoft 365 Business Basic', 'business-standard': 'Microsoft 365 Business Standard',
  'business-premium': 'Microsoft 365 Business Premium', e3: 'Microsoft 365 E3', e5: 'Microsoft 365 E5',
};

// Paketfakturor ur andra blicken (L-1): dator, licens och support, eller IT-drift. Raden namnger en M365-nivå
// och kostar mer än licensen. Main gav dem ett offertbesked; de får aldrig ett avläsningslarm.
const PAKET = [
  ['Atea Sverige AB', 'managed-workplace', 'Arbetsplats som tjänst Premium – dator, Microsoft 365 Business Premium och support', 899, 10],
  ['Advania Sverige AB', 'managed-workplace', 'Modern arbetsplats inkl. Microsoft 365 E3 och servicedesk', 1150, 25],
  ['Dustin AB', 'managed-workplace', 'Device as a Service: bärbar dator + Microsoft 365 Business Standard', 649, 8],
  ['Nordic Drift AB', 'it-support', 'Användare inkl. Microsoft 365 Business Premium, support och backup', 750, 12],
];

// Mains prövning (origin/main 4f8f2326, lib/supplier-price-intel.js): exakta namn, fasta trösklar.
// Andra blicken mätte referensen mot mains riktiga modul: 0 skillnader i 5 803 306 anrop.
const MAINS_TROSKEL = { microsoft: 765.7, google: 468, adobe: 908.7 };
const mainsUtfall = (lev, pps) => {
  if (!pps || pps <= 0 || !lev) return false;
  const k = leverantorsnyckel(lev);
  return k ? pps > MAINS_TROSKEL[k] : false;
};

describe('LT · licenspriset prövas per nivårad och mot mains tak per plats', () => {
  test('LT-01 · taket per plats är mains: på tröskeln prissätts, en öre över går till granskning', () => {
    for (const [lev, troskel] of [['microsoft', 765.7], ['google workspace', 468], ['adobe', 908.7]]) {
      assert.equal(prova(lev, troskel).anomaly, false, `${lev} på ${troskel}`);
      assert.equal(prova(lev, r2(troskel + 0.01)).anomaly, true, `${lev} över ${troskel}`);
    }
  });

  test('LT-02 · mains utfall per plats står kvar, även när varje rad är en prövad nivårad', () => {
    // Business Basic läst som årssumma per månad (L-1): till granskning, som på main.
    assert.equal(prova('microsoft', 66.91 * 12).anomaly, true, '802,92');
    assert.equal(prova('microsoft', 80.29 * 12).anomaly, true, '963,48');
    // Korrekt lästa fakturor med tillägg som main prissatte (T-1).
    for (const pps of [133.82 + 286.80, 66.91 + 200.70, 66.91 + 286.80, 80.29 + 95.60 + 28.70, 210.29 + 286.80]) {
      assert.equal(prova('microsoft', pps).anomaly, false, String(pps));
    }
    // E5 på månadsfakturering (769,42) går till granskning som på main, med och utan nivårad. Förexisterande:
    // ett tak per plats kan inte skilja den från ett fel med samma tal (regel 13).
    assert.equal(prova('microsoft', 769.42).anomaly, true, 'E5 per plats utan rader, som main');
    assert.equal(provaRader('Microsoft', [rad(NAMN.e5, 769.42)], 'monthly', 769.42).anomaly, true, 'E5 med nivårad, som main');
    // Hos en leverantör main inte prövar prissätts samma faktura, för raden ligger under 2 × listpris.
    assert.equal(provaRader('Microsoft Ireland Operations Ltd', [rad(NAMN.e5, 769.42)], 'monthly', 769.42).anomaly, false);
    // Med ett tillägg på fakturan gäller mains tak: E5 + Copilot (1 056,22) till granskning, som på main.
    assert.equal(provaRader('Microsoft', [rad(NAMN.e5, 769.42), rad('Microsoft 365 Copilot', 286.80)], 'monthly', 1056.22).anomaly, true);
    // Adobe till listpris (985) går till granskning som på main: boken saknar en radläsare för Adobes produkter.
    assert.equal(prova('adobe', 985).anomaly, true, 'Adobe Creative Cloud Pro, förexisterande');
    assert.equal(prova('adobe', 381 * 3).anomaly, true, 'Single App som kvartalssumma, 1 143');
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
      prisprovningensIndata({ pricePerSeatMonthly: 416.77, lineItems: rader, billingPeriod: 'quarterly', annat: 1 }, { normalizedSupplier: 'Crayon AS', category: 'saas-productivity' }),
      { normalizedSupplier: 'Crayon AS', category: 'saas-productivity', pricePerSeatMonthly: 416.77, lineItems: rader, billingPeriod: 'quarterly' });
    assert.deepEqual(prisprovningensIndata({}, {}), { normalizedSupplier: null, category: null, pricePerSeatMonthly: null, lineItems: [], billingPeriod: null });
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
    // En engångsfaktura har inget månadspris, och en rad som inte är löpande bär inte priset per plats.
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 5000)], 'one_time').prov, null);
    const engang = provaRader('Crayon AS', [rad(NAMN.e3, 416.77), rad(NAMN.e3, 5000, 1, { type: 'one_time_fee' })]);
    assert.deepEqual({ anomaly: engang.anomaly, prov: engang.prov }, { anomaly: false, prov: 'rad' });
    // T2-2: belopp ÷ antal går före à-priset, för kundens årskostnad byggs av beloppet.
    const t22 = { description: NAMN['business-standard'], type: 'recurring_subscription', quantity: 10, unitPrice: 1605.84, amount: 1338.20 };
    assert.equal(provaRader('Dustin AB', [t22]).anomaly, false, 'à-pris per år, belopp per månad');
    assert.equal(provaRader('Crayon AS', [{ ...t22, unitPrice: 133.82, amount: 13382 * 12 / 100 * 10 }]).anomaly, true, 'motprov: beloppet är en årssumma');
    assert.equal(radensPrisPerManad({ quantity: 10, amount: 1000, amountOre: 133820 }, 'monthly'), 133.82, 'öresbeloppet går före kronorbeloppet');
    // L-3: en rad utan antal prövas inte, för à-priset går inte att stämma av mot beloppet. Fallet ur
    // andra blicken: à-pris per år, belopp för tio licenser per månad, korrekt läst; main prissatte det.
    const l3 = { description: NAMN.e3, type: 'recurring_subscription', quantity: null, unitPrice: 5001.24, amount: 4167.70 };
    assert.deepEqual(provaRader('Crayon AS', [l3], 'monthly', 416.77), { ok: true, anomaly: false, prov: null });
    assert.equal(provaRader('Crayon AS', [{ ...l3, unitPriceOre: 80292, unitPrice: 802.92 }]).prov, null, 'à-pris i öre utan antal');
    // L-4: antal 0 prövas inte, och en rad utan typ räknas som löpande.
    assert.equal(provaRader('Crayon AS', [{ ...l3, quantity: 0, unitPrice: 416.77 }]).prov, null, 'antal 0');
    const utanTyp = { description: NAMN.e3, quantity: 10, unitPrice: 5001.24, amount: 50012.4 };
    assert.equal(provaRader('Crayon AS', [utanTyp]).anomaly, true, 'rad utan typ, årssumma');
    assert.equal(provaRader('Crayon AS', [{ ...utanTyp, unitPrice: 416.77, amount: 4167.7 }]).prov, 'rad', 'motprov: rad utan typ, listpris');
    // «(EES)» läses som Business Basic, och en årssumma därav går till granskning.
    assert.equal(provaRader('Microsoft Ireland Operations Ltd', [rad('Microsoft 365 Business Basic (EES)', 57.40 * 12)], 'unknown').anomaly, true);
    // F4-2, förexisterande och öppet: «EES (exkl. Teams)» läses inte som nivå, och årssumman under mains
    // tröskel prissätts som på main. Stängs när boken bär EES-priserna.
    for (const pris of [619.32, 743.16]) {
      for (const lev of ['Microsoft', 'Microsoft Ireland Operations Ltd']) {
        assert.equal(provaRader(lev, [rad('Microsoft 365 Business Basic EES (exkl. Teams)', pris)], 'unknown', pris).anomaly, false, `F4-2 ${lev} ${pris}`);
      }
    }
    // En rad utanför boken gör att mains tak gäller: Azure och Dynamics på en Microsoft-faktura går till
    // granskning som på main, och hos en återförsäljare som main inte prövar prissätts de.
    const azure = [rad(NAMN.e3, 416.77), rad('Azure-förbrukning oktober', 4500, 1)];
    assert.equal(provaRader('Microsoft', azure, 'monthly', 866.77).anomaly, true);
    assert.equal(provaRader('Crayon AS', azure, 'monthly', 866.77).anomaly, false);
  });

  test('LT-06 · svepet mot main: noll fall där main hade rätt och den nya prövningen fel', () => {
    // Rutnätet efter tre granskningar: olika antal per rad, platser räknade som största antal och som
    // summan av produktraderna (extraktionens två regler), produkter utanför boken, ett felläst tal på
    // valfri rad, felläst projektion och antal, rader utan antal, Adobe med flera produkter, paketfakturor
    // i sina egna kategorier, och Microsofts rader i kategorier där radprövningen är avstängd.
    const MSPROD = [
      [NAMN['business-basic'], 66.91, 80.29], [NAMN['business-standard'], 133.82, 160.58], [NAMN['business-premium'], 210.29, 252.35],
      [NAMN.e3, 416.77, 500.12], [NAMN.e5, 641.18, 769.42], ['Office 365 E3', 256.34, 307.61], ['Microsoft 365 licens', 133.82, 160.58],
      ['Microsoft 365 Business Basic EES (exkl. Teams)', 51.61, 61.93],
    ];
    const MSADD = [['Microsoft Defender for Business', 28.70], ['Teams Phone Standard', 95.60], ['Microsoft 365 Copilot', 286.80], ['Exchange Online Plan 1', 38.20]];
    const ADOBE = [['Adobe Creative Cloud Alla program', 985], ['Adobe Creative Cloud Single App Photoshop', 381], ['Adobe Acrobat Pro', 273], ['Adobe Sign', 420]];
    const LEV_MS = ['Microsoft', 'Microsoft Ireland Operations Ltd', 'Crayon AS', 'microsoft corporation'];
    const utfall = [];
    const fall = (lev, rader, period, fel, { projFaktor = 1, category = 'saas-productivity' } = {}) => {
      const manader = period === 'annual' ? 12 : period === 'quarterly' ? 3 : 1;
      const projected = rader.reduce((s, x) => s + x.amount, 0) * projFaktor;
      const prod = rader.filter((x) => !x.tillagg);
      for (const platser of [Math.max(...rader.map((x) => x.quantity ?? 10)), prod.reduce((s, x) => s + (x.quantity ?? 10), 0)]) {
        const pps = r2(projected / platser / manader);
        utfall.push({ fel, main: mainsUtfall(lev, pps), ny: provaRader(lev, rader, period, pps, category).anomaly });
      }
    };
    for (const lev of LEV_MS) for (const period of ['monthly', 'unknown', 'quarterly', 'annual']) {
      const pm = period === 'annual' ? 12 : period === 'quarterly' ? 3 : 1;
      for (let i = 0; i < MSPROD.length; i++) for (const j of [null, ...MSPROD.keys()]) {
        if (j != null && j <= i) continue;
        for (const add of [null, ...MSADD.keys()]) for (const bas of [1, 2, 1.15]) for (const [q1, q2, qa] of [[1, 3, 1], [5, 5, 3], [10, 2, 10], [25, 10, 5]]) {
          const pris = (p) => (bas === 2 ? p[2] : p[1] * bas) * pm;
          const bygg = (felIdx, f) => {
            const r = [rad(MSPROD[i][0], pris(MSPROD[i]) * (felIdx === 0 ? f : 1), q1)];
            if (j != null) r.push(rad(MSPROD[j][0], pris(MSPROD[j]) * (felIdx === 1 ? f : 1), q2));
            if (add != null) r.push(rad(MSADD[add][0], MSADD[add][1] * pm * (felIdx === 2 ? f : 1), qa, { tillagg: true }));
            return r;
          };
          fall(lev, bygg(null, 1), period, false);
          for (const pf of [3, 12]) fall(lev, bygg(null, 1), period, true, { projFaktor: pf });
          if (q1 % 2 === 0) {
            const r = bygg(null, 1);
            r[0] = { ...r[0], quantity: q1 / 2, unitPrice: r2(r[0].amount / (q1 / 2)) };
            fall(lev, r, period, true);
          }
          if (period === 'annual' || period === 'quarterly') continue;
          for (const f of [3, 12]) for (const idx of [0, 1, 2]) {
            if ((idx === 1 && j == null) || (idx === 2 && add == null)) continue;
            fall(lev, bygg(idx, f), period, true);
          }
        }
      }
    }
    for (const lev of ['Adobe', 'Adobe Systems Software Ireland Limited', 'adobe inc']) for (const period of ['monthly', 'unknown']) {
      for (let i = 0; i < ADOBE.length; i++) for (const j of [null, ...ADOBE.keys()]) {
        if (j != null && j <= i) continue;
        for (const paslag of [1, 1.10]) for (const [q1, q2] of [[1, 5], [5, 1], [15, 1], [3, 3]]) {
          const bygg = (idx, f) => {
            const r = [rad(ADOBE[i][0], ADOBE[i][1] * paslag * (idx === 0 ? f : 1), q1)];
            if (j != null) r.push(rad(ADOBE[j][0], ADOBE[j][1] * paslag * (idx === 1 ? f : 1), q2));
            return r;
          };
          fall(lev, bygg(null, 1), period, false, { category: 'saas-creative' });
          for (const f of [3, 12]) for (const idx of [0, 1]) {
            if (idx === 1 && j == null) continue;
            fall(lev, bygg(idx, f), period, true, { category: 'saas-creative' });
          }
        }
      }
    }
    // Paketfakturor (andra blicken L-1), korrekt lästa, i sina egna kategorier.
    for (const [lev, category, text, pris, antal] of PAKET) for (const period of ['monthly', 'unknown']) {
      fall(lev, [rad(text, pris, antal)], period, false, { category });
    }
    // Rad utan antal (L-3): à-priset per år, beloppet för tio licenser per månad. Korrekt läst.
    for (const lev of LEV_MS) for (const [namn, ars] of MSPROD) for (const period of ['monthly', 'unknown']) {
      fall(lev, [{ description: namn, type: 'recurring_subscription', quantity: null, unitPrice: r2(ars * 12), amount: r2(ars * 10) }], period, false);
    }
    // Microsofts rader i en kategori utan radprövning: utfallet ska vara mains, fall för fall.
    const forsta = utfall.length;
    for (const category of ['managed-workplace', 'it-support', null]) for (const lev of LEV_MS) for (const [namn, ars] of MSPROD) for (const f of [1, 3, 12]) {
      fall(lev, [rad(namn, ars * f, 10)], 'monthly', f > 1, { category });
    }
    assert.equal(utfall.slice(forsta).filter((x) => x.main !== x.ny).length, 0, 'utanför saas-productivity är utfallet mains');
    assert.equal(utfall.length - forsta, 576);

    const ratt = (x, vem) => x[vem] === x.fel;
    const raknat = {
      fall: utfall.length,
      main: utfall.filter((x) => ratt(x, 'main')).length,
      ny: utfall.filter((x) => ratt(x, 'ny')).length,
      forsamrat: utfall.filter((x) => ratt(x, 'main') && !ratt(x, 'ny')).length,
      battre: utfall.filter((x) => !ratt(x, 'main') && ratt(x, 'ny')).length,
    };
    // Exakta tal ur körningen 28 okt. Ett ändrat tal är en ändrad prövning och kräver ett nytt svep.
    // Samma rutnät mot ea56bf42 gav försämrat 96 (paketen och raderna utan antal), så instrumentet kan
    // svara annat än noll.
    assert.deepEqual(raknat, { fall: 407568, main: 170144, ny: 222372, forsamrat: 0, battre: 52228 });
    // Motprov: referensen är mains, inte den nya prövningen. En årssumma hos återförsäljaren skiljer dem åt.
    assert.equal(mainsUtfall('Crayon AS', 416.77 * 12), false);
    assert.equal(provaRader('Crayon AS', [rad(NAMN.e3, 416.77 * 12)], 'monthly', 416.77 * 12).anomaly, true);
  });

  test('LT-07 · taket per plats nycklas på mains nio exakta namn (F5-1, T2-4)', () => {
    const NIO = { 'microsoft': 765.7, 'microsoft 365': 765.7, 'microsoft corporation': 765.7, 'google': 468,
      'google workspace': 468, 'google llc': 468, 'adobe': 908.7, 'adobe inc': 908.7, 'adobe systems': 908.7 };
    for (const [namn, troskel] of Object.entries(NIO)) {
      for (const lev of [namn, ` ${namn.toUpperCase()} `]) {
        assert.equal(prova(lev, troskel).anomaly, false, `${lev} på tröskeln`);
        assert.equal(prova(lev, r2(troskel + 0.01)).anomaly, true, `${lev} över tröskeln`);
      }
    }
    // Det juridiska namnet utan nivårad prövas inte per plats: ett varumärkesnycklat tak skickade
    // korrekta E3- och E5-fakturor med tillägg därifrån till granskning (svepet, regel 13).
    for (const lev of ['Microsoft Ireland Operations Ltd', 'Adobe Systems Software Ireland Limited', 'Crayon AS']) {
      assert.equal(prova(lev, 5000).anomaly, false, lev);
    }
  });

  test('LT-08 · gränsen per nivå: 2 × bokens högsta pris prissätts, en öre över går till granskning (T2-6)', () => {
    for (const [niva, [, man]] of Object.entries(MS)) {
      const grans = r2(2 * man);
      assert.equal(provaRader('Crayon AS', [rad(NAMN[niva], grans, 1)]).anomaly, false, `${niva} på ${grans}`);
      assert.equal(provaRader('Crayon AS', [rad(NAMN[niva], r2(grans + 0.01), 1)]).anomaly, true, `${niva} över ${grans}`);
    }
    // 2,2 × månadspriset är ingen påslagsnivå: till granskning.
    assert.equal(provaRader('Crayon AS', [rad(NAMN['business-premium'], 2.2 * 252.35)]).anomaly, true, 'Premium 555,17');
    // T2-1:s fall, alla till granskning som på main.
    assert.equal(provaRader('Microsoft', [rad('Office 365 E3', 256.34 * 3)], 'monthly', 769.02).anomaly, true, 'Office 365 E3 som kvartalssumma');
    assert.equal(provaRader('Microsoft', [rad(NAMN['business-basic'], 80.29, 5), rad('Teams Phone Standard', 95.60 * 12, 3)], 'monthly', 768.61).anomaly, true);
    assert.equal(provaRader('Adobe', [rad('Adobe Creative Cloud Alla program', 985, 15), rad('Adobe Creative Cloud Single App', 381 * 3, 1)], 'monthly', 1061.20).anomaly, true);
  });

  test('LT-09 · rätta radpriser hoppar inte över taket: projektion ×12 och halverat antal går till granskning', () => {
    // Årsfaktura, Business Basic 10 × 802,92 per år, rätt rad, men projektionen läst ×12 (årskostnad 96 350
    // i stället för 8 029). Main fångar den på priset per plats; ec21e155 prissatte den.
    const basic = [rad(NAMN['business-basic'], 802.92)];
    assert.equal(provaRader('Microsoft', basic, 'annual', 802.92).anomaly, true, 'projektion ×12');
    assert.equal(provaRader('Microsoft', basic, 'annual', 66.91).anomaly, false, 'motprov: projektionen rätt');
    // E3 läst som 5 licenser i stället för 10, beloppet oförändrat: priset per plats fördubblas.
    const e3 = [{ description: NAMN.e3, type: 'recurring_subscription', quantity: 5, unitPrice: 416.77, amount: 4167.7 }];
    assert.equal(provaRader('Microsoft', e3, 'monthly', 833.54).anomaly, true, 'antal/2');
    assert.equal(provaRader('Microsoft', e3, 'monthly', 416.77).anomaly, false, 'motprov: platserna rätt');
  });

  test('LT-10 · paketfakturor i sina egna kategorier går aldrig till granskning för ett radpris (L-1)', () => {
    for (const [lev, category, text, pris, antal] of PAKET) {
      const u = provaRader(lev, [rad(text, pris, antal)], 'monthly', pris, category);
      assert.deepEqual(u, { ok: true, anomaly: false, prov: null }, `${lev} · ${category}`);
      // Motprov: samma rad i like-for-likes kategori läses som en licens, och priset går inte att förklara.
      assert.equal(provaRader(lev, [rad(text, pris, antal)], 'monthly', pris, 'saas-productivity').anomaly, true, `${lev} som licens`);
    }
    // Grinden är exakt like-for-likes kategori, inte en spärrlista, ett prefix eller skiftlägesokänslig:
    // en E3-årssumma läst som månad prövas bara i saas-productivity (fjärde granskaren, död på
    // användningsgränsen: tre sådana grindar fällde noll tester).
    const arssumma = [rad(NAMN.e3, 416.77 * 12)];
    assert.equal(provaRader('Crayon AS', arssumma, 'monthly', null, 'saas-productivity').anomaly, true, 'motprov');
    for (const kategori of ['saas-crm', 'saas-creative', 'saas-other', 'serverhosting', 'mobil', 'managed-workplace',
      'it-support', 'SaaS-Productivity', ' saas-productivity', null]) {
      assert.deepEqual(provaRader('Crayon AS', arssumma, 'monthly', null, kategori), { ok: true, anomaly: false, prov: null }, String(kategori));
    }
    // Utan kategori alls (provaRader har saas-productivity som standardvärde, så den anropas direkt).
    assert.deepEqual(validateSeatPrice({ normalizedSupplier: 'Crayon AS', lineItems: arssumma, billingPeriod: 'monthly' }),
      { ok: true, anomaly: false, prov: null }, 'ingen kategori');
    // test-invoice skickar kategorin vidare, så att grinden når produktionen.
    assert.equal(prisprovningensIndata({}, { category: 'managed-workplace' }).category, 'managed-workplace');
    // Kategorin som släpper paketen är like-for-likes; grinden är ingen namnlista.
    const kod = readFileSync(rot('lib/supplier-price-intel.js'), 'utf8');
    assert.match(kod, /const RADPROVNINGENS_KATEGORI = 'saas-productivity';/);
  });
});

describe('LT-11 · beskedet vid en prisavvikelse påstår inget om talet', () => {
  // Fem granskningsvarv föll på samma form (N-1, P-1, Q-1, R-1, S-1/S-2): varje förklaring av talet var
  // falsk för en klass fakturor som samma prövning stoppar. Meningen säger nu bara att en kontroll slog
  // till och vad den är till för, och den låses ordagrant.
  const MENING = 'En av våra automatiska priskontroller slog till. Det behöver inte '
    + 'betyda att priset är fel: kontrollen finns för att fånga tal vi kan ha läst fel, till exempel en '
    + 'kvartalssumma som ett månadspris, och den stoppar också vissa korrekta fakturor.';

  test('LT-11 · meningen, rubriken och slutet, ordagrant, utan enhet eller ursprung för talet', async () => {
    const m = await import('../src/lib/prisavvikelse.js');
    assert.equal(m.PRISAVVIKELSE_MENING, MENING);
    assert.equal(m.PRISAVVIKELSE_RUBRIK, 'Vi stoppade prissättningen.');
    assert.equal(m.PRISAVVIKELSE_SLUT, 'Därför visar vi inga besparingssiffror för den här fakturan.');
    assert.deepEqual(Object.keys(m).sort(), ['PRISAVVIKELSE_MENING', 'PRISAVVIKELSE_RUBRIK', 'PRISAVVIKELSE_SLUT']);
    for (const t of [MENING, m.PRISAVVIKELSE_RUBRIK, m.PRISAVVIKELSE_SLUT]) {
      assert.doesNotMatch(t, /per användare|per licens|licensrad|licenspris|fakturans|antalet|tillägg|listpris|Copilot|Adobe|Microsoft|Google/i);
    }
  });

  test('LT-11 · kedjan från extraktionen: perioden delas bort, och nämnaren är användarna (R-3)', async () => {
    const { aggregateLineItems } = await import('../agents/test-invoice/extract.js');
    const radRa = (d, q, p) => ({ description: d, type: 'recurring_subscription', quantity: q, unitPrice: Math.round(p),
      amount: r2(q * p), amount_ore: Math.round(q * p * 100), unit_price_ore: Math.round(p * 100) });
    const kor = (lev, category, raw) => {
      const ext = aggregateLineItems({ supplier: lev, date: '2026-10-01', confidenceScore: 0.95, currency: 'SEK', ...raw }, null);
      return { pps: ext.pricePerSeatMonthly, ...validateSeatPrice(prisprovningensIndata(ext, { normalizedSupplier: lev, category })) };
    };
    const adobe = kor('Adobe', 'saas-creative', { billingPeriod: 'monthly', seatCount: 5, projectedRecurringAmount: 5198,
      lineItems: [radRa('Adobe Creative Cloud Alla program', 5, 985), radRa('Adobe Acrobat Pro', 1, 273)] });
    assert.deepEqual([adobe.pps, adobe.anomaly, adobe.prov], [1039.6, true, 'per_plats'], 'delat med användare, inte licenser');
    const kvartal = kor('Microsoft', 'saas-productivity', { billingPeriod: 'quarterly', billing_period_start: '2026-10-01',
      billing_period_end: '2026-12-31', seatCount: 10, projectedRecurringAmount: 12503.1, lineItems: [radRa(NAMN.e3, 10, 3 * 416.77)] });
    assert.deepEqual([kvartal.pps, kvartal.anomaly], [416.77, false], 'periodens månader delas bort');
  });

  test('LT-11 · vyns gren visar modulens text, och inget annat villkor tar skälet eller döljer kortet (Q-4, S-3)', () => {
    const utanKommentar = (t) => t.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    const vy = readFileSync(rot('src/pages/TestaFaktura/index.js'), 'utf8');
    assert.match(vy, /^import \{ PRISAVVIKELSE_RUBRIK, PRISAVVIKELSE_MENING, PRISAVVIKELSE_SLUT \} from '\.\.\/\.\.\/lib\/prisavvikelse';$/m);
    for (const namn of ['PRISAVVIKELSE_RUBRIK', 'PRISAVVIKELSE_MENING', 'PRISAVVIKELSE_SLUT']) {
      assert.equal(vy.match(new RegExp(`\\b${namn}\\b`, 'g'))?.length, 2, `${namn}: importen och användningen, ingen egen definition (W1)`);
    }
    assert.equal(vy.match(/['"`]price_anomaly['"`]/g)?.length, 1, 'en annan gren i vyn fångar price_anomaly');
    assert.doesNotMatch(vy, /anomaly\//, 'ett reguljärt uttryck i vyn läser skälet (W5)');
    assert.equal(vy.match(/\) : result\.route === 'review_queue' \? \(/g)?.length, 1, 'granskningsgrenens villkor är ändrat (W5)');
    const a = vy.indexOf("result.reason === 'price_anomaly' ?");
    const b = vy.indexOf('result.reason ===', a + 10);
    assert.ok(a > 0 && b > a && b - a < 2000, 'grenen hittades inte');
    const gren = utanKommentar(vy.slice(a, b)).replace(/\s+/g, ' ').trim();
    assert.equal(gren, "result.reason === 'price_anomaly' ? ( <> <strong>{PRISAVVIKELSE_RUBRIK}</strong> "
      + '<p>{PRISAVVIKELSE_MENING} {PRISAVVIKELSE_SLUT}</p> </> ) :');
    // Motprov: den generiska texten finns kvar för de andra skälen, så skanningen läser rätt fil.
    assert.match(vy, /inte tillräckligt säker på klassificeringen/);
  });
});

describe('SS · inga prisseedar i repot', () => {
  test('SS-01 · migreringen skapar tabeller men skriver inga priser, och seedskriptet är borta', () => {
    const mig = readFileSync(rot('api/admin/run-migration.mjs'), 'utf8');
    assert.doesNotMatch(mig, /upsertPrice/, 'run-migration skriver priser igen');
    assert.doesNotMatch(mig, /name: 'seed:/);
    // Skrivning till supplier_prices i run-migration och i varje migreringsskript (N-4, P-5, Q-6, R-6, S-4).
    const SKRIVNING = /\b(?:INSERT\s+INTO|UPDATE(?:\s+ONLY)?|UPSERT\s+INTO|MERGE\s+INTO)\s+(?:"?\w+"?\.)?"?supplier_prices\b/i;
    const migreringar = readdirSync(new URL('../scripts/', import.meta.url)).filter((f) => /^migrate.*\.mjs$/.test(f));
    assert.ok(migreringar.includes('migrate-price-db.mjs'), 'motprov: skanningen hittar migreringsskripten');
    for (const [namn, text] of [['api/admin/run-migration.mjs', mig], ...migreringar.map((f) => [`scripts/${f}`, readFileSync(rot(`scripts/${f}`), 'utf8')])]) {
      assert.doesNotMatch(text, SKRIVNING, `${namn} skriver ett pris`);
    }
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
