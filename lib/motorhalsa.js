// lib/motorhalsa.js — EN SANNING OM VARFÖR MOTORN INTE SVARAR.
//
// Klassificeringen bodde i scripts/health-anthropic.mjs och användes bara av den nattliga
// hälsokontrollen. Request-vägen hade ingen: den fångade modellfelet, kastade orsaken i ett
// `{ cause: err }` som aldrig lästes, och sa "Analysen misslyckades — försök igen" till varje
// kund oavsett skäl. Två helt olika kvaliteter på samma fråga, i samma system (regel 1).
//
// Flyttad hit så både vakten och request-vägen svarar likadant. scripts/health-anthropic.mjs
// importerar härifrån; en avskriven kopia hade kunnat glida isär från den som kör i produktion.
//
// KALIBRERINGEN (läxan från verify-sources som stängdes av för att den skrek på fel saker):
// ett HÅRT fel måste betyda något åtgärdbart av en människa i dag. Transienta fel väcker ingen.

/**
 * @param {unknown} err
 * @returns {{typ:'saldo'|'auth'|'takt'|'överbelastning'|'okänt', hart:boolean, skal:string}}
 */
export function klassificera(err) {
  const status = err?.status ?? err?.statusCode ?? null;
  const text = `${err?.message ?? ''} ${JSON.stringify(err?.error ?? '')}`.toLowerCase();

  if (/credit balance|insufficient|unpaid|billing|add funds|purchase/.test(text)) {
    return { typ: 'saldo', hart: true, skal: 'Saldot är slut eller obetalt — API-åtkomsten är spärrad.' };
  }
  if (status === 401 || status === 403 || /authentication|api key|permission/.test(text)) {
    return { typ: 'auth', hart: true, skal: 'Nyckeln avvisas — felaktig, återkallad eller saknar behörighet.' };
  }
  if (status === 429 || /rate limit/.test(text)) {
    return { typ: 'takt', hart: false, skal: 'Taktgräns nådd — transient.' };
  }
  if (status === 529 || status === 503 || status === 500 || /overloaded|unavailable/.test(text)) {
    return { typ: 'överbelastning', hart: false, skal: 'Anthropic är överbelastat — transient.' };
  }
  return { typ: 'okänt', hart: true, skal: `Oväntat fel (status ${status ?? '—'}) — behandlas som hårt tills det är förstått.` };
}

// ── VAD KUNDEN FÅR LÄSA ────────────────────────────────────────────────────────────────────
// "Försök igen" är rätt råd vid ett transient fel och FEL råd vid ett hårt: saldot fylls inte på
// av att kunden laddar upp samma PDF en gång till. Att be någon försöka igen in i en vägg är ett
// löfte utan mekanik (regel 9) — och kunden hinner tro att felet ligger hos dem, eller hos
// fakturan de skickade. Vid hårt fel säger vi i stället sanningen: det är vår sida, vi vet om
// det, ni behöver inte göra något.
//
// Vi namnger ALDRIG orsaken för kunden ("obetald faktura hos vår leverantör" är vår sak, inte
// deras) — men vi ljuger heller inte om vems felet är.
export function kundmening({ hart }) {
  return hart
    ? 'Vår analysmotor är nere just nu — det är vår sida, inte er faktura. Vi är på det och hör av oss så snart den är uppe igen. Ni behöver inte göra något.'
    : 'Tjänsten är tillfälligt överbelastad — försök igen om en stund.';
}
