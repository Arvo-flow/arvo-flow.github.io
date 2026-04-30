// agents/invoice-guardian/guard.js
// Top-level entry point: takes an invoice + agreement, returns the full
// assessment (deterministic detection + LLM classification when needed).

import { detect } from './detect.js';
import { classify } from './classify.js';

/**
 * Full assessment. Skips the LLM call when detection.needsAssessment is false.
 *
 * @param {object} input
 * @param {object} input.invoice
 * @param {object} input.agreement
 * @param {string} [input.invoiceFrequency]
 * @param {object} [opts] - passed through to classify()
 * @returns {Promise<{
 *   alertId, severity, delta, expected, actual, category, supplierName,
 *   classification, disputeStrategy, reasoning, disputeDraftHint,
 *   usage?, llmInvoked: boolean
 * }>}
 */
export async function guard(input, opts = {}) {
  const detection = detect(input);

  if (!detection.needsAssessment) {
    return {
      ...detection,
      classification: 'legitimate',
      disputeStrategy: 'ignore',
      reasoning: 'Avvikelsen ligger inom toleransen — ingen klassificering behövs.',
      disputeDraftHint: '',
      llmInvoked: false,
    };
  }

  const classification = await classify({ detection, agreement: input.agreement, invoice: input.invoice }, opts);
  return {
    ...detection,
    ...classification,
    llmInvoked: true,
  };
}
