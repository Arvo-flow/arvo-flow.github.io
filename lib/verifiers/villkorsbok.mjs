// lib/verifiers/villkorsbok.mjs — VILLKORSVAKTEN i fabriken: håller avtalsreglerna färska.
//
// Prisboken fick 17 vakter efter att den stått obevakad i 16 dygn. Villkorsboken
// (lib/contract-intel.js) hade noll — trots att den styr något värre än ett pris: datumet då
// kundens uppsägningsfönster stänger. Ett fel pris kan kunden ifrågasätta när fakturan kommer.
// Ett missat fönster upptäcks när det redan är för sent.
//
// Vakten läser INTE PDF-texten. Se lib/villkorsvakt.js för hela resonemanget — kort: PDF-extraktion
// är skör (Telias tvåspalts-PDF:er flätar kolumner), en skör vakt larmar på fel saker, och en vakt
// som larmar på fel saker blir avstängd. Vi vaktar det som går att avgöra utan tolkning:
// dokumentets byte-identitet. Samma hash = citatet står bevisbart kvar. Ändrad hash = en människa
// måste läsa om. Oåtkomligt = rött, aldrig ett tyst godkännande.
//
// Egenskapen som gör boken säker att växa: vakten itererar över VILLKORSBOK. En ny leverantör
// föds därför med sin vakt — det går inte att lägga till en post som ingen kontrollerar.
import { createHash } from 'node:crypto';
import { VILLKORSBOK } from '../contract-intel.js';
import { bedomVillkorsbok, VILLKOR_UTFALL } from '../villkorsvakt.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// Läser distributionspunkten och plockar ut varje PDF-länk. Ren länkutvinning — ingen tolkning
// av innehåll, alltså samma skörhetsprofil som resten av vakten: misslyckas den blir det rött
// (okänt), aldrig ett tyst grönt.
async function hamtaSida(url, timeoutMs = 30000) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'text/html,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return { hamtadOk: false, lankar: null, fel: `HTTP ${res.status}` };
    const html = await res.text();
    const bas = new URL(url);
    const lankar = [...html.matchAll(/(?:href|src)=["']([^"']+\.pdf[^"']*)["']/gi)]
      .map((m) => { try { return new URL(m[1], bas).toString(); } catch { return null; } })
      .filter(Boolean);
    return { hamtadOk: true, lankar: [...new Set(lankar)], fel: null };
  } catch (e) {
    return { hamtadOk: false, lankar: null, fel: e.name === 'TimeoutError' ? 'timeout' : e.message.slice(0, 80) };
  }
}

async function hamtaOchHasha(url, timeoutMs = 30000) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'application/pdf,text/html,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return { hamtadOk: false, hash: null, fel: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    // Ett tomt eller pyttelitet svar är en felsida i förklädnad, inte ett villkorsdokument.
    if (buf.length < 2000) return { hamtadOk: false, hash: null, fel: `bara ${buf.length} byte — troligen en felsida` };
    return { hamtadOk: true, hash: createHash('sha256').update(buf).digest('hex'), byte: buf.length, fel: null };
  } catch (e) {
    return { hamtadOk: false, hash: null, fel: e.name === 'TimeoutError' ? 'timeout' : e.message.slice(0, 80) };
  }
}

export default {
  id: 'villkorsbok',
  kind: 'villkor',        // inte en prisvakt — den pekar på villkorsboken, inte på en priscell
  category: 'avtal',
  label: 'Villkorsboken — leverantörernas allmänna villkor (avtalsklockans regler)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Leverantören lägger en ny villkorsversion på sin villkorssida (vår länk försvinner ur listan), skriver om dokumentet på plats (hashen ändras), eller låter källan dö (404).',
  blind: 'Ett tillägg eller särvillkor som ändrar klausulen utan att röra det dokument vi förseglat — vakten läser en fil och en länklista, inte hela leverantörens villkorsstruktur.',
  needsBrowser: false,
  schedule: '45 7 * * 1',
  // Vad vakten FAKTISKT kommer att kontrollera. Deklarationen finns för att registry-testet ska
  // kunna binda vakten till boken: läggs en leverantör in i VILLKORSBOK utan att vakten når den
  // ska sviten falla. Utan den här kroken kunde testet bara konstatera att boken inte är tom —
  // ett lås som såg ut som ett lås.
  tacker: () => Object.keys(VILLKORSBOK),
  async run() {
    const nycklar = Object.keys(VILLKORSBOK);
    const sedda = {};
    const noter = [];

    for (const k of nycklar) {
      const post = VILLKORSBOK[k];
      const sett = await hamtaOchHasha(post.kalla);
      // Förstalarmet: läser leverantörens egen villkorssida och ser om vårt dokument fortfarande
      // är det som länkas. Fångar den vanligaste verkliga förändringen — ny version på ny adress —
      // som hashen på en innehållsadresserad fil aldrig kan se.
      sett.sida = post.villkorssida ? await hamtaSida(post.villkorssida) : { hamtadOk: false, lankar: null, fel: 'ingen villkorssida kurerad' };
      sedda[k] = sett;
      noter.push(`${k}: dokument ${sett.hamtadOk ? `${sett.byte} byte · ${sett.hash.slice(0, 16)}…` : `oåtkomligt (${sett.fel})`}`
        + ` · villkorssida ${post.villkorssida ? (sett.sida.hamtadOk ? `${sett.sida.lankar.length} PDF-länkar · vår ${sett.sida.lankar.includes(post.kalla) ? 'FINNS' : 'SAKNAS'}` : `oläsbar (${sett.sida.fel})`) : '(ej kurerad)'}`);
    }

    const dom = bedomVillkorsbok(VILLKORSBOK, sedda);
    const checks = dom.domar.map((d) => ({
      name: `${d.nyckel} — allmänna villkor`,
      expected: 'oförändrat sedan verifieringen',
      actual: d.utfall === VILLKOR_UTFALL.FORSEGLAD ? 'oförändrat' : d.text,
      ok: d.ok,
    }));

    // Åtgärderna hör hemma i loggen, inte i en kolumn — de är instruktioner till en människa.
    for (const d of dom.domar) if (d.aktion) noter.push(`→ ${d.nyckel}: ${d.aktion}`);
    noter.push(dom.sammanfattning);
    noter.push('Vakten jämför dokumentets hash, aldrig dess text — ändrad hash betyder "läs om", aldrig "citatet är fel".');

    return { checks, notes: noter };
  },
};
