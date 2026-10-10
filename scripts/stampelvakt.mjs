#!/usr/bin/env node
// scripts/stampelvakt.mjs — DET ENDA BOTTEN FÅR SKRIVA DIREKT TILL main ÄR ETT DATUM SOM FLYTTAS FRAMÅT (2026-10-10)
//
// ══ VARFÖR ══════════════════════════════════════════════════════════════════════════════════
// Grenskyddet på main (PR #80) avvisar varje push som inte går via en PR. Verifierarfabrikens
// stämpel (scripts/verify.mjs → lastVerified i prisboken) pushade direkt till main och föll på
// GH006 — mätt i körning 38090943472, där jobbet ändå visade grönt (`continue-on-error` + `exit 0`).
// Datumen bredvid «verifierat» i kundens rum hade slutat röra sig utan att någon såg det.
//
// En PR per stämpel bär inte: en PR som skapas av GITHUB_TOKEN startar inga arbetsflöden, så de
// fyra obligatoriska kontrollerna rapporteras aldrig. Och stämpeln ändrar agents/recommender/
// branchindex.js, så Commitkravet och Andra blicken hade krävt ett sabotage och en granskning av ett
// DATUM — något en bot bara kan uppfylla genom att hitta på texten.
//
// Därför får botten en egen nyckel förbi grenskyddet (BOT_DEPLOY_KEY, bara i miljön produktion,
// alltså bara från main), och den här vakten avgör FÖRE pushen att undantaget bara bär det det
// finns för: varje ändrad rad skiljer sig från sin föregångare ENBART i ett `lastVerified`-datum,
// och datumet flyttas framåt men aldrig förbi i dag. Allt annat — ett pris, en ny rad, en annan
// fil — fäller pushen rött, även om verifieraren skulle börja skriva det.
//
// FÅNGAR: en annan fil än prisboken; en ändrad rad som skiljer sig i något mer än datumet (ett pris
//   bredvid stämpeln); en tillagd eller borttagen rad; ett datum som flyttas bakåt, står still eller
//   hamnar i framtiden; ett ogiltigt datum; en diff vakten inte kan läsa (fail-closed, SP-04); en tom diff
//   som skulle kunna läsas som «godkänd».
// BLIND: om verifieraren läste RÄTT tal innan den stämplade — det är stampelbeslut()s och
//   verifierarens ansvar (lib/verifieringsstampel.js, VS-01..). Vakten ser att bara datum flyttades,
//   aldrig att datumet förtjänades. Den ser heller inte arbetsflödet: att pushen faktiskt går via
//   vakten låser SP-06 i tests/stampelvakt.mjs.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const STAMPELFIL = 'agents/recommender/branchindex.js';
const DATUM = /lastVerified:(\s*)'([^']*)'/g;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

const giltigtDatum = (d) => ISO.test(d) && new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10) === d;

/**
 * @param {string} diff  `git diff -U0 <bas> HEAD`
 * @param {{ idag: string }} p  dagens datum, YYYY-MM-DD (UTC)
 * @returns {{ ok: boolean, skal: string, datum?: number }}
 */
