# Arvo Flow — Projektbeskrivning för Claude Code

---

## VISION

**Arvo är en AI-finansdirektör för svenska SMF.**

Inte ett verktyg. Inte en tjänst. En intelligent partner som arbetar 24/7 och aldrig missar en besparing.

Vi är ett high tech, modernt bolag som är kreativa, innovativa och effektiva — top of the sword. Vi tillämpar vägar och hittar arbetssätt som ingen trodde vara möjliga. Vi är mitt i skapandet av en produkt som kommer att förändra den svenska marknaden fullständigt.

**Affärsmodell:** Arvo sköter hela leverantörsbytet åt kunden — från uppsägning till nytt avtal — mot 20 % av realiserad besparing. Inget annars.

---

## ARVO INTELLIGENCE — POSITIONERING (ALDRIG KOMPROMISSA)

**Arvo Intelligence är en relation, inte en produkt.**

Skillnaden: bokföringsprogrammet gör det du ber det om. CFO:n kommer till dig när något hänt som du inte visste att du behövde veta.

Det enda som bevisar att vi är det sistnämnda — det mejl ingen bad om:

> *"Vi noterade att Telia höjde priset på er mobilflotta med 11% förra månaden. 8 av 15 bolag vi följer i er bransch fick samma höjning. Vill ni att Arvo agerar?"*

**Det mejlet ÄR Arvo Intelligence.** Dashboard, rapport, fakturaportal — är infrastruktur runt det.

**Copy-regel (gäller all kommunikation om Arvo Intelligence):**
- FEL: feature-lista — "Månadsvis briefing, prisbevakning, 90-dagars påminnelse"
- RÄTT: det proaktiva momentet — "Arvo märkte något. Ni visste inte om det. Arvo kontaktade er."

Kommunicera aldrig Arvo Intelligence som ett abonnemang med features. Kommunicera relationen — CFO:n som ringer dig, inte verktyget du loggar in på.

---

## STÅENDE BETEENDEREGLER (KRITISKA — GÄLLER ALLTID)

Dessa regler gäller ALLTID, oavsett vad som verkar rimligt i stunden:

### Ambitionsnivå och arbetssätt
- **Aldrig välj den enkla vägen** för att få något överstökat. Varje beslut ska utgå från Arvos vision och höga ambitioner — inte från vad som är snabbast att implementera.
- **Pusha tillbaka aktivt** om du inte håller med om ett beslut, en design eller en riktning. Det är en skyldighet, inte en möjlighet. Formulera din invändning tydligt med argument — användaren vill ha en partner som tänker, inte en som nickar.
- **Ifrågasätt halvmesyrer.** Om en lösning känns som en kompromiss med visionen, säg det direkt.

1. **ALDRIG kör hela `node scripts/stress-test.mjs`** (80 PDF:er, ~10–15 kr i API-kostnader) utan explicit tillåtelse från användaren. Kör enskilda fakturor: `node scripts/stress-test.mjs <fil.pdf>` (~0,20 kr) är OK.

2. **ALDRIG gör API-anrop** mot Claude eller andra tjänster utan explicit OK från användaren.

3. **SEKRETESSREGEL:** Namnge ALDRIG specifikt alternativt varumärke i reasoning för Kategori 2 (skrivarleasing, försäkring m.fl.). Skriv "Arvo-verifierad partner" eller "kvalificerad leverantör".

4. **OVERRIDE Kategori 1** (`mobil`, `saas-productivity`): leverantörnamn FÅR och SKA namnges i reasoning (Tele2, Microsoft m.fl.). Offentliga listpriser — inget sekretessbrott.

5. **ALDRIG commit:a .env eller credentials** till repot.

6. **ALDRIG pusha till annan branch** än `claude/fix-invoice-ai-deployment-OFyG2` utan explicit tillåtelse.

---

## GIT-WORKFLOW (OBLIGATORISK — EFTER VARJE PUSH)

```bash
# 1. Pusha feature-branch
git push -u origin claude/fix-invoice-ai-deployment-OFyG2

# 2. Merga ALLTID till main direkt efter
git checkout main
git merge claude/fix-invoice-ai-deployment-OFyG2 --no-edit
git push -u origin main
git checkout claude/fix-invoice-ai-deployment-OFyG2
```

