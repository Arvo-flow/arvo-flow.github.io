// tests/fixtures/06-skrivarleasing.mjs
// 20 fixtures for computeInvoiceMetrics + computeSecondarySaving — category='skrivarleasing'
//
// For category='skrivarleasing':
//   - No cross-category logic exists (CROSS_CATEGORY_RX and SECONDARY_CATEGORY_RX only cover mobil/bredband)
//   - No skrivarleasing line descriptions match ADDON_FALLBACK_RX.mobil or ADDON_FALLBACK_RX.bredband
//   - ALL six metrics fields are always null
//   - computeSecondarySaving always returns null (!['mobil','bredband'].includes('skrivarleasing'))
//
// Domain: maskinhyra = recurring_subscription, klickkostnader = variable_usage, serviceavtal varies.
// Focus: variable_usage (klick), one_time_fee (toner/service), hardware (inköpt skrivare) all ignored.

export const fixtures = [

  // ── print-01 ─────────────────────────────────────────────────────────────────
  // Enkel Ricoh-leasing, bara maskinhyra
  {
    id: 'print-01',
    name: 'Ricoh MP C4503 — maskinhyra bara, basfall',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh MP C4503 maskinhyra', amount: 350 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-02 ─────────────────────────────────────────────────────────────────
  // Konica Minolta maskinhyra + klickkostnader S/V (variable_usage ignoreras)
  {
    id: 'print-02',
    name: 'Konica Minolta maskinhyra + klick S/V variable_usage — variable ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C360i maskinhyra', amount: 280 },
      { type: 'variable_usage', description: 'Klickkostnad S/V (0,10 kr/sida)', amount: 350 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 8,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-03 ─────────────────────────────────────────────────────────────────
  // Kyocera, 3 MFPs, låg kostnad (p25-nivå)
  {
    id: 'print-03',
    name: 'Kyocera — 3 MFPs, lågkostnadsnivå (p25)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Kyocera ECOSYS M4125idn MFP 1 maskinhyra', amount: 200 },
      { type: 'recurring_subscription', description: 'Kyocera ECOSYS M4125idn MFP 2 maskinhyra', amount: 200 },
      { type: 'recurring_subscription', description: 'Kyocera ECOSYS M4125idn MFP 3 maskinhyra', amount: 200 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 20,
    industry: 'bygg',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-04 ─────────────────────────────────────────────────────────────────
  // Canon maskinhyra + färgklick (variable_usage)
  {
    id: 'print-04',
    name: 'Canon maskinhyra + färgklick variable_usage — variable ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Canon imageRUNNER ADVANCE DX maskinhyra', amount: 320 },
      { type: 'variable_usage', description: 'Klickkostnad färg (0,75 kr/sida)', amount: 225 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 10,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-05 ─────────────────────────────────────────────────────────────────
  // Ricoh maskinhyra + S/V-klick + färgklick (båda variable_usage)
  {
    id: 'print-05',
    name: 'Ricoh maskinhyra + S/V-klick + färgklick (alla variable ignoreras)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C3000 maskinhyra', amount: 390 },
      { type: 'variable_usage', description: 'Klickkostnad S/V 0,12 kr/sida', amount: 480 },
      { type: 'variable_usage', description: 'Klickkostnad färg 0,80 kr/sida', amount: 320 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 15,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-06 ─────────────────────────────────────────────────────────────────
  // Engångsleverans av toner (one_time_fee ignoreras)
  {
    id: 'print-06',
    name: 'Skrivarhyra + tonerleverans one_time_fee — one_time_fee ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C250i maskinhyra', amount: 260 },
      { type: 'one_time_fee', description: 'Tonerkassett TN-422K (svart)', amount: 890 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 6,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-07 ─────────────────────────────────────────────────────────────────
  // Serviceavtal som is_addon=true — matchar INTE mobile/broadband addon-regex → base
  // "Serviceavtal MFP standard" matchar ej ADDON_FALLBACK_RX.mobil ej ADDON_FALLBACK_RX.bredband
  // → hamnar i base, ej addon; men mixed=false → alla null
  {
    id: 'print-07',
    name: 'Serviceavtal is_addon=true matchar ej addon-regex → base, ej addon → null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM 2702 maskinhyra', amount: 350 },
      { type: 'recurring_subscription', description: 'Serviceavtal MFP standard', amount: 200, is_addon: true },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-08 ─────────────────────────────────────────────────────────────────
  // Medelstort bolag, 60 anst (mid-bucket), 6 MFPs
  {
    id: 'print-08',
    name: 'Stort skrivarflotta — 60 anst, 6 MFPs (mid-bucket)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 1', amount: 370 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 2', amount: 370 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 3', amount: 370 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 4', amount: 370 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 5', amount: 370 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 MFP 6', amount: 370 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 1440 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 960 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 60,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-09 ─────────────────────────────────────────────────────────────────
  // Hårdvaruinköp — en utköpt skrivare (hardware type ignoreras)
  {
    id: 'print-09',
    name: 'Utköpt skrivare hardware-typ ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Brother MFC-L8900CDW serviceavtal', amount: 149 },
      { type: 'hardware', description: 'Brother MFC-L8900CDW köp', amount: 5990 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 4,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-10 ─────────────────────────────────────────────────────────────────
  // Nollbelopp klickkostnader (ingen utskrift denna månad)
  {
    id: 'print-10',
    name: 'Klickkostnader amount=0 — noll utskrifter denna månad',
    lineItems: [
      { type: 'recurring_subscription', description: 'Canon imageRUNNER maskinhyra', amount: 310 },
      { type: 'variable_usage', description: 'Klickkostnad S/V (0 utskrifter)', amount: 0 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 3,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-11 ─────────────────────────────────────────────────────────────────
  // Mycket hög klickratio (variable >> recurring) — klick-ratio >35 % → requiresQuote
  // (requiresQuote testas i högre lager, ej här — metrics alltid null)
  {
    id: 'print-11',
    name: 'Hög klickratio (variable >> recurring) — metrics alltid null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C300 maskinhyra', amount: 250 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 1800 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 3200 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 12,
    industry: 'tillverkning',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-12 ─────────────────────────────────────────────────────────────────
  // Låg klickratio (variable << recurring) — vanligt kontorsscenario
  {
    id: 'print-12',
    name: 'Låg klickratio (variable << recurring) — typiskt kontor',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C2000 maskinhyra', amount: 400 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 40 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 22 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 6,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-13 ─────────────────────────────────────────────────────────────────
  // 4 olika skrivare med egna maskinhyre-rader
  {
    id: 'print-13',
    name: '4 skrivare med egna maskinhyre-rader',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C450i MFP 1', amount: 310 },
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C450i MFP 2', amount: 310 },
      { type: 'recurring_subscription', description: 'Ricoh IM C300 liten skrivare 3', amount: 190 },
      { type: 'recurring_subscription', description: 'Kyocera ECOSYS P4140dn skrivare 4', amount: 160 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 520 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 25,
    industry: 'ehandel',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-14 ─────────────────────────────────────────────────────────────────
  // Managed Print Services — fullt serviceavtal, allt inkluderat i recurring
  {
    id: 'print-14',
    name: 'Managed Print Services — fullavtal, maskinhyra + service i recurring',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh Managed Print Services total', amount: 890 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 18,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-15 ─────────────────────────────────────────────────────────────────
  // Årsavtal — en enda stor recurring-rad
  {
    id: 'print-15',
    name: 'Skrivarleasing årsavtal — en stor recurring-rad',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C360i årsavtal (inkl. service)', amount: 4200 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 10,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-16 ─────────────────────────────────────────────────────────────────
  // Bygg-sektor, hantverkare (lägre kontorsutskrifter)
  {
    id: 'print-16',
    name: 'Hantverksbolag — låg printvolym, bygg-bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Brother MFC-L8390CDW maskinhyra', amount: 220 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 80 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 8,
    industry: 'bygg',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-17 ─────────────────────────────────────────────────────────────────
  // Tillverkning — hög printvolym (ritningar, arbetsberedningar)
  {
    id: 'print-17',
    name: 'Tillverkningsbolag — hög printvolym, A3/A4-mix',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM A3500 A3-MFP maskinhyra', amount: 650 },
      { type: 'recurring_subscription', description: 'Ricoh IM C4500 A4-MFP maskinhyra', amount: 380 },
      { type: 'variable_usage', description: 'Klickkostnad A3 S/V', amount: 960 },
      { type: 'variable_usage', description: 'Klickkostnad A4 S/V', amount: 620 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 440 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 45,
    industry: 'tillverkning',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-18 ─────────────────────────────────────────────────────────────────
  // Serviceutryckning som one_time_fee (ej planerat besök)
  {
    id: 'print-18',
    name: 'Skrivarleasing + serviceutryckning one_time_fee — one_time ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C250i maskinhyra', amount: 280 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 210 },
      { type: 'one_time_fee', description: 'Akut serviceutryckning tonerstopp', amount: 1490 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 7,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-19 ─────────────────────────────────────────────────────────────────
  // Komplett faktura: leasing + klick + toner + hardware
  {
    id: 'print-19',
    name: 'Komplett skrivarfaktura: recurring + variable + one_time + hardware',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C3000 maskinhyra', amount: 360 },
      { type: 'variable_usage', description: 'Klickkostnad S/V (0,11 kr/sida)', amount: 385 },
      { type: 'variable_usage', description: 'Klickkostnad färg (0,72 kr/sida)', amount: 216 },
      { type: 'one_time_fee', description: 'Tonerkassett svart TN-910BK', amount: 750 },
      { type: 'hardware', description: 'Häftenhet SH11 tillbehör', amount: 2990 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 12,
    industry: 'ehandel',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── print-20 ─────────────────────────────────────────────────────────────────
  // Enbart variable_usage-rader (inga recurring) → alla metrics null
  {
    id: 'print-20',
    name: 'Enbart klickkostnader variable_usage — inga recurring → alla null',
    lineItems: [
      { type: 'variable_usage', description: 'Klickkostnad S/V total', amount: 680 },
      { type: 'variable_usage', description: 'Klickkostnad färg total', amount: 420 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

];
