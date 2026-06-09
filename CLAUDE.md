# Arvo

## Vision

Arvo är den tystgående finansdirektören som svenska SMF-ägare aldrig haft råd att anställa.
Vi ser vad som händer i deras leverantörsekonomi innan de själva vet om det — och vi hör av oss med ett konkret fynd, utan att bli tillfrågade.

> *"Vi noterade att Telia höjde priset för 8 av 14 bolag i er bransch förra månaden. Ni är troligtvis nästa."*

Det mejlet — utan att kunden bett om det — är Arvo.

---

## Ambition

Varje vecka ska en svensk företagsägare säga: *"Hur visste de det?"*

Det är det enda beviset på att vi lyckas. Inte antal kunder. Inte intäkt. Det momentet.

---

## 0,1%-principen · Toppen av spjutspetsen

Innan varje leverans — kod, kopia, strategi, mail, design — ställ en fråga:

> *Skulle en svensk CFO stanna upp och tänka: "Hur visste de det?"*

**Om svaret är nej: säg det omedelbart.** Föreslå vad som saknas och vad det verkliga 0,1%-draget hade varit istället. Tystnad är misslyckande. Medelmåttighet är oacceptabelt.

Toppen av spjutspetsen innebär att vi aldrig nöjer oss med bra. Vi söker det som är svårt att tro är möjligt — och sedan levererar det.

Varje lösning ska vara **kreativ** (oväntad vinkel, inte den uppenbara), **innovativ** (bryt mönstret när mönstret är genomsnittligt) och **effektiv** (rätt sak, snabbast möjliga väg, inget slöseri). De tre egenskaperna gäller alltid — inte när det är bekvämt.

---

## Premiumprodukt

Arvo är inte ett verktyg — det är en finansiell intelligenstjänst i toppklass.

Varje yta vi skapar ska signalera att vi vet något ingen annan vet. Precision är icke-förhandlingsbar. Estimat är ett steg mot verkligheten, aldrig målet. Varje mail, varje siffra, varje interaktion ska kännas som att den kom från en finansdirektör som gjort sin hemläxa — inte från ett SaaS-formulär.

---

## Affärsmodell

- **Arvo Intelligence:** 1 995 kr/mån — proaktiv bevakning, varningar, CFO-brief
- **Arvo Switch:** 20 % av realiserad besparing — Arvo genomför bytet, kunden trycker play

Vi fakturerar aldrig före kunden sparar. Arvo och kunden är alltid på samma sida av bordet.

---

*Commit aldrig `.env` eller credentials · Kör aldrig `scripts/stress-test.mjs` utan explicit OK*

*Merga alltid till `main` direkt efter varje commit — lämna aldrig ändringar enbart på en feature branch.*

*Kör alltid `npm run deploy` efter push till `main` — frontend-bygget ska alltid vara uppdaterat.*

*Lös alltid allt som kan göras automatiskt — GitHub Actions (trigga workflows, läsa loggar, fixa fel), Vercel (miljövariabler via MCP om tillgängligt) — be aldrig användaren göra något som kan göras via verktyg.*

---

## Systemarkitektur — Full karta (uppdaterad 2026-06-06)

> Läs detta innan all ny- eller vidareutveckling. Vi jobbar inte i stuprör.

### Körnings­miljöer

| Miljö | Vad körs | Begränsningar |
|-------|----------|--------------|
| **Vercel (prod)** | `api/**.mjs`, React SPA, cron-jobs | HTTP fritt · Serverless, max 60s |
| **GitHub Actions** | `scripts/price-monitor.mjs`, CI | Playwright + Chromium · Kör nattligen |
| **Lokal / sandbox** | `scripts/**.mjs`, agenter, tester | DNS fritt · HTTP blockerat av allowlist |

DNS-anrop (Node `dns`-modulen) fungerar överallt. HTTP (fetch, axios, crt.sh, RDAP) fungerar bara på Vercel och GitHub Actions — inte i sandboxen.

---

### Dataskikt — Neon Postgres (prod)

Alla tabeller skapas av `scripts/migrate.mjs` + `migrate-v2.mjs` + `migrate-price-db.mjs` + `migrate-prospects.mjs`. Kör i ordning vid ny miljö.

