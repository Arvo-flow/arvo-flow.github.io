// lib/tdz.js — SKILJ DEN TDZ SOM KASTAR FRÅN DEN SOM ALDRIG GÖR DET.
//
// ══ VARFÖR (2026-09-13) ═════════════════════════════════════════════════════════════════════
// Scopvakten (2026-09-06) körde medvetet BARA `no-undef`, och motiveringen var MÄTT:
// `no-use-before-define` fällde sex träffar i FUNGERANDE kod, alltså hade vakten kringgåtts med
// `--no-verify` på sin första dag (smyghöjningsvaktens läxa, 20 juli).
//
// Men den TDZ som sänkte produktionen 10 september var en ANNAN sak:
//
//     const domLage = domensLage({ acting, hasSwitchAction, standing });   // rad 578
//     …
//     const { acting, hasSwitchAction } = computeActing(…);                // rad 673
//
// → «Cannot access 'Xe' before initialization», 0 tecken renderade, vitt rum.
//
// De två ser identiska ut för ESLint och är motsatser i verkligheten. Skillnaden är MÄTBAR och
// bor i scopet:
//
//   FARLIG — referensen och deklarationen delar FUNKTIONSSCOPE, och referensen står före.
//            Raden körs då före initieringen. Varje gång. Det är ett kastande fel.
//   SÄKER  — referensen bor i en INRE funktion. Den kroppen körs när funktionen ANROPAS, vilket
//            är efter modulladdning. Det är standardmönstret för hjälpkonstanter.
//
// Mätt 2026-09-13 över 297 filer i `src/`, `api/`, `lib/`, `agents/`: **0 farliga, 15 säkra.**
// Därför behövdes varken en städrunda eller en fryst baslinje — grinden är ren från dag ett, och
// en grind som är ren kan ingen argumentera bort. Motprovet är körbart: återinförs raden ovan
// fäller den med två träffar (TDZ-04).
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en läsning av en `let`/`const`/`class`-binding som står textuellt före sin
//     deklaration OCH delar funktionsscope med den — hela den klass som gav vitt rum.
//   BLIND: den ser SCOPE och POSITION, aldrig anropsordning. En funktion som anropas före sin
//     egen `const` (t.ex. `f(); function f(){ return A; } const A = 1;`) är verklig TDZ och syns
//     INTE här — referensen bor i en inre funktion, och sonden kan inte veta när den anropas.
//     `var` hoppas över med flit: `var` hissas och har ingen TDZ. En oparsad fil räknas aldrig
//     som «noll träffar»; anroparen får listan och ska fälla på den.

import * as espree from 'espree';
import { analyze } from 'eslint-scope';

const PARSER = { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } };

/**
 * Klassa varje läsning som står FÖRE sin let/const/class-deklaration.
 *
 * @param {string} kod      källtexten
 * @param {string} filnamn  används bara i utfallet
 * @returns {{farliga: object[], sakra: object[]}}
 * @throws om filen inte går att parsa — anroparen MÅSTE fånga och redovisa det som oparsad
 */
export function klassaTdz(kod, filnamn = '<okänd>') {
  // En shebang sänkte sonden på `agents/test-invoice/cli.js`, och en OPARSAD fil är en blindfläck
  // snarare än ett mätvärde. Raden kommenteras bort med SAMMA längd, så varje range/loc står kvar.
  const kalla = kod.startsWith('#!') ? `//${kod.slice(2)}` : kod;
  const ast = espree.parse(kalla, { ...PARSER, range: true, loc: true });
  const scopeManager = analyze(ast, PARSER);
  const farliga = [];
  const sakra = [];

  const ga = (scope) => {
    for (const variabel of scope.variables) {
      const def = variabel.defs[0];
      if (!def?.name?.range) continue;
      const arKlass = def.type === 'ClassName';
      const sort = def.parent?.kind;
      if (!arKlass && sort !== 'let' && sort !== 'const') continue;   // `var` hissas — ingen TDZ
      const deklPos = def.name.range[0];
      for (const ref of variabel.references) {
        if (ref.identifier.range[0] >= deklPos) continue;             // står efter deklarationen
        if (ref.init) continue;                                       // är själva initieringen
        const post = {
          fil: filnamn,
          rad: ref.identifier.loc.start.line,
          namn: variabel.name,
          deklRad: def.name.loc.start.line,
        };
        // KÄRNAN. Delar referensen funktionsscope med deklarationen körs den FÖRE initieringen;
        // bor den i en inre funktion körs den när funktionen anropas, alltså efter.
        if (ref.from.variableScope === variabel.scope.variableScope) farliga.push(post);
        else sakra.push(post);
      }
    }
    for (const barn of scope.childScopes) ga(barn);
  };
  ga(scopeManager.globalScope);
  return { farliga, sakra };
}
