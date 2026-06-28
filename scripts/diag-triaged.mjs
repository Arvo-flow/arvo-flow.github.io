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
  const r = await db`SELECT triage_reason FROM invoice_analyses WHERE fingerprint='diagfp00000000000000000000000000'`;
  console.log('LÄST triage_reason:', JSON.stringify(r[0]?.triage_reason));
  await db`DELETE FROM invoice_analyses WHERE fingerprint='diagfp00000000000000000000000000'`;
} catch (e) {
  console.log('INSERT-FEL:', e.message);
}
console.log('KLART.');
