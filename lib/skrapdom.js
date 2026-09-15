// lib/skrapdom.js — EXTRAKTION **OCH** DOM över en skrapad prissida. Deterministisk, modellfri,
// och den vägrar hellre än gissar (SD-01..16).
//
// ══ VARFÖR (2026-09-15, grundarbeslut) ══════════════════════════════════════════════════════
// «Du MÅSTE ut på nätet och hämta priserna — men som en 0,1%-arkitekt, inte som en
// hallucinerande agent. Skrapan MÅSTE vägra i stället för att gissa.»
//
// ⚠️ FÖRSTA VERSIONEN LADE DOMEN HÄR OCH LÄMNADE EXTRAKTIONEN I SKRIPTET. Granskningen föll
// BLOCKERAR med fyra [KUND], och alla fyra hade samma rot: den halva som kan gissa var OPRÖVAD,
// och den upplöste varje tvetydighet INNAN domen såg den — tyst, och åt samma håll.
// Mätt, med produktionskoden kopierad ordagrant:
//
//     "VPS 2 199 kr/mån"          -> 2199   (sant: 199)   ett entydigt FALSKT golv
//     "Diskutrymme 50 99 kr/mån"  -> 5099   (sant: 99)
//     "1 200 kr/m²"               -> 1200   (ett naket `m` matchade «m²»)
//     "25,000 kr/mån"             -> 25     (faktor 1000 fel, innanför sanitetsbandet)
//
// Och värre: låg ordinarie- och kampanjpris i SYSKONELEMENT — den vanligaste priskortsmarkupen —
// blev de två skilda «planer», var och en entydig. Tvetydighetsgrinden var strukturellt onåbar,
// och kampanjpriset blev golvet. Kommentaren intygade att «att välja det LÄGRE vore att välja åt
// VÅRT håll»; koden valde det lägre.
//
// Det är bibelns mest upprepade sjukdom, femte gången: MEKANISMEN PRÖVAD, MATNINGEN ALDRIG
// (LFL-produktionsvägen 12 aug, holdings.mjs 19 aug, den DB-lösa sviten 21 aug, det omdöpta
// fältet 24 aug). Att flytta domen till en ren funktion var rätt drag — felet var att inte
// flytta EXTRAKTIONEN med. Nu bor båda här, och sviten kan hamra på dem utan nät.
//
// ══ VAD MODULEN PRODUCERAR ══════════════════════════════════════════════════════════════════
// Ett UNDERLAG: de prisförekomster sidan bär, med sin egen kontext — aldrig ett golv, aldrig ett
// «verifierat listpris». Vilken produkt som är REFERENSPRODUKTEN avgör en människa; bibeln
// kräver den redan av varje `real-public`-kategori (MK-08). Maskinen hämtar tecknen och vägrar
// när de är tvetydiga. Människan väljer. Därefter, och inte förr, vaktar en verifierare talet.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: ett belopp hopklistrat med ett föregående tal; en tvetydig tusental/decimal-form; en
//     kvadratmeter läst som månad; kampanj- och «från»-markörer nära priset; en momsbas som inte
//     står nära något pris; ett pris utanför sanitetsbandet; en sida som inte gick att läsa.
//   BLIND: den ser SYNTAX, aldrig vilken PRODUKT ett giltigt pris hör till (SD-16). «199 kr/mån»
//     bredvid «Supportavgift» är syntaktiskt oklanderligt. Därför produceras ett UNDERLAG och
//     aldrig ett golv — den sista milen är en människa som öppnar sidan.

/** Ett pris under detta är inte en hostingplan — det är ett stycktillägg eller en adressavgift. */
export const SANITET_MIN_KR = 20;
/** Och över detta är det en dedikerad server eller ett årspris draget som månad. */
export const SANITET_MAX_KR = 20000;
/** Färre prisförekomster än så är inte en prislista — då har DOM:en ändrats eller vi läser fel sida. */
export const MIN_PRISER = 3;

// ⚠️ BANDETS MOTIVERING, RÄTTAD. Första versionen sa att det «dödar enhets- och periodfel».
// Granskaren MÄTTE att det är osant: ett gånger-tolv-fel fångas först över 1 667 kr/mån, alltså
// aldrig för kategorins normala spann, och 199 kr som öresbelopp (19 900) passerar. Bandet gör
// en enda sak — det avvisar ABSURDA magnituder. Att låta det behålla ett löfte det inte håller
// vore «en konstant vars NAMN lovar en mekanik den inte har» (bibeln 10 september).

