// tests/pastaendevakt.mjs — PV-01..08 (påståendevakten) + CK-01..05 (commit-kravet).
//
// Fable 5.1:s punkt 2, 3 och 4, efter granskningen av Opus 5. Båda vakterna finns för att samma
// felform återkom ~25 gånger under obduktionen och två gånger i granskningen samma dag:
// ETT PÅSTÅENDE SKREVS NER INNAN DET KÖRDES.
//
// FÅNGAR: ett nytt mekanismpåstående utan utpekat bevis, ett uppdiktat test-ID, och en
//   beteendeändring i lib//api vars commit inte namnger syskonfall eller sabotage med ett tal.
// BLIND: båda vakterna läser ORD, aldrig innebörd. «Syskonfall: inga» passerar, ett ID kan peka
//   på ett test som prövar något annat, och ett påstående utan något av orden syns inte. De
//   flyttar bevisbördan till något en granskare kan slå upp — de bär den inte.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  domRad, granskaDiff, citeradeTestId, tillagdaRader, arRiktigtTest, pastaendetext, motiveradeRader,
  PASTAENDEORD, BEVAKADE,
} from '../lib/pastaendevakt.js';
import { granskaCommit, arBeteendeandring, KRAVDA_KATALOGER } from '../lib/commitkrav.js';

/** En riktig `git diff --cached -U0` i miniatyr — kedjan prövas, inte bara domaren. */
const diffMed = (fil, rader) =>
  `diff --git a/${fil} b/${fil}\n--- a/${fil}\n+++ b/${fil}\n@@ -10,0 +11,${rader.length} @@\n`
  + rader.map((r) => `+${r}`).join('\n') + '\n';

describe('PV · Påståendevakten: ett mekanismpåstående pekar på ett test', () => {
  test('PV-01 · de två påståenden som VAR falska fälls', () => {
    // Fables två fynd, ordagrant. Hade vakten funnits hade båda stoppats före commit.
    const brott = granskaDiff(diffMed('lib/cronvakt.js', [
      '// Grinden är fail-closed: en osatt hemlighet nekar allt.',
      '// Gränssnittet är samma kontrakt som FileStore.',
    ]));
    assert.equal(brott.length, 2);
    assert.deepEqual(brott.map((b) => b.skal), ['fail-closed', 'samma kontrakt']);
  });

  test('PV-02 · MOTPROVET — samma påstående med sitt test-ID passerar', () => {
    const brott = granskaDiff(diffMed('lib/cronvakt.js', [
      '// Grinden är fail-closed: en osatt hemlighet nekar allt (SL-04).',
    ]));
    assert.deepEqual(brott, [], 'ett utpekat bevis ska släppa igenom — annars blir vakten avstängd');
  });

  test('PV-03 · KOD fälls aldrig — bara påståenden i kommentarer', () => {
    // Vakten dömer utsagor, inte identifierare. `const failClosed = true` är ingen utsaga.
    const brott = granskaDiff(diffMed('lib/x.js', [
      "const läge = 'fail-closed';",
      'if (samlaKontrakt()) return;',
    ]));
    assert.deepEqual(brott, []);
  });

  test('PV-04 · en diskussion OM ett påstående kan motiveras inline', () => {
    // Fables egen obduktionstext citerar «fail-closed — nekar allt» för att visa att det var
    // FALSKT. En vakt som fäller sin egen dokumentation får folk att radera dokumentationen
    // (SV-07:s läxa), så motiveringen finns — men den måste skrivas ut.
    const utan = granskaDiff(diffMed('lib/x.js', ['// bibeln kallade den «fail-closed». Falskt.']));
    assert.equal(utan.length, 1, 'utan motivering fälls den');
    const med = granskaDiff(diffMed('lib/x.js',
      ['// bibeln kallade den «fail-closed». Falskt. // pastaende-ok: citerar ett fällt påstående']));
    assert.deepEqual(med, []);
  });

  test('PV-05 · filer utanför koden är utanför vakten', () => {
    assert.deepEqual(granskaDiff(diffMed('CLAUDE.md', ['// fail-closed utan bevis'])), [],
      'bibeln är prosa; koden är det vakten dömer');
    assert.ok(BEVAKADE.test('lib/a.js') && BEVAKADE.test('api/b.mjs') && !BEVAKADE.test('ops/c.md'));
  });

  test('PV-06 · ordlistan bär bara MEKANISMpåståenden — inte vanlig svenska', () => {
    // Mätt 2026-09-01 på 20 commits tillagda rader: «aldrig» gav 25 träffar, «alltid» 3.
    // Ett bannlyst «aldrig» hade fällt nästan varje commit, och en vakt som skriker på rätt
    // beteende blir avstängd — vilket är värre än ingen vakt (smyghöjningen 2026-08-05).
    for (const ord of ['aldrig', 'alltid', 'får aldrig', 'säkert', 'garanterat']) {
      assert.ok(!PASTAENDEORD.includes(ord), `«${ord}» är vanlig svenska och hör inte hemma i listan`);
    }
    assert.deepEqual(granskaDiff(diffMed('lib/x.js', ['// Vi lovar aldrig något vi inte kan mäta.'])), []);
  });

  test('PV-07 · ett uppdiktat test-ID hittas — annars vaktar den stavning', () => {
    const idn = citeradeTestId(diffMed('lib/x.js', ['// fail-closed enligt ZZ-99 och SL-04.']));
    assert.deepEqual(idn.sort(), ['SL-04', 'ZZ-99']);
    // Skalet slår upp dem i tests/; här bevisas att BÅDA plockas ut, så uppslaget kan fälla ZZ-99.
    assert.deepEqual(citeradeTestId(diffMed('lib/x.js', ["const id = 'ZZ-99';"])), [],
      'bara kommentarer räknas — en sträng i koden är inget påstående');
  });

  test('PV-08 · KEDJAN från diffens format, inte bara domaren', () => {
    // RO-01:s läxa: ett test som matar sitt eget indata bevisar bara vidarebefordran. Bryts
    // diff-parsningen ska sviten falla, inte bli grön på en form produktionen aldrig ser.
    const per = tillagdaRader(diffMed('lib/x.js', ['rad ett', 'rad två']));
    assert.deepEqual([...per.keys()], ['lib/x.js']);
    assert.deepEqual(per.get('lib/x.js').map((r) => r.nr), [11, 12], 'radnumren ska följa hunk-huvudet');
    assert.equal(domRad('// fail-closed').brott, true);
    assert.equal(domRad('  fail-closed utan kommentartecken').brott, false);
  });
});

