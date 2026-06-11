// src/pages/Portfolio — Arvo-kontoret i sajtens ljusa analys-språk.
// Mall: TestaFakturas resultatkort (ARVO-ANALYS-stämpel, serif-rubrik, vita kort,
// brandGradient-besparingsbandet). Regel 6: alla färger ur theme — 0 hårdkodade hex.

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { getCategoryMeta } from '../../lib/categoryMeta';

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

// En leverantör = en rad. Senaste analysen är sanningen; äldre är historik.
// (Totalsummor över RÅA analyser dubbelräknar varje omanalys — regel 3.)
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
  const segmentScore = Math.round((uniqueSegs.size / 8) * 65);
  const totalNet = suppliers.reduce((sum, s) => sum + (s.latest.net_saving ?? 0), 0);
  const savingScore = totalNet > 5000 ? 25 : totalNet > 0 ? 15 : 0;
  const completenessBonus = suppliers.length >= 5 ? 10 : suppliers.length >= 3 ? 5 : 0;
  return Math.min(100, segmentScore + savingScore + completenessBonus);
}

// ─── animations ─────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;
const dashFill = keyframes`from { stroke-dashoffset: 283; }`;

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  60%, 100% { transform: translateX(100%); }
`;

// ─── layout ──────────────────────────────────────────────────────────────────

const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
  min-height: 100vh;
`;

const Column = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 40px 20px 72px;
  @media (min-width: 768px) { padding: 56px 24px 96px; }
`;

// ─── stämpel + rubrik (ARVO-ANALYS-mönstret) ─────────────────────────────────

const StampRow = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
  animation: ${fadeUp} 0.5s ease both;
`;

const Stamp = styled.span`
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};
`;

const H1 = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(28px, 6.5vw, 38px);
  font-weight: 600; letter-spacing: -0.015em; line-height: 1.12;
  color: ${({ theme }) => theme.color.ink};
  margin: 0 0 10px;
  animation: ${fadeUp} 0.5s 0.04s ease both;
`;

const HeroSub = styled.p`
  font-size: 14.5px; line-height: 1.7;
  color: ${({ theme }) => theme.color.inkSoft};
  margin: 0 0 26px;
  animation: ${fadeUp} 0.5s 0.08s ease both;
`;

// ─── score-kortet (vita kortet med gauge) ────────────────────────────────────

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 22px 24px;
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 20px;
  box-shadow: 0 1px 6px rgba(14, 26, 23, 0.05);
  animation: ${fadeUp} 0.5s 0.12s ease both;
`;

const GaugeWrap = styled.div`
  position: relative; flex-shrink: 0;
  width: 84px; height: 84px;
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .track { fill: none; stroke: ${({ theme }) => theme.color.border}; stroke-width: 9; }
  .fill  { fill: none; stroke-width: 9; stroke-linecap: round;
    stroke: url(#kontorGrad);
    animation: ${dashFill} 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
`;

const GaugeCenter = styled.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  span.score { font-family: ${({ theme }) => theme.font.display}; font-size: 26px;
    font-weight: 600; color: ${({ theme }) => theme.color.ink}; line-height: 1; }
  span.of { font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.mutedSoft}; margin-top: 3px; }
`;

const ScoreInfo = styled.div`
  flex: 1;
  h2 { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 6px;
    sup { font-size: 8px; } }
  p { font-size: 13.5px; line-height: 1.6; color: ${({ theme }) => theme.color.inkSoft}; margin: 0; }
`;

// ─── besparingsbandet (SavingsBlock-mönstret) ────────────────────────────────

const SavingsBand = styled.div`
  position: relative; overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandGradient};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27, 110, 102, 0.22), 0 2px 6px rgba(27, 110, 102, 0.14);
  animation: ${fadeUp} 0.5s 0.16s ease both;

  &::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.14) 48%, rgba(255,255,255,0.08) 52%, transparent 62%);
    animation: ${shimmer} 3.6s ease-in-out 1.2s infinite;
    pointer-events: none;
  }

  span.kicker { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; opacity: 0.75; margin-bottom: 10px; }
  span.amount { display: block; font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(36px, 6.5vw, 52px); font-weight: 500; line-height: 1;
    letter-spacing: -0.025em; font-feature-settings: 'tnum'; }
  span.unit { display: block; margin-top: 10px; font-size: 13.5px; opacity: 0.82;
    line-height: 1.55; border-top: 1px solid rgba(255,255,255,0.18); padding-top: 10px; }
