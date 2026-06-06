// scripts/score-leads.mjs
// Fynd-motor — Arvo letar inte efter "troliga" frysta avtal. Den letar efter
// VERIFIERBARA FAKTA om ett bolags leverantörsekonomi som bolaget självt känner
// igen som sant och inte väntade sig att en utomstående visste.
//
// Reframe (från estimat-rankare → fynd-motor):
//   • Varje bolag får findings[] — daterbara, publika fakta de kan kontrollera själva.
//   • Finding Score härleds ur fyndens OAVVISLIGHET, inte ur en gissad besparing.
//   • Samma signal kan dra upp ELLER ned frysnings-tesen (p=reject = vaket IT = svagare).
//   • Estimatet finns kvar — men som slutkläm, aldrig som krok.
//
// Usage: node --env-file=.env scripts/score-leads.mjs leads.csv [--dry-run]
//
// CSV-format (rubrikrad krävs):
//   company_name,domain,org_nr,founded_year,employees,sni_code,contact_email
//
// Fyndlager (gratis, rankade efter "hur visste de det"-kraft):
//   T1  Bolagets egna inlämnade siffror (årsredovisning) — STARKAST, ej kopplat än
//   T2  Kohort-deltat (leverantörsbyte i branschen) — moaten, ej byggt än
//   T3  Infrastruktur: DNS (MX/SPF/DMARC/DKIM/MTA-STS) + CT-loggar + RDAP-datum
//
// Miljö: DNS körs överallt. CT/RDAP (HTTP) kräver öppen egress → kör från Vercel.
//        Härifrån (allowlist) tystnar HTTP-lagren och faller tillbaka på DNS.
//
// Output:
//   • Rankad lista i terminalen — fynd först, score + wow-antal, estimat sist
//   • results/scored-YYYY-MM-DD.json  (full data inkl. findings[])
//   • results/scored-YYYY-MM-DD.csv   (batch-redo för wow-antal ≥ 1)

import { promises as dns } from 'dns';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getBenchmark } from '../agents/recommender/branchindex.js';

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

function fmtKr(n) { return new Intl.NumberFormat('sv-SE').format(n); }

const MX_LABELS = {
  microsoft365: 'Microsoft 365',
  google:       'Google Workspace',
  zoho:         'Zoho Mail',
  other:        'Anpassad e-postlösning',
  unknown:      'Okänd plattform',
};

// Kända mail-gateways — SPF som pekar hit är INTE felkonfig, det är en
// medveten säkerhetsleverantör framför e-posten (= vaket IT, drar ned tesen).
const MAIL_GATEWAYS = [
  ['mimecast',     'Mimecast'],
  ['barracuda',    'Barracuda'],
  ['pphosted',     'Proofpoint'],
  ['ppe-hosted',   'Proofpoint'],
  ['messagelabs',  'Symantec MessageLabs'],
  ['mailcontrol',  'Forcepoint'],
  ['antispamcloud','SpamExperts'],
  ['emailsrvr',    'Rackspace'],
  ['sdmarc',       'SPF/DMARC-hanteringstjänst'],
  ['dmarcian',     'dmarcian'],
  ['easydmarc',    'EasyDMARC'],
];

// Expandera en SPF-post rekursivt: följ redirect= OCH include: (max 2 nivåer,
// respekterar SPF:s 10-uppslagsgräns). Returnerar alla mekanismer + uppslagsantal.
async function expandSpf(domain, depth = 0, seen = new Set()) {
  if (depth > 2 || seen.has(domain)) return { mechanisms: [], lookups: 0 };
  seen.add(domain);
  let txts;
  try { txts = (await dns.resolveTxt(domain)).map(c => c.join('')); }
  catch { return { mechanisms: [], lookups: 0 }; }
  const spf = txts.find(t => t.toLowerCase().startsWith('v=spf1'));
  if (!spf) return { mechanisms: [], lookups: 0 };

  const tokens = spf.split(/\s+/).slice(1);
  let mechanisms = [...tokens];
  let lookups = 0;
  for (const tok of tokens) {
    if (/^[+\-~?]?(a|mx|ptr|exists)([:/]|$)/i.test(tok)) lookups++;
    const target = tok.match(/^[+\-~?]?include:(.+)/i)?.[1] ?? tok.match(/^redirect=(.+)/i)?.[1];
    if (target) {
      lookups++;
      const sub = await expandSpf(target, depth + 1, seen);
      mechanisms = mechanisms.concat(sub.mechanisms);
      lookups += sub.lookups;
    }
  }
  return { mechanisms, lookups };
}

