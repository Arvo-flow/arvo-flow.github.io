// tests/prisbokscellen.mjs — PB-01..09: får cellen tala? Läsvägen i lib/benchmark.js.
//
// ══ VARFÖR (2026-09-10, grundarmandatets steg 1 → steg 3) ═══════════════════════════════════
// Mätt mot produktion med `scripts/probe-dubbletter.mjs`: fem celler nådde tröskeln på RADER.
// Deras antal SKILDA belopp var 15, 3, 2, 4 och 1.
//   saas-productivity·hantverkare·small: 17 rader, 1 belopp → p25 = median = 184 680 kr
//   saas-productivity·byraer·small:      24 rader, 2 belopp
//   bredband·byraer·small:               33 rader, 3 belopp
//   mobil·byraer·micro:                  18 rader, 4 belopp
//   mobil·byraer·small:                  83 rader, 15 belopp   ← den enda med en fördelning
// Samma cell som `avvikelsevakten` vägrade döma på («för få SKILDA belopp, 2 av 24 rader») sålde
// läsvägen till kunden som «vad er bransch betalar». Två delar av samma modul var oense om
// huruvida cellen är ett underlag. Kravet är nu ETT (regel 1).
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att grinden tas bort eller mjukas upp; att de två avslagsskälen börjar se likadana
//     ut; att tröskeln sänks under MIN_POINTS; att läsvägen börjar DEDUPLICERA percentilerna
//     (två bolag på samma listpris är två observationer, och en kollaps förskjuter fördelningen
//     kring just listprisklumpen — åt det håll som ökar våra egna besparingsanspråk).
//   BLIND: tio skilda belopp kan vara ETT dokument analyserat tio gånger med olika utfall.
//     Dokumentidentiteten bärs av `pdf_hash` för nya rader; för de 288 rader som skrevs innan
//     kolumnen fanns är den MÄTT OKÄND (motparten `invoice_analyses` rymde 20 rader). Vakten
//     ser antal, aldrig identitet. PB-09 är därför en KÄLLTEXTVAKT och kan inte se beteende —
//     dokumentdedupen i analysgrenen bevisas av sonden, inte av sviten.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { cellenBar, getBenchmark } from '../lib/benchmark.js';
import { readFileSync } from 'node:fs';

/** En fejkad neon-klient: taggad mall in, rader ut. Skiljer de två frågorna på tabellnamnet. */
function fejkDb({ punkter = null, analyser = null, logg = [] } = {}) {
  const f = (strings) => {
    const sql = strings.join(' ');
    logg.push(sql);
    if (sql.includes('invoice_datapoints')) return Promise.resolve(punkter ? [punkter] : [{ n: 0, skilda: 0, median: null, p25: null }]);
    if (sql.includes('invoice_analyses')) return Promise.resolve(analyser ? [analyser] : [{ n: 0, median: null, p25: null }]);
    return Promise.resolve([]);
  };
  f.logg = logg;
  return f;
}

