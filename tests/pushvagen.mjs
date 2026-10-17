// tests/pushvagen.mjs — INGEN WORKFLOW FÅR RAPPORTERA EN SPARNING SOM ALDRIG SKEDDE (2026-10-17)
//
// ══ VARFÖR ═════════════════════════════════════════════════════════════════════════════════
// Sedan PR #80 (2026-10-10) tar main bara emot PR:er, och en `git push origin HEAD:main` med
// GITHUB_TOKEN nekas (GH006). Mätt 2026-10-17 med två instrument som var överens (rå grep och
// js-yaml): 147 arbetsflöden, 66 med `git push`, och 60 av dem var manuella flöden som pushade sin
// mätfil till main. Efter sista misslyckade försöket gick 39 av de 60 GRÖNA: 35 med `|| echo "push
// miss"`, tre loopar som slutade på ett `echo`, och förseglingen av villkorsboken (continue-on-error,
// ingen röd utgång). Mätvärdet stod i loggen, men filen nådde aldrig main och körningen sa inget om
// det. De 21 andra blev röda på varje körning, även när mätningen lyckats. Nu laddar alla 60 upp sitt
// utfall som artefakt, och det här testet håller formen stängd.
//
// TF-11 (tystnadsfel.mjs) krävde `github.ref == 'refs/heads/main'` på varje steg som pushade till
// main, och att minst 40 sådana steg fanns. Den populationen finns inte längre, så TF-11 är
// pensionerad. Dess regel lever kvar i MP-01, där den betyder mest: det enda tillåtna steget pushar
// med en nyckel som går förbi grenskyddet. Villkoret får stå på steget eller på jobbet; i dag står det
// på båda, och att ta bort bara det ena fäller med flit inget (avläst: 0 fällda).
//
// FÅNGAR:
//   MP-01 · en push till main från något annat jobb än verify-sources.yml#stampla, och en push vars
//           mål inte går att läsa ut (bar `git push`, `HEAD` utan mål). Målet läses ur en KÖRNING av
//           steget mot en git-stubbe, alltså efter skalets variabelexpansion, så `GREN=main` fälls.
//   MP-02 · en nekad push som ger ett grönt steg: `|| echo` och `|| true`, continue-on-error, och
//           loopen som tar slut utan röd utgång. Den sista syns bara när steget körs.
//   MP-03 · ett upload-steg som kan gå grönt utan fil, saknar utgångstid eller krockar vid omkörning.
//   MP-04 · en annan skrivväg till repot: en oklassad action, eller ett API-anrop som skriver
//           innehåll, referenser eller sammanslagningar.
//   MP-05 · `contents: write` i ett jobb som inte pushar.
//   MP-06 · instrumentet självt: simulatorn och granskaren kan ge båda svaren på varje fråga.
// BLIND: ett skript som pushar inifrån node eller python (child_process). Mätt 0 i dag, och ingen
//   vakt finns för det. Ett jobb utan permissions-block får repots standardtoken, som inte går att
//   läsa ur koden (43 flöden i dag). Simuleringen kör mot stubbar: blir steget rött av något annat än
//   pushen fäller MP-02 det som oprövbart, men en stubbe som svarar annorlunda än det riktiga
//   kommandot kan styra skriptet förbi en gren. Om artefakten faktiskt laddades upp mäter bara
//   körningen själv.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, mkdtempSync, mkdirSync, writeFileSync, chmodSync, existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { jobbIArbetsflode } from '../scripts/hemlighetsbindning.mjs';

const ROT = new URL('..', import.meta.url).pathname;
const DIR = join(ROT, '.github/workflows');
const FLODEN = Object.fromEntries(readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f)).sort()
  .map((f) => [f, readFileSync(join(DIR, f), 'utf8')]));

// ── Vad som är tillåtet ─────────────────────────────────────────────────────────────────────
// Det enda jobb som får pusha till main. Det pushar med botnyckeln förbi grenskyddet, och
// stampelvakten prövar varje commit före pushen (SP-06, SP-07).
export const TILLATNA_MAIN = Object.freeze({
  'verify-sources.yml#stampla': 'verifieringsstämpeln: botnyckeln förbi grenskyddet, stampelvakten före varje push (SP-06/07)',
});

