#!/usr/bin/env node
/**
 * Populerar supplier_prices från befintlig statisk data.
 * Idempotent — kör säkert flera gånger (upsert).
 *
 * Källdata:
 *   - agents/recommender/branchindex.js (licenseTierBenchmarks för saas-productivity)
 *   - lib/supplier-price-intel.js (Microsoft/Google/Adobe MSRP-validering)
 *   - Hårdkodade svenska leverantörers listpriser med källreferens
 *
 * Kör: node scripts/seed-price-db.mjs
 * Kräver: DATABASE_URL i .env
 */

import 'dotenv/config';
import { upsertPrice } from '../lib/price-db.js';

let inserted = 0, updated = 0, unchanged = 0;

async function seed(entry) {
  const result = await upsertPrice(entry);
  if (result.inserted) inserted++;
  else if (result.changed) updated++;
  else unchanged++;
}

// ── Microsoft 365 — SEK-listpriser (microsoft.com/sv-se, verifierat 2026-05-27) ──
console.log('\n📦  Microsoft 365…');
await seed({
  supplier: 'microsoft', product: 'Microsoft 365 Business Basic', tier: 'business-basic',
  category: 'saas-productivity', priceMonthly: 68.88, priceAnnual: 57.40,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic',
  confidence: 0.99, lastVerified: '2026-05-27',
  metadata: { note: 'Teams, Exchange, webb-appar, 1 TB OneDrive. Ingen desktop Office.' },
});
await seed({
  supplier: 'microsoft', product: 'Microsoft 365 Business Standard', tier: 'business-standard',
  category: 'saas-productivity', priceMonthly: 143.38, priceAnnual: 119.48,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard',
  confidence: 0.99, lastVerified: '2026-05-27',
  metadata: { note: 'Full desktop Office, Teams, SharePoint, 1 TB OneDrive. Vanligast bland svenska SMF.' },
});
await seed({
  supplier: 'microsoft', product: 'Microsoft 365 Business Premium', tier: 'business-premium',
  category: 'saas-productivity', priceMonthly: 252.35, priceAnnual: 210.29,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium',
  confidence: 0.99, lastVerified: '2026-05-27',
  metadata: { note: 'Inkl. Intune MDM + Microsoft Defender for Business.' },
});
await seed({
  supplier: 'microsoft', product: 'Microsoft 365 E3', tier: 'e3',
  category: 'saas-productivity', priceMonthly: 462.00, priceAnnual: 384.70,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',
  confidence: 0.99, lastVerified: '2026-05-27',
  metadata: { note: 'Enterprise compliance, eDiscovery, Purview. Förväxla ej med Office 365 E3 (256 kr).' },
});
await seed({
  supplier: 'microsoft', product: 'Microsoft 365 E5', tier: 'e5',
  category: 'saas-productivity', priceMonthly: 731.00, priceAnnual: 609.10,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',
  confidence: 0.99, lastVerified: '2026-05-27',
  metadata: { note: 'Full SIEM, Defender for Endpoint, Power BI Pro.' },
});

// ── Google Workspace — USD-priser (workspace.google.com, verifierat 2026-05-22) ──
console.log('📦  Google Workspace…');
await seed({
  supplier: 'google', product: 'Google Workspace Business Starter', tier: 'starter',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 8.40, usdAnnual: 7.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://workspace.google.com/pricing/',
  confidence: 0.95, lastVerified: '2026-05-22',
  metadata: { note: '30 GB Drive/user, Meet, Docs, Gemini AI.' },
});
await seed({
  supplier: 'google', product: 'Google Workspace Business Standard', tier: 'standard',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 16.80, usdAnnual: 14.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://workspace.google.com/pricing/',
  confidence: 0.95, lastVerified: '2026-05-22',
  metadata: { note: '2 TB poolad Drive, Meet 150 deltagare + inspelning.' },
});
await seed({
  supplier: 'google', product: 'Google Workspace Business Plus', tier: 'plus',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 26.40, usdAnnual: 22.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://workspace.google.com/pricing/',
  confidence: 0.95, lastVerified: '2026-05-22',
  metadata: { note: '5 TB poolad Drive, utökad säkerhet, eDiscovery.' },
});

