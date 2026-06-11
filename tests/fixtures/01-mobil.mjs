// tests/fixtures/01-mobil.mjs
// 50 fixtures for computeInvoiceMetrics + computeSecondarySaving — category='mobil'
//
// Computation recap:
//   recurring = lineItems where type='recurring_subscription'
//   mobileAddon: addon_type in {pbx,voip}  OR
//                (is_addon===true && addon_type NOT in {static_ip,firewall,sla} && desc matches MOBILE_RX)  OR
//                (is_addon!==true && desc matches MOBILE_RX)
//   broadbandAddon: addon_type in {static_ip,firewall,sla}  OR
//                   (is_addon===true && addon_type NOT in {pbx,voip} && desc matches BROADBAND_RX)  OR
//                   (is_addon!==true && desc matches BROADBAND_RX)
//   base = recurring where !isMobileAddon && !isBroadbandAddon
//   mobileAddonMonthly = sum(mobileAddons)>0 ? sum : null
//   broadbandAddonMonthly = sum(broadbandAddons)>0 ? sum : null
//   When mixed=true & category='mobil':
//     primaryLines   = base where desc NOT matches /bredband|fiber|internet|adsl|ftth/i
//     secondaryLines = base where desc MATCHES /bredband|fiber|internet|adsl|ftth/i
//     primaryComponentMonthly = sum(primary)>0 ? sum : null
//     secondaryComponentMonthly = sum(secondary)>0 ? sum : null
//     secondaryConnectionSpeedMbit = speed extracted from FIRST secondary line (snapped to 100/250/500/1000)
//   When mixed=false: primary/secondary fields all null

