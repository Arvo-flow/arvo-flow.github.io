#!/usr/bin/env node
// scripts/mainvakt.mjs — pre-push: `main` tar inte emot lib/, api/ eller agents/ utan en andra blick.
//
// ══ VARFÖR (2026-09-02) ═════════════════════════════════════════════════════════════════════
//
// Bevisplikten p.1 säger att byggaren stannar på branchen tills en separat granskning skett.
// Regeln var PROSA, och prosa hindrar ingenting: en underagent jag startade för en helt orelaterad
// rekognosering körde `git push origin HEAD:main` och tog med sig mina oreviderade vaktfixar.
// Beslutet att hålla dem kvar upphävdes av en mekanism jag inte kontrollerade, tyst.
//
// Det väger tyngre än den enskilda commiten: en agentsvärm om hundratals agenter, där var och en
// kan skriva till `main`, är en produktionsrisk som växer linjärt med flottans storlek.
//
// ⚠️ FLAGGAN ÄR BORTTAGEN 2026-09-13 — DEN VAR ETT HEDERSORD FÖRKLÄTT TILL MEKANISM.
// Grinden krävde `ARVO_GRANSKAD=1`. Den 13 september satte jag den flaggan själv, på mitt eget
// ord om att granskningen var gjord, och pushade fem mekanikcommits till `main`. Granskningen VAR
// gjord — men grinden kunde inte veta det, och en grind som inte kan veta vaktar ingenting.
// Gamla docstringen DEKLARERADE hålet i klartext, och att det var deklarerat hindrade det inte.
//
// Kravet är nu ett FYSISKT BEVIS som reser med pushen: en rapport i `ops/granskningar/` som
// NAMNGER varje mekanikcommit och bär domen MERGAS (`lib/granskningsbevis.js`). Rapporten läses
// ur den PUSHADE trädversionen, aldrig ur arbetsträdet — annars hade en lokal, ocommittad fil
// räckt, och då vore beviset lika flyktigt som flaggan.
//
// Ingen förbigångsflagga finns kvar, med flit: ett skydd bakom ett annat skydd är inte två lager
// (bibeln 10 sept). Lämnas en escape kvar är DEN mekanismen och rapporten dekoration.
//
// FÅNGAR: en push till main som bär lib/, api/ eller agents/ utan en rapport som namnger just den
//   commiten; en rapport vars dom är BLOCKERAR; en commit tillagd EFTER granskningen (täckningen
//   prövas per commit, aldrig per push).
// BLIND: grinden läser en ARTEFAKT, aldrig en granskning. Att rapporten finns bevisar inte att
//   någon letade, eller letade väl — samma gräns som vaktkontraktet. Skillnaden mot flaggan är
//   ändå avgörande: ett påstående på disk kan öppnas och hållas mot koden i efterhand, en
//   miljövariabel försvinner i samma sekund den satts. Och den ser bara pushar genom det HÄR
//   repots hook — en push från en annan klon, från webbgränssnittet eller från Actions passerar
//   oberörd.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { granskningstackning, BEVIS_KATALOG } from '../lib/granskningsbevis.js';

// ⚠️ VAKTENS EGNA VERKSTÄLLARE INGÅR SEDAN 2026-09-13 (granskarens K3). Förut låg
// `scripts/mainvakt.mjs` UTANFÖR kravet: ett enda steg — ersätt filen med `process.exit(0)`,
// committa, pusha — tog bort grinden för varje framtida klon. Inget `--no-verify`, ingen flagga.
// En vakt som inte vaktar sin egen avstängning är ett hedersord en nivå upp.
const KRAVDA = /^(lib|api|agents)\/|^scripts\/(mainvakt|setup-hooks)\.mjs$/;
const NOLL = '0000000000000000000000000000000000000000';

let indata = '';
try {
  indata = readFileSync(0, 'utf8');           // git matar refarna på stdin
} catch {
  indata = '';
}

// ⚠️ FÖRSTA VERSIONEN SLÄPPTE IGENOM HÄR, och motiveringen löd «att neka en push vi inte kan läsa
// vore att göra vakten till ett hinder». Det är ordagrant det resonemang som producerat varje
// fail-open-bugg i den här kodbasen  // pastaende-ok: beskriver ett fällt resonemang, gör inget anspråk
//
// Och det farliga fallet är precis det här. Git matar ALLTID refarna på stdin när den anropar
// hooken — är stdin tom körs vi från något annat, och «något annat» är just den agent som redan
// pushade förbi regeln en gång. En oprövbar push till ett okänt mål nekas, UTAN undantag: den
// gamla escapen (ARVO_GRANSKAD=1) är borttagen i hela filen, för en escape är alltid den
// verkliga mekanismen. (MV-05.)
if (!indata.trim()) {
  console.error('[mainvakt] kunde inte läsa refarna — okänt mål nekas. Detta är INTE ett godkännande.');
  process.exit(1);
}

