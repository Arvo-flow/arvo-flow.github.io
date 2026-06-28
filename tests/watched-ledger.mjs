// tests/watched-ledger.mjs — låser "Bevakat — inte prissatt" (disciplinmontern, Liggare 2).
//
// Kärnan: en triagad faktura (utländsk valuta, ej stödd kategori, kreditnota, granskning) ska ALDRIG
// försvinna tyst (regel 9) — den blir ett kort med källbelagt SKÄL + väg framåt, och NOLL siffror
// (sifferrevisorns tystnad orörd). watchedCard översätter rutt/skäl + leverantörsnamn → ärlig copy.
// Disciplinen ÄR premiumsignalen: vi gissar aldrig på en kurs eller ett golv vi inte kan verifiera.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { watchedCard } from '../api/invoice-history.mjs';

const row = (o) => ({ normalized_supplier: null, supplier: 'X AB', category: null, route: 'review_queue', triage_reason: null, ...o });

describe('Bevakat — inte prissatt · watchedCard', () => {
  test('utländsk valuta (skäl-kod) → Internationell SaaS, USD-copy, väg framåt', () => {
    const c = watchedCard(row({ supplier: 'Acme Inc.', triage_reason: 'foreign_currency:USD' }));
    assert.equal(c.kind, 'Internationell SaaS');
    assert.match(c.headline, /utländsk valuta/i);
    assert.match(c.detail, /USD/);
    assert.match(c.action, /Koppla avtalet/i);
  });

  test('USD-leverantör fångas på NAMN även när skälet är tomt (HubSpot/Slack/Zoom/AWS)', () => {
    for (const s of ['HubSpot, Inc.', 'Slack Technologies', 'Zoom Video', 'Amazon Web Services', 'Salesforce.com']) {
      const c = watchedCard(row({ supplier: s, triage_reason: null }));
      assert.equal(c.kind, 'Internationell SaaS', `${s} ska bli Internationell SaaS`);
      assert.match(c.detail, /utländsk valuta|USD/i);
    }
  });

  test('elnät (Ellevio) → reglerad nätkostnad, vi bevakar tariffen', () => {
    const c = watchedCard(row({ supplier: 'Ellevio AB', triage_reason: 'out_of_scope' }));
    assert.equal(c.kind, 'Reglerad nätkostnad');
    assert.match(c.action, /bevakar.*tariff/i);
  });

  test('webbhotell/hosting (Binero/GleSYS) → fragmenterad marknad, under bevakning', () => {
    assert.equal(watchedCard(row({ supplier: 'Binero Group AB' })).kind, 'Fragmenterad marknad');
    assert.equal(watchedCard(row({ supplier: 'GleSYS AB' })).kind, 'Fragmenterad marknad');
  });

  test('kreditnota → ingen kostnad att prissätta', () => {
    const c = watchedCard(row({ supplier: 'Telia', triage_reason: 'credit_note' }));
    assert.equal(c.kind, 'Kreditnota');
  });

  test('okänd kategori utan golv → generiskt "Ej prissatt kategori", aldrig tyst', () => {
    const c = watchedCard(row({ supplier: 'Något Litet AB', triage_reason: 'no_benchmark' }));
    assert.equal(c.kind, 'Ej prissatt kategori');
    assert.match(c.headline, /utan verifierat golv/i);
  });

  test('INTEGRITET: copyn bär ALDRIG en kronsiffra (sifferrevisorns tystnad gäller Liggare 2)', () => {
    const codes = ['foreign_currency:USD', 'credit_note', 'implausible_amounts', 'out_of_scope', 'no_benchmark', null];
    for (const tr of codes) {
      const c = watchedCard(row({ supplier: 'Ellevio AB', triage_reason: tr }));
      const text = `${c.headline} ${c.detail} ${c.action}`;
      assert.doesNotMatch(text, /\d[\d\s.,]*\s*kr\b/i, `skäl-kod ${tr} läckte en kr-siffra: "${text}"`);
    }
  });
});
