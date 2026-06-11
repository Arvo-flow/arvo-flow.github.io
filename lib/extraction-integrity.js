// lib/extraction-integrity.js
// Fas 2 i flywheel-arkitekturen: deterministiska integritetskontroller
// som körs POST-extraction, PRE-categorize.
//
// Rättar självklara AI-misstag utan att ändra prompts. Varje override
// returneras som en labeled correction för träning av systemet.
//
// Designprincip: fail-open. Inga undantag ska nå anroparen —
// vid fel returneras originaldatan oförändrad.

const LICENSFAKTURA_RE = /LICENSFAKTURA|LICENSAVGIFT|LICENSE INVOICE/i;
const MONTHLY_PERIOD_RE = /^\d{4}-\d{2}-\d{2}\s*[-–]\s*\d{4}-\d{2}-\d{2}$/;

function monthsBetween(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(/[-–]/).map(s => s.trim());
  if (parts.length !== 2) return null;
  const [from, to] = parts.map(s => new Date(s));
  if (isNaN(from) || isNaN(to)) return null;
  const diff = (to - from) / (1000 * 60 * 60 * 24);
  if (diff >= 25 && diff <= 35) return 1;
  if (diff >= 85 && diff <= 95) return 3;
  if (diff >= 355 && diff <= 370) return 12;
  return null;
}

/**
 * Kör deterministiska integritetskontroller på extraherade fakturadata.
 *
 * @param {object} extracted  - Output från extract.js
 * @param {string} [invoiceHeader] - Råtext från fakturahuvudet (valfritt, för pre-heuristics)
 * @returns {{ result: object, overrides: Array }}
 */
export function runIntegrityChecks(extracted, invoiceHeader = '') {
  const overrides = [];
  let result = { ...extracted };

  try {
    const lineItems = extracted.lineItems ?? [];
    const hasRecurringItems = lineItems.some(l => l.type === 'recurring_subscription');

    // 1. recurring_subscription-rader finns men recurring=false → tvinga true
    //    Klassisk Lime CRM-bug: LICENSFAKTURA + månadsperiod missas av AI.
    if (hasRecurringItems && result.recurring === false) {
      result.recurring = true;
      overrides.push({
        field:    'recurring',
        original: false,
        corrected: true,
        reason:   'recurring_subscription_line_items_present',
        severity: 'fix',
      });
    }

    // 2. Pre-heuristic: LICENSFAKTURA + månadsperiod → recurring: true
    //    Körs även om inga lineItems är klassificerade (pre-AI-override).
    if (!result.recurring && LICENSFAKTURA_RE.test(invoiceHeader)) {
      const months = monthsBetween(extracted.billingPeriod);
      if (months === 1) {
        result.recurring = true;
        overrides.push({
          field:    'recurring',
          original: false,
          corrected: true,
          reason:   'licensfaktura_header_with_monthly_period',
          severity: 'fix',
        });
      }
    }

    // 3. Matematik: lineItems-summa ska stämma mot fakturabeloppet ±3%
    const lineItemsTotal = lineItems.reduce((sum, l) => sum + (l.amount ?? 0), 0);
    const invoiceAmount  = extracted.amount ?? 0;
    if (lineItemsTotal > 0 && invoiceAmount > 0) {
      const deviation = Math.abs(lineItemsTotal - invoiceAmount) / invoiceAmount;
      if (deviation > 0.03) {
        overrides.push({
          field:    'lineItemsTotal',
          original: lineItemsTotal,
          corrected: invoiceAmount,
          reason:   `lineitems_sum_deviates_${Math.round(deviation * 100)}pct`,
          severity: deviation > 0.10 ? 'warning' : 'info',
        });
      }
    }

    // 4. Korsvalidering: seatCount × pricePerSeat ≈ fakturabeloppp
    const seats = extracted.seatCount;
    const pps   = extracted.pricePerSeatMonthly;
    if (seats > 0 && pps > 0 && invoiceAmount > 0) {
      const expected  = seats * pps;
      const deviation = Math.abs(expected - invoiceAmount) / invoiceAmount;
      if (deviation > 0.15) {
        overrides.push({
          field:    'seatCountCrossCheck',
          original: `${seats} × ${pps} = ${expected}`,
          corrected: invoiceAmount,
          reason:   `seat_x_price_deviates_${Math.round(deviation * 100)}pct_from_invoice`,
          severity: 'warning',
        });
      }
    }

    // 5. annualCost konsistens: om recurring, annualCost ska ≈ recurringAmount × period
    if (result.recurring && extracted.recurringAmount > 0 && extracted.annualCost > 0) {
      const months   = monthsBetween(extracted.billingPeriod) ?? 1;
      const multiplier = months > 0 ? Math.round(12 / months) : 12;
      const expected   = extracted.recurringAmount * multiplier;
      const deviation  = Math.abs(extracted.annualCost - expected) / expected;
      if (deviation > 0.02) {
        overrides.push({
          field:    'annualCost',
          original: extracted.annualCost,
          corrected: expected,
          reason:   `annual_cost_deviates_${Math.round(deviation * 100)}pct_from_recurring_x_period`,
          severity: 'info',
        });
      }
    }

  } catch (err) {
    console.warn('[extraction-integrity] check failed, returning original:', err.message);
  }

  return { result, overrides };
}

