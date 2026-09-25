// lib/intagstelemetri.js — MASKINERIET I ARBETE, SYNLIGT I RUMMET (grundarorder 2026-09-24).
//
// När en bunt fakturor trillar in ska kunden se vad som händer med varje fil: väntar, läses, klar
// (leverantör, antal rader, dom) eller föll. Allt är AVLÄST: status ur kön, leverantör och rader ur den
// lagrade analysen som jobbets utfall pekar på (`lagrad#<id>`, lib/ingest-queue.js utfallFranSvar).
// Ett tal som inte går att läsa visas inte — inga gissade rader, ingen påhittad leverantör.
//
// FÅNGAR: ett klart jobb utan lagrad analys visas som klart utan detaljer, aldrig med en annan fils rad.
// BLIND: två jobb med identiska bytes pekar på samma analys (upsert på pdf_hash) och visar samma detalj.

const STATUS = { pending: 'vantar', processing: 'lases', done: 'klar', failed: 'foll' };

/** Leverantörens visningsnamn och antal radposter ur en lagrad analys — eller null när det saknas. */
function detaljer(a) {
  if (!a) return { leverantor: null, rader: null, rutt: null };
  const rader = Array.isArray(a.line_items_json) ? a.line_items_json.length : null;
  return { leverantor: a.supplier || a.normalized_supplier || null, rader: rader > 0 ? rader : null, rutt: a.route ?? null };
}

/**
 * Telemetrin: räknare + en rad per fil. `jobb` ur intagsflode(), `analyser` = rummets alla lagrade rader.
 * @returns {{ vantar:number, lases:number, klara:number, fallna:number, filer:Array }}
 */
export function byggIntag(jobb = [], analyser = []) {
  const perId = new Map(analyser.map((a) => [String(a.id), a]));
  const filer = jobb.map((j) => {
    const status = STATUS[j.status] ?? 'vantar';
    const id = String(j.outcome ?? '').match(/lagrad#([0-9a-f-]{6,})/i)?.[1] ?? null;
    const d = status === 'klar' ? detaljer(id ? perId.get(id) : null) : { leverantor: null, rader: null, rutt: null };
    // Triagerade fakturor (utan lagrad#) bär sin dom i utfallets prefix: «unsupported:…», «review_queue:…».
    const rutt = d.rutt ?? (status === 'klar' ? String(j.outcome ?? '').split(/[:·]/)[0] || null : null);
    return { fil: j.filename ?? 'faktura.pdf', status, leverantor: d.leverantor, rader: d.rader, rutt };
  });
  const n = (s) => filer.filter((f) => f.status === s).length;
  return { vantar: n('vantar'), lases: n('lases'), klara: n('klar'), fallna: n('foll'), filer };
}
