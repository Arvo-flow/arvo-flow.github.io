// scripts/probe-stickprov.mjs — MASKINENS SIDA AV STICKPROVET.
//
// Bränslesonden visade att observationsfälten kommer fram, och radaritmetiken (SR-07) fäller
// inbördes motsägelser. Ingen av dem kan se om en avläsning som är KONSEKVENT fel ändå passerar —
// en modell som läser fel ruta på både à-pris och belopp producerar en rad som går ihop perfekt.
//
// Den luckan stängs bara av en oberoende avläsning av samma papper. Sonden gör därför en enda sak:
// den skriver ut EXAKT vad extraktionen påstår, rad för rad, i öre, utan tolkning — så att talen
// kan ställas mot fakturan av någon som läser den på annat sätt. Sonden dömer ingenting.
import { readFileSync } from 'node:fs';
import { deklarera } from '../lib/sondkontrakt.js';
import { extractInvoice } from '../agents/test-invoice/extract.js';

deklarera({
  namn: 'probe-stickprov',
  fangar: 'Exakt vad extraktionen påstår om varje rad (antal, à-pris i öre, belopp i öre, momsbas) — underlaget för en oberoende avläsning av samma faktura.',
  blind: 'Allt om sanningshalten. Sonden jämför ingenting och dömer ingenting; den lägger fram maskinens påstående. Domen kräver en andra avläsning av pappret, och den avläsningen görs inte här.',
});

const FAKTUROR = [
  'cloudreseller-norden.pdf',   // 2 rader avvisade av radaritmetiken — stämmer avvisningen?
  'dustin-m365-standard.pdf',
  'microsoft.pdf',
  'microsoft-new.pdf',
  'microsoft-direkt-usd.pdf',   // gav 0/2 rader med ören i en körning, 2/2 i nästa
];

const ore = (v) => (Number.isInteger(v) ? `${(v / 100).toFixed(2).replace('.', ',')} kr (${v} öre)` : '—');

for (const fil of FAKTUROR) {
  console.log(`\n═══════════ ${fil} ═══════════`);
  let ex;
  try { ex = await extractInvoice({ pdfBytes: readFileSync(`test-pdfs/${fil}`) }); }
  catch (e) { console.log(`  fel: ${String(e.message).slice(0, 80)}`); continue; }

  console.log(`  leverantör: ${ex.supplier ?? '—'} · valuta: ${ex.currency ?? '—'}`);
  console.log(`  momsbas: ${ex.momsbas ?? '—'} · momssats: ${ex.momssats ?? '—'} · period: ${ex.billingPeriod ?? '—'}`);
  console.log(`  fakturatotal (exkl moms, enligt extraktionen): ${ex.invoiceTotal ?? '—'}`);
  for (const [i, l] of (ex.lineItems ?? []).entries()) {
    console.log(`  [${i}] «${l.description}»`);
    console.log(`      typ=${l.type} · prorata=${l.is_prorata} · antal=${l.quantity ?? '—'}`);
    console.log(`      à-pris: ${ore(l.unitPriceOre)}   (kronorfält: ${l.unitPrice ?? '—'})`);
    console.log(`      belopp: ${ore(l.amountOre)}   (kronorfält: ${l.amount ?? '—'})`);
    if (Number.isInteger(l.unitPriceOre) && Number.isInteger(l.quantity) && Number.isInteger(l.amountOre)) {
      const produkt = l.unitPriceOre * l.quantity;
      console.log(`      radaritmetik: ${l.unitPriceOre} × ${l.quantity} = ${produkt} ${produkt === l.amountOre ? '= belopp ✓' : `≠ belopp ${l.amountOre} ✗`}`);
    }
  }
}

console.log('\nSonden lägger fram maskinens påstående. Domen kräver en andra avläsning av pappret.');