/** Ord som betyder att beloppet bredvid inte är ett ordinarie listpris. */
const KAMPANJORD = /(kampanj|rabatt|\brea\b|spara|erbjudande|ord\.?\s*pris|ordinarie|nu\s+endast|\bfrån\b|fr\.o\.m|first\s+month|introduktion)/i;

/**
 * ETT BELOPP, ANKRAT I BÅDA ÄNDAR.
 *
 * Den giriga fångstgruppen svalde «2» ur «VPS 2 199 kr/mån». Ankaret nekar nu ett belopp som
 * föregås av en siffra med mellanrum emellan. Och månadsmarkören kräver `mån`/`månad`/`month`/
 * `mo` — aldrig ett naket `m`, som matchade «m²».
 */
const PRIS = /(?<!\d)(?<!\d[\s ])(\d{1,3}(?:[\s ]\d{3})*(?:[.,]\d+)?|\d+(?:[.,]\d+)?)\s*(?:kr|sek)\s*(?:\/|per\s+)\s*(?:mån(?:ad)?|month|mo)\b/gi;

/**
 * Tolka ett svenskt beloppstoken. Returnerar `null` när formen är TVETYDIG — aldrig en gissning.
 *
 * `25,000` är det farliga fallet: svenskt decimalkomma ger 25, engelskt tusentalskomma ger
 * 25 000 — en faktor 1000, och BÅDA ligger innanför sanitetsbandet. Formen går inte att avgöra
 * ur tecknen, alltså är svaret inget tal (ett okänt får aldrig låna ett giltigt värde).
 */
