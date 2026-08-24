# Spaning: `api/test-invoice.mjs` — orkestreringen (1 990 rader)

Datum: 2026-08-24 · Område: **test-invoice-api** · Ingen produktionskod ändrad.

---

## 0. Metod — och varför den var nödvändig

**Ingen enda av sviten 1 928 tester kör den här filen.** Varje test som nämner
`api/test-invoice.mjs` läser den som TEXT:

```
$ grep -rn "api/test-invoice" tests/*.mjs | head
tests/fakturanummer.mjs:106:    const api = las('api/test-invoice.mjs');
tests/jamforelsekalla.mjs:198:  const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/lfl-produktionsvag.mjs:102:    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/triage-bokforing.mjs:28:const KALLA = readFileSync(join(ROOT, 'api/test-invoice.mjs'), 'utf8');
...
$ grep -rn "from '../api/test-invoice.mjs'\|import(.*api/test-invoice" tests/ scripts/
(inget)
```

`npm run test:algo` → `# tests 1928 · # pass 1928 · # fail 0`.

Det är samma sjukdom bibeln redan namngett fyra gånger (villkorsvakten, LFL-harnesset,
ankaret, obduktionen): **sviten prövar KÄLLTEXTEN i den största orkestreringsfilen, aldrig
dess BETEENDE.** Ett reguljärt uttryck kan se att `storeTriaged` står skrivet — aldrig att
det som kommer ut ur handlern går ihop.

Därför byggdes ett harness som kör den **riktiga handlern** med Node 22:s
`--experimental-test-module-mocks`. Endast modellanropen och KV/DB stubbas; all
orkestreringslogik, `routeExtraction`, `computeInvoiceMetrics`, `computeSecondarySaving`,
`runIntegrityChecks`, finansgrindarna, `calculationChain` och svarsserialiseringen är
produktionens egna. I ett av testerna (F3) körs dessutom **den riktiga `recommend()`** via
dess injicerbara klient (`recommend(input, { client })`, recommend.js rad 1356), så även
den deterministiska finansöverskrivningen är äkta.

Källkoden till harnesset och varje repro finns i appendix A–B och kan klistras in var som
helst; sökvägarna nedan pekar på den katalog de kördes i.

---

## Fynd

| # | Titel | Fil:rad | Familj | Allvar |
|---|---|---|---|---|
| F1 | Kombifakturans föreslagna pris finns i tre versioner — skärm, beräkningsunderlag och liggare säger olika | api/test-invoice.mjs:1786 / 1900 / 1638 | två-sanningar | kundsynlig |
| F2 | Sekundär-överskrivningen tappar mobiltillägget → svaret räknar inte hem | api/test-invoice.mjs:1540 | enhetsfel | kundsynlig |
| F3 | Bredbandstillägget på en mobilfaktura räknas som besparing kunden aldrig kan realisera | api/test-invoice.mjs:1707 | påstående-utan-täckning | kundsynlig |
| F4 | `invoiceTotal` konverteras inte → varje USD/EUR-faktura med totalsumma dumpas i review_queue med ett påhittat skäl | api/test-invoice.mjs:615–660 | enhetsfel | kundsynlig |
| F5 | `gate_emails` skrivs aldrig → prisalarmens routing kan bara svara "0 berörda kunder" | api/test-invoice.mjs:147 | tyst-tapp | kundsynlig |
| F6 | Avtalslåset räknas från periodens START → "ni är låsta" med 39 dagar kvar att säga upp | api/test-invoice.mjs:1014–1030 | två-sanningar | kundsynlig |
| F7 | Balanskravets öresväg läser fältnamn produktionen inte har | lib/extraction-integrity.js:178 | vakt-som-inte-faller | kundsynlig |
| F8 | `recommendationType: 'no_action'` bredvid `shouldSwitch: true` | api/test-invoice.mjs:1891 | två-sanningar | latent |
| F9 | `monthsBetween()` får en enum, aldrig ett datumintervall → falska system-"korrigeringar" på varje icke-månadsfaktura | lib/extraction-integrity.js:106 | mätfel | mätfel |
| F10 | `requiresVolumeData`-grenens USD-block kan aldrig köras | api/test-invoice.mjs:1097 | tyst-tapp | latent |
| F11 | Hårdkodad ×0,80 i el-fastprisnoten — sista kopian av arvodesmatten | api/test-invoice.mjs:1260 | två-sanningar | kosmetisk |
| F12 | `scripts/full-pipeline-test.mjs` påstår sig spegla API:t men saknar sekundär-överskrivningen | scripts/full-pipeline-test.mjs:295–340 | mätfel | mätfel |

---

### F1 · Kombifakturans föreslagna pris finns i TRE versioner i samma svar

**Fil:** `api/test-invoice.mjs:1786–1794` (`calculationChain.benchmarkAnnualCost`) mot
`:1900` (`suggestedAnnualCost: _responseSuggested`) mot `:1633–1638` (`storeAnalysis`).
**Familj:** två-sanningar (regel 1).

**Vad som händer.** På en kombinerad faktura (mobil + bredband, `potentialMixedCategories`)
komponerar API:t kundens föreslagna pris på rad 1716:

