# Skörd: abf877f0cff604453

> **OPRÖVAD.** Det här är agentens arbete, räddat ur harnessets transkript — inte ett
> bevisat fynd. Skörden visar att arbetet UTFÖRDES; om slutsatsen är sann avgörs av
> motprövning med ett körbart bevis, precis som för varje annan hypotes.

· körning: `wf_3484bcdd-2c0` · agent: `abf877f0cff604453`
· slutsatser: 5 · körda kommandon: 90
· **bär analys**

## Uppdraget

```
(saknas i transkriptet)
```

## Vad agenten formulerade

### 1

I'll start by reading the bible and the target file.

### 2

Now let me write a driver and smoke-test the harness.

### 3

Now let me build a harness that runs the **real** `recommend()` with an injected fake model client.

### 4

```json
{
  "omrade": "test-invoice-api (api/test-invoice.mjs — orkestreringen, 1 990 rader)",
  "rapportfil": "/home/user/arvo-flow.github.io/ops/obduktion/spana-test-invoice-api.md",
  "fynd": [
    {
      "titel": "Kombifakturans föreslagna pris finns i tre versioner — skärm, beräkningsunderlag och liggare säger olika",
      "fil": "api/test-invoice.mjs",
      "rad": 1787,
      "familj": "tva-sanningar",
      "konsekvens": "På en kombinerad faktura komponeras kundens föreslagna pris i _responseSuggested (rad 1716) och visas på switch-kortet, medan calculationChain.benchmarkAnnualCost (rad 1787) och storeAnalysis (rad 1638) bär recommend.js pre-kompositionstal. Kunden ser 33 596 kr/år på kortet och 28 928 kr/år under 'Visa hur vi räknar' — den yta vars uttalade syfte är att kunden ska kunna räkna efter — och underlagets tre rader går inte ihop (45 456 − 28 928 = 16 528 ≠ 11 860). Det lagrade talet är dessutom det lib/briefing-generator.js:63-64,130,138-140 bygger månadsbriefingens 'Marknadsnivå'/'överbetalning' på och som src/lib/holdings.js:156 räknar rummets överbetalningsprocent ur — webb, kvitto, rum och mail säger olika om samma faktura (regel 5).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t4-kedjan.mjs  (harness + testfil i appendix A/B i rapporten; kör den riktiga handlern med stubbade modellanrop)",
      "faktiskt_utfall": "annualCost 45456 · SVARETS suggestedAnnualCost 33596 · KEDJANS benchmarkAnnualCost 28928 · grossSaving 11860 · 'kedjan räknar hem? 16528 === 11860 ? false' · 'kortet räknar hem? 11860 === 11860 ? true'",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Sekundär-överskrivningen tappar mobiltillägget — svaret räknar inte hem",
      "fil": "api/test-invoice.mjs",
      "rad": 1540,
      "familj": "enhetsfel",
      "konsekvens": "Överskrivningen sätter suggestedAnnualCost = primaryComponentMonthly × 12, alltså basraderna UTAN tillägg, medan recommend.js egen formel är _benchBase + addonAnnual (rad 1791, uttryckligen motiverad rad 1609-1612: tillägg ska passera igenom så vi aldrig påstår besparing på komponenter benchmarken inte prissätter). Kunden ser '45 456 → 25 608 kr/år · Ni sparar 7 920 kr/år' medan miniräknaren säger 19 848. Differensen är exakt molnväxeln 994×12 = 11 928 kr/år — en kostnad kunden behåller. Det föreslagna priset är 11 928 kr för lågt (regel 3: ska gå att räkna hem).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t2-secondary.mjs  (comb-01 ur tests/fixtures/03-combined.mjs; recommend returnerar no_action)",
      "faktiskt_utfall": "[secondary-override] shouldSwitch=true via sekundär besparing 7920 kr/år (bredband) · annualCost 45456 · suggestedAnnualCost 25608 · grossSaving 7920 · 'miniräknare: annualCost - suggested = 19848 (påstådd grossSaving 7920)' · 19848 − 7920 = 11928 = 994 × 12",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Bredbandstillägget på en mobilfaktura räknas som besparing kunden aldrig kan realisera",
      "fil": "api/test-invoice.mjs",
      "rad": 1707,
      "familj": "pastaende-utan-tackning",
      "konsekvens": "recommend.js exkluderar bara MATCHANDE tillägg ur besparingsbasen (mobileAddonAnnual endast för kategori mobil, broadbandAddonAnnual endast för bredband, rad 1612-1617). En mobilfaktura med ett bredbandstillägg (statisk IP/brandvägg/SLA) får addonAnnual = 0 → tillägget hamnar i comparableAnnualCost och därmed i besparingen. API:t räknar fram _bbAddonPassthrough (rad 1707) men använder det bara när secondarySaving finns (rad 1716-1718) — på en icke-kombinerad faktura kastas det. Vi lovar ett pris som inte täcker den statiska IP kunden fortsätter betala och tar 20 % av en för hög bruttobesparing. Spegelfallet (bredbandsfaktura med molnväxelrad) läcker likadant.",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t10-bbaddon.mjs  (harness-real-rec.mjs: kör den RIKTIGA recommend() via dess injicerbara klient, recommend.js rad 1356 — bara modellanropet är stubbat)",
      "faktiskt_utfall": "annualCost (inkl. statisk IP 1 800/år) 36600 · recommend.js suggestedAnnualCost 32280 (= mobil-p25 3228 × 10 platser, enbart SIM) · savingPerYear 4320 · SVARETS suggestedAnnualCost 32280 · grossSaving 4320 · nonPrimaryAnnual 0. De 1 800 kr/år finns i nuläget men inte i förslaget och ingår ändå i besparingen; realiserbar besparing är 2 520.",
      "allvar": "kundsynlig"
    },
    {
      "titel": "invoiceTotal konverteras inte vid valutaväxling — varje USD/EUR-faktura med totalsumma dumpas i review_queue med ett påhittat skäl",
      "fil": "api/test-invoice.mjs",
      "rad": 636,
      "familj": "enhetsfel",
      "konsekvens": "EUR-blocket (rad 615-635) och USD-blocket (rad 636-661) konverterar amount, recurringAmount, variableCharges, oneTimeFees, annualCost, pricePerSeatMonthly och lineItems[].amount — men inte invoiceTotal (grep -rn invoiceTotal api/ lib/ ger noll träffar). routeExtraction körs efteråt (rad 749) och Ring 1 jämför konverterade radbelopp i SEK mot en okonverterad totalsumma i USD/EUR. En helt korrekt USD-faktura där raderna summerar exakt till totalen routas till review_queue med skälet 'Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr' — ett aritmetiskt påstående om kundens faktura som vår egen konvertering tillverkade. Kunden får inget svar, teamet får ett falskt internt larm, skälet bokförs. Vägen är avsedd att vara nåbar (kommentaren rad 637: 'Salesforce, HubSpot, övriga SaaS i USD'). EUR-grenen konverterar dessutom inte lineItems[].unitPrice (USD-grenen gör det).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t6-valutatotal.mjs  (samma faktura tre gånger: SEK/USD/EUR, radsumma = fakturatotal i fakturans egen valuta)",
      "faktiskt_utfall": "### SEK: route=auto reason=— · ### USD: route=review_queue reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr) · ### EUR: route=review_queue reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)",
      "allvar": "kundsynlig"
    },
    {
      "titel": "gate_emails skrivs aldrig — prisalarmens routing kan bara svara \"0 berörda kunder\"",
      "fil": "api/test-invoice.mjs",
      "rad": 147,
      "familj": "tyst-tapp",
      "konsekvens": "storeGateEmail är definierad men anropas ingenstans (grep i hela repot ger bara definitionen och dess egen console.error). Det är kodbasens enda INSERT INTO gate_emails. getAffectedCustomers (lib/price-alert-store.js:29-32) börjar med SELECT ur gate_emails och returnerar [] när tabellen är tom; api/cron/run-price-alerts.mjs:96-100 markerar då alerten som skickad med emailsSent 0 och går vidare. Kärnlöftet 'Telia höjde priset för X av Y i er bransch' kan alltså aldrig nå en kund — och tystnaden ser ut som framgång: '0 berörda kunder' är omöjligt att skilja från 'ingen kund använder leverantören'. markAlertSent gör dessutom tystnaden permanent för den monitorkörningen.",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t9-gateemail.mjs  (full lyckad analys med både fingerprint och email i requesten — exakt vad src/pages/TestaFaktura/index.js:672-681 skickar — mot en DB som loggar varje SQL-sats)",
      "faktiskt_utfall": "route: auto · netSaving: 61440. Sex SQL-satser kördes: labeled_corrections INSERT, invoice_analyses SELECT, invoice_analyses INSERT, supplier_prices SELECT, per_customer CTE, graph_suppliers INSERT. 'Någon sats som rör gate_emails? -> false'",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Avtalslåset räknas från periodens START — \"ni är låsta\" med 39 dagar kvar att säga upp",
      "fil": "api/test-invoice.mjs",
      "rad": 1014,
      "familj": "tva-sanningar",
      "konsekvens": "_lockDeadline = servicePeriodStart − cancellationNoticeDays, ett datum som per definition redan passerat när fakturan för perioden är utställd. lib/contract-clock.js:50 — den deklarerade EN källan för kontraktsklockan — räknar rätt: actBy = servicePeriodEnd − notic
```

### 5

```json
{
  "omrade": "test-invoice-api (api/test-invoice.mjs — orkestreringen, 1 990 rader)",
  "rapportfil": "/home/user/arvo-flow.github.io/ops/obduktion/spana-test-invoice-api.md",
  "fynd": [
    {
      "titel": "Kombifakturans föreslagna pris finns i tre versioner — skärm, beräkningsunderlag och liggare säger olika",
      "fil": "api/test-invoice.mjs",
      "rad": 1787,
      "familj": "tva-sanningar",
      "konsekvens": "På en kombinerad faktura komponeras kundens föreslagna pris i _responseSuggested (rad 1716) och visas på switch-kortet, medan calculationChain.benchmarkAnnualCost (rad 1787) och storeAnalysis (rad 1638) bär recommend.js pre-kompositionstal. Kunden ser 33 596 kr/år på kortet och 28 928 kr/år under 'Visa hur vi räknar' — den yta vars uttalade syfte är att kunden ska kunna räkna efter — och underlagets tre rader går inte ihop (45 456 − 28 928 = 16 528 ≠ 11 860). Det lagrade talet är dessutom det lib/briefing-generator.js:63-64,130,138-140 bygger månadsbriefingens 'Marknadsnivå'/'överbetalning' på och som src/lib/holdings.js:156 räknar rummets överbetalningsprocent ur — webb, kvitto, rum och mail säger olika om samma faktura (regel 5).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t4-kedjan.mjs  (harness + testfil i appendix A/B i rapporten; kör den riktiga handlern med stubbade modellanrop)",
      "faktiskt_utfall": "annualCost 45456 · SVARETS suggestedAnnualCost 33596 · KEDJANS benchmarkAnnualCost 28928 · grossSaving 11860 · 'kedjan räknar hem? 16528 === 11860 ? false' · 'kortet räknar hem? 11860 === 11860 ? true'",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Sekundär-överskrivningen tappar mobiltillägget — svaret räknar inte hem",
      "fil": "api/test-invoice.mjs",
      "rad": 1540,
      "familj": "enhetsfel",
      "konsekvens": "Överskrivningen sätter suggestedAnnualCost = primaryComponentMonthly × 12, alltså basraderna UTAN tillägg, medan recommend.js egen formel är _benchBase + addonAnnual (rad 1791, uttryckligen motiverad rad 1609-1612: tillägg ska passera igenom så vi aldrig påstår besparing på komponenter benchmarken inte prissätter). Kunden ser '45 456 → 25 608 kr/år · Ni sparar 7 920 kr/år' medan miniräknaren säger 19 848. Differensen är exakt molnväxeln 994×12 = 11 928 kr/år — en kostnad kunden behåller. Det föreslagna priset är 11 928 kr för lågt (regel 3: ska gå att räkna hem).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t2-secondary.mjs  (comb-01 ur tests/fixtures/03-combined.mjs; recommend returnerar no_action)",
      "faktiskt_utfall": "[secondary-override] shouldSwitch=true via sekundär besparing 7920 kr/år (bredband) · annualCost 45456 · suggestedAnnualCost 25608 · grossSaving 7920 · 'miniräknare: annualCost - suggested = 19848 (påstådd grossSaving 7920)' · 19848 − 7920 = 11928 = 994 × 12",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Bredbandstillägget på en mobilfaktura räknas som besparing kunden aldrig kan realisera",
      "fil": "api/test-invoice.mjs",
      "rad": 1707,
      "familj": "pastaende-utan-tackning",
      "konsekvens": "recommend.js exkluderar bara MATCHANDE tillägg ur besparingsbasen (mobileAddonAnnual endast för kategori mobil, broadbandAddonAnnual endast för bredband, rad 1612-1617). En mobilfaktura med ett bredbandstillägg (statisk IP/brandvägg/SLA) får addonAnnual = 0 → tillägget hamnar i comparableAnnualCost och därmed i besparingen. API:t räknar fram _bbAddonPassthrough (rad 1707) men använder det bara när secondarySaving finns (rad 1716-1718) — på en icke-kombinerad faktura kastas det. Vi lovar ett pris som inte täcker den statiska IP kunden fortsätter betala och tar 20 % av en för hög bruttobesparing. Spegelfallet (bredbandsfaktura med molnväxelrad) läcker likadant.",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t10-bbaddon.mjs  (harness-real-rec.mjs: kör den RIKTIGA recommend() via dess injicerbara klient, recommend.js rad 1356 — bara modellanropet är stubbat)",
      "faktiskt_utfall": "annualCost (inkl. statisk IP 1 800/år) 36600 · recommend.js suggestedAnnualCost 32280 (= mobil-p25 3228 × 10 platser, enbart SIM) · savingPerYear 4320 · SVARETS suggestedAnnualCost 32280 · grossSaving 4320 · nonPrimaryAnnual 0. De 1 800 kr/år finns i nuläget men inte i förslaget och ingår ändå i besparingen; realiserbar besparing är 2 520.",
      "allvar": "kundsynlig"
    },
    {
      "titel": "invoiceTotal konverteras inte vid valutaväxling — varje USD/EUR-faktura med totalsumma dumpas i review_queue med ett påhittat skäl",
      "fil": "api/test-invoice.mjs",
      "rad": 636,
      "familj": "enhetsfel",
      "konsekvens": "EUR-blocket (rad 615-635) och USD-blocket (rad 636-661) konverterar amount, recurringAmount, variableCharges, oneTimeFees, annualCost, pricePerSeatMonthly och lineItems[].amount — men inte invoiceTotal (grep -rn invoiceTotal api/ lib/ ger noll träffar). routeExtraction körs efteråt (rad 749) och Ring 1 jämför konverterade radbelopp i SEK mot en okonverterad totalsumma i USD/EUR. En helt korrekt USD-faktura där raderna summerar exakt till totalen routas till review_queue med skälet 'Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr' — ett aritmetiskt påstående om kundens faktura som vår egen konvertering tillverkade. Kunden får inget svar, teamet får ett falskt internt larm, skälet bokförs. Vägen är avsedd att vara nåbar (kommentaren rad 637: 'Salesforce, HubSpot, övriga SaaS i USD'). EUR-grenen konverterar dessutom inte lineItems[].unitPrice (USD-grenen gör det).",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t6-valutatotal.mjs  (samma faktura tre gånger: SEK/USD/EUR, radsumma = fakturatotal i fakturans egen valuta)",
      "faktiskt_utfall": "### SEK: route=auto reason=— · ### USD: route=review_queue reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr) · ### EUR: route=review_queue reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)",
      "allvar": "kundsynlig"
    },
    {
      "titel": "gate_emails skrivs aldrig — prisalarmens routing kan bara svara \"0 berörda kunder\"",
      "fil": "api/test-invoice.mjs",
      "rad": 147,
      "familj": "tyst-tapp",
      "konsekvens": "storeGateEmail är definierad men anropas ingenstans (grep i hela repot ger bara definitionen och dess egen console.error). Det är kodbasens enda INSERT INTO gate_emails. getAffectedCustomers (lib/price-alert-store.js:29-32) börjar med SELECT ur gate_emails och returnerar [] när tabellen är tom; api/cron/run-price-alerts.mjs:96-100 markerar då alerten som skickad med emailsSent 0 och går vidare. Kärnlöftet 'Telia höjde priset för X av Y i er bransch' kan alltså aldrig nå en kund — och tystnaden ser ut som framgång: '0 berörda kunder' är omöjligt att skilja från 'ingen kund använder leverantören'. markAlertSent gör dessutom tystnaden permanent för den monitorkörningen.",
      "repro": "cd <scratchpad> && node --experimental-test-module-mocks t9-gateemail.mjs  (full lyckad analys med både fingerprint och email i requesten — exakt vad src/pages/TestaFaktura/index.js:672-681 skickar — mot en DB som loggar varje SQL-sats)",
      "faktiskt_utfall": "route: auto · netSaving: 61440. Sex SQL-satser kördes: labeled_corrections INSERT, invoice_analyses SELECT, invoice_analyses INSERT, supplier_prices SELECT, per_customer CTE, graph_suppliers INSERT. 'Någon sats som rör gate_emails? -> false'",
      "allvar": "kundsynlig"
    },
    {
      "titel": "Avtalslåset räknas från periodens START — \"ni är låsta\" med 39 dagar kvar att säga upp",
      "fil": "api/test-invoice.mjs",
      "rad": 1014,
      "familj": "tva-sanningar",
      "konsekvens": "_lockDeadline = servicePeriodStart − cancellationNoticeDays, ett datum som per definition redan passerat när fakturan för perioden är utställd. lib/contract-clock.js:50 — den deklarerade EN källan för kontraktsklockan — räknar rätt: actBy = servicePeriodEnd − notic
```

## Vad agenten faktiskt körde — de körbara bevisen

### Kommando 1

```bash
wc -l api/test-invoice.mjs agents/recommender/recommend.js && ls ops/obduktion/ 2>/dev/null | head -50
```

```
  1990 api/test-invoice.mjs
  1962 agents/recommender/recommend.js
  3952 total
spana-benchmark-prisbok-lib-benchmark-js-agent.md
spana-recommend-kedjan-agents-recommender-reco.md
```

### Kommando 2

```bash
ls tests/ && echo "---" && cat package.json | head -40
```

```
adobe-pricing.mjs
adobe-recommendation.mjs
adobe-rightsizing.mjs
avtal-fallor.mjs
balanskrav.mjs
bevakat-kort.mjs
branch-anchors.mjs
branchindex.mjs
briefinglage.mjs
business-intel.mjs
contract-clock.mjs
contract-intel.mjs
ct-ko.mjs
deadline-reminder.mjs
diagnos.mjs
domain-intel.mjs
domslut.mjs
dorrstat.mjs
el-intelligence.mjs
el-recommendation.mjs
extract-simple-invoice.mjs
fakturanummer.mjs
fakturarader.mjs
fee.mjs
fixtures
forensics.mjs
fortnox-recommendation.mjs
fortnox.mjs
fraktjakt.mjs
google-workspace-recommendation.mjs
greeting.mjs
holdings.mjs
inbound-attachments.mjs
inbound-reply.mjs
ingest-bulk.mjs
jamforelsekalla.mjs
judgment-contract.mjs
kobokforing.mjs
korpusdiff.mjs
lasvagens-kolumner.mjs
lfl-produktionsvag.mjs
licensniva.mjs
loneadmin-recommendation.mjs
m365-rightsizing.mjs
market-movement.mjs
matriskrav.mjs
mattsystem.mjs
molnvaxel-recommendation.mjs
obduktion.mjs
outbound-identity.mjs
pastaendekontrakt.mjs
plan-pris.mjs
price-forecast.mjs
price-verdict.mjs
prisunderlag.mjs
property.mjs
recommend-deterministic.mjs
recompute-shelfware.mjs
revisionsgrind.mjs
room-continuation.mjs
rumsidentitet.mjs
rumsredovisning.mjs
run.mjs
saas-avstamning.mjs
saas-like-for-like.mjs
saas-rad.mjs
saas-substitution.mjs
saas-tier-detection.mjs
sanity-verifier.mjs
schemakrav.mjs
scorekrav.mjs
session.mjs
shelfware.mjs
sondkontrakt.mjs
sondvakt.mjs
spiris-recommendation.mjs
spiris.mjs
stress-mork.mjs
supplier-keyword.mjs
svea-print.mjs
tele2-broadband.mjs
telekom-normalize.mjs
test-surface.mjs
triage-bokforing.mjs
tystnadsfel.mjs
vakt.mjs
vaktkontrakt.mjs
verifier-registry.mjs
verifieringsstampel.mjs
verifikationskvitto.mjs
villkorslasare.mjs
villkorsvakt.mjs
watched-ledger.mjs
---
{
  "name": "arvo-os",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://arvo-flow.github.io/flow",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.82.0",
    "@neondatabase/serverless": "^0.10.4",
    "@sentry/react": "^10.55.0",
    "@vercel/kv": "^3.0.0",
    "axios": "^1.14.0",
    "better-sqlite3": "^12.8.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.0",
    "express": "^5.2.1",
    "pdfjs-dist": "^6.2.108",
    "pdfkit": "^0.18.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-icons": "^5.6.0",
    "react-router-dom": "^7.13.2",
    "react-scripts": "5.0.1",
    "resend": "^6.12.3",
    "styled-components": "^6.3.12"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build -e flow",
    "prepare": "node scripts/setup-hooks.mjs",
    "server": "node server/index.js",
    "seed": "node server/seed.js",
    "test:webhook": "node server/test-webhook.js",
    "test:invoice": "node agents/test-invoice/cli.js",
    "db:migrate": "node --env-file=.env scripts/migrate.mjs",
    "test:algo": "node --test tests/run.mjs",
    "test:prop": "node tests/property.mjs",
```