Denna regel gäller alltid, utan undantag, direkt efter varje push till feature-branchen.

---

## TESTPROTOKOLL (OBLIGATORISK)

**Innan varje ändring av följande måste `node scripts/stress-test.mjs` köras och passera:**
- `CONFIDENCE_THRESHOLD` i `agents/test-invoice/extract.js`
- `routeExtraction()` — routing-logik
- `SYSTEM_PROMPT` i `agents/test-invoice/extract.js`
- Finansiella guards i `api/test-invoice.mjs`

**Varför:** En ändring av CONFIDENCE_THRESHOLD 0.70 → 0.85 fick Telia-kombinationsfakturor att hamna i review_queue. Stress-testet hade fångat detta OM det körts.

Testet täcker 80 fakturor (74 syntetiska + 6 riktiga kundfakturor lokalt, gitignorerade).

```bash
node scripts/stress-test.mjs          # hela sviten (kräver OK — ~10-15 kr)
node scripts/stress-test.mjs ricoh.pdf  # enskild faktura (~0,20 kr)
```

**CI:** `.github/workflows/stress-test.yml` kör automatiskt vid push till `agents/test-invoice/**` eller `scripts/stress-test.mjs`. OBS: `api/test-invoice.mjs` triggar INTE CI — kör stress-testet manuellt vid AI-relaterade ändringar i den filen.

---

## NY KUNDFAKTURA-PROCESS (OBLIGATORISK)

1. Kopiera fakturan till `test-pdfs/customer-<leverantör>.pdf`
2. Kör extraktorn: `node scripts/stress-test.mjs customer-<leverantör>.pdf`
3. Granska output — verifiera route=auto och att belopp/seatCount stämmer
4. Lägg till som golden master i `scripts/stress-test.mjs`
5. Kör hela stresstest — alla 80 måste passera
6. Commit och push (customer-*.pdf committas INTE — gitignorerade)

**Aldrig:** Starta produktion med en ny faktura-typ utan godkänt golden master.

---

## VAD ÄR ARVO FLOW?

Svensk B2B SaaS — AI-finansdirektör för SMF. Kunden laddar upp en leverantörsfaktura (PDF) och får direkt:
- Vad de betalar idag vs. branschsnittet (p25 = uppnåeligt marknadspris)
- Hur mycket de kan spara och hos vem
- Arvo sköter hela bytet — kunden behöver inte göra något

**Affärskontext (maj 2026):**
- Inget bolag registrerat än
- Ingen Fortnox API-access de närmaste 2–3 månaderna (juridiska skäl)
- PDF-parsern ÄR produkten just nu — demo, väntelista, investorpitch
- Live-domän: `https://arvoflow.se/testa-faktura?bypass=dev` (utan bindestreck)

---

## FULL ARKITEKTUR

### Teknikstack
- **Frontend:** React 19.2.4, React Router 7.13.2, styled-components 6.3.12, Create React App 5
- **Backend:** Vercel Serverless Functions (`api/`), maxDuration: 60s
- **Databas:** Neon (PostgreSQL serverless)
- **Cache/Rate-limit:** Vercel KV (Redis-liknande)
- **Email:** Resend
- **Error tracking:** Sentry
- **BankID/Signering:** Scrive (integrerat, ej live än)
- **Branch:** `claude/fix-invoice-ai-deployment-OFyG2` → mergad till `main`

### AI-modeller (maj 2026)
| Agent | Modell | Syfte |
|---|---|---|
| Extract | `claude-opus-4-8` | Native PDF-support, högst noggrannhet |
| Categorize | `claude-sonnet-4-6` | Dual-validering, snabb mönstermatchning |
| Recommend | `claude-opus-4-8` | Nyanserad svensk marknadsreasoning |
| Guardian | `claude-sonnet-4-6` | Prisavvikelse-klassificering (bara vid flagga) |
| Comm Drafter | `claude-haiku-4-5` | Kundmail + SMS-draft |

---

## PIPELINE: EXTRACT → CATEGORIZE → RECOMMEND

### 1. Extract (`agents/test-invoice/extract.js`)
- Modell: Claude Opus 4.8 med native PDF-support
- **Semantisk rad-för-rad-klassificering:**
  - `recurring_subscription` — fasta abonnemang, leasing, fasta licensavgifter, fast maskinhyra i Managed Print
  - `variable_usage` — mobilroaming/övertrafik, klickkostnader (kr/sida) i Managed Print. Annualiseras EJ.
  - `one_time_fee` — engångskostnader
  - `hardware` — köpt hårdvara
