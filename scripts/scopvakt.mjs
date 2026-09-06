#!/usr/bin/env node
// scripts/scopvakt.mjs — en variabel som inte finns ska fällas FÖRE deploy, inte av en kund.
//
// ══ VARFÖR (2026-09-06) ═════════════════════════════════════════════════════════════════════
//
// Jag flyttade kategorifrysningen ut ur `if (!isBypass) { … }`-blocket och skrev `kv` — men
// `const kv` deklareras INNE i det blocket. Resultatet blev `ReferenceError: kv is not defined`
// i produktion, och grundaren fick det som felmeddelande i kundytan.
//
// INGEN AV 2 136 TESTER KUNDE SE DET, och kunde inte ha gjort det: sviten anropar aldrig
// `handler(req, res)`. Den prövar rena funktioner, källtext och kontrakt — aldrig api-modulens
// exekverbara väg. Det är villkorsvaktens sjukdom en sista gång: varenda mekanism prövad, själva
// vägen genom filen aldrig.
//
// Ett scope-fel går inte att fånga med ett källtextregex och behöver inte det. Det är ett
// STATISKT fel, och en parser ser det gratis. `no-undef` fällde exakt raden i mätningen ovan.
//
// FÅNGAR: varje identifierare som används utanför sitt scope i api/, lib/ och agents/ — alltså
//   hela klassen «koden kastar innan den hinner göra något», som sviten strukturellt är blind för.
// BLIND: den ser bara NAMN, aldrig värden. En variabel som finns men är `undefined` vid
//   användning, en `await` som saknas, ett fält som bytt namn — inget av det syns här. Vakten
//   stänger den felklass som FAKTISKT nådde kund, inte kategorin «koden kraschar».
//
// ── EN REGEL, INTE TVÅ (mätt innan den slogs på) ────────────────────────────────────────────
// Jag ville ha `no-use-before-define` med — samma TDZ-familj. Mätningen sa nej: den fäller SEX
// träffar i fungerande kod (LFL_TIER_LABELS i formatPrompt, fmtKr/fmtKrDec i
// buildLicensspannFinding). Alla sex är module-scope-konstanter som läses inuti funktioner som
// anropas långt efter modulladdning — lästa och friade, inte antagna. En vakt som fäller korrekt
// befintlig kod kringgås med `--no-verify` på sin första dag, och då är den sämre än ingen
// (bibeln, smyghöjningsvakten 2026-07-20).
//
// Den TDZ-halvan är alltså INTE täckt, och det sägs här hellre än att låta vakten se heltäckande
// ut. `no-undef` är den regel som faktiskt fällde felet som nådde kund, och den är ren i dag.

import { execFileSync } from 'node:child_process';

const MALKATALOGER = ['api/**/*.mjs', 'lib/**/*.js', 'agents/**/*.js'];
const REGLER = { 'no-undef': 'error' };

let ut = '';
let kod = 0;
try {
  ut = execFileSync('npx', [
    '--no-install', 'eslint', '--no-eslintrc',
    '--parser-options=ecmaVersion:2022,sourceType:module',
    '--env', 'es2022,node',
    '--rule', JSON.stringify(REGLER),
    ...MALKATALOGER,
  ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
} catch (err) {
  ut = `${err.stdout ?? ''}${err.stderr ?? ''}`;
  kod = err.status ?? 1;
}

// ── EN SOND SOM INTE KOM FRAM ÄR INGET MÄTVÄRDE (SV-01..11) ──────────────────────────────────
// Saknas eslint, eller kraschar den, får det ALDRIG läsas som «inga scope-fel». Vakten skiljer
// «rent» från «kunde inte köras» — annars är den grön av tomhet precis när den behövs som mest.
if (/Cannot find module|command not found|not recognized/i.test(ut)) {
  console.error('✗ Scopvakten kunde inte köras (eslint saknas) — detta är INTE ett godkännande.');
  process.exit(1);
}

if (kod === 0) {
  console.log('\n✓ Scopvakten — inga odefinierade variabler i api/, lib/, agents/');
  process.exit(0);
}

console.error('\n✗ SCOPVAKTEN — en identifierare används utanför sitt scope:\n');
console.error(ut.trim());
console.error('\n  Det här kastar i RUNTIME, före all logik, och når kunden som ett rått');
console.error('  felmeddelande. Sviten kan inte se det: den anropar aldrig handler(req, res).\n');
process.exit(1);
