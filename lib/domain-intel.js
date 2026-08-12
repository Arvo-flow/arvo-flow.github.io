// lib/domain-intel.js — domän-intelligens: e-poststack, domänålder, M365-onboarding.
//
// EN sanning (regel 1): den DNS/RDAP/crt.sh-logik som tidigare bara levde i scripts/score-leads.mjs
// (den utgående fynd-motorn) bor nu HÄR och importeras av både score-leads och api/reveal.
// Allt är källbelagt och gratis (DNS + publika register) — ingen betald API, inget gissat.
//
// Används av "Avslöjandet": kundens e-postdomän → ett skarpt "hur visste de det?"-kort vid
// första inloggningen, byggt UTESLUTANDE på verifierbar publik fakta (regel 3: varje rad har källa).

import { promises as dns } from 'dns';
import { domainToASCII, domainToUnicode } from 'node:url';
import { swMonthYear } from './format.js';
import { normalizeOrgnr, fetchBusinessFacts, fetchBusinessFactsByOrgnr, buildBusinessFindings, buildLicensspannFinding, mergeRevealFindings } from './business-intel.js';
import { getPublicListBenchmark } from './benchmark.js';
// Prisboken direkt (deterministisk, ingen I/O) — licensspannet läser de vaktade M365-nivåerna.
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { getKv } from './kv.js';
import { koaDoman } from './ct-ko.js';

// Kända mail-gateways — SPF som pekar hit är en medveten säkerhetsleverantör framför e-posten.
const MAIL_GATEWAYS = [
  ['mimecast', 'Mimecast'], ['barracuda', 'Barracuda'], ['pphosted', 'Proofpoint'],
  ['ppe-hosted', 'Proofpoint'], ['messagelabs', 'Symantec MessageLabs'], ['mailcontrol', 'Forcepoint'],
  ['antispamcloud', 'SpamExperts'], ['emailsrvr', 'Rackspace'], ['sdmarc', 'SPF/DMARC-hanteringstjänst'],
  ['dmarcian', 'dmarcian'], ['easydmarc', 'EasyDMARC'],
];

const M365_FINGERPRINTS = ['autodiscover', 'enterpriseregistration', 'msoid', 'lyncdiscover'];

// Expandera en SPF-post rekursivt (max 2 nivåer, respekterar 10-uppslagsgränsen).
export async function expandSpf(domain, depth = 0, seen = new Set()) {
  if (depth > 2 || seen.has(domain)) return { mechanisms: [], lookups: 0 };
  seen.add(domain);
  let txts;
  try { txts = (await dns.resolveTxt(domain)).map((c) => c.join('')); }
  catch { return { mechanisms: [], lookups: 0 }; }
  const spf = txts.find((t) => t.toLowerCase().startsWith('v=spf1'));
  if (!spf) return { mechanisms: [], lookups: 0 };

  const tokens = spf.split(/\s+/).slice(1);
  let mechanisms = [...tokens];
  let lookups = 0;
  for (const tok of tokens) {
    if (/^[+\-~?]?(a|mx|ptr|exists)([:/]|$)/i.test(tok)) lookups++;
    const target = tok.match(/^[+\-~?]?include:(.+)/i)?.[1] ?? tok.match(/^redirect=(.+)/i)?.[1];
    if (target) {
      lookups++;
      const sub = await expandSpf(target, depth + 1, seen);
      mechanisms = mechanisms.concat(sub.mechanisms);
      lookups += sub.lookups;
    }
  }
  return { mechanisms, lookups };
}

