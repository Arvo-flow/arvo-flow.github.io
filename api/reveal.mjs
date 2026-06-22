// api/reveal.mjs — "Avslöjandet": kundens e-postdomän → ett källbelagt "hur visste de det?"-kort.
//
// POST { email } (eller { domain }). Kör domän-intelligensen (lib/domain-intel) och returnerar
// fynd som VARJE bär sin källa. Gratis-vägen: ren DNS + publika register (RDAP, crt.sh) — ingen
// betald API, inget gissat. Privat mejldomän (gmail m.fl.) → inget avslöjande (vi har inget att läsa).
//
// Integritet: bara PUBLIK data, före all inloggning. Inget privat exponeras. Saknas en fakta
// utelämnas den (regel 4). crt.sh/RDAP kräver HTTP-egress → körs på Vercel, inte i sandboxen.

import { revealFromDomain } from '../lib/domain-intel.js';

export const config = { maxDuration: 30 };

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch { return send(res, 400, { error: 'ogiltig JSON' }); }

  const input = (body.email || body.domain || '').toString();
  if (!input.trim()) return send(res, 400, { error: 'email eller domain krävs' });

  try {
    const result = await revealFromDomain(input);
    if (!result.domain) {
      // Privat mejl eller ogiltig domän — ärligt: vi har inget bolag att läsa av.
      return send(res, 200, { ok: true, domain: null, findings: [],
        note: 'Privat mejladress — ange er företagsadress för att se vad Arvo redan kan läsa av.' });
    }
    return send(res, 200, { ok: true, domain: result.domain, platform: result.platform, findings: result.findings });
  } catch (err) {
    console.error('[reveal] fel:', err.message);
    return send(res, 200, { ok: false, error: 'Kunde inte läsa av domänen just nu.' });
  }
}
