// lib/fakturakolumner.js — LÄS ANTALET UR FAKTURANS EGEN KOLUMN.
//
// ══ VARFÖR (2026-09-08) ════════════════════════════════════════════════════════════════════
//
// Grundarens faktura hade en TOM Antal-kolumn på Premium-raden. Maskinen lagrade `antal = 10`,
// vilket är 2 102,90 ÷ 210,29 — modellen utförde finansiell aritmetik, och talet gick inte att
// skilja från ett avläst. Det talet öppnar LFL-grinden, bygger `suggestedAnnualCost`, driver
// success fee och blir `agreedPrice` i den BankID-signerade fullmakten.
//
// Första försöket var ett VITTNE: låt modellen gissa, och kontrollera gissningen mot textlagret.
// Det havererade, och granskningen visade varför — pdfjs lägger varje tabellcell på EGEN rad, så
// antalet står fyra rader från sitt belopp. Mätt: 0 av 75 verkliga fakturor hade den radform mitt
// test matade, och 55 % av radposterna kunde ALDRIG vittnas. En korrekt faktura tappade 40 842 kr.
//
// ── INVERTERINGEN ─────────────────────────────────────────────────────────────────────────
// Vi behöver inget vittne. Koordinaterna finns i `getTextContent()` och tabellen går att
// återskapa exakt:
//
//     y=550   x307:Antal    x397:Á-pris   x482:Belopp      ← kolumnrubriker
//     y=483   x307:57       x397:270,00   x471:15 390,00   ← värdena, under sina rubriker
//
// Alltså: KODEN LÄSER TALET. Modellens antal blir en korskontroll, aldrig källan. Regel 2 —
// «AI tolkar, kod räknar» — blir strukturell i stället för en instruktion i en prompt.
//
// Mätt över de 75 verkliga fakturorna: 64 (85 %) har en LÄSBAR tabell och 187 rader bär ett
// avläst antal. De 11 utan tabellstruktur svarar `ingen_tabell` — aldrig en gissning.
//
// ⚠️ JAG SKREV HÄR ATT GRUNDARENS PyFPDF-FAKTURA SAKNAR TABELLSTRUKTUR. Det var ett påstående
// före mätningen, och mätningen motbevisade det: pdfjs ger 26 positionerade fragment även där,
// rubrikraden hittas, och utfallet blir korrekt PER RAD — Premium `tom_cell` (kolumnen finns,
// cellen är tom) och E3 `avlast: 12`. Alltså bättre än jag trodde, i den säkra riktningen. Men
// ett påstående jag inte kört är ett påstående som inte hör hemma i en modulhuvud.
//
// ── VAD MODULEN ALDRIG GÖR ────────────────────────────────────────────────────────────────
// Den härleder aldrig ett tal. Den räknar aldrig `belopp ÷ à-pris`. Den gissar aldrig vilken
// kolumn som är vilken. Varje returnerat värde stod tryckt på pappret, på den x-position dess
// rubrik står. Det är därför utfallet är en OBSERVATION per konstruktion — tillståndet «härledd»
// kan inte uppstå, för modulen kan inte härleda.
//
// FAIL-CLOSED PÅ FÄLTET, FAIL-OPEN PÅ PIPELINEN (FK-02, FK-09). Hittas ingen rubrikrad blir det
// hela dokumentet; hittas rubriken men cellen är tom returneras `null` för den raden. Ingen
// faktura går förlorad — den tappar bara rätten att bära ett tal vi inte läst.
//
// FÅNGAR: att ett antal används utan att stå tryckt i sin kolumn.
// BLIND, uttalat i tre delar:
//   1. Kräver per-cell-positionering. En PDF som trycker hela raden som ett fragment (PyFPDF,
//      vissa äldre generatorer) ger ingen kolumnstruktur → `null`, aldrig en gissning.
//   2. Den läser DOKUMENTETS FÖRSTA rubrikrad och därefter bara rader på RUBRIKENS EGEN SIDA
//      (`rad.sida !== rubrik.sida` hoppas över). En radlista som fortsätter på sida 2 ger
//      `rad_ej_funnen` för de raderna — säker riktning, men inte samma sak som att den läser
//      per sida. ⚠️ Här stod tidigare «den rubrikrad den hittar först PER SIDA», vilket
//      beskrev ett beteende koden inte har. Grenen är dessutom OMÄTT: 0 av korpusens 75
//      fakturor är flersidiga, så ingen mätning kan i dag säga hur ofta det inträffar.
//   3. Den vet att talet står under rubriken «Antal» — inte att rubriken betyder antal LICENSER.
//      En rad som fakturerar «Antal timmar» ger ett tal som är sant men handlar om något annat.
//      Att koppla kolumnen till en produkt är kategoriseringens fråga, inte läsarens.

