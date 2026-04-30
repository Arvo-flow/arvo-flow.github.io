// agents/invoice-guardian/detect.js
// Deterministic pre-check. Does the math, classifies the magnitude.
// Cheap (no LLM call). Anything flagged "minor" or worse goes to classify.js
// for legitimacy assessment.

import { randomBytes } from 'node:crypto';

const SEVERITY = Object.freeze({
  NONE:   'none',
  MINOR:  'minor',    // 5–10% delta — could be KPI uppräkning
  MEDIUM: 'medium',   // 10–25% — likely needs a question
  HIGH:   'high',     // >25% — almost certainly worth disputing
});

// Some categories have legitimate seasonality. We widen tolerance for them.
const SEASONALITY_TOLERANCE = {
  el: 0.40,           // winter months can be 40% above mean
  bredband: 0.05,     // basically flat
  mobil: 0.05,
  kortterminal: 0.30, // varies with transaction volume
  'leasing-bil': 0.05,
  'forsakring-foretag': 0.05,
  'forsakring-ansvar': 0.05,
  'faktura-tjanst': 0.10,
};

/**
 * Compute the expected period cost based on agreed annual cost and
 * the invoice's billing frequency (monthly vs quarterly vs annual).
 */
function inferExpectedAmount({ agreedAnnualCost, invoiceFrequency = 'monthly' }) {
  const divisor = {
    monthly: 12,
    quarterly: 4,
    annual: 1,
    biannual: 2,
  }[invoiceFrequency] ?? 12;
  return agreedAnnualCost / divisor;
}

/**
 * Compare an incoming invoice against the signed agreement.
 * No LLM call — pure math.
 *
 * @param {object} input
 * @param {object} input.invoice                    - { amount, date, supplierName, category }
 * @param {object} input.agreement                  - { agreedAnnualCost, supplierName, category, signedAt, kpiClause? }
 * @param {string} [input.invoiceFrequency='monthly']
 * @returns {{
 *   alertId: string,
 *   needsAssessment: boolean,
 *   severity: 'none'|'minor'|'medium'|'high',
 *   delta: { amount: number, percent: number },
 *   expected: number,
 *   actual: number,
 * }}
 */
export function detect(input) {
  const { invoice, agreement, invoiceFrequency = 'monthly' } = input;
  if (!invoice?.amount || !agreement?.agreedAnnualCost) {
    throw new Error('detect: invoice.amount and agreement.agreedAnnualCost required');
  }

  const expected = inferExpectedAmount({
    agreedAnnualCost: agreement.agreedAnnualCost,
    invoiceFrequency,
  });
  const actual = invoice.amount;
  const deltaAmount = actual - expected;
  const deltaPercent = (deltaAmount / expected) * 100;

  // Apply category seasonality tolerance to determine severity bands
  const tol = SEASONALITY_TOLERANCE[invoice.category] ?? 0.10;
  const tolPct = tol * 100;

  let severity = SEVERITY.NONE;
  if (deltaPercent > tolPct + 50) severity = SEVERITY.HIGH;
  else if (deltaPercent > tolPct + 25) severity = SEVERITY.MEDIUM;
  else if (deltaPercent > tolPct + 5) severity = SEVERITY.MINOR;

  return {
    alertId: `alert_${randomBytes(6).toString('hex')}`,
    needsAssessment: severity !== SEVERITY.NONE,
    severity,
    delta: {
      amount: Math.round(deltaAmount),
      percent: Math.round(deltaPercent * 10) / 10,
    },
    expected: Math.round(expected),
    actual: Math.round(actual),
    category: invoice.category,
    supplierName: invoice.supplierName ?? agreement.supplierName,
  };
}

export { SEVERITY, SEASONALITY_TOLERANCE };
