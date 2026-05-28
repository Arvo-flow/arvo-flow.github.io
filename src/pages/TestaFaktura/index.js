import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { formatKr } from '../../data/mockData';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body, Card,
  Dropzone, FormRow, Field, SubmitRow, Disclaimer, ErrorBox, Spinner,
  ProgressList, ProgressItem,
  ResultHead, SavingsBlock, NoSwitchBlock, MonitoringBlock, CreditAlert, PriceNote, PartnerBlock, KV,
  Reasoning, LicenseOverageNote, TierOptAccordion, NextSteps, ScoreDiag, EmailGate,
  ModalOverlay, ModalCard, QuoteLeadForm,
} from './styles';

const TIER_DISPLAY = {
  'business-premium':  'Business Premium',
  'business-standard': 'Business Standard',
  'business-basic':    'Business Basic',
  'e3': 'E3',
  'e5': 'E5',
};

const formatNum = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function detectHardwareInstallments(lineItems) {
  if (!Array.isArray(lineItems)) return [];
  const re = /[Mm]ånad\s+(\d+)\s+av\s+(\d+)|[Mm]onth\s+(\d+)\s+of\s+(\d+)/;
  return lineItems.flatMap(li => {
    const isHw = li.type === 'hardware' || li.description?.toLowerCase().includes('delbetalning');
    if (!isHw) return [];
    const m = re.exec(li.description ?? '');
    if (!m) return [];
    const current = parseInt(m[1] ?? m[3]);
    const total   = parseInt(m[2] ?? m[4]);
    if (isNaN(current) || isNaN(total) || total <= current) return [];
    return [{ description: li.description, monthlyCost: li.amount ?? 0, monthsRemaining: total - current, remainingCost: (total - current) * (li.amount ?? 0) }];
  });
}

function useCountUp(target, duration = 1600) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!target) { setVal(0); return; }
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) { raf = requestAnimationFrame(tick); } else { setVal(target); }
    };
    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [target, duration]);
  return val;
}

const MAX_PDF_SIZE   = 3 * 1024 * 1024;
const FREE_ANALYSES    = 3; // speglar serverns konstant
const FREE_SUCCESSFUL  = 2; // max lyckade auto-analyser innan gate