export const fixtures = [

  // ── mob-01 ───────────────────────────────────────────────────────────────────
  // Enkel mobil, 5 abonnemang à 349 kr = 1745 kr, inga addons
  {
    id: 'mob-01',
    name: 'Enkel mobil — 5 abonnemang, inga addons',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-02 ───────────────────────────────────────────────────────────────────
  // Mobil med PBX-addon via addon_type='pbx'
  {
    id: 'mob-02',
    name: 'Mobil + PBX-addon via addon_type',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 994, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        994,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-03 ───────────────────────────────────────────────────────────────────
  // Mobil med VoIP-addon via addon_type='voip'
  {
    id: 'mob-03',
    name: 'Mobil + VoIP-addon via addon_type',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Företag Mobil (4 st)', amount: 1196 },
      { type: 'recurring_subscription', description: 'VoIP-tillägg', amount: 450, is_addon: true, addon_type: 'voip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 4,
    metrics: {
      mobileAddonMonthly:        450,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-04 ───────────────────────────────────────────────────────────────────
  // Molnväxel via desc (is_addon=false, ingen addon_type) — MOBILE_RX ska matcha
  {
    id: 'mob-04',
    name: 'Molnväxel via desc-regex (is_addon=false)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Tele2 Molnväxel Business', amount: 399, is_addon: false },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        399,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-05 ───────────────────────────────────────────────────────────────────
  // "cloud PBX" i beskrivning (regex-fallback, is_addon omitted)
  {
    id: 'mob-05',
    name: 'cloud PBX i beskrivning — regex-fallback',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Mobil Business (3 st)', amount: 1047 },
      { type: 'recurring_subscription', description: 'cloud PBX standard', amount: 299 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
    metrics: {
      mobileAddonMonthly:        299,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-06 ───────────────────────────────────────────────────────────────────
  // "Teams direkt" i beskrivning (regex-fallback)
  {
    id: 'mob-06',
    name: 'Teams direkt i beskrivning — regex-fallback',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (6 st)', amount: 2370 },
      { type: 'recurring_subscription', description: 'Teams direkt integration', amount: 550 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 6,
    metrics: {
      mobileAddonMonthly:        550,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-07 ───────────────────────────────────────────────────────────────────
  // "PSTN-linje" i beskrivning (regex-fallback)
  {
    id: 'mob-07',
    name: 'PSTN-linje i beskrivning — regex-fallback',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil S (2 st)', amount: 598 },
      { type: 'recurring_subscription', description: 'PSTN-linje analog', amount: 79 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 2,
    metrics: {
      mobileAddonMonthly:        79,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-08 ───────────────────────────────────────────────────────────────────
  // is_addon=true, addon_type=null, desc="molnväxel" → mobileAddon via is_addon+regex path
  {
    id: 'mob-08',
    name: 'is_addon=true + desc=molnväxel, no addon_type → mobileAddon',
    lineItems: [
      { type: 'recurring_subscription', description: 'Comviq Jobbmobil (4 st)', amount: 996 },
      { type: 'recurring_subscription', description: 'molnväxel enterprise', amount: 699, is_addon: true, addon_type: null },
    ],
    category: 'mobil',
    mixed: false,
    employees: 4,
    metrics: {
      mobileAddonMonthly:        699,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-09 ───────────────────────────────────────────────────────────────────
  // is_addon=true, addon_type='pbx' → klassas direkt via addon_type
  {
    id: 'mob-09',
    name: 'is_addon=true + addon_type=pbx → mobileAddon direkt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil M (7 st)', amount: 2093 },
      { type: 'recurring_subscription', description: 'PBX Business Plus', amount: 890, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 7,
    metrics: {
      mobileAddonMonthly:        890,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-10 ───────────────────────────────────────────────────────────────────
  // Hardware-rad (type='hardware') ska IGNORERAS av metrics
  {
    id: 'mob-10',
    name: 'Mobil + hårdvara-rad ignoreras av metrics',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (3 st)', amount: 1185 },
      { type: 'hardware', description: 'Samsung Galaxy S24', amount: 8999 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-11 ───────────────────────────────────────────────────────────────────
  // Variabel roaming (type='variable_usage') ska IGNORERAS
  {
    id: 'mob-11',
    name: 'Mobil + variabel roaming ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (3 st)', amount: 1047 },
      { type: 'variable_usage', description: 'Roaming EU', amount: 234 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-12 ───────────────────────────────────────────────────────────────────
  // Engångsavgift (type='one_time_fee') ska IGNORERAS
  {
    id: 'mob-12',
    name: 'Mobil + engångsavgift ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Smart (5 st)', amount: 1745 },
      { type: 'one_time_fee', description: 'Anslutningsavgift', amount: 500 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-13 ───────────────────────────────────────────────────────────────────
  // BARA addon-rad, ingen bas-SIM → primaryComponentMonthly=null när mixed=true
  // base = recurring where !isMobileAddon && !isBroadbandAddon → empty
  {
    id: 'mob-13',
    name: 'Bara addon-rad, ingen bas-SIM → primaryComponentMonthly=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 890, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        890,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-14 ───────────────────────────────────────────────────────────────────
  // PBX + VoIP (två addons), mobileAddonMonthly = 994 + 450 = 1444
  {
    id: 'mob-14',
    name: 'PBX + VoIP addons — summan 1444 kr',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel standard', amount: 994, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'VoIP-gateway', amount: 450, is_addon: true, addon_type: 'voip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        1444,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-15 ───────────────────────────────────────────────────────────────────
  // static_ip i addon_type → broadbandAddon (ej mobileAddon)
  {
    id: 'mob-15',
    name: 'static_ip addon_type → broadbandAddonMonthly satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     149,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-16 ───────────────────────────────────────────────────────────────────
  // "statisk IP" i beskrivning utan addon_type → broadbandAddon via regex
  {
    id: 'mob-16',
    name: 'statisk IP i beskrivning — broadbandAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (4 st)', amount: 1396 },
      { type: 'recurring_subscription', description: 'statisk IP-tjänst', amount: 99 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 4,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     99,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-17 ───────────────────────────────────────────────────────────────────
  // Noll recurring items → alla metrics=null
  {
    id: 'mob-17',
    name: 'Tom lineItems — alla metrics=null',
    lineItems: [],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-18 ───────────────────────────────────────────────────────────────────
  // amount=0 på en rad → summan = 0 → null (sum > 0 check)
  {
    id: 'mob-18',
    name: 'amount=0 på en rad — metrics null om total=0',
    lineItems: [
      { type: 'recurring_subscription', description: 'Testabonnemang gratis', amount: 0 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-19 ───────────────────────────────────────────────────────────────────
  // Negativt belopp (kreditreversal) + normalt belopp → summan korrekt
  // 1745 + (-200) = 1545 > 0 → primaryComponentMonthly=1545 när mixed=true
  {
    id: 'mob-19',
    name: 'Negativt belopp (kreditreversal) — summa korrekt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Kreditering feldebitering', amount: -200 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      // primaryLines = base where NOT /bredband|fiber|internet|adsl|ftth/ → both lines match
      // primaryComponentMonthly = 1745 + (-200) = 1545
      primaryComponentMonthly:   1545,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-20 ───────────────────────────────────────────────────────────────────
  // Exakt branschsnittspris (vi testar bara metrics, ej secondary)
  // median=4188/user, 5 users → 20940 kr/år = 1745 kr/mån
  {
    id: 'mob-20',
    name: 'Exakt branschsnittspris — 5 abonnemang 1745 kr/mån',
    lineItems: [
      { type: 'recurring_subscription', description: 'Mobil Business 5 st', amount: 1745 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-21 ───────────────────────────────────────────────────────────────────
  // is_addon=false OCH addon_type='pbx' → addon_type primär signal → mobileAddon
  {
    id: 'mob-21',
    name: 'is_addon=false + addon_type=pbx → mobileAddon (addon_type primär)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (3 st)', amount: 1047 },
      { type: 'recurring_subscription', description: 'Växeltjänst', amount: 350, is_addon: false, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
    metrics: {
      mobileAddonMonthly:        350,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-22 ───────────────────────────────────────────────────────────────────
  // is_addon=true OCH addon_type='static_ip' → broadbandAddon (trots is_addon=true)
  {
    id: 'mob-22',
    name: 'is_addon=true + addon_type=static_ip → broadbandAddon',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Företag Mobil (5 st)', amount: 1495 },
      { type: 'recurring_subscription', description: 'Statisk IP', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     149,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-23 ───────────────────────────────────────────────────────────────────
  // Firewall-addon (addon_type='firewall') → broadbandAddon
  {
    id: 'mob-23',
    name: 'firewall addon_type → broadbandAddonMonthly',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Managed Firewall', amount: 299, is_addon: true, addon_type: 'firewall' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     299,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-24 ───────────────────────────────────────────────────────────────────
  // SLA-addon (addon_type='sla') → broadbandAddon
  {
    id: 'mob-24',
    name: 'sla addon_type → broadbandAddonMonthly',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'SLA-uppgradering premium', amount: 199, is_addon: true, addon_type: 'sla' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     199,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-25 ───────────────────────────────────────────────────────────────────
  // UTM (desc="UTM-brandväggsservice") → broadbandAddon via regex \butm\b
  {
    id: 'mob-25',
    name: 'UTM i beskrivning — broadbandAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'UTM-brandväggsservice', amount: 249 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     249,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-26 ───────────────────────────────────────────────────────────────────
  // "managed firewall" i beskrivning → broadbandAddon via regex
  {
    id: 'mob-26',
    name: 'managed firewall i beskrivning — broadbandAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Comviq Jobbmobil (5 st)', amount: 1245 },
      { type: 'recurring_subscription', description: 'managed firewall pro', amount: 399 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     399,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-27 ───────────────────────────────────────────────────────────────────
  // mixed=true men INGA broadband-rader i base → secondaryComponentMonthly=null
  {
    id: 'mob-27',
    name: 'mixed=true men inga bredband-rader → secondaryComponentMonthly=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel', amount: 890, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    metrics: {
      mobileAddonMonthly:        890,
      broadbandAddonMonthly:     null,
      // primaryLines: 1745 (not bredband/fiber/internet/adsl/ftth)
      primaryComponentMonthly:   1745,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-28 ───────────────────────────────────────────────────────────────────
  // mixed=true, bredbandsrad "Bredband 500/500 Mbit/s" → speed=500
  // secondary=bredband → computeSecondarySaving: tier=500, p25=7200
  // secAnnual = round(899 * 12) = 10788
  // gross = max(0, 10788 - 7200) = 3588 ≥ 500 → saving satt
  {
    id: 'mob-28',
    name: 'mixed=true + bredband 500 Mbit → speed=500, secondarySaving satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500/500 Mbit/s', amount: 899 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   1745,
      secondaryComponentMonthly: 899,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:        null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   10788,
      suggestedAnnual: 7200,
      grossSaving:     3588,
      netSaving:       2870,
    },
  },

  // ── mob-29 ───────────────────────────────────────────────────────────────────
  // mixed=true, bredbandsrad "Fiber 1 Gbit" → 1*1000=1000 Mbit → tier=1000
  // secAnnual = round(995 * 12) = 11940
  // gross = max(0, 11940 - 9000) = 2940 ≥ 500 → saving satt
  {
    id: 'mob-29',
    name: 'mixed=true + Fiber 1 Gbit → speed snappas till 1000',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Jobbmobil (4 st)', amount: 1196 },
      { type: 'recurring_subscription', description: 'Fiber 1 Gbit leverans', amount: 995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 4,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   1196,
      secondaryComponentMonthly: 995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:        null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   11940,
      suggestedAnnual: 10200,
      grossSaving:     1740,
      netSaving:       1392,
    },
  },

  // ── mob-30 ───────────────────────────────────────────────────────────────────
  // mixed=true, bredbandsrad "Internet 100 Mbit" → speed=100
  // secAnnual = round(450 * 12) = 5400
  // gross = max(0, 5400 - 4200) = 1200 ≥ 500 → saving satt
  {
    id: 'mob-30',
    name: 'mixed=true + Internet 100 Mbit → speed=100',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (3 st)', amount: 1185 },
      { type: 'recurring_subscription', description: 'Internet 100 Mbit', amount: 450 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 3,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   1185,
      secondaryComponentMonthly: 450,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:        null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   5400,
      suggestedAnnual: 4200,
      grossSaving:     1200,
      netSaving:       960,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // REALISTISKA FIXTURES (mob-31 – mob-50)
  // ════════════════════════════════════════════════════════════════════════════

  // ── mob-31 ───────────────────────────────────────────────────────────────────
  // Telenor Business Smart 10 abonnemang + molnväxel
  {
    id: 'mob-31',
    name: 'Telenor Business Smart 10 abonnemang + molnväxel',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Smart (10 st)', amount: 3490 },
      { type: 'recurring_subscription', description: 'Telenor Molnväxel Business', amount: 890, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 10,
    metrics: {
      mobileAddonMonthly:        890,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-32 ───────────────────────────────────────────────────────────────────
  // Tele2 Jobbmobil XL 8 st + molnväxel + statisk IP
  // mobileAddonMonthly = 1490, broadbandAddonMonthly = 149
  {
    id: 'mob-32',
    name: 'Tele2 8 abonnemang + molnväxel + statisk IP',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (8 st)', amount: 3592 },
      { type: 'recurring_subscription', description: 'Tele2 Molnväxel Pro', amount: 1490, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'it-tech',
    employees: 8,
    metrics: {
      mobileAddonMonthly:        1490,
      broadbandAddonMonthly:     149,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-33 ───────────────────────────────────────────────────────────────────
  // Comviq Budget 3 abonnemang — billigt
  {
    id: 'mob-33',
    name: 'Comviq Budget 3 abonnemang — billigt segment',
    lineItems: [
      { type: 'recurring_subscription', description: 'Comviq Budget Jobbmobil (3 st)', amount: 747 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'bygg',
    employees: 3,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-34 ───────────────────────────────────────────────────────────────────
  // Telia Jobbmobil Plus 25 abonnemang
  {
    id: 'mob-34',
    name: 'Telia Jobbmobil Plus 25 abonnemang',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil Plus (25 st)', amount: 9875 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 25,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-35 ───────────────────────────────────────────────────────────────────
  // Tre Företag 15 abonnemang + VoIP-tillägg
  // mobileAddonMonthly = 675
  {
    id: 'mob-35',
    name: 'Tre Företag 15 abonnemang + VoIP-tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Företag Mobil (15 st)', amount: 4485 },
      { type: 'recurring_subscription', description: 'VoIP-tillägg Business', amount: 675, is_addon: true, addon_type: 'voip' },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 15,
    metrics: {
      mobileAddonMonthly:        675,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-36 ───────────────────────────────────────────────────────────────────
  // Telenor 1 abonnemang — enkel singel
  {
    id: 'mob-36',
    name: 'Telenor 1 abonnemang — singel',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil S', amount: 349 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 1,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-37 ───────────────────────────────────────────────────────────────────
  // Tele2 med roaming (variable_usage ignoreras) + bas 1200 kr
  {
    id: 'mob-37',
    name: 'Tele2 roaming variable_usage ignoreras — bas 1200 kr',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil M (4 st)', amount: 1200 },
      { type: 'variable_usage', description: 'Roaming EU/USA', amount: 234 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 4,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-38 ───────────────────────────────────────────────────────────────────
  // Globalcom 12 abonnemang + Teams direkt-integration via desc
  {
    id: 'mob-38',
    name: 'Globalcom 12 abonnemang + Teams direkt-integration',
    lineItems: [
      { type: 'recurring_subscription', description: 'Globalcom Business Mobil (12 st)', amount: 5880 },
      { type: 'recurring_subscription', description: 'Teams direkt-integrering Enterprise', amount: 1200 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'it-tech',
    employees: 12,
    metrics: {
      // "Teams direkt-integrering" matches /teams[\s-]?direkt/i → mobileAddon
      mobileAddonMonthly:        1200,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-39 ───────────────────────────────────────────────────────────────────
  // Com Hem Mobil 3 abonnemang, inget addon
  {
    id: 'mob-39',
    name: 'Com Hem Mobil 3 abonnemang — inga addons',
    lineItems: [
      { type: 'recurring_subscription', description: 'Com Hem Mobil Jobbpaket (3 st)', amount: 807 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 3,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-40 ───────────────────────────────────────────────────────────────────
  // Mobilabonnemang med årsavtal (billingCycleType-fält, ingen effekt på metrics)
  {
    id: 'mob-40',
    name: 'Årsavtal mobilabonnemang — billingCycleType påverkar inte metrics',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st) årsavtal', amount: 1745, billingCycleType: 'annual' },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-41 ───────────────────────────────────────────────────────────────────
  // 50 abonnemang stor volym
  {
    id: 'mob-41',
    name: '50 abonnemang stor volym — inga addons',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Pro (50 st)', amount: 24500 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'tillverkning',
    employees: 50,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-42 ───────────────────────────────────────────────────────────────────
  // Mobil med PSTN-linje 4 kr/mån + bas 2000 kr
  // PSTN matchar MOBILE_RX → mobileAddon=4
  {
    id: 'mob-42',
    name: 'PSTN 4 kr/mån litet belopp + bas 2000 kr',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (6 st)', amount: 2000 },
      { type: 'recurring_subscription', description: 'PSTN-linje analog backup', amount: 4 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 6,
    metrics: {
      mobileAddonMonthly:        4,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-43 ───────────────────────────────────────────────────────────────────
  // "IP-PBX licens 10 users" → mobileAddon via /ip-?pbx/i regex
  {
    id: 'mob-43',
    name: 'IP-PBX licens i beskrivning → mobileAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (10 st)', amount: 3490 },
      { type: 'recurring_subscription', description: 'IP-PBX licens 10 users', amount: 590 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'it-tech',
    employees: 10,
    metrics: {
      mobileAddonMonthly:        590,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-44 ───────────────────────────────────────────────────────────────────
  // "Teams-integrering Business" → matches /teams[\s-]?integr/i → mobileAddon
  {
    id: 'mob-44',
    name: 'Teams-integrering Business → mobileAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (8 st)', amount: 2792 },
      { type: 'recurring_subscription', description: 'Teams-integrering Business', amount: 799 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 8,
    metrics: {
      mobileAddonMonthly:        799,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-45 ───────────────────────────────────────────────────────────────────
  // Comviq Data+Tal 5 abonnemang, ingen addon
  {
    id: 'mob-45',
    name: 'Comviq Data+Tal 5 abonnemang — inga addons',
    lineItems: [
      { type: 'recurring_subscription', description: 'Comviq Data+Tal Jobbmobil (5 st)', amount: 1245 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'bygg',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-46 ───────────────────────────────────────────────────────────────────
  // is_addon=true, desc="voip-gateway", ingen addon_type → matches /\bvoip\b/i → mobileAddon
  {
    id: 'mob-46',
    name: 'is_addon=true + desc=voip-gateway, no addon_type → mobileAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'voip-gateway enterprise', amount: 399, is_addon: true },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        399,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-47 ───────────────────────────────────────────────────────────────────
  // is_addon=true, desc="cloud-pbx enterprise" → matches /cloud[\s-]?pbx/i → mobileAddon
  {
    id: 'mob-47',
    name: 'is_addon=true + desc=cloud-pbx enterprise → mobileAddon via regex',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (8 st)', amount: 3592 },
      { type: 'recurring_subscription', description: 'cloud-pbx enterprise', amount: 1100, is_addon: true },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'it-tech',
    employees: 8,
    metrics: {
      mobileAddonMonthly:        1100,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-48 ───────────────────────────────────────────────────────────────────
  // Faktura med BARA hardware (type='hardware'), ingen recurring → alla metrics=null
  {
    id: 'mob-48',
    name: 'Bara hardware — ingen recurring → alla metrics=null',
    lineItems: [
      { type: 'hardware', description: 'iPhone 15 Pro (5 st)', amount: 49995 },
      { type: 'hardware', description: 'Skärmskydd (5 st)', amount: 750 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-49 ───────────────────────────────────────────────────────────────────
  // 2 PBX-addons (pbx+pbx), mobileAddonMonthly = 890 + 450 = 1340
  {
    id: 'mob-49',
    name: 'Två PBX-addons — mobileAddonMonthly = 1340',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (10 st)', amount: 3490 },
      { type: 'recurring_subscription', description: 'Molnväxel licens A', amount: 890, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Molnväxel licens B', amount: 450, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 10,
    metrics: {
      mobileAddonMonthly:        1340,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

  // ── mob-50 ───────────────────────────────────────────────────────────────────
  // Telenor med 0 recurring subscription men 1 one_time_fee → alla metrics=null
  {
    id: 'mob-50',
    name: 'Bara one_time_fee — alla metrics=null',
    lineItems: [
      { type: 'one_time_fee', description: 'Startpaket Telenor Business', amount: 995 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:        null,
      broadbandAddonMonthly:     null,
      primaryComponentMonthly:   null,
      secondaryComponentMonthly: null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:        null,
    },
  },

];
