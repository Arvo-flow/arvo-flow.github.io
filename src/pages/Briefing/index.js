import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
  ScrollWrap, Card,
  CoverCard, CoverEyebrow, CoverPeriod,
  SavingLabel, SavingNumber, SavingUnit, InsightCount, ScrollHint, ScrollHintText, ScrollArrow,
  NavDots, NavDot,
  InsightCard, InsightInner,
  Breadcrumb, SupplierChip, TypeBadge, Headline, Subheadline,
  MetricGrid, MetricBlock, MetricValue, MetricUnit, MetricLabel,
  ContextText, CardFooter, CtaButton, Spinner,
  SummaryCard, CheckCircle, SummaryTitle, SummaryBody,
  ActionsList, ActionItem, ActionCheck, ActionText,
  SummaryResponseNote, SummaryCta,
  LoadingWrap, LoadingDots, LoadingDot, LoadingText,
  ErrorWrap, ErrorIcon, ErrorTitle, ErrorBody, ErrorCta,
} from './styles';

const fmt = (n) => Math.round(n ?? 0).toLocaleString('sv-SE');

// ── Counter animation hook ────────────────────────────────────────────────────

function useCounter(target, duration = 1300) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) { raf = requestAnimationFrame(tick); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// ── Type labels ───────────────────────────────────────────────────────────────

const TYPE_LABEL = {
  recommendation: 'Bytesrekommendation',
  cost_trend:     'Prishöjning',
  overpaying:     'Överpris',
  price_alert:    'Prishöjningsvarning',
};

// ── Period formatter ──────────────────────────────────────────────────────────

function formatPeriod(period) {
  if (!period) return '';
  const [year, month] = period.split('-').map(Number);
  const d = new Date(year, month - 1, 1);
  const label = d.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

// ── Arvo logotyp — teal gradient, anpassad för mörk bakgrund ─────────────────
const ArvoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="briefingGrad" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ECDC4" />
        <stop offset="100%" stopColor="#1DB09A" />
      </linearGradient>
    </defs>
    <path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#briefingGrad)" />
  </svg>
);

// ── Arrow down SVG ────────────────────────────────────────────────────────────

const ArrowDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10l6 6 6-6" stroke="#1DB09A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 14l6 6 10-12" stroke="#1DB09A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Main component ────────────────────────────────────────────────────────────

export default function Briefing() {
  const { token } = useParams();
  const [state, setState] = useState('loading'); // loading | error | ready
  const [briefing, setBriefing] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeCard, setActiveCard] = useState(0);
  const [visibleCards, setVisibleCards] = useState({});
  const [actionStates, setActionStates] = useState({});
  const [actionsTaken, setActionsTaken] = useState({});

  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  const animatedSaving = useCounter(
    state === 'ready' ? briefing?.totalSavingPotential : 0,
  );

  // ── Fetch briefing ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) { setState('error'); setErrorMsg('Ogiltig länk'); return; }

    fetch(`/api/briefing?token=${encodeURIComponent(token)}`)
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { setState('error'); setErrorMsg(data.error ?? 'Okänt fel'); return; }
        setBriefing(data.briefing);
        setActionsTaken(data.briefing.actionsTaken ?? {});
        setState('ready');
      })
      .catch(() => { setState('error'); setErrorMsg('Kunde inte hämta briefingen'); });
  }, [token]);

  // ── IntersectionObserver for card animations ────────────────────────────────
  useEffect(() => {
    if (state !== 'ready') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const idx = Number(entry.target.dataset.cardIndex);
          if (entry.isIntersecting) {
            setVisibleCards(prev => ({ ...prev, [idx]: true }));
            setActiveCard(idx);
          }
        });
      },
      { threshold: 0.4, root: scrollRef.current },
    );

    cardRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [state, briefing]);

  // ── Handle action click ─────────────────────────────────────────────────────
  const handleAction = useCallback(async (insightId, actionLabel) => {
    if (actionStates[insightId] === 'loading' || actionStates[insightId] === 'done') return;
    setActionStates(prev => ({ ...prev, [insightId]: 'loading' }));

    try {
      const resp = await fetch(`/api/briefing?token=${encodeURIComponent(token)}`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ insightId, action: actionLabel }),
      });
      const data = await resp.json();
      if (resp.ok && data.ok) {
        setActionStates(prev => ({ ...prev, [insightId]: 'done' }));
        setActionsTaken(data.actionsTaken ?? {});
      } else {
        setActionStates(prev => ({ ...prev, [insightId]: 'idle' }));
      }
    } catch {
      setActionStates(prev => ({ ...prev, [insightId]: 'idle' }));
    }
  }, [token, actionStates]);

  // ── Navigate to next card ───────────────────────────────────────────────────
  const goToCard = useCallback((idx) => {
    const el = cardRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ── Render: loading ─────────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <LoadingWrap>
        <LoadingDots>
          {[0, 1, 2].map(i => <LoadingDot key={i} $i={i} />)}
        </LoadingDots>
        <LoadingText>Hämtar din Arvo-briefing…</LoadingText>
      </LoadingWrap>
    );
  }

  // ── Render: error ───────────────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <ErrorWrap>
        <ErrorIcon>🔒</ErrorIcon>
        <ErrorTitle>Briefingen hittades inte</ErrorTitle>
        <ErrorBody>
          {errorMsg || 'Länken kan ha gått ut eller är ogiltig.'}{' '}
          Ladda upp en ny faktura så genererar Arvo en uppdaterad briefing åt er.
        </ErrorBody>
        <ErrorCta href="/testa-faktura">Analysera en faktura →</ErrorCta>
      </ErrorWrap>
    );
  }

  const insights = briefing?.insights ?? [];
  const totalCards = 1 + insights.length + 1; // cover + insights + summary
  const anyActionTaken = Object.keys(actionsTaken).length > 0;

  // ── Render: ready ───────────────────────────────────────────────────────────
  return (
    <>
      {/* Navigation dots */}
      <NavDots>
        {Array.from({ length: totalCards }, (_, i) => (
          <NavDot
            key={i}
            $active={activeCard === i}
            onClick={() => goToCard(i)}
            aria-label={`Gå till kort ${i + 1}`}
          />
        ))}
      </NavDots>

      <ScrollWrap ref={scrollRef}>

        {/* ── Cover card ──────────────────────────────────────────────────── */}
        <CoverCard
          data-card-index="0"
          ref={el => { cardRefs.current[0] = el; }}
        >
          <ArvoMark size={44} />
          <CoverEyebrow>Arvo Intelligence</CoverEyebrow>
          <CoverPeriod>{formatPeriod(briefing?.period)}</CoverPeriod>

          <SavingLabel>Potentiell besparing</SavingLabel>
          <SavingNumber>
            {fmt(animatedSaving)}<SavingUnit>kr/år</SavingUnit>
          </SavingNumber>

          <InsightCount>
            Arvo har identifierat{' '}
            <strong>{insights.length} {insights.length === 1 ? 'besparingsinsikt' : 'besparingsinsikter'}</strong>
            {' '}för ert bolag
          </InsightCount>

          <ScrollHint>
            <ScrollHintText>Scrolla för att se insikterna</ScrollHintText>
            <ScrollArrow><ArrowDown /></ScrollArrow>
          </ScrollHint>
        </CoverCard>

        {/* ── Insight cards ────────────────────────────────────────────────── */}
        {insights.map((insight, idx) => {
          const cardIdx = idx + 1;
          const isVisible = !!visibleCards[cardIdx];
          const actionState = actionStates[insight.id] ?? 'idle';
          const isDone = actionState === 'done' || !!actionsTaken[insight.id];
          const isLoading = actionState === 'loading';

          return (
            <InsightCard
              key={insight.id}
              data-card-index={String(cardIdx)}
              ref={el => { cardRefs.current[cardIdx] = el; }}
            >
              <InsightInner>
                <Breadcrumb $visible={isVisible}>
                  INSIKT {idx + 1} AV {insights.length}
                </Breadcrumb>

                <div>
                  <TypeBadge $type={insight.type}>
                    {TYPE_LABEL[insight.type] ?? insight.type}
                  </TypeBadge>
                  <SupplierChip $visible={isVisible}>
                    {insight.supplier}
                  </SupplierChip>
                </div>

                <Headline $visible={isVisible}>{insight.headline}</Headline>
                <Subheadline $visible={isVisible}>{insight.subheadline}</Subheadline>

                <MetricGrid $visible={isVisible}>
                  <MetricBlock>
                    <MetricValue $primary>
                      {fmt(insight.metric?.primary?.value)}
                      <MetricUnit>kr</MetricUnit>
                    </MetricValue>
                    <MetricLabel>{insight.metric?.primary?.label}</MetricLabel>
                  </MetricBlock>
                  {insight.metric?.secondary?.value != null && (
                    <MetricBlock>
                      <MetricValue>
                        {typeof insight.metric.secondary.value === 'number' && insight.metric.secondary.label?.includes('%')
                          ? `${insight.metric.secondary.value}%`
                          : fmt(insight.metric.secondary.value)}
                        {!insight.metric.secondary.label?.includes('%') && (
                          <MetricUnit>kr</MetricUnit>
                        )}
                      </MetricValue>
                      <MetricLabel>{insight.metric?.secondary?.label}</MetricLabel>
                    </MetricBlock>
                  )}
                </MetricGrid>

                <ContextText $visible={isVisible}>{insight.context}</ContextText>

                {insight.action && (
                  <CardFooter $visible={isVisible}>
                    <CtaButton
                      $done={isDone}
                      $loading={isLoading}
                      disabled={isDone || isLoading}
                      onClick={() => handleAction(insight.id, insight.action.label)}
                    >
                      {isLoading && <Spinner />}
                      {isDone
                        ? '✓ Arvo är på det — vi återkommer inom 24 timmar'
                        : insight.action.label}
                    </CtaButton>
                  </CardFooter>
                )}
              </InsightInner>
            </InsightCard>
          );
        })}

        {/* ── Summary card ─────────────────────────────────────────────────── */}
        <SummaryCard
          data-card-index={String(totalCards - 1)}
          ref={el => { cardRefs.current[totalCards - 1] = el; }}
        >
          <CheckCircle>
            <CheckIcon />
          </CheckCircle>

          <SummaryTitle>Er Arvo-briefing är klar</SummaryTitle>

          <SummaryBody>
            {anyActionTaken
              ? 'Bra jobbat — ni har aktiverat Arvo. Vi granskar era avtal och återkommer med en konkret handlingsplan.'
              : 'Era insikter väntar på er. Ni kan alltid komma tillbaka till denna sida via länken i mailet.'}
          </SummaryBody>

          {anyActionTaken && (
            <ActionsList>
              {Object.entries(actionsTaken).map(([id, a]) => (
                <ActionItem key={id}>
                  <ActionCheck>✓</ActionCheck>
                  <ActionText>
                    <strong>{a.type === 'approve_switch' ? 'Bytesuppdrag' : 'Förhandlingsuppdrag'}</strong>
                    {' '}aktiverat för <strong>{a.supplier}</strong>
                    {a.estimatedNetSaving > 0 && ` · Potentiell besparing: ${fmt(a.estimatedNetSaving)} kr/år`}
                  </ActionText>
                </ActionItem>
              ))}
            </ActionsList>
          )}

          {anyActionTaken && (
            <SummaryResponseNote>
              Arvo återkommer inom 24 timmar med nästa steg.
            </SummaryResponseNote>
          )}

          <SummaryCta href="/testa-faktura">
            Analysera fler fakturor →
          </SummaryCta>
        </SummaryCard>

      </ScrollWrap>
    </>
  );
}