`;

const FinePrint = styled.p`
  font-size: 12px; font-style: italic; line-height: 1.6; text-align: center;
  color: ${({ theme }) => theme.color.mutedSoft};
  margin: 0 0 28px; padding: 0 12px;
  animation: ${fadeUp} 0.5s 0.2s ease both;
`;

// ─── leverantörslistan ───────────────────────────────────────────────────────

const SectionLabel = styled.h3`
  font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};
  margin: 0 0 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const SupplierList = styled.div`
  display: flex; flex-direction: column; gap: 9px;
  margin-bottom: 28px;
`;

const SupplierCard = styled.div`
  position: relative; overflow: hidden;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 15px 18px 15px 22px;
  display: flex; align-items: center; gap: 14px;
  box-shadow: 0 1px 3px rgba(14, 26, 23, 0.04);
  transition: box-shadow 0.18s ease;
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
    font-size: 16px; font-weight: 600; letter-spacing: -0.005em;
    color: ${({ theme }) => theme.color.ink}; margin: 0 0 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  p { font-size: 11.5px; color: ${({ theme }) => theme.color.mutedSoft}; margin: 0; }
`;

const SupplierRight = styled.div`
  text-align: right; flex-shrink: 0;
  p.cost { font-size: 13px; font-weight: 700; color: ${({ theme }) => theme.color.ink};
    margin: 0 0 4px; font-feature-settings: 'tnum'; }
  @media (max-width: 480px) { width: 100%; text-align: left; padding-left: 0; }
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

// ─── kort: gör Arvo permanent / rapport / connect ────────────────────────────

const Card = styled.section`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 24px 26px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(14, 26, 23, 0.05);

  h3 { font-family: ${({ theme }) => theme.font.display};
    font-size: 19px; font-weight: 600; letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink}; margin: 0 0 7px; }
  p { font-size: 13.5px; line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft}; margin: 0 0 16px; }
`;

const CardLabel = styled.span`
  display: block;
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};
  margin-bottom: 8px;
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

const SuccessMsg = styled.p`
  &&& { color: ${({ theme }) => theme.color.brand}; font-weight: 600; margin: 0; }
`;

const ErrorHint = styled.p`
  &&& { font-size: 12px; color: ${({ theme }) => theme.color.danger ?? theme.color.inkSoft}; margin: 8px 0 0; }
`;

// ─── states ──────────────────────────────────────────────────────────────────

const EmptyState = styled.div`
  text-align: center;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 52px 26px;
  margin-bottom: 12px;
  h3 { font-family: ${({ theme }) => theme.font.display};
    font-size: 22px; font-weight: 600; color: ${({ theme }) => theme.color.ink};
    margin: 0 0 10px; }
  p { font-size: 14px; line-height: 1.7; color: ${({ theme }) => theme.color.inkSoft};
    max-width: 380px; margin: 0 auto 20px; }
`;

const SpinnerEl = styled.div`
  width: 30px; height: 30px;
  border: 3px solid ${({ theme }) => theme.color.border};
  border-top-color: ${({ theme }) => theme.color.brand};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  margin: 64px auto;
`;

const ErrorMsg = styled.p`
  text-align: center; color: ${({ theme }) => theme.color.inkSoft};
  font-size: 14px; padding: 40px 20px;
`;

// ─── gauge ───────────────────────────────────────────────────────────────────

