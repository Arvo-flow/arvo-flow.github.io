// scripts/probe-fakturanummer.mjs — LJUGER MODELLEN OM FAKTURANUMRET?
//
// Innan ett identifikationsnummer får stå i kundens rum måste vi veta hur ofta det är påhittat.
// Ett hallucinerat fakturanummer ser identiskt ut med ett avläst och bär precisionens auktoritet:
// kunden letar efter "Faktura 9923", hittar den inte, och drar slutsatsen att vi har fel om allt
// annat också. Frekvensen får inte gissas — den ska mätas, på riktiga fakturor.
//
// DEN ICKE-CIRKULÄRA KONTROLLEN (samma princip som SR-07 och öres-stickprovet 2026-08-12):
// modellens påstående prövas mot dokumentets TEXTLAGER, utvunnet deterministiskt med pdfjs. Det
// är en genuint oberoende väg fram till samma papper — ingen modell, ingen prompt. Att låta en
// modell kontrollera en modell vore att mäta med samma linjal två gånger.
//
// Sonden SKRIVER INGENTING och rör inte produktionen. Den svarar på en enda fråga: av de fakturor
// där modellen påstår ett nummer, hur många står faktiskt i dokumentet?
import { deklarera } from '../lib/sondkontrakt.js';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
import { extractInvoice } from '../agents/test-invoice/extract.js';
import { harFakturanummerform, finnsITextlager } from '../lib/fakturanummer.js';

deklarera({
  namn: 'probe-fakturanummer',
  fangar: 'Hur ofta modellen påstår ett fakturanummer, hur ofta påståendet har giltig form, och hur ofta numret FAKTISKT står i dokumentets textlager. Skiljer tystnad (inget nummer) från fabrikation (ett nummer som inte finns på pappret).',
  blind: 'Textlagret är bara ett vittne för PDF:er som HAR ett textskikt. En skannad faktura ger tom text, och då kan sonden varken bekräfta eller avfärda — de fallen räknas separat som "okontrollerbara" och får aldrig blandas in i felprocenten. Sonden vet heller inte om numret modellen läste är rätt FÄLT: står både kundnummer och fakturanummer på pappret bekräftar textlagret båda, och en förväxling ser ut som en träff.',
});

const KORPUS = 'test-pdfs';
const filer = readdirSync(KORPUS).filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
// || och inte ??: GitHub Actions sätter en ANGIVEN-MEN-TOM input till tom sträng, och
// '' ?? x är ''. Number('') är 0 → slice(0,0) → NOLL fakturor mätta, och sonden hade rapporterat
// "0 prövade" som om korpusen vore tom. Exakt samma fälla som 422-felet i skicka-rumslank —
// och sondvakten (SV-06) fällde mig på den igen, i samma session som jag skrev vakten.
const max = Number(process.env.MAX_PDF || filer.length);
const urval = filer.slice(0, max);

console.log(`\n═══ FAKTURANUMMER · ${urval.length} riktiga fakturor ═══\n`);

const utfall = { tyst: 0, bekraftat: 0, fabricerat: 0, ogiltig_form: 0, okontrollerbart: 0, fel: 0 };
const fabrikat = [];

for (const [i, fil] of urval.entries()) {
  const bytes = readFileSync(join(KORPUS, fil));
  let text = '';
  try { ({ text } = await extraheraTextlager(bytes)); } catch { text = ''; }

  let ex;
  try {
    ex = await extractInvoice({ pdfBytes: bytes });
  } catch (err) {
    utfall.fel++;
    console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} ⛔ extraktion föll: ${err.message.slice(0, 60)}`);
    continue;
  }

  const nr = ex?.invoiceNumber ?? null;
  if (!nr) { utfall.tyst++; console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} — inget nummer påstått`); continue; }
  if (!harFakturanummerform(nr)) {
    utfall.ogiltig_form++;
    console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} ⚠️  ogiltig form: "${String(nr).slice(0, 24)}"`);
    continue;
  }
  if (!text.trim()) {
    utfall.okontrollerbart++;
    console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} ?  "${nr}" · inget textlager att pröva mot`);
    continue;
  }
  if (finnsITextlager(nr, text)) {
    utfall.bekraftat++;
    console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} ✓  "${nr}"`);
  } else {
    utfall.fabricerat++;
    fabrikat.push({ fil, nr });
    console.log(`${String(i + 1).padStart(3)}. ${fil.padEnd(34)} ⛔ "${nr}" STÅR INTE I DOKUMENTET`);
  }
}

const provade = utfall.bekraftat + utfall.fabricerat;
console.log(`\n═══ UTFALL ═══`);
console.log(`  inget nummer påstått ....... ${utfall.tyst}`);
console.log(`  ogiltig form (grindad) ..... ${utfall.ogiltig_form}`);
console.log(`  okontrollerbart (ingen text) ${utfall.okontrollerbart}`);
console.log(`  extraktionsfel ............. ${utfall.fel}`);
console.log(`  ── prövade mot pappret: ${provade} ──`);
console.log(`  BEKRÄFTADE ................. ${utfall.bekraftat}`);
console.log(`  FABRICERADE ................ ${utfall.fabricerat}`);
if (provade > 0) {
  const pct = ((utfall.fabricerat / provade) * 100).toFixed(1);
  console.log(`\n  Fabrikationsfrekvens: ${pct} % av de prövade.`);
  console.log(utfall.fabricerat === 0
    ? '  → Noll fabrikat. Fältet kan visas för kund, MED textlagergrinden kvar som lås.'
    : '  → Fältet får INTE visas för kund förrän grinden fångar dessa:');
  for (const f of fabrikat) console.log(`      ${f.fil}: "${f.nr}"`);
} else {
  console.log('\n  ⚠️ Noll prövade — mätningen säger ingenting. Läs blindfläcken innan någon slutsats dras.');
}
