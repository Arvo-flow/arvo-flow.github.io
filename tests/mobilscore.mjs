// tests/mobilscore.mjs — MS · mobil kräver bekräftat abonnemang innan rummet visar avstånd och score.
//
// Grundarbeslut 2026-10-22: «Mobil ska kräva ett bekräftat abonnemang innan rummet visar procentuellt
// avstånd och score. Utan bekräftat abonnemang visar rummet neutralt vad kunden betalar och vad
// billigaste plan kostar, utan att påstå ett avstånd.» Skälet: Tele2:s tre publicerade 24-månaders-
// abonnemang (269, 299, 349 kr/mån) är olika produkter, och en kund som betalade exakt listpris för
// 349-abonnemanget fick «+30 % över billigaste publicerade pris» och score 59. Talet mätte planvalet.
//
// Rummet byggs här med produktionens egna funktioner (buildBranchAnchors → berikaRader), aldrig med
// ett handskrivet prisunderlag.
//
// FÅNGAR: en mobilrad som får avstånd, poäng eller ett prisomdöme, också med ett lagrat byte (MS-08), och en
//   kombinerad faktura som tappar sin bredbandsdel (MS-13); ett elbyte kallat prissatt mot verifierat
//   listpris (MS-12); ett rum som väger ihop en del av boken till en poäng och berömmer den (MS-09); ett ankarkort i en
//   spärrad kategori (MS-06, genom anrop); en spärr utan mätning eller skäl; medianens etikett «Samma
//   licens utan bindning» på ett annat abonnemang; löftet «Dela avtalet».
// BLIND, också: domens ordalydelse för ett rum utan samlad poäng står i Portfolio och prövas av
//   renderingssonden (scripts/screenshot-mobilscore.mjs), inte av sviten. Fakturavyn, mejlen, briefingen
//   och dörren räknar fortfarande mobilens avstånd och byte (C1-3, öppet).
// BLIND: ingen kod läser i dag ett mobilabonnemang ur fakturan, så grenen «bekräftat abonnemang» för
//   mobil finns inte än; testet låser bara att den obekräftade grenen är neutral.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { buildBranchAnchors, berikaRader } from '../api/invoice-history.mjs';
import { byggPrisunderlag } from '../lib/prisunderlag.js';
import { detectPriceAlert } from '../lib/price-alert.js';
import { byggRum } from '../api/invoice-history.mjs';
import { valjAnkare } from '../src/lib/ankarval.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const LEV = { mobil: 'Tele2', 'saas-productivity': 'Microsoft', loneadmin: 'Fortnox' };
const rad = (id, category, annualCost, seats, rader = [], byte = null) => ({
  id, category, route: 'auto', supplier: LEV[category] ?? 'Leverantör', normalized_supplier: null,
  annual_cost: annualCost, seat_count: seats, should_switch: false, _rader: rader,
  ...(byte ? { should_switch: true, suggested_annual_cost: byte.suggested, gross_saving: annualCost - byte.suggested,
    net_saving: Math.round((annualCost - byte.suggested) * 0.8) } : {}),
});
const E3 = [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: 10, unitPrice: 416.77, amount: 4167.7 }];
async function rummet(analyses) {
  const ankare = await buildBranchAnchors(analyses);
  return berikaRader(analyses, ankare);
}

