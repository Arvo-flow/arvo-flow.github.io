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

**Arbetsinsats är aldrig en faktor.** Lösningar skopas på risk och kundvärde — aldrig på hur mycket arbete de kostar. Föreslå aldrig en mindre lösning för att den större är jobbig; föreslå den mindre ENDAST när den är bättre för kunden. Pressa varje lösning till sin extrem — men håll den realistisk: extremen är den mest kompromisslösa versionen som faktiskt kan byggas och verifieras, inte den mest spektakulära som inte kan det.

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

**Partnerstrategi (hösten 2026, efter bolagsregistrering):** Arvo ingår partneravtal
med leverantörer (Microsoft CSP, Tele2 m.fl.) för förhandlade priser som kunden inte
kan få själv. Arkitekturen är förberedd: `licenseTierBenchmarks.arvoAnnual` hålls
separat från `msrpAnnual` — när ett partneravtal tecknas uppdateras `arvoAnnual` och
hela systemet (like-for-like, estimatorn, switch-kortet) plockar upp det automatiskt.
**Tills dess: kundytor får ALDRIG hävda förhandlade priser eller partnernätverk
(regel 9) — allt vi visar är verifierade publika listpriser.**

---

*Commit aldrig `.env` eller credentials · Kör aldrig `scripts/stress-test.mjs` utan explicit OK*

*Merga alltid till `main` direkt efter varje commit — lämna aldrig ändringar enbart på en feature branch.*

*Kör alltid `npm run deploy` efter push till `main` — frontend-bygget ska alltid vara uppdaterat.*

*Lös alltid allt som kan göras automatiskt — GitHub Actions (trigga workflows, läsa loggar, fixa fel), Vercel (miljövariabler via MCP om tillgängligt) — be aldrig användaren göra något som kan göras via verktyg.*

---

## Helhetsregler — LÄS FÖRE VARJE ÄNDRING (frontend och backend)

> Vi jobbar aldrig i stuprör. Varje ändring görs med hela systemet i huvudet.
> Dessa regler är icke-förhandlingsbara och gäller varje commit.

1. **En sanning per fråga.** Innan du skriver ny logik: leta upp den befintliga källan.
   Prisdata → `lib/benchmark.js` (enda läsvägen: KV → invoice_datapoints → invoice_analyses → BRANCHINDEX).
   Kr/år-impact → `lib/price-impact.js`. Formattering/etiketter → `lib/format.js` (backend) och
   `src/utils/format.js` (frontend). Like-for-like-mål → `computeLikeForLikeSaasTarget`.
   Lokala kopior av delad logik är förbjudna — det var så 2009/2000-motsägelsen och
   `calcFrozenSaving`-heuristiken föddes.

2. **AI tolkar, kod räknar.** Modellen läser fakturor och formulerar text — den får ALDRIG
   utföra finansiell aritmetik. Alla kronor, procent och per-användare-tal beräknas i
   deterministiska, testlåsta moduler och injiceras färdiga i prompten (se LFL-blocket i
   `recommend.js`: "FÖRBJUDET: räkna egna tal"). Prosakravet (`lib/prose-guard.js`)
   verifierar maskinellt att varje tal i AI:ns reasoning finns i prompten — tal utan
   källtäckning loggas (`[prosakrav]`), armeras via `PROSAKRAV_ENFORCE=1`.

3. **Inga siffror utan källa.** Varje kundsynlig siffra ska ha proveniens (livedata /
   verifierat listpris / märkt estimat) och gå att räkna hem med miniräknare.
   Heuristiker i kundytor är förbjudna. Punktestimat visas alltid med sitt intervall.

4. **Precision eller tystnad.** Kan vi inte stå för siffran visas ingen siffra.
   Fejkade flöden (simulerade scanningar, låtsas-BankID, mockdata som ser verklig ut)
   får aldrig vara routade i produktion.

5. **Följ ändringen genom ALLA ytor.** Samma data visas ofta i analyssidan, briefingen,
   prospect-sidan, mail och admin. Ändrar du copy, beräkning eller fältnamn: grep:a
   repot och uppdatera varje yta i samma commit. Mail och webb får aldrig säga olika saker.

6. **Designsystemet är lag.** `ThemeProvider` är inkopplad (`ArvoFlow.js`) — nya och ändrade
   styled-components konsumerar `theme.js` (`${({ theme }) => theme.color…}`), aldrig nya
   hårdkodade hexvärden. Prospect-sidan är mallen för dossier-designspråket.

