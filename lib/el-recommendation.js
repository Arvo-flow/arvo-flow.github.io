// lib/el-recommendation.js
// Deterministisk elbesparingsberäkning — fristående modul för testbarhet.
// Importeras av api/test-invoice.mjs och tests/el-recommendation.mjs.

const MONTH_TO_SEASON = {
  'januari': 'winter',    'februari': 'winter',
  'november': 'winter',   'december': 'winter',
  'mars': 'spring_fall',  'april': 'spring_fall',
  'september': 'spring_fall', 'oktober': 'spring_fall',
  'maj': 'summer',  'juni': 'summer', 'juli': 'summer', 'augusti': 'summer',
  'january': 'winter',  'february': 'winter',
  'march': 'spring_fall', 'october': 'spring_fall',
  'may': 'summer', 'june': 'summer', 'july': 'summer', 'august': 'summer',
};

export const INDUSTRY_MONTHLY_FRACTIONS = {
  tillverkning: { januari:0.092, februari:0.088, mars:0.087, april:0.082, maj:0.082, juni:0.079, juli:0.055, augusti:0.079, september:0.082, oktober:0.086, november:0.088, december:0.100 },
  'it-tech':    { januari:0.091, februari:0.087, mars:0.085, april:0.081, maj:0.083, juni:0.081, juli:0.051, augusti:0.076, september:0.084, oktober:0.088, november:0.091, december:0.102 },
  konsult:      { januari:0.091, februari:0.087, mars:0.085, april:0.081, maj:0.083, juni:0.081, juli:0.051, augusti:0.076, september:0.084, oktober:0.088, november:0.091, december:0.102 },
  vard:         { januari:0.090, februari:0.086, mars:0.084, april:0.082, maj:0.080, juni:0.082, juli:0.082, augusti:0.082, september:0.082, oktober:0.085, november:0.087, december:0.078 },
  hotell:       { januari:0.073, februari:0.070, mars:0.075, april:0.080, maj:0.087, juni:0.100, juli:0.115, augusti:0.110, september:0.085, oktober:0.078, november:0.068, december:0.059 },
  transport:    { januari:0.096, februari:0.091, mars:0.089, april:0.083, maj:0.083, juni:0.080, juli:0.063, augusti:0.080, september:0.083, oktober:0.086, november:0.089, december:0.077 },
  bygg:         { januari:0.071, februari:0.068, mars:0.080, april:0.088, maj:0.092, juni:0.095, juli:0.060, augusti:0.092, september:0.092, oktober:0.086, november:0.072, december:0.104 },
  ehandel:      { januari:0.079, februari:0.076, mars:0.078, april:0.081, maj:0.083, juni:0.082, juli:0.078, augusti:0.083, september:0.086, oktober:0.090, november:0.092, december:0.092 },
  ovrigt:       { januari:0.111, februari:0.106, mars:0.094, april:0.083, maj:0.060, juni:0.056, juli:0.050, augusti:0.056, september:0.078, oktober:0.083, november:0.100, december:0.123 },
};

const EN_TO_SV_MONTH = {
  january:'januari', february:'februari', march:'mars', april:'april',
  may:'maj', june:'juni', july:'juli', august:'augusti',
  september:'september', october:'oktober', november:'november', december:'december',
};

export function getMonthFraction(industry, monthRaw) {
  const month = EN_TO_SV_MONTH[monthRaw] ?? monthRaw;
  const fracs = INDUSTRY_MONTHLY_FRACTIONS[industry] ?? INDUSTRY_MONTHLY_FRACTIONS.ovrigt;
  return fracs[month] ?? (1 / 12);
}

// Lagstadgad Energiskatt + elcertifikat 2025/2026 (Skatteverket + Energimarknadsinspektionen).
export const ENERGISKATT_ESTIMATE_KWH = 0.424;

// Benchmark: marknadsgenomsnittet för välförhandlade spotprisavtal (kr/kWh, energidel).
export const EL_BENCHMARK_KWH = {
  SE1: { winter: 0.82, spring_fall: 0.55, summer: 0.34 },
  SE2: { winter: 0.88, spring_fall: 0.58, summer: 0.37 },
  SE3: { winter: 0.95, spring_fall: 0.63, summer: 0.40 },
  SE4: { winter: 1.05, spring_fall: 0.70, summer: 0.44 },
};

// Matchar nätägarens avgifter (inte förhandlingsbara).
export const NATAVGIFT_RE = /nätavg|elnät|överföringsavg|nätabon|kapacitetsavg|effektavg|nätoperatör/i;

