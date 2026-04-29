// agents/orchestrator/clients/scrive.js
// Stubbed Scrive (BankID e-signing) client.
//
// The PUBLIC SURFACE matches Scrive's REST API conceptually (createDocument,
// pollStatus, downloadSigned, cancel). The IMPLEMENTATION is a deterministic
// in-memory stub that simulates an async signing flow. Swap to real Scrive
// by replacing each method body — no consumer code should change.
//
// Real Scrive docs: https://scrive.com/api
// Auth: POST /api/v2/oauth/token to get bearer
// Document creation: POST /api/v2/documents/new with PDF + signatories
// Polling: GET /api/v2/documents/{id} until status === "signed" | "rejected"
// Signed PDF: GET /api/v2/documents/{id}/files/main → application/pdf

import { randomBytes } from 'node:crypto';

function rid(prefix) {
  return `${prefix}_${randomBytes(6).toString('hex')}`;
}

export class ScriveClient {
  /**
   * @param {object} [opts]
   * @param {'stub'|'live'} [opts.mode='stub']
   * @param {string} [opts.apiKey]                  - required when mode='live'
   * @param {string} [opts.baseUrl='https://api.scrive.com']
   * @param {number} [opts.stubAutoSignAfterPolls=2] - simulate signing after N pollDocumentStatus calls
   */
  constructor(opts = {}) {
    this.mode = opts.mode ?? 'stub';
    this.apiKey = opts.apiKey;
    this.baseUrl = opts.baseUrl ?? 'https://api.scrive.com';
    this.stubAutoSignAfterPolls = opts.stubAutoSignAfterPolls ?? 2;
    this._stubDocs = new Map();

    if (this.mode === 'live' && !this.apiKey) {
      throw new Error('ScriveClient: apiKey required for live mode');
    }
  }

  /**
   * Send a PDF to Scrive for signing.
   *
   * @param {object} input
   * @param {Buffer} input.pdfBytes              - the fullmakt PDF
   * @param {string} input.title                 - document title
   * @param {Array<object>} input.signers        - [{ name, email, ssn?, role? }]
   * @param {object} [input.metadata]
   * @returns {Promise<{documentId: string, signingUrl: string, expiresAt: string}>}
   */
  async createDocument({ pdfBytes, title, signers, metadata = {} }) {
    if (!Buffer.isBuffer(pdfBytes) && !(pdfBytes instanceof Uint8Array)) {
      throw new Error('createDocument: pdfBytes required (Buffer or Uint8Array)');
    }
    if (!signers?.length) throw new Error('createDocument: at least one signer required');

    if (this.mode === 'stub') {
      const documentId = rid('scrive_doc');
      const signingUrl = `https://stub.scrive.com/sign/${documentId}`;
      const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
      this._stubDocs.set(documentId, {
        id: documentId,
        status: 'pending',
        title,
        signers,
        metadata,
        createdAt: new Date().toISOString(),
        expiresAt,
        signedAt: null,
        signedPdfBytes: null,
        signedSsn: signers[0].ssn ?? null,
        _polls: 0,
      });
      return { documentId, signingUrl, expiresAt };
    }

    // Live mode — replace with real Scrive POST /api/v2/documents/new
    throw new Error('Scrive live mode not implemented. Swap implementation here.');
  }

  /**
   * Check signing status. Pollable.
   *
   * @returns {Promise<{documentId: string, status: 'pending'|'signed'|'cancelled'|'expired'|'rejected', signedAt?: string, signedSsn?: string}>}
   */
  async pollDocumentStatus(documentId) {
    if (this.mode === 'stub') {
      const doc = this._stubDocs.get(documentId);
      if (!doc) throw new Error(`Unknown documentId: ${documentId}`);

      // Auto-progress simulation: after N polls, transition to signed
      doc._polls += 1;
      if (doc.status === 'pending' && doc._polls >= this.stubAutoSignAfterPolls) {
        doc.status = 'signed';
        doc.signedAt = new Date().toISOString();
        // The "signed PDF" in stub mode is just the original — real Scrive
        // returns a new PDF with signature pages appended.
        doc.signedPdfBytes = Buffer.from('SIGNED_STUB_PDF_PLACEHOLDER', 'utf8');
      }

      return {
        documentId,
        status: doc.status,
        signedAt: doc.signedAt,
        signedSsn: doc.signedSsn,
      };
    }

    throw new Error('Scrive live mode not implemented.');
  }

  /**
   * Download the final signed PDF (with signature pages from Scrive).
   * Throws if document isn't yet signed.
   *
   * @returns {Promise<Buffer>}
   */
  async downloadSignedPdf(documentId) {
    if (this.mode === 'stub') {
      const doc = this._stubDocs.get(documentId);
      if (!doc) throw new Error(`Unknown documentId: ${documentId}`);
      if (doc.status !== 'signed') {
        throw new Error(`Cannot download — document is "${doc.status}"`);
      }
      return doc.signedPdfBytes;
    }
    throw new Error('Scrive live mode not implemented.');
  }

  /**
   * Cancel a pending signing flow.
   */
  async cancelDocument(documentId, { reason } = {}) {
    if (this.mode === 'stub') {
      const doc = this._stubDocs.get(documentId);
      if (!doc) throw new Error(`Unknown documentId: ${documentId}`);
      if (doc.status === 'signed') throw new Error('Cannot cancel — already signed');
      doc.status = 'cancelled';
      doc.cancelledAt = new Date().toISOString();
      doc.cancelReason = reason ?? null;
      return { documentId, status: 'cancelled' };
    }
    throw new Error('Scrive live mode not implemented.');
  }

  /**
   * (Stub only) Force a state transition for testing — never available in live.
   */
  __forceState(documentId, status) {
    if (this.mode !== 'stub') {
      throw new Error('__forceState is stub-only');
    }
    const doc = this._stubDocs.get(documentId);
    if (!doc) throw new Error(`Unknown documentId: ${documentId}`);
    doc.status = status;
    if (status === 'signed') {
      doc.signedAt = new Date().toISOString();
      doc.signedPdfBytes = Buffer.from('SIGNED_STUB_PDF_PLACEHOLDER', 'utf8');
    }
  }
}
