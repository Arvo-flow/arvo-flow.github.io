// lib/dorrstat.js — DÖRRENS TRATT, mätt. (grundarbeslut 2026-08-13)
//
// VARFÖR: bryggan till rummet är sidans viktigaste konverteringspunkt, och vi visste ingenting om
// den. Hur många öppnar dörren? Hur många får ett kort? Hur många tar adressen med sig? Utan de
// talen optimerar vi på magkänsla — och det är precis vad bibeln förbjuder (regel 3: inga siffror
// utan källa; regel 4: precision där vi har den). Att bygga nästa lager ovanpå en omätt tratt är
// att gissa två gånger.
//
// ── INTEGRITETSLINJEN, SOM ÄR HELA POÄNGEN ──────────────────────────────────────────────────
// Dörren lovar besökaren "innan ni delat något", och api/reveal LAGRAR INGENTING. En mätning som
// sparade den inskrivna domänen hade gjort vårt eget löfte falskt — vi hade blivit det vi varnar
// för. Därför lagrar den här modulen:
//   · INGEN domän. Aldrig. Inte hashad, inte trunkerad — den passerar aldrig hit.
//   · INGEN IP, ingen user-agent, ingen cookie.
//   · ETT slumpat sessions-id ur sessionStorage (dör när fliken stängs), enbart för att kunna
//     räkna TRATTAR i stället för lösryckta klick — annars går konverteringsgrad inte att räkna.
//   · Händelsenamn ur en STÄNGD lista, och två neutrala tal (antal fynd, vyns bredd).
// Det som inte samlas in kan inte läcka, och kan inte heller frestas att användas till något
// annat. Om vi någon gång vill veta MER om en besökare ska den be om det öppet, inte mäta det.
//
// EN SANNING: händelsenamnen bor här och ingen annanstans. Klienten importerar samma lista
// (src/lib/dorrstat.js speglar den via API:ets validering), och API:et avvisar allt utanför den —
// en felstavad händelse ska bli ett synligt avslag, inte en tyst rad som ingen kan tolka sedan.

import { getDb } from './db.js';

// Trattens steg, i ordning. Ordningen ÄR modellen: varje steg kan bara nås via det föregående,
// och det gör att en fallande andel mellan två steg pekar på exakt ett ställe i gränssnittet.
export const HANDELSER = [
  'dorr_visad',        // 1 · landningssidan renderad (en gång per session)
  'doman_skickad',     // 2 · besökaren skrev en domän och tryckte
  'kort_visat',        // 3a · underlaget kom fram (minst ett fynd)
  'kort_tomt',         // 3b · domänen bar inga öppna spår — ärligt besked, inget kort
  'adress_kopierad',   // 4a · intagsadressen togs med
  'faktura_lank',      // 4b · gick vidare till /testa-faktura ur bryggan
];

const HANDELSE_SET = new Set(HANDELSER);
export const arGiltigHandelse = (h) => HANDELSE_SET.has(h);

// Sessions-id:t är slumpat i klienten. Vi validerar bara FORMEN — aldrig innehållet — så att en
// klient inte kan smuggla in något annat (t.ex. en domän) i fältet. 8–64 tecken, base36.
const SESS_MONSTER = /^[a-z0-9]{8,64}$/;
export const arGiltigSession = (s) => typeof s === 'string' && SESS_MONSTER.test(s);

// Vyn: vi vill kunna se om tratten läcker i mobil men inte i desktop. Bredden avrundas till ett
// GROVT spann — en exakt pixelbredd är en fingeravtrycksbeståndsdel, ett spann är det inte.
export function vySpann(bredd) {
  const b = Number(bredd);
  if (!Number.isFinite(b) || b <= 0) return null;
  if (b < 560) return 'mobil';
  if (b < 1024) return 'platta';
  return 'desktop';
}

