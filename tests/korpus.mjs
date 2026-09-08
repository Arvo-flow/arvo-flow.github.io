// tests/korpus.mjs — DEN VERKLIGA FORMEN, FRYST. Och vakten som gör fiktionen omöjlig.
//
// ══ VARFÖR (2026-09-08) ════════════════════════════════════════════════════════════════════
//
// Jag byggde två vakter mot extraktionen på en dag. Båda var skadliga, och båda av SAMMA skäl:
// mina testfixturer var handskrivna monospace-layouter som inte finns i någon verklig faktura.
//
//     min fixtur:  «MS-E3   Office 365 E3   12   380.00   4 560.00»   ← allt på EN rad
//     pdfjs ger:   rad 26 «Microsoft 365 Business Premium»
//                  rad 29 «57»
//                  rad 31 «270,00»
//                  rad 33 «15 390,00»                                  ← EN CELL PER RAD
//
// Mätt: **0 av 75** verkliga fakturor har min radform. 62 av 75 har antalet i egen rad. Följden
// var att en KORREKT avläst kvantitet klassades som fabrikation, ett verkligt bytesmål på
// 40 842 kr/år tystades, och attribueringslåset föll tillbaka till AI:ns egen text. Sviten sa
// 2 189 gröna hela vägen.
//
// Det är villkorsvaktens sjukdom, men på KORPUSNIVÅ: sviten matade ett tillstånd produktionen
// aldrig är i. Och det är inte första gången — LFL-harnesset (12 aug), obduktionens DB-lösa svit
// (21 aug), `holdings.mjs` (19 aug) och ankaret (15 aug) är samma fel. Fem gånger.
//
// ── VAD SOM GÖR DET OMÖJLIGT, INTE BARA OSANNOLIKT ────────────────────────────────────────
// `test-corpus/textlager/` bär pdfjs FAKTISKA utfall för 74 av 75 verkliga fakturor, fryst
// deterministiskt (inga modellanrop, `scripts/frys-korpus.mjs`). KO-03 nedan kräver att varje
// modul som konsumerar `dokumenttext` PRÖVAS mot korpusen — en vakt vars enda indata är
// handskriven kan inte längre bli grön.
//
// ── VAD KORPUSEN INTE ÄR ──────────────────────────────────────────────────────────────────
// Den bär TEXTEN, inte facit. `test-snapshots/` har 85 radposter och NOLL med `quantity` — den
// frusna extraktionskorpusen kan alltså inte se fältet som öppnar avgiftsgrinden. Att märka upp
// rätt kvantitet per rad kräver modellen eller en människa och är INTE gjort. Det står här i
// klartext i stället för i en TODO, för en lucka som inte är skriven är en lucka ingen stänger.
//
// FÅNGAR: en modul som läser dokumenttext men aldrig prövats mot verkligt pdfjs-utfall, och att
//   korpusen töms eller kopplas bort.
// BLIND: KO-03 ser att korpusen ANVÄNDS, aldrig att den används KLOKT — ett test som laddar en
//   korpusfil och sedan inte påstår något om den passerar. Den flyttar bevisbördan till något en
//   granskare kan slå upp; den bär den inte.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KORPUS = join(ROT, 'test-corpus');
const TEXTLAGER = join(KORPUS, 'textlager');

/** Manifestet över frysta textlager. */
export function korpusManifest() {
  return JSON.parse(readFileSync(join(KORPUS, 'manifest.json'), 'utf8'));
}

/**
 * pdfjs VERKLIGA utfall för en faktura. Enda tillåtna källan till dokumenttext i tester som
 * prövar en textläsande vakt — en handskriven sträng bevisar ingenting om produktionen.
 *
 * @param {string} namn  filnamn utan .txt, t.ex. 'microsoft'
 */
