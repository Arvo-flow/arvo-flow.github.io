#!/usr/bin/env node
/**
 * scripts/setup-hooks.mjs
 *
 * Installerar git-hooks för det lokala repot.
 * Körs automatiskt via `npm run prepare` (efter `npm install`).
 * Kan också köras manuellt: node scripts/setup-hooks.mjs
 *
 * Installerade hooks:
 *   pre-commit  → node scripts/price-audit.mjs
 *                 Blockerar commit om real-public pris saknar monitor-check
 *                 eller source:'ej-verifierat' finns kvar i koden.
 */

import { writeFileSync, chmodSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve }  from 'node:path';
import { fileURLToPath }  from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT      = resolve(__dirname, '..');
const HOOKS_DIR = join(ROOT, '.git', 'hooks');

// ── Verifiera att vi är i ett git-repo ────────────────────────────────────────
if (!existsSync(join(ROOT, '.git'))) {
  console.log('ℹ  Inte ett git-repo (vanligt i CI). Hoppar över hook-installation.');
  process.exit(0);
}

if (!existsSync(HOOKS_DIR)) {
  mkdirSync(HOOKS_DIR, { recursive: true });
}

// ── pre-commit ─────────────────────────────────────────────────────────────────
const PRE_COMMIT = join(HOOKS_DIR, 'pre-commit');
const PRE_COMMIT_CONTENT = `#!/bin/sh
# Installerad av scripts/setup-hooks.mjs — redigera inte manuellt.
# Uppdatera scripts/setup-hooks.mjs och kör om istället.

# Kör statisk pristäckningsaudit
node scripts/price-audit.mjs
STATUS=$?

# Påståendevakthunden — förbjudna löften/påståenden i kundytor (regel 3, 4, 9)
if [ $STATUS -eq 0 ]; then
  node scripts/claims-audit.mjs
  STATUS=$?
fi

# Sifferrevisorn — tystnadsgarantin: oreviderade kategorier visar aldrig siffror (regel 4)
if [ $STATUS -eq 0 ]; then
  node scripts/sifferrevisor.mjs
  STATUS=$?
fi

# Bedömningskravet — en prognos/bedömning når kunden bara med grund + konfidens + asymmetri (regel 4)
if [ $STATUS -eq 0 ]; then
  node scripts/bedomningskrav.mjs
  STATUS=$?
fi

if [ $STATUS -ne 0 ]; then
  echo ""
  echo "  Commit blockerad av price-audit. Åtgärda felen ovan och försök igen."
  echo "  Hoppa tillfälligt över: git commit --no-verify (använd sparsamt)"
fi

exit $STATUS
`;

writeFileSync(PRE_COMMIT, PRE_COMMIT_CONTENT, 'utf8');
chmodSync(PRE_COMMIT, 0o755);

console.log('✓ pre-commit hook installerad →', PRE_COMMIT);
console.log('  Kör price-audit vid varje commit (blockerar vid täckningsluckor)');
