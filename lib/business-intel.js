// lib/business-intel.js — AFFÄRSHJÄRNAN i avslöjandet: domän → bolagets offentliga
// årsredovisningsuppgifter (omsättning, anställda, bokslutsår) → CFO-relevanta fynd.
//
// Bibelns T1-tes, nu byggd: "Bolagsverket/allabolag-data ger CFO-relevanta fynd utan DNS.
// Starkaste 'hur visste de det'-källan." Flottdiagnosen 2026-07-01 bevisade behovet: DNS-fynden
// fyrar pålitligt men milt ("ni kör M365") — affärsdatan är det som får en CFO att rycka till.
//
// KÄLLA & INTEGRITET:
//  · Uppgifterna är OFFENTLIGA årsredovisningsdata (allabolags egen JSON källmärker Bolagsverket/UC).
//    Vi gör enstaka on-demand-uppslag per prospekt — aldrig massinsamling.
//  · MATCHNINGSGRINDEN ÄR KONSERVATIV (regel 4): fel bolags omsättning vore en integritetskatastrof.
//    Sökträffen används ENDAST vid exakt normaliserad namnmatch — och exakt EN sådan. Allt annat → null
//    (sond v3: "netigate" gav både Netigate AB och Netigate Holding AB — bara den exakta släpps igenom;
//    "kan.se" → "Kanmalmo AB" matchar inte → tystnad, aldrig en chansning).
//  · profit-fältet används ALDRIG i kundcopy — dess etikett (rörelseresultat vs finansnetto) är inte
//    entydigt verifierad (regel 3: fel etikett på ett tal är en falsk siffra).
//
// Parsning-kontraktet (verifierat mot verkligheten i ops/probe-business-intel.txt, sond v3):
//  sök:   props.pageProps.hydrationData.searchStore.companies.companies[] → { legalName, orgnr }
//  bolag: props.pageProps.company → { legalName, orgnr, revenue (tkr), employees, companyAccountsLastUpdatedDate }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const HEADERS = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,*/*;q=0.8' };

export function sldFromDomain(domain) {
  const d = String(domain || '').trim().toLowerCase();
  const label = d.split('.')[0] || '';
  return /^[a-z0-9-]{3,}$/.test(label) ? label : null;   // <3 tecken = för generiskt att matcha säkert
}

// Normalisera bolagsnamn för matchning: gemener, bort med bolagsforms-ord och allt icke-alfanumeriskt.
export function normalizeCompanyName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/\baktiebolag(et)?\b|\bab\b|\bhb\b|\bkb\b/g, ' ')
    .replace(/[^a-z0-9åäö]/g, '');
}

// Domän-vikningen (Kristianstad-läxan 2026-07-12): domäner kan ALDRIG bära å/ä/ö eller
// mellanslag — "Kristianstads Måleri AB" normaliserades till "kristianstadsmåleri" och kunde
// därför aldrig matcha kristianstadsmaleri.se. Konsekvensen: varje svenskt bolag med å/ä/ö i
// namnet (Måleri, Städ, Elektriska …) fick aldrig sitt bokslutsfynd. Vik BÄGGE sidor till
// domänens alfabet (a-z0-9) före jämförelsen — vikningen vidgar alfabetet, ALDRIG toleransen:
// exakt-en-träff-grinden är orörd, och kolliderar två bolag efter vikning → 2 träffar → null.
export function foldToDomainAlphabet(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/[éè]/g, 'e').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '');
}

// Konservativ grind: EXAKT vikt likhet, och exakt EN träff — annars null (hellre tystnad).
export function matchCompany(sld, companies) {
  if (!sld || !Array.isArray(companies)) return null;
  const target = foldToDomainAlphabet(sld);
  if (!target) return null;
  const hits = companies.filter((c) => c?.orgnr && foldToDomainAlphabet(normalizeCompanyName(c.legalName ?? c.name)) === target);
  return hits.length === 1 ? hits[0] : null;
}

