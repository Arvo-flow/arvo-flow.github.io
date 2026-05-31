import React from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, HeroEyebrow, HeroHeadline, HeroSub,
  Body, Section, SectionLabel,
  SavingsBlock, ScoreRevealCard, ScoreDiag, SegmentSection,
  ActionList, ActionCard, ActionCardInner, ActionTop, ActionMeta, ActionSaving,
  ActionBottom, StatusBadge, ActionBtn,
  CalendarWrap, CalendarTrack, CalendarLine, CalendarItems, CalendarItem,
  CtaCard, TotalBar,
} from './styles';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function diagColor(s) {
  if (s < 45) return { dot: '#DC2626', label: 'Kritisk',          labelClr: '#991B1B', bg: '#FEF2F2' };
  if (s < 65) return { dot: '#D97706', label: 'Suboptimerat',     labelClr: '#92400E', bg: '#FFFBEB' };
  if (s < 80) return { dot: '#65A30D', label: 'Förbättringsläge', labelClr: '#365314', bg: '#F7FEE7' };
  return             { dot: '#1B7A6E', label: 'Optimalt',         labelClr: '#0E4F47', bg: '#DCEEEA' };
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

/* ── Mock data ─────────────────────────────────────────────────────────────── */

const SCORE = 61;
const OVERPAYMENT = 284_000;

const ACTIONS = [
  {
    id: 1,
    category: 'Mobil',
    from: 'Telia Företag',
    to: 'Tele2 Företag',
    saving: 156_000,
    status: 'urgent',
    statusText: 'Avtal löper ut om 47 dagar — optimalt förhandlingsläge',
    btnLabel: 'Aktivera bytet',
  },
  {
    id: 2,
    category: 'SaaS — Microsoft 365',
    from: 'Microsoft (nuvarande)',
    to: 'Tier-optimering',
    saving: 89_000,
    status: 'urgent',
    statusText: '12 oanvända licenser identifierade — spara direkt',
    btnLabel: 'Aktivera optimeringen',
  },
  {
    id: 3,
    category: 'Skrivarleasing',
    from: 'Ricoh',
    to: 'Kyocera',
    saving: 39_000,
    status: 'locked',
    statusText: 'Bundet t.o.m. dec 2026 — Arvo bevakar och agerar vid förfall',
    btnLabel: 'Bevakas',
  },
];

const CALENDAR = [
  { name: 'Telia Mobil',     date: 'Jul 2026', color: '#1B7A6E', tag: '47 dagar', tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'Bredband Com Hem',date: 'Sep 2026', color: '#1B7A6E', tag: '3 mån',    tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'El — Vattenfall', date: 'Jan 2027', color: '#A8761A', tag: '7 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Ricoh Leasing',   date: 'Dec 2026', color: '#A8761A', tag: '6 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Fortnox ERP',     date: 'Löpande',  color: '#BACBC2', tag: 'Månadsvis',tagBg: '#E8EDEC', tagColor: '#3F4B47' },
];

// Mirrors SEGMENTS from TestaFaktura; analyzed ones have a score and net saving
const SEGMENTS = [
  { label: 'Telefoni och bredband', icon: 'phone',     score: 58, analyzed: true,  netSaving: 125_000 },
  { label: 'Programvara',           icon: 'spark',     score: 52, analyzed: true,  netSaving: 71_000  },
  { label: 'Skrivare',              icon: 'file',      score: 47, analyzed: true,  netSaving: 31_000  },
  { label: 'El',                    icon: 'bolt',      score: 65, analyzed: true,  netSaving: null    },
  { label: 'IT',                    icon: 'wifi',      score: null, analyzed: false },
  { label: 'Fordon och frakt',      icon: 'truck',     score: null, analyzed: false },
  { label: 'Kontor och städ',       icon: 'briefcase', score: null, analyzed: false },
  { label: 'Personal och hälsa',    icon: 'shield',    score: null, analyzed: false },
];

const REVEAL_GAUGE_R = 40;
const REVEAL_GAUGE_C = 2 * Math.PI * REVEAL_GAUGE_R;
const DIAG_GAUGE_R = 26;
const DIAG_GAUGE_C = 2 * Math.PI * DIAG_GAUGE_R;

/* ── Component ─────────────────────────────────────────────────────────────── */

const ArvoScore = () => {
  const dc = diagColor(SCORE);
  const totalSaving = ACTIONS.reduce((s, a) => s + a.saving, 0);
  const arvoFee = Math.round(totalSaving * 0.20);
  const netSaving = totalSaving - arvoFee;
  const gaugeDash = (SCORE / 100) * REVEAL_GAUGE_C;
  const { score: animScore, gaugeReady } = useRevealedScore(SCORE, 300);
  const analyzedCount = SEGMENTS.filter((s) => s.analyzed).length;

  return (
    <Page>
      <Nav />

      {/* ── Hero ── */}
      <Hero>
        <HeroEyebrow>Arvo analyserade 847 fakturor från Fortnox — Andersson &amp; Partners AB</HeroEyebrow>
        <HeroHeadline>
          Ni betalar <em>{fmt(OVERPAYMENT)} kr/år</em> för mycket
        </HeroHeadline>
        <HeroSub>
          Arvo har identifierat {ACTIONS.length} konkreta åtgärder &mdash; vi sköter varje byte åt er.
        </HeroSub>
      </Hero>

      <Body>

        {/* ── Overall Arvo Score ── */}
        <Section $gap="32px">
          <ScoreRevealCard style={{ '--diag-color': dc.dot }}>
            <div className="gauge-wrap">
              <svg className="gauge-svg" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r={REVEAL_GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="7" />
                <circle
                  cx="45" cy="45" r={REVEAL_GAUGE_R}
                  fill="none"
                  stroke={dc.dot}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={gaugeReady ? `${gaugeDash} ${REVEAL_GAUGE_C}` : `0 ${REVEAL_GAUGE_C}`}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '45px 45px', transition: 'stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)' }}
                />
              </svg>
              <div className="num-overlay">
                <span className="score-val">{animScore}</span>
                <span className="score-denom">/100</span>
              </div>
            </div>
            <div className="content">
              <div className="eyebrow">Arvo Score™ — totalt</div>
              <div className="level-badge" style={{ background: dc.bg, color: dc.labelClr }}>
                <span className="level-dot" />
                {dc.label}
              </div>
              <p className="insight">
                {analyzedCount} av {SEGMENTS.length} segment analyserade. Ni överbetalar på mobil,
                SaaS och skrivarleasing &mdash; åtgärderna ger {fmt(netSaving)}&nbsp;kr/år i nettobesparing.
              </p>
            </div>
          </ScoreRevealCard>
        </Section>

        {/* ── Total savings ── */}
        <Section $gap="0px" $delay="60ms">
          <SavingsBlock>
            <span className="kicker">Total nettobesparing — år 1</span>
            <span className="amount">+{fmt(netSaving)}</span>
            <span className="unit">
              Bruttobesparing {fmt(totalSaving)}&nbsp;kr/år &middot; Arvos arvode {fmt(arvoFee)}&nbsp;kr (20&nbsp;%)
            </span>
          </SavingsBlock>
        </Section>

        {/* ── Aktionsplan ── */}
        <Section $delay="120ms">
          <SectionLabel>Er aktionsplan — prioriterad av Arvo</SectionLabel>
          <ActionList>
            {ACTIONS.map((a) => (
              <ActionCard key={a.id} $status={a.status}>
                <ActionCardInner>
                  <ActionTop>
                    <ActionMeta>
                      <p className="category">{a.category}</p>
                      <p className="suppliers">
                        {a.from}
                        <span className="arrow"> → </span>
                        {a.to}
                      </p>
                    </ActionMeta>
                    <ActionSaving>
                      <div className="amount">−{fmt(a.saving)}</div>
                      <div className="label">kr/år</div>
                    </ActionSaving>
                  </ActionTop>
                  <ActionBottom>
                    <StatusBadge $status={a.status}>{a.statusText}</StatusBadge>
                    <ActionBtn
                      $variant={a.status === 'locked' ? 'secondary' : 'primary'}
                      disabled={a.status === 'locked'}
                    >
                      {a.btnLabel}
                    </ActionBtn>
                  </ActionBottom>
                </ActionCardInner>
              </ActionCard>
            ))}
          </ActionList>
        </Section>

        {/* ── Arvo Score per segment ── */}
        <Section $delay="180ms">
          <SectionLabel>Arvo Score™ per segment — {analyzedCount} av {SEGMENTS.length} analyserade</SectionLabel>
          {SEGMENTS.filter((s) => s.analyzed).map((seg) => {
            const c = diagColor(seg.score);
            const gd = (seg.score / 100) * DIAG_GAUGE_C;
            return (
              <ScoreDiag key={seg.label} style={{ '--diag-color': c.dot }}>
                <div className="gauge-wrap">
                  <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r={DIAG_GAUGE_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                    <circle
                      cx="30" cy="30" r={DIAG_GAUGE_R}
                      fill="none"
                      stroke={c.dot}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeDasharray={`${gd} ${DIAG_GAUGE_C}`}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '30px 30px' }}
                    />
                  </svg>
                  <div className="gauge-num" style={{ color: c.dot }}>
                    <span className="gauge-val">{seg.score}</span>
                    <span className="gauge-denom">/100</span>
                  </div>
                </div>
                <div className="diag-body">
                  <div className="diag-top">
                    <Icon name={seg.icon} size={14} stroke={2} color={c.dot} />
                    <span className="diag-score-label">{seg.label}</span>
                    <span className="diag-sep">·</span>
                    <span className="diag-label" style={{ color: c.labelClr }}>{c.label}</span>
                  </div>
                  {seg.netSaving != null && (
                    <p className="diag-text">Identifierad nettobesparing: {fmt(seg.netSaving)}&nbsp;kr/år</p>
                  )}
                </div>
              </ScoreDiag>
            );
          })}
        </Section>

        {/* ── Segment-täckning ── */}
        <Section $delay="240ms">
          <SegmentSection>
            <h3>Lås upp er fullständiga Arvo Score™</h3>
            <p className="sub">
              {analyzedCount} segment analyserade via Fortnox. Koppla Visma eller ladda upp fler fakturor —
              Arvo skannar resten av er leverantörsreskontra och rapporterar automatiskt.
            </p>
            <p className="seg-count">SEGMENT — {analyzedCount} AV {SEGMENTS.length} ANALYSERADE</p>
            <div className="segment-grid">
              {SEGMENTS.map((seg) => (
                <div key={seg.label} className={`segment-tile${seg.analyzed ? ' tile-active' : ''}`}>
                  {!seg.analyzed && (
                    <span className="tile-lock">
                      <Icon name="lock" size={11} stroke={1.8} />
                    </span>
                  )}
                  <div className={`tile-icon${seg.analyzed ? ' icon-active' : ''}`}>
                    <Icon name={seg.icon} size={15} stroke={seg.analyzed ? 2.5 : 1.8} />
                  </div>
                  <span className="tile-name">{seg.label}</span>
                  {seg.analyzed ? (
                    <>
                      <span className="tile-status status-active">Analyserat</span>
                      {seg.netSaving != null && (
                        <span className="tile-metric">–{fmt(seg.netSaving)}&nbsp;kr/år</span>
                      )}
                    </>
                  ) : (
                    <span className="tile-status">Ej analyserat</span>
                  )}
                </div>
              ))}
            </div>
            <Button $variant="gradient" $size="lg">
              Koppla Fortnox / Visma →
            </Button>
          </SegmentSection>
        </Section>

        {/* ── Kontraktskalender ── */}
        <Section $delay="300ms">
          <SectionLabel>Kontraktskalender</SectionLabel>
          <CalendarWrap>
            <CalendarTrack>
              <CalendarLine />
              <CalendarItems>
                {CALENDAR.map((c) => (
                  <CalendarItem key={c.name} $color={c.color} $tagBg={c.tagBg} $tagColor={c.tagColor}>
                    <span className="tag">{c.tag}</span>
                    <span className="dot" />
                    <span className="name">{c.name}</span>
                    <span className="date">{c.date}</span>
                  </CalendarItem>
                ))}
              </CalendarItems>
            </CalendarTrack>
          </CalendarWrap>
        </Section>

        {/* ── CTA ── */}
        <Section $delay="360ms">
          <CtaCard>
            <TotalBar>
              <span className="bar-label">Total nettobesparing (år 1)</span>
              <span className="bar-value">+{fmt(netSaving)}&nbsp;kr</span>
              <span className="bar-label">Arvos arvode (20&nbsp;%)</span>
              <span className="bar-value" style={{ color: 'rgba(255,255,255,.5)', fontSize: 15 }}>
                −{fmt(arvoFee)}&nbsp;kr
              </span>
            </TotalBar>
            <h2>Aktivera aktionsplanen</h2>
            <p>
              Arvo förhandlar och sköter varje leverantörsbyte åt er — från uppsägning till nytt avtal.
              Ni betalar 20&nbsp;% av realiserad besparing. Inget annars.
            </p>
            <Button $variant="gradient" $size="lg" style={{ background: '#fff', color: '#0E3D38', border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,.25)' }}>
              Aktivera alla byten
              <span style={{ fontSize: 12, fontWeight: 500, color: '#3F4B47', opacity: 0.7 }}>
                &nbsp;· 20&nbsp;% av {fmt(totalSaving)}&nbsp;kr
              </span>
            </Button>
          </CtaCard>
        </Section>

      </Body>
      <Footer />
    </Page>
  );
};

export default ArvoScore;
