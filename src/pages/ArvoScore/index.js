import React from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, Hero, HeroEyebrow, HeroHeadline, HeroSub, HeroGrade,
  ScoreWrap, ScoreInner,
  Body, Section, SectionLabel,
  ScoreDiag,
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

function useAnimatedNum(target, delay = 200) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    setVal(0);
    if (!target) return;
    const t = setTimeout(() => {
      const dur = 1450;
      const t0 = performance.now();
      let raf;
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * ease));
        if (p < 1) { raf = requestAnimationFrame(tick); } else { setVal(target); }
      };
      raf = requestAnimationFrame(tick);
      return () => { if (raf) cancelAnimationFrame(raf); };
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return val;
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

// All 8 segments — analyzed ones have score + netSaving, rest are locked
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

const HERO_R = 48;
const HERO_C = 2 * Math.PI * HERO_R;
const DIAG_R = 26;
const DIAG_C = 2 * Math.PI * DIAG_R;

/* ── Component ─────────────────────────────────────────────────────────────── */

const ArvoScore = () => {
  const dc = diagColor(SCORE);
  const totalSaving = ACTIONS.reduce((s, a) => s + a.saving, 0);
  const arvoFee = Math.round(totalSaving * 0.20);
  const netSaving = totalSaving - arvoFee;
  const analyzedCount = SEGMENTS.filter((s) => s.analyzed).length;

  const [heroReady, setHeroReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const animScore = useAnimatedNum(SCORE, 300);

  return (
    <Page>
      <Nav />

      {/* ── Hero ── */}
      <Hero>
        <HeroEyebrow>Arvo analyserade 847 fakturor från Fortnox — Andersson &amp; Partners AB</HeroEyebrow>

        <ScoreWrap>
          <svg width="124" height="124" viewBox="0 0 124 124">
            <circle cx="62" cy="62" r={HERO_R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="8" />
            <circle
              cx="62" cy="62" r={HERO_R}
              fill="none"
              stroke="#5DD6CA"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={HERO_C}
              strokeDashoffset={heroReady ? HERO_C * (1 - SCORE / 100) : HERO_C}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '62px 62px', transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s' }}
            />
          </svg>
          <ScoreInner>
            <span className="score-num">{animScore}</span>
            <span className="score-denom">/100</span>
            <span className="score-label">Arvo Score™</span>
          </ScoreInner>
        </ScoreWrap>

        <HeroGrade $color={dc.dot}>
          <span className="dot" />
          <span>{dc.label}</span>
        </HeroGrade>

        <HeroHeadline>
          Ni betalar <em>{fmt(OVERPAYMENT)} kr/år</em> för mycket
        </HeroHeadline>
        <HeroSub>
          Arvo har identifierat {ACTIONS.length} konkreta åtgärder &mdash; vi sköter varje byte åt er.
        </HeroSub>
      </Hero>

      <Body>

        {/* ── Aktionsplan ── */}
        <Section $delay="80ms">
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

        {/* ── Kontraktskalender ── */}
        <Section $delay="160ms">
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

        {/* ── Arvo Score per segment — alla 8 ── */}
        <Section $delay="220ms">
          <SectionLabel>Arvo Score™ per segment — {analyzedCount} av {SEGMENTS.length} analyserade</SectionLabel>
          {SEGMENTS.map((seg) => {
            if (seg.analyzed) {
              const c = diagColor(seg.score);
              const gd = (seg.score / 100) * DIAG_C;
              return (
                <ScoreDiag key={seg.label} style={{ '--diag-color': c.dot }}>
                  <div className="gauge-wrap">
                    <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r={DIAG_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                      <circle
                        cx="30" cy="30" r={DIAG_R}
                        fill="none"
                        stroke={c.dot}
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeDasharray={`${gd} ${DIAG_C}`}
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
            }

            return (
              <ScoreDiag key={seg.label} style={{ '--diag-color': '#BACBC2', opacity: 0.55 }}>
                <div className="gauge-wrap">
                  <svg className="gauge-svg" width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r={DIAG_R} fill="none" stroke="#E5E7EB" strokeWidth="4.5" />
                  </svg>
                  <div className="gauge-num" style={{ color: '#BACBC2' }}>
                    <Icon name="lock" size={14} stroke={1.8} color="#BACBC2" />
                  </div>
                </div>
                <div className="diag-body">
                  <div className="diag-top">
                    <Icon name={seg.icon} size={14} stroke={1.8} color="#BACBC2" />
                    <span className="diag-score-label">{seg.label}</span>
                  </div>
                  <p className="diag-text">Ej analyserat</p>
                </div>
              </ScoreDiag>
            );
          })}
        </Section>

        {/* ── CTA ── */}
        <Section $delay="300ms">
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
