// scripts/export-testyta.mjs — dumpar testytans analyser som JSON (alla fält inkl health_score +
// lead_finding_json) så kontorsbilden kan renderas ur VERKLIG data, inte en stub. Kör i Actions.
import { getDb } from '../lib/db.js';
import { TEST_EMAIL } from '../lib/test-surface.js';

const db = getDb();
if (!db) { console.log('[]'); process.exit(0); }

// #2-diagnos: finns triage_reason + health_score-kolumnerna FAKTISKT? (frågar schemat, inte gissar)
try {
  const cols = await db`SELECT column_name FROM information_schema.columns WHERE table_name='invoice_analyses' AND column_name IN ('triage_reason','health_score')`;
  console.error('[KOLUMN-KOLL] invoice_analyses har:', cols.map((c) => c.column_name).join(', ') || '(varken triage_reason eller health_score!)');
} catch (e) { console.error('[KOLUMN-KOLL] fel:', e.message); }

const rows = await db`
  SELECT id, created_at, supplier, normalized_supplier, category, annual_cost,
         suggested_annual_cost, gross_saving, net_saving, should_switch, route,
         industry, employees, billing_period, seat_count, price_per_seat_monthly,
         health_score, lead_finding_json, contract_end_date
  FROM invoice_analyses WHERE user_email = ${TEST_EMAIL} ORDER BY created_at DESC
`.catch((e) => { console.error('export-fel:', e.message); return []; });

console.log(JSON.stringify(rows, null, 2));
