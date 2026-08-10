// scripts/verify.mjs — EN runner för hela verifierar-fabriken.
//
//   node scripts/verify.mjs <id>      kör en källa
//   node scripts/verify.mjs all       kör alla
//   node scripts/verify.mjs --matrix  skriver ut GH-Actions-matrisen ur registryt (JSON)
//
// Exit 1 om någon källa drivit eller är oåtkomlig (regel 4: hellre rött än tyst osäkerhet).
import { VERIFIERS, getVerifier } from '../lib/verifiers/registry.mjs';

const args = process.argv.slice(2);

if (args[0] === '--matrix') {
  // Workflow härleder sin job-matris härifrån → en sanning, ingen dubblering.
  process.stdout.write(JSON.stringify(VERIFIERS.map((v) => ({ id: v.id, needsBrowser: !!v.needsBrowser, needsStealth: !!v.needsStealth }))));
  process.exit(0);
}

// En, flera eller alla: `verify.mjs tele2-mobil tele2-bredband` kör en delmängd.
const targets = (args.length === 0 || args.includes('all'))
  ? VERIFIERS
  : args.map(getVerifier).filter(Boolean);
if (!targets.length) {
  console.error(`Okänd verifierare: '${args.join(' ')}'. Giltiga: ${VERIFIERS.map((v) => v.id).join(', ')}`);
  process.exit(2);
}

let anyFail = false;
for (const v of targets) {
  console.log(`\n=== [${v.id}] ${v.label} · ${v.category} ===`);
  // TIDSTAKET (grundarfynd 2026-08-05): zoho-crm hängde 9+ minuter och sköts ned av jobbets
  // 10-minuterstak — utan utfall, utan rad i loggen, utan att någon kunde se VARFÖR. En vakt som
  // kan hänga är en vakt som tystnar, och tystnaden ser ut som "kör fortfarande". Varje källa får
  // därför en egen budget: överskrids den är det ett RÖTT med skäl, inte ett dödat jobb.
  const BUDGET_MS = Number(process.env.VERIFY_TIMEOUT_MS ?? 150000);
  let res;
  try {
    res = await Promise.race([
      v.run(),
      new Promise((_, rej) => setTimeout(() => rej(new Error(`tidsbudget ${BUDGET_MS} ms överskriden — källan svarar inte i tid`)), BUDGET_MS)),
    ]);
  }
  catch (e) { console.error(`  ✗ körfel: ${e.message.split('\n')[0]}`); anyFail = true; continue; }

  // Källa som väntar på en credential (t.ex. en API-nyckel som ännu inte lagts in som secret)
  // är varken verifierad eller drivande — den är pending. Neutral skip, aldrig rött.
  if (res.skipped) {
    for (const n of res.notes ?? []) console.log(`  · ${n}`);
    console.log(`  → ⏭ [${v.id}] väntar (tänds när källans credential finns)`);
    continue;
  }

  for (const n of res.notes ?? []) console.log(`  · ${n}`);
  for (const c of res.checks ?? []) {
    // Fabriken vaktar sedan 2026-08-09 två sorters böcker. En logg som kallar avtalsvillkor för
    // "pris" läses fel klockan tre på natten — och en vakt tolkas efter sin logg, inte sin kod.
    const bok = (v.kind ?? 'pris') === 'villkor' ? 'villkorsbok' : 'prisbok';
    console.log(`  ${c.ok ? '✓' : '✗ DRIFT'} ${c.name}: ${bok} ${c.expected} · live ${c.actual}`);
  }

  const drift = (res.checks ?? []).filter((c) => !c.ok);
  const fatal = res.fatal || !(res.checks?.length); // oåtkomlig källa eller inga checkar = rött
  if (fatal || drift.length) {
    anyFail = true;
    console.error(`  → RÖTT [${v.id}]: ${fatal ? 'källa oåtkomlig/parse-fel — kan inte verifiera' : `${drift.length} ${(v.kind ?? 'pris') === 'villkor' ? 'villkorspost(er) kräver en människa' : 'pris drivit'}`}`);
  } else {
    console.log(`  → ✓ [${v.id}] håller (${res.checks.length} tal verifierade mot källan)`);
  }
}

if (anyFail) {
  console.error('\n[verify] FAIL — minst en källa drivit eller är oåtkomlig. Granska, uppdatera pris-/villkorsboken + bumpa verifieringsdatum, kör testsviten.');
  process.exit(1);
}
console.log('\n[verify] ✓ alla körda verifierare håller mot sina källor — ankarena håller.');
// En timeout:ad run() lever vidare i bakgrunden med en öppen browser och skulle annars hålla
// processen vid liv tills jobbets tak dödar den — samma tysta hängning vi just byggt bort.
process.exit(0);
