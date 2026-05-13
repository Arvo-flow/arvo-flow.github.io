// agents/comm-drafter/templates.js
// Per-event base template hints. The LLM uses these as STARTING POINTS,
// not literal templates — it personalizes per customer + situation. Keeping
// the hints here means we can swap models without losing the brand voice.
//
// Each template defines: subjectHint, toneHint, mustInclude, ctaLabel.
// The drafter's prompt instructs the model to honor these.

export const EVENT_TYPES = Object.freeze({
  SWITCH_PROPOSED:        'switch_proposed',          // Show in /opportunity
  BANKID_SIGNED:          'bankid_signed',            // Confirm signature received
  TERMINATED_OLD:         'terminated_old',           // Termination sent
  APPLIED_NEW:            'applied_new',              // New supplier app submitted
  LIVE:                   'live',                     // Switch is active
  SUCCESS_FEE_DUE:        'success_fee_due',          // Invoicing the success fee
  COMPLETED:              'completed',                // Lifecycle complete
  CUSTOMER_CANCELLED:     'customer_cancelled',       // We confirm the cancellation
  SIGNING_EXPIRED:        'signing_expired',          // Re-prompt customer
  SUPPLIER_REJECTED:      'supplier_rejected',        // Explain + offer retry
  SCHEDULED_FUTURE:       'scheduled_future',         // Bindningstid kvar — we'll come back
  GUARDIAN_ALERT:         'guardian_alert',           // Invoice Guardian flagged a smyghöjning
});

export const TEMPLATES = {
  [EVENT_TYPES.SWITCH_PROPOSED]: {
    subjectHint: 'Vi hittade en besparing åt dig — {savingPerYear} kr/år',
    toneHint: 'enthusiastic-but-grounded',
    mustInclude: ['savingPerYear', 'currentSupplier', 'newSupplier', 'next-step is BankID-signing in our app'],
    ctaLabel: 'Granska bytet',
    ctaPath: '/opportunity/{switchId}',
  },
  [EVENT_TYPES.BANKID_SIGNED]: {
    subjectHint: 'Vi har tagit emot din signatur — bytet är igång',
    toneHint: 'warm-confirming',
    mustInclude: ['signing confirmed', 'next step (we handle termination + new application)', 'no action needed from customer'],
    ctaLabel: null,
    ctaPath: null,
  },
  [EVENT_TYPES.TERMINATED_OLD]: {
    subjectHint: 'Uppsägning skickad till {currentSupplier}',
    toneHint: 'neutral-informative',
    mustInclude: ['termination sent', 'effective date', 'no action needed'],
    ctaLabel: 'Se status',
    ctaPath: '/insights',
  },
  [EVENT_TYPES.APPLIED_NEW]: {
    subjectHint: 'Ansökan inskickad hos {newSupplier}',
    toneHint: 'neutral-informative',
    mustInclude: ['application submitted', 'expected activation date', 'no action needed'],
    ctaLabel: 'Se status',
    ctaPath: '/insights',
  },
  [EVENT_TYPES.LIVE]: {
    subjectHint: 'Bytet är aktiverat — du sparar {savingPerYear} kr/år',
    toneHint: 'celebratory-restrained',
    mustInclude: ['switch is live', 'first invoice from new supplier received', 'savings confirmed'],
    ctaLabel: 'Se besparing',
    ctaPath: '/insights',
  },
  [EVENT_TYPES.SUCCESS_FEE_DUE]: {
    subjectHint: 'Din faktura från Arvo Flow — {successFeeAmount} kr',
    toneHint: 'professional-transparent',
    mustInclude: ['success fee amount', 'how it was calculated (20% of year-1 saving)', 'payment terms'],
    ctaLabel: 'Visa faktura',
    ctaPath: '/insights',
  },
  [EVENT_TYPES.COMPLETED]: {
    subjectHint: 'Cykeln klar — Arvo fortsätter bevaka',
    toneHint: 'reassuring',
    mustInclude: ['cycle complete', 'we keep monitoring leverantörsavtal', 'next quarterly scan'],
    ctaLabel: null,
    ctaPath: null,
  },
  [EVENT_TYPES.CUSTOMER_CANCELLED]: {
    subjectHint: 'Vi har avbrutit bytet enligt din önskan',
    toneHint: 'respectful-no-pressure',
    mustInclude: ['cancellation confirmed', 'no charge', 'door stays open'],
    ctaLabel: null,
    ctaPath: null,
  },
  [EVENT_TYPES.SIGNING_EXPIRED]: {
    subjectHint: 'Signeringsfönstret gick ut — vill du försöka igen?',
    toneHint: 'gentle-no-pressure',
    mustInclude: ['expired', 'recommendation still valid', 'easy retry'],
    ctaLabel: 'Starta om bytet',
    ctaPath: '/opportunity/{switchId}',
  },
  [EVENT_TYPES.SUPPLIER_REJECTED]: {
    subjectHint: 'Bytet kunde inte genomföras — vi tittar på alternativ',
    toneHint: 'apologetic-actionable',
    mustInclude: ['supplier rejected', 'reason if known', 'we will propose alternative'],
    ctaLabel: null,
    ctaPath: null,
  },
  [EVENT_TYPES.SCHEDULED_FUTURE]: {
    subjectHint: 'Vi parkerar bytet — bindningstid kvar till {originalContractEnd}',
    toneHint: 'reassuring-active',
    mustInclude: ['why parked (bindningstid)', 'when we will come back (reactivateAt)', 'we handle the timing'],
    ctaLabel: null,
    ctaPath: null,
  },
  [EVENT_TYPES.GUARDIAN_ALERT]: {
    subjectHint: 'Vi upptäckte en avvikelse — {supplierName}',
    toneHint: 'urgent-actionable',
    mustInclude: ['what changed (current vs agreed)', 'amount of overcharge', 'one-click dispute draft'],
    ctaLabel: 'Granska avvikelsen',
    ctaPath: '/insights/alert/{alertId}',
  },
};
