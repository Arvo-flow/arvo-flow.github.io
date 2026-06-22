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
      detail: `Bekräftat på ${layers} ${layers === 1 ? 'nivå' : 'nivåer'} (MX${posture.spfM365 ? ' · SPF' : ''}${posture.dkimM365 ? ' · DKIM' : ''}).`,
      source: `MX-posten för ${domain} pekar på mail.protection.outlook.com`,
    });
  } else if (posture?.mx === 'google') {
    f.push({
      kind: 'platform', confidence: 'high', title: 'Ni kör Google Workspace',
      detail: 'Hela e-poststacken körs på Google.',
      source: `MX-posten för ${domain} pekar på Google`,
    });
  }
  // Kvalitetströskel (regel 4): en generisk e-postlösning (mx=other/zoho) är INTE ett "hur visste
  // de det"-fynd — den utelämnas. Hellre tystnad + ärligt "dela en faktura" än ett limp fynd.

  if (ct?.m365Since) {
    f.push({
      kind: 'onboarding', confidence: 'high',
      title: `Er Microsoft 365 restes ${swMonthYear(ct.m365Since)}`,
      detail: 'Daterat ur den publika certifikatloggen — exakt när stacken sattes upp.',
      source: `crt.sh: ${ct.m365Via}.${domain} först sedd ${ct.m365Since}`,
    });
  } else if (ct?.oldestCert) {
    f.push({
      kind: 'cert', confidence: 'high',
      title: `Digital infrastruktur sedan ${swMonthYear(ct.oldestCert)}`,
      detail: 'Äldsta TLS-certifikatet i den publika loggen.',
      source: `crt.sh: äldsta cert ${ct.oldestCert}`,
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
        detail: `Domänen ${domain} registrerades ${domainReg}.`,
        source: 'RDAP — det globala domänregistret',
      });
    }
  }

  if (posture?.dmarc && posture.dmarc !== 'none' && posture.dmarc !== 'unknown') {
    f.push({
      kind: 'dmarc', confidence: 'high',
      title: `E-postbevakning aktiv (DMARC p=${posture.dmarc})`,
      detail: 'Ni skyddar redan er domän mot förfalskning — vaket IT.',
      source: `_dmarc.${domain} TXT-post`,
    });
  }

  return f;
}

// Full avslöjande-körning: domän → all intel parallellt → källbelagda fynd.
export async function revealFromDomain(input) {
  const domain = domainFromEmail(input) || (typeof input === 'string' ? input.trim().toLowerCase() : null);
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain)) {
    return { domain: null, findings: [], reason: 'no-domain' };
  }
  const [posture, domainReg, ct] = await Promise.all([
    getDnsPosture(domain),
    getDomainRegistered(domain).catch(() => null),
    getCtOnboarding(domain).catch(() => null),
  ]);
  const findings = buildRevealFindings({ domain, posture, domainReg, ct });
  return { domain, platform: posture.mx, findings };
}
