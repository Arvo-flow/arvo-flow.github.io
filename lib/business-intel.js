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
// HISTORIKEN (Kristianstad-sonden 2026-07-12): companyAccounts[] bär fem års bokslut med
// accounts[{code, amount}] — koden SDI är EXAKT det tal allabolag själva visar som omsättning
// (bevisat: SDI 13976 = company.revenue "13976"). ANT = anställda. Amounts i TKR.
export function extractAccountHistory(companyAccounts) {
  if (!Array.isArray(companyAccounts)) return [];
  const out = [];
  for (const ca of companyAccounts) {
    const year = String(ca?.year ?? '');
    if (!/^\d{4}$/.test(year)) continue;
    const byCode = new Map((ca.accounts ?? []).map((a) => [a?.code, Number(a?.amount)]));
    const revenueTkr = byCode.get('SDI');
    if (!Number.isFinite(revenueTkr) || revenueTkr <= 0) continue;
    out.push({ year, revenueTkr, employees: Number.isFinite(byCode.get('ANT')) ? byCode.get('ANT') : null });
    if (out.length >= 5) break;
  }
  return out;                                    // allabolag levererar senaste året först — ordningen bevaras
}

export function extractCompanyFacts(nd) {
  const c = nd?.props?.pageProps?.company;
  if (!c) return null;
  const revenueTkr = Number(c.revenue);
  const employees  = Number(c.employees);
  const year       = String(c.companyAccountsLastUpdatedDate || '').slice(0, 4);
  if (!Number.isFinite(revenueTkr) || revenueTkr <= 0) return null;
  if (!Number.isFinite(employees) || employees <= 0 || employees > 100000) return null;
  if (!/^\d{4}$/.test(year)) return null;
  return {
    legalName: c.legalName ?? null, orgnr: c.orgnr ?? null, revenueTkr, employees, year,
    history: extractAccountHistory(c.companyAccounts),
  };
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

  // TRENDEN (Kristianstad-läxan, del A): två bokslutsår → riktningen, deterministiskt räknad
  // (kod räknar, regel 2). Under 5 % rörelse → tystnad (brus är inte ett fynd). Ett FALL är den
  // hetaste signalen för en kostnadstjänst — sägs med respekt, aldrig som en anklagelse; en
  // TILLVÄXT bevisar att vi läst utvecklingen, inte bara senaste raden. Aldrig ett påstående om
  // deras kostnader — bara Bolagsverkets egna tal och vad VI gör med dem.
  const h = facts.history ?? [];
  if (h.length >= 2 && h[0].revenueTkr > 0 && h[1].revenueTkr > 0) {
    const pct = Math.round(((h[0].revenueTkr - h[1].revenueTkr) / h[1].revenueTkr) * 100);
    if (Math.abs(pct) >= 5) {
      // KURVAN, inte bara deltat (2026-07-12): "tredje växande året i rad" väger tyngre än en
      // ensam procent — den bevisar att vi läst utvecklingen. Sviten: obrutna år i samma
      // riktning som senaste året, var och en ≥ 2 % (brusgolv — ett ±1 %-år är varken tillväxt
      // eller fall). Rubrikprocenten är ALLTID senaste årets (aldrig ett medel — regel 3:
      // varje tal ska gå att räkna hem ur två bokslutsrader).
      let streak = 0;
      for (let i = 0; i + 1 < h.length; i++) {
        const prev = h[i + 1].revenueTkr;
        if (!(prev > 0)) break;
        const d = (h[i].revenueTkr - prev) / prev;
        if (Math.sign(d) !== Math.sign(pct) || Math.abs(d) < 0.02) break;
        streak++;
      }
      const rising = pct > 0;
      const ORDINAL = { 2: 'Andra', 3: 'Tredje', 4: 'Fjärde' };
      const spannFrom = streak >= 2 ? h[streak] : h[1];
      const spann = `Från ${fmtMkr(spannFrom.revenueTkr)} till ${fmtMkr(h[0].revenueTkr)} mkr (bokslutsåren ${spannFrom.year} → ${h[0].year}) — offentliga bokslutssiffror.`;
      f.push({
        kind: 'trend', confidence: 'high',
        title: streak >= 2
          ? `${ORDINAL[Math.min(streak, 4)]} ${rising ? 'växande' : 'fallande'} året i rad (${rising ? '+' : '−'}${Math.abs(pct)} % senast)`
          : (rising
            ? `Er omsättning växte ${pct} % senaste bokslutsåret`
            : `Er omsättning föll ${Math.abs(pct)} % senaste bokslutsåret`),
        detail: rising
          ? `${spann} Vi läser er utveckling innan vi läser era fakturor.`
          : `${spann} När intäkterna viker väger varje kostnadskrona dubbelt — det är exakt där vi arbetar.`,
        source: `Offentliga årsredovisningsuppgifter (Bolagsverket) · bokslutsåren ${spannFrom.year}–${h[0].year}`,
      });
    }
  }
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

// Luhn-kontrollen (mod 10) — samma checksiffra som Bolagsverket använder. Verifierad mot
// riktiga orgnr i sviten (Lynxeye, Netigate m.fl.). Filtrerar telefonnummer/datum som råkar
// vara 6+4 siffror.
export function luhnValidOrgnr(digits) {
  if (!/^\d{10}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    let d = Number(digits[i]);
    if (i % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

// ORGNR-UR-SAJTEN (Kristianstad-läxan 2026-07-12, steg 2): allabolag-SÖKET självt hittar inte
// bolag vars namn bär å/ä/ö när frågan är en ascii-domän (sonden bevisade 0 träffar på
// "kristianstadsmaleri"). Den robusta vägen hoppar över namnmatchningen helt: svenska bolag
// trycker sitt organisationsnummer på sin egen sajt — och ett orgnr publicerat på bolagets EGEN
// domän är en STARKARE identitetsbindning än en namnlikhet. Tre skarpa filter (aldrig en gissning):
//   1. Luhn-checksumman måste stämma (Bolagsverkets egen kontrollsiffra)
//   2. "månadspositionen" (siffra 3–4) ≥ 20 — skiljer organisationsnummer från personnummer/datum
//   3. sajten måste ge EXAKT ETT unikt kandidatnummer — två olika → tvetydighet → null
export function extractOrgnrCandidates(html) {
  const text = String(html || '');
  const out = new Set();
  const collect = (digits) => {
    if (Number(digits.slice(2, 4)) < 20) return;   // personnummer/datum har månad 01–12
    if (!luhnValidOrgnr(digits)) return;
    out.add(digits);
  };
  const re = /\b(\d{6})[-–]?\s?(\d{4})\b/g;
  for (let m; (m = re.exec(text)); ) collect(m[1] + m[2]);
  const vat = /\bSE\s?(\d{10})\s?01\b/gi;           // momsregistreringsformatet bär samma nummer
  for (let m; (m = vat.exec(text)); ) collect(m[1]);
  return [...out];
}

// STAVNINGSORAKLET (Kristianstad-läxan, steg 3): sajtens <title> bär ofta det juridiska namnet
// RÄTTSTAVAT ("Kristianstads Måleri AB") — exakt det allabolag-söket behöver när domänen är
// ascii. Namnet används ENBART som sökfråga; identitetsgrinden är oförändrad (vikt namn måste
// exakt matcha domänens SLD, en träff). Sajten lånar oss stavningen — aldrig förtroendet.
export function extractSiteCompanyName(html) {
  const text = String(html || '');
  const title = (text.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] ?? '';
  const og = (text.match(/property=["']og:site_name["']\s+content=["']([^"']+)["']/i) || [])[1] ?? '';
  for (const src of [title, og]) {
    const m = src.match(/([A-ZÅÄÖ][\p{L}\d&.\- ]{1,50}?\s(?:AB|Aktiebolag(?:et)?))\b/u);
    if (m) return m[1].trim();
  }
  return null;
}

// Hämta bolagets egen sajt och läs orgnr — startsidan först, /kontakt och /om-oss bara om den
// inte bar. Ett enda unikt nummer krävs över allt läst; annars null.
export async function fetchOrgnrFromWebsite(domain, { fetchImpl = fetch, timeoutMs = 6000 } = {}) {
  const candidates = new Set();
  const pages = ['', 'kontakt', 'om-oss'];
  for (const page of pages) {
    for (const host of [domain, `www.${domain}`]) {
      try {
        const res = await fetchImpl(`https://${host}/${page}`,
          { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
        if (!res.ok) continue;
        for (const o of extractOrgnrCandidates(await res.text())) candidates.add(o);
        break;                                       // hosten svarade — hoppa www-varianten
      } catch { /* nästa variant */ }
    }
    if (candidates.size > 0 && page === '') break;   // startsidan bar → klart
  }
  return candidates.size === 1 ? [...candidates][0] : null;
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

// Sök på allabolag med given fråga och släpp igenom ENDAST en exakt (vikt) SLD-match — grinden
// är densamma oavsett varifrån frågan kom (regel 4: fel bolags omsättning är en katastrof).
async function searchAndMatch(query, sld, fetchImpl, timeoutMs) {
  const sRes = await fetchImpl(`https://www.allabolag.se/what/${encodeURIComponent(query)}`,
    { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
  if (!sRes.ok) return null;
  const match = matchCompany(sld, extractSearchCompanies(extractNextData(await sRes.text())));
  if (!match) return null;

  const cRes = await fetchImpl(`https://www.allabolag.se/${encodeURIComponent(match.orgnr)}`,
    { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(timeoutMs) });
  if (!cRes.ok) return null;
  return extractCompanyFacts(extractNextData(await cRes.text()));
}

// Nätverksvägen (Vercel/Actions — HTTP-egress). Fel/timeout/ingen match → null, aldrig ett kast.
// TRE vägar i ordning (Kristianstad-läxan): sajten hämtas EN gång och läses två sätt.
//   1 · ORGNR på bolagets egen sajt → exakt uppslag utan namnmatchning (starkast bindning).
//   2 · STAVNINGSORAKLET: sajtens rättstavade namn (å/ä/ö) som sökfråga — ascii-söket ger 0
//       träffar på "kristianstadsmaleri", men "Kristianstads Måleri AB" träffar. Grinden orörd.
//   3 · ascii-SLD-söket (ursprungliga vägen) — bär fortfarande alla bolag utan å/ä/ö.
export async function fetchBusinessFacts(domain, { fetchImpl = fetch, timeoutMs = 8000 } = {}) {
  const sld = sldFromDomain(domain);
  if (!sld) return null;

  let siteHtml = null;
  for (const host of [domain, `www.${domain}`]) {
    try {
      const res = await fetchImpl(`https://${host}/`,
        { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(6000) });
      if (res.ok) { siteHtml = await res.text(); break; }
    } catch { /* nästa host */ }
  }

  if (siteHtml) {
    try {
      const cands = extractOrgnrCandidates(siteHtml);
      if (cands.length === 1) {
        const facts = await fetchBusinessFactsByOrgnr(cands[0], { fetchImpl, timeoutMs });
        if (facts) return facts;
      }
    } catch { /* vidare */ }

    try {
      const siteName = extractSiteCompanyName(siteHtml);
      if (siteName && foldToDomainAlphabet(normalizeCompanyName(siteName)) === foldToDomainAlphabet(sld)) {
        const facts = await searchAndMatch(siteName, sld, fetchImpl, timeoutMs);
        if (facts) return facts;
      }
    } catch { /* vidare */ }
  }

  try {
    return await searchAndMatch(sld, sld, fetchImpl, timeoutMs);
  } catch { return null; }
}
