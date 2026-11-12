// lib/lagesregister.js — LÄGESREGISTRET: EN källa för vilket läge rummet, raden och fakturan står i.
//
// ══ VARFÖR (grundarorder 2026-09-23, systemöversynen) ══════════════════════════════════════
// Rummet, fakturavyn och mejlen räknade var för sig fram sina lägen — radpoäng, rummets poäng,
// marknadsläge, domens läge, fakturans diagnos — och varje yta gissade när underlaget saknades.
// Mätt genom körning i översynen:
//   · rummet: «er position kunde inte mätas» ovanför «Vi jämförde 0 fakturor … ni behöver inte göra
//     något» (domtexten frågade aldrig om läget var omätt);
//   · raden: 1–15 % över billigaste pris gav «Priset ligger på eller under det billigaste» + «Rätt
//     prissatt»; ett bevakat avtal utan jämförelse gav «ni betalar konkurrenskraftigt»;
//   · fakturavyn: en omätt poäng (null) blev 0 och fick etiketten «Kritisk» — som även skickades i
//     aktiveringsmejlet («Kritisk 0 /100»).
// Samma form varje gång: ett trevärt tillstånd läst av en tvåvägsgren, i en yta som räknat själv.
//
// ══ ANSVARSFÖRDELNINGEN ════════════════════════════════════════════════════════════════════
// Registret äger LÄGET och TALEN (kod, poäng, räknare, parametrar) och körs i api-lagret. Ytorna äger
// ORDALYDELSEN och slår upp den per kod (src/lib/rumstext.js), och ett test kräver att varje kod
// har en text (LR-02). Ingen yta väljer längre läge ur rådata. Texten stannar i ytan av ett mätt skäl:
// frontend och backend har olika kategorinamn i 20 av 21 kategorier — att flytta ordalydelsen hade
// bytt ord i kundens rum utan att någon bett om det.
//
// Funktionerna flyttades hit från src/lib/holdings.js, src/lib/domslut.js och src/lib/diagnos.js
// (kopiorna där är raderade — regel 1). `lib/` kan inte importera ur `src/` (modulformatet är inte
// deklarerat där, mätt i RS-09); därför bor sanningen här och ytan får den färdig över API:t.
//
// FÅNGAR: ett läge som saknar text i en yta · en omätt poäng som får etikett · ett positivt
//   prispåstående i ett läge som deklarerat motsatsen · rummets poäng räknad på omätta rader.
// BLIND: registret vet inte vad ytan SKRIVER för ett läge — bara att den har en text. Att texten är
//   sann prövas av DOM-kontrollerna i renderingssonderna och av DL-/RR-vakterna.

// ── Leverantörsidentitet ─────────────────────────────────────────────────────────────────────
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const SUPPLIER_ALIASES = [
  [/\btelia\b/i,            'Telia'],
  [/\btele\s*2\b/i,         'Tele2'],
  [/\btelenor\b/i,          'Telenor'],
  // Ordgränsen är obligatorisk: 'tre' är ett vanligt svenskt ord och får aldrig fånga "Trelleborg".
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
  return canonicalSupplier(a?.normalized_supplier || a?.supplier);
}

/** Senaste analysen per leverantör+kategori, sorterat efter besparing. */
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

// ── Raden ────────────────────────────────────────────────────────────────────────────────────
/**
 * Radens lägen. `positivtPrispastaende` = får ytan säga något gott om kundens PRIS i läget?
 * `nara_golvet` är nytt (2026-09-23): 1–15 % över billigaste pris hamnade förut i «på eller under».
 */
export const RADLAGEN = {
  // `positivtPastaende` är påståendekontraktets fält (src/lib/pastaendekontrakt.js, PK); `omatt` märker
  // de lägen där radens position mot listpris inte är mätt — de får aldrig säga något gott om priset.
  granskning:             { positivtPastaende: false, positivtPrispastaende: false, omatt: true },
  byte:                   { positivtPastaende: false, positivtPrispastaende: false },
  bevakat_avtal:          { positivtPastaende: false, positivtPrispastaende: false, omatt: true },
  oviss_niva:             { positivtPastaende: false, positivtPrispastaende: false, omatt: true },
  over_golvet:            { positivtPastaende: false, positivtPrispastaende: false },
  nara_golvet:            { positivtPastaende: false, positivtPrispastaende: false },
  pa_eller_under_golvet:  { positivtPastaende: true,  positivtPrispastaende: true },
  omatt:                  { positivtPastaende: false, positivtPrispastaende: false, omatt: true },
};

