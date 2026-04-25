import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
`;

export const Hero = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 96px 28px 56px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 32px; }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.size.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.inkSoft};

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
`;

export const Headline = styled.h1`
  margin-top: 22px;
  font-size: clamp(40px, 5.5vw, 64px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 500; }
`;

export const Lede = styled.p`
  margin: 22px auto 0;
  max-width: 640px;
  font-size: 18px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.55;
`;

export const Section = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 28px;
  @media (max-width: 740px) { padding: 32px 20px; }
`;

export const RuleCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 22px;
  align-items: start;
  @media (max-width: 600px) { grid-template-columns: 1fr; padding: 24px; }

  div.num {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 26px;
    font-weight: 500;
    font-style: italic;
  }
  h3 {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  p {
    margin-top: 12px;
    font-size: 15.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  pre {
    margin-top: 18px;
    background: ${({ theme }) => theme.color.surfaceSunken};
    border: 1px solid ${({ theme }) => theme.color.border};
    padding: 16px 18px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft};
    overflow-x: auto;
    white-space: pre;
  }
  pre b { color: ${({ theme }) => theme.color.brand}; font-weight: 600; }
`;

export const ChoiceTable = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const ChoiceCol = styled.div`
  background: ${({ theme, $highlight }) => ($highlight ? theme.color.brand : theme.color.surface)};
  color: ${({ theme, $highlight }) => ($highlight ? '#FAFAF7' : theme.color.ink)};
  border: 1px solid ${({ theme, $highlight }) => ($highlight ? theme.color.brand : theme.color.border)};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 24px;
  position: relative;

  span.tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme, $highlight }) => ($highlight ? 'rgba(255,255,255,0.15)' : theme.color.surfaceAlt)};
    color: ${({ theme, $highlight }) => ($highlight ? '#FAFAF7' : theme.color.muted)};
  }
  h4 {
    margin-top: 14px;
    font-size: 22px;
    font-family: ${({ theme }) => theme.font.display};
    color: inherit;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.55;
    color: ${({ $highlight }) => ($highlight ? 'rgba(250,250,247,0.85)' : 'inherit')};
  }
  ul { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  li {
    font-size: 13.5px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    color: ${({ $highlight }) => ($highlight ? 'rgba(250,250,247,0.92)' : 'inherit')};
  }
  li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme, $highlight }) => ($highlight ? theme.color.accent : theme.color.brand)};
  }
`;

export const KickerH2 = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
`;

export const Kicker = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.color.brand};
  margin-bottom: 12px;
`;

export const SubLede = styled.p`
  font-size: 16.5px;
  color: ${({ theme }) => theme.color.muted};
  max-width: 640px;
  line-height: 1.55;
  margin-bottom: 32px;
`;

export const PolicyTable = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  overflow: hidden;
`;

export const PolicyRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 100px;
  gap: 18px;
  padding: 18px 24px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  &:last-child { border-bottom: none; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 6px; padding: 16px 18px; }

  &.header {
    background: ${({ theme }) => theme.color.surfaceAlt};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
    font-weight: 600;
  }
  div.cat {
    font-size: 14.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
  }
  div.detail {
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  div.cap {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
    text-align: right;
    font-feature-settings: "tnum";
    @media (max-width: 600px) { text-align: left; }
  }
`;

export const Cta = styled.section`
  text-align: center;
  padding: 96px 28px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(32px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 16px;
    font-size: 16.5px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.actions {
    margin-top: 28px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
