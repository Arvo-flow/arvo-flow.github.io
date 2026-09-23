// lib/briefing-generator.js
// Generates Interactive Briefing insights deterministically from DB.
// No AI calls — pure SQL + business rules derived from stored analyses.
//
// Insight types (kundmeningsregistret 2026-09-23, KM-10):
//   recommendation — radLage säger 'byte' och nettot ≥ 2000, daterat med analysdagen
//   cost_trend     — samma leverantör, totalsumman ≥ 5 % högre än förra perioden (faktum, inget prispåstående)

import { getDb } from './db.js';
import { radLage } from './lagesregister.js';
import { LOFTEN } from './kundmeningar.js';
import crypto from 'crypto';

// CATEGORY_LABELS + catLabel bor nu i lib/format.js (regel 1: en källa för etiketter).
function fmt(n) { return Math.round(n).toLocaleString('sv-SE'); }

/**
 * Generates up to 5 insights for a given email and time period.
 * @param {{ email: string, periodStart: string, periodEnd: string }} opts
 * @returns {Promise<{ insights, totalSavingPotential, totalInvoicesAnalyzed, insightCount } | null>}
 */
export async function generateBriefingInsights({ email, periodStart, periodEnd }) {
  const db = getDb();
  if (!db) return null;

  const prevPeriodStart = new Date(
    new Date(periodStart).getFullYear(),
    new Date(periodStart).getMonth() - 1,
    1,
  ).toISOString();

  const [currentAnalyses, prevAnalyses] = await Promise.all([
    db`
      SELECT id, supplier, normalized_supplier, category,
             annual_cost, suggested_annual_cost, net_saving, gross_saving,
             should_switch, employees, created_at, analyserad_at, route
      FROM invoice_analyses   -- liggare: kundvy
      WHERE user_email = ${email}
        AND route      = 'auto'
        AND arkiverad_at IS NULL
        AND created_at >= ${periodStart}
        AND created_at  < ${periodEnd}
      ORDER BY net_saving DESC NULLS LAST, created_at DESC
    `,
    db`
      SELECT normalized_supplier, annual_cost
      FROM invoice_analyses   -- liggare: kundvy
      WHERE user_email = ${email}
        AND route      = 'auto'
        AND arkiverad_at IS NULL
        AND created_at >= ${prevPeriodStart}
        AND created_at  < ${periodStart}
    `,
  ]);

  const insights = [];
  const seenSuppliers = new Set();
  const datum = (a) => new Date(a.analyserad_at ?? a.created_at)
    .toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', timeZone: 'Europe/Stockholm' });

  // ── KUNDMENINGSREGISTRET (2026-09-23) ─────────────────────────────────────────────────────
  // Här stod tre insiktstyper som talade förbi registret, mätt i ytinventeringen:
  //   · «Möjlig besparing» summerade påhittade faktorer — kostnadsökning × 0,85 och
  //     överbetalning × 0,7 — till månadsmejlets rubriktal och ämnesrad.
  //   · «Ni betalar X % mer än marknadspris … ligger över vad jämförbara bolag betalar» ur det
  //     FRYSTA suggested_annual_cost på rader utan bytesmål. Typen är borta: den hade inget underlag.
  //   · «Arvo sköter hela bytesprocessen … Ni behöver inte göra någonting», «Be Arvo granska och
  //     förhandla», «Initiera prisförhandling med Arvo» — bytesrälsen är mode:stub och Arvo
  //     förhandlar aldrig (Switch-doktrinen).
  // Nu: ett byte kommer ur läget (radLage → 'byte') och bär sitt analysdatum; en kostnadsökning
  // är ett FAKTUM om två totalsummor och påstår varken pris eller besparing (KM-10).

  // ── Typ 1: byte — läget säger 'byte' och nettot bär (≥ 2 000 kr/år) ────────────────────────
  for (const a of currentAnalyses) {
    const lage = radLage(a);
    if (lage.kod !== 'byte' || (lage.params.netSaving ?? 0) < 2000) continue;
    if (seenSuppliers.has(a.normalized_supplier)) continue;
    seenSuppliers.add(a.normalized_supplier);

    insights.push({
      id: crypto.randomUUID(),
      type: 'recommendation',
      headline: `Byte från ${a.supplier}: ${fmt(lage.params.netSaving)} kr/år netto`,
      subheadline: `Räknat mot verifierat publikt listpris vid analysen den ${datum(a)}.`,
      metric: {
        primary:   { value: lage.params.netSaving, label: 'nettobesparing/år' },
        secondary: { value: a.gross_saving, label: 'bruttobesparing' },
      },
      context: `Beloppet räknades vid analysen den ${datum(a)}. ${LOFTEN.bytesunderlag.text}`,
      supplier: a.supplier,
      category: a.category,
      analysisId: a.id,
      action: {
        label:              'Be Arvo förbereda bytet',
        type:               'approve_switch',
        estimatedNetSaving: lage.params.netSaving,
      },
    });
  }

  // ── Typ 2: kostnadsökning — ett faktum om två totalsummor, aldrig ett prispåstående ────────
  const prevBySupplier = {};
  for (const p of prevAnalyses) {
    prevBySupplier[p.normalized_supplier] = Number(p.annual_cost);
  }

  for (const a of currentAnalyses) {
    if (seenSuppliers.has(a.normalized_supplier)) continue;
    const prev = prevBySupplier[a.normalized_supplier];
    if (!prev || prev <= 0) continue;
    const pct = ((Number(a.annual_cost) - prev) / prev) * 100;
    if (pct < 5) continue;
    seenSuppliers.add(a.normalized_supplier);

    insights.push({
      id: crypto.randomUUID(),
      type: 'cost_trend',
      headline: `Kostnaden hos ${a.supplier} ökade ${Math.round(pct)} % sedan förra månaden`,
      subheadline: `Från ${fmt(prev)} kr/år till ${fmt(a.annual_cost)} kr/år, räknat på två fakturor.`,
      metric: {
        primary:   { value: Math.round(pct),                           label: '% högre kostnad' },
        secondary: { value: Math.round(Number(a.annual_cost) - prev), label: 'kr/år mer' },
      },
      context: 'Ökningen syns mellan två fakturors totalsummor. Den kan bero på fler licenser eller abonnemang lika väl som på ett högre pris — fakturaraderna avgör vilket.',
      supplier: a.supplier,
      category: a.category,
      analysisId: a.id,
      action: null,
    });
  }

  const sliced = insights.slice(0, 5);
  const totalSavingPotential = sliced
    .filter(i => i.action?.estimatedNetSaving > 0)
    .reduce((s, i) => s + i.action.estimatedNetSaving, 0);

  return {
    insights:               sliced,
    totalSavingPotential,
    totalInvoicesAnalyzed:  currentAnalyses.length,
    insightCount:           sliced.length,
  };
}
