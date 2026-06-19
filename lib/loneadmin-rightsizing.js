// lib/loneadmin-rightsizing.js — deterministisk löneadministrations-rekommendation (ingen AI, ingen FX).
//
// Zero Trust: de enda talen är (a) kundens FAKTISKA per-anställd-kostnad ur deras egen faktura
// (normaliserad, exkl moms), (b) Fortnox Löns VERIFIERADE publika listpris (199 kr/mån fast +
// 25 kr/anställd/mån, exkl moms, vaktat veckovis i lib/verifiers/fortnox-lon.mjs). Fortnox Lön är
// ett komplett lönesystem till ett FAST pris — inte ett "från"-pris — så gapet mot kundens faktiska
// kostnad är ett FAKTUM. Huruvida bytet gäller beror på om lönehanteringen (kollektivavtal,
// integrationer) ryms i Fortnox Lön — det kan vi INTE läsa ur en faktura, så vi ställer revisorsfrågan
// (rådgivande, precis som Fortnox rätt-storlek). optimizationSaving hålls null tills kunden bekräftat.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const fmt0 = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const fmt2 = (n) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const zeroUsage = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };

// Engångsrader (ingår aldrig i den löpande per-anställd-kostnaden).
const ONE_OFF = /uppstart|startavgift|eng[åa]ngs|implementation|installation|migrering|utbildning|setup/i;
// Lönebesked/utskick (rörlig, redovisas separat — ingår ej i golvjämförelsen).
const PAYSLIP = /l[öo]nebesked|kivra|utskick\s+l[öo]n/i;
// Kunden ligger redan på Fortnox Lön → inget byte att föreslå.
const FORTNOX = /fortnox/i;

