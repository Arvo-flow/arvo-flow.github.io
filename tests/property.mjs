#!/usr/bin/env node
// tests/property.mjs
// Property-based tests med invarianter för computeInvoiceMetrics + computeSecondarySaving.
// Kör: node tests/property.mjs
// Kräver Node 22+. Inga externa dependencies.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';

const ITERATIONS = 5000;
const CATEGORIES = ['mobil', 'bredband', 'el', 'saas-productivity', 'skrivarleasing'];
const TYPES = ['recurring_subscription', 'variable_usage', 'one_time_fee', 'hardware'];
const ADDON_TYPES = [undefined, 'pbx', 'voip', 'static_ip', 'firewall', 'sla'];
const SPEED_DESCS = [
  '100 Mbit/s fiber',
  '250/250 Mbit/s',
  '500 Mbit bredband',
  '1 Gbit fiber',
  'bredbandsabonnemang',
  'mobilabonnemang',
  'SIM-kort',
];
const INDUSTRIES = ['ehandel', 'tillverkning', 'it-tech', 'bygg', 'hotell', 'konsult', 'transport', 'vard', 'ovrigt'];
const VALID_SPEED_TIERS = [100, 250, 500, 1000];

// ── Random helpers ────────────────────────────────────────────────────────────

function rnd(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount() {
  // 0–5000 kr/månad per rad
  return Math.round(Math.random() * 5000 * 100) / 100;
}

function randomLineItem(overrides = {}) {
  return {
    description: pick(SPEED_DESCS),
    type:        pick(TYPES),
    amount:      randomAmount(),
    is_addon:    Math.random() < 0.2,
    addon_type:  Math.random() < 0.3 ? pick(ADDON_TYPES) : undefined,
    ...overrides,
  };
}

function randomRecurringItem(overrides = {}) {
  return randomLineItem({ type: 'recurring_subscription', ...overrides });
}

function randomLineItems(n) {
  return Array.from({ length: n }, () => randomLineItem());
}

function randomRecurringItems(n) {
  return Array.from({ length: n }, () => randomRecurringItem());
}

function randomCategory() {
  return pick(CATEGORIES);
}

function randomIndustry() {
  return pick(INDUSTRIES);
}

function randomEmployees() {
  return rnd(1, 249);
}

// ── Invariant 1 ───────────────────────────────────────────────────────────────
// mobileAddonMonthly är alltid > 0 eller null (aldrig === 0)
describe('Invariant 1: mobileAddonMonthly är > 0 eller null', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const category = randomCategory();
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, category, mixed);
      assert.ok(
        m.mobileAddonMonthly === null || m.mobileAddonMonthly > 0,
        `mobileAddonMonthly must be null or >0, got ${m.mobileAddonMonthly}`,
      );
    }
  });
});

// ── Invariant 2 ───────────────────────────────────────────────────────────────
// broadbandAddonMonthly är alltid > 0 eller null (aldrig === 0)
describe('Invariant 2: broadbandAddonMonthly är > 0 eller null', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const category = randomCategory();
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, category, mixed);
      assert.ok(
        m.broadbandAddonMonthly === null || m.broadbandAddonMonthly > 0,
        `broadbandAddonMonthly must be null or >0, got ${m.broadbandAddonMonthly}`,
      );
    }
  });
});

// ── Invariant 3 ───────────────────────────────────────────────────────────────
// Om potentialMixedCategories=false → alla komponent-fält är null
describe('Invariant 3: mixed=false → component fields är null', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const category = randomCategory();
      const m        = computeInvoiceMetrics(items, category, false);
      assert.strictEqual(m.primaryComponentMonthly,    null,
        `primaryComponentMonthly must be null when mixed=false`);
      assert.strictEqual(m.secondaryComponentMonthly,  null,
        `secondaryComponentMonthly must be null when mixed=false`);
      assert.strictEqual(m.secondaryConnectionSpeedMbit, null,
        `secondaryConnectionSpeedMbit must be null when mixed=false`);
      assert.strictEqual(m.secondarySeatCount,          null,
        `secondarySeatCount must be null when mixed=false`);
    }
  });
});

