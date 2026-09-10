// lib/benchmark.js — Benchmark engine: DB + KV cache + mock fallback.
//
// READ PATH:
//   1. Check Vercel KV cache (TTL 6h)
//   2. Cache miss → query Neon Postgres for percentiles
//   3. Segment has ≥ MIN_POINTS real datapoints → return real data
//   4. < MIN_POINTS → fall back to mock from branchindex.js
//
// WRITE PATH:
//   storeDatapoint() inserts one anonymized row and invalidates the cache.
//   Non-fatal: storage failure never breaks the main request.
//
// Both DB and KV degrade gracefully to null when env vars are absent,
// so the function works in local dev without any infrastructure.

import { getDb } from './db.js';
import { getKv } from './kv.js';
import { Resend } from 'resend';
import {
  getBenchmark as getMockBenchmark,
  bucketForSize,
  INDUSTRIES,
  INDUSTRY_SEGMENT_MAP,
  BRANCHINDEX,
} from '../agents/recommender/branchindex.js';

const MIN_POINTS      = 10;
const MIN_LIVE_POINTS = 5;  // lower threshold for invoice_analyses — all historical data
const CACHE_TTL_SECONDS = 6 * 60 * 60; // 6 h

// Employee ranges per size bucket — used for invoice_analyses cross-customer query
const BUCKET_RANGES = {
  micro: { min: 1,  max: 9   },
  small: { min: 10, max: 49  },
  mid:   { min: 50, max: 249 },
};
const FROM_ALERT = process.env.RESEND_FROM      ?? 'Arvo Flow <analys@arvoflow.se>';
const ALERT_TO   = process.env.ARVO_ALERT_EMAIL ?? 'team@arvoflow.se';

function cacheKey(category, industry, sizeBucket) {
  return `bm:v2:${category}:${industry}:${sizeBucket}`;
}

async function notifyOutlier({ category, supplier, annualCost, bucket, zScore, mean, stddev, n }) {
  if (!process.env.RESEND_API_KEY) return;
  const ts  = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  const fmt = (v) => Math.round(v).toLocaleString('sv-SE');
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    FROM_ALERT,
      to:      ALERT_TO,
      subject: `[Outlier] ${category} · ${fmt(annualCost)} kr/år · z=${zScore.toFixed(2)}`,
      html: `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#EEF4F1;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;max-width:560px;width:100%">
  <tr><td style="background:linear-gradient(145deg,#1E3A5F 0%,#1D4ED8 100%);padding:22px 28px">
    <p style="margin:0 0 4px;font-size:10px;color:rgba(147,197,253,0.85);text-transform:uppercase;letter-spacing:.12em">Arvo intern — datakvalitet</p>
    <p style="margin:0;font-size:20px;font-weight:700;color:#fff">Outlier stoppad · ${category}</p>
  </td></tr>
  <tr><td style="padding:22px 28px 0">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:33%;vertical-align:top;padding-right:12px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Inkommande värde</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#DC2626">${fmt(annualCost)} kr</p>
        </td>
        <td style="width:33%;vertical-align:top;padding:0 12px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Segment-medel ± σ</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17">${fmt(mean)} kr</p>
          <p style="margin:2px 0 0;font-size:13px;color:#5C6E68">±${fmt(stddev)} kr (n=${n})</p>
        </td>
        <td style="width:33%;vertical-align:top;padding-left:12px;border-left:1px solid #E2EDE8">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em">Z-score</p>
          <p style="margin:0;font-size:22px;font-weight:700;color:#DC2626">${zScore.toFixed(2)}σ</p>
          <p style="margin:2px 0 0;font-size:11px;color:#5C6E68">Tröskel: 3.00σ</p>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:16px 28px">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#EFF6FF;border-left:3px solid #1D4ED8;border-radius:0 6px 6px 0;padding:12px 16px">
        <p style="margin:0;font-size:13px;color:#1E3A5F;line-height:1.5">
          <strong>Leverantör:</strong> ${supplier ?? '–'} &nbsp;·&nbsp;
          <strong>Bucket:</strong> ${bucket} &nbsp;·&nbsp;
          <strong>Datapunkten sparades inte.</strong>
        </p>
      </td>
    </tr></table>
  </td></tr>
  <tr><td style="border-top:1px solid #D5E2DC;padding:12px 28px;background:#F4F9F7">
    <p style="margin:0;font-size:11px;color:#8A9E97">Arvo Flow · ${ts}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`,
    });
  } catch (err) {
    console.error('[benchmark] notifyOutlier failed:', err.message);
  }
}

