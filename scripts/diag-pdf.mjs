// scripts/diag-pdf.mjs — kör den SKARPA pipelinen på en PDF och skriver ut route/reason/kategori/
// confidence. Diagnostik (ej kundyta) för att se EXAKT varför en faktura hamnar i granskningskön.
// Körs på GitHub Actions (har ANTHROPIC_API_KEY). Usage: node scripts/diag-pdf.mjs <pdf>
import { readFileSync } from 'node:fs';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';

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

console.log('=== DIAG-RESULTAT ===');
console.log(JSON.stringify({
  supplier:             extracted.supplier,
  billingPeriod:        extracted.billingPeriod,
  billingPeriodSource:  extracted.billingPeriodSource,
  billingPeriodAssumed: extracted.billingPeriodAssumed,
  confidenceScore:      extracted.confidenceScore,
  confidenceNotes:      extracted.confidenceNotes,
  invoiceTotal:         extracted.invoiceTotal,
  lineSum:              (extracted.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0),
  annualCost:           extracted.annualCost,
  outOfScope:           extracted.outOfScope,
  outOfScopeReason:     extracted.outOfScopeReason,
  lineItems:            (extracted.lineItems ?? []).map((l) => ({ d: l.description, a: l.amount, t: l.type })),
  ROUTE:                routing.route,
  REASON:               routing.reason,
  category:             categorized.category,
  categoryConfidence:   categorized.confidence,
  normalizedSupplier:   categorized.normalizedSupplier,
}, null, 2));
