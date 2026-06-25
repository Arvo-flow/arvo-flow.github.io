// lib/market-movement.js — Marknadsrörelsen: den vassaste "hur visste de det?".
//
// "Telia höjde priset — och X av Y bolag vi följer för <kategori> ligger hos Telia."
// Ingen jämförelsesajt, ingen konsult och inte leverantören själv kan korsa en VERIFIERAD
// publik höjning med nätverkets breddsignal. Bara Arvo, tack vare den kollektiva datan.
//
// Detta är INTE en bedömning (regel 4) — det är ett FAKTUM (regel 3): höjningen, datumet,
// magnituden och X/Y räknas alla hem mot källan. Därför inga grund/konfidens/asymmetri-krav
// (det är prognosens gren). Zero Trust: båda bevisen måste bära, annars tystnad (null):
//   • en VERKLIG, FÄRSK höjning ur supplier_price_history (skriven när publikt pris faktiskt steg)
//   • kollektiv bredd ≥ minPeers bolag hos leverantören (samma ≥3-tröskel som kohorten)
//
// Surface-paritet (regel 5): samma X/Y-tal som alert-mailet (getSegmentStats) — bara olika hud.

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const num   = (v) => (v == null ? null : Number(v));
const pctSv = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 1 }).format(n);
const dateSv = (d) => d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * @param {object} hike     - { changedAt, oldMonthly, newMonthly, oldAnnual, newAnnual } (ur getRecentHike)
 * @param {object} segment  - { total, withSupplier } (ur getSegmentStats)
 * @param {object} opts      - { supplier, categoryLabel, today, recentMonths, minPeers }
 * @returns {object|null} FindingCard-format (tone:'leak') eller null (tystnad)
 */
export function marketMovementFinding(hike, segment, { supplier = null, categoryLabel = null, today = new Date(), recentMonths = 6, minPeers = 3 } = {}) {
  if (!hike || !segment) return null;

  const when = hike.changedAt ? new Date(hike.changedAt) : null;
  if (!when || Number.isNaN(when.getTime())) return null;
  // Recency: en "rörelse" är färsk. En höjning för länge sen är historia, inte nyheter.
  if (when > today || (today - when) > recentMonths * MONTH_MS) return null;

  const oldM = num(hike.oldMonthly) ?? num(hike.oldAnnual);
  const newM = num(hike.newMonthly) ?? num(hike.newAnnual);
  if (oldM == null || newM == null || oldM <= 0 || newM <= oldM) return null;   // bara höjningar
  const pct = ((newM - oldM) / oldM) * 100;

  const withSupplier = Number(segment.withSupplier ?? 0);
  const total        = Number(segment.total ?? 0);
  // Kollektiv bredd: utan ≥minPeers bolag hos leverantören är "X av Y" en anekdot, inte en sanning.
  if (!(withSupplier >= minPeers) || !(total >= withSupplier)) return null;

  const sup = supplier && String(supplier).trim() ? String(supplier).trim() : 'Leverantören';
  const cat = categoryLabel && String(categoryLabel).trim() ? String(categoryLabel).trim() : 'den här kategorin';
  const magnitude = `+${pctSv(pct)} %`;

  return {
    kind: 'market-movement',
    tone: 'leak',                                  // en rörelse att agera på — amber-signal
    title: `${sup} höjde priset för ${cat}`,
    metricText: magnitude,                         // den verifierade magnituden (räknas hem)
    lineDescription: null,
    annualImpact: 0,                               // breddsignalen leder, inte ett kr-tal
    text: `${sup} höjde sitt publika pris med ${magnitude} den ${dateSv(when)} — verifierat. `
        + `Bland bolagen Arvo följer för ${cat} ligger ${withSupplier} av ${total} hos ${sup}; ni är ett av dem. `
        + `Vi bevakar ert avtal mot höjningen och hör av oss när ert läge kräver ett drag.`,
    supplier:     sup,
    withSupplier, total,
    magnitudePct: Math.round(pct * 10) / 10,
    changedAt:    when.toISOString(),
  };
}
