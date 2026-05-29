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
        label: 'annualCost i rimligt SEK-intervall (5 000–200 000) — fångar valutamiss',
        fn: (e) => (e.annualCost ?? 0) > 5_000 && (e.annualCost ?? 0) < 200_000,
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
        fn: (e) => (e.lineItems ?? []).some(
          (l) => l.is_addon === true && /defender|azure.*ad/i.test(l.description ?? '')
        ),
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

  // Route
  checkCount++;
  if (routing.route !== golden.route) {
    failures.push(`Route: förväntade ${golden.route}, fick ${routing.route}`);
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
