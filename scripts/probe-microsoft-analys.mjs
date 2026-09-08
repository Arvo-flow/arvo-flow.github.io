// scripts/probe-microsoft-analys.mjs — VAD PRODUCERADE MASKINEN FÖR GRUNDARENS MICROSOFT-FAKTURA?
//
// ══ VARFÖR (2026-09-08) ════════════════════════════════════════════════════════════════════
// Grundaren bad om en genomgång av ANALYSRESULTATET. Jag svarade med vad koden SKULLE göra i
// tre hypotetiska fall (seats 22/12/10 → +44/+164/+217 %). Det är inte en mätning — det är en
// modell av maskinen, och bibeln har nio dokumenterade fall där just det ledde fel.
//
// Fakturan är läst ur PDF:ens RÅA textoperatorer, alltså utan en enda tolkning på vägen:
//
//   MS-PREM   Microsoft 365 Business Premium              210.29   2 102.90   ← Antal-kolumnen TOM
//   MS-E3     Office 365 E3                        12     380.00   4 560.00
//                                       Moms (25%):  1 665.73 SEK
//                                       Att betala:  8 331.63 SEK   ← 3,00 kr mer än 6 662,90 + 1 665,73
//
// Pappret är MOTVITTNET. Sonden frågar inte «vad tycker maskinen» utan «vad läste maskinen, och
// stämmer det mot vad som står tryckt». Fyra frågor, var och en med sitt kända facit:
//
//   1. Bar Premium-raden ett `quantity`?  Pappret säger TOMT. Fyllde modellen i 10 har den utfört
//      finansiell aritmetik (2 102,90 ÷ 210,29) — förbjudet enligt regel 2, och talet bär då
//      precisionens auktoritet utan att stå på fakturan.
//   2. Vad blev `seat_count`?  Enda TRYCKTA antalet är 12 (E3-raden).
//   3. Vad blev `billing_period`?  Fakturan anger INGEN period. Ett årstal utan bestämd period
//      får inte hävdas (bibeln 24 aug) — så `annual_cost` mot ingen period är ett fynd i sig.
//   4. Vad blev `invoice_number`?  Textlagret bär numret som facit; formgrinden kan prövas.
//
// Och sedan det som faktiskt betyder något: sonden kör kundytans EGEN kedja
// (`lasLicensniva` → `nivaGolv` → `byggPrisunderlag` → `scoreUrUnderlag`) på de LAGRADE talen.
// Det är samma anropskedja som `api/invoice-history.mjs` kör vid varje läsning av rummet, med
// EN redovisad skillnad: sonden skickar inget kategoriankare (`p25`/`median` = null). Rummet
// skickar `branchAnchors[category]`. Skillnaden kan bara ha betydelse när nivån INTE är
// bekräftad — och i den här kategorin (`kraverBekraftadNiva`) uteblir avståndspåståendet ändå
// då. Är nivån bekräftad kommer golvet ur nivån, aldrig ur ankaret. Utfallet nedan är alltså
// kortets påstående, inte ett av mina tre hypotetiska — men skillnaden står skriven, inte dold.
//
// Den kedjan körs TVÅ gånger: med dagens kod och med den gamla `lasLicensniva`-semantiken
// (diskvalificerad rad = osynlig). Skillnaden mellan de två ÄR fixens verkan på kundens eget
// kort, mätt i stället för påstådd.
//
// SKRIVER ALDRIG. PDF:en skickas ALDRIG hit — repot är publikt. Sonden ser bara vad databasen
// redan innehåller och maskerar e-post före utskrift.
//
// FÅNGAR: skillnaden mellan «maskinen läste fakturan rätt» och «maskinen fyllde i luckorna
//   själv», och vilket avståndspåstående rummet faktiskt bar.
// BLIND: sonden ser den LAGRADE analysen, aldrig HTTP-svaret webbläsaren fick. Ett svar som
//   aldrig lagrades ser härifrån ut som «ingen analys» — därför rapporteras alltid antalet
//   funna rader, så att tomhet aldrig kan läsas som ett fynd. Den kan heller inte se vad
//   modellen SÅG men valde bort; bara vad som skrevs.

import { getDb } from '../lib/db.js';
import { lasLicensniva, nivaGolv } from '../lib/licensniva.js';
import { byggPrisunderlag, scoreUrUnderlag } from '../lib/prisunderlag.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

