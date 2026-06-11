// src/pages/Portfolio — Ert Arvo-kontor.
// Design: importerar BriefingHead, ScoreDiag, SavingsBlock, PriceNote och Card
// direkt ur TestaFaktura/styles.js — pixelidentisk med analys­resultat­kortet (regel 6).

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { getCategoryMeta } from '../../lib/categoryMeta';
import {
  Page,
  Card,
  BriefingHead,
  ScoreDiag,
  SavingsBlock,
  PriceNote,
} from '../TestaFaktura/styles';

// ─── helpers ────────────────────────────────────────────────────────────────

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

const fmtNum  = (n) => (n == null ? '–' : Math.round(n).toLocaleString('sv-SE'));
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) : '');

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
  return [...groups.values()].sort(
    (x, y) => (y.latest.net_saving ?? 0) - (x.latest.net_saving ?? 0)
  );
}

function computeArvoScore(suppliers) {
  if (!suppliers.length) return 0;
  const uniqueSegs = new Set(
    suppliers.map((s) => getCategoryMeta(s.latest.category)?.segment ?? -1).filter((x) => x >= 0)
  );
  const segmentScore    = Math.round((uniqueSegs.size / 8) * 65);
  const totalNet        = suppliers.reduce((sum, s) => sum + (s.latest.net_saving ?? 0), 0);
  const savingScore     = totalNet > 5000 ? 25 : totalNet > 0 ? 15 : 0;
  const completenessB   = suppliers.length >= 5 ? 10 : suppliers.length >= 3 ? 5 : 0;
  return Math.min(100, segmentScore + savingScore + completenessB);
}

// Samma färgkodning som TestaFakturas diagC
function scoreColors(score) {
  if (score < 45) return { dot: '#DC2626', label: 'Kritisk',          labelClr: '#991B1B' };
  if (score < 65) return { dot: '#D97706', label: 'Suboptimerat',     labelClr: '#92400E' };
  if (score < 80) return { dot: '#65A30D', label: 'Förbättringsläge', labelClr: '#365314' };
  return             { dot: '#1B7A6E', label: 'Optimalt',         labelClr: '#0E4F47' };
}

// ─── animations (lokala, för leverantörs­listan) ──────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;

// ─── layout ──────────────────────────────────────────────────────────────────

const Column = styled.div`
  max-width: 660px;
  margin: 0 auto;
  padding: 32px 20px 80px;
  @media (min-width: 768px) { padding: 40px 24px 96px; }
`;

// ─── leverantörslistan ───────────────────────────────────────────────────────

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

const SupplierCard = styled.div`
  position: relative; overflow: hidden;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 14px 18px 14px 22px;
  display: flex; align-items: center; gap: 14px;
  box-shadow: 0 1px 3px rgba(14, 26, 23, 0.04);
  transition: box-shadow 0.18s ease;
  animation: ${fadeUp} 0.4s ease both;
  &:hover { box-shadow: 0 4px 14px rgba(14, 26, 23, 0.09); }

  &::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
    background: ${({ $saving, theme }) =>
      $saving ? theme.color.brandGradient : theme.color.border};
  }

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
  text-align: right; flex-shrink: 0;
  p.cost { font-size: 13px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
    margin: 0 0 4px; font-feature-settings: 'tnum'; }
  @media (max-width: 480px) { width: 100%; text-align: left; }
`;

const VerdictBadge = styled.span`
  display: inline-block;
  font-size: 11px; font-weight: 600;
  padding: 3px 10px; border-radius: 100px;
  ${({ $saving, theme }) => $saving
    ? `color: ${theme.color.brand}; background: ${theme.color.brandSoft};`
    : `color: ${theme.color.mutedSoft}; background: ${theme.color.bg};
       border: 1px solid ${theme.color.border};`}
`;

// ─── CTA-kort ────────────────────────────────────────────────────────────────

const CardLabel = styled.span`
  display: block;
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 19px; font-weight: 600; letter-spacing: -0.01em;
  color: ${({ theme }) => theme.color.ink}; margin: 0 0 7px;
`;

const CardBody = styled.p`
  font-size: 13.5px; line-height: 1.65;
  color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 16px;
`;

const AddressChip = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13.5px; letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color.brand};
  background: ${({ theme }) => theme.color.bg};
  border: 1px dashed ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 13px 16px;
  text-align: center;
  user-select: all;
`;

const FormRow = styled.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`;