describe('PV · Uppslaget får inte träffa sin egen fixtur', () => {
  test('PV-09 · ett ID måste stå som TESTTITEL, inte bara som en sträng i tests/', () => {
    // Det skarpa provet fällde vaktens första version: `ZZ-99` godkändes, eftersom jag själv
    // skrivit strängen i PV-07:s fixtur. Uppslaget träffade sin egen testfil — en vakt grön på
    // fel grund, i precis den sjukdom den byggdes mot. Hittat av git-vägen, inte av sviten.
    const riktig = "test('SL-04 · en osatt hemlighet nekar', () => {});";
    assert.equal(arRiktigtTest('SL-04', riktig), true);
    assert.equal(arRiktigtTest('ZZ-99', "const id = 'ZZ-99';"), false,
      'en sträng i en fixtur är inget test');
    assert.equal(arRiktigtTest('ZZ-99', '// ZZ-99 nämns i en kommentar'), false);
    assert.equal(arRiktigtTest('SL-04', riktig.replace('test(', 'describe(')), true,
      'describe-titlar räknas också');
  });
  test('PV-10 · en motiverad DISKUSSIONSRAD ID-granskas inte — vakten var självmotsägande', () => {
    // domRad släppte igenom en `pastaende-ok`-rad medan ID-uppslaget fällde samma rad för ett
    // illustrativt «XX-01». Två regler om samma rad som sa emot varandra. Hittat när vakten kördes
    // mot sin egen källkod — sviten kunde inte se det, för den matar diffar utan illustrationer.
    assert.deepEqual(citeradeTestId(diffMed('lib/x.js',
      ['// skriv «XX-01» så tystnar den  // pastaende-ok: illustrativt ID'])), []);
    // MOTPROVET: ett omotiverat påhittat ID plockas fortfarande ut och kan fällas av uppslaget.
    assert.deepEqual(citeradeTestId(diffMed('lib/x.js', ['// fail-closed enligt XX-01.'])), ['XX-01']);
  });
});

