// tests/holdings.mjs — låser leverantörsgrupperingen i rummet (dubblett-buggen).
// Förr: nyckeln prioriterade normalized_supplier men namnet visade supplier (omvänd ordning),
// så samma leverantör kunde dyka upp som två kort med motstridiga domar. Nu: nyckel = namn|kategori.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { groupBySupplier, supplierName, supplierDiagScore } from '../src/lib/holdings.js';

const a = (o) => ({ net_saving: 0, category: 'mobil', created_at: '2025-06-01', ...o });

describe('Holdings · visningsnamn + kanonisering', () => {
  test('kända varumärken kanoniseras (Telia Företag = Telia Sverige AB = Telia)', () => {
    assert.equal(supplierName({ normalized_supplier: 'Telia Företag' }), 'Telia');
    assert.equal(supplierName({ normalized_supplier: 'Telia Sverige AB' }), 'Telia');
    assert.equal(supplierName({ supplier: 'Tele2 Företag AB' }), 'Tele2');
    assert.equal(supplierName({ normalized_supplier: 'Microsoft Ireland Operations' }), 'Microsoft');
  });
  test('okända leverantörer rörs ALDRIG (ingen över-sammanslagning)', () => {
    assert.equal(supplierName({ supplier: 'Råform AB' }), 'Råform AB');
    assert.equal(supplierName({ normalized_supplier: 'SveaMobil Företag AB' }), 'SveaMobil Företag AB');
    assert.equal(supplierName({}), 'Okänd leverantör');
  });
});

describe('Holdings · gruppering', () => {
  test('samma leverantör + samma kategori → ETT kort, senaste vinner (dubbletten borta)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-02', annual_cost: 58092 }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-03', annual_cost: 269460 }),
    ]);
    assert.equal(g.length, 1);                 // inte två kort
    assert.equal(g[0].count, 2);
    assert.equal(g[0].latest.id, 2);           // senaste analysen
  });

  test('Telia Företag + Telia Sverige AB (båda mobil) → ETT kort (varumärkes-kanonisering)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Företag', category: 'mobil', created_at: '2025-06-12' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'mobil', created_at: '2025-06-13' }),
    ]);
    assert.equal(g.length, 1);
    assert.equal(g[0].count, 2);
    assert.equal(supplierName(g[0].latest), 'Telia');
  });

  test('samma varumärke + OLIKA kategori → TVÅ kort (Tele2 mobil ≠ Tele2 bredband)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Tele2 Företag AB', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Tele2 Bredband AB', category: 'bredband' }),
    ]);
    assert.equal(g.length, 2);
  });

  test('samma leverantör + OLIKA kategori → TVÅ kort (mobil ≠ bredband)', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', category: 'bredband' }),
    ]);
    assert.equal(g.length, 2);
  });

  test('identiskt visat namn + kategori slås ALLTID ihop (nyckel = visat namn)', () => {
    // Båda visar "Telia Sverige AB" → får aldrig bli två kort
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'Telia Sverige AB', supplier: 'Telia', category: 'mobil' }),
      a({ id: 2, normalized_supplier: 'Telia Sverige AB', supplier: 'Telia Sverige AB', category: 'mobil' }),
    ]);
    assert.equal(g.length, 1);
  });

  test('sorteras på net_saving fallande', () => {
    const g = groupBySupplier([
      a({ id: 1, normalized_supplier: 'A', net_saving: 100 }),
      a({ id: 2, normalized_supplier: 'B', net_saving: 5000 }),
    ]);
    assert.equal(g[0].latest.id, 2);
  });

  test('tom indata → tom lista', () => {
    assert.deepEqual(groupBySupplier([]), []);
    assert.deepEqual(groupBySupplier(null), []);
  });
});

describe('supplierDiagScore · scoren följer SAMMA tal som besparings-pillen (regel 1)', () => {
  const row = (o) => ({ should_switch: true, annual_cost: 100000, gross_saving: 14000, net_saving: 11200, ...o });

  test('litet gap → hög score', () => {
    // ~13% gross gap → 100 - 13*1.5 ≈ 80, cap 79
    assert.equal(supplierDiagScore(row({ annual_cost: 58092, gross_saving: 7787, net_saving: 6230 })), 79);
  });

  test('stort gap → låg score', () => {
    // ~50% gross gap → 100 - 50*1.5 = 25
    assert.equal(supplierDiagScore(row({ annual_cost: 116940, gross_saving: 58470, net_saving: 46776 })), 25);
  });

  test('Telia-buggen kan inte återkomma: scoren ignorerar ett oense suggested_annual_cost', () => {
    // suggested_annual_cost antyder 34% (gammal kod → 49), men gross_saving säger 13% → score 79
    const s = supplierDiagScore(row({ annual_cost: 58092, suggested_annual_cost: 38300, gross_saving: 7787, net_saving: 6230 }));
    assert.equal(s, 79);                                  // följer pillen (gross_saving), inte suggested
  });

  test('inget byte men kostnad finns → 82 (rätt prissatt)', () => {
    assert.equal(supplierDiagScore({ should_switch: false, annual_cost: 100000 }), 82);
  });

  test('monitoring → 72', () => {
    assert.equal(supplierDiagScore({ route: 'monitoring' }), 72);
  });

  test('faller tillbaka på net_saving om gross saknas', () => {
    // net 6230 → gross ≈ 7787 → ~13% → 79
    assert.equal(supplierDiagScore(row({ annual_cost: 58092, gross_saving: undefined, net_saving: 6230 })), 79);
  });
});
