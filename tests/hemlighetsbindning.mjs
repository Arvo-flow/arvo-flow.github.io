// tests/hemlighetsbindning.mjs — VARJE HEMLIGHET LÄSES BARA I MILJÖN `produktion`, OCH SONDEN PRÖVAR ALLA (2026-10-10)
//
// Granskningen av PR #80: 66 jobb bundna, men två jobb läste ARVO_ADMIN_SECRET och DROPBOX_AUTH_COOKIE utan
// miljön, och läckkontrollen prövade sex av nio namn. Raderas bara de prövade repo-kopiorna ligger de andra
// kvar, läsbara från varje branch — och sonden hade sagt grönt.
//
// FÅNGAR: ett nytt jobb som läser en hemlighet utan miljön (HB-01); ett nytt hemlighetsnamn som sonden inte
//   prövar, eller en sondlista som glidit från arbetsflödena (HB-02); toppnivå-env och `secrets: inherit`
//   (HB-03); en YAML-form som läsaren inte förstår, så att den inte blir grön av tomhet (HB-04); ett
//   produktionsjobb som en push eller PR på en annan gren kan starta — där kan det bara bli rött (HB-05);
//   ett uttryck som läser hemligheter utan att namnge dem, och ett namn i andra versaler (HB-06); ett
//   ✓ för miljön som skrivs fast repo-kopior kan bära värdena (HB-07); en läcksond vars steg kan bli
//   gröna utan att ha prövat något (HB-08).
// BLIND: om hemligheterna FAKTISKT ligger i miljön och är borta från repo-nivån — det är repoinställningar
//   som bara körningen av probe-hemligheter.yml kan mäta. Det här är kodens halva; sonden är den andra.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import {
  jobbIArbetsflode, obundnaJobb, allaHemligheter, hemligheterI, utlosareUtanforMain, lasesDynamiskt,
  ALLA_HEMLIGHETER, KRAVDA_I_PRODUKTION, MOTPROVSJOBB, SKYDDAD_MILJO,
} from '../scripts/hemlighetsbindning.mjs';

const ROT = new URL('..', import.meta.url).pathname;
const DIR = join(ROT, '.github/workflows');
const FLODEN = Object.fromEntries(readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f)).map((f) => [f, readFileSync(join(DIR, f), 'utf8')]));
const envNycklar = (yaml, jobb) => {
  const j = jobbIArbetsflode(yaml).find((x) => x.jobb === jobb);
  assert.ok(j, `jobbet ${jobb} finns inte`);
  return j.hemligheter;
};

