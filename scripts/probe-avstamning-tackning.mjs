// scripts/probe-avstamning-tackning.mjs — VAD SKULLE GRINDEN SÄGA OM VI SLOG PÅ DEN I DAG?
//
// SAAS-AVSTÄMNINGEN (lib/saas-avstamning.js) kräver fyra fält per rad: leverantör, heltals-antal,
// period och momsbas. Innan någon kategori tvingas under grinden måste vi veta vad den DÅ skulle
// säga om verkliga rader — inte vad vi hoppas. Sonden kör grinden mot hela SaaS-fixturkorpusen och
// redovisar utfallsfördelningen rått.
//
// Frågan sonden finns för: "tystar vi 50 % av kunderna eller 100 %?" Ett svar ur magkänsla duger
// inte som beslutsunderlag för att riva en fungerande kategori.
import { deklarera } from '../lib/sondkontrakt.js';
import { stamAv, AVST } from '../lib/saas-avstamning.js';
import { fixtures as f05 } from '../tests/fixtures/05-saas.mjs';
import { fixtures as f08 } from '../tests/fixtures/08-realistic.mjs';

deklarera({
  namn: 'probe-avstamning-tackning',
  fangar: 'Hur många verkliga SaaS-fakturarader som skulle passera avstämningsgrinden med dagens extraktionsfält — och vilket krav som fäller dem.',
  blind: 'Fixturerna är extraktionens utdata så som sviten fångat den, inte ett slumpurval av verklig produktionstrafik. En fältsvit som saknas i fixturerna men finns live syns inte här.',
});

const rader = [...f05, ...f08]
  .filter((fx) => String(fx.category ?? '').startsWith('saas'))
  .flatMap((fx) => (fx.lineItems ?? []).map((l) => ({ fx: fx.id, l })));

const fordelning = new Map();
let bevisade = 0;

for (const { l } of rader) {
  // Bygg radobjektet ur EXAKT de fält extraktionen faktiskt producerar i dag.
  const rad = {
    leverantor: 'microsoft',
    antal:      l.quantity,
    beloppOre:  typeof l.amount === 'number' ? Math.round(l.amount * 100) : null,
    period:     'manad',
    momsbas:    l.momsbas,        // finns inte i schemat — mätningen visar det
    valuta:     'SEK',
  };
  const ut = stamAv(rad, []);
  if (ut.utfall === AVST.BEVISAD_LIKHET) { bevisade++; continue; }
  fordelning.set(ut.skal, (fordelning.get(ut.skal) ?? 0) + 1);
}

console.log(`\n  ${rader.length} SaaS-rader ur fixturkorpusen körda genom grinden.\n`);
for (const [skal, n] of [...fordelning].sort((a, b) => b[1] - a[1])) {
  const pct = Math.round((n / rader.length) * 100);
  console.log(`  ${String(n).padStart(4)} rader (${String(pct).padStart(3)} %)  ← ${skal}`);
}
console.log(`  ${String(bevisade).padStart(4)} rader (${String(Math.round((bevisade / rader.length) * 100)).padStart(3)} %)  ← BEVISAD LIKHET`);

const medAntal = rader.filter(({ l }) => typeof l.quantity === 'number' && Number.isInteger(l.quantity) && l.quantity >= 1).length;
console.log(`\n  Delmätning: ${medAntal} av ${rader.length} rader (${Math.round((medAntal / rader.length) * 100)} %) bär ett heltalsantal.`);
console.log('  Momsbasen finns inte i extraktionsschemat alls — den kan därför aldrig bäras av någon rad i dag.');
