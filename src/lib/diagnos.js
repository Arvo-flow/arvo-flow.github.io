// src/lib/diagnos.js — analyssidans RUBRIKTEXTER, uppslagna per läge.
//
// ⚠️ LÄGET FLYTTADE UT 2026-09-23 (Lägesregistret). Här bodde diagnos(), DIAGNOSLAGEN, diagnosLage,
// NIVASANKNINGSKORT och harNivasankningskort — analyssidan räknade sin egen poäng, och `score ?? 0`
// gjorde en omätt poäng till «Kritisk» (mätt i systemöversynen). Läget räknas nu i api-lagret
// (lib/lagesregister.js `fakturaLage`) och kommer färdigt i `result.lage`; registret för
// rätt-storlekskorten är lib/rattstorleksfynd.js `RATTSTORLEK_FALT`. Kvar här: ordalydelsen per
// rubrikkod (`result.lage.rubrik`). Historiken om varför omätt aldrig får ge ett omdöme står i git.

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

// ── DIAGNOSENS MENING — AVSTÅND TILL VERIFIERAT LISTPRIS, ALDRIG ETT BRANSCHSNITT (2026-09-24) ──────
// Här (i TestaFaktura) stod «Ni har ett marknadsmässigt avtal — bättre än branschsnittet.» och «Ni betalar
// något/markant sämre än branschsnittet». Poängen mäts bara mot `suggestedAnnualCost` — ett verifierat
// listpris — och är bara mätt när kunden betalar MER än det. Mätt: 11 % över listpris utan byte gav
// score 85 och den rosande meningen. Inget branschsnitt räknas någonstans i kedjan.
// Meningen säger nu exakt vad som mättes: avståndet till verifierat listpris, med talet. Den berömmer
// aldrig (DG-01), och en klickprispoäng (skrivarleasing) säger att den bygger på ett estimerat band.
// Blind: meningen läser `lage` som API:t räknat — ett fel i `diagnos()` syns här som ett korrekt formulerat fel.

/** Text när kategorin saknar verifierat publikt pris — ersätter «Uppskattad besparing baserad på branschsnitt». */
export const UTAN_VERIFIERAT_PRIS = 'Vi har inget verifierat publikt pris för den här kategorin och visar därför ingen besparing. Ett exakt pris kräver en offert.';

/**
 * @param {{ matt: boolean, grund?: string|null, overMarketPct?: number, skal?: string|null }} lage  fakturans läge ur API:t
 * @param {{ harByte?: boolean }} [opt]
 * @returns {string}
 */
export function diagnosMening(lage, { harByte = false } = {}) {
  if (!lage?.matt) {
    return `Vi har läst er faktura och ert nuläge — men ${lage?.skal ?? 'jämförelsen kunde inte göras'}. Vi hävdar därför inget om er prisnivå i dag, och lägger aldrig fram en besparing vi inte kan räkna hem.`;
  }
  if (lage.grund === 'klickpris') {
    return 'Poängen bygger på fakturans klickpriser mot ett estimerat prisband, inte på ett verifierat listpris.';
  }
  const pct = Number(lage.overMarketPct) || 0;
  const avstand = pct >= 1
    ? `Ni betalar ${pct} % över verifierat publikt listpris.`
    : 'Ni betalar mindre än en procent över verifierat publikt listpris.';
  return `${avstand} ${harByte ? 'Ett lägre verifierat pris finns att hämta.' : 'Vi föreslår inget byte i dag.'}`;
}