const EmailInput = styled.input`
  flex: 1; padding: 11px 16px; border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  font-size: 14px; color: ${({ theme }) => theme.color.ink};
  outline: none; transition: border-color 0.15s;
  &:focus { border-color: ${({ theme }) => theme.color.brand}; }
  &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
`;

// ─── states ──────────────────────────────────────────────────────────────────

const SpinnerEl = styled.div`
  width: 30px; height: 30px;
  border: 3px solid ${({ theme }) => theme.color.border};
  border-top-color: ${({ theme }) => theme.color.brand};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  margin: 80px auto;
`;

const ErrorMsg = styled.p`
  text-align: center; color: ${({ theme }) => theme.color.inkSoft};
  font-size: 14px; padding: 48px 20px;
`;

const SuccessMsg = styled.p`
  color: ${({ theme }) => theme.color.brand}; font-weight: 600; margin: 0;
  font-size: 14px;
`;

const ErrorHint = styled.p`
  font-size: 12px; color: ${({ theme }) => theme.color.inkSoft};
  margin: 8px 0 0;
`;

const EmptyBody = styled.p`
  font-size: 14.5px; line-height: 1.7;
  color: ${({ theme }) => theme.color.inkSoft};
  margin: 0 0 20px;
`;

// ─── gauge (samma mått som TestaFakturas ScoreDiag) ─────────────────────────

const GAUGE_R = 26;
const GAUGE_C = 2 * Math.PI * GAUGE_R;

