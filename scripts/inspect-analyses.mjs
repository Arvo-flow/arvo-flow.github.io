// scripts/inspect-analyses.mjs — LÄS-BAR detaljgranskning av de senaste analyserna (kör i GH Actions).
// Syfte: efter ett ingest-test, se EXAKT vad pipelinen extraherade — fånga fel och utvärdera kvalitet.
// Inga skrivningar. Visar leverantör/kategori/belopp/besparing/väg + mail-källa (fingerprint mail:*).

import { getDb } from '../lib/db.js';

const N = Number(process.argv[2]) || 30;

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

// ── TESTYTAN (isolerad testidentitet): ingående granskning — per faktura + aggregat + flaggor ──
const TEST_EMAIL = 'testyta@arvoflow.se';
const testRows = await db`
  SELECT created_at, supplier, normalized_supplier, category, annual_cost, suggested_annual_cost,
         gross_saving, net_saving, should_switch, route, seat_count, price_per_seat_monthly
  FROM invoice_analyses WHERE user_email = ${TEST_EMAIL} ORDER BY created_at DESC
`.catch((e) => { console.log('testyta-fel:', e.message); return []; });

const kr0 = (n) => (n == null ? '—' : Number(n).toLocaleString('sv-SE'));

// ── ADRESSER MASKERAS I UTSKRIFTEN (2026-08-13) ──────────────────────────────────────────────
// Resultatet av den här granskningen COMMITTAS till repot (ops/inspect-result.txt) och Actions-
// loggen sparas. En kunds — eller grundarens egen — fullständiga e-postadress hörde aldrig hemma
// i någondera. Vi behöver kunna SKILJA avsändare åt för att felsöka, inte kunna läsa dem: två
// tecken plus domän räcker för det, och räcker inte för att peka ut en person i en logg.
const mask = (e) => {
  if (!e) return '(ingen)';
  const [lokal, dom] = String(e).split('@');
  if (!dom) return '***';
  return `${lokal.slice(0, 2)}***@${dom}`;
};
console.log(`\n═══════ TESTYTAN (${TEST_EMAIL}): ${testRows.length} analyser ═══════`);
console.log('   tid    leverantör                 kategori          årskostnad   →förslag    nettospar   flaggor');
let sumCost = 0, sumSave = 0, nSwitch = 0;
const catCount = {}, supSeen = {};
for (const r of testRows) {
  const when = new Date(r.created_at).toISOString().slice(11, 16);
  const flags = [];
  // Anomali-flaggor (extraktions-sanity):
  if (!r.supplier && !r.normalized_supplier) flags.push('SAKNAR-LEV');
  if (!r.category) flags.push('SAKNAR-KAT');
  if (r.route !== 'auto') flags.push(`väg=${r.route}`);
  if (r.annual_cost != null && r.annual_cost < 1000) flags.push('LÅG-KOSTN?(per mån?)');
  if (r.annual_cost != null && r.annual_cost > 5_000_000) flags.push('HÖG-KOSTN?');
  if (r.should_switch && !(r.net_saving > 0)) flags.push('BYTE-UTAN-SPAR');
  if (r.suggested_annual_cost != null && r.annual_cost != null && r.suggested_annual_cost > r.annual_cost) flags.push('FÖRSLAG>NUVARANDE!');
  if (r.net_saving > 0 && r.annual_cost > 0 && (r.net_saving / r.annual_cost) > 0.7) flags.push('SPAR>70%?');
  const key = `${(r.normalized_supplier||r.supplier||'?').toLowerCase()}|${r.category}`;
  if (supSeen[key]) flags.push('DUBBLETT-PAR'); else supSeen[key] = 1;
  sumCost += Number(r.annual_cost || 0); sumSave += Number(r.net_saving || 0);
  if (r.should_switch && r.net_saving > 0) nSwitch++;
  catCount[r.category || '?'] = (catCount[r.category || '?'] || 0) + 1;
  console.log(`   ${when}  ${(r.normalized_supplier||r.supplier||'?').slice(0,25).padEnd(25)} ${(r.category||'?').slice(0,16).padEnd(16)} ${kr0(r.annual_cost).padStart(10)}  ${kr0(r.suggested_annual_cost).padStart(9)}  ${(r.net_saving>0?kr0(r.net_saving):'—').padStart(9)}  ${flags.join(' ')}`);
}
console.log('   ─────────────────────────────────────────────────────────────────────────────');
console.log(`   AGGREGAT: ${testRows.length} fakturor · ${nSwitch} med byte · total årskostnad ${kr0(sumCost)} kr · total nettobesparing ${kr0(sumSave)} kr`);
console.log(`   Kategorier: ${Object.entries(catCount).map(([k,v])=>`${k}:${v}`).join(' · ')}`);
console.log('═══════════════════════════════════════════════════════\n');

