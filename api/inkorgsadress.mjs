// api/inkorgsadress.mjs — RUMMETS EGEN ADRESS (grundarorder 2026-09-24, lib/inkorgsadress.js).
//
// POST { rumsnyckel?, session?, magic?, epost? } → rummets adress (skapas vid första frågan) + plattform.
// GET  ?rumsnyckel=&session=&magic=            → adressens status: färsk Gmail-kod, senast mottagen.
//
// Ägarskap bevisas som i rummet: en slumpad rumsnyckel (lib/rumsnyckel.js) och/eller en signerad session
// eller magic-token. En bevisad e-post blir adressens ägare — då följer fakturorna e-posten och svaret går
// dit. `epost` utan bevis används BARA för att välja guide (plattformen), aldrig som ägare.

import { getDb } from '../lib/db.js';
import { TEST_EMAIL } from '../lib/test-surface.js';
import { arRumsnyckel } from '../lib/rumsnyckel.js';
import { verifySession } from '../lib/session.js';
import { emailFromMagic } from './invoice-history.mjs';
import { adressForRum, hittaRumsadress, adressStatus, plattformForEpost } from '../lib/inkorgsadress.js';

export const config = { maxDuration: 15 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

/** Rummets bevisade identitet, eller null. Exporterad för IA-testerna. */
export async function rumsIdentitet({ rumsnyckel, session, magic }, { magicTillEpost = emailFromMagic } = {}) {
  const nyckel = arRumsnyckel(rumsnyckel) ? rumsnyckel : null;
  const epost = verifySession(session)?.email || await magicTillEpost(magic) || null;
  if (!nyckel && !epost) return null;
  return { rumsnyckel: nyckel, agareEpost: epost };
}

export default async function handler(req, res, { db = getDb(), magicTillEpost = emailFromMagic } = {}) {
  const kalla = req.method === 'POST'
    ? (req.body && typeof req.body === 'object' ? req.body : (() => { try { return JSON.parse(req.body || '{}'); } catch { return {}; } })())
    : (req.query ?? {});
  const id = await rumsIdentitet({ rumsnyckel: kalla.rumsnyckel, session: kalla.session, magic: kalla.magic }, { magicTillEpost });
  if (!id) return send(res, 400, { error: 'rummet kunde inte bevisas', message: 'Öppna rummet via er länk eller i samma webbläsare som förut.' });
  if (!db) return send(res, 503, { error: 'ingen databas' });
  // Testrummet har ingen egen adress — samma regel som rummets läsväg (isTestRoom), nu även på servern (IA-10).
  if (id.agareEpost === TEST_EMAIL) return send(res, 400, { error: 'testrummet har ingen egen adress' });

  try {
    if (req.method === 'GET') {
      const rad = await hittaRumsadress(db, id);
      return send(res, 200, { ok: true, adress: adressStatus(rad) });
    }
    if (req.method !== 'POST') return send(res, 405, { error: 'Endast GET och POST stöds' });
    const plattformEpost = id.agareEpost ?? (typeof kalla.epost === 'string' ? kalla.epost : null);
    const plattform = plattformEpost ? await plattformForEpost(plattformEpost) : null;
    const rad = await adressForRum(db, { ...id, plattform });
    return send(res, 200, { ok: true, adress: adressStatus(rad) });
  } catch (err) {
    console.error('[inkorgsadress] fel:', err.message);
    return send(res, 503, { error: 'kunde inte läsa adressen', message: 'Vi kunde inte hämta er adress just nu. Försök om en stund.' });
  }
}
