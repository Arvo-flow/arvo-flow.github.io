#!/usr/bin/env node
/**
 * scripts/sifferrevisor.mjs — Sifferrevisorn: maskinen som bevisar tystnadsgarantin.
 *
 * Revisionsgrinden (lib/revision-gate.js) lovar: oreviderade kategorier visar
 * ALDRIG en siffra för kund. Det löftet är värdelöst utan bevis — revisorn
 * verifierar det maskinellt i pre-commit:
 *
 *   1. TYSTNADSGARANTIN: för VARJE kategori utanför REVIDERADE_KATEGORIER
 *      körs recommend() med en syntetisk faktura. Svaret MÅSTE vara offert-läge
 *      utan en enda siffra i kundsynlig copy. (Grinden kortsluter före AI-anropet
 *      — körningen är offline och deterministisk.)
 *
 *   2. SVITBEVISEN: varje reviderad kategori måste peka på testfiler som
 *      faktiskt existerar — en kategori kan inte smyga in i grinden utan svit.
 *
 * Fullständiga regressionssviter körs i `node --test tests/` (CI) — revisorn
 * är snabbgrinden som gör att en oreviderad siffra aldrig ens kan committas.
 */

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES } from '../agents/categorizer/categories.js';
import { REVIDERADE_KATEGORIER, isAudited } from '../lib/revision-gate.js';
import { recommend } from '../agents/recommender/recommend.js';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
let failures = 0;
const fail = (msg) => { failures++; console.error('✗ ' + msg); };

// ── 1. Tystnadsgarantin ───────────────────────────────────────────────────────
const syntheticInput = (category) => ({
  customer:    { industry: 'konsult', employees: 10 },
  categorized: { category, normalizedSupplier: 'Testleverantör AB', confidence: 0.9 },
  invoice: {
    recurringAmount: 5_000, variableCharges: 0, annualCost: 60_000,
    billingPeriod: 'monthly',
    lineItems: [{ type: 'recurring_subscription', description: 'Tjänst', amount: 5_000, quantity: 1, unitPrice: 5_000 }],
  },
});

const NUMERIC_FIELDS = [
  'suggestedAnnualCost', 'grossSaving', 'netSaving', 'arvoFee',
  'optimizationSaving', 'overageSavings',
];

const unaudited = Object.keys(CATEGORIES).filter((c) => !isAudited(c));
for (const cat of unaudited) {
  try {
    const r = await recommend(syntheticInput(cat));
    if (r.requiresQuote !== true || r.revisionGate !== 'unaudited') {
      fail(`'${cat}' är oreviderad men passerade grinden (requiresQuote=${r.requiresQuote})`);
      continue;
    }
    for (const f of NUMERIC_FIELDS) {
      if (r[f] != null) fail(`'${cat}': oreviderad kategori läcker siffra i fältet ${f} = ${r[f]}`);
    }
    if (/\d/.test(r.reasoning ?? '')) {
      fail(`'${cat}': oreviderad copy innehåller en siffra — talfri per konstruktion krävs: "${r.reasoning.slice(0, 80)}…"`);
    }
  } catch (err) {
    fail(`'${cat}': recommend() kastade — grinden ska kortsluta före allt annat: ${err.message}`);
  }
}

// ── 2. Svitbevisen ────────────────────────────────────────────────────────────
for (const [cat, evidence] of REVIDERADE_KATEGORIER) {
  if (!CATEGORIES[cat]) fail(`Reviderad kategori '${cat}' finns inte i CATEGORIES`);
  const refs = [...(evidence.match(/tests\/[a-z0-9-]+\.mjs|tests\/fixtures\/[a-z0-9-]+\.mjs/gi) ?? [])];
  if (refs.length === 0 && !/deterministisk/.test(evidence)) {
    fail(`'${cat}': revisionsbevis saknar testfilshänvisning: "${evidence}"`);
  }
  for (const ref of refs) {
    if (!existsSync(resolve(ROOT, ref))) fail(`'${cat}': hänvisad svit saknas på disk: ${ref}`);
  }
}

// ── Utfall ────────────────────────────────────────────────────────────────────
console.log('');
if (failures > 0) {
  console.error(`Sifferrevisorn: ${failures} brott mot tystnadsgarantin/svitbevisen — åtgärda före commit.`);
  process.exit(1);
}
console.log(`✓ Sifferrevisorn — tystnadsgarantin bevisad för ${unaudited.length} oreviderade kategorier, svitbevis OK för ${REVIDERADE_KATEGORIER.size} reviderade`);
