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
// Grinden gör pushen till en MEDVETEN handling i stället för en möjlig: `main` tar bara emot
// mekanikkataloger när `ARVO_GRANSKAD=1` sätts uttryckligen. En agent sätter aldrig en flagga den
// inte fått veta om; en människa som just läst en granskning gör det på en rad.
//
// FÅNGAR: en push till main som bär ändringar i lib/, api/ eller agents/ utan uttryckligt godkännande.
// BLIND: grinden kan inte se OM granskningen faktiskt gjorts — bara att någon påstår det genom att
//   sätta flaggan. Den flyttar bytet av blick från «kom ihåg» till «ta ställning». Den bevisar det
//   inte. Och den ser bara pushar som går genom det här repots hook — en push från en annan klon,
//   från GitHubs webbgränssnitt eller från ett Actions-jobb passerar oberörd.

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const KRAVDA = /^(lib|api|agents)\//;
const NOLL = '0000000000000000000000000000000000000000';

let indata = '';
try {
  indata = readFileSync(0, 'utf8');           // git matar refarna på stdin
} catch {
  indata = '';
}

// Ingen indata = inget att döma. Att neka en push vi inte kan läsa vore att göra vakten till ett
// hinder i stället för en grind — men vi säger ifrån, så tystnaden aldrig ser ut som ett godkännande.
if (!indata.trim()) {
  console.error('[mainvakt] kunde inte läsa refarna — ingen bedömning gjord');
  process.exit(0);
}

const brott = [];
for (const rad of indata.trim().split('\n')) {
  const [, lokalSha, fjarrRef, fjarrSha] = rad.split(/\s+/);
  if (!/refs\/heads\/(main|master)$/.test(fjarrRef ?? '')) continue;
  if (lokalSha === NOLL) continue;                      // radering av grenen, inte en leverans

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
}

if (brott.length === 0) process.exit(0);
if (process.env.ARVO_GRANSKAD === '1') {
  console.log(`✓ Main-vakten — ${brott.length} mekanikfil(er) släppta med ARVO_GRANSKAD=1`);
  process.exit(0);
}

console.error('\n✗ MAIN-VAKTEN — pushen bär mekanik som inte fått en andra blick:\n');
for (const f of [...new Set(brott)].slice(0, 20)) console.error(`  ${f}`);
console.error(`
  Bevisplikten p.1: lib/, api/ och agents/ går till main FÖRST efter en separat granskning
  med enda uppdraget «hitta var det gröna är osant».

  Är granskningen gjord:   ARVO_GRANSKAD=1 git push origin main
  Är den inte gjord:       pusha branchen i stället, och koppla in granskaren.
`);
process.exit(1);
