// agents/orchestrator/orchestrator.js
// The main API for driving a supplier switch through its full lifecycle.
//
// Composes:
//   - State machine (state-machine.js) for transitions + history
//   - FileStore (store.js) for persistence
//   - Fullmakt generator (fullmakt/generate.js) for the legal PDF
//   - ScriveClient for BankID e-signing
//   - SupplierClient for termination + new application
//   - FortnoxWatchdog for go-live + success-fee detection
//
// Each public method is a single state transition. The orchestrator never
// skips states. If a transition fails, the switch is moved to FAILED with
// an error payload, and the consumer can retry by manually advancing.

import { randomBytes } from 'node:crypto';
import {
  STATES, TERMINAL_STATES, isValidTransition, assertTransition,
  buildEvent, isTerminal, findDueSwitches,
} from './state-machine.js';
import { FileStore } from './store.js';
import { generateFullmakt } from './fullmakt/generate.js';
import { ScriveClient } from './clients/scrive.js';
import { SupplierClient } from './clients/supplier.js';
import { FortnoxWatchdog } from './clients/fortnox-watch.js';
import { CATEGORIES } from '../categorizer/categories.js';

function rid(prefix) {
  return `${prefix}_${randomBytes(6).toString('hex')}`;
}

export class OrchestratorError extends Error {
  constructor(message, { switchId, state, cause } = {}) {
    super(message);
    this.name = 'OrchestratorError';
    this.switchId = switchId;
    this.state = state;
    if (cause) this.cause = cause;
  }
}

export class Orchestrator {
  constructor(opts = {}) {
    this.store = opts.store ?? new FileStore();
    this.scrive = opts.scrive ?? new ScriveClient({ mode: 'stub' });
    this.supplier = opts.supplier ?? new SupplierClient({ mode: 'stub' });
    this.fortnox = opts.fortnox ?? new FortnoxWatchdog({ mode: 'stub' });
    this.successFeeRate = opts.successFeeRate ?? 0.20; // 20% of year-1 saving
  }

  // === Internal state-transition helper ===

  async _transition(switchId, toState, { actor = 'system', payload = {}, note } = {}) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    const fromState = record.state;
    if (isTerminal(fromState)) {
      throw new OrchestratorError(
        `Cannot transition from terminal state ${fromState}`,
        { switchId, state: fromState }
      );
    }
    assertTransition(fromState, toState);

