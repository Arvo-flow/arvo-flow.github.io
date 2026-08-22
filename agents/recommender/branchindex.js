// agents/recommender/branchindex.js
// Benchmark index used by the Recommender.
// Three source tiers:
//   'real-public'  — verified public list prices (operator/vendor websites, 2026).
//                    AI may use exact language: "Listpriset är X kr."
//   'estimated'    — range-based market data from trade sources, not a single price.
//                    AI must hedge: "Branschstandarden ligger på ca X–Y kr."
//   'mock'         — internally modelled estimates; replaced with real aggregated
//                    Postgres data once ≥10 invoice datapoints per segment.
//                    AI must hedge: "Baserat på branschdata betalar jämförbara bolag..."
// Shape is stable across all tiers.

export const SOURCE = 'mixed';
export const SOURCE_NOTE =
  'Blandat: "real-public" kategorier använder verifierade listpriser 2026; övriga är estimat som ersätts med riktig aggregerad data (≥10 datapunkter/segment).';

// Categories with verified public list prices (operator/vendor websites).
// Frontend uses this set to decide whether to show real-price note or mandate CTA.
export const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'mobil']);

// User-facing industry keys (what the UI collects and the DB stores)
export const INDUSTRIES = [
  'ehandel', 'tillverkning', 'it-tech', 'bygg',
  'hotell', 'konsult', 'transport', 'vard', 'ovrigt',
];

// Maps user-facing keys → the benchmark segment that has real mock/DB data.
// Segments with dedicated data keep their own key; others fall back to the
// nearest segment until enough invoice datapoints accumulate.
export const INDUSTRY_SEGMENT_MAP = {
  ehandel:     'ehandel',
  tillverkning:'tillverkning',
  'it-tech':   'byraer',
  bygg:        'hantverkare',
  hotell:      'byraer',
  konsult:     'byraer',
  transport:   'hantverkare',
  vard:        'byraer',
  ovrigt:      'byraer',
};

export const SIZE_BUCKETS = [
  { id: 'micro', label: '1–9 anställda',   min: 1,  max: 9   },
  { id: 'small', label: '10–49 anställda', min: 10, max: 49  },
  { id: 'mid',   label: '50–249 anställda',min: 50, max: 249 },
];

export function bucketForSize(employees) {
  return SIZE_BUCKETS.find((b) => employees >= b.min && employees <= b.max)?.id ?? 'micro';
}

