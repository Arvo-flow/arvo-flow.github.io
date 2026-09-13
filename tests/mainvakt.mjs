// tests/mainvakt.mjs — MV-01..04: `main` tar inte emot mekanik utan en andra blick.
//
// Bevisplikten p.1 var PROSA tills en underagent körde `git push origin HEAD:main` och tog med sig
// oreviderade vaktfixar. En regel som bara finns i text skalar inte med en agentflotta.
//
// Sviten kör det RIKTIGA skriptet med refar på stdin — samma väg git använder. En modell av
// grinden hade bevisat att logiken svarar, aldrig att hooken gör det (villkorsvaktens läxa).
//
// ⚠️ FLAGGAN ERSATT AV ETT ARTEFAKTBEVIS 2026-09-13. `ARVO_GRANSKAD=1` var ett hedersord: jag
// satte den själv och pushade fem mekanikcommits till main på mitt eget ord. Kravet är nu en
// rapport i `ops/granskningar/` som NAMNGER varje mekanikcommit — läst ur den PUSHADE
// trädversionen, så en lokal ocommittad fil inte duger.
//
// FÅNGAR: en push till main som bär lib/, api/ eller agents/ utan en rapport som namnger just den
//   commiten; en grind som släpper igenom en push vars innehåll den inte kunde läsa.
// BLIND: sviten ser att rapporten FINNS och namnger rätt sha — aldrig att någon faktiskt granskade
//   eller granskade väl. Och den ser bara pushar genom repots egen hook; Actions och
//   webbgränssnittet passerar oberörda.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
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

/** Som commitMedBevis, men med godtyckliga filer — för att bygga fientliga fixturer. */
function commitMedFil(foralder, sokvag, innehall) {
  return commitMedFiler(foralder, [[sokvag, innehall]]);
}

function commitMedFiler(foralder, filer, foraldrar = null) {
  const tmpIndex = join(mkdtempSync(join(tmpdir(), 'mainvakt-')), 'index');
  const env = { ...process.env, GIT_INDEX_FILE: tmpIndex };
  const g = (cmd, opts = {}) => execSync(cmd, { cwd: ROT, encoding: 'utf8', env, ...opts }).trim();
  try {
    g(`git read-tree ${foralder}`);
    for (const [sokvag, innehall] of filer) {
      const blob = execSync('git hash-object -w --stdin', { cwd: ROT, encoding: 'utf8', env, input: innehall }).trim();
      g(`git update-index --add --cacheinfo 100644,${blob},${sokvag}`);
    }
    const p = (foraldrar ?? [foralder]).map((x) => `-p ${x}`).join(' ');
    return execSync(`git commit-tree ${g('git write-tree')} ${p} -m "prov"`, {
      cwd: ROT, encoding: 'utf8', env,
    }).trim();
  } finally {
    rmSync(dirname(tmpIndex), { recursive: true, force: true });
  }
}

/**
 * Bygg en SYNTETISK commit ovanpå `foralder` som lägger till ett granskningsbevis — helt i
 * objektdatabasen, utan att röra HEAD, indexet eller arbetsträdet. Samma form som verkligheten:
 * rapporten är en SENARE commit som namnger de tidigare mekanikcommitsen.
 */
function commitMedBevis(foralder, rubrik) {
  const tmpIndex = join(mkdtempSync(join(tmpdir(), 'mainvakt-')), 'index');
  const env = { ...process.env, GIT_INDEX_FILE: tmpIndex };
  const g = (cmd, opts = {}) => execSync(cmd, { cwd: ROT, encoding: 'utf8', env, ...opts }).trim();
  try {
    g(`git read-tree ${foralder}`);
    const blob = execSync('git hash-object -w --stdin', {
      cwd: ROT, encoding: 'utf8', env, input: `<!-- granskning\n${rubrik}\n-->\n\n# Fynd\nInga.\n`,
    }).trim();
    g(`git update-index --add --cacheinfo 100644,${blob},ops/granskningar/prov.md`);
    const tree = g('git write-tree');
    return execSync(`git commit-tree ${tree} -p ${foralder} -m "prov: granskningsbevis"`, {
      cwd: ROT, encoding: 'utf8', env,
    }).trim();
  } finally {
    rmSync(dirname(tmpIndex), { recursive: true, force: true });
  }
}
const NOLL = '0'.repeat(40);

