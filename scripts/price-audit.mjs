#!/usr/bin/env node
/**
 * scripts/price-audit.mjs — Statisk pristäckningsaudit (ingen nätverksåtkomst)
 *
 * Körs på VARJE push till main (GitHub Actions + lokalt).
 * Fångar upp täckningsluckor INNAN de når produktion.
 *
 * Tre kontrollnivåer:
 *   KRITISK  (exit 1) — real-public pris utan price-monitor-check, eller source:'ej-verifierat'
 *   VARNING  (exit 0) — pris >30 dagar gammalt för kundfacing-kategorier
 *   INFO     (exit 0) — pris >90 dagar för estimat-kategorier
 *
 * Rotorsaken till E3/E5-buggen: priserna lades till i branchindex.js MEN hade
 * inget price-monitor.mjs-entry → ingen nattlig bevakning → fel i 3 veckor utan larm.
 * Denna script hade blockat den PR:en vid push.
 *
 * Användning:
 *   node scripts/price-audit.mjs          # alla kontroller
 *   node scripts/price-audit.mjs --strict # exit 1 även på varningar
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, join }           from 'node:path';
import { fileURLToPath }           from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
const STRICT    = process.argv.includes('--strict');

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const CYA  = '\x1b[36m';

// ── Gräns: hur många dagar får ett pris vara gammalt? ────────────────────────
const STALE_DAYS_CUSTOMER_FACING = 30;  // visas direkt för kund
const STALE_DAYS_REAL_PUBLIC     = 60;  // real-public men ej direkt kundfacing
const STALE_DAYS_ESTIMATED       = 180; // estimat, godkäns med hedge-language

// ── Kategorier som visas direkt för kund (hårdast krav) ──────────────────────
const CUSTOMER_FACING = new Set(['saas-productivity', 'mobil', 'bredband', 'loneadmin']);

// ── Läs in filer ─────────────────────────────────────────────────────────────
const branchPath  = join(ROOT, 'agents/recommender/branchindex.js');
const monitorPath = join(ROOT, 'scripts/price-monitor.mjs');

if (!existsSync(branchPath) || !existsSync(monitorPath)) {
  console.error(`${RED}Filer saknas: ${branchPath} eller ${monitorPath}${R}`);
  process.exit(1);
}

const branchSrc  = readFileSync(branchPath,  'utf8');
const monitorSrc = readFileSync(monitorPath, 'utf8');

// ── Extrahera övervakade kategorier ur price-monitor.mjs ─────────────────────
// Matchar: category: 'xxx' och supplier: 'xxx' i PRICE_CHECKS-blocket
const monitoredCategories = new Set(
  [...monitorSrc.matchAll(/category:\s*'([^']+)'/g)].map(m => m[1])
);
const monitoredSupplierStrings = [
  ...monitorSrc.matchAll(/supplier:\s*'([^']+)'/g)
].map(m => m[1].toLowerCase());

// ── Extrahera kategorier ur branchindex.js ────────────────────────────────────
// Matcha top-level BRANCHINDEX-nycklar med tillhörande source, lastVerified, verifiedVia
const categoryEntries = [];
const topLevelRe = /^\s{2}'?([\w-]+)'?\s*:\s*\{([\s\S]*?)(?=\n\s{2}'?[\w-]+'?\s*:|^};)/gm;
for (const [, key, body] of branchSrc.matchAll(topLevelRe)) {
  if (['_meta', 'INDUSTRIES', 'INDUSTRY_SEGMENT_MAP', 'REAL_PRICE_CATEGORIES'].includes(key)) continue;
  const sourceMatch      = body.match(/source:\s*'([^']+)'/);
  const lastVerifiedMatch = body.match(/lastVerified:\s*'([^']+)'/);
  const verifiedViaMatch  = body.match(/verifiedVia:\s*'([^']+)'/);
  if (!sourceMatch) continue;
  categoryEntries.push({
    key,
    source:       sourceMatch[1],
    lastVerified: lastVerifiedMatch?.[1] ?? null,
    verifiedVia:  verifiedViaMatch?.[1]  ?? null,
  });
}

// ── Extrahera licenseTierBenchmarks ───────────────────────────────────────────
const tierEntries = [];
const tierRe = /'([\w-]+)':\s*\{[^}]*?(?:msrpAnnual|usdAnnual)[^}]*?lastVerified:\s*'([^']+)'[^}]*?source:\s*'([^']+)'[^}]*?\}/gs;
for (const [, tier, lastVerified, source] of branchSrc.matchAll(tierRe)) {
  tierEntries.push({ tier, lastVerified, source });
}

// ── Beräkna ålder ─────────────────────────────────────────────────────────────
const TODAY = new Date();
function daysOld(dateStr) {
  if (!dateStr) return Infinity;
  return Math.round((TODAY - new Date(dateStr)) / 86400_000);
}

// ── Samla issues ───────────────────────────────────────────────────────────────
const critical = [];  // exit 1
const warnings = [];  // exit 0 (eller 1 med --strict)
const infos    = [];  // alltid exit 0

// Kategorier som bevakas av en DEDIKERAD API-vakt (starkare än price-monitors substräng-check),
// och vars priser inte ligger på en skrapbar sida → undantagna från price-monitor-kravet.
//   bredband → scripts/verify.mjs tele2-bredband (fabriken)
const DEDICATED_VAKT = new Set(['bredband']);

// ── Kontroll 1: Täckning — real-public kategori utan price-monitor-check ──────
for (const { key, source } of categoryEntries) {
  if (source !== 'real-public') continue;
  if (DEDICATED_VAKT.has(key)) continue;
  if (!monitoredCategories.has(key)) {
    critical.push(
      `[TÄCKNING] '${key}' är real-public i branchindex.js men saknar entry i price-monitor.mjs.\n` +
      `           Åtgärd: lägg till URL + regex-check i PRICE_CHECKS i scripts/price-monitor.mjs`
    );
  }
}

// ── Kontroll 2: Tier-täckning — licenseTierBenchmarks utan monitor-check ──────
for (const { tier, lastVerified, source } of tierEntries) {
  // Extrahera leverantörsnamn från tier-nyckeln (första segmentet)
  // Exempel: 'google-starter' → 'google', 'atlassian-jira-standard' → 'atlassian',
  //          'business-basic' → 'microsoft' (Microsoft 365 Business-tiers)
  //          'e3' / 'e5' → 'microsoft'
  const vendor = /^(business|e[0-9])/.test(tier)
    ? 'microsoft'
    : tier.split('-')[0];
  const hasCheck = monitoredSupplierStrings.some(s => s.includes(vendor));

  if (!hasCheck) {
    const isEjVerifierat = source === 'ej-verifierat';
    const age = daysOld(lastVerified);
    if (isEjVerifierat) {
      critical.push(
        `[EJ VERIFIERAT] Tier '${tier}' har source:'ej-verifierat'.\n` +
        `                Åtgärd: verifiera mot leverantörens prissida och uppdatera source + lastVerified`
      );
    } else if (!hasCheck) {
      critical.push(
        `[TÄCKNING] Tier '${tier}' (källa: ${source}, verifierat: ${lastVerified ?? 'okänt'}) ` +
        `saknar price-monitor-check.\n` +
        `           Åtgärd: lägg till URL + regex i PRICE_CHECKS`
      );
    }
  }
}

// ── Kontroll 3: Ej-verifierat på top-level ────────────────────────────────────
for (const { key, source } of categoryEntries) {
  if (source === 'ej-verifierat') {
    critical.push(
      `[EJ VERIFIERAT] '${key}' har source:'ej-verifierat'.\n` +
      `                Åtgärd: verifiera mot leverantörens prissida`
    );
  }
}

// ── Kontroll 4: Inaktuella priser ─────────────────────────────────────────────
// Kategorier med top-level lastVerified
for (const { key, source, lastVerified, verifiedVia } of categoryEntries) {
  if (!lastVerified) continue;
  const age  = daysOld(lastVerified);
  const via  = verifiedVia ? ` (via ${verifiedVia})` : '';
  const limit = CUSTOMER_FACING.has(key) ? STALE_DAYS_CUSTOMER_FACING
               : source === 'real-public' ? STALE_DAYS_REAL_PUBLIC
               : STALE_DAYS_ESTIMATED;
  if (age > limit) {
    const msg = `[INAKTUELLT] '${key}' senast verifierat ${lastVerified}${via} (${age} dagar sedan, gräns ${limit}d).`;
    if (CUSTOMER_FACING.has(key)) warnings.push(msg);
    else infos.push(msg);
  }
}

// Tier-entries
for (const { tier, lastVerified, source } of tierEntries) {
  if (!lastVerified) continue;
  const age = daysOld(lastVerified);
  if (source === 'ej-verifierat') continue; // redan hanterat ovan
  const isCF = ['business-basic','business-standard','business-premium','e3','e5'].includes(tier);
  const limit = isCF ? STALE_DAYS_CUSTOMER_FACING : STALE_DAYS_REAL_PUBLIC;
  if (age > limit) {
    warnings.push(
      `[INAKTUELLT] Tier '${tier}' verifierat ${lastVerified} (${age}d, gräns ${limit}d). ` +
      `Källa: ${source}`
    );
  }
}

// ── Kontroll 5: Top-level real-public utan lastVerified ───────────────────────
for (const { key, source, lastVerified } of categoryEntries) {
  if (source !== 'real-public') continue;
  if (!lastVerified) {
    warnings.push(
      `[SAKNAR DATUM] '${key}' är real-public men saknar lastVerified + verifiedVia.\n` +
      `               Åtgärd: lägg till i branchindex.js: lastVerified: 'ÅÅÅÅ-MM-DD', verifiedVia: 'playwright|fetch|manual'`
    );
  }
}

// ── Rapport ───────────────────────────────────────────────────────────────────
const sep  = '─'.repeat(70);
const dsep = '═'.repeat(70);

console.log(`\n${BOLD}Arvo Flow — Price Data Audit${R}`);
console.log(`${DIM}Statisk täcknings- och färskhetsaudit av branchindex.js vs price-monitor.mjs${R}\n`);

if (critical.length === 0 && warnings.length === 0 && infos.length === 0) {
  console.log(`${GRN}${BOLD}✓ ALLT OK — inga luckor, inga inaktuella priser${R}\n`);
  process.exit(0);
}

if (critical.length > 0) {
  console.log(`${RED}${BOLD}KRITISKA FEL (${critical.length}) — blockerar produktion${R}`);
  console.log(sep);
  for (const c of critical) {
    console.log(`  ${RED}✗${R} ${c}`);
  }
  console.log('');
}

if (warnings.length > 0) {
  console.log(`${YEL}${BOLD}VARNINGAR (${warnings.length})${STRICT ? ' — strict mode: blockerar' : ''}${R}`);
  console.log(sep);
  for (const w of warnings) {
    console.log(`  ${YEL}⚠${R} ${w}`);
  }
  console.log('');
}

if (infos.length > 0) {
  console.log(`${CYA}INFO (${infos.length})${R}`);
  console.log(sep);
  for (const i of infos) {
    console.log(`  ${CYA}ℹ${R} ${i}`);
  }
  console.log('');
}

// ── Sammanfattning ────────────────────────────────────────────────────────────
console.log(dsep);
const hasFatal = critical.length > 0 || (STRICT && warnings.length > 0);
if (hasFatal) {
  console.log(`${RED}${BOLD}AUDIT MISSLYCKADES${R}  ${critical.length} kritiska fel${warnings.length > 0 ? `, ${warnings.length} varningar` : ''}`);
  console.log(`${DIM}Åtgärda felen ovan och pusha igen.${R}\n`);
  process.exit(1);
} else {
  console.log(`${YEL}${BOLD}AUDIT GODKÄND MED VARNINGAR${R}  ${warnings.length} varning(ar) kräver uppföljning`);
  console.log(`${DIM}Kör med --strict för att blockera vid varningar.${R}\n`);
  process.exit(0);
}
