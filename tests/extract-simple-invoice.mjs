// tests/extract-simple-invoice.mjs — låser att ENKLA, glasklara abonnemangsfakturor får en dom,
// inte fastnar i granskningskön. Två deterministiska skärpningar (Tele2 Bredband-läxan):
//   1. recurring_subscription utan period/datum → antaget månadsvis (markerat), i stället för 'unknown'→kö.
//   2. Ring 1 erkänner svenska moms-mönstret (rader exkl moms, total inkl moms) i stället för att
//      flagga momsen som en saknad rad.
// Spärrarna bevaras: genuint periodlösa engångsfakturor + verkligt saknade rader → fortfarande kö.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { aggregateLineItems, routeExtraction } from '../agents/test-invoice/extract.js';

const rec = (description, amount) => ({ description, amount, quantity: 1, unitPrice: amount, type: 'recurring_subscription' });

// Tele2 Bredband AB — Bredband Pro 1000/1000 + SLA + Fast IP, ingen period angiven, total exkl moms.
const teleRaw = () => ({
  supplier: 'Tele2 Bredband AB', date: '2026-05-14', description: 'Företagsbredband',
  billingPeriod: 'unknown', billing_period_start: null, billing_period_end: null,
  invoiceTotal: 1949, confidenceScore: 0.9,
  lineItems: [rec('Bredband Pro 1000/1000 (Öppen Fiber)', 1299), rec('SLA Premium 24/7', 500), rec('Fast IP', 150)],
});

describe('Enkel faktura · periodlös abonnemangsfaktura → antaget månadsvis (ej kö)', () => {
  test('aggregateLineItems: unknown + recurring + inga datum → monthly, markerat antaget', () => {
    const r = aggregateLineItems(teleRaw());
    assert.equal(r.billingPeriod, 'monthly');
    assert.equal(r.billingPeriodAssumed, true);
    assert.equal(r.billingPeriodSource, 'rule:recurring-default');
    assert.equal(r.recurringAmount, 1949);
    assert.equal(r.annualCost, 23388);          // 1949 × 12
  });

  test('routeExtraction: den härledda fakturan → auto (inte review_queue)', () => {
    const r = aggregateLineItems(teleRaw());
    assert.equal(routeExtraction(r).route, 'auto');
  });
});

describe('Enkel faktura · Ring 1 erkänner moms-mönstret (rader exkl, total inkl)', () => {
  const base = () => ({
    outOfScope: false, supplier: 'Tele2 Bredband AB', billingPeriod: 'monthly',
    confidenceScore: 0.9, annualCost: 23388,
    lineItems: [rec('Bredband Pro', 1299), rec('SLA Premium', 500), rec('Fast IP', 150)],
  });

  test('total INKL 25 % moms (2 436,25) mot rader exkl (1 949) → auto, momsen flaggas ej', () => {
    assert.equal(routeExtraction({ ...base(), invoiceTotal: 2436.25 }).route, 'auto');
  });

  test('total = rader exkl moms (1 949) → auto', () => {
    assert.equal(routeExtraction({ ...base(), invoiceTotal: 1949 }).route, 'auto');
  });

  test('GENUINT saknad rad (glapp ≠ moms) → fortfarande review_queue', () => {
    const r = routeExtraction({ ...base(), invoiceTotal: 5000, lineItems: [rec('Bredband Pro', 1000)] });
    assert.equal(r.route, 'review_queue');
    assert.match(r.reason, /Ring1/);
  });
});

describe('Spärren bevaras · genuint periodlös icke-abonnemang → fortfarande kö', () => {
  test('endast engångsrad, ingen period → unknown kvarstår → review_queue', () => {
    const r = aggregateLineItems({
      supplier: 'X AB', billingPeriod: 'unknown', billing_period_start: null, billing_period_end: null,
      invoiceTotal: 5000, confidenceScore: 0.9,
      lineItems: [{ description: 'Installationsavgift', amount: 5000, quantity: 1, unitPrice: 5000, type: 'one_time_fee' }],
    });
    assert.equal(r.billingPeriod, 'unknown');
    assert.equal(r.billingPeriodAssumed, false);
    assert.equal(routeExtraction(r).route, 'review_queue');
  });
});
