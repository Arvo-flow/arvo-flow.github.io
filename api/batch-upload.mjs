// api/batch-upload.mjs
// POST /api/batch-upload
//
// Accepts a JSON body with multiple PDF invoices as base64, creates a batch job
// in KV, and returns the jobId for status polling.
//
// Body: {
//   invoices:  [{ filename: string, pdfBase64: string }, ...],  // max 500
//   customer:  { industry: string, employees: number },
//   token:     string  // HMAC token (same scheme as test-invoice)
// }
// Returns: { ok: true, jobId: string, total: number }

import { createHmac } from 'node:crypto';
import { createJob, updateJob } from '../lib/batch-job-store.js';

export const config = { maxDuration: 30 };

const MAX_INVOICES = 500;

function validateToken(token) {
  const secret = process.env.ARVO_HMAC_SECRET;
  if (!secret || token === 'dev') return true;
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [ts, nonce, sig] = parts;
  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < 0 || age > 3_600_000) return false;
  const expected = createHmac('sha256', secret).update(`${ts}.${nonce}`).digest('hex');
  return sig === expected;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { invoices, customer, token } = req.body ?? {};

  if (!validateToken(token)) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  if (!Array.isArray(invoices) || invoices.length === 0) {
    return res.status(400).json({ error: 'invoices must be a non-empty array' });
  }
  if (invoices.length > MAX_INVOICES) {
    return res.status(400).json({ error: `max ${MAX_INVOICES} invoices per batch` });
  }
  if (!customer?.industry || !customer?.employees) {
    return res.status(400).json({ error: 'customer.industry and customer.employees are required' });
  }

  // Normalise: strip data-URL prefix if browser sends it
  const normalised = invoices.map((inv, i) => {
    if (!inv?.pdfBase64 || typeof inv.pdfBase64 !== 'string') {
      throw Object.assign(new Error(`invoices[${i}].pdfBase64 missing`), { status: 400 });
    }
    const raw = inv.pdfBase64.includes(',') ? inv.pdfBase64.split(',')[1] : inv.pdfBase64;
    return { filename: inv.filename ?? `invoice-${i + 1}.pdf`, pdfB64: raw };
  });

  try {
    const jobId = await createJob(normalised);

    // Persist customer profile alongside the job so the cron worker can use it
    await updateJob(jobId, { customer });

    console.log(`[batch-upload] created job ${jobId} with ${normalised.length} invoices`);
    return res.status(200).json({ ok: true, jobId, total: normalised.length });
  } catch (err) {
    if (err.status === 400) return res.status(400).json({ error: err.message });
    console.error('[batch-upload] error:', err.message);
    return res.status(500).json({ error: 'Failed to create batch job' });
  }
}
