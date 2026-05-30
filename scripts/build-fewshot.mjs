#!/usr/bin/env node
// scripts/build-fewshot.mjs
// Steg 3 i Teach Loop: väljer bästa representativa fakturor per kategori
// bland godkända resultat och skriver agents/test-invoice/fewshot-examples.js.
// Nästkommande Opus-anrop ser dessa som inbäddade facit-exempel.
//
// Användning:
//   node scripts/build-fewshot.mjs               # max 2 per kategori
//   node scripts/build-fewshot.mjs --max 3        # max 3 per kategori
//   node scripts/build-fewshot.mjs --dry-run      # visa utan att skriva
//
// PINNED_FILES: alltid inkluderade oavsett poäng — lägg till här när ett nytt
// systematiskt AI-misstag identifierats och rätt extraktion finns i results.json.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const RESULTS_PATH  = join(ROOT, 'teach-loop', 'results.json');
const FEWSHOT_PATH  = join(ROOT, 'agents', 'test-invoice', 'fewshot-examples.js');

if (!existsSync(RESULTS_PATH)) {
  console.error('teach-loop/results.json saknas. Kör batch-import.mjs först.');
  process.exit(1);
}

// ── CLI-argument ──────────────────────────────────────────────────────────────
const args   = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const maxIdx = args.indexOf('--max');
const MAX_PER_CATEGORY = maxIdx >= 0 ? parseInt(args[maxIdx + 1], 10) : 2;
const TOTAL_CAP = 15; // höjt från 10 — fler kategorier behöver täckas

// ── Pinnade obligatoriska exempel ─────────────────────────────────────────────
// Dessa inkluderas ALLTID oavsett poäng. Syfte: täcka kända AI-felmönster
// som scoring-funktionen annars aldrig väljer (enkla fakturor med låg poäng).
//
// Lägg till ny fil här när:
//   1. Du hittar ett systematiskt fel i ett fakturaformat
//   2. Du verifierat korrekt extraktion via stress-test.mjs <fil>
//   3. results.json har ett approved entry för filen
const PINNED_FILES = new Set([
  'tele2-mobil-enkel.pdf',    // Visar: "Fast månadsavgift" är recurring_subscription
  'comviq-mobil-budget.pdf',  // Visar: "Datatillägg X GB" är variable_usage
  'microsoft-new.pdf',        // Visar: M365 BP (57 seats) + Molnbackup add-on (recurring)
  'salesforce-enterprise.pdf', // Visar: annual SaaS med rabattrad som recurring
]);

// ── Handskrivna exempel — för fakturamönster som saknas i teach-loop ──────────
// Används när korrekt beteende är känt men ingen syntetisk PDF finns i results.json.
// Format: samma som formatExample() producerar.
const HANDCRAFTED_EXAMPLES = `
── Fortnox AB (saas-finance) ──
  recurring_subscription | is_addon:false                      | "Bokföring (5 användare) — maj 2026"  745 kr
  recurring_subscription | is_addon:false                      | "Fakturering (5 användare) — maj 2026"  745 kr
  recurring_subscription | is_addon:false                      | "Lön (2 användare) — maj 2026"  298 kr
  recurring_subscription | is_addon:true  addon_type:other     | "Kvitto & Utlägg (60 användare) — maj 2026"  2 940 kr
  seatCount:60  confidence:90%
  OBS: seatCount = MAX av alla modulers användarantal (60), inte summan av kärnmoduler (5+5+2=12).

── Microsoft Ireland Operations Ltd (saas-productivity) ──
  recurring_subscription | is_addon:false                      | "Microsoft 365 Business Premium (60 lic.)"  13 920 kr
  recurring_subscription | is_addon:true  addon_type:other     | "Microsoft Defender for Business (60 lic.)"  1 860 kr
  seatCount:60  confidence:96%
  OBS: Defender for Business är is_addon:true (tillägg till M365-sviten) men ändå
  recurring_subscription — det är en fast månadslicens, inte en rörlig förbrukningskostnad.`.trim();

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';

// ── Ladda resultat ────────────────────────────────────────────────────────────
const data = JSON.parse(readFileSync(RESULTS_PATH, 'utf8'));

const approved = data.invoices.filter(
  (inv) => inv.status === 'approved' && inv.route === 'auto' && inv.extracted
);

if (approved.length === 0) {
  console.error('Inga godkända auto-fakturor. Kör batch-import + review-cli först.');
  process.exit(1);
}

// ── Curationsstrategi ─────────────────────────────────────────────────────────
// Prioritera: (1) flest is_addon-variationer, (2) högst confidence, (3) flest rader
function score(inv) {
  const items = inv.extracted?.lineItems ?? [];
  const hasAddon     = items.some((l) => l.is_addon === true)  ? 3 : 0;
  const hasVariable  = items.some((l) => l.type === 'variable_usage') ? 2 : 0;
  const confScore    = (inv.confidence ?? 0) * 10;
  const itemCount    = items.length;
  return hasAddon + hasVariable + confScore + itemCount;
}

// Separera pinnade från övriga
const pinned  = approved.filter((i) => PINNED_FILES.has(i.file));
const regular = approved.filter((i) => !PINNED_FILES.has(i.file));