// ── Slack — USD-priser (slack.com/pricing, verifierat 2026-05-28) ──
console.log('📦  Slack…');
await seed({
  supplier: 'slack', product: 'Slack Pro', tier: 'pro',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 8.75, usdAnnual: 7.25, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://slack.com/pricing',
  confidence: 0.96, lastVerified: '2026-05-22',
  metadata: { note: 'Obegränsad meddelandehistorik, video-huddles, obegränsade integrationer.' },
});
await seed({
  supplier: 'slack', product: 'Slack Business+', tier: 'business-plus',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 18.00, usdAnnual: 18.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://slack.com/pricing',
  confidence: 0.96, lastVerified: '2026-05-28',
  metadata: { note: 'SSO/SAML, DLP. OBS: Årsrabatten togs bort maj 2026.' },
});

// ── Zoom — USD-priser (zoom.us/pricing) ──
console.log('📦  Zoom…');
await seed({
  supplier: 'zoom', product: 'Zoom Pro', tier: 'pro',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 15.99, usdAnnual: 14.16, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://zoom.us/pricing',
  confidence: 0.95, lastVerified: '2026-05-28',
  metadata: { note: 'Obegränsade möten, 1 GB inspelning, schemaläggning.' },
});
await seed({
  supplier: 'zoom', product: 'Zoom Business', tier: 'business',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 19.99, usdAnnual: 18.33, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://zoom.us/pricing',
  confidence: 0.95, lastVerified: '2026-05-22',
  metadata: { note: 'SSO, inspelningsutskrifter, branding, 300 deltagare.' },
});

// ── Atlassian — USD-priser ──
console.log('📦  Atlassian…');
await seed({
  supplier: 'atlassian', product: 'Jira Software Cloud Standard', tier: 'jira-standard',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 8.92, usdAnnual: null, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.atlassian.com/software/jira/pricing',
  confidence: 0.94, lastVerified: '2026-05-22',
  metadata: { note: 'Agile boards, backlog, roadmaps. OBS: årsavtal tier-bucket, ej per-seat.' },
});
await seed({
  supplier: 'atlassian', product: 'Jira Software Cloud Premium', tier: 'jira-premium',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 17.88, usdAnnual: null, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.atlassian.com/software/jira/pricing',
  confidence: 0.94, lastVerified: '2026-05-22',
  metadata: { note: 'Avancerade roadmaps, sandbox, 24/7-support.' },
});
await seed({
  supplier: 'atlassian', product: 'Confluence Cloud Standard', tier: 'confluence-standard',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 6.50, usdAnnual: null, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.atlassian.com/software/confluence/pricing',
  confidence: 0.92, lastVerified: '2026-05-22',
  metadata: { note: 'Wiki, templates, Teams/Slack-integrationer.' },
});
await seed({
  supplier: 'atlassian', product: 'Confluence Cloud Premium', tier: 'confluence-premium',
  category: 'saas-productivity', priceMonthly: null, priceAnnual: null,
  usdMonthly: 12.53, usdAnnual: null, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.atlassian.com/software/confluence/pricing',
  confidence: 0.92, lastVerified: '2026-05-22',
  metadata: { note: 'Analytics, sandbox, 24/7-support.' },
});

// ── Adobe — SEK-priser (adobe.com/se, verifierat 2026-05) ──
console.log('📦  Adobe…');
await seed({
  supplier: 'adobe', product: 'Adobe Creative Cloud All Apps for Teams', tier: 'all-apps',
  category: 'saas-creative', priceMonthly: 699, priceAnnual: 699 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.adobe.com/se/creativecloud/business/teams.html',
  confidence: 0.94, lastVerified: '2026-05-01',
  metadata: { note: 'Photoshop, Illustrator, Premiere, 100 GB Creative Cloud storage/user.' },
});
await seed({
  supplier: 'adobe', product: 'Adobe Creative Cloud Single App for Teams', tier: 'single-app',
  category: 'saas-creative', priceMonthly: 349, priceAnnual: 349 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.adobe.com/se/creativecloud/business/teams.html',
  confidence: 0.94, lastVerified: '2026-05-01',
  metadata: { note: 'En valfri Adobe-app, 100 GB storage.' },
});

