// src/pages/Portfolio — Arvo-kontoret (riktig kundyta, datadriven).
// Konceptet: produkten är VAKTEN, inte fyndet (CLAUDE.md → Helheten).
// Dossier-mörkt instrument. Varje tal är sourcat ur riktig invoice-history-data
// eller honest systemkonstant. Lager som kräver data vi ännu inte har
// (kohort-prisdiskriminering, sannolikhetsprognos) visas ENDAST med verklig
// täckning — annars utelämnas de (regel 3/4: precision eller tystnad).
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon';
import { getCategoryMeta } from '../../lib/categoryMeta';
import { COST_CATEGORIES } from '../../lib/costCategories';
import FindingCard from '../../components/FindingCard';
import {
  Page, Shell, TopRow, Ident, Radar, Verdict, Confidence,
  Grid, Index, Tally, Truth, Calendar, Holdings, HoldRow, HoldHead, RingWrap, HoldDetail,
  SwitchInline, SwitchBtn, IntelQuiet, SignOff, Spinner,
  CoverageMap, IntakeDoors, AddressChipDark, Dropzone, DropProgress, FortnoxTease,
} from '../Kontoret/styles';

// Kostnadskartan läses från EN delad källa (src/lib/costCategories) — samma data som testa-fakturas
// "Helhetsbild", så dörren och rummet aldrig kan säga olika saker (regel 5).
const INTAKE_SEGMENTS = COST_CATEGORIES;

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const result = String(reader.result || '');
    resolve(result.includes(',') ? result.split(',')[1] : result);
  };
  reader.onerror = () => reject(new Error('Kunde inte läsa filen'));
  reader.readAsDataURL(file);
});

// Översätt API-svaret till ett ÄRLIGT, åtgärdbart skäl (regel 7: varje fel blir en tillgång).
// Statuskoden är diagnosen — 429 dagskvot, 504 timeout, 401 session, 413 storlek, 404 fel ursprung.
function failReason(status, apiError, code) {
  switch (status) {
    case 429: return ['Dagskvot nådd', apiError || 'Ni har nått max antal fria analyser idag — försök igen imorgon eller aktivera ert konto.'];
    case 504: return ['Tog för lång tid', 'Analysen hann inte klart i tid. Vänta en stund och försök igen.'];
    case 401: return ['Sessionen löpte ut', `Ladda om sidan och försök igen.${code ? ` (orsak: ${code})` : ''}`];
    case 413: return ['Filen för stor', apiError || 'PDF:en överstiger maxstorleken — komprimera eller dela upp den.'];
    case 400: return ['Kunde inte läsas', apiError || 'Filen gick inte att tolka som en faktura. Kontrollera att det är en PDF-faktura.'];
    case 404: return ['Tjänsten nås inte här', 'Öppna ert kontor via arvoflow.se så fungerar analysen.'];
    case 500:
    case 502:
    case 503: return ['Tillfälligt serverfel', 'Något gick fel på vår sida — försök igen om en stund.'];
    default:  return ['Misslyckades', apiError || `Servern svarade ${status || 'oväntat'}.`];
  }
}

// ── helpers ──────────────────────────────────────────────────────────────────
const GENERIC_DOMAINS = new Set([
  'gmail.com','hotmail.com','outlook.com','yahoo.com','yahoo.se',
  'icloud.com','live.com','msn.com','me.com','proton.me','protonmail.com',
]);