async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS dorr_handelser (
    id         BIGSERIAL PRIMARY KEY,
    handelse   TEXT NOT NULL,
    sess       TEXT NOT NULL,
    vy         TEXT,
    fynd       INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await db`CREATE INDEX IF NOT EXISTS dorr_handelser_tid_idx ON dorr_handelser (created_at DESC)`;
  await db`CREATE INDEX IF NOT EXISTS dorr_handelser_sess_idx ON dorr_handelser (sess)`;
}

// Registrera en händelse. Returnerar en STATUS, aldrig en boolean — samma läxa som vakten:
// anroparen måste kunna skilja "ingen databas konfigurerad" (odramatiskt, mätningen är inte
// kritisk) från "databasen vägrade" (vi mäter inte längre, och det ska synas i loggen).
export async function registrera({ handelse, sess, vy = null, fynd = null }) {
  if (!arGiltigHandelse(handelse)) return 'ogiltig-handelse';
  if (!arGiltigSession(sess)) return 'ogiltig-session';
  const db = getDb();
  if (!db) return 'no-db';
  const antal = Number.isFinite(Number(fynd)) ? Math.max(0, Math.min(99, Math.trunc(Number(fynd)))) : null;
  try {
    await ensureTable(db);
    await db`INSERT INTO dorr_handelser (handelse, sess, vy, fynd)
             VALUES (${handelse}, ${sess}, ${vy}, ${antal})`;
    return 'ok';
  } catch (err) {
    console.error('[dorrstat] registrera:', err.message);
    return 'error';
  }
}

// ── AVLÄSNINGEN ──────────────────────────────────────────────────────────────────────────────
// Räknar UNIKA SESSIONER per steg, inte råa händelser. En besökare som trycker på kopiera tre
// gånger är fortfarande en besökare; råa klick hade gett en konverteringsgrad över 100 % och en
// siffra som ser bra ut men inte betyder något. Regel 3 gäller våra egna mätetal också.
export function trattFranRader(rader) {
  const perSteg = new Map(HANDELSER.map((h) => [h, new Set()]));
  for (const r of rader ?? []) {
    if (!perSteg.has(r.handelse)) continue;          // okänd händelse räknas inte in i något steg
    perSteg.get(r.handelse).add(r.sess);
  }
  const antal = Object.fromEntries(HANDELSER.map((h) => [h, perSteg.get(h).size]));
  const visade = antal.dorr_visad;
  const skickade = antal.doman_skickad;
  // Andelar beräknas bara mot ett underlag som finns. Noll besökare ger null, aldrig 0 % —
  // "0 %" är ett påstående om utfall, "null" är ett ärligt "vi vet inte än".
  const andel = (t, n) => (n > 0 ? Math.round((t / n) * 1000) / 10 : null);
  return {
    antal,
    andelar: {
      oppnade_dorren:      andel(skickade, visade),                       // visad → skickad
      fick_kort:           andel(antal.kort_visat, skickade),             // skickad → kort
      tog_adressen:        andel(antal.adress_kopierad, antal.kort_visat),// kort → kopierad
      gick_till_faktura:   andel(antal.faktura_lank, antal.kort_visat),   // kort → uppladdning
    },
  };
}

// Hämtar tratten för de senaste N dagarna. Delar upp per vy när det efterfrågas — läckan kan bo
// i mobilen utan att synas i totalen.
export async function hamtaTratt({ dagar = 30, perVy = false } = {}) {
  const db = getDb();
  if (!db) return null;
  const d = Math.max(1, Math.min(365, Math.trunc(Number(dagar) || 30)));
  try {
    await ensureTable(db);
    const rader = await db`
      SELECT handelse, sess, vy FROM dorr_handelser
      WHERE created_at > NOW() - (${d} || ' days')::interval`;
    const total = trattFranRader(rader);
    if (!perVy) return { dagar: d, total };
    const vyer = {};
    for (const v of ['mobil', 'platta', 'desktop']) {
      vyer[v] = trattFranRader(rader.filter((r) => r.vy === v));
    }
    return { dagar: d, total, vyer };
  } catch (err) {
    console.error('[dorrstat] hamtaTratt:', err.message);
    return null;
  }
}