function ScoreGaugeSvg({ score, color }) {
  const dash = (score / 100) * GAUGE_C;
  return (
    <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r={GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
      <circle
        cx="30" cy="30" r={GAUGE_R} fill="none"
        stroke={color} strokeWidth="4.5" strokeLinecap="round"
        strokeDasharray={`${dash} ${GAUGE_C}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px', transition: 'stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [analyses, setAnalyses]       = useState(null);
  const [error, setError]             = useState(null);
  const [fingerprint, setFingerprint] = useState('');
  const [email, setEmail]             = useState('');
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fp = await getBrowserFingerprint();
        if (!cancelled) setFingerprint(fp);
        const magic = new URLSearchParams(window.location.search).get('magic');
        const qs = `fingerprint=${encodeURIComponent(fp)}` + (magic ? `&magic=${encodeURIComponent(magic)}` : '');
        const res = await fetch(`/api/invoice-history?${qs}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setAnalyses(data.analyses ?? []);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function handleSendReport(e) {
    e.preventDefault();
    if (submitState === 'loading') return;
    setSubmitState('loading');
    setSubmitError('');
    try {
      const res = await fetch('/api/send-report', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ fingerprint, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setSubmitState('success');
    } catch (err) {
      setSubmitError(err.message);
      setSubmitState('error');
    }
  }

  const autoAnalyses = useMemo(
    () => (analyses ?? []).filter((a) => a.route === 'auto'),
    [analyses]
  );
  const suppliers        = useMemo(() => groupBySupplier(autoAnalyses), [autoAnalyses]);
  const totalAnnualCost  = suppliers.reduce((s, g) => s + (g.latest.annual_cost ?? 0), 0);
  const totalNetSaving   = suppliers.reduce((s, g) => s + (g.latest.net_saving ?? 0), 0);
  const arvoScore        = computeArvoScore(suppliers);
  const diagC            = scoreColors(arvoScore);

  const today = new Date().toLocaleDateString('sv-SE', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).toUpperCase();

  return (
    <Page>
      <Nav />
      <Column>
        {analyses === null && !error && <SpinnerEl />}
        {error && <ErrorMsg>Kunde inte ladda ert kontor — försök igen om en stund.</ErrorMsg>}

        {/* ── Huvudkort (identisk layout med TestaFakturas resultatkort) ── */}
        {analyses !== null && suppliers.length > 0 && (
          <>
            <Card>
              <BriefingHead>
                <div className="bh-top">
                  <span className="bh-stamp">ARVO-KONTORET · {today}</span>
                </div>
                <div className="bh-main">
                  <h2 className="bh-supplier">Ert Arvo-kontor.</h2>
                </div>
                <div className="bh-row">
                  <span className="bh-chip">
                    {suppliers.length === 1 ? '1 bevakad leverantör' : `${suppliers.length} bevakade leverantörer`}
                  </span>
                  {totalAnnualCost > 0 && (
                    <span className="bh-chip">{fmtNum(totalAnnualCost)} kr/år</span>
                  )}
                </div>
              </BriefingHead>

              <ScoreDiag style={{ '--diag-color': diagC.dot }}>
                <div className="gauge-wrap">
                  <ScoreGaugeSvg score={arvoScore} color={diagC.dot} />
                  <div className="gauge-num" style={{ color: diagC.dot }}>
                    <span className="gauge-val">{arvoScore}</span>
                    <span className="gauge-denom">/100</span>
                  </div>
                </div>
                <div className="diag-body">
                  <div className="diag-top">
                    <span className="diag-score-label">Arvo Score</span>
                    <span className="diag-sep">·</span>
                    <div className="diag-status">
                      <span className="diag-label" style={{ color: diagC.labelClr }}>
                        {diagC.label}
                      </span>
                    </div>
                  </div>
                  <p className="diag-text">
                    {suppliers.length === 1 ? 'En leverantör analyserad' : `${suppliers.length} leverantörer analyserade`}
                    {totalAnnualCost > 0 ? ` · ${fmtNum(totalAnnualCost)} kr/år under bevakning` : ''}.
                    {' '}Fler delade fakturor skärper bilden.
                  </p>
                </div>
              </ScoreDiag>

              {totalNetSaving > 0 && (
                <SavingsBlock>
                  <span className="kicker">Er identifierade nettobesparing</span>
                  <span className="amount">+{fmtNum(totalNetSaving)} kr</span>
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

            {/* ── Leverantörslista ──────────────────────────────────────── */}
            <SectionLabel>Era bevakade leverantörer</SectionLabel>
            <SupplierList>
              {suppliers.map((g) => {
                const a        = g.latest;
                const meta     = getCategoryMeta(a.category);
                const hasSaving = a.should_switch && (a.net_saving ?? 0) > 0;
                return (
                  <SupplierCard key={a.id} $saving={hasSaving}>
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
                        {hasSaving
                          ? `+${fmtNum(a.net_saving)} kr/år identifierad`
                          : 'Bevakad'}
                      </VerdictBadge>
                    </SupplierRight>
                  </SupplierCard>
                );
              })}
            </SupplierList>

            {/* ── Gör Arvo permanent ───────────────────────────────────── */}
            <Card>
              <CardLabel>Gör Arvo permanent</CardLabel>
              <CardTitle>En vidarebefordringsregel räcker.</CardTitle>
              <CardBody>
                Peka era leverantörsfakturor till adressen nedan, så analyserar
                Arvo varje ny faktura automatiskt — och hör av sig bara när
                något är fel prissatt.
              </CardBody>
              <AddressChip>faktura@inbox.arvoflow.se</AddressChip>
            </Card>

            {/* ── Rapport ──────────────────────────────────────────────── */}
            <Card>
              <CardLabel>Arvo-rapport</CardLabel>
              <CardTitle>Er samlade rapport, som PDF.</CardTitle>
              <CardBody>
                Hela kostnadsbilden, varje identifierat fynd och nästa steg —
                skickad till er inkorg.
              </CardBody>
              {submitState === 'success' ? (
                <SuccessMsg>Rapporten är på väg — kolla er inkorg.</SuccessMsg>
              ) : (
                <>
                  <FormRow onSubmit={handleSendReport}>
                    <EmailInput
                      type="email"
                      placeholder="namn@bolaget.se"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={submitState === 'loading'}
                    />
                    <Button type="submit" $variant="gradient" $size="md"
                      disabled={submitState === 'loading' || !email}>
                      {submitState === 'loading' ? 'Skickar…' : 'Skicka rapporten →'}
                    </Button>
                  </FormRow>
                  {submitState === 'error' && submitError && (
                    <ErrorHint>{submitError}</ErrorHint>
                  )}
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
          <>
            <Card>
              <BriefingHead>
                <div className="bh-top">
                  <span className="bh-stamp">ARVO-KONTORET · {today}</span>
                </div>
                <div className="bh-main">
                  <h2 className="bh-supplier">Ert Arvo-kontor.</h2>
                </div>
                <div className="bh-row">
                  <span className="bh-chip">Väntar på er första faktura</span>
                </div>
              </BriefingHead>
              <EmptyBody>
                Mejla en leverantörsfaktura (PDF) till adressen nedan, eller
                ladda upp den direkt — analysen landar här inom ett par minuter.
              </EmptyBody>
              <AddressChip style={{ maxWidth: 340, margin: '0 auto 20px' }}>
                faktura@inbox.arvoflow.se
              </AddressChip>
              <Button as={Link} to="/testa-faktura" $variant="gradient" $size="md">
                Analysera en faktura direkt →
              </Button>
            </Card>
          </>
        )}
      </Column>
      <Footer />
    </Page>
  );
}
