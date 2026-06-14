// tests/fixtures/08-realistic.mjs
// 70 realistiska faktura-fixtures — vanliga svenska SMF-scenarion
//
// Beräkningsreferens för kombinerade fakturor (mixed=true):
//   speedTierBenchmarks p25: {100:4200, 250:5400, 500:7200, 1000:9000}
//   mobil p25 (alla segment): micro(1-9)=3588, small(10-49)=3408, mid(50-249)=3228
//   INDUSTRY_SEGMENT_MAP: konsult→byraer, it-tech→byraer, hotell→byraer, vard→byraer, ovrigt→byraer
//                         bygg→hantverkare, transport→hantverkare
//                         ehandel→ehandel, tillverkning→tillverkning
//   bucketForSize: 1-9=micro, 10-49=small, 50-249=mid
//   SECONDARY_CATEGORY_RX['bredband'] = /\bsim\b|mobilabonnemang|mobiltelefoni/i
//   SECONDARY_CATEGORY_RX['mobil']    = /bredband|fiber|internet|adsl|ftth/i
//   secondarySeatCount = antal rader som matchar regex (ej antal SIM-kort i beskrivningen)
//   secAnnual = Math.round(secondaryComponentMonthly * 12)
//   gross = Math.max(0, secAnnual - p25 or p25Total); null om gross < 500
//   netSaving = Math.round(grossSaving * 0.80)

