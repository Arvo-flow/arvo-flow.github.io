// scripts/probe-google-workspace.mjs — RECON v2: Google Workspace publika SEK-listpriser.
// v1 visade 0 "kr" i BÅDE plain fetch och render — MEN v1 strippade <script>, och Googles prissida
// är en JS-app vars priser sannolikt ligger i en inbäddad JSON-blob (script), inte i synlig text.
// v2 söker RÅ-HTML (ostrippad) + renderad sida + embedded JSON efter pristokens i alla format:
// kr / SEK / USD / $ / amountMicros / currencyCode + siffror nära tier-namnen. Avgör om Google
// över huvud taget exponerar ett verifierbart publikt pris (primärkälla) eller gömmer det i funneln.
// HTTP-egress krävs (GH Actions). Ren diagnos — når aldrig kund.

import { withPage } from '../lib/verifiers/core.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const URLS = [
  'https://workspace.google.com/intl/sv/pricing.html',
  'https://workspace.google.com/pricing.html',            // ev. USD-ankare
  'https://workspace.google.com/intl/en/pricing.html',
];

// Pristokens i RÅ text/HTML: siffror följt av valuta, eller valutakod/microbelopp.
function priceHits(raw) {
  const pats = [
    /.{0,30}\d[\d\s.,]*\s*kr\b.{0,15}/gi,
    /.{0,20}\bSEK\b.{0,25}/gi,
    /.{0,15}(?:US)?\$\s?\d[\d.,]*.{0,12}/gi,
    /.{0,20}\d[\d.,]*\s*(?:USD|EUR)\b.{0,12}/gi,
    /.{0,20}"?(?:amountMicros|priceMicros|units|currencyCode)"?\s*[:=]\s*"?[A-Z0-9.]+.{0,12}/gi,
  ];
  const out = [];
  for (const re of pats) { let m; while ((m = re.exec(raw)) !== null) out.push(m[0].replace(/\s+/g, ' ').trim()); }
  return [...new Set(out)];
}

console.log('═══ PLAIN FETCH — RÅ HTML (script INKLUDERAT) ═══');
for (const url of URLS) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const raw = await r.text();
    const hits = priceHits(raw);
    console.log(`\n#### ${url}\n     status ${r.status} · ${raw.length} bytes · pristokens: ${hits.length}`);
    hits.slice(0, 40).forEach((h) => console.log(`     $| ${h}`));
  } catch (e) { console.log(`\n#### ${url} → ERR ${e.message.split('\n')[0]}`); }
}

console.log('\n═══ CHROMIUM RENDER — RÅ HTML via page.content() ═══');
try {
  const raw = await withPage(URLS[0], async (page) => await page.content(), { settleMs: 4500 });
  const hits = priceHits(raw);
  console.log(`#### ${URLS[0]} (renderad, page.content)\n     ${raw.length} bytes · pristokens: ${hits.length}`);
  hits.slice(0, 40).forEach((h) => console.log(`     $| ${h}`));
} catch (e) { console.log(`     RENDER ERR ${e.message.split('\n')[0]}`); }

console.log('\n[probe-google-workspace v2] klar');
