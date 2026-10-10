#!/usr/bin/env node
// scripts/commitkrav-intervall.mjs — commitkravet (lib/commitkrav.js) på VARJE commit i en PR.
//
// Commit-msg-hooken dömer bara commits som skrivs i en klon där hooken är installerad, och den
// kringgås med --no-verify. Här döms samma meddelanden en gång till, i CI, där ingen flagga finns.
//
// Användning (Actions): ARVO_DIFF_BAS=<bas-sha> node scripts/commitkrav-intervall.mjs

import { execFileSync } from 'node:child_process';
import { granskaCommit } from '../lib/commitkrav.js';
import { kravBas } from '../lib/diffintervall.js';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

let commits;
try {
  const bas = kravBas(process.env.ARVO_DIFF_BAS);
  commits = git('rev-list', '--reverse', '--no-merges', `${bas}..HEAD`).split('\n').filter(Boolean);
} catch (err) {
  console.error(`✗ Commitkravet kunde inte läsa intervallet: ${err.message}`);
  process.exit(1);
}

const fallna = [];
let medMekanik = 0;
for (const sha of commits) {
  let meddelande, diff;
  try {
    meddelande = git('log', '-1', '--format=%B', sha);
    diff = git('show', '--format=', sha, '--', 'lib', 'api', 'agents');
  } catch (err) {
    console.error(`✗ Commitkravet kunde inte läsa ${sha.slice(0, 7)}: ${err.message}`);
    process.exit(1);
  }
  if (/^Revert\b/.test(meddelande.split('\n')[0] ?? '')) continue;
  if (diff.trim()) medMekanik++;
  const { ok, brister } = granskaCommit(meddelande, diff);
  if (!ok) fallna.push({ sha, rubrik: meddelande.split('\n')[0], brister });
}

if (fallna.length === 0) {
  console.log(`✓ Commitkravet — ${commits.length} commit(s) prövade, ${medMekanik} med ändringar i lib/, api/ eller agents/`);
  process.exit(0);
}
console.error(`\n✗ COMMITKRAVET — ${fallna.length} av ${commits.length} commit(s) redovisar inte sitt arbete:\n`);
for (const f of fallna) {
  console.error(`  ${f.sha.slice(0, 7)} ${f.rubrik}`);
  for (const b of f.brister) console.error(`      · ${b}`);
}
console.error(`
  Varje commit med en beteendeändring i lib/, api/ eller agents/ bär:

    Syskonfall: <grannfallet du körde, eller «inga — <skäl>»>
    Sabotage som fällde: <vad du saboterade> → N tester föll
`);
process.exit(1);
