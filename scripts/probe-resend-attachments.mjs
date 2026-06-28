// scripts/probe-resend-attachments.mjs — VERIFIERAR Resends bilage-listning mot den riktiga maskinen.
// Frågan: är "bara 20 bilagor" ett HÅRT tak eller en opaginerad default? Och vilken form har varje
// bilage-objekt (finns ett id/download_url så vi kan hämta per styck, eller bara via listan)?
// Kör i GitHub Actions (har RESEND_API_KEY + DATABASE_URL). Lämnar inget åt slumpen.
import { getDb } from '../lib/db.js';

const key = process.env.RESEND_API_KEY;
const db = getDb();
if (!key) { console.log('RESEND_API_KEY saknas'); process.exit(0); }
if (!db)  { console.log('DATABASE_URL saknas'); process.exit(0); }

// 1) Hitta det bulk-mejl som har flest jobb (det grundaren laddade upp).
const emails = await db`
  SELECT email_id, COUNT(*)::int AS jobs,
         SUM((status='failed')::int)::int AS failed,
         SUM((status='done')::int)::int   AS done,
         MAX(created_at) AS senast
  FROM ingest_jobs GROUP BY email_id ORDER BY MAX(created_at) DESC LIMIT 5`;
console.log('═══════ BULK-MEJL I KÖN ═══════');
for (const e of emails) console.log(`   ${e.email_id}  jobb=${e.jobs} done=${e.done} failed=${e.failed}  ${new Date(e.senast).toISOString().slice(0,16)}`);
const target = emails.find((e) => e.failed > 0) ?? emails[0];
if (!target) { console.log('inget mejl i kön'); process.exit(0); }
const emailId = target.email_id;
console.log(`\n→ Proberar email_id=${emailId} (jobb=${target.jobs}, failed=${target.failed})\n`);

const base = 'https://api.resend.com/emails/receiving';
async function list(qs = '') {
  const r = await fetch(`${base}/${emailId}/attachments${qs}`, { headers: { Authorization: `Bearer ${key}` } });
  let j = null; try { j = await r.json(); } catch {}
  return { status: r.status, j };
}

// 2) Bas-listning: hur många returneras, vilka topnycklar (cursor/has_more?), vilken form per bilaga.
const b = await list('?limit=100');
const data = Array.isArray(b.j?.data) ? b.j.data : (Array.isArray(b.j) ? b.j : []);
console.log('═══════ BAS-LISTNING (limit=100) ═══════');
console.log(`   HTTP ${b.status} · antal=${data.length}`);
// Dumpa alla filnamn + distinkt-räkning (avslöjar om Resend listar dubbletter → dubbel-fetch-bug).
const names = data.map((a) => a.filename ?? '?');
const distinctNames = new Set(names);
const distinctUrls = new Set(data.map((a) => (a.download_url ?? '').split('?')[0]));
console.log(`   distinkta filnamn=${distinctNames.size} · distinkta download_url(bas)=${distinctUrls.size}`);
names.forEach((n, i) => console.log(`     [${String(i).padStart(2)}] ${n}`));
console.log(`   topnivå-nycklar: ${JSON.stringify(Object.keys(b.j ?? {}))}`);
console.log(`   bilage-objektets nycklar: ${JSON.stringify(Object.keys(data[0] ?? {}))}`);
if (data[0]) {
  const a = data[0];
  console.log(`   exempel: filename=${a.filename} content_type=${a.content_type} size=${a.size} har_id=${a.id != null} har_download_url=${a.download_url != null}`);
}

// 3) Paginerings-prober: ändrar limit/offset/after antalet? Finns has_more/next?
console.log('\n═══════ PAGINERINGS-PROBER ═══════');
for (const qs of ['?limit=100', '?limit=50', '?limit=100&offset=20', '?offset=20', '?limit=10']) {
  const p = await list(qs);
  const d = Array.isArray(p.j?.data) ? p.j.data : (Array.isArray(p.j) ? p.j : []);
  const more = p.j?.has_more ?? p.j?.hasMore ?? p.j?.next ?? p.j?.next_cursor ?? '(ingen)';
  console.log(`   "${qs}" → HTTP ${p.status} · antal=${d.length} · has_more/next=${JSON.stringify(more)}`);
}

// 4) Indexbevis: vilka attachment_index föll, och täcker listningen dem?
const failed = await db`SELECT attachment_index, filename FROM ingest_jobs WHERE email_id=${emailId} AND status='failed' ORDER BY attachment_index`;
console.log('\n═══════ FALLNA INDEX vs LISTNINGENS RÄCKVIDD ═══════');
console.log(`   listningen returnerar index 0..${data.length - 1}`);
for (const f of failed) console.log(`   idx=${f.attachment_index} (${f.filename}) — ${f.attachment_index < data.length ? 'TÄCKS (borde gå)' : 'UTANFÖR listningen → orsaken'}`);

// 5) Dedup-kontroll: hur många UNIKA innehåll (pdf_hash) gav de lyckade jobben?
try {
  const ded = await db`
    SELECT COUNT(*)::int AS analyser, COUNT(DISTINCT pdf_hash)::int AS unika_hash
    FROM invoice_analyses WHERE user_email = 'testyta@arvoflow.se'`;
  console.log('\n═══════ DEDUP-KONTROLL (testytan) ═══════');
  console.log(`   analyser=${ded[0].analyser} · unika pdf_hash=${ded[0].unika_hash}`);
} catch (e) { console.log('   (dedup-kontroll: ', e.message, ')'); }

console.log('\nKLART.');
