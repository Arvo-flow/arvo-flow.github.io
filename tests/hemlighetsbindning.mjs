// tests/hemlighetsbindning.mjs — VARJE HEMLIGHET LÄSES BARA I MILJÖN `produktion`, OCH SONDEN PRÖVAR ALLA (2026-10-10)
//
// Granskningen av PR #80: 66 jobb bundna, men två jobb läste ARVO_ADMIN_SECRET och DROPBOX_AUTH_COOKIE utan
// miljön, och läckkontrollen prövade sex av nio namn. Raderas bara de prövade repo-kopiorna ligger de andra
// kvar, läsbara från varje branch — och sonden hade sagt grönt.
//
// FÅNGAR: ett nytt jobb som läser en hemlighet utan miljön (HB-01); ett nytt hemlighetsnamn som sonden inte
//   prövar, eller en sondlista som glidit från arbetsflödena (HB-02); toppnivå-env och `secrets: inherit`
//   (HB-03); en YAML-form som läsaren inte förstår, så att den inte blir grön av tomhet (HB-04).
// BLIND: om hemligheterna FAKTISKT ligger i miljön och är borta från repo-nivån — det är repoinställningar
//   som bara körningen av probe-hemligheter.yml kan mäta. Det här är kodens halva; sonden är den andra.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  jobbIArbetsflode, obundnaJobb, allaHemligheter, hemligheterI,
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
  });

  test('HB-04 · läsaren hittar varje jobb — en form den inte förstår blir ett fel, inte ett grönt tomt svar', () => {
    let jobb = 0;
    for (const [f, y] of Object.entries(FLODEN)) {
      const rubriker = y.split('\n').slice(y.split('\n').findIndex((r) => /^jobs:/.test(r)) + 1)
        .filter((r) => /^ {2}[A-Za-z0-9_-]+:\s*(#.*)?$/.test(r)).length;
      assert.equal(jobbIArbetsflode(y).length, rubriker, `${f}: läsaren hittade inte varje jobb`);
      jobb += rubriker;
    }
    assert.ok(jobb > Object.keys(FLODEN).length, `bara ${jobb} jobb i ${Object.keys(FLODEN).length} flöden`);
    assert.throws(() => jobbIArbetsflode('on: push\njobs: { a: { runs-on: x } }\n'), /jobs/);
    // `jobs:` finns men jobben står i en indentering läsaren inte känner — det får inte bli «0 jobb, allt bundet».
    assert.throws(() => jobbIArbetsflode('on: push\njobs:\n    a:\n      runs-on: x\n'), /jobbrubriker/);
    assert.throws(() => jobbIArbetsflode('name: x\n'), /jobs/);
  });
});
