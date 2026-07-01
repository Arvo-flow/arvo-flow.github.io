// lib/domain-intel.js — domän-intelligens: e-poststack, domänålder, M365-onboarding.
//
// EN sanning (regel 1): den DNS/RDAP/crt.sh-logik som tidigare bara levde i scripts/score-leads.mjs
// (den utgående fynd-motorn) bor nu HÄR och importeras av både score-leads och api/reveal.
// Allt är källbelagt och gratis (DNS + publika register) — ingen betald API, inget gissat.
//
// Används av "Avslöjandet": kundens e-postdomän → ett skarpt "hur visste de det?"-kort vid
// första inloggningen, byggt UTESLUTANDE på verifierbar publik fakta (regel 3: varje rad har källa).

import { promises as dns } from 'dns';
import { swMonthYear } from './format.js';
import { fetchBusinessFacts, buildBusinessFindings, mergeRevealFindings } from './business-intel.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

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
              nsProvider: 'unknown', nsDetail: null };
  if (!d) return p;

  try {
    const recs  = (await dns.resolveMx(d)).map((r) => r.exchange.toLowerCase());
    const hosts = recs.join(' ');
    if      (hosts.includes('mail.protection.outlook.com'))                 p.mx = 'microsoft365';
    else if (hosts.includes('google.com') || hosts.includes('googlemail')) p.mx = 'google';
    else if (hosts.includes('zoho'))                                        p.mx = 'zoho';
    else if (recs.length)                                                   p.mx = 'other';
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
      p.spfGateway = MAIL_GATEWAYS.find(([m]) => all.includes(m))?.[1] ?? null;
      p.spfDelegated = /\bredirect=/i.test(spf) && !p.spfM365 && !p.spfGateway;
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
    }
  } catch {}

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
export async function getCtOnboarding(domain) {
  const d = domain?.trim()?.toLowerCase();
  if (!d) return null;
  try {
    const res = await fetch(
      `https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`,
      { headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        }, signal: AbortSignal.timeout(20000) },
    );
    if (!res.ok) return null;
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

export function domainFromEmail(emailOrDomain) {
  if (!emailOrDomain) return null;
  let d = String(emailOrDomain).trim().toLowerCase();
  if (d.includes('@')) d = d.split('@').pop();
  d = d.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim();
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(d)) return null;
  if (FREE_PROVIDERS.has(d)) return null;
  return d;
}

