// api/batch-status.mjs
// GET /api/batch-status?jobId=xxx[&page=0&size=20]
//
// Returns job metadata and a paginated slice of per-invoice results.
// Poll this during processing to show live progress.
//
// Response: {
//   ok: true,
//   job: { jobId, status, total, done, failed, created, started, completed, metrics },
//   invoices: [{ index, filename, status, route, extracted, categorized, recommendation, error }],
//   page: number,
//   pages: number,
// }

import { getJob, getAllInvoices } from '../lib/batch-job-store.js';

export const config = { maxDuration: 15 };

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE     = 100;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobId, page: pageStr, size: sizeStr } = req.query ?? {};
  if (!jobId || typeof jobId !== 'string') {
    return res.status(400).json({ error: 'jobId is required' });
  }

  const page = Math.max(0, parseInt(pageStr ?? '0', 10) || 0);
  const size = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(sizeStr ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE));

  const job = await getJob(jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found (may have expired)' });
  }

  // Fetch all invoice records and paginate in-process (batches are ≤500 items,
  // mget on full set is cheaper than multiple round-trips for small jobs)
  const all = await getAllInvoices(jobId, job.total);

  const pages   = Math.ceil(all.length / size);
  const slice   = all.slice(page * size, page * size + size);

  // Strip pdfB64 from response — large and no longer needed by the frontend
  const invoices = slice.map((inv) => {
    if (!inv) return null;
    const { pdfB64, ...rest } = inv;  // eslint-disable-line no-unused-vars
    return rest;
  });

  return res.status(200).json({
    ok: true,
    job: {
      jobId:     job.jobId,
      status:    job.status,
      total:     job.total,
      done:      job.done,
      failed:    job.failed,
      created:   job.created,
      started:   job.started,
      completed: job.completed,
      metrics:   job.metrics ?? null,
    },
    invoices,
    page,
    pages,
  });
}
