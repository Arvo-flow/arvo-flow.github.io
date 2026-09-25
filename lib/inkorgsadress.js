// lib/inkorgsadress.js — RUMMETS EGEN ADRESS: MOTTAGAREN ÄR IDENTITETEN (grundarorder 2026-09-24).
//
// ══ VARFÖR ════════════════════════════════════════════════════════════════════════════════════
// Mejlintaget knöt identiteten till AVSÄNDAREN (`mail:<sha16(avsändare)>`). Mätt 2026-09-24
// (probe-lokaldelar): Resend levererar godtyckliga lokaldelar och plusformen till vår handler. En
// faktura som en kollega vidarebefordrar, eller som leverantören själv skickar, hamnade alltså i
// avsändarens rum eller i inget. Med en egen adress per rum är det adressen som säger vems fakturan är.
//
// ══ TVÅ NYCKLAR, TVÅ RÄTTIGHETER ════════════════════════════════════════════════════════════════
// · Rumsnyckeln (lib/rumsnyckel.js) ger LÄSRÄTT. Den får aldrig stå i en e-postadress: en adress hamnar
//   i vidarebefordringsregler, i leverantörers system och i mejlhuvuden. Den lagras inte heller här —
//   tabellen bär bara sha256 av den (`rum_hash`), för uppslag.
// · Adressnyckeln ger bara SKRIVRÄTT: den som vet adressen kan skicka in en faktura, aldrig läsa en.
//   80 bitar slump (16 tecken base32). Adressens fakturor lagras under fingeravtrycket `adress:<nyckel>`
//   och läses av rummet efter att rummet bevisat sig med sin rumsnyckel eller sin e-post.
//
// FÅNGAR: en mottagare på fel domän eller i fel form (blir aldrig en adressidentitet); en giltig men
//   okänd nyckel (analyseras inte — avsändaren får besked); ett svar till en avsändare som inte är
//   adressens ägare (svaraTill är ägaren eller ingen).
// BLIND: den som känner till adressen kan skicka in fakturor som inte är rummets. Det är skrivrätt,
//   aldrig läsrätt, och varje rad bär sin avsändare — men rummet kan inte skilja en främmande faktura
//   från kundens egen. Gmail-kodens form är obekräftad mot ett riktigt verifieringsmejl (IA-06).

import { createHash, randomBytes } from 'node:crypto';

export const INTAGSDOMAN = 'inbox.arvoflow.se';
export const ADRESSNYCKEL_RE = /^[a-z2-7]{16}$/;
const ADRESS_RE = /^faktura\+([a-z2-7]{16})@inbox\.arvoflow\.se$/;
const B32 = 'abcdefghijklmnopqrstuvwxyz234567';

/** Ny adressnyckel: 16 tecken base32 = 80 bitar slump. */
export function nyAdressnyckel(rand = randomBytes) {
  const b = rand(10);
  let bits = 0, val = 0, ut = '';
  for (const byte of b) {
    val = (val << 8) | byte; bits += 8;
    while (bits >= 5) { ut += B32[(val >>> (bits - 5)) & 31]; bits -= 5; }
  }
  return ut;
}

export const adressFor = (nyckel) => `faktura+${nyckel}@${INTAGSDOMAN}`;
export const adressFingeravtryck = (nyckel) => `adress:${nyckel}`;
/** sha256 av rumsnyckeln — uppslagsnyckel. Rumsnyckeln själv lagras aldrig. */
export const rumHash = (rumsnyckel) => createHash('sha256').update(String(rumsnyckel)).digest('hex');