// ⚠️ FYRA VÄGAR FÖRBI, ALLA MÄTTA AV GRANSKAREN 2026-09-13 — och jag hade skrivit «ingen
// förbigångsflagga finns kvar» innan jag körde det. Påståendet före körningen, i grinden som
// byggdes mot just den sjukdomen. Vad som var fel, och varför formen är densamma i alla fyra:
//
//  1. `git diff --name-only <sha>` (när fjärr-shan var okänd) jämför mot ARBETSTRÄDET, inte mot
//     föräldern. Rent träd → tom diff → exit 0 innan ett enda bevis lästes. MV-04 var grön på fel
//     grund: den matade en sha som inte finns, så git kastade — med en VERKLIG sha svarade 0.
//  2. `git log --name-only` listar INGA filer för en merge-commit. En konfliktlösning i en
//     `lib/`-fil nådde alltså aldrig kravet.
//  3. `pushadSha` skrevs över per ref medan commitsen ackumulerades, så beviset kunde ligga på en
//     ANNAN gren än mekaniken (`git push --all`).
//  4. Commit-gränsen lästes med `/^[0-9a-f]{40}$/` — som också matchar ett FILNAMN på 40 hex.
//     En sådan fil i roten sorteras före `lib/` och sköt in en falsk, KONSTANT sha i mängden:
//     en rapport, en gång, för alltid.
//
// Rotorsaken är EN: grinden och täckningen läste ur två olika källor (`git diff` mot `git log`),
// och den ena parsades som TEXT. Nu härleds båda ur SAMMA per-commit-uppräkning, och inget
// git-utfall tolkas som text. Dessutom körs allt via `execFileSync` med argumentlista — ingen
// shell, alltså kan varken mellanslag eller `$( )` i ett filnamn påverka något (löser F8/F9).

