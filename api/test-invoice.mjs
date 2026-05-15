// api/test-invoice.mjs
// Vercel Serverless Function — kör hela pipelinen extract → categorize → recommend.
// Frontend POSTar JSON { pdfBase64, industry, employees, revenue? }.
//
// Vercel-konfig (vercel.json): maxDuration: 60. På Hobby-plan är gränsen 10s
// vilket sannolikt inte räcker — Pro krävs för publik exponering.

import { extractInvoice, ExtractorError } from '../agents/test-invoice/extract.js';
import { categorize, CategorizerError } from '../agents/categorizer/categorize.js';
import { recommend, RecommenderError } from '../agents/recommender/recommend.js';
import { storeDatapoint } from '../lib/benchmark.js';

export const config = {
  maxDuration: 60,
};

const ALLOWED_INDUSTRIES = [
  'ehandel', 'tillverkning', 'it-tech', 'bygg',
  'hotell', 'konsult', 'transport', 'vard', 'ovrigt',
];
// 3 MB ger ~4 MB JSON-body efter base64 — håller sig under Vercel Hobbys 4.5 MB.
// Höj till 5 MB om du är på Pro och vill ta större fakturor.
const MAX_PDF_SIZE = 3 * 1024 * 1024;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Endast POST stöds' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return send(res, 500, {
      error: 'Servern är inte konfigurerad — ANTHROPIC_API_KEY saknas',
    });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON i request body' });
  }

  const { pdfBase64, industry, employees, revenue } = body;

  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return send(res, 400, { error: 'pdfBase64 är obligatoriskt' });
  }
  if (!ALLOWED_INDUSTRIES.includes(industry)) {
    return send(res, 400, {
      error: `Ogiltig industry. Tillåtna: ${ALLOWED_INDUSTRIES.join(', ')}`,
    });
  }
  const employeesNum = Number(employees);
  if (!Number.isFinite(employeesNum) || employeesNum < 1 || employeesNum > 5000) {
    return send(res, 400, { error: 'employees måste vara 1–5000' });
  }
  const revenueNum = revenue == null || revenue === '' ? null : Number(revenue);
  if (revenueNum != null && (!Number.isFinite(revenueNum) || revenueNum < 0)) {
    return send(res, 400, { error: 'revenue måste vara ett positivt tal eller null' });
  }

  let pdfBytes;
  try {
    pdfBytes = Buffer.from(pdfBase64, 'base64');
  } catch {
    return send(res, 400, { error: 'Kunde inte avkoda pdfBase64' });
  }
  if (pdfBytes.length === 0) {
    return send(res, 400, { error: 'PDF-bytes är tomma' });
  }
  if (pdfBytes.length > MAX_PDF_SIZE) {
    return send(res, 413, {
      error: `PDF är för stor (${(pdfBytes.length / 1024 / 1024).toFixed(1)} MB). Max: 3 MB`,
    });
  }
  if (pdfBytes.subarray(0, 4).toString() !== '%PDF') {
    return send(res, 400, {
      error: 'Filen verkar inte vara en PDF (saknar %PDF-header)',
    });
  }

  const timing = {};
  try {
    const t0 = Date.now();
    const extracted = await extractInvoice({ pdfBytes });
    timing.extractMs = Date.now() - t0;
    console.log('[test-invoice] extracted:', JSON.stringify({
      supplier: extracted.supplier,
      description: extracted.description,
      account: extracted.account,
      amount: extracted.amount,
    }));

    const t1 = Date.now();
    const categorized = await categorize({
      supplier: extracted.supplier,
      amount: extracted.amount,
      date: extracted.date,
      account: extracted.account,
      description: extracted.description,
      recurring: extracted.recurring,
    });
    timing.categorizeMs = Date.now() - t1;
    console.log('[test-invoice] categorized:', JSON.stringify({
      category: categorized.category,
      confidence: categorized.confidence,
      normalizedSupplier: categorized.normalizedSupplier,
    }));

    const t2 = Date.now();
    const recommendation = await recommend({
      customer: { industry, employees: employeesNum, revenue: revenueNum },
      invoice: { amount: extracted.amount, annualCost: extracted.annualCost, seatCount: extracted.seatCount ?? null },
      categorized,
    });
    timing.recommendMs = Date.now() - t2;
    timing.totalMs = Date.now() - t0;

    // Fire-and-forget — lagrar anonymiserad datapunkt för branschindex.
    // Felet får aldrig blockera svaret till kunden.
    storeDatapoint({
      category: categorized.category,
      supplier: categorized.normalizedSupplier,
      annualCost: extracted.annualCost ?? extracted.amount,
      industry,
      employees: employeesNum,
    }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

    // Räkna netto/fee enligt samma modell som resten av appen
    const grossSaving = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const arvoFee = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
    const netSaving = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

    return send(res, 200, {
      ok: true,
      extracted: {
        supplier: extracted.supplier,
        amount: extracted.amount,
        recurringAmount: extracted.recurringAmount ?? extracted.amount,
        variableCharges: extracted.variableCharges ?? 0,
        annualCost: extracted.annualCost,
        date: extracted.date,
        description: extracted.description,
        recurring: extracted.recurring,
        confidence: extracted.confidence,
        notes: extracted.notes,
        seatCount: extracted.seatCount ?? null,
      },
      categorized: {
        category: categorized.category,
        subType: categorized.subType,
        normalizedSupplier: categorized.normalizedSupplier,
        confidence: categorized.confidence,
        reasoning: categorized.reasoning,
        licensePending: categorized.licensePending,
      },
      recommendation: {
        shouldSwitch: recommendation.shouldSwitch,
        suggestedSupplier: recommendation.suggestedSupplier ?? null,
        suggestedAnnualCost: recommendation.suggestedAnnualCost ?? null,
        grossSaving,
        arvoFee,
        netSaving,
        confidence: recommendation.confidence,
        reasoning: recommendation.reasoning,
        switchSteps: recommendation.switchSteps ?? [],
        licenseOverage: recommendation.licenseOverage ?? null,
        overageSavings: recommendation.overageSavings ?? null,
      },
      timing,
    });
  } catch (err) {
    const isKnown =
      err instanceof ExtractorError
      || err instanceof CategorizerError
      || err instanceof RecommenderError;
    return send(res, isKnown ? 422 : 500, {
      error: err.message ?? 'Internt fel',
      stage:
        err instanceof ExtractorError ? 'extract'
        : err instanceof CategorizerError ? 'categorize'
        : err instanceof RecommenderError ? 'recommend'
        : 'unknown',
    });
  }
}
