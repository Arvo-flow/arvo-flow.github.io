// src/pages/Portfolio — Ert Arvo-kontor.
// Design: pixelidentisk med TestaFakturas resultatkort.
// Importerar BriefingHead, ScoreDiag, SavingsBlock, PriceNote, KV, Reasoning,
// IntelligenceCard och PortfolioBridge direkt ur TestaFaktura/styles.js (regel 6).

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { getCategoryMeta } from '../../lib/categoryMeta';
import {
  Page,
  Card,
  BriefingHead,
  ScoreDiag,
  SavingsBlock,
  PriceNote,
  KV,
  Reasoning,
  IntelligenceCard,
  PortfolioBridge,
} from '../TestaFaktura/styles';

// ─── konstanter ──────────────────────────────────────────────────────────────

const SEGMENTS = [
  { short: 'Skrivare',   icon: 'file',      cats: ['skrivarleasing', 'utrustningsleasing'] },
  { short: 'El',          icon: 'bolt',      cats: ['el'] },
  { short: 'Telefoni',    icon: 'phone',     cats: ['mobil', 'bredband', 'vaxel'] },
  { short: 'Programvara', icon: 'spark',     cats: ['saas-productivity', 'saas-creative', 'saas-crm', 'saas-finance', 'saas-other', 'serverhosting', 'faktura-tjanst'] },
  { short: 'IT',          icon: 'wifi',      cats: ['it-support'] },
  { short: 'Fordon',      icon: 'truck',     cats: ['leasing-bil', 'transport-frakt'] },
  { short: 'Kontor',      icon: 'briefcase', cats: ['kontorsmaterial', 'städ-rengöring', 'larm-bevakning', 'kortterminal', 'avfall-atervinning', 'bankavgifter'] },
  { short: 'Personal',    icon: 'shield',    cats: ['foretagshalsovard', 'loneadmin', 'forsakring-foretag', 'forsakring-ansvar'] },
];

const GENERIC_DOMAINS = new Set([
  'gmail.com','hotmail.com','outlook.com','yahoo.com','yahoo.se',
  'icloud.com','live.com','msn.com','me.com','proton.me','protonmail.com',
]);

// ─── helpers ────────────────────────────────────────────────────────────────

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

const fmtNum  = (n) => (n == null ? '–' : Math.round(n).toLocaleString('sv-SE'));
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) : '');

// Derivera företagsnamn ur e-post (business-domain → förnamet av domänen).
function companyFromEmail(email) {
  if (!email) return null;
  const domain = (email.split('@')[1] ?? '').toLowerCase();
  if (!domain || GENERIC_DOMAINS.has(domain)) return null;
  const name = domain.split('.')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// En leverantör = en rad. Senaste analysen är sanningen.
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

function computeArvoScore(suppliers) {
  if (!suppliers.length) return 0;
  const uniqueSegs = new Set(
    suppliers.map((s) => getCategoryMeta(s.latest.category)?.segment ?? -1).filter((x) => x >= 0)
  );
  const segmentScore  = Math.round((uniqueSegs.size / 8) * 65);
  const totalNet      = suppliers.reduce((sum, s) => sum + (s.latest.net_saving ?? 0), 0);
  const savingScore   = totalNet > 5000 ? 25 : totalNet > 0 ? 15 : 0;
  const completenessB = suppliers.length >= 5 ? 10 : suppliers.length >= 3 ? 5 : 0;
  return Math.min(100, segmentScore + savingScore + completenessB);
}

// Samma färgkodning som TestaFakturas diagC.
function scoreColors(score) {
  if (score < 45) return { dot: '#DC2626', label: 'Kritisk',           labelClr: '#991B1B' };
  if (score < 65) return { dot: '#D97706', label: 'Suboptimerat',      labelClr: '#92400E' };
  if (score < 80) return { dot: '#65A30D', label: 'Förbättringsläge',  labelClr: '#365314' };
  return            { dot: '#1B7A6E', label: 'Optimalt',          labelClr: '#0E4F47' };
}

// Per-leverantör diagScore — identisk logik med TestaFakturas.
function supplierDiagScore(a) {
  if (a.route === 'monitoring') return 72;
  if (!a.should_switch || !a.annual_cost || !a.suggested_annual_cost) {
    return a.annual_cost > 0 ? 82 : 50;
  }
  const ovPct = Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100);
  const raw   = Math.max(5, Math.round(100 - ovPct * 1.5));
  return (a.net_saving ?? 0) > 0 ? Math.min(raw, 79) : raw;
}

