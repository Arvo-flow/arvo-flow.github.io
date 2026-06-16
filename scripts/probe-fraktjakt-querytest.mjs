// scripts/probe-fraktjakt-querytest.mjs — nita kontraktet för det ÖPPNA API:t.
//
// Fynd: Fraktjakt har ett ÖPPET API med en dokumenterad TEST-endpoint /xml/query_test och en
// API-manual. Kontot är "helt gratis" (privatkonto, separat från företagsregistrering). Den
// här sonden (1) läser API-manualen för exakt query_test-kontrakt + ev. dokumenterad
// test-consignor, och (2) ANROPAR /xml/query_test för att se svaret/kravet i klartext.
// Allt legitimt: query_test är publicerad just för utvecklartest. Ren fetch (GH Actions).

const UA = 'ArvoFlow-Recon/1.0 (+https://arvoflow.se)';
const H = { 'User-Agent': UA, Accept: 'text/html,application/xml,text/xml,application/xhtml+xml', 'Accept-Language': 'sv-SE,sv;q=0.9' };

async function get(url, timeoutMs = 12000) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try { const r = await fetch(url, { headers: H, redirect: 'follow', signal: ac.signal }); return { status: r.status, ct: (r.headers.get('content-type') || '').split(';')[0], finalUrl: r.url, body: await r.text() }; }
  catch (e) { return { status: 'ERR ' + e.name, ct: '', finalUrl: url, body: '' }; }
  finally { clearTimeout(t); }
}
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// 1) Hitta API-manualens länk från integrations-sidan.
console.log('==================== 1. Hitta API-manualen ====================');
const integ = await get('https://api.fraktjakt.se/services/integrations?locale=sv');
const manualLinks = new Set();
let m; const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
while ((m = re.exec(integ.body || ''))) {
  const href = m[1], label = strip(m[2]);
  if (/(api[\s-]?manual|api[\s-]?doc|apidoc|manual|dokumentation|developer|utvecklare)/i.test(href + ' ' + label)) {
    try { manualLinks.add(new URL(href, integ.finalUrl).href.split('#')[0] + `  («${label.slice(0, 40)}»)`); } catch {}
  }
}
console.log(manualLinks.size ? [...manualLinks].join('\n') : '(ingen manuallänk hittad)');

// 2) Läs varje manual-sida och plocka query_test/consignor/test-credential-relevanta meningar.
const manualUrls = [...manualLinks].map((s) => s.split('  («')[0]);
for (const url of manualUrls.slice(0, 4)) {
  const r = await get(url);
  const t = strip(r.body || '');
  console.log(`\n######## MANUAL [${r.status}] ${url} ########`);
  console.log(`titel: ${((r.body || '').match(/<title>([^<]*)<\/title>/i) || [])[1] || ''}`);
  const sents = t.split(/(?<=[.!?])\s+/).filter((s) => /(query_test|consignor|api[_\s-]?key|nyckel|test[\s_-]?(konto|consignor|server|nyckel)?|exempel|value|address_to|weight|shipping_product)/i.test(s));
  [...new Set(sents)].slice(0, 25).forEach((s) => console.log('  • ' + s.slice(0, 280)));
}

// 3) ANROPA query_test direkt (både GET och en minimal XML-POST) för att se kravet/svaret.
console.log('\n==================== 3. Anropa /xml/query_test ====================');
for (const base of ['https://api.fraktjakt.se', 'https://www.fraktjakt.se']) {
  // 3a) GET med enkla parametrar.
  const gurl = `${base}/xml/query_test?value=1000&address_to=41103&weight=5.0&toZip=41103&fromZip=11122`;
  const g = await get(gurl);
  console.log(`\nGET ${gurl}\n  [${g.status} ${g.ct}] ${g.finalUrl !== gurl ? '→ ' + g.finalUrl : ''}`);
  console.log('  ' + strip(g.body || '').slice(0, 400));

  // 3b) Minimal XML-POST (Fraktjakts query-format) — visar exakt vad som krävs.
  const xml = `<?xml version="1.0" encoding="UTF-8"?><shipment><value>1000</value><address_to><postal_code>41103</postal_code><country_code>SE</country_code></address_to><address_from><postal_code>11122</postal_code><country_code>SE</country_code></address_from><commodities><commodity><weight>5.0</weight></commodity></commodities></shipment>`;
  try {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 12000);
    const r = await fetch(`${base}/xml/query_test`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/xml' }, body: 'xml=' + encodeURIComponent(xml), signal: ac.signal });
    const body = await r.text();
    clearTimeout(t);
    console.log(`POST ${base}/xml/query_test\n  [${r.status} ${(r.headers.get('content-type') || '').split(';')[0]}]`);
    console.log('  ' + strip(body).slice(0, 500));
  } catch (e) { console.log(`POST ${base}/xml/query_test — ERR ${e.name}`); }
}
console.log('\n[probe-fraktjakt-querytest] klar');
