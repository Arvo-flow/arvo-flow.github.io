// lib/adobe-rightsizing.js — Adobe Creative Cloud rätt-storleks-rådgivning (saas-creative).
//
// Flaggskeppet: All Apps (hela sviten) → Single App (ett program), när användningen ryms i ett program.
// Den enda kundsynliga siffran är skillnaden mellan TVÅ verifierade publika Adobe-listpriser (exkl moms),
// från adobe.com/se (stealth-verifierat, vaktat veckovis av lib/verifiers/adobe.mjs). INGEN FX.
//
// SKU-medvetet (Zero Trust — pushback inbyggd, regel 4): vi jämför ALDRIG en Team-faktura mot ett
// individpris (= falsk SKU-besparing). Team-priser är redan EXKL moms → ankras direkt. Individpriser är
// INKL moms → de-momsas i kod (lib/adobe-pricing.js). ADVISORY/REVIEW: vilka/hur många program kunden
// faktiskt använder går INTE att läsa ur en faktura → vi ställer revisorsfrågan (samma som Fortnox/M365).

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { exVat, round2 } from './adobe-pricing.js';

const LABELS = {
  'all-apps':          'Creative Cloud (Alla program)',
  'all-apps-standard': 'Creative Cloud Standard',
  'single-app':        'Fristående program (Single App)',
  'acrobat':           'Acrobat Pro',
};
const fmt0 = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const fmt2 = (n) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/** Detektera SKU (team/B2B vs individ) + tier ur Adobe-fakturarader. Null om ingen Adobe-rad. */
export function detectAdobePlan(lineItems) {
  for (const it of lineItems ?? []) {
    const d = String(it?.description ?? '').toLowerCase();
    if (!/adobe|creative cloud|photoshop|illustrator|indesign|premiere|acrobat|lightroom|after effects/.test(d)) continue;
    const sku = /\bteam|teams|för företag|per licens|business|företag\b/.test(d) ? 'team' : 'individual';
    let tier;
    if (/alla program|all apps|creative cloud (?:pro|for teams|komplett|complete)|cc komplett/.test(d)) tier = 'all-apps';
    else if (/single app|fristående|enstaka program|en app/.test(d)) tier = 'single-app';
    else if (/acrobat/.test(d)) tier = 'acrobat';
    else if (/photoshop|illustrator|indesign|premiere|lightroom|after effects/.test(d)) tier = 'single-app';
    else if (/creative cloud|adobe cc/.test(d)) tier = 'all-apps';
    else continue;
    return { sku, tier, billedAmount: it?.amount ?? null };
  }
  return null;
}

/** Verifierat EXKL-moms listpris för (sku, tier). Team = direkt (redan exkl); individ = de-momsat (÷1,25). */
export function adobeListExVat(sku, tier) {
  const av = BRANCHINDEX['saas-creative']?.adobeVerified;
  if (!av) return null;
  if (sku === 'team') {
    const p = av.teamExVatMonthly?.[tier];
    return p > 0 ? p : null;
  }
  const incl = av.individualInclVatMonthly?.[tier];
  return incl > 0 ? exVat(incl) : null;
}

/** Härled antal Adobe-licenser ur fakturan (kod räknar): seatCount → quantity → "(N lic/anv)". Aldrig employees. */
export function deriveAdobeSeats(invoice) {
  if (Number(invoice?.seatCount) > 0) return Math.round(Number(invoice.seatCount));
  let q = 0;
  for (const it of invoice?.lineItems ?? []) {
    if (Number(it?.quantity) > 0) { q += Math.round(Number(it.quantity)); continue; }
    const m = /\((\d+)\s*(?:lic|licenser|licens|anv|användare|st)\b/i.exec(String(it?.description ?? ''));
    if (m) q += Number(m[1]);
  }
  return q > 0 ? q : null;
}

/**
 * Adobe rätt-storlek: All Apps → Single App-rådgivning (verifierad exkl-moms prisskillnad).
 * @param {Array} lineItems
 * @param {number|null} seats
 * @returns {object|null} advisory-objekt, eller null om ingen All Apps-rad / ingen verifierad nedförsäljning
 */
export function adobeRightsizing(lineItems, seats) {
  const plan = detectAdobePlan(lineItems);
  if (!plan || plan.tier !== 'all-apps') return null;       // bara All Apps har en Single App-nedförsäljning
  const currentEx = adobeListExVat(plan.sku, 'all-apps');
  const targetEx  = adobeListExVat(plan.sku, 'single-app');
  if (!(currentEx > 0) || !(targetEx > 0) || !(currentEx > targetEx)) return null;

  const s = Number(seats) > 0 ? Math.round(Number(seats)) : null;
  const perSeatDelta = round2(currentEx - targetEx);
  const annualSaving = s ? Math.round(perSeatDelta * 12 * s) : null;
  const skuLabel = plan.sku === 'team' ? 'Team' : 'individ';
  const unit = plan.sku === 'team' ? 'kr/licens/mån' : 'kr/användare/mån';

  return {
    sku:                 plan.sku,
    currentTier:         'all-apps',
    currentLabel:        LABELS['all-apps'],
    currentMonthlyExVat: currentEx,
    currentMonthlyLabel: fmt2(currentEx),
    targetTier:          'single-app',
    targetLabel:         LABELS['single-app'],
    targetMonthlyExVat:  targetEx,
    targetMonthlyLabel:  fmt2(targetEx),
    perSeatDelta,
    perSeatDeltaLabel:   fmt2(perSeatDelta),
    seats:               s,
    annualSaving,
    annualSavingLabel:   annualSaving != null ? fmt0(annualSaving) : null,
    unit,
    needsReview:         true,
    reviewPrompt:
      `Ni betalar för Adobe ${LABELS['all-apps']} (${fmt2(currentEx)} ${unit} exkl moms, ${skuLabel}). ` +
      `Använder era användare i praktiken bara ETT program (t.ex. bara Photoshop)? Då räcker ` +
      `${LABELS['single-app']} (${fmt2(targetEx)} ${unit} exkl moms) — ${fmt2(perSeatDelta)} ${unit} billigare per licens. ` +
      (annualSaving != null ? `Bekräfta så realiserar vi upp till ${fmt0(annualSaving)} kr/år.` : 'Bekräfta antal licenser så räknar vi hem beloppet.'),
    note:
      `Verifierad prisskillnad Alla program → Single App (Adobe ${skuLabel}, exkl moms): ${fmt2(perSeatDelta)} ${unit}` +
      (annualSaving != null ? ` × 12 × ${s} = ${fmt0(annualSaving)} kr/år` : '') +
      ` (adobe.com/se). Förutsätter att behovet ryms i ett enskilt program.`,
  };
}
