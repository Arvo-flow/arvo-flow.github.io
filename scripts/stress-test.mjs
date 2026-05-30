#!/usr/bin/env node
// scripts/stress-test.mjs
// Kör extract-steget mot alla PDF:er i test-pdfs/ och jämför mot kända
// förväntade värden (GOLDEN MASTER). Verifierar även att is_addon och
// addon_type är korrekt satta efter refaktorn.
//
// Användning:
//   node scripts/stress-test.mjs              # alla PDF:er
//   node scripts/stress-test.mjs ricoh.pdf    # enskild fil

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env') });

const { extractInvoice, routeExtraction } = await import(
  join(ROOT, 'agents/test-invoice/extract.js')
);

// ── Färger ────────────────────────────────────────────────────────────────────
const R = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const RED  = '\x1b[31m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const GRY  = '\x1b[90m';
const CYA  = '\x1b[36m';

const SEK = (n) => n == null ? '—' : `${n.toLocaleString('sv-SE')} kr`;
const PCT = (n) => n == null ? '—' : `${(n * 100).toFixed(0)} %`;

function routeTag(route) {
  const colors = { auto: GRN, review_queue: YEL, unsupported: GRY };
  return `${colors[route] ?? ''}${BOLD}[${route.toUpperCase()}]${R}`;
}

const TYPE_SHORT = {
  recurring_subscription: 'ÅTER',
  variable_usage:         'RÖRLIG',
  one_time_fee:           'ENGÅNG',
  hardware:               'HW',
};

// ── Golden master — förväntade värden per känd PDF ────────────────────────────
// Baserat på CLAUDE.md verifierade testresultat + nya is_addon-assertions.
// Filnamn-matchning är case-insensitive prefix (telia → telia.pdf, telia_maj.pdf osv.)
const GOLDEN = [
  // ── GlobalCom Networks — tabellformat seatCount + Zon 4 roaming ────────────────────────────
  // Testar att extraktorn läser "Antal"-kolumnen i mobilfaktura (5 × 349 kr).
  // Om seatCount tappar bort faller benchmarken mot employees=25 och vi missar besparingen.
  {
    match: /Faktura_1/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount === 5 (läst från Antal-kolumn i tabellrad)',
        fn: (e) => e.seatCount === 5,
      },
      {
        label: 'recurringAmount === 1 745 kr (5 × 349 kr)',
        fn: (e) => e.recurringAmount === 1_745,
      },
      {
        label: 'annualCost === 20 940 kr (1 745 × 12)',
        fn: (e) => e.annualCost === 20_940,
      },
      {
        label: 'Hårdvara (iPhone) klassas som hardware, ej recurring',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'hardware' && /iphone|apple/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Satellit/Sjöfart klassas som variable_usage',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'variable_usage' && /satellit|sjöfart|zon.?4/i.test(l.description ?? '')
        ),
      },
      {
        label: 'roamingZone === 4 (Zon 4 - Satellit/Sjöfart)',
        fn: (e) => e.roamingZone === 4,
      },
    ],
  },

  // ── Riktiga kundfakturor — regression mot faktiska kundinladdningar ─────────────────────────
  // Dessa måste stå FÖRE generiska mönster (telia, microsoft, ricoh) som annars träffar dem.
  // Värden fastställda 2026-05-30 med CONFIDENCE_THRESHOLD=0.70.
  {
    match: /customer-telia/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Telia',            fn: (e) => /telia/i.test(e.supplier ?? '') },
      { label: 'seatCount === 45',                     fn: (e) => e.seatCount === 45 },
      { label: 'recurringAmount === 22 410 kr',        fn: (e) => e.recurringAmount === 22_410 },
      { label: 'annualCost === 268 920 kr',            fn: (e) => e.annualCost === 268_920 },
      { label: 'billingPeriod monthly',                fn: (e) => e.billingPeriod === 'monthly' },
      { label: 'har variable_usage (roaming)',         fn: (e) => (e.lineItems ?? []).some(l => l.type === 'variable_usage') },
    ],
  },
  {
    match: /customer-bahnhof/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Bahnhof',          fn: (e) => /bahnhof/i.test(e.supplier ?? '') },
      { label: 'annualCost === 43 788 kr',             fn: (e) => e.annualCost === 43_788 },
      { label: 'recurringAmount === 3 649 kr',         fn: (e) => e.recurringAmount === 3_649 },
      { label: 'billingPeriod monthly',                fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /customer-salesforce/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Salesforce',       fn: (e) => /salesforce/i.test(e.supplier ?? '') },
      { label: 'seatCount === 25',                     fn: (e) => e.seatCount === 25 },
      { label: 'annualCost === 382 500 kr',            fn: (e) => e.annualCost === 382_500 },
      { label: 'billingPeriod annual (årsavi)',         fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /customer-fortnox/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Fortnox',          fn: (e) => /fortnox/i.test(e.supplier ?? '') },
      { label: 'seatCount === 60 (max från Kvitto & Utlägg)', fn: (e) => e.seatCount === 60 },
      { label: 'recurringAmount === 4 728 kr',         fn: (e) => e.recurringAmount === 4_728 },
      { label: 'annualCost === 56 736 kr',             fn: (e) => e.annualCost === 56_736 },
      { label: 'billingPeriod monthly',                fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /customer-microsoft/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Microsoft',        fn: (e) => /microsoft/i.test(e.supplier ?? '') },
      { label: 'seatCount === 60',                     fn: (e) => e.seatCount === 60 },
      { label: 'recurringAmount === 15 780 kr',        fn: (e) => e.recurringAmount === 15_780 },
      { label: 'annualCost === 189 360 kr',            fn: (e) => e.annualCost === 189_360 },
      { label: 'billingPeriod monthly',                fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /customer-ricoh/i,
    route:         'auto',
    minConfidence: 0.70,
    checks: [
      { label: 'supplier innehåller Ricoh',            fn: (e) => /ricoh/i.test(e.supplier ?? '') },
      { label: 'annualCost === 14 000 kr',             fn: (e) => e.annualCost === 14_000 },
      { label: 'recurringAmount === 3 500 kr (kvartal)', fn: (e) => e.recurringAmount === 3_500 },
      { label: 'har variable_usage (klickkostnader)',  fn: (e) => (e.lineItems ?? []).some(l => l.type === 'variable_usage') },
    ],
  },

  // ── Review-queue — ska INTE processas automatiskt ─────────────────────────
  // Om dessa börjar gå igenom (route → auto) utan att prompten ändrats bör det granskas.
  { match: /^vattenfall\.pdf$/i,          route: 'review_queue', checks: [] }, // OBS: före vattenfall-el-se4
  { match: /^aws-startup-kredit\.pdf$/i,  route: 'review_queue', checks: [] },
  { match: /^omnicloud\.pdf$/i,           route: 'review_queue', checks: [] },
  { match: /^oklar-blandad-faktura\.pdf$/i, route: 'review_queue', checks: [] },
  // unclear.pdf is Kalles Alltjänst — model oscillates between review_queue and unsupported
  { match: /^unclear\.pdf$/i, routeFn: (r) => r === 'review_queue' || r === 'unsupported', checks: [] },

  // ── Unsupported — utanför scope ───────────────────────────────────────────
  { match: /^outofscope\.pdf$/i,          route: 'unsupported',  checks: [] },
  { match: /^Faktura_4\.pdf$/i,           route: 'unsupported',  checks: [] },
  { match: /^konsult-it-oklar\.pdf$/i,    route: 'unsupported',  checks: [] },

  // ── SaaS / Mjukvara ──────────────────────────────────────────────────────
  {
    match: /^Faktura_2\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 120 000 kr', fn: (e) => e.annualCost === 120_000 },
      { label: 'seatCount === 50',          fn: (e) => e.seatCount === 50 },
      { label: 'billingPeriod annual',      fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /^Faktura_3\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 120 000 kr', fn: (e) => e.annualCost === 120_000 },
      { label: 'seatCount === 50',          fn: (e) => e.seatCount === 50 },
      { label: 'billingPeriod annual',      fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /^adobe-creative-cloud-ars\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Adobe',       fn: (e) => /adobe/i.test(e.supplier ?? '') },
      { label: 'seatCount 20–30',          fn: (e) => e.seatCount >= 20 && e.seatCount <= 30 },
      { label: 'annualCost === 157 500 kr', fn: (e) => e.annualCost === 157_500 },
      { label: 'billingPeriod annual',    fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /^atlassian-cloud-manad\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Atlassian',   fn: (e) => /atlassian/i.test(e.supplier ?? '') },
      { label: 'seatCount === 35',        fn: (e) => e.seatCount === 35 },
      { label: 'annualCost === 77 436 kr', fn: (e) => e.annualCost === 77_436 },
      { label: 'billingPeriod monthly',   fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^atlassian\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Atlassian',     fn: (e) => /atlassian/i.test(e.supplier ?? '') },
      { label: 'seatCount === 110',         fn: (e) => e.seatCount === 110 },
      { label: 'annualCost === 330 000 kr', fn: (e) => e.annualCost === 330_000 },
    ],
  },
  {
    match: /^cloudreseller-norden\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'seatCount 55–85',              fn: (e) => e.seatCount >= 55 && e.seatCount <= 85 },
      { label: 'annualCost === 184 260 kr',   fn: (e) => e.annualCost === 184_260 },
      { label: 'billingPeriod monthly',       fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^google-workspace-arsbetalning\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Google',      fn: (e) => /google/i.test(e.supplier ?? '') },
      { label: 'seatCount === 20',        fn: (e) => e.seatCount === 20 },
      { label: 'annualCost === 29 160 kr', fn: (e) => e.annualCost === 29_160 },
      { label: 'billingPeriod annual',    fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /^hubspot-marketing-pro\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är HubSpot',       fn: (e) => /hubspot/i.test(e.supplier ?? '') },
      { label: 'seatCount === 15',          fn: (e) => e.seatCount === 15 },
      { label: 'annualCost === 178 200 kr', fn: (e) => e.annualCost === 178_200 },
      { label: 'billingPeriod quarterly',   fn: (e) => e.billingPeriod === 'quarterly' },
    ],
  },
  {
    match: /^salesforce-enterprise\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Salesforce',    fn: (e) => /salesforce/i.test(e.supplier ?? '') },
      { label: 'seatCount === 35',          fn: (e) => e.seatCount === 35 },
      { label: 'annualCost === 715 000 kr', fn: (e) => e.annualCost === 715_000 },
      { label: 'billingPeriod quarterly',   fn: (e) => e.billingPeriod === 'quarterly' },
    ],
  },

  // ── Mobil ────────────────────────────────────────────────────────────────
  {
    match: /^comviq-data-tal\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Comviq/Tele2', fn: (e) => /comviq|tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 10',         fn: (e) => e.seatCount === 10 },
      { label: 'annualCost === 21 456 kr', fn: (e) => e.annualCost === 21_456 },
      { label: 'har variable_usage (övertrafik)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    match: /^comviq-mobil-budget\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Comviq/Tele2', fn: (e) => /comviq|tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 6',          fn: (e) => e.seatCount === 6 },
      { label: 'annualCost === 12 888 kr', fn: (e) => e.annualCost === 12_888 },
      { label: 'har variable_usage (datatillägg)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    match: /^connectsverige\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'seatCount === 20',           fn: (e) => e.seatCount === 20 },
      { label: 'annualCost === 107 520 kr',  fn: (e) => e.annualCost === 107_520 },
      { label: 'inlösen HW klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && l.amount > 0) },
    ],
  },
  {
    match: /^globalcom-mobil-hog-roaming\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'seatCount === 5',          fn: (e) => e.seatCount === 5 },
      { label: 'annualCost === 20 940 kr', fn: (e) => e.annualCost === 20_940 },
      { label: 'har variable_usage (Zon 4 roaming)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    match: /^tele2-mobil-arsavtal\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Tele2',        fn: (e) => /tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 8',          fn: (e) => e.seatCount === 8 },
      { label: 'annualCost === 34 908 kr', fn: (e) => e.annualCost === 34_908 },
      { label: 'billingPeriod annual',     fn: (e) => e.billingPeriod === 'annual' },
    ],
  },
  {
    match: /^tele2-mobil-enkel\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Tele2',        fn: (e) => /tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 10',         fn: (e) => e.seatCount === 10 },
      { label: 'annualCost === 36 468 kr', fn: (e) => e.annualCost === 36_468 },
    ],
  },
  {
    // Kreditfaktura: run-rate baseras på aktiva linjer, ej nettofaktura efter kreditering.
    match: /^tele2-mobil-kreditfaktura\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Tele2',           fn: (e) => /tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 18',            fn: (e) => e.seatCount === 18 },
      { label: 'recurringAmount === 8 082 kr (ej reducerat av kreditrader)', fn: (e) => e.recurringAmount === 8_082 },
      { label: 'krediteringar klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && l.amount < 0) },
      { label: 'har variable_usage (roaming)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    match: /^tele2-mobil-roaming\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Tele2',         fn: (e) => /tele2/i.test(e.supplier ?? '') },
      { label: 'seatCount === 25',          fn: (e) => e.seatCount === 25 },
      { label: 'annualCost === 134 700 kr', fn: (e) => e.annualCost === 134_700 },
      { label: 'har variable_usage (roaming)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    // Pro-rata rader är engångsjusteringar — ingår inte i recurring run-rate.
    match: /^telenor-mobil-prorata\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Telenor',          fn: (e) => /telenor/i.test(e.supplier ?? '') },
      { label: 'seatCount === 12',             fn: (e) => e.seatCount === 12 },
      { label: 'recurringAmount === 3 790 kr (prorata ej inkluderat)', fn: (e) => e.recurringAmount === 3_790 },
      { label: 'prorata klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && /pro.?rata/i.test(l.description ?? '')) },
    ],
  },
  {
    match: /^telenor-mobil-standard\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Telenor',          fn: (e) => /telenor/i.test(e.supplier ?? '') },
      { label: 'seatCount === 23',             fn: (e) => e.seatCount === 23 },
      { label: 'annualCost === 118 248 kr',    fn: (e) => e.annualCost === 118_248 },
      { label: 'har variable_usage (roaming)', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage') },
    ],
  },
  {
    match: /^telenor-molnvaxel-stor\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Telenor',          fn: (e) => /telenor/i.test(e.supplier ?? '') },
      { label: 'seatCount === 45',             fn: (e) => e.seatCount === 45 },
      { label: 'annualCost === 263 448 kr',    fn: (e) => e.annualCost === 263_448 },
      { label: 'molnväxel märkt som pbx add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'pbx') },
    ],
  },
  {
    match: /^tre-mobil-molnvaxel\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Hi3G/3',          fn: (e) => /hi3g|3 f/i.test(e.supplier ?? '') },
      { label: 'seatCount === 12',            fn: (e) => e.seatCount === 12 },
      { label: 'annualCost === 72 888 kr',    fn: (e) => e.annualCost === 72_888 },
      { label: 'molnväxel märkt som pbx add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'pbx') },
    ],
  },

  // ── Bredband ─────────────────────────────────────────────────────────────
  {
    match: /^bahnhof-fiber-ren\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Bahnhof',      fn: (e) => /bahnhof/i.test(e.supplier ?? '') },
      { label: 'annualCost === 8 388 kr',  fn: (e) => e.annualCost === 8_388 },
      { label: 'billingPeriod monthly',    fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    // Välkomstrabatt är one_time_fee — recurring baseras på ordinarie pris 698 kr, inte kampanjpriset.
    match: /^bredband-nytt-avtal-rabatt\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Telenor',                     fn: (e) => /telenor/i.test(e.supplier ?? '') },
      { label: 'recurringAmount === 698 kr (ordinarie, ej rabatt)', fn: (e) => e.recurringAmount === 698 },
      { label: 'annualCost === 8 376 kr',                 fn: (e) => e.annualCost === 8_376 },
      { label: 'välkomstrabatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && l.amount < 0) },
    ],
  },
  {
    match: /^bredband_1_baseline\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 9 588 kr', fn: (e) => e.annualCost === 9_588 },
      { label: 'billingPeriod monthly',   fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^bredband_2_sveakom\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 31 752 kr', fn: (e) => e.annualCost === 31_752 },
      { label: 'SLA märkt som sla add-on',     fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'sla') },
      { label: 'statisk IP märkt som add-on',  fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'static_ip') },
      { label: 'brandvägg märkt som add-on',   fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'firewall') },
    ],
  },
  {
    // Kampanjrabatt knuten till bindningstid = löpande prisreduktion, ingår i recurring.
    match: /^bredband_3\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'recurringAmount === 399 kr (netto efter bindningsrabatt)', fn: (e) => e.recurringAmount === 399 },
      { label: 'annualCost === 4 788 kr',  fn: (e) => e.annualCost === 4_788 },
    ],
  },
  {
    match: /^bredband_4\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 7 788 kr',  fn: (e) => e.annualCost === 7_788 },
      { label: 'billingPeriod quarterly',  fn: (e) => e.billingPeriod === 'quarterly' },
    ],
  },
  {
    // Tidsbegränsad rabatt (mån 8/12) = one_time_fee — recurring = ordinarie pris 799 kr.
    match: /^bredbandsbolaget-kampanj\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'recurringAmount === 799 kr (ordinarie, ej kampanjpriset 599)', fn: (e) => e.recurringAmount === 799 },
      { label: 'annualCost === 9 588 kr',                   fn: (e) => e.annualCost === 9_588 },
      { label: 'tidsbegränsad rabatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && l.amount < 0) },
    ],
  },
  {
    match: /^iponly-fiber-addon-stack\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 39 540 kr', fn: (e) => e.annualCost === 39_540 },
      { label: 'SLA märkt som add-on',     fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'sla') },
      { label: 'statisk IP märkt som add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'static_ip') },
      { label: 'brandvägg märkt som add-on',  fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true && l.addon_type === 'firewall') },
    ],
  },
  {
    match: /^stadsnät-koaxial-tv\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost 10 000–16 000 kr', fn: (e) => e.annualCost >= 10_000 && e.annualCost <= 16_000 },
      { label: 'kabel-TV/streaming märkt som add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true) },
    ],
  },

  // ── Cloud / Infrastructure ────────────────────────────────────────────────
  {
    // annualCost ska spegla BARA Cygate Managed Cloud (4 500 kr/mån × 12), inte variabel AWS-förbrukning.
    match: /^aws-reseller-komplex\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 54 000 kr (Managed Cloud, ej AWS-variabel)', fn: (e) => e.annualCost === 54_000 },
      { label: 'AWS-rader klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /aws|ec2|rds|s3/i.test(l.description ?? '')) },
      { label: 'Managed Cloud märkt som add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true) },
    ],
  },
  {
    // annualCost ska bara inkludera Advania Cloud Management (5 500 × 12 = 66 000), inte variabel Azure-förbrukning.
    match: /^azure-csp-reseller\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 66 000 kr (Managed, ej Azure-variabel)', fn: (e) => e.annualCost === 66_000 },
      { label: 'Azure-förbrukning klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /azure/i.test(l.description ?? '')) },
      { label: 'Managed Cloud märkt som add-on', fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true) },
    ],
  },

  // ── Managed print (Canon) ─────────────────────────────────────────────────
  {
    match: /^canon-hog-klickratio\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är Canon',         fn: (e) => /canon/i.test(e.supplier ?? '') },
      { label: 'annualCost === 28 800 kr (maskinhyra × 12)', fn: (e) => e.annualCost === 28_800 },
      { label: 'klickkostnader klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /klic|sida|färg|svart/i.test(l.description ?? '')) },
      { label: 'maskinhyra klassas som recurring_subscription', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'recurring_subscription' && /hyra/i.test(l.description ?? '')) },
    ],
  },

  // ── El ───────────────────────────────────────────────────────────────────
  // Gemensam regel: energiskatt är one_time_fee — ingår inte i annualCost.
  // Nätabonnemang och nätöverföring klassas som recurring.
  {
    match: /^eon-el-solceller\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är E.ON',         fn: (e) => /e\.on|eon/i.test(e.supplier ?? '') },
      { label: 'annualCost === 37 140 kr', fn: (e) => e.annualCost === 37_140 },
      { label: 'solcellskreditering klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && l.amount < 0) },
    ],
  },
  {
    match: /^eon-el-spot-se3\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är E.ON',          fn: (e) => /e\.on|eon/i.test(e.supplier ?? '') },
      { label: 'annualCost === 113 448 kr', fn: (e) => e.annualCost === 113_448 },
      { label: 'energiskatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && /energiskatt/i.test(l.description ?? '')) },
    ],
  },
  {
    match: /^fortum-el-fastpris\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är Fortum',       fn: (e) => /fortum/i.test(e.supplier ?? '') },
      { label: 'annualCost === 57 312 kr', fn: (e) => e.annualCost === 57_312 },
      { label: 'energiskatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && /energiskatt/i.test(l.description ?? '')) },
    ],
  },
  {
    // annualCost varierar beroende på om modellen inkluderar nätöverföring i run-rate
    // (893 × 12 = 10 716 eller 1 320 × 12 = 15 840) — range-check för stabilitet.
    match: /^kraftringen-el-lokalt\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är Kraftringen',                   fn: (e) => /kraftringen/i.test(e.supplier ?? '') },
      { label: 'annualCost i rimligt intervall 9 000–20 000 kr', fn: (e) => (e.annualCost ?? 0) >= 9_000 && (e.annualCost ?? 0) <= 20_000 },
      { label: 'billingPeriod monthly',                     fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^kristianstad\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'annualCost === 20 232 kr', fn: (e) => e.annualCost === 20_232 },
      { label: 'billingPeriod monthly',    fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^tibber-el-timavrakning\.pdf$/i,
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är Tibber',       fn: (e) => /tibber/i.test(e.supplier ?? '') },
      { label: 'annualCost === 26 796 kr', fn: (e) => e.annualCost === 26_796 },
      { label: 'energiskatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && /energiskatt/i.test(l.description ?? '')) },
    ],
  },
  {
    match: /^tryggel\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 69 360 kr', fn: (e) => e.annualCost === 69_360 },
      { label: 'billingPeriod monthly',    fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },
  {
    match: /^vattenfall-el-se4\.pdf$/i,  // OBS: FÖRE broad /vattenfall/i om sådant läggs till
    route: 'auto', minConfidence: 0.85,
    checks: [
      { label: 'supplier är Vattenfall',   fn: (e) => /vattenfall/i.test(e.supplier ?? '') },
      { label: 'annualCost === 79 908 kr', fn: (e) => e.annualCost === 79_908 },
      { label: 'energiskatt klassas som one_time_fee', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'one_time_fee' && /energiskatt/i.test(l.description ?? '')) },
    ],
  },

  // ── Logistik / Frakt ──────────────────────────────────────────────────────
  // Gemensam regel: drivmedelstillägg (DMT) klassas som variable_usage.
  {
    match: /^dhl-frakt-standard\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är DHL',           fn: (e) => /dhl/i.test(e.supplier ?? '') },
      { label: 'annualCost === 361 824 kr', fn: (e) => e.annualCost === 361_824 },
      { label: 'drivmedelstillägg klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /drivmedel|dmt/i.test(l.description ?? '')) },
    ],
  },
  {
    match: /^nordiclogistik\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är NordicLogistik', fn: (e) => /nordic|logistik/i.test(e.supplier ?? '') },
      { label: 'annualCost === 322 800 kr',  fn: (e) => e.annualCost === 322_800 },
      { label: 'DMT klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /dmt|drivmedel/i.test(l.description ?? '')) },
    ],
  },
  {
    match: /^postnord-brev-paket\.pdf$/i,
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'supplier är PostNord',      fn: (e) => /postnord/i.test(e.supplier ?? '') },
      { label: 'annualCost === 591 840 kr', fn: (e) => e.annualCost === 591_840 },
      { label: 'drivmedelstillägg klassas som variable_usage', fn: (e) => (e.lineItems ?? []).some((l) => l.type === 'variable_usage' && /drivmedel|dt/i.test(l.description ?? '')) },
    ],
  },

  // ── Övrigt ────────────────────────────────────────────────────────────────
  {
    match: /^mixad-it-frakt\.pdf$/i,
    route: 'auto', minConfidence: 0.75,
    checks: [
      { label: 'potentialMixedCategories = true', fn: (e) => e.potentialMixedCategories === true },
      { label: 'annualCost === 369 600 kr',       fn: (e) => e.annualCost === 369_600 },
    ],
  },
  {
    match: /^stadbolag-outofscope\.pdf$/i,  // Städbolag = förhandlingsbar B2B — korrekt auto
    route: 'auto', minConfidence: 0.90,
    checks: [
      { label: 'annualCost === 457 200 kr', fn: (e) => e.annualCost === 457_200 },
      { label: 'billingPeriod monthly',     fn: (e) => e.billingPeriod === 'monthly' },
    ],
  },

  // ── Telia fiber + statisk IP (fil-specifik — måste stå FÖRE den breda /telia/i-matchningen) ─
  {
    match: /telia-fiber-statisk-ip/i,
    route:           'auto',
    minConfidence:   0.90,
    checks: [
      {
        label: 'Bredband-rad klassas som recurring_subscription (ej addon)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && l.is_addon === false &&
                 /bredband|fiber|internet/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Statisk IP klassas som recurring_subscription med is_addon:true addon_type:"static_ip"',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && l.addon_type === 'static_ip' &&
                 /statisk.*ip|fast.*ip/i.test(l.description ?? '')
        ),
      },
    ],
  },
  {
    match: /telia/i,
    route:           'auto',
    minConfidence:   0.90,
    checks: [
      {
        label: 'Roaming/övertrafik klassas som variable_usage',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'variable_usage' && /roaming|övertrafik|extra data/i.test(l.description)
        ),
      },
      {
        label: 'Bas-abonnemang klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && /abonnemang|mobilplan|jobbmobil/i.test(l.description)
        ),
      },
      {
        label: 'Inga rader felaktigt märkta is_addon på ren mobilfaktura',
        fn: (e) => !(e.lineItems ?? []).some(
          (l) => l.is_addon === true && /abonnemang|mobilplan|jobbmobil/i.test(l.description)
        ),
      },
      {
        label: 'annualCost i rimligt SEK-intervall (5 000–500 000) — fångar valutamiss',
        fn: (e) => (e.annualCost ?? 0) > 5_000 && (e.annualCost ?? 0) < 500_000,
      },
    ],
  },
  {
    match: /ricoh|konica|managed.?print|skrivar/i,
    route:           'auto',
    minConfidence:   0.90,
    checks: [
      {
        label: 'Klickkostnader (sida) klassas som variable_usage',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'variable_usage' && /klic|sida|page|svart|färg|color/i.test(l.description)
        ),
      },
      {
        label: 'Fast maskinhyra klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && /hyra|leasing|maskin|service/i.test(l.description)
        ),
      },
      {
        label: 'Klickkostnader är INTE märkta is_addon (de är rörliga, inte addons)',
        fn: (e) => !(e.lineItems ?? []).some(
          (l) => l.is_addon === true && /klic|sida|page/i.test(l.description)
        ),
      },
      {
        label: 'annualCost i rimligt SEK-intervall (10 000–350 000) — fångar valutamiss',
        fn: (e) => (e.annualCost ?? 0) > 10_000 && (e.annualCost ?? 0) < 350_000,
      },
    ],
  },
  // ── Microsoft 365 — filspecifika golden masters (OBS: före bred fallback) ───
  // Varje M365-faktura har sitt eget seatCount — det breda /m365/-mönstret
  // kan inte hårdkoda seatCount=57 utan att fela på alla andra M365-filer.
  {
    match: /^atea-m365-overskott\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount = 60',
        fn: (e) => e.seatCount === 60,
      },
      {
        label: 'Business Premium är recurring_subscription (ej add-on)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && !l.is_addon && /business.*premium/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Defender och/eller Azure AD märkta som add-on',
        fn: (e) => {
          const addons = (e.lineItems ?? []).filter((l) => l.is_addon === true);
          // If no add-ons extracted at all, pass; if add-ons present, at least one must be Defender/Azure AD
          return addons.length === 0 || addons.some((l) => /defender|azure.*ad/i.test(l.description ?? ''));
        },
      },
      {
        label: 'pricePerSeatMonthly beräknat',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
    ],
  },
  {
    match: /^crayon-m365-azure\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount = 28',
        fn: (e) => e.seatCount === 28,
      },
      {
        label: 'E3-licenser klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && /\bE3\b/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Azure-förbrukning klassas som variable_usage',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'variable_usage' && /azure/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Managed Services märkt som add-on',
        fn: (e) => (e.lineItems ?? []).some((l) => l.is_addon === true),
      },
      {
        label: 'pricePerSeatMonthly beräknat',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
    ],
  },
  {
    match: /^dustin-m365-standard\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount = 40',
        fn: (e) => e.seatCount === 40,
      },
      {
        label: 'Alla licenser klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).every((l) => l.type === 'recurring_subscription'),
      },
      {
        label: 'pricePerSeatMonthly beräknat',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
    ],
  },
  {
    match: /^microsoft-direkt-usd\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'seatCount = 15',
        fn: (e) => e.seatCount === 15,
      },
      {
        label: 'Business Premium är recurring_subscription (ej add-on)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && !l.is_addon && /business.*premium/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Copilot märkt som add-on',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && /copilot/i.test(l.description ?? '')
        ),
      },
      {
        label: 'pricePerSeatMonthly beräknat',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
      // ── Valuta- och beloppskontrakt ─────────────────────────────────────────
      // USD-fakturor ska lämna extraktorn med currency=USD — konverteringen sker
      // sedan i API-lagret. Om extraktorn plötsligt returnerar SEK har vi en regression.
      {
        label: 'Valuta identifieras som USD (krävs för konverteringskedjan i API)',
        fn: (e) => e.currency === 'USD',
      },
      // annualCost ska vara i USD-magnitud (inte konverterat × 10). Om USD→SEK-steget
      // oavsiktligt sker INNE i extraktorn kommer värdet bli ~10× för stort här.
      {
        label: 'annualCost i rimligt USD-intervall (500–25 000) — fångar dubbel-konvertering',
        fn: (e) => (e.annualCost ?? 0) > 500 && (e.annualCost ?? 0) < 25_000,
      },
    ],
  },
  // ── Microsoft 365 — bred fallback (huvud-testfil microsoft.pdf, seatCount=57) ─
  {
    match: /microsoft|m365|365/i,
    route:           'auto',
    minConfidence:   0.90,
    checks: [
      {
        label: 'seatCount = 57',
        fn: (e) => e.seatCount === 57,
      },
      {
        label: 'Licensrader klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).every(
          (l) => l.type === 'recurring_subscription' || l.type === 'one_time_fee'
        ),
      },
      {
        label: 'Licensrader har is_addon: false (licenser är bastjänst)',
        fn: (e) => !(e.lineItems ?? []).some(
          (l) => l.is_addon === true && /business|premium|basic|e3|e5/i.test(l.description)
        ),
      },
      {
        label: 'pricePerSeatMonthly beräknat (ej null)',
        fn: (e) => e.pricePerSeatMonthly != null && e.pricePerSeatMonthly > 0,
      },
      {
        label: 'annualCost i rimligt SEK-intervall (50 000–700 000) — fångar valutamiss',
        fn: (e) => (e.annualCost ?? 0) > 50_000 && (e.annualCost ?? 0) < 700_000,
      },
    ],
  },
  {
    match: /advokatfirman|jurist|juridik|suddig/i,
    route:           'review_queue',
    checks: [],
  },
  {
    match: /kalles|alltjänst|städ|restaurang|mat/i,
    route:           'unsupported',
    checks: [],
  },
  // ── Bil-leasing — ALD Automotive ──────────────────────────────────────────
  // Filnamnet har "outofscope" men modellen klassar korrekt som auto:
  // leasing-bil är en förhandlingsbar B2B-tjänst (kräver offert via recommend).
  {
    match: /^ald-billeasing-outofscope\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'Leasingrader klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'recurring_subscription' && /leasing/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Serviceavtal märkt som sla add-on',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && l.addon_type === 'sla'
        ),
      },
    ],
  },
  // ── Bevakning — Securitas ─────────────────────────────────────────────────
  // Filnamnet har "outofscope" men modellen klassar korrekt som auto:
  // "Larm & bevakning är inom scope (förhandlingsbar tjänst)" — Confidence 93 %.
  {
    match: /^bevakning-outofscope\.pdf$/i,
    route:         'auto',
    minConfidence: 0.90,
    checks: [
      {
        label: 'Alla bevakningstjänster klassas som recurring_subscription',
        fn: (e) => (e.lineItems ?? []).every((l) => l.type === 'recurring_subscription'),
      },
    ],
  },
  // ── Telia kombinerad — explicit regressionstest ───────────────────────────
  // Rotorsak: CONFIDENCE_THRESHOLD 0.85 fick kombinationsfakturor att hamna i
  // review_queue. Telia mobil + bredband + roaming → naturligt ~0.75 confidence
  // utan instruktion. Fixt via prompt-regel + pre-routing fingerprint boost.
  // Confidence-krav: ≥ 0.90 (inte bara 0.85) — kombinerade rader ska inte sänka.
  {
    match: /^telia-mobil-bredband-kombinerad\.pdf$/i,
    route:           'auto',
    minConfidence:   0.90,
    checks: [
      {
        label: 'potentialMixedCategories = true',
        fn: (e) => e.potentialMixedCategories === true,
      },
      {
        label: 'Bredband-rad är bastjänst (is_addon: false)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === false && /bredband|fiber|internet/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Minst en mobilrad som bastjänst (is_addon: false)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === false && /mobil|abonnemang|jobbmobil/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Roaming klassas som variable_usage',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.type === 'variable_usage' && /roaming/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Statisk IP märkt is_addon:true addon_type:"static_ip"',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && l.addon_type === 'static_ip'
        ),
      },
      {
        label: 'annualCost i rimligt SEK-intervall (30 000–60 000)',
        fn: (e) => (e.annualCost ?? 0) > 30_000 && (e.annualCost ?? 0) < 60_000,
      },
    ],
  },
  // ── Kombinerade telekom-fakturor ──────────────────────────────────────────
  // Täcker BÅDA kategori-riktningarna: bredband-primär och mobil-primär.
  // PBX-check är villkorlig — gäller bara om fakturan faktiskt har en växelrad.
  {
    match: /kombinerad/i,
    route:           'auto',
    minConfidence:   0.85,
    checks: [
      {
        label: 'potentialMixedCategories = true (kritisk: oavsett om mobil eller bredband är primär)',
        fn: (e) => e.potentialMixedCategories === true,
      },
      {
        label: 'Bredband-rad är bastjänst (is_addon: false)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === false && /bredband|fiber|internet/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Minst en mobilrad som bastjänst (is_addon: false)',
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === false && /mobil|abonnemang|sim|jobbmobil/i.test(l.description ?? '')
        ),
      },
      {
        label: 'Statisk IP (om det finns) är märkt is_addon:true addon_type:"static_ip"',
        fn: (e) => {
          const staticIp = (e.lineItems ?? []).filter(
            (l) => /statisk.*ip|fast.*ip/i.test(l.description ?? '')
          );
          return staticIp.length === 0 || staticIp.every(
            (l) => l.is_addon === true && l.addon_type === 'static_ip'
          );
        },
      },
      {
        label: 'Molnväxel/PBX (om det finns) är märkt is_addon:true addon_type:"pbx"',
        fn: (e) => {
          const pbx = (e.lineItems ?? []).filter(
            (l) => /molnväxel|pbx|cloud.*pbx|växel/i.test(l.description ?? '')
          );
          return pbx.length === 0 || pbx.every(
            (l) => l.is_addon === true && l.addon_type === 'pbx'
          );
        },
      },
    ],
  },
];

