// scripts/diag-triaged.mjs — #2-diagnos: kör den EXAKTA triage-inserten mot DB och fångar felet.
// Svarar definitivt: finns triage_reason-kolumnen, går inserten, och lagras skälet? Kör i Actions.
import { getDb } from '../lib/db.js';
const db = getDb();
if (!db) { console.log('ingen DB'); process.exit(0); }

const cols = await db`SELECT column_name FROM information_schema.columns WHERE table_name='invoice_analyses' AND column_name IN ('triage_reason','health_score')`;
console.log('KOLUMNER (triage_reason/health_score):', cols.map((c) => c.column_name).join(', ') || 'INGEN');

try {
  await db`
    INSERT INTO invoice_analyses (fingerprint, pdf_hash, supplier, normalized_supplier, category, route, user_email, triage_reason, should_switch)
    VALUES ('diagfp00000000000000000000000000','diaghash',' DiagCo','diagco','uncategorized','review_queue','diag@test','diag_reason_test',false)
    ON CONFLICT (fingerprint, pdf_hash) DO UPDATE SET triage_reason = EXCLUDED.triage_reason`;
  console.log('INSERT med triage_reason: OK');
  const r = await db`SELECT triage_reason FROM invoice_analyses WHERE fingerprint='diagfp00000000000000000000000000'`;   // sondvakt-ok: den här grenen INSERTar själv med det råa värdet (rent schematest av kolumnen), alltså är det rätt nyckel att läsa på
  console.log('LÄST triage_reason:', JSON.stringify(r[0]?.triage_reason));
  await db`DELETE FROM invoice_analyses WHERE fingerprint='diagfp00000000000000000000000000'`;   // sondvakt-ok: samma råa nyckel som INSERTen ovan skrev
} catch (e) {
  console.log('INSERT-FEL:', e.message);
}
// Kör den RIKTIGA produktions-storeTriaged (samma kod som Vercel) och läs tillbaka skälet.
import { storeTriaged } from '../lib/invoice-store.js';
import { createHash } from 'node:crypto';
const DIAG_FP = 'diagfn00000000000000000000000000';
try {
  const ok = await storeTriaged({ fingerprint: DIAG_FP, pdfHash: 'diaghash2',
    supplier: 'DiagFn AB', category: 'molnvaxel', route: 'review_queue', reason: 'categorization_conflict', userEmail: 'diag@test' });
  console.log('storeTriaged returnerade:', ok);
  // ── SONDEN KUNDE BARA SVARA «NEJ» (2026-08-21, fångad av SV-09 på dess första körning) ────
  // storeTriaged HASHAR fingerprinten före lagring (lib/invoice-store.js hashFp). Läsningen
  // härunder använde det RÅA värdet och kunde därför aldrig hitta raden den just skrev — sonden
  // skrev ut «route= undefined triage_reason= undefined» och såg ut att bevisa att storeTriaged
  // INTE lagrar skälet. En sond vars enda möjliga svar är ett larm är inget mätinstrument.
  // (DELETE-raden städade följaktligen heller ingenting.)
  const fpRatt = createHash('sha256').update(DIAG_FP).digest('hex').slice(0, 32);
  const r = await db`SELECT route, triage_reason FROM invoice_analyses WHERE fingerprint=${fpRatt}`;
  console.log('LÄST tillbaka: route=', JSON.stringify(r[0]?.route), ' triage_reason=', JSON.stringify(r[0]?.triage_reason));
  await db`DELETE FROM invoice_analyses WHERE fingerprint=${fpRatt}`;
} catch (e) { console.log('storeTriaged-FEL:', e.message); }
console.log('KLART.');
