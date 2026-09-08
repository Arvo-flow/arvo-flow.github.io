// lib/kvantitetsvittne.js — STÅR ANTALET PÅ PAPPRET, ELLER RÄKNADE MODELLEN FRAM DET?
//
// ══ VARFÖR (2026-09-08, ur grundarens Microsoft-faktura) ═══════════════════════════════════
//
// Fakturans Antal-kolumn var TOM på Premium-raden. Det står i PDF:ens råa textoperatorer, utan
// tolkning på vägen:
//
//     MS-PREM      Microsoft 365 Business Premium                   210.29    2 102.90
//     MS-E3        Office 365 E3                            12      380.00    4 560.00
//                                                           ↑ enda tryckta antalet
//
// Maskinen lagrade `antal=10` på Premium-raden. Talet är 2 102,90 ÷ 210,29 — modellen UTFÖRDE
// FINANSIELL ARITMETIK, vilket regel 2 förbjuder. Och det farliga är inte att talet råkade bli
// rätt; det är att det inte GÅR ATT SKILJA från ett avläst.
//
// ── VARFÖR BALANSKRAVET ALDRIG KAN FÅNGA DET ──────────────────────────────────────────────
// B2 prövar `antal × à-pris = radbelopp`. En HÄRLEDD kvantitet är aritmetiskt självkonsistent
// PER KONSTRUKTION — den härleddes ur just den ekvationen. Grinden är alltså strukturellt blind
// för exakt den här klassen, inte otillräckligt inställd. Ingen tolerans i världen ändrar det.
//
// ── VARFÖR DET ÄR ETT PENGAFEL, INTE ETT UI-FEL ───────────────────────────────────────────
// Mätt genom produktionskedjan (`computeLikeForLikeSaasTarget`):
//
//   quantity = null (ärligt)  → LFL returnerar null → fail-closed → inget byte, ingen avgift (KV-06)
//   quantity = 10 (härlett)   → grinden ÖPPNAS, suggestedAnnualCost byggs, avgiften räknas
//   om sanningen vore 8       → 5 047 kr «besparing» → 1 009 kr i vår success fee
//
// Grinden `if (qty == null) return null` ÄR korrekt fail-closed (KV-06). Den besegras av att modellen
// FYLLER fältet. Typen säger `number`; den säger ingenting om proveniens. Det är en ogiltig
// state som är representerbar — och den låser upp det tal vi fakturerar på.
//
// ── ANDRA VITTNET FINNS REDAN I REQUEST-VÄGEN ─────────────────────────────────────────────
// `lib/pdf-textlager.js` (pdfjs, inga modellanrop, ~15 ms) är samma oberoende väg fram till
// pappret som fakturanummergrinden använder sedan 15 augusti (FN-01..13). Mätt över de 75
// verkliga fakturorna i `test-pdfs/`: **74 av 75 (99 %) har läsbart textlager.** Axeln bär.
//
// ── VAD MODULEN GÖR, OCH VAD DEN ALDRIG GÖR ───────────────────────────────────────────────
// Den KLASSAR en kvantitet. Den KORRIGERAR aldrig en, härleder aldrig en, och skriver aldrig
// om en rad. Bara ett omdöme om huruvida talet får bära ett PÅSTÅENDE OM PENGAR.
//
// FAIL-CLOSED PÅ PÅSTÅENDET, FAIL-OPEN PÅ PIPELINEN (KV-06, KV-07) — etablerad asymmetri. En
// faktura går aldrig förlorad för att antalet inte kunde bevisas; den tappar bara sin rätt att
// generera ett bytesmål och en avgift. Värsta utfallet är tystnad, aldrig ett falskt anspråk.
//
// FÅNGAR: ett antal som modellen räknat fram ur radens egna tal i stället för att läsa det, och
//   ett antal som varken står på raden eller går att förklara.
// BLIND, uttalat och i tre delar:
//   1. Textlagret bevisar att SIFFRAN står på raden, aldrig att den står i ANTAL-kolumnen. En
//      faktura där ett artikelnummer eller ett datum råkar bära samma siffra som den påstådda
//      kvantiteten vittnar falskt. Det är samma blindfläck fakturanummergrinden deklarerar
//      («textlagret bevisar att numret står på pappret, inte att det är rätt FÄLT»), och den
//      är accepterad av samma skäl: ett falskt vittne kräver en sammanträffande siffra PÅ SAMMA
//      RAD, medan en fabrikation utan vittne fångas alltid.
//   2. Utan textlager (bild-PDF, 1 av 75 mätta) kan ingenting vittnas. Modulen svarar
//      `ovittnesbar` — ett EGET tillstånd, aldrig `avlast` och aldrig `harledd`.
//   3. Den ser en RAD, inte ett dokument. En faktura som trycker antalet i en summeringsruta
//      längre ned vittnas inte. Det är med flit: ett tal någon annanstans på pappret bevisar
//      inte den här radens antal, och att vidga fönstret till hela dokumentet hade gjort vakten
//      grön av tomhet — nästan varje litet heltal står någonstans på en faktura.