/** Anknyt antal anställda — aldrig en gissning. seatCount → rad-quantity → "(N anställda)" → customer.employees. */
export function deriveLoneadminHeadcount(invoice, customer) {
  if (Number(invoice?.seatCount) > 0) return Math.round(Number(invoice.seatCount));
  const qtys = (invoice?.lineItems ?? [])
    .filter((it) => !ONE_OFF.test(String(it?.description ?? '')))
    .map((it) => Number(it?.quantity))
    .filter((q) => Number.isFinite(q) && q > 1);
  if (qtys.length) return Math.max(...qtys);
  for (const it of invoice?.lineItems ?? []) {
    const m = String(it?.description ?? '').match(/\(?\s*(\d{1,4})\s*(?:anst[äa]llda|anst|l[öo]nebesked)\b/i);
    if (m) return parseInt(m[1], 10);
  }
  if (Number(customer?.employees) > 0) return Math.round(Number(customer.employees));
  return null;
}

/** Summa löpande löneadmin-kostnad (exkl moms, per månad). Engångsrader exkluderas.
 *  Lönebesked-/utskicksrader (rörliga) hålls UTANFÖR golvjämförelsen — Fortnox-golvet är fast och
 *  exkluderar dem, så att blanda in dem skulle blåsa upp gapet (regel 3, samma logik som molnväxel/mobil). */
function monthlyRecurring(invoice) {
  let monthly = 0, payslip = 0;
  const annual = (invoice?.billingPeriod === 'annual');
  for (const it of invoice?.lineItems ?? []) {
    const desc = String(it?.description ?? '');
    if (ONE_OFF.test(desc)) continue;
    const amt = Number(it?.amount);
    if (!Number.isFinite(amt) || amt <= 0) continue;
    const m = annual ? amt / 12 : amt;
    if (PAYSLIP.test(desc)) { payslip += m; continue; }   // rörlig → ut ur golvjämförelsen
    monthly += m;
  }
  return { monthly, payslip };
}

/** Talfritt offert-svar (ej normaliserbart) — ingen siffra utan källa. */
function quoteResponse() {
  return {
    shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
    reasoning: 'Vi ser en löneadministrationstjänst men kan inte säkert läsa per-anställd-kostnaden ur fakturan. ' +
      'Vi gör en manuell genomgång mot Fortnox Löns verifierade publika listpris istället för att visa en siffra vi inte kan stå för.',
    revisionGate: 'audited', loneadminRightsizing: null, benchmark: null,
    suggestedSupplier: null, suggestedAnnualCost: null, grossSaving: null, arvoFee: null, netSaving: null,
    savingPerYear: null, optimizationSaving: null, licenseOverage: null, overageSavings: null,
    confidence: 'low', switchSteps: [], usage: zeroUsage,
  };
}

export function loneadminRecommendation(input) {
  const fv = BRANCHINDEX.loneadmin?.fortnoxLonVerified;
  const invoice = input?.invoice ?? {};
  const headcount = deriveLoneadminHeadcount(invoice, input?.customer);
  const { monthly: currentMonthly, payslip: payslipMonthly } = monthlyRecurring(invoice);
  if (!fv || !headcount || headcount < 1 || !(currentMonthly > 0)) return quoteResponse();

  const perEmployee = round2(currentMonthly / headcount);
  // Fortnox Löns verifierade golv vid denna storlek (fast avgift slås ut per anställd).
  const floorTotal = fv.fixedMonthly + fv.perEmployeeMonthly * headcount;     // 199 + 25×N kr/mån
  const floorPerEmployee = round2(floorTotal / headcount);                    // 25 + 199/N kr/anst/mån
  const overFloorPct = floorPerEmployee > 0 ? Math.round(((perEmployee - floorPerEmployee) / floorPerEmployee) * 100) : null;

  const alreadyFortnox = (invoice.lineItems ?? []).some((it) => FORTNOX.test(String(it?.description ?? '')))
    || FORTNOX.test(String(input?.categorized?.normalizedSupplier ?? ''));
  const hasPayslip = payslipMonthly > 0;

  // Verifierad prisskillnad = FAKTUM. Realiseras vid byte FÖRUTSATT att behovet ryms i Fortnox Lön
  // (rådgivande revisor). annualSaving bär potentialen; optimizationSaving hålls null tills bekräftat.
  const aboveFloor = !alreadyFortnox && currentMonthly > floorTotal;
  const annualSaving = aboveFloor ? Math.round((currentMonthly - floorTotal) * 12) : null;

  let reasoning;
  if (alreadyFortnox) {
    reasoning = `Ni betalar ${fmt2(perEmployee)} kr/anställd och månad (exkl moms) för lönehantering av era ${headcount} anställda — ` +
      `ni ligger redan på Fortnox Löns verifierade nivå. Vi bevakar att det förblir så.`;
  } else if (aboveFloor) {
    reasoning = `Ni betalar ${fmt2(perEmployee)} kr/anställd och månad (exkl moms) för lönehantering av era ${headcount} anställda. ` +
      `Fortnox Lön — verifierat lägst — kostar ${fmt0(fv.fixedMonthly)} kr/mån + ${fmt0(fv.perEmployeeMonthly)} kr/anställd, ` +
      `dvs ${fmt2(floorPerEmployee)} kr/anställd för er storlek. ` +
      (overFloorPct != null && overFloorPct >= 15 ? `Ni ligger ~${overFloorPct} % över. ` : '') +
      `Ryms er lönehantering (kollektivavtal, integrationer) i Fortnox Lön? Bekräfta så realiserar vi upp till ${fmt0(annualSaving)} kr/år.`;
  } else {
    reasoning = `Ni betalar ${fmt2(perEmployee)} kr/anställd och månad (exkl moms) för era ${headcount} anställda — ` +
      `i nivå med Fortnox Löns verifierade golv (${fmt2(floorPerEmployee)} kr/anställd). Ni ligger rätt; vi bevakar.`;
  }
  if (hasPayslip) {
    reasoning += ` Lönebesked-/utskicksavgifter är rörliga och ingår inte i golvjämförelsen.`;
  }

  return {
    shouldSwitch: false, requiresQuote: false, recommendationType: 'optimize',
    reasoning,
    revisionGate: 'audited',
    loneadminRightsizing: {
      headcount,
      perEmployeeMonthly: perEmployee, perEmployeeLabel: fmt2(perEmployee),
      floorPerEmployee, floorPerEmployeeLabel: fmt2(floorPerEmployee),
      floorTotalMonthly: floorTotal, currentTotalMonthly: round2(currentMonthly),
      overFloorPct, annualSaving,            // verifierad potential (gated review) — INTE en hård besparing
      fortnoxProduct: fv.product, hasPayslip, excludedPayslipMonthly: round2(payslipMonthly), alreadyFortnox, aboveFloor,
    },
    // Benchmark-referens (verifierat golv) — aldrig en hård besparing.
    benchmark: {
      p25: floorPerEmployee * 12, median: floorPerEmployee * 12, source: 'real-public',
      note: `Fortnox Lön verifierat golv: ${fmt0(fv.fixedMonthly)} kr/mån + ${fmt0(fv.perEmployeeMonthly)} kr/anställd (exkl moms, fortnox.se verifierat). Per anställd/år vid ${headcount} anställda.`,
    },
    suggestedSupplier: aboveFloor ? 'Fortnox Lön' : null,
    // Zero Trust: ingen hård besparing renderas — potentialen lever i loneadminRightsizing.annualSaving (review).
    suggestedAnnualCost: null, grossSaving: null, arvoFee: null, netSaving: null,
    savingPerYear: null, optimizationSaving: null, licenseOverage: null, overageSavings: null,
    confidence: aboveFloor ? 'high' : 'medium', switchSteps: [], usage: zeroUsage,
  };
}
