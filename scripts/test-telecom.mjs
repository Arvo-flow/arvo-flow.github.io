#!/usr/bin/env node
// scripts/test-telecom.mjs
// Full pipeline test (extract → categorize → recommend) för mobil- och bredbandsfakturor.
// Validerar: seatCount, connectionSpeedMbit, avtalslås, benchmark-tier-val.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
dotenv.config({ path: join(ROOT, '.env') });

const { extractInvoice, routeExtraction } = await import(join(ROOT, 'agents/test-invoice/extract.js'));
const { categorize }                       = await import(join(ROOT, 'agents/categorizer/categorize.js'));
const { recommend }                        = await import(join(ROOT, 'agents/recommender/recommend.js'));

const BOLD  = '\x1b[1m';
const DIM   = '\x1b[2m';
const GREEN = '\x1b[32m';
const YELLOW= '\x1b[33m';
const RED   = '\x1b[31m';
const CYAN  = '\x1b[36m';
const RESET = '\x1b[0m';

const SEK = (n) => n == null ? '—' : `${Math.round(n).toLocaleString('sv-SE')} kr`;
const PCT = (n) => n == null ? '—' : `${(n * 100).toFixed(0)} %`;

const FILES = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : ['telia.pdf', 'connectsverige.pdf'];

const CUSTOMER = { industry: 'byraer', employees: 15 };

