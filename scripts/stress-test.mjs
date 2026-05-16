#!/usr/bin/env node
// scripts/stress-test.mjs
// Kör extract-steget mot alla PDF:er i test-pdfs/ och skriver ut en tydlig rapport.
// Testar INTE categorize/recommend — fokus är på klassificering och routing.
//
// Användning:
//   node scripts/stress-test.mjs              # alla PDF:er i test-pdfs/
//   node scripts/stress-test.mjs ricoh.pdf    # enskild fil

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');

// Ladda .env om den finns (ANTHROPIC_API_KEY)
dotenv.config({ path: join(ROOT, '.env') });

const { extractInvoice, routeExtraction } = await import(
  join(ROOT, 'agents/test-invoice/extract.js')
);

// ── Hjälpfunktioner ───────────────────────────────────────────────────────────

const SEK = (n) => (n == null ? '—' : `${n.toLocaleString('sv-SE')} kr`);
const PCT = (n) => (n == null ? '—' : `${(n * 100).toFixed(0)} %`);

const TYPE_LABEL = {
  recurring_subscription: 'Återkommande',
  variable_usage:         'Rörlig',
  one_time_fee:           'Engång',
  hardware:               'Hårdvara',
};

const ROUTE_COLOR = {
  auto:         '\x1b[32m',  // grön
  review_queue: '\x1b[33m',  // gul
  unsupported:  '\x1b[90m',  // grå
};
const RESET = '\x1b[0m';
const BOLD  = '\x1b[1m';
const DIM   = '\x1b[2m';
const RED   = '\x1b[31m';

function routeTag(route) {
  const color = ROUTE_COLOR[route] ?? '';
  return `${color}${BOLD}[${route.toUpperCase()}]${RESET}`;
}

function printResult(file, extracted, routing, elapsedMs) {
  const sep = '─'.repeat(64);
  console.log(`\n${sep}`);
  console.log(`${BOLD}${file}${RESET}  ${routeTag(routing.route)}  ${DIM}(${elapsedMs} ms)${RESET}`);
  console.log(sep);

  if (routing.route === 'unsupported') {
    console.log(`  Leverantör : ${extracted.supplier}`);
    console.log(`  outOfScope : true`);
    return;
  }

  console.log(`  Leverantör     : ${extracted.supplier}`);
  console.log(`  Datum          : ${extracted.date}`);
  console.log(`  Beskrivning    : ${extracted.description}`);
  console.log(`  Period         : ${extracted.billingPeriod}`);
  console.log(`  Confidence     : ${PCT(extracted.confidenceScore)}${extracted.confidenceNotes ? `  ${DIM}(${extracted.confidenceNotes})${RESET}` : ''}`);
  if (routing.route === 'review_queue') {
    console.log(`  ${ROUTE_COLOR.review_queue}Orsak          : ${routing.reason}${RESET}`);
  }

  console.log('');
  console.log(`  ${'RAD'.padEnd(40)} ${'TYP'.padEnd(22)} ${'BELOPP'.padStart(10)}`);
  console.log(`  ${'─'.repeat(76)}`);
  for (const item of extracted.lineItems ?? []) {
    const label = TYPE_LABEL[item.type] ?? item.type;
    const color = item.type === 'variable_usage' ? RED : '';
    console.log(`  ${color}${item.description.padEnd(40)} ${label.padEnd(22)} ${SEK(item.amount).padStart(10)}${RESET}`);
  }

  console.log('');
  console.log(`  Totalt faktura   : ${SEK(extracted.amount)}`);
  console.log(`  Återkommande     : ${SEK(extracted.recurringAmount)}`);
  if (extracted.variableCharges > 0)
    console.log(`  ${RED}Rörliga avgifter : ${SEK(extracted.variableCharges)}${RESET}`);
  if (extracted.oneTimeFees > 0)
    console.log(`  Engång/hårdvara  : ${SEK(extracted.oneTimeFees)}`);
  console.log(`  Beräknad årskostand : ${SEK(extracted.annualCost)}`);
  if (extracted.seatCount != null)
    console.log(`  Seats/licenser   : ${extracted.seatCount}`);
}

function printSummary(results) {
  const sep = '═'.repeat(64);
  console.log(`\n${sep}`);
  console.log(`${BOLD}SAMMANFATTNING${RESET}  (${results.length} faktura${results.length !== 1 ? 'r' : ''})`);
  console.log(sep);

  const counts = { auto: 0, review_queue: 0, unsupported: 0, error: 0 };
  for (const r of results) counts[r.route ?? 'error']++;

  console.log(`  ${ROUTE_COLOR.auto}${BOLD}auto${RESET}          : ${counts.auto}`);
  console.log(`  ${ROUTE_COLOR.review_queue}${BOLD}review_queue${RESET}  : ${counts.review_queue}`);
  console.log(`  ${ROUTE_COLOR.unsupported}${BOLD}unsupported${RESET}   : ${counts.unsupported}`);
  if (counts.error > 0)
    console.log(`  ${RED}${BOLD}error${RESET}         : ${counts.error}`);

  const failed = results.filter((r) => r.route === 'error');
  if (failed.length > 0) {
    console.log('');
    console.log(`${RED}Fel:${RESET}`);
    for (const r of failed)
      console.log(`  ${r.file}: ${r.error}`);
  }

  console.log('');
}

// ── Main ─────────────────────────────────────────────────────────────────────

const PDF_DIR = join(ROOT, 'test-pdfs');
const filter  = process.argv[2];

if (!existsSync(PDF_DIR)) {
  console.error(`Mappen test-pdfs/ saknas. Skapa den och lägg dit dina PDF:er.`);
  process.exit(1);
}

const files = readdirSync(PDF_DIR)
  .filter((f) => f.toLowerCase().endsWith('.pdf'))
  .filter((f) => !filter || f === filter || f === filter + '.pdf');

if (files.length === 0) {
  console.error(
    filter
      ? `Hittade ingen PDF som matchar "${filter}" i test-pdfs/.`
      : 'Inga PDF:er hittades i test-pdfs/. Lägg dit dina testfakturor.'
  );
  process.exit(1);
}

console.log(`\n${BOLD}Arvo Flow — Invoice Stress Test${RESET}`);
console.log(`Testar ${files.length} faktura${files.length !== 1 ? 'r' : ''} mot den semantiska extraktorn...\n`);

const results = [];

for (const file of files) {
  const pdfPath = join(PDF_DIR, file);
  const t0 = Date.now();
  try {
    const pdfBytes  = readFileSync(pdfPath);
    const extracted = await extractInvoice({ pdfBytes });
    const routing   = routeExtraction(extracted);
    const elapsed   = Date.now() - t0;
    printResult(file, extracted, routing, elapsed);
    results.push({ file, route: routing.route });
  } catch (err) {
    const elapsed = Date.now() - t0;
    console.log(`\n${'─'.repeat(64)}`);
    console.log(`${BOLD}${file}${RESET}  ${RED}${BOLD}[ERROR]${RESET}  ${DIM}(${elapsed} ms)${RESET}`);
    console.log(`  ${RED}${err.message}${RESET}`);
    results.push({ file, route: 'error', error: err.message });
  }
}

printSummary(results);
