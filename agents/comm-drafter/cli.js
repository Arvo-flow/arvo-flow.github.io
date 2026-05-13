// agents/comm-drafter/cli.js
// Run: node agents/comm-drafter/cli.js --demo
//      node agents/comm-drafter/cli.js path/to/input.json

import { readFileSync } from 'node:fs';
import { draft } from './draft.js';
import { EVENT_TYPES } from './templates.js';

const DEMO_INPUT = {
  eventType: EVENT_TYPES.LIVE,
  switchRecord: {
    id: 'sw_demo_001',
    context: {
      customer: { orgName: 'Lindberg VVS AB', signerName: 'Johan' },
      recommendation: {
        currentSupplier: 'Vattenfall (Företag)',
        suggestedSupplier: 'Tibber',
        savingPerYear: 55600,
      },
      application: { expectedActivation: '2026-05-15' },
    },
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
    console.error('\n[Demo: LIVE event for Lindberg VVS]\n');
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    input = JSON.parse(readFileSync(args[0], 'utf8'));
  } else if (!process.stdin.isTTY) {
    input = JSON.parse(await readStdin());
  } else {
    console.error(`Comm Drafter CLI

Användning:
  node agents/comm-drafter/cli.js path/to/input.json
  node agents/comm-drafter/cli.js --demo
`);
    process.exit(1);
  }

  const start = Date.now();
  const result = await draft(input);
  console.error(`\n[Klar på ${Date.now() - start} ms]\n`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error(`\n[Fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
