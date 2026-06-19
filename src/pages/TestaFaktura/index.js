import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { formatKr } from '../../utils/format';
import { getCategoryMeta } from '../../lib/categoryMeta';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body, Card,
  Dropzone, FormRow, Field, SubmitRow, Disclaimer, ErrorBox, Spinner,
  ProgressList, ProgressItem,
  BriefingHead, SavingsBlock, EstimateSavingsBlock, M365ReferenceBlock, AdvisoryCard, ForensicLead, NoSwitchBlock, MonitoringBlock, CreditAlert, PriceNote, KV,
  Reasoning, LicenseOverageNote, TierOptAccordion, IntelligenceCard, SwitchCard, ScoreDiag, EmailGate, PortfolioBridge,
  CalculationChain, SavingRangeBadge,
  ModalOverlay, ModalCard, ActivationCard, QuoteLeadForm, RoamingInsight,
  BatchHeader, BatchProgressBar, BatchInvoiceList, BatchInvoiceCard, BatchSummary,
  FormReveal, CalcToggle,
} from './styles';

const TIER_DISPLAY = {
  'business-premium':  'Business Premium',
  'business-standard': 'Business Standard',
  'business-basic':    'Business Basic',
  'e3': 'E3',
  'e5': 'E5',
};

const formatNum = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function truncateReasoning(text, maxSentences = 2) {
  if (!text) return '';
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length === 0) return text.length > 200 ? text.slice(0, 200).trimEnd() + '…' : text;
  return sentences.slice(0, maxSentences).join(' ').trim();
}

function buildKeyFinding({ cat, supplier, seatCount, adjAnnualCost, suggestedAnnualCost, diagOvPct, licenseOverage }) {
  if (!diagOvPct && !licenseOverage) return null;
  const fmtN = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
  if ((cat === 'mobil' || cat === 'molnvaxel') && seatCount > 1) {
    const perNow = Math.round(adjAnnualCost / seatCount);
    const perNew = Math.round((suggestedAnnualCost ?? 0) / seatCount);
    return `${seatCount} abonnemang hos ${supplier} — ${fmtN(perNow)} kr/st/år mot avtalspriset ${fmtN(perNew)} kr/st/år.`;
  }
  if (cat?.startsWith('saas') && licenseOverage > 0) {
    return `${seatCount} licenser hos ${supplier} — varav ${licenseOverage} verkar oanvända.`;
  }
  if (cat?.startsWith('saas') && seatCount > 1) {
    return `${seatCount} licenser hos ${supplier} — ${diagOvPct}% över avtalspris för er storlek.`;
  }
  if (diagOvPct > 0 && supplier) {
    return `${supplier} — ${diagOvPct}% över verifierat marknadspris.`;
  }
  return null;
}

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

function useRevealedScore(target, delay = 200) {
  const [gaugeReady, setGaugeReady] = React.useState(false);
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    setGaugeReady(false);
    setScore(0);
    if (!target) return;
    const t = setTimeout(() => {
      setGaugeReady(true);
      const duration = 1450;
      const t0 = performance.now();
      let raf;
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setScore(Math.round(target * ease));
        if (p < 1) { raf = requestAnimationFrame(tick); } else { setScore(target); }
      };
      raf = requestAnimationFrame(tick);
      return () => { if (raf) cancelAnimationFrame(raf); };
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return { score, gaugeReady };
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


const SEGMENTS = [
  { label: 'Skrivare',              short: 'Skrivare',   icon: 'file',      cats: ['skrivarleasing', 'utrustningsleasing'] },
  { label: 'El',                    short: 'El',          icon: 'bolt',      cats: ['el'] },
  { label: 'Telefoni och bredband', short: 'Telefoni',    icon: 'phone',     cats: ['mobil', 'bredband', 'molnvaxel'] },
  { label: 'Programvara',           short: 'Programvara', icon: 'spark',     cats: ['saas-productivity', 'saas-creative', 'saas-crm', 'saas-finance', 'saas-other', 'serverhosting', 'faktura-tjanst'] },
  { label: 'IT',                    short: 'IT',          icon: 'wifi',      cats: ['it-support'] },
  { label: 'Fordon och frakt',      short: 'Fordon',      icon: 'truck',     cats: ['leasing-bil', 'transport-frakt'] },
  { label: 'Kontor och städ',       short: 'Kontor',      icon: 'briefcase', cats: ['kontorsmaterial', 'städ-rengöring', 'larm-bevakning', 'kortterminal', 'avfall-atervinning', 'bankavgifter'] },
  { label: 'Personal och hälsa',    short: 'Personal',    icon: 'shield',    cats: ['foretagshalsovard', 'loneadmin', 'forsakring-foretag', 'forsakring-ansvar'] },
];

const PHASES = [
  { id: 'extract',    label: 'Arvo läser & klassificerar fakturan',  sublabel: 'Tolkar varje rad och post' },
  { id: 'categorize', label: 'Identifierar leverantör & kategori',   sublabel: 'Matchar mot 200+ leverantörsprofiler' },
  { id: 'recommend',  label: 'Beräknar besparing mot branschindex', sublabel: 'Jämför med svenska branschdata' },
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

function CalculationChainBlock({ cc }) {
  const [open, setOpen] = React.useState(false);
  return (
    <CalculationChain>
      <div className="chain-header" onClick={() => setOpen(o => !o)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}>
        <span className="chain-title">Beräkningsunderlag</span>
        <span className="chain-toggle">{open ? 'Dölj ▲' : 'Visa hur vi räknar ▼'}</span>
      </div>
      {open && (
        <div className="chain-body">
          <div className="chain-row">
            <div>
              <div className="chain-label">Nuvarande kostnad</div>
              <div className="chain-source">{cc.currentAnnualCost.source}</div>
            </div>
            <span className="chain-value">{formatKr(cc.currentAnnualCost.value)} kr/år</span>
          </div>
          {cc.benchmarkAnnualCost && (
            <div className="chain-row">
              <div>
                <div className="chain-label">Arvo-pris</div>
                {cc.benchmarkAnnualCost.formula && <div className="chain-source">{cc.benchmarkAnnualCost.formula}</div>}
                <div className="chain-source">{cc.benchmarkAnnualCost.source}</div>
              </div>
              <span className="chain-value">{formatKr(cc.benchmarkAnnualCost.value)} kr/år</span>
            </div>
          )}
          <div className="chain-row">
            <div className="chain-label">Bruttobesparing</div>
            <span className="chain-value">{formatKr(cc.grossSaving.value)} kr/år</span>
          </div>
          <div className="chain-row">
            <div>
              <div className="chain-label">Arvos arvode</div>
              <div className="chain-source">{cc.arvoFee.formula}</div>
            </div>
            <span className="chain-value">−{formatKr(cc.arvoFee.value)} kr/år</span>
          </div>
          <div className="chain-row total">
            <span>Er nettobesparing</span>
            <span className="chain-value">+{formatKr(cc.netSaving.value)} kr/år</span>
          </div>
        </div>
      )}
    </CalculationChain>
  );
}

function LicenseOverageBlock({ seatCount, employees, overage, term, termSing }) {
  const [open, setOpen] = React.useState(false);
  return (
    <LicenseOverageNote>
      <button className="lon-trigger" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="lon-head">
          <span className="kicker">Notering om {term}</span>
          <span className="lon-teaser">{overage} av {seatCount} {term} verkar oanvända</span>
        </span>
        <span className={`lon-chevron${open ? ' open' : ''}`}>
          <Icon name="chevron-right" size={15} stroke={2.5} />
        </span>
      </button>
      {open && (
        <div className="lon-body">
          <p>
            Kalkylen ovan bygger på att vi behåller era {seatCount} {term},
            men sänker styckpriset genom att flytta er till rätt avtalsnivå. Vi noterar dock
            att ni enligt uppgift är {employees} anställda. Om man dessutom hade städat bort
            {overage === 1 ? ` detta ${overage} överflödiga ${termSing}` : ` dessa ${overage} överflödiga ${term}`}, hade er kostnad sänkts ytterligare.
          </p>
        </div>
      )}
    </LicenseOverageNote>
  );
}

function ContractWatchCard({ analysisId, supplier, email: initEmail, onSaved }) {
  const [date, setDate]       = useState('');
  const [email, setEmail]     = useState(initEmail ?? '');
  const [status, setStatus]   = useState('idle'); // idle | saving | error
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minStr  = minDate.toISOString().split('T')[0];

  const handleSave = async (e) => {
    e.preventDefault();
    if (!date) return;
    setStatus('saving');
    try {
      const res = await fetch('/api/save-contract', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ analysisId, contractEndDate: date, email: email || undefined }),
      });
      if (!res.ok) throw new Error();
      onSaved();
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{
      background: '#F0FDF9', border: '1px solid #99F6E4', borderRadius: 14,
      padding: '20px 22px', marginBottom: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0D9488', margin: '0 0 4px' }}>
            Avtalsbevakning
          </p>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#0E1A17', margin: 0 }}>
            När löper ert {supplier ? `${supplier}-avtal` : 'avtal'} ut?
          </p>
          <p style={{ fontSize: 13, color: '#5C6E68', margin: '4px 0 0', lineHeight: 1.5 }}>
            Arvo påminner er 60 och 30 dagar innan — så ni aldrig missar förhandlingsfönstret.
          </p>
        </div>
        <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 18, padding: 4, lineHeight: 1 }}>✕</button>
      </div>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="date"
          min={minStr}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            height: 42, padding: '0 12px', border: '1.5px solid #99F6E4', borderRadius: 8,
            fontSize: 14, color: '#0E1A17', background: '#fff', outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {!initEmail && (
          <input
            type="email"
            placeholder="Er e-post för påminnelse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              height: 42, padding: '0 12px', border: '1.5px solid #99F6E4', borderRadius: 8,
              fontSize: 14, color: '#0E1A17', background: '#fff', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        )}
        {status === 'error' && <p style={{ fontSize: 12, color: '#D94F3C', margin: 0 }}>Något gick fel — försök igen.</p>}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            type="submit"
            disabled={status === 'saving' || !date}
            style={{
              padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#5DD6CA,#1B6E66)', color: '#fff',
              fontWeight: 700, fontSize: 13,
            }}
          >
            {status === 'saving' ? 'Sparar…' : 'Bevaka avtalet →'}
          </button>
          <button type="button" onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#9CA3AF' }}>
            Nej tack
          </button>
        </div>
      </form>
    </div>
  );
}

