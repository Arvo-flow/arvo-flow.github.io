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
//   2. Den läser SIDANS första tabell. En faktura med flera tabeller eller sidbrytning mitt i
//      radlistan läser bara den rubrikrad den hittar först per sida.
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
export function hittaRubrikrad(rader) {
  for (const rad of rader ?? []) {
    const kolumner = {};
    for (const cell of rad.celler) {
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
      // `null` när cellen är tom ELLER inte är ett heltal. Båda betyder «inget avläst antal»,
      // och modulen får aldrig fylla luckan — det var hela felet den finns för att stoppa.
      antal: cell ? heltal(cell.text) : null,
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

// ── TRE SKÄL FÅR INTE BLI ETT SVAR (2026-09-08) ───────────────────────────────────────────
// Första versionen returnerade `null` för allt: dokumentet saknar tabell, raden hittades inte,
// och cellen var tom. Men bara det SISTA betyder «inget antal står tryckt» — de två första
// betyder «jag kunde inte läsa». Att slå ihop dem hade nollat kundens antal på varje faktura
// modulen inte förstår — så tystade kvantitetsvittnet 40 842 kr i morse (KV-10).
//
// Felfamiljen i sin renaste form: ett tillstånd som betyder «okänt» representerat med samma
// värde som ett giltigt svar. Utfallen är därför namngivna, och BARA `tom_cell` får nolla.
export const AVLASNING = Object.freeze({
  AVLAST:        'avlast',          // talet står tryckt i Antal-kolumnen på radens egen rad
  TOM_CELL:      'tom_cell',        // raden hittad, kolumnen finns, cellen är TOM
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
  if (trad.antal == null && trad.celler < 2) {
    return { utfall: AVLASNING.DELRAD, antal: null };
  }
  return trad.antal != null
    ? { utfall: AVLASNING.AVLAST, antal: trad.antal }
    : { utfall: AVLASNING.TOM_CELL, antal: null };
}
