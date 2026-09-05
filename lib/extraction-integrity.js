// lib/extraction-integrity.js
// Fas 2 i flywheel-arkitekturen: deterministiska integritetskontroller
// som körs POST-extraction, PRE-categorize.
//
// Rättar självklara AI-misstag utan att ändra prompts. Varje override
// returneras som en labeled correction för träning av systemet.
//
// Designprincip: fail-open. Inga undantag ska nå anroparen —
// vid fel returneras originaldatan oförändrad.

import { radensOre } from './radobservation.js';
import { perioderPerAr } from './faktureringsperiod.js';

const LICENSFAKTURA_RE = /LICENSFAKTURA|LICENSAVGIFT|LICENSE INVOICE/i;

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
    //
    // ⚠️ DEN HÄR GRENEN ÄR I DAG OMATAD, OCH DET SKA STÅ HÄR (2026-08-24). `invoiceHeader` kommer
    // ur `body.pdfRawHeader` (api/test-invoice.mjs:576) — ett fält ingen klient skickar. Grenen
    // kan alltså inte fyra i produktion. Den behålls därför att intentionen är verklig (Lime
    // CRM-buggen), men den räknas INTE som ett skydd vi har: en gren som ser ut som ett lager
    // utan att vara det räknar ett skydd vi inte har. Testet FP-03 låser att den är översatt
    // rätt, så att den fungerar den dag någon matar den — och att ingen tror den vaktar i dag.
    // Den läste dessutom `monthsBetween(billingPeriod)` på ett ENUM och kunde aldrig ge 1.
    if (!result.recurring && LICENSFAKTURA_RE.test(invoiceHeader)) {
      if (perioderPerAr(extracted.billingPeriod) === 12) {
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

    // 3. ── BORTTAGEN 2026-08-24: KONTROLLEN JÄMFÖRDE SUMMAN MED SIG SJÄLV ────────────────────
    // Här stod en kontroll som ställde `lineItems.reduce(...amount)` mot `extracted.amount`.
    // Men `aggregateLineItems` SÄTTER `amount` till exakt den summan (extract.js:960) — samma
    // reduce över samma array. Avvikelsen var per konstruktion 0, alltså kunde kontrollen aldrig
    // fälla. Körbart bevis: en faktura där 4 000 av 5 000 kr saknas i raderna gav `overrides: []`;
    // ett motprov där `amount` tvingades till 5 000 gav larmet. Mekanismen svarade — signalen
    // kunde aldrig röra sig. Det är villkorsvaktens sjukdom (Verifieringsplikten p.5), och
    // kontrollen var skriven för `invoiceTotal`, ett ANNAT fält.
    //
    // Den riktiga kontrollen finns redan på rätt axel: Ring 1 i `routeExtraction` (extract.js:1064)
    // jämför radsumman mot `extracted.invoiceTotal` — fakturans AVLÄSTA totalbelopp — och skickar
    // till review_queue. Att låta en död dubblett stå kvar räknar ett skydd vi inte har (bibeln,
    // rumsgranskningen: «två grenar som ser ut som två lager men är ett»). Därför borttagen i
    // stället för lagad. `tests/enhetsantagandet.mjs` EA-07 låser att den inte återinförs.
    const invoiceAmount = extracted.amount ?? 0;

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

    // 5. ── BORTTAGEN 2026-08-24 (Fable 5:s granskning): KONTROLLEN VAR EN DUBBLETT ─────────
    // Här stod «annualCost ska ≈ recurringAmount × period». Men annualCost ÄR per konstruktion
    // `projected × multiplier` (extract.js) — så jämförelsen annualCost mot recurring × perAr är
    // ALGEBRAISKT IDENTISK med jämförelsen projected mot recurring. Det tillståndet uppstår i
    // exakt två fall: (a) prorata, där projektionen är deterministiskt kodräknad och KORREKT,
    // och (b) en AI-avvikelse som projektionskravet redan dömt. Mätt över fyra fakturaformer:
    // månad/kvartal/år gav ingen override; prorata gav override 18 000 → «12 000» — det korrekta
    // talet «korrigerades» till det felaktiga, och varje sådan rad gick till labeled_corrections.
    // Kontrollens ENDA nåbara gren var alltså hundraprocentigt falsklarm in i flywheeln.
    //
    // Min fix samma morgon (perioderPerAr i stället för monthsBetween ?? 1) gjorde den mindre
    // fel men lämnade formen: kontroll 3-sjukan — en jämförelse med sig själv — ett steg in.
    // Borttagen som kontroll 3: en död dubblett räknar ett skydd vi inte har. Den riktiga vakten
    // är projektionskravet, som dömer projected mot recurring FÖRE talet blir annualCost.
    // EA-08 fäller ett återinförande; getPatterns karantänerar de historiska raderna.
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
      // À-PRISET ÄR DET SOM MÅSTE BÄRA ÖREN — BELOPPET RÄCKER I KRONOR.
      // Första versionen krävde BÅDA öresfälten och stängde därmed öresvägen på just de fakturor
      // den byggdes för. Schemat säger `amount_ore: null om beloppet inte står med öresprecision`,
      // och Fortums belopp ÄR jämna 3 808 kr — så modellen svarar korrekt null, och min grind
      // tolkade det som «inga öresdata». Textlagret visade sanningen utan ett enda modellanrop:
      // fakturan skriver «kWh 1,12» i klartext. Talet fanns hela tiden; grinden vägrade läsa det.
      //
      // Ett belopp i hela kronor är EXAKT i öre (× 100) — det är en enhetskonvertering av ett
      // känt tal, inte en härledning av ett okänt. Därför räcker `unit_price_ore`.
      //
      // ⚠️ RÄTTELSE 2026-08-24: raderna ovan läste `l.unit_price_ore` direkt — modellens
      // RÅSTAVNING. Produktionen skickar hit den AGGREGERADE raden, där fältet heter
      // `unitPriceOre`, så öresvägen kunde aldrig fyra: Fortum-raden blev `judged: 0` i stället
      // för godkänd, och grinden var lika blind som före fixen. Testerna var gröna för att de
      // matade rådataformen direkt till funktionen — mekanismen prövad, matningen aldrig.
      // Läsvägen bor nu på ETT ställe (regel 1) och känner båda stegens stavning.
      const { aprisOre, beloppOre, iOre } = radensOre(l);
      const apris  = iOre ? aprisOre : l.unitPrice;
      const belopp = iOre ? beloppOre : l.amount;
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
      // ── TOLERANSEN HÄRLEDS, DEN UPPSKATTAS INTE (2026-08-24) ────────────────────────────────
      // Här stod `Math.max(100, expected * 0.005)` under kommentaren «i öre är aritmetiken exakt
      // — då räcker en öresavrundning per rad». Koden gav 0,5 % relativt; kommentaren intygade en
      // invariant koden inte höll (samma sort som fällde veckodomen 22 aug). Mätt åt båda hållen:
      //
      //   20 000 kWh × 0,915 kr  glapp 10 000 öre · tolerans 9 200  → FÄLLD, aritmetiskt perfekt
      //   M365 133,82 kr × 20     glapp     40 öre · tolerans 1 338  → 13 kr fel passerar osett
      //
      // En procentsats är fel form: felet är inte proportionellt mot radbeloppet utan ett FAST
      // belopp per enhet. Två kända källor, båda med exakt tak:
      //   (a) `unit_price_ore` är HELTAL öre. Tibbers 0,834 kr/kWh blir 83 — avrundningen är
      //       ≤ 0,5 öre per enhet, alltså ≤ quantity × 0,5 öre på raden.
      //   (b) `amount` är ett kronorfält. Når beloppet oss enbart där är konverteringen × 100
      //       osäker på ≤ 50 öre. Är beloppet AVLÄST i öre finns ingen sådan osäkerhet.
      // Summan av (a) och (b) är hela felrymden. Allt utanför den är ett verkligt fel.
      //
      // Effekten är att grinden blir VASSARE där kundens pengar bor (licensraden: 60 öre i stället
      // för 13 kr) och slutar falsklarma där enheten är liten (elhandeln). Det är ingen avvägning
      // — det är samma tal räknat rätt i stället för gissat.
      const beloppAvlastIOre = radensOre(l).beloppOreAvlast != null;
      const tolerance = iOre
        ? l.quantity * 0.5 + (beloppAvlastIOre ? 0 : 50)
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
  // ⚠️ «JAG DÖMDE INGENTING» FÅR INTE SE UT SOM «ALLT STÄMMER» (2026-09-05, ur Dustin-fakturan).
  //
  // `balanced: true` gäller även när `judged === 0` — på skräpindata, på fel objektform, och på
  // en faktura utan dömbara rader. Min första fix var att låta `balanced` bli `null` där. Jag tog
  // tillbaka den: de befintliga testerna låser beteendet MEDVETET (BK-01), och risken pekar fel.
  // En framtida konsument som gör `if (!balanced) blockera` hade då stoppat kundens faktura för
  // att grinden inte kunde döma — och att ha fel åt det hållet är dyrare än fällan jag ville stänga.
  //
  // Bibelns sats löser det: fail-closed på PÅSTÅENDET, fail-open på pipelinen (BK-01). `balanced`
  // behåller sitt gamla, pipeline-vänliga värde; `provbar` bär påståendet. En läsare som bryr sig
  // om sanningen frågar `provbar`, en som bryr sig om att inte blockera frågar `balanced`.
  // Produktionens enda anropare kontrollerar redan `judged === 0` först. (BK-01/BK-02.)
  return { balanced: violations.length === 0, provbar: judged > 0, judged, violations };
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