export function granskaStampeldiff(diff, { idag } = {}) {
  if (!giltigtDatum(String(idag ?? ''))) return { ok: false, skal: 'inget giltigt dagens datum att pröva mot' };
  const rader = String(diff ?? '').split('\n');
  const hunkar = [];
  let fil = null;
  let hunk = null;
  for (const rad of rader) {
    if (rad.startsWith('diff --git ')) {
      const m = rad.match(/^diff --git a\/(\S+) b\/(\S+)$/);
      if (!m || m[1] !== m[2]) return { ok: false, skal: `oläsbart filhuvud: ${rad.slice(0, 120)}` };
      fil = m[2];
      if (fil !== STAMPELFIL) return { ok: false, skal: `${fil} ändras — botten får bara stämpla ${STAMPELFIL}` };
      hunk = null;
      continue;
    }
    if (/^(index |--- |\+\+\+ )/.test(rad)) continue;
    if (/^(new|deleted) file mode|^(old|new) mode|^similarity index|^rename |^Binary files/.test(rad)) {
      return { ok: false, skal: `filen byter form, inte bara datum: ${rad.slice(0, 80)}` };
    }
    if (rad.startsWith('@@')) {
      if (!fil) return { ok: false, skal: 'hunk utan filhuvud' };
      hunk = { bort: [], till: [] };
      hunkar.push(hunk);
      continue;
    }
    if (rad.startsWith('-') || rad.startsWith('+')) {
      if (!hunk) return { ok: false, skal: `ändrad rad utanför en hunk: ${rad.slice(0, 80)}` };
      (rad.startsWith('-') ? hunk.bort : hunk.till).push(rad.slice(1));
      continue;
    }
    if (rad === '' || rad.startsWith('\\ No newline')) continue;
    return { ok: false, skal: `oväntad rad i diffen: ${rad.slice(0, 80)}` };
  }
  if (hunkar.length === 0) return { ok: false, skal: 'tom diff — det finns ingen stämpel att pusha' };

  let datum = 0;
  for (const h of hunkar) {
    if (h.bort.length !== h.till.length) {
      return { ok: false, skal: `${h.bort.length} rad(er) bort mot ${h.till.length} till — en stämpel lägger aldrig till eller tar bort en rad` };
    }
    for (let i = 0; i < h.bort.length; i++) {
      const fore = h.bort[i];
      const efter = h.till[i];
      const gamla = [...fore.matchAll(DATUM)].map((m) => m[2]);
      const nya = [...efter.matchAll(DATUM)].map((m) => m[2]);
      if (gamla.length === 0 || gamla.length !== nya.length) {
        return { ok: false, skal: `raden bär ingen stämpel att flytta: ${efter.trim().slice(0, 100)}` };
      }
      if (fore.replace(DATUM, "lastVerified:$1'§'") !== efter.replace(DATUM, "lastVerified:$1'§'")) {
        return { ok: false, skal: `raden ändras i mer än datumet: ${efter.trim().slice(0, 100)}` };
      }
      for (let j = 0; j < nya.length; j++) {
        if (gamla[j] === nya[j]) continue;
        if (!giltigtDatum(nya[j])) return { ok: false, skal: `ogiltigt datum «${nya[j]}»` };
        if (giltigtDatum(gamla[j]) && nya[j] < gamla[j]) return { ok: false, skal: `datumet flyttas bakåt: ${gamla[j]} → ${nya[j]}` };
        if (nya[j] > idag) return { ok: false, skal: `datumet ${nya[j]} ligger efter i dag (${idag})` };
        datum++;
      }
    }
  }
  if (datum === 0) return { ok: false, skal: 'inget datum flyttades — raderna är oförändrade i sak' };
  return { ok: true, skal: `${datum} verifieringsdatum flyttade framåt, inget annat ändrat`, datum };
}

// ── CLI: node scripts/stampelvakt.mjs <bas-sha> ─────────────────────────────────────────────
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const bas = process.argv[2];
  if (!bas) { console.error('::error::stampelvakt: bas-sha saknas'); process.exit(2); }
  let diff;
  try {
    diff = execFileSync('git', ['diff', '-U0', '--no-color', '--no-ext-diff', bas, 'HEAD'], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  } catch (e) {
    console.error(`::error::stampelvakt: diffen kunde inte läsas (${e.message.split('\n')[0]}) — ingen push`);
    process.exit(1);
  }
  const idag = new Date().toISOString().slice(0, 10);
  const u = granskaStampeldiff(diff, { idag });
  if (!u.ok) {
    console.error(`::error::stampelvakt: ${u.skal} — ingen push till main`);
    process.exit(1);
  }
  console.log(`✓ stampelvakt: ${u.skal}`);
}
