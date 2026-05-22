#!/usr/bin/env node
// scripts/batch-import.mjs
// Steg 1 i Teach Loop: processerar en mapp med PDF-fakturor via extract + categorize.
// Sparar resultat i teach-loop/results.json — kostnad ett API-anrop per ny faktura.
//
// Användning:
//   node scripts/batch-import.mjs                       # bearbetar test-pdfs/
//   node scripts/batch-import.mjs ./mina-fakturor/      # annan mapp
//   node scripts/batch-import.mjs ./mapp/ --force       # kör om alla (ignorerar cache)

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env') });

const { extractInvoice, routeExtraction } = await import(join(ROOT, 'agents/test-invoice/extract.js'));
const { categorize } = await import(join(ROOT, 'agents/categorizer/index.js'));

const RESULTS_PATH = join(ROOT, 'teach-loop', 'results.json');

// ── CLI-argument ──────────────────────────────────────────────────────────────
const args  = process.argv.slice(2);
const force = args.includes('--force');
const folderArg = args.find((a) => !a.startsWith('--'));
const PDF_DIR = folderArg ? resolve(folderArg) : join(ROOT, 'test-pdfs');

if (!existsSync(PDF_DIR)) {
  console.error(`Mappen "${PDF_DIR}" finns inte.`);
  process.exit(1);
}

// ── Ladda eller skapa results.json ────────────────────────────────────────────
function loadResults() {
  if (existsSync(RESULTS_PATH)) {
    try { return JSON.parse(readFileSync(RESULTS_PATH, 'utf8')); } catch { /* fallthrough */ }
  }
  return { version: 1, invoices: [] };
}

function saveResults(data) {
  mkdirSync(join(ROOT, 'teach-loop'), { recursive: true });
  writeFileSync(RESULTS_PATH, JSON.stringify(data, null, 2) + '\n');
}

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const RED  = '\x1b[31m';
const GRY  = '\x1b[90m';

// ── Auto-approve-logik ────────────────────────────────────────────────────────
// unsupported → auto-godkänd (inget att granska)
// auto + confidence ≥ 0.90 → auto-godkänd
// auto + confidence 0.70–0.89 → flaggad (kräver review)
// review_queue → flaggad
// confidence < 0.70 → skipped (AI:n var för osäker)
function computeStatus(route, confidence) {
  if (route === 'unsupported') return 'approved';
  if (route === 'error')       return 'error';
  if ((confidence ?? 0) < 0.70) return 'skipped';
  if (route === 'review_queue') return 'flagged';
  if ((confidence ?? 0) >= 0.90) return 'approved';
  return 'flagged';
}

function statusTag(status) {
  const map = {
    approved: `${GRN}✓ auto-godkänd${R}`,
    flagged:  `${YEL}⚑ flaggad${R}`,
    skipped:  `${GRY}— skipped${R}`,
    error:    `${RED}✗ fel${R}`,
  };
  return map[status] ?? status;
}

// ── Huvud ─────────────────────────────────────────────────────────────────────
const data = loadResults();
const existingSlugs = new Set(data.invoices.map((i) => i.slug));

const files = readdirSync(PDF_DIR)
  .filter((f) => f.toLowerCase().endsWith('.pdf'));

const toProcess = force
  ? files
  : files.filter((f) => !existingSlugs.has(basename(f, '.pdf')));

console.log(`\n${BOLD}Arvo Flow — Batch Import${R}`);
console.log(`Mapp: ${PDF_DIR}`);
console.log(`${files.length} PDF:er hittade · ${toProcess.length} att processa · ${files.length - toProcess.length} redan i cache\n`);

if (toProcess.length === 0) {
  console.log(`Alla PDF:er är redan processade. Använd ${BOLD}--force${R} för att köra om.\n`);
  process.exit(0);
}

let approved = 0, flagged = 0, skipped = 0, errors = 0;

for (let i = 0; i < toProcess.length; i++) {
  const file = toProcess[i];
  const slug = basename(file, '.pdf');
  const pdfPath = join(PDF_DIR, file);
  const progress = `[${i + 1}/${toProcess.length}]`;
  const t0 = Date.now();

  process.stdout.write(`  ${DIM}${progress}${R} ${file.padEnd(38)} `);

  try {
    const pdfBytes = readFileSync(pdfPath);
    const extracted = await extractInvoice({ pdfBytes });
    const { route }  = routeExtraction(extracted);
    const confidence = extracted.confidenceScore ?? 0;

    let category = 'okänd';
    if (route !== 'unsupported') {
      try {
        const cat = await categorize({
          supplier:    extracted.supplier ?? '',
          description: (extracted.lineItems ?? []).map((l) => l.description).join(', '),
          amount:      extracted.amount ?? 0,
        });
        category = cat.category ?? 'okänd';
      } catch { /* keep okänd */ }
    }

    const status = computeStatus(route, confidence);
    const elapsed = Date.now() - t0;

    const entry = {
      file,
      slug,
      status,
      auto_approved: status === 'approved',
      confidence,
      route,
      category,
      processed_at: new Date().toISOString(),
      extracted,
      corrections: {},
    };

    // Ta bort eventuell tidigare post och lägg till ny
    data.invoices = data.invoices.filter((inv) => inv.slug !== slug);
    data.invoices.push(entry);
    saveResults(data); // spara löpande (crash-säkert)

    if (status === 'approved') approved++;
    else if (status === 'flagged') flagged++;
    else if (status === 'skipped') skipped++;

    console.log(`${statusTag(status)}  cat=${YEL}${category}${R}  conf=${(confidence * 100).toFixed(0)}%  ${DIM}(${elapsed} ms)${R}`);

  } catch (err) {
    errors++;
    const elapsed = Date.now() - t0;
    data.invoices = data.invoices.filter((inv) => inv.slug !== slug);
    data.invoices.push({ file, slug, status: 'error', error: err.message, processed_at: new Date().toISOString() });
    saveResults(data);
    console.log(`${RED}✗ ${err.message.slice(0, 60)}${R}  ${DIM}(${elapsed} ms)${R}`);
  }
}

// ── Sammanfattning ────────────────────────────────────────────────────────────
const total = approved + flagged + skipped + errors;
console.log(`\n${'─'.repeat(60)}`);
console.log(`${BOLD}Klart${R}  ${total} processerade`);
console.log(`  ${GRN}✓ ${approved} auto-godkända${R}  (confidence ≥ 0.90 eller unsupported)`);
if (flagged > 0)
  console.log(`  ${YEL}⚑ ${flagged} flaggade${R}   → kör ${BOLD}node scripts/review-cli.mjs${R} för att granska`);
if (skipped > 0)
  console.log(`  ${GRY}— ${skipped} skipped${R}    (confidence < 0.70, går till review_queue i produktion)`);
if (errors > 0)
  console.log(`  ${RED}✗ ${errors} fel${R}`);
if (flagged > 0)
  console.log(`\nNästa steg: ${BOLD}node scripts/review-cli.mjs${R}`);
else
  console.log(`\nNästa steg: ${BOLD}node scripts/build-fewshot.mjs${R}`);
console.log('');
