#!/usr/bin/env node
// scripts/pipeline-test.mjs
// Full-pipeline integration test: extract → categorize → recommend
//
// Lager A: Statisk struktur-guard — api/test-invoice.mjs måste inkludera alla
//          förväntade nycklar i autoResponse.recommendation (fångar passthrough-buggar)
// Lager B: Pipeline-integration — kör extract → categorize → recommend mot nyckel-PDF:er
// Lager C: Recommend-outputstruktur — alla förväntade fält ska finnas i recommend()-svaret
//
// Användning:
//   node scripts/pipeline-test.mjs              # kör alla lager
//   node scripts/pipeline-test.mjs ricoh.pdf    # kör Layer A + Layer B/C för enbart den PDF:en

import { readFileSync, existsSync } from 'node:fs';
import { resolve, join }           from 'node:path';
import { fileURLToPath }           from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env') });

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const CYA  = '\x1b[36m';

const SEK = (n) => n == null ? '—' : `${n.toLocaleString('sv-SE')} kr`;

// ── Alla nycklar som api/test-invoice.mjs MÅSTE skicka i autoResponse.recommendation ──
// Lägg till nya fält här om recommend() utökas — testet misslyckas tills API:t är uppdaterat.
const REQUIRED_AUTORESPONSE_KEYS = [
  'recommendationType',
  'optimizationSaving',
  'requiresQuote',
  'shouldSwitch',
  'suggestedSupplier',
  'suggestedAnnualCost',
  'secondarySaving',
  'grossSaving',
  'arvoFee',
  'netSaving',
  'confidence',
  'reasoning',
  'switchSteps',
  'licenseOverage',
  'overageSavings',
  'annualBillingSaving',
  'nonPrimaryAnnual',
  'tierOptimizationSaving',
  'tierOptimizationFromTier',
  'tierOptimizationToTier',
  'clickRateAnalysis',        // ← bugg som triggade testet
];

// ── Nycklar som alltid ska finnas i recommend()-returnsvärdet ─────────────────
const REQUIRED_RECOMMEND_OUTPUT_KEYS = [
  'shouldSwitch',
  'requiresQuote',
  'confidence',
  'reasoning',
  'switchSteps',
  'suggestedSupplier',
  'suggestedAnnualCost',
  'recommendationType',
];

