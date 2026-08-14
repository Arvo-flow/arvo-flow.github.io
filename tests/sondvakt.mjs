// tests/sondvakt.mjs — VAKTERNA ÖVER VÅRA MÄTINSTRUMENT, TESTLÅSTA.
//
// Grundarorder 2026-08-14: "Vi behöver eliminera att dessa fel uppstår."
// Sju sondfel på ett dygn mot ett enda produktionsfel. Modulen lib/sondvakt.js gör de tre
// vanligaste avläsningarna omöjliga att hoppa över — och KÄLLVAKTEN nedan gör felmönstren
// omöjliga att återinföra, på samma sätt som claims-audit och kopidetektorn.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: `?? ` mot process.env (tom sträng är inte nullish) och `.catch(() => [])`-mönstret
//           som förvandlar ett fel till ett tomt fynd — i scripts/probe-*.mjs och lib/sondvakt.
//   BLIND:  källvakten läser TEXT. En sond kan svälja fel på hundra andra sätt (egen try/catch,
//           en tom array som default-parameter, ett villkor som aldrig är sant). Den stänger de
//           två mönster som FAKTISKT fällde oss, inte kategorin "sonden ljuger".
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { kravEnv, kravKolumner, aldrigTyst } from '../lib/sondvakt.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('SONDVAKT · instrumenten hålls till samma krav som produktionen', () => {
  test('SV-01 · tom miljövariabel är SAKNAD, inte ett värde (422-buggen)', () => {
    process.env.SV_TEST_TOM = '';
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/);
    process.env.SV_TEST_TOM = '   ';
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/,
      'bara blanksteg är också tomt — annars blir avsändaren " " och Resend svarar 422');
    delete process.env.SV_TEST_TOM;
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/);
    process.env.SV_TEST_TOM = 'analys@arvoflow.se';
    assert.equal(kravEnv('SV_TEST_TOM'), 'analys@arvoflow.se');
    delete process.env.SV_TEST_TOM;
  });

  test('SV-02 · fallback används bara när den uttryckligen begärts', () => {
    process.env.SV_TEST_F = '';
    assert.equal(kravEnv('SV_TEST_F', { fallback: 'reserv' }), 'reserv');
    delete process.env.SV_TEST_F;
  });

  test('SV-03 · saknad kolumn ger felet OCH de faktiska kolumnerna (updated_at-buggen)', async () => {
    const fejkDb = () => Promise.resolve([
      { column_name: 'id' }, { column_name: 'status' }, { column_name: 'done_at' },
    ]);
    await assert.rejects(
      () => kravKolumner(fejkDb, 'ingest_jobs', ['status', 'updated_at']),
      (e) => {
        assert.match(e.message, /saknar kolumn\(er\): updated_at/);
        // Det avgörande: felet SKA visa vad som finns, annars gissar nästa läsare igen.
        assert.match(e.message, /faktiska kolumner:.*done_at/);
        return true;
      },
    );
  });

  test('SV-04 · tabell som inte finns är ett fel, aldrig ett tomt resultat', async () => {
    const tomDb = () => Promise.resolve([]);
    await assert.rejects(() => kravKolumner(tomDb, 'finns_inte', ['x']), /finns inte i databasen/);
  });

  test('SV-05 · aldrigTyst kastar vidare i stället för att svälja', async () => {
    await assert.rejects(
      () => aldrigTyst(Promise.reject(new Error('kolumn saknas')), 'läsning av ingest_jobs'),
      (e) => {
        assert.match(e.message, /läsning av ingest_jobs FELADE: kolumn saknas/);
        assert.match(e.message, /aldrig som ett fynd/);
        return true;
      },
    );
    assert.deepEqual(await aldrigTyst(Promise.resolve([1, 2]), 'ok'), [1, 2]);
  });

  // ── KÄLLVAKTEN: mönstren får inte återuppstå ────────────────────────────────────────────────
  const sondFiler = () => readdirSync(join(ROOT, 'scripts'))
    .filter((f) => /^(probe|skicka|diag)-.*\.mjs$/.test(f))
    .map((f) => [f, readFileSync(join(ROOT, 'scripts', f), 'utf8')]);

  test('SV-06 · ingen sond använder ?? mot process.env (tom sträng är inte nullish)', () => {
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      kod.split('\n').forEach((rad, i) => {
        if (/process\.env\.\w+\s*\?\?/.test(rad) && !/sondvakt-ok:/.test(rad)) {
          brott.push(`${namn}:${i + 1}`);
        }
      });
    }
    assert.deepEqual(brott, [],
      `?? mot process.env — en tom hemlighet passerar som ett värde (använd kravEnv eller ||):\n  ${brott.join('\n  ')}`);
  });

  test('SV-07 · ingen sond förvandlar ett fel till ett tomt fynd', () => {
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      kod.split('\n').forEach((rad, i) => {
        // .catch(() => []) / .catch(() => null) / .catch(() => ({})) — felet blir ett resultat.
        if (/\.catch\(\s*\(\s*\)\s*=>\s*(\[\s*\]|null|\{\s*\}|\(\s*\{\s*\}\s*\))\s*\)/.test(rad)
            && !/sondvakt-ok:/.test(rad)) {
          brott.push(`${namn}:${i + 1}`);
        }
      });
    }
    assert.deepEqual(brott, [],
      `Fel sväljs och blir ett tomt fynd (använd aldrigTyst, eller motivera med // sondvakt-ok:):\n  ${brott.join('\n  ')}`);
  });

  test('SV-08 · källvakten läser faktiskt några sonder (annars grön av tomhet)', () => {
    const n = sondFiler().length;
    assert.ok(n >= 10, `hittade bara ${n} sondfiler — mönstret matchar inte längre katalogen`);
  });
});
