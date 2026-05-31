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
  gap: 14px;
`;

/* ── Main dashboard card ── */

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

  .company {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.ink};
  }
  .sep {
    margin: 0 6px;
    color: ${({ theme }) => theme.color.borderStrong};
  }
  .live {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
  }
`;

export const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
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

export const NotifChip = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(14,26,23,.13);
  padding: 11px 16px 11px 11px;
  display: flex;
  align-items: center;
  gap: 11px;
  align-self: flex-end;
  margin-bottom: 10px;

  .chip-icon {
    width: 38px; height: 38px;
    border-radius: 11px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .chip-title {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.2;
  }
  .chip-sub {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 1px;
  }
`;

export const DashSavings = styled.div`
  padding: 26px 22px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .savings-label {
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 10px;
  }
  .savings-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 10px;
  }
  .savings-num {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(52px, 13vw, 80px);
    font-weight: 400;
    color: ${({ theme }) => theme.color.brand};
    line-height: 0.95;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
  }
  .savings-unit {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(24px, 5vw, 34px);
    font-weight: 400;
    color: ${({ theme }) => theme.color.brand};
    opacity: 0.6;
  }
  .savings-sub {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
    margin: 0;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  opacity: ${({ $locked }) => $locked ? 0.5 : 1};

  &:last-child { border-bottom: none; }
`;

export const ActionIconWrap = styled.div`
  width: 42px; height: 42px;
  border-radius: 13px;
  background: ${({ $locked, theme }) => $locked ? theme.color.surfaceAlt : theme.color.brandSoft};
  color: ${({ $locked, theme }) => $locked ? theme.color.borderStrong : theme.color.brand};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ActionBody = styled.div`
  flex: 1;
  min-width: 0;

  .action-title {
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.25;
  }
  .action-sub {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 2px;
    line-height: 1.3;
  }
`;

export const ActionAmount = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: ${({ $locked, theme }) => $locked ? theme.color.muted : theme.color.brand};
  white-space: nowrap;
  letter-spacing: -0.02em;
  font-feature-settings: "tnum";
  flex-shrink: 0;
`;

/* ── Secondary cards (Calendar, Segments) ── */

export const SecCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 28px rgba(14,26,23,.08);
  overflow: hidden;
`;

export const SecHeader = styled.div`
  padding: 15px 22px 13px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  p {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.muted};
    margin: 0;
  }
`;

export const CalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  &:last-child { border-bottom: none; }

  .cal-dot {
    width: 9px; height: 9px;
    border-radius: 50%;
    background: ${({ $color }) => $color ?? '#BACBC2'};
    flex-shrink: 0;
  }
  .cal-name {
    flex: 1;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cal-tag {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    background: ${({ $tagBg }) => $tagBg ?? '#E8EDEC'};
    color: ${({ $tagColor }) => $tagColor ?? '#3F4B47'};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cal-date {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    width: 60px;
    text-align: right;
    flex-shrink: 0;
  }
`;

export const SegRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  opacity: ${({ $analyzed }) => $analyzed ? 1 : 0.42};

  &:last-child { border-bottom: none; }

  .seg-icon {
    width: 32px; height: 32px;
    border-radius: 9px;
    background: ${({ $analyzed, theme }) => $analyzed ? theme.color.brandSoft : theme.color.surfaceAlt};
    color: ${({ $analyzed, theme }) => $analyzed ? theme.color.brand : theme.color.borderStrong};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .seg-name {
    flex: 1;
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
  }
  .seg-score {
    font-size: 13px;
    font-weight: 800;
    color: ${({ $scoreColor }) => $scoreColor ?? '#BACBC2'};
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    flex-shrink: 0;
  }
  .seg-na {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    flex-shrink: 0;
  }
`;

/* ── CTA ── */

export const CtaCard = styled.div`
  background: linear-gradient(160deg, #0E3D38 0%, #1B7A6E 100%);
  border-radius: 20px;
  padding: 26px 22px;
  text-align: center;

  h2 {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(19px, 4vw, 24px);
    color: #fff;
    margin: 0 0 7px;
    letter-spacing: -0.02em;
    font-weight: 700;
  }
  p {
    font-size: 13px;
    color: rgba(255,255,255,.65);
    margin: 0 0 20px;
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
  padding: 12px 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 6px;

  .bar-label {
    font-size: 12px;
    color: rgba(255,255,255,.6);
  }
  .bar-value {
    font-size: 16px;
    font-weight: 800;
    color: #5DD6CA;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
`;
