// lib/batch-job-store.js
// KV-based storage for batch invoice processing jobs.
//
// Key schema:
//   batch:job:{jobId}      → job metadata + aggregate status
//   batch:inv:{jobId}:{i}  → per-invoice data (PDF, results, status)
//   batch:stage:extracting → Set of jobIds waiting on Batch API
//   batch:queue            → List of pending jobIds (LPUSH / RPOP)
//
// All keys use TTL_SECS to stay GDPR-compliant — same retention as single invoices.

import { getKv } from './kv.js';
import { randomUUID } from 'node:crypto';

const JOB_PREFIX  = 'batch:job:';
const INV_PREFIX  = 'batch:inv:';
const QUEUE_KEY   = 'batch:queue';
const TTL_SECS    = 6 * 60 * 60;   // 6 h — GDPR, same as single-invoice cache

// ── Job lifecycle ────────────────────────────────────────────────────────────

/**
 * Create a new batch job and enqueue it.
 * @param {{ filename: string, pdfB64: string }[]} invoices
 * @returns {string} jobId
 */
export async function createJob(invoices) {
  const kv = getKv();
  if (!kv) throw new Error('KV not configured');

  const jobId = randomUUID();
  const now   = Date.now();

  const job = {
    jobId,
    status:         'pending',   // pending | extracting | processing | done | failed
    total:          invoices.length,
    done:           0,
    failed:         0,
    created:        now,
    started:        null,
    completed:      null,
    extractBatchId: null,        // Anthropic Batch API batch_id for extract step
    metrics:        null,        // production monitor output after completion
  };

  // Store all in a single pipeline when possible — fall back to sequential
  const pipeline = kv.pipeline ? kv.pipeline() : null;
  const set = (k, v) => pipeline ? pipeline.set(k, v, { ex: TTL_SECS }) : kv.set(k, v, { ex: TTL_SECS });

  set(`${JOB_PREFIX}${jobId}`, job);

  for (let i = 0; i < invoices.length; i++) {
    set(`${INV_PREFIX}${jobId}:${i}`, {
      index:          i,
      filename:       invoices[i].filename,
      pdfB64:         invoices[i].pdfB64,
      status:         'pending',  // pending | extracting | processing | done | failed
      extracted:      null,
      categorized:    null,
      recommendation: null,
      route:          null,
      error:          null,
    });
  }

  if (pipeline) {
    await pipeline.exec();
  }

  await kv.lpush(QUEUE_KEY, jobId);

  return jobId;
}

export async function getJob(jobId) {
  const kv = getKv();
  return kv?.get(`${JOB_PREFIX}${jobId}`) ?? null;
}

export async function updateJob(jobId, patch) {
  const kv = getKv();
  if (!kv) return;
  const job = await kv.get(`${JOB_PREFIX}${jobId}`);
  if (!job) return;
  await kv.set(`${JOB_PREFIX}${jobId}`, { ...job, ...patch }, { ex: TTL_SECS });
}

// ── Invoice operations ───────────────────────────────────────────────────────

export async function getInvoice(jobId, index) {
  const kv = getKv();
  return kv?.get(`${INV_PREFIX}${jobId}:${index}`) ?? null;
}

export async function updateInvoice(jobId, index, patch) {
  const kv = getKv();
  if (!kv) return;
  const inv = await kv.get(`${INV_PREFIX}${jobId}:${index}`);
  if (!inv) return;
  await kv.set(`${INV_PREFIX}${jobId}:${index}`, { ...inv, ...patch }, { ex: TTL_SECS });
}

export async function updateInvoiceBatch(jobId, updates) {
  // updates: [{ index, patch }, ...]
  const kv = getKv();
  if (!kv) return;

  const keys     = updates.map(({ index }) => `${INV_PREFIX}${jobId}:${index}`);
  const existing = await kv.mget(...keys);

  const pipeline = kv.pipeline ? kv.pipeline() : null;
  const set = (k, v) => pipeline ? pipeline.set(k, v, { ex: TTL_SECS }) : kv.set(k, v, { ex: TTL_SECS });

  for (let i = 0; i < updates.length; i++) {
    const { index, patch } = updates[i];
    const inv = existing[i];
    if (inv) set(`${INV_PREFIX}${jobId}:${index}`, { ...inv, ...patch });
  }

  if (pipeline) await pipeline.exec();
}

export async function getAllInvoices(jobId, total) {
  const kv = getKv();
  if (!kv || total === 0) return [];
  const keys = Array.from({ length: total }, (_, i) => `${INV_PREFIX}${jobId}:${i}`);
  return kv.mget(...keys);
}

// ── Queue operations ─────────────────────────────────────────────────────────

export async function popNextPendingJob() {
  const kv = getKv();
  return kv?.rpop(QUEUE_KEY) ?? null;
}

// Track jobs currently waiting on Batch API results
export async function markExtractingJob(jobId) {
  const kv = getKv();
  await kv?.sadd('batch:stage:extracting', jobId);
}

export async function getExtractingJobs() {
  const kv = getKv();
  return (await kv?.smembers('batch:stage:extracting')) ?? [];
}

export async function clearExtractingJob(jobId) {
  const kv = getKv();
  await kv?.srem('batch:stage:extracting', jobId);
}

// Track jobs in categorize+recommend processing stage
export async function markProcessingJob(jobId) {
  const kv = getKv();
  await kv?.sadd('batch:stage:processing', jobId);
}

export async function getProcessingJobs() {
  const kv = getKv();
  return (await kv?.smembers('batch:stage:processing')) ?? [];
}

export async function clearProcessingJob(jobId) {
  const kv = getKv();
  await kv?.srem('batch:stage:processing', jobId);
}
