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
  const ovPct = byte && a.annual_cost > 0 && a.suggested_annual_cost > 0
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

/** Rummets EN räknare, i EN enhet (fakturor). Flyttad från src/lib/holdings.js. */
export function roomCounts({ autoAnalyses = [], watched = [] } = {}) {
  const analyserade = autoAnalyses.length;
  const bevakade = watched.length;
  const prissatta = autoAnalyses.filter((a) => a?.prisunderlag != null).length;
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
  const score = rumScore(grupper);
  const standing = marknadslage(score);
  const lage = domensLage({ ...acting, standing });
  const kort = rattstorlekKort
    ? grupper.map((g) => rattstorlekKort(g.latest?.rattstorlek_json)).filter(Boolean)
      .sort((x, y) => (y.annualImpact || 0) - (x.annualImpact || 0)).slice(0, 3)
    : [];
  return {
    lage,
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
  const rubrik = svar?.categorized?.category === 'uncategorized' ? 'kategori_omatt'
    : nivasankning ? 'inget_byte_med_nivasankning' : 'inget_byte';
  return { ...d, etikett: d.matt ? diagnosEtikett(d.score, { overMarketPct: d.overMarketPct }) : null, rubrik, harByte: rek.shouldSwitch === true && (Number(rek.netSaving) || 0) > 0 };
}
