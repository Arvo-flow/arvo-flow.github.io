# Skörd: afdb9951673ba1120

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `wf_3484bcdd-2c0` · agent: `afdb9951673ba1120`
· slutsatser: 4 · körda kommandon: 55
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by reading the target files.

### 2

Now let me check reachability of key paths.

### 3

Now I'll write the mandatory report file.

### 4

```json
{
  "omrade": "extract-grindar (agents/test-invoice/extract.js, lib/extraction-integrity.js, lib/schema-guard.js)",
  "rapportfil": "/home/user/arvo-flow.github.io/ops/obduktion/spana-extract-grindar.md",
  "fynd": [
    {
      "titel": "Öresfältet når aldrig balanskravet — aggregeringen döper om det (unit_price_ore → unitPriceOre)",
      "fil": "lib/extraction-integrity.js",
      "rad": 178,
      "familj": "tva-sanningar",
      "konsekvens": "judgeLineArithmetic läser l.unit_price_ore/l.amount_ore (snake_case). aggregateLineItems (extract.js:933-934) emitterar ENBART amountOre/unitPriceOre (camelCase), och produktionen anropar routeExtraction→judgeLineArithmetic med just det aggregerade objektet (api/test-invoice.mjs:749, extract.js:1097). iOre är därför ALLTID false i produktion. Följd: (1) hela öresfixen från 2026-08-22, som CLAUDE.md förklarar stängd och OB-30/31/32 låser, har aldrig körts på en enda verklig faktura; (2) fail-closed-regeln `!iOre && apris < 10 → continue` gör varje elrad ODÖMBAR — på de fyra riktiga elfakturorna i test-pdfs/ döms 1 rad av 4 (bara den fasta abonnemangsavgiften); (3) kunden får ett FALSKT SKÄL i verifikationskvittot: 'inga rader bär både antal och à-pris' om en rad som bär båda (antal 3400, à-pris 1,12 kr står i klartext på pappret). Reservkortets läxa 2026-08-15 ordagrant. Den andra konsumenten av samma observation, lib/saas-rad.js:75,94, läser rätt namn (camelCase) — två sanningar för samma fråga, och den i grinden har fel. Dessutom delar mätinstrumentet buggen: scripts/probe-grindarna.mjs:89 mäter täckning med samma icke-existerande snake_case-fält på samma aggregerade objekt och kan därför BARA svara '0 av N rader bar öresfält' — vilket den gjorde (ops/grindarna.txt: TÄCKNING 0 av 0), och utfallet feltolkades som att amount_ore var null.",
      "repro": "cd /home/user/arvo-flow.github.io && node -e \"\nimport('./agents/test-invoice/extract.js').then(async E=>{\n const {judgeLineArithmetic}=await import('./lib/extraction-integrity.js');\n const raRad={description:'Fortum Fastpris 3 400 kWh',amount:3808,type:'recurring_subscription',quantity:3400,unitPrice:1,unit_price_ore:112,amount_ore:null,is_addon:false,is_prorata:false};\n console.log('A rå (det testerna matar):',JSON.stringify(judgeLineArithmetic({lineItems:[raRad]})));\n const agg=E.aggregateLineItems({supplier:'Fortum',date:'2026-05-01',description:'El',billingPeriod:'monthly',lineItems:[raRad],confidenceScore:0.95,outOfScope:false,outOfScopeReason:null,projectedRecurringAmount:3808,invoiceTotal:3808});\n console.log('aggregerad rad:',JSON.stringify(agg.lineItems[0]));\n console.log('B aggregerad (det produktionen matar):',JSON.stringify(judgeLineArithmetic(agg)));\n console.log('C kvitto:',JSON.stringify(E.routeExtraction(agg).verifications.find(v=>v.id==='balanskrav')));\n});\"",
      "faktiskt_utfall": "A rå (det testerna matar): {\"balanced\":true,\"judged\":1,\"violations\":[]}   <-- OB-30 grön här\naggregerad rad: {\"description\":\"Fortum Fastpris 3 400 kWh\",\"amount\":3808,\"type\":\"recurring_subscription\",\"quantity\":3400,\"unitPrice\":1,\"is_addon\":false,\"addon_type\":null,\"is_prorata\":false,\"amountOre\":null,\"unitPriceOre\":112}\n  → l.unit_price_ore = undefined · l.unitPriceOre = 112\nB aggregerad (det produktionen matar): {\"balanced\":true,\"judged\":0,\"violations\":[]}\nC kvitto: {\"id\":\"balanskrav\",\"status\":\"ej_provbar\",\"detalj\":\"inga rader bär både antal och à-pris\"}\n\nSviten (npm run test:algo) är grön: 1928 pass / 0 fail. Den ser det inte därför att VARJE anrop av judgeLineArithmetic i sviten bygger raden för hand i RÅ form (tests/obduktion.mjs:159,465,475,484,493,506,515,520,550,561,571 · tests/balanskrav.mjs:32,38,45,52,58,64,69,70 · tests/svea-print.mjs:30 · scripts/korpusdiff.mjs:92). Ingen enda bygger raden med aggregateLineItems. Samma sjukdom som LFL-harnesset och villkorsvakten: mekanismen prövad, matningen aldrig.",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Sub-öresavrundningen: grinden fäller 50 % av aritmetiskt perfekta elhandelsrader i samma sekund FYND 1 lagas",
      "fil": "lib/extraction-integrity.js",
      "rad": 201,
      "familj": "enhetsfel",
      "konsekvens": "unit_price_ore är ett HELTALSFÄLT i öre (schemat, extract.js:479-482), men svenska elpriser har en decimal till: textlagret i test-pdfs/ ger kWh 0,198 · 0,215 · 0,193 · 0,187 · 0,834 · 0,891 · 0,744 · 0,712 · 0,428. Toleransen i öresläget är max(100, expected*0.005) = 0,5 %, medan maximalt avrundningsfel är antal × 0,5 öre. De två täcker varandra först vid à-pris ≥ 100 öre (1 kr). Under 1 kr per enhet KAN grinden inte döma — men gör det ändå. Kronorvägen fick en fail-closed-spärr (apris < 10 → odömbar); öresvägen fick ingen. Det är samma sjukdom som fixen 2026-08-22 lagade, en decimal längre ned. OB-30/31 deklarerar blindfläcken men underskattar den: det är inte 'en hypotetisk kategori med finare priser', det är de andra raderna på samma Fortum-faktura. Om FYND 1 lagas utan detta går grinden från tyst till skrikande på rätt beteende, och nästa grindmätning drar samma felslut som 2026-08-22 ('för känslig, vänta med att armera') i stället för det rätta ('räknar i fel enhet').",
      "repro": "cd /home/user/arvo-flow.github.io && node -e \"\nimport('./lib/extraction-integrity.js').then(({judgeLineArithmetic})=>{\n let fallda=0,provade=0,ex=[];\n for(let t=300;t<=900;t+=5){                      // 0,300–0,900 kr/kWh i steg om 0,5 öre\n  const kwh=3400, exakt=kwh*t/10, amountKr=Math.round(exakt/100), ore=Math.round(t/10);\n  const d=judgeLineArithmetic({lineItems:[{description:'Elhandel spotpris',quantity:kwh,type:'recurring_subscription',unitPrice:Math.round(t/1000),amount:amountKr,unit_price_ore:ore,amount_ore:null}]});\n  provade++; if(!d.balanced){fallda++; if(ex.length<4)ex.push((t/1000).toFixed(3)+' kr/kWh → '+ore+' öre');}\n }\n console.log('perfekta rader prövade:',provade,'· FÄLLDA:',fallda,'('+Math.round(100*fallda/provade)+' %)');\n console.log('exempel:',ex.join(' · '));\n // De verkliga raderna ur textlagret:\n for(const [n,q,ore,amt] of [['Fortum nätöverföring 0,198→20',3400,20,673],['Fortum nätöverföring 0,198→19',3400,19,673],['Fortum elhandel 1,12→112',3400,112,3808],['Tibber spot 0,834→83',2100,83,1751]]){\n  const d=judgeLineArithmetic({lineItems:[{description:n,quantity:q,type:'recurring_subscription',unitPrice:1,amount:amt,unit_price_ore:ore,amount_ore:null}]});\n  console.log((d.balanced?'OK   ':'FÄLLD')+' | '+n);\n }\n});\"",
      "faktiskt_utfall": "perfekta rader prövade: 121 · FÄLLDA: 60 (50 %)\nexempel: 0.305 kr/kWh → 31 öre · 0.315 kr/kWh → 32 öre · 0.325 kr/kWh → 33 öre · 0.335 kr/kWh → 34 öre\nFÄLLD | Fortum nätöverföring 0,198→20\nFÄLLD | Fortum nätöverföring 0,198→19\nOK    | Fortum elhandel 1,12→112\nOK    | Tibber spot 0,834→83\n\nDetaljmätning (p4.mjs): 0,198→20 öre ger förväntat 68000 öre mot faktiskt 67300, diff 700, tolerans 340. Kraftringens riktiga faktura (0,744 kr/kWh × 1200 kWh, avläst ur textlagret) faller likaså: 1200×74 = 888,00 mot fakturans 892,80, tolerans 4,44 kr. Tibbers rad passerar med 72 öres marginal — sviten valde just de talen.",
      "allvar": "latent"
    },
    {
      "titel": "monthsBetween kan aldrig returnera ett tal — och `?? 1` gör tystnaden till multiplikator 12",
      "fil": "lib/extraction-integrity.js",
      "rad": 14,
      "familj": "okant-som-giltigt",
      "konsekvens": "Två fel i följd. (1) monthsBetween splittar på /[-–]/, så ett ISO-datumintervall '2026-05-01 - 2026-05-31' ger SEX delar, inte två → null. Formatet modulens egen MONTHLY_PERIOD_RE deklarerar kan alltså aldrig parsas. (2) Produktionen skickar inte ens ett datumintervall: runIntegrityChecks anropas (api/test-invoice.mjs:577) på det AGGREGERADE objektet, där billingPeriod är enumet 'monthly'|'quarterly'|'annual'|'one_time'|'unknown'. Resultat: monthsBetween returnerar null för VARJE möjlig indata. Kontroll 2 (rad 57-69) är därmed död kod — dubbelt död, eftersom body.pdfRa
```

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
wc -l agents/test-invoice/extract.js lib/extraction-integrity.js lib/schema-guard.js
```

```
 1286 agents/test-invoice/extract.js
  281 lib/extraction-integrity.js
  180 lib/schema-guard.js
 1747 total
