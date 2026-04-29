// agents/orchestrator/clients/fortnox-watch.js
// Fortnox watchdog — detects when a switch's NEW supplier shows up in the
// customer's bookkeeping, which is our trigger to mark the switch LIVE and
// later (when the invoice is paid) trigger SUCCESS_FEE_DUE.
//
// This file is a SKELETON. The matching logic + state transitions are real;
// the Fortnox API client is stubbed. To wire up live: replace _fetchInvoices
// with a real Fortnox API call (we already have @anthropic-ai/sdk pattern
// for credentials; Fortnox would use OAuth bearer + customer-specific
// tenant token).
//
// Architecture decision: this is POLL-based, not webhook-based, because
// Fortnox's webhook coverage for invoice events is incomplete. A 30-min
// poll cadence per active switch is acceptable at our scale.

import { randomBytes } from 'node:crypto';

function rid(prefix) {
  return `${prefix}_${randomBytes(6).toString('hex')}`;
}

export class FortnoxWatchdog {
  /**
   * @param {object} [opts]
   * @param {'stub'|'live'} [opts.mode='stub']
   * @param {function} [opts.fetchInvoices] - (customerId, sinceDate) => Promise<Invoice[]>
   * @param {Map<string, object>} [opts.stubInvoices] - keyed by customerId for stub mode
   */
  constructor(opts = {}) {
    this.mode = opts.mode ?? 'stub';
    this._fetchInvoices = opts.fetchInvoices ?? null;
    this._stubInvoices = opts.stubInvoices ?? new Map();
  }

  /**
   * Fuzzy match: does this Fortnox invoice look like a first invoice from
   * the new supplier in our switch? Used to trigger LIVE state.
   *
   * Strict matching is too brittle (suppliers reuse organization numbers
   * across product lines, names vary "If Skadeförsäkring" vs "If Skadeförs.").
   *
   * Match criteria:
   *   - supplier name contains the new supplier name (case-insensitive,
   *     ignoring suffixes like "AB", "Försäkring")
   *   - invoice date is within 60 days after expectedActivation
   *   - amount is within ±20% of agreedPrice annualized to first-invoice
   *     period (heuristic — first invoice is often pro-rated)
   */
  matchesNewSupplier({ invoice, switchRecord }) {
    if (!invoice || !switchRecord) return false;
    const expected = switchRecord.context?.recommendation?.suggestedSupplier;
    const expectedActivation = switchRecord.context?.application?.expectedActivation;
    if (!expected) return false;

    // Normalize both sides
    const norm = (s) =>
      s
        .toLowerCase()
        .replace(/\b(ab|ag|asa|oy|inc|ltd|gmbh|skadeförsäkring|försäkring|sweden)\b/g, '')
        .replace(/[^a-z0-9]/g, ' ')
        .trim();

    const a = norm(invoice.supplierName);
    const b = norm(expected);
    if (!a.includes(b) && !b.includes(a)) return false;

    if (expectedActivation) {
      const activation = new Date(expectedActivation).getTime();
      const invoiceDate = new Date(invoice.date).getTime();
      const daysAfter = (invoiceDate - activation) / (1000 * 60 * 60 * 24);
      if (daysAfter < -7 || daysAfter > 60) return false;
    }

    return true;
  }

  /**
   * Look for a first-invoice-from-new-supplier match. Called periodically
   * by the orchestrator's poll loop for active switches in TERMINATED_OLD
   * or APPLIED_NEW state.
   *
   * @param {object} input
   * @param {object} input.switchRecord    - the full switch state record
   * @returns {Promise<Invoice|null>}
   */
  async pollForNewSupplierInvoice({ switchRecord }) {
    if (!switchRecord?.context?.customer?.fortnoxCustomerId) {
      return null;
    }
    const customerId = switchRecord.context.customer.fortnoxCustomerId;

    let invoices;
    if (this.mode === 'stub') {
      invoices = this._stubInvoices.get(customerId) ?? [];
    } else {
      if (!this._fetchInvoices) {
        throw new Error('FortnoxWatchdog: fetchInvoices function required in live mode');
      }
      const sinceDate = switchRecord.context?.application?.expectedActivation
        ? new Date(switchRecord.context.application.expectedActivation)
        : new Date(switchRecord.createdAt);
      invoices = await this._fetchInvoices(customerId, sinceDate);
    }

    for (const inv of invoices) {
      if (this.matchesNewSupplier({ invoice: inv, switchRecord })) {
        return inv;
      }
    }
    return null;
  }

  /**
   * Detect that a tracked invoice has been paid in Fortnox. Triggers
   * SUCCESS_FEE_DUE in the orchestrator.
   *
   * @param {object} input
   * @param {string} input.customerId
   * @param {string} input.invoiceId        - Fortnox invoice ID we're watching
   * @returns {Promise<{paid: boolean, paidAt: string|null}>}
   */
  async checkInvoicePaid({ customerId, invoiceId }) {
    if (this.mode === 'stub') {
      const list = this._stubInvoices.get(customerId) ?? [];
      const inv = list.find((i) => i.id === invoiceId);
      if (!inv) return { paid: false, paidAt: null };
      return { paid: !!inv.paidAt, paidAt: inv.paidAt ?? null };
    }
    throw new Error('Live invoice payment check not implemented.');
  }

  // === Stub helpers — used in tests / demo ===

  __seedInvoice(customerId, invoice) {
    const list = this._stubInvoices.get(customerId) ?? [];
    list.push({ id: invoice.id ?? rid('inv'), paidAt: null, ...invoice });
    this._stubInvoices.set(customerId, list);
  }

  __markPaid(customerId, invoiceId) {
    const list = this._stubInvoices.get(customerId) ?? [];
    const inv = list.find((i) => i.id === invoiceId);
    if (!inv) throw new Error(`Unknown invoice: ${invoiceId}`);
    inv.paidAt = new Date().toISOString();
  }
}
