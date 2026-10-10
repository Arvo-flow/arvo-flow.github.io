// tests/stampelvakt.mjs — BOTTEN FÅR SKRIVA ETT DATUM TILL main, OCH INGET ANNAT (2026-10-10)
//
// Grenskyddet på main nekade verifieringsstämpeln (GH006, körning 38090943472) medan jobbet visade
// grönt. Stämpeln går nu via ett enda jobb med en egen nyckel förbi grenskyddet, och
// scripts/stampelvakt.mjs avgör före varje push att commiten bara flyttar lastVerified-datum framåt.
//
// FÅNGAR: att vakten släpper ett pris, en rad, en fil eller ett bakåt-/framtidsdatum (SP-02..04);
//   att den fäller den riktiga kedjan — verifierarnas deklarationer → tillampaStamplar → git diff
//   (SP-01, motprovet: en vakt som fäller rätt beteende blir avstängd); att beslutsfilen uteblir när
//   verify.mjs går ut rött (SP-05); att arbetsflödet pushar till main någon annan väg än via vakten,
//   med nyckeln, i produktion, eller döljer en nekad push (SP-06); att pushsteget, KÖRT med `bash -e`
//   som Actions kör det, pushar fel sak, pushar förbi vakten eller går grönt på ett nej (SP-07).
// BLIND: att en GRÖN verifierare faktiskt skriver sitt beslut till filen — den grenen kräver en källa
//   som svarar, och sviten har inget nät. Den bevisas av första körningen av verify-sources på main
//   (stampla-jobbets logg: «N beslutsfil(er)», «datum flyttade»). Och om GitHub faktiskt släpper
//   nyckeln förbi rulesetet — det är en repoinställning (ops/BOTNYCKELN.md).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { granskaStampeldiff, STAMPELFIL } from '../scripts/stampelvakt.mjs';
import { tillampaStamplar } from '../scripts/stampla.mjs';
import { jobbIArbetsflode } from '../scripts/hemlighetsbindning.mjs';
import { VERIFIERS } from '../lib/verifiers/registry.mjs';

const ROT = new URL('..', import.meta.url).pathname;
const PRISBOK = readFileSync(join(ROT, STAMPELFIL), 'utf8');
const DAG = '2099-01-01';

/** Ett temporärt repo med prisboken, så att diffen kommer ur riktig git — inte ur en handskriven sträng. */
function repoMed(kalla) {
  const d = mkdtempSync(join(tmpdir(), 'stampel-'));
  const git = (...a) => execFileSync('git', a, { cwd: d, encoding: 'utf8' });
  git('init', '-q');
  git('config', 'user.email', 't@t'); git('config', 'user.name', 't');
  mkdirSync(join(d, 'agents/recommender'), { recursive: true });
  writeFileSync(join(d, STAMPELFIL), kalla);
  git('add', '-A'); git('commit', '-qm', 'bas');
  return {
    dir: d,
    diffEfter(ny, extra = {}) {
      writeFileSync(join(d, STAMPELFIL), ny);
      for (const [f, t] of Object.entries(extra)) { mkdirSync(join(d, f, '..'), { recursive: true }); writeFileSync(join(d, f), t); }
      git('add', '-A'); git('commit', '-qm', 'stämpel');
      return git('diff', '-U0', '--no-color', 'HEAD~1', 'HEAD');
    },
  };
}

const allaBeslut = VERIFIERS.map((v) => ({ kalla: v.id, datum: DAG, nycklar: v.bevakadeTiers ?? [], kategori: v.bevakadKategori ?? null }));
const stamplad = tillampaStamplar(PRISBOK, allaBeslut);

