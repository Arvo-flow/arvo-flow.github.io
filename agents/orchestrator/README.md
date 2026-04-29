# Switch Orchestrator

Layer 2 worker #3 for Arvo Flow. Drives a supplier switch through its full lifecycle: from "customer clicked Godkänn" → fullmakt PDF generated → BankID-signed via Scrive → old supplier terminated → new supplier applied → first invoice detected in Fortnox → success-fee invoiced.

Where the Categorizer answered *"what is this?"* and the Recommender answered *"what should we do?"*, the Orchestrator answers *"how do we actually make it happen?"*.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           ORCHESTRATOR API                                   │
│  createSwitch → markAwaitingApproval → prepareFullmakt → initiateSigning →   │
│  handleSigned → executeTermination → executeNewApplication → markLive →      │
│  markSuccessFeeDue → markCompleted                                           │
└──────────┬───────────────────────────────────────────────────────────────────┘
           │
           ├──────► State Machine (state-machine.js)  — append-only, validated transitions
           ├──────► Persistence (store.js)            — JSON files today, swap to DB later
           │
           ├──────► Fullmakt PDF Generator            — pdf-lib (or markdown fallback)
           │       (fullmakt/generate.js + template.js)
           │
           ├──────► Scrive Client (clients/scrive.js)         ← BankID signing (STUBBED)
           ├──────► Supplier Client (clients/supplier.js)     ← termination + new application (STUBBED)
           └──────► Fortnox Watchdog (clients/fortnox-watch.js) ← go-live + success-fee detection (STUBBED)

  Webhooks (webhooks/scrive.js)  ← incoming Scrive signed-events with HMAC verification
```

**Three real things, three stubs.** The state machine, persistence, and fullmakt PDF generation are production-grade. The three clients (Scrive, supplier APIs, Fortnox) are stubs with the *exact* method signatures their real counterparts will have — swap is a single-file change.

---

## Setup

### Minimal demo (no extra installs)

The demo CLI runs end-to-end without `npm install` because pdf-lib is an *optional* dependency. Without it, fullmakter render as Markdown text files instead of PDF.

```bash
node agents/orchestrator/cli.js demo
```

You'll see each state transition print, and a final summary showing the success fee + path to the generated fullmakt.

### Real PDF output

```bash
cd agents/orchestrator
npm install
cd ../..
node agents/orchestrator/cli.js demo
```

### Run the full eval suite

```bash
node agents/orchestrator/eval.js          # human-readable report
node agents/orchestrator/eval.js --json   # machine-readable for CI
```

---

## State Machine

The lifecycle is **append-only** — backward transitions are not allowed. You can audit every switch by reading its `history[]` array.

```
                        proposed
                            │
                            ▼
                  awaiting_approval
                            │
                            ▼
                  fullmakt_prepared
                            │
                            ▼
                   bankid_pending
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  bankid_signed     signing_expired     customer_cancelled (terminal)
        │                                       (terminal)
        ▼
  terminated_old ───┐
        │           │
        ▼           ▼
   applied_new   supplier_rejected (terminal)
        │
        ▼
       live
        │
        ▼
  success_fee_due
        │
        ▼
    completed (terminal)
```

`failed` is reachable from any non-terminal state for unexpected runtime errors.

---

## Public API

```js
import { Orchestrator } from './agents/orchestrator/index.js';

const orch = new Orchestrator({
  // Defaults to FileStore + stubbed clients. Override per-instance for prod.
  // store: new FileStore({ dataDir: '/var/lib/arvo' }),
  // scrive: new ScriveClient({ mode: 'live', apiKey: process.env.SCRIVE_API_KEY }),
  // supplier: new SupplierClient({ mode: 'live', adapters: ... }),
  // fortnox: new FortnoxWatchdog({ mode: 'live', fetchInvoices: ... }),
});

// 1. Customer is in /opportunity, clicks "Godkänn byte"
const sw = await orch.createSwitch({ customer, recommendation, invoice });

// 2. Generate fullmakt PDF + send to Scrive
await orch.markAwaitingApproval(sw.id);
await orch.prepareFullmakt(sw.id);
await orch.initiateSigning(sw.id);

// 3. Scrive webhook fires when customer signs (or call handleSigned manually after polling)
await orch.handleSigned(sw.id, { signedPdfBytes, scriveDocId, signedSsn, signedAt });

// 4. Drive the supplier-side
await orch.executeTermination(sw.id);
await orch.executeNewApplication(sw.id);

// 5. Fortnox watchdog detects go-live → success fee
const matched = await fortnox.pollForNewSupplierInvoice({ switchRecord: await orch.getRecord(sw.id) });
if (matched) await orch.markLive(sw.id, { firstInvoice: matched });

const paid = await fortnox.checkInvoicePaid({ customerId, invoiceId: matched.id });
if (paid.paid) await orch.markSuccessFeeDue(sw.id, { paidInvoice: matched });

