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

console.log('\n=== NÄR TIPPADE CELLEN, OCH HUR MÅNGA RADER KOM EFTER ===');
// Felet blev verkligt först den dag en cell passerade MIN_POINTS (10). Datumet för den tionde
// datapunkten är alltså startskottet — och varje analys i samma kategori efter det datumet
// jämfördes mot ett golv som var multiplicerat med antalet enheter.
for (const kategori of ['mobil', 'saas-productivity', 'bredband']) {
  const trosklar = await db`
    SELECT industry, size_bucket, MIN(created_at) AS tippade FROM (
      SELECT industry, size_bucket, created_at,
             ROW_NUMBER() OVER (PARTITION BY industry, size_bucket ORDER BY created_at) AS rn
      FROM invoice_datapoints WHERE category = ${kategori}
    ) t WHERE rn = 10 GROUP BY 1,2 ORDER BY 3
  `;
  if (trosklar.length === 0) { console.log(`  ${kategori}: ingen cell har nått tio datapunkter.`); continue; }
  for (const t of trosklar) {
    const efter = await db`
      SELECT COUNT(*)::int AS n,
             COUNT(*) FILTER (WHERE should_switch = true)::int AS med_byte,
             COUNT(*) FILTER (WHERE COALESCE(net_saving, 0) = 0)::int AS utan_besparing
      FROM invoice_analyses
      WHERE category = ${kategori} AND route = 'auto' AND created_at >= ${t.tippade}
    `;
    const e = efter[0];
    console.log(`  ${kategori} · ${t.industry} · ${t.size_bucket}: tippade ${new Date(t.tippade).toISOString().slice(0, 10)} ` +
      `→ ${e.n} analyser efter det (${e.med_byte} med byte, ${e.utan_besparing} utan besparing)`);
  }
}

console.log('\n=== FICK DE HÄR KUNDERNA FEL SVAR? (omräkning mot det verifierade golvet) ===');
// Den enda frågan som betyder något. För varje lagrad rad i en per-användare-kategori:
// vad blev jämförelsegolvet med den GAMLA skalan (livedatans total × antal enheter) och vad blir
// det med prisbokens verifierade per-enhet-golv? Kunde bytet nollas av finansgrinden
// (suggested >= annualCost) på grund av skalan, och inte på grund av kundens pris?
const { getPublicListBenchmark } = await import('../lib/benchmark.js');
for (const kategori of ['mobil', 'saas-productivity']) {
  const rader = await db`
    SELECT id, annual_cost, seat_count, employees, industry, should_switch,
           COALESCE(net_saving, 0) AS net_saving, created_at
    FROM invoice_analyses
    WHERE category = ${kategori} AND route = 'auto' AND annual_cost > 0
    ORDER BY created_at DESC LIMIT 40
  `;
  let tystade = 0, provbara = 0;
  for (const r of rader) {
    const enheter = r.seat_count ?? r.employees ?? 0;
    if (!(enheter > 0)) continue;
    const live = await getBenchmark({ category: kategori, industry: r.industry, employees: r.employees ?? enheter });
    if (!live || live.isTotal !== true) continue;         // ingen livedata bar → felet kunde inte uppstå
    if (!(live.note ?? '').toLowerCase().includes('per användare')) continue;
    provbara++;
    const gammaltGolv = live.p25 * enheter;               // så räknade koden före fixen
    const nyttGolv    = live.p25;                         // isTotal → skalan är 1
    // Finansgrinden nollar bytet när golvet är minst lika stort som kundens kostnad.
    const nolladesAvGammalt = gammaltGolv >= r.annual_cost;
    const nolladesAvNytt    = nyttGolv    >= r.annual_cost;
    if (nolladesAvGammalt && !nolladesAvNytt) {
      tystade++;
      console.log(`  ⚠ rad ${String(r.id).slice(0, 8)} (${new Date(r.created_at).toISOString().slice(0, 10)}): ` +
        `kostnad ${r.annual_cost} kr · ${enheter} enheter · gammalt golv ${gammaltGolv} kr (nollade bytet) ` +
        `· rätt golv ${nyttGolv} kr (nollar inte)`);
    }
  }
  console.log(`  ${kategori}: ${provbara} rader kunde drabbas · ${tystade} fick sitt byte nollat ENBART av skalan`);
}

// Prisbokens verifierade golv som referens — det är talet rummets bevis visar.
for (const k of ['mobil', 'saas-productivity']) {
  const pub = getPublicListBenchmark({ category: k, employees: 10 });
  console.log(`  referens · ${k}: verifierat publikt p25 = ${pub?.p25 ?? '(saknas)'} kr/enhet/år (${pub?.lastVerified ?? 'odaterat'})`);
}

console.log('\nSonden skriver inget och läser ingen kundidentitet.');
process.exit(0);

console.log('\n=== HUR MYCKET AV PRISBOKEN ÄR MÄRKT MED DEFAULTVÄRDEN? ===');
// Båda mail-in-vägarna (api/inbound-email.mjs och api/cron/drain-ingest.mjs) skickar
// `industry: 'ovrigt'` och `employees: 10` — inte observerat, utan antaget. 'ovrigt' mappar till
// segmentet 'byraer' och 10 anställda till storleksbandet 'small'. Varje mail-in-faktura hamnar
// alltså i cellen byraer · small oavsett vem kunden är. Frågan är hur stor andel av prisbokens
// största celler som består av rader vars segment aldrig observerades.
const mail = await db`
  SELECT category,
         COUNT(*)::int AS totalt,
         COUNT(*) FILTER (WHERE fingerprint LIKE 'mail:%')::int AS via_mail,
         COUNT(*) FILTER (WHERE employees = 10)::int AS exakt_tio
  FROM invoice_analyses WHERE route = 'auto' GROUP BY 1 ORDER BY 2 DESC LIMIT 12
`;
for (const r of mail) {
  const andel = r.totalt > 0 ? Math.round((r.via_mail / r.totalt) * 100) : 0;
  console.log(`  ${r.category}: ${r.totalt} analyser · ${r.via_mail} via mail-in (${andel} %) · ${r.exakt_tio} med employees=10`);
}
const tot = await db`
  SELECT COUNT(*)::int AS n,
         COUNT(*) FILTER (WHERE fingerprint LIKE 'mail:%')::int AS via_mail,
         COUNT(*) FILTER (WHERE employees = 10)::int AS exakt_tio
  FROM invoice_analyses WHERE route = 'auto'
`;
console.log(`  SUMMA: ${tot[0].n} auto-analyser · ${tot[0].via_mail} via mail-in · ${tot[0].exakt_tio} med employees exakt 10`);
console.log('  (employees=10 kan vara sant för en riktig kund — talet är en ÖVRE gräns för hur');
console.log('   många rader som kan bära ett antaget segment, inte ett bevis på att de gör det.)');