export function computeElRecommendation(extracted, industry = 'ovrigt') {
  const kwh    = extracted.elKwh;
  const month  = (extracted.elBillingMonth ?? '').toLowerCase().trim();
  const omrade = ['SE1', 'SE2', 'SE3', 'SE4'].includes(extracted.elOmrade)
    ? extracted.elOmrade : 'SE3';

  if (!kwh || kwh <= 0) return null;

  const season    = MONTH_TO_SEASON[month] ?? 'spring_fall';
  const fraction  = getMonthFraction(industry, month);
  const annualKwh = Math.round(kwh / fraction);

  const lineItems = extracted.lineItems ?? [];
  const natavgiftFromLines = lineItems
    .filter(li => li.type === 'recurring_subscription' && NATAVGIFT_RE.test(li.description))
    .reduce((sum, li) => sum + (li.amount ?? 0), 0);
  const natFastMonthly    = extracted.elNatFastAvgiftKr ?? 0;
  const natavgiftMonthly  = natavgiftFromLines > 0 ? natavgiftFromLines : natFastMonthly;
  // Fast abonnemangsavgift → × 12. Rörlig överföringsavgift → / fraction.
  const natFixedAnnual    = natFastMonthly * 12;
  const natVarMonthly     = Math.max(0, natavgiftMonthly - natFastMonthly);
  const elNatavgiftAnnual = natFastMonthly > 0
    ? natFixedAnnual + Math.round(natVarMonthly / fraction)
    : Math.round(natavgiftMonthly / fraction);

  let energiPerKwh = extracted.elEnergiPerKwh;
  const elPriceDerived = extracted.elPriceExplicit !== true;
  if (!(energiPerKwh > 0) && extracted.recurringAmount > 0) {
    const switchableRecurring = Math.max(0, extracted.recurringAmount - natavgiftMonthly);
    energiPerKwh = (switchableRecurring > 0 ? switchableRecurring : extracted.recurringAmount) / kwh;
  }
  if (!(energiPerKwh > 0)) return null;

  // Energiskatt inbakad: explicit kr/kWh men ingen separat skatterrad.
  const energiskattEmbedded = extracted.elPriceExplicit === true && !(extracted.elSkatterKr > 0);
  const energiPerKwhNet = energiskattEmbedded
    ? Math.max(0, energiPerKwh - ENERGISKATT_ESTIMATE_KWH)
    : energiPerKwh;

  // fastAvgift = ENBART elhandlarens fasta avgift (aldrig nätägarens).
  const fastAvgift         = extracted.elFastAvgiftKr ?? 0;
  const currentAnnualGross = Math.round(energiPerKwh * annualKwh) + fastAvgift * 12;
  const currentAnnual      = Math.round(energiPerKwhNet * annualKwh) + fastAvgift * 12;

  const benchmarkKwhRaw = (EL_BENCHMARK_KWH[omrade] ?? EL_BENCHMARK_KWH.SE3)[season];
  const MIN_VIABLE_MARGIN = 0.020;
  const invoiceSpotPrice  = extracted.elSpotPriceKwh;
  const benchmarkKwh = (invoiceSpotPrice != null && invoiceSpotPrice > 0)
    ? Math.max(benchmarkKwhRaw, invoiceSpotPrice + MIN_VIABLE_MARGIN)
    : benchmarkKwhRaw;
  const spotCapApplied = benchmarkKwh > benchmarkKwhRaw;

  const benchmarkAnnual = Math.round(benchmarkKwh * annualKwh);
  const grossSaving     = Math.max(0, currentAnnual - benchmarkAnnual);
  const shouldSwitch    = grossSaving >= 500;
  const arvoFee         = Math.round(grossSaving * 0.20);
  const netSaving       = grossSaving - arvoFee;

  const seasonLabel  = { winter: 'vinter', spring_fall: 'vår/höst', summer: 'sommar' }[season];
  const monthLabel   = extracted.elBillingMonth ?? 'fakturamånad';
  const mwhEstimate  = Math.round(annualKwh / 100) / 10;
  const fractionPct  = Math.round(fraction * 100);

  const monitoringNote = !shouldSwitch
    ? `Arvo rekommenderar kvartalsmässig genomgång av ert elavtal — spotpriset varierar säsongsvis och ett byte kan bli lönsamt om marknadsläget förändras.`
    : null;

  const energiskattNote = energiskattEmbedded
    ? `Fakturan visar inget separat Energiskatt-belopp — Arvo har exkluderat uppskattad Energiskatt (ca ${ENERGISKATT_ESTIMATE_KWH.toFixed(2)} kr/kWh) ur prisberäkningen för korrekt jämförelse med marknadsnotering.`
    : null;

  return {
    annualKwh, currentAnnual, currentAnnualGross, benchmarkAnnual, grossSaving, arvoFee, netSaving, shouldSwitch,
    omrade, season: seasonLabel, billingMonth: monthLabel, energiPerKwh: energiPerKwhNet, energiPerKwhGross: energiPerKwh, benchmarkKwh,
    elNatavgiftAnnual,
    monitoringNote,
    suggestedAnnualCost: shouldSwitch ? benchmarkAnnual : null,
    reasoning: shouldSwitch
      ? `Er faktura visar ${energiPerKwhNet.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel} (energidel exkl. nätavgift och energiskatt). Arvo bedömer att ett välförhandlat spotprisavtal i ${omrade} under ${seasonLabel} bör ligga kring ${benchmarkKwh.toFixed(2)} kr/kWh${spotCapApplied ? ` (justerat uppåt från säsongsindex pga. högt spotpris denna period — besparingen avser leverantörens påslag och fasta avgifter)` : ''}. På uppskattad årsförbrukning om ${mwhEstimate} MWh innebär det en nettobesparing på ca ${netSaving.toLocaleString('sv-SE')} kr/år.`
      : `Er faktura visar ${energiPerKwhNet.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel} (energidel exkl. nätavgift och energiskatt). Marknadsgenomsnittet för välförhandlade spotprisavtal i ${omrade} under ${seasonLabel} är ca ${benchmarkKwh.toFixed(2)} kr/kWh. Ni ligger redan under marknadsgenomsnittet — ert nuvarande avtal verkar konkurrenskraftigt.`,
    uncertaintyNote: [
      `Årsförbrukning ${mwhEstimate} MWh är uppskattad från ${monthLabel}s ${kwh.toLocaleString('sv-SE')} kWh (${fractionPct} % av årsförbrukning för er branschprofil). Faktisk årsförbrukning kan avvika ±20–30 %.`,
      elPriceDerived ? 'Elpriset är beräknat som fakturabelopp / kWh — en explicit kr/kWh-rad saknas på fakturan.' : null,
      energiskattNote,
    ].filter(Boolean).join(' '),
  };
}