// 6. Stripe invoice created and paid → close the loop
await orch.markCompleted(sw.id, { stripeInvoiceId: 'in_xyz' });
```

**Failure paths** are first-class:

```js
await orch.handleCancelled(sw.id, { reason: 'customer changed mind' });
await orch.handleSigningExpired(sw.id, { scriveDocId });
await orch.handleSupplierRejection(sw.id, { reason: 'invalid org number', supplierName });
await orch.handleFailure(sw.id, { reason: 'API timeout', error });
```

---

## License-pending guard

`createSwitch` **refuses** to start a lifecycle for `forsakring-foretag` or `forsakring-ansvar` (license-pending categories). It throws `OrchestratorError` if you try.

This is intentional: bytena för försäkring kräver försäkringsförmedlartillstånd från Finansinspektionen, vilket vi inte har än. För dessa kategorier ska kunden hamna i VIP-kön (frontend `/insights`-modulen), inte i den här pipelinen.

The eval has a fixture (`o-004`) that explicitly verifies createSwitch throws on license-pending categories.

---

## Stubbed integrations — exactly what's stubbed

### `clients/scrive.js`

| Method | Stub behavior | Live swap |
|---|---|---|
| `createDocument({ pdfBytes, signers, title })` | Returns `{ documentId, signingUrl, expiresAt }` with stub IDs | POST /api/v2/documents/new with multipart PDF + signatories |
| `pollDocumentStatus(docId)` | Returns `pending` for first N polls (default 2), then `signed` | GET /api/v2/documents/{id} until status=signed/rejected |
| `downloadSignedPdf(docId)` | Returns placeholder bytes | GET /api/v2/documents/{id}/files/main |
| `cancelDocument(docId)` | Marks stub `cancelled` | DELETE /api/v2/documents/{id} |

Real Scrive API: https://scrive.com/api · pricing: ~5 kr per signing on standard tier.

### `clients/supplier.js`

| Method | Stub behavior | Live swap |
|---|---|---|
| `sendTermination({...})` | Returns success after no delay | Per-supplier adapter (Tibber API, Tele2 partner portal, etc.) |
| `submitNewApplication({...})` | Returns generated `accountNumber` + 14-day expectedActivation | Per-supplier adapter |
| `getApplicationStatus(id)` | Returns the stub status | Per-supplier adapter |

Real integrations land *one supplier at a time* as we sign affiliate agreements. The stub matches what they all conceptually do, so the orchestrator never changes.

### `clients/fortnox-watch.js`

| Method | Stub behavior | Live swap |
|---|---|---|
| `pollForNewSupplierInvoice(...)` | Reads from `__seedInvoice` test data | GET /3/invoices?fromdate=X via Fortnox API + the matching heuristic |
| `checkInvoicePaid(...)` | Reads stub `paidAt` | GET /3/invoices/{id} via Fortnox API |

The matching heuristic is the real thing — fuzzy supplier name + date window + amount sanity check. That logic stays exactly as-is when you swap in real Fortnox.

### `webhooks/scrive.js`

The signature verification (HMAC-SHA256, timing-safe compare) is real. The handler shape is real. What's stubbed is the wiring into your Express app — `buildScriveWebhookHandler({ orchestrator, scrive })` returns a handler ready to mount, the README shows you how.

---

## What's NOT yet stubbed (do these next)

1. **Stripe invoicing for the success fee** — when state hits `success_fee_due`, you need to programmatically create a Stripe invoice for the customer and mark `markCompleted` when paid. Stripe's `invoices.create` + `invoice.payment_succeeded` webhook does this in ~30 lines.
2. **Cron / queue runner** that periodically calls `fortnox.pollForNewSupplierInvoice` for active switches in TERMINATED_OLD or APPLIED_NEW state. Inngest, Temporal, or a vanilla Node setInterval all work.
3. **Customer-facing notifications** at each transition (mail/SMS/in-app). This is the next Layer 2 worker — the **Comm Drafter** — which would use Haiku 4.5 to write the per-event mail in the customer's language.

---

## Failure modes & mitigations

| Failure | Likelihood | Mitigation |
|---|---|---|
| Webhook signature missing/invalid | Medium | `verifyScriveSignature` rejects with 401; Scrive will retry per its retry policy |
| Scrive document expires (default 14 days) | Medium | `handleSigningExpired` transitions to terminal state; customer can re-initiate manually |
| Supplier rejects new application | Low-Medium | `handleSupplierRejection` is terminal; Comm Drafter sends customer mail explaining and offering retry with corrected info |
| Fortnox watchdog matches wrong invoice | Low | Fuzzy match requires name match + 60-day window; false positives are visible in audit log and easy to revert |
| Customer disconnects Fortnox before go-live | Low | All state up to LIVE is preserved; can re-attach Fortnox to resume detection. After SUCCESS_FEE_DUE: locked in |
| State file corruption | Very low | Atomic writes (temp + rename); audit log is human-readable JSON |
| Rate limit on Scrive/supplier APIs | Medium (production) | All clients should add retry-with-backoff; tracked separately from state machine to avoid spurious transitions |

---

## What this enables next

1. **Real BankID-flöde i sajten:** When the Opportunity page's "Godkänn med BankID" button calls a backend endpoint, that endpoint calls `orch.prepareFullmakt → initiateSigning`, returns the Scrive `signingUrl`, frontend redirects user to it. Demo today: ~2 hours' work.
2. **Real Stripe invoicing:** `markSuccessFeeDue → markCompleted` already passes through `successFee.amount` — wire to `stripe.invoices.create` and Stripe webhooks.
3. **Comm Drafter (next worker):** subscribe to state transitions; for each transition emit a customer-facing mail/SMS draft via Haiku 4.5 using the same pattern as Categorizer. ~3 hours' work.

Once those three are wired, you have a full end-to-end production system that can actually take a customer from "klick Godkänn" → "fullmakt signerad → leverantör uppsagd → ny tecknad → besparing aktiverad → success-fee fakturerad". Without faking anything.
