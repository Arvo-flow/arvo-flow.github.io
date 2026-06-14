// scripts/verify-eurostat-el.mjs — driftvakt för Eurostats företagsel-band.
//
// branchindex.el.eurostatBands används som VERIFIERAT MARKNADSGOLV i el-analysen
// (lib/el-intelligence.js) — ett kundsynligt, integritetskritiskt tal. Den här vakten
// hämtar Eurostats nrg_pc_205 live och jämför mot de lagrade banden.
//
//   node scripts/verify-eurostat-el.mjs        (live — kräver HTTP-egress)
//
// HTTP funkar inte i sandboxen → körs på GitHub Actions-runnern
// (.github/workflows/verify-eurostat-el.yml, veckovis + manuell).
//
// REGEL 3/4: går RÖTT om (a) ett band har drivit inom samma period, eller (b) en NY
// period publicerats (då måste de nya verifierade talen granskas av människa innan de
// blir kundsynliga). Vakten skriver ALDRIG själv. Matchar allt → exit 0.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { fetchEurostatElBands, SMB_BANDS } from '../lib/eurostat-el.js';

const TOL_ORE = 0.5; // rundningstolerans i öre/kWh

function fail(msg) {
  console.error(`\n[eurostat-el-vakt] ${msg}`);
  console.error('[eurostat-el-vakt] FAIL: hellre rött bygge än tyst drift i ett kundsynligt golv (regel 4).');
  console.error('[eurostat-el-vakt] Åtgärd: granska Eurostat, uppdatera branchindex.el.eurostatBands (period + allInKwh) + bumpa lastVerified, kör testsviten, deploya.');
  process.exit(1);
}

const eb = BRANCHINDEX.el?.eurostatBands;
if (!eb?.bands?.length) fail('branchindex.el.eurostatBands saknas — inget att verifiera mot.');

let live;
try { live = await fetchEurostatElBands(); }
catch (e) { fail(`kunde inte hämta Eurostat: ${e.message}`); }

console.log(`Eurostat live-period: ${live.period} · lagrad period: ${eb.period}`);
console.log(`Live-band: ${live.bands.map((b) => `${b.code}=${b.orePerKwh} öre`).join(' | ')}`);

if (live.period !== eb.period) {
  fail(`NY Eurostat-period publicerad (${live.period} ≠ lagrad ${eb.period}). De nya verifierade talen måste granskas av människa innan de blir kundsynliga.`);
}

// Samma period → varje band måste matcha lagrat värde (öre/kWh) inom tolerans.
const liveByCode = new Map(live.bands.map((b) => [b.code, b.orePerKwh]));
const drift = [];
SMB_BANDS.forEach((code, i) => {
  const stored = eb.bands[i];
  const storedOre = Math.round(stored.allInKwh * 100 * 100) / 100; // kr/kWh → öre/kWh
  const liveOre = liveByCode.get(code);
  if (liveOre == null) { drift.push(`${stored.label}: saknas i Eurostat-svaret`); return; }
  if (Math.abs(liveOre - storedOre) > TOL_ORE) {
    drift.push(`${stored.label}: prisbok ${storedOre} öre · live ${liveOre} öre`);
  } else {
    console.log(`  ✓ ${stored.label.padEnd(26)} prisbok ${storedOre} öre · live ${liveOre} öre`);
  }
});

if (drift.length) {
  for (const d of drift) console.error(`  ✗ DRIFT ${d}`);
  fail('Eurostat-banden har drivit inom samma period — el-marknadsgolvet stämmer inte längre.');
}

console.log('\n[eurostat-el-vakt] ✓ alla SMB-band oförändrade mot Eurostat — el-marknadsgolvet håller.');
