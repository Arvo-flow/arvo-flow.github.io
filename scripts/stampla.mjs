#!/usr/bin/env node
// scripts/stampla.mjs — lägger verifierarnas stämpelbeslut på en färsk main, i ETT jobb (2026-10-10)
//
//   VERIFIERAD_AVTRYCK=<hex> node scripts/stampla.mjs <katalog med stampel-<id>/stampel-<id>.json>
//   node scripts/stampla.mjs --avtryck        skriver ut avtrycket av den utcheckade prisboken
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
// ══ AVTRYCKET RÄKNAS AV ETT JOBB SOM INTE KÖR FRÄMMANDE PAKET (tredje blickens V2, 2026-10-17) ══
// Matrisjobbet skriver avtrycket i beslutet, och ingen kontroll prövade att det var RÄTT avtryck.
// Ett fel i producenten (fel värde, fält som saknas, en rå sha256 med datumen kvar) fällde 0 tester
// och hade i drift gett `::warning` i ett grönt jobb varje vecka: datumen slutar röra sig, och det
// enda larmet blir prisauditens 60-dagarsgräns. Nu räknar `discover`-jobbet (ingen npm install,
// samma commit som matrisen) avtrycket med `--avtryck`, och stämpeljobbet kräver att varje beslut
// bär just det. Ett annat avtryck i ett beslut är ett instrumentfel och RÖTT (SP-07, SP-13). Ett
// avtryck som stämmer med verifieringen men inte med main är en äkta prisändring under körningen,
// och då uteblir stämpeln med en varning (SP-08).
//
// ══ VARJE ARTEFAKT I SIN EGEN KATALOG (tredje blickens V3) ═══════════════════════════════════
// Med `merge-multiple: true` hamnade alla artefakter i samma katalog, och en fil med en annan källas
// namn hade skrivit över den. Nu laddas varje artefakt ned till `stampel-<id>/`, och katalogen får
// bära exakt en fil: `stampel-<id>.json`. Allt annat är rött (SP-14).
//
// FÅNGAR: ett pris som ändrats mellan verifiering och stämpel (SP-08); ett beslut utanför källans
//   deklaration, med fel datum, i fel fil eller utan avtryck (SP-09); ett beslut vars avtryck inte är
//   den verifierade prisbokens, och ett saknat facit (SP-13); en artefakt som bär en annan källas fil
//   eller fler filer än sin egen (SP-14).
// BLIND: att källan faktiskt VAR grön. Ett komprometterat matrisjobb kan fortfarande skriva ett
//   beslut i sitt eget namn för det det deklarerat. Och att `discover` räknar avtrycket på samma
//   commit som matrisen läser: båda checkar ut körningens commit, men det är arbetsflödets form, inte
//   en kontroll i det här skriptet.

import { createHash } from 'node:crypto';
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stamplaKalla, stamplaKategori } from '../lib/verifieringsstampel.js';

const ROT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
export const PRISBOK = join(ROT, 'agents', 'recommender', 'branchindex.js');
const ISO = /^\d{4}-\d{2}-\d{2}$/;
/** Hur gammalt ett beslut får vara när det läggs på: artefakterna sparas 7 dygn, en omkörning kan komma sent. */
export const FONSTER_DAGAR = 8;

/**
 * Ett verifieringsdatum i prisboken. Värdet läses inom raden: `[^']*` hade kunnat spänna över en
 * radbrytning till nästa citattecken och maskat ett pris som bor där (tredje blickens V5, SP-08).
 */
export const DATUMFALT = /lastVerified:(\s*)'[^'\n]*'/g;

/** Prisbokens avtryck med varje verifieringsdatum utbytt — rör sig för ett pris, aldrig för en stämpel. */
export function prisbokAvtryck(kalla) {
  return createHash('sha256').update(String(kalla).replace(DATUMFALT, "lastVerified:$1'§'")).digest('hex');
}

const HEX64 = /^[0-9a-f]{64}$/;

/**
 * Ett stämpelbeslut, så som verify.mjs skriver det. Avtrycket räknas här ur prisbokens TEXT vid
 * verifieringens start, aldrig ur ett färdigt värde, så att producenten är prövbar (SP-13).
 */
export function nyttBeslut({ kalla, datum, nycklar, kategori = null, prisbok }) {
  if (typeof prisbok !== 'string' || prisbok === '') throw new Error('nyttBeslut: prisbokens text saknas');
  return { kalla, datum, nycklar, kategori: kategori ?? null, prisbokAvtryck: prisbokAvtryck(prisbok) };
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
  // Egen nyckel, inte ärvd: register['constructor'] är Object, och «constructor» klarar
  // katalognamnets mönster (andra blicken 18 okt). SP-14.
  const v = Object.hasOwn(register, b.kalla) ? register[b.kalla] : undefined;
  if (!v) fel(`okänd källa «${b.kalla}»`);
  if (!ISO.test(String(b.datum))) fel('ogiltigt datum');
  if (!ISO.test(String(idag))) fel('inget dagens datum');
  const alder = dagarMellan(b.datum, idag);
  if (alder < 0 || alder > FONSTER_DAGAR) fel(`datumet ${b.datum} ligger utanför körningens fönster (${idag}, ${FONSTER_DAGAR} dygn)`);
  const deklarerade = new Set(v.bevakadeTiers ?? []);
  const utanfor = b.nycklar.filter((k) => !deklarerade.has(k));
  if (utanfor.length) fel(`${b.kalla} har inte deklarerat ${utanfor.join(', ')}`);
  if (b.kategori != null && b.kategori !== (v.bevakadKategori ?? null)) fel(`${b.kalla} bevakar inte kategorin «${b.kategori}»`);
  if (!HEX64.test(String(b.prisbokAvtryck ?? ''))) fel('saknar prisbokens avtryck');
}

