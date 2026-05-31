import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const revealFade = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
`;

export const Hero = styled.section`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 60%, #2AA090 100%);
  padding: 48px 24px 64px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 120%, rgba(93,214,202,.18) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const HeroEyebrow = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255,255,255,.55);
  margin: 0 0 16px;
`;

export const HeroHeadline = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(24px, 5vw, 38px);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.025em;
  line-height: 1.15;
  margin: 0 0 10px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;

  em {
    font-style: normal;
    color: #5DD6CA;
  }
`;

export const HeroSub = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,.6);
  margin: 0;
  line-height: 1.6;
`;

export const Body = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px 80px;
`;

export const Section = styled.section`
  margin-top: ${({ $gap }) => $gap ?? '40px'};
  animation: ${fadeUp} 0.45s ease both;
  animation-delay: ${({ $delay }) => $delay ?? '0ms'};
`;

export const SectionLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.muted};
  margin: 0 0 14px;
`;

/* ── SavingsBlock — matches TestaFaktura brandGradient block ── */

export const SavingsBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandGradient};
  color: #FAFAF7;

  span.kicker {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.85;
    margin-bottom: 8px;
  }
  span.amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
  }
  span.unit {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    opacity: 0.85;
    line-height: 1.5;
  }
`;

/* ── ScoreRevealCard — matches TestaFaktura large score card ── */

export const ScoreRevealCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 2px solid var(--diag-color, ${({ theme }) => theme.color.borderStrong});
  box-shadow: 0 2px 20px rgba(0,0,0,.06);

  .gauge-wrap {
    flex-shrink: 0;
    position: relative;
    width: 90px;
    height: 90px;
  }
  .gauge-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .num-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    pointer-events: none;
  }
  .score-val {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
    color: var(--diag-color);
  }
  .score-denom {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.4;
    color: var(--diag-color);
    margin-top: 1px;
  }
  .content {
    flex: 1;
    min-width: 0;
  }
  .eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 8px;
  }
  .level-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 13px 5px 9px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    animation: ${revealFade} 0.45s ease both;
    animation-delay: 0.4s;
  }
  .level-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--diag-color);
  }
  .insight {
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
    animation: ${revealFade} 0.45s ease both;
    animation-delay: 0.6s;
  }

  @media (max-width: 520px) {
    gap: 14px;
    padding: 12px 14px;
    .gauge-wrap { width: 72px; height: 72px; }
    .score-val { font-size: 26px; }
    .score-denom { font-size: 11px; }
    .level-badge { font-size: 13px; padding: 4px 10px 4px 8px; margin-bottom: 6px; }
    .insight { font-size: 13px; line-height: 1.5; }
  }
`;

/* ── ScoreDiag — matches TestaFaktura small score row ── */

export const ScoreDiag = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid var(--diag-color, ${({ theme }) => theme.color.borderStrong});
  margin-bottom: 12px;

  .gauge-wrap {
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
  }
  .gauge-svg {
    position: absolute;
    inset: 0;
  }
  .gauge-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    gap: 2px;
  }
  .gauge-val {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
  }
  .gauge-denom {
    font-size: 8px;
    font-weight: 600;
    opacity: 0.5;
  }
  .diag-body {
    flex: 1;
    min-width: 0;
  }
  .diag-top {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .diag-score-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.ink};
  }
  .diag-sep {
    color: ${({ theme }) => theme.color.borderStrong};
    font-size: 12px;
    flex-shrink: 0;
  }
  .diag-label {
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .diag-text {
    font-size: 13px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.muted};
    margin: 0;
    line-height: 1.45;
  }
`;

/* ── SegmentSection — NextSteps-style card with segment tile grid ── */

