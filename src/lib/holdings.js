import { getCategoryMeta } from './categoryMeta.js';

// src/lib/holdings.js — gruppering av analyser till leverantörskort i Arvo-kontoret.
//
// Nyckeln = (normaliserad leverantör || rå leverantör) + KATEGORI, så att:
//   • samma leverantör i samma kategori slås ihop (senaste analysen vinner) — inga dubbletter,
//   • samma leverantör i OLIKA kategorier hålls isär (t.ex. Telia mobil vs Telia bredband).
//
// Visningsnamnet använder SAMMA precedens som nyckeln (normaliserad först). Det var själva
// dubblett-buggen: nyckeln prioriterade normalized_supplier medan namnet visade supplier —
// omvänd ordning → två kort kunde visa identiskt namn utan att slås ihop. Nu är de låsta ihop.

// Kanoniska varumärken — "Telia Företag" och "Telia Sverige AB" är samma Telia. Slår ihop kända
// varianter; nyckeln bär kategori, så Telia mobil ≠ Telia bredband (ingen över-sammanslagning).
// Konservativ lista över stora varumärken — okända leverantörer rörs ALDRIG (säkrare att inte slå
// ihop än att felaktigt slå ihop två olika bolag).
const SUPPLIER_ALIASES = [
  [/\btelia\b/i,            'Telia'],
  [/\btele\s*2\b/i,         'Tele2'],
  [/\btelenor\b/i,          'Telenor'],
  // "Tre Foretag" (utan ö) stod i innehavet och läste som VÅRT stavfel, fast det var kundens
  // extraherade sträng. I en yta stämplad KONFIDENTIELLT är ett skevt varumärkesnamn en
  // precisionssignal som pekar åt fel håll. Ordgränsen är obligatorisk: 'tre' är ett vanligt
  // svenskt ord och får aldrig fånga "Trelleborg" eller "Centre".
  [/(?:^|\s)tre(?:\s|$)|\btre\s+f[öo]retag\b/i, 'Tre'],
  [/\bmicrosoft\b/i,        'Microsoft'],
  [/\bgoogle\b/i,           'Google'],
  [/\badobe\b/i,            'Adobe'],
  [/\bdustin\b/i,           'Dustin'],
];

export function canonicalSupplier(name) {
  const s = String(name || '').trim();
  if (!s) return 'Okänd leverantör';
  for (const [re, brand] of SUPPLIER_ALIASES) if (re.test(s)) return brand;
  return s;
}

export function supplierName(a) {
  return canonicalSupplier(a.normalized_supplier || a.supplier);
}

// Per-leverantörs score — MÅSTE följa samma tal som besparings-pillen (regel 1: EN sanning per fråga).
// Tidigare läste den suggested_annual_cost medan pillen läser net_saving → de kunde säga emot varandra
// (en låg score 49 bredvid en liten besparing +6 230 / ~13 %). Nu härleds marknadsgapet ur gross_saving
// (samma källa som net_saving som pillen visar) → score och pill kan aldrig motsäga varandra.
export function supplierDiagScore(a) {
  if (a.route === 'monitoring') return 72;
  // ── TALET KOMMER UR SAMMA JÄMFÖRELSE KORTET VISAR (grundarfynd 2026-08-19) ──────────────────
  // Här lästes tidigare det LAGRADE health_score, räknat vid analystillfället mot getBenchmark —
  // prisbokens väg för en besparingsberäkning, som helt riktigt föredrar livedata. Livedatan är
  // TOTALSUMMOR. Scoren behandlade totalen som ett styckpris och multiplicerade den med antalet
  // licenser, så golvet blev 115 gånger för högt och talet fastnade i taket. Grundarens rad visade
  // 92 och RÄTT PRISSATT ovanför sitt eget bevis: "Ni ligger 184 % över det billigaste priset".
  //
  // arvoScore räknas nu i api-lagret ur prisunderlaget (lib/prisunderlag.js) — samma perEnhet och
  // samma golv som kortet skriver ut. Talet och beviset kan inte längre glida isär, och eftersom
  // det räknas vid LÄSNING följer det prisboken när den rör sig i stället för att frysa mot ett
  // golv rummet inte längre visar.
  //
  // health_score läses INTE längre. Kolumnen står kvar som historik, men ett andra tal som får
  // vinna ibland är exakt det som skapade motsägelsen.
  if (a.arvoScore != null && Number.isFinite(Number(a.arvoScore))) {
    const hs = Number(a.arvoScore);
    // Ett rekommenderat byte ska aldrig visa ett högt "allt är bra"-tal — taklägg vid 79.
    return (a.should_switch && (a.net_saving ?? 0) > 0) ? Math.min(hs, 79) : hs;
  }
  const gross = a.gross_saving ?? (a.net_saving != null ? a.net_saving / 0.8 : 0);
  if (!a.should_switch || !a.annual_cost || !(gross > 0)) {
    // ── ETT OMÄTT AVTAL FÅR INTE SE MÄTT UT (grundarfråga 2026-08-16) ────────────────────────
    // Här stod `return a.annual_cost > 0 ? 75 : 50;`. Ringen ritade 75 exakt som ett förtjänat 96,
    // och kunden kunde inte skilja "vi mätte, ni ligger bra" från "vi har inget mått". Värre: 75
    // kolliderar med det giltiga intervallet, så ett RÄKNAT 75 och ett okänt såg identiska ut.
    // Grundarens Google-rad visade 75 medan det räknade talet var 90 — en oförtjänt precision
    // som dessutom underskattade kunden.
    // null betyder "inte satt" och ritas som ett streck. Ett okänt ska se okänt ut.
    return null;
  }
  const ovPct = Math.round((gross / a.annual_cost) * 100);   // marknadsgapet som besparingen representerar
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
}

