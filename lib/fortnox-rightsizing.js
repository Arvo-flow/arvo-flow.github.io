// lib/fortnox-rightsizing.js — deterministisk rätt-storleks-rådgivning för Fortnox (saas-finance).
//
// Zero Trust: vi gissar ALDRIG en besparing. Den enda siffra vi visar är skillnaden mellan
// TVÅ publika, verifierade Fortnox-listpriser (BRANCHINDEX.fortnoxVerified, vaktad veckovis).
// Om kunden betalar för paket "Stor" (710) finns "Mellan" (490) en nivå ner — prisskillnaden
// 220 kr/mån är ett FAKTUM. Huruvida den gäller beror på kundens användning (moduler/volym),
// vilket vi INTE kan läsa ur en faktura → vi ställer revisorsfrågan (rådgivande revisor, precis
// som shelfware). Bekräftat behov → realiserad besparing. Aldrig en påhittad siffra (regel 2/3).
//
// Igenkänns ingen Fortnox-paketrad → null (recommend() faller då till talfritt offert-läge;
// det ESTIMERADE saas-finance-matrisvärdet når ALDRIG kund).

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// Standardpaketens nedgraderingsstege (stigande pris). +-varianter och Byråpartner är egna
// produktlinjer (annat innehåll) och ingår inte i stegen.
const PAKET_STEGE = ['Mini', 'Liten', 'Mellan', 'Stor'];

/**
 * Hittar vilket Fortnox-paket kunden faktiskt betalar för, ur fakturaraderna.
 * Kräver att radbeskrivningen nämner paketnamnet. Returnerar null om inget känt paket.
 * @returns {{name,monthly,billedMonthly}|null}
 */
export function detectFortnoxPaket(lineItems) {
  const fv = BRANCHINDEX['saas-finance']?.fortnoxVerified;
  if (!fv?.paket) return null;
  for (const item of lineItems ?? []) {
    const desc = String(item?.description ?? '');
    if (!/fortnox|paket/i.test(desc)) continue; // bara rader som faktiskt rör Fortnox/paket
    for (const name of PAKET_STEGE) {
      if (new RegExp(`\\b${name}\\b`, 'i').test(desc)) {
        return { name, monthly: fv.paket[name], billedMonthly: item?.amount ?? null };
      }
    }
  }
  return null;
}

/**
 * Rätt-storleks-rådgivning: ett steg ner i paketstegen, med den VERIFIERADE prisskillnaden.
 * Advisory/review — besparingen realiseras först när kunden bekräftat att behovet ryms.
 * @returns {{currentPaket,currentMonthly,targetPaket,targetMonthly,deltaMonthly,annualSaving,
 *            needsReview,reviewPrompt,note}|null}
 */
export function fortnoxRightsizing(lineItems) {
  const fv = BRANCHINDEX['saas-finance']?.fortnoxVerified;
  if (!fv?.paket) return null;
  const current = detectFortnoxPaket(lineItems);
  if (!current) return null;

  const idx = PAKET_STEGE.indexOf(current.name);
  if (idx <= 0) return null; // redan på Mini (billigaste) → inget att nedgradera

  const targetName = PAKET_STEGE[idx - 1];
  const targetMonthly = fv.paket[targetName];
  const deltaMonthly = current.monthly - targetMonthly;
  if (!(deltaMonthly > 0)) return null;

  const annualSaving = deltaMonthly * 12;
  return {
    currentPaket: current.name,
    currentMonthly: current.monthly,
    targetPaket: targetName,
    targetMonthly,
    deltaMonthly,
    annualSaving,
    needsReview: true,
    reviewPrompt: `Ni betalar för Fortnox-paketet ${current.name} (${current.monthly} kr/mån). Nivån under, ${targetName}, kostar ${targetMonthly} kr/mån — ${deltaMonthly} kr/mån billigare. Ryms er användning (moduler, antal användare, verifikationsvolym) i ${targetName}? Bekräfta så realiserar vi ${annualSaving} kr/år.`,
    note: `Verifierad prisskillnad ${current.name}→${targetName}: ${deltaMonthly} kr/mån × 12 = ${annualSaving} kr/år (publika listpriser, fortnox.se/produkt/prislista). Förutsätter att behovet ryms i ${targetName}.`,
  };
}
