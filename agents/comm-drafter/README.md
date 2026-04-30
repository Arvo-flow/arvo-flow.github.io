# Comm Drafter

Layer 2 worker #4. Generates customer-facing email + SMS drafts for every important event in a switch's lifecycle, plus Invoice Guardian alerts.

## Why this exists

Every other retention worker (Invoice Guardian, pre-emptive notifications, weekly digest) needs to produce customer-facing comms. Centralizing the draft generation in one worker means: one tone of voice, one place to A/B test wording, one cost line.

## Setup

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node agents/comm-drafter/cli.js --demo
node agents/comm-drafter/eval.js
```

## Usage

```js
import { draft, EVENT_TYPES } from './agents/comm-drafter/index.js';

const result = await draft({
  eventType: EVENT_TYPES.LIVE,
  switchRecord, // full record from Orchestrator
});
// → { subject, body, smsText, ctaLabel, ctaUrl, tone, usage }
```

For Invoice Guardian alerts, pass `alertContext` instead:

```js
await draft({
  eventType: EVENT_TYPES.GUARDIAN_ALERT,
  alertContext: {
    alertId: 'alert_xyz',
    supplierName: 'Telia Företag',
    agreedPrice: 1890,
    billedPrice: 2350,
    deltaPercent: 24,
    deltaAmount: 460,
    reason: 'Indexuppräkning utan avtalsstöd',
  },
});
```

## Model + cost

- **Haiku 4.5** — drafting from a constrained template is exactly the kind of task Haiku nails. Sonnet would be overkill, Opus would be absurd.
- ~$0.001 per draft. 1000 customers × 12 events/year ≈ ~$12/year.

## Event types covered

`switch_proposed`, `bankid_signed`, `terminated_old`, `applied_new`, `live`, `success_fee_due`, `completed`, `customer_cancelled`, `signing_expired`, `supplier_rejected`, `scheduled_future`, `guardian_alert`.

Each has a `templates.js` entry with `subjectHint`, `toneHint`, `mustInclude`, `ctaLabel`. The system prompt instructs the model to honor those hints while personalizing per customer.

## What this does NOT do

- **Send** the mail. We generate drafts; the consumer (Orchestrator, Guardian, etc.) decides whether to auto-send, queue for human review, or save as Gmail/Outlook draft.
- **Decide tone for legal docs.** Fullmakter, faktura-bestridanden, juridiska skrivelser go through dedicated templates with human review — never through the LLM-driven drafter.
