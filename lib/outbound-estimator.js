// lib/outbound-estimator.js
// Generates estimated intelligence for outbound prospect briefings.
//
// PRISKÄLLA — en sanning: lib/benchmark.js (KV → invoice_datapoints →
// invoice_analyses → BRANCHINDEX-fallback). När prisboken har riktiga
// datapunkter för segmentet används de; annars verifierade listpriser.
// Estimatorn räknar ALDRIG mot en egen prissanning.
//
// CREDIBILITY RULES (never break):
// 1. Never claim to know the company's actual costs.
// 2. A central estimate may only be shown together with its range — never alone.
// 3. Always attribute the source tier (live data / real-public / estimated).
// 4. Always include a disclaimer about estimation uncertainty.
// 5. Only surface an estimate if the potential saving exceeds 3 000 kr/yr.

import { BRANCHINDEX, bucketForSize } from '../agents/recommender/branchindex.js';
import { getBenchmark as getLiveBenchmark } from './benchmark.js';

/**
 * Hämtar livedata ur prisboken — med sanity-band mot det verifierade
 * listpriset. Banden skyddar mot enhetsfel (totalkostnad vs per användare)
 * och förorenade datapunkter: hellre verifierat listpris än fel livedata.
 * Returnerar null när livedata saknas eller inte passerar banden →
 * anroparen faller tillbaka på BRANCHINDEX.
 */
async function liveBench({ category, industry, employees, mockMedian }) {
  if (!industry) return null;
  try {
    const bm = await getLiveBenchmark({ category, industry, employees });
    if (!bm) return null;
    const isLive = bm.source === 'real' || bm.source === 'live_analyses';
    if (!isLive || bm.isTotal) return null;
    if (!(bm.p25 > 0 && bm.median >= bm.p25)) return null;
    if (mockMedian && (bm.median < mockMedian * 0.4 || bm.median > mockMedian * 2.5)) return null;
    return bm;
  } catch {
    return null; // prisboken onåbar (t.ex. lokal körning utan DB) — fallback
  }
}

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
 * Typisk marknadskostnad hämtas ur prisboken när livedata finns för segmentet.
 */
async function estimateMobil(segment, sizeBucket, employees, industry) {
  const bench = BRANCHINDEX.mobil?.matrix?.[segment]?.[sizeBucket];
  if (!bench) return null;

  const sims = Math.max(1, Math.round(employees * simRatio(segment)));

  // Typical cost: prisbokens median när den bär — annars Tele2 Plus 349 kr/mån.
  // Arvo-priset är alltid det VERIFIERADE listpriset (Tele2 Bas) — det är vårt löfte.
  const live = await liveBench({ category: 'mobil', industry, employees, mockMedian: bench.median });
  const typicalPerSim  = live?.median ?? bench.median; // kr/yr per SIM
  const arvoPerSim     = bench.p25;                    // kr/yr per SIM (Tele2 Bas 299 kr/mån)

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
    source:        live ? 'live' : 'real-public',
    sourceNote:    live
      ? `Källa: ${live.n} verifierade fakturor i Arvo-databasen (median) · Tele2 Företag listpris, juni 2026`
      : 'Källa: Tele2 Företag verifierade listpriser, juni 2026',
    estimatedSims: sims,
    typicalLow,
    typicalHigh,
    arvoAnnual:    round500(arvoAnnual),
    savingCentral: round500(saving),
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
 * M365 estimate — runs when mxPlatform === 'microsoft365' (confirmed via DNS).
 * Uses BRANCHINDEX['saas-productivity'].matrix for market p25/median,
 * and licenseTierBenchmarks['business-standard'].arvoAnnual for Arvo price.
 */
async function estimateM365(segment, sizeBucket, employees, industry) {
  const bench = BRANCHINDEX['saas-productivity']?.matrix?.[segment]?.[sizeBucket];
  const arvoPerSeatMonth = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.['business-standard']?.arvoAnnual;
  if (!bench || !arvoPerSeatMonth) return null;

  const seats         = employees; // 1:1 ratio for office workers
  const arvoPerSeatYr = round500(arvoPerSeatMonth * 12);
  const arvoAnnual    = round500(seats * arvoPerSeatYr);

  // Typisk kostnad: prisbokens percentiler när livedata bär — annars BRANCHINDEX.
  // Arvo-priset är alltid microsoft.com:s verifierade årsavtalspris.
  const live = await liveBench({ category: 'saas-productivity', industry, employees, mockMedian: bench.median });
  const p25PerSeat    = live?.p25    ?? bench.p25;
  const medianPerSeat = live?.median ?? bench.median;

  // typicalLow = p25 (best realistic current price), typicalHigh = median (what most pay)
  const typicalLow  = round500(seats * p25PerSeat);
  const typicalHigh = round500(seats * medianPerSeat);

  // Central saving = median - Arvo price (vs. typical reseller markup)
  const savingCentral = seats * (medianPerSeat - arvoPerSeatYr);
  if (savingCentral < 3000) return null;

  const savingLow  = round500(savingCentral * 0.70);
  const savingHigh = round500(savingCentral * 1.30);

  return {
    category:      'm365',
    label:         'Microsoft 365-licenser',
    source:        live ? 'live' : 'real-public',
    sourceNote:    live
      ? `Källa: ${live.n} verifierade fakturor i Arvo-databasen (median) · microsoft.com/sv-se årsavtalspris, maj 2026`
      : 'Källa: microsoft.com/sv-se verifierade årsavtalspriser, maj 2026',
    estimatedSims: seats,
    typicalLow,
    typicalHigh,
    arvoAnnual,
    savingCentral: round500(savingCentral),
    savingLow,
    savingHigh,
    pricePerSim: {
      typical: Math.round(medianPerSeat / 12),
      arvo:    Math.round(arvoPerSeatYr / 12),
    },
    disclaimer: 'Uppskattning baserad på verifierade Microsoft-listpriser och branschdata. Exakt analys kräver er faktura.',
  };
}

/**
 * Main entry: generates up to 2 category estimates for a company profile.
 * @param {{ segment: string, sizeBucket: string, employees: number, mxPlatform?: string }} profile
 * @returns {{ categories: Array, totalSavingLow: number, totalSavingHigh: number, hasEstimates: boolean }}
 */
export async function estimateForProfile({ segment, sizeBucket, employees, mxPlatform, industry }) {
  const normSeg     = segment in SIM_RATIO ? segment : 'byraer';
  const normBucket  = ['micro', 'small', 'mid'].includes(sizeBucket) ? sizeBucket : bucketForSize(employees);

  const categories = [];

  if (mxPlatform === 'microsoft365') {
    const m365 = await estimateM365(normSeg, normBucket, employees, industry);
    if (m365) categories.push(m365);
  }

  const mobil = await estimateMobil(normSeg, normBucket, employees, industry);
  if (mobil) categories.push(mobil);

  const totalSavingLow     = round500(categories.reduce((s, c) => s + c.savingLow,     0));
  const totalSavingHigh    = round500(categories.reduce((s, c) => s + c.savingHigh,    0));
  const totalSavingCentral = round500(categories.reduce((s, c) => s + c.savingCentral, 0));

  return {
    categories,
    totalSavingLow,
    totalSavingHigh,
    totalSavingCentral,
    hasEstimates: categories.length > 0,
  };
}

export { bucketForSize };
