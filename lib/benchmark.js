// lib/benchmark.js — Benchmark engine: DB + KV cache + mock fallback.
//
// READ PATH:
//   1. Check Vercel KV cache (TTL 6h)
//   2. Cache miss → query Neon Postgres for percentiles
//   3. Segment has ≥ MIN_POINTS real datapoints → return real data
//   4. < MIN_POINTS → fall back to mock from branchindex.js
//
// WRITE PATH:
//   storeDatapoint() inserts one anonymized row and invalidates the cache.
//   Non-fatal: storage failure never breaks the main request.
//
// Both DB and KV degrade gracefully to null when env vars are absent,
// so the function works in local dev without any infrastructure.

import { getDb } from './db.js';
import { getKv } from './kv.js';
import { Resend } from 'resend';
import {
  getBenchmark as getMockBenchmark,
  bucketForSize,
  INDUSTRIES,
  INDUSTRY_SEGMENT_MAP,
} from '../agents/recommender/branchindex.js';

const MIN_POINTS      = 10;
const MIN_LIVE_POINTS = 5;  // lower threshold for invoice_analyses — all historical data
const CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 h

// Employee ranges per size bucket — used for invoice_analyses cross-customer query
const BUCKET_RANGES = {
  micro: { min: 1,  max: 9   },
  small: { min: 10, max: 49  },
  mid:   { min: 50, max: 249 },
};
const FROM_ALERT = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvo-flow.se>';
const ALERT_TO   = process.env.ARVO_ALERT_EMAIL ?? 'team@arvo-flow.se';

function cacheKey(category, industry, sizeBucket) {
  return `bm:v2:${category}:${industry}:${sizeBucket}`;
}

