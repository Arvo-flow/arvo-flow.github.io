import styled, { keyframes, css } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ticker = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

export const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
  overflow-x: hidden;
`;

export const Section = styled.section`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: ${({ $tight }) => ($tight ? '64px 28px' : '120px 28px')};
  @media (max-width: 740px) {
    padding: ${({ $tight }) => ($tight ? '48px 20px' : '80px 20px')};
  }
`;

export const Hero = styled.section`
  position: relative;
  padding: 96px 28px 80px;
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 56px 20px 48px; }
`;

export const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 30%, rgba(27, 122, 110, 0.10), transparent 50%),
    radial-gradient(circle at 82% 12%, rgba(93, 214, 202, 0.14), transparent 55%);
  z-index: 0;
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 48px; }
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
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.color.inkSoft};
  animation: ${fadeUp} 0.6s ease both;

  span.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
`;

export const Headline = styled.h1`
  margin-top: 24px;
  font-size: clamp(44px, 6vw, 76px);
  line-height: 1.02;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${fadeUp} 0.7s 0.1s ease both;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.color.brand};
    font-weight: 500;
  }
`;

export const Lede = styled.p`
  margin-top: 22px;
  font-size: 18.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.color.inkSoft};
  max-width: 540px;
  animation: ${fadeUp} 0.7s 0.2s ease both;
`;

export const HeroActions = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.3s ease both;
`;

export const HeroProof = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  animation: ${fadeUp} 0.7s 0.4s ease both;

  div {
    display: flex;
    flex-direction: column;
  }
  strong {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 2px;
  }
`;

export const HeroVisual = styled.div`
  position: relative;
  animation: ${fadeUp} 0.8s 0.2s ease both;
`;

export const PreviewCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: 28px;
  transform: rotate(0.4deg);
`;

export const PreviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  h4 {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-weight: 500;
  }
`;

export const SavingBig = styled.div`
  padding: 20px 0 14px;

  small {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    display: block;
    margin-bottom: 4px;
  }
  div.amount {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 56px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 400; }
  }
  span.unit { font-size: 14px; color: ${({ theme }) => theme.color.muted}; margin-left: 6px; }
`;

export const PreviewList = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PreviewRow = styled.li`
  display: grid;
  grid-template-columns: 32px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  div.icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.brand};
  }
  div.label {
    font-size: 14.5px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.ink};
  }
  div.sub {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.amount {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.success};
    font-feature-settings: "tnum";
  }
`;

export const PreviewFloat = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  ${({ $top }) => $top && `top: ${$top};`}
  ${({ $bottom }) => $bottom && `bottom: ${$bottom};`}
  ${({ $left }) => $left && `left: ${$left};`}
  ${({ $right }) => $right && `right: ${$right};`}
  transform: rotate(-2deg);

  div.dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.text { display: flex; flex-direction: column; }
  strong { font-size: 13.5px; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
  span { font-size: 12px; color: ${({ theme }) => theme.color.muted}; }
`;

export const TickerBand = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  padding: 22px 0;
  background: ${({ theme }) => theme.color.surface};
  overflow: hidden;
`;

export const TickerText = styled.div`
  display: flex;
  white-space: nowrap;
  gap: 64px;
  animation: ${ticker} 50s linear infinite;
  color: ${({ theme }) => theme.color.muted};
  font-size: 14px;
  letter-spacing: 0.02em;

  span {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }
  em {
    font-style: normal;
    color: ${({ theme }) => theme.color.borderStrong};
  }
`;

export const TrustStrip = styled.section`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: 80px 28px 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 56px 20px 24px;
  }
`;

export const TrustPillar = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform ${({ theme }) => theme.motion.base},
              box-shadow ${({ theme }) => theme.motion.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  div.icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
  }

  p {
    font-size: 14.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
  }

  > strong {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
    line-height: 1.4;
  }

  ul {
    margin-top: 6px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 14px;
  }
  ul li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.ink};
    font-weight: 500;
  }
  ul li svg {
    color: ${({ theme }) => theme.color.brand};
    flex-shrink: 0;
  }
  ul li.no {
    color: ${({ theme }) => theme.color.muted};
    font-weight: 500;
  }
  ul li.no svg {
    color: ${({ theme }) => theme.color.muted};
    opacity: 0.55;
  }
