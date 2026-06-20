// scripts/diag-pdf.mjs — kör den SKARPA pipelinen på en PDF och skriver ut route/reason/kategori/
// confidence. Diagnostik (ej kundyta) för att se EXAKT varför en faktura hamnar i granskningskön.
// Körs på GitHub Actions (har ANTHROPIC_API_KEY). Usage: node scripts/diag-pdf.mjs <pdf>
import { readFileSync } from 'node:fs';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { recommend } from '../agents/recommender/recommend.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';

const path = process.argv[2];
if (!path) { console.error('usage: node scripts/diag-pdf.mjs <pdf>'); process.exit(1); }

const pdfBytes = readFileSync(path);
const extracted = await extractInvoice({ pdfBytes });
const routing = routeExtraction(extracted);

let categorized = { category: '(skip — unsupported)', confidence: null };
if (routing.route !== 'unsupported') {
  categorized = await categorize({
    supplier:    extracted.supplier ?? '',
    description: (extracted.lineItems ?? []).map((l) => l.description).join(', '),
    amount:      extracted.amount ?? 0,
  });
}

let rec = null, metrics = null;
if (routing.route === 'auto' || routing.route === 'monitoring') {
  metrics = computeInvoiceMetrics(extracted.lineItems, categorized.category, extracted.potentialMixedCategories ?? false);
  try {
    rec = await recommend({
      customer:    { industry: 'ovrigt', employees: 10 },
      categorized: { category: categorized.category, normalizedSupplier: categorized.normalizedSupplier, confidence: categorized.confidence, subType: categorized.subType },
      invoice: {
        amount: extracted.amount, annualCost: extracted.annualCost, recurringAmount: extracted.recurringAmount,
        variableCharges: extracted.variableCharges, seatCount: extracted.seatCount ?? null,
        mobileAddonMonthly: metrics.mobileAddonMonthly, broadbandAddonMonthly: metrics.broadbandAddonMonthly,
        primaryComponentMonthly: metrics.primaryComponentMonthly, secondaryComponentMonthly: metrics.secondaryComponentMonthly,
        potentialMixedCategories: extracted.potentialMixedCategories ?? false,
        connectionSpeedMbit: extracted.connectionSpeedMbit ?? null, lineItems: extracted.lineItems ?? null,
      },
    });
  } catch (e) { rec = { ERROR: e.message }; }
}

console.log('=== DIAG-RESULTAT (full pipeline m. metrics) ===');
console.log(JSON.stringify({
  ROUTE: routing.route, category: categorized.category, categoryConfidence: categorized.confidence,
  annualCost: extracted.annualCost,
  broadbandAddonMonthly: metrics?.broadbandAddonMonthly,
  RECOMMENDATION: rec && !rec.ERROR ? {
    recommendationType: rec.recommendationType, shouldSwitch: rec.shouldSwitch,
    suggestedAnnualCost: rec.suggestedAnnualCost, savingPerYear: rec.savingPerYear,
    grossSaving: rec.grossSaving, netSaving: rec.netSaving, nonPrimaryAnnual: rec.nonPrimaryAnnual,
    benchmarkSource: rec.benchmark?.source, reasoning: (rec.reasoning ?? '').slice(0, 240),
  } : rec,
}, null, 2));


