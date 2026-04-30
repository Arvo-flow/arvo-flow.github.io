# Invoice Guardian

Layer 2 worker #5. The retention engine. Compares every incoming invoice against the customer's signed agreement and flags smyghöjningar — indexuppräkningar utan stöd, nya avgifter, övertaxering.

This is what makes Arvo Flow an immunsystem rather than a one-shot pillburk. When a customer has had Arvo for 12 months and the elbolaget tries to sneak a 3.8% "indexuppräkning" past them, Arvo sees it on the same day. Turn off Arvo, and the leverage shifts back to the supplier.

## Architecture

Two-stage pipeline that keeps cost low:

```
incoming invoice + signed agreement
            │
            ▼
  ┌─────────────────────┐
  │  detect.js (math)   │   No LLM. Pure math + per-category seasonality.
  └─────────────────────┘
            │
            ▼
   needsAssessment?
            │
        ┌───┴────┐
       no        yes
        │        │
        ▼        ▼
   legitimate   ┌─────────────────────┐
   (skip LLM)   │ classify.js (LLM)   │   Sonnet 4.6. Judges legitimacy.
                └─────────────────────┘
                         │
                         ▼
              { classification, disputeStrategy, reasoning, disputeDraftHint }
```

**Cost optimization:** Only invoices that fail the deterministic check get LLM scrutiny. For 1000 invoices/month with ~5% anomaly rate, that's ~50 LLM calls × ~$0.005 each = **~$0.25/month per customer**. Pure math is free.

## Setup

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node agents/invoice-guardian/cli.js --demo
node agents/invoice-guardian/eval.js
```

## Usage

```js
import { guard } from './agents/invoice-guardian/index.js';

const result = await guard({
  invoice: {
    amount: 2350,
    date: '2026-04-30',
    supplierName: 'Telia Företag',
    category: 'mobil',
    lineItems: [/* optional faktura-rader */],
  },
  agreement: {
    agreedAnnualCost: 22680,
    supplierName: 'Telia Företag',
    signedAt: '2025-06-15',
    kpiClause: null,             // null if agreement has no KPI escalation clause
    invoiceFrequency: 'monthly',
    category: 'mobil',
  },
});

// → {
//   alertId, severity: 'medium', delta: { amount: 460, percent: 24 },
//   classification: 'suspicious', disputeStrategy: 'inquiry',
//   reasoning: 'Telia hänvisar till "indexuppräkning KPI" men avtalet saknar...',
//   disputeDraftHint: 'Vi ber om avtalshänvisning för KPI-uppräkningen i april-fakturan...',
//   llmInvoked: true, usage: {...}
// }
```

## Severity bands (deterministic)

Per-category seasonality tolerance is added to the band thresholds:

| Severity | Threshold (after seasonality tolerance) |
|---|---|
| `none` | within tolerance |
| `minor` | tolerance + 5–25 % |
| `medium` | tolerance + 25–50 % |
| `high` | tolerance + > 50 % |

Seasonality tolerance:
- `el`: 40 % (winter peaks)
- `kortterminal`: 30 % (transaction volume)
- `faktura-tjanst`: 10 %
- everything else: 5 %

## Classification rules (LLM)

The system prompt enforces:

1. **Default to skeptical.** Bevisbördan ligger på leverantören.
2. **KPI/indexering är legitim ENDAST om avtalet säger det.** "KPI-uppräkning" without a KPI clause = no support = `suspicious`.
3. **Säsong/volym** allowed for el + kortterminal, not for försäkring/bredband/mobil/leasing.
4. **`clear_violation`**: new fee lines not in agreement, currency conversions not agreed, "etableringsavgift" on recurring invoice.

## Output → Comm Drafter

The `alertId` + the assessment fields map directly into Comm Drafter's `alertContext`. The standard flow:

```js
const assessment = await guard({ invoice, agreement });
if (assessment.classification !== 'legitimate') {
  const mailDraft = await draft({
    eventType: EVENT_TYPES.GUARDIAN_ALERT,
    alertContext: {
      alertId: assessment.alertId,
      supplierName: assessment.supplierName,
      agreedPrice: assessment.expected,
      billedPrice: assessment.actual,
      deltaPercent: assessment.delta.percent,
      deltaAmount: assessment.delta.amount,
      reason: assessment.reasoning,
    },
  });
  // Save mailDraft as Gmail draft for the customer to review + send
}
```

## What this does NOT do

- **Auto-dispute.** We generate the draft. Kunden klickar "skicka" — och vi skickar via deras mejlklient med deras avsändarnamn. Faktura-bestridning kräver kund-signatur juridiskt.
- **Validate KPI math.** If the agreement says "KPI per Q1 förra året" we don't currently fetch SCB-data to verify the leverantör's calculation. v2 — for now we flag and let the customer ask.
- **Replace mänsklig granskning för försäkring.** Försäkringspremier kräver licensförmedlare-bedömning, inte LLM.
