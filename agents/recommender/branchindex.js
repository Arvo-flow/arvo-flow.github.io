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
export const REAL_PRICE_CATEGORIES = new Set(['mjukvara-saas', 'mobil']);

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
    unit: 'kr/år',
    note: 'Rörlig spotavtal + nätavgift + energiskatt (exkl. moms, SE3). Typisk förbrukning: micro ~10–20 MWh, small ~30–60 MWh, mid ~80–200 MWh.',
    alternatives: [
      { supplier: 'Tibber',       positioning: 'Spotpris per timme, ~5 öre/kWh påslag, app-drivet — lägst rörligt pris',        reliability: 0.92 },
      { supplier: 'Bixia',        positioning: '100 % förnybar el, transparent prissättning, konkurrenskraftigt rörligt avtal',  reliability: 0.94 },
      { supplier: 'Telge Energi', positioning: 'Lågt påslag, direktavtal med producenter',                                      reliability: 0.91 },
      { supplier: 'Mälarenergi',  positioning: 'Stabil regional aktör, god service, något högre påslag',                        reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000,  p25: 13000  }, small: { median: 52000,  p25: 38000  }, mid: { median: 130000, p25:  96000 } },
      hantverkare: { micro: { median: 32000,  p25: 24000  }, small: { median: 98000,  p25: 72000  }, mid: { median: 248000, p25: 182000 } },
      ehandel:     { micro: { median: 28000,  p25: 21000  }, small: { median: 98000,  p25: 72000  }, mid: { median: 248000, p25: 182000 } },
      tillverkning:{ micro: { median: 62000,  p25: 45000  }, small: { median: 248000, p25: 182000 }, mid: { median: 744000, p25: 550000 } },
    },
  },

  mobil: {
    source: 'real-public',
    unit: 'kr/år',
    // Prices are per user/year — lib/benchmark.js scales by employee count before the LLM sees it.
    // Real Tele2 Företag listpriser maj 2026 (exkl. moms): Bas 299 kr/mth, Plus 349 kr/mth, Max 449 kr/mth.
    // Median = Plus (349×12 = 4 188 kr/år). p25 = Bas (299×12 = 3 588 kr/år).
    // Volume discounts ~5 % at small, ~10 % at mid reduce both columns proportionally.
    note: 'Per användare/år (exkl. moms). Vi multiplicerar med antal anställda. Källa: Tele2 Företag listpriser maj 2026 — Bas 299 kr/mth, Plus 349 kr/mth, Max 449 kr/mth. Obegränsad data + EU-roaming. OBS: Hårdvaruhyra (telefon ~450 kr/mth) klassificeras som hardware i extract.js och ingår INTE i besparingskalkylen.',
    alternatives: [
      { supplier: 'Tele2 Företag',   positioning: 'Obegränsad data + EU-roaming, ofta 10–30 % under Telia — marknadsledare bland SMF', reliability: 0.93 },
      { supplier: 'Tre Företag',     positioning: 'Stark datakapacitet, lägst listpris för basabonnemang',                              reliability: 0.91 },
      { supplier: 'Telia Företag',   positioning: 'Störst nättäckning i Sverige, premium med bra support',                              reliability: 0.96 },
      { supplier: 'Telenor Företag', positioning: 'God täckning, flexibla volymavtal, konkurrenskraftig prissättning',                  reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median: 4188, p25: 3588 }, small: { median: 3972, p25: 3408 }, mid: { median: 3768, p25: 3228 } },
      hantverkare: { micro: { median: 4188, p25: 3588 }, small: { median: 3972, p25: 3408 }, mid: { median: 3768, p25: 3228 } },
      ehandel:     { micro: { median: 4188, p25: 3588 }, small: { median: 3972, p25: 3408 }, mid: { median: 3768, p25: 3228 } },
      tillverkning:{ micro: { median: 4188, p25: 3588 }, small: { median: 3972, p25: 3408 }, mid: { median: 3768, p25: 3228 } },
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
    unit: 'kr/år',
    note: 'Företagsfiber per kontorsadress. Verifierade listpriser maj 2026 (exkl. moms): Tele2 Företag 1200 Mbit 849 kr/mån (reguljärt), Bahnhof Företag 1 Gbit från 995 kr/mån. Priser adressberoende. Matrisen inkluderar 100–1 000 Mbit och speglar faktisk betald premie, inte lägsta tekniskt möjliga.',
    alternatives: [
      { supplier: 'Tele2 Företag Bredband', positioning: 'Verifierat 849 kr/mån (1200 Mbit, 24 mån) — stark bundle med mobilabonnemang', reliability: 0.93 },
      { supplier: 'Bahnhof Företag',        positioning: 'Verifierat från 995 kr/mån (1 Gbit) — svensk support, statisk IP, stark SLA',  reliability: 0.96 },
      { supplier: 'GlobalConnect',          positioning: 'Premium dedikerad fiber, bäst för datacenter-trafik och hög redundans — offert krävs', reliability: 0.97 },
    ],
    matrix: {
      byraer:      { micro: { median: 9000,  p25: 6500  }, small: { median: 13200, p25:  9600 }, mid: { median: 28800, p25: 19200 } },
      hantverkare: { micro: { median: 9600,  p25: 7200  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      ehandel:     { micro: { median: 9600,  p25: 7200  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      tillverkning:{ micro: { median: 10800, p25: 7800  }, small: { median: 16800, p25: 12000 }, mid: { median: 36000, p25: 26400 } },
    },
  },

  kortterminal: {
    source: 'real-public',
    unit: 'kr/år',
    // Verifierade transaktionsavgifter maj 2026: SumUp 1,49 %, Zettle 1,85 %, Stripe Terminal 1,4 % + ~1,10 kr/köp.
    // Kortvolymer uppskattade (ingen offentlig källa): micro ~500 kkr/år, small ~2 Mkr/år, mid ~8 Mkr/år.
    // Tillverkning halverad (mestadels B2B-fakturering, låg kortandel).
    note: 'Transaktionsavgifter. Verifierade listpriser maj 2026: SumUp 1,49 % (ingen månadsavgift), Zettle 1,85 % (ingen månadsavgift), Stripe Terminal 1,4 % + ~1,10 kr/transaktion EEA-kort. Kortvolym uppskattad per segment.',
    alternatives: [
      { supplier: 'SumUp',            positioning: 'Verifierat 1,49 % per transaktion, ingen månadsavgift — lägst kostnad för låg-volym', reliability: 0.91 },
      { supplier: 'Zettle by PayPal', positioning: 'Verifierat 1,85 % per transaktion, ingen månadsavgift, stark app-integration',        reliability: 0.93 },
      { supplier: 'Stripe Terminal',  positioning: 'Verifierat 1,4 % + ~1,10 kr/köp EEA-kort — bäst om kunden redan har Stripe online',   reliability: 0.97 },
      { supplier: 'Klarna Checkout',  positioning: 'Bäst för e-handel: integrerad checkout med bnpl och kortbetalning',                   reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median:  9250, p25:  7450 }, small: { median:  37000, p25:  29800 }, mid: { median: 148000, p25: 119200 } },
      hantverkare: { micro: { median:  9250, p25:  7450 }, small: { median:  37000, p25:  29800 }, mid: { median: 148000, p25: 119200 } },
      ehandel:     { micro: { median:  9250, p25:  7450 }, small: { median:  37000, p25:  29800 }, mid: { median: 148000, p25: 119200 } },
      tillverkning:{ micro: { median:  4625, p25:  3725 }, small: { median:  18500, p25:  14900 }, mid: { median:  74000, p25:  59600 } },
    },
  },

  'faktura-tjanst': {
    unit: 'kr/år',
    note: 'Utskickstjänst utöver bokföringssystemets inbyggda e-faktura.',
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

  'mjukvara-saas': {
    source: 'real-public',
    unit: 'kr/år',
    // p25 = M365 Business Standard listpris maj 2026: 142 kr/mth × 12 = 1 704 kr/år/user (exkl. moms).
    // Källa: Senetic/Microsoft CSP publika listpriser. Nästa prisändring aviserad juli 2026.
    // Median = typisk SMF-betalning via CSP med standardpåslag (~220–240 kr/mth).
    note: 'Per användare/år (exkl. moms). Referensprodukt: M365 Business Standard. Källa: Microsoft CSP listpris maj 2026 — 142 kr/mth = 1 704 kr/år/user. Median = typisk CSP-pris med standardpåslag.',
    alternatives: [
      { supplier: 'Microsoft 365 Business Standard (Arvo CSP)',  positioning: 'Rätt tier för de flesta SMF — Teams, SharePoint, Exchange, 1 TB OneDrive. Väsentligt lägre än E3/E5.', reliability: 0.97 },
      { supplier: 'Google Workspace Business Standard',          positioning: 'Starkaste alternativet till M365 — 2 TB Drive, Meet, Docs. Ofta 30–40 % billigare än M365.',            reliability: 0.96 },
      { supplier: 'Microsoft 365 Business Premium',              positioning: 'För bolag med säkerhetskrav (Intune, Defender) utan behov av E5-compliance-funktioner.',               reliability: 0.97 },
      { supplier: 'Zoho Workplace',                              positioning: 'Budgetalternativ med e-post, docs och CRM-integration — lägst TCO för enkla behov.',                  reliability: 0.89 },
    ],
    matrix: {
      byraer:      { micro: { median: 2880, p25: 1704 }, small: { median: 2640, p25: 1704 }, mid: { median: 2400, p25: 1704 } },
      hantverkare: { micro: { median: 2400, p25: 1704 }, small: { median: 2160, p25: 1704 }, mid: { median: 1920, p25: 1704 } },
      ehandel:     { micro: { median: 2640, p25: 1704 }, small: { median: 2400, p25: 1704 }, mid: { median: 2160, p25: 1704 } },
      tillverkning:{ micro: { median: 2400, p25: 1704 }, small: { median: 2160, p25: 1704 }, mid: { median: 1920, p25: 1704 } },
    },
  },

  skrivarleasing: {
    source: 'estimated',
    unit: 'kr/år',
    note: 'Totalt per år: skrivarhyra + klickavtal S/V + serviceavtal. Referens: A4 MFP mid-range med klickpris 0,06–0,09 kr/sida S/V. Källa: marknadspriser 2026.',
    alternatives: [
      { supplier: 'Konica Minolta SMB Solutions', positioning: 'Stark SMF-portfölj, konkurrenskraftiga klickavtal, rikstäckande service',       reliability: 0.95 },
      { supplier: 'Ricoh Sverige',                positioning: 'Bäst total cost of ownership för mellanstor printvolym, stark SLA',              reliability: 0.94 },
      { supplier: 'Canon Business Solutions',     positioning: 'Bred modellflora, bra för blandad A3/A4-volym, stark support',                  reliability: 0.93 },
      { supplier: 'Kyocera Document Solutions',   positioning: 'Lägst klickpris i klassen, lång livslängd på hardware — lägst TCO totalt',      reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000, p25: 12600 }, small: { median: 30000, p25: 21600 }, mid: { median:  48000, p25:  33600 } },
      hantverkare: { micro: { median: 12000, p25:  8400 }, small: { median: 24000, p25: 16800 }, mid: { median:  42000, p25:  28800 } },
      ehandel:     { micro: { median: 15000, p25: 10200 }, small: { median: 30000, p25: 21000 }, mid: { median:  48000, p25:  33600 } },
      tillverkning:{ micro: { median: 18000, p25: 12600 }, small: { median: 48000, p25: 33600 }, mid: { median: 120000, p25:  84000 } },
    },
  },

  loneadmin: {
    source: 'real-public',
    unit: 'kr/år',
    // Verifierat: Fortnox Lön listpris maj 2026 (exkl. moms): 199 kr/mån fast + 25 kr/anställd/mån.
    // p25 = Fortnox-priset per anställd/år vid representativt anställningsantal per bucket:
    //   micro  (n=5):   (199 + 5×25)×12/5   =  780 kr/anst/år
    //   small  (n=20):  (199 + 20×25)×12/20 =  420 kr/anst/år
    //   mid    (n=100): (199 + 100×25)×12/100= 324 kr/anst/år
    // Median = vad marknaden faktiskt betalar (Visma, Hogia, Azets-nivå).
    note: 'Per anställd/år. Källa p25: Fortnox Lön verifierat listpris maj 2026 — 199 kr/mån fast + 25 kr/anst/mån. Median = typisk marknadspremie för system utan Fortnox-integration.',
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
    note: 'Per driftsställe/år. Inkluderar larmövervakning + larmcentral + utrustningshyra. Källa: operatörernas listpriser 2026.',
    alternatives: [
      { supplier: 'Sector Alarm Företag', positioning: 'Lägst månadsavgift, stark app-integration, snabb utryckning',        reliability: 0.94 },
      { supplier: 'Safemore',             positioning: 'Konkurrenskraftigt pris, stark för SMF utan komplex säkerhetsinfra', reliability: 0.92 },
      { supplier: 'Verisure Företag',     positioning: 'Rikstäckande, välkänt varumärke, bra för multi-site',               reliability: 0.95 },
      { supplier: 'Securitas Sverige',    positioning: 'Premium-alternativ med bemannad bevakning om det behövs',           reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median:  9600, p25: 6720 }, small: { median: 18000, p25: 12600 }, mid: { median:  42000, p25: 29400 } },
      hantverkare: { micro: { median: 12000, p25: 8400 }, small: { median: 24000, p25: 16800 }, mid: { median:  54000, p25: 37800 } },
      ehandel:     { micro: { median:  9600, p25: 6720 }, small: { median: 18000, p25: 12600 }, mid: { median:  42000, p25: 29400 } },
      tillverkning:{ micro: { median: 14400, p25: 9600 }, small: { median: 30000, p25: 21000 }, mid: { median:  84000, p25: 58800 } },
    },
  },

  foretagshalsovard: {
    unit: 'kr/år',
    note: 'Per anställd/år. Grundpaket med hälsoundersökning, rehab-koordinering och krissamtal. Källa: leverantörers listpriser 2026.',
    alternatives: [
      { supplier: 'Feelgood Företagshälsa', positioning: 'Störst i Sverige, digitalt primärt, konkurrenskraftigt grundpris',        reliability: 0.95 },
      { supplier: 'Avonova',               positioning: 'Stark digitalt + fysiskt, bra för bolag med blandade arbetsplatser',      reliability: 0.94 },
      { supplier: 'Falck Health',          positioning: 'Internationell aktör, stark för multi-site och internationella bolag',    reliability: 0.93 },
      { supplier: 'Previa',               positioning: 'Premium-aktör, bred specialistkompetens, bäst för komplexa rehabbehov',   reliability: 0.95 },
    ],
    matrix: {
      byraer:      { micro: { median: 3600, p25: 2520 }, small: { median: 3000, p25: 2040 }, mid: { median: 2400, p25: 1680 } },
      hantverkare: { micro: { median: 4200, p25: 2940 }, small: { median: 3600, p25: 2520 }, mid: { median: 2880, p25: 2016 } },
      ehandel:     { micro: { median: 3600, p25: 2520 }, small: { median: 3000, p25: 2040 }, mid: { median: 2400, p25: 1680 } },
      tillverkning:{ micro: { median: 4200, p25: 2940 }, small: { median: 3600, p25: 2520 }, mid: { median: 2880, p25: 2016 } },
    },
  },

  bankavgifter: {
    unit: 'kr/år',
    note: 'Totalt per år: månadsavgift + transaktionsavgifter + kortavgifter. Källa: bankernas listpriser 2026.',
    alternatives: [
      { supplier: 'Lunar Business',              positioning: 'Ingen månadsavgift, API-first, bäst för digitala bolag utan kontanthantering', reliability: 0.91 },
      { supplier: 'Qred Företagskonto',          positioning: 'Låg månadsavgift, stark för SMF med enkel transaktionsprofil',                reliability: 0.90 },
      { supplier: 'Länsförsäkringar Bank Företag', positioning: 'Bra prissättning för traditionellt SMF, personlig rådgivning',             reliability: 0.93 },
      { supplier: 'SEB Företagskonto',           positioning: 'Fullsortiment, bäst om kunden behöver valuta eller exporttjänster',          reliability: 0.95 },
    ],
    matrix: {
      byraer:      { micro: { median: 4800, p25: 2400 }, small: { median:  9600, p25:  5400 }, mid: { median: 24000, p25: 13200 } },
      hantverkare: { micro: { median: 5400, p25: 2640 }, small: { median: 10800, p25:  6000 }, mid: { median: 27000, p25: 15000 } },
      ehandel:     { micro: { median: 6000, p25: 3000 }, small: { median: 12000, p25:  6600 }, mid: { median: 30000, p25: 16800 } },
      tillverkning:{ micro: { median: 6000, p25: 3000 }, small: { median: 12000, p25:  6600 }, mid: { median: 30000, p25: 16800 } },
    },
  },

  kontorsmaterial: {
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

  'it-support': {
    unit: 'kr/år',
    note: 'IT-drift, support och managed services per år. Abonnemangsbaserat eller per timme. Källa: leverantörers offertpriser 2026.',
    alternatives: [
      { supplier: 'Atea',             positioning: 'Marknadsledande, bred kompetens, enterprise-grade SLA och rikstäckning',         reliability: 0.95 },
      { supplier: 'Advania',          positioning: 'SMF-fokuserad, personlig service, rimliga priser, stark i Nordens-städer',      reliability: 0.91 },
      { supplier: 'Dustin IT-tjänst', positioning: 'God prissättning, snabb leverans av hårdvara + integrerade supportavtal',      reliability: 0.90 },
      { supplier: 'Lokal IT-partner', positioning: 'Snabbast responstid, personlig kontakt, flexibla villkor — lägst kostnad SMF', reliability: 0.87 },
    ],
    matrix: {
      byraer:      { micro: { median: 24000, p25: 15000 }, small: { median:  72000, p25:  45000 }, mid: { median: 240000, p25: 150000 } },
      hantverkare: { micro: { median: 15000, p25:  9500 }, small: { median:  48000, p25:  30000 }, mid: { median: 144000, p25:  90000 } },
      ehandel:     { micro: { median: 36000, p25: 22000 }, small: { median: 120000, p25:  75000 }, mid: { median: 420000, p25: 262000 } },
      tillverkning:{ micro: { median: 30000, p25: 19000 }, small: { median:  96000, p25:  60000 }, mid: { median: 320000, p25: 200000 } },
    },
  },

  'forsakring-ansvar': {
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
};

/**
 * Look up benchmark for a customer + category.
 * Returns null if category isn't covered.
 */
export function getBenchmark({ category, industry, employees }) {
  const cat = BRANCHINDEX[category];
  if (!cat) return null;

  const ind = INDUSTRY_SEGMENT_MAP[industry] ?? 'byraer';
  const size = bucketForSize(employees ?? 5);
  const cell = cat.matrix[ind]?.[size];
  if (!cell) return null;

  return {
    category,
    industry: ind,
    size,
    source: cat.source ?? 'mock',
    unit: cat.unit,
    note: cat.note,
    median: cell.median,
    p25: cell.p25,
    alternatives: cat.alternatives,
  };
}
