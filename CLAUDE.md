# Arvo Flow — Projektbeskrivning för Claude Code

## Testprotokoll (OBLIGATORISK REGEL)

**Innan varje ändring av följande måste `node scripts/stress-test.mjs` köras och passera:**
- `CONFIDENCE_THRESHOLD` i `agents/test-invoice/extract.js`
- `routeExtraction()` — routing-logik
- `SYSTEM_PROMPT` i `agents/test-invoice/extract.js`
- Finansiella guards i `api/test-invoice.mjs`

**Varför:** En ändring av CONFIDENCE_THRESHOLD 0.70 → 0.85 fick Telia-kombinationsfakturor
(mobil + bredband) att hamna i review_queue. Stress-testet hade fångat detta OM det körts.
Golden master i `scripts/stress-test.mjs` definierar förväntad route + minConfidence per faktura.

Testet täcker 80 fakturor (74 syntetiska i repot + 6 riktiga kundfakturor lokalt).
GitHub Actions kör automatiskt mot de 74 syntetiska vid push till AI-relaterade filer.

```bash
# Kör ALLTID detta innan push av ovanstående filer:
node scripts/stress-test.mjs
```

---

## Ny kundfaktura-process (OBLIGATORISK)

**Innan en ny faktura-typ läggs ut i produktion:**

1. Kopiera fakturan till `test-pdfs/customer-<leverantör>.pdf`
2. Kör extraktorn: `node scripts/stress-test.mjs customer-<leverantör>.pdf`
3. Granska output — verifiera att route=auto och att belopp/seatCount är korrekta
4. Lägg till som golden master i `scripts/stress-test.mjs` (i blocket för kundfakturor)
5. Kör hela stresstest: `node scripts/stress-test.mjs` — alla 80 måste passera
6. Commit och push (customer-*.pdf committas INTE — de är gitignorerade)

**Aldrig:** Starta produktion med en ny faktura-typ utan ett godkänt golden master.

**CI-täckning:** `.github/workflows/stress-test.yml` kör automatiskt de 74 syntetiska
testfakturorna vid ändring av `agents/test-invoice/**`, `api/test-invoice.mjs` eller
`scripts/stress-test.mjs`. Kräver `ANTHROPIC_API_KEY` som GitHub Secret.

---

## Git-workflow (OBLIGATORISK REGEL)

**Efter varje push till feature-branch: merga alltid till `main` och pusha `main`.**

```bash
git checkout main
git merge claude/fix-invoice-ai-deployment-OFyG2 --no-edit
git push -u origin main
git checkout claude/fix-invoice-ai-deployment-OFyG2
```

Denna regel gäller alltid, utan undantag, direkt efter varje `git push` till feature-branchen.

---

## Vad är Arvo Flow?

Svensk B2B SaaS-produkt. Kunden laddar upp en leverantörsfaktura (PDF) och får direkt:
- Vad de betalar idag vs branschsnittet
- Hur mycket de kan spara och hos vem
- Arvo sköter hela leverantörsbytet mot 20 % av realiserad besparing

**Affärskontext:** Inget bolag registrerat än. Ingen Fortnox API-access de närmaste 2–3 månaderna (juridiska skäl). PDF-parsern ÄR produkten just nu — demo, väntelista, investorpitch.

---

## Teknikstack

- React SPA (Create React App), styled-components, React Router
- Vercel Serverless Functions (`api/test-invoice.mjs`), maxDuration: 60
- Anthropic Claude API: Opus 4.7 (extract), Haiku 4.5 (categorize), Sonnet 4.6 (recommend)
- Branch: `claude/fix-invoice-ai-deployment-OFyG2` → mergad till `main`

---

## Pipeline: extract → categorize → recommend

### 1. Extract (`agents/test-invoice/extract.js`)
- Modell: Claude Opus 4.7 med native PDF-support
- **Semantisk rad-för-rad-klassificering** (Universal Semantic Extractor):
  - `recurring_subscription` — fasta abonnemang, leasing, fasta licensavgifter. Fast maskinhyra i Managed Print = recurring_subscription.
  - `variable_usage` — mobilroaming/övertrafik OCH klickkostnader (kr/sida) i Managed Print-avtal. Annualiseras ej.
  - `one_time_fee` — engångskostnader
  - `hardware` — köpt hårdvara
- `aggregateLineItems()` summerar per typ i kod (AI räknar aldrig ut totaler)
- `annualCost = projectedRecurringAmount × multiplier` — inkluderar INTE variable_usage
- `routeExtraction()` returnerar `auto | review_queue | unsupported`
- `CONFIDENCE_THRESHOLD = 0.70`
- Skrivarleasing: fast maskinhyra = `recurring_subscription`, klickkostnader = `variable_usage`
- Managed Print-guard i recommend.js: om klick-ratio > 35 % → `requiresQuote: true`, ingen AI-rekommendation

