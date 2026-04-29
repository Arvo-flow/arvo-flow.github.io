// agents/recommender/branchindex.js
// MOCK branchindex used by the Recommender to score "is this customer overpaying?"
// Until we have ≥100 real customers, these are credible market estimates from
// public sources (Konsumentverket, Energimarknadsinspektionen, branschorganisationer
// like Installatörsföretagen, Svensk Försäkring; supplier list-prices). Mark as MOCK
// so the Recommender's reasoning never claims this is proprietary data.
//
// Replace with real aggregated data once we have it. Keep the SHAPE stable so
// downstream code doesn't change.

export const SOURCE = 'mock';
export const SOURCE_NOTE =
  'Estimat från publika listpriser och branschrapporter. Ersätts med riktig aggregerad data när vi har ≥100 kunder.';

// Industries we segment by — matches the cohort strategy
export const INDUSTRIES = ['byraer', 'hantverkare', 'ehandel', 'tillverkning'];

// Size buckets (employees)
export const SIZE_BUCKETS = [
  { id: 'micro', label: '1–9 anställda', min: 1, max: 9 },
  { id: 'small', label: '10–49 anställda', min: 10, max: 49 },
  { id: 'mid', label: '50–249 anställda', min: 50, max: 249 },
];

export function bucketForSize(employees) {
  return SIZE_BUCKETS.find((b) => employees >= b.min && employees <= b.max)?.id ?? 'micro';
}

