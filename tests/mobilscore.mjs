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
// FÅNGAR: en mobilrad som får avstånd, poäng eller ett prisomdöme, också med ett lagrat byte (MS-08);
//   ett rum som väger ihop en del av boken till en poäng och berömmer den (MS-09); ett ankarkort i en
//   spärrad kategori (MS-06, genom anrop); en spärr utan mätning eller skäl; medianens etikett «Samma
//   licens utan bindning» på ett annat abonnemang; löftet «Dela avtalet».
// BLIND, också: domens ordalydelse för ett delvis mätt rum står i Portfolio och prövas av
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
    assert.equal(a.bytetUndanhallet, 'oviss_niva');
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
    assert.equal(rum.delvis, false, 'ingen rad är mätt, alltså inte «delvis»');
    assert.doesNotMatch(rum.lage, /^byte_/);
    // Motprov: en M365-rad med bekräftad nivå och ett byte behåller bytet.
    const [m] = await rummet([rad(2, 'saas-productivity', 600 * 12 * 10, 10, E3, { suggested: 416.77 * 12 * 10 })]);
    assert.equal(m.should_switch, true);
    assert.equal(m.lage.kod, 'byte');
    assert.equal(m.bytetUndanhallet, undefined);
  });

  test('MS-09 · ett rum med en obekräftad rad sätter ingen samlad poäng och berömmer inte priserna', async () => {
    // C1-2: med mobilen utanför vägningen blev rummet «Allt är under kontroll» på den enda mätta raden.
    for (const [namn, rader] of [
      ['mobil + löneadmin', [rad(1, 'mobil', 349 * 12 * 100, 100), rad(2, 'loneadmin', 5000, 10)]],
      ['mobil + E3', [rad(1, 'mobil', 349 * 12 * 100, 100), rad(2, 'saas-productivity', 416.77 * 12 * 10, 10, E3)]],
    ]) {
      const rum = byggRum(await rummet(rader), []);
      assert.equal(rum.delvis, true, namn);
      assert.equal(rum.score, null, `${namn}: en samlad poäng över en del av boken`);
      assert.equal(rum.standing.satt, false, namn);
      assert.equal(rum.berom, false, `${namn}: rummet berömmer`);
      assert.equal(rum.lage, 'lugn_omatt', namn);
      assert.ok(rum.counts.prissatta >= 1, `${namn}: den mätta raden räknas`);
    }
    // Motprov: utan obekräftad rad sätts poängen som förut.
    const ensam = byggRum(await rummet([rad(2, 'loneadmin', 5000, 10)]), []);
    assert.equal(ensam.delvis, false);
    assert.equal(typeof ensam.score, 'number');
    assert.equal(ensam.standing.satt, true);
    // Ytan: den delvis mätta domen säger vad som är mätt och sätter ingen poäng.
    const src = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    assert.match(src, /const delvis = rum\?\.delvis === true;/);
    assert.match(src, /\{counts\.bevakade > 0 \|\| counts\.mottagna > 0\n/);
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