| Tabell | Syfte |
|--------|-------|
| `invoice_analyses` | Varje AI-analys (extract → categorize → recommend). Centrala entiteten. |
| `invoice_datapoints` | Anonymiserade kostnadspunkter för branschbenchmark. 3σ outlier-guard. |
| `labeled_corrections` | Varje AI-korrektion (auto + manuell) — few-shot flywheel. |
| `suppliers` | Normaliserade leverantörs­entiteter med faktura-count. |
| `supplier_prices` | Prishistorik per leverantör/produkt/tier (is_current=true = nu). |
| `supplier_price_history` | Ändring­slog — en rad per prisändring. |
| `contract_timelines` | Kontraktssnapshots för proaktiv förfallodetektering. |
| `price_alerts_sent` | Idempotens för kundnotifierings­pipelinen (en rad per run+supplier). |
| `outbound_prospects` | Utgående prospect-briefings med token + spårning (opened_at, action). |
| `magic_tokens` | Auth via magic link (expires 24h, single-use). |
| `gate_emails` | Fingerprint → e-post koppling (för pris-alert-routing). |
| `waitlist` | Väntelista (source: review_queue etc.). |
| `invoice_feedback` | Tumme upp/ned per analys — förbättrar kategorisering. |
| `fortnox_connections` | OAuth tokens för Fortnox-integration. |
| `customers` | Kund­entitet kopplad till Fortnox-anslutning. |
| `arvo_outcomes` | 60-dagars utfallsenkät — verifierar faktisk besparing (grund för success fee). |
| `activation_outcomes` | Layer 2 utfallsspårning — success fee (20 % av verifierad besparing). |
| `invoice_benchmarks` | Aggregerade marknadsdata per kategori/bransch/storlek. |

**Cache:** Vercel KV (Redis). Nyckel: `bm:v2:{category}:{industry}:{sizeBucket}`. TTL 6h. Invalideras vid `storeDatapoint()`. Läses i `lib/benchmark.js` före Postgres.

---

### AI-pipeline — Faktura­analys (inbound)

```
PDF upload (frontend /testa-faktura)
  │
  ▼
api/test-invoice.mjs          ← orchestrerar hela pipelinen, maxDuration 60s
  │
  ├─ agents/test-invoice/extract.js   (claude-opus-4-8, extraherar leverantör/belopp/period)
  ├─ agents/categorizer/categorize.js (claude-sonnet-4-6, deterministicMatch → AI-fallback)
  └─ agents/recommender/recommend.js  (claude-opus-4-8, rekommendation med BRANCHINDEX-benchmark)
        │
        ├─ lib/benchmark.js            (KV → Postgres → invoice_analyses → BRANCHINDEX mock)
        ├─ lib/invoice-store.js        (lagrar analys med dedup på fingerprint+pdf_hash)
        ├─ lib/labeled-corrections.js  (sparar AI-korrektera few-shot-exempel)
        ├─ lib/invoice-graph.js        (uppdaterar suppliers, supplier_prices, contract_timelines)
        ├─ lib/benchmark.js/storeDatapoint (anonymiserad datapunkt om annualCost 500–5M kr)
        ├─ lib/price-alert.js/detectPriceAlert (jämför mot supplier_prices.price_monthly)
        └─ lib/price-alert.js/getMarketIntelligence (cross-customer aggregat, ≥3 analyser)
```

**Gate-logik:** Gratis för 2 analyser med besparing. Därefter "savings gate": kumulativ nettobesparing ≥ 25 000 kr → registrering krävs. Rate limit: 5 analyser/IP/24h (whitelist för ägarens IP:er).

---

### Intelligence-pipeline — Pris­bevakning (proaktiv)

