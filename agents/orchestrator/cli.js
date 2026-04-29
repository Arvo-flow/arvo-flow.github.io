// agents/orchestrator/cli.js
// Run: node agents/orchestrator/cli.js demo
//      node agents/orchestrator/cli.js status <switchId>
//      node agents/orchestrator/cli.js list
//      node agents/orchestrator/cli.js advance <switchId>
//
// "demo" walks the full happy-path lifecycle end-to-end with stubbed clients
// and prints each transition. Useful for sanity-checking the wiring.

import { Orchestrator } from './orchestrator.js';
import { FileStore } from './store.js';
import { ScriveClient } from './clients/scrive.js';
import { SupplierClient } from './clients/supplier.js';
import { FortnoxWatchdog } from './clients/fortnox-watch.js';
import { STATE_LABELS } from './state-machine.js';

const DEMO = {
  customer: {
    orgName: 'Lindberg VVS AB',
    orgNumber: '556789-1234',
    address: 'Industrigatan 12, 121 45 Stockholm',
    signerName: 'Johan Lindberg',
    signerEmail: 'johan@lindbergvvs.se',
    signerSsn: '19710203-1234',
    signerTitle: 'VD',
    fortnoxCustomerId: 'fnx_demo_001',
  },
  invoice: {
    category: 'el',
    normalizedSupplier: 'Vattenfall (Företag)',
    accountReference: 'ANL-735999',
    annualCost: 218400,
  },
  recommendation: {
    shouldSwitch: true,
    currentSupplier: 'Vattenfall (Företag)',
    suggestedSupplier: 'Tibber',
    suggestedProductName: 'Tibber Pulse Företag',
    suggestedAnnualCost: 162800,
    savingPerYear: 55600,
    overpaymentPercent: 25,
    confidence: 'high',
    vipQueue: false,
    cancellationNotice: 30,
  },
};

function makeOrchestrator() {
  const store = new FileStore();
  const scrive = new ScriveClient({ mode: 'stub', stubAutoSignAfterPolls: 1 });
  const supplier = new SupplierClient({ mode: 'stub' });
  const fortnox = new FortnoxWatchdog({ mode: 'stub' });
  return { orch: new Orchestrator({ store, scrive, supplier, fortnox }), fortnox };
}

function printStep(stepName, result) {
  const state = result.state ?? '(unknown)';
  console.error(`  → ${stepName.padEnd(28)} state: ${state}  (${STATE_LABELS[state] ?? '?'})`);
}

async function runDemo() {
  const { orch, fortnox } = makeOrchestrator();

  console.error('\n=== ARVO ORCHESTRATOR DEMO ===\n');
  console.error(`Customer:    ${DEMO.customer.orgName} (${DEMO.customer.orgNumber})`);
  console.error(`Category:    ${DEMO.invoice.category}`);
  console.error(`Switch from: ${DEMO.recommendation.currentSupplier}`);
  console.error(`Switch to:   ${DEMO.recommendation.suggestedSupplier}`);
  console.error(`Saving:      ${DEMO.recommendation.savingPerYear.toLocaleString('sv-SE')} kr/år`);
  console.error('');

  const sw = await orch.createSwitch(DEMO);
  console.error(`Switch created: ${sw.id}`);
  printStep('createSwitch', sw);

  printStep('markAwaitingApproval', await orch.markAwaitingApproval(sw.id));
  printStep('prepareFullmakt',      await orch.prepareFullmakt(sw.id));
  const fullmakt = (await orch.getRecord(sw.id)).context.fullmakt;
  console.error(`     fullmakt: ${fullmakt.path}  [${fullmakt.format}]`);
  if (fullmakt.note) console.error(`     note: ${fullmakt.note}`);

  printStep('initiateSigning', await orch.initiateSigning(sw.id));
  const signing = (await orch.getRecord(sw.id)).context.signing;
  console.error(`     scrive doc:  ${signing.documentId}`);
  console.error(`     signing url: ${signing.signingUrl}`);

  // Simulate the customer signing
  await orch.scrive.pollDocumentStatus(signing.documentId); // 1st poll
  const status = await orch.scrive.pollDocumentStatus(signing.documentId); // 2nd → signed (with default stub)
  const signedPdf = await orch.scrive.downloadSignedPdf(signing.documentId);
  printStep('handleSigned', await orch.handleSigned(sw.id, {
    signedPdfBytes: signedPdf,
    scriveDocId: signing.documentId,
    signedSsn: status.signedSsn,
    signedAt: status.signedAt,
  }));

  printStep('executeTermination',    await orch.executeTermination(sw.id));
  printStep('executeNewApplication', await orch.executeNewApplication(sw.id));

  // Seed an invoice that matches the new supplier
  fortnox.__seedInvoice(DEMO.customer.fortnoxCustomerId, {
    supplierName: DEMO.recommendation.suggestedSupplier,
    amount: DEMO.recommendation.suggestedAnnualCost / 12,
    date: new Date().toISOString().slice(0, 10),
  });
  const record = await orch.getRecord(sw.id);
  const matched = await fortnox.pollForNewSupplierInvoice({ switchRecord: record });
  printStep('markLive', await orch.markLive(sw.id, { firstInvoice: matched }));

  fortnox.__markPaid(DEMO.customer.fortnoxCustomerId, matched.id);
  printStep('markSuccessFeeDue', await orch.markSuccessFeeDue(sw.id, { paidInvoice: matched }));
  printStep('markCompleted',     await orch.markCompleted(sw.id, { stripeInvoiceId: 'in_demo_001' }));

  const final = await orch.getRecord(sw.id);
  console.error('\n=== FINAL HISTORY ===\n');
  for (const e of final.history) {
    console.error(`  ${e.timestamp}  ${(e.from ?? 'INIT').padEnd(20)} → ${e.to.padEnd(20)}  [${e.actor}]  ${e.note ?? ''}`);
  }
  console.error(`\nSuccess fee: ${final.context.successFee.amount.toLocaleString('sv-SE')} kr`);
  console.error(`Final state: ${final.state}`);
  console.error('');

  console.log(JSON.stringify({ id: sw.id, state: final.state, fullmakt: final.context.fullmakt, successFee: final.context.successFee }, null, 2));
}

async function showStatus(switchId) {
  const { orch } = makeOrchestrator();
  const status = await orch.getStatus(switchId);
  if (!status) {
    console.error(`No switch found with id ${switchId}`);
    process.exit(1);
  }
  console.log(JSON.stringify(status, null, 2));
}

async function listAll() {
  const { orch } = makeOrchestrator();
  const all = await orch.list();
  console.log(JSON.stringify(all, null, 2));
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  switch (cmd) {
    case 'demo':   return runDemo();
    case 'status': return showStatus(rest[0]);
    case 'list':   return listAll();
    default:
      console.error(`Orchestrator CLI

Användning:
  node agents/orchestrator/cli.js demo                 # kör hela lifecyclen
  node agents/orchestrator/cli.js status <switchId>    # visa state + senaste history
  node agents/orchestrator/cli.js list                 # lista alla switches
`);
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(`\n[Fel] ${err.message}`);
  if (err.cause) console.error(`Orsak: ${err.cause.message}`);
  process.exit(1);
});
