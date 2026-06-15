// tests/fixtures/03-combined.mjs
// 55 fixtures for computeInvoiceMetrics + computeSecondarySaving — combined invoices
//
// Computation recap (combined / mixed=true):
//
//   recurring = lineItems where type='recurring_subscription'
//   isMobileAddon(li):
//     addon_type in {pbx,voip}  OR
//     (is_addon===true && addon_type NOT in {static_ip,firewall,sla} && desc matches MOBILE_RX)  OR
//     (is_addon!==true && desc matches MOBILE_RX)
//     MOBILE_RX = /molnväxel|cloud[\s-]?pbx|\bpbx\b|ip-?pbx|teams[\s-]?direkt|teams[\s-]?integr|pstn|\bvoip\b/i
//
//   isBroadbandAddon(li):
//     addon_type in {static_ip,firewall,sla}  OR
//     (is_addon===true && addon_type NOT in {pbx,voip} && desc matches BROADBAND_RX)  OR
//     (is_addon!==true && desc matches BROADBAND_RX)
//     BROADBAND_RX = /statisk[\s-]?ip|managed[\s-]?firewall|brandv[äa]gg|extra[\s-]?sla|sla[\s-]?uppgr|\butm\b/i
//
//   base = recurring where !isMobileAddon && !isBroadbandAddon
//
//   mixed=true, category='mobil':
//     primaryLines   = base where desc NOT matches /bredband|fiber|internet|adsl|ftth/i
//     secondaryLines = base where desc MATCHES /bredband|fiber|internet|adsl|ftth/i
//     secondaryConnectionSpeedMbit = speed from FIRST secondary line with match:
//       regex /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i, n=parseInt(m[1])
//       mbit = /gbit|gbps/i.test(m[2]) ? n*1000 : n
//       snap to [100,250,500,1000]: first t where mbit≤t, else 1000
//
//   mixed=true, category='bredband':
//     primaryLines   = base where desc NOT matches /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondaryLines = base where desc MATCHES /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondarySeatCount = secondaryLines.length (if >0)
//
//   computeSecondarySaving:
//     category='mobil' (bredband-sekundär): p25={100→3156,250→3156,500→3828,1000→4020}[speedMbit] (verifierad Tele2)
//       secAnnual=Math.round(secondaryMonthly*12), gross=Math.max(0,secAnnual-p25)
//       gross<500 → null; netSaving=Math.round(gross*0.80)
//     category='bredband': mobilP25 by segment+bucket
//       segment konsult/byraer: micro(1-9)→3588, small(10-49)→3408, mid(50-249)→3228
//       segment bygg/transport/hantverkare: micro→3588, small→3408
//       segment ehandel/tillverkning: micro→3588, small→3408, mid→3228 (tillverkning)
//       p25Total=Math.round(mobilP25*seatCount), gross=secAnnual-p25Total
//       gross<500 → null; netSaving=Math.round(gross*0.80)

