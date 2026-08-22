// src/lib/briefinglage.js — vad månadsbrevet SÄGER när det inte finns något fynd.
//
// VARFÖR (2026-08-22, regel 8 på briefingen). Med noll insikter renderade månadsbrevet:
//
//     POTENTIELL BESPARING · 0 kr/år          ← nolltalet som hjältesiffra
//     Arvo har identifierat 0 besparingsinsikter för ert bolag
//     Scrolla för att se insikterna           ← till noll insikter
//     Era insikter väntar på er.              ← påstår att de finns
//
// Fyra fel i samma vy, och det är den yta som går ut som MAIL varje månad — vår mest proaktiva
// kundkontakt. En finansdirektör som öppnar ett brev vars största text är «0 kr» frågar sig vad
// hen betalar 1 995 kr i månaden för.
//
// Bibeln är uttrycklig om det här: *«Gör inget» är den vanligaste och mest premiumladdade
// leveransen — men bara om lugnet är förtjänat och VISAT (domen bär alltid sitt arbete).* Och:
// *den tysta dagen, där Arvo säger «håll, allt är under kontroll, vi sköter augusti åt er» — DET
// är produkten.* Briefingen gjorde motsatsen: den visade ett nolltal och lovade insikter som inte
// fanns.
//
// Modulen skiljer på tre lägen och låter varje läge deklarera om det får LOVA insikter. Samma
// disciplin som domslut.js i rummet och diagnos.js i huvudfunneln — tredje ytan, samma sats:
// frånvaron av ett fynd är ett påstående om VÅRT arbete, aldrig ett tomt löfte till kunden.
//
// FÅNGAR: att den tysta månaden lovar insikter som inte finns, visar ett nolltal som resultat
//   eller ber kunden scrolla till ingenting.
// BLIND: modulen avgör LÄGET, inte om arbetet faktiskt utförts. Att vakten verkligen svepte den
//   månaden bevisas av vakt_events (lib/vakt.js), inte här — och en briefing som säger «vi vägde
//   era priser» utan att ha gjort det är ett löfte utan mekanik som den här modulen inte ser.

export const BRIEFINGLAGEN = {
  fynd:      { lovarInsikter: true,  visaSparbelopp: true  },
  lugn:      { lovarInsikter: false, visaSparbelopp: false },
  agerat:    { lovarInsikter: false, visaSparbelopp: true  },
};

/**
 * @param {{ antalInsikter: number, sparbelopp: number, harAgerat: boolean }} p
 * @returns {keyof BRIEFINGLAGEN}
 */
export function briefingLage({ antalInsikter, sparbelopp, harAgerat } = {}) {
  if (harAgerat === true) return 'agerat';
  const n = Number(antalInsikter) || 0;
  const kr = Number(sparbelopp) || 0;
  return n > 0 || kr > 0 ? 'fynd' : 'lugn';
}

/** Får läget lova kunden insikter? Enda vägen för konsumenter att fråga. */
export function lovarInsikter(lage) {
  return BRIEFINGLAGEN[lage]?.lovarInsikter === true;
}

/** Ska ett kronbelopp visas som periodens resultat? Ett nollbelopp är inget resultat. */
export function visaSparbelopp(lage) {
  return BRIEFINGLAGEN[lage]?.visaSparbelopp === true;
}