// ── PAPPRETS FACIT ─────────────────────────────────────────────────────────────────────────
// Avläst ur PDF:ens content stream, inte ur en modell. Allt nedan jämförs mot dessa tal.
const PAPPRET = {
  fakturanummer: 'MS-883391',   // pastaende-ok: fakturanummer ur textlagret, inte ett citerat test-ID
  radsumma:      6662.90,
  momsbelopp:    1665.73,
  attBetala:     8331.63,
  rader: [
    { beskrivning: 'Microsoft 365 Business Premium', antal: null, apris: 210.29, belopp: 2102.90 },
    { beskrivning: 'Office 365 E3',                  antal: 12,   apris: 380.00, belopp: 4560.00 },
  ],
};
const GLAPP = +(PAPPRET.attBetala - PAPPRET.radsumma - PAPPRET.momsbelopp).toFixed(2);

const db = getDb();
if (!db) {
  console.error('✗ ingen DATABASE_URL — sonden kom aldrig fram. Detta är INTE ett mätvärde.');
  process.exit(1);
}

const finns = await db`SELECT to_regclass('public.invoice_analyses') AS t`;
if (!finns?.[0]?.t) {
  console.error('✗ tabellen invoice_analyses FINNS INTE — migreringen har inte körts.');
  console.error('  (inte samma sak som «inga analyser», och får aldrig rapporteras som det)');
  process.exit(1);
}

// LK-01: en saknad kolumn ska SMÄLLA här, aldrig tyst utebli ur SELECT-satsen. Namnen är LÄSTA
// ur migreringarna (migrate.mjs CREATE-blocket + ADD COLUMN-raderna), aldrig gissade — en gissad
// kolumn ger «inget värde», och det svaret är omöjligt att skilja från «maskinen skrev inget».
const kolumner = new Set(
  (await db`SELECT column_name FROM information_schema.columns WHERE table_name = 'invoice_analyses'`)
    .map((r) => r.column_name)
);
const KRAVS = ['supplier', 'category', 'route', 'created_at', 'annual_cost', 'suggested_annual_cost',
  'gross_saving', 'should_switch', 'billing_period', 'seat_count', 'price_per_seat_monthly',
  'health_score', 'invoice_number', 'triage_reason', 'lead_finding_json', 'line_items_json'];
const saknade = KRAVS.filter((k) => !kolumner.has(k));
if (saknade.length) {
  console.error(`✗ kolumner saknas i invoice_analyses: ${saknade.join(', ')}`);
  console.error('  Sonden avbryter hellre än mäter ett halvt schema och kallar det ett utfall.');
  process.exit(1);
}

const rader = await db`
  SELECT id, supplier, category, route, created_at, annual_cost, suggested_annual_cost,
         gross_saving, should_switch, billing_period, seat_count, price_per_seat_monthly,
         health_score, invoice_number, triage_reason, lead_finding_json, line_items_json
  FROM invoice_analyses
  WHERE supplier ILIKE '%microsoft%' OR invoice_number = ${PAPPRET.fakturanummer}
  ORDER BY created_at DESC
  LIMIT 8`;

console.log('\n═══ GRUNDARENS MICROSOFT-FAKTURA — VAD MASKINEN FAKTISKT SKREV ═══');
console.log(`pappret:  radsumma ${PAPPRET.radsumma} + moms ${PAPPRET.momsbelopp} = `
  + `${(PAPPRET.radsumma + PAPPRET.momsbelopp).toFixed(2)} · fakturan begär ${PAPPRET.attBetala}`);
console.log(`          → ${GLAPP.toFixed(2)} kr utan täckning i någon rad`);
console.log(`rader hittade i produktionen: ${rader.length}`);
if (rader.length === 0) {
  console.log('\nINGEN Microsoft-analys är lagrad. Det betyder ett av två, och sonden kan inte skilja dem:');
  console.log('  · analysen kördes aldrig mot produktionen, eller');
  console.log('  · den kördes men lagringen felade (fakturan syns då inte i rummet heller)');
  process.exit(0);
}

const KAT = BRANCHINDEX['saas-productivity'];
const TIERS = KAT?.licenseTierBenchmarks ?? {};

/** Den GAMLA semantiken: en diskvalificerad rad var osynlig i stället för att räknas. */
function gammalLasLicensniva(poster) {
  const FAMILJ = /\b(?:microsoft\s*365|microsoft365|m365|ms365)\b/i;
  const DISK = /\boffice\s*365\b|\bcopilot\b|\bexkl\.?\s*teams\b/i;
  const ANNAN = /\bgoogle\b|\bworkspace\b|\bzoho\b|\bdropbox\b|\bslack\b|\batlassian\b|\bzoom\b/i;
  const N = [
    { k: 'business-basic',    re: /\bbusiness\s+basic\b/i,    familj: true },
    { k: 'business-standard', re: /\bbusiness\s+standard\b/i, familj: true },
    { k: 'business-premium',  re: /\bbusiness\s+premium\b/i,  familj: true },
    { k: 'e3', re: /\b(?:microsoft\s*365|m365|ms365)\s*e3\b/i },
    { k: 'e5', re: /\b(?:microsoft\s*365|m365|ms365)\s*e5\b/i },
  ];
  const traffar = new Map();
  for (const r of poster ?? []) {
    const t = String(r?.description ?? '').trim();
    if (!t || DISK.test(t) || ANNAN.test(t)) continue;   // ← raden försvann, det var felet
    for (const n of N) {
      if (n.familj && !FAMILJ.test(t)) continue;
      if (n.re.test(t) && !traffar.has(n.k)) traffar.set(n.k, t);
    }
  }
  if (traffar.size !== 1) return null;
  const [k, kalla] = [...traffar.entries()][0];
  return { nyckel: k, namn: k, kalla };
}