export function tolkaBelopp(token) {
  const t = String(token ?? '').trim();
  if (!t) return null;
  if (/^\d+,\d{3}$/.test(t)) return null;    // 25,000 — tusental eller decimal?
  if (/^\d+\.\d{3}$/.test(t)) return null;   // 1.299  — samma tvetydighet spegelvänd
  // ⚠️ MELLANRUMSGRUPPERAT TUSENTAL VÄGRAS, och det är den svåraste av de fyra. «VPS 2 199
  // kr/mån» kan läsas som «VPS 2» + «199 kr» ELLER som «VPS» + «2 199 kr» — båda är korrekt
  // svenska, och ur platt text går det inte att avgöra. Det gav ett ENTYDIGT FALSKT golv:
  // 2199 för sanna 199. Tolv gånger fel, innanför sanitetsbandet, omöjligt att skilja från en
  // avläsning. Priset för att vägra är att en sida som skriver «1 299 kr/mån» tystas — men den
  // tystnaden är HÖGLJUDD (namngivet skäl) och en människa kan läsa sidan. Ett falskt golv är
  // tyst och når kunden. Riktningen är given.
  if (/[\s\u00a0]/.test(t)) return null;
  const n = Number(t.replace(/[\s ]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Läs prisförekomster ur sidans TEXT. Ren funktion — ingen DOM, ingen webbläsare, inget nät.
 *
 * Varje träff bär sin kontext (tecknen före) så att kampanjmarkörer kan SES av domen i stället
 * för att tyst försvinna. Avvisade token redovisas — en tyst bortsortering är precis hur det
 * falska golvet uppstod.
 */
export function lasPriser(text) {
  const t = String(text ?? '');
  const priser = [];
  const avvisade = [];
  for (const m of t.matchAll(PRIS)) {
    const kronor = tolkaBelopp(m[1]);
    if (kronor === null) { avvisade.push(m[1]); continue; }
    priser.push({ kronor, index: m.index, kontext: t.slice(Math.max(0, m.index - 60), m.index).trim() });
  }
  return { priser, avvisade };
}

/** Momsbasen får bara vara något sidan FAKTISKT skriver NÄRA ett pris. */
export const MOMSBAS = Object.freeze(['exkl', 'inkl', 'okand']);
/** Hur nära ett pris momsuppgiften måste stå för att gälla DET priset. */
export const MOMS_FONSTER = 400;

/**
 * Läs momsbasen — men bara om uppgiften står inom `MOMS_FONSTER` tecken från ett pris.
 *
 * ⚠️ FÖRSTA VERSIONEN LÄSTE HELA SIDAN och stämplade varje plan. Granskaren mätte följden:
 * «Fri frakt över 500 kr. Alla fraktpriser anges exkl moms…» gav `exkl` för VPS-planerna — rätt
 * siffra, fel proveniens, vilket regel 3 räknar som fel. Fönstret binder uppgiften till talet.
 * Säger sidan BÅDA sakerna inom fönstret är svaret `okand`.
 */
export function lasMomsbas(text, prisIndex = []) {
  const t = String(text ?? '').toLowerCase();
  if (!Array.isArray(prisIndex) || prisIndex.length === 0) return 'okand';
  const EXKL = /(exkl\.?|exklusive|utan)\s*moms/;
  const INKL = /(inkl\.?|inklusive)\s*moms/;
  let exkl = false, inkl = false;
  for (const i of prisIndex) {
    const fonster = t.slice(Math.max(0, i - MOMS_FONSTER), i + MOMS_FONSTER);
    if (EXKL.test(fonster)) exkl = true;
    if (INKL.test(fonster)) inkl = true;
  }
  if (exkl && inkl) return 'okand';
  if (exkl) return 'exkl';
  if (inkl) return 'inkl';
  return 'okand';
}

/**
 * Döm en skrapad prissida och producera ett UNDERLAG.
 *
 * @returns {{blockerar: boolean, kod: string, skal: string, underlag: object|null}}
 */
export function skrapdom({ url, sidtext } = {}) {
  const text = String(sidtext ?? '');

  if (text.length < 400) {
    return { blockerar: true, kod: 'sidan_olasbar', underlag: null,
      skal: `sidan gav ${text.length} tecken — det är ett utfall om HÄMTNINGEN, aldrig om priset` };
  }

  const { priser, avvisade } = lasPriser(text);

  // Ett avvisat token är ett FYND, inte ett städat bortfall.
  if (avvisade.length) {
    return { blockerar: true, kod: 'tvetydigt_tal', underlag: null,
      skal: `${avvisade.length} belopp har tvetydig tusental/decimal-form: ${avvisade.slice(0, 5).join(' · ')}`
        + ' — formen går inte att avgöra ur tecknen, och en faktor 1000 ryms i tvetydigheten' };
  }

  if (priser.length < MIN_PRISER) {
    return { blockerar: true, kod: 'for_fa_priser', underlag: null,
      skal: `${priser.length} prisförekomst(er), kräver ${MIN_PRISER} — DOM:en har sannolikt ändrats` };
  }

  // Kampanjmarkörer: ett rabatterat pris är inte ett listpris. Syskonmarkupen som besegrade den
  // gamla blockgrinden syns HÄR, i kontexten före beloppet. Hellre tystnad än ett kampanjpris
  // draget som golv — ett för lågt golv överdriver besparingen, och det är den riktning vår
  // success fee gör farlig.
  const kampanj = priser.filter((p) => KAMPANJORD.test(p.kontext));
  if (kampanj.length) {
    return { blockerar: true, kod: 'kampanjmarkor', underlag: null,
      skal: `${kampanj.length} pris står nära en kampanj-/frånmarkör: `
        + kampanj.slice(0, 3).map((p) => `«…${p.kontext.slice(-40)}» ${p.kronor}`).join(' · ') };
  }

  const utanfor = priser.filter((p) => p.kronor < SANITET_MIN_KR || p.kronor > SANITET_MAX_KR);
  if (utanfor.length) {
    return { blockerar: true, kod: 'utanfor_band', underlag: null,
      skal: `${utanfor.length} pris utanför ${SANITET_MIN_KR}–${SANITET_MAX_KR} kr/mån: `
        + utanfor.slice(0, 4).map((p) => p.kronor).join(' · ') };
  }

  const momsbas = lasMomsbas(text, priser.map((p) => p.index));
  if (momsbas === 'okand') {
    return { blockerar: true, kod: 'momsbas_okand', underlag: null,
      skal: `ingen momsuppgift inom ${MOMS_FONSTER} tecken från ett pris, eller motsägande uppgifter`
        + ' — ett pris vars bas är okänd kan inte ställas mot kundens fakturarad' };
  }

  const sorterade = [...priser].sort((a, b) => a.kronor - b.kronor);
  return {
    blockerar: false,
    kod: 'underlag',
    skal: `${priser.length} prisförekomster lästa, alla entydiga`,
    // ⚠️ UNDERLAG, ALDRIG ETT GOLV. Modulen ser att tecknen är entydiga — aldrig vilken PRODUKT
    // de hör till. Att utse ett referenspris är ett mänskligt beslut (MK-08), och ordet
    // «verifierat» måste förtjänas. SD-16 låser att inget fält påstår något annat.
    underlag: {
      url,
      momsbas,
      antalPriser: priser.length,
      lagsta: sorterade[0].kronor,
      hogsta: sorterade.at(-1).kronor,
      forekomster: sorterade.map((p) => ({ kronor: p.kronor, kontext: p.kontext.slice(-70) })),
    },
  };
}
