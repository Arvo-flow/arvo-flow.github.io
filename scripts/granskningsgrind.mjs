#!/usr/bin/env node
// scripts/granskningsgrind.mjs — CI-skalet runt lib/granskningsgrind.js (andra blicken).
//
// Användning (Actions): ARVO_DIFF_BAS=<bas-sha> node scripts/granskningsgrind.mjs
// HEAD måste vara PR:ens head-commit, inte GitHubs syntetiska merge-commit — workflowen checkar ut
// `pull_request.head.sha` med full historik.

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { andraBlicken } from '../lib/granskningsgrind.js';
import { kravBas } from '../lib/diffintervall.js';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const rader = (s) => s.split('\n').map((r) => r.trim()).filter(Boolean);

let utfall;
try {
  const bas = kravBas(process.env.ARVO_DIFF_BAS);
  const prCommits = rader(git('rev-list', '--reverse', `${bas}..HEAD`));
  const andradeFiler = rader(git('diff', '--name-only', `${bas}...HEAD`));
  const ops = 'ops';
  const granskningar = existsSync(ops)
    ? readdirSync(ops).filter((f) => /^GRANSKNING-.*\.md$/.test(f))
      .map((f) => ({ fil: `${ops}/${f}`, text: readFileSync(join(ops, f), 'utf8') }))
    : [];
  console.log(`  prövar ${prCommits.length} commit(s), ${andradeFiler.length} ändrade fil(er), ${granskningar.length} granskningsfil(er)`);
  utfall = andraBlicken({
    prCommits, andradeFiler, granskningar,
    andratSedan: (sha) => rader(git('diff', '--name-only', sha, 'HEAD')),
  });
} catch (err) {
  console.error(`✗ Andra blicken kunde inte läsa intervallet: ${err.message}`);
  process.exit(1);
}

if (utfall.ok) {
  console.log(`✓ Andra blicken — ${utfall.skal}`);
  process.exit(0);
}
console.error(`\n✗ ANDRA BLICKEN — ${utfall.skal}`);
for (const f of utfall.ogranskade ?? []) console.error(`    ${f}`);
console.error(`
  Bevisplikten p.1: lib/, api/ och agents/ når main först efter en separat granskning med enda
  uppdraget «hitta var det gröna är osant». Lägg granskningen i ops/GRANSKNING-<namn>.md med:

    commits: <sha för den commit som granskades>
    dom: MERGAS
`);
process.exit(1);