// ── Invariant 4 ───────────────────────────────────────────────────────────────
// secondarySeatCount är alltid null när category !== 'bredband'
describe('Invariant 4: secondarySeatCount null om category !== bredband', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const category = pick(['mobil', 'el', 'saas-productivity', 'skrivarleasing']);
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, category, mixed);
      assert.strictEqual(m.secondarySeatCount, null,
        `secondarySeatCount must be null for category=${category}, got ${m.secondarySeatCount}`);
    }
  });
});

// ── Invariant 5 ───────────────────────────────────────────────────────────────
// secondaryConnectionSpeedMbit är alltid null när category !== 'mobil'
describe('Invariant 5: secondaryConnectionSpeedMbit null om category !== mobil', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const category = pick(['bredband', 'el', 'saas-productivity', 'skrivarleasing']);
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, category, mixed);
      assert.strictEqual(m.secondaryConnectionSpeedMbit, null,
        `secondaryConnectionSpeedMbit must be null for category=${category}, got ${m.secondaryConnectionSpeedMbit}`);
    }
  });
});

// ── Invariant 6 ───────────────────────────────────────────────────────────────
// secondaryConnectionSpeedMbit är alltid en av [100, 250, 500, 1000] eller null
describe('Invariant 6: secondaryConnectionSpeedMbit ∈ {100, 250, 500, 1000} ∪ {null}', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomLineItems(rnd(0, 10));
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, 'mobil', mixed);
      assert.ok(
        m.secondaryConnectionSpeedMbit === null
          || VALID_SPEED_TIERS.includes(m.secondaryConnectionSpeedMbit),
        `secondaryConnectionSpeedMbit must be null or in ${JSON.stringify(VALID_SPEED_TIERS)}, got ${m.secondaryConnectionSpeedMbit}`,
      );
    }
  });
});

// ── Invariant 7 ───────────────────────────────────────────────────────────────
// Om secondarySaving !== null → secondarySaving.grossSaving >= 500
describe('Invariant 7: secondarySaving.grossSaving >= 500 om ej null', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomRecurringItems(rnd(1, 8));
      const category = pick(['mobil', 'bredband']);
      const mixed    = true;
      const industry = randomIndustry();
      const employees = randomEmployees();
      const m = computeInvoiceMetrics(items, category, mixed);
      const s = computeSecondarySaving({
        metrics: m,
        category,
        potentialMixedCategories: mixed,
        industry,
        employees,
      });
      if (s !== null) {
        assert.ok(
          s.grossSaving >= 500,
          `grossSaving must be >= 500 if not null, got ${s.grossSaving}`,
        );
      }
    }
  });
});

// ── Invariant 8 ───────────────────────────────────────────────────────────────
// Om secondarySaving !== null → netSaving === Math.round(grossSaving * 0.80)
describe('Invariant 8: netSaving === Math.round(grossSaving * 0.80)', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomRecurringItems(rnd(1, 8));
      const category = pick(['mobil', 'bredband']);
      const mixed    = true;
      const industry = randomIndustry();
      const employees = randomEmployees();
      const m = computeInvoiceMetrics(items, category, mixed);
      const s = computeSecondarySaving({
        metrics: m,
        category,
        potentialMixedCategories: mixed,
        industry,
        employees,
      });
      if (s !== null) {
        const expected = Math.round(s.grossSaving * 0.80);
        assert.strictEqual(
          s.netSaving,
          expected,
          `netSaving must equal Math.round(grossSaving * 0.80): expected ${expected}, got ${s.netSaving}`,
        );
      }
    }
  });
});

// ── Invariant 9 ───────────────────────────────────────────────────────────────
// Om secondarySaving !== null → grossSaving === currentAnnual - suggestedAnnual
describe('Invariant 9: grossSaving === currentAnnual - suggestedAnnual', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const items    = randomRecurringItems(rnd(1, 8));
      const category = pick(['mobil', 'bredband']);
      const mixed    = true;
      const industry = randomIndustry();
      const employees = randomEmployees();
      const m = computeInvoiceMetrics(items, category, mixed);
      const s = computeSecondarySaving({
        metrics: m,
        category,
        potentialMixedCategories: mixed,
        industry,
        employees,
      });
      if (s !== null) {
        const expected = s.currentAnnual - s.suggestedAnnual;
        assert.strictEqual(
          s.grossSaving,
          expected,
          `grossSaving must equal currentAnnual - suggestedAnnual: expected ${expected}, got ${s.grossSaving}`,
        );
      }
    }
  });
});

