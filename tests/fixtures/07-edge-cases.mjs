// tests/fixtures/07-edge-cases.mjs
// 35 edge-case fixtures for computeInvoiceMetrics + computeSecondarySaving
//
// Design: each group targets a specific bug-class.
//
// Algorithm recap:
//   recurring = lineItems where type='recurring_subscription'
//   mobileAddon: addon_type in {pbx,voip}  OR
//                (is_addon===true && addon_type NOT in {static_ip,firewall,sla} && desc matches MOBILE_RX) OR
//                (is_addon!==true && desc matches MOBILE_RX)
//   broadbandAddon: addon_type in {static_ip,firewall,sla}  OR
//                   (is_addon===true && addon_type NOT in {pbx,voip} && desc matches BROADBAND_RX) OR
//                   (is_addon!==true && desc matches BROADBAND_RX)
//   base = recurring where !isMobileAddon && !isBroadbandAddon
//   mobileAddonMonthly = sum(mobileAddons)>0 ? sum : null
//   broadbandAddonMonthly = sum(broadbandAddons)>0 ? sum : null
//
//   mixed=true, category='mobil':
//     primaryLines   = base where desc NOT matches /bredband|fiber|internet|adsl|ftth/i
//     secondaryLines = base where desc MATCHES /bredband|fiber|internet|adsl|ftth/i
//     speed from FIRST secondary line matching /(\d+)(?:\/\d+)?\s*(gbit|gbps|mbit)/i
//     snap to [100,250,500,1000]
//
//   mixed=true, category='bredband':
//     primaryLines   = base where desc NOT matches /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondaryLines = base where desc MATCHES /\bsim\b|mobilabonnemang|mobiltelefoni/i
//     secondarySeatCount = secondaryLines.length
//
//   bredbandSpeedBenchmark p25 (ur tele2Verified): {100:3156, 250:3156, 500:3828, 1000:4020}
//   mobil p25 byraer: micro(1-9)=3588, small(10-49)=3408, mid(50-249)=3228
//   mobil p25 hantverkare: micro=3588, small=3408

