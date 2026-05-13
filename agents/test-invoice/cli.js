#!/usr/bin/env node
// agents/test-invoice/cli.js
// End-to-end test av Arvo Flow-algoritmen mot en riktig PDF-faktura.
//
// Användning:
//   node agents/test-invoice/cli.js path/to/faktura.pdf
//   node agents/test-invoice/cli.js path/to/faktura.pdf --industry byraer --employees 8
//   node agents/test-invoice/cli.js path/to/faktura.pdf --save
//
// Flaggor:
//   --industry <byraer|hantverkare|ehandel|tillverkning>   default: byraer
//   --employees <antal>                                    default: 5
//   --revenue <SEK/år>                                     default: utelämnas
//   --save                                                 spara resultat till data/test-runs/

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { extractInvoice } from './extract.js';
import { categorize } from '../categorizer/categorize.js';
import { recommend } from '../recommender/recommend.js';

const INDUSTRIES = ['byraer', 'hantverkare', 'ehandel', 'tillverkning'];

function parseArgs(argv) {
  const args = { industry: 'byraer', employees: 5, revenue: null, save: false, pdfPath: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--industry') args.industry = argv[++i];
    else if (a === '--employees') args.employees = Number(argv[++i]);
    else if (a === '--revenue') args.revenue = Number(argv[++i]);
    else if (a === '--save') args.save = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (!a.startsWith('--') && !args.pdfPath) args.pdfPath = a;
  }
  return args;
}

function printUsage() {
  console.log(`
Test-Invoice CLI — testa Arvo Flow-algoritmen mot en riktig PDF-faktura

Användning:
  node agents/test-invoice/cli.js <faktura.pdf> [flaggor]

Flaggor:
  --industry <id>      ${INDUSTRIES.join(' | ')}  (default: byraer)
  --employees <n>      Antal anställda (default: 5)
  --revenue <kr/år>    Årsomsättning i SEK (frivilligt)
  --save               Spara JSON-resultat till data/test-runs/
  --help, -h           Visa denna hjälp

Exempel:
  node agents/test-invoice/cli.js fakturor/el-mars.pdf
  node agents/test-invoice/cli.js fakturor/forsakring.pdf --industry hantverkare --employees 12 --save
`);
}

function formatKr(n) {
  if (n == null) return '—';
  return `${n.toLocaleString('sv-SE')} kr`;
}

