#!/usr/bin/env node
// scripts/capture-snapshots.mjs
// Engångsscript: kör extract + categorize per PDF, beräknar metrics och
// sparar JSON-fixture i test-snapshots/. Kostar ett API-anrop per PDF.
//
// Användning:
//   node scripts/capture-snapshots.mjs                    # alla PDF:er utan befintlig fixture
//   node scripts/capture-snapshots.mjs vattenfall.pdf     # enskild fil (force)
//   node scripts/capture-snapshots.mjs --force            # skriv över befintliga

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env') });

const { extractInvoice, routeExtraction } = await import(join(ROOT, 'agents/test-invoice/extract.js'));
const { categorize } = await import(join(ROOT, 'agents/categorizer/index.js'));
const { computeInvoiceMetrics } = await import(join(ROOT, 'lib/invoice-metrics.js'));

const PDF_DIR      = join(ROOT, 'test-pdfs');
const SNAPSHOT_DIR = join(ROOT, 'test-snapshots');

const args  = process.argv.slice(2);
const force = args.includes('--force');
const fileArg = args.find((a) => !a.startsWith('--'));

// ── Befintliga fixtures ───────────────────────────────────────────────────────
function existingFixtureKeys() {
  return new Set(
    readdirSync(SNAPSHOT_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''))
  );
}

function slugify(filename) {
  return basename(filename, '.pdf')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── Hitta PDF:er att processa ─────────────────────────────────────────────────
let files = readdirSync(PDF_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));

if (fileArg) {
  const target = fileArg.endsWith('.pdf') ? fileArg : fileArg + '.pdf';
  files = files.filter((f) => f === target);
  if (files.length === 0) {
    console.error(`Hittade ingen PDF som matchar "${fileArg}" i test-pdfs/.`);
    process.exit(1);
  }
} else if (!force) {
  const existing = existingFixtureKeys();
  files = files.filter((f) => !existing.has(slugify(f)));
}

if (files.length === 0) {
  console.log('Alla PDF:er har redan fixtures. Använd --force för att skriva över.');
  process.exit(0);
}

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const GRN  = '\x1b[32m';
const RED  = '\x1b[31m';
const YEL  = '\x1b[33m';
const DIM  = '\x1b[2m';

console.log(`\n${BOLD}Arvo Flow — Snapshot Capture${R}`);
console.log(`Skapar fixtures för ${files.length} PDF${files.length !== 1 ? ':er' : ''}...\n`);

let ok = 0;
let fail = 0;

for (const file of files) {
  const slug = slugify(file);
  const outPath = join(SNAPSHOT_DIR, slug + '.json');
  const t0 = Date.now();

  process.stdout.write(`  ${file.padEnd(35)} `);

  try {
    const pdfBytes = readFileSync(join(PDF_DIR, file));

    // 1. Extract (Opus 4.7 — kostar)
    const extracted = await extractInvoice({ pdfBytes });
    const { route }  = routeExtraction(extracted);

    // 2. Categorize (Haiku — billigt)
    let category = 'okänd';
    if (route !== 'unsupported') {
      try {
        const cat = await categorize({
          supplier:    extracted.supplier ?? '',
          description: (extracted.lineItems ?? []).map((l) => l.description).join(', '),
          amount:      extracted.amount ?? 0,
        });
        category = cat.category ?? 'okänd';
      } catch {
        category = 'okänd';
      }
    }

    // 3. Compute metrics (deterministisk — gratis)
    const metrics = computeInvoiceMetrics(
      extracted.lineItems,
      category,
      extracted.potentialMixedCategories ?? false,
    );

    // 4. Bygg fixture
    const fixture = {
      _fixture:     slug,
      _description: `${extracted.supplier ?? file} — ${category}`,
      extracted,
      category,
      expected: {
        route,
        mobileAddonMonthly:      metrics.mobileAddonMonthly,
        broadbandAddonMonthly:   metrics.broadbandAddonMonthly,
        primaryComponentMonthly: metrics.primaryComponentMonthly,
      },
    };

    writeFileSync(outPath, JSON.stringify(fixture, null, 2) + '\n');

    const elapsed = Date.now() - t0;
    console.log(`${GRN}✓${R}  route=${BOLD}${route}${R}  cat=${YEL}${category}${R}  ${DIM}(${elapsed} ms)${R}`);
    ok++;
  } catch (err) {
    const elapsed = Date.now() - t0;
    console.log(`${RED}✗  ${err.message}${R}  ${DIM}(${elapsed} ms)${R}`);
    fail++;
  }
}

console.log(`\n${BOLD}Klart:${R} ${GRN}${ok} skapade${R}${fail > 0 ? `  ${RED}${fail} misslyckades${R}` : ''}\n`);
process.exit(fail > 0 ? 1 : 0);
