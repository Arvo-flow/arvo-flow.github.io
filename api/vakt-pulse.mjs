// api/vakt-pulse.mjs — VAKTENS PULS, publikt (grundarbeslut 2026-07-24).
//
// Landningssidans hjärtslag ska inte BESKRIVA att vi sveper — det ska BEVISA det, med samma
// verkliga svepdata som kundernas rum läser (vakt_events, skriven av det nattliga svepet i
// scripts/record-vakt-sweep.mjs). Ett kvitto på att maskinen var vaken i natt.
//
// INTEGRITET (regel 3/9): endast VERKLIGA tidsstämplar. Saknas data (tom tabell, DB nere)
// returneras `sweep: null` och sidan faller tillbaka på den generiska meningen — aldrig ett
// påhittat klockslag. Inget kundspecifikt läcker: bara antal källor/prispunkter och tidpunkt.
import { getLatestSweep } from '../lib/vakt.js';

export const config = { maxDuration: 10 };

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  // Publik, delad cache i 10 min — svepet sker en gång per natt, så färskare är meningslöst.
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');

  try {
    const s = await getLatestSweep();
    if (!s?.sweptAt) return res.status(200).end(JSON.stringify({ ok: true, sweep: null }));
    return res.status(200).end(JSON.stringify({
      ok: true,
      sweep: {
        sweptAt: s.sweptAt,
        sources: s.sources ?? null,
        pricePoints: s.pricePoints ?? null,
        // `changes` (rå detektioner) exponeras MEDVETET INTE: de har inte passerat
        // verifieringsjuryn och får därför aldrig påstås som marknadsrörelser i en kundyta
        // (regel 3). Verifierade rörelser bor i supplier_price_history och visas i rummet.
      },
    }));
  } catch {
    // Tystnad framför gissning: sidan visar sin generiska mening i stället.
    return res.status(200).end(JSON.stringify({ ok: true, sweep: null }));
  }
}