- `aggregateLineItems()` summerar per typ i kod — AI räknar aldrig ut totaler
- `annualCost = recurringAmount × periodMultiplier` — inkluderar INTE variable_usage
- `routeExtraction()` returnerar `auto | review_queue | unsupported`
- `CONFIDENCE_THRESHOLD = 0.70`
- Managed Print-guard i recommend.js: klick-ratio > 35 % → `requiresQuote: true`

### 2. Categorize (`agents/categorizer/`)
- Modell: Claude Sonnet 4.6
- Kategorier: `mobil`, `bredband`, `el`, `saas-productivity`, `saas-devtools`, `saas-other`, `saas-crm`, `saas-finance`, `saas-creative`, `skrivarleasing`, `kortterminal`, `faktura-tjanst`, `leasing-bil`, `forsakring-foretag`, `forsakring-ansvar`, `loneadmin`, `vaxel`, `managed-workplace`, `larm-bevakning`, `foretagshalsovard`, `bankavgifter`, `utrustningsleasing`, `serverhosting`, `kontorsmaterial`, `städ-rengöring`, `transport-frakt`, `avfall-atervinning`, `it-support`
- Supplier-fingerprinting: kända leverantörer → confidence boost + mismatch → review_queue

### 3. Recommend (`agents/recommender/`)
- Modell: Claude Opus 4.8
- **Deterministic financial overrides:** `suggestedAnnualCost` och `savingPerYear` låses mot `benchmark.p25` i kod
- `licenseOverage = seatCount - employees` (visas om seatCount > employees)
- **`overpaymentPct` jämförs mot p25** (inte medianen) — avgörande för korrekt Arvo Score
- Minimigräns: besparing < 500 kr/år → shouldSwitch = false (operationellt orimligt)
- shouldSwitch forceras till true om kund betalar >15 % över p25

### Branchindex (`agents/recommender/branchindex.js`)
Sveriges troligen mest heltäckande prisdatabas för B2B SMF-leverantörer.

**Tier-system:**
- `real-public` — verifierade offentliga listpriser (operatörers hemsidor, maj 2026)
- `estimated` — intervallbaserade marknadsdata från branschkällor
- `mock` — internt modellerade estimat, ersätts med riktig aggregerad Postgres-data vid ≥10 datapunkter/segment

**Size-buckets:** `micro` (1–9 anst), `small` (10–49 anst), `mid` (50–249 anst)

**Industry-segment-mapping:**
```js
ehandel → 'ehandel', tillverkning → 'tillverkning',
it-tech/hotell/konsult/vård → 'byraer', bygg/transport → 'hantverkare'
```

**Mobil (real-public, maj 2026):**
- Tele2 Företag Bas: 299 kr/mån = 3 588 kr/SIM/år (p25 micro)
- Tele2 Företag Plus: 349 kr/mån = 4 188 kr/SIM/år (median micro)
- Small bucket p25: 3 408 kr/SIM/år (5% volymrabatt), median: 3 972 kr/SIM/år

### Speciella guards och logik
- **Försäkring (license-pending):** 5-lagers försvar — prompt + kod-strip + orchestrator + frontend + VIP-kö
- **Managed Print:** clickRatio > 35% → requiresQuote: true (kräver printhistorik)
- **Kortterminaler:** variableCharges > 0 → requiresQuote: true (kräver GMV och kortmix)
- **Managed Workplace/WaaS:** alltid requiresQuote: true
- **El:** realtids Nordpool spotpris via Riksbanken API (fallback: årsmedel 2025)
- **SaaS tier-detection:** E3/E5/Business Premium/Standard/Basic + Google/Slack/Zoom/Atlassian
- **Like-for-like:** mixade M365-tiers räknas per tier (inte dominant tier × alla seats)

---

## KATEGORI 1 VS KATEGORI 2

```js
const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'saas-devtools', 'mobil']);
```