7. **Varje fel blir en tillgång.** Ett produktionsfel är inte åtgärdat förrän det har
   (a) en rotorsaksfix, (b) ett regressionstest som låser felet för alltid, och
   (c) vid tolkningsfel: ett few-shot-exempel i flywheeln. Bumpa cache-versioner
   (`pdf:result:vN`, `bm:vN`) vid varje pipelineändring som påverkar resultat.

8. **Visuell verifiering före deploy.** UI-ändringar screenshotas i mobil (390px) OCH
   desktop (1600px) före push — mönster: `scripts/screenshot-prospect.mjs`.
   Användaren är aldrig vår QA.

9. **Kundlöften ska ha mekanik.** Skicka aldrig copy som utlovar något systemet inte
   gör ("briefing skickas inom kort" utan ingest). Löftet och koden levereras tillsammans.
   Maskinvakt: `scripts/claims-audit.mjs` (pre-commit, bredvid price-audit) blockerar
   förbjudna påståenden i kundytor — listan VÄXER med varje incident. Legitim träff
   motiveras inline med `// claims-ok: <skäl>`. Exempel-innehåll märks alltid "Exempel".

---

## Systemarkitektur — Full karta (uppdaterad 2026-06-10)

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

### Ingest — mail-in (dörren till kontoret)

```
Kund vidarebefordrar faktura-PDF → inbox-adress (Resend inbound)
  │
  ▼
api/inbound-email.mjs            ← webhook email.received, maxDuration 60
  ├─ Auth: ?secret=INBOUND_WEBHOOK_SECRET (constant-time) · idempotens per email_id (KV)
  ├─ Rate limit 10 mail/avsändare/dygn · endast PDF · max 2 bilagor · max 6 MB
  ├─ INTERNT POST /api/test-invoice (bypass) — EN pipeline, aldrig en kopia (regel 1)
  │    identitet = avsändaradress (userEmail) + syntetisk fingerprint mail:<sha16>
  ├─ Magic token (magic_tokens) → kontorslänk /portfolio?magic=<token>
  └─ Svarsmail ENBART till avsändaren: fynd + siffror + "Öppna ert Arvo-kontor →"
```

**Kontorets datadörr:** `api/invoice-history?fingerprint=…&magic=…` — magic-token
(ur kundens inkorg) är ägarskapsbeviset för e-postnycklad historik
(`getAnalysesByEmail`, slås ihop med fingerprint-historiken). Klienten får ALDRIG
fråga på rå e-postadress.

**Engångs-setup — ✅ KLAR 2026-06-11 (verifierad live end-to-end: mail → analys → svarsmail → kontoret):**
1. ✅ Resend → Domains: `inbox.arvoflow.se` Verified (MX/SPF/DKIM i Loopia)
2. ✅ Resend → Webhooks: `email.received` → `https://arvoflow.se/api/inbound-email?secret=<INBOUND_WEBHOOK_SECRET>`
3. ✅ Vercel env: `INBOUND_WEBHOOK_SECRET` + `RESEND_API_KEY` (Full access — sending-only-nycklar får 400 på receiving-API:t)

**Resend-läxor (inlåsta i tests/inbound-attachments.mjs):**
- `email.received`-webhooken bär ALDRIG bilageinnehåll — endast metadata. PDF:er hämtas i andra steg: `GET /emails/receiving/{email_id}/attachments` → signerad `download_url`
- Loopias negativa DNS-cache är 24 h (SOA minttl) — lägg ALLTID in DNS-poster FÖRE domänregistrering i Resend, annars fastnar "Checking DNS" på cachat NXDOMAIN
- Tysta tidiga utgångar är förbjudna — varje return i inbound-handlern loggar sitt skäl

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
| Insights | — | 🚫 **AVROUTAD** | Mock (Lindberg VVS). Fil kvar, ej nåbar i prod. Byggs på riktigt mot API eller raderas. |
| Opportunity | — | 🚫 **AVROUTAD** | Mock (simulerat BankID). Fil kvar, ej nåbar i prod. |
| ArvoScore | — | 🚫 **AVROUTAD** | Statisk mock. Fil kvar, ej nåbar i prod. |
| Scanning | — | 🚫 **AVROUTAD** | Fejk-animation. Fil kvar, ej nåbar i prod. Visma i Connect visar nu ärligt "lanseras inom kort". |
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

#### 🚫 Potemkin-sidorna — avroutade 2026-06-10 (regel 4: precision eller tystnad)

