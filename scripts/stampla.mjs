#!/usr/bin/env node
// scripts/stampla.mjs — lägger verifierarnas stämpelbeslut på en färsk main, i ETT jobb (2026-10-10)
//
//   node scripts/stampla.mjs <katalog med stampel-*.json>
//
// Varför ett eget steg: förr committade och pushade varje matrisjobb i verify-sources.yml sin egen
// stämpel. Det gav en skrivbar token i jobb som kör `npm install playwright-extra` (paket utanför
// låsfilen), och nitton jobb som tävlade om samma fil med rebase-loopar. Nu fattar matrisjobbet
// BESLUTET (stampelbeslut, där bevisen finns) och skriver det till en fil; det här skriptet
// tillämpar besluten med samma rena funktioner (stamplaKalla/stamplaKategori) i ett enda jobb som
// ensamt håller nyckeln.
//
// ══ ETT DATUM FÅR BARA HAMNA PÅ DET PRIS SOM VERIFIERADES (andra blickens K1, 2026-10-10) ══════
// Besluten läggs på den main som gäller NÄR jobbet körs. Har en PR ändrat ett pris under körningen
// hade det nya, overifierade priset fått dagens «verifierat» — granskaren visade det genom att köra
// pushsteget. Därför bär varje beslut prisbokens AVTRYCK vid verifieringen (sha256 av filen med
// varje lastVerified-datum utbytt), och ett beslut läggs bara på om main har samma avtryck. Ett
// annat körnings stämpel flyttar bara datum och ändrar inte avtrycket; ett pris gör det. Avtrycket
// gäller hela filen, inte nyckeln: en ändring var som helst i prisboken under körningen ger ingen
// stämpel den veckan. Det är den säkra riktningen, och en kopia av kategoriblockens gränser hade
// varit en andra sanning (regel 1).
//
// ══ ETT BESLUT ÄR INDATA, INTE ETT BEVIS (V2) ════════════════════════════════════════════════
// Filerna kommer från matrisjobb som kör paket utanför låsfilen. Ett beslut får därför bara stämpla
// det källan har DEKLARERAT (bevakadeTiers/bevakadKategori i registret), med ett datum inom
// körningens fönster, och bara i en fil som bär källans namn. Allt annat är rött — ett beslut som
// inte går att lita på stoppar hela stämpeln, det hoppas inte tyst över.
//
// FÅNGAR: ett pris som ändrats mellan verifiering och stämpel (SP-08); ett beslut utanför källans
//   deklaration, med fel datum, i fel fil eller utan avtryck (SP-09).
// BLIND: att källan faktiskt VAR grön. Ett komprometterat matrisjobb kan fortfarande skriva ett
//   beslut i sitt eget namn för det det deklarerat; det kan inte längre nå andra källors nycklar.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stamplaKalla, stamplaKategori } from '../lib/verifieringsstampel.js';

const ROT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
export const PRISBOK = join(ROT, 'agents', 'recommender', 'branchindex.js');
const ISO = /^\d{4}-\d{2}-\d{2}$/;
/** Hur gammalt ett beslut får vara när det läggs på: artefakterna sparas 7 dygn, en omkörning kan komma sent. */
export const FONSTER_DAGAR = 8;

/** Prisbokens avtryck med varje verifieringsdatum utbytt — rör sig för ett pris, aldrig för en stämpel. */
export function prisbokAvtryck(kalla) {
  return createHash('sha256').update(String(kalla).replace(/lastVerified:(\s*)'[^']*'/g, "lastVerified:$1'§'")).digest('hex');
}

function dagarMellan(a, b) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
}

/**
 * Prövar ett beslut mot registret och körningens fönster. Kastar — ett beslut som inte går att lita
 * på ska stoppa stämpeln, inte hoppas över.
 */