/** Kör git utan shell. Kastar vidare — varje anropare avgör själv att ett OKÄNT nekar. */
function git(args) {
  return execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

function neka(skal) {
  console.error(`[mainvakt] ${skal} — okänt nekas. Detta är INTE ett godkännande.`);
  process.exit(1);
}

for (const rad of indata.trim().split('\n')) {
  const [, lokalSha, fjarrRef, fjarrSha] = rad.split(/\s+/);
  if (!/refs\/heads\/(main|master)$/.test(fjarrRef ?? '')) continue;
  if (lokalSha === NOLL) continue;                      // radering av grenen, inte en leverans

  // ── VILKA COMMITS PUSHAS? ──────────────────────────────────────────────────────────────────
  // Ett okänt fjärrläge går inte att pröva, och då nekas det (MV-09).
  //
  // ⚠️ MIN FÖRSTA FIX VAR SÄMRE ÄN BUGGEN, och bara en körning visade det. Jag skrev
  // `rev-list <sha> --not --remotes` för det okända fallet — men `--remotes` utesluter allt som
  // redan finns på NÅGON fjärrgren, alltså även feature branchen. «Pusha branchen först, sedan
  // main» hade gått rakt igenom  // pastaende-ok: beskriver en förkastad lösning, inte koden nedan
  // — alltså just det arbetsflöde vakten finns för. En fix som öppnar en bredare dörr än den
  // stänger. Att i stället lista hela historiken hade krävt bevis för tusen gamla commits, och
  // en sådan vakt stängs av på sin första dag. Fallet inträffar bara när `main` skapas på
  // fjärren första gången; sker det ska en människa ta ställning, inte en regex.
  if (!fjarrSha || fjarrSha === NOLL) {
    neka(`${fjarrRef} finns inte på fjärren — ett spann går inte att bilda, alltså går pushen inte att pröva`);
  }
  // ⚠️ EN REWIND ÄR OSYNLIG FÖR `rev-list` (granskarens K2, en regression jag själv införde).
  // `rev-list <fjarr>..<lokal>` är TOMT när lokal är förfader till fjärr — alltså såg grinden
  // noll commits medan pushen RADERADE `lib/`-filer ur main, och svarade exit 0. Den gamla
  // `git diff`-vägen såg borttagningen. Mätt: rev-list 0 rader, git diff 1 rad.
  //
  // En icke-fast-forward-push till main kan inte prövas som ett spann och nekas därför. Att i
  // stället pröva `A...B` hade krävt bevis för commits som ALDRIG pushas, vilket är obrukbart —
  // och en rewind av main är ett beslut en människa ska fatta, inte en regex. MV-14.
  try {
    git(['merge-base', '--is-ancestor', fjarrSha, lokalSha]);
  } catch {
    neka(`${fjarrRef} skulle skrivas över (icke-fast-forward) — en rewind går inte att pröva som ett spann`);
  }
  let commits;
  try {
    commits = git(['rev-list', `${fjarrSha}..${lokalSha}`]).split('\n').filter(Boolean);
  } catch {
    neka(`kunde inte räkna upp commits för ${fjarrRef}`);
  }

  // ── VILKA AV DEM BÄR MEKANIK? ──────────────────────────────────────────────────────────────
  // `diff-tree -m` diffar en merge mot VARJE förälder, så en konfliktlösning i lib/ syns. Att det
  // över-rapporterar för vanliga merges är avsiktligt: över-rapportering kräver mer bevis, aldrig
  // mindre. Riktningen är den säkra.
  const mekanikCommits = [];
  const brott = new Set();
  for (const c of commits) {
    let filer;
    try {
      // `--root`: utan den skriver `diff-tree` INGENTING för en parentlös commit. Blindheten är
      // verklig och mätt — repot är shallow, och den graftade commiten ger 0 rader utan flaggan
      // mot 1 127 med (granskarens K1).
      //
      // ⚠️ MEN DEN HAR INGEN EGEN TAND I PUSH-VÄGEN, och jag skrev först «LASTBÄRANDE» utan att
      // ha kört det. Mätt: tas BARA `--root` bort är sviten grön; först när fast-forward-kontrollen
      // OCKSÅ tas bort faller MV-13. Skälet är strukturellt — en parentlös commit kan aldrig ha
      // fjärrens sha som förfader, så den nekas en rad tidigare. Raden står kvar för att
      // fillistan ska vara sann om vakten någon gång anropas på annat sätt, men den räknas INTE
      // som ett skydd: ett skydd bakom ett annat skydd är inte två lager (bibeln 10 sept).
      filer = git(['diff-tree', '-r', '-m', '--root', '--no-commit-id', '--name-only', c]).split('\n').filter(Boolean);
    } catch {
      neka(`kunde inte läsa filerna i ${c.slice(0, 8)}`);
    }
    const traffar = filer.filter((f) => KRAVDA.test(f));
    if (traffar.length) {
      mekanikCommits.push(c);
      for (const f of traffar) brott.add(f);
    }
  }
  if (mekanikCommits.length === 0) continue;            // inget mekanik på den här refen

  // ── BEVISEN LÄSES UR DEN REF SOM BÄR MEKANIKEN ─────────────────────────────────────────────
  // Per ref, aldrig delat: annars kunde rapporten ligga på en ANNAN gren i samma push (`--all`).
  const bevisfiler = [];
  try {
    // `-z` + NUL-delning: filnamn med mellanslag, citattecken eller å/ä/ö citeras annars av git
    // och tappas tyst. En giltig rapport som försvinner utan ett ord är en vakt som blir avstängd.
    const lista = git(['ls-tree', '-r', '-z', '--name-only', lokalSha, '--', BEVIS_KATALOG]);
    for (const fil of lista.split('\0').filter(Boolean)) {
      if (!fil.toLowerCase().endsWith('.md')) continue;
      try { bevisfiler.push({ fil, text: git(['show', `${lokalSha}:${fil}`]) }); }
      catch { /* kan inte läsas ur trädet → räknas inte, och commiten blir då otäckt */ }
    }
  } catch {
    neka(`kunde inte läsa ${BEVIS_KATALOG} ur ${lokalSha.slice(0, 8)}`);
  }

  const dom = granskningstackning(mekanikCommits, bevisfiler);
  if (dom.ok) {
    console.log(`✓ Main-vakten — ${mekanikCommits.length} mekanikcommit(s) på ${fjarrRef} täckta av granskningsbevis`);
    continue;
  }

  console.error(`\n✗ MAIN-VAKTEN — ${fjarrRef} bär mekanik utan granskningsbevis:\n`);
  for (const f of [...brott].slice(0, 12)) console.error(`  ${f}`);
  if (dom.blockerade.length) {
    console.error('\n  Granskad och BLOCKERAD — en rapport som finns är inte en rapport som friade:');
    for (const b of dom.blockerade) console.error(`    ${b.sha.slice(0, 8)}  →  ${b.fil}`);
  }
  if (dom.otackta.length) {
    console.error('\n  Utan bevis:');
    for (const sha of dom.otackta) console.error(`    ${sha.slice(0, 8)}`);
  }
  if (dom.trasiga.length) {
    console.error('\n  Rapporter som inte gick att läsa:');
    for (const t of dom.trasiga) console.error(`    ${t.fil} — ${t.skal}`);
  }
  console.error(`
  Bevisplikten p.1: lib/, api/ och agents/ går till main FÖRST efter en separat granskning
  med enda uppdraget «hitta var det gröna är osant».

  Beviset är en RAPPORT, inte ett hedersord. Lägg en fil i ${BEVIS_KATALOG}/ med rubriken:

      <!-- granskning
      commits: <sha> <sha>
      dom: MERGAS
      granskare: <vem>
      datum: <ÅÅÅÅ-MM-DD>
      -->

  ...följt av fynden. Committa rapporten PÅ SAMMA GREN (den rör bara ops/ och kräver därför
  inget eget bevis) och pusha igen. Är granskningen inte gjord: pusha branchen i stället.
`);
  process.exit(1);
}

// Inga main/master-refar i pushen, eller alla täckta: en feature branch rör aldrig vakten.
// (`nagotProvat` togs bort 2026-09-13 — båda dess grenar avslutade 0, alltså var den död kod
// som SÅG UT som ett beslut. Granskarens [VAKT] 2.)
process.exit(0);
