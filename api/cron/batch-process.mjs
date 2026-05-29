// api/cron/batch-process.mjs
// Vercel Cron Job — runs every 2 minutes to advance batch invoice processing.
//
// State machine per job:
//   pending    → submit Anthropic Batch API extract → status: extracting
//   extracting → poll Batch API → if done → status: processing, add to processing set
//   processing → run one chunk of categorize+recommend → advance processingChunk
//              → when all chunks done → status: done, run production monitor
//
// One cron run does:
//   1. Pop + submit ONE pending job
//   2. Poll ALL extracting jobs (fast — one API call each)
//   3. Advance ONE processing job by ONE chunk of CHUNK_SIZE invoices
//
// This keeps each invocation well within the 300s Vercel Pro cron limit.

import {
  popNextPendingJob, getJob, updateJob, getAllInvoices, updateInvoiceBatch,
  markExtractingJob, getExtractingJobs, clearExtractingJob,
  markProcessingJob, getProcessingJobs, clearProcessingJob,
} from '../../lib/batch-job-store.js';
import {
  submitExtractBatch, pollExtractBatch, processCategorizeRecommend,
} from '../../lib/batch-processor.js';
import { analyzeResults, storeMetrics } from '../../lib/production-monitor.js';

export const config = { maxDuration: 300 };

const CHUNK_SIZE = 20;

