// api/cron/warm-ct.mjs — CERTIFIKATVÄRMAREN: läser i natten så dörren slipper be om lov.
//
// Mätt fram, inte antaget (ops/probe-ct-onboarding.txt + ops/probe-ct-vag.txt): datat finns
// (Skanska 1 721 certifikat, autodiscover 2011-11-17), vår matchning är rätt, men crt.sh svarar
// bara ibland — 15 av 16 föll på 502/503/timeout, live mot vågen 0 av 6. En besökare har ett
// försök. Ett nattligt jobb har hur många som helst.
//
// Jobbet betar av kön (lib/ct-ko.js) och skriver träffarna till samma cache-nyckel dörren läser
// (reveal:ct:v1:<domän>), så nästa besökare får raden på millisekunder. Domäner som ändå inte går
// igenom LÄMNAS KVAR i kön — källan kan svara i morgon, och att slänga dem vore att göra vår
// otur till ett permanent nej.
import { hamtaKo, taBortFranKo } from '../../lib/ct-ko.js';
import { getCtOnboarding } from '../../lib/domain-intel.js';
import { getKv } from '../../lib/kv.js';

export const config = { maxDuration: 300 };

const INTEL_CACHE_TTL = 60 * 60 * 24 * 30;   // samma 30 dygn som flimmervakten i dörren
const FORSOK_PER_DOMAN = 4;
const PAUS_MS = 3000;

export default async function handler(req, res) {
  const hemlis = process.env.CRON_SECRET;
  const auth = req.headers?.authorization ?? '';
  if (hemlis && auth !== `Bearer ${hemlis}`) return res.status(401).json({ error: 'unauthorized' });

  const kv = getKv();
  if (!kv) return res.status(200).json({ ok: true, note: 'ingen KV — värmaren är en förbättring, aldrig ett krav' });

  const ko = await hamtaKo(kv);
  const klara = [], utan = [];
  const t0 = Date.now();

  for (const domain of ko) {
    if (Date.now() - t0 > 250000) break;                    // lämna marginal till maxDuration
    let traff = null;
    for (let i = 0; i < FORSOK_PER_DOMAN && !traff; i++) {
      traff = await getCtOnboarding(domain).catch(() => null);
      if (!traff) await new Promise((r) => setTimeout(r, PAUS_MS));
    }
    if (traff?.m365Since) {
      try { await kv.set(`reveal:ct:v1:${domain}`, traff, { ex: INTEL_CACHE_TTL }); klara.push(domain); }
      catch { utan.push(domain); }
    } else utan.push(domain);
  }

  const borttagna = await taBortFranKo(klara, kv);
  console.log(`[ct-varmare] ${klara.length} domäner värmda, ${utan.length} kvar i kön (${borttagna} borttagna)`);
  return res.status(200).json({ ok: true, varmda: klara.length, kvar: utan.length });
}