```
GitHub Actions (nattlig)
  │
  ▼
scripts/price-monitor.mjs     ← Playwright + claude-haiku, ~40 leverantörssidor
  │
  ├─ Hittar avvikelse → /tmp/price-monitor-report.json (exit code 1)
  └─ GH Actions → POST api/cron/run-price-alerts   ← CRON_SECRET bearer auth
                       │
                       ├─ lib/price-alert-store.js/getAffectedCustomers
                       │     (fingerprint → gate_emails → invoice_analyses → berörda kunder)
                       ├─ lib/price-impact.js/computeImpactKr
                       │     (deterministic kr/år: (nytt−gammalt) × seats × 12)
                       └─ Resend → kund-e-post "Telia höjde priset för X av Y i er bransch"
```

Alternativt: `scripts/notify-price-changes.mjs` (direkt Node.js, samma logik utan Vercel).

---

### Fynd-motor — Utgående prospektering (outbound)

```
leads/stockholm-leads.csv     ← 20 bolag (10 Stockholm + 10 Skåne), SNI 62/70/71/73/78
  │
  ▼
scripts/score-leads.mjs       ← fynd-motor (INTE estimat-rankare)
  │
  ├─ T3a DNS-postur per domän:
  │     MX (plattform) · SPF (expandSpf rekursivt, MAIL_GATEWAYS) · DMARC · MTA-STS · DKIM
  ├─ buildFindings() → findings[] med {tier, weight, wow, text}
  │     wow=true = "Hur visste de det?"-bar clearad
  │     DMARC p=none → +18 wow · DMARC null → +20 wow · p=reject → −15
  │     SPF gateway → −8 (vaket IT) · spfMissing+M365 → +12 wow · lookups≥6 → +10 wow
  ├─ benchmarkExposure() via agents/recommender/branchindex.js (BRANCHINDEX)
  │     premium = (median − p25) × employees = frusen premie de troligtvis överbetalar
  └─ Output: results/scored-YYYY-MM-DD.json + .csv (wow≥1 filter)
```

**Kritisk insikt:** Fynd-motorn crier bara "frysta avtal" när DNS-fakta stödjer tesen. Samma signal (t.ex. SPF till mailgateway) kan SÄNKA tesen — det är medvetet. CFO-säkerheten är icke-förhandlingsbar.

---

### Benchmark-motor — BRANCHINDEX

`agents/recommender/branchindex.js` (866 rader) är kärnan i alla prisjämförelser.

```
getBenchmark({ category, industry, employees })
  → { median, p25, source, unit, note, alternatives[], isTotal? }
```

**Read path i lib/benchmark.js:**
1. Vercel KV (6h TTL)
2. `invoice_datapoints` (Postgres) — kräver ≥10 datapunkter
3. `invoice_analyses` (live cross-customer) — kräver ≥5 datapunkter, returnerar `isTotal:true`
4. BRANCHINDEX mock — sources: `real-public` (verifierat) · `estimated` · `mock`

**SNI → industri:** SNI 62/63/58 → `it-tech` → `byraer`-segment. SNI 69–78 → `konsult` → `byraer`-segment.

**Nyckelpriser (real-public, 2026-06):**
- M365 Business Standard: 119,48 kr/mån (årsavtal) · p25: 1 704 kr/anv/år · median: 2 040 kr/anv/år
- Tele2 mobil Bas: 299 kr/mån · Plus: 349 kr/mån

---

### Switch-orkestrator — Arvo Switch

`agents/orchestrator/orchestrator.js` driver bytet med ett explicit tillståndsmaskin.

**Tillståndsflöde:**
```
PROPOSED → AWAITING_APPROVAL → FULLMAKT_PREPARED → BANKID_PENDING → BANKID_SIGNED
  → TERMINATED_OLD → [SCHEDULED_FUTURE |] APPLIED_NEW → LIVE → SUCCESS_FEE_DUE → COMPLETED
```
Terminal: `CUSTOMER_CANCELLED · SIGNING_EXPIRED · SUPPLIER_REJECTED · FAILED`

Bygg­klossarna: `FileStore` (persistence) · `ScriveClient` (BankID e-signering, stub i dev) · `SupplierClient` (stub) · `FortnoxWatchdog` (go-live detektion). Success fee: 20 % av år-1-besparing.

---

### Frontend — React SPA

Deployad till GitHub Pages (`build/`) via `npm run deploy` (gh-pages → `/flow`). Vercel hanterar API + React SPA i produktion.

