// scripts/probe-direct-microsoft.mjs — Finns en RIKTIG direkt-Microsoft-kund med platsantal,
// värd ett framtida PRECISIONS-faktakort om den redan annonserade 2026-höjningen?
// (Skiljer sig från bedömnings-/prognosfacket: detta vore ett känt faktum + kr-räkning, inte en gissning.)
// Ren SQL, ingen AI. Svarar bara på om underlaget finns — bygger ingenting.
import { getDb } from '../lib/db.js';
const db = getDb();
if (!db) { console.log('Ingen DATABASE_URL — exit 0'); process.exit(0); }
const P = (...a) => console.log(...a);

P('═══════ Direkt-Microsoft-kunder (saas-productivity, route=auto) ═══════');
const rows = await db`
  SELECT id, normalized_supplier, supplier, category, route,
         annual_cost, seat_count, price_per_seat_monthly, billing_period,
         COALESCE(NULLIF(user_email,''), fingerprint) AS cust, created_at
  FROM invoice_analyses
  WHERE category = 'saas-productivity'
    AND (normalized_supplier ILIKE '%microsoft%' OR supplier ILIKE '%microsoft%')
    AND route = 'auto'
  ORDER BY created_at DESC`;

if (!rows.length) { P('   INGA rader — ingen direkt-Microsoft-kund alls.'); process.exit(0); }

for (const r of rows) {
  P(`   #${r.id} · ${r.supplier} · kund=${String(r.cust).slice(0,16)} · ${r.created_at}`);
  P(`        annual_cost=${r.annual_cost} · seat_count=${r.seat_count ?? 'NULL'} · price_per_seat_monthly=${r.price_per_seat_monthly ?? 'NULL'} · billing_period=${r.billing_period ?? 'NULL'}`);
}

const withSeats = rows.filter((r) => r.seat_count > 0);
P(`\n   → ${rows.length} direkt-Microsoft-rader · ${withSeats.length} med känt seat_count`);
P(withSeats.length > 0
  ? '   ✅ Underlag finns för ett personligt faktakort (kr-räkning möjlig).'
  : '   ⚠️  Inget känt platsantal — ett faktakort skulle behöva gissa kr-impact. Bygg INTE än.');
P('═══════════════════════════════════════════════════════');
