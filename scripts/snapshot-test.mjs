#!/usr/bin/env node
// Snapshot-test: runs computeInvoiceMetrics + routeExtraction against fixed
// JSON fixtures. No AI calls, no PDF reading. Fast, free, reproducible.
// Usage: node scripts/snapshot-test.mjs [fixture-name]

import { computeInvoiceMetrics } from '../lib/invoice-metrics.js';
import { routeExtraction, CONFIDENCE_THRESHOLD } from '../agents/test-invoice/extract.js';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = join(__dirname, '..', 'test-snapshots');

// ── CLI argument: optional fixture name filter ────────────────────────────────
const filterArg = process.argv[2] ?? null;

// ── Load fixture files ────────────────────────────────────────────────────────
let fixtureFiles = readdirSync(SNAPSHOTS_DIR).filter((f) => f.endsWith('.json'));

if (filterArg) {
  fixtureFiles = fixtureFiles.filter(
    (f) => f === filterArg || f === `${filterArg}.json`
  );
  if (fixtureFiles.length === 0) {
    console.error(`No fixture found matching: ${filterArg}`);
    process.exit(1);
  }
}

// ── Simple assertion helper ───────────────────────────────────────────────────
/**
 * @param {string[]} failures  Mutable array that collects failure messages.
 * @param {string}   label     Human-readable field name.
 * @param {*}        expected
 * @param {*}        actual
 */
function assert(failures, label, expected, actual) {
  const match =
    expected === actual ||
    (expected === null && actual === null) ||
    (expected === undefined && actual === undefined);

  if (!match) {
    failures.push(`  ${label}: expected ${JSON.stringify(expected)}  got ${JSON.stringify(actual)}`);
  }
}

// ── Run tests ─────────────────────────────────────────────────────────────────
let passed = 0;
let total = 0;

for (const file of fixtureFiles) {
  const fixturePath = join(SNAPSHOTS_DIR, file);
  const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'));
  const name = fixture._fixture ?? file.replace('.json', '');
  const failures = [];

  total += 1;

  // 1. routeExtraction --------------------------------------------------------
  const { route } = routeExtraction(fixture.extracted);
  assert(failures, 'route', fixture.expected.route, route);

  // 2. computeInvoiceMetrics --------------------------------------------------
  const metrics = computeInvoiceMetrics(
    fixture.extracted.lineItems,
    fixture.category,
    fixture.extracted.potentialMixedCategories
  );

  assert(failures, 'mobileAddonMonthly',    fixture.expected.mobileAddonMonthly,    metrics.mobileAddonMonthly);
  assert(failures, 'broadbandAddonMonthly', fixture.expected.broadbandAddonMonthly, metrics.broadbandAddonMonthly);
  assert(failures, 'primaryComponentMonthly', fixture.expected.primaryComponentMonthly, metrics.primaryComponentMonthly);

  // 3. Report -----------------------------------------------------------------
  if (failures.length === 0) {
    console.log(`✓ ${name}`);
    passed += 1;
  } else {
    console.log(`✗ ${name}`);
    for (const msg of failures) {
      console.log(msg);
    }
  }
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${passed}/${total} tests passed`);
process.exit(passed === total ? 0 : 1);
