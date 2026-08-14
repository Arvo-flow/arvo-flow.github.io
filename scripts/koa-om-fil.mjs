// scripts/koa-om-fil.mjs — KÖA OM EN NAMNGIVEN FIL SOM INTE LÄMNADE SPÅR.
//
// Ellevio-fallet: nätavgifts-grinden bedömde fakturan rätt (reglerat monopol, inget att spara)
// men returnerade utan storeTriaged. Jobbet står därför som `done` — pipelinen svarade ok:true —
// medan kunden ser nio fakturor av tio och ingen förklaring till den tionde.
//
// retryFailedBySender rör bara status='failed'. Ett jobb som "lyckades" utan att lämna spår
// behöver ett eget, smalt verktyg. Det här är det, och det är avsiktligt trubbigt på ett sätt:
//
//   · det tar EXAKT ett filnamn och EXAKT en avsändare — inga jokertecken, inga urval
//   · det skriver ut vad det tänker göra INNAN det gör det
//   · det vägrar om träffen inte är entydig (0 eller >1 rader) — en omköning som råkar träffa
//     fel faktura är värre än den lucka den skulle laga
//
// Rotorsaken måste vara fixad FÖRE omköningen, annars upprepar vi bara samma tysta utfall.
// (Nätavgifts-grinden bokför sig sedan 2026-08-14, låst av tests/triage-bokforing.mjs.)
import { deklarera } from '../lib/sondkontrakt.js';
import { getDb } from '../lib/db.js';
import { kravKolumner, aldrigTyst } from '../lib/sondvakt.js';

deklarera({
  namn: 'koa-om-fil',
  fangar: 'Om en namngiven fil från en namngiven avsändare finns i kön, i vilket tillstånd den står, och om den lämnat en analysrad. Sätter jobbet till pending så drainen kör om det.',
  blind: 'Skriptet vet inte om Resend fortfarande har mejlet kvar. Bilagor hämtas vid analystillfället via signerade länkar; är mejlet utgånget hos Resend faller omköningen i drainen (som failJob) och det syns först där, inte här.',
});

const sender = process.argv[2];
const filnamn = process.argv[3];
if (!sender || !filnamn) { console.error('Användning: koa-om-fil.mjs <avsändare> <filnamn>'); process.exit(1); }
const mask = (e) => { const [l, d] = String(e).split('@'); return d ? `${l.slice(0, 2)}***@${d}` : '(ingen)'; };

const db = getDb();
if (!db) { console.error('Ingen DATABASE_URL.'); process.exit(1); }

await kravKolumner(db, 'ingest_jobs', ['sender', 'filename', 'status', 'attempts', 'done_at']);

const traff = await aldrigTyst(db`
  SELECT id, filename, status, attempts, created_at, done_at, error
  FROM ingest_jobs WHERE sender = ${sender} AND filename = ${filnamn}
  ORDER BY created_at DESC
`, `sökning efter ${filnamn}`);

console.log(`\nAvsändare: ${mask(sender)}   fil: ${filnamn}`);
console.log(`Träffar i kön: ${traff.length}`);
for (const r of traff) {
  console.log(`   id=${r.id}  status=${r.status}  försök=${r.attempts}  klar=${r.done_at ? new Date(r.done_at).toISOString().slice(11, 19) : '—'}  fel=${r.error ?? ''}`);
}

if (traff.length !== 1) {
  console.error(`\n⛔ Kräver EXAKT en träff, hittade ${traff.length}. Ingen omköning gjord —`
    + ` en omköning som träffar fel faktura är värre än luckan den skulle laga.`);
  process.exit(1);
}

const jobb = traff[0];
const { rows: [ny] = [] } = { rows: await aldrigTyst(db`
  UPDATE ingest_jobs SET status='pending', attempts=0, error=NULL, claimed_at=NULL, done_at=NULL
  WHERE id = ${jobb.id} RETURNING id, status
`, 'omköning av jobbet') };

console.log(`\n✓ Jobb ${ny.id} satt till '${ny.status}'. Drainen betar av det inom ett par minuter.`);
console.log(`  Rotorsaken (nätavgifts-grinden utan storeTriaged) är fixad och testlåst — den här`);
console.log(`  körningen ska därför lämna en rad, inte tystnad. Kontrollera med probe-bulk-jobb.`);
