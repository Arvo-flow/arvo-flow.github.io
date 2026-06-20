import React from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, CardStack,
  DashCard, DashHeader, ActiveBadge, NotifChip, DashSavings,
  SectionLabel,
  ActionCard, ActionIconCircle, ActionMeta, ActionRight,
  CalCard, CalTrack, CalItem,
  SegScoreCard, TierPill, SegUndoneCard, SegUndoneRow,
  CtaCard, TotalBar,
} from './styles';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function scoreTier(s) {
  if (s >= 80) return { label: 'Optimalt',         desc: 'Ni har ett kostnadsoptimerat leverantörsnätverk. Ni betalar under eller i nivå med branschsnittet.', color: '#1B7A6E', bg: 'rgba(27,122,110,.1)' };
  if (s >= 65) return { label: 'Förbättringsläge', desc: 'Ni betalar mer än marknadspriset — en meningsfull besparing som Arvo kan realisera åt er utan byråkrati.', color: '#65A30D', bg: 'rgba(101,163,13,.1)' };
  if (s >= 45) return { label: 'Suboptimerat',     desc: 'Ni betalar klart mer än branschsnittet. Arvo kan göra ett byte som betalar sig från dag ett.', color: '#D97706', bg: 'rgba(217,119,6,.1)' };
  return         { label: 'Kritisk',               desc: 'Ni betalar kraftigt mer och förlorar pengar varje faktura. Arvo identifierar, förhandlar och genomför bytet åt er.', color: '#DC2626', bg: 'rgba(220,38,38,.1)' };
}

function ScoreRing({ score, color, size = 68 }) {
  const r = (size / 2) - 8;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - score / 100);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E8EDEC" strokeWidth={6} />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={6}
          strokeDasharray={C} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        lineHeight: 1,
      }}>
        <span style={{ fontSize: 18, fontWeight: 800, color, letterSpacing: '-0.02em' }}>{score}</span>
        <span style={{ fontSize: 10, color: '#8A988F', marginTop: 2 }}>/100</span>
      </div>
    </div>
  );
}

const ACTIONS = [
  {
    id: 1, category: 'Mobil', icon: 'phone',
    title: 'Tele2 Företag',
    sub: 'Byter från Telia · avtal löper ut om 47 dagar',
    btnLabel: 'Aktivera bytet',
    gross: 156_000, locked: false,
  },
  {
    id: 2, category: 'SaaS', icon: 'spark',
    title: 'Tier-optimering',
    sub: '12 oanvända Microsoft 365-licenser',
    btnLabel: 'Aktivera optimeringen',
    gross: 89_000, locked: false,
  },
  {
    id: 3, category: 'Skrivarleasing', icon: 'file',
    title: 'Ricoh',
    sub: 'Bundet t.o.m. dec 2026 — Arvo agerar vid förfall',
    btnLabel: 'Bevakas',
    gross: 39_000, locked: true,
  },
];

const CALENDAR = [
  { name: 'Telia Mobil',      date: 'Jul 2026', color: '#1B7A6E', tag: '47 dagar', tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'Bredband Com Hem', date: 'Sep 2026', color: '#1B7A6E', tag: '3 mån',    tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'El — Vattenfall',  date: 'Jan 2027', color: '#A8761A', tag: '7 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Ricoh Leasing',    date: 'Dec 2026', color: '#A8761A', tag: '6 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Fortnox ERP',      date: 'Löpande',  color: '#BACBC2', tag: 'Månadsvis', tagBg: '#E8EDEC', tagColor: '#3F4B47' },
];

const SEGMENTS = [
  { label: 'Telefoni och bredband', icon: 'phone',     score: 58, analyzed: true  },
  { label: 'Programvara',           icon: 'spark',     score: 52, analyzed: true  },
  { label: 'Skrivare',              icon: 'file',      score: 47, analyzed: true  },
  { label: 'El',                    icon: 'bolt',      score: 65, analyzed: true  },
  { label: 'IT',                    icon: 'wifi',      score: null, analyzed: false },
  { label: 'Fordon och frakt',      icon: 'truck',     score: null, analyzed: false },
  { label: 'Kontor och städ',       icon: 'briefcase', score: null, analyzed: false },
  { label: 'Personal och hälsa',    icon: 'shield',    score: null, analyzed: false },
];

