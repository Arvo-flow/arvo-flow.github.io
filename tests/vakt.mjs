// tests/vakt.mjs — låser vaktens hjärtslag (1C): svepets sammanfattning ur den verkliga rapporten.
//
// Anti-Potemkin: hjärtslaget härleds FRÅN price-monitor-rapporten (vad maskinen faktiskt svepte),
// aldrig en tom tidsstämpel. En rapport utan svepta kontroller ger INGET hjärtslag (null) —
// vi påstår aldrig ett svep som inte hände.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { sweepSummaryFromReport, isSweepFresh, sweepStreak, SWEEP_FRESH_HOURS } from '../lib/vakt.js';

const report = (o = {}) => ({
  runAt: '2026-06-26T21:00:00Z',
  passed:   [{ supplier: 'Tele2' }, { supplier: 'Telia' }, { supplier: 'Microsoft' }],
  warnings: [{ supplier: 'Adobe' }],
  alerts:   [],
  ...o,
});

describe('Vakten · sweepSummaryFromReport', () => {
  test('ren natt: distinkta källor + totala prispunkter, 0 avvikelser (allt lugnt)', () => {
    const s = sweepSummaryFromReport(report());
    assert.equal(s.sweptAt, '2026-06-26T21:00:00Z');
    assert.equal(s.sources, 4);          // Tele2, Telia, Microsoft, Adobe
    assert.equal(s.pricePoints, 4);      // 3 passed + 1 warning + 0 alerts
    assert.equal(s.changes, 0);
    assert.deepEqual(s.detail, { passed: 3, warnings: 1, alerts: 0 });
  });

  test('natt med avvikelse: changes räknar alerts', () => {
    const s = sweepSummaryFromReport(report({ alerts: [{ supplier: 'Telia' }] }));
    assert.equal(s.changes, 1);
    assert.equal(s.pricePoints, 5);
    assert.equal(s.sources, 4);          // Telia redan räknad (distinkt)
  });

  test('rapport utan svepta kontroller → null (påstår aldrig ett svep som inte hände)', () => {
    assert.equal(sweepSummaryFromReport(report({ passed: [], warnings: [], alerts: [] })), null);
  });

  test('saknad/trasig rapport → null', () => {
    assert.equal(sweepSummaryFromReport(null), null);
    assert.equal(sweepSummaryFromReport({}), null);
    assert.equal(sweepSummaryFromReport({ runAt: null, passed: [{ supplier: 'X' }] }), null);
  });

  test('saknade leverantörsnamn faller tillbaka på antal kontroller (aldrig 0 källor vid svep)', () => {
    const s = sweepSummaryFromReport(report({ passed: [{}, {}], warnings: [], alerts: [] }));
    assert.equal(s.sources, 2);          // inga supplier-namn → falla tillbaka på all.length
  });
});

// ── FÄRSKHETSGRINDEN + KEDJAN (smygtystnaden 19–31 juli 2026) ────────────────
// Vakten svepte varje natt men databasens kvot var slut — 13 nätters minne försvann utan larm.
// Dessa tester låser de två sanningar incidenten lärde oss: (1) ett gammalt svep får aldrig bära
// ett färskt löfte, (2) kedjan bevisar uthållighet och nollställs vid gap — aldrig backfillad.

const NU = new Date('2026-08-04T23:47:00Z');

describe('Vakten · färskhetsgrinden', () => {
  test('svep i natt är färskt', () => {
    assert.equal(isSweepFresh('2026-08-03T22:09:47Z', NU), true);
  });

  test('gränsen går vid 36 h — precis innanför bär, precis utanför bär inte', () => {
    const innanfor = new Date(NU.getTime() - (SWEEP_FRESH_HOURS * 3600e3 - 60e3));
    const utanfor  = new Date(NU.getTime() - (SWEEP_FRESH_HOURS * 3600e3 + 60e3));
    assert.equal(isSweepFresh(innanfor, NU), true);
    assert.equal(isSweepFresh(utanfor, NU), false);
  });

  test('DEN VERKLIGA INCIDENTEN: 18 juli sett från 31 juli är inte färskt', () => {
    // Utan grinden hade sidan visat "Senaste svep 18 juli … vakten var vaken medan ni sov".
    assert.equal(isSweepFresh('2026-07-18T21:00:00Z', new Date('2026-07-31T12:00:00Z')), false);
  });

  test('trasig eller framtida tidsstämpel är aldrig färsk', () => {
    assert.equal(isSweepFresh(null, NU), false);
    assert.equal(isSweepFresh('inte-ett-datum', NU), false);
    assert.equal(isSweepFresh('2026-08-06T00:00:00Z', NU), false);
  });
});

describe('Vakten · kedjan (obrutna nätter)', () => {
  test('DEN VERKLIGA KALENDERN: juli-gapet ger tre nätter, inte trettio', () => {
    // Exakt de 30 raderna ur vakt_events 2026-08-04 — inklusive dubbletter från manuell dispatch.
    const kalender = [
      '2026-06-26', '2026-06-26', '2026-06-26', '2026-06-27', '2026-06-28', '2026-06-28',
      '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-01', '2026-07-02', '2026-07-03',
      '2026-07-04', '2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09',
      '2026-07-10', '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15',
      '2026-07-16', '2026-07-17', '2026-07-18',
      '2026-08-01', '2026-08-02', '2026-08-03',
    ].map((d) => `${d}T22:00:00Z`);
    const s = sweepStreak(kalender, NU);
    assert.equal(s.fresh, true);
    assert.equal(s.nights, 3);           // gapet 19–31 juli stänger kedjan — ingen backfill
  });

  test('flera svep samma dygn (manuell dispatch) räknas som EN natt', () => {
    const s = sweepStreak([
      '2026-08-03T22:00:00Z', '2026-08-03T09:00:00Z', '2026-08-02T22:00:00Z',
    ], NU);
    assert.equal(s.nights, 2);
  });

  test('obruten månad räknas hela vägen', () => {
    const pad = (n) => String(n).padStart(2, '0');
    const dagar = [];
    for (let d = 5; d <= 31; d += 1) dagar.push(`2026-07-${pad(d)}T22:00:00Z`);   // 27 nätter
    for (let d = 1; d <= 3; d += 1) dagar.push(`2026-08-${pad(d)}T22:00:00Z`);    //  3 nätter
    assert.equal(sweepStreak(dagar, NU).nights, 30);      // 5 juli–3 aug utan hål
  });

  test('gammalt senaste svep → kedjan är bruten, inget påstående görs', () => {
    const s = sweepStreak(['2026-07-17T22:00:00Z', '2026-07-18T22:00:00Z'], NU);
    assert.equal(s.fresh, false);
    assert.equal(s.nights, 0);
  });

  test('tomt in → noll nätter (aldrig ett påhittat hjärtslag)', () => {
    assert.deepEqual(sweepStreak([], NU), { nights: 0, fresh: false, latest: null });
    assert.deepEqual(sweepStreak(null, NU), { nights: 0, fresh: false, latest: null });
  });

  test('en ensam färsk natt är EN natt — sidan gör inget kontinuitetspåstående under två', () => {
    assert.equal(sweepStreak(['2026-08-03T22:00:00Z'], NU).nights, 1);
  });
});
