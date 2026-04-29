# Categorizer

Layer 2 worker for Arvo Flow. Takes a raw Fortnox/Visma supplier invoice and returns a structured classification: which of our 8 categories it belongs to, the normalized supplier name, a confidence score, and a one-sentence reasoning trail.

This is the foundation everything else depends on — without correct categorization the Recommender can't compare against benchmarks and the dashboard can't aggregate by category.

---

## Why this is the simplest worker to build first

- **Stateless** — same input → same output, no orchestration, no DB
- **Cheap** — Haiku 4.5 + prompt caching means ~0.01 SEK per invoice at scale
- **Easy to evaluate** — feed 30 known invoices, measure accuracy, iterate prompt
- **Independent** — works without any other component of the system existing
- **Pattern-setter** — once this works, the other 4 workers (Recommender, Comm Drafter, Switch Orchestrator, Compliance Reviewer) follow the same shape

---

## Setup

The Anthropic SDK is already in the root `package.json` (`@anthropic-ai/sdk`). Just set your API key:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

Or add it to a `.env` file at the repo root and load it (the existing `dotenv` dep handles this).

---

## Usage

### Single invoice

```js
import { categorize } from './agents/categorizer/index.js';

const result = await categorize({
  supplier: 'VATTENFALL FÖRETAG AB',
  amount: 18234,
  date: '2025-03-15',
  account: '5310',
  description: 'ELFÖRBRUKNING MARS 2025',
  recurring: true,
});

console.log(result);
// {
//   category: 'el',
//   subType: 'rörligt',
//   normalizedSupplier: 'Vattenfall (Företag)',
//   confidence: 0.97,
//   reasoning: 'Konto 5310 + "elförbrukning" i beskrivning + Vattenfall som känd elleverantör',
//   licensePending: false,
//   usage: { input_tokens: 47, output_tokens: 89, cache_creation_input_tokens: 1980, cache_read_input_tokens: 0 },
//   raw: { ... }
// }
```

### Batch

```js
import { categorizeBatch } from './agents/categorizer/index.js';

const results = await categorizeBatch(invoices, { concurrency: 8 });
```

For 100+ invoices that aren't latency-sensitive, use Anthropic's [Message Batches API](https://docs.anthropic.com/en/docs/build-with-claude/batch-processing) instead — it's 50% cheaper.

### CLI

```bash
# Read from a JSON file
node agents/categorizer/cli.js path/to/invoice.json

# Pipe via stdin
cat invoice.json | node agents/categorizer/cli.js

# Try the demo
node agents/categorizer/cli.js --demo
```

### Eval

```bash
# Run all 30 fixtures, show accuracy + cost breakdown
node agents/categorizer/eval.js

# Higher concurrency for faster evals
node agents/categorizer/eval.js --concurrency 8

# Machine-readable output for CI
node agents/categorizer/eval.js --json
```

---

## Model and cost

| Aspect | Choice | Why |
|---|---|---|
| Model | `claude-haiku-4-5` | Categorization is a pattern-matching task. Haiku 4.5 hits >95% accuracy on this in our fixtures. Opus 4.7 would cost ~15× more for marginal gains. |
| Output | Tool use (`categorize` tool) with `tool_choice` forcing | Structured output without prose drift. Schema-validated by the SDK. |
| Caching | `cache_control: ephemeral` on system prompt | Haiku 4.5's prompt-caching minimum is 4096 tokens. Today's prompt is ~2500 tokens, so the marker is a silent no-op (`cache_creation_input_tokens: 0` on every request). Activates automatically once we grow the prompt past 4096 tokens. Leaving the marker in now means zero diff at that point. |
| Max tokens | 512 | Output is always a single tool call, ~80–150 tokens. 512 is generous headroom. |

**Cost at production scale** (1 customer, 50 invoices/month):
- Per invoice (no caching today): ~2500 input × $1/MTok + ~150 output × $5/MTok = **~$0.0033**
- Per customer per month: **~$0.16** (≈ 1,7 kr)

For 1000 customers × 50 invoices/mo × 12 mo = 600k invoices/year ≈ **$2 000/year** in Categorizer costs without caching. Once the prompt grows past 4096 tokens and caching kicks in, ~80% of that disappears (cache reads cost 0.1× input price), bringing it to **~$400/year**. Either way: negligible vs. revenue from a single bytte.

---

## Categories

The 8 active categories live in `categories.js`:

| Key | Label | License needed? |
|---|---|---|
| `el` | Elavtal | No |
| `mobil` | Mobilabonnemang | No |
| `bredband` | Företagsbredband | No |
| `kortterminal` | Kortterminal | No |
| `faktura-tjanst` | Fakturatjänst | No |
| `leasing-bil` | Företagsleasing | No |
| `forsakring-foretag` | Företagsförsäkring | **Yes (FI)** — flagged `licensePending: true` |
| `forsakring-ansvar` | Yrkesansvarsförsäkring | **Yes (FI)** — flagged `licensePending: true` |
| `uncategorized` | (catch-all) | — |

`licensePending` propagates to the result object so downstream code can route license-pending categories into the VIP-queue flow instead of the byte-execution flow.

To add a new category: add it to `categories.js` (the system prompt regenerates from that file on import), add fixtures to `fixtures/invoices.json`, run the eval to verify accuracy stays ≥95%.

---

## Where this fits in the bigger picture

```
Fortnox webhook → State machine (Layer 1)
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
       [CATEGORIZER]      Other Layer-2 workers:
       (this module)      - Recommender
              ↓           - Comm Drafter
       Categorized        - Switch Orchestrator
       invoice DB         - Compliance Reviewer
              ↓
       Recommender input
              ↓
       BankID-signed switch
              ↓
       Success-fee billing
```

The Categorizer doesn't decide what to recommend or what action to take — it only labels. That's by design: this module should be boring, fast, and never the cause of an outage.

---

## Failure modes & mitigations

| Failure | Likelihood | Mitigation |
|---|---|---|
| Model returns invalid category | Low | `tool_choice` forces the `categorize` tool. Schema validation in `categorize.js` rejects unknown enum values. |
| Hallucinated supplier name | Low | We accept any normalization — if it's wrong it'll show up as the recommended supplier in the UI, where the user catches it before signing. |
| Rate limit during batch | Medium | `categorizeBatch` defaults to concurrency 4. For larger volumes use Anthropic's Batch API. |
| Ambiguous invoices (Vattenfall Värme = fjärrvärme, not el) | Medium | Explicit examples in the system prompt. Falls back to `uncategorized` rather than guessing. Eval fixtures cover this case (f-005). |
| API key missing | High in dev, never in prod | `getClient()` throws `CategorizerError` early with a clear message. |

---

## Next steps after this module is in production

1. **Recommender** — takes a `category` + branschindex + customer profile → picks best alternative supplier. Same pattern (system prompt + tool use), but with Sonnet 4.6 because the reasoning is more nuanced.
2. **Logging** — pipe every categorization to a structured log (Helicone, LangSmith, or just Postgres) so you can re-eval against real data, not just fixtures.
3. **Eval against real customer data** — once 5 pilot customers have run scans, replace the fixtures with anonymized real invoices and re-run accuracy. Target: ≥97% before public launch.
4. **Active learning** — when a user manually corrects a categorization in the UI, log it as a training signal. Re-tune the prompt every quarter against accumulated corrections.
