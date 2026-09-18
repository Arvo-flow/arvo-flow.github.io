#!/usr/bin/env node
// scripts/kanariedom.mjs — kör kanariefågelns dom och skriver den till $GITHUB_OUTPUT.
//
// Broen mellan workflowen och `lib/kanariedom.js`. Domen bor i lib/ just för att sviten ska kunna
// nå den; det här skriptet får därför INTE innehålla någon egen bedömning — bara avläsning,
// anrop och utskrift. En kopia av logiken här hade kunnat glida isär från den sviten låser
// (regel 1: en sanning per fråga).
//
// Körs av .github/workflows/canary.yml. Körs också av tests/kanariedom.mjs som en riktig process,
// eftersom ett test som anropar funktionen direkt aldrig kan se att ARGV-läsningen är fel —
// «mekanismen prövad, matningen aldrig».

import { readFileSync, appendFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { kanariedom } from '../lib/kanariedom.js';

function arg(namn) {
  const i = process.argv.indexOf(`--${namn}`);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : undefined;
}

const url      = arg('url') ?? '';
const httpRaw  = arg('http');
const exitRaw  = arg('curl-exit');
const bodyPath = arg('body');

// ⚠️ ETT SAKNAT ARGUMENT ÄR INTE ETT NOLLVÄRDE. `Number(undefined)` är NaN och `Number('')` är 0 —
// det senare hade tyst blivit «curl lyckades» och gjort en kraschad runner till en frisk sajt.
if (exitRaw === undefined || exitRaw.trim() === '') {
  console.error('kanariedom: --curl-exit saknas. Utan den vet domen inte om vi ens nådde fram.');
  process.exit(2);
}
const curlExit = Number(exitRaw);
if (!Number.isFinite(curlExit)) {
  console.error(`kanariedom: --curl-exit "${exitRaw}" är inte ett tal.`);
  process.exit(2);
}

// Kroppen läses som RÅ TEXT. Ett läsfel är ett läsfel — det får inte bli en tom sträng, för en tom
// kropp är ett giltigt (och helt annat) svar.
let body = '';
if (bodyPath) {
  try {
    body = readFileSync(bodyPath, 'utf8');
  } catch (e) {
    console.error(`kanariedom: kunde inte läsa kroppen från ${bodyPath}: ${e.message}`);
    process.exit(2);
  }
}

const dom = kanariedom({ curlExit, httpCode: httpRaw, body });

console.log(`[kanariedom] ${dom.status} · objekt=${dom.objekt} · larmar=${dom.larmar}`);
console.log(`[kanariedom] ${dom.rubrik}`);

const ut = process.env.GITHUB_OUTPUT;
if (!ut) {
  // Lokal körning: skriv till stdout så domen går att läsa för hand.
  console.log(JSON.stringify({ ...dom, url, httpCode: httpRaw ?? null }, null, 2));
  process.exit(0);
}

// Flerradiga värden kräver en avgränsare som INTE kan förekomma i innehållet. Kroppen kommer från
// nätet; en fast sträng som "EOF" är en injektionsväg rakt in i workflowens variabler.
const skriv = (nyckel, varde) => {
  const v = String(varde ?? '');
  if (!v.includes('\n')) return appendFileSync(ut, `${nyckel}=${v}\n`);
  const d = `ghadelim_${randomUUID()}`;
  appendFileSync(ut, `${nyckel}<<${d}\n${v}\n${d}\n`);
};

skriv('status',    dom.status);
skriv('objekt',    dom.objekt);
skriv('larmar',    dom.larmar ? 'true' : 'false');
skriv('rubrik',    dom.rubrik);
skriv('atgard',    dom.atgard.map((r, i) => `${i + 1}. ${r}`).join('\n'));
skriv('url',       url);
skriv('http_code', httpRaw ?? '');
skriv('body',      body.slice(0, 1500));
