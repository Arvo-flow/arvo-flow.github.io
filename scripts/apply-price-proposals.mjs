#!/usr/bin/env node
/**
 * Applicerar prisförslag från price-monitor-rapporten till källfiler.
 * Körs av GitHub Actions på en feature-branch INNAN PR skapas.
 *
 * Uppdaterar:
 *   1. scripts/price-monitor.mjs        — check-namn och regex-mönster
 *   2. agents/recommender/branchindex.js — note-fält (konservativ textersättning)
 *
 * Hoppar över alerts där:
 *   - haiku saknas eller actionRequired !== 'update'
 *   - isPermanent !== true
 *   - confidence < 0.80
 *   - mönstret är komplext (inte ett enkelt heltal)
 *
 * Skriver /tmp/apply-summary.json med vad som ändrades, för PR-body-generering.
 */

import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { upsertPrice } from '../lib/price-db.js';

const __dir   = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dir, '..');

const REPORT_PATH     = '/tmp/price-monitor-report.json';
const SUMMARY_PATH    = '/tmp/apply-summary.json';
const MONITOR_PATH    = join(ROOT, 'scripts/price-monitor.mjs');
const BRANCHINDEX_PATH = join(ROOT, 'agents/recommender/branchindex.js');

// ── Load report ───────────────────────────────────────────────────────────────
let report;
try {
  report = JSON.parse(readFileSync(REPORT_PATH, 'utf8'));
} catch {
  console.error('Kunde inte läsa', REPORT_PATH);
  process.exit(1);
}

const summary = { applied: [], skipped: [] };

if (!report.alerts?.length) {
  console.log('Inga alerts i rapporten — ingenting att applicera.');
  writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));
  process.exit(0);
}

// ── Filter to actionable alerts ───────────────────────────────────────────────
const actionable = report.alerts.filter(a => {
  const h = a.haiku;
  if (!h) { summary.skipped.push({ ...a, reason: 'Haiku-svar saknas' }); return false; }
  if (h.actionRequired !== 'update') { summary.skipped.push({ ...a, reason: `actionRequired=${h.actionRequired}` }); return false; }
  if (!h.isPermanent) { summary.skipped.push({ ...a, reason: 'isPermanent=false (kampanjpris?)' }); return false; }
  if ((h.confidence ?? 0) < 0.80) { summary.skipped.push({ ...a, reason: `confidence=${h.confidence} < 0.80` }); return false; }
  if (!h.extractedPrice) { summary.skipped.push({ ...a, reason: 'extractedPrice saknas' }); return false; }

  // Only handle simple integer patterns (e.g. /299/, not /1[,.]7[45]|1[,.]9/)
  if (!/^\d+$/.test(a.patternSource)) {
    summary.skipped.push({ ...a, reason: `Komplext mönster /${a.patternSource}/ — manuell koll krävs` });
    return false;
  }

  return true;
});

if (!actionable.length) {
  console.log('Inga direkt åtgärdbara alerts (alla kräver manuell verifiering).');
  writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));
  process.exit(0);
}

// ── Load source files ─────────────────────────────────────────────────────────
let monitorSrc    = readFileSync(MONITOR_PATH, 'utf8');
let branchSrc     = readFileSync(BRANCHINDEX_PATH, 'utf8');

function escRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── Apply each actionable alert ───────────────────────────────────────────────
for (const alert of actionable) {
  const { check, patternSource, haiku } = alert;
  const rawExtracted = haiku.extractedPrice;

  // Extract first integer from Haiku's extracted price (e.g. "349 kr/mth" → "349")
  const newNumberMatch = rawExtracted.match(/^(\d+)/);
  if (!newNumberMatch) {
    summary.skipped.push({ ...alert, reason: `Kunde inte parsa heltal från "${rawExtracted}"` });
    continue;
  }
  const newNumber = newNumberMatch[1];

  // Guard: don't apply if new number equals old (false positive detection)
  if (newNumber === patternSource) {
    summary.skipped.push({ ...alert, reason: `Extraherat pris (${newNumber}) = gammalt pris — false positive?` });
    continue;
  }

  const oldCheckName = check;                                 // e.g. "Bas 299 kr/mth"
  const newCheckName = oldCheckName.replace(patternSource, newNumber); // e.g. "Bas 349 kr/mth"

  // ── 1. Update price-monitor.mjs ──────────────────────────────────────────
  // Replace check name: { name: 'Bas 299 kr/mth', → { name: 'Bas 349 kr/mth',
  const namePattern = new RegExp(`{ name: '${escRe(oldCheckName)}'`, 'g');
  const prevMonitor = monitorSrc;
  monitorSrc = monitorSrc.replace(namePattern, `{ name: '${newCheckName}'`);

  // Replace pattern: pattern: /299/ → pattern: /349/
  // Only replace when it follows the new check name (use lookahead is unreliable in multiline;
  // instead replace globally for this simple numeric pattern — it is unique per check)
  const patternRe = new RegExp(`(pattern: )\\/${escRe(patternSource)}\\/`, 'g');
  monitorSrc = monitorSrc.replace(patternRe, `$1/${newNumber}/`);

  const monitorChanged = monitorSrc !== prevMonitor;

  // ── 2. Update branchindex.js note field ──────────────────────────────────
  // Conservative: only replace "OLD kr/mth" → "NEW kr/mth" (full string, not bare number)
  const oldNoteStr = `${patternSource} kr/mth`;
  const newNoteStr = `${newNumber} kr/mth`;
  const prevBranch = branchSrc;
  branchSrc = branchSrc.replaceAll(oldNoteStr, newNoteStr);
  const branchChanged = branchSrc !== prevBranch;

  if (monitorChanged || branchChanged) {
    const filesChanged = [
      monitorChanged  ? 'price-monitor.mjs' : null,
      branchChanged   ? 'branchindex.js (note)' : null,
    ].filter(Boolean).join(', ');

    console.log(`✅  ${alert.supplier}: "${oldCheckName}" → "${newCheckName}" (${filesChanged})`);
    summary.applied.push({
      category:     alert.category,
      supplier:     alert.supplier,
      oldCheck:     oldCheckName,
      newCheck:     newCheckName,
      oldNumber:    patternSource,
      newNumber,
      extractedPrice: rawExtracted,
      confidence:   haiku.confidence,
      reasoning:    haiku.reasoning,
      filesChanged,
    });

    // Spara bekräftad prisändring till supplier_prices (fire-and-forget)
    upsertPrice({
      supplier:     alert.supplier.toLowerCase().split(/\s+/)[0],
      product:      alert.supplier,
      tier:         null,
      category:     alert.category,
      priceMonthly: parseFloat(newNumber),
      priceAnnual:  null,
      priceUnit:    'per_seat',
      currency:     'SEK',
      sourceType:   'official_web',
      sourceUrl:    alert.url,
      confidence:   haiku.confidence,
      lastVerified: new Date().toISOString().slice(0, 10),
      changedBy:    'price-monitor',
      metadata:     { extractedPrice: rawExtracted, reasoning: haiku.reasoning },
    }).catch(err => console.warn('[price-db] upsert failed (non-critical):', err.message));
  } else {
    summary.skipped.push({ ...alert, reason: 'Strängen hittades inte i källfilerna — kontrollera manuellt' });
  }
}

// ── Write files ───────────────────────────────────────────────────────────────
if (summary.applied.length > 0) {
  writeFileSync(MONITOR_PATH, monitorSrc, 'utf8');
  writeFileSync(BRANCHINDEX_PATH, branchSrc, 'utf8');
  console.log(`\nSkrev ${summary.applied.length} ändring(ar) till disk.`);
} else {
  console.log('\nInga filer ändrades — alla alerts kräver manuell verifiering.');
}

writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));

console.log(`\nSummering:`);
console.log(`  Applicerade: ${summary.applied.length}`);
console.log(`  Hoppades över: ${summary.skipped.length}`);

if (summary.skipped.length) {
  console.log('\nHoppade över (kräver manuell koll):');
  summary.skipped.forEach(s => console.log(`  • ${s.supplier} / ${s.check}: ${s.reason}`));
}
