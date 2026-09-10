// scripts/probe-tryckkurs.mjs — VAD GÖR RING 1 NÄR VÅR KURS RÖR SIG?
//
// Instrumentet bakom fixen 2026-09-10. Ring 1 prövade totalen som ett SEK-motvärde genom att
// dividera med VÅR dagskurs — men SEK-talet på pappret räknades fram av leverantören med DERAS.
// Sonden varierar vår kurs över hela det rimliga bandet och redovisar Ring 1:s dom OCH DESS SKÄL,
// eftersom felläget visade sig vara att fakturan FRIADES på fel grund, inte att den fälldes.
//
// Kör: node scripts/probe-tryckkurs.mjs
import { deklarera } from '../lib/sondkontrakt.js';
import { routeExtraction } from '../agents/test-invoice/extract.js';
import { konverteraTillSek } from '../lib/valutakonvertering.js';

deklarera({
  namn: 'probe-tryckkurs',
  fangar: 'Om Ring 1:s dom om radsumman är stabil när VÅR växelkurs rör sig, och vilken gren som '
    + 'friar. Skiljer «friad via motvärdesläsningen» från «friad via momsförklaringen» — det var '
    + 'den skillnaden som avslöjade att en valutadrift tvättades som moms.',
  blind: 'Sonden matar ett handskrivet extraktionsobjekt med Microsoft-fakturans verkliga tal, '
    + 'inte en riktig PDF genom modellen. Den mäter alltså GRINDEN, aldrig extraktionen före den: '
    + 'läser modellen fel total eller fel radbelopp ser sonden inget av det. Den vet heller '
    + 'ingenting om hur ofta fakturor i verkligheten trycker sin kurs — det är en korpusfråga.',
});

const MS = (tryckkurs) => ({
  supplier: 'Microsoft Ireland Operations Ltd', currency: 'USD',
  invoiceTotal: 8128, annualCost: 9360, recurringAmount: 780, tryckkurs,
  lineItems: [
    { description: 'Microsoft 365 E3', quantity: 15, unitPrice: 22, amount: 330, type: 'recurring_subscription' },
    { description: 'Copilot', quantity: 15, unitPrice: 30, amount: 450, type: 'recurring_subscription' },
  ],
});

const dom = (tryckkurs, varKurs) => {
  const k = konverteraTillSek(MS(tryckkurs), { rate: varKurs, valuta: 'USD', source: 'riksbank', date: '2026-09-10' });
  return (routeExtraction(k, {}).verifications ?? []).find((v) => v.id === 'radsumma');
};

const BAND = [9.0, 9.5, 9.7, 9.79, 10.0, 10.42, 11.0, 11.13, 11.2, 11.5, 12.0];

for (const [rubrik, tryckkurs] of [['MED tryckt kurs 10,42 på pappret', 10.42], ['UTAN tryckt kurs', null]]) {
  console.log(`\n=== ${rubrik} ===`);
  console.log('vår kurs   dom     skäl');
  console.log('─'.repeat(78));
  for (const k of BAND) {
    const v = dom(tryckkurs, k);
    console.log(`${String(k).padEnd(10)} ${String(v?.status ?? '—').padEnd(7)} ${(v?.detalj ?? '').slice(0, 58)}`);
  }
}
console.log('\nLäs: «skillnaden är momsen» på en USD-faktura med reverse charge är ett PÅHITTAT skäl.');
console.log('Domen ska vara identisk över hela bandet — annars vilar den på vår dagskurs.');