// Deterministisk "Arvo bedömer"-text baserad på lagrade fält (regel 2: kod räknar, AI tolkar).
function buildReasoning(a) {
  const meta  = getCategoryMeta(a.category);
  const label = meta?.label ?? a.category;
  if (a.route === 'monitoring') {
    return `Avtalet är tidsbegränsat. Arvo bevakar och initierar omförhandling inför förnyelsen — ni betalar konkurrenskraftigt till dess.`;
  }
  if (a.route === 'review_queue') {
    return `Kategorin kräver manuell granskning — Arvo inhämtar offert för exakt prisjämförelse. Ni kontaktas när det är klart.`;
  }
  if (a.should_switch && (a.net_saving ?? 0) > 0) {
    const ovPct = a.annual_cost > 0 && a.suggested_annual_cost > 0
      ? Math.round((a.annual_cost - a.suggested_annual_cost) / a.annual_cost * 100)
      : 0;
    return `Ni betalar${ovPct > 0 ? ` ${ovPct}% mer` : ' mer'} än verifierat marknadspris för ${label.toLowerCase()}. Arvo rekommenderar byte — ${fmtNum(a.gross_saving)} kr/år i bruttobesparing, ${fmtNum(a.net_saving)} kr/år netto efter Arvos arvode (20&nbsp;%).`;
  }
  return `Priset är konkurrenskraftigt mot verifierat marknadspris för ${label.toLowerCase()}. Arvo bevakar och hör av sig om läget förändras.`;
}

// ─── gauge (identisk med TestaFakturas ScoreDiag) ───────────────────────────

const GAUGE_R = 26;
const GAUGE_C = 2 * Math.PI * GAUGE_R;

function Gauge({ score, color }) {
  return (
    <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
      <circle
        cx="30" cy="30" r={GAUGE_R} fill="none"
        stroke={color} strokeWidth="4.5" strokeLinecap="round"
        strokeDasharray={`${(score / 100) * GAUGE_C} ${GAUGE_C}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  );
}

// ─── animationer ─────────────────────────────────────────────────────────────

const fadeUp = keyframes`from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); }`;
const spin   = keyframes`to { transform: rotate(360deg); }`;
const expand = keyframes`from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); }`;

// ─── layout ──────────────────────────────────────────────────────────────────

const Column = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  @media (min-width: 768px) { padding: 40px 28px 96px; }
`;

// ─── leverantörs­lista ───────────────────────────────────────────────────────

const SectionLabel = styled.h3`
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};
  margin: 28px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const SupplierList = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  margin-bottom: 20px;
`;

const SupplierOuter = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ $open, theme }) => $open ? theme.color.brandSoft : theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  overflow: hidden;
  box-shadow: ${({ $open }) => $open ? '0 4px 18px rgba(27,122,110,.1)' : '0 1px 3px rgba(14,26,23,.04)'};
  transition: border-color 0.18s, box-shadow 0.18s;
  animation: ${fadeUp} 0.4s ease both;
  position: relative;

  &::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
    background: ${({ $saving, theme }) =>
      $saving ? theme.color.brandGradient : theme.color.border};
    transition: background 0.2s;
  }
`;

const SupplierRow = styled.button`
  width: 100%; background: none; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px 14px 22px;
  text-align: left;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.color.bg}; }
  @media (max-width: 480px) { flex-wrap: wrap; }
`;

const SupplierInfo = styled.div`
  flex: 1; min-width: 0;
  h4 { font-family: ${({ theme }) => theme.font.display};
    font-size: 15.5px; font-weight: 600; letter-spacing: -0.005em;
    color: ${({ theme }) => theme.color.ink}; margin: 0 0 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  p { font-size: 11.5px; color: ${({ theme }) => theme.color.mutedSoft}; margin: 0; }
`;

const SupplierRight = styled.div`
  text-align: right; flex-shrink: 0; display: flex; align-items: center; gap: 12px;
  p.cost { font-size: 13px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
    margin: 0; font-feature-settings: 'tnum'; }
  @media (max-width: 480px) { width: 100%; text-align: left; gap: 8px; }
`;

const VerdictBadge = styled.span`
  display: inline-block; font-size: 11px; font-weight: 600;
  padding: 3px 10px; border-radius: 100px;
  ${({ $saving, theme }) => $saving
    ? `color: ${theme.color.brand}; background: ${theme.color.brandSoft};`
    : `color: ${theme.color.mutedSoft}; background: ${theme.color.bg}; border: 1px solid ${theme.color.border};`}
`;

const ChevronWrap = styled.span`
  flex-shrink: 0; color: ${({ theme }) => theme.color.mutedSoft};
  transition: transform 0.22s ease;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0)'};
  display: flex; align-items: center;