function bar(label, value, max, width = 30) {
  const filled = Math.round((value / max) * width);
  return `${label.padEnd(18)} ${'█'.repeat(filled)}${'░'.repeat(width - filled)} ${formatKr(value)}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.pdfPath) {
    printUsage();
    process.exit(args.help ? 0 : 1);
  }

  const pdfPath = resolve(args.pdfPath);
  if (!existsSync(pdfPath)) {
    console.error(`Filen finns inte: ${pdfPath}`);
    process.exit(1);
  }
  if (!INDUSTRIES.includes(args.industry)) {
    console.error(`Okänd bransch: ${args.industry}. Använd en av: ${INDUSTRIES.join(', ')}`);
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('\nANTHROPIC_API_KEY saknas. Sätt den med:');
    console.error('  export ANTHROPIC_API_KEY=sk-ant-...\n');
    process.exit(1);
  }

  const t0 = Date.now();
  console.log(`\n📄 Läser ${basename(pdfPath)} ...`);

  // Steg 1: Extrahera struktur från PDF
  const tExtract0 = Date.now();
  const extracted = await extractInvoice({ pdfPath });
  const tExtract = Date.now() - tExtract0;

  console.log(`\n✓ Extraherat (${tExtract} ms, confidence ${extracted.confidence.toFixed(2)})`);
  console.log(`   Leverantör:    ${extracted.supplier}`);
  console.log(`   Belopp:        ${formatKr(extracted.amount)} (ex moms)`);
  console.log(`   Årskostnad:    ${formatKr(extracted.annualCost)}`);
  console.log(`   Datum:         ${extracted.date}`);
  console.log(`   Återkommande:  ${extracted.recurring ? 'Ja' : 'Nej'}`);
  console.log(`   Beskrivning:   ${extracted.description}`);
  if (extracted.notes) console.log(`   ⚠  Notering:    ${extracted.notes}`);

  // Steg 2: Kategorisera
  const tCat0 = Date.now();
  const categorized = await categorize({
    supplier: extracted.supplier,
    amount: extracted.amount,
    date: extracted.date,
    account: extracted.account,
    description: extracted.description,
    recurring: extracted.recurring,
  });
  const tCat = Date.now() - tCat0;

  console.log(`\n✓ Kategoriserat (${tCat} ms, confidence ${categorized.confidence.toFixed(2)})`);
  console.log(`   Kategori:      ${categorized.category}${categorized.subType ? ` / ${categorized.subType}` : ''}`);
  console.log(`   Normaliserad:  ${categorized.normalizedSupplier}`);
  console.log(`   License pending: ${categorized.licensePending ? 'Ja (FI-licens krävs)' : 'Nej'}`);
  console.log(`   Reasoning:     ${categorized.reasoning}`);

  // Steg 3: Rekommendation
  const tRec0 = Date.now();
  const recommendation = await recommend({
    customer: {
      industry: args.industry,
      employees: args.employees,
      revenue: args.revenue,
    },
    invoice: {
      amount: extracted.amount,
      annualCost: extracted.annualCost,
    },
    categorized,
  });
  const tRec = Date.now() - tRec0;

  console.log(`\n✓ Rekommendation (${tRec} ms, confidence ${recommendation.confidence})`);
  console.log(`   ${'─'.repeat(60)}`);
  if (recommendation.shouldSwitch) {
    console.log(`   👉 BYT TILL:     ${recommendation.suggestedSupplier}`);
    console.log(`   Bruttobesparing: ${formatKr(recommendation.estimatedAnnualSaving)} / år`);
    const arvoFee = Math.round(recommendation.estimatedAnnualSaving * 0.20);
    const net = recommendation.estimatedAnnualSaving - arvoFee;
    console.log(`   Arvos fee (20%): ${formatKr(arvoFee)}`);
    console.log(`   ⭐ Netto till dig: ${formatKr(net)} / år`);
    console.log('');
    console.log(`   ${bar('Du betalar idag', extracted.annualCost, extracted.annualCost)}`);
    console.log(`   ${bar('Med byte',
      extracted.annualCost - recommendation.estimatedAnnualSaving,
      extracted.annualCost)}`);
    console.log('');
    console.log(`   Varför: ${recommendation.reasoning}`);
    if (recommendation.switchSteps?.length) {
      console.log(`\n   Steg för bytet:`);
      recommendation.switchSteps.forEach((s, i) => console.log(`     ${i + 1}. ${s}`));
    }
  } else {
    console.log(`   ✋ INGEN REKOMMENDATION`);
    console.log(`   Varför: ${recommendation.reasoning}`);
  }
  console.log(`   ${'─'.repeat(60)}`);

  // Total tid + token-summering
  const totalMs = Date.now() - t0;
  const totalInTokens = (extracted.usage?.input_tokens ?? 0)
    + (categorized.usage?.input_tokens ?? 0)
    + (recommendation.usage?.input_tokens ?? 0);
  const totalOutTokens = (extracted.usage?.output_tokens ?? 0)
    + (categorized.usage?.output_tokens ?? 0)
    + (recommendation.usage?.output_tokens ?? 0);

  console.log(`\n⏱  Total körtid: ${totalMs} ms  |  Tokens: ${totalInTokens} in / ${totalOutTokens} ut`);

  // Spara om begärt
  if (args.save) {
    const outDir = resolve('data/test-runs');
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const outPath = `${outDir}/${ts}_${basename(pdfPath, '.pdf')}.json`;
    writeFileSync(outPath, JSON.stringify({
      pdf: basename(pdfPath),
      customer: {
        industry: args.industry,
        employees: args.employees,
        revenue: args.revenue,
      },
      extracted,
      categorized,
      recommendation,
      timing: { extractMs: tExtract, categorizeMs: tCat, recommendMs: tRec, totalMs },
      runAt: new Date().toISOString(),
    }, null, 2));
    console.log(`\n💾 Sparat: ${outPath}`);
  }

  console.log('');
}

main().catch((err) => {
  console.error('\n❌ Fel:', err.message);
  if (process.env.DEBUG) console.error(err.stack);
  process.exit(1);
});
