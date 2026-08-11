// scripts/probe-villkorskandidater.mjs — REKOGNOSCERING inför villkorsbokens utbyggnad.
//
// Steg 2 är inte "lägg till sex rader". Innan en enda post kureras måste tre saker VETAS om varje
// kandidat, och ingen av dem går att gissa:
//   1 · FINNS ett företagsvillkorsdokument publikt? (Bibelns Tele2-prejudikat: den enda åtkomliga
//       PDF:en gällde PRIVATtjänster — fel dokumentklass, och posten utelämnades medvetet.)
//   2 · Vilken DOKUMENTKLASS är det? Läsaren extraherar PDF-textlager. Publiceras villkoren som
//       HTML når vår läsare dem inte, och då är frågan om maskineriet ska utökas — inte om vi
//       ska kurera något vi inte kan läsa.
//   3 · Var ligger DISTRIBUTIONSPUNKTEN? Utan den finns inget förstalarm, och en post utan
//       förstalarm får enligt sviten inte finnas i boken.
//
// Sonden svarar på alla tre och kurerar ingenting. Den skiljer också PRIVAT från FÖRETAG i
// filnamn och länktext, eftersom just den förväxlingen redan kostat oss en post en gång.
//
// KANDIDATERNA ÄR GRUNDADE, INTE PÅHITTADE: varje leverantör nedan är en vi redan vaktar priset
// på i verifierarfabriken (alltså en vi vet att våra kunder faktiskt har) eller en Nivå 1-aktör
// där Arvo enligt Switch-doktrinen faktiskt avfyrar — och det är där avtalsklockan betyder mest.
import { deklarera } from '../lib/sondkontrakt.js';
import { VILLKORSBOK } from '../lib/contract-intel.js';
import { withPage } from '../lib/verifiers/core.mjs';

// Sondkontraktet: mätningen får inte produceras omärkt (lib/sondkontrakt.js).
deklarera({
  namn: 'probe-villkorskandidater',
  fangar: 'Om en leverantör publicerar ett företagsvillkorsdokument som går att nå utloggad, och var distributionspunkten i så fall ligger.',
  blind: 'Sidor bakom botmur, inloggning eller samtyckesvägg — Fortnox och Adobe gav noll respektive ett tecken. Det betyder OKÄNT, aldrig att villkoren saknas.',
});

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const KANDIDATER = [
  { nyckel: 'tele2',     supplier: 'Tele2',     start: 'https://www.tele2.se/',      varfor: 'Nivå 1 (mobil + bredband) · prisvaktad · bibeln flaggar privat/företag-fällan' },
  { nyckel: 'telenor',   supplier: 'Telenor',   start: 'https://www.telenor.se/',    varfor: 'Nivå 1 (mobil + bredband) · sonden 2026-07 fann 0 PDF-länkar — omprövas' },
  { nyckel: 'fortnox',   supplier: 'Fortnox',   start: 'https://www.fortnox.se/',    varfor: 'Nivå 2 · prisvaktad i två kategorier (saas-finance + loneadmin)' },
  { nyckel: 'spiris',    supplier: 'Spiris',    start: 'https://www.spiris.se/',     varfor: 'Nivå 2 · prisvaktad (saas-finance), svensk motpart till Fortnox' },
  { nyckel: 'microsoft', supplier: 'Microsoft', start: 'https://www.microsoft.com/sv-se/', varfor: 'Nivå 2 · största SaaS-posten i prisboken (M365)' },
  { nyckel: 'adobe',     supplier: 'Adobe',     start: 'https://www.adobe.com/se/',  varfor: 'Nivå 2 · prisvaktad (saas-creative)' },
];

const NAMNER_VILLKOR = /villkor|avtalsvillkor|terms|allmanna|allmänna|abonnemangsvillkor/i;
const PRIVATMARKOR = /privat|konsument|consumer|private/i;
const FORETAGSMARKOR = /foretag|företag|business|enterprise|corporate|brf/i;
const AVTALSORD = /uppsägningstid|uppsagningstid|avtalstid|förlängs|forlangs|bindningstid/i;

