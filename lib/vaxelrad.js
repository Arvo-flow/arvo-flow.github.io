// lib/vaxelrad.js — VÄXELRADENS KLASS: per användare, per bolag, eller okänd.
//
// ══ VARFÖR MODULEN FINNS (grundarorder 2026-09-19) ══════════════════════════════════════════
// `normalizeTelekomInvoice` delade växelkostnaden med `deriveTelekomSeats`, som ärver
// `seatCount` — och `seatCount` är på en kombinerad telekomfaktura **antalet SIM-kort**.
// `extract.js` sätter det med flit («benchmark is on mobile subscriptions, not switchboard
// capacity»). Nämnaren kom alltså från en ANNAN DOMÄN än täljaren.
//
// Mätt på `telenor-molnvaxel-stor.pdf` (45 SIM, 50 växellicenser à 89 kr):
//   · visat för kunden: «Ni betalar 108,87 kr/användare och månad» — ett tal som INTE står på
//     fakturan, i en mening kunden läser (regel 3).
//   · sant: 4 450 / 50 = 89,00 kr = exakt Telias verifierade golv.
//   · på T1-nivå (utan IVR-raden) blev utfallet **+11,1 % över golvet** för en kund som betalar
//     exakt listpris. Riktningen är mot vårt eget arvode, och det är hela allvaret.
//
// ══ KLASSNINGEN ÄR HÄRLEDD UR POPULATIONEN, INTE UPPFUNNEN ═════════════════════════════════
// Alla sex växelrader i fixturkorpusen mättes innan en regel skrevs:
//
//   antal=1   à=1290  «3 Molnväxel Business — månadsavgift»                  → OKÄND
//   antal=1   à=1490  «Tele2 Molnväxel Business 15 (tilläggstjänst)»         → OKÄND
//   antal=4   à=149   «Molnväxel tilläggslicenser (4 extra användare)»       → per användare
//   antal=50  à=89    «Telenor One Talk Molnväxel — 50 användarlicenser»     → per användare
//   antal=10  à=89    «Telenor One Talk Molnväxel — 10 användarlicenser»     → per användare
//   antal=1   à=449   «Telenor One Talk Reception (auto-svarare + IVR)»      → per bolag
//
// Den bärande observationen: **kvantitet 1 på en växelrad går inte att skilja från en
// bolagsavgift.** Korpusen bär två sådana klumpsummor (1 290 och 1 490 kr) som båda ser ut som
// «en enhet» men täcker ett okänt antal användare. Att läsa «Business 15» som femton licenser
// vore antalsdoktrinens förbjudna drag: ett antal är en avläsning, eller så finns det inte.
// Därför krävs antingen antal ≥ 2, eller att raden själv SÄGER att enheten är en användare.
//
// ══ VAKTENS PREMISS (Verifieringsplikten p.5) ══════════════════════════════════════════════
//   FÅNGAR: en nämnare som inte går att läsa ur fakturans egna växelrader, en bolagsavgift som
//           smyger in i ett per-användare-pris, och en klumpsumma som utges för en licens.
//   BLIND:  modulen läser RADTEXT och kvantitetskolumn. Den kan inte veta att «Molnväxel Bas»
//           med antal 12 egentligen är 12 anknytningar för 8 personer, och den kan inte se en
//           licens som ligger gömd i en bolagsrads pris. Den skiljer läsbart från oläsbart —
//           aldrig sant från falskt.

/** Radens roll i växelpriset. */
export const VAXELRAD = Object.freeze({
  PER_ANVANDARE: 'per_anvandare',
  PER_BOLAG:     'per_bolag',
  OKAND:         'okand',
});

// Tjänster som gäller HELA bolaget — en reception finns en gång, oavsett antal anställda.
// Orden är hämtade ur `VAXEL_LINE` i lib/telekom-normalize.js och delade i två högar efter vad
// de FAKTISKT prissätter. Ett funktionsnummer är ett nummer, inte en person.
const BOLAGSTJANST = /reception|svarsgrupp|k[öo]hantering|ivr|talsvar|auto-?svarare|kontaktcenter|huvudnummer|funktionsnummer|v[äa]xelnummer/i;

// Raden säger själv att enheten är en användare. Krävs när antalet är 1, eftersom «1» annars
// inte går att skilja från en klumpsumma.
// ⚠️ `s[äa]te[nr]?` MATCHADE «Säter» — en svensk ort, inte en enhet. «Växel Säter kontor»
// med antal 1 lästes som en användarlicens. Funnet i granskningsvändan av mitt eget bygge;
// ett ortnamn som blir en nämnare är precis den sortens tyst fel modulen finns mot.
const ANVANDARENHET = /anv[äa]nd(?:are|arlicens(?:er)?)|\banv\.?\b|licens(?:er)?\b|anknytning(?:ar)?|huvudlicens|administrat[öo]rslicens|s[äa]ten?\b/i;

/**
 * Klassar EN växelrad. Anroparen har redan avgjort att raden är en växelrad
 * (`classifyTelekomLine(...) === 'vaxel'`); den här modulen svarar bara på VAD den prissätter.
 *
 * @returns {{klass: string, antal: number|null, belopp: number, skal: string}}
 */