// All values SEK/year unless the note says "per användare/år".
export const BRANCHINDEX = {
  el: {
    source: 'estimated',
    volumeDataNote: 'Elkostnader styrs av faktisk förbrukning i kWh och nätavgift — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    // Kalibrering jan 2026 — verifierade komponenter (exkl. moms, SE3):
    //   Nordpool SE3 årssnitt 2025: 51,25 öre/kWh (källa: Elbruk/Elmarknad, Nord Pool).
    //   Nätavgift rörlig del (Ellevio SE3): ~26–39 öre/kWh (region-beroende).
    //   Energiskatt 2026: 36,0 öre/kWh (Skatteverket, sänkt 1 jan 2026 från 43,9 öre; Riksdagen nov 2025).
    //   Elhandlare påslag rörligt: ~5–10 öre/kWh (p25 = Tibber ~5, median ~8).
    //   All-in p25 (effektivt spotavtal, låg nätavgift): 51,25+5+26+36,0 = ~118 öre → ~1,18 kr/kWh.
    //   All-in median (standard rörligt): 51,25+8+32+36,0 = ~127 öre → ~1,27 kr/kWh.
    //   Kunder på äldre fast avtal betalar mer (~1,35–1,55 kr/kWh) — de ligger ovan median.
    note: 'Rörligt spotavtal + nätavgift + energiskatt (exkl. moms, SE3). Källa: Nordpool SE3 årssnitt 2025: 51,25 öre/kWh + nätavgift ~26–39 öre/kWh (Ellevio) + energiskatt 36,0 öre/kWh (Skatteverket 2026, sänkt 1 jan 2026) + elhandlare påslag ~5–10 öre = ~1,18–1,35 kr/kWh all-in exkl. moms. OBS: all-in-priset är STARKT storleksberoende — verifierade svenska företag <20 MWh/år betalar ~2,16 kr/kWh, 20–499 MWh ~1,26 kr/kWh, 500–1 999 MWh ~1,07 kr/kWh (Eurostat 2025-S2, se eurostatBands). Typisk förbrukning: micro ~10–15 MWh/år, small ~25–35 MWh/år, mid ~80–120 MWh/år.',
    // VERIFIERADE företagselpriser per förbrukningsband (Eurostat nrg_pc_205, icke-hushåll,
    // SE, allt-in EXKL moms). Hämtas/verifieras veckovis av scripts/verify.mjs eurostat-el (fabriken).
    // Roll 1 (GOLV): lib/el-intelligence.js floorar uppnåeligt all-in-pris vid bandet — ett bolag
    //   kan aldrig nå ett lägre pris än vad verifierade bolag i samma storleksband betalar, för
    //   nätavgiften (monopol) följer med vid leverantörsbyte. Förhindrar överskattad besparing för
    //   små förbrukare (regel 3/4) — den flata 0,32 kr/kWh-nätavgiften underskattade micro-golvet.
    // Roll 2 (MARKNADSPOSITION): "verifierade bolag i ert band betalar X kr/kWh" — moat-insikt ur
    //   publik data, storleksbaserad prisdiskriminering exponerad utan kohort.
    // Källa: Eurostat 2025-S2, verifierat live 2026-06-14 (216,01 / 125,87 / 107,06 öre/kWh).
    eurostatBands: {
      source: 'eurostat', sourceRef: 'nrg_pc_205', period: '2025-S2',
      lastVerified: '2026-08-22', basis: 'icke-hushåll, SE, allt-in exkl. moms',
      unit: 'kr_per_kwh',
      bands: [
        { maxMwh: 20,       allInKwh: 2.1601, label: '< 20 MWh/år (små bolag)' },
        { maxMwh: 500,      allInKwh: 1.2587, label: '20–499 MWh/år' },
        { maxMwh: Infinity, allInKwh: 1.0706, label: '500–1 999 MWh/år (stora)' },
      ],
    },
    alternatives: [
      { supplier: 'Tibber',       positioning: 'Spotpris per timme, ~5 öre/kWh påslag, app-drivet — lägst rörligt pris',        reliability: 0.92 },
      { supplier: 'Bixia',        positioning: '100 % förnybar el, transparent prissättning, konkurrenskraftigt rörligt avtal',  reliability: 0.94 },
      { supplier: 'Telge Energi', positioning: 'Lågt påslag, direktavtal med producenter',                                      reliability: 0.91 },
      { supplier: 'Mälarenergi',  positioning: 'Stabil regional aktör, god service, något högre påslag',                        reliability: 0.96 },
    ],
    // Metodologi (kalibrerad jan 2026):
    // Priser: median ~1,27 kr/kWh, p25 ~1,18 kr/kWh (se not ovan).
    // Byraer mid: 105 000 kWh (100-pers kontor, ~1 000 kvm × 105 kWh/kvm Energimyndigheten normtal).
    //   median = 105 000 × 1,27 = 133 350 → 131 000 kr.
    //   p25 = 75 000 kWh (nytt effektivt kontor) × 1,18 = 88 500 → 88 000 kr.
    // Övriga segment skalade proportionellt från original (±15 % av kalkyl).
    matrix: {
      byraer:      { micro: { median: 14500, p25: 10500 }, small: { median:  41500, p25:  31000 }, mid: { median: 131000, p25:  88000 } },
      hantverkare: { micro: { median: 25500, p25: 19500 }, small: { median:  78000, p25:  58500 }, mid: { median: 198000, p25: 148000 } },
      ehandel:     { micro: { median: 22500, p25: 17000 }, small: { median:  78000, p25:  58500 }, mid: { median: 198000, p25: 148000 } },
      tillverkning:{ micro: { median: 49500, p25: 36500 }, small: { median: 198000, p25: 148000 }, mid: { median: 592000, p25: 448000 } },
    },
  },

  mobil: {
    source: 'real-public',
    lastVerified: '2026-08-05',
    verifiedVia: 'playwright-live',
    unit: 'kr/år',
    // Vad talet är priset PÅ — kundytan skriver ut det, så att "billigaste publicerade pris"
    // aldrig läses som kundens egen leverantörs pris. Cellerna vaktas av lib/verifiers/tele2-mobil.mjs,
    // som läser matrisen direkt mot live-sidan (den enda verifieraren som gjorde det före 2026-08-18).
    referensProdukt: 'Tele2 Företag mobilabonnemang',
    // Prices are per user/year — lib/benchmark.js scales by seat count before the LLM sees it.
    // Tele2 Företag mobilabonnemang — verifierat LIVE 2026-08-05 (Playwright, status 200,
    // scripts/verify.mjs tele2-mobil (fabriken)). Renderade 24-mån-priser (= faktiskt B2B-pris):
    //
    // ⚠️ TELE2 HÖJDE (2026-08-05): live 269, 299, 349 kr/mth mot prisbokens 239, 279, 299.
    //   entrétier (lägsta)      239 → 269 kr/mth = 3 228 kr/yr  ← p25     (+12,6 %)
    //   näst lägsta             279 → 299 kr/mth = 3 588 kr/yr  ← median  (+7,2 %)
    //   tredje                  299 → 349 kr/mth                          (+16,7 %)
    // Låg oupptäckt i 52 dagar (verifierar-schemat avstängt) — samma smyghöjning som M365.
    //
    // ANKARETS DEFINITION (skärpt 2026-08-05): p25 = LÄGSTA publicerade 24-mån-pris, median =
    // NÄST LÄGSTA. Det är exakt vad verifieraren läser (sorterade priser), och det överlever
    // att Tele2 döper om sina planer. Tidigare band noten talen till plannamn ("60 GB",
    // "Obegränsad") som vakten aldrig kontrollerar — ett påstående utan täckning i mätningen.
    // Vi ankrar på 24-mån-priset (inte ordinarie sticker) eftersom ~all B2B-mobil säljs på
    // 24-mån bindning — det är vad bolag FAKTISKT betalar. Vakten går rött om priset/planen drivit.
    // Kollega-tillägg: 50 % rabatt på extra abonnemang kopplade till huvudabonnemang — publicerad
    //   rabatt men gäller sekundära SIM, ingår INTE i p25 (samma princip som tidigare volymrabatt).
    // NÄSTA VERIFIERING: vakten kör veckovis (måndagar) — manuell koll behövs bara vid rött bygge.
    note: 'Per användare/år (exkl. moms). Källa: Tele2 Företag mobilabonnemang, verifierat live 2026-08-05 — publicerade 24-mån-priser 269, 299 och 349 kr/mth (24 mån bindning, faktiskt B2B-pris). p25 = lägsta publicerade 24-mån-pris. Median = näst lägsta. Extra abonnemang via Kollega (50 % rabatt) ingår INTE i p25. Hårdvaruhyra klassificeras som hardware i extract.js och ingår INTE i besparingskalkylen.',
    alternatives: [
      { supplier: 'Tele2 Företag',   positioning: 'Entrétier 269 kr/mth, nästa nivå 299 kr/mth (24 mån) — ofta lägst faktiskt B2B-pris bland rikstäckande operatörer', reliability: 0.93 },
      { supplier: 'Tre Företag',     positioning: 'Stark datakapacitet, konkurrenskraftigt pris för obegränsad data',                                        reliability: 0.91 },
      { supplier: 'Telia Företag',   positioning: 'Rikstäckande nät, premium-support, volymavtal för större flottor',                                        reliability: 0.96 },
      { supplier: 'Telenor Företag', positioning: 'God täckning, flexibla volymavtal, konkurrenskraftig prissättning',                                       reliability: 0.92 },
    ],
    matrix: {
      // p25 = Tele2 lägsta verifierade 24-mån-pris (269 kr/mth × 12 = 3 228 kr/år) — ALLA buckets.
      // Median = Tele2 näst lägsta verifierade 24-mån-pris (299 kr/mth × 12 = 3 588 kr/år) — ALLA buckets.
      // Volymrabatter (Kollega 50 % på sekundära SIM) är inte baserade på huvudpriset → ingår ej i p25.
      byraer:      { micro: { median: 3588, p25: 3228 }, small: { median: 3588, p25: 3228 }, mid: { median: 3588, p25: 3228 } },
      hantverkare: { micro: { median: 3588, p25: 3228 }, small: { median: 3588, p25: 3228 }, mid: { median: 3588, p25: 3228 } },
      ehandel:     { micro: { median: 3588, p25: 3228 }, small: { median: 3588, p25: 3228 }, mid: { median: 3588, p25: 3228 } },
      tillverkning:{ micro: { median: 3588, p25: 3228 }, small: { median: 3588, p25: 3228 }, mid: { median: 3588, p25: 3228 } },
    },
  },

  vaxel: {
    source: 'estimated',
    unit: 'kr/år',
    // Intervallbaserade marknadsdata för molnväxel (UCaaS), per användarlicens.
    // Typiska priser maj 2026: 49–149 kr/mth/user.
    // p25 = 49×12 = 588 kr/user/år (basprodukt utan extras, t.ex. 3CX/Teams Phone Entry).
    // Median = ~99×12 = 1 188 kr/user/år (standard molnväxel med röstsvar, IVR, app).
    // OBS: Hårdvaruleasing (IP-telefoner) exkluderas — klassificeras som hardware i extract.js.
    // Snittkostnad per anställd abonnemang + växel: ~450 kr/mth (5 400 kr/år) per Telekom-kategoridata.
    note: 'Per användare/år (exkl. moms). Branschuppskattning: molnväxellicens 49–149 kr/mth/user. p25 = basprodukt ~49 kr/mth. Median = standard UCaaS ~99 kr/mth. Hårdvara (IP-telefoner) ingår ej — exkluderas ur kalkylen.',
    alternatives: [
      { supplier: 'Microsoft Teams Phone',  positioning: 'Tillägg till befintlig M365-licens — billigast om kunden redan har M365',              reliability: 0.94 },
      { supplier: '3CX',                    positioning: 'Open-source-baserad molnväxel, lägst TCO för upp till 20 interna användare',             reliability: 0.91 },
      { supplier: 'Telenor LINK',           positioning: 'Stark för bolag som vill ha mobil + växel i ett avtal, rikstäckande support',            reliability: 0.92 },
      { supplier: 'Telia Touchpoint',       positioning: 'Störst i Sverige, bra för multi-site med komplex samtalsstyrning',                       reliability: 0.95 },
    ],
    matrix: {
      byraer:      { micro: { median: 1188, p25:  588 }, small: { median: 1128, p25:  588 }, mid: { median: 1068, p25:  588 } },
      hantverkare: { micro: { median: 1188, p25:  588 }, small: { median: 1128, p25:  588 }, mid: { median: 1068, p25:  588 } },
      ehandel:     { micro: { median: 1188, p25:  588 }, small: { median: 1128, p25:  588 }, mid: { median: 1068, p25:  588 } },
      tillverkning:{ micro: { median: 1188, p25:  588 }, small: { median: 1128, p25:  588 }, mid: { median: 1068, p25:  588 } },
    },
  },

  bredband: {
    source: 'real-public',
    lastVerified: '2026-08-22',
    verifiedVia: 'tele2-address-api',
    // GENOMBROTT 2026-06-14 (7 sond-rundor): Tele2:s adress→pris-API reverse-engineerat —
    // två rena publika JSON-endpoints (feasibility/addresses + broadband/products) som ger
    // adress- OCH nät-specifika priser. Inget rikstäckande listpris finns; priset beror på
    // vilket NÄT som når adressen. Bekräftat empiriskt:
    //   • "Max" (Tele2 COAX): nationellt enhetligt — 1200/100 = 319 kr/mån exkl (12 mån)
    //   • "Standard" (öppet fiber/LAN): dyrare, varierar — 1000/1000 = 487 kr/mån exkl (12 mån)
    // DÄRMED är det gamla statiska "849 kr" (företagskatalog) FELAKTIGT som rikstäckande ankare —
    // det skapade el-liknande falska besparingar på en adressberoende marknad. Ersatt av tele2Verified
    // nedan + veckovis driftvakt (scripts/verify.mjs tele2-bredband (fabriken), replayar 3 fasta adresser).
    continuousVerification: true,
    // Verifierade Tele2 REGULAR-priser (kr/mån EXKL moms), live 2026-06-17 via API:t.
    // Driftvakten resolvar dessa adresser → API → jämför mot priserna. Rött vid drift.
    tele2Verified: {
      source: 'tele2-address-api', lastVerified: '2026-08-18', unit: 'kr_per_manad_exkl_moms',
      verifyAddresses: ['Götgatan 92B, Stockholm', 'Sturegatan 33, Sundbyberg', 'Storgatan 41F, Östersund'],
      // family Max = Tele2 COAX (nationellt enhetligt, 12 mån bindning).
      // Prissänkning verifierad 2026-06-17 (vakten larmade): 263/319/335 → 239/279/319.
      // ANDRA SÄNKNINGEN, verifierad 2026-08-18: 239/279/319 → 199/239/279 (−40 kr rakt av).
      // Vakten larmade två nätter i rad (17 och 18 aug) med identiska tal på ALLA TRE adresser
      // — Stockholm, Sundbyberg och Östersund — vilket är både stabilitet över tid och
      // geografisk bekräftelse. Källan är Tele2:s adress-API (JSON, deterministisk läsning,
      // inget modellanrop), så talen är avlästa och inte tolkade.
      //
      // "ankare max 1200 Mbit (ej funnet)" i samma rapport var en FÖLJD av driften, inte ett
      // eget fel: ankarkontrollen bekräftas bara av en adress vars pris MATCHAR det lagrade.
      // Produkten fanns hela tiden, till 279 kr. Efter den här uppdateringen bekräftas den igen.
      //
      // Riktningen är obekväm för oss och det ändrar ingenting: ett lägre verifierat golv gör
      // att bredbandskunder ser mindre överbetalande ut, alltså mindre besparing och lägre
      // success fee. Prisboken följer källan, aldrig vårt intäktsintresse (grundarbeslut
      // 2026-08-18: "vi ska ALDRIG ha med ett pris som vi inte kan backa upp" — och lika lite
      // ett pris vi kan backa upp men som råkar gynna oss att låta stå kvar inaktuellt).
      max: { 250: 199, 500: 239, 1200: 279, 2500: 279, bindingMonths: 12 },
      // family Standard = öppet fiber/LAN (12 mån bindning)
      standard: { 100: 399, 250: 415, 500: 455, 1000: 487, bindingMonths: 12 },
    },
    unit: 'kr/år',
    note: 'Bredband per adress — priset beror på vilket NÄT som når adressen (inget rikstäckande listpris). Verifierat live mot Tele2:s adress-API 2026-08-18 (exkl moms): "Max"/COAX nationellt enhetligt (1200 Mbit 279 kr/mån, 12 mån), "Standard"/öppen fiber dyrare (1000 Mbit 487 kr/mån, 12 mån). Adresser utan Tele2-nät har inget fast erbjudande (bara mobilt). Benchmarken är hastighetsbaserad och härleds i kod ur tele2Verified (bredbandSpeedBenchmark) — inga legacy-estimat finns kvar. Utan känd hastighet finns ingen verifierbar benchmark (Zero Trust: ingen gissad siffra).',
    alternatives: [
      { supplier: 'Tele2 Bredband Max (COAX)',     positioning: 'Verifierat via adress-API 2026-08-18: 1200/100 Mbit 279 kr/mån exkl (12 mån) — nationellt enhetligt där COAX-nätet når',  reliability: 0.95 },
      { supplier: 'Tele2 Bredband Standard (fiber)', positioning: 'Verifierat: 1000/1000 Mbit 487 kr/mån exkl (12 mån) — öppna fibernät, dyrare än COAX',                        reliability: 0.95 },
      { supplier: 'Bahnhof Företag',                positioning: 'Svensk support, statisk IP, stark SLA — offert per adress (ej i Tele2-API:t)',                                  reliability: 0.94 },
    ],
    // INGEN matrix/speedTierBenchmarks: bredband-benchmarken är hastighetsbaserad och härleds
    // deterministiskt ur tele2Verified via bredbandSpeedBenchmark() (regel 1, en sanning).
    // getBenchmark() returnerar därför null för bredband — konsumenterna (recommend.js,
    // secondary-savings.js) anropar bredbandSpeedBenchmark(speedMbit) med känd hastighet.
  },

  // ── Molnväxel / företagstelefoni (Vallgrav-kategorin) ────────────────────────────
  // Verifierat ankare: Telia Smart Connect (ersätter Touchpoint). Stealth-verifierat 2026-06-18.
  // EXKL MOMS bekräftat 2026-06-18 (telia.se/foretag/priser: "priser för abonnemang, tjänster,
  // samtal och produkter är exklusive moms"). Ingen FX. "från"-priser = instegsgolv per nivå.
  // Kanonisk T1/T2/T3-axel (lib/telekom-normalize.js) + k-anonym tvärkund-jämförelse (Vallgraven).
  // Telavox tillkommer som leverantör 2 när dess moms-bas bekräftats (prissida saknar markör).
  molnvaxel: {
    source: 'real-public',
    unit: 'kr/år',
    canonicalTiers: { T1: 'Samtal', T2: 'Proffs', T3: 'Kontaktcenter' },
    teliaVerified: {
      product: 'Telia Smart Connect',
      source: 'telia.se/foretag/vaxlar/vaxel-sma-foretag',
      vatBasis: 'exkl',
      vatConfirmedAt: '2026-06-18',
      lastVerified: '2026-06-18',
      // kr/användare/mån EXKL moms — "från" (instegsgolv). T3 = skräddarsy/offert (inget fast listpris).
      tiers: {
        T1: { plan: 'Smart Connect uppsättning 1', fromMonthly: 89 },
        T2: { plan: 'Smart Connect uppsättning 2', fromMonthly: 118 },
      },
      // Exakta verifierade tilläggspriser (kr/mån exkl moms) — grund för add-on-rätt-storlek.
      addons: { softphone: 29, funktionsnummer: 99, extraNummer: 39 },
    },
    note: 'Molnväxel per användare/mån (exkl moms). Verifierat ankare: Telia Smart Connect — instegsgolv T1 från 89 kr, T2 från 118 kr (telia.se, exkl moms bekräftat 2026-06-18). Tilläggspriser exakta: softphone 29, funktionsnummer 99, extra nummer 39 kr/mån. Kanonisk T1/T2/T3 + k-anonym tvärkund-jämförelse.',
    alternatives: [
      { supplier: 'Telia Smart Connect', positioning: 'Marknadens instegsväxel för SMF — från 89 kr/anv/mån exkl moms (T1), ersätter Touchpoint', reliability: 0.95 },
      { supplier: 'Telavox',             positioning: 'Bundlar mobil+växel (Premium 399, Max 549) — stark app; moms bekräftas innan listpris visas', reliability: 0.90 },
    ],
  },

  kortterminal: {
    source: 'estimated',
    unit: 'kr/år',
    // Transaktionsavgifter maj 2026 (Sverige, exkl. moms). OBS: Exakta priser varierar med avtalsvolym.
    // SumUp Sverige: ~1,75 % per transaktion (startpriset 1,49 % höjt; verifierad av abonnemang.se maj 2026).
    // Zettle by PayPal: 1,75 % per transaktion (verifierat för kort-i-present, EU-marknader).
    // Stripe Terminal EEA: ~1,50 % + ~1,50 kr/transaktion (europeisk card-present-rate, ej US-priser).
    // Kortvolymer uppskattade (ingen offentlig källa): micro ~500 kkr/år, small ~2 Mkr/år, mid ~8 Mkr/år.
    // Tillverkning halverad (mestadels B2B-fakturering, låg kortandel).
    // p25 = Stripe/billigaste spotavtal ~1,50 %. Median = SumUp/Zettle standardrate ~1,75 %.
    note: 'Transaktionsavgifter per år (uppskattad kortvolym × rate). VERIFIERADE rates live 2026-06-14: Zettle 1,85 %, Stripe Terminal 1,4 % + 1,00 kr (EES-kort, card-present). SumUp ~1,75–1,95 % (publicerar ej rate på lättskrapad sida). OBS: kr/år är "estimated" (inte "real-public") eftersom kortvolym per segment är uppskattad — ratet är verifierat, volymen är det inte. För en riktig faktura jämförs kundens faktiska rate mot det verifierade bandet.',
    // VERIFIERADE transaktionsrater (card-present, Sverige, exkl moms) — hämtas/verifieras
    // veckovis av scripts/verify.mjs kortterminal (fabriken). Roll: ankra rate-bandet (det
    // verifierbara). kr/år-matrisen förblir estimat (kortvolym saknar offentlig källa, som el:s kWh).
    verifiedRates: {
      source: 'official_web', lastVerified: '2026-06-14',
      basis: 'card-present, Sverige, exkl. moms',
      rates: [
        { supplier: 'Stripe Terminal',  pct: 1.40, fixed: 1.00, url: 'https://stripe.com/se/terminal',     note: 'EES-kort; non-EES online 2,9 % + 1 kr' },
        { supplier: 'Zettle by PayPal', pct: 1.85, fixed: 0.00, url: 'https://www.zettle.com/se/priser',    note: 'korttransaktionsavgift, ingen månadsavgift' },
      ],
    },
    alternatives: [
      { supplier: 'Stripe Terminal',  positioning: 'Lägst rate: 1,4 % + 1,00 kr (EES-kort, verifierat 2026-06-14) — bäst om kunden redan har Stripe online', reliability: 0.97 },
      { supplier: 'SumUp',            positioning: '~1,75–1,95 % per transaktion, ingen månadsavgift — enkel setup, lägst kostnad för låg-volym', reliability: 0.91 },
      { supplier: 'Zettle by PayPal', positioning: '1,85 % per transaktion (verifierat 2026-06-14), ingen månadsavgift, stark app-integration', reliability: 0.93 },
      { supplier: 'Klarna Checkout',  positioning: 'Bäst för e-handel: integrerad checkout med bnpl och kortbetalning',                   reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median:  8750, p25:  7500 }, small: { median:  35000, p25:  30000 }, mid: { median: 140000, p25: 120000 } },
      hantverkare: { micro: { median:  8750, p25:  7500 }, small: { median:  35000, p25:  30000 }, mid: { median: 140000, p25: 120000 } },
      ehandel:     { micro: { median:  8750, p25:  7500 }, small: { median:  35000, p25:  30000 }, mid: { median: 140000, p25: 120000 } },
      tillverkning:{ micro: { median:  4375, p25:  3750 }, small: { median:  17500, p25:  15000 }, mid: { median:  70000, p25:  60000 } },
    },
  },

  'faktura-tjanst': {
    source: 'estimated',
    unit: 'kr/år',
    // Fortnox/Visma har inbyggd e-faktura utan tilläggskostnad (p25 = 0 för de som använder inbyggd).
    // Billogram listpris maj 2026: från 299 kr/mån (Starter, upp till 50 fakturor/mån).
    // Medianbolag betalar extra för automatiska påminnelser, SMS-notiser, fakturabevakning.
    note: 'Utskickstjänst utöver bokföringssystemets inbyggda e-faktura. Källa: Billogram Starter från 299 kr/mån (maj 2026). p25 = 0 kr för bolag som använder Fortnox/Visma inbyggd e-faktura. Median = tredjepartstjänst med påminnelse-automatik.',
    alternatives: [
      { supplier: 'Fortnox e-faktura (inbyggd)', positioning: 'Ingår i Fortnox-licens, ingen extra kostnad', reliability: 0.95 },
      { supplier: 'Visma e-faktura (inbyggd)',   positioning: 'Ingår i Visma eEkonomi',                      reliability: 0.95 },
      { supplier: 'Billogram',                   positioning: 'Modern UX, automatiska påminnelser',          reliability: 0.93 },
    ],
    matrix: {
      byraer:      { micro: { median: 1800, p25:    0 }, small: { median:  4800, p25:    0 }, mid: { median: 14400, p25: 1800 } },
      hantverkare: { micro: { median: 1800, p25:    0 }, small: { median:  4800, p25:    0 }, mid: { median: 14400, p25: 1800 } },
      ehandel:     { micro: { median: 2400, p25:    0 }, small: { median:  8400, p25: 1800 }, mid: { median: 28800, p25: 4800 } },
      tillverkning:{ micro: { median: 1800, p25:    0 }, small: { median:  6000, p25:    0 }, mid: { median: 19200, p25: 2400 } },
    },
  },

  'leasing-bil': {
    source: 'estimated',
    requiresVolumeData: true,
    volumeDataNote: 'Billeasingkostnader styrs av antal fordon, modell och avtalsvillkor — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Per leasad servicebil. Restvärde + service inräknat.',
    alternatives: [
      { supplier: 'Arval Sverige', positioning: 'Skandinavisk aktör, stark service-paket',           reliability: 0.95 },
      { supplier: 'Lease Plan',    positioning: 'Internationell flotta, bra för >5 bilar',           reliability: 0.94 },
      { supplier: 'Volvofinans',   positioning: 'Specialiserad på Volvo-bilar, lokal närvaro',       reliability: 0.96 },
      { supplier: 'Autoplan',      positioning: 'Småskalig, flexibla villkor, mid-tier prissättning', reliability: 0.91 },
    ],
    matrix: {
      byraer:      { micro: { median:  48000, p25:  38000 }, small: { median:  360000, p25:  290000 }, mid: { median: 1200000, p25:  950000 } },
      hantverkare: { micro: { median:  54000, p25:  42000 }, small: { median:  480000, p25:  380000 }, mid: { median: 1800000, p25: 1400000 } },
      ehandel:     { micro: { median:  48000, p25:  38000 }, small: { median:  360000, p25:  290000 }, mid: { median: 1200000, p25:  950000 } },
      tillverkning:{ micro: { median:  60000, p25:  48000 }, small: { median:  540000, p25:  430000 }, mid: { median: 1800000, p25: 1400000 } },
    },
  },

  'forsakring-foretag': {
    source: 'mock',
    unit: 'kr/år',
    note: 'License-pending — Recommender markerar dessa för VIP-kö, inte direkt byte.',
    alternatives: [
      { supplier: 'If Skadeförsäkring', positioning: 'Industrispecifik prissättning, bra för bygg/VVS',     reliability: 0.95 },
      { supplier: 'Trygg-Hansa',        positioning: 'Bredd över alla branscher, etablerad SLA',            reliability: 0.94 },
      { supplier: 'Länsförsäkringar',   positioning: 'Lokal närvaro, stark för mindre bolag',               reliability: 0.96 },
      { supplier: 'Gjensidige Företag', positioning: 'Konkurrenskraftiga premier, mid-tier service',        reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median:  18000, p25:  12000 }, small: { median:  60000, p25:  42000 }, mid: { median:  240000, p25: 180000 } },
      hantverkare: { micro: { median:  36000, p25:  24000 }, small: { median:  96000, p25:  60000 }, mid: { median:  400000, p25: 280000 } },
      ehandel:     { micro: { median:  24000, p25:  16000 }, small: { median:  84000, p25:  56000 }, mid: { median:  320000, p25: 220000 } },
      tillverkning:{ micro: { median:  48000, p25:  32000 }, small: { median: 180000, p25: 120000 }, mid: { median:  720000, p25: 480000 } },
    },
  },

  'saas-productivity': {
    source: 'real-public',
    unit: 'kr/år',
    // ── TALEN HÄRLEDS UR DEN VERIFIERADE NIVÅN — ALDRIG SKRIVNA FÖR HAND ──────────────────────
    // GRUNDARBESLUT 2026-08-18: "Vi ska ALDRIG ha med ett pris som vi inte kan backa upp."
    //
    // Här stod `p25: 1704` och `median: 2880` som nakna literaler i matrisen. p25 matchade INGET
    // verifierat pris — inte det aktuella (133,82 × 12 = 1 606), inte det före augustikorrigeringen
    // (119,48 × 12 = 1 434), och inte ens vad notten själv påstod (1 428). Talet gick inte att
    // härleda ur någonting i repot. Median var enligt notens egna ord "typisk återförsäljarpris
    // med standardpåslag" — ett estimat, presenterat under source: 'real-public'.
    //
    // Båda nådde kunden. Ankarkortet skrev ut medianen som "leverantörernas publika listpris", och
    // scoren mäts mot p25 (`_floor = benchmark.p25 × seats` i recommend.js). Ett osourcat golv gör
    // varje score som vilar på det osourcat — och den 2026-08-16 blev golvet dessutom SYNLIGT i
    // rummet ("Så landade vi i talet"), vilket är vad som avslöjade det.
    //
    // VARFÖR INGEN VAKT FÅNGADE DET: price-audit och alla 19 verifierare läser
    // `licenseTierBenchmarks`. Kunden ser `matrix`. Ingen kontroll i repot rörde matrisen — tjugo
    // gröna vakter som bevakade tal som aldrig når kundytan. Samma sjukdom som E3/E5-luckan, men
    // ett steg värre: där mätte kontrollen på för grov granularitet, här mätte den ett annat objekt.
    // Maskinvakt: tests/matriskrav.mjs (varje real-public-cell måste räknas hem mot en verifierad
    // nivå via `cellHarledning` nedan).
    //
    // Bransch-/storleksvariationen (byraer 2 880 · hantverkare 2 400 · micro/small/mid…) är också
    // borta. Microsoft tar inte olika betalt av en byrå och en hantverkare — spridningen var
    // uppfunnen. Ett LISTPRIS varierar inte med kundens SNI-kod. Den dagen vi har kohortdata
    // återkommer variationen som en MÄTNING, med "median av verifierade fakturor" i etiketten.
    //
    // De två talen är två verkliga sätt att köpa SAMMA licens, båda publika, båda från samma sida
    // och samma datum:
    //   p25    = årsavtal (billigaste publicerade sättet att köpa den)
    //   median = månadsvis utan bindning (ordinarie listpris — taket att mäta mot)
    // Vad talet är priset PÅ. En CFO som läser "billigaste publicerade pris" på en Google-rad
    // antar annars att det är Googles pris — det är det inte. Ett pris utan produkt är ett tal
    // utan påstående, och kundytan måste kunna skriva ut det.
    referensProdukt: 'Microsoft 365 Business Standard',
    // ── ETT GOLV DUGER BARA NÄR PRODUKTVALET INTE AVGÖR TALET (granskning 2026-08-20) ────────
    // Uppmätt spännvidd mellan kategorins billigaste och dyraste verifierade SEK-nivå:
    //   business-basic 803 · business-standard 1 606 · business-premium 2 523 · E3 5 001 · E5 7 694
    //   → 9,6 gånger mellan lägst och högst.
    // En kund som betalar EXAKT listpris för E5 hamnar därför +379 % över kategorins golv och får
    // score 15. Det är inte en mätning av priset — det är en mätning av vilken produkt kunden valt,
    // förklädd till ett omdöme om vad hen betalar. Och det slår åt kundens nackdel.
    //
    // Jämför mobil (1,1× mellan billigaste och dyraste abonnemang): där ÄR kategorins golv rätt
    // jämförelse, för produkterna är utbytbara. Skillnaden är mätt, inte tyckt.
    //
    // Regeln: i den här kategorin krävs en BEKRÄFTAD licensnivå för att vi ska hävda ett avstånd
    // eller sätta ett score. Utan den visar vi vad kunden betalar och vad billigaste jämförbara
    // kostar — men gör inget påstående om hur långt ifrån de ligger.
    // Maskinvakt: tests/matriskrav.mjs MK-09 kräver att flaggan matchar den uppmätta spännvidden.
    kraverBekraftadNiva: true,
    cellHarledning: {
      referensTier: 'business-standard',
      p25Falt:      'msrpAnnual',      // årsavtal → billigaste publicerade pris
      medianFalt:   'msrpMonthly',     // månadsvis → ordinarie listpris utan bindning
      faktor:       12,                // per månad → per användare/år
    },
    note: 'Per användare/år (exkl. moms). Referensprodukt: M365 Business Standard (microsoft.com). Billigaste publicerade pris = årsavtal 133,82 kr/mån × 12 = 1 606 kr/år. Listpris utan bindning = 160,58 kr/mån × 12 = 1 927 kr/år. Verifierat 2026-08-05.',
    alternatives: [
      { supplier: 'Microsoft 365 Business Standard',  positioning: 'Rätt tier för de flesta SMF — Teams, SharePoint, Exchange, 1 TB OneDrive. Väsentligt lägre än E3/E5.', reliability: 0.97 },
      { supplier: 'Google Workspace Business Standard',          positioning: 'Starkaste alternativet till M365 — 2 TB Drive, Meet, Docs. Ofta 30–40 % billigare än M365.',            reliability: 0.96 },
      { supplier: 'Microsoft 365 Business Premium',              positioning: 'För bolag med säkerhetskrav (Intune, Defender) utan behov av E5-compliance-funktioner.',               reliability: 0.97 },
      { supplier: 'Zoho Workplace',                              positioning: 'Budgetalternativ med e-post, docs och CRM-integration — lägst TCO för enkla behov.',                  reliability: 0.89 },
    ],
    licenseTierBenchmarks: {
      // ─────────────────────────────────────────────────────────────────────
      // PRISSTRATEGI:
      //   Microsoft 365  → SEK-priser från microsoft.com/sv-se (publik prissida).
      //                    Business-tiers (basic/standard/premium) re-verifieras
      //                    automatiskt via scripts/verify.mjs m365 (fabriken) på
      //                    GitHub Actions-runnern (obockerad egress) — driftlarm,
      //                    aldrig tyst överskrivning (parse-fel får ej korrumpera
      //                    prisboken). Källa: microsoft.com direktverifierat 2026-06-14.
      //                    NÄSTA VERIFIERING: 2026-09-01
      //                    OBS: arvoAnnual = msrpAnnual (inget Microsoft-partnerskap
      //                    aktivt ännu — uppdatera när partneravtal tecknas).
      //
      //   Google/Slack/   → USD-baspris × live SEK/USD (Riksbanken/ECB dagligen).
      //   Zoom/Atlassian    usdMonthly/usdAnnual anger publik MSRP i USD.
      //
      //   ⚠️ PÅHITTADE PARTNERRABATTER BORTTAGNA (grundarfynd 2026-08-05). Elva tiers bar
      //   usdArvoAnnual = listpris × 0,85 — ett "Arvo-partnerpris" som ALDRIG existerat.
      //   Fältet var inte vilande: recommend.js konverterar det till SEK (arvoAnnual) och
      //   `bm.arvoAnnual ?? bm.msrpAnnual` gör det till MÅLPRISET kunden ser. Varje kund med
      //   Slack/Zoom/Google/Pipedrive/HubSpot/Zoho fick alltså ett mål 15 % under verkligt
      //   publikt listpris — en besparing byggd på en rabatt som inte finns.
      //   Detta bryter mot neutralitets-moaten (GRUNDARBESLUT 2026-06-19, icke-förhandlingsbart):
      //   arvoAnnual-vägen ska ALDRIG fyllas; enda ankaret är verifierat PUBLIKT listpris.
      //   Maskinlås: tests/branchindex.mjs — ingen tier får bära ett arvo-pris under listpriset.
      //                    Källa: respektive prissida, verifierad nedan.
      //                    SEK-värdena (msrpMonthly/msrpAnnual) beräknas runtime
      //                    av recommend() via pricing.js — sparas EJ här.
      // ─────────────────────────────────────────────────────────────────────

      // Microsoft 365 — SEK-priser från microsoft.com/sv-se (publik prissida).
      //
      // ⚠️ MICROSOFT HÖJDE (verifierat live 2026-08-05, per-plan-sidorna, ops/probe-m365-priser.txt):
      //   Business Basic     57,40 → 66,91 kr/anv/mån (årsavtal)  = +16,6 %
      //   Business Standard 119,48 → 133,82 kr/anv/mån (årsavtal)  = +12,0 %
      //   Business Premium  210,29 → 210,29 kr — OFÖRÄNDRAT
      // Höjningen låg oupptäckt i 52 dagar (verifierar-schemat var avstängt) medan prisboken
      // uppgav de gamla talen som "verifierat listpris". Smyghöjningen — i vårt eget ankare.
      //
      // COPILOT-FÄLLAN (varför fabriken sa "(saknas)" för Standard/Premium): översiktssidan
      // (…/microsoft-365-plans-and-pricing) visar inte längre de rena planerna — bara
      // "Business Standard OCH Microsoft 365 Copilot för företag" 224,63 kr resp. Premium+Copilot
      // 305,87 kr. En slarvigare verifierare hade tagit 224,63 som Standard och jämfört kundens
      // rena licens mot ett Copilot-paket. Att den vägrade var maskinen som SKYDDADE oss.
      // Därför ankrar vi nu på PER-PLAN-sidorna, och verifieraren avvisar Copilot-kontext.
      //
      // arvoAnnual = msrpAnnual, ALLTID. Partner-/återförsäljarvägen är förkastad för alltid
      // (GRUNDARBESLUT 2026-06-19, neutralitets-moaten) — fältet ska aldrig bära ett partnerpris.
      'business-basic': {
        msrpMonthly: 80.29, msrpAnnual: 66.91, arvoAnnual: 66.91,
        currency: 'SEK', lastVerified: '2026-08-22', source: 'microsoft.com',
        note: 'M365 Business Basic — Teams, Exchange, webb-appar, 1 TB OneDrive. Ingen desktop Office-suite.',
      },
      'business-standard': {
        msrpMonthly: 160.58, msrpAnnual: 133.82, arvoAnnual: 133.82,
        currency: 'SEK', lastVerified: '2026-08-22', source: 'microsoft.com',
        note: 'M365 Business Standard — full desktop Office, Teams, SharePoint, 1 TB OneDrive. Vanligast bland svenska SMF.',
      },
      'business-premium': {
        msrpMonthly: 252.35, msrpAnnual: 210.29, arvoAnnual: 210.29,
        currency: 'SEK', lastVerified: '2026-08-22', source: 'microsoft.com',
        note: 'M365 Business Premium — inkl. Intune MDM + Microsoft Defender for Business. Rätt val vid säkerhetskrav.',
      },
      // OBS: Microsoft 365 E3/E5 ≠ Office 365 E3/E5 (separata produkter).
      // Dessa priser avser Microsoft 365 E3/E5 — den fullständiga sviten med
      // Intune MDM, Defender for Business och Purview compliance.
      // Office 365 E3 (äldre, utan säkerhetspaketet) kostar 256,34 kr/user/mth.
      // Månadsvis flex estimerat: årsavtal × 1,20 (konsekvent med Business-tiers).
      // Källa: microsoft.com/sv-se/microsoft-365/enterprise (enterprise plans page).
      //
      // ⚠️ ÄVEN ENTERPRISE HÖJDES (verifierat live 2026-08-05, ops/probe-prisbok.txt):
      //   E3  384,70 → 416,77 kr/anv/mån (årligt åtagande) = +8,3 %
      //   E5  609,10 → 641,18 kr/anv/mån (årligt åtagande) = +5,3 %
      // Sidan listar även EES-varianter utan Teams (E3 335,04 · E5 559,44) och en ny E7-nivå
      // (1 013,97) — INGA av dem är våra tiers och de får aldrig läsas som E3/E5.
      // msrpMonthly är fortsatt ett MÄRKT estimat (årsavtal × 1,20) — Microsoft publicerar inte
      // månadsåtagande för enterprise på sidan. Estimatet räknas om med det nya årspriset.
      'e3': {
        msrpMonthly: 500.12, msrpAnnual: 416.77, arvoAnnual: 416.77,
        currency: 'SEK', lastVerified: '2026-08-22', source: 'microsoft.com',
        note: 'M365 E3 — enterprise compliance, eDiscovery, avancerat auditlogg, Purview. Sällan motiverat under 100 users. Förväxla ej med Office 365 E3 (256 kr).',
      },
      'e5': {
        msrpMonthly: 769.42, msrpAnnual: 641.18, arvoAnnual: 641.18,
        currency: 'SEK', lastVerified: '2026-08-22', source: 'microsoft.com',
        note: 'M365 E5 — full SIEM, Defender for Endpoint, Power BI Pro, avancerad analys. Förväxla ej med Office 365 E5 (424 kr).',
      },

      // Google Workspace — Google publicerar publikt listpris ENBART i USD. Verifierat direkt mot
      // primärkällan workspace.google.com/intl/en 2026-06-17 (3 recon-sonder via GH Actions):
      // Starter $7 · Standard $14 · Plus $22 (per anv/mån, årsavtal). INGET publikt SEK-pris finns —
      // Google sätter det bakom signup-funnelns auth-grind (sv-sidan visar 0 priser, råHTML + render).
      // DÄRFÖR: dessa USD-tal FX-konverteras ALDRIG till en kundsynlig SEK-siffra — se google-sek-grind
      // i recommend.js. FX-gissning mot kund är förbjuden (regel 3/4: antingen verifierat SEK, eller tyst).
      // USD-ankaret vaktas veckovis: lib/verifiers/google-workspace.mjs. usdMonthly = flex-månadspris.
      // NÄSTA VERIFIERING: 2026-09-01
      'google-starter': {
        usdMonthly: 8.40,  usdAnnual: 7.00,
        currency: 'USD', sekPublic: false, lastVerified: '2026-08-22', source: 'workspace.google.com/intl/en',
        note: 'Google Workspace Business Starter — 30 GB Drive/user, Meet, Docs, Gemini AI. Publikt pris endast USD ($7 årsavtal); SEK ej publikt verifierbart.',
      },
      'google-standard': {
        usdMonthly: 16.80, usdAnnual: 14.00,
        currency: 'USD', sekPublic: false, lastVerified: '2026-08-22', source: 'workspace.google.com/intl/en',
        note: 'Google Workspace Business Standard — 2 TB poolad Drive, Meet 150 deltagare + inspelning. Publikt pris endast USD ($14 årsavtal); SEK ej publikt verifierbart.',
      },
      'google-plus': {
        usdMonthly: 26.40, usdAnnual: 22.00,
        currency: 'USD', sekPublic: false, lastVerified: '2026-08-22', source: 'workspace.google.com/intl/en',
        note: 'Google Workspace Business Plus — 5 TB poolad Drive, utökad säkerhet, eDiscovery. Publikt pris endast USD ($22 årsavtal); SEK ej publikt verifierbart.',
      },

      // Slack — USD-baspris, konverteras runtime.
      // Källa: slack.com/pricing (bekräftat via tech.co maj 2026).
      // NÄSTA VERIFIERING: 2026-09-01
      'slack-pro': {
        usdMonthly: 8.75,  usdAnnual: 7.25,
        currency: 'USD', lastVerified: '2026-08-22', source: 'slack.com/pricing',
        note: 'Slack Pro — obegränsat meddelandehistorik, video-huddles, obegränsade integrationer.',
      },
      'slack-business-plus': {
        usdMonthly: 18.00, usdAnnual: 15.00,
        currency: 'USD', lastVerified: '2026-08-22', source: 'slack.com/pricing',
        note: 'Slack Business+ — SSO/SAML, kompliansexport, DLP, prioriterad support. Årsavtal 15 USD vs månadsavtal 18 USD, verifierat live 2026-08-05 av lib/verifiers/slack.mjs (den tidigare noten "årsrabatten togs bort" var felaktig — prisboken övervärderade marknaden med 20 %).',
      },

      // Zoom — USD-baspris, konverteras runtime.
      // Källa: zoom.us/pricing (bekräftat via tech.co maj 2026).
      // NÄSTA VERIFIERING: 2026-09-01
      'zoom-pro': {
        usdMonthly: 15.99, usdAnnual: 14.16,
        currency: 'USD', lastVerified: '2026-08-05', source: 'zoom.us/pricing',
        note: 'Zoom Pro — obegränsade möten, 1 GB moln-inspelning, schemaläggning.',
      },
      'zoom-business': {
        usdMonthly: 19.99, usdAnnual: 18.33,
        currency: 'USD', lastVerified: '2026-08-05', source: 'zoom.us/pricing',
        note: 'Zoom Business — SSO, inspelningsutskrifter, branding, 300 deltagare.',
      },

      // Atlassian — USD-baspris, konverteras runtime.
      // VIKTIGT: Atlassian använder TIER-BUCKET-prissättning för årsavtal.
      //   Årsavtal är en fast summa per tier oavsett exakt antal users i tierens spann.
      //   Tier 101-200 users: Jira Premium $32 000/år totalt, Confluence Premium $23 000/år totalt.
      //   → För 110 users: årsavtal KOSTAR MER än månadsavtal. Byte till årsavtal rekommenderas EJ.
      //   → usdAnnual är null för alla Atlassian-produkter — ingen rättvis per-user-jämförelse möjlig.
      //   Månadspriser verifierade direkt från atlassian.com för 110 users.
      //
      // ✅ OMVERIFIERAT LIVE 2026-08-05 med seat-väljaren (#unit-count) explicit satt till 110:
      //   Jira Standard 8,92 och Premium 17,88 stämde PÅ ÖRET — prisbokens tal var rätta hela
      //   tiden. (Sidans standardvy visar 300 users och gav 7,91/14,54; att "rätta" efter den
      //   hade förstört fungerande data. Se SEAT-FÄLLAN i lib/verifiers/atlassian.mjs.)
      //   Confluence avvek: 6,50 → 6,55 och 12,53 → 12,87. Just de två posterna hade källan
      //   featurebase.app — en tredjeparts blogg. Andrahandskällan låg nära, men inte rätt.
      //   Källan är nu Atlassian direkt, och talen är deras.
      'atlassian-jira-standard': {
        usdMonthly: 8.92,  usdAnnual: null, usdArvoAnnual: null,
        currency: 'USD', lastVerified: '2026-08-05', source: 'atlassian.com/software/jira/pricing',
        note: 'Jira Software Cloud Standard — agile boards, backlog, roadmaps.',
      },
      'atlassian-jira-premium': {
        usdMonthly: 17.88, usdAnnual: null, usdArvoAnnual: null,
        currency: 'USD', lastVerified: '2026-08-05', source: 'atlassian.com/software/jira/pricing',
        note: 'Jira Software Cloud Premium — avancerade roadmaps, sandbox, 24/7-support.',
      },
      'atlassian-confluence-standard': {
        usdMonthly: 6.55,  usdAnnual: null, usdArvoAnnual: null,
        currency: 'USD', lastVerified: '2026-08-05', source: 'atlassian.com/software/confluence/pricing',
        note: 'Confluence Cloud Standard — wiki, templates, Teams/Slack-integrationer.',
      },
      'atlassian-confluence-premium': {
        usdMonthly: 12.87, usdAnnual: null, usdArvoAnnual: null,
        currency: 'USD', lastVerified: '2026-08-05', source: 'atlassian.com/software/confluence/pricing',
        note: 'Confluence Cloud Premium — analytics, sandbox, 24/7-support.',
      },
    },
    // Cellerna fylls av tillampaCellHarledning() nedan ur licenseTierBenchmarks — segment- och
    // storleksnycklarna står kvar (de bär matrisens FORM), men talen skrivs aldrig här.
    // Ett tomt objekt vore fel: formen är en del av kontraktet, och en saknad cell ger null-benchmark.
    matrix: {
      byraer:      { micro: {}, small: {}, mid: {} },
      hantverkare: { micro: {}, small: {}, mid: {} },
      ehandel:     { micro: {}, small: {}, mid: {} },
      tillverkning:{ micro: {}, small: {}, mid: {} },
    },
  },

  'saas-creative': {
    unit: 'kr/år',
    note: 'Adobe Creative Cloud — verifierade publika SEK-listpriser (stealth-skrapning av adobe.com/se, lib/verifiers/adobe.mjs). B2B exkl moms.',
    // Adobe Creative Cloud — ÄKTA SEK direkt från adobe.com/se, stealth-verifierat 2026-06-18 (förbi Akamai).
    // TVÅ SKU-familjer med OLIKA moms-bas (verifierat på sidorna):
    //   • Team/B2B (per licens): priserna anges EXKL moms → ankras DIREKT (ingen division).
    //   • Individ: priserna anges INKL 25% moms → exkl beräknas i kod (lib/adobe-pricing.js exVat ÷1,25).
    // Ett B2B-företag sitter nästan alltid på Team-planen → fakturedetektorn väljer rätt ankare (regel 4:
    // de-momsa aldrig ett pris som redan är exkl; jämför aldrig Team-faktura mot individpris = falsk besparing).
    // Endast NORMALPRIS — intro/promo (t.ex. 466,16 första 3 mån) ignoreras. INGEN FX (äkta SEK).
    adobeVerified: {
      source: 'adobe.com/se', method: 'stealth (playwright-extra)', lastVerified: '2026-06-18',
      teamExVatMonthly: {            // SEK/mån/licens, EXKL moms (årsplan, fakt. månadsvis) — ankras direkt
        'all-apps':   985,           // Creative Cloud Pro (Alla program)
        'single-app': 381,           // Fristående program (Single App), "från"
        'acrobat':    273,           // Acrobat Pro
      },
      individualInclVatMonthly: {    // SEK/mån, INKL 25% moms — exkl beräknas i kod (verifierarens individ-ankare)
        'all-apps':          932.50, // Creative Cloud Pro → exkl 746
        'all-apps-standard': 741.25, // Creative Cloud Standard (utan premium-AI) → exkl 593
        'single-app':        311.25, // t.ex. Photoshop → exkl 249
        'acrobat':           215.00, // → exkl 172
      },
    },
    alternatives: [
      { supplier: 'Adobe Creative Cloud for Teams', positioning: 'Branschstandard för kreativa team — All Apps 985 kr/licens/mån exkl moms (verifierat adobe.com/se)', reliability: 0.95 },
      { supplier: 'Figma Organization',             positioning: 'Designplattform med starka samarbetsfunktioner, konkurrenskraftigt vs Adobe', reliability: 0.93 },
      { supplier: 'Canva for Teams',                positioning: 'Lägst kostnad för enklare grafik utan avancerade redigeringsbehov',           reliability: 0.88 },
    ],
  },

  'saas-crm': {
    source: 'estimated',
    unit: 'kr/år',
    // Kalibrering juni 2026 — per användare/år (exkl. moms):
    // Pipedrive Essential (annual billing): $14/user/mth ≈ 144 SEK × 12 = ~1 728 kr/user/år.
    // Zoho CRM Standard (annual): $14/user/mth ≈ 144 SEK × 12 = ~1 728 kr/user/år.
    // HubSpot Sales Hub Starter: $20/user/mth ≈ 206 SEK × 12 = ~2 472 kr/user/år.
    // SuperOffice CRM (nordisk, estimerat): ~250–400 kr/user/mth → ~3 000–4 800 kr/user/år.
    // Lime CRM (svensk, estimerat från kunddata): ~299–599 kr/user/mth → ~3 588–7 188 kr/user/år.
    // Salesforce Starter Suite: $25/user/mth ≈ 258 SEK × 12 = ~3 090 kr/user/år.
    // p25 = marknadsmässigt pris Pipedrive/Zoho-nivå ≈ 1 800 kr/user/år.
    // Median = typiskt svenskt SMF-CRM-avtal SuperOffice/Lime-nivå ≈ 4 200 kr/user/år.
    // Volymrabatt vid small/mid: ~5–10 % på median.
    // CRM-priser varierar minimalt per bransch — matrisen är konsekvent över segment.
    note: 'Per användare/år (exkl. moms). Estimat juni 2026: p25 = marknadsmässigt Pipedrive/Zoho-nivå (~150 kr/mth/user), median = typiskt Svenska SMF-avtal SuperOffice/Lime-nivå (~350 kr/mth/user). Prissättning varierar med kontaktvolym och avtalslängd.',
    alternatives: [
      { supplier: 'Pipedrive',           positioning: 'Enklast och effektivast för säljfokuserade bolag — lägst TCO per user, starkt API', reliability: 0.92 },
      { supplier: 'HubSpot CRM Starter', positioning: 'Stark för bolag med kombinerade sälj- och marknadsföringsbehov — fri tier existerar', reliability: 0.94 },
      { supplier: 'Zoho CRM',            positioning: 'Bredaste funktionsuppsättningen till lägst kostnad — bäst pris/prestanda i segmentet', reliability: 0.90 },
      { supplier: 'SuperOffice CRM',     positioning: 'Nordisk aktör med lokal support och stark integration mot svenska affärssystem', reliability: 0.91 },
    ],
    licenseTierBenchmarks: {
      // Pipedrive — USD-baspris, konverteras runtime via pricing.js.
      //
      // ⚠️ TRE MOTSTRIDIGA SANNINGAR RÄTTADE 2026-08-05:
      //  1. PLANERNA FANNS INTE. Nycklarna hette 'essential'/'advanced' — produkter Pipedrive
      //     inte längre säljer. Live-lineupen (recon, ops/probe-sista-tre.txt) är
      //     Lite · Growth · Premium · Ultimate. Ett pris utan en plan man kan namnge är
      //     inget ankare, hur färskt datumet än ser ut.
      //  2. ETIKETTEN LJÖG. Fältet source pekade på pipedrive.com/pricing — i prisboken
      //     betyder det verifierat publikt listpris — medan kommentaren bredvid sa "estimat".
      //     Två sanningsanspråk på samma rad, och maskinerna läser fältet, inte kommentaren.
      //  3. REPOT MOTSADE SIG SJÄLVT. api/admin/run-migration.mjs seedade samma produkter med
      //     helt andra tal (Essential 24/14, Advanced 44/29). Regel 1: en sanning per fråga.
      //
      // Nu: de faktiska planerna med faktiska, live-avlästa priser. Pipedrive anger priset
      // som "Per seat per month, billed annually" med årssumman utskriven bredvid — därför är
      // usdMonthly = usdAnnual här: det ÄR månadspriset vid årsbetalning, inte två olika tal.
      'pipedrive-lite': {
        usdMonthly: 14.00, usdAnnual: 14.00,
        currency: 'USD', lastVerified: '2026-08-05', source: 'pipedrive.com/en/pricing',
        note: 'Pipedrive Lite — pipeline, kontaktimport, standardrapporter, mobilapp. US$168/plats/år. (Ersätter tidigare "Essential" som Pipedrive slutat sälja.)',
      },
      'pipedrive-growth': {
        usdMonthly: 39.00, usdAnnual: 39.00,
        currency: 'USD', lastVerified: '2026-08-05', source: 'pipedrive.com/en/pricing',
        note: 'Pipedrive Growth — e-postintegration, automatisering, grupputskick. US$468/plats/år. (Ersätter tidigare "Advanced"; prisboken angav 29 USD för en plan som inte längre finns.)',
      },
      // HubSpot CRM — USD-baspris, konverteras runtime.
      'hubspot-starter': {
        usdMonthly: 20.00, usdAnnual: 20.00,
        currency: 'USD', lastVerified: '2026-08-05', source: 'hubspot.com/pricing/crm/starter',
        note: 'HubSpot Sales Hub Starter — kontakter, deals, e-postspårning.',
      },
      // Zoho CRM — USD-baspris.
      'zoho-crm-standard': {
        usdMonthly: 20.00, usdAnnual: 14.00,
        currency: 'USD', lastVerified: '2026-08-05', source: 'zoho.com/crm/zohocrm-pricing.html',
        note: 'Zoho CRM Standard — leads, kontakter, konton, standardrapporter.',
      },
    },
    matrix: {
      byraer:      { micro: { median: 4200, p25: 1800 }, small: { median: 3900, p25: 1680 }, mid: { median: 3600, p25: 1560 } },
      hantverkare: { micro: { median: 4200, p25: 1800 }, small: { median: 3900, p25: 1680 }, mid: { median: 3600, p25: 1560 } },
      ehandel:     { micro: { median: 4200, p25: 1800 }, small: { median: 3900, p25: 1680 }, mid: { median: 3600, p25: 1560 } },
      tillverkning:{ micro: { median: 4200, p25: 1800 }, small: { median: 3900, p25: 1680 }, mid: { median: 3600, p25: 1560 } },
    },
  },

  'saas-finance': {
    source: 'estimated',
    unit: 'kr/år',
    // Verifierade Fortnox-listpriser (kr/mån EXKL moms), live 2026-06-17 via fortnox.se/produkt/prislista.
    // Driftvakten (scripts/verify.mjs fortnox · fabriken) bekräftar dessa veckovis — rött vid drift.
    // Fortnox är marknadsledande för svensk SMF-bokföring → starkaste publika ankaret i kategorin.
    fortnoxVerified: {
      source: 'fortnox-prislista', lastVerified: '2026-08-22', unit: 'kr_per_manad_exkl_moms',
      url: 'https://www.fortnox.se/produkt/prislista',
      // Paket = det bolag faktiskt köper (det vi ankrar på).
      paket: { Mini: 209, Liten: 349, Mellan: 490, Stor: 710, 'Mini+': 369, 'Mellan+': 659, 'Stor+': 919, Byråpartner: 499 },
      // Enskilda kärnmoduler.
      moduler: { 'Bokföring': 189, 'Attest & Koll': 119, 'Avstämning': 139, 'Autogiro': 109, 'Anläggningsregister': 129 },
    },
    // Verifierade Spiris-listpriser (kr/mån EXKL moms), live 2026-06-17 via spiris.se/priser.
    // Spiris = tidigare Visma eEkonomi / Visma Spcs (vismaspcs.se → spiris.se, rebrandat 2025/26).
    // Den andra halvan av svensk SMF-bokföring. Vakten (verify.mjs spiris) bekräftar veckovis.
    spirisVerified: {
      source: 'spiris-prislista', lastVerified: '2026-06-17', unit: 'kr_per_manad_exkl_moms',
      url: 'https://www.spiris.se/priser', formerlyKnownAs: 'Visma eEkonomi',
      // Abonnemangsnivåer (stigande) = det bolag faktiskt köper (det vi ankrar på).
      niva: { Starta: 199, Driva: 349, Skala: 549, 'Växa': 749, Lyfta: 1249 },
      // Enskilda kärnmoduler / tillägg.
      moduler: { 'Lön till anställda': 299, 'Skatt & Bokslut': 419, 'Lager': 249, 'Offert & Order': 129, 'Integration': 119 },
    },
    // Kalibrering juni 2026 — totalt per bolag/år (ej per användare, skalas ej med seatCount):
    // Fortnox-paket (verifierat 2026-06-17): Mini 209, Liten 349, Mellan 490, Stor 710 kr/mth.
    // Enskild modul Bokföring 189 kr/mth separat. Standard SMF-bundle (paket Liten/Mellan): 349–490 kr/mth.
    // Typisk SMF micro (Bokföring + Fakturering): p25 ~4 200 kr/år, median ~7 200 kr/år (med extra moduler).
    // Small (20 anst, fler moduler, fler verifikationer): p25 ~6 600 kr/år, median ~12 000 kr/år.
    // Mid (100 anst, ERP-nivå med lön/projekt): p25 ~12 000 kr/år, median ~24 000 kr/år.
    // eHandel: +25–35 % jämfört med byraer (WMS-integration, fler fakturor, fler kassasystem).
    // OBS: isAccountingSystem (subType='affärssystem') i recommend.js sätter overpaymentPct = null —
    //   systemet jämför inte procentuellt utan ger modulrådgivning. Matrisen används ändå för kontext.
    note: 'Totalt per bolag/år (exkl. moms). Bokföringssystem och affärssystem. Estimat juni 2026: Fortnox standard bundle ~350–450 kr/mth (p25 micro ~4 200 kr/år). Prissättning varierar med modulval, verifikationsvolym och antal bolag.',
    alternatives: [
      { supplier: 'Fortnox',        positioning: 'Lägst grundkostnad för SMF — modulbaserat, skalbart, stark integration mot banker och lönesystem', reliability: 0.96 },
      { supplier: 'Visma eEkonomi', positioning: 'Bredare funktionalitet, stark för bolag med komplexa rapporteringsbehov och multi-bolag',          reliability: 0.94 },
      { supplier: 'Bokio',          positioning: 'Enklast och billigast för solobolag — AI-bokföring utan krav på redovisningskompetens',             reliability: 0.88 },
      { supplier: 'PE Redovisning', positioning: 'Stark för byråer och deras kunder — komplett redovisningsplattform med klientportal',              reliability: 0.91 },
    ],
    matrix: {
      byraer:      { micro: { median:  7200, p25:  4200 }, small: { median: 12000, p25:  6600 }, mid: { median: 24000, p25: 12000 } },
      hantverkare: { micro: { median:  7200, p25:  4200 }, small: { median: 12000, p25:  6600 }, mid: { median: 24000, p25: 12000 } },
      ehandel:     { micro: { median:  9600, p25:  5400 }, small: { median: 16800, p25:  8400 }, mid: { median: 36000, p25: 18000 } },
      tillverkning:{ micro: { median:  7200, p25:  4200 }, small: { median: 12000, p25:  6600 }, mid: { median: 24000, p25: 12000 } },
    },
  },

  'saas-other': {
    requiresVolumeData: true,
    volumeDataNote: 'Specialiserad mjukvara kräver en djupare analys av era specifika funktionskrav och avtalsvillkor. Vi tar hand om detta manuellt.',
    unit: 'kr/år',
    note: 'Nischad eller okategoriserad SaaS. Kräver manuell analys — per-anställd-benchmark är inte tillämpbar.',
    alternatives: [],
  },

  skrivarleasing: {
    source: 'estimated',
    unit: 'kr/år',
    // Kommersiella SMF-priser maj 2026 (privat sektor, ej offentlig upphandling):
    // A4 MFP leasingavgift: 200–400 kr/mån. Klickpris S/V: 0,08–0,15 kr/sida. Klickpris färg: 0,55–1,00 kr/sida.
    // OBS: Kammarkollegiets ramavtal (offentlig sektor) = 0,05–0,08 kr/sida S/V. SMF betalar 40–80 % mer
    //   utan offentligupphandlad volym och centraliserade avtal.
    // Serviceavtal ingår i de flesta managed print-avtal.
    // p25 = Kyocera/Brother-klass (lägst TCO). Median = Ricoh/Konica Minolta-klass (marknadsledare).
    note: 'Totalt per år: skrivarhyra + klickavtal S/V + serviceavtal (per driftsställe). Kommersiella SMF-priser maj 2026 (privat sektor): A4 MFP lease 200–400 kr/mån, klick S/V 0,08–0,15 kr/sida, klick färg 0,55–1,00 kr/sida. OBS: Kammarkollegiets offentligupphandlade priser (0,05–0,08 kr/sida) gäller INTE SMF utan offentligupphandlad volym.',
    // EN källa för klick- och leasinganalys (regel 1): analyzeClickRates i recommend.js
    // läser HÄRIFRÅN — aldrig egna konstanter. source: estimated tills livedata/partner-
    // avtal bär → kundytor MÅSTE märka som estimat och visa BANDET, aldrig en punkt.
    clickRateBenchmarks: {
      source: 'estimated',
      bw:    { low: 0.08, high: 0.15 },   // kr/sida S/V, kommersiella SMF-avtal maj 2026
      color: { low: 0.55, high: 1.00 },   // kr/sida färg
      leasePerMachineMonthly: { low: 200, high: 400 }, // A4 MFP — A3 ligger högre, kräver maskinmodell
      contractMonthsNorm: 36,
      note: 'Kommersiella SMF-klickpriser maj 2026 (privat sektor, estimat). Kammarkollegiets offentligupphandlade priser gäller INTE SMF.',
    },
    alternatives: [
      { supplier: 'Konica Minolta SMB Solutions', positioning: 'Stark SMF-portfölj, konkurrenskraftiga klickavtal, rikstäckande service',       reliability: 0.95 },
      { supplier: 'Ricoh Sverige',                positioning: 'Bäst total cost of ownership för mellanstor printvolym, stark SLA',              reliability: 0.94 },
      { supplier: 'Canon Business Solutions',     positioning: 'Bred modellflora, bra för blandad A3/A4-volym, stark support',                  reliability: 0.93 },
      { supplier: 'Kyocera Document Solutions',   positioning: 'Lägst klickpris i klassen, lång livslängd på hardware — lägst TCO totalt',      reliability: 0.92 },
    ],
    // Metodologi (total MPS-kostnad per år, ej per anställd):
    // Kommersiella SMF-klickpriser: S/V 0,10–0,13 kr/sida, färg 0,60–0,90 kr/sida.
    // Antal MFPs: micro=1, small=2–3, mid=5–6 (1 per 10–15 anst, modern papperslös trend).
    // p25 (Kyocera-klass, lågkostnad): 200 kr lease + 3 500 S/V×0,10 + 300 färg×0,60 + 150 service = 930 kr/mån.
    //   micro p25: 930×12 = 11 160 → 11 400 kr/år.
    // Median (Ricoh/Konica-klass): 350 kr lease + 4 000 S/V×0,12 + 400 färg×0,80 + 200 service = 1 390 kr/mån.
    //   micro median: 1 390×12 = 16 680 → 16 800 kr/år.
    // small (2 MFPs p25, 3 MFPs median), mid (5–6 MFPs): skalade proportionellt.
    // Hantverkare micro/small: lägre volym (fältarbete, färre kontorsutskrifter) → 70 % av byraer.
    // Tillverkning mid: hög volym (ritningar, arbetsberedningar) → +25 % korrektion mot ehandel.
    matrix: {
      byraer:      { micro: { median: 16800, p25: 11400 }, small: { median: 28800, p25: 19200 }, mid: { median:  60000, p25:  42000 } },
      hantverkare: { micro: { median: 11400, p25:  7800 }, small: { median: 22800, p25: 15600 }, mid: { median:  54000, p25:  36000 } },
      ehandel:     { micro: { median: 14400, p25:  9600 }, small: { median: 28800, p25: 19200 }, mid: { median:  60000, p25:  42000 } },
      tillverkning:{ micro: { median: 18000, p25: 12600 }, small: { median: 48000, p25: 33600 }, mid: { median: 150000, p25: 105000 } },
    },
  },

  loneadmin: {
    source: 'real-public',
    lastVerified: '2026-08-05',
    verifiedVia: 'playwright',
    unit: 'kr/år',
    // Strukturerat verifierat ankare — det rätt-storleks-loben (lib/loneadmin-rightsizing.js)
    // OCH verifieraren (lib/verifiers/fortnox-lon.mjs) läser HÄRIFRÅN, aldrig egna konstanter (regel 1).
    // Fortnox Lön är ett komplett lönesystem till FAST publikt listpris (ej "från") → golvet är ett tal.
    fortnoxLonVerified: {
      product:            'Fortnox Lön',
      vatBasis:           'exkl',
      lastVerified:       '2026-05-22',
      source:             'fortnox.se/produkt/lon',
      fixedMonthly:       199,   // fast avgift kr/mån
      perEmployeeMonthly: 25,    // kr/anställd/mån
      perPayslip:         5,     // kr/lönebesked (Kivra-utskick) — redovisas separat, ingår ej i golvet
    },
    // ── CELLERNA HÄRLEDS UR AVGIFTSSTRUKTUREN OVAN (grundarbeslut 2026-08-18) ─────────────────
    // p25 stod som literaler (780 · 420 · 324) och stämde faktiskt på kronan mot Fortnox verifierade
    // avgifter — men ingenting i koden band ihop dem, så en prisändring hos Fortnox hade uppdaterat
    // `fortnoxLonVerified` (verifieraren läser den) och lämnat kundens golv orört. Rätt tal av tur.
    //
    // MEDIAN VAR DÄREMOT UPPFUNNEN: 2 400 · 1 800 · 1 200 kr/anställd/år, enligt notens egna ord
    // "typisk marknadspremie för system utan Fortnox-integration" — ett estimat presenterat under
    // source:'real-public', och tre gånger det verifierade golvet. Den är borta. Vi har EN verifierad
    // leverantör i den här kategorin, alltså har vi ett pris och ingen fördelning.
    //
    // Lönebeskedsavgiften ingår INTE i taket. Att lägga ett valfritt tillägg (Kivra-utskick) på
    // listpriset och kalla summan "listpris" är Copilot-fällan, ordagrant — ett paketpris draget
    // som planpris. En kund utan Kivra betalar faktiskt det lägre talet.
    //
    // Storleksvariationen är här ÄKTA, till skillnad från saas: den fasta avgiften slås ut på fler
    // anställda. `representant` säger rakt ut vilket antal per band vi räknar på — bandets mitt,
    // inte dess kant. Känd gräns: ett bolag med 3 anställda betalar 1 096 kr/anst/år, inte 780.
    referensProdukt: 'Fortnox Lön',
    cellHarledning: {
      kalla:            'fortnoxLonVerified',
      fastFalt:         'fixedMonthly',
      rorligtFalt:      'perEmployeeMonthly',
      representant:     { micro: 5, small: 20, mid: 100 },   // band 1–9 · 10–49 · 50–249
      faktor:           12,
      medianLikaMedP25: true,
    },
    // Verifierat: Fortnox Lön listpris maj 2026 (exkl. moms): 199 kr/mån fast + 25 kr/anställd/mån.
    // p25 = Fortnox-priset per anställd/år vid representativt anställningsantal per bucket:
    //   micro  (n=5):   (199 + 5×25)×12/5   =  780 kr/anst/år
    //   small  (n=20):  (199 + 20×25)×12/20 =  420 kr/anst/år
    //   mid    (n=100): (199 + 100×25)×12/100= 324 kr/anst/år
    // Median = vad marknaden faktiskt betalar (Visma, Hogia, Azets-nivå).
    note: 'Per anställd/år. Källa: Fortnox Lön verifierat publikt listpris (fortnox.se/produkt/lon, 2026-05-22) — 199 kr/mån fast + 25 kr/anställd/mån, utslaget per storleksband. Lönebeskedsavgiften (5 kr, Kivra-utskick) är ett valfritt tillägg och ingår inte. En verifierad leverantör i kategorin, alltså ett pris och ingen fördelning.',
    alternatives: [
      { supplier: 'Fortnox Lön',   positioning: 'Verifierat lägst — 199 kr/mån + 25 kr/anst/mån. Direkt integrerat i Fortnox.',  reliability: 0.96 },
      { supplier: 'Visma Lön',     positioning: 'Stark integration med Visma eEkonomi, bred support — offert krävs',              reliability: 0.94 },
      { supplier: 'Hogia Lön',     positioning: 'Marknadsledare för mid-size, starka kollektivavtalsregler — offert krävs',       reliability: 0.95 },
      { supplier: 'Azets Sverige', positioning: 'Outsourcad lönekörning — rätt om kunden vill slippa systemansvar helt',          reliability: 0.93 },
    ],
    matrix: {
      byraer:      { micro: { median: 2400, p25:  780 }, small: { median: 1800, p25: 420 }, mid: { median: 1200, p25: 324 } },
      hantverkare: { micro: { median: 2400, p25:  780 }, small: { median: 1800, p25: 420 }, mid: { median: 1200, p25: 324 } },
      ehandel:     { micro: { median: 2400, p25:  780 }, small: { median: 1800, p25: 420 }, mid: { median: 1200, p25: 324 } },
      tillverkning:{ micro: { median: 2400, p25:  780 }, small: { median: 1800, p25: 420 }, mid: { median: 1200, p25: 324 } },
    },
  },

  'larm-bevakning': {
    source: 'estimated',
    unit: 'kr/år',
    // Verifierade startpriser maj 2026 (exkl. moms, per driftsställe):
    // Sector Alarm Företag: 299–399 kr/mån larmövervakning + utrustning inkl. i 36-mån avtal.
    // Verisure Företag: 349–499 kr/mån (inkl. kamerövervakning).
    // Safemore: ~249–349 kr/mån (budgetalternativ, SMF-fokus).
    // Securitas: offertbaserat, +50–100 % vs. Sector Alarm för bemannad bevakning.
    // Priser inkl. utrustningsamortering = ~700–1 200 kr/mån all-in = ~8 400–14 400 kr/år.
    note: 'Per driftsställe/år. Inkluderar larmövervakning + larmcentral + utrustningshyra (amorterad). Källa: Sector Alarm Företag 299–399 kr/mån, Verisure Företag 349–499 kr/mån, Safemore 249–349 kr/mån (verifierade listpriser maj 2026). All-in inkl. utrustning: ~700–1 200 kr/mån.',
    alternatives: [
      { supplier: 'Sector Alarm Företag', positioning: 'Lägst månadsavgift, stark app-integration, snabb utryckning',        reliability: 0.94 },
      { supplier: 'Safemore',             positioning: 'Konkurrenskraftigt pris, stark för SMF utan komplex säkerhetsinfra', reliability: 0.92 },
      { supplier: 'Verisure Företag',     positioning: 'Rikstäckande, välkänt varumärke, bra för multi-site',               reliability: 0.95 },
      { supplier: 'Securitas Sverige',    positioning: 'Premium-alternativ med bemannad bevakning om det behövs',           reliability: 0.96 },
    ],
    // Metodologi (per driftsställe/år):
    // All-in = larmövervakning + larmcentral + utrustningsamortering (36 mån).
    //   micro (1 driftsställe):
    //     p25 = Safemore basic ~449 kr/mån (249 kr övervakning + ~200 kr utrustning) = ~5 400 kr/år.
    //     median = Sector Alarm mid ~800 kr/mån (inkl. kamera + övervakning) = ~9 600 kr/år.
    //   small (1–2 lokaler):
    //     p25 = 2 × Safemore 449 kr/mån = 898 kr/mån = ~10 800 kr/år.
    //     median = 2 × Sector Alarm 750 kr/mån = 1 500 kr/mån = ~18 000 kr/år (oförändrat byraer/ehandel).
    //   mid (2–4 lokaler): befintliga värden verifierade mot Sector Alarm multi-site — oförändrade.
    matrix: {
      byraer:      { micro: { median:  9600, p25: 5400 }, small: { median: 18000, p25: 10800 }, mid: { median:  42000, p25: 29400 } },
      hantverkare: { micro: { median: 12000, p25: 7200 }, small: { median: 24000, p25: 14400 }, mid: { median:  54000, p25: 37800 } },
      ehandel:     { micro: { median:  9600, p25: 5400 }, small: { median: 18000, p25: 10800 }, mid: { median:  42000, p25: 29400 } },
      tillverkning:{ micro: { median: 14400, p25: 8400 }, small: { median: 30000, p25: 18000 }, mid: { median:  84000, p25: 58800 } },
    },
  },

  foretagshalsovard: {
    source: 'estimated',
    unit: 'kr/år',
    // Feelgood Digital Bas: från ~2 100 kr/anst/år (digitalt primärt, lanserat 2025).
    // Avonova Bas: ~2 800–3 600 kr/anst/år (digitalt + fysiskt).
    // Previa och Falck: ~3 600–5 400 kr/anst/år för fullständigt fysiskt paket.
    // p25 = digitalt grundpaket (Feelgood Digital-nivå). Median = standard hybridpaket.
    note: 'Per anställd/år. Grundpaket med hälsoundersökning, rehab-koordinering och krissamtal. Källa estimat maj 2026: Feelgood Digital från ~2 100 kr/anst/år, Avonova Bas ~2 800–3 600 kr/anst/år, Previa/Falck fullpaket ~3 600–5 400 kr/anst/år.',
    alternatives: [
      { supplier: 'Feelgood Företagshälsa', positioning: 'Störst i Sverige, digitalt primärt, konkurrenskraftigt grundpris',        reliability: 0.95 },
      { supplier: 'Avonova',               positioning: 'Stark digitalt + fysiskt, bra för bolag med blandade arbetsplatser',      reliability: 0.94 },
      { supplier: 'Falck Health',          positioning: 'Internationell aktör, stark för multi-site och internationella bolag',    reliability: 0.93 },
      { supplier: 'Previa',               positioning: 'Premium-aktör, bred specialistkompetens, bäst för komplexa rehabbehov',   reliability: 0.95 },
    ],
    // Metodologi:
    // p25 = Feelgood Digital-prisnivå ~2 100 kr/anst/år (digital grundtäckning, verifierat intervall).
    // Median = Avonova Bas-nivå ~3 200–3 900 kr/anst/år beroende på bransch (fysisk + digital).
    // Hantverkare/tillverkning: +20 % på median (yrkesskada, ergonomi, psykosocial belastning).
    // Volymrabatt: small ≈ −5 %, mid ≈ −15 % på mediannivå.
    matrix: {
      byraer:      { micro: { median: 3300, p25: 2100 }, small: { median: 3100, p25: 2100 }, mid: { median: 2700, p25: 1800 } },
      hantverkare: { micro: { median: 3900, p25: 2400 }, small: { median: 3600, p25: 2400 }, mid: { median: 3000, p25: 2000 } },
      ehandel:     { micro: { median: 3300, p25: 2100 }, small: { median: 3100, p25: 2100 }, mid: { median: 2700, p25: 1800 } },
      tillverkning:{ micro: { median: 3900, p25: 2400 }, small: { median: 3600, p25: 2400 }, mid: { median: 3000, p25: 2000 } },
    },
  },

  bankavgifter: {
    source: 'estimated',
    unit: 'kr/år',
    // Verifierade listpriser maj 2026 (exkl. moms):
    // Lunar Business: 0 kr/mån månadsavgift (inkl. Bankgiro, 50 fria transaktioner/mån).
    // Qred Företagskonto: 0 kr/mån (betalkonto, transaktionsavgift 2 kr/st efter fria).
    // SEB Startpaket: 85 kr/mån fast + transaktioner.
    // Länsförsäkringar Företagskonto: 99–149 kr/mån.
    // Swedbank Företagskonto: 185 kr/mån fast.
    // Handelsbanken Företag: ~220–290 kr/mån beroende på omsättning.
    // p25 = neobank/digital aktör (Lunar/Qred-nivå). Median = traditionell regional/storbank.
    note: 'Totalt per år: månadsavgift + transaktionsavgifter + kortavgifter. Källa: verifierade listpriser maj 2026 — Lunar Business 0 kr/mån, SEB Startpaket 85 kr/mån, LF Företag 99–149 kr/mån, Swedbank Företag 185 kr/mån, Handelsbanken ~220–290 kr/mån.',
    alternatives: [
      { supplier: 'Lunar Business',              positioning: 'Ingen månadsavgift, API-first, bäst för digitala bolag utan kontanthantering', reliability: 0.91 },
      { supplier: 'Qred Företagskonto',          positioning: 'Låg månadsavgift, stark för SMF med enkel transaktionsprofil',                reliability: 0.90 },
      { supplier: 'Länsförsäkringar Bank Företag', positioning: 'Bra prissättning för traditionellt SMF, personlig rådgivning',             reliability: 0.93 },
      { supplier: 'SEB Företagskonto',           positioning: 'Fullsortiment, bäst om kunden behöver valuta eller exporttjänster',          reliability: 0.95 },
    ],
    // Metodologi (total bolagskostnad per år, ej per anställd):
    // Verifierade månadsavgifter × transaktionsvolym per segment:
    //   micro (5 anst): ~40 transaktion/mån, 1 kort.
    //     p25 = Lunar/Qred (~150 kr/mån) = ~1 800 kr/år. Avrundad till nuv. nivå (2 400) p.g.a. OCR-/Plusgiroavgifter.
    //     median = Swedbank/SEB Standard (~400 kr/mån inkl. kort + trans) = ~4 800 kr/år → oförändrad.
    //   small (20 anst): ~130 transaktioner/mån, 5 kort.
    //     p25 = Lunar/SEB Startpaket (~350 kr/mån) = ~4 200 kr/år.
    //     median = Swedbank/Handelsbanken (~1 000 kr/mån) = ~12 000 kr/år.
    //   mid (100 anst): ~450 transaktioner/mån, 15 kort.
    //     p25 = SEB/Lunar effektivt (~800 kr/mån) = ~9 600 kr/år.
    //     median = Handelsbanken/Nordea (~2 500 kr/mån) = ~30 000 kr/år.
    // Ehandel/tillverkning: +20–25 % vs byraer (fler leverantörsbetalningar, valutaväxling, fler kort).
    matrix: {
      byraer:      { micro: { median:  4800, p25: 2400 }, small: { median: 12000, p25:  4200 }, mid: { median: 30000, p25:  9600 } },
      hantverkare: { micro: { median:  5400, p25: 2640 }, small: { median: 13200, p25:  4800 }, mid: { median: 33600, p25: 10800 } },
      ehandel:     { micro: { median:  7200, p25: 3000 }, small: { median: 15600, p25:  5400 }, mid: { median: 38400, p25: 12000 } },
      tillverkning:{ micro: { median:  7200, p25: 3000 }, small: { median: 15600, p25:  5400 }, mid: { median: 38400, p25: 12000 } },
    },
  },

  utrustningsleasing: {
    requiresVolumeData: true,
    volumeDataNote: 'IT-leasingkostnaden styrs av antal enheter, specifikation (processor, RAM, lagring) och avtalslängd — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er ett korrekt erbjudande.',
    unit: 'kr/år',
    note: 'Leasing av laptops, datorer, skärmar och annan IT-utrustning. Månadsavgift × enheter × 12. Källa: operatörernas offertlistor 2026.',
    alternatives: [
      { supplier: 'Dustin Leasing',    positioning: 'Marknadsledande IT-återförsäljare, flexibla leasingavtal, brett sortiment laptops och datorer', reliability: 0.93 },
      { supplier: 'Atea Finansiering', positioning: 'Stark på volymer, dedikerad kundansvarig, kombineras med serviceavtal',                           reliability: 0.94 },
      { supplier: 'Ingram Micro',      positioning: 'Distributörspriser utan mellanhand, bra för standardkonfigurationer i volym',                     reliability: 0.91 },
      { supplier: 'Lokal IT-partner',  positioning: 'Flexibla avtal, snabb service, personlig relation — kan slå de stora på smal volym',              reliability: 0.88 },
    ],
  },

  serverhosting: {
    requiresVolumeData: true,
    volumeDataNote: 'Serverkostnader styrs av specifikationer (CPU, RAM, bandbredd) och antal servrar — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Dedikerade servrar, VPS, colocation och cloud-infrastruktur. Kostnaden beror på serverspecifikationer — per-anställd-benchmark är inte tillämpbar.',
    alternatives: [
      { supplier: 'Hetzner',           positioning: 'Bäst pris/prestanda i Europa — dedikerade servrar och VPS, tyskt datacenter, GDPR-compliant', reliability: 0.94 },
      { supplier: 'OVHcloud',          positioning: 'Bred portfölj VPS → dedikerat, europeisk aktör, konkurrenskraftiga priser',                    reliability: 0.92 },
      { supplier: 'Telenor Datacenter', positioning: 'Svensk colocation med garanterat SLA — bra för känslig data med krav på lokalt datacenter',   reliability: 0.93 },
      { supplier: 'AWS Lightsail',     positioning: 'Enkel entry-point till AWS, fast månadspris, skalbar till full AWS-portfölj vid behov',         reliability: 0.95 },
    ],
  },

  kontorsmaterial: {
    requiresVolumeData: true,
    volumeDataNote: 'Kontorsmaterialkostnader styrs av faktisk förbrukning och sortiment — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Totalt per år: papper, förbrukningsvaror, kaffe och kontorsartiklar. Källa: leverantörers listepriser och ramavtalsjämförelser 2026.',
    alternatives: [
      { supplier: 'Staples Business',  positioning: 'Volymrabatter upp till 30 % med företagskonto, brett sortiment, leverans nästa dag',  reliability: 0.90 },
      { supplier: 'Lyreco',            positioning: 'Starka ramavtalspriser, fokus på hållbarhet, dedikerad kundansvarig',                  reliability: 0.92 },
      { supplier: 'Viking (RAJA)',      positioning: 'Lägst listpris på papper och förbrukningsvaror, bra lojalitetsprogram',               reliability: 0.88 },
      { supplier: 'Office Depot',       positioning: 'Brett sortiment, leveransgaranti, flexibla betalvillkor',                             reliability: 0.89 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000, p25: 11000 }, small: { median:  55000, p25:  33000 }, mid: { median: 190000, p25: 115000 } },
      hantverkare: { micro: { median: 12000, p25:  7500 }, small: { median:  35000, p25:  21000 }, mid: { median: 120000, p25:  72000 } },
      ehandel:     { micro: { median: 20000, p25: 12000 }, small: { median:  65000, p25:  39000 }, mid: { median: 225000, p25: 135000 } },
      tillverkning:{ micro: { median: 22000, p25: 14000 }, small: { median:  75000, p25:  45000 }, mid: { median: 270000, p25: 162000 } },
    },
  },

  'städ-rengöring': {
    requiresVolumeData: true,
    volumeDataNote: 'Städkostnader styrs av lokalyta (kvm) och städfrekvens — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Städ och rengöringstjänster för företagslokaler. Timbaserat eller fast abonnemang per driftsställe.',
    alternatives: [
      { supplier: 'Hemfrid Företag',        positioning: 'Marknadsledare, digitalt bokningssystem, transparent prissättning',               reliability: 0.91 },
      { supplier: 'ISS Facility Services',  positioning: 'Storskalig aktör med brett tjänsteutbud, hög tillförlitlighet och SLA',           reliability: 0.95 },
      { supplier: 'Sodexo',                 positioning: 'Integrerade fastighetstjänster, certifierade processer, stark för industri',       reliability: 0.93 },
      { supplier: 'Lokal städfirma',        positioning: 'Lägst pris, flexiblare avtal, snabb respons och personlig relation',              reliability: 0.85 },
    ],
    matrix: {
      byraer:      { micro: { median:  36000, p25:  24000 }, small: { median:  96000, p25:  63000 }, mid: { median: 280000, p25: 185000 } },
      hantverkare: { micro: { median:  18000, p25:  12000 }, small: { median:  54000, p25:  36000 }, mid: { median: 160000, p25: 105000 } },
      ehandel:     { micro: { median:  42000, p25:  28000 }, small: { median: 115000, p25:  76000 }, mid: { median: 330000, p25: 218000 } },
      tillverkning:{ micro: { median:  52000, p25:  34000 }, small: { median: 160000, p25: 105000 }, mid: { median: 480000, p25: 316000 } },
    },
  },

  'transport-frakt': {
    requiresVolumeData: true,
    volumeDataNote: 'Fraktkostnader styrs av godsvikt, volym och antal leveranser — inte av antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Frakt och transport. Kostnaden varierar kraftigt med volym och branschtypisk godsstruktur. Källa: operatörernas volumenprislistor 2026.',
    alternatives: [
      { supplier: 'PostNord Företag', positioning: 'Störst täckning i Sverige, volymrabatter, digitalt orderhanteringssystem',         reliability: 0.89 },
      { supplier: 'DHL Freight',      positioning: 'Marknadsledande internationellt, snabba leveranstider, spårning i realtid',       reliability: 0.93 },
      { supplier: 'Bring',            positioning: 'Starka på Norden, konkurrenskraftiga paket- och pallpriser, hållbarhetsprofil',   reliability: 0.91 },
      { supplier: 'DB Schenker',      positioning: 'Pålitlig för tunggods och pall, brett europeiskt nätverk, stark SLA',            reliability: 0.94 },
    ],
    matrix: {
      byraer:      { micro: { median:   12000, p25:   7500 }, small: { median:   36000, p25:   22000 }, mid: { median:  110000, p25:   68000 } },
      hantverkare: { micro: { median:   45000, p25:  28000 }, small: { median:  150000, p25:   94000 }, mid: { median:  450000, p25:  282000 } },
      ehandel:     { micro: { median:  120000, p25:  75000 }, small: { median:  480000, p25:  300000 }, mid: { median: 1800000, p25: 1125000 } },
      tillverkning:{ micro: { median:   85000, p25:  53000 }, small: { median:  320000, p25:  200000 }, mid: { median:  960000, p25:  600000 } },
    },
  },

  'avfall-atervinning': {
    source: 'estimated',
    unit: 'kr/år',
    // Kalibrering maj 2026:
    // Kommunal taxa-data: Skaraborg 2023 (lägst) — 660L-kärl 3 310 kr/år grundnivå,
    // tät tömning 6 950 kr/år. Stockholm 2026 ~40 % dyrare (220 kr/tömning + 110 kr/kärl/vecka).
    // Avfallsskatt 2026: 750 kr/ton (lagstadgad, Skatteverket). Sysav +15 % feb 2025, +4 % jan 2026.
    // B2B-kontrakt inkluderar normalt: kärlhyra (20-30 %), tömningsavgift (40-50 %),
    // behandling/deponering (15-25 %) samt lagstadgad avfallsskatt (10-20 % av totalen).
    // p25 = marknadsmässigt volymavtal med rikstäckande aktör (Ragn-Sells / SUEZ / Stena).
    // Byrå micro-p25 kalibrerad mot Skaraborg-basscenariot + 30 % (regionjusterat).
    note: 'Avfall & återvinning. Kostnad varierar med containertyp, tömningsfrekvens, avfallsfraktioner och lagstadgade avgifter. Källa: kommunal taxa-data (Skaraborg 2023, Stockholm 2026, Sysav 2025-2026) + Avfallsskatt Skatteverket 2026.',
    alternatives: [
      { supplier: 'Ragn-Sells',      positioning: 'Rikstäckande, starka volymmavtal, bred tjänsteportfölj för B2B',         reliability: 0.91 },
      { supplier: 'PreZero (SUEZ)',   positioning: 'Konkurrenskraftiga volymmpriser, certifierad återvinning, 42 el-bilar Stockholm 2026', reliability: 0.90 },
      { supplier: 'Stena Recycling', positioning: 'Miljöfokus, stark på källsortering och cirkulär ekonomi',                reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median: 16000, p25:  9500 }, small: { median:  42000, p25:  26000 }, mid: { median: 110000, p25:  70000 } },
      hantverkare: { micro: { median: 28000, p25: 18000 }, small: { median:  72000, p25:  46000 }, mid: { median: 180000, p25: 115000 } },
      ehandel:     { micro: { median: 24000, p25: 15000 }, small: { median:  60000, p25:  38000 }, mid: { median: 150000, p25:  95000 } },
      tillverkning:{ micro: { median: 48000, p25: 30000 }, small: { median: 125000, p25:  78000 }, mid: { median: 310000, p25: 195000 } },
    },
  },

  'it-support': {
    source: 'estimated',
    unit: 'kr/år',
    // Managed Services Provider (MSP)-priser Sverige maj 2026:
    // Reaktiv helpdesk-only: ~400–700 kr/anst/mån.
    // Proaktiv MSP (patch mgmt, övervakning, backup): ~700–1 200 kr/anst/mån.
    // Full managed (inkl. Microsoft Intune, EDR, SIEM): ~1 200–2 500 kr/anst/mån.
    // p25 = reaktiv helpdesk-modell. Median = proaktiv MSP-modell utan säkerhetspremium.
    note: 'IT-drift, support och managed services per år. Källa: MSP-branschjämförelse maj 2026 — reaktiv helpdesk ~400–700 kr/anst/mån, proaktiv MSP (övervakning + patch + backup) ~700–1 200 kr/anst/mån, full managed ~1 200–2 500 kr/anst/mån.',
    alternatives: [
      { supplier: 'Atea',             positioning: 'Marknadsledande, bred kompetens, enterprise-grade SLA och rikstäckning',         reliability: 0.95 },
      { supplier: 'Advania',          positioning: 'SMF-fokuserad, personlig service, rimliga priser, stark i Nordens-städer',      reliability: 0.91 },
      { supplier: 'Dustin IT-tjänst', positioning: 'God prissättning, snabb leverans av hårdvara + integrerade supportavtal',      reliability: 0.90 },
      { supplier: 'Lokal IT-partner', positioning: 'Snabbast responstid, personlig kontakt, flexibla villkor — lägst kostnad SMF', reliability: 0.87 },
    ],
    // Metodologi:
    // Micro: nuv. byraer median 24 000 = 400 kr/anst/mån × 5 anst — matchar reaktivt helpdesk-golv. Oförändrat.
    // Small: reaktivt helpdesk 400 kr/anst/mån × 20 anst × 12 = 96 000. Median sätts till 90 % av golvet
    //   (viss del break-fix/self-service) = 86 400 → 90 000. p25 = 60 % täckning × 400 × 20 × 12 = 57 600 → 54 000.
    // Mid: 60 % täckning × 400 kr × anst-antal × 12.
    //   Byraer: 60 × 400 × 12 = 288 000 → median 330 000 (proaktiv uppgradering), p25 200 000 (reaktiv bas).
    //   Hantverkare −40 % (enklare IT-miljö, fler fältanställda utan IT-stöd).
    //   Ehandel +75 % vs byraer (uptime-kritisk, 24/7-krav, komplex tech-stack).
    //   Tillverkning +33 % vs byraer (OT/SCADA-tillägg, men fler produktionsarbetare utan IT-avtal).
    matrix: {
      byraer:      { micro: { median:  24000, p25: 15000 }, small: { median:  90000, p25:  54000 }, mid: { median: 330000, p25: 200000 } },
      hantverkare: { micro: { median:  15000, p25:  9500 }, small: { median:  60000, p25:  36000 }, mid: { median: 198000, p25: 120000 } },
      ehandel:     { micro: { median:  36000, p25: 22000 }, small: { median: 150000, p25:  90000 }, mid: { median: 580000, p25: 345000 } },
      tillverkning:{ micro: { median:  30000, p25: 19000 }, small: { median: 120000, p25:  72000 }, mid: { median: 440000, p25: 264000 } },
    },
  },

  'forsakring-ansvar': {
    source: 'mock',
    unit: 'kr/år',
    note: 'License-pending — Recommender markerar dessa för VIP-kö.',
    alternatives: [
      { supplier: 'If Skadeförsäkring', positioning: 'Branschspecialiserade ansvarspaket',        reliability: 0.95 },
      { supplier: 'Länsförsäkringar',   positioning: 'Konkurrenskraftiga premier',                 reliability: 0.94 },
      { supplier: 'Gjensidige Företag', positioning: 'Specialiserad på konsultansvar',             reliability: 0.93 },
      { supplier: 'Hiscox',             positioning: 'Premium nisch — IT, konsult, professionell', reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median: 6000, p25: 4200 }, small: { median: 18000, p25: 12000 }, mid: { median:  60000, p25: 42000 } },
      hantverkare: { micro: { median: 9000, p25: 6000 }, small: { median: 30000, p25: 19200 }, mid: { median:  96000, p25: 66000 } },
      ehandel:     { micro: { median: 4800, p25: 3000 }, small: { median: 14400, p25:  9000 }, mid: { median:  48000, p25: 30000 } },
      tillverkning:{ micro: { median: 7200, p25: 4800 }, small: { median: 24000, p25: 15000 }, mid: { median:  72000, p25: 48000 } },
    },
  },

  // Managed Workplace / WaaS: bundlat avtal (dator + licenser + helpdesk).
  // recommend.js:s WaaS-gate returnerar requiresQuote:true innan benchmark används.
  // Posten + tom matrix krävs för att getBenchmark() inte kastar TypeError och
  // för att undvika no_benchmark-flödet i API:t.
  'managed-workplace': {
    source: 'requires_quote',
    unit: 'kr/år',
    note: 'Bundlat WaaS-avtal — automatisk benchmarking ej möjlig. Manuell genomgång av Arvo.',
    alternatives: [],
    matrix: {},
  },
};