### 2. Categorize (`agents/categorizer/`)
- Modell: Claude Haiku 4.5
- Kategorier: mobil, mjukvara-saas, skrivarleasing, el, bredband, m.fl.

### 3. Recommend (`agents/recommender/`)
- Modell: Claude Sonnet 4.6
- Deterministic financial overrides: `suggestedAnnualCost` och `savingPerYear` låses mot `benchmark.p25` i kod
- `licenseOverage = seatCount - employees` (visas om seatCount > employees)
- SEKRETESSREGEL: namnge ALDRIG specifikt alternativt varumärke i reasoning
- OVERRIDE för Kategori 1 (mobil, mjukvara-saas): leverantörnamn FÅR namnges i reasoning

---

## Kategori 1 vs Kategori 2

```js
const REAL_PRICE_CATEGORIES = new Set(['mjukvara-saas', 'mobil']);
```

| | Kategori 1 | Kategori 2 |
|---|---|---|
| Exempel | Microsoft 365, Telia | Ricoh, Konica Minolta |
| Prismodell | Offentliga listpriser | Kontraktsbaserat |
| Visar leverantör | Ja, öppet | Nej — "Kvalificerad Print-leverantör" |
| Reasoning | Namnger leverantören | "Arvo-verifierad partner" |
| PartnerBlock-knapp | "Aktivera bytet" | "Säkra besparingen" |

---

## API-respons (`api/test-invoice.mjs`)

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

## Viktiga fixar som gjorts

1. **Klickkostnader för skrivare** klassificerades felaktigt som `variable_usage`. Fixat med explicit regel i SYSTEM_PROMPT: "SAMT klickkostnader för skrivare i Managed Print-avtal" under recurring_subscription.

2. **Leverantörnamn läckte i reasoning** för Kategori 2 (t.ex. "Minoltas SMB-portfölj"). Fixat med SEKRETESSREGEL i system-prompten + OVERRIDE-instruktion i user-meddelandet för Kategori 1.

3. **`result.recommendation` undefined** för `review_queue`-route. Fixat med null-safe `?.`-operatorer i frontend + explicit route-guard på KV-blocket.

---

## Testverktyg

```bash
# Batch-test av extract-steget mot alla PDF:er i test-pdfs/
node scripts/stress-test.mjs

# Enskild faktura
node scripts/stress-test.mjs ricoh.pdf
```

Kräver `ANTHROPIC_API_KEY` i `.env` (finns lokalt, gitignorerad).
PDF-filer i `test-pdfs/` (gitignorerade): ricoh.pdf, telia.pdf, microsoft.pdf, unclear.pdf, outofscope.pdf.

---

## Verifierade testresultat (senaste stress-test)

| Faktura | Route | Confidence | Klassificering |
|---|---|---|---|
| Telia | auto | 97 % | Roaming=rörlig, abonnemang=återkommande ✓ |
| Ricoh | auto | 95 % | Alla klickkostnader=återkommande ✓ |
| Microsoft | auto | 97 % | seatCount=57, licenseOverage=12 ✓ |
| Advokatfirman | unsupported | — | outOfScope korrekt ✓ |
| Kalles Alltjänst | unsupported | — | outOfScope korrekt ✓ |

---

## Live-domän

```
https://arvoflow.se/testa-faktura?bypass=dev
```
(utan bindestreck — `arvoflow.se` inte `arvo-flow.se`)

---

## Implementerade kvalitetsnivåer

### Nivå 1 — Postgres-lager
- `lib/invoice-store.js` — lagrar varje `auto`-analys i `invoice_analyses`-tabellen
- `api/test-invoice.mjs` anropar `storeAnalysis()` fire-and-forget efter varje lyckad analys
- Fingerprint hashas server-side (SHA-256) innan lagring för GDPR-säkerhet
- `scripts/migrate.mjs` — ny tabell `invoice_analyses` med index på (fingerprint, created_at)

### Nivå 2 — Supplier Fingerprinting
- `lib/supplier-fingerprints.js` — fullt implementerat
- Pre-routing confidence boost: kända leverantörer med ≥0.70 boostar till threshold
- Post-kategorisering fingerprint-validering: mismatch → review_queue med alert

### Nivå 3 — Portföljvy
- `api/invoice-history.mjs` — GET /api/invoice-history?fingerprint=<fp>
- `src/pages/Portfolio/index.js` — React-sida med samlade analyser per browser-fingerprint
- Route: `/portfolio` i ArvoFlow.js
- Visar: totalt analyserade, total årskkostnad, total nettobesparing, per-leverantörs-kort + Fortnox/Visma-CTA

---

## Nästa steg (planerat)

1. **review_queue-test** — behöver en skannad/suddig faktura för att verifiera confidence < 0.70
2. **Fortnox-integration** — om 2–3 månader när bolaget är registrerat
3. **Portföljvy v2** — visa segment-coverage (8 segment), Arvo Score™ aggregat för hela portföljen
