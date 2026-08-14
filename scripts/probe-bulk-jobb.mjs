// scripts/probe-bulk-jobb.mjs — VART TOG DEN TIONDE FAKTURAN VÄGEN?
//
// Grundaren skickade 10 fakturor. Kön rapporterar 'done'. invoice_analyses innehåller 9.
// Ett jobb som är FÄRDIGT utan att ha lämnat ett spår är den farligaste utfallsklassen vi har:
// den ser ut som framgång. Samma sjukdom som smygtystnaden i vakt_events och som villkorsvakten —
// ett grönt läge som inte betyder det man tror.
//
// Sonden svarar på tre frågor och gissar inte på någon:
//   1. Hur många jobb köades per avsändare, och i vilket sluttillstånd hamnade de?
//   2. Vilka FILNAMN köades — och vilka av dem saknar en analys?
//   3. Hur lång tid tog kön från köat till klart (bulk-vägens verkliga genomströmning)?
//
// Läser bara. Inga skrivningar, ingen retry — diagnosen först, åtgärden sedan.
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';

deklarera({
  namn: 'probe-bulk-jobb',
  fangar: 'Per avsändare: antal köade jobb, deras sluttillstånd, filnamn, försök, och vilka filnamn som saknar en analysrad. Samt kötid från skapat till uppdaterat.',
  blind: 'Sonden ser bara det som KÖADES. En PDF som aldrig blev ett jobb — för stor, feltypad, eller tappad av bilagelistningen hos Resend — lämnar inget spår här alls. Frånvaro i kön skiljer alltså inte "aldrig mottagen" från "aldrig köad", och den skillnaden måste läsas ur Vercel-loggen för inbound-email.',
});

// Maskerad utskrift: resultatet hamnar i ops/ och i en Actions-logg. Vi ska kunna SKILJA
// avsändare åt, inte läsa dem.
const mask = (e) => { const [l, d] = String(e || '').split('@'); return d ? `${l.slice(0, 2)}***@${d}` : '(ingen)'; };

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

const jobb = await db`
  SELECT sender, filename, status, attempts, attachment_index, created_at, updated_at
  FROM ingest_jobs
  WHERE created_at > NOW() - interval '24 hours'
  ORDER BY sender, attachment_index ASC
`.catch((e) => { console.log('ingest_jobs-fel:', e.message); return []; });

if (!jobb.length) { console.log('Inga jobb senaste dygnet.'); process.exit(0); }

const perSender = new Map();
for (const j of jobb) {
  if (!perSender.has(j.sender)) perSender.set(j.sender, []);
  perSender.get(j.sender).push(j);
}

for (const [sender, rader] of perSender) {
  const analyser = await db`
    SELECT supplier, normalized_supplier, category, annual_cost, route, created_at
    FROM invoice_analyses WHERE user_email = ${sender} ORDER BY created_at ASC
  `.catch(() => []);

  const status = rader.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
  const tider = rader
    .map((r) => (new Date(r.updated_at) - new Date(r.created_at)) / 1000)
    .filter((s) => Number.isFinite(s) && s >= 0).sort((a, b) => a - b);

  console.log(`\n═══════ ${mask(sender)} ═══════`);
  console.log(`  köade jobb: ${rader.length}   status: ${JSON.stringify(status)}`);
  console.log(`  analyser i invoice_analyses: ${analyser.length}`);
  const glapp = rader.length - analyser.length;
  console.log(`  GLAPP: ${glapp} ${glapp === 0 ? '✓' : '⛔ jobb utan analys — tyst förlust'}`);
  if (tider.length) {
    console.log(`  kötid: median ${tider[Math.floor(tider.length / 2)].toFixed(1)} s · längst ${tider.at(-1).toFixed(1)} s`);
  }
  console.log(`\n  idx  status    försök  filnamn`);
  for (const r of rader) {
    console.log(`  ${String(r.attachment_index).padStart(3)}  ${String(r.status).padEnd(9)} ${String(r.attempts).padStart(5)}  ${r.filename}`);
  }
  console.log(`\n  analyser som landade:`);
  for (const a of analyser) {
    console.log(`     ${(a.normalized_supplier || a.supplier || '?').slice(0, 26).padEnd(26)} ${(a.category || '—').padEnd(18)} ${a.annual_cost ?? '—'} kr  väg=${a.route}`);
  }
}

console.log('\n  Sonden ser bara det som KÖADES — se deklarationens blindfläck innan någon slutsats dras.');