// Domens "agerande krävs"-avgörande. GRUNDARLÄRDOM 2026-06-30 (live skärmdump): en kostsam
// forensik-upptäckt (t.ex. avbetald hårdvara, 16 800 kr/år) UTAN ett tillgängligt leverantörsbyte
// fick domen att ändå säga "Allt är under kontroll" — rakt motsägande fyndkortet direkt under.
// En kostnad är lika mycket "agerande krävs" som ett byte. Ren funktion = regressionstestbar.
// Sammanvägningen hoppar över omätta rader. Att räkna in dem med ett påhittat 75 hade gjort
// helhetstalet till en blandning av mätning och gissning — och ingen hade kunnat se vilken del
// som var vilken.
export function computeActing({ switchablesCount, roomFinding }) {
  const hasSwitchAction = (switchablesCount ?? 0) > 0;
  const hasFindingAction = !!(roomFinding && (roomFinding.annualImpact ?? 0) > 0);
  return { hasSwitchAction, hasFindingAction, acting: hasSwitchAction || hasFindingAction };
}

// ── RUMMETS RÄKNARE (grundargranskning 2026-08-15) ──────────────────────────────────────────
// Radarn visade "Leverantörer 5 · Prissatta 5 · Under uppsikt 4" och gick inte ihop för någon
// som läste den uppifrån: fem leverantörer, varav fem prissatta, plus fyra till. Två fel i ett:
//   1. "Leverantörer" räknade bara de PRISSATTA (groupBySupplier över auto-analyser) — de fyra
//      bevakade fanns inte i talet, fast de stod på raden under.
//   2. Stacken blandade enheter: "Leverantörer" räknade leverantörer, "Prissatta" räknade
//      ANALYSER. Två Telia-fakturor gav 1 / 2, vilket ser ut som ett fel även när det stämmer.
//
// Enheten är nu FAKTUROR rakt igenom — det kunden själv skickade in och tänker i — och summan
// går alltid ihop: prissatta + bevakade = fakturor. Ren funktion så invarianten kan testlåsas.
export function roomCounts({ autoAnalyses = [], watched = [] } = {}) {
  const prissatta = autoAnalyses.length;
  const bevakade = watched.length;
  return { fakturor: prissatta + bevakade, prissatta, bevakade };
}

export function groupBySupplier(analyses) {
  const groups = new Map();
  for (const a of analyses ?? []) {
    const key = `${supplierName(a).trim().toLowerCase()}|${String(a.category || '').toLowerCase()}`;
    const g = groups.get(key);
    if (!g) groups.set(key, { key, latest: a, count: 1 });
    else {
      g.count += 1;
      if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
    }
  }
  return [...groups.values()].sort((x, y) => (y.latest.net_saving ?? 0) - (x.latest.net_saving ?? 0));
}