function ScoreGauge({ score }) {
  const R = 45;
  const C = 2 * Math.PI * R;
  return (
    <GaugeWrap>
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id="kontorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5DD6CA" />
            <stop offset="100%" stopColor="#1B6E66" />
          </linearGradient>
        </defs>
        <circle className="track" cx="50" cy="50" r={R} />
        <circle className="fill" cx="50" cy="50" r={R}
          strokeDasharray={C} strokeDashoffset={C - (score / 100) * C} />
      </svg>
      <GaugeCenter>
        <span className="score">{score}</span>
        <span className="of">/100</span>
      </GaugeCenter>
    </GaugeWrap>
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
        // Magic-token ur mailsvarets kontorslänk = bevis för e-postnycklad historik.
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
  const suppliers = useMemo(() => groupBySupplier(autoAnalyses), [autoAnalyses]);

  // Totalsummor per UNIK leverantör (senaste analysen) — aldrig över råa omanalyser
  const totalAnnualCost = suppliers.reduce((s, g) => s + (g.latest.annual_cost ?? 0), 0);
  const totalNetSaving  = suppliers.reduce((s, g) => s + (g.latest.net_saving ?? 0), 0);
  const arvoScore       = computeArvoScore(suppliers);

  const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Page>
      <Nav />
      <Column>
        {analyses === null && !error && <SpinnerEl />}
        {error && <ErrorMsg>Kunde inte ladda ert kontor — försök igen om en stund.</ErrorMsg>}

        {analyses !== null && suppliers.length > 0 && (
          <>
            <StampRow>
              <Stamp>Arvo-kontoret · {today}</Stamp>
            </StampRow>
            <H1>Ert Arvo-kontor.</H1>
            <HeroSub>
              Varje faktura ni delar bevakas härifrån — priser, avtal och
              marknadsrörelser, samlade i en bild.
            </HeroSub>

            <ScoreCard>
              <ScoreGauge score={arvoScore} />
              <ScoreInfo>
                <h2>Arvo Score<sup>™</sup></h2>
                <p>
                  {suppliers.length === 1
                    ? 'En bevakad leverantör'
                    : `${suppliers.length} bevakade leverantörer`}
                  {' '}· {fmtNum(totalAnnualCost)} kr/år under bevakning.
                  Fler delade fakturor skärper bilden.
                </p>
              </ScoreInfo>
            </ScoreCard>

            {totalNetSaving > 0 && (
              <SavingsBand>
                <span className="kicker">Er identifierade nettobesparing</span>
                <span className="amount">+{fmtNum(totalNetSaving)} kr</span>
                <span className="unit">
                  Per år, över {suppliers.length === 1 ? 'er bevakade leverantör' : `${suppliers.length} bevakade leverantörer`} ·
                  Arvos besparingsarvode (20&nbsp;%) är avdraget.
                </span>
              </SavingsBand>
            )}

            <FinePrint>
              Priset baseras på verifierade offentliga listpriser hos ledande
              leverantörer. Vid genomfört byte bekräftas slutpriset i offert
              innan ni godkänner.
            </FinePrint>

            <SectionLabel>Era bevakade leverantörer</SectionLabel>
            <SupplierList>
              {suppliers.map((g) => {
                const a = g.latest;
                const meta = getCategoryMeta(a.category);
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
                      {a.annual_cost != null && <p className="cost">{fmtNum(a.annual_cost)} kr/år</p>}
                      <VerdictBadge $saving={hasSaving}>
                        {hasSaving ? `+${fmtNum(a.net_saving)} kr/år identifierad` : 'Bevakad'}
                      </VerdictBadge>
                    </SupplierRight>
                  </SupplierCard>
                );
              })}
            </SupplierList>

            <Card>
              <CardLabel>Gör Arvo permanent</CardLabel>
              <h3>En vidarebefordringsregel räcker.</h3>
              <p>
                Peka era leverantörsfakturor till adressen nedan, så analyserar
                Arvo varje ny faktura automatiskt — och hör av sig bara när
                något är fel prissatt.
              </p>
              <AddressChip>faktura@inbox.arvoflow.se</AddressChip>
            </Card>

            <Card>
              <CardLabel>Arvo-rapport</CardLabel>
              <h3>Er samlade rapport, som PDF.</h3>
              <p>Hela kostnadsbilden, varje identifierat fynd och nästa steg — skickad till er inkorg.</p>
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
                  {submitState === 'error' && submitError && <ErrorHint>{submitError}</ErrorHint>}
                </>
              )}
            </Card>

            <Card>
              <CardLabel>Hela leverantörsbilden</CardLabel>
              <h3>Koppla bokföringen — bevaka allt.</h3>
              <p>
                Med Fortnox eller Visma läser Arvo hela er leverantörsreskontra —
                varje avtal bevakat, varje prisrörelse fångad, utan ett enda mail.
              </p>
              <Button as={Link} to="/connect" $variant="gradient" $size="md">
                Koppla Fortnox / Visma →
              </Button>
            </Card>
          </>
        )}

        {analyses !== null && suppliers.length === 0 && (
          <>
            <StampRow>
              <Stamp>Arvo-kontoret · {today}</Stamp>
            </StampRow>
            <EmptyState>
              <h3>Ert kontor väntar på sin första faktura.</h3>
              <p>
                Mejla en leverantörsfaktura (PDF) till adressen nedan, eller
                ladda upp den direkt — analysen landar här inom ett par minuter.
              </p>
              <AddressChip style={{ maxWidth: 340, margin: '0 auto 20px' }}>
                faktura@inbox.arvoflow.se
              </AddressChip>
              <Button as={Link} to="/testa-faktura" $variant="gradient" $size="md">
                Analysera en faktura direkt →
              </Button>
            </EmptyState>
          </>
        )}
      </Column>
      <Footer />
    </Page>
  );
}