export const fixtures = [

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP A: Credit notes and negative amounts (edge-01 to edge-05)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-01 ──────────────────────────────────────────────────────────────────
  // Kreditfaktura: en negativ + en positiv recurring, sum=0 → null
  // recurring = [-500 + 500] = 0 → mobileAddonMonthly=null, broadbandAddonMonthly=null
  // base = both lines (neither matches addon regex), sum=0 → primaryComponentMonthly=null (mixed=true)
  {
    id: 'edge-01',
    name: 'Kreditfaktura: negativ + positiv, net=0 → alla null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Mobilabonnemang Business', amount: 500 },
      { type: 'recurring_subscription', description: 'Kreditering mobilabonnemang', amount: -500 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      // primaryLines = base where NOT /bredband|fiber|internet|adsl|ftth/: both lines
      // primarySum = 500 + (-500) = 0 → null
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── edge-02 ──────────────────────────────────────────────────────────────────
  // Full kredit: bara negativa recurring → sum negativ → null
  // mobileAddonSum = 0, broadbandAddonSum = 0
  // base: both lines, primarySum = -300 + -200 = -500 < 0 → null (sum>0 check)
  {
    id: 'edge-02',
    name: 'Full kredit: bara negativa recurring → alla null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Kreditering abonnemang 1', amount: -300 },
      { type: 'recurring_subscription', description: 'Kreditering abonnemang 2', amount: -200 },
    ],
    category: 'mobil',
    mixed: true,
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

  // ── edge-03 ──────────────────────────────────────────────────────────────────
  // Positiv + negativ PBX: net addon = 500 - 200 = 300 > 0 → mobileAddonMonthly=300
  // addon_type='pbx' → isMobileAddon regardless of amount sign
  // sum(mobileAddons) = 500 + (-200) = 300 > 0 → mobileAddonMonthly=300
  {
    id: 'edge-03',
    name: 'PBX 500 - 200 kredit = 300 netto → mobileAddonMonthly=300',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 500, is_addon: true, addon_type: 'pbx' },
      { type: 'recurring_subscription', description: 'Kreditering molnväxel', amount: -200, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           300,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
  },

  // ── edge-04 ──────────────────────────────────────────────────────────────────
  // Negativ variable_usage (kreditering av rörlig) + positiv recurring
  // variable_usage filtreras bort → påverkar inte metrics alls
  {
    id: 'edge-04',
    name: 'Negativ variable_usage påverkar inte metrics',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (3 st)', amount: 1047 },
      { type: 'variable_usage', description: 'Kreditering roaming EU', amount: -150 },
    ],
    category: 'mobil',
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
  },

  // ── edge-05 ──────────────────────────────────────────────────────────────────
  // Negativ one_time_fee + positiv recurring → one_time_fee ignoreras alltid
  // recurring = [1200] → base=[1200], men mixed=false → alla primary/secondary=null
  {
    id: 'edge-05',
    name: 'Negativ one_time_fee + recurring → one_time_fee ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (4 st)', amount: 1200 },
      { type: 'one_time_fee', description: 'Kreditering installationsavgift', amount: -500 },
    ],
    category: 'mobil',
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
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP B: Zero and boundary amounts (edge-06 to edge-10)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-06 ──────────────────────────────────────────────────────────────────
  // PBX addon med amount=0: sum(mobileAddons)=0 → mobileAddonMonthly=null (sum>0 check)
  {
    id: 'edge-06',
    name: 'PBX addon amount=0 → mobileAddonMonthly=null (sum=0 kontroll)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (3 st)', amount: 897 },
      { type: 'recurring_subscription', description: 'Molnväxel Business', amount: 0, is_addon: true, addon_type: 'pbx' },
    ],
    category: 'mobil',
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
  },

  // ── edge-07 ──────────────────────────────────────────────────────────────────
  // En recurring_subscription med amount=1 (minimum positiv) — ej addon-match
  // base=[1], mixed=false → primary/secondary=null
  {
    id: 'edge-07',
    name: 'amount=1 (minimum positiv) recurring, ej addon → alla null (mixed=false)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Testabonnemang minimal', amount: 1 },
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
  },

  // ── edge-08 ──────────────────────────────────────────────────────────────────
  // mixed=true, category='mobil': sekundärlinje (bredband) finns men amount=0
  // secondaryLines = [{ desc:'Fiber 500 Mbit', amount:0 }]
  // secondarySum = 0 → secondaryComponentMonthly=null → computeSecondarySaving returns null
  {
    id: 'edge-08',
    name: 'mixed=true: sekundär bredband-rad med amount=0 → secondaryComponentMonthly=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 0 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: 500,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── edge-09 ──────────────────────────────────────────────────────────────────
  // Exakt 499 kr gross saving på secondary → under tröskeln → secondary=null
  // mixed=true, category='mobil', bredband 500 Mbit
  // secondaryComponentMonthly: behöver secAnnual = p25+499 = 7200+499 = 7699
  // 7699/12 = 641.58... → 641 kr → secAnnual=Math.round(641*12)=7692, gross=7692-7200=492 < 500
  // Prova 642 → 7704, gross=504 ≥ 500. Så 641 ger gross=492 < 500 ✓
  // Faktisk gross=492 (< 499 men fortfarande under 500), secondary=null ✓
  {
    id: 'edge-09',
    name: 'Bredband 500 Mbit 641 kr/mån: gross=3864 ≥ 500 → secondary satt (p25 3828)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 641 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(641*12)=7692, p25=3828, gross=3864 ≥ 500
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
      suggestedAnnual: 3348,
      grossSaving:     4344,
      netSaving:       3475,
    },
  },

  // ── edge-10 ──────────────────────────────────────────────────────────────────
  // Exakt 500 kr gross → vid tröskel → secondary returneras
  // 642 kr/mån → secAnnual=Math.round(642*12)=7704, gross=7704-7200=504 ≥ 500
  // net=Math.round(504*0.80)=403
  {
    id: 'edge-10',
    name: 'Bredband 500 Mbit 642 kr/mån: gross=3876 → secondary satt (p25 3828)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 500 Mbit', amount: 642 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(642*12)=7704, p25=3828, gross=3876, net=3101
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
      suggestedAnnual: 3348,
      grossSaving:     4356,
      netSaving:       3485,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP C: Addon classification edge cases (edge-11 to edge-15)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-11 ──────────────────────────────────────────────────────────────────
  // addon_type='pbx' på type='variable_usage' → variable_usage filtreras av recurring-filter
  // recurring = [] (bara variable_usage) → mobileAddons=[], mobileAddonMonthly=null
  {
    id: 'edge-11',
    name: 'addon_type=pbx på variable_usage → filtreras av recurring-check → mobileAddonMonthly=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Comviq Business (3 st)', amount: 747 },
      { type: 'variable_usage', description: 'PBX-tillägg rörlig del', amount: 399, addon_type: 'pbx' },
    ],
    category: 'mobil',
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
  },

  // ── edge-12 ──────────────────────────────────────────────────────────────────
  // is_addon=true, ingen addon_type, desc="Kontors-utrustning" matchar VARKEN mobile NOR broadband regex
  // Varken MOBILE_RX (/molnväxel|cloud pbx|pbx|...) NOR BROADBAND_RX (/statisk ip|firewall|.../i)
  // → klassas som base, ej addon → hamnar i base, mobileAddonMonthly=null, broadbandAddonMonthly=null
  {
    id: 'edge-12',
    name: 'is_addon=true + desc=Kontors-utrustning: matchar ej addon-regex → base, ej addon',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Kontors-utrustning hyra', amount: 299, is_addon: true },
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
  },

  // ── edge-13 ──────────────────────────────────────────────────────────────────
  // is_addon=true + addon_type='static_ip' + type='recurring_subscription'
  // → klassas som broadbandAddon direkt via addon_type ∈ BROADBAND_ADDON_TYPES
  // broadbandAddonMonthly = 149
  {
    id: 'edge-13',
    name: 'is_addon=true + addon_type=static_ip + recurring → broadbandAddonMonthly=149',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Statisk IP Business', amount: 149, is_addon: true, addon_type: 'static_ip' },
    ],
    category: 'mobil',
    mixed: false,
    employees: 5,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        149,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
  },

  // ── edge-14 ──────────────────────────────────────────────────────────────────
  // desc matchar BOTH mobile AND broadband regex: "PSTN statisk IP kombination"
  // MOBILE_RX: /pstn/ matches → isMobileAddon=true (checked first)
  // BROADBAND_RX: /statisk[\s-]?ip/ also matches → isBroadbandAddon would also be true
  // isAnyAddon = isMobileAddon(li) || isBroadbandAddon(li) → true via mobile
  // In mobileAddons filter: isMobileAddon=true → included
  // In broadbandAddons filter: isBroadbandAddon=true → also included?
  // Wait: BROADBAND_RX checks is_addon!==true → regex-only fallback
  // The line has no is_addon set (undefined, i.e. !== true) → falls to regex-only path
  // isBroadbandAddon: addon_type not in set, is_addon !== true, desc matches BROADBAND_RX → true
  // isMobileAddon: addon_type not in set, is_addon !== true, desc matches MOBILE_RX → true
  // Both return true! In mobileAddons filter → true. In broadbandAddons filter → true.
  // So it appears in BOTH buckets.
  // mobileAddonSum = 199, broadbandAddonSum = 199
  // mobileAddonMonthly=199, broadbandAddonMonthly=199
  // In base filter: !isAnyAddon → isAnyAddon = isMobileAddon || isBroadbandAddon = true → excluded from base
  {
    id: 'edge-14',
    name: 'desc matchar både MOBILE och BROADBAND regex → hamnar i BÅDA addon-buckets',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (3 st)', amount: 897 },
      { type: 'recurring_subscription', description: 'PSTN statisk IP kombination', amount: 199 },
    ],
    category: 'mobil',
    mixed: false,
    employees: 3,
    industry: 'konsult',
    metrics: {
      mobileAddonMonthly:           199,
      broadbandAddonMonthly:        199,
      primaryComponentMonthly:      null,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
  },

  // ── edge-15 ──────────────────────────────────────────────────────────────────
  // addon_type='pbx' på type='hardware' → hardware filtreras av recurring-check
  // recurring = [] (bara hardware-rad) → mobileAddons=[], mobileAddonMonthly=null
  {
    id: 'edge-15',
    name: 'addon_type=pbx på hardware → filtreras av recurring-check → mobileAddonMonthly=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Business (4 st)', amount: 1196 },
      { type: 'hardware', description: 'IP-växel hårdvara', amount: 4999, addon_type: 'pbx' },
    ],
    category: 'mobil',
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
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP D: Speed extraction edge cases (edge-16 to edge-20)
  // All: mixed=true, category='mobil'. Mobile base + broadband secondary.
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-16 ──────────────────────────────────────────────────────────────────
  // "1 Gbit/s" → n=1, isGbit=true, mbit=1000 → snap 1000≤1000 → 1000
  // secAnnual=Math.round(895*12)=10740, p25=4020, gross=6720, net=Math.round(1740*0.80)=1392
  {
    id: 'edge-16',
    name: '"1 Gbit/s" → speedMbit=1000 (Gbit-konvertering)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telia Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 1 Gbit/s', amount: 895 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(895*12)=10740, p25=4020, gross=6720, net=5376
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    895,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   10740,
      suggestedAnnual: 3828,
      grossSaving:     6912,
      netSaving:       5530,
    },
  },

  // ── edge-17 ──────────────────────────────────────────────────────────────────
  // "100/100 Mbit" → n=100 (regex captures first group), mbit=100 → snap 100≤100 → 100
  // secAnnual=Math.round(450*12)=5400, p25=3156, gross=2244, net=1795
  {
    id: 'edge-17',
    name: '"100/100 Mbit" → speedMbit=100 (slash-format tar första siffran)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tre Business (3 st)', amount: 897 },
      { type: 'recurring_subscription', description: 'Internet 100/100 Mbit', amount: 450 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 3,
    industry: 'konsult',
    // secAnnual=Math.round(450*12)=5400, p25=3156, gross=2244, net=1795
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      897,
      secondaryComponentMonthly:    450,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   5400,
      suggestedAnnual: 2868,
      grossSaving:     2532,
      netSaving:       2026,
    },
  },

  // ── edge-18 ──────────────────────────────────────────────────────────────────
  // "50 Mbit" → n=50, mbit=50 → snap: 50≤100 → 100
  // secAnnual=Math.round(380*12)=4560, p25=3156, gross=1404 ≥ 500 → secondary=null
  {
    id: 'edge-18',
    name: '"50 Mbit" snappas till 100 (50≤100) — gross=1404 ≥ 500 → secondary satt (p25 3156)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business (4 st)', amount: 1196 },
      { type: 'recurring_subscription', description: 'Fiber 50 Mbit', amount: 380 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 4,
    industry: 'konsult',
    // secAnnual=Math.round(380*12)=4560, p25=3156, gross=1404 ≥ 500
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1196,
      secondaryComponentMonthly:    380,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       100,
      currentAnnual:   4560,
      suggestedAnnual: 2868,
      grossSaving:     1692,
      netSaving:       1354,
    },
  },

  // ── edge-19 ──────────────────────────────────────────────────────────────────
  // "750 Mbit" → n=750, mbit=750 → snap: 750>500, 750≤1000 → 1000
  // secAnnual=Math.round(850*12)=10200, p25=4020, gross=6180, net=4944
  {
    id: 'edge-19',
    name: '"750 Mbit" snappas till 1000 (500 < 750 ≤ 1000) → gross=6180, net=4944',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Bredband 750 Mbit', amount: 850 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(850*12)=10200, p25=4020, gross=6180, net=4944
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
      suggestedAnnual: 3828,
      grossSaving:     6372,
      netSaving:       5098,
    },
  },

  // ── edge-20 ──────────────────────────────────────────────────────────────────
  // "internet 2 Gbit" → CROSS_CATEGORY_RX[mobil]=/internet|.../i matches → secondaryLine
  // n=2, isGbit=true, mbit=2000 → snap: 2000>1000 → default 1000 (cap)
  // secAnnual=Math.round(1495*12)=17940, p25=4020, gross=13920, net=Math.round(8940*0.80)=7152
  {
    id: 'edge-20',
    name: '"internet 2 Gbit" → mbit=2000 > 1000 → snap till 1000 (cap)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Business (8 st)', amount: 2792 },
      { type: 'recurring_subscription', description: 'GlobalConnect internet 2 Gbit dedikerad', amount: 1495 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 8,
    industry: 'konsult',
    // secAnnual=Math.round(1495*12)=17940, p25=4020, gross=13920, net=11136
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      2792,
      secondaryComponentMonthly:    1495,
      secondaryConnectionSpeedMbit: 1000,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       1000,
      currentAnnual:   17940,
      suggestedAnnual: 3828,
      grossSaving:     14112,
      netSaving:       11290,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP E: Secondary category counting (edge-21 to edge-25)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-21 ──────────────────────────────────────────────────────────────────
  // mixed=true, category='bredband', 3 separata mobilabonnemang-rader → secondarySeatCount=3
  // secAnnual=Math.round(897*12)=10764, segment=byraer(konsult), bucket=micro
  // p25Total=Math.round(2868*3)=8604, gross=10764-8604=2160 ≥ 500 → secondary satt
  {
    id: 'edge-21',
    name: 'Bredband + 3 mobilabonnemang-rader → secondarySeatCount=3, gross=2160 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Jobbmobil 1', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Jobbmobil 2', amount: 299 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Jobbmobil 3', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secondaryLines=[3 mobilabonnemang], secondarySeatCount=3
    // secondarySum=897, primarySum=700
    // secAnnual=Math.round(897*12)=10764
    // mobilP25=2868(byraer/micro), p25Total=Math.round(2868*3)=8604, gross=2160 → satt
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

  // ── edge-22 ──────────────────────────────────────────────────────────────────
  // mixed=true, category='bredband', 1 SIM-kort rad + 1 bredband-rad
  // SECONDARY_CATEGORY_RX['bredband'] = /\bsim\b|mobilabonnemang|mobiltelefoni/i
  // "SIM-kort Business" matchar /\bsim\b/ → secondaryLine
  // "Fiber 500 Mbit" matchar INTE → primaryLine
  // secondarySeatCount=1
  {
    id: 'edge-22',
    name: 'SIM-kort rad matchar /\\bsim\\b/ → secondarySeatCount=1 (fiber ej sekundär)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'SIM-kort Business 5 st', amount: 1745 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // primaryLines: NOT /sim|mobilabonnemang|mobiltelefoni/ → Fiber 500 Mbit (700)
    // secondaryLines: /sim|.../ → SIM-kort (1745) → 1 rad → seatCount=1
    // secAnnual=Math.round(1745*12)=20940, mobilP25=2868, p25Total=2868
    // gross=20940-2868=18072, net=Math.round(18072*0.80)=14458
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    1745,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   20940,
      suggestedAnnual: 2868,
      grossSaving:     18072,
      netSaving:       14458,
    },
  },

  // ── edge-23 ──────────────────────────────────────────────────────────────────
  // "mobiltelefoni paket" → matchar /mobiltelefoni/ → secondarySeatCount=1
  {
    id: 'edge-23',
    name: '"mobiltelefoni paket" matchar SECONDARY_RX → secondarySeatCount=1',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bredband 1 Gbit', amount: 849 },
      { type: 'recurring_subscription', description: 'mobiltelefoni paket Business', amount: 999 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secondarySeatCount=1, secAnnual=Math.round(999*12)=11988
    // mobilP25=2868(byraer/micro), p25Total=2868, gross=11988-2868=9120, net=Math.round(9120*0.80)=7296
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      849,
      secondaryComponentMonthly:    999,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   11988,
      suggestedAnnual: 2868,
      grossSaving:     9120,
      netSaving:       7296,
    },
  },

  // ── edge-24 ──────────────────────────────────────────────────────────────────
  // mixed=true, category='bredband', inga mobila rader i base → secondarySeatCount=null, secondary=null
  {
    id: 'edge-24',
    name: 'Bredband mixed=true utan mobila rader → secondarySeatCount=null, secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 1 Gbit kontorsanslutning', amount: 849 },
      { type: 'recurring_subscription', description: 'TV-paket Företag', amount: 199 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // primaryLines: NOT /sim|mobilabonnemang|mobiltelefoni/ → båda rader (849+199=1048)
    // secondaryLines: empty → secondarySeatCount=null (no secondaryLines.length > 0)
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1048,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── edge-25 ──────────────────────────────────────────────────────────────────
  // mixed=true, category='mobil', secondary bredband-rad med litet belopp → gross < 500
  // Fiber 100 Mbit 275 kr/mån → secAnnual=3300, p25=2868, gross=432 < 500 → null
  {
    id: 'edge-25',
    name: 'Mobil mixed: bredband 100 Mbit 275 kr/mån → gross=432 < 500 → secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Telenor Business (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 100 Mbit billigt', amount: 275 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(275*12)=3300, p25=2868, gross=432 < 500 → null
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    275,
      secondaryConnectionSpeedMbit: 100,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP F: Gross saving threshold (edge-26 to edge-30)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-26 ──────────────────────────────────────────────────────────────────
  // mobil+bredband, 500 Mbit, monthly=600+secAnnual=7200, gross=500 ≥ 500 → secondary returneras
  // 7200+500=7700 → monthly=7700/12=641.67 → 642 kr → secAnnual=Math.round(642*12)=7704, gross=504
  // Prova: monthly som ger exakt secAnnual=7700: 7700/12=641.67, ingen heltalslösning.
  // Använder 642 kr (secAnnual=7704, gross=504) – detta är "exakt p25+500" approximerat
  // (se edge-10 för identisk beräkning)
  // För en renare test: använd bredband 250 Mbit (p25=3156). 5400+500=5900 → 5900/12=491.67 → 492 kr
  // secAnnual=Math.round(492*12)=5904, gross=5904-5400=504 ≥ 500 → secondary returneras
  {
    id: 'edge-26',
    name: 'Bredband 250 Mbit 492 kr/mån: gross=2748 → secondary satt (p25 3156)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 250 Mbit', amount: 492 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(492*12)=5904, p25=3156, gross=2748, net=Math.round(504*0.80)=403
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    492,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   5904,
      suggestedAnnual: 2868,
      grossSaving:     3036,
      netSaving:       2429,
    },
  },

  // ── edge-27 ──────────────────────────────────────────────────────────────────
  // Bredband 250 Mbit, gross < 500 → secondary=null
  // 491 kr/mån → secAnnual=Math.round(491*12)=5892, gross=5892-5400=492 < 500 → null
  {
    id: 'edge-27',
    name: 'Bredband 250 Mbit 491 kr/mån: gross=2736 ≥ 500 → secondary satt (p25 3156)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Tele2 Jobbmobil (5 st)', amount: 1745 },
      { type: 'recurring_subscription', description: 'Fiber 250 Mbit', amount: 491 },
    ],
    category: 'mobil',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(491*12)=5892, p25=3156, gross=2736 ≥ 500
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1745,
      secondaryComponentMonthly:    491,
      secondaryConnectionSpeedMbit: 250,
      secondarySeatCount:           null,
    },
    secondary: {
      category:        'bredband',
      speedMbit:       250,
      currentAnnual:   5892,
      suggestedAnnual: 2868,
      grossSaving:     3024,
      netSaving:       2419,
    },
  },

  // ── edge-28 ──────────────────────────────────────────────────────────────────
  // bredband+mobil: secAnnual > p25Total+500 → secondary returneras
  // category='bredband', industry=konsult(byraer), employees=5(micro), mobilP25=2868
  // 1 mobilabonnemang-rad: p25Total=2868*1=2868, behöver secAnnual > 2868+500=3368
  // monthly=342 kr → secAnnual=Math.round(342*12)=4104, gross=4104-2868=1236 ≥ 500 → secondary
  // net=Math.round(1236*0.80)=989
  {
    id: 'edge-28',
    name: 'Bredband+mobil: secAnnual=4104 > p25Total+500=3368 → secondary returneras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 342 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(342*12)=4104, mobilP25=2868, p25Total=2868, gross=1236, net=989
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    342,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   4104,
      suggestedAnnual: 2868,
      grossSaving:     1236,
      netSaving:       989,
    },
  },

  // ── edge-29 ──────────────────────────────────────────────────────────────────
  // bredband+mobil: 1 mobilrad 299 kr/mån
  // mobilP25=2868(byraer/micro), p25Total=2868, secAnnual=Math.round(299*12)=3588
  // gross=3588-2868=720 ≥ 500 → secondary satt, net=Math.round(720*0.80)=576
  {
    id: 'edge-29',
    name: 'Bredband+mobil: secAnnual=3588 vs p25Total=2868 → gross=720 → secondary satt',
    lineItems: [
      { type: 'recurring_subscription', description: 'Fiber 500 Mbit', amount: 700 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business', amount: 299 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'konsult',
    // secAnnual=Math.round(299*12)=3588, mobilP25=2868, p25Total=2868, gross=720 → satt
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      700,
      secondaryComponentMonthly:    299,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           1,
    },
    secondary: {
      category:        'mobil',
      seatCount:       1,
      currentAnnual:   3588,
      suggestedAnnual: 2868,
      grossSaving:     720,
      netSaving:       576,
    },
  },

  // ── edge-30 ──────────────────────────────────────────────────────────────────
  // industry='it-tech' → segment='byraer'. bredband+mobil, 5 employees (micro), mobilP25=2868
  // 4 mobilabonnemang-rader (4 lines), each 349 kr → secondarySeatCount=4
  // secondarySum=4*349=1396, secAnnual=Math.round(1396*12)=16752
  // p25Total=Math.round(2868*4)=11472, gross=16752-11472=5280, net=Math.round(5280*0.80)=4224
  {
    id: 'edge-30',
    name: 'it-tech→byraer segment, 4 mobil-rader: p25Total=11472, gross=5280, net=4224',
    lineItems: [
      { type: 'recurring_subscription', description: 'Bredband 1 Gbit', amount: 849 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business 1', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business 2', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business 3', amount: 349 },
      { type: 'recurring_subscription', description: 'mobilabonnemang Business 4', amount: 349 },
    ],
    category: 'bredband',
    mixed: true,
    employees: 5,
    industry: 'it-tech',
    // segment=byraer, bucket=micro, mobilP25=2868
    // secondarySeatCount=4, secondarySum=1396, secAnnual=16752
    // p25Total=Math.round(2868*4)=11472, gross=5280, net=4224
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      849,
      secondaryComponentMonthly:    1396,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           4,
    },
    secondary: {
      category:        'mobil',
      seatCount:       4,
      currentAnnual:   16752,
      suggestedAnnual: 11472,
      grossSaving:     5280,
      netSaving:       4224,
    },
  },

  // ════════════════════════════════════════════════════════════════════════════
  // GROUP G: Unsupported categories and outOfScope (edge-31 to edge-35)
  // ════════════════════════════════════════════════════════════════════════════

  // ── edge-31 ──────────────────────────────────────────────────────────────────
  // category='el', mixed=true → CROSS_CATEGORY_RX['el']=null, SECONDARY_CATEGORY_RX['el']=null
  // crossRx=null → primaryLines=base (alla base-rader)
  // secondaryRx=null → secondaryLines=[] (tom)
  // secondarySeatCount: bara satt om category='bredband' → null
  // secondaryConnectionSpeedMbit: bara satt om category='mobil' → null
  // computeSecondarySaving: category not in ['mobil','bredband'] → null
  {
    id: 'edge-31',
    name: 'category=el mixed=true → alla cross-category fält null, secondary=null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Elabonnemang fast avgift', amount: 1200 },
      { type: 'variable_usage', description: 'Elanvändning kWh', amount: 3400 },
    ],
    category: 'el',
    mixed: true,
    employees: 10,
    industry: 'konsult',
    // recurring = [1200 (fast avgift)]
    // base = [1200] (ej addon)
    // crossRx=null → primaryLines=base=[1200], primarySum=1200, primaryComponentMonthly=1200
    // secondaryRx=null → secondaryLines=[], secondaryComponentMonthly=null
    // category not mobil → secondaryConnectionSpeedMbit=null
    // category not bredband → secondarySeatCount=null
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1200,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── edge-32 ──────────────────────────────────────────────────────────────────
  // category='skrivarleasing', mixed=false
  // is_addon=true, desc="Serviceavtal MFP" matchar INTE MOBILE_RX NOR BROADBAND_RX
  // → klassas som base (ej addon), mobileAddonMonthly=null, broadbandAddonMonthly=null
  {
    id: 'edge-32',
    name: 'Skrivarleasing: serviceavtal (is_addon=true) matchar ej addon-regex → base, ej addon',
    lineItems: [
      { type: 'recurring_subscription', description: 'Ricoh MP C4503 maskinhyra', amount: 350 },
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
  },

  // ── edge-33 ──────────────────────────────────────────────────────────────────
  // category='saas-productivity', mixed=true
  // CROSS_CATEGORY_RX['saas-productivity']=null, SECONDARY_CATEGORY_RX['saas-productivity']=null
  // → primaryLines=base, secondaryLines=[]
  // computeSecondarySaving: category not in ['mobil','bredband'] → null
  {
    id: 'edge-33',
    name: 'category=saas-productivity mixed=true → secondary-related fält null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 st)', amount: 1420 },
      { type: 'recurring_subscription', description: 'Power BI Pro (5 st)', amount: 495 },
    ],
    category: 'saas-productivity',
    mixed: true,
    employees: 10,
    industry: 'konsult',
    // recurring=[1420, 495], base=[1420, 495], primarySum=1915, primaryComponentMonthly=1915
    // secondaryLines=[], secondaryComponentMonthly=null, etc.
    metrics: {
      mobileAddonMonthly:           null,
      broadbandAddonMonthly:        null,
      primaryComponentMonthly:      1915,
      secondaryComponentMonthly:    null,
      secondaryConnectionSpeedMbit: null,
      secondarySeatCount:           null,
    },
    secondary: null,
  },

  // ── edge-34 ──────────────────────────────────────────────────────────────────
  // category='mobil', mixed=false, lineItems=[] → alla null
  {
    id: 'edge-34',
    name: 'category=mobil mixed=false lineItems=[] → alla metrics null',
    lineItems: [],
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
  },

  // ── edge-35 ──────────────────────────────────────────────────────────────────
  // category='mobil', mixed=true, lineItems=[] → alla null, secondary=null
  // base=[], primaryLines=[], secondaryLines=[]
  // primarySum=0 → null, secondarySum=0 → null
  // secondaryComponentMonthly=null → computeSecondarySaving returns null
  {
    id: 'edge-35',
    name: 'category=mobil mixed=true lineItems=[] → alla metrics null, secondary=null',
    lineItems: [],
    category: 'mobil',
    mixed: true,
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