async function getBrowserFingerprint() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    `${window.screen.width}x${window.screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    String(navigator.hardwareConcurrency ?? ''),
  ].join('|');
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 24);
  } catch {
    return Math.random().toString(36).slice(2, 14);
  }
}

// Categories with verified public list prices — show supplier name proudly.
const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'mobil']);

// Scrub the suggested supplier name from reasoning text so the tier/price
// analysis stays visible but the specific alternative brand stays hidden.
function redactSupplier(text, supplier) {
  if (!text || !supplier) return text;
  const words = supplier.split(/\s+/);
  const terms = [supplier];
  if (words[0].length >= 4) terms.push(words[0]);
  if (words.length >= 2) terms.push(`${words[0]} ${words[1]}`);
  let out = text;
  for (const term of [...new Set(terms)]) {
    out = out.replace(
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      'Arvo-verifierad partner',
    );
  }
  return out;
}

// Category 2: contract-based benchmark prices — hide supplier, show verified partner.
const CATEGORY_PARTNER_LABEL = {
  el:                 'Kvalificerad Elleverantör',
  bredband:           'Kvalificerad Bredbandsoperatör',
  kortterminal:       'Kvalificerad Betaltjänstleverantör',
  'faktura-tjanst':   'Kvalificerad Affärssystemsleverantör',
  'leasing-bil':      'Kvalificerad Leasingpartner',
  skrivarleasing:     'Kvalificerad Print-leverantör',
  loneadmin:          'Kvalificerad Lönesystemleverantör',
  'larm-bevakning':   'Kvalificerad Säkerhetsleverantör',
  foretagshalsovard:  'Kvalificerad Hälsovårdspartner',
  bankavgifter:       'Kvalificerad Bankpartner',
  kontorsmaterial:    'Kvalificerad Förbrukningsleverantör',
  'städ-rengöring':   'Kvalificerad Städleverantör',
  'transport-frakt':  'Kvalificerad Fraktleverantör',
  'avfall-atervinning': 'Kvalificerad Avfallsleverantör',
  'it-support':       'Kvalificerad IT-partner',
};

const INDUSTRY_LABELS = {
  ehandel:     'E-handel & Detaljhandel',
  tillverkning:'Industri & Tillverkning',
  'it-tech':   'IT, Tech & Mjukvara',
  bygg:        'Bygg, Hantverk & Fastighet',
  hotell:      'Hotell, Restaurang & Event',
  konsult:     'Konsult & Företagstjänster',
  transport:   'Transport & Logistik',
  vard:        'Vård, Omsorg & Hälsa',
  ovrigt:      'Övrigt / Annan bransch',
};

const CATEGORY_LABELS = {
  el:                  'Elavtal',
  mobil:               'Mobilabonnemang',
  bredband:            'Företagsbredband',
  'forsakring-foretag':'Företagsförsäkring',
  'forsakring-ansvar': 'Yrkesansvarsförsäkring',
  'leasing-bil':       'Företagsleasing',
  kortterminal:        'Kortterminal',
  'faktura-tjanst':    'Fakturatjänst / Affärssystem',
  'saas-productivity': 'Programvarulicenser / SaaS',
  'saas-creative':     'Kreativ mjukvara / Design',
  'saas-crm':          'CRM-system',
  'saas-finance':      'Affärssystem / Bokföring',
  'saas-other':        'Programvarulicenser / SaaS · övrigt',
  serverhosting:       'Serverhosting & Cloud-infrastruktur',
  utrustningsleasing:  'IT-utrustningsleasing',
  skrivarleasing:      'Skrivare & Managed Print',
  loneadmin:           'Löneadministration',
  'larm-bevakning':    'Larm & Bevakning',
  foretagshalsovard:   'Företagshälsovård',
  bankavgifter:        'Bankavgifter & Betaltjänster',
  kontorsmaterial:     'Kontorsmaterial & Förbrukning',
  'städ-rengöring':    'Städ & Rengöring',
  'transport-frakt':   'Transport & Frakt',
  'it-support':        'IT-drift & Support',
  'avfall-atervinning': 'Avfall & Återvinning',
  uncategorized:       'Okategoriserad',
};

const SEGMENTS = [
  { label: 'Skrivare',          icon: 'file',      cats: ['skrivarleasing', 'utrustningsleasing'] },
  { label: 'El',               icon: 'bolt',      cats: ['el'] },
  { label: 'Telefoni och bredband', icon: 'phone', cats: ['mobil', 'bredband', 'vaxel'] },
  { label: 'Programvara',      icon: 'spark',     cats: ['saas-productivity', 'saas-creative', 'saas-crm', 'saas-finance', 'saas-other', 'serverhosting', 'faktura-tjanst'] },
  { label: 'IT',               icon: 'wifi',      cats: ['it-support'] },
  { label: 'Fordon och frakt',  icon: 'truck',     cats: ['leasing-bil', 'transport-frakt'] },
  { label: 'Kontor och städ',  icon: 'briefcase', cats: ['kontorsmaterial', 'städ-rengöring', 'larm-bevakning', 'kortterminal', 'avfall-atervinning', 'bankavgifter'] },
  { label: 'Personal och hälsa', icon: 'shield',  cats: ['foretagshalsovard', 'loneadmin', 'forsakring-foretag', 'forsakring-ansvar'] },
];

const PHASES = [
  { id: 'extract', label: 'Läser fakturan' },
  { id: 'categorize', label: 'Identifierar leverantör & kategori' },
  { id: 'recommend', label: 'Jämför mot branschindex' },
];

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const result = String(reader.result || '');
    const base64 = result.includes(',') ? result.split(',')[1] : result;
    resolve(base64);
  };
  reader.onerror = () => reject(new Error('Kunde inte läsa filen'));
  reader.readAsDataURL(file);
});

const TestaFaktura = () => {
  const fileInputRef = useRef(null);
  const resultRef    = useRef(null);
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('konsult');
  const [employees, setEmployees] = useState(5);
  const [revenue, setRevenue] = useState('');
  const [phase, setPhase] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState('idle'); // idle | submitting | sent
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState('fortnox'); // fortnox | email
  const [modalEmail, setModalEmail] = useState('');
  const [modalEmailState, setModalEmailState] = useState('idle'); // idle | submitting | sent
  const [apiToken, setApiToken] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [tierOptOpen, setTierOptOpen] = useState(false);
  const [gateReason, setGateReason] = useState('quota'); // 'saving' | 'quota'
  const [gateEmail, setGateEmail] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [quoteName, setQuoteName] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteMandateAccepted, setQuoteMandateAccepted] = useState(false);
  const [quoteState, setQuoteState] = useState('idle'); // idle | submitting | sent
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadEmailState, setDownloadEmailState] = useState('idle'); // idle | submitting | sent

  // Token + bypass-setup vid mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bypassParam = params.get('bypass');
    if (bypassParam) {
      sessionStorage.setItem('arvo_bypass', bypassParam);
      window.history.replaceState({}, '', window.location.pathname);
    }
    fetch('/api/token', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setApiToken(d.token ?? null))
      .catch(() => {});
  }, []);

  const validateAndSetFile = (f) => {
    setError(null);
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Endast PDF-filer stöds.');
      return;
    }
    if (f.size > MAX_PDF_SIZE) {
      setError(`PDF är för stor (${(f.size / 1024 / 1024).toFixed(1)} MB). Max: 3 MB.`);
      return;
    }
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragActive(false); };

  const runAnalysis = async (overrideEmail = null) => {
    if (!file) { setError('Välj en PDF-faktura först.'); return; }
    const isUnlocked = !!(sessionStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_gate_passed'));
    if (!overrideEmail && !isUnlocked) {
      const hadSaving     = localStorage.getItem('arvo_had_saving');
      const successCount  = parseInt(localStorage.getItem('arvo_successful_count') ?? '0');
      if (hadSaving || successCount >= FREE_SUCCESSFUL) {
        setGateReason('quota');
        setGateOpen(true);
        return;
      }
    }
    if (overrideEmail) {
      localStorage.setItem('arvo_gate_passed', '1');
    }
    setError(null);
    setResult(null);
    setGateOpen(false);
    setPhase('uploading');

    let t1, t2;
    try {
      const pdfBase64    = await fileToBase64(file);
      const fingerprint  = await getBrowserFingerprint();
      const bypass = sessionStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_gate_passed') ?? undefined;

      // Hämta alltid ett färskt token precis innan submit (undviker 1h-expiry)
      let freshToken = apiToken;
      try {
        const tr = await fetch('/api/token', { method: 'POST' });
        const td = await tr.json();
        freshToken = td.token ?? apiToken;
        setApiToken(freshToken);
      } catch { /* använd befintligt token */ }

      setPhase('extract');
      t1 = setTimeout(() => setPhase('categorize'), 6000);
      t2 = setTimeout(() => setPhase('recommend'),  14000);

      const res = await fetch('/api/test-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          industry,
          employees: Number(employees),
          revenue: revenue === '' ? null : Number(revenue),
          token: freshToken,
          fingerprint,
          bypass: bypass || undefined,
          email: overrideEmail || undefined,
        }),
      });

      clearTimeout(t1);
      clearTimeout(t2);

      const data = await res.json().catch(() => ({}));

      // Sparande-kvot nådd — visa resultatet men öppna konverterings-CTA direkt
      if (data.gate && data.gateType === 'saving_limit') {
        setPhase('done');
        setResult(data);
        setGateReason('saving_limit');
        setGateOpen(true);
        return;
      }

      // E-postgate aktiverad av servern (legacy fingerprint-gate)
      if (data.gate) {
        setPhase(null);
        setGateOpen(true);
        return;
      }

      // Pipeline-timeout — visa vänlig retry-uppmaning
      if (data.timeout) {
        setPhase(null);
        setError('Analysen tog lite för lång tid just nu. Vänta ett ögonblick och försök igen — det brukar gå snabbare vid andra försöket.');
        return;
      }

      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Servern returnerade ${res.status}`);
      }

      setPhase('done');
      setResult(data);

      if (data.route === 'auto') {
        const count = parseInt(localStorage.getItem('arvo_successful_count') ?? '0') + 1;
        localStorage.setItem('arvo_successful_count', String(count));
        if (data.recommendation?.netSaving > 0) {
          localStorage.setItem('arvo_had_saving', '1');
          const stillUnlocked = !!(sessionStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_gate_passed'));
          if (!stillUnlocked) {
            setGateReason('saving');
            setGateOpen(true);
          }
        }
      }
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      setPhase(null);
      setError(err.message || 'Något gick fel. Försök igen.');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await runAnalysis();
  };

  const submitGate = async (e) => {
    e.preventDefault();
    if (!gateEmail || gateSubmitting) return;
    setGateSubmitting(true);
    const addr = gateEmail.trim().toLowerCase();
    localStorage.setItem('arvo_gate_email', addr);

    if (gateReason === 'saving') {
      try { if (result) await sendAnalysisMail(addr); } catch { /* non-fatal */ }
      setGateOpen(false);
      setGateSubmitting(false);
    } else {
      setGateSubmitting(false);
      window.location.href = '/connect';
    }
  };

  const submitQuoteLead = (e) => {
    e.preventDefault();
    if (!quoteEmail || !quoteMandateAccepted || quoteState !== 'idle') return;
    setQuoteState('sent');
    setTimeout(() => {
      if (!resultRef.current) return;
      const top = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 50);
    fetch('/api/quote-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactEmail:     quoteEmail.trim().toLowerCase(),
        contactName:      quoteName.trim() || undefined,
        contactCompany:   quoteCompany.trim() || undefined,
        mandateAccepted:  true,
        extractedData:    result?.extracted,
        categorized:      result?.categorized,
      }),
    }).catch((err) => console.error('[quote-request]', err));
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setPhase(null);
    setError(null);
    setEmail('');
    setEmailState('idle');
    setModalOpen(false);
    setModalView('fortnox');
    setModalEmail('');
    setModalEmailState('idle');
    setGateOpen(false);
    setGateEmail('');
    setGateSubmitting(false);
    setQuoteName('');
    setQuoteCompany('');
    setQuoteEmail('');
    setQuoteMandateAccepted(false);
    setQuoteState('idle');
    setDownloadModalOpen(false);
    setDownloadEmail('');
    setDownloadEmailState('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sendAnalysisMail = async (emailAddr) => {
    const res = await fetch('/api/send-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailAddr, result }),
    });
    if (!res.ok) throw new Error('send-analysis ' + res.status);
  };

  const submitDownload = async (e) => {
    e.preventDefault();
    if (!downloadEmail || downloadEmailState !== 'idle') return;
    setDownloadEmailState('submitting');
    try {
      await sendAnalysisMail(downloadEmail);
      setDownloadEmailState('sent');
    } catch {
      setDownloadEmailState('error');
    }
  };

  const sendConfirmationMail = async (emailAddr) => {
    const res = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailAddr, result }),
    });
    if (!res.ok) throw new Error('send-confirmation ' + res.status);
  };

  const submitModalEmail = async (e) => {
    e.preventDefault();
    if (!modalEmail || modalEmailState !== 'idle') return;
    setModalEmailState('submitting');
    try {
      await Promise.all([
        sendConfirmationMail(modalEmail),
        sendAnalysisMail(modalEmail),
      ]);
      setModalEmailState('sent');
    } catch {
      setModalEmailState('idle');
    }
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!email || emailState !== 'idle') return;
    setEmailState('submitting');
    try {
      await sendAnalysisMail(email);
      setEmailState('sent');
    } catch {
      setEmailState('error');
    }
  };

  const phaseState = (id) => {
    if (!phase) return 'pending';
    if (phase === 'done') return 'done';
    const order = ['uploading', 'extract', 'categorize', 'recommend'];
    const currentIdx = order.indexOf(phase);
    const myIdx = order.indexOf(id);
    if (myIdx < currentIdx) return 'done';
    if (myIdx === currentIdx) return 'active';
    return 'pending';
  };

  const loading = phase && phase !== 'done';

  const isOptimize = result?.recommendation?.recommendationType === 'optimize'
    && (result?.recommendation?.optimizationSaving ?? 0) > 0;
  const optSaving = result?.recommendation?.optimizationSaving ?? 0;
  const optArvoFee = isOptimize ? Math.round(optSaving * 0.20) : 0;
  const optNet = isOptimize ? optSaving - optArvoFee : 0;

  const diagAnnual  = result?.extracted?.annualCost ?? 0;
  const diagSugg    = result?.recommendation?.suggestedAnnualCost ?? 0;
  const diagOvPct   = diagAnnual > 0 && diagSugg > 0 && diagSugg < diagAnnual
    ? Math.round((diagAnnual - diagSugg) / diagAnnual * 100)
    : 0;
  const _clickPriceScore = result?.recommendation?.clickRateAnalysis?.priceGapScore ?? null;
  const diagScoreRaw = _clickPriceScore ?? Math.max(5, Math.round(100 - diagOvPct * 1.5));
  const diagScore    = _clickPriceScore != null
    ? _clickPriceScore
    : (!result?.recommendation?.shouldSwitch ? Math.min(diagScoreRaw, 85) : diagScoreRaw);
  const diagC       = diagScore < 45
    ? { dot: '#DC2626', num: '#DC2626', label: 'Kritisk',         labelClr: '#991B1B', txt: '#7F1D1D', bg: '#FEF2F2', border: 'rgba(220,38,38,.18)' }
    : diagScore < 65
    ? { dot: '#D97706', num: '#D97706', label: 'Suboptimerat',    labelClr: '#92400E', txt: '#78350F', bg: '#FFFBEB', border: 'rgba(217,119,6,.18)' }
    : diagScore < 80
    ? { dot: '#16A34A', num: '#16A34A', label: 'Marknadsmässigt', labelClr: '#166534', txt: '#14532D', bg: '#F0FDF4', border: 'rgba(22,163,74,.18)' }
    : { dot: '#1B7A6E', num: '#1B7A6E', label: 'Optimalt',        labelClr: '#0E4F47', txt: '#0E4F47', bg: '#DCEEEA', border: 'rgba(27,122,110,.18)' };
  const monitoringDatePast = result?.monitoringDate && new Date(result.monitoringDate) < new Date();
  const daysUntilEnd = result?.servicePeriodEnd
    ? Math.ceil((new Date(result.servicePeriodEnd) - new Date()) / (1000 * 60 * 60 * 24))
    : null;
  const diagInsight = result?.route === 'monitoring'
    ? monitoringDatePast
      ? `Avtalslåset lossnar snart${daysUntilEnd != null ? ` — ${daysUntilEnd} dagar kvar` : ''}. Arvo förbereder omförhandling.`
      : 'Avtalet är bevakat — Arvo påminner er inför kommande förnyelse.'
    : diagScore < 45
      ? 'Ni betalar markant mer än marknadspriset — stor besparingspotential.'
      : diagScore < 80 ? 'Besparingspotential finns — ni betalar något över marknadssnitt.'
      : 'Ni har ett kostnadsoptimerat leverantörsnätverk.';

  const GAUGE_R = 26;
  const GAUGE_C = 2 * Math.PI * GAUGE_R;
  const gaugeDash = (diagScore / 100) * GAUGE_C;

  const animatedNet = useCountUp(result?.recommendation?.netSaving ?? 0);

  const _secSaving   = result?.recommendation?.secondarySaving ?? null;
  const _primGross   = _secSaving
    ? (result?.recommendation?.grossSaving ?? 0) - _secSaving.grossSaving
    : null;
  const _secLabel = _secSaving
    ? _secSaving.category === 'bredband'
      ? `Bredband${_secSaving.speedMbit ? ` ${_secSaving.speedMbit} Mbit` : ''}`
      : `Mobil${_secSaving.seatCount ? ` (${_secSaving.seatCount} st)` : ''}`
    : null;

  return (
    <Page>
      <Nav variant="public" />

      <Hero>
        <Eyebrow><span className="dot" /> Testa själv · Gratis · Resultat direkt</Eyebrow>
        <Headline>Ladda upp <em>en</em> leverantörsfaktura — få svar direkt.</Headline>
        <Lede>
          Vi visar exakt vad du betalar, hur du ligger mot branschsnittet och vad du kan
          spara om du byter. Inget Fortnox-konto behövs, ingen signering, ingen kostnad.
        </Lede>
      </Hero>

      <Body>
        {!result && (
          <Card>
            <form onSubmit={onSubmit}>
              <Dropzone
                $active={dragActive}
                $hasFile={!!file}
                onClick={() => fileInputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => validateAndSetFile(e.target.files?.[0])}
                />
                <div className="icon">
                  <Icon name={file ? 'check' : 'arrow'} size={26} stroke={2} />
                </div>
                {file ? (
                  <>
                    <strong className="primary">PDF vald</strong>
                    <span className="filename">{file.name} · {(file.size / 1024).toFixed(0)} kB</span>
                  </>
                ) : (
                  <>
                    <strong className="primary">Dra hit din faktura — eller klicka för att välja</strong>
                    <span className="secondary">PDF, max 3 MB. Vi sparar inte filen.</span>
                  </>
                )}
              </Dropzone>

              <FormRow>
                <Field>
                  <span className="label">Bransch</span>
                  <span className="hint">Vi anpassar jämförelsetalen mot bolag som liknar er.</span>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {Object.entries(INDUSTRY_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                </Field>
                <Field>
                  <span className="label">Antal anställda</span>
                  <span className="hint">Påverkar vilket prisintervall vi jämför mot.</span>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                  />
                </Field>
              </FormRow>

              {error && <ErrorBox>{error}</ErrorBox>}

              <SubmitRow>
                <Button
                  type="submit"
                  $variant="gradient"
                  $size="lg"
                  $full
                  disabled={loading || !file}
                >
                  {loading ? (
                    <>
                      <Spinner /> Analyserar…
                    </>
                  ) : (
                    <>
                      Analysera fakturan <Icon name="arrow" size={18} />
                    </>
                  )}
                </Button>
              </SubmitRow>

              {loading && (
                <ProgressList>
                  {PHASES.map((p) => {
                    const state = phaseState(p.id);
                    return (
                      <ProgressItem key={p.id} $state={state}>
                        <div className="bullet">
                          {state === 'done'
                            ? <Icon name="check" size={14} stroke={2.5} />
                            : <span>{PHASES.findIndex((x) => x.id === p.id) + 1}</span>}
                        </div>
                        <div className="label">{p.label}</div>
                        <div className="time">
                          {state === 'done' ? '✓' : state === 'active' ? '…' : ''}
                        </div>
                      </ProgressItem>
                    );
                  })}
                </ProgressList>
              )}

              <Disclaimer>
                Genom att fortsätta godkänner du våra <Link to="/villkor">villkor</Link>{' '}
                och vår <Link to="/integritet">integritetspolicy</Link>. Fakturan analyseras
                via AI och raderas omedelbart efter analysen.
              </Disclaimer>
            </form>
          </Card>
        )}

        {result && (
          <>
          <Card ref={resultRef}>
            <ResultHead>
              <div>
                <h2>{result.extracted.supplier}</h2>
                {result.categorized && (
                  <span className="subtitle">
                    {result.reason === 'natavgift'
                      ? 'Nätavgift'
                      : (CATEGORY_LABELS[result.categorized.category] || result.categorized.category)}
                    {result.categorized.subType && result.reason !== 'natavgift' ? ` · ${result.categorized.subType}` : ''}
                  </span>
                )}
              </div>
              <Button onClick={() => setDownloadModalOpen(true)} $variant="secondary" $size="md">
                Ladda ner analys
              </Button>
            </ResultHead>

            {result.route === 'monitoring' ? (
              <>
                {diagSugg > 0 ? (
                  <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                    <div className="gauge-wrap">
                      <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                        <circle
                          cx="30" cy="30" r={GAUGE_R} fill="none"
                          stroke={diagC.dot} strokeWidth="4.5" strokeLinecap="round"
                          strokeDasharray={`${gaugeDash} ${GAUGE_C}`}
                          style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1s ease' }}
                        />
                      </svg>
                      <div className="gauge-num" style={{ color: diagC.dot }}>
                        <span className="gauge-val">{diagScore}</span>
                        <span className="gauge-denom">/100</span>
                      </div>
                    </div>
                    <div className="diag-body">
                      <div className="diag-top">
                        <span className="diag-score-label">Arvo Score</span>
                        <span className="diag-sep">·</span>
                        <span className="diag-status">
                          <Icon name="alert-circle" size={13} color={diagC.dot} stroke={2} />
                          <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                        </span>
                      </div>
                      <p className="diag-text">{diagInsight}</p>
                    </div>
                  </ScoreDiag>
                ) : (
                  <ScoreDiag style={{ '--diag-color': '#6B7280' }}>
                    <div className="gauge-wrap">
                      <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                      </svg>
                      <div className="gauge-num" style={{ color: '#9CA3AF' }}>
                        <span className="gauge-val" style={{ fontSize: 14 }}>—</span>
                      </div>
                    </div>
                    <div className="diag-body">
                      <div className="diag-top">
                        <span className="diag-score-label">Arvo Score</span>
                        <span className="diag-sep">·</span>
                        <span className="diag-status">
                          <span className="diag-label" style={{ color: '#6B7280' }}>Bevakat avtal</span>
                        </span>
                      </div>
                      <p className="diag-text">Avtalet är bevakat — Arvo påminner er inför kommande förnyelse.</p>
                    </div>
                  </ScoreDiag>
                )}
                <MonitoringBlock>
                  <div className="monitoring-kicker">
                    <span className="monitoring-dot" />
                    Bevakning aktiverad
                  </div>
                  {result.contractType === 'fixed_price' ? (
                    <>
                      <strong>Fastprisavtal — bundet t.o.m. {result.servicePeriodEnd ? new Date(result.servicePeriodEnd).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }) : result.servicePeriodEnd}.</strong>
                      <p>
                        {monitoringDatePast
                          ? `Fastprisavtal kan inte avslutas i förtid. Avtalet löper ut om ${daysUntilEnd != null ? `${daysUntilEnd} dagar` : 'kort tid'} — Arvo initierar nu förhandling om nytt avtal.`
                          : `Fastprisavtal kan inte avslutas i förtid. Arvo bevakar avtalet och påminner er ${result.monitoringDate ? new Date(result.monitoringDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }) : '3 månader'} innan slutdatum så ni hinner förhandla fram ett nytt avtal i rätt tid.`
                        }
                      </p>
                      {result.extracted?.cancellationFeeExplicit && (
                        <p style={{ marginTop: 10, paddingLeft: 12, borderLeft: '3px solid #D97706', fontSize: 13.5 }}>
                          <strong style={{ color: '#92400E' }}>⚠ Lösenavgift i avtalet:</strong>{' '}<em>"{result.extracted.cancellationFeeExplicit}"</em> — räkna på kostnaden innan ni säger upp förtida. Arvo hjälper er göra kalkylen.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <strong>{monitoringDatePast ? 'Avtalet löper ut snart — Arvo agerar nu.' : result.cancellationNoticeDays != null ? 'Avtalet är låst — vi lägger det på bevakning.' : 'Årsavtal — Arvo bevakar inför förnyelse.'}</strong>
                      <p>
                        {(() => {
                          const end  = result.servicePeriodEnd;
                          const days = result.cancellationNoticeDays;
                          const mon  = result.monitoringDate;
                          const endFmt = end ? new Date(end).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }) : null;
                          const monFmt = mon ? new Date(mon).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }) : null;
                          if (monitoringDatePast) {
                            return `Avtalet löper t.o.m. ${endFmt ?? end}${daysUntilEnd != null ? ` (${daysUntilEnd} dagar kvar)` : ''}. Arvo initierar omförhandling och säkrar bästa villkor innan förnyelse.`;
                          }
                          return days != null
                            ? `Avtalet löper t.o.m. ${endFmt ?? end}. Uppsägningstiden (${days} dagar) har redan passerat. Arvo initierar omförhandling ${monFmt ?? '90 dagar innan nästa förnyelse'}.`
                            : result.extracted?.cancellationFeeExplicit
                              ? `Avtalet löper t.o.m. ${endFmt ?? end}. Vi påminner er i ${monFmt ?? '90 dagar innan slutdatum'} — i god tid för att agera när avtalet löper ut.`
                              : `Avtalet löper t.o.m. ${endFmt ?? end}. Vi påminner er i ${monFmt ?? '90 dagar innan slutdatum'} — i god tid för att agera oavsett om avtalet förlängs automatiskt eller kräver aktiv uppsägning. Vi ser inga uppsägningstider på fakturan; fråga leverantören om ni vill veta om förtidslösen är möjlig.`;
                        })()}
                      </p>
                      {result.extracted?.cancellationFeeExplicit && (
                        <p style={{ marginTop: 10, paddingLeft: 12, borderLeft: '3px solid #D97706', fontSize: 13.5 }}>
                          <strong style={{ color: '#92400E' }}>⚠ Lösenavgift i avtalet:</strong>{' '}<em>"{result.extracted.cancellationFeeExplicit}"</em> — räkna på kostnaden innan ni säger upp förtida. Arvo hjälper er göra kalkylen.
                        </p>
                      )}
                    </>
                  )}
                </MonitoringBlock>
                <KV>
                  <div>
                    <dt>Du betalar idag{result.categorized?.category === 'el' ? ' (energidel)' : ''}</dt>
                    <dd>{formatKr(result.extracted.annualCost)} / år</dd>
                  </div>
                  <div>
                    <dt>Fakturadatum</dt>
                    <dd>{result.extracted.date}</dd>
                  </div>
                  <div>
                    <dt>Fakturerat denna period (ex moms)</dt>
                    <dd>{formatKr(result.extracted.amount)}</dd>
                  </div>
                  {result.extracted.servicePeriodEnd && (
                    <div>
                      <dt>Avtalstid t.o.m.</dt>
                      <dd>{new Date(result.extracted.servicePeriodEnd).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    </div>
                  )}
                  {result.monitoringDate && (
                    <div>
                      <dt>{monitoringDatePast ? 'Bevakning' : 'Arvo påminner er'}</dt>
                      <dd>{monitoringDatePast
                        ? (daysUntilEnd != null ? `Aktiv — avtal löper ut om ${daysUntilEnd} dagar` : 'Aktiv')
                        : new Date(result.monitoringDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })
                      }</dd>
                    </div>
                  )}
                </KV>
                {result.categorized?.reasoning && (
                  <Reasoning>
                    <span className="kicker">Vad analysen visar</span>
                    <p>
                      {result.categorized.normalizedSupplier || result.extracted?.supplier} fakturerar{' '}
                      {formatKr(result.extracted?.annualCost)} per år för{' '}
                      {result.categorized.category === 'el' ? 'el (energidel)'
                        : result.categorized.category === 'mobil' ? 'mobilabonnemang'
                        : result.categorized.category === 'bredband' ? 'bredband'
                        : result.categorized.category?.startsWith('saas') ? 'programvarulicenser'
                        : result.categorized.category === 'skrivarleasing' ? 'skrivarlösning'
                        : 'denna tjänst'}.
                      {' '}Avtalet är bevakat — Arvo tar kontakt{' '}
                      {daysUntilEnd != null && daysUntilEnd <= 90
                        ? 'nu inför förestående förnyelse'
                        : result.monitoringDate && !monitoringDatePast
                          ? `från ${new Date(result.monitoringDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })}`
                          : 'inför avtalets förnyelse'
                      }{' '}och säkrar bästa villkor utan att ni behöver lägga tid på det.
                    </p>
                    {result.potentialSavingNote && (
                      <p style={{ marginTop: 10 }}><strong>Potentiell besparing vid avtalets slut:</strong> {result.potentialSavingNote}</p>
                    )}
                  </Reasoning>
                )}
              </>
            ) : result.route === 'unsupported' ? (
              <NoSwitchBlock>
                {result.reason === 'natavgift' ? (
                  <>
                    <strong>Nätavgift — reglerat monopol, kan inte förhandlas.</strong>
                    <p>
                      Denna faktura är från er lokala nätägare ({result.extracted?.supplier ?? 'nätbolaget'}) och
                      avser elnätets distributionskostnad. Nätavgiften bestäms av Energimarknadsinspektionen
                      och är geografiskt bunden — den kan inte påverkas genom ett elleverantörsbyte.
                    </p>
                    <p>
                      Ladda upp er <strong>elhandelsfaktura</strong> (från er elleverantör) för att se
                      om ni betalar rätt pris för själva elen.
                    </p>
                  </>
                ) : result.reason === 'credit_note' ? (
                  <>
                    <strong>Kreditnota — ingen analys möjlig.</strong>
                    <p>
                      Filen verkar vara en kreditnota med negativt belopp. Ladda upp den ordinarie
                      fakturan för en korrekt analys.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>Utanför analysräckvidden.</strong>
                    <p>
                      Denna faktura avser en tjänst vi inte optimerar (t.ex. juridik, redovisning,
                      bemanning eller myndighetsavgifter). Koppla Fortnox / Visma för att analysera era
                      övriga leverantörer.
                    </p>
                  </>
                )}
              </NoSwitchBlock>
            ) : result.route === 'review_queue' ? (
              <NoSwitchBlock>
                {result.reason === 'volume_data_required' ? (
                  <>
                    <strong>Kräver offert — våra experter kikar på detta.</strong>
                    <p>
                      {result.volumeDataNote ||
                        'Kostnaden för denna kategori styrs av specifika volymer och specifikationer, inte antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.'}
                    </p>
                    {result.creditExpiryMonths != null && (
                      <CreditAlert>
                        <strong>
                          Era startup-krediter räcker ca {result.creditExpiryMonths} {result.creditExpiryMonths === 1 ? 'månad' : 'månader'} till
                        </strong>
                        <p>
                          Ni förbrukar {result.startupCreditCurrency} {result.startupCreditMonthlyBurn?.toLocaleString('sv-SE')}/mån men
                          betalar ingenting tack vare kvarvarande kredit ({result.startupCreditCurrency} {result.startupCreditBalance?.toLocaleString('sv-SE')}).
                          Nu är rätt tid att planera ert molnavtal — vi hjälper er att förhandla rätt pris innan fakturorna börjar landa.
                        </p>
                      </CreditAlert>
                    )}
                  </>
                ) : result.reason === 'foreign_currency' ? (
                  <>
                    <strong>Fakturan är i {result.currency} — kontakta oss.</strong>
                    <p>
                      Vi stödjer SEK och EUR. För övriga valutor, kontakta oss så hjälper vi er manuellt.
                    </p>
                  </>
                ) : result.reason === 'no_benchmark' ? (
                  <>
                    <strong>Utanför vår nuvarande täckning.</strong>
                    <p>
                      Vi har ännu inte benchmarkdata för denna leverantörskategori.
                      Vi noterar fakturan och återkommer när vi kan göra en fullständig analys.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>Fakturan behöver djupare analys.</strong>
                    <p>
                      Vår algoritm är inte tillräckligt säker på klassificeringen för att
                      visa automatiska besparingssiffror. Koppla Fortnox / Visma för en komplett,
                      felfri analys av hela er leverantörsreskontra.
                    </p>
                  </>
                )}
              </NoSwitchBlock>
            ) : result.recommendation?.requiresQuote ? (
              <>
                {result.recommendation?.clickRateAnalysis && (
                  <>
                    <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                      <div className="gauge-wrap">
                        <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                          <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                          <circle
                            cx="30" cy="30" r={GAUGE_R} fill="none"
                            stroke={diagC.dot} strokeWidth="4.5" strokeLinecap="round"
                            strokeDasharray={`${gaugeDash} ${GAUGE_C}`}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1s ease' }}
                          />
                        </svg>
                        <div className="gauge-num" style={{ color: diagC.dot }}>
                          <span className="gauge-val">{diagScore}</span>
                          <span className="gauge-denom">/100</span>
                        </div>
                      </div>
                      <div className="diag-body">
                        <div className="diag-top">
                          <span className="diag-score-label">Arvo Score</span>
                          <span className="diag-sep">·</span>
                          <span className="diag-status">
                            <Icon name="alert-circle" size={13} color={diagC.dot} stroke={2} />
                            <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                          </span>
                        </div>
                        <p className="diag-text">{diagInsight}</p>
                      </div>
                    </ScoreDiag>
                    <Reasoning>
                      <span className="kicker">Vad analysen visar</span>
                      <p>{result.recommendation.reasoning}</p>
                    </Reasoning>
                  </>
                )}
                <NoSwitchBlock>
                  {result.recommendation?.clickRateAnalysis?.estimatedAnnualSavingsGross > 0 ? (
                    <div className="estimate-banner">
                      <span className="est-kicker">Uppskattad nettobesparing på klickpriser</span>
                      <span className="est-amount">
                        ca {formatNum(Math.round(result.recommendation.clickRateAnalysis.estimatedAnnualSavingsGross * 0.80))}&nbsp;kr/år
                      </span>
                      <span className="est-note">
                        Baserat på er faktiska klickkostnad × 12 månader · bekräftas med er faktiska printvolym
                      </span>
                    </div>
                  ) : (
                    <strong>
                      {result.recommendation?.clickRateAnalysis
                        ? 'Beräkna exakt besparing per år'
                        : 'Kräver offert — volymdata behövs.'}
                    </strong>
                  )}
                  <p>
                    {result.recommendation?.clickRateAnalysis
                      ? 'Klickpriset är fastslaget. Fyll i nedan så beräknar Arvo det exakta beloppet inklusive maskinleasing.'
                      : result.recommendation.reasoning}
                  </p>
                  <QuoteLeadForm onSubmit={submitQuoteLead}>
                    {quoteState === 'sent' ? (
                      <div className="qlf-sent">
                        <Icon name="check" size={16} stroke={2.5} />
                        Tack! Bekräftelse är skickad till din e-post. Vi återkommer med offerter inom 1–2 arbetsdagar.
                      </div>
                    ) : (
                      <>
                        <div className="qlf-fields">
                          <input
                            type="text"
                            placeholder="Ditt namn"
                            value={quoteName}
                            onChange={(e) => setQuoteName(e.target.value)}
                          />
                          <input
                            type="text"
                            placeholder="Företag"
                            value={quoteCompany}
                            onChange={(e) => setQuoteCompany(e.target.value)}
                          />
                          <input
                            className="qlf-full"
                            type="email"
                            placeholder="Din e-post (dit skickar vi offertsammanställningen)"
                            required
                            value={quoteEmail}
                            onChange={(e) => setQuoteEmail(e.target.value)}
                          />
                        </div>
                        <label className="qlf-mandate">
                          <input
                            type="checkbox"
                            checked={quoteMandateAccepted}
                            onChange={(e) => setQuoteMandateAccepted(e.target.checked)}
                          />
                          <span>
                            Jag ger <em>Arvo Flow</em> fullmakt att begära in, sammanställa och
                            presentera offerter från leverantörer å mitt bolags vägnar.
                          </span>
                        </label>
                        <Button
                          type="submit"
                          $variant="gradient"
                          $size="sm"
                          disabled={quoteState === 'submitting' || !quoteMandateAccepted}
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          {quoteState === 'submitting' ? 'Startar...' : 'Starta offertprocessen →'}
                        </Button>
                        <p className="qlf-zero-risk">
                          Ni betalar ingenting om vi inte hittar besparingar — 20&nbsp;% av identifierad besparing.
                        </p>
                      </>
                    )}
                  </QuoteLeadForm>
                </NoSwitchBlock>
              </>
            ) : isOptimize ? (
              <>
                <SavingsBlock>
                  <span className="kicker">Dold kostnad hittad</span>
                  <span className="amount">+{formatKr(optNet)}</span>
                  <span className="unit">
                    Du betalar {formatNum(optSaving)} kr/år för en tjänst som redan ingår i er licens
                    {' '}· Arvos besparingsarvode {formatKr(optArvoFee)} (20 %)
                  </span>
                </SavingsBlock>
                <PartnerBlock>
                  <div className="left">
                    <span className="verified-badge">
                      <Icon name="check" size={12} stroke={2.5} />
                    </span>
                    <div>
                      <p className="partner-name">Avveckling av dubblad kostnad</p>
                      <p className="price-label">Arvo sköter hela avvecklingen åt dig</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    $variant="gradient"
                    $size="sm"
                    onClick={() => setModalOpen(true)}
                  >
                    Säkra besparingen <Icon name="arrow" size={14} />
                  </Button>
                </PartnerBlock>
              </>
            ) : result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 ? (
              <>
                <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                  <div className="gauge-wrap">
                    <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                      <circle
                        cx="30" cy="30" r={GAUGE_R} fill="none"
                        stroke={diagC.dot} strokeWidth="4.5" strokeLinecap="round"
                        strokeDasharray={`${gaugeDash} ${GAUGE_C}`}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1s ease' }}
                      />
                    </svg>
                    <div className="gauge-num" style={{ color: diagC.dot }}>
                      <span className="gauge-val">{diagScore}</span>
                      <span className="gauge-denom">/100</span>
                    </div>
                  </div>
                  <div className="diag-body">
                    <div className="diag-top">
                      <span className="diag-score-label">Arvo Score</span>
                      <span className="diag-sep">·</span>
                      <span className="diag-status">
                        <Icon name="alert-circle" size={13} color={diagC.dot} stroke={2} />
                        <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                      </span>
                    </div>
                    <p className="diag-text">{diagInsight}</p>
                  </div>
                </ScoreDiag>
                {(() => {
                  const isRealPrice = REAL_PRICE_CATEGORIES.has(result.categorized.category);
                  const isLicensePending = result.categorized.licensePending;
                  const partnerLabel = CATEGORY_PARTNER_LABEL[result.categorized.category] ?? 'Arvo-verifierad Partner';
                  return (
                    <>
                      <SavingsBlock>
                        <span className="kicker">
                          {isLicensePending ? 'Möjlig årlig besparing' : 'Din nettobesparing'}
                        </span>
                        <span className="amount">+{formatKr(animatedNet)}</span>
                        <span className="unit">
                          {isLicensePending
                            ? 'Försäkring kräver FI-licens — vi byter inte själva ännu, men visar gapet.'
                            : isRealPrice
                              ? (
                                <>
                                  {formatNum(result.extracted.annualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år hos <strong>{result.recommendation.suggestedSupplier}</strong>
                                  {' '}· Arvos besparingsarvode {formatKr(result.recommendation.arvoFee)} (20 %)
                                </>
                              )
                              : (
                                <>
                                  {formatNum(result.extracted.annualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år (Arvos kalkylerade riktpris)
                                  {' '}· Arvos besparingsarvode {formatKr(result.recommendation.arvoFee)} (20 %)
                                </>
                              )}
                        </span>
                      </SavingsBlock>
                      {!isLicensePending && (() => {
                        const cat = result?.categorized?.category;
                        const isRealPublic = cat === 'mobil' || cat === 'bredband' || cat === 'saas-productivity';
                        return (
                          <PriceNote $compact>
                            {isRealPublic
                              ? 'Priset baseras på verifierade offentliga listpriser hos ledande leverantörer. Arvo förhandlar ytterligare rabatter vid ett faktiskt leverantörsbyte.'
                              : 'Detta pris baseras på Arvos samlade databas av förhandlade volymrabatter, vilket ger dig tillgång till prisnivåer som ligger utanför leverantörernas ordinarie listpriser.'}
                          </PriceNote>
                        );
                      })()}
                      {result.recommendation.suggestedAnnualCost && !isLicensePending && (
                        <PartnerBlock>
                          <div className="left">
                            <span className="verified-badge">
                              <Icon name="check" size={12} stroke={2.5} />
                            </span>
                            <div>
                              <p className="partner-name">
                                {isRealPrice
                                  ? result.recommendation.suggestedSupplier
                                  : partnerLabel}
                              </p>
                              <p className="price-label">
                                {isRealPrice ? 'Verifierat marknadspris' : 'Arvos kalkylerade riktpris'}
                              </p>
                            </div>
                          </div>
                          <div className="price-offer">
                            <span className="offer-price">{formatKr(result.recommendation.suggestedAnnualCost)}/år</span>
                            <span className="offer-label">↓ från {formatKr(result.extracted.annualCost)}</span>
                          </div>
                          <Button
                            type="button"
                            $variant="gradient"
                            $size="sm"
                            onClick={() => setModalOpen(true)}
                          >
                            {isRealPrice ? 'Aktivera bytet' : 'Säkra besparingen'} <Icon name="arrow" size={14} />
                          </Button>
                        </PartnerBlock>
                      )}
                    </>
                  );
                })()}
              </>
            ) : result.categorized?.category === 'uncategorized' ? (
              <NoSwitchBlock>
                <strong>Kategorin är under analys.</strong>
                <p>Koppla Fortnox / Visma så mappar vi era volymer mot marknadens bästa priser direkt.</p>
              </NoSwitchBlock>
            ) : (
              <>
                <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                  <div className="gauge-wrap">
                    <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                      <circle
                        cx="30" cy="30" r={GAUGE_R} fill="none"
                        stroke={diagC.dot} strokeWidth="4.5" strokeLinecap="round"
                        strokeDasharray={`${gaugeDash} ${GAUGE_C}`}
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1s ease' }}
                      />
                    </svg>
                    <div className="gauge-num" style={{ color: diagC.dot }}>
                      <span className="gauge-val">{diagScore}</span>
                      <span className="gauge-denom">/100</span>
                    </div>
                  </div>
                  <div className="diag-body">
                    <div className="diag-top">
                      <span className="diag-score-label">Arvo Score</span>
                      <span className="diag-sep">·</span>
                      <span className="diag-status">
                        <Icon name="check" size={13} color={diagC.dot} stroke={2} />
                        <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                      </span>
                    </div>
                    <p className="diag-text">{diagInsight}</p>
                  </div>
                </ScoreDiag>
                {result.recommendation?.reasoning && (
                  <Reasoning>
                    <span className="kicker">Vad analysen visar</span>
                    <p>{result.recommendation.reasoning}</p>
                  </Reasoning>
                )}
                {result.recommendation?.monitoringNote && (
                  <NoSwitchBlock style={{ marginTop: 0 }}>
                    {result.recommendation.monitoringNote}
                  </NoSwitchBlock>
                )}
              </>
            )}

            {result.extracted?.potentialMixedCategories && (
              <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14, lineHeight: 1.5, fontStyle: 'italic' }}>
                {_secSaving ? (
                  <>
                    Kombinerad faktura —{' '}
                    {CATEGORY_LABELS[result.categorized?.category] || result.categorized?.category}
                    {result.extracted?.primaryComponentMonthly != null
                      ? ` (${formatKr(result.extracted.primaryComponentMonthly * 12)}/år)`
                      : ''}
                    {' '}+ {_secLabel} ({formatKr(_secSaving.currentAnnual)}/år).
                    {' '}Besparing:{' '}
                    {CATEGORY_LABELS[result.categorized?.category] || result.categorized?.category}
                    {' '}−{formatKr(_primGross)}/år{' '}|{' '}
                    {_secLabel} −{formatKr(_secSaving.grossSaving)}/år.
                  </>
                ) : (
                  <>
                    Kombinerad faktura — analysen avser{' '}
                    {CATEGORY_LABELS[result.categorized?.category] || result.categorized?.category}
                    {result.extracted?.primaryComponentMonthly != null
                      ? ` (${formatKr(result.extracted.primaryComponentMonthly * 12)}/år)`
                      : ''}
                    {(result.recommendation?.nonPrimaryAnnual ?? 0) > 0
                      ? `. Övriga tjänster (${formatKr(result.recommendation.nonPrimaryAnnual)}/år) analyseras via Fortnox/Visma.`
                      : '.'}
                  </>
                )}
              </p>
            )}

            {result.extracted?.annualCost != null && result.route !== 'monitoring' && result.route !== 'unsupported' && <KV>
              <div>
                <dt>Du betalar idag</dt>
                <dd>
                  {formatKr(result.extracted.annualCost)} / år
                  {result.extracted.variableCharges > 0 && (
                    <small>Varav fasta abonnemang. Exkl. rörliga avgifter ({formatKr(result.extracted.variableCharges)} denna period).</small>
                  )}
                </dd>
              </div>
              <div>
                <dt>Fakturadatum</dt>
                <dd>{result.extracted.date}</dd>
              </div>
              <div>
                <dt>Fakturerat denna period (ex moms)</dt>
                <dd>
                  {formatKr(result.extracted.amount)}
                  {result.extracted.oneTimeFees > 0 && (
                    <small>Inkl. {formatKr(result.extracted.oneTimeFees)} {result.extracted.elSkatterKr > 0 ? 'lagstadgade avgifter' : 'engångskostnader'} — ingår ej i årsberäkningen ovan.</small>
                  )}
                </dd>
              </div>
              <div>
                <dt>Återkommande</dt>
                <dd>{result.extracted.recurring ? 'Ja (abonnemang / premie)' : 'Nej'}</dd>
              </div>
              {result.extracted.originalCurrency === 'EUR' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <dt>Valutakonvertering</dt>
                  <dd>
                    <small>
                      Fakturan är i EUR — konverterad till SEK med kursen {result.extracted.fxRate?.toFixed(2)} SEK/EUR
                      {result.extracted.fxSource && result.extracted.fxSource !== 'fallback'
                        ? ` (Riksbanken/ECB ${result.extracted.fxDate ?? ''})`
                        : ' (fallback-kurs)'}.
                      Alla belopp ovan är i SEK.
                    </small>
                  </dd>
                </div>
              )}
              {(() => {
                const hw = detectHardwareInstallments(result.extracted?.lineItems);
                if (!hw.length) return null;
                const totalRemaining = hw.reduce((s, h) => s + h.remainingCost, 0);
                return (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <CreditAlert>
                      <strong>⚠ Aktiv hårdvaruleasing — kontrollera innan ni byter</strong>
                      <p>
                        {hw.map((h, i) => (
                          <span key={i} style={{ display: 'block', marginBottom: hw.length > 1 && i < hw.length - 1 ? '6px' : 0 }}>
                            {h.description} — {h.monthsRemaining} månader kvar ({formatNum(h.monthlyCost)} kr/mån = <strong>{formatNum(h.remainingCost)} kr totalt</strong>)
                          </span>
                        ))}
                        {hw.length > 1 && (
                          <span style={{ display: 'block', marginTop: '6px', fontWeight: 700 }}>
                            Totalt kvar att betala: {formatNum(totalRemaining)} kr
                          </span>
                        )}
                        {' '}Kontrollera med {result.extracted?.supplier} om delbetalningsplanen löper vidare vid leverantörsbyte, eller om förtidslösen krävs.
                      </p>
                    </CreditAlert>
                  </div>
                );
              })()}
              {result.extracted.elUncertaintyNote && (
                <div>
                  <dt>Årsuppskattning</dt>
                  <dd>
                    <small>{result.extracted.elUncertaintyNote}</small>
                  </dd>
                </div>
              )}
              {result.extracted.elSkatterKr > 0 && (
                <div>
                  <dt>Skatter &amp; lagstadgade avgifter</dt>
                  <dd>
                    {formatKr(result.extracted.elSkatterKr)}
                    <small>Energiskatt, elcertifikat m.m. — ej förhandlingsbara, ingår ej i besparingskalkylen.</small>
                  </dd>
                </div>
              )}
              {result.extracted.elNatavgiftAnnual > 0 && (
                <div>
                  <dt>Nätavgift (ej valbar)</dt>
                  <dd>
                    {formatKr(result.extracted.elNatavgiftAnnual)} / år
                    <small>Elnätsavgiften bestäms av din regionala nätoperatör och kan inte bytas via elleverantörsbyte — ingår ej i besparingskalkylen.</small>
                  </dd>
                </div>
              )}
              {result.extracted.variableCharges > 0 && (
                <div>
                  <dt>Rörliga avgifter denna period</dt>
                  <dd>
                    {formatKr(result.extracted.variableCharges)}
                    <small>
                      {result.categorized?.category === 'el'
                        ? 'Rörliga energikostnader (spotpris, nätavgift) — ej inkluderat i årsberäkningen.'
                        : result.categorized?.category === 'skrivarleasing'
                          ? 'Klickkostnader per utskrift (volymbaserat) — ej inkluderat i årsberäkningen.'
                          : result.categorized?.category === 'kortterminal'
                            ? 'Transaktionsavgifter och volymbaserade procentavgifter — ej inkluderat i årsberäkningen.'
                            : result.categorized?.category === 'mobil'
                              ? 'Roaming, övertrafik m.m. — ej inkluderat i årsberäkningen.'
                              : result.categorized?.category === 'bredband'
                                ? 'Datatrafik och överskottsavgifter — ej inkluderat i årsberäkningen.'
                                : 'Rörliga avgifter denna period — ej inkluderat i årsberäkningen.'}
                    </small>
                  </dd>
                </div>
              )}
              {result.categorized?.category === 'saas-productivity' && result.extracted?.licenseType && (
                <div>
                  <dt>Licensplan</dt>
                  <dd>
                    {result.extracted.licenseType}
                    {result.extracted.billingCycleType === 'monthly' && (
                      <span style={{ marginLeft: '6px', fontSize: '11px', color: '#A8761A', fontWeight: 600 }}>
                        Månadsvis
                      </span>
                    )}
                    {result.extracted.billingCycleType === 'annual' && (
                      <span style={{ marginLeft: '6px', fontSize: '11px', color: '#1B7A6E', fontWeight: 600 }}>
                        Årsavtal
                      </span>
                    )}
                  </dd>
                </div>
              )}
              {result.categorized?.category === 'saas-productivity' && result.recommendation?.annualBillingSaving > 0 && (
                <div>
                  <dt>Möjlighet — årsavtal</dt>
                  <dd style={{ color: '#1B7A6E', fontWeight: 600 }}>
                    +{formatKr(result.recommendation.annualBillingSaving)}/år utan leverantörsbyte
                  </dd>
                </div>
              )}
              {result.categorized?.category === 'saas-productivity' && (() => {
                const bd = result.recommendation?.savingsBreakdown;
                if (!bd) return null;
                const rows = [
                  { label: 'Marknadsgap', value: bd.cspDiscount },
                  { label: 'Tier-optimering (advisory)', value: bd.tierOptimization },
                  { label: 'Licensrensning', value: bd.licenseCleanup },
                ].filter(r => r.value > 0);
                if (rows.length < 2) return null;
                return (
                  <>
                    <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #D5E2DC', marginTop: '4px', paddingTop: '10px' }}>
                      <dt style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#5C6E68', marginBottom: '6px' }}>Besparing per kanal</dt>
                    </div>
                    {rows.map(r => (
                      <div key={r.label}>
                        <dt>{r.label}</dt>
                        <dd style={{ color: '#1B7A6E', fontWeight: 600 }}>+{formatKr(r.value)}/år</dd>
                      </div>
                    ))}
                  </>
                );
              })()}
            </KV>}

            {result.recommendation?.reasoning && (result.recommendation?.shouldSwitch || isOptimize) && (
              <Reasoning>
                <span className="kicker">{isOptimize ? 'Vad vi hittade' : 'Vad analysen visar'}</span>
                <p>
                  {REAL_PRICE_CATEGORIES.has(result.categorized.category)
                    ? result.recommendation.reasoning
                    : redactSupplier(
                        result.recommendation.reasoning,
                        result.recommendation.suggestedSupplier,
                      )}
                </p>
              </Reasoning>
            )}

            {(() => {
              const sc = result.extracted?.seatCount;
              const emp = Number(employees);
              const overage = sc != null && sc > emp ? sc - emp : 0;
              return overage > 0 ? (
                <LicenseOverageNote>
                  <span className="kicker">Notering om licenser</span>
                  <p>
                    Kalkylen ovan bygger på att vi behåller era {sc} licenser,
                    men sänker styckpriset genom att flytta er till rätt avtalsnivå. Vi noterar dock
                    att ni enligt uppgift är {emp} anställda. Om man dessutom hade städat bort
                    dessa {overage} överflödiga licenser, hade er kostnad sänkts ytterligare.
                  </p>
                </LicenseOverageNote>
              ) : null;
            })()}

            {result.categorized?.category === 'saas-productivity' &&
             (result.recommendation?.tierOptimizationSaving ?? 0) > 0 && (
              <TierOptAccordion>
                <button
                  className="acc-trigger"
                  onClick={() => setTierOptOpen(o => !o)}
                  aria-expanded={tierOptOpen}
                >
                  <span className="acc-icon">⚡</span>
                  <span className="acc-label">Licensoptimering</span>
                  <span className="acc-amount">+{formatNum(Math.round(result.recommendation.tierOptimizationSaving * 0.80))}&nbsp;kr/år netto</span>
                  <span className={`acc-chevron${tierOptOpen ? ' open' : ''}`}>
                    <Icon name="chevron-right" size={16} stroke={2.5} />
                  </span>
                </button>
                {tierOptOpen && (
                  <div className="acc-body">
                    <p className="acc-intro">
                      Ni kan spara ytterligare{' '}
                      <strong>{formatNum(Math.round(result.recommendation.tierOptimizationSaving * 0.80))}&nbsp;kr/år netto</strong>{' '}
                      (efter Arvos arvode om {formatNum(Math.round(result.recommendation.tierOptimizationSaving * 0.20))}&nbsp;kr) genom att byta{' '}
                      från&nbsp;<strong>{TIER_DISPLAY[result.recommendation.tierOptimizationFromTier] ?? result.recommendation.tierOptimizationFromTier}</strong>{' '}
                      till&nbsp;<strong>{TIER_DISPLAY[result.recommendation.tierOptimizationToTier] ?? result.recommendation.tierOptimizationToTier}</strong>.
                    </p>
                    <div className="acc-row">
                      <span className="acc-row-icon" style={{ color: '#1B7A6E' }}>
                        <Icon name="check-circle" size={15} stroke={2.5} />
                      </span>
                      <div className="acc-row-content">
                        <div className="acc-row-head keeps">Vad ni behåller</div>
                        <p className="acc-row-text">
                          Teams, Exchange, desktop Office, SharePoint, 1&nbsp;TB&nbsp;OneDrive/användare
                        </p>
                      </div>
                    </div>
                    <div className="acc-row">
                      <span className="acc-row-icon" style={{ color: '#A8761A' }}>
                        <Icon name="alert-triangle" size={15} stroke={2.5} />
                      </span>
                      <div className="acc-row-content">
                        <div className="acc-row-head loses">Vad ni tappar</div>
                        <p className="acc-row-text">
                          Intune MDM (centraliserad enhetshantering) och Defender for Business (endpoint-säkerhet)
                        </p>
                      </div>
                    </div>
                    <p className="acc-disclaimer">
                      Passar bolag utan aktiv MDM-policy eller externt hanterat säkerhetsansvar.
                      Är ni osäkra — behåll Premium och spara ändå {formatNum(result.recommendation.netSaving ?? 0)}&nbsp;kr/år.
                    </p>
                    <div className="acc-cta">
                      <Button as={Link} to="/connect" $variant="gradient" $size="sm">
                        Inkludera i bytet →
                      </Button>
                    </div>
                  </div>
                )}
              </TierOptAccordion>
            )}

          </Card>
          <NextSteps>
            <h3>Lås upp er fullständiga Arvo Score<sup>™</sup></h3>
            <p className="sub">
              Koppla Fortnox / Visma — vi räknar ut poängen på hela er reskontra och levererar en
              komplett Leverantörsrapport automatiskt. Vi sköter varje byte från uppsägning till nytt
              avtal. Du betalar 20&nbsp;% av identifierad besparing. Inga fasta avgifter.
            </p>
            <p className="seg-count">SEGMENT — 1 AV {SEGMENTS.length} ANALYSERADE</p>
            <div className="segment-grid">
              {SEGMENTS.map((seg) => {
                const isActive = seg.cats.includes(result?.categorized?.category);
                const netSav = result?.recommendation?.netSaving;
                return (
                  <div key={seg.label} className={`segment-tile${isActive ? ' tile-active' : ''}`}>
                    {!isActive && (
                      <span className="tile-lock">
                        <Icon name="lock" size={11} stroke={1.8} />
                      </span>
                    )}
                    <div className={`tile-icon${isActive ? ' icon-active' : ''}`}>
                      <Icon name={seg.icon} size={15} stroke={isActive ? 2.5 : 1.8} />
                    </div>
                    <span className="tile-name">{seg.label}</span>
                    {isActive ? (
                      <>
                        <span className="tile-status status-active">Analyserat</span>
                        {netSav > 0 && (
                          <span className="tile-metric">–{formatNum(netSav)}&nbsp;kr/år</span>
                        )}
                      </>
                    ) : (
                      <span className="tile-status">Ej analyserat</span>
                    )}
                  </div>
                );
              })}
            </div>
            <Button as={Link} to="/connect" $variant="gradient" $size="lg">
              Koppla Fortnox / Visma →
            </Button>
          </NextSteps>
          </>
        )}
      </Body>

      <Footer />

      {gateOpen && (
        <ModalOverlay>
          <ModalCard>
            {gateReason === 'saving_limit' ? (
              <>
                <h3>Ni har hittat er besparing — nu är det dags att <em>realisera</em> den.</h3>
                <p className="sub">
                  Arvo har identifierat besparingar i era fakturor. Koppla Fortnox eller Visma
                  så analyserar vi hela er leverantörsreskontra och sköter varje byte —
                  från uppsägning till nytt avtal.
                </p>
              </>
            ) : gateReason === 'saving' ? (
              <>
                <div className="gate-saving">
                  <span className="gate-saving-label">Identifierad nettobesparing</span>
                  <span className="gate-saving-amount">+{formatKr(result?.recommendation?.netSaving ?? 0)}</span>
                  <span className="gate-saving-context">
                    {result?.extracted?.supplier}
                    {result?.categorized?.category ? ` · ${CATEGORY_LABELS[result.categorized.category] ?? result.categorized.category}` : ''}
                  </span>
                </div>
                <p className="sub">
                  Ange din e-post — vi skickar analysen direkt och en rådgivare kontaktar
                  dig för att realisera besparingen.
                </p>
              </>
            ) : (
              <>
                <h3>Redo att <em>gå vidare</em>?</h3>
                <p className="sub">
                  Koppla Fortnox / Visma för en komplett analys av hela er leverantörsreskontra
                  — Arvo sköter varje byte från uppsägning till nytt avtal.
                </p>
              </>
            )}
            <form className="modal-form" onSubmit={submitGate}>
              <input
                type="email"
                placeholder="din@epost.se"
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                required
                autoFocus
              />
              <Button
                type="submit"
                $variant="gradient"
                $size="lg"
                $full
                disabled={gateSubmitting || !gateEmail}
              >
                {gateSubmitting
                  ? <><Spinner /> Skickar…</>
                  : gateReason === 'saving'
                    ? <>Skicka analysen <Icon name="arrow" size={16} /></>
                    : <>Koppla Fortnox / Visma <Icon name="arrow" size={16} /></>}
              </Button>
              <p className="fine-print">
                {gateReason === 'saving'
                  ? 'Ingen spam. Inga bindningstider. Ni betalar 20 % av identifierad besparing.'
                  : 'Ingen spam. Inga fasta avgifter. Vi kontaktar dig bara om det finns besparingar att hämta.'}
              </p>
              {gateReason === 'saving_limit' && (
                <p className="fine-print" style={{ marginTop: '8px', fontStyle: 'italic' }}>
                  Ni har provat Arvo. Nu låter vi siffrorna tala — utan kostnad tills ni sparar.
                </p>
              )}
            </form>
          </ModalCard>
        </ModalOverlay>
      )}

      {modalOpen && result && (
        <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); setModalView('fortnox'); } }}>
          <ModalCard>
            <button className="close" onClick={() => { setModalOpen(false); setModalView('fortnox'); }} aria-label="Stäng">×</button>

            {modalEmailState === 'sent' ? (
              <div className="sent-state">
                <span className="sent-icon"><Icon name="check" size={20} stroke={2.5} /></span>
                <p className="sent-title">
                  {isOptimize ? 'Avvecklingen är igångsatt.' : 'Bytet är igångsatt.'}
                </p>
                <p className="sent-sub">
                  Bekräftelse med nästa steg skickad till {modalEmail}.
                  {' '}Du har 24 timmars ångerrätt.
                </p>
              </div>
            ) : modalView === 'fortnox' ? (
              <>
                <h3>
                  {isOptimize
                    ? <>Avveckla <em>dubbla avgiften</em></>
                    : <>Säkra dina <em>{formatNum(result.recommendation.netSaving)} kr</em></>}
                </h3>
                <p className="sub">
                  {isOptimize
                    ? `Vi hjälper er aktivera den inbyggda modulen och avveckla det separata abonnemanget — utan att ni behöver kontakta leverantören. Ni sparar ${formatNum(optNet)} kr/år netto efter Arvos fee.`
                    : REAL_PRICE_CATEGORIES.has(result.categorized.category)
                      ? <>För att vi ska kunna verkställa bytet till <strong>{result.recommendation.suggestedSupplier}</strong> – och automatiskt hitta fler onödiga kostnader – gör vi en säker och smidig synk med er Fortnox / Visma. Snabbt, tryggt och du har alltid full kontroll.</>
                      : 'För att vi ska få rätt underlag att vinna förhandlingen åt er – och automatiskt hitta fler onödiga kostnader – gör vi en säker och smidig synk med er Fortnox / Visma. Snabbt, tryggt och du har alltid full kontroll.'}
                </p>
                <div className="context-badge">
                  {CATEGORY_LABELS[result.categorized.category]} · {result.extracted.supplier}
                </div>
                <Button as={Link} to="/connect" $variant="primary" $size="lg" $full onClick={() => setModalOpen(false)}>
                  Koppla Fortnox / Visma <Icon name="arrow" size={16} />
                </Button>
                <button className="manual-link" type="button" onClick={() => setModalView('email')}>
                  Jag använder inte Fortnox, fortsätt manuellt via e-post.
                </button>
              </>
            ) : (
              <>
                <button className="back-link" type="button" onClick={() => setModalView('fortnox')}>
                  ← Tillbaka
                </button>
                <h3>
                  {isOptimize
                    ? <>Avveckla <em>dubbla avgiften</em></>
                    : <>Säkra dina <em>{formatNum(result.recommendation.netSaving)} kr</em></>}
                </h3>
                <p className="sub">
                  {isOptimize
                    ? 'Vi skickar bekräftelse och nästa steg direkt till er inkorg.'
                    : 'Vi skickar analysen och leverantörsidentiteten direkt till er inkorg.'}
                </p>
                <div className="context-badge">
                  {CATEGORY_LABELS[result.categorized.category]} · {result.extracted.supplier}
                </div>
                <form className="modal-form" onSubmit={submitModalEmail}>
                  <input
                    type="email"
                    placeholder="din@epost.se"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <Button
                    type="submit"
                    $variant="gradient"
                    $size="lg"
                    $full
                    disabled={modalEmailState === 'submitting'}
                  >
                    {modalEmailState === 'submitting' ? 'Skickar…' : <>Skicka analysen <Icon name="arrow" size={16} /></>}
                  </Button>
                  <p className="fine-print">Ingen spam. Inga fasta avgifter. Du betalar 20 % av identifierad besparing.</p>
                </form>
              </>
            )}
          </ModalCard>
        </ModalOverlay>
      )}

      {downloadModalOpen && result && (
        <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) { setDownloadModalOpen(false); setDownloadEmailState('idle'); } }}>
          <ModalCard>
            <button className="close" onClick={() => { setDownloadModalOpen(false); setDownloadEmailState('idle'); }} aria-label="Stäng">×</button>
            {downloadEmailState === 'sent' ? (
              <div className="sent-state">
                <span className="sent-icon"><Icon name="check" size={20} stroke={2.5} /></span>
                <p className="sent-title">Analysen är skickad!</p>
                <p className="sent-sub">Vi har skickat analysen till {downloadEmail}.</p>
              </div>
            ) : (
              <>
                <h3>Ladda ner er <em>analys</em></h3>
                <p className="sub">
                  Ange er e-post så skickar vi en sammanfattning av analysen direkt till er inkorg.
                </p>
                <div className="context-badge">
                  {result.extracted.supplier} · {CATEGORY_LABELS[result.categorized?.category] || ''}
                </div>
                <form className="modal-form" onSubmit={submitDownload}>
                  <input
                    type="email"
                    placeholder="din@epost.se"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <Button
                    type="submit"
                    $variant="gradient"
                    $size="lg"
                    $full
                    disabled={downloadEmailState === 'submitting'}
                  >
                    {downloadEmailState === 'submitting' ? 'Skickar…' : <>Skicka analysen <Icon name="arrow" size={16} /></>}
                  </Button>
                  {downloadEmailState === 'error' && (
                    <p className="fine-print" style={{ color: 'red' }}>Något gick fel — försök igen.</p>
                  )}
                  <p className="fine-print">Ingen spam. Vi skickar analysen direkt till din inkorg.</p>
                </form>
              </>
            )}
          </ModalCard>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default TestaFaktura;