export function korpusText(namn) {
  const p = join(TEXTLAGER, `${namn}.txt`);
  if (!existsSync(p)) {
    throw new Error(`korpusText: «${namn}» finns inte. Tillgängliga: ${korpusNamn().slice(0, 8).join(', ')} …`);
  }
  return readFileSync(p, 'utf8');
}

/** Alla frysta fakturor, sorterade. */
export function korpusNamn() {
  return readdirSync(TEXTLAGER).filter((f) => f.endsWith('.txt')).map((f) => f.replace(/\.txt$/, '')).sort();
}

// ── Moduler som läser dokumenttext. Varje ny sådan MÅSTE stå här och prövas mot korpusen. ────
// Listan är avsiktligt handskriven: den är ett KONTRAKT, och KO-02 kontrollerar att den är
// fullständig genom att skanna lib/ efter parametern. Att härleda den helt automatiskt hade
// gjort den omöjlig att läsa som ett löfte.
const TEXTLASANDE_MODULER = [
  { modul: 'lib/kvantitetsvittne.js', test: 'tests/kvantitetsvittne.mjs', klass: 'faktura' },
  { modul: 'lib/fakturabalans.js',    test: 'tests/fakturabalans.mjs',    klass: 'faktura' },
  { modul: 'lib/fakturanummer.js',    test: 'tests/fakturanummer.mjs',    klass: 'faktura' },
  // ⚠️ AVTAL, INTE FAKTUROR. Mätt: `MIN_TEXTLAGER = 2000` och NOLL av 74 fakturatextlager når
  // dit — avtalsdokument är storleksordningar längre. Att tvinga modulen mot en fakturakorpus
  // hade varit exakt det fel korpusen finns för att stoppa: mäta mot fel form. Klassen är
  // DEKLARERAD i stället för tyst undantagen, och KO-04 kräver att varje klass som saknar korpus
  // står namngiven — annars blir «ingen korpus» ett gömställe.
  { modul: 'lib/villkorslasare.js',   test: 'tests/villkorslasare.mjs',   klass: 'avtal' },
];

/** Dokumentklasser korpusen faktiskt täcker. Allt annat måste deklareras och saknar prövning. */
const KORPUSKLASSER = new Set(['faktura']);

// ⚠️ SKANNINGEN SÅG BARA ETT PARAMETERNAMN (rättat av sabotaget, 2026-09-08).
// KO-02 letade enbart `dokumenttext`. `lib/fakturanummer.js` kallar sin parameter `textlager`,
// så sabotaget «lyft ut fakturanummer ur kontraktet» fällde NOLL — kontraktet kunde alltså
// kortas i tysthet för just den grind som är ARMERAD i produktion. En vakt som låser ett
// stavsätt i stället för en egenskap är samma fel som fällde LN-11 och DL-10b samma dag.
// Skanningen känner nu igen båda namnen på samma sak.
const TEXTPARAMETER = /\b(?:dokumenttext|textlager)\b/;

