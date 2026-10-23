// lib/verifiers/zoom.mjs — vaktar Zooms publika USD-listpriser (Pro + Business).
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): zoom.us/pricing lämnar INGA priser i serverrenderad
// HTML — de kräver rendering. Renderat visar sidan (svensk lokal):
//   "Workplace · Pro · Bäst för personligt bruk … $14.16 /användare per månad · Faktureras årsvis"
//   "Workplace · Affärsverksamhet · Bäst för större team … $18.33 /användare per månad · Faktureras årsvis"
// Båda stämde exakt mot prisboken — Zoom hade alltså inte drivit, den var bara OBEVAKAD i 70 dagar.
// Det är hela poängen: vi visste inte, och att inte veta är inte samma sak som att det är rätt.
//
// VAD SOM VAKTAS: usdAnnual — talet som faktiskt når kunden via recommend(). Månadspriset
// (usdMonthly) ligger bakom sidans Månadsvis/Årsvis-väljare och vaktas medvetet INTE här;
// att bumpa ett datum på ett tal vi inte läst vore precis den falska verifiering vi städat bort.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck, kontextUtdrag, talSv, DOLLARBELOPP } from './core.mjs';

const URL = 'https://zoom.us/pricing';
// Svenska sidan kallar Business "Affärsverksamhet" — vi accepterar båda så en språkändring
// inte tystar vakten. Alla kort under båda namnen läses, och två olika tal är ett okänt (NV-09).
const TIERS = [
  { key: 'zoom-pro', label: 'Zoom Pro', namn: ['Pro'] },
  { key: 'zoom-business', label: 'Zoom Business', namn: ['Affärsverksamhet', 'Business'] },
];

// ── SIDAN BYTTE FORM MELLAN 17 OCH 18 OKT, OCH SONDEN LÄSTE FEL PÅ DEN ──────────────────────────────
// Vakten blev OLÄSBAR 18 och 19 okt. Sonden (probe-saas-render, körning 39500651019) såg ett enda
// dollarbelopp, «$ 16,50 … per månad · faktureras månadsvis», och här stod att sidan visade månadsläget
// som standard. RÄTTELSE (andra blicken V85-Z1, avläst i körning 39548656562): sidan visar årsläget, och
// planpriserna 14,16 och 18,33 stod kvar. Sondens mönster krävde dollartecknet FÖRE talet, och sidan
// skriver nu «14,16$». Sonden såg därför bara tilläggsraden «22 $ 16,50 $ 1», där tecknet efter 22 står
// före 16,50. Ett instrument som inte kan se en form läser frånvaron som en slutsats. Sonden och
// loggraden nedan läser nu båda formerna (DOLLARBELOPP, NV-08).
export function zoomKontext(text) {
  const utdrag = (rx, o) => kontextUtdrag(text, rx, o).map((u) => `«${u}»`).join(' · ') || '(ingen träff)';
  return [
    `planer: ${utdrag(/Workplace\s+(?:Pro|Business|Affärsverksamhet)/i, { fore: 40, efter: 160, max: 6 })}`,
    `dollarbelopp: ${utdrag(new RegExp(DOLLARBELOPP), { fore: 80, efter: 80, max: 10 })}`,
    `faktureringsläge: ${utdrag(/faktureras\s+(?:års|månads)vis|billed\s+(?:annually|monthly)/i, { fore: 60, efter: 20, max: 6 })}`,
  ];
}

// ── LÄSAREN, BYGGD MOT SIDAN SOM DEN SER UT 21 OKT (körning 39548656562, zoomKontext) ──────────
// Kortet lyder «Workplace / Pro / Bäst för personligt bruk eller små team. / 14,16$ / /användare per
// månad · Faktureras årsvis». Priserna var oförändrade (14,16 och 18,33); det var formatet som bytts:
// kommadecimal och dollartecknet EFTER talet, där augustis sida skrev «$14.16». Läsaren tar båda
// formerna men kräver kortets rubrik (planens namn direkt följt av «Bäst för») och «Faktureras
// årsvis», så att månadsläget eller en tilläggsprodukt («22 $ 16,50 $ 1 per månad · faktureras
// månadsvis») aldrig läses som årspriset. Två olika tal för samma plan är ett okänt, aldrig ett val.
const USD = String.raw`\d+(?:[.,]\d{1,2})?`;
const ARSPRIS = String.raw`(?:(${USD})\s*\$|\$\s*(${USD}))\s*\/\s*användare per månad\s*·\s*Faktureras årsvis`;
// Gapet efter «Bäst för» får inte passera nästa korts «Workplace»: saknar ett kort sitt pris ska planen
// bli OLÄSBAR, inte DRIFT med grannkortets tal (tredje blicken T85-3, NV-09).
const kortRx = (namn) => new RegExp(String.raw`Workplace\s+${namn}\s+Bäst för(?:(?!Workplace)[^\d$]){0,80}?` + ARSPRIS, 'gi');

/** Planens årspris ur kortet, eller null om kortet saknas eller två kort säger olika. */
export function zoomLas(text, namn) {
  const tal = new Set();
  for (const n of namn) {
    for (const m of String(text ?? '').matchAll(kortRx(n))) tal.add(talSv(m[1] ?? m[2]));
  }
  return tal.size === 1 ? [...tal][0] : null;
}

/** Checkar och noter ur en redan renderad sidtext — ren funktion, så att sviten kan mata den. */
export function zoomUtfall(tiers, text) {
  const checks = TIERS.map(({ key, label, namn }) =>
    numCheck(`${label} årsavtal (USD)`, tiers[key].usdAnnual, zoomLas(text, namn), { unit: ' USD' }));
  const notes = ['Endast årsavtalspriset (usdAnnual) vaktas — månadspriset ligger bakom sidans väljare.'];
  return { checks, notes: [...notes, ...zoomKontext(text)] };
}

export default {
  id: 'zoom',
  category: 'saas-productivity',
  label: 'Zoom publika listpriser (USD, årsavtal)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  bevakadeTiers: TIERS.map((t) => t.key),
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'saas-productivity',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Zoom ändrar årspriset för Workplace Pro eller Workplace Business (Affärsverksamhet) på kortet: vakten läser talet under kortets rubrik och visar det nya (DRIFT).',
  blind: 'Det andra faktureringsläget — sidan visar årsvis eller månadsvis via en väljare, och vakten läser bara årsläget. Visar sidan månadsläget, eller byter kortet rubrik, blir vakten OLÄSBAR, aldrig grön.',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!tiers?.['zoom-pro']?.usdAnnual) return { checks: [], notes: ['Zoom-tiers saknas i prisboken'], fatal: true };

    const res = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status, text: '' };
      return { status, text: await page.evaluate(() => document.body?.innerText ?? '') };
    }, { timeoutMs: 45000, settleMs: 5000 });

    if (!res?.text) return { checks: [], notes: [`status ${res?.status} — ingen renderad text`], fatal: true };

    return zoomUtfall(tiers, res.text);
  },
};