### Kommando 3

```bash
grep -rln "test-invoice" tests/ scripts/ | head -30 && echo "=== fixtures ===" && ls tests/fixtures | head
```

```
tests/lfl-produktionsvag.mjs
tests/obduktion.mjs
tests/jamforelsekalla.mjs
tests/triage-bokforing.mjs
tests/schemakrav.mjs
tests/tystnadsfel.mjs
tests/saas-rad.mjs
tests/fakturanummer.mjs
tests/verifikationskvitto.mjs
tests/extract-simple-invoice.mjs
scripts/probe-ellevio-raden.mjs
scripts/probe-lfl-tackning.mjs
scripts/capture-snapshots.mjs
scripts/probe-lfl-produktionsvag.mjs
scripts/probe-stickprov.mjs
scripts/diag-saas-bugs.mjs
scripts/generate-test-invoices.mjs
scripts/screenshot-verifikationskvitto.mjs
scripts/diag-avtal-live.mjs
scripts/probe-avstamningsbransle.mjs
scripts/batch-import.mjs
scripts/probe-grindarna.mjs
scripts/record-demo.mjs
scripts/diag-live.mjs
scripts/test-telecom.mjs
scripts/probe-fakturanummer.mjs
scripts/build-fewshot.mjs
scripts/e2e-test.mjs
scripts/snapshot-test.mjs
scripts/diag-pdf.mjs
=== fixtures ===
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
```

### Kommando 4

```bash
grep -n "test-invoice" tests/triage-bokforing.mjs tests/obduktion.mjs tests/tystnadsfel.mjs | head -20
```

```
tests/triage-bokforing.mjs:16://   FÅNGAR: en triage-utgång i api/test-invoice.mjs som svarar ok:true med route 'unsupported'
tests/triage-bokforing.mjs:28:const KALLA = readFileSync(join(ROOT, 'api/test-invoice.mjs'), 'utf8');
tests/triage-bokforing.mjs:99:  //   FÅNGAR: en ok:true-utgång i api/test-invoice.mjs — oavsett route — utan storeTriaged
tests/obduktion.mjs:21:import { routeExtraction } from '../agents/test-invoice/extract.js';
tests/obduktion.mjs:358:  const api = readFileSync(join(ROT, 'api', 'test-invoice.mjs'), 'utf8');
tests/obduktion.mjs:435:    const kod = readFileSync(join(ROT, 'api', 'test-invoice.mjs'), 'utf8')
tests/tystnadsfel.mjs:139:  const src = las('api/test-invoice.mjs');
tests/tystnadsfel.mjs:212:    for (const fil of ['agents/test-invoice/extract.js', 'agents/recommender/recommend.js']) {
```

### Kommando 5

```bash
node -v; git log --oneline -3
```

```
v22.22.2
4bda1a0 Räddar 13 oprövade hypoteser ur en workflow som dog på sessionsgränsen
7941367 verifiering: atlassian bekräftade sina nivåer mot källan [skip ci]
ff1bb56 verifiering: adobe bekräftade sina nivåer mot källan [skip ci]
```

### Kommando 6

```bash
grep -n "recommendationType" agents/recommender/recommend.js | head -40 && echo "=== src consumers ===" && grep -rn "recommendationType" src/ | head -20
```

```
881:      shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
896:    shouldSwitch: false, requiresQuote: false, recommendationType: 'optimize',
927:    shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
956:      ...base, requiresQuote: true, recommendationType: 'requires_quote', adobeRightsizing: null, suggestedSupplier: null,
967:      ...base, requiresQuote: false, recommendationType: 'optimize', adobeRightsizing: rs,
975:    ...base, requiresQuote: true, recommendationType: 'requires_quote', adobeRightsizing: null, suggestedSupplier: null,
988:    shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
1222:        recommendationType:  'requires_quote',
1255:        recommendationType:  'requires_quote',
1283:      recommendationType:  'requires_quote',
1335:      recommendationType: 'requires_quote',
1489:    result.recommendationType === 'optimize' &&
1496:    result.recommendationType = 'no_action';
1534:    result.recommendationType  = 'advisory';
1671:      result.recommendationType = 'no_action';
1708:        result.recommendationType = 'no_action';
1758:      result.recommendationType = 'no_action';
1916:    recommendationType: result.recommendationType ?? (result.shouldSwitch ? 'switch' : 'no_action'),
=== src consumers ===
src/pages/TestaFaktura/index.js:990:  const isOptimize = result?.recommendation?.recommendationType === 'optimize'
```

### Kommando 7

```bash
sed -n 975,1010p src/pages/TestaFaktura/index.js
```

```
  };

  const phaseState = (id) => {
    if (!phase) return 'pending';
    if (phase === 'done') return 'done';
    const order = ['uploading', 'extract', 'categorize', 'recommend'];
    const currentIdx = order.indexOf(phase);
    const myIdx = order.indexOf(id);
    if (myIdx < currentIdx) return 'done';
    if (myIdx === currentIdx) return 'active';
    return 'pending';
  };

  const loading = phase && phase !== 'done';

  const isOptimize = result?.recommendation?.recommendationType === 'optimize'
    && (result?.recommendation?.optimizationSaving ?? 0) > 0;
  const optSaving = result?.recommendation?.optimizationSaving ?? 0;
  const optArvoFee = isOptimize ? (result?.recommendation?.optimizationFee ?? 0) : 0;
  const optNet = isOptimize ? (result?.recommendation?.optimizationNetSaving ?? 0) : 0;

  // Hårdvarujusteringen räknas i BACKEND (lib/hardware-installments.js) och emitteras
  // färdig i result.hardwareAdjustment — frontend renderar, räknar aldrig (×0,80-läxan).
  const _hwAdj          = result?.hardwareAdjustment ?? null;
  const _hwItems        = _hwAdj?.items ?? [];
  const _hwAnnualCost   = _hwAdj?.hwAnnualCost ?? 0;
  const _hwTotalRemain  = _hwAdj?.hwTotalRemaining ?? 0;
  const hasHwAdj        = !!_hwAdj;
  const adjAnnualCost   = hasHwAdj ? _hwAdj.adjAnnualCost  : (result?.extracted?.annualCost ?? 0);
  const adjGrossSaving  = hasHwAdj ? _hwAdj.adjGrossSaving : (result?.recommendation?.grossSaving ?? 0);
  const adjArvoFee      = hasHwAdj ? _hwAdj.adjArvoFee     : (result?.recommendation?.arvoFee ?? 0);
  const adjNetSaving    = hasHwAdj ? _hwAdj.adjNetSaving   : (result?.recommendation?.netSaving ?? 0);

  const animatedNet = useCountUp(hasHwAdj ? adjNetSaving : (result?.recommendation?.netSaving ?? 0));

  const diagAnnual  = adjAnnualCost;
```

### Kommando 8

```bash
sed -n 1,40p lib/kv.js; echo "=== db ==="; sed -n 1,30p lib/db.js; echo "=== sanity ==="; grep -n "export" lib/sanity-verifier.js | head; echo "=== catval ==="; grep -n "export" lib/category-validator.js | head
```

```
// lib/kv.js — Vercel KV (Redis) client.
// Returns null when env vars are not set so callers degrade gracefully.
import { createClient } from '@vercel/kv';

let _kv;

export function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  if (!_kv) _kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
  return _kv;
}
=== db ===
// lib/db.js — Neon serverless Postgres client.
// Checks multiple env var names to handle different Vercel/Neon prefix configs.
// Returns null when no URL is found so callers degrade gracefully.
import { neon } from '@neondatabase/serverless';

let _sql;

export function getDb() {
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}
=== sanity ===
62:export async function verifySeatCount({ seatCount, lineItems, pdfBase64 }) {
133:export async function verifySanity({ category, annualCost, savingPct, supplier, benchmarkSource }) {
=== catval ===
49:export async function validateCategory({ supplier, amount, lineItems, proposedCategory }) {
```

### Kommando 9

```bash
grep -n "export function routeExtraction" -A 60 agents/test-invoice/extract.js | head -80
```

```
1010:export function routeExtraction(extracted) {
1011-  // ── Verifikationsmanifestet (B4) ──────────────────────────────────────────
1012-  // Varje grind emitterar sitt domslut — även när den PASSERAR. Kvittot i
1013-  // kundytan byggs av dessa verkliga domar, aldrig av påstående UI-text
1014-  // (anti-Potemkin, hjärtslags-läxan 1C). En kontroll som inte kunde döma
1015-  // säger 'ej_provbar' — den påstår ALDRIG en bock den inte förtjänat
1016-  // (korpusdiff-läxan: 0 dömbara rader får inte se ut som 703 gröna).
1017-  const verifications = [];
1018-  const emit = (id, status, detalj) => verifications.push({ id, status, detalj });
1019-
1020-  if (extracted.outOfScope) {
1021-    return { route: 'unsupported', reason: extracted.outOfScopeReason ?? 'out_of_scope', verifications };
1022-  }
1023-
1024-  // Schemakravet (B2, döms i extractInvoice — domen bärs hit)
1025-  if (extracted.schemakrav) {
1026-    emit('schemakrav', extracted.schemakrav.ok ? 'ok' : 'varning',
1027-      extracted.schemakrav.ok
1028-        ? 'AI-utfallet följer extraktionsschemat fältvis'
1029-        : `${extracted.schemakrav.brott} schemabrott (skugga)`);
1030-  } else {
1031-    emit('schemakrav', 'ej_provbar', 'analysen kördes utan schemadom');
1032-  }
1033-
1034-  // ── Ring 1: Matematisk ankartest ─────────────────────────────────────────
1035-  // Om fakturan har ett "Att betala"-belopp ska summan av raderna stämma inom 3%.
1036-  // Stor avvikelse indikerar missad rad, dubbel rad eller fel vid moms-hantering.
1037-  // Tolerans: max(50 kr, 3 % av total) — absorberar avrundning och öresavrundning.
1038-  {
1039-    const lineSum = (extracted.lineItems ?? []).reduce((s, l) => s + (l.amount ?? 0), 0);
1040-    if (extracted.invoiceTotal > 0 && lineSum > 0) {
1041-      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
1042-      const tolerance = Math.max(50, extracted.invoiceTotal * 0.03);
1043-      // Vanligaste svenska mönstret: rader EXKL moms, "Att betala" INKL moms. Glappet ÄR momsen,
1044-      // inte en saknad rad — erkänn det innan vi flaggar, annars fastnar enkla fakturor.
1045-      //
1046-      // ── SATSEN LÄSES, DEN GISSAS INTE (obduktionen 2026-08-20) ────────────────────────────
1047-      // Raden provade [0,25 · 0,12 · 0,06] och godkände om NÅGON passade. Med toleransen på
1048-      // 3 % blir det ett fönster från ~3 % till ~9 % av totalen där en SAKNAD RAD förklaras
1049-      // bort som moms — och kunden får bocken «radsumman stämmer». Fakturan säger ju vilken
1050-      // sats den använder: `moms_sats` är ett observationsfält sedan 12 augusti, avläst och
1051-      // aldrig härlett. Att prova tre satser när en står tryckt på pappret är samma mönster
1052-      // som återkommit genom hela obduktionen — ett antagande där en avläsning fanns att göra.
1053-      // `>= 0` och inte `> 0`: en faktura som anger 0 % (reverse charge) HAR läst av en sats, och
1054-      // just den fakturan får absolut inte falla tillbaka på tre
```

### Kommando 10

```bash
sed -n 1,80p tests/fixtures/03-combined.mjs
```

```
// tests/fixtures/03-combined.mjs
// 55 fixtures for computeInvoiceMetrics + computeSecondarySaving — combined invoices
//
// Computation recap (combined / mixed=true):
//
//   recurring = lineItems where type='recurring_subscription'
//   isMobileAddon(li):
//     addon_type in {pbx,voip}  OR
//     (is_addon===true && addon_type NOT in {static_ip,firewall,sla} && desc matches MOBILE_RX)  OR
//     (is_addon!==true && desc matches MOBILE_RX)
//     MOBILE_RX = /molnväxel|cloud[\s-]?pbx|\bpbx\b|ip-?pbx|teams[\s-]?direkt|teams[\s-]?integr|pstn|\bvoip\b/i
//
//   isBroadbandAddon(li):
//     addon_type in {static_ip,firewall,sla}  OR
//     (is_addon===true && addon_type NOT in {pbx,voip} && desc matches BROADBAND_RX)  OR
//     (is_addon!==true && desc matches BROADBAND_RX)
//     BROADBAND_RX = /statisk[\s-]?ip|managed[\s-]?firewall|brandv[äa]gg|extra[\s-]?sla|sla[\s-]?uppgr|\butm\b/i
//
//   base = recurring where !isMobileAddon && !isBroadbandAddon
//
//   mixed=true, category='mobil':
//     primaryLines   = base where desc NOT matches /bredband|fiber|internet|adsl|ftth/i
//     secondaryLines = base where desc MATCHES /bredband|fiber|internet|adsl|ftth/i
//     secondaryConnectionSpeedMbit = speed from FIRST secondary line with match:
//       regex /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i, n=parseInt(m[1])
//       mbit = /gbit|gbps/i.test(m[2]) ? n*1000 : n
//       snap to [100,250,500,1000]: first t where mbit≤t, else 1000
//
//   mixed=true, category='bredband':
//     primaryLines   = base where desc NOT matches /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondaryLines = base where desc MATCHES /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondarySeatCount = secondaryLines.length (if >0)
//
//   computeSecondarySaving:
//     category='mobil' (bredband-sekundär): bredbandSpeedBenchmark p25 (ur tele2Verified): {100:2388, 250:2388, 500:2868, 1000:3348}
//     ⚠ Raden vaktas av BI-09 mot den levande härledningen — skriv inte om den för hand.
//       secAnnual=Math.round(secondaryMonthly*12), gross=Math.max(0,secAnnual-p25)
//       gross<500 → null; netSaving=Math.round(gross*0.80)
//     category='bredband': mobilP25 by segment+bucket
//       segment konsult/byraer: micro(1-9)→3588, small(10-49)→3408, mid(50-249)→3228
//       segment bygg/transport/hantverkare: micro→3588, small→3408
//       segment ehandel/tillverkning: micro→3588, small→3408, mid→3228 (tillverkning)
//       p25Total=Math.round(mobilP25*seatCount), gross=secAnnual-p25Total
//       gross<500 → null; netSaving=Math.round(gross*0.80)

export const fixtures = [

  // ════════════════════════════════════════════════════════════════════════════
  // A. primary=mobil, secondary=bredband (comb-01 – comb-30)
  // ════════════════════════════════════════════════════════════════════════════

  // ── comb-01 ──────────────────────────────────────────────────────────────────
  // TeleKom B2B full scenario:
  //   mobil 1745 + bredband "Fiber 500/500 Mbit/s" 899 + pbx 994 
```

### Kommando 11

```bash
sed -n 1070,1220p agents/test-invoice/extract.js
```

```
      } else if (vatExplained) {
        emit('radsumma', 'ok', avlastSats != null
          ? `radsumman stämmer mot fakturatotalen (skillnaden är momsen, ${Math.round(avlastSats * 100)} % enligt fakturan)`
          : 'radsumman stämmer mot fakturatotalen (skillnaden är momsen)');
      } else if (satsMotsagelse) {
        console.warn(`[radsumma] fakturan anger ${Math.round(avlastSats * 100)} % moms, men glappet ` +
          `(${Math.round(diff)} kr) motsvarar en annan sats — fakturans momsuppgift och dess aritmetik är oense`);
        emit('radsumma', 'varning',
          `fakturan anger ${Math.round(avlastSats * 100)} % moms men glappet motsvarar en annan sats`);
      } else {
        emit('radsumma', 'stopp',
          `radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr`);
        return {
          route:  'review_queue',
          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
          verifications,
        };
      }
    } else {
      emit('radsumma', 'ej_provbar', 'fakturan bär ingen prövbar totalsumma');
    }
  }

  // ── Ring 2 (Balanskravet B2): per-rad-aritmetik — antal × à-pris = radbelopp ──
  // SKUGG-LÄGE tills falsklarmsfrekvensen är uppmätt i produktion:
  // utfall loggas alltid; stoppar enbart när BALANSKRAV_ENFORCE=1.
  {
    const b2 = judgeLineArithmetic(extracted);
    if (b2.judged === 0) {
      emit('balanskrav', 'ej_provbar', 'inga rader bär både antal och à-pris');
    } else if (b2.balanced) {
      emit('balanskrav', 'ok', `antal × à-pris ger radbeloppet på samtliga ${b2.judged} prövbara rader`);
    } else {
      emit('balanskrav', process.env.BALANSKRAV_ENFORCE === '1' ? 'stopp' : 'varning',
        `${b2.violations.length} av ${b2.judged} prövbara rader obalanserade`);
      const detail = b2.violations
        .map(v => `"${(v.line ?? '').slice(0, 48)}" förväntat ${Math.round(v.expected)} kr, fick ${v.actual} kr (${v.reason})`)
        .join(' · ');
      console.warn(`[balanskrav] B2 ${process.env.BALANSKRAV_ENFORCE === '1' ? 'STOPP' : 'SKUGGA'}: ${b2.violations.length}/${b2.judged} rader obalanserade — ${detail}`);
      if (process.env.BALANSKRAV_ENFORCE === '1') {
        return {
          route:  'review_queue',
          reason: `Balanskrav B2: ${b2.violations.length} rad(er) där antal × à-pris inte ger radbeloppet`,
          verifications,
        };
      }
    }
  }

  // Projektionskravet (döms i aggregateLineItems — domen bärs hit)
  if (extracted.projektionskrav?.provad) {
    emit('projektion', extracted.projektionskrav.ok ? 'ok' : 'varning',
      extracted.projektionskrav.ok
        ? 'nästa periods belopp verifierat mot radsumman (±2 %)'
        : `AI-projektionen avviker ${extracted.projektionskrav.deviationPct} % från radsumman (skugga)`);
  } else if (extracted.projektionskrav?.grund === '
```

### Kommando 12

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t1-smoke.mjs 2>&1 | tail -60
```

```
(node:9829) ExperimentalWarning: Module mocking is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[test-invoice] extracted: {"supplier":"Tele2 Sverige AB","description":"Mobilabonnemang","billingPeriod":"monthly","lineItems":1,"recurringAmount":34800,"variableCharges":0,"annualCost":417600,"confidenceScore":0.95}
[tokens] extract: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint:pre-route] tele2: confidence 0.95 → 0.95
[test-invoice] categorized: {"category":"mobil","confidence":0.95,"normalizedSupplier":"tele2"}
[tokens] categorize: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint] MATCH key=tele2 category='mobil' confidence 0.95 → 0.95
[tokens] recommend: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[rad-först SKUGGA] pipeline=mobil rad-primär=mobil andel=1 flerkategori=false fördelning={ mobil:34800 }
status 200
route auto reason undefined
rec {
 "recommendationType": "switch",
 "optimizationSaving": null,
 "optimizationFee": null,
 "optimizationNetSaving": null,
 "requiresQuote": false,
 "shouldSwitch": true,
 "suggestedSupplier": "Tele2 Bas",
 "suggestedAnnualCost": 340800,
 "secondarySaving": null,
 "grossSaving": 76800,
 "arvoFee": 15360,
 "netSaving": 61440,
 "confidence": 0.8,
 "reasoning": "test",
 "switchSteps": [],
 "licenseOverage": null,
 "overageSavings": null,
 "shelfware": null,
 "fortnoxRightsizing": null,
 "annualBillingSaving": null,
 "nonPrimaryAnnual": 0,
 "tierOptimizationSaving": null,
 "tierOptimizationFee": null,
 "tierOptimizationNetSaving": null,
 "tierOptimizationFromTier": null,
 "tierOptimizationToTier": null,
 "clickRateAnalysis": null,
 "leadFinding": null,
 "forensicFindings": null,
 "jamforelseKalla": null
}
```

### Kommando 13

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t2-secondary.mjs 2>&1 | tail -30
```

