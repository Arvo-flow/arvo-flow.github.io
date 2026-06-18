// tests/saas-substitution.mjs — Dropbox/Box-korselden. Molnlagring i USD → arkitektonisk substitutionsinsikt,
// ALDRIG en påhittad SEK-besparing (Zero Trust: vi FX-konverterar aldrig). Låser att copyn inte antar att
// kunden har M365 utan bevis (Motståndsplikten) och att inga kron-/USD-siffror läcker till kund.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { detectStorageSubstitution } from '../lib/saas-substitution.js';
import { recommend } from '../agents/recommender/recommend.js';

const line = (description, amount = null) => ({ type: 'recurring_subscription', description, amount });

describe('saas-substitution · detektor', () => {
  test('Dropbox känns igen → insikt utan att anta M365 ("har ni redan M365")', () => {
    const s = detectStorageSubstitution([line('Dropbox Standard 5 användare', 750)], 'Dropbox');
    assert.equal(s.vendor, 'Dropbox');
    assert.equal(s.m365Present, false);
    assert.match(s.substitution, /Business Basic och uppåt/);
    assert.match(s.substitution, /Har ni redan M365/);
    assert.match(s.usdPain, /amerikanska dollar/);
  });
  test('med bevis (m365Present) skärps copyn till "ert Microsoft 365-paket"', () => {
    const s = detectStorageSubstitution([line('Dropbox Advanced', 1200)], 'Dropbox', true);
    assert.equal(s.m365Present, true);
    assert.match(s.substitution, /ert Microsoft 365-paket/);
  });
  test('icke-lagrings-SaaS → null', () => {
    assert.equal(detectStorageSubstitution([line('Microsoft 365 Business Standard')], 'Microsoft'), null);
  });
});

describe('saas-substitution · recommend() (ingen FX-besparing, ingen siffra mot kund)', () => {
  const dropboxInvoice = (desc, amount) => ({
    customer:    { industry: 'byraer', employees: 8 },
    categorized: { category: 'saas-productivity', subType: 'lagring', normalizedSupplier: 'Dropbox', confidence: 0.95 },
    invoice:     { annualCost: amount * 12, billingPeriod: 'monthly', lineItems: [line(desc, amount)] },
  });

  test('Dropbox-faktura → substitutionsinsikt, talfri besparing', async () => {
    const r = await recommend(dropboxInvoice('Dropbox Standard (5 användare)', 750));
    assert.equal(r.requiresQuote, true);
    assert.equal(r.recommendationType, 'requires_quote');
    assert.equal(r.revisionGate, 'audited');
    assert.ok(r.storageSubstitution, 'storageSubstitution ska finnas');
    assert.equal(r.storageSubstitution.vendor, 'Dropbox');
    // Ingen påhittad besparing, ingen FX-siffra.
    assert.equal(r.suggestedAnnualCost, null);
    assert.equal(r.grossSaving, null);
    assert.equal(r.netSaving, null);
    assert.equal(r.savingPerYear, null);
    assert.equal(r.benchmark, null);
    // Copyn slår på USD-smärtan + M365-substitutionen, utan kron-/USD-belopp.
    assert.match(r.reasoning, /amerikanska dollar/);
    assert.match(r.reasoning, /OneDrive \+ SharePoint/);
    assert.ok(!/\d[\d\s.,]*\s*(?:kr|US\$|\$|SEK)/i.test(r.reasoning), 'ingen kron-/USD-siffra i copyn');
  });
});
