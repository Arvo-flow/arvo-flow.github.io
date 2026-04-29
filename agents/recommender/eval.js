// agents/recommender/eval.js
// Run all scenario fixtures, validate the recommender's output against
// expected behavior. Reports:
//   - pass rate per assertion
//   - per-scenario breakdown
//   - cost (USD, Sonnet 4.6 pricing)
//   - cache hit rate
//
// Run: node agents/recommender/eval.js
//      node agents/recommender/eval.js --concurrency 4
//      node agents/recommender/eval.js --json

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { recommendBatch } from './recommend.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(__dirname, 'fixtures/scenarios.json');

// Sonnet 4.6 pricing (per 1M tokens, 2026-04 cached snapshot)
const PRICE = {
  input: 3.0,
  output: 15.0,
  cache_write_mult: 1.25,
  cache_read_mult: 0.1,
};

function calcCost(usage) {
  return (
    (usage.input_tokens * PRICE.input +
      usage.output_tokens * PRICE.output +
      usage.cache_creation_input_tokens * PRICE.input * PRICE.cache_write_mult +
      usage.cache_read_input_tokens * PRICE.input * PRICE.cache_read_mult) /
    1_000_000
  );
}

function evaluateAssertions(result, expected) {
  const failures = [];

  if (typeof expected.shouldSwitch === 'boolean' &&
      result.shouldSwitch !== expected.shouldSwitch) {
    failures.push(`shouldSwitch: expected ${expected.shouldSwitch}, got ${result.shouldSwitch}`);
  }
  if (typeof expected.vipQueue === 'boolean' &&
      result.vipQueue !== expected.vipQueue) {
    failures.push(`vipQueue: expected ${expected.vipQueue}, got ${result.vipQueue}`);
  }
  if (expected.noSupplierNamed && result.suggestedSupplier !== null) {
    failures.push(
      `noSupplierNamed expected, but got "${result.suggestedSupplier}" — license-pending guard failed`
    );
  }
  if (expected.minSavingPerYear &&
      result.savingPerYear < expected.minSavingPerYear) {
    failures.push(
      `minSavingPerYear: expected ≥${expected.minSavingPerYear}, got ${result.savingPerYear}`
    );
  }
  if (expected.overpaymentPositive === true &&
      result.overpaymentPercent <= 0) {
    failures.push(
      `overpaymentPositive expected, got ${result.overpaymentPercent}`
    );
  }
  if (expected.overpaymentPositive === false &&
      result.overpaymentPercent > 0) {
    failures.push(
      `overpaymentPositive=false expected, got ${result.overpaymentPercent}`
    );
  }
  if (expected.confidenceNotHigh && result.confidence === 'high') {
    failures.push(
      `confidenceNotHigh expected, got "${result.confidence}"`
    );
  }

  return failures;
}

function parseArgs(argv) {
  const args = { concurrency: 3, json: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--concurrency') args.concurrency = Number(argv[++i]);
    else if (argv[i] === '--json') args.json = true;
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const fixtures = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8'));

  if (!args.json) {
    console.error(`Kör Recommender mot ${fixtures.length} scenarios…\n`);
  }

  const start = Date.now();
  const results = await recommendBatch(
    fixtures.map((f) => f.input),
    { concurrency: args.concurrency }
  );
  const elapsed = Date.now() - start;

  let passed = 0;
  let totalCost = 0;
  let totalCacheReadTokens = 0;
  let totalCacheCreatedTokens = 0;
  const reports = [];

  results.forEach((res, i) => {
    const fix = fixtures[i];
    if (res.error) {
      reports.push({ id: fix.id, label: fix.label, status: 'error', error: res.error });
      return;
    }

    totalCost += calcCost(res.usage);
    totalCacheReadTokens += res.usage.cache_read_input_tokens;
    totalCacheCreatedTokens += res.usage.cache_creation_input_tokens;

    const failures = evaluateAssertions(res, fix.expected);
    if (failures.length === 0) {
      passed++;
      reports.push({ id: fix.id, label: fix.label, status: 'pass', result: res });
    } else {
      reports.push({
        id: fix.id, label: fix.label, status: 'fail',
        failures, result: res,
      });
    }
  });

  const passRate = passed / fixtures.length;
  const cacheHitRate =
    totalCacheReadTokens / (totalCacheReadTokens + totalCacheCreatedTokens || 1);

  if (args.json) {
    console.log(
      JSON.stringify(
        {
          fixtures: fixtures.length,
          passed, passRate,
          totalCostUsd: totalCost,
          costPerScenarioUsd: totalCost / fixtures.length,
          cacheHitRate,
          elapsedMs: elapsed,
          avgLatencyMs: elapsed / fixtures.length,
          reports,
        },
        null, 2
      )
    );
    return;
  }

  console.error(`
═══════════════════════════════════════════════════════════════
  Recommender Eval — claude-sonnet-4-6
═══════════════════════════════════════════════════════════════

  Scenarios:          ${fixtures.length}
  Klarade:            ${passed}
  Pass rate:          ${(passRate * 100).toFixed(1)} %

  Total tid:          ${elapsed} ms
  Snitt latens:       ${(elapsed / fixtures.length).toFixed(0)} ms / scenario

  Kostnad totalt:     $${totalCost.toFixed(4)}
  Kostnad per scen:   $${(totalCost / fixtures.length).toFixed(5)}
  Cache hit rate:     ${(cacheHitRate * 100).toFixed(1)} %  (${totalCacheReadTokens} lästa / ${totalCacheCreatedTokens} skrivna tokens)

  Per scenario:
`);

  for (const r of reports) {
    if (r.status === 'pass') {
      console.error(`  ✓ ${r.id}  ${r.label}`);
    } else if (r.status === 'fail') {
      console.error(`  ✗ ${r.id}  ${r.label}`);
      for (const f of r.failures) console.error(`      ${f}`);
      if (r.result.reasoning) {
        console.error(`      Modellens reasoning: "${r.result.reasoning}"`);
      }
    } else {
      console.error(`  ⚠ ${r.id}  ${r.label} — ERROR: ${r.error}`);
    }
  }
  console.error('');
}

main().catch((err) => {
  console.error(`\n[Eval-fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