Insights, Opportunity, Scanning och ArvoScore är borttagna ur `ArvoFlow.js`-routingen —
de simulerade verkliga flöden (falsk Fortnox-scanning, låtsas-BankID, hårdkodat bolag)
och fick aldrig nås av riktiga besökare. Filerna ligger kvar som designreferens.
Återinförs ENDAST kopplade mot riktiga API:er. mockData.js används numera enbart av
dessa oroutade filer — Landing och TestaFaktura är frikopplade (`src/utils/format.js`).

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
| `lib/outbound-estimator.js` | Estimat för outbound briefings — läser PRISBOKEN via lib/benchmark.js (livedata → listpris-fallback, sanity-band), ej AI |
| `lib/format.js` | EN källa för sv-SE-formattering/etiketter i backend (frontend: `src/utils/format.js`) |
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
RESEND_FROM           — avsändaradress (default: analys@arvoflow.se)
ARVO_ADMIN_SECRET     — admin-API-skydd (generate-prospect etc.)
CRON_SECRET           — autentisering för GH Actions → Vercel cron-anrop
INBOUND_WEBHOOK_SECRET — auth för Resend inbound-webhook → api/inbound-email
ARVO_BASE_URL         — bas-URL för mail-länkar
```

---

### Arkitekturstatus — åtgärdat & känd skuld (2026-06-10)

**Åtgärdat (denna iteration):**
- ✅ Prorata-buggen i like-for-like ("188 kr/anv", uppblåst besparing) — deterministisk fix + regressionssvit (CR-88412)
- ✅ En prissanning: `calcFrozenSaving`-heuristiken raderad; outbound-estimatorn läser prisboken via `lib/benchmark.js`
- ✅ Potemkin-rutterna (/insights, /opportunity, /scanning, /arvo-score) avroutade; Visma i Connect ärlig ("inom kort" + waitlist)
- ✅ mockData frikopplad från Landing/TestaFaktura; delade format-utils (`lib/format.js` + `src/utils/format.js`) ersätter 3 kopior
- ✅ `src/App.js` (2 100 rader död kod) raderad
- ✅ Löftesbuggen i Gmail/Outlook-callbacks (utlovad briefing utan ingest) — ärlig copy med testa-faktura-CTA
- ✅ Prospect-sidan: dossier-designspråk, desktop-kolumn, spektrum-bar — MALLEN för premiumytor
- ✅ Designspråket LÅST I KOD: `theme.dossier` i `src/theme.js` (palett, metallic-text, aurora, keyline, glöd, CTA, dossier-kolumn) — Prospect/styles.js konsumerar 100 % tokens (0 hårdkodade hex), mall för all migrering

**Åtgärdat (ingest + kontoret, fas 1):**
- ✅ Ingest-arbetaren: api/inbound-email.mjs — mail-in → samma pipeline → datapunkt → svarsmail med kontorslänk (extern setup återstår: Resend MX + webhook + env, se Ingest-sektionen)
- ✅ Identitet light: analyser e-postnycklas (user_email) · invoice-history med magic-token-bevis · Portfolio skickar magic ur kontorslänken

**Åtgärdat (bristkorrigeringen, fas 1 — 2026-06-10):**
- ✅ Balanskravet B2: `judgeLineArithmetic` (antal × à-pris = radbelopp, prorata ≤ fullt pris) i extraction-integrity — inkopplad i routeExtraction i SKUGG-LÄGE (loggar `[balanskrav]`), armeras med env `BALANSKRAV_ENFORCE=1` när falsklarmsfrekvensen är uppmätt. B1 (radsumma = fakturatotal) gatade redan (Ring 1).
- ✅ Prisbokens semantik: kundytor säger "ordinarie listpris" när källan är listpris, "median av verifierade fakturor" först när livedata bär — fördelningsspråk utan fördelning är förbjudet
- ✅ Enhetskarantän i storeDatapoint: per-användar-kategorier utanför 0,1–10× listpris-median lagras aldrig (enhetsfel förgiftar inte prisboken)
- ✅ Rad-först fas 1 (SKUGGA): `lib/invoice-lines.js` — per-rad-klassning + kategoriaggregering loggas per analys (`[rad-först SKUGGA]`) som beslutsunderlag för fulla strypare-migreringen. Ren instrumentering, når aldrig kund.
- ✅ Cellteckningen: benchmark-stats med status per cell (BÄR/LIVE-LIGHT/NÄRA/MOCK) + Prisboken-flik i admin — outbound-listor väljs på celler nära tröskeln

**Åtgärdat (ordens försvar — 2026-06-11):**
- ✅ Prosakravet: `lib/prose-guard.js` — varje tal i AI-reasoning verifieras mot promptens injicerade fakta (683-felklassen maskinfångad). SKUGGA → armeras med `PROSAKRAV_ENFORCE=1`
- ✅ Påståendevakthunden: `scripts/claims-audit.mjs` i pre-commit — förbjudna löften ("partnernätverk", "skickas inom kort", "inklusive er"…) kan aldrig committas till kundytor igen. Fångade 4 missade brott på första körningen (Landing ×2, OAuth-bannern ×2)
- ✅ Påståendeinventeringen genomförd: alla löftesformade meningar i kundytan klassade FAKTA/LÖFTE/EXEMPEL — hero-tidslinjen exempel-märkt; kvarvarande tidslöften ("inom 24/48 h") är medvetna operativa SLA:er som grundaren äger
- ✅ Attribueringsskyddet: LFL-prompten ger fakturerat à-pris per tier + ATTRIBUERING-regel (per-seat-total får aldrig kallas licenspris)

**Åtgärdat (Svea-läxan, print-kortet — 2026-06-11):**
- ✅ Print-benchmarken: lokala `PRINT_BENCHMARKS` (0,065/0,275 — motsade prisboken) raderade; `analyzeClickRates` läser `BRANCHINDEX.skrivarleasing.clickRateBenchmarks` (S/V 0,08–0,15 · färg 0,55–1,00, märkt estimat) och visar BANDET — aldrig en punkt eller syntetiskt intervall (×1,15-fabrikatet borta)
- ✅ ×0,80-läxan: frontend multiplicerade backendens besparingstal med hårdkodade 0,80 (85 440 ≠ kodens tal) — borttaget; claims-audit blockerar nu all frontend-aritmetik på besparingsfält (`src-only`-regel)
- ✅ Etikettsemantik: "X % mer" beräknas alltid (pris−bandtopp)/bandtopp — andel-av-priset-formeln får aldrig kallas "mer än" (85-felet)
- ✅ Ny avgift-detektorn: `lib/fee-signals.js` — leverantörens egna höjningsmarkörer ("Ny tariff", "prisjustering"…) i radbeskrivningar blir fyndets öppningsmening + annualiserad kostnad
- ✅ Maskinhyran in i analysen: per-maskin-pris mot A4-norm (200–400 kr/mån) + bindningstid mot 36-månadersnorm, med ärlig A3-reservation
- ✅ Projektionskravet (SKUGGA): `judgeProjection` — AI:ns `projectedRecurringAmount` får avvika max 2 % från deterministiska radsumman utan prorata-rader; armeras via `PROJEKTIONSKRAV_ENFORCE=1`
- ✅ Regressionssvit `tests/svea-print.mjs` (18 tester) låser faktura 440192 för alltid

**Åtgärdat (revisionsgrinden + sifferrevisorn — 2026-06-11):**
- ✅ **Revisionsgrinden** (`lib/revision-gate.js`): regel 4 som ARKITEKTUR — oreviderade kategorier kortsluter i `recommend()` till talfritt offert-läge FÖRE all beräkning och AI. Endast kategorier med dedikerad regressionssvit (`REVIDERADE_KATEGORIER`: saas-productivity, mobil, bredband, el, skrivarleasing, kortterminal) får visa siffror. Okända fel kan inte längre nå kund — de kan bara drabba ytor som redan bär maskinlås
- ✅ **Sifferrevisorn** (`scripts/sifferrevisor.mjs`, pre-commit): bevisar tystnadsgarantin maskinellt — kör `recommend()` offline för VARJE oreviderad kategori (21 st) och underkänner commit om någon läcker en siffra (fält eller copy); verifierar att varje grindad kategori pekar på sviter som existerar. Fångade sitt första fel på första körningen (`saas-devtools` fanns inte i CATEGORIES)
- ✅ **Städpass skuld #6 KLAR:** alla 30 röda tester gröna — 24 fixturer + BI-03/BI-08 hade driftat från medvetna priskorrigeringar (bredband-p25 9 000→10 200 = Tele2 849×12 verifierat; mobil-p25 →3 588 = Tele2 Bas 299×12). 7 fixturer fick `secondary: null` — kunder på verifierat listpris ska inte loviseras besparingar. Sviten: **1 270/1 270 grönt, 0 fel**
- ✅ Pre-commit-kedjan nu: price-audit → claims-audit → sifferrevisorn · cache bumpat till `pdf:result:v7`

**Åtgärdat (attribueringslåset — 2026-06-11, kväll):**
- ✅ **683-felet återkom i produktion TROTS ATTRIBUERING-regeln i prompten** (färska körningar verifierade i Vercel-loggar 12:31/15:28/16:23) — beviset för att promptregler är råd, inte lås. Fix: `buildLikeForLikeReasoning` i recommend.js — när LFL-fakta är kompletta ersätts AI:ns reasoning med KODSKRIVEN text (samma mönster som print-kortet). En maskinskriven mening kan inte felattribuera. Loggas `[attribueringslås]`
- ✅ Magnitudmedveten scorecard-fras: "kostar väsentligt mindre" sägs bara vid gap ≥15 % — vid 5 % var frasen självmotsägande (TestaFaktura `_bmPhrase`)
- ✅ 6 nya regressionstester i `tests/balanskrav.mjs` låser NMIT-texten: 420 = E3-radens à-pris, 384,70 = årsavtalet, 683 förbjudet, varje tal källtäckt · cache → `pdf:result:v8` · sviten 1 276/1 276
- **Princip befäst:** AI-prosa med kompletta deterministiska fakta ska GENERERAS av kod, inte verifieras i efterhand — verifiering (prosakrav) är skyddsnätet för fall där fakta inte räcker till en mall

**Känd skuld (rankad — beta inte av som program, fixa när ytan ändå rörs eller när fasen kräver det):**
1. **Identitet (full):** magic link-kontot som primärnyckel överallt — light-varianten klar (e-postnycklad historik via tokenbevis); kvarstår: session som överlever 24h-tokens, konto-UI
2. **E-post-ingest, nästa steg:** ~~extern setup (MX/webhook/env)~~ ✅ LIVE 2026-06-11 (verifierad end-to-end) → personliga skuggadresser per kund → Outlook OAuth (historisk skörd) → Gmail efter CASA. Kontorets dossier-UI byggs när ingesten ger innehåll
2b. **Rad-först fas 2–3:** när skuggloggen visat flerkategori-frekvensen — `aggregateByCategory` blir källan, specialfälten (primaryComponentMonthly m.fl.) blir härledda vyer, konsumenter flyttas en i taget med korpusdiff som skyddsnät
2c. **Balanskravet armeras:** mät `[balanskrav]`-skuggloggen ~1 vecka → <2 % falsklarm → sätt `BALANSKRAV_ENFORCE=1` i Vercel
3. **Dubbla alertvägar:** `api/cron/run-price-alerts.mjs` + `scripts/notify-price-changes.mjs` — extrahera gemensam lib
4. **Theme-migrering:** 1/20 sidor konsumerar theme.js (Prospect = mall, 0 hex) — migrera per sida när den ändå rörs (regel 6)
4b. **Arvo-kontoret:** Portfolio → e-postnycklat premiumrum i dossier-språket: fyndflöde, bevakningsstatus, kontraktskalender (`contract_timelines` saknar vy), "detta hände sedan sist". Byggs som EN enhet med e-post-ingesten — mailen är dörren, kontoret är rummet
5. **extraction-integrity som GATE:** varnar idag, ska stoppa obalanserade analyser → granskningskö ("balanskravet")
6. ~~30 pre-existerande testfel~~ — ✅ KLART 2026-06-11 (sviten 1 270/1 270). Nästa: kategorier ut ur revisionsgrindens tystnad en i taget — priset är alltid fixturfaktura + svit + grönt i sifferrevisorn
7. **Migrationer:** 4 filer som körs i ordning ur minnet — en samlad migrate-runner

---

### Nästa naturliga steg (ranked efter "Hur visste de det?"-potential)

1. **Koppla price-monitor → fynd-motor:** När `price-monitor.mjs` hittar en prisändring, slå upp vilka scored-leads som använder den leverantören (via MX-plattform) → generera "Telia höjde priset för 8 av 14 i er bransch"-insikt direkt i outbound-briefingen. Det är vår moat.

2. **T1-data (årsredovisningar):** Bolagsverket/allabolag.se-data för nyckeltal (omsättning, resultat, skuldsättning) ger CFO-relevanta fynd utan DNS. Starkaste "hur visste de det"-källan — ännu ej byggt.

3. **T2-data (kohort-delta):** Spåra leverantörs­byten i en bransch via invoice_analyses-nätverket → "6 av 14 bolag i er bransch bytte från Telia förra kvartalet". Kräver kritisk massa av kunddata.

4. **CT-datering av M365-onboarding:** crt.sh-loggar för `autodiscover.{domain}` ger exakt onboarding-datum → "Ni låste er i april 2021, typisk bindningstid är 3 år = förhandlingsbar nu". Kräver HTTP-egress (Vercel, ej sandbox).
