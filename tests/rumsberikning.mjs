// tests/rumsberikning.mjs — RUMMET BERIKAS PÅ EN VÄG, OCH SONDEN GÅR DEN VÄGEN.
//
// ══ VARFÖR (2026-09-22, ur grundarfrågan «hur ser det ut i rummet?») ════════════════════════
// Rummet fotograferades på dagens fem produktionsrader och visade «0 prissatta» — vilket såg ut
// som ett besked om produkten. Det var det inte. `prisunderlag` finns INTE i databasen; det
// räknas vid läsning i `api/invoice-history.mjs`, och `scripts/screenshot-kontoret-real.mjs`
// byggde payloaden själv utan att köra den koden. Varje rad saknade fältet av konstruktion.
//
// Det är felfamiljen i sin renaste form: ett resultat som betyder «jag mätte inte», återgivet som
// en mätning — och femte gången samma harness-sjukdom (LFL-produktionsvägen 12 aug, ankaret
// 15 aug, obduktionens DB-lösa svit 21 aug, holdings.mjs 19 aug).
//
// Loopen bor nu i `berikaRader`, och BÅDA anroparna går dit. Att kopiera de tio raderna in i
// sonden hade gett två sanningar om samma fråga (regel 1) — och kopian hade glidit isär precis
// som `_isSameSupplier` redan hade gjort.
//
// FÅNGAR: en handler eller en rumssond som bygger sitt prisunderlag själv i stället för att
//   anropa den delade vägen · en sond som tiger om att den fick noll ankare.
// BLIND: testet ser ATT vägen anropas, aldrig att ankarna är RÄTT. Om `buildBranchAnchors` ger
//   tomt (ingen databas) blir varje underlag null — korrekt, men omöjligt att skilja från
//   «kategorin bär inget golv». Därför kräver RU-03 att sonden SKRIVER UT antalet ankare.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { berikaRader } from '../api/invoice-history.mjs';

const las = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const HANDLER = las('../api/invoice-history.mjs');
const SOND = las('../scripts/screenshot-kontoret-real.mjs');

describe('RU · rummets berikning', () => {
  test('RU-01 · handlern och rumssonden anropar SAMMA funktion', () => {
    assert.match(HANDLER, /\n\s*berikaRader\(analyses, branchAnchors\);/,
      'handlern bygger prisunderlaget själv igen — då kan sonden aldrig mäta rummet');
    assert.match(SOND, /berikaRader\(analyses, branchAnchors\)/,
      'rumssonden går inte den riktiga vägen — bilden mäter då sonden, inte rummet');
    // Motprovet mot en återinförd kopia: bara EN plats i repot får bygga underlaget per rad.
    const byggare = [HANDLER, SOND].filter((k) => /a\.prisunderlag\s*=\s*underlagForRad\(/.test(k));
    assert.equal(byggare.length, 1,
      'två ställen sätter a.prisunderlag — en kopia som kan glida isär (regel 1)');
  });

  test('RU-02 · funktionen sätter fälten, och gör det bara för granskade kategorier', () => {
    // Beteende, inte källtext. `saas-finance` är granskad (talar), `it-support` är det inte.
    const rader = [
      { category: 'saas-finance', annual_cost: 21600, seat_count: 10 },
      { category: 'it-support',   annual_cost: 180000, seat_count: 10 },
    ];
    berikaRader(rader, {});
    for (const r of rader) {
      assert.ok('prisunderlag' in r, `${r.category}: fältet ska alltid sättas, även till null`);
      assert.ok('arvoScore' in r, `${r.category}: scoren ska alltid sättas`);
    }
    // MOTPROVET: en oreviderad kategori får ALDRIG ett underlag, hur mycket data den än bär.
    const oreviderad = rader.find((r) => r.category === 'it-support');
    assert.equal(oreviderad.prisunderlag, null,
      'revisionsgrinden gäller hela vägen — en tyst kategori får inget prisunderlag');
    // Och tystnadsskälet följer med raden i stället för att lämna kunden utan besked.
    assert.ok(oreviderad.tystnad !== undefined, 'tystnadens skäl ska följa raden');
  });

  test('RU-03 · sonden tiger inte om ett tomt ankarutfall', () => {
    // Ett «0 prissatta» som beror på noll ankare är ett utfall om KÖRNINGEN, inte om rummet.
    // Läxan från 21 augusti: ett mätvärde som bekräftar hypotesen ska granskas hårdare.
    assert.match(SOND, /Object\.keys\(branchAnchors\)\.length/,
      'sonden mäter inte hur många ankare den fick');
    assert.match(SOND, /NOLL ANKARE/,
      'sonden säger inte ifrån när ankarna är tomma — då läses noll som ett mätvärde');
    assert.match(SOND, /prisunderlag: \$\{medUnderlag\} av \$\{analyses\.length\}/,
      'sonden skriver inte ut hur många rader som faktiskt fick ett underlag');
  });
});