function findGolden(filename) {
  return GOLDEN.find((g) => g.match.test(filename)) ?? null;
}

// ── Skriv ut resultat för en faktura ──────────────────────────────────────────
function printResult(file, extracted, routing, elapsedMs, golden) {
  const sep = '─'.repeat(70);
  console.log(`\n${sep}`);
  console.log(`${BOLD}${file}${R}  ${routeTag(routing.route)}  ${DIM}(${elapsedMs} ms)${R}`);
  console.log(sep);

  if (routing.route === 'unsupported') {
    console.log(`  Leverantör : ${extracted.supplier}`);
    console.log(`  outOfScope : true`);
  } else {
    console.log(`  Leverantör   : ${extracted.supplier}`);
    console.log(`  Datum        : ${extracted.date}`);
    console.log(`  Period       : ${extracted.billingPeriod}`);
    console.log(`  Confidence   : ${PCT(extracted.confidenceScore)}${extracted.confidenceNotes ? `  ${DIM}(${extracted.confidenceNotes})${R}` : ''}`);
    if (routing.route === 'review_queue')
      console.log(`  ${YEL}Orsak        : ${routing.reason}${R}`);
    if (extracted.seatCount != null)
      console.log(`  Seats        : ${extracted.seatCount}`);
    if (extracted.potentialMixedCategories)
      console.log(`  ${CYA}Kombinerad faktura (potentialMixedCategories: true)${R}`);

    // Rad-tabell med is_addon-kolumn
    console.log('');
    console.log(`  ${'RAD'.padEnd(38)} ${'TYP'.padEnd(8)} ${'ADDON'.padEnd(12)} ${'BELOPP'.padStart(10)}`);
    console.log(`  ${'─'.repeat(72)}`);
    for (const item of extracted.lineItems ?? []) {
      const typeTag  = TYPE_SHORT[item.type] ?? item.type;
      const typeColor = item.type === 'variable_usage' ? RED : '';
      const addonTag  = item.is_addon
        ? `${CYA}✓ ${item.addon_type ?? 'addon'}${R}`
        : `${GRY}—${R}`;
      const desc = item.description.length > 37
        ? item.description.slice(0, 34) + '...'
        : item.description;
      console.log(`  ${typeColor}${desc.padEnd(38)} ${typeTag.padEnd(8)}${R} ${addonTag.padEnd(20)} ${SEK(item.amount).padStart(10)}`);
    }

    console.log('');
    console.log(`  Totalt faktura    : ${SEK(extracted.amount)}`);
    console.log(`  Återkommande      : ${SEK(extracted.recurringAmount)}`);
    if (extracted.variableCharges > 0)
      console.log(`  ${RED}Rörliga           : ${SEK(extracted.variableCharges)}${R}`);
    if (extracted.oneTimeFees > 0)
      console.log(`  Engång/hårdvara   : ${SEK(extracted.oneTimeFees)}`);
    console.log(`  Beräknad årkostnad: ${SEK(extracted.annualCost)}`);
    if (extracted.pricePerSeatMonthly != null)
      console.log(`  Pris/licens/mån   : ${SEK(extracted.pricePerSeatMonthly)}`);
  }

  // ── Golden master assertions ───────────────────────────────────────────────
  if (!golden) {
    console.log(`\n  ${YEL}ⓘ Ingen golden master definierad för denna fil.${R}`);
    return { passed: true, checks: 0 };
  }

  const failures = [];
  let checkCount = 0;

  // Route (golden.routeFn accepts multiple valid routes; golden.route checks exact)
  checkCount++;
  const routeOk = golden.routeFn
    ? golden.routeFn(routing.route)
    : routing.route === golden.route;
  if (!routeOk) {
    failures.push(`Route: förväntade ${golden.route ?? '(routeFn)'}, fick ${routing.route}`);
  }

  // Confidence
  if (golden.minConfidence != null && routing.route !== 'unsupported') {
    checkCount++;
    if ((extracted.confidenceScore ?? 0) < golden.minConfidence) {
      failures.push(`Confidence: ${PCT(extracted.confidenceScore)} under minimum ${PCT(golden.minConfidence)}`);
    }
  }

  // Custom checks
  for (const check of golden.checks ?? []) {
    checkCount++;
    let passed = false;
    try { passed = check.fn(extracted); } catch { passed = false; }
    if (!passed) failures.push(check.label);
  }

  console.log('');
  if (failures.length === 0) {
    console.log(`  ${GRN}${BOLD}✓ PASS${R}  (${checkCount} kontroller)`);
  } else {
    console.log(`  ${RED}${BOLD}✗ FAIL${R}  (${failures.length}/${checkCount} kontroller misslyckades)`);
    for (const f of failures)
      console.log(`    ${RED}✗${R} ${f}`);
  }

  return { passed: failures.length === 0, checks: checkCount, failures };
}

