#!/usr/bin/env node
/**
 * scripts/e2e-test.mjs — End-to-end pipeline test mot edge-case-fakturor
 *
 * Kör den KOMPLETTA pipelinen (extract → categorize → recommend) för utvalda
 * fakturor och kontrollerar affärskritiska regler. Testar det vi aldrig sett
 * förut: licensöverskott, Managed Print-gate, blandkategorier, USD-fakturor m.m.
 *
 * Kräver ANTHROPIC_API_KEY i .env.
 * Varje körning kostar ~0,05–0,15 USD (Opus + Haiku + Sonnet per faktura).
 *
 * Användning:
 *   node scripts/e2e-test.mjs                     # alla 8 edge cases
 *   node scripts/e2e-test.mjs canon               # filtrera på namn
 *
 * npm-alias: npm run test:e2e
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve }  from 'node:path';
import { fileURLToPath }  from 'node:url';
import dotenv             from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
dotenv.config({ path: join(ROOT, '.env') });

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY saknas — sätt den i .env');
  process.exit(1);
}

const { extractInvoice, routeExtraction } = await import(join(ROOT, 'agents/test-invoice/extract.js'));
const { categorize }            = await import(join(ROOT, 'agents/categorizer/categorize.js'));
const { recommend }             = await import(join(ROOT, 'agents/recommender/recommend.js'));
const { computeInvoiceMetrics } = await import(join(ROOT, 'lib/invoice-metrics.js'));

// ── Färger ─────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const CYA  = '\x1b[36m';

// ── Edge cases ─────────────────────────────────────────────────────────────────
// Varje case definierar:
//   pdf        — filnamn i test-pdfs/
//   label      — kort beskrivning
//   hint       — vad vi specifikt testar
//   employees  — testkund-parameter (påverkar licenseOverage)
//   assertions — lista av { path, op, val, ?label }
//
// path-prefix: extract.X | route | categorized.X | recommendation.X
// op:  eq | neq | gt | gte | lt | oneOf | contains | truthy | falsy

const EDGE_CASES = [
  {
    pdf:       'atea-m365-overskott.pdf',
    label:     'M365 licensöverskott (Atea)',
    hint:      'Fler köpta licenser än anställda → licenseOverage > 0 + overageSavings',
    employees: 30,
    assertions: [
      { path: 'route',                            op: 'eq',    val: 'auto',             label: 'ska routas auto' },
      { path: 'categorized.category',             op: 'eq',    val: 'saas-productivity', label: 'ska vara saas-productivity' },
      { path: 'recommendation.licenseOverage',    op: 'gt',    val: 0,                  label: 'licensöverskott ska vara positivt' },
      { path: 'recommendation.requiresQuote',     op: 'eq',    val: false,              label: 'M365 ska inte kräva offert' },
      { path: 'recommendation.shouldSwitch',      op: 'eq',    val: true,               label: 'ska rekommendera byte/optimering' },
    ],
  },
  {
    pdf:       'canon-hog-klickratio.pdf',
    label:     'Managed Print — hög klick-ratio (Canon)',
    hint:      'Klickkostnader >35% av total → requiresQuote=true (Arvo kan ej ge AI-rek)',
    employees: 50,
    assertions: [
      { path: 'route',                        op: 'eq', val: 'auto',         label: 'ska routas auto' },
      { path: 'categorized.category',         op: 'eq', val: 'skrivarleasing', label: 'ska vara skrivarleasing' },
      { path: 'recommendation.requiresQuote', op: 'eq', val: true,           label: 'hög klick-ratio MÅSTE ge requiresQuote=true' },
    ],
  },
  {
    pdf:       'xerox-managed-print-it.pdf',
    label:     'Managed Print — IT-kombination (Xerox)',
    hint:      'Print blandat med IT-tjänster ska ändå klassas skrivarleasing (inte saas)',
    employees: 50,
    assertions: [
      { path: 'route',                    op: 'eq',   val: 'auto',         label: 'ska routas auto' },
      { path: 'categorized.category',     op: 'eq',   val: 'skrivarleasing', label: 'ska vara skrivarleasing trots IT-inslag' },
      { path: 'extract.recurring',        op: 'eq',   val: true,           label: 'ska klassas som återkommande kostnad' },
    ],
  },
  {
    pdf:       'google-workspace-arsbetalning.pdf',
    label:     'Google Workspace — årsbetalning',
    hint:      'Årsbetalning ska ge billingCycleType=annual; Google ska identifieras',
    employees: 50,
    assertions: [
      { path: 'route',                               op: 'eq',       val: 'auto',                       label: 'ska routas auto' },
      { path: 'categorized.category',               op: 'oneOf',    val: ['saas-productivity','saas-devtools'], label: 'ska vara SaaS-kategori' },
      { path: 'categorized.normalizedSupplier',     op: 'contains', val: 'google',                     label: 'leverantör ska identifieras som Google' },
      { path: 'extract.billingCycleType',           op: 'eq',       val: 'annual',                     label: 'årsbetalning ska ge billingCycleType=annual' },
      { path: 'recommendation.requiresQuote',       op: 'eq',       val: false,                        label: 'SaaS kräver ej offert' },
    ],
  },
  {
    pdf:       'comhem-mobil-bredband-kombinerad.pdf',
    label:     'Com Hem — mobil + bredband kombinerat',
    hint:      'Blandfaktura: primär kategori identifieras, potentialMixedCategories flaggas helst',
    employees: 50,
    assertions: [
      { path: 'route',                 op: 'eq',    val: 'auto',               label: 'ska routas auto' },
      { path: 'categorized.category', op: 'oneOf', val: ['mobil', 'bredband'], label: 'ska identifieras som mobil eller bredband' },
    ],
    softAssertions: [
      { path: 'extract.potentialMixedCategories', op: 'eq', val: true,
        label: '⚠ SOFT: potentialMixedCategories=true rekommenderas för blandfaktura' },
    ],
  },
  {
    pdf:       'microsoft-direkt-usd.pdf',
    label:     'Microsoft direkt — USD-faktura',
    hint:      'Microsoft fakturerar i USD; annualCost ska vara omräknat; kategori klar',
    employees: 50,
    assertions: [
      { path: 'route',                     op: 'eq',  val: 'auto',            label: 'ska routas auto' },
      { path: 'categorized.category',      op: 'eq',  val: 'saas-productivity', label: 'ska vara saas-productivity' },
      { path: 'extract.currency',          op: 'eq',  val: 'USD',             label: 'valuta ska extraheras som USD' },
      { path: 'extract.annualCost',        op: 'gt',  val: 0,                 label: 'annualCost ska vara positivt trots USD' },
      { path: 'recommendation.shouldSwitch', op: 'truthy', val: null,         label: 'rekommendation ska finnas' },
    ],
  },
  {
    pdf:       'hubspot-marketing-pro.pdf',
    label:     'HubSpot Marketing Pro',
    hint:      'Ny SaaS-leverantör; ska identifieras och rekommendation ges',
    employees: 50,
    assertions: [
      { path: 'route',                             op: 'eq',       val: 'auto', label: 'ska routas auto' },
      { path: 'categorized.normalizedSupplier',   op: 'contains', val: 'hubspot', label: 'leverantör ska identifieras som HubSpot' },
      { path: 'extract.recurring',                op: 'eq',       val: true,   label: 'ska vara återkommande kostnad' },
    ],
  },
  {
    pdf:       'fortum-el-fastpris.pdf',
    label:     'Fortum — fastprisavtal el',
    hint:      'Bundet fastprisavtal → route=monitoring (låst, kan ej sägas upp)',
    employees: 50,
    assertions: [
      { path: 'categorized.category', op: 'eq',    val: 'el',                          label: 'ska vara el-kategori' },
      { path: 'route',                op: 'oneOf', val: ['auto', 'monitoring'],         label: 'auto (rörligt) eller monitoring (fastpris)' },
    ],
  },
];

// ── Hjälpfunktioner ────────────────────────────────────────────────────────────
function getPath(data, path) {
  const keys = path.split('.');
  return keys.reduce((obj, k) => obj?.[k], data);
}

function evaluate({ path, op, val }, ctx) {
  const actual = getPath(ctx, path);
  switch (op) {
    case 'eq':       return actual === val;
    case 'neq':      return actual !== val;
    case 'gt':       return typeof actual === 'number' && actual > val;
    case 'gte':      return typeof actual === 'number' && actual >= val;
    case 'lt':       return typeof actual === 'number' && actual < val;
    case 'truthy':   return !!actual;
    case 'falsy':    return !actual;
    case 'oneOf':    return Array.isArray(val) && val.includes(actual);
    case 'contains': return typeof actual === 'string' && actual.toLowerCase().includes(String(val).toLowerCase());
    default:         return false;
  }
}

// ── Kör full pipeline ──────────────────────────────────────────────────────────
async function runCase(ec) {
  const pdfPath = join(ROOT, 'test-pdfs', ec.pdf);
  const pdfBytes = readFileSync(pdfPath);
  const customer = { industry: null, employees: ec.employees ?? 50, revenue: null };

  // 1. Extract (Opus)
  const extracted = await extractInvoice({ pdfBytes });
  const { route }  = routeExtraction(extracted);

  // 2. Categorize (Haiku) — hoppa om unsupported
  let categorized = { category: 'unsupported' };
  if (route !== 'unsupported') {
    categorized = await categorize({
      supplier:    extracted.supplier ?? '',
      description: (extracted.lineItems ?? []).map(l => l.description).join(', '),
      amount:      extracted.amount ?? 0,
    });
  }

  // 3. Metrics (deterministisk)
  const metrics = computeInvoiceMetrics(
    extracted.lineItems,
    categorized.category,
    extracted.potentialMixedCategories ?? false,
  );

  // 4. Recommend (Sonnet/Opus) — hoppa om unsupported eller ingen benchmark
  let recommendation = { shouldSwitch: false, requiresQuote: false, licenseOverage: null };
  if (route !== 'unsupported') {
    try {
      recommendation = await recommend({
        customer,
        invoice: {
          amount:                       extracted.amount,
          annualCost:                   extracted.annualCost,
          recurringAmount:              extracted.recurringAmount,
          variableCharges:              extracted.variableCharges     ?? 0,
          seatCount:                    extracted.seatCount           ?? null,
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
    } catch {
      // Inget benchmark → recommendation forblir tom
    }
  }

  // Platt kontext för assertion-path-lookup
  return {
    route,
    extract:        extracted,
    categorized,
    recommendation,
    metrics,
  };
}

// ── CLI-filter ─────────────────────────────────────────────────────────────────
const filter = process.argv[2]?.toLowerCase();
const cases  = filter
  ? EDGE_CASES.filter(ec => ec.pdf.toLowerCase().includes(filter) || ec.label.toLowerCase().includes(filter))
  : EDGE_CASES;

if (cases.length === 0) {
  console.error(`Inget edge case matchar "${filter}"`);
  process.exit(1);
}

// ── Kör ────────────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — E2E Edge Case Test${R}`);
console.log(`${DIM}Full pipeline: extract (Opus) → categorize (Haiku) → recommend (Sonnet)${R}`);
console.log(`${DIM}Edge cases: ${cases.length} st  |  OBS: kostar ~0,10 USD/körning${R}\n`);

let totalPassed = 0;
let totalFailed = 0;
let totalSoft   = 0;

for (const ec of cases) {
  const pdfPath = join(ROOT, 'test-pdfs', ec.pdf);
  try { readFileSync(pdfPath); } catch {
    console.log(`${YEL}⊘ HOPPAR${R}  ${ec.label}  ${DIM}(${ec.pdf} saknas i test-pdfs/)${R}\n`);
    continue;
  }

  console.log(`${BOLD}▶ ${ec.label}${R}`);
  console.log(`  ${DIM}${ec.hint}${R}`);
  console.log(`  ${DIM}PDF: ${ec.pdf}  |  Anställda: ${ec.employees ?? 50}${R}`);

  const t0 = Date.now();
  let ctx;
  try {
    ctx = await runCase(ec);
  } catch (err) {
    console.log(`  ${RED}✗ PIPELINE-FEL: ${err.message}${R}\n`);
    totalFailed++;
    continue;
  }
  const elapsed = Date.now() - t0;

  // Skriv ut pipeline-sammanfattning
  console.log(`  ${DIM}Route: ${ctx.route}  |  Category: ${ctx.categorized.category}  |  Switch: ${ctx.recommendation.shouldSwitch}  |  Quote: ${ctx.recommendation.requiresQuote}  |  Overage: ${ctx.recommendation.licenseOverage ?? '—'}  (${elapsed} ms)${R}`);

  // Hårda assertions
  let casePassed = 0;
  let caseFailed = 0;
  for (const a of ec.assertions ?? []) {
    const ok     = evaluate(a, ctx);
    const actual = getPath(ctx, a.path);
    const lbl    = a.label ?? `${a.path} ${a.op} ${JSON.stringify(a.val)}`;
    if (ok) {
      console.log(`  ${GRN}✓${R} ${lbl}`);
      casePassed++;
    } else {
      console.log(`  ${RED}✗ ${lbl}${R}`);
      console.log(`    ${DIM}fick: ${JSON.stringify(actual)}   förväntade: ${a.op} ${JSON.stringify(a.val)}${R}`);
      caseFailed++;
    }
  }

  // Mjuka assertions (varnar men räknas inte som fel)
  for (const a of ec.softAssertions ?? []) {
    const ok     = evaluate(a, ctx);
    const actual = getPath(ctx, a.path);
    if (!ok) {
      console.log(`  ${YEL}${a.label}${R}`);
      console.log(`    ${DIM}fick: ${JSON.stringify(actual)}${R}`);
      totalSoft++;
    }
  }

  totalPassed += casePassed;
  totalFailed += caseFailed;
  console.log('');
}

// ── Sammanfattning ─────────────────────────────────────────────────────────────
console.log('═'.repeat(60));
if (totalFailed === 0) {
  console.log(`${GRN}${BOLD}ALLA ASSERTIONS GODKÄNDA${R}  ${totalPassed} av ${totalPassed + totalFailed}`);
} else {
  console.log(`${RED}${BOLD}${totalFailed} ASSERTIONS MISSLYCKADES${R}  ${totalPassed} av ${totalPassed + totalFailed} godkända`);
}
if (totalSoft > 0) {
  console.log(`${YEL}${totalSoft} mjuka varningar (ej blockerande)${R}`);
}
console.log('');
process.exit(totalFailed > 0 ? 1 : 0);