    const event = buildEvent({ from: fromState, to: toState, actor, payload, note });
    record.history.push(event);
    record.state = toState;
    record.updatedAt = event.timestamp;
    record.context = { ...record.context, ...payload };
    await this.store.save(record);
    return record;
  }

  // === createSwitch — entry point ===

  /**
   * Create a new switch from a Recommender output.
   *
   * @param {object} input
   * @param {object} input.customer        - { orgName, orgNumber, address, signerName, signerSsn, fortnoxCustomerId, signerTitle? }
   * @param {object} input.recommendation  - the Recommender's output
   * @param {object} input.invoice         - the original Categorizer-classified invoice
   * @returns {Promise<object>}            - the new switch record
   */
  async createSwitch({ customer, recommendation, invoice }) {
    if (!customer?.orgNumber) {
      throw new OrchestratorError('createSwitch: customer.orgNumber required');
    }
    if (!recommendation?.shouldSwitch) {
      throw new OrchestratorError(
        'createSwitch: recommendation must have shouldSwitch=true. Did you mean to enqueue VIP instead?'
      );
    }
    if (recommendation.vipQueue) {
      throw new OrchestratorError(
        'createSwitch: license-pending categories must go through VIP queue, not switch lifecycle.'
      );
    }
    const categoryDef = CATEGORIES[invoice?.category];
    if (categoryDef?.licensePending) {
      throw new OrchestratorError(
        `createSwitch: category "${invoice.category}" is license-pending and cannot use the switch lifecycle yet.`
      );
    }

    const id = rid('sw');
    const now = new Date().toISOString();
    const record = {
      id,
      state: STATES.PROPOSED,
      createdAt: now,
      updatedAt: now,
      context: {
        customer,
        recommendation,
        invoice,
      },
      history: [
        buildEvent({
          from: null,
          to: STATES.PROPOSED,
          actor: 'system',
          payload: { recommendationSummary: {
            currentSupplier: recommendation.currentSupplier ?? invoice.normalizedSupplier,
            suggestedSupplier: recommendation.suggestedSupplier,
            savingPerYear: recommendation.savingPerYear,
          } },
          note: 'Switch created from recommendation',
        }),
      ],
    };
    await this.store.save(record);
    return record;
  }

  // === State transitions ===

  /**
   * Customer saw the proposal in /opportunity. Mark as awaiting their click.
   */
  async markAwaitingApproval(switchId) {
    return this._transition(switchId, STATES.AWAITING_APPROVAL, {
      actor: 'system',
      note: 'Surfaced to customer in /opportunity',
    });
  }

  /**
   * Customer clicked "Godkänn byte med BankID" — generate fullmakt PDF.
   */
  async prepareFullmakt(switchId) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    const { customer, recommendation, invoice } = record.context;
    const fullmakt = await generateFullmakt({
      customer,
      category: invoice.category,
      currentSupplier: {
        name: recommendation.currentSupplier ?? invoice.normalizedSupplier,
        accountReference: invoice.accountReference ?? null,
      },
      newSupplier: {
        name: recommendation.suggestedSupplier,
        productName: recommendation.suggestedProductName ?? `${recommendation.suggestedSupplier} Företag`,
        agreedPrice: recommendation.suggestedAnnualCost,
      },
      switchId,
    });

    return this._transition(switchId, STATES.FULLMAKT_PREPARED, {
      actor: 'system',
      payload: {
        fullmakt: {
          path: fullmakt.path,
          format: fullmakt.format,
          sizeBytes: fullmakt.bytes.length,
          generatedAt: new Date().toISOString(),
          note: fullmakt.note,
        },
      },
      note: `Fullmakt generated (${fullmakt.format})`,
    });
  }

  /**
   * Send the fullmakt to Scrive for BankID-signing.
   */
  async initiateSigning(switchId) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    const fullmaktInfo = record.context.fullmakt;
    if (!fullmaktInfo) {
      throw new OrchestratorError('No fullmakt prepared yet — call prepareFullmakt first.');
    }

    const { readFile } = await import('node:fs/promises');
    const pdfBytes = await readFile(fullmaktInfo.path);

    const signers = [
      {
        name: record.context.customer.signerName,
        email: record.context.customer.signerEmail,
        ssn: record.context.customer.signerSsn,
        role: 'grantor',
      },
    ];

    const scriveResult = await this.scrive.createDocument({
      pdfBytes,
      title: `Fullmakt — ${record.context.recommendation.suggestedSupplier}`,
      signers,
      metadata: { switchId, category: record.context.invoice.category },
    });

    return this._transition(switchId, STATES.BANKID_PENDING, {
      actor: 'system',
      payload: {
        signing: {
          documentId: scriveResult.documentId,
          signingUrl: scriveResult.signingUrl,
          expiresAt: scriveResult.expiresAt,
          provider: 'scrive',
        },
      },
      note: 'Sent to Scrive for BankID signing',
    });
  }

  /**
   * Webhook-driven (or poll-driven). Customer signed with BankID.
   *
   * IDEMPOTENT: Scrive may deliver the same signed-event multiple times
   * (network retries, webhook redelivery). If the switch is already in
   * BANKID_SIGNED with the same scriveDocId, this method returns the
   * existing record marked with `_idempotent: true` and writes nothing.
   * If the docId differs, it throws — that's a data integrity issue.
   */
  async handleSigned(switchId, { signedPdfBytes, scriveDocId, signedSsn, signedAt }) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    if (record.state === STATES.BANKID_SIGNED) {
      const existingDocId = record.context?.signing?.documentId;
      if (!scriveDocId || existingDocId === scriveDocId) {
        return { ...record, _idempotent: true };
      }
      throw new OrchestratorError(
        `Already BANKID_SIGNED with a different scriveDocId. existing=${existingDocId} incoming=${scriveDocId}`,
        { switchId, state: record.state }
      );
    }

    return this._transition(switchId, STATES.BANKID_SIGNED, {
      actor: 'scrive',
      payload: {
        signedAt: signedAt ?? new Date().toISOString(),
        signedSsn,
        scriveDocId,
        signedPdfSizeBytes: signedPdfBytes?.length ?? 0,
      },
      note: 'BankID signature confirmed',
    });
  }

  /**
   * Send the termination notice to the OLD supplier.
   */
  async executeTermination(switchId) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    const { customer, recommendation, invoice } = record.context;
    const signing = record.context.signing;
    if (!signing?.documentId) {
      throw new OrchestratorError('Cannot terminate without signed fullmakt — initiateSigning + handleSigned first.');
    }

    const oldSupplier = recommendation.currentSupplier ?? invoice.normalizedSupplier;
    const effectiveDate = this._computeTerminationDate(record);

    const result = await this.supplier.sendTermination({
      supplierName: oldSupplier,
      customer: {
        orgName: customer.orgName,
        orgNumber: customer.orgNumber,
        accountReference: invoice.accountReference,
      },
      fullmaktDocId: signing.documentId,
      effectiveDate,
    });

    return this._transition(switchId, STATES.TERMINATED_OLD, {
      actor: 'supplier',
      payload: {
        termination: {
          terminationId: result.terminationId,
          channel: result.channel,
          effectiveDate: result.effectiveDate,
          accepted: result.accepted,
        },
      },
      note: `Termination sent to ${oldSupplier} via ${result.channel}`,
    });
  }

  /**
   * Submit the new contract application to the NEW supplier.
   */
  async executeNewApplication(switchId, { productConfig = {} } = {}) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    const { customer, recommendation } = record.context;
    const signing = record.context.signing;

    const result = await this.supplier.submitNewApplication({
      supplierName: recommendation.suggestedSupplier,
      customer,
      productConfig: {
        agreedPrice: recommendation.suggestedAnnualCost,
        productName: recommendation.suggestedProductName ?? `${recommendation.suggestedSupplier} Företag`,
        ...productConfig,
      },
      fullmaktDocId: signing.documentId,
    });

    return this._transition(switchId, STATES.APPLIED_NEW, {
      actor: 'supplier',
      payload: {
        application: {
          applicationId: result.applicationId,
          accountNumber: result.accountNumber,
          expectedActivation: result.expectedActivation,
        },
      },
      note: `New application submitted to ${recommendation.suggestedSupplier}`,
    });
  }

  /**
   * Triggered by Fortnox watchdog when the first invoice from the new
   * supplier shows up in the customer's bookkeeping. IDEMPOTENT on
   * fortnoxInvoiceId — the watchdog runs every 30 min and may match
   * the same invoice on consecutive polls.
   */
  async markLive(switchId, { firstInvoice }) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    if (record.state === STATES.LIVE) {
      const existingInvId = record.context?.firstInvoice?.fortnoxInvoiceId;
      if (!firstInvoice?.id || existingInvId === firstInvoice.id) {
        return { ...record, _idempotent: true };
      }
      throw new OrchestratorError(
        `Already LIVE with different invoice. existing=${existingInvId} incoming=${firstInvoice.id}`,
        { switchId, state: record.state }
      );
    }

    return this._transition(switchId, STATES.LIVE, {
      actor: 'fortnox',
      payload: {
        liveAt: new Date().toISOString(),
        firstInvoice: {
          fortnoxInvoiceId: firstInvoice.id,
          supplier: firstInvoice.supplierName,
          amount: firstInvoice.amount,
          date: firstInvoice.date,
        },
      },
      note: 'New supplier invoice detected — switch is live',
    });
  }

  /**
   * Triggered by Fortnox watchdog when the live invoice is marked paid.
   * Computes the success fee. IDEMPOTENT on paidInvoiceId.
   */
  async markSuccessFeeDue(switchId, { paidInvoice }) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });

    if (record.state === STATES.SUCCESS_FEE_DUE) {
      const existingPaidId = record.context?.successFee?.paidInvoiceId;
      if (!paidInvoice?.id || existingPaidId === paidInvoice.id) {
        return { ...record, _idempotent: true };
      }
      throw new OrchestratorError(
        `Already SUCCESS_FEE_DUE with different paidInvoice. existing=${existingPaidId} incoming=${paidInvoice.id}`,
        { switchId, state: record.state }
      );
    }

    const yearOneSaving = record.context.recommendation.savingPerYear;
    const successFeeAmount = Math.round(yearOneSaving * this.successFeeRate);

    return this._transition(switchId, STATES.SUCCESS_FEE_DUE, {
      actor: 'fortnox',
      payload: {
        successFee: {
          rate: this.successFeeRate,
          amount: successFeeAmount,
          basis: yearOneSaving,
          basisType: 'year_one_saving_estimate',
          paidInvoiceId: paidInvoice.id,
          dueAt: new Date().toISOString(),
        },
      },
      note: `Success fee ${successFeeAmount} kr due (20% of ${yearOneSaving} kr year-1 saving)`,
    });
  }

  // === Scheduled future / bindningstid handling ===

  /**
   * Park a switch for future reactivation. Two trigger paths:
   *
   *   a) REACTIVE: from TERMINATED_OLD when the old supplier acknowledges
   *      our termination but says "you have N months bindningstid kvar".
   *      Set reactivateAt = contractEnd - 91 days, reason = 'bindningstid'.
   *
   *   b) PROACTIVE (idé #3 — Bindningstid-Sniper): from PROPOSED when we
   *      already know the contract has bindningstid kvar (e.g. detected
   *      from invoice metadata). Schedule the cancellation flow ahead of
   *      time so the customer never gets auto-renewed.
   *
   * @param {string} switchId
   * @param {object} args
   * @param {string} args.reason                  - 'bindningstid' | 'planned-renewal' | string
   * @param {string} args.reactivateAt            - ISO date when cron should reactivate
   * @param {string} [args.originalContractEnd]   - ISO date of the actual contract expiry (for ref)
   * @param {object} [args.supplierResponse]      - structured rejection payload if reactive path
   */
  async scheduleFuture(switchId, { reason, reactivateAt, originalContractEnd, supplierResponse } = {}) {
    if (!reason || !reactivateAt) {
      throw new OrchestratorError('scheduleFuture requires reason + reactivateAt');
    }
    const reactivateMs = Date.parse(reactivateAt);
    if (Number.isNaN(reactivateMs)) {
      throw new OrchestratorError(`Invalid reactivateAt: ${reactivateAt}`);
    }
    if (reactivateMs <= Date.now()) {
      throw new OrchestratorError('reactivateAt must be in the future');
    }

    return this._transition(switchId, STATES.SCHEDULED_FUTURE, {
      actor: 'system',
      payload: {
        scheduling: {
          reason,
          reactivateAt,
          originalContractEnd: originalContractEnd ?? null,
          supplierResponse: supplierResponse ?? null,
          scheduledAt: new Date().toISOString(),
        },
      },
      note: `Scheduled future reactivation at ${reactivateAt} (${reason})`,
    });
  }

  /**
   * Triggered by the cron loop when a SCHEDULED_FUTURE switch hits its
   * reactivateAt date. Returns the lifecycle to AWAITING_APPROVAL — the
   * customer gets a fresh prompt and signs a new BankID, because the
   * original fullmakt may have expired (6-month max validity) and the
   * recommendation may have changed.
   *
   * Use findDueSwitches() from state-machine.js to discover candidates.
   */
  async reactivateScheduled(switchId) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });
    const prior = record.context?.scheduling ?? {};

    return this._transition(switchId, STATES.AWAITING_APPROVAL, {
      actor: 'system',
      payload: {
        scheduling: {
          ...prior,
          reactivatedAt: new Date().toISOString(),
        },
        // Clear stale context so next pass regenerates fresh
        fullmakt: null,
        signing: null,
      },
      note: `Reactivated from SCHEDULED_FUTURE — fresh BankID + fullmakt required`,
    });
  }

  /**
   * Mark the lifecycle as completed — success fee was invoiced + paid by us.
   */
  async markCompleted(switchId, { stripeInvoiceId } = {}) {
    return this._transition(switchId, STATES.COMPLETED, {
      actor: 'system',
      payload: { stripeInvoiceId, completedAt: new Date().toISOString() },
      note: 'Success fee invoiced and paid — lifecycle complete',
    });
  }

  // === Failure paths (all idempotent on terminal states) ===

  async handleCancelled(switchId, { reason, scriveDocId } = {}) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });
    if (record.state === STATES.CUSTOMER_CANCELLED) {
      return { ...record, _idempotent: true };
    }
    return this._transition(switchId, STATES.CUSTOMER_CANCELLED, {
      actor: 'customer',
      payload: { reason, scriveDocId, cancelledAt: new Date().toISOString() },
      note: `Customer cancelled: ${reason ?? 'no reason given'}`,
    });
  }

  async handleSigningExpired(switchId, { scriveDocId } = {}) {
    const record = await this.store.load(switchId);
    if (!record) throw new OrchestratorError('Switch not found', { switchId });
    if (record.state === STATES.SIGNING_EXPIRED) {
      return { ...record, _idempotent: true };
    }
    return this._transition(switchId, STATES.SIGNING_EXPIRED, {
      actor: 'scrive',
      payload: { scriveDocId, expiredAt: new Date().toISOString() },
      note: 'Scrive signing window expired without signature',
    });
  }

  async handleSupplierRejection(switchId, { reason, supplierName }) {
    return this._transition(switchId, STATES.SUPPLIER_REJECTED, {
      actor: 'supplier',
      payload: { reason, supplierName, rejectedAt: new Date().toISOString() },
      note: `Supplier ${supplierName} rejected: ${reason}`,
    });
  }

  async handleFailure(switchId, { reason, error }) {
    return this._transition(switchId, STATES.FAILED, {
      actor: 'system',
      payload: { reason, error: error?.message ?? null, failedAt: new Date().toISOString() },
      note: `Failed: ${reason}`,
    });
  }

  // === Read API ===

  async getStatus(switchId) {
    const record = await this.store.load(switchId);
    if (!record) return null;
    return {
      id: record.id,
      state: record.state,
      isTerminal: isTerminal(record.state),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      customer: record.context.customer.orgName,
      currentSupplier: record.context.recommendation.currentSupplier ?? record.context.invoice.normalizedSupplier,
      newSupplier: record.context.recommendation.suggestedSupplier,
      savingPerYear: record.context.recommendation.savingPerYear,
      // Top-level scheduling for findDueSwitches()
      scheduling: record.context.scheduling ?? null,
      historyLength: record.history.length,
    };
  }

  async getRecord(switchId) {
    return this.store.load(switchId);
  }

  async list() {
    const ids = await this.store.list();
    return Promise.all(ids.map((id) => this.getStatus(id)));
  }

  async findBySigningDocId(scriveDocId) {
    const ids = await this.store.list();
    for (const id of ids) {
      const record = await this.store.load(id);
      if (record?.context?.signing?.documentId === scriveDocId) {
        return record;
      }
    }
    return null;
  }

  /**
   * Find all SCHEDULED_FUTURE switches whose reactivateAt is in the past.
   * Convenience wrapper around the pure findDueSwitches helper. The cron
   * loop calls this and then iterates calling reactivateScheduled().
   */
  async findDueScheduled(asOfDate = new Date()) {
    const all = await this.list();
    return findDueSwitches(all, asOfDate);
  }

  // === Helpers ===

  _computeTerminationDate(record) {
    const noticeDays = record.context.recommendation.cancellationNotice ?? 30;
    const date = new Date();
    date.setDate(date.getDate() + noticeDays);
    return date.toISOString().slice(0, 10);
  }
}
