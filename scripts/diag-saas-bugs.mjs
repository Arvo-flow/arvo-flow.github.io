// scripts/diag-saas-bugs.mjs — kör den SKARPA recommend()-motorn live på saas-fakturor och dumpar
// HELA bytesrekommendationen: suggestedSupplier (byte-MÅLET) + full reasoning + shouldSwitch + tal.
// Syfte: bevisa MS↔Google-motsägelsen mot riktiga motorn (grundaren såg byte MS→Google och vice versa).
// Plus: kör supplierDiagScore på utfallet för att visa "alla rätt-prissatta = 82". Kör i Actions.
// Usage: node scripts/diag-saas-bugs.mjs <pdf...>
import { readFileSync } from 'node:fs';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { recommend } from '../agents/recommender/recommend.js';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { supplierDiagScore } from '../src/lib/holdings.js';

const pdfs = process.argv.slice(2);
if (!pdfs.length) { console.error('usage: node scripts/diag-saas-bugs.mjs <pdf...>'); process.exit(1); }

for (const path of pdfs) {
  console.log(`\n═══════════ ${path.split('/').pop()} ═══════════`);
  try {
    const extracted = await extractInvoice({ pdfBytes: readFileSync(path) });
    const routing = routeExtraction(extracted);
    const categorized = await categorize({
      supplier: extracted.supplier ?? '',
      description: (extracted.lineItems ?? []).map((l) => l.description).join(', '),
      amount: extracted.amount ?? 0,
    });
    const metrics = computeInvoiceMetrics(extracted.lineItems, categorized.category, extracted.potentialMixedCategories ?? false);
    const rec = await recommend({
      customer: { industry: 'ovrigt', employees: 10 },
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
    // Vad kontorets Arvo Score skulle bli för denna faktura (bug #2 — "alla 82"):
    const scoreInput = {
      annual_cost: extracted.annualCost, should_switch: rec.shouldSwitch,
      net_saving: rec.netSaving, gross_saving: rec.grossSaving,
    };
    console.log(JSON.stringify({
      leverantör: extracted.supplier, kategori: categorized.category, route: routing.route,
      årskostnad: extracted.annualCost,
      BYTE: {
        shouldSwitch: rec.shouldSwitch, recommendationType: rec.recommendationType,
        suggestedSupplier: rec.suggestedSupplier,        // ← byte-MÅLET
        suggestedAnnualCost: rec.suggestedAnnualCost, netSaving: rec.netSaving,
      },
      ARVO_SCORE: supplierDiagScore(scoreInput),         // ← bug #2: 82 för icke-byte
      reasoning: rec.reasoning,                          // ← full text (ingen slice)
    }, null, 2));
  } catch (e) {
    console.log('FEL:', e.message);
  }
}
console.log('\nKLART.');
