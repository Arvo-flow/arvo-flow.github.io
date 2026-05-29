// lib/batch-processor.js
// Orchestrates the three-stage invoice pipeline at batch scale.
//
// Stage 1 — Extract (Opus):   Anthropic Batch API, async, all invoices at once.
//                              50% cheaper than individual calls. Cron polls.
// Stage 2 — Categorize (Haiku): concurrent Promise.all in chunks of 20.
// Stage 3 — Recommend (Sonnet): concurrent Promise.all in chunks of 20.
//
// Why Batch only for extract?
//   Extract is the bottleneck (Opus, 5-15 s each, 60-70% of total cost).
//   Categorize + Recommend are fast enough that concurrent chunking suffices.

import Anthropic from '@anthropic-ai/sdk';
import { extractInvoice, routeExtraction, CONFIDENCE_THRESHOLD, EXTRACT_TOOL, SYSTEM_PROMPT } from '../agents/test-invoice/extract.js';
import { computeInvoiceMetrics }    from './invoice-metrics.js';
import { categorize }               from '../agents/categorizer/categorize.js';
import { recommend }                from '../agents/recommender/recommend.js';
import { computeSecondarySaving }   from './secondary-savings.js';
import { checkSupplierFingerprint } from './supplier-fingerprints.js';
import { verifySanity }             from './sanity-verifier.js';
import { getKv }                    from './kv.js';
import { getSekRate, FALLBACK_RATE_USD_SEK, getEurSekRate, FALLBACK_RATE_EUR_SEK } from '../agents/recommender/pricing.js';

const EXTRACT_MODEL   = 'claude-opus-4-8';
const EXTRACT_TOKENS  = 4096;
const CHUNK_SIZE      = 20;   // concurrent categorize/recommend calls

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

// ── Stage 1: Submit extract batch ────────────────────────────────────────────

/**
 * Submit all PDFs to the Anthropic Batch API for extraction.
 * Returns the batch_id to store and poll later.
 */
export async function submitExtractBatch(invoices) {
  const client = getClient();

  const requests = invoices.map((inv, i) => ({
    custom_id: `inv-${i}`,
    params: {
      model:       EXTRACT_MODEL,
      max_tokens:  EXTRACT_TOKENS,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      tools:       [EXTRACT_TOOL],
      tool_choice: { type: 'tool', name: 'extract_invoice' },
      messages: [{
        role: 'user',
        content: [
          {
            type:   'document',
            source: { type: 'base64', media_type: 'application/pdf', data: inv.pdfB64 },
          },
          { type: 'text', text: 'Extrahera alla kostnadsrader med semantisk klassificering via verktyget extract_invoice.' },
        ],
      }],
    },
  }));

  const batch = await client.beta.messages.batches.create({ requests });
  return batch.id;
}

/**
 * Check if a Batch API job is complete.
 * Returns { done: bool, results: Map<customId, extractedData|null> }
 */
export async function pollExtractBatch(batchId) {
  const client = getClient();
  const batch  = await client.beta.messages.batches.retrieve(batchId);

  if (batch.processing_status !== 'ended') {
    return { done: false, results: null };
  }

  const results = new Map();
  for await (const item of await client.beta.messages.batches.results(batchId)) {
    const index = parseInt(item.custom_id.replace('inv-', ''), 10);
    if (item.result.type !== 'succeeded') {
      results.set(index, null);
      continue;
    }
    try {
      const msg   = item.result.message;
      const block = msg.content.find((b) => b.type === 'tool_use' && b.name === 'extract_invoice');
      if (!block) { results.set(index, null); continue; }

      const { aggregateLineItems } = await import('../agents/test-invoice/extract.js');
      const aggregated = aggregateLineItems(block.input);
      results.set(index, { ...aggregated, usage: msg.usage });
    } catch {
      results.set(index, null);
    }
  }

  return { done: true, results };
}

// ── Stage 2+3: Categorize + Recommend in chunks ──────────────────────────────

async function processOneInvoice({ inv, extracted, customer, kv }) {
  const route = routeExtraction(extracted);
  if (route === 'unsupported') {
    return { route, extracted, categorized: null, recommendation: null };
  }
  if (route === 'review_queue') {
    return { route, extracted, categorized: null, recommendation: null };
  }

  const metrics = computeInvoiceMetrics(
    extracted.lineItems,
    null,
    extracted.potentialMixedCategories
  );

  const categorized = await categorize({
    supplier:    extracted.supplier,
    lineItems:   extracted.lineItems,
    annualCost:  extracted.annualCost,
    billingPeriod: extracted.billingPeriod,
  });

  // Re-compute metrics with actual category
  const metricsWithCat = computeInvoiceMetrics(
    extracted.lineItems,
    categorized.category,
    extracted.potentialMixedCategories
  );

  const fp = checkSupplierFingerprint(
    categorized.normalizedSupplier,
    extracted.supplier,
    categorized.category
  );
  if (fp.matched && !fp.categoryOk) {
    categorized.confidence = Math.max(0, (categorized.confidence ?? 0.7) - 0.15);
  }

  const sekPerUsd = (await getSekRate(kv).catch(() => ({ rate: FALLBACK_RATE_USD_SEK }))).rate;
  const sekPerEur = (await getEurSekRate(kv).catch(() => ({ rate: FALLBACK_RATE_EUR_SEK }))).rate;

  const recommendation = await recommend({
    customer,
    categorized,
    invoice: { ...extracted, ...metricsWithCat },
  }, { kvStore: kv, sekPerUsd, sekPerEur });

  // Sanity check
  if (recommendation.shouldSwitch && recommendation.savingPct > 0) {
    const sanity = await verifySanity({
      category:   categorized.category,
      annualCost: extracted.annualCost,
      savingPct:  recommendation.savingPct,
      supplier:   extracted.supplier,
    });
    if (!sanity.pass) {
      return { route: 'review_queue', extracted, categorized, recommendation: null };
    }
  }

  // Secondary saving
  const secondarySaving = computeSecondarySaving({
    categorized,
    invoice:       { ...extracted, ...metricsWithCat },
    recommendation,
    customer,
  });
  if (secondarySaving) recommendation.secondarySaving = secondarySaving;

  return { route, extracted, categorized, recommendation };
}

/**
 * Run categorize + recommend for all invoices concurrently in chunks.
 * @param {{ inv, extracted }[]} items
 * @param {{ industry, employees }} customer
 * @returns {Promise<{ route, extracted, categorized, recommendation }[]>}
 */
export async function processCategorizeRecommend(items, customer) {
  const kv      = getKv();
  const results = [];

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk   = items.slice(i, i + CHUNK_SIZE);
    const settled = await Promise.allSettled(
      chunk.map(({ inv, extracted }) =>
        processOneInvoice({ inv, extracted, customer, kv })
      )
    );
    for (const s of settled) {
      results.push(s.status === 'fulfilled'
        ? s.value
        : { route: 'error', extracted: null, categorized: null, recommendation: null, error: s.reason?.message }
      );
    }
  }

  return results;
}
