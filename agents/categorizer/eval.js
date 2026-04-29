// agents/categorizer/eval.js
// Run all fixtures, compare against expected categories, report:
//  - overall accuracy
//  - per-category precision/recall
//  - confusion matrix on misclassifications
//  - average latency
//  - total cost (USD), with cache hit rate
//
// Run: node agents/categorizer/eval.js
//      node agents/categorizer/eval.js --concurrency 8
//      node agents/categorizer/eval.js --json   (machine-readable output)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { categorizeBatch } from './categorize.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(__dirname, 'fixtures/invoices.json');

// Haiku 4.5 pricing (per 1M tokens, 2026-04 cached snapshot)
const PRICE = {
  input: 1.0,
  output: 5.0,
  cache_write: 1.25,  // 1.25× input
  cache_read: 0.1,    // 0.1× input
};

function calcCost(usage) {
  return (
    (usage.input_tokens * PRICE.input +
      usage.output_tokens * PRICE.output +
      usage.cache_creation_input_tokens * PRICE.input * PRICE.cache_write +
      usage.cache_read_input_tokens * PRICE.input * PRICE.cache_read) /
    1_000_000
  );
}

function parseArgs(argv) {
  const args = { concurrency: 4, json: false };
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
    console.error(`Kör Categorizer mot ${fixtures.length} fixtures…\n`);
  }

  const start = Date.now();
  const results = await categorizeBatch(
    fixtures.map((f) => f.invoice),
    { concurrency: args.concurrency }
  );
  const elapsed = Date.now() - start;

  let correct = 0;
  let totalCost = 0;
  let totalCacheReadTokens = 0;
  let totalCacheCreatedTokens = 0;
  const misclassifications = [];
  const perCategory = {};

  results.forEach((res, i) => {
    const fix = fixtures[i];
    perCategory[fix.expectedCategory] ??= { tp: 0, fn: 0, fp: 0 };

    if (res.error) {
      misclassifications.push({
        id: fix.id,
        expected: fix.expectedCategory,
        actual: 'ERROR',
        reason: res.error,
        supplier: fix.invoice.supplier,
      });
      perCategory[fix.expectedCategory].fn++;
      return;
    }

    totalCost += calcCost(res.usage);
    totalCacheReadTokens += res.usage.cache_read_input_tokens;
    totalCacheCreatedTokens += res.usage.cache_creation_input_tokens;

    perCategory[res.category] ??= { tp: 0, fn: 0, fp: 0 };

    if (res.category === fix.expectedCategory) {
      correct++;
      perCategory[fix.expectedCategory].tp++;
    } else {
      misclassifications.push({
        id: fix.id,
        expected: fix.expectedCategory,
        actual: res.category,
        confidence: res.confidence,
        reasoning: res.reasoning,
        supplier: fix.invoice.supplier,
      });
      perCategory[fix.expectedCategory].fn++;
      perCategory[res.category].fp++;
    }
  });

  const accuracy = correct / fixtures.length;
  const cacheHitRate =
    totalCacheReadTokens / (totalCacheReadTokens + totalCacheCreatedTokens || 1);

  if (args.json) {
    console.log(
      JSON.stringify(
        {
          fixtures: fixtures.length,
          correct,
          accuracy,
          totalCostUsd: totalCost,
          costPerInvoiceUsd: totalCost / fixtures.length,
          cacheHitRate,
          elapsedMs: elapsed,
          avgLatencyMs: elapsed / fixtures.length,
          perCategory,
          misclassifications,
        },
        null,
        2
      )
    );
    return;
  }

  console.error(`
═══════════════════════════════════════════════════════════════
  Categorizer Eval — claude-haiku-4-5
═══════════════════════════════════════════════════════════════

  Fixtures:           ${fixtures.length}
  Korrekta:           ${correct}
  Accuracy:           ${(accuracy * 100).toFixed(1)} %

  Total tid:          ${elapsed} ms
  Snitt latens:       ${(elapsed / fixtures.length).toFixed(0)} ms / faktura

  Kostnad totalt:     $${totalCost.toFixed(4)}
  Kostnad per fakt:   $${(totalCost / fixtures.length).toFixed(5)}
  Cache hit rate:     ${(cacheHitRate * 100).toFixed(1)} %  (${totalCacheReadTokens} lästa / ${totalCacheCreatedTokens} skrivna tokens)

  Per kategori:
${Object.entries(perCategory)
  .map(([cat, m]) => {
    const precision = m.tp / (m.tp + m.fp || 1);
    const recall = m.tp / (m.tp + m.fn || 1);
    return `    ${cat.padEnd(22)} P=${(precision * 100).toFixed(0)}% R=${(recall * 100).toFixed(0)}% (tp:${m.tp} fp:${m.fp} fn:${m.fn})`;
  })
  .join('\n')}
`);

  if (misclassifications.length) {
    console.error(`  Misslyckade klassificeringar (${misclassifications.length}):\n`);
    for (const m of misclassifications) {
      console.error(`    ${m.id}  "${m.supplier}"`);
      console.error(`      Förväntat: ${m.expected}`);
      console.error(`      Faktiskt:  ${m.actual}${m.confidence ? ` (conf ${m.confidence})` : ''}`);
      if (m.reasoning) console.error(`      Resonemang: ${m.reasoning}`);
      if (m.reason) console.error(`      Fel: ${m.reason}`);
      console.error('');
    }
  }
}

main().catch((err) => {
  console.error(`\n[Eval-fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