// ── Figma ──
console.log('📦  Figma…');
await seed({
  supplier: 'figma', product: 'Figma Professional', tier: 'professional',
  category: 'saas-creative', priceMonthly: null, priceAnnual: null,
  usdMonthly: 15.00, usdAnnual: 12.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.figma.com/pricing/',
  confidence: 0.90, lastVerified: '2026-05-01',
  metadata: { note: 'Obegränsade Figma-filer, versionhistorik, team-bibliotek.' },
});
await seed({
  supplier: 'figma', product: 'Figma Organization', tier: 'organization',
  category: 'saas-creative', priceMonthly: null, priceAnnual: null,
  usdMonthly: 45.00, usdAnnual: 45.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.figma.com/pricing/',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'SSO, avancerad behörighetsstyrning, centraliserad administration.' },
});

// ── Pipedrive ──
console.log('📦  Pipedrive…');
await seed({
  supplier: 'pipedrive', product: 'Pipedrive Essential', tier: 'essential',
  category: 'saas-crm', priceMonthly: null, priceAnnual: null,
  usdMonthly: 24.00, usdAnnual: 14.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.pipedrive.com/sv/pricing',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'Pipeline-hantering, e-postintegrering, grundläggande rapporter.' },
});
await seed({
  supplier: 'pipedrive', product: 'Pipedrive Advanced', tier: 'advanced',
  category: 'saas-crm', priceMonthly: null, priceAnnual: null,
  usdMonthly: 44.00, usdAnnual: 29.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.pipedrive.com/sv/pricing',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'E-postautomatisering, schemaläggning, avancerad rapportering.' },
});
await seed({
  supplier: 'pipedrive', product: 'Pipedrive Professional', tier: 'professional',
  category: 'saas-crm', priceMonthly: null, priceAnnual: null,
  usdMonthly: 64.00, usdAnnual: 49.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.pipedrive.com/sv/pricing',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'Intäktsprognoser, AI-funktioner, obegränsad e-postsynkronisering.' },
});

// ── HubSpot ──
console.log('📦  HubSpot…');
await seed({
  supplier: 'hubspot', product: 'HubSpot Sales Hub Starter', tier: 'starter',
  category: 'saas-crm', priceMonthly: null, priceAnnual: null,
  usdMonthly: 20.00, usdAnnual: 15.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.hubspot.com/pricing/sales',
  confidence: 0.85, lastVerified: '2026-05-01',
  metadata: { note: 'E-postspårning, mötesbokningar, grundläggande pipeline.' },
});
await seed({
  supplier: 'hubspot', product: 'HubSpot Sales Hub Professional', tier: 'professional',
  category: 'saas-crm', priceMonthly: null, priceAnnual: null,
  usdMonthly: 100.00, usdAnnual: 90.00, priceUnit: 'per_seat', currency: 'USD',
  sourceType: 'official_web', sourceUrl: 'https://www.hubspot.com/pricing/sales',
  confidence: 0.83, lastVerified: '2026-05-01',
  metadata: { note: 'Automatiserade sekvenser, prognos, spelböcker.' },
});

// ── Fortnox — verifierat listpris maj 2026 ──
console.log('📦  Fortnox…');
await seed({
  supplier: 'fortnox', product: 'Fortnox Lön', tier: 'lon',
  category: 'loneadmin', priceMonthly: 199, priceAnnual: 199 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.fortnox.se/produkt/prislista',
  confidence: 0.97, lastVerified: '2026-05-22',
  metadata: {
    note: '199 kr/mth fast avgift + 25 kr/anst/mth + 5 kr/lönebesked (Kivra).',
    perEmployeeMonthly: 25,
    perPayslip: 5,
  },
});
await seed({
  supplier: 'fortnox', product: 'Fortnox Bokföring + Fakturering', tier: 'bas',
  category: 'saas-finance', priceMonthly: 399, priceAnnual: 399 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.fortnox.se/priser',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'Bas-paket: bokföring + fakturering + bankkoppling.' },
});

// ── Visma eEkonomi ──
console.log('📦  Visma eEkonomi…');
await seed({
  supplier: 'visma', product: 'Visma eEkonomi Smart', tier: 'smart',
  category: 'saas-finance', priceMonthly: 249, priceAnnual: 249 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://vismaeekonomii.se/priser',
  confidence: 0.85, lastVerified: '2026-05-01',
  metadata: { note: 'Enkel bokföring, fakturering, kvitton. Upp till 1 användare.' },
});
await seed({
  supplier: 'visma', product: 'Visma eEkonomi Pro', tier: 'pro',
  category: 'saas-finance', priceMonthly: 399, priceAnnual: 399 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://vismaeekonomii.se/priser',
  confidence: 0.85, lastVerified: '2026-05-01',
  metadata: { note: 'Mer avancerad rapportering, flera användare.' },
});