// Gruppera reguljära per kategori och välj bästa
const byCategory = {};
for (const inv of regular) {
  const cat = inv.category ?? 'okänd';
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(inv);
}
for (const cat of Object.keys(byCategory)) {
  byCategory[cat].sort((a, b) => score(b) - score(a));
  byCategory[cat] = byCategory[cat].slice(0, MAX_PER_CATEGORY);
}

// Kombinera: pinnade alltid med, reguljära fyller upp till TOTAL_CAP
const regularSelected = Object.values(byCategory)
  .flat()
  .sort((a, b) => score(b) - score(a))
  .slice(0, Math.max(0, TOTAL_CAP - pinned.length));

const allSelected = [...pinned, ...regularSelected];

// ── Generera few-shot-text ────────────────────────────────────────────────────
const TYPE_LABEL = {
  recurring_subscription: 'recurring_subscription',
  variable_usage:         'variable_usage        ',
  one_time_fee:           'one_time_fee          ',
  hardware:               'hardware              ',
};

function formatExample(inv) {
  const e = inv.extracted;
  const items = e.lineItems ?? [];
  const lines = [`── ${e.supplier} (${inv.category}) ──`];

  for (const li of items) {
    const typeLabel = TYPE_LABEL[li.type] ?? li.type.padEnd(22);
    const addonTag  = li.is_addon
      ? `is_addon:true  addon_type:${li.addon_type ?? 'null'}`
      : 'is_addon:false';
    const amount = li.amount != null ? `${li.amount.toLocaleString('sv-SE')} kr` : '—';
    const desc = (li.description ?? '').slice(0, 50);
    lines.push(`  ${typeLabel} | ${addonTag.padEnd(35)} | "${desc}"  ${amount}`);
  }

  const extras = [];
  if (e.seatCount)             extras.push(`seatCount:${e.seatCount}`);
  if (e.confidenceScore)       extras.push(`confidence:${(e.confidenceScore * 100).toFixed(0)}%`);
  if (e.potentialMixedCategories) extras.push('potentialMixedCategories:true');
  if (extras.length) lines.push('  ' + extras.join('  '));

  return lines.join('\n');
}

const autoExamples = allSelected.map(formatExample).join('\n\n');
const categoryCount = new Set(allSelected.map((i) => i.category)).size + 2; // +2 for handcrafted

const header = `VERIFIERADE KLASSIFICERINGSEXEMPEL (${allSelected.length + 2} fakturor, ${categoryCount} kategorier)
Nedanstående är manuellt granskade och godkända extraktioner.
Använd dem som facit — ge samma klassificering för liknande fakturor.`;

const fullText = `${header}\n\n${autoExamples}\n\n${HANDCRAFTED_EXAMPLES}`;

// ── Skriv fewshot-examples.js ─────────────────────────────────────────────────
const fileContent = `// AUTO-GENERATED av scripts/build-fewshot.mjs — redigera inte manuellt.
// Senast uppdaterad: ${new Date().toISOString()}
// Kör \`node scripts/build-fewshot.mjs\` för att uppdatera.
// Pinnade obligatoriska filer: ${[...PINNED_FILES].join(', ')}
export const FEWSHOT_EXAMPLES = ${JSON.stringify(fullText)};
`;

// ── Rapport ───────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — Build Few-shot${R}`);
console.log(`${allSelected.length} auto-valda + 2 handskrivna = ${allSelected.length + 2} totalt`);
console.log(`Källa: ${approved.length} godkända fakturor\n`);

console.log(`${BOLD}Pinnade (alltid med):${R}`);
for (const inv of pinned)
  console.log(`  ${GRN}📌${R} ${inv.file}  ${DIM}conf: ${((inv.confidence ?? 0) * 100).toFixed(0)}%${R}`);

console.log(`\n${BOLD}Auto-valda per kategori:${R}`);
for (const [cat, invs] of Object.entries(byCategory)) {
  const selected = invs.filter((i) => regularSelected.includes(i));
  if (selected.length === 0) continue;
  console.log(`  ${YEL}${cat}${R}`);
  for (const inv of selected)
    console.log(`    ${GRN}✓${R} ${inv.file}  ${DIM}conf: ${((inv.confidence ?? 0) * 100).toFixed(0)}%  score: ${score(inv).toFixed(1)}${R}`);
}

console.log(`\n${BOLD}Handskrivna exempel (saas-finance, saas-productivity):${R}`);
console.log(`  ${GRN}✍${R} Fortnox AB — multi-modul seatCount=max`);
console.log(`  ${GRN}✍${R} Microsoft 365 BP + Defender — recurring add-on`);

const tokens = Math.round(fullText.length / 4);
console.log(`\nPrompt-tillägg: ~${tokens} tokens (~$${(tokens * 0.000015).toFixed(4)} per faktura)`);

if (dryRun) {
  console.log(`\n${YEL}--dry-run: filen skrivs INTE.${R}\n`);
} else {
  writeFileSync(FEWSHOT_PATH, fileContent);
  console.log(`\n${GRN}${BOLD}✓ Skriven: agents/test-invoice/fewshot-examples.js${R}\n`);
}
