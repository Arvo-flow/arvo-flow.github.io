// lib/production-monitor.js
// Analyzes completed batch results for systematic extraction quality issues.
//
// Runs after every batch job completes. Stores metrics in KV for admin visibility.
// Does NOT block processing — runs fire-and-forget, logs anomalies to console.error.
//
// Monitored signals:
//   seatCount_null_rate    — mobil/saas invoices where seatCount wasn't extracted
//   review_queue_rate      — fraction of invoices routed to review_queue
//   error_rate             — hard errors (API failures)
//   sanity_fail_rate       — invoices blocked by sanity verifier
//   category_distribution  — breakdown per category

import { getKv } from './kv.js';

const METRICS_KEY = 'batch:metrics:latest';
const METRICS_TTL = 30 * 24 * 60 * 60; // 30 days

// Categories where seatCount should always be present
const SEAT_CATEGORIES = new Set(['mobil', 'saas-productivity', 'saas-crm', 'saas-finance', 'saas-other', 'saas-creative', 'saas-devtools', 'vaxel']);

// Thresholds that trigger console.error alerts
const ALERT_THRESHOLDS = {
  seatCount_null_rate: 0.30,   // >30% of seat-based invoices missing seatCount
  review_queue_rate:   0.40,   // >40% in review_queue (sanity-verifier over-blocking?)
  error_rate:          0.10,   // >10% hard errors
};

export function analyzeResults(invoiceResults) {
  const total    = invoiceResults.length;
  if (total === 0) return null;

  let reviewQueue    = 0;
  let errors         = 0;
  let seatBased      = 0;
  let seatCountNull  = 0;
  const catCounts    = {};

  for (const r of invoiceResults) {
    if (r.route === 'review_queue') reviewQueue++;
    if (r.route === 'error' || r.error)      errors++;

    const cat = r.categorized?.category;
    if (cat) catCounts[cat] = (catCounts[cat] ?? 0) + 1;

    if (cat && SEAT_CATEGORIES.has(cat)) {
      seatBased++;
      if ((r.extracted?.seatCount ?? null) === null) seatCountNull++;
    }
  }

  const metrics = {
    total,
    reviewQueueRate:   +(reviewQueue / total).toFixed(3),
    errorRate:         +(errors / total).toFixed(3),
    seatCountNullRate: seatBased > 0 ? +(seatCountNull / seatBased).toFixed(3) : null,
    categoryDistribution: catCounts,
    seatBased,
    seatCountNull,
    reviewQueue,
    errors,
    timestamp: Date.now(),
  };

  // Alert on anomalies
  if (metrics.seatCountNullRate !== null && metrics.seatCountNullRate > ALERT_THRESHOLDS.seatCount_null_rate) {
    console.error(`[monitor] ALERT: seatCount_null_rate=${metrics.seatCountNullRate} (${seatCountNull}/${seatBased} seat-based invoices). Extraktorn missar sannolikt tabellformat-antal.`);
  }
  if (metrics.reviewQueueRate > ALERT_THRESHOLDS.review_queue_rate) {
    console.error(`[monitor] ALERT: review_queue_rate=${metrics.reviewQueueRate} (${reviewQueue}/${total}). Sanity-verifier eller confidence för aggressiv?`);
  }
  if (metrics.errorRate > ALERT_THRESHOLDS.error_rate) {
    console.error(`[monitor] ALERT: error_rate=${metrics.errorRate} (${errors}/${total}). API-problem eller PDF-format utanför spec?`);
  }

  return metrics;
}

export async function storeMetrics(metrics) {
  if (!metrics) return;
  try {
    const kv = getKv();
    if (!kv) return;

    // Append to rolling history (last 50 batches)
    const history = (await kv.get('batch:metrics:history')) ?? [];
    history.unshift(metrics);
    if (history.length > 50) history.length = 50;

    await Promise.all([
      kv.set(METRICS_KEY, metrics, { ex: METRICS_TTL }),
      kv.set('batch:metrics:history', history, { ex: METRICS_TTL }),
    ]);
  } catch (err) {
    console.warn('[monitor] Failed to store metrics:', err.message);
  }
}

export async function getLatestMetrics() {
  const kv = getKv();
  return kv?.get(METRICS_KEY) ?? null;
}

export async function getMetricsHistory() {
  const kv = getKv();
  return (await kv?.get('batch:metrics:history')) ?? [];
}
