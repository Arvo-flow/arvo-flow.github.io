import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: 40px 28px 80px;
  @media (max-width: 740px) { padding: 24px 18px 60px; }
`;

export const Greeting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.5s ease both;

  div.left small {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  div.left h1 {
    margin-top: 6px;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  div.right {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.color.muted};
    font-size: 13.5px;
  }
  div.right span.live {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-size: 12.5px;
    font-weight: 600;
  }
  div.right span.live::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px rgba(15, 81, 50, 0.18);
  }
`;

export const Headline = styled.section`
  margin-top: 32px;
  background: ${({ theme }) => theme.color.ink};
  color: #FAFAF7;
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 48px 40px;
  position: relative;
  overflow: hidden;
  animation: ${fadeUp} 0.6s 0.05s ease both;
  @media (max-width: 740px) { padding: 32px 24px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; right: -10%;
    width: 60%; height: 180%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.22), transparent 60%);
    pointer-events: none;
  }
`;

export const HeadlineGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: end;
  @media (max-width: 740px) { grid-template-columns: 1fr; gap: 24px; }
`;

export const BigNumber = styled.div`
  span.kicker {
    color: rgba(250, 250, 247, 0.7);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  div.amount {
    margin-top: 14px;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(56px, 9vw, 96px);
    line-height: 1;
    letter-spacing: -0.03em;
    font-weight: 500;
    font-feature-settings: "tnum";
    em { font-style: italic; color: ${({ theme }) => theme.color.accent}; font-weight: 400; }
  }
  span.unit {
    font-size: 18px;
    color: rgba(250, 250, 247, 0.6);
    margin-left: 12px;
  }
  p {
    margin-top: 18px;
    font-size: 15px;
    color: rgba(250, 250, 247, 0.75);
    line-height: 1.55;
    max-width: 400px;
  }
`;

export const StatList = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  padding-top: 24px;

  div { }
  dt {
    font-size: 12px;
    color: rgba(250, 250, 247, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  dd {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 24px;
    font-weight: 500;
    color: #FAFAF7;
    font-feature-settings: "tnum";
  }
`;

export const Section = styled.section`
  margin-top: 56px;
  animation: ${fadeUp} 0.6s 0.15s ease both;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  header h2 {
    font-size: 28px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  header p {
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
  }
  header div.filters {
    display: flex;
    gap: 6px;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.size.radius.pill};
    padding: 4px;
  }
  header button {
    padding: 8px 14px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.muted};
    transition: all ${({ theme }) => theme.motion.fast};
  }
  header button.active {
    background: ${({ theme }) => theme.color.ink};
    color: #FAFAF7;
  }
`;

export const OppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
`;

export const OppCard = styled.button`
  text-align: left;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 24px;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.motion.base}, box-shadow ${({ theme }) => theme.motion.base}, border-color ${({ theme }) => theme.motion.base};
  display: flex;
  flex-direction: column;
  gap: 18px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    border-color: ${({ theme }) => theme.color.borderStrong};
  }
`;

export const OppHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  div.icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  div.text { flex: 1; min-width: 0; }
  span.cat {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  strong {
    display: block;
    margin-top: 4px;
    font-size: 16.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span.confidence {
    font-size: 11.5px;
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-weight: 600;
    background: ${({ theme, $high }) => ($high ? theme.color.brandSoft : theme.color.warningSoft)};
    color: ${({ theme, $high }) => ($high ? theme.color.brand : theme.color.warning)};
  }
`;

export const OppSaving = styled.div`
  div.amount {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.success};
    font-feature-settings: "tnum";
  }
  div.unit {
    margin-top: 4px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
  }
`;

export const OppFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.delta {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    span { color: ${({ theme }) => theme.color.ink}; font-weight: 600; }
  }
  div.cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
  }
`;

export const Compare = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: ${({ theme }) => theme.color.surfaceAlt};
  border-radius: ${({ theme }) => theme.size.radius.md};

  div { font-size: 12.5px; }
  div span { display: block; color: ${({ theme }) => theme.color.muted}; }
  div strong {
    display: block;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    margin-top: 3px;
    font-feature-settings: "tnum";
  }
  div.right strong { color: ${({ theme }) => theme.color.success}; }
`;

export const TimelineWrap = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px;
`;

export const TimelineList = styled.ol`
  position: relative;
  padding-left: 20px;
  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 1.5px;
    background: ${({ theme }) => theme.color.border};
  }
`;

export const TimelineItem = styled.li`
  position: relative;
  padding: 12px 0 12px 24px;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 18px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: ${({ theme, $state }) => {
      if ($state === 'completed') return theme.color.brand;
      if ($state === 'current') return theme.color.surface;
      return theme.color.surface;
    }};
    border: 2px solid ${({ theme, $state }) => {
      if ($state === 'completed') return theme.color.brand;
      if ($state === 'current') return theme.color.brand;
      return theme.color.border;
    }};
    box-shadow: ${({ theme, $state }) => ($state === 'current' ? `0 0 0 5px ${theme.color.brandSoft}` : 'none')};
  }
  div.label {
    font-size: 14.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
  }
  div.detail {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 2px;
  }
  div.week {
    position: absolute;
    right: 0;
    top: 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    font-feature-settings: "tnum";
  }
`;
