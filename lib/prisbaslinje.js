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
// Regeln: det gamla priset är prisbokens VERIFIERADE tal för just den kontrollen. Kontrollen
// deklarerar talet med `bokfort` (en väg in i BRANCHINDEX, lib/prisvaktens-kontroller.js), och
// prisvakten läser det gamla priset DÄR — aldrig ur kontrollens namn.
//
// ══ RÄTTELSE 2026-09-24 (andra blicken, samma dygn) ═════════════════════════════════════════════
// Första versionen samlade VARJE tal i kategorin och frågade om det gamla priset fanns bland dem.
// Leverantören vägdes aldrig in: Telenors kontroll «299 kr/mth» räknades som verifierad därför att
// Tele2:s median är 3 588 kr/år = 299 kr/mån. Juryn hade skrivit «Telenor 299 → 329» som en
// marknadshändelse och larmmejlet skickat den. Nu måste talet (a) ligga på den deklarerade vägen,
// (b) i kontrollens egen kategori, och (c) bära leverantörens namn på vägen dit — i en nyckel eller i
// ett source-/product-/referensProdukt-fält. Och eftersom namnen bar majpriser kunde ingen verklig
// Microsoft-ändring någonsin larma: det gamla priset var alltid 119, aldrig 133,82.
//
// FÅNGAR: en «ändring» vars gamla pris är prisvaktens egen inaktuella förväntan; ett tal som är en
//   annan leverantörs; ett tal i en USD-post (inget verifierat SEK-pris) (BL-01..04).
// BLIND: vägen deklareras av en människa. Pekar den på fel nivå hos RÄTT leverantör (Standard i
//   stället för Basic) ser maskinen det inte — bara att talet är verifierat och leverantörens.
//   Därför kräver larmet OCKSÅ att sidans råtext bekräftar det nya talet (juryns egen grind).
//   En kontroll utan `bokfort` kan aldrig bära en händelse (BL-02) — rätt: då finns inget att mäta mot.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

/** Fält som säger VEMS talet är. Fri text (note, positioning) räknas inte — den nämner konkurrenter. */
const IDENTITET = ['source', 'product', 'referensProdukt', 'supplier', 'plan'];
/** Poster som inte är prisboksfakta: konkurrentlistan och prosan. */
const INTE_FAKTA = new Set(['alternatives', 'note', 'positioning']);

const markeOrd = (supplier) => String(supplier ?? '').toLowerCase().match(/[a-zåäö0-9]+/)?.[0] ?? null;

/**
 * Det verifierade tal en kontroll deklarerar. null om vägen inte bär ett verifierat SEK-tal.
 * @param {string[]} bokfort  väg in i BRANCHINDEX, första ledet är kategorin
 * @returns {{ pris: number, kategori: string, identitet: string }|null}
 */
export function bokfortPris(bokfort) {
  if (!Array.isArray(bokfort) || bokfort.length < 2) return null;
  const [kategori, ...vag] = bokfort;
  let nod = BRANCHINDEX[kategori];
  if (!nod || !['real-public', 'real'].includes(nod.source)) return null;
  const spar = [kategori];
  const identitetAv = (o) => IDENTITET.map((f) => (typeof o?.[f] === 'string' ? o[f] : '')).join(' ');
  spar.push(identitetAv(nod));
  for (const nyckel of vag) {
    if (INTE_FAKTA.has(nyckel)) return null;
    if (!nod || typeof nod !== 'object' || !(nyckel in nod)) return null;
    // Valutakontrollen görs på noden vi kliver UR — ett tal kan bara ligga i ett objekt, så det
    // här är den enda platsen den behövs (en andra kopia efter klivet var ett skydd bakom ett skydd).
    if (nod.currency && nod.currency !== 'SEK') return null;   // en USD-post är inget SEK-listpris
    nod = nod[nyckel];
    spar.push(nyckel);
    if (nod && typeof nod === 'object') spar.push(identitetAv(nod));
  }
  if (typeof nod !== 'number' || !Number.isFinite(nod) || nod <= 0) return null;
  return { pris: nod, kategori, identitet: spar.join(' ').toLowerCase() };
}

/**
 * @param {{ category: string, supplier: string, bokfort?: string[], oldNumeric: number }} p
 * @returns {{ verifierad: boolean, skal: string, pris?: number }}
 */
export function verifieradBaslinje({ category, supplier, bokfort, oldNumeric } = {}) {
  const gammalt = Number(oldNumeric);
  if (oldNumeric == null || !Number.isFinite(gammalt) || gammalt <= 0) return { verifierad: false, skal: 'gammalt_pris_saknas' };
  if (!bokfort) return { verifierad: false, skal: 'kontrollen_saknar_bokfort_pris' };
  const b = bokfortPris(bokfort);
  if (!b) return { verifierad: false, skal: 'bokfort_pris_saknas_i_prisboken' };
  if (b.kategori !== category) return { verifierad: false, skal: 'bokfort_pris_ar_annan_kategoris' };
  const marke = markeOrd(supplier);
  if (!marke || !b.identitet.includes(marke)) return { verifierad: false, skal: 'bokfort_pris_ar_annan_leverantors' };
  if (Math.abs(b.pris - gammalt) > Math.max(0.01, b.pris * 0.005)) return { verifierad: false, skal: 'gammalt_pris_ar_inte_bokfort_pris' };
  return { verifierad: true, skal: 'gammalt_pris_verifierat_i_prisboken', pris: b.pris };
}

/**
 * Får en upptäckt ändring skrivas som marknadshändelse och larma kunder? EN sanning för juryn
 * (scripts/verify-price-changes.mjs) och båda larmvägarna (lib/larmunderlag.js → bedomLarm).
 * Kräver BÅDE en verifierad baslinje och att sidans råtext bekräftar det nya talet — juryns egen
 * grind, som larmvägarna förut hoppade över (Slack 15 → 18 och Zoom 13,33 → 14,16 räknades natten
 * 23 sep som «verifierade» i larmunderlaget men avvisades av juryn).
 * @param {{ category: string, supplier: string, verify?: { oldNumeric?: number, bokfort?: string[], pageConfirmsNew?: boolean } }} alert
 */
export function arMarknadshandelse(alert) {
  const b = verifieradBaslinje({ category: alert?.category, supplier: alert?.supplier,
    bokfort: alert?.verify?.bokfort, oldNumeric: alert?.verify?.oldNumeric });
  if (!b.verifierad) return { ja: false, skal: b.skal };
  if (alert?.verify?.pageConfirmsNew !== true) return { ja: false, skal: 'sidan_bekraftar_inte_nya_priset' };
  return { ja: true, skal: b.skal };
}