| | Kategori 1 | Kategori 2 |
|---|---|---|
| Exempel | Microsoft 365, Telia, Tele2 | Ricoh, Konica Minolta, försäkring |
| Prismodell | Offentliga listpriser | Kontraktsbaserat/offert |
| Visar leverantör | Ja, öppet i reasoning | Nej — "Arvo-verifierad partner" |
| Reasoning | Namnger leverantören | "Kvalificerad leverantör i Arvos nätverk" |
| PartnerBlock-knapp | "Aktivera bytet" | "Säkra besparingen" |

---

## PROMPTREGLER FÖR RECOMMENDER (ALDRIG BRYTA)

Tillagda i `agents/recommender/prompt.js`:

1. **ALDRIG "SMF"** — skriv "bolag av er storlek", "jämförbara bolag" eller "mindre bolag"
2. **ALDRIG marknadsledarskapsanspråk** — skriv aldrig "marknadsledare", "störst", "bäst i sin klass" eller liknande superlativ
3. **ALDRIG superlativ om nuvarande leverantörens produkt** — skriv aldrig "bästa täckning", "starkaste nätet", "marknadens bästa X". Sådana påståenden motverkar rekommendationen. Om produktkvalitet måste adresseras (t.ex. täckning för en byggfirma), formulera det som att alternativet täcker kundens faktiska behov — inled alltid med prisproblematiken.
4. **ALDRIG interna mätvärden i reasoning** — skriv aldrig "p25", "percentil", "medianen" eller interna procentsatser direkt till kund. Skriv "branschsnittet", "välförhandlat avtalspris" eller "verifierat marknadspris".

---

## DESIGNBESLUT FRÅN KONVERSATIONER

Dessa beslut är fattade och ska inte ifrågasättas utan ny diskussion:

### UX/Frontend
- **AVTALSBEVAKNING borttagen** från TestaFaktura-resultat. Avtalsdatum hanteras operationellt av Arvo (extraheras från PDF om möjligt; annars kontaktar Arvo leverantören). Kunden ska aldrig behöva mata in avtalsdatum.
- **"Din identifierade nettobesparing"** (inte "Din nettobesparing") — juridiskt säkrare formulering.
- **ArvoScore-mockup** (`/arvo-score`): parkerad, behöver mer luft/bredd. Återkommer.
- **ScoreRevealCard** i TestaFaktura gjord mindre (72px gauge, 26px score-font).

### Scoring & Kalibrering
- **`overpaymentPct` jämförs mot p25** (inte medianen) i `recommend.js → formatPrompt()`. Att jämföra mot medianen maskerade överpris för kunder mellan p25 och median — de fick felaktigt hög Arvo Score.

### Operationell process (intern Arvo)
- **Interna kontrakt:** 3 lager — automatisk (PDF-extraktion), operationell (Arvo kontaktar leverantör), intern CRM med 90/60/30-dagars-påminnelser
- **Avtalstid vid aktivering:** Om avtalstid finns i PDF → inget formulär. Om saknas → fråga kunden om månad (inte exakt datum) i steg 2 (efter klick på "Aktivera bytet")

---

## BLINDTESTRESULTAT & KALIBRERING

### Telenor Faktura 1 (Gemini-genererad, maj 2026)
- **Kund:** Mälardalen Logistik & Entreprenad AB
- **Bransch:** transport | **Anställda:** 35 | **SIM-kort:** 35
- **Produkt:** Telenor Företag 100GB × 35 st à 299 kr = 10 465 kr/mån
- **Rörligt:** 432 kr utlandssamtal (korrekt exkluderat från årsbelopp)
- **Årsbelopp:** 10 465 × 12 = 125 580 kr ✓
- **Benchmark small (transport→hantverkare):** p25 = 3 408 kr/SIM/år (284 kr/mån), median = 3 972 kr/SIM/år
- **Ursprunglig score:** 85/Optimalt — FEL (jämförde mot median: −10%)
- **Korrekt:** kunden betalar 299 kr vs p25:s 284 kr = +5,3% över p25 → bör ge ~65/Förbättringsläge
- **Rotorsak:** `overpaymentPct` beräknades mot totalMedian → nu fixat till totalP25
- **Extra observation:** Telenor 100GB vs Tele2 obegränsat — kunden får mindre data för samma pris. Systemet fångar inte denna kvalitetsskillnad än.

