// tests/supplier-keyword.mjs — låser varumärkesbryggan (regel 1: en källa, tre konsumenter).
// Förr två lokala kopior i alert-vägarna; nu lib/supplier-keyword.js. Bryggan förenar
// price-monitors beskrivande namn med kunddatans normaliserade namn via ILIKE-nyckelord.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { extractSupplierKeyword } from '../lib/supplier-keyword.js';

describe('extractSupplierKeyword · varumärkesbryggan', () => {
  test('price-monitors beskrivande strängar → varumärket', () => {
    assert.equal(extractSupplierKeyword('Tele2 Företag mobilabonnemang'), 'tele2');
    assert.equal(extractSupplierKeyword('Microsoft 365 Business Standard (sv)'), 'microsoft');
    assert.equal(extractSupplierKeyword('Google Workspace Business Starter'), 'google');
  });

  test('kunddatans normaliserade namn → samma varumärke (bryggan håller)', () => {
    assert.equal(extractSupplierKeyword('telia sverige ab'), 'telia');
    assert.equal(extractSupplierKeyword('Tele2 Sverige AB'), 'tele2');
  });

  test('tele2 nås FÖRE telia (ordningen är medveten)', () => {
    assert.equal(extractSupplierKeyword('Tele2 något'), 'tele2');
    assert.equal(extractSupplierKeyword('Telia något'), 'telia');
  });

  test('flerordsmärke matchas som delsträng', () => {
    assert.equal(extractSupplierKeyword('Sector Alarm Sverige'), 'sector alarm');
  });

  test('okänt märke → första ordet (gemen)', () => {
    assert.equal(extractSupplierKeyword('Råform AB'), 'råform');
    assert.equal(extractSupplierKeyword(''), '');
    assert.equal(extractSupplierKeyword(null), '');
  });
});
