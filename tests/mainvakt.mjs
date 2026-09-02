// tests/mainvakt.mjs — MV-01..04: `main` tar inte emot mekanik utan en andra blick.
//
// Bevisplikten p.1 var PROSA tills en underagent körde `git push origin HEAD:main` och tog med sig
// oreviderade vaktfixar. En regel som bara finns i text skalar inte med en agentflotta.
//
// Sviten kör det RIKTIGA skriptet med refar på stdin — samma väg git använder. En modell av
// grinden hade bevisat att logiken svarar, aldrig att hooken gör det (villkorsvaktens läxa).
//
// FÅNGAR: en push till main som bär lib/, api/ eller agents/ utan uttryckligt godkännande, och en
//   grind som släpper igenom en push vars innehåll den inte kunde läsa.
// BLIND: sviten ser inte OM en granskning faktiskt gjorts — bara att flaggan sattes. Och den ser
//   bara pushar genom repots egen hook; Actions och webbgränssnittet passerar oberörda.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VAKT = join(ROT, 'scripts', 'mainvakt.mjs');

/** Kör vakten som git gör det: refar på stdin. @returns {{ kod: number, ut: string }} */
function kor(rad, env = {}) {
  try {
    const ut = execFileSync('node', [VAKT], {
      input: rad, encoding: 'utf8', cwd: ROT, env: { ...process.env, ...env },
    });
    return { kod: 0, ut };
  } catch (err) {
    return { kod: err.status ?? 1, ut: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
}

const sha = (ref) => execSync(`git rev-parse ${ref}`, { cwd: ROT, encoding: 'utf8' }).trim();
const NOLL = '0'.repeat(40);

describe('MV · Main-vakten: en andra blick före mekanik', () => {
  // Ett spann som garanterat bär lib/-ändringar: vaktfixarna 2026-09-02.
  const bar = () => {
    const till = sha('HEAD');
    const fran = execSync(
      'git log --format=%H -n 40 -- lib/pastaendevakt.js | tail -1', { cwd: ROT, encoding: 'utf8' },
    ).trim();
    return `${till} ${till} refs/heads/main ${fran}~1`;
  };

  test('MV-01 · en push till main med lib/-ändringar NEKAS', () => {
    const r = kor(bar());
    assert.equal(r.kod, 1, 'mekanik utan granskning får inte nå main');
    assert.match(r.ut, /MAIN-VAKTEN/);
    assert.match(r.ut, /lib\//, 'filerna ska namnges — annars vet ingen vad som stoppades');
  });

  test('MV-02 · MOTPROVET — samma push släpps med ARVO_GRANSKAD=1', () => {
    // Utan den här grenen vore vakten ett hinder, inte en grind: den som FAKTISKT granskat måste
    // kunna leverera på en rad, annars kringgås hooken med --no-verify och blir värre än ingen.
    assert.equal(kor(bar(), { ARVO_GRANSKAD: '1' }).kod, 0);
  });

  test('MV-03 · MOTPROVET — en feature branch rör inte vakten', () => {
    const till = sha('HEAD');
    assert.equal(kor(`${till} ${till} refs/heads/claude/nagot ${sha('HEAD~1')}`).kod, 0,
      'en grind som fäller varje push blir avstängd');
  });

  test('MV-04 · ett OKÄNT innehåll nekar — grinden godkänner aldrig det den inte kunde läsa', () => {
    // fail-closed på PÅSTÅENDET att pushen är ofarlig: kan diffen inte läsas vet vi inte vad den
    // bär, och «jag kunde inte mäta» får aldrig se ut som «inget att stoppa». (MV-04.)
    const påhittat = 'f'.repeat(40);
    const r = kor(`${påhittat} ${påhittat} refs/heads/main ${NOLL}`);
    assert.equal(r.kod, 1, 'en oläsbar diff mot main ska nekas, inte släppas');
    assert.match(r.ut, /okänt|kunde inte läsa/i);
  });
});
