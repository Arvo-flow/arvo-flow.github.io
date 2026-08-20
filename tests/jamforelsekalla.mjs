// tests/jamforelsekalla.mjs — JK-01..JK-12
//
// Obduktionen 2026-08-20 hittade två fel som levde bredvid varandra i samma jämförelse:
//
//   1. ENHETSFELET I BESPARINGSTALET. recommend.js räknade sin skala på tre ställen. Två bar
//      `!benchmark.isTotal`; den tredje — den som bygger suggestedAnnualCost, savingPerYear och
//      overpaymentPercent — bar den inte. Livedatans p25/median ur invoice_datapoints och
//      invoice_analyses ÄR bolagets hela årskostnad, medan `note` ärvs från prisbokens mock och
//      säger «per användare». En TOTALSUMMA multiplicerades alltså med antalet anställda.
//
//   2. PROVENIENSEN GISSADES NEDSTRÖMS. Kvittoraden «jämförelsepriset är ett verifierat publikt
//      listpris» och savingRange-bredden (±12 % kontra ±25 %) härleddes i api-lagret ur
//      BRANCHINDEX[kategori].source — den statiska tabellraden, inte det objekt som räknade.
//
// VARFÖR INGEN AV 1 822 TESTER SÅG NÅGONDERA: hela sviten kör utan DATABASE_URL. Utan databas
// finns ingen livedata, alltså kan `isTotal` aldrig bli sant och `benchmark.source` aldrig skilja
// sig från prisbokens. Fjärde gången samma sjukdom (villkorsvakten, LFL-harnesset, ankaret, nu
// denna): en svit som bara körs i ett tillstånd produktionen inte är i bevisar att mekanismen
// svarar, aldrig att den svarar i verkligheten. Därför MATAR testerna nedan uttryckligen det
// tillstånd bara produktionen når.
//
// FÅNGAR: att en totalsumma skalas per enhet; att ett kundsynligt listprisanspråk sätts på
//   livedata, kohortdata, estimat eller ett odaterat pris; att api-lagret återgissar proveniensen
//   ur prisbokstabellen; att avslagsskälet påstår «estimat» när källan är något annat.
// BLIND: dömer den DEKLARERADE källan, aldrig om etiketten är sann (det är price-audit och
//   verifierarnas uppgift), och ingenting om huruvida jämförelsen är RELEVANT — fel produktnivå
//   mätt mot rätt listpris är fortfarande fel, och bevakas av kraverBekraftadNiva/MK-09.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { jamforelseSkala, jamforelsensKalla } from '../lib/jamforelsekalla.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PER_ANVANDARE = 'Per användare/år (exkl. moms).';

describe('JK · Skalan känner igen en totalsumma', () => {
  test('JK-01 · isTotal → skalan är 1, hur många anställda som än anges', () => {
    // Grundarens rad, mätt 2026-08-19: p25 = 184 680 kr är en TOTAL ur invoice_datapoints.
    const bm = { note: PER_ANVANDARE, isTotal: true, p25: 184_680, median: 210_000 };
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: 10, employees: 10 }), 1);
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: null, employees: 250 }), 1);
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: 10, employees: 10, forceEmployees: true }), 1);
  });

  test('JK-02 · per-användare utan isTotal skalar som förr', () => {
    const bm = { note: PER_ANVANDARE, p25: 1606, median: 1927 };
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: 12, employees: 10 }), 12);
    // saas-productivity mäter mot ANSTÄLLDA, inte mot fakturans (uppblåsbara) licensantal.
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: 12, employees: 10, forceEmployees: true }), 10);
  });

  test('JK-03 · en benchmark som inte är per användare skalas aldrig', () => {
    const bm = { note: 'Kr/år för hela abonnemanget.', p25: 9000, median: 10200 };
    assert.equal(jamforelseSkala({ benchmark: bm, seatCount: 40, employees: 40 }), 1);
  });

  test('JK-04 · saknad benchmark eller nollställt antal ger 1, aldrig NaN', () => {
    assert.equal(jamforelseSkala({ benchmark: null, seatCount: 10, employees: 10 }), 1);
    assert.equal(jamforelseSkala({ benchmark: { isTotal: false }, seatCount: 10, employees: 10 }), 1);
    assert.equal(jamforelseSkala({ benchmark: { note: PER_ANVANDARE }, seatCount: 0, employees: 0 }), 1);
    assert.equal(jamforelseSkala({ benchmark: { note: PER_ANVANDARE }, seatCount: null, employees: null }), 1);
  });

  test('JK-05 · INVARIANTEN: ingen livedata-kombination kan nå en skala över 1', () => {
    // Prövas över hela fältet i stället för på ett exempel — det var punktprovet som lät
    // felet leva: varje enskilt testfall råkade sakna isTotal.
    for (const seats of [1, 5, 10, 250, 4000]) {
      for (const emp of [1, 5, 10, 250, 4000]) {
        for (const force of [true, false]) {
          const s = jamforelseSkala({
            benchmark: { note: PER_ANVANDARE, isTotal: true }, seatCount: seats, employees: emp, forceEmployees: force,
          });
          assert.equal(s, 1, `isTotal skalades med ${s} vid seats=${seats} employees=${emp}`);
        }
      }
    }
  });
});

