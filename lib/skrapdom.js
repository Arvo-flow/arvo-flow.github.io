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
// skyddet utan att göra det till DET ENDA»). Ett LÖST mönster fångar varje belopp som bär en
// månadsenhet; därefter KLASSAS varje träff i öppen dager — godtagen eller avvisad med skäl.
// Lookbehinden är RIVEN: tvetydigheten avgörs nu av `tolkaBelopp`, och det är den enda tanden.
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
//     «är kvalificerat». Därför produceras ett UNDERLAG och aldrig ett golv — sista milen är
//     en människa.

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
  [/kampanj|rabatt|\brea\b|spara|erbjudande|ord\.?\s*pris|ordinarie|nu\s+endast|\bfrån\b|fr\.o\.m|introduktion/i,
    'kampanj-/frånmarkör'],
  [/först(?:a|e)\s+(?:\d+|en|tre|sex|tolv)\s*mån|first\s+month|därefter|efter\s+\d+\s*mån|\d+\s*mån(?:ader)?\s+gratis/i,
    'tidsbegränsat pris'],
  [/bindning|bindningstid|vid\s+\d+\s*mån|\d+\s*mån(?:aders)?\s*avtal|årsavtal|uppsägningstid/i,
    'bindningsvillkor'],
  [/per\s+(?:användare|användaren|anv\.|anställd|anställda|user|seat|licens)|\/\s*(?:användare|user|anv)\b/i,
    'enhetskvalificerare'],
]);

/**
 * ETT BELOPP MED EN MÅNADSENHET — löst fångat, med sin ENHET utskriven.
 *
 * Mönstret ankrar INGENTING och avvisar INGENTING; det bara hittar. Beloppstoken tas greedy och
 * får innehålla mellanrum, så «VPS 2 199 kr/mån» blir token «2 199» — ett synligt tvetydigt tal
 * i stället för en tyst icke-träff. Enheten fångas som ett eget ord: «m²» blir aldrig en månad,
 * och den regeln är den ENDA tanden på den axeln (SD-02).
 *
 * Mellanrum i talet är avsiktligt `[  ]` och inte `\s` — en radbrytning SKILJER två tal åt,
 * och att svälja den hade gjort «Plan 3\n199 kr/mån» tvetydigt utan att det är det.
 */
const PRIS_LOST = /(\d[\d  .,]*\d|\d)\s*(?:kr|sek)\s*(?:\/|per\s+)\s*([\p{L}²]+)/giu;

/** Enheter som betyder «per månad». Allt annat — m², år, st, GB — är inte ett månadspris. */
const MANADSENHET = /^(?:mån|månad|månaden|manad|month|months|mo)$/i;

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
  // ⚠️ MELLANRUMSGRUPPERAT TUSENTAL VÄGRAS, och det är den bärande tanden sedan lookbehinden
  // revs. «VPS 2 199 kr/mån» kan läsas som «VPS 2» + «199 kr» ELLER som «VPS» + «2 199 kr» —
  // båda är korrekt svenska, och ur platt text går det inte att avgöra. Det gav ett ENTYDIGT
  // FALSKT golv: 2199 för sanna 199. Tolv gånger fel, innanför sanitetsbandet, omöjligt att
  // skilja från en avläsning. Priset för att vägra är att en sida som skriver «1 299 kr/mån»
  // tystas — men den tystnaden är HÖGLJUDD (namngivet skäl) och en människa kan läsa sidan.
  // Ett falskt golv är tyst och når kunden. Riktningen är given.
  if (/[  ]/.test(t)) return null;
  const n = Number(t.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * Läs prisförekomster ur sidans TEXT. Ren funktion — ingen DOM, ingen webbläsare, inget nät.
 *
 * EN slinga, två utgångar, båda redovisade: `priser` bär det som gick att läsa, `avvisade` bär
 * det som INTE gjorde det — med token och skäl. En tyst bortsortering är precis hur det falska
 * golvet uppstod, och lookbehindens icke-träff var samma tystnad i ett annat kostym.
 *
 * Varje pris bär kontexten på BÅDA sidor (`fore`/`efter`). Kvalificerare står oftare efter
 * beloppet än före det — «199 kr/mån första 3 månaderna» — och en grind som bara ser vänster
 * vaktar den halva av meningen där de sällan står.
 */
export function lasPriser(text) {
  const t = String(text ?? '');
  const priser = [];
  const avvisade = [];
  for (const m of t.matchAll(PRIS_LOST)) {
    const [hela, token, enhet] = m;
    // En annan enhet är inte ett avvisat MÅNADSPRIS — det är ett tal om något annat (hyra per
    // m², domän per år). Att lägga det i `avvisade` hade fällt varje sida som råkar nämna det.
    if (!MANADSENHET.test(enhet)) continue;
    const kronor = tolkaBelopp(token);
    const slut = m.index + hela.length;
    const fore = t.slice(Math.max(0, m.index - KONTEXT_FONSTER), m.index).trim();
    const efter = t.slice(slut, slut + KONTEXT_FONSTER).trim();
    if (kronor === null) {
      avvisade.push({ token, skal: 'tvetydig tusental/decimal-form', fore, efter });
      continue;
    }
    priser.push({ kronor, index: m.index, fore, efter });
  }
  return { priser, avvisade };
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

  const { priser, avvisade } = lasPriser(text);

  // Ett avvisat token är ett FYND, inte ett städat bortfall.
  if (avvisade.length) {
    return { blockerar: true, kod: 'tvetydigt_tal', underlag: null,
      skal: `${avvisade.length} belopp har tvetydig tusental/decimal-form: `
        + avvisade.slice(0, 5).map((a) => a.token).join(' · ')
        + ' — formen går inte att avgöra ur tecknen, och en faktor 1000 ryms i tvetydigheten' };
  }

  if (priser.length < MIN_PRISER) {
    return { blockerar: true, kod: 'for_fa_priser', underlag: null,
      skal: `${priser.length} prisförekomst(er), kräver ${MIN_PRISER} — DOM:en har sannolikt ändrats` };
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
  return {
    blockerar: false,
    kod: 'underlag',
    skal: `${priser.length} prisförekomster lästa, alla entydiga och okvalificerade`,
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
}
