// scripts/probe-google-workspace.mjs — RECON: hitta Google Workspace PUBLIKA SEK-listpriser
// direkt från Google (workspace.google.com), inte via tredjepartsaggregator. Idag bär prisboken
// USD-priser från softwarepricingguide.com (sekundärkälla) → integritetshål (regel 3). Innan vi
// riktar den agnostiska rätt-storleksmotorn mot Google MÅSTE vi ha verifierade primärpriser i SEK.
//
// Sonden provar flera kandidat-URL:er (sv-lokaliserade) med BÅDE plain fetch OCH Chromium-render,
// och dumpar varje "kr"-pristoken + dess närkontext + tier-namnen (Starter/Standard/Plus/Enterprise)
// så vi ser exakt vad Google visar för svensk marknad och hur sidan är byggd (SSR vs JS).
// HTTP-egress krävs (GH Actions, ej sandbox). Ren diagnos — når aldrig kund.

import { fetchText, stripHtml, withPage } from '../lib/verifiers/core.mjs';

const URLS = [
  'https://workspace.google.com/intl/sv/pricing.html',
  'https://workspace.google.com/intl/sv-se/pricing.html',
  'https://workspace.google.com/intl/sv/pricing',
  'https://workspace.google.com/pricing.html',
];

const TIERS = ['Starter', 'Standard', 'Plus', 'Enterprise'];

// Plocka ut "<n> kr"-tokens + 40 tecken kontext på var sida.
function priceSnippets(flat) {
  const out = [];
  const re = /.{0,45}\d[\d\s.,]*\s*kr\b.{0,25}/gi;
  let m;
  while ((m = re.exec(flat)) !== null) out.push(m[0].replace(/\s+/g, ' ').trim());
  return [...new Set(out)];
}

function tierContext(flat) {
  const out = [];
  for (const t of TIERS) {
    const re = new RegExp(`.{0,10}\\bBusiness ${t}\\b.{0,80}`, 'gi');
    let m;
    while ((m = re.exec(flat)) !== null) out.push(m[0].replace(/\s+/g, ' ').trim());
  }
  return [...new Set(out)];
}

console.log('═══ PLAIN FETCH ═══');
for (const url of URLS) {
  const { status, text } = await fetchText(url, { timeoutMs: 25000 });
  const flat = stripHtml(text);
  const prices = priceSnippets(flat);
  console.log(`\n#### ${url}\n     status ${status} · ${text.length} bytes · "kr"-träffar: ${prices.length}`);
  prices.slice(0, 25).forEach((p) => console.log(`     kr| ${p}`));
  tierContext(flat).slice(0, 12).forEach((t) => console.log(`     tier| ${t}`));
}

console.log('\n═══ CHROMIUM RENDER (bästa kandidaten) ═══');
const RENDER_URL = URLS[0];
try {
  const flat = await withPage(RENDER_URL, async (page) =>
    (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '), { settleMs: 4000 });
  const prices = priceSnippets(flat);
  console.log(`#### ${RENDER_URL} (renderad)\n     innerText ${flat.length} tecken · "kr"-träffar: ${prices.length}`);
  prices.slice(0, 30).forEach((p) => console.log(`     kr| ${p}`));
  tierContext(flat).slice(0, 12).forEach((t) => console.log(`     tier| ${t}`));
} catch (e) {
  console.log(`     RENDER ERR ${e.message.split('\n')[0]}`);
}
console.log('\n[probe-google-workspace] klar');