describe('MV · Main-vakten: en andra blick före mekanik', () => {
  // Ett spann som garanterat bär lib/-ändringar: vaktfixarna 2026-09-02.
  const franRef = () => execSync(
    'git log --format=%H -n 40 -- lib/pastaendevakt.js | tail -1', { cwd: ROT, encoding: 'utf8' },
  ).trim();
  const bar = () => `${sha('HEAD')} ${sha('HEAD')} refs/heads/main ${franRef()}~1`;

  // Samma spann, men med en syntetisk bevis-commit ovanpå HEAD. `namnger` avgör täckningen.
  const medBevisRad = (rubrik) => {
    const c = commitMedBevis(sha('HEAD'), rubrik);
    return `${c} ${c} refs/heads/main ${franRef()}~1`;
  };

  test('MV-01 · en push till main med lib/-ändringar NEKAS', () => {
    const r = kor(bar());
    assert.equal(r.kod, 1, 'mekanik utan granskning får inte nå main');
    assert.match(r.ut, /MAIN-VAKTEN/);
    assert.match(r.ut, /lib\//, 'filerna ska namnges — annars vet ingen vad som stoppades');
  });

  test('MV-02 · MOTPROVET — samma push SLÄPPS när ett bevis namnger commiten', () => {
    // Utan den här grenen vore vakten ett hinder, inte en grind: den som FAKTISKT granskat måste
    // kunna leverera, annars kringgås hooken med --no-verify och blir värre än ingen.
    // Beviset byggs som en SYNTETISK commit i objektdatabasen — samma väg som i verkligheten
    // (rapporten är en senare commit som namnger de tidigare), utan att röra repot.
    // Rapporten måste namnge VARJE mekanikcommit i spannet, inte bara den sista — det är hela
    // skärpan i «per commit, aldrig per push».
    const mekanik = execSync(`git log --format=%H ${franRef()}~1..HEAD`, { cwd: ROT, encoding: 'utf8' })
      .trim().split('\n');
    const r = kor(medBevisRad(`commits: ${mekanik.join(' ')}\ndom: MERGAS\ngranskare: test\ndatum: 2026-09-13`));
    assert.equal(r.kod, 0, `beviset skulle ha täckt commitsen:\n${r.ut}`);
    assert.match(r.ut, /täckta av granskningsbevis/);
  });

  test('MV-06 · en rapport med domen BLOCKERAR släpper INTE igenom', () => {
    // En rapport som FINNS är inte en rapport som friade. Utan det här kunde en blockerad
    // granskning se ut exakt som en godkänd — felfamiljen, i grinden mot felfamiljen.
    const mekanik = execSync(`git log --format=%H ${franRef()}~1..HEAD`, { cwd: ROT, encoding: 'utf8' })
      .trim().split('\n');
    const r = kor(medBevisRad(`commits: ${mekanik.join(' ')}\ndom: BLOCKERAR\ngranskare: test\ndatum: 2026-09-13`));
    assert.equal(r.kod, 1, 'BLOCKERAR får aldrig räknas som täckning');
    assert.match(r.ut, /BLOCKERAD/);
  });

  test('MV-07 · ett bevis som namnger FEL commit täcker ingenting', () => {
    // Den tystaste formen: en rapport finns i katalogen, ser korrekt ut, och gäller något annat.
    const r = kor(medBevisRad(`commits: ${'d'.repeat(40)}\ndom: MERGAS\ngranskare: test\ndatum: 2026-09-13`));
    assert.equal(r.kod, 1, 'ett bevis om en annan commit är inget bevis om den här');
    assert.match(r.ut, /Utan bevis/);
  });

  // ── MV-09..12 · DE FYRA VÄGAR FÖRBI SOM GRANSKAREN MÄTTE (2026-09-13) ────────────────────
  // Alla fyra släppte ogranskad mekanik till `main` utan flagga och utan --no-verify, i samma
  // commit där jag skrev «ingen förbigångsflagga finns kvar». Påståendet före körningen, i den
  // grind som byggdes mot just den sjukdomen.

  test('MV-09 · en OKÄND fjärr-sha nekas — den kunde förut släppa ALLT', () => {
    // `git diff --name-only <sha>` (utan spann) jämför mot ARBETSTRÄDET, inte mot föräldern. Ett
    // rent träd gav tom diff → exit 0 innan ett enda bevis lästes. Nåbart med
    // `git push origin main:master` när master saknas på fjärren, eller `--all`.
    // MV-04 var grön på fel grund: den matade en sha som inte FINNS, så git kastade.
    //
    // ⚠️ ALTERNATIVET I MÖNSTRET GJORDE KONTROLLEN OBSERVERBAR — men bara nästan. Första
    // versionen godtog «går inte att pröva ELLER okänt nekas», och sabotaget «ta bort den
    // explicita kontrollen» fällde då NOLL: `git rev-list <nollsha>..<sha>` kastar ändå, så
    // `neka()` nåddes via en ANNAN gren med ett annat skäl. Ett skydd bakom ett annat skydd är
    // inte två lager (bibeln 10 sept). Testet kräver därför den EXAKTA formuleringen, så att
    // den explicita grenen är den enda som kan producera den.
    const h = sha('HEAD');
    const r = kor(`${h} ${h} refs/heads/main ${NOLL}`);
    assert.equal(r.kod, 1, 'ett okänt fjärrläge går inte att pröva och ska nekas');
    assert.match(r.ut, /finns inte på fjärren/, 'skälet ska säga VAD som är okänt, inte bara att något var det');
    // Och samma sak när fjärr-shan saknas HELT (en ofullständig rad) — den grenen kastar inte
    // ens i git, så utan den explicita kontrollen finns ingen tand alls.
    const utan = kor(`${h} ${h} refs/heads/main`);
    assert.equal(utan.kod, 1, 'en rad utan fjärr-sha går inte att pröva');
  });

  test('MV-10 · en MERGE-COMMITS egen mekanik räknas', () => {
    // `git log --name-only` listar INGA filer för en merge — en konfliktlösning i en lib/-fil
    // nådde alltså aldrig kravet. `diff-tree -m` diffar mot varje förälder, så den syns.
    // Prövas som BETEENDE mot en syntetisk merge, aldrig som källtext.
    // Formen som lurade den gamla koden: sidogrenens commit ÄR täckt av rapporten, men MERGEN
    // för in en EGEN lib/-ändring (en konfliktlösning). `git log --name-only` visar inga filer
    // för en merge, så den ändringen var osynlig och pushen gick igenom.
    const gren = commitMedFil(sha('HEAD'), 'lib/_prov_gren.js', '// gren\n');
    const merge = commitMedFiler(gren, [['lib/_prov_konflikt.js', '// löst i mergen\n']], [sha('HEAD'), gren]);
    const medBevis = commitMedBevis(merge, `commits: ${gren}\ndom: MERGAS\ngranskare: test\ndatum: 2026-09-13`);
    const r = kor(`${medBevis} ${medBevis} refs/heads/main ${sha('HEAD')}`);
    assert.equal(r.kod, 1, 'en merges EGEN lib/-ändring måste kräva eget bevis');
    assert.match(r.ut, /Utan bevis/);
  });

  test('MV-11 · beviset måste ligga på DEN REF som bär mekaniken', () => {
    // `pushadSha` skrevs över per ref medan commitsen ackumulerades — så rapporten kunde ligga på
    // en ANNAN gren i samma push (`git push --all`). Domen fälls nu per ref.
    const mekanik = execSync(`git log --format=%H ${franRef()}~1..HEAD`, { cwd: ROT, encoding: 'utf8' })
      .trim().split('\n');
    const medBevis = commitMedBevis(sha('HEAD'), `commits: ${mekanik.join(' ')}\ndom: MERGAS\ngranskare: test\ndatum: 2026-09-13`);
    // main bär mekaniken UTAN rapport; master bär rapporten men ingen mekanik.
    const r = kor(
      `${sha('HEAD')} ${sha('HEAD')} refs/heads/main ${franRef()}~1\n`
      + `${medBevis} ${medBevis} refs/heads/master ${sha('HEAD')}`,
    );
    assert.equal(r.kod, 1, 'ett bevis på en annan ref täcker inte mekaniken på den här');
  });

  test('MV-12 · ett filnamn på 40 hex kan inte föreställa en commit-gräns', () => {
    // Commit-gränsen lästes med /^[0-9a-f]{40}$/ mot loggens TEXT — som också matchar ett
    // FILNAMN. En sådan fil i roten sorteras före lib/ och sköt in en falsk, KONSTANT sha i
    // mängden: en rapport, en gång, för alltid. Uppräkningen går nu via rev-list, aldrig text.
    // Formen som lurade den gamla koden: BÅDA filerna i SAMMA commit. `git log --name-only`
    // listar rotfilen först (sorteras före `lib/`), regexen läste den som en ny commit-gräns,
    // och lib/-filen tillskrevs då den FALSKA shan — en konstant, alltså ett bevis för alltid.
    // HELA bypassen: en rapport som namnger den FALSKA shan. Eftersom den är en konstant räcker
    // EN rapport, EN gång, för ALLA framtida mekanikcommits som bär filen — och rapporten får
    // ligga i en ren ops/-commit, som enligt vaktens egen hjälptext inte kräver eget bevis.
    const falsk = 'c'.repeat(40);
    const c2 = commitMedFiler(sha('HEAD'), [[falsk, 'lurendrejeri\n'], ['lib/_prov_bakdorr.js', '// BAKDÖRR\n']]);
    const medBevis = commitMedBevis(c2, `commits: ${falsk}\ndom: MERGAS\ngranskare: test\ndatum: 2026-09-13`);
    const r = kor(`${medBevis} ${medBevis} refs/heads/main ${sha('HEAD')}`);
    assert.equal(r.kod, 1, 'en huvudnyckel får inte kunna tillverkas ur ett hex-filnamn');
    assert.match(r.ut, /Utan bevis/);
  });

  test('MV-08 · flaggan ARVO_GRANSKAD är borta ur skriptet — en escape vore den verkliga mekanismen', () => {
    // Kommentarer strippas: filen FÖRKLARAR varför flaggan togs bort, och den prosan får inte
    // fälla kontrollen (samma form som när liggarvakten fällde sin egen dokumentation).
    const rader = readFileSync(VAKT, 'utf8').split('\n').filter((r) => !/^\s*(\/\/|\*|\/\*)/.test(r));
    const kod = rader.join('\n');
    assert.ok(kod.length > 800, `efter strippning återstod ${kod.length} tecken — ett tomt utsnitt vaktar inget`);
    assert.ok(!/ARVO_GRANSKAD/.test(kod), 'en förbigångsflagga gör rapporten till dekoration');
    assert.match(kod, /granskningstackning/, 'vakten måste använda den prövade domen, aldrig en egen kopia');
  });

  test('MV-03 · MOTPROVET — en feature branch rör inte vakten', () => {
    const till = sha('HEAD');
    assert.equal(kor(`${till} ${till} refs/heads/claude/nagot ${sha('HEAD~1')}`).kod, 0,
      'en grind som fäller varje push blir avstängd');
  });

  test('MV-05 · TOM stdin nekar — «kunde inte läsa» får aldrig bli «allt klart»', () => {
    // Första versionen svarade exit 0 här, med motiveringen att en vakt som nekar det den inte
    // kan läsa blir «ett hinder». Det är ordagrant resonemanget bakom varje fail-open-bugg i den
    // här kodbasen — och det farliga fallet är precis detta: git matar ALLTID refarna på stdin,
    // så tom stdin betyder att någon ANNAN kör hooken. «Någon annan» var agenten som redan
    // pushade förbi regeln en gång.
    const r = kor('');
    assert.equal(r.kod, 1, 'en oprövbar push nekas');
    assert.match(r.ut, /okänt mål nekas/);
    // ⚠️ UNDANTAGET ÄR BORTTAGET 2026-09-13. Förut släppte ARVO_GRANSKAD=1 igenom här. En escape
    // som finns ÄR den verkliga mekanismen — och den här grenen handlar inte ens om granskning,
    // utan om att vi inte kunde läsa vad pushen bär. Ett okänt nekar, utan väg förbi.
    assert.equal(kor('', { ARVO_GRANSKAD: '1' }).kod, 1, 'den gamla flaggan får inte längre öppna någon dörr');
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
