// scripts/full-pipeline-test.mjs
// Kör hela pipelinen (extract → categorize → recommend) lokalt för alla PDF:er
// — exakt samma logik som API-endpointen men utan HTTP, KV, e-post och saving-gate.

import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';

import * as dotenv from 'dotenv';
dotenv.config();

import { extractInvoice, routeExtraction, CONFIDENCE_THRESHOLD } from '../agents/test-invoice/extract.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { recommend } from '../agents/recommender/recommend.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { getSekRate, FALLBACK_RATE_USD_SEK, getEurSekRate, FALLBACK_RATE_EUR_SEK } from '../agents/recommender/pricing.js';
import { computeElRecommendation } from '../lib/el-recommendation.js';
import { checkSupplierFingerprint } from '../lib/supplier-fingerprints.js';
import { verifySanity } from '../lib/sanity-verifier.js';

const PDF_DIR   = join(new URL('.', import.meta.url).pathname, '../test-pdfs');
const TARGET    = process.argv[2]; // Valfri: kör bara en specifik fil
const INDUSTRY  = process.env.TEST_INDUSTRY  ?? 'it-tech';
const EMPLOYEES = Number(process.env.TEST_EMPLOYEES ?? 25);

// ── Förbjudna fraser i reasoning ────────────────────────────────────────────
const BANNED = [
  { re: /\bp25\b/i,             label: '"p25"' },
  { re: /under medianen/i,      label: '"under medianen"' },
  { re: /över medianen/i,       label: '"över medianen"' },
  { re: /\bmedianen\b/i,        label: '"medianen"' },
  { re: /marknadsbottnen/i,     label: '"marknadsbottnen"' },
  { re: /25:e percentilen/i,    label: '"25:e percentilen"' },
  { re: /bevaka vid nästa förnyelse/i, label: '"bevaka vid nästa förnyelse"' },
  { re: /referenspris/i,        label: '"referenspris"' },
  { re: /Arvo-volympris/i,      label: '"Arvo-volympris"' },
];

// Färgkoder
const G = (s) => `\x1b[32m${s}\x1b[0m`;
const R = (s) => `\x1b[31m${s}\x1b[0m`;
const Y = (s) => `\x1b[33m${s}\x1b[0m`;
const C = (s) => `\x1b[36m${s}\x1b[0m`;
const B = (s) => `\x1b[1m${s}\x1b[0m`;
const D = (s) => `\x1b[2m${s}\x1b[0m`;
const W = (s) => `\x1b[90m${s}\x1b[0m`;

const SEP = '─'.repeat(70);

function routeLabel(route) {
  if (route === 'auto')         return G(B('[AUTO]'));
  if (route === 'review_queue') return Y(B('[REVIEW]'));
  if (route === 'monitoring')   return C(B('[MONITORING]'));
  if (route === 'unsupported')  return W(B('[UNSUPPORTED]'));
  return route;
}

function checkReasoning(text) {
  if (!text || typeof text !== 'string') return [];
  return BANNED.filter(b => b.re.test(text)).map(b => b.label);
}

