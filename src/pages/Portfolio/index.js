// src/pages/Portfolio — Arvo-kontoret: det e-postnycklade premiumrummet.
// Mailen är dörren, kontoret är rummet (CLAUDE.md skuld 4b — byggd ihop med ingesten).
// Designspråk: theme.dossier (mall: src/pages/Prospect) — regel 6: 0 hårdkodade hex.

import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import theme from '../../theme';
import { getCategoryMeta } from '../../lib/categoryMeta';

const D    = theme.dossier;
const MONO = theme.font.mono;

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

const rise = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;
const dashFill = keyframes`from { stroke-dashoffset: 283; }`;

const appear = (delay = 0) => css`
  opacity: 0;
  animation: ${rise} 0.7s ${delay}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

// ─── layout ──────────────────────────────────────────────────────────────────

const PageWrap = styled.div`
  min-height: 100vh;
  background: ${D.bg};
  font-family: ${theme.font.sans};
  -webkit-font-smoothing: antialiased;
  padding-bottom: 64px;
`;

const TopFade = styled.div`
  position: fixed; top: 0; left: 0; right: 0; z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, ${D.bg}F0 0%, transparent 100%);
  pointer-events: none;
`;

const Column = styled.div`
  max-width: ${D.column};
  margin: 0 auto;
  padding: 0 22px;
`;

// ─── hero ────────────────────────────────────────────────────────────────────

const Hero = styled.header`
  position: relative;
  overflow: hidden;
  padding: calc(72px + env(safe-area-inset-top, 0px)) 0 44px;
  text-align: center;

  &::before {
    content: '';
    position: absolute; inset: 0;
    background: ${D.aurora};
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${D.keyline};
  }
`;

const Eyebrow = styled.p`
  position: relative;
  font-family: ${MONO};
  font-size: 11px; font-weight: 500;
  letter-spacing: 0.32em; text-transform: uppercase;
  color: ${D.teal};
  margin: 0 0 18px;
  ${appear(0)}
`;

const H1 = styled.h1`
  position: relative;
  font-family: ${theme.font.display};
  font-size: clamp(34px, 8vw, 46px);
  font-weight: 700; letter-spacing: -0.015em; line-height: 1.08;
  margin: 0 0 14px;
  background: ${D.metallicText};
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  ${appear(0.06)}
`;

const HeroSub = styled.p`
  position: relative;
  font-size: 15px; line-height: 1.7;
  color: ${D.mutedOnDark};
  max-width: 420px; margin: 0 auto;
  ${appear(0.12)}
`;

// ─── översiktsbandet ─────────────────────────────────────────────────────────

const OverviewBand = styled.section`
  background: ${D.bgRaised};
  border: 1px solid ${D.hairlineOnDark};
  border-radius: 20px;
  padding: 28px 26px;
  margin-bottom: 14px;
  ${appear(0.18)}
`;

const GaugeRow = styled.div`
  display: flex; align-items: center; gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 520px) { gap: 18px; }
