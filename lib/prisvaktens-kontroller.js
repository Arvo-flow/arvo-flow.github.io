// lib/prisvaktens-kontroller.js — prisvaktens nattliga kontroller (flyttade ur scripts/price-monitor.mjs
// 2026-09-24 så att tests/prisbaslinje.mjs kan pröva VARJE verklig kontroll).
//
// `bokfort` (valfritt) pekar på det VERIFIERADE talet i prisboken som kontrollen bevakar. Bara en
// kontroll med `bokfort` kan bära en marknadshändelse (lib/prisbaslinje.js): det gamla priset i en
// larmrad är då prisbokens tal, aldrig ett tal ur kontrollens namn.

// ── Price checks ────────────────────────────────────────────────────────────
// pattern: regex that SHOULD be present in the fully-rendered page text.
// If the pattern disappears → possible price change → Haiku extraction → PR.
//
// M365: majtalen (119/143, 57/69, E3 384, E5 609) var prisvaktens FÖRVÄNTADE strängar. Juryn tog
// dem för gamla priser och «verifierade» en höjning som aldrig skett (lib/prisbaslinje.js).
//
//   ⚠️ KRÄVER PLAYWRIGHT (returnerar 403 på HTTP-fetch):
//      Tele2 mobil/bredband, Bahnhof, SumUp, Zettle, Sector Alarm,
//      Fortnox Lön, Skatteverket, Google Workspace, Slack, Zoom, Atlassian
//      → Kör: node scripts/price-monitor.mjs --headed
//
//   ❌ GAMMAL URL (404 fixad):
//      microsoft.com/sv-se/microsoft-365/business/compare-all-plans
// Pages that time out or return errors → warning (inconclusive, exit 0).
export const PRICE_CHECKS = [
  // Mobil — real-public, verified
  {
    category: 'mobil',
    supplier: 'Tele2 Företag mobilabonnemang',
    url: 'https://www.tele2.se/foretag/mobilabonnemang',
    // OBS: huvudplanerna är JS-renderade — den DETERMINISTISKA driftvakten är
    // scripts/verify.mjs tele2-mobil (fabriken) (Playwright, hård gate). Dessa substräng-
    // checkar är en grov nattlig backup. Verifierat 2026-06-14 (24 mån bindning).
    checks: [
      { name: '60 GB 239 kr/mth (24 mån)',          pattern: /239/ },
      { name: 'Obegränsad 279 kr/mth (24 mån)',     pattern: /279/ },
      { name: 'Obegränsad Max 299 kr/mth (24 mån)', pattern: /299/ },
    ],
  },

  // Löneadmin — real-public, verified
  {
    category: 'loneadmin',
    supplier: 'Fortnox Lön prislista',
    url: 'https://www.fortnox.se/produkt/prislista',
    checks: [
      { name: '199 kr/mth fast avgift', pattern: /199/, bokfort: ['loneadmin', 'fortnoxLonVerified', 'fixedMonthly'] },
      { name: '25 kr/anst/mth',         pattern: /25/,  bokfort: ['loneadmin', 'fortnoxLonVerified', 'perEmployeeMonthly'] },
    ],
  },

  // Bredband bevakas INTE här: priset ligger inte på en skrapbar sida (adress-gated). Det
  // verifieras live per adress/nät av scripts/verify.mjs tele2-bredband (fabriken) mot Tele2:s adress-API.

  // Kortterminal — estimated (rates changed; monitor for further changes)
  {
    category: 'kortterminal',
    supplier: 'SumUp Sverige',
    url: 'https://sumup.com/sv-se/',
    checks: [
      { name: '~1,75 % transaktionsavgift', pattern: /1[,.]7[45]|1[,.]9/ },
    ],
  },
  {
    category: 'kortterminal',
    supplier: 'Zettle by PayPal Sverige',
    url: 'https://www.zettle.com/se/priser',
    checks: [
      { name: '1,75 % transaktionsavgift', pattern: /1[,.]7[45]/ },
    ],
  },

  // SaaS-produktivitet — real-public. Talen och adresserna är prisbokens verifierade (samma sidor
  // som lib/verifiers/m365.mjs läser). OBS: Microsoft 365 E3/E5 — INTE Office 365 E3/E5.
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Standard (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard',
    checks: [
      { name: 'Standard årsavtal 133,82 kr/user/mth',  pattern: /133[,.]82\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-standard', 'msrpAnnual'] },
      { name: 'Standard månadsvis 160,58 kr/user/mth', pattern: /160[,.]58\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-standard', 'msrpMonthly'] },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Basic (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic',
    checks: [
      { name: 'Basic årsavtal 66,91 kr/user/mth',  pattern: /66[,.]91\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-basic', 'msrpAnnual'] },
      { name: 'Basic månadsvis 80,29 kr/user/mth', pattern: /80[,.]29\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-basic', 'msrpMonthly'] },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 Business Premium (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium',
    checks: [
      { name: 'Premium årsavtal 210,29 kr/user/mth',  pattern: /210[,.]29\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-premium', 'msrpAnnual'] },
      { name: 'Premium månadsvis 252,35 kr/user/mth', pattern: /252[,.]35\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'business-premium', 'msrpMonthly'] },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 E3 (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e3',
    checks: [
      { name: 'E3 årsavtal 416,77 kr/user/mth', pattern: /416[,.]77\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'e3', 'msrpAnnual'] },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Microsoft 365 E5 (sv)',
    url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e5',
    checks: [
      { name: 'E5 årsavtal 641,18 kr/user/mth', pattern: /641[,.]18\s*(?:kr|SEK)/i,
        bokfort: ['saas-productivity', 'licenseTierBenchmarks', 'e5', 'msrpAnnual'] },
    ],
  },

  // Google Workspace — USD-priser, konverteras runtime (~10.42 SEK/USD maj 2026)
  // Källa: workspace.google.com/pricing (verifierat via softwarepricingguide.com 2026-05-22)
  // Starter $7, Standard $14, Plus $22 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Starter',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Starter $7/user/mth annual', pattern: /\$\s*7[.,]0{0,2}\b|\b7\.00\s*\//  },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Standard',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Standard $14/user/mth annual', pattern: /\$\s*14[.,]0{0,2}\b|\b14\.00\s*\// },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Google Workspace Business Plus',
    url: 'https://workspace.google.com/pricing/',
    checks: [
      { name: 'Plus $22/user/mth annual', pattern: /\$\s*22[.,]0{0,2}\b|\b22\.00\s*\// },
    ],
  },

  // Slack — USD-priser (verifierat via slack.com/pricing 2026-05-22)
  // Pro $7.25, Business+ $15 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Slack Pro',
    url: 'https://slack.com/pricing',
    checks: [
      { name: 'Pro $7.25/user/mth annual', pattern: /\$\s*7[.,][0-9]{1,2}\b/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Slack Business+',
    url: 'https://slack.com/pricing',
    checks: [
      { name: 'Business+ $15/user/mth annual', pattern: /\$\s*1[45][.,]?\d*\s*(?:\/|\bper\b)/ },
    ],
  },

  // Zoom — USD-priser (verifierat via zoom.us/pricing 2026-05-22)
  // Pro $13.33, Business $18.33 årsavtal
  {
    category: 'saas-productivity',
    supplier: 'Zoom Pro',
    url: 'https://zoom.us/pricing',
    checks: [
      { name: 'Pro $13.33/user/mth annual', pattern: /\$\s*1[23][.,]\d{1,2}\b/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Zoom Business',
    url: 'https://zoom.us/pricing',
    checks: [
      { name: 'Business $18.33/user/mth annual', pattern: /\$\s*1[78][.,]\d{1,2}\b/ },
    ],
  },

  // Atlassian Jira — USD-priser (verifierat via atlassian.com/software/jira/pricing 2026-05-22)
  // Jira Standard $8.15, Premium $16.18 (per user/mth, 1-10 users; skalar ned vid fler)
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Jira Standard',
    url: 'https://www.atlassian.com/software/jira/pricing',
    checks: [
      { name: 'Jira Standard $8-9/user/mth', pattern: /\$\s*[89][.,]\d{1,2}/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Jira Premium',
    url: 'https://www.atlassian.com/software/jira/pricing',
    checks: [
      { name: 'Jira Premium $15-18/user/mth', pattern: /\$\s*1[5-9][.,]\d{1,2}/ },
    ],
  },
  // Atlassian Confluence — USD-priser (2026-05-22)
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Confluence Standard',
    url: 'https://www.atlassian.com/software/confluence/pricing',
    checks: [
      { name: 'Confluence Standard $5-7/user/mth', pattern: /\$\s*[456][.,]\d{1,2}/ },
    ],
  },
  {
    category: 'saas-productivity',
    supplier: 'Atlassian Confluence Premium',
    url: 'https://www.atlassian.com/software/confluence/pricing',
    checks: [
      { name: 'Confluence Premium $10-13/user/mth', pattern: /\$\s*1[012][.,]\d{1,2}/ },
    ],
  },

  // Energiskatt — källverifiering, Skatteverket
  {
    category: 'el',
    supplier: 'Skatteverket energiskatt 2026',
    url: 'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.html',
    checks: [
      { name: 'Energiskatt 36 öre/kWh', pattern: /36[,.]0|360\s*öre|36\s*öre/ },
    ],
  },

  // Larm & bevakning — estimated, källkontroll
  {
    category: 'larm-bevakning',
    supplier: 'Sector Alarm Företag',
    url: 'https://www.sectoralarm.se/foretag',
    checks: [
      { name: '299–499 kr/mth startpris', pattern: /[23][0-9]{2}\s*kr/ },
    ],
  },

  // Verisure Företag — larm & bevakning
  {
    category: 'larm-bevakning',
    supplier: 'Verisure Företag',
    url: 'https://www.verisure.se/foretag-och-organisationer',
    checks: [
      { name: '349–499 kr/mth larmövervakning', pattern: /[34][0-9]{2}\s*kr/ },
    ],
  },

  // ── Mobil: Telia Företag ─────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Telia Företag mobilabonnemang',
    url: 'https://www.telia.se/foretag/mobiltelefoni',
    checks: [
      { name: '349 kr/mth standard plan', pattern: /349/ },
      { name: '449 kr/mth premium plan',  pattern: /449/ },
    ],
  },

  // ── Mobil: Telenor Företag ────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Telenor Företag mobilabonnemang',
    url: 'https://www.telenor.se/foretag/mobiltelefon',
    checks: [
      { name: '299 kr/mth bas plan', pattern: /299/ },
    ],
  },

  // ── Mobil: Tre Företag ────────────────────────────────────────────────────
  {
    category: 'mobil',
    supplier: 'Tre Företag mobilabonnemang',
    url: 'https://www.tre.se/foretag/abonnemang',
    checks: [
      { name: '249 kr/mth bas plan', pattern: /249/ },
    ],
  },

  // ── SaaS Finance: Fortnox ─────────────────────────────────────────────────
  // Fortnox är #1 bokföringssystem för svenska SMF — kritisk referenspunkt.
  {
    category: 'saas-finance',
    supplier: 'Fortnox priser (bokföring)',
    url: 'https://www.fortnox.se/priser',
    checks: [
      { name: '399 kr/mth bas-paket',       pattern: /399/ },
    ],
  },

  // ── SaaS Finance: Visma eEkonomi ─────────────────────────────────────────
  {
    category: 'saas-finance',
    supplier: 'Visma eEkonomi priser',
    url: 'https://vismaeekonomii.se/priser',
    checks: [
      { name: '249 kr/mth Smart-plan', pattern: /249/ },
    ],
  },

  // ── SaaS Finance: Bokio ───────────────────────────────────────────────────
  {
    category: 'saas-finance',
    supplier: 'Bokio priser',
    url: 'https://www.bokio.se/priser',
    checks: [
      { name: '149 kr/mth Business Pro', pattern: /149/ },
    ],
  },

  // ── SaaS Creative: Adobe Creative Cloud for Teams ────────────────────────
  // Adobe All Apps: 699 kr/user/mth (supplier-price-intel.js, lastUpdated 2026-05)
  {
    category: 'saas-creative',
    supplier: 'Adobe Creative Cloud for Teams (sv)',
    url: 'https://www.adobe.com/se/creativecloud/business/teams.html',
    checks: [
      { name: 'All Apps 699 kr/user/mth', pattern: /699\s*(?:kr|SEK)/i },
    ],
  },

  // ── SaaS Creative: Figma ─────────────────────────────────────────────────
  {
    category: 'saas-creative',
    supplier: 'Figma Professional',
    url: 'https://www.figma.com/pricing/',
    checks: [
      { name: 'Professional $15/editor/mth', pattern: /\$\s*15[.,]?\d*\s*(?:\/|\bper\b)/ },
    ],
  },

  // ── SaaS CRM: Pipedrive ───────────────────────────────────────────────────
  // Pipedrive är grundat av estniska entreprenörer men ledande bland svenska SMF.
  {
    category: 'saas-crm',
    supplier: 'Pipedrive priser',
    url: 'https://www.pipedrive.com/sv/pricing',
    checks: [
      { name: 'Essential $14/user/mth annual', pattern: /\$\s*14[.,]?\d*\b/ },
    ],
  },

  // ── SaaS CRM: HubSpot ────────────────────────────────────────────────────
  {
    category: 'saas-crm',
    supplier: 'HubSpot Sales Hub priser',
    url: 'https://www.hubspot.com/pricing/sales',
    checks: [
      { name: 'Starter $15-20/seat/mth', pattern: /\$\s*1[5-9][.,]?\d*\b/ },
    ],
  },

  // ── SaaS CRM: Zoho CRM ───────────────────────────────────────────────────
  {
    category: 'saas-crm',
    supplier: 'Zoho CRM priser',
    url: 'https://www.zoho.com/crm/pricing.html',
    checks: [
      { name: 'Standard $14/user/mth annual', pattern: /\$\s*1[34][.,]?\d*\b/ },
    ],
  },

  // (Bredband flyttat till dedikerad adress-API-vakt: scripts/verify.mjs tele2-bredband (fabriken))

  // ── El: Tibber Företag ───────────────────────────────────────────────────
  // Tibber är det enda spotprisalternativet med öppen API för smart styrning.
  {
    category: 'el',
    supplier: 'Tibber Företag',
    url: 'https://tibber.com/se/foretag',
    checks: [
      { name: '39 kr/mth abonnemang', pattern: /39\s*kr/ },
    ],
  },

  // ── Löneadmin: Visma Lön ─────────────────────────────────────────────────
  {
    category: 'loneadmin',
    supplier: 'Visma Lön priser',
    url: 'https://www.visma.com/se/lonesystem',
    checks: [
      { name: 'Visma Lön startpris', pattern: /[1-9][0-9]{2,3}\s*kr/ },
    ],
  },
];
