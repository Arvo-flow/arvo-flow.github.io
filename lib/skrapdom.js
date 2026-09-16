// lib/skrapdom.js — EXTRAKTION **OCH** DOM över en skrapad prissida. Deterministisk, modellfri,
// och den vägrar hellre än gissar (SD-01..19).
//
// ══ VARFÖR (2026-09-15, grundarbeslut) ══════════════════════════════════════════════════════
// «Du MÅSTE ut på nätet och hämta priserna — men som en 0,1%-arkitekt, inte som en
// hallucinerande agent. Skrapan MÅSTE vägra i stället för att gissa.»
//
// ⚠️ FÖRSTA VERSIONEN LADE DOMEN HÄR OCH LÄMNADE EXTRAKTIONEN I SKRIPTET. Granskningen föll
// BLOCKERAR med fyra [KUND], och alla fyra hade samma rot: den halva som kan gissa var OPRÖVAD,
// och den upplöste varje tvetydighet INNAN domen såg den — tyst, och åt samma håll.
//
// ⚠️ ANDRA VERSIONEN FÖLL PÅ TRE [KUND] TILL, och alla tre var samma sjukdom ett lager in:
//
//   1. KONTEXTEN LÄSTE BARA VÄNSTER. «199 kr/mån första 3 månaderna», «199 kr/mån per
//      användare», «199 kr/mån vid 12 mån bindning» — varje kvalificerare som står EFTER
//      beloppet passerade osedd, och syntes inte heller i kvittot. Kampanjgrinden vaktade den
//      halva av meningen där kampanjer sällan står.
//   2. MOMSFÖNSTRET BAND TILL SIDAN, INTE TILL PRISET. Slingan satte en sidbred flagga: EN
//      kvalificerande förekomst stämplade ALLA planer. `MOMS_FONSTER` kunde därför krympas till
//      ett utan att ett enda test föll — en konstant vars namn lovade en mekanik den inte hade.
//   3. ANKARETS AVVISANDEN FÖRSVANN TYST. Lookbehinden `(?<!\d[\s ])` fick «VPS 2 199 kr/mån»
//      att inte matcha ALLS: ingen träff, ingen post i `avvisade`, ingen rad i kvittot — trots
//      att docstringen intygade att ett avvisande aldrig städas bort tyst. Sidan såg prisfri ut.
//
// Rättningen är EN slinga, inte fler lager (bibeln 10 september: «rätt drag är inte att ta bort
// skyddet utan att göra det till DET ENDA»). Ett LÖST mönster fångar varje belopp; därefter
// KLASSAS varje träff i öppen dager — godtagen, eller avvisad med skäl, eller räknad som en
// annan enhet.
//
// ⚠️ RÄTTELSE AV MIN EGEN COMMIT (245fd95): den skrev «ankaret är rivet» som orsaken till att
// den tysta droppen försvann. Granskaren MÄTTE att det är fel — lookbehinden ensam återinförd
// fäller NOLL tester och ger identiskt utfall. Det var den strikta TOKEN-GRUPPEN som bar
// bortfallet; lookbehinden var ett beteendemässigt no-op som jag presenterade som fixen. Rätt
// diagnos, fel namngiven mekanism — och att inte rätta det hade lämnat nästa läsare med en
// orsaksförklaring som inte håller.
//
// ⚠️ TREDJE VARVET VÄNDE HELA LÄSAREN (2026-09-16). Granskningen föll BLOCKERAR på ett [KUND]:
// svartlistan över farliga former vaktade 2 av 10 blankstegstecken, så `1<U+2009>299 kr/mån`
// gav 299 — tyst, åt det lägre hållet. Plus tio [VAKT], varav fyra av samma form: `kr/anv/mån`,
// «kronor/mån», negativa belopp och intervall försvann alla utan en post i `avvisade`.
// Slutsatsen var inte tio lagningar utan att svartlistan är fel verktyg: en uppräkning av det
// farliga över fri webbtext kan aldrig räknas färdig. Formen som GODTAS deklareras nu i stället  // pastaende-ok: argument om metoden, inget anspråk om kodens beteende
// (`BELOPPSFORM`), och varje annan träff får ett namngivet utfall.
//
// Det är bibelns mest upprepade sjukdom: MEKANISMEN PRÖVAD, MATNINGEN ALDRIG. Sviten matar
// därför rå sidtext genom hela kedjan.
//
// ══ VAD MODULEN PRODUCERAR ══════════════════════════════════════════════════════════════════
// Ett UNDERLAG: de prisförekomster sidan bär, med sin egen kontext — aldrig ett golv, aldrig ett
// «verifierat listpris». Vilken produkt som är REFERENSPRODUKTEN avgör en människa; bibeln
// kräver den redan av varje `real-public`-kategori (MK-08). Maskinen hämtar tecknen och vägrar
// när de är tvetydiga. Människan väljer. Därefter, och inte förr, vaktar en verifierare talet.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: ett belopp hopklistrat med ett föregående tal; en tvetydig tusental/decimal-form; en
//     kvadratmeter läst som månad; kampanj-, tids-, bindnings- och enhetskvalificerare på BÅDA
//     sidor om beloppet; ett pris vars egen momsbas inte står inom fönstret; ett pris utanför
//     sanitetsbandet; en sida som inte gick att läsa.
//   BLIND: den ser SYNTAX, aldrig vilken PRODUKT ett giltigt pris hör till (SD-16). «199 kr/mån»
//     bredvid «Supportavgift» är syntaktiskt oklanderligt. Den ser heller inte en kvalificerare
//     som står längre bort än `KONTEXT_FONSTER` tecken, eller i en tabellrubrik ovanför. Och åt
//     andra hållet: på en tät prislista når fönstret in i GRANNRADEN, så en kvalificerare kan
//     färga fler förekomster än den gäller. Skälet säger därför «ligger inom fönstret», aldrig
//     «är kvalificerat». Och kvalificerarnas ORDFÖRRÅD är ändligt medan svenskan inte är: SD-24
//     prövar det som står i listan, aldrig det som saknas. Därför produceras ett UNDERLAG och
//     aldrig ett golv — sista milen är en människa.
//     MÄTT OCH ACCEPTERAT: `KANDIDAT` är kvadratisk i värsta fall och tar 0–10 ms på verkliga
//     sidstorlekar (granskningen 2026-09-16). En sida över ~150 kB kan dra iväg; det är ett
//     körtidsproblem i Actions, aldrig ett felaktigt tal, och lämnas därför olagat med avsikt.

