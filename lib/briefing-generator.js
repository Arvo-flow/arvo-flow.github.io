// lib/briefing-generator.js
// Generates Interactive Briefing insights deterministically from DB.
// No AI calls — pure SQL + business rules derived from stored analyses.
//
// Insight types:
//   recommendation — should_switch=true AND net_saving >= 2000
//   cost_trend     — same supplier, ≥5% price increase vs previous period
//   overpaying     — annual_cost >20% above suggested_annual_cost, no switch flag

import { getDb } from './db.js';
import crypto from 'crypto';

const CATEGORY_LABELS = {
  'mobil':              'mobilabonnemang',
  'bredband':           'företagsbredband',
  'el':                 'elavtal',
  'saas-productivity':  'produktivitets-SaaS',
  'saas-crm':           'CRM-system',
  'saas-finance':       'ekonomisystem',
  'saas-devtools':      'dev-SaaS',
  'saas-other':         'SaaS',
  'saas-creative':      'kreativ SaaS',
  'skrivarleasing':     'skrivarleasing',
  'kortterminal':       'betaltjänst',
  'faktura-tjanst':     'fakturatjänst',
  'leasing-bil':        'billeasing',
  'forsakring-foretag': 'företagsförsäkring',
  'loneadmin':          'lönesystem',
  'vaxel':              'växel',
  'larm-bevakning':     'larm & bevakning',
  'foretagshalsovard':  'företagshälsovård',
  'bankavgifter':       'bankavgifter',
  'it-support':         'IT-support',
  'serverhosting':      'serverhosting',
};

function catLabel(cat) { return CATEGORY_LABELS[cat] ?? cat; }
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
             should_switch, employees, created_at
      FROM invoice_analyses
      WHERE user_email = ${email}
        AND route      = 'auto'
        AND created_at >= ${periodStart}
        AND created_at  < ${periodEnd}
      ORDER BY net_saving DESC NULLS LAST, created_at DESC
    `,
    db`
      SELECT normalized_supplier, annual_cost
      FROM invoice_analyses
      WHERE user_email = ${email}
        AND route      = 'auto'
        AND created_at >= ${prevPeriodStart}
        AND created_at  < ${periodStart}
    `,
  ]);

  const insights = [];
  const seenSuppliers = new Set();

  // ── Type 1: recommendation (should_switch=true, net_saving ≥ 2 000) ─────────
  for (const a of currentAnalyses) {
    if (!a.should_switch || (a.net_saving ?? 0) < 2000) continue;
    if (seenSuppliers.has(a.normalized_supplier)) continue;
    seenSuppliers.add(a.normalized_supplier);

    const pctOver = a.suggested_annual_cost > 0
      ? Math.round(((a.annual_cost - a.suggested_annual_cost) / a.suggested_annual_cost) * 100)
      : null;

    insights.push({
      id: crypto.randomUUID(),
      type: 'recommendation',
      headline: `Byt ${a.supplier} — spara ${fmt(a.net_saving)} kr/år`,
      subheadline: pctOver != null
        ? `Er ${catLabel(a.category)}-kostnad är ${pctOver}% över marknadspris`
        : `Arvo har identifierat ett bytestillfälle för er ${catLabel(a.category)}`,
      metric: {
        primary:   { value: a.net_saving,  label: 'nettobesparing/år' },
        secondary: { value: a.gross_saving, label: 'bruttobesparing' },
      },
      context: `Arvo har analyserat er ${catLabel(a.category)}-faktura och identifierat att ni betalar mer än jämförbara bolag. Arvo sköter hela bytesprocessen — från uppsägning av befintligt avtal till nytt signerat kontrakt. Ni behöver inte göra någonting.`,
      supplier: a.supplier,
      category: a.category,
      analysisId: a.id,
      action: {
        label:              'Aktivera bytet — Arvo sköter allt',
        type:               'approve_switch',
        estimatedNetSaving: a.net_saving,
      },
    });
  }

  // ── Type 2: cost_trend (same supplier, ≥5% increase vs prev period) ─────────
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
      headline: `${a.supplier} höjde priset ${Math.round(pct)}% sedan förra månaden`,
      subheadline: `Från ${fmt(prev)} kr/år till ${fmt(a.annual_cost)} kr/år — oannonserad höjning?`,
      metric: {
        primary:   { value: Math.round(pct),                              label: '% prishöjning' },
        secondary: { value: Math.round(Number(a.annual_cost) - prev),    label: 'kr/år mer' },
      },
      context: `Arvo har detekterat en prisökning hos ${a.supplier}. Smyghöjningar utan kundinformation är vanliga — och kan ifrågasättas och förhandlas tillbaka. Arvo granskar om höjningen är befogad och agerar direkt.`,
      supplier: a.supplier,
      category: a.category,
      analysisId: a.id,
      action: {
        label:              'Be Arvo granska och förhandla',
        type:               'renegotiate',
        estimatedNetSaving: Math.round((Number(a.annual_cost) - prev) * 0.85),
      },
    });
  }

  // ── Type 3: overpaying (>20% above suggested, no switch flag) ────────────────
  for (const a of currentAnalyses) {
    if (seenSuppliers.has(a.normalized_supplier)) continue;
    if (a.should_switch) continue;
    if (!a.suggested_annual_cost || !a.annual_cost) continue;
    const pct = ((Number(a.annual_cost) - Number(a.suggested_annual_cost)) / Number(a.suggested_annual_cost)) * 100;
    if (pct < 20) continue;
    seenSuppliers.add(a.normalized_supplier);

    insights.push({
      id: crypto.randomUUID(),
      type: 'overpaying',
      headline: `Ni betalar ${Math.round(pct)}% mer än marknadspris för ${a.supplier}`,
      subheadline: `Marknadsnivå: ${fmt(a.suggested_annual_cost)} kr/år — ni betalar ${fmt(a.annual_cost)} kr/år`,
      metric: {
        primary:   { value: Math.round(Number(a.annual_cost) - Number(a.suggested_annual_cost)), label: 'kr/år i överbetalning' },
        secondary: { value: Math.round(pct),                                                      label: '% över marknad' },
      },
      context: `Arvo har identifierat att ert avtal med ${a.supplier} ligger över vad jämförbara bolag betalar. En prisförhandling kan minska kostnaden utan att ni behöver byta leverantör.`,
      supplier: a.supplier,
      category: a.category,
      analysisId: a.id,
      action: {
        label:              'Initiera prisförhandling med Arvo',
        type:               'renegotiate',
        estimatedNetSaving: Math.round((Number(a.annual_cost) - Number(a.suggested_annual_cost)) * 0.7),
      },
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
