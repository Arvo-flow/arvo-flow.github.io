// scripts/build-sni-kohort.mjs
// DNS Bransch-Kohort — bygger DMARC/MX-adoptionstakt per SNI-segment.
//
// Kör från GitHub Actions (HTTP fungerar):
//   node scripts/build-sni-kohort.mjs --sni 62,70,71,73 --limit 500
//
// Kör lokalt / sandbox (DNS fungerar, HTTP tystnar):
//   node scripts/build-sni-kohort.mjs --domains leads/kohort-domains.csv
//
// Output:
//   results/sni-kohort-YYYY-MM-DD.json   ← läses av score-leads.mjs
//   results/sni-kohort-YYYY-MM-DD.csv    ← debug / manuell granskning
//
// JSON-format per SNI:
//   { n, mx:{microsoft365,google,other}, dmarc:{reject_pct,quarantine_pct,none_pct,missing_pct},
//     paid_monitor_none_pct, generated_at }
//
// Kohort-index injiceras i buildFindings() via loadKohortIndex():
//   "34% av bolag i er bransch (SNI 62) har DMARC p=reject — ni är bland de 28% som
//    konfigurerat men aldrig aktiverat skyddet."
//
// Miljö: DNS körs överallt. HTTP (allabolag.se) kräver öppen egress → GitHub Actions.

import { promises as dns } from 'dns';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TODAY     = new Date().toISOString().slice(0, 10);

// ── Kända betald DMARC-bevaknings­tjänster ─────────────────────────────────────
const PAID_DMARC_SVCS = [
  'dmarcian.com', 'vali.email', 'dmarcanalyzer.com',
  'agari.com', '250ok.com', 'postmarkapp.com', 'returnpath.com',
];

// ── Allabolag.se — SNI-baserat domänuttag (kräver HTTP) ───────────────────────
//
// URL-schema: https://www.allabolag.se/branschsok?branschkod={SNI}&page={N}
// Sidan returnerar HTML med company-kort. Vi extraherar webbplats-fältet (href).
// Varje sida ≈ 20 bolag → limit 500 = 25 sidor.
//
// Fallback: om HTTP blockeras → tom array (score-leads kör utan kohort-kontext).

const ALLABOLAG_DELAY_MS = 1200; // respektera rate-limiting

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchPageDomains(sniCode, page) {
  try {
    const url = `https://www.allabolag.se/branschsok?branschkod=${encodeURIComponent(sniCode)}&page=${page}`;
    const res  = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ArvoResearch/1.0; +https://arvo-flow.se/bias)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'sv-SE,sv;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const html = await res.text();

    // Extrahera webbplats-URLer från company-kort
    // allabolag.se exponerar domäner via rel="noopener" externa länkar i company-cards
    const domainSet = new Set();
    const linkRe = /href="https?:\/\/(?:www\.)?([a-z0-9][-a-z0-9.]+\.[a-z]{2,})[/"]/gi;
    let m;
    while ((m = linkRe.exec(html)) !== null) {
      const d = m[1].toLowerCase().replace(/^www\./, '');
      // Filtrera bort allabolag.se självt + vanliga icke-bolagsdomäner
      if (!d.includes('allabolag') && !d.includes('google') &&
          !d.includes('facebook') && d.split('.').length <= 3) {
        domainSet.add(d);
      }
    }
    return [...domainSet];
  } catch {
    return [];  // HTTP blockerat eller timeout — tyst fallback
  }
}

async function fetchDomainsForSni(sniCode, limit = 500) {
  const domains = new Set();
  const pages   = Math.ceil(limit / 20);
  console.log(`  Hämtar domäner för SNI ${sniCode} (${pages} sidor, allabolag.se)…`);
  for (let p = 1; p <= pages && domains.size < limit; p++) {
    const found = await fetchPageDomains(sniCode, p);
    found.forEach(d => domains.add(d));
    process.stdout.write(`\r  SNI ${sniCode}: ${domains.size} domäner hittade (sida ${p}/${pages})  `);
    if (found.length === 0) break;  // inga fler sidor
    if (p < pages) await sleep(ALLABOLAG_DELAY_MS);
  }
  console.log('');
  return [...domains].slice(0, limit).map(d => ({ domain: d, sni_code: String(sniCode) }));
}

// ── CSV-läsare — fallback för sandbox / pre-fetchade domänlistor ──────────────
//
// Format: domain,sni_code[,company_name]
// Exempelfil: leads/kohort-domains.csv

