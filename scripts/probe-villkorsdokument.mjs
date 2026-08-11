// scripts/probe-villkorsdokument.mjs — SKÄRMNING av kandidatdokumenten.
//
// Rekognosceringen (ops/probe-villkorskandidater.txt) gav adresser. Den kunde inte svara på det
// som avgör om en post får finnas i villkorsboken:
//   · är det ett FÖRETAGSdokument eller ett PRIVATdokument?
//   · bär det över huvud taget en uppsägnings- eller avtalstidsklausul?
//   · hur lyder klausulen ORDAGRANT, så att den kan kureras utan att någon minns fel?
//
// Filnamnet duger inte som svar. Telenors dokument heter TD32109.pdf och TB31206.pdf; Tele2:s
// heter Allmanna_Villkor_Tele2 utan ett ord om kundtyp. Bibelns Tele2-prejudikat kom just av att
// ett dokument såg rätt ut på ytan och gällde privattjänster. Klassen måste därför läsas ur
// TEXTEN, aldrig ur adressen.
//
// Skriptet kurerar ingenting. Det läser, räknar och citerar — underlaget för ett kureringsbeslut
// som en människa fattar på seende. Varje URL nedan kommer ur sondsvaret, ingen är påhittad.
import { deklarera } from '../lib/sondkontrakt.js';
import { extraheraTextlager } from '../lib/pdf-textlager.js';

// Sondkontraktet: mätningen får inte produceras omärkt (lib/sondkontrakt.js).
deklarera({
  namn: 'probe-villkorsdokument',
  fangar: 'Om ett kandidatdokument är företags- eller privatvillkor, och hur klausulen lyder ordagrant.',
  blind: 'Betydelsen. Sonden räknar ord och citerar text — den avgör aldrig om en klausul JURIDISKT gäller kundens tjänst, och ett dokument kan vara företagsklassat men fel produkt.',
});

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const KANDIDATER = [
  { nyckel: 'tele2', namn: 'Allmänna Villkor Tele2 2026-04-16', sida: 'https://www.tele2.se/villkor',
    url: 'https://assets.ctfassets.net/nproz1mx87a8/11KpAbUpjcKtMeus3gWYNw/fb2477ab65dd0297d74f290e2a10bd89/Allmanna_Villkor_Tele2_2026-04-16.pdf' },
  { nyckel: 'telenor', namn: 'General Terms Large Accounts TM 32 217', sida: 'https://www.telenor.se/foretag/villkor',
    url: 'https://assets.ctfassets.net/d48yc3frismn/6qvL3vnTfrVctA7xmVMzPb/a2bddf7727a1067c0e828f14fbbaac40/General_Terms_and_Conditions_Large_Accounts_-_TM_32_217_-_26-08.pdf' },
  { nyckel: 'telenor', namn: 'TD32109', sida: 'https://www.telenor.se/foretag/villkor', url: 'https://mediearkivet.telenor.se/Data/mw/Pdf/TD32109.pdf' },
  { nyckel: 'telenor', namn: 'TB31206', sida: 'https://www.telenor.se/foretag/villkor', url: 'https://mediearkivet.telenor.se/Data/mw/Pdf/TB31206.pdf' },
  { nyckel: 'telenor', namn: 'TD32112', sida: 'https://www.telenor.se/foretag/villkor', url: 'https://mediearkivet.telenor.se/Data/mw/Pdf/TD32112.pdf' },
  { nyckel: 'telenor', namn: 'TA31210', sida: 'https://www.telenor.se/foretag/villkor', url: 'https://mediearkivet.telenor.se/Data/mw/Pdf/TA31210.pdf' },
  { nyckel: 'telenor', namn: 'ctf 0883e3f1', sida: 'https://www.telenor.se/foretag/villkor',
    url: 'https://assets.ctfassets.net/d48yc3frismn/3bV6dN071TRUjztSrAEhYX/4ecafd5e0ab755b21d0f8e072925052e/0883e3f1-4e0e-434e-bc30-21c6bae6c25d.pdf' },
  { nyckel: 'telenor', namn: 'ctf a2f0c6c4', sida: 'https://www.telenor.se/foretag/villkor',
    url: 'https://assets.ctfassets.net/d48yc3frismn/3lFS3Owgm7Uf2ROqI5lkfk/2ddd6f707a33e4e10a20c7dd639cfe71/a2f0c6c4-5845-413b-90e3-f187a4bd6e8d.pdf' },
  { nyckel: 'telenor', namn: 'ctf bbef89f9', sida: 'https://www.telenor.se/foretag/villkor',
    url: 'https://assets.ctfassets.net/d48yc3frismn/4Cy4UHhf7vpAYIMSGy5Tms/77e25171ab047c24424f1b8feb5a95d0/bbef89f9-ec5f-4320-a1d2-c7502817f764.pdf' },
  { nyckel: 'spiris', namn: 'Spiris användningsvillkor', sida: 'https://www.spiris.se/villkor',
    url: 'https://www.spiris.se/globalassets/dokument/legal/anvandningsvillkor/spiris-anvandningsvillkor.pdf' },
  { nyckel: 'spiris', namn: 'Spiris särskilda villkor', sida: 'https://www.spiris.se/villkor',
    url: 'https://www.spiris.se/globalassets/dokument/legal/spiris-sarskilda-villkor.pdf' },
];

