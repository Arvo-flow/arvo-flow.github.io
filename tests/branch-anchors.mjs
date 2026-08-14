// tests/branch-anchors.mjs — låser branschankaret (cold-start-fyllningen av "den kollektiva sanningen").
//
// Integritetskärnan som testas (regel 3 + enhetskarantänen):
//   1. Endast kategorier med KÄND enhetsfras blir ankare — en okänd kategori får aldrig
//      renderas (då skulle ett per-enhet-tal kunna märkas som om det vore en totalsumma).
//   2. Endast källan 'real-public' (BRANCHINDEX verifierat publikt listpris) — den enda
//      vars median är PER ENHET och matchar unitLabel. Aldrig estimat/mock/total.
//   3. unitLabel är per-enhet ("per användare/år", "per abonnemang/år") — aldrig en total.
//
// ⚠️ VAD DEN HÄR SVITEN INTE KUNDE SE (grundargranskning 2026-08-15) — och varför det är läxan:
// Ankaret byggdes tidigare via `getBenchmark()`, prisbokens läsväg för en BESPARINGSBERÄKNING.
// Den föredrar — helt riktigt — livedata när den finns (invoice_datapoints ≥10, invoice_analyses
// ≥5), och livedatan är TOTALSUMMOR. Filtret på source === 'real-public' gjorde då rätt sak av
// fel svar: det kastade ankaret i stället för att hämta rätt källa. Följden var bakvänd — ju mer
// nätverksdata vi samlade, desto oftare gick "den kollektiva sanningen" tyst, det lager bibeln
// säger aldrig kan vara tomt. I grundarens skarpa rum var kortet borta.
//
// Sviten var grön hela tiden, och kunde inte ha varit annat: den kör UTAN DB, och utan DB fanns
// ingen livedata som kunde vinna över real-public. Testerna bevisade att mekanismen svarar rätt
// i ett tillstånd produktionen inte är i — exakt villkorsvaktens och LFL-harnessets sjukdom.
// Åtgärden var att göra frågan oberoende av tillståndet: `getPublicListBenchmark()` läser
// BRANCHINDEX direkt och kan bara svara med verifierat publikt listpris per enhet. Nu är offline
// och produktion samma väg — och BA-08 nedan låser att den gamla vägen inte kan smyga tillbaka.
//
// Körs offline mot den RIKTIGA BRANCHINDEX. Guldmyntfoten är den deployade pipelinen; detta låser logiken.

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

  test('seats ur fakturan bärs vidare (för bransch-total = median × seats); saknas → null', async () => {
    const withSeats = await buildBranchAnchors([a({ category: 'mobil', seat_count: 20 })]);
    assert.equal(withSeats.mobil.seats, 20);
    assert.equal(withSeats.mobil.unitNoun, 'abonnemang');
    const noSeats = await buildBranchAnchors([a({ category: 'mobil' })]);
    assert.equal(noSeats.mobil.seats, null);          // aldrig en gissad enhetsmängd
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

  test('BA-08 · ankaret får ALDRIG gå via prisbokens prioritetskedja', async () => {
    // Det var den vägen som tystade kortet i skarpt läge: getBenchmark föredrar livedata
    // (totalsummor), ankaret krävde per-enhet — och kastade i stället för att fråga rätt källa.
    // Vakten läser källtexten, för buggen syns bara i VILKEN funktion som anropas: båda
    // returnerar ju ett giltigt ankare i en DB-lös testmiljö.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../api/invoice-history.mjs'), 'utf8');
    const fn = src.slice(src.indexOf('export async function buildBranchAnchors'));
    const kropp = fn.slice(0, fn.indexOf('\n}\n'));
    assert.doesNotMatch(kropp, /await getBenchmark\(|[^c]getBenchmark\(\{/,
      'ankaret frågar prisbokens besparingsväg igen — då tystnar det så fort livedata finns');
    assert.match(kropp, /getPublicListBenchmark\(/,
      'ankaret ska läsa verifierat publikt listpris direkt (samma källa dörrens avslöjande använder)');
  });
});
