// agents/orchestrator/clients/supplier.js
// Stubbed supplier client. Each leverantör has its own integration in real
// life — Tibber's API, Tele2's reseller portal, Bahnhof's partner SOAP, etc.
// In production, swap this single class for a registry of per-supplier
// adapters that all implement the same interface.
//
// For MVP: deterministic in-memory stub. Demos work end-to-end. Real
// integrations land one supplier at a time as we sign affiliate agreements.

import { randomBytes } from 'node:crypto';

function rid(prefix) {
  return `${prefix}_${randomBytes(6).toString('hex')}`;
}

export class SupplierClient {
  /**
   * @param {object} [opts]
   * @param {'stub'|'live'} [opts.mode='stub']
   * @param {Map<string, object>} [opts.adapters] - per-supplier adapters in live mode
   */
  constructor(opts = {}) {
    this.mode = opts.mode ?? 'stub';
    this.adapters = opts.adapters ?? new Map();
    this._stubTerminations = new Map();
    this._stubApplications = new Map();
  }

  /**
   * Send a termination notice to the customer's CURRENT supplier.
   *
   * @param {object} input
   * @param {string} input.supplierName
   * @param {object} input.customer            - { orgName, orgNumber, accountReference? }
   * @param {string} input.fullmaktDocId       - Scrive document-ID for legal proof
   * @param {string} input.effectiveDate       - YYYY-MM-DD
   * @returns {Promise<{terminationId: string, accepted: boolean, effectiveDate: string, channel: string}>}
   */
  async sendTermination({ supplierName, customer, fullmaktDocId, effectiveDate }) {
    if (!supplierName || !customer?.orgNumber || !fullmaktDocId) {
      throw new Error('sendTermination: supplierName, customer.orgNumber, fullmaktDocId required');
    }

    if (this.mode === 'stub') {
      const terminationId = rid('term');
      const record = {
        id: terminationId,
        supplierName,
        customer,
        fullmaktDocId,
        effectiveDate,
        accepted: true,
        channel: this._inferChannel(supplierName),
        createdAt: new Date().toISOString(),
      };
      this._stubTerminations.set(terminationId, record);
      return {
        terminationId,
        accepted: true,
        effectiveDate,
        channel: record.channel,
      };
    }

    const adapter = this.adapters.get(supplierName);
    if (!adapter) {
      throw new Error(`No live adapter registered for supplier: ${supplierName}`);
    }
    return adapter.sendTermination({ customer, fullmaktDocId, effectiveDate });
  }

  /**
   * Submit a new contract application to the NEW supplier.
   *
   * @param {object} input
   * @param {string} input.supplierName
   * @param {object} input.customer            - { orgName, orgNumber, address, contact }
   * @param {object} input.productConfig       - per-supplier product details
   * @param {string} input.fullmaktDocId
   * @returns {Promise<{applicationId: string, accountNumber: string, expectedActivation: string, status: 'submitted'|'rejected'}>}
   */
  async submitNewApplication({ supplierName, customer, productConfig, fullmaktDocId }) {
    if (!supplierName || !customer?.orgNumber || !fullmaktDocId) {
      throw new Error('submitNewApplication: required fields missing');
    }

    if (this.mode === 'stub') {
      const applicationId = rid('app');
      const accountNumber = `STUB-${supplierName.replace(/\s+/g, '').toUpperCase().slice(0, 6)}-${randomBytes(3).toString('hex').toUpperCase()}`;
      const expectedActivation = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      const record = {
        id: applicationId,
        supplierName,
        customer,
        productConfig,
        fullmaktDocId,
        accountNumber,
        expectedActivation,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      };
      this._stubApplications.set(applicationId, record);
      return {
        applicationId,
        accountNumber,
        expectedActivation,
        status: 'submitted',
      };
    }

    const adapter = this.adapters.get(supplierName);
    if (!adapter) {
      throw new Error(`No live adapter registered for supplier: ${supplierName}`);
    }
    return adapter.submitNewApplication({ customer, productConfig, fullmaktDocId });
  }

  /**
   * Check the status of a submitted application.
   */
  async getApplicationStatus(applicationId) {
    if (this.mode === 'stub') {
      const app = this._stubApplications.get(applicationId);
      if (!app) throw new Error(`Unknown applicationId: ${applicationId}`);
      return {
        applicationId,
        status: app.status,
        accountNumber: app.accountNumber,
        expectedActivation: app.expectedActivation,
      };
    }
    throw new Error('Live application status check not implemented.');
  }

  _inferChannel(supplierName) {
    // Crude heuristic — in real life this is a per-supplier config
    const s = supplierName.toLowerCase();
    if (s.includes('tibber') || s.includes('tele2') || s.includes('bahnhof')) return 'partner-api';
    if (s.includes('vattenfall') || s.includes('telia')) return 'edi';
    return 'email-with-pdf-attached';
  }

  /**
   * (Stub only) Force a status transition on an application.
   */
  __forceApplicationStatus(applicationId, status) {
    if (this.mode !== 'stub') throw new Error('__forceApplicationStatus is stub-only');
    const app = this._stubApplications.get(applicationId);
    if (!app) throw new Error(`Unknown applicationId: ${applicationId}`);
    app.status = status;
  }
}
