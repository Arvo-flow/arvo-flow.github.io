// agents/orchestrator/eval.js
// Run all lifecycle scenarios end-to-end against the stubbed clients.
// Verifies that each scenario reaches its expected terminal state and that
// no invalid state transitions occurred.
//
// Run: node agents/orchestrator/eval.js
//      node agents/orchestrator/eval.js --json   (machine-readable)

import { readFileSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Orchestrator, OrchestratorError } from './orchestrator.js';
import { FileStore } from './store.js';
import { ScriveClient } from './clients/scrive.js';
import { SupplierClient } from './clients/supplier.js';
import { FortnoxWatchdog } from './clients/fortnox-watch.js';
import { STATES } from './state-machine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE_PATH = resolve(__dirname, 'fixtures/scenarios.json');
const TEST_DATA_DIR = resolve(__dirname, 'data', '_eval');

function parseArgs(argv) {
  return { json: argv.includes('--json') };
}

async function runHappyPath(orch, fortnox, fixture) {
  const customerId = fixture.input.customer.fortnoxCustomerId ?? 'unknown';
  const sw = await orch.createSwitch(fixture.input);
  await orch.markAwaitingApproval(sw.id);
  await orch.prepareFullmakt(sw.id);
  await orch.initiateSigning(sw.id);

  // Poll Scrive until signed (stub auto-signs after 2 polls)
  const signing = (await orch.getRecord(sw.id)).context.signing;
  let status;
  for (let i = 0; i < 5; i++) {
    status = await orch.scrive.pollDocumentStatus(signing.documentId);
    if (status.status === 'signed') break;
  }
  if (status.status !== 'signed') {
    throw new Error(`Stub should have signed by now, got ${status.status}`);
  }
  const signedPdf = await orch.scrive.downloadSignedPdf(signing.documentId);
  await orch.handleSigned(sw.id, {
    signedPdfBytes: signedPdf,
    scriveDocId: signing.documentId,
    signedSsn: status.signedSsn,
    signedAt: status.signedAt,
  });

  await orch.executeTermination(sw.id);
  await orch.executeNewApplication(sw.id);

  // Seed a "first invoice" in the Fortnox watchdog so markLive matches
  const newSupplier = fixture.input.recommendation.suggestedSupplier;
  fortnox.__seedInvoice(customerId, {
    supplierName: newSupplier,
    amount: fixture.input.recommendation.suggestedAnnualCost / 12,
    date: new Date().toISOString().slice(0, 10),
  });
  const record = await orch.getRecord(sw.id);
  const matched = await fortnox.pollForNewSupplierInvoice({ switchRecord: record });
  if (!matched) throw new Error('Fortnox watchdog failed to match seeded invoice');
  await orch.markLive(sw.id, { firstInvoice: matched });

  // Mark invoice paid → trigger success fee
  fortnox.__markPaid(customerId, matched.id);
  await orch.markSuccessFeeDue(sw.id, { paidInvoice: matched });
  await orch.markCompleted(sw.id, { stripeInvoiceId: 'in_stub_test_001' });

  return orch.getStatus(sw.id);
}

async function runCancelDuringSigning(orch, fixture) {
  const sw = await orch.createSwitch(fixture.input);
  await orch.markAwaitingApproval(sw.id);
  await orch.prepareFullmakt(sw.id);
  await orch.initiateSigning(sw.id);
  const signing = (await orch.getRecord(sw.id)).context.signing;
  // Customer rejects in the BankID app — Scrive returns "rejected"
  await orch.scrive.cancelDocument(signing.documentId, { reason: 'customer_rejected' });
  await orch.handleCancelled(sw.id, { reason: 'scrive:rejected', scriveDocId: signing.documentId });
  return orch.getStatus(sw.id);
}

async function runSigningExpires(orch, fixture) {
  const sw = await orch.createSwitch(fixture.input);
  await orch.markAwaitingApproval(sw.id);
  await orch.prepareFullmakt(sw.id);
  await orch.initiateSigning(sw.id);
  const signing = (await orch.getRecord(sw.id)).context.signing;
  // Force the stub into expired state
  orch.scrive.__forceState(signing.documentId, 'expired');
  await orch.handleSigningExpired(sw.id, { scriveDocId: signing.documentId });
  return orch.getStatus(sw.id);
}

async function runRejectLicensePending(orch, fixture) {
  let threw = false;
  try {
    await orch.createSwitch(fixture.input);
  } catch (err) {
    if (err instanceof OrchestratorError) threw = true;
    else throw err;
  }
  return { createSwitchThrows: threw };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const fixtures = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8'));

  // Clean test data dir for repeatable runs
  if (existsSync(TEST_DATA_DIR)) {
    rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }

  if (!args.json) console.error(`Kör Orchestrator-eval mot ${fixtures.length} scenarios…\n`);

  const reports = [];
  let passed = 0;
  const start = Date.now();

  for (const fix of fixtures) {
    const store = new FileStore({ dataDir: resolve(TEST_DATA_DIR, fix.id) });
    const scrive = new ScriveClient({ mode: 'stub', stubAutoSignAfterPolls: 1 });
    const supplier = new SupplierClient({ mode: 'stub' });
    const fortnox = new FortnoxWatchdog({ mode: 'stub' });
    const orch = new Orchestrator({ store, scrive, supplier, fortnox });

    let result;
    try {
      switch (fix.scenario) {
        case 'cancelDuringSigning':
          result = await runCancelDuringSigning(orch, fix);
          break;
        case 'signingExpires':
          result = await runSigningExpires(orch, fix);
          break;
        case 'rejectLicensePending':
          result = await runRejectLicensePending(orch, fix);
          break;
        default:
          result = await runHappyPath(orch, fortnox, fix);
      }
    } catch (err) {
      reports.push({ id: fix.id, label: fix.label, status: 'error', error: err.message });
      continue;
    }

    const failures = [];
    if (fix.expected.createSwitchThrows && !result.createSwitchThrows) {
      failures.push('Expected createSwitch to throw, but it succeeded');
    }
    if (fix.expected.finalState && result.state !== fix.expected.finalState) {
      failures.push(`Expected finalState=${fix.expected.finalState}, got ${result.state}`);
    }

    if (failures.length === 0) {
      passed++;
      reports.push({ id: fix.id, label: fix.label, status: 'pass', result });
    } else {
      reports.push({ id: fix.id, label: fix.label, status: 'fail', failures, result });
    }
  }

  const elapsed = Date.now() - start;
  const passRate = passed / fixtures.length;

  if (args.json) {
    console.log(JSON.stringify({ fixtures: fixtures.length, passed, passRate, elapsedMs: elapsed, reports }, null, 2));
    return;
  }

  console.error(`
═══════════════════════════════════════════════════════════════
  Orchestrator Eval — state machine + stubbed clients
═══════════════════════════════════════════════════════════════

  Scenarios:          ${fixtures.length}
  Klarade:            ${passed}
  Pass rate:          ${(passRate * 100).toFixed(1)} %
  Total tid:          ${elapsed} ms

  Per scenario:
`);
  for (const r of reports) {
    if (r.status === 'pass') {
      const detail = r.result.state ? ` → ${r.result.state}` : '';
      console.error(`  ✓ ${r.id}  ${r.label}${detail}`);
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
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