/** Proveniensen ett antal kan ha. Bara `avlast` får bära ett påstående om pengar. */
export const PROVENIENS = Object.freeze({
  AVLAST:      'avlast',       // siffran står på radens egen rad i dokumentets textlager
  HARLEDD:     'harledd',      // står inte på raden, och är belopp ÷ à-pris (KV-01, KV-04)
  OVITTNAD:    'ovittnad',     // står inte på raden, och går inte att förklara
  SAKNAS:      'saknas',       // ingen kvantitet påstods
  OVITTNESBAR: 'ovittnesbar',  // inget textlager — vi KAN inte veta, och säger det
});

/** Bara ett avläst antal får driva bytesmål, besparing och success fee. */
export function farBaraPengar(proveniens) {
  return proveniens === PROVENIENS.AVLAST;
}

/** Siffertokens på en rad, normaliserade (tusenavskiljare och decimaler bort). */
function heltalPa(rad) {
  const ut = new Set();
  // ⚠️ FÖRSTA VERSIONEN VAR GIRIG OCH SVALDE HELA RADEN (fångat av grundsanningsfallet innan
  // den nådde någon). Mönstret matchade «12      380.00    4 560.00» som ETT token, som sedan
  // kastades av decimalkontrollen — så det AVLÄSTA antalet 12 klassades `harledd`. En vakt som
  // hade fällt nästan varje faktura, alltså en vakt som blir avstängd inom en vecka.
  // Nu: ett tal är en siffergrupp med valfri tusengruppering (EN separator + exakt tre siffror)
  // och valfri decimaldel. Kolumnavstånd på två eller fler blanksteg bryter aldrig ett tal.
  for (const m of String(rad).matchAll(/\d+(?:[ \u00a0]\d{3})*(?:[.,]\d+)?/g)) {
    const rått = m[0].trim();
    // Ett heltal utan decimaldel: «12» ja, «12,5» nej, «2 102,90» nej. Kvantiteter är heltal
    // (obduktionen 20 aug: «en licensmängd är ett heltal, bråkdel är ett extraktionsfel»), så
    // ett decimaltal får aldrig vittna om ett antal.
    if (/[.,]\d/.test(rått)) continue;
    const rent = rått.replace(/[\s .,]/g, '');
    if (rent) ut.add(String(Number(rent)));
  }
  return ut;
}

/** Hittar de dokumentrader som bär radposten — via dess BELOPP, det mest särskiljande talet. */
function radensRader(rader, { amount, description }) {
  const träffar = [];
  const belopp = Number(amount);
  const beloppFormer = Number.isFinite(belopp) && belopp !== 0
    ? [String(Math.round(Math.abs(belopp))), Math.abs(belopp).toFixed(2)]
    : [];
  // Ett distinkt ord ur beskrivningen som reserv när beloppet inte står i klartext.
  const ord = String(description ?? '').split(/\s+/).filter((o) => o.length >= 5).slice(0, 3);

  for (let i = 0; i < rader.length; i++) {
    const r = rader[i];
    const utanBlank = r.replace(/[\s ]/g, '');
    const bärBelopp = beloppFormer.some((f) => utanBlank.includes(f.replace(/[\s ]/g, '')));
    const bärOrd = ord.length > 0 && ord.some((o) => r.toLowerCase().includes(o.toLowerCase()));
    if (bärBelopp || bärOrd) träffar.push(i);
  }
  return träffar;
}