/** Kolumnrubriker vi kan läsa. Snäva med flit — hellre `null` än en gissad kolumn. */
const RUBRIKER = Object.freeze({
  antal:  /^(?:antal|ant\.?|st|styck|mängd|qty|quantity)\b/i,
  apris:  /^(?:[àáa]-?pris|apris|st[- ]?pris|unit\s*price|pris\/st)\b/i,
  belopp: /^(?:belopp|summa|amount|total)\b/i,
});

/** Hur nära en cell måste stå sin rubrik i x-led för att räknas som samma kolumn. */
export const KOLUMNTOLERANS = 25;

/** Rader ur positionerade tokens: samma y (± 2 px) hör ihop, sorterade vänster→höger. */
export function grupperaRader(tokens, { yTolerans = 2 } = {}) {
  const rader = [];
  for (const t of tokens ?? []) {
    if (!t || typeof t.y !== 'number' || typeof t.x !== 'number') continue;
    const trad = rader.find((r) => r.sida === t.sida && Math.abs(r.y - t.y) <= yTolerans);
    if (trad) trad.celler.push({ x: t.x, text: t.text });
    else rader.push({ sida: t.sida, y: t.y, celler: [{ x: t.x, text: t.text }] });
  }
  for (const r of rader) r.celler.sort((a, b) => a.x - b.x);
  // Uppifrån och ned: pdfjs y växer uppåt, så fallande y är läsordning.
  return rader.sort((a, b) => (a.sida - b.sida) || (b.y - a.y));
}

/**
 * Hittar tabellens rubrikrad och var kolumnerna står i x-led.
 * @returns {{ y: number, sida: number, kolumner: {antal?: number, apris?: number, belopp?: number} }|null}
 */
/**
 * Är cellen en KOLUMNETIKETT, eller bara text som råkar börja med rätt ord?
 *
 * ── GRANSKNINGENS FYND 2 (2026-09-08), STÄNGT 2026-09-09 ─────────────────────────────────
 * `RUBRIKER.antal` matchar `/^st\b/i` och `belopp` matchar `/^summa\b/i`, så raden
 * «St Eriksgatan 4» + «Summa att betala» godtogs som tabellhuvud. Skadan spårad genom hela
 * kedjan: en falsk rubrik högt på sidan gör positionskolumnen «Pos» till Antal-kolumn, E3-raden
 * läses som `antal: 1` där pappret trycker 40, bytesmålet kollapsar 97 % — och **arvodet stiger
 * 46 396 kr, åt VÅRT eget håll**. Under 20 % success fee är det den farligaste riktningen vi har,
 * och att en osourcad siffra pekar åt det håll som gynnar oss är ett skäl att stänga den fortare
 * (grundarens ord, 18 aug).
 *
 * REGELN ÄR MÄTT, INTE VALD. Alla 64 verkliga rubrikrader i korpusen inspekterades: de matchade
 * cellerna är «ANTAL», «Antal», «Antal / Period», «Antal/Vikt», «Mängd» — max 14 tecken, och
 * **noll av 64 bär en siffra**. Fyra kandidatregler mättes mot korpusen och mot de falska raderna:
 *
 *   nuvarande (ingen extra regel)          tappade 0/64   falska kvar 3/3
 *   A: matchad cell utan siffra            tappade 0/64   falska kvar 1/3
 *   B: A + matchad cell ≤ 20 tecken        tappade 0/64   falska kvar 1/3   ← vald
 *   C: B + minst en matchad cell ≤ 8       tappade 2/64   falska kvar 0/3
 *
 * C dödar allt men tappar `cloudreseller-norden` (CR-88412) och `nordiclogistik` — de två
 * fakturor antalsdoktrinen vilar på. Att köpa en teoretisk falsk rubrik med två verkliga
 * tabeller är fel byte. B är därför vald: fri mot korpusen, dödar de två realistiska formerna.
 *
 * ⚠️ KVARSTÅENDE HÅL, UTTALAT OCH MÄTT: en adressrad UTAN gatunummer («St Eriksgatan») bredvid
 * «Summa att betala» passerar fortfarande. Den strukturella regeln — «en rubrikrad följs av
 * datarader i sina egna kolumner» — mättes också och avvisades: en verklig faktura
 * (`bredband_2_sveakom`, 5 avlästa rader) gav noll datarader enligt sonden, och innan skillnaden
 * är förstådd är den regeln inte färdigmätt. Skadan om hålet träffar är kvantifierad ovan; den
 * som stänger det ska mäta om samma fyra kandidater först.
 */
