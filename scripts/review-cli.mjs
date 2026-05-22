#!/usr/bin/env node
// scripts/review-cli.mjs
// Steg 2 i Teach Loop: interaktiv terminal-review av flaggade fakturor.
// Visar bara de fakturor där confidence är 0.70–0.89 eller route=review_queue.
// Användaren godkänner eller korrigerar — inga API-anrop.
//
// Användning:
//   node scripts/review-cli.mjs
//   node scripts/review-cli.mjs --all    # visa även auto-godkända

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const RESULTS_PATH = join(ROOT, 'teach-loop', 'results.json');

if (!existsSync(RESULTS_PATH)) {
  console.error('teach-loop/results.json saknas. Kör batch-import.mjs först.');
  process.exit(1);
}

const data = JSON.parse(readFileSync(RESULTS_PATH, 'utf8'));
const showAll = process.argv.includes('--all');

const queue = data.invoices.filter((inv) =>
  showAll ? inv.status !== 'error' : inv.status === 'flagged'
);

// ── Färger ────────────────────────────────────────────────────────────────────
const R    = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM  = '\x1b[2m';
const GRN  = '\x1b[32m';
const YEL  = '\x1b[33m';
const RED  = '\x1b[31m';
const GRY  = '\x1b[90m';
const CYA  = '\x1b[36m';

const TYPE_SHORT = {
  recurring_subscription: `${GRN}ÅTER${R}`,
  variable_usage:         `${RED}RÖRLIG${R}`,
  one_time_fee:           `${YEL}ENGÅNG${R}`,
  hardware:               `${CYA}HW${R}`,
};

function save() {
  writeFileSync(RESULTS_PATH, JSON.stringify(data, null, 2) + '\n');
}

function renderInvoice(inv) {
  const e = inv.extracted;
  const sep = '─'.repeat(64);
  console.log(`\n${sep}`);
  console.log(`${BOLD}${inv.file}${R}  ${DIM}conf: ${((inv.confidence ?? 0) * 100).toFixed(0)}%  route: ${inv.route}${R}`);
  console.log(`Leverantör : ${e?.supplier ?? '—'}    Kategori: ${YEL}${inv.category}${R}`);
  console.log(sep);
  const items = e?.lineItems ?? [];
  if (items.length === 0) {
    console.log('  (inga rader)');
  } else {
    console.log(`  ${'#'.padEnd(3)} ${'TYP'.padEnd(10)} ${'ADDON'.padEnd(12)} ${'BESKRIVNING'.padEnd(40)} BELOPP`);
    items.forEach((li, idx) => {
      const typeLabel = TYPE_SHORT[li.type] ?? li.type;
      const addonLabel = li.is_addon
        ? `${CYA}✓ ${li.addon_type ?? 'addon'}${R}`
        : `${GRY}—${R}`;
      const desc = (li.description ?? '').slice(0, 38);
      const amount = li.amount != null ? `${li.amount.toLocaleString('sv-SE')} kr` : '—';
      console.log(`  ${String(idx + 1).padEnd(3)} ${typeLabel.padEnd(10)} ${addonLabel.padEnd(20)} ${desc.padEnd(38)} ${amount}`);
    });
  }
  if (inv.corrections && Object.keys(inv.corrections).length > 0) {
    console.log(`\n  ${CYA}Aktiva korrigeringar:${R}`);
    for (const [k, v] of Object.entries(inv.corrections))
      console.log(`    ${k}: ${JSON.stringify(v)}`);
  }
}

// ── Apply a correction to an invoice entry ────────────────────────────────────
function applyCorrection(inv, field, value) {
  inv.corrections = inv.corrections ?? {};
  if (field.startsWith('rad:')) {
    const [, idxStr, subfield] = field.split(':');
    const idx = parseInt(idxStr, 10) - 1;
    const li = inv.extracted?.lineItems?.[idx];
    if (!li) { console.log(`${RED}Ogiltigt radnummer.${R}`); return false; }
    inv.corrections[`rad${idxStr}:${subfield}`] = { from: li[subfield], to: value };
    li[subfield] = value;
  } else if (field === 'category') {
    inv.corrections['category'] = { from: inv.category, to: value };
    inv.category = value;
  } else if (field === 'route') {
    inv.corrections['route'] = { from: inv.route, to: value };
    inv.route = value;
  }
  return true;
}

// ── Huvud ─────────────────────────────────────────────────────────────────────
console.log(`\n${BOLD}Arvo Flow — Review CLI${R}`);
if (queue.length === 0) {
  console.log(`Inga fakturor att granska. ${showAll ? '' : 'Kör med --all för att se alla.'}`);
  console.log(`Nästa steg: ${BOLD}node scripts/build-fewshot.mjs${R}\n`);
  process.exit(0);
}
console.log(`${queue.length} faktura${queue.length !== 1 ? 'r' : ''} att granska. ${DIM}(s=skippa, q=avsluta)${R}\n`);

