import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
`;

export const Hero = styled.section`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 60%, #2AA090 100%);
  padding: 64px 24px 80px;
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
  margin: 0 0 32px;
`;

export const ScoreWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  svg { display: block; }
`;

export const ScoreInner = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .score-num {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 52px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.03em;
  }
  .score-denom {
    font-size: 14px;
    color: rgba(255,255,255,.5);
    font-weight: 500;
  }
  .score-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: rgba(255,255,255,.45);
    margin-top: 4px;
  }
`;

export const HeroGrade = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px;
  padding: 6px 16px;
  margin-bottom: 20px;

  .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color ?? '#F5D598'};
    flex-shrink: 0;
  }
  span {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.85);
  }
`;

export const HeroHeadline = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(28px, 6vw, 44px);
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.025em;
  line-height: 1.12;
  margin: 0 0 12px;
  max-width: 640px;
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