// Per category: per industry × size, the median + p25 (best 25%) annual cost,
// and a list of plausible alternative suppliers with their typical positioning.
//
// Numbers are SEK/year unless noted otherwise.
export const BRANCHINDEX = {
  el: {
    unit: 'kr/år',
    note: 'Antar ~ medel-företag förbrukar 50–250 MWh/år beroende på storlek',
    alternatives: [
      { supplier: 'Tibber',          positioning: 'Spotpris timme för timme, lågt påslag (~5,9 öre/kWh), app-driven',  reliability: 0.92 },
      { supplier: 'Bixia',           positioning: 'Förnybar el, transparent prissättning, mid-tier påslag',            reliability: 0.94 },
      { supplier: 'Telge Energi',    positioning: 'Lågt påslag, sluter direkt med producenter',                        reliability: 0.91 },
      { supplier: 'Mälarenergi',     positioning: 'Stabil regional aktör, något högre påslag men bra service',         reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000,  p25: 12000  }, small: { median: 65000,  p25: 47000  }, mid: { median: 180000, p25: 135000 } },
      hantverkare: { micro: { median: 26000,  p25: 19000  }, small: { median: 110000, p25: 82000  }, mid: { median: 290000, p25: 220000 } },
      ehandel:     { micro: { median: 32000,  p25: 23000  }, small: { median: 145000, p25: 108000 }, mid: { median: 400000, p25: 300000 } },
      tillverkning:{ micro: { median: 95000,  p25: 70000  }, small: { median: 480000, p25: 360000 }, mid: { median: 1500000, p25: 1100000 } },
    },
  },
  mobil: {
    unit: 'kr/år',
    note: 'Per användare/år. Vi multiplicerar med antal anställda när vi gör jämförelsen.',
    alternatives: [
      { supplier: 'Tele2 Företag',   positioning: 'Obegränsad data + EU-roaming, ofta 30–40% under Telia',  reliability: 0.93 },
      { supplier: 'Tre Företag',     positioning: 'Bra datapaket, lägst pris i lower-tier',                  reliability: 0.91 },
      { supplier: 'Vimla',           positioning: 'Företagsabonnemang utan bindning, prisledare',            reliability: 0.88 },
      { supplier: 'Halebop',         positioning: 'Fokus på data, stark prissättning',                       reliability: 0.90 },
    ],
    matrix: {
      byraer:      { micro: { median: 2400,  p25: 1620  }, small: { median: 2280,  p25: 1500  }, mid: { median: 2160,  p25: 1380  } },
      hantverkare: { micro: { median: 2520,  p25: 1700  }, small: { median: 2400,  p25: 1620  }, mid: { median: 2280,  p25: 1500  } },
      ehandel:     { micro: { median: 2400,  p25: 1620  }, small: { median: 2280,  p25: 1500  }, mid: { median: 2160,  p25: 1380  } },
      tillverkning:{ micro: { median: 2400,  p25: 1620  }, small: { median: 2280,  p25: 1500  }, mid: { median: 2160,  p25: 1380  } },
    },
  },
  bredband: {
    unit: 'kr/år',
    note: 'Företagsfiber per kontorsadress. Genomsnitt över 1000 Mbit-paket.',
    alternatives: [
      { supplier: 'Bahnhof Företag',     positioning: 'Svensk support, statisk IP, stark SLA',                          reliability: 0.96 },
      { supplier: 'Telenor Business',    positioning: 'Bred täckning, service via partner, marknadsledande SLA',         reliability: 0.94 },
      { supplier: 'Tele2 Företag Bredband', positioning: 'Konkurrenskraftigt pris, ingår i bundle med mobil',           reliability: 0.92 },
      { supplier: 'GlobalConnect',       positioning: 'Premium-segment, dedikerad fiber, bäst för datacenter-trafik',   reliability: 0.97 },
    ],
    matrix: {
      byraer:      { micro: { median: 7800,  p25: 5400  }, small: { median: 13200, p25: 9000  }, mid: { median: 28800, p25: 19200 } },
      hantverkare: { micro: { median: 8400,  p25: 6000  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      ehandel:     { micro: { median: 8400,  p25: 6000  }, small: { median: 14400, p25: 10200 }, mid: { median: 30000, p25: 22000 } },
      tillverkning:{ micro: { median: 9600,  p25: 6900  }, small: { median: 15600, p25: 11400 }, mid: { median: 32400, p25: 23400 } },
    },
  },
  kortterminal: {
    unit: 'kr/år',
    note: 'Inkluderar månadsavgifter + transaktionsavgifter. Förutsätter ~1 MSEK kortvolym/år.',
    alternatives: [
      { supplier: 'Zettle by PayPal',   positioning: 'Låg avgift (1,25%), ingen månadsavgift',                  reliability: 0.93 },
      { supplier: 'SumUp',              positioning: 'Lägst transaktionsavgift för låg-volym',                  reliability: 0.91 },
      { supplier: 'Klarna Checkout',    positioning: 'För e-handel, integrerad med betalmetoder',              reliability: 0.96 },
      { supplier: 'Stripe',             positioning: 'Internationell standard, API-first, 1,4% + 1,80kr',       reliability: 0.97 },
    ],
    matrix: {
      byraer:      { micro: { median: 6000,  p25: 3600  }, small: { median: 12000, p25: 7200  }, mid: { median: 36000, p25: 21000 } },
      hantverkare: { micro: { median: 8400,  p25: 5400  }, small: { median: 18000, p25: 11400 }, mid: { median: 60000, p25: 37200 } },
      ehandel:     { micro: { median: 18000, p25: 11400 }, small: { median: 96000, p25: 60000 }, mid: { median: 360000, p25: 240000 } },
      tillverkning:{ micro: { median: 4800,  p25: 3000  }, small: { median: 14400, p25: 8400  }, mid: { median: 48000, p25: 28000 } },
    },
  },
  'faktura-tjanst': {
    unit: 'kr/år',
    note: 'Utskickstjänst utöver bokföringssystemets inbyggda e-faktura.',
    alternatives: [
      { supplier: 'Fortnox e-faktura (inbyggd)',   positioning: 'Ingår i Fortnox-licens, ingen extra kostnad',  reliability: 0.95 },
      { supplier: 'Visma e-faktura (inbyggd)',     positioning: 'Ingår i Visma eEkonomi',                       reliability: 0.95 },
      { supplier: 'Billogram',                      positioning: 'Modern UX, automatiska påminnelser',           reliability: 0.93 },
    ],
    matrix: {
      byraer:      { micro: { median: 1800,  p25: 0     }, small: { median: 4800,  p25: 0     }, mid: { median: 14400, p25: 1800  } },
      hantverkare: { micro: { median: 1800,  p25: 0     }, small: { median: 4800,  p25: 0     }, mid: { median: 14400, p25: 1800  } },
      ehandel:     { micro: { median: 2400,  p25: 0     }, small: { median: 8400,  p25: 1800  }, mid: { median: 28800, p25: 4800  } },
      tillverkning:{ micro: { median: 1800,  p25: 0     }, small: { median: 6000,  p25: 0     }, mid: { median: 19200, p25: 2400  } },
    },
  },
  'leasing-bil': {
    unit: 'kr/år',
    note: 'Per leasad servicebil. Restvärde + service inräknat.',
    alternatives: [
      { supplier: 'Arval Sverige',     positioning: 'Skandinavisk aktör, stark service-paket',           reliability: 0.95 },
      { supplier: 'Lease Plan',        positioning: 'Internationell flotta, bra för >5 bilar',           reliability: 0.94 },
      { supplier: 'Volvofinans',       positioning: 'Specialiserad på Volvo-bilar, lokal närvaro',       reliability: 0.96 },
      { supplier: 'Autoplan',          positioning: 'Småskalig, flexibla villkor, mid-tier prissättning', reliability: 0.91 },
    ],
    matrix: {
      byraer:      { micro: { median: 48000, p25: 38000 }, small: { median: 360000, p25: 290000 }, mid: { median: 1200000, p25: 950000 } },
      hantverkare: { micro: { median: 54000, p25: 42000 }, small: { median: 480000, p25: 380000 }, mid: { median: 1800000, p25: 1400000 } },
      ehandel:     { micro: { median: 48000, p25: 38000 }, small: { median: 360000, p25: 290000 }, mid: { median: 1200000, p25: 950000 } },
      tillverkning:{ micro: { median: 60000, p25: 48000 }, small: { median: 540000, p25: 430000 }, mid: { median: 1800000, p25: 1400000 } },
    },
  },
  'forsakring-foretag': {
    unit: 'kr/år',
    note: 'License-pending — Recommender markerar dessa för VIP-kö, inte direkt byte.',
    alternatives: [
      { supplier: 'If Skadeförsäkring',   positioning: 'Industrispecifik prissättning, bra för bygg/VVS',          reliability: 0.95 },
      { supplier: 'Trygg-Hansa',          positioning: 'Bredd över alla branscher, etablerad SLA',                  reliability: 0.94 },
      { supplier: 'Länsförsäkringar',     positioning: 'Lokal närvaro, stark för mindre bolag',                     reliability: 0.96 },
      { supplier: 'Gjensidige Företag',   positioning: 'Konkurrenskraftiga premier, mid-tier service',              reliability: 0.92 },
    ],
    matrix: {
      byraer:      { micro: { median: 18000,  p25: 12000  }, small: { median: 60000,  p25: 42000  }, mid: { median: 240000,  p25: 180000  } },
      hantverkare: { micro: { median: 36000,  p25: 24000  }, small: { median: 96000,  p25: 60000  }, mid: { median: 400000,  p25: 280000  } },
      ehandel:     { micro: { median: 24000,  p25: 16000  }, small: { median: 84000,  p25: 56000  }, mid: { median: 320000,  p25: 220000  } },
      tillverkning:{ micro: { median: 48000,  p25: 32000  }, small: { median: 180000, p25: 120000 }, mid: { median: 720000,  p25: 480000  } },
    },
  },
  'forsakring-ansvar': {
    unit: 'kr/år',
    note: 'License-pending — Recommender markerar dessa för VIP-kö.',
    alternatives: [
      { supplier: 'If Skadeförsäkring',  positioning: 'Branschspecialiserade ansvarspaket',         reliability: 0.95 },
      { supplier: 'Länsförsäkringar',    positioning: 'Konkurrenskraftiga premier',                  reliability: 0.94 },
      { supplier: 'Gjensidige Företag',  positioning: 'Specialiserad på konsultansvar',              reliability: 0.93 },
      { supplier: 'Hiscox',              positioning: 'Premium nisch — IT, konsult, professionell',  reliability: 0.96 },
    ],
    matrix: {
      byraer:      { micro: { median: 6000,  p25: 4200  }, small: { median: 18000, p25: 12000 }, mid: { median: 60000,  p25: 42000  } },
      hantverkare: { micro: { median: 9000,  p25: 6000  }, small: { median: 30000, p25: 19200 }, mid: { median: 96000,  p25: 66000  } },
      ehandel:     { micro: { median: 4800,  p25: 3000  }, small: { median: 14400, p25: 9000  }, mid: { median: 48000,  p25: 30000  } },
      tillverkning:{ micro: { median: 7200,  p25: 4800  }, small: { median: 24000, p25: 15000 }, mid: { median: 72000,  p25: 48000  } },
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

  const ind = INDUSTRIES.includes(industry) ? industry : 'byraer';
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