async function runPipeline(pdfPath) {
  const filename = basename(pdfPath);
  const pdfBytes = readFileSync(pdfPath);

  const t0 = Date.now();
  const extracted = await extractInvoice({ pdfBytes });
  const extractMs = Date.now() - t0;

  // Валютаконверtering (spegel av API-logiken)
  if (extracted.currency === 'EUR') {
    const rate = FALLBACK_RATE_EUR_SEK;
    const cvt = (v) => v != null ? Math.round(v * rate) : null;
    extracted.currency = 'SEK'; extracted.fxRate = rate;
    extracted.amount = cvt(extracted.amount); extracted.recurringAmount = cvt(extracted.recurringAmount);
    extracted.variableCharges = cvt(extracted.variableCharges); extracted.oneTimeFees = cvt(extracted.oneTimeFees);
    extracted.annualCost = cvt(extracted.annualCost);
    extracted.pricePerSeatMonthly = extracted.pricePerSeatMonthly != null ? Math.round(extracted.pricePerSeatMonthly * rate) : null;
    extracted.lineItems = (extracted.lineItems ?? []).map(li => ({ ...li, amount: li.amount != null ? Math.round(li.amount * rate) : null }));
  } else if (extracted.currency === 'USD') {
    const rate = FALLBACK_RATE_USD_SEK;
    const cvt = (v) => v != null ? Math.round(v * rate) : null;
    extracted.currency = 'SEK'; extracted.fxRate = rate;
    extracted.amount = cvt(extracted.amount); extracted.recurringAmount = cvt(extracted.recurringAmount);
    extracted.variableCharges = cvt(extracted.variableCharges); extracted.oneTimeFees = cvt(extracted.oneTimeFees);
    extracted.annualCost = cvt(extracted.annualCost);
    extracted.pricePerSeatMonthly = extracted.pricePerSeatMonthly != null ? Math.round(extracted.pricePerSeatMonthly * rate) : null;
    extracted.lineItems = (extracted.lineItems ?? []).map(li => ({ ...li, amount: li.amount != null ? Math.round(li.amount * rate) : null, unitPrice: li.unitPrice != null ? Math.round(li.unitPrice * rate) : null }));
  }

  // Pre-route fingerprint boost
  {
    const fp = checkSupplierFingerprint(null, extracted.supplier, null);
    if (fp.matched && (extracted.confidenceScore ?? 0) >= 0.70) {
      extracted.confidenceScore = Math.max(extracted.confidenceScore, CONFIDENCE_THRESHOLD);
    }
  }

  const routing = routeExtraction(extracted);

  if (routing.route === 'unsupported') {
    return {
      filename, route: 'unsupported', category: null, supplier: extracted.supplier,
      shouldSwitch: false, reasoning: '', issues: [], warnings: [], extractMs, totalMs: Date.now() - t0,
    };
  }

  if (routing.route === 'review_queue') {
    return {
      filename, route: 'review_queue', category: null, supplier: extracted.supplier,
      confidence: extracted.confidenceScore, routeReason: routing.reason,
      shouldSwitch: false, reasoning: '', issues: [], warnings: [], extractMs, totalMs: Date.now() - t0,
    };
  }

  const t1 = Date.now();
  const categorized = await categorize({
    supplier:     extracted.supplier,
    amount:       extracted.amount,
    date:         extracted.date,
    account:      extracted.account,
    description:  extracted.description,
    recurring:    extracted.recurring,
  });
  const categorizeMs = Date.now() - t1;

  // Fingerprint check
  {
    const fp = checkSupplierFingerprint(categorized.normalizedSupplier, extracted.supplier, categorized.category);
    if (fp.matched && !fp.categoryOk) {
      return {
        filename, route: 'review_queue', category: categorized.category, supplier: extracted.supplier,
        routeReason: `fingerprint_mismatch — AI valde '${categorized.category}', förväntat [${fp.expectedCategories.join(', ')}]`,
        shouldSwitch: false, reasoning: '', extractMs, categorizeMs, totalMs: Date.now() - t0,
        issues: [`FINGERPRINT MISMATCH: ${fp.key} → AI='${categorized.category}' expected=[${fp.expectedCategories.join(', ')}]`],
        warnings: [],
      };
    }
    if (fp.matched && fp.categoryOk) {
      categorized.confidence = Math.max(categorized.confidence ?? 0, 0.95);
    }
  }

  const metrics = computeInvoiceMetrics(
    extracted.lineItems, categorized.category, extracted.potentialMixedCategories ?? false
  );
  const secondarySaving = computeSecondarySaving({
    metrics, category: categorized.category,
    potentialMixedCategories: extracted.potentialMixedCategories ?? false,
    industry: INDUSTRY, employees: EMPLOYEES,
  });

  const catDef = BRANCHINDEX[categorized.category];

  // Avtalslås-check (monitoring)
  const _today = new Date();
  const _periodEnd = extracted.servicePeriodEnd ? new Date(extracted.servicePeriodEnd) : null;
  const _hasActivePeriod = _periodEnd && _periodEnd > _today;
  const _lockDeadline = (() => {
    if (!extracted.servicePeriodStart || extracted.cancellationNoticeDays == null) return null;
    const d = new Date(extracted.servicePeriodStart);
    d.setDate(d.getDate() - extracted.cancellationNoticeDays);
    return d;
  })();
  const _MS_180 = 180 * 24 * 60 * 60 * 1000;
  const _isPastLock = _lockDeadline
    ? _today > _lockDeadline
    : extracted.cancellationNoticeDays != null && _hasActivePeriod
      ? true
      : _hasActivePeriod && _periodEnd && (_periodEnd - _today) > _MS_180;

  if (!categorized.licensePending && categorized.category !== 'el' && _hasActivePeriod && _isPastLock) {
    return {
      filename, route: 'monitoring', category: categorized.category, supplier: extracted.supplier,
      normalizedSupplier: categorized.normalizedSupplier, shouldSwitch: false, reasoning: '',
      issues: [], warnings: [`Avtalslås aktivt — servicePeriodEnd: ${extracted.servicePeriodEnd}`],
      extractMs, categorizeMs, totalMs: Date.now() - t0,
    };
  }

  if (catDef?.requiresVolumeData) {
    return {
      filename, route: 'review_queue', category: categorized.category, supplier: extracted.supplier,
      routeReason: 'volume_data_required', shouldSwitch: false, reasoning: '',
      issues: [], warnings: [],
      extractMs, categorizeMs, totalMs: Date.now() - t0,
    };
  }

  if (!catDef) {
    return {
      filename, route: 'review_queue', category: categorized.category, supplier: extracted.supplier,
      routeReason: `no_benchmark (kategori '${categorized.category}' saknas i branschindex)`,
      shouldSwitch: false, reasoning: '',
      issues: [], warnings: [`Ingen benchmark för kategori '${categorized.category}' — avsiktligt, manuell hantering`],
      extractMs, categorizeMs, totalMs: Date.now() - t0,
    };
  }

  // El-specifik logik
  if (categorized.category === 'el') {
    if (extracted.elInvoiceType === 'natavgift') {
      return {
        filename, route: 'unsupported', category: 'el', supplier: extracted.supplier,
        shouldSwitch: false, reasoning: 'Nätfaktura — ej förhandlingsbar',
        issues: [], warnings: [], extractMs, categorizeMs, totalMs: Date.now() - t0,
      };
    }
    if (extracted.elContractType === 'fixed' && extracted.servicePeriodEnd) {
      const elEnd = new Date(extracted.servicePeriodEnd);
      if (elEnd > _today) {
        return {
          filename, route: 'monitoring', category: 'el', supplier: extracted.supplier,
          shouldSwitch: false, reasoning: 'Fastprisavtal — avvaktar förnyelse',
          issues: [], warnings: [`Fastprisavtal låst t.o.m. ${extracted.servicePeriodEnd}`],
          extractMs, categorizeMs, totalMs: Date.now() - t0,
        };
      }
    }
    const elRec = computeElRecommendation(extracted, INDUSTRY);
    if (!elRec) {
      return {
        filename, route: 'review_queue', category: 'el', supplier: extracted.supplier,
        routeReason: 'el_data_missing', shouldSwitch: false, reasoning: '',
        issues: ['El-data otillräcklig (kWh/omrade saknas)'], warnings: [],
        extractMs, categorizeMs, totalMs: Date.now() - t0,
      };
    }
    const reasoningIssues = checkReasoning(elRec.reasoning);
    return {
      filename, route: 'auto', category: 'el', supplier: extracted.supplier,
      normalizedSupplier: categorized.normalizedSupplier,
      shouldSwitch: elRec.shouldSwitch,
      grossSaving: elRec.grossSaving, netSaving: elRec.netSaving,
      reasoning: elRec.reasoning,
      issues: reasoningIssues.map(l => `Förbjuden fras i reasoning: ${l}`), warnings: [],
      extractMs, categorizeMs, totalMs: Date.now() - t0,
    };
  }

  // LFL-target för saas-productivity
  let _lflTarget = null;
  if (categorized.category === 'saas-productivity') {
    const _TIER_RE = [
      { key: 'e5',                re: /\bE5\b/i },
      { key: 'e3',                re: /\bE3\b/i },
      { key: 'business-premium',  re: /business[\s-]premium/i },
      { key: 'business-standard', re: /business[\s-]standard/i },
      { key: 'business-basic',    re: /business[\s-]basic/i },
    ];
    const _tierBm    = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks ?? {};
    const _lflLines  = (extracted.lineItems ?? []).filter(l => l.type === 'recurring_subscription');
    const _lflPeriod = _lflLines.reduce((s, l) => s + (l.amount ?? 0), 0);
    const _lflMult   = _lflPeriod > 0 ? extracted.annualCost / _lflPeriod : 12;
    let _lflSuggested = 0, _lflOk = true, _lflDomKey = null, _lflDomAmt = 0;
    for (const item of _lflLines) {
      const match = _TIER_RE.find(p => p.re.test(item.description ?? ''));
      if (match && _tierBm[match.key]) {
        const qty = item.quantity;
        if (qty == null) { _lflOk = false; break; }
        const bench = _tierBm[match.key].arvoAnnual ?? _tierBm[match.key].msrpAnnual;
        _lflSuggested += Math.round(bench * qty * 12);
        if ((item.amount ?? 0) > _lflDomAmt) { _lflDomAmt = item.amount; _lflDomKey = match.key; }
      } else {
        _lflSuggested += Math.round((item.amount ?? 0) * _lflMult);
      }
    }
    if (_lflOk && _lflSuggested > 0) {
      _lflTarget = { suggestedAnnualCost: _lflSuggested, dominantTierKey: _lflDomKey };
    }
  }

  const t2 = Date.now();
  const recommendation = await recommend({
    customer: { industry: INDUSTRY, employees: EMPLOYEES, revenue: null },
    invoice: {
      amount:               extracted.amount,
      annualCost:           extracted.annualCost,
      recurringAmount:      extracted.recurringAmount,
      variableCharges:      extracted.variableCharges,
      seatCount:            extracted.seatCount ?? null,
      mobileAddonMonthly:          metrics.mobileAddonMonthly,
      broadbandAddonMonthly:       metrics.broadbandAddonMonthly,
      primaryComponentMonthly:     metrics.primaryComponentMonthly,
      secondaryComponentMonthly:   metrics.secondaryComponentMonthly,
      secondaryConnectionSpeedMbit: metrics.secondaryConnectionSpeedMbit,
      secondarySeatCount:          metrics.secondarySeatCount,
      secondarySaving,
      potentialMixedCategories:    extracted.potentialMixedCategories ?? false,
      connectionSpeedMbit: extracted.connectionSpeedMbit ?? null,
      licenseType:         extracted.licenseType ?? null,
      billingCycleType:    extracted.billingCycleType ?? null,
      pricePerSeatMonthly: extracted.pricePerSeatMonthly ?? null,
      saasProductFamily:    extracted.saasProductFamily ?? null,
      saasIncludedFeatures: extracted.saasIncludedFeatures ?? null,
      description:          extracted.description ?? null,
      lineItems:            extracted.lineItems ?? null,
      likeForLikeTarget:    _lflTarget,
    },
    categorized,
  });
  const recommendMs = Date.now() - t2;

  // Spegla API:ts secondary-override och finansiella guards
  if (!recommendation.shouldSwitch && (secondarySaving?.grossSaving ?? 0) > 0) {
    recommendation.shouldSwitch        = true;
    recommendation.savingPerYear       = 0;
    recommendation.suggestedAnnualCost = Math.round((metrics.primaryComponentMonthly ?? 0) * 12);
  }
  if (recommendation.shouldSwitch) {
    const _annCost  = extracted.annualCost ?? 0;
    const _suggCost = recommendation.suggestedAnnualCost ?? 0;
    if (_annCost > 0 && _suggCost > 0 && _suggCost >= _annCost) {
      recommendation.shouldSwitch        = false;
      recommendation.suggestedAnnualCost = null;
      recommendation.savingPerYear       = 0;
    }
  }
  if (recommendation.shouldSwitch) {
    const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const _secGross  = secondarySaving?.grossSaving ?? 0;
    if (_primGross + _secGross <= 0) recommendation.shouldSwitch = false;
  }

  // Haiku sanity check (Lager 3) — exakt som API: sanity fail → review_queue
  if (recommendation.shouldSwitch && (extracted.annualCost ?? 0) > 0) {
    const _savingPct = Math.round(
      ((recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0) / extracted.annualCost) * 100
    );
    try {
      const sanity = await verifySanity({
        category:   categorized.category,
        annualCost: extracted.annualCost,
        savingPct:  _savingPct,
        supplier:   categorized.normalizedSupplier ?? extracted.supplier,
      });
      if (!sanity.pass) {
        return {
          filename, route: 'review_queue', category: categorized.category, supplier: extracted.supplier,
          normalizedSupplier: categorized.normalizedSupplier,
          routeReason: `sanity_check_failed (method=${sanity.method}): ${sanity.reason}`,
          shouldSwitch: false, reasoning: recommendation.reasoning,
          issues: [], warnings: [`Sanity check (Haiku) blockerade rekommendationen — besparingsprocent ansågs orimlig`],
          extractMs, categorizeMs, recommendMs, totalMs: Date.now() - t0,
        };
      }
    } catch { /* fail-open */ }
  }

  const warnings = [];

  // Beräkna grossSaving (primär + sekundär) exakt som API:t gör
  const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
  const secondaryGross = secondarySaving?.grossSaving ?? 0;
  const grossSaving    = primaryGross + secondaryGross;
  const arvoFee        = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
  const netSaving      = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

  const reasoningIssues = checkReasoning(recommendation.reasoning);

  // Sekretesscheck för Kategori 2: reasoning-texten får INTE namnge konkurrenter
  const REAL_PRICE_CATS = new Set(['mjukvara-saas', 'mobil', 'saas-productivity']);
  const isRealPrice = REAL_PRICE_CATS.has(categorized.category);
  const secrecyIssues = [];
  if (!isRealPrice && recommendation.reasoning) {
    // Kända alternativa varumärken som inte ska namnges för Kat 2
    const KAT2_BRANDS = [/\btele2\b/i, /\btelenor\b/i, /\btre\b/i, /\bcomviq\b/i, /\bbahnhof\b/i, /\bip.?only\b/i, /\bsveakom\b/i, /\bricoh\b/i, /\bkonica\b/i, /\bxerox\b/i, /\bcanon\b/i];
    const namedBrand = KAT2_BRANDS.find(re => re.test(recommendation.reasoning));
    if (namedBrand) {
      secrecyIssues.push(`SEKRETESSBROTT: Kategori-2-reasoning namnger konkurrent (${namedBrand})`);
    }
  }

  // Konsistenscheck: shouldSwitch=true men ingen positiv nettobesparing
  const sanityIssues = [];
  if (recommendation.shouldSwitch && netSaving <= 0) {
    sanityIssues.push(`shouldSwitch=true men netSaving=${netSaving} kr`);
  }

  return {
    filename, route: 'auto',
    category:           categorized.category,
    supplier:           extracted.supplier,
    normalizedSupplier: categorized.normalizedSupplier,
    confidence:         extracted.confidenceScore,
    annualCost:         extracted.annualCost,
    shouldSwitch:       recommendation.shouldSwitch,
    suggestedSupplier:  recommendation.suggestedSupplier,
    grossSaving, netSaving,
    reasoning:          recommendation.reasoning,
    issues:    [...reasoningIssues.map(l => `Förbjuden fras: ${l}`), ...secrecyIssues, ...sanityIssues],
    warnings,
    extractMs, categorizeMs, recommendMs, totalMs: Date.now() - t0,
  };
}