// ── Bokio ──
console.log('📦  Bokio…');
await seed({
  supplier: 'bokio', product: 'Bokio Business Pro', tier: 'pro',
  category: 'saas-finance', priceMonthly: 149, priceAnnual: 149 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.bokio.se/priser',
  confidence: 0.84, lastVerified: '2026-05-01',
  metadata: { note: 'Bokföring + moms + lön. Enklast och billigast för solobolag.' },
});

// ── Tele2 Företag mobil — verifierat LIVE 2026-06-14 (Playwright, 24 mån bindning) ──
console.log('📦  Tele2 Företag mobil…');
await seed({
  supplier: 'tele2', product: 'Tele2 Företag 60 GB', tier: 'entre',
  category: 'mobil', priceMonthly: 239, priceAnnual: 239 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.tele2.se/foretag/mobilabonnemang',
  confidence: 0.93, lastVerified: '2026-06-14',
  metadata: { note: '60 GB data, 24 mån bindning (faktiskt B2B-pris). Ordinarie 399 kr utan bindning.' },
});
await seed({
  supplier: 'tele2', product: 'Tele2 Företag Obegränsad', tier: 'obegransad',
  category: 'mobil', priceMonthly: 279, priceAnnual: 279 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.tele2.se/foretag/mobilabonnemang',
  confidence: 0.93, lastVerified: '2026-06-14',
  metadata: { note: 'Obegränsad surf, 24 mån bindning. Ordinarie 499 kr utan bindning.' },
});
await seed({
  supplier: 'tele2', product: 'Tele2 Företag Obegränsad Max', tier: 'obegransad_max',
  category: 'mobil', priceMonthly: 299, priceAnnual: 299 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.tele2.se/foretag/mobilabonnemang',
  confidence: 0.93, lastVerified: '2026-06-14',
  metadata: { note: 'Obegränsad surf + prioriterad nätkapacitet, 24 mån bindning. Ordinarie 599 kr utan bindning.' },
});

// ── Telia Företag mobil ──
console.log('📦  Telia Företag mobil…');
await seed({
  supplier: 'telia', product: 'Telia Företag Frihet', tier: 'frihet',
  category: 'mobil', priceMonthly: 349, priceAnnual: 349 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.telia.se/foretag/mobiltelefoni',
  confidence: 0.80, lastVerified: '2026-05-01',
  metadata: { note: 'Estimerat — verifieras av price-monitor vid nästa körning.' },
});
await seed({
  supplier: 'telia', product: 'Telia Företag Frihet Max', tier: 'frihet-max',
  category: 'mobil', priceMonthly: 449, priceAnnual: 449 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.telia.se/foretag/mobiltelefoni',
  confidence: 0.78, lastVerified: '2026-05-01',
  metadata: { note: 'Estimerat — premiumabonnemang med prioriterad kapacitet.' },
});

// ── Telenor Företag mobil ──
console.log('📦  Telenor Företag mobil…');
await seed({
  supplier: 'telenor', product: 'Telenor Företag Flex', tier: 'flex',
  category: 'mobil', priceMonthly: 299, priceAnnual: 299 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.telenor.se/foretag/mobiltelefon',
  confidence: 0.78, lastVerified: '2026-05-01',
  metadata: { note: 'Estimerat — verifieras av price-monitor.' },
});

// ── Tre Företag mobil ──
console.log('📦  Tre Företag mobil…');
await seed({
  supplier: 'tre', product: 'Tre Företag Obegränsat Bas', tier: 'bas',
  category: 'mobil', priceMonthly: 249, priceAnnual: 249 * 12,
  priceUnit: 'per_seat', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.tre.se/foretag/abonnemang',
  confidence: 0.78, lastVerified: '2026-05-01',
  metadata: { note: 'Estimerat — lägst kostnad bland de stora operatörerna.' },
});

