import React from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import {
  Page, CardStack,
  DashCard, DashHeader, ActiveBadge, NotifChip, DashSavings,
  ActionRow, ActionIconWrap, ActionBody, ActionAmount,
  SecCard, SecHeader, CalRow, SegRow,
  CtaCard, TotalBar,
} from './styles';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

function scoreColor(s) {
  if (!s)    return '#BACBC2';
  if (s >= 80) return '#1B7A6E';
  if (s >= 65) return '#65A30D';
  return '#D97706';
}

/* ── Mock data ─────────────────────────────────────────────────────────────── */

const ACTIONS = [
  {
    id: 1,
    category: 'Mobil',
    supplier: 'Tele2 Företag',
    sub: 'Byter från Telia · avtal löper ut om 47 dagar',
    icon: 'phone',
    gross: 156_000,
    locked: false,
  },
  {
    id: 2,
    category: 'SaaS',
    supplier: 'Tier-optimering',
    sub: '12 oanvända Microsoft 365-licenser',
    icon: 'spark',
    gross: 89_000,
    locked: false,
  },
  {
    id: 3,
    category: 'Skrivarleasing',
    supplier: 'Ricoh',
    sub: 'Bundet t.o.m. dec 2026 — Arvo bevakar',
    icon: 'file',
    gross: 39_000,
    locked: true,
  },
];

const CALENDAR = [
  { name: 'Telia Mobil',      date: 'Jul 2026', color: '#1B7A6E', tag: '47 dagar', tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'Bredband Com Hem', date: 'Sep 2026', color: '#1B7A6E', tag: '3 mån',    tagBg: '#DCEEEA', tagColor: '#0E4F47' },
  { name: 'El — Vattenfall',  date: 'Jan 2027', color: '#A8761A', tag: '7 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Ricoh Leasing',    date: 'Dec 2026', color: '#A8761A', tag: '6 mån',    tagBg: '#F3E5C7', tagColor: '#6B4A0E' },
  { name: 'Fortnox ERP',      date: 'Löpande',  color: '#BACBC2', tag: 'Månadsvis',tagBg: '#E8EDEC', tagColor: '#3F4B47' },
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

/* ── Component ─────────────────────────────────────────────────────────────── */

const ArvoScore = () => {
  const totalGross = ACTIONS.reduce((s, a) => s + a.gross, 0);
  const arvoFee    = Math.round(totalGross * 0.20);
  const netSaving  = totalGross - arvoFee;
  const analyzedCount = SEGMENTS.filter((s) => s.analyzed).length;

  return (
    <Page>
      <Nav />

      <CardStack>

        {/* ── Notification chip + main card ── */}
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

          {ACTIONS.map((a) => (
            <ActionRow key={a.id} $locked={a.locked}>
              <ActionIconWrap $locked={a.locked}>
                <Icon name={a.icon} size={18} stroke={a.locked ? 1.6 : 2} />
              </ActionIconWrap>
              <ActionBody>
                <div className="action-title">{a.category} · {a.supplier}</div>
                <div className="action-sub">{a.sub}</div>
              </ActionBody>
              <ActionAmount $locked={a.locked}>
                {a.locked
                  ? 'Bevakas'
                  : `+${fmt(Math.round(a.gross * 0.8))} kr`}
              </ActionAmount>
            </ActionRow>
          ))}
        </DashCard>

        {/* ── Kontraktskalender ── */}
        <SecCard>
          <SecHeader><p>Kontraktskalender</p></SecHeader>
          {CALENDAR.map((c) => (
            <CalRow key={c.name} $color={c.color} $tagBg={c.tagBg} $tagColor={c.tagColor}>
              <span className="cal-dot" />
              <span className="cal-name">{c.name}</span>
              <span className="cal-tag">{c.tag}</span>
              <span className="cal-date">{c.date}</span>
            </CalRow>
          ))}
        </SecCard>

        {/* ── Arvo Score per segment ── */}
        <SecCard>
          <SecHeader>
            <p>Arvo Score™ per segment — {analyzedCount} av {SEGMENTS.length}</p>
          </SecHeader>
          {SEGMENTS.map((seg) => (
            <SegRow key={seg.label} $analyzed={seg.analyzed} $scoreColor={scoreColor(seg.score)}>
              <div className="seg-icon">
                <Icon name={seg.icon} size={15} stroke={seg.analyzed ? 2 : 1.5} />
              </div>
              <span className="seg-name">{seg.label}</span>
              {seg.analyzed
                ? <span className="seg-score">{seg.score}/100</span>
                : <span className="seg-na">Ej analyserat</span>}
            </SegRow>
          ))}
        </SecCard>

        {/* ── CTA ── */}
        <CtaCard>
          <TotalBar>
            <span className="bar-label">Nettobesparing (år 1)</span>
            <span className="bar-value">+{fmt(netSaving)}&nbsp;kr</span>
            <span className="bar-label">Arvos arvode</span>
            <span className="bar-value" style={{ color: 'rgba(255,255,255,.45)', fontSize: 14 }}>
              −{fmt(arvoFee)}&nbsp;kr
            </span>
          </TotalBar>
          <h2>Aktivera aktionsplanen</h2>
          <p>
            Arvo förhandlar och sköter varje leverantörsbyte åt er — från
            uppsägning till nytt avtal. Ni betalar 20&nbsp;% av realiserad
            besparing. Inget annars.
          </p>
          <Button
            $variant="gradient"
            $size="lg"
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