describe('SP · verifieringsstämpeln når main bara som ett datum', () => {
  test('SP-01 · den riktiga kedjan (alla verifierares deklarationer → tillampaStamplar → git diff) släpps', () => {
    assert.ok(stamplad.andrade.length >= 15, `bara ${stamplad.andrade.length} datum stämplades — kedjan rör inte prisboken`);
    assert.ok(stamplad.andrade.includes('telia-vaxel:molnvaxel'), 'kategoridatumet (molnvaxel) stämplades inte');
    const u = granskaStampeldiff(repoMed(PRISBOK).diffEfter(stamplad.kalla), { idag: DAG });
    assert.equal(u.ok, true, u.skal);
    assert.equal(u.datum, stamplad.andrade.length, 'vakten räknade inte varje flyttat datum');
  });

  test('SP-02 · ett pris eller en text bredvid stämpeln fäller pushen, på samma rad och på egen rad', () => {
    const r = repoMed(PRISBOK);
    const sammaRad = "lastVerified: '2099-01-01', basis: 'icke-hushåll, SE, allt-in exkl. moms'";
    assert.ok(stamplad.kalla.includes(sammaRad), 'eurostat-raden ser inte ut som väntat — testet prövar inget');
    const u1 = granskaStampeldiff(r.diffEfter(stamplad.kalla.replace(sammaRad, sammaRad.replace('icke-hushåll', 'hushåll'))), { idag: DAG });
    assert.equal(u1.ok, false); assert.match(u1.skal, /mer än datumet/);

    const pris = 'msrpMonthly: 160.58, msrpAnnual: 133.82, arvoAnnual: 133.82,';
    assert.ok(stamplad.kalla.includes(pris));
    const u2 = granskaStampeldiff(repoMed(PRISBOK).diffEfter(stamplad.kalla.replace(pris, pris.replace('133.82,', '119.48,'))), { idag: DAG });
    assert.equal(u2.ok, false); assert.match(u2.skal, /ingen stämpel/);
  });

  test('SP-03 · datumet måste flyttas framåt, men aldrig förbi i dag, och vara ett riktigt datum', () => {
    const rad = "currency: 'SEK', lastVerified: '2026-10-05', source: 'microsoft.com',";
    assert.ok(PRISBOK.includes(rad), 'M365-raden ser inte ut som väntat — testet prövar inget');
    const med = (d) => granskaStampeldiff(repoMed(PRISBOK).diffEfter(PRISBOK.replace(rad, rad.replace('2026-10-05', d))), { idag: '2026-10-10' });
    assert.equal(med('2026-10-10').ok, true, 'motprov: ett datum framåt till i dag ska släppas');
    assert.match(med('2026-10-01').skal, /bakåt/);
    assert.match(med('2026-10-11').skal, /efter i dag/);
    assert.match(med('2026-02-30').skal, /ogiltigt/);
    assert.equal(granskaStampeldiff('', { idag: '2026-10-10' }).ok, false, 'en tom diff får aldrig läsas som godkänd');
    assert.equal(granskaStampeldiff('x', { idag: 'i dag' }).ok, false);
  });

  test('SP-04 · en annan fil, en ny rad eller en diff vakten inte kan läsa fäller pushen', () => {
    const u1 = granskaStampeldiff(repoMed(PRISBOK).diffEfter(stamplad.kalla, { 'lib/fee.js': 'export const x = 1;\n' }), { idag: DAG });
    assert.equal(u1.ok, false); assert.match(u1.skal, /lib\/fee\.js/);
    const u2 = granskaStampeldiff(repoMed(PRISBOK).diffEfter(stamplad.kalla.replace("source: 'microsoft.com',", "source: 'microsoft.com', extra: 1,\n        x: 2,")), { idag: DAG });
    assert.equal(u2.ok, false);
    // En rad som smugglas in i en EGEN hunk, bredvid en riktig stämpel — radantalet är det enda som ser den.
    const u3 = granskaStampeldiff(repoMed(PRISBOK).diffEfter(`${stamplad.kalla}\nexport const SMUGGEL = 1;\n`), { idag: DAG });
    assert.equal(u3.ok, false); assert.match(u3.skal, /lägger aldrig till/);
    assert.equal(granskaStampeldiff(`diff --git a/${STAMPELFIL} b/${STAMPELFIL}\nnew file mode 100644\n`, { idag: DAG }).ok, false);
    assert.equal(granskaStampeldiff('något helt annat\n', { idag: DAG }).ok, false);
    assert.throws(() => tillampaStamplar(PRISBOK, [{ kalla: 'x', datum: 'igår', nycklar: [] }]), /går inte att läsa/);
  });

  test('SP-05 · verify.mjs skriver beslutsfilen även när den går ut rött (motprov: utan variabeln ingen fil)', () => {
    const d = mkdtempSync(join(tmpdir(), 'verify-'));
    const kor = (env) => {
      try { execFileSync('node', ['scripts/verify.mjs', 'm365'], { cwd: ROT, env: { ...process.env, VERIFY_TIMEOUT_MS: '1', ...env }, stdio: 'pipe', timeout: 30000 }); return 0; }
      catch (e) { return e.status; }
    };
    assert.equal(kor({ VERIFY_STAMPEL_UT: join(d, 'a.json') }), 1, 'en källa utan svar ska ge rött');
    assert.deepEqual(JSON.parse(readFileSync(join(d, 'a.json'), 'utf8')), []);
    kor({ VERIFY_STAMPEL_UT: '' });
    assert.equal(existsSync(join(d, 'b.json')), false);
  });

  test('SP-06 · arbetsflödet: bara stampla-jobbet pushar till main, i produktion, med nyckeln, efter vakten, och rött vid nej', () => {
    const yaml = readFileSync(join(ROT, '.github/workflows/verify-sources.yml'), 'utf8');
    assert.match(yaml, /^permissions:\n {2}contents: read$/m, 'matrisjobben får inte kunna skriva till repot');
    const jobb = jobbIArbetsflode(yaml);
    const pushar = jobb.filter((j) => /git push/.test(j.text)).map((j) => j.jobb);
    assert.deepEqual(pushar, ['stampla']);
    const s = jobb.find((j) => j.jobb === 'stampla');
    assert.equal(s.miljo, 'produktion');
    assert.match(s.text, /ssh-key: \$\{\{ secrets\.BOT_DEPLOY_KEY \}\}/);
    assert.match(s.text, /github\.ref == 'refs\/heads\/main'/, 'en feature branch får aldrig stämpla main');
    assert.doesNotMatch(s.text, /continue-on-error/);
    // Vakten körs i samma funktion som skapar commiten, och funktionen körs före varje push.
    assert.match(s.text, /git commit[^\n]*\|\| return 2\n\s*node scripts\/stampelvakt\.mjs "\$\(git rev-parse HEAD~1\)" \|\| return 2\n\s*\}/);
    assert.match(s.text, /stampla \|\| r=\$\?\n[^\n]*\n\s*if \[ \$r -ne 0 \]; then exit 1; fi\n\s*if git push origin HEAD:main/);
    assert.match(s.text, /::error::stämpeln nekades[^\n]*\n\s*exit 1/, 'tre nekade pushar ska ge rött');
    // Inget annat schemalagt arbetsflöde pushar till main.
    for (const f of ['kohort-builder.yml', 'ai-drift.yml']) {
      const y = readFileSync(join(ROT, '.github/workflows', f), 'utf8');
      assert.doesNotMatch(y, /git push[^\n]*\bmain\b/, `${f} pushar till main`);
    }
    assert.doesNotMatch(readFileSync(join(ROT, '.github/workflows/kohort-builder.yml'), 'utf8'), /^\s+(continue-on-error|schedule):/m,
      'kohortbyggaren har aldrig gett en fil — den får inte gå grönt på ett schema');
  });

  test('SP-07 · pushsteget självt, kört med bash -e mot en lokal main: datum når main, ett nej blir rött, inget att göra är grönt', () => {
    const yaml = readFileSync(join(ROT, '.github/workflows/verify-sources.yml'), 'utf8');
    const rader = yaml.split('\n');
    const i = rader.findIndex((r) => r.includes('- name: Committa, vakta och pusha'));
    const r0 = rader.findIndex((r, j) => j > i && /^ {8}run: \|$/.test(r));
    assert.ok(i > 0 && r0 > i, 'pushsteget hittades inte');
    const skript = [];
    for (let j = r0 + 1; j < rader.length && (rader[j] === '' || rader[j].startsWith('          ')); j++) skript.push(rader[j].slice(10));
    assert.ok(skript.some((r) => r.includes('git push origin HEAD:main')), 'skriptet utan push — testet prövar inget');

    const tmp = mkdtempSync(join(tmpdir(), 'stampla-'));
    const sh = (cmd, cwd) => execFileSync('bash', ['-c', cmd], { cwd, encoding: 'utf8' });
    const fjarr = join(tmp, 'fjarr.git');
    sh(`git init -q --bare -b main ${fjarr}`, tmp);
    const bygg = join(tmp, 'bygg');
    for (const f of [STAMPELFIL, 'scripts/stampla.mjs', 'scripts/stampelvakt.mjs', 'lib/verifieringsstampel.js', 'lib/verifierarutfall.js', 'lib/package.json']) {
      mkdirSync(join(bygg, f, '..'), { recursive: true });
      copyFileSync(join(ROT, f), join(bygg, f));
    }
    sh(`git init -q -b main && git -c user.email=t@t -c user.name=t commit -qm bas --allow-empty && git add -A && git -c user.email=t@t -c user.name=t commit -qm prisbok && git remote add origin ${fjarr} && git push -q origin main`, bygg);
    const klon = join(tmp, 'klon');
    sh(`git clone -q ${fjarr} ${klon}`, tmp);
    const beslut = join(tmp, 'beslut');
    mkdirSync(beslut);
    const idag = new Date().toISOString().slice(0, 10);
    writeFileSync(join(beslut, 'stampel-m365.json'), JSON.stringify([{ kalla: 'm365', datum: idag, nycklar: ['business-basic', 'e3'], kategori: null }]));
    const kor = () => {
      try { return { kod: 0, ut: execFileSync('bash', ['-e', '-c', skript.join('\n')], { cwd: klon, env: { ...process.env, BESLUT: beslut, STAMPEL_VANTA_S: '0' }, encoding: 'utf8', stdio: 'pipe' }) }; }
      catch (e) { return { kod: e.status, ut: `${e.stdout}${e.stderr}` }; }
    };
    const huvud = () => sh('git rev-parse main', fjarr).trim();

    // Vakten sitter i pushvägen: ett pris som ligger ändrat i utcheckningen följer med i commiten och
    // ska fälla pushen — rött, main orörd.
    const fore = huvud();
    const pris = 'msrpMonthly: 160.58, msrpAnnual: 133.82, arvoAnnual: 133.82,';
    const kalla = readFileSync(join(klon, STAMPELFIL), 'utf8');
    assert.ok(kalla.includes(pris));
    writeFileSync(join(klon, STAMPELFIL), kalla.replace(pris, pris.replace('133.82,', '119.48,')));
    const smuggel = kor();
    assert.equal(smuggel.kod, 1, `ett pris bredvid stämpeln gick ut ${smuggel.kod}:\n${smuggel.ut}`);
    assert.match(smuggel.ut, /::error::stampelvakt/);
    assert.equal(huvud(), fore);
    sh('git reset -q --hard origin/main', klon);

    // Ett nej från main (som GH006) — tre försök, sedan rött, och main orörd.
    writeFileSync(join(fjarr, 'hooks/pre-receive'), '#!/bin/sh\necho "GH006: Protected branch update failed" >&2\nexit 1\n');
    chmodSync(join(fjarr, 'hooks/pre-receive'), 0o755);
    const nej = kor();
    assert.equal(nej.kod, 1, `ett nekat push gick ut ${nej.kod}:\n${nej.ut}`);
    assert.match(nej.ut, /::error::stämpeln nekades/);
    assert.equal(huvud(), fore);

    // Motprov: main tar emot — datumen och INGET annat når main.
    sh('rm hooks/pre-receive', fjarr);
    sh('git fetch -q origin && git reset -q --hard origin/main', klon);
    const ja = kor();
    assert.equal(ja.kod, 0, ja.ut);
    const diff = sh(`git diff -U0 ${fore} main`, fjarr);
    const u = granskaStampeldiff(diff, { idag });
    assert.equal(u.ok, true, u.skal);
    assert.equal(u.datum, 2);
    assert.match(sh('git log -1 --format=%B main', fjarr), /\[skip ci\]/);

    // Samma beslut en gång till: inget att flytta, grönt, ingen ny commit.
    const igen = kor();
    assert.equal(igen.kod, 0, igen.ut);
    assert.match(igen.ut, /inga datum att flytta/);
    assert.equal(sh('git rev-list --count main', fjarr).trim(), '3');
  });
});
