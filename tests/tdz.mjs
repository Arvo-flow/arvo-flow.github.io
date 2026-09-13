// tests/tdz.mjs — TDZ-01..09 · skilj den TDZ som kastar från den som aldrig gör det.
//
// ══ VARFÖR (2026-09-13) ═════════════════════════════════════════════════════════════════════
// 10 september sänktes produktionen av en rad som låg åttio rader före sina beroenden i
// `src/pages/Portfolio/index.js`: «Cannot access 'Xe' before initialization», 0 tecken renderade.
// Scopvakten fanns för exakt den felklassen men skannade inte `src/`, och körde dessutom bara
// `no-undef` — en TDZ är inte en odefinierad identifierare.
//
// Den uppenbara lagningen, `no-use-before-define`, var mätt FEL redan 6 september: den fäller
// fungerande kod (konstanter lästa inuti funktioner som anropas efter modulladdning), och en vakt
// som fäller rätt beteende blir avstängd. `klassaTdz` skiljer de två på SCOPE i stället för på
// position, och TDZ-04 är motprovet: den återinför produktionsbuggens FORM och kräver att den faller.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en läsning av en let/const/class som står före sin deklaration i SAMMA funktionsscope.
//   BLIND: den ser scope och position, aldrig ANROPSORDNING. `f(); function f(){ return A; }
//     const A = 1;` är verklig TDZ och klassas ändå som säker — referensen bor i en inre funktion,
//     och sonden kan inte veta när den anropas. TDZ-07 låser den blindfläcken som ETT KÄNT UTFALL,
//     så att nästa läsare inte tror att den är täckt.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { klassaTdz } from '../lib/tdz.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('TDZ · scopvaktens andra tand', () => {
  test('TDZ-01 · rak kod i samma scope som läser före deklarationen är FARLIG', () => {
    const { farliga, sakra } = klassaTdz('const b = a + 1;\nconst a = 2;\n', 'p.js');
    assert.equal(farliga.length, 1, 'läsningen körs före initieringen — det kastar varje gång');
    assert.equal(farliga[0].namn, 'a');
    assert.equal(farliga[0].rad, 1);
    assert.equal(farliga[0].deklRad, 2);
    assert.equal(sakra.length, 0);
  });

  test('TDZ-02 · en konstant läst i en INRE funktion är SÄKER (motprovet mot no-use-before-define)', () => {
    // Det är det här mönstret som gjorde `no-use-before-define` obrukbar: sex träffar i korrekt
    // kod 6 september, femton när `src/` togs med. Fälls det här är vakten värdelös på dag ett.
    const { farliga, sakra } = klassaTdz('function f() { return A; }\nconst A = 1;\n', 'p.js');
    assert.equal(farliga.length, 0, 'kroppen körs när f() anropas — alltså efter modulladdning');
    assert.equal(sakra.length, 1);
  });

  test('TDZ-03 · ett block INUTI samma funktion är fortfarande farligt', () => {
    // Blockscope flyttar inte exekveringen. `if`-grenen körs före raden under den.
    const { farliga } = klassaTdz('function f() {\n  if (x) { use(A); }\n  const A = 1;\n}\n', 'p.js');
    assert.equal(farliga.length, 1);
    assert.equal(farliga[0].namn, 'A');
  });

  test('TDZ-04 · MOTPROVET — produktionsbuggens egen form faller', () => {
    // 10 september, ordagrant: härledningen lades bredvid `standing`, men `acting` och
    // `hasSwitchAction` deklareras av `computeActing` långt nedanför. Två referenser, båda farliga.
    const kod = [
      'export default function Portfolio() {',
      '  const standing = marketStanding(score);',
      '  const domLage  = domensLage({ acting, hasSwitchAction, standing });',
      '  const { acting, hasSwitchAction } = computeActing(suppliers);',
      '  return domLage;',
      '}',
    ].join('\n');
    const { farliga } = klassaTdz(kod, 'Portfolio.js');
    assert.equal(farliga.length, 2, 'både acting och hasSwitchAction läses före sin deklaration');
    assert.deepEqual(farliga.map((p) => p.namn).sort(), ['acting', 'hasSwitchAction']);
  });

  test('TDZ-05 · `var` hissas och är aldrig TDZ', () => {
    const { farliga, sakra } = klassaTdz('function f() {\n  const b = a;\n  var a = 1;\n  return b;\n}\n', 'p.js');
    assert.equal(farliga.length, 0, 'var är undefined, inte otillgänglig — det är ett annat fel');
    assert.equal(sakra.length, 0);
  });

  test('TDZ-06 · en klass läst före sin deklaration i samma scope är farlig', () => {
    const { farliga } = klassaTdz('const x = new A();\nclass A {}\n', 'p.js');
    assert.equal(farliga.length, 1);
    assert.equal(farliga[0].namn, 'A');
  });

  test('TDZ-07 · KÄND BLINDFLÄCK: en funktion som ANROPAS före sin konstant klassas som säker', () => {
    // Detta ÄR verklig TDZ i körning — men referensen bor i en inre funktion, och scope säger
    // ingenting om anropsordning. Testet finns för att låsa fast att utfallet är känt och valt,
    // inte för att det är önskvärt. En vakt utan blindfläck existerar inte; en odeklarerad är felet.
    const { farliga, sakra } = klassaTdz('function f() { return A; }\nf();\nconst A = 1;\n', 'p.js');
    assert.equal(farliga.length, 0, 'blindfläcken är deklarerad i lib/tdz.js — ändra inte utfallet utan att ändra texten');
    assert.equal(sakra.length, 1);
  });

  test('TDZ-08 · en shebang sänker inte parsningen (en oparsad fil är en blindfläck)', () => {
    const { farliga } = klassaTdz('#!/usr/bin/env node\nconst b = a;\nconst a = 1;\n', 'cli.js');
    assert.equal(farliga.length, 1, 'raden kommenteras bort med samma längd så varje radnummer står kvar');
    assert.equal(farliga[0].rad, 2);
  });

  test('TDZ-09 · scopvakten läser src/ OCH backend, och kan inte tystas med en kommentar', () => {
    // Källtextankare, uttalat som sådant. Beteendet ovan är prövat; den här raden låser bara att
    // vakten inte tyst slutar titta på kundytan — vilket var hela orsaken 10 september.
    //
    // ⚠️ KOMMENTARERNA STRIPPAS, OCH DET ÄR INTE KOSMETIK. Första versionen läste hela filen, och
    // sabotaget «allowInlineConfig: false → true» fällde NOLL: modulhuvudet CITERAR frasen i sin
    // förklaring (rad 37), så testet var grönt på PROSAN medan koden på rad 84 var sönder. Samma
    // form som liggarvakten som fällde sin egen dokumentation, spegelvänd — och exakt den sjukdom
    // hela sviten finns mot. Bara sabotaget avslöjade det.
    const raKod = readFileSync(join(ROT, 'scripts/scopvakt.mjs'), 'utf8');
    const kod = raKod.split('\n').filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r)).join('\n');
    // Motprov mot att strippningen tar för mycket: kvarvarande kod måste vara substantiell.
    assert.ok(kod.length > 1500, `efter strippning återstod ${kod.length} tecken — ett tomt utsnitt är grönt av tomhet`);

    assert.ok(kod.includes("'src/**/*.js'"), 'src/ måste skannas — en vakt mot kod som kastar hör hemma på kundytan');
    assert.ok(/TDZ_KATALOGER\s*=\s*\['src'/.test(kod), 'TDZ-passet måste börja i src/');
    assert.ok(/allowInlineConfig:\s*false\s*,/.test(kod), 'en rad som kastar får inte tystas med en kommentar');
    assert.ok(kod.includes('klassaTdz'), 'scopvakten måste använda den prövade klassaren, aldrig en egen kopia');
    assert.ok(/tdzFilerLista\.length\s*<\s*200/.test(kod),
      'tomhetsspärren måste stå FÖRE ESLint — bakom ESLints egen kastning är den omöjlig att observera');
  });
});