**Protokoll för framtida blindtester:**
Inled varje testfaktura-analys i chatten med: `Bransch: X | Anställda: Y | [PDF bifogad]`
Ladda alltid upp PDF:en direkt i chatten (inte bara på sajten) — Claude kan inte se formulärdata.

---

## VIKTIGA FIXAR SOM GJORTS

1. **Klickkostnader för skrivare** klassificerades fel som `variable_usage`. Fixat med explicit regel i SYSTEM_PROMPT.

2. **Leverantörnamn läckte i reasoning** för Kategori 2. Fixat med SEKRETESSREGEL + OVERRIDE för Kategori 1.

3. **`result.recommendation` undefined** för `review_queue`-route. Fixat med null-safe `?.`-operatorer i frontend.

4. **Blank ArvoScore-sida** — `@keyframes` direkt i styled-component utan `keyframes`-import. Fixat med `import { keyframes } from 'styled-components'`.

5. **`overpaymentPct` mot medianen** gav felaktig Arvo Score för kunder mellan p25 och median. Fixat: jämförs nu mot p25.

6. **SMF-förkortning i reasoning** — modellen använde "SMF" och marknadsledarskapsanspråk. Fixat med explicita promptregler.

7. **"Sveriges bästa nättäckning"** i reasoning motverkade rekommendationen. Fixat: superlativ om nuvarande leverantörs produkt förbjudna i prompten.

---

## LÄRANDE FLYWHEEL-ARKITEKTUR (LÅNGSIKTIG VISION — ALDRIG KOMPROMISSA)

Detta är den arkitekturella nordstiärnan. Varje tekniskt beslut ska vara kompatibelt med denna riktning — aldrig bygga silo-lösningar som måste rivas om ett år.

### Grundinsikten
Validation layers och manuella regler är defensiv ingenjörskonst — inte en AI-finansdirektör. Det som skiljer Arvo från ett verktyg är att systemet lär sig av varje faktura och blir smartare utan att vi skriver en enda ny regel manuellt.

### Flywheel-loopen
```
Faktura analyseras
       ↓
Osäkra prediktioner flaggas automatiskt (active learning)
       ↓
Operatör granskar edge cases → korrigerar utfall
       ↓
Korrektioner sparas som labeled data i Postgres
       ↓
Systemet deriverar egna regler från data — inte vi manuellt
       ↓
Bättre precision → fler kunder → fler fakturor → mer data
       ↑_____________________________________________|
```

### Det verkliga moatet: real-time B2B-prisintelligens
Varje faktura vi processar är en datapunkt som gör Arvo smartare för alla framtida kunder. Efter 10 000 fakturor vet Arvo:
- Vad Lime CRM **faktiskt** tar betalt av olika kundstorlekar — inte bara listpris
- Vilka leverantörer som smyghöjer priser utan att informera kunderna
- Vilka branscher som systematiskt betalar för mycket
- Marknadsmönster för kontraktsförnyelse

Ingen konkurrent kan replikera detta. Det är ett nätverkseffekt-moat som växer med varje faktura.

### Implementeringsordning (fas för fas)

**Fas 1 — Active learning pipeline** *(bygger grunden för allt)*
- `labeled_corrections`-tabell i Postgres: varje manuell korrektion sparas strukturerat
- Systemet flaggar automatiskt låg-confidence prediktioner för operatörsgranskning
- UI för Arvo-operatörer att granska och korrigera (internt admin)
- Korrektioner flödar tillbaka och förbättrar extraction/categorization-prompts

**Fas 2 — Extraction integrity (deterministisk, inte AI)**
- Post-extraction validering: math-konsistens, logisk konsistens
- `recurring_subscription`-rader finns → tvinga `recurring: true` på fakturanivå (Lime-buggen)
- `seatCount × pricePerSeat ≈ invoiceAmount` (korsvalidering)
- Pre-heuristics: kända fakturatyper (LICENSFAKTURA + månadsperiod = recurring)

**Fas 3 — Automatisk supplier fingerprinting**
- Istället för manuell fingerprinting-databas: klustrera fakturor automatiskt per leverantör
- Varje ny leverantör som processerats 3+ gånger → automatisk fingerprint
- `lib/supplier-fingerprints.js` ersätts gradvis med DB-driven lookup

