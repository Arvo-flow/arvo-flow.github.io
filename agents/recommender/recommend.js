// agents/recommender/recommend.js
// Layer 2 worker: take a categorized invoice + customer profile → return a
// recommendation (switch or don't, which alternative, savings, switch steps).
//
// Model: claude-sonnet-4-6 — the multi-criteria reasoning (TCO, reliability,
// switching cost, license-pending guard) genuinely benefits from Sonnet over
// Haiku. Categorization was a simple labelling task; recommending is a
// judgment task.
//
// Thinking: disabled — tool_choice forces tool use which is incompatible.
//
// Caching: system prompt is ~6k chars (~1700 tokens). Sonnet 4.6's cache
// minimum is 2048 tokens, so the marker is a no-op until the prompt grows
// (more categories, more few-shot). Same documented pattern as Categorizer.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, RECOMMEND_TOOL } from './prompt.js';
import { getBenchmark } from '../../lib/benchmark.js';
import { CATEGORIES } from '../categorizer/categories.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;

export class RecommenderError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'RecommenderError';
    if (cause) this.cause = cause;
  }
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new RecommenderError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

function formatBenchmark(benchmark, employees) {
  if (!benchmark) {
    return '(Inget branschindex finns för denna kombination — modellen ska sätta confidence: low och shouldSwitch: false.)';
  }

  // Per-user categories must be scaled to total cost before comparing against
  // the invoice's annual total. Pre-computing this prevents LLM arithmetic errors.
  const isPerUser = benchmark.note.toLowerCase().includes('per användare');
  const scale = isPerUser && employees > 0 ? employees : 1;
  const totalMedian = benchmark.median * scale;
  const totalP25 = benchmark.p25 * scale;
  const scaleNote = isPerUser
    ? ` (${benchmark.median.toLocaleString('sv-SE')} kr/användare × ${employees} anställda)`
    : '';

  const altList = (benchmark.alternatives ?? [])
    .map(
      (a) =>
        `  - ${a.supplier} (reliability ${a.reliability})\n    ${a.positioning}`
    )
    .join('\n');

  const sourceStr = benchmark.source === 'real'
    ? `Arvo Flow branschindex — ${benchmark.n} verkliga datapunkter`
    : 'Estimat från publika listpriser (ersätts med riktig kunddata)';

  return `Bransch: ${benchmark.industry}, storlek: ${benchmark.size}
Median (total, per år): ${totalMedian.toLocaleString('sv-SE')} ${benchmark.unit}${scaleNote}
P25 (bästa 25 %, per år): ${totalP25.toLocaleString('sv-SE')} ${benchmark.unit}${isPerUser ? ` (${benchmark.p25.toLocaleString('sv-SE')} kr/användare × ${employees} anställda)` : ''}

Alternativa leverantörer:
${altList}

Källa: ${sourceStr}`;
}

function formatPrompt({ customer, invoice, categorized, benchmark }) {
  const annualCost = invoice.annualCost ?? invoice.amount;
  const employees = customer.employees ?? 1;
  const bm = benchmark;
  const isPerUser = bm && bm.note.toLowerCase().includes('per användare');
  const scale = isPerUser && employees > 0 ? employees : 1;
  const totalMedian = bm ? bm.median * scale : null;
  const overpaymentPct =
    totalMedian && totalMedian > 0
      ? Math.round(((annualCost - totalMedian) / totalMedian) * 100)
      : null;

  return `Kunden:
  Bolagstyp: ${customer.industry}
  Anställda: ${employees}
  Omsättning: ${customer.revenue ? customer.revenue.toLocaleString('sv-SE') + ' kr' : '(okänt)'}

Kategoriserad faktura:
  Kategori: ${categorized.category}
  Sub-typ: ${categorized.subType || '(okänd)'}
  Nuvarande leverantör: ${categorized.normalizedSupplier}
  Årskostnad (totalt): ${annualCost.toLocaleString('sv-SE')} kr${overpaymentPct !== null ? `  ← ${overpaymentPct > 0 ? overpaymentPct + ' % ÖVER medianen' : Math.abs(overpaymentPct) + ' % UNDER medianen'}` : ''}
  Confidence från Categorizer: ${categorized.confidence}

Branschindex för segmentet:
${formatBenchmark(benchmark, employees)}

Ge en rekommendation enligt instruktionerna. Returnera via verktyget "recommend".`;
}

/**
 * Recommend (or don't) a supplier switch.
 *
 * @param {object} input
 * @param {object} input.customer    - { industry, employees, revenue }
 * @param {object} input.invoice     - { amount?, annualCost? }
 * @param {object} input.categorized - output from Categorizer
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]
 */
export async function recommend(input, opts = {}) {
  if (!input?.customer || !input?.categorized) {
    throw new RecommenderError(
      'input måste innehålla customer + categorized + invoice'
    );
  }

  const benchmark = await getBenchmark({
    category: input.categorized.category,
    industry: input.customer.industry,
    employees: input.customer.employees,
  });

  const client = opts.client ?? getClient();

  let response;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      tools: [RECOMMEND_TOOL],
      tool_choice: { type: 'tool', name: 'recommend' },
      messages: [
        {
          role: 'user',
          content: formatPrompt({ ...input, benchmark }),
        },
      ],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      throw new RecommenderError('Rate limit hit — backa av och försök igen', {
        cause: err,
      });
    }
    if (err instanceof Anthropic.APIError) {
      throw new RecommenderError(
        `Anthropic API fel ${err.status}: ${err.message}`,
        { cause: err }
      );
    }
    throw err;
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new RecommenderError(
      'Inget tool_use-block i svaret — modellen avvek från instruktionerna'
    );
  }

  const result = toolUse.input;

  // Belt-and-suspenders: enforce license-pending guard at the code level too,
  // not just trust the model. If the category is license-pending and the model
  // somehow returned a suggested supplier, strip it and force VIP queue.
  const categoryDef = CATEGORIES[input.categorized.category];
  if (categoryDef?.licensePending) {
    if (result.suggestedSupplier !== null && result.suggestedSupplier !== undefined) {
      console.warn(
        `[Recommender] Model returned suggestedSupplier="${result.suggestedSupplier}" for license-pending category "${input.categorized.category}". Stripping at code level.`
      );
    }
    result.suggestedSupplier = null;
    result.suggestedAnnualCost = null;
    result.shouldSwitch = false;
    result.vipQueue = true;
    result.switchSteps = [];
  }

  return {
    ...result,
    suggestedSupplier: result.suggestedSupplier ?? null,
    suggestedAnnualCost: result.suggestedAnnualCost ?? null,
    benchmark,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cache_creation_input_tokens:
        response.usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: response.usage.cache_read_input_tokens ?? 0,
    },
    raw: result,
  };
}

/**
 * Batch with concurrency. Same shape as Categorizer for consistency.
 */
export async function recommendBatch(inputs, opts = {}) {
  const client = opts.client ?? getClient();
  const concurrency = opts.concurrency ?? 4;
  const results = new Array(inputs.length);

  let cursor = 0;
  async function worker() {
    while (cursor < inputs.length) {
      const i = cursor++;
      try {
        results[i] = await recommend(inputs[i], { client });
      } catch (err) {
        results[i] = { error: err.message, input: inputs[i] };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, inputs.length) }, worker)
  );
  return results;
}

export { MODEL };
