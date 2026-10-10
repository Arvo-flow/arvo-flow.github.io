// tests/granskningsgrind.mjs — GG-01..11: grinden i CI (lib/granskningsgrind.js, lib/diffintervall.js,
// scripts/granskningsgrind.mjs, scripts/commitkrav-intervall.mjs, .github/workflows/grinden.yml).
//
// De rena funktionerna prövas direkt. Skalen prövas genom att köra de RIKTIGA skripten mot temporära
// git-repon — en modell av git hade bevisat att logiken svarar, aldrig att kedjan git → dom gör det.
// Varje grön gren har sitt motprov: ett fall där samma instrument svarar rött.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, execSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lasGranskning, andraBlicken } from '../lib/granskningsgrind.js';
import { diffIntervall, kravBas } from '../lib/diffintervall.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKRIPT = (n) => join(ROT, 'scripts', n);

const A = 'a'.repeat(40), B = 'b'.repeat(40), C = 'c'.repeat(40);
const granskning = (commits, dom) => ({ fil: 'ops/GRANSKNING-x.md', text: `# G\n\ncommits: ${commits}\ndom: ${dom}\n` });
const blick = (over = {}) => andraBlicken({
  prCommits: [A, B, C], andradeFiler: ['lib/x.js', 'tests/x.mjs'], granskningar: [], andratSedan: () => [], ...over,
});

/** Temporärt repo med commits ur `steg` ([{ filer: {sökväg: innehåll}, meddelande }]). Returnerar sha:erna. */
function repo(steg) {
  const kat = mkdtempSync(join(tmpdir(), 'gg-'));
  execSync('git init -q . && git config user.email t@t && git config user.name t && git config commit.gpgsign false', { cwd: kat });
  const shas = [];
  for (const s of steg) {
    for (const [fil, innehall] of Object.entries(s.filer)) {
      mkdirSync(join(kat, dirname(fil)), { recursive: true });
      writeFileSync(join(kat, fil), innehall);
    }
    execSync('git add -A', { cwd: kat });
    execFileSync('git', ['commit', '-q', '--allow-empty', '-m', s.meddelande ?? 'steg'], { cwd: kat });
    shas.push(execSync('git rev-parse HEAD', { cwd: kat, encoding: 'utf8' }).trim());
  }
  return { kat, shas };
}

