// lib/price-forecast.js — Maktkalendern på riktigt: den deterministiska prognosmotorn.
//
// Bibelns nya regel 4 (2026-06-21): precision där vi har den, en KÄLLBELAGD, KONFIDENSMÄRKT
// BEDÖMNING där vi inte har den, tystnad bara som sista utväg. Det här är bedömnings-grenen —
// förvarningen som gör vakten till livvakt i stället för historiker.
//
// Zero Trust: prognosen byggs ENBART ur leverantörens egen verifierade prishistorik
// (supplier_price_history, skriven av price-monitor när ett publikt pris faktiskt ändrats).
// Inget påhittat. Räcker inte historiken till en grundad uppfattning → null (tystnad).
//
// Varje fynd bär de tre obligatoriska delarna (annars produceras det inte):
//   (1) GRUND      — "höjt i Q1 4 av 5 senaste höjningar" (ur historiken, källbelagt)
//   (2) KONFIDENS  — en uttalad nivå (möjlig / medelhög / hög), aldrig falsk precision
//   (3) ASYMMETRI  — vad som händer om bedömningen slår fel, och varför det är kundens vinst

const QUARTER_LABEL = { 1: 'Q1 (jan–mar)', 2: 'Q2 (apr–jun)', 3: 'Q3 (jul–sep)', 4: 'Q4 (okt–dec)' };
const QUARTER_SHORT = { 1: 'Q1', 2: 'Q2', 3: 'Q3', 4: 'Q4' };

const num = (v) => (v == null ? null : Number(v));
const quarterOf = (d) => Math.floor(d.getUTCMonth() / 3) + 1;
const pctSv = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 1 }).format(n);

/**
 * @param {Array} rows  - supplier_price_history-rader: { changed_at, old_price_monthly, new_price_monthly, old_price_annual, new_price_annual }
 * @param {object} opts - { supplier, today }
 * @returns {object|null} prognos-fynd i FindingCard-form (tone:'watch') eller null (tystnad)
 */
export function priceHikeForecast(rows, { supplier = null, today = new Date() } = {}) {
  // Behåll bara verkliga HÖJNINGAR med giltigt datum och positiv magnitud.
  const hikes = [];
  for (const r of rows ?? []) {
    const when = r?.changed_at ? new Date(r.changed_at) : null;
    if (!when || Number.isNaN(when.getTime())) continue;
    const oldM = num(r.old_price_monthly) ?? num(r.old_price_annual);
    const newM = num(r.new_price_monthly) ?? num(r.new_price_annual);
    if (oldM == null || newM == null || oldM <= 0 || newM <= oldM) continue; // bara höjningar
    hikes.push({ when, pct: ((newM - oldM) / oldM) * 100, quarter: quarterOf(when) });
  }

  // Zero Trust-grind: under två höjningar finns ingen grundad uppfattning → tystnad.
  if (hikes.length < 2) return null;

  // Säsongsmönster: vilken kvartalsruta klustrar höjningarna i?
  const byQ = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const h of hikes) byQ[h.quarter]++;
  const topQuarter = Number(Object.keys(byQ).sort((a, b) => byQ[b] - byQ[a])[0]);
  const topCount = byQ[topQuarter];
  const share = topCount / hikes.length;
  const years = new Set(hikes.map((h) => h.when.getUTCFullYear())).size;

  // Typisk magnitud — median av höjningsprocenten (robustare än medel mot en utstickare).
  const sorted = hikes.map((h) => h.pct).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const medianPct = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  const magnitude = `+${pctSv(medianPct)} %`;

  const sup = supplier && String(supplier).trim() ? String(supplier).trim() : 'Leverantören';

  // Konfidensnivå — deterministisk av sample-storlek × säsongskoncentration. Aldrig falsk precision.
  let confidence, confidenceLabel, seasonal;
  if (topCount >= 3 && share >= 0.66) { confidence = 'high';   confidenceLabel = 'Hög sannolikhet';    seasonal = true; }
  else if (topCount >= 2 && share >= 0.5) { confidence = 'medium'; confidenceLabel = 'Medelhög sannolikhet'; seasonal = true; }
  else { confidence = 'low'; confidenceLabel = 'Möjlig'; seasonal = false; }

  // (1) GRUND — källbelagt ur historiken
  const grund = seasonal
    ? `${sup} har höjt sitt publika pris i ${QUARTER_SHORT[topQuarter]} ${topCount} av ${hikes.length} senaste höjningarna${years > 1 ? ` (${years} olika år)` : ''}, typiskt ${magnitude}.`
    : `${sup} har höjt sitt publika pris ${hikes.length} gånger de senaste åren, typiskt ${magnitude}, utan tydlig säsong.`;
  // (2) KONFIDENS — uttalad nivå, märkt som bedömning
  const konfidens = seasonal
    ? `Bedömning (ej fakta): ${confidenceLabel.toLowerCase()} att nästa höjning landar i ${QUARTER_LABEL[topQuarter]}.`
    : `Bedömning (ej fakta): håll uppsikt — mönstret räcker inte för att peka ut en månad, men höjningar återkommer.`;
  // (3) ASYMMETRI — vad om vi har fel, och varför det är kundens vinst
  const asymmetri = `Vi köar motdraget och agerar i fönstret. Kommer höjningen inte — desto bättre; ni betalade inget för beredskapen och bevakningen flyttar bara fram.`;

  return {
    kind: 'price-forecast',
    tone: 'watch',
    title: seasonal
      ? `${sup} höjer sannolikt i ${QUARTER_SHORT[topQuarter]}`
      : `${sup} har en höjningstrend`,
    metricText: magnitude,                         // den konkreta, källbelagda magnituden (räknas hem)
    lineDescription: null,                         // konfidensen lever i texten, inte som citat-rad
    confidenceLabel,                               // tillgänglig för ev. framtida vy
    annualImpact: 0,
    text: `${grund} ${konfidens} ${asymmetri}`,    // grund + konfidens + asymmetri — alla tre, alltid
    confidence,
    quarter: seasonal ? topQuarter : null,
    magnitudePct: Math.round(medianPct * 10) / 10,
    hikeCount: hikes.length,
  };
}
