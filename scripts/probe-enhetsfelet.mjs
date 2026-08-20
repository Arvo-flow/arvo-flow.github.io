// scripts/probe-enhetsfelet.mjs — mäter EXPONERINGEN för enhetsfelet i besparingstalet.
//
// Obduktionen 2026-08-20: recommend.js byggde suggestedAnnualCost/savingPerYear/overpaymentPercent
// ur `benchmark.p25 × scale` utan att fråga om benchmarken var en TOTALSUMMA. Fixen är gjord.
// Den här sonden svarar på den andra frågan — HUR MÅNGA kunder som faktiskt drabbades — genom att
// mäta produktionsdatabasen i stället för att resonera om den.
//
// Felet krävde tre saker samtidigt:
//   (a) en cell där lib/benchmark.js returnerar livedata  → isTotal: true
//   (b) att prisbokens mock för samma cell säger «per användare» (noten ärvs över resultatet)
//   (c) att en analys faktiskt landade i den cellen
// Sonden mäter exakt de tre, per cell, och räknar de lagrade rader som stod i skottlinjen.
//
// SKRIVER ALDRIG. Läser bara. Repot är publikt: ingen e-post, inget bolagsnamn, inget
// fakturainnehåll och inga nycklar får nå utskriften.
import { getDb } from '../lib/db.js';
import { getBenchmark } from '../lib/benchmark.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const db = getDb();
if (!db) { console.log('INGEN DATABASE_URL — sonden kan inte mäta produktionens tillstånd.'); process.exit(0); }

const BUCKET = { micro: 5, small: 25, mid: 120 };  // en representant per storleksband

console.log('=== CELLER DÄR ENHETSFELET KUNDE DETONERA ===');
console.log('(livedata returnerad · noten säger per användare · alltså p25 × antal enheter)\n');

const celler = await db`
  SELECT category, industry, size_bucket, COUNT(*)::int AS n
  FROM invoice_datapoints GROUP BY 1,2,3 HAVING COUNT(*) >= 10 ORDER BY 4 DESC
`;
const liveCeller = await db`
  SELECT category, COUNT(*)::int AS n
  FROM invoice_analyses
  WHERE route = 'auto' AND annual_cost > 500 AND annual_cost < 5000000
  GROUP BY 1 HAVING COUNT(*) >= 5 ORDER BY 2 DESC
`;

console.log(`invoice_datapoints-celler över tröskeln (≥10): ${celler.length}`);
for (const c of celler) console.log(`  ${c.category} · ${c.industry} · ${c.size_bucket} — n=${c.n}`);
console.log(`\ninvoice_analyses-kategorier över tröskeln (≥5): ${liveCeller.length}`);
for (const c of liveCeller) console.log(`  ${c.category} — n=${c.n}`);

console.log('\n=== VAD getBenchmark FAKTISKT SVARAR NU (den riktiga läsvägen) ===');
const kategorier = [...new Set([...celler.map((c) => c.category), ...liveCeller.map((c) => c.category)])];
let farliga = 0;
for (const kategori of kategorier) {
  for (const [bucket, employees] of Object.entries(BUCKET)) {
    for (const industry of ['it-tech', 'konsult', 'ovrigt']) {
      const bm = await getBenchmark({ category: kategori, industry, employees });
      if (!bm) continue;
      const perAnvandare = (bm.note ?? '').toLowerCase().includes('per användare');
      const total = bm.isTotal === true;
      if (total && perAnvandare) {
        farliga++;
        console.log(`  ⚠ ${kategori} · ${industry} · ${bucket}: source=${bm.source} isTotal=true perAnvändare=true ` +
          `p25=${bm.p25} → gammal kod: ${bm.p25} × ${employees} = ${bm.p25 * employees} kr`);
      }
    }
  }
}
console.log(farliga === 0
  ? '  Ingen cell uppfyller alla tre villkoren just nu.'
  : `  ${farliga} cellkombination(er) uppfyllde alla tre villkoren.`);

console.log('\n=== LAGRADE RADER I SKOTTLINJEN ===');
// En rad kan ha räknats fel bara om dess kategori är per-användare-prissatt OCH livedata bar.
const perAnvKategorier = Object.entries(BRANCHINDEX)
  .filter(([, d]) => (d?.note ?? '').toLowerCase().includes('per användare'))
  .map(([k]) => k);
console.log(`per-användare-kategorier i prisboken: ${perAnvKategorier.join(', ') || '(inga)'}`);
if (perAnvKategorier.length > 0) {
  const rader = await db`
    SELECT category, COUNT(*)::int AS n,
           COUNT(*) FILTER (WHERE should_switch = true)::int AS med_byte,
           COUNT(*) FILTER (WHERE net_saving > 0)::int AS med_besparing
    FROM invoice_analyses
    WHERE category = ANY(${perAnvKategorier}) AND route = 'auto'
    GROUP BY 1 ORDER BY 2 DESC
  `;
  if (rader.length === 0) console.log('  inga lagrade auto-rader i dessa kategorier.');
  for (const r of rader) console.log(`  ${r.category}: ${r.n} rader · ${r.med_byte} med byte · ${r.med_besparing} med besparing > 0`);
}

console.log('\nSonden skriver inget och läser ingen kundidentitet.');
process.exit(0);
