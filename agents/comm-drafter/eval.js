// agents/comm-drafter/eval.js
// Run all draft scenarios and validate output against assertions.
// Run: node agents/comm-drafter/eval.js
//      node agents/comm-drafter/eval.js --json

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { draft } from './draft.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(__dirname, 'fixtures/scenarios.json');

// Haiku 4.5 pricing (per 1M tokens)
const PRICE = { input: 1.0, output: 5.0, cw: 1.25, cr: 0.1 };

function calcCost(usage) {
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
  if (expected.bodyMaxWords) {
    const wc = result.body.trim().split(/\s+/).length;
    if (wc > expected.bodyMaxWords) {
      failures.push(`bodyMaxWords: expected ≤${expected.bodyMaxWords}, got ${wc}`);
    }
  }
  if (expected.smsMaxChars) {
    if (result.smsText.length > expected.smsMaxChars) {
      failures.push(`smsMaxChars: expected ≤${expected.smsMaxChars}, got ${result.smsText.length}`);
    }
  }
  if (expected.tone && !expected.tone.includes(result.tone)) {
    failures.push(`tone: expected one of [${expected.tone.join(', ')}], got "${result.tone}"`);
  }
  if (expected.ctaPresent && !result.ctaUrl) {
    failures.push('ctaPresent: expected ctaUrl to be set');
  }
  if (expected.subjectMentionsSaving) {
    if (!/\d/.test(result.subject)) {
      failures.push('subjectMentionsSaving: expected subject to mention a number');
    }
  }
  return failures;
}

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const fixtures = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8'));

  if (!json) console.error(`Kör Comm Drafter mot ${fixtures.length} scenarios…\n`);

  const reports = [];
  let passed = 0, totalCost = 0;
  const start = Date.now();

  for (const fix of fixtures) {
    try {
      const result = await draft(fix.input);
      totalCost += calcCost(result.usage);
      const failures = evaluate(result, fix.expected);
      if (failures.length === 0) {
        passed++;
        reports.push({ id: fix.id, label: fix.label, status: 'pass', subject: result.subject, tone: result.tone });
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
    console.log(JSON.stringify({ fixtures: fixtures.length, passed, passRate, totalCostUsd: totalCost, elapsedMs: elapsed, reports }, null, 2));
    return;
  }

  console.error(`
═══════════════════════════════════════════════════════════════
  Comm Drafter Eval — claude-haiku-4-5
═══════════════════════════════════════════════════════════════

  Scenarios:    ${fixtures.length}
  Klarade:      ${passed}
  Pass rate:    ${(passRate * 100).toFixed(1)} %
  Total tid:    ${elapsed} ms
  Kostnad:      $${totalCost.toFixed(4)}

  Per scenario:
`);
  for (const r of reports) {
    if (r.status === 'pass') {
      console.error(`  ✓ ${r.id}  ${r.label}\n      subject: "${r.subject}"  [${r.tone}]`);
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
