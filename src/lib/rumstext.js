// src/lib/rumstext.js — RUMMETS ORDALYDELSE, UPPSLAGEN PER LÄGE. Läget kommer färdigt från API:t.
//
// ══ VARFÖR (Lägesregistret, grundarorder 2026-09-23) ════════════════════════════════════════
// Rummet valde förut själv läge ur rådata — och gissade där underlaget saknades. Mätt: en rad 1–15 %
// över billigaste pris fick «Priset ligger på eller under det billigaste» och märket «Rätt prissatt»;
// ett bevakat avtal utan jämförelse fick «ni betalar konkurrenskraftigt». Läget räknas nu i
// lib/lagesregister.js (api-lagret) och den här modulen gör en sak: slår upp texten för koden.
// Ett läge utan text är ett fel sviten fäller (LR-02) — aldrig en tyst `else`.
//
// Texterna är ordagrant de som stod i src/lib/holdings.js `buildReasoning`, utom de två som ljög:
// `bevakat_avtal` och den nya `nara_golvet`.

import { getCategoryMeta } from './categoryMeta.js';

const kr = (n) => Math.round(Number(n)).toLocaleString('sv-SE');
const ref = (p) => (p?.referensProdukt ? ` (${p.referensProdukt})` : '');

/** Radens «Arvo bedömer», per kod. HTML (b-taggar) — renderas som förut. */
export const MOTIVERING = {
  granskning: () => 'Kategorin kräver manuell granskning — Arvo inhämtar offert för exakt prisjämförelse. Ni kontaktas när det är klart.',
  byte: (p, label) => (p.ovPct >= 10
    ? `Ni betalar <b>${p.ovPct}% mer</b> än det billigaste verifierade alternativet för ${label}. Arvo rekommenderar byte — det lägre priset finns förberett nedan.`
    : `Ni betalar ${p.ovPct > 0 ? `${p.ovPct}% mer` : 'något mer'} än det billigaste verifierade alternativet för ${label} — ett litet gap. Ett lägre avtalspris finns att säkra om ni vill, men ingen brådska; avvärjt är ändå avvärjt.`),
  // Stod: «Arvo bevakar och förbereder bytet inför förnyelsen — ni betalar konkurrenskraftigt till dess.»
  // Ett prisomdöme om ett avtal vi aldrig jämfört (poängen är null). Avtalets datum står i klockan.
  bevakat_avtal: () => 'Avtalet är tidsbundet och bevakas — datumen står i avtalsklockan. Vi har inte jämfört priset, så vi säger inget om prisnivån.',
  oviss_niva: (p, label) => `Ni betalar ${kr(p.perEnhet)} kr ${p.unitLabel ?? 'per enhet/år'} `
    + `för ${label}. Billigaste jämförbara licens kostar ${Number(p.golv).toLocaleString('sv-SE')} kr${ref(p)} — men priserna i kategorin skiljer `
    + 'nästan tio gånger mellan billigaste och dyraste, så vi säger inget om avståndet förrän vi '
    + 'vet vilken nivå ni har. <b>Dela avtalet, så låser vi jämförelsen.</b>',
  over_golvet: (p, label) => `Ni betalar <b>${p.avstandPct}% mer</b> än det billigaste publicerade priset för ${label}${ref(p)}. `
    + 'Arvo har inget verifierat bytesmål att lägga fram för just den här raden i dag — men priset är inte '
    + 'konkurrenskraftigt, och underlaget nedan visar exakt vad jämförelsen bygger på.',
  // NY 2026-09-23: 1–15 % över golvet stod förut som «på eller under det billigaste» — falskt i orden.
  nara_golvet: (p, label) => `Ni betalar <b>${p.avstandPct}% mer</b> än det billigaste publicerade priset för ${label}${ref(p)} `
    + '— ett litet avstånd, och inget verifierat bytesmål vi kan lägga fram för raden i dag. Underlaget nedan visar jämförelsen.',
  pa_eller_under_golvet: (p, label) => `Priset ligger på eller under det billigaste publicerade priset för ${label}${ref(p)}. `
    + 'Inget byte rekommenderas i dag — dela en ny faktura vid nästa avtalsperiod så kontrollerar Arvo igen.',
  omatt: (p, label) => `Fakturan är mottagen och klassad som ${label}. Arvo har inget verifierat publikt pris `
    + 'att jämföra den mot i dag, så vi gör inget påstående om prisläget — raden står under '
    + 'bevakning och kontrolleras när underlaget bär.',
};

/** Radens märke, per kod: { text, ton }. `ton` styr bara färgen. */
export const MARKE = {
  granskning: () => ({ text: 'Granskas', ton: 'watch' }),
  byte: (p) => ({ text: `+${kr(p.netSaving)} kr/år`, ton: 'save' }),
  bevakat_avtal: () => ({ text: 'Avtalsbevakad', ton: 'watch' }),
  oviss_niva: () => ({ text: 'Nivå ej bekräftad', ton: 'watch' }),
  over_golvet: (p) => ({ text: `${p.avstandPct} % över lägsta pris`, ton: 'over' }),
  nara_golvet: (p) => ({ text: `${p.avstandPct} % över lägsta pris`, ton: 'watch' }),
  pa_eller_under_golvet: () => ({ text: 'Rätt prissatt', ton: 'watch' }),
  // ⚖️ Tystnadens skäl, om kategorin har ett (t.ex. försäkring: «Kräver särskilt tillstånd»).
  omatt: (p, a) => ({ text: a?.tystnad?.rubrik ?? 'Mottagen', ton: 'watch' }),
};

/** Texten för en rad ur API:ts läge. Saknas läget säger raden bara att den är mottagen. */
export function radMotivering(a) {
  const label = (getCategoryMeta(a?.category)?.label ?? a?.category ?? '').toLowerCase();
  const kod = a?.lage?.kod;
  const f = MOTIVERING[kod] ?? MOTIVERING.omatt;
  return f(a?.lage?.params ?? {}, label);
}

export function radMarke(a) {
  const kod = a?.lage?.kod;
  const f = MARKE[kod] ?? MARKE.omatt;
  return f(a?.lage?.params ?? {}, a);
}