async function getBrowserFingerprint() {
  const raw = [
    navigator.userAgent, navigator.language,
    `${window.screen.width}x${window.screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(navigator.hardwareConcurrency ?? ''),
  ].join('|');
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 24);
  } catch { return Math.random().toString(36).slice(2, 14); }
}

// Medveten TESTVÄG (rör aldrig den riktiga deterministiska identiteten):
//   ?reset=1   → färsk slumpad identitet → tomt "ny kund"-kontor (demo/test om och om igen)
//   ?reset=off → tillbaka till det riktiga fingerprint-kontot
// Identiteten lagras under en SEPARAT nyckel och är tydligt märkt "testkonto" i UI:t.
const FP_OVERRIDE_KEY = 'arvo_fp_override';
function resolveTestIdentity() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
      const v = (params.get('reset') || '1').toLowerCase();
      if (v === 'off' || v === '0' || v === 'real') {
        localStorage.removeItem(FP_OVERRIDE_KEY);
      } else {
        const fresh = 'test' + Array.from(crypto.getRandomValues(new Uint8Array(10)))
          .map((b) => b.toString(16).padStart(2, '0')).join('');
        localStorage.setItem(FP_OVERRIDE_KEY, fresh);
        ['arvo_successful_count', 'arvo_had_saving', 'arvo_gate_passed'].forEach((k) => localStorage.removeItem(k));
      }
      params.delete('reset');                       // strippa så reload inte rullar ny identitet
      const qs = params.toString();
      window.history.replaceState({}, '', window.location.pathname + (qs ? `?${qs}` : ''));
    }
    return localStorage.getItem(FP_OVERRIDE_KEY) || null;
  } catch { return null; }
}

const fmtNum   = (n) => (n == null ? '–' : Math.round(n).toLocaleString('sv-SE'));
const fmtDate  = (iso) => (iso ? new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) : '');
const monthYear = (d) => d.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });

const UNIT_LABEL = {
  per_user_month: 'kr/anv./mån',
  per_subscription_month: 'kr/abonn./mån',
  ore_per_kwh: 'öre/kWh',
};
const PUBLIC_SOURCE_LABEL = {
  'ramavtal-stat': 'statliga ramavtal',
  'ramavtal-kommun': 'kommunala ramavtal',
  'reskontra-kommun': 'kommunal leverantörsreskontra',
  upphandling: 'offentliga upphandlingar',
  eurostat: 'officiell statistik (Eurostat/SCB)',
};
// Vem datan beskriver — offentliga avtal vs marknadsgenomsnitt för företag.
const publicScopeLabel = (src) => (src === 'eurostat' ? 'Svenska företag' : 'Offentlig sektor');
const fmtUnit = (n) => (n == null ? '–' : Number(n).toLocaleString('sv-SE', { maximumFractionDigits: 2 }));

function companyFromEmail(email) {
  if (!email) return null;
  const domain = (email.split('@')[1] ?? '').toLowerCase();
  if (!domain || GENERIC_DOMAINS.has(domain)) return null;
  const name = domain.split('.')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function groupBySupplier(analyses) {
  const groups = new Map();
  for (const a of analyses) {
    const key = (a.normalized_supplier || a.supplier || 'okänd').toLowerCase();
    const g = groups.get(key);
    if (!g) groups.set(key, { latest: a, count: 1 });
    else {
      g.count += 1;
      if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
    }
  }
  return [...groups.values()].sort((x, y) => (y.latest.net_saving ?? 0) - (x.latest.net_saving ?? 0));
}

// Per-leverantör Arvo Score (samma logik som TestaFaktura).
function supplierDiagScore(a) {
  if (a.route === 'monitoring') return 72;
  if (!a.should_switch || !a.annual_cost || !a.suggested_annual_cost) {
    return a.annual_cost > 0 ? 82 : 50;
  }
  const ovPct = Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100);
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
}

// Totalpoäng = kostnadsviktat snitt av radernas poäng (går alltid att räkna hem).
function computeArvoScore(suppliers) {
  if (!suppliers.length) return 0;
  let w = 0, s = 0;
  for (const g of suppliers) {
    const weight = g.latest.annual_cost > 0 ? g.latest.annual_cost : 0;
    w += weight; s += supplierDiagScore(g.latest) * weight;
  }
  if (w === 0) return Math.round(suppliers.reduce((acc, g) => acc + supplierDiagScore(g.latest), 0) / suppliers.length);
  return Math.round(s / w);
}

// Marknadsläge — doten kartläggs EXAKT mot Arvo Score (precision bygger förtroende).
// Skalan löper Över marknaden (svag, vänster) → Under marknaden (stark, höger),
// så ett högt score sitter på den gynnsamma (högra) sidan. left% = score.
function marketStanding(score) {
  const pointer = Math.max(4, Math.min(96, score));
  const label = score >= 67 ? 'Under marknaden' : score >= 45 ? 'I nivå' : 'Över marknaden';
  return { pointer, label };
}

function scoreColor(score) {
  if (score < 45) return '#E06A4D';
  if (score < 65) return '#E0A23C';
  if (score < 80) return '#5DD6CA';
  return '#2BC4AC';
}

const RING_R = 17;
function Ring({ score, size = 42, r = RING_R, sw = 3.2 }) {
  const c = 2 * Math.PI * r, color = scoreColor(score);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={`${(score/100)*c} ${c}`}
        style={{ transform:'rotate(-90deg)', transformOrigin:'center', transition:'stroke-dasharray 1s ease' }} />
    </svg>
  );
}

// Deterministisk bedömning per leverantör (regel 2: kod skriver, ingen AI).
function buildReasoning(a) {
  const meta = getCategoryMeta(a.category);
  const label = (meta?.label ?? a.category).toLowerCase();
  if (a.route === 'monitoring')
    return `Avtalet är tidsbegränsat. Arvo bevakar och initierar omförhandling inför förnyelsen — ni betalar konkurrenskraftigt till dess.`;
  if (a.route === 'review_queue')
    return `Kategorin kräver manuell granskning — Arvo inhämtar offert för exakt prisjämförelse. Ni kontaktas när det är klart.`;
  if (a.should_switch && (a.net_saving ?? 0) > 0) {
    const ovPct = a.annual_cost > 0 && a.suggested_annual_cost > 0
      ? Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100) : 0;
    // Magnitudmedvetet: full bytesrekommendation reserveras för gap som bär den.
    if (ovPct >= 10) {
      return `Ni betalar <b>${ovPct}% mer</b> än verifierat marknadspris för ${label}. Arvo rekommenderar byte — det lägre priset finns förberett nedan.`;
    }
    return `Ni betalar ${ovPct > 0 ? `${ovPct}% mer` : 'något mer'} än verifierat marknadspris för ${label} — ett litet gap. Ett lägre avtalspris finns att säkra om ni vill, men ingen brådska; avvärjt är ändå avvärjt.`;
  }
  return `Priset är konkurrenskraftigt mot verifierat marknadspris för ${label}. Inget byte rekommenderas i dag — dela en ny faktura vid nästa avtalsperiod så kontrollerar Arvo igen.`;
}

// ── component ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [analyses, setAnalyses] = useState(null);
  const [apiEmail, setApiEmail] = useState(null);
  const [cohort, setCohort]     = useState({});
  const [publicBench, setPublicBench] = useState({});
  const [error, setError]       = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [fingerprint, setFingerprint] = useState('');
  const [uploads, setUploads]   = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadNote, setUploadNote] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [testMode, setTestMode] = useState(false);

  const magic = useMemo(() => new URLSearchParams(window.location.search).get('magic'), []);

  const loadOffice = useCallback(async (fp) => {
    const effFp = fp || fingerprint || await getBrowserFingerprint();
    const qs = `fingerprint=${encodeURIComponent(effFp)}` + (magic ? `&magic=${encodeURIComponent(magic)}` : '');
    const res = await fetch(`/api/invoice-history?${qs}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setAnalyses(data.analyses ?? []);
    setApiEmail(data.email ?? null);
    setCohort(data.cohort ?? {});
    setPublicBench(data.publicBench ?? {});
  }, [fingerprint, magic]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const override = resolveTestIdentity();      // ?reset → färsk testidentitet (annars riktig fingerprint)
        if (!cancelled) setTestMode(!!override);
        const fp = override || await getBrowserFingerprint();
        if (!cancelled) setFingerprint(fp);
        if (!cancelled) await loadOffice(fp);
      } catch (err) { if (!cancelled) setError(err.message); }
    })();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Intag: magic-kunder går via secure kontor-ingest (bypass, e-postnycklat);
  // anonyma går via samma publika väg som testa-faktura (token + gate på fingerprint).
  async function processFiles(fileList) {
    const picked = [...(fileList || [])]
      .filter((f) => f.type === 'application/pdf' || /\.pdf$/i.test(f.name))
      .slice(0, 20);
    if (!picked.length) return;
    setUploadNote('');
    setUploading(true);
    setUploads(picked.map((f) => ({ name: f.name, status: 'work' })));

    let token = null;
    if (!magic) {
      try { const tr = await fetch('/api/token', { method: 'POST' }); token = (await tr.json())?.token; } catch { /* försök ändå */ }
    }

    let gated = false, lastHint = '', reviewCount = 0;
    for (let i = 0; i < picked.length; i++) {
      try {
        const pdfBase64 = await fileToBase64(picked[i]);
        let status = 'fail', label = 'Misslyckades', hint = '';
        const endpoint = magic ? '/api/kontor-ingest' : '/api/test-invoice';
        const payload = magic
          ? { pdfBase64, magic, fingerprint }
          : { pdfBase64, industry: 'ovrigt', employees: 10, token, fingerprint };
        const res = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (magic) {
          if (data.ok) status = 'done';
          else { [label, hint] = failReason(res.status, data?.error, data?.code); lastHint = hint; }
        } else if (data.gate) {
          status = 'gate'; gated = true;
        } else if (data.route === 'auto' || data.route === 'monitoring') {
          status = 'done';                                   // riktig analys → leder till rummet
        } else if (data.route === 'review_queue' || data.route === 'unsupported') {
          status = 'review'; reviewCount++;                  // mottagen men kräver manuell granskning — ärligt kvitto
        } else {
          // Varje fel blir en tillgång (regel 7): visa det FAKTISKA skälet, inte ett tomt "Misslyckades".
          [label, hint] = failReason(res.status, data?.error, data?.code);
          lastHint = hint;
        }
        setUploads((prev) => prev.map((u, idx) => idx === i ? { ...u, status, label, hint } : u));
      } catch {
        lastHint = 'Kunde inte nå servern — kontrollera nätet och försök igen.';
        setUploads((prev) => prev.map((u, idx) => idx === i ? { ...u, status: 'fail', label: 'Nätverksfel', hint: lastHint } : u));
      }
    }

    setUploading(false);
    if (gated) {
      setUploadNote('Ni har nått gränsen för fria analyser. Vidarebefordra resten till faktura@inbox.arvoflow.se — eller aktivera ert konto — så fortsätter vi.');
    } else if (reviewCount > 0) {
      setUploadNote('En eller flera fakturor behöver manuell granskning (t.ex. utländsk valuta eller låg läsbarhet). Vi tittar på dem och återkommer — ladda gärna upp fler under tiden.');
    } else if (lastHint) {
      setUploadNote(lastHint);
    }
    try { await loadOffice(); } catch { /* behåll intaget om hämtning fallerar */ }
  }

  const onPick = (e) => { const fl = e.target.files; e.target.value = ''; processFiles(fl); };
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); processFiles(e.dataTransfer?.files); };
  const onDragOver = (e) => { e.preventDefault(); if (!dragOver) setDragOver(true); };
  const onDragLeave = () => setDragOver(false);

  function toggle(id) {
    setExpanded((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const autoAnalyses = useMemo(() => (analyses ?? []).filter((a) => a.route === 'auto' || a.route === 'monitoring'), [analyses]);
  const suppliers    = useMemo(() => groupBySupplier(autoAnalyses), [autoAnalyses]);

  // Forensik-inversionen i rummet: starkaste mekanism-fyndet (ur kundens egna rader) leder domen.
  // Zero Trust — talet kommer från fakturaraden, persisterat i lead_finding_json. Tomt → inget kort.
  const roomFinding = useMemo(() => {
    const rank = { high: 0, medium: 1, low: 2 };
    return (autoAnalyses ?? [])
      .map((a) => a.lead_finding_json)
      .filter((f) => f && typeof f === 'object' && f.title)
      .sort((x, y) => (rank[x.severity] - rank[y.severity]) || ((y.annualImpact || 0) - (x.annualImpact || 0)))[0] ?? null;
  }, [autoAnalyses]);

  // Kontraktsklockan i rummet — det avtal som förfaller SNARAST leder (minst dagar kvar).
  // contractClock kommer fresiderande från api/invoice-history (beräknat vid läsning, ej lagrat).
  const roomClock = useMemo(() => {
    return (analyses ?? [])
      .map((a) => a.contractClock)
      .filter((c) => c && typeof c === 'object' && c.title && c.daysLeft > 0)
      .sort((x, y) => x.daysLeft - y.daysLeft)[0] ?? null;
  }, [analyses]);
  const totalSaving  = suppliers.reduce((s, g) => s + (g.latest.net_saving ?? 0), 0);
  const arvoScore    = computeArvoScore(suppliers);
  const standing     = marketStanding(arvoScore);
  const companyName  = companyFromEmail(apiEmail);
  const switchables  = suppliers.filter((g) => g.latest.should_switch && (g.latest.net_saving ?? 0) > 0);

  // Kohort-sanningen — featurera leverantören med störst gap mot vad bolag
  // hos samma leverantör betalar. Helt ur verklig cross-customer-data (≥3).
  const featured = useMemo(() => {
    let best = null;
    for (const g of suppliers) {
      const a = g.latest;
      const mi = cohort[`${a.normalized_supplier}|${a.category}`];
      const median = mi?.supplierMedian || mi?.supplierAvgCost;
      if (!mi || !median || !a.annual_cost) continue;
      const pct = Math.round(((a.annual_cost - median) / median) * 100);
      const cand = {
        supplier: a.supplier || a.normalized_supplier,
        cost: a.annual_cost, median, p25: mi.supplierP25, n: mi.supplierDataPoints, pct,
      };
      if (!best || pct > best.pct) best = cand;
    }
    return best;
  }, [suppliers, cohort]);

  // Offentlig/marknadsdata — fyller "kollektiva sanningen" tills privat kohort finns.
  // VIKTIGT: peer-data (svenska företag, t.ex. Eurostat) är en relevant jämförelse;
  // offentlig sektor (ramavtal) är volymgrindat och OUPPNÅELIGT för ett SMB — visas
  // bara som golv-referens ("priset är förhandlingsbart"), aldrig som "ni betalar X% mer".
  const publicFeatured = useMemo(() => {
    if (featured) return null;
    for (const g of suppliers) {
      const a = g.latest;
      const pb = publicBench[a.category];
      if (pb && pb.n >= 2 && pb.observations?.length) {
        const isPeer = pb.observations[0]?.source === 'eurostat'; // företag-mot-företag = relevant
        // Per-enhet-jämförelse mot kunden ENDAST för relevant peer-data + samma leverantör.
        const customerUnit = (isPeer && pb.scope === 'supplier' && a.price_per_seat_monthly > 0) ? a.price_per_seat_monthly : null;
        const pct = customerUnit ? Math.round(((customerUnit - pb.median) / pb.median) * 100) : null;
        return { ...pb, category: a.category, supplier: a.supplier || a.normalized_supplier, customerUnit, pct, isPeer };
      }
    }
    return null;
  }, [featured, suppliers, publicBench]);

  // Maktkalendern — årsavtal med uppskattat förnyelsefönster (created_at + 12 mån).
  // Estimat, tydligt märkt (regel 3) — inga fabricerade sannolikheter.
  const renewals = useMemo(() => suppliers
    .filter((g) => g.latest.billing_period === 'annual' && g.latest.created_at)
    .map((g) => {
      const a = g.latest;
      const when = new Date(a.created_at); when.setMonth(when.getMonth() + 12);
      return { id: a.id, supplier: a.supplier || a.normalized_supplier, when, cost: a.annual_cost };
    })
    .sort((x, y) => x.when - y.when), [suppliers]);

  const latestDate = suppliers.length
    ? fmtDate(suppliers.map((g) => g.latest.created_at).sort().reverse()[0]) : '';
  const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();

  // Veckodomen — deterministisk ur verkligt läge.
  const acting = switchables.length > 0;
  const verdictHead = acting
    ? <>Ni betalar <em>över marknaden</em> hos {switchables.length} av {suppliers.length}.</>
    : <>Håll kursen. Era priser <em>står sig mot marknaden.</em></>;
  const verdictWork = acting
    ? <>Vi jämförde era <b>{suppliers.length} leverantörer</b> mot verifierat marknadspris.
        <b> {fmtNum(totalSaving)} kr/år</b> i identifierad nettobesparing ligger på bordet — det
        största bytet tar två minuter att signera. Resten håller måttet; dem rör vi inte.</>
    : <>Vi jämförde era <b>{suppliers.length} leverantörer</b> mot verifierat marknadspris.
        Inget byte rekommenderas i dag. Vi hör av oss om läget förändras — ni behöver inte göra något.</>;

  return (
    <Page>
      <Shell>
        {analyses === null && !error && <Spinner />}
        {error && <Verdict><h2 style={{ fontSize: 26 }}>Kunde inte ladda ert kontor — försök igen om en stund.</h2></Verdict>}

        {analyses !== null && suppliers.length > 0 && (
          <>
            {/* ── Identitet + Vakten ──────────────────────────────────────── */}
            <TopRow>
              <Ident>
                <div className="brand">ARVO-KONTORET</div>
                <div className="confidential">Konfidentiellt · {companyName ?? 'Ert konto'} · {today}{testMode ? ' · TESTKONTO (?reset=off för skarpt)' : ''}</div>
                <h1>{acting ? <>Ett par drag<br />väntar på er.</> : <>God morgon.<br />Allt är under kontroll.</>}</h1>
              </Ident>

              <Radar>
                <div className="radar-head">
                  <div className="disc">
                    <svg width="46" height="46" viewBox="0 0 46 46">
                      <circle cx="23" cy="23" r="21" fill="none" stroke="rgba(93,214,202,.18)" strokeWidth="1" />
                      <circle cx="23" cy="23" r="13" fill="none" stroke="rgba(93,214,202,.14)" strokeWidth="1" />
                      <circle cx="23" cy="23" r="2" fill="#5DD6CA" />
                    </svg>
                    <div className="sweep" />
                  </div>
                  <div className="radar-title"><strong>Vakten</strong>bevakar era avtal</div>
                </div>
                <div className="radar-stats">
                  <div className="rstat"><span>Leverantörer</span><span className="v">{suppliers.length}</span></div>
                  <div className="rstat"><span>Analyser</span><span className="v">{autoAnalyses.length}</span></div>
                  <div className="rstat"><span>Marknadskällor</span><span className="v">40</span></div>
                </div>
                <div className="radar-foot">
                  <span className="live" />
                  {latestDate ? <>Senaste analys {latestDate} · bevakning aktiv</> : 'Bevakning aktiv'}
                </div>
              </Radar>
            </TopRow>

            {/* ── Forensik-domen: mekanismen leder (delad komponent, mörkt ansikte) ──── */}
            <FindingCard finding={roomFinding} variant="dossier" />

            {/* ── Kontraktsklockan (Maktkalendern): det avtal som förfaller snarast ──── */}
            <FindingCard finding={roomClock} variant="dossier" eyebrow="Maktkalendern · avtalsbevakning" />

            {/* ── Veckodomen ──────────────────────────────────────────────── */}
            <Verdict>
              <div className="eyebrow">Arvo bedömer</div>
              <h2>{verdictHead}</h2>
              <p className="work">{verdictWork}</p>
              <Confidence>
                <span className="pct">Verifierat</span> · grundat på {suppliers.length} analyserade leverantörer · publika listpriser
              </Confidence>
            </Verdict>

            {/* ── Instrument: Arvo Score + likräkning ─────────────────────── */}
            <Grid>
              <Index>
                <div className="card-eyebrow"><span>Arvo Score</span><span className="src">mot verifierat listpris</span></div>
                <div className="idx-main">
                  <span className="idx-num">{arvoScore}</span>
                  <span className="idx-denom">/100</span>
                </div>
                <div className="mkt-k">Marknadsläge</div>
                <div className="mkt-track"><span className="mkt-ptr" style={{ left: `${standing.pointer}%` }} /></div>
                <div className="mkt-scale">
                  <span className={standing.label === 'Över marknaden' ? 'on' : ''}>Över marknaden</span>
                  <span className={standing.label === 'I nivå' ? 'on' : ''}>I nivå</span>
                  <span className={standing.label === 'Under marknaden' ? 'on' : ''}>Under marknaden</span>
                </div>
                <p className="idx-note">
                  {switchables.length > 0
                    ? <>Sammanvägt {arvoScore >= 67 ? 'starkt' : arvoScore >= 45 ? 'godkänt' : 'svagt'} — men <b>{switchables.length} avtal drar över marknaden</b>. De ligger förberedda i innehavet nedan.</>
                    : <>Era priser ligger <b>i nivå med eller under verifierat listpris</b>. Inget enskilt avtal sticker ut i dag.</>}
                </p>
              </Index>

              <Tally>
                <div className="tally-k">{acting ? 'Identifierad nettobesparing' : 'Avtal under bevakning'}</div>
                <div className="tally-num">
                  {acting
                    ? <>{fmtNum(totalSaving)} kr<small>per år</small></>
                    : <>{suppliers.length}<small>{suppliers.length === 1 ? 'avtal' : 'avtal'}</small></>}
                </div>
                <div className="tally-sub">
                  {acting
                    ? <><b>{switchables.length} byte{switchables.length > 1 ? 'n' : ''} förberedda</b> · netto efter Arvos arvode (20% av första årets besparing). Från år två är hela besparingen er.</>
                    : <>Era priser står sig — inga byten på bordet just nu. Lugnet att ni ligger rätt är också en leverans.</>}
                </div>
              </Tally>
            </Grid>

            {/* ── Kohort-sanningen + Maktkalendern (gate:ade till verklig data) ── */}
            {(featured || publicFeatured || renewals.length > 0) && (
              <Grid>
                {publicFeatured && (
                  <Truth $full={renewals.length === 0}>
                    <div className="card-eyebrow">
                      <span>{publicFeatured.isPeer ? 'Den kollektiva sanningen' : 'Golv-referens'}</span>
                      <span className="src">{publicFeatured.isPeer ? 'svenska företag' : 'offentlig sektor'} · {publicFeatured.n} pris{publicFeatured.n > 1 ? 'punkter' : 'punkt'}</span>
                    </div>
                    <h3>
                      {(() => {
                        const cat = (getCategoryMeta(publicFeatured.category)?.label || publicFeatured.category).toLowerCase();
                        const u = UNIT_LABEL[publicFeatured.unit] || '';
                        if (!publicFeatured.isPeer)
                          return <>Offentlig sektor pressar samma {cat} till <em>{fmtUnit(publicFeatured.min)}–{fmtUnit(publicFeatured.max)} {u}</em>. Beviset att priset är <em>förhandlingsbart.</em></>;
                        if (publicFeatured.customerUnit && publicFeatured.pct >= 8)
                          return <>Svenska företag betalar {fmtUnit(publicFeatured.median)} {u} för {cat}. Ni betalar <em>{publicFeatured.pct}% mer.</em></>;
                        if (publicFeatured.customerUnit && publicFeatured.pct <= -8)
                          return <>Ni betalar <em>{Math.abs(publicFeatured.pct)}% mindre</em> än svenska företag för {cat}.</>;
                        if (publicFeatured.customerUnit)
                          return <>Ni betalar <em>i nivå</em> med svenska företag för {cat}.</>;
                        return <>Svenska företag betalar <em>{fmtUnit(publicFeatured.min)}–{fmtUnit(publicFeatured.max)} {u}</em> för {cat}.</>;
                      })()}
                    </h3>
                    {(() => {
                      const rows = [
                        ...(publicFeatured.customerUnit ? [{ lbl: 'Ni betalar', amt: publicFeatured.customerUnit, you: true }] : []),
                        ...(publicFeatured.observations || []).map((o) => ({ lbl: o.product || o.buyer, amt: o.unitPrice, you: false })),
                      ];
                      if (!rows.length) return null;
                      const max = Math.max(...rows.map((r) => r.amt)) || 1;
                      return (
                        <div className="bars">
                          {rows.map((r, i) => (
                            <div className={`barrow${r.you ? ' you' : ''}`} key={i}>
                              <span className="lbl">{r.lbl}</span>
                              <span className="track"><span className="fill" style={{ width: `${Math.max(8, (r.amt / max) * 100)}%` }} /></span>
                              <span className="amt">{fmtUnit(r.amt)}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    <p className="truth-note">
                      Verkliga priser ur <b>öppen data</b> — {PUBLIC_SOURCE_LABEL[publicFeatured.observations?.[0]?.source] || 'offentliga avtal'}
                      {publicFeatured.observations?.[0]?.buyer ? `, ${publicFeatured.observations[0].buyer}` : ''}.
                      {publicFeatured.isPeer
                        ? (publicFeatured.customerUnit ? ' Jämfört per enhet mot er faktura.' : '')
                        : ' Golvet — inte ett mål ni når i er storlek, men beviset att listpriset är förhandlingsbart.'}
                    </p>
                  </Truth>
                )}
                {featured && (
                  <Truth $full={renewals.length === 0}>
                    <div className="card-eyebrow">
                      <span>Den kollektiva sanningen</span>
                      <span className="src">{featured.n} bolag · live</span>
                    </div>
                    <h3>
                      {featured.pct >= 8
                        ? <>{featured.n} bolag hos {featured.supplier} betalar i snitt {fmtNum(featured.median)} kr. Ni betalar <em>{featured.pct}% mer.</em></>
                        : featured.pct <= -8
                          ? <>Ni betalar <em>{Math.abs(featured.pct)}% mindre</em> än snittet hos {featured.supplier} — {featured.n} bolag jämförda.</>
                          : <>Ni betalar <em>i nivå</em> med vad {featured.n} bolag betalar hos {featured.supplier}.</>}
                    </h3>
                    {(() => {
                      const max = Math.max(featured.cost, featured.median, featured.p25 || 0) || 1;
                      const rows = [
                        { lbl: 'Ni betalar', amt: featured.cost, you: true },
                        { lbl: `Snitt · ${featured.n} bolag`, amt: featured.median, you: false },
                        ...(featured.p25 ? [{ lbl: 'Lägst 25 %', amt: featured.p25, you: false }] : []),
                      ];
                      return (
                        <div className="bars">
                          {rows.map((r) => (
                            <div className={`barrow${r.you ? ' you' : ''}`} key={r.lbl}>
                              <span className="lbl">{r.lbl}</span>
                              <span className="track"><span className="fill" style={{ width: `${Math.max(8, (r.amt / max) * 100)}%` }} /></span>
                              <span className="amt">{fmtNum(r.amt)} kr</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    <p className="truth-note">
                      Den här raden kräver att man ser <b>många bolags faktiska fakturor samtidigt</b>.
                      Ingen jämförelsesajt och ingen konsult kan ge den — bara Arvo, tack vare nätverket.
                    </p>
                  </Truth>
                )}

                {renewals.length > 0 && (
                  <Calendar $full={!featured && !publicFeatured}>
                    <div className="card-eyebrow">
                      <span>Maktkalendern · era årsavtal</span>
                      <span className="src">uppskattat</span>
                    </div>
                    {renewals.map((r) => (
                      <div className="cal-row" key={r.id}>
                        <span className="cal-prob"><Icon name="calendar-clock" size={18} stroke={1.8} /></span>
                        <div className="cal-body">
                          <div className="t">{r.supplier}</div>
                          <div className="s">Årsavtal — förhandlingsläget återkommer årligen. {fmtNum(r.cost)} kr/år.</div>
                        </div>
                        <span className="cal-when">~ {monthYear(r.when)}</span>
                      </div>
                    ))}
                  </Calendar>
                )}
              </Grid>
            )}

            {/* ── Innehavet — leverantörer, Switch inbakad i raden ────────── */}
            <Holdings>
              <div className="h-eyebrow">Innehavet · {suppliers.length} analyserade leverantörer</div>
              {suppliers.map((g) => {
                const a = g.latest, meta = getCategoryMeta(a.category);
                const score = supplierDiagScore(a), color = scoreColor(score);
                const isOpen = expanded.has(a.id);
                const saving = a.should_switch && (a.net_saving ?? 0) > 0;
                return (
                  <HoldRow key={a.id} $saving={saving}>
                    <HoldHead $open={isOpen} onClick={() => toggle(a.id)} aria-expanded={isOpen}>
                      <RingWrap>
                        <Ring score={score} />
                        <span className="v" style={{ color }}>{score}</span>
                      </RingWrap>
                      <div>
                        <div className="h-name">{a.supplier || a.normalized_supplier || 'Okänd leverantör'}</div>
                        <div className="h-cat">{meta.label} · {fmtDate(a.created_at)}{g.count > 1 ? ` · ${g.count} analyser` : ''}</div>
                      </div>
                      <div className="h-cost">{a.annual_cost != null ? `${fmtNum(a.annual_cost)} kr/år` : ''}</div>
                      <div className={`h-badge ${saving ? 'save' : 'watch'}`}>
                        {saving ? `+${fmtNum(a.net_saving)} kr/år` : a.route === 'monitoring' ? 'Avtalsbevakad' : 'Rätt prissatt'}
                      </div>
                      <span className="h-chev"><Icon name="chevron-down" size={16} stroke={2} /></span>
                    </HoldHead>

                    {isOpen && (
                      <HoldDetail>
                        <div className="diag">
                          <div className="dbody">
                            <div className="dtop">Arvo bedömer</div>
                            <div className="dtxt" dangerouslySetInnerHTML={{ __html: buildReasoning(a) }} />
                          </div>
                        </div>

                        {/* Faktatabell — råa tal en gång. Priset bor i Switch-kortet
                            när ett byte finns; annars här. */}
                        <dl className="facts">
                          {!saving && a.annual_cost != null && <div className="fact"><dt>Ni betalar idag</dt><dd>{fmtNum(a.annual_cost)} kr/år</dd></div>}
                          <div className="fact"><dt>Kategori</dt><dd style={{ fontFamily: 'inherit' }}>{meta.label}</dd></div>
                          <div className="fact"><dt>Analyserad</dt><dd>{fmtDate(a.created_at)}</dd></div>
                        </dl>

                        {saving && (
                          <SwitchInline>
                            <div className="si-k">Arvo Switch · så går bytet till</div>
                            <div className="si-steps">
                              <div className="si-step"><span className="si-n">1</span><span className="si-body"><span className="si-t">Ni aktiverar bytet</span><span className="si-d">Ett klick — Arvo tar det därifrån.</span></span></div>
                              <div className="si-step"><span className="si-n">2</span><span className="si-body"><span className="si-t">Arvo förbereder allt</span><span className="si-d">Fullmakt och bytesplan i er inkorg inom 24 timmar — ni granskar och signerar.</span></span></div>
                              <div className="si-step"><span className="si-n">3</span><span className="si-body"><span className="si-t">Nytt avtalspris aktivt</span><span className="si-d">Ni betalar 20 % av första årets besparing — från år två är hela besparingen er.</span></span></div>
                            </div>
                            <div className="si-offer">
                              <span className="old">{fmtNum(a.annual_cost)} kr/år</span>
                              <span className="arr">→</span>
                              <span className="new">{fmtNum(a.suggested_annual_cost)}<small>kr/år</small></span>
                            </div>
                            <div className="si-save">
                              Ni sparar <b>{fmtNum(a.net_saving)} kr/år</b> netto efter Arvos arvode (20 % av första årets besparing).
                            </div>
                            <SwitchBtn as={Link} to="/aktivera">
                              Aktivera bytet <Icon name="arrow" size={16} />
                            </SwitchBtn>
                          </SwitchInline>
                        )}
                      </HoldDetail>
                    )}
                  </HoldRow>
                );
              })}
            </Holdings>

            {/* ── Arvo Intelligence — tyst avslutande pitch ───────────────── */}
            <IntelQuiet>
              <div className="iq-k">Arvo Intelligence</div>
              <h3>Hela reskontran, <em>bevakad dygnet runt.</em></h3>
              <p>
                {acting
                  ? <>I dag vaktar Arvo de avtal ni delat. Arvo Intelligence vidgar vakten till <b>resten av boken</b> — varenda avtal ni har — och larmar er innan nästa höjning når er. Varje månad: ett brev med exakt vad som rört sig, och vad vi gjort åt det.</>
                  : <>Era priser står sig i dag, och Arvo vaktar de avtal ni delat. Arvo Intelligence vidgar vakten till <b>resten av boken</b>, så att inget avtal lämnas obevakat — och skickar varje månad ett brev med vad som rört sig.</>}
              </p>
              <div className="iq-row">
                <span className="iq-price">1 995 kr <span>/ mån · ingen bindningstid</span></span>
                <SwitchBtn as={Link} to="/aktivera">Aktivera Arvo Intelligence <Icon name="arrow" size={16} /></SwitchBtn>
              </div>
            </IntelQuiet>

            <SignOff>
              <div className="keyline" />
              <div className="mark">ARVO</div>
              <div className="tagline">Finansiell intelligens som aldrig sover.</div>
            </SignOff>
          </>
        )}

        {/* ── Tomt kontor = intelligensintaget (intagsdisk, ej säljpitch) ──── */}
        {analyses !== null && suppliers.length === 0 && !error && (
          <>
            <TopRow>
              <Ident>
                <div className="brand">ARVO-KONTORET</div>
                <div className="confidential">Konfidentiellt · {companyName ?? 'Ert konto'} · {today}{testMode ? ' · TESTKONTO (?reset=off för skarpt)' : ''}</div>
                <h1>Ert kontor väntar<br />på första analysen.</h1>
              </Ident>
            </TopRow>

            <Verdict>
              <div className="eyebrow">Var pengarna oftast rinner</div>
              <h2>Överbetalningen sitter oftast i <em>IT-licenser, telefoni och mjukvara.</em></h2>
              <p className="work">
                Börja där — en enda faktura räcker för ert första fynd, ofta inom minuter.
                Töm sedan resten av högen: ju fler avtal Arvo ser, desto skarpare blir hela
                bilden av var ni betalar för mycket.
              </p>
            </Verdict>

            <CoverageMap>
              <div className="cm-eyebrow">Er kostnadskarta · {INTAKE_SEGMENTS.length} kategorier</div>
              <div className="cm-grid">
                {INTAKE_SEGMENTS.map((s) => (
                  <div key={s.label} className={`cm-cell${s.mode === 'verdict' ? ' hot' : ''}`}>
                    <div className="cm-top">
                      <span className="cm-ico"><Icon name={s.icon} size={19} stroke={1.7} /></span>
                      {s.mode === 'verdict'
                        ? <span className="cm-tag">Börja här</span>
                        : <span className="cm-tag offert">via offert</span>}
                    </div>
                    <span className="cm-label">{s.label}</span>
                    <span className="cm-hint">{s.hint}</span>
                    {s.know && <span className="cm-verified">{s.know}</span>}
                  </div>
                ))}
              </div>
            </CoverageMap>

            <IntakeDoors>
              <div className="door">
                <div className="door-k">Snabbast · vidarebefordra</div>
                <h4>Töm månadens fakturor i ett mejl.</h4>
                <p>Markera era leverantörsfakturor (PDF) i inkorgen och vidarebefordra allt på en gång — analyserna landar här.</p>
                <div className="spacer" />
                <AddressChipDark>faktura@inbox.arvoflow.se</AddressChipDark>
              </div>

              <div className="door">
                <div className="door-k">Eller · ladda upp direkt</div>
                <h4>Dra in flera fakturor här.</h4>
                <p>PDF · upp till 20 åt gången · vi sparar aldrig filen efter analysen.</p>
                <div className="spacer" />
                <Dropzone
                  className={`${uploading ? 'busy' : ''}${dragOver ? ' over' : ''}`}
                  onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
                >
                  <span className="dz-ico"><Icon name="upload" size={22} stroke={1.7} /></span>
                  <span className="dz-t">{uploading ? 'Analyserar…' : dragOver ? 'Släpp här' : 'Släpp eller välj PDF-fakturor'}</span>
                  <span className="dz-s">Flera samtidigt går bra</span>
                  <input type="file" accept="application/pdf" multiple disabled={uploading} onChange={onPick} />
                </Dropzone>
                {uploads.length > 0 && (
                  <DropProgress>
                    {uploads.map((u, i) => (
                      <div className="dp-row" key={`${u.name}-${i}`}>
                        <span className="dp-name">{u.name}</span>
                        <span
                          className={`dp-stat ${u.status === 'done' ? 'done' : (u.status === 'work' || u.status === 'gate' || u.status === 'review') ? 'work' : 'fail'}`}
                          title={u.status === 'fail' ? (u.hint || '') : ''}
                        >
                          {u.status === 'done' ? 'Klar'
                            : u.status === 'review' ? 'Manuell granskning'
                            : u.status === 'fail' ? (u.label || 'Misslyckades')
                            : u.status === 'gate' ? 'Gräns nådd' : 'Analyserar…'}
                        </span>
                      </div>
                    ))}
                  </DropProgress>
                )}
                {uploadNote && <DropProgress><p className="dp-note">{uploadNote}</p></DropProgress>}
              </div>
            </IntakeDoors>

            <FortnoxTease>
              <span className="ft-ico"><Icon name="lock" size={18} stroke={1.7} /></span>
              <span className="ft-txt">
                <b>Snart: koppla Fortnox.</b> När integrationen är på plats läses hela
                leverantörsreskontran automatiskt — då slutar ni ladda upp.
              </span>
              <span className="ft-soon">Lanseras inom kort</span>
            </FortnoxTease>

            <SignOff>
              <div className="keyline" />
              <div className="mark">ARVO</div>
              <div className="tagline">Finansiell intelligens som aldrig sover.</div>
            </SignOff>
          </>
        )}
      </Shell>
    </Page>
  );
}