function kor(skript, kat, env = {}) {
  try {
    const ut = execFileSync('node', [SKRIPT(skript)], { cwd: kat, encoding: 'utf8', env: { ...process.env, CI: '', ARVO_DIFF_BAS: '', ...env } });
    return { kod: 0, ut };
  } catch (e) {
    return { kod: e.status ?? 1, ut: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

describe('GG · Grinden i CI', () => {
  test('GG-01: huvudet läses — commits och dom; äldre format utan «commits:» är ingen granskning', () => {
    assert.deepEqual(lasGranskning('commits: abc1234 def5678\ndatum: x\ndom: MERGAS\n'), { commits: ['abc1234', 'def5678'], dom: 'MERGAS' });
    assert.deepEqual(lasGranskning('commits: abc1234\ndom: **BLOCKERAR**\n').dom, 'BLOCKERAR');
    assert.equal(lasGranskning('commits: abc1234\n').dom, null, 'en saknad dom är oläsbar, aldrig MERGAS');
    assert.equal(lasGranskning('**Dom:** **MERGAS.**'), null);
  });

  test('GG-02: utan mekanik i PR:en behövs ingen granskning — motprov: samma PR med lib/ fälls', () => {
    assert.equal(blick({ andradeFiler: ['tests/x.mjs', 'src/x.js', 'ops/x.md'] }).ok, true);
    assert.equal(blick({ andradeFiler: ['agents/x.js'] }).ok, false, 'agents/ är mekanik');
    assert.equal(blick({ andradeFiler: ['api/x.mjs'] }).ok, false, 'api/ är mekanik');
  });

  test('GG-03: mekanik utan granskningsfil fälls', () => {
    const u = blick();
    assert.equal(u.ok, false);
    assert.match(u.skal, /utan granskning/);
  });

  test('GG-04: en granskning av en commit utanför PR:en räknas inte — en gammal fil återanvänds inte', () => {
    assert.equal(blick({ granskningar: [granskning('d'.repeat(7), 'MERGAS')] }).ok, false);
    assert.equal(blick({ granskningar: [granskning(C.slice(0, 7), 'MERGAS')] }).ok, true, 'motprov: samma fil som namnger HEAD släpper');
  });

  test('GG-05: senaste domen gäller; vid lika vinner BLOCKERAR; en oläsbar dom släpper aldrig', () => {
    const mergas = { ...granskning(B.slice(0, 7), 'MERGAS'), fil: 'ops/GRANSKNING-1.md' };
    const blockerar = { ...granskning(C.slice(0, 7), 'BLOCKERAR'), fil: 'ops/GRANSKNING-2.md' };
    assert.equal(blick({ granskningar: [mergas, blockerar] }).ok, false, 'en senare BLOCKERAR upphäver en tidigare MERGAS');
    const lika = { ...granskning(C.slice(0, 7), 'BLOCKERAR'), fil: 'ops/GRANSKNING-3.md' };
    const likaM = { ...granskning(C.slice(0, 7), 'MERGAS'), fil: 'ops/GRANSKNING-4.md' };
    assert.equal(blick({ granskningar: [likaM, lika] }).ok, false, 'vid tvekan: [KUND]');
    assert.equal(blick({ granskningar: [{ fil: 'g', text: `commits: ${C.slice(0, 7)}\n` }] }).ok, false);
    assert.equal(blick({ granskningar: [mergas, likaM] }).ok, true, 'motprov: MERGAS på HEAD efter en tidigare MERGAS släpper');
  });

  test('GG-06: mekanik ändrad efter den granskade commiten fälls — motprov: bara tester efter domen släpps', () => {
    const g = [granskning(B.slice(0, 7), 'MERGAS')];
    const u = blick({ granskningar: g, andratSedan: (sha) => (sha === B ? ['lib/x.js'] : []) });
    assert.equal(u.ok, false);
    assert.deepEqual(u.ogranskade, ['lib/x.js']);
    assert.equal(blick({ granskningar: g, andratSedan: () => ['tests/x.mjs', 'ops/GRANSKNING-x.md'] }).ok, true);
  });

  test('GG-07: CI utan bas kastar — den stageade diffen är tom där; lokalt utan bas läses den stageade', () => {
    assert.throws(() => diffIntervall({ CI: 'true' }), /ARVO_DIFF_BAS saknas/);
    assert.throws(() => diffIntervall({ CI: 'true', ARVO_DIFF_BAS: '   ' }), /ARVO_DIFF_BAS saknas/);
    assert.deepEqual(diffIntervall({}), { lage: 'stageat', args: ['--cached'] });
    assert.deepEqual(diffIntervall({ CI: 'true', ARVO_DIFF_BAS: 'abc1234' }).args, ['abc1234...HEAD']);
    assert.throws(() => kravBas('0'.repeat(40)), /nollbasen/);
    assert.throws(() => kravBas('main; rm -rf /'), /ogiltig bas/);
    assert.throws(() => kravBas(undefined), /ogiltig bas/);
  });

  test('GG-08: en kort sha som träffar två commits fälls i stället för att välja', () => {
    const u = andraBlicken({
      prCommits: ['abc1234' + '1'.repeat(33), 'abc1234' + '2'.repeat(33)], andradeFiler: ['lib/x.js'],
      granskningar: [granskning('abc1234', 'MERGAS')], andratSedan: () => [],
    });
    assert.equal(u.ok, false);
    assert.match(u.skal, /träffar 2 commits/);
  });

  test('GG-09: skalet mot riktig git — utan granskning rött, med granskning grönt, lagning efter domen rött', () => {
    const { kat, shas } = repo([
      { filer: { 'README.md': 'bas\n' }, meddelande: 'bas' },
      { filer: { 'lib/x.js': 'export const x = 1;\n' }, meddelande: 'mekanik' },
    ]);
    try {
      const env = { CI: 'true', ARVO_DIFF_BAS: shas[0] };
      const utan = kor('granskningsgrind.mjs', kat, env);
      assert.equal(utan.kod, 1, utan.ut);
      assert.match(utan.ut, /utan granskning/);

      mkdirSync(join(kat, 'ops'), { recursive: true });
      writeFileSync(join(kat, 'ops', 'GRANSKNING-x.md'), `commits: ${shas[1].slice(0, 10)}\ndom: MERGAS\n`);
      execSync('git add -A && git commit -q -m granskning', { cwd: kat });
      const med = kor('granskningsgrind.mjs', kat, env);
      assert.equal(med.kod, 0, med.ut);
      assert.match(med.ut, /täckta av ops\/GRANSKNING-x\.md/);

      writeFileSync(join(kat, 'lib', 'x.js'), 'export const x = 2;\n');
      execSync('git add -A && git commit -q -m lagning', { cwd: kat });
      const efter = kor('granskningsgrind.mjs', kat, env);
      assert.equal(efter.kod, 1, efter.ut);
      assert.match(efter.ut, /ändrade efter den granskade commiten/);

      assert.equal(kor('granskningsgrind.mjs', kat, { CI: 'true' }).kod, 1, 'utan bas: rött, aldrig ett tomt grönt');
    } finally { rmSync(kat, { recursive: true, force: true }); }
  });

  test('GG-10: commitkravet läser agents/ — både commit-msg-skalet och CI-varianten per commit', () => {
    const utanRubrik = 'ändra orkestratorn\n';
    const medRubrik = 'ändra orkestratorn\n\nSyskonfall: inga — en konstant\nSabotage som fällde: konstanten återställd → 2 tester föll\n';
    const { kat, shas } = repo([
      { filer: { 'README.md': 'bas\n' }, meddelande: 'bas' },
      { filer: { 'agents/o.js': 'export const steg = 1;\n' }, meddelande: utanRubrik },
    ]);
    try {
      const iv = kor('commitkrav-intervall.mjs', kat, { CI: 'true', ARVO_DIFF_BAS: shas[0] });
      assert.equal(iv.kod, 1, iv.ut);
      assert.match(iv.ut, /1 av 1 commit/);

      execFileSync('git', ['commit', '-q', '--amend', '-m', medRubrik], { cwd: kat });
      const ok = kor('commitkrav-intervall.mjs', kat, { CI: 'true', ARVO_DIFF_BAS: shas[0] });
      assert.equal(ok.kod, 0, ok.ut);
      assert.match(ok.ut, /1 commit\(s\) prövade, 1 med ändringar/);

      writeFileSync(join(kat, 'agents', 'o.js'), 'export const steg = 2;\n');
      execSync('git add -A', { cwd: kat });
      // commit-msg-skalet får meddelandefilen som argument — körs som git gör det.
      const hook = (meddelande) => {
        writeFileSync(join(kat, 'msg.txt'), meddelande);
        try { execFileSync('node', [SKRIPT('commitkrav.mjs'), join(kat, 'msg.txt')], { cwd: kat, encoding: 'utf8' }); return 0; }
        catch (e) { return e.status ?? 1; }
      };
      assert.equal(hook(utanRubrik), 1, 'en stagead agents/-ändring utan rubriker måste fällas av commit-msg-skalet');
      assert.equal(hook(medRubrik), 0, 'motprov: samma ändring med rubriker släpps');
    } finally { rmSync(kat, { recursive: true, force: true }); }
  });

  test('GG-11: CI-läget läser PR:ens intervall — motprov: samma repo i stageat läge läser noll filer', () => {
    const nyckel = 're' + '_' + 'Q7w'.repeat(7);
    const pastaende = '// den här grinden är ' + 'fail' + '-closed mot allt\n';
    const { kat, shas } = repo([
      { filer: { 'README.md': 'bas\n' }, meddelande: 'bas' },
      { filer: { 'lib/k.js': `const k = "${nyckel}";\n${pastaende}` }, meddelande: 'nyckel' },
    ]);
    try {
      const env = { CI: 'true', ARVO_DIFF_BAS: shas[0] };
      const hv = kor('hemlighetsvakt.mjs', kat, env);
      assert.equal(hv.kod, 1, hv.ut);
      assert.match(hv.ut, /Resend API-nyckel/);
      const pv = kor('pastaendevakt.mjs', kat, env);
      assert.equal(pv.kod, 1, pv.ut);

      const stageatHv = kor('hemlighetsvakt.mjs', kat);
      assert.equal(stageatHv.kod, 0);
      assert.match(stageatHv.ut, /0 stageade fil/, 'just detta gröna hade CI ärvt utan intervallet');
      assert.equal(kor('hemlighetsvakt.mjs', kat, { CI: 'true' }).kod, 1, 'CI utan bas: rött');
      assert.equal(kor('pastaendevakt.mjs', kat, { CI: 'true' }).kod, 1, 'CI utan bas: rött');
    } finally { rmSync(kat, { recursive: true, force: true }); }
  });

  test('GG-12: workflowen kör varje pre-commit-vakt och sätter basen bara där den läses', () => {
    const wf = readFileSync(join(ROT, '.github', 'workflows', 'grinden.yml'), 'utf8');
    const hooks = readFileSync(join(ROT, 'scripts', 'setup-hooks.mjs'), 'utf8');
    // Bara pre-commit-hookens innehåll — filhuvudet nämner `node scripts/setup-hooks.mjs` självt.
    const start = hooks.indexOf('PRE_COMMIT_CONTENT = `');
    const preCommit = hooks.slice(start, hooks.indexOf('`;', start));
    assert.ok(start > 0 && preCommit.length > 200, 'pre-commit-hookens innehåll hittades inte');
    const vakter = [...preCommit.matchAll(/node (scripts\/[\w-]+\.mjs)/g)].map((m) => m[1]);
    assert.equal(new Set(vakter).size, 8, `${new Set(vakter).size} vakter i pre-commit — mätt 2026-10-10: 8. Ny vakt? Lägg den i grinden.yml och ändra talet`);
    for (const v of new Set(vakter)) assert.ok(wf.includes(`node ${v}`), `${v} körs lokalt men inte i CI`);
    for (const s of ['tests/run.mjs', 'scripts/commitkrav-intervall.mjs', 'scripts/granskningsgrind.mjs']) {
      assert.ok(wf.includes(s), `${s} saknas i grinden`);
    }
    assert.match(wf, /pull_request\.head\.sha/, 'PR:ens head, inte GitHubs syntetiska merge-commit');
    assert.match(wf, /fetch-depth: 0/);
    const svit = wf.slice(wf.indexOf('  svit:'), wf.indexOf('  vakter:'));
    assert.ok(svit.length > 50 && !svit.includes('ARVO_DIFF_BAS'), 'sviten får inte ärva basen — dess tester kör i temporära repon');
    assert.equal((wf.match(/ARVO_DIFF_BAS:/g) ?? []).length, 3, 'vakterna, commitkravet och andra blicken');
  });
});