```js
const _responseSuggested = secondarySaving
  ? (recommendation.suggestedAnnualCost ?? 0) + secondarySaving.suggestedAnnual + _bbAddonPassthrough
  : (recommendation.suggestedAnnualCost ?? null);
```

`autoResponse.recommendation.suggestedAnnualCost` bär `_responseSuggested` — det är talet
switch-kortet visar (`src/pages/TestaFaktura/index.js:2661`, `:1927`). Men
`calculationChain.benchmarkAnnualCost.value` (rad 1787) läser `recommendation.suggestedAnnualCost`
— **primärkomponentens tal, före kompositionen** — och `storeAnalysis` (rad 1638) lagrar
samma pre-kompositionstal i `suggested_annual_cost` (`lib/invoice-store.js:106`).

Kedjan är den yta som uttryckligen lovar att kunden kan räkna efter:
*"Kunden kan verifiera varje steg. Bygger förtroende och möjliggör extern revision."*
(rad 1727–1728) och renderas under knappen **"Visa hur vi räknar ▼"**
(`src/pages/TestaFaktura/index.js:223–247`).

**Konsekvens.** Kunden ser tre olika svar på samma fråga:
kortet 33 596 kr/år, beräkningsunderlaget 28 928 kr/år, liggaren 28 928 kr/år. Och
underlagets tre rader går inte ihop: 45 456 − 28 928 = 16 528 ≠ 11 860. Det lagrade talet
är dessutom det `lib/briefing-generator.js:63–64,130,138–140` bygger månadsbriefingen på
(*"Marknadsnivå: X kr/år — ni betalar Y kr/år"*, "kr/år i överbetalning") och det
`src/lib/holdings.js:156` räknar rummets överbetalningsprocent ur — så webb, kvitto, rum
och mail säger olika om samma faktura (regel 5).

**Reproduktion (kört):**

```
cd <scratchpad>
node --experimental-test-module-mocks t4-kedjan.mjs
```

**Faktiskt utfall:**

```
annualCost                     45456
SVARETS suggestedAnnualCost    33596   (switch-kortet: "45 456 → X kr/år")
KEDJANS benchmarkAnnualCost    28928   ("Arvo-pris" i Beräkningsunderlag)
grossSaving                    11860
kedjan räknar hem?             16528 ===  11860 ? false
kortet räknar hem?             11860 ===  11860 ? true
```

Indata är en riktig Tele2-kombifaktura ur `tests/fixtures/03-combined.mjs` (comb-01) och
`recommend`-svaret är byggt med recommend.js egen formel (`suggestedAnnualCost =
_benchBase + addonAnnual`, recommend.js:1791).

---

### F2 · Sekundär-överskrivningen tappar mobiltillägget — svaret räknar inte hem

**Fil:** `api/test-invoice.mjs:1537–1542`.
**Familj:** enhetsfel (talet är per fel population av rader).

```js
if (!recommendation.shouldSwitch && (secondarySaving?.grossSaving ?? 0) > 0) {
  recommendation.shouldSwitch        = true;
  recommendation.savingPerYear       = 0;
  recommendation.suggestedAnnualCost = Math.round((metrics.primaryComponentMonthly ?? 0) * 12);
```

`primaryComponentMonthly` är **basraderna utan tillägg** (`lib/invoice-metrics.js:110–118`).
recommend.js:s egen formel för samma fält är `_benchBase + addonAnnual`, alltså med
mobiltilläggen (molnväxel/PBX) **pass-through** — uttryckligen motiverat i recommend.js:1609–1612:
*"the benchmark covers the base product only … pass it through to suggestedAnnualCost so we
never claim savings on components the benchmark doesn't price."* Överskrivningen på rad 1540
saknar den pass-throughen.

**Konsekvens.** Kunden ser *"45 456 → 25 608 kr/år · Ni sparar 7 920 kr/år"*. Miniräknaren
säger 19 848. Differensen är exakt molnväxeln, 994 × 12 = 11 928 kr/år — en kostnad kunden
behåller. Det föreslagna priset är alltså 11 928 kr för lågt, och tre tal bredvid varandra
i samma kort motsäger varandra (regel 3: *ska gå att räkna hem med miniräknare*).

**Reproduktion (kört):**

```
cd <scratchpad>
node --experimental-test-module-mocks t2-secondary.mjs
```

**Faktiskt utfall:**

```
[secondary-override] shouldSwitch=true via sekundär besparing 7920 kr/år (bredband)
annualCost            45456
shouldSwitch          true
recommendationType    no_action
suggestedAnnualCost   25608
grossSaving           7920
netSaving             6336
secondarySaving       {"category":"bredband","speedMbit":500,"currentAnnual":10788,"suggestedAnnual":2868,"grossSaving":7920,"netSaving":6336}
miniräknare: annualCost - suggested = 19848  (påstådd grossSaving 7920 )
calculationChain      {... "benchmarkAnnualCost":{"value":20940 ...},"grossSaving":{"value":7920} ...}
```

19 848 − 7 920 = 11 928 = 994 kr/mån × 12 (molnväxelraden).

---

### F3 · Bredbandstillägget på en mobilfaktura räknas som besparing

**Fil:** `api/test-invoice.mjs:1707–1718` (`_bbAddonPassthrough` beräknas men används bara i
kombigrenen) tillsammans med `agents/recommender/recommend.js:1612–1621`.
**Familj:** påstående-utan-täckning (en besparing som inte kan realiseras).

