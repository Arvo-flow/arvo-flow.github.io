// scripts/probe-ct-vag.mjs — SVARAR TREDJE VÅGEN, PÅ RIKTIGT?
//
// Dörrfotona kan inte svara på det: harnesset väntar in kortet och fotar efter 1,5 s, medan
// certifikatvågen har 28 s på sig. Ett kort utan raden bevisar alltså ingenting om vågen — bara
// att fotot togs först. (Tredje gången i dag som mätinstrumentet, inte systemet, var felet.)
//
// Sonden ringer den UTLAGDA endpointen med ctOnly och redovisar vad den svarar. Det är den enda
// mätning som skiljer "vågen fungerar men syns inte i fotot" från "vågen levererar inget".
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-ct-vag',
  fangar: 'Vad den utlagda /api/reveal svarar i ctOnly-läget, per domän, med tid mätt — alltså om certifikatvågen levererar raden till en riktig besökare.',
  blind: 'Om raden når SKÄRMEN. Sonden läser HTTP-svaret, inte kortet; renderingen bevisas bara av ett foto som faktiskt väntat in vågen.',
});

const BAS = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const DOMANER = ['skanska.se', 'volvo.se', 'seb.se', 'westander.se', 'trivector.se', 'castra.se'];

for (const d of DOMANER) {
  const t0 = Date.now();
  try {
    const r = await fetch(`${BAS}/api/reveal`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `x@${d}`, ctOnly: true }), signal: AbortSignal.timeout(40000),
    });
    const j = await r.json().catch(() => ({}));
    const rad = j.findings?.[0];
    console.log(`  ${d.padEnd(16)} ${String(Date.now() - t0 + 'ms').padStart(8)}  HTTP ${r.status}  ${rad ? `✓ «${rad.title}»` : '— ingen rad'}`);
    if (rad) console.log(`  ${''.padEnd(16)} ${''.padStart(8)}  källa: ${rad.source}`);
  } catch (e) {
    console.log(`  ${d.padEnd(16)} ${String(Date.now() - t0 + 'ms').padStart(8)}  ✗ ${e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 50)}`);
  }
}

console.log('\n  Andra körningen på samma domän ska vara SNABB — flimmervakten cachar träffen i 30 dagar.');
console.log('  Är den långsam igen cachas inget, och då är det cachen som ska lagas, inte vågen.');