const TestaFaktura = () => {
  const fileInputRef = useRef(null);
  const resultRef    = useRef(null);
  const { email: authEmail } = useAuth();
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('konsult');
  const [employees, setEmployees] = useState(5);
  const [revenue, setRevenue] = useState('');
  const [phase, setPhase] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [contractDate, setContractDate] = useState('');
  const [contractState, setContractState] = useState('idle'); // idle | saving | saved
  const [dragActive, setDragActive] = useState(false);
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState('idle'); // idle | submitting | sent
  const [modalOpen, setModalOpen] = useState(false);
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
  const [reviewQueueEmail, setReviewQueueEmail] = useState('');
  const [reviewQueueEmailState, setReviewQueueEmailState] = useState('idle'); // idle | submitting | sent
  const [feedbackVote, setFeedbackVote] = useState(null); // null | 'up' | 'down'
  const [feedbackState, setFeedbackState] = useState('idle'); // idle | submitting | sent
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activationOpen, setActivationOpen] = useState(false);
  const [activationEmail, setActivationEmail] = useState('');
  const [activationStatus, setActivationStatus] = useState('idle'); // idle | submitting | sent | error
  const [oauthBanner, setOauthBanner] = useState(null); // null | { type: 'connected'|'pending'|'error', provider, invoices, email, errorCode }

  // Licensrevision (shelfware): kundens svar på revisorsfrågan → live omräkning via API.
  const [shelfwareOverride, setShelfwareOverride] = useState(null); // recomputed shelfware (backend)
  const [shelfwareExceptions, setShelfwareExceptions] = useState(''); // input: platser som används till annat
  const [shelfwareState, setShelfwareState] = useState('idle'); // idle | submitting | done | error

  // Batch mode — activated when multiple PDFs are dropped / selected
  const [batchFiles, setBatchFiles] = useState([]);
  const [batchJob, setBatchJob] = useState(null);
  const [batchInvoices, setBatchInvoices] = useState([]);
  const [batchError, setBatchError] = useState(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const batchMode = batchFiles.length > 1;

  // Token + bypass-setup vid mount (stöder ?bypass=<secret> och ?magic=<token>)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const bypassParam = params.get('bypass');
    if (bypassParam) {
      sessionStorage.setItem('arvo_bypass', bypassParam);
      window.history.replaceState({}, '', window.location.pathname);
    }

    const magicParam = params.get('magic');
    if (magicParam) {
      window.history.replaceState({}, '', window.location.pathname);
      fetch('/api/validate-magic', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ token: magicParam }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.ok && d.bypass) sessionStorage.setItem('arvo_bypass', d.bypass);
        })
        .catch(() => {});
    }

    fetch('/api/token', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => setApiToken(d.token ?? null))
      .catch(() => {});

    // Handle OAuth return params (?intelligence_connected, ?oauth_pending, ?oauth_error)
    const connected = params.get('intelligence_connected');
    const pending   = params.get('oauth_pending');
    const oauthErr  = params.get('oauth_error');
    const provider  = params.get('provider') ?? connected ?? pending ?? 'gmail';
    if (connected || pending || oauthErr) {
      const invoices = parseInt(params.get('invoices') ?? '0', 10) || 0;
      const retEmail = params.get('email') ?? '';
      if (connected) {
        setOauthBanner({ type: 'connected', provider: connected, invoices, email: retEmail });
      } else if (pending) {
        setOauthBanner({ type: 'pending', provider: pending });
      } else if (oauthErr) {
        setOauthBanner({ type: 'error', provider, errorCode: oauthErr });
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Scrolla till resultatkortet när analysen är klar
  React.useEffect(() => {
    if (!result || !resultRef.current) return;
    const navHeight = document.querySelector('header')?.offsetHeight ?? 64;
    const top = resultRef.current.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [result]);

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

  const validateAndSetFiles = (fileList) => {
    setError(null);
    setBatchError(null);
    const pdfs = Array.from(fileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );
    const oversized = pdfs.filter((f) => f.size > MAX_PDF_SIZE);
    if (oversized.length > 0) {
      setError(`${oversized.length} fil(er) är för stora (max 3 MB per faktura).`);
    }
    const valid = pdfs.filter((f) => f.size <= MAX_PDF_SIZE);
    if (valid.length === 1) {
      setFile(valid[0]);
      setBatchFiles([]);
    } else if (valid.length > 1) {
      setBatchFiles(valid);
      setFile(null);
      setResult(null);
    } else if (fileList.length > 0) {
      setError('Endast PDF-filer stöds.');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.length > 1) {
      validateAndSetFiles(files);
    } else if (files?.[0]) {
      validateAndSetFile(files[0]);
    }
  };

  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragActive(false); };

  const runBatchAnalysis = async () => {
    if (batchFiles.length < 2) return;
    setBatchError(null);
    setBatchJob({ status: 'processing', total: batchFiles.length, done: 0, failed: 0 });
    setBatchInvoices(batchFiles.map((f, i) => ({ index: i, filename: f.name, status: 'pending' })));
    setBatchLoading(true);

    let freshToken = apiToken;
    try {
      const tr = await fetch('/api/token', { method: 'POST' });
      const td = await tr.json();
      freshToken = td.token ?? apiToken;
      setApiToken(freshToken);
    } catch { /* keep existing */ }

    const bypass = sessionStorage.getItem('arvo_bypass') ?? localStorage.getItem('arvo_bypass') ?? undefined;

    let done = 0, failed = 0;

    for (let i = 0; i < batchFiles.length; i++) {
      setBatchInvoices((prev) => prev.map((inv, idx) => idx === i ? { ...inv, status: 'extracting' } : inv));

      try {
        const pdfBase64 = await fileToBase64(batchFiles[i]);
        const res = await fetch('/api/test-invoice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pdfBase64,
            industry,
            employees: parseInt(employees, 10) || 5,
            token: freshToken ?? 'dev',
            bypass,
          }),
        });
        const data = await res.json();

        if (data.route) {
          done++;
          setBatchInvoices((prev) => prev.map((inv, idx) => idx === i ? {
            ...inv, status: 'done',
            route: data.route, extracted: data.extracted,
            categorized: data.categorized, recommendation: data.recommendation,
          } : inv));
        } else {
          failed++;
          setBatchInvoices((prev) => prev.map((inv, idx) => idx === i ? {
            ...inv, status: 'failed', error: data.error ?? 'Analys misslyckades',
          } : inv));
        }
      } catch (err) {
        failed++;
        setBatchInvoices((prev) => prev.map((inv, idx) => idx === i ? {
          ...inv, status: 'failed', error: err.message,
        } : inv));
      }

      setBatchJob({
        status: i === batchFiles.length - 1 ? 'done' : 'processing',
        total: batchFiles.length,
        done,
        failed,
      });
    }

    setBatchLoading(false);
  };

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
    setFeedbackVote(null);
    setFeedbackState('idle');
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
          userEmail: authEmail || undefined,
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

      // Rate limit nådd
      if (res.status === 429 || data.rateLimited) {
        setPhase(null);
        setError('Du har analyserat för många fakturor idag (max 5/dag). Kontakta oss på hej@arvoflow.se för att utöka din kvot.');
        return;
      }

      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Servern returnerade ${res.status}`);
      }

      setPhase('done');
      setResult(data);
      setAnalysisId(data.analysisId ?? null);
      setContractDate('');
      setContractState('idle');

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
    e?.preventDefault?.();
    const email = (modalEmail || gateEmail || '').trim();
    if (!email || modalEmailState !== 'idle') return;
    setModalEmailState('submitting');
    try {
      await Promise.all([
        sendConfirmationMail(email),
        sendAnalysisMail(email),
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

  const submitReviewQueueEmail = async (e) => {
    e.preventDefault();
    if (!reviewQueueEmail || reviewQueueEmailState !== 'idle') return;
    setReviewQueueEmailState('submitting');
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reviewQueueEmail, source: 'review_queue', reason: result?.reason }),
      });
      setReviewQueueEmailState('sent');
    } catch {
      setReviewQueueEmailState('sent'); // non-fatal — show success anyway
    }
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    const email = activationEmail.trim() || gateEmail.trim();
    if (!email || activationStatus === 'submitting') return;
    setActivationStatus('submitting');
    const reasoning = truncateReasoning(
      result?.categorized?.category && getCategoryMeta(result.categorized.category).isRealPrice
        ? result?.recommendation?.reasoning ?? ''
        : redactSupplier(result?.recommendation?.reasoning ?? '', result?.recommendation?.suggestedSupplier),
    );
    try {
      const res = await fetch('/api/activate-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          supplier:             result?.extracted?.supplier,
          normalizedSupplier:   result?.categorized?.normalizedSupplier,
          category:             result?.categorized?.category,
          annualCost:           adjAnnualCost,
          suggestedAnnualCost:  result?.recommendation?.suggestedAnnualCost,
          grossSaving:          adjGrossSaving,
          netSaving:            adjNetSaving,
          arvoFee:              adjArvoFee,
          reasoning,
          diagScore,
          diagLabel:            diagC?.label,
          diagInsight,
        }),
      });
      if (!res.ok) throw new Error();
      setActivationStatus('sent');
    } catch {
      setActivationStatus('error');
    }
  };

  const submitFeedback = async (vote) => {
    if (feedbackState !== 'idle') return;
    setFeedbackVote(vote);
    setFeedbackState('submitting');
    try {
      await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          fingerprint: await getBrowserFingerprint().catch(() => ''),
          supplier:    result?.extracted?.supplier,
          category:    result?.categorized?.category,
          vote,
        }),
      });
    } catch { /* non-fatal */ }
    setFeedbackState('sent');
  };

  // Licensrevision: kunden bekräftar hur många överskottsplatser som används till annat.
  // Backend räknar om svinnet i kronor (klienten gör ALDRIG kr-aritmetik själv, regel 2).
  const submitShelfwareReview = async (e) => {
    e.preventDefault();
    const sw = result?.recommendation?.shelfware;
    if (!sw || shelfwareState === 'submitting') return;
    setShelfwareState('submitting');
    try {
      const res = await fetch('/api/recompute-shelfware', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          seatCount:           sw.paidSeats,
          pricePerSeatMonthly: sw.perSeatMonthly,
          employees:           sw.employees,
          knownExceptions:     shelfwareExceptions === '' ? 0 : Number(shelfwareExceptions),
        }),
      });
      if (!res.ok) throw new Error('recompute failed');
      const data = await res.json();
      // data.shelfware === null betyder: allt förklarat / under golvet → inget svinn kvar.
      setShelfwareOverride(data.shelfware ?? { cleared: true });
      setShelfwareState('done');
    } catch {
      setShelfwareState('error');
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

  // Hårdvarujustering: subtrahera delbetalningar ur besparingsbasen (beräknas först — används i diagAnnual)
  const _hwItems        = detectHardwareInstallments(result?.extracted?.lineItems ?? []);
  const _hwAnnualCost   = _hwItems.reduce((s, h) => s + h.monthlyCost * 12, 0);
  const _hwTotalRemain  = _hwItems.reduce((s, h) => s + h.remainingCost, 0);
  const hasHwAdj        = _hwAnnualCost > 0 && result?.recommendation?.shouldSwitch;
  const adjAnnualCost   = hasHwAdj
    ? Math.max(0, (result?.extracted?.annualCost ?? 0) - _hwAnnualCost)
    : (result?.extracted?.annualCost ?? 0);
  const adjGrossSaving  = hasHwAdj
    ? Math.max(0, adjAnnualCost - (result?.recommendation?.suggestedAnnualCost ?? 0))
    : (result?.recommendation?.grossSaving ?? 0);
  const adjArvoFee      = Math.round(adjGrossSaving * 0.20);
  const adjNetSaving    = adjGrossSaving - adjArvoFee;

  const animatedNet = useCountUp(hasHwAdj ? adjNetSaving : (result?.recommendation?.netSaving ?? 0));

  const diagAnnual  = adjAnnualCost;
  const diagSugg    = result?.recommendation?.suggestedAnnualCost ?? 0;
  const diagOvPct   = diagAnnual > 0 && diagSugg > 0 && diagSugg < diagAnnual
    ? Math.round((diagAnnual - diagSugg) / diagAnnual * 100)
    : 0;
  const _clickPriceScore = result?.recommendation?.clickRateAnalysis?.priceGapScore ?? null;
  const diagScoreRaw = _clickPriceScore ?? Math.max(5, Math.round(100 - diagOvPct * 1.5));
  const diagScore    = _clickPriceScore != null
    ? _clickPriceScore
    : (!result?.recommendation?.shouldSwitch
        ? Math.min(diagScoreRaw, 85)
        : (result?.recommendation?.netSaving ?? 0) > 0
          ? Math.min(diagScoreRaw, 79)  // cap vid 79 → "Förbättringsläge" när vi rekommenderar byte
          : diagScoreRaw);
  const diagC       = diagScore < 45
    ? { dot: '#DC2626', num: '#DC2626', label: 'Kritisk',         labelClr: '#991B1B', txt: '#7F1D1D', bg: '#FEF2F2', border: 'rgba(220,38,38,.18)' }
    : diagScore < 65
    ? { dot: '#D97706', num: '#D97706', label: 'Suboptimerat',    labelClr: '#92400E', txt: '#78350F', bg: '#FFFBEB', border: 'rgba(217,119,6,.18)' }
    : diagScore < 80
    ? { dot: '#65A30D', num: '#65A30D', label: 'Förbättringsläge', labelClr: '#365314', txt: '#365314', bg: '#F7FEE7', border: 'rgba(101,163,13,.18)' }
    : { dot: '#1B7A6E', num: '#1B7A6E', label: 'Optimalt',        labelClr: '#0E4F47', txt: '#0E4F47', bg: '#DCEEEA', border: 'rgba(27,122,110,.18)' };
  const monitoringDatePast = result?.monitoringDate && new Date(result.monitoringDate) < new Date();
  const daysUntilEnd = result?.servicePeriodEnd
    ? Math.ceil((new Date(result.servicePeriodEnd) - new Date()) / (1000 * 60 * 60 * 24))
    : null;
  const _secSaving   = result?.recommendation?.secondarySaving ?? null;
  const _primGross   = _secSaving
    ? (result?.recommendation?.grossSaving ?? 0) - _secSaving.grossSaving
    : null;
  const _secLabel = _secSaving
    ? _secSaving.category === 'bredband'
      ? `Bredband${_secSaving.speedMbit ? ` ${_secSaving.speedMbit} Mbit` : ''}`
      : `Mobil${_secSaving.seatCount ? ` (${_secSaving.seatCount} st)` : ''}`
    : null;

  // Sekundär-only switch: primären (t.ex. mobil) har inget byte att göra men
  // sekundären (t.ex. bredband) har besparing. Används för meta, kickers och diagInsight.
  const _isSecondaryOnlySwitch = !!(
    result?.recommendation?.shouldSwitch
    && !result?.recommendation?.suggestedSupplier
    && _secSaving != null
  );
  const _effectiveMeta = _isSecondaryOnlySwitch
    ? getCategoryMeta(_secSaving.category)
    : getCategoryMeta(result?.categorized?.category ?? 'uncategorized');

  // Magnitudmedveten benchmarkfras: "kostar väsentligt mindre" får bara sägas när
  // gapet faktiskt är väsentligt (≥15 %) — vid små gap är frasen självmotsägande.
  const _bmPhrase = diagOvPct >= 15
    ? (_effectiveMeta.smfBenchmark ?? 'välförhandlat avtalspris finns att hämta')
    : 'samma avtal kostar mindre till leverantörens publika årsavtalspris';
  const diagInsight = _isSecondaryOnlySwitch
    ? `Ert ${getCategoryMeta(result?.categorized?.category ?? 'uncategorized').label.toLowerCase()} är konkurrenskraftigt — ${_secLabel ?? 'sekundärtjänsten'} kan optimeras.`
    : result?.route === 'monitoring'
      ? monitoringDatePast
        ? `Avtalslåset lossnar snart${daysUntilEnd != null ? ` — ${daysUntilEnd} dagar kvar` : ''}. Arvo förbereder omförhandling.`
        : diagScore >= 80
          ? 'Ni betalar marknadsmässigt i dag — Arvo bevakar och agerar inför förnyelsen.'
          : `Ni betalar ${diagOvPct} % sämre än branschsnittet — Arvo förhandlar välförhandlat avtalspris vid förnyelsen.`
      : diagScore < 45
        ? (diagOvPct > 0 ? `Ni betalar ${diagOvPct}% över marknadspris — ${diagOvPct >= 15 ? (_effectiveMeta.smfBenchmark ?? 'stor besparingspotential') : _bmPhrase}.` : 'Ni betalar markant sämre än branschsnittet — stor besparingspotential.')
        : diagScore < 80 ? (diagOvPct > 0 ? `Ni betalar ${diagOvPct}% över marknadspris — ${_bmPhrase}.` : 'Ni betalar något sämre än branschsnittet — välförhandlat avtalspris finns att hämta.')
        : 'Ni har ett välförhandlat avtal — bättre än branschsnittet.';

  const GAUGE_R = 26;
  const GAUGE_C = 2 * Math.PI * GAUGE_R;
  const gaugeDash = (diagScore / 100) * GAUGE_C;
  const { score: animScoreVal, gaugeReady: animGaugeReady } = useRevealedScore(diagScore, 400);

  // Layer 2 (Arvo Switch) — komponent-scope variabler för SwitchCard utanför Card
  const _switchIsRealPrice     = _effectiveMeta.isRealPrice;
  const _switchIsLicensePending = !!(result?.categorized?.licensePending);
  const _switchPartnerLabel    = _effectiveMeta.partnerLabel;
  const _switchSuggestedLower  = (result?.recommendation?.suggestedSupplier ?? '').toLowerCase().trim();
  const _switchCurrentLower    = (result?.categorized?.normalizedSupplier ?? result?.extracted?.supplier ?? '').toLowerCase().trim();
  const _switchIsSameSupplier  = _switchIsRealPrice && _switchSuggestedLower && _switchCurrentLower && (
    _switchSuggestedLower === _switchCurrentLower ||
    _switchSuggestedLower.includes(_switchCurrentLower) ||
    _switchCurrentLower.includes(_switchSuggestedLower)
  );
  const _switchCtaLabel = _switchIsSameSupplier
    ? `Sänk er ${result?.recommendation?.suggestedSupplier}-kostnad`
    : _switchIsRealPrice ? 'Aktivera bytet' : 'Säkra besparingen';
  const _showSwitch = !!(
    result?.route === 'auto'
    && result?.recommendation?.suggestedAnnualCost
    && !_switchIsLicensePending
    && adjNetSaving > 0
  );
  const _showOptimizeSwitch = !!(result?.route === 'auto' && result?.recommendation?.isOptimize);

  return (
    <Page>
      <Nav variant="public" />

      {/* ── OAuth return banner ─────────────────────────────────────────── */}
      {oauthBanner && (
        <div style={{
          background: oauthBanner.type === 'connected' ? '#F0FDF9'
                    : oauthBanner.type === 'pending'   ? '#FFFBEB'
                    : '#FEF2F2',
          borderBottom: `1px solid ${oauthBanner.type === 'connected' ? '#6EE7D1'
                                   : oauthBanner.type === 'pending'   ? '#FCD34D'
                                   : '#FECACA'}`,
          padding: '13px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <span style={{ fontSize: 14, color: oauthBanner.type === 'connected' ? '#065F46' : oauthBanner.type === 'pending' ? '#92400E' : '#991B1B', fontWeight: 600, lineHeight: 1.5 }}>
            {oauthBanner.type === 'connected' && (
              <>
                {oauthBanner.provider === 'gmail' ? 'Gmail' : 'Outlook'} kopplat —{' '}
                {oauthBanner.invoices > 0
                  ? `Arvo hittade ${oauthBanner.invoices} fakturor i er inkorg — analysera er första nedan, det tar 2 minuter.`
                  : 'Inkorgen är kopplad. Analysera er första faktura nedan — det tar 2 minuter.'}
              </>
            )}
            {oauthBanner.type === 'pending' && (
              <>
                {oauthBanner.provider === 'gmail' ? 'Gmail' : 'Outlook'}-anslutning kräver konfiguration —{' '}
                er aktivering är mottagen och Arvo kontaktar er inom kort.
              </>
            )}
            {oauthBanner.type === 'error' && (
              <>
                Anslutning misslyckades ({oauthBanner.errorCode}) — försök igen eller kontakta hej@arvoflow.se.
              </>
            )}
          </span>
          <button
            onClick={() => setOauthBanner(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1, opacity: 0.5, padding: '0 4px' }}
            aria-label="Stäng"
          >×</button>
        </div>
      )}

      <Hero>
        <Eyebrow><span className="dot" /> Arvo Intelligence · Analys på 60 sekunder</Eyebrow>
        <Headline>Ni betalar för mycket. <em>En</em> faktura bevisar det.</Headline>
        <Lede>
          Arvo Intelligence jämför er faktura mot verkliga branschpriser och visar
          exakt vad ni betalar för mycket — och hos vem ni kan spara.
        </Lede>
      </Hero>

      <Body>
        {!result && (
          <Card>
            <form onSubmit={onSubmit}>
              <Dropzone
                $active={dragActive}
                $hasFile={!!file || batchMode}
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
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files?.length > 1) validateAndSetFiles(files);
                    else if (files?.[0]) validateAndSetFile(files[0]);
                  }}
                />
                <div className="icon">
                  <Icon name={(file || batchMode) ? 'check' : 'upload'} size={28} stroke={1.75} />
                </div>
                {batchMode ? (
                  <>
                    <strong className="primary">{batchFiles.length} fakturor valda</strong>
                    <span className="secondary">{batchFiles.map((f) => f.name).join(', ').slice(0, 80)}{batchFiles.map((f) => f.name).join(', ').length > 80 ? '…' : ''}</span>
                  </>
                ) : file ? (
                  <>
                    <strong className="primary">Faktura vald</strong>
                    <span className="filename">{file.name} · {(file.size / 1024).toFixed(0)} kB</span>
                  </>
                ) : (
                  <>
                    <strong className="primary">
                      {typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
                        ? 'Lägg till er faktura'
                        : 'Dra hit er faktura'}
                    </strong>
                    <span className="cta-pill">
                      {typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
                        ? 'Välj faktura'
                        : 'Välj fil'} →
                    </span>
                    <span className="secondary">PDF · max 3 MB · Vi sparar inte filen</span>
                  </>
                )}
              </Dropzone>

              {(file || batchMode) && (
              <FormReveal>
                <FormRow>
                  <Field>
                    <span className="label">Bransch</span>
                    <span className="hint">Vi jämför mot bolag av er storlek i samma bransch.</span>
                    <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      {Object.entries(INDUSTRY_LABELS).map(([id, label]) => (
                        <option key={id} value={id}>{label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field>
                    <span className="label">Antal anställda</span>
                    <span className="hint">Prisnivån varierar med bolagets storlek.</span>
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
                {batchMode ? (
                  <Button
                    type="button"
                    $variant="gradient"
                    $size="lg"
                    $full
                    disabled={batchLoading}
                    onClick={runBatchAnalysis}
                  >
                    {batchLoading ? (
                      <><Spinner /> Analyserar {batchFiles.length} fakturor…</>
                    ) : (
                      <>Analysera {batchFiles.length} fakturor <Icon name="arrow" size={18} /></>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    $variant="gradient"
                    $size="lg"
                    $full
                    disabled={loading || !file}
                  >
                    {loading ? (
                      <><Spinner /> Analyserar…</>
                    ) : (
                      <>Analysera fakturan <Icon name="arrow" size={18} /></>
                    )}
                  </Button>
                )}
              </SubmitRow>
              </FormReveal>
              )}

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
                        <div className="label">
                          {p.label}
                          {state === 'active' && p.sublabel && (
                            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2, fontWeight: 400 }}>{p.sublabel}</div>
                          )}
                        </div>
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
                av Arvo Intelligence och raderas omedelbart efter analysen.
              </Disclaimer>
            </form>
          </Card>
        )}

        {/* ── Batch mode results ─────────────────────────────────────────── */}
        {batchMode && (batchJob || batchError) && (
          <Card style={{ marginTop: 20 }}>
            <BatchHeader>
              <div>
                <span className="badge"><Icon name="spark" size={10} /> Batch-analys</span>
                <h3>
                  {batchJob?.status === 'done'
                    ? 'Analys klar'
                    : batchJob?.status === 'failed'
                    ? 'Analys misslyckades'
                    : 'Analyserar fakturor…'}
                </h3>
                <div className="sub">
                  {batchJob
                    ? `${batchJob.done ?? 0} av ${batchJob.total} klara${batchJob.failed ? ` · ${batchJob.failed} misslyckades` : ''}`
                    : batchError ? batchError : `${batchFiles.length} fakturor köade`}
                </div>
              </div>
            </BatchHeader>

            {batchJob && (
              <BatchProgressBar $pct={batchJob.total > 0 ? Math.round(((batchJob.done ?? 0) + (batchJob.failed ?? 0)) / batchJob.total * 100) : 0}>
                <div className="fill" />
              </BatchProgressBar>
            )}

            {batchError && <ErrorBox style={{ marginBottom: 16 }}>{batchError}</ErrorBox>}

            {/* Aggregate summary when done */}
            {batchJob?.status === 'done' && (() => {
              const withSwitch = batchInvoices.filter((inv) => inv?.recommendation?.shouldSwitch);
              const totalNetSaving = withSwitch.reduce((s, inv) => s + (inv.recommendation?.netSaving ?? 0), 0);
              const inReview = batchInvoices.filter((inv) => inv?.route === 'review_queue').length;
              return (
                <BatchSummary>
                  <div className="stat highlight">
                    <div className="value">{formatKr(Math.round(totalNetSaving / 1000))}k</div>
                    <div className="label">Nettobesparing/år</div>
                  </div>
                  <div className="stat">
                    <div className="value">{withSwitch.length}</div>
                    <div className="label">Rekommenderar byte</div>
                  </div>
                  <div className="stat">
                    <div className="value">{inReview}</div>
                    <div className="label">Kräver granskning</div>
                  </div>
                </BatchSummary>
              );
            })()}

            {/* Per-invoice cards */}
            <BatchInvoiceList>
              {(batchInvoices.length > 0 ? batchInvoices : batchFiles.map((f, i) => ({ index: i, filename: f.name, status: 'pending' }))).map((inv, i) => {
                const st = inv?.status ?? 'pending';
                const netSaving = inv?.recommendation?.netSaving ?? null;
                const iconName = st === 'done' ? 'check' : st === 'failed' ? 'x' : st === 'processing' ? 'spark' : 'file';
                const statusLabel =
                  st === 'done'       ? (inv.route === 'review_queue' ? 'Kräver granskning' : inv.route === 'unsupported' ? 'Utanför scope' : 'Klar') :
                  st === 'failed'     ? 'Misslyckades' :
                  st === 'processing' ? 'Kategoriserar…' :
                  st === 'extracting' ? 'Läser faktura…' :
                                        'Väntar…';

                return (
                  <BatchInvoiceCard key={inv?.index ?? i} $status={st}>
                    <div className="icon-wrap">
                      <Icon name={iconName} size={14} stroke={2} />
                    </div>
                    <span className="name">{inv?.filename ?? batchFiles[i]?.name ?? `Faktura ${i + 1}`}</span>
                    <span className="status-label">{statusLabel}</span>
                    {netSaving > 0 && (
                      <span className="saving">−{formatKr(netSaving)} kr/år</span>
                    )}
                  </BatchInvoiceCard>
                );
              })}
            </BatchInvoiceList>

            {batchJob?.status !== 'done' && batchJob?.status !== 'failed' && (
              <p style={{ fontSize: 12, color: '#888', textAlign: 'center', margin: 0 }}>
                Arvo analyserar fakturorna i bakgrunden. Uppdateras var 5:e sekund.
              </p>
            )}
          </Card>
        )}

        {result && (
          <>
          <Card ref={resultRef}>
            <BriefingHead>
              <div className="bh-top">
                <span className="bh-stamp">
                  Arvo-analys · {new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}
                </span>
                <button className="bh-dl" onClick={() => setDownloadModalOpen(true)} title="Ladda ner analys">
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="bh-main">
                <h2 className="bh-supplier">{result.extracted.supplier}</h2>
              </div>
              <div className="bh-row">
                {result.categorized && (
                  <span className="bh-chip">
                    {result.reason === 'natavgift' ? 'Nätavgift'
                      : _secSaving != null ? `${getCategoryMeta(result.categorized.category).label} & ${_secLabel}`
                      : (getCategoryMeta(result.categorized.category).label || result.categorized.category)}
                    {result.categorized.subType && result.reason !== 'natavgift' && _secSaving == null
                      ? ` · ${result.categorized.subType}` : ''}
                  </span>
                )}
              </div>
            </BriefingHead>

            {result.recommendation?.leadFinding && (() => {
              // Forensik-inversionen: mekanismen kunden blöder på — läst ur DERAS EGEN faktura —
              // leder, före score och benchmark. Talet kommer från backend (kundens egen rad, Zero Trust).
              const lf = result.recommendation.leadFinding;
              const extra = (result.recommendation.forensicFindings?.length ?? 0) - 1;
              return (
                <ForensicLead>
                  <span className="fl-eyebrow">Fynd på er faktura</span>
                  <div className="fl-title">{lf.title}</div>
                  <div className="fl-row">
                    <span className="fl-line">”{lf.lineDescription}”</span>
                    {lf.annualImpact > 0 && <span className="fl-impact">{formatKr(lf.annualImpact)} kr/år</span>}
                  </div>
                  <p className="fl-text">{lf.text}</p>
                  {extra > 0 && (
                    <p className="fl-more">
                      <strong>+{extra} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.
                    </p>
                  )}
                </ForensicLead>
              );
            })()}

            {result.route === 'monitoring' ? (
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
                            : `Avtalet löper t.o.m. ${endFmt ?? end}. Vi påminner er i ${monFmt ?? '90 dagar innan slutdatum'} — i god tid för att agera när avtalet löper ut.`;
                        })()}
                      </p>
                    </>
                  )}
                </MonitoringBlock>
                <KV>
                  <div>
                    <dt>Ni betalar idag{getCategoryMeta(result.categorized?.category).elSuffix ? ' (energidel)' : ''}</dt>
                    <dd>
                      {formatKr(result.extracted.annualCost)} / år
                      {result.extracted.billingPeriod !== 'annual' && (
                        <small style={{ fontStyle: 'italic' }}>Projicerat från abonnemangsradernas listpris</small>
                      )}
                    </dd>
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
                        : (() => { const s = new Date(result.monitoringDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' }); return s.charAt(0).toUpperCase() + s.slice(1); })()
                      }</dd>
                    </div>
                  )}
                </KV>
                {(result.categorized?.reasoning || result.potentialSavingNote) && (
                  <Reasoning>
                    <span className="kicker">Avtalsöversikt</span>
                    {result.categorized?.reasoning && (
                      <p>
                        {result.categorized.normalizedSupplier || result.extracted?.supplier} fakturerar{' '}
                        {formatKr(result.extracted?.annualCost)} per år för{' '}
                        {getCategoryMeta(result.categorized.category).inlineLabel}.
                        {' '}Avtalet är bevakat — Arvo tar kontakt{' '}
                        {daysUntilEnd != null && daysUntilEnd <= 90
                          ? 'nu inför förestående förnyelse'
                          : result.monitoringDate && !monitoringDatePast
                            ? `från ${new Date(result.monitoringDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' })}`
                            : 'inför avtalets förnyelse'
                        }{' '}och säkrar bästa villkor utan att ni behöver lägga tid på det.
                      </p>
                    )}
                    {result.potentialSavingNote && (
                      <p style={{ marginTop: result.categorized?.reasoning ? 10 : 0 }}><strong>Potentiell nettobesparing vid avtalets slut:</strong> {result.potentialSavingNote}</p>
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
                ) : result.reason === 'insurance' ? (
                  <>
                    <strong>Försäkringar hanteras inte av Arvo ännu.</strong>
                    <p>
                      Försäkringsförmedling kräver tillstånd från Finansinspektionen. Arvo planerar
                      att ansöka om detta tillstånd under 2027 — tills dess analyserar vi inte
                      försäkringsfakturor. Ladda upp en annan leverantörsfaktura för att komma igång.
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
                      <CreditAlert style={result.creditWillExpireUnused ? { background: '#FEF3C7', borderColor: 'rgba(217,119,6,.25)' } : undefined}>
                        <strong>
                          {result.creditWillExpireUnused
                            ? `⚠ Krediter förfaller ${result.creditExpiryDate} — ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} kvar`
                            : `Era startup-krediter räcker ca ${result.creditExpiryMonths} ${result.creditExpiryMonths === 1 ? 'månad' : 'månader'} till`}
                        </strong>
                        <p>
                          Ni förbrukar {result.startupCreditCurrency} {result.startupCreditMonthlyBurn?.toLocaleString('sv-SE')}/mån men
                          betalar ingenting tack vare kvarvarande kredit ({result.startupCreditCurrency} {result.startupCreditBalance?.toLocaleString('sv-SE')}).
                          {result.creditWillExpireUnused
                            ? ` Vid nuvarande förbrukningstakt förfaller ca ${result.startupCreditCurrency} ${result.creditUnusedAmount?.toLocaleString('sv-SE')} oanvänt. Överväg att skala upp era resurser eller kontakta leverantören om förlängning — sedan hjälper Arvo er att förhandla rätt pris.`
                            : ' Nu är rätt tid att planera ert molnavtal — vi hjälper er att förhandla rätt pris innan fakturorna börjar landa.'}
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
                {reviewQueueEmailState === 'sent' ? (
                  <p style={{ fontSize: 13, color: '#1B6E66', fontWeight: 600, marginTop: 14, marginBottom: 0 }}>
                    ✓ Vi hör av oss när analysen är klar!
                  </p>
                ) : (
                  <form
                    onSubmit={submitReviewQueueEmail}
                    style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}
                  >
                    <input
                      type="email"
                      placeholder="din@email.se — vi meddelar när vi har ett svar"
                      value={reviewQueueEmail}
                      onChange={(e) => setReviewQueueEmail(e.target.value)}
                      required
                      style={{
                        flex: 1, minWidth: 180, padding: '9px 14px', borderRadius: 100,
                        border: '1.5px solid #D5E2DC', fontSize: 13, outline: 'none',
                        background: '#fff', color: '#0E1A17',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!reviewQueueEmail || reviewQueueEmailState === 'submitting'}
                      style={{
                        padding: '9px 18px', borderRadius: 100, border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg,#5DD6CA,#1B6E66)', color: '#fff',
                        fontSize: 13, fontWeight: 700,
                        opacity: (!reviewQueueEmail || reviewQueueEmailState === 'submitting') ? .55 : 1,
                      }}
                    >
                      {reviewQueueEmailState === 'submitting' ? 'Skickar…' : 'Meddela mig →'}
                    </button>
                  </form>
                )}
              </NoSwitchBlock>
            ) : result.recommendation?.requiresQuote ? (
              <>
                {(result.recommendation?.clickRateAnalysis || (result.recommendation?.shouldSwitch && (result.recommendation?.netSaving ?? 0) > 0)) && (
                  <>
                    <Reasoning>
                      <span className="kicker">Vad analysen visar</span>
                      <p>{result.recommendation.reasoning}</p>
                    </Reasoning>
                  </>
                )}
                {result.recommendation?.clickRateAnalysis?.estimatedAnnualSavingsHigh > 0 ? (
                  <EstimateSavingsBlock>
                    <div className="estimate-header">
                      <span className="kicker">Identifierat besparingsgap</span>
                      <span className="estimate-badge">Uppskattning</span>
                    </div>
                    {/* Backend äger aritmetiken (regel 1/2) — frontend renderar bandet, räknar aldrig om. */}
                    <span className="amount">≈ {formatNum(result.recommendation.clickRateAnalysis.estimatedAnnualSavingsLow)}–{formatNum(result.recommendation.clickRateAnalysis.estimatedAnnualSavingsHigh)}&nbsp;kr/år</span>
                    <span className="unit">Er faktiska klickkostnad på årsbasis mot marknadsbandet (estimat) · exakt belopp bekräftas med offert</span>
                  </EstimateSavingsBlock>
                ) : (result.recommendation?.netSaving ?? 0) > 0 ? (
                  <EstimateSavingsBlock>
                    <div className="estimate-header">
                      <span className="kicker">Identifierat besparingsgap</span>
                      <span className="estimate-badge">Uppskattning</span>
                    </div>
                    <span className="amount">≈ +{formatNum(result.recommendation.netSaving)}&nbsp;kr/år</span>
                    <span className="unit">Jämfört mot välförhandlat B2B-avtal · bekräftas med faktisk offert</span>
                  </EstimateSavingsBlock>
                ) : null}
                {/* Dropbox/Box-korselden: arkitektonisk substitutionsinsikt. INGEN påhittad SEK-besparing
                    (USD-prissatt → vi FX-konverterar aldrig). All copy kommer färdig från backend. */}
                {result.recommendation?.storageSubstitution && (() => {
                  const sub = result.recommendation.storageSubstitution;
                  return (
                    <div style={{ gridColumn: '1 / -1', marginBottom: '20px', padding: '18px 22px', background: '#0E1A17', borderRadius: '20px', border: '1.5px solid #1B7A6E' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5DD6CA' }}>Arkitektonisk insikt</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#0E1A17', background: '#5DD6CA', borderRadius: '4px', padding: '2px 6px' }}>{sub.vendor} · USD</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.55, color: '#F1F6F3', fontWeight: 600 }}>{sub.usdPain}</p>
                      <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: 1.55, color: '#C7D6D0' }}>{sub.substitution}</p>
                      <p style={{ margin: '12px 0 0', paddingTop: '12px', borderTop: '1px solid #2A3A35', fontSize: '12px', lineHeight: 1.5, color: '#8FA39C' }}>{sub.note}</p>
                    </div>
                  );
                })()}
                {/* Verifierad M365-referens (Google-kortet): bevisad SEK-data benchmarkar obevisad
                    Google. Backend äger talet (regel 1/2) — frontend renderar bara, räknar aldrig om. */}
                {result.recommendation?.m365Equivalent && (
                  <M365ReferenceBlock>
                    <div className="ref-header">
                      <span className="kicker">Verifierad referens — likvärdig svit</span>
                      <span className="ref-badge">Microsoft listpris</span>
                    </div>
                    <div className="ref-tier">{result.recommendation.m365Equivalent.m365TierLabel}</div>
                    <div className="ref-figure">
                      {result.recommendation.m365Equivalent.monthlyTotal != null ? (
                        <>{formatNum(result.recommendation.m365Equivalent.monthlyTotal)}&nbsp;kr<span className="per">/mån för {result.recommendation.m365Equivalent.seats} användare</span></>
                      ) : (
                        <>{result.recommendation.m365Equivalent.perSeatMonthlyLabel}&nbsp;kr<span className="per">/användare/mån</span></>
                      )}
                    </div>
                    <div className="ref-sub">
                      {result.recommendation.m365Equivalent.perSeatMonthlyLabel}&nbsp;kr/användare/mån vid årsavtal · {result.recommendation.m365Equivalent.equivalenceNote}
                    </div>
                    <div className="ref-disclaimer">
                      <strong>Detta är Microsofts publika listpris för den likvärdiga sviten — inte ert Google-pris.</strong> Google publicerar bara listpris i USD; ert faktiska kronpris jämför vi mot i offerten nedan.
                    </div>
                  </M365ReferenceBlock>
                )}
                <NoSwitchBlock>
                  <strong>
                    {result.recommendation?.clickRateAnalysis
                      ? 'Beräkna exakt besparing per år'
                      : (result.recommendation?.netSaving ?? 0) > 0
                        ? 'Säkra besparingen — kräver offert'
                        : result.recommendation?.m365Equivalent
                          ? 'Exakt Google-pris kräver offert'
                          : result.recommendation?.revisionGate === 'unaudited'
                            ? 'Kräver offert — Arvo gör en manuell genomgång'
                            : 'Kräver offert — volymdata behövs.'}
                  </strong>
                  <p>
                    {result.recommendation?.clickRateAnalysis
                      ? 'Klickpriset är fastslaget. Fyll i nedan så beräknar Arvo det exakta beloppet inklusive maskinleasing.'
                      : (result.recommendation?.netSaving ?? 0) > 0
                        ? 'Fyll i era uppgifter — Arvo begär in och sammanställer offerter från rikstäckande avfallspartners.'
                        : result.recommendation?.m365Equivalent
                          ? 'Vi jämför referensen ovan mot ert faktiska Google-pris och tar fram en exakt besparing i offerten.'
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
                    Ni betalar {formatNum(optSaving)} kr/år för en tjänst som redan ingår i er licens
                    {' '}· Arvos besparingsarvode {formatKr(optArvoFee)} (20 %)
                  </span>
                </SavingsBlock>
              </>
            ) : result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 ? (
              <>
                {(() => {
                  const isRealPrice = _effectiveMeta.isRealPrice;
                  const isLicensePending = result.categorized.licensePending;
                  const partnerLabel = _effectiveMeta.partnerLabel;
                  const _suggestedLower = (result.recommendation.suggestedSupplier ?? '').toLowerCase().trim();
                  const _currentLower = (result.categorized?.normalizedSupplier ?? result.extracted?.supplier ?? '').toLowerCase().trim();
                  const _isSameSupplier = isRealPrice && _suggestedLower && _currentLower && (
                    _suggestedLower === _currentLower ||
                    _suggestedLower.includes(_currentLower) ||
                    _currentLower.includes(_suggestedLower)
                  );
                  const partnerCtaLabel = _isSameSupplier
                    ? `Sänk er ${result.recommendation.suggestedSupplier}-kostnad`
                    : isRealPrice ? 'Aktivera bytet' : 'Säkra besparingen';
                  return (
                    <>
                      {diagInsight && (
                        <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                          <div className="gauge-wrap">
                            <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                              <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E9F1ED" strokeWidth="4.5" />
                              <circle
                                cx="30" cy="30" r={GAUGE_R} fill="none"
                                stroke={diagC.dot} strokeWidth="4.5" strokeLinecap="round"
                                strokeDasharray={animGaugeReady ? `${(animScoreVal / 100) * GAUGE_C} ${GAUGE_C}` : `0 ${GAUGE_C}`}
                                style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)' }}
                              />
                            </svg>
                            <div className="gauge-num" style={{ color: diagC.dot }}>
                              <span className="gauge-val">{animScoreVal}</span>
                              <span className="gauge-denom">/100</span>
                            </div>
                          </div>
                          <div className="diag-body">
                            <div className="diag-top">
                              <span className="diag-score-label">Arvo Score™</span>
                              <span className="diag-sep">·</span>
                              <span className="diag-status">
                                <Icon name="alert-circle" size={13} color={diagC.dot} stroke={2} />
                                <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                              </span>
                            </div>
                            <p className="diag-text">{diagInsight}</p>
                          </div>
                        </ScoreDiag>
                      )}
                      <SavingsBlock>
                        <span className="kicker">
                          {isLicensePending ? 'Möjlig årlig besparing' : 'Din identifierade nettobesparing'}
                        </span>
                        <span className="amount">+{formatKr(animatedNet)}</span>
                        <span className="unit">
                          {isLicensePending
                            ? 'Försäkring kräver FI-licens — vi byter inte själva ännu, men visar gapet.'
                            : isRealPrice && result.recommendation.suggestedSupplier
                              ? (
                                <>
                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år hos <strong>{result.recommendation.suggestedSupplier}</strong>
                                  {' '}· Arvos besparingsarvode {formatKr(adjArvoFee)} (20 %)
                                  {hasHwAdj && <><br /><small style={{ opacity: 0.85 }}>Avser abonnemang och licenser. Om {result.recommendation.suggestedSupplier} absorberar er hårdvaruskuld ({formatNum(_hwTotalRemain)} kr) uppgår nettobesparing till {formatKr(result.recommendation.netSaving)} kr/år.</small></>}
                                </>
                              )
                              : (
                                <>
                                  {formatNum(adjAnnualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år (Arvos kalkylerade riktpris)
                                  {' '}· Arvos besparingsarvode {formatKr(adjArvoFee)} (20 %)
                                </>
                              )}
                        </span>
                      </SavingsBlock>
                      {!isLicensePending && (
                        <PriceNote $compact>
                          {_effectiveMeta.benchmarkType === 'list-verified'
                            ? 'Priset baseras på verifierade offentliga listpriser hos ledande leverantörer. Vid genomfört byte bekräftas slutpriset i offert innan ni godkänner.'
                            : (_effectiveMeta.benchmarkNote ?? 'Uppskattad besparing baserad på Arvos branschdata — exakt utfall via offert från Arvo-verifierad partner.')}
                        </PriceNote>
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
                {/* Inget prisgap = ett BESKED, inte ett tomt kort. En finansdirektör
                    som granskat och funnit avtalet bra säger det — och bevakar. */}
                <NoSwitchBlock style={{ marginTop: 0 }}>
                  <strong>Väl förhandlat.</strong>{' '}
                  {result.recommendation?.monitoringNote
                    ?? 'Vi hittar inget prisgap mot marknadens bästa förhandlade nivå — Arvo rekommenderar inget byte i dag.'}
                </NoSwitchBlock>
                {!result.recommendation?.shouldSwitch && result.recommendation?.reasoning && (
                  <Reasoning>
                    <span className="kicker">Arvo bedömer</span>
                    <p>
                      {getCategoryMeta(result.categorized.category).isRealPrice
                        ? result.recommendation.reasoning
                        : redactSupplier(
                            result.recommendation.reasoning,
                            result.recommendation.suggestedSupplier,
                          )}
                    </p>
                  </Reasoning>
                )}
              </>
            )}

            {result.recommendation?.reasoning && result.recommendation?.shouldSwitch && !isOptimize && !_isSecondaryOnlySwitch && (
              <Reasoning>
                <span className="kicker">Arvo bedömer</span>
                <p>
                  {getCategoryMeta(result.categorized.category).isRealPrice
                    ? result.recommendation.reasoning
                    : redactSupplier(
                        result.recommendation.reasoning,
                        result.recommendation.suggestedSupplier,
                      )}
                </p>
              </Reasoning>
            )}

            {result.recommendation?.shouldSwitch && !isOptimize && (() => {
              const sc = result.extracted?.seatCount;
              const emp = Number(employees);
              const overage = sc != null && sc > emp ? sc - emp : 0;
              const _om = getCategoryMeta(result.categorized?.category);
              return overage > 0 ? (
                <LicenseOverageBlock
                  seatCount={sc}
                  employees={emp}
                  overage={overage}
                  term={_om.unit}
                  termSing={_om.unitSingular}
                />
              ) : null;
            })()}

            {/* ── Fakturaunderlag — dolt som standard, öppnas på begäran ──────── */}
            <CalcToggle onClick={() => setDetailsOpen(o => !o)}>
              {detailsOpen ? '↑ Dölj underlag' : '↓ Hur vi räknar'}
            </CalcToggle>

            {detailsOpen && <>

            {result.route === 'auto' && !result.categorized?.licensePending && !(result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 && !isOptimize) && (
              <PriceNote>
                {_effectiveMeta.benchmarkType === 'list-verified'
                  ? 'Priset baseras på verifierade offentliga listpriser hos ledande leverantörer. Vid genomfört byte bekräftas slutpriset i offert innan ni godkänner.'
                  : (_effectiveMeta.benchmarkNote ?? 'Uppskattad besparing baserad på Arvos branschdata — exakt utfall via offert från Arvo-verifierad partner.')}
              </PriceNote>
            )}
            {result.route === 'auto' && !result.categorized?.licensePending && !_effectiveMeta.isRealPrice && result.savingRange && (
              <SavingRangeBadge>
                <span className="range-label">Intervall:</span>
                {formatNum(result.savingRange.low)} – {formatNum(result.savingRange.high)} kr/år netto
              </SavingRangeBadge>
            )}
            {result.route === 'auto' && !result.categorized?.licensePending && result.calculationChain && (
              <CalculationChainBlock cc={result.calculationChain} />
            )}
            {result.extracted?.potentialMixedCategories && (
              <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 14, lineHeight: 1.5, fontStyle: 'italic' }}>
                {_secSaving ? (
                  <>
                    Kombinerad faktura —{' '}
                    {getCategoryMeta(result.categorized?.category).label}
                    {result.extracted?.primaryComponentMonthly != null
                      ? ` (${formatKr(result.extracted.primaryComponentMonthly * 12)}/år)`
                      : ''}
                    {' '}+ {_secLabel} ({formatKr(_secSaving.currentAnnual)}/år).
                    {' '}Besparing:{' '}
                    {getCategoryMeta(result.categorized?.category).label}
                    {' '}−{formatKr(_primGross)}/år{' '}|{' '}
                    {_secLabel} −{formatKr(_secSaving.grossSaving)}/år.
                  </>
                ) : (
                  <>
                    Kombinerad faktura — analysen avser{' '}
                    {getCategoryMeta(result.categorized?.category).label}
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
                <dt>Ni betalar idag</dt>
                <dd>
                  {formatKr(adjAnnualCost)} / år
                  {hasHwAdj
                    ? <small>Abonnemang och licenser. Exkl. hårdvaruavbetalningar ({formatKr(_hwAnnualCost)}/år){result.extracted.variableCharges > 0 ? ` och rörliga avgifter (${formatKr(result.extracted.variableCharges)} denna period)` : ''}.</small>
                    : result.extracted.variableCharges > 0 && (
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
              {_hwItems.length > 0 && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <CreditAlert>
                    <strong>⚠ Aktiv hårdvaruleasing — kontrollera innan ni byter</strong>
                    <p>
                      {_hwItems.map((h, i) => (
                        <span key={i} style={{ display: 'block', marginBottom: _hwItems.length > 1 && i < _hwItems.length - 1 ? '6px' : 0 }}>
                          {h.description} — {h.monthsRemaining} månader kvar ({formatNum(h.monthlyCost)} kr/mån = <strong>{formatNum(h.remainingCost)} kr totalt</strong>)
                        </span>
                      ))}
                      {_hwItems.length > 1 && (
                        <span style={{ display: 'block', marginTop: '6px', fontWeight: 700 }}>
                          Totalt kvar att betala: {formatNum(_hwTotalRemain)} kr
                        </span>
                      )}
                    </p>
                    {hasHwAdj && adjGrossSaving > 0 && (() => {
                      const breakEvenYears = (_hwTotalRemain / adjGrossSaving).toFixed(1).replace('.', ',');
                      return (
                        <p style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                          <strong>Break-even om skulden löses kontant:</strong>{' '}
                          {formatNum(_hwTotalRemain)} kr ÷ {formatNum(adjGrossSaving)} kr/år = <strong>{breakEvenYears} år</strong>{' '}—{' '}
                          fråga {result.recommendation?.suggestedSupplier ?? 'den nya leverantören'} om de kan absorbera skulden vid avtalssignering. Om ja är besparingen {formatKr(result.recommendation.netSaving)} kr/år netto från dag ett.
                        </p>
                      );
                    })()}
                  </CreditAlert>
                </div>
              )}
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
                      {getCategoryMeta(result.categorized?.category).variableChargeNote
                        ?? 'Rörliga avgifter denna period — ej inkluderat i årsberäkningen.'}
                    </small>
                    {result.categorized?.category === 'mobil' && (() => {
                      const zone = result.extracted.roamingZone;
                      const recurring = result.extracted.recurringAmount ?? 0;
                      const variable = result.extracted.variableCharges ?? 0;
                      if (variable < Math.max(recurring * 0.3, 1000)) return null;
                      if (zone >= 4) return (
                        <RoamingInsight $type="satellite">
                          <Icon name="globe" size={14} />
                          <span>Satellit- och maritim datatrafik (Zon 4) är teknikberoende — kan inte optimeras via operatörsbyte och ingår inte i Arvos besparing.</span>
                        </RoamingInsight>
                      );
                      return (
                        <RoamingInsight>
                          <Icon name="info" size={14} />
                          <span>Roamingkostnader på {formatKr(variable)} denna period. Om detta är återkommande kan ett mobilavtal med bättre EU-datapaket minska kostnaden — Arvo tittar på detta vid ett leverantörsbyte.</span>
                        </RoamingInsight>
                      );
                    })()}
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

            {result.recommendation?.shelfware && (() => {
              // Licensrevision: fristående (oberoende av leverantörsbyte). Visar revisorsfrågan,
              // tar kundens svar, och visar det backend-omräknade svinnet live. Inga kr räknas i
              // klienten — allt kommer färdigt från /api/recompute-shelfware (regel 2).
              const swBase = result.recommendation.shelfware;
              const swEff = shelfwareOverride !== null ? shelfwareOverride : swBase;
              const submitted = shelfwareOverride !== null;
              const cardStyle = { gridColumn: '1 / -1', marginTop: '14px', padding: '16px 18px', background: '#F1F6F3', border: '1px solid #BFD8D0', borderRadius: '12px' };
              const headStyle = { fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1B7A6E', marginBottom: '8px' };

              // Bekräftat svinn (efter kundens svar)
              if (submitted && swEff && !swEff.cleared && swEff.annualWaste > 0) {
                return (
                  <div style={cardStyle}>
                    <div style={headStyle}>Licensrevision — bekräftat</div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                      <strong>{swEff.confirmedIdle} bekräftat oanvända platser</strong> à {swEff.perSeatMonthly} kr/plats/mån
                      {' '}= <strong style={{ color: '#1B7A6E' }}>{formatKr(swEff.annualWaste)} kr/år</strong> i verifierat svinn att avveckla.
                    </p>
                  </div>
                );
              }
              // Allt förklarat → ingen åtgärd (återförsäkran, inte anklagelse)
              if (submitted) {
                return (
                  <div style={cardStyle}>
                    <div style={headStyle}>Licensrevision — klar</div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                      Tack — då är överskottet förklarat. Vi flaggar inget svinn på era licenser.
                    </p>
                  </div>
                );
              }
              // Review-läge: ställ frågan + input + bekräfta
              if (!swBase.needsReview) return null;
              return (
                <div style={cardStyle}>
                  <div style={headStyle}>Licensrevision — vi behöver er bekräftelse</div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                    {swBase.reviewPrompt}
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#5C6E68' }}>
                    Om de står oanvända motsvarar det upp till {formatKr(swBase.potentialAnnualWaste)} kr/år.
                    Vi räknar ingen besparing förrän ni bekräftat — siffror utan källa visar vi aldrig.
                  </p>
                  <form onSubmit={submitShelfwareReview} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
                    <label htmlFor="shelfware-exc" style={{ fontSize: '13px', color: '#0E1A17' }}>
                      Hur många av de {swBase.unverifiedGap} används till annat?
                    </label>
                    <input
                      id="shelfware-exc"
                      type="number" min="0" max={swBase.unverifiedGap} inputMode="numeric"
                      value={shelfwareExceptions}
                      onChange={(e) => setShelfwareExceptions(e.target.value)}
                      placeholder="0"
                      style={{ width: '72px', padding: '7px 9px', fontSize: '14px', border: '1px solid #BFD8D0', borderRadius: '8px', background: '#fff' }}
                    />
                    <button
                      type="submit" disabled={shelfwareState === 'submitting'}
                      style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#fff', background: '#1B7A6E', border: 'none', borderRadius: '8px', cursor: 'pointer', opacity: shelfwareState === 'submitting' ? 0.6 : 1 }}
                    >
                      {shelfwareState === 'submitting' ? 'Räknar…' : 'Bekräfta'}
                    </button>
                  </form>
                  {shelfwareState === 'error' && (
                    <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#B4341F' }}>Något gick fel — försök igen.</p>
                  )}
                </div>
              );
            })()}

            {result.recommendation?.fortnoxRightsizing && (() => {
              // Rätt-storleks-rådgivning för Fortnox. Alla tal kommer färdiga från backend
              // (verifierad publik prisskillnad) — klienten räknar inget (regel 2).
              const rs = result.recommendation.fortnoxRightsizing;
              return (
                <div style={{ gridColumn: '1 / -1', marginTop: '14px', padding: '16px 18px', background: '#F1F6F3', border: '1px solid #BFD8D0', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1B7A6E', marginBottom: '8px' }}>
                    Rätt-storlek — {rs.vendor}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                    Ni betalar för <strong>{rs.vendor} {rs.currentPaket}</strong> ({rs.currentMonthly} kr/mån). Nivån under,{' '}
                    <strong>{rs.targetPaket}</strong> ({rs.targetMonthly} kr/mån), är {rs.deltaMonthly} kr/mån billigare.
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#5C6E68' }}>
                    Ryms er användning (moduler, antal användare, verifikationsvolym) i {rs.targetPaket}? Då realiserar vi upp till{' '}
                    <strong style={{ color: '#1B7A6E' }}>{formatKr(rs.annualSaving)} kr/år</strong>. Verifierad prisskillnad mot
                    Fortnox publika listpris — vi visar ingen siffra vi inte kan stå för.
                  </p>
                </div>
              );
            })()}
            {result.recommendation?.m365Rightsizing && (() => {
              // M365 rätt-storlek (E3/E5 → Business Premium för SMF). Advisory/review: den verifierade
              // prisskillnaden visas, men realiseras först när kunden bekräftat funktionsbehovet.
              // Alla tal kommer färdiga från backend (verifierat publikt listpris) — klienten räknar inget.
              const rs = result.recommendation.m365Rightsizing;
              return (
                <div style={{ gridColumn: '1 / -1', marginTop: '14px', padding: '16px 18px', background: '#F1F6F3', border: '1px solid #BFD8D0', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1B7A6E', marginBottom: '8px' }}>
                    Rätt-storlek — Microsoft 365 (rådgivning)
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                    Ni betalar för <strong>{rs.currentLabel}</strong> ({rs.currentPerSeatLabel} kr/anv/mån) — full enterprise-svit.{' '}
                    <strong>{rs.targetLabel}</strong> ({rs.targetPerSeatLabel} kr/anv/mån) ger Intune MDM + Defender, säkerheten de flesta SMF behöver.
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#5C6E68' }}>
                    Kräver ni inte {rs.currentTier.toUpperCase()}:s enterprise-funktioner (compliance, eDiscovery)? Då realiserar vi upp till{' '}
                    <strong style={{ color: '#1B7A6E' }}>{rs.annualSavingLabel} kr/år</strong> för era {rs.seats} användare. Verifierad prisskillnad mot
                    Microsofts publika listpris — vi visar ingen siffra vi inte kan stå för.
                  </p>
                </div>
              );
            })()}
            {result.recommendation?.molnvaxel && (() => {
              // Molnväxel: kundens faktiska per-användare-kostnad (exkl moms) mot Telias verifierade
              // instegsgolv + verifierade tilläggspriser. Alla tal från backend — klienten räknar inget.
              // Stapelbredderna nedan är ren layout (andel av maxvärdet), inte kundsynliga siffror.
              const mv = result.recommendation.molnvaxel;
              const addonsWithPrice = (mv.addons || []).filter((a) => a.monthlyExVat != null);
              const hasFloor = !mv.bundled && mv.teliaFloorLabel != null && mv.teliaFloor != null;
              const over = mv.overFloorPct != null && mv.overFloorPct >= 30;
              const scaleMax = Math.max(mv.perUserMonthlyExVat || 0, mv.teliaFloor || 0) || 1;
              const youW = Math.max(6, Math.round(((mv.perUserMonthlyExVat || 0) / scaleMax) * 100));
              const floorW = Math.max(6, Math.round(((mv.teliaFloor || 0) / scaleMax) * 100));
              return (
                <AdvisoryCard $over={over}>
                  <div className="adv-top">
                    <span className="adv-eyebrow">Företagsväxel · {mv.tierLabel}-nivå</span>
                    <span className="adv-badge">Verifierad referens</span>
                  </div>

                  <div className="adv-figure">
                    {mv.perUserLabel} kr
                    <span className="unit">per användare/mån · exkl moms · {mv.seats} användare</span>
                  </div>

                  {hasFloor && (
                    <div className="adv-compare">
                      <div className="adv-bar you">
                        <span className="lbl">Ni betalar</span>
                        <span className="track"><span className="fill" style={{ width: `${youW}%` }} /></span>
                        <span className="amt">{mv.perUserLabel} kr</span>
                      </div>
                      <div className="adv-bar floor">
                        <span className="lbl">Telia-golv</span>
                        <span className="track"><span className="fill" style={{ width: `${floorW}%` }} /></span>
                        <span className="amt">{mv.teliaFloorLabel} kr</span>
                      </div>
                    </div>
                  )}

                  {mv.bundled ? (
                    <span className="adv-pill neutral">Buntat pris — jämförs i genomgång, inte mot golv</span>
                  ) : hasFloor ? (
                    over ? (
                      <span className="adv-pill warn">~{mv.overFloorPct} % över Telias instegsgolv</span>
                    ) : (
                      <span className="adv-pill ok">I nivå med marknadens instegsväxel</span>
                    )
                  ) : (
                    <span className="adv-pill neutral">Kontaktcenter — pris sätts via offert</span>
                  )}

                  <p className="adv-prose">
                    {mv.bundled ? (
                      <>Priset buntar växel <strong>och</strong> mobilabonnemang (inkl. surf) — inte direkt jämförbart med en ren växellicens. Vi jämför mot ert faktiska pris i en genomgång istället för en missvisande siffra.</>
                    ) : hasFloor ? (
                      <>Telia Smart Connect — marknadens instegsväxel för motsvarande nivå — kostar <strong>från {mv.teliaFloorLabel} kr/anv/mån</strong> (exkl moms){over ? <>. Glappet är värt en offertjämförelse.</> : <>. Ni ligger redan rätt — vi bevakar att det förblir så.</>}</>
                    ) : (
                      <>På kontaktcenter-nivå sätter leverantörerna pris via offert — vi jämför mot er faktiska kostnad i en genomgång.</>
                    )}
                  </p>

                  {addonsWithPrice.length > 0 && (
                    <p className="adv-addons">
                      Ni betalar för {addonsWithPrice.map((a) => `${a.label} (${a.monthlyExVat} kr/mån)`).join(', ')} — bekräfta att de används, annars är det ren besparing.
                    </p>
                  )}

                  <div className="adv-foot">
                    Telias instegspris exkl moms verifierat mot telia.se. ”Från”-pris = golv; exakt jämförelse mot er bransch görs när underlaget räcker.
                  </div>
                </AdvisoryCard>
              );
            })()}

            {result.recommendation?.adobeRightsizing && (() => {
              // Adobe rätt-storlek (Alla program → Single App). Advisory/review: verifierad EXKL-moms
              // prisskillnad (team direkt / individ ÷1,25). Alla tal färdiga från backend — klienten räknar inget.
              const rs = result.recommendation.adobeRightsizing;
              return (
                <div style={{ gridColumn: '1 / -1', marginTop: '14px', padding: '16px 18px', background: '#F1F6F3', border: '1px solid #BFD8D0', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#1B7A6E', marginBottom: '8px' }}>
                    Rätt-storlek — Adobe Creative Cloud (rådgivning)
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#0E1A17' }}>
                    Ni betalar för <strong>{rs.currentLabel}</strong> ({rs.currentMonthlyLabel} {rs.unit} exkl moms) — hela sviten.{' '}
                    Använder era användare i praktiken bara <strong>ett program</strong>? Då räcker <strong>{rs.targetLabel}</strong> ({rs.targetMonthlyLabel} {rs.unit} exkl moms).
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#5C6E68' }}>
                    {rs.annualSavingLabel
                      ? <>Bekräfta så realiserar vi upp till <strong style={{ color: '#1B7A6E' }}>{rs.annualSavingLabel} kr/år</strong> för era {rs.seats} licenser. </>
                      : <>Bekräfta antal licenser så räknar vi hem beloppet. </>}
                    Verifierad prisskillnad mot Adobes publika listpris (adobe.com/se) — vi visar ingen siffra vi inte kan stå för.
                  </p>
                </div>
              );
            })()}

            {result.recommendation?.loneadminRightsizing && (() => {
              // Löneadmin: kundens faktiska per-anställd-kostnad (exkl moms) mot Fortnox Löns verifierade
              // golv (199 + 25/anställd). Alla tal från backend — klienten räknar inget (regel 2).
              // Stapelbredderna är ren layout (andel av maxvärdet), inte kundsynliga siffror.
              const la = result.recommendation.loneadminRightsizing;
              const over = la.aboveFloor && la.overFloorPct != null && la.overFloorPct >= 15;
              const scaleMax = Math.max(la.perEmployeeMonthly || 0, la.floorPerEmployee || 0) || 1;
              const youW = Math.max(6, Math.round(((la.perEmployeeMonthly || 0) / scaleMax) * 100));
              const floorW = Math.max(6, Math.round(((la.floorPerEmployee || 0) / scaleMax) * 100));
              return (
                <AdvisoryCard $over={over}>
                  <div className="adv-top">
                    <span className="adv-eyebrow">Löneadministration · per anställd</span>
                    <span className="adv-badge">Verifierad referens</span>
                  </div>

                  <div className="adv-figure">
                    {la.perEmployeeLabel} kr
                    <span className="unit">per anställd/mån · exkl moms · {la.headcount} anställda</span>
                  </div>

                  <div className="adv-compare">
                    <div className="adv-bar you">
                      <span className="lbl">Ni betalar</span>
                      <span className="track"><span className="fill" style={{ width: `${youW}%` }} /></span>
                      <span className="amt">{la.perEmployeeLabel} kr</span>
                    </div>
                    <div className="adv-bar floor">
                      <span className="lbl">Fortnox-golv</span>
                      <span className="track"><span className="fill" style={{ width: `${floorW}%` }} /></span>
                      <span className="amt">{la.floorPerEmployeeLabel} kr</span>
                    </div>
                  </div>

                  {la.alreadyFortnox ? (
                    <span className="adv-pill neutral">Redan på Fortnox Löns verifierade nivå</span>
                  ) : over ? (
                    <span className="adv-pill warn">~{la.overFloorPct} % över Fortnox-golvet</span>
                  ) : (
                    <span className="adv-pill ok">I nivå med Fortnox-golvet</span>
                  )}

                  <p className="adv-prose">
                    {la.alreadyFortnox ? (
                      <>Ni ligger redan på Fortnox Löns verifierade nivå — vi bevakar att det förblir så.</>
                    ) : la.aboveFloor ? (
                      <><strong>{la.fortnoxProduct}</strong> — verifierat lägst — kostar 199 kr/mån + 25 kr/anställd. Ryms er lönehantering (kollektivavtal, integrationer) där? Bekräfta så realiserar vi upp till <strong>{formatKr(la.annualSaving)} kr/år</strong>.</>
                    ) : (
                      <>Ni ligger i nivå med Fortnox Löns verifierade golv — ni ligger rätt, vi bevakar.</>
                    )}
                  </p>

                  {la.hasPayslip && (
                    <p className="adv-addons">
                      Lönebesked-/utskicksavgifter (Kivra) är rörliga och ingår inte i golvjämförelsen.
                    </p>
                  )}

                  <div className="adv-foot">
                    Fortnox Löns listpris exkl moms verifierat mot fortnox.se. Golvet är ett fast pris; exakt utfall beror på om behovet ryms i Fortnox Lön.
                  </div>
                </AdvisoryCard>
              );
            })()}

            {result.recommendation?.reasoning && (isOptimize || _isSecondaryOnlySwitch) && (
              <Reasoning>
                <span className="kicker">{isOptimize ? 'Vad vi hittade' : 'Kombinerad analys'}</span>
                <p>
                  {getCategoryMeta(result.categorized.category).isRealPrice
                    ? result.recommendation.reasoning
                    : redactSupplier(
                        result.recommendation.reasoning,
                        result.recommendation.suggestedSupplier,
                      )}
                </p>
              </Reasoning>
            )}

            {result.categorized?.category === 'saas-productivity' &&
             (result.recommendation?.tierOptimizationSaving ?? 0) > 0 && (
              <TierOptAccordion>
                <button
                  className="acc-trigger"
                  onClick={() => setTierOptOpen(o => !o)}
                  aria-expanded={tierOptOpen}
                >
                  <span className="acc-icon">⚡</span>
                  <span className="acc-label-group">
                    <span className="acc-label">Licensoptimering</span>
                    {!tierOptOpen && <span className="acc-hint">Klicka för att se detaljer →</span>}
                  </span>
                  <span className="acc-amount">ytterligare +{formatNum(Math.round(result.recommendation.tierOptimizationSaving * 0.80))}&nbsp;kr/år netto</span>
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
                    <div className="acc-combined">
                      <span className="acc-combined-label">Totalt om ni gör båda åtgärderna</span>
                      <span className="acc-combined-amount">
                        ca +{formatNum((result.recommendation.netSaving ?? 0) + Math.round(result.recommendation.tierOptimizationSaving * 0.80))}&nbsp;kr/år netto
                      </span>
                    </div>
                    <div className="acc-cta">
                      <Button as={Link} to="/connect" $variant="gradient" $size="sm">
                        Inkludera i bytet →
                      </Button>
                    </div>
                  </div>
                )}
              </TierOptAccordion>
            )}

            </>} {/* end detailsOpen */}

          </Card>

          {/* ── Arvo Switch — Layer 2 · 20 % av realiserad besparing ────────── */}
          {_showSwitch && (
            <SwitchCard>
              <div className="switch-eyebrow">Arvo Switch</div>
              <h3>Priset är verifierat. Arvo förbereder bytet.</h3>
              <p className="sub">
                Priset är leverantörens officiella avtalspris — verifierat och tillgängligt
                utan förhandling. Ni behöver inte kontakta er nuvarande leverantör — Arvo
                förbereder hela bytet.
              </p>
              <div className="switch-steps">
                <div className="switch-step">
                  <span className="step-num">1</span>
                  <span className="step-body">
                    <span className="step-title">Ni aktiverar bytet</span>
                    <span className="step-detail">Ett klick — Arvo tar det därifrån.</span>
                  </span>
                </div>
                <div className="switch-step">
                  <span className="step-num">2</span>
                  <span className="step-body">
                    <span className="step-title">Arvo förbereder allt</span>
                    <span className="step-detail">Fullmakt och bytesplan i er inkorg inom 24 timmar — ni granskar och signerar.</span>
                  </span>
                </div>
                <div className="switch-step">
                  <span className="step-num">3</span>
                  <span className="step-body">
                    <span className="step-title">Nytt avtalspris aktivt</span>
                    <span className="step-detail">Ni betalar 20&nbsp;% av den identifierade besparingen — inget annat.</span>
                  </span>
                </div>
              </div>
              <div className="switch-offer">
                <div className="switch-offer-head">
                  <span className="switch-badge">
                    <Icon name="check" size={13} stroke={2.5} />
                  </span>
                  <div className="switch-supplier">
                    <p className="switch-supplier-name">
                      {_switchIsRealPrice
                        ? result.recommendation.suggestedSupplier
                        : _switchPartnerLabel}
                    </p>
                    <span className="switch-price-label">
                      <Icon name="shield" size={10} stroke={2} />
                      {_switchIsRealPrice ? 'Verifierat listpris' : 'Arvo-verifierad leverantör'}
                    </span>
                  </div>
                </div>
                <div className="switch-offer-body">
                  <div className="sp-from-row">
                    <span className="sp-old">{formatKr(adjAnnualCost)}/år</span>
                    <span className="sp-from-arrow">→</span>
                  </div>
                  <span className="sp-new">
                    {formatNum(result.recommendation.suggestedAnnualCost)}<small>kr/år</small>
                  </span>
                  <span className="sp-save-note">
                    Ni sparar {formatKr(adjGrossSaving)}/år — Arvo tar 20&nbsp;% av det
                  </span>
                </div>
              </div>
              <Button
                type="button"
                $variant="gradient"
                $size="lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { setModalEmail(gateEmail || ''); setModalEmailState('idle'); setModalOpen(true); }}
              >
                {_switchCtaLabel} <Icon name="arrow" size={16} />
              </Button>
            </SwitchCard>
          )}

          {/* ── Minimal feedback ─────────────────────────────────────────── */}


          {/* ── Arvo Intelligence — relation, inte produkt ───────────────────── */}
          <IntelligenceCard>
            <div className="eyebrow">Arvo Intelligence</div>
            <h3>Det här var en faktura.</h3>

            <div className="briefing-preview">
              <div className="preview-header">
                <span>
                  <span className="preview-live-dot" />
                  <span className="preview-brand-name">Arvo Intelligence</span>
                </span>
                <span className="preview-time">Exempel ur en briefing</span>
              </div>

              <div className="signal">
                <div className="signal-ico">
                  <Icon name="pulse" size={14} stroke={2} />
                </div>
                <div>
                  <span className="signal-tag">Smyghöjningslarm</span>
                  <div className="signal-line">
                    Telia · Mobilflotta 24 abonnemang
                    <span className="signal-badge">+11&nbsp;%</span>
                  </div>
                  <p className="signal-sub">Pris höjt mot föregående period — utan avisering. Så här ser larmet ut när det händer er.</p>
                </div>
              </div>

              <div className="signal">
                <div className="signal-ico">
                  <Icon name="benchmark" size={14} stroke={2} />
                </div>
                <div>
                  <span className="signal-tag">Community Benchmark</span>
                  <div className="bench-grid">
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
                      <span
                        key={i}
                        className={[0,2,3,5,8,9,11,13].includes(i) ? 'on' : ''}
                      />
                    ))}
                  </div>
                  <p className="signal-sub">
                    <strong>8 av 15</strong> bolag i samma kohort fick höjningen — Arvo ser mönstret innan det når er.
                  </p>
                </div>
              </div>

              <div className="signal">
                <div className="signal-ico">
                  <Icon name="calendar-clock" size={14} stroke={2} />
                </div>
                <div>
                  <span className="signal-tag">Proaktiv avtalsbevakning</span>
                  <div className="signal-line">
                    Avtalsbevakning · varnar 90 dagar före förnyelse
                    <span className="signal-badge signal-badge--contract">Förnyelse</span>
                  </div>
                  <p className="signal-sub">Arvo varnar automatiskt — och förhandlar på er begäran.</p>
                </div>
              </div>
            </div>

            <div className="price-row">
              <div>
                <span className="price">1 995 kr</span>
                <span className="price-period">/ mån</span>
              </div>
              <span className="price-note">Ingen bindningstid</span>
            </div>

            <Button
              type="button"
              $variant="gradient"
              $size="lg"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setActivationEmail(gateEmail ?? '');
                setActivationStatus('idle');
                setActivationOpen(true);
              }}
            >
              Aktivera Arvo Intelligence →
            </Button>
            <p style={{ fontSize: 12, color: '#8A9E98', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
              Arvo söker igenom er inkorg — ni behöver inte lyfta ett finger.
            </p>
          </IntelligenceCard>

          {/* ── Invoice Graph — den här fakturan är en nod i hela reskontran ── */}
          <PortfolioBridge>
            <div className="pb-eyebrow">Helhetsbilden</div>
            <h2 className="pb-head">
              Arvo bevakar åtta kostnadskategorier. Den här fakturan var en.
            </h2>
            <div className="pb-grid">
              {SEGMENTS.map((seg) => {
                const lit = seg.cats.includes(result.categorized?.category);
                return (
                  <div key={seg.label} className={`pb-seg${lit ? ' lit' : ''}`}>
                    <span className="pb-seg-ico">
                      <Icon name={seg.icon} size={20} stroke={1.8} />
                    </span>
                    <span className="pb-seg-label">{seg.short}</span>
                  </div>
                );
              })}
            </div>
            <div className="pb-foot">
              <p className="pb-note">
                En faktura säger en sak. Hela reskontran säger var ni faktiskt
                blöder. Vidarebefordra era leverantörsfakturor så kartlägger Arvo
                varje leverantör — och hittar varenda besparing, inte bara den här.
              </p>
              <Link to="/portfolio" className="pb-link">
                Kartlägg er reskontra <Icon name="arrow" size={15} stroke={2} />
              </Link>
            </div>
          </PortfolioBridge>

          {/* Diskret feedback — syns men kräver aktivt val */}
          <p style={{ textAlign: 'center', fontSize: 12, color: '#8A9E98', marginBottom: 8 }}>
            {feedbackState === 'sent' ? (
              <span style={{ color: '#1B7A6E' }}>✓ Noterat — vi justerar modellen</span>
            ) : (
              <>
                Felklassificerad faktura?{' '}
                <button
                  onClick={() => submitFeedback('down')}
                  disabled={feedbackState !== 'idle'}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, color: '#5C6E68', textDecoration: 'underline', textUnderlineOffset: 2, fontFamily: 'inherit' }}
                >
                  Berätta →
                </button>
              </>
            )}
          </p>
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
                    {result?.categorized?.category ? ` · ${getCategoryMeta(result.categorized.category).label ?? result.categorized.category}` : ''}
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
        <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); } }}>
          <ModalCard>
            <button className="close" onClick={() => { setModalOpen(false); }} aria-label="Stäng">×</button>

            {modalEmailState === 'sent' ? (
              <div className="sent-state">
                <span className="sent-icon"><Icon name="check" size={20} stroke={2.5} /></span>
                <p className="sent-title">
                  {_switchIsSameSupplier ? 'Optimeringen är aktiverad.' : 'Bytet är aktiverat.'}
                </p>
                <p className="sent-sub">
                  Arvo tar det härifrån — ni hör av oss inom 48 timmar.
                </p>
              </div>
            ) : (
              <>
                <p className="bk-title">Allt är förberett.<br />Er signatur aktiverar det.</p>

                <div className="bk-offer">
                  <div className="bk-offer-top">
                    <span className="bk-partner-name">
                      {_switchIsRealPrice
                        ? result.recommendation.suggestedSupplier
                        : _switchPartnerLabel}
                    </span>
                    <span className="bk-verified">
                      <Icon name="shield" size={10} stroke={2} />
                      {_switchIsRealPrice ? 'Verifierat listpris' : 'Arvo-verifierad leverantör'}
                    </span>
                  </div>
                  <div className="bk-price-row">
                    <span className="bk-from">{formatKr(adjAnnualCost)}/år</span>
                    <span className="bk-arrow">→</span>
                    <span className="bk-to">{formatNum(result.recommendation.suggestedAnnualCost)} kr/år</span>
                  </div>
                  <p className="bk-savings-row">
                    Ni sparar {formatKr(adjGrossSaving)} · Arvo {formatKr(adjArvoFee)}
                  </p>
                </div>

                {(gateEmail || modalEmail) ? (
                  <>
                    <p className="bk-email-confirm">Bekräftelse till: <strong>{gateEmail || modalEmail}</strong></p>
                    <Button
                      type="button"
                      $variant="gradient"
                      $size="lg"
                      $full
                      disabled={modalEmailState === 'submitting'}
                      onClick={submitModalEmail}
                    >
                      {modalEmailState === 'submitting' ? 'Aktiverar…' : <>Signera med BankID <Icon name="arrow" size={16} /></>}
                    </Button>
                  </>
                ) : (
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
                      {modalEmailState === 'submitting' ? 'Aktiverar…' : <>Signera med BankID <Icon name="arrow" size={16} /></>}
                    </Button>
                  </form>
                )}

                <p className="bk-fine-print">Du har 24 timmars ångerrätt.</p>
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
                  {result.extracted.supplier} · {getCategoryMeta(result.categorized?.category).label}
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

      {/* ── Activation Modal — Arvo Intelligence onboarding ───────────────── */}
      {activationOpen && (
        <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) setActivationOpen(false); }}>
          <ActivationCard>
            <button className="ac-close" onClick={() => setActivationOpen(false)} aria-label="Stäng">×</button>

            {activationStatus === 'sent' ? (
              /* ── Success state ── */
              <div className="ac-success">
                <div className="ac-check">✓</div>
                <h3>Briefing på väg</h3>
                <p className="ac-email-sent">{activationEmail || gateEmail}</p>
                <p className="ac-success-sub">
                  Er Arvo Intelligence-briefing för {result?.extracted?.supplier ?? 'er leverantör'} är skickad.
                  Koppla er inkorg så bevakar Arvo alla era leverantörsfakturor löpande.
                </p>
                <span className="ac-upgrade-label">Koppla er inkorg</span>
                <a
                  href={`/api/auth/gmail-init?email=${encodeURIComponent(activationEmail || gateEmail)}`}
                  className="ac-oauth-btn"
                  style={{ marginBottom: 9, display: 'flex' }}
                >
                  <span className="ac-provider-badge ac-provider-badge--google">G</span>
                  <span className="ac-oauth-label">Koppla Gmail</span>
                  <span className="ac-oauth-arrow">→</span>
                </a>
                <a
                  href={`/api/auth/outlook-init?email=${encodeURIComponent(activationEmail || gateEmail)}`}
                  className="ac-oauth-btn"
                  style={{ display: 'flex' }}
                >
                  <span className="ac-provider-badge ac-provider-badge--outlook">M</span>
                  <span className="ac-oauth-label">Koppla Outlook</span>
                  <span className="ac-oauth-arrow">→</span>
                </a>
                <p className="ac-privacy">Arvo läser bara faktura-mail — aldrig personlig korrespondens.</p>
              </div>
            ) : (
              /* ── Default state ── */
              <>
                <div className="ac-eyebrow">Arvo Intelligence</div>
                <h2 className="ac-heading">Arvo söker igenom er inkorg</h2>
                <p className="ac-sub">
                  Koppla Gmail eller Outlook — Arvo söker er inkorg efter leverantörsfakturor och
                  skickar er första fullständiga briefing inom en timme.
                </p>

                <a
                  href={`/api/auth/gmail-init?email=${encodeURIComponent(activationEmail || gateEmail)}`}
                  className="ac-oauth-btn"
                >
                  <span className="ac-provider-badge ac-provider-badge--google">G</span>
                  <span className="ac-oauth-label">Koppla Gmail</span>
                  <span className="ac-oauth-arrow">→</span>
                </a>
                <a
                  href={`/api/auth/outlook-init?email=${encodeURIComponent(activationEmail || gateEmail)}`}
                  className="ac-oauth-btn"
                >
                  <span className="ac-provider-badge ac-provider-badge--outlook">M</span>
                  <span className="ac-oauth-label">Koppla Outlook</span>
                  <span className="ac-oauth-arrow">→</span>
                </a>

                <div className="ac-divider">eller börja nu</div>

                <form onSubmit={handleActivate}>
                  <div className="ac-email-row">
                    <input
                      className="ac-email-input"
                      type="email"
                      placeholder="er@foretag.se"
                      value={activationEmail || gateEmail}
                      onChange={(e) => setActivationEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                    <Button
                      type="submit"
                      $variant="gradient"
                      $size="md"
                      disabled={activationStatus === 'submitting'}
                      style={{ flexShrink: 0 }}
                    >
                      {activationStatus === 'submitting' ? '…' : 'Skicka →'}
                    </Button>
                  </div>
                  {activationStatus === 'error' && (
                    <p style={{ fontSize: 12, color: '#C41E1E', marginTop: 8 }}>Något gick fel — försök igen.</p>
                  )}
                </form>

                <p className="ac-privacy">
                  Vi skickar er första Intelligence-briefing omedelbart — baserad på denna analys.
                  Arvo läser bara faktura-mail, aldrig personlig korrespondens.
                </p>
              </>
            )}
          </ActivationCard>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default TestaFaktura;