// ── ARVO BEDÖMER: domens prosa ─────────────────────────────────────────────────────────────
// Flyttad hit från Portfolio 2026-08-19 så den kan prövas direkt av sviten. Se SK-08.
export function buildReasoning(a) {
  const meta = getCategoryMeta(a.category);
  const label = (meta?.label ?? a.category).toLowerCase();
  if (a.route === 'monitoring')
    return `Avtalet är tidsbegränsat. Arvo bevakar och förbereder bytet inför förnyelsen — ni betalar konkurrenskraftigt till dess.`;
  if (a.route === 'review_queue')
    return `Kategorin kräver manuell granskning — Arvo inhämtar offert för exakt prisjämförelse. Ni kontaktas när det är klart.`;
  if (a.should_switch && (a.net_saving ?? 0) > 0) {
    const ovPct = a.annual_cost > 0 && a.suggested_annual_cost > 0
      ? Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100) : 0;
    // ── "MARKNADSPRIS" ÄR ETT PÅSTÅENDE VI INTE KAN BACKA UPP (grundarfråga 2026-08-19) ──────
    // Här stod "än verifierat marknadspris". Marknadspris betyder i vanligt affärsspråk vad
    // marknaden FAKTISKT betalar — ett mittvärde. Vi jämför mot det billigaste verifierade
    // alternativ vi hittat, alltså ett golv. Att kalla ett golv för marknadspris överdriver
    // överbetalningen, och överdriver den ÅT VÅRT HÅLL: större gap → större påstådd besparing →
    // högre success fee. Rummets egen not tre rader ned säger dessutom raka motsatsen ("inte mot
    // vad andra bolag faktiskt betalar"), så meningen motsade sitt eget kort.
    // Den riktiga kohortjämförelsen kommer när fler bolag delar sina fakturor. Till dess säger vi
    // vad vi verkligen mäter mot.
    if (ovPct >= 10) {
      return `Ni betalar <b>${ovPct}% mer</b> än det billigaste verifierade alternativet för ${label}. Arvo rekommenderar byte — det lägre priset finns förberett nedan.`;
    }
    return `Ni betalar ${ovPct > 0 ? `${ovPct}% mer` : 'något mer'} än det billigaste verifierade alternativet för ${label} — ett litet gap. Ett lägre avtalspris finns att säkra om ni vill, men ingen brådska; avvärjt är ändå avvärjt.`;
  }
  // ── PROSAN MÅSTE FÖLJA BEVISET (grundarfynd 2026-08-19) ───────────────────────────────────
  // Här returnerades "Priset är konkurrenskraftigt mot verifierat marknadspris" för VARJE rad
  // utan bytesrekommendation — även när underlaget rakt under sa "Ni ligger 184 % över det
  // billigaste priset". Tre ytor sa samma osanning: ringen (92), pillen (RÄTT PRISSATT) och den
  // här meningen. Alla tre läste "finns ingen besparing att erbjuda" och översatte det till
  // "priset är bra". Det är inte samma sak: frånvaron av ett verifierat alternativ säger
  // ingenting om huruvida kunden betalar rätt.
  //
  // Nu skiljs de två fallen åt, och ordet "konkurrenskraftigt" reserveras för rader som faktiskt
  // ligger på eller under det verifierade golvet. Ligger de över säger vi det — och varför vi
  // ändå inte pekar på ett byte, vilket är ett ärligare och vassare besked än beröm.
  const u = a.prisunderlag;
  if (u && !u.underGolv && u.avstandPct > 15) {
    return `Ni betalar <b>${u.avstandPct}% mer</b> än det billigaste publicerade priset för ${label}`
      + `${u.referensProdukt ? ` (${u.referensProdukt})` : ''}. Arvo har inget verifierat bytesmål `
      + `att lägga fram för just den här raden i dag — men priset är inte konkurrenskraftigt, och `
      + `underlaget nedan visar exakt vad jämförelsen bygger på.`;
  }
  if (u) {
    return `Priset ligger på eller under det billigaste publicerade priset för ${label}`
      + `${u.referensProdukt ? ` (${u.referensProdukt})` : ''}. Inget byte rekommenderas i dag — `
      + `dela en ny faktura vid nästa avtalsperiod så kontrollerar Arvo igen.`;
  }
  // Utan underlag har vi ingen verifierad jämförelse — då påstår vi ingenting om prisläget.
  return `Fakturan är mottagen och klassad som ${label}. Arvo har inget verifierat publikt pris `
    + `att jämföra den mot i dag, så vi gör inget påstående om prisläget — raden står under `
    + `bevakning och kontrolleras när underlaget bär.`;
}
