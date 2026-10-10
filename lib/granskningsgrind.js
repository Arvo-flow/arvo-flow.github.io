// lib/granskningsgrind.js — Bevisplikten p.1 i CI: mekanik når main bara med en granskning som
// täcker det som mergas.
//
// ══ VARFÖR (2026-10-10) ═════════════════════════════════════════════════════════════════════
// Mätt samma dag: av 146 workflows kördes ingen på `pull_request`, och ingen körde sviten. Varje
// vakt var en lokal git-hook — och klonen grundaren arbetar i hade inga installerade hooks (bara
// `.sample`-filer) och ingen node. Vakterna hade alltså aldrig kört där. Mainvakten skriver själv
// sin blindfläck: en push från en annan klon, från webbgränssnittet eller från Actions passerar.
//
// Granskningen är en fil, `ops/GRANSKNING-<namn>.md`, med det huvud som redan står i
// ops/GRANSKNING-tystnadsskal-acea9cd.md och ops/GRANSKNING-skrapdom-*.md:
//
//   commits: <sha> [<sha> …]
//   dom: MERGAS | BLOCKERAR
//
// REGELN. Bland granskningarna som namnger en commit i PR:en gäller den SENASTE (den vars namngivna
// commit ligger sist). Vid lika gäller BLOCKERAR — «vid tvekan: [KUND]». Den domen måste vara
// MERGAS, och ingen mekanikfil som PR:en ändrar får ha ändrats efter den granskade commiten. En
// lagning efter domen är en ny ändring och behöver sin egen blick: bibeln 24 sep, «varje
// granskningsvarv hittade fel i det FÖRRA varvets lagning». Tester, ops och docs efter domen släpps,
// eftersom stoppregeln säger att [VAKT] lagas framåt och en skärpt svit ändrar inget kundtal.
//
// FÅNGAR: mekanik utan granskningsfil; en senaste dom som är BLOCKERAR eller oläsbar; en granskning
//   som bara namnger commits utanför PR:en (en gammal fil kan inte återanvändas); en förkortad sha
//   som träffar två commits; mekanik ändrad efter den granskade commiten.
// BLIND: att granskningen GJORDES, och av en annan blick än byggarens. Grinden ser en fil med rätt
//   huvud och kan inte se vem som skrev den eller om den är sann. Den gör bytet av blick spårbart
//   i PR:en — den bevisar det inte. Det enda som binder en annan person är GitHubs krav på godkänd
//   review, och det är en repoinställning, inte kod.

import { KRAVDA_KATALOGER } from './commitkrav.js';

const SHA_TOKEN = /^[0-9a-f]{7,40}$/;

/**
 * Läser huvudet. Saknas `commits:` är filen ingen granskning i grindens mening (äldre format).
 * @returns {{ commits: string[], dom: 'MERGAS'|'BLOCKERAR'|null } | null}
 */
export function lasGranskning(text) {
  const t = String(text ?? '');
  const c = t.match(/^commits:[ \t]*(.+)$/mi);
  if (!c) return null;
  const commits = c[1].split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter((s) => SHA_TOKEN.test(s));
  const d = t.match(/^dom:[ \t]*\**[ \t]*(MERGAS|BLOCKERAR)\b/mi);
  return { commits, dom: d ? d[1].toUpperCase() : null };
}

/**
 * @param {object} p
 * @param {string[]} p.prCommits      PR:ens commits, fulla sha, äldst först
 * @param {string[]} p.andradeFiler   filer PR:en ändrar netto (`bas...HEAD`)
 * @param {{ fil: string, text: string }[]} p.granskningar
 * @param {(sha: string) => string[]} p.andratSedan  filer som skiljer mellan sha och HEAD
 * @returns {{ ok: boolean, skal: string, granskning?: string, ogranskade?: string[] }}
 */
export function andraBlicken({ prCommits, andradeFiler, granskningar, andratSedan }) {
  if (!Array.isArray(prCommits) || !Array.isArray(andradeFiler) || !Array.isArray(granskningar)) {
    throw new Error('andraBlicken: indata saknas — ett okänt intervall får aldrig bli ett godkännande');
  }
  const mekanik = andradeFiler.filter((f) => KRAVDA_KATALOGER.test(f));
  if (mekanik.length === 0) return { ok: true, skal: 'PR:en ändrar ingen fil i lib/, api/ eller agents/' };

  const traffar = [];
  for (const g of granskningar) {
    const huvud = lasGranskning(g.text);
    if (!huvud) continue;
    let senast = -1;
    for (const kort of huvud.commits) {
      const idx = prCommits.map((s, i) => (s.startsWith(kort) ? i : -1)).filter((i) => i >= 0);
      if (idx.length > 1) return { ok: false, skal: `${g.fil}: «${kort}» träffar ${idx.length} commits i PR:en — skriv en längre sha` };
      if (idx.length === 1) senast = Math.max(senast, idx[0]);
    }
    if (senast >= 0) traffar.push({ fil: g.fil, dom: huvud.dom, idx: senast });
  }
  if (traffar.length === 0) {
    return { ok: false, skal: `${mekanik.length} mekanikfil(er) utan granskning: ingen ops/GRANSKNING-*.md namnger en commit i PR:en (huvud «commits:» + «dom:»)` };
  }

  const varde = (t) => (t.dom === 'MERGAS' ? 1 : 0);
  traffar.sort((a, b) => b.idx - a.idx || varde(a) - varde(b));
  const galler = traffar[0];
  if (galler.dom !== 'MERGAS') {
    return { ok: false, granskning: galler.fil, skal: `${galler.fil}: senaste domen är ${galler.dom ?? 'oläsbar'} — bara «dom: MERGAS» släpper mekanik till main` };
  }

  const sedan = new Set(andratSedan(prCommits[galler.idx]));
  const ogranskade = mekanik.filter((f) => sedan.has(f));
  if (ogranskade.length) {
    return { ok: false, granskning: galler.fil, ogranskade, skal: `${ogranskade.length} mekanikfil(er) ändrade efter den granskade commiten ${prCommits[galler.idx].slice(0, 7)} — en lagning behöver sin egen blick` };
  }
  return { ok: true, granskning: galler.fil, skal: `${mekanik.length} mekanikfil(er) täckta av ${galler.fil} (commit ${prCommits[galler.idx].slice(0, 7)})` };
}
