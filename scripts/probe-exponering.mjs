// scripts/probe-exponering.mjs — HUR ILLA BLEV DET? Faktisk kundexponering för prisfelen.
//
// Efter 2026-08-05 (inaktuella ankare + elva påhittade partnerrabatter) är den enda frågan som
// betyder något: nådde en riktig kund en uppblåst besparing, och agerade någon på den?
// Tröst utan mätning är värdelös. Det här skriptet mäter.
import { getDb } from '../lib/db.js';

const db = getDb();
if (!db) { console.log('DATABASE_URL saknas'); process.exit(0); }

const q = async (namn, sql) => {
  try { console.log(`\n── ${namn} ──`); console.log(JSON.stringify(await sql, null, 1)); }
  catch (e) { console.log(`\n── ${namn} ──\nFEL: ${e.message}`); }
};

await q('Analyser totalt · unika e-poster · unika fingerprints', db`
  SELECT COUNT(*)::int AS analyser,
         COUNT(DISTINCT user_email)::int AS eposter,
         COUNT(DISTINCT fingerprint)::int AS fingerprints,
         MIN(created_at) AS forsta, MAX(created_at) AS senaste
  FROM invoice_analyses`);

await q('Per e-postdomän (vem är kunderna EGENTLIGEN?)', db`
  SELECT split_part(user_email, '@', 2) AS doman, COUNT(*)::int AS n
  FROM invoice_analyses WHERE user_email IS NOT NULL
  GROUP BY 1 ORDER BY n DESC LIMIT 20`);

await q('Analyser i DRABBADE kategorier (saas-productivity = M365/Google/Slack/Zoom)', db`
  SELECT category, route, COUNT(*)::int AS n, MAX(created_at) AS senaste
  FROM invoice_analyses
  WHERE category IN ('saas-productivity','saas-crm','mobil')
  GROUP BY 1,2 ORDER BY n DESC`);

await q('Utskickade prislarm (nådde något kunden?)', db`
  SELECT COUNT(*)::int AS rader, COALESCE(SUM(emails_sent),0)::int AS mail_skickade,
         MAX(created_at) AS senaste
  FROM price_alerts_sent`);

await q('Aktiverade Intelligence-kunder (betalande relation)', db`
  SELECT COUNT(*)::int AS n FROM activation_outcomes`);

await q('Verifierade utfall / success fee (fakturerat på besparing?)', db`
  SELECT COUNT(*)::int AS n FROM arvo_outcomes`);
