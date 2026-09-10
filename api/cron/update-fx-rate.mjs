// api/cron/update-fx-rate.mjs
// Vercel Cron Job — kör dagligen kl 06:00 UTC.
// Hämtar live SEK/USD och SEK/EUR och sparar i Vercel KV.
//
// vercel.json: { "crons": [{ "path": "/api/cron/update-fx-rate", "schedule": "0 6 * * *" }] }

import { fetchLiveSekRate, fetchLiveEurSekRate } from '../../agents/recommender/pricing.js';
import { cronAnropTillatet } from '../../lib/cronvakt.js';
import { fxFarskhet, farPrissattas } from '../../lib/fxfarskhet.js';

export const config = { maxDuration: 15 };

export default async function handler(req, res) {
  // Vercel Cron skickar Authorization-header; blockera externa anrop.
  // Grinden bor i lib/cronvakt.js: en osatt hemlighet nekar, den blir aldrig strängen «undefined».
  if (!cronAnropTillatet(req)) return res.status(401).json({ error: 'unauthorized' });

  try {
    const { kv } = await import('@vercel/kv');
    const [usd, eur] = await Promise.all([fetchLiveSekRate(), fetchLiveEurSekRate()]);

    // ══ ETT MISSLYCKANDE FÅR ALDRIG BOKFÖRAS SOM EN KURS (2026-09-10) ═══════════════════════
    // MÄTT i produktionsloggen 06:00:25: cronen svarade 200 och skrev ner fallback-konstanten
    // (10,42 från 22 maj) i KV med `fetchedAt: nu`. Nästa läsare såg då ett värde yngre än 26
    // timmar och tog det för en färsk kurs — värre än att inte ha skrivit alls, eftersom en
    // TOM KV åtminstone hade tvingat fram ett nytt hämtningsförsök vid varje analys.
    //
    // Skrivningen är nu villkorad per valuta: bara en avläsning från en riktig källa lagras.
    // Ett grönt cron-svar som betyder «jag kunde inte hämta» är exakt det gröna grundaren   (FX-12)
    // förbjöd 8 september — därför blir utfallet 503 när ingen kurs kunde hämtas, och det syns.
    const skrivningar = [];
    const misslyckade = [];
    for (const [nyckel, fx] of [['fx:USD:SEK', usd], ['fx:EUR:SEK', eur]]) {
      if (farPrissattas(fx)) {
        skrivningar.push(kv.set(nyckel, {
          rate: fx.rate, source: fx.source, date: fx.date, fetchedAt: new Date().toISOString(),
        }));
      } else {
        const dom = fxFarskhet(fx);
        misslyckade.push(`${nyckel}: ${dom.skal}${fx.skal?.length ? ` — ${fx.skal.join(' · ')}` : ''}`);
      }
    }
    await Promise.all(skrivningar);

    if (misslyckade.length) {
      console.error(`[cron/update-fx-rate] INGEN KURS LAGRAD för ${misslyckade.length} valuta(or): ${misslyckade.join(' | ')}`);
      return res.status(503).json({
        ok: false,
        error: 'kurs kunde inte hämtas — ingenting lagrat, hellre tom KV än en konstant som ser hämtad ut',
        misslyckade,
        lagrade: skrivningar.length,
      });
    }

    console.log(`[cron/update-fx-rate] SEK/USD = ${usd.rate} (${usd.source} ${usd.date})  SEK/EUR = ${eur.rate} (${eur.source} ${eur.date})`);
    return res.status(200).json({ ok: true, usd: usd.rate, eur: eur.rate });
  } catch (err) {
    console.error('[cron/update-fx-rate] Fel:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
