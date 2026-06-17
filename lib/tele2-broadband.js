// lib/tele2-broadband.js — ENDA läsvägen för Tele2:s adress-prissatta bredbandspriser.
//
// Tele2:s fasta bredband är adress- OCH nät-beroende (inget rikstäckande listpris). Två rena
// publika JSON-endpoints (reverse-engineerade 2026-06-14):
//   GET /api/feasibility/addresses?query=...                        → { results:[{id,address}] }
//   GET /api/broadband/products?category=REGULAR&addressId=..&...   → { status, products:[...] }
// Produkterna bär downstreamMbps, bindingPeriodMonths och prices[].amountExcVAT/IncVAT.
// Används av driftvakten (scripts/verify.mjs tele2-bredband (fabriken)). Ingen DOM, ingen auth.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const HEADERS = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': 'sv-SE,sv;q=0.9' };

// Giltig infrastruktur-enum (ur API:ts Zod-schema): VILLA_FIBER | LAN | COAX.
const INFRA = encodeURIComponent(JSON.stringify(['VILLA_FIBER', 'LAN', 'COAX']));
// Contentful-entry för bredbandskatalogen (krävs av products-endpointen).
const ENTRY_ID = '9cQPebFT7wUEj8FwrzG6F';
const BASE = 'https://www.tele2.se/api';

async function getJson(url, timeoutMs = 12000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { headers: HEADERS, signal: ac.signal });
    if (!r.ok) return { ok: false, status: r.status, json: null };
    return { ok: true, status: r.status, json: await r.json() };
  } catch (e) { return { ok: false, status: 'ERR ' + e.name, json: null }; }
  finally { clearTimeout(t); }
}

/**
 * Slår upp ett adress-id för en exakt adress-sträng. Returnerar { id, address } eller null.
 * Matchar i första hand exakt (normaliserat), annars första träffen.
 */
export async function resolveTele2AddressId(query) {
  const r = await getJson(`${BASE}/feasibility/addresses?query=${encodeURIComponent(query)}`);
  const results = r.json?.results ?? [];
  if (!results.length) return null;
  const norm = (s) => (s || '').toUpperCase().replace(/[\s,]+/g, ' ').trim();
  const wanted = norm(query);
  const exact = results.find((x) => norm(x.address).startsWith(wanted.split(' ').slice(0, 2).join(' ')));
  return exact ?? results[0];
}

// "Bredband Max 250/50" → 'Max'; "Bredband Standard 250" → 'Standard'.
function familyOf(p) {
  const t = `${p.invoiceText ?? ''} ${p.content?.title ?? ''} ${p.name ?? ''}`;
  if (/\bMax\b/i.test(t)) return 'Max';
  if (/\bStandard\b/i.test(t)) return 'Standard';
  return 'Other';
}

function monthly(p, vat) {
  const m = (p.prices ?? []).find((x) => x.type === 'MONTHLY' || x.pricePeriod === 'MONTHLY');
  const amt = m && (vat === 'exc' ? m.amountExcVAT : m.amountIncVAT);
  return amt ? amt.amount : null;
}

/**
 * Normaliserar ETT rått Tele2-produktobjekt → vårt schema (ren funktion, testbar offline).
 * @returns {{family,downMbps,upMbps,bindingMonths,monthlyExcVat,monthlyIncVat,label}}
 */
export function normalizeTele2Product(p) {
  return {
    family: familyOf(p),
    downMbps: p.downstreamMbps ?? null,
    upMbps: p.upstreamMbps ?? null,
    bindingMonths: p.bindingPeriodMonths ?? null,
    monthlyExcVat: monthly(p, 'exc'),
    monthlyIncVat: monthly(p, 'inc'),
    label: p.invoiceText ?? p.content?.title ?? p.name ?? '?',
  };
}

/**
 * Normaliserade Tele2-bredbandsprodukter för ett adress-id.
 * `addressString` (den upplösta adressen) krävs av API:t sedan 2026-06 — utan den
 * svarar products-endpointen 500 "Failed to get broadband products" (driftfix).
 * @returns {Promise<Array<{family,downMbps,upMbps,bindingMonths,monthlyExcVat,monthlyIncVat,label}>>}
 */
export async function fetchTele2Products(addressId, addressString = '') {
  const addrParam = addressString ? `&address=${encodeURIComponent(addressString)}` : '';
  const r = await getJson(`${BASE}/broadband/products?category=REGULAR&addressId=${addressId}&groupAgreement=false&infrastructure=${INFRA}&entryId=${ENTRY_ID}${addrParam}`);
  const prods = r.json?.products ?? [];
  return prods.map(normalizeTele2Product).filter((p) => p.monthlyExcVat != null);
}

/**
 * Allt-i-ett: adress-sträng → normaliserade produkter (eller [] om obetjänad).
 * @returns {Promise<{address:string|null, addressId:number|null, products:Array}>}
 */
export async function tele2BroadbandFor(query) {
  const a = await resolveTele2AddressId(query);
  if (!a) return { address: null, addressId: null, products: [] };
  const products = await fetchTele2Products(a.id, a.address);
  return { address: a.address, addressId: a.id, products };
}
