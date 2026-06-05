// lib/outbound-estimator.js
// Generates estimated intelligence for outbound prospect briefings.
// Built entirely on verified benchmark data from branchindex.js — no AI calls.
//
// CREDIBILITY RULES (never break):
// 1. Never claim to know the company's actual costs.
// 2. Always show ranges, never single point estimates.
// 3. Always attribute the source tier (real-public / estimated).
// 4. Always include a disclaimer about estimation uncertainty.
// 5. Only surface an estimate if the potential saving exceeds 3 000 kr/yr.

import { BRANCHINDEX, bucketForSize } from '../agents/recommender/branchindex.js';

// Company phone ratio: estimated share of employees with a company mobile subscription.
// Conservative to avoid over-promising. Source: internal analysis + Tele2 SMF data.
const SIM_RATIO = {
  tillverkning: 0.62,   // floor workers often share devices or use private phones
  hantverkare:  0.88,   // field workers nearly always have company phones
  byraer:       0.92,   // office workers: close to 1:1
  ehandel:      0.70,   // mix of warehouse + office
};

function simRatio(segment) {
  return SIM_RATIO[segment] ?? 0.78;
}

// Round to nearest 500 for display — signals estimate, not precision.
function round500(n) { return Math.round(n / 500) * 500; }

/**
 * Mobile estimate — always run (universal category, verified public prices).
 */
function estimateMobil(segment, sizeBucket, employees) {
  const bench = BRANCHINDEX.mobil?.matrix?.[segment]?.[sizeBucket];
  if (!bench) return null;

  const sims = Math.max(1, Math.round(employees * simRatio(segment)));

  // Typical cost: employees at median market price (Tele2 Plus 349 kr/mån)
  const typicalPerSim  = bench.median; // kr/yr per SIM
  const arvoPerSim     = bench.p25;    // kr/yr per SIM (Tele2 Bas 299 kr/mån)

  const typicalAnnual  = sims * typicalPerSim;
  const arvoAnnual     = sims * arvoPerSim;
  const saving         = typicalAnnual - arvoAnnual; // per SIM diff × sims

  if (saving < 3000) return null;

  // Show ±15 % range for "typical" — honest hedge around the median
  const typicalLow  = round500(typicalAnnual * 0.85);
  const typicalHigh = round500(typicalAnnual * 1.15);
  const savingLow   = round500(saving * 0.70);
  const savingHigh  = round500(saving * 1.30);

  return {
    category:      'mobil',
    label:         'Mobilabonnemang',
    source:        'real-public',        // Tele2 Bas & Plus, verifierat juni 2026
    sourceNote:    'Källa: Tele2 Företag verifierade listpriser, juni 2026',
    estimatedSims: sims,
    typicalLow,
    typicalHigh,
    arvoAnnual:    round500(arvoAnnual),
    savingLow,
    savingHigh,
    pricePerSim: {
      typical: Math.round(typicalPerSim / 12), // kr/mån
      arvo:    Math.round(arvoPerSim / 12),    // kr/mån
    },
    disclaimer: `Uppskattning baserad på branschdata för ${segment === 'hantverkare' ? 'fältintensiv verksamhet' : segment === 'tillverkning' ? 'tillverkningsindustrin' : 'er bransch'}. Exakt analys kräver er faktura.`,
  };
}

/**
 * Main entry: generates up to 2 category estimates for a company profile.
 * @param {{ segment: string, sizeBucket: string, employees: number, industryLabel: string }} profile
 * @returns {{ categories: Array, totalSavingLow: number, totalSavingHigh: number, hasEstimates: boolean }}
 */
export function estimateForProfile({ segment, sizeBucket, employees }) {
  const normSeg     = segment in SIM_RATIO ? segment : 'byraer';
  const normBucket  = ['micro', 'small', 'mid'].includes(sizeBucket) ? sizeBucket : bucketForSize(employees);

  const categories = [];

  const mobil = estimateMobil(normSeg, normBucket, employees);
  if (mobil) categories.push(mobil);

  const totalSavingLow  = round500(categories.reduce((s, c) => s + c.savingLow,  0));
  const totalSavingHigh = round500(categories.reduce((s, c) => s + c.savingHigh, 0));

  return {
    categories,
    totalSavingLow,
    totalSavingHigh,
    hasEstimates: categories.length > 0,
  };
}

export { bucketForSize };
