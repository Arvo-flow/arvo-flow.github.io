// agents/orchestrator/webhooks/scrive.js
// Express route skeleton for receiving Scrive's signed-document webhook.
//
// In production:
//   1. Configure Scrive to POST to https://api.arvo.flow/webhooks/scrive
//      whenever a document changes status.
//   2. Scrive signs the webhook payload with HMAC-SHA256 using a shared
//      secret (set in Scrive admin + our env). We MUST verify it before
//      trusting any field — webhook endpoints are public.
//   3. On valid signed event, look up the switch by document_id and call
//      orchestrator.handleSigned(switchId, signedPdfBytes).
//
// This file is a SKELETON. The handler shape and signature-verification
// stub are real; the orchestrator hookup is left as a TODO comment that
// the consumer wires up in their server entry point.

import { createHmac, timingSafeEqual } from 'node:crypto';

const WEBHOOK_SECRET_ENV = 'SCRIVE_WEBHOOK_SECRET';

/**
 * Verify Scrive's HMAC-SHA256 webhook signature.
 *
 * @param {object} req - Express-like request (must have rawBody set by middleware)
 * @returns {{ valid: boolean, reason?: string }}
 */
export function verifyScriveSignature(req) {
  const secret = process.env[WEBHOOK_SECRET_ENV];
  if (!secret) {
    return { valid: false, reason: `${WEBHOOK_SECRET_ENV} not configured` };
  }
  const sig = req.headers['x-scrive-signature'];
  if (!sig || typeof sig !== 'string') {
    return { valid: false, reason: 'missing X-Scrive-Signature header' };
  }
  if (!req.rawBody) {
    return {
      valid: false,
      reason: 'rawBody not available — set up express.json({ verify: (r,_,buf) => r.rawBody = buf }) middleware',
    };
  }
  const expected = createHmac('sha256', secret).update(req.rawBody).digest('hex');
  // timingSafeEqual requires equal-length buffers; bail early if lengths differ
  if (sig.length !== expected.length) {
    return { valid: false, reason: 'signature length mismatch' };
  }
  const a = Buffer.from(sig, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (!timingSafeEqual(a, b)) {
    return { valid: false, reason: 'signature mismatch' };
  }
  return { valid: true };
}

/**
 * Build an Express handler. Pass in your orchestrator instance + scrive client
 * so the handler can fetch the signed PDF and advance the state machine.
 *
 * Usage in your server/index.js:
 *
 *   import express from 'express';
 *   import { buildScriveWebhookHandler } from './agents/orchestrator/webhooks/scrive.js';
 *   import { Orchestrator } from './agents/orchestrator/orchestrator.js';
 *   import { ScriveClient } from './agents/orchestrator/clients/scrive.js';
 *
 *   const app = express();
 *   app.use(express.json({ verify: (req, _res, buf) => { req.rawBody = buf; } }));
 *
 *   const orchestrator = new Orchestrator({ ... });
 *   const scrive = new ScriveClient({ mode: 'live', apiKey: process.env.SCRIVE_API_KEY });
 *
 *   app.post('/webhooks/scrive', buildScriveWebhookHandler({ orchestrator, scrive }));
 */
export function buildScriveWebhookHandler({ orchestrator, scrive, logger = console }) {
  return async function scriveWebhookHandler(req, res) {
    const sig = verifyScriveSignature(req);
    if (!sig.valid) {
      logger.warn(`[scrive-webhook] rejected: ${sig.reason}`);
      return res.status(401).json({ error: 'invalid_signature', reason: sig.reason });
    }

    const event = req.body;
    if (!event?.document_id || !event?.status) {
      return res.status(400).json({ error: 'invalid_payload' });
    }

    try {
      // Find the switch this document belongs to
      const switchRecord = await orchestrator.findBySigningDocId(event.document_id);
      if (!switchRecord) {
        logger.warn(`[scrive-webhook] no switch found for document ${event.document_id}`);
        // 200 anyway — Scrive doesn't need to retry
        return res.status(200).json({ ok: true, ignored: true });
      }

      switch (event.status) {
        case 'signed':
        case 'closed': {
          const signedPdf = await scrive.downloadSignedPdf(event.document_id);
          await orchestrator.handleSigned(switchRecord.id, {
            signedPdfBytes: signedPdf,
            scriveDocId: event.document_id,
            signedSsn: event.signatory_personal_number ?? null,
            signedAt: event.signing_time ?? new Date().toISOString(),
          });
          break;
        }
        case 'rejected':
        case 'cancelled': {
          await orchestrator.handleCancelled(switchRecord.id, {
            reason: `scrive:${event.status}`,
            scriveDocId: event.document_id,
          });
          break;
        }
        case 'timed_out':
        case 'expired': {
          await orchestrator.handleSigningExpired(switchRecord.id, {
            scriveDocId: event.document_id,
          });
          break;
        }
        default:
          logger.info(`[scrive-webhook] unhandled status: ${event.status}`);
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      logger.error('[scrive-webhook] handler error', err);
      // 500 → Scrive will retry
      return res.status(500).json({ error: 'handler_failure' });
    }
  };
}