function arKolumnetikett(text) {
  const t = String(text ?? '');
  return t.length <= 20 && !/\d/.test(t);
}

export function hittaRubrikrad(rader) {
  for (const rad of rader ?? []) {
    const kolumner = {};
    for (const cell of rad.celler) {
      if (!arKolumnetikett(cell.text)) continue;   // löptext är ingen kolumnetikett (fynd 2)
      for (const [namn, re] of Object.entries(RUBRIKER)) {
        if (kolumner[namn] === undefined && re.test(cell.text)) kolumner[namn] = cell.x;
      }
    }
    // En rubrikrad känns igen på att den bär ANTAL plus minst en till. Bara «Antal» ensamt kan
    // vara löptext; tre kolumner i rad är en tabell. Snävt med flit — en falsk rubrikrad ger
    // fel x-positioner för HELA dokumentet, och det är det dyraste felet modulen kan göra.
    if (kolumner.antal !== undefined && Object.keys(kolumner).length >= 2) {
      return { y: rad.y, sida: rad.sida, kolumner };
    }
  }
  return null;
}

/** Ett heltal, eller null. Inga decimaltal — en licensmängd är ett heltal (obduktionen 20 aug). */
function heltal(text) {
  const t = String(text ?? '').trim();
  if (!/^\d{1,6}(?:\s?(?:st|stk|pcs))?$/i.test(t)) return null;
  const n = Number(t.replace(/\D/g, ''));
  return Number.isInteger(n) && n > 0 ? n : null;
}

/**
 * Läser antalet PER RAD ur fakturans Antal-kolumn. Aldrig härlett, aldrig gissat.
 *
 * @param {Array<{sida,x,y,text}>} tokens  positionerade fragment ur extraheraTextlager
 * @returns {{ rubrik: object|null, rader: Array<{y, sida, antal: number|null, text: string}> }|null}
 *   `null` = dokumentet har ingen läsbar tabellstruktur. Det är ett EGET tillstånd, aldrig
 *   samma sak som «antalet saknas på raden».
 */
export function lasAntalskolumn(tokens) {
  const rader = grupperaRader(tokens);
  const rubrik = hittaRubrikrad(rader);
  if (!rubrik) return null;                       // ingen tabell → vi läser ingenting alls

  const ut = [];
  for (const rad of rader) {
    if (rad.sida !== rubrik.sida || rad.y >= rubrik.y) continue;   // bara rader UNDER rubriken
    const cell = rad.celler.find((c) => Math.abs(c.x - rubrik.kolumner.antal) <= KOLUMNTOLERANS);
    ut.push({
      sida: rad.sida,
      y: rad.y,
      // `null` = inget AVLÄST antal. Skälet bor i `cellText`, aldrig i det här fältet: en tom
      // cell och en oläsbar cell ger båda `null` här, och att slå ihop dem var fynd 1.
      antal: cell ? heltal(cell.text) : null,
      // Vad som FAKTISKT stod i kolumncellen. `null` betyder att ingen cell finns på den
      // x-positionen — inte att den var tom. pdf-textlager släpper aldrig igenom ett tomt
      // fragment (`if (!s2.trim()) continue`), så en cell som finns bär alltid tecken.
      cellText: cell ? cell.text : null,
      text: rad.celler.map((c) => c.text).join(' '),
      celler: rad.celler.length,   // en ensam cell är ett radfragment, aldrig en hel tabellrad
      // Cellernas TAL, inte deras text: en cell är en naturlig talgräns, så beloppet kan
      // jämföras som tal och aldrig som delsträng i ett större tal.
      tal: rad.celler.map((c) => {
        const rent = String(c.text).replace(/[\s\u00a0]/g, '').replace(',', '.');
        return /^-?\d+(?:\.\d+)?$/.test(rent) ? Math.abs(Number(rent)) : null;
      }).filter((n) => n != null),
    });
  }
  return { rubrik, rader: ut };
}