/** Kundytans egen kedja, körd på de LAGRADE talen. Samma anrop som api/invoice-history.mjs. */
function kortetsPastaende(niva, annualCost, seats) {
  const golv = niva ? nivaGolv(niva, TIERS) : null;
  const u = byggPrisunderlag({
    annualCost, seats,
    ankare: { p25: null, median: null, unitLabel: 'per användare/år',
              kraverBekraftadNiva: KAT?.kraverBekraftadNiva === true },
    niva: golv ? { ...golv, kalla: niva.kalla } : null,
  });
  return { underlag: u, score: scoreUrUnderlag(u) };
}

const kr = (v) => (v == null ? '—' : Number(v).toLocaleString('sv-SE'));

for (const r of rader) {
  console.log(`\n── ${r.created_at?.toISOString?.() ?? r.created_at} · id=${r.id} ─────────────────`);
  // ── FACIT GÄLLER EN FAKTURA, INTE ALLA (rättat efter första skarpa körningen) ─────────────
  // Frågan hämtar VARJE Microsoft-analys, men PAPPRET är grundarens ENA faktura. Första
  // körningen jämförde därför en analys från 14 augusti mot 8 septembers papper och skrev
  // «⚠ ingen Business Premium-rad lagrad, trots att den står på fakturan» plus «lagrad radsumma
  // 3 950 (pappret: 6 662,9)». Båda raderna SER ut som fynd och är artefakter av att jag höll
  // fel facit mot fel faktura. Tjugoförsta gången mätinstrumentet är felet, i sonden jag byggde
  // för att sluta modellera. Facit tillämpas nu bara på den rad som ÄR fakturan.
  const arFakturan = (() => {
    if (r.invoice_number && r.invoice_number === PAPPRET.fakturanummer) return true;
    const p = Array.isArray(r.line_items_json) ? r.line_items_json : null;
    if (!p || p.length !== PAPPRET.rader.length) return false;
    // Radsumman inom en krona (kronorfälten avrundar) OCH båda beskrivningarna matchar.
    const summa = p.reduce((s, x) => s + (Number(x.amount) || 0), 0);
    if (Math.abs(summa - PAPPRET.radsumma) > 1) return false;
    return PAPPRET.rader.every((pr) =>
      p.some((x) => String(x.description ?? '').toLowerCase().includes(pr.beskrivning.toLowerCase())));
  })();
  console.log(arFakturan
    ? '  ✓ DETTA ÄR grundarens faktura — pappret gäller som facit nedan'
    : '  (annan Microsoft-analys — pappret gäller INTE här, inga facit-jämförelser görs)');
  console.log(`leverantör: ${r.supplier} · kategori: ${r.category} · rutt: ${r.route}`
    + ` · skäl: ${r.triage_reason ?? '—'}`);

  // ── FRÅGA 4: fakturanumret, mot textlagrets facit ───────────────────────────────────────
  const nr = r.invoice_number ?? null;
  console.log(`fakturanummer: ${nr ?? '(inget)'} `
    + (nr == null ? '— formgrinden höll tillbaka det (fail-closed på fältet)'
      : nr === PAPPRET.fakturanummer ? '✓ stämmer mot textlagret' : ''));

  // ── FRÅGA 1: raderna, mot pappret rad för rad ───────────────────────────────────────────
  const poster = Array.isArray(r.line_items_json) ? r.line_items_json : null;
  if (!poster) {
    console.log('rader: INGA lagrade (line_items_json tom) — extraktionen nådde aldrig lagringen');
  } else {
    console.log(`rader: ${poster.length} (pappret har ${PAPPRET.rader.length})`);
    for (const p of poster) {
      console.log(`   · "${p.description ?? ''}" | antal=${p.quantity ?? 'null'} `
        + `| à=${p.unitPrice ?? '—'} | belopp=${p.amount ?? '—'} | type=${p.type ?? '—'}`);
    }
    // Premium-raden är provet: Antal-kolumnen är TOM på pappret.
    const prem = arFakturan
      ? poster.find((p) => /business\s+premium/i.test(String(p.description ?? '')))
      : null;
    if (!arFakturan) {
      // Tyst med FLIT: utan facit finns ingen fråga att besvara, och ett larm här hade varit
      // ett larm om fel faktura. Att inte säga något är rätt svar; att säga något vore ett fynd
      // ur tomhet.
    } else if (!prem) {
      console.log('   → ⚠ ingen Business Premium-rad lagrad, trots att den står på fakturan');
    } else if (prem.quantity == null) {
      console.log('   → ✓ Premium-radens antal är null — maskinen hittade inte på ett tal som saknas');
    } else {
      const harlett = Math.abs(Number(prem.quantity) - 10) < 0.001;
      console.log(`   → ✗ Premium-radens antal är ${prem.quantity}, men Antal-kolumnen är TOM på pappret.`);
      console.log(`     ${harlett
        ? 'Talet är 10 = 2 102,90 ÷ 210,29 — modellen har RÄKNAT, vilket regel 2 förbjuder.'
        : 'Talet finns varken tryckt eller härlett — det är en ren gissning.'}`);
    }
    const radsumma = poster.reduce((s, p) => s + (Number(p.amount) || 0), 0);
    console.log(`   → lagrad radsumma ${kr(radsumma.toFixed(2))}`
      + (arFakturan ? ` (pappret: ${kr(PAPPRET.radsumma)})` : ''));
  }

  // ── FRÅGA 2 + 3: seat_count och perioden ────────────────────────────────────────────────
  console.log(`seat_count: ${r.seat_count ?? 'null'}`
    + (arFakturan ? ' (enda TRYCKTA antalet på fakturan är 12 — Premium-radens antal saknas)' : ''));
  console.log(`billing_period: ${r.billing_period ?? 'null'}`
    + (arFakturan ? ' — fakturan anger INGEN period; ett årstal utan bestämd period får inte hävdas' : ''));
  console.log(`annual_cost: ${kr(r.annual_cost)} kr · pris/plats/mån: ${kr(r.price_per_seat_monthly)}`);
  console.log(`suggested: ${kr(r.suggested_annual_cost)} kr · bruttobesparing: ${kr(r.gross_saving)} kr `
    + `· shouldSwitch: ${r.should_switch}`);
  console.log(`lagrat health_score: ${r.health_score ?? 'null'}`);

  const lead = r.lead_finding_json;
  console.log(`fynd: ${lead && typeof lead === 'object'
    ? `${lead.type} · överbetalt=${kr(lead.overpaidToDate)} kr · årsimpact=${kr(lead.annualImpact)} kr`
    : 'inget lead_finding_json lagrat'}`);

  // ── DET SOM FAKTISKT BETYDER NÅGOT: vilket påstående bar rummet? ─────────────────────────
  if (poster && r.annual_cost > 0 && r.seat_count > 0) {
    const nyNiva  = lasLicensniva(poster);
    const gamNiva = gammalLasLicensniva(poster);
    const nu   = kortetsPastaende(nyNiva, r.annual_cost, r.seat_count);
    const forr = kortetsPastaende(gamNiva, r.annual_cost, r.seat_count);
    const visa = (namn, { underlag: u, score }) => {
      if (!u) { console.log(`   ${namn}: inget underlag — kortet säger ingenting`); return; }
      console.log(`   ${namn}: perEnhet ${kr(u.perEnhet)} kr · golv ${kr(u.golv)} kr · `
        + (u.ovissNiva ? 'INGET avstånd hävdat (oviss nivå)' : `avstånd ${u.avstandPct > 0 ? '+' : ''}${u.avstandPct} %`)
        + ` · nivåBekräftad=${u.nivaBekraftad}${u.nivaNamn ? ` (${u.nivaNamn})` : ''} · score ${score ?? '—'}`);
    };
    console.log('\n   RUMMETS PÅSTÅENDE, kört på de LAGRADE talen:');
    visa('FÖRE fixen ', forr);
    visa('EFTER fixen', nu);
    if (gamNiva && !nyNiva) {
      console.log('   → fixen tog bort ett avståndspåstående som vilade på EN av två licensprodukter.');
    } else if (!gamNiva && !nyNiva) {
      console.log('   → båda tiger. Fixen ändrade inget HÄR — nivån gick inte att bevisa ändå.');
    } else if (nyNiva) {
      console.log('   → nivån står kvar bekräftad; ingen annan produkt låg bredvid på fakturan.');
    }
  } else {
    console.log('\n   RUMMETS PÅSTÅENDE: kan inte återskapas — annual_cost eller seat_count saknas.');
    console.log('   (byggPrisunderlag returnerar null utan golv, antal eller kostnad — PU-04 —\n'
    + '    så kortet hade inte heller sagt något)');
  }
}

console.log('\n═══ SLUT ═══');