// Actions som är lästa och inte skriver till repot. En ny action fäller MP-04 tills den är klassad.
export const KANDA_ACTIONS = Object.freeze([
  'actions/checkout', 'actions/setup-node', 'actions/cache',
  'actions/upload-artifact', 'actions/download-artifact',
  'actions/github-script', // skriver bara via sitt skript, som MP-04 läser
]);

// Upload-steg som får gå grönt utan fil. Var och en är äldre än den här vakten och har ett skäl.
export const UPLOAD_UNDANTAG = Object.freeze({
  'price-monitor.yml#monitor#Upload report artifact':
    'rapportens frånvaro är själva signalen; rapportgrinden fäller jobbet när svepet inte skrev någon (tystnadsfel.mjs)',
  'verify-sources.yml#verify#Spara stämpelbeslutet':
    'en källa utan beslut ska inte stämplas; stampla läser ett saknat beslut som «inget att flytta» (SP-05)',
  'stress-test.yml#stress-test#Upload results on failure':
    'laddar bara upp källfiler vid ett fel, inget mätutfall',
});

// Ett API-anrop som skriver till repots innehåll, referenser eller sammanslagningar.
const API_SKRIVNING = /createOrUpdateFileContents|\bdeleteFile\b|\bgit\.(?:createRef|updateRef|deleteRef|createCommit|createTree)\b|\brepos\.merge\b|\bpulls\.merge\b|\bgh\s+pr\s+merge\b|\bgh\s+api\b[^\n]*(?:\/contents|\/git\/refs|\/merges|\/merge\b)|api\.github\.com[^\n]*(?:\/contents|\/git\/refs|\/merges|\/merge\b)/;

// TF-11:s regel: den tillåtna pushen till main körs bara när refen ÄR main.
const REF_MAIN = /github\.ref\s*==\s*'refs\/heads\/main'/;
// Ett anrop av `git … push`: git, eventuella flaggor (-C dir, -c k=v, --x=y), sedan `push`.
const PUSHANROP = /\bgit(?:\s+-[Cc]\s+\S+|\s+--?[\w-]+(?:=\S+)?)*\s+push\b/;
// Maskering i textform: en push vars fel följs av något som alltid lyckas.
const MASKERING = /\bgit\b[^\n|;&]*\bpush\b[^\n]*?\|\|\s*(?:echo\b|true\b|printf\b|exit\s+0\b|:(?=\s|;|$))/m;

const indrag = (r) => r.length - r.trimStart().length;
const arKommentar = (r) => r.trim().startsWith('#');
const kodrader = (text) => String(text).split('\n').filter((r) => !arKommentar(r)).join('\n');

// ── Läsaren: stegen i ett jobb ──────────────────────────────────────────────────────────────
/** Ett blockvärde (`key: |`) eller ett radvärde, ur raderna som följer en nyckel på indrag `k`. */
function vardeFor(rader, i, k) {
  const m = rader[i].slice(k).match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
  // Citerat först: i ett citerat värde är ` #` text, inte en kommentar.
  const enkel = m[2].match(/^'((?:[^']|'')*)'/);
  if (enkel) return enkel[1].replace(/''/g, "'");
  const dubbel = m[2].match(/^"((?:[^"\\]|\\.)*)"/);
  if (dubbel) return JSON.parse(`"${dubbel[1]}"`);
  const v = m[2].replace(/\s+#.*$/, '').trimEnd();
  if (/^[|>][-+]?$/.test(v)) {
    if (v.startsWith('>')) throw new Error(`pushvägen: vikt block (\`${m[1]}: >\`) läses inte — skriv \`|\``);
    const block = [];
    for (let j = i + 1; j < rader.length && (rader[j].trim() === '' || indrag(rader[j]) > k); j++) block.push(rader[j]);
    while (block.length && block[block.length - 1].trim() === '') block.pop();
    const in2 = Math.min(...block.filter((r) => r.trim()).map(indrag));
    return block.map((r) => r.slice(in2)).join('\n');
  }
  return v;
}

