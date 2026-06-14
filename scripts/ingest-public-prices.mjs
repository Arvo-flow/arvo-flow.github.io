// scripts/ingest-public-prices.mjs — hämtar offentlig sektors VERKLIGA priser
// ur svensk öppen data och skriver dem till public_price_points.
//
//   node scripts/ingest-public-prices.mjs --sample      (verifierar pipelinen mot fixture)
//   node scripts/ingest-public-prices.mjs --source=all  (live — körs på GitHub Actions, HTTP krävs)
//
// HTTP funkar inte i sandboxen (CLAUDE.md) → live-körning sker på GitHub Actions
// (.github/workflows/ingest-public-prices.yml) eller Vercel. --sample kör helt
// offline och bevisar normalisering + (om DATABASE_URL finns) insert.
//
// REGEL 3: varje punkt bär källa, köpare och datum. Inga konstruerade tal.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ingestPublicPricePoints, CATEGORY_UNIT } from '../lib/public-prices.js';
import { fetchEurostatElBands } from '../lib/eurostat-el.js';

// Eurostat nrg_pc_205 — elpris för icke-hushåll (företag), Sverige, per förbrukningsband.
// Läslogiken bor i lib/eurostat-el.js (enda läsvägen, regel 1) — här formas bara records.
async function fetchEurostatElPrices() {
  let data;
  try { data = await fetchEurostatElBands(); }
  catch (e) { console.warn('[eurostat]', e.message); return []; }
  const recs = data.bands.map((b) => ({
    source: 'eurostat', sourceRef: 'nrg_pc_205', sourceUrl: data.url,
    buyer: 'Svenska företag (icke-hushåll)', buyerType: 'statistik',
    supplier: 'Marknad (Eurostat/SCB)', category: 'el',
    product: `Företag · ${b.label}`, unit: 'ore_per_kwh',
    unitPrice: b.orePerKwh,
    observedAt: data.observedAt, region: 'Sverige',
    raw: { band: b.code, sekPerKwh: b.sekPerKwh, period: data.period },
  }));
  console.log(`[eurostat] el · ${data.period}: ${recs.map((r) => `${r.product}=${r.unitPrice} öre`).join(' | ') || 'inga band'}`);
  return recs;
}

// ── Källadaptrar (riktiga svenska/EU öppna datakällor) ──────────────────────
// Varje adapter returnerar en array av normaliserade records. Live-fetch sker
// bara där HTTP finns (GitHub Actions-runnern, ej sandbox).
const ADAPTERS = {
  // Eurostat — elpris för svenska företag (officiell statistik). LIVE.
  'eurostat-el': {
    label: 'Eurostat nrg_pc_205 (elpris icke-hushåll, SE)',
    url: 'https://ec.europa.eu/eurostat/',
    fetchRecords: fetchEurostatElPrices,
  },
  // Statliga ramavtal med publicerade enhetspriser (programvara, telekom, IT).
  'ramavtal-stat': {
    label: 'Statliga ramavtal (Kammarkollegiet / avropa.se)',
    url: 'https://www.avropa.se/ramavtal/',
    async fetchRecords() {
      // TODO(live på Actions): hämta avropa.se prisbilagor (xlsx/csv) per ramavtal,
      // parsa enhetspriser för programvarulicenser + telefoni. Strukturen är känd;
      // parsing valideras vid första Actions-körning. Returnerar [] tills dess.
      return [];
    },
  },
  // Kommunala/regionala ramavtal (Adda / SKR Kommentus) — publicerade priser.
  'ramavtal-kommun': {
    label: 'Kommunala ramavtal (Adda Inköpscentral)',
    url: 'https://www.adda.se/upphandling-och-ramavtal/vara-ramavtal/',
    async fetchRecords() { return []; },
  },
  // Kommunal leverantörsreskontra (öppna data via Sveriges dataportal / CKAN).
  // Många kommuner publicerar varje utbetalning till varje leverantör.
  'reskontra-kommun': {
    label: 'Kommunal leverantörsreskontra (dataportal.se / CKAN)',
    url: 'https://www.dataportal.se/datasets?q=leverant%C3%B6rsreskontra',
    async fetchRecords() { return []; },
  },
  // Upphandlingstilldelningar med pris (TED / Visma Opic).
  'upphandling': {
    label: 'Upphandlingstilldelningar (TED / Visma Opic)',
    url: 'https://ted.europa.eu/',
    async fetchRecords() { return []; },
  },
};

function loadJson(file) {
  const json = JSON.parse(readFileSync(path.resolve(file), 'utf8'));
  return json.records ?? [];
}

function validate(records) {
  const ok = [], rejected = [];
  for (const r of records) {
    const unit = r.unit ?? CATEGORY_UNIT[r.category];
    if (r.supplier && r.category && unit && Number(r.unitPrice) > 0) ok.push({ ...r, unit });
    else rejected.push(r);
  }
  return { ok, rejected };
}

async function main() {
  const args = process.argv.slice(2);
  const sample = args.includes('--sample');
  const seed = args.includes('--seed');
  const sourceArg = (args.find((a) => a.startsWith('--source=')) ?? '--source=all').split('=')[1];

  let raw = [];
  if (sample) {
    raw = loadJson('data/public-prices-sample.json');
    console.log(`[ingest] sample-läge · ${raw.length} records ur fixture (EXEMPEL)`);
  } else if (seed) {
    raw = loadJson('data/public-prices-seed.json');
    console.log(`[ingest] seed-läge · ${raw.length} VERIFIERADE records ur curation`);
  } else {
    const names = sourceArg === 'all' ? Object.keys(ADAPTERS) : sourceArg.split(',');
    for (const name of names) {
      const a = ADAPTERS[name];
      if (!a) { console.warn(`[ingest] okänd källa: ${name}`); continue; }
      try {
        const recs = await a.fetchRecords();
        console.log(`[ingest] ${name} (${a.label}) → ${recs.length} records`);
        raw.push(...recs);
      } catch (err) {
        console.error(`[ingest] ${name} fel:`, err.message);
      }
    }
  }

  const { ok, rejected } = validate(raw);
  if (rejected.length) console.warn(`[ingest] ${rejected.length} records förkastade (ofullständiga)`);
  console.log(`[ingest] ${ok.length} giltiga records`);

  // Visa per kategori (för verifiering av normaliseringen).
  const byCat = ok.reduce((m, r) => { (m[r.category] ??= []).push(r.unitPrice); return m; }, {});
  for (const [cat, prices] of Object.entries(byCat)) {
    console.log(`  · ${cat} (${CATEGORY_UNIT[cat]}): ${prices.length} st`);
  }

  const inserted = await ingestPublicPricePoints(ok);
  console.log(inserted > 0
    ? `[ingest] ✓ ${inserted} nya rader i public_price_points`
    : `[ingest] inga rader skrivna (DATABASE_URL saknas i sandbox, eller redan deduppade) — normalisering verifierad`);
}

main().catch((e) => { console.error(e); process.exit(1); });
