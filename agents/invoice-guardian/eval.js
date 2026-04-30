// agents/invoice-guardian/eval.js
// Run: node agents/invoice-guardian/eval.js
//      node agents/invoice-guardian/eval.js --json

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { guard } from './guard.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(__dirname, 'fixtures/scenarios.json');

// Sonnet 4.6 pricing (LLM-stage only)
const PRICE = { input: 3.0, output: 15.0, cw: 1.25, cr: 0.1 };
function calcCost(usage) {
  if (!usage) return 0;
  return (
    (usage.input_tokens * PRICE.input +
      usage.output_tokens * PRICE.output +
      usage.cache_creation_input_tokens * PRICE.input * PRICE.cw +
      usage.cache_read_input_tokens * PRICE.input * PRICE.cr) /
    1_000_000
  );
}

function evaluate(result, expected) {
  const failures = [];
  if (typeof expected.needsAssessment === 'boolean' && result.needsAssessment !== expected.needsAssessment) {
    failures.push(`needsAssessment: expected ${expected.needsAssessment}, got ${result.needsAssessment}`);
  }
  if (typeof expected.llmInvoked === 'boolean' && result.llmInvoked !== expected.llmInvoked) {
    failures.push(`llmInvoked: expected ${expected.llmInvoked}, got ${result.llmInvoked}`);
  }
  if (expected.severityIn && !expected.severityIn.includes(result.severity)) {
    failures.push(`severity: expected one of [${expected.severityIn.join(', ')}], got "${result.severity}"`);
  }
  if (expected.classifications && !expected.classifications.includes(result.classification)) {
    failures.push(`classification: expected one of [${expected.classifications.join(', ')}], got "${result.classification}"`);
  }
  return failures;
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const fixtures = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8'));

  if (!json) console.error(`Kör Invoice Guardian mot ${fixtures.length} scenarios…\n`);

  const reports = [];
  let passed = 0, totalCost = 0, llmCalls = 0;
  const start = Date.now();

  for (const fix of fixtures) {
    try {
      const result = await guard(fix.input);
      if (result.usage) {
        totalCost += calcCost(result.usage);
        llmCalls++;
      }
      const failures = evaluate(result, fix.expected);
      if (failures.length === 0) {
        passed++;
        reports.push({ id: fix.id, label: fix.label, status: 'pass', severity: result.severity, classification: result.classification, llm: result.llmInvoked });
      } else {
        reports.push({ id: fix.id, label: fix.label, status: 'fail', failures, result });
      }
    } catch (err) {
      reports.push({ id: fix.id, label: fix.label, status: 'error', error: err.message });
    }
  }

  const elapsed = Date.now() - start;
  const passRate = passed / fixtures.length;

  if (json) {
    console.log(JSON.stringify({ fixtures: fixtures.length, passed, passRate, llmCalls, totalCostUsd: totalCost, elapsedMs: elapsed, reports }, null, 2));
    return;
  }

  console.error(`
═══════════════════════════════════════════════════════════════
  Invoice Guardian Eval — detect (deterministic) + classify (Sonnet 4.6)
═══════════════════════════════════════════════════════════════

  Scenarios:    ${fixtures.length}
  Klarade:      ${passed}
  Pass rate:    ${(passRate * 100).toFixed(1)} %
  LLM-anrop:    ${llmCalls}/${fixtures.length}  (resten skippade efter detect)
  Total tid:    ${elapsed} ms
  Kostnad:      $${totalCost.toFixed(4)}

  Per scenario:
`);
  for (const r of reports) {
    if (r.status === 'pass') {
      const llmBadge = r.llm ? '[LLM]' : '[skip]';
      console.error(`  ✓ ${r.id}  ${r.label}\n      severity=${r.severity}  classification=${r.classification}  ${llmBadge}`);
    } else if (r.status === 'fail') {
      console.error(`  ✗ ${r.id}  ${r.label}`);
      for (const f of r.failures) console.error(`      ${f}`);
    } else {
      console.error(`  ⚠ ${r.id}  ${r.label} — ERROR: ${r.error}`);
    }
  }
  console.error('');
}

main().catch((err) => {
  console.error(`\n[Eval-fel] ${err.message}`);
  process.exit(1);
});
