// src/lib/diagnos.js — har analyssidan ett MÄTT jämförelsetal, eller bara frånvaron av ett?
//
// VARFÖR (2026-08-22, regel 8-genomgången av huvudfunneln). TestaFaktura räknade:
//
//     diagOvPct     = suggested > 0 && suggested < annual ? (annual - suggested)/annual : 0
//     diagScoreRaw  = clickScore ?? Math.max(5, 100 - diagOvPct * 1.5)
//     diagScore     = !shouldSwitch ? min(diagScoreRaw, 85) : ...
//
// Utan bytesmål blir `diagOvPct` 0, `diagScoreRaw` 100, och scoren landar på 85 — vilket ger
// texten «Ni har ett marknadsmässigt avtal — bättre än branschsnittet.»
//
// Men `suggested = 0` betyder inte att kunden betalar bra. Det betyder att VI inte kunde räkna
// fram ett mål. Det är exakt samma sats som fällde rummet i fyra ytor samma dag, här i
// huvudfunneln: **frånvaron av ett verifierat bytesmål säger ingenting om huruvida kunden betalar
// rätt.** Och det är ett påstående om vårt underlag som presenteras som ett omdöme om kundens pris.
//
// Mina egna fixar samma dag gjorde läget VANLIGARE, inte ovanligare: totalgrinden nollar
// bytesmålet när kohortdatan är en totalsumma, lfl-grinden när licensraderna inte bär ett bevisat
// pris, och finansgrinden när målet inte underskrider kundens kostnad. Alla tre är rätt — och
// alla tre matar den här grenen. En fix som gör ett gammalt redovisningsfel vanligare måste
// stänga det också.
//
// FÅNGAR: att ett score sätts, och ett positivt omdöme skrivs, på en faktura där inget
//   jämförelsetal kunde räknas fram.
// BLIND: säger bara OM ett mål finns, aldrig om målet är RÄTT. Att jämförelsen avser samma
//   produkt är licensnivåns och kraverBekraftadNiva:s ansvar; att källan är ett listpris är
//   jamforelsekalla.js.

// Påståendekontraktets register (src/lib/pastaendekontrakt.js). Analyssidan har två lägen och
// det omätta är det som gav score 85 och «bättre än branschsnittet» på fakturor vi aldrig kunde
// jämföra. Registret gör frågan explicit i stället för att bo i en boolean.
export const DIAGNOSLAGEN = {
  matt:  { positivtPastaende: true },
  omatt: { positivtPastaende: false, omatt: true },
};

// ── ANALYSKORTETS RUBRIKER — TEXTEN BOR BREDVID DEKLARATIONEN (2026-09-08) ──────────────────
//
// GRANSKNINGENS FYND 5. `DL-10` i tests/domslut.mjs vaktade frasen «marknadsmässigt pris» i
// kundytorna. Granskaren visade att vakten är EN REDIGERING BRED: skrev man i stället «Ert pris
// ligger i linje med marknaden» passerade både DL-10 och hela pre-commit-kedjan. Vakten läser
// ord, aldrig innebörd — det stod deklarerat i dess huvud, men en deklarerad blindfläck är
// fortfarande en blindfläck.
//
// Påståendekontraktet (src/lib/pastaendekontrakt.js) namnger själv exakt det här hålet i sin
// BLIND-rad: «det ser inte en yta som gör sina påståenden UTAN lägesmodul; att nya ytor går via
// en är en granskningsfråga, inte en maskinfråga.» Analyskortets rubrik var en sådan yta — en
// hårdkodad sträng i JSX, utan läge, utan deklaration, utan fråga.
//
// Registret gör frågan TVINGANDE i stället för att lita på en ordlista: en ny rubrik måste läggas
// här, och då måste den svara på om den påstår något om KUNDENS PRIS eller bara om VÅRT BESLUT.
// Texten bor bredvid deklarationen just för att avståndet ska vara noll — kontraktets egen
// motivering, tillämpad på den yta kunden möter först.
//
// FÅNGAR: en rubrik vars text påstår något om priset i ett läge som deklarerats neutralt, och en
//   rubrik som renderas utan att stå i registret.
// BLIND: kontraktet ser deklarationen, aldrig svenskan. `AR-02` prövar vokabulären som ett
//   BACKSTOPP, men den som skriver en berömmande mening OCH deklarerar den `true` har svarat på
//   frågan — och då är det granskarens jobb, inte maskinens. Skillnaden mot förut är att frågan
//   nu MÅSTE ställas.
export const ANALYSRUBRIKER = {
  // Inget bytesmål hittades. Det säger något om VÅRT underlag, aldrig om kundens pris.
  inget_byte: {
    positivtPastaende: false,
    rubrik: 'Inget byte att rekommendera.',
    text: 'Vi hittar inget publikt pris att byta ned till för de licensrader vi kunnat prissätta '
        + '— det är ett besked om vårt underlag, inte ett omdöme om ert pris.',
  },
  // Inget BYTE — men en billigare nivå hos kundens NUVARANDE leverantör.
  //
  // ⚠️ LÄGET SAKNADES, OCH DET SYNTES FÖRST I EN HELSIDESRENDERING (2026-09-22). Rubriken
  // «Inget byte att rekommendera · vi hittar inget publikt pris att byta ned till» stod tre block
  // ovanför ett kort som sa «Nivån under, Mellan (490 kr/mån), är 220 kr/mån billigare … upp till
  // 2 640 kr/år». Båda meningarna är sanna var för sig — `inget_byte` handlar om ett
  // LEVERANTÖRSBYTE, kortet om en NIVÅSÄNKNING hos samma leverantör — men kunden läser helheten,
  // och helheten sa «vi hittade inget» ovanför «vi hittade 2 640 kr».
  //
  // Det är helhetskravet från 15 augusti ordagrant: **ett påstående som är sant om SIN DEL kan
  // vara osant om HELHETEN.** Rätt drag är inte att mjuka upp `inget_byte` utan att ge det tredje
  // tillståndet ett eget namn — en tvåvägsgren på en trevärd verklighet lägger alltid det tredje
  // fallet i `else`, och `else` var här den mening som förnekade kortet under sig.
  //
  // Deklarationen är `false` av samma skäl som `inget_byte`: att en billigare NIVÅ finns säger
  // ingenting om huruvida kunden betalar rätt för den nivå de valt.
  inget_byte_med_nivasankning: {
    positivtPastaende: false,
    rubrik: 'Inget byte — men en nivå att sänka.',
    text: 'Vi hittar inget publikt pris att byta ned till hos en annan leverantör. Däremot ligger '
        + 'ni på en nivå som har en billigare nivå under sig hos er nuvarande — talen står i underlaget.',
  },
  // Kategorin saknar revisionsgrindens täckning: vi visar inga tal alls.
  kategori_omatt: {
    positivtPastaende: false,
    rubrik: 'Kategorin är under analys.',
    text: 'Koppla Fortnox / Visma så mappar vi era volymer mot marknadens bästa priser direkt.',
  },
};

