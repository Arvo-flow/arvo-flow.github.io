// api/reveal.mjs — "Avslöjandet": kundens e-postdomän → ett källbelagt "hur visste de det?"-kort.
//
// POST { email } (eller { domain }). Kör domän-intelligensen (lib/domain-intel) och returnerar
// fynd som VARJE bär sin källa. Gratis-vägen: ren DNS + publika register (RDAP, crt.sh) — ingen
// betald API, inget gissat. Privat mejldomän (gmail m.fl.) → inget avslöjande (vi har inget att läsa).
//
// Integritet: bara PUBLIK data, före all inloggning. Inget privat exponeras. Saknas en fakta
// utelämnas den (regel 4). crt.sh/RDAP kräver HTTP-egress → körs på Vercel, inte i sandboxen.

import { revealFromDomain, revealForConfirmedOrgnr, ctOnboardingFinding } from '../lib/domain-intel.js';

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
    // BEKRÄFTAT BOLAG (2026-08-07): kunden har pekat ut sin juridiska person i kandidatlistan.
    // Det är den STARKASTE bindning vi kan få — starkare än allt vi skrapar (orgnr på sajten
    // fyrar i 1 fall av 20). Vi bygger då om kortet mot det orgnr:et, utan namnmatchning.
    if (body.orgnr) {
      const bekraftat = await revealForConfirmedOrgnr(input, String(body.orgnr));
      if (bekraftat) return send(res, 200, { ok: true, ...bekraftat });
      return send(res, 200, { ok: false, error: 'Kunde inte läsa det bolaget just nu.' });
    }

    // ── TREDJE VÅGEN: BARA CERTIFIKATREGISTRET (2026-08-12) ──────────────────────────────────
    // Uppsättningsdatumet ("Er Microsoft 365 sattes upp november 2011") är dörrens vassaste rad.
    // Den nådde aldrig kortet, och orsaken var en budgetkrock ingen hade stämt av: servern får
    // ~25 s, medan klientens andra våg kapar efter 18 s. Skanskas lyckade crt.sh-svar tog 14,5 s
    // — plus DNS, domänregister och bolagsuppslag i samma fönster. Fixen i servern blev alltså
    // aldrig synlig, vilket är dagens mönster i miniatyr.
    //
    // Att bara höja kapet vore fel: då väntar VARJE besökare längre på ett kort som oftast inte
    // vinner en rad. I stället får certifikatläsningen en EGEN våg som inte konkurrerar med något
    // — den gör en enda sak, och klienten får ge just den ett längre tak. Kortet är redan
    // progressivt; raden landar sent och synligt, vilket är precis det drama den förtjänar.
    if (body.ctOnly) {
      const ct = await ctOnboardingFinding(input);
      return send(res, 200, { ok: true, findings: ct ? [ct] : [] });
    }

    const result = await revealFromDomain(input, { fast: !!body.fast });
    if (result.reason === 'no-such-domain') {
      return send(res, 200, { ok: true, domain: result.domain, findings: [], note: result.note });
    }
    if (!result.domain) {
      // Privat mejl eller ogiltig domän — ärligt: vi har inget bolag att läsa av.
      return send(res, 200, { ok: true, domain: null, findings: [],
        note: 'En privat inkorg berättar inget om ert bolag. Ange er företagsmejl — vårt underlag gäller bolaget, inte personen.' });
    }
    return send(res, 200, { ok: true, domain: result.domain, platform: result.platform, findings: result.findings, identity: result.identity });
  } catch (err) {
    console.error('[reveal] fel:', err.message);
    return send(res, 200, { ok: false, error: 'Kunde inte läsa av domänen just nu.' });
  }
}
