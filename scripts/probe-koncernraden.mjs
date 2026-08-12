// scripts/probe-koncernraden.mjs — SÄGER REGISTRET VERKLIGEN DET VI SKRIVER?
//
// Kortet för Skanska Sverige AB påstår "Moderbolag: Skanska Kraft AB — 389 bolag i
// ägarstrukturen". Koden hämtar namnet ur källans eget fält (parentCompanyName), alltså plockar vi
// inte en godtycklig enhet ur en struktur. Men det är ett resonemang om koden, inte ett bevis om
// datat — och raden visas för den enda läsare som vet bättre än vi: bolaget själv.
//
// Skanska AB (publ) är den noterade toppen. Står ett mellanled som närmaste ägare är raden ett
// FYND (få känner till mellanledet). Står något annat är den en trovärdighetsmiss på kortets mest
// synliga påstående. Sonden hämtar rå fakta och lägger fram dem — den kurerar ingenting.
import { deklarera } from '../lib/sondkontrakt.js';
import { fetchBusinessFactsByOrgnr } from '../lib/business-intel.js';

deklarera({
  namn: 'probe-koncernraden',
  fangar: 'Vad källan FAKTISKT uppger som moderbolag, koncernstorlek, grundandeår och bokslut för de orgnr vi visar kort för.',
  blind: 'Om källans uppgift stämmer med Bolagsverkets register. Sonden läser vår transportväg, inte myndighetens original — en spegel som ligger efter syns inte här.',
});

const FALL = [
  { orgnr: '5560339086', vantat: 'Skanska Sverige AB — kortet i grundarens skärmbild' },
  { orgnr: '5560004615', vantat: 'Skanska AB (publ) — den noterade toppen, referens' },
];

for (const { orgnr, vantat } of FALL) {
  console.log(`\n═══ ${orgnr} · ${vantat}`);
  let f;
  try { f = await fetchBusinessFactsByOrgnr(orgnr); }
  catch (e) { console.log(`  ✗ fel: ${String(e.message).slice(0, 90)}`); continue; }
  if (!f) { console.log('  ✗ ingen träff — grinden vägrade binda fakta'); continue; }
  console.log(`  legalName:    ${f.legalName ?? '—'}`);
  console.log(`  orgnr:        ${f.orgnr ?? '—'}`);
  console.log(`  bokslut:      ${f.year ?? '—'} · ${f.revenueTkr ?? '—'} tkr · ${f.employees ?? '—'} anställda`);
  console.log(`  grundandeår:  ${f.foundedYear ?? f.registeredYear ?? '—'}`);
  console.log(`  koncern:      moderbolag «${f.koncern?.parentName ?? '—'}» · ${f.koncern?.companies ?? '—'} bolag`);
  console.log(`  proveniens:   ${f.provenance ?? '—'}`);
}

console.log('\nSonden lägger fram vad källan sa. Om raden ska stå kvar avgörs av om namnet är sant.');