describe('PV · Fable 5.1:s granskning 2026-09-02 — sju hål i vakten själv', () => {
  test('PV-11 · en TOM motivering tystar inte längre ett verkligt påstående', () => {
    // «pastaende-ok: ja» släppte förr igenom vad som helst. Undantaget finns kvar — men det ska
    // KOSTA en mening, och skalet skriver ut varje undantag så att en granskare ser dem.
    const utan = granskaDiff(diffMed('lib/x.js', ['// grinden är fail-closed. // pastaende-ok: ja']));
    assert.equal(utan.length, 1, 'en motivering utan innehåll är ingen motivering');
    const med = granskaDiff(diffMed('lib/x.js',
      ['// grinden är fail-closed. // pastaende-ok: citerar ett fällt påstående']));
    assert.deepEqual(med, [], 'MOTPROVET — en riktig motivering ska fortfarande bära');
  });

  test('PV-12 · utskrifter och feltexter ÄR påståenden — en tilldelning är det inte', () => {
    // «✓ routad och skyddad» stod i en console.log i en sond, och var ett av granskningens fynd.
    // Det är den text grundaren faktiskt läser som ett resultat.
    assert.equal(domRad('  console.log("klar — fail-closed");').brott, true, 'utskrift');
    assert.equal(domRad('  throw new Error("fail-closed");').brott, true, 'feltext');
    assert.equal(domRad('  const x = 1; // grinden är fail-closed').brott, true, 'efterställd kommentar');
    // MOTPROVEN: data är ingen utsaga, och ett snedstreck i en URL är ingen kommentar.
    assert.equal(domRad("  const läge = 'fail-closed';").brott, false, 'tilldelning är data');
    assert.equal(domRad('  const u = "https://x.se//fail-closed";').brott, false, 'URL är ingen kommentar');
    assert.deepEqual(pastaendetext('  const x = 1;'), [], 'en ren kodrad bär ingen utsaga');
  });

  test('PV-13 · ordlistan fångar nu fem av obduktionens åtta — och tre står kvar, uttalat', () => {
    // Fable matade obduktionens EGNA falska påståenden genom vakten: sex av åtta passerade.
    // Ordlistan var vald ur de fel jag redan sett. Nu fälls fem; de tre kvarvarande saknar varje
    // påståendeord och kan bara fångas av en granskare (Bevisplikten p.1).
    const falls = [
      '// rubriken läser alltid mätaren innan den väljer gren',
      '// kolumnen självläker vid skrivning, så den finns alltid när vi läser',
      '// balanced: true — kontrollen är utförd',
      '// samma gränssnitt som FileStore',
      '// grinden är fail-closed',
    ];
    for (const r of falls) assert.equal(domRad(r).brott, true, `borde fällas: ${r}`);

    // DE TRE SOM STÅR KVAR. Testet låser att vi VET om dem — inte att de är okej.
    const passerar = [
      '// i öre är aritmetiken exakt — då räcker en öresavrundning per rad',  // ordföljd
      '// rör aldrig annualImpact — fakta ur analysen',                        // «aldrig»: 25 träffar
      '// utan prorata-rader',                                                 // helt utan påståendeord
    ];
    for (const r of passerar) assert.equal(domRad(r).brott, false, `deklarerad blindfläck: ${r}`);

    // Och varför ordlistan inte får växa mer: mätt 2026-09-02 gav «exakt» ensamt 16 träffar på
    // 40 commits, «aldrig» 25. Ett ord i den klassen fäller rätt beteende och stänger av vakten.
    for (const ord of ['exakt', 'aldrig', 'alltid']) {
      assert.ok(!PASTAENDEORD.includes(ord), `«${ord}» är för vanligt och skulle stänga av vakten`);
    }
  });

  test('PV-15 · varje tystat påstående skrivs ut — ett tyst undantag granskas av ingen', () => {
    const rader = motiveradeRader(diffMed('lib/x.js', [
      '// grinden är fail-closed. // pastaende-ok: citerar ett fällt påstående',
      '// en helt vanlig kommentar',
    ]));
    assert.equal(rader.length, 1, 'bara rader där motiveringen faktiskt tystade ett påstående');
    // MOTPROVET: en rad som bär «pastaende-ok:» utan att tysta något är brus, inte ett undantag.
    // Utan denna gren rapporterade listan vaktens egen regexdefinition som ett tystat påstående.
    assert.deepEqual(motiveradeRader(diffMed('lib/y.js',
      ['const M = /pastaende-ok:/;  // pastaende-ok: definitionen är ingen tystning'])), []);
    assert.equal(rader[0].fil, 'lib/x.js');
    assert.match(rader[0].skal, /citerar ett fällt påstående/,
      'skälet ska nå utskriften — annars kan granskaren inte bedöma undantaget');
  });

  test('PV-14 · test-ID med fler än två siffror räknas (CR-88412, IT-8821 finns i sviten)', () => {
    assert.deepEqual(granskaDiff(diffMed('lib/x.js', ['// fail-closed enligt CR-88412.'])), []);
    assert.deepEqual(citeradeTestId(diffMed('lib/x.js', ['// fail-closed enligt CR-88412.'])), ['CR-88412']);
  });
});