// ── Ingest-kö (bulk): blev fakturorna köade, och drog drain-cronen dem? ──────────
const jobs = await db`
  SELECT status, COUNT(*)::int AS n, MAX(created_at) AS senast, MAX(error) AS ett_fel
  FROM ingest_jobs GROUP BY status ORDER BY status
`.catch((e) => { console.log('ingest_jobs: (tabell saknas ännu eller fel:', e.message, ')'); return null; });
// Misslyckade jobb i detalj — VILKA föll, vilket bilage-index och varför (t.ex. kredit-slut → HTTP 422,
// eller "PDF kunde inte hämtas" = Resend-listningen saknar det indexet). Felet loggas, aldrig tyst.
const failedJobs = await db`
  SELECT sender, filename, attachment_index, attempts, error, created_at
  FROM ingest_jobs WHERE status='failed' ORDER BY attachment_index ASC LIMIT 60
`.catch((e) => { console.log('   (failedJobs-query fel:', e.message, ')'); return []; });
if (failedJobs.length) {
  console.log('\n═══════ MISSLYCKADE JOBB (detalj) ═══════');
  for (const f of failedJobs) {
    console.log(`   idx=${String(f.attachment_index).padStart(2)}  ${(f.filename||'?').slice(0,36).padEnd(36)} försök=${f.attempts}  ${String(f.error||'').slice(0,50)}`);
  }
  console.log('═══════════════════════════════════════\n');
}

if (jobs) {
  console.log('\n═══════ INGEST-KÖ (ingest_jobs) ═══════');
  if (!jobs.length) console.log('   (kön är tom — inga bulk-jobb köade)');
  for (const r of jobs) console.log(`   ${String(r.status).padEnd(11)} ${r.n}   senast ${new Date(r.senast).toISOString().slice(0,16).replace('T',' ')}${r.ett_fel ? `   ⚠️ ${String(r.ett_fel).slice(0,80)}` : ''}`);
  console.log('═══════════════════════════════════════\n');
}

const rows = await db`
  SELECT id, created_at, route, normalized_supplier, supplier, category,
         annual_cost, suggested_annual_cost, gross_saving, net_saving,
         should_switch, seat_count,
         LEFT(fingerprint, 22) AS fp, NULLIF(user_email,'') AS email
  FROM invoice_analyses
  ORDER BY created_at DESC
  LIMIT ${N}
`.catch((e) => { console.log('FEL:', e.message); return []; });

// Analyser senaste 60 min (test-fönstret) — med e-post, för att se mail-in definitivt.
const recent = await db`
  SELECT created_at, route, normalized_supplier, category, annual_cost, net_saving,
         NULLIF(user_email,'') AS email, LEFT(fingerprint, 22) AS fp
  FROM invoice_analyses
  WHERE created_at > NOW() - INTERVAL '60 minutes'
  ORDER BY created_at DESC
`.catch(() => []);
console.log(`\n═══════ ANALYSER SENASTE 60 MIN (${recent.length}) ═══════`);
for (const r of recent) {
  const when = new Date(r.created_at).toISOString().slice(11, 16);
  console.log(`   ${when}  ${(r.normalized_supplier||'?').slice(0,22).padEnd(22)} ${(r.category||'?').slice(0,16).padEnd(16)} ${String(r.annual_cost).padStart(8)} kr  email=${mask(r.email)}  fp=${r.fp}`);
}
console.log('═══════════════════════════════════════════════════\n');

const kr = (n) => (n == null ? '—' : Number(n).toLocaleString('sv-SE'));
// OBS: fingerprinten lagras HASHAD → "mail:"-prefixet finns inte i DB. Mail-in känns igen på user_email
// (avsändaren sätts som user_email i drain/inbound). En registrerad webbkund kan också ha e-post, så
// detta är "med e-post" snarare än strikt mail-in — den exakta listan står i 60-min-sektionen ovan.
const withEmail = rows.filter((r) => r.email);

console.log(`\n═══════ SENASTE ${rows.length} ANALYSER (av frågade ${N}) ═══════`);
console.log(`Med e-post (mail-in eller registrerad): ${withEmail.length}`);
const byRoute = rows.reduce((m, r) => ((m[r.route] = (m[r.route] || 0) + 1), m), {});
console.log('Väg-fördelning:', JSON.stringify(byRoute));
console.log('───────────────────────────────────────────────────────────────');

for (const r of rows) {
  const when = new Date(r.created_at).toISOString().slice(0, 16).replace('T', ' ');
  const sup  = (r.normalized_supplier || r.supplier || '(okänd)').slice(0, 26).padEnd(26);
  const cat  = (r.category || '—').slice(0, 18).padEnd(18);
  const cost = kr(r.annual_cost).padStart(9);
  const save = r.net_saving > 0 ? `spar ${kr(r.net_saving)}` : (r.should_switch ? 'byte u. nettogap' : '—');
  const flag = r.route !== 'auto' ? `  ⚠️ ${r.route}` : '';
  const src  = r.email ? '📧' : '🌐';   // har e-post → sannolikt mail-in (fingerprint är hashad i DB)
  console.log(`${src} ${when}  ${sup} ${cat} ${cost} kr/år  ${save}${flag}`);
}
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('Läs: 📧=mail-in · 🌐=webb · ⚠️=ej auto (kö/ej stödd) · "spar"=rekommenderat byte med nettogap');

