// scripts/probe-adobe-dropbox.mjs — RECON (read-only): publicerar Adobe (saas-creative) eller Dropbox
// ÖPPNA, deterministiska listpriser i ÄKTA SEK — utan FX, inloggning eller offert-krav?
//
// Zero Trust-spaning, samma disciplin som Google-sonden. Vi rör ingen prisbok och wire:ar inget —
// vi bara KARTLÄGGER. För varje kandidat-URL: plain fetch (RÅ HTML, script inkluderat) + Chromium-render
// (page.content + innerText). Räknar SEK- vs EUR/USD-tokens (FX-flagga), dumpar pris-snippets + tier-kontext.
// SEK öppet → ren källa. EUR/USD/0 priser/inloggning → Fraktjakt-disciplin (avbryt). HTTP-egress krävs (GH Actions).

import { withPage } from '../lib/verifiers/core.mjs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const TARGETS = {
  Adobe: {
    tiers: ['All Apps', 'Alla appar', 'Single App', 'En app', 'Photoshop', 'Illustrator', 'Acrobat', 'Photography', 'Team', 'Företag'],
    urls: [
      'https://www.adobe.com/se/creativecloud/plans.html',
      'https://www.adobe.com/se/creativecloud/plans.html?plan=team',
      'https://www.adobe.com/se/creativecloud/plans-business.html',
      'https://www.adobe.com/se/products/photoshop.html',
    ],
  },
  Dropbox: {
    tiers: ['Plus', 'Essentials', 'Professional', 'Business', 'Standard', 'Advanced', 'Business Plus'],
    urls: [
      'https://www.dropbox.com/sv_SE/business/pricing',
      'https://www.dropbox.com/business/plans-comparison',
      'https://www.dropbox.com/sv_SE/plans',
    ],
  },
};

// Pris-/valuta-tokens i RÅ text.
function scan(raw) {
  const grab = (re, n = 18) => [...new Set((raw.match(re) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, n);
  return {
    sek:  grab(/.{0,18}\d[\d\s.,]*\s*kr\b.{0,10}/gi),
    sekW: (raw.match(/\bSEK\b/g) || []).length,
    eur:  grab(/.{0,12}(?:€\s?\d[\d.,]*|\d[\d.,]*\s*(?:EUR|€)).{0,8}/gi, 8),
    usd:  grab(/.{0,12}(?:US)?\$\s?\d[\d.,]*.{0,8}/gi, 8),
    login: /logga in|sign in|log in|skapa konto|create account/i.test(raw),
    quote: /kontakta (?:s[äa]lj|oss)|contact sales|beg[äa]r offert|request a quote/i.test(raw),
  };
}

function tierCtx(raw, tiers) {
  const out = [];
  for (const t of tiers) {
    const re = new RegExp(`.{0,6}\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b.{0,55}`, 'gi');
    let m; let c = 0;
    while ((m = re.exec(raw)) !== null && c < 2) { out.push(m[0].replace(/\s+/g, ' ').trim()); c++; }
  }
  return [...new Set(out)].slice(0, 10);
}

for (const [vendor, { urls, tiers }] of Object.entries(TARGETS)) {
  console.log(`\n══════════════ ${vendor} ══════════════`);
  for (const url of urls) {
    // 1) Plain fetch RÅ HTML (6s timeout → snabb-fail om sidan bot-väggar/hänger)
    let raw = '', status = '?';
    try {
      const ac = new AbortController();
      const t = setTimeout(() => ac.abort(), 6000);
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9' }, redirect: 'follow', signal: ac.signal });
      clearTimeout(t);
      status = r.status; raw = await r.text();
    } catch (e) { status = 'ERR ' + e.name; }
    const f = scan(raw);
    console.log(`\n#### ${url}`);
    console.log(`  [fetch] status ${status} · ${raw.length}b · SEK kr-träffar ${f.sek.length} · "SEK" ${f.sekW} · EUR ${f.eur.length} · USD ${f.usd.length} · login:${f.login} · offert:${f.quote}`);
    f.sek.slice(0, 12).forEach((s) => console.log(`     kr| ${s}`));
    f.eur.slice(0, 4).forEach((s) => console.log(`     €| ${s}`));
    f.usd.slice(0, 4).forEach((s) => console.log(`     $| ${s}`));
    tierCtx(raw, tiers).forEach((s) => console.log(`     tier| ${s}`));

    // 2) Chromium-render ALLTID när plain fetch inte gav SEK (bot-väggad fetch ELLER JS-app).
    //    Detta är den ärliga testen: kan en RIKTIG webbläsare läsa öppet SEK?
    if (f.sek.length === 0) {
      try {
        const html = await withPage(url, async (page) => await page.content(), { settleMs: 4500 });
        const r2 = scan(html);
        console.log(`  [render] ${html.length}b · SEK kr-träffar ${r2.sek.length} · "SEK" ${r2.sekW} · EUR ${r2.eur.length} · USD ${r2.usd.length} · login:${r2.login} · offert:${r2.quote}`);
        r2.sek.slice(0, 14).forEach((s) => console.log(`     kr*| ${s}`));
        r2.eur.slice(0, 4).forEach((s) => console.log(`     €*| ${s}`));
        tierCtx(html, tiers).slice(0, 8).forEach((s) => console.log(`     tier*| ${s}`));
      } catch (e) { console.log(`  [render] ERR ${e.message.split('\n')[0]}`); }
    }
  }
}
console.log('\n[probe-adobe-dropbox] klar');
