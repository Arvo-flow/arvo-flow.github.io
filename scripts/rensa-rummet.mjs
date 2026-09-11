// scripts/rensa-rummet.mjs — RENSA ETT RUM I SKARPA MILJÖN, PÅ GRUNDARENS BEGÄRAN.
//
// ══ VARFÖR DEN HÄR FILEN SER UT SOM DEN GÖR (2026-09-09) ═══════════════════════════════════
// Grundaren ska skicka in 25 fakturor via mejl och vill läsa utfallet i ett RENT rum, i den
// skarpa miljön. En radering är oåterkallelig och hör till grundaren (bibeln, 21 aug) — den är
// alltså beställd, inte påhittad. Men den ska ändå vara omöjlig att rikta fel.
//
// ── ADRESSEN STÅR ALDRIG I REPOT ──────────────────────────────────────────────────────────
// Repot är PUBLIKT och Actions-loggen likaså. Skriptet bär därför bara en sha256-summa av adressen,
// letar upp den matchande raden i databasen och maskerar den i varje utskrift. En e-postadress
// i en publik logg är en läcka som inte går att ta tillbaka — samma klass som fakturatexten
// FK-13 stängde.
//
// ── TRE SPÄRRAR SOM AVBRYTER, för att en felriktad radering ska vara osannolik ────────────
// (Ingen svit bevakar dem — det här är ett engångsskript, inte en mekanism i lib/. Beviset
//  är att torrläget körs FÖRST och att utfallet läses, aldrig ett grönt test.)   // pastaende-ok: engångsskript utan svit, skälet står på raden
//   1. EXAKT EN träff på summan. Noll → avbryt (adressen finns inte). Fler än en → avbryt
//      (två adresser kan inte ha samma hash utan att något är fel med matchningen).
//   2. TAKET. Fler än `TAK` rader → avbryt. Ett rum har tiotals rader; hundratals betyder att
//      frågan träffat något annat än det jag tror. Hellre stanna än radera brett.
//   3. TORRKÖRNING SOM DEFAULT. Utan `RENSA_SKARPT=1` mäts allt och raderas ingenting.
//
// ── VAD SOM ARKIVERAS, VAD SOM RADERAS, OCH VAD SOM MEDVETET INTE RÖRS ───────────────────
// ⚠️ ÄNDRAT 2026-09-11 (grundarbeslut): analyser ARKIVERAS, de raderas aldrig.
// ARKIVERAS (`arkiverad_at = NOW()` — försvinner ur kundens rum, består som proveniens):
//   · `invoice_analyses WHERE user_email = <adressen>`  — rummets innehåll
// RADERAS (kötillstånd, aldrig bevis — ett avbetat jobb bevisar ingenting om marknaden):
//   · `ingest_jobs WHERE sender = <adressen>`           — köade/misslyckade jobb
//
// RADERAS INTE, med skäl:
//   · `invoice_datapoints` — anonymiserade och kopplade till ingen adress. Mail-in skriver
//     dem dessutom aldrig: `api/inbound-email.mjs` skickar `segmentOkant: true` och
//     `storeDatapoint` vägrar då skriva (fixen 21 aug). Testfakturorna når alltså aldrig
//     prisboken, och att rensa moaten är ett eget beslut — inte en bieffekt av att tömma ett rum.
//   · `gate_emails` — kopplingen fingerprint → adress som ROUTAR prislarm. Raderas den slutar
//     kunden få larm, vilket är en tyst funktionsförlust, inte en rensning.
//   · `magic_tokens` — inloggningen till rummet. Raderas den blir kontorslänken död.
//
// ── UTTALAD GRÄNS, VIKTIG FÖRE KÖRNINGEN ──────────────────────────────────────────────────
// Rummet slår ihop TVÅ historiker: den e-postnycklade (`getAnalysesByEmail`) och den
// fingerprint-nycklade (webbläsaren). Det här skriptet rensar bara den FÖRSTA — rader som
// laddats upp via `/testa-faktura` i en webbläsare bär ofta `user_email = NULL` och överlever.
// De syns fortfarande om rummet öppnas i samma webbläsare. Skriptet MÄTER hur många sådana
// rader som finns, så att glappet är ett tal och inte en överraskning.

import { getDb } from '../lib/db.js';
import { createHash } from 'node:crypto';

const ADRESS_SUMMA = '0f1f6d64c551221024f5b073d25e767355ad8d99cbce3095dafb49f8cdb2e3f8';
const TAK = 200;
const SKARPT = process.env.RENSA_SKARPT === '1';

/** `m***@g***.com` — nog för att känna igen rätt rum, aldrig nog för att läcka adressen. */
const mask = (e) => {
  const [lokal, domän = ''] = String(e).split('@');
  const d = domän.split('.');
  return `${lokal.slice(0, 1)}***@${(d[0] ?? '').slice(0, 1)}***.${d.slice(1).join('.')}`;
};
const sha = (s) => createHash('sha256').update(String(s)).digest('hex');

const db = getDb();
if (!db) {
  console.error('✗ Ingen databas. Skriptet mäter och raderar ingenting utan DATABASE_URL.');
  process.exit(1);
}

console.log(`\n═══ RENSA RUM — ${SKARPT ? 'SKARPT LÄGE' : 'TORRKÖRNING (raderar inget)'} ═══\n`);