/** Ett pris under detta är inte en plan — det är ett stycktillägg eller en adressavgift. */
export const SANITET_MIN_KR = 20;
/** Och över detta är det ett årspris draget som månad, eller en helt annan produkt. */
export const SANITET_MAX_KR = 20000;
/** Färre prisförekomster än så är inte en prislista — då har DOM:en ändrats eller vi läser fel sida. */
export const MIN_PRISER = 3;
/** Hur många tecken på VARDERA sidan om beloppet som räknas som dess kontext. */
export const KONTEXT_FONSTER = 70;

// ⚠️ BANDETS MOTIVERING, RÄTTAD. Första versionen sa att det «dödar enhets- och periodfel».
// Granskaren MÄTTE att det är osant: ett gånger-tolv-fel fångas först över 1 667 kr/mån, alltså
// aldrig för kategorins normala spann, och 199 kr som öresbelopp (19 900) passerar. Bandet gör
// en enda sak — det avvisar ABSURDA magnituder. Att låta det behålla ett löfte det inte håller
// vore «en konstant vars NAMN lovar en mekanik den inte har» (bibeln 10 september).

/**
 * Kvalificerare: ord som betyder att beloppet bredvid inte är ett ordinarie månadslistpris.
 * Varje post bär sitt NAMN, så att kvittot kan säga VILKEN sorts kvalificerare som fällde —
 * ett reservkort får aldrig påstå ett skäl det inte vet (bibeln 15 augusti).
 */
