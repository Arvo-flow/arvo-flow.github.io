// scripts/probe-bokslutsar.mjs — ÄR "BOKSLUTSÅR" VERKLIGEN BOKSLUTSÅRET?
//
// Grundaren frågade varför Avida-kortet säger "Ert bokslut 2024" när Skanska säger 2025.
// Kodläsningen gav ett obehagligt svar: raden tar året ur companyAccountsLastUpdatedDate — när
// POSTEN senast uppdaterades — och kallar det bokslutsår. Trendraden strax under tar sitt år ur
// companyAccounts[].year, det ÄKTA räkenskapsåret. Två storheter, en etikett.
//
// Sammanfaller de oftast? Antagligen. Men "oftast" är inte en källa, och ett tal som bär fel
// etikett är samma klass av fel som allt annat vi jagat i dag: rätt siffra, fel fråga besvarad.
//
// Sonden läser rått: uppdateringsstämpeln, rubrikens omsättning/anställda, och HELA
// bokslutshistoriken med sina egna årtal. Skiljer de sig är raden fel, inte bara oprecis.
import { deklarera } from '../lib/sondkontrakt.js';
import { extractNextData, extractAccountHistory } from '../lib/business-intel.js';

deklarera({
  namn: 'probe-bokslutsar',
  fangar: 'Vilket år kortets bokslutsrad FAKTISKT bygger på, jämfört med räkenskapsårens egna årtal i samma post.',
  blind: 'Om spegelns bokslutsdata i sin tur ligger efter Bolagsverkets original. Sonden jämför två fält i SAMMA post — den kan inte se om posten som helhet är gammal.',
});

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36', Accept: 'text/html' };
const FALL = [
  { orgnr: '5562309004', namn: 'Avida Bank AB (publ) — kortet som väckte frågan' },
  { orgnr: '5560339086', namn: 'Skanska Sverige AB — visade 2025' },
  { orgnr: '5560004615', namn: 'Skanska AB' },
];

for (const { orgnr, namn } of FALL) {
  console.log(`\n═══ ${orgnr} · ${namn}`);
  try {
    const r = await fetch(`https://www.allabolag.se/${orgnr}`, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(25000) });
    if (!r.ok) { console.log(`  ✗ HTTP ${r.status}`); continue; }
    const data = extractNextData(await r.text());
    const c = data?.props?.pageProps?.company ?? null;
    if (!c) { console.log('  ✗ ingen bolagspost i svaret'); continue; }
    const stampel = String(c.companyAccountsLastUpdatedDate || '');
    const hist = extractAccountHistory(c.companyAccounts);
    console.log(`  rubrikens tal:        ${c.revenue ?? '—'} tkr · ${c.employees ?? '—'} anställda`);
    console.log(`  uppdateringsstämpel:  ${stampel || '—'}   → kortet skriver "bokslut ${stampel.slice(0, 4) || '—'}"`);
    console.log(`  räkenskapsåren i posten: ${hist.length ? hist.map((h) => h.year).join(', ') : '(inga)'}`);
    if (hist.length) {
      console.log(`  senaste årets tal:    ${hist[0].revenueTkr} tkr · ${hist[0].employees ?? '—'} anställda  (år ${hist[0].year})`);
      const stampelAr = stampel.slice(0, 4);
      if (stampelAr && stampelAr !== hist[0].year) {
        console.log(`  ⇒ SKILJER SIG: kortet säger ${stampelAr}, senaste räkenskapsåret är ${hist[0].year}.`);
      } else if (stampelAr) {
        console.log('  ⇒ Samma tal här — men av sammanträffande, inte av konstruktion.');
      }
      if (String(c.revenue) !== String(hist[0].revenueTkr)) {
        console.log(`  ⇒ OBS: rubrikens omsättning (${c.revenue}) ≠ senaste räkenskapsårets (${hist[0].revenueTkr}).`);
      }
    }
  } catch (e) { console.log(`  ✗ ${String(e.message).slice(0, 60)}`); }
}

console.log('\n  Ett tal med fel etikett är samma fel som ett tal utan källa — det besvarar en annan fråga.');