// ── SKÄLEN FÅR INTE BLI ETT SVAR (2026-09-08) ─────────────────────────────────────────────
// Första versionen returnerade `null` för allt: dokumentet saknar tabell, raden hittades inte,
// och cellen var tom. Men bara det SISTA betyder «inget antal står tryckt» — de andra betyder
// «jag kunde inte läsa». Att slå ihop dem hade nollat kundens antal på varje faktura modulen
// inte förstår — så tystade kvantitetsvittnet 40 842 kr i morse (KV-10).
//
// ⚠️ OCH SAMMA SLAGNING FANNS KVAR I DEN HÄR MODULEN (fynd 1, granskningen 8 sep, kväll).
// `antal: null` sattes när cellen var tom ELLER när `heltal()` inte kunde läsa den, och BÅDA
// mappades till `tom_cell` — det enda utfall som är dokumenterat som «bevisar tomhet».
// MÄTT över de 75 verkliga fakturorna: 249 fall, varav **38 (15 %) bar TEXT i cellen**:
//     cloudreseller-norden  «45 st (1 Maj - 31 Maj)»   ← CR-88412, prorata-fakturan
//     nordiclogistik        «45 pallar (Zon 1-3)»
//     bredband_4            «3 mån»   ·   aws-startup-kredit  «12400 GB»
// Vi påstod alltså «inget står tryckt» om rader där antalet stod tryckt. Ingen konsument nollar
// på tom_cell i dag — men fältet ÄR spärren för morgondagen, och den hade fyrat falskt på var
// sjätte rad. Ett påstående som är osant i det ögonblick någon börjar lita på det.
//
// `olasbar_cell` är därför ett eget utfall: cellen finns och bär tecken, men de tecknen är
// inget heltal. Det är «jag läste inte», aldrig «ingenting står där».
//
// ⚠️ OCH VI VIDGAR ALDRIG `heltal()` FÖR ATT SLIPPA UTFALLET. «45 st (1 Maj - 31 Maj)» bär ett
// avläsbart 45 — men samma vidgning gör «3 mån» till 3 och «12400 GB» till 12 400, och då
// fabricerar läsaren ett licensantal ur en månad respektive ett datamått. Det är fynd 5:s
// sjukdom inbyggd i kärnan. Hellre ett ärligt «jag kunde inte läsa» än ett tal om fel sak.
//
// Felfamiljen i sin renaste form: ett tillstånd som betyder «okänt» representerat med samma
// värde som ett giltigt svar. Utfallen är därför namngivna, och BARA `tom_cell` får nolla.
export const AVLASNING = Object.freeze({
  AVLAST:        'avlast',          // talet står tryckt i Antal-kolumnen på radens egen rad
  TOM_CELL:      'tom_cell',        // raden hittad, kolumnen finns, INGEN cell står på dess x
  OLASBAR_CELL:  'olasbar_cell',    // cellen FINNS och bär tecken — men inget heltal
  DELRAD:        'delrad',          // beloppet står på ett RADFRAGMENT — posten är radbruten
  RAD_EJ_FUNNEN: 'rad_ej_funnen',   // tabellen finns men radens belopp gick inte att hitta
  INGEN_TABELL:  'ingen_tabell',    // dokumentet har ingen läsbar kolumnstruktur
});

/** Bara ett avläst antal är en observation; bara en tom cell bevisar att inget står tryckt. */
export function arObservation(utfall) { return utfall === AVLASNING.AVLAST; }
export function bevisarTomhet(utfall) { return utfall === AVLASNING.TOM_CELL; }

/**
 * Antalet för EN radpost, hittad via dess belopp — det mest särskiljande talet på raden.
 * @returns {{ utfall: string, antal: number|null }}  utfallet säger VARFÖR, aldrig bara ATT.
 */
