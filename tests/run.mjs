#!/usr/bin/env node
// tests/run.mjs
// Kör: node tests/run.mjs
// Kräver Node 22+. Inga externa dependencies.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { computeSecondarySaving } from '../lib/secondary-savings.js';

import { fixtures as f01 } from './fixtures/01-mobil.mjs';
import { fixtures as f02 } from './fixtures/02-bredband.mjs';
import { fixtures as f03 } from './fixtures/03-combined.mjs';
import { fixtures as f04 } from './fixtures/04-el.mjs';
import { fixtures as f05 } from './fixtures/05-saas.mjs';
import { fixtures as f06 } from './fixtures/06-skrivarleasing.mjs';
import { fixtures as f07 } from './fixtures/07-edge-cases.mjs';
import { fixtures as f08 } from './fixtures/08-realistic.mjs';
import './el-recommendation.mjs';
import './el-intelligence.mjs';
import './tele2-broadband.mjs';
import './verifier-registry.mjs';
import './branchindex.mjs';
import './recommend-deterministic.mjs';
import './shelfware.mjs';
import './recompute-shelfware.mjs';
import './fraktjakt.mjs';
import './fortnox.mjs';
import './fortnox-recommendation.mjs';
import './spiris.mjs';
import './spiris-recommendation.mjs';
import './google-workspace-recommendation.mjs';
import './m365-rightsizing.mjs';
import './adobe-pricing.mjs';
import './telekom-normalize.mjs';
import './molnvaxel-recommendation.mjs';
import './loneadmin-recommendation.mjs';
import './forensics.mjs';
import './contract-clock.mjs';
import './price-forecast.mjs';
import './judgment-contract.mjs';
import './holdings.mjs';
import './domain-intel.mjs';
import './session.mjs';
import './extract-simple-invoice.mjs';
import './sanity-verifier.mjs';
import './adobe-rightsizing.mjs';
import './adobe-recommendation.mjs';
import './saas-substitution.mjs';
import './stress-mork.mjs';
import './watched-ledger.mjs';
import './greeting.mjs';
import './business-intel.mjs';
import './room-continuation.mjs';
import './outbound-identity.mjs';
import './contract-intel.mjs';
import './korpusdiff.mjs';
import './schemakrav.mjs';
import './verifikationskvitto.mjs';
import './fee.mjs';
import './avtal-fallor.mjs';
import './deadline-reminder.mjs';

// ── SVITENS TYSTA HÅL (grundarfynd 2026-08-04) ───────────────────────────────
// Femton testfiler låg PÅ DISK men utanför sviten — inklusive dem bibeln kallar maskinlås:
// balanskrav (attribueringslåset/683-felet), svea-print (faktura 440192), price-verdict
// (verifieringsjuryn), branch-anchors, revisionsgrind. 181 gröna tester som aldrig kördes.
// Samma failure mode som smygtystnaden i vakt_events: en vakt som FINNS men inte är inkopplad
// är ingen vakt — och tystnaden ser identisk ut med "allt är bra". Nedanför står låset som
// gör hålet omöjligt: sviten kontrollerar sin egen fullständighet mot filsystemet.
import './balanskrav.mjs';
import './branch-anchors.mjs';
import './inbound-attachments.mjs';
import './inbound-reply.mjs';
import './ingest-bulk.mjs';
import './market-movement.mjs';
import './price-verdict.mjs';
import './property.mjs';
import './revisionsgrind.mjs';
import './saas-like-for-like.mjs';
import './saas-tier-detection.mjs';
import './supplier-keyword.mjs';
import './svea-print.mjs';
import './test-surface.mjs';
import './vakt.mjs';
import './tystnadsfel.mjs';
import './plan-pris.mjs';
import './mattsystem.mjs';
import './villkorsvakt.mjs';
import './vaktkontrakt.mjs';
import './villkorslasare.mjs';
import './sondkontrakt.mjs';
import './saas-avstamning.mjs';
import './lfl-produktionsvag.mjs';

const ALL = [
  ...f01, ...f02, ...f03, ...f04,
  ...f05, ...f06, ...f07, ...f08,
];

// ── Fixture runner ────────────────────────────────────────────────────────────

function runFixture(fx) {
  const metrics = computeInvoiceMetrics(
    fx.lineItems,
    fx.category,
    fx.mixed ?? false,
  );

  // Assert metrics (only keys present in fx.metrics)
  const em = fx.metrics ?? {};
  for (const [key, expected] of Object.entries(em)) {
    assert.strictEqual(
      metrics[key],
      expected,
      `[${fx.id}] metrics.${key}: expected ${expected}, got ${metrics[key]}`,
    );
  }

  // Assert secondary saving (only when fx.secondary key is present)
  if ('secondary' in fx) {
    const saving = computeSecondarySaving({
      metrics,
      category:                 fx.category,
      potentialMixedCategories: fx.mixed ?? false,
      industry:                 fx.industry ?? 'konsult',
      employees:                fx.employees ?? 5,
    });

    if (fx.secondary === null) {
      assert.strictEqual(saving, null,
        `[${fx.id}] secondarySaving should be null, got ${JSON.stringify(saving)}`);
    } else {
      assert.notStrictEqual(saving, null,
        `[${fx.id}] secondarySaving should not be null`);
      const es = fx.secondary;
      for (const [key, expected] of Object.entries(es)) {
        assert.strictEqual(
          saving[key],
          expected,
          `[${fx.id}] secondary.${key}: expected ${expected}, got ${saving[key]}`,
        );
      }
    }
  }
}

// ── Test blocks ───────────────────────────────────────────────────────────────

describe('01 · Mobilabonnemang', () => {
  for (const fx of f01) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('02 · Bredband', () => {
  for (const fx of f02) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('03 · Kombinerade fakturor (mobil+bredband)', () => {
  for (const fx of f03) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('04 · El', () => {
  for (const fx of f04) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('05 · SaaS / Microsoft 365', () => {
  for (const fx of f05) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('06 · Skrivarleasing', () => {
  for (const fx of f06) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('07 · Edge cases & fällor', () => {
  for (const fx of f07) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

describe('08 · Realistiska fakturor (100 st)', () => {
  for (const fx of f08) test(fx.id + ' — ' + fx.name, () => runFixture(fx));
});

// ── SVITENS SJÄLVKONTROLL ────────────────────────────────────────────────────
// Regel 7: varje fel blir en tillgång. Felet var inte ett trasigt test — det var ett test som
// aldrig kördes, i tysthet, i månader. En maskinvakt som inte är inkopplad ser exakt likadan ut
// som en som säger "allt är bra". Därför läser sviten sin egen katalog och underkänner sig själv
// om en testfil finns på disk men saknar import här. Nya testfiler kan inte längre glömmas bort.
describe('00 · Sviten bevakar sig själv', () => {
  test('varje tests/*.mjs är inkopplad i run.mjs (inga tysta hål)', async () => {
    const { readdirSync, readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const dir = dirname(fileURLToPath(import.meta.url));
    const kalla = readFileSync(join(dir, 'run.mjs'), 'utf8');
    const glomda = readdirSync(dir)
      .filter((f) => f.endsWith('.mjs') && f !== 'run.mjs')
      .filter((f) => !kalla.includes(`'./${f}'`));
    assert.deepEqual(glomda, [], `Testfiler utanför sviten (lägg till import): ${glomda.join(', ')}`);
  });
});
