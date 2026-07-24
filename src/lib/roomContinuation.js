// src/lib/roomContinuation.js — DEN LEVANDE FORTSÄTTNINGEN (grundarbeslut 2026-07-21).
//
// Sektion 02 (Arvo-kontoret) på landningssidan ska inte falla tillbaka till ett mockup-bolag
// efter att dörren (01) just visat besökarens EGNA fakta. Den här rena funktionen tar dörrens
// fynd och väver dem till en kort fras-lista som rummet kan fortsätta tråden med:
//   "Det ni just såg i dörren — att ni kör Microsoft 365, att 4 leverantörer syns … — var
//    första ögonkastet. I ert rum blir det rad ett."
//
// INTEGRITET (regel 3): vi FABRICERAR ingenting. Varje fras är en förkortning av en titel vi
// själva genererat deterministiskt ur källbelagd data. Generiska rader (måttstocken, golvet,
// infrastrukturen) bär ingen "om er"-kraft och utesluts. Ingen fras uppfinns.
//
// Personaliseringen bor ENDAST här — i rummet (02), aldrig i dörren (01). Dörren avslöjar;
// rummet fortsätter tråden.

// Rangordning: vilka fynd bär "det ni just såg"-kraften starkast (samma anda som kortets tak).
const RANK = {
  platform: 0, suppliers: 1, koncern: 2, spoofing: 3, business: 4,
  trend: 5, cross: 6, heritage: 7, onboarding: 8, domain: 9, cert: 10, dmarc: 11,
};

// Generiska rader — om marknaden/oss, inte om dem. Får aldrig bli en "det ni just såg"-fras.
const SKIP = new Set(['market', 'bridge', 'infra']);

// Titel → kort fras. Klipper vid tankstreck/kolon (långa titlar bär sin poäng först) och
// gemenerar inledningen så frasen kan bäras i en löpande mening.
export function titleToPhrase(title) {
  let t = String(title || '').trim();
  if (!t) return '';
  t = t.split(/\s+[—–]\s+/)[0];        // "Grundat 1987 — 39 år i verksamhet" → "Grundat 1987"
  t = t.split(':')[0].trim();          // "Ert bokslut 2025: 264,6 mkr…" → "Ert bokslut 2025"
  t = t.replace(/^Ni\s+/, 'ni ');      // "Ni kör Microsoft 365" → "ni kör Microsoft 365"
  return t.charAt(0).toLowerCase() + t.slice(1);
}

// Dörrens fynd → upp till `max` fraser, rangordnade. Tomt in → tomt ut (rummet visar exempel).
export function continuationPhrases(findings, max = 3) {
  if (!Array.isArray(findings)) return [];
  return findings
    .filter((f) => f && f.title && !SKIP.has(f.kind))
    .slice()
    .sort((a, b) => (RANK[a.kind] ?? 99) - (RANK[b.kind] ?? 99))
    .slice(0, max)
    .map((f) => titleToPhrase(f.title))
    .filter(Boolean);
}

// Fraserna → en läsbar uppräkning ("A, B och C"). Svensk konjunktion, aldrig oxfordkomma.
export function joinPhrases(phrases) {
  const p = (phrases || []).filter(Boolean);
  if (p.length === 0) return '';
  if (p.length === 1) return p[0];
  return `${p.slice(0, -1).join(', ')} och ${p[p.length - 1]}`;
}
