// agents/orchestrator/cron.js
// Periodic worker: reactivate every SCHEDULED_FUTURE switch whose
// reactivateAt has arrived. Run from your scheduler of choice — cron,
// Inngest, Temporal, vanilla setInterval. The function is idempotent
// (handleSigned/etc. all are too) so running it more often than needed
// is harmless.
//
// Two ways to use it:
//
//   1. As a function (preferred for programmatic schedulers):
//
//      import { runCron } from './agents/orchestrator/cron.js';
//      import { Orchestrator } from './agents/orchestrator/index.js';
//      const result = await runCron({ orchestrator: new Orchestrator() });
//
//   2. As a script:
//
//      node agents/orchestrator/cron.js
//      # Runs once. Schedule via your OS cron / GitHub Actions / etc.

import { Orchestrator } from './orchestrator.js';
import { findDueSwitches } from './state-machine.js';

/**
 * Find every SCHEDULED_FUTURE switch whose reactivateAt is in the past
 * and reactivate each one. Returns a structured summary so the caller
 * (your scheduler) can emit metrics.
 *
 * @param {object} [opts]
 * @param {Orchestrator} [opts.orchestrator]
 * @param {Date} [opts.asOfDate=new Date()]
 * @param {object} [opts.logger=console]
 * @returns {Promise<{
 *   asOfDate: string,
 *   totalActive: number,
 *   dueCount: number,
 *   reactivated: number,
 *   errors: Array<{ switchId: string, error: string }>,
 *   reactivatedIds: string[],
 * }>}
 */
export async function runCron(opts = {}) {
  const orch = opts.orchestrator ?? new Orchestrator();
  const asOfDate = opts.asOfDate ?? new Date();
  const logger = opts.logger ?? console;

  const all = await orch.list();
  const due = findDueSwitches(all, asOfDate);

  logger.info(
    `[cron] ${asOfDate.toISOString()}: ${due.length} due of ${all.length} total switches`
  );

  const reactivated = [];
  const errors = [];

  for (const summary of due) {
    try {
      const updated = await orch.reactivateScheduled(summary.id);
      reactivated.push(summary.id);
      logger.info(
        `[cron] Reactivated ${summary.id}: scheduled_future → ${updated.state}`
      );
    } catch (err) {
      errors.push({ switchId: summary.id, error: err.message });
      logger.error(`[cron] Failed to reactivate ${summary.id}: ${err.message}`);
    }
  }

  return {
    asOfDate: asOfDate.toISOString(),
    totalActive: all.length,
    dueCount: due.length,
    reactivated: reactivated.length,
    errors,
    reactivatedIds: reactivated,
  };
}

// CLI mode
const isMainModule =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('cron.js');

if (isMainModule) {
  runCron()
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.errors.length > 0 ? 1 : 0);
    })
    .catch((err) => {
      console.error(`[cron] fatal:`, err.message);
      if (err.cause) console.error(`Orsak:`, err.cause.message);
      process.exit(2);
    });
}