// ── Sammanfattning ────────────────────────────────────────────────────────────
function printSummary(results) {
  const sep = '═'.repeat(70);
  console.log(`\n${sep}`);
  console.log(`${BOLD}SAMMANFATTNING${R}  (${results.length} faktura${results.length !== 1 ? 'r' : ''})`);
  console.log(sep);

  const routeCounts = { auto: 0, review_queue: 0, unsupported: 0, error: 0 };
  let totalPassed = 0, totalFailed = 0;

  for (const r of results) {
    routeCounts[r.route ?? 'error']++;
    if (r.assertPassed === true)  totalPassed++;
    if (r.assertPassed === false) totalFailed++;
  }

  console.log(`  ${GRN}${BOLD}auto${R}          : ${routeCounts.auto}`);
  console.log(`  ${YEL}${BOLD}review_queue${R}  : ${routeCounts.review_queue}`);
  console.log(`  ${GRY}${BOLD}unsupported${R}   : ${routeCounts.unsupported}`);
  if (routeCounts.error > 0)
    console.log(`  ${RED}${BOLD}error${R}         : ${routeCounts.error}`);

  const withGolden = results.filter((r) => r.assertPassed != null);
  if (withGolden.length > 0) {
    console.log('');
    console.log(`${BOLD}Golden master assertions:${R}`);
    for (const r of results) {
      if (r.assertPassed == null) continue;
      const icon = r.assertPassed ? `${GRN}✓${R}` : `${RED}✗${R}`;
      console.log(`  ${icon} ${r.file}`);
      if (!r.assertPassed && r.failures?.length) {
        for (const f of r.failures)
          console.log(`      ${RED}→ ${f}${R}`);
      }
    }
    console.log('');
    const allPassed = totalFailed === 0 && totalPassed === withGolden.length;
    if (allPassed) {
      console.log(`  ${GRN}${BOLD}ALLA ${totalPassed} GOLDEN MASTER TESTS PASSERADE${R}`);
    } else {
      console.log(`  ${RED}${BOLD}${totalFailed} AV ${withGolden.length} GOLDEN MASTER TESTS MISSLYCKADES${R}`);
    }
  }

  const errors = results.filter((r) => r.route === 'error');
  if (errors.length > 0) {
    console.log('');
    console.log(`${RED}Fel:${R}`);
    for (const r of errors)
      console.log(`  ${r.file}: ${r.error}`);
  }

  console.log('');
}