// ── T3a · DNS-postur (gratis, körs överallt) ─────────────────────────────────
//
// En enda DNS-svep avslöjar hela e-poststacken OCH hur vaket bolagets IT är.
// MX = plattform · SPF = stack-komplexitet · DMARC = bevakning · MTA-STS = mognad.

async function getDnsPosture(domain) {
  const d = domain?.trim()?.toLowerCase();
  const p = { mx: 'unknown', spf: null, spfLookups: 0, spfM365: false,
              spfGateway: null, spfDelegated: false, spfMissing: false,
              dmarc: null, mtaSts: false, dkimM365: false };
  if (!d) return p;

  try {
    const recs  = (await dns.resolveMx(d)).map(r => r.exchange.toLowerCase());
    const hosts = recs.join(' ');
    if      (hosts.includes('mail.protection.outlook.com'))                 p.mx = 'microsoft365';
    else if (hosts.includes('google.com') || hosts.includes('googlemail')) p.mx = 'google';
    else if (hosts.includes('zoho'))                                        p.mx = 'zoho';
    else if (recs.length)                                                   p.mx = 'other';
  } catch {}

  try {
    const txts = (await dns.resolveTxt(d)).map(c => c.join(''));
    const spf  = txts.find(t => t.toLowerCase().startsWith('v=spf1'));
    if (spf) {
      p.spf = spf;
      // Full evaluering: följ redirect= och nästlade include: innan vi dömer.
      const { mechanisms, lookups } = await expandSpf(d);
      const all = mechanisms.join(' ').toLowerCase();
      p.spfLookups = lookups;
      p.spfM365    = all.includes('protection.outlook.com');
      p.spfGateway = MAIL_GATEWAYS.find(([m]) => all.includes(m))?.[1] ?? null;
      // redirect= utan igenkänd plattform = medvetet delegerad SPF (vaket IT),
      // INTE felkonfig. Det var precis det som tidigare flaggades fel.
      p.spfDelegated = /\bredirect=/i.test(spf) && !p.spfM365 && !p.spfGateway;
    } else {
      p.spfMissing = true;
    }
  } catch {}

  try {
    const txts = (await dns.resolveTxt(`_dmarc.${d}`)).map(c => c.join(''));
    const rec  = txts.find(t => t.toLowerCase().startsWith('v=dmarc1'));
    if (rec) p.dmarc = (rec.match(/p=(\w+)/i)?.[1] ?? 'unknown').toLowerCase();
  } catch {}

  try {
    const txts = (await dns.resolveTxt(`_mta-sts.${d}`)).map(c => c.join(''));
    p.mtaSts = txts.some(t => t.toLowerCase().startsWith('v=stsv1'));
  } catch {}

  try {
    const cname = await dns.resolveCname(`selector1._domainkey.${d}`);
    p.dkimM365  = cname.some(c => c.toLowerCase().includes('onmicrosoft.com'));
  } catch {}

  return p;
}

// ── T3b · RDAP — domänregistrering (HTTP, körs på Vercel) ─────────────────────

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
    return reg?.eventDate?.slice(0, 10) ?? null;
  } catch { return null; }
}

// ── T3c · Certificate Transparency — daterar M365-onboarding (HTTP, Vercel) ───
//
// crt.sh är en publik, append-only logg över varje TLS-cert. M365-onboarding
// lämnar fingeravtryck: autodiscover/enterpriseregistration/msoid-subdomäner får
// cert med exakt datum. Ger "samma infrastruktur sedan november 2017" — gratis,
// och ersätter SecurityTrails vi släppte för kostnad.

const M365_FINGERPRINTS = ['autodiscover', 'enterpriseregistration', 'msoid', 'lyncdiscover'];

