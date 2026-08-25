# Skörd: a6ead90ef61e7280c

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `subagents` · agent: `a6ead90ef61e7280c`
· slutsatser: 4 · körda kommandon: 9
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll run the two greps first.

### 2

Now let me read the actual code around both sites.

### 3

Now the executable proof.

### 4

**JA — kontroll 3 kan aldrig fälla i produktionsvägen.**

Körbart bevis (`/tmp/claude-0/.../scratchpad/kanarie-check3.mjs`, kör mot riktiga `aggregateLineItems` + `runIntegrityChecks`):

```
radsumma (lineItems.reduce) = 1000
agg.amount                  = 1000
agg.invoiceTotal            = 5000
alla overrides: []
lineItemsTotal-override fyrade: NEJ
motprov (amount tvingad till 5000) → [{"field":"lineItemsTotal","original":1000,"corrected":5000,
                                       "reason":"lineitems_sum_deviates_80pct","severity":"warning"}]
```

Mekaniken:
- `/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:960` — `amount: (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0)`
- `/home/user/arvo-flow.github.io/lib/extraction-integrity.js:68-71` — `lineItemsTotal = lineItems.reduce(...amount)` jämförs mot `extracted.amount`

Det är samma reduce över samma array. `deviation` är per konstruktion 0, alltså aldrig > 0,03. Motprovet visar att mekanismen *fungerar* när den matas med ett `amount` som inte är radsumman — men inget objekt från `aggregateLineItems` kan bära ett sådant `amount`. Samma sjukdom som bibelns villkorsvakt: mekanismen svarar, signalen kan aldrig röra sig. (Enda anroparen är `api/test-invoice.mjs:577`, och den matar `extracted` rakt ur pipelinen.)