// ── Main ──────────────────────────────────────────────────────────────────────
const PDF_DIR = join(ROOT, 'test-pdfs');
const filter  = process.argv[2];

if (!existsSync(PDF_DIR)) {
  console.error('Mappen test-pdfs/ saknas. Skapa den och lägg dit dina PDF:er.');
  process.exit(1);
}

const files = readdirSync(PDF_DIR)
  .filter((f) => f.toLowerCase().endsWith('.pdf'))
  .filter((f) => !filter || f === filter || f === filter + '.pdf');

if (files.length === 0) {
  console.error(
    filter
      ? `Hittade ingen PDF som matchar "${filter}" i test-pdfs/.`
      : 'Inga PDF:er hittades i test-pdfs/. Lägg dit dina testfakturor.'
  );
  process.exit(1);
}

console.log(`\n${BOLD}Arvo Flow — Invoice Stress Test${R}`);
console.log(`Testar ${files.length} faktura${files.length !== 1 ? 'r' : ''} mot den semantiska extraktorn...\n`);

const results = [];

for (const file of files) {
  const pdfPath = join(PDF_DIR, file);
  const t0 = Date.now();
  try {
    const pdfBytes  = readFileSync(pdfPath);
    const extracted = await extractInvoice({ pdfBytes });
    const routing   = routeExtraction(extracted);
    const elapsed   = Date.now() - t0;
    const golden    = findGolden(file);
    const { passed, failures } = printResult(file, extracted, routing, elapsed, golden);
    results.push({ file, route: routing.route, assertPassed: golden ? passed : null, failures });
  } catch (err) {
    const elapsed = Date.now() - t0;
    console.log(`\n${'─'.repeat(70)}`);
    console.log(`${BOLD}${file}${R}  ${RED}${BOLD}[ERROR]${R}  ${DIM}(${elapsed} ms)${R}`);
    console.log(`  ${RED}${err.message}${R}`);
    results.push({ file, route: 'error', error: err.message, assertPassed: false });
  }
}

printSummary(results);

const anyFailed = results.some((r) => r.assertPassed === false || r.route === 'error');
process.exit(anyFailed ? 1 : 0);
