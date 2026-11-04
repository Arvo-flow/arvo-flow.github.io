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
// FÅNGAR: en mobilrad som får avstånd, poäng eller ett prisomdöme; en spärr utan mätning eller skäl;
//   medianens etikett «Samma licens utan bindning» på ett annat abonnemang; löftet «Dela avtalet».
// BLIND: ingen kod läser i dag ett mobilabonnemang ur fakturan, så grenen «bekräftat abonnemang» för
//   mobil finns inte än; testet låser bara att den obekräftade grenen är neutral.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { buildBranchAnchors, berikaRader } from '../api/invoice-history.mjs';
import { byggPrisunderlag } from '../lib/prisunderlag.js';
import { detectPriceAlert } from '../lib/price-alert.js';

const rot = (p) => new URL(`../${p}`, import.meta.url);
const rad = (id, category, annualCost, seats, rader = []) => ({
  id, category, route: 'auto', supplier: category === 'mobil' ? 'Tele2' : 'Microsoft', normalized_supplier: null,
  annual_cost: annualCost, seat_count: seats, should_switch: false, _rader: rader,
});
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
    const rum = readFileSync(rot('src/pages/Portfolio/index.js'), 'utf8');
    const a = rum.indexOf('const branchAnchor = useMemo(() => {');
    const b = rum.indexOf('}, [featured, publicFeatured, suppliers, branchAnchors]);', a);
    assert.ok(a > 0 && b > a, 'ankarvalet hittades');
    assert.match(rum.slice(a, b), /if \(an\.kraverBekraftadNiva\) continue;/, 'ankarvalet hoppar inte över spärrade kategorier');
    // Ankaret bär flaggan för båda spärrade kategorier, och inte för en kategori utan spärr (motprov).
    const ankare = await buildBranchAnchors([rad(1, 'mobil', 41880, 10), rad(2, 'saas-productivity', 50000, 10), rad(3, 'loneadmin', 6000, 10)]);
    assert.equal(ankare.mobil?.kraverBekraftadNiva, true);
    assert.equal(ankare['saas-productivity']?.kraverBekraftadNiva, true);
    assert.equal(ankare.loneadmin?.kraverBekraftadNiva, false);
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

  test('MS-05 · prislarmet för mobil är oförändrat: inget larm, med och utan spärren', async () => {
    const u = await detectPriceAlert({ normalizedSupplier: 'Tele2', pricePerSeatMonthly: 349, category: 'mobil',
      lineItems: [{ description: 'Jobbmobil 50 GB', type: 'recurring_subscription', quantity: 10, amount: 3490 }] });
    assert.equal(u, null);
  });
});
