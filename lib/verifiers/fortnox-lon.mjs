// lib/verifiers/fortnox-lon.mjs — vaktar Fortnox Löns publika listpris (loneadmin-ankaret)
// mot branchindex.loneadmin.fortnoxLonVerified. Prislistan är JS-renderad → Playwright (needsBrowser).
// Bekräftar att den fasta avgiften (199 kr/mån) + per-anställd-priset (25 kr/anställd/mån) fortfarande
// står på fortnox.se. Rött vid drift — då har golvet i loneadmin-rätt-storleken flyttat sig.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, kontextUtdrag, numCheck, lasEntydigt, TAL_SV } from './core.mjs';

// Båda talen står i EN mening (avläst 18 okt): «Lön 199 kr/mån + 25 kr/mån för varje anställd som
// får lön utbetald under månaden». Den fasta avgiften letades förut som «199 kr» var som helst, och
// sidan bär fler 199 («Revisor 199 kr/mån», «Rapport & Analys - Byrå 199 kr/konsult/mån», «1 000+ st
// 199 kr/mån»): en höjd lön hade förblivit grön. Nu läses meningen, och båda talen ur den.
const LONMENING = new RegExp(String.raw`\bLön\s+(${TAL_SV})\s*kr\s*\/\s*mån\s*\+\s*(${TAL_SV})\s*kr\s*\/\s*mån\s+för varje anställd`, 'g');

/** Talen i lönemeningen, eller null om meningen saknas eller är tvetydig. */
export function fortnoxLonLas(text) {
  const t = lasEntydigt(text, LONMENING);
  return { fast: t?.[0] ?? null, perAnstalld: t?.[1] ?? null };
}

/** Checkarna ur en redan läst sidtext — ren funktion, så att sviten kan mata den. */
export function fortnoxLonChecks(fv, text) {
  const live = fortnoxLonLas(text);
  return [
    numCheck('Fast avgift (kr/mån, exkl moms)', fv.fixedMonthly, live.fast, { unit: ' kr' }),
    numCheck('Per anställd (kr/mån, exkl moms)', fv.perEmployeeMonthly, live.perAnstalld, { unit: ' kr' }),
  ];
}

/** Vad sidan visade runt lönetalen — för loggen. */
export function fortnoxLonKontext(fv, text) {
  const utdrag = (rx, o) => kontextUtdrag(text, rx, o).map((s) => `«${s}»`).join(' · ') || '(ingen träff)';
  return [
    `pris ${fv.fixedMonthly} kr: ${utdrag(new RegExp(`\\b${fv.fixedMonthly}\\s*kr`, 'i'), { fore: 80, efter: 30, max: 5 })}`,
    `pris ${fv.perEmployeeMonthly} kr: ${utdrag(new RegExp(`\\b${fv.perEmployeeMonthly}\\s*kr`, 'i'), { fore: 80, efter: 30, max: 5 })}`,
    `etikett anställd: ${utdrag(/anst[äa]lld/i, { fore: 60, efter: 30, max: 5 })}`,
    `etikett Lön: ${utdrag(/\bL[öo]n\b/i, { fore: 20, efter: 70, max: 5 })}`,
  ];
}

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
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'loneadmin',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Fortnox ändrar den fasta månadsavgiften eller per-anställd-priset i lönemeningen på prislistan: vakten läser båda talen ur meningen och visar de nya (DRIFT).',
  blind: 'Rörliga poster som lönebesked och Kivra-utskick — de prissätts per styck och står inte som fasta tal på prislistan vakten läser. Skriver Fortnox om lönemeningen hittar vakten inte talen och blir OLÄSBAR, aldrig grön.',
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
        // Sidan väljs på att lönemeningen FINNS, inte på att bokens tal gör det: ett höjt pris ska
        // läsas som DRIFT på rätt sida, inte få vakten att byta sida.
        const barBada = fortnoxLonLas(t).fast != null;
        if (!text) { text = t; kalla = u; }        // första läsbara som reserv
        if (barBada) { text = t; kalla = u; break; }
      }
    }
    if (!text) return { checks: [], notes: [`Ingen Fortnox-sida gick att läsa · ${provade.join(' · ')}`], fatal: true };

    return { checks: fortnoxLonChecks(fv, text), notes: [`Läst från ${kalla}`, `Provade: ${provade.join(' · ')}`,
      'Fortnox-priser är exkl moms. Lönebesked-/Kivra-utskick är rörligt — ej vaktat här.',
      ...fortnoxLonKontext(fv, text)] };
  },
};
