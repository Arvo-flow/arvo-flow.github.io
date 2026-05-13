import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
`;

export const Hero = styled.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 96px 28px 40px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;
  @media (max-width: 740px) { padding: 56px 20px 28px; }
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
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 500; }
`;

export const Lede = styled.p`
  margin: 22px auto 0;
  max-width: 600px;
  font-size: 17px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
`;

export const Body = styled.section`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 28px 64px;
  @media (max-width: 740px) { padding: 24px 20px 48px; }
`;

export const Summary = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px;
  margin-bottom: 40px;

  h2 {
    font-size: 20px;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }
  p.intro {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 18px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  li {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 12px;
    font-size: 14.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  li svg {
    margin-top: 3px;
    color: ${({ theme }) => theme.color.brand};
    flex-shrink: 0;
  }
  li strong { color: ${({ theme }) => theme.color.ink}; font-weight: 600; }

  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const Clause = styled.section`
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  h3 {
    font-size: 19px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin-bottom: 14px;
  }
  h4 {
    font-size: 15px;
    font-weight: 600;
    margin-top: 18px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.color.ink};
  }
  p {
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.color.inkSoft};
    margin-bottom: 12px;
  }
  p:last-child { margin-bottom: 0; }
  ul, ol {
    margin: 8px 0 12px;
    padding-left: 22px;
  }
  ul li, ol li {
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.color.inkSoft};
    margin-bottom: 6px;
  }
  ul { list-style: disc; }
  ol { list-style: decimal; }

  strong { color: ${({ theme }) => theme.color.ink}; font-weight: 600; }
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; }
  a {
    color: ${({ theme }) => theme.color.brand};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Sub = styled.div`
  padding-left: 0;
  margin-top: 4px;

  p.tag {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 4px;
    letter-spacing: 0.02em;
  }
`;

export const FineprintBar = styled.div`
  margin: 48px auto 0;
  max-width: 720px;
  padding: 18px 24px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.color.border};
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.muted};
  text-align: center;

  strong { color: ${({ theme }) => theme.color.inkSoft}; font-weight: 600; }
`;

export const Cta = styled.section`
  text-align: center;
  padding: 64px 28px 96px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(26px, 3.5vw, 36px);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 14px;
    font-size: 15.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.6;
  }
  div.actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  a.mail {
    color: ${({ theme }) => theme.color.brand};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const Kicker = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.color.brand};
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-top: 56px;
  margin-bottom: 8px;
  &:first-child { margin-top: 0; }
`;

export const SectionLede = styled.p`
  font-size: 15.5px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const Table = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  overflow: hidden;
  margin: 16px 0 8px;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 18px;
  padding: 16px 22px;
  align-items: start;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  &:last-child { border-bottom: none; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 4px; padding: 14px 18px; }

  &.header {
    background: ${({ theme }) => theme.color.surfaceAlt};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
    font-weight: 600;
  }
  div.k {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
  }
  div.v {
    font-size: 14px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.55;
  }
`;