/**
 * Fälten på `recommendation` som bär ett rätt-storlekskort i kundytan.
 *
 * Listan är EN sanning (regel 1): rubriken och korten måste läsa samma mängd, annars kan ett nytt
 * kort läggas till utan att rubriken vet om det — och då är motsägelsen tillbaka. `AR-04` härleder
 * kortvillkoren ur kundytans källkod och kräver att varje villkor står här.
 */
// ⚠️ LISTAN VAR FÖR KORT NÄR DEN SKREVS, och det var AR-04 som mätte fram det. Jag skrev två
// namn ur minnet; svepet över kundytan hittade FYRA kortvillkor. `adobeRightsizing` och
// `loneadminRightsizing` bar alltså samma motsägelse som saas-finance — rubriken förnekade dem
// också, och ingen hade sett det. Precis det instrumentet byggdes för: en lista skriven för hand
// är ett antagande, ett svep över ytan är en avläsning.
export const NIVASANKNINGSKORT = [
  'saasFinanceRightsizing', 'm365Rightsizing', 'adobeRightsizing', 'loneadminRightsizing',
];

/** Visar vyn ett rätt-storlekskort? Då får rubriken inte förneka det. */
export function harNivasankningskort(recommendation) {
  return NIVASANKNINGSKORT.some((f) => Boolean(recommendation?.[f]));
}

/** Läget som en nyckel — samma form som rummets och månadsbrevets register. */
export function diagnosLage(p) {
  return diagnos(p).matt ? 'matt' : 'omatt';
}

/**
 * @param {{ annual: number, suggested: number|null, clickPriceScore: number|null,
 *           shouldSwitch: boolean, netSaving: number|null }} p
 * @returns {{ matt: boolean, score: number|null, ovPct: number, overMarketPct: number, skal: string|null }}
 */
export function diagnos({ annual, suggested, clickPriceScore, shouldSwitch, netSaving } = {}) {
  const a = Number(annual) || 0;
  const s = Number(suggested) || 0;

  // Klickanalysen (skrivarleasing) bär sitt EGET mätta score ur radernas klickpriser och behöver
  // inget bytesmål — den är mätt även när `suggested` saknas.
  if (clickPriceScore != null && Number.isFinite(Number(clickPriceScore))) {
    return { matt: true, score: Number(clickPriceScore), ovPct: 0, overMarketPct: 0, skal: null };
  }

  if (!(a > 0) || !(s > 0) || !(s < a)) {
    // Inget jämförelsetal. Vi vet vad kunden betalar — inte vad det borde vara.
    return {
      matt: false, score: null, ovPct: 0, overMarketPct: 0,
      skal: !(a > 0) ? 'årskostnaden kunde inte fastställas'
        : !(s > 0) ? 'inget verifierat jämförelsepris kunde räknas fram'
          : 'jämförelsepriset underskrider inte kundens kostnad',
    };
  }

  const ovPct = Math.round(((a - s) / a) * 100);
  const overMarketPct = Math.round(((a - s) / s) * 100);
  const raw = Math.max(5, Math.round(100 - ovPct * 1.5));
  const score = !shouldSwitch
    ? Math.min(raw, 85)
    : (Number(netSaving) || 0) > 0
      ? Math.min(raw, 79)   // cap vid 79 → "Förbättringsläge" när vi rekommenderar byte
      : raw;
  return { matt: true, score, ovPct, overMarketPct, skal: null };
}