describe('CK · Commit-kravet: syskonfallet och sabotaget redovisas', () => {
  const kodDiff = 'diff --git a/lib/x.js b/lib/x.js\n--- a/lib/x.js\n+++ b/lib/x.js\n@@ -1,0 +2,1 @@\n+  return null;\n';
  const komDiff = 'diff --git a/lib/x.js b/lib/x.js\n--- a/lib/x.js\n+++ b/lib/x.js\n@@ -1,0 +2,1 @@\n+  // bara en kommentar\n';

  test('CK-01 · beteendeändring utan rubriker fälls', () => {
    const { ok, brister } = granskaCommit('Fixar en bugg i liggaren', kodDiff);
    assert.equal(ok, false);
    assert.equal(brister.length, 2, 'både syskonfallet och sabotaget saknas');
  });

  test('CK-02 · MOTPROVET — med båda rubrikerna passerar den', () => {
    const msg = 'Fixar liggaren\n\nSyskonfall: findBySigningDocId, samma läsväg\nSabotage som fällde: list() ger poster igen → 1 test föll\n';
    assert.equal(granskaCommit(msg, kodDiff).ok, true);
  });

  test('CK-03 · ett sabotage UTAN TAL är ingen prövning', () => {
    // Två av Opus egna sabotage var no-ops: ersättningen matchade ingenting, sviten förblev
    // grön, och det gröna betydde «jag testade inte». Talet är hela poängen.
    const msg = 'Fixar liggaren\n\nSyskonfall: inga\nSabotage som fällde: jag saboterade grinden och den höll\n';
    const { ok, brister } = granskaCommit(msg, kodDiff);
    assert.equal(ok, false);
    assert.match(brister.join(' '), /TAL/);
  });

  test('CK-04 · en ren kommentarändring kräver inget sabotage', () => {
    // En vakt som kräver ett sabotage för en rättstavning kringgås med --no-verify, och då är
    // den sämre än ingen vakt.
    assert.equal(arBeteendeandring(komDiff), false);
    assert.equal(granskaCommit('Rättar en stavning', komDiff).ok, true);
  });

  test('CK-06 · agents/ räknas — landminan 30 aug bodde där', () => {
    // Orkestratorns FileStore-default var en beteendeändring i agents/orchestrator/orchestrator.js.
    // Bevisplikten p.1 nämner agents/; p.3:s maskinvakt gjorde det inte. (Fable 5.1:s F7.)
    const agentDiff = 'diff --git a/agents/orchestrator/o.js b/agents/orchestrator/o.js\n--- a/agents/orchestrator/o.js\n+++ b/agents/orchestrator/o.js\n@@ -1,0 +2,1 @@\n+  this.store = new FileStore();\n';
    assert.equal(arBeteendeandring(agentDiff), true);
    assert.equal(granskaCommit('byter default', agentDiff).ok, false);
    assert.ok(KRAVDA_KATALOGER.test('agents/x.js') && !KRAVDA_KATALOGER.test('src/x.js'));
  });

  test('CK-07 · ATT TA BORT EN GRIND är sabotagets egen form — och den var osynlig', () => {
    // Första versionen läste bara `+`-rader. En commit som RADERAR `if (!secret) return false;`
    // hade noll tillagda kodrader och slapp varje rubrik. Det allvarligaste av Fables sju fynd.
    const del = 'diff --git a/lib/x.js b/lib/x.js\n--- a/lib/x.js\n+++ b/lib/x.js\n@@ -5,1 +5,0 @@\n-  if (!secret) return false;\n';
    assert.equal(arBeteendeandring(del), true, 'en raderad kodrad är en beteendeändring');
    assert.equal(granskaCommit('tar bort grinden', del).ok, false);
    // MOTPROVET: filhuvudet «--- a/…» börjar också med bindestreck och får inte räknas som kod.
    const baraKomm = 'diff --git a/lib/x.js b/lib/x.js\n--- a/lib/x.js\n+++ b/lib/x.js\n@@ -5,1 +5,0 @@\n-  // en kommentar\n';
    assert.equal(arBeteendeandring(baraKomm), false, 'en raderad kommentar är ingen beteendeändring');
  });

  test('CK-08 · NOLL är precis det tal som bevisar att sabotaget var en no-op', () => {
    const med = (t) => granskaCommit(`m\n\nSyskonfall: x\nSabotage som fällde: ${t}`, kodDiff).ok;
    assert.equal(med('X → 0 tester föll'), false, 'noll fällda tester är ingen prövning');
    assert.equal(med('kördes 2026-09-01'), false, 'ett årtal är inget testtal');
    assert.equal(med('X → 3 tester föll'), true, 'MOTPROVET');
    assert.equal(med('A → 1 test föll'), true, 'singular räknas');
  });

  test('CK-05 · kataloger utanför lib/, api/ och agents/ kräver inga rubriker', () => {
    const srcDiff = 'diff --git a/src/a.js b/src/a.js\n--- a/src/a.js\n+++ b/src/a.js\n@@ -1,0 +2,1 @@\n+  return 1;\n';
    assert.equal(arBeteendeandring(srcDiff), false, 'bred vakt = avstängd vakt · src/ står utanför');
    assert.equal(granskaCommit('Ändrar en yta', srcDiff).ok, true);
  });
});