export function provaBeslut(b, { register, idag }) {
  const fel = (s) => { throw new Error(`stämpelbeslutet avvisas (${s}): ${JSON.stringify(b).slice(0, 160)}`); };
  if (!b || typeof b.kalla !== 'string' || !Array.isArray(b.nycklar)) fel('går inte att läsa');
  const v = register[b.kalla];
  if (!v) fel(`okänd källa «${b.kalla}»`);
  if (!ISO.test(String(b.datum))) fel('ogiltigt datum');
  if (!ISO.test(String(idag))) fel('inget dagens datum');
  const alder = dagarMellan(b.datum, idag);
  if (alder < 0 || alder > FONSTER_DAGAR) fel(`datumet ${b.datum} ligger utanför körningens fönster (${idag}, ${FONSTER_DAGAR} dygn)`);
  const deklarerade = new Set(v.bevakadeTiers ?? []);
  const utanfor = b.nycklar.filter((k) => !deklarerade.has(k));
  if (utanfor.length) fel(`${b.kalla} har inte deklarerat ${utanfor.join(', ')}`);
  if (b.kategori != null && b.kategori !== (v.bevakadKategori ?? null)) fel(`${b.kalla} bevakar inte kategorin «${b.kategori}»`);
  if (!/^[0-9a-f]{64}$/.test(String(b.prisbokAvtryck ?? ''))) fel('saknar prisbokens avtryck');
}

/**
 * @param {string} kalla  prisbokens källtext på main
 * @param {object[]} beslut
 * @param {{ register: Record<string, {bevakadeTiers?: string[], bevakadKategori?: string}>, idag: string }} p
 * @returns {{ kalla: string, andrade: string[], hoppade: string[] }}
 */
export function tillampaStamplar(kalla, beslut, { register, idag } = {}) {
  if (!register || typeof register !== 'object') throw new Error('tillampaStamplar: registret saknas');
  for (const b of beslut) provaBeslut(b, { register, idag });
  const nu = prisbokAvtryck(kalla);
  let ut = kalla;
  const andrade = [];
  const hoppade = [];
  for (const b of beslut) {
    if (b.prisbokAvtryck !== nu) { hoppade.push(b.kalla); continue; }
    const n = stamplaKalla(ut, b.nycklar, b.datum);
    ut = n.kalla;
    andrade.push(...n.andrade.map((k) => `${b.kalla}:${k}`));
    if (b.kategori) {
      const k = stamplaKategori(ut, b.kategori, b.datum);
      if (k.andrad) { ut = k.kalla; andrade.push(`${b.kalla}:${b.kategori}`); }
    }
  }
  return { kalla: ut, andrade, hoppade };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const katalog = process.argv[2];
  if (!katalog) { console.error('::error::stampla: katalog saknas'); process.exit(2); }
  const { VERIFIERS } = await import('../lib/verifiers/registry.mjs');
  const register = Object.fromEntries(VERIFIERS.map((v) => [v.id, v]));
  let beslut;
  try {
    beslut = readdirSync(katalog).filter((f) => /^stampel-.*\.json$/.test(f)).sort()
      .flatMap((f) => {
        const j = JSON.parse(readFileSync(join(katalog, f), 'utf8'));
        if (!Array.isArray(j)) throw new Error(`${f} är ingen lista med beslut`);
        // En fil bär bara sin egen källas beslut: stampel-<id>.json → kalla === id.
        const id = f.slice('stampel-'.length, -'.json'.length);
        const fram = j.filter((b) => b?.kalla !== id);
        if (fram.length) throw new Error(`${f} bär beslut i en annan källas namn (${fram.map((b) => b?.kalla).join(', ')})`);
        return j;
      });
  } catch (e) {
    console.error(`::error::stampla: besluten kunde inte läsas (${e.message}) — inget stämplas`);
    process.exit(1);
  }
  const idag = new Date().toISOString().slice(0, 10);
  let r;
  try { r = tillampaStamplar(readFileSync(PRISBOK, 'utf8'), beslut, { register, idag }); }
  catch (e) { console.error(`::error::stampla: ${e.message}`); process.exit(1); }
  if (r.andrade.length) writeFileSync(PRISBOK, r.kalla, 'utf8');
  if (r.hoppade.length) {
    console.log(`::warning::stampla: prisboken har ändrats sedan verifieringen — ingen stämpel för ${r.hoppade.join(', ')}. Nästa körning verifierar den nya prisboken.`);
  }
  console.log(`stampla: ${beslut.length} beslut, ${r.andrade.length} datum flyttade${r.andrade.length ? `: ${r.andrade.join(', ')}` : ''}`);
}