const ArvoScore = () => {
  const totalGross = ACTIONS.reduce((s, a) => s + a.gross, 0);
  const arvoFee    = Math.round(totalGross * 0.20);
  const netSaving  = totalGross - arvoFee;
  const analyzed   = SEGMENTS.filter((s) => s.analyzed);
  const unanalyzed = SEGMENTS.filter((s) => !s.analyzed);

  return (
    <Page>
      <Nav />
      <CardStack>

        <NotifChip>
          <div className="chip-icon">
            <Icon name="spark" size={18} stroke={1.5} />
          </div>
          <div>
            <div className="chip-title">847 fakturor analyserade</div>
            <div className="chip-sub">scanning klar idag</div>
          </div>
        </NotifChip>

        <DashCard>
          <DashHeader>
            <span>
              <span className="company">Andersson &amp; Partners AB</span>
              <span className="sep">·</span>
              <span className="live">Live</span>
            </span>
            <ActiveBadge>Aktiv</ActiveBadge>
          </DashHeader>
          <DashSavings>
            <p className="savings-label">Er nettobesparing / år</p>
            <div className="savings-row">
              <span className="savings-num">{fmt(netSaving)}</span>
              <span className="savings-unit">kr</span>
            </div>
            <p className="savings-sub">
              Bruttobesparing {fmt(totalGross)}&nbsp;kr &middot; Arvos arvode {fmt(arvoFee)}&nbsp;kr (20&nbsp;%)
            </p>
          </DashSavings>
        </DashCard>

        <SectionLabel>ER AKTIONSPLAN — PRIORITERAD AV ARVO</SectionLabel>

        {ACTIONS.map((a) => (
          <ActionCard key={a.id} $locked={a.locked}>
            <ActionIconCircle $locked={a.locked}>
              <Icon name={a.locked ? 'lock' : a.icon} size={18} stroke={2} />
            </ActionIconCircle>
            <ActionMeta>
              <div className="meta-title">{a.category} · {a.title}</div>
              <div className="meta-sub">{a.sub}</div>
            </ActionMeta>
            <ActionRight>
              {a.locked ? (
                <span className="right-status">Bevakas</span>
              ) : (
                <>
                  <span className="right-amount">+{fmt(Math.round(a.gross * 0.8))} kr</span>
                  <Button $variant="brand" $size="sm">{a.btnLabel}</Button>
                </>
              )}
            </ActionRight>
          </ActionCard>
        ))}

        <SectionLabel>KONTRAKTSKALENDER</SectionLabel>

        <CalCard>
          <CalTrack>
            {CALENDAR.map((c) => (
              <CalItem key={c.name} $color={c.color} $tagBg={c.tagBg} $tagColor={c.tagColor}>
                <span className="cal-tag">{c.tag}</span>
                <span className="cal-circle" />
                <span className="cal-name">{c.name}</span>
                <span className="cal-date">{c.date}</span>
              </CalItem>
            ))}
          </CalTrack>
        </CalCard>

        <SectionLabel>
          ARVO SCORE™ PER SEGMENT — {analyzed.length} AV {SEGMENTS.length}
        </SectionLabel>

        {analyzed.map((seg) => {
          const t = scoreTier(seg.score);
          return (
            <SegScoreCard key={seg.label} $borderColor={t.color}>
              <ScoreRing score={seg.score} color={t.color} size={68} />
              <div className="seg-body">
                <span className="seg-score-label">Arvo Score™</span>
                <TierPill $color={t.color} $bg={t.bg}>{t.label}</TierPill>
                <div className="seg-name">{seg.label}</div>
                <div className="seg-desc">{t.desc}</div>
              </div>
            </SegScoreCard>
          );
        })}

        <SegUndoneCard>
          {unanalyzed.map((seg) => (
            <SegUndoneRow key={seg.label}>
              <div className="und-icon">
                <Icon name={seg.icon} size={14} stroke={1.5} />
              </div>
              <span className="und-name">{seg.label}</span>
              <span className="und-status">Ej analyserat</span>
            </SegUndoneRow>
          ))}
        </SegUndoneCard>

        <CtaCard>
          <TotalBar>
            <div className="bar-row">
              <span className="bar-label">Nettobesparing (år 1)</span>
              <span className="bar-value">+{fmt(netSaving)}&nbsp;kr</span>
            </div>
            <div className="bar-row">
              <span className="bar-label">Arvos arvode</span>
              <span className="bar-value" style={{ color: 'rgba(255,255,255,.45)', fontSize: 14 }}>
                −{fmt(arvoFee)}&nbsp;kr
              </span>
            </div>
          </TotalBar>
          <h2>Aktivera aktionsplanen</h2>
          <p>
            Arvo sköter varje leverantörsbyte åt er — från
            uppsägning till nytt avtal. Ni betalar 20&nbsp;% av realiserad
            besparing. Inget annars.
          </p>
          <Button
            $variant="gradient"
            $size="lg"
            $full
            style={{ background: '#fff', color: '#0E3D38', border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,.25)' }}
          >
            Aktivera alla byten
            <span style={{ fontSize: 11, fontWeight: 500, color: '#5C6E68', opacity: 0.8 }}>
              &nbsp;· 20&nbsp;% av {fmt(totalGross)}&nbsp;kr
            </span>
          </Button>
        </CtaCard>

      </CardStack>
      <Footer />
    </Page>
  );
};

export default ArvoScore;
