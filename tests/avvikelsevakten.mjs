// tests/avvikelsevakten.mjs — AV-01..08: prisbokens avvikelsevakt får aldrig straffa oss för data.
//
// ══ VARFÖR (2026-09-10, ur produktionsloggen) ═══════════════════════════════════════════════
// Två gånger på tio minuter kastade prisboken en helt korrekt datapunkt:
//   outlier dropped — annualCost=272880 z=1028.99 mean=184663 stddev=86 n=24
//   outlier dropped — annualCost=97531  z=1016.32 mean=184663 stddev=86 n=24
//
// z ≈ 1000 på ett rimligt pris är inte ett fynd, det är ett trasigt mått. Standardavvikelsen var
// 86 kr kring 184 663 kr: cellens 24 rader var näst intill samma tal, och mot ett spann på några
// kronor blir varje verkligt pris ett extremvärde. Vakten stängde dörren hårdare ju mer data vi
// samlade — samma bakvända mekanik som när branschankaret tystnade av mer nätverksdata.
//
// TVÅ FIXAR, OCH DEN FÖRSTA RÄCKTE INTE. Att byta medelvärde/σ mot median/MAD var rätt idé men
// mätt på fel mängd: grundarens cell föll ÄNDÅ (kvot 87 132 × MAD), eftersom bara exakt lika
// värden ger MAD = 0 och verkliga dubbletter skiljer sig på kronan. Kravet ställs nu på antalet
// SKILDA belopp — tio observationer, inte tio kopior.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att spärren åter fäller en punkt i en cell utan verklig fördelning, att den slutar
//     fånga enhetsfel (×1000), och att «kunde inte bedöma» börjar se ut som «friad».
//   BLIND: om cellens SKILDA belopp i sig är fel (t.ex. tio olika USD-belopp lagrade som SEK)
//     ser vakten en fin fördelning och friar allt inom den. Det skyddet bor i enhetskarantänen
//     (0,1–10 × listprismedian), inte här — och den gränsen prövas av sina egna tester.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { bedomAvvikelse, MAD_TAK } from '../lib/benchmark.js';

/** Grundarens verkliga cell: 24 rader, ett fåtal skilda belopp, spridning på kronnivå. */
const GRUNDARENS_CELL = Array.from({ length: 24 }, (_, i) => 184663 + (i % 3) - 1);
/** En cell med genuin fördelning — tolv olika bolags årskostnader. */
const VERKLIG_CELL = [1000, 1200, 1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000, 4200, 4500];

// ── AV-09..10 · DEDUPLICERINGEN BOR OCKSÅ I SKRIVNINGEN (2026-09-10) ────────────────────────
// Avvikelsevakten deduplicerar innan den dömer. Men skrivningen fortsatte lägga en ny rad för
// varje omanalys av samma dokument, så cellen blev bara mer degenererad över tid — vakten
// avstod alltså allt oftare, och moaten fylldes med kopior utan att något stoppade dem.
// Nyckeln är dokumentet plus kategorin: en blandad faktura får ge en punkt per kategori.
describe('AV · prisboken samlar inte dubbletter av samma dokument', () => {
  test('AV-09 · skrivningen dedupar på (pdf_hash, category)', async () => {
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
    const BM = readFileSync(join(rot, 'lib/benchmark.js'), 'utf8');
    assert.match(BM, /ON CONFLICT \(pdf_hash, category\) WHERE pdf_hash IS NOT NULL DO NOTHING/,
      'utan spärren växer cellen med en kopia per omanalys, och vakten avstår allt oftare');
    assert.match(BM, /pdfHash = null/,
      'och utan pdfHash skrivs raden som förut — fail-open, hellre en dubblett än en tappad punkt');
  });

  test('AV-10 · kolumnen skapas av en MIGRERING, inte av en självläkning', async () => {
    // LK-01:s läxa: en självläkning någon annanstans i koden räknas inte — det var precis den
    // som aldrig kördes när `invoice_number` saknades och hela rummet tyst degraderade.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
    const MIG = readFileSync(join(rot, 'scripts/migrate.mjs'), 'utf8');
    assert.match(MIG, /ADD COLUMN IF NOT EXISTS pdf_hash TEXT/);
    assert.match(MIG, /CREATE UNIQUE INDEX IF NOT EXISTS idx_datapoints_dokument/,
      'ON CONFLICT kräver ett unikt index — utan det kastar satsen i produktion');
    assert.match(MIG, /WHERE pdf_hash IS NOT NULL/,
      'partiellt: äldre rader saknar hash och ska förbli orörda — radering är grundarens beslut');
  });

  test('AV-11 · anroparna SKICKAR dokumentet — annars är spärren död kod', async () => {
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
    const API = readFileSync(join(rot, 'api/test-invoice.mjs'), 'utf8');
    const anrop = [...API.matchAll(/storeDatapoint\(\{[\s\S]{0,400}?\}\)/g)].map((m) => m[0]);
    assert.ok(anrop.length >= 2, `hittade ${anrop.length} storeDatapoint-anrop — mönstret matchar inte längre`);
    for (const a of anrop) {
      assert.match(a, /pdfHash/, 'ett anrop utan pdfHash skriver en dubblett vid varje omanalys');
    }
  });
});

