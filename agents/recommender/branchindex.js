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
    // Nordpool SE3 snittpris 2025: ~64 öre/kWh spot. Nätavgift: ~28–35 öre/kWh (region-beroende).
    // Energiskatt 2026: 53,50 öre/kWh (Skatteverket). Elbolags påslag: ~8–15 öre/kWh.
    // All-in rörligt spotavtal: ~1,45–1,65 kr/kWh exkl. moms.
    // p25 = effektivt spotavtal (t.ex. Tibber/Bixia): ~1,45 kr/kWh.
    // Median = traditionellt rörligt avtal: ~1,60 kr/kWh.
    note: 'Rörlig spotavtal + nätavgift + energiskatt (exkl. moms, SE3). Källa: Nordpool SE3 snittpris 2025 ~64 öre/kWh spot + nätavgift ~30 öre/kWh + energiskatt 53,5 öre/kWh (Skatteverket 2026) = ~1,47–1,65 kr/kWh all-in. Typisk förbrukning: micro ~10–20 MWh/år, small ~30–60 MWh/år, mid ~80–200 MWh/år.',
    alternatives: [
      { supplier: 'Tibber',       positioning: 'Spotpris per timme, ~5 öre/kWh påslag, app-drivet — lägst rörligt pris',        reliability: 0.92 },
      { supplier: 'Bixia',        positioning: '100 % förnybar el, transparent prissättning, konkurrenskraftigt rörligt avtal',  reliability: 0.94 },
      { supplier: 'Telge Energi', positioning: 'Lågt påslag, direktavtal med producenter',                                      reliability: 0.91 },
      { supplier: 'Mälarenergi',  positioning: 'Stabil regional aktör, god service, något högre påslag',                        reliability: 0.96 },
    ],
    // Metodologi mid-korrektion (byraer):
    // 100-personers kontor ~1 000 kvm × 100 kWh/kvm (Energimyndigheten normtal) = 100 000 kWh.
    // Median: 100 000 × 1,57 kr = 157 000 → 165 000 kr (inkl. gemensamma utrymmen).
    // p25: 900 kvm × 80 kWh × 1,45 kr = 104 400 → 108 000 kr (nybyggt, spotavtal).
    // Övriga segment (hantverkare/ehandel/tillverkning) inom ±15 % av kalkyl — oförändrade.
    matrix: {
      byraer:      { micro: { median: 18000,  p25: 13000  }, small: { median:  52000, p25:  38000 }, mid: { median: 165000, p25: 108000 } },
      hantverkare: { micro: { median: 32000,  p25: 24000  }, small: { median:  98000, p25:  72000 }, mid: { median: 248000, p25: 182000 } },
      ehandel:     { micro: { median: 28000,  p25: 21000  }, small: { median:  98000, p25:  72000 }, mid: { median: 248000, p25: 182000 } },
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
    // p25 = M365 Business Standard listpris maj 2026: 142 kr/mth × 12 = 1 704 kr/år/user (exkl. moms).
    // Källa: Senetic/Microsoft CSP publika listpriser. Nästa prisändring aviserad juli 2026.
    // Median = typisk SMF-betalning via CSP med standardpåslag (~220–240 kr/mth).
    // Gäller: M365, Google Workspace, Zoom, Slack — produktivitetsverktyg med jämförbar per-user-prissättning.
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

  'saas-creative': {
    requiresVolumeData: true,
    volumeDataNote: 'Kreativ mjukvara (Adobe CC, Figma, Canva) prissätts per produkt och tier — inte jämförbar med produktivitetsverktyg. Våra experter kikar på detta manuellt för att ge er en rättvis analys.',
    unit: 'kr/år',
    note: 'Per användare/år. Designverktyg och kreativ mjukvara — prisnivå beror starkt på produktval och tier.',
    alternatives: [
      { supplier: 'Adobe Creative Cloud for Teams', positioning: 'Branschstandard för kreativa team — offert via Arvo CSP ger volymrabatt',     reliability: 0.95 },
      { supplier: 'Figma Organization',             positioning: 'Designplattform med starka samarbetsfunktioner, konkurrenskraftigt vs Adobe', reliability: 0.93 },
      { supplier: 'Canva for Teams',                positioning: 'Lägst kostnad för enklare grafik utan avancerade redigeringsbehov',           reliability: 0.88 },
    ],
  },

  'saas-crm': {
    requiresVolumeData: true,
    volumeDataNote: 'CRM-system prissätts ofta utifrån antalet kontakter i databasen och specifika säljverktyg. Våra experter kikar på detta för en rättvis kalkyl.',
    unit: 'kr/år',
    note: 'CRM-licenser. Prissättning beror på kontaktvolym, pipeline-moduler och avtalslängd.',
    alternatives: [
      { supplier: 'HubSpot CRM (Starter/Pro)',  positioning: 'Ledande för SMF — skalbar från gratis till avancerad automatisering',         reliability: 0.94 },
      { supplier: 'Pipedrive',                  positioning: 'Enkelt och effektivt för säljfokuserade bolag, lägst TCO för rena CRM-behov', reliability: 0.92 },
      { supplier: 'Zoho CRM',                   positioning: 'Bredaste funktionsuppsättningen till lägst kostnad — bäst pris/prestanda',    reliability: 0.90 },
    ],
  },

  'saas-finance': {
    requiresVolumeData: true,
    volumeDataNote: 'Affärs- och bokföringssystem styrs ofta av antalet verifikationer, moduler och transaktioner, inte bara antalet anställda. Vi analyserar detta manuellt.',
    unit: 'kr/år',
    note: 'Bokföringssystem och affärssystem (ERP). Prissättning beror på modulval, transaktionsvolym och antal bolag.',
    alternatives: [
      { supplier: 'Fortnox',        positioning: 'Lägst grundkostnad för SMF — modulbaserat, skalbart, stark integration mot banker',  reliability: 0.96 },
      { supplier: 'Visma eEkonomi', positioning: 'Bredare funktionalitet, stark för bolag med komplexa rapporteringsbehov',            reliability: 0.94 },
      { supplier: 'Bokio',          positioning: 'Enklast och billigast för solobolag och mikroföretag utan komplex redovisning',       reliability: 0.88 },
    ],
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
    // Kammarkollegiet ramavtal "Kopiatorer och Skrivare" (offentlig upphandling, representativ proxy för SMB):
    // A4 MFP leasingavgift: 150–350 kr/mån. Klickpris S/V: 0,05–0,08 kr/sida. Klickpris färg: 0,45–0,80 kr/sida.
    // Serviceavtal ingår i de flesta managed print-avtal.
    // p25 = Kyocera/Brother-klass (lägst TCO). Median = Ricoh/Konica Minolta-klass (marknadsledare).
    note: 'Totalt per år: skrivarhyra + klickavtal S/V + serviceavtal. Källa: Kammarkollegiet ramavtal "Kopiatorer och Skrivare" maj 2026 + operatörernas publika startpriser. A4 MFP lease 150–350 kr/mån, klick S/V 0,05–0,08 kr/sida, klick färg 0,45–0,80 kr/sida.',
    alternatives: [
      { supplier: 'Konica Minolta SMB Solutions', positioning: 'Stark SMF-portfölj, konkurrenskraftiga klickavtal, rikstäckande service',       reliability: 0.95 },
      { supplier: 'Ricoh Sverige',                positioning: 'Bäst total cost of ownership för mellanstor printvolym, stark SLA',              reliability: 0.94 },
      { supplier: 'Canon Business Solutions',     positioning: 'Bred modellflora, bra för blandad A3/A4-volym, stark support',                  reliability: 0.93 },
      { supplier: 'Kyocera Document Solutions',   positioning: 'Lägst klickpris i klassen, lång livslängd på hardware — lägst TCO totalt',      reliability: 0.92 },
    ],
    // Metodologi (total MPS-kostnad per år, ej per anställd):
    // Antal MFPs: micro=1, small=2–3, mid=5–6 (baserat på 1 per 10–15 anst, modern papperslös trend).
    // p25-pris/MFP/mån: Kyocera-klass 480 kr (200 kr lease + 3 000 S/V×0,06 + 300 färg×0,45).
    // Median-pris/MFP/mån: Ricoh/Konica-klass 850–1 000 kr (300 kr lease + 4 000×0,075 + 400×0,65).
    // mid-korrektion: nuv. 48 000 kr = 4 MFPs × 1 000 kr. 5 MFPs × 1 000–1 200 kr = 60 000–72 000 → 60 000.
    // Hantverkare micro/small: lägre volym (fältarbete, färre kontorsutskrifter) → 70 % av byraer.
    // Tillverkning mid: hög volym (ritningar, arbetsberedningar) → egna värden behålls med +25 % korrektion.
    matrix: {
      byraer:      { micro: { median: 16800, p25: 11400 }, small: { median: 28800, p25: 19200 }, mid: { median:  60000, p25:  42000 } },
      hantverkare: { micro: { median: 11400, p25:  7800 }, small: { median: 22800, p25: 15600 }, mid: { median:  54000, p25:  36000 } },
      ehandel:     { micro: { median: 14400, p25:  9600 }, small: { median: 28800, p25: 19200 }, mid: { median:  60000, p25:  42000 } },
      tillverkning:{ micro: { median: 18000, p25: 12600 }, small: { median: 48000, p25: 33600 }, mid: { median: 150000, p25: 105000 } },
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
    requiresVolumeData: true,
    volumeDataNote: 'Avfallskostnader styrs av tömningsfrekvens, vikt och fraktioner. Fakturan innehåller även lagstadgad miljöskatt som inte kan förhandlas. Våra experter behöver granska ert tömningsschema för att ta fram en rättvis offert.',
    unit: 'kr/år',
    note: 'Avfall & återvinning. Kostnad varierar med containertyp, tömningsfrekvens, avfallsfraktioner och lagstadgade avgifter.',
    alternatives: [
      { supplier: 'Ragn-Sells',      positioning: 'Rikstäckande, starka volymmavtal, bred tjänsteportfölj för B2B',         reliability: 0.91 },
      { supplier: 'SUEZ Sverige',    positioning: 'Konkurrenskraftiga volymmpriser, certifierad återvinning',                reliability: 0.90 },
      { supplier: 'Stena Recycling', positioning: 'Miljöfokus, stark på källsortering och cirkulär ekonomi',                reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000, p25: 12000 }, small: { median:  48000, p25:  32000 }, mid: { median: 120000, p25:  80000 } },
      hantverkare: { micro: { median: 28000, p25: 18000 }, small: { median:  72000, p25:  48000 }, mid: { median: 180000, p25: 120000 } },
      ehandel:     { micro: { median: 24000, p25: 16000 }, small: { median:  60000, p25:  40000 }, mid: { median: 150000, p25: 100000 } },
      tillverkning:{ micro: { median: 48000, p25: 32000 }, small: { median: 120000, p25:  80000 }, mid: { median: 300000, p25: 200000 } },
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
  if (cat.requiresVolumeData) return null;

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