const rl = readline.createInterface({ input, output });

let reviewed = 0, approvedCount = 0, rejectedCount = 0, skippedCount = 0;

for (let i = 0; i < queue.length; i++) {
  const inv = queue[i];
  renderInvoice(inv);
  console.log(`\n  ${DIM}[${i + 1}/${queue.length}]${R}`);

  let done = false;
  while (!done) {
    const ans = await rl.question(
      `\n  Är klassificeringen korrekt? ${BOLD}(y=ja / n=korrigera / s=skippa / q=avsluta)${R} > `
    );
    const a = ans.trim().toLowerCase();

    if (a === 'q') {
      console.log('\nAvslutar review. Framsteg sparade.');
      save();
      rl.close();
      process.exit(0);
    }

    if (a === 's') {
      skippedCount++;
      done = true;
    } else if (a === 'y') {
      inv.status = 'approved';
      inv.auto_approved = false;
      inv.reviewed_at = new Date().toISOString();
      save();
      approvedCount++;
      reviewed++;
      done = true;
      console.log(`  ${GRN}✓ Godkänd${R}`);
    } else if (a === 'n') {
      const what = await rl.question(
        `  Korrigera vad? ${DIM}(radnummer 1-${inv.extracted?.lineItems?.length ?? 0} / 'category' / 'route')${R} > `
      );
      const w = what.trim().toLowerCase();

      if (/^\d+$/.test(w)) {
        const li = inv.extracted?.lineItems?.[parseInt(w, 10) - 1];
        if (!li) { console.log(`  ${RED}Ogiltigt radnummer.${R}`); continue; }
        console.log(`  Aktuell typ: ${BOLD}${li.type}${R}`);
        const newType = await rl.question(
          `  Ny typ ${DIM}(recurring / variable / onetime / hardware)${R} > `
        );
        const typeMap = {
          recurring: 'recurring_subscription',
          variable:  'variable_usage',
          onetime:   'one_time_fee',
          hardware:  'hardware',
        };
        const mapped = typeMap[newType.trim().toLowerCase()] ?? newType.trim();
        applyCorrection(inv, `rad:${w}:type`, mapped);
        console.log(`  ${GRN}Rad ${w} uppdaterad → ${mapped}${R}`);

        const addonAns = await rl.question(`  Ändra is_addon? ${DIM}(y/n/skip)${R} > `);
        if (addonAns.trim().toLowerCase() === 'y') {
          const isAddon = await rl.question(`  is_addon ${DIM}(true/false)${R} > `);
          applyCorrection(inv, `rad:${w}:is_addon`, isAddon.trim() === 'true');
          if (isAddon.trim() === 'true') {
            const addonType = await rl.question(`  addon_type ${DIM}(pbx/static_ip/firewall/sla/cloud_backup/voip/other/null)${R} > `);
            const at = addonType.trim() === 'null' ? null : addonType.trim();
            applyCorrection(inv, `rad:${w}:addon_type`, at);
          }
        }
        save();
        renderInvoice(inv);

      } else if (w === 'category') {
        const newCat = await rl.question(`  Ny kategori > `);
        applyCorrection(inv, 'category', newCat.trim());
        save();
        console.log(`  ${GRN}Kategori uppdaterad → ${newCat.trim()}${R}`);

      } else if (w === 'route') {
        const newRoute = await rl.question(`  Ny route ${DIM}(auto/review_queue/unsupported)${R} > `);
        applyCorrection(inv, 'route', newRoute.trim());
        save();
        console.log(`  ${GRN}Route uppdaterad → ${newRoute.trim()}${R}`);
      } else {
        console.log(`  ${YEL}Okänt val.${R}`);
      }
    } else {
      console.log(`  ${YEL}Svarade med y, n, s eller q.${R}`);
    }
  }
  if (i < queue.length - 1) console.log('');
}

rl.close();
save();

console.log(`\n${'─'.repeat(60)}`);
console.log(`${BOLD}Review klar${R}`);
console.log(`  ${GRN}✓ ${approvedCount} godkända${R}`);
if (rejectedCount > 0) console.log(`  ${RED}✗ ${rejectedCount} avvisade${R}`);
if (skippedCount  > 0) console.log(`  ${GRY}— ${skippedCount} skippade${R}`);
console.log(`\nNästa steg: ${BOLD}node scripts/build-fewshot.mjs${R}\n`);