```
(node:11638) ExperimentalWarning: Module mocking is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[test-invoice] extracted: {"supplier":"Tele2 Sverige AB","description":"Mobil + bredband","billingPeriod":"monthly","lineItems":4,"recurringAmount":3788,"variableCharges":0,"annualCost":45456,"confidenceScore":0.95}
[tokens] extract: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint:pre-route] tele2: confidence 0.95 → 0.95
[test-invoice] categorized: {"category":"mobil","confidence":0.95,"normalizedSupplier":"tele2"}
[tokens] categorize: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint] MATCH key=tele2 category='mobil' confidence 0.95 → 0.95
[tokens] recommend: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[rad-först SKUGGA] pipeline=mobil rad-primär=mobil andel=0.46 flerkategori=true fördelning={ mobil:1745 addon:pbx:994 bredband:899 addon:static_ip:150 }
[secondary-override] shouldSwitch=true via sekundär besparing 7920 kr/år (bredband)
--- kundsynligt svar ---
annualCost            45456
shouldSwitch          true
recommendationType    no_action
suggestedAnnualCost   25608
grossSaving           7920
netSaving             6336
secondarySaving       {"category":"bredband","speedMbit":500,"currentAnnual":10788,"suggestedAnnual":2868,"grossSaving":7920,"netSaving":6336}
miniräknare: annualCost - suggested = 19848  (påstådd grossSaving 7920 )
calculationChain      {"currentAnnualCost":{"value":45456,"source":"Projicerat från fakturaperiodens återkommande rader"},"benchmarkAnnualCost":{"value":20940,"formula":null,"source":"Arvo branschindex (maj 2026)","benchmarkType":"negotiated-target"},"grossSaving":{"value":7920},"arvoFee":{"value":1584,"formula":"7 920 kr × 20 %"},"netSaving":{"value":6336}}
```

### Kommando 14

```bash
grep -rn "calculationChain\|benchmarkAnnualCost" src/ | head -20
```

```
src/pages/TestaFaktura/index.js:240:          {cc.benchmarkAnnualCost && (
src/pages/TestaFaktura/index.js:244:                {cc.benchmarkAnnualCost.formula && <div className="chain-source">{cc.benchmarkAnnualCost.formula}</div>}
src/pages/TestaFaktura/index.js:245:                <div className="chain-source">{cc.benchmarkAnnualCost.source}</div>
src/pages/TestaFaktura/index.js:247:              <span className="chain-value">{formatKr(cc.benchmarkAnnualCost.value)} kr/år</span>
src/pages/TestaFaktura/index.js:2031:            {result.route === 'auto' && !result.categorized?.licensePending && result.calculationChain && (
src/pages/TestaFaktura/index.js:2032:              <CalculationChainBlock cc={result.calculationChain} />
```

### Kommando 15

```bash
sed -n 215,275p src/pages/TestaFaktura/index.js
```

```
      </div>
      <div className="vr-foot">
        Varje kontroll ovan kördes deterministiskt på just den här fakturan — en kontroll som inte kunde prövas markeras, aldrig bockas.
      </div>
    </VerificationReceipt>
  );
}

function CalculationChainBlock({ cc }) {
  const [open, setOpen] = React.useState(false);
  return (
    <CalculationChain>
      <div className="chain-header" onClick={() => setOpen(o => !o)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}>
        <span className="chain-title">Beräkningsunderlag</span>
        <span className="chain-toggle">{open ? 'Dölj ▲' : 'Visa hur vi räknar ▼'}</span>
      </div>
      {open && (
        <div className="chain-body">
          <div className="chain-row">
            <div>
              <div className="chain-label">Nuvarande kostnad</div>
              <div className="chain-source">{cc.currentAnnualCost.source}</div>
            </div>
            <span className="chain-value">{formatKr(cc.currentAnnualCost.value)} kr/år</span>
          </div>
          {cc.benchmarkAnnualCost && (
            <div className="chain-row">
              <div>
                <div className="chain-label">Arvo-pris</div>
                {cc.benchmarkAnnualCost.formula && <div className="chain-source">{cc.benchmarkAnnualCost.formula}</div>}
                <div className="chain-source">{cc.benchmarkAnnualCost.source}</div>
              </div>
              <span className="chain-value">{formatKr(cc.benchmarkAnnualCost.value)} kr/år</span>
            </div>
          )}
          <div className="chain-row">
            <div className="chain-label">Bruttobesparing</div>
            <span className="chain-value">{formatKr(cc.grossSaving.value)} kr/år</span>
          </div>
          <div className="chain-row">
            <div>
              <div className="chain-label">Arvos arvode</div>
              <div className="chain-source">{cc.arvoFee.formula}</div>
            </div>
            <span className="chain-value">−{formatKr(cc.arvoFee.value)} kr/år</span>
          </div>
          <div className="chain-row total">
            <span>Er nettobesparing</span>
            <span className="chain-value">+{formatKr(cc.netSaving.value)} kr/år</span>
          </div>
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
```

