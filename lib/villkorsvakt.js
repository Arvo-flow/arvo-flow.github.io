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

/** Efter så här länge ska en post läsas om även om dokumentet står stilla. */
export const VILLKOR_MAX_ALDER_DAGAR = 180;

export const VILLKOR_UTFALL = {
  FORSEGLAD: 'forseglad',       // hash matchar → citatet står kvar, bevisbart
  OFORSEGLAD: 'oforseglad',     // posten saknar hash → vakten kan inte bevisa något ännu
  ANDRAD: 'andrad',             // dokumentet har skrivits om → måste läsas om
  OATKOMLIG: 'oatkomlig',       // källan svarade inte → okänt, aldrig godkänt
  GAMMAL: 'gammal',             // hash matchar men posten är äldre än taket
};

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
