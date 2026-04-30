// agents/invoice-guardian/classify.js
// LLM-based legitimacy classification. Only called when detect() flags
// the invoice as needsAssessment=true. Sonnet 4.6 + tool use.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, CLASSIFY_TOOL } from './prompt.js';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 800;

export class GuardianError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'GuardianError';
    if (cause) this.cause = cause;
  }
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new GuardianError('ANTHROPIC_API_KEY saknas i miljön.');
  }
  _client = new Anthropic();
  return _client;
}

function formatPrompt({ detection, agreement, invoice }) {
  return `Avvikelse upptäckt:
  Kategori: ${detection.category}
  Leverantör: ${detection.supplierName}
  Avtalat (period): ${detection.expected.toLocaleString('sv-SE')} kr
  Fakturerat: ${detection.actual.toLocaleString('sv-SE')} kr
  Avvikelse: ${detection.delta.amount.toLocaleString('sv-SE')} kr (${detection.delta.percent} %)
  Initial allvarlighetsgrad: ${detection.severity}

Avtalskontext:
  Årskostnad enligt avtal: ${agreement.agreedAnnualCost.toLocaleString('sv-SE')} kr
  Tecknat: ${agreement.signedAt ?? '(okänt)'}
  KPI-/indexeringsklausul: ${agreement.kpiClause ?? '(ingen specificerad i avtalet)'}
  Avtalad faktureringsfrekvens: ${agreement.invoiceFrequency ?? 'månadsvis'}

Faktura-rader:
${(invoice.lineItems ?? []).map((li) => `  - ${li.description}: ${li.amount.toLocaleString('sv-SE')} kr`).join('\n') || '  (ingen breakdown tillgänglig)'}

Bedöm legitimiteten enligt instruktionerna och returnera via verktyget "classify".`;
}

/**
 * Classify a flagged anomaly. Caller passes the detect() result + the agreement.
 *
 * @param {object} input
 * @param {object} input.detection   - output from detect()
 * @param {object} input.agreement   - { agreedAnnualCost, supplierName, signedAt, kpiClause?, invoiceFrequency?, ... }
 * @param {object} input.invoice     - { amount, date, supplierName, lineItems? }
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]
 */
export async function classify(input, opts = {}) {
  if (!input?.detection || !input?.agreement || !input?.invoice) {
    throw new GuardianError('classify requires detection + agreement + invoice');
  }
  if (!input.detection.needsAssessment) {
    return {
      classification: 'legitimate',
      disputeStrategy: 'ignore',
      reasoning: 'Avvikelsen ligger inom toleransen — ingen LLM-bedömning behövs.',
      disputeDraftHint: '',
    };
  }

  const client = opts.client ?? getClient();

  let response;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'medium' },
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      tools: [CLASSIFY_TOOL],
      tool_choice: { type: 'tool', name: 'classify' },
      messages: [{ role: 'user', content: formatPrompt(input) }],
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      throw new GuardianError(`Anthropic API ${err.status}: ${err.message}`, { cause: err });
    }
    throw err;
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) throw new GuardianError('No tool_use block in response');

  const result = toolUse.input;
  return {
    ...result,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cache_creation_input_tokens: response.usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: response.usage.cache_read_input_tokens ?? 0,
    },
  };
}

export { MODEL };
