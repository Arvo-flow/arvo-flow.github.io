// agents/orchestrator/state-machine.js
// The lifecycle of a supplier switch.
//
// States are the source of truth — transitions are explicit and validated.
// Every transition produces an immutable HistoryEvent that's appended to the
// switch's history log. That log is your audit trail for compliance.

export const STATES = Object.freeze({
  PROPOSED:           'proposed',           // Recommender produced a recommendation, customer hasn't seen it
  AWAITING_APPROVAL:  'awaiting_approval',  // Shown to customer in /opportunity, waiting for click
  FULLMAKT_PREPARED:  'fullmakt_prepared',  // PDF generated, ready to send to Scrive
  BANKID_PENDING:     'bankid_pending',     // Sent to Scrive, customer is signing
  BANKID_SIGNED:      'bankid_signed',      // Customer signed, fullmakt is legally valid
  TERMINATED_OLD:     'terminated_old',     // Old supplier received our termination
  SCHEDULED_FUTURE:   'scheduled_future',   // Parked: bindningstid kvar (reactive) OR proactive future-cancel (idé #3)
  APPLIED_NEW:        'applied_new',        // New supplier received our application
  LIVE:               'live',               // First invoice from new supplier seen in Fortnox
  SUCCESS_FEE_DUE:    'success_fee_due',    // Paid invoice from new supplier triggers our fee
  COMPLETED:          'completed',          // Success fee invoiced + paid, lifecycle done

  // Terminal failure states
  CUSTOMER_CANCELLED: 'customer_cancelled', // Customer rejected or cancelled
  SIGNING_EXPIRED:    'signing_expired',    // Scrive signing timed out (default 14 days)
  SUPPLIER_REJECTED:  'supplier_rejected',  // New supplier rejected the application (truly impossible to switch)
  FAILED:             'failed',             // Catch-all for unexpected errors
});

export const TERMINAL_STATES = new Set([
  STATES.COMPLETED,
  STATES.CUSTOMER_CANCELLED,
  STATES.SIGNING_EXPIRED,
  STATES.SUPPLIER_REJECTED,
  STATES.FAILED,
]);

// Valid forward transitions. If a transition isn't here, it's invalid.
// Backward transitions are NOT allowed — this is an append-only state machine.
//
// NOTE: re-entering the same state (idempotency) is NOT a valid transition
// and is handled at the orchestrator level, not here. The state machine
// stays strict; the orchestrator's webhook-driven methods check current
// state first and return a no-op if already at the target.
export const TRANSITIONS = Object.freeze({
  [STATES.PROPOSED]: [
    STATES.AWAITING_APPROVAL,
    STATES.SCHEDULED_FUTURE,    // proactive: idé #3 — schedule a future cancellation upfront
    STATES.CUSTOMER_CANCELLED,
    STATES.FAILED,
  ],
  [STATES.AWAITING_APPROVAL]: [STATES.FULLMAKT_PREPARED, STATES.CUSTOMER_CANCELLED, STATES.FAILED],
  [STATES.FULLMAKT_PREPARED]: [STATES.BANKID_PENDING, STATES.CUSTOMER_CANCELLED, STATES.FAILED],
  [STATES.BANKID_PENDING]: [STATES.BANKID_SIGNED, STATES.SIGNING_EXPIRED, STATES.CUSTOMER_CANCELLED, STATES.FAILED],
  [STATES.BANKID_SIGNED]: [STATES.TERMINATED_OLD, STATES.SUPPLIER_REJECTED, STATES.FAILED],
  [STATES.TERMINATED_OLD]: [
    STATES.APPLIED_NEW,
    STATES.SCHEDULED_FUTURE,    // reactive: old supplier acknowledges termination but bindningstid kvar
    STATES.SUPPLIER_REJECTED,
    STATES.FAILED,
  ],
  [STATES.SCHEDULED_FUTURE]: [
    STATES.AWAITING_APPROVAL,   // reactivate when reactivateAt date arrives — fresh BankID required
    STATES.CUSTOMER_CANCELLED,
    STATES.FAILED,
  ],
  [STATES.APPLIED_NEW]: [STATES.LIVE, STATES.SUPPLIER_REJECTED, STATES.FAILED],
  [STATES.LIVE]: [STATES.SUCCESS_FEE_DUE, STATES.FAILED],
  [STATES.SUCCESS_FEE_DUE]: [STATES.COMPLETED, STATES.FAILED],

  // Terminal — no outgoing transitions
  [STATES.COMPLETED]: [],
  [STATES.CUSTOMER_CANCELLED]: [],
  [STATES.SIGNING_EXPIRED]: [],
  [STATES.SUPPLIER_REJECTED]: [],
  [STATES.FAILED]: [],
});

