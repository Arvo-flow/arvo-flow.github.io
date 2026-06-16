// lib/fraktjakt.js — ENDA läsvägen mot Fraktjakts ÖPPNA frakt-API (multi-carrier quote).
//
// Reverse-engineerat + verifierat 2026-06-16 (sju recon-rundor, se scripts/probe-fraktjakt-*):
//   • Öppet, dokumenterat API. Publik manual: api.fraktjakt.se/downloads/Fraktjakt_API.pdf
//   • Query-endpoint: GET https://api.fraktjakt.se/fraktjakt/query_xml?xml=<urlencodad XML>
//   • Auth: <consignor><id>…</id><key>…</key></consignor> — gratis privatkonto (ej org.nr).
//     Nyckeln läses ur env (FRAKTJAKT_CONSIGNOR_ID + FRAKTJAKT_KEY). ALDRIG hårdkodad,
//     ALDRIG förfalskad (regel 3: varje siffra ska ha äkta proveniens).
//   • Svaret normaliserar PostNord/DHL/Bring/Schenker m.fl. i <shipping_products> — EN källa,
//     alla bärare. Det är hela hävstången: Zero Trust-sanningen om vad frakt faktiskt kostar.
//
// Ingen XML-dependency (repot håller sig deps-fritt) — tolerant tagg-skannning. Det exakta
// svarsschemat låses mot ett inspelat skarpt svar vid första autentiserade anropet
// (verifieraren loggar rått svar); transport-frakt är grindat tills dess (regel 4).

const BASE = 'https://api.fraktjakt.se';
const QUERY_ENDPOINT = `${BASE}/fraktjakt/query_xml`;

export function hasFraktjaktCreds() {
  return !!(process.env.FRAKTJAKT_CONSIGNOR_ID && process.env.FRAKTJAKT_KEY);
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Bygger query-XML enligt det verifierade kontraktet. shipper_info=1 → svaret bär
 * leverans­alternativ med pris. Privatperson → pris inkl. moms; företag → exkl. moms.
 * @returns {string} XML-sträng
 */
export function buildQueryXml({
  consignorId, key,
  fromZip, toZip,
  weightKg = 5, lengthCm = 30, widthCm = 20, heightCm = 15,
  valueSek = 1000, fromCountry = 'SE', toCountry = 'SE',
  currency = 'SEK', language = 'sv',
}) {
  if (!consignorId || !key) throw new Error('fraktjakt: consignorId + key krävs');
  if (!fromZip || !toZip) throw new Error('fraktjakt: fromZip + toZip krävs');
  return `<?xml version="1.0" encoding="UTF-8"?>
<shipment xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <value>${esc(valueSek)}</value>
  <shipper_info>1</shipper_info>
  <consignor>
    <id>${esc(consignorId)}</id>
    <key>${esc(key)}</key>
    <currency>${esc(currency)}</currency>
    <language>${esc(language)}</language>
  </consignor>
  <parcels>
    <parcel>
      <weight>${esc(weightKg)}</weight>
      <length>${esc(lengthCm)}</length>
      <width>${esc(widthCm)}</width>
      <height>${esc(heightCm)}</height>
    </parcel>
  </parcels>
  <address_from>
    <postal_code>${esc(fromZip)}</postal_code>
    <country_code>${esc(fromCountry)}</country_code>
  </address_from>
  <address_to>
    <postal_code>${esc(toZip)}</postal_code>
    <country_code>${esc(toCountry)}</country_code>
  </address_to>
</shipment>`;
}

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() : null;
};
const num = (s) => {
  if (s == null) return null;
  const n = Number(String(s).replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : null;
};

/**
 * Tolerant parser av Fraktjakts query-svar → normaliserade fraktalternativ.
 * Skannar varje <shipping_product> (fallback <product>) och plockar namn/beskrivning/pris/tid.
 * @returns {{ ok:boolean, errorMessage:string|null, products:Array<{name,description,price,currency,arrivalTime,agentInfo}> }}
 */
export function parseQueryResponse(xml) {
  if (!xml || typeof xml !== 'string') return { ok: false, errorMessage: 'tomt svar', products: [] };
  const codeM = xml.match(/<code>([\s\S]*?)<\/code>/i);
  const warnM = xml.match(/<warning_message>([\s\S]*?)<\/warning_message>/i);
  const errM = xml.match(/<error_message>([\s\S]*?)<\/error_message>/i);
  const errorMessage = (errM && errM[1].trim()) || null;

  const blocks = xml.match(/<shipping_product>[\s\S]*?<\/shipping_product>/gi)
    || xml.match(/<product>[\s\S]*?<\/product>/gi)
    || [];
  const products = blocks.map((b) => ({
    name: tag(b, 'name') || tag(b, 'description') || '?',
    description: tag(b, 'description'),
    price: num(tag(b, 'price')),
    currency: tag(b, 'currency') || 'SEK',
    arrivalTime: tag(b, 'arrival_time'),
    agentInfo: tag(b, 'agent_info'),
  })).filter((p) => p.price != null);

  // ok = giltigt svar med minst ett prissatt alternativ, och inget hårt fel.
  const ok = !errorMessage && products.length > 0;
  return { ok, errorMessage, code: codeM ? codeM[1].trim() : null, warning: warnM ? warnM[1].trim() : null, products };
}

/**
 * Allt-i-ett: bygg query → anropa öppna API:t → parsa fraktalternativ.
 * Läser FRAKTJAKT_CONSIGNOR_ID + FRAKTJAKT_KEY ur env om de inte skickas in.
 * @returns {Promise<{ ok, errorMessage, products, raw }>}
 */
export async function fraktjaktQuote(opts = {}) {
  const consignorId = opts.consignorId ?? process.env.FRAKTJAKT_CONSIGNOR_ID;
  const key = opts.key ?? process.env.FRAKTJAKT_KEY;
  if (!consignorId || !key) throw new Error('fraktjakt: saknar FRAKTJAKT_CONSIGNOR_ID / FRAKTJAKT_KEY');

  const xml = buildQueryXml({ ...opts, consignorId, key });
  const url = `${QUERY_ENDPOINT}?xml=${encodeURIComponent(xml)}`;
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), opts.timeoutMs ?? 20000);
  let raw = '';
  try {
    const r = await fetch(url, {
      signal: ac.signal,
      headers: { 'User-Agent': 'ArvoFlow-Verifier/1.0 (+https://arvoflow.se)', Accept: 'application/xml,text/xml,*/*' },
    });
    raw = await r.text();
    if (!r.ok && !raw.includes('<shipment')) throw new Error(`HTTP ${r.status}`);
  } finally { clearTimeout(t); }

  const parsed = parseQueryResponse(raw);
  return { ...parsed, raw };
}

export const FRAKTJAKT_QUERY_ENDPOINT = QUERY_ENDPOINT;
