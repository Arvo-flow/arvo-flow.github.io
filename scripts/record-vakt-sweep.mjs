// scripts/record-vakt-sweep.mjs — registrerar vaktens hjärtslag efter ett verkligt nattligt svep.
//
// Körs som ett ALLTID-steg i .github/workflows/price-monitor.yml (efter monitor-steget, oavsett
// utfall) — så även den tysta "allt lugnt"-natten lämnar ett bevis att maskinen var vaken.
// Läser price-monitor-rapporten och skriver EN vakt_events-rad med vad svepet faktiskt gjorde.
//
// Tyst tidig utgång är förbjuden (Resend-läxan, gäller all infrastruktur): varje return loggar skäl.

import { readFileSync } from 'fs';
import { sweepSummaryFromReport, recordSweep } from '../lib/vakt.js';

const path = process.argv[2] ?? '/tmp/price-monitor-report.json';

let report;
try {
  report = JSON.parse(readFileSync(path, 'utf8'));
} catch (err) {
  console.log(`[vakt] ingen rapport att registrera (${path}): ${err.message} — hoppar över, exit 0`);
  process.exit(0);
}

const summary = sweepSummaryFromReport(report);
if (!summary) {
  console.log('[vakt] rapporten saknar svepta kontroller — inget hjärtslag att påstå, exit 0');
  process.exit(0);
}

const ok = await recordSweep(summary);
if (!ok) {
  console.log('[vakt] kunde inte skriva vakt_events (DB saknas/fel) — exit 0 (ej blockerande)');
  process.exit(0);
}

console.log(`[vakt] svep registrerat: ${summary.sources} källor · ${summary.pricePoints} prispunkter · ${summary.changes} avvikelser (${summary.sweptAt})`);
