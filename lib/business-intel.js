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

// Konservativ grind: EXAKT normaliserad likhet, och exakt EN träff — annars null (hellre tystnad).
export function matchCompany(sld, companies) {
  if (!sld || !Array.isArray(companies)) return null;
  const hits = companies.filter((c) => c?.orgnr && normalizeCompanyName(c.legalName ?? c.name) === sld);
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

const fmtNum = (n) => Math.round(n).toLocaleString('sv-SE');
const fmtMkr = (tkr) => (tkr / 1000).toLocaleString('sv-SE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtKr2 = (n) => Number(n).toLocaleString('sv-SE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Fynden — REN funktion (testbar). msTiers = Microsofts VERIFIERADE Business-planer
// (BRANCHINDEX licenseTierBenchmarks: kr/anv/MÅN på årsavtal, källa microsoft.com).
//
// TVÅ GRUNDARLÄRDOMAR 2026-07-01 bor i costline-raden:
//  1. Aldrig p25/estimat under en "verifierat"-etikett (regel 3: fel proveniens på ett tal).
//  2. Aldrig en ANTAGEN plan: DNS bevisar M365-plattformen, inte vilken plan — och "från
//     Standard-priset" var inte ens ett sant golv (Basic är billigare). Därför visas hela det
//     verifierade SPANNET över Business-planerna, och det vi INTE vet ("vilken plan betalar ni
//     för?") blir kroken — vilket är ärligt, för tier-detektering ur fakturan är exakt vad
//     recommend-pipelinen gör (tests/saas-tier-detection.mjs).
export function buildBusinessFindings(facts, { msTiers } = {}) {
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
  const tiers = (msTiers?.tiers ?? []).filter((t) => Number.isFinite(Number(t.monthly)) && t.monthly > 0 && t.label);
  if (tiers.length >= 2) {
    const lo = Math.min(...tiers.map((t) => t.monthly)) * 12 * facts.employees;
    const hi = Math.max(...tiers.map((t) => t.monthly)) * 12 * facts.employees;
    const tierList = tiers.map((t) => `${t.label} ${fmtKr2(t.monthly)}`).join(' · ');
    f.push({
      kind: 'costline', confidence: 'high',
      title: `Era Microsoft-licenser: ${fmtNum(lo)}–${fmtNum(hi)} kr/år för ${facts.employees} platser — beroende på plan`,
      detail: `Microsofts Business-planer på årsavtal (publik prislista): ${tierList} kr/användare/mån × era ${facts.employees} anställda × 12 mån. Vilken plan ni betalar för — och om varje plats faktiskt används — ser vi på er första faktura.`,
      source: `Microsofts publika prislista (microsoft.com${msTiers.lastVerified ? `, ${msTiers.lastVerified}` : ''}) × antal anställda ur årsredovisningen`,
    });
  }
  return f;
}

// Sammanfoga affärsfynd + DNS-fynd: affären leder (käftsläpparen), och när affärsfynd finns
// behövs DNS-golvets värde-brygga inte längre (den skulle bli en dubblett av costline-bryggan).
export function mergeRevealFindings(businessFindings, dnsFindings) {
  const biz = businessFindings ?? [];
  const dns = dnsFindings ?? [];
  return biz.length ? [...biz, ...dns.filter((f) => !f.floor)] : dns;
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
