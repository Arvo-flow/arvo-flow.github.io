// lib/el-intelligence.js — El-prisintelligens: Nordpool spotpris + leverantörsjämförelse.
//
// Hämtar realtids spotpris från elprisetjustnu.se (gratis, ingen autentisering).
// Vid API-fel används hårdkodade årsmedelvärden 2025.
//
// Returnerar rankad lista av elleverantörer sorterad på totalkostnad per år,
// beräknat som: (spot + påslag) × annualKwh + månadsavgift × 12.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const FETCH_TIMEOUT_MS = 5_000;

/**
 * Verifierat marknadsgolv för all-in elpris (kr/kWh) per förbrukningsband,
 * ur Eurostat (branchindex.el.eurostatBands). Ett bolag kan inte nå ett lägre
 * all-in-pris än vad verifierade bolag i samma storleksband betalar — nätavgiften
 * (monopol) följer med vid leverantörsbyte. Returnerar bandet {allInKwh, label} eller null.
 *
 * @param {number} annualKwh
 * @returns {{allInKwh:number,label:string,period:string,source:string}|null}
 */
export function eurostatElFloor(annualKwh) {
  const eb = BRANCHINDEX.el?.eurostatBands;
  if (!eb?.bands?.length || !(annualKwh > 0)) return null;
  const mwh = annualKwh / 1000;
  const band = eb.bands.find((b) => mwh < b.maxMwh) ?? eb.bands[eb.bands.length - 1];
  return { allInKwh: band.allInKwh, label: band.label, period: eb.period, source: eb.source };
}

// Årsmedelvärden 2025 per elområde (kr/kWh) — används om API-hämtning misslyckas.
const SPOT_FALLBACK = {
  SE1: 0.468,
  SE2: 0.498,
  SE3: 0.513,
  SE4: 0.538,
};

// Svenska spotpris-leverantörer med rörliga avtal.
// påslag: kr/kWh ovanpå spotpris. månadsavgift: kr/mån.
const SUPPLIERS = [
  { name: 'Tibber',              markup: 0.049, monthlyFee: 49  },
  { name: 'Bixia',               markup: 0.039, monthlyFee: 29  },
  { name: 'Telge Energi',        markup: 0.045, monthlyFee: 35  },
  { name: 'Vattenfall Rörligt',  markup: 0.074, monthlyFee: 0   },
  { name: 'Fortum Rörligt',      markup: 0.085, monthlyFee: 0   },
];

// Fasta kostnader som inte kan bytas via leverantörsbyte.
const NETWORK_FEE_KWH = 0.32;   // nätavgift kr/kWh
const ENERGY_TAX_KWH  = 0.360;  // energiskatt kr/kWh

// Zontilldelning via leverantörsnamn och ort (regex → SE1–SE4).
// SE4 och SE1/SE2 matchas först — SE3 är bred default för Mellansverige.
const ZONE_PATTERNS = [
  // SE1 — Norra Norrland (Luleå, Skellefteå, Piteå, Umeå)
  { zone: 'SE1', pattern: /lule(å|a)|skellefteå|pite(å|a)|skellefteå.*kraft|luleå.*kraft|norrenergi|umeå.*energi/i },
  // SE2 — Södra Norrland (Sundsvall, Östersund, Härnösand, Örnsköldsvik)
  { zone: 'SE2', pattern: /sundsvall|östersund|härnösand|kramfors|sollefteå|jämtkraft|mittenergi|övik.*energi/i },
  // SE4 — Södra Sverige (Malmö, Ystad, Lund, Helsingborg, Karlskrona, Blekinge, Skåne)
  { zone: 'SE4', pattern: /malmö|ystad|lund\b|helsingborg|kristianstad|karlskrona|karlshamn|trelleborg|landskrona|ängelholm|öresundskraft|kraftringen|sydkraft|sydsvenska|skånska.*energi|bleking/i },
  // SE3 — Mellansverige (Stockholm, Göteborg, Västerås m.fl.) — bredast täckning
  { zone: 'SE3', pattern: /stockholm|göteborg|västerås|örebro|linköping|norrköping|jönköping|e\.on|vattenfall|mälarenergi|tekniska.*verken|eskilstuna.*energi|fortum|ellevio/i },
];

/**
 * Härleder Nordpool-elområde (SE1–SE4) från leverantörsnamn.
 * Returnerar 'SE3' som standardvärde (täcker Stockholm/Mellansverige).
 *
 * @param {string} supplierName
 * @returns {'SE1'|'SE2'|'SE3'|'SE4'}
 */
function inferZone(supplierName) {
  if (!supplierName) return 'SE3';
  for (const { zone, pattern } of ZONE_PATTERNS) {
    if (pattern.test(supplierName)) return zone;
  }
  return 'SE3';
}

/**
 * Hämtar dagens genomsnittliga spotpris från elprisetjustnu.se.
 * Returnerar null vid nätverksfel eller timeout.
 *
 * @param {string} zone - SE1|SE2|SE3|SE4
 * @returns {Promise<number|null>} genomsnitt kr/kWh eller null
 */