/**
 * @param {string} kalla  prisbokens källtext på main
 * @param {object[]} beslut
 * @param {{ register: Record<string, {bevakadeTiers?: string[], bevakadKategori?: string}>, idag: string, verifierad: string }} p
 *   `verifierad` är avtrycket av den prisbok som verifierades, räknat utanför matrisjobben (V2).
 * @returns {{ kalla: string, andrade: string[], hoppade: string[] }}
 */
export function tillampaStamplar(kalla, beslut, { register, idag, verifierad } = {}) {
  if (!register || typeof register !== 'object') throw new Error('tillampaStamplar: registret saknas');
  // Utan facit går ett fel i producenten inte att skilja från en prisändring på main. Då stämplas inget.
  if (!HEX64.test(String(verifierad ?? ''))) throw new Error('tillampaStamplar: avtrycket av den verifierade prisboken saknas');
  for (const b of beslut) provaBeslut(b, { register, idag });
  for (const b of beslut) {
    if (b.prisbokAvtryck !== verifierad) {
      throw new Error(`instrumentfel: beslutet från ${b.kalla} bär inte avtrycket av den prisbok som verifierades — producenten i verify.mjs räknar fel`);
    }
  }
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

/**
 * Läser besluten ur artefaktkatalogen: varje post är en katalog `stampel-<id>/` med exakt en fil,
 * `stampel-<id>.json`, som bara bär källan <id>:s beslut. Allt annat kastar (V3, SP-14). En symlänk
 * är inte en katalog eller fil från nedladdningen: den kan peka var som helst, så den avvisas.
 */
export function lasBeslut(katalog) {
  const beslut = [];
  for (const namn of readdirSync(katalog).sort()) {
    const m = namn.match(/^stampel-([a-z0-9-]+)$/);
    if (!m || !lstatSync(join(katalog, namn)).isDirectory()) throw new Error(`${namn} är ingen artefaktkatalog stampel-<id>/`);
    const id = m[1];
    const filer = readdirSync(join(katalog, namn));
    if (filer.length !== 1 || filer[0] !== `stampel-${id}.json`) {
      throw new Error(`${namn}/ ska bära exakt stampel-${id}.json, bär ${filer.join(', ') || 'ingenting'}`);
    }
    if (!lstatSync(join(katalog, namn, filer[0])).isFile()) throw new Error(`${namn}/${filer[0]} är ingen vanlig fil`);
    const j = JSON.parse(readFileSync(join(katalog, namn, filer[0]), 'utf8'));
    if (!Array.isArray(j)) throw new Error(`${filer[0]} är ingen lista med beslut`);
    const fram = j.filter((b) => b?.kalla !== id);
    if (fram.length) throw new Error(`${filer[0]} bär beslut i en annan källas namn (${fram.map((b) => b?.kalla).join(', ')})`);
    beslut.push(...j);
  }
  return beslut;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--avtryck') {
    process.stdout.write(`${prisbokAvtryck(readFileSync(PRISBOK, 'utf8'))}\n`);
    process.exit(0);
  }
  const katalog = process.argv[2];
  if (!katalog) { console.error('::error::stampla: katalog saknas'); process.exit(2); }
  const { VERIFIERS } = await import('../lib/verifiers/registry.mjs');
  const register = Object.fromEntries(VERIFIERS.map((v) => [v.id, v]));
  let beslut;
  try { beslut = lasBeslut(katalog); }
  catch (e) {
    console.error(`::error::stampla: besluten kunde inte läsas (${e.message}) — inget stämplas`);
    process.exit(1);
  }
  const idag = new Date().toISOString().slice(0, 10);
  let r;
  try { r = tillampaStamplar(readFileSync(PRISBOK, 'utf8'), beslut, { register, idag, verifierad: process.env.VERIFIERAD_AVTRYCK }); }
  catch (e) { console.error(`::error::stampla: ${e.message}`); process.exit(1); }
  if (r.andrade.length) writeFileSync(PRISBOK, r.kalla, 'utf8');
  if (r.hoppade.length) {
    console.log(`::warning::stampla: prisboken har ändrats sedan verifieringen — ingen stämpel för ${r.hoppade.join(', ')}. Nästa körning verifierar den nya prisboken.`);
  }
  console.log(`stampla: ${beslut.length} beslut, ${r.andrade.length} datum flyttade${r.andrade.length ? `: ${r.andrade.join(', ')}` : ''}`);
}
