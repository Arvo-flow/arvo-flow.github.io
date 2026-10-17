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
//   som Actions kör det, pushar fel sak, pushar förbi vakten eller går grönt på ett nej (SP-07); att
//   diagnossteget bara fungerar i bash 4+ (SP-12, körs i bash och sh); att producentens avtryck är fel
//   eller saknar facit (SP-13); att en artefakt bär en annan källas fil (SP-14).
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
import { tillampaStamplar, prisbokAvtryck, nyttBeslut, lasBeslut, DATUMFALT, FONSTER_DAGAR } from '../scripts/stampla.mjs';
import { jobbIArbetsflode } from '../scripts/hemlighetsbindning.mjs';
import { VERIFIERS } from '../lib/verifiers/registry.mjs';

const ROT = new URL('..', import.meta.url).pathname;
// ── PRISBOKENS STRUKTUR ÄR DEN RIKTIGA, DATUMEN ÄR FRYSTA (fabrikssvepet 2026-10-16) ──────────
// Testerna läste den levande filens datum, och stämpeljobbet flyttar dem på main varje vecka.
// Grinden föll på main (körning 38145142748, 11 okt): SP-03 letade efter '2026-10-05' som botten
// redan flyttat, och SP-07/SP-10 stämplade till «i dag» på en bok som botten stämplat samma dag,
// så diffen blev tom. Vakten var rätt, testet var fastnålat vid data som ändras av design.
// Samma mönster som stampla.mjs avtryck använder (importerat, inte kopierat), så avtrycket är detsamma
// som den levande bokens.
const BAS_DATUM = '2026-01-01';
const frysDatum = (kalla) => kalla.replace(DATUMFALT, `lastVerified:$1'${BAS_DATUM}'`);
const PRISBOK = frysDatum(readFileSync(join(ROT, STAMPELFIL), 'utf8'));
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
const stamplad = tillampaStamplar(PRISBOK, allaBeslut, { register: REGISTER, idag: DAG, verifierad: AVTRYCK });
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
    const rad = `currency: 'SEK', lastVerified: '${BAS_DATUM}', source: 'microsoft.com',`;
    assert.ok(PRISBOK.includes(rad), 'M365-raden ser inte ut som väntat — testet prövar inget');
    const med = (d) => granskaStampeldiff(repoMed(PRISBOK).diffEfter(PRISBOK.replace(rad, rad.replace(BAS_DATUM, d))), { idag: '2026-10-10' });
    assert.equal(med('2026-10-10').ok, true, 'motprov: ett datum framåt till i dag ska släppas');
    assert.match(med('2025-12-31').skal, /bakåt/);
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
    const u5 = granskaStampeldiff(repoMed(med).diffEfter(`${tillampaStamplar(med, allaBeslut.map((b) => ({ ...b, prisbokAvtryck: prisbokAvtryck(med) })), { register: REGISTER, idag: DAG, verifierad: prisbokAvtryck(med) }).kalla.replace('\n-- 133.82\n', '\n++ 999.00\n')}`), { idag: DAG });
    assert.equal(u5.ok, false, `«-- 133.82» → «++ 999.00» släpptes: ${u5.skal}`);
    assert.equal(granskaStampeldiff(`diff --git a/${STAMPELFIL} b/${STAMPELFIL}\nnew file mode 100644\n`, { idag: DAG }).ok, false);
    assert.equal(granskaStampeldiff('något helt annat\n', { idag: DAG }).ok, false);
    assert.throws(() => tillampaStamplar(PRISBOK, [{ kalla: 'x', datum: 'igår', nycklar: [] }], { register: REGISTER, idag: DAG, verifierad: AVTRYCK }), /okänd källa/);
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
    writeFileSync(join(bygg, STAMPELFIL), PRISBOK);
    for (const f of ['scripts/stampla.mjs', 'scripts/stampelvakt.mjs']) {
      mkdirSync(join(bygg, f, '..'), { recursive: true });
      copyFileSync(join(ROT, f), join(bygg, f));
    }
    sh(`git init -q -b main && git -c user.email=t@t -c user.name=t commit -qm bas --allow-empty && git add -A && git -c user.email=t@t -c user.name=t commit -qm prisbok && git remote add origin ${fjarr} && git push -q origin main`, bygg);
    const klon = join(tmp, 'klon');
    sh(`git clone -q ${fjarr} ${klon}`, tmp);
    const beslut = join(tmp, 'beslut');
    // Artefaktens form efter nedladdning med merge-multiple: false: stampel-<id>/stampel-<id>.json (V3).
    mkdirSync(join(beslut, 'stampel-m365'), { recursive: true });
    const m365Fil = join(beslut, 'stampel-m365', 'stampel-m365.json');
    const idag = new Date().toISOString().slice(0, 10);
    const m365Beslut = (datum, avtryck = AVTRYCK) => JSON.stringify([{ kalla: 'm365', datum, nycklar: ['business-basic', 'e3'], kategori: null, prisbokAvtryck: avtryck }]);
    writeFileSync(m365Fil, m365Beslut(idag));
    // VERIFIERAD_AVTRYCK är discover-jobbets avtryck av den prisbok matrisen verifierade (V2).
    const kor = (verifierad = AVTRYCK) => {
      const env = { ...process.env, BESLUT: beslut, STAMPEL_VANTA_S: '0', VERIFIERAD_AVTRYCK: verifierad };
      try { return { kod: 0, ut: execFileSync('bash', ['-e', '-c', skript.join('\n')], { cwd: klon, env, encoding: 'utf8', stdio: 'pipe' }) }; }
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

    // V1 (tredje blicken): push nekas OCH main går inte att hämta efteråt. Förr gav `fetch && reset`
    // under bash -e ett tyst «inga datum att flytta», exit 0. Nu rött. Klonen pekar på en symlänk som
    // kroken tar bort, så nästa fetch inte når något.
    const lank = join(tmp, 'fjarr-lank.git');
    sh(`ln -s ${fjarr} ${lank} && git remote set-url origin ${lank}`, klon);
    writeFileSync(join(fjarr, 'hooks/pre-receive'), `#!/bin/sh\nrm -f ${lank}\necho "GH006" >&2\nexit 1\n`);
    const borta = kor();
    assert.equal(borta.kod, 1, `push och fetch nekade gick ut ${borta.kod}:\n${borta.ut}`);
    assert.match(borta.ut, /::error::main gick inte att hämta/);
    assert.equal(huvud(), fore);
    sh(`git remote set-url origin ${fjarr} && git fetch -q origin && git reset -q --hard origin/main`, klon);

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
    writeFileSync(m365Fil, m365Beslut(imorgon));
    const framtid = kor();
    assert.equal(framtid.kod, 1, `ett framtida datum gick ut ${framtid.kod}:\n${framtid.ut}`);
    assert.match(framtid.ut, /utanför körningens fönster/);
    assert.equal(sh('git rev-list --count main', fjarr).trim(), '3');

    // V2 (tredje blicken): ett beslut med fel avtryck är ett instrumentfel, inte en prisändring. Förr
    // gav det ett grönt jobb med varning varje vecka. Nu rött, main orörd. Och utan facit stämplas inget.
    writeFileSync(m365Fil, m365Beslut(idag, 'f'.repeat(64)));
    sh('git fetch -q origin && git reset -q --hard origin/main', klon);
    const fel = kor();
    assert.equal(fel.kod, 1, `ett beslut med fel avtryck gick ut ${fel.kod}:\n${fel.ut}`);
    assert.match(fel.ut, /instrumentfel/);
    const utanFacit = kor('');
    assert.equal(utanFacit.kod, 1, `utan VERIFIERAD_AVTRYCK gick ut ${utanFacit.kod}:\n${utanFacit.ut}`);
    assert.match(utanFacit.ut, /avtrycket av den verifierade prisboken saknas/);
    assert.equal(sh('git rev-list --count main', fjarr).trim(), '3');

    // K1: en PR ändrar ett pris efter verifieringen. Stämpeln uteblir — grönt, med varning, main får
    // ingen stämpel på det overifierade priset. (Granskarens repro: E3 416,77 → 499,00 fick dagens datum.)
    const igar = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    writeFileSync(m365Fil, m365Beslut(igar));
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
    const r = tillampaStamplar(andradPris, allaBeslut, { register: REGISTER, idag: DAG, verifierad: AVTRYCK });
    assert.deepEqual(r.andrade, []);
    assert.equal(r.hoppade.length, allaBeslut.length);
    // Motprov: en annan körnings stämpel har flyttat datum på main — avtrycket är detsamma, stämpeln läggs på.
    const annanStampel = tillampaStamplar(PRISBOK, [beslutFor(M365, '2098-01-01')], { register: REGISTER, idag: '2098-01-01', verifierad: AVTRYCK }).kalla;
    assert.notEqual(annanStampel, PRISBOK);
    assert.equal(prisbokAvtryck(annanStampel), AVTRYCK);
    const r2 = tillampaStamplar(annanStampel, allaBeslut, { register: REGISTER, idag: DAG, verifierad: AVTRYCK });
    assert.equal(r2.hoppade.length, 0);
    assert.equal(r2.andrade.length, 28);

    // V5 (tredje blicken): ett värde på SAMMA rad som datumet flyttar avtrycket. Raderna bär currency
    // och sekPublic bredvid lastVerified, och att maska hela raden fällde förr 0 tester.
    const rad = `currency: 'SEK', lastVerified: '${BAS_DATUM}', source: 'microsoft.com',`;
    assert.ok(PRISBOK.includes(rad), 'M365-raden ser inte ut som väntat — testet prövar inget');
    assert.notEqual(prisbokAvtryck(PRISBOK.replace(rad, rad.replace("currency: 'SEK'", "currency: 'USD'"))), AVTRYCK,
      'en valuta bredvid datumet ändrades utan att avtrycket rörde sig');
    // Och datumvärdet läses inom raden: ett citattecken som inte stängs på raden får aldrig maska nästa
    // rad. Med `[^']*` spände masken till nästa citattecken och dolde priset emellan.
    const oppen = "x: { lastVerified: '2026-01-01\n  msrpAnnual: 133.82, note: 'a' },\n";
    assert.notEqual(prisbokAvtryck(oppen), prisbokAvtryck(oppen.replace('133.82', '119.48')), 'masken spände över en radbrytning');
  });

  test('SP-09 · ett beslut stämplar bara det källan deklarerat, inom körningens fönster, i sin egen fil', () => {
    const p = (b, idag = DAG) => () => tillampaStamplar(PRISBOK, [b], { register: REGISTER, idag, verifierad: AVTRYCK });
    const slack = VERIFIERS.find((v) => v.id === 'slack');
    assert.throws(p({ ...beslutFor(M365), nycklar: [...M365.bevakadeTiers, ...slack.bevakadeTiers] }), /har inte deklarerat slack-pro/);
    assert.throws(p({ ...beslutFor(M365), kategori: 'mobil' }), /bevakar inte kategorin/);
    assert.throws(p(beslutFor(M365, '2098-12-23')), /utanför körningens fönster/, `${FONSTER_DAGAR + 1} dygn gammalt`);
    assert.throws(p(beslutFor(M365, '2099-01-02')), /utanför körningens fönster/);
    assert.doesNotThrow(p(beslutFor(M365, '2098-12-24')), `${FONSTER_DAGAR} dygn bakåt ska släppas`);
    assert.throws(p({ ...beslutFor(M365), prisbokAvtryck: undefined }), /saknar prisbokens avtryck/);
    assert.throws(() => tillampaStamplar(PRISBOK, [beslutFor(M365)], { idag: DAG, verifierad: AVTRYCK }), /registret saknas/);
    // Filen bär källans namn: ett m365-beslut i stampel-adobe.json fäller hela stämpeln.
    const d = mkdtempSync(join(tmpdir(), 'stampla-fil-'));
    mkdirSync(join(d, 'stampel-adobe'));
    // Avtrycket kan aldrig matcha main: går namnkontrollen sönder ska testet falla, aldrig stämpla den riktiga prisboken.
    const NOLL = '0'.repeat(64);
    writeFileSync(join(d, 'stampel-adobe', 'stampel-adobe.json'), JSON.stringify([beslutFor(M365, new Date().toISOString().slice(0, 10), NOLL)]));
    let kod = 0, ut = '';
    try { execFileSync('node', [join(ROT, 'scripts/stampla.mjs'), d], { cwd: tmpdir(), encoding: 'utf8', stdio: 'pipe', env: { ...process.env, VERIFIERAD_AVTRYCK: NOLL } }); }
    catch (e) { kod = e.status; ut = `${e.stdout}${e.stderr}`; }
    assert.equal(kod, 1); assert.match(ut, /annan källas namn/);
  });

  test('SP-10 · vaktens CLI räknar «i dag» själv: ett datum i morgon fäller, i dag släpps', () => {
    const rad = `currency: 'SEK', lastVerified: '${BAS_DATUM}', source: 'microsoft.com',`;
    assert.ok(PRISBOK.includes(rad), 'M365-raden ser inte ut som väntat — testet prövar inget');
    const kor = (datum) => {
      const r = repoMed(PRISBOK);
      r.diffEfter(PRISBOK.replace(rad, rad.replace(BAS_DATUM, datum)));
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

  test('SP-12 · diagnossteget säger vad som är fel med botnyckeln, skriver aldrig ut den och raderar filen', () => {
    const yaml = readFileSync(join(ROT, '.github/workflows/verify-sources.yml'), 'utf8');
    const rader = yaml.split('\n');
    const i = rader.findIndex((r) => r.includes('- name: Botnyckeln känns igen av GitHub'));
    const r0 = rader.findIndex((r, j) => j > i && /^ {8}run: \|$/.test(r));
    assert.ok(i > 0 && r0 > i, 'diagnossteget hittades inte');
    const skript = [];
    for (let j = r0 + 1; j < rader.length && (rader[j] === '' || rader[j].startsWith('          ')); j++) skript.push(rader[j].slice(10));
    // Steget ligger före utcheckningen, så att felet beskrivs innan git säger «Permission denied».
    assert.ok(i < rader.findIndex((r) => r.includes('- name: Checka ut main med botnyckeln')));

    // ssh och ssh-keygen finns inte i sviten: stubbar som svarar som de riktiga.
    const tmp = mkdtempSync(join(tmpdir(), 'botnyckel-'));
    const bin = join(tmp, 'bin');
    mkdirSync(bin);
    writeFileSync(join(bin, 'ssh-keygen'), `#!/bin/sh
case "$1" in
  -y) grep -q 'BEGIN OPENSSH PRIVATE KEY' "$3" && { echo 'ssh-ed25519 AAAAPUBLIK arvo-verify-bot'; exit 0; }; echo 'Load key: invalid format' >&2; exit 1 ;;
  -lf) echo '256 SHA256:FingeravtryckXYZ arvo-verify-bot (ED25519)'; exit 0 ;;
esac
exit 2
`);
    writeFileSync(join(bin, 'ssh'), '#!/bin/sh\necho "$FAKE_SSH_SVAR" >&2\nexit 1\n');
    chmodSync(join(bin, 'ssh-keygen'), 0o755);
    chmodSync(join(bin, 'ssh'), 0o755);
    const HEMLIG = 'HEMLIGNYCKELKROPP0123456789';
    const PRIVAT = `-----BEGIN OPENSSH PRIVATE KEY-----\n${HEMLIG}\n-----END OPENSSH PRIVATE KEY-----`; // hemlighet-ok: påhittad nyckelkropp för stubben, inget nyckelmaterial
    // Steget körs i två skal. Actions kör bash 5, men sviten körs också på Mac, där bash är 3.2 och
    // saknar bash 4-former som ${X,,}: SP-12 föll där 17 okt medan Linux var grönt. `sh` är dash på
    // Linux och bash 3.2 i POSIX-läge på Mac, så en bash 4-form fäller här på båda.
    for (const skal of ['bash', 'sh']) {
      const kor = (nyckel, svar) => {
        const temp = mkdtempSync(join(tmp, 'runner-'));
        const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, RUNNER_TEMP: temp, BOT_DEPLOY_KEY: nyckel,
          GITHUB_REPOSITORY: 'Arvo-flow/arvo-flow.github.io', FAKE_SSH_SVAR: svar };
        let kod = 0, ut = '';
        try { ut = execFileSync(skal, ['-e', '-c', skript.join('\n')], { env, encoding: 'utf8', stdio: 'pipe' }); }
        catch (e) { kod = e.status; ut = `${skal}: ${e.stdout}${e.stderr}`; }
        return { kod, ut, kvar: readdirSync(temp) };
      };

      const ok = kor(PRIVAT, "Hi Arvo-flow/arvo-flow.github.io! You've successfully authenticated, but GitHub does not provide shell access.");
      assert.equal(ok.kod, 0, ok.ut);
      assert.match(ok.ut, /✓ GitHub känner igen nyckeln/);
      assert.match(ok.ut, /SHA256:FingeravtryckXYZ/);

      const okand = kor(PRIVAT, 'git@github.com: Permission denied (publickey).');
      assert.equal(okand.kod, 1);
      assert.match(okand.ut, /::error::GitHub känner inte igen nyckeln \(256 SHA256:FingeravtryckXYZ/);

      const annat = kor(PRIVAT, "Hi Arvo-flow/annat-repo! You've successfully authenticated, but GitHub does not provide shell access.");
      assert.equal(annat.kod, 1);
      assert.match(annat.ut, /::error::Nyckeln hör till något annat än Arvo-flow\/arvo-flow\.github\.io/);

      const publik = kor('ssh-ed25519 AAAAPUBLIK arvo-verify-bot', 'spelar ingen roll');
      assert.equal(publik.kod, 1);
      assert.match(publik.ut, /::error::BOT_DEPLOY_KEY är ingen läsbar privat nyckel/);

      // Motprov: GitHub skriver repots namn med andra versaler än GITHUB_REPOSITORY — fortfarande rätt nyckel.
      const versaler = kor(PRIVAT, "Hi arvo-flow/Arvo-Flow.github.io! You've successfully authenticated.");
      assert.equal(versaler.kod, 0, versaler.ut);

      for (const r of [ok, okand, annat, publik, versaler]) {
        assert.doesNotMatch(r.ut, new RegExp(HEMLIG), 'den privata nyckeln skrevs ut');
        assert.deepEqual(r.kvar, [], `nyckelfiler ligger kvar: ${r.kvar}`);
      }
    }
  });

  test('SP-13 · beslutets avtryck är den verifierade prisbokens, räknat av producenten och prövat mot discover-jobbets', () => {
    // Producenten → konsumenten: nyttBeslut räknar avtrycket ur prisbokens text, och tillampaStamplar
    // lägger på beslutet när facit är samma text. Tredje blickens S5–S7 (fel värde, saknat fält, rå
    // sha256) fällde förr 0 tester, eftersom testerna byggde sina beslut själva.
    const datum = '2099-01-01';
    const b = nyttBeslut({ kalla: 'm365', datum, nycklar: M365.bevakadeTiers, prisbok: PRISBOK });
    assert.equal(b.prisbokAvtryck, prisbokAvtryck(PRISBOK));
    assert.equal(b.kategori, null);
    const r = tillampaStamplar(PRISBOK, [b], { register: REGISTER, idag: datum, verifierad: prisbokAvtryck(PRISBOK) });
    assert.deepEqual(r.hoppade, []);
    assert.equal(r.andrade.length, M365.bevakadeTiers.length, `producentens beslut stämplade ${r.andrade}`);
    // Avtrycket är datumoberoende: en bok som botten redan stämplat ger samma beslut.
    assert.equal(nyttBeslut({ kalla: 'm365', datum, nycklar: [], prisbok: r.kalla }).prisbokAvtryck, b.prisbokAvtryck);
    assert.throws(() => nyttBeslut({ kalla: 'm365', datum, nycklar: [] }), /prisbokens text saknas/);

    // Ett beslut med ett annat avtryck än facit är ett instrumentfel och stoppar allt — aldrig en
    // varning i ett grönt jobb. Motprov: samma beslut mot rätt facit stämplar (ovan).
    const annanBok = PRISBOK.replace('msrpMonthly: 160.58', 'msrpMonthly: 160.59');
    assert.notEqual(annanBok, PRISBOK);
    const felBeslut = nyttBeslut({ kalla: 'm365', datum, nycklar: M365.bevakadeTiers, prisbok: annanBok });
    assert.throws(() => tillampaStamplar(PRISBOK, [felBeslut], { register: REGISTER, idag: datum, verifierad: prisbokAvtryck(PRISBOK) }), /instrumentfel/);
    for (const verifierad of [undefined, '', 'x', 'F'.repeat(64)]) {
      assert.throws(() => tillampaStamplar(PRISBOK, [b], { register: REGISTER, idag: datum, verifierad }), /verifierade prisboken saknas/, `facit ${verifierad}`);
    }

    // verify.mjs bygger sina beslut med nyttBeslut ur boken vid start, och sätter aldrig avtrycket själv.
    const verify = readFileSync(join(ROT, 'scripts/verify.mjs'), 'utf8');
    assert.match(verify, /beslut\.push\(nyttBeslut\(\{[^\n]*prisbok: PRISBOK_VID_START \}\)\);/);
    assert.match(verify, /const PRISBOK_VID_START = readFileSync\(BRANCHINDEX_PATH, 'utf8'\);/);
    assert.doesNotMatch(verify, /prisbokAvtryck:/, 'verify.mjs sätter avtrycket själv, förbi producenten');

    // Arbetsflödet: discover räknar avtrycket (en tilldelning på egen rad, så att ett fel fäller steget)
    // och stämpeljobbet får det som facit.
    const yaml = readFileSync(join(ROT, '.github/workflows/verify-sources.yml'), 'utf8');
    const jobb = jobbIArbetsflode(yaml);
    const disc = jobb.find((j) => j.jobb === 'discover');
    assert.match(disc.text, /^ {6}avtryck: \$\{\{ steps\.gen\.outputs\.avtryck \}\}$/m);
    assert.match(disc.text, /^ {10}AVTRYCK=\$\(node scripts\/stampla\.mjs --avtryck\)$/m);
    assert.doesNotMatch(disc.text, /npm (ci|install)/, 'discover får inte köra paket — då vore facit lika osäkert som besluten');
    const st = jobb.find((j) => j.jobb === 'stampla');
    assert.match(st.text, /^ {4}needs: \[discover, verify\]$/m);
    assert.match(st.text, /VERIFIERAD_AVTRYCK: \$\{\{ needs\.discover\.outputs\.avtryck \}\}/);
    // CLI-läget skriver ut samma avtryck som funktionen.
    const cli = execFileSync('node', [join(ROT, 'scripts/stampla.mjs'), '--avtryck'], { encoding: 'utf8' }).trim();
    assert.equal(cli, prisbokAvtryck(readFileSync(join(ROT, STAMPELFIL), 'utf8')));
  });

  test('SP-14 · varje artefakt läses ur sin egen katalog och bär bara sin egen fil', () => {
    const ny = () => mkdtempSync(join(tmpdir(), 'stamplar-'));
    const lagg = (d, katalog, fil, innehall) => {
      mkdirSync(join(d, katalog), { recursive: true });
      writeFileSync(join(d, katalog, fil), JSON.stringify(innehall));
    };
    // Motprov: rätt form läses, och besluten kommer fram oförändrade.
    const rätt = ny();
    lagg(rätt, 'stampel-m365', 'stampel-m365.json', [beslutFor(M365)]);
    lagg(rätt, 'stampel-pipedrive', 'stampel-pipedrive.json', []);
    assert.deepEqual(lasBeslut(rätt), [beslutFor(M365)]);
    assert.deepEqual(lasBeslut(ny()), [], 'ingen artefakt är inga beslut');

    // V3: ett komprometterat jobb laddar upp en katalog med en annan källas fil i stället för sin egen.
    const lurad = ny();
    lagg(lurad, 'stampel-pipedrive', 'stampel-m365.json', [beslutFor(M365)]);
    assert.throws(() => lasBeslut(lurad), /stampel-pipedrive\/ ska bära exakt stampel-pipedrive\.json/);
    // …eller sin egen fil plus en till.
    const extra = ny();
    lagg(extra, 'stampel-pipedrive', 'stampel-pipedrive.json', []);
    lagg(extra, 'stampel-pipedrive', 'stampel-m365.json', [beslutFor(M365)]);
    assert.throws(() => lasBeslut(extra), /ska bära exakt/);
    // En lös fil i roten är den gamla, sammanslagna formen — den läses inte längre.
    const los = ny();
    writeFileSync(join(los, 'stampel-m365.json'), JSON.stringify([beslutFor(M365)]));
    assert.throws(() => lasBeslut(los), /ingen artefaktkatalog/);
    // Rätt fil, fel källa i innehållet.
    const fram = ny();
    lagg(fram, 'stampel-adobe', 'stampel-adobe.json', [beslutFor(M365)]);
    assert.throws(() => lasBeslut(fram), /annan källas namn/);
    const tom = ny();
    mkdirSync(join(tom, 'stampel-m365'));
    assert.throws(() => lasBeslut(tom), /bär ingenting/);

    const yaml = readFileSync(join(ROT, '.github/workflows/verify-sources.yml'), 'utf8');
    const st = jobbIArbetsflode(yaml).find((j) => j.jobb === 'stampla');
    assert.match(st.text, /^ {10}merge-multiple: false$/m);
    // Bara nycklar, inte kommentarer: arbetsflödets egen kommentar nämner den gamla formen.
    assert.doesNotMatch(yaml, /^\s+merge-multiple:\s*true/m);
  });
});
