// scripts/probe-score-underlag.mjs — SÄGER SCOREN OCH DESS EGET UNDERLAG SAMMA SAK?
//
// BAKGRUNDEN (grundarens skärmdump 2026-08-19): en Microsoft-rad visade Arvo Score 92 och etiketten
// RÄTT PRISSATT — direkt ovanför sitt eget underlag, som sa "Ni ligger 184 % över det billigaste
// priset som går att köpa över disk". Två tal bredvid varandra som inte kan vara sanna samtidigt.
//
// Det är Helhetskravet: varje del kan vara sann om SIN del och osann om HELHETEN. Och underlaget
// gjorde sitt jobb — det var genom att göra scoren granskningsbar som motsägelsen blev synlig.
//
// SONDEN MÄTER, DEN GISSAR INTE. För varje lagrad analys räknar den om scoren ur SAMMA formel
// recommend.js använder, med de fält rummet faktiskt visar, och jämför mot det LAGRADE talet.
// Avviker de har vi två producenter av samma sanning — och vilken kunden ser beror på vilken kod
// som råkade köra. Det är LFL-obduktionens sjukdom, och den ska mätas i antal rader, inte anas.
//
// SONDKONTRAKTET (lib/sondkontrakt.js, efter sonden som ljög i sin egen etikett):
//   MÄTER:  avstånd mellan lagrat health_score och en omräkning ur lagrade fält, samt om score
//           och underlag pekar åt MOTSATT håll i kundytan (score ≥ 80 medan underlaget säger
//           "över golvet"). Det andra är det kunden faktiskt ser.
//   MÄTER INTE: om golvet är rätt PRODUKT för kundens licensnivå. En E3-kund jämförd mot Business
//           Standards golv ger ett formellt korrekt men sakligt missvisande avstånd — den luckan
//           är uttalad sedan tests/prisunderlag.mjs skrevs och kan inte mätas härifrån.
//
// Inga skrivningar. E-post maskeras (publikt repo).
import { getDb } from '../lib/db.js';
import { getPublicListBenchmark } from '../lib/benchmark.js';

const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }

const mask = (e) => (!e ? '—' : String(e).replace(/^(.{2}).*(@.*)$/, '$1***$2'));

// Exakt formeln ur recommend.js (regel 1: en sanning — kopian här är sondens hela poäng,
// för det är AVSTÅNDET mellan lagrat och omräknat vi mäter).
function raknaScore(kostnad, golv) {
  if (!(golv > 0) || !(kostnad > 0)) return null;
  const ratio = kostnad / golv;
  if (ratio <= 1.0) return Math.min(96, Math.round(88 + (1 - ratio) * 40));
  if (ratio <= 1.5) return Math.round(88 - (ratio - 1) * 96);
  return Math.max(15, Math.round(40 - (ratio - 1.5) * 30));
}

const rows = await db`
  SELECT id, created_at, user_email, supplier, normalized_supplier, category,
         annual_cost, seat_count, employees, health_score, should_switch, net_saving, route
  FROM invoice_analyses
  WHERE route = 'auto' AND annual_cost > 0
  ORDER BY created_at DESC
  LIMIT 200
`.catch((e) => { console.log('DB-fel:', e.message); return []; });

console.log(`\n═══ SCORE vs UNDERLAG · ${rows.length} auto-analyser ═══\n`);

let motsagelser = 0, avvikelser = 0, utanAnkare = 0, platsFel = 0;

for (const r of rows) {
  const seats = Number(r.seat_count) > 0 ? Number(r.seat_count) : null;
  const emps  = Number(r.employees)  > 0 ? Number(r.employees)  : null;

  // Underlaget (det kunden ser) använder ALLTID seat_count ur fakturan.
  const bmUnderlag = seats ? getPublicListBenchmark({ category: r.category, employees: seats }) : null;
  if (!bmUnderlag?.p25) { utanAnkare++; continue; }

  const kostnad   = Number(r.annual_cost);
  const perEnhet  = Math.round(kostnad / seats);
  const avstandPct = Math.round(((perEnhet - bmUnderlag.p25) / bmUnderlag.p25) * 100);

  // Scoren, omräknad med SAMMA enhetsmängd som underlaget delar på.
  const scoreMedSeats = raknaScore(kostnad, bmUnderlag.p25 * seats);
  // Och med anställda i stället — recommend.js faller tillbaka dit när seatCount saknas.
  const scoreMedEmps  = emps ? raknaScore(kostnad, bmUnderlag.p25 * emps) : null;

  const lagrat = r.health_score == null ? null : Number(r.health_score);
  const diff = lagrat != null && scoreMedSeats != null ? Math.abs(lagrat - scoreMedSeats) : null;

  // DET KUNDEN SER: ett högt score bredvid ett underlag som säger "över golvet".
  const motsager = lagrat != null && lagrat >= 80 && avstandPct > 15;
  if (motsager) motsagelser++;
  if (diff != null && diff > 3) avvikelser++;
  if (seats && emps && seats !== emps) platsFel++;

  if (motsager || (diff != null && diff > 3)) {
    console.log(
      `${motsager ? '‼ MOTSÄGER' : '  avviker '} ${(r.normalized_supplier || r.supplier || '?').slice(0, 22).padEnd(22)} ${String(r.category).slice(0, 18).padEnd(18)}\n` +
      `    kostnad ${kostnad.toLocaleString('sv-SE').padStart(9)} kr/år · platser(faktura) ${String(seats).padStart(4)} · anställda ${String(emps ?? '—').padStart(4)}\n` +
      `    per enhet ${String(perEnhet).padStart(6)} kr · golv ${String(bmUnderlag.p25).padStart(6)} kr (${bmUnderlag.referensProdukt ?? '?'}) · avstånd ${avstandPct > 0 ? '+' : ''}${avstandPct} %\n` +
      `    LAGRAT score ${String(lagrat ?? '—').padStart(3)} · omräknat m. platser ${String(scoreMedSeats).padStart(3)} · omräknat m. anställda ${String(scoreMedEmps ?? '—').padStart(3)}\n` +
      `    ${mask(r.user_email)} · ${new Date(r.created_at).toISOString().slice(0, 10)}\n`,
    );
  }
}

console.log('─'.repeat(70));
console.log(`rader utan ankare (ingen mätning möjlig): ${utanAnkare}`);
console.log(`rader där platser(faktura) ≠ anställda:   ${platsFel}`);
console.log(`rader där lagrat score ≠ omräknat (>3):   ${avvikelser}`);
console.log(`RADER DÄR SCORE MOTSÄGER SITT UNDERLAG:   ${motsagelser}   ← det kunden ser`);
console.log('─'.repeat(70));