describe('KO · Korpusen är den verkliga formen — fiktionen är omöjlig', () => {
  test('KO-01 · korpusen finns, är fylld, och matchar sitt manifest', () => {
    const m = korpusManifest();
    const filer = korpusNamn();
    assert.ok(filer.length >= 70,
      `bara ${filer.length} frysta textlager — en tom korpus gör KO-03 grön av tomhet`);
    assert.equal(filer.length, m.medTextlager, 'manifestet och katalogen är oense');
    // Och innehållet ska vara pdfjs verkliga utfall, inte en handskriven rad.
    const ms = korpusText('microsoft');
    assert.ok(ms.split('\n').length > 20, 'ett verkligt textlager har många rader');
    assert.match(ms, /^57$/m, 'antalet står på EGEN rad — det är hela poängen med korpusen');
  });

  test('KO-02 · varje textläsande modul i lib/ står i kontraktet', () => {
    // En ny modul med parametern `dokumenttext` som inte finns i listan är en vakt ingen
    // tvingar mot korpusen — precis hålet som lät mig bygga två skadliga vakter på en dag.
    const libDir = join(ROT, 'lib');
    // ⚠️ SKANNINGEN LÄSTE PROSA SOM KOD (rättat av sabotaget, andra gången samma dag).
    // Med bara ordet som villkor fälldes fem moduler som nämner «textlager» i en KOMMENTAR —
    // en vakt som skriker på rätt beteende blir avstängd inom en vecka. Kommentarer strippas
    // därför till radslut, och parametern måste stå i en SIGNATUR eller en destrukturering:
    // det är där en modul faktiskt TAR EMOT dokumenttext och kan döma på den.
    const funna = readdirSync(libDir)
      .filter((f) => f.endsWith('.js'))
      .filter((f) => {
        const kod = readFileSync(join(libDir, f), 'utf8')
          .split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n')
          .replace(/\/\*[\s\S]*?\*\//g, '');
        // `{ dokumenttext }` eller `(textlager)` — mottagen som argument, inte omtalad.
        return /[({,]\s*(?:dokumenttext|textlager)\s*[,)}=]/.test(kod);
      })
      .map((f) => `lib/${f}`);
    assert.ok(funna.length > 0, 'skanningen hittade noll moduler — då vaktar KO-02 ingenting');
    const deklarerade = new Set(TEXTLASANDE_MODULER.map((t) => t.modul));
    const odeklarerade = funna.filter((f) => !deklarerade.has(f));
    assert.deepEqual(odeklarerade, [],
      `textläsande modul(er) utanför korpuskontraktet: ${odeklarerade.join(', ')}`);
  });

  test('KO-03 · varje textläsande modul PRÖVAS mot verkligt pdfjs-utfall', () => {
    // Kärnan. Ett test som bara matar handskrivna strängar bevisar att mekanismen SVARAR,
    // aldrig att den svarar på det produktionen skickar. Här krävs korpusen.
    const brister = [];
    for (const { modul, test: testfil, klass } of TEXTLASANDE_MODULER) {
      if (!KORPUSKLASSER.has(klass)) continue;   // annan dokumentklass → KO-04 äger den
      const p = join(ROT, testfil);
      if (!existsSync(p)) { brister.push(`${testfil} saknas (${modul} är oprövad)`); continue; }
      const kalla = readFileSync(p, 'utf8').split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n');
      if (!/\bkorpusText\s*\(/.test(kalla)) {
        brister.push(`${testfil} prövar ${modul} utan verkligt pdfjs-utfall (använd korpusText)`);
      }
    }
    assert.deepEqual(brister, [], brister.join('\n  '));
  });

  test('KO-04 · en modul utan korpus är DEKLARERAD, aldrig tyst', () => {
    // «Ingen korpus finns för den här dokumentklassen» är ett giltigt svar — men bara som ett
    // SVAR. Utan det här provet hade `klass: 'nagot-annat'` blivit ett gömställe där vilken
    // modul som helst kunde slippa prövningen. Varje klass måste vara antingen täckt eller
    // uttryckligen namngiven som otäckt.
    const KANDA_OTACKTA = new Set(['avtal']);
    const okanda = TEXTLASANDE_MODULER
      .filter((m) => !KORPUSKLASSER.has(m.klass) && !KANDA_OTACKTA.has(m.klass))
      .map((m) => `${m.modul} (klass: ${m.klass})`);
    assert.deepEqual(okanda, [],
      `dokumentklass varken täckt av korpusen eller deklarerad som otäckt: ${okanda.join(', ')}`);
    // Och varje deklaration måste ha en klass alls — `undefined` vore samma tysta undantag.
    for (const m of TEXTLASANDE_MODULER) {
      assert.ok(typeof m.klass === 'string' && m.klass.length > 0,
        `${m.modul} saknar dokumentklass — då går det inte att avgöra om den är prövbar`);
    }
  });
});