// ── EN CELL SOM KUNDEN SER SKA GÅ ATT RÄKNA HEM MOT EN VERIFIERAD NIVÅ ──────────────────────
// GRUNDARBESLUT 2026-08-18: "Vi ska ALDRIG ha med ett pris som vi inte kan backa upp."
//
// Kategorier som deklarerar `cellHarledning` får sina matrisceller UTRÄKNADE ur den namngivna
// licensnivån i stället för handskrivna. Det är regel 1 tillämpad på prisboken själv: nivån är
// enda sanningen, matrisen är en vy. En handskriven cell kan glida ifrån nivån utan att någon
// märker det — och glider den, glider varje score som mäts mot den.
//
// Funktionen är exporterad så vakten (tests/matriskrav.mjs) kan pröva SAMMA väg produktionen kör,
// inte en modell av den.
// Två deklarationsformer, båda ren DATA (aldrig en funktion i prisboken — en funktion som vakten
// anropar bevisar bara att mekanismen svarar, aldrig att svaret är sant; det var villkorsvaktens fel):
//
//   A · NIVÅ    — priset står som ett fält på en licensnivå (saas-productivity → M365-nivåerna).
//                 Samma tal, alla storleksband: ett listpris varierar inte med kundens storlek.
//   B · FORMEL  — priset är fast avgift + rörlig avgift och beror därför ÄKTA på antalet enheter
//                 (loneadmin → Fortnox Lön: 199 kr/mån fast + 25 kr/anst/mån). Här är
//                 storleksvariationen en MÄTNING, inte en uppfinning, och `representant` säger
//                 rakt ut vilket antal per band vi räknar på.
//
// Returnerar { [storleksband]: {p25, median} } + nivåns datum/källa.
export function harledCeller(cat) {
  const h = cat?.cellHarledning;
  if (!h) return null;
  const f = h.faktor ?? 1;

  // A · fältplock ur en namngiven licensnivå
  if (h.referensTier) {
    const tier = cat?.licenseTierBenchmarks?.[h.referensTier];
    if (!tier) return null;
    const p25 = tier[h.p25Falt];
    const median = tier[h.medianFalt];
    if (!(p25 > 0) || !(median > 0)) return null;
    const a = Math.round(p25 * f);
    const b = Math.round(median * f);
    // Golvet får aldrig ligga över taket — vore det så är fälten förväxlade, och en förväxling
    // här vänder hela jämförelsen upp och ned i kundytan.
    if (a > b) return null;
    return { alla: { p25: a, median: b }, lastVerified: tier.lastVerified ?? null, source: tier.source ?? null };
  }

  // B · formel över en verifierad avgiftsstruktur
  if (h.kalla) {
    const k = cat?.[h.kalla];
    const fast = k?.[h.fastFalt];
    const rorligt = k?.[h.rorligtFalt];
    if (!(fast >= 0) || !(rorligt > 0) || !h.representant) return null;
    const per = {};
    for (const [band, n] of Object.entries(h.representant)) {
      if (!(n > 0)) return null;
      const v = Math.round((fast / n + rorligt) * f);
      // EN verifierad leverantör = ingen fördelning att visa. Att sätta ett tak vi inte kan belägga
      // vore att uppfinna precis det tal den här ändringen finns för att ta bort.
      per[band] = { p25: v, median: h.medianLikaMedP25 ? v : null };
      if (per[band].median == null) return null;
    }
    return { per, lastVerified: k.lastVerified ?? null, source: k.source ?? null };
  }
  return null;
}

