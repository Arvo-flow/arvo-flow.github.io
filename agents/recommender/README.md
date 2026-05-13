# Recommender

Layer 2 worker #2 for Arvo Flow. Takes (a) a categorized invoice from the Categorizer, (b) the customer's profile (industry, size), and (c) our branchindex for that segment, and returns a structured recommendation: should we switch supplier, which alternative, what's the saving, and concrete switch steps.

This is the worker that turns raw classifications into actionable advice — and the one most directly bound by our `/bias` policy: the algorithm scores on total cost of ownership minus switching cost, never on affiliate size.

---

## Why Sonnet 4.6 (not Haiku 4.5)

Categorization was a labelling task — Haiku handled it. Recommendation is a judgment task across multiple criteria:

- Is the customer overpaying *enough* to justify the friction of a switch?
- Among 3–5 alternatives, which has the best TCO × reliability ratio?
- Is the category license-pending (försäkring) — in which case we must NOT name a specific alternative, even if we know the right one?
- Is this a 4-person agency paying for datacenter-grade fiber, or a tillverkningsbolag where the price actually fits the volume?

Haiku 4.5 fumbles on the third and fourth in our internal tests. Sonnet 4.6 handles them, plus we get adaptive thinking which surfaces the reasoning trail when needed.

**Cost per recommendation**:
- Without caching: ~1700 input × $3/MTok + ~250 output × $15/MTok = **~$0.0089**
- With caching active (prompt grows past 2048 tokens): ~$0.0035 typical
- Per customer per quarter (re-evaluating ~8 categories): ~$0.07 (≈ 0,7 kr)
- 1000 customers × 4 quarters/year = ~$300/year. Negligible vs revenue per customer.

---

## Setup

Same as Categorizer:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

---

## Usage

```js
import { recommend } from './agents/recommender/index.js';

const result = await recommend({
  customer: { industry: 'byraer', employees: 14, revenue: 24000000 },
  invoice: { annualCost: 84000 },
  categorized: {
    category: 'el',
    subType: 'fast',
    normalizedSupplier: 'Vattenfall (Företag)',
    confidence: 0.97,
  },
});
```

Output shape:

```js
{
  shouldSwitch: true,
  suggestedSupplier: 'Tibber',
  suggestedAnnualCost: 47000,
  savingPerYear: 37000,
  overpaymentPercent: 29,
  confidence: 'high',
  vipQueue: false,
  reasoning: 'Du betalar 29 % över medianen för byråer med din storlek...',
  switchSteps: [
    'Vi förbereder uppsägning av Vattenfall (30 dagars varsel)',
    'Du signerar Tibber-avtalet med BankID',
    'Tibber tar över leverans nästa månadsskifte — inget strömavbrott',
  ],
  benchmark: { /* the branchindex slice we used */ },
  usage: { /* token + cache breakdown */ },
}
```

### CLI

```bash
node agents/recommender/cli.js --demo
node agents/recommender/cli.js path/to/input.json
echo '{ "customer": {...}, "invoice": {...}, "categorized": {...} }' | node agents/recommender/cli.js
```

### Eval

```bash
node agents/recommender/eval.js
node agents/recommender/eval.js --concurrency 4
node agents/recommender/eval.js --json   # for CI
```

10 fixture scenarios cover: clear switches, customer-already-cheap, license-pending categories (försäkring), marginal overpricing, premium-supplier-wrong-segment, redundant subscriptions.

---

## License-pending guard (defense in depth)

The system prompt instructs the model never to name a specific supplier for `forsakring-foretag` or `forsakring-ansvar`. **In addition**, `recommend.js` checks the category's `licensePending` flag at the code level after the model returns and *strips* `suggestedSupplier` if the model somehow ignored the prompt. A `console.warn` fires when this happens so we can log + retrain the prompt.

This belt-and-suspenders pattern is non-negotiable: under Försäkringsdistributionslagen (LFD 2018:1219), naming a specific alternative försäkring without FI-tillstånd is regulated activity. We don't want to be one bad model output away from a regulatory issue. The eval has explicit `noSupplierNamed: true` assertions on the försäkring fixtures.

---

## Branchindex

`branchindex.js` is the canonical source of "what does the average company in segment X pay for category Y". Today it's MOCK data — credible market estimates from public sources (Konsumentverket, Energimarknadsinspektionen, Svensk Försäkring, supplier list-prices), explicitly tagged as `SOURCE = 'mock'` so the Recommender's reasoning can't claim it's proprietary aggregated data we don't yet have.

**Replace once we have ≥100 customers**:
- Aggregate actual customer pricing per (category × industry × size)
- Compute median + p25 from real data
- Update the `matrix` literal — keep the SHAPE identical so `recommend.js` doesn't change
- This is the moment our /bias policy claim ("we have a real branchindex from real customers") becomes true

The `getBenchmark({ category, industry, employees })` function does the lookup. If a combination has no data (e.g., very large companies in a niche segment) it returns `null`, and the system prompt tells the model to fall back to `confidence: low, shouldSwitch: false`.

---

## How this composes with the Categorizer

```
Fortnox invoice → [CATEGORIZER (Haiku 4.5)] → categorized
                                                 ↓
                                  customer profile + branchindex
                                                 ↓
                                  [RECOMMENDER (Sonnet 4.6)] → recommendation
                                                 ↓
                       ┌─────────────────────────┴──────────────────┐
                       ↓                                            ↓
              shouldSwitch: true                            vipQueue: true
                       ↓                                            ↓
              [Switch Orchestrator]                         [VIP queue store]
              (next worker — pulls fullmakt              (waits for FI license)
               + Scrive BankID + supplier API)
```

Each worker is independently evaluable, independently versionable, and independently swappable when models improve.

---

## Failure modes & mitigations

| Failure | Likelihood | Mitigation |
|---|---|---|
| Model names a försäkringsleverantör despite the prompt | Low | Code-level strip in `recommend.js` + console.warn + eval assertion |
| Branchindex missing for unusual (industry × size) | Medium | `getBenchmark` returns null → prompt forces `confidence: low, shouldSwitch: false` |
| Benchmark mock is too generous → over-recommends switches | Medium (until real data) | Conservative confidence rules in prompt; eval scenarios cover under-median cases |
| Suggested supplier is in same family as current (e.g. Telia → Telia Carrier) | Low | Prompt rule: "If the customer's current supplier is among the alternatives, don't pick the same one" |
| Rate limit during batch | Medium | Default concurrency 3 (lower than Categorizer's 4 since each call is heavier) |
| Adaptive thinking burns too many tokens on simple cases | Low | `effort: 'medium'` — Sonnet 4.6 calibrates depth automatically |

---

## What's next

1. **Switch Orchestrator** (Layer 2 worker #3) — takes a `shouldSwitch: true` recommendation, generates fullmakt PDF, integrates with Scrive for BankID-signering, drives the state machine through `signed → terminated_old → applied_new → confirmed → live`.
2. **Real branchindex** — once 5–10 pilots have onboarded, replace the mock matrix with anonymized aggregations.
3. **Prompt iteration on real data** — when a customer manually overrides a recommendation, log it. Re-tune the system prompt + few-shot examples every quarter against accumulated overrides. Target: 90 % "no override" rate after 50 customers.