**Fas 4 — Automatisk benchmarking**
- `branchindex.js` mock-data ersätts automatiskt när ≥10 fakturor/segment finns i DB
- Priser uppdateras av sig självt utan manuell intervention
- Anomali-detektion: leverantör höjer pris → Arvo vet det innan kunden gör det

**Fas 5 — Proaktiv intelligens**
- Arvo berättar saker kunden inte frågade om: "Ni har tre SaaS-verktyg med överlappande funktioner"
- Portfolio-analys: aggregerar besparingsmöjligheter över alla kundens fakturor
- Marknadsintelligens: "Priset på Lime CRM har stigit 12% det senaste året bland jämförbara bolag"

### Vad detta INTE är
- Inte validation layers som patches
- Inte manuellt underhållna regler som vi skriver
- Inte statisk databas som uppdateras 1-2 gånger/år
- Inte ett system som behandlar varje faktura isolerat

---

## KÄNDA BUGGAR ATT ÅTGÄRDA (FLYWHEEL-KOMPATIBELT)

### Lime CRM (Faktura 2, blind test 2026-06-01)
- **Bug 1:** `recurring: false` — månadsabonnemang klassificeras felaktigt som engångskostnad
  - Fix: extraction integrity check (Fas 2) + pre-heuristic (LICENSFAKTURA + månadsperiod → recurring: true)
  - Fix ska sparas som labeled correction i DB (Fas 1) för att träna systemet
- **Bug 2:** `saas-other` istället för `saas-crm`
  - Fix: lägg till Lime Technologies i `lib/supplier-fingerprints.js` med category: 'saas-crm'
  - Långsiktigt: automatisk fingerprinting (Fas 3) ersätter manuell fix



### Produktionssatta
- **`agents/test-invoice/extract.js`** — Opus 4.8, native PDF, rad-för-rad-klassificering
- **`agents/categorizer/categorize.js`** — Sonnet 4.6, kategorisering + supplier-normalisering
- **`agents/recommender/recommend.js`** — Opus 4.8, rekommendation + deterministiska finansiella overrides
- **`agents/recommender/branchindex.js`** — Prisdatabas (Sveriges mest heltäckande för SMF)
- **`agents/recommender/pricing.js`** — Live FX-konvertering (Riksbanken/ECB, daglig cron)

### Under utveckling (ej live)
- **`agents/orchestrator/orchestrator.js`** — State machine: `proposed → bankid_signed → live → completed`
- **`agents/invoice-guardian/guard.js`** — Sonnet 4.6, övervaka prissättning efter byte (smyghöjningar)
- **`agents/comm-drafter/draft.js`** — Haiku 4.5, kundmail + SMS-draft per livscykelhändelse

---

## FRONTEND-SIDOR

| Route | Sida | Status |
|---|---|---|
| `/` | Landing | Live |
| `/testa-faktura` | PDF-uppladdning + analys | Live |
| `/portfolio` | Aggregerad portföljvy | Live |
| `/insights` | VIP-kö (license-pending) | Live |
| `/opportunity/:id` | Bythesflöde med BankID (mockad) | Dev |
| `/arvo-score` | Arvo Score™-mockup | Parkerad (behöver design-revision) |
| `/scanning` | Fortnox-kontosync | Dev |
| `/connect` | Fortnox OAuth | Dev |
| `/admin` | Intern dashboard | Live (intern) |

---

## API-ENDPOINTS (URVAL)

- **`/api/test-invoice.mjs`** — Huvudpipeline (extract → categorize → recommend), rate-limiting, Postgres-lagring
- **`/api/invoice-history.mjs`** — GET analyser per browser-fingerprint
- **`/api/batch-upload.mjs`** — Multi-faktura batch
- **`/api/send-report.mjs`** — Email full analys
- **`/api/el-prices.mjs`** — Realtids Nordpool-priser
- **`/api/cron/update-fx-rate.mjs`** — Daglig FX-uppdatering (06:00 UTC)
- **`/api/fortnox/auth.mjs`** + `/callback.mjs` — OAuth-flöde (ej live än)

---

## API-RESPONS (`api/test-invoice.mjs`)

