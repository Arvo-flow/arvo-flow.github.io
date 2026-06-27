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
// Samtidighet per våg: bunden så vi inte spränger Anthropics rate limit (felklassen vi sett).
// 5 parallella × ~8s ≈ en våg på 8s i stället för 40s sekventiellt.
const CONCURRENCY = Number(process.env.INGEST_DRAIN_CONCURRENCY) || 5;
// Hur många jobb vi claimar per våg (= samtidigheten — en claim, en parallell våg).
const BATCH = Number(process.env.INGEST_DRAIN_BATCH) || CONCURRENCY;
// Vi loopar vågor inom EN invokation tills kön är tom eller vi närmar oss 60s-taket.
// 45s lämnar marginal för att en redan startad våg (~8–12s) ska hinna klart före maxDuration 60s.
const TIME_BUDGET_MS = Number(process.env.INGEST_DRAIN_BUDGET_MS) || 45_000;
// Per-faktura-tak: en hängande analys får inte äta hela budgeten (jobbet blir stale → reclaimas).
const JOB_TIMEOUT_MS = Number(process.env.INGEST_DRAIN_JOB_TIMEOUT_MS) || 40_000;
const sha16 = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 16);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// Analyserar EN faktura via samma pipeline (regel 1). Uppdaterar kön (complete/fail). Kastar aldrig.
async function processJob(job) {
  try {
    const pdf = await fetchInboundPdfByIndex(job.emailId, job.attachmentIndex);
    if (!pdf || pdf.tooBig || !pdf.content) {
      await failJob(job.id, pdf?.tooBig ? 'PDF > 6 MB' : 'PDF kunde inte hämtas');
      return false;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), JOB_TIMEOUT_MS);
    let r;
    try {
      r = await fetch(`${BASE_URL}/api/test-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
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
    } finally {
      clearTimeout(timer);
    }
    const a = await r.json().catch(() => null);
    if (a?.ok) { await completeJob(job.id); return true; }
    await failJob(job.id, `analys misslyckades (HTTP ${r.status})`);
    return false;
  } catch (err) {
    await failJob(job.id, err.message);
    return false;
  }
}

export default async function handler(req, res) {
  // Vercel-cron triggar GET med Authorization: Bearer <CRON_SECRET>; manuell körning kan POSTa likadant.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return send(res, 401, { error: 'unauthorized' });
  }

  const deadline = Date.now() + TIME_BUDGET_MS;
  let done = 0, failed = 0, claimed = 0, waves = 0;

  // Loopa vågor tills kön är tom ELLER vi närmar oss 60s-taket. claimBatch är atomisk
  // (FOR UPDATE SKIP LOCKED) → överlappande invokationer/vågor dubbel-claimar aldrig.
  while (Date.now() < deadline) {
    const jobs = await claimBatch(BATCH);
    if (!jobs.length) break;                        // kön tom → klart
    claimed += jobs.length;
    waves++;
    const results = await Promise.all(jobs.map(processJob));   // bunden parallell våg (BATCH ≤ CONCURRENCY)
    for (const ok of results) { if (ok) done++; else failed++; }
  }

  console.log(`[drain-ingest] klar: ${done} klara · ${failed} fel · ${claimed} claimade i ${waves} våg(or)`);
  return send(res, 200, { ok: true, drained: done, failed, claimed, waves });
}