describe('AV · avvikelsevakten mäter en fördelning, aldrig en klump', () => {
  test('AV-01 · grundarens cell fäller INTE längre ett korrekt pris', () => {
    // Det exakta talet ur produktionsloggen. Faller det här har vi återinfört felet.
    const dom = bedomAvvikelse(97531, GRUNDARENS_CELL);
    assert.equal(dom.faller, false,
      'en cell utan fördelning får aldrig fälla — det var så spärren straffade oss för mer data');
    assert.match(dom.skal, /för få SKILDA belopp/,
      'och tystnaden måste bära sitt skäl: «friad» och «kunde inte bedöma» får inte se lika ut');
  });

  test('AV-02 · den andra loggade punkten likaså', () => {
    assert.equal(bedomAvvikelse(272880, GRUNDARENS_CELL).faller, false);
  });

  test('AV-03 · skyddet mot enhetsfel är KVAR — vakten togs inte bort', () => {
    // Motprovet, och det viktigaste testet i filen. En spärr som slutat fälla är lika värdelös
    // som ingen spärr: ett USD-belopp lagrat som SEK förgiftar prisboken i åratal.
    const dom = bedomAvvikelse(2_600_000, VERKLIG_CELL);
    assert.equal(dom.faller, true, 'ett tusenfaldigt enhetsfel måste fortfarande fällas');
    assert.ok(dom.kvot > MAD_TAK);
  });

  test('AV-04 · ett rimligt pris i en verklig cell frias', () => {
    const dom = bedomAvvikelse(2600, VERKLIG_CELL);
    assert.equal(dom.faller, false);
    assert.equal(dom.skal, null, 'här BEDÖMDE vakten och friade — den avstod inte');
  });

  test('AV-05 · «kunde inte bedöma» och «friad» är skilda tillstånd', () => {
    // Hela obduktionens felfamilj i en mening: ett tillstånd som betyder «jag mätte inte» får
    // aldrig bära samma form som ett giltigt svar. Här skiljs de av `skal`.
    const avstod = bedomAvvikelse(5, [1, 2, 3]);
    const friad  = bedomAvvikelse(2600, VERKLIG_CELL);
    assert.equal(avstod.faller, false);
    assert.equal(friad.faller, false);
    assert.notEqual(avstod.skal, friad.skal, 'de två måste gå att skilja åt av en läsare');
    assert.ok(avstod.skal && !friad.skal);
  });

  test('AV-06 · dubbletter räknas som EN observation', () => {
    // Tio kopior av samma belopp plus ett enda annat är inte elva observationer.
    const tio_kopior = [...Array(10).fill(5000), 6000];
    const dom = bedomAvvikelse(99999, tio_kopior);
    assert.equal(dom.faller, false);
    assert.match(dom.skal, /2 av 11 rader/, 'skälet ska redovisa både unika och rader — annars '
      + 'går det inte att se VARFÖR vakten avstod');
  });

  test('AV-07 · MAD kan aldrig bli 0 efter dedupliceringen — invarianten, inte grenen', () => {
    // ⚠️ FÖRSTA VERSIONEN VAR VILLKORAD (`if (dom.mad === 0)`) och prövade därför ingenting:
    // sabotaget «låt MAD = 0 FÄLLA i stället för att avstå» fällde NOLL test. Skälet är att
    // grenen är onåbar efter dedupliceringen — bland tio SKILDA värden kan högst ett ligga på
    // medianen, så medianen av avvikelserna är alltid > 0. Ett villkorat test som aldrig går in
    // i sitt villkor är ett grönt som betyder «jag tittade inte».
    //
    // Rätt sak att låsa är alltså INVARIANTEN, inte grenen: MAD > 0 för varje cell som passerar
    // deduplicerings-kravet. Grenen står kvar i koden som ett bälte — den blir nåbar igen i exakt
    // det ögonblick någon tar bort dedupliceringen, vilket AV-01 fäller separat.
    for (let seed = 0; seed < 200; seed += 1) {
      const cell = Array.from({ length: 10 + (seed % 15) }, (_, i) => 1000 + i * (1 + (seed % 7)));
      const dom = bedomAvvikelse(cell[0], cell);
      assert.equal(dom.skal, null, `cell ${seed} avstod oväntat: ${dom.skal}`);
      assert.ok(dom.mad > 0, `cell ${seed} gav MAD = ${dom.mad} trots ${new Set(cell).size} skilda värden`);
    }
  });

  test('AV-08 · gränsen ligger på 7350 kr och är prövad åt båda håll', () => {
    // ⚠️ FÖRSTA VERSIONEN RÄKNADE SITT FACIT UR `MAD_TAK` (`2350 + MAD_TAK * 1000`). Sabotaget
    // «vidga taket tio gånger» fällde då NOLL test: förväntan flyttade med konstanten den skulle
    // vakta. Ett test som härleder sin gräns ur det den prövar kan aldrig fälla en ändring av den.
    // Talen står nu som LITERALER, uträknade en gång för hand ur VERKLIG_CELL:
    //   median = 2350 · MAD = 1000 · gräns = 2350 + 5 × 1000 = 7350.
    assert.equal(bedomAvvikelse(7351, VERKLIG_CELL).faller, true, 'strax utanför gränsen ska fällas');
    assert.equal(bedomAvvikelse(7349, VERKLIG_CELL).faller, false, 'strax innanför ska frias');
    // Och literalerna får inte glida från cellen de bygger på — annars vaktar de fel tal.
    const kontroll = bedomAvvikelse(7350, VERKLIG_CELL);
    assert.equal(Math.round(kontroll.median), 2350);
    assert.equal(Math.round(kontroll.mad), 1000);
    assert.equal(MAD_TAK, 5, 'ändras taket måste literalerna ovan räknas om — det är hela poängen');
  });
});
