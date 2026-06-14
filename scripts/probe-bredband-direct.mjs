// scripts/probe-bredband-direct.mjs — v5: ren 3-zons-fångst + REGULAR vs BUSINESS-katalog.
// API helt knäckt: feasibility/addresses → id, broadband/products → produkter med priser
// (downstreamMbps, bindingPeriodMonths, prices[].amountExcVAT/IncVAT). Plockar FÖRSTA
// betjänade adressen per zon och dumpar rena exkl-moms-priser. Skriver inget.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': 'sv-SE,sv;q=0.9' };
const ENTRY_ID = '9cQPebFT7wUEj8FwrzG6F';
const INFRA = encodeURIComponent(JSON.stringify(['VILLA_FIBER', 'LAN', 'COAX']));

// En tät gata per zon: storstad / förort / mindre ort.
const ZONES = [
  { zone: 'A · storstad',    street: 'Götgatan, Stockholm' },
  { zone: 'B · förort',      street: 'Sturegatan, Sundbyberg' },
  { zone: 'C · mindre ort',  street: 'Storgatan, Östersund' },
];

async function getJson(url) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 12000);
  try { const r = await fetch(url, { headers: H, signal: ac.signal }); const txt = await r.text();
    let j = null; try { j = JSON.parse(txt); } catch {} return { status: r.status, json: j, raw: txt.slice(0, 300) };
  } catch (e) { return { status: 'ERR ' + e.name, json: null, raw: e.message }; } finally { clearTimeout(t); }
}

function monthly(pr, vat) {
  const arr = pr.prices ?? [];
  const m = arr.find((p) => (p.type === 'MONTHLY' || p.pricePeriod === 'MONTHLY'));
  const amt = m && (vat === 'exc' ? m.amountExcVAT : m.amountIncVAT);
  return amt ? amt.amount : null;
}

async function productsFor(id, category) {
  const p = await getJson(`https://www.tele2.se/api/broadband/products?category=${category}&addressId=${id}&groupAgreement=false&infrastructure=${INFRA}&entryId=${ENTRY_ID}`);
  return { status: p.status, prods: p.json?.products ?? [], raw: p.raw };
}

for (const z of ZONES) {
  console.log(`\n################ ${z.zone} — ${z.street} ################`);
  const a = await getJson(`https://www.tele2.se/api/feasibility/addresses?query=${encodeURIComponent(z.street)}`);
  const results = a.json?.results ?? [];
  let served = null;
  for (const hit of results.slice(0, 10)) {
    const r = await productsFor(hit.id, 'REGULAR');
    if (r.status === 200 && r.prods.length) { served = { hit, regular: r.prods }; break; }
  }
  if (!served) { console.log('  ingen betjänad adress i urvalet'); continue; }
  console.log(`  ADRESS: ${served.hit.address} (id=${served.hit.id})`);
  // BUSINESS-katalog för samma adress?
  const biz = await productsFor(served.hit.id, 'BUSINESS');
  console.log(`  REGULAR: ${served.regular.length} produkter · BUSINESS: ${biz.status}/${biz.prods.length}`);

  const dump = (label, prods) => {
    console.log(`  — ${label} —`);
    for (const pr of prods.slice(0, 12)) {
      console.log(`     ${String(pr.downstreamMbps ?? '?').padStart(4)}/${pr.upstreamMbps ?? '?'} Mbit · ${pr.bindingPeriodMonths ?? '?'}m · exkl ${monthly(pr, 'exc')} · inkl ${monthly(pr, 'inc')} kr · "${pr.invoiceText ?? pr.name}"`);
    }
  };
  dump('REGULAR', served.regular);
  if (biz.status === 200 && biz.prods.length) dump('BUSINESS', biz.prods);
}
console.log('\n[probe-bredband-direct v5] klar');