// ── Test-PDF:er med golden master för pipeline ────────────────────────────────
// Varje post: { file, customer, checks[] }
// checks: fn(categorized, recommendation, extracted) → { pass: bool, label: string, detail?: string }
const PIPELINE_CASES = [
  {
    file: 'ricoh.pdf',
    customer: { industry: 'tjänsteföretag', employees: 45, revenue: 10_000_000 },
    checks: [
      {
        label: 'Kategoriseras som skrivarleasing',
        fn: (cat) => cat.category === 'skrivarleasing',
        detail: (cat) => `fick: ${cat.category}`,
      },
      {
        label: 'requiresQuote: true (Managed Print-guard aktiv)',
        fn: (_cat, rec) => rec.requiresQuote === true,
        detail: (_cat, rec) => `requiresQuote=${rec.requiresQuote}`,
      },
      {
        label: 'clickRateAnalysis returneras (inte null)',
        fn: (_cat, rec) => rec.clickRateAnalysis != null,
        detail: (_cat, rec) => `clickRateAnalysis=${JSON.stringify(rec.clickRateAnalysis)}`,
      },
      {
        label: 'clickRateAnalysis.priceGapScore är ett tal 0–100',
        fn: (_cat, rec) => typeof rec.clickRateAnalysis?.priceGapScore === 'number'
          && rec.clickRateAnalysis.priceGapScore >= 0
          && rec.clickRateAnalysis.priceGapScore <= 100,
        detail: (_cat, rec) => `priceGapScore=${rec.clickRateAnalysis?.priceGapScore}`,
      },
      {
        label: 'clickRateAnalysis.bwRate > 0',
        fn: (_cat, rec) => (rec.clickRateAnalysis?.bwRate ?? 0) > 0,
        detail: (_cat, rec) => `bwRate=${rec.clickRateAnalysis?.bwRate}`,
      },
    ],
  },
  {
    file: 'konica-minolta-klick.pdf',
    customer: { industry: 'tjänsteföretag', employees: 45, revenue: 10_000_000 },
    checks: [
      {
        label: 'Kategoriseras som skrivarleasing',
        fn: (cat) => cat.category === 'skrivarleasing',
        detail: (cat) => `fick: ${cat.category}`,
      },
      {
        label: 'requiresQuote: true (Managed Print-guard aktiv)',
        fn: (_cat, rec) => rec.requiresQuote === true,
        detail: (_cat, rec) => `requiresQuote=${rec.requiresQuote}`,
      },
      {
        label: 'clickRateAnalysis returneras (inte null)',
        fn: (_cat, rec) => rec.clickRateAnalysis != null,
        detail: (_cat, rec) => `clickRateAnalysis=${JSON.stringify(rec.clickRateAnalysis)}`,
      },
    ],
  },
  {
    file: 'telia.pdf',
    customer: { industry: 'handel', employees: 20, revenue: 5_000_000 },
    checks: [
      {
        label: 'Kategoriseras som mobil',
        fn: (cat) => cat.category === 'mobil',
        detail: (cat) => `fick: ${cat.category}`,
      },
      {
        label: 'shouldSwitch: true (Telia mobilplan ska triggerhanbyte)',
        fn: (_cat, rec) => rec.shouldSwitch === true,
        detail: (_cat, rec) => `shouldSwitch=${rec.shouldSwitch}, netSaving=${rec.netSaving}`,
      },
      {
        label: 'requiresQuote: false (mobil behöver ingen offert)',
        fn: (_cat, rec) => rec.requiresQuote === false,
        detail: (_cat, rec) => `requiresQuote=${rec.requiresQuote}`,
      },
      {
        label: 'clickRateAnalysis: null (mobil ska inte ha klickanalys)',
        fn: (_cat, rec) => rec.clickRateAnalysis === null || rec.clickRateAnalysis === undefined,
        detail: (_cat, rec) => `clickRateAnalysis=${JSON.stringify(rec.clickRateAnalysis)}`,
      },
    ],
  },
  {
    file: 'microsoft.pdf',
    customer: { industry: 'tjänsteföretag', employees: 45, revenue: 10_000_000 },
    checks: [
      {
        label: 'Kategoriseras som saas-productivity',
        fn: (cat) => cat.category === 'saas-productivity',
        detail: (cat) => `fick: ${cat.category}`,
      },
      {
        label: 'suggestedAnnualCost är ett tal > 0',
        fn: (_cat, rec) => typeof rec.suggestedAnnualCost === 'number' && rec.suggestedAnnualCost > 0,
        detail: (_cat, rec) => `suggestedAnnualCost=${rec.suggestedAnnualCost}`,
      },
      {
        label: 'licenseOverage = seatCount − employees när seatCount > employees',
        fn: (_cat, rec, ext) => {
          if (ext.seatCount == null || ext.seatCount <= 45) return true; // ej tillämpligt
          return rec.licenseOverage === (ext.seatCount - 45);
        },
        detail: (_cat, rec, ext) => `seatCount=${ext.seatCount}, licenseOverage=${rec.licenseOverage}`,
      },
      {
        label: 'reasoning namnger leverantören (OVERRIDE-regel för saas-productivity)',
        fn: (_cat, rec) => /microsoft/i.test(rec.reasoning ?? ''),
        detail: (_cat, rec) => `reasoning börjar med: "${(rec.reasoning ?? '').slice(0, 80)}"`,
      },
    ],
  },
];