describe('MS · mobil kräver bekräftat abonnemang (grundarbeslut 2026-10-22)', () => {
  test('MS-01 · mobilraden får inget avstånd, ingen poäng och inget prisomdöme, oavsett abonnemang', async () => {
    // Tio abonnemang till vart och ett av Tele2:s tre publicerade 24-månaderspriser, och ett under golvet.
    for (const perManad of [269, 299, 349, 199]) {
      const [a] = await rummet([rad(1, 'mobil', perManad * 12 * 10, 10)]);
      const p = a.prisunderlag;
      assert.ok(p, `prisunderlag för ${perManad}`);
      assert.equal(p.ovissNiva, true, `${perManad}: abonnemanget är inte bekräftat`);
      assert.equal(p.avstandPct, null, `${perManad}: inget avstånd`);
      assert.equal(p.underGolv, null, `${perManad}: inget «på eller under»`);
      assert.equal(a.arvoScore, null, `${perManad}: ingen poäng`);
      assert.equal(a.lage?.kod, 'oviss_niva', `${perManad}: radens läge`);
      // Fakta står kvar: vad kunden betalar och vad det billigaste abonnemanget kostar.
      assert.equal(p.perEnhet, perManad * 12);
      assert.equal(p.golv, 269 * 12);
    }
    // Motprov: en M365-rad med nivån i radtexten får avstånd och poäng, så instrumentet kan svara annat.
    const [m] = await rummet([rad(2, 'saas-productivity', 416.77 * 12 * 10, 10,
      [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: 10, unitPrice: 416.77, amount: 4167.7 }])]);
    assert.equal(m.prisunderlag?.nivaBekraftad, true);
    assert.equal(typeof m.prisunderlag?.avstandPct, 'number');
    assert.equal(typeof m.arvoScore, 'number');
  });

  test('MS-02 · varje spärr är antingen mätt (spännvidd över 3) eller bär sitt skäl i prisboken', () => {
    const GRANS = 3;
    let medSkal = 0;
    for (const [k, cat] of Object.entries(BRANCHINDEX)) {
      if (cat?.source !== 'real-public') continue;
      const tiers = Object.values(cat.licenseTierBenchmarks ?? {})
        .filter((t) => t?.currency === 'SEK' && t?.msrpAnnual > 0).map((t) => t.msrpAnnual);
      const spridning = tiers.length >= 2 ? Math.max(...tiers) / Math.min(...tiers) : null;
      const skal = cat.kraverBekraftadNivaSkal;
      if (cat.kraverBekraftadNiva === true && !(spridning > GRANS)) {
        assert.ok(typeof skal === 'string' && skal.length >= 20, `${k}: spärr utan mätning måste bära sitt skäl`);
        medSkal++;
      }
      if (cat.kraverBekraftadNiva !== true) assert.equal(skal, undefined, `${k}: ett skäl utan spärr`);
    }
    assert.equal(medSkal, 1, 'exakt mobil bär ett beslutat skäl');
    assert.equal(BRANCHINDEX.mobil.kraverBekraftadNiva, true);
    // Bytesmålet mot kategorins golv deklareras bara där nivån krävs, och i dag bara för mobil (D1-1).
    const golvbyten = Object.entries(BRANCHINDEX).filter(([, c]) => c?.bytesmalMotKategorigolv === true).map(([k]) => k);
    assert.deepEqual(golvbyten, ['mobil']);
  });

  test('MS-03 · medianens etikett kommer ur prisboken, och mobilens median är ett annat abonnemang', async () => {
    const [mob] = await rummet([rad(1, 'mobil', 349 * 12 * 10, 10)]);
    assert.equal(mob.prisunderlag.median, 299 * 12);
    assert.equal(mob.prisunderlag.medianEtikett, 'Näst billigaste publicerade abonnemang');
    const [saas] = await rummet([rad(2, 'saas-productivity', 1700 * 10, 10)]);
    assert.equal(saas.prisunderlag.medianEtikett, 'Samma licens utan bindning');
    // Utan etikett i ankaret visas inget median-tal i rummet.
    assert.equal(byggPrisunderlag({ annualCost: 10000, seats: 10, ankare: { p25: 900, median: 1200 } }).medianEtikett, null);
    // Nivågrenen (C1-8): med bekräftad nivå är medianen samma licens utan bindning, också utan ankare.
    assert.equal(byggPrisunderlag({ annualCost: 50000, seats: 10, ankare: null,
      niva: { arsprisPerEnhet: 5001, manadsprisPerEnhet: 5500 } }).medianEtikett, 'Samma licens utan bindning');
    const rum = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    assert.match(rum, /\{p\.medianEtikett && p\.median > 0 && p\.median !== p\.golv && \(/, 'raden visas bara med etikett');
    assert.match(rum, /<span className="u-txt">\{p\.medianEtikett\}<\/span>/, 'etiketten är prisbokens');
    assert.doesNotMatch(rum, /<span className="u-txt">Samma licens utan bindning<\/span>/, 'ingen hårdkodad etikett');
  });

  test('MS-04 · texterna för obekräftad nivå gäller både licenser och abonnemang, och lovar inget utan mekanik', async () => {
    const { MOTIVERING } = await import('../src/lib/rumstext.js');
    const [a] = await rummet([rad(1, 'mobil', 349 * 12 * 10, 10)]);
    const text = MOTIVERING.oviss_niva(a.prisunderlag, 'mobil');
    assert.match(text, /säger inget om avståndet/);
    for (const falskt of [/licens/i, /tio gånger/, /Dela avtalet/i, /låser vi jämförelsen/i]) {
      assert.doesNotMatch(text, falskt, `radens text säger ${falskt}`);
    }
    const rum = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    for (const falskt of [/Dela avtalet/i, /låser vi jämförelsen/i, /Med avtalet i handen/i, /nästan tio gånger/]) {
      assert.doesNotMatch(rum, falskt, `rummet säger ${falskt}`);
    }
    // «Den jämförelsen kommer …» syftar på vad andra bolag betalar och följer inte den obekräftade grenen.
    assert.match(rum, /\{!p\.ovissNiva && <>\{' '\}Den jämförelsen kommer när fler i er bransch delar sina fakturor\.<\/>\}/);
  });

  test('MS-06 · ankarkortet jämför aldrig ett pris i en kategori som kräver bekräftad nivå', async () => {
    // Prövat genom anrop (C1-5): som källtext överlevde sviten att spärren flyttades efter tilldelningen.
    const rader = [rad(1, 'mobil', 418_800, 100), rad(2, 'saas-productivity', 50_000, 10), rad(3, 'loneadmin', 6000, 10)];
    const ankare = await buildBranchAnchors(rader);
    assert.equal(ankare.mobil?.kraverBekraftadNiva, true);
    assert.equal(ankare['saas-productivity']?.kraverBekraftadNiva, true);
    assert.equal(ankare.loneadmin?.kraverBekraftadNiva, false);
    const grupper = rader.map((latest) => ({ latest }));
    assert.notEqual(ankare.mobil.median, ankare.loneadmin.median, 'medianerna måste gå att skilja åt');
    assert.equal(valjAnkare(grupper, ankare)?.median, ankare.loneadmin.median, 'ankaret valdes i en spärrad kategori');
    // Motprov: utan spärren vinner mobil, som har mest kostnad. Instrumentet kan alltså svara annat.
    const utanSparr = { ...ankare, mobil: { ...ankare.mobil, kraverBekraftadNiva: false } };
    assert.equal(valjAnkare(grupper, utanSparr)?.median, ankare.mobil.median);
    assert.equal(valjAnkare([rad(1, 'mobil', 418_800, 100)].map((latest) => ({ latest })), ankare), null);
    const rum = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    assert.match(rum, /return valjAnkare\(suppliers, branchAnchors\);/, 'rummet väljer ankaret själv');
  });

  test('MS-08 · ett lagrat byte på en obekräftad mobilrad visas inte: inget byte, ingen poäng, inget procenttal', async () => {
    // Fakturavägen lagrar 349-planen till listpris med byte till 269-planen (C1-1). Rummet räknar vid läsning.
    const analyses = await rummet([rad(1, 'mobil', 349 * 12 * 10, 10, [], { suggested: 269 * 12 * 10 })]);
    const [a] = analyses;
    assert.deepEqual(a.bytetUndanhallet, { del: 'hela', kvar: null, harRader: false });
    assert.equal(a.should_switch, false);
    assert.equal(a.net_saving, null);
    assert.equal(a.suggested_annual_cost, null);
    assert.equal(a.lage.kod, 'oviss_niva');
    assert.equal(a.lage.score, null);
    assert.equal(a.lage.params.ovPct, null);
    const rum = byggRum(analyses, []);
    assert.equal(rum.switchables, 0);
    assert.equal(rum.totalSaving, 0);
    assert.equal(rum.acting, false);
    assert.equal(rum.score, null);
    assert.equal(rum.ovissa, true, 'raden utan dom stoppar den samlade poängen');
    assert.equal(rum.counts.prissatta, 0);
    assert.doesNotMatch(rum.lage, /^byte_/);
    // Raden säger vad som hänt, och meningen beror på om raderna finns (D1-4, F1-2).
    const { radMotivering, BYTE_UNDANHALLET, BYTE_UNDANHALLET_UTAN_RADER } = await import('../src/lib/rumstext.js');
    assert.ok(radMotivering(a).endsWith(BYTE_UNDANHALLET_UTAN_RADER), 'utan rader: vi kan inte pröva');
    const mobilrader = [{ description: 'Tele2 Jobbmobil XL', type: 'recurring_subscription', quantity: 10, unitPrice: 349, amount: 3490 }];
    const [medRader] = await rummet([rad(5, 'mobil', 349 * 12 * 10, 10, mobilrader, { suggested: 269 * 12 * 10 })]);
    assert.deepEqual(medRader.bytetUndanhallet, { del: 'hela', kvar: null, harRader: true });
    assert.ok(radMotivering(medRader).endsWith(BYTE_UNDANHALLET));
    assert.ok(!radMotivering((await rummet([rad(4, 'mobil', 349 * 12 * 10, 10)]))[0]).includes('räknade fram ett byte'),
      'en mobilrad utan lagrat byte påstår att analysen räknade ett');
    // F1-4: också en mobilrad utan underlag (inget avläst antal) och en bevakad mobilrad håller inne sitt byte.
    const [utanAntal] = await rummet([rad(6, 'mobil', 349 * 12 * 10, null, [], { suggested: 269 * 12 * 10 })]);
    assert.equal(utanAntal.prisunderlag, null, 'premissen: utan antal finns inget underlag');
    assert.equal(utanAntal.should_switch, false);
    assert.equal(utanAntal.lage.score, null);
    const [bevakad] = await rummet([{ ...rad(7, 'mobil', 349 * 12 * 10, 10, [], { suggested: 269 * 12 * 10 }), route: 'monitoring' }]);
    assert.equal(bevakad.should_switch, false);
    assert.equal(bevakad.lage.kod, 'bevakat_avtal');
    assert.doesNotMatch(radMotivering(bevakad), /Vi har inte jämfört priset/, 'säger emot förklaringen');
    assert.ok(radMotivering(bevakad).endsWith(BYTE_UNDANHALLET_UTAN_RADER));
    // Motprov: en M365-rad med bekräftad nivå och ett byte behåller bytet.
    const [m] = await rummet([rad(2, 'saas-productivity', 600 * 12 * 10, 10, E3, { suggested: 416.77 * 12 * 10 })]);
    assert.equal(m.should_switch, true);
    assert.equal(m.lage.kod, 'byte');
    assert.equal(m.bytetUndanhallet, undefined);
    // Motprov 2 (D1-1): IT-8821 har två nivåer, så rummet kan inte läsa nivån. Bytet är räknat nivå för nivå
    // mot Microsofts egna listpriser (fixturens tal), alltså like-for-like, och står kvar.
    const it = JSON.parse(readFileSync(rot('tests/fixtures/it-8821-ms365.json'), 'utf8'));
    const [i] = await rummet([rad(3, 'saas-productivity', it.annualCost, it.seatCount, it.lineItems,
      { suggested: it.expected.suggestedAnnualCost })]);
    assert.equal(i.prisunderlag?.ovissNiva, true, 'två nivåer: rummet läser ingen nivå');
    assert.equal(i.should_switch, true, 'ett like-for-like-byte ströks');
    assert.equal(i.lage.kod, 'byte');
    assert.equal(i.bytetUndanhallet, undefined);
    assert.ok(!radMotivering(i).includes('räknade fram ett byte'));
  });

  test('MS-09 · ett rum med en obekräftad rad sätter ingen samlad poäng och berömmer inte priserna', async () => {
    // C1-2: med mobilen utanför vägningen blev rummet «Allt är under kontroll» på den enda mätta raden.
    for (const [namn, rader] of [
      ['mobil + löneadmin', [rad(1, 'mobil', 349 * 12 * 100, 100), rad(2, 'loneadmin', 5000, 10)]],
      ['mobil + E3', [rad(1, 'mobil', 349 * 12 * 100, 100), rad(2, 'saas-productivity', 416.77 * 12 * 10, 10, E3)]],
    ]) {
      const rum = byggRum(await rummet(rader), []);
      assert.equal(rum.ovissa, true, namn);
      assert.equal(rum.score, null, `${namn}: en samlad poäng över en del av boken`);
      assert.equal(rum.standing.satt, false, namn);
      assert.equal(rum.berom, false, `${namn}: rummet berömmer`);
      assert.equal(rum.lage, 'lugn_omatt', namn);
      assert.ok(rum.counts.prissatta >= 1, `${namn}: den mätta raden räknas`);
    }
    // En mobilrad utan underlag (inget avläst antal) vars byte hålls inne stoppar också poängen (F1-4).
    const utanAntal = byggRum(await rummet([rad(1, 'mobil', 349 * 12 * 100, null, [], { suggested: 269 * 12 * 100 }),
      rad(2, 'loneadmin', 5000, 10)]), []);
    assert.equal(utanAntal.ovissa, true, 'den indragna raden utan underlag vägs bort i tysthet');
    assert.equal(utanAntal.score, null);
    assert.equal(utanAntal.berom, false);
    // Motprov: utan obekräftad rad sätts poängen som förut.
    const ensam = byggRum(await rummet([rad(2, 'loneadmin', 5000, 10)]), []);
    assert.equal(ensam.ovissa, false);
    assert.equal(typeof ensam.score, 'number');
    assert.equal(ensam.standing.satt, true);
    const src = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    assert.match(src, /const ovissa = rum\?\.ovissa === true;/);
  });

  test('MS-10 · ett rum med en obekräftad mobilrad och ett bredbandsbyte: bytet är prissatt och bär domen', async () => {
    // D1-2 och E1-1: «Delvis mätt · 0 av 2» och «Vägde 0 fakturor» stod under «1 avtal kan skärpas».
    const analyses = await rummet([rad(1, 'mobil', 349 * 12 * 10, 10),
      { ...rad(2, 'bredband', 599 * 12, 1), supplier: 'Telia', should_switch: true, suggested_annual_cost: 399 * 12,
        gross_saving: 200 * 12, net_saving: 200 * 12 * 0.8 }]);
    const rum = byggRum(analyses, []);
    assert.equal(rum.hasSwitchAction, true);
    assert.equal(rum.score, null);
    assert.equal(rum.lage, 'byte_omatt');
    assert.equal(rum.counts.prissatta, 1, 'bredbandsbytet är räknat mot Tele2:s verifierade pris');
    assert.equal(rum.counts.mottagna, 1);
    // Ytan: chippet utan poäng skriver aldrig «0 av», och rubriken i byte_omatt påstår ingen källa.
    const src = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    const a = src.indexOf(': omatt && hasSwitchAction');
    const b = src.indexOf(': omatt && ovissa\n');
    assert.ok(a > 0 && b > a, 'bytets gren står inte före chippet utan poäng');
    assert.match(src.slice(a, b), /counts\.prissatta > 0 \? `\$\{counts\.prissatta\} av \$\{counts\.fakturor\} fakturor prissatta mot publika listpriser` : 'bytena står på raderna'/);
    assert.match(src, /byte_omatt: \{\n\s+h1: 'Ett par drag väntar på er\.',\n(?:\s+\/\/[^\n]*\n)*\s+head: <><em>\{antalByten\} avtal kan skärpas\.<\/em><\/>,/);
  });

  test('MS-12 · ett elbyte räknas inte som prissatt mot verifierat publikt listpris', async () => {
    // F1-1: elbytet räknas mot Arvos eget säsongsindex (EL_BENCHMARK_KWH, prisbokens el: estimated).
    const el = { ...rad(6, 'el', 46_000, 1), supplier: 'Vattenfall', should_switch: true, suggested_annual_cost: 0,
      gross_saving: 46_000, net_saving: 36_800 };
    const ensam = byggRum(await rummet([el]), []);
    assert.equal(ensam.counts.prissatta, 0, 'elbytet kallas prissatt');
    assert.equal(ensam.counts.mottagna, 1);
    const medMobil = byggRum(await rummet([rad(1, 'mobil', 349 * 12 * 10, 10), { ...el }]), []);
    assert.equal(medMobil.counts.prissatta, 0);
    assert.equal(medMobil.lage, 'byte_omatt');
    assert.equal(BRANCHINDEX.el.source, 'estimated', 'premissen: elens prisbok är en bedömning');
    // Motprov: ett bredbandsbyte i en kategori med verifierad prisbok räknas (MS-10).
  });

  test('MS-13 · en kombinerad mobil- och bredbandsfaktura behåller bredbandsdelen och håller inne mobildelen', async () => {
    // F1-2: raden lagrar summan. Bredbandsdelen räknas fram vid läsning med fakturavägens egna funktioner.
    const XL5 = { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', quantity: 5, unitPrice: 349, amount: 1745 };
    const BAS5 = { type: 'recurring_subscription', description: 'Tele2 Jobbmobil Bas (5 st)', quantity: 5, unitPrice: 269, amount: 1345 };
    const BB250 = { type: 'recurring_subscription', description: 'Bredband 250/250 Mbit/s', amount: 549 };
    const fall = [
      // K3: mobilen ligger redan på golvet; hela det lagrade bytet är bredband (3 720 brutto, 2 976 netto).
      { namn: 'K3', rader: [BAS5, BB250], lagrat: 3720, kvar: 3720, struket: false },
      // K2: mobildelen 4 800 är planvalet och hålls inne; bredbandets 3 720 står kvar.
      { namn: 'K2', rader: [XL5, BB250], lagrat: 8520, kvar: 3720, struket: true },
    ];
    const { radMotivering, BYTE_BREDBANDSDELEN, BYTE_MOBILDELEN_INDRAGEN } = await import('../src/lib/rumstext.js');
    const { netOf } = await import('../lib/fee.js');
    for (const f of fall) {
      const arlig = f.rader.reduce((s, r) => s + r.amount, 0) * 12;
      const lagrad = { ...rad(7, 'mobil', arlig, 5, f.rader), should_switch: true, gross_saving: f.lagrat,
        net_saving: netOf(f.lagrat), suggested_annual_cost: arlig - f.lagrat };
      const analyses = await rummet([lagrad]);
      const [a] = analyses;
      assert.equal(a.should_switch, true, `${f.namn}: bredbandsdelen ströks`);
      assert.equal(a.gross_saving, f.kvar, `${f.namn}: fel del står kvar`);
      assert.equal(a.net_saving, netOf(f.kvar));
      assert.equal(a.suggested_annual_cost, arlig - f.kvar);
      assert.deepEqual(a.bytetUndanhallet, { del: 'mobil', kvar: 'bredband', struket: f.struket });
      assert.equal(a.lage.kod, 'byte');
      assert.equal(a.lage.score, null, `${f.namn}: en mobilrad får ingen poäng`);
      assert.equal(a.lage.params.ovPct, null, `${f.namn}: inget procenttal`);
      const text = radMotivering(a);
      assert.ok(text.includes(BYTE_BREDBANDSDELEN));
      assert.equal(text.includes(BYTE_MOBILDELEN_INDRAGEN), f.struket);
      assert.doesNotMatch(text, /% mer/);
      const rum = byggRum(analyses, []);
      assert.equal(rum.score, null, `${f.namn}: samlad poäng`);
      assert.equal(rum.hasSwitchAction, true);
      assert.equal(rum.totalSaving, netOf(f.kvar));
      assert.equal(rum.counts.prissatta, 1);
    }
    // Taket: en bredbandsdel räknad i dag kan aldrig bli större än det analysen lagrade.
    const arlig = (1345 + 549) * 12;
    const [tak] = await rummet([{ ...rad(8, 'mobil', arlig, 5, [BAS5, BB250]), should_switch: true, gross_saving: 1000,
      net_saving: 800, suggested_annual_cost: arlig - 1000 }]);
    assert.equal(tak.gross_saving, 1000);
    // Motprov: en ren mobilfaktura har ingen sekundär del och hela bytet hålls inne (MS-08).
    const [ren] = await rummet([{ ...rad(9, 'mobil', 349 * 12 * 5, 5, [XL5]), should_switch: true, gross_saving: 4800,
      net_saving: 3840, suggested_annual_cost: 269 * 12 * 5 }]);
    assert.equal(ren.should_switch, false);
    assert.deepEqual(ren.bytetUndanhallet, { del: 'hela', kvar: null, harRader: true });
  });

  test('MS-11 · en rad med obekräftad nivå och ett byte som står kvar är prissatt, och säger inte emot sitt byte', async () => {
    // E1-1 och E1-5: IT-8821 (två nivåer) visade «Prissatta 0» och «Vi sätter varken avstånd eller poäng här»
    // rakt under sitt byte på 24 566 kr/år.
    const it = JSON.parse(readFileSync(rot('tests/fixtures/it-8821-ms365.json'), 'utf8'));
    const analyses = await rummet([rad(3, 'saas-productivity', it.annualCost, it.seatCount, it.lineItems,
      { suggested: it.expected.suggestedAnnualCost })]);
    const rum = byggRum(analyses, []);
    assert.equal(analyses[0].prisunderlag.ovissNiva, true);
    assert.equal(rum.counts.prissatta, 1);
    assert.equal(rum.ovissa, false, 'en rad med dom stoppar inte den samlade poängen');
    assert.equal(typeof rum.score, 'number');
    assert.match(rum.lage, /^byte_/);
    // Inget procenttal mot det billigaste på en rad med obekräftad nivå («17% mer» stod där, 85-felet).
    const { radMotivering, BYTE_UNDANHALLET, BYTE_UNDANHALLET_UTAN_RADER, BYTE_BREDBANDSDELEN, BYTE_MOBILDELEN_INDRAGEN } =
      await import('../src/lib/rumstext.js');
    assert.equal(analyses[0].lage.params.ovPct, null);
    assert.doesNotMatch(radMotivering(analyses[0]), /% mer/);
    assert.match(radMotivering(analyses[0]), /säger vi inget om/);
    // Underlaget på en sådan rad har en egen gren, före den obekräftade grenen, och säger inget om vad bytet
    // är räknat mot (F1-3: falskt för en rad utan radtext).
    const src = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    const g = src.indexOf("{p.ovissNiva && a.lage?.kod === 'byte'");
    const h = src.indexOf('<b>Hur långt ifrån ni ligger kan vi inte');
    assert.ok(g > 0 && h > 0 && g < h, 'bytesradens gren saknas eller står efter den obekräftade');
    const g2 = src.indexOf(": p.ovissNiva && a.lage?.kod === 'byte'");
    const h2 = src.indexOf('Vi sätter varken avstånd eller poäng här');
    assert.ok(g2 > 0 && h2 > 0 && g2 < h2, 'bytesradens not saknas eller står efter den obekräftade');
    assert.doesNotMatch(src.slice(g, h), /räknat mot listpriset för det som står på fakturan/);
    // Förklaringarna låses ordagrant: varje mening är sann bara i sitt fall (MS-08, MS-13).
    assert.equal(BYTE_UNDANHALLET, 'Analysen av fakturan räknade fram ett byte till det billigaste publicerade '
      + 'abonnemanget. Det visar vi inte här, eftersom vi inte vet vilket abonnemang ni har.');
    assert.equal(BYTE_UNDANHALLET_UTAN_RADER, 'Analysen av fakturan räknade fram ett byte. Det visar vi inte här: '
      + 'det kan vara räknat mot det billigaste publicerade abonnemanget, och fakturans rader finns inte sparade, '
      + 'så vi kan inte pröva det.');
    assert.equal(BYTE_BREDBANDSDELEN, 'Bytet gäller bredbandet på fakturan, räknat mot Tele2:s billigaste '
      + 'publicerade pris för samma hastighet eller närmast över. Mobilabonnemangen bedömer vi inte, eftersom vi '
      + 'inte vet vilket abonnemang ni har.');
    assert.equal(BYTE_MOBILDELEN_INDRAGEN, 'Analysens byte för mobilabonnemangen visar vi därför inte.');
  });

  test('MS-07 · en mobilrad räknas som mottagen, inte prissatt, så rummets räknare går ihop med raden', async () => {
    const analyses = await rummet([rad(1, 'mobil', 349 * 12 * 10, 10)]);
    const { roomCounts } = await import('../lib/lagesregister.js');
    assert.deepEqual(roomCounts({ autoAnalyses: analyses, watched: [] }),
      { fakturor: 1, analyserade: 1, prissatta: 0, mottagna: 1, bevakade: 0 });
    // Motprov: en M365-rad med bekräftad nivå räknas som prissatt.
    const m = await rummet([rad(2, 'saas-productivity', 416.77 * 12 * 10, 10,
      [{ description: 'Microsoft 365 E3', type: 'recurring_subscription', quantity: 10, unitPrice: 416.77, amount: 4167.7 }])]);
    assert.equal(roomCounts({ autoAnalyses: m, watched: [] }).prissatta, 1);
  });

  // Prislarmet läser inte spärren: det jämför bara mot ett bokfört listpris, och det finns bara för Microsoft
  // (bokfortListpris). Testet visar att mobil inte larmar; det kör inte läget utan spärr (C1-8).
  test('MS-05 · prislarmet för mobil ger inget larm', async () => {
    const u = await detectPriceAlert({ normalizedSupplier: 'Tele2', pricePerSeatMonthly: 349, category: 'mobil',
      lineItems: [{ description: 'Jobbmobil 50 GB', type: 'recurring_subscription', quantity: 10, amount: 3490 }] });
    assert.equal(u, null);
  });
});