// DNS-postur: en svep avslöjar e-poststacken (MX/SPF/DMARC/DKIM/MTA-STS) + IT-mognad (NS).
export async function getDnsPosture(domain) {
  const d = domain?.trim()?.toLowerCase();
  const p = { mx: 'unknown', spf: null, spfLookups: 0, spfM365: false,
              spfGateway: null, spfDelegated: false, spfMissing: false,
              dmarc: null, dmarcRua: null, mtaSts: false, dkimM365: false,
              nsProvider: 'unknown', nsDetail: null,
              exists: false };   // spökdomän-läxan: sätts av VARJE lyckat uppslag mot apex
  if (!d) return p;

  // Existensbeviset: SOA/NS/A på apex — en registrerad, delegerad domän svarar på minst ett.
  for (const probe of [() => dns.resolveSoa(d), () => dns.resolveNs(d), () => dns.resolve4(d)]) {
    try { await probe(); p.exists = true; break; } catch { /* nästa */ }
  }

  try {
    const recs  = (await dns.resolveMx(d)).map((r) => r.exchange.toLowerCase());
    const hosts = recs.join(' ');
    if      (hosts.includes('mail.protection.outlook.com'))                 p.mx = 'microsoft365';
    else if (hosts.includes('google.com') || hosts.includes('googlemail')) p.mx = 'google';
    else if (hosts.includes('zoho'))                                        p.mx = 'zoho';
    else if (recs.length)                                                   p.mx = 'other';
    if (recs.length) p.exists = true;
  } catch {}

  try {
    const txts = (await dns.resolveTxt(d)).map((c) => c.join(''));
    const spf  = txts.find((t) => t.toLowerCase().startsWith('v=spf1'));
    if (spf) {
      p.spf = spf;
      const { mechanisms, lookups } = await expandSpf(d);
      const all = mechanisms.join(' ').toLowerCase();
      p.spfLookups = lookups;
      p.spfM365    = all.includes('protection.outlook.com');
      p.spfGoogle  = all.includes('_spf.google.com');
      p.spfGateway = MAIL_GATEWAYS.find(([m]) => all.includes(m))?.[1] ?? null;
      p.spfDelegated = /\bredirect=/i.test(spf) && !p.spfM365 && !p.spfGateway;
      p.spfMechanisms = mechanisms;   // Lekia-läxan 2026-07-12: SPF:en är en leverantörslista i klartext
    } else {
      p.spfMissing = true;
    }
  } catch {}

  try {
    const txts = (await dns.resolveTxt(`_dmarc.${d}`)).map((c) => c.join(''));
    const rec  = txts.find((t) => t.toLowerCase().startsWith('v=dmarc1'));
    if (rec) {
      p.dmarc    = (rec.match(/p=(\w+)/i)?.[1] ?? 'unknown').toLowerCase();
      p.dmarcRua = rec.match(/rua=mailto:([^\s;,>]+)/i)?.[1] ?? null;
    } else {
      p.dmarcAbsent = true;                       // TXT-svar utan DMARC-post = definitivt frånvarande
    }
  } catch (e) {
    // Integritetsgränsen (förfalskningsfyndet): ENOTFOUND/ENODATA är DNS:ens definitiva "posten
    // finns inte" — allt annat (timeout, servfail) är OKÄNT och får ALDRIG bli ett "ni saknar
    // skydd"-påstående (regel 3: ett faktum kräver ett definitivt svar, inte ett uteblivet).
    if (e?.code === 'ENOTFOUND' || e?.code === 'ENODATA') p.dmarcAbsent = true;
  }

  try {
    const txts = (await dns.resolveTxt(`_mta-sts.${d}`)).map((c) => c.join(''));
    p.mtaSts = txts.some((t) => t.toLowerCase().startsWith('v=stsv1'));
  } catch {}

  try {
    const cname = await dns.resolveCname(`selector1._domainkey.${d}`);
    p.dkimM365  = cname.some((c) => c.toLowerCase().includes('onmicrosoft.com'));
  } catch {}

  const CLOUD_NS = ['cloudflare', 'awsdns', 'azure-dns', 'hetzner', 'excedodns', 'oraclecloud', 'dnsimple', 'nsone'];
  const REGISTRAR_NS = ['loopia', 'one.com', 'binero', 'ztld', 'glesys', 'websupport', 'domainnameshop'];
  try {
    const ns    = (await dns.resolveNs(d)).map((n) => n.toLowerCase());
    const nsStr = ns.join(' ');
    const cloud = CLOUD_NS.find((s) => nsStr.includes(s));
    const reg   = REGISTRAR_NS.find((s) => nsStr.includes(s));
    if (cloud)    { p.nsProvider = 'cloud';     p.nsDetail = cloud; }
    else if (reg) { p.nsProvider = 'registrar'; p.nsDetail = reg;   }
    else          { p.nsProvider = 'other'; }
  } catch {}

  return p;
}

// RDAP — domänregistreringsdatum (HTTP, körs på Vercel/Actions).
// FLIMMERVAKTEN (grundardelegerat beslut 2026-07-12): crt.sh och RDAP svarar ojämnt — ett kort
// vars rader kommer och går mellan sidladdningar underminerar förtroendet för ALLA raderna.
// Ett verifierat svar är ett OFÖRÄNDERLIGT historiskt faktum (äldsta cert-datum/registreringsdag
// blir aldrig annorlunda) — att minnas det i KV är inte en gissning, det är minne. Integritets-
// linjen: ENDAST lyckade, innehållsbärande svar cachas (via worthCaching) — fel och tomma svar
// cachas aldrig (de kan vara transienta). Utan KV (sandbox/test) → ren genomströmning.
const INTEL_CACHE_TTL = 30 * 24 * 3600;   // 30 dygn — fakta är historiska, inte färskvara
async function cachedLookup(key, fetcher, worthCaching, kvClient) {
  const kv = kvClient !== undefined ? kvClient : getKv();
  if (kv) { try { const hit = await kv.get(key); if (hit) return hit; } catch { /* genomströmning */ } }
  const val = await fetcher();
  if (kv && val && worthCaching(val)) {
    try { await kv.set(key, val, { ex: INTEL_CACHE_TTL }); } catch { /* icke-fatalt */ }
  }
  return val;
}
export { cachedLookup as _cachedLookup };   // exporterad för testlås

