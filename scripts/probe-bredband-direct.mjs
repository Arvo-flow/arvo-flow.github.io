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
  'Domnarvsgatan 4, Spånga',
  'Storgatan 1, Östersund',
];
const INFRA = ['FIBER', 'FIBRE', 'COAX', 'LAN'];
const ENTRY_ID = '9cQPebFT7wUEj8FwrzG6F'; // fångat i v7 (Contentful-entry för bredbandssidan)

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

  // Products-endpointen: entryId krävs (400 utan). Prova param-varianter, dumpa RÅ svar.
  const infraParam = encodeURIComponent(JSON.stringify(INFRA));
  const addrParam = encodeURIComponent(hit.address);
  const variants = [
    `category=REGULAR&addressId=${hit.id}&groupAgreement=false&infrastructure=${infraParam}&entryId=${ENTRY_ID}`,
    `category=REGULAR&addressId=${hit.id}&groupAgreement=false&infrastructure=${infraParam}&entryId=${ENTRY_ID}&address=${addrParam}`,
  ];
  for (let i = 0; i < variants.length; i++) {
    const p = await getJson(`https://www.tele2.se/api/broadband/products?${variants[i]}`);
    const prods = p.json?.products ?? null;
    console.log(`  products[v${i}] → ${p.status} · status=${JSON.stringify(p.json?.status ?? null)} · produkter=${prods ? prods.length : 'n/a'}`);
    if (p.status !== 200) { console.log(`     RÅ: ${p.raw}`); continue; }
    if (prods && prods.length) {
      console.log('  >>> RÅ PRODUKT[0]:', JSON.stringify(prods[0]).slice(0, 900));
      for (const pr of prods.slice(0, 8)) {
        const name = pr.name ?? pr.title ?? pr.displayName ?? pr.productName ?? '?';
        const speed = pr.downloadSpeed ?? pr.speed ?? pr.bandwidth ?? '?';
        const price = pr.price ?? pr.monthlyPrice ?? pr.priceAmount ?? pr.amount ?? pr.recurringPrice ?? JSON.stringify(pr.prices ?? pr.pricing ?? null).slice(0, 80);
        console.log(`        · ${JSON.stringify(name)} (${JSON.stringify(speed)}) → pris ${JSON.stringify(price)}`);
      }
      break;
    } else { console.log(`     tom produktlista · RÅ: ${p.raw}`); }
  }
}
console.log('\n[probe-bredband-direct] klar');