| Sida | Route | Status | Vad |
|------|-------|--------|-----|
| Landing | `/` | ✅ Real | Värvning, intelligence-demo, CTA till testa-faktura |
| Testa Faktura | `/testa-faktura` | ✅ Real | PDF-upload → AI-analys (huvud­funnel) |
| Briefing | `/briefing/:token` | ✅ Real | Månadsvis CFO-brief (mail-länk) |
| Prospect | `/prospect/:token` | ✅ Real | Outbound-briefing för prospekts |
| Portfolio | `/portfolio` | ✅ Real | Kund-dashboard, fingerprint-baserad historik |
| Aktivera | `/aktivera` | ✅ Real | Intelligence-aktivering (POST /api/activate-intelligence) |
| Utfall | `/utfall` | ✅ Real | 60-dagars utfallsenkät (POST /api/outcome-survey) |
| Connect | `/connect` | ⚠️ Delvis | Fortnox OAuth-anslutning (Visma = stub) |
| Intelligence | `/intelligence` | ℹ️ Statisk | Produktpitch (aktiveringsformulär → API) |
| Bias | `/bias` | ℹ️ Statisk | Algoritmtransparens-sida |
| Villkor/Integritet/Cookies | `/villkor` etc | ℹ️ Statisk | Juridisk dokumentation |
| **Insights** | `/insights` | ❌ **MOCK** | Läser mockData.js — "Lindberg VVS AB" — ej kopplad till API |
| **Opportunity** | `/opportunity/:id` | ❌ **MOCK** | Läser mockData.js — BankID simulerat (2.4s delay) |
| **ArvoScore** | `/arvo-score` | ❌ **MOCK** | Statisk mock-dashboard |
| **Scanning** | `/scanning` | ❌ **MOCK** | Falsk animation ~6s, navigerar alltid till /insights |
| Admin | `/admin/**` | ✅ Real | Intern admin (magic link auth) |

Auth: Magic link via `api/auth/request-magic-link.mjs` → `magic_tokens` → `api/validate-magic.mjs` → JWT i `AuthContext.js`.

---

### Frontend — Detaljkarta

#### Design­system (`src/theme.js`)
- **Palett:** Brand `#1B7A6E` (teal) · Gradient `#5DD6CA → #1B6E66` · Bg `#F1F6F3` · Text `#0E1A17`
- **Typsnitt:** Playfair Display (display) · Inter (body) · JetBrains Mono (kod)
- **Grid:** 8px bas (4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px)
- **Radier:** sm 6px · md 12px · lg 20px · xl 28px
- **Rörelse:** fast 160ms · base 240ms · slow 420ms · spring 520ms (cubic-bezier)
- **Shadows:** brand shadow `0 12px 32px rgba(27,122,110,0.28)`

#### Arkitekturmönster
- **Styled-components:** All styling CSS-in-JS med theme-integration
- **Fingerprint-ID:** SHA-256(userAgent+screen+timezone) = anonym användar-ID för historik
- **E-post­gate:** localStorage-nycklar `arvo_successful_count` · `arvo_had_saving` · `arvo_gate_passed` — 3 fria analyser med besparing, sedan registrering
- **URL-driven state:** `?magic=<token>` · `?bypass` · `?intelligence_connected` · `?outlook_connected`
- **Scroll-animationer:** IntersectionObserver för benchmark-spektrum, saving-counter, briefing-nav
- **RAF-animationer:** RequestAnimationFrame + cubic-bezier för gauge/counter-transitions

#### Sidor — vad är byggt, vad saknas

**Landing** (`src/pages/Landing/index.js`, 822 rader)
- Hero med animerat tidslinjekort · 3-stegs how-it-works · Score-gauge (4 nivåer)
- Benchmark-spektrum (animerade dots, IntersectionObserver) · Intelligence-pitch · FAQ accordion
- Pricing: 1 995 kr/mån + 20% switch · Founding Member-formulär (POST `/api/founding-member` — enda riktiga API-anropet)
- Saknar: "Se hur Arvo löste det →" länken i tidslinjen leder ingenstans