`;

const SupplierDetail = styled.div`
  padding: 0 22px 22px 22px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  animation: ${expand} 0.24s ease both;
`;

// ─── CTA-kort ────────────────────────────────────────────────────────────────

const CardLabel = styled.span`
  display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: ${({ theme }) => theme.color.brand}; margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display}; font-size: 19px; font-weight: 600;
  letter-spacing: -0.01em; color: ${({ theme }) => theme.color.ink}; margin: 0 0 7px;
`;

const CardBody = styled.p`
  font-size: 13.5px; line-height: 1.65; color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 16px;
`;

const AddressChip = styled.div`
  font-family: ${({ theme }) => theme.font.mono}; font-size: 13.5px; letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color.brand}; background: ${({ theme }) => theme.color.bg};
  border: 1px dashed ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 13px 16px; text-align: center; user-select: all;
`;

const FormRow = styled.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`;

const EmailInput = styled.input`
  flex: 1; padding: 11px 16px; border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg}; font-size: 14px; color: ${({ theme }) => theme.color.ink};
  outline: none; transition: border-color 0.15s;
  &:focus { border-color: ${({ theme }) => theme.color.brand}; }
  &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
`;

const SuccessMsg = styled.p`
  color: ${({ theme }) => theme.color.brand}; font-weight: 600; margin: 0; font-size: 14px;
`;
const ErrorHint = styled.p`
  font-size: 12px; color: ${({ theme }) => theme.color.inkSoft}; margin: 8px 0 0;
`;
const EmptyBody = styled.p`
  font-size: 14.5px; line-height: 1.7; color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 20px;
`;

// ─── loading / error ─────────────────────────────────────────────────────────

const SpinnerEl = styled.div`
  width: 30px; height: 30px; border: 3px solid ${({ theme }) => theme.color.border};
  border-top-color: ${({ theme }) => theme.color.brand}; border-radius: 50%;
  animation: ${spin} 0.7s linear infinite; margin: 80px auto;
`;
const ErrorMsg = styled.p`
  text-align: center; color: ${({ theme }) => theme.color.inkSoft}; font-size: 14px; padding: 48px 20px;
`;

// ─── expanderat leverantörskort ──────────────────────────────────────────────