// ── Layer A: Statisk struktur-guard ───────────────────────────────────────────
function runLayerA() {
  console.log(`\n${BOLD}═══ Lager A: Statisk struktur-guard (api/test-invoice.mjs) ═══${R}`);

  const apiPath = join(ROOT, 'api/test-invoice.mjs');
  if (!existsSync(apiPath)) {
    console.log(`  ${RED}✗ api/test-invoice.mjs saknas${R}`);
    return false;
  }

  const source = readFileSync(apiPath, 'utf8');

  // Hitta autoResponse.recommendation-blocket via linjeankar.
  // Strategi: extrahera linjer mellan "recommendation: {" och nästa fristående "},"
  // (undviker regex-literal-buggar i braces-räkning).
  const autoResponseStart = source.indexOf('const autoResponse = {');
  if (autoResponseStart === -1) {
    console.log(`  ${RED}✗ Kunde inte hitta const autoResponse i api/test-invoice.mjs${R}`);
    return false;
  }
  const recKeyStart = source.indexOf('recommendation: {', autoResponseStart);
  if (recKeyStart === -1) {
    console.log(`  ${RED}✗ Kunde inte hitta recommendation-blocket i autoResponse${R}`);
    return false;
  }

  // Extrahera linjer efter "recommendation: {" tills vi hittar en linje med bara "      }," (stängning)
  const lines = source.slice(recKeyStart).split('\n');
  const blockLines = [];
  let insideBlock = false;
  for (const line of lines) {
    if (!insideBlock) {
      if (line.includes('recommendation: {')) { insideBlock = true; continue; }
    } else {
      // Stängning: en rad med enbart whitespace + "}," på rätt indenteringsnivå
      if (/^\s+\},?\s*$/.test(line) && blockLines.length > 3) break;
      blockLines.push(line);
    }
  }
  const recBlock = blockLines.join('\n');

  const failures = [];
  for (const key of REQUIRED_AUTORESPONSE_KEYS) {
    // Matcha antingen "key:" (explicit value) eller "key," / "key\n" (shorthand property)
    const explicit  = new RegExp(`\\b${key}\\s*:`);
    const shorthand = new RegExp(`\\b${key}\\s*[,\n]`);
    if (!explicit.test(recBlock) && !shorthand.test(recBlock)) {
      failures.push(key);
    }
  }

  if (failures.length === 0) {
    console.log(`  ${GRN}${BOLD}✓ PASS${R}  (${REQUIRED_AUTORESPONSE_KEYS.length} nycklar verifierade)`);
  } else {
    console.log(`  ${RED}${BOLD}✗ FAIL${R}  — ${failures.length} nyckel(ar) saknas i autoResponse.recommendation:`);
    for (const k of failures) {
      console.log(`    ${RED}✗${R} ${k}  ${DIM}(lägg till i autoResponse.recommendation-blocket i api/test-invoice.mjs)${R}`);
    }
  }

  return failures.length === 0;
}

