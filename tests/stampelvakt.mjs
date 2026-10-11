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
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync, copyFileSync, chmodSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { granskaStampeldiff, STAMPELFIL } from '../scripts/stampelvakt.mjs';
import { tillampaStamplar, prisbokAvtryck, FONSTER_DAGAR } from '../scripts/stampla.mjs';
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

const REGISTER = Object.fromEntries(VERIFIERS.map((v) => [v.id, v]));
const AVTRYCK = prisbokAvtryck(PRISBOK);
const beslutFor = (v, datum = DAG, avtryck = AVTRYCK) => ({ kalla: v.id, datum, nycklar: v.bevakadeTiers ?? [], kategori: v.bevakadKategori ?? null, prisbokAvtryck: avtryck });
const allaBeslut = VERIFIERS.map((v) => beslutFor(v));
const stamplad = tillampaStamplar(PRISBOK, allaBeslut, { register: REGISTER, idag: DAG });
const M365 = VERIFIERS.find((v) => v.id === 'm365');

describe('SP · verifieringsstämpeln når main bara som ett datum', () => {
  test('SP-01 · den riktiga kedjan (alla verifierares deklarationer → tillampaStamplar → git diff) släpps', () => {
    // Exakt, inte en tröskel: 20 deklarerade nivåer + 8 kategorier med eget datum, avläst 2026-10-10.
    // En ny verifierare flyttar talet — och då ska någon titta (bibeln 8 sep: «trösklar är luft»).
    assert.equal(stamplad.andrade.length, 28, `${stamplad.andrade.length} datum stämplades: ${stamplad.andrade.join(', ')}`);
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
    // V1: en innehållsrad som börjar med `++`/`--` blir `+++`/`---` i diffen och fick inte läsas som ett huvud.
    const u4 = granskaStampeldiff(repoMed(PRISBOK).diffEfter(`${stamplad.kalla}\n++ globalThis.x;\n`), { idag: DAG });
    assert.equal(u4.ok, false, `en smugglad «++»-rad släpptes: ${u4.skal}`);
    const med = `${PRISBOK}\n-- 133.82\n`;
    const u5 = granskaStampeldiff(repoMed(med).diffEfter(`${tillampaStamplar(med, allaBeslut.map((b) => ({ ...b, prisbokAvtryck: prisbokAvtryck(med) })), { register: REGISTER, idag: DAG }).kalla.replace('\n-- 133.82\n', '\n++ 999.00\n')}`), { idag: DAG });
    assert.equal(u5.ok, false, `«-- 133.82» → «++ 999.00» släpptes: ${u5.skal}`);
    assert.equal(granskaStampeldiff(`diff --git a/${STAMPELFIL} b/${STAMPELFIL}\nnew file mode 100644\n`, { idag: DAG }).ok, false);
    assert.equal(granskaStampeldiff('något helt annat\n', { idag: DAG }).ok, false);
    assert.throws(() => tillampaStamplar(PRISBOK, [{ kalla: 'x', datum: 'igår', nycklar: [] }], { register: REGISTER, idag: DAG }), /okänd källa/);
  });

  test('SP-05 · verify.mjs skriver beslutsfilen även när den går ut rött (motprov: utan variabeln ingen fil)', () => {
    const d = mkdtempSync(join(tmpdir(), 'verify-'));
    const kor = (env) => {
      try { execFileSync('node', ['scripts/verify.mjs', 'm365'], { cwd: ROT, env: { ...process.env, VERIFY_TIMEOUT_MS: '1', ...env }, stdio: 'pipe', timeout: 30000 }); return 0; }
      catch (e) { return e.status; }
    };
    assert.equal(kor({ VERIFY_STAMPEL_UT: join(d, 'a.json') }), 1, 'en källa utan svar ska ge rött');
    assert.deepEqual(JSON.parse(readFileSync(join(d, 'a.json'), 'utf8')), []);
    // Motprov (andra blickens V4): utan variabeln, i en tom katalog, skrivs ingenting någonstans där.
    const tom = mkdtempSync(join(tmpdir(), 'verify-tom-'));
    const env = { ...process.env, VERIFY_TIMEOUT_MS: '1' };
    delete env.VERIFY_STAMPEL_UT;
    try { execFileSync('node', [join(ROT, 'scripts/verify.mjs'), 'm365'], { cwd: tom, env, stdio: 'pipe', timeout: 30000 }); } catch { /* rött väntat */ }
    assert.deepEqual(readdirSync(tom), []);
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
    // stampla.mjs läser registret (lib/verifiers) för att pröva besluten, alltså följer lib/ och agents/ med.
    for (const k of ['lib', 'agents']) cpSync(join(ROT, k), join(bygg, k), { recursive: true });
    for (const f of ['scripts/stampla.mjs', 'scripts/stampelvakt.mjs']) {
      mkdirSync(join(bygg, f, '..'), { recursive: true });
      copyFileSync(join(ROT, f), join(bygg, f));
    }
    sh(`git init -q -b main && git -c user.email=t@t -c user.name=t commit -qm bas --allow-empty && git add -A && git -c user.email=t@t -c user.name=t commit -qm prisbok && git remote add origin ${fjarr} && git push -q origin main`, bygg);
    const klon = join(tmp, 'klon');
    sh(`git clone -q ${fjarr} ${klon}`, tmp);
    const beslut = join(tmp, 'beslut');
    mkdirSync(beslut);
    const idag = new Date().toISOString().slice(0, 10);
    const m365Beslut = (datum) => JSON.stringify([{ kalla: 'm365', datum, nycklar: ['business-basic', 'e3'], kategori: null, prisbokAvtryck: AVTRYCK }]);
    writeFileSync(join(beslut, 'stampel-m365.json'), m365Beslut(idag));
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

    // Ett beslut daterat i morgon: rött, main orörd (V3 — framtidsdatumet prövas i pushvägen).
    const imorgon = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    writeFileSync(join(beslut, 'stampel-m365.json'), m365Beslut(imorgon));
    const framtid = kor();
    assert.equal(framtid.kod, 1, `ett framtida datum gick ut ${framtid.kod}:\n${framtid.ut}`);
    assert.match(framtid.ut, /utanför körningens fönster/);
    assert.equal(sh('git rev-list --count main', fjarr).trim(), '3');

    // K1: en PR ändrar ett pris efter verifieringen. Stämpeln uteblir — grönt, med varning, main får
    // ingen stämpel på det overifierade priset. (Granskarens repro: E3 416,77 → 499,00 fick dagens datum.)
    const igar = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    writeFileSync(join(beslut, 'stampel-m365.json'), m365Beslut(igar));
    sh('git fetch -q origin && git reset -q --hard origin/main', klon);
    const e3 = "msrpMonthly: 500.12, msrpAnnual: 416.77";
    const nuvarande = readFileSync(join(klon, STAMPELFIL), 'utf8');
    assert.ok(nuvarande.includes(e3), 'E3-raden ser inte ut som väntat — testet prövar inget');
    writeFileSync(join(klon, STAMPELFIL), nuvarande.replace(e3, "msrpMonthly: 600.00, msrpAnnual: 499.00"));
    sh('git -c user.email=t@t -c user.name=t commit -qam "pris ändrat" && git push -q origin main', klon);
    const efterPris = huvud();
    const k1 = kor();
    assert.equal(k1.kod, 0, k1.ut);
    assert.match(k1.ut, /prisboken har ändrats sedan verifieringen/);
    assert.equal(huvud(), efterPris, 'en stämpel landade på ett pris som aldrig verifierades');
  });

  test('SP-08 · ett beslut läggs bara på den prisbok som verifierades (motprov: en annan stämpel stör inte)', () => {
    const pris = 'msrpMonthly: 160.58, msrpAnnual: 133.82, arvoAnnual: 133.82,';
    assert.ok(PRISBOK.includes(pris));
    const andradPris = PRISBOK.replace(pris, pris.replace('133.82, arvoAnnual', '119.48, arvoAnnual'));
    const r = tillampaStamplar(andradPris, allaBeslut, { register: REGISTER, idag: DAG });
    assert.deepEqual(r.andrade, []);
    assert.equal(r.hoppade.length, allaBeslut.length);
    // Motprov: en annan körnings stämpel har flyttat datum på main — avtrycket är detsamma, stämpeln läggs på.
    const annanStampel = tillampaStamplar(PRISBOK, [beslutFor(M365, '2098-01-01')], { register: REGISTER, idag: '2098-01-01' }).kalla;
    assert.notEqual(annanStampel, PRISBOK);
    assert.equal(prisbokAvtryck(annanStampel), AVTRYCK);
    const r2 = tillampaStamplar(annanStampel, allaBeslut, { register: REGISTER, idag: DAG });
    assert.equal(r2.hoppade.length, 0);
    assert.equal(r2.andrade.length, 28);
  });

  test('SP-09 · ett beslut stämplar bara det källan deklarerat, inom körningens fönster, i sin egen fil', () => {
    const p = (b, idag = DAG) => () => tillampaStamplar(PRISBOK, [b], { register: REGISTER, idag });
    const slack = VERIFIERS.find((v) => v.id === 'slack');
    assert.throws(p({ ...beslutFor(M365), nycklar: [...M365.bevakadeTiers, ...slack.bevakadeTiers] }), /har inte deklarerat slack-pro/);
    assert.throws(p({ ...beslutFor(M365), kategori: 'mobil' }), /bevakar inte kategorin/);
    assert.throws(p(beslutFor(M365, '2098-12-23')), /utanför körningens fönster/, `${FONSTER_DAGAR + 1} dygn gammalt`);
    assert.throws(p(beslutFor(M365, '2099-01-02')), /utanför körningens fönster/);
    assert.doesNotThrow(p(beslutFor(M365, '2098-12-24')), `${FONSTER_DAGAR} dygn bakåt ska släppas`);
    assert.throws(p({ ...beslutFor(M365), prisbokAvtryck: undefined }), /saknar prisbokens avtryck/);
    assert.throws(() => tillampaStamplar(PRISBOK, [beslutFor(M365)], { idag: DAG }), /registret saknas/);
    // Filen bär källans namn: ett m365-beslut i stampel-adobe.json fäller hela stämpeln.
    const d = mkdtempSync(join(tmpdir(), 'stampla-fil-'));
    // Avtrycket kan aldrig matcha: går namnkontrollen sönder ska testet falla, aldrig stämpla den riktiga prisboken.
    writeFileSync(join(d, 'stampel-adobe.json'), JSON.stringify([beslutFor(M365, new Date().toISOString().slice(0, 10), '0'.repeat(64))]));
    let kod = 0, ut = '';
    try { execFileSync('node', [join(ROT, 'scripts/stampla.mjs'), d], { cwd: tmpdir(), encoding: 'utf8', stdio: 'pipe' }); }
    catch (e) { kod = e.status; ut = `${e.stdout}${e.stderr}`; }
    assert.equal(kod, 1); assert.match(ut, /annan källas namn/);
  });

  test('SP-10 · vaktens CLI räknar «i dag» själv: ett datum i morgon fäller, i dag släpps', () => {
    const rad = "currency: 'SEK', lastVerified: '2026-10-05', source: 'microsoft.com',";
    const kor = (datum) => {
      const r = repoMed(PRISBOK);
      r.diffEfter(PRISBOK.replace(rad, rad.replace('2026-10-05', datum)));
      try { execFileSync('node', [join(ROT, 'scripts/stampelvakt.mjs'), 'HEAD~1'], { cwd: r.dir, stdio: 'pipe' }); return 0; }
      catch (e) { return e.status; }
    };
    assert.equal(kor(new Date(Date.now() + 86400000).toISOString().slice(0, 10)), 1);
    assert.equal(kor(new Date().toISOString().slice(0, 10)), 0, 'motprov: dagens datum ska släppas');
  });

  test('SP-11 · botnyckeln läses bara av stampla-jobbet (och av sonden som prövar att den finns)', () => {
    const dir = join(ROT, '.github/workflows');
    const lasare = [];
    for (const f of readdirSync(dir).filter((x) => /\.ya?ml$/.test(x))) {
      for (const j of jobbIArbetsflode(readFileSync(join(dir, f), 'utf8'))) {
        if (j.hemligheter.includes('BOT_DEPLOY_KEY')) lasare.push(`${f}#${j.jobb}`);
      }
    }
    assert.deepEqual(lasare.sort(), ['probe-hemligheter.yml#sond', 'probe-hemligheter.yml#utan-miljo', 'verify-sources.yml#stampla'],
      'nyckeln förbi grenskyddet får bara nå jobbet som kör stampelvakten före varje push');
    // Sonden läser den bara för att pröva närvaron: skriptet startar inga processer (alltså ingen git/ssh).
    assert.doesNotMatch(readFileSync(join(ROT, 'scripts/probe-hemligheter.mjs'), 'utf8'), /child_process|\bexecFile|\bspawn\(/);
  });
});
