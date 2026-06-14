// scripts/probe-bredband-direct.mjs — v4: hitta adresser DÄR Tele2 har fast bredband + dumpa pris.
// Giltig infrastruktur-enum (ur Zod-felet): VILLA_FIBER | LAN | COAX.
// Tele2:s fasta bredband är tillgänglighets-gatat (Sveavägen 44 → 0 produkter, bara mobilt).
// Skannar adress-id från täta bostadsgator tills produktlistor med priser hittas. Skriver inget.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': 'sv-SE,sv;q=0.9' };
const ENTRY_ID = '9cQPebFT7wUEj8FwrzG6F';
const INFRA = encodeURIComponent(JSON.stringify(['VILLA_FIBER', 'LAN', 'COAX']));

// Täta bostadsgator i olika orter (storstad / förort / mindre ort) → många byggnads-id att skanna.
const STREETS = [
  'Götgatan, Stockholm',
  'Odinsgatan, Göteborg',
  'Föreningsgatan, Malmö',
  'Storgatan, Sundbyberg',
  'Drottninggatan, Norrköping',
  'Storgatan, Östersund',
];

async function getJson(url) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 12000);
  try { const r = await fetch(url, { headers: H, signal: ac.signal }); const txt = await r.text();
    let j = null; try { j = JSON.parse(txt); } catch {} return { status: r.status, json: j, raw: txt.slice(0, 400) };
  } catch (e) { return { status: 'ERR ' + e.name, json: null, raw: e.message }; } finally { clearTimeout(t); }
}

let found = 0;
outer:
for (const street of STREETS) {
  const a = await getJson(`https://www.tele2.se/api/feasibility/addresses?query=${encodeURIComponent(street)}`);
  const results = a.json?.results ?? [];
  console.log(`\n#### ${street} → ${results.length} adresser`);
  for (const hit of results.slice(0, 8)) {
    const p = await getJson(`https://www.tele2.se/api/broadband/products?category=REGULAR&addressId=${hit.id}&groupAgreement=false&infrastructure=${INFRA}&entryId=${ENTRY_ID}`);
    const prods = p.json?.products ?? [];
    if (p.status === 200 && prods.length) {
      console.log(`  ✓ ${hit.address} (id=${hit.id}) → ${prods.length} produkter`);
      console.log('     RÅ PRODUKT[0]:', JSON.stringify(prods[0]).slice(0, 1300));
      for (const pr of prods.slice(0, 10)) {
        const name = pr.name ?? pr.title ?? pr.displayName ?? pr.productName ?? '?';
        const speed = pr.downloadSpeed ?? pr.speed ?? pr.bandwidth ?? pr.downstreamKbit ?? '?';
        const price = pr.price ?? pr.monthlyPrice ?? pr.priceAmount ?? pr.amount ?? pr.recurringPrice
          ?? (pr.campaign && (pr.campaign.price ?? pr.campaign.monthlyPrice)) ?? JSON.stringify(pr.prices ?? pr.pricing ?? null).slice(0, 110);
        console.log(`        · ${JSON.stringify(name)} [${JSON.stringify(speed)}] → ${JSON.stringify(price)}`);
      }
      if (++found >= 3) break outer; // 3 served adresser räcker för att se pris-spridning
    }
  }
}
if (!found) console.log('\n(inga adresser med Tele2 fast bredband i urvalet)');
console.log('\n[probe-bredband-direct v4] klar · served=' + found);
