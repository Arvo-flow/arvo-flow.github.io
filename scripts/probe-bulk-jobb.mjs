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
import { kravKolumner, aldrigTyst } from '../lib/sondvakt.js';

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

// Schemat läses FÖRE frågan. Den här sonden rapporterade en gång "Inga jobb senaste dygnet"
// därför att den frågade efter updated_at, som inte finns — ett SQL-fel förklätt till ett
// påstående om produktionen. Nu får man veta vilka kolumner som finns i stället för ett tomt svar.
await kravKolumner(db, 'ingest_jobs',
  ['sender', 'filename', 'status', 'attempts', 'attachment_index', 'error', 'created_at', 'done_at', 'outcome']);
const jobb = await aldrigTyst(db`
  SELECT sender, filename, status, attempts, attachment_index, error, outcome, created_at, claimed_at, done_at
  FROM ingest_jobs
  WHERE created_at > NOW() - interval '24 hours'
  ORDER BY sender, attachment_index ASC
`, 'läsning av ingest_jobs');

if (!jobb.length) { console.log('Inga jobb senaste dygnet.'); process.exit(0); }

const perSender = new Map();
for (const j of jobb) {
  if (!perSender.has(j.sender)) perSender.set(j.sender, []);
  perSender.get(j.sender).push(j);
}

for (const [sender, rader] of perSender) {
  // En DB-läsning som sväljs blir noll analyser — och noll analyser läses som DATAFÖRLUST.
  const analyser = await aldrigTyst(db`
    SELECT supplier, normalized_supplier, category, annual_cost, route, created_at
    FROM invoice_analyses WHERE user_email = ${sender} ORDER BY created_at ASC
  `, `läsning av invoice_analyses för en avsändare`);

  const status = rader.reduce((m, r) => ((m[r.status] = (m[r.status] || 0) + 1), m), {});
  const tider = rader
    .map((r) => (r.done_at ? (new Date(r.done_at) - new Date(r.created_at)) / 1000 : NaN))
    .filter((s) => Number.isFinite(s) && s >= 0).sort((a, b) => a - b);

  console.log(`\n═══════ ${mask(sender)} ═══════`);
  console.log(`  köade jobb: ${rader.length}   status: ${JSON.stringify(status)}`);
  console.log(`  analyser i invoice_analyses: ${analyser.length}`);
  const glapp = rader.length - analyser.length;
  console.log(`  GLAPP: ${glapp} ${glapp === 0 ? '✓' : '⛔ jobb utan analys — tyst förlust'}`);
  if (tider.length) {
    console.log(`  kötid: median ${tider[Math.floor(tider.length / 2)].toFixed(1)} s · längst ${tider.at(-1).toFixed(1)} s`);
  }
  console.log(`\n  idx  status    försök  filnamn                                   utfall / fel`);
  for (const r of rader) {
    console.log(`  ${String(r.attachment_index).padStart(3)}  ${String(r.status).padEnd(9)} ${String(r.attempts).padStart(5)}  ${String(r.filename).slice(0, 40).padEnd(40)}  ${r.error ? String(r.error).slice(0, 90) : (r.outcome ?? '(ingen dom bokförd)')}`);
  }
  // ── DELAR FELDOMÄNEN I TVÅ (2026-08-14) ──────────────────────────────────────────────────
  // Grundaren fick inget mejl med rumslänk. mintPortalLink SKRIVER en rad i magic_tokens innan
  // Resend anropas (note='inbound-email-reply'). Finns raden är länken skapad och felet ligger i
  // UTSKICKET eller LEVERANSEN; saknas den nådde koden aldrig dit. Utan Vercel-loggen är det här
  // den enda avläsning som skiljer de två — och skillnaden avgör vilken fix som är rätt.
  const tokens = await aldrigTyst(db`
    SELECT note, created_at, expires_at, used_at
    FROM magic_tokens WHERE email = ${sender} AND created_at > NOW() - interval '24 hours'
    ORDER BY created_at DESC
  `, 'läsning av magic_tokens');
  console.log(`\n  RUMSLÄNKAR (magic_tokens) senaste dygnet: ${tokens.length}`);
  for (const t of tokens) {
    console.log(`     ${new Date(t.created_at).toISOString().slice(11, 19)}  note=${t.note ?? '—'}  använd=${t.used_at ? 'ja' : 'nej'}`);
  }
  if (!tokens.length) console.log('     ⛔ ingen länk skapad — koden nådde aldrig mintPortalLink, eller den föll');
  else console.log('     ✓ länk(ar) skapade — felet ligger i utskicket eller leveransen, inte i länkbygget');

  console.log(`\n  analyser som landade:`);
  for (const a of analyser) {
    console.log(`     ${(a.normalized_supplier || a.supplier || '?').slice(0, 26).padEnd(26)} ${(a.category || '—').padEnd(18)} ${a.annual_cost ?? '—'} kr  väg=${a.route}`);
  }
}

console.log('\n  Sonden ser bara det som KÖADES — se deklarationens blindfläck innan någon slutsats dras.');
