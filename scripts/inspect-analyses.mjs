// scripts/inspect-analyses.mjs — LÄS-BAR detaljgranskning av de senaste analyserna (kör i GH Actions).
// Syfte: efter ett ingest-test, se EXAKT vad pipelinen extraherade — fånga fel och utvärdera kvalitet.
// Inga skrivningar. Visar leverantör/kategori/belopp/besparing/väg + mail-källa (fingerprint mail:*).

import { getDb } from '../lib/db.js';

const N = Number(process.argv[2]) || 30;

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

// ── Ingest-kö (bulk): blev fakturorna köade, och drog drain-cronen dem? ──────────
const jobs = await db`
  SELECT status, COUNT(*)::int AS n, MAX(created_at) AS senast, MAX(error) AS ett_fel
  FROM ingest_jobs GROUP BY status ORDER BY status
`.catch((e) => { console.log('ingest_jobs: (tabell saknas ännu eller fel:', e.message, ')'); return null; });
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
  console.log(`   ${when}  ${(r.normalized_supplier||'?').slice(0,22).padEnd(22)} ${(r.category||'?').slice(0,16).padEnd(16)} ${String(r.annual_cost).padStart(8)} kr  email=${r.email||'(ingen)'}  fp=${r.fp}`);
}
console.log('═══════════════════════════════════════════════════\n');

const kr = (n) => (n == null ? '—' : Number(n).toLocaleString('sv-SE'));
const mailSourced = rows.filter((r) => String(r.fp).startsWith('mail:'));

console.log(`\n═══════ SENASTE ${rows.length} ANALYSER (av frågade ${N}) ═══════`);
console.log(`Mail-källade (fingerprint mail:*): ${mailSourced.length}`);
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
  const src  = String(r.fp).startsWith('mail:') ? '📧' : '🌐';
  console.log(`${src} ${when}  ${sup} ${cat} ${cost} kr/år  ${save}${flag}`);
}
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('Läs: 📧=mail-in · 🌐=webb · ⚠️=ej auto (kö/ej stödd) · "spar"=rekommenderat byte med nettogap');