export function extractNextData(html) {
  const m = String(html || '').match(/<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

export function extractSearchCompanies(nd) {
  const list = nd?.props?.pageProps?.hydrationData?.searchStore?.companies?.companies;
  return Array.isArray(list) ? list : [];
}

// Bolagsobjekt → verifierade fakta. revenue är i TKR (sond v3: "52874" = 52 874 tkr).
export function extractCompanyFacts(nd) {
  const c = nd?.props?.pageProps?.company;
  if (!c) return null;
  const revenueTkr = Number(c.revenue);
  const employees  = Number(c.employees);
  const year       = String(c.companyAccountsLastUpdatedDate || '').slice(0, 4);
  if (!Number.isFinite(revenueTkr) || revenueTkr <= 0) return null;
  if (!Number.isFinite(employees) || employees <= 0 || employees > 100000) return null;
  if (!/^\d{4}$/.test(year)) return null;
  return { legalName: c.legalName ?? null, orgnr: c.orgnr ?? null, revenueTkr, employees, year };
}

const fmtMkr = (tkr) => (tkr / 1000).toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// Fynden — REN funktion (testbar). ETT fynd: bokslutet.
//
// GRUNDARBESLUT 2026-07-01 — costline-raden (licenskostnad × anställda) är BORTTAGEN ur
// avslöjandet, efter tre iterationer som var och en avslöjade samma rot: raden var RÄKNAD,
// inte UPPTÄCKT. (1) p25 felmärkt som "verifierat listpris" (regel 3), (2) antagen plan som
// inte ens var ett sant golv, (3) ärligt spann — som blev 3,7× brett (en axelryckning med
// siffror) och dessutom kunde visa Microsoft-priser för Google Workspace-bolag (bimobject-
// fallet i flottkörningen). Avslöjandets magi är att VARJE rad är ett upptäckt faktum om
// bolaget — en enda uträknad rad sänker de äkta. Licensmatematiken hör hemma i ANALYSEN
// efter första fakturan, där planen är KÄND (tests/saas-tier-detection.mjs).
export function buildBusinessFindings(facts) {
  if (!facts) return [];
  const f = [];
  // Fyndet namnger ALLTID den juridiska enheten (koncern-lärdomen ur flottkörningen 2026-07-01:
  // onepartnergroup.se matchade moderbolaget, inte dotterbolaget besökaren kanske jobbar i —
  // "Ert bokslut" utan enhetsnamn kunde då kännas fel; med namnet är påståendet exakt).
  f.push({
    kind: 'business', confidence: 'high',
    title: `Ert bokslut ${facts.year}: ${fmtMkr(facts.revenueTkr)} mkr i omsättning, ${facts.employees} anställda`,
    detail: `Gäller ${facts.legalName ?? 'bolaget'} — offentliga uppgifter, inget ni behövt dela. Vi läser era förutsättningar innan vi läser era fakturor.`,
    source: `Offentliga årsredovisningsuppgifter (Bolagsverket) · ${facts.legalName ?? ''} · bokslutsår ${facts.year}`,
  });
  return f;
}

// Sammanfoga affärsfynd + DNS-fynd + marknadsankare. Affären leder (käftsläpparen).
// Marknadsankaret (Kristianstad-läxan): visas när DNS-nätet saknar pengaformade "om er"-fynd
// (plattform/leverantörslista) — normalfallet för småbolag på Loopia/one.com. Det är "om
// marknaden", inte "om er", och läggs därför SIST. På ett kort som redan bär plattforms- eller
// leverantörsfynd (Lekia-klassen) utelämnas det — utspädning är motsatsen till premium.
// Golv-bryggan behövs bara när VARKEN affärsfynd ELLER ankare bär kortet.
export function mergeRevealFindings(businessFindings, dnsFindings, marketAnchor = null) {
  const biz = businessFindings ?? [];
  const dns = dnsFindings ?? [];
  const hasOmEr = dns.some((f) => f.kind === 'platform' || f.kind === 'suppliers');
  const market = marketAnchor && !hasOmEr ? [marketAnchor] : [];
  const keptDns = (biz.length || market.length) ? dns.filter((f) => !f.floor) : dns;
  return [...biz, ...keptDns, ...market];
}

// Orgnr-normalisering: "556569-0087" → "5565690087". Exakt 10 siffror, annars null (aldrig gissa).
export function normalizeOrgnr(orgnr) {
  const digits = String(orgnr || '').replace(/\D/g, '');
  return /^\d{10}$/.test(digits) ? digits : null;
}

// ORGNR-VÄGEN (utåtriktade flödet, 2026-07-02): leads-filen bär människoverifierade orgnr —
// exakt nyckel, ingen sökning, ingen namngrind, ingen förväxlingsrisk. Dörren behåller den
// försiktiga domän-vägen (fetchBusinessFacts nedan); prospect-motorn tar den exakta.
export async function fetchBusinessFactsByOrgnr(orgnr, { fetchImpl = fetch, timeoutMs = 8000 } = {}) {
  const bare = normalizeOrgnr(orgnr);
  if (!bare) return null;
  try {
    const res = await fetchImpl(`https://www.allabolag.se/${bare}`,
      { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) return null;
    return extractCompanyFacts(extractNextData(await res.text()));
  } catch { return null; }
}

// Nätverksvägen (Vercel/Actions — HTTP-egress). Fel/timeout/ingen match → null, aldrig ett kast.
export async function fetchBusinessFacts(domain, { fetchImpl = fetch, timeoutMs = 8000 } = {}) {
  const sld = sldFromDomain(domain);
  if (!sld) return null;
  try {
    const sRes = await fetchImpl(`https://www.allabolag.se/what/${encodeURIComponent(sld)}`,
      { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
    if (!sRes.ok) return null;
    const match = matchCompany(sld, extractSearchCompanies(extractNextData(await sRes.text())));
    if (!match) return null;

    const cRes = await fetchImpl(`https://www.allabolag.se/${encodeURIComponent(match.orgnr)}`,
      { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
    if (!cRes.ok) return null;
    return extractCompanyFacts(extractNextData(await cRes.text()));
  } catch { return null; }
}