const KVALIFICERARE = Object.freeze([
  [/kampanj|rabatt|\brea\b|spara|erbjudande|ord\.?\s*(?:pris|\d)|ordinarie|nu\s+endast|\bfrån\b|fr\.o\.m|introduktion|\bprova\b|testa\s+gratis/i,
    'kampanj-/frånmarkör'],
  [/först(?:a|e)\s+(?:\d+|en|tre|sex|tolv)\s*mån|first\s+month|därefter|efter\s+\d+\s*mån|\d+\s*mån(?:ader)?\s+(?:gratis|för\b)|\bi\s+\d+\s*mån/i,
    'tidsbegränsat pris'],
  [/bindning|bindningstid|vid\s+\d+\s*mån|\d+\s*mån(?:aders)?\s*avtal|årsavtal|uppsägningstid|årsvis|årsbetalning/i,
    'bindningsvillkor'],
  [/per\s+(?:användare|användaren|anv\.|anställd|anställda|person|plats|enhet|konto|user|seat|licens)|\/\s*(?:användare|user|anv|person|plats)\b/i,
    'enhetskvalificerare'],
]);

/**
 * ETT KANDIDATBELOPP MED EN ENHETSVÄG — löst fångat, med tecken och enhet utskrivna.
 *
 * Mönstret ankrar INGENTING och avvisar INGENTING; det bara HITTAR. All dömande kraft ligger i
 * klassningen nedanför, där varje träff får ett namngivet utfall. Mellanrum matchas med
 * `[^\S\r\n]` — VARJE blankstegstecken Unicode känner utom radbrytning, inte bara de två jag
 * råkade tänka på. Radbrytningen är utesluten med flit: den SKILJER två tal åt, och att svälja
 * den hade gjort «M365 E3\n490 kr/mån» tvetydigt utan att det är det.
 */
const KANDIDAT = /([-−–])?[^\S\r\n]*(\d(?:[\d.,]|[^\S\r\n])*\d|\d)[^\S\r\n]*(?:kr|kronor|sek)[^\S\r\n]*(?:\/|per[^\S\r\n]+)[^\S\r\n]*([\p{L}²][\p{L}².]*(?:[^\S\r\n]*\/[^\S\r\n]*[\p{L}²][\p{L}².]*)*)/giu;

/** Orden som betyder «månad». Enhetsvägen måste bestå av ETT av dem och ingenting annat. */
const MANADSORD = /^(?:mån|månad|månaden|manad|month|months|mo)\.?$/i;

/**
 * VITLISTAN: den enda beloppsform modulen godtar.
 *
 * ⚠️ DEN HÄR FUNKTIONEN VÄNDES 2026-09-16, efter granskningens [KUND]. Den gamla versionen
 * räknade upp de FARLIGA formerna — `25,000`, `1.299`, mellanrumsgrupperat — och släppte igenom
 * allt annat. Granskaren MÄTTE vad uppräkningen missade: mellanrumsregeln vaktade **2 av 10**
 * blankstegstecken. `Pro 1 299 kr/mån` gav **299**, tyst, utan post i `avvisade` — samma
 * falska golv som `VPS 2 199` men åt det LÄGRE hållet, alltså den riktning som överdriver
 * besparingen och därmed vårt eget arvode.
 *
 * Läxan är inte «lägg till åtta tecken till». En svartlista över fri webbtext kan aldrig räknas  // pastaende-ok: argument om metoden, inget anspråk om kodens beteende
 * färdig; varje lagning är ett specialfall och nästa granskare hittar nästa. Formen som godtas
 * DEKLARERAS i stället: en till fem siffror, valfritt decimaltecken med högst två decimaler,
 * ingen gruppering av något slag. Allt annat är ett avvisande med skäl — aldrig en tystnad.
 *
 * Tvetydigheten som motiverade den gamla listan faller ut ur vitlistan av sig själv: `25,000`
 * har tre decimaler, `1 299` bär ett mellanrum, `1.299` har tre decimaler. Ingen av dem behöver
 * en egen rad längre — och åtta blankstegstecken jag aldrig tänkte på täcks utan att nämnas.
 */
