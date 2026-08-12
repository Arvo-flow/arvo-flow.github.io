// scripts/probe-avstamningsbransle.mjs — KOMMER BRÄNSLET FRAM?
//
// Avstämningsgrinden mätte 0 av 61 rader. Två orsaker: momsbasen fanns inte i extraktionsschemat
// alls, och kronorfältet kan inte bära ett per-licenspris (133,82 → 133). Båda är nu åtgärdade i
// schemat — men ett schemafält är ett LÖFTE om en observation, inte observationen.
//
// Läxan från den här veckan är exakt den skillnaden: attribueringslåset var byggt, testat och
// mörkt i två månader därför att ingen mätte om det MATADES. Ett nytt fält som modellen aldrig
// fyller i är samma sjukdom i ny kostym — schemat ser komplett ut, sviten är grön, och grinden
// tiger vidare av ett skäl ingen upptäcker.
//
// Sonden kör därför den SKARPA extraktionen mot verkliga fakturor och räknar hur ofta fälten
// faktiskt kommer tillbaka ifyllda — och kör sedan hela kedjan mataren → grinden, så att svaret
// blir ett utfall och inte en fältinventering.
import { readFileSync } from 'node:fs';
import { deklarera } from '../lib/sondkontrakt.js';
import { extractInvoice, routeExtraction } from '../agents/test-invoice/extract.js';
import { categorize } from '../agents/categorizer/categorize.js';
import { byggAvstamningsrader } from '../lib/saas-rad.js';

deklarera({
  namn: 'probe-avstamningsbransle',
  fangar: 'Hur ofta modellen faktiskt fyller i momsbas och öresbelopp när fakturan visar dem — och hur många rader som därmed når fram till grinden.',
  blind: 'Om ett ifyllt fält är RÄTT mot pappret. Mataren kontrollerar numera fakturans egna tal mot varandra (à-pris × antal = radbelopp), vilket fäller inbördes motsägelser utan att fråga prisboken — men en avläsning som är konsekvent fel på BÅDA fälten passerar. Den sista milen kräver mänsklig avläsning av samma faktura.',
});

const KANDIDATER = [
  'cloudreseller-norden.pdf', 'dustin-m365-standard.pdf', 'microsoft.pdf', 'microsoft-new.pdf',
  'microsoft-direkt-usd.pdf', 'atea-m365-overskott.pdf', 'crayon-m365-azure.pdf',
  'salesforce-enterprise.pdf', 'hubspot-marketing-pro.pdf', 'atlassian.pdf',
];

let medMomsbas = 0, medSats = 0, radTotalt = 0, radMedOre = 0, radNadde = 0;
const skalRakning = new Map();

for (const fil of KANDIDATER) {
  let ex, kat;
  try {
    ex = await extractInvoice({ pdfBytes: readFileSync(`test-pdfs/${fil}`) });
    if (routeExtraction(ex).route === 'unsupported') { console.log(`  ${fil.padEnd(34)} → ej stödd`); continue; }
    kat = await categorize({
      supplier: ex.supplier ?? '',
      description: (ex.lineItems ?? []).map((l) => l.description).join(', '),
      amount: ex.amount ?? 0,
    });
  } catch (e) { console.log(`  ${fil.padEnd(34)} → fel: ${String(e.message).slice(0, 50)}`); continue; }

  const rader = ex.lineItems ?? [];
  const ore = rader.filter((l) => Number.isInteger(l.amountOre)).length;
  if (ex.momsbas) medMomsbas++;
  if (ex.momssats != null) medSats++;
  radTotalt += rader.length;
  radMedOre += ore;

  const utfall = byggAvstamningsrader(rader, {
    leverantor: kat.normalizedSupplier ?? null,
    valuta: ex.currency ?? null,
    momsbas: ex.momsbas ?? null,
    period: ex.billingPeriod ?? null,
  });
  const ok = utfall.filter((u) => u.ok).length;
  radNadde += ok;
  for (const u of utfall) if (!u.ok) skalRakning.set(u.skal, (skalRakning.get(u.skal) ?? 0) + 1);

  console.log(`  ${fil.padEnd(34)} ${String(kat.category).padEnd(20)} momsbas=${ex.momsbas ?? '—'} sats=${ex.momssats ?? '—'} · ${ore}/${rader.length} rader med ören · ${ok}/${rader.length} nådde grinden`);
}

console.log(`\n  ── SUMMERING ──`);
console.log(`  fakturor med momsbas ifylld:  ${medMomsbas} av ${KANDIDATER.length}`);
console.log(`  fakturor med momssats ifylld: ${medSats} av ${KANDIDATER.length}`);
console.log(`  rader med öresbelopp:         ${radMedOre} av ${radTotalt}`);
console.log(`  rader som NÅDDE grinden:      ${radNadde} av ${radTotalt}`);
if (skalRakning.size) {
  console.log(`\n  Varför de andra föll:`);
  for (const [skal, n] of [...skalRakning].sort((a, b) => b[1] - a[1])) console.log(`    ${String(n).padStart(3)} × ${skal}`);
}
console.log('\n  Sonden mäter om bränslet kommer fram. Att det är RÄTT bränsle är en annan fråga,');
console.log('  och den står i blindraden överst.');