/**
 * Klassar EN radposts kvantitet mot dokumentets textlager.
 *
 * @param {object} p
 * @param {number|null} p.quantity     modellens påstådda antal
 * @param {number|null} p.unitPrice    radens à-pris (kronor)
 * @param {number|null} p.amount       radens belopp (kronor)
 * @param {string} p.description       radbeskrivningen
 * @param {string|null} p.dokumenttext PDF:ens textlager, rått
 * @returns {{ proveniens: string, farPengar: boolean, skal: string }}
 */
export function klassaKvantitet({ quantity, unitPrice, amount, description, dokumenttext } = {}) {
  const q = Number(quantity);
  if (quantity == null || !Number.isFinite(q) || q <= 0) {
    return { proveniens: PROVENIENS.SAKNAS, farPengar: false, skal: 'inget antal påstods' };
  }

  const text = typeof dokumenttext === 'string' ? dokumenttext : '';
  if (!text.trim()) {
    return {
      proveniens: PROVENIENS.OVITTNESBAR, farPengar: false,
      skal: 'inget textlager — antalet kan varken bekräftas eller motbevisas',
    };
  }

  const rader = text.split(/\r?\n/);
  const kandidater = radensRader(rader, { amount, description });
  // ±1 rad: fakturor bryter regelbundet en radpost över två visuella rader. Fönstret är
  // AVSIKTLIGT smalt — hela dokumentet hade gjort vakten grön av tomhet.
  const fönster = new Set();
  for (const i of kandidater) for (const j of [i - 1, i, i + 1]) if (rader[j] != null) fönster.add(j);

  for (const j of fönster) {
    if (heltalPa(rader[j]).has(String(q))) {
      return { proveniens: PROVENIENS.AVLAST, farPengar: true, skal: 'antalet står på radens egen rad' };
    }
  }

  // Inte på raden. Är talet exakt kvoten? Då räknade modellen fram det ur radens andra två tal,
  // och kvantiteten bär noll oberoende information — den är en omskrivning, inte en avläsning.
  const à = Number(unitPrice);
  const b = Number(amount);
  if (Number.isFinite(à) && à > 0 && Number.isFinite(b) && b !== 0) {
    const kvot = Math.abs(b) / à;
    // Toleransen är kronorfältens avrundning, inte en procentsats: à-priset kan vara avrundat
    // till hela kronor, och då vandrar kvoten. En halv enhet räcker och är det snävaste som
    // inte falsklarmar på ett avrundat à-pris.
    if (Math.abs(kvot - q) <= 0.5) {
      return {
        proveniens: PROVENIENS.HARLEDD, farPengar: false,
        skal: `antalet står inte på raden och är exakt belopp ÷ à-pris (${b} ÷ ${à} ≈ ${kvot.toFixed(2)})`,
      };
    }
  }

  return {
    proveniens: PROVENIENS.OVITTNAD, farPengar: false,
    skal: 'antalet står inte på raden och går inte att förklara ur radens egna tal',
  };
}

/**
 * Klassar alla radposter i en extraktion och skriver proveniensen PÅ raderna.
 * Muterar aldrig kvantiteten — bara märkningen. Returnerar en räkning för loggen.
 */
export function markKvantiteter(lineItems, dokumenttext) {
  const räkning = { avlast: 0, harledd: 0, ovittnad: 0, saknas: 0, ovittnesbar: 0 };
  for (const l of lineItems ?? []) {
    const dom = klassaKvantitet({
      quantity: l?.quantity, unitPrice: l?.unitPrice, amount: l?.amount,
      description: l?.description, dokumenttext,
    });
    l.kvantitetProveniens = dom.proveniens;
    l.kvantitetSkal = dom.skal;
    räkning[dom.proveniens] = (räkning[dom.proveniens] ?? 0) + 1;
  }
  return räkning;
}