**Testa Faktura** (`src/pages/TestaFaktura/index.js`)
- Drag-drop PDF-upload (batch-stöd) · bransch/anst­antal-väljare · Analysfaser (Extract → Categorize → Recommend)
- Visar: Arvo Score gauge · nuv. vs föreslagen kostnad · brutto/netto besparing · ArvoFee-avdrag · hårdvaruavbe­talnings­detektion · licensöver­skott · contract watch-form
- API-anrop: `/api/test-invoice` · `/api/send-analysis` · `/api/activate-intelligence` · `/api/quote-request` · `/api/feedback` · `/api/waitlist` · `/api/save-contract` · `/api/validate-magic`
- Saknar: Tier-optimerings­modal är ofullständig · `/api/quote-request` genererar inga riktiga offerter

**Briefing** (`src/pages/Briefing/index.js`)
- Scroll-snap-kort · Cover-kort med besparing · Insikts­kort per möjlighet (recommendation/cost_trend/overpaying/price_alert)
- Nav-dots (IntersectionObserver) · Action-recording (POST) · Laddnings- och felstate

**Prospect** (`src/pages/Prospect/index.js`)
- Memo-format · Intel-kort (e-postplattform, konfig­ålder, domänregistrering) · Estimat­kort per kategori
- Action-tracking (upload/activate/dismissed) · Allt data från API via magic token

**Portfolio** (`src/pages/Portfolio/index.js`)
- GET `/api/invoice-history?fingerprint={fp}` · Arvo Score beräknas från 8 segment
- Segment-grid · Faktura­lista · Rapport-formulär (POST `/api/send-report`) · CTA till Connect Fortnox/Visma

**Aktivera** (`src/pages/Aktivera/index.js`)
- OAuth-knappar (Gmail/Outlook) · ELLER e-post­formulär → POST `/api/activate-intelligence`
- Savings-banner om länkad från analys (?supplier=, ?saving=) · 3-stegs tids­linje

**Utfall** (`src/pages/OutcomeSurvey/index.js`)
- 2-stegs enkät (bytte du? → ny kostnad?) · URL-params (id, svar=ja|nej)
- POST `/api/outcome-survey` · Validering av numerisk kostnad

**Connect** (`src/pages/Connect/index.js`)
- Redirect till `/api/fortnox/auth?industry={}&employees={}` · Visma = placeholder
- Security-badges (BankID, GDPR, AES-256) · Samtyckes­check · Bransch+anst­antal-väljare

**Intelligence** (`src/pages/Intelligence/index.js`)
- 4 pelare: Marknadsintelligens · Kontrakts­kalender · Faktura­kontroll · CFO-brief
- Aktiverings­formulär POST `/api/activate-intelligence` (e-post + frivilligt bolagsnamn)

#### ❌ Kritiska mockar — ej produktions­klara

**Insights** (`src/pages/Insights/index.js`) — `import { COMPANY, SUMMARY, OPPORTUNITIES, TIMELINE } from '../data/mockData.js'`
- Visar alltid "Lindberg VVS AB" med hårdkodade möjligheter (försäkring/el/mobil/bredband/SaaS)
- Skeleton-laddning 4.2s, sedan mock-data
- Behöver: GET `/api/insights?fingerprint={}` eller session-baserat API

**Opportunity** (`src/pages/Opportunity/index.js`) — läser `OPPORTUNITIES` från mockData.js
- BankID-signering simuleras med 2.4s `setTimeout` → omedelbart "klart"
- "Mejla mig sammanfattningen" gör ingenting
- Behöver: riktig Scrive-integration + `/api/opportunity/:id`

**ArvoScore** (`src/pages/ArvoScore/index.js`) — statisk mock
- 3 klara byten · 1 låst · 5 kontrakts­förfallodatum — allt hårdkodat
- Behöver: koppling till `invoice_analyses` + `contract_timelines`

**Scanning** (`src/pages/Scanning/index.js`) — alltid klart om ~6s
- Falsk animation av Fortnox-scanning · navigerar till /insights (som också är mock)
- Behöver: real Fortnox API polling