/** Gränsen mellan «nära» och «över» golvet, i procent. Samma tal som raden förut märkte «över» vid. */
export const OVER_GOLVET_PCT = 15;

/**
 * Radens poäng — null när inget är mätt (ett okänt ska se okänt ut, aldrig 75). Flyttad från
 * src/lib/holdings.js `supplierDiagScore`; se historiken där i git (72-/75-konstanterna).
 */
export function radScore(a) {
  // En rad vars byte rummet har hållit inne har ingen poäng: inhållningen nollar bytet, och prisunderlaget har
  // ingen poäng utan bekräftad nivå. En egen spärr här fällde noll tester (sabotaget S4, 11 nov); den var ett
  // skydd bakom ett skydd och är borttagen. MS-08 och RM-R1 prövar utfallet.
  if (a?.arvoScore != null && Number.isFinite(Number(a.arvoScore))) {
    const hs = Number(a.arvoScore);
    // Ett rekommenderat byte ska aldrig visa ett högt "allt är bra"-tal — taklägg vid 79.
    return (a.should_switch && (a.net_saving ?? 0) > 0) ? Math.min(hs, 79) : hs;
  }
  const gross = a?.gross_saving ?? (a?.net_saving != null ? a.net_saving / 0.8 : 0);
  if (!a?.should_switch || !a?.annual_cost || !(gross > 0)) return null;
  const ovPct = Math.round((gross / a.annual_cost) * 100);
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
}

/**
 * En rad i en kategori där bytesmålet vore kategorins golv (`bytesmalMotKategorigolv`, i dag mobil) har ingen
 * dom förrän kundens produkt är bekräftad, och ingen kod läser i dag ett abonnemang ur fakturan
 * (grundarbeslut 2026-10-22 och 2026-11-04). Raden märks `utanDom`, så att rummet inte sätter en samlad
 * poäng och inte berömmer (RM-R3), och radtexten inte påstår att ett verifierat pris saknas (RM-R6).
 *
 * Ett lagrat byte på en sådan rad visas inte. Fakturavägen räknade förut mobilens bytesmål mot det billigaste
 * abonnemanget, så 349-planen till exakt listpris lagrades med «byte till 269» och 9 600 kr (C1-1). Sedan
 * 11 nov räknar fakturavägen inget byte alls på en sådan faktura, inte heller på en bredbandsdel (FV-A1,
 * FV-A2), så varje lagrat byte här är räknat före grinden och hålls inne helt (MS-08, RM-R1). En rad med
 * bekräftad nivå står kvar (D1-1); en M365-rad med två nivåer räknas nivå för nivå och berörs inte.
 */
export function undanhallBytePaOvissNiva(a, { bytesmalMotKategorigolv = false } = {}) {
  if (bytesmalMotKategorigolv !== true) return a;
  if (a?.prisunderlag != null && a.prisunderlag.ovissNiva !== true) return a;
  a.utanDom = true;
  if (a?.should_switch === true) a.bytetUndanhallet = { del: 'hela' };
  // Beloppen rensas också utan bytesflagga. Minimigränsen nollar flaggan men inte beloppet (ett abonnemang
  // à 299 kr lagrades med `net_saving 288`), och rummets «möjlig nettobesparing» summerar varje rads
  // `net_saving` (K-1, RM-R7).
  a.should_switch = false;
  a.suggested_annual_cost = null;
  a.gross_saving = null;
  a.net_saving = null;
  return a;
}

