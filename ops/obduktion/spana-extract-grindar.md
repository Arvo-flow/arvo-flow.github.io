# Spaning · extract-grindar

**Område:** `agents/test-invoice/extract.js`, `lib/extraction-integrity.js`, `lib/schema-guard.js`
**Datum:** 2026-08-24
**Sviten:** `npm run test:algo` → `# pass 1928 · # fail 0` (körd, grön hela tiden)
**Miljö:** ingen `ANTHROPIC_API_KEY`, ingen `DATABASE_URL`. Alla fynd är därför reproducerade
mot de **rena funktionerna i produktionsvägen** plus **textlagret ur riktiga PDF:er**
(`lib/pdf-textlager.js`, noll modellanrop). Inget fynd vilar på en gissning om vad modellen svarar.

Alla reproduktioner nedan har körts. Skripten ligger i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad/`
(p1–p11.mjs) och kan klistras in ordagrant.

---

## FYND 1 · Öresfältet når aldrig balanskravet — aggregeringen döper om det

**Fil:** `lib/extraction-integrity.js:178-180` vs `agents/test-invoice/extract.js:933-934`
**Familj:** två-sanningar (regel 1) + vakt-som-inte-kan-fälla + påstående utan täckning
**Allvar:** kundsynlig

### Vad som är fel

`judgeLineArithmetic` läser öresobservationerna i **snake_case**:

```js
// lib/extraction-integrity.js:178-180
const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore
  : (Number.isFinite(l.amount) ? Math.round(l.amount * 100) : null);
```

`aggregateLineItems` emitterar dem i **camelCase — och bara i camelCase**:

```js
// agents/test-invoice/extract.js:933-934
amountOre:   Number.isInteger(li.amount_ore)     ? li.amount_ore     : null,
unitPriceOre: Number.isInteger(li.unit_price_ore) ? li.unit_price_ore : null,
```

Produktionen anropar `routeExtraction(extracted)` med det **aggregerade** objektet
(`api/test-invoice.mjs:749`, `extracted` = returvärdet ur `extractInvoice`), och `routeExtraction`
skickar samma objekt vidare till `judgeLineArithmetic` (`extract.js:1097`). På det objektet är
`unit_price_ore` `undefined`. `iOre` blir därför **alltid false i produktion**, och
fail-closed-regeln `if (!iOre && apris < 10) continue` gör varje elrad ODÖMBAR.

Den andra konsumenten av samma observation läser rätt namn:
`lib/saas-rad.js:75,94` använder `rad.amountOre` / `rad.unitPriceOre`. Två konsumenter, samma
fråga, två namn — och den i integritetsgrinden läser det namn som inte finns nedströms.

Hela öresfixen från 2026-08-22 (som CLAUDE.md förklarar stängd och som OB-30/31/32 låser) har
alltså **aldrig körts på en enda verklig faktura**.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p10.mjs
```

```js
import { aggregateLineItems, routeExtraction } from './agents/test-invoice/extract.js';
import { judgeLineArithmetic } from './lib/extraction-integrity.js';

// Fortum, exakt som textlagret läser den: "3400  kWh 1,12  3 808,00"
const raRad = {
  description: 'Fortum Fastpris Företag 2026 — April — 3 400 kWh',
  amount: 3808, type: 'recurring_subscription', quantity: 3400, unitPrice: 1,
  unit_price_ore: 112, amount_ore: null, is_addon: false, is_prorata: false,
};
console.log(judgeLineArithmetic({ lineItems: [raRad] }));          // A: det TESTERNA matar
const agg = aggregateLineItems({ supplier:'Fortum Markets AB', date:'2026-05-01',
  description:'Elfaktura april', billingPeriod:'monthly', lineItems:[raRad],
  confidenceScore:0.95, outOfScope:false, outOfScopeReason:null,
  projectedRecurringAmount:3808, invoiceTotal:3808 });
console.log(judgeLineArithmetic(agg));                              // B: det PRODUKTIONEN matar
console.log(routeExtraction(agg).verifications.find(v => v.id === 'balanskrav'));
```

### Faktiskt utfall

