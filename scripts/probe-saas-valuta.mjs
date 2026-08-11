// scripts/probe-saas-valuta.mjs — STEG 0 för SaaS-grinden: finns ett ankare i kundens valuta?
//
// Prisgrinden stämmer av kundens fakturarad mot en verifierad prisbokrad, och FX är förbjudet
// (bibeln: en omräkning via dagskurs är en gissning). Alltså kan grinden bara fyra när prisboken
// bär en rad i SAMMA valuta som fakturan. Mätningen av boken är gjord och entydig:
//
//   saas-crm: 4 rader, samtliga USD.  saas-other: noll tier-rader alls.
//
// En svensk SME faktureras i SEK eller EUR. Byggs grinden mot USD-ankare får vi ett perfekt
// maskineri som aldrig fyrar — och det är precis det fel som den här kodbasen straffat oss för
// två gånger på en vecka (hash-vakten som inte kunde larma, sonden som var blind).
//
// Sonden svarar därför på EN fråga innan en rad grindlogik skrivs: publicerar leverantören ett
// PUBLIKT listpris i EUR eller SEK? Den kurerar ingenting, den läser och redovisar. Adresserna
// nedan PRÖVAS — en adress är bevisad först när den svarar och bär ett pris, aldrig för att den
// ser rimlig ut.
import { deklarera } from '../lib/sondkontrakt.js';
import { withPage } from '../lib/verifiers/core.mjs';

deklarera({
  namn: 'probe-saas-valuta',
  fangar: 'Om en SaaS-leverantör publicerar ett publikt listpris i EUR eller SEK, och vilka tal som i så fall står där.',
  blind: 'Priser som bara visas efter val av land i en inloggad kassa eller via geo-IP från Sverige — sonden kör från en GitHub-runner, inte från en svensk kontorsuppkoppling.',
});

// Varje kandidat är en leverantör som REDAN har en rad i prisbokens saas-crm (alltså en vi vet
// att våra kunder möter). Adressvarianterna är konventionella lokaliseringsmönster som prövas.
const KANDIDATER = [
  { nyckel: 'pipedrive', urls: ['https://www.pipedrive.com/en/pricing', 'https://www.pipedrive.com/sv/priser', 'https://www.pipedrive.com/de/preise'] },
  { nyckel: 'hubspot',   urls: ['https://www.hubspot.com/pricing/crm/starter', 'https://www.hubspot.de/pricing/crm/starter', 'https://www.hubspot.com/pricing/crm/starter?currency=EUR'] },
  { nyckel: 'zoho',      urls: ['https://www.zoho.com/crm/zohocrm-pricing.html', 'https://www.zoho.com/se/crm/zohocrm-pricing.html', 'https://www.zoho.com/eu/crm/zohocrm-pricing.html'] },
];

// Valutamarkörer. Vi RÄKNAR dem och redovisar rått — sonden drar ingen slutsats om vilken valuta
// sidan "egentligen" visar. Två valutor på samma sida är ett okänt läge, inte ett val.
const VALUTOR = [
  ['EUR', /(?:€|\bEUR\b)/g],
  ['SEK', /(?:\bkr\b|\bSEK\b)/g],
  ['USD', /(?:\$|\bUSD\b)/g],
  ['GBP', /(?:£|\bGBP\b)/g],
];

for (const k of KANDIDATER) {
  console.log(`\n═══════ ${k.nyckel} ═══════`);
  for (const url of k.urls) {
    let text = null;
    try {
      text = await withPage(url, async (page, status) => {
        if (typeof status === 'number' && status >= 400) return null;
        return (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
      }, { timeoutMs: 40000, settleMs: 3500 });
    } catch (e) { console.log(`  · ${url}\n      → ${String(e.message).slice(0, 60)}`); continue; }
    if (!text || text.length < 500) { console.log(`  · ${url}\n      → oläsbar eller tom (${text?.length ?? 0} tecken)`); continue; }

    const funna = VALUTOR.map(([namn, rx]) => [namn, (text.match(rx) ?? []).length]).filter(([, n]) => n > 0);
    console.log(`  · ${url}`);
    console.log(`      → ${text.length} tecken · valutamarkörer: ${funna.map(([n, c]) => `${n}×${c}`).join(' · ') || 'inga'}`);

    // Talen intill varje icke-USD-markör — underlaget för ett framtida ankare. Aldrig ett ankare
    // i sig: ett tal på en sida är inte ett verifierat listpris förrän en verifierare vaktar det.
    for (const [namn, rx] of VALUTOR) {
      if (namn === 'USD') continue;
      const träffar = [...text.matchAll(rx)].slice(0, 4);
      for (const t of träffar) {
        const omgivning = text.slice(Math.max(0, t.index - 60), t.index + 60).trim();
        console.log(`          [${namn}] «…${omgivning}…»`);
      }
    }
  }
}

console.log('\nSonden kurerar ingenting. Ett tal blir ett prisbokankare först när en verifierare i');
console.log('fabriken vaktar det veckovis — annars är det bara en siffra någon en gång såg.');