export async function getBenchmark({ category, industry, employees }) {
  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const bucket = bucketForSize(employees ?? 5);
  const key = cacheKey(category, ind, bucket);

  // 1. KV cache
  const kv = getKv();
  if (kv) {
    try {
      const cached = await kv.get(key);
      if (cached) return cached;
    } catch { /* non-fatal */ }
  }

  // 2. Postgres
  const db = getDb();
  if (db) {
    try {
      const rows = await db`
        SELECT
          COUNT(*)::int                                                          AS n,
          ROUND(percentile_cont(0.5)  WITHIN GROUP (ORDER BY annual_cost))::int AS median,
          ROUND(percentile_cont(0.25) WITHIN GROUP (ORDER BY annual_cost))::int AS p25
        FROM invoice_datapoints
        WHERE category    = ${category}
          AND industry    = ${ind}
          AND size_bucket = ${bucket}
      `;
      const row = rows[0];
      if (row && row.n >= MIN_POINTS) {
        const mock = getMockBenchmark({ category, industry: ind, employees });
        const result = {
          ...(mock ?? {}),
          median: row.median,
          p25: row.p25,
          source: 'real',
          // ── FLAGGAN SATT 2026-08-19: DE HÄR TALEN ÄR TOTALSUMMOR ────────────────────────────
          // invoice_datapoints lagrar annualCost — hela bolagets årskostnad för kategorin. Ändå
          // saknade den här vägen isTotal, medan invoice_analyses-vägen nedan hade den. En
          // konsument kunde alltså inte skilja ett styckpris från en totalsumma, och Arvo Score
          // gjorde precis det felet: multiplicerade 184 680 kr (en total) med 10 licenser och
          // fick ett golv 115 gånger för högt. Flaggan fanns för att förhindra exakt den
          // förväxlingen — den var bara inte satt på den här grenen.
          isTotal: true,
          n: row.n,
        };
        if (kv) try { await kv.set(key, result, { ex: CACHE_TTL_SECONDS }); } catch { /* non-fatal */ }
        return result;
      }
    } catch (err) {
      console.error('[benchmark] DB error:', err.message);
    }
  }

  // 2.5. invoice_analyses — live cross-customer benchmarks (all historical data).
  // Returns total annual-cost percentiles tagged with isTotal:true so recommend.js
  // skips the per-seat scale multiplication (values are already company-level totals).
  if (db) {
    try {
      const range = BUCKET_RANGES[bucket] ?? BUCKET_RANGES.micro;
      const liveRows = await db`
        SELECT
          COUNT(*)::int AS n,
          ROUND(PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY annual_cost))::int AS median,
          ROUND(PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY annual_cost))::int AS p25
        FROM invoice_analyses
        WHERE category    = ${category}
          AND route       = 'auto'
          AND annual_cost > 500
          AND annual_cost < 5000000
          AND employees   >= ${range.min}
          AND employees   <= ${range.max}
      `;
      const lr = liveRows[0];
      if (lr && lr.n >= MIN_LIVE_POINTS) {
        const mock = getMockBenchmark({ category, industry: ind, employees });
        const result = {
          ...(mock ?? {}),
          median:  lr.median,
          p25:     lr.p25,
          source:  'live_analyses',
          isTotal: true,
          n:       lr.n,
        };
        if (kv) try { await kv.set(key, result, { ex: CACHE_TTL_SECONDS }); } catch { /* non-fatal */ }
        return result;
      }
    } catch (err) {
      console.error('[benchmark] invoice_analyses query error:', err.message);
    }
  }

  // 3. Mock fallback — never cached in KV since branchindex.js can be redeployed.
  // Preserve the category's source tier ('real-public', 'estimated') if set.
  const mock = getMockBenchmark({ category, industry: ind, employees });
  if (!mock) return null;
  return { ...mock, source: mock.source ?? 'mock', n: 0 };
}

