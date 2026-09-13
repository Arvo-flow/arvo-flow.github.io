#!/usr/bin/env node
// scripts/scopvakt.mjs — kod som KASTAR innan den hinner göra något ska fällas före deploy.
//
// ══ VARFÖR (2026-09-06, utökad 2026-09-13) ══════════════════════════════════════════════════
//
// 6 september: jag flyttade kategorifrysningen ut ur `if (!isBypass) { … }` och skrev `kv` — men
// `const kv` deklareras INNE i det blocket. `ReferenceError: kv is not defined` i produktion, och
// grundaren fick det som felmeddelande i kundytan. Ingen av 2 136 tester kunde se det: sviten
// anropar aldrig `handler(req, res)`.
//
// 10 september: samma familj i FRONTEND. En härledning lades åttio rader före sina beroenden i
// `src/pages/Portfolio/index.js` → «Cannot access 'Xe' before initialization», 0 tecken renderade,
// vitt rum. Vakten fanns för exakt den felklassen — **men hade aldrig fått rummets katalog.**
// Den skulden stod namngiven i f49c577 och stängs här.
//
// ── TVÅ TÄNDER, OCH DE MÄTER OLIKA SAKER ────────────────────────────────────────────────────
//  1. `no-undef`  — en identifierare som inte finns i något scope. Fällde 6-septemberfallet.
//  2. TDZ         — en `let`/`const`/`class` som LÄSES före sin deklaration i SAMMA
//                   funktionsscope (`lib/tdz.js`). Fällde 10-septemberfallet.
//
// ── VARFÖR TDZ-TANDEN ÄR SMALARE ÄN `no-use-before-define`, och varför det är hela poängen ───
// Den gamla modulen förkastade `no-use-before-define` på en MÄTNING: den fällde sex träffar i
// fungerande kod (module-scope-konstanter lästa inuti funktioner som anropas långt efter
// modulladdning). «En vakt som fäller korrekt befintlig kod kringgås med --no-verify på sin
// första dag.» Den bedömningen stod sig — regeln är fortfarande fel verktyg.
//
// Rätt drag var inte att sänka kravet utan att MÄTA VILKA. Ommätt 2026-09-13 över 297 filer:
// **0 farliga, 15 säkra.** Alltså behövdes varken en städrunda i fungerande kod eller en fryst
// baslinje — grinden är ren från dag ett, och en ren grind kan ingen argumentera bort.
// (Bibeln, 22 augusti: *mät aldrig bara HUR OFTA en vakt fäller — fråga alltid VILKA, och läs dem.*)
//
// ── VAD `src/` KOSTAR, MÄTT FÖRE DEN SLOGS PÅ ───────────────────────────────────────────────
// `no-undef` mot `src/` gav först 10 träffar. Sex var brus: `--no-eslintrc` känner inte
// `react-hooks/exhaustive-deps`, så filernas egna `eslint-disable`-kommentarer blev fel om en
// regel som inte finns. Fyra var `process`, som CRA byter ut vid bygget och som alltså finns.
// Med inline-konfig AV och `process` deklarerad: **0 träffar.** Inga rättningar behövdes.
// Priset för `allowInlineConfig: false` sägs rakt ut: en rad kan inte tystas med en kommentar.
// Det är avsiktligt för en vakt mot kod som kastar — men det betyder att en framtida legitim
// avvikelse måste lösas i koden, inte med en disable-rad.
//
// EN SOND SOM INTE KOM FRAM ÄR INGET MÄTVÄRDE (SV-01..11): kraschar ESLint, hittar vi noll filer,
// eller går en fil inte att parsa — då är utfallet «kunde inte köras», aldrig «rent».

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ESLint } from 'eslint';
import { klassaTdz } from '../lib/tdz.js';

const ROT = process.cwd();

// Två miljöer, för de är olika maskiner. `src/` kör i en webbläsare (window, document, fetch) och
// får `process` deklarerad eftersom CRA byter ut `process.env` vid bygget. Backend kör i Node.
const OMRADEN = [
  { namn: 'src', monster: ['src/**/*.js'], env: { browser: true, es2022: true }, globals: { process: 'readonly' } },
  { namn: 'api/lib/agents', monster: ['api/**/*.mjs', 'lib/**/*.js', 'agents/**/*.js'], env: { node: true, es2022: true }, globals: {} },
];

// TDZ-tanden läser ALLA fyra katalogerna med samma parser — scopefrågan är miljöoberoende.
const TDZ_KATALOGER = ['src', 'api', 'lib', 'agents'];
const TDZ_ANDELSER = ['.js', '.mjs', '.jsx'];