recommend.js exkluderar tillägg ur besparingsbasen och lägger tillbaka dem i det föreslagna
priset — men bara **matchande** tillägg:

```js
const mobileAddonAnnual    = (category === 'mobil'    && mobileAddonMonthly    > 0) ? …*12 : 0;
const broadbandAddonAnnual = (category === 'bredband' && broadbandAddonMonthly > 0) ? …*12 : 0;
```

En MOBILfaktura med ett BREDBANDS-tillägg (statisk IP, brandvägg, extra SLA) får alltså
`addonAnnual = 0`, och tilläggskostnaden hamnar i `comparableAnnualCost` → i besparingen.
API:t räknar visserligen fram `_bbAddonPassthrough` (rad 1707) — men använder det bara när
`secondarySaving` finns (rad 1716–1718). På en icke-kombinerad faktura kastas det.
Spegelfallet (bredbandsfaktura med molnväxelrad) läcker likadant.

**Konsekvens.** Vi lovar ett pris som inte täcker den statiska IP:n kunden fortsätter betala,
och tar 20 % av en bruttobesparing som är för hög med hela tilläggsbeloppet. Under success
fee på *realiserad* besparing är det den farliga riktningen (bibeln, smyghöjningsavsnittet).

**Reproduktion (kört — här kör den RIKTIGA `recommend()`, bara modellanropet är stubbat):**

```
cd <scratchpad>
node --experimental-test-module-mocks t10-bbaddon.mjs
```

**Faktiskt utfall:**

```
annualCost (inkl. statisk IP 1 800/år): 36600
recommend.js suggestedAnnualCost      : 32280
recommend.js savingPerYear            : 4320
SVARETS suggestedAnnualCost           : 32280
SVARETS grossSaving                   : 4320
nonPrimaryAnnual                      : 0
annualCost - suggested = 4320
```

32 280 = mobilbenchmarkens p25 3 228 kr × 10 platser — enbart SIM-korten. De 1 800 kr/år för
statisk IP finns i nuläget men inte i förslaget, och ingår ändå i besparingen 4 320.
Verklig realiserbar besparing: 2 520 kr/år.

---

### F4 · `invoiceTotal` konverteras inte vid valutaväxling — varje USD/EUR-faktura med totalsumma dumpas med ett påhittat skäl

**Fil:** `api/test-invoice.mjs:615–635` (EUR) och `:636–661` (USD).
**Familj:** enhetsfel + påstående-utan-täckning.

Båda blocken konverterar `amount`, `recurringAmount`, `variableCharges`, `oneTimeFees`,
`annualCost`, `pricePerSeatMonthly` och `lineItems[].amount` — men **inte `invoiceTotal`**
(fältet förekommer inte en enda gång i `api/`: `grep -rn "invoiceTotal" api/ lib/` ger noll
träffar). `routeExtraction` körs efteråt (rad 749) och Ring 1 jämför då **konverterade
radbelopp i SEK mot en okonverterad totalsumma i USD/EUR** (`agents/test-invoice/extract.js:1040–1042`).

Övriga fält som lämnas kvar i originalvaluta: `amountOre` / `unitPriceOre` (och i EUR-grenen
även `unitPrice` — USD-grenen konverterar det, EUR-grenen inte).

**Konsekvens.** En helt korrekt USD-faktura där raderna summerar exakt till totalsumman
routas till `review_queue` med skälet *"Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr"* —
ett aritmetiskt påstående om kundens faktura som vår egen konvertering tillverkade. Kunden
får inget svar, teamet får ett internt larm om ett fel som inte finns, och `storeTriaged`
bokför skälet. Vägen är avsedd att vara nåbar: hela USD-grenen finns till för
*"Salesforce, HubSpot, övriga SaaS i USD"* (kommentaren på rad 637).

**Reproduktion (kört):**

```
cd <scratchpad>
node --experimental-test-module-mocks t6-valutatotal.mjs
```
Samma faktura tre gånger; radsumma = fakturatotal i fakturans egen valuta.

**Faktiskt utfall:**

```
### SEK: route=auto  reason=—
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback
### USD: route=review_queue  reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr)
[test-invoice] EUR→SEK konvertering: rate=11.47 source=fallback
### EUR: route=review_queue  reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)
```

**Sidoobservation, samma rot:** `scripts/stress-test.mjs:799` har låst in beteendet som ett
KRAV — `route: 'review_queue', // Ring 1 correctly catches USD/SEK mismatch`. Just den
fixturen (`microsoft-direkt-usd.pdf`) har verkligen rader i USD och total i SEK, så där är
utfallet rätt av rätt skäl — men kommentaren gör det svårt att se att samma utfall också
uppstår för fakturor där ingenting är fel. (Familj D ur uppdraget: ett testfall som låser in
en fallback som ett krav.)

---

### F5 · `gate_emails` skrivs aldrig — prisalarmens routing kan bara svara "0 berörda kunder"

**Fil:** `api/test-invoice.mjs:147–168` (`storeGateEmail`, definierad men aldrig anropad).
**Familj:** tyst-tapp / löfte-utan-mekanik (regel 9).

