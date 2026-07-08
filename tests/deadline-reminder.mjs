// tests/deadline-reminder.mjs — deadline-vakten (30/7 dagar före SISTA UPPSÄGNINGSDAGEN)
// + leverantörsmatchningen. Regel 9-fyndet: periodsluts-mejlen kommer för sent för
// rullande avtal — vakten räknar mot deadlinen, per period, med catch-up och idempotens.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { deadlineReminderDecision } from '../lib/deadline-reminder.js';
import { supplierNamesMatch } from '../lib/contract-intel.js';

// Bahnhof-fällan som termer (deadline 2026-07-15 sett från 2026-07-08)
const BAHNHOF_TERMS = {
  supplier: 'Bahnhof AB',
  fields: { avtalsstart: '2025-01-15', avtalstidMan: 3, uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3 },
  rules:  { uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3, efterBindning: 'forlangning', kalla: 'avtalet' },
};
const at = (iso) => new Date(`${iso}T08:00:00Z`);

describe('deadline-vakten · beslutslogiken', () => {
  test('7 dagar kvar utan markör → 7-mejlet (och 30-flaggan sätts — aldrig två mejl)', () => {
    const r = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: null, today: at('2026-07-08') });
    assert.equal(r.send7, true);
    assert.equal(r.send30, false);
    assert.equal(r.marker.deadline, '2026-07-15');
    assert.ok(r.marker.sent7 && r.marker.sent30);
  });

  test('catch-up: 20 dagar kvar → 30-mejlet går direkt', () => {
    const r = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: null, today: at('2026-06-25') });
    assert.equal(r.send30, true);
    assert.equal(r.send7, false);
  });

  test('idempotens: samma dag igen med markören → inget nytt mejl', () => {
    const first = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: null, today: at('2026-07-08') });
    const again = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: first.marker, today: at('2026-07-09') });
    assert.equal(again.send30, false);
    assert.equal(again.send7, false);
  });

  test('rullande avtal: nästa period (nytt deadline-datum) nollställer markören', () => {
    const old = { deadline: '2026-07-15', sent30: 'x', sent7: 'x' };
    // Efter 15 juli rullar klockan: nästa deadline 2026-10-15. 8 okt = 7 dagar kvar.
    const r = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: old, today: at('2026-10-08') });
    assert.equal(r.marker.deadline, '2026-10-15');
    assert.equal(r.send7, true);
  });

  test('långt till deadline (>30 dagar) → tystnad', () => {
    const r = deadlineReminderDecision({ terms: BAHNHOF_TERMS, marker: null, today: at('2026-08-01') });
    assert.equal(r.send30, false);
    assert.equal(r.send7, false);
  });

  test('tills vidare (rolling, ingen deadline) → aldrig ett deadline-mejl', () => {
    const terms = {
      fields: { avtalsstart: '2025-11-01', avtalstidMan: null, uppsagningstidMan: 1, uppsagningstidDagar: null, forlangningMan: null },
      rules:  { uppsagningstidMan: 1, uppsagningstidDagar: null, forlangningMan: null, efterBindning: null, kalla: 'avtalet' },
    };
    const r = deadlineReminderDecision({ terms, marker: null, today: at('2026-07-08') });
    assert.equal(r.send30, false);
    assert.equal(r.send7, false);
  });

  test('trasiga termer → tystnad, aldrig krasch', () => {
    const r = deadlineReminderDecision({ terms: {}, marker: null, today: at('2026-07-08') });
    assert.equal(r.send30, false);
    assert.equal(r.send7, false);
  });
});

describe('leverantörsmatchningen · fel avtal på fel innehav flaggas', () => {
  test('samma bolag genom bolagsform/suffix → match', () => {
    assert.equal(supplierNamesMatch('Telia Sverige AB', 'Telia'), true);
    assert.equal(supplierNamesMatch('Fortnox AB', 'Fortnox'), true);
    assert.equal(supplierNamesMatch('Tele2 Bredband AB', 'Tele2'), true);
  });
  test('olika bolag → mismatch (Bahnhof-avtal på Tele2-innehav)', () => {
    assert.equal(supplierNamesMatch('Bahnhof AB', 'Tele2 Bredband AB'), false);
    assert.equal(supplierNamesMatch('GleSYS AB', 'Nordic Managed IT Services AB'), false);
  });
  test('saknat namn på endera sidan → flagga aldrig (asymmetrin)', () => {
    assert.equal(supplierNamesMatch(null, 'Tele2'), true);
    assert.equal(supplierNamesMatch('Bahnhof AB', ''), true);
  });
});