export const BELOPPSFORM = /^\d{1,5}(?:[.,]\d{1,2})?$/;

export function tolkaBelopp(token) {
  const t = String(token ?? '').trim();
  if (!BELOPPSFORM.test(t)) return null;
  const n = Number(t.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Vad enhetsvägen efter «kr/» betyder. Tre utfall, och mellanläget är det som gömde sig:
 *
 *   `mån`               → ett månadspris. Kandidat.
 *   `användare/mån`     → ett PER-ENHET-pris. Granskaren mätte att det försvann TYST i den gamla
 *                         versionen (`priser=0 avvisade=0`) — och det är den vanligaste formen
 *                         för SaaS, alltså precis den kategori skrapan siktar på. Avvisas nu med
 *                         enheten utskriven, för «vad är talet per?» är bibelns egen fråga.
 *   `m²` · `år` · `st`  → inte ett månadspris alls. Räknas och redovisas, men blockerar inte —
 *                         en sida som nämner kvadratmeterhyra är inte en trasig prissida.
 */
export function klassaEnhet(sokvag) {
  const delar = String(sokvag ?? '').split('/').map((d) => d.trim()).filter(Boolean);
  const manader = delar.filter((d) => MANADSORD.test(d));
  if (manader.length === 0) return { typ: 'annan_enhet', enhet: delar.join('/') };
  if (delar.length === 1) return { typ: 'manad', enhet: delar[0] };
  return { typ: 'per_enhet', enhet: delar.filter((d) => !MANADSORD.test(d)).join('/') };
}

/**
 * Läs prisförekomster ur sidans TEXT. Ren funktion — ingen DOM, ingen webbläsare, inget nät.
 *
 * EN slinga, TRE redovisade utgångar: `priser` bär det som gick att läsa, `avvisade` bär det som
 * inte gjorde det — med token OCH skäl — och `ejManad` räknar de belopp som bar en helt annan
 * enhet. Ingen fjärde utgång finns, och det är hela poängen: en tyst bortsortering är precis hur
 * det falska golvet uppstod, två gånger, i två olika kostymer.
 *
 * Varje pris bär kontexten på BÅDA sidor (`fore`/`efter`). Kvalificerare står oftare efter
 * beloppet än före det — «199 kr/mån första 3 månaderna» — och en grind som bara ser vänster
 * vaktar den halva av meningen där de sällan står.
 */
export function lasPriser(text) {
  const t = String(text ?? '');
  const priser = [];
  const avvisade = [];
  let ejManad = 0;
  for (const m of t.matchAll(KANDIDAT)) {
    const [hela, tecken, token, enhetsvag] = m;
    const slut = m.index + hela.length;
    const fore = t.slice(Math.max(0, m.index - KONTEXT_FONSTER), m.index).trim();
    const efter = t.slice(slut, slut + KONTEXT_FONSTER).trim();
    const enhet = klassaEnhet(enhetsvag);

    if (enhet.typ === 'annan_enhet') { ejManad += 1; continue; }
    if (enhet.typ === 'per_enhet') {
      avvisade.push({ token, skal: `pris per ${enhet.enhet}, inte per plan`, fore, efter });
      continue;
    }
    // Ett minustecken före beloppet är antingen en kreditering eller ett intervall («199–499
    // kr/mån»). Vilket av dem går inte att avgöra ur tecknen, och båda betyder att talet inte är
    // ett planpris. En enda regel för alla tre strecken — hellre det än tre grenar där två är
    // oobserverbara bakom den tredje.
    if (tecken) {
      avvisade.push({ token, skal: `tecknet «${tecken}» före beloppet — kreditering eller intervall`, fore, efter });
      continue;
    }
    const kronor = tolkaBelopp(token);
    if (kronor === null) {
      avvisade.push({ token, skal: 'formen är inte ett entydigt belopp (gruppering eller >2 decimaler)', fore, efter });
      continue;
    }
    priser.push({ kronor, index: m.index, fore, efter });
  }
  return { priser, avvisade, ejManad };
}

/** Momsbasen får bara vara något sidan FAKTISKT skriver NÄRA det enskilda priset. */
export const MOMSBAS = Object.freeze(['exkl', 'inkl', 'okand']);
/** Hur nära ETT pris momsuppgiften måste stå för att gälla DET priset. */
export const MOMS_FONSTER = 400;

const EXKL_RE = /(exkl\.?|exklusive|utan)\s*moms/;
const INKL_RE = /(inkl\.?|inklusive)\s*moms/;

/**
 * Momsbasen för ETT pris, läst i dess eget fönster. Säger fönstret båda sakerna är svaret okänt.
 */
export function momsbasVidIndex(text, index) {
  const t = String(text ?? '').toLowerCase();
  if (!Number.isFinite(index)) return 'okand';
  const fonster = t.slice(Math.max(0, index - MOMS_FONSTER), index + MOMS_FONSTER);
  const exkl = EXKL_RE.test(fonster);
  const inkl = INKL_RE.test(fonster);
  if (exkl && inkl) return 'okand';
  if (exkl) return 'exkl';
  if (inkl) return 'inkl';
  return 'okand';
}

/**
 * Sidans momsbas — och den är bara känd om VARJE pris bär samma kända bas i sitt EGET fönster.
 *
 * ⚠️ FÖRSTA VERSIONEN SATTE EN SIDBRED FLAGGA i slingan: en enda kvalificerande förekomst
 * stämplade alla planer, och `MOMS_FONSTER` kunde krympas till ett utan att ett test föll.
 * Fönstret vaktade ingenting det påstod sig vakta. Nu avgörs varje pris för sig, och ett enda
 * okänt gör hela underlaget okänt — fail-closed, samma riktning som allt annat i modulen (SD-18).
 */
export function lasMomsbas(text, prisIndex = []) {
  if (!Array.isArray(prisIndex) || prisIndex.length === 0) return 'okand';
  const baser = prisIndex.map((i) => momsbasVidIndex(text, i));
  if (baser.some((b) => b === 'okand')) return 'okand';
  return baser.every((b) => b === baser[0]) ? baser[0] : 'okand';
}

/** Första kvalificeraren som träffar priset, på någondera sidan — eller `null`. */
function kvalificerare(pris) {
  const omgivning = `${pris.fore} ⟨pris⟩ ${pris.efter}`;
  for (const [re, namn] of KVALIFICERARE) if (re.test(omgivning)) return namn;
  return null;
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

  const { priser, avvisade, ejManad } = lasPriser(text);

  // Ett avvisat token är ett FYND, inte ett städat bortfall. Skälet kommer från läsaren och
  // citeras ordagrant — ett reservkort får aldrig påstå ett skäl det inte vet (bibeln 15 aug).
  if (avvisade.length) {
    return { blockerar: true, kod: 'avvisat_belopp', underlag: null,
      skal: `${avvisade.length} belopp godtogs inte: `
        + avvisade.slice(0, 5).map((a) => `«${a.token}» (${a.skal})`).join(' · ') };
  }

  if (priser.length < MIN_PRISER) {
    return { blockerar: true, kod: 'for_fa_priser', underlag: null,
      skal: `${priser.length} prisförekomst(er), kräver ${MIN_PRISER} — DOM:en har sannolikt ändrats`
        + (ejManad ? ` (${ejManad} belopp bar en annan enhet än månad och räknas inte)` : '') };
  }

  // Kvalificerare: ett rabatterat, tidsbegränsat, bundet eller per-användare-prissatt belopp är
  // inte ett ordinarie månadslistpris. Syskonmarkupen som besegrade den gamla blockgrinden syns
  // HÄR, i kontexten kring beloppet. Hellre tystnad än ett kampanjpris draget som golv — ett för
  // lågt golv överdriver besparingen, och det är den riktning vår success fee gör farlig.
  const kvalificerade = priser
    .map((p) => ({ p, namn: kvalificerare(p) }))
    .filter((x) => x.namn);
  if (kvalificerade.length) {
    // ⚠️ TALET SÄGER «LIGGER INOM FÖNSTRET», aldrig «är kvalificerat». På en tät prislista
    // täcker ±KONTEXT_FONSTER tecken även grannraden, så EN kvalificerare kan färga tre
    // förekomster. Att skriva «3 pris bär en kvalificerare» hade varit ett tal utan sin enhet
    // (bibeln 15 augusti) — riktningen är rätt (fail-closed, SD-17), men antalet mäter närhet.
    return { blockerar: true, kod: 'kvalificerat_pris', underlag: null,
      skal: `${kvalificerade.length} av ${priser.length} prisförekomster ligger inom `
        + `${KONTEXT_FONSTER} tecken från en kvalificerare: `
        + kvalificerade.slice(0, 3)
          .map(({ p, namn }) => `[${namn}] «…${p.fore.slice(-30)} ${p.kronor} ${p.efter.slice(0, 30)}…»`)
          .join(' · ') };
  }

  const utanfor = priser.filter((p) => p.kronor < SANITET_MIN_KR || p.kronor > SANITET_MAX_KR);
  if (utanfor.length) {
    return { blockerar: true, kod: 'utanfor_band', underlag: null,
      skal: `${utanfor.length} pris utanför ${SANITET_MIN_KR}–${SANITET_MAX_KR} kr/mån: `
        + utanfor.slice(0, 4).map((p) => p.kronor).join(' · ') };
  }

  const momsbas = lasMomsbas(text, priser.map((p) => p.index));
  if (momsbas === 'okand') {
    const utan = priser.filter((p) => momsbasVidIndex(text, p.index) === 'okand').length;
    return { blockerar: true, kod: 'momsbas_okand', underlag: null,
      skal: `${utan} av ${priser.length} pris saknar momsuppgift inom ${MOMS_FONSTER} tecken`
        + ' (eller sidan säger emot sig själv) — ett pris vars bas är okänd kan inte ställas mot'
        + ' kundens fakturarad' };
  }

  const sorterade = [...priser].sort((a, b) => a.kronor - b.kronor);
  const dom = {
    blockerar: false,
    kod: 'underlag',
    skal: `${priser.length} prisförekomster lästa, alla entydiga och okvalificerade`
      + (ejManad ? ` · ${ejManad} belopp bar en annan enhet än månad och ingår inte` : ''),
    // ⚠️ UNDERLAG, ALDRIG ETT GOLV. Modulen ser att tecknen är entydiga — aldrig vilken PRODUKT
    // de hör till. Att utse ett referenspris är ett mänskligt beslut (MK-08), och ordet
    // «verifierat» måste förtjänas. SD-16 låser att inget fält påstår något annat.
    underlag: {
      url,
      momsbas,
      antalPriser: priser.length,
      lagsta: sorterade[0].kronor,
      hogsta: sorterade.at(-1).kronor,
      forekomster: sorterade.map((p) => ({
        kronor: p.kronor,
        fore: p.fore.slice(-KONTEXT_FONSTER),
        efter: p.efter.slice(0, KONTEXT_FONSTER),
      })),
    },
  };

  // ⚠️ INVARIANTEN `blockerar === false ⟺ underlag !== null` HÅLLS AV KONSTRUKTIONEN: varje
  // annan utgång ovan returnerar `blockerar: true` med `underlag: null` i samma literal, och
  // det här är den enda platsen som bygger ett underlag. SD-27 prövar den över HELA kodfältet.
  //
  // Här stod en runtime-kontroll som skulle fånga motsägelsen. Jag rev den: sabotaget mot den
  // fällde NOLL tester, därför att tillståndet den vaktar inte kan uppstå — en rad som ser ut
  // som ett skydd utan att vara det är sämre än ingen rad, för nästa läsare kontrollerar den
  // inte (bibeln 10 september). Granskarens fynd var riktigt, men det satt i SKRIPTET som
  // grenar på `blockerar`, inte här. Testet bär invarianten; koden bär inte en attrapp.
  return dom;
}
