// scripts/score-leads.mjs
// Frozen Contract Scorer — identifierar bolag med föråldrade telekomavtal.
//
// Usage: node --env-file=.env scripts/score-leads.mjs leads.csv [--dry-run]
//
// CSV-format (rubrikrad krävs):
//   company_name,domain,org_nr,founded_year,employees,sni_code,contact_email
//
// Datakällor per bolag (gratis, manuellt via allabolag.se):
//   founded_year, employees, sni_code, org_nr
//   domain = bolagets e-postdomän (t.ex. foretaget.se)
//
// Env-variabler (valfria):
//   SECURITY_TRAILS_KEY — SecurityTrails API-nyckel (50 gratis queries/dag)
//                         Ger MX-historik med exakt datum. Hoppar över om saknas.
//
// Output:
//   • Rankad lista i terminalen med MX-plattform, datum och besparingsestimat
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

// ── Hjälpfunktioner ───────────────────────────────────────────────────────────

const SV_MONTHS = ['januari','februari','mars','april','maj','juni',
                   'juli','augusti','september','oktober','november','december'];

function swMonthYear(dateStr) {
  if (!dateStr) return null;
  const [y, m] = dateStr.split('-');
  return `${SV_MONTHS[parseInt(m) - 1]} ${y}`;
}

function monthsAgo(dateStr) {
  if (!dateStr) return 0;
  return Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24 * 30.44));
}

// ── MX-lookup — nuläge (gratis, Node.js inbyggd DNS) ─────────────────────────

async function getMxPlatform(domain) {
  if (!domain?.trim()) return 'unknown';
  try {
    const records = await dns.resolveMx(domain.trim());
    const hosts   = records.map(r => r.exchange.toLowerCase()).join(' ');
    if (hosts.includes('mail.protection.outlook.com'))             return 'microsoft365';
    if (hosts.includes('google.com') || hosts.includes('googlemail.com')) return 'google';
    if (hosts.includes('zoho.com'))                                return 'zoho';
    return 'other';
  } catch { return 'unknown'; }
}

// ── SecurityTrails — MX-historik (kräver API-nyckel, 50 gratis/dag) ──────────
//
// Ger oss "er Microsoft 365-konfiguration är oförändrad sedan november 2019"
// — det specifika faktum som gör emailen omöjlig att avfärda som mass-mail.

