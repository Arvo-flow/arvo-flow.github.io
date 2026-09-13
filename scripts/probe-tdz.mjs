#!/usr/bin/env node
// scripts/probe-tdz.mjs — MÄT INNAN DU VÄLJER: hur många träffar är verklig TDZ?
//
// Sonden som avgjorde scopvaktens utformning 2026-09-13. Grundarens order löd «utför rättningarna
// eller frys baslinjen» — båda utgår från att det FINNS hål att stänga. Mätningen sa något annat:
//
//     FARLIGA 0 · SÄKRA 15 · OPARSADE 0     (297 filer i src, api, lib, agents)
//
// Alltså behövdes ingendera. Grinden kunde slås på ren. Domen bor i `lib/tdz.js` (så sviten kan
// köra den); sonden är rapporten, och den står kvar körbar — ett mätvärde utan sitt instrument
// är ett påstående.
//
// Kör: node scripts/probe-tdz.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { klassaTdz } from '../lib/tdz.js';

const ROT = process.cwd();
const KATALOGER = ['src', 'api', 'lib', 'agents'];
const ANDELSER = ['.js', '.mjs', '.jsx'];

function filer(katalog) {
  const ut = [];
  const ga = (d) => {
    let poster;
    try { poster = readdirSync(d); } catch { return; }
    for (const namn of poster) {
      if (namn.startsWith('.') || namn === 'node_modules') continue;
      const p = join(d, namn);
      if (statSync(p).isDirectory()) ga(p);
      else if (ANDELSER.some((a) => namn.endsWith(a))) ut.push(p);
    }
  };
  ga(join(ROT, katalog));
  return ut;
}

const alla = { farliga: [], sakra: [] };
const oparsade = [];
let raknade = 0;

for (const katalog of KATALOGER) {
  for (const fil of filer(katalog)) {
    raknade++;
    try {
      const { farliga, sakra } = klassaTdz(readFileSync(fil, 'utf8'), relative(ROT, fil));
      alla.farliga.push(...farliga);
      alla.sakra.push(...sakra);
    } catch (err) {
      oparsade.push({ fil: relative(ROT, fil), skal: err.message.split('\n')[0] });
    }
  }
}

if (raknade === 0) {
  console.error('✗ Sonden hittade noll filer — detta är INTE ett mätvärde.');
  process.exit(1);
}

console.log(`\n═══ TDZ-MÄTNING · ${raknade} filer i ${KATALOGER.join(', ')} ═══\n`);
console.log(`  FARLIGA (samma funktionsscope — kastar när raden nås):  ${alla.farliga.length}`);
console.log(`  SÄKRA   (inre funktion — körs efter modulladdning):     ${alla.sakra.length}`);
console.log(`  OPARSADE (räknas aldrig som «noll träffar»):            ${oparsade.length}\n`);

if (alla.farliga.length) {
  console.log('── FARLIGA ──');
  for (const p of alla.farliga) console.log(`  ${p.fil}:${p.rad}  «${p.namn}» läses, deklareras rad ${p.deklRad}`);
}
if (alla.sakra.length) {
  console.log('\n── SÄKRA (per fil) ──');
  const per = new Map();
  for (const p of alla.sakra) per.set(p.fil, (per.get(p.fil) ?? 0) + 1);
  for (const [fil, n] of [...per].sort((a, b) => b[1] - a[1])) console.log(`  ${n.toString().padStart(3)}  ${fil}`);
}
if (oparsade.length) {
  console.log('\n── OPARSADE ──');
  for (const p of oparsade) console.log(`  ${p.fil}  — ${p.skal}`);
}
console.log('');
