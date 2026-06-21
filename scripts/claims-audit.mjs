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
  [/partnern[äa]tverk/i,        'Neutralitets-moaten (grundarbeslut 2026-06-19): Arvo har inga partneravtal — aldrig'],
  // Neutralitets-moaten, stenhårt: Arvo tar ALDRIG leverantörspengar. Enda intäkten är kundens
  // success fee. Antyds leverantörsersättning/partnerskap i en kundyta är oberoendet — och vallgraven — död.
  [/kickback/i,                 'Neutralitets-moaten: Arvo tar aldrig kickback från en leverantör'],
  [/provision fr[åa]n/i,        'Neutralitets-moaten: Arvo tar aldrig provision från en leverantör'],
  [/(leverant[öo]rsersättning|partner-?fee|återförsäljarmarginal)/i, 'Neutralitets-moaten: ingen leverantörs-sidig intäkt får antydas i kundyta'],
  [/redan f[öo]rhandlat/i,      'Arvo har inte förhandlat något pris ännu — listpriser är verifierade, inte förhandlade'],
  // Bredbands-läxan 2026-06-20: AI:n kallade Telias EGNA publika listpris "välförhandlat avtalspris"
  // → falskt (Arvo förhandlar inte fram benchmarkpriser; de är verifierade/publika). OK att säga
  // "Arvo förhandlar ett volymavtal åt er" (Switch-tjänsten, success-fee) — men ett PRIS får aldrig
  // beskrivas som "välförhandlat", och inga "partner"-leverantörer får antydas (neutralitets-moaten).
  [/v[äa]lf[öo]rhandl/i,        'Ett verifierat/publikt listpris får aldrig kallas "välförhandlat" — Arvo förhandlar inte fram benchmarkpriser (säg "marknadspris"/"verifierat listpris")'],
  [/arvo-verifierad partner/i,  'Neutralitets-moaten: Arvo har inga partner-leverantörer — säg "verifierad lägre leverantör" eller "offert vi inhämtar"'],
  // Switch-doktrinen 2026-06-21: arvodet utgår på REALISERAD besparing (verifierad liggar-delta,
  // FortnoxWatchdog ser gammal rad ned + ny rad upp), aldrig på "identifierad" (en gissning).
  [/identifierad besparing/i,   'Arvodet utgår på REALISERAD besparing (verifierad liggar-delta), aldrig "identifierad" — Switch-doktrinen 2026-06-21'],
  // Neutralitets-moaten: den förkastade affiliate-/partnermodellen får aldrig återuppstå i kundyta.
  // (Bias-sidans "affiliate är INTE en variabel" matchar ej — bara intäkts-/tak-framingen fångas.)
  [/affiliate-?(int[äa]kt|avgift|tak|ers[äa]ttning)|kapad affiliate/i, 'Neutralitets-moaten: Arvo tar ingen affiliate-/leverantörsintäkt — det finns inget tak att kapa (success fee från kund är enda intäkten)'],
  [/inklusive er\b/i,           'Fabricerad kohorttillhörighet — kunden ingår inte i påstådd statistik'],
  [/i morse · \d/i,             'Fejk-tidsstämpel som ger exempel sken av verklig händelse'],
  [/skickas inom kort/i,        'Löfte utan leveransmekanik (gmail-callback-läxan)'],
  [/klart inom 48/i,            'Automationslöfte utan automation (switch-orchestratorn har stubbar)'],
  [/garanterad besparing/i,     'Besparingar är estimat eller verifierade utfall — aldrig garantier'],
  [/vi vet exakt vad ni betalar/i, 'Vi vet först när fakturan delats — regel 3'],
  // ×0,80-läxan (Svea 440192): frontend multiplicerade backendens besparingstal med
  // hårdkodade 0,80 → kundsiffran gick inte att räkna hem. Backend äger aritmetiken.
  [/(estimatedAnnualSavings\w*|netSaving|grossSaving|savingPerYear)\s*\*\s*[\d.]/, 'Frontend får inte räkna om backendens besparingstal — backend äger aritmetiken (regel 1/2)', 'src-only'],
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
      for (const [re, reason, scope] of FORBIDDEN) {
        if (scope === 'src-only' && !rel.startsWith('src/')) continue;
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
