// tests/holdings.mjs — låser leverantörsgrupperingen i rummet (dubblett-buggen).
// Förr: nyckeln prioriterade normalized_supplier men namnet visade supplier (omvänd ordning),
// så samma leverantör kunde dyka upp som två kort med motstridiga domar. Nu: nyckel = namn|kategori.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { groupBySupplier, supplierName } from '../src/lib/holdings.js';

const a = (o) => ({ net_saving: 0, category: 'mobil', created_at: '2025-06-01', ...o });

describe('Holdings · visningsnamn', () => {
  test('normaliserat namn först (samma precedens som nyckeln)', () => {
    assert.equal(supplierName({ normalized_supplier: 'Telia Sverige AB', supplier: 'TELIA' }), 'Telia Sverige AB');
    assert.equal(supplierName({ supplier: 'Råform AB' }), 'Råform AB');
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
