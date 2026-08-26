// tests/hemlighetsvakt.mjs — HV-01..02: vakten som skyddar det publika repot måste själv vara
// granskningsbar, och den måste faktiskt blockera.
//
// VARFÖR (2026-08-24, Fable 5:s granskning). Vaktens källkod bar en RÅ NUL-BYTE — en trasig
// Python-escape skrev tecknet i stället för escape-sekvensen '\0'. Vakten FUNGERADE, men grep,
// git-diff och varje källtextsvakt läste filen som BINÄR och hoppade tyst över den. En vakt som
// verktygen inte kan läsa är en vakt ingen granskning ser — samma tystnad som en avstängd.
//
// FÅNGAR: att en rå kontrollbyte smyger in i vaktens källa igen, och att vakten slutar blockera.
// BLIND: HV-02 prövar EN hemlighetsform (Anthropic-nyckeln) — mönsterlistans fulla täckning
//   prövades manuellt 24 aug (5 former blockerade, 2 ofarliga släppta) och är en ordlista som
//   växer med incidenter, inte en förståelse.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VAKT = join(ROT, 'scripts', 'hemlighetsvakt.mjs');

describe('HV · Hemlighetsvakten', () => {
  test('HV-01: vaktens källkod är ren text — inga råa kontrollbytes', () => {
    const buf = readFileSync(VAKT);
    assert.equal(buf.includes(0), false,
      'en rå NUL-byte gör filen binär för grep/diff — vakten blir osynlig för varje källtextsgranskning');
  });

  test('HV-02: vakten blockerar en stagead nyckel och släpper en stub', () => {
    const kat = mkdtempSync(join(tmpdir(), 'hv-'));
    try {
      execSync('git init -q . && git config user.email t@t && git config user.name t', { cwd: kat });
      writeFileSync(join(kat, 'hemlig.js'), 'const k = "sk-ant-api03-AbCdEfGh12345678ZzYy";\n'); // hemlighet-ok: syntetisk form — HV-02 BEVISAR att vakten fäller den
      execSync('git add -A', { cwd: kat });
      let kod = 0;
      try { execFileSync('node', [VAKT], { cwd: kat, encoding: 'utf8' }); }
      catch (e) { kod = e.status ?? 1; }
      assert.notEqual(kod, 0, 'en äkta nyckelform måste blockera committen');

      writeFileSync(join(kat, 'hemlig.js'), 'DATABASE_URL=postgres://stub RESEND_API_KEY=re_stub\n');
      execSync('git add -A', { cwd: kat });
      const ut = execFileSync('node', [VAKT], { cwd: kat, encoding: 'utf8' });
      assert.match(ut, /rena/, 'en medveten platshållare får inte fälla — en vakt som fäller allt stängs av');
    } finally { rmSync(kat, { recursive: true, force: true }); }
  });
});
