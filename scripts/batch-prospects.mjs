// scripts/batch-prospects.mjs
// Creates outbound prospect briefings from a CSV file.
// Usage: node --env-file=.env scripts/batch-prospects.mjs leads.csv [options]
//
// Options:
//   --rate=N      Max emails per day (default: 20)
//   --dry-run     Validate CSV + estimate without creating or sending
//   --no-email    Create prospect tokens but do NOT send emails
//
// CSV format (header row required):
//   company_name,sni_code,employees,contact_email[,contact_name,org_nr]
//
// Output:
//   Console progress + results/batch-YYYY-MM-DD.json

import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── CLI args ──────────────────────────────────────────────────────────────────

const args      = process.argv.slice(2);
const csvFile   = args.find(a => !a.startsWith('--'));
const rate      = parseInt(args.find(a => a.startsWith('--rate='))?.split('=')[1] ?? '20', 10);
const dryRun    = args.includes('--dry-run');
const noEmail   = args.includes('--no-email');

if (!csvFile) {
  console.error('Usage: node scripts/batch-prospects.mjs leads.csv [--rate=20] [--dry-run] [--no-email]');
  process.exit(1);
}

const adminSecret = process.env.ARVO_ADMIN_SECRET;
if (!adminSecret && !dryRun) {
  console.error('ARVO_ADMIN_SECRET saknas i .env — kan inte skapa prospects');
  process.exit(1);
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BASE_URL ?? 'http://localhost:3000';

// ── Parse CSV ─────────────────────────────────────────────────────────────────

function parseCsvLine(line) {
  const parts = [];
  let cur = '';
  let inQuote = false;
  for (const ch of line) {
    if (ch === '"') { inQuote = !inQuote; }
    else if (ch === ',' && !inQuote) { parts.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  parts.push(cur.trim());
  return parts;
}

async function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    let headers = null;
    const rl = createInterface({ input: createReadStream(filePath), crlfDelay: Infinity });
    rl.on('line', (line) => {
      if (!line.trim()) return;
      const parts = parseCsvLine(line);
      if (!headers) { headers = parts.map(h => h.toLowerCase().replace(/\s+/g, '_')); return; }
      const row = {};
      headers.forEach((h, i) => { row[h] = parts[i] ?? ''; });
      rows.push(row);
    });
    rl.on('close', () => resolve(rows));
    rl.on('error', reject);
  });
}

// ── Validate a row ─────────────────────────────────────────────────────────────

function validateRow(row, i) {
  const errors = [];
  if (!row.company_name) errors.push('company_name saknas');
  const emp = parseInt(row.employees, 10);
  if (!emp || emp < 1) errors.push('employees måste vara ett heltal ≥ 1');
  if (row.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.contact_email)) {
    errors.push(`ogiltig e-post: ${row.contact_email}`);
  }
  return errors;
}

// ── Sleep helper ──────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\nArvo Batch Prospect Generator`);
  console.log(`══════════════════════════════`);
  console.log(`Fil:      ${csvFile}`);
  console.log(`Rate:     ${rate} mail/dag`);
  console.log(`Dry-run:  ${dryRun ? 'JA (inget skapas)' : 'nej'}`);
  console.log(`E-post:   ${noEmail || dryRun ? 'skickas INTE' : 'skickas'}`);
  console.log(`API:      ${baseUrl}\n`);

  // Read CSV
  let rows;
  try {
    rows = await readCsv(csvFile);
  } catch (err) {
    console.error(`Kunde inte läsa ${csvFile}: ${err.message}`);
    process.exit(1);
  }
  console.log(`Hittade ${rows.length} rader i CSV-filen\n`);

  // Validate all rows first
  const errors = [];
  rows.forEach((row, i) => {
    const rowErrors = validateRow(row, i);
    if (rowErrors.length) {
      errors.push(`Rad ${i + 2}: ${rowErrors.join(', ')}`);
    }
  });

  if (errors.length) {
    console.error('Valideringsfel — åtgärda dessa innan körning:');
    errors.forEach(e => console.error(`  ✗ ${e}`));
    if (!dryRun) process.exit(1);
  } else {
    console.log('✓ Alla rader validerade\n');
  }

  if (dryRun) {
    console.log('DRY-RUN — Uppskattning:');
    rows.forEach((row, i) => {
      const emp = parseInt(row.employees, 10);
      const sni = row.sni_code ?? row.sni ?? '';
      console.log(`  [${i + 1}] ${row.company_name} · SNI ${sni || '–'} · ${emp} anst. · ${row.contact_email || 'ingen mail'}`);
    });
    console.log(`\nSammanfattning: ${rows.length} prospects, ${rows.filter(r => r.contact_email).length} med e-post`);
    console.log(`Tidsåtgång vid ${rate}/dag: ${Math.ceil(rows.length / rate)} dag(ar)`);
    return;
  }

  // Process in batches of `rate` per day — delay between each to protect deliverability
  const delayMs = Math.ceil((24 * 60 * 60 * 1000) / rate); // spread evenly over 24h
  const SAFE_DELAY_MS = Math.max(delayMs, 3000); // min 3s between requests

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const emp = parseInt(row.employees, 10);

    process.stdout.write(`[${i + 1}/${rows.length}] ${row.company_name} (${emp} anst.) … `);

    try {
      const res = await fetch(`${baseUrl}/api/generate-prospect`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-arvo-admin': adminSecret,
        },
        body: JSON.stringify({
          companyName:      row.company_name,
          sniCode:          row.sni_code ?? row.sni ?? undefined,
          employees:        emp,
          contactEmail:     row.contact_email || undefined,
          orgNr:            row.org_nr ?? undefined,
          foundedYear:      row.founded_year || undefined,
          mxPlatform:       row.mx_platform || undefined,
          mxSince:          row.mx_since || undefined,
          domainRegistered: row.domain_registered || undefined,
          findings:         row.wow_findings ? row.wow_findings.split('|||').filter(Boolean) : undefined,
          createdBy:        'batch',
          sendEmail:        !noEmail && !!row.contact_email,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);

      console.log(`✓ ${json.url}${json.emailSent ? ' · mail skickat' : ''}`);
      results.push({ row: i + 1, company: row.company_name, ok: true, url: json.url, emailSent: json.emailSent });
      successCount++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      results.push({ row: i + 1, company: row.company_name, ok: false, error: err.message });
      errorCount++;
    }

    // Rate-limit delay (skip after last row)
    if (i < rows.length - 1) await sleep(SAFE_DELAY_MS);
  }

  // Write results log
  const date     = new Date().toISOString().slice(0, 10);
  const outDir   = join(__dirname, '..', 'results');
  const outFile  = join(outDir, `batch-${date}.json`);
  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, JSON.stringify({ date, rate, total: rows.length, successCount, errorCount, results }, null, 2));

  console.log(`\n══════════════════════════════`);
  console.log(`Klart: ${successCount} skapade · ${errorCount} fel`);
  console.log(`Resultat sparat: ${outFile}`);
}

main().catch(err => { console.error(err); process.exit(1); });
