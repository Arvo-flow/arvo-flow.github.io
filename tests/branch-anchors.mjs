// tests/branch-anchors.mjs — låser branschankaret (cold-start-fyllningen av "den kollektiva sanningen").
//
// Integritetskärnan som testas (regel 3 + enhetskarantänen):
//   1. Endast kategorier med KÄND enhetsfras blir ankare — en okänd kategori får aldrig
//      renderas (då skulle ett per-enhet-tal kunna märkas som om det vore en totalsumma).
//   2. Endast källan 'real-public' (BRANCHINDEX verifierat publikt listpris) — den enda
//      vars median är PER ENHET och matchar unitLabel. Aldrig estimat/mock/total.
//   3. unitLabel är per-enhet ("per användare/år", "per abonnemang/år") — aldrig en total.
//
// Körs offline mot den RIKTIGA BRANCHINDEX (ingen DB → getBenchmark faller till mock-tiern,
// som bär kategorins verkliga källtagg). Guldmyntfoten är den deployade pipelinen; detta låser logiken.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildBranchAnchors, BRANCH_ANCHOR_UNIT } from '../api/invoice-history.mjs';

const a = (o) => ({ route: 'auto', industry: 'byraer', employees: 8, annual_cost: 50000, ...o });

describe('Branschankaret · enhet + källa', () => {
  test('mobil → ankare per abonnemang/år, verifierat publikt listpris, median > 0', async () => {
    const out = await buildBranchAnchors([a({ category: 'mobil', annual_cost: 58092 })]);
    assert.ok(out.mobil, 'mobil ska ge ett ankare (BRANCHINDEX real-public)');
    assert.equal(out.mobil.source, 'real-public');
    assert.equal(out.mobil.unitLabel, 'per abonnemang/år');
    assert.ok(out.mobil.median > 0);
    assert.equal(out.mobil.customerCost, 58092);
  });

  test('saas-productivity → ankare per användare/år', async () => {
    const out = await buildBranchAnchors([a({ category: 'saas-productivity' })]);
    assert.ok(out['saas-productivity']);
    assert.equal(out['saas-productivity'].unitLabel, 'per användare/år');
    assert.equal(out['saas-productivity'].source, 'real-public');
  });

  test('estimat-kategori (vaxel) → INGET ankare (ej i enhets-allowlist + ej real-public)', async () => {
    const out = await buildBranchAnchors([a({ category: 'vaxel' })]);
    assert.equal(out.vaxel, undefined);
  });

  test('okänd kategori utan enhetsfras → INGET ankare (gissar aldrig enheten)', async () => {
    const out = await buildBranchAnchors([a({ category: 'forsakring' })]);
    assert.deepEqual(out, {});
  });

  test('icke-auto analys (monitoring) → inget ankare', async () => {
    const out = await buildBranchAnchors([a({ category: 'mobil', route: 'monitoring' })]);
    assert.deepEqual(out, {});
  });

  test('varje median i allowlisten är PER ENHET — aldrig en orimlig totalsumma', async () => {
    // Per-enhet-tal ligger i tusentals kr/år; en total skulle vara tio- eller hundratusentals.
    for (const cat of Object.keys(BRANCH_ANCHOR_UNIT)) {
      const out = await buildBranchAnchors([a({ category: cat })]);
      if (!out[cat]) continue;                       // saknar real-public-tier i någon miljö → hoppa
      assert.ok(out[cat].median > 0 && out[cat].median < 20000,
        `${cat}: median ${out[cat].median} ser ut som en total, inte ett per-enhet-pris`);
      assert.match(out[cat].unitLabel, /per (användare|abonnemang|anslutning)\/år/);
    }
  });
});