// ── BLINDHET FÅR ALDRIG SE UT SOM FRÅNVARO (rättat 2026-08-10) ──────────────────────────────
// Första versionen läste RÅ HTML och rapporterade "0 villkorssidor hittade" för Tele2, Telenor,
// Fortnox och Microsoft. Det var inte ett fynd — det var min crawlers blindhet. Julisonden hade
// redan läst en villkors-PDF från tele2.se/villkor, så sidorna finns; mina kandidater är
// JS-renderade och footern existerar inte i råmarkupen.
//
// Ett instrument som rapporterar FRÅNVARO när det menar BLINDHET är ett ljugande instrument, och
// det är exakt den sjukdom vaktkontraktet finns för att förhindra — den här gången i mätverktyget
// i stället för i vakten. Två saker rättas därför:
//   1 · sidan RENDERAS (samma väg som prisvakterna använder mot JS-sidor)
//   2 · totalt antal länkar redovisas ALLTID, så att "sidan bar 3 länkar" aldrig kan förväxlas
//       med "sidan bar 180 länkar varav ingen nämnde villkor". Det förra är blindhet, det senare
//       är ett fynd, och de får aldrig skrivas ut på samma sätt.
async function hamta(url, timeoutMs = 30000) {
  try {
    const html = await withPage(url, async (page, status) => {
      if (typeof status === 'number' && status >= 400) return null;
      return page.content();
    }, { timeoutMs, settleMs: 2500 });
    if (!html) return { ok: false, fel: 'sidan svarade med fel eller tomt innehåll' };
    return { ok: true, html };
  } catch (e) {
    return { ok: false, fel: e.name === 'TimeoutError' ? 'timeout' : String(e.message).slice(0, 60) };
  }
}

const lankar = (html, bas) => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]{0,140}?)<\/a>/gi)]
  .map((m) => { try { return { url: new URL(m[1], bas).toString(), text: m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }; } catch { return null; } })
  .filter(Boolean);

const pdfLankar = (html, bas) => [...html.matchAll(/(?:href|src)=["']([^"']+\.pdf[^"']*)["']/gi)]
  .map((m) => { try { return new URL(m[1], bas).toString(); } catch { return null; } })
  .filter(Boolean);

const klass = (s) => (FORETAGSMARKOR.test(s) ? 'FÖRETAG' : PRIVATMARKOR.test(s) ? 'privat' : '?');


for (const k of KANDIDATER) {
  console.log(`\n═══════ ${k.nyckel} · ${k.supplier} ═══════`);
  console.log(`  varför: ${k.varfor}`);
  if (VILLKORSBOK[k.nyckel]) { console.log('  (finns redan i villkorsboken — hoppas över)'); continue; }

  const start = await hamta(k.start);
  if (!start.ok) { console.log(`  ✗ startsidan gick inte att läsa (${start.fel})`); continue; }

  const alla = lankar(start.html, k.start);
  const villkorslankar = alla.filter((l) => NAMNER_VILLKOR.test(l.url) || NAMNER_VILLKOR.test(l.text));
  // Totalen är skillnaden mellan blindhet och fynd — den skrivs alltid ut.
  console.log(`  startsidan bar ${alla.length} länkar totalt, varav ${villkorslankar.length} nämner villkor`
    + (alla.length < 10 ? '  ⚠ MISSTÄNKT FÅ — sidan kan vara blockerad, inte tom' : ''));

  // Andra vägen: konventionella villkorsadresser PRÖVAS (inte gissas — en adress är bevisad först
  // när den svarar och bär ett företagsdokument). Julisonden fann tele2.se/villkor just så.
  const provade = [...new Set([...villkorslankar.map((l) => l.url),
    ...['villkor', 'foretag/villkor', 'om/villkor', 'kundservice/villkor', 'legal', 'avtalsvillkor']
      .map((v) => new URL(v, k.start).toString())])];
  const sidor = provade.slice(0, 14);
  console.log(`  ${sidor.length} sida(or) att pröva (upptäckta + konventionella)`);

  let hittatPdf = 0, hittatHtml = 0;
  for (const u of sidor) {
    const s = await hamta(u);
    if (!s.ok) { console.log(`    · ${u}\n        → ${s.fel}`); continue; }
    const pdfs = [...new Set(pdfLankar(s.html, u))];
    const text = s.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    const harAvtalsord = AVTALSORD.test(text);
    console.log(`    · ${u}`);
    console.log(`        → ${pdfs.length} PDF · sidtext ${text.length} tecken · avtalsord ${harAvtalsord ? 'JA' : 'nej'} · klass ${klass(u)}`);

    // PDF:erna är det vår läsare faktiskt kan läsa — visa dem med dokumentklass.
    for (const p of pdfs.slice(0, 8)) {
      const namn = decodeURIComponent(p.split('/').pop()).slice(0, 90);
      console.log(`            [PDF ${klass(namn)}] ${namn}`);
      console.log(`                  ${p}`);
      hittatPdf += 1;
    }
    // En HTML-sida med avtalsord OCH rejäl text är en villkorstext vår läsare INTE når i dag.
    if (pdfs.length === 0 && harAvtalsord && text.length > 4000) {
      console.log('            [HTML-VILLKOR] villkoren står i sidan — utanför PDF-läsarens räckvidd');
      hittatHtml += 1;
    }
  }
  console.log(`  ── summa: ${hittatPdf} PDF-kandidat(er) · ${hittatHtml} HTML-villkorssida(or)`);
}

console.log('\nSonden kurerar ingenting. Varje post som ska in i boken kräver därefter:');
console.log('  företagsdokument (aldrig privat) · bevisad distributionspunkt · ordagrant läst klausul.');