// ── Layer B+C: Pipeline-integration + Recommend-outputstruktur ───────────────
async function runPipelineCase(testCase) {
  const { file, customer, checks } = testCase;
  const pdfPath = join(ROOT, 'test-pdfs', file);

  if (!existsSync(pdfPath)) {
    console.log(`  ${YEL}⚠ SKIP${R}  ${file} saknas i test-pdfs/`);
    return { skipped: true };
  }

  const sep = '─'.repeat(70);
  console.log(`\n${sep}`);
  console.log(`${BOLD}${file}${R}`);

  const t0 = Date.now();
  const failures = [];

  try {
    // ── Extract ──────────────────────────────────────────────────────────────
    const { extractInvoice, routeExtraction } = await import(
      join(ROOT, 'agents/test-invoice/extract.js')
    );
    const pdfBytes  = readFileSync(pdfPath);
    const extracted = await extractInvoice({ pdfBytes });
    const routing   = routeExtraction(extracted);

    console.log(`  ${DIM}Route: ${routing.route}  |  Confidence: ${((extracted.confidenceScore ?? 0) * 100).toFixed(0)}%  |  Leverantör: ${extracted.supplier}${R}`);

    if (routing.route !== 'auto') {
      console.log(`  ${YEL}⚠ Route är ${routing.route} — pipeline avbryts här (expects auto)${R}`);
      return { file, route: routing.route, passed: false, failures: [`Route ${routing.route} ≠ auto`] };
    }

    // ── Categorize ───────────────────────────────────────────────────────────
    const { categorize } = await import(
      join(ROOT, 'agents/categorizer/categorize.js')
    );
    const categorized = await categorize({
      supplier:     extracted.supplier,
      description:  extracted.description ?? '',
      amount:       extracted.amount,
      lineItems:    extracted.lineItems ?? [],
      potentialMixedCategories: extracted.potentialMixedCategories ?? false,
    });

    console.log(`  ${DIM}Kategori: ${categorized.category}  |  ${categorized.normalizedSupplier}${R}`);

    // ── Recommend ────────────────────────────────────────────────────────────
    const { recommend } = await import(
      join(ROOT, 'agents/recommender/recommend.js')
    );
    const recommendation = await recommend({
      customer,
      invoice: {
        amount:              extracted.amount,
        annualCost:          extracted.annualCost,
        recurringAmount:     extracted.recurringAmount,
        variableCharges:     extracted.variableCharges    ?? 0,
        seatCount:           extracted.seatCount          ?? null,
        connectionSpeedMbit: extracted.connectionSpeedMbit ?? null,
        licenseType:         extracted.licenseType        ?? null,
        billingCycleType:    extracted.billingCycleType   ?? null,
        pricePerSeatMonthly: extracted.pricePerSeatMonthly ?? null,
        saasProductFamily:   extracted.saasProductFamily  ?? null,
        saasIncludedFeatures: extracted.saasIncludedFeatures ?? null,
        description:         extracted.description        ?? null,
        lineItems:           extracted.lineItems          ?? [],
        potentialMixedCategories: extracted.potentialMixedCategories ?? false,
        // Kombinerade faktura-fält: ej nödvändiga för enkla test-cases
        mobileAddonMonthly:       0,
        broadbandAddonMonthly:    0,
        primaryComponentMonthly:  null,
        secondaryComponentMonthly: null,
        secondaryConnectionSpeedMbit: null,
        secondarySeatCount:       null,
        secondarySaving:          null,
        likeForLikeTarget:        null,
      },
      categorized,
    });

    const elapsedMs = Date.now() - t0;
    console.log(`  ${DIM}shouldSwitch=${recommendation.shouldSwitch}  requiresQuote=${recommendation.requiresQuote}  confidence=${recommendation.confidence}  (${elapsedMs} ms)${R}`);
    if (recommendation.clickRateAnalysis) {
      console.log(`  ${CYA}clickRateAnalysis: priceGapScore=${recommendation.clickRateAnalysis.priceGapScore}  bwRate=${recommendation.clickRateAnalysis.bwRate}  estimatedAnnualSavingsGross=${SEK(recommendation.clickRateAnalysis.estimatedAnnualSavingsGross)}${R}`);
    }
    if (recommendation.suggestedAnnualCost != null) {
      console.log(`  ${DIM}suggestedAnnualCost=${SEK(recommendation.suggestedAnnualCost)}  grossSaving=${SEK(recommendation.grossSaving)}  netSaving=${SEK(recommendation.netSaving)}${R}`);
    }

    // ── Lager C: Recommend-outputstruktur ────────────────────────────────────
    for (const key of REQUIRED_RECOMMEND_OUTPUT_KEYS) {
      if (!(key in recommendation)) {
        failures.push(`[Lager C] Nyckel saknas i recommend()-output: "${key}"`);
      }
    }

    // ── Lager B: Golden master-assertions ────────────────────────────────────
    console.log('');
    for (const check of checks) {
      let passed = false;
      let detail = '';
      try {
        passed = check.fn(categorized, recommendation, extracted);
        detail = check.detail ? check.detail(categorized, recommendation, extracted) : '';
      } catch (err) {
        passed = false;
        detail = err.message;
      }
      if (passed) {
        console.log(`  ${GRN}✓${R} ${check.label}`);
      } else {
        console.log(`  ${RED}✗${R} ${check.label}  ${DIM}(${detail})${R}`);
        failures.push(`${check.label}${detail ? ` — ${detail}` : ''}`);
      }
    }

    const layerCFails = failures.filter((f) => f.startsWith('[Lager C]'));
    if (layerCFails.length > 0) {
      console.log('');
      for (const f of layerCFails) {
        console.log(`  ${RED}✗${R} ${f}`);
      }
    }

    console.log('');
    if (failures.length === 0) {
      console.log(`  ${GRN}${BOLD}✓ PASS${R}  (${checks.length} kontroller + ${REQUIRED_RECOMMEND_OUTPUT_KEYS.length} struktur-checks)`);
    } else {
      console.log(`  ${RED}${BOLD}✗ FAIL${R}  (${failures.length} av ${checks.length + REQUIRED_RECOMMEND_OUTPUT_KEYS.length} kontroller misslyckades)`);
    }

    return { file, passed: failures.length === 0, failures, route: routing.route };

  } catch (err) {
    const elapsed = Date.now() - t0;
    console.log(`  ${RED}${BOLD}[FEL]${R}  ${err.message}  ${DIM}(${elapsed} ms)${R}`);
    if (process.env.VERBOSE) console.error(err);
    return { file, passed: false, failures: [err.message], route: 'error' };
  }
}

