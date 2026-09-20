#!/usr/bin/env node
// scripts/probe-internanvandning.mjs — ANROPAS DEKLARATIONEN AV SIN EGEN MODUL?
//
// ══ VARFÖR (grundarorder 2026-09-20) ═══════════════════════════════════════════════════════
// En export utan produktionsimportör i en modul som ÄR inkopplad betyder ett av två ting:
//   · deklarationen anropas inuti modulen och är exporterad bara för att ett test ska nå den
//     (kod som KÖRS i produktion — radering vore ett verkligt beteendetapp), eller
//   · deklarationen anropas av ingen alls och lever enbart för sitt eget test.
// Skillnaden avgör radera kontra avexportera, och den går inte att läsa ur exportens namn.
//
// Frågan ställdes en gång med en shell-enradare 20 september. Den svarade «noll interna
// referenser» för elva poster och var FALSK för två av dem (`MAX_REVEAL_ROWS`, `decodeEntities`);
// det var sviten som fällde påståendet, inte instrumentet. Därför ställs frågan nu av en parser.
//
// ══ MÄTNINGEN ══════════════════════════════════════════════════════════════════════════════
// Ingen textsökning och ingen klammermatchning (att RADERA en deklaration krävde det, och en
// felmatchad klammer sänkte `lib/fraktjakt.js` samma dag). Deklarationen DÖPS OM på sitt enda
// deklarationsställe, varefter ESLint `no-undef` körs på filen. Varje kvarvarande förekomst av
// det gamla namnet blir en odefinierad identifierare — alltså namnger parsern de interna
// anropen, rad för rad. Filen återställs alltid.
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
//   · KÄNT INTERN   — `lib/business-intel.js:decodeEntities` (mätt 20 sep: dess radering fällde
//     6 tester). Måste ge INTERN.
//   · KÄNT EJ INTERN — en deklaration sonden själv skriver in i samma fil och som ingen anropar.
//     Måste ge EJ INTERN. Samma fil, samma körning, motsatta svar.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// `no-undef` ser statiska namnreferenser. Den ser inte `mod['namn']`, `eval`, eller ett namn som
// bara står i en sträng. Den säger heller ingenting om huruvida den interna anroparen i sin tur
// nås från produktion — det är modulberoendefrågan, och den ställs av probe-modulberoende.mjs.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ESLint } from 'eslint';

const ROT = process.cwd();
const SUFFIX = '__OMDOPT_AV_SONDEN__';

const eslint = new ESLint({
  useEslintrc: false, allowInlineConfig: false,
  overrideConfig: {
    parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
    env: { node: true, es2022: true },
    rules: { 'no-undef': 'error' },
  },
});

function deklarationsRx(namn) {
  const n = namn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^(export\\s+)?((?:async\\s+)?(?:function|const|let|class)\\s+)${n}\\b`, 'm');
}

/** @returns {{dom:'INTERN'|'EJ INTERN'|'EJ PRÖVBAR', rader:number[], skal?:string}} */
async function provaIntern(modul, namn) {
  const p = join(ROT, modul);
  const orig = readFileSync(p, 'utf8');
  const rx = deklarationsRx(namn);
  if (!rx.test(orig)) return { dom: 'EJ PRÖVBAR', rader: [], skal: 'deklarationen matchade inte' };

  writeFileSync(p, orig.replace(rx, `$1$2${namn}${SUFFIX}`));
  let rader;
  try {
    const [res] = await eslint.lintFiles([p]);
    rader = res.messages.filter((m) => m.ruleId === 'no-undef' && m.message.includes(`'${namn}'`))
      .map((m) => m.line);
  } finally {
    writeFileSync(p, orig);
  }
  if (readFileSync(p, 'utf8') !== orig) return { dom: 'EJ PRÖVBAR', rader: [], skal: 'filen återställdes inte' };
  return { dom: rader.length ? 'INTERN' : 'EJ INTERN', rader };
}

// ── MOTPROVEN ───────────────────────────────────────────────────────────────────────────────
const MF = 'lib/business-intel.js';
const origMF = readFileSync(join(ROT, MF), 'utf8');
writeFileSync(join(ROT, MF), `${origMF}\nfunction __motprovIngenAnropar__() { return 1; }\n`);
let mpI, mpE;
try {
  mpI = await provaIntern(MF, 'decodeEntities');
  mpE = await provaIntern(MF, '__motprovIngenAnropar__');
} finally { writeFileSync(join(ROT, MF), origMF); }

console.log('\n═══ INTERNANVÄNDNING · experimentet prövas först ═══\n');
console.log(`  MOTPROV INTERN (decodeEntities)        → ${mpI.dom}  ${mpI.dom === 'INTERN' ? '✓' : '✗'}`
  + (mpI.rader.length ? `  rad ${mpI.rader.join(', ')}` : '') + (mpI.skal ? `  (${mpI.skal})` : ''));
console.log(`  MOTPROV EJ INTERN (nyskriven)          → ${mpE.dom}  ${mpE.dom === 'EJ INTERN' ? '✓' : '✗'}`
  + (mpE.skal ? `  (${mpE.skal})` : ''));
if (mpI.dom !== 'INTERN' || mpE.dom !== 'EJ INTERN') {
  console.error('\n✗ HARNESSET KAN INTE SVARA ÅT BÅDA HÅLL — ingen post döms.');
  process.exit(1);
}
if (readFileSync(join(ROT, MF), 'utf8') !== origMF) {
  console.error(`\n✗ ${MF} återställdes INTE — sonden vägrar fortsätta.`); process.exit(1);
}

const poster = process.argv.slice(2);
if (poster.length === 0) { console.error('\nAnvändning: probe-internanvandning.mjs <lib/fil.js>:<namn> ...'); process.exit(1); }

console.log(`\n  ${poster.length} post(er) prövas.\n`);
for (const post of poster) {
  const i = post.lastIndexOf(':');
  const modul = post.slice(0, i), namn = post.slice(i + 1);
  const r = await provaIntern(modul, namn);
  console.log(`  ${r.dom.padEnd(10)} ${modul}:${namn}`
    + (r.rader.length ? `  ← anropas på rad ${r.rader.join(', ')}` : '')
    + (r.skal ? `  (${r.skal})` : ''));
}
console.log('\n[probe-internanvandning] klar\n');
