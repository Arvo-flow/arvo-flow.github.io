// scripts/probe-villkorssida.mjs — HITTAR DISTRIBUTIONSPUNKTEN, gissar den aldrig.
//
// Villkorsvaktens förstalarm står på leverantörens villkorssida: larmet går när världen slutar
// peka på det dokument vi läst. Men sidan får inte hittas på — den måste BEVISAS, och beviset är
// enkelt och binärt: sidan är rätt om den länkar exakt den PDF vi har fastnålad.
//
// Sonden gissar därför inte URL:er. Den upptäcker dem: hämtar leverantörens startsida, följer
// varje länk vars adress eller text nämner villkor, och rapporterar vilken sida som faktiskt
// bär vår fastnålade adress bland sina PDF-länkar. Hittas ingen sådan sida säger sonden det —
// och posten förblir utan förstalarm, vilket är ett ärligt tillstånd, inte ett fel att dölja.
//
// Generisk med avsikt: villkorsboken ska växa från två till åtta leverantörer, och varje ny post
// behöver samma bevis. En sond som bara klarade Bahnhof hade fått skrivas om åtta gånger.
import { VILLKORSBOK } from '../lib/contract-intel.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const NAMNER_VILLKOR = /villkor|avtalsvillkor|terms|allmanna|allmänna/i;
const MAX_SIDOR = 25;

async function hamta(url, timeoutMs = 20000) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' }, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
    if (!r.ok) return { ok: false, html: null, fel: `HTTP ${r.status}` };
    return { ok: true, html: await r.text(), fel: null };
  } catch (e) {
    return { ok: false, html: null, fel: e.name === 'TimeoutError' ? 'timeout' : e.message.slice(0, 60) };
  }
}

/** Varje länk på sidan, absolutgjord. Ren utvinning — ingen tolkning. */
function lankar(html, bas) {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi)]
    .map((m) => { try { return { url: new URL(m[1], bas).toString(), text: m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }; } catch { return null; } })
    .filter(Boolean);
}

const pdfLankar = (html, bas) => [...html.matchAll(/(?:href|src)=["']([^"']+\.pdf[^"']*)["']/gi)]
  .map((m) => { try { return new URL(m[1], bas).toString(); } catch { return null; } })
  .filter(Boolean);

const nycklar = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const poster = Object.entries(VILLKORSBOK).filter(([k, p]) => (nycklar.length ? nycklar.includes(k) : !p.villkorssida));

if (poster.length === 0) { console.log('Varje post har redan en kurerad villkorssida.'); process.exit(0); }

let allaHittade = true;
for (const [nyckel, post] of poster) {
  const start = new URL(post.kalla).origin + '/';
  console.log(`\n═══ ${nyckel} · ${post.supplier} ═══`);
  console.log(`  söker sidan som länkar: ${post.kalla}`);
  console.log(`  startar från: ${start}`);

  const forsta = await hamta(start);
  if (!forsta.ok) { console.log(`  ✗ startsidan gick inte att läsa (${forsta.fel})`); allaHittade = false; continue; }

  // Kandidatsidor: startsidan själv, plus varje länk vars adress ELLER länktext nämner villkor.
  const kandidater = [start, ...lankar(forsta.html, start)
    .filter((l) => NAMNER_VILLKOR.test(l.url) || NAMNER_VILLKOR.test(l.text))
    .map((l) => l.url)];
  const unika = [...new Set(kandidater)].slice(0, MAX_SIDOR);
  console.log(`  ${unika.length} kandidatsida(or) att pröva`);

  let traff = null;
  for (const u of unika) {
    const sida = u === start ? forsta : await hamta(u);
    if (!sida.ok) { console.log(`    · ${u} → ${sida.fel}`); continue; }
    const pdfs = pdfLankar(sida.html, u);
    const barVar = pdfs.includes(post.kalla);
    console.log(`    · ${u} → ${pdfs.length} PDF-länk(ar)${barVar ? '  ⬅ BÄR VÅR FASTNÅLADE PDF' : ''}`);
    if (barVar) { traff = u; break; }
  }

  if (traff) {
    console.log(`\n  ✓ BEVISAD distributionspunkt: ${traff}`);
    console.log(`    kurera med: villkorssida: '${traff}',`);
  } else {
    console.log('\n  ✗ Ingen kandidatsida länkar vår fastnålade PDF.');
    console.log('    Posten förblir utan förstalarm. Det är ett ärligt tillstånd — en gissad sida vore inget larm alls.');
    allaHittade = false;
  }
}

process.exitCode = allaHittade ? 0 : 1;
