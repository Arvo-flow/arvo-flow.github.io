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

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { granskningstackning, BEVIS_KATALOG } from '../lib/granskningsbevis.js';

const KRAVDA = /^(lib|api|agents)\//;
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

const brott = [];
const mekanikCommits = new Set();
let pushadSha = null;

for (const rad of indata.trim().split('\n')) {
  const [, lokalSha, fjarrRef, fjarrSha] = rad.split(/\s+/);
  if (!/refs\/heads\/(main|master)$/.test(fjarrRef ?? '')) continue;
  if (lokalSha === NOLL) continue;                      // radering av grenen, inte en leverans
  pushadSha = lokalSha;

  const omfang = fjarrSha && fjarrSha !== NOLL ? `${fjarrSha}..${lokalSha}` : lokalSha;
  let filer = '';
  try {
    filer = execSync(`git diff --name-only ${omfang}`, { encoding: 'utf8' });
  } catch {
    // Kan vi inte läsa diffen vet vi inte vad pushen bär. Ett OKÄNT nekar, fail-closed (MV-04).
    console.error(`[mainvakt] kunde inte läsa ${omfang} — okänt innehåll nekas`);
    process.exit(1);
  }
  for (const f of filer.split('\n').filter(Boolean)) {
    if (KRAVDA.test(f)) brott.push(f);
  }
  if (!brott.length) continue;

  // ── VILKA COMMITS bär mekaniken? Täckningen prövas per commit, aldrig per push: annars hade
  //    «granska en gång och lägg tyst på en commit till» passerat. (MV-08.)
  try {
    const logg = execSync(`git log --format=%H --name-only ${omfang}`, { encoding: 'utf8' });
    let nuvarande = null;
    for (const rad2 of logg.split('\n')) {
      if (/^[0-9a-f]{40}$/.test(rad2)) { nuvarande = rad2; continue; }
      if (rad2 && nuvarande && KRAVDA.test(rad2)) mekanikCommits.add(nuvarande);
    }
  } catch {
    console.error(`[mainvakt] kunde inte läsa commit-loggen för ${omfang} — okänt innehåll nekas`);
    process.exit(1);
  }
}

if (brott.length === 0) process.exit(0);

// ── BEVISEN LÄSES UR DEN PUSHADE TRÄDVERSIONEN ───────────────────────────────────────────────
// Aldrig ur arbetsträdet: en ocommittad lokal fil hade då räckt som «bevis», och då vore det lika
// flyktigt som flaggan det ersätter. `git show <sha>:<fil>` garanterar att rapporten reser med.
const bevisfiler = [];
try {
  const lista = execSync(`git ls-tree -r --name-only ${pushadSha} -- ${BEVIS_KATALOG}`, { encoding: 'utf8' });
  for (const fil of lista.split('\n').filter((f) => f.endsWith('.md'))) {
    try {
      bevisfiler.push({ fil, text: execSync(`git show ${pushadSha}:${fil}`, { encoding: 'utf8' }) });
    } catch { /* filen kan inte läsas ur trädet — den räknas då helt enkelt inte */ }
  }
} catch {
  console.error(`[mainvakt] kunde inte läsa ${BEVIS_KATALOG} ur ${pushadSha} — okänt nekas`);
  process.exit(1);
}

const dom = granskningstackning([...mekanikCommits], bevisfiler);
if (dom.ok && mekanikCommits.size > 0) {
  console.log(`✓ Main-vakten — ${mekanikCommits.size} mekanikcommit(s) täckta av granskningsbevis i ${BEVIS_KATALOG}/`);
  process.exit(0);
}

console.error('\n✗ MAIN-VAKTEN — pushen bär mekanik utan granskningsbevis:\n');
for (const f of [...new Set(brott)].slice(0, 12)) console.error(`  ${f}`);
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

  ...följt av fynden. Committa rapporten (den rör bara ops/ och kräver därför inget eget
  bevis) och pusha igen. Är granskningen inte gjord: pusha branchen och koppla in granskaren.
`);
process.exit(1);
