// lib/secondary-savings.js
// Pure deterministic helper: compute the secondary-category saving on combined invoices.
// primary=mobil  → secondary=bredband (speed-tier lookup)
// primary=bredband → secondary=mobil (per-seat lookup)
import { BRANCHINDEX, INDUSTRY_SEGMENT_MAP, bucketForSize, bredbandSpeedBenchmark } from '../agents/recommender/branchindex.js';

/**
 * @param {object} p
 * @param {object} p.metrics   - output of computeInvoiceMetrics()
 * @param {string} p.category  - dominant category
 * @param {boolean} p.potentialMixedCategories
 * @param {string}  p.industry - industry key (e.g. 'konsult')
 * @param {number}  p.employees
 * @returns {{ category, speedMbit?, seatCount?, currentAnnual, suggestedAnnual, grossSaving, netSaving } | null}
 */
export function computeSecondarySaving({ metrics, category, potentialMixedCategories, industry, employees }) {
  if (!potentialMixedCategories) return null;
  if (metrics.secondaryComponentMonthly == null) return null;
  if (!['mobil', 'bredband'].includes(category)) return null;

  const secAnnual = Math.round(metrics.secondaryComponentMonthly * 12);

  if (category === 'mobil') {
    if (metrics.secondaryConnectionSpeedMbit == null) return null;
    const tier    = metrics.secondaryConnectionSpeedMbit;
    const speedBm = bredbandSpeedBenchmark(tier);   // härledd ur tele2Verified (regel 1)
    if (!speedBm) return null;
    const gross = Math.max(0, secAnnual - speedBm.p25);
    if (gross < 500) return null;
    return {
      category:        'bredband',
      speedMbit:       tier,
      currentAnnual:   secAnnual,
      suggestedAnnual: speedBm.p25,
      grossSaving:     gross,
      netSaving:       Math.round(gross * 0.80),
    };
  }

  if (category === 'bredband') {
    if (metrics.secondarySeatCount == null) return null;
    const segment  = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
    const bucket   = bucketForSize(employees);
    const mobilBm  = BRANCHINDEX.mobil?.matrix?.[segment]?.[bucket];
    if (!mobilBm) return null;
    const seats    = metrics.secondarySeatCount;
    const p25Total = Math.round(mobilBm.p25 * seats);
    const gross    = Math.max(0, secAnnual - p25Total);
    if (gross < 500) return null;
    return {
      category:        'mobil',
      seatCount:       seats,
      currentAnnual:   secAnnual,
      suggestedAnnual: p25Total,
      grossSaving:     gross,
      netSaving:       Math.round(gross * 0.80),
    };
  }

  return null;
}