```
$ grep -rn "storeGateEmail" . | grep -v node_modules
./api/test-invoice.mjs:147:async function storeGateEmail(email, fingerprint) {
./api/test-invoice.mjs:166:    console.error('[gate] storeGateEmail error:', err.message);
```

Det är det ENDA `INSERT INTO gate_emails` som finns i kodbasen
(`grep -rn "gate_emails"` ger fyra träffar: två i den döda funktionen, en kommentar i
`scripts/notify-price-changes.mjs`, och läsningen i `lib/price-alert-store.js:30`).

`getAffectedCustomers` (`lib/price-alert-store.js:29–32`) börjar med
`SELECT email, fingerprint FROM gate_emails …` och `if (!emailRows.length) return [];`.
Nattens prisvakt → `api/cron/run-price-alerts.mjs:96–100` → tom lista →
`markAlertSent({ emailsSent: 0 })` och vidare till nästa leverantör.

**Konsekvens.** Kärnlöftet *"Telia höjde priset för X av Y i er bransch"* kan aldrig nå en
kund. Och det ser exakt ut som framgång: cron-jobbet rapporterar "0 berörda kunder", vilket
är omöjligt att skilja från "ingen kund använder den leverantören" — precis den felform
uppdragets lins beskriver. `markAlertSent` gör dessutom tystnaden permanent för den
monitorkörningen (`hasAlertBeenSent` hoppar över den nästa gång).

**Reproduktion (kört).** En fullständig, lyckad analys med både `fingerprint` och `email` i
requesten — exakt vad `src/pages/TestaFaktura/index.js:672–681` skickar — med en DB som
loggar varje SQL-sats:

```
cd <scratchpad>
node --experimental-test-module-mocks t9-gateemail.mjs
```

**Faktiskt utfall:**

```
route: auto · netSaving: 61440

SQL-satser pipelinen körde ( 6 st):
  · INSERT INTO labeled_corrections (analysis_id, field, original_value, corrected_value, reason, corrected_by, se
  · SELECT annual_cost, seat_count, created_at FROM invoice_analyses WHERE fingerprint = ? AND category = ? AND no
  · INSERT INTO invoice_analyses ( fingerprint, pdf_hash, supplier, normalized_supplier, category, annual_cost, su
  · SELECT price_monthly, product, tier, source_type, last_verified FROM supplier_prices WHERE LOWER(supplier) = L
  · WITH per_customer AS ( SELECT DISTINCT ON (COALESCE(NULLIF(user_email, ''), fingerprint)) COALESCE(NULLIF(user
  · INSERT INTO graph_suppliers (name, normalized_name, category) VALUES (?, ?, ?) ON CONFLICT (normalized_name) D

Någon sats som rör gate_emails? -> false
```

---

### F6 · Avtalslåset räknas från periodens START — "ni är låsta" med 39 dagar kvar att säga upp

**Fil:** `api/test-invoice.mjs:1014–1030`.
**Familj:** två-sanningar (mot `lib/contract-clock.js`, som är den deklarerade EN källan för
kontraktsklockan).

```js
const _lockDeadline = (() => {
  if (!extracted.servicePeriodStart || extracted.cancellationNoticeDays == null) return null;
  const d = new Date(extracted.servicePeriodStart);
  d.setDate(d.getDate() - extracted.cancellationNoticeDays);   // START − uppsägningstid
  return d;
})();
const _isPastLockDeadline = _lockDeadline ? _today > _lockDeadline : …
```