export async function getDomainRegistered(domain) {
  if (!domain?.trim()) return null;
  try {
    const res = await fetch(
      `https://rdap.org/domain/${encodeURIComponent(domain.trim().toLowerCase())}`,
      { headers: { Accept: 'application/rdap+json' }, signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const reg  = data.events?.find((e) => e.eventAction === 'registration');
    return reg?.eventDate?.slice(0, 10) ?? null;
  } catch { return null; }
}

// Certificate Transparency (crt.sh) — daterar M365-onboarding + äldsta cert (HTTP, Vercel).
// ── OMFÖRSÖKET (mätt fram 2026-08-12) ────────────────────────────────────────────────────────
// Uppsättningsdatumet är dörrens vassaste rad och fyrade i 2 fall av 28. Mätningen
// (ops/probe-ct-onboarding.txt) visade varför: INTE att domänerna saknar certifikat, och INTE att
// vårt fingeravtryck missar dem — utan att crt.sh svarar 502/503/timeout. Femton av sexton
// förfrågningar föll på uppströmskällan; den enda som gick igenom gav exakt rätt rad.
//
// Andra mätningen lade till paus och omförsök: 1 av 16 blev 5 av 16, och TRE av de fem träffarna
// kom på försök 2 eller 3. Strypningen är alltså övergående — ett omförsök är skillnaden mellan
// tystnad och "Er Microsoft 365 sattes upp november 2011".
//
// Budgeten är oförändrad mot förr (~25 s totalt), bara omfördelad: ett långt första försök som
// rymmer de tunga domänerna (skanska.se svarade på 14,5 s med 1 721 certifikat) och ett kort
// andra. Ett 5xx är en STRYPNING och försöks om; ett 404 är ett SVAR och försöks aldrig om.
// Misslyckas allt returneras null precis som förr — och flimmervakten cachar aldrig ett null,
// så nästa besökare gör ett nytt försök i stället för att ärva vår otur.
const CT_FORSOK = [15000, 8000];

export async function getCtOnboarding(domain) {
  const d = domain?.trim()?.toLowerCase();
  if (!d) return null;
  try {
    let res = null;
    for (let i = 0; i < CT_FORSOK.length; i++) {
      try {
        res = await fetch(
          `https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`,
          { headers: {
              Accept: 'application/json',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
            }, signal: AbortSignal.timeout(CT_FORSOK[i]) },
        );
      } catch { res = null; }                    // timeout räknas som strypning, inte som svar
      if (res?.ok) break;
      if (res && res.status < 500) return null;  // 404 m.fl. — ett svar; omförsök vore brus
      if (i < CT_FORSOK.length - 1) await new Promise((r) => setTimeout(r, 1200));
      res = null;
    }
    if (!res?.ok) return null;
    const rows = await res.json();
    if (!rows?.length) return null;

    let oldest = null, m365Since = null, m365Via = null;
    for (const r of rows) {
      const nb = r.not_before;
      if (nb && (!oldest || nb < oldest)) oldest = nb;
      const names = (r.name_value || '').toLowerCase().split('\n');
      for (const fp of M365_FINGERPRINTS) {
        if (names.some((n) => n.startsWith(fp + '.')) && nb && (!m365Since || nb < m365Since)) {
          m365Since = nb; m365Via = fp;
        }
      }
    }
    return { oldestCert: oldest?.slice(0, 10) ?? null, m365Since: m365Since?.slice(0, 10) ?? null, m365Via };
  } catch { return null; }
}

// ── Avslöjandet ────────────────────────────────────────────────────────────────
// Privata mejldomäner (+ vanliga felstavningar) → inget bolagsavslöjande.
const FREE_PROVIDERS = new Set([
  'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.se', 'outlook.com', 'live.com', 'live.se',
  'yahoo.com', 'yahoo.se', 'icloud.com', 'me.com', 'telia.com', 'spray.se', 'comhem.se', 'bredband.net',
  'msn.com', 'protonmail.com', 'proton.me',
  // vanliga felstavningar av gratisleverantörer — fångar typ-os som gamil@... (annars läses de som "bolag")
  'gamil.com', 'gmial.com', 'gmai.com', 'gmal.com', 'gmail.con', 'gmail.co', 'hotmial.com', 'hotmai.com',
  'hotmail.con', 'outlok.com', 'outook.com', 'outloo.com', 'yaho.com', 'iclod.com', 'iclould.com',
]);

// Subdomän-läxan (identitetsklass, 2026-07-17): anna@mail.bolag.se ska läsas som bolag.se —
// annars blir SLD:n "mail" och allabolag-söket kan exakt-matcha ett bolag som råkar heta så:
// fel bolags bokslut till fel besökare. KIRURGISKT, inte generellt: bara KÄNDA infrastruktur-
// prefix stryks (alltid-trunkering hade förvandlat bolaget.ab.se till ab.se — motsatt fel).
const GENERIC_SUBDOMAINS = new Set(['mail', 'smtp', 'mx', 'webmail', 'post', 'epost',
  'mailer', 'exchange', 'outlook', 'imap', 'pop', 'pop3', 'gw', 'gateway', 'relay']);
export function registrableDomain(d) {
  const labels = String(d || '').split('.').filter(Boolean);
  while (labels.length > 2 && GENERIC_SUBDOMAINS.has(labels[0])) labels.shift();
  return labels.join('.');
}

export function domainFromEmail(emailOrDomain) {
  if (!emailOrDomain) return null;
  let d = String(emailOrDomain).trim().toLowerCase();
  if (d.startsWith('mailto:')) d = d.slice(7);
  if (d.includes('@')) d = d.split('@').pop();
  d = d.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').replace(/\.+$/, '').trim();
  // IDN-läxan (måleri.se-klassen): å/ä/ö-domäner är legitima svenska företagsdomäner — vik till
  // punycode för DNS-lagret. Fel svar var "privat inkorg" på en fullt verklig bolagsdomän.
  if (/[^\x00-\x7f]/.test(d)) { const p = domainToASCII(d); if (p) d = p; }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) return null;
  if (FREE_PROVIDERS.has(d)) return null;
  return registrableDomain(d);
}

// Bygg avslöjande-fynden ur rå intel. REN funktion (testbar) — varje fynd bär sin KÄLLA
// (regel 3: ingen siffra/påstående utan proveniens). Saknas en fakta → den utelämnas (regel 4).
// SPF-leverantörskartan (Lekia-läxan 2026-07-12): SPF-posten auktoriserar avsändare — varje
// include är en LEVERANTÖRSRELATION synlig utifrån. KURERAD lista: bara tjänster vi känner
// igen med säkerhet namnges (regel 3/4 — hellre ett namn färre än en gissning). Microsoft/
// Google utelämnas här — de bär egna, starkare plattformsfynd.
export const SPF_SUPPLIER_MAP = [
  // ── Kundtjänst & support ──
  ['zendesk', 'Zendesk'], ['freshdesk', 'Freshworks'], ['intercom', 'Intercom'],
  ['helpscout', 'Help Scout'], ['kayako', 'Kayako'],
  // ── Marknad, nyhetsbrev & transaktionsmejl ──
  ['mandrillapp', 'Mailchimp'], ['mailchimp', 'Mailchimp'], ['sendgrid', 'SendGrid'],
  ['klaviyo', 'Klaviyo'], ['mailjet', 'Mailjet'], ['postmarkapp', 'Postmark'],
  ['mlsend', 'MailerLite'], ['mailerlite', 'MailerLite'], ['sendinblue', 'Brevo'],
  ['brevo', 'Brevo'], ['mailgun', 'Mailgun'], ['sparkpostmail', 'SparkPost'],
  ['createsend', 'Campaign Monitor'], ['cmail', 'Campaign Monitor'],
  ['getanewsletter', 'Get a Newsletter'], ['paloma', 'Paloma'], ['apsis', 'APSIS'],
  ['ungapped', 'Ungapped'], ['rule-mailer', 'Rule'],
  // ── CRM & sälj ──
  ['salesforce', 'Salesforce'], ['hubspot', 'HubSpot'], ['pipedrive', 'Pipedrive'],
  ['zoho', 'Zoho'], ['upsales', 'Upsales'], ['superoffice', 'SuperOffice'],
  ['lime-technologies', 'Lime CRM'], ['membrain', 'Membrain'],
  // ── Ekonomi, lön & fakturering ──
  ['fortnox', 'Fortnox'], ['visma', 'Visma'], ['bjornlunden', 'Björn Lundén'],
  ['hogia', 'Hogia'], ['bokio', 'Bokio'], ['wint', 'Wint'], ['fakturametoden', 'Fakturametoden'],
  ['billogram', 'Billogram'], ['sveaekonomi', 'Svea'], ['qvalia', 'Qvalia'],
  // ── HR & rekrytering ──
  ['teamtailor', 'Teamtailor'], ['varbi', 'Varbi'], ['recruto', 'Recruto'],
  ['benify', 'Benify'], ['simployer', 'Simployer'], ['sympa', 'Sympa'],
  // ── Signering, dokument & IT ──
  ['scrive', 'Scrive'], ['oneflow', 'Oneflow'], ['docusign', 'DocuSign'],
  ['atlassian', 'Atlassian'], ['slack', 'Slack'], ['zoom', 'Zoom'], ['dropbox', 'Dropbox'],
  // ── Infrastruktur & övrigt ──
  ['amazonses', 'Amazon SES'], ['abicart', 'Abicart'], ['websupport', 'Websupport'],
  ['twilio', 'Twilio'], ['servicenow', 'ServiceNow'], ['surveymonkey', 'SurveyMonkey'],
];

// ── VARFÖR MATCHNINGEN BYTTE FRÅN SUBSTRÄNG TILL DOMÄNETIKETT (2026-08-12) ──────────────────
// Den gamla versionen sökte nålen i en hopklistrad sträng av alla mekanismer. Det höll så länge
// kartan bara bar femton distinkta namn — men varje nytt namn ökar risken för en falsk träff, och
// en falsk leverantör är ett påstående om kundens affärer utan källa (regel 3). 'lime' hade
// matchat 'sublimemail.com'; 'zoom' hade matchat 'zoomerang.example'. Ett namn för lite är en
// missad wow; ett namn för mycket är en lögn i kundens ansikte.
//
// Nu plockas VÄRDDOMÄNEN ur varje mekanism (include:, redirect=, a:, mx:, ptr:) och nålen måste
// matcha en hel etikett eller ett etikettprefix med bindestreck — 'mlsend' träffar
// '_spf.mlsend.com' men inte 'notmlsendish.com'. Kartan får därför växa utan att grinden mjuknar.
const SPF_VARD_RE = /^(?:include:|redirect=|a:|mx:|ptr:)([a-z0-9._-]+)/i;

function spfVarddomaner(mechanisms = []) {
  const ut = [];
  for (const m of Array.isArray(mechanisms) ? mechanisms : []) {
    const träff = SPF_VARD_RE.exec(String(m).trim());
    if (träff) ut.push(träff[1].toLowerCase());
  }
  return ut;
}

/** Matchar nålen mot hela etiketter i värddomänen — aldrig mitt inne i ett ord. */
function etikettTraff(vard, nal) {
  return vard.split('.').some((etikett) => etikett === nal || etikett.startsWith(nal + '-') || etikett.endsWith('-' + nal));
}

// Ren och testlåst: mekanism-listan ur SPF → unika, igenkända leverantörsnamn.
export function suppliersFromSpf(mechanisms = []) {
  const vardar = spfVarddomaner(mechanisms);
  const seen = [];
  // Kartans ordning styr, inte SPF-postens: listan kunden ser ska vara densamma varje gång och
  // inte kastas om för att leverantören råkade skriva om sin SPF-rad.
  for (const [needle, name] of SPF_SUPPLIER_MAP) {
    if (!seen.includes(name) && vardar.some((v) => etikettTraff(v, needle))) seen.push(name);
  }
  return seen;
}

// Nivåbryggan (grundardom 2026-07-12, costline-läxan): SPF/MX bevisar M365-FAMILJEN, aldrig
// nivån — därför en FRÅGA utan siffror i detaljen; spannet mellan nivåerna är källbelagt mot
// Microsofts publika listpriser men ingen nivå påstås vara kundens.
const M365_NIVABRYGGA = 'Vilken nivå ni betalar för avgör tusenlappar per anställd och år — och den syns bara på fakturan. Dela en, så läser vi exakt.';

export function buildRevealFindings({ domain, posture, domainReg, ct }, { now = new Date() } = {}) {
  const f = [];

  if (posture?.mx === 'microsoft365') {
    const layers = [true, posture.spfM365, posture.dkimM365].filter(Boolean).length;
    f.push({
      kind: 'platform', confidence: layers >= 2 ? 'high' : 'medium',
      title: 'Ni kör Microsoft 365',
      detail: `${layers >= 2 ? 'Bekräftat på flera oberoende spår.' : 'Avläst ur er publika e-postuppsättning.'} ${M365_NIVABRYGGA}`,
      source: `Ert e-postsystem dirigeras till Microsoft — öppet i ${domain}:s publika uppgifter · nivåspannet: Microsofts publika listpriser`,
    });
  } else if (posture?.mx === 'google') {
    f.push({
      kind: 'platform', confidence: 'high', title: 'Ni kör Google Workspace',
      detail: 'Er e-post drivs av Google.',
      source: `Ert e-postsystem dirigeras till Google — öppet i ${domain}:s publika uppgifter`,
    });
  } else if (posture?.spfM365) {
    // Lekia-fallet: mejlen går via en säkerhetsgateway (MX ≠ Microsoft) men SPF:en auktoriserar
    // Microsofts servrar — M365-familjen bekräftad bakom gatewayen. Utan denna gren föll hela
    // plattformsfyndet bort och dörren landade i trivia-golvet.
    f.push({
      kind: 'platform', confidence: 'high',
      title: 'Ni kör Microsoft 365',
      detail: `Bekräftat i era publika mejlposter${posture.spfGateway ? ' — bakom er mejlgateway' : ''}. ${M365_NIVABRYGGA}`,
      source: `SPF-posten för ${domain} auktoriserar Microsofts servrar — publika uppgifter · nivåspannet: Microsofts publika listpriser`,
    });
  } else if (posture?.spfGoogle) {
    f.push({
      kind: 'platform', confidence: 'high', title: 'Ni kör Google Workspace',
      detail: 'Bekräftat i era publika mejlposter.',
      source: `SPF-posten för ${domain} auktoriserar Googles servrar — publika uppgifter`,
    });
  }

  // Leverantörslistan ur SPF:en (Lekia-läxan): SPF:en bevisar exakt EN sak — att tjänsten får
  // skicka mejl i bolagets namn. "Avtalsrelation" var ett halvt övertramp (Amazon SES rider ofta
  // med transitivt via en annan tjänst, en CFO kan sakna "Amazon-avtal") — påstå bara det
  // ofalsifierbara. Kräver ≥2 namn — ett ensamt namn bär inte "listan syns"-berättelsen.
  const spfSuppliers = suppliersFromSpf(posture?.spfMechanisms);
  if (spfSuppliers.length >= 2) {
    // Pengabryggan: listan slutar i samma dörr som M365-fyndet — fakturan. Ett löfte med
    // mekanik (regel 9): att läsa fakturor exakt är kärnpipelinen, inget vi inte gör.
    // Källupprepningen vänd till styrka: när plattformsfyndet ovan också föddes ur SPF:en
    // säger källan "Samma SPF-post" — EN publik rad gav allt detta.
    const platformFromSpf = posture?.mx !== 'microsoft365' && posture?.mx !== 'google'
      && Boolean(posture?.spfM365 || posture?.spfGoogle);
    f.push({
      kind: 'suppliers', confidence: 'high',
      // NAMNEN I RUBRIKEN (2026-08-12). Rubriken bar en SIFFRA — "3 leverantörer syns i era
      // publika mejlposter" — och namnen låg i brödtexten. Men det är namnen som är fyndet: en
      // siffra är en statistik, "Zendesk · Klaviyo · Fortnox" är ögonblicket då en CFO undrar hur
      // vi visste. Vi hade redan räknat fram dem och gömde dem på andra raden.
      title: `${spfSuppliers.join(' · ')} får skicka mejl i ert namn`,
      // OBS copyn: var och en HAR RÄTT ATT SKICKA MEJL i ert namn — aldrig "leverantörsrelation"
      // eller "avtal". Amazon SES rider ofta med transitivt via en annan tjänst, och en CFO utan
      // Amazon-avtal ska aldrig kunna falsifiera vårt fynd. Första versionen av den här raden
      // skrev "leverantörsrelationer" och gled därmed över gränsen; svitens Lekia-lås fällde den.
      detail: `${spfSuppliers.length} avsändare har rätt att skicka mejl i ert namn — avläsbart utifrån, utan att ni delat något. Ni ser listan nu på sekunder; era leverantörer har kunnat se den hela tiden. Varje namn är en rad i era kostnader — dela fakturorna, så läser vi dem exakt.`,
      source: platformFromSpf
        ? `Samma SPF-post — en enda publik rad för ${domain} gav hela listan`
        : `SPF-posten för ${domain} — publika uppgifter`,
    });
  }
  // Kvalitetströskel (regel 4): en generisk e-postlösning (mx=other/zoho) är INTE ett "hur visste
  // de det"-fynd — den utelämnas. Hellre tystnad + ärligt "dela en faktura" än ett limp fynd.

  // Kvalitetströskel: "X års obruten närvaro" landar som wow först när X är anmärkningsvärt.
  // En 2–3 år gammal domän är inte "hur visste de det" — den utelämnas.
  const domainYears = domainReg ? Math.floor((now - new Date(domainReg)) / (365.25 * 24 * 3600 * 1000)) : null;
  const domainFires = domainYears != null && domainYears >= 6;

  if (ct?.m365Since) {
    f.push({
      kind: 'onboarding', confidence: 'high',
      title: `Er Microsoft 365 sattes upp ${swMonthYear(ct.m365Since)}`,
      detail: 'Daterat ur ett offentligt register — exakt när uppsättningen gjordes.',
      source: `Offentligt register, första daterade spår ${ct.m365Since}`,
    });
  } else if (ct?.oldestCert && !domainFires) {
    // ETT längd-fynd per kort (grundarlärdom 2026-07-01, Lynxeye-kortet): "Digital närvaro sedan
    // 2009" bredvid "26 års obruten närvaro (sedan 2000)" delade språk men grälade om årtal —
    // två sanna fynd som LÄSTE som en självmotsägelse. När domänregistreringen fyrar (äldre,
    // starkare berättelse) undertrycks cert-spåret.
    f.push({
      kind: 'cert', confidence: 'high',
      title: `Digital närvaro sedan ${swMonthYear(ct.oldestCert)}`,
      detail: 'Äldsta spåret i ett offentligt register.',
      source: `Offentligt register, äldsta daterade spår ${ct.oldestCert}`,
    });
  }

  if (domainFires) {
    f.push({
      kind: 'domain', confidence: 'high',
      title: `${domainYears} års obruten digital närvaro`,
      detail: `Er domän registrerades ${domainReg}.`,
      source: 'Det globala domänregistret',
    });
  }

  if (posture?.dmarc && posture.dmarc !== 'none' && posture.dmarc !== 'unknown') {
    f.push({
      kind: 'dmarc', confidence: 'high',
      title: 'Ert e-postskydd är redan aktivt',
      detail: 'Ni skyddar er domän mot förfalskning — ett tecken på moget IT-arbete.',
      source: 'Bolagets publika e-postinställningar',
    });
  } else if ((posture?.dmarcAbsent || posture?.dmarc === 'none') && posture?.exists) {
    // FÖRFALSKNINGSFYNDET (Kristianstad-läxan, del B): fynd-motorn har alltid vetat att DMARC-
    // luckan är toppsignalen (+18/+20 wow i score-leads) — dörren sa den bara aldrig högt.
    // Ett DNS-faktum, inte en bedömning: posten saknas (definitivt ENOTFOUND/ENODATA) eller
    // står i p=none. Transienta uppslag blir ALDRIG detta fynd (dmarcAbsent sätts bara på
    // definitiva svar). Lekia-klassens kort bär det också — sanningen gäller alla.
    f.push({
      kind: 'spoofing', confidence: 'high',
      title: 'Mejl i ert namn kan förfalskas',
      detail: posture?.dmarc === 'none'
        ? 'Er DMARC-post står i övervakningsläge (p=none) — den ser förfalskningar men stoppar dem inte. Det är luckan fakturabedragare använder för att skicka mejl som ser ut att komma från er, och den är kostnadsfri att stänga.'
        : 'Er domän saknar DMARC-skydd — luckan fakturabedragare använder för att skicka mejl som ser ut att komma från er. Den syns utifrån för alla som tittar, och den är kostnadsfri att stänga.',
      source: `DMARC-uppslaget för ${domain} — publika e-postinställningar`,
    });
  }

  // GOLV (grundarbeslut 2026-07-01): avslöjandet får ALDRIG rendera tomt vid första handslaget.
  // Löses INTE genom att sänka ribban på "om er"-fynden ovan (det vore limpt, regel 4) — utan genom
  // att falla tillbaka på något som alltid finns OCH inte är limpt:
  //   Tier 1 · infrastrukturen vi kan namnge ur NS-posterna (fortfarande OM ER, källbelagt).
  //   Tier 2 · en sourcad värde-brygga (inte ett påstående om er, utan vad vakten gör i sekunden
  //            ni delar en faktura — alltid sant, alltid källbelagt).
  if (f.length === 0) {
    const infra = posture?.nsDetail
      ? { cloud: 'molnleverantör', registrar: null }[posture.nsProvider] ?? null
      : null;
    if (posture?.nsDetail) {
      const name = posture.nsDetail.charAt(0).toUpperCase() + posture.nsDetail.slice(1);
      // Ärlighetsfixen (Kristianstad-läxan): namnservrar bevisar var DOMÄNEN sköts — aldrig
      // "er drift". Ramas som det den är: en leverantörsrelation synlig utifrån.
      f.push({
        kind: 'infra', confidence: 'medium',
        title: `${name} sköter er domän`,
        detail: infra ? `Er domän pekar på en ${infra}.` : 'En leverantörsrelation synlig utifrån — avläst ur var er domän pekar.',
        source: `Namnservrarna för ${domain} pekar på ${posture.nsDetail} — publika uppgifter`,
      });
    }
    // Sista utväg — alltid närvarande, källbelagd, aldrig tom. En värde-brygga, inte ett fejkat
    // personligt påstående: kortets fot ("tänk er vad vakten ser när ni delar en faktura") bär den.
    // SIFFERLÖS (Kristianstad-läxan): det gamla M365-exemplet var fel exempel för de flesta
    // småbolag OCH en lokal priskopia (regel 1). Priset bor i prisboken — marknadsankaret
    // (buildMarketAnchorFinding) bär det, och när ankaret finns visas bryggan aldrig.
    f.push({
      kind: 'bridge', confidence: 'high', floor: true,
      title: 'Er kostnadssanning ligger ett mejl bort',
      detail: 'Vi väger varje faktura mot verifierade svenska marknadspriser. Dela en faktura så ser vi ert.',
      source: 'Arvos prisbok — verifierade publika listpriser',
    });
  }

  return f;
}

// Marknadsankaret i dörren (Kristianstad-läxan 2026-07-12): när DNS-nätet är tunt — NORMALFALLET
// för svenska småbolag på Loopia/one.com — ska dörren ändå leverera pengar, inte domänkuriosa.
// Samma integritetslås som kontorets branschankare (CLAUDE.md 1A): ENBART 'real-public'
// per-enhet-listpris ur prisbokens enda läsväg, aldrig en totalsumma, aldrig en kundjämförelse,
// aldrig en gissad enhet. Mobil är kategorin för att VARJE bolag har den. Leverantörsnamnet tas
// ur prisboksdatat (alternatives[0] = p25-bäraren), aldrig hårdkodat — utan namn inget ankare
// (ett "verifierat listpris" utan namngiven bärare är inte källbelagt, regel 3).
export function buildMarketAnchorFinding(bm) {
  if (!bm || bm.source !== 'real-public' || bm.isTotal || !(bm.p25 > 0)) return null;
  const supplier = bm.alternatives?.[0]?.supplier;
  if (!supplier) return null;
  const perMonth = Math.round(bm.p25 / 12);
  return {
    kind: 'market', confidence: 'high',
    title: `Måttstocken vi väger mobilfakturor mot: ${perMonth} kr/mån per abonnemang`,
    detail: `${supplier}s verifierade listpris för entrénivån (exkl. moms). Betalar ni mer ska fakturan kunna visa varför — den frågan ställer vi åt er.`,
    source: `Verifierat publikt listpris · ${supplier}`,
  };
}

// KORSLÄSNINGEN (Issa-menyn 2026-07-13, punkt 4): två redan-upptäckta fakta vävda till EN
// mening — domänens födelseår mot tillväxtresans startår. Kod väver, aldrig AI (regel 2);
// båda talen är källbelagda var för sig. Fyrar ENDAST när en verklig tillväxtsvit (≥2 obrutna
// växande år, samma tröskel som trenden) finns OCH domänen är ≥5 år äldre än resan — en svag
// korsläsning är ingen korsläsning (regel 4: tystnad före ett limpt fynd).
export function buildCrossReading({ domainReg, facts }) {
  const dy = domainReg ? Number(String(domainReg).slice(0, 4)) : null;
  const h = facts?.history ?? [];
  if (!Number.isFinite(dy) || dy < 1990 || h.length < 2) return null;
  if (!(h[0]?.revenueTkr > 0) || !(h[1]?.revenueTkr > 0)) return null;
  const first = (h[0].revenueTkr - h[1].revenueTkr) / h[1].revenueTkr;
  if (!(first > 0)) return null;                     // korsläsningen är tillväxtens berättelse
  let streak = 0;
  for (let i = 0; i + 1 < h.length; i++) {
    const prev = h[i + 1].revenueTkr;
    if (!(prev > 0)) break;
    const d = (h[i].revenueTkr - prev) / prev;
    if (d < 0.02) break;
    streak++;
  }
  if (streak < 2) return null;
  const startYear = Number(h[streak].year);
  if (!Number.isFinite(startYear) || startYear - dy < 5) return null;
  return {
    kind: 'cross', confidence: 'high',
    title: `Er domän är från ${dy} — tillväxtresan började ${startYear}`,
    detail: `Infrastrukturen är ${startYear - dy} år äldre än den resa ni är på. Avtal från den eran följer ofta med av gammal vana — och de är sällan prissatta för bolaget ni blivit.`,
    source: `Det globala domänregistret (registrerad ${domainReg}) · Bolagsverkets bokslutsår ${h[streak].year}–${h[0].year}`,
  };
}

// Full avslöjande-körning: domän → all intel parallellt → källbelagda fynd.
// AFFÄRSHJÄRNAN LEDER (2026-07-01): bolagets offentliga årsredovisningsuppgifter (omsättning,
// anställda) är käftsläpparen — DNS-fynden är stödet. Flottdiagnosen visade att DNS ensamt fyrar
// pålitligt men milt; affärsdatan är det en CFO faktiskt rycker till av.
export async function revealFromDomain(input, { fast = false } = {}) {
  const domain = domainFromEmail(input) || (typeof input === 'string' ? input.trim().toLowerCase() : null);
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return { domain: null, findings: [], reason: 'no-domain' };
  }
  const samla = { kandidater: [], lasta: 0 };
  const [posture, domainReg, ct, bizFacts] = await Promise.all([
    getDnsPosture(domain),
    cachedLookup(`reveal:reg:v1:${domain}`,
      () => getDomainRegistered(domain).catch(() => null),
      (v) => typeof v === 'string' && v.length > 0),
    // TVÅVÅGS-DÖRREN (grundarbeslut 2026-07-13): fast-vågen hoppar över det långsamma
    // certifikatregistret och svarar på sekunder; fulla vågen (klientens andra anrop) ger
    // registret hela sin budget — raden landar SENT och SYNLIGT ("hur visste de det?"-dramat).
    fast ? Promise.resolve(null) : cachedLookup(`reveal:ct:v1:${domain}`,
      () => getCtOnboarding(domain).catch(() => null),
      (v) => Boolean(v?.oldestCert || v?.m365Since)),
    // KANDIDATSAMLAREN (2026-08-07): grinden läser hela sökresultatet även när den tystnar.
    // Kunskapen om VILKA bolag som rimligen kan äga domänen är gratis där — och guld i dörren:
    // den låter kunden peka ut sitt eget bolag i stället för att söka fram det (formulär stänger
    // flikar). Se identityCandidates i lib/business-intel.js.
    fetchBusinessFacts(domain, { samla }).catch(() => null),
  ]);
  // Listpris-läsvägen är deterministisk (BRANCHINDEX, ingen I/O) — aldrig KV/DB, som i prod
  // kan bära totalsummor (live_analyses) och därmed tysta ankaret exakt där det behövs.
  let bmMobil = null;
  try { bmMobil = getPublicListBenchmark({ category: 'mobil' }); } catch { /* inget ankare */ }
  // Costline (licensmatematik) är BORTTAGEN ur avslöjandet (grundarbeslut 2026-07-01):
  // dörren visar bara UPPTÄCKTA fakta — det kostnadsräknade hör hemma i analysen efter
  // första fakturan, där planen är känd. Se lib/business-intel.js för hela lärdomen.
  // SPÖKDOMÄN-GRINDEN (grundarfynd 2026-07-17, hdssyjxdd.se): en domän utan DNS-existens och
  // utan bolagsmatch får INGET underlag — "er domän" utan domän är ett fantom. Ärligt besked
  // istället för ett kort som talar till ingen (regel 4: tystnad före ett limpt påstående).
  if (!posture.exists && !bizFacts) {
    const dd = domain.includes('xn--') ? (domainToUnicode(domain) || domain) : domain;
    return { domain: dd, findings: [], reason: 'no-such-domain',
      note: `Vi hittar ingen aktiv domän bakom ${dd} — kontrollera stavningen, eller testa med en faktura så läser vi de verkliga talen.` };
  }
  const businessFindings = buildBusinessFindings(bizFacts);
  // Pengaraden: bolagets egna anställdatal × prisbokens vaktade M365-nivåer. Bara ett spann —
  // aldrig ett påstående om vad kunden betalar (regel 4). Utan bolagsfakta blir den null av sig
  // själv, så koncerndomäner som inte bundit identitet ser den först efter bekräftelsen.
  const licensspann = buildLicensspannFinding(bizFacts, BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks);
  if (licensspann) businessFindings.push(licensspann);
  const crossReading = buildCrossReading({ domainReg, facts: bizFacts });
  if (crossReading) businessFindings.push(crossReading);
  const dnsFindings = buildRevealFindings({ domain, posture, domainReg, ct });
  const marketAnchor = buildMarketAnchorFinding(bmMobil);
  // IDN-kosmetiken (flottan 2026-07-17): kortets rubrik ska läsa "länsförsäkringar.se",
  // aldrig rå punycode — DNS-lagret behåller xn--, människan får sitt alfabet tillbaka.
  const displayDomain = domain.includes('xn--') ? (domainToUnicode(domain) || domain) : domain;
  return {
    domain: displayDomain, platform: posture.mx,
    findings: mergeRevealFindings(businessFindings, dnsFindings, marketAnchor),
    // Identitetsläget: vilket bolag vi (ev.) landade på, och vilka som rimligen kunde äga domänen.
    // Klienten använder det för att låta kunden BEKRÄFTA eller BYTA — en fråga påstår ingenting,
    // och svaret är en starkare bindning än något vi kan skrapa (väg 1 fyrar i 1 fall av 20).
    identity: {
      confirmed: bizFacts?.orgnr ? normalizeOrgnr(bizFacts.orgnr) : null,
      confirmedName: bizFacts?.legalName ?? null,
      candidates: samla.kandidater,
      readCount: samla.lasta,
    },
  };
}


