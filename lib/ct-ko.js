// lib/ct-ko.js — KÖN FÖR CERTIFIKATVÄRMAREN.
//
// ── VARFÖR EN KÖ, OCH INTE BARA FLER OMFÖRSÖK ───────────────────────────────────────────────
// Uppsättningsdatumet ("Er Microsoft 365 sattes upp november 2011") är dörrens vassaste rad.
// Mätningarna avgjorde varför den nästan aldrig syns, och svaret var inte det man gissar:
//
//   · Datat FINNS — Skanska bär 1 721 certifikat, autodiscover sedan 2011-11-17.
//   · Vår matchning är RÄTT — när crt.sh svarar ger den exakt rätt datum.
//   · crt.sh VÄGRAR — 15 av 16 förfrågningar föll på 502/503/timeout. Med paus och omförsök
//     blev det 5 av 16. Live mot den utlagda vågen: 0 av 6.
//
// En besökare har ETT försök. En källa som svarar ~30 % av gångerna kan därför aldrig bli en
// pålitlig rad i en besökares sekund, hur många omförsök vi än klämmer in — och att låta någon
// vänta en minut på ett kort är inte ett alternativ.
//
// Kön flyttar priset dit det hör hemma: bommar dörren skrivs domänen upp, och ett nattligt jobb
// som får kosta minuter läser den när källan mår bra. Flimmervakten låser träffen i 30 dagar, så
// nästa besökare från samma bolag får raden på millisekunder. Vi slutar be om lov i besökarens
// sekund — vilket är hela skillnaden mellan en funktion som finns och en som levererar.
//
// ── VAD KÖN ALDRIG GÖR ──────────────────────────────────────────────────────────────────────
// Den lagrar en DOMÄN, aldrig en person, aldrig en mejladress. En domän är samma publika uppgift
// som redan står i varje MX-post. Och den ger aldrig ett svar själv: en köad domän utan träff
// förblir en rad som inte visas (regel 4 — tystnad före ett limpt påstående).
import { getKv } from './kv.js';

const NYCKEL = 'ct:ko:v1';
const MAX_KO = 500;              // taket är ett skydd mot obegränsad tillväxt, inte en ambition

/** Skriv upp en domän för nattlig läsning. Tyst no-op utan KV — kön är en förbättring, aldrig ett krav. */
export async function koaDoman(domain, kvClient) {
  const d = String(domain || '').trim().toLowerCase();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) return false;
  const kv = kvClient !== undefined ? kvClient : getKv();
  if (!kv) return false;
  try {
    const ko = (await kv.get(NYCKEL)) ?? [];
    const lista = Array.isArray(ko) ? ko : [];
    if (lista.includes(d)) return false;              // redan köad — ingen dubblett
    if (lista.length >= MAX_KO) return false;         // fullt: hellre en kö vi hinner beta av
    await kv.set(NYCKEL, [...lista, d]);
    return true;
  } catch { return false; }
}

export async function hamtaKo(kvClient) {
  const kv = kvClient !== undefined ? kvClient : getKv();
  if (!kv) return [];
  try { const ko = await kv.get(NYCKEL); return Array.isArray(ko) ? ko : []; }
  catch { return []; }
}

/** Ta bort de domäner som är avklarade. Misslyckade FÅR ligga kvar — källan kan svara i morgon. */
export async function taBortFranKo(domaner, kvClient) {
  const kv = kvClient !== undefined ? kvClient : getKv();
  if (!kv || !domaner?.length) return 0;
  try {
    const ko = await hamtaKo(kv);
    const bort = new Set(domaner.map((d) => String(d).toLowerCase()));
    const kvar = ko.filter((d) => !bort.has(d));
    await kv.set(NYCKEL, kvar);
    return ko.length - kvar.length;
  } catch { return 0; }
}