function tillampaCellHarledning() {
  for (const cat of Object.values(BRANCHINDEX)) {
    const h = harledCeller(cat);
    if (!h) continue;
    for (const seg of Object.values(cat.matrix ?? {})) {
      for (const storlek of Object.keys(seg)) {
        const v = h.alla ?? h.per?.[storlek];
        if (v) seg[storlek] = { median: v.median, p25: v.p25 };
      }
    }
    // Kategorins datum är nivåns datum — inte det stalaste av alla nivåer. aldstaTierDatum ärvde
    // förr datumet från Googles USD-nivåer, som är sekPublic:false och per konstruktion uteslutna
    // ur varje SEK-tal vi visar. Rummet skrev därför "verifierat 17 juni" bredvid ett Microsoft-pris
    // verifierat 5 augusti: rätt siffra, fel proveniens (regel 3 räknar det som fel).
    if (h.lastVerified) cat.lastVerified = h.lastVerified;
  }
}
tillampaCellHarledning();

/**
 * Look up benchmark for a customer + category.
 * Returns null if category isn't covered.
 */
// ── EN KATEGORI ÄR BARA SÅ VERIFIERAD SOM SIN STALASTE NIVÅ ─────────────────────────────────
// molnvaxel och saas-productivity är märkta 'real-public' men saknar lastVerified på
// KATEGORINIVÅ — datumet bor per licensnivå (licenseTierBenchmarks). Ankaret läser kategorin och
// kunde därför inte visa något datum alls för dem, trots att varje enskilt pris är daterat.
// Vi härleder i stället för att skriva av (regel 1: en sanning — en avskriven kopia glider isär).
// ÄLDSTA nivån vinner, inte den nyaste: har en nivå inte kontrollerats sedan juni är kategorins
// påstående bara så gott som juni. Att välja det färskaste datumet vore att smickra oss själva.
function aldstaTierDatum(cat) {
  const tiers = cat?.licenseTierBenchmarks;
  if (!tiers || typeof tiers !== 'object') return null;
  const datum = Object.values(tiers)
    .map((t) => t?.lastVerified)
    .filter((d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort();
  return datum[0] ?? null;
}

export function getBenchmark({ category, industry, employees }) {
  const cat = BRANCHINDEX[category];
  if (!cat) return null;
  if (cat.requiresVolumeData) return null;
  // bredband saknar industry×size-matris med flit: benchmarken är hastighetsbaserad
  // (bredbandSpeedBenchmark). Kategorier utan matris har ingen generisk benchmark.
  if (!cat.matrix) return null;

  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const size = bucketForSize(employees ?? 5);
  const cell = cat.matrix[ind]?.[size];
  if (!cell) return null;

  return {
    category,
    industry: ind,
    size,
    source: cat.source ?? 'mock',
    // NÄR priset senast bevisades. Fanns i prisboken men släpptes aldrig igenom till någon
    // konsument — så kundytan kunde säga "verifierat listpris" utan att kunna säga verifierat NÄR.
    // Sommarens smyghöjning är hela skälet: prisboken stod stilla i 16 dygn medan Microsoft höjde
    // 16,6 %, och varje kund fick de gamla talen presenterade som verifierade. Ett datum är den
    // enda del av det påståendet som kunden kan kontrollera.
    lastVerified: cat.lastVerified ?? aldstaTierDatum(cat),
    unit: cat.unit,
    note: cat.note,
    median: cell.median,
    p25: cell.p25,
    alternatives: cat.alternatives,
  };
}

/**
 * Hastighetsbaserad bredband-benchmark (kr/år) härledd DETERMINISTISKT ur
 * BRANCHINDEX.bredband.tele2Verified — enda sanningen (regel 1), inga legacy-estimat.
 *   p25    = billigaste verifierade Tele2-pris som levererar ≥ speedMbit (Max/COAX är billigast)
 *   median = öppen fiber (Standard) som levererar ≥ speedMbit (typiskt dyrare)
 * Returnerar { p25, median, note, source } eller null om hastighet saknas/ogiltig.
 *
 * @param {number} speedMbit
 */
export function bredbandSpeedBenchmark(speedMbit) {
  const tv = BRANCHINDEX.bredband?.tele2Verified;
  const s = Number(speedMbit);
  if (!tv || !(s > 0)) return null;
  const nearestMonthly = (fam) => {
    const tiers = Object.keys(tv[fam]).map(Number).filter((n) => Number.isFinite(n) && n > 0).sort((a, b) => a - b);
    const t = tiers.find((n) => n >= s) ?? tiers[tiers.length - 1];
    return tv[fam][t];
  };
  const maxMonthly = nearestMonthly('max');         // COAX
  const stdMonthly = nearestMonthly('standard');    // öppen fiber
  if (maxMonthly == null && stdMonthly == null) return null;
  const cheapest = Math.min(...[maxMonthly, stdMonthly].filter((x) => x != null));
  const dearest  = Math.max(...[maxMonthly, stdMonthly].filter((x) => x != null));
  const p25 = Math.round(cheapest * 12);
  const median = Math.round(dearest * 12);
  return {
    p25,
    median,
    source: 'tele2-verified',
    note: `Bredband ≥${s} Mbit — verifierat Tele2 adress-API ${tv.lastVerified}: billigast ${cheapest} kr/mån exkl (COAX), öppen fiber ${dearest} kr/mån exkl. p25=${p25}, median=${median} kr/år.`,
  };
}