async function getMxSince(domain, mxPlatform, apiKey) {
  if (!apiKey || !domain?.trim() || !mxPlatform) return null;
  const platformHost = {
    microsoft365: 'mail.protection.outlook.com',
    google:       'google.com',
    zoho:         'zoho.com',
  }[mxPlatform];
  if (!platformHost) return null;
  try {
    const res = await fetch(
      `https://api.securitytrails.com/v1/history/${domain.trim()}/dns/mx`,
      { headers: { APIKEY: apiKey }, signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const { records } = await res.json();
    if (!records?.length) return null;
    const matching = records
      .filter(r => r.values?.some(v => v.value?.toLowerCase().includes(platformHost)))
      .sort((a, b) => a.first_seen.localeCompare(b.first_seen));
    return matching[0]?.first_seen ?? null; // 'YYYY-MM-DD'
  } catch { return null; }
}

// ── RDAP — domänregistreringsdatum (gratis, ingen API-nyckel) ─────────────────
//
// rdap.org är ARIN:s universella RDAP-router som delegerar till rätt
// registrar per TLD (.se → IIS, .com → Verisign, etc.)

async function getDomainRegistered(domain) {
  if (!domain?.trim()) return null;
  try {
    const res = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain.trim().toLowerCase())}`,
      { headers: { Accept: 'application/rdap+json' }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const reg  = data.events?.find(e => e.eventAction === 'registration');
    return reg?.eventDate?.slice(0, 10) ?? null; // 'YYYY-MM-DD'
  } catch { return null; }
}

// ── MX-plattform labels ───────────────────────────────────────────────────────

const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
  unknown:      'Okänd plattform',
};

// ── Frozen Contract Score (0–100) ─────────────────────────────────────────────

function calcFrozenScore({ foundedYear, employees, mxPlatform, sniCode }) {
  let score = 0;

  const age = THIS_YEAR - parseInt(foundedYear || 0);
  if      (age >= 8) score += 25;
  else if (age >= 6) score += 18;
  else if (age >= 4) score += 10;
  else               score += 2;

  const emp = parseInt(employees || 0);
  if      (emp >= 30 && emp <= 100) score += 25;
  else if (emp > 100)               score += 18;
  else if (emp >= 15)               score += 12;
  else                              score += 4;

  if      (mxPlatform === 'microsoft365') score += 30;
  else if (mxPlatform === 'google')       score += 22;
  else if (mxPlatform === 'zoho')         score += 15;
  else if (mxPlatform === 'other')        score += 10;

  const sni2 = parseInt((sniCode || '').slice(0, 2));
  if      ((sni2 >= 69 && sni2 <= 74) || (sni2 >= 62 && sni2 <= 63)) score += 20;
  else if (sni2 >= 41 && sni2 <= 43) score += 15;
  else if (sni2 >= 45 && sni2 <= 47) score += 15;
  else                                score += 8;

  return Math.min(score, 100);
}

// ── Besparingsestimat ─────────────────────────────────────────────────────────

function estimateSaving({ employees, mxPlatform }) {
  const emp    = Math.max(1, parseInt(employees || 0));
  const mobile = emp * 120 * 12;
  const sw     = mxPlatform === 'microsoft365' ? emp * 60 * 12 : 0;
  const total  = mobile + sw;
  return {
    mobile, software: sw, total,
    low:  Math.round(total * 0.80 / 1000) * 1000,
    high: Math.round(total * 1.20 / 1000) * 1000,
  };
}

function fmtKr(n) { return new Intl.NumberFormat('sv-SE').format(n); }

function priorityTag(score) {
  if (score >= 80) return '🔴 Hög';
  if (score >= 60) return '🟡 Medel';
  return '⚪ Låg';
}

// ── Main ──────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const csvFile = args.find(a => !a.startsWith('--'));
const dryRun  = args.includes('--dry-run');
const stKey   = process.env.SECURITY_TRAILS_KEY;

if (!csvFile) {
  console.error('Usage: node --env-file=.env scripts/score-leads.mjs leads.csv [--dry-run]');
  process.exit(1);
}

async function main() {
  console.log('\nArvo — Frozen Contract Scorer');
  console.log('══════════════════════════════');
  if (stKey) console.log('SecurityTrails: aktiv (MX-historik aktiverad)');
  else       console.log('SecurityTrails: ej konfigurerad (SECURITY_TRAILS_KEY saknas — kör utan historik)');
  console.log();

  let rows;
  try { rows = await readCsv(csvFile); }
  catch (err) { console.error(`Kunde inte läsa ${csvFile}: ${err.message}`); process.exit(1); }

  if (!rows.length) { console.log('Inga rader hittades.'); return; }
  console.log(`${rows.length} bolag laddade.\n`);

  const results = [];

  for (let i = 0; i < rows.length; i++) {
    const row  = rows[i];
    const name = row.company_name || '—';
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${rows.length}] ${name.padEnd(32)} `);

    // MX-plattform och domänålder parallellt, sedan SecurityTrails
    const [mxPlatform, domainRegistered] = await Promise.all([
      getMxPlatform(row.domain),
      getDomainRegistered(row.domain),
    ]);
    const mxSince  = await getMxSince(row.domain, mxPlatform, stKey);
    const mxMonths = monthsAgo(mxSince);

    const score  = calcFrozenScore({ foundedYear: row.founded_year, employees: row.employees, mxPlatform, sniCode: row.sni_code });
    const saving = estimateSaving({ employees: row.employees, mxPlatform });

    // Bygg informationsraden
    const dateLine = mxSince
      ? `  MX sedan: ${swMonthYear(mxSince)} (${mxMonths} mån)`
      : domainRegistered
        ? `  Domän: ${swMonthYear(domainRegistered)}`
        : '';
    console.log(`${MX_LABELS[mxPlatform].padEnd(20)} Score: ${String(score).padStart(3)}  ${priorityTag(score)}  ~${fmtKr(saving.low)}–${fmtKr(saving.high)} kr/år${dateLine}`);

    results.push({
      ...row,
      mx_platform:         mxPlatform,
      mx_label:            MX_LABELS[mxPlatform],
      mx_since:            mxSince,
      mx_since_label:      swMonthYear(mxSince),
      mx_months:           mxSince ? mxMonths : null,
      domain_registered:   domainRegistered,
      domain_reg_label:    swMonthYear(domainRegistered),
      frozen_score:        score,
      priority:            score >= 80 ? 'Hög' : score >= 60 ? 'Medel' : 'Låg',
      saving_low:          saving.low,
      saving_high:         saving.high,
      saving_mobile:       saving.mobile,
      saving_software:     saving.software,
    });
  }

  results.sort((a, b) => b.frozen_score - a.frozen_score);

  console.log('\n══════════════════════════════');
  console.log('PRIORITETSLISTA:\n');
  results.forEach((r, i) => {
    const email = r.contact_email ? '✉' : ' ';
    const intel = r.mx_since ? ` · MX sedan ${r.mx_since_label}` : '';
    console.log(`  ${String(i + 1).padStart(2)}. ${email} ${r.company_name.padEnd(32)} ${String(r.frozen_score).padStart(3)} pts  ${r.mx_label.padEnd(20)}${intel}`);
  });

  const high      = results.filter(r => r.frozen_score >= 80);
  const med       = results.filter(r => r.frozen_score >= 60 && r.frozen_score < 80);
  const withEmail = results.filter(r => r.contact_email && r.frozen_score >= 60);
  const withDates = results.filter(r => r.mx_since);

  console.log(`\nSammanfattning:`);
  console.log(`  Hög prioritet (≥80):     ${high.length} bolag`);
  console.log(`  Medel prioritet (60–79): ${med.length} bolag`);
  console.log(`  Redo för utskick:        ${withEmail.length} bolag (score ≥60 + e-post)`);
  console.log(`  Med MX-historik:         ${withDates.length} bolag (exakt datum i email)`);
  if (withEmail.length) {
    const lo = withEmail.reduce((s, r) => s + r.saving_low, 0);
    const hi = withEmail.reduce((s, r) => s + r.saving_high, 0);
    console.log(`  Samlad besparingspotential: ${fmtKr(lo)}–${fmtKr(hi)} kr/år`);
  }

  if (dryRun) { console.log('\nDRY-RUN — inga filer skrivna.'); return; }

  const date    = new Date().toISOString().slice(0, 10);
  const outDir  = join(__dirname, '..', 'results');
  await mkdir(outDir, { recursive: true });

  const outJson = join(outDir, `scored-${date}.json`);
  await writeFile(outJson, JSON.stringify({ date, stEnabled: !!stKey, count: results.length, results }, null, 2));

  const batchHeaders = 'company_name,sni_code,employees,contact_email,org_nr,founded_year,mx_platform,mx_since,domain_registered,frozen_score';
  const batchRows    = results
    .filter(r => r.frozen_score >= 60)
    .map(r => [
      r.company_name, r.sni_code || '', r.employees,
      r.contact_email || '', r.org_nr || '', r.founded_year || '',
      r.mx_platform, r.mx_since || '', r.domain_registered || '', r.frozen_score,
    ].map(v => (String(v).includes(',') ? `"${v}"` : v)).join(','));
  const outCsv = join(outDir, `scored-${date}.csv`);
  await writeFile(outCsv, [batchHeaders, ...batchRows].join('\n'));

  console.log(`\nFiler sparade:`);
  console.log(`  ${outJson}`);
  console.log(`  ${outCsv}  (${batchRows.length} bolag batch-redo)`);
  console.log(`\nNästa steg:`);
  console.log(`  node --env-file=.env scripts/batch-prospects.mjs results/scored-${date}.csv --no-email\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