// ── Sammanfattning ────────────────────────────────────────────────────────────
function printSummary(layerAPass, pipelineResults) {
  const sep = '═'.repeat(70);
  console.log(`\n${sep}`);
  console.log(`${BOLD}SAMMANFATTNING${R}`);
  console.log(sep);

  const aIcon = layerAPass ? `${GRN}✓${R}` : `${RED}✗${R}`;
  console.log(`  ${aIcon} Lager A  Statisk struktur-guard`);

  const nonSkipped = pipelineResults.filter((r) => !r.skipped);
  for (const r of nonSkipped) {
    const icon = r.passed ? `${GRN}✓${R}` : `${RED}✗${R}`;
    console.log(`  ${icon} Lager B+C  ${r.file}`);
    if (!r.passed && r.failures?.length) {
      for (const f of r.failures)
        console.log(`      ${RED}→${R} ${f}`);
    }
  }

  const skipped = pipelineResults.filter((r) => r.skipped);
  if (skipped.length > 0) {
    console.log(`\n  ${YEL}Hoppade över (PDF saknas):${R}`);
    for (const r of pipelineResults.filter((r) => r.skipped))
      console.log(`    — ${r.file ?? '?'}`);
  }

  const anyFailed = !layerAPass || nonSkipped.some((r) => !r.passed);
  console.log('');
  if (!anyFailed) {
    console.log(`  ${GRN}${BOLD}ALLA TESTER PASSERADE${R}`);
  } else {
    console.log(`  ${RED}${BOLD}TESTER MISSLYCKADES${R}`);
  }
  console.log('');

  return anyFailed;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const filter = process.argv[2];

console.log(`\n${BOLD}Arvo Flow — Pipeline Integration Test${R}`);
console.log(`Kör extract → categorize → recommend mot nyckel-PDF:er med golden master...\n`);

// Filtrera test-cases om ett specifikt filnamn angetts
const casesToRun = filter
  ? PIPELINE_CASES.filter((c) => c.file === filter || c.file === filter + '.pdf')
  : PIPELINE_CASES;

if (filter && casesToRun.length === 0) {
  console.error(`Ingen pipeline-testcase definierad för "${filter}".`);
  console.error(`Definierade testfall: ${PIPELINE_CASES.map((c) => c.file).join(', ')}`);
  process.exit(1);
}

// Layer A körs alltid
const layerAPass = runLayerA();

// Layer B+C körs för varje testfall
const pipelineResults = [];
for (const tc of casesToRun) {
  const result = await runPipelineCase(tc);
  pipelineResults.push({ file: tc.file, ...result });
}

const anyFailed = printSummary(layerAPass, pipelineResults);
process.exit(anyFailed ? 1 : 0);