// ── Balanskravet · B2 — per-rad-aritmetik ─────────────────────────────────────
//
// Ring 1 (routeExtraction i extract.js) verifierar redan radsumman mot
// fakturatotalen (B1). B2 dömer varje enskild rad: antal × à-pris ska ge
// radbeloppet. Det är kontrollen som fångar felläst kvantitet eller à-pris —
// felklassen där exakt matematik annars körs på fel siffror.
//
// Prorata-rader: delperiodsdebitering ⇒ beloppet ska vara ≤ antal × à-pris
// (fullt pris) men > 0. Rörliga rader (variable_usage) bedöms inte — deras
// "à-pris" är taxor, inte styckpris. Rader utan antal/à-pris kan inte dömas.
//
// Lanseras i SKUGG-LÄGE: anroparen loggar utfallet utan att stoppa, tills
// falsklarmsfrekvensen är uppmätt. Armeras via env BALANSKRAV_ENFORCE=1.

/**
 * @param {object} extracted - aggregerad extraktion (lineItems krävs)
 * @returns {{ balanced: boolean, judged: number, violations: Array<{line, expected, actual, reason}> }}
 */
export function judgeLineArithmetic(extracted) {
  const violations = [];
  let judged = 0;

  try {
    for (const l of extracted?.lineItems ?? []) {
      if (l.quantity == null || l.unitPrice == null) continue;
      if (l.type === 'variable_usage') continue;
      if (!(l.quantity > 0) || !(l.unitPrice > 0)) continue;

      judged++;
      const expected  = l.quantity * l.unitPrice;
      const tolerance = Math.max(2, expected * 0.02); // öresavrundning + heltalsbelopp i schemat

      if (l.is_prorata === true) {
        // Delperiod: 0 < belopp ≤ fullt pris (+tolerans)
        if (!(l.amount > 0) || l.amount > expected + tolerance) {
          violations.push({
            line: l.description, expected, actual: l.amount,
            reason: 'prorata_belopp_överstiger_fullt_pris',
          });
        }
      } else if (Math.abs(l.amount - expected) > tolerance) {
        violations.push({
          line: l.description, expected, actual: l.amount,
          reason: 'antal_x_apris_matchar_inte_radbelopp',
        });
      }
    }
  } catch (err) {
    console.warn('[balanskrav] B2 fail-open:', err.message);
    return { balanced: true, judged: 0, violations: [] };
  }

  return { balanced: violations.length === 0, judged, violations };
}

// ── Projektionskravet ─────────────────────────────────────────────────────────
//
// extract.js föredrar AI:ns projectedRecurringAmount framför den deterministiska
// radsumman när inga prorata-rader finns (avsett för delperiodsfakturor utan
// is_prorata-flaggor). Det är en väg där ett AI-RÄKNAT tal kan glida in i den
// deterministiska kedjan oblockerat — regel 2-brott i smyg. Projektionskravet
// dömer: utan prorata-rader får AI-projektionen avvika max 2 % från radsumman.
//
// Lanseras i SKUGG-LÄGE (logg). Armeras via env PROJEKTIONSKRAV_ENFORCE=1 —
// då används radsumman när kravet underkänns.

/**
 * @param {{ projectedFromAI: number|null, recurringAmount: number, proRataCount: number }} p
 * @returns {{ ok: boolean, deviationPct: number }}
 */
export function judgeProjection({ projectedFromAI, recurringAmount, proRataCount }) {
  try {
    if (proRataCount > 0 || projectedFromAI == null || !(recurringAmount > 0)) {
      return { ok: true, deviationPct: 0 };
    }
    const deviationPct = Math.abs(projectedFromAI - recurringAmount) / recurringAmount * 100;
    return { ok: deviationPct <= 2, deviationPct: Math.round(deviationPct * 10) / 10 };
  } catch {
    return { ok: true, deviationPct: 0 };
  }
}
