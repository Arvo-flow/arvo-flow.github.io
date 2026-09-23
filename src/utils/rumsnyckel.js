// src/utils/rumsnyckel.js — webbläsarens rumsnyckel: 128 bitar slump, aldrig ett fingeravtryck.
//
// Speglar lib/rumsnyckel.js (servern läser historik bara på en nyckel i RUMSNYCKEL_RE-formatet).
// Speglingen är låst av RN-04 — backend importerar aldrig ur src/ (ESM-gränsen).
//
// Förut: en sha256-hash av userAgent|språk|skärm|tidszon|kärnor. Deterministiskt, alltså gissbart och
// delat mellan likadana datorer. Nu: slump som sparas i webbläsaren. Går lagringen inte att använda
// (privat läge, blockerad) får fliken en egen slumpnyckel som dör med den — hellre ett tomt rum
// än ett rum någon annan kan räkna fram.

export const RUMSNYCKEL_RE = /^[0-9a-f]{32}$/;
const LAGRING = 'arvo_rumsnyckel';
let flikensNyckel = null;

export function nyRumsnyckel() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
}

export function hamtaRumsnyckel() {
  try {
    const lagrad = window.localStorage.getItem(LAGRING);
    if (lagrad && RUMSNYCKEL_RE.test(lagrad)) return lagrad;
    const ny = nyRumsnyckel();
    window.localStorage.setItem(LAGRING, ny);
    return ny;
  } catch {
    if (!flikensNyckel) flikensNyckel = nyRumsnyckel();
    return flikensNyckel;
  }
}