/**
 * Ett lagrat byte så som en yta får visa det när den läser raden utan rummets berikning: avtalspåminnelsen,
 * utfallsenkäten och briefingen (api/cron/send-reminders.mjs, lib/briefing-generator.js). Samma inhållning
 * som rummet, som rensar varje belopp på en rad utan dom, också ett nettobelopp utan `should_switch`:
 * enkäten och påminnelsen skrev förut ut varje positivt `net_saving` («Vi beräknade en nettobesparing på
 * 7 680 kr/år»), och briefingen sa «Räknat mot verifierat publikt listpris» om ett lagrat mobilbyte som
 * rummet höll inne (LB-01..03).
 *
 * Raden här har inget prisunderlag, så en planvalskategori hålls alltid. Rummet släpper bara en rad med
 * bekräftad nivå, och en sådan finns inte i en planvalskategori så länge kategorin saknar
 * `licenseTierBenchmarks` (nivågolvet är då null, se lib/prisunderlag.js). LB-04 låser det.
 */
export function lagratByte(row) {
  return undanhallBytePaOvissNiva({ ...row }, {
    bytesmalMotKategorigolv: BRANCHINDEX[row?.category]?.bytesmalMotKategorigolv === true,
  });
}

/** Radens läge: kod + poäng + de tal ytan får skriva ut. Ytan väljer aldrig läge själv. */
export function radLage(a) {
  const u = a?.prisunderlag ?? null;
  const byte = a?.should_switch === true && (a?.net_saving ?? 0) > 0;
  let kod;
  if (a?.route === 'review_queue') kod = 'granskning';
  else if (byte) kod = 'byte';
  else if (a?.route === 'monitoring') kod = 'bevakat_avtal';
  else if (u && u.ovissNiva === true) kod = 'oviss_niva';
  else if (u && !u.underGolv && u.avstandPct > OVER_GOLVET_PCT) kod = 'over_golvet';
  else if (u && !u.underGolv && u.avstandPct >= 1) kod = 'nara_golvet';
  else if (u) kod = 'pa_eller_under_golvet';
  else kod = 'omatt';
  // Inget procenttal på en rad med obekräftad nivå, inte heller med ett byte: talet hade mätt mot det
  // billigaste i kategorin, alltså planvalet (MS-11).
  const ovPct = byte && !(u && u.ovissNiva === true) && a.annual_cost > 0 && a.suggested_annual_cost > 0
    ? Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100) : null;
  return {
    kod,
    // Visningsnamnet ur samma kanoniserare som grupperingen — listan och poängen kan inte oense om vem raden gäller.
    namn: supplierName(a),
    score: radScore(a),
    positivtPrispastaende: RADLAGEN[kod].positivtPrispastaende,
    params: {
      ovPct,
      avstandPct: u?.avstandPct ?? null,
      perEnhet: u?.perEnhet ?? null,
      golv: u?.golv ?? null,
      unitLabel: u?.unitLabel ?? null,
      referensProdukt: u?.referensProdukt ?? null,
      netSaving: byte ? a.net_saving : null,
      // Raden saknar dom av planvalsskäl, inte för att ett verifierat pris saknas (RM-R6).
      planval: a?.utanDom === true,
    },
  };
}

// ── Rummet ───────────────────────────────────────────────────────────────────────────────────
/** Veckodomens lägen (flyttade från src/lib/domslut.js). */
export const DOMLAGEN = {
  lugn_battre:      { positivtPastaende: true,  positivtPrispastaende: true,  kravNiva: 'battre' },
  lugn_i_niva:      { positivtPastaende: false, positivtPrispastaende: false, kravNiva: 'i-niva' },
  lugn_over_golvet: { positivtPastaende: false, positivtPrispastaende: false, kravNiva: 'samre'  },
  lugn_omatt:       { positivtPastaende: false, positivtPrispastaende: false, kravNiva: null, omatt: true },
  byte_battre:      { positivtPastaende: true,  positivtPrispastaende: true,  kravNiva: 'battre' },
  byte_i_niva:      { positivtPastaende: false, positivtPrispastaende: false, kravNiva: 'i-niva' },
  byte_samre:       { positivtPastaende: false, positivtPrispastaende: false, kravNiva: 'samre'  },
  byte_omatt:       { positivtPastaende: false, positivtPrispastaende: false, kravNiva: null, omatt: true },
  fynd:             { positivtPastaende: false, positivtPrispastaende: false, kravNiva: null     },
};