### Kommando 16

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && sed -e "s/shouldSwitch: false,/shouldSwitch: true,/" -e "s/recommendationType: 'no_action',/recommendationType: 'switch',/" -e "s/suggestedAnnualCost: null,/suggestedAnnualCost: 18000,/" -e "s/savingPerYear: 0,/savingPerYear: 2940,/" t2-secondary.mjs > t3-combined-switch.mjs && node --experimental-test-module-mocks t3-combined-switch.mjs 2>&1 | tail -14
```

```
[tokens] categorize: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint] MATCH key=tele2 category='mobil' confidence 0.95 → 0.95
[tokens] recommend: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[rad-först SKUGGA] pipeline=mobil rad-primär=mobil andel=0.46 flerkategori=true fördelning={ mobil:1745 addon:pbx:994 bredband:899 addon:static_ip:150 }
--- kundsynligt svar ---
annualCost            45456
shouldSwitch          true
recommendationType    switch
suggestedAnnualCost   22668
grossSaving           10860
netSaving             8688
secondarySaving       {"category":"bredband","speedMbit":500,"currentAnnual":10788,"suggestedAnnual":2868,"grossSaving":7920,"netSaving":6336}
miniräknare: annualCost - suggested = 22788  (påstådd grossSaving 10860 )
calculationChain      {"currentAnnualCost":{"value":45456,"source":"Projicerat från fakturaperiodens återkommande rader"},"benchmarkAnnualCost":{"value":18000,"formula":null,"source":"Arvo branschindex (maj 2026)","benchmarkType":"negotiated-target"},"grossSaving":{"value":10860},"arvoFee":{"value":2172,"formula":"10 860 kr × 20 %"},"netSaving":{"value":8688}}
```

### Kommando 17

```bash
grep -n "mobileAddonMonthly\|broadbandAddonMonthly\|nonPrimaryAnnual" agents/recommender/recommend.js | head -30
```

```
180:  const mobileAddonAnnual = (invoice.mobileAddonMonthly > 0) ? invoice.mobileAddonMonthly * 12 : null;
193:  const nonPrimaryAnnualForPrompt = (_isCombined && primaryAnnualForPrompt != null)
443:          const _secCostFmt  = nonPrimaryAnnualForPrompt.toLocaleString('sv-SE');
449:      : `Övriga tjänster (${nonPrimaryAnnualForPrompt.toLocaleString('sv-SE')} kr+) analyseras via Fortnox/Visma.`;
457:    Sekundär komponent (${_secLabel}): ${nonPrimaryAnnualForPrompt.toLocaleString('sv-SE')} kr/år${_secBenchmarkNote}
1565:      const _addonMonthly = (input.invoice.mobileAddonMonthly ?? 0) + (input.invoice.broadbandAddonMonthly ?? 0);
1612:    const mobileAddonAnnual = (input.categorized.category === 'mobil' && (input.invoice.mobileAddonMonthly ?? 0) > 0)
1613:      ? Math.round(input.invoice.mobileAddonMonthly * 12)
1615:    const broadbandAddonAnnual = (input.categorized.category === 'bredband' && (input.invoice.broadbandAddonMonthly ?? 0) > 0)
1616:      ? Math.round(input.invoice.broadbandAddonMonthly * 12)
1633:    // Skip the deterministic override (AI values stand) and mark nonPrimaryAnnual = 0.
1635:      result.nonPrimaryAnnual = 0;
1644:    result.nonPrimaryAnnual = primaryComponentAnnual != null
```

### Kommando 18

```bash
sed -n 1600,1720p agents/recommender/recommend.js
```

```
    // «per användare» — så en TOTALSUMMA multiplicerades med antalet anställda, rakt in i
    // suggestedAnnualCost, savingPerYear och overpaymentPercent. Finansgrinden nedan
    // (suggested >= annualCost → tystnad) döljer den grova formen genom att nolla bytet, vilket
    // gör felet TYST i stället för synligt: kunden ser «ingen besparing» på en jämförelse som
    // var hundrafalt fel. Skalan bor numera i EN funktion, så en fjärde konsument inte kan
    // glömma flaggan som den tredje gjorde.
    const scale = jamforelseSkala({ benchmark, seatCount, employees, forceEmployees: isSaasProductivity });

    // For mobile/broadband invoices with add-on services, the benchmark covers
    // the base product only (bare SIM / bare fiber). Exclude the add-on from the
    // saving calculation and pass it through to suggestedAnnualCost so we never
    // claim savings on components the benchmark doesn't price.
    const mobileAddonAnnual = (input.categorized.category === 'mobil' && (input.invoice.mobileAddonMonthly ?? 0) > 0)
      ? Math.round(input.invoice.mobileAddonMonthly * 12)
      : 0;
    const broadbandAddonAnnual = (input.categorized.category === 'bredband' && (input.invoice.broadbandAddonMonthly ?? 0) > 0)
      ? Math.round(input.invoice.broadbandAddonMonthly * 12)
      : 0;
    // saas-productivity non-license add-ons (backup, security…) are passed through identically
    // to mobile/bredband add-ons: excluded from savings base, added back to suggestedAnnualCost.
    const addonAnnual = mobileAddonAnnual + broadbandAddonAnnual + saasNonLicenseAddonAnnual;

    // For combined invoices: benchmark only the primary component so we never
    // claim savings on bundled services (e.g. bredband on a mobil invoice) that
    // the category benchmark doesn't cover.
    const isCombined = input.invoice.potentialMixedCategories ?? false;
    const primaryComponentMonthly = input.invoice.primaryComponentMonthly ?? null;
    const primaryComponentAnnual = isCombined && primaryComponentMonthly != null
      ? Math.round(primaryComponentMonthly * 12)
      : null;

    // Guard: for combined invoices where AI failed to return primaryComponentMonthly,
    // the full annualCost cannot reliably be compared against a single-category benchmark.
    // Skip the deterministic override (AI values stand) and mark nonPrimaryAnnual = 0.
    if (isCombined && primaryComponentAnnual == null) {
      result.nonPrimaryAnnual = 0;
      // Exit the financial override block — use AI-provided values as-is.
    } else {

    const comparableAnnualCost = primaryComponentAnnual != null
      ? primaryComponentAnnual                 // bare primary only, addons excluded
      : annualCost - addonAnnual;              // full invoice minus addon pass-throughs

    // Non-primary: portion of the invoice outside the benchmarked component (shown in UI)
    result.nonPrimaryAnnual = primaryComponentAnnual != null
      ? Math.max(0, Math.round(annualCost - primaryComponent
```

### Kommando 19

```bash
sed -n 1720,1800p agents/recommender/recommend.js
```

```
        }));
      }
    }

    if (!result.shouldSwitch && result.avstamningsveto) {
      // Vetot har redan nollat talen; hoppa över den finansiella överskrivningen nedan.
    } else {

    // ── EN TOTALSUMMA FÅR ALDRIG BÄRA ETT BYTESMÅL I EN PER-ENHET-KATEGORI ───────────────────
    // (Obduktionen 2026-08-20, mätt mot produktionsdatabasen.) Att sätta skalan till 1 gjorde
    // ARITMETIKEN rätt men lämnade JÄMFÖRELSEN äppel-mot-päron. Livedatans p25 för mobil i
    // storleksbandet 10–49 anställda är 35 880 kr/år — 897 kr per anställd, alltså 75 kr/mån.
    // Inget mobilabonnemang i Sverige kostar 75 kr/mån. Talet är inte ett per-enhet-pris: det är
    // en TOTAL där kohortens bolag har färre SIM än anställda, och kundens 40-SIM-total ställs
    // mot en kohort vars enhetsantal ingen normaliserat. Att lova ett byte dit vore att lova en
    // besparing som inte finns.
    //
    // Regeln finns redan — för ett annat kort. Branschankaret (2026-06-25) tillåter ENDAST
    // 'real-public', «aldrig real/live_analyses (totalsumma → fel enhet)», och scoren flyttades
    // till getPublicListBenchmark den 19 augusti av exakt samma skäl. Bytesmålet var den tredje
    // konsumenten av samma läsväg och gick kvar den gamla vägen. Nu går alla tre samma väg (regel 1).
    //
    // Fail-closed: finns inget verifierat publikt golv utlöses inget byte (samma disciplin som
    // lfl-grinden). Riktningen är dessutom den säkra under 20 % success fee — listpriset ger en
    // MINDRE påvisad besparing än kohorttotalen, och en besparing vi inte kan belägga ska utebli.
    const _bg = bytesgolv({
      benchmark,
      publiktGolv: getPublicListBenchmark({
        category: input.categorized.category,
        employees: input.customer.employees ?? 1,
      }),
      seatCount, employees, forceEmployees: isSaasProductivity,
    });
    let _golvBenchmark = _bg.golv;
    let _golvSkala = _bg.skala;
    if (_bg.tystnad) {
      console.log(`[totalgrind] ${_bg.tystnad} → inget bytestal (fail-closed)`);
      result.shouldSwitch = false;
      result.recommendationType = 'no_action';
      result.suggestedAnnualCost = null;
      result.suggestedSupplier = null;
      result.savingPerYear = 0;
      result.totalgrind = _bg.tystnad;
    } else if (_bg.byttUt) {
      console.log(`[totalgrind] livedatans p25 (${benchmark.p25} kr) är en totalsumma — ` +
        `bytesmålet räknas mot det verifierade publika golvet ${_golvBenchmark.p25} kr/enhet × ${_golvSkala}`);
    }

    if (result.totalgrind) {
      // Grinden har redan nollat talen; hoppa över beräkningen nedan.
      result.jamforelseKalla = jamforelsensKalla({ useLfl: false, benchmark: null });
    } else {

    const _benchBase = _useLfl
      ? _lflTarget.suggestedAnnualCost - addonAnnual  // strip addon pass-throughs already included in LFL total
      : Math.round(_golvBenchmark.p25 * _golvSkala);

    // Proveniensen följer med talet ut (obduktionen 2026-08-20). Api-lagret gissade den tidigare
    //
```

### Kommando 20

```bash
grep -rn "suggestedAnnualCost" src/pages/TestaFaktura/index.js | head -20
```

```
42:function buildKeyFinding({ cat, supplier, seatCount, adjAnnualCost, suggestedAnnualCost, diagOvPct, licenseOverage }) {
47:    const perNew = Math.round((suggestedAnnualCost ?? 0) / seatCount);
913:          suggestedAnnualCost:  result?.recommendation?.suggestedAnnualCost,
1011:  const diagSugg    = result?.recommendation?.suggestedAnnualCost ?? 0;
1105:    && result?.recommendation?.suggestedAnnualCost
1927:                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år hos <strong>{result.recommendation.suggestedSupplier}</strong>
1934:                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år (Arvos kalkylerade riktpris)
2661:                    {formatNum(result.recommendation.suggestedAnnualCost)}<small>kr/år</small>
2933:                    <span className="bk-to">{formatNum(result.recommendation.suggestedAnnualCost)} kr/år</span>
```

### Kommando 21

```bash
sed -n 2650,2670p src/pages/TestaFaktura/index.js; echo ...; sed -n 1920,1940p src/pages/TestaFaktura/index.js
```

```
                      <Icon name="shield" size={10} stroke={2} />
                      {_switchIsRealPrice ? 'Verifierat listpris' : 'Arvo-verifierad leverantör'}
                    </span>
                  </div>
                </div>
                <div className="switch-offer-body">
                  <div className="sp-from-row">
                    <span className="sp-old">{formatKr(adjAnnualCost)}/år</span>
                    <span className="sp-from-arrow">→</span>
                  </div>
                  <span className="sp-new">
                    {formatNum(result.recommendation.suggestedAnnualCost)}<small>kr/år</small>
                  </span>
                  <span className="sp-save-note">
                    Ni sparar {formatKr(adjGrossSaving)}/år — Arvo tar 20&nbsp;% av det
                  </span>
                </div>
              </div>
              <Button
                type="button"
                $variant="gradient"
...
                        <span className="amount">+{formatKr(animatedNet)}</span>
                        <span className="unit">
                          {isLicensePending
                            ? 'Försäkring kräver FI-licens — vi byter inte själva ännu, men visar gapet.'
                            : isRealPrice && result.recommendation.suggestedSupplier
                              ? (
                                <>
                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år hos <strong>{result.recommendation.suggestedSupplier}</strong>
                                  {' '}· Arvos besparingsarvode {formatKr(adjArvoFee)} (20 %)
                                  {hasHwAdj && <><br /><small style={{ opacity: 0.85 }}>Avser abonnemang och licenser. Om {result.recommendation.suggestedSupplier} absorberar er hårdvaruskuld ({formatNum(_hwTotalRemain)} kr) uppgår nettobesparing till {formatKr(result.recommendation.netSaving)} kr/år.</small></>}
                                </>
                              )
                              : (
                                <>
                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år (Arvos kalkylerade riktpris)
                                  {' '}· Arvos besparingsarvode {formatKr(adjArvoFee)} (20 %)
                                </>
                              )}
                        </span>
                      </SavingsBlock>
                      {!isLicensePending && (
```

### Kommando 22

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t4-kedjan.mjs 2>&1 | tail -10
```

```
[tokens] categorize: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[fingerprint] MATCH key=tele2 category='mobil' confidence 0.95 → 0.95
[tokens] recommend: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[rad-först SKUGGA] pipeline=mobil rad-primär=mobil andel=0.46 flerkategori=true fördelning={ mobil:1745 addon:pbx:994 bredband:899 addon:static_ip:150 }
annualCost                     45456
SVARETS suggestedAnnualCost    33596   (switch-kortet: "45 456 → X kr/år")
KEDJANS benchmarkAnnualCost    28928   ("Arvo-pris" i Beräkningsunderlag)
grossSaving                    11860
kedjan räknar hem?             16528 ===  11860 ? false
kortet räknar hem?             11860 ===  11860 ? true
```

### Kommando 23

```bash
grep -rn "recommendationType\|recommendation_type" lib/invoice-store.js api/ src/ agents/ | grep -v "^agents/recommender/recommend.js" | head -20
```

```
api/test-invoice.mjs:1557:        recommendation.recommendationType  = 'no_action';
api/test-invoice.mjs:1566:        recommendation.recommendationType = 'no_action';
api/test-invoice.mjs:1891:        recommendationType: (recommendation.recommendationType === 'switch' && recommendation.shouldSwitch !== true)
api/test-invoice.mjs:1893:          : (recommendation.recommendationType ?? (recommendation.shouldSwitch ? 'switch' : 'no_action')),
api/send-confirmation.mjs:81:  const isOptimize  = r.recommendationType === 'optimize';
api/send-confirmation.mjs:292:    const isOptimize = result.recommendation.recommendationType === 'optimize';
src/pages/TestaFaktura/index.js:990:  const isOptimize = result?.recommendation?.recommendationType === 'optimize'
agents/recommender/prompt.js:152:  recommendationType: 'optimize'
agents/recommender/prompt.js:250:- Sätt recommendationType: 'optimize'
agents/recommender/prompt.js:259:Använd ALDRIG recommendationType: 'optimize' när subType = 'affärssystem'.
agents/recommender/prompt.js:262:I alla andra fall: recommendationType = 'switch' (shouldSwitch: true) eller 'no_action' (shouldSwitch: false).
agents/recommender/prompt.js:288:      recommendationType: {
agents/recommender/prompt.js:297:          'Årsbelopp (SEK) kunden betalar för en redundant tjänst. Sätt bara om recommendationType är "optimize" — annars null.',
agents/recommender/prompt.js:346:      'recommendationType',
```

### Kommando 24

```bash
sed -n 70,110p api/send-confirmation.mjs; echo "=== 280-310 ==="; sed -n 285,310p api/send-confirmation.mjs
```

```
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function logo(size, id) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#${id})" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;
}

function buildHtml({ extracted: ex, categorized: cat, recommendation: r }) {
  const isOptimize  = r.recommendationType === 'optimize';
  const catLabel    = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
  const isRealPrice = REAL_PRICE_CATEGORIES.has(cat?.category);
  const suppDisplay = isRealPrice
    ? r.suggestedSupplier
    : (CATEGORY_PARTNER_LABEL[cat?.category] ?? 'Verifierad leverantör');

  const saving    = isOptimize ? (r.optimizationSaving ?? 0) : (r.grossSaving ?? 0);
  const arvoFee   = feeOf(saving);
  const netSaving = netOf(saving);

  const heroTitle = isOptimize ? 'Avvecklingen är igångsatt.' : 'Bytet är igångsatt.';
  const heroSub   = isOptimize
    ? `Vi hjälper er aktivera den inbyggda modulen och avveckla det separata abonnemanget hos ${ex.supplier}. Du behöver inte göra något mer.`
    : `Vi förbereder uppsägning hos ${ex.supplier} och tecknar nytt avtal med ${suppDisplay ?? 'den nya leverantören'}. Du behöver inte göra något mer.`;

  const steps = isOptimize ? [
    `Vi kontaktar ${ex.supplier} och initierar avveckling av det separata abonnemanget.`,
    'Du får bekräftelse när abonnemanget är avslutat och modulen är aktiverad.',
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första period utan den dubbla kostnaden.`,
  ] : isRealPrice ? [
    `Vi skickar uppsägning till ${ex.supplier} och hanterar all kommunikation.`,
    `Vi tecknar nytt avtal med ${suppDisplay} — förväntat aktivt inom 2–4 veckor.`,
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första faktura från den nya leverantören.`,
  ] : [
    `Vi kartlägger ert nuvarande avtal hos ${ex.supplier}, inklusive uppsägningstid och avtalsvillkor.`,
    `Arvo kontaktar kvalificerade leverantörer inom ${catLabel.toLowerCase()} och presenterar det starkaste budet baserat på er volym. Du väljer sedan om du vill gå vidare.`,
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första faktura från den nya leverantören.`,
  ];

=== 280-310 ===
  }
  if (!result?.extracted || !result?.recommendation) {
    return send(res, 400, { error: 'Analysdata saknas i request' });
  }

  try {
    const resend    = new Resend(process.env.RESEND_API_KEY);
    const isOptimize = result.recommendation.recommendationType === 'optimize';
   
```

### Kommando 25

```bash
sed -n 860,900p agents/recommender/recommend.js; echo "=== 1480-1500 ==="; sed -n 1480,1500p agents/recommender/recommend.js
```

```
    priceGapScore,
    estimatedAnnualSavingsLow,
    estimatedAnnualSavingsHigh,
    // Bakåtkompatibelt alias = konservativa änden (bandtopp). Kundytor visar BANDET.
    estimatedAnnualSavingsGross: estimatedAnnualSavingsLow,
    feeSignals,
    lease,
    benchmarkSource: bm.source,
    reasoning: parts.join(' '),
  };
}

// Deterministisk saas-finance-rekommendation (Fortnox rätt-storlek). Ren funktion av fakturan
// + verifierade publika priser — ingen AI, ingen estimerad matris. Advisory/review: besparingen
// är en verifierad prisskillnad men realiseras först när kunden bekräftat att behovet ryms.
function fortnoxFinanceRecommendation(input) {
  const zeroUsage = { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 };
  const rs = saasFinanceRightsizing(input.invoice?.lineItems ?? []);
  if (!rs) {
    // Inget igenkänt paket (Fortnox/Spiris) → talfritt offert-läge (aldrig den estimerade matrisen).
    return {
      shouldSwitch: false, requiresQuote: true, recommendationType: 'requires_quote',
      reasoning: 'Vi ser ert bokföringssystem men kan inte säkert läsa vilken paketnivå ni ligger på ur fakturan. ' +
        'Vi gör en manuell genomgång mot Fortnox/Vismas publika prislista istället för att visa en siffra vi inte kan stå för — ' +
        'koppla ert system eller ladda upp en tydligare faktura så rätt-storlekar vi ert abonnemang.',
      revisionGate: 'audited', fortnoxRightsizing: null,
      suggestedSupplier: null, suggestedAnnualCost: null, savingPerYear: null,
      grossSaving: null, arvoFee: null, netSaving: null, optimizationSaving: null,
      licenseOverage: null, overageSavings: null, confidence: 'low', switchSteps: [],
      benchmark: null, usage: zeroUsage,
    };
  }
  // Igenkänt paket → advisory optimize. Siffran är VERIFIERAD (prisskillnad) men i review:
  // optimizationSaving hålls null tills kunden bekräftat (rådgivande revisor). Potentialen
  // lever i fortnoxRightsizing.annualSaving + den kodskrivna reasoning-texten.
  return {
    shouldSwitch: false, requiresQuote: false, recommendationType: 'optimize',
    reasoning: rs.reviewPrompt, revisionGate: 'audited', fortnoxRightsizing: rs,
    suggestedSupplier: `${rs.vendor} ${rs.targetPaket}`, suggestedAnnualCost: null,
    savingPerYear: null, grossSaving: null, arvoFee: null, netSaving: null,
    optimizationSaving: null, licenseOverage: null, overageSavings: null,
=== 1480-1500 ===
  }

  // Accounting-system guard: 'optimize' is never valid when subType is
  // 'affärssystem'. The main accounting license (Fortnox, Visma…) IS the
  // primary product — classifying it as a redundant add-on is logically wrong.
  // The few-shot example for Fortnox e-faktura uses subType 'efaktura'; if the
  // model pattern-matches on supplier name alone and fires optimize for the main
  // license, we strip it here before any financial overrides run.
  if (
    result.recommendationType === 'optimize' &&
    input.categorized.subTy
```

### Kommando 26

```bash
grep -n "requiresVolumeData" agents/recommender/branchindex.js | head; echo ===; grep -n "volumeDataNote" agents/recommender/branchindex.js | head
```

```
342:    requiresVolumeData: true,
781:    requiresVolumeData: true,
996:    requiresVolumeData: true,
1009:    requiresVolumeData: true,
1022:    requiresVolumeData: true,
1041:    requiresVolumeData: true,
1060:    requiresVolumeData: true,
1270:  if (cat.requiresVolumeData) return null;
===
80:    volumeDataNote: 'Elkostnader styrs av faktisk förbrukning i kWh och nätavgift — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
343:    volumeDataNote: 'Billeasingkostnader styrs av antal fordon, modell och avtalsvillkor — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
782:    volumeDataNote: 'Specialiserad mjukvara kräver en djupare analys av era specifika funktionskrav och avtalsvillkor. Vi tar hand om detta manuellt.',
997:    volumeDataNote: 'IT-leasingkostnaden styrs av antal enheter, specifikation (processor, RAM, lagring) och avtalslängd — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er ett korrekt erbjudande.',
1010:    volumeDataNote: 'Serverkostnader styrs av specifikationer (CPU, RAM, bandbredd) och antal servrar — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
1023:    volumeDataNote: 'Kontorsmaterialkostnader styrs av faktisk förbrukning och sortiment — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
1042:    volumeDataNote: 'Städkostnader styrs av lokalyta (kvm) och städfrekvens — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
1061:    volumeDataNote: 'Fraktkostnader styrs av godsvikt, volym och antal leveranser — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
```

### Kommando 27

```bash
grep -n "cloud-infra\|cloud_infra" agents/recommender/branchindex.js | head; sed -n 1000,1015p agents/recommender/branchindex.js
```

```
1012:    note: 'Dedikerade servrar, VPS, colocation och cloud-infrastruktur. Kostnaden beror på serverspecifikationer — per-anställd-benchmark är inte tillämpbar.',
    alternatives: [
      { supplier: 'Dustin Leasing',    positioning: 'Marknadsledande IT-återförsäljare, flexibla leasingavtal, brett sortiment laptops och datorer', reliability: 0.93 },
      { supplier: 'Atea Finansiering', positioning: 'Stark på volymer, dedikerad kundansvarig, kombineras med serviceavtal',                           reliability: 0.94 },
      { supplier: 'Ingram Micro',      positioning: 'Distributörspriser utan mellanhand, bra för standardkonfigurationer i volym',                     reliability: 0.91 },
      { supplier: 'Lokal IT-partner',  positioning: 'Flexibla avtal, snabb service, personlig relation — kan slå de stora på smal volym',              reliability: 0.88 },
    ],
  },

  serverhosting: {
    requiresVolumeData: true,
    volumeDataNote: 'Serverkostnader styrs av specifikationer (CPU, RAM, bandbredd) och antal servrar — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Dedikerade servrar, VPS, colocation och cloud-infrastruktur. Kostnaden beror på serverspecifikationer — per-anställd-benchmark är inte tillämpbar.',
    alternatives: [
      { supplier: 'Hetzner',           positioning: 'Bäst pris/prestanda i Europa — dedikerade servrar och VPS, tyskt datacenter, GDPR-compliant', reliability: 0.94 },
      { supplier: 'OVHcloud',          positioning: 'Bred portfölj VPS → dedikerat, europeisk aktör, konkurrenskraftiga priser',                    reliability: 0.92 },
```

### Kommando 28

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t5-usd-volume.mjs 2>&1 | tail -15; echo "=== FALLBACK_RATE ==="; grep -n "FALLBACK_RATE_USD_SEK\s*=" /home/user/arvo-flow.github.io/agents/recommender/pricing.js
```

```
(node:26415) ExperimentalWarning: Module mocking is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
[test-invoice] extracted: {"supplier":"Amazon Web Services","description":"AWS services","billingPeriod":"monthly","lineItems":1,"recurringAmount":1200,"variableCharges":0,"annualCost":14400,"confidenceScore":0.95}
[tokens] extract: {"cache_write":0,"cache_read":0,"cost_usd":"0.0000"}
[pricing] Live FX-hämtning misslyckades — använder fallback 10.42 SEK/USD (2026-05-22)
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback
route   review_queue Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr)
annualCost i svaret         undefined
  (creditBurn×12×kurs vore  625200 med fallbackkursen)
amount                      12504
startupCreditBalance        undefined undefined
creditUnusedAmount          undefined
creditExpiryMonths          undefined
=== FALLBACK_RATE ===
32:export const FALLBACK_RATE_USD_SEK = 10.42;
```

### Kommando 29

```bash
grep -n "invoiceTotal" agents/test-invoice/extract.js | head -20; echo "=== schema ==="; grep -n "invoice_total\|invoiceTotal" agents/test-invoice/*.js lib/*.js | head -20
```

```
393:  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
655:      invoiceTotal: {
997:    invoiceTotal:              raw.invoiceTotal != null ? Number(raw.invoiceTotal) : null,
1040:    if (extracted.invoiceTotal > 0 && lineSum > 0) {
1041:      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
1042:      const tolerance = Math.max(50, extracted.invoiceTotal * 0.03);
1058:      const forklarar = (v) => Math.abs(lineSum * (1 + v) - extracted.invoiceTotal) <= tolerance;
1081:          `radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr`);
1084:          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
=== schema ===
agents/test-invoice/extract.js:393:  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
agents/test-invoice/extract.js:655:      invoiceTotal: {
agents/test-invoice/extract.js:997:    invoiceTotal:              raw.invoiceTotal != null ? Number(raw.invoiceTotal) : null,
agents/test-invoice/extract.js:1040:    if (extracted.invoiceTotal > 0 && lineSum > 0) {
agents/test-invoice/extract.js:1041:      const diff      = Math.abs(lineSum - extracted.invoiceTotal);
agents/test-invoice/extract.js:1042:      const tolerance = Math.max(50, extracted.invoiceTotal * 0.03);
agents/test-invoice/extract.js:1058:      const forklarar = (v) => Math.abs(lineSum * (1 + v) - extracted.invoiceTotal) <= tolerance;
agents/test-invoice/extract.js:1081:          `radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr`);
agents/test-invoice/extract.js:1084:          reason: `Ring1: radsumma ${lineSum.toLocaleString('sv-SE')} kr ≠ fakturatotal ${extracted.invoiceTotal.toLocaleString('sv-SE')} kr (avvikelse ${diff.toLocaleString('sv-SE')} kr)`,
```

### Kommando 30

```bash
sed -n 650,665p agents/test-invoice/extract.js; echo "=== required fields ==="; sed -n 385,400p agents/test-invoice/extract.js
```

```
      customer_org_number: {
        type: ['string', 'null'],
        description: 'Kundens (fakturamottagarens) organisationsnummer, t.ex. "556777-1111". null om ej angivet på fakturan.',
      },
      invoiceTotal: {
        type: ['integer', 'null'],
        description: 'Fakturans totala "Att betala"-belopp exkl. moms (dividera med 1.25 om enbart ink. moms visas). null om ej tydligt angivet.',
      },
    },
    required: [
      'supplier', 'date', 'description', 'billingPeriod',
      'lineItems', 'confidenceScore', 'outOfScope', 'outOfScopeReason',
      'projectedRecurringAmount',
    ],
  },
=== required fields ===
    null om ej elfaktura.
  el_spot_price_kwh: Nordpool spotpris (råpris/inköpspris) i kr/kWh, ENBART om det framgår
    som en separat rad eller kolumn skild från handelspåslag/marginalavgift.
    Extrahera ENBART om spotpriset är tydligt identifierat — t.ex. "Spotpris (Vägt snitt): 0,42 kr/kWh",
    "Nord Pool Spot: 0,38 kr/kWh", "Inköpspris el: 0,41 kr". Sätts till null om:
    – Fakturan visar ett kombinerat energipris utan separation av spot vs. påslag.
    – Det är ett fastprisavtal (el_contract_type = 'fixed').
    – Spotpriset inte framgår explicit med ord som "spot", "inköp", "Nord Pool" o.d.
  — invoiceTotal: Fakturans totala betalningsbelopp EXKLUSIVE moms — det belopp som framgår
    som "Att betala", "Totalt att betala", "Total", "Amount due", "Total amount due" eller
    liknande slutsumma längst ner på fakturan. Om enbart ink. moms anges: dividera med 1.25.
    Sätt null om totalsumman ej är tydligt angiven eller ej kan fastställas med säkerhet.${FEWSHOT_EXAMPLES ? '\n\n' + FEWSHOT_EXAMPLES : ''}`;

export const EXTRACT_TOOL = {
  name: 'extract_invoice',
  description: 'Extrahera semantiskt klassificerade raddata från en svensk leverantörsfaktura.',
```

### Kommando 31

```bash
grep -rn "invoiceTotal" api/ lib/ | head -20; echo "=== test-pdfs ==="; ls test-pdfs/ 2>/dev/null | head -30
```

```
=== test-pdfs ===
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
```

### Kommando 32

```bash
ls test-pdfs/ | grep -i "usd\|dollar\|micro\|atlassian\|zoom\|slack\|aws\|hubspot"; echo "=== korpus facit sample ==="; node -e "const f=require('/home/user/arvo-flow.github.io/tests/fixtures/korpus-facit.json'); const k=Object.keys(f); console.log(k.length); console.log(JSON.stringify(f[k[0]]).slice(0,600));" 2>&1 | head -20
```

```
atlassian-cloud-manad.pdf
atlassian.pdf
aws-reseller-komplex.pdf
aws-startup-kredit.pdf
hubspot-marketing-pro.pdf
microsoft-direkt-usd.pdf
microsoft-new.pdf
microsoft.pdf
=== korpus facit sample ===
4
[{"balanskrav":{"balanced":true,"judged":0,"violations":0},"category":"bredband","employees":5,"id":"bb-01","industry":"konsult","metrics":{"broadbandAddonMonthly":null,"mobileAddonMonthly":null,"primaryComponentMonthly":null,"secondaryComponentMonthly":null,"secondaryConnectionSpeedMbit":null,"secondarySeatCount":null},"mixed":false,"secondary":null},{"balanskrav":{"balanced":true,"judged":0,"violations":0},"category":"bredband","employees":8,"id":"bb-02","industry":"it-tech","metrics":{"broadbandAddonMonthly":150,"mobileAddonMonthly":null,"primaryComponentMonthly":null,"secondaryComponentMon
```

### Kommando 33

```bash
grep -rl "invoiceTotal" --include=*.json . 2>/dev/null | grep -v node_modules | head -20
```

```
(Bash completed with no output)
```

### Kommando 34

```bash
grep -rn "invoiceTotal" --include=*.mjs --include=*.js . 2>/dev/null | grep -v node_modules | grep -v "^./agents/test-invoice/extract.js" | head -20
```

```
./scripts/probe-stickprov.mjs:38:  console.log(`  fakturatotal (exkl moms, enligt extraktionen): ${ex.invoiceTotal ?? '—'}`);
./scripts/screenshot-verifikationskvitto.mjs:13:  confidenceScore: 0.95, invoiceTotal: 2_181,
./scripts/stress-test.mjs:799:    route:         'review_queue', // Ring 1 correctly catches USD/SEK mismatch (line sum ≠ invoiceTotal)
./tests/obduktion.mjs:214:    supplier: 'Testleverantör AB', invoiceTotal: 10_000, annualCost: 120_000,
./tests/obduktion.mjs:293:      supplier: 'Testleverantör AB', invoiceTotal: 10_000, annualCost: 120_000,
./tests/verifikationskvitto.mjs:26:  invoiceTotal: 2_181, // 1 745 × 1,25 — glappet ÄR momsen
./tests/verifikationskvitto.mjs:51:    e.invoiceTotal = 1_745;
./tests/verifikationskvitto.mjs:69:    delete e.invoiceTotal;
./tests/verifikationskvitto.mjs:91:    e.invoiceTotal = null;
./tests/verifikationskvitto.mjs:103:    e.invoiceTotal = 9_999; // varken tolerans eller moms förklarar
./tests/extract-simple-invoice.mjs:18:  invoiceTotal: 1949, confidenceScore: 0.9,
./tests/extract-simple-invoice.mjs:46:    assert.equal(routeExtraction({ ...base(), invoiceTotal: 2436.25 }).route, 'auto');
./tests/extract-simple-invoice.mjs:50:    assert.equal(routeExtraction({ ...base(), invoiceTotal: 1949 }).route, 'auto');
./tests/extract-simple-invoice.mjs:54:    const r = routeExtraction({ ...base(), invoiceTotal: 5000, lineItems: [rec('Bredband Pro', 1000)] });
./tests/extract-simple-invoice.mjs:64:      invoiceTotal: 5000, confidenceScore: 0.9,
```

### Kommando 35

```bash
sed -n 780,815p scripts/stress-test.mjs
```

```
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount = 40',
        fn: (e) => e.seatCount === 40,
      },
      {
        label: 'Alla licenser klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).every((l) => l.type === 'recurring_subscription'),
      },
      {
        label: 'pricePerSeatMonthly beräknat',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
    ],
  },
  {
    match: /^microsoft-direkt-usd\.pdf$/i,
    route:         'review_queue', // Ring 1 correctly catches USD/SEK mismatch (line sum ≠ invoiceTotal)
    minConfidence: 0.70,
    checks: [
      {
        label: 'seatCount = 15',
        fn: (e) => e.seatCount === 15,
      },
      {
        label: 'Business Premium är recurring_subscription (ej add-on)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && !l.is_addon && /business.*premium/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Copilot märkt som add-on',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && /copilot/i.test(l.description ?? '')
```

### Kommando 36

```bash
grep -n "routeExtraction\|extractInvoice\|fetch(" scripts/stress-test.mjs | head -20
```

```
21:const { extractInvoice, routeExtraction } = await import(
1196:    const extracted = await extractInvoice({ pdfBytes });
1197:    const routing   = routeExtraction(extracted);
```

### Kommando 37

```bash
node -e "
const {extraheraTextlager}=await import('./lib/pdf-textlager.js');
const {readFileSync}=await import('node:fs');
const {text}=await extraheraTextlager(readFileSync('test-pdfs/microsoft-direkt-usd.pdf'));
console.log(text.slice(0,2500));
" --input-type=module 2>&1 | head -60
```

```
Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
Warning: UnknownErrorException: Ensure that the `standardFontDataUrl` API parameter is provided.
Microsoft Ireland Operations Ltd

Org.nr: IE8256796U
One Microsoft Place, Dublin 18, Ireland

FAKTURA

Fakturanr: MS-INV-20260501-
SE-78231
Fakturadatum: 2026-05-01
Förfallodatum: 2026-05-30

Faktureras till:

Tech Startup AB
Norra Bantorget 2, 113 20 Stockholm

OBS: Faktura i USD — växlingskurs 10,42 SEK/USD per 2026-05-01

Beskrivning
 
Antal
 
À-pris
 
Belopp (ex. moms)

Microsoft 365 Business Premium (15 lic.) Maj USD
 
15
 
lic
 
22,00
 
330,00
Microsoft Copilot for M365 (15 lic.) Maj USD
 
15
 
lic
 
30,00
 
450,00

Belopp i USD exkl. moms. SEK-motvärde: 330 USD × 10,42 = 3 438,60 kr | 450 USD × 10,42 = 4 689 kr

Summa exkl. moms:
 
8 127,60 kr
Moms (25 %)
 
2 031,90 kr

ATT BETALA:
 
10 159,50 kr
```

### Kommando 38

```bash
for f in atlassian-cloud-manad.pdf aws-startup-kredit.pdf hubspot-marketing-pro.pdf; do echo "===== $f"; node -e "
const {extraheraTextlager}=await import('./lib/pdf-textlager.js');
const {readFileSync}=await import('node:fs');
const {text}=await extraheraTextlager(readFileSync('test-pdfs/$f'));
console.log(text.replace(/\n{2,}/g,'\n').slice(0,1600));
" --input-type=module 2>/dev/null; done
```

```
===== atlassian-cloud-manad.pdf
Atlassian Network Services, Inc.
Org.nr: US-EIN-98-1234567
c/o Atlassian Pty Ltd, Sydney NSW 2000, Australia
FAKTURA
Fakturanr: ATL-INV-
SE-2026-05-77221
Fakturadatum: 2026-05-01
Förfallodatum: 2026-05-30
Faktureras till:
Produktbolaget Digital AB
Kungsträdgårdsgatan 10, 111 47 Stockholm
Beskrivning
 
Antal
 
À-pris
 
Belopp (ex. moms)
Jira Software Cloud Standard (35 användare) Maj
 
35
 
lic
 
71,50
 
2 502,50
Confluence Cloud Standard (35 användare) Maj
 
35
 
lic
 
52,00
 
1 820,00
Jira Service Management Cloud Team (10 ag.) Maj
 
10
 
lic
 
213,00
 
2 130,00
Summa exkl. moms:
 
6 452,50 kr
Moms (25 %)
 
1 613,125 kr
ATT BETALA:
 
8 065,625 kr
Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer
Faktura i SEK (konverterad från USD vid kurs 10,31). Reverse charge — köparen redovisar moms enligt 1 kap. 2 § ML. Cloud-region: EU
(Frankfurt).
===== aws-startup-kredit.pdf
Amazon Web Services EMEA SARL
Org.nr: LU24682234
38 Avenue John F. Kennedy, L-1855 Luxembourg
FAKTURA
Fakturanr: AWS-INV-
SE-2026-05-00998
Fakturadatum: 2026-05-01
Förfallodatum: 2026-05-30
Faktureras till:
AI Startup AB
Kistagången 20, 164 40 Kista
Beskrivning
 
Antal
 
À-pris
 
Belopp (ex. moms)
AWS EC2 Computing (p3.2xlarge × 720h) — Maj
 
720
 
h
 
28,41
 
20 455,20
AWS SageMaker — Modellträning 440h GPU
 
440
 
h
 
14,22
 
6 256,80
AWS S3 Intelligent-Tiering — 12,4 TB
 
12400 GB
 
0,025
 
310,00
AWS Activate Startup Credit (återstår: $8 200)
 
1
 
st
 
" 18 000,00
 
" 18 000,00
Summa exkl. moms:
 
9 022,00 kr
Moms (25 %)
 
2 255,50 kr
ATT BETALA:
 
11 277,50 kr
Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer
AWS Activate for Startups kredit: $8 200 kvar (ursprungligen $25 000). Kreditförbrukning: $1 730/mån. Kreditperiod upphör 2026-11-30 eller
vid nollsaldo.
===== hubspot-marketing-pro.pdf
HubSpot, Inc.
Org.nr: US-EIN-20-2632810
25 First Street, Cambridge, MA 02141, USA
FAKTURA
Fakturanr: HS-2026-Q2-SE-00881
Fakturadatum: 2026-05-01
Förfallodatum: 2026-05-30
Faktureras till:
Marknadsföringsbyrån Webb AB
Sveavägen 48, 111 34 Stockholm
Beskrivning
 
Antal
 
À-pris
 
Belopp (ex. moms)
HubSpot Marketing Hub Pro (5 lic.) — Kvartal Q2 SEK
 
5
 
lic
 
4 158,00
 
20 790,00
HubSpot Sales Hub Pro (10 lic.) — Kvartal Q2 SEK
 
10
 
lic
 
2 376,00
 
23 760,00
HubSpot Onboarding (engångskostnad, Q1 2026)
 
1
 
st
 
8 000,00
 
8 000,00
Summa exkl. moms:
 
52 550,00 kr
Moms (0 %)
 
0,00 kr
ATT BETALA:
 
52 550,00 kr
Betalning: Bankgiro 5555-5555 · Referens: Fakturanummer
Kvartalsfaktura Q2 2026. Onboarding faktureras engång. Reverse charge. HubSpot EMEA-region: Frankfurt. Valuta: SEK via HubSpot
Checkout.
```

### Kommando 39

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t6-valutatotal.mjs 2>&1 | grep -E "^###|konvertering|Ring1"
```

```
### SEK: route=review_queue  reason=fingerprint_mismatch
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback
### USD: route=review_queue  reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr)
[test-invoice] EUR→SEK konvertering: rate=11.47 source=fallback
### EUR: route=review_queue  reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)
```

### Kommando 40

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && sed -i "s/supplier: 'Atlassian Pty Ltd'/supplier: 'Kanban Systems Inc'/; s/normalizedSupplier: 'atlassian'/normalizedSupplier: 'kanban-systems'/" t6-valutatotal.mjs && node --experimental-test-module-mocks t6-valutatotal.mjs 2>&1 | grep -E "^###|konvertering"
```

```
### SEK: route=auto  reason=—
### USD: route=auto  reason=—
### EUR: route=auto  reason=—
```

### Kommando 41

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && python3 - <<'EOF'
import re
p='harness.mjs'
s=open(p).read()
s=s.replace("export async function run({ extracted, categorized, recommendation, body = {} }) {",
            "export async function run({ extracted, categorized, recommendation, body = {} }) {\n  store.clear();   // annars svarar PDF-cachen (samma pdfHash) på nästa körning")
open(p,'w').write(s)
EOF
node --experimental-test-module-mocks t6-valutatotal.mjs 2>&1 | grep -E "^###|konvertering"
```

```
### SEK: route=auto  reason=—
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback
### USD: route=review_queue  reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr)
[test-invoice] EUR→SEK konvertering: rate=11.47 source=fallback
### EUR: route=review_queue  reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)
```

### Kommando 42

```bash
grep -n "unit_price_ore\|amount_ore\|unitPriceOre\|amountOre" agents/test-invoice/extract.js lib/*.js api/*.mjs | head -20
```

```
agents/test-invoice/extract.js:222:  — OBSERVATIONSFÄLTEN (moms_bas, moms_sats, amount_ore, unit_price_ore): dessa beskriver vad som
agents/test-invoice/extract.js:230:      · amount_ore / unit_price_ore: radens belopp respektive à-pris i ÖRE (heltal), exakt som talet
agents/test-invoice/extract.js:475:            amount_ore: {
agents/test-invoice/extract.js:479:            unit_price_ore: {
agents/test-invoice/extract.js:911:    // OBSERVATION, aldrig härledd (samma disciplin som moms_bas/amount_ore i avstämningsgrinden):
agents/test-invoice/extract.js:933:      amountOre:   Number.isInteger(li.amount_ore)     ? li.amount_ore     : null,
agents/test-invoice/extract.js:934:      unitPriceOre: Number.isInteger(li.unit_price_ore) ? li.unit_price_ore : null,
lib/extraction-integrity.js:166:      // Fältet som löser det fanns redan: `unit_price_ore`/`amount_ore` infördes 12 augusti för
lib/extraction-integrity.js:171:      // den byggdes för. Schemat säger `amount_ore: null om beloppet inte står med öresprecision`,
lib/extraction-integrity.js:177:      // känt tal, inte en härledning av ett okänt. Därför räcker `unit_price_ore`.
lib/extraction-integrity.js:178:      const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
lib/extraction-integrity.js:179:      const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore
lib/saas-rad.js:75:  const ore = rad.amountOre;
lib/saas-rad.js:94:  if (Number.isInteger(rad.unitPriceOre) && rad.unitPriceOre > 0 && rad.unitPriceOre * antal !== ore) {
```

### Kommando 43

```bash
sed -n 140,215p lib/extraction-integrity.js
```

```
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
      const oreA = Number.isFinite(l.unit_price_ore) ? l.unit_price_ore : null;
      const oreB = Number.isFinite(l.amount_ore) ? l.amount_ore
        : (Number.isFinite(l.amount) ? Math.round(l.amount * 100) : null);
      const iOre = oreA != null && oreB != null;
      const apris  = iOre ? oreA : l.unitPrice;
      const belopp = iOre ? oreB : l.amount;
      if (apris == null || !(apris > 0)) continue;

      // ── VI DÖMER INTE DET VI INTE KAN MÄTA ──────────────────────────────────────────────────
      // Första fixen vidgade i stället kronortoleransen till 0,5 kr per enhet — matematiskt
      // korrekt (så stort KAN avrundningsfelet vara) men praktiskt förödande:
```

### Kommando 44

```bash
sed -n 900,960p agents/test-invoice/extract.js
```

```
    projektionskrav = pj.kraschade
      ? { provad: false, ok: false, grund: 'projektionskrav_kraschade', skal: pj.skal }
      : { provad: true, ok: pj.ok, deviationPct: pj.deviationPct, grund: 'ai_projektion_mot_radsumma' };
  } else {
    projected = recurringAmount;
    projektionskrav = { provad: false, ok: true, grund: 'radsumma_deterministisk' };
  }

  return {
    supplier:                 raw.supplier,
    date:                     raw.date,
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
      amount:      li.amount,
      type:        li.type,
      quantity:    li.quantity  ?? null,
      unitPrice:   li.unitPrice ?? null,
      is_addon:    li.is_addon   ?? false,
      addon_type:  li.addon_type  ?? null,
      is_prorata:  li.is_prorata  ?? false,
      // Observationer, aldrig omräkningar. Släpps igenom orörda — normalisering som "lagar"
      // ett saknat värde skulle förvandla tystnad till ett påstående.
      amountOre:   Number.isInteger(li.amount_ore)     ? li.amount_ore     : null,
      unitPriceOre: Number.isInteger(li.unit_price_ore) ? li.unit_price_ore : null,
    })),
    amount:                   (raw.lineItems ?? []).reduce((s, l) => s + l.amount, 0),
    recurringAmount,
    projectedRecurringAmount: projected,
    variableCharges,
    oneTimeFees,
    annualCost:               projected * multiplier,
    recurring:                recurringAmount > 0,
    projektionskrav,
    confidenceScore:          raw.confidenceScore,
    confidenceNotes:          raw.confidenceNotes ?? null,
    outOfScope:               raw.outOfScope ?? false,
    outOfScopeReason:         raw.outOfScopeReason ?? null,
    seatCount:                raw.seatCount ?? null,
    roamingZone:              raw.roaming_zone != null ? Number(raw.roaming_zone) : null,
    notes:                    raw.confidenceNotes ?? null,
    elKwh:            raw.el_kwh != null ? Number(raw.el_kwh) : null,
    elBillingMonth:   raw.el_billing_month ?? null,
    elOmrade:         raw.el_omrade ?? null,
    elFastAvgiftKr:    raw.el_fast_avgift_kr != null ? Number(raw.el_fast_avgift_kr) : null,
    elNatFastAvgiftKr: raw.el_nat_fast_avgift_kr != null ? Number(raw.el_nat_fast_avgift_kr) : null,
    elEnergiPerKwh:   raw.el_energipris_per_kwh != null ? Number(raw.el_en
```

### Kommando 45

```bash
grep -rn "judgeLineArithmetic" --include=*.js --include=*.mjs . | grep -v node_modules
```

```
./agents/test-invoice/extract.js:11:import { judgeLineArithmetic, judgeProjection } from '../../lib/extraction-integrity.js';
./agents/test-invoice/extract.js:1097:    const b2 = judgeLineArithmetic(extracted);
./scripts/korpusdiff.mjs:17: *     kräver en mätning av hur ofta judgeLineArithmetic fyrar på VERKLIGA
./scripts/korpusdiff.mjs:27: * exakt samma computeInvoiceMetrics / computeSecondarySaving / judgeLineArithmetic
./scripts/korpusdiff.mjs:42:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
./scripts/korpusdiff.mjs:92:  const bal = judgeLineArithmetic({ lineItems: fx.lineItems });
./scripts/korpusdiff.mjs:110:// En dömbar rad = den judgeLineArithmetic faktiskt granskar (quantity & unitPrice > 0,
./scripts/probe-grindarna.mjs:35:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
./scripts/probe-grindarna.mjs:95:  const b2 = judgeLineArithmetic(ex);
./scripts/probe-grindmatning.mjs:26:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
./scripts/probe-grindmatning.mjs:49:  const dom = judgeLineArithmetic({ lineItems: rader });
./tests/korpusdiff.mjs:10:// samma computeInvoiceMetrics / computeSecondarySaving / judgeLineArithmetic som
./tests/korpusdiff.mjs:37:  // Mätbänks-lås: judgeLineArithmetic (balanskravet) dömer bara rader med
./tests/obduktion.mjs:25:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
./tests/obduktion.mjs:155:    // judgeLineArithmetic hade `catch { return { balanced: true } }`. Ett undantag mitt i
./tests/obduktion.mjs:159:    const dom = judgeLineArithmetic({
./tests/obduktion.mjs:258:// judgeLineArithmetic bar (OB-09), i grannfunktionen — hittat genom att söka felFAMILJEN i stället
./tests/obduktion.mjs:465:    const r = judgeLineArithmetic({ lineItems: [rad({
./tests/obduktion.mjs:475:    const r = judgeLineArithmetic({ lineItems: [rad({
./tests/obduktion.mjs:484:    const r = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:493:    const r = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:506:    const utanOre = judgeLineArithmetic({ lineItems: [rad({ unitPrice: 1, amount: 3808 })] });
./tests/obduktion.mjs:515:    const ok = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:520:    const fel = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:550:    const r = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:561:    const r = judgeLineArithmetic({ lineItems: [{
./tests/obduktion.mjs:571:    const r = judgeLineArithmetic({ lineItems: [{
./tests/balanskrav.mjs:9:import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
./tests/balanskrav.mjs:29:describe('Balanskravet B2 — judgeLineArithmetic', () => {
./tests/balanskrav.mjs:32:    const r = judgeLineArithmetic({ lineItems: CR88412 });
./tests/balanskrav.mjs:38:    const r = judgeLineArithmetic({ lineItems: TELENOR });
./tests/balanskrav.mjs:45:    const r = judgeLineArithmetic({ lineItems: bad });
./tests/balanskrav.mjs:52:    const r
```

### Kommando 46

```bash
node -e "
import { judgeLineArithmetic } from './lib/extraction-integrity.js';
// Fortum-raden ur bibelns grindmätning: 3400 kWh, à-pris 1,12 kr, belopp 3808.
const raPRODUKTION = { description:'Elförbrukning kWh', type:'variable_usage_x', quantity:3400, unitPrice:1, amount:3808, amountOre:380800, unitPriceOre:112 };
const raTEST       = { description:'Elförbrukning kWh', type:'x', quantity:3400, unitPrice:1, amount:3808, amount_ore:380800, unit_price_ore:112 };
console.log('PRODUKTIONENS radform (camelCase, ur extract.js rad 933-934):');
console.log('  ', JSON.stringify(judgeLineArithmetic({ lineItems:[raPRODUKTION] })));
console.log('TESTERNAS radform (snake_case, som lib/extraction-integrity.js läser):');
console.log('  ', JSON.stringify(judgeLineArithmetic({ lineItems:[raTEST] })));
" --input-type=module
```

```
PRODUKTIONENS radform (camelCase, ur extract.js rad 933-934):
   {"balanced":true,"judged":0,"violations":[]}
TESTERNAS radform (snake_case, som lib/extraction-integrity.js läser):
   {"balanced":true,"judged":1,"violations":[]}
```

### Kommando 47

```bash
sed -n 30,70p scripts/probe-grindmatning.mjs; echo "=== probe-grindarna 85-100 ==="; sed -n 85,100p scripts/probe-grindarna.mjs
```

```
const rows = await aldrigTyst(db`
  SELECT id, created_at, normalized_supplier, supplier, category, line_items_json
  FROM invoice_analyses
  WHERE line_items_json IS NOT NULL
  ORDER BY created_at DESC
  LIMIT 500
`, 'läsning av invoice_analyses (radposter)');

console.log(`\n═══ BALANSKRAVET (B2) MOT VERKLIGA RADER · ${rows.length} fakturor med radposter ═══\n`);

let fakturorMedDom = 0, faktureorFallda = 0, raderDomda = 0, raderFallda = 0;
const skalRakning = new Map();

for (const r of rows) {
  let rader = r.line_items_json;
  if (typeof rader === 'string') { try { rader = JSON.parse(rader); } catch { rader = null; } }
  if (!Array.isArray(rader) || !rader.length) continue;

  const dom = judgeLineArithmetic({ lineItems: rader });
  if (dom.judged === 0) continue;              // ingen rad bar både antal och à-pris → ingen åsikt

  fakturorMedDom++;
  raderDomda += dom.judged;
  if (dom.violations.length) {
    faktureorFallda++;
    raderFallda += dom.violations.length;
    for (const v of dom.violations) {
      skalRakning.set(v.reason, (skalRakning.get(v.reason) ?? 0) + 1);
    }
    console.log(`  ✗ ${(r.normalized_supplier || r.supplier || '?').slice(0, 24).padEnd(24)} ${String(r.category).slice(0, 18).padEnd(18)} ${new Date(r.created_at).toISOString().slice(0, 10)}`);
    for (const v of dom.violations.slice(0, 3)) {
      console.log(`      «${String(v.line ?? '').slice(0, 46)}» väntat ${v.expected} · faktiskt ${v.actual} · ${v.reason}`);
    }
  }
}

console.log('\n' + '─'.repeat(72));
console.log(`fakturor med dömbara rader (antal OCH à-pris):  ${fakturorMedDom}`);
console.log(`rader dömda:                                    ${raderDomda}`);
console.log(`rader FÄLLDA:                                   ${raderFallda}`);
=== probe-grindarna 85-100 ===
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

### Kommando 48

```bash
grep -n "line_items_json" lib/invoice-store.js | head
```

```
169:        await db`UPDATE invoice_analyses SET line_items_json = ${JSON.stringify(extracted.lineItems)}::jsonb WHERE id = ${id}`;
172:          await db`ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS line_items_json JSONB`;
173:          await db`UPDATE invoice_analyses SET line_items_json = ${JSON.stringify(extracted.lineItems)}::jsonb WHERE id = ${id}`;
174:        } catch (err2) { console.error('[invoice-store] line_items_json:', err2.message); }
209:  ['line_items_json', 'JSONB'],
239:        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
255:            seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
307:        seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
323:            seat_count, price_per_seat_monthly, lead_finding_json, contract_end_date, health_score, triage_reason, contract_terms_json, invoice_number, line_items_json
```

### Kommando 49

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t7-balanskrav.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens|extracted:|categorized|rad-först|fingerprint"
```

```
route: auto
 schemakrav   ej_provbar  analysen kördes utan schemadom
 radsumma     ok          radsumman stämmer mot fakturatotalen (960 kr)
 balanskrav   ej_provbar  inga rader bär både antal och à-pris
```

### Kommando 50

```bash
sed -n 1,80p lib/contract-clock.js
```

```
// lib/contract-clock.js — Maktkalendern på riktigt: den deterministiska kontraktsklockan.
//
// Zero Trust (regel 3): datumet kommer ur kundens EGEN faktura. `servicePeriodEnd` sätts av
// extract.js ENDAST när fakturan uttalar bindningstid/avtalstid med ett slutdatum (aldrig nästa
// faktureringsdatum — se extract.js rad 144–165). Saknas det riktiga slutdatumet visar vi inget:
// tystnad är default (regel 4 — precision eller tystnad). Vi gissar aldrig en bindningstid.
//
// Producerar ett fynd i FindingCard-form (samma komponent som forensik-fynden, regel 1 — en
// sanning), men med tone:'watch' — klockan är vaktens lugna besked, inte ett amber-larm:
// "Ni är bundna till [datum] · [N dagar kvar] · vi bevakar och agerar innan tyst förnyelse."
//
// EN källa för klock-copyn: både auto-rutten (faktura med rekommendation) och monitoring-rutten
// (terminalt avtalslås) läser härifrån, så de två ytorna aldrig kan säga olika om samma avtal.

const DAY_MS = 24 * 60 * 60 * 1000;

function fmtSvDate(d) {
  const s = new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/**
 * @param {object} args
 * @param {string|null} args.servicePeriodEnd     - ISO YYYY-MM-DD, avtalets bindningsslut (ur fakturan)
 * @param {number|null} args.cancellationNoticeDays - uppsägningstid i dagar (ur fakturan), eller null
 * @param {string|null} args.supplier             - leverantörsnamn (för copyn)
 * @param {Date}        args.today                - referensdatum (default nu) — injicerbart för test
 * @returns {object|null} contract-clock-fynd (FindingCard-form) eller null när inget verkligt bindningsslut finns
 */
export function contractClockFinding({ servicePeriodEnd, cancellationNoticeDays = null, supplier = null, today = new Date() } = {}) {
  if (!servicePeriodEnd) return null;
  const end = startOfDay(new Date(servicePeriodEnd));
  if (Number.isNaN(end.getTime())) return null;

  const t0 = startOfDay(today);
  const daysLeft = Math.round((end - t0) / DAY_MS);
  if (daysLeft <= 0) return null; // bindningen redan löpt ut → ingen klocka (route hanterar förfallet)

  const notice = (cancellationNoticeDays != null && Number(cancellationNoticeDays) > 0)
    ? Math.round(Number(cancellationNoticeDays))
    : null;

  // Sista dagen att säga upp innan tyst förnyelse = bindningsslut − uppsägningstid.
  const actBy = notice ? startOfDay(new Date(end.getTime() - notice * DAY_MS)) : null;
  const actByFuture = actBy && actBy > t0;
  const daysToAct = actByFuture ? Math.round((actBy - t0) / DAY_MS) : null;

  const sup = supplier && String(supplier).trim() ? String(supplier).trim() : 'er nuvarande leverantör';
  const endStr = fmtSvDate(end);

  let text;
  if (notice && actByFuture) {
    text = `Avtalet med ${sup} löper till ${endStr}. Uppsägningstiden är ${notice} dagar — sista dagen att säga
```

### Kommando 51

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t8-lock.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens|extracted:|categorized:|rad-först|fingerprint"
```

```
[integrity] overrides: [{"field":"annualCost","original":45000,"corrected":540000,"reason":"annual_cost_deviates_92pct_from_recurring_x_period","severity":"info"}]
idag                  2026-08-24
route                 monitoring
contractLocked        true
monitoringDate        2026-10-01
contractClock.title   Ni är bundna till 31 december 2026
contractClock.actBy   2026-10-02 · dagar kvar att agera: 39
rekommendation i svaret: — (ingen)
```

### Kommando 52

```bash
grep -n "annual_cost_deviates" -B 30 lib/extraction-integrity.js | head -60
```

```
85-    }
86-
87-    // 4. Korsvalidering: seatCount × pricePerSeat ≈ fakturabeloppp
88-    const seats = extracted.seatCount;
89-    const pps   = extracted.pricePerSeatMonthly;
90-    if (seats > 0 && pps > 0 && invoiceAmount > 0) {
91-      const expected  = seats * pps;
92-      const deviation = Math.abs(expected - invoiceAmount) / invoiceAmount;
93-      if (deviation > 0.15) {
94-        overrides.push({
95-          field:    'seatCountCrossCheck',
96-          original: `${seats} × ${pps} = ${expected}`,
97-          corrected: invoiceAmount,
98-          reason:   `seat_x_price_deviates_${Math.round(deviation * 100)}pct_from_invoice`,
99-          severity: 'warning',
100-        });
101-      }
102-    }
103-
104-    // 5. annualCost konsistens: om recurring, annualCost ska ≈ recurringAmount × period
105-    if (result.recurring && extracted.recurringAmount > 0 && extracted.annualCost > 0) {
106-      const months   = monthsBetween(extracted.billingPeriod) ?? 1;
107-      const multiplier = months > 0 ? Math.round(12 / months) : 12;
108-      const expected   = extracted.recurringAmount * multiplier;
109-      const deviation  = Math.abs(extracted.annualCost - expected) / expected;
110-      if (deviation > 0.02) {
111-        overrides.push({
112-          field:    'annualCost',
113-          original: extracted.annualCost,
114-          corrected: expected,
115:          reason:   `annual_cost_deviates_${Math.round(deviation * 100)}pct_from_recurring_x_period`,
```

### Kommando 53

```bash
grep -n "function monthsBetween" -A 15 lib/extraction-integrity.js; echo "=== severity/apply ==="; sed -n 115,140p lib/extraction-integrity.js
```

```
14:function monthsBetween(dateStr) {
15-  if (!dateStr) return null;
16-  const parts = dateStr.split(/[-–]/).map(s => s.trim());
17-  if (parts.length !== 2) return null;
18-  const [from, to] = parts.map(s => new Date(s));
19-  if (isNaN(from) || isNaN(to)) return null;
20-  const diff = (to - from) / (1000 * 60 * 60 * 24);
21-  if (diff >= 25 && diff <= 35) return 1;
22-  if (diff >= 85 && diff <= 95) return 3;
23-  if (diff >= 355 && diff <= 370) return 12;
24-  return null;
25-}
26-
27-/**
28- * Kör deterministiska integritetskontroller på extraherade fakturadata.
29- *
=== severity/apply ===
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
```

### Kommando 54

```bash
grep -n "saveIntegrityOverrides" -A 40 lib/labeled-corrections.js | head -60
```

```
50:export async function saveIntegrityOverrides(overrides, { analysisId, category, supplier } = {}) {
51-  if (!overrides?.length) return;
52-  await Promise.all(
53-    overrides.map(o =>
54-      saveCorrection({
55-        analysisId,
56-        field:          o.field,
57-        originalValue:  o.original,
58-        correctedValue: o.corrected,
59-        reason:         o.reason,
60-        correctedBy:    'system',
61-        severity:       o.severity ?? 'fix',
62-        category,
63-        supplier,
64-      }),
65-    ),
66-  );
67-}
68-
69-/**
70- * Hämtar korrektioner för admin-granskning och mönsteranalys.
71- */
72-export async function getCorrections({ limit = 100, category = null, field = null, correctedBy = null } = {}) {
73-  const db = getDb();
74-  if (!db) return [];
75-  try {
76-    return await db`
77-      SELECT
78-        lc.*,
79-        ia.supplier AS invoice_supplier,
80-        ia.route,
81-        ia.created_at AS invoice_created_at
82-      FROM labeled_corrections lc
83-      LEFT JOIN invoice_analyses ia ON ia.id = lc.analysis_id
84-      WHERE (${category} IS NULL OR lc.category = ${category})
85-        AND (${field}    IS NULL OR lc.field    = ${field})
86-        AND (${correctedBy} IS NULL OR lc.corrected_by = ${correctedBy})
87-      ORDER BY lc.created_at DESC
88-      LIMIT ${limit}
89-    `;
90-  } catch (err) {
```

### Kommando 55

```bash
grep -n "severity\|field" scripts/build-fewshot.mjs | head -25
```

```
(Bash completed with no output)
```

### Kommando 56

```bash
sed -n 1,60p scripts/build-fewshot.mjs
```

```
#!/usr/bin/env node
// scripts/build-fewshot.mjs
// Steg 3 i Teach Loop: väljer bästa representativa fakturor per kategori
// bland godkända resultat och skriver agents/test-invoice/fewshot-examples.js.
// Nästkommande Opus-anrop ser dessa som inbäddade facit-exempel.
//
// Användning:
//   node scripts/build-fewshot.mjs               # max 2 per kategori
//   node scripts/build-fewshot.mjs --max 3        # max 3 per kategori
//   node scripts/build-fewshot.mjs --dry-run      # visa utan att skriva
//
// PINNED_FILES: alltid inkluderade oavsett poäng — lägg till här när ett nytt
// systematiskt AI-misstag identifierats och rätt extraktion finns i results.json.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const RESULTS_PATH  = join(ROOT, 'teach-loop', 'results.json');
const FEWSHOT_PATH  = join(ROOT, 'agents', 'test-invoice', 'fewshot-examples.js');

if (!existsSync(RESULTS_PATH)) {
  console.error('teach-loop/results.json saknas. Kör batch-import.mjs först.');
  process.exit(1);
}

// ── CLI-argument ──────────────────────────────────────────────────────────────
const args   = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const maxIdx = args.indexOf('--max');
const MAX_PER_CATEGORY = maxIdx >= 0 ? parseInt(args[maxIdx + 1], 10) : 2;
const TOTAL_CAP = 15; // höjt från 10 — fler kategorier behöver täckas

// ── Pinnade obligatoriska exempel ─────────────────────────────────────────────
// Dessa inkluderas ALLTID oavsett poäng. Syfte: täcka kända AI-felmönster
// som scoring-funktionen annars aldrig väljer (enkla fakturor med låg poäng).
//
// Lägg till ny fil här när:
//   1. Du hittar ett systematiskt fel i ett fakturaformat
//   2. Du verifierat korrekt extraktion via stress-test.mjs <fil>
//   3. results.json har ett approved entry för filen
const PINNED_FILES = new Set([
  'tele2-mobil-enkel.pdf',    // Visar: "Fast månadsavgift" är recurring_subscription
  'comviq-mobil-budget.pdf',  // Visar: "Datatillägg X GB" är variable_usage
  'microsoft-new.pdf',        // Visar: M365 BP (57 seats) + Molnbackup add-on (recurring)
  'salesforce-enterprise.pdf', // Visar: annual SaaS med rabattrad som recurring
]);

// ── Handskrivna exempel — för fakturamönster som saknas i teach-loop ──────────
// Används när korrekt beteende är känt men ingen syntetisk PDF finns i results.json.
// Format: samma som formatExample() producerar.
const HANDCRAFTED_EXAMPLES = `
── Fortnox AB (saas-finance) ──
  recurring_subscription | is_addon:false                      | "Bokföring (5 användare) — maj 2026"  745 kr
  recurring_subscription | is_addon:false                      | "Fakturering (5 användare) — maj 2026"  745 kr
  recurring_subscription | is_addon:false                      | "Lön (2 användare) — maj 2026"  298 kr
  recurring_subscr
```

### Kommando 57

```bash
grep -rn "pdfRawHeader" src/ api/ agents/ lib/ scripts/ | head
```

```
api/test-invoice.mjs:576:      const rawHeader = body.pdfRawHeader ?? '';
```

### Kommando 58

```bash
grep -rn "volume_data_required\|volumeDataNote\|creditExpiryMonths\|startupCreditBalance" src/ | head -20
```

```
src/pages/TestaFaktura/index.js:1620:                {result.reason === 'volume_data_required' ? (
src/pages/TestaFaktura/index.js:1624:                      {result.volumeDataNote ||
src/pages/TestaFaktura/index.js:1627:                    {result.creditExpiryMonths != null && (
src/pages/TestaFaktura/index.js:1631:                            ? `⚠ Krediter förfaller ${result.creditExpiryDate} — ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} kvar`
src/pages/TestaFaktura/index.js:1632:                            : `Era startup-krediter räcker ca ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} till`}
src/pages/TestaFaktura/index.js:1636:                          betalar ingenting tack vare kvarvarande kredit ({result.startupCreditCurrency} {result.startupCreditBalance?.toLocaleString('sv-SE')}).
```

### Kommando 59

```bash
sed -n 1615,1660p src/pages/TestaFaktura/index.js
```

```
                  </>
                )}
              </NoSwitchBlock>
            ) : result.route === 'review_queue' ? (
              <NoSwitchBlock>
                {result.reason === 'volume_data_required' ? (
                  <>
                    <strong>Kräver offert — våra experter kikar på detta.</strong>
                    <p>
                      {result.volumeDataNote ||
                        'Kostnaden för denna kategori styrs av specifika volymer och specifikationer, inte antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.'}
                    </p>
                    {result.creditExpiryMonths != null && (
                      <CreditAlert style={result.creditWillExpireUnused ? { background: '#FEF3C7', borderColor: 'rgba(217,119,6,.25)' } : undefined}>
                        <strong>
                          {result.creditWillExpireUnused
                            ? `⚠ Krediter förfaller ${result.creditExpiryDate} — ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} kvar`
                            : `Era startup-krediter räcker ca ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} till`}
                        </strong>
                        <p>
                          Ni förbrukar {result.startupCreditCurrency} {result.startupCreditMonthlyBurn?.toLocaleString('sv-SE')}/mån men
                          betalar ingenting tack vare kvarvarande kredit ({result.startupCreditCurrency} {result.startupCreditBalance?.toLocaleString('sv-SE')}).
                          {result.creditWillExpireUnused
                            ? ` Vid nuvarande förbrukningstakt förfaller ca ${result.startupCreditCurrency} ${result.creditUnusedAmount?.toLocaleString('sv-SE')} oanvänt. Överväg att skala upp era resurser eller kontakta leverantören om förlängning — sedan beväpnar Arvo er med exakt vilken prisnivå ni ska kräva.`
                            : ' Nu är rätt tid att planera ert molnavtal — vi visar er exakt vilken prisnivå ni ska kräva innan fakturorna börjar landa.'}
                        </p>
                      </CreditAlert>
                    )}
                  </>
                ) : result.reason === 'foreign_currency' ? (
                  <>
                    <strong>Fakturan är i {result.currency} — kontakta oss.</strong>
                    <p>
                      Vi stödjer SEK och EUR. För övriga valutor, kontakta oss så hjälper vi er manuellt.
                    </p>
                  </>
                ) : result.reason === 'no_benchmark' ? (
                  <>
                    <strong>Utanför vår nuvarande täckning.</strong>
                    <p>
                      Vi har ännu inte benchmarkdata för denna leverantörskategori.
                      Vi noterar fakturan och återkommer när vi kan göra en fullständig analys.
                    </p>
                  </>
               
```

### Kommando 60

```bash
grep -n "suggested_annual_cost" lib/*.js api/*.mjs src/**/*.js 2>/dev/null | head -20
```

```
lib/briefing-generator.js:8://   overpaying     — annual_cost >20% above suggested_annual_cost, no switch flag
lib/briefing-generator.js:35:             annual_cost, suggested_annual_cost, net_saving, gross_saving,
lib/briefing-generator.js:63:    const pctOver = a.suggested_annual_cost > 0
lib/briefing-generator.js:64:      ? Math.round(((a.annual_cost - a.suggested_annual_cost) / a.suggested_annual_cost) * 100)
lib/briefing-generator.js:129:    if (!a.suggested_annual_cost || !a.annual_cost) continue;
lib/briefing-generator.js:130:    const pct = ((Number(a.annual_cost) - Number(a.suggested_annual_cost)) / Number(a.suggested_annual_cost)) * 100;
lib/briefing-generator.js:138:      subheadline: `Marknadsnivå: ${fmt(a.suggested_annual_cost)} kr/år — ni betalar ${fmt(a.annual_cost)} kr/år`,
lib/briefing-generator.js:140:        primary:   { value: Math.round(Number(a.annual_cost) - Number(a.suggested_annual_cost)), label: 'kr/år i överbetalning' },
lib/briefing-generator.js:150:        estimatedNetSaving: Math.round((Number(a.annual_cost) - Number(a.suggested_annual_cost)) * 0.7),
lib/invoice-store.js:106:        annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:237:        annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:253:            annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:272:          annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:305:        annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:321:            annual_cost, suggested_annual_cost, gross_saving, net_saving,
lib/invoice-store.js:339:          annual_cost, suggested_annual_cost, gross_saving, net_saving,
api/outcome-survey.mjs:37:             annual_cost, suggested_annual_cost, net_saving, user_email
api/outcome-survey.mjs:62:          ${a.suggested_annual_cost ?? null},
src/lib/holdings.js:44:// Tidigare läste den suggested_annual_cost medan pillen läser net_saving → de kunde säga emot varandra
src/lib/holdings.js:156:    const ovPct = a.annual_cost > 0 && a.suggested_annual_cost > 0
```

### Kommando 61

```bash
sed -n 95,130p lib/invoice-store.js
```

```
  const hashedFp = hashFp(fingerprint);

  const seats = (typeof seatCount === 'number' && seatCount > 0) ? seatCount : null;
  const pricePerSeatMonthly = seats && extracted?.annualCost > 0
    ? Math.round(extracted.annualCost / seats / 12)
    : null;

  try {
    const rows = await db`
      INSERT INTO invoice_analyses (
        fingerprint, pdf_hash, supplier, normalized_supplier, category,
        annual_cost, suggested_annual_cost, gross_saving, net_saving,
        should_switch, route, industry, employees, billing_period, user_email,
        seat_count, price_per_seat_monthly
      ) VALUES (
        ${hashedFp},
        ${pdfHash},
        ${extracted?.supplier ?? ''},
        ${categorized?.normalizedSupplier ?? null},
        ${categorized?.category ?? 'uncategorized'},
        ${extracted?.annualCost ?? null},
        ${recommendation?.suggestedAnnualCost ?? null},
        ${recommendation?.grossSaving ?? null},
        ${recommendation?.netSaving ?? null},
        ${recommendation?.shouldSwitch ?? false},
        ${route},
        ${industry},
        ${employees},
        ${extracted?.billingPeriod ?? null},
        ${userEmail ?? null},
        ${seats},
        ${pricePerSeatMonthly}
      )
      ON CONFLICT (fingerprint, pdf_hash) DO UPDATE
        SET user_email            = COALESCE(EXCLUDED.user_email, invoice_analyses.user_email),
            seat_count            = COALESCE(EXCLUDED.seat_count, invoice_analyses.seat_count),
```

### Kommando 62

```bash
grep -rn "storeGateEmail" api/ | head; echo "=== confidence i UI ==="; grep -rn "recommendation?.confidence\|recommendation.confidence" src/ | head
```

```
api/test-invoice.mjs:147:async function storeGateEmail(email, fingerprint) {
api/test-invoice.mjs:166:    console.error('[gate] storeGateEmail error:', err.message);
=== confidence i UI ===
```

### Kommando 63

```bash
grep -rn "gate_emails" --include=*.mjs --include=*.js . | grep -v node_modules | head -20
```

```
./api/test-invoice.mjs:152:      CREATE TABLE IF NOT EXISTS gate_emails (
./api/test-invoice.mjs:161:      INSERT INTO gate_emails (email, fingerprint)
./scripts/notify-price-changes.mjs:13: *   2. Hitta kunder      — getAffectedCustomers() via gate_emails JOIN invoice_analyses
./lib/price-alert-store.js:14:// från en given leverantör och har en känd e-postadress i gate_emails.
./lib/price-alert-store.js:30:      SELECT email, fingerprint FROM gate_emails WHERE fingerprint IS NOT NULL
```

### Kommando 64

```bash
sed -n 20,75p lib/price-alert-store.js
```

```
// category         — om angiven: filtrerar även på exakt kategori
//
// Returnerar [{ email, supplier, category, annualCost, grossSaving, netSaving, analyzedAt }]
export async function getAffectedCustomers({ supplierKeyword, category }) {
  const db = getDb();
  if (!db) return [];

  try {
    // Steg 1: Hämta alla e-post ↔ rå-fingerprint-kopplingar
    const emailRows = await db`
      SELECT email, fingerprint FROM gate_emails WHERE fingerprint IS NOT NULL
    `;
    if (!emailRows.length) return [];

    // Steg 2: Bygg hashat-fingerprint → [email] map (invoice_analyses lagrar hashed fp)
    const fpToEmails = new Map();
    for (const row of emailRows) {
      const hashed = hashFp(row.fingerprint);
      if (!fpToEmails.has(hashed)) fpToEmails.set(hashed, []);
      fpToEmails.get(hashed).push(row.email);
    }
    const hashedFps = [...fpToEmails.keys()];

    // Steg 3: Hämta analyser som matchar leverantör + (valfritt) kategori.
    // Inkluderar seat_count för per-säte-beräkning i notify-price-changes.mjs.
    const analyses = category
      ? await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, seat_count, created_at
          FROM invoice_analyses
          WHERE normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
            AND category = ${category}
            AND route = 'auto'
            AND fingerprint = ANY(${hashedFps})
          ORDER BY created_at DESC
        `
      : await db`
          SELECT fingerprint, normalized_supplier, category,
                 annual_cost, gross_saving, net_saving, seat_count, created_at
          FROM invoice_analyses
          WHERE normalized_supplier ILIKE ${'%' + supplierKeyword + '%'}
            AND route = 'auto'
            AND fingerprint = ANY(${hashedFps})
          ORDER BY created_at DESC
        `;

    // Steg 4: Koppla e-post till analyser, deduplicera på e-post
    const result = [];
    const seenEmails = new Set();

    for (const analysis of analyses) {
      const emails = fpToEmails.get(analysis.fingerprint) ?? [];
      for (const email of emails) {
        if (!seenEmails.has(email)) {
          seenEmails.add(email);
          result.push({
```

### Kommando 65

```bash
grep -rn "storeGateEmail" --include=* . 2>/dev/null | grep -v node_modules | grep -v "\.git/"; echo "--- cron ---"; grep -n "getAffectedCustomers" -B3 -A20 api/cron/run-price-alerts.mjs | head -50
```

```
./api/test-invoice.mjs:147:async function storeGateEmail(email, fingerprint) {
./api/test-invoice.mjs:166:    console.error('[gate] storeGateEmail error:', err.message);
--- cron ---
16-import { Resend } from 'resend';
17-import { getDb } from '../../lib/db.js';
18-import {
19:  getAffectedCustomers,
20-  getSegmentStats,
21-  hasAlertBeenSent,
22-  markAlertSent,
23-} from '../../lib/price-alert-store.js';
24-import { computeImpactKr, parseCheckPrice } from '../../lib/price-impact.js';
25-import { netOf } from '../../lib/fee.js';
26-import { extractSupplierKeyword } from '../../lib/supplier-keyword.js';
27-import { catLabel } from '../../lib/format.js';
28-
29-export const config = { maxDuration: 60 };
30-
31-const FROM     = process.env.RESEND_FROM    ?? 'Arvo Flow <<e-post maskerad>>';
32-const BASE_URL = process.env.ARVO_BASE_URL  ?? 'https://arvoflow.se';
33-
34-function send(res, status, body) {
35-  res.statusCode = status;
36-  res.setHeader('Content-Type', 'application/json');
37-  res.setHeader('Cache-Control', 'no-store');
38-  res.end(JSON.stringify(body));
39-}
--
93-    const alreadySent = await hasAlertBeenSent({ monitorRunId, supplier: keyword, category });
94-    if (alreadySent) { totalSkipped++; continue; }
95-
96:    const customers = await getAffectedCustomers({ supplierKeyword: keyword, category });
97-    if (!customers.length) {
98-      await markAlertSent({ monitorRunId, supplier: keyword, category, emailsSent: 0, totalImpactKr: 0 });
99-      continue;
100-    }
101-
102-    const segStats = await getSegmentStats({ category, supplierKeyword: keyword });
103-    let groupSent = 0, groupImpact = 0;
104-
105-    for (const customer of customers) {
106-      if (!resend) continue;
107-
108-      const supplierName = (customer.supplier || keyword).replace(/\b\w/g, c => c.toUpperCase());
109-      const seatCount    = customer.seatCount ?? null;
110-      const primaryAlert = groupAlerts[0];
111-
112-      // Deterministisk impact via parseCheckPrice + computeImpactKr
113-      const currentPrice = parseCheckPrice(primaryAlert?.check ?? '');
114-      const haiku        = primaryAlert?.haiku ?? null;
115-      const impact = currentPrice && haiku?.extractedNumeric != null
116-        ? computeImpactKr({
```

### Kommando 66

```bash
grep -rn "api/test-invoice" -A 12 src/pages/TestaFaktura/index.js | grep -n "body\|email\|fingerprint\|JSON.stringify" | head -20
```

```
4:587-          body: JSON.stringify({
18:672-        body: JSON.stringify({
24:678-          fingerprint,
26:680-          email: overrideEmail || undefined,
```

### Kommando 67

```bash
sed -n 665,690p src/pages/TestaFaktura/index.js
```

```
      setPhase('extract');
      t1 = setTimeout(() => setPhase('categorize'), 6000);
      t2 = setTimeout(() => setPhase('recommend'),  14000);

      const res = await fetch('/api/test-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          industry,
          employees: Number(employees),
          revenue: revenue === '' ? null : Number(revenue),
          token: freshToken,
          fingerprint,
          bypass: bypass || undefined,
          email: overrideEmail || undefined,
          userEmail: authEmail || undefined,
        }),
      });

      clearTimeout(t1);
      clearTimeout(t2);

      const data = await res.json().catch(() => ({}));

      // Sparande-kvot nådd — visa resultatet men öppna konverterings-CTA direkt
```

### Kommando 68

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && sed -e "s|mock.module(U('lib/kv.js')|export const sqlLog = [];\nconst fakeDb = (strings, ...vals) => { sqlLog.push(strings.join('?').replace(/\\\\s+/g, ' ').trim()); return Promise.resolve([]); };\nmock.module(U('lib/db.js'), { namedExports: { getDb: () => fakeDb } });\nmock.module(U('lib/kv.js')|" harness.mjs > harness-db.mjs && grep -n "fakeDb\|sqlLog" harness-db.mjs | head
```

```
32:export const sqlLog = [];
33:const fakeDb = (strings, ...vals) => { sqlLog.push(strings.join('?').replace(/\s+/g, ' ').trim()); return Promise.resolve([]); };
34:mock.module(U('lib/db.js'), { namedExports: { getDb: () => fakeDb } });
```

### Kommando 69

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t9-gateemail.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens\]|extracted:|categorized:|rad-först|fingerprint\]"
```

```
[integrity] overrides: [{"field":"seatCountCrossCheck","original":"10 × 290 = 2900","corrected":34800,"reason":"seat_x_price_deviates_92pct_from_invoice","severity":"warning"}]
[fingerprint:pre-route] tele2: confidence 0.95 → 0.95
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

### Kommando 70

```bash
sed -n 1,120p lib/invoice-metrics.js
```

```
/**
 * Pure helpers for computing per-invoice financial metrics from extracted line items.
 *
 * Design principle: AI tags each line semantically (is_addon, addon_type).
 * Code does all arithmetic and categorisation. No AI arithmetic in this layer.
 */

// addon_type values that belong exclusively to the mobile-telephony domain
const MOBILE_ADDON_TYPES = new Set(['pbx', 'voip']);
// addon_type values that belong exclusively to the broadband domain
const BROADBAND_ADDON_TYPES = new Set(['static_ip', 'firewall', 'sla']);

// Safety-net regex: catches known addon descriptions when AI omits is_addon flag.
// Applied ONLY as a fallback when is_addon is missing or false.
const ADDON_FALLBACK_RX = {
  mobil:    /molnväxel|cloud[\s-]?pbx|\bpbx\b|ip-?pbx|teams[\s-]?direkt|teams[\s-]?integr|pstn|\bvoip\b/i,
  bredband: /statisk[\s-]?ip|managed[\s-]?firewall|brandv[äa]gg|extra[\s-]?sla|sla[\s-]?uppgr|\butm\b/i,
};

// Descriptions that indicate a line belongs to the OTHER category on combined invoices.
const CROSS_CATEGORY_RX = {
  mobil:    /bredband|fiber|internet|adsl|ftth/i,       // primary=mobil → exclude broadband lines
  bredband: /\bsim\b|mobilabonnemang|mobiltelefoni/i,   // primary=bredband → exclude mobile lines
};

// Same regex but in reverse: used to FIND the secondary category's lines.
const SECONDARY_CATEGORY_RX = {
  mobil:    /bredband|fiber|internet|adsl|ftth/i,          // secondary=bredband when primary=mobil
  bredband: /\bsim\b|mobilabonnemang|mobiltelefoni/i,      // secondary=mobil when primary=bredband
};

// Extract connection speed in Mbit/s from a broadband line description.
// Handles "500/500 Mbit/s", "1 Gbit", "1000 Mbit", etc.
const SPEED_DESC_RX = /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i;
function extractSpeedMbitFromDesc(d) {
  const m = SPEED_DESC_RX.exec(d ?? '');
  if (!m) return null;
  const n = parseInt(m[1], 10);
  const isGbit = /gbit|gbps/i.test(m[2]);
  const mbit = isGbit ? n * 1000 : n;
  // Snap to nearest standard tier
  for (const t of [100, 250, 500, 1000]) { if (mbit <= t) return t; }
  return 1000;
}

function desc(li) {
  return li.description ?? li.name ?? '';
}

function sum(arr) {
  return arr.reduce((acc, li) => acc + (li.amount ?? 0), 0);
}

/**
 * True if this line is a mobile-domain addon (PBX, VoIP, etc.).
 * Primary signal: addon_type in MOBILE_ADDON_TYPES.
 * Fallback: is_addon=true + not a known broadband type + description matches.
 */
function isMobileAddon(li) {
  if (MOBILE_ADDON_TYPES.has(li.addon_type)) return true;
  if (li.is_addon === true && !BROADBAND_ADDON_TYPES.has(li.addon_type)) {
    return ADDON_FALLBACK_RX.mobil.test(desc(li));
  }
  // Regex-only fallback (AI missed is_addon)
  if (li.is_addon !== true && ADDON_FALLBACK_RX.mobil.test(desc(li))) return true;
  return false;
}

/**
 * True if this line is a broadband-domain addon (static IP, firewall, extra SLA).
 * Primary signal: addon_type in BROADBAND_ADDON_TYPES.
 * Fallback: is_addon=true + not a known mobile type + descr
```

### Kommando 71

```bash
grep -n "export async function recommend" -A 25 agents/recommender/recommend.js | head -40
```

```
998:export async function recommend(input, opts = {}) {
999-  if (!input?.customer || !input?.categorized) {
1000-    throw new RecommenderError(
1001-      'input måste innehålla customer + categorized + invoice'
1002-    );
1003-  }
1004-
1005-  // Forensik-inversionen (universell): läs kundens EGEN faktura djupare än deras ekonomiansvarig.
1006-  // Category-agnostiskt, Zero Trust (talet ur kundens egen rad) → får rida med på VARJE svar, även
1007-  // oreviderade offert-kategorier (egna rader ≠ marknadstal; revisionsgrindens tystnad gäller ej dem).
1008-  // Sätts ALDRIG i reasoning-copyn — lever i forensicFindings/leadFinding (sifferrevisorns talfri-krav intakt).
1009-  const _forensicPeriod = input.invoice?.billingPeriod === 'annual' ? 1 : 12;
1010-  const forensicFindings = detectForensicFindings(input.invoice?.lineItems, {
1011-    periodMultiplier: _forensicPeriod,
1012-    // Leverantören behövs för kravbrevets adressat — samma namn kortet visar.
1013-    supplier: input.normalizedSupplier || input.invoice?.supplier || null,
1014-  });
1015-  const leadFinding = forensicFindings[0] ?? null;
1016-  const withForensics = (resp) => (resp && typeof resp === 'object' ? { ...resp, forensicFindings, leadFinding } : resp);
1017-
1018-  // Revisionsgrinden (regel 4 som arkitektur): oreviderade kategorier får ALDRIG
1019-  // visa siffror — de faller till ärligt offert-läge med talfri copy, före all
1020-  // beräkning och före AI-anropet. Väg in: dedikerad regressionssvit + grönt i
1021-  // sifferrevisorn. Se lib/revision-gate.js.
1022-  {
1023-    const _cat = input.categorized.category;
--
1939:export async function recommendBatch(inputs, opts = {}) {
1940-  const client = opts.client ?? getClient();
1941-  const concurrency = opts.concurrency ?? 4;
1942-  const results = new Array(inputs.length);
1943-
1944-  let cursor = 0;
1945-  async function worker() {
1946-    while (cursor < inputs.length) {
1947-      const i = cursor++;
1948-      try {
1949-        results[i] = await recommend(inputs[i], { client });
1950-      } catch (err) {
1951-        results[i] = { error: err.message, input: inputs[i] };
```

### Kommando 72

```bash
grep -n "opts.client ?? getClient()\|const client" agents/recommender/recommend.js | head
```

```
1356:  const client = opts.client ?? getClient();
1940:  const client = opts.client ?? getClient();
```

### Kommando 73

```bash
sed -n 1350,1420p agents/recommender/recommend.js
```

```
      optimizationSaving:  null,
      benchmark,
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
  }

  const client = opts.client ?? getClient();

  // Berika el-fakturor med realtids spotpris och leverantörsjämförelse (non-fatal).
  let elContext = null;
  if (input.categorized.category === 'el') {
    // Om annualCost = 0 (elförbrukning felklassificerad som variable_usage),
    // estimera från fakturabeloppet × 12 för att ändå kunna berika med spotdata.
    let annualCost = input.invoice.annualCost ?? 0;
    if (annualCost === 0 && (input.invoice.amount ?? 0) > 0) {
      annualCost = Math.round(input.invoice.amount * 12);
    }
    // Pass extracted elKwh (monthly period) so enrichElContext can derive accurate
    // annual kWh instead of falling back on the 1.27 kr/kWh average estimate.
    const elKwh = input.invoice.elKwh ?? null;
    elContext = await enrichElContext({ annualCost, elKwh, categorized: input.categorized });
  }

  const requestParams = {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    tools: [RECOMMEND_TOOL],
    tool_choice: { type: 'tool', name: 'recommend' },
    messages: [{ role: 'user', content: formatPrompt({ ...input, benchmark, elContext, convertedTierBm: saasTierBm }) }],
  };

  let response;
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      response = await client.messages.create(requestParams);
      break;
    } catch (err) {
      const overloaded = err instanceof Anthropic.APIError && err.status === 529;
      if (overloaded && attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attempt * 1500));
        continue;
      }
      if (err instanceof Anthropic.RateLimitError) {
        throw new RecommenderError('Tjänsten är tillfälligt överbelastad — försök igen om en stund.', { cause: err });
      }
      if (err instanceof Anthropic.APIError && err.status === 529) {
        throw new RecommenderError('Tjänsten är tillfälligt överbelastad — försök igen om en stund.', { cause: err });
      }
      if (err instanceof Anthropic.APIError) {
        // Samma klassificering som extract och den nattliga hälsokontrollen (regel 1). Ett tomt
        // saldo och en taktgräns är två olika fel med två olika råd till kunden — "försök igen"
        // är rätt bara för det ena.
        const h = klassificera(err);
        console.error(`[recommend] modellanropet föll · ${h.typ} · ${h.skal} · status=${err.status ?? 'ingen'} · modell=${MODEL}`);
        const fel = new RecommenderError(kundmening(h), { cause: err });
        fel.kod = h.typ;
        fel.hart = h.hart;
        throw fel;
      }
      throw err;
    }
  }

  const toolUse = response.content.find((b) => b.type === 'tool_use');
  if (!toolUse) {
    throw new RecommenderError(
      'Inget tool_use-block i svaret — modellen avv
```

### Kommando 74

```bash
sed -n 1420,1480p agents/recommender/recommend.js
```

```
  }

  // Schemakravet (B2): döm AI-utfallet mot verktygets eget schema INNAN result
  // muteras nedströms (shelfware m.fl. läggs på efteråt — de är kodskrivna, inte
  // AI-utfall, och ska inte dömas). SKUGGA → armeras via SCHEMAKRAV_ENFORCE=1.
  const schemaVerdict = guardToolPayload({ agent: 'recommend', tool: RECOMMEND_TOOL, payload: toolUse.input });
  if (!schemaVerdict.ok) {
    throw new RecommenderError('Rekommendationen kunde inte struktureras tillförlitligt — försök igen.');
  }

  const result = toolUse.input;

  // ── Shelfware (FRISTÅENDE) — oanvända SaaS-licenser ───────────────────────────
  // Svinnet existerar OBEROENDE av om vi rekommenderar ett leverantörsbyte: en kund kan
  // ha helt rätt pris men ändå betala för 20 tomma platser. Därför räknas shelfware här,
  // utanför shouldSwitch-blocket, så att revisorsfrågan/svinnet alltid når kunden.
  // Endast SaaS (per-plats-licenser). Gapet mot kundens EGNA pris/plats är verifierbart
  // utan extern benchmark (regel 3/4) — revisionsgrinden har redan släppt igenom kategorin.
  if (input.categorized.category?.startsWith('saas')) {
    const _shelfware = computeShelfware({
      seatCount:           input.invoice?.seatCount ?? null,
      pricePerSeatMonthly,
      employees:           input.customer?.employees ?? 1,
      knownExceptions:     input.invoice?.licenseKnownExceptions ?? null,
    });
    result.shelfware = _shelfware ?? null;
    if (_shelfware && !_shelfware.needsReview) {
      result.licenseOverage = _shelfware.confirmedIdle;
      result.overageSavings = _shelfware.annualWaste;
    } else {
      // review-läge eller inget gap → ingen besparingssiffra (precision eller tystnad)
      result.licenseOverage = null;
      result.overageSavings = null;
    }
  }

  // ── M365 rätt-storlek (E3/E5 → Business Premium) — FRISTÅENDE advisory ─────────
  // Beräknas oberoende av benchmark/shouldSwitch (samma princip som shelfware ovan): en kund kan
  // ligga på rätt pris men fel TIER. Deterministisk, verifierad prisskillnad (BRANCHINDEX M365,
  // ingen FX). optimizationSaving förblir null (advisory/review) — potentialen lever i m365Rightsizing.
  if (input.categorized.category === 'saas-productivity') {
    result.m365Rightsizing = m365Rightsizing(saasLicenseTierKey, deriveM365Seats(input.invoice)) ?? null;
  }

  // ── Prosakravet (SKUGGA): varje tal i AI:ns reasoning måste finnas i prompten ──
  // (prompten innehåller alla injicerade kodberäknade fakta — ett tal utanför den
  // kan modellen bara ha räknat fram själv, vilket är förbjudet). Loggas alltid;
  // vid PROSAKRAV_ENFORCE=1 ersätts texten aldrig — analysen routas till granskning
  // genom att reasoning töms (UI visar då det deterministiska beskedet istället).
  if (typeof result.reasoning === 'string' && result.reasoning) {
    const factsText = SYSTEM_PROMPT + '\n' + requestParams.messages[0].content;
    const prose = checkProseNumbers(result.reasoning, factsText);
    if (!prose.ok) {
      console.warn(`[
```

### Kommando 75

```bash
sed -n 280,360p agents/recommender/prompt.js
```

```
export const RECOMMEND_TOOL = {
  name: 'recommend',
  description:
    'Ge en rekommendation om byte av leverantör (eller inget byte) för en kategoriserad faktura.',
  input_schema: {
    type: 'object',
    properties: {
      recommendationType: {
        type: 'string',
        enum: ['switch', 'optimize', 'no_action'],
        description:
          'switch = leverantörsbyte rekommenderas. optimize = kunden betalar för en redundant/dubblerad tjänst hos SAMMA leverantör — ingen switch men avveckling ger besparing. no_action = inget att göra.',
      },
      optimizationSaving: {
        type: ['number', 'null'],
        description:
          'Årsbelopp (SEK) kunden betalar för en redundant tjänst. Sätt bara om recommendationType är "optimize" — annars null.',
      },
      shouldSwitch: {
        type: 'boolean',
        description:
          'true om vi rekommenderar byte, false om kunden redan har bra avtal eller om kategorin är license-pending.',
      },
      suggestedSupplier: {
        type: ['string', 'null'],
        description:
          'Namn på rekommenderad leverantör. NULL för shouldSwitch=false ELLER för license-pending kategorier (även om vi vet alternativet).',
      },
      suggestedAnnualCost: {
        type: ['number', 'null'],
        description:
          'Estimerad årskostnad hos den rekommenderade leverantören (SEK). NULL om shouldSwitch=false.',
      },
      savingPerYear: {
        type: 'number',
        description:
          'Årsbesparing (SEK). För license-pending: estimerad överbetalning vs branschsnittet (samma idé, annan etikett).',
      },
      overpaymentPercent: {
        type: 'number',
        description:
          'Överbetalning vs median (procent). Negativ om kunden ligger under median. Avrunda till heltal.',
      },
      confidence: {
        type: 'string',
        enum: ['high', 'medium', 'low'],
        description: 'Hur säker rekommendationen är.',
      },
      vipQueue: {
        type: 'boolean',
        description:
          'true för license-pending kategorier som ska in i VIP-kön istället för byte-flödet.',
      },
      reasoning: {
        type: 'string',
        description: 'Max 60 ord, hänvisar till konkreta siffror.',
      },
      switchSteps: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Max 3 konkreta steg för bytet. Tom array om shouldSwitch=false.',
      },
    },
    required: [
      'recommendationType',
      'shouldSwitch',
      'savingPerYear',
      'overpaymentPercent',
      'confidence',
      'vipQueue',
      'reasoning',
      'switchSteps',
    ],
  },
};
```

### Kommando 76

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && node --experimental-test-module-mocks t10-bbaddon.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens\]|extracted:|categorized:|rad-först"
```

```
[fingerprint:pre-route] tele2: confidence 0.95 → 0.95
[fingerprint] MATCH key=tele2 category='mobil' confidence 0.95 → 0.95
[pricing] Live FX-hämtning misslyckades — använder fallback 10.42 SEK/USD (2026-05-22)
[recommend] Använder fallback FX-kurs 10.42 SEK/USD
annualCost (inkl. statisk IP 1 800/år): 36600
recommend.js suggestedAnnualCost      : 32280
recommend.js savingPerYear            : 4320
SVARETS suggestedAnnualCost           : 32280
SVARETS grossSaving                   : 4320
nonPrimaryAnnual                      : 0

Efter bytet betalar kunden fortfarande statisk IP (1 800 kr/år).
Ingår de 1 800 i det föreslagna priset? 32280 — besparingen påstås 4320
annualCost - suggested = 4320
```

### Kommando 77

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && sed -i "s/amount: 1200, invoiceTotal: 1200,/amount: 1200, invoiceTotal: null,/" t5-usd-volume.mjs && node --experimental-test-module-mocks t5-usd-volume.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens\]|extracted:|categorized:|rad-först|fingerprint"
```

```
[pricing] Live FX-hämtning misslyckades — använder fallback 10.42 SEK/USD (2026-05-22)
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback
route   review_queue volume_data_required
annualCost i svaret         150048
  (creditBurn×12×kurs vore  625200 med fallbackkursen)
amount                      12504
startupCreditBalance        50000 USD
creditUnusedAmount          28735
creditExpiryMonths          4
```

### Kommando 78

```bash
grep -n "extracted?.annualCost\|extracted.annualCost" src/pages/TestaFaktura/index.js | head
```

```
1003:  const adjAnnualCost   = hasHwAdj ? _hwAdj.adjAnnualCost  : (result?.extracted?.annualCost ?? 0);
1519:                      {formatKr(result.extracted.annualCost)} / år
1558:                        {formatKr(result.extracted?.annualCost)} per år för{' '}
2067:            {result.extracted?.annualCost != null && result.route !== 'monitoring' && result.route !== 'unsupported' && <KV>
```

### Kommando 79

```bash
sed -n 2060,2075p src/pages/TestaFaktura/index.js
```

```
                      ? `. Övriga tjänster (${formatKr(result.recommendation.nonPrimaryAnnual)}/år) analyseras via Fortnox/Visma.`
                      : '.'}
                  </>
                )}
              </p>
            )}

            {result.extracted?.annualCost != null && result.route !== 'monitoring' && result.route !== 'unsupported' && <KV>
              <div>
                <dt>Ni betalar idag</dt>
                <dd>
                  {formatKr(adjAnnualCost)} / år
                  {hasHwAdj
                    ? <small>Abonnemang och licenser. Exkl. hårdvaruavbetalningar ({formatKr(_hwAnnualCost)}/år){result.extracted.variableCharges > 0 ? ` och rörliga avgifter (${formatKr(result.extracted.variableCharges)} denna period)` : ''}.</small>
                    : result.extracted.variableCharges > 0 && (
                      <small>Varav fasta abonnemang. Exkl. rörliga avgifter ({formatKr(result.extracted.variableCharges)} denna period).</small>
```

### Kommando 80

```bash
cat lib/fee.js; echo "=== 0.80/0,80 i backend ==="; grep -rn "\* 0\.8\b\|\* 0\.80\b" api/ lib/ agents/ | head
```

```
// lib/fee.js — EN sanning för Arvos besparingsarvode (regel 1).
//
// Success fee: 20 % av realiserad besparing (bibeln, Affärsmodell — Nivå 1+2,
// utlöses av VERIFIERAD realisering). Innan denna modul bodde talet hårdkodat
// på åtta backend-platser och räknades dessutom om i frontend (×0,80-läxans
// felklass). Nu: alla kronor härleds HÄR; frontend renderar, räknar aldrig
// (maskinvakt: claims-audit klassregeln blockerar *aving*-aritmetik i src/).
//
// Avrundningskonvention: fee = round(gross × 0,20), net = gross − fee.
// För heltalsbelopp gäller exakt net === round(gross × 0,80) (0,2×heltal har
// aldrig ,5-decimal), så konventionen är identisk med de historiska ×0,80-
// platserna — inga kundtal ändras av centraliseringen (bevisat: korpusdiff).

export const ARVO_FEE_RATE = 0.20;

/** Arvos arvode i hela kronor för en given bruttobesparing. */
export function feeOf(grossSaving) {
  if (!(grossSaving > 0)) return 0;
  return Math.round(grossSaving * ARVO_FEE_RATE);
}

/** Kundens nettobesparing i hela kronor (brutto − arvode). */
export function netOf(grossSaving) {
  if (!(grossSaving > 0)) return 0;
  return grossSaving - feeOf(grossSaving);
}
=== 0.80/0,80 i backend ===
api/test-invoice.mjs:811:        (u.input_tokens ?? 0) * 0.8 +
api/test-invoice.mjs:1260:              ? `Ert avtalspris: ${elRec.energiPerKwhGross.toFixed(2)} kr/kWh (jämförs mot marknadsindex exkl. energiskatt). Marknadens spotprisavtal i ${elRec.omrade} under ${elRec.season}: ca ${elRec.benchmarkKwh.toFixed(2)} kr/kWh. Potentiell nettobesparing när avtalet löper ut: ${Math.round(potentialSaving * 0.80).toLocaleString('sv-SE')} kr/år.`
```

### Kommando 81

```bash
grep -n "grossSaving\|arvoFee\|netSaving" lib/el-recommendation.js | head -20
```

```
108:  const grossSaving     = Math.max(0, currentAnnual - benchmarkAnnual);
109:  const shouldSwitch    = grossSaving >= 500;
110:  const arvoFee         = feeOf(grossSaving);
111:  const netSaving       = netOf(grossSaving);
127:    annualKwh, currentAnnual, currentAnnualGross, benchmarkAnnual, grossSaving, arvoFee, netSaving, shouldSwitch,
133:      ? `Er faktura visar ${energiPerKwhNet.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel} (energidel exkl. nätavgift och energiskatt). Arvo bedömer att ett välförhandlat spotprisavtal i ${omrade} under ${seasonLabel} bör ligga kring ${benchmarkKwh.toFixed(2)} kr/kWh${spotCapApplied ? ` (justerat uppåt från säsongsindex pga. högt spotpris denna period — besparingen avser leverantörens påslag och fasta avgifter)` : ''}. På uppskattad årsförbrukning om ${mwhEstimate} MWh innebär det en nettobesparing på ca ${netSaving.toLocaleString('sv-SE')} kr/år.`
```

### Kommando 82

```bash
sed -n 95,115p lib/el-recommendation.js
```

```
  const fastAvgift         = extracted.elFastAvgiftKr ?? 0;
  const currentAnnualGross = Math.round(energiPerKwh * annualKwh) + fastAvgift * 12;
  const currentAnnual      = Math.round(energiPerKwhNet * annualKwh) + fastAvgift * 12;

  const benchmarkKwhRaw = (EL_BENCHMARK_KWH[omrade] ?? EL_BENCHMARK_KWH.SE3)[season];
  const MIN_VIABLE_MARGIN = 0.020;
  const invoiceSpotPrice  = extracted.elSpotPriceKwh;
  const benchmarkKwh = (invoiceSpotPrice != null && invoiceSpotPrice > 0)
    ? Math.max(benchmarkKwhRaw, invoiceSpotPrice + MIN_VIABLE_MARGIN)
    : benchmarkKwhRaw;
  const spotCapApplied = benchmarkKwh > benchmarkKwhRaw;

  const benchmarkAnnual = Math.round(benchmarkKwh * annualKwh);
  const grossSaving     = Math.max(0, currentAnnual - benchmarkAnnual);
  const shouldSwitch    = grossSaving >= 500;
  const arvoFee         = feeOf(grossSaving);
  const netSaving       = netOf(grossSaving);

  const seasonLabel  = { winter: 'vinter', spring_fall: 'vår/höst', summer: 'sommar' }[season];
  const monthLabel   = extracted.elBillingMonth ?? 'fakturamånad';
  const mwhEstimate  = Math.round(annualKwh / 100) / 10;
```

### Kommando 83

```bash
grep -rn "estimatedAnnualSaving\b" --include=*.js --include=*.mjs . | grep -v node_modules | head
```

```
./agents/test-invoice/cli.js:146:    console.log(`   Bruttobesparing: ${formatKr(recommendation.estimatedAnnualSaving)} / år`);
./agents/test-invoice/cli.js:147:    const arvoFee = Math.round(recommendation.estimatedAnnualSaving * 0.20);
./agents/test-invoice/cli.js:148:    const net = recommendation.estimatedAnnualSaving - arvoFee;
./agents/test-invoice/cli.js:154:      extracted.annualCost - recommendation.estimatedAnnualSaving,
./api/test-invoice.mjs:1561:      const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
./api/test-invoice.mjs:1576:        ((recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0)
./api/test-invoice.mjs:1612:    const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
./scripts/full-pipeline-test.mjs:303:    const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
./scripts/full-pipeline-test.mjs:311:      ((recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0) / extracted.annualCost) * 100
./scripts/full-pipeline-test.mjs:336:  const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
```

### Kommando 84

```bash
sed -n 295,365p scripts/full-pipeline-test.mjs
```

```
    const _suggCost = recommendation.suggestedAnnualCost ?? 0;
    if (_annCost > 0 && _suggCost > 0 && _suggCost >= _annCost) {
      recommendation.shouldSwitch        = false;
      recommendation.suggestedAnnualCost = null;
      recommendation.savingPerYear       = 0;
    }
  }
  if (recommendation.shouldSwitch) {
    const _primGross = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const _secGross  = secondarySaving?.grossSaving ?? 0;
    if (_primGross + _secGross <= 0) recommendation.shouldSwitch = false;
  }

  // Haiku sanity check (Lager 3) — exakt som API: sanity fail → review_queue
  if (recommendation.shouldSwitch && (extracted.annualCost ?? 0) > 0) {
    const _savingPct = Math.round(
      ((recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0) / extracted.annualCost) * 100
    );
    try {
      const sanity = await verifySanity({
        category:   categorized.category,
        annualCost: extracted.annualCost,
        savingPct:  _savingPct,
        supplier:   categorized.normalizedSupplier ?? extracted.supplier,
      });
      if (!sanity.pass) {
        return {
          filename, route: 'review_queue', category: categorized.category, supplier: extracted.supplier,
          normalizedSupplier: categorized.normalizedSupplier,
          routeReason: `sanity_check_failed (method=${sanity.method}): ${sanity.reason}`,
          shouldSwitch: false, reasoning: recommendation.reasoning,
          issues: [], warnings: [`Sanity check (Haiku) blockerade rekommendationen — besparingsprocent ansågs orimlig`],
          extractMs, categorizeMs, recommendMs, totalMs: Date.now() - t0,
        };
      }
    } catch { /* fail-open */ }
  }

  const warnings = [];

  // Beräkna grossSaving (primär + sekundär) exakt som API:t gör
  const primaryGross   = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
  const secondaryGross = secondarySaving?.grossSaving ?? 0;
  const grossSaving    = primaryGross + secondaryGross;
  const arvoFee        = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
  const netSaving      = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

  const reasoningIssues = checkReasoning(recommendation.reasoning);

  // Sekretesscheck för Kategori 2: reasoning-texten får INTE namnge konkurrenter
  const REAL_PRICE_CATS = new Set(['mjukvara-saas', 'mobil', 'saas-productivity']);
  const isRealPrice = REAL_PRICE_CATS.has(categorized.category);
  const secrecyIssues = [];
  if (!isRealPrice && recommendation.reasoning) {
    // Kända alternativa varumärken som inte ska namnges för Kat 2
    const KAT2_BRANDS = [/\btele2\b/i, /\btelenor\b/i, /\btre\b/i, /\bcomviq\b/i, /\bbahnhof\b/i, /\bip.?only\b/i, /\bsveakom\b/i, /\bricoh\b/i, /\bkonica\b/i, /\bxerox\b/i, /\bcanon\b/i];
    const namedBrand = KAT2_BRANDS.find(re => re.test(recommendation.reasoning));
    if (namedBrand) {
      secrecyIssues.push(`SEKRETESSBROTT: K
```

### Kommando 85

```bash
grep -n "potentialMixedCategories\|potential_mixed" agents/test-invoice/extract.js | head
```

```
203:  KRITISKT: Sänk INTE confidence enbart för att fakturan har potentialMixedCategories: true.
235:  — potentialMixedCategories: Sätt true om fakturan innehåller kostnader som tydligt tillhör FLERA
240:    potentialMixedCategories: true om fakturan innehåller BÅDE rader med mobilabonnemang/SIM-kort
646:      potential_mixed_categories: {
994:    potentialMixedCategories:  raw.potential_mixed_categories ?? false,
```

### Kommando 86

```bash
node --input-type=module -e "
import { runIntegrityChecks } from './lib/extraction-integrity.js';
for (const bp of ['monthly','quarterly','annual']) {
  const ex = { billingPeriod: bp, recurring: true, recurringAmount: 45000, annualCost: bp==='monthly'?540000:bp==='quarterly'?180000:45000,
    amount: 45000, lineItems: [{type:'recurring_subscription',description:'Abonnemang',amount:45000}] };
  const { result, overrides } = runIntegrityChecks(ex, '');
  const o = overrides.find(x=>x.field==='annualCost');
  console.log(bp.padEnd(10), 'annualCost in:', String(ex.annualCost).padEnd(7),
    '| override:', o ? o.original+' -> '+o.corrected+' ('+o.reason+')' : 'ingen',
    '| result.annualCost efter:', result.annualCost);
}
"
```

```
monthly    annualCost in: 540000  | override: ingen | result.annualCost efter: 540000
quarterly  annualCost in: 180000  | override: 180000 -> 540000 (annual_cost_deviates_67pct_from_recurring_x_period) | result.annualCost efter: 180000
annual     annualCost in: 45000   | override: 45000 -> 540000 (annual_cost_deviates_92pct_from_recurring_x_period) | result.annualCost efter: 45000
```

### Kommando 87

```bash
cd /tmp/claude-0/-home-user-arvo-flow-github-io/fa040f29-a1de-55e0-a9e2-8fa771144c0f/scratchpad && for f in t2-secondary t4-kedjan t6-valutatotal t8-lock t10-bbaddon; do echo "########## $f"; node --experimental-test-module-mocks $f.mjs 2>&1 | grep -vE "Experimental|trace-warnings|tokens\]|extracted:|categorized:|rad-först|fingerprint:pre|fingerprint\] MATCH|pricing\]|recommend\] Använder"; done
```

```
########## t2-secondary
[secondary-override] shouldSwitch=true via sekundär besparing 7920 kr/år (bredband)
--- kundsynligt svar ---
annualCost            45456
shouldSwitch          true
recommendationType    no_action
suggestedAnnualCost   25608
grossSaving           7920
netSaving             6336
secondarySaving       {"category":"bredband","speedMbit":500,"currentAnnual":10788,"suggestedAnnual":2868,"grossSaving":7920,"netSaving":6336}
miniräknare: annualCost - suggested = 19848  (påstådd grossSaving 7920 )
calculationChain      {"currentAnnualCost":{"value":45456,"source":"Projicerat från fakturaperiodens återkommande rader"},"benchmarkAnnualCost":{"value":20940,"formula":null,"source":"Arvo branschindex (maj 2026)","benchmarkType":"negotiated-target"},"grossSaving":{"value":7920},"arvoFee":{"value":1584,"formula":"7 920 kr × 20 %"},"netSaving":{"value":6336}}
########## t4-kedjan
annualCost                     45456
SVARETS suggestedAnnualCost    33596   (switch-kortet: "45 456 → X kr/år")
KEDJANS benchmarkAnnualCost    28928   ("Arvo-pris" i Beräkningsunderlag)
grossSaving                    11860
kedjan räknar hem?             16528 ===  11860 ? false
kortet räknar hem?             11860 ===  11860 ? true
########## t6-valutatotal

### SEK: route=auto  reason=—
[test-invoice] USD→SEK konvertering: rate=10.42 source=fallback

### USD: route=review_queue  reason=Ring1: radsumma 12 504 kr ≠ fakturatotal 1 200 kr (avvikelse 11 304 kr)
[test-invoice] EUR→SEK konvertering: rate=11.47 source=fallback

### EUR: route=review_queue  reason=Ring1: radsumma 13 764 kr ≠ fakturatotal 1 200 kr (avvikelse 12 564 kr)
########## t8-lock
[integrity] overrides: [{"field":"annualCost","original":45000,"corrected":540000,"reason":"annual_cost_deviates_92pct_from_recurring_x_period","severity":"info"}]
idag                  2026-08-24
route                 monitoring
contractLocked        true
monitoringDate        2026-10-01
contractClock.title   Ni är bundna till 31 december 2026
contractClock.actBy   2026-10-02 · dagar kvar att agera: 39
rekommendation i svaret: — (ingen)
########## t10-bbaddon
annualCost (inkl. statisk IP 1 800/år): 36600
recommend.js suggestedAnnualCost      : 32280
recommend.js savingPerYear            : 4320
SVARETS suggestedAnnualCost           : 32280
SVARETS grossSaving                   : 4320
nonPrimaryAnnual                      : 0

Efter bytet betalar kunden fortfarande statisk IP (1 800 kr/år).
Ingår de 1 800 i det föreslagna priset? 32280 — besparingen påstås 4320
annualCost - suggested = 4320
```

### Kommando 88

```bash
timeout 900 npm run test:algo 2>&1 | tail -20
```

```
    ok 1 - varje tests/*.mjs är inkopplad i run.mjs (inga tysta hål)
      ---
      duration_ms: 0.678417
      type: 'test'
      ...
    1..1
ok 325 - 00 · Sviten bevakar sig själv
  ---
  duration_ms: 0.725693
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
# duration_ms 4292.660615
```

### Kommando 89

```bash
grep -rn "api/test-invoice" tests/*.mjs | head; echo "--- import default? ---"; grep -rn "from '../api/test-invoice.mjs'\|import(.*api/test-invoice" tests/ scripts/ | head
```

```
tests/fakturanummer.mjs:106:    const api = las('api/test-invoice.mjs');
tests/fakturanummer.mjs:141:    const api = las('api/test-invoice.mjs');
tests/jamforelsekalla.mjs:198:  const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/lfl-produktionsvag.mjs:6:// produktion — därför att api/test-invoice.mjs byggde sitt like-for-like-objekt med en LOKAL KOPIA
tests/lfl-produktionsvag.mjs:101:  test('api/test-invoice.mjs anropar den delade funktionen', () => {
tests/lfl-produktionsvag.mjs:102:    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/lfl-produktionsvag.mjs:107:  test('api/test-invoice.mjs bygger inte längre likeForLikeTarget för hand', () => {
tests/lfl-produktionsvag.mjs:108:    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/lfl-produktionsvag.mjs:122:    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
tests/lfl-produktionsvag.mjs:142:    const kod = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
--- import default? ---
```

### Kommando 90

```bash
mkdir -p /home/user/arvo-flow.github.io/ops/obduktion && ls /home/user/arvo-flow.github.io/ops/obduktion
```

```
spana-benchmark-prisbok-lib-benchmark-js-agent.md
spana-extract-grindar.md
spana-recommend-kedjan-agents-recommender-reco.md
```
