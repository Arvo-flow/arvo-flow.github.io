// lib/verifiers/fortnox-lon.mjs — vaktar Fortnox Löns publika listpris (loneadmin-ankaret)
// mot branchindex.loneadmin.fortnoxLonVerified. Prislistan är JS-renderad → Playwright (needsBrowser).
// Bekräftar att den fasta avgiften (199 kr/mån) + per-anställd-priset (25 kr/anställd/mån) fortfarande
// står på fortnox.se. Rött vid drift — då har golvet i loneadmin-rätt-storleken flyttat sig.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

// URL RÄTTAD 2026-08-05: /produkt/lon 404:ar (liksom /produkter/lon, /produkter/priser, /priser).
// Vakten hade alltså larmat "(saknas)" på en sida som inte finns — ett rött som såg ut som drift
// men bara var en död länk. Recon (ops/probe-sista-tre.txt) provade kandidaterna: /prislista → 200.
// Vi läser BÅDA: prislistan bär talen, produktsidan är reserv om Fortnox flyttar dem tillbaka.
const URLS = [
  'https://www.fortnox.se/prislista',
  'https://www.fortnox.se/produkt/prislista',
  'https://www.fortnox.se/produkt/loneprogram',
];

export default {
  id: 'fortnox-lon',
  category: 'loneadmin',
  label: 'Fortnox Lön publikt listpris (fast + per anställd, exkl moms)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Fortnox ändrar den fasta månadsavgiften eller per-anställd-priset på prislistan.',
  blind: 'Rörliga poster som lönebesked och Kivra-utskick — de prissätts per styck och står inte som fasta tal på prislistan vakten läser.',
  needsBrowser: true,
  schedule: '30 7 * * 1',
  async run() {
    const fv = BRANCHINDEX.loneadmin?.fortnoxLonVerified;
    if (!fv?.fixedMonthly || !fv?.perEmployeeMonthly) {
      return { checks: [], notes: ['loneadmin.fortnoxLonVerified saknas i prisboken'], fatal: true };
    }

    // Läs sidorna i tur och ordning; första som bär BÅDA talen vinner. En sida som svarar men
    // saknar priserna får aldrig räknas som verifiering — då vore tystnad förklädd till kontroll.
    let text = '', kalla = null;
    const provade = [];
    for (const u of URLS) {
      const t = await withPage(u, async (page, status) => {
        if (typeof status === 'number' && status !== 200) return '';
        return (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
      }, { timeoutMs: 35000, settleMs: 3000 }).catch(() => '');
      provade.push(`${u} → ${t ? t.length + 'b' : 'oåtkomlig'}`);
      if (t && t.length >= 400) {
        const barBada = new RegExp(`\\b${fv.fixedMonthly}\\s*kr`, 'i').test(t)
          && new RegExp(`\\b${fv.perEmployeeMonthly}\\s*kr`, 'i').test(t);
        if (!text) { text = t; kalla = u; }        // första läsbara som reserv
        if (barBada) { text = t; kalla = u; break; }
      }
    }
    if (!text) return { checks: [], notes: [`Ingen Fortnox-sida gick att läsa · ${provade.join(' · ')}`], fatal: true };

    // Sidan skriver priserna som "199 kr/mån" och "25 kr/anställd". Ankra på båda talen.
    const checks = [
      { name: `Fast avgift ${fv.fixedMonthly} kr/mån (exkl moms)`, rx: new RegExp(`\\b${fv.fixedMonthly}\\s*kr`, 'i') },
      { name: `Per anställd ${fv.perEmployeeMonthly} kr/mån (exkl moms)`, rx: new RegExp(`\\b${fv.perEmployeeMonthly}\\s*kr[\\s\\S]{0,18}anst[äa]lld`, 'i') },
    ].map(({ name, rx }) => {
      const present = rx.test(text);
      return { name, expected: 'finns på prislistan', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks, notes: [`Läst från ${kalla}`, `Provade: ${provade.join(' · ')}`,
      'Fortnox-priser är exkl moms. Lönebesked-/Kivra-utskick är rörligt — ej vaktat här.'] };
  },
};
