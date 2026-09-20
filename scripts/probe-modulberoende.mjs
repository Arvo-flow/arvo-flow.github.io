#!/usr/bin/env node
// scripts/probe-modulberoende.mjs — HAR MODULEN ÖVERHUVUDTAGET EN PRODUKTIONSKONSUMENT?
//
// ══ VARFÖR (grundarorder 2026-09-20) ═══════════════════════════════════════════════════════
// `probe-dodbevis.mjs` svarar på frågan «importerar någon produktionsmodul det här NAMNET?».
// Svaret «nej» betyder två helt olika saker, och de kräver motsatta åtgärder:
//
//   · Modulen ÄR inkopplad via sina andra exporter → namnet är en INTERN hjälpare som
//     exporterats för att ett test ska nå den. Den ska inte raderas (koden körs), och frågan
//     är bara om exporten borde bli privat.
//   · Modulen har INGEN produktionskonsument alls → hela modulen är isolerad. Då är frågan
//     «radera eller koppla in», och den kan inte besvaras av exportens namn.
//
// Att blanda ihop de två är precis den felform bibeln kallar «ett grönt som betyder jag tittade
// inte»: båda ser identiska ut i en textsökning.
//
// ══ MÄTNINGEN ══════════════════════════════════════════════════════════════════════════════
// Ingen textsökning. Modulfilen DÖPS OM, varefter varje produktionsfil (lib/ api/ agents/)
// försöker laddas. En statisk import av en fil som inte finns är ett laddningsfel, alltså namnger
// felen exakt vilka produktionsfiler som var beroende av modulen. Filen döps tillbaka.
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
// Körs först mot `lib/benchmark.js` (måste ge BEROENDE — den är produktionens prisbok) och mot
// en nyskapad tom modul som ingen importerar (måste ge ISOLERAD). Svarar instrumentet inte åt
// båda håll döms ingen modul.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// `src/` laddas inte av bare node (React-filer importerar CSS och bilder), så en modul som BARA
// används av frontend rapporteras som ISOLERAD. Därför skrivs varje träff i `src/` ut separat
// som en TEXTOBSERVATION, uttryckligen märkt som svagare bevis. Dynamisk import via beräknad
// sträng syns inte heller.

import { readdirSync, readFileSync, renameSync, writeFileSync, unlinkSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROT = process.cwd();

function allaFiler(dir, ut = []) {
  for (const namn of readdirSync(dir)) {
    if (['node_modules', 'build', '.git', 'results', 'test-pdfs', 'coverage'].includes(namn)) continue;
    const p = join(dir, namn);
    if (statSync(p).isDirectory()) allaFiler(p, ut);
    else if (['.js', '.mjs', '.jsx'].includes(extname(namn))) ut.push(relative(ROT, p));
  }
  return ut;
}
const ALLA = allaFiler(ROT);
const PRODUKTION = ALLA.filter((f) => /^(lib|api|agents)\//.test(f));
const SRC = ALLA.filter((f) => /^src\//.test(f));

function ladda(filer) {
  const skript = `
    // En modul i agents/ kör en eval-svit på import och anropar process.exit(1) när
    // ANTHROPIC_API_KEY saknas — då dör HELA mätningen och baslinjen blir oläsbar. Ett avslut
    // görs om till ett kastat fel: filen räknas som otrasig i BÅDA körningarna, alltså påverkar
    // den inte diffen. (Mätt 2026-09-20: baslinjen dog på rad ett innan den här raden fanns.)
    process.exit = (k) => { throw new Error('process.exit(' + k + ') fångat'); };
    const filer = ${JSON.stringify(filer)};
    const trasiga = [];
    for (const f of filer) {
      try { await import('./' + f); }
      catch (e) { trasiga.push(f); }
    }
    console.log('###' + JSON.stringify(trasiga));
  `;
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', skript],
    { cwd: ROT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 180000 });
  const rad = (r.stdout ?? '').split('\n').find((l) => l.startsWith('###'));
  if (!rad) {
    console.error(`  [ladda] inget svar · exit=${r.status} · signal=${r.signal}`
      + ` · stderr=${JSON.stringify(String(r.stderr ?? '').slice(0, 200))}`);
    return null;
  }
  try { return JSON.parse(rad.slice(3)); } catch { return null; }
}

const BASLINJE = ladda(PRODUKTION);
if (BASLINJE === null) { console.error('✗ baslinjen gick inte att läsa'); process.exit(1); }

/** Döper om modulen, mäter vilka produktionsfiler som slutar ladda, döper tillbaka. */
function provaModul(modul) {
  const p = join(ROT, modul);
  const gomd = `${p}.__gomd__`;
  const urval = PRODUKTION.filter((f) => f !== modul);
  renameSync(p, gomd);
  let efter;
  try { efter = ladda(urval); } finally { renameSync(gomd, p); }
  if (efter === null) return { dom: 'EJ PRÖVBAR', beroende: [] };
  const bas = new Set(BASLINJE);
  const beroende = efter.filter((f) => !bas.has(f));
  return { dom: beroende.length ? 'BEROENDE' : 'ISOLERAD', beroende };
}

/** Svagare bevis, uttryckligen märkt: nämner någon fil i src/ modulens filnamn? */
function srcObservation(modul) {
  const bas = modul.split('/').pop().replace(/\.(m?js)$/, '');
  const rx = new RegExp(bas.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return SRC.filter((f) => rx.test(readFileSync(join(ROT, f), 'utf8')));
}

// ── MOTPROVEN ───────────────────────────────────────────────────────────────────────────────
const TOM = 'lib/__motprov-isolerad.js';
if (existsSync(join(ROT, TOM))) { console.error(`✗ ${TOM} finns redan`); process.exit(1); }
writeFileSync(join(ROT, TOM), 'export const ingen = 1;\n');
let mpB, mpI;
try {
  mpB = provaModul('lib/benchmark.js');
  mpI = provaModul(TOM);
} finally { unlinkSync(join(ROT, TOM)); }

console.log('\n═══ MODULBEROENDE · experimentet prövas först ═══\n');
console.log(`  MOTPROV BEROENDE (lib/benchmark.js) → ${mpB.dom}  ${mpB.dom === 'BEROENDE' ? '✓' : '✗'}`
  + (mpB.beroende.length ? `  (${mpB.beroende.length} filer)` : ''));
console.log(`  MOTPROV ISOLERAD (tom modul)        → ${mpI.dom}  ${mpI.dom === 'ISOLERAD' ? '✓' : '✗'}`);
if (mpB.dom !== 'BEROENDE' || mpI.dom !== 'ISOLERAD') {
  console.error('\n✗ HARNESSET KAN INTE SVARA ÅT BÅDA HÅLL — ingen modul döms.');
  process.exit(1);
}

const moduler = process.argv.slice(2);
if (moduler.length === 0) { console.error('\nAnvändning: probe-modulberoende.mjs <lib/fil.js> ...'); process.exit(1); }

console.log(`\n  ${moduler.length} modul(er) prövas.\n`);
for (const m of moduler) {
  const r = provaModul(m);
  const src = srcObservation(m);
  console.log(`  ${r.dom.padEnd(11)} ${m}`
    + (r.beroende.length ? `\n      produktionsberoende: ${r.beroende.join(', ')}` : '')
    + (src.length ? `\n      src/-textträff (SVAGARE BEVIS, ej laddad): ${src.join(', ')}` : ''));
}
console.log('\n[probe-modulberoende] klar\n');
