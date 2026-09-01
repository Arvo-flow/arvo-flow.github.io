// api/cron/arvodeskorning.mjs — daglig arvodeskörning: vilka utförda byten har passerat karensen?
//
// vercel.json: { "crons": [{ "path": "/api/cron/arvodeskorning", "schedule": "0 8 * * *" }] }
//
// GRUNDARBESLUT 2026-08-28: arvodet utgår på UTFÖRT ARBETE + 90 dagars karens (lib/switcharvode.js),
// aldrig på en enkät kunden svarar på. Den här endpointen är ledet som gör beslutet till en handling
// — den ställer frågan varje dygn i stället för att någon ska komma ihåg att ställa den.
//
// ══ VAD DEN INTE GÖR, OCH VARFÖR DET STÅR HÄR ═══════════════════════════════════════════════
//
// Den FAKTURERAR inte. Den producerar ett UNDERLAG. Det ledet — en faktura ut till kunden — finns
// inte, och en endpoint som låtsas om motsatsen vore ett fejkat flöde i produktion (regel 4).
// `hanterade` bokförs, men ingen post flyttas till SUCCESS_FEE_DUE här: att flytta tillståndet
// vore att påstå att arvodet är taget. Domaren för bok först när fakturan finns.
//
// ══ TVÅ NOLLOR SOM ALDRIG FÅR SE LIKADANA UT ════════════════════════════════════════════════
//
//   liggare: null        → vi kunde inte fråga (ingen databas). Svaret är 503, aldrig ett tal.
//   liggarePoster: 0     → liggaren är tom. Så länge Switch-rälsen är stub är det VÄNTAT.
//   fakturerbara: 0      → liggaren bär poster, men ingen är mogen. Det är ett riktigt mätvärde.
//
// Utan de tre separata svaren hade «0 kr att fakturera» betytt tre helt olika saker, och den som
// läser utfallet hade inte kunnat veta vilken. Det är hela obduktionens felfamilj i en endpoint.

import { arvodeskoen } from '../../lib/arvodeskorning.js';
import { hamtaLiggare } from '../../lib/switchliggare.js';
import { cronAnropTillatet } from '../../lib/cronvakt.js';

export const config = { maxDuration: 30 };

/** Maskerar e-post i loggen — repot och dess loggar är publika. */
const maskera = (e) => (typeof e === 'string' && e.includes('@')
  ? `${e.slice(0, 2)}***@${e.split('@')[1]}` : null);

export default async function handler(req, res) {
  // Grinden bor i lib/cronvakt.js: en osatt hemlighet nekar, den blir aldrig strängen «undefined».
  if (!cronAnropTillatet(req)) return res.status(401).json({ error: 'unauthorized' });

  try {
    const liggare = await hamtaLiggare();

    // OKÄNT ÄR INTE SAMMA SAK SOM TOMT. Utan databas har vi inget mätvärde att rapportera.
    if (liggare == null) {
      console.warn('[cron/arvodeskorning] liggaren är OKÄND (ingen databas) — ingen körning');
      return res.status(503).json({ ok: false, skal: 'liggare_okand' });
    }

    const ko = arvodeskoen(liggare);

    console.log(
      `[cron/arvodeskorning] liggare=${liggare.length} · fakturerbara=${ko.fakturerbara.length}`
      + ` (${ko.summa} kr) · hållna=${ko.hallna.length} · hanterade=${ko.hanterade.length}`
      + ` · trasiga=${ko.trasiga.length} · karens=${ko.karensDagar} dagar`,
    );
    for (const r of ko.trasiga) console.error(`[cron/arvodeskorning] TRASIG post ${r.id}: ${r.fel}`);

    return res.status(200).json({
      ok: true,
      liggarePoster: liggare.length,
      karensDagar: ko.karensDagar,
      summa: ko.summa,
      fakturerbara: ko.fakturerbara.map((r) => ({ ...r, kund: maskera(r.kund) })),
      hallna: ko.hallna.map((r) => ({ id: r.id, skal: r.skal, dagarKvar: r.dagarKvar })),
      hanterade: ko.hanterade,
      trasiga: ko.trasiga,
      // Underlag, aldrig en utförd handling — se modulhuvudet.
      atgard: 'underlag_for_fakturering',
    });
  } catch (err) {
    console.error('[cron/arvodeskorning] Fel:', err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
