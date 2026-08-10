// lib/villkorsvakt.js — VILLKORSVAKTENS DOMARE: håller avtalsreglerna färska.
//
// BAKGRUND (2026-08-07). Prisboken stod obevakad i 16 dygn och tillverkade besparingar som
// aldrig fanns; svaret blev verifierarfabriken — 17 källor, veckovis, med tänder. VILLKORSBOKEN
// (lib/contract-intel.js) har exakt samma failure mode och hade noll vakter: varje post bär ett
// ordagrant citat, en käll-URL och ett verifieringsdatum, och ingenting kontrollerade om
// dokumentet ändrats sedan dess. Telias egen post säger det rakt ut — "äldre villkorsversioner
// anger tre (3) månader" mot dagens en. Villkor ändras precis som priser.
//
// ASYMMETRIN GÖR DET VÄRRE ÄN PRISER (regel 4): ett felaktigt pris kan kunden ifrågasätta när
// fakturan kommer. Ett felaktigt uppsägningsdatum upptäcks först när fönstret redan stängt, och
// då kan ingen ta tillbaka det. Under en produkt vars kärnlöfte är "vi säger till i tid" är en
// inaktuell villkorsbok den dyraste tystnaden vi kan ha.
//
// VARFÖR HASH OCH INTE TEXTLÄSNING. Det uppenbara vore att läsa PDF:en och leta efter citatet.
// Men PDF-textextraktion är skör (Telias tvåspalts-PDF:er flätar kolumner mitt i meningar — se
// contract-intel.js), och en skör vakt larmar på fel saker. Vi vet vad det slutar med: en
// avstängd vakt, som ser ut som att någon tittar. Därför vaktar vi det som går att avgöra
// UTAN tolkning: dokumentets byte-identitet.
//   · samma hash  → citatet står provbart kvar. Grönt, med visshet, utan att gissa.
//   · ändrad hash → villkoren har skrivits om sedan vi läste dem. Vi påstår ALDRIG att citatet
//                   fallit — vi säger att posten måste läsas om av en människa. Ärlig okunskap.
//   · oåtkomligt  → rött. En vakt som inte når sin källa har inte godkänt något (Fortnox-läxan:
//                   en vakt larmade på en 404-sida i 76 dagar).
// Noll falsklarm om innehåll, eftersom vi aldrig uttalar oss om innehåll vi inte kunnat läsa.

// ── OM TAKET: HÄR GÅR JAG EMOT KRITIKEN (2026-08-09) ─────────────────────────────────────────
// Invändningen var att 180 dagar motsäger asymmetriargumentet — priser vaktas veckovis, villkor
// får vara olästa i ett halvår. Den jämförelsen haltar, och jag behåller taket med öppna ögon:
// KONTROLLEN sker veckovis för båda. Taket styr något annat — hur länge en MÄNSKLIG läsning av
// ett OFÖRÄNDRAT dokument får stå. Verklig drift fångas inom sju dygn av de två levande vakterna
// (distributionspunkten + hashen). Det enda taket skyddar mot är att vår egen läsning var fel
// från början — och en felläsning botas inte av att samma oförändrade text läses om av samma
// ögon efter 30 dagar i stället för 180. Att strama åt vore teater: det skulle kosta
// kurerings­uppmärksamhet utan att köpa en enda ny upptäckt, och uppmärksamhet är exakt den
// valuta som får vakter avstängda. Skärpningen ligger i stället där den biter — i förstalarmet.
export const VILLKOR_MAX_ALDER_DAGAR = 180;

export const VILLKOR_UTFALL = {
  FORSEGLAD: 'forseglad',       // hash matchar → citatet står kvar, bevisbart
  OFORSEGLAD: 'oforseglad',     // posten saknar hash → vakten kan inte bevisa något ännu
  ANDRAD: 'andrad',             // dokumentet har skrivits om → måste läsas om
  OATKOMLIG: 'oatkomlig',       // källan svarade inte → okänt, aldrig godkänt
  GAMMAL: 'gammal',             // hash matchar men posten är äldre än taket
  KALLA_BORTA: 'kalla-borta',   // leverantören länkar inte längre vårt dokument → NY VERSION
  SIDA_OATKOMLIG: 'sida-oatkomlig', // villkorssidan svarade inte → okänt, aldrig godkänt
  OVAKTBAR: 'ovaktbar',         // posten har ingen vakt som ens KAN larma
};