async function readDomainsCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    let headers = null;
    const rl = createInterface({ input: createReadStream(filePath), crlfDelay: Infinity });
    rl.on('line', line => {
      if (!line.trim() || line.startsWith('#')) return;
      const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      if (!headers) { headers = parts.map(h => h.toLowerCase()); return; }
      const row = {};
      headers.forEach((h, i) => { row[h] = parts[i] ?? ''; });
      if (row.domain) rows.push(row);
    });
    rl.on('close', () => resolve(rows));
    rl.on('error', reject);
  });
}

// ── Snabb DNS-posturgranskning (DMARC + MX — utan full SPF-expansion) ─────────
//
// Håller svarstid nere för 500-domän-körning. Vi behöver bara adoptionstakt,
// inte djupanalysen. SPF-expansion är O(lookups) och görs bara i score-leads.mjs.

async function quickDnsCheck(domain) {
  const d = domain?.trim()?.toLowerCase();
  const r = { domain: d, mx: 'unknown', dmarc: null, dmarcRua: null };
  if (!d) return r;

  try {
    const recs  = (await dns.resolveMx(d)).map(x => x.exchange.toLowerCase());
    const hosts = recs.join(' ');
    if      (hosts.includes('mail.protection.outlook.com'))                 r.mx = 'microsoft365';
    else if (hosts.includes('google.com') || hosts.includes('googlemail')) r.mx = 'google';
    else if (hosts.includes('zoho'))                                        r.mx = 'zoho';
    else if (recs.length)                                                   r.mx = 'other';
    else                                                                    r.mx = 'none';
  } catch { r.mx = 'error'; }

  try {
    const txts = (await dns.resolveTxt(`_dmarc.${d}`)).map(c => c.join(''));
    const rec  = txts.find(t => t.toLowerCase().startsWith('v=dmarc1'));
    if (rec) {
      r.dmarc    = (rec.match(/p=(\w+)/i)?.[1] ?? 'unknown').toLowerCase();
      r.dmarcRua = rec.match(/rua=mailto:([^\s;,>]+)/i)?.[1] ?? null;
    }
  } catch {}

  return r;
}

// ── Aggregera kohort-statistik ────────────────────────────────────────────────

function buildCohortStats(checks) {
  const valid = checks.filter(c => c.mx !== 'error' && c.mx !== 'none');
  const n     = valid.length;
  if (n === 0) return null;

  const pct = (count) => Math.round((count / n) * 100);

  const mxCounts = { microsoft365: 0, google: 0, zoho: 0, other: 0 };
  const dmarcCounts = { reject: 0, quarantine: 0, none: 0, missing: 0 };
  let paidMonitorNone = 0;

  for (const c of valid) {
    if (c.mx in mxCounts) mxCounts[c.mx]++;
    else mxCounts.other++;

    if      (c.dmarc === 'reject')     dmarcCounts.reject++;
    else if (c.dmarc === 'quarantine') dmarcCounts.quarantine++;
    else if (c.dmarc === 'none')       dmarcCounts.none++;
    else                               dmarcCounts.missing++;

    if (c.dmarc === 'none' && PAID_DMARC_SVCS.some(s => c.dmarcRua?.includes(s))) {
      paidMonitorNone++;
    }
  }

  return {
    n,
    mx: {
      microsoft365: pct(mxCounts.microsoft365),
      google:       pct(mxCounts.google),
      zoho:         pct(mxCounts.zoho),
      other:        pct(mxCounts.other),
    },
    dmarc: {
      reject_pct:      pct(dmarcCounts.reject),
      quarantine_pct:  pct(dmarcCounts.quarantine),
      none_pct:        pct(dmarcCounts.none),
      missing_pct:     pct(dmarcCounts.missing),
    },
    paid_monitor_none_pct: pct(paidMonitorNone),
    generated_at: TODAY,
  };
}

// ── Concurrency-pool (ersätter p-limit utan extra dep) ────────────────────────

async function withConcurrency(items, fn, limit = 25) {
  const results = [];
  const queue   = [...items];
  let active    = 0;
  let idx       = 0;

  return new Promise((resolve, reject) => {
    function next() {
      while (active < limit && queue.length > 0) {
        const item = queue.shift();
        const i    = idx++;
        active++;
        fn(item, i).then(r => {
          results[i] = r;
          active--;
          if (queue.length === 0 && active === 0) resolve(results);
          else next();
        }).catch(reject);
      }
    }
    next();
    if (queue.length === 0) resolve([]);
  });
}

// ── CSV-output ────────────────────────────────────────────────────────────────