async function main() {
  console.log(B('\nArvo Flow — Full Pipeline Test (extract → categorize → recommend)\n'));

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(R('ANTHROPIC_API_KEY saknas — avbryter.'));
    process.exit(1);
  }

  let files = readdirSync(PDF_DIR)
    .filter(f => f.endsWith('.pdf'))
    .sort();

  if (TARGET) {
    files = files.filter(f => f.toLowerCase().includes(TARGET.toLowerCase()));
    if (!files.length) {
      console.error(R(`Ingen PDF matchar '${TARGET}'.`));
      process.exit(1);
    }
  }

  console.log(`Testar ${files.length} faktura${files.length !== 1 ? 'r' : ''} (industry=${INDUSTRY}, employees=${EMPLOYEES})\n`);

  const results = [];
  let totalIssues = 0;

  for (const f of files) {
    const pdfPath = join(PDF_DIR, f);
    process.stdout.write(B(f) + ' … ');
    let result;
    try {
      result = await runPipeline(pdfPath);
    } catch (err) {
      result = { filename: f, route: 'error', issues: [`Pipeline kraschade: ${err.message}`], warnings: [], totalMs: 0 };
    }
    results.push(result);

    const hasIssues = result.issues?.length > 0;
    totalIssues += (result.issues?.length ?? 0);

    // Skriv ut block
    console.log();
    console.log(SEP);
    const label = result.route === 'error' ? R(B('[FEL]')) : routeLabel(result.route);
    console.log(`${B(f)}  ${label}  ${D(`(${result.totalMs} ms)`)}`);
    console.log(SEP);

    if (result.category)           console.log(`  Kategori    : ${B(result.category)}${result.normalizedSupplier ? ` (${result.normalizedSupplier})` : ''}`);
    if (result.supplier)           console.log(`  Leverantör  : ${result.supplier}`);
    if (result.confidence != null) console.log(`  Confidence  : ${Math.round(result.confidence * 100)} %`);
    if (result.annualCost != null) console.log(`  Årkostnad   : ${result.annualCost.toLocaleString('sv-SE')} kr`);
    if (result.route === 'auto') {
      const sw = result.shouldSwitch ? G('Ja') : W('Nej');
      console.log(`  Byt?        : ${sw}`);
      if (result.shouldSwitch) {
        if (result.suggestedSupplier) console.log(`  Förslag     : ${result.suggestedSupplier}`);
        if (result.grossSaving)       console.log(`  Besparing   : ${result.grossSaving.toLocaleString('sv-SE')} kr brutto`);
        if (result.netSaving)         console.log(`  Netto       : ${result.netSaving.toLocaleString('sv-SE')} kr/år`);
      }
      if (result.reasoning) {
        const shortReasoning = result.reasoning.length > 220
          ? result.reasoning.slice(0, 220).trimEnd() + '…'
          : result.reasoning;
        console.log(`  Reasoning   : ${D(shortReasoning)}`);
      }
    }
    if (result.routeReason)        console.log(`  Route-orsak : ${Y(result.routeReason)}`);

    for (const w of (result.warnings ?? [])) console.log(`  ${Y('⚠')} ${w}`);
    for (const i of (result.issues ?? []))   console.log(`  ${R('✗')} ${R(i)}`);
    if (!hasIssues && result.route !== 'error') console.log(`  ${G('✓ Inga problem hittades')}`);
  }

  // ── SAMMANFATTNING ──────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(70));
  console.log(B('SAMMANFATTNING'));
  console.log('═'.repeat(70));

  const byRoute = {};
  for (const r of results) byRoute[r.route] = (byRoute[r.route] ?? 0) + 1;
  for (const [route, n] of Object.entries(byRoute)) {
    console.log(`  ${routeLabel(route).padEnd(30)} : ${n}`);
  }

  const byCat = {};
  for (const r of results.filter(r => r.category)) {
    byCat[r.category] = (byCat[r.category] ?? 0) + 1;
  }
  if (Object.keys(byCat).length) {
    console.log('\n  Kategorier:');
    for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${cat.padEnd(24)} : ${n}`);
    }
  }

  const withIssues = results.filter(r => (r.issues?.length ?? 0) > 0);
  console.log();
  if (withIssues.length === 0) {
    console.log(G(B(`✓ Inga problem hittades i ${results.length} faktura${results.length !== 1 ? 'r' : ''}!`)));
  } else {
    console.log(R(B(`✗ ${totalIssues} problem i ${withIssues.length} av ${results.length} fakturor:`)));
    for (const r of withIssues) {
      console.log(`  ${R('→')} ${r.filename}`);
      for (const i of r.issues) console.log(`      ${R('•')} ${i}`);
    }
  }
  console.log();

  process.exit(withIssues.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(R(`Oväntat fel: ${err.message}`));
  process.exit(1);
});
