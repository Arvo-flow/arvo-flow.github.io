#!/usr/bin/env node
/**
 * scripts/ai-drift.mjs — AI Drift Detector (Layer 5)
 *
 * Jämför aktuella categorize + recommend outputs mot sparade "golden" fixtures.
 * Fångar upp tyst modell-drift när Anthropic uppdaterar Haiku/Sonnet (eller vi
 * ändrar system-prompten) och affärskritiska fält börjar bete sig annorlunda.
 *
 * Kräver ANTHROPIC_API_KEY i .env (eller miljövariabel i CI).
 *
 * Läge 1 — Jämför (standard):
 *   node scripts/ai-drift.mjs
 *   node scripts/ai-drift.mjs microsoft telia
 *   node scripts/ai-drift.mjs --fixtures microsoft,ricoh,telia
 *
 * Läge 2 — Uppdatera golden-data (kör när du medvetet ändrat logik/prompt):
 *   node scripts/ai-drift.mjs --update
 *   node scripts/ai-drift.mjs --update microsoft
 *
 * npm-alias: npm run test:ai-drift
 *            npm run test:ai-drift -- --update
 *
 * Kostnad per körning: ~0,003 USD per fixture (Haiku + Sonnet, 4 fixtures ≈ 0,012 USD/natt).
 *
 * Affärskritiska fält (exakt match):
 *   categorized.category, .normalizedSupplier, .subType, .confidence≥0.70
 *   recommendation.shouldSwitch, .requiresQuote, .recommendationType, .licenseOverage
 *
 * Numeriska fält (±5 % tolerans):
 *   recommendation.suggestedAnnualCost, .grossSaving, .netSaving
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve }  from 'node:path';
import { fileURLToPath }  from 'node:url';
import dotenv             from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
dotenv.config({ path: join(ROOT, '.env') });

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY saknas. Sätt den i .env eller som miljövariabel.');
  process.exit(1);
}

const { categorize }           = await import(join(ROOT, 'agents/categorizer/categorize.js'));
const { recommend }            = await import(join(ROOT, 'agents/recommender/recommend.js'));
const { computeInvoiceMetrics} = await import(join(ROOT, 'lib/invoice-metrics.js'));

// ── CLI-argument ───────────────────────────────────────────────────────────────
const args       = process.argv.slice(2);
const UPDATE     = args.includes('--update');
const fixtureArg = args.find(a => a.startsWith('--fixtures'))?.split('=')[1]
               ?? args.find(a => a.startsWith('--fixtures='))?.split('=')[1];
const positional = args.filter(a => !a.startsWith('--'));

// Vilka fixtures att köra (positional args → namn utan .json)
const requestedSlugs = fixtureArg
  ? fixtureArg.split(',').map(s => s.trim())
  : positional.length > 0
    ? positional
    : null;  // null = alla

// ── Ladda fixtures ─────────────────────────────────────────────────────────────
const SNAPSHOTS_DIR = join(ROOT, 'test-snapshots');

const allFixtures = readdirSync(SNAPSHOTS_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => {
    const raw = JSON.parse(readFileSync(join(SNAPSHOTS_DIR, f), 'utf8'));
    return { file: f, slug: f.replace('.json', ''), ...raw };
  });

const fixtures = allFixtures.filter(fx => {
  if (!fx.extracted) return false;            // kräver extracted-data
  if (!UPDATE && !fx.golden) return false;    // i jämförelseläge: kräver golden-block
  if (requestedSlugs) return requestedSlugs.includes(fx.slug);
  return true;
});

if (fixtures.length === 0) {
  if (UPDATE) {
    console.error('Inga fixtures hittades. Skapa fixtures med node scripts/capture-snapshots.mjs.');
  } else {
    console.error('Inga fixtures med golden-block hittades.');
    console.error('Kör: node scripts/ai-drift.mjs --update  för att skapa golden-data.');
  }
  process.exit(1);
}

// ── Färger ─────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';

// ── Kör pipeline (categorize + recommend) ─────────────────────────────────────
const NUMERIC_TOLERANCE = 0.05;  // ±5 %

async function runPipeline(extracted, testCustomer) {
  const categorized = await categorize({
    supplier:    extracted.supplier ?? '',
    description: (extracted.lineItems ?? []).map(l => l.description).join(', '),
    amount:      extracted.amount ?? 0,
  });

  const metrics = computeInvoiceMetrics(
    extracted.lineItems,
    categorized.category,
    extracted.potentialMixedCategories ?? false,
  );

  const recommendation = await recommend({
    customer: testCustomer,
    invoice: {
      amount:                       extracted.amount,
      annualCost:                   extracted.annualCost,
      recurringAmount:              extracted.recurringAmount,
      variableCharges:              extracted.variableCharges ?? 0,
      seatCount:                    extracted.seatCount ?? null,
      mobileAddonMonthly:           metrics.mobileAddonMonthly,
      broadbandAddonMonthly:        metrics.broadbandAddonMonthly,
      primaryComponentMonthly:      metrics.primaryComponentMonthly,
      secondaryComponentMonthly:    metrics.secondaryComponentMonthly   ?? null,
      secondaryConnectionSpeedMbit: metrics.secondaryConnectionSpeedMbit ?? null,
      secondarySeatCount:           metrics.secondarySeatCount           ?? null,
      secondarySaving:              null,
      potentialMixedCategories:     extracted.potentialMixedCategories ?? false,
      connectionSpeedMbit:          extracted.connectionSpeedMbit       ?? null,
      licenseType:                  extracted.licenseType               ?? null,
      billingCycleType:             extracted.billingCycleType          ?? null,
      pricePerSeatMonthly:          extracted.pricePerSeatMonthly       ?? null,
      saasProductFamily:            extracted.saasProductFamily         ?? null,
      saasIncludedFeatures:         extracted.saasIncludedFeatures      ?? null,
      description:                  extracted.description               ?? null,
      lineItems:                    extracted.lineItems                  ?? null,
      likeForLikeTarget:            null,
    },
    categorized,
  });

  return { categorized, recommendation };
}

// ── Fältjämförelse ────────────────────────────────────────────────────────────
function compareField(failures, label, expected, actual, tolerance = 0) {
  if (expected === undefined) return;  // fält ej i golden → hoppa
  if (expected === null && actual === null) return;

  if (tolerance > 0 && typeof expected === 'number' && typeof actual === 'number') {
    const base = Math.abs(expected) || 1;
    const pct  = Math.abs(expected - actual) / base;
    if (pct > tolerance) {
      failures.push({
        field: label,
        expected,
        actual,
        note: `drift ${(pct * 100).toFixed(1)} % (gräns ${(tolerance * 100).toFixed(0)} %)`,
      });
    }
    return;
  }

  if (expected !== actual) {
    failures.push({ field: label, expected, actual });
  }
}

function compareOutputs(golden, categorized, recommendation) {
  const failures = [];

  // Kategorisering — alla exakta
  compareField(failures, 'categorized.category',           golden.categorized.category,           categorized.category);
  compareField(failures, 'categorized.normalizedSupplier', golden.categorized.normalizedSupplier, categorized.normalizedSupplier);
  compareField(failures, 'categorized.subType',            golden.categorized.subType,            categorized.subType);

  // Konfidens-tröskel: aldrig under 0.70 (oavsett golden)
  if ((categorized.confidence ?? 1) < 0.70) {
    failures.push({ field: 'categorized.confidence', expected: '≥0.70', actual: categorized.confidence });
  }

  // Rekommendation — booleanska och enum-fält: exakta
  compareField(failures, 'recommendation.shouldSwitch',      golden.recommendation.shouldSwitch,      recommendation.shouldSwitch);
  compareField(failures, 'recommendation.requiresQuote',     golden.recommendation.requiresQuote,     recommendation.requiresQuote     ?? false);
  compareField(failures, 'recommendation.recommendationType', golden.recommendation.recommendationType, recommendation.recommendationType);
  compareField(failures, 'recommendation.licenseOverage',    golden.recommendation.licenseOverage,    recommendation.licenseOverage     ?? null);

  // Numeriska fält — ±5 % tolerans
  compareField(failures, 'recommendation.suggestedAnnualCost', golden.recommendation.suggestedAnnualCost, recommendation.suggestedAnnualCost, NUMERIC_TOLERANCE);
  compareField(failures, 'recommendation.grossSaving',         golden.recommendation.grossSaving,         recommendation.grossSaving,         NUMERIC_TOLERANCE);
  compareField(failures, 'recommendation.netSaving',           golden.recommendation.netSaving,           recommendation.netSaving,           NUMERIC_TOLERANCE);

  return failures;
}

// ── Bygg golden-block från pipeline-output ────────────────────────────────────
function buildGoldenBlock(testCustomer, categorized, recommendation) {
  return {
    testCustomer,
    capturedAt: new Date().toISOString().slice(0, 10),
    categorized: {
      category:           categorized.category,
      subType:            categorized.subType           ?? null,
      normalizedSupplier: categorized.normalizedSupplier ?? null,
      confidence:         categorized.confidence,
      licensePending:     categorized.licensePending     ?? false,
    },
    recommendation: {
      shouldSwitch:       recommendation.shouldSwitch,
      recommendationType: recommendation.recommendationType ?? null,
      requiresQuote:      recommendation.requiresQuote      ?? false,
      licenseOverage:     recommendation.licenseOverage      ?? null,
      overageSavings:     recommendation.overageSavings      ?? null,
      suggestedAnnualCost: recommendation.suggestedAnnualCost,
      grossSaving:        recommendation.grossSaving,
      netSaving:          recommendation.netSaving,
    },
  };
}

// ── Standardvärden för testkund ───────────────────────────────────────────────
// Överskrivs om fixture.golden.testCustomer finns.
const DEFAULT_CUSTOMER = { industry: null, employees: 50, revenue: null };

// ── Huvud: kör alla valda fixtures ────────────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — AI Drift Detector${R}  (Layer 5)`);
console.log(`${DIM}Modell: categorize (Haiku) + recommend (Sonnet/Opus)${R}`);
if (UPDATE) {
  console.log(`${YEL}Läge: --update — skriver över golden-data${R}`);
}
console.log(`${DIM}Fixtures: ${fixtures.length} st${R}\n`);

let passed = 0;
let failed = 0;
let updated = 0;

for (const fx of fixtures) {
  const t0 = Date.now();
  const { slug, extracted, file } = fx;

  const testCustomer = fx.golden?.testCustomer ?? DEFAULT_CUSTOMER;

  process.stdout.write(`  ${slug.padEnd(30)} `);

  try {
    const { categorized, recommendation } = await runPipeline(extracted, testCustomer);
    const elapsed = Date.now() - t0;

    if (UPDATE) {
      // ── Uppdatera-läge ────────────────────────────────────────────────────
      const fixturePath = join(SNAPSHOTS_DIR, file);
      const raw = JSON.parse(readFileSync(fixturePath, 'utf8'));
      raw.golden = buildGoldenBlock(testCustomer, categorized, recommendation);
      writeFileSync(fixturePath, JSON.stringify(raw, null, 2) + '\n');

      console.log(`${GRN}✓ uppdaterad${R}  cat=${YEL}${categorized.category}${R}  switch=${categorized.category ? recommendation.shouldSwitch : '—'}  ${DIM}(${elapsed} ms)${R}`);
      updated++;
    } else {
      // ── Jämförelse-läge ───────────────────────────────────────────────────
      const failures = compareOutputs(fx.golden, categorized, recommendation);

      if (failures.length === 0) {
        console.log(`${GRN}✓ OK${R}  cat=${categorized.category}  switch=${recommendation.shouldSwitch}  ${DIM}(${elapsed} ms)${R}`);
        passed++;
      } else {
        console.log(`${RED}✗ DRIFT (${failures.length} fält)${R}  ${DIM}(${elapsed} ms)${R}`);
        for (const f of failures) {
          const note = f.note ? `  ${DIM}${f.note}${R}` : '';
          console.log(`      ${RED}${f.field}${R}: förväntade ${BOLD}${JSON.stringify(f.expected)}${R} → fick ${BOLD}${JSON.stringify(f.actual)}${R}${note}`);
        }
        failed++;
      }
    }
  } catch (err) {
    const elapsed = Date.now() - t0;
    console.log(`${RED}✗ FEL: ${err.message}${R}  ${DIM}(${elapsed} ms)${R}`);
    failed++;
  }
}

// ── Sammanfattning ─────────────────────────────────────────────────────────────
console.log('\n' + '═'.repeat(60));

if (UPDATE) {
  console.log(`${GRN}${BOLD}Golden-data uppdaterad:${R} ${updated} fixtures`);
  console.log(`${DIM}Commit test-snapshots/ för att spara de nya golden-värdena.${R}\n`);
  process.exit(failed > 0 ? 1 : 0);
} else {
  const total = passed + failed;
  if (failed === 0) {
    console.log(`${GRN}${BOLD}INGEN DRIFT — ${passed}/${total} fixtures OK${R}\n`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}DRIFT DETEKTERAD — ${failed}/${total} fixtures misslyckades${R}`);
    console.log(`${DIM}Om ändringen är avsedd: kör  node scripts/ai-drift.mjs --update${R}\n`);
    process.exit(1);
  }
}
