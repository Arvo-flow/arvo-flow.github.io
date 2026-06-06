// scripts/score-leads.mjs
// Frozen Contract Scorer — identifierar bolag med föråldrade telekomavtal.
//
// Usage: node scripts/score-leads.mjs leads.csv [--dry-run]
//
// CSV-format (rubrikrad krävs):
//   company_name,domain,org_nr,founded_year,employees,sni_code,contact_email
//
// Datakällor per bolag (gratis, manuellt):
//   • allabolag.se  → founded_year, employees, sni_code
//   • Bolagsverket  → org_nr
//   • Bolagets sajt → domain
//   MX-lookup görs automatiskt (Node.js dns — ingen API-nyckel behövs)
//
// Output:
//   • Rankad lista i terminalen
//   • results/scored-YYYY-MM-DD.json  (full data)
//   • results/scored-YYYY-MM-DD.csv   (batch-redo för score ≥ 60)

import { promises as dns } from 'dns';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const THIS_YEAR = new Date().getFullYear();

// ── CSV ───────────────────────────────────────────────────────────────────────

function parseCsvLine(line) {
  const parts = [];
  let cur = '', inQ = false;
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; }
    else if (ch === ',' && !inQ) { parts.push(cur.trim()); cur = ''; }
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
    rl.on('line', line => {
      if (!line.trim() || line.startsWith('#')) return;
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

// ── MX-lookup (gratis — Node.js inbyggd DNS) ──────────────────────────────────

async function getMxPlatform(domain) {
  if (!domain?.trim()) return 'unknown';
  try {
    const records = await dns.resolveMx(domain.trim());
    const hosts   = records.map(r => r.exchange.toLowerCase()).join(' ');
    if (hosts.includes('mail.protection.outlook.com'))          return 'microsoft365';
    if (hosts.includes('google.com') || hosts.includes('googlemail.com')) return 'google';
    if (hosts.includes('zoho.com'))                             return 'zoho';
    return 'other';
  } catch {
    return 'unknown';
  }
}

const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
  unknown:      'Okänd plattform',
};

// ── Frozen Contract Score (0–100) ─────────────────────────────────────────────
//
// Mäter sannolikheten att bolaget har ett föråldrat telekomavtal som
// aldrig omförhandlats sedan det tecknades i bolagets tidiga år.

function calcFrozenScore({ foundedYear, employees, mxPlatform, sniCode }) {
  let score = 0;

  // Bolagsålder — äldre = högre sannolikhet för fryst avtal
  const age = THIS_YEAR - parseInt(foundedYear || 0);
  if      (age >= 8) score += 25;
  else if (age >= 6) score += 18;
  else if (age >= 4) score += 10;
  else               score += 2;

  // Storlek — 20–100 anst. är söta punkten: tillräckligt stort för att
  // det ska kosta, tillräckligt litet för att sakna inköpsfunktion
  const emp = parseInt(employees || 0);
  if      (emp >= 30 && emp <= 100) score += 25;
  else if (emp > 100)               score += 18;
  else if (emp >= 15)               score += 12;
  else                              score += 4;

  // E-postplattform — verifierar att de kör en riktig företagsplattform
  // och ger oss ett konkret faktum om deras IT-miljö
  if      (mxPlatform === 'microsoft365') score += 30;
  else if (mxPlatform === 'google')       score += 22;
  else if (mxPlatform === 'zoho')         score += 15;
  else if (mxPlatform === 'other')        score += 10;

  // Bransch — tjänstesektorn har högst IT/telekomkostnad per anställd
  const sni2 = parseInt((sniCode || '').slice(0, 2));
  if      ((sni2 >= 69 && sni2 <= 74) || (sni2 >= 62 && sni2 <= 63)) score += 20;
  else if (sni2 >= 41 && sni2 <= 43) score += 15;
  else if (sni2 >= 45 && sni2 <= 47) score += 15;
  else                                score += 8;

  return Math.min(score, 100);
}

// ── Besparingsestimat ─────────────────────────────────────────────────────────
//
// Konservativa estimat baserade på offentliga priser:
//   Mobil:    120 kr/anst/mån i merkostnad vs. marknadsbästa (20% under typisk SMF-nota)
//   M365:     60 kr/anst/mån i merkostnad vs. Arvo-pris (listpris 255 kr, optimerat ~185 kr)

function estimateSaving({ employees, mxPlatform }) {
  const emp    = Math.max(1, parseInt(employees || 0));
  const mobile = emp * 120 * 12;
  const sw     = mxPlatform === 'microsoft365' ? emp * 60 * 12 : 0;
  const total  = mobile + sw;
  return {
    mobile,
    software: sw,
    total,
    low:  Math.round(total * 0.80 / 1000) * 1000,
    high: Math.round(total * 1.20 / 1000) * 1000,
  };
}

function fmtKr(n) {
  return new Intl.NumberFormat('sv-SE').format(n);
}

function priorityTag(score) {
  if (score >= 80) return '🔴 Hög';
  if (score >= 60) return '🟡 Medel';
  return '⚪ Låg';
}

// ── Main ──────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const csvFile = args.find(a => !a.startsWith('--'));
const dryRun  = args.includes('--dry-run');

if (!csvFile) {
  console.error('Usage: node scripts/score-leads.mjs leads.csv [--dry-run]');
  process.exit(1);
}

async function main() {
  console.log('\nArvo — Frozen Contract Scorer');
  console.log('══════════════════════════════\n');

  let rows;
  try {
    rows = await readCsv(csvFile);
  } catch (err) {
    console.error(`Kunde inte läsa ${csvFile}: ${err.message}`);
    process.exit(1);
  }

  if (!rows.length) { console.log('Inga rader hittades.'); return; }
  console.log(`${rows.length} bolag laddade. Kör MX-lookup...\n`);

  const results = [];

  for (let i = 0; i < rows.length; i++) {
    const row  = rows[i];
    const name = row.company_name || '—';
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${rows.length}] ${name.padEnd(35)} `);

    const mxPlatform = await getMxPlatform(row.domain);
    const score      = calcFrozenScore({
      foundedYear: row.founded_year,
      employees:   row.employees,
      mxPlatform,
      sniCode:     row.sni_code,
    });
    const saving = estimateSaving({ employees: row.employees, mxPlatform });

    console.log(`${MX_LABELS[mxPlatform].padEnd(22)} Score: ${String(score).padStart(3)}  ${priorityTag(score)}  ~${fmtKr(saving.low)}–${fmtKr(saving.high)} kr/år`);

    results.push({
      ...row,
      mx_platform:     mxPlatform,
      mx_label:        MX_LABELS[mxPlatform],
      frozen_score:    score,
      priority:        score >= 80 ? 'Hög' : score >= 60 ? 'Medel' : 'Låg',
      saving_low:      saving.low,
      saving_high:     saving.high,
      saving_mobile:   saving.mobile,
      saving_software: saving.software,
    });
  }

  results.sort((a, b) => b.frozen_score - a.frozen_score);

  console.log('\n══════════════════════════════');
  console.log('PRIORITETSLISTA (rankad efter Frozen Score):\n');
  results.forEach((r, i) => {
    const hasEmail = r.contact_email ? '✉' : ' ';
    console.log(`  ${String(i + 1).padStart(2)}. ${hasEmail} ${r.company_name.padEnd(35)} ${String(r.frozen_score).padStart(3)} pts   ${r.mx_label.padEnd(22)}  ${fmtKr(r.saving_low)}–${fmtKr(r.saving_high)} kr/år`);
  });

  const highPriority = results.filter(r => r.frozen_score >= 80);
  const medPriority  = results.filter(r => r.frozen_score >= 60 && r.frozen_score < 80);
  const withEmail    = results.filter(r => r.contact_email && r.frozen_score >= 60);

  console.log(`\nSammanfattning:`);
  console.log(`  Hög prioritet (≥80):    ${highPriority.length} bolag`);
  console.log(`  Medel prioritet (60–79): ${medPriority.length} bolag`);
  console.log(`  Redo för utskick:        ${withEmail.length} bolag (score ≥60 med e-post)`);
  if (withEmail.length) {
    const totalLow  = withEmail.reduce((s, r) => s + r.saving_low, 0);
    const totalHigh = withEmail.reduce((s, r) => s + r.saving_high, 0);
    console.log(`  Samlad besparingspotential: ${fmtKr(totalLow)}–${fmtKr(totalHigh)} kr/år`);
  }

  if (dryRun) { console.log('\nDRY-RUN — inga filer skrivna.'); return; }

  const date    = new Date().toISOString().slice(0, 10);
  const outDir  = join(__dirname, '..', 'results');
  const outJson = join(outDir, `scored-${date}.json`);
  const outCsv  = join(outDir, `scored-${date}.csv`);
  await mkdir(outDir, { recursive: true });

  await writeFile(outJson, JSON.stringify({ date, count: results.length, results }, null, 2));

  // batch-redo CSV (för batch-prospects.mjs), score ≥ 60
  const batchHeaders = 'company_name,sni_code,employees,contact_email,org_nr,founded_year,mx_platform,frozen_score';
  const batchRows    = results
    .filter(r => r.frozen_score >= 60)
    .map(r => [
      r.company_name, r.sni_code || '', r.employees,
      r.contact_email || '', r.org_nr || '',
      r.founded_year || '', r.mx_platform, r.frozen_score,
    ].map(v => (String(v).includes(',') ? `"${v}"` : v)).join(','));
  await writeFile(outCsv, [batchHeaders, ...batchRows].join('\n'));

  console.log(`\nFiler sparade:`);
  console.log(`  ${outJson}`);
  console.log(`  ${outCsv}  (${batchRows.length} bolag batch-redo)`);
  console.log('\nNästa steg: node scripts/batch-prospects.mjs results/scored-' + date + '.csv --no-email\n');
}

main().catch(err => { console.error(err); process.exit(1); });