export const fixtures = [

  // ════════════════════════════════════════════════════════════════════════════
  // A. primary=mobil, secondary=bredband (comb-01 – comb-30)
  // ════════════════════════════════════════════════════════════════════════════

  // ── comb-01 ──────────────────────────────────────────────────────────────────
  // TeleKom B2B full scenario:
  //   mobil 1745 + bredband "Fiber 500/500 Mbit/s" 899 + pbx 994 + static_ip 150
  //   primaryComponent=1745, secondary=899, mobileAddon=994, broadbandAddon=150
  //   speed: "500/500 Mbit/s" → n=500, mbit=500, snap 500≤500 → 500
  //   secAnnual=Math.round(899*12)=10788, p25=3828, gross=6960, net=Math.round(6960*0.80)=5568
  {
    id: 'comb-01',
    name: 'TeleKom B2B full scenario — mobil+bredband+pbx+static_ip',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500/500 Mbit/s', amount: 899 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 994, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 150, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           994,
      broadbandAddonMonthly:        150,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    899,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   10788,
      suggestedAnnual: 3828,
      grossSaving:     6960,
      netSaving:       5568,
    },
  },

  // ── comb-02 ──────────────────────────────────────────────────────────────────
  // Mobil 1745 + bredband "Bredband 250/250 Mbit/s" 549, inga addons
  //   speed: "250/250 Mbit/s" → n=250, mbit=250, snap 250≤250 → 250
  //   secAnnual=Math.round(549*12)=6588, p25=3156, gross=3432, net=Math.round(3432*0.80)=2746
  {
    id: 'comb-02',
    name: 'Mobil + bredband 250 Mbit — sekundär besparing 2746 kr/år',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 250/250 Mbit/s', amount: 549 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    549,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   6588,
      suggestedAnnual: 3156,
      grossSaving:     3432,
      netSaving:       2746,
    },
  },

  // ── comb-03 ──────────────────────────────────────────────────────────────────
  // Mobil 1745 + bredband "Fiber 100/100 Mbit/s" 350, inga addons
  //   speed=100, secAnnual=Math.round(350*12)=4200, p25=3156, gross=1044 ≥ 500, net=Math.round(1044*0.80)=835
  {
    id: 'comb-03',
    name: 'Mobil + bredband 100 Mbit 350 kr/mån — gross=1044 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 100/100 Mbit/s', amount: 350 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    350,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   4200,
      suggestedAnnual: 3156,
      grossSaving:     1044,
      netSaving:       835,
    },
  },

  // ── comb-04 ──────────────────────────────────────────────────────────────────
  // Mobil 1745 + bredband "Fiber 1000/1000 Mbit/s" 849, ingen addon
  //   speed: "1000/1000 Mbit/s" → n=1000, mbit=1000, snap 1000≤1000 → 1000
  //   secAnnual=Math.round(849*12)=10188, p25=4020, gross=6168, net=Math.round(6168*0.80)=4934
  {
    id: 'comb-04',
    name: 'Mobil + bredband 1000 Mbit — sekundär besparing 4934 kr/år',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 1000/1000 Mbit/s', amount: 849 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    849,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10188,
      suggestedAnnual: 4020,
      grossSaving:     6168,
      netSaving:       4934,
    },
  },

  // ── comb-05 ──────────────────────────────────────────────────────────────────
  // Mobil 3592 (8 abonnemang) + bredband "Tele2 Fiber 1000 Mbit" 799 + pbx 1490 + static_ip 149
  //   speed: "1000 Mbit" → n=1000, mbit=1000, snap 1000≤1000 → 1000
  //   secAnnual=Math.round(799*12)=9588, p25=4020, gross=5568, net=Math.round(5568*0.80)=4454
  {
    id: 'comb-05',
    name: 'Mobil 8 abonnemang + bredband 1000 Mbit + pbx + static_ip',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (8 st)', amount: 3592 },
      { type: 'recurring_subscription', description: 'Tele2 Fiber 1000 Mbit', amount: 799 },
      { type: 'recurring_subscription', description: 'Tele2 Molnväxel Pro', amount: 1490, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 8,
    metrics: {
      mobileAddonMonthly:           1490,
      broadbandAddonMonthly:        149,
      primaryComponentMonthly:      3592,
      secondaryComponentMonthly:    799,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   9588,
      suggestedAnnual: 4020,
      grossSaving:     5568,
      netSaving:       4454,
    },
  },

  // ── comb-06 ──────────────────────────────────────────────────────────────────
  // Mobil 3490 (10 abonnemang) + bredband "Telenor Fiber 500 Mbit" 749 + molnväxel 890 + static_ip 149
  //   speed: "500 Mbit" → n=500, mbit=500, snap 500≤500 → 500
  //   secAnnual=Math.round(749*12)=8988, p25=3828, gross=5160, net=Math.round(5160*0.80)=4128
  {
    id: 'comb-06',
    name: 'Mobil 10 abonnemang + bredband 500 Mbit + molnväxel + static_ip',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Smart (10 st)', amount: 3490 },
      { type: 'recurring_subscription', description: 'Telenor Fiber 500 Mbit', amount: 749 },
      { type: 'recurring_subscription', description: 'Telenor Molnväxel Business', amount: 890, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 10,
    metrics: {
      mobileAddonMonthly:           890,
      broadbandAddonMonthly:        149,
      primaryComponentMonthly:      3490,
      secondaryComponentMonthly:    749,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8988,
      suggestedAnnual: 3828,
      grossSaving:     5160,
      netSaving:       4128,
    },
  },

  // ── comb-07 ──────────────────────────────────────────────────────────────────
  // Mobil 807 (3 abonnemang) + bredband "Com Hem Fiber 250 Mbit" 549 + static_ip 99
  //   speed: "250 Mbit" → n=250, mbit=250, snap 250≤250 → 250
  //   secAnnual=Math.round(549*12)=6588, p25=3156, gross=3432, net=Math.round(3432*0.80)=2746
  {
    id: 'comb-07',
    name: 'Mobil 3 abonnemang + bredband 250 Mbit + static_ip',
    lineItems: [
      { type: 'recurring_subscription', description: 'Com Hem Mobil Jobbpaket (3 st)', amount: 807 },
      { type: 'recurring_subscription', description: 'Com Hem Fiber 250 Mbit', amount: 549 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 99, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 3,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        99,
      primaryComponentMonthly:      807,
      secondaryComponentMonthly:    549,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   6588,
      suggestedAnnual: 3156,
      grossSaving:     3432,
      netSaving:       2746,
    },
  },

  // ── comb-08 ──────────────────────────────────────────────────────────────────
  // Bredbandsrad matchar "internet" keyword: "Internet Fiber 500 Mbit" 699
  //   desc /internet/ → secondaryLine; speed: "500 Mbit" → n=500, snap 500≤500 → 500
  //   secAnnual=Math.round(699*12)=8388, p25=3828, gross=4560, net=Math.round(4560*0.80)=3648
  {
    id: 'comb-08',
    name: '"internet" keyword triggar secondaryLine — bredband 500 Mbit',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Internet Fiber 500 Mbit', amount: 699 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8388,
      suggestedAnnual: 3828,
      grossSaving:     4560,
      netSaving:       3648,
    },
  },

  // ── comb-09 ──────────────────────────────────────────────────────────────────
  // Bredbandsrad matchar "ftth": "FTTH Gigabit 1000 Mbit" 995
  //   desc /ftth/ → secondaryLine; speed: "1000 Mbit" → n=1000, snap 1000≤1000 → 1000
  //   secAnnual=Math.round(995*12)=11940, p25=4020, gross=7920, net=Math.round(7920*0.80)=6336
  {
    id: 'comb-09',
    name: '"ftth" keyword triggar secondaryLine — bredband 1000 Mbit',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'FTTH Gigabit 1000 Mbit', amount: 995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   11940,
      suggestedAnnual: 4020,
      grossSaving:     7920,
      netSaving:       6336,
    },
  },

  // ── comb-10 ──────────────────────────────────────────────────────────────────
  // Bredbandsrad matchar "adsl": "ADSL 50 Mbit anslutning" 249
  //   desc /adsl/ → secondaryLine; speed: "50 Mbit" → n=50, mbit=50, snap 50≤100 → 100
  //   secAnnual=Math.round(249*12)=2988, p25=3156, gross=max(0,2988-3156)=0 → secondary=null
  {
    id: 'comb-10',
    name: '"adsl" keyword + låg hastighet snappas till 100 Mbit — under p25 → secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'ADSL 50 Mbit anslutning', amount: 249 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    249,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-11 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband utan hastighetsbeskrivning "Bredband Företag" 699
  //   desc /bredband/ → secondaryLine; speed-regex hittar inget → secondaryConnectionSpeedMbit=null
  //   → secondary=null (ingen speed → kan ej benchmarka)
  {
    id: 'comb-11',
    name: 'Bredband utan hastighetsbeskrivning — speedMbit=null → secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband Företag', amount: 699 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-12 ──────────────────────────────────────────────────────────────────
  // Mobil + 2 separata bredbandsrader (2 kontor):
  //   "Fiber 500 Mbit kontor 1" 699 + "Fiber 500 Mbit kontor 2" 699
  //   secondaryComponentMonthly=1398, speed extraheras från FÖRSTA raden: 500
  //   secAnnual=Math.round(1398*12)=16776, p25=3828, gross=12948, net=Math.round(12948*0.80)=10358
  {
    id: 'comb-12',
    name: 'Mobil + 2 bredbandsrader (2 kontor) — sekundär summeras, speed från första',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit kontor 1', amount: 699 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit kontor 2', amount: 699 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    1398,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   16776,
      suggestedAnnual: 3828,
      grossSaving:     12948,
      netSaving:       10358,
    },
  },

  // ── comb-13 ──────────────────────────────────────────────────────────────────
  // Mobil med PBX + bredband UNDER benchmark: "Bredband 100 Mbit" 300 kr
  //   speed=100, secAnnual=Math.round(300*12)=3600, p25=3156, gross=444 < 500 → secondary=null
  {
    id: 'comb-13',
    name: 'Mobil + PBX + bredband 100 Mbit under p25 — secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 890, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Bredband 100 Mbit', amount: 300 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           890,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    300,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-14 ──────────────────────────────────────────────────────────────────
  // Bredbandsrad ÄR en addon (addon_type='static_ip') → klassas som broadbandAddon, INTE secondaryLine
  //   base = recurring där ej addon → bara mobil-raden (1745)
  //   secondaryLines = base där /bredband|fiber|internet|adsl|ftth/ → ingen match → null
  //   secondaryComponentMonthly=null, broadbandAddon=150
  {
    id: 'comb-14',
    name: 'Bredbandsrad med addon_type=static_ip klassas som broadbandAddon — EJ secondaryLine',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit dedikerat', amount: 150, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        150,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-15 ──────────────────────────────────────────────────────────────────
  // Mobil med "cloud-PBX" addon + "Fiber 500 Mbit" bredband
  //   "cloud-PBX" matchar /cloud[\s-]?pbx/i → mobileAddon via desc-regex (is_addon omitted)
  //   "Fiber 500 Mbit" → secondaryLine, speed=500
  //   secAnnual=Math.round(749*12)=8988, p25=3828, gross=5160, net=4128
  {
    id: 'comb-15',
    name: 'cloud-PBX addon (desc-regex) + Fiber 500 Mbit bredband',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business Smart (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'cloud-PBX standard', amount: 890 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 749 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           890,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    749,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8988,
      suggestedAnnual: 3828,
      grossSaving:     5160,
      netSaving:       4128,
    },
  },

  // ── comb-16 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bahnhof Fiber 1 Gbit" 995
  //   speed: "1 Gbit" → n=1, isGbit=true, mbit=1*1000=1000, snap 1000≤1000 → 1000
  //   secAnnual=Math.round(995*12)=11940, p25=4020, gross=7920, net=Math.round(7920*0.80)=6336
  {
    id: 'comb-16',
    name: 'Bahnhof Fiber 1 Gbit — Gbit-enhet ger mbit=1000',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bahnhof Fiber 1 Gbit', amount: 995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   11940,
      suggestedAnnual: 4020,
      grossSaving:     7920,
      netSaving:       6336,
    },
  },

  // ── comb-17 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bredband 300/300 Mbit" 599
  //   CROSS_CATEGORY_RX[mobil]=/bredband|.../i → "Bredband" matches → secondaryLine
  //   speed: "300/300 Mbit" → n=300, mbit=300, snap: 300>250, 300≤500 → 500
  //   secAnnual=Math.round(599*12)=7188, p25=3828, gross=3360 ≥ 500, net=Math.round(3360*0.80)=2688
  {
    id: 'comb-17',
    name: 'Bredband 300 Mbit snappas till 500 — gross=3360 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 300/300 Mbit', amount: 599 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    599,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   7188,
      suggestedAnnual: 3828,
      grossSaving:     3360,
      netSaving:       2688,
    },
  },

  // ── comb-18 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Fiber 499 Mbit" 620
  //   speed: "499 Mbit" → n=499, mbit=499, snap: 499>250, 499≤500 → 500
  //   secAnnual=Math.round(620*12)=7440, p25=3828, gross=3612 ≥ 500, net=Math.round(3612*0.80)=2890
  {
    id: 'comb-18',
    name: 'Fiber 499 Mbit snappas till 500 — gross=3612 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 499 Mbit', amount: 620 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    620,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   7440,
      suggestedAnnual: 3828,
      grossSaving:     3612,
      netSaving:       2890,
    },
  },

  // ── comb-19 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Fiber 501 Mbit" 850
  //   speed: "501 Mbit" → n=501, mbit=501, snap: 501>500, 501≤1000 → 1000
  //   secAnnual=Math.round(850*12)=10200, p25=4020, gross=6180 ≥ 500, net=Math.round(6180*0.80)=4944
  {
    id: 'comb-19',
    name: 'Fiber 501 Mbit snappas till 1000 — gross=6180 → net 4944',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 501 Mbit', amount: 850 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    850,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10200,
      suggestedAnnual: 4020,
      grossSaving:     6180,
      netSaving:       4944,
    },
  },

  // ── comb-20 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bredband 500 Mbit" 642 kr/mån:
  //   secAnnual=Math.round(642*12)=7704, p25=3828, gross=3876 ≥ 500
  //   net=Math.round(3876*0.80)=3101
  {
    id: 'comb-20',
    name: 'Bredband 500 Mbit 642 kr/mån — gross=3876 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 642 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    642,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   7704,
      suggestedAnnual: 3828,
      grossSaving:     3876,
      netSaving:       3101,
    },
  },

  // ── comb-21 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bredband 500 Mbit" 600 kr
  //   secAnnual=Math.round(600*12)=7200, p25=3828, gross=3372 ≥ 500, net=Math.round(3372*0.80)=2698
  {
    id: 'comb-21',
    name: 'Bredband 500 Mbit 600 kr/mån — gross=3372 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 600 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    600,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   7200,
      suggestedAnnual: 3828,
      grossSaving:     3372,
      netSaving:       2698,
    },
  },

  // ── comb-22 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bredband 500 Mbit" 641 kr/mån:
  //   secAnnual=Math.round(641*12)=7692, p25=3828, gross=3864 ≥ 500, net=Math.round(3864*0.80)=3091
  {
    id: 'comb-22',
    name: 'Bredband 500 Mbit 641 kr/mån — gross=3864 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 641 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    641,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   7692,
      suggestedAnnual: 3828,
      grossSaving:     3864,
      netSaving:       3091,
    },
  },

  // ── comb-23 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband men mixed=false → primary/secondary components=null, secondary=null
  {
    id: 'comb-23',
    name: 'Mobil + bredband med mixed=false — primär/sekundär components null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 899 },
    ],
    category: 'mobil',
    mixed: false,
    industry: 'konsult',
    employees: 5,
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

  // ── comb-24 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Fiber 1 Gbit" 995
  //   CROSS_CATEGORY_RX[mobil]=/fiber|.../i → "Fiber" matches → secondaryLine
  //   regex /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i på "1 Gbit": m[1]="1", isGbit=true → mbit=1000
  //   snap 1000≤1000 → 1000
  //   secAnnual=Math.round(995*12)=11940, p25=4020, gross=7920, net=6336
  //   NOTE: "1.0 Gbit" would NOT work — regex matches "0 Gbit" (decimal part) → mbit=0→100
  {
    id: 'comb-24',
    name: '"Fiber 1 Gbit" — m[1]="1", isGbit=true → mbit=1000',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 1 Gbit', amount: 995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   11940,
      suggestedAnnual: 4020,
      grossSaving:     7920,
      netSaving:       6336,
    },
  },

  // ── comb-25 ──────────────────────────────────────────────────────────────────
  // Kombination med ENBART addon-rader (pbx+static_ip), ingen bas-SIM, ingen bas-bredband
  //   base = recurring där ej addon → tomt
  //   primaryComponent=null, secondaryComponent=null, mobileAddon=994, broadbandAddon=150
  {
    id: 'comb-25',
    name: 'Enbart addon-rader (pbx+static_ip) — primary=null, secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 994, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 150, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           994,
      broadbandAddonMonthly:        150,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-26 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "GlobalConnect fiber 10 Gbit dedikerad" 4995
  //   CROSS_CATEGORY_RX[mobil]=/fiber|.../i → "fiber" matches → secondaryLine
  //   speed: "10 Gbit" → n=10, isGbit=true, mbit=10*1000=10000
  //   snap: 10000>1000 → default 1000 (cap)
  //   secAnnual=Math.round(4995*12)=59940, p25=4020, gross=55920, net=Math.round(55920*0.80)=44736
  {
    id: 'comb-26',
    name: 'GlobalConnect fiber 10 Gbit — mbit=10000 > 1000 snappas till 1000 (cap)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'GlobalConnect fiber 10 Gbit dedikerad', amount: 4995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    4995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   59940,
      suggestedAnnual: 4020,
      grossSaving:     55920,
      netSaving:       44736,
    },
  },

  // ── comb-27 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "ADSL 100 Mbit/s" — matchar /adsl/i → secondaryLine
  //   speed: "100 Mbit/s" → n=100, mbit=100, snap 100≤100 → 100
  //   secAnnual=Math.round(399*12)=4788, p25=3156, gross=1632, net=Math.round(1632*0.80)=1306
  {
    id: 'comb-27',
    name: '"ADSL 100 Mbit/s" matchar /adsl/ + speed=100',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'ADSL 100 Mbit/s', amount: 399 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    399,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   4788,
      suggestedAnnual: 3156,
      grossSaving:     1632,
      netSaving:       1306,
    },
  },

  // ── comb-28 ──────────────────────────────────────────────────────────────────
  // Mobil med rörliga kostnader (variable_usage) + bredband — rörliga ignoreras
  //   recurring = bara recurring_subscription rader
  //   primaryComponent = bara mobil-raden (1745), secondary = bredband-raden (699)
  {
    id: 'comb-28',
    name: 'variable_usage ignoreras — bara recurring_subscription ingår i metrics',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'variable_usage', description: 'Roaming EU', amount: 450 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8388,
      suggestedAnnual: 3828,
      grossSaving:     4560,
      netSaving:       3648,
    },
  },

  // ── comb-29 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband + TV-tjänst "Tele2 Play TV" 99 kr
  //   "Tele2 Play TV" matchar INTE /bredband|fiber|internet|adsl|ftth/ → primaryLine
  //   primaryComponent = 1745 + 99 = 1844, secondary = 899 (Fiber 500 Mbit)
  {
    id: 'comb-29',
    name: 'TV-tjänst matchar EJ sekundär-regex → hamnar i primaryLines',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 899 },
      { type: 'recurring_subscription', description: 'Tele2 Play TV', amount: 99 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1844,
      secondaryComponentMonthly:    899,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   10788,
      suggestedAnnual: 3828,
      grossSaving:     6960,
      netSaving:       5568,
    },
  },

  // ── comb-30 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Internetanslutning 500 Mbit" — matchar /internet/i → secondaryLine
  //   speed: "500 Mbit" → n=500, mbit=500, snap 500≤500 → 500
  //   secAnnual=Math.round(799*12)=9588, p25=3828, gross=5760, net=Math.round(5760*0.80)=4608
  {
    id: 'comb-30',
    name: '"Internetanslutning 500 Mbit" matchar /internet/ → secondaryLine, speed=500',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Internetanslutning 500 Mbit', amount: 799 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    799,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   9588,
      suggestedAnnual: 3828,
      grossSaving:     5760,
      netSaving:       4608,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // B. primary=bredband, secondary=mobil (comb-31 – comb-45)
  // ════════════════════════════════════════════════════════════════════════════

  // ── comb-31 ──────────────────────────────────────────────────────────────────
  // Bredband 500 Mbit 699 + mobilabonnemang 3 st 1047
  //   category='bredband', mixed=true, industry=konsult, employees=5
  //   primaryLines = base där EJ /sim|mobilabonnemang|mobiltelefoni/ → bredbandsraden (699)
  //   secondaryLines = base där /sim|mobilabonnemang|mobiltelefoni/ → mobil-raden (1047)
  //   secondarySeatCount = 1 (en rad)
  //   secAnnual=Math.round(1047*12)=12564
  //   segment=konsult, bucket=micro(1-9) → mobilP25=2868, p25Total=2868*1=2868
  //   gross=12564-2868=9696, net=Math.round(9696*0.80)=7757
  {
    id: 'comb-31',
    name: 'Bredband primary + mobilabonnemang sekundär — konsult micro, 1 rad',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'Mobilabonnemang Jobbmobil (3 st)', amount: 1047 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    1047,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   12564,
      suggestedAnnual: 2868,
      grossSaving:     9696,
      netSaving:       7757,
    },
  },

  // ── comb-32 ──────────────────────────────────────────────────────────────────
  // Bredband 1000 Mbit 849 + "SIM-kort Business (5 st)" 1794
  //   "SIM-kort" matchar /\bsim\b/ → secondaryLine, secondarySeatCount=1 (en rad)
  //   secAnnual=Math.round(1794*12)=21528
  //   segment=konsult, bucket=micro → mobilP25=2868, p25Total=2868*1=2868
  //   gross=21528-2868=18660, net=Math.round(18660*0.80)=14928
  {
    id: 'comb-32',
    name: 'Bredband 1000 Mbit + SIM-kort rad (matchar /sim/) — seatCount=1 (en rad)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bredband 1000 Mbit', amount: 849 },
      { type: 'recurring_subscription', description: 'SIM-kort Business (5 st)', amount: 1794 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      849,
      secondaryComponentMonthly:    1794,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   21528,
      suggestedAnnual: 2868,
      grossSaving:     18660,
      netSaving:       14928,
    },
  },

  // ── comb-33 ──────────────────────────────────────────────────────────────────
  // Bredband 500 Mbit + mobiltelefoni 1 abonnemang 349 — matchar /mobiltelefoni/
  //   secondarySeatCount=1, secAnnual=Math.round(349*12)=4188
  //   segment=konsult, bucket=micro → mobilP25=2868, p25Total=2868*1=2868
  //   gross=4188-2868=1320, net=Math.round(1320*0.80)=1056
  {
    id: 'comb-33',
    name: '"mobiltelefoni" matchar sekundär-regex — 1 abonnemang, gross=1320, net=1056',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobiltelefoni Business', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    349,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   4188,
      suggestedAnnual: 2868,
      grossSaving:     1320,
      netSaving:       1056,
    },
  },

  // ── comb-34 ──────────────────────────────────────────────────────────────────
  // Bredband + "mobilabonnemang" radtext, industry=bygg (→hantverkare), employees=3
  //   secondarySeatCount=1, secAnnual=Math.round(399*12)=4788
  //   segment=hantverkare, bucket=micro(1-9) → mobilP25=2868, p25Total=2868*1=2868
  //   gross=4788-2868=1920, net=Math.round(1920*0.80)=1536
  {
    id: 'comb-34',
    name: '"mobilabonnemang" matchar + bygg-segment — hantverkare micro p25=2868',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 399 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'bygg',
    employees: 3,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    399,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   4788,
      suggestedAnnual: 2868,
      grossSaving:     1920,
      netSaving:       1536,
    },
  },

  // ── comb-35 ──────────────────────────────────────────────────────────────────
  // Bredband + mobilabonnemang 2 rader (2×349=698 kr/mån) → secondarySeatCount=2
  //   secAnnual=Math.round(698*12)=8376
  //   segment=konsult, bucket=micro → mobilP25=2868, p25Total=2868*2=5736
  //   gross=8376-5736=2640, net=Math.round(2640*0.80)=2112
  {
    id: 'comb-35',
    name: 'Bredband + 2 mobilrader — secondarySeatCount=2, gross=2640, net=2112',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Jobbmobil 1', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Jobbmobil 2', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    698,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           2,
    },
    secondary: {
      category:        'mobil',
      seatCount:       2,
      currentAnnual:   8376,
      suggestedAnnual: 5736,
      grossSaving:     2640,
      netSaving:       2112,
    },
  },

  // ── comb-36 ──────────────────────────────────────────────────────────────────
  // Bredband + mobil UNDER p25: 1 mobilabonnemang 249 kr/mån
  //   secAnnual=Math.round(249*12)=2988, mobilP25=2868, p25Total=2868*1=2868
  //   gross=2988-2868=120 < 500 → secondary=null
  {
    id: 'comb-36',
    name: 'Mobilabonnemang 249 kr/mån under p25 — gross=0 → secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business S', amount: 249 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    249,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: null,
  },

  // ── comb-37 ──────────────────────────────────────────────────────────────────
  // Bredband + mobil 340 kr/mån (1 rad) → secondarySeatCount=1
  //   p25Total=2868*1=2868, secAnnual=Math.round(340*12)=4080
  //   gross=4080-2868=1212 ≥ 500 → secondary satt, net=Math.round(1212*0.80)=970
  {
    id: 'comb-37',
    name: 'Mobil sekundär 340 kr/mån — gross=1212 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 340 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    340,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   4080,
      suggestedAnnual: 2868,
      grossSaving:     1212,
      netSaving:       970,
    },
  },

  // ── comb-38 ──────────────────────────────────────────────────────────────────
  // Bredband + mobil 341 kr/mån (1 rad) → secondarySeatCount=1
  //   p25Total=2868*1=2868, secAnnual=Math.round(341*12)=4092
  //   gross=4092-2868=1224 ≥ 500 → secondary satt, net=Math.round(1224*0.80)=979
  {
    id: 'comb-38',
    name: 'Mobil sekundär 341 kr/mån — gross=1224 ≥ 500 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 341 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    341,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   4092,
      suggestedAnnual: 2868,
      grossSaving:     1224,
      netSaving:       979,
    },
  },

  // ── comb-39 ──────────────────────────────────────────────────────────────────
  // Bredband + 10 SIM-kort (10 rader), industry=tillverkning, employees=15
  //   secondarySeatCount=10 (10 rader)
  //   segment=tillverkning, mobilP25=2868 (flat matrix)
  //   secAnnual=Math.round(3490*12)=41880
  //   p25Total=2868*10=28680, gross=41880-28680=13200, net=Math.round(13200*0.80)=10560
  {
    id: 'comb-39',
    name: 'Bredband + 10 SIM-rader, tillverkning small bucket — p25=2868×10=28680',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 1', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 2', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 3', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 4', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 5', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 6', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 7', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 8', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 9', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 10', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'tillverkning',
    employees: 15,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    3490,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           10,
    },
    secondary: {
      category:        'mobil',
      seatCount:       10,
      currentAnnual:   41880,
      suggestedAnnual: 28680,
      grossSaving:     13200,
      netSaving:       10560,
    },
  },

  // ── comb-40 ──────────────────────────────────────────────────────────────────
  // Bredband combined men NO matching secondary desc → secondarySeatCount=null → secondary=null
  //   base har "IP-telefon hyra" 99 kr som INTE matchar /sim|mobilabonnemang|mobiltelefoni/
  {
    id: 'comb-40',
    name: 'Bredband + "IP-telefon hyra" matchar EJ sekundär-regex — secondarySeatCount=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'IP-telefon hyra', amount: 99 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      798,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-41 ──────────────────────────────────────────────────────────────────
  // Bredband + static_ip addon + mobilabonnemang sekundär
  //   static_ip → broadbandAddon (ej base), mobilabonnemang → secondaryLine
  //   secAnnual=Math.round(699*12)=8388, p25Total=2868*1=2868
  //   gross=8388-2868=5520, net=Math.round(5520*0.80)=4416
  {
    id: 'comb-41',
    name: 'Bredband + static_ip addon + mobilabonnemang sekundär — broadbandAddon korrekt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business (2 st)', amount: 699 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        149,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   8388,
      suggestedAnnual: 2868,
      grossSaving:     5520,
      netSaving:       4416,
    },
  },

  // ── comb-42 ──────────────────────────────────────────────────────────────────
  // Bredband + firewall + SLA addons + mobilabonnemang sekundär
  //   broadbandAddon = firewall(299) + sla(199) = 498
  //   mobilabonnemang → secondaryLine, secondarySeatCount=1
  //   secAnnual=Math.round(698*12)=8376, p25Total=2868*1=2868
  //   gross=8376-2868=5508, net=Math.round(5508*0.80)=4406
  {
    id: 'comb-42',
    name: 'Bredband + firewall + SLA addons — broadbandAddon=498, mobil sekundär',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'Managed Firewall', amount: 299, is_addon: true, addon_type: 'firewall' },
      { type: 'recurring_subscription', description: 'SLA-uppgradering Premium', amount: 199, is_addon: true, addon_type: 'sla' },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 698 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        498,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    698,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   8376,
      suggestedAnnual: 2868,
      grossSaving:     5508,
      netSaving:       4406,
    },
  },

  // ── comb-43 ──────────────────────────────────────────────────────────────────
  // Bredband + mobilabonnemang men mixed=false → secondarySeatCount=null, secondary=null
  {
    id: 'comb-43',
    name: 'Bredband + mobilabonnemang med mixed=false — secondarySeatCount=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 699 },
    ],
    category: 'bredband',
    mixed: false,
    industry: 'konsult',
    employees: 5,
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

  // ── comb-44 ──────────────────────────────────────────────────────────────────
  // Bredband + 50 mobilabonnemang "SIM-kort 50 st" som EN rad 17940 kr/mån
  //   secondarySeatCount=1 (en rad, inte 50 — seatCount är antal RADER)
  //   secAnnual=Math.round(17940*12)=215280
  //   segment=konsult, bucket=micro → mobilP25=2868, p25Total=2868*1=2868
  //   gross=215280-2868=212412, net=Math.round(212412*0.80)=169930
  {
    id: 'comb-44',
    name: 'SIM-kort 50 st som EN rad — seatCount=1 (antal rader, ej antal SIM)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'SIM-kort 50 st Business', amount: 17940 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    17940,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   215280,
      suggestedAnnual: 2868,
      grossSaving:     212412,
      netSaving:       169930,
    },
  },

  // ── comb-45 ──────────────────────────────────────────────────────────────────
  // Bredband combined, industry=ehandel, bucket=micro, 3 SIM-rader
  //   secondarySeatCount=3
  //   secAnnual=Math.round(1047*12)=12564
  //   segment=ehandel, bucket=micro → mobilP25=2868, p25Total=2868*3=8604
  //   gross=12564-8604=3960, net=Math.round(3960*0.80)=3168
  {
    id: 'comb-45',
    name: 'Bredband combined, industry=ehandel, 3 SIM-rader — p25=2868×3=8604',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 1', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 2', amount: 349 },
      { type: 'recurring_subscription', description: 'SIM-kort Jobbmobil 3', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'ehandel',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      699,
      secondaryComponentMonthly:    1047,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           3,
    },
    secondary: {
      category:        'mobil',
      seatCount:       3,
      currentAnnual:   12564,
      suggestedAnnual: 8604,
      grossSaving:     3960,
      netSaving:       3168,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // C. Fällor och gränsfall (comb-46 – comb-55)
  // ════════════════════════════════════════════════════════════════════════════

  // ── comb-46 ──────────────────────────────────────────────────────────────────
  // Mobil där INGA base-rader finns — pbx(addon) + static_ip(addon), inga bas-rader
  //   base = recurring där ej addon → tomt
  //   primaryComponent=null, secondaryComponent=null
  //   mobileAddon=994 (pbx via addon_type), broadbandAddon=150 (static_ip via addon_type)
  {
    id: 'comb-46',
    name: 'Fälla: ENBART addon-rader (pbx+static_ip) — primary=null, secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 994, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 150, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           994,
      broadbandAddonMonthly:        150,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-47 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband där bredbandsraden av misstag har is_addon=true men EJ broadband addon_type
  //   Rad: {desc:"Fiber 500 Mbit", amount:699, is_addon:true, addon_type:null}
  //   isBroadbandAddon check:
  //     - addon_type in {static_ip,firewall,sla}? → null, NEJ
  //     - is_addon===true && addon_type NOT in {pbx,voip} && desc matches BB_RX? → null NOT in {pbx,voip}=true, "Fiber 500 Mbit" matchar EJ BB_RX → NEJ
  //     - is_addon!==true && desc matches BB_RX? → false (is_addon=true) → NEJ
  //   isMobileAddon check: desc "Fiber 500 Mbit" matchar EJ MOBILE_RX → NEJ
  //   → hamnar i BASE → desc matchar /fiber/ → secondaryLine ✓
  //   speed=500, secAnnual=Math.round(699*12)=8388, p25=3828, gross=4560, net=3648
  {
    id: 'comb-47',
    name: 'Fälla: is_addon=true men EJ broadband addon_type → hamnar i base → secondaryLine',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699, is_addon: true, addon_type: null },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8388,
      suggestedAnnual: 3828,
      grossSaving:     4560,
      netSaving:       3648,
    },
  },

  // ── comb-48 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband "Bredband" utan siffra + "Fiber 500 Mbit" — BÅDA secondaryLines
  //   "Bredband" matchar /bredband/ → secondaryLine men ingen hastighetsinfo
  //   "Fiber 500 Mbit" matchar /fiber/ → secondaryLine, speed=500
  //   speed extraheras iterativt från första raden med match: "Bredband" → null, "Fiber 500 Mbit" → 500
  //   secondaryComponentMonthly = 699 + 799 = 1498
  //   secAnnual=Math.round(1498*12)=17976, p25=3828, gross=14148, net=Math.round(14148*0.80)=11318
  {
    id: 'comb-48',
    name: 'Fälla: 2 secondaryLines — "Bredband" ingen hastighet, "Fiber 500 Mbit" → speed=500',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband Business', amount: 699 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit backup', amount: 799 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    1498,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   17976,
      suggestedAnnual: 3828,
      grossSaving:     14148,
      netSaving:       11318,
    },
  },

  // ── comb-49 ──────────────────────────────────────────────────────────────────
  // Mobil + bredband desc="fiber optic 1 Gbps" → /gbps/i matchar → isGbit=true → mbit=1000
  //   speed: "1 Gbps" → n=1, /gbps/i → isGbit=true, mbit=1*1000=1000, snap 1000≤1000 → 1000
  //   secAnnual=Math.round(995*12)=11940, p25=4020, gross=7920, net=6336
  {
    id: 'comb-49',
    name: 'Fälla: "fiber optic 1 Gbps" — /gbps/ matchar som Gbit → mbit=1000',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'fiber optic 1 Gbps', amount: 995 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    995,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   11940,
      suggestedAnnual: 4020,
      grossSaving:     7920,
      netSaving:       6336,
    },
  },

  // ── comb-50 ──────────────────────────────────────────────────────────────────
  // Kombinerad faktura med NEGATIVA belopp (kredit):
  //   "Mobil abonnemang" 1745 + "Kreditering Mobil" -300 → primaryComponent = 1745+(-300) = 1445
  //   "Bredband Fiber 500 Mbit" 699 → secondaryComponent = 699
  //   secAnnual=Math.round(699*12)=8388, p25=3828, gross=4560, net=3648
  {
    id: 'comb-50',
    name: 'Fälla: negativa belopp (kredit) — primaryComponent=1445 efter summering',
    lineItems: [
      { type: 'recurring_subscription', description: 'Mobil abonnemang Business (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Kreditering Mobil feldebitering', amount: -300 },
      { type: 'recurring_subscription', description: 'Bredband Fiber 500 Mbit', amount: 699 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1445,
      secondaryComponentMonthly:    699,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   8388,
      suggestedAnnual: 3828,
      grossSaving:     4560,
      netSaving:       3648,
    },
  },

  // ── comb-51 ──────────────────────────────────────────────────────────────────
  // Mobil + rad som matchar BÅDE primär OCH sekundär regex:
  //   "Mobilabonnemang och Bredbandspaket" 1199
  //   category='mobil': primaryFilter = EJ /bredband|fiber|internet|adsl|ftth/ → "bredband" matchar → EXCLUDED from primary
  //   secondaryFilter = /bredband|fiber|internet|adsl|ftth/ → "bredband" matchar → INCLUDED in secondary
  //   → Raden hamnar i secondary
  //   speed: "Mobilabonnemang och Bredbandspaket" → ingen hastighetsinfo → speedMbit=null → secondary=null
  {
    id: 'comb-51',
    name: 'Fälla: rad matchar BÅDE primär OCH sekundär regex — hamnar i secondary (ej primary)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (3 st)', amount: 1047 },
      { type: 'recurring_subscription', description: 'Mobilabonnemang och Bredbandspaket', amount: 1199 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1047,
      secondaryComponentMonthly:    1199,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-52 ──────────────────────────────────────────────────────────────────
  // primary=mobil, PBX-rad (addon) PLUS bredbandsrad (base) — korrekt separation
  //   pbx → mobileAddon (ej base), bredband → secondaryLine
  //   primaryComponent = mobilrad (1745), secondary = bredbandsrad (799)
  //   mobileAddon=890, broadbandAddon=null
  //   secAnnual=Math.round(799*12)=9588, p25=3828, gross=5760, net=Math.round(5760*0.80)=4608
  {
    id: 'comb-52',
    name: 'Fälla: PBX-addon (mobileAddon) + bredbandsrad (secondary) — korrekt separation',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 890, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit kontor', amount: 799 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           890,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    799,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   9588,
      suggestedAnnual: 3828,
      grossSaving:     5760,
      netSaving:       4608,
    },
  },

  // ── comb-53 ──────────────────────────────────────────────────────────────────
  // primary=mobil combined med 3 sekundärrader (3 fiber-abonnemang)
  //   secondaryComponentMonthly = 699+699+799 = 2197
  //   speed extraheras från FÖRSTA sekundärraden: "Fiber 500 Mbit kontor 1" → 500
  //   secAnnual=Math.round(2197*12)=26364, p25=3828, gross=22536, net=Math.round(22536*0.80)=18029
  {
    id: 'comb-53',
    name: 'Fälla: 3 sekundärrader — secondary summeras, speed från FÖRSTA raden',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit kontor 1', amount: 699 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit kontor 2', amount: 699 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit kontor 3', amount: 799 },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    2197,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   26364,
      suggestedAnnual: 3828,
      grossSaving:     22536,
      netSaving:       18029,
    },
  },

  // ── comb-54 ──────────────────────────────────────────────────────────────────
  // primary=bredband combined men secondaryLines har 0 matchningar → secondarySeatCount=null
  //   base-rader matchar EJ /sim|mobilabonnemang|mobiltelefoni/ → ingen sekundär
  {
    id: 'comb-54',
    name: 'Fälla: bredband combined, inga secondaryLines → secondarySeatCount=null, secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 699 },
      { type: 'recurring_subscription', description: 'IP-telefoni Företag', amount: 199 },
      { type: 'recurring_subscription', description: 'Konferenstjänst Business', amount: 149 },
    ],
    category: 'bredband',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1047,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── comb-55 ──────────────────────────────────────────────────────────────────
  // Kombinerad full-stack verifikationsscenario (identisk med comb-01):
  //   mobil 1745 + pbx 994 (addon) + bredband 500 Mbit 899 (secondary) + static_ip 149 (broadbandAddon)
  //   primaryComponent=1745, mobileAddon=994, broadbandAddon=149, secondary=899, speed=500
  //   secAnnual=Math.round(899*12)=10788, p25=3828, gross=6960, net=Math.round(6960*0.80)=5568
  {
    id: 'comb-55',
    name: 'Full-stack verifikationsscenario TeleKom B2B — primary=1745, addon=994+149, secondary=899',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil XL (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 994, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 899 },
      { type: 'recurring_subscription', description: 'Statisk IP-adress', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: true,
    industry: 'konsult',
    employees: 5,
    metrics: {
      mobileAddonMonthly:           994,
      broadbandAddonMonthly:        149,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    899,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       500,
      currentAnnual:   10788,
      suggestedAnnual: 3828,
      grossSaving:     6960,
      netSaving:       5568,
    },
  },

];
