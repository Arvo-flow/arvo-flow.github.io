// agents/recommender/cli.js
// Run: node agents/recommender/cli.js < input.json
//      node agents/recommender/cli.js path/to/input.json
//      node agents/recommender/cli.js --demo
//
// Input format (JSON):
// {
//   "customer": { "industry": "byraer" | "hantverkare" | "ehandel" | "tillverkning",
//                 "employees": 14, "revenue": 24000000 },
//   "invoice":  { "annualCost": 84000 },
//   "categorized": {
//     "category": "el",
//     "subType": "fast",
//     "normalizedSupplier": "Vattenfall (Företag)",
//     "confidence": 0.97
//   }
// }

import { readFileSync } from 'node:fs';
import { recommend } from './recommend.js';

const DEMO_INPUT = {
  customer: { industry: 'byraer', employees: 14, revenue: 24000000 },
  invoice: { annualCost: 84000 },
  categorized: {
    category: 'el',
    subType: 'fast',
    normalizedSupplier: 'Vattenfall (Företag)',
    confidence: 0.97,
  },
};

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function main() {
  const args = process.argv.slice(2);
  let input;

  if (args.includes('--demo')) {
    input = DEMO_INPUT;
    console.error('\n[Använder demo-input — kör utan --demo för fil/stdin]\n');
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    input = JSON.parse(readFileSync(args[0], 'utf8'));
  } else if (!process.stdin.isTTY) {
    input = JSON.parse(await readStdin());
  } else {
    console.error(`Recommender CLI

Användning:
  node agents/recommender/cli.js path/to/input.json
  cat input.json | node agents/recommender/cli.js
  node agents/recommender/cli.js --demo
`);
    process.exit(1);
  }

  const start = Date.now();
  const result = await recommend(input);
  const elapsed = Date.now() - start;

  const cacheStatus =
    result.usage.cache_read_input_tokens > 0
      ? `cache HIT (${result.usage.cache_read_input_tokens} tokens lästa)`
      : `cache MISS (${result.usage.cache_creation_input_tokens} tokens skrivna)`;

  console.error(`\n[Klar på ${elapsed} ms · ${cacheStatus}]\n`);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`\n[Fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