// ── VARFÖR HASHEN INTE RÄCKER (grundarbeslut 2026-08-09, efter Fable 5:s granskning) ─────────
// Den första versionen av den här vakten frågade "har filen ändrats?". Kundens fråga är
// "är det här fortfarande de gällande villkoren?" — och det är inte samma fråga.
// Beviset står i villkorsbokens egna URL:er (ops/probe-avtal-corpus.txt):
//     telia.se/assets/m/2bcd4437783424fe/original/…-260401.pdf
//     assets.ctfassets.net/nproz1mx87a8/11KpAbUpjcKtMeus3gWYNw/…_2026-04-1
// Bägge är INNEHÅLLSADRESSERADE: filen bakom ett sådant id skrivs aldrig om. En ny version får
// ett nytt id och en ny adress, och leverantören byter länken på sin villkorssida. Vår fastnålade
// fil ligger kvar byte för byte identisk — för alltid. Hash-vakten var alltså för dessa två
// poster STRUKTURELLT oförmögen att någonsin larma. Den kunde bara säga grönt.
// Det är exakt den sjukdom modulens egen header varnar för: en avstängd vakt ser ut som att
// någon tittar. Jag skrev varningen och byggde sedan felet.
//
// Förstalarmet flyttas därför till DISTRIBUTIONSPUNKTEN — sidan där leverantören länkar sina
// villkor. Larmet går när världen slutar peka på det vi läst, för det är i den sekunden en kund
// som klickar "villkor" får en annan text än den vår avtalsklocka räknar på. Hashen behålls som
// andra lager (beviset att citatet står kvar i vårt exemplar). Ingen PDF-tolkning tillkommer,
// så skörhetsargumentet står orört.

// Adresser där ett nytt innehåll ALLTID får en ny URL. Mönstret används ENDAST för att HÅLLA
// INNE ett grönt, aldrig för att skapa ett påstående — den tillåtna riktningen för en heuristik
// (grundarbeslut: "en heuristik får aldrig SKAPA ett påstående, men den får UPPHÄVA ett").
// Träffar den fel blir konsekvensen att vi kräver en villkorssida i onödan. Missar den, faller
// posten tillbaka på hash-vakten som förut. Ingen väg leder till ett oförtjänat grönt.
const INNEHALLSADRESSERAD = [
  /\/assets\/m\/[0-9a-f]{12,}\//i,        // Telia (och andra Sitecore/Contenthub-uppsättningar)
  /assets\.ctfassets\.net\//i,            // Contentful (Tele2)
  /\/[0-9a-f]{32,}\//i,                    // generisk innehållshash i sökvägen
  /[?&](v|version|rev|hash)=[0-9a-f]{8,}/i, // versionsstämplad frågesträng
];

/** Kan den här adressen någonsin ändras i sig, eller får nytt innehåll alltid en ny adress? */
export function adressenKanAldrigAndras(url) {
  return INNEHALLSADRESSERAD.some((rx) => rx.test(String(url ?? '')));
}

/**
 * Dömer EN villkorsbokspost mot vad vakten faktiskt såg.
 *
 * @param {object} post   - { supplier, kalla, citat, verifierad, dokumentSha256 }
 * @param {object} sett   - { hash: string|null, hamtadOk: boolean, fel?: string }
 * @param {Date}   idag
 * @returns {{ utfall: string, ok: boolean, text: string, aktion: string|null }}
 *   ok=true betyder ENDAST "inget kräver en människa nu" — aldrig "vi vet att allt stämmer",
 *   vilket är skillnaden mellan en vakt och ett önsketänkande.
 */
