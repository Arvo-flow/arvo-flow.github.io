import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import {
  Page, Hero, HeroEyebrow, HeroHeadline, HeroSub, HeroGrade,
  ScoreWrap, ScoreInner, ScoreRing,
  Body, Section, SectionLabel,
  ActionList, ActionCard, ActionCardInner, ActionTop, ActionMeta, ActionSaving,
  ActionBottom, StatusBadge, ActionBtn,
  CalendarWrap, CalendarTrack, CalendarLine, CalendarItems, CalendarItem,
  CategoryGrid, CategoryTile,
  CtaSection, CtaButton, TotalBar,
} from './styles';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

/* ── Mock-data ─────────────────────────────────────────────────────────────── */

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
  { name: 'Telia Mobil', date: 'Jul 2026', color: '#1B7A6E', tag: '47 dagar', tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'Bredband Com Hem', date: 'Sep 2026', color: '#1B7A6E', tag: '3 mån', tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'El — Vattenfall', date: 'Jan 2027', color: '#A8761A', tag: '7 mån', tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Ricoh Leasing', date: 'Dec 2026', color: '#A8761A', tag: '6 mån', tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Fortnox ERP', date: 'Löpande', color: '#BACBC2', tag: 'Månadsvis', tagBg: '#E8EDEC', tagColor: '#3F4B47' },
];

const CATEGORIES = [
  { name: 'Mobil',         score: 58, label: 'Förbättringsläge',  analyzed: true  },
  { name: 'SaaS',          score: 52, label: 'Förbättringsläge',  analyzed: true  },
  { name: 'Bredband',      score: 71, label: 'Bra förhandlat',    analyzed: true  },
  { name: 'El',            score: 65, label: 'Kan förbättras',    analyzed: true  },
  { name: 'Skrivarleasing',score: 47, label: 'Förbättringsläge',  analyzed: true  },
  { name: 'Larm & bevakning', score: null, label: 'Ej analyserat', analyzed: false },
  { name: 'Kortterminal',  score: null, label: 'Ej analyserat',   analyzed: false },
  { name: 'Frakt',         score: null, label: 'Ej analyserat',   analyzed: false },
];

function scoreColor(s) {
  if (!s) return '#BACBC2';
  if (s >= 80) return '#1B7A6E';
  if (s >= 60) return '#A8761A';
  return '#9F3B22';
}

function gradeLabel(s) {
  if (s >= 80) return { text: 'Välförhandlat',     dot: '#1B7A6E' };
  if (s >= 60) return { text: 'Kan förbättras',    dot: '#A8761A' };
  return              { text: 'Förbättringsläge',  dot: '#F5D598' };
}

const GAUGE_R = 62;
const GAUGE_C = 2 * Math.PI * GAUGE_R;

/* ── Component ─────────────────────────────────────────────────────────────── */

const ArvoScore = () => {
  const grade = gradeLabel(SCORE);
  const totalSaving = ACTIONS.reduce((s, a) => s + a.saving, 0);
  const arvoFee = Math.round(totalSaving * 0.20);

  return (
    <Page>
      <Nav />

      {/* ── Hero ── */}
      <Hero>
        <HeroEyebrow>Arvo analyserade 847 fakturor från Fortnox — Andersson &amp; Partners AB</HeroEyebrow>

        <ScoreWrap>
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={GAUGE_R} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="10" />
            <ScoreRing
              cx="80" cy="80" r={GAUGE_R}
              fill="none"
              stroke="#5DD6CA"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={GAUGE_C}
              $pct={SCORE / 100}
              style={{ transformOrigin: '80px 80px', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <ScoreInner>
            <span className="score-num">{SCORE}</span>
            <span className="score-denom">/100</span>
            <span className="score-label">Arvo Score™</span>
          </ScoreInner>
        </ScoreWrap>

        <HeroGrade $color={grade.dot}>
          <span className="dot" />
          <span>{grade.text}</span>
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

        {/* ── Kategoriöversikt ── */}
        <Section $delay="220ms">
          <SectionLabel>Arvo Score™ per kategori — 5 av 8 analyserade</SectionLabel>
          <CategoryGrid>
            {CATEGORIES.map((c) => (
              <CategoryTile key={c.name} $analyzed={c.analyzed} $score={c.score} $scoreColor={scoreColor(c.score)}>
                <span className="cat-name">{c.name}</span>
                {c.analyzed ? (
                  <>
                    <span className="cat-score">{c.score}</span>
                    <span className="cat-label">{c.label}</span>
                    <div className="cat-bar-bg">
                      <div className="cat-bar-fill" />
                    </div>
                  </>
                ) : (
                  <span className="cat-label">{c.label}</span>
                )}
              </CategoryTile>
            ))}
          </CategoryGrid>
        </Section>

        {/* ── CTA ── */}
        <Section $delay="300ms">
          <CtaSection>
            <TotalBar>
              <span className="bar-label">Total nettobesparing (år 1)</span>
              <span className="bar-value">+{fmt(totalSaving - arvoFee)} kr</span>
              <span className="bar-label">Arvos arvode (20 %)</span>
              <span className="bar-value" style={{ color: 'rgba(255,255,255,.5)', fontSize: 15 }}>−{fmt(arvoFee)} kr</span>
            </TotalBar>
            <h2>Aktivera aktionsplanen</h2>
            <p>
              Arvo förhandlar och sköter varje leverantörsbyte åt er — från uppsägning till nytt avtal.
              Ni betalar 20&nbsp;% av realiserad besparing. Inget annars.
            </p>
            <CtaButton>
              Aktivera alla byten
              <span className="fee-note">· 20 % av {fmt(totalSaving)} kr</span>
            </CtaButton>
          </CtaSection>
        </Section>

      </Body>
      <Footer />
    </Page>
  );
};

export default ArvoScore;