// ── Bredband ──
console.log('📦  Bredband…');
await seed({
  supplier: 'tele2', product: 'Tele2 Företag Fiber 1200 Mbit', tier: 'fiber-1200',
  category: 'bredband', priceMonthly: 849, priceAnnual: 849 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.tele2.se/foretag/bredband',
  confidence: 0.91, lastVerified: '2026-05-22',
  metadata: { note: '1 200 Mbit/s symmetrisk fiber.' },
});
await seed({
  supplier: 'bahnhof', product: 'Bahnhof Företag Fiber 1 Gbit', tier: 'fiber-1gbit',
  category: 'bredband', priceMonthly: 995, priceAnnual: 995 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.bahnhof.se/foretag/internet',
  confidence: 0.91, lastVerified: '2026-05-22',
  metadata: { note: '1 Gbit/s symmetrisk fiber, ingen trafikstyrning.' },
});

// ── Kortterminal ──
console.log('📦  Kortterminal…');
await seed({
  supplier: 'sumup', product: 'SumUp Transaktionsavgift', tier: 'standard',
  category: 'kortterminal', priceMonthly: null, priceAnnual: null,
  priceUnit: 'per_transaction_pct', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://sumup.com/sv-se/',
  confidence: 0.91, lastVerified: '2026-05-22',
  metadata: { transactionRatePct: 1.75, note: '~1,75 % per transaktion, ingen månadsavgift.' },
});
await seed({
  supplier: 'zettle', product: 'Zettle Transaktionsavgift', tier: 'standard',
  category: 'kortterminal', priceMonthly: null, priceAnnual: null,
  priceUnit: 'per_transaction_pct', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.zettle.com/se/priser',
  confidence: 0.93, lastVerified: '2026-05-22',
  metadata: { transactionRatePct: 1.75, note: '1,75 % per transaktion, ingen månadsavgift.' },
});
await seed({
  supplier: 'stripe', product: 'Stripe Terminal (EEA)', tier: 'standard',
  category: 'kortterminal', priceMonthly: null, priceAnnual: null,
  priceUnit: 'per_transaction_pct', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://stripe.com/se/pricing',
  confidence: 0.90, lastVerified: '2026-05-01',
  metadata: { transactionRatePct: 1.50, transactionFixedSEK: 1.50, note: '~1,5 % + ~1,50 kr/transaktion.' },
});

// ── Larm & bevakning ──
console.log('📦  Larm & bevakning…');
await seed({
  supplier: 'sector alarm', product: 'Sector Alarm Företag Bas', tier: 'bas',
  category: 'larm-bevakning', priceMonthly: 299, priceAnnual: 299 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.sectoralarm.se/foretag',
  confidence: 0.88, lastVerified: '2026-05-22',
  metadata: { note: 'Larmövervakning + larmcentral. Utrustning ingår i 36-mån avtal.' },
});
await seed({
  supplier: 'verisure', product: 'Verisure Företag Standard', tier: 'standard',
  category: 'larm-bevakning', priceMonthly: 399, priceAnnual: 399 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.verisure.se/foretag-och-organisationer',
  confidence: 0.82, lastVerified: '2026-05-01',
  metadata: { note: 'Estimerat — inkl. kameraövervakning. Verifieras av price-monitor.' },
});

// ── El ──
console.log('📦  El / energi…');
await seed({
  supplier: 'tibber', product: 'Tibber Spotpris', tier: 'spot',
  category: 'el', priceMonthly: 39, priceAnnual: 39 * 12,
  priceUnit: 'per_subscription', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://tibber.com/se/foretag',
  confidence: 0.88, lastVerified: '2026-05-01',
  metadata: { note: 'Spotpris per timme + 39 kr/mth abonnemangsavgift. Lägst effektivt pris vid låg förbrukning.' },
});
await seed({
  supplier: 'skatteverket', product: 'Energiskatt 2026', tier: '2026',
  category: 'el', priceMonthly: null, priceAnnual: null,
  priceUnit: 'per_kwh', currency: 'SEK',
  sourceType: 'official_web', sourceUrl: 'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.html',
  confidence: 0.99, lastVerified: '2026-05-22',
  metadata: { pricePerKwh: 0.360, note: 'Energiskatt 36,0 öre/kWh fr.o.m. 1 jan 2026. Sänkt från 43,9 öre.' },
});

// ── Summering ─────────────────────────────────────────────────────────────────
console.log(`\n✅  Seeding klar:`)
console.log(`   Nya poster:         ${inserted}`);
console.log(`   Prisändringar:      ${updated}`);
console.log(`   Oförändrade:        ${unchanged}`);
console.log(`   Totalt bearbetat:   ${inserted + updated + unchanged}`);