// PRISBOKENS LISTPRIS-LÄSVÄG (Kristianstad-läxan 2026-07-12): dörrens marknadsankare ska per
// definition visa det VERIFIERADE PUBLIKA LISTPRISET — aldrig "bästa tillgängliga benchmark".
// getBenchmark föredrar (helt rätt) livedata när den finns, men livedatan är TOTALSUMMOR
// (live_analyses/isTotal) eller privat kohortdata — fel sanning för ett ankare vars etikett
// lovar per-enhet-listpris. Deterministisk, KV/DB-fri läsning direkt ur BRANCHINDEX; returnerar
// ENDAST 'real-public' (annars null) — så kan konsumenten aldrig råka visa fel källa.
export function getPublicListBenchmark({ category, employees = 5 }) {
  // employees spelar roll BARA för kategorier vars avgiftsstruktur äkta beror på antalet enheter
  // (loneadmin: fast avgift utslagen på fler anställda). För ett rent listpris är matrisen platt,
  // så parametern ändrar ingenting där. Den fanns inte förrän 2026-08-19, och utan den hade
  // rummet visat femmannaföretagets golv (778 kr/anställd/år) för ett bolag med tolv anställda,
  // vars verkliga golv är 499 — ett tal 56 % för högt, presenterat som "billigaste publicerade
  // pris". Samma klass som enhetsfelet: rätt sorts tal, fel population.
  const mock = getMockBenchmark({ category, industry: 'byraer', employees });
  if (!mock || mock.source !== 'real-public' || mock.isTotal) return null;
  // referensProdukt följer med: ett verifierat pris utan produktnamn är ett tal utan påstående
  // i kundytan (MK-08). Läses ur prisboken, aldrig avskriven i en konsument (regel 1).
  return {
    ...mock,
    referensProdukt: BRANCHINDEX[category]?.referensProdukt ?? null,
    // Deklarationen om huruvida kategorins golv duger utan bekräftad produktnivå. Mätt ur
    // spännvidden mellan nivåerna, inte tyckt — se branchindex.js.
    kraverBekraftadNiva: BRANCHINDEX[category]?.kraverBekraftadNiva === true,
    n: 0,
  };
}

