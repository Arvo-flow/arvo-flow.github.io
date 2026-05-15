// agents/recommender/branchindex.js
// Mock benchmark index used by the Recommender.
// Source: public list prices (2026) — operator websites, Elpriskollen, Prisguiden.
// Replaced automatically with real aggregated Postgres data once ≥10 invoice
// datapoints exist per segment (see lib/benchmark.js). Shape is stable.

export const SOURCE = 'mock';
export const SOURCE_NOTE =
  'Estimat från publika listpriser 2026. Ersätts med riktig aggregerad data när vi har ≥10 datapunkter per segment.';

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
    unit: 'kr/år',
    // Prices are per user/year — lib/benchmark.js scales by employee count before the LLM sees it.
    note: 'Per användare/år. Vi multiplicerar med antal anställda när vi gör jämförelsen. Källa: operatörernas listpriser 2026, obegränsad data + EU-roaming.',
    alternatives: [
      { supplier: 'Tele2 Företag',   positioning: 'Obegränsad data + EU-roaming, ofta 10–30 % under Telia — marknadsledare bland SMF', reliability: 0.93 },
      { supplier: 'Tre Företag',     positioning: 'Stark datakapacitet, lägst listpris för basabonnemang',                              reliability: 0.91 },
      { supplier: 'Telia Företag',   positioning: 'Störst nättäckning i Sverige, premium med bra support',                              reliability: 0.96 },
      { supplier: 'Telenor Företag', positioning: 'God täckning, flexibla volymavtal, konkurrenskraftig prissättning',                  reliability: 0.92 },
    ],
    // micro: 349 kr/mth median, 299 kr/mth p25. Volume discounts ~5 % small, ~10 % mid.
    matrix: {
      byraer:      { micro: { median: 4188, p25: 3588 }, small: { median: 3948, p25: 3348 }, mid: { median: 3708, p25: 3108 } },
      hantverkare: { micro: { median: 4188, p25: 3588 }, small: { median: 3948, p25: 3348 }, mid: { median: 3708, p25: 3108 } },
      ehandel:     { micro: { median: 4188, p25: 3588 }, small: { median: 3948, p25: 3348 }, mid: { median: 3708, p25: 3108 } },
      tillverkning:{ micro: { median: 4188, p25: 3588 }, small: { median: 3948, p25: 3348 }, mid: { median: 3708, p25: 3108 } },
    },
  },

  bredband: {
    unit: 'kr/år',
    note: 'Företagsfiber per kontorsadress, 1 000 Mbit symmetrisk, SLA-avtal, statisk IP. Källa: operatörernas listpriser 2026.',
    alternatives: [
      { supplier: 'Bahnhof Företag',        positioning: 'Svensk support, statisk IP, stark SLA — prisledare för kontorsfiber',    reliability: 0.96 },
      { supplier: 'Tele2 Företag Bredband', positioning: 'Konkurrenskraftigt pris, ingår i bundle med mobilabonnemang',            reliability: 0.92 },
      { supplier: 'Telenor Business',       positioning: 'Bred täckning, marknadsledande SLA, bra för multi-site',                 reliability: 0.94 },
      { supplier: 'GlobalConnect',          positioning: 'Premium dedikerad fiber, bäst för datacenter-trafik och hög redundans',  reliability: 0.97 },
    ],
    matrix: {
      byraer:      { micro: { median: 9000,  p25: 6500  }, small: { median: 13200, p25:  9600 }, mid: { median: 28800, p25: 19200 } },
      hantverkare: { micro: { median: 9600,  p25: 7200  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      ehandel:     { micro: { median: 9600,  p25: 7200  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      tillverkning:{ micro: { median: 10800, p25: 7800  }, small: { median: 16800, p25: 12000 }, mid: { median: 36000, p25: 26400 } },
    },
  },

  kortterminal: {
    unit: 'kr/år',
    // Volumes: micro ~500 kkr/yr, small ~2 Mkr/yr, mid ~8 Mkr/yr.
    // Median = Zettle 1.85 %, P25 = SumUp Lite 1.49 %. Tillverkning halved (mostly B2B invoicing).
    note: 'Transaktionsavgifter + månadsavgifter. Antagen kortvolym: micro ~500 kkr/år, small ~2 Mkr/år, mid ~8 Mkr/år. SumUp Lite 1,49 %, Zettle 1,85 %.',
    alternatives: [
      { supplier: 'SumUp Lite',       positioning: '1,49 % per transaktion, ingen månadsavgift — lägst kostnad för låg-volym',     reliability: 0.91 },
      { supplier: 'Zettle by PayPal', positioning: '1,85 % per transaktion, ingen månadsavgift, stark app-integration',             reliability: 0.93 },
      { supplier: 'Stripe Terminal',  positioning: '1,4 % + 1,80 kr per köp, API-first — bäst om kunden redan har Stripe online',  reliability: 0.97 },
      { supplier: 'Klarna Checkout',  positioning: 'Bäst för e-handel: integrerad checkout med bnpl och kortbetalning',            reliability: 0.96 },
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
    unit: 'kr/år',
    note: 'Per användare/år. Referensprodukt: M365 Business Standard / Google Workspace Business Standard via volymavtal. Källa: CSP-listpriser 2026.',
    alternatives: [
      { supplier: 'Microsoft 365 Business Standard (Arvo CSP)',  positioning: 'Rätt tier för de flesta SMF — Teams, SharePoint, Exchange, 1 TB OneDrive. Väsentligt lägre än E3/E5.', reliability: 0.97 },
      { supplier: 'Google Workspace Business Standard',          positioning: 'Starkaste alternativet till M365 — 2 TB Drive, Meet, Docs. Ofta 30–40 % billigare än M365.',            reliability: 0.96 },
      { supplier: 'Microsoft 365 Business Premium',              positioning: 'För bolag med säkerhetskrav (Intune, Defender) utan behov av E5-compliance-funktioner.',               reliability: 0.97 },
      { supplier: 'Zoho Workplace',                              positioning: 'Budgetalternativ med e-post, docs och CRM-integration — lägst TCO för enkla behov.',                  reliability: 0.89 },
    ],
    matrix: {
      byraer:      { micro: { median: 2520, p25: 1920 }, small: { median: 3000, p25: 2160 }, mid: { median: 3600, p25: 2520 } },
      hantverkare: { micro: { median: 1800, p25: 1440 }, small: { median: 2160, p25: 1680 }, mid: { median: 2520, p25: 1920 } },
      ehandel:     { micro: { median: 2160, p25: 1680 }, small: { median: 2640, p25: 2040 }, mid: { median: 3120, p25: 2280 } },
      tillverkning:{ micro: { median: 1800, p25: 1440 }, small: { median: 2160, p25: 1680 }, mid: { median: 2520, p25: 1920 } },
    },
  },

  skrivarleasing: {
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
    unit: 'kr/år',
    note: 'Per anställd/år. Löneadministrationsprogram eller outsourcad lönekörning. Källa: leverantörers listpriser 2026.',
    alternatives: [
      { supplier: 'Fortnox Lön',   positioning: 'Integrerat i Fortnox-paketet — ingen extra kostnad om kunden redan har Fortnox', reliability: 0.96 },
      { supplier: 'Hogia Lön',     positioning: 'Marknadsledare för mid-size, starka kollektivavtalsregler inbyggda',              reliability: 0.95 },
      { supplier: 'Visma Lön',     positioning: 'Stark integration med Visma eEkonomi, bred support',                             reliability: 0.94 },
      { supplier: 'Azets Sverige', positioning: 'Outsourcad lönekörning — rätt om kunden vill slippa systemansvar helt',          reliability: 0.93 },
    ],
    matrix: {
      byraer:      { micro: { median: 2400, p25: 1680 }, small: { median: 1800, p25: 1200 }, mid: { median: 1200, p25:  840 } },
      hantverkare: { micro: { median: 2400, p25: 1680 }, small: { median: 1800, p25: 1200 }, mid: { median: 1200, p25:  840 } },
      ehandel:     { micro: { median: 2400, p25: 1680 }, small: { median: 1800, p25: 1200 }, mid: { median: 1200, p25:  840 } },
      tillverkning:{ micro: { median: 2400, p25: 1680 }, small: { median: 1800, p25: 1200 }, mid: { median: 1200, p25:  840 } },
    },
  },

  'larm-bevakning': {
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
    unit: cat.unit,
    note: cat.note,
    median: cell.median,
    p25: cell.p25,
    alternatives: cat.alternatives,
  };
}
