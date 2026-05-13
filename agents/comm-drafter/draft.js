// agents/comm-drafter/draft.js
// Draft customer-facing email + SMS for a state transition event.
// Model: Haiku 4.5. Tool use for structured output.

import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, DRAFT_TOOL } from './prompt.js';
import { EVENT_TYPES, TEMPLATES } from './templates.js';

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 600;

export class DrafterError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'DrafterError';
    if (cause) this.cause = cause;
  }
}

let _client;
function getClient() {
  if (_client) return _client;
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new DrafterError('ANTHROPIC_API_KEY saknas i miljön.');
  }
  _client = new Anthropic();
  return _client;
}

function formatContext({ eventType, switchRecord, alertContext }) {
  const lines = [`Händelse: ${eventType}`, ''];

  if (switchRecord) {
    const c = switchRecord.context ?? {};
    lines.push(`Kund: ${c.customer?.orgName ?? '(okänt)'}`);
    if (c.customer?.signerName) lines.push(`Mottagare: ${c.customer.signerName}`);
    if (c.recommendation) {
      lines.push(`Nuvarande leverantör: ${c.recommendation.currentSupplier ?? c.invoice?.normalizedSupplier ?? '(okänt)'}`);
      lines.push(`Ny leverantör: ${c.recommendation.suggestedSupplier ?? '(okänt)'}`);
      if (c.recommendation.savingPerYear) {
        lines.push(`Årsbesparing: ${c.recommendation.savingPerYear.toLocaleString('sv-SE')} kr`);
      }
    }
    if (c.application?.expectedActivation) {
      lines.push(`Förväntat aktiveringsdatum: ${c.application.expectedActivation}`);
    }
    if (c.termination?.effectiveDate) {
      lines.push(`Uppsägning träder i kraft: ${c.termination.effectiveDate}`);
    }
    if (c.successFee?.amount) {
      lines.push(`Success fee: ${c.successFee.amount.toLocaleString('sv-SE')} kr`);
    }
    if (c.scheduling?.reactivateAt) {
      lines.push(`Återaktiveras: ${c.scheduling.reactivateAt}`);
      lines.push(`Avtalsslut hos nuvarande leverantör: ${c.scheduling.originalContractEnd ?? '(okänt)'}`);
    }
    lines.push(`Switch-ID: ${switchRecord.id}`);
  }

  if (alertContext) {
    lines.push(`Leverantör: ${alertContext.supplierName}`);
    lines.push(`Avtalat pris: ${alertContext.agreedPrice?.toLocaleString('sv-SE')} kr`);
    lines.push(`Fakturerat pris: ${alertContext.billedPrice?.toLocaleString('sv-SE')} kr`);
    lines.push(`Avvikelse: ${alertContext.deltaPercent}% (${alertContext.deltaAmount?.toLocaleString('sv-SE')} kr)`);
    if (alertContext.reason) lines.push(`Bedömning: ${alertContext.reason}`);
    if (alertContext.alertId) lines.push(`Alert-ID: ${alertContext.alertId}`);
  }

  return lines.join('\n');
}

/**
 * Generate email + SMS draft.
 *
 * @param {object} input
 * @param {string} input.eventType        - one of EVENT_TYPES values
 * @param {object} [input.switchRecord]   - full Orchestrator record (for switch events)
 * @param {object} [input.alertContext]   - { supplierName, agreedPrice, billedPrice, deltaPercent, deltaAmount, reason, alertId } (for GUARDIAN_ALERT)
 * @param {object} [opts]
 * @param {Anthropic} [opts.client]
 * @returns {Promise<{subject, body, smsText, ctaLabel?, ctaUrl?, tone, usage, raw}>}
 */
export async function draft(input, opts = {}) {
  if (!input?.eventType || !TEMPLATES[input.eventType]) {
    throw new DrafterError(`Unknown eventType: ${input?.eventType}`);
  }
  if (input.eventType === EVENT_TYPES.GUARDIAN_ALERT && !input.alertContext) {
    throw new DrafterError('GUARDIAN_ALERT requires alertContext');
  }
  if (input.eventType !== EVENT_TYPES.GUARDIAN_ALERT && !input.switchRecord) {
    throw new DrafterError('Switch events require switchRecord');
  }

  const client = opts.client ?? getClient();
  const userMessage = formatContext(input);

  let response;
  try {
    response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      tools: [DRAFT_TOOL],
      tool_choice: { type: 'tool', name: 'draft' },
      messages: [{ role: 'user', content: userMessage }],
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      throw new DrafterError(`Anthropic API ${err.status}: ${err.message}`, { cause: err });
    }
    throw err;
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) throw new DrafterError('No tool_use block in response');

  const result = toolUse.input;

  // Inject CTA URL from template if model didn't supply one
  if (!result.ctaUrl && TEMPLATES[input.eventType].ctaPath) {
    const path = TEMPLATES[input.eventType].ctaPath
      .replace('{switchId}', input.switchRecord?.id ?? '')
      .replace('{alertId}', input.alertContext?.alertId ?? '');
    result.ctaUrl = `https://arvo-flow.github.io/flow${path}`;
    if (!result.ctaLabel) result.ctaLabel = TEMPLATES[input.eventType].ctaLabel;
  }

  return {
    subject: result.subject,
    body: result.body,
    smsText: result.smsText,
    ctaLabel: result.ctaLabel ?? null,
    ctaUrl: result.ctaUrl ?? null,
    tone: result.tone,
    eventType: input.eventType,
    usage: {
      input_tokens: response.usage.input_tokens,
      output_tokens: response.usage.output_tokens,
      cache_creation_input_tokens: response.usage.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: response.usage.cache_read_input_tokens ?? 0,
    },
    raw: result,
  };
}

export { MODEL };
