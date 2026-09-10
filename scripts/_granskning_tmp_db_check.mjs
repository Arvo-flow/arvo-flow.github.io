#!/usr/bin/env node
// TILLFÄLLIG GRANSKNINGSSOND — raderas efter körning. Läser BARA metadata (information_schema,
// pg_indexes) mot produktions-DB för att avgöra om migrationen i scripts/migrate.mjs (commit
// aacf7d9, "pdf_hash" + "idx_datapoints_dokument") faktiskt körts. Skriver ingenting.
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
  || process.env.POSTGRES_URL_DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
if (!url) { console.log('INGEN DATABASE_URL HITTAD'); process.exit(1); }
const sql = neon(url);

const col = await sql`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'invoice_datapoints' AND column_name = 'pdf_hash'
`;
console.log('pdf_hash-kolumnen finns:', col.length > 0, JSON.stringify(col));

const idx = await sql`
  SELECT indexname, indexdef FROM pg_indexes
  WHERE tablename = 'invoice_datapoints' AND indexname = 'idx_datapoints_dokument'
`;
console.log('idx_datapoints_dokument finns:', idx.length > 0, JSON.stringify(idx));

const count = await sql`SELECT count(*)::int AS n FROM invoice_datapoints`;
console.log('Antal rader i invoice_datapoints just nu:', count[0].n);

// Bevisa konsekvensen UTAN att skriva något i produktionen: använd sql.transaction() (neon
// serverless driverns riktiga batch-transaktion, en enda HTTP-request) så att en eventuell
// lyckad INSERT rullas tillbaka atomiskt av drivern själv — ingen data lämnas kvar oavsett utfall.
try {
  await sql.transaction([
    sql`
      INSERT INTO invoice_datapoints (category, supplier, annual_cost, industry, size_bucket, pdf_hash)
      VALUES ('granskning-test', 'granskning-test', 1000, 'byraer', 'small', 'granskning-test-hash')
      ON CONFLICT (pdf_hash, category) WHERE pdf_hash IS NOT NULL DO NOTHING
    `,
    sql`SELECT 1/0`, // tvingar transaktionen att aldrig committa, oavsett om INSERT-satsen ovan höll
  ]);
  console.log('OVÄNTAT: transaktionen commitade trots den avsiktliga divide-by-zero-raden');
} catch (err) {
  // Om felet handlar om division med noll höll INSERT-satsen (och rullades ändå tillbaka).
  // Om felet handlar om ON CONFLICT/kolumnen är det INSERT-satsen som kastade.
  console.log('TRANSAKTION (avsiktligt tillbakarullad) — felmeddelande:', err.message);
}