describe('HB · hemligheterna läses bara i miljön produktion', () => {
  test('HB-01 · varje jobb som läser en hemlighet är bundet till produktion (utom läckkontrollens motprov)', () => {
    const obundna = obundnaJobb(FLODEN, { undantag: [MOTPROVSJOBB] });
    assert.deepEqual(obundna, [], `jobb som läser hemligheter utan miljön ${SKYDDAD_MILJO}:\n${obundna.map((o) => `  ${o.id} [${o.hemligheter}]`).join('\n')}`);
    // Motprov: undantaget finns och läser verkligen hemligheter — annars är det ett undantag för ingenting.
    assert.ok(obundnaJobb(FLODEN).some((o) => o.id === MOTPROVSJOBB), 'motprovsjobbet läser inga hemligheter — undantaget är dött');
  });

  test('HB-02 · sondens listor är låsta mot arbetsflödena: läckkontrollen prövar varje namn som används', () => {
    assert.deepEqual([...ALLA_HEMLIGHETER].sort(), allaHemligheter(FLODEN),
      'ALLA_HEMLIGHETER och arbetsflödena är oense — ett nytt namn smiter annars förbi läckkontrollen');
    const sond = FLODEN['probe-hemligheter.yml'];
    assert.deepEqual(envNycklar(sond, 'utan-miljo'), [...ALLA_HEMLIGHETER].sort(), 'läckkontrollen får inte varje namn');
    for (const n of KRAVDA_I_PRODUKTION) {
      assert.ok(ALLA_HEMLIGHETER.includes(n), `${n} krävs men finns inte i ALLA`);
      assert.ok(envNycklar(sond, 'sond').includes(n), `sondens produktionsjobb får inte ${n}`);
    }
    const skript = readFileSync(join(ROT, 'scripts/probe-hemligheter.mjs'), 'utf8');
    assert.match(skript, /for \(const n of krav === 'saknas' \? ALLA_HEMLIGHETER : KRAVDA_I_PRODUKTION\)/,
      'sonden prövar inte listorna härifrån');
  });

  test('HB-03 · toppnivå-env räknas till varje jobb och secrets: inherit räknas som allt (motprov: miljön binder)', () => {
    const topp = 'on: push\nenv:\n  X: ${{ secrets.TOPP }}\njobs:\n  a:\n    runs-on: ubuntu-latest\n  b:\n    environment: produktion\n    runs-on: ubuntu-latest\n';
    assert.deepEqual(obundnaJobb({ 't.yml': topp }).map((o) => o.id), ['t.yml#a']);
    const arv = 'on: push\njobs:\n  c:\n    uses: ./.github/workflows/x.yml\n    secrets: inherit\n';
    assert.deepEqual(obundnaJobb({ 'a.yml': arv }), [{ id: 'a.yml#c', hemligheter: ['(secrets: inherit)'] }]);
    const namnform = 'on: push\njobs:\n  d:\n    environment:\n      name: produktion\n    steps:\n      - run: echo ${{ secrets.Y }}\n';
    assert.deepEqual(obundnaJobb({ 'n.yml': namnform }), []);
    assert.deepEqual(hemligheterI('${{ secrets.GITHUB_TOKEN }} ${{ secrets.A_B }}'), ['A_B']);
    // Indexformen och ett citerat jobb-id (V5): det citerade jobbet får inte ärva grannens miljö.
    assert.deepEqual(hemligheterI("${{ secrets['C_D'] }} ${{ secrets[\"E\"] }}"), ['C_D', 'E']);
    const citerat = "on: push\njobs:\n  a:\n    environment: produktion\n    steps:\n      - run: echo ${{ secrets.X }}\n  'b':\n    steps:\n      - run: echo ${{ secrets['Y'] }}\n";
    assert.deepEqual(obundnaJobb({ 'q.yml': citerat }), [{ id: 'q.yml#b', hemligheter: ['Y'] }]);
  });

  test('HB-04 · läsaren hittar varje jobb — en form den inte förstår blir ett fel, inte ett grönt tomt svar', () => {
    let jobb = 0;
    for (const [f, y] of Object.entries(FLODEN)) {
      const rubriker = y.split('\n').slice(y.split('\n').findIndex((r) => /^jobs:/.test(r)) + 1)
        // Bredare än läsarens rubrikmönster med flit: varje nyckel på två blankstegs indrag i jobs-blocket.
        // Samma mönster som läsaren hade varit cirkulärt (andra blickens V5).
        .filter((r) => /^ {2}[^\s#][^:]*:\s*(#.*)?$/.test(r)).length;
      assert.equal(jobbIArbetsflode(y).length, rubriker, `${f}: läsaren hittade inte varje jobb`);
      jobb += rubriker;
    }
    assert.ok(jobb > Object.keys(FLODEN).length, `bara ${jobb} jobb i ${Object.keys(FLODEN).length} flöden`);
    assert.throws(() => jobbIArbetsflode('on: push\njobs: { a: { runs-on: x } }\n'), /jobs/);
    // `jobs:` finns men jobben står i en indentering läsaren inte känner — det får inte bli «0 jobb, allt bundet».
    assert.throws(() => jobbIArbetsflode('on: push\njobs:\n    a:\n      runs-on: x\n'), /jobbrubriker/);
    assert.throws(() => jobbIArbetsflode('name: x\n'), /jobs/);
  });

  test('HB-05 · ett arbetsflöde med ett produktionsjobb startas aldrig av en push eller PR på en annan gren', () => {
    const fel = [];
    let medMiljo = 0;
    for (const [f, y] of Object.entries(FLODEN)) {
      if (!jobbIArbetsflode(y).some((j) => j.miljo === SKYDDAD_MILJO)) continue;
      medMiljo++;
      const u = utlosareUtanforMain(y);
      if (u.length) fel.push(`${f} [${u}]`);
    }
    assert.ok(medMiljo > 50, `bara ${medMiljo} flöden med produktionsjobb — läsaren hittar dem inte`);
    assert.deepEqual(fel, [], `produktionsjobb som startas utanför main (miljön nekar dem, alltså bara rött):\n  ${fel.join('\n  ')}`);
    // Motprov: läsaren kan svara ja, i varje form.
    const m = (on) => utlosareUtanforMain(`on:\n${on}\njobs:\n  a:\n    runs-on: x\n`);
    assert.deepEqual(m('  push:\n    paths:\n      - x'), ['push']);
    assert.deepEqual(m("  push:\n    branches:\n      - main\n      - 'claude/**'"), ['push']);
    assert.deepEqual(m('  push:\n    branches: [main, dev]'), ['push']);
    assert.deepEqual(m('  pull_request:\n    branches: [main]'), ['pull_request']);
    assert.deepEqual(m('  push:\n    branches: [main]\n  workflow_dispatch:'), []);
    assert.deepEqual(m("  push:\n    branches:\n      - 'main'"), []);
    assert.deepEqual(utlosareUtanforMain('on: [push, workflow_dispatch]\njobs:\n  a:\n    runs-on: x\n'), ['push']);
  });

  test('HB-06 · ett uttryck som läser hemligheter utan namn räknas som alla, och versalerna räknas inte', () => {
    // Tredje blickens V4, mätt 2026-10-11: obundnaJobb gav [] för ett jobb utan miljö med
    // ${{ toJSON(secrets) }} och för secrets[format(…)]. Läckkontrollen och SP-11 såg dem inte.
    const jobb = (rad, miljo = '') => `on: push\njobs:\n  x:\n${miljo}    steps:\n      - run: echo "${rad}"\n`;
    const dynamiska = ['${{ toJSON(secrets) }}', '${{ toJson( secrets ) }}', "${{ secrets[format('{0}_{1}', 'BOT', 'KEY')] }}",
      '${{ secrets[matrix.namn] }}', '${{ secrets }}', '${{ fromJSON(toJSON(secrets)).X }}'];
    for (const rad of dynamiska) {
      assert.equal(lasesDynamiskt(rad), true, rad);
      assert.deepEqual(obundnaJobb({ 'd.yml': jobb(rad) }), [{ id: 'd.yml#x', hemligheter: ['(alla, via ett onamngivet uttryck)'] }], rad);
      assert.deepEqual(obundnaJobb({ 'd.yml': jobb(rad, '    environment: produktion\n') }), [], `${rad} i produktion är bundet`);
    }
    // Toppnivåns env räknas till varje jobb, även i den dynamiska formen.
    assert.equal(jobbIArbetsflode('on: push\nenv:\n  ALLT: ${{ toJSON(secrets) }}\njobs:\n  a:\n    runs-on: x\n')[0].dynamisk, true);
    // Motprov: ett namngivet uttryck, ett annat sammanhangs fält och text utanför ett uttryck är inte dynamiska.
    for (const rad of ['${{ secrets.X }}', "${{ secrets['X'] }}", '${{ secrets . X }}', '${{ inputs.secrets }}', '# toJSON(secrets)', 'secrets: inherit']) {
      assert.equal(lasesDynamiskt(rad), false, rad);
    }
    assert.deepEqual(obundnaJobb({ 'n.yml': jobb('${{ secrets.X }}') }), [{ id: 'n.yml#x', hemligheter: ['X'] }]);
    // Versalerna: SECRETS.x är samma hemlighet som secrets.X.
    assert.deepEqual(hemligheterI('${{ SECRETS.bot_deploy_key }} ${{ Secrets["Cron_Secret"] }}'), ['BOT_DEPLOY_KEY', 'CRON_SECRET']);

    // Andra blicken 18 okt, mätt med fixturer: formerna nedan läste en hemlighet och syntes inte.
    assert.equal(lasesDynamiskt('${{ toJSON(SECRETS) }}'), true, 'versaler i den dynamiska formen');
    assert.equal(lasesDynamiskt('${{ toJSON(\n  secrets) }}'), true, 'ett uttryck över två rader');
    assert.deepEqual(hemligheterI('${{ secrets . X }}'), ['X'], 'blanksteg kring punkten är fortfarande ett namn');
    assert.deepEqual(hemligheterI('${{ inputs.secrets.X }}'), [], 'motprov: ett annat sammanhangs fält är ingen hemlighet');
    // Ett `}}` i en strängliteral avslutar inte uttrycket, inte heller efter ett '' (ett citattecken).
    assert.equal(lasesDynamiskt("${{ format('}}', toJSON(secrets)) }}"), true);
    assert.equal(lasesDynamiskt("${{ format('it''s }}', toJSON(secrets)) }}"), true);
    assert.equal(lasesDynamiskt("${{ inputs.n || '}}' }} ${{ secrets.X }}"), false);
    // YAML avkodar dubbelciterade skalärer innan GitHub ser uttrycket.
    assert.deepEqual(hemligheterI('"${{ s\\u0065crets.BOT_DEPLOY_KEY }}"'), ['BOT_DEPLOY_KEY']);
    assert.ok(hemligheterI('"${{ secrets.BOT_DEPLOY_\\\n      KEY }}"').includes('BOT_DEPLOY_KEY'), 'en skarvad rad');
    assert.equal(lasesDynamiskt('"${{ toJSON(s\\u0065crets) }}"'), true, 'den dynamiska formen, escapad');
    // Citerat inherit, och en toppnivå-env som står EFTER jobs.
    for (const arv of ["secrets: 'inherit'", 'secrets: "inherit"', 'secrets: inherit # alla']) {
      assert.deepEqual(obundnaJobb({ 'i.yml': `on: push\njobs:\n  c:\n    uses: ./x.yml\n    ${arv}\n` }), [{ id: 'i.yml#c', hemligheter: ['(secrets: inherit)'] }], arv);
    }
    assert.deepEqual(obundnaJobb({ 'e.yml': 'on: push\njobs:\n  a:\n    runs-on: x\nenv:\n  K: ${{ secrets.BOT_DEPLOY_KEY }}\n' }),
      [{ id: 'e.yml#a', hemligheter: ['BOT_DEPLOY_KEY'] }]);
    assert.equal(jobbIArbetsflode('on: push\njobs:\n  a:\n    runs-on: x\nenv:\n  K: ${{ toJSON(secrets) }}\n')[0].dynamisk, true);
    // En kommentar i kolumn 0 inne i jobs avslutar inte blocket: jobbet efter den läses.
    assert.deepEqual(jobbIArbetsflode('on: push\njobs:\n  a:\n    runs-on: x\n# kommentar\n  b:\n    env:\n      K: ${{ secrets.X }}\n').map((j) => j.jobb), ['a', 'b']);
    // I dag läser inget arbetsflöde hemligheter dynamiskt (avläst 2026-10-17).
    assert.deepEqual(Object.entries(FLODEN).flatMap(([f, y]) => jobbIArbetsflode(y).filter((j) => j.dynamisk).map((j) => `${f}#${j.jobb}`)), []);
  });

  test('HB-07 · sonden kallar miljön bevisad bara när läckkontrollen var grön (ett miljöjobb ser också repo-hemligheter)', () => {
    // 17 okt: «✓ Miljön produktion bär de 6» medan ARVO_ADMIN_SECRET bara låg på repo-nivå. När
    // repo-kopiorna raderades föll sonden på just den (körning 39068005452).
    const kor = (extra) => {
      const env = { PATH: process.env.PATH, HOME: process.env.HOME, ...extra };
      try { return { kod: 0, ut: execFileSync('node', [join(ROT, 'scripts/probe-hemligheter.mjs'), '--krav=satt'], { env, encoding: 'utf8', stdio: 'pipe' }) }; }
      catch (e) { return { kod: e.status, ut: `${e.stdout}${e.stderr}` }; }
    };
    const alla = Object.fromEntries(KRAVDA_I_PRODUKTION.map((n) => [n, 'x']));
    const gron = kor({ ...alla, LACKKONTROLL: 'success' });
    assert.equal(gron.kod, 0, gron.ut);
    assert.match(gron.ut, /✓ Miljön produktion bär/);
    for (const utfall of ['failure', 'skipped', 'cancelled', undefined]) {
      const r = kor(utfall ? { ...alla, LACKKONTROLL: utfall } : alla);
      assert.equal(r.kod, 1, `läckkontrollen ${utfall}: ${r.ut}`);
      assert.match(r.ut, /Obevisat/);
      assert.doesNotMatch(r.ut, /✓ Miljön produktion bär/);
    }
    // Motprov: ett namn som saknas säger det, oavsett läckkontrollen.
    const { ARVO_ADMIN_SECRET: _, ...utanEn } = alla;
    const saknas = kor({ ...utanEn, LACKKONTROLL: 'success' });
    assert.equal(saknas.kod, 1);
    assert.match(saknas.ut, /gav inte ARVO_ADMIN_SECRET/);
    // Arbetsflödet: sond väntar på utan-miljo, körs ändå, och får dess utfall.
    const sond = jobbIArbetsflode(FLODEN['probe-hemligheter.yml']).find((j) => j.jobb === 'sond');
    assert.match(sond.text, /^ {4}needs: utan-miljo$/m);
    assert.match(sond.text, /^ {4}if: \$\{\{ always\(\) \}\}$/m);
    assert.match(sond.text, /^ {10}LACKKONTROLL: \$\{\{ needs\.utan-miljo\.result \}\}$/m);
  });

  test('HB-08 · läcksondens steg körs som i Actions: rätt variabelnamn, inget som sväljer ett rött', () => {
    // Andra blicken 18 okt: fyra ändringar i probe-hemligheter.yml gjorde sonden grön utan att den
    // prövat något, och 0 tester föll — hemligheten läst under ett annat variabelnamn, continue-on-error,
    // `|| true` efter läckkontrollen och LACKKONTROLL=success i run-raden.
    const yaml = FLODEN['probe-hemligheter.yml'];
    // Varje rad som läser en hemlighet lägger den i en variabel med SAMMA namn, för skriptet läser
    // process.env[namn]. Ett annat namn ger «SAKNAS» för en hemlighet som finns.
    const lasningar = yaml.split('\n').filter((r) => /secrets/i.test(r) && !/^\s*#/.test(r));
    assert.ok(lasningar.length >= ALLA_HEMLIGHETER.length + KRAVDA_I_PRODUKTION.length, `bara ${lasningar.length} rader läser hemligheter`);
    for (const r of lasningar) {
      const m = r.match(/^\s+([A-Z_][A-Z0-9_]*):\s*\$\{\{\s*secrets\.([A-Z_][A-Z0-9_]*)\s*\}\}\s*$/);
      assert.ok(m, `en hemlighet läses i en annan form än NAMN: \${{ secrets.NAMN }}: ${r.trim()}`);
      assert.equal(m[1], m[2], `${m[2]} läses in som ${m[1]}`);
    }
    assert.doesNotMatch(yaml, /^\s+continue-on-error:/m, 'ett rött steg i sonden får aldrig bli ett grönt jobb');

    const jobb = jobbIArbetsflode(yaml);
    const korsteg = (j, skal) => {
      const rader = j.text.split('\n');
      const i = rader.findIndex((r) => /^ {8}run: /.test(r));
      assert.ok(i >= 0, `${j.jobb}: inget run-steg`);
      if (!/^ {8}run: \|$/.test(rader[i])) return rader[i].replace(/^ {8}run: /, '');
      const ut = [];
      for (let k = i + 1; k < rader.length && (rader[k] === '' || rader[k].startsWith('          ')); k++) ut.push(rader[k].slice(10));
      return ut.join('\n');
    };
    const kor = (skript, env, skal) => {
      try { execFileSync('bash', [...skal, '-c', skript], { cwd: ROT, env: { PATH: process.env.PATH, HOME: process.env.HOME, ...env }, stdio: 'pipe' }); return 0; }
      catch (e) { return e.status; }
    };
    // utan-miljo: Actions kör ett steg utan shell: med bash -e. En satt hemlighet ska ge rött.
    const utan = korsteg(jobb.find((j) => j.jobb === 'utan-miljo'));
    assert.equal(kor(utan, { ARVO_ADMIN_SECRET: 'repo-kopia' }, ['-e']), 1, `läckkontrollen gick grön på en repo-kopia: ${utan}`);
    assert.equal(kor(utan, {}, ['-e']), 0, 'motprov: utan repo-kopior är läckkontrollen grön');
    // sond: shell: bash ger --noprofile --norc -eo pipefail. Alla satta men läckkontrollen röd ska ge rött.
    const sond = korsteg(jobb.find((j) => j.jobb === 'sond'));
    const alla = Object.fromEntries(KRAVDA_I_PRODUKTION.map((n) => [n, 'x']));
    const skal = ['--noprofile', '--norc', '-e', '-o', 'pipefail'];
    assert.notEqual(kor(sond, { ...alla, LACKKONTROLL: 'failure' }, skal), 0, `sonden gick grön med en röd läckkontroll: ${sond}`);
    assert.equal(kor(sond, { ...alla, LACKKONTROLL: 'success' }, skal), 0, 'motprov: grön läckkontroll och alla satta är grönt');
  });
});