// ── CERTIFIKATVÅGEN, ENSAM (2026-08-12) ─────────────────────────────────────────────────────
// Gör EN sak: läser certifikatregistret och bygger uppsättningsraden. Ingen DNS, inget
// bolagsuppslag, ingen prisbok — inget som konkurrerar om sekunderna. Det låter klienten ge just
// den här läsningen ett längre tak utan att någon annan besökare får vänta längre på sitt kort.
// Flimmervakten cachar varje lyckat svar i 30 dagar, så priset betalas en gång per domän.
export async function ctOnboardingFinding(input) {
  const domain = domainFromEmail(input) || String(input || '').trim().toLowerCase();
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) return null;
  const ct = await cachedLookup(`reveal:ct:v1:${domain}`,
    () => getCtOnboarding(domain).catch(() => null),
    (v) => Boolean(v?.oldestCert || v?.m365Since));
  // BOM → KÖA. En besökare har ETT försök mot en källa som svarar ~30 % av gångerna; kön flyttar
  // priset till natten, där ett jobb får kosta minuter. Nästa besökare från samma bolag läser ur
  // flimmervaktens 30-dagarscache. Köandet får aldrig fördröja svaret: därför utan await.
  if (!ct?.m365Since) { koaDoman(domain).catch(() => {}); return null; }
  const [rad] = buildRevealFindings({ domain, posture: null, domainReg: null, ct })
    .filter((f) => f.kind === 'onboarding');
  return rad ?? null;
}