for (const file of FILES) {
  const pdfPath = join(ROOT, 'test-pdfs', file);
  if (!existsSync(pdfPath)) {
    console.log(`\n${RED}Hoppar ${file} — filen saknas.${RESET}`);
    continue;
  }

  console.log(`\n${'═'.repeat(68)}`);
  console.log(`${BOLD}${CYAN}${file}${RESET}  (${CUSTOMER.industry}, ${CUSTOMER.employees} anst.)`);
  console.log('═'.repeat(68));

  const pdfBytes = readFileSync(pdfPath);
  const t0 = Date.now();

  // ── 1. Extract ──────────────────────────────────────────────────────────
  let extracted;
  try {
    extracted = await extractInvoice({ pdfBytes });
  } catch (err) {
    console.log(`${RED}Extract-fel: ${err.message}${RESET}`);
    continue;
  }
  const extractMs = Date.now() - t0;

  console.log(`\n${BOLD}EXTRACT${RESET}  (${extractMs} ms)`);
  console.log(`  Leverantör     : ${extracted.supplier}`);
  console.log(`  Datum          : ${extracted.date}`);
  console.log(`  Beskrivning    : ${extracted.description}`);
  console.log(`  Confidence     : ${PCT(extracted.confidenceScore)}`);
  console.log(`  Seats/SIM      : ${extracted.seatCount ?? '—'}`);
  console.log(`  Hastighet      : ${extracted.connectionSpeedMbit != null ? `${extracted.connectionSpeedMbit} Mbit/s` : '—'}`);
  console.log(`  Avtalsslutt    : ${extracted.servicePeriodEnd ?? '—'}`);
  console.log(`  Uppsägningstid : ${extracted.cancellationNoticeDays != null ? `${extracted.cancellationNoticeDays} dagar` : '—'}`);
  console.log(`  Mobil-tillägg  : ${extracted.mobileAddonMonthly != null ? `${SEK(extracted.mobileAddonMonthly)}/mån` : '—'}`);
  console.log(`  Återkommande   : ${SEK(extracted.recurringAmount)}/mån`);
  console.log(`  Beräknad årskostand: ${SEK(extracted.annualCost)}`);

  const routing = routeExtraction(extracted);
  if (routing.route !== 'auto') {
    console.log(`\n${YELLOW}Route: ${routing.route}${routing.reason ? ` — ${routing.reason}` : ''}${RESET}`);
    continue;
  }

  // ── 2. Categorize ───────────────────────────────────────────────────────
  const t1 = Date.now();
  let categorized;
  try {
    categorized = await categorize({
      supplier:    extracted.supplier,
      amount:      extracted.amount,
      date:        extracted.date,
      account:     extracted.account,
      description: extracted.description,
      recurring:   extracted.recurring,
    });
  } catch (err) {
    console.log(`${RED}Categorize-fel: ${err.message}${RESET}`);
    continue;
  }
  const categorizeMs = Date.now() - t1;

  console.log(`\n${BOLD}CATEGORIZE${RESET}  (${categorizeMs} ms)`);
  console.log(`  Kategori       : ${categorized.category}`);
  console.log(`  Leverantör     : ${categorized.normalizedSupplier}`);
  console.log(`  Confidence     : ${categorized.confidence}`);
  console.log(`  Reasoning      : ${DIM}${(categorized.reasoning ?? '').slice(0, 120)}${RESET}`);

  // Avtalslås-check (speglar logiken i api/test-invoice.mjs)
  const today      = new Date();
  const periodEnd  = extracted.servicePeriodEnd ? new Date(extracted.servicePeriodEnd) : null;
  const hasActive  = periodEnd && periodEnd > today;
  const lockDeadline = (() => {
    if (!extracted.servicePeriodStart || extracted.cancellationNoticeDays == null) return null;
    const d = new Date(extracted.servicePeriodStart);
    d.setDate(d.getDate() - extracted.cancellationNoticeDays);
    return d;
  })();
  const isPastLock = lockDeadline ? today > lockDeadline : hasActive;

  if (!categorized.licensePending && hasActive && isPastLock) {
    console.log(`\n${YELLOW}${BOLD}→ MONITORING-ROUTE (avtalslås)${RESET}`);
    const monDate = new Date(periodEnd);
    monDate.setDate(monDate.getDate() - 90);
    console.log(`  Avtal löper till : ${periodEnd.toLocaleDateString('sv-SE')}`);
    console.log(`  Påminnelsedatum  : ${monDate.toLocaleDateString('sv-SE')}`);
    continue;
  }

  // ── 3. Recommend ────────────────────────────────────────────────────────
  const t2 = Date.now();
  let rec;
  try {
    rec = await recommend({
      customer: { ...CUSTOMER },
      invoice: {
        amount:              extracted.amount,
        annualCost:          extracted.annualCost,
        recurringAmount:     extracted.recurringAmount,
        variableCharges:     extracted.variableCharges,
        seatCount:           extracted.seatCount ?? null,
        mobileAddonMonthly:  extracted.mobileAddonMonthly ?? null,
        connectionSpeedMbit: extracted.connectionSpeedMbit ?? null,
      },
      categorized,
    });
  } catch (err) {
    console.log(`${RED}Recommend-fel: ${err.message}${RESET}`);
    continue;
  }
  const recommendMs = Date.now() - t2;

  const switchColor = rec.shouldSwitch ? GREEN : YELLOW;
  console.log(`\n${BOLD}RECOMMEND${RESET}  (${recommendMs} ms)`);
  console.log(`  shouldSwitch     : ${switchColor}${BOLD}${rec.shouldSwitch}${RESET}`);
  console.log(`  Föreslagen lev.  : ${rec.suggestedSupplier ?? '—'}`);
  console.log(`  Föreslagen årskostand: ${SEK(rec.suggestedAnnualCost)}`);
  console.log(`  Bruttobesparing  : ${SEK(rec.grossSaving ?? rec.savingPerYear)}`);
  console.log(`  Nettobesparing   : ${SEK(rec.netSaving ?? (rec.grossSaving ? Math.round(rec.grossSaving * 0.80) : null))}`);
  if (rec.licenseOverage > 0)
    console.log(`  ${YELLOW}SIM-överskott    : ${rec.licenseOverage} oanvända SIM${RESET}`);
  if (rec.overageSavings > 0)
    console.log(`  Överskottsbesparing: ${SEK(rec.overageSavings)}`);
  console.log(`  Confidence       : ${rec.confidence}`);
  console.log(`  Reasoning        : ${DIM}${(rec.reasoning ?? '').slice(0, 200)}...${RESET}`);
  console.log(`  Totaltid         : ${Date.now() - t0} ms`);
}

console.log(`\n${'═'.repeat(68)}`);