export class TransitionError extends Error {
  constructor(message, { from, to } = {}) {
    super(message);
    this.name = 'TransitionError';
    this.from = from;
    this.to = to;
  }
}

export function isValidTransition(from, to) {
  const allowed = TRANSITIONS[from];
  if (!allowed) return false;
  return allowed.includes(to);
}

export function assertTransition(from, to) {
  if (!isValidTransition(from, to)) {
    throw new TransitionError(
      `Invalid transition: ${from} → ${to}. Allowed from "${from}": [${TRANSITIONS[from]?.join(', ') ?? '(unknown state)'}]`,
      { from, to }
    );
  }
}

export function isTerminal(state) {
  return TERMINAL_STATES.has(state);
}

/**
 * Build a history event. Pure function — caller persists.
 *
 * @param {object} params
 * @param {string} params.from        - previous state (or null for initial)
 * @param {string} params.to          - new state
 * @param {string} [params.actor]     - "system" | "customer" | "scrive" | "fortnox" | "supplier" | "operator"
 * @param {object} [params.payload]   - state-specific data (signedPdfId, terminationConfirmation, etc.)
 * @param {string} [params.note]      - human-readable note for audit log
 */
export function buildEvent({ from, to, actor = 'system', payload = {}, note }) {
  return {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    from: from ?? null,
    to,
    actor,
    payload,
    note: note ?? null,
  };
}

/**
 * Pretty label for UI / CLI display. Exported separately so we don't ship
 * Swedish text into machine-readable state values.
 */
export const STATE_LABELS = Object.freeze({
  [STATES.PROPOSED]:           'Förslag genererat',
  [STATES.AWAITING_APPROVAL]:  'Väntar på godkännande',
  [STATES.FULLMAKT_PREPARED]:  'Fullmakt förberedd',
  [STATES.BANKID_PENDING]:     'BankID-signering pågår',
  [STATES.BANKID_SIGNED]:      'Fullmakt signerad',
  [STATES.TERMINATED_OLD]:     'Uppsägning skickad',
  [STATES.SCHEDULED_FUTURE]:   'Schemalagt för framtiden',
  [STATES.APPLIED_NEW]:        'Ny ansökan skickad',
  [STATES.LIVE]:               'Bytet är aktiverat',
  [STATES.SUCCESS_FEE_DUE]:    'Success-fee redo att fakturera',
  [STATES.COMPLETED]:          'Klart',
  [STATES.CUSTOMER_CANCELLED]: 'Kund avbröt',
  [STATES.SIGNING_EXPIRED]:    'Signering utgick',
  [STATES.SUPPLIER_REJECTED]:  'Leverantör avvisade',
  [STATES.FAILED]:             'Misslyckades',
});

/**
 * Find SCHEDULED_FUTURE switches whose `reactivateAt` is in the past.
 * Pure function — caller persists any state transitions it triggers.
 *
 * Used by the cron loop:
 *
 *   const all = await orch.list();           // returns lightweight status records
 *   const due = findDueSwitches(all, new Date());
 *   for (const r of due) await orch.reactivateScheduled(r.id);
 *
 * @param {Array<{state: string, scheduling?: {reactivateAt?: string}}>} records
 * @param {Date} [asOfDate=new Date()]
 * @returns {Array} subset of records that are due
 */
export function findDueSwitches(records, asOfDate = new Date()) {
  if (!Array.isArray(records)) return [];
  const cutoff = asOfDate.getTime();
  return records.filter((r) => {
    if (!r || r.state !== STATES.SCHEDULED_FUTURE) return false;
    const at = r.scheduling?.reactivateAt ?? r.context?.scheduling?.reactivateAt;
    if (!at) return false;
    const ts = Date.parse(at);
    if (Number.isNaN(ts)) return false;
    return ts <= cutoff;
  });
}