// ── Invariant 10 ──────────────────────────────────────────────────────────────
// Line items med type !== 'recurring_subscription' ska inte påverka metrics
// (alla outputs ska bli null/0 om det bara finns icke-recurring rader)
describe('Invariant 10: icke-recurring items påverkar ej metrics', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const n     = rnd(1, 8);
      const nonRecurringTypes = ['variable_usage', 'one_time_fee', 'hardware'];
      const items = Array.from({ length: n }, () =>
        randomLineItem({ type: pick(nonRecurringTypes), amount: rnd(100, 5000) }),
      );
      const category = randomCategory();
      const mixed    = Math.random() < 0.5;
      const m        = computeInvoiceMetrics(items, category, mixed);

      // Ingen addon-komponent ska finnas
      assert.strictEqual(m.mobileAddonMonthly, null,
        `mobileAddonMonthly must be null for all-non-recurring items`);
      assert.strictEqual(m.broadbandAddonMonthly, null,
        `broadbandAddonMonthly must be null for all-non-recurring items`);

      // Komponent-fält ska alla vara null
      assert.strictEqual(m.primaryComponentMonthly, null,
        `primaryComponentMonthly must be null for all-non-recurring items`);
      assert.strictEqual(m.secondaryComponentMonthly, null,
        `secondaryComponentMonthly must be null for all-non-recurring items`);
      assert.strictEqual(m.secondaryConnectionSpeedMbit, null,
        `secondaryConnectionSpeedMbit must be null for all-non-recurring items`);
      assert.strictEqual(m.secondarySeatCount, null,
        `secondarySeatCount must be null for all-non-recurring items`);
    }
  });
});

// ── Invariant 11 ──────────────────────────────────────────────────────────────
// sum(mobileAddons) + sum(broadbandAddons) + sum(base) === sum(recurring)
// Verifieras via principen: addon + non-addon buckets = hela recurring-summan.
// Vi testar detta indirekt: inga rader "försvinner" ur totalräkningen.
// Eftersom vi inte har direkt åtkomst till interna buckets verifierar vi att
// metrics-funktionen returnerar konsistenta värden:
// Om mixed=false → primär+sekundär=null. Om mixed=true och det finns secondary-linjer
// → secondaryComponentMonthly är > 0.
// Den starka formen av invarianten: för rena recurring-arrayer (inga addons, inga cross-category)
// ska primaryComponentMonthly === sum(recurring) när mixed=true och category passar.
describe('Invariant 11: recurring-summan bevaras i komponenterna', () => {
  test(`${ITERATIONS} iterationer`, () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const n = rnd(1, 6);
      // Rena base-rader (inga addon, inga cross-category-nyckelord)
      const baseItems = Array.from({ length: n }, () => ({
        description: `Abonnemang ${i}-${n}`,
        type:        'recurring_subscription',
        amount:      rnd(100, 3000),
        is_addon:    false,
        addon_type:  undefined,
      }));

      const totalRecurring = baseItems.reduce((s, li) => s + li.amount, 0);

      // mixed=false: primaryComponent = null, men mobileAddon/broadbandAddon ska fortf. vara null
      // (inga addon-rader i baseItems)
      const mFalse = computeInvoiceMetrics(baseItems, 'mobil', false);
      assert.strictEqual(mFalse.primaryComponentMonthly, null,
        `primaryComponentMonthly must be null when mixed=false`);
      assert.strictEqual(mFalse.mobileAddonMonthly, null,
        `no addon lines → mobileAddonMonthly must be null`);
      assert.strictEqual(mFalse.broadbandAddonMonthly, null,
        `no addon lines → broadbandAddonMonthly must be null`);

      // mixed=true + category='mobil' utan cross-category-rader:
      // secondaryComponent=null (inga bredband-rader), primaryComponent = totalRecurring
      const mTrue = computeInvoiceMetrics(baseItems, 'mobil', true);
      if (mTrue.primaryComponentMonthly !== null) {
        assert.strictEqual(
          mTrue.primaryComponentMonthly,
          totalRecurring,
          `primaryComponentMonthly (${mTrue.primaryComponentMonthly}) must equal totalRecurring (${totalRecurring}) for pure base items`,
        );
      }
    }
  });
});