describe('JK · Proveniensen bärs, aldrig gissad', () => {
  const tierBm = {
    'business-standard': { lastVerified: '2026-08-05' },
    e3:                  { lastVerified: '2026-06-17' },
    odaterad:            { msrpAnnual: 100 },
  };

  test('JK-06 · livedata och kohortdata bär ALDRIG ett listprisanspråk', () => {
    for (const source of ['live_analyses', 'real']) {
      const k = jamforelsensKalla({ useLfl: false, benchmark: { source, isTotal: true, lastVerified: '2026-08-05' } });
      assert.equal(k.listprisanspraak, false, `${source} gav ett listprisanspråk`);
      assert.equal(k.grund, 'benchmark');
      assert.equal(k.isTotal, true);
    }
  });

  test('JK-07 · isTotal diskvalificerar även när etiketten säger real-public', () => {
    // Läsvägen sprider prisbokens mock-objekt och skriver sedan över `source`. Skulle
    // ordningen någonsin kastas om får talet inte ändå passera som listpris.
    const k = jamforelsensKalla({ useLfl: false, benchmark: { source: 'real-public', isTotal: true, lastVerified: '2026-08-05' } });
    assert.equal(k.listprisanspraak, false);
  });

  test('JK-08 · ett odaterat pris kallas aldrig verifierat', () => {
    const k = jamforelsensKalla({ useLfl: false, benchmark: { source: 'real-public', lastVerified: null } });
    assert.equal(k.listprisanspraak, false);
  });

  test('JK-09 · verifierat, daterat och per enhet → anspråket står', () => {
    const k = jamforelsensKalla({ useLfl: false, benchmark: { source: 'real-public', lastVerified: '2026-08-05' } });
    assert.equal(k.listprisanspraak, true);
    assert.equal(k.lastVerified, '2026-08-05');
  });

  test('JK-10 · like-for-like ärver STALASTE nivådatum, inte det färskaste', () => {
    const k = jamforelsensKalla({
      useLfl: true,
      benchmark: { source: 'live_analyses', isTotal: true },
      tierLines: [{ key: 'business-standard' }, { key: 'e3' }],
      tierBenchmarks: tierBm,
    });
    assert.equal(k.grund, 'like-for-like');
    assert.equal(k.listprisanspraak, true);
    assert.equal(k.lastVerified, '2026-06-17',
      'summan är bara så färsk som sin äldsta beståndsdel — att välja det färskaste vore att smickra oss själva');
  });

  test('JK-11 · en enda odaterad nivå gör hela summan odaterad', () => {
    const k = jamforelsensKalla({
      useLfl: true, benchmark: null,
      tierLines: [{ key: 'business-standard' }, { key: 'odaterad' }],
      tierBenchmarks: tierBm,
    });
    assert.equal(k.listprisanspraak, false,
      'ett odaterat pris i summan gör summan odaterad, hur många av de andra som än bär ett datum');
  });
});

describe('JK-12 · Api-lagret återgissar aldrig proveniensen', () => {
  const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
  const kodrader = kod.split('\n')
    .map((r, i) => ({ r, n: i + 1 }))
    .filter(({ r }) => !/^\s*(\/\/|\*|\/\*)/.test(r));  // vakten dömer kod, aldrig prosa

  test('_benchmarkType härleds ur den bokförda källan, inte ur prisbokstabellen', () => {
    // `=[^=]` och inte bara `=`: den första versionen fångade även JÄMFÖRELSEN
    // `_benchmarkType === 'real-public'` och fällde på en rad som inte tilldelar något. Ett
    // ankare som träffar fel rad är lika värdelöst när det blir grönt (OB-08:s läxa).
    const traff = kodrader.filter(({ r }) => /_benchmarkType\s*=[^=]/.test(r));
    assert.ok(traff.length > 0, 'hittade ingen tilldelning av _benchmarkType — vakten mäter fel objekt');
    for (const { r, n } of traff) {
      assert.ok(!/BRANCHINDEX\s*\[/.test(r),
        `rad ${n}: proveniensen läses ur BRANCHINDEX. Tabellraden är inte det som räknade — ` +
        'jämförelsepriset kommer ur like-for-like eller ur benchmark.p25, och benchmark-läsvägen ' +
        'föredrar livedata. Läs recommendation.jamforelseKalla.');
      assert.match(r, /jamforelseKalla|_kalla/,
        `rad ${n}: _benchmarkType måste härledas ur den källa recommend.js bokförde`);
    }
  });

  test('bocken sätts bara på ett bevisat listprisanspråk', () => {
    assert.match(kod, /_kalla\?\.listprisanspraak\s*===\s*true/,
      'fail-closed: en väg som inte bokför sin källa får ingen listprisbock');
  });

  test('avslagsskälet påstår inte «estimat» om varje icke-listpris', () => {
    // Reservkortets läxa (2026-08-15): ett kort som inte vet varför vi avstod får inte hitta på
    // ett skäl. Livedata är STARKARE underlag än ett estimat — det är bara inte ett listpris.
    const block = kod.slice(kod.indexOf("id: 'listpris', status: 'ej_provbar'") - 1400,
                            kod.indexOf("id: 'listpris', status: 'ej_provbar'") + 200);
    assert.match(block, /isTotal/,
      'ej_provbar-raden måste kunna säga att källan är andra bolags totalkostnader');
    assert.match(block, /inte bokförd|okänd/,
      'ej_provbar-raden måste kunna säga att källan är obokförd i stället för att gissa ett skäl');
  });
});
