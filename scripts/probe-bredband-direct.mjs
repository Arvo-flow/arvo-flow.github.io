// scripts/probe-bredband-direct.mjs — direkt-fetch mot Tele2:s feasibility-API (ingen Playwright).
// v7 avslöjade två rena JSON-endpoints:
//   GET /api/feasibility/addresses?query=...        → { results:[{id,address}] }
//   GET /api/broadband/products?addressId=..&...     → { status, products:[...] }
// Den här sonden replayar dem direkt för flera adresser och dumpar PRODUKT-strukturen
// (pris/hastighet) så vi kan skriva en deterministisk 3-zons-vakt. Skriver inget.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': 'sv-SE,sv;q=0.9' };

// Kandidat-adresser: storstad / industriområde / mindre ort (geografisk spridning).
const QUERIES = [
  'Sveavägen 44, Stockholm',
  'Kungsgatan 1, Göteborg',
  'Domnarvsgatan 4, Spånga',
  'Storgatan 1, Östersund',
  'Stortorget 1, Malmö',
];
const INFRA = ['FIBER', 'FIBRE', 'COAX', 'LAN'];

async function getJson(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 15000);
  try {
    const r = await fetch(url, { headers: H, signal: ac.signal });
    const txt = await r.text();
    let j = null; try { j = JSON.parse(txt); } catch {}
    return { status: r.status, json: j, raw: txt.slice(0, 300) };
  } catch (e) { return { status: 'ERR ' + e.name, json: null, raw: e.message }; }
  finally { clearTimeout(t); }
}

for (const q of QUERIES) {
  console.log(`\n================ ${q} ================`);
  const a = await getJson(`https://www.tele2.se/api/feasibility/addresses?query=${encodeURIComponent(q)}`);
  console.log(`feasibility/addresses → ${a.status}`);
  const results = a.json?.results ?? [];
  if (!results.length) { console.log('  inga adresser:', a.raw); continue; }
  // Välj första träff (i en vakt: matcha exakt på address-strängen).
  const hit = results[0];
  console.log(`  vald: id=${hit.id} · ${hit.address}  (av ${results.length} träffar)`);

  // Prova products-endpointen med och utan entryId, bred infrastruktur.
  const infraParam = encodeURIComponent(JSON.stringify(INFRA));
  for (const extra of ['', '&groupAgreement=false']) {
    const url = `https://www.tele2.se/api/broadband/products?category=REGULAR&addressId=${hit.id}&infrastructure=${infraParam}${extra}`;
    const p = await getJson(url);
    const prods = p.json?.products ?? null;
    console.log(`  products [${extra || 'bas'}] → ${p.status} · status=${JSON.stringify(p.json?.status ?? null)} · produkter=${prods ? prods.length : 'n/a'}`);
    if (prods && prods.length) {
      console.log('  >>> RÅ PRODUKT[0]:', JSON.stringify(prods[0]).slice(0, 700));
      for (const pr of prods.slice(0, 6)) {
        const name = pr.name ?? pr.title ?? pr.displayName ?? pr.speed ?? '?';
        const price = pr.price ?? pr.monthlyPrice ?? pr.priceAmount ?? pr.amount ?? pr.recurringPrice ?? (pr.prices && pr.prices[0]) ?? '?';
        console.log(`        · ${JSON.stringify(name)} → pris ${JSON.stringify(price)}`);
      }
      break;
    } else if (p.json && prods && prods.length === 0) {
      console.log(`     (tom produktlista — adressen saknar fiber/COAX hos Tele2)`);
    }
  }
}
console.log('\n[probe-bredband-direct] klar');
