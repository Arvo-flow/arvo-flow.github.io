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
const TOTAL_CAP = 10; // max antal exempel totalt för att hålla prompten kort

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const CYA  = '\x1b[36m';

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

// Gruppera per kategori och välj bästa
const byCategory = {};
for (const inv of approved) {
  const cat = inv.category ?? 'okänd';
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(inv);
}

for (const cat of Object.keys(byCategory)) {
  byCategory[cat].sort((a, b) => score(b) - score(a));
  byCategory[cat] = byCategory[cat].slice(0, MAX_PER_CATEGORY);
}

// Platta till och respektera total-cap (sortera kategorier efter intressantaste först)
const allSelected = Object.values(byCategory)
  .flat()
  .sort((a, b) => score(b) - score(a))
  .slice(0, TOTAL_CAP);

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

const categoryCount = new Set(allSelected.map((i) => i.category)).size;
const header = `VERIFIERADE KLASSIFICERINGSEXEMPEL (${allSelected.length} fakturor, ${categoryCount} kategorier)
Nedanstående är manuellt granskade och godkända extraktioner.
Använd dem som facit — ge samma klassificering för liknande fakturor.`;

const body = allSelected.map(formatExample).join('\n\n');
const fullText = `${header}\n\n${body}`;

// ── Skriv fewshot-examples.js ─────────────────────────────────────────────────
const fileContent = `// AUTO-GENERATED av scripts/build-fewshot.mjs — redigera inte manuellt.
// Senast uppdaterad: ${new Date().toISOString()}
// Kör \`node scripts/build-fewshot.mjs\` för att uppdatera.
export const FEWSHOT_EXAMPLES = ${JSON.stringify(fullText)};
`;

// ── Rapport ───────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — Build Few-shot${R}`);
console.log(`${allSelected.length} exempel valda från ${approved.length} godkända fakturor`);
console.log(`Kategorier:\n`);

for (const [cat, invs] of Object.entries(byCategory)) {
  const selected = invs.filter((i) => allSelected.includes(i));
  if (selected.length === 0) continue;
  console.log(`  ${YEL}${cat}${R}`);
  for (const inv of selected)
    console.log(`    ${GRN}✓${R} ${inv.file}  ${DIM}conf: ${((inv.confidence ?? 0) * 100).toFixed(0)}%  score: ${score(inv).toFixed(1)}${R}`);
}

console.log(`\n${DIM}Preview:${R}`);
console.log('─'.repeat(70));
console.log(fullText.slice(0, 800) + (fullText.length > 800 ? '\n[...]' : ''));
console.log('─'.repeat(70));

if (dryRun) {
  console.log(`\n${YEL}--dry-run: filen skrivs INTE.${R}\n`);
} else {
  writeFileSync(FEWSHOT_PATH, fileContent);
  const tokens = Math.round(fullText.length / 4);
  console.log(`\n${GRN}${BOLD}✓ Skriven: agents/test-invoice/fewshot-examples.js${R}`);
  console.log(`  ~${tokens} extra tokens per Opus-anrop`);
  console.log(`  ~$${(tokens * 0.000015).toFixed(4)} extra kostnad per faktura`);
  console.log(`\nNästa steg: deploya till Vercel — varje nytt kundanrop använder exemplen.\n`);
}
