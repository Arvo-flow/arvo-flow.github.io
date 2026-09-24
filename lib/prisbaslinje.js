// lib/prisbaslinje.js — EN PRISÄNDRING ÄR EN MARKNADSHÄNDELSE BARA OM DET GAMLA PRISET VAR VERIFIERAT.
//
// ══ VARFÖR (2026-09-24, ur grundarens steg 4 — «gör Microsoft-insikten synlig») ════════════════
// Nattens jury «verifierade» Microsoft 365 Business Standard 119 → 133,82, med konfidens 0,95 och
// «sett 74×». 119 var aldrig Microsofts pris: det är prisvaktens FÖRVÄNTADE sträng från maj, och
// stabilitetsgrinden höll därför att samma skillnad upprepades varje natt. Prisarkeologin (Wayback,
// april 2024–april 2025) visar Business Standard 138,10 och Basic 66,30 — alltså fanns ingen
// augustihöjning hos Microsoft, bara en rättning i VÅR prisbok. Juryn jämförde vår gamla gissning med
// dagens sida och kallade skillnaden en höjning.
//
// Skrivningen föll varje natt på `product` NOT NULL, och loggen sa ändå «skriven till ändringsloggen».
// Hade någon lagat skrivningen hade rummet och larmmejlen sagt «Microsoft höjde 12 %» — falskt.
//
// Regeln: det gamla priset måste vara ett tal som prisboken bär som VERIFIERAT för kategorin i dag.
// Då kan en verklig ändring (verifierat 133,82 → nytt tal på sidan) passera, och en ändring mellan
// en inaktuell förväntan och sidan kan det inte.
//
// FÅNGAR: en «ändring» vars gamla pris är prisvaktens egen inaktuella förväntan (PB-01..03).
// BLIND: talen jämförs, inte produkten — ett inaktuellt tal som råkar sammanfalla med ett annat
//   verifierat tal i samma kategori passerar. Därför kräver larmet OCKSÅ att sidans råtext bekräftar
//   det nya talet (juryns egen grind). Och en kategori utan verifierade tal i prisboken kan inte (BL-02)
//   bära en händelse — det är rätt: då finns inget att mäta en ändring mot.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const HOPPA = new Set(['note', 'alternatives', 'source', 'verifiedVia', 'lastVerified', 'referensProdukt',
  'kraverBekraftadNiva', 'currency', 'sekPublic', 'unit', 'cellHarledning', 'positioning', 'reliability']);

/** Varje verifierat tal kategorin bär — som det står och som månadsbelopp av ett årstal. */
export function verifieradePris(category) {
  const c = BRANCHINDEX[category];
  if (!c || !['real-public', 'real'].includes(c.source)) return [];
  const tal = [];
  (function ga(v, nyckel) {
    if (HOPPA.has(nyckel)) return;
    if (typeof v === 'number' && Number.isFinite(v) && v > 0) { tal.push(v); tal.push(Math.round((v / 12) * 100) / 100); return; }
    if (Array.isArray(v)) { v.forEach((x) => ga(x, nyckel)); return; }
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) ga(x, k);
  })(c, '');
  return tal;
}

/**
 * @param {{ category: string, oldNumeric: number }} p
 * @returns {{ verifierad: boolean, skal: string }}
 */
export function verifieradBaslinje({ category, oldNumeric } = {}) {
  const gammalt = Number(oldNumeric);
  if (!Number.isFinite(gammalt) || gammalt <= 0) return { verifierad: false, skal: 'gammalt_pris_saknas' };
  const kandidater = verifieradePris(category);
  if (!kandidater.length) return { verifierad: false, skal: 'kategorin_saknar_verifierade_pris' };
  const traff = kandidater.some((t) => Math.abs(t - gammalt) <= Math.max(0.01, t * 0.005));
  return traff
    ? { verifierad: true, skal: 'gammalt_pris_verifierat_i_prisboken' }
    : { verifierad: false, skal: 'gammalt_pris_ar_inte_ett_verifierat_pris' };
}

/**
 * Får en upptäckt ändring skrivas som marknadshändelse och larma kunder? EN sanning för juryn
 * (scripts/verify-price-changes.mjs) och båda larmvägarna (lib/larmunderlag.js → bedomLarm).
 * Kräver BÅDE en verifierad baslinje och att sidans råtext bekräftar det nya talet — juryns egen
 * grind, som larmvägarna förut hoppade över (Slack 15 → 18 och Zoom 13,33 → 14,16 räknades natten
 * 23 sep som «verifierade» i larmunderlaget men avvisades av juryn).
 * @param {{ category: string, verify?: { oldNumeric?: number, pageConfirmsNew?: boolean } }} alert
 */
export function arMarknadshandelse(alert) {
  const b = verifieradBaslinje({ category: alert?.category, oldNumeric: alert?.verify?.oldNumeric });
  if (!b.verifierad) return { ja: false, skal: b.skal };
  if (alert?.verify?.pageConfirmsNew !== true) return { ja: false, skal: 'sidan_bekraftar_inte_nya_priset' };
  return { ja: true, skal: b.skal };
}
