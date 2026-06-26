// lib/price-extract.js — den OBEROENDE prisextraktorn (verifieringsjuryns andra vittne).
//
// Verifieringsjuryn (ersätter människan-i-loopen för prisändringar) kräver att ≥2 metoder som
// felar OLIKA är överens innan en ändring får kallas "verifierat". AI:n (Haiku) läser sidan och
// föreslår en siffra. Den här modulen läser sidans RÅTEXT deterministiskt och svarar på EN sak:
// "förekommer den siffran faktiskt som ett pris på sidan?" En AI-hallucination (en påhittad siffra
// som inte står på sidan) matchar då inte — och faller till prognos-nivån, aldrig "verifierat".
//
// Konservativ med flit: hellre tyst (→ provisorisk) än fel (→ falskt "verifierat"). Ren funktion.

// Pris-token på svenska sidor: "279 kr", "1 234 kr", "279:-", "279 kr/mån", "1 234,50 kr", "279 SEK".
// Tusentalsavskiljare (mellanslag / hårt   / smalt   mellanslag / punkt) + decimalkomma.
// Bokstavssuffix (kr/kronor/sek) kräver ordgräns (annars matchar "89 sek" i "89 sekunder"); ":-" gör inte.
const PRICE_TOKEN = /(\d[\d.,   ]*\d|\d)\s*(?:(?:kr|kronor|sek)\b|:-)/gi;

function parseSv(raw) {
  // "1 234,50" → 1234.50 ; "1.234" (tusental) → 1234 ; "279" → 279
  let s = String(raw).replace(/[\s  ]/g, '');             // bort med tusental-mellanslag (alla sorter)
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');  // komma = decimal, punkt = tusental
  else if (/\.\d{3}(\D|$)/.test(s + ' ')) s = s.replace(/\./g, ''); // "1.234" = tusental, inte decimal
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// Alla pris-tal som faktiskt förekommer som pris-token i texten (deduplicerade).
export function extractPriceTokens(pageText) {
  if (!pageText || typeof pageText !== 'string') return [];
  const out = new Set();
  for (const m of pageText.matchAll(PRICE_TOKEN)) {
    const n = parseSv(m[1]);
    if (n != null && n > 0) out.add(n);
  }
  return [...out];
}

// Bekräftar sidan den föreslagna siffran som ett pris? Tolerans för öresavrundning (≤1 kr eller ≤1 %).
export function pageConfirmsPrice(pageText, numeric) {
  if (!(numeric > 0)) return false;
  const tol = Math.max(1, numeric * 0.01);
  return extractPriceTokens(pageText).some((t) => Math.abs(t - numeric) <= tol);
}

// Förekommer produkten/leverantören i texten? (rätt produkt — priset hör inte till grannraden).
// Minst ETT meningsbärande nyckelord (>2 tecken) måste finnas; korta brusord (kr, ab) räknas inte.
export function pageMentionsProduct(pageText, keywords = []) {
  if (!pageText) return false;
  const hay = pageText.toLowerCase();
  const real = keywords.map((k) => String(k || '').toLowerCase().trim()).filter((k) => k.length > 2);
  if (!real.length) return false;
  return real.some((k) => hay.includes(k));
}