export const SegmentSection = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 24px;

  h3 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(18px, 3vw, 22px);
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }
  p.sub {
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.65;
    margin: 0 0 16px;
  }
  p.seg-count {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 10px;
  }

  .segment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 20px;
    @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); }
  }
  .segment-tile {
    position: relative;
    padding: 12px 12px 11px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.border};
    background: ${({ theme }) => theme.color.surface};
    display: flex;
    flex-direction: column;
    gap: 3px;
    opacity: 0.6;
    cursor: default;
    transition: opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
    &:hover {
      opacity: 0.85;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(14,26,23,.07);
    }
  }
  .tile-active {
    border: 1.5px solid ${({ theme }) => theme.color.brand};
    background: linear-gradient(
      145deg,
      ${({ theme }) => theme.color.brandSoft} 0%,
      ${({ theme }) => theme.color.surface} 100%
    );
    box-shadow: 0 2px 12px ${({ theme }) => theme.color.brand}1A;
    opacity: 1;
    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px ${({ theme }) => theme.color.brand}2A;
    }
  }
  .tile-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 7px;
    flex-shrink: 0;
  }
  .icon-active {
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.color.brand};
    border-color: transparent;
    color: #FAFAF7;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
  .tile-name {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  .tile-active .tile-name {
    font-size: 12.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
  }
  .tile-status {
    font-size: 10.5px;
    color: ${({ theme }) => theme.color.muted};
    font-weight: 500;
  }
  .status-active {
    color: ${({ theme }) => theme.color.brand};
    font-weight: 600;
    font-size: 11px;
  }
  .tile-metric {
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    letter-spacing: -0.03em;
    margin-top: 2px;
  }
  .tile-lock {
    position: absolute;
    top: 8px;
    right: 8px;
    color: ${({ theme }) => theme.color.borderStrong};
  }
`;

/* ── Action cards ── */

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const STATUS_COLORS = {
  urgent: '#1B7A6E',
  locked: '#5C6E68',
};

export const ActionCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1.5px solid ${({ $status, theme }) =>
    $status === 'urgent' ? theme.color.brand : theme.color.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  display: grid;
  grid-template-columns: 4px 1fr;

  &::before {
    content: '';
    display: block;
    background: ${({ $status }) => STATUS_COLORS[$status] ?? STATUS_COLORS.locked};
  }
`;

export const ActionCardInner = styled.div`
  padding: 18px 20px;
`;

export const ActionTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ActionMeta = styled.div`
  .category {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 4px;
  }
  .suppliers {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
    line-height: 1.25;
  }
  .arrow {
    color: ${({ theme }) => theme.color.brand};
    margin: 0 4px;
  }
`;

export const ActionSaving = styled.div`
  text-align: right;
  flex-shrink: 0;

  .amount {
    font-size: 20px;
    font-weight: 800;
    color: ${({ theme }) => theme.color.brand};
    letter-spacing: -0.03em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .label {
    font-size: 11px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 2px;
  }
`;

export const ActionBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $status }) => $status === 'urgent' ? '#DCEEEA' : '#E8EDEC'};
  color: ${({ $status }) => $status === 'urgent' ? '#0E4F47' : '#3F4B47'};

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ $status }) => STATUS_COLORS[$status] ?? STATUS_COLORS.locked};
    flex-shrink: 0;
  }
`;

export const ActionBtn = styled.button`
  font-size: 13px;
  font-weight: 700;
  padding: 8px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 160ms ease;
  white-space: nowrap;
  font-family: inherit;

  ${({ $variant }) => $variant === 'primary' ? `
    background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
    color: #fff;
    border: none;
    box-shadow: 0 4px 14px rgba(27,122,110,.3);
    &:hover { filter: brightness(1.06); transform: translateY(-1px); }
  ` : `
    background: transparent;
    color: #5C6E68;
    border: 1.5px solid #D5E2DC;
    &:hover { border-color: #1B7A6E; color: #1B7A6E; }
  `}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`;

/* ── Kontraktskalender ── */

export const CalendarWrap = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 24px;
  overflow: hidden;
`;

export const CalendarTrack = styled.div`
  position: relative;
  padding: 32px 0 8px;
`;

export const CalendarLine = styled.div`
  position: absolute;
  top: 44px;
  left: 0; right: 0;
  height: 2px;
  background: ${({ theme }) => theme.color.border};
`;

export const CalendarItems = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  position: relative;
`;

export const CalendarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: default;

  .dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    border: 2.5px solid ${({ theme }) => theme.color.surface};
    box-shadow: 0 0 0 1.5px ${({ $color }) => $color ?? '#BACBC2'};
    background: ${({ $color }) => $color ?? '#BACBC2'};
    z-index: 1;
    flex-shrink: 0;
  }
  .name {
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.inkSoft};
    text-align: center;
    line-height: 1.3;
  }
  .date {
    font-size: 10px;
    color: ${({ theme }) => theme.color.muted};
    text-align: center;
  }
  .tag {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    background: ${({ $tagBg }) => $tagBg ?? '#E8EDEC'};
    color: ${({ $tagColor }) => $tagColor ?? '#3F4B47'};
    white-space: nowrap;
  }
`;

/* ── CTA card ── */

export const CtaCard = styled.div`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 100%);
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 32px;
  text-align: center;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(20px, 4vw, 28px);
    color: #fff;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }
  p {
    font-size: 14px;
    color: rgba(255,255,255,.65);
    margin: 0 0 24px;
    line-height: 1.6;
  }
`;

export const TotalBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  padding: 14px 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 8px;

  .bar-label {
    font-size: 13px;
    color: rgba(255,255,255,.6);
  }
  .bar-value {
    font-size: 18px;
    font-weight: 800;
    color: #5DD6CA;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
`;
