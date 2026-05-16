# Arvo Flow — Projektbeskrivning för Claude Code

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
  - `recurring_subscription` — fasta abonnemang, leasing, klickkostnader för skrivare
  - `variable_usage` — ENBART roaming/övertrafik för mobiltelefoni
  - `one_time_fee` — engångskostnader
  - `hardware` — köpt hårdvara
- `aggregateLineItems()` summerar per typ i kod (AI räknar aldrig ut totaler)
- `routeExtraction()` returnerar `auto | review_queue | unsupported`
- `CONFIDENCE_THRESHOLD = 0.70`
- Viktigt: klickkostnader för skrivare = `recurring_subscription`, INTE `variable_usage`

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

## Nästa steg (planerat)

1. **CLAUDE.md** — skapad (denna fil)
2. **review_queue-test** — behöver en skannad/suddig faktura för att verifiera confidence < 0.70
3. **Supplier fingerprints (Sniper-strategi)** — Telia och Microsoft som första två, byggs om basmotorn visar tveksamhet
4. **Fortnox-integration** — om 2–3 månader när bolaget är registrerat
