// scripts/koa-om-alla.mjs — KÖR OM EN AVSÄNDARES HELA BUNT SÅ DEN BÄR DAGENS FÄLT.
//
// VARFÖR (grundaren, 2026-08-15): "Inga förändringar." Uppdelningen — vad de 72 900 kronorna
// består av — kräver att fakturaraderna är LAGRADE, och kolumnen skapades i kväll. Rader som
// analyserades innan dess bär ingenting att visa, och kortet är då korrekt tyst. Samma sak gäller
// fakturanumret och, för äldre rader, health_score.
//
// Vi kan inte fylla i i efterhand: PDF:en sparas aldrig efter analysen (det är ett löfte till
// kunden, inte en teknisk detalj). Det enda sättet att få dagens fält på gamla fakturor är att
// köra pipelinen igen — drainen hämtar bilagan på nytt från Resend.
//
// DISCIPLINEN, samma som koa-om-fil:
//   · EXAKT en avsändare, inga jokertecken, inga urval
//   · skriver ut vad den tänker göra INNAN den gör det
//   · vägrar om antalet ser oväntat ut (skyddar mot att råka röra fel kunds bunt)
//   · sätter köflaggan — ett jobb som ingen väcker är inte omköat, det är parkerat
//
// Omkörningen är IDEMPOTENT för kundens rum: storeAnalysis upsertar på (fingerprint, pdf_hash),
// så inga dubbletter uppstår. De separata UPDATE-satserna (rader, fakturanummer, health_score,
// fynd) skriver på den befintliga raden — vilket är hela poängen.
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';
import { kravKolumner, aldrigTyst } from '../lib/sondvakt.js';
import { markPending } from '../lib/ingest-queue.js';

deklarera({
  namn: 'koa-om-alla',
  fangar: 'Alla köade jobb för EN namngiven avsändare, deras nuvarande tillstånd, och sätter dem till pending så drainen kör om hela bunten mot dagens pipeline (fakturarader, fakturanummer, health_score).',
  blind: 'Skriptet vet inte om Resend fortfarande har mejlen kvar. Bilagor hämtas vid analystillfället via signerade länkar; är ett mejl utgånget faller den omköningen i drainen och syns som failed där, inte här. Det vet heller inget om vad omkörningen kommer att PRODUCERA — bara att den startar.',
});

const sender = process.argv[2];
const tak = Number(process.argv[3] || 15);
if (!sender || !sender.includes('@')) {
  console.error('Användning: koa-om-alla.mjs <avsändare> [tak, default 15]');
  process.exit(1);
}
const mask = (e) => { const [l, d] = String(e).split('@'); return d ? `${l.slice(0, 2)}***@${d}` : '(ingen)'; };

const db = getDb();
if (!db) { console.error('Ingen DATABASE_URL.'); process.exit(1); }

await kravKolumner(db, 'ingest_jobs', ['sender', 'filename', 'status', 'attempts', 'outcome']);

const jobb = await aldrigTyst(db`
  SELECT id, filename, status, attempts, outcome
  FROM ingest_jobs WHERE sender = ${sender}
  ORDER BY attachment_index ASC
`, `jobb för ${mask(sender)}`);

console.log(`\nAvsändare: ${mask(sender)}   jobb i kön: ${jobb.length}`);
for (const j of jobb) {
  console.log(`   ${String(j.status).padEnd(10)} försök=${j.attempts}  ${String(j.filename).slice(0, 38).padEnd(38)}  ${j.outcome ?? ''}`);
}

if (jobb.length === 0) { console.log('\nInget att köra om.'); process.exit(0); }
if (jobb.length > tak) {
  console.error(`\n⛔ ${jobb.length} jobb överstiger taket ${tak}. Höj taket medvetet om det är avsikten —`
    + ` en omköning av fel eller för stor bunt kostar API-anrop och kan röra en annan kunds rum.`);
  process.exit(1);
}

const { length: n } = await aldrigTyst(db`
  UPDATE ingest_jobs SET status='pending', attempts=0, error=NULL, claimed_at=NULL, done_at=NULL, outcome=NULL
  WHERE sender = ${sender} RETURNING id
`, 'omköning av bunten');

await markPending();
console.log(`\n✓ ${n} jobb satta till 'pending' OCH köflaggan satt — drainen väcks nu.`);
console.log(`  Efter körningen bär raderna dagens fält: fakturarader (uppdelningen), fakturanummer`);
console.log(`  och health_score. Kontrollera med probe-bulk-jobb; kön bokför numera sin egen dom.`);
