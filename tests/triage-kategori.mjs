// tests/triage-kategori.mjs — EN NY TRIAGE-DOM FÅR UPPDATERA KATEGORIN, EN SÄMRE LÄSNING FÅR INTE RADERA DEN.
//
// Mätt 2026-09-23: efter omkörningen av grundarens 25-bunt stod Atlassian, Dustin, Komplett,
// Systemair och Ahlsell kvar som 'uncategorized' — med ett NYTT skäl (no_benchmark) i raden.
// `storeTriaged` uppdaterade route och skäl men aldrig kategorin, så den frusna domen levde vidare
// i ett fält analysstämpeln inte täcker.
//
// FÅNGAR: en triage-upsert som slutar uppdatera kategorin · en som låter 'uncategorized' radera en
//   känd kategori.
// BLIND: sviten kör mot en fejkad databas och prövar SATSEN, inte Postgres utvärdering av den.
//   Att CASE-uttrycket beter sig rätt i Neon bevisas av en omkörning och probe-fyndgrad.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { storeTriaged } from '../lib/invoice-store.js';

function fejkDb() {
  const satser = [];
  const db = async (strings, ...vals) => {
    satser.push({ sql: strings.join('?').replace(/\s+/g, ' '), vals });
    return [];
  };
  db.query = async () => [];
  db.satser = satser;
  return db;
}

describe('TR · triage uppdaterar kategorin', () => {
  test('TR-01 · en ny triage-dom skriver sin kategori även när raden redan finns', async () => {
    const db = fejkDb();
    await storeTriaged({ fingerprint: 'fp', pdfHash: 'ph', supplier: 'Atlassian', category: 'saas-other',
      route: 'review_queue', reason: 'no_benchmark', userEmail: 'x@y.se', db });
    const upsert = db.satser.find((s) => /INSERT INTO invoice_analyses/.test(s.sql));
    assert.ok(upsert, 'hittade inte triage-upserten');
    assert.match(upsert.sql, /ON CONFLICT \(fingerprint, pdf_hash\) DO UPDATE SET[^;]*category = CASE/,
      'en ny triage-dom uppdaterar inte kategorin — den gamla «okategoriserad» fryser kvar');
    assert.ok(upsert.vals.includes('saas-other'), 'den nya kategorin skickas inte med');
  });

  test('TR-02 · «okänd» får aldrig radera en känd kategori', async () => {
    const db = fejkDb();
    await storeTriaged({ fingerprint: 'fp', pdfHash: 'ph', supplier: 'X', category: null,
      route: 'unsupported', reason: 'credit_note', userEmail: 'x@y.se', db });
    const upsert = db.satser.find((s) => /INSERT INTO invoice_analyses/.test(s.sql));
    // Okänd kategori skrivs som 'uncategorized' — och den grenen måste behålla radens värde.
    assert.match(upsert.sql, /WHEN EXCLUDED\.category = 'uncategorized' THEN invoice_analyses\.category/,
      'en sämre läsning (okänd) skriver över en bättre (känd) — samma regel som supplier i storeAnalysis');
  });

  test('TR-03 · anroparen som kan kategorin skickar den (no_benchmark)', () => {
    const api = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    const i = api.indexOf("reason: 'no_benchmark', userEmail");
    assert.ok(i > 0, 'hittade inte no_benchmark-triagen');
    assert.match(api.slice(Math.max(0, i - 400), i), /category: categorized\.category \?\? null/,
      'no_benchmark-grenen skickar inte den kategori den just fastställt');
  });
});
