#!/usr/bin/env node
/**
 * scripts/ai-drift.mjs — AI Drift Detector (Layer 5)
 *
 * Jämför aktuella categorize + recommend outputs mot sparade "golden" fixtures.
 * Fångar upp tyst modell-drift när Anthropic uppdaterar Haiku/Sonnet (eller vi
 * ändrar system-prompten) och affärskritiska STRUKTURELLA fält ändras.
 *
 * Vad vi testar (modellbeteende, inte priser):
 *   categorized.category          — exakt (fel kategori = fel benchmark)
 *   categorized.normalizedSupplier — exakt (syns i PR-text mot kund)
 *   categorized.subType           — exakt (styr tier-val)
 *   categorized.confidence        — aldrig under 0.70 (routing-tröskel)
 *   recommendation.shouldSwitch   — exakt (kärnbeslutet)
 *   recommendation.requiresQuote  — exakt (Managed Print-gate)
 *   recommendation.recommendationType — exakt
 *   recommendation.licenseOverage — exakt (M365-regel)
 *
 * Vad vi INTE testar (prisdriven data — bevakas av price-monitor.mjs Layer 3):
 *   suggestedAnnualCost, grossSaving, netSaving, overageSavings
 *   → Dessa ändras vid varje branchindex.js-uppdatering och skapar
 *     falska larm som tränar teamet att ignorera notifikationer.
 *
 * Kräver ANTHROPIC_API_KEY i .env (eller miljövariabel i CI).
 *
 * Läge 1 — Jämför (standard, nattlig CI):
 *   node scripts/ai-drift.mjs
 *   node scripts/ai-drift.mjs --fixtures microsoft,ricoh,telia
 *
 * Läge 2 — Initiera/uppdatera golden-data (lokalt, efter medveten ändring):
 *   node scripts/ai-drift.mjs --update
 *   node scripts/ai-drift.mjs --update --fixtures microsoft
 *
 * npm-alias:
 *   npm run test:ai-drift
 *   npm run capture:golden
 *
 * Kostnad: ~0,002 USD per fixture (Haiku + Sonnet). 4 fixtures ≈ 0,008 USD/natt.
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

const { categorize }            = await import(join(ROOT, 'agents/categorizer/categorize.js'));
const { recommend }             = await import(join(ROOT, 'agents/recommender/recommend.js'));
const { computeInvoiceMetrics } = await import(join(ROOT, 'lib/invoice-metrics.js'));

// ── CLI-argument ───────────────────────────────────────────────────────────────
const args       = process.argv.slice(2);
const UPDATE     = args.includes('--update');
const fixtureArg = args.find(a => a.startsWith('--fixtures='))?.slice('--fixtures='.length);
const positional = args.filter(a => !a.startsWith('--'));

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
  if (!fx.extracted) return false;
  if (!UPDATE && !fx.golden) return false;  // jämförelseläge kräver golden-block
  if (requestedSlugs) return requestedSlugs.includes(fx.slug);
  return true;
});

// ── Färger ─────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';

// ── Tidigt avbryt: inga fixtures att köra ─────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — AI Drift Detector${R}  (Layer 5)`);
console.log(`${DIM}Testar: category · normalizedSupplier · subType · shouldSwitch · requiresQuote · licenseOverage${R}`);
if (UPDATE) console.log(`${YEL}Läge: --update — skriver över golden-data${R}`);
console.log('');

if (fixtures.length === 0) {
  if (UPDATE) {
    console.error(`${RED}Inga fixtures med extracted-data hittades.${R}`);
    console.error('Kör: node scripts/capture-snapshots.mjs  för att skapa fixtures från PDF:er.');
    process.exit(1);
  } else {
    // Inte ett fel — golden-data har aldrig initierats ännu.
    console.log(`${YEL}${BOLD}⚠  GOLDEN DATA EJ INITIALISERAD${R}`);
    console.log('');
    console.log('Ingen fixture har ett "golden"-block ännu. Drift-bevakning är inaktiv.');
    console.log('');
    console.log('Initiera med (kräver ANTHROPIC_API_KEY och ~2 min):');
    console.log(`  ${DIM}node scripts/ai-drift.mjs --update --fixtures microsoft,telia,ricoh,bredband-1-baseline${R}`);
    console.log('  git add test-snapshots/');
    console.log('  git commit -m "init: golden snapshots for AI drift detection"');
    console.log('');
    process.exit(0);  // exit 0 — systemet saknar setup, men är inte trasigt
  }
}

// ── Kör pipeline (categorize + recommend) ─────────────────────────────────────
async function runPipeline(extracted, testCustomer) {
  const categorized = await categorize({
    supplier:    extracted.supplier    ?? '',
    description: (extracted.lineItems ?? []).map(l => l.description).join(', '),
    amount:      extracted.amount      ?? 0,
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
      variableCharges:              extracted.variableCharges              ?? 0,
      seatCount:                    extracted.seatCount                    ?? null,
      mobileAddonMonthly:           metrics.mobileAddonMonthly,
      broadbandAddonMonthly:        metrics.broadbandAddonMonthly,
      primaryComponentMonthly:      metrics.primaryComponentMonthly,
      secondaryComponentMonthly:    metrics.secondaryComponentMonthly      ?? null,
      secondaryConnectionSpeedMbit: metrics.secondaryConnectionSpeedMbit   ?? null,
      secondarySeatCount:           metrics.secondarySeatCount             ?? null,
      secondarySaving:              null,
      potentialMixedCategories:     extracted.potentialMixedCategories     ?? false,
      connectionSpeedMbit:          extracted.connectionSpeedMbit           ?? null,
      licenseType:                  extracted.licenseType                   ?? null,
      billingCycleType:             extracted.billingCycleType              ?? null,
      pricePerSeatMonthly:          extracted.pricePerSeatMonthly           ?? null,
      saasProductFamily:            extracted.saasProductFamily             ?? null,
      saasIncludedFeatures:         extracted.saasIncludedFeatures          ?? null,
      description:                  extracted.description                   ?? null,
      lineItems:                    extracted.lineItems                     ?? null,
      likeForLikeTarget:            null,
    },
    categorized,
  });

  return { categorized, recommendation };
}

// ── Fältjämförelse (alltid exakt — inga numeriska toleranser) ─────────────────
function compareField(failures, label, expected, actual) {
  if (expected === undefined) return;
  if (expected === null && actual === null) return;
  if (expected !== actual) {
    failures.push({ field: label, expected, actual });
  }
}

function compareOutputs(golden, categorized, recommendation) {
  const failures = [];

  compareField(failures, 'categorized.category',            golden.categorized.category,            categorized.category);
  compareField(failures, 'categorized.normalizedSupplier',  golden.categorized.normalizedSupplier,  categorized.normalizedSupplier);
  compareField(failures, 'categorized.subType',             golden.categorized.subType,             categorized.subType);

  // Konfidens-tröskel: routing-regel, oberoende av golden-värde
  if ((categorized.confidence ?? 1) < 0.70) {
    failures.push({ field: 'categorized.confidence', expected: '≥0.70', actual: categorized.confidence });
  }

  compareField(failures, 'recommendation.shouldSwitch',        golden.recommendation.shouldSwitch,        recommendation.shouldSwitch);
  compareField(failures, 'recommendation.requiresQuote',       golden.recommendation.requiresQuote,       recommendation.requiresQuote      ?? false);
  compareField(failures, 'recommendation.recommendationType',  golden.recommendation.recommendationType,  recommendation.recommendationType);
  compareField(failures, 'recommendation.licenseOverage',      golden.recommendation.licenseOverage,      recommendation.licenseOverage      ?? null);

  // suggestedAnnualCost / grossSaving / netSaving: INTE JÄMFÖRDA HÄR.
  // De är prisdrivna (beror på branchindex.js) — varje prisuppdatering
  // skulle trigga falskt alarm och träna teamet att ignorera notifikationer.
  // Prisriktighet bevakas av price-monitor.mjs (Layer 3).

  return failures;
}

// ── Bygg golden-block (sparas i fixture) ──────────────────────────────────────
function buildGoldenBlock(testCustomer, categorized, recommendation) {
  return {
    testCustomer,
    capturedAt: new Date().toISOString().slice(0, 10),
    // Bara de fält vi faktiskt jämför — håller golden-data minimal och stabil.
    categorized: {
      category:           categorized.category,
      subType:            categorized.subType            ?? null,
      normalizedSupplier: categorized.normalizedSupplier ?? null,
      confidence:         categorized.confidence,
      licensePending:     categorized.licensePending      ?? false,
    },
    recommendation: {
      shouldSwitch:       recommendation.shouldSwitch,
      recommendationType: recommendation.recommendationType ?? null,
      requiresQuote:      recommendation.requiresQuote       ?? false,
      licenseOverage:     recommendation.licenseOverage       ?? null,
      // Beloppsfält utelämnade: se kommentar i compareOutputs()
    },
  };
}

// ── Standardvärden för testkund ───────────────────────────────────────────────
const DEFAULT_CUSTOMER = { industry: null, employees: 50, revenue: null };

// ── Huvud: kör fixtures ───────────────────────────────────────────────────────
console.log(`${DIM}Fixtures: ${fixtures.length} st${R}\n`);

let passed  = 0;
let failed  = 0;
let updated = 0;

for (const fx of fixtures) {
  const t0           = Date.now();
  const { slug, extracted, file } = fx;
  const testCustomer = fx.golden?.testCustomer ?? DEFAULT_CUSTOMER;

  process.stdout.write(`  ${slug.padEnd(32)} `);

  try {
    const { categorized, recommendation } = await runPipeline(extracted, testCustomer);
    const elapsed = Date.now() - t0;

    if (UPDATE) {
      const fixturePath = join(SNAPSHOTS_DIR, file);
      const raw = JSON.parse(readFileSync(fixturePath, 'utf8'));
      raw.golden = buildGoldenBlock(testCustomer, categorized, recommendation);
      writeFileSync(fixturePath, JSON.stringify(raw, null, 2) + '\n');
      console.log(`${GRN}✓ uppdaterad${R}  cat=${YEL}${categorized.category}${R}  switch=${recommendation.shouldSwitch}  ${DIM}(${elapsed} ms)${R}`);
      updated++;
    } else {
      const failures = compareOutputs(fx.golden, categorized, recommendation);

      if (failures.length === 0) {
        console.log(`${GRN}✓ OK${R}  cat=${categorized.category}  switch=${recommendation.shouldSwitch}  ${DIM}(${elapsed} ms)${R}`);
        passed++;
      } else {
        console.log(`${RED}✗ DRIFT (${failures.length} fält)${R}  ${DIM}(${elapsed} ms)${R}`);
        for (const f of failures) {
          console.log(`      ${RED}${f.field}${R}: förväntade ${BOLD}${JSON.stringify(f.expected)}${R} → fick ${BOLD}${JSON.stringify(f.actual)}${R}`);
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
  if (failed === 0) {
    console.log(`${GRN}${BOLD}Golden-data uppdaterad:${R} ${updated} fixtures`);
    console.log(`${DIM}Commit test-snapshots/ för att aktivera nattlig drift-bevakning.${R}\n`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}${failed} fixtures misslyckades — se fel ovan.${R}\n`);
    process.exit(1);
  }
} else {
  if (failed === 0) {
    console.log(`${GRN}${BOLD}INGEN DRIFT — ${passed}/${passed + failed} fixtures OK${R}\n`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}DRIFT DETEKTERAD — ${failed}/${passed + failed} fixtures avvek${R}`);
    console.log(`${DIM}Om ändringen är avsedd: kör  node scripts/ai-drift.mjs --update${R}\n`);
    process.exit(1);
  }
}