/** Median av en talserie. Tom serie ger null — aldrig 0, som vore ett svar. */
function median(xs) {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/**
 * Är `varde` ett extremvärde i `varden`? Ren funktion, med flit: beslutet måste gå att pröva
 * utan databas — hela obduktionens felfamilj överlevde 1 822 gröna tester just för att sviten
 * kör utan `DATABASE_URL` och därför aldrig nådde de här grenarna (bibeln, 21 aug).
 *
 * Tre utfall, och de får aldrig se likadana ut:
 *   { faller: true }            — punkten ligger mer än TAK × MAD från medianen.
 *   { faller: false, skal }     — vakten kunde INTE bedöma (för få punkter, eller MAD = 0).
 *   { faller: false, skal: null } — vakten bedömde och friade.
 *
 * Att «kunde inte bedöma» släpper igenom är avsiktligt: prisboken skyddas redan av den absoluta
 * enhetskarantänen ovan (0,1–10 × listprismedian), och en vakt som fäller på tomhet är den
 * sjukdom vi just tog bort.
 */
export const MAD_TAK = 5;
export function bedomAvvikelse(varde, varden) {
  const alla = (varden ?? []).filter(Number.isFinite);

  // ⚠️ TJUGOFYRA RADER ÄR INTE TJUGOFYRA OBSERVATIONER, och det var där felet satt.
  // Min första omskrivning bytte medelvärde mot median och trodde sig klar. Mätt direkt efteråt
  // på grundarens egen cell — 24 punkter kring 184 663 kr med en spridning på ett fåtal kronor —
  // föll det korrekta priset 97 531 kr ÄNDÅ, med kvoten 87 132 × MAD. Bara EXAKT identiska
  // värden gav MAD = 0, och verkliga dubbletter skiljer sig ofta på kronan.
  //
  // Det robusta måttet var alltså rätt idé mätt på fel mängd. En cell som består av samma
  // faktura om och om igen har ingen fördelning oavsett hur man mäter den — antalet RADER säger
  // bara hur ofta vi sparat, aldrig hur många oberoende bolag vi sett. Kravet ställs därför på
  // antalet SKILDA belopp: tio observationer, inte tio kopior.
  const unika = [...new Set(alla)];
  if (unika.length < MIN_POINTS) {
    return {
      faller: false,
      skal: `för få SKILDA belopp (${unika.length} av ${alla.length} rader, kräver ${MIN_POINTS})`,
      median: null, mad: null, kvot: null,
    };
  }

  const med = median(unika);
  const mad = median(unika.map((v) => Math.abs(v - med)));
  if (!(mad > 0)) {
    // Kan bara inträffa om över halva mängden ligger på exakt medianen. Spridningen är då inte
    // ett mått utan frånvaron av ett, och en vakt som inte kan mäta får inte fälla.
    return { faller: false, skal: 'MAD = 0 — cellen har ingen spridning att mäta mot', median: med, mad: 0, kvot: null };
  }
  const kvot = Math.abs(varde - med) / mad;
  return { faller: kvot > MAD_TAK, skal: null, median: med, mad, kvot };
}

export async function storeDatapoint({ category, supplier, annualCost, industry, employees, seatCount = null, segmentOkant = false, pdfHash = null, db: dbIn = null }) {
  const db = dbIn ?? getDb();   // injicerbar för sviten (samma mönster som storeAnalysis) — prod skickar aldrig
  if (!db) return;

  // ── ETT ANTAGET SEGMENT SKRIVS ALDRIG SOM OM DET VORE OBSERVERAT (2026-08-21) ──────────────
  // Prisboken segmenterar på industri × storlek. Kommer båda ur ett defaultvärde hamnar raden i
  // cellen `byraer · small` oavsett vem kunden är — cellen svämmar över med bolag av alla
  // storlekar och branscher, och dess p25/median blir meningslös samtidigt som den ser precis
  // lika auktoritativ ut. Fail-closed på prisboken, fail-open på kunden: analysen är redan körd,
  // lagrad i kundens liggare och besvarad. Det enda som uteblir är en rad ingen kan belägga.
  if (segmentOkant) {
    console.log(`[benchmark] segmentet är antaget (industri/storlek ej observerade) — datapunkt EJ lagrad för ${category}`);
    return;
  }

  // Absoluta gränser: fångar test-uploads och extraheringsfel oavsett poolstorlek.
  // Under 500 kr/år = osannolikt reellt avtal. Över 5 M kr/år = utanför SMB-skalan.
  if (!annualCost || annualCost < 500 || annualCost > 5_000_000) return;

  // Enhetskarantän (per-användar-kategorier): om kostnaden per enhet hamnar
  // absurt långt från verifierat listpris är det nästan alltid ett enhetsfel
  // (totalkostnad lagrad som per-användare eller tvärtom) — en sådan punkt
  // förgiftar fördelningen och ska aldrig in i prisboken.
  if (seatCount > 0 && ['mobil', 'saas-productivity'].includes(category)) {
    try {
      const mock = getMockBenchmark({ category, industry, employees: employees ?? 5 });
      if (mock?.median > 0) {
        const perUnitYr = annualCost / seatCount;
        if (perUnitYr < mock.median * 0.1 || perUnitYr > mock.median * 10) {
          console.warn(`[benchmark] enhetskarantän: ${category} ${Math.round(perUnitYr)} kr/enhet/år utanför 0,1–10× listpris-median (${mock.median}) — datapunkt EJ lagrad`);
          return;
        }
      }
    } catch { /* fail-open: karantänen får aldrig blockera lagring av andra skäl */ }
  }

  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const bucket = bucketForSize(employees ?? 5);

  try {
    // ══ 3σ STRAFFADE OSS FÖR ATT VI FICK MER DATA (grundarbeslut 2026-09-10) ═══════════════
    // Produktionsloggen 9 sep, två gånger på tio minuter:
    //   outlier dropped — annualCost=272880 z=1028.99 mean=184663 stddev=86 n=24
    //   outlier dropped — annualCost=97531  z=1016.32 mean=184663 stddev=86 n=24
    //
    // En standardavvikelse på **86 kr** kring ett medelvärde på 184 663 kr är ingen fördelning.
    // Det är 24 näst intill identiska tal, och mot ett så smalt spann blir VARJE verkligt pris
    // ett extremvärde. Spärren stängde alltså dörren hårdare ju mer data vi samlade — samma
    // bakvända mekanik som när branschankaret tystnade av att vi fick mer nätverksdata.
    //
    // FELET ÄR MÅTTET, INTE IDÉN. Medelvärde och standardavvikelse är båda icke-robusta: de
    // dras mot varje klump, och en homogen cell kollapsar deras spann mot noll. Skyddet mot
    // enhetsfel behövs fortfarande (ett USD-belopp som lagras som SEK förgiftar prisboken i
    // åratal), så vakten byts ut — den tas inte bort.
    //
    // MEDIAN + MAD i stället: medianen flyttas inte av en klump, och MAD (median absolute
    // deviation) kan inte kollapsa av att många värden liknar varandra utan att det faktiskt
    // ÄR sant om cellen. Och när MAD ändå är noll — alla punkter identiska — säger vakten
    // «jag kan inte bedöma» och SLÄPPER IGENOM. Det är hela poängen: ett mått som inte kan
    // mäta får inte fälla, för då blir dess tystnad omöjlig att skilja från ett fynd.
    // 5 × MAD ≈ 3,4σ för normalfördelad data (σ ≈ 1,4826 × MAD) — alltså något MER tillåtande
    // än den gamla 3σ, medvetet, eftersom fakturadata är högersnedvriden.
    const statsRows = await db`
      SELECT annual_cost::float AS v
      FROM invoice_datapoints
      WHERE category    = ${category}
        AND industry    = ${ind}
        AND size_bucket = ${bucket}
    `;
    const varden = statsRows.map((r) => Number(r.v)).filter(Number.isFinite);
    const dom = bedomAvvikelse(annualCost, varden);

    if (dom.faller) {
      console.warn(
        `[benchmark] outlier dropped — category=${category} bucket=${bucket} annualCost=${annualCost} `
        + `avvikelse=${dom.kvot.toFixed(2)}×MAD median=${Math.round(dom.median)} mad=${Math.round(dom.mad)} n=${varden.length}`
      );
      notifyOutlier({ category, supplier, annualCost, bucket, zScore: dom.kvot, mean: dom.median, stddev: dom.mad, n: varden.length })
        .catch((err) => console.error('[benchmark] notifyOutlier threw:', err.message));
      return;
    }
    if (dom.skal) console.log(`[benchmark] avvikelsevakten avstod — ${dom.skal} (n=${varden.length})`);

    // ⚠️ KODEN FÅR ALDRIG NÅ PRODUKTIONEN FÖRE SITT SCHEMA — OCH ALDRIG TYST (2026-09-10).
    // Den fientliga granskaren körde EXAKT den här satsen mot produktionens Neon-databas i en
    // avsiktligt tillbakarullad transaktion och fick:
    //     column "pdf_hash" of relation "invoice_datapoints" does not exist
    // `migrate-all.yml` kördes senast 1 september. Satsen kastar alltså på ATT KOLUMNEN SAKNAS,
    // inte bara vid en verklig konflikt — och funktionens yttre `catch` loggade och gick vidare.
    // Följden hade varit att **100 % av nya datapunkter tappades tyst** från deploy till dess
    // någon råkade köra migreringen. Sviten var grön hela tiden (2 311/2 311), eftersom varje
    // test läser migreringsskriptets TEXT och aldrig produktionens schema. Ett grönt som betyder
    // «jag tittade inte», i den datamängd bibeln kallar moaten.
    //
    // Två saker rättas, och de är olika:
    //  1. Migreringen KÖRS före merge. Det löser i dag, inte i morgon.
    //  2. Ordningen görs omöjlig att missa TYST. Ett schemafel är inte samma sak som ett
    //     databasfel: det betyder «koden ligger före sitt schema» och kräver en människa. Därför
    //     egen logg med egen markör OCH ett andra försök utan dedup-satsen — fail-open på DATAN (AV-13)
    //     (datapunkten är kundens, inte vår att tappa), fail-LOUD på SCHEMAT (AV-13).
    try {
      await db`
        INSERT INTO invoice_datapoints (category, supplier, annual_cost, industry, size_bucket, pdf_hash)
        VALUES (${category}, ${supplier}, ${Math.round(annualCost)}, ${ind}, ${bucket}, ${pdfHash})
        ON CONFLICT (pdf_hash, category) WHERE pdf_hash IS NOT NULL DO NOTHING
      `;
    } catch (err) {
      // 42703 = undefined_column · 42P10 = invalid_column_reference (ON CONFLICT utan index).
      // Meddelandetexten läses också: neon-drivern skickar inte alltid vidare SQLSTATE.
      const schemafel = err.code === '42703' || err.code === '42P10'
        || /does not exist|no unique or exclusion constraint/i.test(err.message ?? '');
      if (!schemafel) throw err;
      console.error('[benchmark] SCHEMAFEL — dedup-migreringen har inte körts mot den här databasen. '
        + `Kör migrate-all.yml. Datapunkten skrivs UTAN dedup så den inte går förlorad. (${err.message})`);
      await db`
        INSERT INTO invoice_datapoints (category, supplier, annual_cost, industry, size_bucket)
        VALUES (${category}, ${supplier}, ${Math.round(annualCost)}, ${ind}, ${bucket})
      `;
    }
    // ── DEDUPLICERINGEN BOR I SKRIVNINGEN, INTE I DOMEN (2026-09-10, oraklets spricka 4) ────
    // Produktionsloggen: «avvikelsevakten avstod — för få SKILDA belopp (2 av 24 rader)». Cellen
    // var inte homogen; den var SAMMA FAKTURA lagrad tolv gånger. Avvikelsevakten deduplicerar
    // numera innan den dömer — men skrivningen fortsatte lägga en ny rad för varje omanalys, så
    // moaten själv fylldes med kopior, nu utan att något stoppade dem.
    //
    // Nyckeln är DOKUMENTET plus kategorin: en blandad faktura får legitimt ge en datapunkt per
    // kategori, aldrig två i samma. Äldre rader saknar `pdf_hash` och rörs inte — indexet är
    // partiellt, och en radering är grundarens beslut, aldrig kodens (samma linje som de 14
    // datapunkterna med antaget segment, 21 aug).
    //
    // Utan `pdfHash` (t.ex. en anropare som inte har dokumentet) skrivs raden som förut. Det är
    // medvetet fail-open (AV-09): hellre en dubblett än en tappad datapunkt, och avvikelsevaktens
    // deduplicering fångar den ändå vid läsning.
    const kv = getKv();
    if (kv) try { await kv.del(cacheKey(category, ind, bucket)); } catch { /* non-fatal */ }
  } catch (err) {
    console.error('[benchmark] storeDatapoint error:', err.message);
  }
}
