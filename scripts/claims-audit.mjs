#!/usr/bin/env node
/**
 * scripts/claims-audit.mjs — Påståendevakthunden: price-audit för ORD.
 *
 * Skannar kundvända ytor (sidor, komponenter, mailmallar i api/) mot en
 * förbudslista av påståenden som saknar mekanik eller källa (regel 3, 4, 9).
 * Listan VÄXER med varje incident — ett påstående som en gång lurat oss kan
 * aldrig committas tillbaka. Körs i pre-commit bredvid price-audit.
 *
 * Undantag: oroutade filer (potemkin-referenser), tester, mockData, docs.
 * Medveten träff i legitim kontext? Lägg kommentaren  // claims-ok: <skäl>
 * på SAMMA rad så hoppas den över — skälet blir granskningsbart i git blame.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

// ── Förbudslistan — varje rad är en lärd läxa ─────────────────────────────────
const FORBIDDEN = [
  [/partnern[äa]tverk/i,        'Inget partneravtal finns ännu (hösten 2026) — får inte hävdas i kundytor'],
  [/redan f[öo]rhandlat/i,      'Arvo har inte förhandlat något pris ännu — listpriser är verifierade, inte förhandlade'],
  [/inklusive er\b/i,           'Fabricerad kohorttillhörighet — kunden ingår inte i påstådd statistik'],
  [/i morse · \d/i,             'Fejk-tidsstämpel som ger exempel sken av verklig händelse'],
  [/skickas inom kort/i,        'Löfte utan leveransmekanik (gmail-callback-läxan)'],
  [/klart inom 48/i,            'Automationslöfte utan automation (switch-orchestratorn har stubbar)'],
  [/garanterad besparing/i,     'Besparingar är estimat eller verifierade utfall — aldrig garantier'],
  [/vi vet exakt vad ni betalar/i, 'Vi vet först när fakturan delats — regel 3'],
];

// ── Kundvända ytor ────────────────────────────────────────────────────────────
const SCAN_DIRS = ['src/pages', 'src/components', 'api'];
const EXCLUDE = [
  // Oroutade potemkin-filer (designreferens, ej nåbara i prod) + mock + interna ytor
  /src\/pages\/(Insights|Opportunity|Scanning|ArvoScore)\//,
  /src\/pages\/Admin\//,
  /mockData/,
  /\.test\.|tests\//,
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(js|mjs|jsx)$/.test(name)) yield p;
  }
}

let violations = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    if (EXCLUDE.some((re) => re.test(rel))) continue;
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes('claims-ok:')) return;
      if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) return; // kommentarer
      for (const [re, reason] of FORBIDDEN) {
        if (re.test(line)) {
          violations++;
          console.error(`✗ ${rel}:${i + 1} — ${re}\n    ${reason}\n    » ${line.trim().slice(0, 110)}`);
        }
      }
    });
  }
}

console.log('');
if (violations > 0) {
  console.error(`Påståendevakthunden: ${violations} förbjudna påståenden i kundytor — åtgärda eller motivera med // claims-ok: <skäl>`);
  process.exit(1);
}
console.log('✓ Påståendevakthunden — inga förbjudna påståenden i kundytor');
