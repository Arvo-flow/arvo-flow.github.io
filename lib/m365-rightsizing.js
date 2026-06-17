// lib/m365-rightsizing.js — M365 rätt-storleks-rådgivning (saas-productivity), den sista skruven
// i M365-historien. Flaggskeppet: enterprise-tiers (E3/E5) → Business Premium för SMF. E3/E5:s
// compliance/SIEM/eDiscovery är sällan motiverat under ~100–300 användare; Business Premium ger
// Intune MDM + Defender for Business — säkerheten de flesta SMF faktiskt behöver.
//
// Zero Trust: den enda kundsynliga siffran är skillnaden mellan TVÅ verifierade publika SEK-listpriser
// (BRANCHINDEX M365-tiers, vaktade veckovis av lib/verifiers/m365.mjs). Ingen FX. ADVISORY/REVIEW:
// prisskillnaden är ett FAKTUM, men huruvida den gäller beror på funktionsbehovet (compliance/eDiscovery)
// — det kan vi INTE läsa ur en faktura, så vi ställer revisorsfrågan (samma mönster som Fortnox/shelfware).
// optimizationSaving hålls null tills kunden bekräftat. Saknas tier/säten/verifierat SEK → null.
//
// MEDVETEN GRÄNS: vi nedförsäljer bara E3/E5 → Business Premium. Premium→Standard→Basic lämnas utanför
// den automatiska rådgivningen — de stegen tappar konkreta funktioner (Intune/Defender, desktop-Office)
// som de flesta faktiskt använder, så vi påstår ingen besparing där (precision eller tystnad).

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const DOWNSELL_TARGET = { e5: 'business-premium', e3: 'business-premium' };
const LABELS = {
  e3: 'Microsoft 365 E3', e5: 'Microsoft 365 E5',
  'business-premium': 'Microsoft 365 Business Premium',
};
const ENTERPRISE_FEATURES = {
  e5: 'SIEM, Defender for Endpoint, Power BI Pro och Purview-compliance',
  e3: 'eDiscovery, avancerat auditlogg och Purview-compliance',
};
const SMB_SEAT_CEILING = 300;   // över detta KAN enterprise-compliance vara motiverat → ingen rådgivning

const fmt2 = (n) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const fmt0 = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

/**
 * Härled antal M365-säten ur fakturan (kod räknar, regel 2): seatCount → summa rad-quantity →
 * "(N lic/användare)" i radtext. Aldrig employees (ett annat tal än betalda licenser).
 */
export function deriveM365Seats(invoice) {
  if (Number(invoice?.seatCount) > 0) return Math.round(Number(invoice.seatCount));
  let q = 0;
  for (const it of invoice?.lineItems ?? []) {
    if (it?.type !== 'recurring_subscription') continue;
    if (Number(it?.quantity) > 0) { q += Math.round(Number(it.quantity)); continue; }
    const m = /\((\d+)\s*(?:lic|licenser|licens|anv|användare|st)\b/i.exec(String(it?.description ?? ''));
    if (m) q += Number(m[1]);
  }
  return q > 0 ? q : null;
}

/**
 * Verifierad M365 rätt-storleks-rådgivning. Bara E3/E5 (enterprise) → Business Premium, bara för SMF.
 * @param {string} currentTierKey  dominant M365-tier (e3|e5|business-*)
 * @param {number|null} seats      betalda säten på enterprise-nivån
 * @returns {object|null}          advisory-objekt, eller null om ingen verifierad nedförsäljning finns
 */
export function m365Rightsizing(currentTierKey, seats) {
  const targetKey = DOWNSELL_TARGET[currentTierKey];
  if (!targetKey) return null;                       // bara E3/E5 har en SMF-nedförsäljning
  const s = Number(seats);
  if (!(s > 0) || s > SMB_SEAT_CEILING) return null; // enterprise KAN vara motiverat i stora org
  const cur = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[currentTierKey];
  const tgt = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[targetKey];
  // Zero Trust: båda måste vara verifierat SEK-listpris.
  if (!cur || !tgt || cur.currency !== 'SEK' || tgt.currency !== 'SEK') return null;
  if (!(cur.msrpAnnual > tgt.msrpAnnual)) return null;

  const seatsR = Math.round(s);
  const perSeatDelta = Math.round((cur.msrpAnnual - tgt.msrpAnnual) * 100) / 100;
  const annualSaving = Math.round(perSeatDelta * 12 * seatsR);

  return {
    currentTier:          currentTierKey,
    currentLabel:         LABELS[currentTierKey],
    currentPerSeatMonthly: cur.msrpAnnual,
    currentPerSeatLabel:  fmt2(cur.msrpAnnual),
    targetTier:           targetKey,
    targetLabel:          LABELS[targetKey],
    targetPerSeatMonthly: tgt.msrpAnnual,
    targetPerSeatLabel:   fmt2(tgt.msrpAnnual),
    perSeatDelta,
    perSeatDeltaLabel:    fmt2(perSeatDelta),
    seats:                seatsR,
    annualSaving,
    annualSavingLabel:    fmt0(annualSaving),
    needsReview:          true,
    reviewPrompt:
      `Ni betalar för ${LABELS[currentTierKey]} (${fmt2(cur.msrpAnnual)} kr/användare/månad) — full enterprise-svit ` +
      `med ${ENTERPRISE_FEATURES[currentTierKey]}. Det är sällan motiverat under ~100 användare. ` +
      `Microsoft 365 Business Premium (${fmt2(tgt.msrpAnnual)} kr/användare/månad) ger Intune MDM + Defender for Business ` +
      `— säkerheten de flesta SMF behöver. Kräver ni inte ${currentTierKey.toUpperCase()}:s enterprise-funktioner ` +
      `realiserar vi upp till ${fmt0(annualSaving)} kr/år.`,
    note:
      `Verifierad prisskillnad ${LABELS[currentTierKey]} → Business Premium: ${fmt2(perSeatDelta)} kr/användare/månad ` +
      `× 12 × ${seatsR} användare = ${fmt0(annualSaving)} kr/år (Microsofts publika listpriser, microsoft.com). ` +
      `Förutsätter att behovet inte kräver enterprise-funktionerna.`,
  };
}
