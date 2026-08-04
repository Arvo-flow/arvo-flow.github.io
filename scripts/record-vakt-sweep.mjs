// scripts/record-vakt-sweep.mjs — registrerar vaktens hjärtslag efter ett verkligt nattligt svep.
//
// Körs som ett ALLTID-steg i .github/workflows/price-monitor.yml (efter monitor-steget, oavsett
// utfall) — så även den tysta "allt lugnt"-natten lämnar ett bevis att maskinen var vaken.
// Läser price-monitor-rapporten och skriver EN vakt_events-rad med vad svepet faktiskt gjorde.
//
// Tyst tidig utgång är förbjuden (Resend-läxan, gäller all infrastruktur): varje return loggar skäl.

// FAIL-LOUD (grundarbeslut 2026-08-04): den här filen sa tidigare "kunde inte skriva … exit 0
// (ej blockerande)". Den meningen kostade oss TRETTON nätters minne 19–31 juli medan workflowen
// lyste grön. En vakt vars minne dör tyst är ingen vakt. Är databasen konfigurerad men vägrar
// skriva → exit 1, och GitHub Actions larmar samma natt. Saknas DATABASE_URL helt är det en
// okonfigurerad miljö, inte ett fel → exit 0.

import { readFileSync } from 'fs';
import { sweepSummaryFromReport, recordSweep, getLatestSweep } from '../lib/vakt.js';

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

// SJÄLVDIAGNOS: läs föregående svep FÖRE skrivningen. Kommer vakten tillbaka efter ett avbrott
// ska den säga hur länge den var borta — samma delta-logik som detectPriceAlert, riktad inåt.
const forra = await getLatestSweep().catch(() => null);

const status = await recordSweep(summary);

if (status === 'no-db') {
  console.log('[vakt] DATABASE_URL saknas — miljön är okonfigurerad, inget minne att skriva till. exit 0');
  process.exit(0);
}
if (status !== 'ok') {
  console.error(`[vakt] KUNDE INTE SKRIVA vakt_events (status: ${status}). Vakten svepte ${summary.sources} källor `
    + 'men förlorade minnet av natten. Det här är exakt smygtystnaden 19–31 juli — den får aldrig vara tyst igen.');
  process.exit(1);
}

if (forra?.sweptAt) {
  const dygn = Math.round((new Date(summary.sweptAt) - new Date(forra.sweptAt)) / 86400000);
  if (dygn > 1) {
    console.warn(`[vakt] AVBROTT UPPTÄCKT: ${dygn - 1} natt/nätter utan registrerat svep `
      + `(föregående ${forra.sweptAt}). Kedjan är nollställd och börjar om på 1.`);
  }
}

console.log(`[vakt] svep registrerat: ${summary.sources} källor · ${summary.pricePoints} prispunkter · ${summary.changes} avvikelser (${summary.sweptAt})`);
