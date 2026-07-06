#!/usr/bin/env node
/**
 * scripts/korpusdiff.mjs — Korpusdiff-selen (B-spåret, B3).
 *
 * Två uppgifter, en maskin:
 *
 *  1. REPLAY-DETERMINISM (golden-snapshot). tests/run.mjs är en assert-grind:
 *     den låser bara de nycklar en människa skrev in i fx.metrics. Drift i en
 *     nyckel ingen deklarerade fångas aldrig. Selen fångar HELA det
 *     deterministiska pipeline-utfallet per fixtur (varje metric-fält + hela
 *     secondary-objektet, även där ingen förväntan deklarerats) och diffar mot
 *     ett committat facit (tests/fixtures/korpus-facit.json). Vilken förändring
 *     som helst — avsedd eller inte — syns som en diff. Avsedd ändring →
 *     `--update` + granska diffen + committa.
 *
 *  2. MÄTBÄNK (balanskravets falsklarm). B1:s armering (BALANSKRAV_ENFORCE=1)
 *     kräver en mätning av hur ofta judgeLineArithmetic fyrar på VERKLIGA
 *     fakturor — och "vi ska inte ut till kunderna än" betyder att mätningen
 *     inte kan komma från live-trafik. Selen instrumenterar balanskravet över
 *     hela korpusen och redovisar täckningen ärligt: guarden dömer bara rader
 *     som bär både quantity och unitPrice > 0, och korpusen (f01–f08) är
 *     författad på metric-nivå (belopp per rad), inte extraktions-nivå. Selen
 *     MÄTER och NAMNGER därför luckan istället för att påstå en mätbänk som
 *     inte finns: se `stats.balanskrav` i utfallet.
 *
 * Regel 1 (EN sanning per fråga): selen RÄKNAR ingenting själv. Den anropar
 * exakt samma computeInvoiceMetrics / computeSecondarySaving / judgeLineArithmetic
 * som produktionspipelinen och tests/run.mjs — den är en observatör, inte en kopia.
 *
 * Kör:
 *   node scripts/korpusdiff.mjs            # kolla mot facit (exit 1 vid drift)
 *   node scripts/korpusdiff.mjs --update   # skriv/uppdatera facit efter avsedd ändring
 *   node scripts/korpusdiff.mjs --stats    # skriv bara ut mätbänkens siffror
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';

import { fixtures as f01 } from '../tests/fixtures/01-mobil.mjs';
import { fixtures as f02 } from '../tests/fixtures/02-bredband.mjs';
import { fixtures as f03 } from '../tests/fixtures/03-combined.mjs';
import { fixtures as f04 } from '../tests/fixtures/04-el.mjs';
import { fixtures as f05 } from '../tests/fixtures/05-saas.mjs';
import { fixtures as f06 } from '../tests/fixtures/06-skrivarleasing.mjs';
import { fixtures as f07 } from '../tests/fixtures/07-edge-cases.mjs';
import { fixtures as f08 } from '../tests/fixtures/08-realistic.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
export const FACIT_PATH = resolve(HERE, '../tests/fixtures/korpus-facit.json');

const ALL = [...f01, ...f02, ...f03, ...f04, ...f05, ...f06, ...f07, ...f08];

// ── Kanonisk serialisering ────────────────────────────────────────────────────
// Rekursivt sorterade nycklar + normaliserad −0 → 0, så att facit är stabilt och
// git-diffbart (nyckelordning kan aldrig skapa en spök-diff).
function canonicalize(value) {
  if (value === null || typeof value !== 'object') {
    return Object.is(value, -0) ? 0 : value;
  }
  if (Array.isArray(value)) return value.map(canonicalize);
  const out = {};
  for (const key of Object.keys(value).sort()) out[key] = canonicalize(value[key]);
  return out;
}

export function canonicalStringify(obj) {
  return JSON.stringify(canonicalize(obj), null, 2) + '\n';
}

// ── En fixtur → kanoniskt facit-record ────────────────────────────────────────
// Fångar hela det deterministiska utfallet. Anropen speglar tests/run.mjs
// (industry 'konsult', employees 5 som default) men beräknar secondary för VARJE
// fixtur — inte bara där en förväntan deklarerats — så golden låser även de fält
// ingen människa tänkte på.
function recordFor(fx) {
  const category = fx.category;
  const mixed = fx.mixed ?? false;
  const industry = fx.industry ?? 'konsult';
  const employees = fx.employees ?? 5;

  const metrics = computeInvoiceMetrics(fx.lineItems, category, mixed);
  const secondary = computeSecondarySaving({
    metrics, category, potentialMixedCategories: mixed, industry, employees,
  });

  // Instrumentering — INTE en grind. Vi observerar hur balanskravet skulle döma.
  const bal = judgeLineArithmetic({ lineItems: fx.lineItems });

  return {
    id: fx.id,
    category,
    mixed,
    industry,
    employees,
    metrics,
    secondary,               // null om ingen andrahandsbesparing
    balanskrav: {
      judged:     bal.judged,
      balanced:   bal.balanced,
      violations: bal.violations.length,
    },
  };
}

// En dömbar rad = den judgeLineArithmetic faktiskt granskar (quantity & unitPrice > 0,
// ej variable_usage). Räknas här med SAMMA villkor som guarden — mätbänkens täckning.
function isJudgeableLine(l) {
  if (l == null) return false;
  if (l.type === 'variable_usage') return false;
  return l.quantity > 0 && l.unitPrice > 0;
}

export function buildCorpusFacit() {
  const records = ALL.map(recordFor).sort((a, b) => a.id.localeCompare(b.id, 'sv'));

  let lineCount = 0;
  let judgeableLineCount = 0;
  let balanskravJudged = 0;
  let balanskravViolations = 0;
  for (const fx of ALL) {
    for (const l of fx.lineItems ?? []) {
      lineCount++;
      if (isJudgeableLine(l)) judgeableLineCount++;
    }
  }
  for (const r of records) {
    balanskravJudged += r.balanskrav.judged;
    balanskravViolations += r.balanskrav.violations;
  }

  const stats = {
    fixtureCount: records.length,
    lineCount,
    balanskrav: {
      // Hur många rader balanskravet KAN döma i korpusen. Låg täckning = korpusen
      // kan inte ensam arma B1; en extraktions-nivå-korpus (verkliga rader med
      // quantity × à-pris, t.ex. de inkommande skarpa avtalen/fakturorna) krävs.
      judgeableLineCount,
      judged: balanskravJudged,
      violations: balanskravViolations,
      coveragePct: lineCount > 0 ? Math.round((judgeableLineCount / lineCount) * 1000) / 10 : 0,
    },
  };

  return { version: 1, generatedFrom: 'tests/fixtures/0{1..8}-*.mjs', stats, fixtures: records };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
function printStats(facit) {
  const s = facit.stats;
  const b = s.balanskrav;
  console.log('── Korpusdiff · mätbänk ────────────────────────────────────');
  console.log(`  Fixturer:            ${s.fixtureCount}`);
  console.log(`  Fakturarader:        ${s.lineCount}`);
  console.log(`  Balanskrav-dömbara:  ${b.judgeableLineCount} rader (${b.coveragePct}% av korpusen)`);
  console.log(`  Balanskrav dömda:    ${b.judged}`);
  console.log(`  Balanskrav-larm:     ${b.violations}`);
  if (b.judgeableLineCount < 30) {
    console.log('');
    console.log('  ⚠ Täckningen är för låg för att arma B1 (BALANSKRAV_ENFORCE=1) mot');
    console.log('    denna korpus ensam. Guarden dömer bara rader med quantity × à-pris;');
    console.log('    f01–f08 är författad på metric-nivå (belopp per rad). B1:s falsklarms-');
    console.log('    mätning behöver en extraktions-nivå-korpus (verkliga rader) — den');
    console.log('    kommer naturligt när de skarpa avtalen/fakturorna landar.');
  }
  console.log('────────────────────────────────────────────────────────────');
}

function main() {
  const args = new Set(process.argv.slice(2));
  const facit = buildCorpusFacit();
  const serialized = canonicalStringify(facit);

  if (args.has('--stats')) {
    printStats(facit);
    return 0;
  }

  if (args.has('--update')) {
    writeFileSync(FACIT_PATH, serialized);
    console.log(`✓ Facit skrivet: ${FACIT_PATH}`);
    printStats(facit);
    return 0;
  }

  // Check-läge
  if (!existsSync(FACIT_PATH)) {
    console.error('✗ Facit saknas. Kör: node scripts/korpusdiff.mjs --update');
    return 1;
  }
  const golden = readFileSync(FACIT_PATH, 'utf8');
  if (golden === serialized) {
    console.log(`✓ Korpusdiff grön — ${facit.stats.fixtureCount} fixturer matchar facit.`);
    printStats(facit);
    return 0;
  }

  // Drift — visa första avvikande fixturen konkret.
  console.error('✗ KORPUSDRIFT — pipeline-utfallet avviker från facit.');
  const goldenObj = JSON.parse(golden);
  const goldenById = new Map((goldenObj.fixtures ?? []).map((r) => [r.id, r]));
  let shown = 0;
  for (const r of facit.fixtures) {
    const g = goldenById.get(r.id);
    const now = JSON.stringify(canonicalize(r));
    const was = g ? JSON.stringify(canonicalize(g)) : '(saknas i facit)';
    if (now !== was) {
      console.error(`\n  Δ ${r.id} (${r.category}):`);
      console.error(`    facit: ${was}`);
      console.error(`    nu:    ${now}`);
      if (++shown >= 8) { console.error('\n  … (fler avvikelser dolda)'); break; }
    }
  }
  if (goldenObj.stats && JSON.stringify(canonicalize(goldenObj.stats)) !== JSON.stringify(canonicalize(facit.stats))) {
    console.error('\n  Δ stats:');
    console.error(`    facit: ${JSON.stringify(canonicalize(goldenObj.stats))}`);
    console.error(`    nu:    ${JSON.stringify(canonicalize(facit.stats))}`);
  }
  console.error('\n  Avsedd ändring? Granska diffen, kör: node scripts/korpusdiff.mjs --update');
  return 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main());
}