export function bedomVillkorspost(post, sett, idag = new Date()) {
  const namn = post?.supplier ?? post?.kalla ?? 'okänd post';

  if (!post?.kalla || !post?.citat || !post?.verifierad) {
    return {
      utfall: VILLKOR_UTFALL.OATKOMLIG, ok: false,
      text: `${namn}: posten saknar källa, citat eller verifieringsdatum`,
      aktion: 'En villkorspost utan proveniens får inte styra ett uppsägningsdatum (regel 3).',
    };
  }

  if (!sett?.hamtadOk || !sett?.hash) {
    return {
      utfall: VILLKOR_UTFALL.OATKOMLIG, ok: false,
      text: `${namn}: villkorsdokumentet gick inte att hämta${sett?.fel ? ` (${sett.fel})` : ''}`,
      aktion: 'Kontrollera URL:en. En vakt som inte når sin källa har inte godkänt något.',
    };
  }

  // ── FÖRSTALARMET: pekar världen fortfarande på det vi läst? ───────────────────────────────
  if (post.villkorssida) {
    const sida = sett.sida ?? {};
    if (!sida.hamtadOk || !Array.isArray(sida.lankar)) {
      return {
        utfall: VILLKOR_UTFALL.SIDA_OATKOMLIG, ok: false,
        text: `${namn}: villkorssidan gick inte att läsa${sida.fel ? ` (${sida.fel})` : ''}`,
        aktion: 'Kontrollera villkorssidan. Kan vi inte se var leverantören publicerar sina villkor kan vi inte veta om vårt exemplar är det gällande.',
      };
    }
    if (!sida.lankar.includes(post.kalla)) {
      return {
        utfall: VILLKOR_UTFALL.KALLA_BORTA, ok: false,
        text: `${namn}: villkorssidan länkar inte längre vårt dokument — sannolikt en ny version`,
        aktion: `Öppna ${post.villkorssida}, hitta det gällande dokumentet, läs klausulen och skriv om posten (kalla + citat + verifierad + dokumentSha256 + forsegladDatum).`,
      };
    }
  } else if (adressenKanAldrigAndras(post.kalla)) {
    // Ingen villkorssida OCH en adress vars innehåll aldrig kan ändras: då finns ingen vakt här
    // som ens KAN säga ifrån. En sådan post får aldrig vara grön — det gröna vore ren inbillning.
    return {
      utfall: VILLKOR_UTFALL.OVAKTBAR, ok: false,
      text: `${namn}: fastnålad vid en oföränderlig adress utan villkorssida — ingen vakt här kan någonsin larma`,
      aktion: 'Lägg till villkorssida (sidan där leverantören länkar sina villkor) och verifiera att den går att läsa.',
    };
  }

  if (!post.dokumentSha256) {
    return {
      utfall: VILLKOR_UTFALL.OFORSEGLAD, ok: false,
      text: `${namn}: posten är ännu inte förseglad — dokumentet läser nu ${sett.hash.slice(0, 16)}…`,
      aktion: `Läs posten mot dokumentet en gång, och försegla med dokumentSha256: '${sett.hash}'.`,
    };
  }

  // ── FÖRSEGLINGEN MÅSTE VARA FÖRTJÄNAD (2026-08-09) ────────────────────────────────────────
  // Fällan jag nästan gick i: hämta dagens hash och klistra in den. Då förseglas ett dokument
  // som ingen läst sedan verifieringsdatumet — och har det skrivits om däremellan lyser vakten
  // grönt på en klausul som inte längre stämmer. "Verifierat" måste FÖRTJÄNAS, aldrig påstås.
  // Därför två datum: verifierad = när en människa läste citatet mot dokumentet, forsegladDatum
  // = när byte-ankaret togs. Är ankaret NYARE än läsningen har vi ankrat något oläst.
  if (post.forsegladDatum && post.verifierad && post.forsegladDatum > post.verifierad) {
    return {
      utfall: VILLKOR_UTFALL.OFORSEGLAD, ok: false,
      text: `${namn}: förseglad ${post.forsegladDatum} men senast läst ${post.verifierad} — ankaret är nyare än läsningen`,
      aktion: 'Läs citatet mot dokumentet och sätt verifierad = forsegladDatum. Ett ankare utan läsning är en gissning med hash.',
    };
  }

  if (post.dokumentSha256 !== sett.hash) {
    return {
      utfall: VILLKOR_UTFALL.ANDRAD, ok: false,
      text: `${namn}: villkoren har skrivits om sedan ${post.verifierad}`,
      // Vi säger ALDRIG att citatet fallit — vi vet bara att dokumentet inte är detsamma.
      aktion: `Läs om klausulen. Står citatet kvar ordagrant: uppdatera verifierad + dokumentSha256 till ${sett.hash}. Står det inte kvar: rätta reglerna FÖRE nästa avtalsklocka.`,
    };
  }

  const alder = Math.floor((idag - new Date(post.verifierad)) / 86400000);
  if (Number.isFinite(alder) && alder > VILLKOR_MAX_ALDER_DAGAR) {
    return {
      utfall: VILLKOR_UTFALL.GAMMAL, ok: false,
      text: `${namn}: dokumentet står stilla men posten är ${alder} dagar gammal`,
      aktion: `Läs om posten och sätt nytt verifierad-datum (taket är ${VILLKOR_MAX_ALDER_DAGAR} dagar).`,
    };
  }

  return {
    utfall: VILLKOR_UTFALL.FORSEGLAD, ok: true,
    text: `${namn}: dokumentet oförändrat sedan ${post.verifierad} — citatet står bevisbart kvar`,
    aktion: null,
  };
}

/** Dömer hela boken. En tom bok är ALDRIG grön — då finns inget att vakta, och det ska synas. */
export function bedomVillkorsbok(bok, sedda, idag = new Date()) {
  const nycklar = Object.keys(bok ?? {});
  if (nycklar.length === 0) {
    return { ok: false, domar: [], sammanfattning: 'Villkorsboken är tom — avtalsklockan har inga regler att falla tillbaka på.' };
  }
  const domar = nycklar.map((k) => ({ nyckel: k, ...bedomVillkorspost(bok[k], sedda?.[k] ?? {}, idag) }));
  const trasiga = domar.filter((d) => !d.ok);
  return {
    ok: trasiga.length === 0,
    domar,
    sammanfattning: trasiga.length === 0
      ? `Villkorsboken håller — ${domar.length} post(er) förseglade och oförändrade.`
      : `${trasiga.length} av ${domar.length} villkorsposter kräver en människa.`,
  };
}
