// scripts/probe-tele2-coax.mjs — diagnos: vad returnerar Tele2:s bredbands-API NU för våra
// verifyAddresses? Vakten larmar att Max/COAX 1200 inte bekräftas (2 körningar). Är COAX borta
// vid adresserna, omdöpt, eller är endpointen degraderad? Vi dumpar ALLA produkter per adress
// (family/hastighet/pris/bindning) + några extra adresser för att se om COAX finns någonstans.
// Ren fetch via lib/tele2-broadband.js (ingen browser). HTTP-egress krävs (GH Actions).

import { tele2BroadbandFor } from '../lib/tele2-broadband.js';

const ADDRESSES = [
  // De tre verifyAddresses som vakten replayar:
  'Götgatan 92B, Stockholm', 'Sturegatan 33, Sundbyberg', 'Storgatan 41F, Östersund',
  // Extra adresser (täta stadskärnor där COAX historiskt funnits) för att se om Max finns alls:
  'Sveavägen 44, Stockholm', 'Kungsgatan 12, Göteborg', 'Stortorget 1, Malmö', 'Drottninggatan 5, Stockholm',
];

for (const a of ADDRESSES) {
  try {
    const r = await tele2BroadbandFor(a);
    console.log(`\n#### ${a}\n     adressId ${r.addressId} · upplöst "${r.address}" · ${r.products.length} produkter`);
    for (const p of r.products) {
      console.log(`     ${p.family.padEnd(9)} ${String(p.downMbps ?? '?')}/${p.upMbps ?? '?'} Mbit · ${p.monthlyExcVat} kr exkl (${p.bindingMonths} mån bind) · "${p.label}"`);
    }
    if (!r.products.length) console.log('     (0 produkter — obetjänad eller endpoint-fel)');
    const families = [...new Set(r.products.map((p) => p.family))];
    console.log(`     → familjer: ${families.join(', ') || 'inga'}`);
  } catch (e) {
    console.log(`\n#### ${a} → ERR ${e.message.split('\n')[0]}`);
  }
}
console.log('\n[probe-tele2-coax] klar');
