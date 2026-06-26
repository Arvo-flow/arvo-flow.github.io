// api/cron/drain-ingest.mjs — drain-arbetaren för asynkron faktura-kö (bulk-ingest).
//
// Webhooken (api/inbound-email) köar ett jobb per PDF när en kund matar in >2 fakturor. Den här
// cronen betar av kön i bundna batchar — så att 50–100 fakturor analyseras utan att spränga 60s.
// Kör frekvent (vercel.json). Idempotent + retry: claimBatch tar bara obearbetade/stale jobb,
// failJob lägger tillbaka för omtag tills attempts-taket. Varje analys = SAMMA pipeline som
// /testa-faktura och mail-in (regel 1), nycklad på avsändaren → landar i kundens kontor.

import { createHash } from 'node:crypto';
import { claimBatch, completeJob, failJob } from '../../lib/ingest-queue.js';
import { fetchInboundPdfByIndex } from '../inbound-email.mjs';

export const config = { maxDuration: 60 };

const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';
const BATCH = Number(process.env.INGEST_DRAIN_BATCH) || 6;   // ~6 × 8s ≈ 48s < 60s maxDuration
const sha16 = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 16);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  // Vercel-cron triggar GET med Authorization: Bearer <CRON_SECRET>; manuell körning kan POSTa likadant.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return send(res, 401, { error: 'unauthorized' });
  }

  const jobs = await claimBatch(BATCH);
  if (!jobs.length) return send(res, 200, { ok: true, drained: 0 });

  let done = 0, failed = 0;
  for (const job of jobs) {
    try {
      const pdf = await fetchInboundPdfByIndex(job.emailId, job.attachmentIndex);
      if (!pdf || pdf.tooBig || !pdf.content) {
        await failJob(job.id, pdf?.tooBig ? 'PDF > 6 MB' : 'PDF kunde inte hämtas');
        failed++;
        continue;
      }
      // EN pipeline (regel 1) — samma analys som /testa-faktura och inline mail-in.
      const r = await fetch(`${BASE_URL}/api/test-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64:   pdf.content,
          industry:    'ovrigt',
          employees:   10,
          bypass:      process.env.ARVO_BYPASS_SECRET,
          email:       job.sender,
          userEmail:   job.sender,
          fingerprint: `mail:${sha16(job.sender)}`,
        }),
      });
      const a = await r.json().catch(() => null);
      if (a?.ok) { await completeJob(job.id); done++; }
      else { await failJob(job.id, `analys misslyckades (HTTP ${r.status})`); failed++; }
    } catch (err) {
      await failJob(job.id, err.message);
      failed++;
    }
  }

  console.log(`[drain-ingest] batch klar: ${done} klara · ${failed} fel (av ${jobs.length} claimade)`);
  return send(res, 200, { ok: true, drained: done, failed, claimed: jobs.length });
}
