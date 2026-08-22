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
      if (l.quantity == null) continue;
      if (l.type === 'variable_usage') continue;
      if (!(l.quantity > 0)) continue;

      // ── ÖRE FÖRE KRONOR (2026-08-22, ur den första riktiga grindmätningen) ──────────────────
      // Mätt mot 75 verkliga fakturor: grinden fällde 8 av 69, och SJU var elfakturor. Orsaken
      // var inte fakturorna utan grinden:
      //   Fortum  3400 kWh × 1 kr = 3400, belopp 3808  → verkligt à-pris 1,12 kr
      //   Tibber  2100 kWh × 1 kr = 2100, belopp 1751  → verkligt 0,834 kr
      //   Tryggel 3100 kWh × 2 kr = 6200, belopp 5735  → verkligt 1,85 kr
      // `unitPrice` är ett HELTALSFÄLT i kronor, och elpriser ligger på 0,80–1,90 kr/kWh.
      // Avrundningen ensam gör aritmetiken omöjlig — grinden mätte fel sak, och 7 av 8 utfall var
      // falsklarm per konstruktion (samma familj som E5-fallet 20 augusti).
      //
      // Fältet som löser det fanns redan: `unit_price_ore`/`amount_ore` infördes 12 augusti för
      // exakt den här förväxlingen («kronorfältet kan inte bära ett per-licenspris: 133,82 → 133»).
      // Avstämningsgrinden fick fixen då; balanskravet fick den aldrig. Här är den.
      const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
      const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore : null;
      const iOre = oreA != null && oreB != null;
      const apris  = iOre ? oreA : l.unitPrice;
      const belopp = iOre ? oreB : l.amount;
      if (apris == null || !(apris > 0)) continue;

      // ── VI DÖMER INTE DET VI INTE KAN MÄTA ──────────────────────────────────────────────────
      // Första fixen vidgade i stället kronortoleransen till 0,5 kr per enhet — matematiskt
      // korrekt (så stort KAN avrundningsfelet vara) men praktiskt förödande: 3 400 kWh ger
      // 1 700 kr tolerans, och grinden godkänner nästan vad som helst. Mitt eget sabotage
      // avslöjade det: att stänga av öresvägen ändrade ingenting, för kronorvägen svalde allt.
      // En grind som är grön för att den slutat titta är samma sjukdom som resten av obduktionen.
      //
      // Rätt svar är fail-closed på FÄLTET: utan öresfält är ett litet à-pris (< 10 kr) obrukbart
      // — avrundningen är då upp till 50 % av priset — och raden räknas som ODÖMBAR, inte som
      // godkänd. Vid à-pris ≥ 10 kr är avrundningen ≤ 5 % och den vanliga toleransen bär.
      if (!iOre && apris < 10) continue;

      judged++;
      const expected  = l.quantity * apris;
      // I öre är aritmetiken exakt — då räcker en öresavrundning per rad.
      const tolerance = iOre
        ? Math.max(100, expected * 0.005)
        : Math.max(2, expected * 0.02, l.quantity * 0.5);

      // KREDITERING (samma mätning): Tele2:s kreditfaktura har antal 1 × 898 kr och beloppet
      // −898. Grinden såg 1 796 kr fel. Ett negativt belopp är en kreditering per konstruktion —
      // aritmetiken ska prövas på beloppets STORLEK, och tecknet är inte grindens fråga.
      const kreditering = belopp < 0;
      const provbart = Math.abs(belopp);

      if (l.is_prorata === true) {
        // Delperiod: 0 < belopp ≤ fullt pris (+tolerans)
        if (!(provbart > 0) || provbart > expected + tolerance) {
          violations.push({
            line: l.description, expected, actual: belopp,
            reason: 'prorata_belopp_överstiger_fullt_pris',
          });
        }
      } else if (Math.abs(provbart - expected) > tolerance) {
        violations.push({
          line: l.description, expected, actual: belopp,
          reason: kreditering ? 'kreditering_matchar_inte_radbelopp' : 'antal_x_apris_matchar_inte_radbelopp',
        });
      }
    }
  } catch (err) {
    // ── EN GRIND SOM KRASCHAR HAR INTE GODKÄNT NÅGOT (obduktion 2026-08-20) ──────────────────
    // Här stod `return { balanced: true }`. Ett undantag mitt i radgranskningen rapporterades
    // alltså som GODKÄND BALANS — fail-open i en grind vars hela syfte är att fälla. Den som
    // läser utfallet kan inte skilja "alla rader gick ihop" från "jag kraschade på rad tre".
    //
    // Nu: kraschen är ett eget tillstånd. `balanced: false` med skälet bokfört, så att den som
    // armerar grinden vet att den föll av ett FEL och inte av ett fynd.
    console.error('[balanskrav] B2 KRASCHADE — utfallet är inte ett godkännande:', err.message);
    return { balanced: false, judged: 0, violations: [
      { line: null, expected: null, actual: null, reason: `b2_kraschade: ${err.message}` },
    ] };
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
export function judgeProjection(p) {
  try {
    // Destruktureringen bor INNE i try (obduktionen 2026-08-20). Stod den i parameterlistan
    // kastade `judgeProjection(null)` INNAN try ens började — så vaktens egen catch, som finns
    // just för att vakten aldrig ska bli produktionsrisken, kunde inte fånga den. Upptäckt av
    // OB-15, som försökte framtvinga en krasch och i stället avslöjade att skyddet satt på fel
    // sida om argumentläsningen.
    const { projectedFromAI, recurringAmount, proRataCount } = p ?? {};
    if (proRataCount > 0 || projectedFromAI == null || !(recurringAmount > 0)) {
      return { ok: true, deviationPct: 0 };
    }
    const deviationPct = Math.abs(projectedFromAI - recurringAmount) / recurringAmount * 100;
    return { ok: deviationPct <= 2, deviationPct: Math.round(deviationPct * 10) / 10 };
  } catch (err) {
    // ── KRASCH ÄR INTE «AVVIKELSE 0 %» (obduktionen 2026-08-20) ─────────────────────────────
    // Raden returnerade `{ ok: true, deviationPct: 0 }` — exakt samma svar som en projektion
    // som stämde PÅ KRONAN. Den som läser utfallet kunde inte skilja «AI:ns tal matchade
    // radsumman perfekt» från «jag kraschade innan jag hann räkna», och anroparen bokför
    // `provad: true`. Samma fel som judgeLineArithmetic bar (OB-09), i grannfunktionen.
    // Nu: ok:false med skälet bokfört. Armerad väljer då den DETERMINISTISKA radsumman framför
    // AI:ns tal, vilket är rätt utfall när kontrollen inte kunde göras (regel 2).
    return { ok: false, deviationPct: null, kraschade: true, skal: `judgeProjection kastade: ${err?.message ?? 'okänt fel'}` };
  }
}
