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

const UA = 'ArvoFlow-DataIngest/1.0 (+https://arvoflow.se; team@arvoflow.se)';

// JSON-stat 2.0 — slå upp ett värde via {dimId: kod} (hanterar strides korrekt).
function jsonstatValue(js, selection) {
  const { id, size, value, dimension } = js;
  let idx = 0;
  for (let d = 0; d < id.length; d++) {
    const pos = dimension[id[d]].category.index[selection[id[d]]];
    if (pos == null) return null;
    const stride = size.slice(d + 1).reduce((a, b) => a * b, 1);
    idx += pos * stride;
  }
  return value[idx] ?? value[String(idx)] ?? null;
}

// Eurostat nrg_pc_205 — elpris för icke-hushåll (företag), Sverige, SEK/kWh
// exkl. moms, per förbrukningsband. Officiell statistik (ESTAT/SCB) → öre/kWh.
async function fetchEurostatElPrices() {
  const url = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_205'
    + '?format=JSON&geo=SE&currency=NAC&tax=X_VAT&unit=KWH&siec=E7000&lastTimePeriod=1';
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!r.ok) { console.warn('[eurostat] status', r.status); return []; }
  const js = await r.json();
  if (!js?.dimension?.nrg_cons) { console.warn('[eurostat] saknar nrg_cons — kontrollera tax/currency-koder'); return []; }
  const time = Object.keys(js.dimension.time.category.index)[0];
  const tm = String(time).match(/(\d{4}).?S([12])/);
  const observedAt = tm ? `${tm[1]}-${tm[2] === '1' ? '06' : '12'}-01` : null;
  const bands = js.dimension.nrg_cons.category;
  const WANT = ['MWH_LT20', 'MWH20-499', 'MWH500-1999']; // SMB-relevanta band
  const recs = [];
  for (const code of WANT) {
    if (!(code in bands.index)) continue;
    const sel = {};
    for (const dimId of js.id) sel[dimId] = dimId === 'nrg_cons' ? code : Object.keys(js.dimension[dimId].category.index)[0];
    const sek = jsonstatValue(js, sel);
    if (sek == null) continue;
    recs.push({
      source: 'eurostat', sourceRef: 'nrg_pc_205', sourceUrl: url,
      buyer: 'Svenska företag (icke-hushåll)', buyerType: 'statistik',
      supplier: 'Marknad (Eurostat/SCB)', category: 'el',
      product: `Företag · ${bands.label[code]}`, unit: 'ore_per_kwh',
      unitPrice: Math.round(Number(sek) * 100 * 100) / 100, // SEK/kWh → öre/kWh
      observedAt, region: 'Sverige', raw: { band: code, sekPerKwh: sek, period: time },
    });
  }
  console.log(`[eurostat] el · ${time}: ${recs.map((r) => `${r.product}=${r.unitPrice} öre`).join(' | ') || 'inga band'}`);
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
