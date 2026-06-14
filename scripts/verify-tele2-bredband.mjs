// scripts/verify-tele2-bredband.mjs — driftvakt för Tele2:s adress-prissatta bredband.
//
// Replayar Tele2:s adress→pris-API för de fasta verifierings-adresserna i
// branchindex.bredband.tele2Verified och jämför de funna priserna (exkl moms) mot prisboken.
// Bredbandspris är adress-/nät-beroende — därför verifierar vi per nät-familj (Max=COAX,
// Standard=öppen fiber), inte ett rikstäckande tal.
//
//   node scripts/verify-tele2-bredband.mjs        (live — kräver HTTP-egress)
//
// HTTP funkar inte i sandboxen → körs på GitHub Actions-runnern
// (.github/workflows/verify-tele2-bredband.yml, veckovis + manuell).
//
// REGEL 1/3/4: förväntan härleds ur prisboken. Rött vid (a) drift mot lagrat pris, eller
// (b) att ett ankar-pris inte längre går att bekräfta på någon adress. Skriver aldrig själv.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { tele2BroadbandFor } from '../lib/tele2-broadband.js';

const tv = BRANCHINDEX.bredband?.tele2Verified;
if (!tv?.verifyAddresses?.length) { console.error('[bb-vakt] tele2Verified saknas'); process.exit(1); }

function fail(msg) {
  console.error(`\n[bb-vakt] ${msg}`);
  console.error('[bb-vakt] FAIL: hellre rött bygge än ett overifierat adresspris (regel 4).');
  console.error('[bb-vakt] Åtgärd: kör node scripts/probe-bredband-direct.mjs, uppdatera tele2Verified + lastVerified, kör testsviten.');
  process.exit(1);
}

// Ankar-tiers som MÅSTE bekräftas av minst en adress (annars rött).
const REQUIRED = [
  { family: 'max', speed: 1200 },
  { family: 'standard', speed: 1000 },
];

const confirmed = new Set();   // "family:speed" bekräftade mot lagrat pris
const drift = [];

for (const addr of tv.verifyAddresses) {
  let res;
  try { res = await tele2BroadbandFor(addr); }
  catch (e) { fail(`kunde inte hämta ${addr}: ${e.message}`); }
  if (!res.products.length) { console.log(`  · ${addr}: 0 produkter (obetjänad eller bara mobilt) — hoppar`); continue; }
  console.log(`  · ${res.address} (id ${res.addressId}): ${res.products.length} produkter`);
  for (const p of res.products) {
    const fam = p.family === 'Max' ? 'max' : p.family === 'Standard' ? 'standard' : null;
    if (!fam) continue;
    const stored = tv[fam]?.[p.downMbps];
    if (stored == null) continue;                       // tier vi inte ankrar på
    if (tv[fam].bindingMonths != null && p.bindingMonths !== tv[fam].bindingMonths) continue; // fel bindningstid
    if (p.monthlyExcVat === stored) { confirmed.add(`${fam}:${p.downMbps}`); console.log(`      ✓ ${fam} ${p.downMbps} = ${stored} kr/mån exkl`); }
    else drift.push(`${fam} ${p.downMbps}: prisbok ${stored} · live ${p.monthlyExcVat} kr/mån exkl (${res.address})`);
  }
}

if (drift.length) {
  for (const d of drift) console.error(`  ✗ DRIFT ${d}`);
  fail('Tele2 har ändrat ett verifierat bredbandspris.');
}
const missing = REQUIRED.filter((r) => !confirmed.has(`${r.family}:${r.speed}`));
if (missing.length) {
  fail(`kunde inte bekräfta ankar-tiers: ${missing.map((m) => `${m.family} ${m.speed}`).join(', ')} — adressutbud kan ha ändrats.`);
}

console.log(`\n[bb-vakt] ✓ ${confirmed.size} verifierade pris-tiers oförändrade mot Tele2:s adress-API — bredband-ankaret håller.`);
