// tests/fixtures/04-el.mjs
// 25 fixtures for computeInvoiceMetrics + computeSecondarySaving — category='el'
//
// For category='el':
//   - mixed is always false → primaryComponentMonthly/secondaryComponentMonthly/etc. are never set
//   - No el line items match MOBILE_ADDON_TYPES, BROADBAND_ADDON_TYPES, or the addon regexes
//   - Therefore ALL six metrics fields are always null
//   - computeSecondarySaving always returns null (!['mobil','bredband'].includes('el'))
//
// Focus: verifying that variable_usage, one_time_fee, hardware, and edge-case amounts
// do NOT contaminate metrics, and that the function handles diverse el invoice shapes.

export const fixtures = [

  // ── el-01 ────────────────────────────────────────────────────────────────────
  // Enkel fast el — bara recurring_subscription
  {
    id: 'el-01',
    name: 'Enkel fast el — recurring_subscription only',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang fastpris', amount: 1240 },
    ],
    category: 'el',
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

  // ── el-02 ────────────────────────────────────────────────────────────────────
  // El + rörlig förbrukning + energiskatt separat (variable_usage ska ignoreras)
  {
    id: 'el-02',
    name: 'El + rörlig förbrukning + energiskatt som variable_usage — ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift Vattenfall Eldistribution', amount: 450 },
      { type: 'variable_usage', description: 'Rörlig elförbrukning (kWh)', amount: 1820 },
      { type: 'variable_usage', description: 'Energiskatt (öre/kWh)', amount: 320 },
    ],
    category: 'el',
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

  // ── el-03 ────────────────────────────────────────────────────────────────────
  // El med anslutningsavgift som one_time_fee
  {
    id: 'el-03',
    name: 'El + anslutningsavgift som one_time_fee — ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Fortum Företag', amount: 990 },
      { type: 'one_time_fee', description: 'Anslutningsavgift ny mätpunkt', amount: 2500 },
    ],
    category: 'el',
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

  // ── el-04 ────────────────────────────────────────────────────────────────────
  // TryggEl-style fastprisavtal
  {
    id: 'el-04',
    name: 'TryggEl-style fastprisavtal — recurring only',
    lineItems: [
      { type: 'recurring_subscription', description: 'TryggEl Fastpris 24 mån', amount: 1680 },
    ],
    category: 'el',
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

  // ── el-05 ────────────────────────────────────────────────────────────────────
  // Spotprisavtal — rörlig förbrukningsdel som variable_usage
  {
    id: 'el-05',
    name: 'Spotprisavtal — fast nätavgift + rörlig spot som variable_usage',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift E.ON Elnät', amount: 380 },
      { type: 'variable_usage', description: 'Spotpris elförbrukning (Nord Pool)', amount: 2140 },
    ],
    category: 'el',
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

  // ── el-06 ────────────────────────────────────────────────────────────────────
  // El med elmätare som hardware — ska ignoreras
  {
    id: 'el-06',
    name: 'El + elmätare som hardware — hardware ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Bixia Företag', amount: 1050 },
      { type: 'hardware', description: 'Smart elmätare installation', amount: 1200 },
    ],
    category: 'el',
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

  // ── el-07 ────────────────────────────────────────────────────────────────────
  // SE1-region (norra Sverige, ofta billigare el)
  {
    id: 'el-07',
    name: 'SE1-region norra Sverige — lägre elpris',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift Skellefteå Kraft (SE1)', amount: 310 },
      { type: 'variable_usage', description: 'Elförbrukning SE1-tariff', amount: 890 },
    ],
    category: 'el',
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

  // ── el-08 ────────────────────────────────────────────────────────────────────
  // SE4-region (Malmö-området, sydsvenska elnätet)
  {
    id: 'el-08',
    name: 'SE4-region Malmö — sydsvenskt elpris',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift Kraftringen Malmö (SE4)', amount: 490 },
      { type: 'variable_usage', description: 'Rörlig förbrukning SE4', amount: 2380 },
    ],
    category: 'el',
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

  // ── el-09 ────────────────────────────────────────────────────────────────────
  // Stor industriförbrukare (tillverkning, 120 anställda)
  {
    id: 'el-09',
    name: 'Stor industriförbrukare tillverkning 120 anst — hög förbrukning',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift industri E.ON', amount: 8500 },
      { type: 'variable_usage', description: 'Industriel förbrukning kWh', amount: 42000 },
      { type: 'variable_usage', description: 'Effektavgift kW', amount: 6200 },
    ],
    category: 'el',
    mixed: false,
    employees: 120,
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

  // ── el-10 ────────────────────────────────────────────────────────────────────
  // Litet kontor (bygg, 3 anställda)
  {
    id: 'el-10',
    name: 'Litet byggkontor 3 anst — låg förbrukning',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Vattenfall litet kontor', amount: 420 },
      { type: 'variable_usage', description: 'Elförbrukning kWh', amount: 680 },
    ],
    category: 'el',
    mixed: false,
    employees: 3,
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

  // ── el-11 ────────────────────────────────────────────────────────────────────
  // Energiskatt som separat variable_usage-rad (lags mot vanlig förbrukning)
  {
    id: 'el-11',
    name: 'Energiskatt separat variable_usage — ignoreras av metrics',
    lineItems: [
      { type: 'recurring_subscription', description: 'Abonnemangsavgift Ellevio', amount: 520 },
      { type: 'variable_usage', description: 'Elförbrukning (kWh)', amount: 1650 },
      { type: 'variable_usage', description: 'Energiskatt 36,0 öre/kWh', amount: 432 },
    ],
    category: 'el',
    mixed: false,
    employees: 9,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── el-12 ────────────────────────────────────────────────────────────────────
  // Nätavgift som separat recurring-rad vid sidan av elabonnemang
  {
    id: 'el-12',
    name: 'Nätavgift + elabonnemang som separata recurring-rader',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Bixia Företag Rörligt', amount: 195 },
      { type: 'recurring_subscription', description: 'Nätavgift Ellevio AB', amount: 445 },
      { type: 'variable_usage', description: 'Rörlig förbrukning (kWh)', amount: 1920 },
    ],
    category: 'el',
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

  // ── el-13 ────────────────────────────────────────────────────────────────────
  // Flera lokationer — 2 adressrader på samma faktura
  {
    id: 'el-13',
    name: 'Två kontorslokationer på samma elfaktura',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Storgatan 1 — Fortum', amount: 850 },
      { type: 'recurring_subscription', description: 'Elabonnemang Kungsgatan 12 — Fortum', amount: 720 },
      { type: 'variable_usage', description: 'Förbrukning Storgatan 1', amount: 1640 },
      { type: 'variable_usage', description: 'Förbrukning Kungsgatan 12', amount: 1340 },
    ],
    category: 'el',
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

  // ── el-14 ────────────────────────────────────────────────────────────────────
  // Nollbelopp på variable_usage-rad (edge case)
  {
    id: 'el-14',
    name: 'Zero-amount variable_usage-rad — edge case, metrics null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Vattenfall', amount: 630 },
      { type: 'variable_usage', description: 'Elförbrukning (0 kWh semestermånad)', amount: 0 },
    ],
    category: 'el',
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

  // ── el-15 ────────────────────────────────────────────────────────────────────
  // Mycket hög förbrukning (tillverkning, mellanstort företag)
  {
    id: 'el-15',
    name: 'Mycket hög elförbrukning — tillverkning mellanstort',
    lineItems: [
      { type: 'recurring_subscription', description: 'Industriabonnemang Vattenfall Företag', amount: 3200 },
      { type: 'variable_usage', description: 'Förbrukning hög last (kWh)', amount: 28500 },
      { type: 'variable_usage', description: 'Effektavgift (kW)', amount: 4100 },
      { type: 'variable_usage', description: 'Energiskatt', amount: 1200 },
    ],
    category: 'el',
    mixed: false,
    employees: 75,
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

  // ── el-16 ────────────────────────────────────────────────────────────────────
  // Årsavgift (inte månadsåterkommande) — recurring men stor engångssumma
  {
    id: 'el-16',
    name: 'Årsavgift elabonnemang — recurring_subscription med årsbelopp',
    lineItems: [
      { type: 'recurring_subscription', description: 'Årsavgift elnätsabonnemang Vattenfall', amount: 5400 },
    ],
    category: 'el',
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

  // ── el-17 ────────────────────────────────────────────────────────────────────
  // Förnybar energi-premium (Grön el-certifikat som tillägg)
  {
    id: 'el-17',
    name: 'Förnybar el — grön el-premium som extra recurring',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Bixia Grönt', amount: 850 },
      { type: 'recurring_subscription', description: 'Ursprungsgaranti förnybar el', amount: 120 },
      { type: 'variable_usage', description: 'Elförbrukning (kWh)', amount: 1750 },
    ],
    category: 'el',
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

  // ── el-18 ────────────────────────────────────────────────────────────────────
  // Natt- och dagpris uppdelat (two variable_usage rows)
    {
    id: 'el-18',
    name: 'Nattariff + dagtariff uppdelat — två variable_usage-rader',
    lineItems: [
      { type: 'recurring_subscription', description: 'Abonnemangsavgift E.ON Elnät', amount: 410 },
      { type: 'variable_usage', description: 'Dagförbrukning 07:00–22:00 (kWh)', amount: 1420 },
      { type: 'variable_usage', description: 'Nattförbrukning 22:00–07:00 (kWh)', amount: 530 },
    ],
    category: 'el',
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

  // ── el-19 ────────────────────────────────────────────────────────────────────
  // E-handelslager med hög elförbrukning
  {
    id: 'el-19',
    name: 'E-handelslager hög förbrukning — ehandel-bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift lager Ellevio', amount: 1850 },
      { type: 'variable_usage', description: 'Lagerförbrukning el (kWh)', amount: 12400 },
      { type: 'variable_usage', description: 'Energiskatt lager', amount: 980 },
    ],
    category: 'el',
    mixed: false,
    employees: 22,
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

  // ── el-20 ────────────────────────────────────────────────────────────────────
  // El + larmsystem som orelaterat recurring (ska inte påverka metrics)
  {
    id: 'el-20',
    name: 'El + larmsystem som orelaterat recurring — metrics null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang Fortum kontor', amount: 760 },
      { type: 'recurring_subscription', description: 'Larmsystem månadsavgift Securitas', amount: 349 },
      { type: 'variable_usage', description: 'Rörlig elförbrukning', amount: 1240 },
    ],
    category: 'el',
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

  // ── el-21 ────────────────────────────────────────────────────────────────────
  // Transportföretag med lastbilsflotta, hög depåförbrukning
  {
    id: 'el-21',
    name: 'Transport lastbilsdepå — hög depåförbrukning el',
    lineItems: [
      { type: 'recurring_subscription', description: 'Nätavgift depå Kraftringen', amount: 2100 },
      { type: 'variable_usage', description: 'Depåförbrukning el (kWh)', amount: 18700 },
      { type: 'variable_usage', description: 'Laddning elfordon (kWh)', amount: 4300 },
    ],
    category: 'el',
    mixed: false,
    employees: 35,
    industry: 'transport',
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

  // ── el-22 ────────────────────────────────────────────────────────────────────
  // Vård-sektor (sjukvårdsklinik med medicinsk utrustning)
  {
    id: 'el-22',
    name: 'Sjukvårdsklinik — vård-sektor hög driftsäkerhet',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang klinik E.ON Företag', amount: 1420 },
      { type: 'recurring_subscription', description: 'Redundant nätanslutning backup', amount: 380 },
      { type: 'variable_usage', description: 'Medicinsk utrustning förbrukning (kWh)', amount: 5600 },
    ],
    category: 'el',
    mixed: false,
    employees: 18,
    industry: 'vard',
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

  // ── el-23 ────────────────────────────────────────────────────────────────────
  // Blandad faktura — recurring + variable + one_time på samma faktura
  {
    id: 'el-23',
    name: 'Blandad elfaktura — recurring + variable + one_time alla typer',
    lineItems: [
      { type: 'recurring_subscription', description: 'Abonnemang Vattenfall Företag', amount: 580 },
      { type: 'variable_usage', description: 'Förbrukning el januari (kWh)', amount: 2140 },
      { type: 'one_time_fee', description: 'Servicebesök mätarutbyte', amount: 650 },
    ],
    category: 'el',
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

  // ── el-24 ────────────────────────────────────────────────────────────────────
  // Mikroföretag med mycket låg förbrukning (under 1000 kr total årsvis)
  {
    id: 'el-24',
    name: 'Mikroföretag låg förbrukning — under 1000 kr total år',
    lineItems: [
      { type: 'recurring_subscription', description: 'Minsta elabonnemang Bixia', amount: 49 },
      { type: 'variable_usage', description: 'Förbrukning el (kWh)', amount: 38 },
    ],
    category: 'el',
    mixed: false,
    employees: 1,
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

  // ── el-25 ────────────────────────────────────────────────────────────────────
  // Endast variable_usage-rader (ingen recurring_subscription) — alla metrics null
  {
    id: 'el-25',
    name: 'Enbart variable_usage — ingen recurring → alla metrics null',
    lineItems: [
      { type: 'variable_usage', description: 'Elförbrukning spotpris januari', amount: 3240 },
      { type: 'variable_usage', description: 'Energiskatt', amount: 520 },
    ],
    category: 'el',
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
