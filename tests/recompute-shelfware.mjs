// tests/recompute-shelfware.mjs — låser kontraktet för /api/recompute-shelfware.
// Det är endpointen kunden använder för att bekräfta licensrevisionen → svinn i kronor,
// och kronan vi baserar affärsmodellen på. Verifierar validering + omräkning end-to-end.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/recompute-shelfware.mjs';

// Minimal req/res-mock som fångar status + JSON-kropp.
function mockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    end(s) { this.body = JSON.parse(s); },
  };
}
async function call(method, body) {
  const res = mockRes();
  await handler({ method, body }, res);
  return res;
}

describe('API · /api/recompute-shelfware', () => {
  test('GET avvisas (405)', async () => {
    const res = await call('GET', null);
    assert.strictEqual(res.statusCode, 405);
  });

  test('saknade fält → 400', async () => {
    const res = await call('POST', { seatCount: 120 });
    assert.strictEqual(res.statusCode, 400);
  });

  test('20 gap − 8 undantag → confirmedIdle 12, svinn på eget pris', async () => {
    const res = await call('POST', { seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 8 });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.shelfware.needsReview, false);
    assert.strictEqual(res.body.shelfware.confirmedIdle, 12);
    assert.strictEqual(res.body.shelfware.annualWaste, 17205);
  });

  test('knownExceptions = 0 (uttryckligt) → hela gapet är bekräftat svinn', async () => {
    const res = await call('POST', { seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 0 });
    assert.strictEqual(res.body.shelfware.confirmedIdle, 20);
    assert.strictEqual(res.body.shelfware.annualWaste, 28675);
  });

  test('allt förklarat (exceptions = gap) → shelfware null (inget svinn)', async () => {
    const res = await call('POST', { seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: 20 });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.shelfware, null);
  });

  test('strängvärden från formuläret tolereras (parseFloat)', async () => {
    const res = await call('POST', { seatCount: '120', pricePerSeatMonthly: '119.48', employees: '100', knownExceptions: '8' });
    assert.strictEqual(res.body.shelfware.confirmedIdle, 12);
  });

  test('tom knownExceptions → behandlas som ej angivet (review-läge)', async () => {
    const res = await call('POST', { seatCount: 120, pricePerSeatMonthly: 119.48, employees: 100, knownExceptions: '' });
    assert.strictEqual(res.body.shelfware.needsReview, true);
    assert.strictEqual(res.body.shelfware.annualWaste, null);
  });
});
