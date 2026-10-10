#!/usr/bin/env node
// scripts/stampla.mjs — lägger verifierarnas stämpelbeslut på en färsk main, i ETT jobb (2026-10-10)
//
//   node scripts/stampla.mjs <katalog med stampel-*.json>
//
// Varför ett eget steg: förr committade och pushade varje matrisjobb i verify-sources.yml sin egen
// stämpel. Det gav en skrivbar token i jobb som kör `npm install playwright-extra` (paket utanför
// låsfilen), och nitton jobb som tävlade om samma fil med rebase-loopar. Nu fattar matrisjobbet
// BESLUTET (stampelbeslut, där bevisen finns) och skriver det till en JSON-fil; det här skriptet
// tillämpar besluten med samma rena funktioner (stamplaKalla/stamplaKategori) i ett enda jobb som
// ensamt håller nyckeln. Inga beslut fattas här — bara det matrisjobbet redan bestämt läggs på.
//
// Exit 0 med «0 ändrade» när inget behövde flyttas; exit 1 om en fil inte går att läsa — ett
// trasigt beslut får aldrig läsas som «inget att stämpla».

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stamplaKalla, stamplaKategori } from '../lib/verifieringsstampel.js';

const ROT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
export const PRISBOK = join(ROT, 'agents', 'recommender', 'branchindex.js');

/**
 * @param {string} kalla  prisbokens källtext
 * @param {{ kalla: string, datum: string, nycklar: string[], kategori: string|null }[]} beslut
 * @returns {{ kalla: string, andrade: string[] }}
 */
export function tillampaStamplar(kalla, beslut) {
  let ut = kalla;
  const andrade = [];
  for (const b of beslut) {
    if (!b || typeof b.kalla !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(String(b.datum)) || !Array.isArray(b.nycklar)) {
      throw new Error(`stämpelbeslutet går inte att läsa: ${JSON.stringify(b).slice(0, 160)}`);
    }
    const n = stamplaKalla(ut, b.nycklar, b.datum);
    ut = n.kalla;
    andrade.push(...n.andrade.map((k) => `${b.kalla}:${k}`));
    if (b.kategori) {
      const k = stamplaKategori(ut, b.kategori, b.datum);
      if (k.andrad) { ut = k.kalla; andrade.push(`${b.kalla}:${b.kategori}`); }
    }
  }
  return { kalla: ut, andrade };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const katalog = process.argv[2];
  if (!katalog) { console.error('::error::stampla: katalog saknas'); process.exit(2); }
  let beslut;
  try {
    beslut = readdirSync(katalog).filter((f) => /^stampel-.*\.json$/.test(f)).sort()
      .flatMap((f) => {
        const j = JSON.parse(readFileSync(join(katalog, f), 'utf8'));
        if (!Array.isArray(j)) throw new Error(`${f} är ingen lista med beslut`);
        return j;
      });
  } catch (e) {
    console.error(`::error::stampla: besluten kunde inte läsas (${e.message}) — inget stämplas`);
    process.exit(1);
  }
  const { kalla, andrade } = tillampaStamplar(readFileSync(PRISBOK, 'utf8'), beslut);
  if (andrade.length) writeFileSync(PRISBOK, kalla, 'utf8');
  console.log(`stampla: ${beslut.length} beslut, ${andrade.length} datum flyttade${andrade.length ? `: ${andrade.join(', ')}` : ''}`);
}