// Bygg avslöjande-fynden ur rå intel. REN funktion (testbar) — varje fynd bär sin KÄLLA
// (regel 3: ingen siffra/påstående utan proveniens). Saknas en fakta → den utelämnas (regel 4).
export function buildRevealFindings({ domain, posture, domainReg, ct }, { now = new Date() } = {}) {
  const f = [];

  if (posture?.mx === 'microsoft365') {
    const layers = [true, posture.spfM365, posture.dkimM365].filter(Boolean).length;
    f.push({
      kind: 'platform', confidence: layers >= 2 ? 'high' : 'medium',
      title: 'Ni kör Microsoft 365',
      detail: layers >= 2 ? 'Bekräftat på flera oberoende spår.' : 'Avläst ur er publika e-postuppsättning.',
      source: `Ert e-postsystem dirigeras till Microsoft — öppet i ${domain}:s publika uppgifter`,
    });
  } else if (posture?.mx === 'google') {
    f.push({
      kind: 'platform', confidence: 'high', title: 'Ni kör Google Workspace',
      detail: 'Er e-post drivs av Google.',
      source: `Ert e-postsystem dirigeras till Google — öppet i ${domain}:s publika uppgifter`,
    });
  }
  // Kvalitetströskel (regel 4): en generisk e-postlösning (mx=other/zoho) är INTE ett "hur visste
  // de det"-fynd — den utelämnas. Hellre tystnad + ärligt "dela en faktura" än ett limp fynd.

  if (ct?.m365Since) {
    f.push({
      kind: 'onboarding', confidence: 'high',
      title: `Er Microsoft 365 sattes upp ${swMonthYear(ct.m365Since)}`,
      detail: 'Daterat ur ett offentligt register — exakt när uppsättningen gjordes.',
      source: `Offentligt register, första daterade spår ${ct.m365Since}`,
    });
  } else if (ct?.oldestCert) {
    f.push({
      kind: 'cert', confidence: 'high',
      title: `Digital närvaro sedan ${swMonthYear(ct.oldestCert)}`,
      detail: 'Äldsta spåret i ett offentligt register.',
      source: `Offentligt register, äldsta daterade spår ${ct.oldestCert}`,
    });
  }

  if (domainReg) {
    const years = Math.floor((now - new Date(domainReg)) / (365.25 * 24 * 3600 * 1000));
    // Kvalitetströskel: "X års obruten närvaro" landar som wow först när X är anmärkningsvärt.
    // En 2–3 år gammal domän är inte "hur visste de det" — den utelämnas.
    if (years >= 6) {
      f.push({
        kind: 'domain', confidence: 'high',
        title: `${years} års obruten digital närvaro`,
        detail: `Er domän registrerades ${domainReg}.`,
        source: 'Det globala domänregistret',
      });
    }
  }

  if (posture?.dmarc && posture.dmarc !== 'none' && posture.dmarc !== 'unknown') {
    f.push({
      kind: 'dmarc', confidence: 'high',
      title: 'Ert e-postskydd är redan aktivt',
      detail: 'Ni skyddar er domän mot förfalskning — ett tecken på moget IT-arbete.',
      source: 'Bolagets publika e-postinställningar',
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
      f.push({
        kind: 'infra', confidence: 'medium',
        title: `Er drift ligger hos ${name}`,
        detail: infra ? `Er domän driftas via en ${infra}.` : 'Avläst ur var er domän pekar.',
        source: `Namnservrarna för ${domain} pekar på ${posture.nsDetail} — publika uppgifter`,
      });
    }
    // Sista utväg — alltid närvarande, källbelagd, aldrig tom. En värde-brygga, inte ett fejkat
    // personligt påstående: kortets fot ("tänk er vad vakten ser när ni delar en faktura") bär den.
    f.push({
      kind: 'bridge', confidence: 'high', floor: true,
      title: 'Er kostnadssanning ligger ett mejl bort',
      detail: 'Vi väger varje faktura mot verifierade svenska marknadspriser — Microsoft 365 Business Standard t.ex. mot 119 kr/användare/mån på årsavtal. Dela en faktura så ser vi ert.',
      source: 'Verifierat publikt listpris · Microsoft, 2026',
    });
  }

  return f;
}

// Full avslöjande-körning: domän → all intel parallellt → källbelagda fynd.
// AFFÄRSHJÄRNAN LEDER (2026-07-01): bolagets offentliga årsredovisningsuppgifter (omsättning,
// anställda) är käftsläpparen — DNS-fynden är stödet. Flottdiagnosen visade att DNS ensamt fyrar
// pålitligt men milt; affärsdatan är det en CFO faktiskt rycker till av.
export async function revealFromDomain(input) {
  const domain = domainFromEmail(input) || (typeof input === 'string' ? input.trim().toLowerCase() : null);
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return { domain: null, findings: [], reason: 'no-domain' };
  }
  const [posture, domainReg, ct, bizFacts] = await Promise.all([
    getDnsPosture(domain),
    getDomainRegistered(domain).catch(() => null),
    getCtOnboarding(domain).catch(() => null),
    fetchBusinessFacts(domain).catch(() => null),
  ]);
  // p25 (verifierat golvpris kr/anv/år) — enhetligt över segment i BRANCHINDEX (testlåst antagande).
  const p25PerUser = BRANCHINDEX?.['saas-productivity']?.matrix?.byraer?.small?.p25 ?? null;
  const businessFindings = buildBusinessFindings(bizFacts, { p25PerUser });
  const dnsFindings = buildRevealFindings({ domain, posture, domainReg, ct });
  return { domain, platform: posture.mx, findings: mergeRevealFindings(businessFindings, dnsFindings) };
}