describe('Prisbokscellen — får den tala?', () => {
  test('PB-01 · för få rader avvisas, och skälet namnger båda talen', () => {
    const d = cellenBar({ n: 4, skilda: 4 });
    assert.equal(d.bar, false);
    assert.match(d.skal, /för få rader \(4 av 10\)/);
  });

  test('PB-02 · åttiotre rader med två skilda belopp är inte en fördelning', () => {
    const d = cellenBar({ n: 83, skilda: 2 });
    assert.equal(d.bar, false);
    assert.match(d.skal, /SKILDA belopp \(2 av 83 rader/);
  });

  test('PB-03 · tio rader och tio skilda belopp bär', () => {
    assert.deepEqual(cellenBar({ n: 10, skilda: 10 }), { bar: true, skal: null });
  });

  test('PB-04 · de två avslagen får aldrig se likadana ut', () => {
    // «för få rader» och «för få skilda belopp» kräver MOTSATTA åtgärder: den första löses av mer
    // data, den andra av mer VARIERAD data. Ett gemensamt skäl hade dolt vilken av dem vi har.
    const a = cellenBar({ n: 3, skilda: 3 }).skal;
    const b = cellenBar({ n: 24, skilda: 2 }).skal;
    assert.notEqual(a, b);
    assert.ok(!b.includes('för få rader'), 'en cell med 24 rader har inte för få rader');
  });

  test('PB-05 · de FEM UPPMÄTTA produktionscellerna får sin dom låst', () => {
    // Literaler ur mätningen 2026-09-10 — härleds de ur koden kan de aldrig fälla en ändring.
    const matt = [
      ['mobil·byraer·small', 83, 15, true],
      ['bredband·byraer·small', 33, 3, false],
      ['saas-productivity·byraer·small', 24, 2, false],
      ['mobil·byraer·micro', 18, 4, false],
      ['saas-productivity·hantverkare·small', 17, 1, false],
    ];
    for (const [namn, n, skilda, vantat] of matt) {
      assert.equal(cellenBar({ n, skilda }).bar, vantat, `${namn} (${n} rader, ${skilda} skilda)`);
    }
    // Fyra av fem tystnar. Det är MÄTNINGENS utfall, inte en olycka — och tröskeln sänks inte.
    assert.equal(matt.filter(([, , , v]) => v === false).length, 4);
  });

  test('PB-06 · läsvägen returnerar cellen när den bär — och percentilerna är RADERNAS', async () => {
    const db = fejkDb({ punkter: { n: 83, skilda: 15, median: 119520, p25: 35880 } });
    const bm = await getBenchmark({ category: 'mobil', industry: 'konsult', employees: 20, db });
    assert.equal(bm.source, 'real');
    assert.equal(bm.p25, 35880, 'p25 ska komma ur SQL:ens percentil över alla rader — aldrig omräknad');
    assert.equal(bm.median, 119520);
    assert.equal(bm.n, 83);
    assert.equal(bm.skilda, 15, 'antalet skilda belopp ska resa med talet');
  });

  test('PB-07 · en cell utan spridning når ALDRIG kunden som «real»', async () => {
    const db = fejkDb({ punkter: { n: 24, skilda: 2, median: 184680, p25: 184680 } });
    const bm = await getBenchmark({ category: 'saas-productivity', industry: 'konsult', employees: 20, db });
    assert.notEqual(bm.source, 'real', 'cellen med 2 skilda belopp fick ändå tala');
    assert.notEqual(bm.p25, 184680, 'det tystade talet läckte ut i svaret');
  });

  test('PB-08 · analysgrenen kräver MIN_LIVE_POINTS räknat på DOKUMENT', async () => {
    // Fejken svarar med det SQL:en skulle ha gett efter dedupen. Det som prövas här är tröskeln
    // och att grenen alls nås när datapunktsgrinden fällt — dedupens SQL bevisas av PB-09 + sonden.
    const under = fejkDb({ punkter: { n: 24, skilda: 2, median: 1, p25: 1 }, analyser: { n: 4, median: 50000, p25: 40000 } });
    assert.notEqual((await getBenchmark({ category: 'mobil', industry: 'konsult', employees: 20, db: under })).source, 'live_analyses');
    const over = fejkDb({ punkter: { n: 24, skilda: 2, median: 1, p25: 1 }, analyser: { n: 5, median: 50000, p25: 40000 } });
    const bm = await getBenchmark({ category: 'mobil', industry: 'konsult', employees: 20, db: over });
    assert.equal(bm.source, 'live_analyses');
    assert.equal(bm.p25, 40000);
  });

  test('PB-09 · analysgrenens fråga räknar en rad per DOKUMENT (källtextvakt)', () => {
    // ⚠️ DEKLARERAD SVAGHET: detta är en KÄLLTEXTVAKT. Den ser att frågan är skriven per dokument,
    // aldrig att databasen svarar så. Beteendebeviset bor i `scripts/probe-dubbletter.mjs`, som
    // mätte 2 rader → 1 dokument i `bredband·small` mot produktion och står kvar körbar.
    const src = readFileSync(new URL('../lib/benchmark.js', import.meta.url), 'utf8');
    const gren = src.slice(src.indexOf('const liveRows'), src.indexOf('const lr ='));
    assert.match(gren, /DISTINCT ON \(pdf_hash\)/, 'analysgrenen deduplicerar inte på dokument');
    assert.match(gren, /ORDER BY pdf_hash, created_at ASC/, 'utan bestämd ordning är det godtyckligt vilken rad som vinner');
    assert.ok(!/COUNT\(\*\)::int AS n\s*,[\s\S]{0,200}FROM invoice_analyses/.test(gren),
      'antalet räknas fortfarande på rader i stället för på dokument');
  });
});
