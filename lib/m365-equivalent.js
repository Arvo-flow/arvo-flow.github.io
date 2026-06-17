// lib/m365-equivalent.js — den BEVISADE datan (M365, verifierat SEK) som benchmark för den OBEVISADE
// (Google Workspace, inget publikt SEK). Google hålls i talfritt offert-läge (google-sek-grind), men
// kortet får ändå bära en ärlig, verifierad referens: vad den LIKVÄRDIGA Microsoft-sviten kostar i SEK
// för kundens volym. Detta är Microsofts publika listpris (currency:'SEK', ingen FX) — ALDRIG en proxy
// för Googles pris och ALDRIG en påstådd Google→M365-besparing (det kräver Googles SEK, som vi inte har).
//
// Zero Trust: varje tal kommer ur BRANCHINDEX M365-tiers (verifierade veckovis av fabriken, lib/verifiers/
// m365.mjs). Saknas verifierat SEK eller nivå → null (kortet faller till ren offert-copy utan referens).

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// Närmaste M365-motsvarighet per Google-nivå. "Närmaste", INTE identisk — Google är webb-först,
// M365 Business Standard+ inkluderar desktop-Office. equivalenceNote namnger skillnaden ärligt.
const GOOGLE_TO_M365 = {
  'google-starter': {
    tier: 'business-basic', label: 'Microsoft 365 Business Basic',
    equivalenceNote: 'Närmaste motsvarighet: båda är instegsnivåer (webb/mobil-appar, ingen desktop-Office).',
  },
  'google-standard': {
    tier: 'business-standard', label: 'Microsoft 365 Business Standard',
    equivalenceNote: 'Närmaste motsvarighet: M365 Business Standard inkluderar desktop-Office (Word/Excel/Outlook); Google Standard är webbaserat — väg mot ert funktionsbehov.',
  },
  'google-plus': {
    tier: 'business-premium', label: 'Microsoft 365 Business Premium',
    equivalenceNote: 'Närmaste motsvarighet på säkerhetsnivå: M365 Business Premium lägger till Intune MDM + Defender; Google Plus ger utökad säkerhet/eDiscovery.',
  },
};

const fmt2 = (n) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const fmt0 = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

/**
 * Härled antal säten ur en Google-faktura (kod räknar, regel 2): seatCount → summa av rad-quantity
 * på Google-rader → "(N lic/licenser/användare)" i radtext. Returnerar heltal > 0 eller null.
 * Aldrig employees som fallback — det är ett ANNAT tal än betalda licenser (skulle göra referensen fel).
 */
export function deriveGoogleSeats(invoice) {
  if (Number(invoice?.seatCount) > 0) return Math.round(Number(invoice.seatCount));
  let q = 0;
  for (const it of invoice?.lineItems ?? []) {
    const desc = String(it?.description ?? '');
    if (!/google/i.test(desc)) continue;
    if (Number(it?.quantity) > 0) { q += Math.round(Number(it.quantity)); continue; }
    const m = /\((\d+)\s*(?:lic|licenser|licens|anv|användare|st)\b/i.exec(desc);
    if (m) q += Number(m[1]);
  }
  return q > 0 ? q : null;
}

/**
 * Verifierad M365-referens för ett Google-kort. Allt i SEK ur Microsofts publika listpris.
 * @param {string} googleTierKey  google-starter|google-standard|google-plus
 * @param {number|null} seats     antal betalda säten (för totalen); null → bara per-säte visas
 * @returns {object|null}         referensobjekt, eller null om nivå/verifierat SEK saknas
 */
export function m365EquivalentForGoogle(googleTierKey, seats) {
  const map = GOOGLE_TO_M365[googleTierKey];
  if (!map) return null;
  const bm = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[map.tier];
  // Zero Trust: bara verifierat SEK-listpris får agera referens (aldrig FX-konverterat).
  if (!bm || bm.currency !== 'SEK' || !(bm.msrpAnnual > 0)) return null;

  const perSeatMonthly = bm.msrpAnnual;                 // SEK/anv/mån vid årsavtal (det företag faktiskt betalar)
  const s = Number(seats) > 0 ? Math.round(Number(seats)) : null;
  const monthlyTotal = s ? Math.round(perSeatMonthly * s) : null;
  const annualTotal  = monthlyTotal != null ? monthlyTotal * 12 : null;

  return {
    m365Tier:           map.tier,
    m365TierLabel:      map.label,
    equivalenceNote:    map.equivalenceNote,
    perSeatMonthly,
    perSeatMonthlyLabel: fmt2(perSeatMonthly),
    seats:              s,
    monthlyTotal,
    monthlyTotalLabel:  monthlyTotal != null ? fmt0(monthlyTotal) : null,
    annualTotal,
    annualTotalLabel:   annualTotal != null ? fmt0(annualTotal) : null,
    source:             bm.source,                       // microsoft.com
    lastVerified:       bm.lastVerified,
    billingNote:        'Microsofts publika listpris vid årsavtal. Detta är priset för den likvärdiga sviten — inte ert Google-pris.',
  };
}