`;

const GaugeWrap = styled.div`
  position: relative; flex-shrink: 0;
  width: 108px; height: 108px;
  svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .track { fill: none; stroke: ${D.hairlineOnDark}; stroke-width: 9; }
  .fill  { fill: none; stroke-width: 9; stroke-linecap: round;
    stroke: url(#kontorGrad);
    animation: ${dashFill} 1.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
`;

const GaugeCenter = styled.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  span.score { font-family: ${theme.font.display}; font-size: 30px; font-weight: 700;
    color: ${D.inkOnDark}; line-height: 1; }
  span.of { font-family: ${MONO}; font-size: 9px; letter-spacing: 0.14em;
    color: ${D.faintOnDark}; margin-top: 4px; }
`;

const GaugeInfo = styled.div`
  flex: 1; text-align: left;
  h2 { font-family: ${theme.font.display}; font-size: 19px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0 0 6px; letter-spacing: -0.01em;
    sup { font-size: 9px; color: ${D.teal}; } }
  p { font-size: 13px; line-height: 1.65; color: ${D.mutedOnDark}; margin: 0; }
`;

const KeyNumbers = styled.div`
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  border-top: 1px solid ${D.hairlineOnDark};
  padding-top: 20px;
  @media (max-width: 520px) { grid-template-columns: 1fr; gap: 16px;
    text-align: left; }
`;

const KeyNumber = styled.div`
  text-align: center;
  @media (max-width: 520px) { display: flex; align-items: baseline; justify-content: space-between; }
  p.label { font-family: ${MONO}; font-size: 9.5px; letter-spacing: 0.18em;
    text-transform: uppercase; color: ${D.faintOnDark}; margin: 0 0 7px;
    @media (max-width: 520px) { margin: 0; } }
  p.value { font-family: ${theme.font.display}; font-size: 22px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0; letter-spacing: -0.01em;
    span.unit { font-size: 12px; font-family: ${theme.font.sans}; font-weight: 500;
      color: ${D.mutedOnDark}; margin-left: 4px; } }
  &.saving p.value {
    background: ${D.numberGradient};
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    span.unit { -webkit-text-fill-color: ${D.mutedOnDark}; }
  }
`;

// ─── leverantörslistan ───────────────────────────────────────────────────────

const SectionLabel = styled.h3`
  font-family: ${MONO};
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.26em; text-transform: uppercase;
  color: ${D.faintOnDark};
  margin: 30px 2px 12px;
  ${appear(0.22)}
`;

const SupplierList = styled.div`
  display: flex; flex-direction: column; gap: 10px;
  ${appear(0.26)}
`;

const SupplierCard = styled.div`
  position: relative;
  background: ${D.bgRaised};
  border: 1px solid ${D.hairlineOnDark};
  border-radius: 16px;
  padding: 18px 20px 18px 24px;
  display: flex; align-items: center; gap: 16px;
  overflow: hidden;
  transition: border-color 0.25s ease;
  &:hover { border-color: rgba(43, 196, 172, 0.35); }

  &::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: ${({ $saving }) => ($saving ? D.numberGradient : D.hairlineOnDark)};
  }
`;

const SupplierInfo = styled.div`
  flex: 1; min-width: 0;
  h4 { font-family: ${theme.font.display}; font-size: 16.5px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0 0 5px; letter-spacing: -0.005em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  p { font-family: ${MONO}; font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: ${D.faintOnDark}; margin: 0; }
`;

const SupplierRight = styled.div`
  text-align: right; flex-shrink: 0;
  p.cost { font-size: 13.5px; font-weight: 600; color: ${D.mutedOnDark}; margin: 0 0 6px; }
`;

const VerdictBadge = styled.span`
  display: inline-block;
  font-family: ${MONO};
  font-size: 10.5px; font-weight: 500; letter-spacing: 0.06em;
  padding: 4px 11px; border-radius: 100px;
  ${({ $saving }) => $saving
    ? css`color: ${D.tealBright}; background: rgba(43, 196, 172, 0.12);
        border: 1px solid rgba(43, 196, 172, 0.3);`
    : css`color: ${D.faintOnDark}; background: transparent;
        border: 1px solid ${D.hairlineOnDark};`}
`;

// ─── kortet: gör Arvo permanent ──────────────────────────────────────────────

const PermanentCard = styled.section`
  background: ${D.bgRaised};
  border: 1px solid ${D.hairlineOnDark};
  border-radius: 20px;
  padding: 26px;
  margin-top: 30px;
  ${appear(0.3)}
  h3 { font-family: ${theme.font.display}; font-size: 19px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0 0 8px; letter-spacing: -0.01em; }
  p { font-size: 13.5px; line-height: 1.7; color: ${D.mutedOnDark}; margin: 0 0 16px; }
`;

const AddressChip = styled.div`
  font-family: ${MONO};
  font-size: 13px; letter-spacing: 0.02em;
  color: ${D.tealBright};
  background: ${D.bg};
  border: 1px solid rgba(43, 196, 172, 0.3);
  border-radius: 10px;
  padding: 13px 16px;
  text-align: center;
  user-select: all;
`;

// ─── rapport + connect ───────────────────────────────────────────────────────

const ActionCard = styled.section`
  background: ${D.bgRaised};
  border: 1px solid ${D.hairlineOnDark};
  border-radius: 20px;
  padding: 26px;
  margin-top: 14px;
  ${appear(0.34)}
  h3 { font-family: ${theme.font.display}; font-size: 17px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0 0 7px; letter-spacing: -0.01em; }
  p { font-size: 13px; line-height: 1.65; color: ${D.mutedOnDark}; margin: 0 0 16px; }
`;

const FormRow = styled.form`
  display: flex; gap: 10px;
  @media (max-width: 520px) { flex-direction: column; }
`;

const EmailInput = styled.input`
  flex: 1; padding: 12px 18px; border-radius: 100px;
  border: 1px solid ${D.hairlineOnDark};
  background: ${D.bg};
  font-size: 14px; color: ${D.inkOnDark};
  outline: none; transition: border-color 0.2s;
  &:focus { border-color: ${D.teal}; }
  &::placeholder { color: ${D.faintOnDark}; }
`;

const CtaButton = styled.button`
  padding: 12px 26px; border-radius: 100px; border: none; cursor: pointer;
  background: ${D.ctaGradient};
  box-shadow: ${D.ctaShadow};
  color: ${D.inkOnDark}; font-size: 14px; font-weight: 700; white-space: nowrap;
  transition: transform 0.2s ease, opacity 0.2s;
  &:hover { transform: translateY(-1px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
`;

const CtaLink = styled(Link)`
  display: inline-block;
  padding: 13px 30px; border-radius: 100px;
  background: ${D.ctaGradient};
  box-shadow: ${D.ctaShadow};
  color: ${D.inkOnDark}; font-size: 14px; font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-1px); }
`;

const FormNote = styled.p`
  &&& { margin: 10px 0 0; font-size: 12px; color: ${D.faintOnDark}; }
`;

const SuccessMsg = styled.p`
  &&& { color: ${D.tealBright}; font-weight: 600; margin: 0; }
`;

// ─── states ──────────────────────────────────────────────────────────────────

const EmptyState = styled.div`
  text-align: center;
  background: ${D.bgRaised};
  border: 1px solid ${D.hairlineOnDark};
  border-radius: 20px;
  padding: 56px 28px;
  ${appear(0.18)}
  h3 { font-family: ${theme.font.display}; font-size: 21px; font-weight: 700;
    color: ${D.inkOnDark}; margin: 0 0 10px; }
  p { font-size: 14px; line-height: 1.7; color: ${D.mutedOnDark};
    max-width: 380px; margin: 0 auto 24px; }
`;

const SpinnerEl = styled.div`
  width: 30px; height: 30px;
  border: 3px solid ${D.hairlineOnDark};
  border-top-color: ${D.teal};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  margin: 72px auto;
`;

const ErrorMsg = styled.p`
  text-align: center; color: ${D.mutedOnDark}; font-size: 14px; padding: 48px 24px;
`;

const PageFooter = styled.footer`
  text-align: center; margin-top: 48px;
  p.domain { font-family: ${MONO}; font-size: 11px; letter-spacing: 0.2em;
    color: ${D.faintOnDark}; margin: 0 0 6px; text-transform: uppercase; }
  p.brand { font-size: 12px; color: ${D.mutedOnDark}; margin: 0; }
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
            <stop offset="0%" stopColor={D.tealBright} />
            <stop offset="100%" stopColor={D.tealDeep} />
          </linearGradient>
        </defs>
        <circle className="track" cx="50" cy="50" r={R} />
        <circle className="fill" cx="50" cy="50" r={R}
          strokeDasharray={C} strokeDashoffset={C - (score / 100) * C} />
      </svg>
      <GaugeCenter>
        <span className="score">{score}</span>
        <span className="of">AV 100</span>
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
    <PageWrap>
      <TopFade />

      <Hero>
        <Eyebrow>Arvo-kontoret · {today}</Eyebrow>
        <H1>Ert Arvo-kontor.</H1>
        <HeroSub>
          Varje faktura ni delar bevakas härifrån — priser, avtal och
          marknadsrörelser, samlade i en bild.
        </HeroSub>
      </Hero>

      <Column>
        {analyses === null && !error && <SpinnerEl />}
        {error && <ErrorMsg>Kunde inte ladda ert kontor — försök igen om en stund.</ErrorMsg>}

        {analyses !== null && suppliers.length > 0 && (
          <>
            <OverviewBand>
              <GaugeRow>
                <ScoreGauge score={arvoScore} />
                <GaugeInfo>
                  <h2>Arvo Score<sup>™</sup></h2>
                  <p>
                    Baserat på {suppliers.length === 1
                      ? 'en bevakad leverantör'
                      : `${suppliers.length} bevakade leverantörer`} och
                    täckningen av era leverantörssegment. Fler delade fakturor
                    skärper bilden.
                  </p>
                </GaugeInfo>
              </GaugeRow>
              <KeyNumbers>
                <KeyNumber>
                  <p className="label">Bevakad årskostnad</p>
                  <p className="value">{fmtNum(totalAnnualCost)}<span className="unit">kr/år</span></p>
                </KeyNumber>
                <KeyNumber className={totalNetSaving > 0 ? 'saving' : ''}>
                  <p className="label">Identifierad nettobesparing</p>
                  <p className="value">{totalNetSaving > 0 ? `+${fmtNum(totalNetSaving)}` : '0'}<span className="unit">kr/år</span></p>
                </KeyNumber>
                <KeyNumber>
                  <p className="label">Leverantörer</p>
                  <p className="value">{suppliers.length}<span className="unit">st</span></p>
                </KeyNumber>
              </KeyNumbers>
            </OverviewBand>

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

            <PermanentCard>
              <h3>Gör Arvo permanent.</h3>
              <p>
                Sätt en vidarebefordringsregel för era leverantörsfakturor till
                adressen nedan, så analyserar Arvo varje ny faktura automatiskt —
                och hör av sig bara när något är fel prissatt.
              </p>
              <AddressChip>faktura@inbox.arvoflow.se</AddressChip>
            </PermanentCard>

            <ActionCard>
              <h3>Er samlade rapport, som PDF.</h3>
              <p>Hela kostnadsbilden, varje identifierat fynd och nästa steg — sammanställd och skickad till er inkorg.</p>
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
                    <CtaButton type="submit" disabled={submitState === 'loading' || !email}>
                      {submitState === 'loading' ? 'Skickar…' : 'Skicka rapporten →'}
                    </CtaButton>
                  </FormRow>
                  {submitState === 'error' && submitError && <FormNote>{submitError}</FormNote>}
                </>
              )}
            </ActionCard>

            <ActionCard>
              <h3>Hela leverantörsbilden, automatiskt.</h3>
              <p>
                Koppla Fortnox eller Visma så läser Arvo hela er leverantörsreskontra —
                varje avtal bevakat, varje prisrörelse fångad, utan ett enda mail.
              </p>
              <CtaLink to="/connect">Koppla Fortnox / Visma →</CtaLink>
            </ActionCard>
          </>
        )}

        {analyses !== null && suppliers.length === 0 && (
          <EmptyState>
            <h3>Ert kontor väntar på sin första faktura.</h3>
            <p>
              Mejla en leverantörsfaktura (PDF) till adressen nedan, eller ladda
              upp den direkt — analysen landar här inom ett par minuter.
            </p>
            <AddressChip style={{ maxWidth: 360, margin: '0 auto 22px' }}>
              faktura@inbox.arvoflow.se
            </AddressChip>
            <CtaLink to="/testa-faktura">Analysera en faktura direkt →</CtaLink>
          </EmptyState>
        )}

        <PageFooter>
          <p className="domain">arvoflow.se</p>
          <p className="brand">Arvo Intelligence</p>
        </PageFooter>
      </Column>
    </PageWrap>
  );
}
