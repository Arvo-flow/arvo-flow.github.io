# Legal Gates — must ship before /villkor goes public

The Terms of Service v1.2 (published at `/villkor`) makes three concrete promises
that require actual infrastructure. **Do not link `/villkor` from production
marketing until all three are implemented**, or the ToS becomes misleading.

---

## Gate 1 — 24h data deletion (DPA § 6, Integritetspolicy § 4)

**Claim in ToS:** "Vid uppsägning eller 'disconnect' ska Biträdet radera eller
anonymisera all transaktionsdata inom 24 timmar."

**Required:**
- Cron job that runs every hour, scans for customers in state `TERMINATED`
  where `terminatedAt > NOW() - 24h`, and deletes/anonymises:
  - All Fortnox/Visma fakturarader
  - All `Switch` records (state-machine append log)
  - All categorizer/recommender outputs
  - Keep: invoice records for our success-fee (bokföringslagen, 7 år)
- Audit log entry per deletion: `{customer_id, timestamp, rows_deleted, retained_count}`
- Test that disconnect → 24h → data gone

**Suggested location:** `agents/orchestrator/cron.js` already has a runCron
scaffold. Add `runDeletionSweep({ store, audit })`.

---

## Gate 2 — Bolagsverket firmateckningsverifiering (ToS § 4.1)

**Claim in ToS:** "Arvo Flow verifierar via BankID-signaturens personnummer mot
Bolagsverkets aktuella firmatecknarregister. Avtal ingås endast om verifieringen
godkänns."

**Required:**
- Bolagsverket API key (kostar ~5 kr/uppslag, paketpris finns)
- After BankID signing returns SSN, call Bolagsverket näringslivsregistret
  with `{orgnr, ssn}` and require `firmateckning: true` before transitioning
  the switch out of `AWAITING_APPROVAL`.
- If verification fails: refund Stripe (if any), email customer, log incident.
- Cache successful verifications per (orgnr, ssn) for 30 days — registret
  uppdateras inte oftare än så.

**Suggested location:** `agents/orchestrator/clients/bolagsverket.js` (new file).
Called from `handleSigned()` in `orchestrator.js`.

**Fallback if not built:** Rewrite clause 4.1 to "manuell kontroll efter
signering inom 24 timmar" — but that creates an operational debt instead.

---

## Gate 3 — Proportional kreditering vid förtida avslut (ToS § 3.3)

**Claim in ToS:** "...debiteras Besparingsavgiften proportionellt för
resterande del av 12-månadersperioden enligt ordinarie kvartalsrutin."

**Required:**
- Stripe credit-note workflow: when a customer cancels a switched supplier
  contract early, calculate `proportional_fee = (months_remaining / 12) * annual_fee`
  and either:
  - Reduce the next quarterly invoice by the unbilled remainder, OR
  - Issue a credit note for what has been over-billed.
- New `Switch` state: `SUPPLIER_CANCELLED_EARLY` with `cancelled_at` timestamp.
- Test cases: cancellation at month 0, 3, 6, 11.

**Suggested location:** `agents/orchestrator/state-machine.js` add the new
state. `agents/orchestrator/clients/stripe.js` add `issueCreditNote()` and
`updateInvoiceProportional()`.

---

## Ownership

These are not optional polish — they are contractual obligations the moment
`/villkor` v1.2 is published and the `/connect` checkbox is checked by a customer.

Author: see CONTRIBUTORS · Created: 2026-05-13 with ToS v1.2 publish prep.