async function fetchSpotPrice(zone) {
  const now    = new Date();
  const yyyy   = now.getFullYear();
  const mm     = String(now.getMonth() + 1).padStart(2, '0');
  const dd     = String(now.getDate()).padStart(2, '0');
  const url    = `https://www.elprisetjustnu.se/api/v1/prices/${yyyy}/${mm}-${dd}_${zone}.json`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    // Beräkna dygnets genomsnitt av de 24 timmarna
    const sum = data.reduce((acc, h) => acc + (h.SEK_per_kWh ?? 0), 0);
    return Math.round((sum / data.length) * 10_000) / 10_000; // 4 decimaler
  } catch {
    return null;
  }
}

/**
 * Beräknar totalkostnad per år för en leverantör.
 *
 * @param {object} supplier - { name, markup, monthlyFee }
 * @param {number} spot     - spotpris kr/kWh
 * @param {number} annualKwh
 * @returns {object} kostnadsposter och totalt
 */
function calcSupplierCost(supplier, spot, annualKwh) {
  const energyPerKwh  = spot + supplier.markup;
  const energyCost    = Math.round(energyPerKwh * annualKwh);
  const annualFee     = Math.round(supplier.monthlyFee * 12);
  const fixedCosts    = Math.round((NETWORK_FEE_KWH + ENERGY_TAX_KWH) * annualKwh);
  const totalAnnual   = energyCost + annualFee + fixedCosts;

  return {
    name:         supplier.name,
    markup:       supplier.markup,
    monthlyFee:   supplier.monthlyFee,
    energyPerKwh: Math.round(energyPerKwh * 10_000) / 10_000,
    energyCost,
    annualFee,
    fixedCosts,
    totalAnnual,
  };
}

/**
 * Hämtar el-intelligens: aktuellt spotpris, rankade leverantörer och besparingspotential.
 *
 * @param {object} params
 * @param {number} params.annualKwh         - årsförbrukning kWh (faktisk från faktura eller estimerad)
 * @param {number} params.currentPriceKwh   - kundens nuvarande pris kr/kWh (allt in)
 * @param {string} params.supplierName      - leverantörsnamn för zoninferens
 * @param {boolean} [params.kwhIsEstimated] - true om annualKwh är estimerat (inte faktiskt)
 * @returns {Promise<object>} { zone, spot, ranked, best, current, saving, savingPct, kwhIsEstimated }
 */
export async function getElIntelligence({ annualKwh, currentPriceKwh, supplierName, kwhIsEstimated = false }) {
  const zone     = inferZone(supplierName);
  const spotLive = await fetchSpotPrice(zone);
  const spot     = spotLive ?? SPOT_FALLBACK[zone];
  const spotSource = spotLive !== null ? 'live' : 'fallback';

  // Beräkna kostnad för varje leverantör vid aktuellt spotpris
  const ranked = SUPPLIERS
    .map((s) => calcSupplierCost(s, spot, annualKwh))
    .sort((a, b) => a.totalAnnual - b.totalAnnual);

  const best = ranked[0];

  // Kundens nuvarande totalkostnad (allt-in: energi + nät + skatt)
  const currentAnnual = Math.round(currentPriceKwh * annualKwh);

  // VERIFIERAT MARKNADSGOLV (regel 3/4): den flata nätavgiften (0,32 kr/kWh) underskattar
  // det uppnåeliga all-in-priset för små förbrukare — nätavgiften är ett monopol som följer
  // med vid leverantörsbyte. Floora därför det uppnåeliga priset vid Eurostats verifierade
  // band-pris, så vi aldrig påstår en besparing som kräver att bolaget slår marknadsgolvet
  // för sin storlek. Modellens supplier-total används bara om den ligger ÖVER golvet.
  const floor          = eurostatElFloor(annualKwh);
  const floorAnnual    = floor ? Math.round(floor.allInKwh * annualKwh) : 0;
  const achievableAnnual = Math.max(best.totalAnnual, floorAnnual);
  const achievablePriceKwh = annualKwh > 0
    ? Math.round((achievableAnnual / annualKwh) * 10_000) / 10_000
    : achievableAnnual;
  const floorApplied   = achievableAnnual > best.totalAnnual;

  const saving    = Math.max(0, currentAnnual - achievableAnnual);
  const savingPct = currentAnnual > 0
    ? Math.round((saving / currentAnnual) * 100)
    : 0;

  return {
    zone,
    spot,
    spotSource,
    ranked,
    best,
    current: {
      priceKwh:    currentPriceKwh,
      totalAnnual: currentAnnual,
    },
    marketFloor: floor,            // { allInKwh, label, period, source } | null
    achievableAnnual,             // floorat uppnåeligt all-in kr/år
    achievablePriceKwh,           // floorat uppnåeligt all-in kr/kWh
    floorApplied,                 // true om Eurostat-golvet band besparingen
    saving,
    savingPct,
    annualKwh,
    kwhIsEstimated,
  };
}
