// agents/orchestrator/cron.test.js
// End-to-end test for the cron loop. Creates real switches in a temp
// FileStore, schedules some for the past, others for the future, and
// asserts that runCron reactivates exactly the past-due ones.
//
// Run: node agents/orchestrator/cron.test.js
//
// This is not a unit-test framework run — keep it dependency-free.
// Pass via process exit code 0; fail = exit code 1.

import { rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Orchestrator } from './orchestrator.js';
import { FileStore } from './store.js';
import { ScriveClient } from './clients/scrive.js';
import { SupplierClient } from './clients/supplier.js';
import { FortnoxWatchdog } from './clients/fortnox-watch.js';
import { runCron } from './cron.js';
import { STATES, findDueSwitches } from './state-machine.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEST_DIR = resolve(__dirname, 'data', '_cron_test');

const SILENT_LOGGER = { info() {}, error() {}, warn() {} };

function makeInput(orgName, fortnoxId, contractEnd) {
  return {
    customer: {
      orgName,
      orgNumber: '556111-1111',
      address: 'Testvägen 1',
      signerName: 'Test',
      signerEmail: 't@t.test',
      signerSsn: '19800101-0000',
      fortnoxCustomerId: fortnoxId,
    },
    invoice: {
      category: 'leasing-bil',
      normalizedSupplier: 'ALD Automotive',
      annualCost: 412800,
      contractEnd,
    },
    recommendation: {
      shouldSwitch: true,
      currentSupplier: 'ALD Automotive',
      suggestedSupplier: 'Arval Sverige',
      suggestedAnnualCost: 363200,
      savingPerYear: 49600,
      vipQueue: false,
      cancellationNotice: 90,
    },
  };
}

function assert(cond, msg) {
  if (!cond) {
    console.error(`✗ FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`  ✓ ${msg}`);
}

async function main() {
  if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true, force: true });

  const orch = new Orchestrator({
    store: new FileStore({ dataDir: TEST_DIR }),
    scrive: new ScriveClient({ mode: 'stub' }),
    supplier: new SupplierClient({ mode: 'stub' }),
    fortnox: new FortnoxWatchdog({ mode: 'stub' }),
  });

  console.log('Cron loop integration test');
  console.log('===========================\n');

  // Create three switches, all in PROPOSED, then schedule them at
  // different reactivateAt dates: past, near-future, far-future.
  const sw1 = await orch.createSwitch(makeInput('Past Due AB', 'fnx_p1', '2027-01-01'));
  const sw2 = await orch.createSwitch(makeInput('Also Past Due AB', 'fnx_p2', '2027-02-01'));
  const sw3 = await orch.createSwitch(makeInput('Future AB', 'fnx_f1', '2028-08-01'));

  const past1 = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(); // 2 dgr sedan
  const past2 = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();       // 1 h sedan
  const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 dgr fram

  await orch.scheduleFuture(sw1.id, { reason: 'planned-renewal', reactivateAt: future });
  // Manually rewrite to past dates (scheduleFuture rejects past timestamps).
  // We work around by directly editing the store, since the test simulates
  // "time has passed since we scheduled" rather than scheduling in the past.
  const r1 = await orch.store.load(sw1.id);
  r1.context.scheduling.reactivateAt = past1;
  await orch.store.save(r1);

  await orch.scheduleFuture(sw2.id, { reason: 'planned-renewal', reactivateAt: future });
  const r2 = await orch.store.load(sw2.id);
  r2.context.scheduling.reactivateAt = past2;
  await orch.store.save(r2);

  await orch.scheduleFuture(sw3.id, { reason: 'planned-renewal', reactivateAt: future });

  // findDueSwitches should pick up the two with past reactivateAt.
  const all = await orch.list();
  const due = findDueSwitches(all, new Date());
  assert(due.length === 2, `findDueSwitches returns 2 (past-due) of 3 (got ${due.length})`);
  assert(
    due.map((d) => d.id).sort().join(',') === [sw1.id, sw2.id].sort().join(','),
    'findDueSwitches returns the two correct switches'
  );

  // Run the cron
  const result = await runCron({ orchestrator: orch, logger: SILENT_LOGGER });
  assert(result.dueCount === 2, `runCron processed 2 due switches (got ${result.dueCount})`);
  assert(result.reactivated === 2, `runCron reactivated 2 switches (got ${result.reactivated})`);
  assert(result.errors.length === 0, `runCron had no errors (got ${result.errors.length})`);

  // Verify state transitions persisted
  const after1 = await orch.getStatus(sw1.id);
  const after2 = await orch.getStatus(sw2.id);
  const after3 = await orch.getStatus(sw3.id);
  assert(after1.state === STATES.AWAITING_APPROVAL, `sw1 → awaiting_approval (got ${after1.state})`);
  assert(after2.state === STATES.AWAITING_APPROVAL, `sw2 → awaiting_approval (got ${after2.state})`);
  assert(after3.state === STATES.SCHEDULED_FUTURE, `sw3 still scheduled_future (got ${after3.state})`);

  // Idempotency: run cron again — nothing else should be due
  const result2 = await runCron({ orchestrator: orch, logger: SILENT_LOGGER });
  assert(result2.dueCount === 0, `second run: 0 due (got ${result2.dueCount})`);
  assert(result2.reactivated === 0, `second run: 0 reactivated (got ${result2.reactivated})`);

  rmSync(TEST_DIR, { recursive: true, force: true });
  console.log('\nAll cron tests passed.\n');
}

main().catch((err) => {
  console.error(`\n[Test fatal] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