`lib/contract-clock.js:50` räknar samma sak rätt: `actBy = end − notice` ("Sista dagen att
säga upp innan tyst förnyelse = bindningsslut − uppsägningstid"). API:t räknar
`start − notice` — ett datum som per definition redan passerat så snart fakturan för
perioden är utställd. Kommentaren ovanför talar om ett "lock-window" som koden inte har:
villkoret reduceras i praktiken till *"finns ett framtida `servicePeriodEnd` → låst"*.
(Är `servicePeriodStart` null blir grenen `cancellationNoticeDays != null && _hasActivePeriod
? true` — samma utfall utan någon datumjämförelse alls.)

**Konsekvens.** Fakturan routas till `monitoring`, hela rekommendationen tystas, och svaret
säger `contractLocked: true` — samtidigt som svarets EGEN `contractClock` säger att kunden
har 39 dagar kvar att agera. Det är precis det tillfälle produkten finns för
(Maktkalendern), och vi använder det till att säga "ni är låsta".

**Reproduktion (kört).** Årsfaktura 2026-01-01 → 2026-12-31, 90 dagars uppsägningstid,
dagens datum 2026-08-24:

```
cd <scratchpad>
node --experimental-test-module-mocks t8-lock.mjs
```

**Faktiskt utfall:**

```
idag                  2026-08-24
route                 monitoring
contractLocked        true
monitoringDate        2026-10-01
contractClock.title   Ni är bundna till 31 december 2026
contractClock.actBy   2026-10-02 · dagar kvar att agera: 39
rekommendation i svaret: — (ingen)
```

---

### F7 · Balanskravets öresväg läser fältnamn produktionen inte har

**Fil:** `lib/extraction-integrity.js:178–179` mot `agents/test-invoice/extract.js:933–934`.
Nås ur mitt område via `routeExtraction` (api/test-invoice.mjs:749).
**Familj:** vakt-som-inte-faller + påstående-utan-täckning.

Fixen från 2026-08-22 ("ÖRE FÖRE KRONOR") läser:

```js
const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore : …
```

Men aggregeringen i `extract.js` — den enda producent produktionen har — skriver
**camelCase**:

```js
amountOre:   Number.isInteger(li.amount_ore)     ? li.amount_ore     : null,
unitPriceOre: Number.isInteger(li.unit_price_ore) ? li.unit_price_ore : null,
```

Alltså är `iOre` alltid falskt i produktionsvägen, och den nya fail-closed-regeln
(`if (!iOre && apris < 10) continue;`) gör i stället **varje rad med à-pris under 10 kr
ODÖMBAR** — exakt de elrader (0,80–1,90 kr/kWh) och klickrader (0,065–0,275 kr/klick) fixen
byggdes för. Samma nyckelfel finns i täckningsmätaren `scripts/probe-grindarna.mjs:88`
(`l.unit_price_ore` på `ex.lineItems`) och i `scripts/probe-grindmatning.mjs`, som läser
`line_items_json` — kolumnen som `lib/invoice-store.js:169` fyller med `extracted.lineItems`,
alltså camelCase. Mätinstrumenten kan alltså inte se att fixen aldrig fyrar.

**Konsekvens.** Verifikationskvittot i kundytan säger
*"balanskrav · ej_provbar · inga rader bär både antal och à-pris"* om en faktura vars rad bär
både antal, à-pris och belopp — under en fot som lovar
*"Varje kontroll ovan kördes deterministiskt på just den här fakturan"*
(`src/pages/TestaFaktura/index.js:217`). Och grinden som ska armeras
(`BALANSKRAV_ENFORCE=1`) skulle armeras blind.

**Reproduktion (kört), 1 — samma rad i produktionens och testernas form:**

```
node --input-type=module -e "
import { judgeLineArithmetic } from './lib/extraction-integrity.js';
const raPRODUKTION = { description:'Elförbrukning kWh', type:'x', quantity:3400, unitPrice:1, amount:3808, amountOre:380800, unitPriceOre:112 };
const raTEST       = { description:'Elförbrukning kWh', type:'x', quantity:3400, unitPrice:1, amount:3808, amount_ore:380800, unit_price_ore:112 };
console.log(JSON.stringify(judgeLineArithmetic({ lineItems:[raPRODUKTION] })));
console.log(JSON.stringify(judgeLineArithmetic({ lineItems:[raTEST] })));
"
```

**Faktiskt utfall:**

```
PRODUKTIONENS radform (camelCase, ur extract.js rad 933-934):
   {"balanced":true,"judged":0,"violations":[]}
TESTERNAS radform (snake_case, som lib/extraction-integrity.js läser):
   {"balanced":true,"judged":1,"violations":[]}
```

**Reproduktion 2 — kundens kvitto genom hela handlern:**

```
cd <scratchpad>
node --experimental-test-module-mocks t7-balanskrav.mjs
```

```
route: auto
 schemakrav   ej_provbar  analysen kördes utan schemadom
 radsumma     ok          radsumman stämmer mot fakturatotalen (960 kr)
 balanskrav   ej_provbar  inga rader bär både antal och à-pris
```

(Radens data: `quantity: 12000`, `unitPriceOre: 8`, `amount: 960`.)

---

### F8 · `recommendationType: 'no_action'` bredvid `shouldSwitch: true`

**Fil:** `api/test-invoice.mjs:1891–1893` (invarianten) och `:1537–1542` (källan).
**Familj:** två-sanningar. **Allvar: latent** — ingen kundyta läser `'no_action'` i dag.

Invarianten som skrevs 2026-08-21 vaktar en riktning:

```js
recommendationType: (recommendation.recommendationType === 'switch' && recommendation.shouldSwitch !== true)
  ? 'no_action'
  : (recommendation.recommendationType ?? …),
```

Den motsatta riktningen är oskyddad: sekundär-överskrivningen sätter `shouldSwitch = true`
men rör aldrig `recommendationType`. Se utfallet i F2:s körning —
`shouldSwitch true` + `grossSaving 7920` + `recommendationType no_action`. Fältet lagras och
läses av sonder, mail (`api/send-confirmation.mjs:81,292`) och framtida ytor; i dag testar
konsumenterna bara `=== 'optimize'`, så ingen lögn syns. Det är samma "fält som kan motsäga
sitt eget beslut" bibeln redan bokfört en gång — spegelvänt.

**Reproduktion:** samma som F2 (`t2-secondary.mjs`), rad `recommendationType    no_action`.

---

### F9 · `monthsBetween()` får en enum, aldrig ett datumintervall

**Fil:** `lib/extraction-integrity.js:14–25` och `:105–117`; overridarna appliceras/sparas i
`api/test-invoice.mjs:577–585`.
**Familj:** mätfel.

`monthsBetween` parsar en sträng som `"2026-01-01 – 2026-12-31"`. Den anropas med
`extracted.billingPeriod`, som i den aggregerade extraktionen är en **enum**
(`'monthly' | 'quarterly' | 'annual' | 'one_time' | 'unknown'`). Den kan alltså bara returnera
`null` → `months = null ?? 1` → `multiplier = 12`. Kontroll 5 antar därmed alltid månad, och
kontroll 2 (`months === 1`) kan aldrig bli sann.

**Konsekvens.** Varje korrekt extraherad ÅRS- eller KVARTALSfaktura genererar en falsk
system-"korrigering" som påstår att årskostnaden är 12× för låg. Talet appliceras aldrig
(rad 111–117 skriver inte till `result`), men raden sparas via `saveIntegrityOverrides` →
`labeled_corrections` med `corrected_by: 'system'` — den tabell bibeln kallar
"few-shot flywheel" och som admin-mönsteranalysen läser. En kvalitetssignal som är falsk med
matematisk säkerhet på en hel fakturaklass.

**Reproduktion (kört):**

```
node --input-type=module -e "
import { runIntegrityChecks } from './lib/extraction-integrity.js';
for (const bp of ['monthly','quarterly','annual']) {
  const ex = { billingPeriod: bp, recurring: true, recurringAmount: 45000,
    annualCost: bp==='monthly'?540000:bp==='quarterly'?180000:45000, amount: 45000,
    lineItems: [{type:'recurring_subscription',description:'Abonnemang',amount:45000}] };
  const { result, overrides } = runIntegrityChecks(ex, '');
  const o = overrides.find(x=>x.field==='annualCost');
  console.log(bp, '| override:', o ? o.original+' -> '+o.corrected+' ('+o.reason+')' : 'ingen',
    '| result.annualCost:', result.annualCost);
}"
```

**Faktiskt utfall:**

```
monthly    annualCost in: 540000  | override: ingen | result.annualCost efter: 540000
quarterly  annualCost in: 180000  | override: 180000 -> 540000 (annual_cost_deviates_67pct_from_recurring_x_period) | result.annualCost efter: 180000
annual     annualCost in: 45000   | override: 45000 -> 540000 (annual_cost_deviates_92pct_from_recurring_x_period) | result.annualCost efter: 45000
```

Samma rad syns i F6:s körning: `[integrity] overrides: [{"field":"annualCost","original":45000,"corrected":540000,…}]`.

---

### F10 · `requiresVolumeData`-grenens USD-block kan aldrig köras

**Fil:** `api/test-invoice.mjs:1097–1112`.
**Familj:** tyst-tapp. **Allvar: latent.**

Blocket är villkorat på `extracted.currency === 'USD'` — men USD-grenen på rad 636 har redan
satt `extracted.currency = 'SEK'` (rad 648), och rad 662 returnerar för allt annat som inte
är SEK. Vid rad 1097 är valutan alltid 'SEK' eller null. Följden är att den avsedda
kreditbaserade årskostnaden (`annualCost = creditBurn × 12 × kurs`, rad 1104–1106) aldrig
appliceras, och kommentaren *"requiresVolumeData-routen når aldrig recommend.js som normalt
hanterar detta"* beskriver ett tillstånd som inte längre finns.

**Konsekvens.** En AWS/molnfaktura med startup-krediter visar
*"Ni betalar idag 150 048 kr/år"* (`src/pages/TestaFaktura/index.js:2067–2071` renderas för
review_queue-rutter) i stället för det burn-baserade talet koden avser. Ingen falsk
besparing, men ett tal som inte är det koden tror att den visar.

**Reproduktion (kört):**

```
cd <scratchpad>
node --experimental-test-module-mocks t5-usd-volume.mjs
```

**Faktiskt utfall:**

```
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback      ← blocket på rad 636
route   review_queue volume_data_required
annualCost i svaret         150048
  (creditBurn×12×kurs vore  625200 med fallbackkursen)
startupCreditBalance        50000 USD
creditUnusedAmount          28735
creditExpiryMonths          4
```

Loggraden `[test-invoice] USD→SEK (requiresVolumeData)` uteblir — blocket kördes inte.

---

### F11 · Hårdkodad ×0,80 i el-fastprisnoten

**Fil:** `api/test-invoice.mjs:1260`.
**Familj:** två-sanningar (regel 1). **Allvar: kosmetisk** — talet är rätt i dag.

```
$ grep -rn "\* 0\.80\b" api/ lib/ agents/
api/test-invoice.mjs:1260: … Potentiell nettobesparing när avtalet löper ut: ${Math.round(potentialSaving * 0.80).toLocaleString('sv-SE')} kr/år.
```

Det är den enda kvarvarande kopian av arvodesmatten i backend. `lib/fee.js` säger i sin egen
docstring: *"Innan denna modul bodde talet hårdkodat på åtta backend-platser … Nu: alla
kronor härleds HÄR."* Centraliseringen missade den här — i en **kundsynlig mening**. För
heltalsbelopp ger `Math.round(g*0.8)` och `netOf(g)` samma svar; de skiljer sig så snart
`ARVO_FEE_RATE` ändras eller `grossSaving` inte är ett heltal (`lib/el-recommendation.js:96`
adderar `fastAvgift * 12`, som kan ha decimaler).

---

### F12 · `scripts/full-pipeline-test.mjs` påstår sig spegla API:t men gör det inte

**Fil:** `scripts/full-pipeline-test.mjs:295–340`.
**Familj:** mätfel.

Skriptet innehåller en handkopia av API:ts efterbehandling med kommentaren
*"Beräkna grossSaving (primär + sekundär) exakt som API:t gör"*. Kopian saknar:

```
$ grep -c "secondary-override" api/test-invoice.mjs scripts/full-pipeline-test.mjs
api/test-invoice.mjs:1
scripts/full-pipeline-test.mjs:0
$ grep -c "_responseSuggested\|_bbAddonPassthrough" api/test-invoice.mjs scripts/full-pipeline-test.mjs
api/test-invoice.mjs:5
scripts/full-pipeline-test.mjs:0
```

Den saknar också `recommendationType = 'no_action'` på finansgrindarna och räknar arvodet med
`Math.round(grossSaving * 0.20)` i stället för `feeOf` (rad 339).

**Konsekvens.** På exakt den kombifaktura F2 visar rapporterar diagnostiken
`shouldSwitch: false` medan produktionen svarar `shouldSwitch: true` med
`suggestedAnnualCost 25 608`. Ett mätinstrument som avviker från det det mäter — bibelns
nittonde instans av samma sak.

---

## Kontrollerat utan fynd

Följande gick jag igenom och kunde INTE fälla — flera av dem är uttryckligen hela:

* **`recommendationType`-invarianten i switch-riktningen** (rad 1891). Körd: `'switch'` +
  `shouldSwitch: false` → svaret bär `'no_action'`. Fungerar som avsett.
* **Finansgrindarna** (rad 1546–1568). Körda med `suggested >= annualCost` och med
  `prim + sek <= 0`: båda nollar beslutet, nollar `suggestedAnnualCost` och sätter
  `recommendationType = 'no_action'`.
* **Arvodeszonen** (rad 1615–1628). `feeOf`/`netOf` ur `lib/fee.js` överallt utom F11.
  `licensePending` → arvode 0, netto = brutto. Verifierat i körning: gross 76 800 → fee
  15 360 → net 61 440.
* **`_responseSuggested`-kompositionen i sig** (rad 1716) räknar hem: på en kombifaktura där
  recommend.js:s egen formel gäller är `annualCost − _responseSuggested === grossSaving`
  exakt (F1:s körning, rad "kortet räknar hem? … true"). Felet ligger i kedjan och i
  liggaren, inte i kortet.
* **Bokföringsplikten** (`storeTriaged`/`storeAnalysis`). Alla utgångar jag körde
  (`credit_note`, `foreign_currency`, `implausible_amounts`, `review_queue`,
  `fingerprint_mismatch`, `volume_data_required`, `no_benchmark`, `natavgift`,
  `el_data_missing`, `sanity_check_failed`, monitoring, el-auto) skriver en rad före svaret.
  Verifierat i körning via SQL-loggen (F5:s harness) för auto-vägen.
* **Globaltaket och rate limit** (rad 79–122). Fail-closed bekräftat: utan KV returnerar
  `checkGlobalCap` `'kv-saknas'` och handlern svarar 429 — jag fick själv 429 innan jag
  stoppade in en fake-KV i harnesset.
* **PDF-cachen** (rad 481–486, 1966). Nyckeln bär pdfHash + antal anställda; cachen skrivs
  bara på auto-vägen. Jag gick själv i fällan i harnesset (samma pdfHash mellan körningar) —
  i produktion betyder samma hash samma dokument, så beteendet är korrekt.
* **`likeForLikeTarget`-vägen** (rad 1420–1427). Anropar den delade
  `computeLikeForLikeSaasTarget` — ingen lokal kopia kvar, som RD-07/08 kräver.
* **Kreditnota-, valuta- och beloppsgrindarna** (rad 598–705) triggar på rätt villkor.
* **`extracted.currency === 'USD'`-detektionen i huvudvägen** konverterar alla penningfält
  utom `invoiceTotal`/öresfälten (se F4) — själva kursläsningen och fallbacken fungerar
  (`10.42`, källa `fallback` när nätet saknas).
* **Öresfälten och avstämningsgrinden vid valutaväxling:** `amountOre` blir kvar i
  originalvaluta medan `amount` blir SEK — men korsvalideringen i `lib/saas-rad.js:79`
  (`|ore − amount×100| > 50` → avvisa) fångar det och raden blir odömbar. Fail-closed av
  en slump, men fail-closed. Effekten är att avstämningsgrinden är permanent blind för
  utländsk valuta; ingen felaktig siffra uppstår, så jag räknar det inte som ett fynd.
* **`recommendation.estimatedAnnualSaving`-fallbacken** (rad 1561, 1576, 1612) är inert —
  `recommend.js` producerar aldrig det fältnamnet (det heter `estimatedAnnualSavingsGross`).
  Ingen effekt i dag; noterat som en fälla, inte ett fynd.
* **`body.pdfRawHeader`** (rad 576) skickas av ingen klient — kontroll 2 i
  `runIntegrityChecks` är därmed dubbelt död. Död gren, inget fynd.

---

## Appendix A — harnesset

`harness.mjs` (kör den riktiga handlern; endast modellanrop, KV och pdf-textlager stubbas):

```js
import { mock } from 'node:test';
const ROOT = '/home/user/arvo-flow.github.io';
const U = (p) => `file://${ROOT}/${p}`;
process.env.ANTHROPIC_API_KEY = 'test-key';
delete process.env.ARVO_HMAC_SECRET; delete process.env.DATABASE_URL;

const store = new Map();
const fakeKv = {
  async get(k) { return store.has(k) ? store.get(k) : null; },
  async set(k, v) { store.set(k, v); return 'OK'; },
  async incr(k) { const n = (store.get(k) ?? 0) + 1; store.set(k, n); return n; },
  async expire() { return 1; },
};
const realExtract = await import(U('agents/test-invoice/extract.js'));
const realRecommend = await import(U('agents/recommender/recommend.js'));
export const state = { extracted: null, categorized: null, recommendation: null };

mock.module(U('lib/kv.js'), { namedExports: { getKv: () => fakeKv } });
mock.module(U('agents/test-invoice/extract.js'), { namedExports: {
  ...realExtract, extractInvoice: async () => JSON.parse(JSON.stringify(state.extracted)) } });
mock.module(U('agents/categorizer/categorize.js'), { namedExports: {
  CategorizerError: class extends Error {},
  categorize: async () => JSON.parse(JSON.stringify(state.categorized)) } });
mock.module(U('agents/recommender/recommend.js'), { namedExports: {
  ...realRecommend, recommend: async () => JSON.parse(JSON.stringify(state.recommendation)) } });
mock.module(U('lib/sanity-verifier.js'), { namedExports: {
  verifySanity: async () => ({ pass: true, method: 'stub', reason: null }),
  verifySeatCount: async () => ({ ok: true, opusCount: 0, oracleCount: 0, diff: 0 }) } });
mock.module(U('lib/category-validator.js'), { namedExports: {
  validateCategory: async () => ({ conflict: false, validatorCategory: null }) } });
mock.module(U('lib/pdf-textlager.js'), { namedExports: {
  extraheraTextlager: async () => ({ text: '' }) } });

const { default: handler } = await import(U('api/test-invoice.mjs'));

export async function run({ extracted, categorized, recommendation, body = {} }) {
  store.clear();                       // annars svarar PDF-cachen på nästa körning
  state.extracted = extracted; state.categorized = categorized; state.recommendation = recommendation;
  const pdf = Buffer.from('%PDF-1.4\n% fake\n').toString('base64');
  const req = { method: 'POST', headers: { 'x-forwarded-for': '1.2.3.4' }, socket: {},
    body: { pdfBase64: pdf, industry: 'konsult', employees: 10, ...body } };
  let out = null;
  const res = { statusCode: 0, headersSent: false, setHeader() {},
    end(s) { this.headersSent = true; out = JSON.parse(s); } };
  await handler(req, res);
  return { status: res.statusCode, body: out };
}
```

`harness-db.mjs` = samma fil med två rader tillagda före KV-mocken (används av F5):

```js
export const sqlLog = [];
const fakeDb = (strings) => { sqlLog.push(strings.join('?').replace(/\s+/g, ' ').trim()); return Promise.resolve([]); };
mock.module(U('lib/db.js'), { namedExports: { getDb: () => fakeDb } });
```

`harness-real-rec.mjs` = samma fil, men recommend-mocken anropar den riktiga funktionen med
en injicerad modellklient (används av F3):

```js
const fakeClient = { messages: { create: async () => ({
  content: [{ type: 'tool_use', name: 'recommend', input: JSON.parse(JSON.stringify(state.aiSvar)) }],
  usage: { input_tokens: 1, output_tokens: 1 } }) } };
mock.module(U('agents/recommender/recommend.js'), { namedExports: {
  ...realRecommend,
  recommend: async (input) => { state.recOut = await realRecommend.recommend(input, { client: fakeClient }); return state.recOut; } } });
```

## Appendix B — reprofilerna

Kördes i
`/tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad`
med `node --experimental-test-module-mocks <fil>` (Node 22.22.2).

| fil | fynd | indata i korthet |
|---|---|---|
| `t2-secondary.mjs` | F2, F8 | comb-01 (mobil 1745 + fiber 899 + pbx 994 + statisk IP 150), `recommend` → `no_action` |
| `t4-kedjan.mjs` | F1 | samma faktura, `recommend` → switch med recommend.js egen formel (17 000 + 994×12) |
| `t5-usd-volume.mjs` | F10 | AWS, USD, startup-krediter, kategori `serverhosting`, `invoiceTotal: null` |
| `t6-valutatotal.mjs` | F4 | samma faktura i SEK / USD / EUR, radsumma = fakturatotal |
| `t7-balanskrav.mjs` | F7 | klickrad `quantity 12000`, `unitPriceOre 8`, `amount 960` |
| `t8-lock.mjs` | F6 | årsfaktura 2026-01-01→12-31, 90 dagars uppsägningstid |
| `t9-gateemail.mjs` | F5 | full auto-analys med `fingerprint` + `email`, DB som loggar SQL |
| `t10-bbaddon.mjs` | F3 | mobilfaktura 2900 + statisk IP 150, ej kombinerad, RIKTIG `recommend()` |

Fullständigt innehåll i respektive fil; varje test bygger ett `extracted`-objekt i samma form
som `agents/test-invoice/extract.js` producerar, ett `categorized`-objekt och antingen ett
`recommendation`-objekt (harness.mjs) eller AI:ns tool_use-payload (harness-real-rec.mjs).