/** Alla adresser i ett `to`-fält, oavsett form Resend skickar (sträng, lista, objekt med email). */
function adresser(toField) {
  const ut = [];
  const ta = (v) => {
    if (!v) return;
    if (Array.isArray(v)) { v.forEach(ta); return; }
    const s = typeof v === 'object' ? (v.email ?? v.address ?? '') : String(v);
    for (const m of String(s).matchAll(/[^\s<>,;"']+@[^\s<>,;"']+/g)) ut.push(m[0].toLowerCase());
  };
  ta(toField);
  return ut;
}

/** Adressnyckeln ur mottagarfältet, eller null. Bara exakt formen faktura+<nyckel>@inbox.arvoflow.se. */
export function nyckelUrMottagare(toField) {
  for (const a of adresser(toField)) {
    const m = a.match(ADRESS_RE);
    if (m) return m[1];
  }
  return null;
}

/**
 * Intagets identitet för ett mejl till en rumsadress. Ren funktion: handlern gör uppslaget, det här
 * avgör vad som gäller. `rad` är adressens rad ur inkorgsadresser, eller null om nyckeln är okänd.
 * @returns {{ lage: 'rumsadress'|'okand_adress', fingerprint?: string, userEmail?: string|null, svaraTill: string|null }}
 */
export function intagsIdentitet({ nyckel, rad, avsandare }) {
  if (!rad) return { lage: 'okand_adress', svaraTill: avsandare ?? null };
  const agare = typeof rad.agare_epost === 'string' && rad.agare_epost.includes('@') ? rad.agare_epost.toLowerCase() : null;
  return {
    lage: 'rumsadress',
    fingerprint: adressFingeravtryck(nyckel),
    userEmail: agare,
    // Svaret går till adressens ägare — aldrig till avsändaren, som kan vara leverantören själv.
    svaraTill: agare,
  };
}

/**
 * Gmails verifieringskod ur ett vidarebefordringsmejl, eller null.
 * OBEKRÄFTAT mot ett riktigt mejl: avsändaren är forwarding-noreply@google.com och ämnet bär koden som
 * «(#123456789) Gmail Forwarding Confirmation …». Brödtexten prövas som reserv.
 */
export function gmailKod({ avsandare, amne, text } = {}) {
  if (String(avsandare ?? '').toLowerCase() !== 'forwarding-noreply@google.com') return null;
  const iAmne = String(amne ?? '').match(/\(#(\d{6,12})\)/);
  if (iAmne) return iAmne[1];
  const iText = String(text ?? '').match(/(?:confirmation code|bekräftelsekod|verifieringskod)\s*:?\s*(\d{6,12})/i);
  return iText ? iText[1] : null;
}

/** Hur länge en fångad Gmail-kod visas i rummet. Gmails kod är kortlivad; en gammal kod är brus. */
export const GMAIL_KOD_GILTIG_MS = 60 * 60 * 1000;

// ── Databasen ─────────────────────────────────────────────────────────────────────────────────
// Tabellen skapas av migreringen (scripts/migrate-v2.mjs). Läsningarna KASTAR vid fel — en okänd
// adress och en databas som inte svarar får aldrig se likadana ut.

/**
 * Rummets adress; skapas vid första frågan. Samma identitetsregel som rummet (api/invoice-history):
 * är e-posten BEVISAD är den identiteten, annars enheten (rumsnyckeln). En enhetsadress utan ägare knyts
 * till den bevisade e-posten; en adress som redan har en ägare byter aldrig ägare (IA-08).
 */
export async function adressForRum(db, { rumsnyckel = null, agareEpost = null, plattform = null } = {}) {
  if (!db) throw new Error('inkorgsadress: ingen databas');
  const hash = rumsnyckel ? rumHash(rumsnyckel) : null;
  const epost = agareEpost ? String(agareEpost).trim().toLowerCase() : null;
  if (!hash && !epost) throw new Error('inkorgsadress: rummet saknar identitet');
  const uppdateraPlattform = async (rad) => {
    if (plattform && rad.plattform !== plattform) {
      await db`UPDATE inkorgsadresser SET plattform = ${plattform} WHERE nyckel = ${rad.nyckel}`;
      rad.plattform = plattform;
    }
    return rad;
  };
  let hashRad = null;
  if (epost) {
    const [egen] = await db`SELECT * FROM inkorgsadresser WHERE agare_epost = ${epost} ORDER BY skapad_at ASC LIMIT 1`;
    if (egen) return uppdateraPlattform(egen);
    if (hash) {
      [hashRad] = await db`SELECT * FROM inkorgsadresser WHERE rum_hash = ${hash} LIMIT 1`;
      if (hashRad && !hashRad.agare_epost) {
        await db`UPDATE inkorgsadresser SET agare_epost = ${epost} WHERE nyckel = ${hashRad.nyckel}`;
        return uppdateraPlattform({ ...hashRad, agare_epost: epost });
      }
    }
  } else {
    const [enhet] = await db`SELECT * FROM inkorgsadresser WHERE rum_hash = ${hash} LIMIT 1`;
    if (enhet) return uppdateraPlattform(enhet);
  }
  const nyckel = nyAdressnyckel();
  // rum_hash är unik: är enhetens hash redan tagen av en annan ägares adress får den nya adressen ingen.
  const [ny] = await db`
    INSERT INTO inkorgsadresser (nyckel, rum_hash, agare_epost, plattform)
    VALUES (${nyckel}, ${hashRad ? null : hash}, ${epost}, ${plattform})
    RETURNING *
  `;
  return ny;
}

/** Rummets befintliga adress, eller null — skapar aldrig. Bevisad e-post vinner över enheten. */
export async function hittaRumsadress(db, { rumsnyckel = null, agareEpost = null } = {}) {
  if (!db) throw new Error('inkorgsadress: ingen databas');
  const epost = agareEpost ? String(agareEpost).trim().toLowerCase() : null;
  if (epost) {
    const [r] = await db`SELECT * FROM inkorgsadresser WHERE agare_epost = ${epost} ORDER BY skapad_at ASC LIMIT 1`;
    return r ?? null;
  }
  if (!rumsnyckel) return null;
  const [r] = await db`SELECT * FROM inkorgsadresser WHERE rum_hash = ${rumHash(rumsnyckel)} LIMIT 1`;
  return r ?? null;
}

export async function slaUppAdress(db, nyckel) {
  if (!db) throw new Error('inkorgsadress: ingen databas');
  if (!ADRESSNYCKEL_RE.test(String(nyckel ?? ''))) return null;
  const [rad] = await db`SELECT * FROM inkorgsadresser WHERE nyckel = ${nyckel} LIMIT 1`;
  return rad ?? null;
}

export async function markeraMottagen(db, nyckel) {
  try { await db`UPDATE inkorgsadresser SET senast_mottagen_at = NOW() WHERE nyckel = ${nyckel}`; }
  catch (err) { console.warn('[inkorgsadress] markeraMottagen:', err.message); }
}

export async function sparaGmailKod(db, nyckel, kod) {
  await db`UPDATE inkorgsadresser SET gmail_kod = ${kod}, gmail_kod_at = NOW() WHERE nyckel = ${nyckel}`;
}

/** Vad rummet får veta om sin adress. Koden visas bara medan den är färsk. */
export function adressStatus(rad, { nu = Date.now() } = {}) {
  if (!rad) return null;
  const kodAt = rad.gmail_kod_at ? new Date(rad.gmail_kod_at).getTime() : null;
  const farsk = kodAt != null && nu - kodAt < GMAIL_KOD_GILTIG_MS;
  return {
    adress: adressFor(rad.nyckel),
    plattform: rad.plattform ?? null,
    gmailKod: farsk ? rad.gmail_kod : null,
    gmailKodAt: farsk ? new Date(kodAt).toISOString() : null,
    senastMottagen: rad.senast_mottagen_at ? new Date(rad.senast_mottagen_at).toISOString() : null,
  };
}

// ── Plattformen (guiden i rummet) ───────────────────────────────────────────────────────────────
// Vilken guide kunden ska se avgörs av var deras mejl bor. Privata domäner läses ur adressen;
// företagsdomäner ur DNS (getDnsPosture, samma MX-regler som dörrens avslöjande). Ett okänt svar är
// 'annan' — guiden visar då den allmänna vägen, aldrig en gissad plattform.
const PRIVAT = [
  [/^(gmail|googlemail)\.com$/, 'gmail'],
  [/^(outlook|hotmail|live|msn)\.[a-z.]+$/, 'outlook_privat'],
];
export const PLATTFORMAR = ['microsoft365', 'google_workspace', 'gmail', 'outlook_privat', 'annan'];

/** Plattform ur en e-postadress. `posture` injiceras i sviten (DNS finns inte där). */
export async function plattformForEpost(epost, { posture } = {}) {
  const doman = String(epost ?? '').trim().toLowerCase().split('@')[1];
  if (!doman) return null;
  for (const [re, p] of PRIVAT) if (re.test(doman)) return p;
  let p;
  try {
    const fn = posture ?? (await import('./domain-intel.js')).getDnsPosture;
    p = await fn(doman);
  } catch { return 'annan'; }
  if (p?.mx === 'microsoft365' || (p?.mx !== 'google' && p?.spfM365)) return 'microsoft365';
  if (p?.mx === 'google' || p?.spfGoogle) return 'google_workspace';
  return 'annan';
}
