// tests/fixtures/05-saas.mjs
// 35 fixtures for computeInvoiceMetrics + computeSecondarySaving — category='saas-productivity'
//
// For category='saas-productivity':
//   - mixed is always false → primaryComponentMonthly/secondaryComponentMonthly/etc. are never set
//   - No SaaS line items match MOBILE_ADDON_TYPES, BROADBAND_ADDON_TYPES, or the addon regexes
//   - Therefore ALL six metrics fields are always null
//   - computeSecondarySaving always returns null (!['mobil','bredband'].includes('saas-productivity'))
//
// Focus: verifying diverse M365 tier structures, seat counts, line item compositions, and
// Swedish SaaS variants do NOT contaminate metrics.
//
// M365 approximate list prices (kr/user/month via CSP):
//   Business Basic: ~75 kr, Business Standard: ~142 kr, Business Premium: ~212 kr
//   E3: ~350 kr, E5: ~520 kr

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { recommend } from '../../agents/recommender/recommend.js';

export const fixtures = [

  // ── saas-01 ──────────────────────────────────────────────────────────────────
  // M365 Business Standard, 5 licenser — basfall
  {
    id: 'saas-01',
    name: 'M365 Business Standard 5 licenser — basfall',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (5 lic)', amount: 710 },
    ],
    category: 'saas-productivity',
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

  // ── saas-02 ──────────────────────────────────────────────────────────────────
  // M365 Business Basic, 12 licenser
  {
    id: 'saas-02',
    name: 'M365 Business Basic 12 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic (12 lic)', amount: 900 },
    ],
    category: 'saas-productivity',
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

  // ── saas-03 ──────────────────────────────────────────────────────────────────
  // M365 Business Premium, 8 licenser
  {
    id: 'saas-03',
    name: 'M365 Business Premium 8 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium (8 lic)', amount: 1696 },
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

  // ── saas-04 ──────────────────────────────────────────────────────────────────
  // M365 E3, 25 licenser (enterprise-nivå)
  {
    id: 'saas-04',
    name: 'M365 E3 25 licenser — enterprise',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (25 lic)', amount: 8750 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 25,
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

  // ── saas-05 ──────────────────────────────────────────────────────────────────
  // M365 E5, 10 licenser (överlicensierat litet bolag)
  {
    id: 'saas-05',
    name: 'M365 E5 10 licenser — överlicensierat litet bolag',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E5 (10 lic)', amount: 5200 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 6,
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

  // ── saas-06 ──────────────────────────────────────────────────────────────────
  // Google Workspace Business Standard, 15 licenser
  {
    id: 'saas-06',
    name: 'Google Workspace Business Standard 15 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Google Workspace Business Standard (15 lic)', amount: 2025 },
    ],
    category: 'saas-productivity',
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

  // ── saas-07 ──────────────────────────────────────────────────────────────────
  // Slack Pro, 20 licenser
  {
    id: 'saas-07',
    name: 'Slack Pro 20 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Slack Pro (20 lic)', amount: 1580 },
    ],
    category: 'saas-productivity',
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

  // ── saas-08 ──────────────────────────────────────────────────────────────────
  // Zoom Business, 5 licenser
  {
    id: 'saas-08',
    name: 'Zoom Business 5 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Zoom Business (5 lic)', amount: 810 },
    ],
    category: 'saas-productivity',
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

  // ── saas-09 ──────────────────────────────────────────────────────────────────
  // Blandade M365-nivåer på samma faktura (E3 + E5-mix)
  {
    id: 'saas-09',
    name: 'Blandade M365-nivåer — E3 + E5 på samma faktura',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (20 lic)', amount: 7000 },
      { type: 'recurring_subscription', description: 'Microsoft 365 E5 (5 lic)', amount: 2600 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 25,
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

  // ── saas-10 ──────────────────────────────────────────────────────────────────
  // M365 med Power BI Pro som separat tillägg
  {
    id: 'saas-10',
    name: 'M365 Business Standard + Power BI Pro tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 lic)', amount: 1420 },
      { type: 'recurring_subscription', description: 'Power BI Pro (3 lic)', amount: 300 },
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

  // ── saas-11 ──────────────────────────────────────────────────────────────────
  // 57 licenser Business Standard, employees=45 → licenseOverage=12 (testas i recommend)
  {
    id: 'saas-11',
    name: 'M365 Business Standard 57 lic — employees=45, overage-scenario',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (57 lic)', amount: 8094 },
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

  // ── saas-12 ──────────────────────────────────────────────────────────────────
  // Exakt matchning licenser/anställda — inget overage
  {
    id: 'saas-12',
    name: 'M365 Business Standard 10 lic — exakt employees=10, inget overage',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 lic)', amount: 1420 },
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

  // ── saas-13 ──────────────────────────────────────────────────────────────────
  // Enskild licensinnehavare — solo-bolag 1 licens
  {
    id: 'saas-13',
    name: 'M365 Business Standard 1 licens — solo-bolag',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (1 lic)', amount: 142 },
    ],
    category: 'saas-productivity',
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

  // ── saas-14 ──────────────────────────────────────────────────────────────────
  // Adobe Creative Cloud (kategoriseras ändå som saas-productivity)
  {
    id: 'saas-14',
    name: 'Adobe Creative Cloud Teams — saas-productivity kategori',
    lineItems: [
      { type: 'recurring_subscription', description: 'Adobe Creative Cloud for Teams (5 lic)', amount: 3700 },
    ],
    category: 'saas-productivity',
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

  // ── saas-15 ──────────────────────────────────────────────────────────────────
  // Årsavtal — en enda stor recurring-post
  {
    id: 'saas-15',
    name: 'M365 E3 årsavtal — en stor recurring-rad',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 årsavtal (20 lic)', amount: 84000 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 20,
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

  // ── saas-16 ──────────────────────────────────────────────────────────────────
  // M365 med hårdvaruköp (tangentbord) som hardware-rad — ignoreras
  {
    id: 'saas-16',
    name: 'M365 Business Standard + tangentbordsköp hardware — hardware ignoreras',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (5 lic)', amount: 710 },
      { type: 'hardware', description: 'Microsoft Sculpt tangentbord (5 st)', amount: 2495 },
    ],
    category: 'saas-productivity',
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

  // ── saas-17 ──────────────────────────────────────────────────────────────────
  // Attest (svensk SaaS, fakturahantering)
  {
    id: 'saas-17',
    name: 'Attest fakturahantering svensk SaaS — 8 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Attest Business (8 lic)', amount: 960 },
    ],
    category: 'saas-productivity',
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

  // ── saas-18 ──────────────────────────────────────────────────────────────────
  // CRM + M365 på samma faktura
  {
    id: 'saas-18',
    name: 'Salesforce CRM + M365 Business Standard på samma faktura',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (8 lic)', amount: 1136 },
      { type: 'recurring_subscription', description: 'Salesforce Sales Cloud Essentials (8 lic)', amount: 2000 },
    ],
    category: 'saas-productivity',
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

  // ── saas-19 ──────────────────────────────────────────────────────────────────
  // Nollbelopp-licens (edge case: amount=0)
  {
    id: 'saas-19',
    name: 'Licens med amount=0 — edge case, metrics null',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic (1 lic) gratis trial', amount: 0 },
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (5 lic)', amount: 710 },
    ],
    category: 'saas-productivity',
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

  // ── saas-20 ──────────────────────────────────────────────────────────────────
  // Stort företag, 200 licenser M365 E3
  {
    id: 'saas-20',
    name: 'M365 E3 200 licenser — storföretag mid-bucket',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (200 lic)', amount: 70000 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 200,
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

  // ── saas-21 ──────────────────────────────────────────────────────────────────
  // M365 med Teams Telefon-tillägg
  {
    id: 'saas-21',
    name: 'M365 Business Standard + Teams Telefon-tillägg',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 lic)', amount: 1420 },
      { type: 'recurring_subscription', description: 'Microsoft Teams Telefon Standard (10 lic)', amount: 750 },
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

  // ── saas-22 ──────────────────────────────────────────────────────────────────
  // M365 med Azure AD P2 som is_addon=true (ska inte matcha broadband/mobile addon)
  {
    id: 'saas-22',
    name: 'M365 E3 + Azure AD P2 is_addon=true — inga metrics-träffar',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (15 lic)', amount: 5250 },
      { type: 'recurring_subscription', description: 'Azure Active Directory P2 (15 lic)', amount: 900, is_addon: true },
    ],
    category: 'saas-productivity',
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

  // ── saas-23 ──────────────────────────────────────────────────────────────────
  // CSP-rabatt tillämpad — lägre pris per licens
  {
    id: 'saas-23',
    name: 'M365 Business Standard CSP-rabatt — lägre pris per licens',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard CSP (12 lic)', amount: 1512 },
    ],
    category: 'saas-productivity',
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

  // ── saas-24 ──────────────────────────────────────────────────────────────────
  // Enbart Google Workspace (ingen Microsoft)
  {
    id: 'saas-24',
    name: 'Google Workspace Business Plus — enbart Google, 8 licenser',
    lineItems: [
      { type: 'recurring_subscription', description: 'Google Workspace Business Plus (8 lic)', amount: 1920 },
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

  // ── saas-25 ──────────────────────────────────────────────────────────────────
  // Slack + Zoom-kombination
  {
    id: 'saas-25',
    name: 'Slack Pro + Zoom Business — kombinationsfaktura',
    lineItems: [
      { type: 'recurring_subscription', description: 'Slack Pro (10 lic)', amount: 790 },
      { type: 'recurring_subscription', description: 'Zoom Business (10 lic)', amount: 1620 },
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

  // ── saas-26 ──────────────────────────────────────────────────────────────────
  // M365 + Atlassian Jira Software
  {
    id: 'saas-26',
    name: 'M365 Business Standard + Atlassian Jira Software',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (15 lic)', amount: 2130 },
      { type: 'recurring_subscription', description: 'Atlassian Jira Software Cloud (15 lic)', amount: 2250 },
    ],
    category: 'saas-productivity',
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

  // ── saas-27 ──────────────────────────────────────────────────────────────────
  // IT-företag (it-tech-segment → byraer)
  {
    id: 'saas-27',
    name: 'IT-konsultbolag M365 E3 — it-tech bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 (30 lic)', amount: 10500 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 30,
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

  // ── saas-28 ──────────────────────────────────────────────────────────────────
  // Tillverkningsbolag med M365
  {
    id: 'saas-28',
    name: 'Tillverkningsbolag M365 Business Premium — tillverkning bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Premium (50 lic)', amount: 10600 },
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

  // ── saas-29 ──────────────────────────────────────────────────────────────────
  // Vård-sektor med M365
  {
    id: 'saas-29',
    name: 'Sjukvårdsklinik M365 Business Basic — vård bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Basic (18 lic)', amount: 1350 },
    ],
    category: 'saas-productivity',
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

  // ── saas-30 ──────────────────────────────────────────────────────────────────
  // E-handelsbolag med M365
  {
    id: 'saas-30',
    name: 'E-handelsbolag M365 Business Standard — ehandel bransch',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (22 lic)', amount: 3124 },
    ],
    category: 'saas-productivity',
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

  // ── saas-31 ──────────────────────────────────────────────────────────────────
  // Blandning årsavtal + månadsavtal på samma faktura
  {
    id: 'saas-31',
    name: 'Årsavtal + månadsavtal blandning på samma SaaS-faktura',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3 årsavtal (10 lic)', amount: 42000 },
      { type: 'recurring_subscription', description: 'Power Automate per User månadsvis (5 lic)', amount: 1850 },
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

  // ── saas-32 ──────────────────────────────────────────────────────────────────
  // Avbruten licens — negativ kreditrad (kreditnota)
  {
    id: 'saas-32',
    name: 'M365 med kreditnota för avbruten licens — negativt belopp',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (10 lic)', amount: 1420 },
      { type: 'recurring_subscription', description: 'Kreditering: Microsoft 365 Business Standard (3 lic)', amount: -426 },
    ],
    category: 'saas-productivity',
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

  // ── saas-33 ──────────────────────────────────────────────────────────────────
  // Faktura med enbart variable_usage (inga recurring_subscription) → alla metrics null
  {
    id: 'saas-33',
    name: 'Enbart variable_usage-rader — ingen recurring → alla metrics null',
    lineItems: [
      { type: 'variable_usage', description: 'Azure överbandbredd (GB)', amount: 540 },
      { type: 'variable_usage', description: 'Azure Compute Pay-per-use', amount: 2140 },
    ],
    category: 'saas-productivity',
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

  // ── saas-34 ──────────────────────────────────────────────────────────────────
  // M365 med recurring + one_time_fee (setup/onboarding)
  {
    id: 'saas-34',
    name: 'M365 Business Standard + onboarding-avgift som one_time_fee',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (8 lic)', amount: 1136 },
      { type: 'one_time_fee', description: 'Onboarding & migreringsavgift', amount: 4900 },
    ],
    category: 'saas-productivity',
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

  // ── saas-35 ──────────────────────────────────────────────────────────────────
  // Storföretag nära bucket-gräns (49 anst, liten bucket 10-49)
  {
    id: 'saas-35',
    name: 'M365 Business Standard 49 lic — nära bucket-gräns employees=49',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 Business Standard (49 lic)', amount: 6958 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 49,
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

  // ── saas-36 ──────────────────────────────────────────────────────────────────
  // M365 E5, 25 licenser hos en SMF — enterprise-svit, klassisk nedförsäljningskandidat.
  // Körs både genom metrics-harnessen (alla null) OCH recommend()-e2e (m365Rightsizing) nedan.
  {
    id: 'saas-36',
    name: 'M365 E5 25 lic — enterprise-svit hos SMF (E5 → Business Premium-kandidat)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E5 (25 användare)', quantity: 25, amount: 15228 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 25,
    seatCount: 25,
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

  // ── saas-37 ──────────────────────────────────────────────────────────────────
  // M365 E3, 40 licenser hos en SMF — enterprise compliance som sällan är motiverad.
  {
    id: 'saas-37',
    name: 'M365 E3 40 lic — enterprise compliance hos SMF (E3 → Business Premium-kandidat)',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E3', quantity: 40, amount: 15388 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 40,
    seatCount: 40,
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

  // ── saas-38 ──────────────────────────────────────────────────────────────────
  // M365 E5, 25 lic MEN köpt via återförsäljare med påslag (750 kr/säte vs 609,10 list) → BÅDE ett
  // leverantörsbyte (overpayment) OCH tier-nedförsäljning. Bevisar att tier-advisoryn även flödar in
  // i savingsBreakdown på bytesvägen (e2e nedan), inte bara som fristående kort.
  {
    id: 'saas-38',
    name: 'M365 E5 25 lic via återförsäljare (påslag) — byte + tier-nedförsäljning',
    lineItems: [
      { type: 'recurring_subscription', description: 'Microsoft 365 E5 (25 användare)', quantity: 25, amount: 18750 },
    ],
    category: 'saas-productivity',
    mixed: false,
    employees: 25,
    seatCount: 25,
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

];

// ─────────────────────────────────────────────────────────────────────────────
// E2E: M365 rätt-storlek HELA recommend()-vägen — beviset att lib/m365-rightsizing.js är
// INKOPPLAT i ett verkligt fakturaflöde, inte bara unit-testat. recommend() går genom AI-anropet
// för saas-productivity; vi stubbar modellen (minimalt no-action-svar) OCH FX-kursen (stub-KV) så
// hela den deterministiska pipelinen körs offline. m365Rightsizing beräknas oberoende av AI:n och
// attacheras till svaret — vi asserterar att fakturan saas-36/37 ger den verifierade advisoryn.
const stubAi = { messages: { create: async () => ({
  content: [{ type: 'tool_use', input: { shouldSwitch: false, recommendationType: 'no_action', reasoning: 'Analys klar.' } }],
  usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
}) } };
const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };

const byId = (id) => fixtures.find((f) => f.id === id);
const e2eInput = (fx) => ({
  customer:    { industry: fx.industry, employees: fx.employees },
  categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'Microsoft', confidence: 0.95 },
  invoice:     {
    annualCost: fx.lineItems.reduce((s, l) => s + (l.amount ?? 0), 0) * 12,
    billingPeriod: 'monthly', seatCount: fx.seatCount ?? null, lineItems: fx.lineItems,
  },
});
const runE2E = (fx) => recommend(e2eInput(fx), { client: stubAi, kvStore: stubKv });

describe('05-saas · M365 rätt-storlek e2e (recommend() hela vägen, stubbad AI+FX)', () => {
  test('E5 × 25 (saas-36) → m365Rightsizing inkopplat: Business Premium, 119 643 kr/år advisory', async () => {
    const r = await runE2E(byId('saas-36'));
    assert.ok(r.m365Rightsizing, 'm365Rightsizing ska finnas i recommend()-svaret (inkopplat e2e)');
    assert.equal(r.m365Rightsizing.currentTier, 'e5');
    assert.equal(r.m365Rightsizing.targetTier, 'business-premium');
    assert.equal(r.m365Rightsizing.seats, 25);
    assert.equal(r.m365Rightsizing.annualSaving, 119643);
    assert.equal(r.m365Rightsizing.needsReview, true);
    // Advisory/review: ingen REALISERAD besparing förrän kunden bekräftat funktionsbehovet.
    // Den verifierade potentialen lever i m365Rightsizing (eget kort), aldrig som en hård siffra.
    assert.equal(r.optimizationSaving, null);
    // Kund på E5-LISTPRIS → inget leverantörsbyte (savingsBreakdown byggs bara på bytesvägen).
    // Tier-nedförsäljningen är FRISTÅENDE och når kunden ändå via m365Rightsizing-kortet.
    assert.equal(r.shouldSwitch, false);
  });

  test('E3 × 40 (saas-37) → Business Premium, 83 717 kr/år advisory', async () => {
    const r = await runE2E(byId('saas-37'));
    assert.ok(r.m365Rightsizing);
    assert.equal(r.m365Rightsizing.currentTier, 'e3');
    assert.equal(r.m365Rightsizing.targetTier, 'business-premium');
    assert.equal(r.m365Rightsizing.seats, 40);
    assert.equal(r.m365Rightsizing.annualSaving, 83717);
    assert.equal(r.optimizationSaving, null);
  });

  test('E5 via återförsäljare (saas-38) → byte UTLÖST + tier-advisory i savingsBreakdown (119 643)', async () => {
    const r = await runE2E(byId('saas-38'));
    // Påslaget (>15 % över E5-listpris) utlöser det deterministiska bytet → savingsBreakdown byggs.
    assert.equal(r.shouldSwitch, true);
    assert.ok(r.savingsBreakdown, 'savingsBreakdown ska byggas på bytesvägen');
    // Tier-nedförsäljningen flödar in i breakdown som ADVISORY, aldrig inbakad i savingPerYear.
    assert.equal(r.savingsBreakdown.tierOptimization, 119643);
    assert.equal(r.m365Rightsizing.annualSaving, 119643);
    // Fortsatt advisory: optimizationSaving null (realiseras först vid bekräftelse).
    assert.equal(r.optimizationSaving, null);
  });

  test('Business Standard (saas-01) → ingen nedförsäljning (m365Rightsizing null)', async () => {
    const r = await runE2E(byId('saas-01'));
    assert.equal(r.m365Rightsizing, null);
  });
});
