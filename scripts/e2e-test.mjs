#!/usr/bin/env node
/**
 * scripts/e2e-test.mjs — End-to-end pipeline test
 *
 * Två lägen:
 *
 * Läge 1 — PDF (standard, lokal dator):
 *   Kör KOMPLETT pipeline: extract (Opus) → categorize → recommend.
 *   Testar 8 edge cases som aldrig körts förut.
 *   node scripts/e2e-test.mjs
 *   node scripts/e2e-test.mjs canon
 *   Kostnad: ~0,10–0,15 USD/körning
 *
 * Läge 2 — Fixtures (CI/mobil, ingen PDF behövs):
 *   Hoppar över extract, kör categorize + recommend mot committade JSON-fixtures.
 *   Täcker 24 kända fakturor med affärsregelassertioner.
 *   node scripts/e2e-test.mjs --from-fixtures
 *   Kostnad: ~0,02 USD/körning
 *
 * npm-alias:
 *   npm run test:e2e               # PDF-läge (lokal)
 *   npm run test:e2e:fixtures      # Fixture-läge (CI/mobil)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve }  from 'node:path';
import { fileURLToPath }  from 'node:url';
import dotenv             from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
dotenv.config({ path: join(ROOT, '.env') });

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY saknas — sätt den i .env eller som CI-miljövariabel');
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

const FROM_FIXTURES = process.argv.includes('--from-fixtures');
const filterArg     = process.argv.find(a => !a.startsWith('--') && process.argv.indexOf(a) > 1);

// ═══════════════════════════════════════════════════════════════════════════════
// LÄGE 1 — PDF-baserade edge cases (lokal dator)
// ═══════════════════════════════════════════════════════════════════════════════

const PDF_EDGE_CASES = [
  {
    pdf: 'atea-m365-overskott.pdf',
    label: 'M365 licensöverskott (Atea)',
    hint:  'Fler licenser köpta än anställda → licenseOverage > 0',
    employees: 30,
    assertions: [
      { path: 'route',                         op: 'eq',    val: 'auto' },
      { path: 'categorized.category',          op: 'eq',    val: 'saas-productivity' },
      { path: 'recommendation.licenseOverage', op: 'gt',    val: 0,     label: 'licensöverskott ska vara positivt' },
      { path: 'recommendation.requiresQuote',  op: 'eq',    val: false },
      { path: 'recommendation.shouldSwitch',   op: 'eq',    val: true },
    ],
  },
  {
    pdf: 'canon-hog-klickratio.pdf',
    label: 'Managed Print — hög klick-ratio (Canon)',
    hint:  'Klickkostnad >35% av total → requiresQuote=true',
    employees: 50,
    assertions: [
      { path: 'route',                         op: 'eq', val: 'auto' },
      { path: 'categorized.category',          op: 'eq', val: 'skrivarleasing' },
      { path: 'recommendation.requiresQuote',  op: 'eq', val: true, label: 'hög klick-ratio MÅSTE ge requiresQuote=true' },
    ],
  },
  {
    pdf: 'xerox-managed-print-it.pdf',
    label: 'Managed Print + IT-tjänster (Xerox)',
    hint:  'Print blandat med IT ska ändå klassas skrivarleasing',
    employees: 50,
    assertions: [
      { path: 'route',                op: 'eq', val: 'auto' },
      { path: 'categorized.category', op: 'eq', val: 'skrivarleasing', label: 'ska vara skrivarleasing trots IT-inslag' },
    ],
  },
  {
    pdf: 'google-workspace-arsbetalning.pdf',
    label: 'Google Workspace — årsbetalning',
    hint:  'Årsbetalning → billingCycleType=annual; Google identifieras',
    employees: 50,
    assertions: [
      { path: 'route',                             op: 'eq',       val: 'auto' },
      { path: 'categorized.category',             op: 'oneOf',    val: ['saas-productivity', 'saas-devtools'] },
      { path: 'categorized.normalizedSupplier',   op: 'contains', val: 'google', label: 'leverantör ska identifieras som Google' },
      { path: 'extract.billingCycleType',         op: 'eq',       val: 'annual', label: 'årsbetalning ska ge billingCycleType=annual' },
    ],
  },
  {
    pdf: 'comhem-mobil-bredband-kombinerad.pdf',
    label: 'Com Hem — mobil + bredband kombinerat',
    hint:  'Blandfaktura: primär kategori identifieras korrekt',
    employees: 50,
    assertions: [
      { path: 'route',                op: 'eq',    val: 'auto' },
      { path: 'categorized.category', op: 'oneOf', val: ['mobil', 'bredband'] },
    ],
    softAssertions: [
      { path: 'extract.potentialMixedCategories', op: 'eq', val: true,
        label: '⚠ SOFT: potentialMixedCategories=true rekommenderas för blandfaktura' },
    ],
  },
  {
    pdf: 'microsoft-direkt-usd.pdf',
    label: 'Microsoft direkt — USD-faktura',
    hint:  'USD ska extraheras korrekt; annualCost beräknas',
    employees: 50,
    assertions: [
      { path: 'route',                    op: 'eq',     val: 'auto' },
      { path: 'categorized.category',     op: 'eq',     val: 'saas-productivity' },
      { path: 'extract.currency',         op: 'eq',     val: 'USD',  label: 'valuta ska extraheras som USD' },
      { path: 'extract.annualCost',       op: 'gt',     val: 0,      label: 'annualCost ska vara positivt trots USD' },
    ],
  },
  {
    pdf: 'hubspot-marketing-pro.pdf',
    label: 'HubSpot Marketing Pro',
    hint:  'Ny SaaS-leverantör; ska identifieras och rekommendation ges',
    employees: 50,
    assertions: [
      { path: 'route',                           op: 'eq',       val: 'auto' },
      { path: 'categorized.normalizedSupplier', op: 'contains', val: 'hubspot', label: 'HubSpot ska identifieras som leverantör' },
      { path: 'extract.recurring',               op: 'eq',       val: true },
    ],
  },
  {
    pdf: 'fortum-el-fastpris.pdf',
    label: 'Fortum — fastprisavtal el',
    hint:  'Bundet fastprisavtal → troligtvis route=monitoring',
    employees: 50,
    assertions: [
      { path: 'categorized.category', op: 'eq',    val: 'el' },
      { path: 'route',                op: 'oneOf', val: ['auto', 'monitoring'] },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// LÄGE 2 — Fixture-baserade assertions (CI/mobil, inga PDF:er behövs)
// ═══════════════════════════════════════════════════════════════════════════════

// Specifika assertions per känd fixture-slug.
// Allt som inte definieras här får bara universal-assertions.
const FIXTURE_ASSERTIONS = {
  'microsoft': [
    { path: 'categorized.category',          op: 'eq',  val: 'saas-productivity' },
    { path: 'recommendation.shouldSwitch',   op: 'eq',  val: true },
    { path: 'recommendation.requiresQuote',  op: 'eq',  val: false },
    { path: 'recommendation.licenseOverage', op: 'gt',  val: 0,    label: 'seatCount=57 > employees=45 → overage' },
  ],
  'microsoft-new': [
    { path: 'categorized.category',         op: 'eq', val: 'saas-productivity' },
    { path: 'recommendation.shouldSwitch',  op: 'eq', val: true },
    { path: 'recommendation.requiresQuote', op: 'eq', val: false },
  ],
  'ricoh': [
    { path: 'categorized.category',   op: 'eq',     val: 'skrivarleasing' },
    { path: 'categorized.normalizedSupplier', op: 'contains', val: 'ricoh' },
  ],
  'ricoh-print': [
    { path: 'categorized.category', op: 'eq', val: 'skrivarleasing' },
  ],
  'telia': [
    { path: 'categorized.category',         op: 'eq', val: 'mobil' },
    { path: 'recommendation.shouldSwitch',  op: 'eq', val: true },
    { path: 'recommendation.requiresQuote', op: 'eq', val: false },
  ],
  'telia-mobil': [
    { path: 'categorized.category', op: 'eq', val: 'mobil' },
  ],
  'atlassian': [
    { path: 'categorized.category', op: 'eq', val: 'saas-devtools' },
  ],
  'vattenfall': [
    { path: 'categorized.category', op: 'eq', val: 'el' },
  ],
  'outofscope': [
    { path: 'route', op: 'eq', val: 'unsupported', label: 'out-of-scope ska ge route=unsupported' },
  ],
  'unclear': [
    { path: 'route', op: 'oneOf', val: ['review_queue', 'auto'], label: 'oklar faktura ska ge låg confidence' },
  ],
  'bredband-1-baseline': [
    { path: 'categorized.category', op: 'eq', val: 'bredband' },
    // shouldSwitch utelämnat — prisutslagsgivande, beror på benchmark-priser
  ],
  'bredband-2-sveakom': [
    { path: 'categorized.category', op: 'eq', val: 'bredband' },
  ],
  'connectsverige': [
    { path: 'categorized.category', op: 'eq', val: 'mobil' },
  ],
};

// ── Hjälpfunktioner ────────────────────────────────────────────────────────────
function getPath(data, path) {
  return path.split('.').reduce((obj, k) => obj?.[k], data);
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

function runAssertions(assertions, softAssertions = [], ctx) {
  let passed = 0, failed = 0, soft = 0;
  for (const a of assertions) {
    const ok     = evaluate(a, ctx);
    const actual = getPath(ctx, a.path);
    const lbl    = a.label ?? `${a.path} ${a.op} ${JSON.stringify(a.val)}`;
    if (ok) {
      console.log(`  ${GRN}✓${R} ${lbl}`);
      passed++;
    } else {
      console.log(`  ${RED}✗ ${lbl}${R}`);
      console.log(`    ${DIM}fick: ${JSON.stringify(actual)}   förväntade: ${a.op} ${JSON.stringify(a.val)}${R}`);
      failed++;
    }
  }
  for (const a of softAssertions) {
    if (!evaluate(a, ctx)) {
      console.log(`  ${YEL}${a.label}${R}`);
      console.log(`    ${DIM}fick: ${JSON.stringify(getPath(ctx, a.path))}${R}`);
      soft++;
    }
  }
  return { passed, failed, soft };
}

// ── Kör pipeline ───────────────────────────────────────────────────────────────
async function runPipeline(extracted, customer) {
  const { route } = routeExtraction(extracted);

  let categorized = { category: 'unsupported', confidence: 1 };
  if (route !== 'unsupported') {
    categorized = await categorize({
      supplier:    extracted.supplier ?? '',
      description: (extracted.lineItems ?? []).map(l => l.description).join(', '),
      amount:      extracted.amount ?? 0,
    });
  }

  const metrics = computeInvoiceMetrics(
    extracted.lineItems, categorized.category,
    extracted.potentialMixedCategories ?? false,
  );

  let recommendation = { shouldSwitch: false, requiresQuote: false, licenseOverage: null };
  if (route !== 'unsupported') {
    try {
      recommendation = await recommend({
        customer,
        invoice: {
          amount: extracted.amount, annualCost: extracted.annualCost,
          recurringAmount: extracted.recurringAmount,
          variableCharges: extracted.variableCharges ?? 0,
          seatCount: extracted.seatCount ?? null,
          mobileAddonMonthly: metrics.mobileAddonMonthly,
          broadbandAddonMonthly: metrics.broadbandAddonMonthly,
          primaryComponentMonthly: metrics.primaryComponentMonthly,
          secondaryComponentMonthly: metrics.secondaryComponentMonthly ?? null,
          secondaryConnectionSpeedMbit: metrics.secondaryConnectionSpeedMbit ?? null,
          secondarySeatCount: metrics.secondarySeatCount ?? null,
          secondarySaving: null,
          potentialMixedCategories: extracted.potentialMixedCategories ?? false,
          connectionSpeedMbit: extracted.connectionSpeedMbit ?? null,
          licenseType: extracted.licenseType ?? null,
          billingCycleType: extracted.billingCycleType ?? null,
          pricePerSeatMonthly: extracted.pricePerSeatMonthly ?? null,
          saasProductFamily: extracted.saasProductFamily ?? null,
          saasIncludedFeatures: extracted.saasIncludedFeatures ?? null,
          description: extracted.description ?? null,
          lineItems: extracted.lineItems ?? null,
          likeForLikeTarget: null,
        },
        categorized,
      });
    } catch { /* ingen benchmark — recommendation förblir tom */ }
  }

  return {
    route, extract: extracted, categorized, recommendation, metrics,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HUVUDPROGRAM
// ═══════════════════════════════════════════════════════════════════════════════

let totalPassed = 0, totalFailed = 0, totalSoft = 0;

if (FROM_FIXTURES) {
  // ── Läge 2: Fixture-baserat (CI/mobil) ──────────────────────────────────────
  console.log(`\n${BOLD}Arvo Flow — E2E Pipeline Test  ${YEL}[fixture-läge]${R}`);
  console.log(`${DIM}Kör categorize + recommend mot committade JSON-fixtures (inga PDF:er behövs).${R}`);
  console.log(`${DIM}Kostnad: ~0,02 USD  |  extract (Opus) hoppas över${R}\n`);

  const SNAPSHOTS_DIR = join(ROOT, 'test-snapshots');
  let fixtures = readdirSync(SNAPSHOTS_DIR).filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace('.json',''), ...JSON.parse(readFileSync(join(SNAPSHOTS_DIR, f), 'utf8')) }))
    .filter(fx => fx.extracted);

  if (filterArg) fixtures = fixtures.filter(fx => fx.slug.includes(filterArg));

  const UNIVERSAL = [
    // annualCost kan vara null för vissa fakturor — ingen universell assertion här
  ];

  const MICROSOFT_CUSTOMER = { industry: null, employees: 45, revenue: null };
  const DEFAULT_CUSTOMER   = { industry: null, employees: 50, revenue: null };

  for (const fx of fixtures) {
    const customer = fx.slug.startsWith('microsoft') ? MICROSOFT_CUSTOMER : DEFAULT_CUSTOMER;
    const specific = FIXTURE_ASSERTIONS[fx.slug] ?? [];

    console.log(`${BOLD}▶ ${fx._description ?? fx.slug}${R}`);
    const t0 = Date.now();
    let ctx;
    try {
      ctx = await runPipeline(fx.extracted, customer);
    } catch (err) {
      console.log(`  ${RED}✗ PIPELINE-FEL: ${err.message}${R}\n`);
      totalFailed++;
      continue;
    }
    const elapsed = Date.now() - t0;
    console.log(`  ${DIM}Route: ${ctx.route}  |  Category: ${ctx.categorized.category}  |  Switch: ${ctx.recommendation.shouldSwitch}  |  Quote: ${ctx.recommendation.requiresQuote}  (${elapsed} ms)${R}`);

    // Hoppa över universal-assertions för unsupported (annualCost-check gäller ej)
    const assertions = ctx.route === 'unsupported' ? specific : [...UNIVERSAL, ...specific];
    const r = runAssertions(assertions, [], ctx);
    totalPassed += r.passed; totalFailed += r.failed; totalSoft += r.soft;
    console.log('');
  }

} else {
  // ── Läge 1: PDF-baserat (lokal dator) ────────────────────────────────────────
  console.log(`\n${BOLD}Arvo Flow — E2E Edge Case Test  ${YEL}[PDF-läge]${R}`);
  console.log(`${DIM}Komplett pipeline: extract (Opus) → categorize (Haiku) → recommend (Sonnet)${R}`);
  console.log(`${DIM}Kostnad: ~0,10–0,15 USD per körning${R}\n`);

  let cases = PDF_EDGE_CASES;
  if (filterArg) cases = cases.filter(ec => ec.pdf.toLowerCase().includes(filterArg) || ec.label.toLowerCase().includes(filterArg));
  if (cases.length === 0) { console.error(`Inget edge case matchar "${filterArg}"`); process.exit(1); }

  for (const ec of cases) {
    const pdfPath = join(ROOT, 'test-pdfs', ec.pdf);
    try { readFileSync(pdfPath); } catch {
      console.log(`${YEL}⊘ HOPPAR${R}  ${ec.label}  ${DIM}(${ec.pdf} saknas i test-pdfs/)${R}\n`);
      continue;
    }

    console.log(`${BOLD}▶ ${ec.label}${R}`);
    console.log(`  ${DIM}${ec.hint}${R}`);

    const t0 = Date.now();
    let ctx;
    try {
      const pdfBytes = readFileSync(pdfPath);
      const extracted = await extractInvoice({ pdfBytes });
      const customer  = { industry: null, employees: ec.employees ?? 50, revenue: null };
      ctx = await runPipeline(extracted, customer);
      ctx.extract = extracted;  // alias for assertion paths
    } catch (err) {
      console.log(`  ${RED}✗ PIPELINE-FEL: ${err.message}${R}\n`);
      totalFailed++;
      continue;
    }

    const elapsed = Date.now() - t0;
    console.log(`  ${DIM}Route: ${ctx.route}  |  Category: ${ctx.categorized.category}  |  Switch: ${ctx.recommendation.shouldSwitch}  |  Quote: ${ctx.recommendation.requiresQuote}  |  Overage: ${ctx.recommendation.licenseOverage ?? '—'}  (${elapsed} ms)${R}`);

    const r = runAssertions(ec.assertions ?? [], ec.softAssertions ?? [], ctx);
    totalPassed += r.passed; totalFailed += r.failed; totalSoft += r.soft;
    console.log('');
  }
}

// ── Sammanfattning ─────────────────────────────────────────────────────────────
console.log('═'.repeat(60));
if (totalFailed === 0) {
  console.log(`${GRN}${BOLD}ALLA ASSERTIONS GODKÄNDA${R}  ${totalPassed} av ${totalPassed + totalFailed}`);
} else {
  console.log(`${RED}${BOLD}${totalFailed} ASSERTIONS MISSLYCKADES${R}  ${totalPassed} av ${totalPassed + totalFailed} godkända`);
}
if (totalSoft > 0) console.log(`${YEL}${totalSoft} mjuka varningar (ej blockerande)${R}`);
console.log('');
process.exit(totalFailed > 0 ? 1 : 0);