```json
{
  "ok": true,
  "route": "auto",
  "extracted": { "supplier", "amount", "recurringAmount", "variableCharges", "oneTimeFees", "annualCost", "date", "lineItems", "billingPeriod", "recurring", "confidenceScore", "seatCount" },
  "categorized": { "category", "subType", "normalizedSupplier", "confidence", "reasoning", "licensePending" },
  "recommendation": { "shouldSwitch", "suggestedSupplier", "suggestedAnnualCost", "grossSaving", "arvoFee", "netSaving", "confidence", "reasoning", "switchSteps", "licenseOverage", "overageSavings" },
  "timing": { "extractMs", "categorizeMs", "recommendMs", "totalMs" }
}
```

Routes: `auto` (normal pipeline), `review_queue` (confidence < 0.70), `unsupported` (outOfScope)

---

## VERIFIERADE TESTRESULTAT (STRESS-TEST)

| Faktura | Route | Confidence | Klassificering |
|---|---|---|---|
| Telia | auto | 97 % | Roaming=rörlig, abonnemang=återkommande ✓ |
| Ricoh | auto | 95 % | Alla klickkostnader=återkommande ✓ |
| Microsoft | auto | 97 % | seatCount=57, licenseOverage=12 ✓ |
| Advokatfirman | unsupported | — | outOfScope korrekt ✓ |
| Kalles Alltjänst | unsupported | — | outOfScope korrekt ✓ |

---

## IMPLEMENTERADE KVALITETSNIVÅER

### Nivå 1 — Postgres-lager
- `lib/invoice-store.js` — lagrar varje `auto`-analys i `invoice_analyses`-tabellen
- SHA-256-fingerprint hashas server-side (GDPR)
- `scripts/migrate.mjs` — tabellmigration med index på (fingerprint, created_at)

### Nivå 2 — Supplier Fingerprinting
- `lib/supplier-fingerprints.js` — fullt implementerat
- Pre-routing confidence boost: kända leverantörer ≥ 0.70 → boostar till threshold
- Post-kategorisering mismatch → review_queue + alert

### Nivå 3 — Portföljvy
- `api/invoice-history.mjs` — GET /api/invoice-history?fingerprint=<fp>
- `src/pages/Portfolio/index.js` — samlade analyser per browser-fingerprint
- Visar: totalt analyserade, total årskostnad, total nettobesparing, per-leverantörs-kort + Fortnox/Visma-CTA

### Nivå 4 — Realtidsintelligens
- `lib/el-intelligence.js` — Nordpool spotpris + leverantörsranking
- `agents/recommender/pricing.js` — live USD/EUR → SEK (Riksbanken dagligen)

### Nivå 5 — Övervakningspipeline (under utveckling)
- `agents/invoice-guardian/` — prisavvikelsedetektering post-byte
- `lib/production-monitor.js` — anomali-detektion i realtid

---

## PÅGÅENDE ARBETE / PARKERAT

- **Flywheel Fas 1 (active learning pipeline):** Högsta prioritet. labeled_corrections-tabell + operatörs-UI + feedback-loop.
- **Flywheel Fas 2 (extraction integrity):** Lime recurring-bug + pre-heuristics.
- **Lime Technologies fingerprint:** Lägg till i supplier-fingerprints.js (snabb fix medan Fas 3 byggs).
- **ArvoScore-mockup** (`/arvo-score`): Design parkerad. Feedback: "för smalt och intryckt, saknar luft". Återkommer.
- **Blindtestning:** Faktura 1 (Telenor) ✓, Faktura 2 (Lime CRM) ✓. 8 återstående.
- **Fortnox-integration:** Väntar på bolagsregistrering (~2–3 månader).
- **BankID/Scrive:** Klar att aktivera, väntar på produktion.

---

## NÄSTA STEG (I PRIORITETSORDNING)

1. **Flywheel Fas 1** — labeled_corrections-tabell i Postgres + Arvo-operatörs-UI för att granska och korrigera edge cases. Detta är grunden för allt annat.
2. **Flywheel Fas 2** — Extraction integrity: `recurring`-fix, math-konsistenskontroll, pre-heuristics för LICENSFAKTURA-typ.
3. **Lime fingerprint** — Snabb fix: lägg till Lime Technologies i supplier-fingerprints.js med saas-crm.
4. **Fortsätt blindtestning** — 8 Gemini-fakturor kvar (ett i taget, PDF + bransch/anst i chatten).
5. **Fortnox-integration** — när bolaget är registrerat.