`;

export const SectionHead = styled.div`
  max-width: 720px;
  margin: 0 auto 64px;
  text-align: center;

  span.kicker {
    display: inline-block;
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 14px;
  }
  h2 {
    font-size: clamp(36px, 4.5vw, 56px);
    line-height: 1.05;
    letter-spacing: -0.025em;
  }
  p {
    margin-top: 18px;
    font-size: 18px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
  }

  @media (max-width: 740px) { margin-bottom: 40px; text-align: left; }
`;

export const HowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

export const HowCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px 28px;
  transition: transform ${({ theme }) => theme.motion.base}, box-shadow ${({ theme }) => theme.motion.base};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  span.step {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 15px;
    font-style: italic;
    color: ${({ theme }) => theme.color.brand};
  }
  h3 {
    margin-top: 16px;
    font-size: 24px;
    line-height: 1.15;
  }
  p {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.muted};
  }
  ul {
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  ul li {
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }
  ul li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.color.brand};
  }
`;

export const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 56px;
  align-items: center;
  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 40px; }
`;

export const Quote = styled.figure`
  background: ${({ theme }) => theme.color.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 40px 36px;
  position: relative;

  blockquote {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 26px;
    line-height: 1.35;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.color.ink};

    &::before { content: '“'; color: ${({ theme }) => theme.color.brand}; font-size: 60px; line-height: 0; vertical-align: -22px; margin-right: 4px; }
  }
  figcaption {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  figcaption div.avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
  }
  figcaption strong { display: block; font-size: 14.5px; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
  figcaption span { display: block; font-size: 13px; color: ${({ theme }) => theme.color.muted}; }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }

  div {
    border-left: 2px solid ${({ theme }) => theme.color.brand};
    padding-left: 18px;
  }
  strong {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 44px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
  }
  span {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
  }
`;

export const PricingCard = styled.div`
  max-width: 840px;
  margin: 0 auto;
  background: ${({ theme }) => theme.color.ink};
  color: #FAFAF7;
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 56px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 36px 28px; }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -20%;
    width: 60%;
    height: 200%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.20), transparent 60%);
    pointer-events: none;
  }
`;

export const PricingInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 740px) { grid-template-columns: 1fr; }

  span.kicker {
    color: ${({ theme }) => theme.color.accent};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  h3 {
    color: #FAFAF7;
    margin-top: 14px;
    font-size: 38px;
    line-height: 1.1;
  }
  p {
    color: rgba(250, 250, 247, 0.7);
    margin-top: 18px;
    font-size: 15.5px;
    line-height: 1.55;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  ul li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: rgba(250, 250, 247, 0.92);
    font-size: 14.5px;
  }
  ul li svg { color: ${({ theme }) => theme.color.accent}; flex-shrink: 0; margin-top: 3px; }
`;

export const FaqWrap = styled.div`
  max-width: 820px;
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export const FaqItem = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  padding: 24px 4px;

  summary {
    list-style: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 22px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
    &::-webkit-details-marker { display: none; }
  }
  summary::after {
    content: '+';
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 24px;
    color: ${({ theme }) => theme.color.muted};
    transition: transform ${({ theme }) => theme.motion.base};
  }
  &[open] summary::after { content: '−'; }
  p {
    margin-top: 16px;
    font-size: 15.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.muted};
    max-width: 700px;
  }
`;

export const FinalCta = styled.section`
  text-align: center;
  padding: 120px 28px;
  max-width: 720px;
  margin: 0 auto;

  h2 {
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.025em;
  }
  p {
    margin-top: 18px;
    font-size: 17px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.actions {
    margin-top: 32px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  div.fineprint {
    margin-top: 16px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.mutedSoft};
  }
`;
