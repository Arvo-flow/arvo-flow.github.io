import styled, { keyframes } from 'styled-components';

const pulseDot = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

export const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
`;

export const CardStack = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* ── Notification chip ── */

export const NotifChip = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(14,26,23,.10);
  padding: 12px 16px 12px 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  .chip-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .chip-title { font-size: 14px; font-weight: 700; color: ${({ theme }) => theme.color.ink}; line-height: 1.2; }
  .chip-sub   { font-size: 12px; color: ${({ theme }) => theme.color.muted}; margin-top: 2px; }
`;

/* ── Main savings card ── */

export const DashCard = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 28px rgba(14,26,23,.08);
  overflow: hidden;
`;

export const DashHeader = styled.div`
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .company { font-size: 12px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; color: ${({ theme }) => theme.color.ink}; }
  .sep     { margin: 0 6px; color: ${({ theme }) => theme.color.borderStrong}; }
  .live    { font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.color.muted}; }
`;

export const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px; font-weight: 700;
  color: ${({ theme }) => theme.color.brand};
  background: ${({ theme }) => theme.color.brandSoft};
  padding: 4px 10px;
  border-radius: 999px;

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    flex-shrink: 0;
    animation: ${pulseDot} 2.4s ease infinite;
  }
`;

export const DashSavings = styled.div`
  padding: 26px 22px 24px;

  .savings-label { font-size: 13px; font-weight: 500; color: ${({ theme }) => theme.color.muted}; margin: 0 0 10px; }
  .savings-row   { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
  .savings-num   {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(52px, 13vw, 80px);
    font-weight: 400; color: ${({ theme }) => theme.color.brand};
    line-height: 0.95; letter-spacing: -0.02em; font-feature-settings: "tnum";
  }
  .savings-unit  {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(24px, 5vw, 34px);
    font-weight: 400; color: ${({ theme }) => theme.color.brand}; opacity: 0.6;
  }
  .savings-sub   { font-size: 12px; color: ${({ theme }) => theme.color.muted}; line-height: 1.5; margin: 0; }
`;

/* ── Section label ── */

export const SectionLabel = styled.p`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.muted};
  margin: 8px 4px 0;
`;

/* ── Action cards — clean partner-block style, no left border ── */

export const ActionCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: ${({ $locked }) => $locked ? 0.6 : 1};
`;

export const ActionIconCircle = styled.div`
  width: 44px; height: 44px;
  border-radius: 50%;
  background: ${({ $locked, theme }) => $locked ? theme.color.surfaceAlt : theme.color.brandSoft};
  color: ${({ $locked, theme }) => $locked ? theme.color.borderStrong : theme.color.brand};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
`;

export const ActionMeta = styled.div`
  flex: 1; min-width: 0;

  .meta-title {
    font-size: 14.5px; font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.3;
  }
  .meta-sub {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 2px; line-height: 1.3;
  }
`;

export const ActionRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 7px;
  flex-shrink: 0;

  .right-amount {
    font-size: 15px; font-weight: 800;
    color: ${({ theme }) => theme.color.brand};
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    white-space: nowrap;
  }
  .right-status {
    font-size: 13px; font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
  }
`;

/* ── Contract calendar (horizontal timeline) ── */

export const CalCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  overflow: hidden;
`;

export const CalTrack = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 16px;
  position: relative;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  &::before {
    content: '';
    position: absolute;
    top: 55px;
    left: 56px; right: 56px;
    height: 1.5px;
    background: ${({ theme }) => theme.color.border};
    z-index: 0;
  }
`;

export const CalItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
  flex: 1;
  position: relative;
  z-index: 1;

  .cal-tag {
    font-size: 10.5px; font-weight: 700;
    padding: 2px 7px; border-radius: 999px;
    background: ${({ $tagBg }) => $tagBg ?? '#E8EDEC'};
    color: ${({ $tagColor }) => $tagColor ?? '#3F4B47'};
    white-space: nowrap;
  }
  .cal-circle {
    width: 18px; height: 18px;
    border-radius: 50%;
    border: 2.5px solid ${({ $color }) => $color ?? '#BACBC2'};
    background: #fff;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;

    &::before {
      content: '';
      width: 7px; height: 7px;
      border-radius: 50%;
      background: ${({ $color }) => $color ?? '#BACBC2'};
      opacity: 0.55;
    }
  }
  .cal-name  { font-size: 11px; font-weight: 600; color: ${({ theme }) => theme.color.ink}; text-align: center; line-height: 1.3; }
  .cal-date  { font-size: 10px; color: ${({ theme }) => theme.color.muted}; text-align: center; margin-top: -4px; }
`;

/* ── Segment score cards — matching live result page style ── */

export const SegScoreCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  border-left: 4px solid ${({ $borderColor }) => $borderColor};
  padding: 16px 18px 16px 14px;
  display: flex;
  align-items: center;
  gap: 16px;

  .seg-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
  .seg-score-label {
    font-size: 10px; font-weight: 800;
    letter-spacing: .08em; text-transform: uppercase;
    color: ${({ theme }) => theme.color.muted};
  }
  .seg-name  { font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.color.muted}; }
  .seg-desc  { font-size: 12px; color: ${({ theme }) => theme.color.muted}; line-height: 1.5; margin-top: 1px; }
`;

export const TierPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px; font-weight: 700;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  padding: 3px 10px;
  border-radius: 999px;
  align-self: flex-start;

  &::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
  }
`;

export const SegUndoneCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(14,26,23,.07);
  overflow: hidden;
`;

export const SegUndoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  opacity: 0.42;
  &:last-child { border-bottom: none; }

  .und-icon {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    color: ${({ theme }) => theme.color.borderStrong};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .und-name   { flex: 1; font-size: 13.5px; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
  .und-status { font-size: 12px; color: ${({ theme }) => theme.color.muted}; flex-shrink: 0; }
`;

/* ── CTA card ── */

export const CtaCard = styled.div`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 100%);
  border-radius: 20px;
  padding: 24px 22px;
  text-align: center;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(19px, 4vw, 24px);
    color: #fff; margin: 0 0 7px;
    letter-spacing: -0.02em; font-weight: 700;
  }
  p { font-size: 13px; color: rgba(255,255,255,.65); margin: 0 0 20px; line-height: 1.6; }
`;

export const TotalBar = styled.div`
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .bar-row   { display: flex; align-items: center; justify-content: space-between; }
  .bar-label { font-size: 12px; color: rgba(255,255,255,.6); }
  .bar-value { font-size: 16px; font-weight: 800; color: #5DD6CA; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
`;
