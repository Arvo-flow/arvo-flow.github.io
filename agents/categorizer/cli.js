// agents/categorizer/cli.js
// Run: node agents/categorizer/cli.js < invoice.json
//      node agents/categorizer/cli.js path/to/invoice.json
//      cat invoice.json | node agents/categorizer/cli.js
//
// Demo: node agents/categorizer/cli.js --demo

import { readFileSync } from 'node:fs';
import { categorize } from './categorize.js';

const DEMO_INVOICE = {
  supplier: 'VATTENFALL FÖRETAG AB',
  amount: 18234,
  date: '2025-03-15',
  account: '5310',
  description: 'ELFÖRBRUKNING MARS 2025 - ANL.NR 735999',
  recurring: true,
};

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

async function main() {
  const args = process.argv.slice(2);
  let invoice;

  if (args.includes('--demo')) {
    invoice = DEMO_INVOICE;
    console.error(
      '\n[Använder demo-faktura — kör utan --demo för att läsa från fil/stdin]\n'
    );
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    const text = readFileSync(args[0], 'utf8');
    invoice = JSON.parse(text);
  } else if (!process.stdin.isTTY) {
    invoice = JSON.parse(await readStdin());
  } else {
    console.error(`Categorizer CLI

Användning:
  node agents/categorizer/cli.js path/to/invoice.json
  cat invoice.json | node agents/categorizer/cli.js
  node agents/categorizer/cli.js --demo

Faktura-format (JSON):
{
  "supplier": "Vattenfall Företag AB",
  "amount": 18234,
  "date": "2025-03-15",
  "account": "5310",
  "description": "Elförbrukning mars 2025",
  "recurring": true
}
`);
    process.exit(1);
  }

  const start = Date.now();
  const result = await categorize(invoice);
  const elapsed = Date.now() - start;

  const cacheStatus =
    result.usage.cache_read_input_tokens > 0
      ? `cache HIT (${result.usage.cache_read_input_tokens} tokens lästa)`
      : `cache MISS (${result.usage.cache_creation_input_tokens} tokens skrivna)`;

  console.error(`
[Klar på ${elapsed} ms · ${cacheStatus}]
`);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`\n[Fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