function SupplierDetailPanel({ a }) {
  const score  = supplierDiagScore(a);
  const diagC  = scoreColors(score);
  const meta   = getCategoryMeta(a.category);
  const saving = (a.net_saving ?? 0) > 0 && a.should_switch;

  return (
    <SupplierDetail>
      <ScoreDiag style={{ '--diag-color': diagC.dot, marginTop: 16, marginBottom: 0 }}>
        <div className="gauge-wrap">
          <Gauge score={score} color={diagC.dot} />
          <div className="gauge-num" style={{ color: diagC.dot }}>
            <span className="gauge-val">{score}</span>
            <span className="gauge-denom">/100</span>
          </div>
        </div>
        <div className="diag-body">
          <div className="diag-top">
            <span className="diag-score-label">Arvo Score</span>
            <span className="diag-sep">·</span>
            <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
          </div>
          <p className="diag-text">
            {a.supplier || a.normalized_supplier} · {meta.label}
          </p>
        </div>
      </ScoreDiag>

      {saving && (
        <SavingsBlock style={{ marginTop: 12 }}>
          <span className="kicker">Identifierad nettobesparing</span>
          <span className="amount">+{fmtNum(a.net_saving)} kr</span>
          <span className="unit">
            {fmtNum(a.annual_cost)} → {fmtNum(a.suggested_annual_cost)} kr/år ·
            {' '}Arvos besparingsarvode (20&nbsp;%) avdraget.
          </span>
        </SavingsBlock>
      )}

      <KV style={{ marginTop: 16 }}>
        {a.annual_cost != null && (
          <div>
            <dt>Ni betalar idag</dt>
            <dd>{fmtNum(a.annual_cost)} kr/år</dd>
          </div>
        )}
        {a.suggested_annual_cost != null && a.should_switch && (
          <div>
            <dt>Marknadspris</dt>
            <dd>{fmtNum(a.suggested_annual_cost)} kr/år</dd>
          </div>
        )}
        {a.gross_saving != null && a.gross_saving > 0 && (
          <div>
            <dt>Bruttobesparing</dt>
            <dd>{fmtNum(a.gross_saving)} kr/år</dd>
          </div>
        )}
        <div>
          <dt>Kategori</dt>
          <dd>{meta.label}</dd>
        </div>
        <div>
          <dt>Analyserad</dt>
          <dd>{fmtDate(a.created_at)}</dd>
        </div>
        {a.seat_count != null && (
          <div>
            <dt>Antal {meta.unit ?? 'enheter'}</dt>
            <dd>{a.seat_count} st</dd>
          </div>
        )}
      </KV>

      <Reasoning style={{ marginBottom: 0 }}>
        <span className="kicker">Arvo bedömer</span>
        <p dangerouslySetInnerHTML={{ __html: buildReasoning(a) }} />
      </Reasoning>
    </SupplierDetail>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [analyses, setAnalyses]       = useState(null);
  const [apiEmail, setApiEmail]       = useState(null);
  const [error, setError]             = useState(null);
  const [fingerprint, setFingerprint] = useState('');
  const [expanded, setExpanded]       = useState(new Set());
  const [reportEmail, setReportEmail] = useState('');
  const [reportState, setReportState] = useState('idle');
  const [reportError, setReportError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fp    = await getBrowserFingerprint();
        if (!cancelled) setFingerprint(fp);
        const magic = new URLSearchParams(window.location.search).get('magic');
        const qs    = `fingerprint=${encodeURIComponent(fp)}` + (magic ? `&magic=${encodeURIComponent(magic)}` : '');
        const res   = await fetch(`/api/invoice-history?${qs}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data  = await res.json();
        if (!cancelled) {
          setAnalyses(data.analyses ?? []);
          setApiEmail(data.email ?? null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSendReport(e) {
    e.preventDefault();
    if (reportState === 'loading') return;
    setReportState('loading');
    setReportError('');
    try {
      const res  = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint, email: reportEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setReportState('success');
    } catch (err) {
      setReportError(err.message);
      setReportState('error');
    }
  }

  function toggleExpand(id) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const autoAnalyses  = useMemo(() => (analyses ?? []).filter((a) => a.route === 'auto' || a.route === 'monitoring'), [analyses]);
  const suppliers     = useMemo(() => groupBySupplier(autoAnalyses), [autoAnalyses]);
  const totalCost     = suppliers.reduce((s, g) => s + (g.latest.annual_cost ?? 0), 0);
  const totalSaving   = suppliers.reduce((s, g) => s + (g.latest.net_saving ?? 0), 0);
  const arvoScore     = computeArvoScore(suppliers);
  const diagC         = scoreColors(arvoScore);
  const companyName   = companyFromEmail(apiEmail);

  const coveredCats   = new Set(suppliers.map((g) => g.latest.category));
  const litSegments   = SEGMENTS.filter((seg) => seg.cats.some((c) => coveredCats.has(c)));

  const today = new Date().toLocaleDateString('sv-SE', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).toUpperCase();

  return (
    <Page>
      <Nav />
      <Column>
        {analyses === null && !error && <SpinnerEl />}
        {error && <ErrorMsg>Kunde inte ladda ert kontor — försök igen om en stund.</ErrorMsg>}

        {/* ── Huvudkort ─────────────────────────────────────────────────── */}
        {analyses !== null && suppliers.length > 0 && (
          <>
            <Card>
              <BriefingHead>
                <div className="bh-top">
                  <span className="bh-stamp">ARVO-KONTORET · {today}</span>
                </div>
                <div className="bh-main">
                  <h2 className="bh-supplier">{companyName ?? 'Ert Arvo-kontor.'}</h2>
                </div>
                <div className="bh-row">
                  <span className="bh-chip">
                    {suppliers.length === 1 ? '1 bevakad leverantör' : `${suppliers.length} bevakade leverantörer`}
                  </span>
                  {totalCost > 0 && (
                    <span className="bh-chip">{fmtNum(totalCost)} kr/år</span>
                  )}
                </div>
              </BriefingHead>

              <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                <div className="gauge-wrap">
                  <Gauge score={arvoScore} color={diagC.dot} />
                  <div className="gauge-num" style={{ color: diagC.dot }}>
                    <span className="gauge-val">{arvoScore}</span>
                    <span className="gauge-denom">/100</span>
                  </div>
                </div>
                <div className="diag-body">
                  <div className="diag-top">
                    <span className="diag-score-label">Arvo Score</span>
                    <span className="diag-sep">·</span>
                    <span className="diag-label" style={{ color: diagC.labelClr }}>{diagC.label}</span>
                  </div>
                  <p className="diag-text">
                    {suppliers.length === 1 ? 'En leverantör analyserad' : `${suppliers.length} leverantörer analyserade`}
                    {totalCost > 0 ? ` · ${fmtNum(totalCost)} kr/år under bevakning` : ''}.
                    {' '}Fler delade fakturor skärper bilden.
                  </p>
                </div>
              </ScoreDiag>

              {totalSaving > 0 && (
                <SavingsBlock>
                  <span className="kicker">Er identifierade nettobesparing</span>
                  <span className="amount">+{fmtNum(totalSaving)} kr</span>
                  <span className="unit">
                    Per år, över{' '}
                    {suppliers.length === 1 ? 'er bevakade leverantör' : `${suppliers.length} bevakade leverantörer`}
                    {' '}· Arvos besparingsarvode (20&nbsp;%) är avdraget.
                  </span>
                </SavingsBlock>
              )}

              <PriceNote>
                Priset baseras på verifierade offentliga listpriser hos ledande leverantörer.
                Vid genomfört byte bekräftas slutpriset i offert innan ni godkänner.
              </PriceNote>
            </Card>

            {/* ── Segmenttäckning ───────────────────────────────────────── */}
            <PortfolioBridge>
              <div className="pb-eyebrow">Helhetsbilden</div>
              <h2 className="pb-head">
                Arvo bevakar åtta kostnadskategorier.{' '}
                Ni har täckt {litSegments.length} av dem.
              </h2>
              <div className="pb-grid">
                {SEGMENTS.map((seg) => {
                  const lit = seg.cats.some((c) => coveredCats.has(c));
                  return (
                    <div key={seg.short} className={`pb-seg${lit ? ' lit' : ''}`}>
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
                  Hela reskontran säger var ni faktiskt blöder. Vidarebefordra era
                  leverantörsfakturor — Arvo kartlägger varje leverantör och hittar
                  varenda besparing, inte bara dem ni hittills delat.
                </p>
                <Link to="/testa-faktura" className="pb-link">
                  Analysera fler fakturor <Icon name="arrow" size={15} stroke={2} />
                </Link>
              </div>
            </PortfolioBridge>

            {/* ── Leverantörslista med expanderbara detaljer ────────────── */}
            <SectionLabel>Era bevakade leverantörer</SectionLabel>
            <SupplierList>
              {suppliers.map((g) => {
                const a        = g.latest;
                const meta     = getCategoryMeta(a.category);
                const hasSaving = a.should_switch && (a.net_saving ?? 0) > 0;
                const isOpen   = expanded.has(a.id);
                return (
                  <SupplierOuter key={a.id} $saving={hasSaving} $open={isOpen}>
                    <SupplierRow
                      onClick={() => toggleExpand(a.id)}
                      aria-expanded={isOpen}
                    >
                      <SupplierInfo>
                        <h4>{a.supplier || a.normalized_supplier || 'Okänd leverantör'}</h4>
                        <p>
                          {meta.label} · {fmtDate(a.created_at)}
                          {g.count > 1 ? ` · ${g.count} analyser` : ''}
                        </p>
                      </SupplierInfo>
                      <SupplierRight>
                        {a.annual_cost != null && (
                          <p className="cost">{fmtNum(a.annual_cost)} kr/år</p>
                        )}
                        <VerdictBadge $saving={hasSaving}>
                          {hasSaving ? `+${fmtNum(a.net_saving)} kr/år` : 'Bevakad'}
                        </VerdictBadge>
                        <ChevronWrap $open={isOpen}>
                          <Icon name="chevron-down" size={16} stroke={2} />
                        </ChevronWrap>
                      </SupplierRight>
                    </SupplierRow>
                    {isOpen && <SupplierDetailPanel a={a} />}
                  </SupplierOuter>
                );
              })}
            </SupplierList>

            {/* ── Arvo Intelligence ─────────────────────────────────────── */}
            <IntelligenceCard>
              <div className="eyebrow">Arvo Intelligence</div>
              <h3>
                {autoAnalyses.length === 1
                  ? 'Det var en faktura.'
                  : `${autoAnalyses.length} fakturor analyserade.`}{' '}
                Vi ser mer.
              </h3>

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
                      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((i) => (
                        <span key={i} className={[0,2,3,5,8,9,11,13].includes(i) ? 'on' : ''} />
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
              <Button as={Link} to="/aktivera" $variant="gradient" $size="lg"
                style={{ width: '100%', justifyContent: 'center' }}>
                Aktivera Arvo Intelligence →
              </Button>
              <p style={{ fontSize: 12, color: '#8A9E98', textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
                Arvo söker igenom er inkorg — ni behöver inte lyfta ett finger.
              </p>
            </IntelligenceCard>

            {/* ── Gör Arvo permanent ───────────────────────────────────── */}
            <Card>
              <CardLabel>Gör Arvo permanent</CardLabel>
              <CardTitle>En vidarebefordringsregel räcker.</CardTitle>
              <CardBody>
                Peka era leverantörsfakturor till adressen nedan, så analyserar Arvo
                varje ny faktura automatiskt — och hör av sig bara när något är fel prissatt.
              </CardBody>
              <AddressChip>faktura@inbox.arvoflow.se</AddressChip>
            </Card>

            {/* ── Rapport ──────────────────────────────────────────────── */}
            <Card>
              <CardLabel>Arvo-rapport</CardLabel>
              <CardTitle>Er samlade rapport, som PDF.</CardTitle>
              <CardBody>
                Hela kostnadsbilden, varje identifierat fynd och nästa steg — skickad till er inkorg.
              </CardBody>
              {reportState === 'success' ? (
                <SuccessMsg>Rapporten är på väg — kolla er inkorg.</SuccessMsg>
              ) : (
                <>
                  <FormRow onSubmit={handleSendReport}>
                    <EmailInput
                      type="email" placeholder="namn@bolaget.se"
                      value={reportEmail} onChange={(e) => setReportEmail(e.target.value)}
                      required disabled={reportState === 'loading'}
                    />
                    <Button type="submit" $variant="gradient" $size="md"
                      disabled={reportState === 'loading' || !reportEmail}>
                      {reportState === 'loading' ? 'Skickar…' : 'Skicka rapporten →'}
                    </Button>
                  </FormRow>
                  {reportState === 'error' && reportError && <ErrorHint>{reportError}</ErrorHint>}
                </>
              )}
            </Card>

            {/* ── Koppla bokföringen ────────────────────────────────────── */}
            <Card>
              <CardLabel>Hela leverantörsbilden</CardLabel>
              <CardTitle>Koppla bokföringen — bevaka allt.</CardTitle>
              <CardBody>
                Med Fortnox eller Visma läser Arvo hela er leverantörsreskontra —
                varje avtal bevakat, varje prisrörelse fångad, utan ett enda mail.
              </CardBody>
              <Button as={Link} to="/connect" $variant="gradient" $size="md">
                Koppla Fortnox / Visma →
              </Button>
            </Card>
          </>
        )}

        {/* ── Tomt kontor ───────────────────────────────────────────────── */}
        {analyses !== null && suppliers.length === 0 && (
          <Card>
            <BriefingHead>
              <div className="bh-top">
                <span className="bh-stamp">ARVO-KONTORET · {today}</span>
              </div>
              <div className="bh-main">
                <h2 className="bh-supplier">{companyName ?? 'Ert Arvo-kontor.'}</h2>
              </div>
              <div className="bh-row">
                <span className="bh-chip">Väntar på er första faktura</span>
              </div>
            </BriefingHead>
            <EmptyBody>
              Mejla en leverantörsfaktura (PDF) till adressen nedan, eller ladda upp
              den direkt — analysen landar här inom ett par minuter.
            </EmptyBody>
            <AddressChip style={{ maxWidth: 340, margin: '0 auto 20px' }}>
              faktura@inbox.arvoflow.se
            </AddressChip>
            <Button as={Link} to="/testa-faktura" $variant="gradient" $size="md">
              Analysera en faktura direkt →
            </Button>
          </Card>
        )}
      </Column>
      <Footer />
    </Page>
  );
}