// ── SPÄRR 1: exakt en adress matchar summan ───────────────────────────────────────────────
const adresser = await db`SELECT DISTINCT user_email FROM invoice_analyses WHERE user_email IS NOT NULL`;
const traffar = adresser.map((r) => r.user_email).filter((e) => sha(e) === ADRESS_SUMMA);
console.log(`Adresser i invoice_analyses: ${adresser.length}  ·  matchar summan: ${traffar.length}`);
if (traffar.length !== 1) {
  console.error(`✗ AVBRYTER: förväntade exakt 1 träff, fick ${traffar.length}. `
    + (traffar.length === 0
      ? 'Adressen finns inte i tabellen — rummet är redan tomt, eller så är summan fel.'
      : 'Flera adresser matchar samma summa, vilket inte kan stämma.'));
  process.exit(traffar.length === 0 ? 0 : 1);
}
const EPOST = traffar[0];
console.log(`Rum: ${mask(EPOST)}\n`);

// ── MÄT FÖRE: inventeringen loggas ALLTID, även när vi sedan raderar ───────────────────────
const analyser = await db`
  SELECT category, route, COUNT(*)::int AS n, MIN(created_at) AS forsta, MAX(created_at) AS senaste
  FROM invoice_analyses WHERE user_email = ${EPOST} GROUP BY category, route ORDER BY n DESC`;
const totalt = analyser.reduce((s, r) => s + r.n, 0);
console.log(`── ANALYSER I RUMMET: ${totalt} ──`);
for (const r of analyser) {
  console.log(`  ${String(r.n).padStart(3)} × ${String(r.category ?? '(ingen)').padEnd(22)} `
    + `route=${String(r.route ?? '-').padEnd(14)} ${new Date(r.forsta).toISOString().slice(0, 10)} → `
    + `${new Date(r.senaste).toISOString().slice(0, 10)}`);
}

let jobb = [];
try {
  jobb = await db`SELECT status, COUNT(*)::int AS n FROM ingest_jobs WHERE sender = ${EPOST} GROUP BY status`;
} catch { console.log('  (ingest_jobs saknas i den här miljön)'); }
console.log(`\n── INGEST-JOBB: ${jobb.reduce((s, r) => s + r.n, 0)} ──`);
for (const r of jobb) console.log(`  ${String(r.n).padStart(3)} × ${r.status}`);

// ── DET GLAPP SOM ANNARS BLIR EN ÖVERRASKNING ─────────────────────────────────────────────
const [{ n: utanEpost }] = await db`
  SELECT COUNT(*)::int AS n FROM invoice_analyses WHERE user_email IS NULL`;
console.log(`\n── RADER UTAN E-POST (fingerprint-nycklade): ${utanEpost} ──`);
console.log('  Rummet slår ihop e-postnycklad och fingerprint-nycklad historik. De här raderna');
console.log('  rensas INTE av adressen och syns fortfarande om rummet öppnas i samma webbläsare.');
console.log('  Vill du ha dem borta: öppna rummet i ett nytt/inkognitofönster, eller säg till så');
console.log('  rensar jag på just ditt fingerprint (det står i rummets URL).');

// ── SPÄRR 2: taket ─────────────────────────────────────────────────────────────────────────
if (totalt > TAK) {
  console.error(`\n✗ AVBRYTER: ${totalt} rader överstiger taket ${TAK}. Ett rum har tiotals rader; `
    + 'det här ser ut som en felriktad fråga. Höj taket medvetet om siffran är väntad.');
  process.exit(1);
}

// ── SPÄRR 3: torrkörning som default ──────────────────────────────────────────────────────
if (!SKARPT) {
  console.log(`\n✓ TORRKÖRNING KLAR — ingenting raderat. ${totalt} analyser och `
    + `${jobb.reduce((s, r) => s + r.n, 0)} jobb skulle arkiveras med RENSA_SKARPT=1.\n`);
  process.exit(0);
}

// ── ARKIVERING, INTE RADERING (grundarbeslut 2026-09-11) ─────────────────────────────────────
// Den här raden var ett `DELETE` fram till i dag, och den kostade moaten sin proveniens: när
// rummet rensades 9 september försvann motparten som hade burit dokumentidentiteten, och 288
// datapunkter blev permanent spårlösa. Fable 5.1: «Analyserna är prisbokens proveniens.»
// Kunden får sitt rena rum — läsvägarna i `lib/invoice-store.js` filtrerar `arkiverad_at IS NULL`
// i alla sex satserna, inklusive reserverna — och bevisen står kvar.
const rader = await db`
  UPDATE invoice_analyses SET arkiverad_at = NOW()
  WHERE user_email = ${EPOST} AND arkiverad_at IS NULL
  RETURNING id`;
let raderadeJobb = 0;
try {
  const j = await db`DELETE FROM ingest_jobs WHERE sender = ${EPOST} RETURNING id`;
  raderadeJobb = j.length;
} catch { /* tabellen kanske inte finns */ }

// ── MÄT EFTER: «det borde vara tomt nu» är inte verifiering (Verifieringsplikten p.3) ──────
const [{ n: kvar }] = await db`
  SELECT COUNT(*)::int AS n FROM invoice_analyses WHERE user_email = ${EPOST}`;
console.log(`\n── RADERAT ──`);
console.log(`  analyser: ${rader.length}   ingest-jobb: ${raderadeJobb}`);
console.log(`  kvar i rummet efter radering: ${kvar}`);
if (kvar !== 0) {
  console.error('✗ Rader kvar trots radering — läs utfallet innan du skickar in något.');
  process.exit(1);
}
console.log('\n✓ RUMMET ÄR TOMT. Dedupen på (fingerprint, pdf_hash) är därmed också rensad,');
console.log('  så samma PDF kan skickas in på nytt och skapar en ny rad i stället för att uppdatera.\n');