function filer(katalog) {
  const ut = [];
  const ga = (d) => {
    let poster;
    try { poster = readdirSync(d); } catch { return; }
    for (const namn of poster) {
      if (namn.startsWith('.') || namn === 'node_modules') continue;
      const p = join(d, namn);
      if (statSync(p).isDirectory()) ga(p);
      else if (TDZ_ANDELSER.some((a) => namn.endsWith(a))) ut.push(p);
    }
  };
  ga(join(ROT, katalog));
  return ut;
}

// ── TOMHETSSPÄRREN, FÖRST AV ALLT ────────────────────────────────────────────────────────────
// En vakt som råkar skanna noll filer blir grön av tomhet precis när den behövs som mest.
//
// ⚠️ SPÄRREN LÅG FÖRST SIST I FILEN, OCH DÅ FÄLLDE DESS SABOTAGE NOLL TESTER. ESLint kastar
// själv på ett mönster som inte matchar något, så borttagen spärr gav ändå exit 1 — den yttre
// kontrollen gjorde den inre OMÖJLIG ATT OBSERVERA (bibeln 10 september: «ett skydd bakom ett
// annat skydd är inte två lager — det är ett»). Räkningen sker därför FÖRE ESLint, och är den
// enda tanden på den här frågan. ESLints egen kastning står kvar som beteende, inte som lager.
const tdzFilerLista = TDZ_KATALOGER.flatMap((k) => filer(k));
if (tdzFilerLista.length < 200) {
  console.error(`✗ Scopvakten hittade ${tdzFilerLista.length} filer att skanna — mätt 2026-09-13: 298.`);
  console.error('  En vakt som plötsligt ser färre filer är grön av tomhet, inte av renhet.');
  console.error('  Detta är INTE ett godkännande.');
  process.exit(1);
}

// ── TAND 1 · no-undef ────────────────────────────────────────────────────────────────────────
const undefTraffar = [];
let lintadeFiler = 0;
for (const omrade of OMRADEN) {
  const eslint = new ESLint({
    useEslintrc: false,
    allowInlineConfig: false,     // en rad som kastar får inte tystas med en kommentar
    overrideConfig: {
      parserOptions: { ecmaVersion: 2022, sourceType: 'module', ecmaFeatures: { jsx: true } },
      env: omrade.env,
      globals: omrade.globals,
      rules: { 'no-undef': 'error' },
    },
  });
  let resultat;
  try {
    resultat = await eslint.lintFiles(omrade.monster);
  } catch (err) {
    console.error(`✗ Scopvakten kunde inte köras mot ${omrade.namn}: ${err.message}`);
    console.error('  Detta är INTE ett godkännande.');
    process.exit(1);
  }
  lintadeFiler += resultat.length;
  for (const fil of resultat) {
    for (const m of fil.messages) {
      undefTraffar.push(`${relative(ROT, fil.filePath)}:${m.line}  ${m.message}`);
    }
  }
}

// ── TAND 2 · TDZ i samma funktionsscope ──────────────────────────────────────────────────────
const farliga = [];
const oparsade = [];
for (const fil of tdzFilerLista) {
  try {
    farliga.push(...klassaTdz(readFileSync(fil, 'utf8'), relative(ROT, fil)).farliga);
  } catch (err) {
    oparsade.push(`${relative(ROT, fil)} — ${err.message.split('\n')[0]}`);
  }
}

// ESLints egen filräkning rapporteras men bär INGEN egen tand — mätt 2026-09-13: 278 filer.
// Skulle mönstren sluta matcha kastar ESLint själv (fångat ovan), och en andra spärr här hade
// bara sett ut som ett lager utan att vara ett. Det står utskrivet i stället för att antydas.
if (lintadeFiler < 200) console.error(`⚠ ESLint såg ${lintadeFiler} filer — mätt: 278.`);

// ── UTFALL ───────────────────────────────────────────────────────────────────────────────────
if (oparsade.length) {
  console.error('\n✗ SCOPVAKTEN — filer som inte gick att parsa (detta är INTE «inga fel»):\n');
  for (const rad of oparsade) console.error(`    ${rad}`);
  process.exit(1);
}

if (undefTraffar.length || farliga.length) {
  console.error('\n✗ SCOPVAKTEN — kod som kastar innan den hinner göra något:\n');
  for (const rad of undefTraffar) console.error(`    ${rad}`);
  for (const p of farliga) {
    console.error(`    ${p.fil}:${p.rad}  «${p.namn}» läses före sin deklaration på rad ${p.deklRad} (samma funktionsscope → TDZ)`);
  }
  console.error('\n  Det här kastar i RUNTIME, före all logik. I backend når det kunden som ett rått');
  console.error('  felmeddelande; i frontend som en VIT SKÄRM. Sviten kan inte se någotdera: den');
  console.error('  anropar aldrig handler(req, res) och renderar aldrig en komponent.\n');
  process.exit(1);
}

console.log(`\n✓ Scopvakten — inga odefinierade identifierare och ingen TDZ i src/, api/, lib/, agents/ (${tdzFilerLista.length} filer)`);
