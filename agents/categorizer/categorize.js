// agents/categorizer/categorize.js
// The Categorizer — Layer 2 worker that turns a raw Fortnox invoice into
// a structured classification.
//
// Model: claude-haiku-4-5 (cheap, fast, deterministic enough for this task).
// Caching: system prompt is sent with cache_control so the ~2k-token rules block
// is only paid for once per cache window.
// Output: structured via tool_use + tool_choice forcing the categorize tool.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, CATEGORIZE_TOOL } from './prompt.js';
import { CATEGORIES } from './categories.js';

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 512;

export class CategorizerError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'CategorizerError';
    if (cause) this.cause = cause;
  }
}

// Strong description signals that unambiguously identify a category.
// Keyed by category ID → array of lowercase substrings to scan for.
const STRONG_DESC_SIGNALS = {
  mobil:          ['mobilabonnemang', 'mobiltelefoni', 'telefonabonnemang', 'företagstelefoni', 'mobildata'],
  el:             ['elförbrukning', 'elavtal', 'elhandel', 'elcertifikat', 'spotpris timme', 'elenergi'],
  bredband:       ['företagsfiber', 'bredbandsabonnemang', 'fiberabonnemang'],
  kortterminal:   ['kortavgifter', 'transaktionsavgift', 'kortterminal'],
  'faktura-tjanst': ['fakturatjänst', 'e-faktura utskick', 'fakturautskick'],
  'leasing-bil':  ['leasing servicebilar', 'fordonsleasing', 'billeasing'],
};

// Telecom supplier keywords — when combined with any subscription signal → mobil.
const TELECOM_SUPPLIER_SIGNALS = ['telekom', 'telecom', 'tele2', 'telia', 'telenor', ' tre ', 'comviq', 'halebop', 'vimla'];
const SUBSCRIPTION_DESC_SIGNALS = ['abonnemang', 'abonnement', 'subscription', 'månadsavgift telefon', 'telefonitjänst'];

// Returns a result object if a strong deterministic match is found, otherwise null.
function deterministicMatch(invoice) {
  const desc = (invoice.description ?? '').toLowerCase();
  const supplier = (invoice.supplier ?? '').toLowerCase();
  const combined = `${desc} ${supplier}`;

  // Rule 1: explicit service description anywhere in combined text
  for (const [category, signals] of Object.entries(STRONG_DESC_SIGNALS)) {
    const hit = signals.find((s) => combined.includes(s));
    if (hit) {
      return {
        category,
        subType: '',
        normalizedSupplier: invoice.supplier ?? '',
        confidence: 0.92,
        reasoning: `Deterministisk matchning: "${hit}" hittades i fakturatexten`,
        licensePending: CATEGORIES[category]?.licensePending ?? false,
      };
    }
  }

  // Rule 2: telecom supplier + any subscription signal → mobil
  const isTelesupplier = TELECOM_SUPPLIER_SIGNALS.some((s) => supplier.includes(s));
  const isSubscription = SUBSCRIPTION_DESC_SIGNALS.some((s) => desc.includes(s));
  if (isTelesupplier && isSubscription) {
    return {
      category: 'mobil',
      subType: 'företag',
      normalizedSupplier: invoice.supplier ?? '',
      confidence: 0.88,
      reasoning: `Deterministisk matchning: telecomleverantör + abonnemangsbeskrivning`,
      licensePending: false,
    };
  }

  return null;
}

function formatInvoice(invoice) {
  const lines = [
    'Klassificera denna leverantörsfaktura:',
    '',
    `Leverantör: ${invoice.supplier ?? '(saknas)'}`,
    `Belopp: ${invoice.amount != null ? `${invoice.amount} kr` : '(saknas)'}`,
    `Datum: ${invoice.date ?? '(saknas)'}`,
    `Konto: ${invoice.account ?? '(saknas)'}`,
    `Beskrivning: ${invoice.description ?? '(saknas)'}`,
  ];
  if (invoice.recurring != null) {
    lines.push(`Återkommande: ${invoice.recurring ? 'Ja' : 'Nej'}`);
  }
  return lines.join('\n');
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new CategorizerError(
      'ANTHROPIC_API_KEY saknas i miljön. Sätt den i .env eller exportera variabeln.'
    );
  }
  _client = new Anthropic();
  return _client;
}

/**
 * Categorize a single invoice.
 *
 * @param {object} invoice
 * @param {string} invoice.supplier           - Raw supplier name from Fortnox
 * @param {number} [invoice.amount]           - Belopp i SEK (utan moms)
 * @param {string} [invoice.date]             - YYYY-MM-DD
 * @param {string} [invoice.account]          - Bokföringskonto, t.ex. "5310"
 * @param {string} [invoice.description]      - Fritextbeskrivning från fakturan
 * @param {boolean} [invoice.recurring]       - True om månatlig/återkommande
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]           - Anthropic-klient att återanvända
 * @returns {Promise<{
 *   category: string,
 *   subType?: string,
 *   normalizedSupplier: string,
 *   confidence: number,
 *   reasoning: string,
 *   licensePending: boolean,
 *   usage: object,
 *   raw: object,
 * }>}
 */
export async function categorize(invoice, opts = {}) {
  if (!invoice || typeof invoice !== 'object') {
    throw new CategorizerError('invoice måste vara ett objekt');
  }
  if (!invoice.supplier) {
    throw new CategorizerError('invoice.supplier är obligatorisk');
  }

  // Short-circuit for unambiguous cases — avoids AI non-determinism on clear signals.
  const fast = deterministicMatch(invoice);
  if (fast) {
    return {
      ...fast,
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      raw: fast,
    };
  }

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
      tools: [CATEGORIZE_TOOL],
      tool_choice: { type: 'tool', name: 'categorize' },
      messages: [{ role: 'user', content: formatInvoice(invoice) }],
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      throw new CategorizerError('Rate limit hit — backa av och försök igen', {
        cause: err,
      });
    }
    if (err instanceof Anthropic.APIError) {
      throw new CategorizerError(
        `Anthropic API fel ${err.status}: ${err.message}`,
        { cause: err }
      );
    }
    throw err;
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new CategorizerError(
      'Inget tool_use-block i svaret — modellen avvek från instruktionerna'
    );
  }

  const result = toolUse.input;
  const categoryDef = CATEGORIES[result.category];
  if (!categoryDef) {
    throw new CategorizerError(
      `Modellen returnerade okänd kategori: "${result.category}"`
    );
  }

  return {
    category: result.category,
    subType: result.subType ?? '',
    normalizedSupplier: result.normalizedSupplier,
    confidence: result.confidence,
    reasoning: result.reasoning,
    licensePending: categoryDef.licensePending,
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
 * Batch-categorize. Sequential med rate-limit-respekt; kör inte tusentals parallellt.
 * För större volymer: använd Anthropic Message Batches API (50 % rabatt).
 */
export async function categorizeBatch(invoices, opts = {}) {
  const client = opts.client ?? getClient();
  const concurrency = opts.concurrency ?? 4;
  const results = new Array(invoices.length);

  let cursor = 0;
  async function worker() {
    while (cursor < invoices.length) {
      const i = cursor++;
      try {
        results[i] = await categorize(invoices[i], { client });
      } catch (err) {
        results[i] = { error: err.message, invoice: invoices[i] };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, invoices.length) }, worker)
  );
  return results;
}

export { MODEL };