function toCsvRows(index) {
  const header = 'sni_code,n,ms365_pct,google_pct,dmarc_reject_pct,dmarc_none_pct,dmarc_missing_pct,paid_monitor_none_pct,generated_at';
  const rows = Object.entries(index).map(([sni, s]) =>
    `${sni},${s.n},${s.mx.microsoft365},${s.mx.google},${s.dmarc.reject_pct},${s.dmarc.none_pct},${s.dmarc.missing_pct},${s.paid_monitor_none_pct},${s.generated_at}`
  );
  return [header, ...rows].join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const args         = process.argv.slice(2);
const sniArg       = args.find(a => a.startsWith('--sni'))?.split('=')[1] ?? args[args.indexOf('--sni') + 1];
const domainsArg   = args.find(a => a.startsWith('--domains'))?.split('=')[1] ?? args[args.indexOf('--domains') + 1];
const limitArg     = parseInt(args.find(a => a.startsWith('--limit'))?.split('=')[1] ?? args[args.indexOf('--limit') + 1] ?? '500');
const concurrency  = parseInt(args.find(a => a.startsWith('--concurrency'))?.split('=')[1] ?? '25');

if (!sniArg && !domainsArg) {
  console.error([
    'Usage:',
    '  node scripts/build-sni-kohort.mjs --sni 62,70,71,73 [--limit 500] [--concurrency 25]',
    '  node scripts/build-sni-kohort.mjs --domains leads/kohort-domains.csv',
  ].join('\n'));
  process.exit(1);
}

async function main() {
  console.log('\nArvo — DNS Bransch-Kohort');
  console.log('════════════════════════════════════════');
  console.log('Bygger DMARC/MX-adoptionstakt per SNI-segment.\n');

  // ── 1. Samla domäner ──────────────────────────────────────────────────────
  let domainRows = [];

  if (domainsArg) {
    console.log(`Läser domäner från ${domainsArg}…`);
    domainRows = await readDomainsCsv(join(__dirname, '..', domainsArg));
    console.log(`  ${domainRows.length} domäner laddade.\n`);
  } else {
    const sniCodes = sniArg.split(',').map(s => s.trim()).filter(Boolean);
    for (const sni of sniCodes) {
      const rows = await fetchDomainsForSni(sni, limitArg);
      domainRows = domainRows.concat(rows);
    }
    console.log(`\nTotalt: ${domainRows.length} domäner att kontrollera.\n`);
  }

  if (!domainRows.length) {
    console.log('Inga domäner hittades. Avbryter.');
    process.exit(0);
  }

  // ── 2. DNS-kontroll med concurrency ──────────────────────────────────────
  let done = 0;
  const total = domainRows.length;
  console.log(`DNS-kontroll startar (concurrency=${concurrency})…`);

  const checks = await withConcurrency(domainRows, async (row) => {
    const result = await quickDnsCheck(row.domain);
    done++;
    if (done % 50 === 0 || done === total) {
      process.stdout.write(`\r  ${done}/${total} kontrollerade…`);
    }
    return { ...result, sni_code: row.sni_code };
  }, concurrency);

  console.log('\n');

  // ── 3. Aggregera per SNI ──────────────────────────────────────────────────
  const bySni = {};
  for (const c of checks) {
    if (!bySni[c.sni_code]) bySni[c.sni_code] = [];
    bySni[c.sni_code].push(c);
  }

  const index = {};
  for (const [sni, rows] of Object.entries(bySni)) {
    const stats = buildCohortStats(rows);
    if (stats) index[sni] = stats;
  }

  // ── 4. Rapport i terminalen ───────────────────────────────────────────────
  console.log('KOHORT-RAPPORT:\n');
  for (const [sni, s] of Object.entries(index)) {
    console.log(`SNI ${sni} (n=${s.n})`);
    console.log(`  MX:    M365 ${s.mx.microsoft365}% · Google ${s.mx.google}% · Övrigt ${s.mx.other}%`);
    console.log(`  DMARC: reject ${s.dmarc.reject_pct}% · none ${s.dmarc.none_pct}% · saknas ${s.dmarc.missing_pct}%`);
    if (s.paid_monitor_none_pct > 0)
      console.log(`  Betald bevakning + p=none: ${s.paid_monitor_none_pct}% — starkaste frysnings-signalen`);
    console.log('');
  }

  // ── 5. Spara output ───────────────────────────────────────────────────────
  const outDir = join(__dirname, '..', 'results');
  await mkdir(outDir, { recursive: true });

  const jsonPath = join(outDir, `sni-kohort-${TODAY}.json`);
  const csvPath  = join(outDir, `sni-kohort-${TODAY}.csv`);

  await writeFile(jsonPath, JSON.stringify(index, null, 2), 'utf8');
  await writeFile(csvPath,  toCsvRows(index),               'utf8');

  console.log(`Sparat: ${jsonPath}`);
  console.log(`Sparat: ${csvPath}`);
  console.log('\nKlart. Ladda om score-leads.mjs för att se "X av Y i er bransch" i findings[].');
}

main().catch(err => { console.error(err); process.exit(1); });