// ══ PRISBOKENS CELLER — VARFÖR KASTAS VARJE NY DATAPUNKT? (2026-09-10) ═══════════════════════
// Produktionsloggen: `outlier dropped — annualCost=272880 z=1028.99 mean=184663 stddev=86 n=24`.
// En standardavvikelse på 86 kr kring ett medelvärde på 184 663 kr är inte en fördelning — det är
// 24 näst intill identiska tal. Med ett så smalt spann blir VARJE nytt värde ett extremvärde, och
// 3σ-spärren stänger dörren hårdare ju mer data vi samlar.
//
// Innan vakten skrivs om måste det MÄTAS om felet sitter i vakten eller i datan: är de 24 punkterna
// dubbletter av samma faktura, eller är cellen genuint homogen? Ett aggregat utan sina fall är
// inget beslutsunderlag (bibeln, grindmätningen 22 aug).
// ── SCHEMAT FÖRE DATAN (2026-09-10) ────────────────────────────────────────────────────────
// Den fientliga granskaren bevisade att `pdf_hash` INTE fanns i produktionen medan koden som
// kräver den låg redo att mergas. Migreringens «success» bevisar inte att just den satsen körde —
// bara att skriptet inte kastade. Schemat läses därför direkt, före allt annat.
const schema = await db`
  SELECT
    (SELECT COUNT(*)::int FROM information_schema.columns
      WHERE table_name='invoice_datapoints' AND column_name='pdf_hash')        AS har_kolumn,
    (SELECT COUNT(*)::int FROM pg_indexes
      WHERE tablename='invoice_datapoints' AND indexname='idx_datapoints_dokument') AS har_index
`.catch((e) => { console.log('SCHEMAFRÅGAN FÖLL:', e.message); return []; });
const sk = schema[0] ?? {};
console.log('\n═══ DEDUP-SCHEMAT I PRODUKTION ═════════════════════════════════');
console.log(`  pdf_hash-kolumn:          ${sk.har_kolumn ? '✓ finns' : '✗ SAKNAS'}`);
console.log(`  idx_datapoints_dokument:  ${sk.har_index ? '✓ finns' : '✗ SAKNAS'}`);
if (!sk.har_kolumn || !sk.har_index) {
  console.log('  → KODEN FÅR INTE DEPLOYAS. Kör migrate-all.yml först — annars kastar dedup-INSERTen');
  console.log('    och varje ny datapunkt skrivs utan dedup (fail-open, AV-13) med SCHEMAFEL i loggen.');
}

console.log('\n═══ PRISBOKENS CELLER · spridning och dubbletter ═══════════════');
const celler = await db`
  SELECT category, industry, size_bucket,
         COUNT(*)::int                      AS n,
         COUNT(DISTINCT annual_cost)::int   AS unika,
         COUNT(DISTINCT supplier)::int      AS levarantorer,
         ROUND(AVG(annual_cost))::bigint    AS medel,
         ROUND(STDDEV(annual_cost))::bigint AS stdav,
         MIN(annual_cost)::bigint           AS lagst,
         MAX(annual_cost)::bigint           AS hogst
  FROM invoice_datapoints
  GROUP BY category, industry, size_bucket
  HAVING COUNT(*) >= 5
  ORDER BY COUNT(*) DESC
  LIMIT 15
`.catch((e) => { console.log('FEL:', e.message); return []; });

if (celler.length === 0) {
  console.log('(inga celler med ≥5 punkter — mätningen säger ingenting om spärren)');
} else {
  console.log('kategori/segment/band                n  unika  lev   medel      stdav    min→max');
  for (const c of celler) {
    const nyckel = `${c.category}·${c.industry}·${c.size_bucket}`.slice(0, 34).padEnd(34);
    const spann = `${Number(c.lagst).toLocaleString('sv-SE')}→${Number(c.hogst).toLocaleString('sv-SE')}`;
    console.log(`${nyckel} ${String(c.n).padStart(3)} ${String(c.unika).padStart(5)} `
      + `${String(c.levarantorer).padStart(4)}  ${String(Number(c.medel).toLocaleString('sv-SE')).padStart(9)}`
      + `  ${String(Number(c.stdav).toLocaleString('sv-SE')).padStart(7)}  ${spann}`);
  }
  console.log('\nLäs: unika ≪ n betyder dubbletter av samma belopp — då är det DATAN som är felet,');
  console.log('     inte spärren. unika ≈ n med litet stdav betyder en genuint homogen cell.');
}