export function klassaVaxelrad(rad) {
  const text = String(rad?.description ?? '');
  const belopp = Number(rad?.amount ?? 0);
  const raAntal = Number(rad?.quantity);

  // ⚠️ ANTALET ÄR EN AVLÄSNING ELLER SÅ FINNS DET INTE (antalsdoktrinen, 9 september).
  // Ingen bakåträkning ur belopp ÷ à-pris: mätt på 23 rader gav den metoden rätt heltal i 18 fall
  // och NOLL rätt antal — på roamingrader står mängden i antalskolumnen och priset i à-pris.
  // En bråkdel är ett extraktionsfel, inte en licensmängd.
  const antal = Number.isInteger(raAntal) && raAntal > 0 ? raAntal : null;

  // ⚠️ EN NAMNGIVEN ENHET VÄGER TYNGST, och den ordningen fällde mitt eget första bygge.
  // «Telia Smart Connect växel med köhantering», antal 20, är en PER-ANVÄNDARE-plan vars namn
  // råkar nämna en funktion. Med bolagsregeln först blev den en bolagstjänst och hela fakturan
  // tystnade. Det är SK-08:s läxa: förbjud påståendet, aldrig ordet — en vakt som fäller rätt
  // beteende blir avstängd. Säger raden själv att enheten är en användare, är den det.
  if (antal !== null && ANVANDARENHET.test(text)) {
    return { klass: VAXELRAD.PER_ANVANDARE, antal, belopp,
      skal: `antal ${antal} avläst, och raden namnger enheten som användare/licens` };
  }
  if (BOLAGSTJANST.test(text)) {
    // Utan namngiven användarenhet är en funktionsrad en delad facilitet. Att i stället GISSA att
    // antalet är användare vore precis det den här modulen finns för att stoppa. Följden är att
    // raden lämnar täljaren — vilket sänker per-användare-priset, alltså åt det håll som MINSKAR
    // vårt arvode. Fel åt det hållet är det enda vi får ha.
    return { klass: VAXELRAD.PER_BOLAG, antal: null, belopp,
      skal: 'bolagsgemensam växeltjänst utan namngiven användarenhet' };
  }
  if (antal === null) {
    return { klass: VAXELRAD.OKAND, antal: null, belopp,
      skal: 'inget läsbart heltal i antalskolumnen' };
  }
  if (antal >= 2) {
    return { klass: VAXELRAD.PER_ANVANDARE, antal, belopp,
      skal: `antal ${antal} avläst ur antalskolumnen` };
  }
  // antal === 1: tvetydigt per konstruktion. Bara radens egen text kan avgöra det.
  if (ANVANDARENHET.test(text)) {
    return { klass: VAXELRAD.PER_ANVANDARE, antal: 1, belopp,
      skal: 'antal 1, men raden namnger enheten som en användarlicens' };
  }
  return { klass: VAXELRAD.OKAND, antal: null, belopp,
    skal: 'antal 1 utan angiven enhet — går inte att skilja från en klumpsumma per bolag' };
}

/**
 * Bygger växelns per-användare-underlag ur ALLA växelrader på fakturan.
 *
 * FAIL-CLOSED PÅ NÄMNAREN (RK-04), och det är hela poängen: en oläsbar växelrad kan bära ett okänt
 * antal användare, och då är fakturans totala licensantal okänt. Ett pris räknat på en ofullständig
 * nämnare är systematiskt FÖR HÖGT — alltså åt det håll som ökar vårt eget arvode. Vi tiger hellre.
 *
 * @returns {{ok: true, perUserMonthlyExVat: number, licenser: number, perAnvandareMonthly: number,
 *            perBolagMonthly: number, rader: object[]}
 *        | {ok: false, avvisatSkal: string, rader: object[]}}
 */
export function vaxelUnderlag(vaxelrader) {
  const rader = (vaxelrader ?? []).map(klassaVaxelrad);
  if (rader.length === 0) return { ok: false, avvisatSkal: 'inga växelrader på fakturan', rader };

  const okanda = rader.filter((r) => r.klass === VAXELRAD.OKAND);
  if (okanda.length > 0) {
    return { ok: false, rader,
      avvisatSkal: `${okanda.length} oläsbar(a) växelrad(er) — licensantalet för fakturan är okänt `
        + `(${okanda.map((r) => r.skal).join('; ')})` };
  }

  const perAnv = rader.filter((r) => r.klass === VAXELRAD.PER_ANVANDARE);
  if (perAnv.length === 0) {
    return { ok: false, rader,
      avvisatSkal: 'endast bolagsgemensamma växeltjänster — inget per-användare-pris finns att visa' };
  }

  const licenser = perAnv.reduce((s, r) => s + r.antal, 0);
  const perAnvandareMonthly = perAnv.reduce((s, r) => s + r.belopp, 0);
  const perBolagMonthly = rader
    .filter((r) => r.klass === VAXELRAD.PER_BOLAG)
    .reduce((s, r) => s + r.belopp, 0);

  if (!(licenser > 0) || !(perAnvandareMonthly > 0)) {
    return { ok: false, rader, avvisatSkal: 'nämnare eller täljare är noll' };
  }

  return {
    ok: true, rader, licenser,
    perAnvandareMonthly: Math.round(perAnvandareMonthly * 100) / 100,
    // ⚠️ BÄRS, DÖLJS ALDRIG. Bolagsavgiften är en kostnad kunden FAKTISKT betalar; att bara lyfta
    // ut den ur divisionen och låta den försvinna vore att underskatta växelns pris. Den hör inte
    // hemma i ett per-användare-tal, men den hör hemma i redovisningen (samma skäl som
    // `excludedMobilMonthly` finns — och det fältet ljög, se RK-05 i tests/vaxelrad.mjs).
    perBolagMonthly: Math.round(perBolagMonthly * 100) / 100,
    perUserMonthlyExVat: Math.round((perAnvandareMonthly / licenser) * 100) / 100,
  };
}