// ── BEKRÄFTAD IDENTITET (grundarbeslut 2026-08-07) ──────────────────────────────────────────
// Kunden har pekat ut sin juridiska person ur kandidatlistan — de bolag grinden FAKTISKT läste
// och vägrade välja mellan. Det svaret är en starkare bindning än något vi kan skrapa: mätningen
// (ops/probe-identitet-tackning.txt) visade att orgnr-på-sajten, vår "starkaste" väg, fyrar i
// 1 fall av 20. Personen som skriver sin egen företagsmejl vet däremot exakt vem hen är.
//
// Invarianten är intakt: fakta hämtas fortfarande via extractCompanyFacts (proveniens
// 'bolagsverket'). Det MÄNNISKAN bidrar med är VILKEN enhet — aldrig talen.
export async function revealForConfirmedOrgnr(input, orgnr) {
  const domain = domainFromEmail(input) || String(input || '').trim().toLowerCase();
  const bare = normalizeOrgnr(orgnr);
  if (!domain || !bare) return null;

  const [posture, domainReg, facts] = await Promise.all([
    getDnsPosture(domain).catch(() => ({ mx: null, exists: true })),
    getDomainRegistered(domain).catch(() => null),
    fetchBusinessFactsByOrgnr(bare).catch(() => null),
  ]);
  if (!facts) return null;

  const businessFindings = buildBusinessFindings(facts);
  const licensspann = buildLicensspannFinding(facts, BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks);
  if (licensspann) businessFindings.push(licensspann);
  const cross = buildCrossReading({ domainReg, facts });
  if (cross) businessFindings.push(cross);
  const dnsFindings = buildRevealFindings({ domain, posture, domainReg, ct: null });
  const displayDomain = domain.includes('xn--') ? (domainToUnicode(domain) || domain) : domain;

  return {
    domain: displayDomain, platform: posture.mx,
    findings: mergeRevealFindings(businessFindings, dnsFindings, null),
    identity: { confirmed: bare, confirmedName: facts.legalName, candidates: [], readCount: 0, byHuman: true },
  };
}
