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
import {
  getBenchmark as getMockBenchmark,
  bucketForSize,
  INDUSTRIES,
  INDUSTRY_SEGMENT_MAP,
} from '../agents/recommender/branchindex.js';

const MIN_POINTS = 10;
const CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 h

function cacheKey(category, industry, sizeBucket) {
  return `bm:v2:${category}:${industry}:${sizeBucket}`;
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

  // 3. Mock fallback — never cached in KV since branchindex.js can be redeployed.
  // Preserve the category's source tier ('real-public', 'estimated') if set.
  const mock = getMockBenchmark({ category, industry: ind, employees });
  if (!mock) return null;
  return { ...mock, source: mock.source ?? 'mock', n: 0 };
}

export async function storeDatapoint({ category, supplier, annualCost, industry, employees }) {
  const db = getDb();
  if (!db) return;

  // Sanity guard: extremvärden indikerar test-uploads eller extraheringsfel.
  // Under 500 kr/år = osannolikt reellt avtal. Över 5 M kr/år = utanför SMB-skalan.
  // Att lagra sådana datapunkter riskerar att korrupta benchmarken permanent vid ≥10 st.
  if (!annualCost || annualCost < 500 || annualCost > 5_000_000) return;

  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const bucket = bucketForSize(employees ?? 5);

  try {
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