#### Komponenter
- `Nav.js`: Sticky header · variant prop (public/app) · Auth-modal (magic link) · Founding Member-modal · Toast-notiser
- `Button.js`: 6 varianter (primary/brand/gradient/secondary/ghost/ghostInverse) · 3 storlekar
- `AuthContext.js`: email i localStorage · `?magic=<token>` vid sidladdning → POST `/api/validate-magic` → toast i Nav
- `mockData.js`: "Lindberg VVS AB" · 14 anst · VVS/installation · OPPORTUNITIES/TOTALS/SUMMARY/TIMELINE

---

### Cron-jobb (Vercel)

| Schema | Endpoint | Vad |
|--------|----------|-----|
| `0 6 * * *` | `api/cron/update-fx-rate.mjs` | Hämtar USD/EUR→SEK (FX för priskalkyl) |
| `0 7 * * *` | `api/cron/send-reminders.mjs` | 60/30-dagars kontrakts­påminnelser |
| `0 9 1 * *` | `api/cron/generate-briefings.mjs` | Månadsvis CFO-brief till alla kunder |

---

### Viktiga lib-moduler

| Fil | Vad |
|-----|-----|
| `lib/db.js` | Neon Postgres-klient (null om URL saknas — degraderar gracefully) |
| `lib/kv.js` | Vercel KV-klient (null om URL saknas) |
| `lib/benchmark.js` | Benchmark read/write med KV + Postgres + BRANCHINDEX fallback |
| `lib/briefing-generator.js` | CFO-brief-insikter (SQL, inga AI-anrop) |
| `lib/price-alert.js` | Smyghöjnings­detektion + cross-customer aggregat |
| `lib/price-alert-store.js` | getAffectedCustomers + idempotens­logik |
| `lib/price-impact.js` | Deterministisk kr/år-beräkning (inga heuristiker) |
| `lib/outbound-estimator.js` | Estimat för outbound briefings (BRANCHINDEX, ej AI) |
| `lib/sni-mapper.js` | SNI-kod → industri/segment |
| `lib/invoice-graph.js` | Uppdaterar suppliers + supplier_prices + contract_timelines |
| `lib/extraction-integrity.js` | Sanitetskontroller på extraherat data |
| `lib/labeled-corrections.js` | Few-shot flywheel — sparar AI-korrektera exempel |

---

### Miljövariabler — kritiska

```
ANTHROPIC_API_KEY     — alla AI-anrop
DATABASE_URL          — Neon Postgres (alias: POSTGRES_URL, POSTGRES_PRISMA_URL)
KV_REST_API_URL       — Vercel KV
KV_REST_API_TOKEN     — Vercel KV
RESEND_API_KEY        — e-postutskick
RESEND_FROM           — avsändaradress (default: analys@arvo-flow.se)
ARVO_ADMIN_SECRET     — admin-API-skydd (generate-prospect etc.)
CRON_SECRET           — autentisering för GH Actions → Vercel cron-anrop
ARVO_BASE_URL         — bas-URL för mail-länkar
```

---

### Nästa naturliga steg (ranked efter "Hur visste de det?"-potential)

1. **Koppla price-monitor → fynd-motor:** När `price-monitor.mjs` hittar en prisändring, slå upp vilka scored-leads som använder den leverantören (via MX-plattform) → generera "Telia höjde priset för 8 av 14 i er bransch"-insikt direkt i outbound-briefingen. Det är vår moat.

2. **T1-data (årsredovisningar):** Bolagsverket/allabolag.se-data för nyckeltal (omsättning, resultat, skuldsättning) ger CFO-relevanta fynd utan DNS. Starkaste "hur visste de det"-källan — ännu ej byggt.

3. **T2-data (kohort-delta):** Spåra leverantörs­byten i en bransch via invoice_analyses-nätverket → "6 av 14 bolag i er bransch bytte från Telia förra kvartalet". Kräver kritisk massa av kunddata.

4. **CT-datering av M365-onboarding:** crt.sh-loggar för `autodiscover.{domain}` ger exakt onboarding-datum → "Ni låste er i april 2021, typisk bindningstid är 3 år = förhandlingsbar nu". Kräver HTTP-egress (Vercel, ej sandbox).