async function getCtOnboarding(domain) {
  const d = domain?.trim()?.toLowerCase();
  if (!d) return null;
  try {
    const res = await fetch(
      `https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`,
      { headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        }, signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    if (!rows?.length) return null;

    let oldest = null, m365Since = null, m365Via = null;
    for (const r of rows) {
      const nb = r.not_before;
      if (nb && (!oldest || nb < oldest)) oldest = nb;
      const names = (r.name_value || '').toLowerCase().split('\n');
      for (const fp of M365_FINGERPRINTS) {
        if (names.some(n => n.startsWith(fp + '.')) && nb && (!m365Since || nb < m365Since)) {
          m365Since = nb; m365Via = fp;
        }
      }
    }
    return { oldestCert: oldest?.slice(0, 10) ?? null, m365Since: m365Since?.slice(0, 10) ?? null, m365Via };
  } catch { return null; }
}

// ── Fynd-motorn ───────────────────────────────────────────────────────────────
//
// Varje fynd: { tier, text, weight, wow }
//   weight — bidrag (±) till frysnings-tesen
//   wow    — klarar "hur visste de det"-baren? (specifikt, daterbart, oväntat)
//            Bara wow-fynd duger som krok i ett utskick.

function buildFindings({ row, posture, domainReg, ct }) {
  const f = [];
  const push = (tier, weight, wow, text) => f.push({ tier, weight, wow, text });

  // ── T3 · Microsoft 365-bekräftelse (styrkan = antal bekräftande lager) ──
  const m365Layers = [posture.mx === 'microsoft365', posture.spfM365, posture.dkimM365].filter(Boolean).length;
  if (posture.mx === 'microsoft365' && m365Layers >= 2)
    push('T3', 15, false, `Microsoft 365 bekräftat på ${m365Layers} nivåer (MX/SPF/DKIM) — inlåst e-poststack`);
  else if (posture.mx !== 'unknown')
    push('T3', posture.mx === 'microsoft365' ? 8 : 5, false, `E-post via ${MX_LABELS[posture.mx]}`);

  // ── T3 · Daterad infrastruktur (CT-logg starkast, RDAP fallback) ──
  if (ct?.m365Since) {
    const yrs = Math.floor(monthsAgo(ct.m365Since) / 12);
    push('T3', 18, true, `Microsoft 365 driftsatt ${swMonthYear(ct.m365Since)} enligt certifikatloggar — ${yrs} år utan plattformsbyte`);
  } else if (ct?.oldestCert) {
    push('T3', 8, true, `Digital närvaro sedan ${swMonthYear(ct.oldestCert)} (certifikatloggar)`);
  } else if (domainReg) {
    push('T3', 8, true, `Domän registrerad ${swMonthYear(domainReg)} — e-post på samma plattform sedan dess`);
  }

  // ── T3 · DMARC — det skarpaste DNS-fyndet, går åt båda håll ──
  if (posture.dmarc === null)
    push('T3', 20, true, `DMARC saknas helt — ingen bevakar vem som skickar mail i ert namn`);
  else if (posture.dmarc === 'none')
    push('T3', 18, true, `DMARC står kvar på p=none — uppsatt men aldrig aktiverat (klassiskt fryst-IT-tecken)`);
  else if (posture.dmarc === 'quarantine')
    push('T3', -5, false, `DMARC p=quarantine — halvvägs påkopplat IT`);
  else if (posture.dmarc === 'reject')
    push('T3', -15, false, `DMARC p=reject — IT aktivt påkopplat, svagare frysnings-tes`);

  // ── T3 · SPF — CFO-säker tolkning (följer redirect= och nästlade include:) ──
  // Vi utropar ALDRIG "felkonfig" utan att först ha följt hela SPF-kedjan.
  if (posture.spfGateway)
    push('T3', -8, false, `${posture.spfGateway} framför e-posten — etablerad säkerhetsleverantör, vaket IT`);
  else if (posture.spfDelegated)
    push('T3', -8, false, `SPF delegerad via redirect till hanteringstjänst — outsourcad e-postauth, vaket IT`);
  else if (posture.spfMissing && posture.mx === 'microsoft365')
    push('T3', 12, true, `Ingen SPF-post alls trots Microsoft 365 — e-postautentisering aldrig konfigurerad`);
  else if (posture.spfLookups >= 6)
    push('T3', 10, true, `SPF auktoriserar ${posture.spfLookups} uppslag att skicka i ert namn — påbyggd stack nära 10-gränsen`);

  // ── T3 · MTA-STS = modern → drar ned tesen ──
  if (posture.mtaSts)
    push('T3', -10, false, `MTA-STS aktiv — modern säkerhetsuppsättning, vaket IT`);

  // ── Kontext (ej wow, men styr frysnings-sannolikhet) ──
  const yr  = parseInt(row.founded_year || 0);
  const age = yr ? THIS_YEAR - yr : null;
  if      (age !== null && age >= 8) push('ctx', 15, false, `${age} år gammalt bolag — etablerade, sällan omförhandlade leverantörsavtal`);
  else if (age !== null && age >= 6) push('ctx', 10, false, `${age} år gammalt bolag`);
  else if (age !== null && age >= 4) push('ctx',  5, false, `${age} år gammalt bolag`);

  const emp = parseInt(row.employees || 0);
  if      (emp >= 30 && emp <= 100) push('ctx', 15, false, `${emp} anställda — telekomvolym i söta zonen 30–100`);
  else if (emp > 100)               push('ctx', 10, false, `${emp} anställda`);
  else if (emp >= 15)               push('ctx',  8, false, `${emp} anställda`);

  const sni2 = parseInt((row.sni_code || '').slice(0, 2));
  if ((sni2 >= 69 && sni2 <= 74) || (sni2 >= 62 && sni2 <= 63))
    push('ctx', 10, false, `Tjänstebransch (SNI ${sni2}) — hög mobil/mjukvarukostnad per anställd`);

  // Wow-fynd först, sedan tyngst — så kroken alltid hamnar överst.
  f.sort((a, b) => (b.wow - a.wow) || (Math.abs(b.weight) - Math.abs(a.weight)));
  return f;
}

function calcFindingScore(findings) {
  const raw = findings.reduce((s, f) => s + f.weight, 0);
  return Math.max(0, Math.min(100, raw));
}

// ── Benchmark-exponering — slutkläm, ej krok ──────────────────────────────────
//
// Ersätter fabricerat estimat (emp×120×12) med Arvos riktiga BRANCHINDEX —
// samma källverifierade prismotor som Recommender och fakturaanalysen använder.
// För prospekt (ingen faktura ännu) rapporterar vi ett SPANN, inte en påhittad
// besparing: p25 (välförhandlat) → median (vad marknaden faktiskt betalar).

function sniToIndustry(sni) {
  const n = parseInt(String(sni ?? '').slice(0, 2));
  if (n === 62 || n === 63 || n === 58) return 'it-tech';
  return 'konsult';
}

function benchmarkExposure({ employees, sniCode }) {
  const emp = Math.max(1, parseInt(employees || 0));
  const saas = getBenchmark({
    category: 'saas-productivity',
    industry: sniToIndustry(sniCode),
    employees: emp,
  });
  if (!saas) return null;
  return {
    perSeatLow:  saas.p25,
    perSeatHigh: saas.median,
    spendLow:    saas.p25 * emp,
    spendHigh:   saas.median * emp,
    premium:     (saas.median - saas.p25) * emp,  // frusen premie de troligen överbetalar
    source:      saas.source,
    alt:         saas.alternatives?.[0]?.supplier ?? null,
  };
}

function priorityTag(wow, score) {
  if (wow >= 2 && score >= 50) return '🔴 Stark krok';
  if (wow >= 1)               return '🟡 Krok finns';
  return '⚪ Ingen krok';
}

// ── Main ──────────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2);
const csvFile  = args.find(a => !a.startsWith('--'));
const dryRun   = args.includes('--dry-run');

if (!csvFile) {
  console.error('Usage: node --env-file=.env scripts/score-leads.mjs leads.csv [--dry-run]');
  process.exit(1);
}

async function main() {
  console.log('\nArvo — Fynd-motor');
  console.log('══════════════════════════════');
  console.log('Mål: ett verifierbart, oväntat fynd per bolag — inte ett estimat.\n');

  let rows;
  try { rows = await readCsv(csvFile); }
  catch (err) { console.error(`Kunde inte läsa ${csvFile}: ${err.message}`); process.exit(1); }

  if (!rows.length) { console.log('Inga rader hittades.'); return; }
  console.log(`${rows.length} bolag laddade.\n`);

  const results = [];
  let httpReached = false;

  for (let i = 0; i < rows.length; i++) {
    const row  = rows[i];
    const name = row.company_name || '—';
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${rows.length}] ${name.padEnd(40)} `);

    // DNS överallt; HTTP-lagren (CT/RDAP) tystnar bakom allowlist men körs på Vercel.
    const posture = await getDnsPosture(row.domain);
    const [domainReg, ct] = await Promise.all([
      getDomainRegistered(row.domain),
      getCtOnboarding(row.domain),
    ]);
    if (domainReg || ct) httpReached = true;

    const findings = buildFindings({ row, posture, domainReg, ct });
    const score    = calcFindingScore(findings);
    const wowCount  = findings.filter(f => f.wow).length;
    const exposure  = benchmarkExposure({ employees: row.employees, sniCode: row.sni_code });
    const topFinding = findings.find(f => f.wow)?.text ?? findings[0]?.text ?? '—';

    console.log(`Score:${String(score).padStart(3)}  ${String(wowCount)}× wow  ${priorityTag(wowCount, score)}`);

    results.push({
      ...row,
      mx_platform:    posture.mx,
      mx_label:       MX_LABELS[posture.mx],
      dmarc:          posture.dmarc ?? 'saknas',
      spf_lookups:    posture.spfLookups,
      spf_gateway:    posture.spfGateway,
      mta_sts:        posture.mtaSts,
      domain_registered: domainReg,
      ct_m365_since:  ct?.m365Since ?? null,
      finding_score:  score,
      wow_count:      wowCount,
      top_finding:    topFinding,
      findings,
      exposure,
    });
  }

  results.sort((a, b) => (b.wow_count - a.wow_count) || (b.finding_score - a.finding_score));

  // ── Fynd-rapport: kroken först, score + estimat som stöd ──
  console.log('\n══════════════════════════════');
  console.log('FYND-RAPPORT (rankad efter oavvislighet):\n');
  results.forEach((r, i) => {
    const email = r.contact_email ? '✉' : ' ';
    console.log(`${String(i + 1).padStart(2)}. ${email} ${r.company_name}  ·  Score ${r.finding_score}  ·  ${r.wow_count}× wow  ${priorityTag(r.wow_count, r.finding_score)}`);
    r.findings.filter(f => f.tier !== 'ctx').forEach(f => {
      console.log(`      ${f.wow ? '★' : '▸'} ${f.text}`);
    });
    if (r.exposure) {
      const e = r.exposure;
      console.log(`      └ slutkläm: M365-klass benchmark ${fmtKr(e.spendLow)}–${fmtKr(e.spendHigh)} kr/år (källa: ${e.source}, ${e.perSeatLow}–${e.perSeatHigh} kr/anv) · välförhandlat sparar ~${fmtKr(e.premium)} kr/år\n`);
    } else {
      console.log('');
    }
  });

  // ── "Hur visste de det"-porten ──
  const withWow = results.filter(r => r.wow_count >= 1);
  const strong  = results.filter(r => r.wow_count >= 2);
  console.log('══════════════════════════════');
  console.log('"HUR VISSTE DE DET"-PORTEN:\n');
  console.log(`  Bolag med ≥1 verifierbart wow-fynd:  ${withWow.length}/${results.length}  ← det enda tal som predikterar momentet`);
  console.log(`  Bolag med ≥2 wow-fynd (stark krok):  ${strong.length}/${results.length}`);
  if (!httpReached) {
    console.log(`\n  ⚠ HTTP-lagren (CT-datering, RDAP) tystnade — allowlist blockerar egress härifrån.`);
    console.log(`    Kör samma skript från Vercel för daterade infrastruktur-fynd ("M365 sedan 2017").`);
  }
  console.log(`\n  Nästa fyndlager för att nå full kraft:`);
  console.log(`    T1  Årsredovisnings-delta (allabolag) — "era externa kostnader/anställd steg X%" — STARKAST, ej kopplat`);
  console.log(`    T2  Kohort-deltat — "8 av 14 i er bransch bytte leverantör" — moaten, ej byggt`);

  if (dryRun) { console.log('\nDRY-RUN — inga filer skrivna.'); return; }

  const date   = new Date().toISOString().slice(0, 10);
  const outDir = join(__dirname, '..', 'results');
  await mkdir(outDir, { recursive: true });

  const outJson = join(outDir, `scored-${date}.json`);
  await writeFile(outJson, JSON.stringify({ date, count: results.length, httpReached, results }, null, 2));

  // Batch-redo = bolag vi faktiskt har en krok till (wow ≥ 1).
  const batchHeaders = 'company_name,sni_code,employees,contact_email,org_nr,founded_year,mx_platform,dmarc,finding_score,wow_count,top_finding';
  const batchRows = results
    .filter(r => r.wow_count >= 1)
    .map(r => [
      r.company_name, r.sni_code || '', r.employees, r.contact_email || '',
      r.org_nr || '', r.founded_year || '', r.mx_platform, r.dmarc,
      r.finding_score, r.wow_count, r.top_finding,
    ].map(v => (String(v).includes(',') ? `"${v}"` : v)).join(','));
  const outCsv = join(outDir, `scored-${date}.csv`);
  await writeFile(outCsv, [batchHeaders, ...batchRows].join('\n'));

  console.log(`\nFiler sparade:`);
  console.log(`  ${outJson}`);
  console.log(`  ${outCsv}  (${batchRows.length} bolag med krok — wow ≥ 1)`);
  console.log(`\nNästa steg:`);
  console.log(`  node --env-file=.env scripts/batch-prospects.mjs results/scored-${date}.csv --no-email\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