/** Nycklarna på indrag `k` i ett radblock (med `with:` som en karta ett steg in). */
function nycklar(rader, k) {
  const ut = {};
  for (let i = 0; i < rader.length; i++) {
    const r = rader[i];
    if (arKommentar(r) || r.trim() === '' || indrag(r) !== k) continue;
    const m = r.slice(k).match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    if (m[1] === 'with' && m[2].replace(/\s+#.*$/, '') === '') {
      const barn = [];
      for (let j = i + 1; j < rader.length && (rader[j].trim() === '' || indrag(rader[j]) > k); j++) barn.push(rader[j]);
      const k2 = Math.min(...barn.filter((x) => x.trim() && !arKommentar(x)).map(indrag));
      ut.with = Object.fromEntries(barn.map((x, j) => [x, j]).filter(([x]) => x.trim() && !arKommentar(x) && indrag(x) === k2)
        .map(([x, j]) => [x.trim().split(':')[0], vardeFor(barn, j, k2)]));
    } else {
      ut[m[1]] = vardeFor(rader, i, k);
    }
  }
  return ut;
}

/**
 * Ett jobbs steg: [{ namn, nycklar, text }]. `text` är stegets rader. Kastar på en form läsaren inte
 * förstår, så att ett steg den inte ser blir ett fel och inte ett grönt tomt svar (MP-06).
 */
export function stegIJobb(jobbText) {
  const r = String(jobbText).split('\n');
  const s = r.findIndex((x) => /^ {4}steps:\s*(#.*)?$/.test(x));
  if (s < 0) return [];
  const steg = [];
  let item = null;
  let akt = null;
  for (let i = s + 1; i < r.length; i++) {
    const x = r[i];
    if (x.trim() === '' || arKommentar(x)) { if (akt && (x.trim() === '' || indrag(x) > (item ?? 0))) akt.push(x); continue; }
    if (indrag(x) <= 4) break;
    const m = x.match(/^( *)- (.*)$/);
    if (m && (item === null || m[1].length === item)) {
      item = m[1].length;
      akt = [' '.repeat(item + 2) + m[2]];
      steg.push(akt);
      continue;
    }
    if (item === null || indrag(x) <= item) throw new Error(`pushvägen: rad utanför ett steg: «${x.trim()}»`);
    akt.push(x);
  }
  return steg.map((rader) => {
    const n = nycklar(rader, item + 2);
    return { namn: n.name ?? n.uses ?? '(namnlöst)', nycklar: n, text: rader.join('\n') };
  });
}

/** Behörigheter: { [nyckel]: värde } ur ett `permissions:`-block på indrag `k`, eller en kortform. */
function behorigheter(rader, k) {
  const i = rader.findIndex((x) => indrag(x) === k && /^\s*permissions:/.test(x));
  if (i < 0) return null;
  const rad = rader[i].trim().replace(/\s+#.*$/, '');
  const kort = rad.match(/^permissions:\s*(\S.*)$/);
  if (kort) return kort[1] === 'write-all' ? { contents: 'write' } : {};
  const ut = {};
  for (let j = i + 1; j < rader.length && (rader[j].trim() === '' || arKommentar(rader[j]) || indrag(rader[j]) > k); j++) {
    const m = rader[j].trim().match(/^([a-z-]+):\s*([a-z]+)/);
    if (m && !arKommentar(rader[j])) ut[m[1]] = m[2];
  }
  return ut;
}

// ── Simulatorn ──────────────────────────────────────────────────────────────────────────────
// Kör ett stegs skript i en tom katalog, med git som stubbe. Pushen loggas och svarar som GH006
// när `neka` är satt. Allt som skulle nå nätet eller en riktig process stubbas.
const STUBBAR = ['node', 'npm', 'npx', 'curl', 'wget', 'gh', 'sleep', 'cat', 'base64', 'rm', 'mv', 'cp',
  'tee', 'python', 'python3', 'jq', 'ssh', 'ssh-keygen', 'scp'];
const GITSTUBBE = `#!/bin/bash
args=("$@"); i=0
while [ $i -lt \${#args[@]} ]; do
  case "\${args[$i]}" in
    -C|-c) i=$((i+2)) ;;
    -*) i=$((i+1)) ;;
    *) break ;;
  esac
done
case "\${args[$i]}" in
  push) printf 'PUSH %s\\n' "\${args[*]:$((i+1))}" >> "$SIM_PUSH"
        if [ "$SIM_NEKA" = 1 ]; then echo "remote: error: GH006: Protected branch update failed" >&2; exit 1; fi ;;
  diff) exit 1 ;;
  rev-parse) echo 0000000000000000000000000000000000000000 ;;
esac
exit 0
`;

/**
 * Kör `skript` som GitHub skulle (skalet ur `shell`). Returnerar { kod, pushar: [argsträngar] }.
 * `${{ … }}` ersätts med X, och varje `cd <relativ katalog>` får en tom katalog att gå in i.
 */
export function simulera(skript, { neka, shell } = {}) {
  const tmp = mkdtempSync(join(tmpdir(), 'pushvag-'));
  try {
    const bin = join(tmp, 'bin');
    const cwd = join(tmp, 'repo');
    mkdirSync(bin);
    mkdirSync(cwd);
    writeFileSync(join(bin, 'git'), GITSTUBBE);
    chmodSync(join(bin, 'git'), 0o755);
    for (const n of STUBBAR) { writeFileSync(join(bin, n), '#!/bin/sh\nexit 0\n'); chmodSync(join(bin, n), 0o755); }
    const kropp = String(skript).replace(/\$\{\{[\s\S]*?\}\}/g, 'X');
    for (const m of kropp.matchAll(/(?:^|[\s;&|(])cd\s+([A-Za-z0-9_][A-Za-z0-9_./-]*)/gm)) mkdirSync(join(cwd, m[1]), { recursive: true });
    const fil = join(tmp, 'steg.sh');
    writeFileSync(fil, kropp + '\n');
    const logg = join(tmp, 'push.logg');
    const skal = shell == null ? ['bash', ['-e', fil]]
      : shell === 'bash' ? ['bash', ['--noprofile', '--norc', '-eo', 'pipefail', fil]]
        : shell === 'sh' ? ['sh', ['-e', fil]] : null;
    if (!skal) throw new Error(`pushvägen: skalet «${shell}» simuleras inte`);
    const env = {
      PATH: `${bin}:/usr/bin:/bin`, HOME: tmp, SIM_PUSH: logg, SIM_NEKA: neka ? '1' : '0',
      GITHUB_OUTPUT: join(tmp, 'output'), GITHUB_ENV: join(tmp, 'env'), GITHUB_STEP_SUMMARY: join(tmp, 'summary'), RUNNER_TEMP: tmp,
    };
    const r = spawnSync(skal[0], skal[1], { cwd, env, encoding: 'utf8', timeout: 20000 });
    // Varje rad bär en markör, så att en bar `git push` (inga argument) syns som en push.
    const pushar = existsSync(logg) ? readFileSync(logg, 'utf8').split('\n').filter(Boolean).map((r) => r.replace(/^PUSH ?/, '')) : [];
    return { kod: r.status ?? -1, pushar, fel: r.stderr };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/** Målet för en push ur argumenten efter `push`: 'main', ett grennamn, eller null om det inte går att läsa ut. */
export function pushMal(argstrang) {
  const t = String(argstrang).split(/\s+/).filter(Boolean);
  const pos = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '-o' || t[i] === '--push-option' || t[i] === '--repo') { i++; continue; }
    if (!t[i].startsWith('-')) pos.push(t[i]);
  }
  if (pos.length < 2) return [null];
  return pos.slice(1).map((ref) => {
    const r = ref.replace(/^\+/, '');
    if (!r.includes(':') && (r === 'HEAD' || r === '@')) return null;
    const mal = (r.includes(':') ? r.slice(r.indexOf(':') + 1) : r).replace(/^refs\/heads\//, '');
    return mal === '' || mal === 'main' ? 'main' : mal;
  });
}

// ── Granskaren ──────────────────────────────────────────────────────────────────────────────
/**
 * Granskar en uppsättning arbetsflöden ({ filnamn: yaml }). Returnerar { brott: { MP-0x: [...] },
 * pushsteg: [id], mainpush: [id] }, där varje brott är en läsbar rad.
 */
export function granska(floden, { tillatnaMain = TILLATNA_MAIN, undantag = UPLOAD_UNDANTAG } = {}) {
  const brott = { 'MP-01': [], 'MP-02': [], 'MP-03': [], 'MP-04': [], 'MP-05': [] };
  const pushsteg = [];
  const mainpush = new Set();
  const settaUndantag = new Set();
  for (const [fil, yaml] of Object.entries(floden)) {
    const stam = fil.replace(/\.ya?ml$/, '');
    const rader = String(yaml).split('\n');
    const toppPerm = behorigheter(rader.slice(0, rader.findIndex((x) => /^jobs:/.test(x))), 0);
    for (const jobb of jobbIArbetsflode(yaml)) {
      const jid = `${fil}#${jobb.jobb}`;
      const jrader = jobb.text.split('\n');
      const jobbCoe = jrader.some((x) => /^ {4}continue-on-error:/.test(x) && !/^ {4}continue-on-error:\s*false\s*(#.*)?$/.test(x));
      const jobbUses = jrader.find((x) => /^ {4}uses:/.test(x));
      const jobbIf = jrader.find((x) => /^ {4}if:/.test(x)) ?? '';
      if (jobbUses && !/^\s*uses:\s*\.\/\.github\/workflows\//.test(jobbUses)) brott['MP-04'].push(`${jid}: anropar ett externt flöde (${jobbUses.trim()})`);
      let pushar = false;
      for (const s of stegIJobb(jobb.text)) {
        const sid = `${jid}#${s.namn}`;
        const n = s.nycklar;
        const uses = n.uses ?? '';
        if (uses) {
          const namn = uses.replace(/@.*$/, '');
          if (!KANDA_ACTIONS.includes(namn)) brott['MP-04'].push(`${sid}: oklassad action ${uses}`);
          if (namn === 'actions/github-script' && API_SKRIVNING.test(n.with?.script ?? '')) brott['MP-04'].push(`${sid}: skriptet skriver till repot via API:t`);
          if (namn === 'actions/upload-artifact') {
            if (undantag[sid]) { settaUndantag.add(sid); continue; }
            const w = n.with ?? {};
            const fel = [];
            if (w['if-no-files-found'] !== 'error') fel.push(`if-no-files-found är «${w['if-no-files-found'] ?? '(warn)'}», inte error`);
            if (!/^\d+$/.test(String(w['retention-days'] ?? '')) || +w['retention-days'] < 1 || +w['retention-days'] > 90) fel.push('retention-days saknas eller ligger utanför 1–90');
            if (!String(w.name ?? '').startsWith(`${stam}-`) || !/\$\{\{\s*github\.run_id\s*\}\}/.test(w.name ?? '') || !/\$\{\{\s*github\.run_attempt\s*\}\}/.test(w.name ?? '')) {
              fel.push(`namnet «${w.name ?? ''}» bär inte ${stam}- + run_id + run_attempt`);
            }
            if (n['continue-on-error'] != null && n['continue-on-error'] !== 'false') fel.push('continue-on-error');
            if (jobbCoe) fel.push('jobbet har continue-on-error');
            for (const f of fel) brott['MP-03'].push(`${sid}: ${f}`);
          }
          continue;
        }
        const skript = n.run ?? '';
        if (API_SKRIVNING.test(kodrader(skript))) brott['MP-04'].push(`${sid}: skriptet skriver till repot via API:t`);
        if (!PUSHANROP.test(kodrader(skript))) continue;
        pushar = true;
        pushsteg.push(sid);
        if (MASKERING.test(kodrader(skript))) brott['MP-02'].push(`${sid}: en nekad push sväljs (|| echo / || true / || :)`);
        if (n['continue-on-error'] != null && n['continue-on-error'] !== 'false') brott['MP-02'].push(`${sid}: continue-on-error på ett steg som pushar`);
        if (jobbCoe) brott['MP-02'].push(`${sid}: continue-on-error på jobbet`);
        const ja = simulera(skript, { neka: false, shell: n.shell });
        const nej = simulera(skript, { neka: true, shell: n.shell });
        if (ja.pushar.length === 0 || nej.pushar.length === 0) {
          brott['MP-02'].push(`${sid}: simuleringen nådde aldrig pushen, så stegets svar på ett nej går inte att pröva`);
        } else if (ja.kod !== 0) {
          brott['MP-02'].push(`${sid}: steget är rött även när pushen lyckas (kod ${ja.kod}), så ett rött nej bevisar inget`);
        } else if (nej.kod === 0) {
          brott['MP-02'].push(`${sid}: en nekad push ger ett grönt steg`);
        }
        for (const mal of ja.pushar.flatMap(pushMal)) {
          if (mal === null) brott['MP-01'].push(`${sid}: pushens mål går inte att läsa ut — skriv \`git push origin HEAD:<gren>\``);
          else if (mal === 'main') {
            mainpush.add(jid);
            // Villkoret får stå på steget eller på jobbet. Står det på båda är det ett skydd, inte
            // två: att ta bort det ena fäller inget, och det är meningen.
            if (!tillatnaMain[jid]) brott['MP-01'].push(`${sid}: pushar till main`);
            else if (!REF_MAIN.test(n.if ?? '') && !REF_MAIN.test(jobbIf)) brott['MP-01'].push(`${sid}: får pusha till main men varken steget eller jobbet kräver att refen är main`);
          }
        }
      }
      const perm = behorigheter(jrader, 4) ?? toppPerm;
      if (perm?.contents === 'write' && !pushar) brott['MP-05'].push(`${jid}: contents: write utan push`);
    }
  }
  for (const id of Object.keys(undantag)) {
    if (!settaUndantag.has(id)) brott['MP-03'].push(`${id}: undantaget pekar på ett upload-steg som inte finns`);
  }
  return { brott, pushsteg, mainpush: [...mainpush].sort() };
}

// ── Repot ───────────────────────────────────────────────────────────────────────────────────
// Granskas i första testet som behöver det: kastar läsaren blir det ett rött test, inte en sprängd svit.
let granskat = null;
const utfall = () => (granskat ??= granska(FLODEN));
const lista = (xs) => xs.map((x) => `  ${x}`).join('\n');

describe('MP · ingen workflow får rapportera en sparning som aldrig skedde', () => {
  test('MP-01 · bara verify-sources.yml#stampla pushar till main, och varje push har ett mål som går att läsa ut', () => {
    const UTFALL = utfall();
    assert.deepEqual(UTFALL.brott['MP-01'], [], `\n${lista(UTFALL.brott['MP-01'])}`);
    // Motprov: det tillåtna jobbet finns och pushar faktiskt till main, annars är listan död.
    assert.deepEqual(UTFALL.mainpush, Object.keys(TILLATNA_MAIN).sort());
    // Läsaren mot en bredare räkning (HB-04:s form): varje fil där en rad nämner git och push har
    // ett steg som läsaren känner som pushande. Samma mönster som läsaren hade varit cirkulärt.
    const bred = Object.entries(FLODEN).filter(([, y]) => kodrader(y).split('\n').some((r) => /\bgit\b.*\bpush\b/.test(r))).map(([f]) => f).sort();
    const last = [...new Set(UTFALL.pushsteg.map((s) => s.split('#')[0]))].sort();
    assert.deepEqual(last, bred, 'läsaren och den breda räkningen är oense om vilka filer som pushar');
    assert.ok(bred.length >= 2, `bara ${bred.length} pushande flöden — räkningen läser inte filerna`);
  });

  test('MP-02 · en nekad push gör steget rött: ingen maskering, inget continue-on-error, ingen loop som tar slut grönt', () => {
    const UTFALL = utfall();
    assert.deepEqual(UTFALL.brott['MP-02'], [], `\n${lista(UTFALL.brott['MP-02'])}`);
    assert.ok(UTFALL.pushsteg.length >= 2, `bara ${UTFALL.pushsteg.length} pushsteg simulerades`);
  });

  test('MP-03 · varje upload-steg blir rött utan fil, har en utgångstid och ett namn per körning', () => {
    const UTFALL = utfall();
    assert.deepEqual(UTFALL.brott['MP-03'], [], `\n${lista(UTFALL.brott['MP-03'])}`);
    const uppladdningar = Object.values(FLODEN).join('\n').match(/uses:\s*actions\/upload-artifact@/g) ?? [];
    assert.ok(uppladdningar.length >= 60, `bara ${uppladdningar.length} upload-steg — omskrivningen till artefakter är inte kvar`);
  });

  test('MP-04 · ingen annan skrivväg till repot: bara klassade actions, inga API-skrivningar', () => {
    const UTFALL = utfall();
    assert.deepEqual(UTFALL.brott['MP-04'], [], `\n${lista(UTFALL.brott['MP-04'])}`);
  });

  test('MP-05 · contents: write bara i jobb som pushar', () => {
    const UTFALL = utfall();
    assert.deepEqual(UTFALL.brott['MP-05'], [], `\n${lista(UTFALL.brott['MP-05'])}`);
  });
});

// ── Instrumentet ────────────────────────────────────────────────────────────────────────────
const ett = (steg, { jobb = '', topp = 'permissions:\n  contents: read\n' } = {}) =>
  `name: t\non: workflow_dispatch\n${topp}jobs:\n  j:\n    runs-on: ubuntu-latest\n${jobb}    steps:\n${steg}`;
const runSteg = (skript, extra = '') => `      - name: s\n${extra}        run: |\n${skript.split('\n').map((r) => `          ${r}`).join('\n')}\n`;
const upload = (w) => `      - name: u\n        uses: actions/upload-artifact@v4\n        with:\n${Object.entries(w).map(([k, v]) => `          ${k}: ${v}`).join('\n')}\n`;
const RATT_UPLOAD = { name: 't-${{ github.run_id }}-${{ github.run_attempt }}', path: 'ops/x.txt', 'if-no-files-found': 'error', 'retention-days': 90 };
const brottI = (yaml, regel, opt) => granska({ 't.yml': yaml }, { undantag: {}, ...opt }).brott[regel];

describe('MP-06 · instrumentet kan ge båda svaren', () => {
  test('MP-06 · simulatorn: ett nej når pushen, och målet läses efter variabelexpansion', () => {
    const svalj = simulera('git push origin HEAD:main || echo "push miss"', { neka: true });
    assert.deepEqual([svalj.kod, svalj.pushar], [0, ['origin HEAD:main']]);
    const rak = simulera('git push origin HEAD:main', { neka: true });
    assert.notEqual(rak.kod, 0, 'motprov: en rak push under bash -e blir röd');
    assert.equal(simulera('git push origin HEAD:main', { neka: false }).kod, 0);
    const gren = simulera('GREN="data/x-${{ github.run_id }}"\ngit push origin "HEAD:refs/heads/${GREN}"', { neka: false });
    assert.deepEqual(gren.pushar.flatMap(pushMal), ['data/x-X']);
    const forkladd = simulera('GREN=main\ngit -C . push origin "HEAD:refs/heads/$GREN"', { neka: false });
    assert.deepEqual(forkladd.pushar.flatMap(pushMal), ['main'], 'en variabel som blir main är main');
    assert.deepEqual(pushMal(''), [null]);
    assert.deepEqual(pushMal('origin HEAD'), [null]);
    assert.deepEqual(pushMal('-u origin price-update/2026-10-17'), ['price-update/2026-10-17']);
    assert.deepEqual(pushMal('origin +HEAD:refs/heads/main'), ['main']);
  });

  test('MP-06 · loopformerna: en loop som tar slut på echo fälls, en som tar slut på exit 1 släpps', () => {
    const gron = 'for i in 1 2 3; do\n  git pull --rebase origin main && git push origin HEAD:refs/heads/x && exit 0\n  sleep 1\ndone\necho "push misslyckades"';
    assert.match(brottI(ett(runSteg(gron)), 'MP-02').join('\n'), /en nekad push ger ett grönt steg/);
    const rod = 'for i in 1 2 3; do\n  if git push origin HEAD:refs/heads/x; then SPARAT=1; break; fi\ndone\n[ "${SPARAT:-0}" = "1" ] || { echo "✗"; exit 1; }';
    assert.deepEqual(brottI(ett(runSteg(rod)), 'MP-02'), []);
    const oprovbar = 'cat finns-inte.txt > /dev/null\nls finns-inte-heller\ngit push origin HEAD:refs/heads/x';
    assert.match(brottI(ett(runSteg(oprovbar)), 'MP-02').join('\n'), /nådde aldrig pushen/);
  });

  test('MP-06 · granskaren: varje regel fäller sin form och släpper sitt motprov', () => {
    assert.match(brottI(ett(runSteg('git push origin HEAD:main || echo "push miss"')), 'MP-01').join('\n'), /pushar till main/);
    assert.match(brottI(ett(runSteg('git push origin HEAD:main || echo "push miss"')), 'MP-02').join('\n'), /sväljs/);
    assert.match(brottI(ett(runSteg('git push')), 'MP-01').join('\n'), /går inte att läsa ut/);
    assert.deepEqual(brottI(ett(runSteg('git push origin HEAD:refs/heads/data/x')), 'MP-01'), []);
    assert.match(brottI(ett(runSteg('git push origin HEAD:refs/heads/x', '        continue-on-error: true\n')), 'MP-02').join('\n'), /continue-on-error/);
    assert.match(brottI(ett(runSteg('git push origin HEAD:refs/heads/x'), { jobb: '    continue-on-error: true\n' }), 'MP-02').join('\n'), /jobbet/);
    // Det tillåtna jobbet måste kräva main-refen (TF-11:s regel).
    const tillat = { tillatnaMain: { 't.yml#j': 'test' } };
    assert.match(brottI(ett(runSteg('git push origin HEAD:main')), 'MP-01', tillat).join('\n'), /kräver att refen är main/);
    assert.deepEqual(brottI(ett(runSteg('git push origin HEAD:main', "        if: github.ref == 'refs/heads/main'\n")), 'MP-01', tillat), []);
    assert.deepEqual(brottI(ett(runSteg('git push origin HEAD:main'), { jobb: "    if: github.ref == 'refs/heads/main'\n" }), 'MP-01', tillat), []);
  });

  test('MP-06 · upload, actions, API och behörigheter: fäller och släpper', () => {
    assert.deepEqual(brottI(ett(upload(RATT_UPLOAD)), 'MP-03'), []);
    assert.match(brottI(ett(upload({ ...RATT_UPLOAD, 'if-no-files-found': 'warn' })), 'MP-03').join('\n'), /if-no-files-found/);
    const utan = { ...RATT_UPLOAD };
    delete utan['if-no-files-found'];
    assert.match(brottI(ett(upload(utan)), 'MP-03').join('\n'), /if-no-files-found/, 'standardvärdet warn är grönt utan fil');
    assert.match(brottI(ett(upload({ ...RATT_UPLOAD, 'retention-days': 0 })), 'MP-03').join('\n'), /retention-days/);
    assert.match(brottI(ett(upload({ ...RATT_UPLOAD, name: 't-${{ github.run_id }}' })), 'MP-03').join('\n'), /run_attempt/);
    assert.match(brottI(ett(upload({ ...RATT_UPLOAD, name: 'annat-${{ github.run_id }}-${{ github.run_attempt }}' })), 'MP-03').join('\n'), /bär inte t-/);
    assert.match(granska({ 't.yml': ett(upload(RATT_UPLOAD)) }, { undantag: { 'x.yml#j#u': 'skäl' } }).brott['MP-03'].join('\n'), /inte finns/,
      'ett undantag för ett steg som inte finns är dött');
    assert.match(brottI(ett('      - uses: stefanzweifel/git-auto-commit-action@v5\n'), 'MP-04').join('\n'), /oklassad action/);
    assert.match(brottI(ett(runSteg('gh pr merge 12 --merge')), 'MP-04').join('\n'), /API/);
    assert.match(brottI(ett('      - uses: actions/github-script@v7\n        with:\n          script: |\n            await github.rest.repos.createOrUpdateFileContents({})\n'), 'MP-04').join('\n'), /API/);
    assert.deepEqual(brottI(ett('      - uses: actions/github-script@v7\n        with:\n          script: |\n            await github.rest.issues.create({})\n'), 'MP-04'), []);
    assert.match(brottI(ett(runSteg('echo hej'), { topp: 'permissions:\n  contents: write\n' }), 'MP-05').join('\n'), /utan push/);
    assert.match(brottI(ett(runSteg('echo hej'), { topp: 'permissions: write-all\n' }), 'MP-05').join('\n'), /utan push/);
    assert.deepEqual(brottI(ett(runSteg('echo hej'), { topp: 'permissions:\n  contents: write\n', jobb: '    permissions:\n      contents: read\n' }), 'MP-05'), []);
    assert.deepEqual(brottI(ett(runSteg('git push origin HEAD:refs/heads/x'), { topp: 'permissions:\n  contents: write\n' }), 'MP-05'), []);
  });

  test('MP-06 · läsaren smäller på en form den inte förstår i stället för att svara tomt', () => {
    assert.throws(() => stegIJobb('    steps:\n      - run: echo\n     oj: 1\n'), /utanför ett steg/);
    assert.throws(() => stegIJobb('    steps:\n      - name: v\n        run: >\n          git push\n'), /vikt block/);
    assert.equal(stegIJobb('    steps:\n      - name: a\n        run: echo a\n      # kommentar\n      - name: b\n        run: echo b\n').length, 2);
  });
});
