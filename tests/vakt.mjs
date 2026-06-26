// tests/vakt.mjs — låser vaktens hjärtslag (1C): svepets sammanfattning ur den verkliga rapporten.
//
// Anti-Potemkin: hjärtslaget härleds FRÅN price-monitor-rapporten (vad maskinen faktiskt svepte),
// aldrig en tom tidsstämpel. En rapport utan svepta kontroller ger INGET hjärtslag (null) —
// vi påstår aldrig ett svep som inte hände.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { sweepSummaryFromReport } from '../lib/vakt.js';

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