```
── A. RÅ modellpayload (det testerna matar) ─────────────────────────
   judged = 1 · balanced = true   <-- OB-30 grön här

── B. AGGREGERAD payload (det PRODUKTIONEN matar) ───────────────────
   aggregerad rad : {"description":"Fortum Fastpris Företag 2026 — April — 3 400 kWh",
                     "amount":3808,"type":"recurring_subscription","quantity":3400,
                     "unitPrice":1,"is_addon":false,"addon_type":null,"is_prorata":false,
                     "amountOre":null,"unitPriceOre":112}
   unit_price_ore på aggregerad rad: undefined
   unitPriceOre   på aggregerad rad: 112
   judged = 0 · balanced = true

── C. Kvittot kunden ser (routeExtraction, produktionsvägen) ────────
   {"id":"balanskrav","status":"ej_provbar","detalj":"inga rader bär både antal och à-pris"}
```

### Konsekvens

1. **Kunden får ett falskt skäl.** Kvittoraden (renderas i `src/pages/TestaFaktura/index.js:193
   `VerificationReceiptBlock`, etiketten "Antal × à-pris per rad") säger *"inga rader bär både
   antal och à-pris"* om en rad som bär **båda** — antal 3400 och à-pris 1,12 kr står i klartext på
   pappret. Det är reservkortets läxa (2026-08-15) ordagrant: en tystnad med påhittad motivering.
2. **Grinden är blind på hela elkategorin** — Nivå 1 i Switch-doktrinen. Körd mot de fyra riktiga
   elfakturorna i `test-pdfs/` (`p9.mjs`) döms **1 rad av 4** på varje faktura: bara den fasta
   abonnemangsavgiften (195–545 kr). De tre rader som bär i stort sett hela beloppet — elhandel,
   nätöverföring, energiskatt — hoppas över, och kvittot säger då *"antal × à-pris ger radbeloppet
   på samtliga 1 prövbara rader"* utan att nämna hur många rader fakturan har.
3. **Mätinstrumentet delar buggen.** `scripts/probe-grindarna.mjs:89` mäter täckning med
   `Number.isFinite(l.unit_price_ore) && Number.isFinite(l.amount_ore)` — på samma aggregerade
   objekt. Den kan alltså **bara** svara "0 av N rader bar öresfält", oavsett verkligheten, och
   gjorde det (`ops/grindarna.txt`: `TÄCKNING: 0 av 0`). Utfallet i CLAUDE.md tolkades som att
   `amount_ore` var null; den verkliga orsaken var namnet. Dessutom kräver sonden **båda** fälten,
   medan grinden sedan OB-30 bara behöver `unit_price_ore` — så täckningen underskattas en gång till.

### Varför sviten är grön

**Varje** anrop av `judgeLineArithmetic` i sviten bygger raden för hand i RÅ form:

```
tests/obduktion.mjs:159,465,475,484,493,506,515,520,550,561,571
tests/balanskrav.mjs:32,38,45,52,58,64,69,70
tests/svea-print.mjs:30
scripts/korpusdiff.mjs:92     (fixturrader — bär inga öresfält alls)
```

Ingen enda bygger raden med `aggregateLineItems`. Det är exakt LFL-harnessets och villkorsvaktens
sjukdom: **mekanismen prövad, matningen aldrig.** Frågan CLAUDE.md redan formulerat —
*"vilket objekt kommer fram till låset i produktion, och vem byggde det?"* — ställdes aldrig här.

---

## FYND 2 · Sub-öresavrundningen: fällan som utlöses i samma sekund FYND 1 lagas

**Fil:** `lib/extraction-integrity.js:201-203` (toleransen), `agents/test-invoice/extract.js:479-482`
(schemat: `unit_price_ore` är `integer`)
**Familj:** enhetsfel
**Allvar:** latent (blir kundsynlig så snart FYND 1 rättas eller `BALANSKRAV_ENFORCE=1` sätts)

### Vad som är fel

`unit_price_ore` är ett **heltalsfält i öre**. Svenska elpriser har en decimal till:
textlagret i `test-pdfs/` ger `kWh 0,198`, `kWh 0,215`, `kWh 0,193`, `kWh 0,187`, `kWh 0,834`,
`kWh 0,891`, `kWh 0,744`, `kWh 0,712`, `kWh 0,428`. 0,198 kr = **19,8 öre** kan inte uttryckas.

Toleransen i öresläget är `Math.max(100, expected * 0.005)` — 0,5 %. Maximalt avrundningsfel är
`antal × 0,5 öre`. De två täcker varandra först när à-priset är **≥ 100 öre (1 kr)**. Under 1 kr per
enhet kan grinden alltså inte döma — men gör det ändå.

Det är samma sjukdom som fixen 2026-08-22 lagade, en decimal längre ned: kronorvägen fick en
fail-closed-spärr (`apris < 10 → odömbar`), öresvägen fick ingen.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p4.mjs      # de verkliga raderna ur textlagret
node /tmp/.../scratchpad/p5.mjs      # svep över hela spotprisbandet 0,30–0,90 kr/kWh
```

### Faktiskt utfall

```
FÄLLD | Fortum nätöverföring 0,198 → 20 öre   förväntat 68000 · faktiskt 67300 · diff 700 · tolerans 340
FÄLLD | Fortum nätöverföring 0,198 → 19 öre   förväntat 64600 · faktiskt 67300 · diff 2700 · tolerans 323
OK    | Fortum energiskatt   0,428 → 43 öre   förväntat 146200 · faktiskt 145500 · diff 700 · tolerans 731
OK    | Fortum elhandel      1,12  → 112 öre  förväntat 380800 · faktiskt 380800 · diff 0 · tolerans 1904
OK    | Tibber nätöverföring 0,211 → 21 öre   förväntat 44100 · faktiskt 44300 · diff 200 · tolerans 221
OK    | Tibber spot          0,834 → 83 öre   förväntat 174300 · faktiskt 175100 · diff 800 · tolerans 872
```

```
Perfekta elhandelsrader prövade: 121 · FÄLLDA av grinden: 60 (50 %)
Exempel på à-priser som fälls: 0.305 → 31 öre · 0.315 → 32 · 0.325 → 33 · 0.335 → 34 · 0.345 → 35 · 0.355 → 36
```

Alltså: **hälften av alla aritmetiskt perfekta svenska spotpris-elrader i bandet 0,30–0,90 kr/kWh
fälls** — enbart av att fältet inte kan bära talet. Kraftringens riktiga faktura (0,744 kr/kWh,
1 200 kWh) är ett av fallen: 1200 × 74 öre = 888,00 mot fakturans 892,80, tolerans 4,44 kr.

Tibbers rad passerar med 72 öres marginal (800 mot 872) och Tibbers nätöverföring med 21 öres
marginal (200 mot 221) — sviten valde just de talen. OB-30/31 deklarerar blindfläcken i klartext
(*"grinden dömer mot ett à-pris som är 0,4 % fel. Toleransen bär det; en kategori med ännu finare
priser skulle inte gå att döma alls"*) men underskattar den: det är inte en hypotetisk annan
kategori, det är **de andra raderna på samma faktura**.

### Konsekvens

Om FYND 1 lagas utan att detta lagas samtidigt går grinden från *tyst* till *skrikande på rätt
beteende* — och nästa grindmätning rapporterar återigen en hög fällandeandel på elfakturor, med
samma felslut som 2026-08-22: "grinden är för känslig, vänta med att armera". Rätt slutsats är
densamma som då: **grinden räknar i fel enhet.**

---

## FYND 3 · `monthsBetween` kan aldrig returnera ett tal — och `?? 1` gör tystnaden till ×12

**Fil:** `lib/extraction-integrity.js:14-25` (funktionen), `:57-69` (kontroll 2), `:104-119` (kontroll 5)
**Familj:** okänt-som-giltigt + enhetsfel
**Allvar:** latent (förgiftar flywheeln och den interna korrektionsvyn, når inte kundens siffror)

### Vad som är fel

Två saker samtidigt:

1. `monthsBetween` splittar på `/[-–]/`. Ett ISO-datumintervall `"2026-05-01 - 2026-05-31"` ger
   **sex** delar, inte två → `null`. Formatet modulens egen `MONTHLY_PERIOD_RE` deklarerar kan
   alltså aldrig parsas.
2. Produktionen skickar inte ens ett datumintervall. `runIntegrityChecks` anropas
   (`api/test-invoice.mjs:577`) på det **aggregerade** objektet, där `billingPeriod` är enumet
   `'monthly' | 'quarterly' | 'annual' | 'one_time' | 'unknown'`.

Resultat: `monthsBetween` returnerar `null` för varje möjlig indata. Kontroll 2 är död kod
(dessutom dubbelt död — `body.pdfRawHeader` skickas av ingen klient; enda förekomsten i repot är
läsningen på rad 576). Kontroll 5 faller på `?? 1`:

```js
const months     = monthsBetween(extracted.billingPeriod) ?? 1;   // alltid 1
const multiplier = months > 0 ? Math.round(12 / months) : 12;     // alltid 12
const expected   = extracted.recurringAmount * multiplier;
```

Ett "jag kunde inte mäta" lånar värdet 1 — som är ett fullt giltigt svar — och blir till ett
påstående om att varje kvartals- och årsfaktura har fel årskostnad.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p7.mjs   # monthsBetween mot alla möjliga indata
node /tmp/.../scratchpad/p1.mjs   # kvartalsfaktura genom produktionskedjan
node /tmp/.../scratchpad/p2.mjs   # årsfaktura
```

### Faktiskt utfall

```
"monthly"                    | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"quarterly"                  | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"annual"                     | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"one_time"                   | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"unknown"                    | split-delar:  1 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: false
"2026-05-01 - 2026-05-31"    | split-delar:  6 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: true
"2026-05-01 – 2026-05-31"    | split-delar:  6 | monthsBetween → null | matchar MONTHLY_PERIOD_RE: true
```

Kvartalsfaktura (Atlassian Jira Premium, 110 platser, period 2026-04-01–2026-06-30, korrekt
`annualCost = 120 000`):

```
billingPeriod: quarterly | källa: dates
recurringAmount: 30000 | annualCost (KORREKT): 120000
overrides: [
  { "field": "annualCost", "original": 120000, "corrected": 360000,
    "reason": "annual_cost_deviates_67pct_from_recurring_x_period", "severity": "info" }
]
```

Årsfaktura (Google Workspace, korrekt `annualCost = 144 000`):

```
{ "field": "annualCost", "original": 144000, "corrected": 1728000,
  "reason": "annual_cost_deviates_92pct_from_recurring_x_period", "severity": "info" }
```

### Konsekvens

`api/test-invoice.mjs:582` skickar varje override till
`saveIntegrityOverrides` → `saveCorrection({ correctedBy: 'system' })` → tabellen
`labeled_corrections`. Den tabellen är enligt sin egen filhuvud *"Fas 1 i flywheel-arkitekturen …
systemet analyserar mönster i korrektionerna och deriverar automatiskt regler"*, och `getPatterns()`
aggregerar precis `field` + `reason`. Alltså: **varje kvartals- och årsfaktura skriver en
system-signerad "korrigering" som påstår att den korrekta årskostnaden är 3× respektive 12× för
låg.** Kundens siffra rörs inte (`Object.assign(extracted, fixed)` skriver bara `recurring`), men
träningsdatan och den interna korrektionsvyn förgiftas systematiskt, och mönsteranalysen ser ett
starkt, falskt mönster.

### Varför sviten är grön

`runIntegrityChecks` har **noll testtäckning** i hela sviten på 1928 tester:

```
$ grep -rn "runIntegrityChecks" tests/
(inget)
```

Endast `judgeProjection` och `judgeLineArithmetic` importeras ur modulen.

---

## FYND 4 · Korsvalideringen jämför ett MÅNADSpris med en PERIODtotal

**Fil:** `lib/extraction-integrity.js:87-102`
**Familj:** enhetsfel
**Allvar:** latent (samma flywheel-förgiftning som FYND 3)

### Vad som är fel

```js
const seats = extracted.seatCount;
const pps   = extracted.pricePerSeatMonthly;      // <- per MÅNAD (extract.js:970-976)
if (seats > 0 && pps > 0 && invoiceAmount > 0) {
  const expected  = seats * pps;                  // <- en månads licenskostnad
  const deviation = Math.abs(expected - invoiceAmount) / invoiceAmount;   // <- mot HELA fakturan
```

`invoiceAmount` är `extracted.amount` = summan av **alla** rader för **hela** perioden. Två fel i ett:
kvartals-/årsfakturor jämförs mot 1/3 respektive 1/12 av sig själva, och varje faktura med rörliga
poster eller engångsavgifter får sitt gap räknat som en avvikelse.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p1.mjs   (kvartal)
node /tmp/.../scratchpad/p2.mjs   (år + mobil med roaming)
```

### Faktiskt utfall

```
kvartal:  {"field":"seatCountCrossCheck","original":"110 × 90.91 = 10000.1","corrected":30000,
           "reason":"seat_x_price_deviates_67pct_from_invoice","severity":"warning"}
år:       {"field":"seatCountCrossCheck","original":"60 × 200 = 12000","corrected":144000,
           "reason":"seat_x_price_deviates_92pct_from_invoice","severity":"warning"}
mobil:    {"field":"seatCountCrossCheck","original":"12 × 299 = 3588","corrected":4488,
           "reason":"seat_x_price_deviates_20pct_from_invoice","severity":"warning"}
```

Mobilfakturan är en helt korrekt Tele2-faktura: 12 × 299 kr abonnemang + 900 kr roaming. Den
enda "avvikelsen" är att roamingen inte är en licenskostnad.

### Konsekvens

Systematiska `severity: 'warning'`-rader i `labeled_corrections` på korrekta fakturor. Samma
mekanism som FYND 3. En kvalitetsvakt vars utfall är brus blir förr eller senare avstängd — precis
som smyghöjningsvakten 2026-07-20.

---

## FYND 5 · Radsummekontrollen jämför summan med sig själv

**Fil:** `lib/extraction-integrity.js:71-85`
**Familj:** vakt-som-inte-kan-fälla
**Allvar:** kosmetisk (Ring 1 i `routeExtraction` gör den riktiga kontrollen)

### Vad som är fel

Kontrollen jämför `lineItems.reduce(...amount)` mot `extracted.amount`. Men `aggregateLineItems`
sätter `amount` till **exakt den summan** (`extract.js:936`). Avvikelsen är alltid 0. Kontrollen
var skriven för fakturans totalbelopp (`invoiceTotal`), som är ett annat fält.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p6.mjs
```
En faktura där 4 000 kr av 5 000 saknas i raderna (`invoiceTotal: 5000`, en rad på 1 000 kr):

### Faktiskt utfall

```
extracted.amount = 1000  invoiceTotal = 5000
overrides: []
→ lineItemsTotal-kontrollen fyrade: false
```

### Konsekvens

Ingen skada — Ring 1 (`routeExtraction`, rad 1038-1091) fångar samma fall korrekt och skickar till
`review_queue`. Men kontrollen ser ut som ett andra lager och räknas som ett skydd vi inte har
(CLAUDE.md: *"två grenar som ser ut som två lager men är ett räknar ett skydd vi inte har"*).

---

## FYND 6 · `seatCount` sätts till antalet kWh på elfakturor — ett antagande skriver över en observation

**Fil:** `agents/test-invoice/extract.js:719-740` (`applyDeterministicRules`)
**Familj:** enhetsfel
**Allvar:** latent

### Vad som är fel

```js
const subLineItems = lineItems.filter(
  (l) => l.type === 'recurring_subscription' && (l.quantity ?? 0) > 0 && !l.is_addon);
...
if (effectiveLines.length > 0) {
  const maxQty = Math.max(...effectiveLines.map((l) => l.quantity));
  if (seatCount == null || maxQty > seatCount) seatCount = maxQty;
}
```

`SYSTEM_PROMPT` (rad 72-74) beordrar uttryckligen att elförbrukningsrader klassas
`recurring_subscription`, och `Antal`-kolumnen på en svensk elfaktura är **kWh**. Schemat säger att
`seatCount` ska vara `null` när fakturan inte avser per-användarlicenser — och modellen svarar
korrekt `null`. Regeln skriver över den observationen med ett antagande.

### Exakt reproduktion

```
node /tmp/.../scratchpad/p3.mjs    # Fortum-formad elfaktura, seatCount: null i indata
node /tmp/.../scratchpad/p9.mjs    # alla fyra riktiga elfakturor ur test-pdfs/
```

### Faktiskt utfall

```
seatCount efter applyDeterministicRules : 3400
pricePerSeatMonthly                     : 1.13
```

```
eon-el-spot-se3.pdf            | seatCount:  8200
kraftringen-el-lokalt.pdf      | seatCount:  1200
vattenfall-el-se4.pdf          | seatCount:  6800
fortum-el-fastpris.pdf         | seatCount:  3400
```

(Antalen är avlästa ur textlagret: `"8200   kWh 0,891"` osv.)

### Konsekvens och gränser — redovisat ärligt

* **Kundytan är skyddad.** El-grenens svar sätter uttryckligen `seatCount: null`
  (`api/test-invoice.mjs:1362`), så `LicenseOverageBlock` ("N av M avtal verkar oanvända") kan inte
  ritas för el. Bra — men skyddet ligger i en yta, inte i talet.
* **Databasen är inte skyddad.** `storeAnalysis({ ..., seatCount: extracted.seatCount ?? null })`
  (`api/test-invoice.mjs:1344`, el-grenen) skriver 3400 till `invoice_analyses.seat_count`.
* **Ring 2 Seat Oracle** (`api/test-invoice.mjs:723`) fyras för varje elfaktura och ber Haiku
  verifiera "antalet licenser/SIM-kort" på en elräkning; varje avvikelse larmar granskningskön.
* **Branschankaret är skyddat av allowlistan** — `el` saknas i `BRANCH_ANCHOR_UNIT`
  (`api/invoice-history.mjs:445-457`), så det seat_count-värdet blir aldrig ett ankare. Det skyddet
  är enhetsallowlistan, inte talet.
* **Smyghöjningsvakten är skyddad** av `categorized.category !== 'el'` (rad 955).

Med andra ord: fyra oberoende ytor råkar tiga om ett tal som är fel i enhet. Det är exakt formen
"vi lagade symtomen på fyra ställen och lämnade orsaken".

### Varför sviten är grön

`tests/fixtures/04-el.mjs` klassar kWh-raderna som `variable_usage` och bär **inget `quantity` alls**
— fixturkorpusen är i ett tillstånd produktionen aldrig är i, tvärtemot vad `SYSTEM_PROMPT` beordrar.

---

## FYND 7 · En kraschad schemavakt bokförs som en grön bock i kundens kvitto

**Fil:** `lib/schema-guard.js:176-179` + `agents/test-invoice/extract.js:1283` + `:1025-1029`
**Familj:** påstående utan täckning
**Allvar:** latent (kraschen är svår att nå från extract:s eget anropsställe)

### Vad som är fel

```js
} catch (err) {
  console.warn('[schemakrav] fail-open — vakten kraschade själv:', err.message);
  return { ok: true, violations: [] };          // <- omöjligt att skilja från "0 brott"
}
```

Fail-open mot pipelinen är rätt. Men extract översätter utfallet till
`schemakrav: { ok: violations.length === 0, brott: violations.length }` och `routeExtraction`
emitterar då `status: 'ok'` med texten **"AI-utfallet följer extraktionsschemat fältvis"** — ett
positivt påstående koden aldrig belagt. Det renderas för kunden som en grön bock i
"Maskinellt kontrollerad · N av M kontroller gröna".

Grannvakterna fick precis den här fixen 2026-08-20: `judgeLineArithmetic` (OB-09) och
`judgeProjection` (OB-15) har båda ett eget kraschtillstånd. `guardToolPayload` är den tredje i
trion — och den enda vars utfall syns för kunden.

`tests/schemakrav.mjs:241-245` **låser in fallbacken som ett krav**:
```js
test('fail-open: vaktens egen krasch fäller aldrig analysen', () => {
  const r = guardToolPayload({ agent: 'test', tool: null, payload: {}, enforce: true });
  assert.equal(r.ok, true);
  assert.deepEqual(r.violations, []);     // <- kraschen får per test inte lämna spår
});
```

### Exakt reproduktion

```
node /tmp/.../scratchpad/p8.mjs
```

### Faktiskt utfall

```
[schemakrav] fail-open — vakten kraschade själv: Cannot read properties of null (reading 'input_schema')
guardToolPayload efter krasch      : {"ok":true,"violations":[]}
schemakrav som bärs till kvittot   : {"ok":true,"brott":0}
kvittorad som visas för kunden     : {"id":"schemakrav","status":"ok","detalj":"AI-utfallet följer extraktionsschemat fältvis"}
```

### Konsekvens

`routeExtraction` har redan rätt svar tillgängligt — `'ej_provbar'` med texten
*"analysen kördes utan schemadom"* (rad 1031). Vakten behöver bara kunna säga att den inte vet.

---

## FYND 8 · `confidenceScore: undefined` → route `auto`, konfidensgrinden hoppas tyst över

**Fil:** `agents/test-invoice/extract.js:1154`
**Familj:** okänt-som-giltigt
**Allvar:** latent

### Vad som är fel

```js
if (extracted.confidenceScore < CONFIDENCE_THRESHOLD) { ... review_queue ... }
```

`undefined < 0.70` är `false`. Ett saknat konfidensvärde tolkas alltså som "tillräckligt säkert".
`confidenceScore` är `required` i schemat, men schemakravet står i **SKUGGA** (`SCHEMAKRAV_ENFORCE`
är inte satt), så ett utfall utan fältet passerar `guardToolPayload` utan att stoppas. Båda lagren
faller alltså åt samma håll.

(`null < 0.70` är däremot `true` → review_queue. Det är bara `undefined` som slipper igenom.)

### Exakt reproduktion + faktiskt utfall

```
node /tmp/.../scratchpad/p8.mjs
```
```
route utan confidenceScore         : auto
route med confidenceScore = 0.20   : review_queue · Confidence 0.20 under tröskel 0.7
```

### Uttalad gräns

Jag kan inte utan API-nyckel bevisa hur ofta modellen utelämnar ett `required`-fält. Fyndet är
därför märkt latent. Det som ÄR bevisat är att grinden inte har någon "vet ej"-gren: den frågar
`< tröskel` i stället för `!(>= tröskel)`, och skillnaden är hela felfamiljen.

---

## FYND 9 · Perioder mellan 130 och 399 dagar blir alla `'annual'` med multiplikator 1

**Fil:** `agents/test-invoice/extract.js:35-45` (`computeBillingPeriodFromDates`)
**Familj:** enhetsfel
**Allvar:** latent

### Vad som är fel

```js
if (days < 50)  return 'monthly';
if (days < 130) return 'quarterly';
if (days < 400) return 'annual';
```

Bandet 130–399 dagar rymmer halvårs-, åttamånaders- och niomånadersperioder. Alla får
`PERIOD_MULTIPLIER.annual = 1`. En halvårsfaktura får därmed **halva** sin årskostnad — och
`billingPeriodSource` sätts till `'dates'`, den källa vi litar mest på, medan
`billingPeriodAssumed` förblir `false`, så kundytan visar ingen brasklapp.

### Exakt reproduktion + faktiskt utfall

```
node /tmp/.../scratchpad/p11.mjs
```
```
[billing-period] date override: AI="unknown" → dates="annual" (2026-01-01 – 2026-07-01)
   billingPeriod = annual (källa dates) · annualCost = 12000 · SANN årskostnad = 24000
   route: auto
```

### Konsekvens

Underskattad årskostnad → underskattad överbetalning. Riktningen är den säkra för oss (vi lovar
mindre än vi kan hålla), men talet är fel och bär ingen märkning. Ingen halvårsfaktura finns i
`test-pdfs/`, så jag kan inte visa att den frekvensen är hög — därför latent.

---

## Kontrollerat utan fynd

Följande prövades med fientliga indata och **höll**:

* **`judgeProjection` mot giftiga anrop.** `null`, `undefined`, `{}`, `'sträng'`, `0` → alla
  `{ok:true, deviationPct:0}` utan att kasta. Destruktureringen bor korrekt inne i `try` (OB-15).
  `NaN` som projektion når aldrig funktionen: `extract.js:884` grindar på
  `typeof … === 'number' && … > 0`, och `NaN > 0` är falskt.
* **Kraschgrenen i `judgeLineArithmetic`** (`balanced:false` + bokfört skäl, OB-09) är korrekt
  skriven. Jag hittade ingen indata som når den i produktion: `aggregateLineItems` har redan rört
  varje rad innan `routeExtraction` anropas, så en `null`-rad eller en icke-array skulle ha fällt
  extraktionen tidigare. *Anmärkning:* om den ändå nåddes skulle anroparen (`extract.js:1098`)
  testa `b2.judged === 0` **före** `b2.balanced` och därmed emittera `'ej_provbar'` med det falska
  skälet *"inga rader bär både antal och à-pris"* — kraschens bokföring kastas. Jag rapporterar det
  inte som ett eget fynd eftersom jag inte kan visa en väg dit; men samma rad är kärnan i FYND 1.
* **Momsgrinden i Ring 1.** Verifierat att den avlästa satsen SKÄRPER och aldrig vidgar:
  `momssats: 0.25` → `ok` med "25 % enligt fakturan"; `momssats: 0` (reverse charge) → `varning`
  med motsägelsen bokförd, inte bortförklarad; `momssats: null` → tre-satsprovningen. `>= 0` är
  lastbärande precis som kommentaren säger.
* **`momsbas` / `momssats` defaultar aldrig.** `extract.js:992-993` — bara `'exkl'`/`'inkl'`
  respektive `typeof === 'number'` släpps igenom, allt annat blir `null`.
* **`invoiceNumber`** accepteras bara som trimmad icke-tom sträng (`extract.js:915-916`); tomma
  strängar och icke-strängar blir `null`.
* **`matchesType`s `default: return false`** i `lib/schema-guard.js:44` är rätt riktning — en okänd
  typdeklaration godkänner inte längre allt.
* **`judgeSchema`** hanterar union-typer, `enum` med `null`-medlem, `required` mot `undefined`
  (inte mot `null`), `minimum`/`maximum` bara på finita tal, och okända fält flaggas. `lintToolSchema`
  ger 0 problem för `EXTRACT_TOOL` (låst av `tests/schemakrav.mjs:85`).
* **Krediteringar** (negativt radbelopp) prövas på beloppets storlek, inte dess tecken (OB-26/27) —
  verifierat korrekt.
* **`billingPeriodAssumed`** är inte ett löfte utan mekanik: det renderas faktiskt i kundytan
  (`src/pages/TestaFaktura/index.js:1523`, "· antaget månadsvis (fakturan saknar period)").
* **Felbokföringen i `extractInvoice`s retry-loop** (rad 1235-1259) klassificerar via
  `lib/motorhalsa.js` och loggar feltyp/status/modell utan att läcka nyckel eller fakturainnehåll —
  bokföringsplikten uppfylld.
* **`applyDeterministicRules` SIM-regeln** (rad 772-785) skyddar korrekt mobilfakturor med molnväxel
  mot att PBX-licenser blåser upp `seatCount`.
* **Ring 1-toleransen** `max(50, 3 % av total)` och den efterföljande `review_queue`-returen fungerar
  som avsett (verifierat i `p6.mjs`: 1 000 kr rader mot 5 000 kr total → stopp).

---

## Sammanfattande observation

Åtta av nio fynd har samma form som obduktionens tjugotvå: **ett tillstånd som betyder "jag mätte
inte" återgivet med ett värde som är omöjligt att skilja från ett giltigt svar** —
`unit_price_ore → undefined → iOre = false` (FYND 1), `monthsBetween → null → ?? 1` (FYND 3),
`catch → {ok:true, violations:[]}` (FYND 7), `undefined < 0.70 → false` (FYND 8).

Det som gör FYND 1 tyngst är inte skadan utan **vad som gjorde det osynligt**: nitton tester låser
`judgeLineArithmetic` med rader som ingen produktionsväg bygger, och den enda sonden som matar det
riktiga objektet läser samma icke-existerande fält och kan därför bara svara noll. Instrumentet
delar systemets bugg — nionde gången under obduktionen. Frågan som hade fångat det är den CLAUDE.md
redan formulerat: *vilket objekt kommer fram till grinden i produktion, och vem byggde det?*
