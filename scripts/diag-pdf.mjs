// scripts/diag-pdf.mjs — kör den SKARPA pipelinen på en PDF och skriver ut route/reason/kategori/
// confidence. Diagnostik (ej kundyta) för att se EXAKT varför en faktura hamnar i granskningskön.
// Körs på GitHub Actions (har ANTHROPIC_API_KEY). Usage: node scripts/diag-pdf.mjs <pdf>
import { readFileSync } from 'node:fs';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { recommend } from '../agents/recommender/recommend.js';

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

let rec = null;
if (routing.route === 'auto' || routing.route === 'monitoring') {
  try {
    rec = await recommend({
      customer:    { industry: 'ovrigt', employees: 10 },
      categorized: { category: categorized.category, normalizedSupplier: categorized.normalizedSupplier, confidence: categorized.confidence, subType: categorized.subType },
      invoice:     extracted,
    });
  } catch (e) { rec = { ERROR: e.message }; }
}

console.log('=== DIAG-RESULTAT ===');
console.log(JSON.stringify({
  supplier:             extracted.supplier,
  billingPeriod:        extracted.billingPeriod,
  billingPeriodSource:  extracted.billingPeriodSource,
  billingPeriodAssumed: extracted.billingPeriodAssumed,
  confidenceScore:      extracted.confidenceScore,
  invoiceTotal:         extracted.invoiceTotal,
  lineSum:              (extracted.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0),
  annualCost:           extracted.annualCost,
  ROUTE:                routing.route,
  REASON:               routing.reason,
  category:             categorized.category,
  categoryConfidence:   categorized.confidence,
  normalizedSupplier:   categorized.normalizedSupplier,
  RECOMMENDATION: rec && !rec.ERROR ? {
    recommendationType: rec.recommendationType,
    requiresQuote:      rec.requiresQuote,
    revisionGate:       rec.revisionGate,
    shouldSwitch:       rec.shouldSwitch,
    suggestedSupplier:  rec.suggestedSupplier,
    suggestedAnnualCost: rec.suggestedAnnualCost,
    grossSaving:        rec.grossSaving,
    benchmarkSource:    rec.benchmark?.source,
    reasoning:          (rec.reasoning ?? '').slice(0, 200),
  } : rec,
}, null, 2));

