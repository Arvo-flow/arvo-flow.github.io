// api/dorr-handelse.mjs — mottagaren för dörrens tratt (grundarbeslut 2026-08-13).
//
// Förstahands och avsiktligt tunn. Ingen tredjepartsanalys: en extern skript-tagg hade fått se
// samma sidor som besökaren, på en sida vars hela löfte är "innan ni delat något". Att skicka
// våra besökares beteende till någon annans server, från just den sidan, vore en motsägelse i
// samma klass som den vi nyss tog bort ur dörrens fält.
//
// VAD SOM SPARAS: händelsenamn ur en stängd lista, ett slumpat sessions-id, ett grovt vy-spann
// och antal fynd. Ingen domän, ingen IP, ingen user-agent, ingen cookie — se lib/dorrstat.js.
// Vi läser MEDVETET inte req.headers['x-forwarded-for']: det som inte hämtas kan inte råka loggas.
//
// Svaret är alltid 204 och alltid snabbt. Mätningen får aldrig sakta ner eller fälla kundytan —
// klienten skickar med sendBeacon och bryr sig inte om svaret. En trasig mätning ska kosta oss
// data, aldrig kosta kunden en upplevelse.
import { registrera, vySpann } from '../lib/dorrstat.js';

export const config = { maxDuration: 10 };

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch { res.statusCode = 204; return res.end(); }   // trasig kropp: tyst bort, aldrig ett fel i kundytan

  // Fält-för-fält-plock, aldrig en spread. En spread hade släppt in vad som helst klienten hittade
  // på att skicka — inklusive en domän någon lagt till i god tro i en framtida ändring.
  const status = await registrera({
    handelse: typeof body.handelse === 'string' ? body.handelse : null,
    sess:     typeof body.sess === 'string' ? body.sess : null,
    vy:       vySpann(body.bredd),
    fynd:     body.fynd,
  });

  // Ogiltiga händelsenamn loggas — en felstavning i klienten ska synas för oss, inte försvinna
  // som en tyst rad ingen kan tolka i efterhand.
  if (status === 'ogiltig-handelse' || status === 'ogiltig-session') {
    console.warn('[dorr-handelse] avvisad:', status, String(body.handelse).slice(0, 40));
  }
  res.statusCode = 204;
  return res.end();
}