export function antalForRad(tokens, { amount } = {}) {
  const tabell = lasAntalskolumn(tokens);
  if (!tabell) return { utfall: AVLASNING.INGEN_TABELL, antal: null };
  const belopp = Number(amount);
  if (!Number.isFinite(belopp) || belopp === 0) {
    return { utfall: AVLASNING.RAD_EJ_FUNNEN, antal: null };
  }
  // ── BELOPPET BOR I EN CELL, INTE I EN STRÄNG (2026-09-08) ────────────────────────────────
  // Två fel på raken, båda mina, båda fångade av grundsanningen:
  //   1. `includes` på den sammanfogade radtexten träffade DELSTRÄNGAR i större tal: raden
  //      «… 18 500,00» innehåller «850», så sökningen efter 850 landade på fel rad och
  //      rapporterade `tom_cell` om en post vars antal («1 st») stod tryckt.
  //   2. Min första rättning krävde en icke-siffra före träffen — men plattningen hade redan
  //      tagit bort blanktecknet som VAR gränsen. «Office 365 E3» + «4 560,00» blir
  //      «…E34560,00», och siffran 3 står omedelbart före. Grundarens BÅDA rader blev då
  //      `rad_ej_funnen`. Jag förstörde alltså den information jag sedan krävde.
  //
  // Rätt väg använder strukturen som redan finns: beloppet står i EN CELL. En cell är en
  // naturlig talgräns, så ingen delsträngsjakt behövs — vi jämför tal med tal.
  const kr = Math.abs(belopp);
  const barBelopp = (r) => (r.tal ?? []).some((n) => Math.abs(n - kr) <= 0.5);
  const trad = tabell.rader.find(barBelopp);
  if (!trad) return { utfall: AVLASNING.RAD_EJ_FUNNEN, antal: null };

  // ── ETT FALSKT TOMHETSPÅSTÅENDE ÄR DET DYRASTE FELET MODULEN KAN GÖRA (2026-09-08) ────────
  // Mätt på atlassian.pdf: fakturan radbryter en post över tre rader — produktnamnet på en,
  // BELOPPET ENSAMT på en, och beskrivningen med antalet «110» på en tredje. Beloppsmatchningen
  // träffar mittenraden, som bara bär ett tal, och hade rapporterat `tom_cell`. Men antalet ÄR
  // tryckt, en rad ned. Eftersom `tom_cell` är det enda utfall som får nolla ett antal hade den
  // falska tomheten tystat 110 licenser — exakt felet som tystade 40 842 kr i morse.
  //
  // Diskriminatorn är STRUKTURELL, inte ett fönster: en hel tabellrad bär celler i minst två
  // kolumner (beskrivning + belopp, eller antal + belopp). En rad med EN ensam cell är ett
  // fragment av en radbruten post, och om ett fragment kan modulen ingenting säga.
  if (trad.antal != null) return { utfall: AVLASNING.AVLAST, antal: trad.antal };
  if (trad.celler < 2) return { utfall: AVLASNING.DELRAD, antal: null };
  // Cellen FINNS men bär inget heltal → vi läste inte, och det är inte tomhet (fynd 1).
  // `cellText` följer med så att skälet går att läsa i loggen utan att gissa om det.
  if (trad.cellText != null) {
    return { utfall: AVLASNING.OLASBAR_CELL, antal: null, cellText: trad.cellText };
  }
  return { utfall: AVLASNING.TOM_CELL, antal: null };
}

// ── KORRIGERINGEN BOR HÄR, INTE HOS ANROPAREN (2026-09-08, fynd 4) ─────────────────────────
// Loopen låg i `api/test-invoice.mjs` EFTER `extractInvoice()`. `seatCount` härleds ur
// `l.quantity` inne i extraktionen (`applyDeterministicRules`) — alltså FÖRE korrigeringen.
// MÄTT: `grep -n "seatCount =" api/test-invoice.mjs` → ingen träff. I exakt de fall läsaren
// fyrade (= modellen hade fel) behöll `seatCount` det felaktiga talet medan `tierLines` bar
// det rätta: två tal i samma svar som inte går att addera (helhetskravet 15 aug). Talet matar
// `jamforelseSkala`, `pricePerSeat` till `supplier_prices` och `recordContractTimeline`.
//
// Rätt drag är inte att räkna om i efterhand — det är att göra tillståndet omöjligt. Läsaren
// kör nu INNAN härledningen, i samma funktion som äger den, och en anropare kan inte längre
// glömma att följa fixen hem. Att lägga korrigeringen i en delad funktion är samma sak igen:
// en lokal kopia hos varje anropare hade kunnat glida isär (regel 1).
/**
 * Låter fakturans egen Antal-kolumn ersätta modellens tal, rad för rad. MUTERAR `lineItems`.
 * @returns {{ avlast: number, oeniga: number, utfall: object, oenigheter: Array }}
 */
export function korrigeraAntalUrKolumn(lineItems, tokens) {
  const rakning = { avlast: 0, oeniga: 0, utfall: {}, oenigheter: [] };
  for (const l of lineItems ?? []) {
    if (!l || typeof l !== 'object') continue;
    const d = antalForRad(tokens, { amount: l.amount });
    l.antalKalla = d.utfall;                       // proveniensen följer med raden
    rakning.utfall[d.utfall] = (rakning.utfall[d.utfall] ?? 0) + 1;
    if (d.utfall !== AVLASNING.AVLAST) continue;   // bara ett AVLÄST tal får röra kundens rad
    if (l.quantity !== d.antal) {
      rakning.oeniga += 1;
      rakning.oenigheter.push({
        text: String(l.description ?? '').slice(0, 40),
        modellen: l.quantity ?? null,
        pappret: d.antal,
      });
    }
    l.quantity = d.antal;
    rakning.avlast += 1;
  }
  return rakning;
}