// Kundtypen läses ur texten. Räkneverket är avsiktligt trubbigt och redovisas RÅTT — sonden drar
// ingen slutsats åt oss, den lägger fram siffrorna. Ett dokument som nämner konsument tjugo gånger
// och företag två är inte vårt, hur det än heter i filnamnet.
const FORETAGSORD = /\b(företag|foretag|näringsidkare|naringsidkare|juridisk person|organisationsnummer|business|corporate)\b/gi;
const PRIVATORD = /\b(konsument|privatperson|consumer|distansavtalslagen|ångerrätt|angerratt)\b/gi;
const KLAUSULORD = /uppsägningstid|uppsagningstid|avtalstid|bindningstid|förlängs|forlangs/gi;

const rakna = (t, rx) => (t.match(rx) ?? []).length;


for (const k of KANDIDATER) {
  console.log(`\n═══════ ${k.nyckel} · ${k.namn} ═══════`);
  console.log(`  ${k.url}`);
  let bytes;
  try {
    const r = await fetch(k.url, { headers: { 'User-Agent': UA, Accept: 'application/pdf,*/*' }, redirect: 'follow', signal: AbortSignal.timeout(45000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    bytes = Buffer.from(await r.arrayBuffer());
  } catch (e) { console.log(`  ✗ gick inte att hämta (${e.message})`); continue; }

  let text = '', sidor = 0;
  try { ({ text, sidor } = await extraheraTextlager(bytes)); }
  catch (e) { console.log(`  ✗ textlagret gick inte att extrahera (${String(e.message).slice(0, 70)})`); continue; }

  const platt = text.replace(/\s+/g, ' ').trim();
  const f = rakna(platt, FORETAGSORD), p = rakna(platt, PRIVATORD), kl = rakna(platt, KLAUSULORD);
  console.log(`  ${bytes.length} byte · ${sidor} sidor · ${platt.length} tecken`);
  // TRÖSKELN RÄTTAD 2026-08-10: första versionen dömde på ren kvot (f > p*2), vilket gjorde
  // 1 företagsord mot 0 privatord till "FÖRETAG". Ett enda ord är inget belägg — det är brus som
  // passerar en division. En heuristik får UPPHÄVA ett påstående men aldrig SKAPA ett, och just
  // Tele2 är dokumentet bibeln varnar för. Nu krävs en absolut miniminivå innan klassen uttalas.
  const MIN_BELAGG = 5;
  const klass = (f >= MIN_BELAGG && f > p * 2) ? 'FÖRETAG'
    : (p >= MIN_BELAGG && p > f * 2) ? 'PRIVAT (fel dokumentklass)'
    : `OKLAR — för svagt belägg (kräver minst ${MIN_BELAGG} träffar), får inte kureras`;
  console.log(`  kundtyp i TEXTEN: företagsord ${f} · privatord ${p}  → ${klass}`);
  console.log(`  klausulord: ${kl}`);
  console.log(`  titel: «${platt.slice(0, 120)}»`);

  // Klausulens ordalydelse — underlaget för ett citat. Vi klipper generöst runt varje träff på
  // uppsägningstid, för det är den mening som styr kundens fönster.
  const träffar = [...platt.matchAll(/uppsägningstid|uppsagningstid/gi)].slice(0, 3);
  for (const t of träffar) {
    console.log(`  ── klausulomgivning ──\n  «${platt.slice(Math.max(0, t.index - 160), t.index + 220)}»`);
  }
  if (träffar.length === 0) console.log('  (ingen träff på "uppsägningstid" — dokumentet bär troligen inte klockan)');
}

console.log('\nSonden kurerar ingenting. Ett dokument får bli villkorsbokspost först när det är');
console.log('bevisat FÖRETAGSdokument, har en bevisad distributionspunkt och en ordagrant läst klausul.');