export function domensLage({ acting, hasSwitchAction, standing } = {}) {
  const satt = standing?.satt === true;
  const niva = satt ? standing.niva : null;
  if (!acting) {
    if (!satt) return 'lugn_omatt';
    return niva === 'battre' ? 'lugn_battre' : niva === 'i-niva' ? 'lugn_i_niva' : 'lugn_over_golvet';
  }
  if (!hasSwitchAction) return 'fynd';
  if (!satt) return 'byte_omatt';
  return niva === 'battre' ? 'byte_battre' : niva === 'i-niva' ? 'byte_i_niva' : 'byte_samre';
}

export function beromsLage(lage) { return DOMLAGEN[lage]?.positivtPrispastaende === true; }
export function omattLage(lage) { return DOMLAGEN[lage]?.omatt === true; }

/** Kostnadsviktat snitt över MÄTTA rader; null när ingen rad är mätt. */
export function rumScore(grupper) {
  const matta = grupper.filter((g) => radScore(g.latest) != null);
  if (!matta.length) return null;
  let w = 0, s = 0;
  for (const g of matta) {
    const weight = g.latest.annual_cost > 0 ? g.latest.annual_cost : 0;
    w += weight; s += radScore(g.latest) * weight;
  }
  if (w === 0) return Math.round(matta.reduce((acc, g) => acc + radScore(g.latest), 0) / matta.length);
  return Math.round(s / w);
}

/** Marknadsläget mot verifierat listpris. Utan poäng finns ingen position (satt: false). */
export function marknadslage(score) {
  if (score == null) return { pointer: null, label: null, niva: null, satt: false };
  const pointer = Math.max(4, Math.min(96, score));
  const niva = score >= 67 ? 'battre' : score >= 45 ? 'i-niva' : 'samre';
  const label = niva === 'battre' ? 'Bättre än listpris'
    : niva === 'i-niva' ? 'I nivå med listpris' : 'Sämre än listpris';
  return { pointer, label, niva, satt: true };
}

/**
 * Är raden prissatt mot verifierat publikt listpris? Ja när den har ett underlag med en jämförelse rummet
 * står för, eller ett byte vars mål är ett verifierat publikt listpris (`bytesmalVerifierat`, satt vid
 * läsning ur prisbokens källa). Rummet säger «Vägde N fakturor mot verifierat publikt listpris» om talet.
 * En rad med obekräftad nivå och utan byte är mottagen (MS-07). IT-8821 och ett bredbandsbyte är prissatta
 * (E1-1, MS-10, MS-11). Ett elbyte är det inte: det räknas mot Arvos eget säsongsindex (F1-1, MS-12).
 */
export function arPrissatt(a) {
  const u = a?.prisunderlag;
  if (u != null && u.ovissNiva !== true) return true;
  return a?.should_switch === true && (a?.net_saving ?? 0) > 0 && a?.bytesmalVerifierat === true;
}

/** Rummets EN räknare, i EN enhet (fakturor). Flyttad från src/lib/holdings.js. */
export function roomCounts({ autoAnalyses = [], watched = [] } = {}) {
  const analyserade = autoAnalyses.length;
  const bevakade = watched.length;
  const prissatta = autoAnalyses.filter(arPrissatt).length;
  const mottagna = analyserade - prissatta;
  return { fakturor: analyserade + bevakade, analyserade, prissatta, mottagna, bevakade };
}

export function computeActing({ switchablesCount, roomFinding }) {
  const hasSwitchAction = (switchablesCount ?? 0) > 0;
  const hasFindingAction = !!(roomFinding
    && ((roomFinding.annualImpact ?? 0) > 0 || (Number(roomFinding.monthly) || 0) > 0));
  return { hasSwitchAction, hasFindingAction, acting: hasSwitchAction || hasFindingAction };
}

/** Starkaste fyndet i rummet: allvar först, sedan årsbelopp. */
export function rumFynd(analyses) {
  const rank = { high: 0, medium: 1, low: 2 };
  return (analyses ?? [])
    .map((a) => a.lead_finding_json)
    .filter((f) => f && typeof f === 'object' && f.title)
    .sort((x, y) => (rank[x.severity] - rank[y.severity]) || ((y.annualImpact || 0) - (x.annualImpact || 0)))[0] ?? null;
}

