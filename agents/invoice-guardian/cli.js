// agents/invoice-guardian/cli.js
// Run: node agents/invoice-guardian/cli.js --demo
//      node agents/invoice-guardian/cli.js path/to/input.json

import { readFileSync } from 'node:fs';
import { guard } from './guard.js';

const DEMO_INPUT = {
  invoice: {
    amount: 2350,
    date: '2026-04-30',
    supplierName: 'Telia Företag',
    category: 'mobil',
    lineItems: [
      { description: 'Mobilabonnemang 14 användare', amount: 1890 },
      { description: 'Indexuppräkning KPI 2025', amount: 460 },
    ],
  },
  agreement: {
    agreedAnnualCost: 22680,    // = 1890 × 12
    supplierName: 'Telia Företag',
    signedAt: '2025-06-15',
    kpiClause: null,            // No KPI clause in the signed agreement
    invoiceFrequency: 'monthly',
    category: 'mobil',
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
    console.error('\n[Demo: smyghöjning från Telia, ingen KPI-klausul i avtalet]\n');
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    input = JSON.parse(readFileSync(args[0], 'utf8'));
  } else if (!process.stdin.isTTY) {
    input = JSON.parse(await readStdin());
  } else {
    console.error(`Invoice Guardian CLI

Användning:
  node agents/invoice-guardian/cli.js path/to/input.json
  node agents/invoice-guardian/cli.js --demo
`);
    process.exit(1);
  }

  const start = Date.now();
  const result = await guard(input);
  console.error(`\n[Klar på ${Date.now() - start} ms · LLM ${result.llmInvoked ? 'körd' : 'skippad'}]\n`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`\n[Fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