export default async function handler(req, res) {
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const log = [];
  const t0  = Date.now();

  try {
    // ── 1. Submit one pending job ─────────────────────────────────────────────
    const pendingJobId = await popNextPendingJob();
    if (pendingJobId) {
      await advancePendingJob(pendingJobId, log);
    }

    // ── 2. Poll all extracting jobs ───────────────────────────────────────────
    const extractingIds = await getExtractingJobs();
    for (const jobId of extractingIds) {
      await pollExtractingJob(jobId, log);
    }

    // ── 3. Advance one processing job by one chunk ────────────────────────────
    const processingIds = await getProcessingJobs();
    if (processingIds.length > 0) {
      await advanceProcessingChunk(processingIds[0], log);
    }

    const elapsed = Date.now() - t0;
    console.log(`[cron/batch-process] ${elapsed}ms. ${log.join(' | ')}`);
    return res.status(200).json({ ok: true, elapsed, log });
  } catch (err) {
    console.error('[cron/batch-process] fatal:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

// ── Stage handlers ────────────────────────────────────────────────────────────

async function advancePendingJob(jobId, log) {
  const job = await getJob(jobId);
  if (!job || job.status !== 'pending') {
    log.push(`skip pending ${jobId} (status=${job?.status})`);
    return;
  }

  try {
    const invoices = await getAllInvoices(jobId, job.total);
    const batchId  = await submitExtractBatch(invoices);

    await Promise.all([
      updateJob(jobId, { status: 'extracting', extractBatchId: batchId, started: Date.now() }),
      markExtractingJob(jobId),
      updateInvoiceBatch(jobId, invoices.map((_, i) => ({ index: i, patch: { status: 'extracting' } }))),
    ]);

    log.push(`submitted ${jobId} (${job.total} invoices) batchId=${batchId}`);
  } catch (err) {
    console.error(`[batch-process] submit ${jobId}:`, err.message);
    await updateJob(jobId, { status: 'failed', error: err.message });
    log.push(`FAIL submit ${jobId}: ${err.message}`);
  }
}

async function pollExtractingJob(jobId, log) {
  const job = await getJob(jobId);
  if (!job || job.status !== 'extracting' || !job.extractBatchId) return;

  try {
    const { done, results } = await pollExtractBatch(job.extractBatchId);
    if (!done) {
      log.push(`${jobId} still extracting`);
      return;
    }

    const updates = [];
    for (const [index, extracted] of results.entries()) {
      updates.push({
        index,
        patch: {
          status:    extracted ? 'processing' : 'failed',
          extracted: extracted ?? null,
          error:     extracted ? null : 'extract failed',
        },
      });
    }

    await updateInvoiceBatch(jobId, updates);
    await clearExtractingJob(jobId);
    await Promise.all([
      updateJob(jobId, { status: 'processing', processingChunk: 0 }),
      markProcessingJob(jobId),
    ]);

    log.push(`${jobId} extract done (${results.size} results) → processing`);
  } catch (err) {
    console.error(`[batch-process] poll ${jobId}:`, err.message);
    log.push(`poll error ${jobId}: ${err.message}`);
  }
}

async function advanceProcessingChunk(jobId, log) {
  const job = await getJob(jobId);
  if (!job || job.status !== 'processing') {
    await clearProcessingJob(jobId); // stale entry
    return;
  }

  const chunk = job.processingChunk ?? 0;
  const start = chunk * CHUNK_SIZE;

  if (start >= job.total) {
    await finalizeJob(jobId, job, log);
    return;
  }

  try {
    const allInvoices = await getAllInvoices(jobId, job.total);
    const slice       = allInvoices.slice(start, start + CHUNK_SIZE);

    const items = slice
      .map((inv, i) => ({ inv, extracted: inv?.extracted, globalIdx: start + i }))
      .filter((x) => x.extracted);

    if (items.length === 0) {
      // All in this slice already failed at extract — advance chunk
      const nextChunk = chunk + 1;
      await updateJob(jobId, { processingChunk: nextChunk });
      if (nextChunk * CHUNK_SIZE >= job.total) {
        await finalizeJob(jobId, await getJob(jobId), log);
      }
      return;
    }

    const catResults = await processCategorizeRecommend(
      items.map(({ inv, extracted }) => ({ inv, extracted })),
      job.customer
    );

    let chunkDone = 0, chunkFailed = 0;
    const updates = items.map(({ globalIdx }, i) => {
      const r = catResults[i];
      const ok = r.route !== 'error';
      if (ok) chunkDone++; else chunkFailed++;
      return {
        index: globalIdx,
        patch: {
          status:         ok ? 'done' : 'failed',
          route:          r.route,
          categorized:    r.categorized   ?? null,
          recommendation: r.recommendation ?? null,
          error:          r.error          ?? null,
        },
      };
    });

    const nextChunk = chunk + 1;
    await updateInvoiceBatch(jobId, updates);
    await updateJob(jobId, {
      processingChunk: nextChunk,
      done:   (job.done   ?? 0) + chunkDone,
      failed: (job.failed ?? 0) + chunkFailed,
    });

    log.push(`${jobId} chunk ${chunk} (${chunkDone} ok, ${chunkFailed} fail)`);

    if (nextChunk * CHUNK_SIZE >= job.total) {
      await finalizeJob(jobId, await getJob(jobId), log);
    }
  } catch (err) {
    console.error(`[batch-process] chunk ${chunk} ${jobId}:`, err.message);
    log.push(`chunk ${chunk} error ${jobId}: ${err.message}`);
  }
}

async function finalizeJob(jobId, job, log) {
  try {
    const allInvoices = await getAllInvoices(jobId, job.total);

    const results = allInvoices.map((inv) => ({
      route:          inv?.route          ?? 'error',
      extracted:      inv?.extracted      ?? null,
      categorized:    inv?.categorized    ?? null,
      recommendation: inv?.recommendation ?? null,
      error:          inv?.error          ?? null,
    }));

    const metrics   = analyzeResults(results);
    const totalDone = results.filter((r) => r.route !== 'error' && r.route !== null).length;
    const totalFail = results.filter((r) => r.route === 'error' || r.route === null).length;

    await Promise.all([
      storeMetrics(metrics),
      clearProcessingJob(jobId),
      updateJob(jobId, {
        status:    'done',
        done:      totalDone,
        failed:    totalFail,
        completed: Date.now(),
        metrics,
      }),
    ]);

    log.push(`${jobId} DONE (${totalDone} ok, ${totalFail} fail)`);
  } catch (err) {
    console.error(`[batch-process] finalize ${jobId}:`, err.message);
    await Promise.all([
      clearProcessingJob(jobId),
      updateJob(jobId, { status: 'failed', error: err.message }),
    ]);
  }
}