export const fixtures = [

  // ════════════════════════════════════════════════════════════════════════════
  // TELIA MOBIL (telia-01 – telia-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── telia-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'telia-01',
    name: 'Telia Jobbmobil M — 5 abonnemang, inga tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil M (5 st)', amount: 1745 },
    ],
    category: 'mobil',
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

  // ── telia-02 ──────────────────────────────────────────────────────────────────
  // Telia Jobbmobil L + PBX-addon (addon_type='pbx')
  {
    id: 'telia-02',
    name: 'Telia Jobbmobil L (8 st) + Telia Touchpoint PBX-addon',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil L (8 st)', amount: 3592 },
      { type: 'recurring_subscription', description: 'Telia Touchpoint molnväxel', amount: 599, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 8,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           599,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── telia-03 ──────────────────────────────────────────────────────────────────
  // Telia Jobbmobil XL (15 st) + Telia Touchpoint (är molnväxel, matchar mobile regex)
  // "Telia Touchpoint" matchar ej /molnväxel|cloud pbx|pbx|.../i direkt
  // Använder addon_type='pbx' för säker klassificering
  {
    id: 'telia-03',
    name: 'Telia Jobbmobil XL (15 st) + Telia Touchpoint via addon_type',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil XL (15 st)', amount: 8235 },
      { type: 'recurring_subscription', description: 'Telia Touchpoint UCaaS', amount: 1200, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 15,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           1200,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── telia-04 ──────────────────────────────────────────────────────────────────
  // Telia 5G Företag + roaming som variable_usage (ignoreras)
  {
    id: 'telia-04',
    name: 'Telia 5G Företag (3 st) + EU-roaming variable_usage ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia 5G Företag (3 st)', amount: 1947 },
      { type: 'variable_usage', description: 'EU-roaming övertrafik', amount: 200 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
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

  // ── telia-05 ──────────────────────────────────────────────────────────────────
  // Telia kombinerad: 10 mobil + Fiber 500 Mbit, mixed=true
  // primaryComponentMonthly=3490, secondaryComponentMonthly=700, speedMbit=500
  // secAnnual=Math.round(700*12)=8400, p25=7200, gross=1200, net=Math.round(1200*0.80)=960
  {
    id: 'telia-05',
    name: 'Telia kombinerad: 10 mobil + Fiber 500 Mbit — mixed=true',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil M (10 st)', amount: 3490 },
      { type: 'recurring_subscription', description: 'Telia Fiber 500 Mbit', amount: 700 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 10,
    industry: 'konsult',
    // secAnnual=8400, p25=7200, gross=1200, net=960
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      3490,
      secondaryComponentMonthly:    700,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8400,
      suggestedAnnual: 7200,
      grossSaving:     1200,
      netSaving:       960,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // TELE2 MOBIL (tele2-01 – tele2-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── tele2-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'tele2-01',
    name: 'Tele2 Business M — 6 abonnemang',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business M (6 st)', amount: 1794 },
    ],
    category: 'mobil',
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

  // ── tele2-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'tele2-02',
    name: 'Tele2 Business L (12 st) + Molnväxel addon via desc',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business L (12 st)', amount: 4188 },
      { type: 'recurring_subscription', description: 'Tele2 Molnväxel Business', amount: 800, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 12,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           800,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── tele2-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'tele2-03',
    name: 'Tele2 Business Max — 20 abonnemang, inga tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business Max (20 st)', amount: 8980 },
    ],
    category: 'mobil',
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

  // ── tele2-04 ──────────────────────────────────────────────────────────────────
  // Tele2 kombinerad: 5 mobil + Tele2 Bredband 1 Gbit, mixed=true
  // secAnnual=Math.round(849*12)=10188, p25=9000, gross=1188, net=Math.round(1188*0.80)=950
  {
    id: 'tele2-04',
    name: 'Tele2 kombinerad: 5 mobil + Bredband 1 Gbit — mixed=true',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business M (5 st)', amount: 1495 },
      { type: 'recurring_subscription', description: 'Tele2 Bredband 1 Gbit', amount: 849 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=10188, p25=9000, gross=1188, net=950
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1495,
      secondaryComponentMonthly:    849,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: null, // kund på/under verifierat listpris (Tele2 849 kr/mån / Bas 299) — ingen besparing får claimas (precision eller tystnad)
  },

  // ── tele2-05 ──────────────────────────────────────────────────────────────────
  // Tele2 kombinerad: 15 mobil + Fiber 250 Mbit, mixed=true
  // secAnnual=Math.round(500*12)=6000, p25=5400, gross=600, net=Math.round(600*0.80)=480
  {
    id: 'tele2-05',
    name: 'Tele2 kombinerad: 15 mobil + Fiber 250 Mbit — mixed=true',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business L (15 st)', amount: 5235 },
      { type: 'recurring_subscription', description: 'Tele2 Fiber 250 Mbit', amount: 500 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 15,
    industry: 'konsult',
    // secAnnual=6000, p25=5400, gross=600, net=480
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      5235,
      secondaryComponentMonthly:    500,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   6000,
      suggestedAnnual: 5400,
      grossSaving:     600,
      netSaving:       480,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // BREDBAND (bb-01 – bb-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── bb-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'bb-01',
    name: 'Tele2 Fiber 500 Mbit — bredband-only, inga tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Bredband 500 Mbit', amount: 790 },
    ],
    category: 'bredband',
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

  // ── bb-02 ──────────────────────────────────────────────────────────────────
  // Bahnhof 1 Gbit + Statisk IP addon (addon_type='static_ip')
  {
    id: 'bb-02',
    name: 'Bahnhof Företag 1 Gbit + Statisk IP-tillägg (addon_type=static_ip)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bahnhof Företag 1 Gbit', amount: 995 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 150, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'bredband',
    mixed: false,
    employees: 8,
    industry: 'it-tech',
    // broadbandAddon: BROADBAND_ADDON_TYPES.has('static_ip') → true → broadbandAddonMonthly=150
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        150,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── bb-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'bb-03',
    name: 'ComHem Fiber 100 Mbit — enkel bredbandsanslutning',
    lineItems: [
      { type: 'recurring_subscription', description: 'ComHem Fiber 100 Mbit Företag', amount: 349 },
    ],
    category: 'bredband',
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

  // ── bb-04 ──────────────────────────────────────────────────────────────────
  // Bredband + 6 mobilabonnemang (6 separata rader), mixed=true, category=bredband
  // secondarySeatCount=6, secondaryComponentMonthly=1794
  // secAnnual=Math.round(1794*12)=21528, byraer micro p25=2868
  // p25Total=Math.round(2868*6)=17208, gross=21528-17208=4320 ≥ 500 → satt, net=Math.round(4320*0.80)=3456
  {
    id: 'bb-04',
    name: 'Bredband 1 Gbit + 6 mobilabonnemang (6 rader à 299) — gross=4320 → satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Bredband 1 Gbit', amount: 849 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 1', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 2', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 3', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 4', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 5', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 6', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 6,
    industry: 'konsult',
    // p25Total=Math.round(2868*6)=17208, secAnnual=Math.round(1794*12)=21528, gross=4320 → satt
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      849,
      secondaryComponentMonthly:    1794,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           6,
    },
    secondary: {
      category:        'mobil',
      seatCount:       6,
      currentAnnual:   21528,
      suggestedAnnual: 17208,
      grossSaving:     4320,
      netSaving:       3456,
    },
  },

  // ── bb-05 ──────────────────────────────────────────────────────────────────
  // Bredband 500 Mbit + 3 mobilabonnemang (3 rader à 299), mixed=true, category=bredband
  // secondarySeatCount=3, secAnnual=Math.round(897*12)=10764
  // byraer micro p25=2868, p25Total=Math.round(2868*3)=8604, gross=10764-8604=2160 ≥ 500 → satt
  {
    id: 'bb-05',
    name: 'Bredband 500 Mbit + 3 mobilabonnemang (3 rader à 299) — gross=2160 → satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 1', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 2', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 3', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 3,
    industry: 'konsult',
    // secAnnual=10764, p25Total=8604, gross=2160 → satt
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    897,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           3,
    },
    secondary: {
      category:        'mobil',
      seatCount:       3,
      currentAnnual:   10764,
      suggestedAnnual: 8604,
      grossSaving:     2160,
      netSaving:       1728,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MICROSOFT 365 (ms-01 – ms-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── ms-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'ms-01',
    name: 'M365 Business Standard — 10 platser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 st)', amount: 1420 },
    ],
    category: 'saas-productivity',
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

  // ── ms-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'ms-02',
    name: 'M365 Business Premium — 8 platser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium (8 st)', amount: 1848 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 8,
    industry: 'it-tech',
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

  // ── ms-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'ms-03',
    name: 'M365 E3 — 50 platser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (50 st)', amount: 18900 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 50,
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

  // ── ms-04 ──────────────────────────────────────────────────────────────────
  // 57 licenser men bara 45 anställda → licenseOverage=12 (testas i recommend-lagret)
  {
    id: 'ms-04',
    name: 'M365 Business Standard 57 platser — employees=45 (overage=12)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (57 st)', amount: 8094 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 45,
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

  // ── ms-05 ──────────────────────────────────────────────────────────────────
  {
    id: 'ms-05',
    name: 'M365 Business Standard 20 st + Power BI Pro 5 st',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (20 st)', amount: 2840 },
      { type: 'recurring_subscription', description: 'Power BI Pro (5 st)', amount: 495 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 20,
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

  // ════════════════════════════════════════════════════════════════════════════
  // RICOH / SKRIVARLEASING (ricoh-01 – ricoh-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── ricoh-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'ricoh-01',
    name: 'Ricoh MP C4503 maskinhyra + klick S/V variable',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh MP C4503 maskinhyra', amount: 350 },
      { type: 'variable_usage', description: 'Klickkostnad S/V 0,10 kr/sida', amount: 420 },
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

  // ── ricoh-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'ricoh-02',
    name: 'Ricoh 2 MFPs maskinhyra + serviceavtal is_addon=true',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C3000 MFP 1 maskinhyra', amount: 350 },
      { type: 'recurring_subscription', description: 'Ricoh IM C3000 MFP 2 maskinhyra', amount: 350 },
      { type: 'recurring_subscription', description: 'Ricoh serviceavtal premium', amount: 200, is_addon: true },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 20,
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

  // ── ricoh-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'ricoh-03',
    name: 'Ricoh 3 skrivare — litet kontor (20 anst)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM C2500 MFP 1', amount: 310 },
      { type: 'recurring_subscription', description: 'Ricoh IM C2500 MFP 2', amount: 310 },
      { type: 'recurring_subscription', description: 'Ricoh IM C2500 MFP 3', amount: 310 },
      { type: 'variable_usage', description: 'Klickkostnad total', amount: 560 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 20,
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

  // ── ricoh-04 ──────────────────────────────────────────────────────────────────
  {
    id: 'ricoh-04',
    name: 'Konica Minolta maskinhyra + klick S/V + klick färg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Konica Minolta bizhub C360i maskinhyra', amount: 280 },
      { type: 'variable_usage', description: 'Klickkostnad S/V', amount: 336 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 280 },
    ],
    category: 'skrivarleasing',
    mixed: false,
    employees: 10,
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

  // ── ricoh-05 ──────────────────────────────────────────────────────────────────
  {
    id: 'ricoh-05',
    name: 'Canon maskinhyra + tonerleverans one_time_fee',
    lineItems: [
      { type: 'recurring_subscription', description: 'Canon imageRUNNER ADVANCE DX maskinhyra', amount: 320 },
      { type: 'one_time_fee', description: 'Tonerkassett svart (1 st)', amount: 450 },
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

  // ════════════════════════════════════════════════════════════════════════════
  // EL (el-real-01 – el-real-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── el-real-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'el-real-01',
    name: 'Vattenfall Företag spotpris — nätavgift recurring + förbrukning variable',
    lineItems: [
      { type: 'recurring_subscription', description: 'Vattenfall nätavgift fast del', amount: 450 },
      { type: 'variable_usage', description: 'Spotprisförbrukning (kWh)', amount: 1820 },
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

  // ── el-real-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'el-real-02',
    name: 'Tibber Business spotpris — fast abonnemang + rörlig kWh',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tibber Business abonnemang', amount: 49 },
      { type: 'variable_usage', description: 'Elanvändning timspot (kWh)', amount: 2140 },
    ],
    category: 'el',
    mixed: false,
    employees: 5,
    industry: 'it-tech',
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

  // ── el-real-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'el-real-03',
    name: 'Ellevio nätavgift + Bixia elhandel — två separata leverantörer',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ellevio nätavgift rörlig del', amount: 890 },
      { type: 'recurring_subscription', description: 'Bixia el förnybar rörlig', amount: 1240 },
    ],
    category: 'el',
    mixed: false,
    employees: 12,
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

  // ── el-real-04 ──────────────────────────────────────────────────────────────────
  {
    id: 'el-real-04',
    name: 'TryggEl fastpris 2-årsavtal — hög recurring, ingen variable',
    lineItems: [
      { type: 'recurring_subscription', description: 'TryggEl fastpris 2 år 5000 kWh/mån', amount: 6250 },
    ],
    category: 'el',
    mixed: false,
    employees: 30,
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

  // ── el-real-05 ──────────────────────────────────────────────────────────────────
  {
    id: 'el-real-05',
    name: 'Tillverkningsanläggning — hög förbrukning, hardware transformatorservice',
    lineItems: [
      { type: 'recurring_subscription', description: 'E.ON elnätsavgift industri', amount: 3200 },
      { type: 'recurring_subscription', description: 'Fortum industri elhandel', amount: 9800 },
      { type: 'variable_usage', description: 'Effektavgift (kW-timmar)', amount: 2400 },
      { type: 'hardware', description: 'Transformatorservice engång', amount: 4900 },
    ],
    category: 'el',
    mixed: false,
    employees: 80,
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

  // ════════════════════════════════════════════════════════════════════════════
  // LARM OCH SÄKERHET (larm-01 – larm-03)
  // ════════════════════════════════════════════════════════════════════════════

  // ── larm-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'larm-01',
    name: 'Sector Alarm Företag — 399 kr/mån larmövervakning',
    lineItems: [
      { type: 'recurring_subscription', description: 'Sector Alarm Företag larmövervakning', amount: 399 },
    ],
    category: 'larm-bevakning',
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

  // ── larm-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'larm-02',
    name: 'Verisure Företag — 499 kr/mån + utrustningshyra',
    lineItems: [
      { type: 'recurring_subscription', description: 'Verisure Företag kameraövervakning', amount: 499 },
      { type: 'recurring_subscription', description: 'Verisure utrustningshyra', amount: 150 },
    ],
    category: 'larm-bevakning',
    mixed: false,
    employees: 8,
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

  // ── larm-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'larm-03',
    name: 'Safemore Basic — budgetalternativ 249 kr/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'Safemore Basic larmövervakning', amount: 249 },
    ],
    category: 'larm-bevakning',
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

  // ════════════════════════════════════════════════════════════════════════════
  // BILLEASING (bil-01 – bil-03)
  // ════════════════════════════════════════════════════════════════════════════

  // ── bil-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'bil-01',
    name: 'Arval — 1 Volvo XC40 leasing 4500 kr/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'Arval Volvo XC40 serviceleasing', amount: 4500 },
    ],
    category: 'leasing-bil',
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

  // ── bil-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'bil-02',
    name: 'LeasePlan — 3 fordon, 13500 kr/mån total',
    lineItems: [
      { type: 'recurring_subscription', description: 'LeasePlan Tesla Model Y (3 st)', amount: 13500 },
    ],
    category: 'leasing-bil',
    mixed: false,
    employees: 15,
    industry: 'it-tech',
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

  // ── bil-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'bil-03',
    name: 'Autoplan — 2 elbilar, 9600 kr/mån total',
    lineItems: [
      { type: 'recurring_subscription', description: 'Autoplan Polestar 2 (2 st)', amount: 9600 },
    ],
    category: 'leasing-bil',
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

  // ════════════════════════════════════════════════════════════════════════════
  // IT-SUPPORT (it-01 – it-03)
  // ════════════════════════════════════════════════════════════════════════════

  // ── it-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'it-01',
    name: 'Advania MSP — 15 anst, 700 kr/anst/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'Advania Managed IT Services (15 anst)', amount: 10500 },
    ],
    category: 'it-support',
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

  // ── it-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'it-02',
    name: 'Lokal IT-partner — 5 anst, 350 kr/anst/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'IT-support helpdesk (5 anst)', amount: 1750 },
    ],
    category: 'it-support',
    mixed: false,
    employees: 5,
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

  // ── it-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'it-03',
    name: 'Atea managed services — 50 anst, 900 kr/anst/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'Atea Managed Services Enterprise (50 anst)', amount: 45000 },
    ],
    category: 'it-support',
    mixed: false,
    employees: 50,
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

  // ════════════════════════════════════════════════════════════════════════════
  // KOMBOFAKTUROR MOBIL+BREDBAND (combo-01 – combo-10)
  // ════════════════════════════════════════════════════════════════════════════

  // ── combo-01 ──────────────────────────────────────────────────────────────────
  // 20 mobil (5980) + 1 Gbit (850), mixed=true, category=mobil
  // secAnnual=Math.round(850*12)=10200, p25=9000, gross=1200, net=Math.round(1200*0.80)=960
  {
    id: 'combo-01',
    name: 'Tele2: 20 mobil (5980) + 1 Gbit (850) — gross=1200, net=960',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business M (20 st)', amount: 5980 },
      { type: 'recurring_subscription', description: 'Tele2 Bredband 1 Gbit', amount: 850 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 20,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      5980,
      secondaryComponentMonthly:    850,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: null, // kund på/under verifierat listpris (Tele2 849 kr/mån / Bas 299) — ingen besparing får claimas (precision eller tystnad)
  },

  // ── combo-02 ──────────────────────────────────────────────────────────────────
  // 5 mobil (1495) + 100 Mbit (420), mixed=true
  // secAnnual=Math.round(420*12)=5040, p25=4200, gross=840, net=Math.round(840*0.80)=672
  {
    id: 'combo-02',
    name: 'Telenor: 5 mobil (1495) + 100 Mbit (420) — gross=840, net=672',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (5 st)', amount: 1495 },
      { type: 'recurring_subscription', description: 'Telenor Fiber 100 Mbit', amount: 420 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=5040, p25=4200, gross=840, net=672
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1495,
      secondaryComponentMonthly:    420,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   5040,
      suggestedAnnual: 4200,
      grossSaving:     840,
      netSaving:       672,
    },
  },

  // ── combo-03 ──────────────────────────────────────────────────────────────────
  // 8 mobil (2792) + 250 Mbit (495), mixed=true
  // secAnnual=Math.round(495*12)=5940, p25=5400, gross=540, net=Math.round(540*0.80)=432
  {
    id: 'combo-03',
    name: 'Tele2: 8 mobil (2792) + 250 Mbit (495) — gross=540, net=432',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business L (8 st)', amount: 2792 },
      { type: 'recurring_subscription', description: 'Tele2 Fiber 250 Mbit', amount: 495 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 8,
    industry: 'konsult',
    // secAnnual=5940, p25=5400, gross=540, net=432
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      2792,
      secondaryComponentMonthly:    495,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   5940,
      suggestedAnnual: 5400,
      grossSaving:     540,
      netSaving:       432,
    },
  },

  // ── combo-04 ──────────────────────────────────────────────────────────────────
  // 3 mobil (897) + 500 Mbit (600), mixed=true
  // secAnnual=Math.round(600*12)=7200, p25=7200, gross=0 → secondary=null
  {
    id: 'combo-04',
    name: 'Telia: 3 mobil (897) + 500 Mbit (600) — gross=0 → secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil M (3 st)', amount: 897 },
      { type: 'recurring_subscription', description: 'Telia Fiber 500 Mbit', amount: 600 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 3,
    industry: 'konsult',
    // secAnnual=7200, p25=7200, gross=0 → null
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      897,
      secondaryComponentMonthly:    600,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── combo-05 ──────────────────────────────────────────────────────────────────
  // 12 mobil (4188) + 500 Mbit (750), mixed=true
  // secAnnual=Math.round(750*12)=9000, p25=7200, gross=1800, net=Math.round(1800*0.80)=1440
  {
    id: 'combo-05',
    name: 'Telenor: 12 mobil (4188) + 500 Mbit (750) — gross=1800, net=1440',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (12 st)', amount: 4188 },
      { type: 'recurring_subscription', description: 'Telenor Fiber 500 Mbit', amount: 750 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 12,
    industry: 'konsult',
    // secAnnual=9000, p25=7200, gross=1800, net=1440
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      4188,
      secondaryComponentMonthly:    750,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   9000,
      suggestedAnnual: 7200,
      grossSaving:     1800,
      netSaving:       1440,
    },
  },

  // ── combo-06 ──────────────────────────────────────────────────────────────────
  // Bredband 500 Mbit (700) + 10 mobilabonnemang-rader (à 299 kr, total 2990)
  // mixed=true, category=bredband, employees=10, industry=konsult (byraer)
  // secondarySeatCount=10, secAnnual=Math.round(2990*12)=35880
  // p25=2868 (flat), p25Total=Math.round(2868*10)=28680, gross=7200, net=5760
  {
    id: 'combo-06',
    name: 'Bredband 500 Mbit + 10 mobilabonnemang — byraer small, gross=7200, net=5760',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Bredband 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 1', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 2', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 3', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 4', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 5', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 6', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 7', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 8', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 9', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business 10', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 10,
    industry: 'konsult',
    // secondarySeatCount=10, secondarySum=2990, secAnnual=35880
    // byraer p25=2868 (flat), p25Total=28680, gross=7200, net=5760
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    2990,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           10,
    },
    secondary: {
      category:        'mobil',
      seatCount:       10,
      currentAnnual:   35880,
      suggestedAnnual: 28680,
      grossSaving:     7200,
      netSaving:       5760,
    },
  },

  // ── combo-07 ──────────────────────────────────────────────────────────────────
  // Bredband 1 Gbit (849) + 8 mobilabonnemang-rader (à 349, total 2792)
  // mixed=true, category=bredband, employees=25, industry=ehandel
  // secondarySeatCount=8, secAnnual=Math.round(2792*12)=33504
  // ehandel p25=2868 (flat), p25Total=Math.round(2868*8)=22944, gross=10560, net=8448
  {
    id: 'combo-07',
    name: 'Bredband 1 Gbit + 8 mobilabonnemang-rader — ehandel small, gross=10560, net=8448',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Fiber 1 Gbit', amount: 849 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 1', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 2', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 3', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 4', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 5', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 6', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 7', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telia Business 8', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 25,
    industry: 'ehandel',
    // secondarySeatCount=8, secondarySum=2792, secAnnual=33504
    // ehandel p25=2868 (flat), p25Total=Math.round(2868*8)=22944, gross=10560, net=8448
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      849,
      secondaryComponentMonthly:    2792,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           8,
    },
    secondary: {
      category:        'mobil',
      seatCount:       8,
      currentAnnual:   33504,
      suggestedAnnual: 22944,
      grossSaving:     10560,
      netSaving:       8448,
    },
  },

  // ── combo-08 ──────────────────────────────────────────────────────────────────
  // Bredband 250 Mbit (450) + 4 mobilabonnemang (à 299, total 1196)
  // mixed=true, category=bredband, employees=4, industry=bygg (hantverkare)
  // secondarySeatCount=4, secAnnual=Math.round(1196*12)=14352
  // hantverkare micro p25=2868, p25Total=Math.round(2868*4)=11472, gross=2880 ≥ 500 → satt, net=2304
  {
    id: 'combo-08',
    name: 'Bredband 250 Mbit + 4 mobilabonnemang — bygg/hantverkare micro, gross=2880 → satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bahnhof Fiber 250 Mbit', amount: 450 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telenor Business 1', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telenor Business 2', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telenor Business 3', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Telenor Business 4', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 4,
    industry: 'bygg',
    // hantverkare micro p25=2868, p25Total=11472, secAnnual=14352, gross=2880 → satt
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      450,
      secondaryComponentMonthly:    1196,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           4,
    },
    secondary: {
      category:        'mobil',
      seatCount:       4,
      currentAnnual:   14352,
      suggestedAnnual: 11472,
      grossSaving:     2880,
      netSaving:       2304,
    },
  },

  // ── combo-09 ──────────────────────────────────────────────────────────────────
  // 50 mobil (17350) + 1 Gbit (900), mixed=true, category=mobil, employees=50
  // secAnnual=Math.round(900*12)=10800, p25=9000, gross=1800, net=Math.round(1800*0.80)=1440
  {
    id: 'combo-09',
    name: 'Tele2: 50 mobil (17350) + 1 Gbit (900) — gross=600, net=480',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business Max (50 st)', amount: 17350 },
      { type: 'recurring_subscription', description: 'Tele2 Bredband 1 Gbit', amount: 900 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 50,
    industry: 'tillverkning',
    // secAnnual=10800, p25=10200, gross=600, net=480
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      17350,
      secondaryComponentMonthly:    900,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10800,
      suggestedAnnual: 10200,
      grossSaving:     600,
      netSaving:       480,
    },
  },

  // ── combo-10 ──────────────────────────────────────────────────────────────────
  // 15 mobil (4485) + 1 Gbit (895), mixed=true, category=mobil, employees=15
  // secAnnual=Math.round(895*12)=10740, p25=10200, gross=1740, net=Math.round(1740*0.80)=1392
  {
    id: 'combo-10',
    name: 'Telenor: 15 mobil (4485) + 1 Gbit (895) — gross=540, net=432',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil Plus (15 st)', amount: 4485 },
      { type: 'recurring_subscription', description: 'Telenor Fiber 1 Gbit', amount: 895 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 15,
    industry: 'ehandel',
    // secAnnual=10740, p25=10200, gross=540, net=432
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      4485,
      secondaryComponentMonthly:    895,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10740,
      suggestedAnnual: 10200,
      grossSaving:     540,
      netSaving:       432,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DIVERSE REALISTISKA (misc-01 – misc-21)
  // ════════════════════════════════════════════════════════════════════════════

  // ── misc-01 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-01',
    name: 'Fortnox bokföringssystem — saas-finance (requiresVolumeData)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fortnox Bokföring + Faktura', amount: 399 },
    ],
    category: 'saas-finance',
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

  // ── misc-02 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-02',
    name: 'Café/ehandel el-räkning — ehandel, mid size',
    lineItems: [
      { type: 'recurring_subscription', description: 'Vattenfall Företag nätavgift', amount: 2400 },
      { type: 'variable_usage', description: 'Elförbrukning kWh', amount: 8600 },
    ],
    category: 'el',
    mixed: false,
    employees: 55,
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

  // ── misc-03 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-03',
    name: 'Konsult bredband-only — 100 Mbit, inga tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bahnhof Fiber 100 Mbit kontorsanslutning', amount: 349 },
    ],
    category: 'bredband',
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

  // ── misc-04 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-04',
    name: 'Transportbolag mobil — 20 anst, fältarbetare',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business Max (20 st)', amount: 8980 },
      { type: 'variable_usage', description: 'EU-roaming övertrafik', amount: 450 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 20,
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

  // ── misc-05 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-05',
    name: 'Hantverksbolag M365 Business Basic — bygg, 10 platser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic (10 st)', amount: 750 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 10,
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

  // ── misc-06 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-06',
    name: 'Vård-sektor bredband — 500 Mbit sjukvårdsklinik',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Fiber 500 Mbit', amount: 750 },
    ],
    category: 'bredband',
    mixed: false,
    employees: 15,
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

  // ── misc-07 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-07',
    name: 'Zoom Pro — 10 platser, konferenslösning',
    lineItems: [
      { type: 'recurring_subscription', description: 'Zoom Pro (10 st)', amount: 1330 },
    ],
    category: 'saas-productivity',
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

  // ── misc-08 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-08',
    name: 'Slack Pro — 25 platser, kommunikationsplattform',
    lineItems: [
      { type: 'recurring_subscription', description: 'Slack Pro (25 st)', amount: 2188 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 25,
    industry: 'it-tech',
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

  // ── misc-09 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-09',
    name: 'Fortnox Lön — lönesystem 10 anst',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fortnox Lön (10 anst)', amount: 449 },
    ],
    category: 'loneadmin',
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

  // ── misc-10 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-10',
    name: 'Hotell larm och kameraövervakning — byraer-segment',
    lineItems: [
      { type: 'recurring_subscription', description: 'Sector Alarm Hotell larm + kamera', amount: 799 },
    ],
    category: 'larm-bevakning',
    mixed: false,
    employees: 12,
    industry: 'hotell',
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

  // ── misc-11 ──────────────────────────────────────────────────────────────────
  {
    id: 'misc-11',
    name: 'Tillverkning skrivarleasing — 3 skrivare hög volym',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh IM A3500 maskinhyra 1', amount: 650 },
      { type: 'recurring_subscription', description: 'Ricoh IM A3500 maskinhyra 2', amount: 650 },
      { type: 'recurring_subscription', description: 'Ricoh IM A3500 maskinhyra 3', amount: 650 },
      { type: 'variable_usage', description: 'Klickkostnad S/V (hög volym)', amount: 2800 },
      { type: 'variable_usage', description: 'Klickkostnad färg', amount: 960 },
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

  // ── misc-12 ──────────────────────────────────────────────────────────────────
  // Mobil + molnväxel via desc-regex ("molnväxel" matchar MOBILE_RX)
  {
    id: 'misc-12',
    name: 'Telia Jobbmobil + Molnväxel via desc-regex (ej addon_type)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil M (8 st)', amount: 2792 },
      { type: 'recurring_subscription', description: 'Telia molnväxel Business', amount: 650 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 8,
    industry: 'konsult',
    // "Telia molnväxel Business" matchar ADDON_FALLBACK_RX.mobil (/molnväxel/) → mobileAddon
    // is_addon=undefined (not true) → regex-only fallback → isMobileAddon=true → mobileAddonMonthly=650
    metrics: {
      mobileAddonMonthly:           650,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-13 ──────────────────────────────────────────────────────────────────
  // Bredband + brandvägg addon (matchar BROADBAND_RX via desc)
  {
    id: 'misc-13',
    name: 'Bredband 1 Gbit + Managed Firewall via desc-regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Bredband 1 Gbit', amount: 849 },
      { type: 'recurring_subscription', description: 'Managed Firewall Business', amount: 299 },
    ],
    category: 'bredband',
    mixed: false,
    employees: 10,
    industry: 'it-tech',
    // "Managed Firewall Business" matchar /managed[\s-]?firewall/i → isBroadbandAddon
    // is_addon=undefined → regex-only fallback → broadbandAddonMonthly=299
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        299,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-14 ──────────────────────────────────────────────────────────────────
  // Telenor mobil + VoIP via addon_type='voip'
  {
    id: 'misc-14',
    name: 'Telenor Business + VoIP-tillägg (addon_type=voip)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Max (6 st)', amount: 2394 },
      { type: 'recurring_subscription', description: 'VoIP Office tillägg', amount: 450, addon_type: 'voip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 6,
    industry: 'konsult',
    // MOBILE_ADDON_TYPES.has('voip') → true → mobileAddonMonthly=450
    metrics: {
      mobileAddonMonthly:           450,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-15 ──────────────────────────────────────────────────────────────────
  // Bredband + statisk IP (addon_type='static_ip') + firewall (addon_type='firewall')
  {
    id: 'misc-15',
    name: 'Bredband 500 Mbit + Statisk IP + Managed Firewall (båda addon_type)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bahnhof Fiber 500 Mbit', amount: 749 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 150, addon_type: 'static_ip' },
      { type: 'recurring_subscription', description: 'Managed Firewall', amount: 490, addon_type: 'firewall' },
    ],
    category: 'bredband',
    mixed: false,
    employees: 15,
    industry: 'it-tech',
    // broadbandAddonSum = 150 + 490 = 640 → broadbandAddonMonthly=640
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        640,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-16 ──────────────────────────────────────────────────────────────────
  // Telia ADSL (äldre teknik, matchar /adsl/ i SECONDARY_CATEGORY_RX['mobil'])
  // Används i ett mixed=true mobil-scenario
  {
    id: 'misc-16',
    name: 'Tele2 mobil + ADSL-anslutning — mixed=true, "adsl" matchar secondary-regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business (4 st)', amount: 1196 },
      { type: 'recurring_subscription', description: 'Tele2 ADSL 100 Mbit', amount: 390 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 4,
    industry: 'konsult',
    // "ADSL 100 Mbit" matchar SECONDARY_CATEGORY_RX['mobil'] (/adsl/) → secondaryLine
    // speed: "ADSL 100 Mbit" → extractSpeedMbitFromDesc: /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i → 100 Mbit → snap 100≤100 → 100
    // secondaryComponentMonthly=390, primaryComponentMonthly=1196
    // secAnnual=Math.round(390*12)=4680, p25=4200, gross=480 < 500 → secondary=null
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1196,
      secondaryComponentMonthly:    390,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-17 ──────────────────────────────────────────────────────────────────
  // Bredband med SLA-uppgradering (addon_type='sla')
  {
    id: 'misc-17',
    name: 'Bredband 500 Mbit + SLA-uppgradering (addon_type=sla)',
    lineItems: [
      { type: 'recurring_subscription', description: 'GlobalConnect Fiber 500 Mbit', amount: 890 },
      { type: 'recurring_subscription', description: 'SLA Uppgradering 4h → 2h', amount: 350, addon_type: 'sla' },
    ],
    category: 'bredband',
    mixed: false,
    employees: 20,
    industry: 'it-tech',
    // BROADBAND_ADDON_TYPES.has('sla') → true → broadbandAddonMonthly=350
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        350,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-18 ──────────────────────────────────────────────────────────────────
  // Företagshälsovård
  {
    id: 'misc-18',
    name: 'Feelgood Företagshälsa — 10 anst, baspaket',
    lineItems: [
      { type: 'recurring_subscription', description: 'Feelgood Digital Bas (10 anst)', amount: 1750 },
    ],
    category: 'foretagshalsovard',
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

  // ── misc-19 ──────────────────────────────────────────────────────────────────
  // Teams direkt-integration (matchar /teams[\s-]?direkt/i → mobile addon)
  {
    id: 'misc-19',
    name: 'Telia Jobbmobil + Teams direkt-integration via desc-regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil M (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Teams direkt PSTN-anslutning', amount: 495 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    // "Teams direkt PSTN" matchar /teams[\s-]?direkt/ → mobileAddon
    // Also matches /pstn/ → also mobileAddon (same effect)
    // is_addon=undefined → regex-only fallback → mobileAddonMonthly=495
    metrics: {
      mobileAddonMonthly:           495,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── misc-20 ──────────────────────────────────────────────────────────────────
  // Bredband + mobilabonnemang som sekundär men gross precis > 500
  // mixed=true, category=bredband, employees=20, industry=konsult (byraer)
  // 2 mobilabonnemang-rader (à 499, total 998)
  // secondarySeatCount=2, secAnnual=Math.round(998*12)=11976
  // byraer p25=2868 (flat), p25Total=Math.round(2868*2)=5736, gross=11976-5736=6240, net=Math.round(6240*0.80)=4992
  {
    id: 'misc-20',
    name: 'Bredband 500 Mbit + 2 premium-mobilabonnemang — byraer small, gross=6240, net=4992',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business Premium 1', amount: 499 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Tele2 Business Premium 2', amount: 499 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 20,
    industry: 'konsult',
    // byraer p25=2868 (flat), secondarySeatCount=2, secAnnual=11976, p25Total=5736, gross=6240, net=4992
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    998,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           2,
    },
    secondary: {
      category:        'mobil',
      seatCount:       2,
      currentAnnual:   11976,
      suggestedAnnual: 5736,
      grossSaving:     6240,
      netSaving:       4992,
    },
  },

  // ── misc-21 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband FTTH (matchar /ftth/ i SECONDARY_CATEGORY_RX['mobil'])
  {
    id: 'misc-21',
    name: 'Telenor mobil + FTTH-anslutning — "ftth" matchar secondary-regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (6 st)', amount: 2394 },
      { type: 'recurring_subscription', description: 'Telenor FTTH 1 Gbit', amount: 895 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 6,
    industry: 'konsult',
    // "FTTH 1 Gbit" matchar /ftth/ → secondaryLine; speed "1 Gbit" → speedMbit=1000
    // secAnnual=Math.round(895*12)=10740, p25=10200, gross=540, net=Math.round(540*0.80)=432
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      2394,
      secondaryComponentMonthly:    895,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10740,
      suggestedAnnual: 10200,
      grossSaving:     540,
      netSaving:       432,
    },
  },

];