async function notifyOutlier({ category, supplier, annualCost, bucket, zScore, mean, stddev, n }) {
  if (!process.env.RESEND_API_KEY) return;
  const ts  = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  const fmt = (v) => Math.round(v).toLocaleString('sv-SE');
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    FROM_ALERT,
      to:      ALERT_TO,
      subject: `[Outlier] ${category} · ${fmt(annualCost)} kr/år · z=${zScore.toFixed(2)}`,
      html: `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#EEF4F1;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;max-width:560px;width:100%">
  <tr><td style="background:linear-gradient(145deg,#1E3A5F 0%,#1D4ED8 100%);padding:22px 28px">
    <p style="margin:0 0 4px;font-size:10px;color:rgba(147,197,253,0.85);text-transform:uppercase;letter-spacing:.12em">Arvo intern — datakvalitet</p>
    <p style="margin:0;font-size:20px;font-weight:700;color:#fff">Outlier stoppad · ${category}</p>
  </td></tr>
  <tr><td style="padding:22px 28px 0">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:33%;vertical-align:top;padding-right:12px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Inkommande värde</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#DC2626">${fmt(annualCost)} kr</p>
        </td>
        <td style="width:33%;vertical-align:top;padding:0 12px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Segment-medel ± σ</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17">${fmt(mean)} kr</p>
          <p style="margin:2px 0 0;font-size:13px;color:#5C6E68">±${fmt(stddev)} kr (n=${n})</p>
        </td>
        <td style="width:33%;vertical-align:top;padding-left:12px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Z-score</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#DC2626">${zScore.toFixed(2)}σ</p>
          <p style="margin:2px 0 0;font-size:11px;color:#5C6E68">Tröskel: 3.00σ</p>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 28px">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#EFF6FF;border-left:3px solid #1D4ED8;border-radius:0 6px 6px 0;padding:12px 16px">
        <p style="margin:0;font-size:13px;color:#1E3A5F;line-height:1.5">
          <strong>Leverantör:</strong> ${supplier ?? '–'} &nbsp;·&nbsp;
          <strong>Bucket:</strong> ${bucket} &nbsp;·&nbsp;
          <strong>Datapunkten sparades inte.</strong>
        </p>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="border-top:1px solid #D5E2DC;padding:12px 28px;background:#F4F9F7">
    <p style="margin:0;font-size:11px;color:#8A9E97">Arvo Flow · ${ts}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
    });
  } catch (err) {
    console.error('[benchmark] notifyOutlier failed:', err.message);
  }
}

export async function getBenchmark({ category, industry, employees }) {
  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const bucket = bucketForSize(employees ?? 5);
  const key = cacheKey(category, ind, bucket);

  // 1. KV cache
  const kv = getKv();
  if (kv) {
    try {
      const cached = await kv.get(key);
      if (cached) return cached;
    } catch { /* non-fatal */ }
  }

  // 2. Postgres
  const db = getDb();
  if (db) {
    try {
      const rows = await db`
        SELECT
          COUNT(*)::int                                                          AS n,
          ROUND(percentile_cont(0.5)  WITHIN GROUP (ORDER BY annual_cost))::int AS median,
          ROUND(percentile_cont(0.25) WITHIN GROUP (ORDER BY annual_cost))::int AS p25
        FROM invoice_datapoints
        WHERE category    = ${category}
          AND industry    = ${ind}
          AND size_bucket = ${bucket}
      `;
      const row = rows[0];
      if (row && row.n >= MIN_POINTS) {
        const mock = getMockBenchmark({ category, industry: ind, employees });
        const result = {
          ...(mock ?? {}),
          median: row.median,
          p25: row.p25,
          source: 'real',
          n: row.n,
        };
        if (kv) try { await kv.set(key, result, { ex: CACHE_TTL_SECONDS }); } catch { /* non-fatal */ }
        return result;
      }
    } catch (err) {
      console.error('[benchmark] DB error:', err.message);
    }
  }

  // 2.5. invoice_analyses — live cross-customer benchmarks (all historical data).
  // Returns total annual-cost percentiles tagged with isTotal:true so recommend.js
  // skips the per-seat scale multiplication (values are already company-level totals).
  if (db) {
    try {
      const range = BUCKET_RANGES[bucket] ?? BUCKET_RANGES.micro;
      const liveRows = await db`
        SELECT
          COUNT(*)::int AS n,
          ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY annual_cost))::int AS median,
          ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY annual_cost))::int AS p25
        FROM invoice_analyses
        WHERE category    = ${category}
          AND route       = 'auto'
          AND annual_cost > 500
          AND annual_cost < 5000000
          AND employees   >= ${range.min}
          AND employees   <= ${range.max}
      `;
      const lr = liveRows[0];
      if (lr && lr.n >= MIN_LIVE_POINTS) {
        const mock = getMockBenchmark({ category, industry: ind, employees });
        const result = {
          ...(mock ?? {}),
          median:  lr.median,
          p25:     lr.p25,
          source:  'live_analyses',
          isTotal: true,
          n:       lr.n,
        };
        if (kv) try { await kv.set(key, result, { ex: CACHE_TTL_SECONDS }); } catch { /* non-fatal */ }
        return result;
      }
    } catch (err) {
      console.error('[benchmark] invoice_analyses query error:', err.message);
    }
  }

  // 3. Mock fallback — never cached in KV since branchindex.js can be redeployed.
  // Preserve the category's source tier ('real-public', 'estimated') if set.
  const mock = getMockBenchmark({ category, industry: ind, employees });
  if (!mock) return null;
  return { ...mock, source: mock.source ?? 'mock', n: 0 };
}

export async function storeDatapoint({ category, supplier, annualCost, industry, employees }) {
  const db = getDb();
  if (!db) return;

  // Absoluta gränser: fångar test-uploads och extraheringsfel oavsett poolstorlek.
  // Under 500 kr/år = osannolikt reellt avtal. Över 5 M kr/år = utanför SMB-skalan.
  if (!annualCost || annualCost < 500 || annualCost > 5_000_000) return;

  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const bucket = bucketForSize(employees ?? 5);

  try {
    // Outlier-spärr (3 sigma): aktiveras vid N ≥ MIN_POINTS.
    // Under MIN_POINTS är samplet för litet för meningsfull std dev — de absoluta
    // gränserna ovan är enda skyddet i cold-start-fasen, vilket är medvetet.
    // 3σ (ej 2σ): fakturadata är högersnedvriden — 2σ avvisar ~4,6 % legitim data.
    const statsRows = await db`
      SELECT
        COUNT(*)::int              AS n,
        AVG(annual_cost)::float    AS mean,
        STDDEV(annual_cost)::float AS stddev
      FROM invoice_datapoints
      WHERE category    = ${category}
        AND industry    = ${ind}
        AND size_bucket = ${bucket}
    `;

    const { n = 0, mean = null, stddev = null } = statsRows[0] ?? {};

    if (n >= MIN_POINTS && stddev > 0) {
      const zScore = Math.abs((annualCost - mean) / stddev);
      if (zScore > 3) {
        console.warn(
          `[benchmark] outlier dropped — category=${category} bucket=${bucket} annualCost=${annualCost} z=${zScore.toFixed(2)} mean=${Math.round(mean)} stddev=${Math.round(stddev)} n=${n}`
        );
        notifyOutlier({ category, supplier, annualCost, bucket, zScore, mean, stddev, n })
          .catch((err) => console.error('[benchmark] notifyOutlier threw:', err.message));
        return;
      }
    }

    await db`
      INSERT INTO invoice_datapoints (category, supplier, annual_cost, industry, size_bucket)
      VALUES (${category}, ${supplier}, ${Math.round(annualCost)}, ${ind}, ${bucket})
    `;
    const kv = getKv();
    if (kv) try { await kv.del(cacheKey(category, ind, bucket)); } catch { /* non-fatal */ }
  } catch (err) {
    console.error('[benchmark] storeDatapoint error:', err.message);
  }
}