Nyans värd att notera, inte verifierad i denna körning: den avvikelse kontroll 3 tror sig mäta fångas på riktigt av Ring 1 i `routeExtraction` (`extract.js:1064`), som jämför radsumman mot `extracted.invoiceTotal` — det avlästa fakturabeloppet (5000 i mitt fall), inte den härledda summan. Kontroll 3 är alltså en död dubblett av en vakt som redan finns på rätt axel. Ingen kod ändrad.

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
grep -n "lineItemsTotal" /home/user/arvo-flow.github.io/lib/extraction-integrity.js
```

```
68:    const lineItemsTotal = lineItems.reduce((sum, l) => sum + (l.amount ?? 0), 0);
70:    if (lineItemsTotal > 0 && invoiceAmount > 0) {
71:      const deviation = Math.abs(lineItemsTotal - invoiceAmount) / invoiceAmount;
74:          field:    'lineItemsTotal',
75:          original: lineItemsTotal,
```

### Kommando 2

```bash
grep -n "amount:\|invoiceTotal" /home/user/arvo-flow.github.io/agents/test-invoice/extract.js | head -5
```

```
393:  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
439:            amount: {
655:      invoiceTotal: {
948:      amount:      li.amount,
960:    amount:                   (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0),
```

### Kommando 3

```bash
sed -n 50,100p /home/user/arvo-flow.github.io/lib/extraction-integrity.js; echo "=== extract.js 935-985 ==="; sed -n 935,985p /home/user/arvo-flow.github.io/agents/test-invoice/extract.js
```

```
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
=== extract.js 935-985 ===
    // OBSERVATION, aldrig härledd (samma disciplin som moms_bas/amount_ore i avstämningsgrinden):
    // vi bär vidare exakt det modellen läste, och låter en oberoende kontroll avgöra om det stod
    // på pappret. Ett hallucinerat fakturanummer ser identiskt ut med ett avläst — med
    // precisionens auktoritet på köpet — och det är värre än inget nummer alls.
    invoiceNumber:            typeof raw.invoiceNumber === 'string' && raw.invoiceNumber.trim()
      ? raw.invoiceNumber.trim() : null,
    description:              raw.description,
    account:                  raw.account ?? null,
    billingPeriod,
    billingPeriodSource,
    billingPeriodAssumed,
    lineItems: (raw.lineItems ?? []).map((li) => ({
      description: li.description,
      amount:      li.amount
```

### Kommando 4

```bash
sed -n 1,50p /home/user/arvo-flow.github.io/lib/extraction-integrity.js; echo "=== callers ==="; grep -rn "runIntegrityChecks" /home/user/arvo-flow.github.io --include=*.js --include=*.mjs -l | head -20
```

```
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
=== callers ===
/home/user/arvo-flow.github.io/api/test-invoice.mjs
/home/user/arvo-flow.github.io/lib/extraction-integrity.js
```

### Kommando 5

```bash
grep -n "invoiceTotal" /home/user/arvo-flow.github.io/agents/test-invoice/extract.js
```

```
393:  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
655:      invoiceTotal: {
1021:    invoiceTotal:              raw.invoiceTotal != null ? Number(raw.invoiceTotal) : null,
1064:    if (extracted.invoiceTotal > 0 && lineSum > 0) {
1065:      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
1066:      const tolerance = Math.max(50, extracted.invoiceTotal * 0.03);
1082:      const forklarar = (v) => Math.abs(lineSum * (1 + v) - extracted.invoiceTotal) <= tolerance;
1105:          `radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr`);
1108:          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
```

### Kommando 6

```bash
grep -n "runIntegrityChecks" -B6 -A6 /home/user/arvo-flow.github.io/api/test-invoice.mjs
```

```
24-import { getEurSekRate, FALLBACK_RATE_EUR_SEK, getSekRate, FALLBACK_RATE_USD_SEK } from '../agents/recommender/pricing.js';
25-import { computeElRecommendation, NATAVGIFT_RE } from '../lib/el-recommendation.js';
26-import { contractClockFinding } from '../lib/contract-clock.js';
27-import { checkSupplierFingerprint } from '../lib/supplier-fingerprints.js';
28-import { verifySanity, verifySeatCount } from '../lib/sanity-verifier.js';
29-import { storeAnalysis, storeTriaged } from '../lib/invoice-store.js';
30:import { runIntegrityChecks } from '../lib/extraction-integrity.js';
31-import { ARVO_FEE_RATE, feeOf, netOf } from '../lib/fee.js';
32-import { computeHardwareAdjustment } from '../lib/hardware-installments.js';
33-import { saveIntegrityOverrides, flagNewSupplier } from '../lib/labeled-corrections.js';
34-import { upsertSupplier, recordSupplierPrice, recordContractTimeline } from '../lib/invoice-graph.js';
35-import { validateCategory } from '../lib/category-validator.js';
36-import { validateSeatPrice, getBenchmarkBasis, getSupplierPriceIntel } from '../lib/supplier-price-intel.js';
--
571-      }));
572-    }
573-
574-    // Fas 2: deterministiska integritetskontroller post-extraction
575-    {
576-      const rawHeader = body.pdfRawHeader ?? '';
577:      const { result: fixed, overrides } = runIntegrityChecks(extracted, rawHeader);
578-      if (overrides.length > 0) {
579-        console.log('[integrity] overrides:', JSON.stringify(overrides));
580-        Object.assign(extracted, fixed);
581-        // Spara överrides som labeled corrections för träning (fire-and-forget)
582-        saveIntegrityOverrides(overrides, {
583-          category: null,
```

### Kommando 7

```bash
grep -n "aggregateLineItems" -r /home/user/arvo-flow.github.io --include=*.js --include=*.mjs | head -20
```

```
/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:4:// one_time_fee | hardware. aggregateLineItems() summerar per typ och
/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:819:export function aggregateLineItems(rawInput) {
/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:1143:  // Projektionskravet (döms i aggregateLineItems — domen bärs hit)
/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:1221: * @returns {Promise<ReturnType<aggregateLineItems> & { usage: object }>}
/home/user/arvo-flow.github.io/agents/test-invoice/extract.js:1319:  const aggregated = aggregateLineItems(toolUseBlock.input);
/home/user/arvo-flow.github.io/agents/recommender/recommend.js:583: * (aggregateLineItems projicerar quantity × unitPrice) — exkluderas de här jämförs
/home/user/arvo-flow.github.io/tests/radobservation.mjs:12:// denna), och därför är RO-01 skriven som en KEDJA: rådata → aggregateLineItems → judgeLineArithmetic.
/home/user/arvo-flow.github.io/tests/radobservation.mjs:23:import { aggregateLineItems } from '../agents/test-invoice/extract.js';
/home/user/arvo-flow.github.io/tests/radobservation.mjs:40:  test('RO-01: KEDJAN rådata → aggregateLineItems → balanskravet dömer Fortum-raden och godkänner den', () => {
/home/user/arvo-flow.github.io/tests/radobservation.mjs:42:    const produktionsObjekt = aggregateLineItems(FORTUM_RA());
/home/user/arvo-flow.github.io/tests/radobservation.mjs:52:    const rad = aggregateLineItems(FORTUM_RA()).lineItems[0];
/home/user/arvo-flow.github.io/tests/radobservation.mjs:71:    const dom = judgeLineArithmetic(aggregateLineItems(utanOre));
/home/user/arvo-flow.github.io/tests/radobservation.mjs:88:  const bygg = (rad) => judgeLineArithmetic(aggregateLineItems({
/home/user/arvo-flow.github.io/tests/enhetsantagandet.mjs:30:import { aggregateLineItems, routeExtraction } from '../agents/test-invoice/extract.js';
/home/user/arvo-flow.github.io/tests/enhetsantagandet.mjs:36:const bygg = (rader, raw = {}) => aggregateLineItems({
/home/user/arvo-flow.github.io/tests/extract-simple-invoice.mjs:10:import { aggregateLineItems, routeExtraction } from '../agents/test-invoice/extract.js';
/home/user/arvo-flow.github.io/tests/extract-simple-invoice.mjs:23:  test('aggregateLineItems: unknown + recurring + inga datum → monthly, markerat antaget', () => {
/home/user/arvo-flow.github.io/tests/extract-simple-invoice.mjs:24:    const r = aggregateLineItems(teleRaw());
/home/user/arvo-flow.github.io/tests/extract-simple-invoice.mjs:33:    const r = aggregateLineItems(teleRaw());
/home/user/arvo-flow.github.io/tests/extract-simple-invoice.mjs:62:    const r = aggregateLineItems({
```

### Kommando 8

```bash
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/kanarie-check3.mjs
```

```
radsumma (lineItems.reduce) = 1000
agg.amount                  = 1000
agg.invoiceTotal            = 5000
alla overrides: []
lineItemsTotal-override fyrade: NEJ
motprov (amount tvingad till 5000) → [{"field":"lineItemsTotal","original":1000,"corrected":5000,"reason":"lineitems_sum_deviates_80pct","severity":"warning"}]
```

### Kommando 9

```bash
awk 'NR>=1030 && NR<=1070 && /^(export )?function|^  \/\/ Ring/' /home/user/arvo-flow.github.io/agents/test-invoice/extract.js; grep -n "^export function\|^function" /home/user/arvo-flow.github.io/agents/test-invoice/extract.js | awk -F: '$1<1065' | tail -3
```

```
export function routeExtraction(extracted) {
677:function applyDeterministicRules(raw) {
819:export function aggregateLineItems(rawInput) {
1034:export function routeExtraction(extracted) {
```