```

### Kommando 2

```bash
grep -rn "runIntegrityChecks\|judgeLineArithmetic\|judgeProjection\|routeExtraction\|guardToolPayload\|lintToolSchema" --include=*.js --include=*.mjs . | grep -v node_modules | sort
```

```
./agents/categorizer/categorize.js:14:import { guardToolPayload } from '../../lib/schema-guard.js';
./agents/categorizer/categorize.js:538:  const schemaVerdict = guardToolPayload({ agent: 'categorize', tool: CATEGORIZE_TOOL, payload: toolUse.input });
./agents/contract/extract-contract.js:12:import { guardToolPayload } from '../../lib/schema-guard.js';
./agents/contract/extract-contract.js:98:  const schemaVerdict = guardToolPayload({ agent: 'extract-contract', tool: CONTRACT_TOOL, payload: block.input });
./agents/recommender/recommend.js:1425:  const schemaVerdict = guardToolPayload({ agent: 'recommend', tool: RECOMMEND_TOOL, payload: toolUse.input });
./agents/recommender/recommend.js:18:import { guardToolPayload } from '../../lib/schema-guard.js';
./agents/test-invoice/extract.js:1010:export function routeExtraction(extracted) {
./agents/test-invoice/extract.js:1097:    const b2 = judgeLineArithmetic(extracted);
./agents/test-invoice/extract.js:11:import { judgeLineArithmetic, judgeProjection } from '../../lib/extraction-integrity.js';
./agents/test-invoice/extract.js:1275:  const schemaVerdict = guardToolPayload({ agent: 'extract', tool: EXTRACT_TOOL, payload: toolUseBlock.input });
./agents/test-invoice/extract.js:12:import { guardToolPayload } from '../../lib/schema-guard.js';
./agents/test-invoice/extract.js:885:    const pj = judgeProjection({
./api/test-invoice.mjs:13:import { extractInvoice, routeExtraction, ExtractorError, CONFIDENCE_THRESHOLD } from '../agents/test-invoice/extract.js';
./api/test-invoice.mjs:1938:      // B4 · verifikationskvittot: grindarnas VERKLIGA domslut (routeExtraction
./api/test-invoice.mjs:30:import { runIntegrityChecks } from '../lib/extraction-integrity.js';
./api/test-invoice.mjs:577:      const { result: fixed, overrides } = runIntegrityChecks(extracted, rawHeader);
./api/test-invoice.mjs:749:    const routing = routeExtraction(extracted);
./lib/batch-processor.js:104:  const route = routeExtraction(extracted);
./lib/batch-processor.js:14:import { extractInvoice, routeExtraction, CONFIDENCE_THRESHOLD, EXTRACT_TOOL, SYSTEM_PROMPT } from '../agents/test-invoice/extract.js';
./lib/extraction-integrity.js:130:// Ring 1 (routeExtraction i extract.js) verifierar redan radsumman mot
./lib/extraction-integrity.js:146:export function judgeLineArithmetic(extracted) {
./lib/extraction-integrity.js:258:export function judgeProjection(p) {
./lib/extraction-integrity.js:261:    // kastade `judgeProjection(null)` INNAN try ens började — så vaktens egen catch, som finns
./lib/extraction-integrity.js:276:    // `provad: true`. Samma fel som judgeLineArithmetic bar (OB-09), i grannfunktionen.
./lib/extraction-integrity.js:279:    return { ok: false, deviationPct: null, kraschade: true, skal: `judgeProjection kastade: ${err?.message ?? 'okänt fel'}` };
./lib/extraction-integrity.js:34:export function runIntegrityChecks(extracted, invoiceHeader = '') {
./lib/schema-guard.js:118:export function lintToolSchema(tool) {
./lib/
```

### Kommando 3

```bash
sed -n 540,620p api/test-invoice.mjs
```

```
        console.log(`[fakturanummer] avvisat (${dom.skal})`);
      }
      extracted.invoiceNumber = dom.nummer;
      timing.fakturanummerMs = Date.now() - t;
    }
    console.log('[test-invoice] extracted:', JSON.stringify({
      supplier:        extracted.supplier,
      description:     extracted.description,
      billingPeriod:   extracted.billingPeriod,
      lineItems:       extracted.lineItems?.length,
      recurringAmount: extracted.recurringAmount,
      variableCharges: extracted.variableCharges,
      annualCost:      extracted.annualCost,
      confidenceScore: extracted.confidenceScore,
      outOfScope:      extracted.outOfScope,
    }));
    {
      const u = extracted.usage ?? {};
      // Opus 4.7: $15/MTok in, $75/MTok out, $18.75/MTok cache-write, $1.50/MTok cache-read
      const cost = (
        (u.input_tokens ?? 0) * 15 +
        (u.output_tokens ?? 0) * 75 +
        (u.cache_creation_input_tokens ?? 0) * 18.75 +
        (u.cache_read_input_tokens ?? 0) * 1.5
      ) / 1_000_000;
      console.log('[tokens] extract:', JSON.stringify({
        input: u.input_tokens,
        output: u.output_tokens,
        cache_write: u.cache_creation_input_tokens ?? 0,
        cache_read: u.cache_read_input_tokens ?? 0,
        cost_usd: cost.toFixed(4),
      }));
    }

    // Fas 2: deterministiska integritetskontroller post-extraction
    {
      const rawHeader = body.pdfRawHeader ?? '';
      const { result: fixed, overrides } = runIntegrityChecks(extracted, rawHeader);
      if (overrides.length > 0) {
        console.log('[integrity] overrides:', JSON.stringify(overrides));
        Object.assign(extracted, fixed);
        // Spara överrides som labeled corrections för träning (fire-and-forget)
        saveIntegrityOverrides(overrides, {
          category: null,
          supplier: extracted.supplier ?? null,
        }).catch(() => {});
      }
    }

    // Active learning: okänd leverantör → flagga för proaktiv märkning (fire-and-forget)
    {
      const fp = checkSupplierFingerprint(extracted.supplier, extracted.supplier, null);
      if (!fp.matched && extracted.supplier) {
        flagNewSupplier({ supplier: extracted.supplier }).catch(() => {});
      }
    }

    // Guard: kreditnotor (negativt totalt fakturabelopp)
    if (extracted.amount < 0) {
      await storeTriaged({ fingerprint, pdfHash, invoiceNumber: extracted.invoiceNumber, supplier: extracted.supplier, category: extracted.category ?? null,
        route: 'unsupported', reason: 'credit_note', userEmail: body.userEmail }).catch(bokforFel);
      return send(res, 200, {
        ok: true, route: 'unsupported', reason: 'credit_note',
        extracted: { supplier: extracted.supplier, date: extracted.date },
        categorized: { category: 'uncategorized' },
        recommendation: { shouldSwitch: false, reasoning: '' },
        timing: { extractMs: timing.extractMs },
      });
    }

    // Guard: utländsk valuta
    // EUR → konverteras till SEK med live Rik
```

### Kommando 4

```bash
grep -rn "saveIntegrityOverrides" --include=*.js --include=*.mjs . | grep -v node_modules
```

```
./api/test-invoice.mjs:33:import { saveIntegrityOverrides, flagNewSupplier } from '../lib/labeled-corrections.js';
./api/test-invoice.mjs:582:        saveIntegrityOverrides(overrides, {
./lib/labeled-corrections.js:50:export async function saveIntegrityOverrides(overrides, { analysisId, category, supplier } = {}) {
```

### Kommando 5

```bash
grep -rn "pdfRawHeader" --include=*.js --include=*.mjs . | grep -v node_modules
```

```
./api/test-invoice.mjs:576:      const rawHeader = body.pdfRawHeader ?? '';
```

### Kommando 6

```bash
mkdir -p /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p1.mjs <<'EOF'
import { aggregateLineItems, routeExtraction } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { runIntegrityChecks } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// Realistisk KVARTALSFAKTURA (Atlassian-liknande): perioddatum finns → dateDerivedPeriod='quarterly'
const kvartal = {
  supplier: 'Atlassian Pty Ltd', date: '2026-05-08', description: 'Jira Q2 2026',
  billingPeriod: 'quarterly',
  billing_period_start: '2026-04-01', billing_period_end: '2026-06-30',
  lineItems: [
    { description: 'Jira Software Premium', amount: 30000, type: 'recurring_subscription',
      quantity: 110, unitPrice: 273, is_addon: false, is_prorata: false },
  ],
  confidenceScore: 0.95, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 30000, seatCount: 110, invoiceTotal: 30000,
};
const agg = aggregateLineItems(kvartal);
console.log('billingPeriod:', agg.billingPeriod, '| källa:', agg.billingPeriodSource);
console.log('recurringAmount:', agg.recurringAmount, '| annualCost (KORREKT):', agg.annualCost);
const { result, overrides } = runIntegrityChecks(agg, '');
console.log('overrides:', JSON.stringify(overrides, null, 2));
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p1.mjs
```

```
billingPeriod: quarterly | källa: dates
recurringAmount: 30000 | annualCost (KORREKT): 120000
overrides: [
  {
    "field": "seatCountCrossCheck",
    "original": "110 × 90.91 = 10000.1",
    "corrected": 30000,
    "reason": "seat_x_price_deviates_67pct_from_invoice",
    "severity": "warning"
  },
  {
    "field": "annualCost",
    "original": 120000,
    "corrected": 360000,
    "reason": "annual_cost_deviates_67pct_from_recurring_x_period",
    "severity": "info"
  }
]
```

### Kommando 7

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p2.mjs <<'EOF'
import { aggregateLineItems, routeExtraction } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { runIntegrityChecks } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// ÅRSFAKTURA (Google Workspace årsbetalning)
const ar = {
  supplier: 'Google Cloud Sweden AB', date: '2026-01-15', description: 'Google Workspace 2026',
  billingPeriod: 'annual',
  billing_period_start: '2026-01-01', billing_period_end: '2026-12-31',
  lineItems: [
    { description: 'Google Workspace Business Standard', amount: 144000, type: 'recurring_subscription',
      quantity: 60, unitPrice: 2400, is_addon: false, is_prorata: false },
  ],
  confidenceScore: 0.96, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 144000, seatCount: 60, invoiceTotal: 144000,
};
const agg = aggregateLineItems(ar);
console.log('billingPeriod:', agg.billingPeriod, '| annualCost (KORREKT):', agg.annualCost);
console.log(JSON.stringify(runIntegrityChecks(agg, '').overrides, null, 2));

// ── MÅNADSFAKTURA mobil med roaming (rörligt) ──────────────────────────
const mobil = {
  supplier: 'Tele2 Sverige AB', date: '2026-05-31', description: 'Mobilabonnemang maj 2026',
  billingPeriod: 'monthly',
  billing_period_start: '2026-05-01', billing_period_end: '2026-05-31',
  lineItems: [
    { description: 'Företag Bas 50GB (Månadsavgift)', amount: 3588, type: 'recurring_subscription',
      quantity: 12, unitPrice: 299, is_addon: false, is_prorata: false },
    { description: 'Roaming Zon 3 datatrafik', amount: 900, type: 'variable_usage',
      quantity: null, unitPrice: null, is_addon: false, is_prorata: false },
  ],
  confidenceScore: 0.95, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 3588, seatCount: 12, invoiceTotal: 4488,
};
const a2 = aggregateLineItems(mobil);
console.log('\nmobil: amount(alla rader)=', a2.am
```

```
billingPeriod: annual | annualCost (KORREKT): 144000
[
  {
    "field": "seatCountCrossCheck",
    "original": "60 × 200 = 12000",
    "corrected": 144000,
    "reason": "seat_x_price_deviates_92pct_from_invoice",
    "severity": "warning"
  },
  {
    "field": "annualCost",
    "original": 144000,
    "corrected": 1728000,
    "reason": "annual_cost_deviates_92pct_from_recurring_x_period",
    "severity": "info"
  }
]

mobil: amount(alla rader)= 4488 pricePerSeatMonthly= 299
[
  {
    "field": "seatCountCrossCheck",
    "original": "12 × 299 = 3588",
    "corrected": 4488,
    "reason": "seat_x_price_deviates_20pct_from_invoice",
    "severity": "warning"
  }
]
```

### Kommando 8

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p3.mjs <<'EOF'
import { aggregateLineItems } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { runIntegrityChecks } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// ELFAKTURA — exakt den form SYSTEM_PROMPT föreskriver:
// "Förbrukning X kWh" => recurring_subscription, quantity = kWh, unitPrice = kr/kWh
const el = {
  supplier: 'Fortum Sverige AB', date: '2026-05-31', description: 'Elfaktura maj 2026',
  billingPeriod: 'monthly',
  billing_period_start: '2026-05-01', billing_period_end: '2026-05-31',
  lineItems: [
    { description: 'Elhandel rörligt pris, förbrukning 3 400 kWh', amount: 3808,
      type: 'recurring_subscription', quantity: 3400, unitPrice: 1,
      unit_price_ore: 112, amount_ore: null, is_addon: false, is_prorata: false },
    { description: 'Fast månadsavgift', amount: 49, type: 'recurring_subscription',
      quantity: 1, unitPrice: 49, is_addon: false, is_prorata: false },
    { description: 'Energiskatt (3400 kWh × 0,439 kr/kWh)', amount: 1493,
      type: 'one_time_fee', quantity: 3400, unitPrice: 0, is_addon: false, is_prorata: false },
  ],
  confidenceScore: 0.95, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 3857,
  seatCount: null,          // <-- modellen svarar korrekt null: ingen per-användarlicens
  el_kwh: 3400, el_invoice_type: 'elhandel', el_omrade: 'SE3',
  invoiceTotal: 5350,
};
const agg = aggregateLineItems(el);
console.log('seatCount efter applyDeterministicRules :', agg.seatCount);
console.log('pricePerSeatMonthly                     :', agg.pricePerSeatMonthly);
console.log('annualCost                              :', agg.annualCost);
console.log('overrides:', JSON.stringify(runIntegrityChecks(agg, '').overrides));

// BREDBAND: quantity = 1 på enda raden, seatCount null i indata
const bb = {
  supplier: 'Bahnhof AB', date: '2026-05-01', description: '
```

```
seatCount efter applyDeterministicRules : 3400
pricePerSeatMonthly                     : 1.13
annualCost                              : 46284
overrides: [{"field":"seatCountCrossCheck","original":"3400 × 1.13 = 3841.9999999999995","corrected":5350,"reason":"seat_x_price_deviates_28pct_from_invoice","severity":"warning"}]

bredband seatCount: 1 | pricePerSeatMonthly: 849
```

### Kommando 9

```bash
grep -rn "seatCount" api/test-invoice.mjs | head -60
```

```
723:    if ((extracted.seatCount ?? 0) > 0) {
725:        seatCount:  extracted.seatCount,
732:            `[Ring2 Seat Oracle] seatCount Opus=${seatResult.opusCount} ≠ Haiku=${seatResult.oracleCount} (diff=${seatResult.diff})`,
981:            const _currSeats   = Number(extracted.seatCount ?? 0);
1040:          userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
1063:            seatCount:              extracted.seatCount ?? null,
1248:            userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
1344:        seatCount: extracted.seatCount ?? null,
1363:          seatCount:            null,
1437:        seatCount:           extracted.seatCount ?? null,
1497:      seatCount: extracted.seatCount ?? null,
1643:      seatCount: extracted.seatCount ?? null,
1682:              pricePerSeat:  extracted.seatCount > 0
1683:                ? Math.round(extracted.annualCost / extracted.seatCount)
1686:              seats:         extracted.seatCount ?? null,
1692:              seats:       extracted.seatCount ?? null,
1731:      seatCount:          extracted.seatCount,
1867:        seatCount:                 extracted.seatCount ?? null,
1910:        // av seatCount−employees här (det var regel 1-brottet: naivt gap som "svinn").
```

### Kommando 10

```bash
sed -n 715,745p api/test-invoice.mjs; echo '--- 1670-1700'; sed -n 1670,1700p api/test-invoice.mjs
```

```
        console.log(`[fingerprint:pre-route] ${_preRoute.key}: confidence ${extracted.confidenceScore?.toFixed(2)} → ${boosted}`);
        extracted.confidenceScore = boosted;
      }
    }

    // ── Ring 2: Seat count oracle (fire-and-forget) ───────────────────────────
    // Haiku läser PDF:en oberoende av Opus och verifierar antalet licenser/SIM-kort.
    // Ej blockerande — påverkar inte kundlatensen. Vid avvikelse: internt larm.
    if ((extracted.seatCount ?? 0) > 0) {
      verifySeatCount({
        seatCount:  extracted.seatCount,
        lineItems:  extracted.lineItems,
        pdfBase64:  pdfBytes.toString('base64'),
      }).then((seatResult) => {
        if (!seatResult.ok) {
          notifyReviewQueue(
            extracted,
            `[Ring2 Seat Oracle] seatCount Opus=${seatResult.opusCount} ≠ Haiku=${seatResult.oracleCount} (diff=${seatResult.diff})`,
          ).catch(() => {});
          console.error(`[ring2:seat-oracle] ALERT: opus=${seatResult.opusCount} haiku=${seatResult.oracleCount}`);
        }
      }).catch((err) => console.warn('[ring2:seat-oracle] fail-open:', err.message));
    }

    // ── Produktionslarm: billing period 'unknown' trots att datum extraherades ──
    // Datum > 400 dagar är ovanligt — kan indikera att AI blandade ihop avtalstid med fakturaperiod.
    if (extracted.billingPeriod === 'unknown' && extracted.billingPeriodStart) {
      notifyReviewQueue(
        extracted,
        `[BillingPeriod] Perioddatum extraherades (${extracted.billingPeriodStart} – ${extracted.billingPeriodEnd}) men ger billingPeriod=unknown — ovanligt lång period eller datumdrift?`,
      ).catch(() => {});
--- 1670-1700
          const segment     = INDUSTRY_SEGMENT_MAP[industry] ?? industry;
          const sizeBucket  = bucketForSize(employeesNum);
          const supplierId  = await upsertSupplier({
            name:           extracted.supplier ?? categorized.normalizedSupplier,
            normalizedName: categorized.normalizedSupplier,
            category:       categorized.category,
          });
          if (supplierId) {
            await recordSupplierPrice({
              supplierId,
              segment,
              sizeBucket,
              pricePerSeat:  extracted.seatCount > 0
                ? Math.round(extracted.annualCost / extracted.seatCount)
                : null,
              annualCost:    extracted.annualCost,
              seats:         extracted.seatCount ?? null,
              invoiceDate,
            });
            await recordContractTimeline({
              analysisId: analysisId ?? null,
              supplierId,
              seats:       extracted.seatCount ?? null,
              annualCost:  extracted.annualCost,
              invoiceDate,
            });
          }
          // Uppdatera labeled_corrections med rätt analysisId om integrity overrides sparades
          // (analysisId var okänt vid tidpunkten för integrity-sparbara — ignoreras här,
          //  corrections läggs
```

### Kommando 11

```bash
grep -n "seatCount\|seats" agents/recommender/recommend.js | head -50
```

```
68:function formatBenchmark(benchmark, seatCount, employees) {
77:  const scale = jamforelseSkala({ benchmark, seatCount, employees });
80:  const scaleLabel = seatCount != null ? `${seatCount} licenser` : `${employees} anställda`;
200:  const seatCount = invoice.seatCount ?? null;
205:  const scale = jamforelseSkala({ benchmark: bm, seatCount, employees });
249:    ? formatBenchmark(benchmark, seatCount, employees) + '\n\n' + phrasingRule
250:    : formatBenchmark(benchmark, seatCount, employees);
292:    const seats   = (invoice.seatCount ?? customer.employees) || 1;
303:      lines.push(`\n  Tier-benchmarks (${isDevtools ? 'Atlassian publikt listpris' : 'Microsoft publikt listpris'} maj 2026, ${seats} seats):`);
304:      lines.push(`    MSRP månadsvis  : ${tierBm.msrpMonthly} kr/seat/mån  = ${(tierBm.msrpMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
306:        lines.push(`    MSRP årsavtal   : ${tierBm.msrpAnnual} kr/seat/mån  = ${(tierBm.msrpAnnual * 12 * seats).toLocaleString('sv-SE')} kr/år totalt`);
307:        lines.push(`    → Målpris (${targetLabel}): ${targetPrice} kr/seat/mån = ${(targetPrice * 12 * seats).toLocaleString('sv-SE')} kr/år  ← DETTA ÄR ERT MÅL`);
309:          const annualBilling = Math.round((pps - tierBm.msrpAnnual) * 12 * seats);
315:        lines.push(`    MSRP årsavtal   : Tier-bucket (fast summa per user-spann — årsavtal kostar MER vid ${seats} seats)`);
330:            lines.push(`    → Kombinerat listpris (Jira + Confluence): ${combinedMonthly} kr/seat/mån = ${(combinedMonthly * 12 * seats).toLocaleString('sv-SE')} kr/år`);
386:    const _sc  = invoice.seatCount ?? null;
913:  const seats = deriveGoogleSeats(input?.invoice ?? null);
914:  const m365 = m365EquivalentForGoogle(googleTierKey, seats);
921:        ? ` — ${m365.monthlyTotalLabel} kr per månad för era ${m365.seats} användare`
962:  const seats = deriveAdobeSeats(input.invoice);
963:  const rs = adobeRightsizing(lineItems, seats);
1198:    const _seats = input.invoice?.seatCount ?? input.customer?.employees ?? 1;
1199:    const sav = Math.round((saasTierBm.msrpMonthly - saasTierBm.msrpAnnual) * 12 * _seats);
1440:      seatCount:           input.invoice?.seatCount ?? null,
1538:  // The generic benchmark uses dominant-tier × total seats — wrong for mixed-tier invoices
1570:      const _seatCount  = input.invoice.seatCount ?? null;
1572:      const _seats      = _isPerUser ? (_seatCount ?? _employees) : 1;
1574:      // triggers even when seatCount is inflated by add-on licenses (e.g. 57+57=114).
1575:      const _p25BySeat  = Math.round(benchmark.p25 * _seats);
1590:    const seatCount = input.invoice.seatCount ?? null;
1594:    // For saas-productivity: scale against employees (the correct headcount), not seatCount
1606:    const scale = jamforelseSkala({ benchmark, seatCount, employees, forceEmployees: isSaasProductivity });
1751:      seatCount, employees, forceEmployees: isSaasProductivity,
1893:    employees: input.invoice?.seatCou
```

### Kommando 12

```bash
sed -n 1,80p lib/jamforelsekalla.js 2>/dev/null || grep -rn "jamforelseSkala" --include=*.js lib/ | head
```

```
// lib/jamforelsekalla.js — proveniensen för det tal kunden jämförs MOT.
//
// VARFÖR MODULEN FINNS (obduktionen 2026-08-20). Kvittoraden `listpris` säger till kunden att
// «jämförelsepriset är ett verifierat publikt listpris», och savingRange väljer sin bredd
// (±12 % för listpris, ±25 % för förhandlat mål) på samma grund. Båda härleddes i api-lagret ur
//
//     BRANCHINDEX[categorized.category]?.source === 'real-public'
//
// — den STATISKA prisbokstabellen. Men jämförelsepriset kommer inte därifrån. Det kommer ur EN
// av två vägar i recommend.js:
//   · like-for-like  → licenseTierBenchmarks (verifierade publika listpriser, daterade per nivå)
//   · benchmark      → lib/benchmark.js, vars läsväg FÖREDRAR livedata: KV → invoice_datapoints
//                      (source 'real', isTotal) → invoice_analyses ('live_analyses', isTotal)
//                      → först därefter prisbokens 'real-public'.
//
// Tabellraden och det räknande objektet är alltså olika saker, och tabellraden vinner alltid.
// Följden: en jämförelse som vilar på andra bolags TOTALSUMMOR fick ändå bocken «verifierat
// publikt listpris» och listprisets SMALARE konfidensintervall. Rätt siffra, fel proveniens —
// vilket regel 3 räknar som fel — plus en överdriven precision ovanpå.
//
// Att felet kunde bo kvar har en egen läxa: 156 rader längre upp i SAMMA fil läser
// sanity-verifieraren `recommendation.benchmark?.source`, alltså rätt objekt. Två konsumenter av
// samma fråga, två olika svar, och den kundsynliga hade fel (regel 1). Buggfixen i juli rörde
// dessutom exakt den här raden — den bytte `priceSource` mot `source` och lät LÄSVÄGEN stå kvar.
// Att rätta fältnamnet på fel objekt lämnar felet på plats.
//
// Regeln modulen kodifierar: **proveniensen produceras av det led som VÄLJER jämförelsepriset och
// bärs med talet** — aldrig återgissad nedströms ur något som råkar ligga bredvid.
//
// FÅNGAR: att en kundsynlig listprisbock sätts på en jämförelse som vilar på livedata, kohortdata
//   eller ett märkt estimat; att ett odaterat pris kallas verifierat; att ett totalsumme-ankare
//   presenteras som ett styckpris-listpris.
// BLIND: modulen dömer den DEKLARERADE källan. Säger prisboken 'real-public' om ett tal som i
//   själva verket är ett estimat, säger den här funktionen också 'real-public'. Att källetiketten
//   är sann bevakas av price-audit och verifierarna — inte här. Modulen vet heller ingenting om
//   huruvida jämförelsen är RELEVANT (fel produktnivå mätt mot rätt listpris är fortfarande fel);
//   det är licensnivåns och kraverBekraftadNiva:s uppgift.

/**
 * Hur många enheter benchmarkens tal ska multipliceras med — 1 när talet redan är en totalsumma.
 *
 * VARFÖR DEN ÄR EN FUNKTION OCH INTE TRE RADER (obduktionen 2026-08-20). Uträkningen fanns
 * inline på tre ställen i recommend.js. Två av dem bar `!benchmark.isTotal`; den tredje — den som
 * bygger suggestedAnnualCost, savingPerYear och overpaymentPercent, alltså kundens pengar — bar
 * den inte.
```

### Kommando 13

```bash
sed -n 1630,1650p api/test-invoice.mjs; echo '=== 1725-1740'; sed -n 1725,1740p api/test-invoice.mjs; echo '=== 1855-1875'; sed -n 1855,1875p api/test-invoice.mjs
```

```
    // Lagrar fullständig analys och returnerar analysisId för avtalsbevakning.
    // Placerad efter alla overrides så att grossSaving/netSaving är slutgiltiga värden.
    const analysisId = await storeAnalysis({
      fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
      pdfHash,
      extracted,
      categorized,
      recommendation: { ...recommendation, grossSaving, netSaving },
      route: 'auto',
      industry,
      employees: employeesNum,
      userEmail: typeof body.userEmail === 'string' ? body.userEmail.trim().toLowerCase() : null,
      seatCount: extracted.seatCount ?? null,
    }).catch((err) => { console.error('[test-invoice] storeAnalysis failed:', err.message); return null; });

    // Prissignal: smyghöjning-detektering mot verifierade listpriser (fire-and-forget).
    // Aktiveras om pricePerSeatMonthly finns och leverantören finns i supplier_prices.
    // marketIntel aktiveras vid ≥3 analyserade fakturor för samma leverantör i databasen.
    let priceAlert = null;
    let marketIntel = null;
=== 1725-1740

    // ── P2.1: BERÄKNINGSKEDJA (Calculation Chain) ────────────────────────────────
    // Visar exakt hur varje siffra härletts — nuläge, benchmark, besparing, arvode.
    // Kunden kan verifiera varje steg. Bygger förtroende och möjliggör extern revision.
    const _benchIntel = getBenchmarkBasis({
      normalizedSupplier: categorized.normalizedSupplier,
      seatCount:          extracted.seatCount,
      suggestedAnnualCost: recommendation.suggestedAnnualCost,
      tierKey:            null,
    });
    // ── PROVENIENSEN LÄSES UR DET SOM RÄKNADE (obduktionen 2026-08-20) ────────────────────────
    // Raden läste tidigare BRANCHINDEX[kategori].source — den STATISKA tabellraden. Men
    // jämförelsepriset kommer ur recommend.js: antingen like-for-like mot licenseTierBenchmarks,
    // eller benchmark.p25, vars läsväg FÖREDRAR livedata (invoice_datapoints 'real' och
    // invoice_analyses 'live_analyses', båda isTotal). Tabellraden sa 'real-public' oavsett —
    // så en jämförelse som vilade på andra bolags totalsummor fick ändå bocken «verifierat
=== 1855-1875
        servicePeriodStart:  extracted.servicePeriodStart ?? null,
        servicePeriodEnd:    extracted.servicePeriodEnd ?? null,
        cancellationNoticeDays: extracted.cancellationNoticeDays ?? null,
        billingPeriod:       extracted.billingPeriod,
        billingPeriodSource: extracted.billingPeriodSource,
        billingPeriodAssumed: extracted.billingPeriodAssumed ?? false,
        billingPeriodStart:  extracted.billingPeriodStart ?? null,
        billingPeriodEnd:    extracted.billingPeriodEnd   ?? null,
        lineItems:       extracted.lineItems,
        recurring:       extracted.recurring,
        confidenceScore:           extracted.confidenceScore,
        notes:                     extracted.notes,
        seatCount:                 extracted.seatCount ?? null,
        connectionSpeedMbit:       extracted.connect
```

### Kommando 14

```bash
ls tests/fixtures/ | head -80; echo ---; grep -rln "kWh" tests/fixtures/ | head -20
```

```
01-mobil.mjs
02-bredband.mjs
03-combined.mjs
04-el.mjs
05-saas.mjs
06-skrivarleasing.mjs
07-edge-cases.mjs
08-realistic.mjs
it-8821-ms365.json
korpus-facit.json
---
tests/fixtures/04-el.mjs
tests/fixtures/08-realistic.mjs
tests/fixtures/07-edge-cases.mjs
```

### Kommando 15

```bash
grep -n "kWh" -B4 -A4 tests/fixtures/04-el.mjs | head -60
```

```
41-    id: 'el-02',
42-    name: 'El + rörlig förbrukning + energiskatt som variable_usage — ignoreras',
43-    lineItems: [
44-      { type: 'recurring_subscription', description: 'Nätavgift Vattenfall Eldistribution', amount: 450 },
45:      { type: 'variable_usage', description: 'Rörlig elförbrukning (kWh)', amount: 1820 },
46:      { type: 'variable_usage', description: 'Energiskatt (öre/kWh)', amount: 320 },
47-    ],
48-    category: 'el',
49-    mixed: false,
50-    employees: 8,
--
209-    id: 'el-09',
210-    name: 'Stor industriförbrukare tillverkning 120 anst — hög förbrukning',
211-    lineItems: [
212-      { type: 'recurring_subscription', description: 'Nätavgift industri E.ON', amount: 8500 },
213:      { type: 'variable_usage', description: 'Industriel förbrukning kWh', amount: 42000 },
214-      { type: 'variable_usage', description: 'Effektavgift kW', amount: 6200 },
215-    ],
216-    category: 'el',
217-    mixed: false,
--
234-    id: 'el-10',
235-    name: 'Litet byggkontor 3 anst — låg förbrukning',
236-    lineItems: [
237-      { type: 'recurring_subscription', description: 'Elabonnemang Vattenfall litet kontor', amount: 420 },
238:      { type: 'variable_usage', description: 'Elförbrukning kWh', amount: 680 },
239-    ],
240-    category: 'el',
241-    mixed: false,
242-    employees: 3,
--
258-    id: 'el-11',
259-    name: 'Energiskatt separat variable_usage — ignoreras av metrics',
260-    lineItems: [
261-      { type: 'recurring_subscription', description: 'Abonnemangsavgift Ellevio', amount: 520 },
262:      { type: 'variable_usage', description: 'Elförbrukning (kWh)', amount: 1650 },
263:      { type: 'variable_usage', description: 'Energiskatt 36,0 öre/kWh', amount: 432 },
264-    ],
265-    category: 'el',
266-    mixed: false,
267-    employees: 9,
--
283-    name: 'Nätavgift + elabonnemang som separata recurring-rader',
284-    lineItems: [
285-      { type: 'recurring_subscription', description: 'Elabonnemang Bixia Företag Rörligt', amount: 195 },
286-      { type: 'recurring_subscription', description: 'Nätavgift Ellevio AB', amount: 445 },
287:      { type: 'variable_usage', description: 'Rörlig förbrukning (kWh)', amount: 1920 },
288-    ],
289-    category: 'el',
290-    mixed: false,
291-    employees: 6,
--
333-    id: 'el-14',
334-    name: 'Zero-amount variable_usage-rad — edge case, metrics null',
335-    lineItems: [
336-      { type: 'recurring_subscription', description: 'Elabonnemang Vattenfall', amount: 630 },
337:      { type: 'variable_usage', description: 'Elförbrukning (0 kWh semestermånad)', amount: 0 },
338-    ],
339-    category: 'el',
340-    mixed: false,
```

### Kommando 16

```bash
ls -R ops 2>/dev/null | head -60; echo ---; ls results 2>/dev/null | head -40
```

```
ops:
bulk-jobb.txt
diag-avtal-live.txt
diag-reveal-fleet.txt
diag-reveal-live.json
diag-reveal-live.txt
diag-saas-result.txt
diag-triaged.txt
door-shots
ellevio-raden.txt
enhetsfelet.txt
fakturanummer.txt
grindarna.txt
grindmatning.txt
inspect-result.txt
inspect.trigger
inventory-moat.txt
kvittering-shots
landing-copy-shots
landing-full
lasvagen.txt
live-avtal-shots
matt-shots
obduktion
probe-avstamningsbransle.txt
probe-avtal-corpus.txt
probe-bokslutsar.txt
probe-bolagsverket.txt
probe-business-intel.txt
probe-ct-onboarding.txt
probe-ct-vag.txt
probe-direct-microsoft.txt
probe-egress.txt
probe-exponering.txt
probe-identitet-tackning.txt
probe-identitet.txt
probe-kandidatfalt.txt
probe-koncernraden.txt
probe-kristianstad.txt
probe-lfl-tackning.txt
probe-m365-enterprise.txt
probe-m365-priser.txt
probe-prisbok.txt
probe-result.txt
probe-saas-render.txt
probe-saas-valuta.txt
probe-sista-tre.txt
probe-soktraffar.txt
probe-stickprov.txt
probe-vakt.txt
probe-varmekedjan.txt
probe-villkorsdokument.txt
prospect-review-token.json
prospect-review.json
score-underlag.txt
seed-price-history.txt
sek02-shots
source-telco-prices.txt
testyta-rows.json
testyta-shots
---
```

### Kommando 17

```bash
grep -n -i "kwh\|fortum\|tibber\|tryggel" ops/grindmatning.txt | head -40
```

```
(Bash completed with no output)
```

### Kommando 18

```bash
head -60 ops/grindmatning.txt; echo '=== SIZE'; wc -l ops/grindmatning.txt
```

```
═══ BALANSKRAVET (B2) MOT VERKLIGA RADER · 6 fakturor med radposter ═══


────────────────────────────────────────────────────────────────────────
fakturor med dömbara rader (antal OCH à-pris):  6
rader dömda:                                    11
rader FÄLLDA:                                   0
fakturor som skulle STOPPAS om grinden armeras: 0
fällandeandel per rad:                          0.0 %
────────────────────────────────────────────────────────────────────────
Tolkning: en LÅG andel betyder att grinden kan armeras — den skulle sällan stoppa en
faktura. En HÖG andel betyder att den fäller korrekta fakturor och måste lagas först.
Sonden avgör INTE vilket; den ger talet som beslutet ska vila på.
=== SIZE
14 ops/grindmatning.txt
```

### Kommando 19

```bash
grep -n -i "kwh\|Fortum\|Tibber\|Tryggel" ops/grindarna.txt | head -40; echo '=== head'; head -50 ops/grindarna.txt
```

```
11:  ✗ fortum-el-fastpris.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
12:  ✗ tibber-el-timavrakning.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
13:  ✗ tryggel.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
=== head
╔═══════════════════════════════════════════════════════════════════════════════
║ SOND: probe-grindarna
║ FÅNGAR: Hur ofta balanskravet, projektionskravet och schemakravet skulle fälla verkliga fakturor — talet som avgör om de fyra ENFORCE-flaggorna kan sättas.
║ BLIND FÖR: test-pdfs/ är vår egen korpus och speglar inte nödvändigtvis kundtrafikens fördelning. Sonden avgör aldrig om en fälld rad är ett sant fel eller ett falsklarm — det kräver att en människa läser fakturan. Prosakravet mäts inte här: det dömer AI:ns reasoning mot promptens fakta och kräver hela recommend-steget, alltså ett andra modellanrop per faktura.
║ Läs aldrig siffrorna nedan utan raden ovanför. En mätning utan sin gräns är
║ ett påstående som låtsas vara ett faktum.
╚═══════════════════════════════════════════════════════════════════════════════
═══ GRINDARNA MOT 9 VERKLIGA FAKTUROR ═══

  ✗ konsult-it-oklar.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ fortum-el-fastpris.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ tibber-el-timavrakning.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ tryggel.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ tele2-mobil-kreditfaktura.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ eon-el-solceller.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ eon-el-spot-se3.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ kraftringen-el-lokalt.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi
  ✗ vattenfall-el-se4.pdf: extraktionen föll — Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi


────────────────────────────────────────────────────────────────────────
fakturor lästa: 0 · extraktionsfel: 9

BALANSKRAVET   prövbara 0 fakturor · 0 rader
               skulle STOPPA 0 fakturor (—)
               fällda rader: 0 (—)
               TÄCKNING: 0 av 0 rader bar öresfält (—)
               0 rader odömbara (à-pris < 10 kr utan öresfält) — grinden TIGER där, den godkänner inte

PROJEKTIONSKRAV prövbara 0 · fäller 0 (—)

SCHEMAKRAVET    prövbara 0 · fäller 0 (—)

RING 1 (radsumma, REDAN ARMERAD — referensmåttet)
               ok 0 · stopp 0 · varning 0 · ej prövbar 0
               stoppfrekvens — — en armerad grinds verkliga nivå
────────────────────────────────────
```

### Kommando 20

```bash
grep -rn "3400\|3 400 kWh\|kWh" ops/*.txt ops/obduktion/* 2>/dev/null | head -30
```

```
(Bash completed with no output)
```

### Kommando 21

```bash
ls test-pdfs/ 2>/dev/null | head -40; echo '---'; ls ops/obduktion 2>/dev/null
```

```
Faktura_1.pdf
Faktura_2.pdf
Faktura_3.pdf
Faktura_4.pdf
README.md
adobe-creative-cloud-ars.pdf
ald-billeasing-outofscope.pdf
atea-m365-overskott.pdf
atlassian-cloud-manad.pdf
atlassian.pdf
avtal
aws-reseller-komplex.pdf
aws-startup-kredit.pdf
azure-csp-reseller.pdf
bahnhof-fiber-ren.pdf
bevakning-outofscope.pdf
bredband-nytt-avtal-rabatt.pdf
bredband_1_baseline.pdf
bredband_2_sveakom.pdf
bredband_3.pdf
bredband_4.pdf
bredbandsbolaget-kampanj.pdf
bulk-mini
bulk26
canon-hog-klickratio.pdf
cloudreseller-norden.pdf
comhem-mobil-bredband-kombinerad.pdf
comviq-data-tal.pdf
comviq-mobil-budget.pdf
connectsverige.pdf
crayon-m365-azure.pdf
dhl-frakt-standard.pdf
diag-bredband.pdf
dustin-m365-standard.pdf
eon-el-solceller.pdf
eon-el-spot-se3.pdf
fortum-el-fastpris.pdf
globalcom-mobil-hog-roaming.pdf
google-workspace-arsbetalning.pdf
hubspot-marketing-pro.pdf
---
spana-benchmark-prisbok-lib-benchmark-js-agent.md
spana-recommend-kedjan-agents-recommender-reco.md
```

### Kommando 22

```bash
node -e "console.log('KEY:', !!process.env.ANTHROPIC_API_KEY, 'DB:', !!process.env.DATABASE_URL)"; ls -a | grep -i env
```

```
KEY: false DB: false
.env.example
```

### Kommando 23

```bash
sed -n 1,40p lib/pdf-textlager.js
```

```
// lib/pdf-textlager.js — extraherar textlagret ur en PDF. En uppgift, inga åsikter.
//
// Modulen TOLKAR ingenting. Den plockar ut de teckensträngar som ligger i dokumentets textlager
// och lämnar dem vidare. All bedömning — står klausulen där, går läsningen att lita på — bor i
// lib/villkorslasare.js. Delningen är avsiktlig: extraktionen är den sköra delen, och skörhet
// ska aldrig få uttala sig om innebörd.
//
// VARFÖR pdfjs OCH INTE EN EGEN PARSER. Att skriva en egen PDF-läsare hade varit möjligt (zlib +
// Tj/TJ-operatorer), men dess felläge är det farliga: en egen parser producerar SUBTILT FEL text
// vid ligaturer, teckentabeller och CID-teckensnitt — och en subtilt fel text får en klausul som
// står ordagrant i dokumentet att se struken ut. Det vore ett larm i den farliga riktningen.
// pdfjs är Firefox egen motor och gör textlagret rätt eller misslyckas synligt.
//
// Blanksteg: vi fogar ihop fragmenten med radbrytning och bryr oss inte om ordmellanrum, eftersom
// läsaren ändå stryker varje blanksteg före jämförelsen. Se villkorslasare.js för varför.

/** Extraherar hela textlagret. Kastar hellre än att returnera halv text — halv text är en lögn. */
export async function extraheraTextlager(bytes) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  // Ingen worker i Node: allt körs i processen, deterministiskt och utan sidokanaler.
  const laddning = pdfjs.getDocument({
    data: new Uint8Array(bytes),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: false,
  });
  const doc = await laddning.promise;

  const sidor = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const sida = await doc.getPage(i);
    const innehall = await sida.getTextContent();
    sidor.push(innehall.items.map((it) => (typeof it.str === 'string' ? it.str : '')).join('\n'));
  }
  const antal = doc.numPages;

  // ── STÄDNING FÅR ALDRIG OGILTIGFÖRKLARA EN LYCKAD LÄSNING (2026-08-09) ────────────────────
  // Första versionen anropade doc.destroy(), som inte finns i pdfjs 6 — och kastade därmed bort
  // två fullständigt extraherade textlager på ett fel som inträffade EFTER att texten var läst.
  // Båda dokumenten rapporterades OLÄSBAR fast de lästs perfekt. Gränsen är skarp och principiell:
```

### Kommando 24

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/txt.mjs <<'EOF'
import { readFileSync } from 'node:fs';
import { extraheraTextlager } from '/home/user/arvo-flow.github.io/lib/pdf-textlager.js';
for (const f of ['fortum-el-fastpris.pdf','tibber-el-timavrakning.pdf']) {
  const r = await extraheraTextlager(readFileSync('/home/user/arvo-flow.github.io/test-pdfs/'+f));
  const t = (r.text ?? r.sidor?.join('\n') ?? String(r)).replace(/\n+/g,' ');
  console.log('=== '+f+' ===');
  console.log(t.slice(0, 1400));
  console.log();
}
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/txt.mjs
```

```
Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
=== fortum-el-fastpris.pdf ===
Fortum Markets AB Org.nr: 556528-5889 Hangövägen 47, 115 77 Stockholm FAKTURA Fakturanr: FRT-2026-05-334411 Fakturadatum: 2026-05-01 Förfallodatum: 2026-05-30 Faktureras till: Hantverksfirman Johansson AB Verkstadsgatan 8, 721 34 Västerås Beskrivning   Antal   À-pris   Belopp (ex. moms) Fortum Fastpris Företag 2026 — April — 3 400 kWh   3400   kWh 1,12   3 808,00 Elnätabonnemang 16A (fast avgift)   1   mån 295,00   295,00 Nätöverföring — 3 400 kWh × 0,198 kr/kWh   3400   kWh 0,198   673,20 Energiskatt — 3 400 kWh × 0,428 kr/kWh   3400   kWh 0,428   1 455,20 Summa exkl. moms:   6 231,40 kr Moms (25 %)   1 557,85 kr ATT BETALA:   7 789,25 kr Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer Fastprisavtal Fortum Företag Trygg 24 — gäller t.o.m. 2027-12-31 | Elområde SE3 | Pris inkl. elcertifikat: 1,12 kr/kWh

Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
=== tibber-el-timavrakning.pdf ===
Tibber AB Org.nr: 556975-6529 Kungsgatan 8, 111 43 Stockholm FAKTURA Fakturanr: TIB-2026-05-A87123 Fakturadatum: 2026-05-01 Förfallodatum: 2026-05-30 Faktureras till: IT-Konsulten Eriksson AB Lidingövägen 14, 114 22 Stockholm Beskrivning   Antal   À-pris   Belopp (ex. moms) Tibber Spot Timavräkning — April 2026 — 2 100 kWh   2100   kWh 0,834   1 751,40 Tibber-avgift (app + tjänst) — April 2026   1   mån 39,00   39,00 Nätöverföring SE3 — 2 100 kWh × 0,211 kr/kWh   2100   kWh 0,211   443,10 Energiskatt — 2 100 kWh × 0,428 kr/kWh   2100   kWh 0,428   898,80 Summa exkl. moms:   3 132,30 kr Moms (25 %)   783,075 kr ATT BETALA:   3 915,375 kr Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer Tibber timavräkning — pris varierar per timme baserat på Nordpool spotpris. Genomsnittspris april: 83,4 öre/kWh. Elområde SE3.
```

### Kommando 25

```bash
grep -n "seatCount\|pricePerSeat" src/pages/TestaFaktura/index.js | head -40
```

```
42:function buildKeyFinding({ cat, supplier, seatCount, adjAnnualCost, suggestedAnnualCost, diagOvPct, licenseOverage }) {
45:  if ((cat === 'mobil' || cat === 'molnvaxel') && seatCount > 1) {
46:    const perNow = Math.round(adjAnnualCost / seatCount);
47:    const perNew = Math.round((suggestedAnnualCost ?? 0) / seatCount);
48:    return `${seatCount} abonnemang hos ${supplier} — ${fmtN(perNow)} kr/st/år mot avtalspriset ${fmtN(perNew)} kr/st/år.`;
51:    return `${seatCount} licenser hos ${supplier} — varav ${licenseOverage} verkar oanvända.`;
53:  if (cat?.startsWith('saas') && seatCount > 1) {
54:    return `${seatCount} licenser hos ${supplier} — ${diagOvPct}% över avtalspris för er storlek.`;
271:function LicenseOverageBlock({ seatCount, employees, overage, term, termSing }) {
278:          <span className="lon-teaser">{overage} av {seatCount} {term} verkar oanvända</span>
287:            Kalkylen ovan bygger på att vi behåller era {seatCount} {term},
961:          seatCount:           sw.paidSeats,
962:          pricePerSeatMonthly: sw.perSeatMonthly,
1048:      : `Mobil${_secSaving.seatCount ? ` (${_secSaving.seatCount} st)` : ''}`
1996:              const sc = result.extracted?.seatCount;
2002:                  seatCount={sc}
```

### Kommando 26

```bash
sed -n 1985,2025p src/pages/TestaFaktura/index.js
```

```
                  {getCategoryMeta(result.categorized.category).isRealPrice
                    ? result.recommendation.reasoning
                    : redactSupplier(
                        result.recommendation.reasoning,
                        result.recommendation.suggestedSupplier,
                      )}
                </p>
              </Reasoning>
            )}

            {result.recommendation?.shouldSwitch && !isOptimize && (() => {
              const sc = result.extracted?.seatCount;
              const emp = Number(employees);
              const overage = sc != null && sc > emp ? sc - emp : 0;
              const _om = getCategoryMeta(result.categorized?.category);
              return overage > 0 ? (
                <LicenseOverageBlock
                  seatCount={sc}
                  employees={emp}
                  overage={overage}
                  term={_om.unit}
                  termSing={_om.unitSingular}
                />
              ) : null;
            })()}

            {/* ── Fakturaunderlag — dolt som standard, öppnas på begäran ──────── */}
            <CalcToggle onClick={() => setDetailsOpen(o => !o)}>
              {detailsOpen ? '↑ Dölj underlag' : '↓ Hur vi räknar'}
            </CalcToggle>

            {detailsOpen && <>

            {result.route === 'auto' && !result.categorized?.licensePending && !(result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 && !isOptimize) && (
              <PriceNote>
                {_effectiveMeta.benchmarkType === 'list-verified'
                  ? 'Priset baseras på verifierade offentliga listpriser hos ledande leverantörer. Vid genomfört byte bekräftas slutpriset i offert innan ni godkänner.'
                  : (_effectiveMeta.benchmarkNote ?? 'Uppskattad besparing baserad på Arvos branschdata — exakt utfall via offert från en verifierad lägre leverantör.')}
              </PriceNote>
            )}
            {result.route === 'auto' && !result.categorized?.licensePending && !_effectiveMeta.isRealPrice && result.savingRange && (
```

### Kommando 27

```bash
grep -rn "unit\b\|unitSingular" src/utils/format.js | head -30; echo '=== el meta'; grep -n "el:" -A12 src/utils/format.js | head -40
```

```
=== el meta
```

### Kommando 28

```bash
grep -rn "getCategoryMeta" --include=*.js src/ | head -5; echo ---; grep -rn "unitSingular" --include=*.js src/ lib/ | head
```

```
src/lib/holdings.js:1:import { getCategoryMeta } from './categoryMeta.js';
src/lib/holdings.js:149:  const meta = getCategoryMeta(a.category);
src/lib/categoryMeta.js:424:export function getCategoryMeta(category) {
src/pages/PortfolioJuli26/index.js:14:import { getCategoryMeta } from '../../lib/categoryMeta';
src/pages/PortfolioJuli26/index.js:184:  const meta = getCategoryMeta(a.category);
---
src/lib/categoryMeta.js:8: *   unit/unitSingular ← isMobil/isSaas terminology switches
src/lib/categoryMeta.js:23:    unitSingular:       'abonnemang',
src/lib/categoryMeta.js:38:    unitSingular:       'användare',
src/lib/categoryMeta.js:53:    unitSingular:       'anslutning',
src/lib/categoryMeta.js:68:    unitSingular:       'licens',
src/lib/categoryMeta.js:83:    unitSingular:       'licens',
src/lib/categoryMeta.js:98:    unitSingular:       'licens',
src/lib/categoryMeta.js:113:    unitSingular:       'licens',
src/lib/categoryMeta.js:128:    unitSingular:       'licens',
src/lib/categoryMeta.js:143:    unitSingular:       'avtal',
```

### Kommando 29

```bash
node -e "
const m = require('fs').readFileSync('src/lib/categoryMeta.js','utf8');
const i = m.indexOf(\"  el: {\");
console.log(m.slice(i, i+700));
"
```

```
  el: {
    label:              'Elavtal',
    partnerLabel:       'Kvalificerad Elleverantör',
    segment:            1,
    unit:               'avtal',
    unitSingular:       'avtal',
    inlineLabel:        'el (energidel)',
    isRealPrice:        false,
    benchmarkType:      'list-verified',
    benchmarkNote:      null,
    smfBenchmark:       'marknadsmässiga elavtal kostar väsentligt mindre',
    variableChargeNote: 'Rörliga energikostnader (spotpris, nätavgift) — ej inkluderat i årsberäkningen.',
    licensePending:     false,
    elSuffix:           true,
  },
  skrivarleasing: {
    label:              'Skrivare & Managed Print',
    partnerLabel:       'Kvalificerad Print-le
```

### Kommando 30

```bash
sed -n 265,300p src/pages/TestaFaktura/index.js; echo '=== backend 1900-1925'; sed -n 1900,1925p api/test-invoice.mjs
```

```
        </div>
      )}
    </CalculationChain>
  );
}

function LicenseOverageBlock({ seatCount, employees, overage, term, termSing }) {
  const [open, setOpen] = React.useState(false);
  return (
    <LicenseOverageNote>
      <button className="lon-trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="lon-head">
          <span className="kicker">Notering om {term}</span>
          <span className="lon-teaser">{overage} av {seatCount} {term} verkar oanvända</span>
        </span>
        <span className={`lon-chevron${open ? ' open' : ''}`}>
          <Icon name="chevron-right" size={15} stroke={2.5} />
        </span>
      </button>
      {open && (
        <div className="lon-body">
          <p>
            Kalkylen ovan bygger på att vi behåller era {seatCount} {term},
            men sänker styckpriset genom att flytta er till rätt avtalsnivå. Vi noterar dock
            att ni enligt uppgift är {employees} anställda. Om man dessutom hade städat bort
            {overage === 1 ? ` detta ${overage} överflödiga ${termSing}` : ` dessa ${overage} överflödiga ${term}`}, hade er kostnad sänkts ytterligare.
          </p>
        </div>
      )}
    </LicenseOverageNote>
  );
}

function ContractWatchCard({ analysisId, supplier, email: initEmail, onSaved }) {
  const [date, setDate]       = useState('');
  const [email, setEmail]     = useState(initEmail ?? '');
=== backend 1900-1925
        suggestedAnnualCost: _responseSuggested,
        secondarySaving: secondarySaving ?? null,
        grossSaving,
        arvoFee,
        netSaving,
        confidence: recommendation.confidence,
        reasoning: (recommendation.reasoning ?? '').replace(/\s*\}\}+\s*$/, '').trim(),
        switchSteps: recommendation.switchSteps ?? [],
        // EN sanning: licenseOverage/overageSavings/shelfware kommer uteslutande från
        // recommend.js shelfware-modellen (rådgivande revisor) — aldrig en lokal omräkning
        // av seatCount−employees här (det var regel 1-brottet: naivt gap som "svinn").
        licenseOverage: recommendation.licenseOverage ?? null,
        overageSavings: recommendation.overageSavings ?? null,
        shelfware:      recommendation.shelfware ?? null,
        fortnoxRightsizing: recommendation.fortnoxRightsizing ?? null,
        annualBillingSaving: recommendation.annualBillingSaving ?? null,
        nonPrimaryAnnual:    recommendation.nonPrimaryAnnual ?? 0,
        tierOptimizationSaving:   recommendation.tierOptimizationSaving   ?? null,
        tierOptimizationFee:       recommendation.tierOptimizationFee       ?? null,
        tierOptimizationNetSaving: recommendation.tierOptimizationNetSaving ?? null,
        tierOptimizationFromTier: recommendation.tierOptimizationFromTier ?? null,
        tierOptimizationToTier:   recommendation.tierOptimizationToTier   ?? null,
        clickRateAnalysis:        recommendation.clickRateAnalysis        ?? null,
        // Forensik-inversionen (regel 2: kod 
```

### Kommando 31

```bash
grep -n "seatCount" -B6 api/test-invoice.mjs | sed -n '1,60p'
```

```
717-      }
718-    }
719-
720-    // ── Ring 2: Seat count oracle (fire-and-forget) ───────────────────────────
721-    // Haiku läser PDF:en oberoende av Opus och verifierar antalet licenser/SIM-kort.
722-    // Ej blockerande — påverkar inte kundlatensen. Vid avvikelse: internt larm.
723:    if ((extracted.seatCount ?? 0) > 0) {
724-      verifySeatCount({
725:        seatCount:  extracted.seatCount,
726-        lineItems:  extracted.lineItems,
727-        pdfBase64:  pdfBytes.toString('base64'),
728-      }).then((seatResult) => {
729-        if (!seatResult.ok) {
730-          notifyReviewQueue(
731-            extracted,
732:            `[Ring2 Seat Oracle] seatCount Opus=${seatResult.opusCount} ≠ Haiku=${seatResult.oracleCount} (diff=${seatResult.diff})`,
--
975-            const _prevAnnual  = Number(_prev.annual_cost);
976-            const _currAnnual  = extracted.annualCost;
977-            // Per-säte-normalisering: totalkostnad kan stiga utan att priset/säte ökar,
978-            // t.ex. om bolaget anställt fler. Utan denna normalisering flaggas tillväxt
979-            // felaktigt som en smyghöjning.
980-            const _prevSeats   = Number(_prev.seat_count ?? 0);
981:            const _currSeats   = Number(extracted.seatCount ?? 0);
--
1034-        // #1-fix (2026-06-28): en avtalsbevakad faktura ska SYNAS i kontoret (Liggare 1, "Avtalsbevakad"),
1035-        // inte försvinna. Lagra som monitoring-rad med kontraktsklockan — annars tyst bortfall (regel 9).
1036-        await storeAnalysis({
1037-          fingerprint, pdfHash, extracted, categorized,
1038-          recommendation: { shouldSwitch: false, reasoning: '' },
1039-          route: 'monitoring', industry, employees: employeesNum,
1040:          userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
--
1057-            annualCost:             extracted.annualCost,
1058-            recurringAmount:        extracted.recurringAmount,
1059-            variableCharges:        extracted.variableCharges,
1060-            oneTimeFees:            extracted.oneTimeFees,
1061-            date:                   extracted.date,
1062-            recurring:              extracted.recurring,
1063:            seatCount:              extracted.seatCount ?? null,
--
1242-          // precis den rad kunden vill se i rummet: "vi vet att ni är låsta, och vi vet till
1243-          // när". Utan raden ser det ut som att fakturan försvann.
1244-          await storeAnalysis({
1245-            fingerprint, pdfHash, extracted, categorized,
1246-            recommendation: { shouldSwitch: false, reasoning: '' },
1247-            route: 'monitoring', industry, employees: employeesNum,
1248:            userEmail: body.userEmail, seatCount: extracted.seatCount ?? null,
--
1338-          reasoning: '',
1339-          grossSaving: elRec.grossSaving,
1340-          netSaving,
1341-        },
1342-        route: 'auto', industry, employees: employeesNum,
1343-        userEmail: typeof bod
```

### Kommando 32

```bash
sed -n 955,1030p api/test-invoice.mjs
```

```
    if (fingerprint && categorized.category !== 'el' && (extracted.annualCost ?? 0) > 0) {
      try {
        const _db = getDb();
        if (_db) {
          const _fpHash = createHash('sha256').update(String(fingerprint)).digest('hex').slice(0, 32);
          // Kräver samma normalized_supplier — utan detta jämförs kostnader
          // kors-leverantör om kunden bytt (t.ex. Telia → Tele2, samma kategori).
          const _prevRows = await _db`
            SELECT annual_cost, seat_count, created_at
            FROM invoice_analyses
            WHERE fingerprint        = ${_fpHash}
              AND category           = ${categorized.category}
              AND normalized_supplier = ${categorized.normalizedSupplier ?? ''}
              AND route              = 'auto'
              AND annual_cost        > 0
            ORDER BY created_at DESC
            LIMIT 1
          `;
          const _prev = _prevRows[0];
          if (_prev) {
            const _prevAnnual  = Number(_prev.annual_cost);
            const _currAnnual  = extracted.annualCost;
            // Per-säte-normalisering: totalkostnad kan stiga utan att priset/säte ökar,
            // t.ex. om bolaget anställt fler. Utan denna normalisering flaggas tillväxt
            // felaktigt som en smyghöjning.
            const _prevSeats   = Number(_prev.seat_count ?? 0);
            const _currSeats   = Number(extracted.seatCount ?? 0);
            const _usePerSeat  = _prevSeats > 0 && _currSeats > 0;
            const _prevBase    = _usePerSeat ? _prevAnnual / _prevSeats : _prevAnnual;
            const _currBase    = _usePerSeat ? _currAnnual / _currSeats : _currAnnual;
            const _deltaPct    = ((_currBase - _prevBase) / _prevBase) * 100;
            const _monthsSince = Math.max(1, Math.round(
              (Date.now() - new Date(_prev.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30.5)
            ));
            if (Math.abs(_deltaPct) > 7) {
              priceHistoryContext = {
                prevAnnualCost:  _prevAnnual,
                deltaPct:        Math.round(_deltaPct * 10) / 10,
                monthsSince:     _monthsSince,
                isIncrease:      _deltaPct > 0,
                perSeatNorm:     _usePerSeat,
              };
              console.log(`[smyghöjning] category=${categorized.category} supplier=${categorized.normalizedSupplier} delta=${_deltaPct.toFixed(1)}% perSeat=${_usePerSeat} months=${_monthsSince}`);
            }
          }
        }
      } catch (_err) {
        console.warn('[smyghöjning] history query failed (non-fatal):', _err.message);
      }
    }

    // ── Avtalslås-detektering (körs före alla tidiga exits) ───────────────────
    // Hoppas över för licensePending-kategorier — vi kan inte byta ändå, så
    // "låst avtal" skulle vara vilseledande för t.ex. försäkringskunder.
    // Trigger: antingen (start + cancellationDays inom lock-window) ELLER
    //          (periodEnd i framtid + cancellationDays passerat).
    c
```

### Kommando 33

```bash
sed -n 1300,1345p api/test-invoice.mjs; echo '===1420-1450'; sed -n 1415,1450p api/test-invoice.mjs
```

```
          userEmail: body.userEmail }).catch(bokforFel);
        return send(res, 200, {
          ok: true, route: 'review_queue', reason: 'el_data_missing',
          extracted: {
            supplier: extracted.supplier, date: extracted.date,
            amount: extracted.amount, confidenceScore: extracted.confidenceScore,
            lineItems: extracted.lineItems,
          },
          categorized: {
            category: categorized.category,
            normalizedSupplier: categorized.normalizedSupplier,
          },
          timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
        });
      }
      timing.recommendMs = 0;
      timing.totalMs = Date.now() - t0;

      storeDatapoint({
        category: 'el', supplier: categorized.normalizedSupplier,
        annualCost: elRec.currentAnnualGross, industry, employees: employeesNum,
        segmentOkant,
      }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

      const { arvoFee, netSaving } = elRec;

      // ── DEN ALLVARLIGASTE LUCKAN AV ALLA (2026-08-15) ──────────────────────────────────
      // Den här grenen är en FULLSTÄNDIG, lyckad el-analys — och den skrev en anonym
      // datapunkt till branschpoolen (storeDatapoint ovan) utan att skriva en enda rad i
      // KUNDENS egen liggare. Vi lärde alltså av kundens faktura och gav ingenting tillbaka:
      // den syntes varken i innehavet, i scoren eller i räknarna. El är dessutom Nivå 1 —
      // kategorin vi lovar att faktiskt GENOMFÖRA bytet i (Switch-doktrinen). Att just den
      // aldrig landade i rummet är löftet utan mekanik i sin renaste form (regel 9).
      await storeAnalysis({
        fingerprint: typeof fingerprint === 'string' ? fingerprint : null,
        pdfHash, extracted, categorized,
        recommendation: {
          shouldSwitch: elRec.shouldSwitch ?? (netSaving > 0),
          reasoning: '',
          grossSaving: elRec.grossSaving,
          netSaving,
        },
        route: 'auto', industry, employees: employeesNum,
        userEmail: typeof body.userEmail === 'string' ? body.userEmail.trim().toLowerCase() : null,
        seatCount: extracted.seatCount ?? null,
      }).catch((err) => console.error('[test-invoice] storeAnalysis (el auto) failed:', err.message));
===1420-1450
    // Sviten låste `computeLikeForLikeSaasTarget` med 1 276 gröna tester — en funktion produktionen
    // aldrig anropade. Mekanismen var bevisad, signalen rörde sig aldrig. Samma sjukdom som
    // villkorsvakten. Mätt och bevisat av scripts/probe-lfl-produktionsvag.mjs.
    // Kopian är borta. Produktionen kör nu samma funktion som sviten låser — och därmed också
    // dess prorata-korrigering (CR-88412) och per-tier-avrundning, som kopian saknade.
    let _lflTarget = null;
    if (categorized.category === 'saas-productivity') {
      _lflTarget = computeLikeForLikeSaasTarget(
        extracted.lineItems ?? [],
        BRANCHINDEX['saas-productivity']?.license
```

### Kommando 34

```bash
sed -n 1346,1412p api/test-invoice.mjs
```

```
      return send(res, 200, {
        ok: true, route: 'auto',
        extracted: {
          supplier:             extracted.supplier,
          amount:               extracted.amount,
          recurringAmount:      extracted.recurringAmount,
          variableCharges:      extracted.variableCharges,
          oneTimeFees:          extracted.oneTimeFees,
          annualCost:           elRec.currentAnnualGross,
          date:                 extracted.date,
          description:          extracted.description,
          billingPeriod:        extracted.billingPeriod,
          lineItems:            extracted.lineItems,
          recurring:            extracted.recurring,
          confidenceScore:      extracted.confidenceScore,
          notes:                extracted.notes,
          seatCount:            null,
          elKwh:                extracted.elKwh,
          elBillingMonth:       extracted.elBillingMonth,
          elOmrade:             elRec.omrade,
          elAnnualKwhEstimated: elRec.annualKwh,
          elUncertaintyNote:    elRec.uncertaintyNote,
          elSkatterKr:          extracted.elSkatterKr,
          elNatavgiftAnnual:    elRec.elNatavgiftAnnual > 0 ? elRec.elNatavgiftAnnual : null,
        },
        categorized: {
          category:           categorized.category,
          subType:            categorized.subType,
          normalizedSupplier: categorized.normalizedSupplier,
          confidence:         categorized.confidence,
          reasoning:          categorized.reasoning,
          licensePending:     categorized.licensePending,
        },
        recommendation: {
          shouldSwitch:        elRec.shouldSwitch,
          suggestedSupplier:   null,
          suggestedAnnualCost: elRec.suggestedAnnualCost,
          grossSaving:         elRec.grossSaving,
          arvoFee,
          netSaving,
          confidence:          0.72,
          reasoning:           elRec.reasoning,
          switchSteps:         elRec.shouldSwitch ? [
            'Arvo analyserar ert nuvarande elavtal och identifierar uppsägningstidpunkt',
            'Vi begär in offerter från kvalificerade elleverantörer med Arvo-volymrabatt',
            'Bästa erbjudandet presenteras — ni godkänner, Arvo sköter hela bytet',
          ] : [],
          licenseOverage:  null,
          overageSavings:  null,
          monitoringNote:  elRec.monitoringNote ?? null,
        },
        timing,
      });
    }

    // Pre-compute like-for-like target so recommend() can give the AI correct
    // pricing context before generating reasoning (price gap, not tier change).
    //
    // ── DEN MÖRKA LÅSNINGEN, RÄTTAD 2026-08-12 (regel 1 + Verifieringsplikten p.5) ──────────────
    // Här låg en LOKAL KOPIA av like-for-like-matten med egen tier-regex. Kopian räknade rätt
    // TOTAL men byggde ett fattigare objekt: { suggestedAnnualCost, dominantTierKey } — utan
    // tierLines. Två konsekvenser, båda osynliga i sviten:
    //   1. Attribuerin
```

### Kommando 35

```bash
grep -rn "seat_count" --include=*.js --include=*.mjs . | grep -v node_modules | grep -v "^./tests" | head -40
```

```
./api/test-invoice.mjs:963:            SELECT annual_cost, seat_count, created_at
./api/test-invoice.mjs:980:            const _prevSeats   = Number(_prev.seat_count ?? 0);
./api/invoice-history.mjs:226:      seats:      a.seat_count,
./api/invoice-history.mjs:480:      // är micro-golvet fel population för ett bolag med tolv anställda. seat_count är enheterna
./api/invoice-history.mjs:484:        employees: (typeof a.seat_count === 'number' && a.seat_count > 0) ? a.seat_count : 5,
./api/invoice-history.mjs:489:        const seats = (typeof a.seat_count === 'number' && a.seat_count > 0) ? a.seat_count : null;
./scripts/probe-lasvagen.mjs:50:           seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date,
./scripts/notify-price-changes.mjs:15: *   4. Beräkna impact    — seat_count × pris-delta × 12 = kr/år per kund
./scripts/probe-score-underlag.mjs:54:         annual_cost, seat_count, employees, health_score, should_switch, net_saving, route,
./scripts/probe-score-underlag.mjs:67:  const seats = Number(r.seat_count) > 0 ? Number(r.seat_count) : null;
./scripts/probe-score-underlag.mjs:70:  // Underlaget (det kunden ser) använder ALLTID seat_count ur fakturan.
./scripts/probe-score-underlag.mjs:122:  const seats = Number(r.seat_count) > 0 ? Number(r.seat_count) : null;
./scripts/probe-score-underlag.mjs:161:  const seats = Number(r.seat_count) > 0 ? Number(r.seat_count) : null;
./scripts/probe-score-underlag.mjs:162:  if (!seats) { hoppa(r, 'seat_count saknas'); continue; }
./scripts/probe-enhetsfelet.mjs:130:    SELECT id, annual_cost, seat_count, employees, industry, should_switch,
./scripts/probe-enhetsfelet.mjs:138:    const enheter = r.seat_count ?? r.employees ?? 0;
./scripts/screenshot-domforst.mjs:29:  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
./scripts/screenshot-acting-fix.mjs:31:  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
./scripts/export-testyta.mjs:18:         industry, employees, billing_period, seat_count, price_per_seat_monthly,
./scripts/screenshot-forecast.mjs:32:  seat_count: r.seat_count, price_per_seat_monthly: r.price_per_seat_monthly,
./scripts/probe-direct-microsoft.mjs:13:         annual_cost, seat_count, price_per_seat_monthly, billing_period,
./scripts/probe-direct-microsoft.mjs:25:  P(`        annual_cost=${r.annual_cost} · seat_count=${r.seat_count ?? 'NULL'} · price_per_seat_monthly=${r.price_per_seat_monthly ?? 'NULL'} · billing_period=${r.billing_period ?? 'NULL'}`);
./scripts/probe-direct-microsoft.mjs:28:const withSeats = rows.filter((r) => r.seat_count > 0);
./scripts/probe-direct-microsoft.mjs:29:P(`\n   → ${rows.length} direkt-Microsoft-rader · ${withSeats.length} med känt seat_count`);
./scripts/inspect-analyses.mjs:16:         gross_saving, net_saving, should_switch, route, seat_count, price_per_seat_monthly
./scripts/inspect-analyses.mjs:90:         should_switch, seat_count,
./scripts/screenshot-kontoret-real.mjs:29:  se
```

### Kommando 36

```bash
sed -n 470,500p api/invoice-history.mjs
```

```
      // Här stod `getBenchmark(...)` och därefter ett filter på source === 'real-public'.
      // getBenchmark är prisboken FÖR EN BESPARINGSBERÄKNING: den föredrar — helt riktigt —
      // livedata när den finns (invoice_datapoints ≥10, invoice_analyses ≥5). Men livedatan är
      // TOTALSUMMOR, och ett ankare vars etikett lovar "per användare/år" får aldrig bära en
      // totalsumma. Filtret gjorde alltså rätt sak av fel svar: det KASTADE ankaret i stället för
      // att hämta rätt källa. Följden var bakvänd — ju mer nätverksdata vi samlade, desto oftare
      // gick "den kollektiva sanningen" tyst, det lager bibeln säger aldrig kan vara tomt.
      // getPublicListBenchmark läser BRANCHINDEX direkt och returnerar ENDAST verifierat publikt
      // listpris per enhet. Samma funktion som dörrens avslöjande redan använde (regel 1).
      // Kundens egen storlek följer med: för kategorier med äkta storleksberoende golv (loneadmin)
      // är micro-golvet fel population för ett bolag med tolv anställda. seat_count är enheterna
      // ur kundens egen faktura — aldrig en gissad personalstyrka.
      const b = getPublicListBenchmark({
        category: a.category,
        employees: (typeof a.seat_count === 'number' && a.seat_count > 0) ? a.seat_count : 5,
      });
      if (b && b.median > 0) {
        // seats = antal enheter ur kundens egen faktura. median (per enhet) × seats = bransch-TOTAL,
        // jämförbar med kundens annual_cost (bägge totaler, samma enhet). null → ingen total-jämförelse.
        const seats = (typeof a.seat_count === 'number' && a.seat_count > 0) ? a.seat_count : null;
        out[a.category] = {
          category: a.category, median: b.median, p25: b.p25 ?? null,
          source: b.source, unitLabel: unit.label, unitNoun: unit.noun, unitNounPl: unit.nounPl,
          // ORDET "VERIFIERAT" KRÄVER ETT DATUM (2026-08-15). Kortet sa "verifierat publikt
          // listpris" utan att kunna säga verifierat NÄR — och det är exakt den halvan av
          // påståendet kunden kan kontrollera. Saknas datumet ska ordet bort, inte datumet döljas.
          lastVerified: b.lastVerified ?? null,
          // VAD TALET ÄR PRISET PÅ (2026-08-18). "Billigaste publicerade pris 1 606 kr" på en
          // Google Workspace-rad läses som Googles pris — men talet är M365 Business Standard.
          // Utan produktnamnet är raden en antydan, inte en jämförelse. Maskinvakt: MK-08.
          referensProdukt: b.referensProdukt ?? null,
```

### Kommando 37

```bash
grep -n "BRANCH_ANCHOR_UNIT" -A 30 api/invoice-history.mjs | head -50
```

```
445:export const BRANCH_ANCHOR_UNIT = {
446-  'saas-productivity': { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
447-  'saas-creative':     { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
448-  'saas-crm':          { label: 'per användare/år', noun: 'användare',   nounPl: 'användare' },
449-  mobil:               { label: 'per abonnemang/år', noun: 'abonnemang', nounPl: 'abonnemang' },
450-  bredband:            { label: 'per anslutning/år', noun: 'anslutning', nounPl: 'anslutningar' },
451-  // loneadmin saknades här till 2026-08-19 — kategorin är real-public med ett verifierat golv
452-  // (Fortnox Lön, härlett ur avgiftsstrukturen), men utan en enhet i listan skippar
453-  // buildBranchAnchors den och rummet kunde aldrig visa golvet. Enheten är INTE gissad: prisboken
454-  // säger "Per anställd/år" i klartext, och härledningen räknar per anställd. Allowlistan finns
455-  // för att vi aldrig ska gissa enheten — inte för att tiga om en vi känner.
456-  loneadmin:           { label: 'per anställd/år',   noun: 'anställd',   nounPl: 'anställda' },
457-};
458-
459-export async function buildBranchAnchors(analyses) {
460-  const seen = new Set();
461-  const out = {};
462-  for (const a of analyses) {
463-    if (a.route !== 'auto' || !a.category || seen.has(a.category)) continue;
464:    const unit = BRANCH_ANCHOR_UNIT[a.category];
465-    if (!unit) continue;                            // okänd enhet → inget ankare (aldrig gissa enheten)
466-    seen.add(a.category);
467-    if (seen.size > 8) break;
468-    try {
469-      // ── ANKARET FRÅGADE FEL MASKIN (grundargranskning 2026-08-15) ──────────────────────────
470-      // Här stod `getBenchmark(...)` och därefter ett filter på source === 'real-public'.
471-      // getBenchmark är prisboken FÖR EN BESPARINGSBERÄKNING: den föredrar — helt riktigt —
472-      // livedata när den finns (invoice_datapoints ≥10, invoice_analyses ≥5). Men livedatan är
473-      // TOTALSUMMOR, och ett ankare vars etikett lovar "per användare/år" får aldrig bära en
474-      // totalsumma. Filtret gjorde alltså rätt sak av fel svar: det KASTADE ankaret i stället för
475-      // att hämta rätt källa. Följden var bakvänd — ju mer nätverksdata vi samlade, desto oftare
476-      // gick "den kollektiva sanningen" tyst, det lager bibeln säger aldrig kan vara tomt.
477-      // getPublicListBenchmark läser BRANCHINDEX direkt och returnerar ENDAST verifierat publikt
478-      // listpris per enhet. Samma funktion som dörrens avslöjande redan använde (regel 1).
479-      // Kundens egen storlek följer med: för kategorier med äkta storleksberoende golv (loneadmin)
480-      // är micro-golvet fel population för ett bolag med tolv anställda. seat_count är enheterna
481-      // ur kundens egen faktura — aldrig en gissad personalstyrka.
482-      const b = getPublicListBenchmark({
483-        category: a.category,
484-        employees: (typeof a.seat_count === 'number' &&
```

### Kommando 38

```bash
sed -n 440,580p tests/obduktion.mjs
```

```
  });
});

// ── OB-24..27 · BALANSKRAVET MÄTTE I KRONOR OCH FÄLLDE VARJE ELFAKTURA ────────────────────────
// Den första riktiga grindmätningen (75 verkliga fakturor, 2026-08-22): balanskravet fällde
// 8 av 69 — och SJU var elfakturor. Orsaken var inte fakturorna utan grinden:
//
//   Fortum  3400 kWh × 1 kr = 3400, belopp 3808  → verkligt à-pris 1,12 kr
//   Tibber  2100 kWh × 1 kr = 2100, belopp 1751  → verkligt 0,834 kr
//   Tryggel 3100 kWh × 2 kr = 6200, belopp 5735  → verkligt 1,85 kr
//   Tele2   1 × 898 kr = 898,       belopp −898  → kreditering
//
// `unitPrice` är ett HELTALSFÄLT i kronor och elpriser ligger på 0,80–1,90 kr/kWh. Avrundningen
// ensam gör aritmetiken omöjlig. Fältet som löser det fanns redan — `unit_price_ore`/`amount_ore`
// infördes 12 augusti för exakt den förväxlingen — men bara avstämningsgrinden fick fixen.
//
// FÅNGAR: att grinden räknar på det avrundade kronorfältet när öresfälten finns, och att en
//   kreditering (negativt belopp) räknas som ett aritmetikfel.
// BLIND: prövar aritmetiken, aldrig om det AVLÄSTA öresbeloppet är rätt läst. Det är SR-07:s
//   uppgift (à-pris × antal = radbelopp mot fakturans egna tal) och stickprovet mot textlagret.
describe('OB · Balanskravet räknar i öre och känner igen en kreditering', () => {
  const rad = (o) => ({ description: 'El', quantity: 3400, type: 'recurring_subscription', ...o });

  test('OB-24 · elraden går ihop när öresfälten finns', () => {
    // Fortum, med det verkliga à-priset i öre: 3400 × 112 öre = 380 800 öre = 3 808 kr.
    const r = judgeLineArithmetic({ lineItems: [rad({
      unitPrice: 1, amount: 3808, unit_price_ore: 112, amount_ore: 380_800,
    })] });
    assert.equal(r.judged, 1);
    assert.equal(r.balanced, true,
      'grinden fällde en korrekt elfaktura därför att den räknade på det avrundade kronorfältet');
  });

  test('OB-25 · MOTPROVET: en verkligt obalanserad rad fälls fortfarande i öre', () => {
    // En spärr som godkänner allt är lika värdelös som ingen spärr.
    const r = judgeLineArithmetic({ lineItems: [rad({
      unitPrice: 1, amount: 9999, unit_price_ore: 112, amount_ore: 999_900,
    })] });
    assert.equal(r.balanced, false);
    assert.equal(r.violations[0].reason, 'antal_x_apris_matchar_inte_radbelopp');
  });

  test('OB-26 · en kreditering prövas på beloppets storlek, inte dess tecken', () => {
    // Tele2:s kreditfaktura: 1 × 898 kr, belopp −898. Grinden såg 1 796 kr fel.
    const r = judgeLineArithmetic({ lineItems: [{
      description: 'Kreditering: dubbelfakturering', quantity: 1, unitPrice: 898,
      amount: -898, type: 'one_time_fee',
    }] });
    assert.equal(r.judged, 1);
    assert.equal(r.balanced, true, 'ett negativt belopp är en kreditering, inte ett aritmetikfel');
  });

  test('OB-27 · en kreditering med FEL belopp fälls, och skälet namnger den', () => {
    const r = judgeLineArithmetic({ lineItems: [{
      description: 'Kreditering', quantity: 1, unitPrice: 898, amount: -1500, type: 'one_tim
```

### Kommando 39

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p4.mjs <<'EOF'
import { judgeLineArithmetic } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// Raderna nedan är AVLÄSTA UR TEXTLAGRET i test-pdfs/fortum-el-fastpris.pdf resp.
// tibber-el-timavrakning.pdf (lib/pdf-textlager.js, inga modellanrop):
//   "Nätöverföring — 3 400 kWh × 0,198 kr/kWh   3400   kWh 0,198   673,20"
// unit_price_ore är HELTAL öre → 0,198 kr = 19,8 öre kan inte representeras.
const rad = (d, q, ore, amount) => ({
  description: d, quantity: q, type: 'recurring_subscription',
  unitPrice: Math.round(ore / 100), amount, unit_price_ore: ore, amount_ore: null,
});

const fall = [
  ['Fortum nätöverföring 0,198 → 20 öre (närmaste heltal)', rad('Nätöverföring 3 400 kWh × 0,198', 3400, 20, 673)],
  ['Fortum nätöverföring 0,198 → 19 öre (avrundat ned)',    rad('Nätöverföring 3 400 kWh × 0,198', 3400, 19, 673)],
  ['Fortum energiskatt   0,428 → 43 öre',                   rad('Energiskatt 3 400 kWh × 0,428', 3400, 43, 1455)],
  ['Fortum elhandel      1,12  → 112 öre (FACIT: går ihop)',rad('Fortum Fastpris 3 400 kWh', 3400, 112, 3808)],
  ['Tibber nätöverföring 0,211 → 21 öre',                   rad('Nätöverföring SE3 2 100 kWh × 0,211', 2100, 21, 443)],
  ['Tibber spot          0,834 → 83 öre',                   rad('Tibber Spot 2 100 kWh', 2100, 83, 1751)],
];
for (const [namn, r] of fall) {
  const d = judgeLineArithmetic({ lineItems: [r] });
  const exp = r.quantity * r.unit_price_ore;
  const tol = Math.max(100, exp * 0.005);
  console.log(
    (d.balanced ? 'OK   ' : 'FÄLLD') + ' | ' + namn.padEnd(52) +
    ` förväntat ${exp} öre · faktiskt ${r.amount*100} öre · diff ${Math.abs(exp - r.amount*100)} · tolerans ${Math.round(tol)}`
  );
}
console.log('\nStrukturregeln: max avrundningsfel = antal × 0,5 öre. Tolerans = antal × à-pris × 0,005.');
console.log('=> täcker bara när à-pris ≥ 100 öre (1 kr). Under 1 kr/enhet kan grinden inte 
```

```
FÄLLD | Fortum nätöverföring 0,198 → 20 öre (närmaste heltal) förväntat 68000 öre · faktiskt 67300 öre · diff 700 · tolerans 340
FÄLLD | Fortum nätöverföring 0,198 → 19 öre (avrundat ned)   förväntat 64600 öre · faktiskt 67300 öre · diff 2700 · tolerans 323
OK    | Fortum energiskatt   0,428 → 43 öre                  förväntat 146200 öre · faktiskt 145500 öre · diff 700 · tolerans 731
OK    | Fortum elhandel      1,12  → 112 öre (FACIT: går ihop) förväntat 380800 öre · faktiskt 380800 öre · diff 0 · tolerans 1904
OK    | Tibber nätöverföring 0,211 → 21 öre                  förväntat 44100 öre · faktiskt 44300 öre · diff 200 · tolerans 221
OK    | Tibber spot          0,834 → 83 öre                  förväntat 174300 öre · faktiskt 175100 öre · diff 800 · tolerans 872

Strukturregeln: max avrundningsfel = antal × 0,5 öre. Tolerans = antal × à-pris × 0,005.
=> täcker bara när à-pris ≥ 100 öre (1 kr). Under 1 kr/enhet kan grinden inte döma — men gör det ändå.
```

### Kommando 40

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p5.mjs <<'EOF'
import { judgeLineArithmetic } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';
// ELHANDELSRADEN — den prompten uttryckligen klassar recurring_subscription:
// "Klassificera ALLTID rader som ... 'Förbrukning X kWh', 'Rörligt elpris', 'Spotpris el'
//  som recurring_subscription."
// Spotpris i SE3 ligger normalt 0,30–0,90 kr/kWh. Vi sveper hela bandet i steg om 0,5 öre
// och frågar: hur många à-priser fäller grinden på en PERFEKT faktura där antal × à-pris
// är exakt radbeloppet?
let fallda = 0, provade = 0; const exempel = [];
for (let tiondelsOre = 300; tiondelsOre <= 900; tiondelsOre += 5) {   // 0,300 .. 0,900 kr
  const kwh = 3400;
  const exaktOre = kwh * tiondelsOre / 10;                  // radens SANNA belopp i öre
  const amountKr = Math.round(exaktOre / 100);              // heltalsfältet på raden
  const ore     = Math.round(tiondelsOre / 10);             // unit_price_ore = HELTAL öre
  const d = judgeLineArithmetic({ lineItems: [{
    description: `Elhandel spotpris ${kwh} kWh`, quantity: kwh, type: 'recurring_subscription',
    unitPrice: Math.round(tiondelsOre/1000), amount: amountKr, unit_price_ore: ore, amount_ore: null,
  }]});
  provade++;
  if (!d.balanced) { fallda++; if (exempel.length < 6) exempel.push(`${(tiondelsOre/1000).toFixed(3)} kr/kWh → ${ore} öre`); }
}
console.log(`Perfekta elhandelsrader prövade: ${provade} · FÄLLDA av grinden: ${fallda} (${(100*fallda/provade).toFixed(0)} %)`);
console.log('Exempel på à-priser som fälls:', exempel.join(' · '));
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p5.mjs
```

```
Perfekta elhandelsrader prövade: 121 · FÄLLDA av grinden: 60 (50 %)
Exempel på à-priser som fälls: 0.305 kr/kWh → 31 öre · 0.315 kr/kWh → 32 öre · 0.325 kr/kWh → 33 öre · 0.335 kr/kWh → 34 öre · 0.345 kr/kWh → 35 öre · 0.355 kr/kWh → 36 öre
```

### Kommando 41

```bash
timeout 900 npm run test:algo 2>&1 | tail -25
```

```
  duration_ms: 3.306713
  type: 'suite'
  ...
# Subtest: 00 · Sviten bevakar sig själv
    # Subtest: varje tests/*.mjs är inkopplad i run.mjs (inga tysta hål)
    ok 1 - varje tests/*.mjs är inkopplad i run.mjs (inga tysta hål)
      ---
      duration_ms: 0.858536
      type: 'test'
      ...
    1..1
ok 325 - 00 · Sviten bevakar sig själv
  ---
  duration_ms: 0.91364
  type: 'suite'
  ...
1..325
# tests 1928
# suites 326
# pass 1928
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 4195.67168
```

### Kommando 42

```bash
grep -rn "runIntegrityChecks\|extraction-integrity" tests/ | head
```

```
tests/obduktion.mjs:22:import { judgeProjection } from '../lib/extraction-integrity.js';
tests/obduktion.mjs:25:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
tests/balanskrav.mjs:9:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
tests/svea-print.mjs:15:import { judgeProjection, judgeLineArithmetic } from '../lib/extraction-integrity.js';
```

### Kommando 43

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p6.mjs <<'EOF'
import { aggregateLineItems } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { runIntegrityChecks } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// KONTROLL 3 ("lineItems-summa ska stämma mot fakturabeloppet ±3 %") — kan den fyra?
// aggregateLineItems sätter amount = summan av lineItems. Kontrollen jämför alltså
// summan med sig själv. Vi provar en faktura där en rad SAKNAS mot fakturans total:
const saknadRad = {
  supplier: 'X AB', date: '2026-05-01', description: 'test', billingPeriod: 'monthly',
  lineItems: [{ description: 'Rad 1', amount: 1000, type: 'recurring_subscription',
               quantity: null, unitPrice: null, is_addon: false, is_prorata: false }],
  confidenceScore: 0.95, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 1000,
  invoiceTotal: 5000,     // <-- fakturan säger 5 000 kr; vi läste bara 1 000 kr
};
const agg = aggregateLineItems(saknadRad);
console.log('extracted.amount =', agg.amount, ' invoiceTotal =', agg.invoiceTotal);
const ov = runIntegrityChecks(agg, '').overrides;
console.log('overrides:', JSON.stringify(ov));
console.log('→ lineItemsTotal-kontrollen fyrade:', ov.some(o => o.field === 'lineItemsTotal'));

// KONTROLL 2 (LICENSFAKTURA + månadsperiod) — monthsBetween får en ENUM, inte ett datumintervall
const m = { ...agg, recurring: false, billingPeriod: 'monthly' };
const ov2 = runIntegrityChecks(m, 'LICENSFAKTURA Lime CRM  Period 2026-05-01 - 2026-05-31').overrides;
console.log('\nKontroll 2 med perfekt LICENSFAKTURA-header, overrides:', JSON.stringify(ov2.map(o=>o.reason)));
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p6.mjs
```

```
extracted.amount = 1000  invoiceTotal = 5000
overrides: []
→ lineItemsTotal-kontrollen fyrade: false

Kontroll 2 med perfekt LICENSFAKTURA-header, overrides: ["recurring_subscription_line_items_present"]
```

### Kommando 44

```bash
node -e "
const s = require('fs').readFileSync('lib/extraction-integrity.js','utf8');
" ; node --input-type=module -e "
const src = await import('/home/user/arvo-flow.github.io/lib/extraction-integrity.js');
" 2>/dev/null; node --input-type=module -e "
// monthsBetween är inte exporterad — vi visar samma uträkning som koden gör
const monthsBetween = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split(/[-–]/).map(s => s.trim());
  if (parts.length !== 2) return null;
  return 'nådde-datumparsning';
};
for (const v of ['monthly','quarterly','annual','one_time','unknown','2026-05-01 - 2026-05-31'])
  console.log(JSON.stringify(v).padEnd(30), '→', monthsBetween(v));
"
echo '=== billingPeriodAssumed ytor ==='
grep -rn "billingPeriodAssumed\|billing_period_assumed" --include=*.js --include=*.mjs . | grep -v node_modules
```

```
<persisted-output>
Output too large (108KB). Full output saved to: /root/.claude/projects/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/tool-results/b2mafnz9l.txt

Preview (first 2KB):
"monthly"                      → null
"quarterly"                    → null
"annual"                       → null
"one_time"                     → null
"unknown"                      → null
"2026-05-01 - 2026-05-31"      → null
=== billingPeriodAssumed ytor ===
./src/pages/TestaFaktura/index.js:1523:                          {result.extracted.billingPeriodAssumed ? ' · antaget månadsvis (fakturan saknar period)' : ''}
./agents/test-invoice/extract.js:842:  // antagandet (billingPeriodAssumed) så kundytan kan be om bekräftelse. Engångs/hårdvara rörs ej.
./agents/test-invoice/extract.js:843:  let billingPeriodAssumed = false;
./agents/test-invoice/extract.js:854:      billingPeriodAssumed = true;
./agents/test-invoice/extract.js:921:    billingPeriodAssumed,
./api/test-invoice.mjs:1860:        billingPeriodAssumed: extracted.billingPeriodAssumed ?? false,
./scripts/diag-live.mjs:30:  billingPeriodAssumed: data.extracted?.billingPeriodAssumed,
./tests/extract-simple-invoice.mjs:26:    assert.equal(r.billingPeriodAssumed, true);
./tests/extract-simple-invoice.mjs:68:    assert.equal(r.billingPeriodAssumed, false);
...
</persisted-output>
```

### Kommando 45

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p7.mjs <<'EOF'
// VERBATIM-kopia av monthsBetween ur lib/extraction-integrity.js rad 14-25 (ej exporterad).
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
const MONTHLY_PERIOD_RE = /^\d{4}-\d{2}-\d{2}\s*[-–]\s*\d{4}-\d{2}-\d{2}$/;
const fall = [
  'monthly', 'quarterly', 'annual', 'one_time', 'unknown',   // <- det som FAKTISKT skickas in
  '2026-05-01 - 2026-05-31',                                  // <- formatet modulen är skriven för
  '2026-05-01 – 2026-05-31',
];
for (const v of fall) {
  console.log(JSON.stringify(v).padEnd(28),
    '| split-delar:', String(v.split(/[-–]/).length).padStart(2),
    '| monthsBetween →', monthsBetween(v),
    '| matchar MONTHLY_PERIOD_RE:', MONTHLY_PERIOD_RE.test(v));
}
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p7.mjs
```

```
"monthly"                    | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"quarterly"                  | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"annual"                     | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"one_time"                   | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"unknown"                    | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"2026-05-01 - 2026-05-31"    | split-delar:  6 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: true
"2026-05-01 – 2026-05-31"    | split-delar:  6 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: true
```

### Kommando 46

```bash
sed -n 215,250p tests/schemakrav.mjs
```

```
    assert.equal(v[0].reason, 'saknat_obligatoriskt_fält');
  });
});

// ── 4. Lägena — SKUGGA / ARMERAD / fail-open ─────────────────────────────────
describe('Schemakravet · guardToolPayload-lägena', () => {
  const brokenPayload = { ...validCategorize, category: 'kryptovaluta' };

  test('SKUGGA (default): brott loggas men släpps igenom (ok=true)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: brokenPayload, enforce: false });
    assert.equal(r.ok, true);
    assert.equal(r.violations.length, 1);
  });

  test('ARMERAD: brott avvisas (ok=false)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: brokenPayload, enforce: true });
    assert.equal(r.ok, false);
    assert.equal(r.violations.length, 1);
  });

  test('ARMERAD + giltig payload: passerar (ok=true, 0 brott)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: validCategorize, enforce: true });
    assert.equal(r.ok, true);
    assert.equal(r.violations.length, 0);
  });

  test('fail-open: vaktens egen krasch fäller aldrig analysen', () => {
    const r = guardToolPayload({ agent: 'test', tool: null, payload: {}, enforce: true });
    assert.equal(r.ok, true);
    assert.deepEqual(r.violations, []);
  });
});
```

### Kommando 47

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p8.mjs <<'EOF'
import { routeExtraction, aggregateLineItems } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { guardToolPayload } from '/home/user/arvo-flow.github.io/lib/schema-guard.js';

// ── (1) Vaktens krasch → kundens gröna bock ─────────────────────────────────
const dom = guardToolPayload({ agent: 'extract', tool: null, payload: {}, enforce: true });
console.log('guardToolPayload efter krasch      :', JSON.stringify(dom));
// extract.js rad 1283, verbatim:
const schemakrav = { ok: dom.violations.length === 0, brott: dom.violations.length };
console.log('schemakrav som bärs till kvittot   :', JSON.stringify(schemakrav));
const r = routeExtraction({
  supplier: 'Fortum', billingPeriod: 'monthly', annualCost: 46284, confidenceScore: 0.95,
  lineItems: [{ description: 'El', amount: 3808, quantity: null, unitPrice: null }],
  schemakrav,
});
console.log('kvittorad som visas för kunden     :',
  JSON.stringify(r.verifications.find(v => v.id === 'schemakrav')));

// ── (2) confidenceScore saknas helt (schemakravet står i SKUGGA) ────────────
const utanConf = routeExtraction({
  supplier: 'Fortum', billingPeriod: 'monthly', annualCost: 46284,
  lineItems: [{ description: 'El', amount: 3808 }],
});
console.log('\nroute utan confidenceScore         :', utanConf.route);
const lagConf = routeExtraction({
  supplier: 'Fortum', billingPeriod: 'monthly', annualCost: 46284, confidenceScore: 0.20,
  lineItems: [{ description: 'El', amount: 3808 }],
});
console.log('route med confidenceScore = 0.20   :', lagConf.route, '·', lagConf.reason);
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p8.mjs
```

```
[schemakrav] fail-open — vakten kraschade själv: Cannot read properties of null (reading 'input_schema')
guardToolPayload efter krasch      : {"ok":true,"violations":[]}
schemakrav som bärs till kvittot   : {"ok":true,"brott":0}
kvittorad som visas för kunden     : {"id":"schemakrav","status":"ok","detalj":"AI-utfallet följer extraktionsschemat fältvis"}

route utan confidenceScore         : auto
route med confidenceScore = 0.20   : review_queue · Confidence 0.20 under tröskel 0.7
```

### Kommando 48

```bash
sed -n 175,215p src/pages/TestaFaktura/index.js; echo '=== verifications i api-svar ==='; grep -n "verifications" api/test-invoice.mjs | head
```

```
    resolve(base64);
  };
  reader.onerror = () => reject(new Error('Kunde inte läsa filen'));
  reader.readAsDataURL(file);
});

// B4 · Verifikationskvittot — renderar grindarnas VERKLIGA domslut (backend
// emitterar dem ur routeExtraction). UI:t påstår aldrig en kontroll själv:
// finns ingen rad, ritas ingen bock. 'ej_provbar' visas ärligt nedtonad —
// hederligheten är premiumsignalen, inte en radda oförtjänta bockar.
const VERIFICATION_LABELS = {
  schemakrav: 'Strukturkontroll',
  radsumma:   'Radsumma mot fakturatotal',
  balanskrav: 'Antal × à-pris per rad',
  projektion: 'Nästa periods belopp',
  listpris:   'Jämförelsepris',
};
const VERIFICATION_GLYPHS = { ok: '✓', varning: '!', stopp: '✕', ej_provbar: '–' };

function VerificationReceiptBlock({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const judged = items.filter((v) => v.status !== 'ej_provbar');
  const passed = judged.filter((v) => v.status === 'ok');
  const unjudged = items.length - judged.length;
  return (
    <VerificationReceipt>
      <div className="vr-header">
        <span className="vr-title">Maskinellt kontrollerad</span>
        <span className="vr-count">
          {passed.length} av {judged.length} kontroller gröna{unjudged > 0 ? ` · ${unjudged} ej prövbara` : ''}
        </span>
      </div>
      <div className="vr-body">
        {items.map((v) => (
          <div key={v.id} className={`vr-row ${v.status}`}>
            <span className={`vr-glyph ${v.status}`}>{VERIFICATION_GLYPHS[v.status] ?? '·'}</span>
            <span className="vr-label">{VERIFICATION_LABELS[v.id] ?? v.id}</span>
            <span className="vr-detalj">{v.detalj}</span>
          </div>
        ))}
      </div>
=== verifications i api-svar ===
1759:    if (Array.isArray(routing.verifications) && recommendation.suggestedAnnualCost != null) {
1761:        routing.verifications.push({
1775:        routing.verifications.push({ id: 'listpris', status: 'ej_provbar', detalj: _skal });
1940:      verifications: routing.verifications ?? [],
```

### Kommando 49

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/txt2.mjs <<'EOF'
import { readFileSync } from 'node:fs';
import { extraheraTextlager } from '/home/user/arvo-flow.github.io/lib/pdf-textlager.js';
for (const f of ['eon-el-spot-se3.pdf','kraftringen-el-lokalt.pdf','vattenfall-el-se4.pdf']) {
  const r = await extraheraTextlager(readFileSync('/home/user/arvo-flow.github.io/test-pdfs/'+f));
  const t = (r.text ?? r.sidor?.join('\n') ?? String(r)).replace(/\n+/g,' ');
  console.log('=== '+f+' ===\n'+t.slice(0,1100)+'\n');
}
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/txt2.mjs 2>/dev/null
```

```
=== eon-el-spot-se3.pdf ===
E.ON Energilösningar AB Org.nr: 556570-2650 Malmöhusvägen 1, 205 09 Malmö FAKTURA Fakturanr: EON-2026-05-0088123 Fakturadatum: 2026-05-01 Förfallodatum: 2026-05-30 Faktureras till: Restaurang Källaren AB Köpmansgatan 4, 111 31 Stockholm Beskrivning   Antal   À-pris   Belopp (ex. moms) Elhandel Företag Rörligt — April 2026 — 8 200 kWh   8200   kWh 0,891   7 306,20 E.ON Elnätabonnemang 25A (fast avgift)   1   mån 385,00   385,00 Nätöverföringsavgift — 8 200 kWh × 0,215 kr/kWh   8200   kWh 0,215   1 763,00 Energiskatt — 8 200 kWh × 0,428 kr/kWh   8200   kWh 0,428   3 509,60 Summa exkl. moms:   12 963,80 kr Moms (25 %)   3 240,95 kr ATT BETALA:   16 204,75 kr Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer Elområde SE3 (Stockholm) | Spotprisavtal | Genomsnittspris april: 89,1 öre/kWh | Mätarnr: 735999112233445566

=== kraftringen-el-lokalt.pdf ===
Kraftringen Energi AB Org.nr: 556603-0498 Råbyvägen 3, 224 58 Lund FAKTURA Fakturanr: KRF-2026-05-11234 Fakturadatum: 2026-05-01 Förfallodatum: 2026-05-30 Faktureras till: Lunds Cykelservice AB Klostergatan 5, 222 22 Lund Beskrivning   Antal   À-pris   Belopp (ex. moms) Elhandel Rörligt — April 2026 — 1 200 kWh   1200   kWh 0,744   892,80 Kraftringen Nätabonnemang 10A   1   mån 195,00   195,00 Nätöverföring — 1 200 kWh × 0,193 kr/kWh   1200   kWh 0,193   231,60 Energiskatt — 1 200 kWh × 0,428 kr/kWh   1200   kWh 0,428   513,60 Summa exkl. moms:   1 833,00 kr Moms (25 %)   458,25 kr ATT BETALA:   2 291,25 kr Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer Lokalt elnätsbolag SE4 | Lund, Skåne | Mätarnr: KR-11234567

=== vattenfall-el-se4.pdf ===
Vattenfall Eldistribution AB Org.nr: 556417-0024 Evenemangsgatan 13, 169 79 Solna FAKTURA Fakturanr: VTF-2026-05-0091234 Fakturadatum: 2026-05-01 Förfallodatum: 2026-05-30 Faktureras till: Skånska Livs AB Stortorget 3, 211 23 Malmö Beskrivning   Antal   À-pris   Belopp (ex. moms) Vattenfall Rörligt Företag — April 2026 — 6 800 kWh   6800   kWh 0,712   4 841,60 Elnätabonnemang 3×25A (fast avgift)   1   mån 545,00   545,00 Nätöverföring SE4 — 6 800 kWh × 0,187 kr/kWh   6800   kWh 0,187   1 271,60 Energiskatt — 6 800 kWh × 0,428 kr/kWh   6800   kWh 0,428   2 910,40 Summa exkl. moms:   9 568,60 kr Moms (25 %)   2 392,15 kr ATT BETALA:   11 960,75 kr Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer Elområde SE4 (Malmö/Skåne) | Rörligt spotprisavtal | Genomsnittspris april: 71,2 öre/kWh | Anläggnings-ID: 7352298411234567
```

### Kommando 50

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p9.mjs <<'EOF'
// Alla tal nedan är AVLÄSTA UR TEXTLAGRET i test-pdfs/*.pdf (lib/pdf-textlager.js, noll modellanrop).
// Klassificeringen följer SYSTEM_PROMPT (elhandel/förbrukning => recurring_subscription;
// energiskatt => one_time_fee) och tests/fixtures/04-el.mjs (nätavgift => recurring_subscription).
// unit_price_ore är schemats HELTALSFÄLT i öre => à-priset måste avrundas.
import { aggregateLineItems, routeExtraction } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';

const rad = (d, q, kr, typ) => ({
  description: d, quantity: q, type: typ,
  unitPrice: Math.round(kr), amount: Math.round(q * kr),
  unit_price_ore: Math.round(kr * 100), amount_ore: null,
  is_addon: false, is_prorata: false,
});
const fast = (d, kr) => ({ description: d, quantity: 1, type: 'recurring_subscription',
  unitPrice: kr, amount: kr, unit_price_ore: kr * 100, amount_ore: null, is_addon: false, is_prorata: false });

const fakturor = {
  'eon-el-spot-se3.pdf': { total: 12964, rader: [
    rad('Elhandel Företag Rörligt — April 2026 — 8 200 kWh', 8200, 0.891, 'recurring_subscription'),
    fast('E.ON Elnätabonnemang 25A (fast avgift)', 385),
    rad('Nätöverföringsavgift — 8 200 kWh × 0,215', 8200, 0.215, 'recurring_subscription'),
    rad('Energiskatt — 8 200 kWh × 0,428', 8200, 0.428, 'one_time_fee') ]},
  'kraftringen-el-lokalt.pdf': { total: 1833, rader: [
    rad('Elhandel Rörligt — April 2026 — 1 200 kWh', 1200, 0.744, 'recurring_subscription'),
    fast('Kraftringen Nätabonnemang 10A', 195),
    rad('Nätöverföring — 1 200 kWh × 0,193', 1200, 0.193, 'recurring_subscription'),
    rad('Energiskatt — 1 200 kWh × 0,428', 1200, 0.428, 'one_time_fee') ]},
  'vattenfall-el-se4.pdf': { total: 9569, rader: [
    rad('Vattenfall Rörligt Företag — April 2026 — 6 800 kWh', 6800, 0.712, 'recurring_subscription'),
    fast('Elnätabonnemang 3×25A (fast avgift)', 545),
    r
```

```
eon-el-spot-se3.pdf            | seatCount:  8200 | balanskrav: ok        | antal × à-pris ger radbeloppet på samtliga 1 prövbara rader
kraftringen-el-lokalt.pdf      | seatCount:  1200 | balanskrav: ok        | antal × à-pris ger radbeloppet på samtliga 1 prövbara rader
vattenfall-el-se4.pdf          | seatCount:  6800 | balanskrav: ok        | antal × à-pris ger radbeloppet på samtliga 1 prövbara rader
fortum-el-fastpris.pdf         | seatCount:  3400 | balanskrav: ok        | antal × à-pris ger radbeloppet på samtliga 1 prövbara rader
```

### Kommando 51

```bash
grep -rn "unitPriceOre\|unit_price_ore\|amountOre\|amount_ore" --include=*.js --include=*.mjs . | grep -v node_modules | grep -v "^./tests/"
```

```
./agents/test-invoice/extract.js:222:  — OBSERVATIONSFÄLTEN (moms_bas, moms_sats, amount_ore, unit_price_ore): dessa beskriver vad som
./agents/test-invoice/extract.js:230:      · amount_ore / unit_price_ore: radens belopp respektive à-pris i ÖRE (heltal), exakt som talet
./agents/test-invoice/extract.js:475:            amount_ore: {
./agents/test-invoice/extract.js:479:            unit_price_ore: {
./agents/test-invoice/extract.js:911:    // OBSERVATION, aldrig härledd (samma disciplin som moms_bas/amount_ore i avstämningsgrinden):
./agents/test-invoice/extract.js:933:      amountOre:   Number.isInteger(li.amount_ore)     ? li.amount_ore     : null,
./agents/test-invoice/extract.js:934:      unitPriceOre: Number.isInteger(li.unit_price_ore) ? li.unit_price_ore : null,
./scripts/probe-stickprov.mjs:42:    console.log(`      à-pris: ${ore(l.unitPriceOre)}   (kronorfält: ${l.unitPrice ?? '—'})`);
./scripts/probe-stickprov.mjs:43:    console.log(`      belopp: ${ore(l.amountOre)}   (kronorfält: ${l.amount ?? '—'})`);
./scripts/probe-stickprov.mjs:44:    if (Number.isInteger(l.unitPriceOre) && Number.isInteger(l.quantity) && Number.isInteger(l.amountOre)) {
./scripts/probe-stickprov.mjs:45:      const produkt = l.unitPriceOre * l.quantity;
./scripts/probe-stickprov.mjs:46:      console.log(`      radaritmetik: ${l.unitPriceOre} × ${l.quantity} = ${produkt} ${produkt === l.amountOre ? '= belopp ✓' : `≠ belopp ${l.amountOre} ✗`}`);
./scripts/probe-avstamningsbransle.mjs:49:  const ore = rader.filter((l) => Number.isInteger(l.amountOre)).length;
./scripts/probe-grindarna.mjs:61:  // unit_price_ore/amount_ore — och bibeln (12 aug) säger att de fälten varierar mellan
./scripts/probe-grindarna.mjs:89:    const harOre = Number.isFinite(l.unit_price_ore) && Number.isFinite(l.amount_ore);
./lib/saas-rad.js:75:  const ore = rad.amountOre;
./lib/saas-rad.js:94:  if (Number.isInteger(rad.unitPriceOre) && rad.unitPriceOre > 0 && rad.unitPriceOre * antal !== ore) {
./lib/extraction-integrity.js:166:      // Fältet som löser det fanns redan: `unit_price_ore`/`amount_ore` infördes 12 augusti för
./lib/extraction-integrity.js:171:      // den byggdes för. Schemat säger `amount_ore: null om beloppet inte står med öresprecision`,
./lib/extraction-integrity.js:177:      // känt tal, inte en härledning av ett okänt. Därför räcker `unit_price_ore`.
./lib/extraction-integrity.js:178:      const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
./lib/extraction-integrity.js:179:      const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore
```

### Kommando 52

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p10.mjs <<'EOF'
import { aggregateLineItems, routeExtraction } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { judgeLineArithmetic } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

// Fortum, exakt som textlagret läser den: "3400  kWh 1,12  3 808,00"
const raRad = {
  description: 'Fortum Fastpris Företag 2026 — April — 3 400 kWh',
  amount: 3808, type: 'recurring_subscription', quantity: 3400, unitPrice: 1,
  unit_price_ore: 112, amount_ore: null, is_addon: false, is_prorata: false,
};

console.log('── A. RÅ modellpayload (det testerna matar) ─────────────────────────');
const a = judgeLineArithmetic({ lineItems: [raRad] });
console.log('   judged =', a.judged, '· balanced =', a.balanced, '  <-- OB-30 grön här');

console.log('\n── B. AGGREGERAD payload (det PRODUKTIONEN matar) ───────────────────');
const agg = aggregateLineItems({
  supplier: 'Fortum Markets AB', date: '2026-05-01', description: 'Elfaktura april',
  billingPeriod: 'monthly', lineItems: [raRad], confidenceScore: 0.95,
  outOfScope: false, outOfScopeReason: null, projectedRecurringAmount: 3808, invoiceTotal: 3808,
});
console.log('   aggregerad rad :', JSON.stringify(agg.lineItems[0]));
console.log('   unit_price_ore på aggregerad rad:', agg.lineItems[0].unit_price_ore);
console.log('   unitPriceOre   på aggregerad rad:', agg.lineItems[0].unitPriceOre);
const b = judgeLineArithmetic(agg);
console.log('   judged =', b.judged, '· balanced =', b.balanced,
            '  <-- öresvägen aldrig nådd; à-pris 1 kr < 10 => raden hoppas över');

console.log('\n── C. Kvittot kunden ser (routeExtraction, produktionsvägen) ────────');
console.log('  ', JSON.stringify(routeExtraction(agg).verifications.find(v => v.id === 'balanskrav')));

console.log('\n── D. Vem läser vilket namn ─────────────────────────────────────────');
console.log('   lib/extraction-integrity.
```

```
── A. RÅ modellpayload (det testerna matar) ─────────────────────────
   judged = 1 · balanced = true   <-- OB-30 grön här

── B. AGGREGERAD payload (det PRODUKTIONEN matar) ───────────────────
   aggregerad rad : {"description":"Fortum Fastpris Företag 2026 — April — 3 400 kWh","amount":3808,"type":"recurring_subscription","quantity":3400,"unitPrice":1,"is_addon":false,"addon_type":null,"is_prorata":false,"amountOre":null,"unitPriceOre":112}
   unit_price_ore på aggregerad rad: undefined
   unitPriceOre   på aggregerad rad: 112
   judged = 0 · balanced = true   <-- öresvägen aldrig nådd; à-pris 1 kr < 10 => raden hoppas över

── C. Kvittot kunden ser (routeExtraction, produktionsvägen) ────────
   {"id":"balanskrav","status":"ej_provbar","detalj":"inga rader bär både antal och à-pris"}

── D. Vem läser vilket namn ─────────────────────────────────────────
   lib/extraction-integrity.js:178  l.unit_price_ore  (snake_case)
   lib/saas-rad.js:75/94            rad.amountOre / rad.unitPriceOre  (camelCase)
   agents/test-invoice/extract.js:933-934 emitterar ENBART camelCase
```

### Kommando 53

```bash
grep -rn "judgeLineArithmetic(" tests/ scripts/ | grep -v "^tests/.*://" 
```

```
tests/obduktion.mjs:159:    const dom = judgeLineArithmetic({
tests/obduktion.mjs:465:    const r = judgeLineArithmetic({ lineItems: [rad({
tests/obduktion.mjs:475:    const r = judgeLineArithmetic({ lineItems: [rad({
tests/obduktion.mjs:484:    const r = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:493:    const r = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:506:    const utanOre = judgeLineArithmetic({ lineItems: [rad({ unitPrice: 1, amount: 3808 })] });
tests/obduktion.mjs:515:    const ok = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:520:    const fel = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:550:    const r = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:561:    const r = judgeLineArithmetic({ lineItems: [{
tests/obduktion.mjs:571:    const r = judgeLineArithmetic({ lineItems: [{
tests/balanskrav.mjs:32:    const r = judgeLineArithmetic({ lineItems: CR88412 });
tests/balanskrav.mjs:38:    const r = judgeLineArithmetic({ lineItems: TELENOR });
tests/balanskrav.mjs:45:    const r = judgeLineArithmetic({ lineItems: bad });
tests/balanskrav.mjs:52:    const r = judgeLineArithmetic({ lineItems: bad });
tests/balanskrav.mjs:58:    const r = judgeLineArithmetic({ lineItems: [li('Klumpsumma', 5_000, null, null)] });
tests/balanskrav.mjs:64:    const r = judgeLineArithmetic({ lineItems: [li('Abonnemang', 1_001, 10, 100)] }); // 1 kr diff
tests/balanskrav.mjs:69:    assert.equal(judgeLineArithmetic(null).balanced, true);
tests/balanskrav.mjs:70:    assert.equal(judgeLineArithmetic({}).balanced, true);
tests/svea-print.mjs:30:    const r = judgeLineArithmetic({ lineItems: SVEA });
scripts/korpusdiff.mjs:92:  const bal = judgeLineArithmetic({ lineItems: fx.lineItems });
scripts/probe-grindarna.mjs:95:  const b2 = judgeLineArithmetic(ex);
scripts/probe-grindmatning.mjs:49:  const dom = judgeLineArithmetic({ lineItems: rader });
```

### Kommando 54

```bash
sed -n 80,100p scripts/probe-grindarna.mjs
```

```
    utfall.extraktionsfel++;
    console.log(`  ✗ ${fil}: extraktionen föll — ${err.message.split('\n')[0].slice(0, 70)}`);
    continue;
  }

  // TÄCKNINGSMÄTNING — samma villkor som grinden själv använder.
  for (const l of ex.lineItems ?? []) {
    if (l.quantity == null || !(l.quantity > 0) || l.type === 'variable_usage') continue;
    utfall.tackning.rader++;
    const harOre = Number.isFinite(l.unit_price_ore) && Number.isFinite(l.amount_ore);
    if (harOre) utfall.tackning.medOre++;
    else if (l.unitPrice != null && l.unitPrice > 0 && l.unitPrice < 10) utfall.tackning.odombaraSmaApris++;
  }

  // BALANSKRAVET — döms direkt på det extraherade utfallet.
  const b2 = judgeLineArithmetic(ex);
  if (b2.judged > 0) {
    utfall.balans.provbara++;
    utfall.balans.rader += b2.judged;
    utfall.balans.radfel += b2.violations.length;
    if (!b2.balanced) {
```

### Kommando 55

```bash
cat > /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p11.mjs <<'EOF'
import { aggregateLineItems, routeExtraction } from '/home/user/arvo-flow.github.io/agents/test-invoice/extract.js';
import { judgeProjection } from '/home/user/arvo-flow.github.io/lib/extraction-integrity.js';

console.log('== judgeProjection med fientliga indata ==');
for (const v of [null, undefined, {}, 'sträng', 0, { projectedFromAI: NaN, recurringAmount: 100, proRataCount: 0 }])
  console.log('  ', JSON.stringify(v), '→', JSON.stringify(judgeProjection(v)));

console.log('\n== halvårsfaktura: 182 dagars period ==');
const halvar = {
  supplier: 'Larm & Bevakning AB', date: '2026-01-01', description: 'Larmavtal H1 2026',
  billingPeriod: 'unknown',
  billing_period_start: '2026-01-01', billing_period_end: '2026-07-01',   // 181 dagar
  lineItems: [{ description: 'Larmabonnemang halvår', amount: 12000, type: 'recurring_subscription',
    quantity: 1, unitPrice: 12000, is_addon: false, is_prorata: false }],
  confidenceScore: 0.95, outOfScope: false, outOfScopeReason: null,
  projectedRecurringAmount: 12000, invoiceTotal: 12000,
};
const a = aggregateLineItems(halvar);
console.log('   billingPeriod =', a.billingPeriod, '(källa', a.billingPeriodSource + ')',
            '· annualCost =', a.annualCost, '· SANN årskostnad = 24000');
console.log('   route:', routeExtraction(a).route);

console.log('\n== moms: reverse charge (0 %) får inte falla tillbaka på tre-satsprovningen ==');
const bas = (o) => ({ supplier: 'X', billingPeriod: 'monthly', annualCost: 12000, confidenceScore: .95,
  lineItems: [{ description: 'r', amount: 1000 }], invoiceTotal: 1250, ...o });
for (const s of [0.25, 0, null])
  console.log('   momssats', String(s).padStart(5), '→',
    JSON.stringify(routeExtraction(bas({ momssats: s })).verifications.find(v=>v.id==='radsumma')));
EOF
node /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/p11.m
```

```
== judgeProjection med fientliga indata ==
   null → {"ok":true,"deviationPct":0}
   undefined → {"ok":true,"deviationPct":0}
   {} → {"ok":true,"deviationPct":0}
   "sträng" → {"ok":true,"deviationPct":0}
   0 → {"ok":true,"deviationPct":0}
   {"projectedFromAI":null,"recurringAmount":100,"proRataCount":0} → {"ok":false,"deviationPct":null}

== halvårsfaktura: 182 dagars period ==
[billing-period] date override: AI="unknown" → dates="annual" (2026-01-01 – 2026-07-01)
   billingPeriod = annual (källa dates) · annualCost = 12000 · SANN årskostnad = 24000
   route: auto

== moms: reverse charge (0 %) får inte falla tillbaka på tre-satsprovningen ==
   momssats  0.25 → {"id":"radsumma","status":"ok","detalj":"radsumman stämmer mot fakturatotalen (skillnaden är momsen, 25 % enligt fakturan)"}
[radsumma] fakturan anger 0 % moms, men glappet (250 kr) motsvarar en annan sats — fakturans momsuppgift och dess aritmetik är oense
   momssats     0 → {"id":"radsumma","status":"varning","detalj":"fakturan anger 0 % moms men glappet motsvarar en annan sats"}
   momssats  null → {"id":"radsumma","status":"ok","detalj":"radsumman stämmer mot fakturatotalen (skillnaden är momsen)"}
```