/**
 * RUMMETS LÄGE — det enda stället rummets tillstånd räknas. API:t skickar det färdigt.
 * @param {{ analyses: object[], watched: object[], rattstorlekKort?: (a) => object|null }} p
 */
export function rumLage({ analyses = [], watched = [], rattstorlekKort = null } = {}) {
  const autoAnalyses = analyses.filter((a) => a.route === 'auto' || a.route === 'monitoring');
  const grupper = groupBySupplier(autoAnalyses);
  const switchables = grupper.filter((g) => g.latest.should_switch && (g.latest.net_saving ?? 0) > 0);
  const fynd = rumFynd(autoAnalyses);
  const acting = computeActing({ switchablesCount: switchables.length, roomFinding: fynd });
  // INGEN SAMLAD POÄNG ÖVER EN DEL AV BOKEN (andra blicken på c1, C1-2). En rad med obekräftad nivå och
  // utan byte har ingen dom, och utan den här regeln vägde rummet bara de övriga. 100 mobilabonnemang och
  // en lönerad 19 % över golvet blev «Allt är under kontroll · Era priser står sig», fast 99 % av
  // kostnaden var omätt. Står en sådan rad i rummet sätts ingen samlad poäng och ingen position, och
  // domen blir det omätta läget (MS-09). `ovissa` är raderna med obekräftad nivå och utan poäng, också en
  // mobilrad vars bredbandsdel står kvar (F1-2); ytan säger då «vi kan inte bedöma allt ni betalar».
  // En rad utan dom stoppar den samlade poängen: obekräftad nivå, ett inhållet byte, eller en rad i en
  // planvalskategori också utan underlag (RM-R3; en mobilrad utan avläst antal bredvid en M365-rad gav
  // förut rummet poäng 88 och «Era priser står sig»).
  const ovissa = grupper.some((g) => (g.latest?.prisunderlag?.ovissNiva === true || g.latest?.bytetUndanhallet
    || g.latest?.utanDom === true) && radScore(g.latest) == null);
  const score = ovissa ? null : rumScore(grupper);
  const standing = marknadslage(score);
  const lage = domensLage({ ...acting, standing });
  const kort = rattstorlekKort
    ? grupper.map((g) => rattstorlekKort(g.latest?.rattstorlek_json)).filter(Boolean)
      .sort((x, y) => (y.annualImpact || 0) - (x.annualImpact || 0)).slice(0, 3)
    : [];
  return {
    lage,
    ovissa,
    omatt: omattLage(lage),
    berom: beromsLage(lage),
    score,
    standing,
    counts: roomCounts({ autoAnalyses, watched }),
    ...acting,
    fynd,
    totalSaving: grupper.reduce((s, g) => s + (g.latest.net_saving ?? 0), 0),
    switchables: switchables.length,
    // Leverantörsgrupperna i den ordning rummet listar dem — ytan grupperar aldrig om själv.
    grupper: grupper.map((g) => ({ key: g.key, latestId: g.latest.id, count: g.count })),
    rattstorlekKort: kort,
    nivaer: kort.length,
  };
}

// ── Fakturan ─────────────────────────────────────────────────────────────────────────────────
/** Fakturans diagnoslägen (flyttade från src/lib/diagnos.js). */
export const DIAGNOSLAGEN = {
  matt:  { positivtPastaende: true },
  omatt: { positivtPastaende: false, omatt: true },
};

/**
 * Etiketten för en MÄTT poäng. En omätt poäng har ingen etikett — aldrig «Kritisk» för null.
 * «Optimalt» kräver att kunden inte betalar över jämförelsepriset (DG-02, 2026-09-24): poängen tak­sätts
 * till 85 utan byte, så en kund 11–13 % över verifierat listpris fick förut «Optimalt».
 */
export function diagnosEtikett(score, { overMarketPct = 0 } = {}) {
  if (score == null || !Number.isFinite(Number(score))) return null;
  const etikett = score < 45 ? 'Kritisk' : score < 65 ? 'Suboptimerat' : score < 80 ? 'Förbättringsläge' : 'Optimalt';
  return etikett === 'Optimalt' && Number(overMarketPct) > 0 ? 'Förbättringsläge' : etikett;
}

