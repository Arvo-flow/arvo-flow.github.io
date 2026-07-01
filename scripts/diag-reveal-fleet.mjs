// scripts/diag-reveal-fleet.mjs — kör AVSLÖJANDET mot riktiga svenska bolag (leads/stockholm-leads.csv)
// och mäter distributionen: fyrar det STARKT (plattform + M365-uppsättningsdatum), faller det på
// GOLVET (brygga/infra), eller WHIFFAR det helt? Kräver HTTP-egress (crt.sh/RDAP) → körs i Actions.
// Verifieringsplikt på strateginivå: bevisa att vårt vassaste vapen faktiskt biter, innan vi bygger på det.
import { readFileSync } from 'node:fs';
import { revealFromDomain } from '../lib/domain-intel.js';

const csv = readFileSync('leads/stockholm-leads.csv', 'utf8');
const domains = [...new Set(csv.split('\n')
  .filter((l) => l && !l.startsWith('#') && !l.startsWith('company_name'))
  .map((l) => (l.split(',')[1] || '').trim().replace(/^\*/, ''))
  .filter((d) => /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(d)))];

console.log(`Kör avslöjandet mot ${domains.length} riktiga svenska bolag…\n`);

const STRONG = new Set(['platform', 'onboarding', 'cert', 'domain', 'dmarc']);  // äkta "om er"-fynd
const FLOOR  = new Set(['bridge', 'infra']);

async function run(d) {
  try {
    const r = await revealFromDomain(d);
    return { d, platform: r.platform, findings: r.findings ?? [] };
  } catch (e) { return { d, error: e.message, findings: [] }; }
}

// Concurrency 4 — snäll mot crt.sh, håller oss inom workflow-timeouten.
const queue = [...domains], results = [];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) { const d = queue.shift(); results.push(await run(d)); }
}));

let strong = 0, floorOnly = 0, whiff = 0, withDate = 0, withPlatform = 0;
for (const r of results.sort((a, b) => a.d.localeCompare(b.d))) {
  if (r.error) { console.log(`✗ ${r.d} — fel: ${r.error}`); whiff++; continue; }
  const hasStrong = r.findings.some((f) => STRONG.has(f.kind));
  const onlyFloor = !hasStrong && r.findings.some((f) => FLOOR.has(f.kind));
  if (hasStrong) strong++; else if (onlyFloor) floorOnly++; else whiff++;
  if (r.findings.some((f) => f.kind === 'onboarding')) withDate++;
  if (r.findings.some((f) => f.kind === 'platform')) withPlatform++;
  console.log(`${hasStrong ? '✅' : onlyFloor ? '▽ GOLV' : '✗ WHIFF'}  ${r.d}  (mx: ${r.platform})`);
  for (const f of r.findings) console.log(`      · [${f.kind}] ${f.title}`);
}

console.log('\n═══════ SAMMANFATTNING ═══════');
console.log(`Bolag totalt:                        ${results.length}`);
console.log(`✅ Starka "om er"-fynd:              ${strong}`);
console.log(`▽  Endast golv (brygga/infra):       ${floorOnly}`);
console.log(`✗  Whiff (inget):                    ${whiff}`);
console.log(`   varav plattform (M365/Google):    ${withPlatform}`);
console.log(`   varav M365-UPPSÄTTNINGSDATUM:      ${withDate}   ← käftsläpparen`);
console.log('═══════════════════════════════════');
