// tests/market-movement.mjs — låser Marknadsrörelsen (1B): verifierad höjning × nätverkets bredd.
//
// Integritetskärnan (regel 3, FAKTUM inte bedömning): bägge bevisen måste bära, annars tystnad.
//   • en VERKLIG, FÄRSK höjning (nytt > gammalt, inom fönstret)
//   • kollektiv bredd ≥ minPeers bolag hos leverantören (samma ≥3-tröskel som kohorten)
// Talen (magnitud, X/Y) ska gå att räkna hem mot källan.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { marketMovementFinding } from '../lib/market-movement.js';

const TODAY = new Date('2026-06-25T00:00:00Z');
const hike = (o = {}) => ({ changedAt: '2026-06-18T00:00:00Z', oldMonthly: 279, newMonthly: 298, ...o });
const seg  = (o = {}) => ({ total: 14, withSupplier: 8, ...o });
const opts = (o = {}) => ({ supplier: 'Telia', categoryLabel: 'mobilabonnemang', today: TODAY, ...o });

describe('Marknadsrörelsen · gate + faktum', () => {
  test('färsk höjning + bredd ≥3 → fynd med rätt magnitud och X/Y', () => {
    const f = marketMovementFinding(hike(), seg(), opts());
    assert.ok(f, 'ska producera ett fynd');
    assert.equal(f.kind, 'market-movement');
    assert.equal(f.tone, 'leak');
    assert.equal(f.withSupplier, 8);
    assert.equal(f.total, 14);
    // (298-279)/279 = 6,81 % → +6,8 %
    assert.equal(f.metricText, '+6,8 %');
    assert.match(f.text, /8 av 14/);
    assert.match(f.text, /Telia/);
    assert.match(f.text, /verifierat/);
  });

  test('för få peers (<3) → tystnad (anekdot, inte kollektiv sanning)', () => {
    assert.equal(marketMovementFinding(hike(), seg({ withSupplier: 2 }), opts()), null);
  });

  test('ingen verklig höjning (nytt ≤ gammalt) → tystnad', () => {
    assert.equal(marketMovementFinding(hike({ newMonthly: 279 }), seg(), opts()), null);
    assert.equal(marketMovementFinding(hike({ newMonthly: 250 }), seg(), opts()), null);
  });

  test('gammal höjning utanför recency-fönstret → tystnad (historia, inte rörelse)', () => {
    assert.equal(marketMovementFinding(hike({ changedAt: '2025-01-01T00:00:00Z' }), seg(), opts()), null);
  });

  test('framtida datum → tystnad (aldrig en höjning som inte hänt)', () => {
    assert.equal(marketMovementFinding(hike({ changedAt: '2026-12-01T00:00:00Z' }), seg(), opts()), null);
  });

  test('saknade bevis → tystnad', () => {
    assert.equal(marketMovementFinding(null, seg(), opts()), null);
    assert.equal(marketMovementFinding(hike(), null, opts()), null);
  });

  test('total får aldrig vara mindre än withSupplier (korrupt segment) → tystnad', () => {
    assert.equal(marketMovementFinding(hike(), seg({ total: 5, withSupplier: 8 }), opts()), null);
  });

  test('årspris-fallback fungerar när månadspris saknas', () => {
    const f = marketMovementFinding(
      hike({ oldMonthly: null, newMonthly: null, oldAnnual: 3348, newAnnual: 3576 }),
      seg(), opts());
    assert.ok(f);
    assert.equal(f.metricText, '+6,8 %');     // (3576-3348)/3348 = 6,81 %
  });
});