export function diagnos({ annual, suggested, clickPriceScore, shouldSwitch, netSaving } = {}) {
  const a = Number(annual) || 0;
  const s = Number(suggested) || 0;
  // Klickanalysen (skrivarleasing) bär sitt EGET mätta score ur radernas klickpriser.
  if (clickPriceScore != null && Number.isFinite(Number(clickPriceScore))) {
    return { matt: true, grund: 'klickpris', score: Number(clickPriceScore), ovPct: 0, overMarketPct: 0, skal: null };
  }
  if (!(a > 0) || !(s > 0) || !(s < a)) {
    return {
      matt: false, grund: null, score: null, ovPct: 0, overMarketPct: 0,
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
    : (Number(netSaving) || 0) > 0 ? Math.min(raw, 79) : raw;
  // `grund` säger vad poängen mättes MOT — ytan får bara nämna den jämförelse som gjordes (DG-01).
  return { matt: true, grund: 'listpris', score, ovPct, overMarketPct, skal: null };
}

export function diagnosLage(p) { return diagnos(p).matt ? 'matt' : 'omatt'; }

/**
 * FAKTURANS LÄGE ur API-svarets egna fält — samma val ytan gjorde (hårdvarujusterad kostnad när den
 * finns), nu gjort en gång. `rattstorlekFalt` är registret för rätt-storlekskort (RS-09-spegeln).
 */
/**
 * Beskedet när fakturan ligger i en planvalskategori (`bytesmalMotKategorigolv`, i dag mobil). Rubriken
 * «Inget byte att rekommendera · vi hittar inget publikt pris att byta ned till» stod ovanför meningen «Vi
 * jämför inte … mot det billigaste publicerade abonnemanget», och analysmejlet sa «Vi har inget verifierat
 * jämförelsepris». Båda var falska: priset finns, produkten är okänd. Fakturavyn speglar texten i
 * src/lib/diagnos.js (ANALYSRUBRIKER.planval, låst lika i FV-A9); mejlen läser den här.
 */
export const PLANVAL_BESKED = Object.freeze({
  rubrik: 'Ingen jämförelse mot listpris.',
  // Meningen gäller produkterna, inte sidan: samma faktura kan bära ett fynd i kronor ur kundens egna rader
  // (en slutbetald delbetalning), och «Därför räknar vi ingen besparing» stod förut direkt under det (K-2, FV-A12).
  text: 'Produkterna i kategorin har olika listpris, och vi vet inte vilken produkt ni har. Därför säger vi inget om '
    + 'ert pris för dem och räknar ingen besparing på dem.',
  // Skälet i lägets `skal`, som diagnosMening (src/lib/diagnos.js) sätter in i aktiveringsmejlet. Där stod
  // «inget verifierat jämförelsepris kunde räknas fram» för varje mobilfaktura (FV-A11).
  skal: 'vi vet inte vilken produkt ni har, och produkterna i kategorin har olika listpris',
});

export function fakturaLage(svar, { rattstorlekFalt = [] } = {}) {
  const hw = svar?.hardwareAdjustment ?? null;
  const rek = svar?.recommendation ?? {};
  const d = diagnos({
    annual: hw ? hw.adjAnnualCost : (svar?.extracted?.annualCost ?? 0),
    suggested: rek.suggestedAnnualCost ?? 0,
    clickPriceScore: rek.clickRateAnalysis?.priceGapScore ?? null,
    shouldSwitch: rek.shouldSwitch,
    netSaving: rek.netSaving,
  });
  const nivasankning = rattstorlekFalt.some((f) => Boolean(rek?.[f]));
  const planval = BRANCHINDEX[svar?.categorized?.category]?.bytesmalMotKategorigolv === true && rek.shouldSwitch !== true;
  const rubrik = svar?.categorized?.category === 'uncategorized' ? 'kategori_omatt'
    : planval ? 'planval'
    : nivasankning ? 'inget_byte_med_nivasankning' : 'inget_byte';
  return {
    ...d,
    ...(planval && !d.matt ? { skal: PLANVAL_BESKED.skal } : {}),
    etikett: d.matt ? diagnosEtikett(d.score, { overMarketPct: d.overMarketPct }) : null,
    rubrik,
    harByte: rek.shouldSwitch === true && (Number(rek.netSaving) || 0) > 0,
  };
}
