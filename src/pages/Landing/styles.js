import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
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

export const HeroDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  margin: 0;
`;

export const WaveDivider = styled.div`
  position: relative;
  width: 100%;
  line-height: 0;
  overflow: hidden;
  background: ${({ theme }) => theme.color.bg};

  svg { display: block; width: 100%; height: 56px; }
  path { fill: ${({ theme }) => theme.color.surfaceAlt}; }
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
  gap: 0;
  flex-wrap: nowrap;
  animation: ${fadeUp} 0.7s 0.4s ease both;

  div {
    display: flex;
    flex-direction: column;
    padding-right: 24px;
  }
  div + div {
    padding-left: 24px;
    border-left: 1px solid ${({ theme }) => theme.color.border};
  }
  strong {
    font-size: 14.5px;
    font-weight: 650;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -.01em;
  }
  span {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 3px;
    line-height: 1.4;
  }
  @media (max-width: 580px) {
    flex-wrap: wrap;
    gap: 16px;
    div { padding-right: 0; }
    div + div { padding-left: 0; border-left: none; }
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

export const TrustStrip = styled.section`
  position: relative;
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: 88px 28px 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: calc(-50vw + 50%);
    right: calc(-50vw + 50%);
    background: ${({ theme }) => theme.color.surfaceAlt};
    z-index: -1;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 64px 20px 56px;
  }
`;

export const TrustPillar = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow:
    0 0 0 1px rgba(27, 122, 110, 0.07),
    0 2px 4px rgba(14, 26, 23, 0.04),
    0 8px 28px rgba(14, 26, 23, 0.07);
  transition: transform ${({ theme }) => theme.motion.base},
              box-shadow ${({ theme }) => theme.motion.base};

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(27, 122, 110, 0.10),
      0 4px 8px rgba(14, 26, 23, 0.06),
      0 20px 48px rgba(14, 26, 23, 0.10);
  }

  div.icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brandGradient};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    flex-shrink: 0;
  }

  h3 {
    font-size: 19px;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.ink};
  }

  p {
    font-size: 14px;
    line-height: 1.6;
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
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  ul li.group-label {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.brand};
    padding: 14px 0 8px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    margin-top: 2px;
  }
  ul li.group-label:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }
  ul li.group-label.blocked {
    color: ${({ theme }) => theme.color.muted};
  }
  ul li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.ink};
    font-weight: 500;
    padding: 5px 0;
  }
  ul li svg {
    color: ${({ theme }) => theme.color.brand};
    flex-shrink: 0;
  }
  ul li.no {
    color: ${({ theme }) => theme.color.muted};
    font-weight: 400;
  }
  ul li.no svg {
    color: ${({ theme }) => theme.color.muted};
    opacity: 0.5;
  }
`;

export const AlgoTrust = styled.section`
  position: relative;
  padding: 72px 28px;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: calc(-50vw + 50%);
    right: calc(-50vw + 50%);
    background: linear-gradient(160deg,
      ${({ theme }) => theme.color.brandSoft} 0%,
      ${({ theme }) => theme.color.bg} 65%);
    z-index: -1;
  }

  .inner {
    max-width: 680px;
    margin: 0 auto;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    border: 1px solid ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 20px;
  }

  h2 {
    font-size: clamp(26px, 3.5vw, 40px);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }

  p {
    margin-top: 16px;
    font-size: 16.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.65;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 28px;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
    text-decoration: none;
    border-bottom: 1.5px solid ${({ theme }) => theme.color.brand};
    padding-bottom: 2px;
    transition: opacity ${({ theme }) => theme.motion.fast};
    &:hover { opacity: 0.72; }
  }

  @media (max-width: 600px) { padding: 56px 20px; }
`;

export const SectionHead = styled.div`
  max-width: ${({ $left }) => $left ? 'none' : '720px'};
  margin: ${({ $left }) => $left ? '0 0 64px' : '0 auto 64px'};
  text-align: ${({ $left }) => $left ? 'left' : 'center'};

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

export const ScoreSubHead = styled.div`
  max-width: 680px;
  margin: 80px 0 0;
  text-align: left;

  span.kicker {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 12px;
  }
  h3 {
    font-size: clamp(28px, 3.5vw, 40px);
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 14px;
    font-size: 16.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
  }
`;

export const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const ScoreLevelCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-left: 4px solid ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 24px 20px;
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 18px;
  align-items: center;

  div.text {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  strong.level {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  p {
    font-size: 13px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.muted};
    margin: 0;
  }
`;

export const ScoreGauge = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;

  svg {
    width: 72px;
    height: 72px;
    transform: rotate(-90deg);
    display: block;
  }
`;

export const ScoreGaugeCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;

  .num {
    font-size: 22px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
    color: ${({ $color }) => $color};
  }
  .den {
    font-size: 10px;
    color: ${({ theme }) => theme.color.muted};
    font-weight: 500;
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

export const Stats = styled.section`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: 0 28px 80px;
  @media (max-width: 740px) { padding: 0 20px 64px; }

  .card {
    background: ${({ theme }) => theme.color.ink};
    border-radius: ${({ theme }) => theme.size.radius.xl};
    padding: 52px 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    position: relative;
    overflow: hidden;
    @media (max-width: 740px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 36px 28px;
    }

    &::after {
      content: '';
      position: absolute;
      top: -50%; right: 0;
      width: 50%; height: 200%;
      background: radial-gradient(circle, rgba(93, 214, 202, 0.14), transparent 60%);
      pointer-events: none;
    }
  }

  .stat {
    position: relative;
    z-index: 1;
    padding: 20px 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.09);
    &:last-child { border-right: none; }
    @media (max-width: 740px) {
      padding: 18px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      border-right: none;
      &:nth-child(odd) { border-right: 1px solid rgba(255, 255, 255, 0.09); }
      &:nth-last-child(-n+2) { border-bottom: none; }
    }
  }

  strong {
    display: block;
    font-size: clamp(40px, 5vw, 60px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: rgba(250, 250, 247, 0.48);
    line-height: 1.45;
    max-width: 140px;
    margin-left: auto;
    margin-right: auto;
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
  p.tagline {
    color: ${({ theme }) => theme.color.accent};
    font-size: 14.5px;
    font-style: italic;
    border-left: 2px solid ${({ theme }) => theme.color.accent};
    padding-left: 12px;
    margin-top: 20px;
    opacity: 0.9;
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
  div.promise {
    margin-top: 20px;
    padding: 14px 16px;
    border-radius: ${({ theme }) => theme.size.radius.sm};
    border: 1px solid ${({ theme }) => theme.color.accent}44;
    background: ${({ theme }) => theme.color.accent}12;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  div.promise strong {
    color: ${({ theme }) => theme.color.accent};
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  div.promise span {
    color: rgba(250, 250, 247, 0.85);
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const FoundingCard = styled.div`
  max-width: 960px;
  margin: 0 auto;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 48px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 48px;
  align-items: start;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.md};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 24px;
  }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -25%;
    width: 60%; height: 200%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.12), transparent 60%);
    pointer-events: none;
  }
`;

export const FoundingLeft = styled.div`
  position: relative;

  span.kicker {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.brand};
    padding: 4px 12px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.brandSoft};
    margin-bottom: 18px;
  }
  h2 {
    font-size: clamp(28px, 3.6vw, 40px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p.lede {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  ul.benefits {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  ul.benefits li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 14.5px;
    line-height: 1.45;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  ul.benefits li svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ theme }) => theme.color.brand};
  }
`;

export const FoundingForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  input {
    height: 46px;
    padding: 0 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1.5px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast},
                box-shadow ${({ theme }) => theme.motion.fast};
  }
  input::placeholder {
    color: ${({ theme }) => theme.color.mutedSoft};
  }
  input:focus {
    border-color: ${({ theme }) => theme.color.brand};
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
  }
  input[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.color.danger};
  }
  span.error {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.danger};
    margin-top: 2px;
  }
  p.fineprint {
    margin-top: 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }
`;

export const FoundingSuccess = styled.div`
  position: relative;
  text-align: center;
  padding: 24px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  div.check {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
  }
  h3 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.015em;
  }
  p {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.55;
    max-width: 360px;
  }
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

// ─── Arvo Intelligence — dark section ───────────────────────────────────────

export const IntelligenceSection = styled.section`
  background: ${({ theme }) => theme.color.ink};
  padding: 120px 28px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 80px 20px; }

  &::before {
    content: '';
    position: absolute;
    top: -30%; left: -10%;
    width: 55%; height: 160%;
    background: radial-gradient(circle, rgba(27,122,110,.20), transparent 60%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -20%; right: -8%;
    width: 50%; height: 160%;
    background: radial-gradient(circle, rgba(93,214,202,.08), transparent 60%);
    pointer-events: none;
  }
`;

export const IntelligenceInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 56px; }

  .eyebrow {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${({ theme }) => theme.color.accent};
    margin-bottom: 20px;
  }
  h2 {
    font-size: clamp(30px, 3.8vw, 50px);
    font-weight: 800;
    letter-spacing: -.03em;
    line-height: 1.08;
    color: #FAFAF7;
    margin: 0 0 20px;
  }
  p.sub {
    font-size: 16px;
    color: rgba(250,250,247,.58);
    line-height: 1.65;
    margin: 0 0 40px;
    max-width: 420px;
  }
`;

export const IntelligencePillars = styled.div`
  border-top: 1px solid rgba(250,250,247,.09);
`;

export const IntelligencePillar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(250,250,247,.09);

  .pillar-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(27,122,110,.30);
    border: 1px solid rgba(93,214,202,.18);
    display: flex; align-items: center; justify-content: center;
    color: ${({ theme }) => theme.color.accent};
    flex-shrink: 0;
  }
  h4 {
    font-size: 15px;
    font-weight: 700;
    color: #FAFAF7;
    margin: 0 0 4px;
    letter-spacing: -.01em;
  }
  p {
    font-size: 13.5px;
    color: rgba(250,250,247,.50);
    line-height: 1.55;
    margin: 0;
  }
`;

const ctaPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,0); }
  50%       { box-shadow: 0 0 0 6px rgba(27,122,110,0.20); }
`;

export const IntelligencePreview = styled.div`
  background: rgba(250,250,247,.04);
  border: 1px solid rgba(250,250,247,.10);
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 32px;
  opacity: ${({ $visible }) => $visible === false ? 0 : 1};
  transform: ${({ $visible }) => $visible === false ? 'translateX(28px)' : 'none'};
  transition: opacity 0.85s ease, transform 0.85s ease;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .preview-brand {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${({ theme }) => theme.color.accent};
  }
  .preview-time {
    font-size: 11px;
    color: rgba(250,250,247,.30);
  }
  .preview-divider {
    height: 1px;
    background: rgba(250,250,247,.08);
    margin-bottom: 18px;
  }
  .preview-message {
    font-size: 15px;
    color: rgba(250,250,247,.75);
    line-height: 1.72;
    margin-bottom: 22px;
    strong { color: #FAFAF7; font-weight: 700; }
  }
  .preview-cta {
    display: inline-block;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    font-size: 13.5px;
    font-weight: 700;
    padding: 11px 20px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    letter-spacing: -.01em;
    margin-bottom: 28px;
    animation: ${ctaPulse} 2.8s ease-in-out 2s infinite;
  }
  .preview-footer {
    padding-top: 20px;
    border-top: 1px solid rgba(250,250,247,.08);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .preview-price {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -.04em;
    color: #FAFAF7;
    font-feature-settings: "tnum";
    line-height: 1;
    .period {
      font-size: 15px;
      font-weight: 400;
      color: rgba(250,250,247,.45);
      letter-spacing: 0;
      margin-left: 4px;
    }
  }
  .preview-price-note {
    font-size: 12px;
    color: rgba(250,250,247,.35);
    line-height: 1.5;
    text-align: right;
  }
`;

// ─── Benchmark — delat marknadsspann (data moat) ─────────────────────────────

export const BenchmarkSection = styled.section`
  position: relative;
  padding: 120px 28px;
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  @media (max-width: 740px) { padding: 80px 20px; }
`;

export const BenchmarkHead = styled.div`
  max-width: 720px;
  margin: 0 auto 52px;
  text-align: center;

  .kicker {
    display: inline-block;
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 16px;
  }
  h2 {
    font-size: clamp(32px, 4.4vw, 54px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    margin: 0;
  }
  p {
    margin: 18px auto 0;
    max-width: 600px;
    font-size: 16.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.muted};
  }
`;

export const BenchmarkMoatLine = styled.p`
  max-width: 740px;
  margin: 56px auto 0;
  text-align: center;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(20px, 2.4vw, 27px);
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.color.ink};
`;

export const BenchmarkFootnote = styled.p`
  max-width: 720px;
  margin: 20px auto 0;
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.5;
`;

export const Spectrum = styled.div`
  max-width: 920px;
  margin: 0 auto;

  .spectrum-head {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    .title { font-size: 14.5px; font-weight: 700; letter-spacing: -0.01em; color: ${({ theme }) => theme.color.ink}; }
    .sub { font-size: 12px; color: ${({ theme }) => theme.color.muted}; margin-right: auto; }
    .tag {
      font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
      color: ${({ theme }) => theme.color.brand}; background: ${({ theme }) => theme.color.brandSoft};
      padding: 4px 10px; border-radius: ${({ theme }) => theme.size.radius.pill};
    }
  }
`;

export const SpectrumRows = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpectrumRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 96px;
  gap: 20px;
  align-items: center;

  .cat-col { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .cat {
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .unit { font-size: 10px; color: ${({ theme }) => theme.color.muted}; }

  /* delad axel — zon + branschsnitt-linje löper kontinuerligt genom alla rader */
  .axis { position: relative; height: 46px; }
  .axis .zone {
    position: absolute;
    top: 0; bottom: 0;
    left: 8%; width: 27%;
    background: ${({ theme }) => theme.color.brand}14;
    border-radius: 2px;
  }
  .axis .line {
    position: absolute;
    top: 0; bottom: 0;
    left: 32%;
    width: 1.5px;
    background: ${({ theme }) => theme.color.ink};
    opacity: 0.22;
  }

  .delta { display: flex; flex-direction: column; align-items: flex-end; text-align: right; }
  .delta.over strong {
    font-size: 16px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    color: #DC2626;
    font-feature-settings: "tnum";
  }
  .delta.inline strong {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 12.5px;
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.color.brand};
  }
  .delta.inline strong svg { color: ${({ theme }) => theme.color.brand}; }
  .delta small {
    margin-top: 3px;
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.color.muted};
  }

  @media (max-width: 740px) {
    grid-template-columns: minmax(84px, 1fr) 1.6fr 70px;
    gap: 12px;
    .axis { height: 42px; }
  }
`;

/* Färgat segment som skjuter ut från branschsnitt-linjen till pricken */
export const SpectrumGap = styled.span`
  position: absolute;
  top: 50%;
  z-index: 2;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);
  background: ${({ $over }) => $over ? 'rgba(220,38,38,0.55)' : 'rgba(27,122,110,0.55)'};
  ${({ $over, $line }) => $over ? `left: ${$line};` : `right: calc(100% - ${$line});`}
  width: ${({ $visible, $span }) => $visible ? $span : '0%'};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay};
`;

export const SpectrumDot = styled.span`
  position: absolute;
  top: 50%;
  z-index: 3;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ $over }) => $over ? '#DC2626' : '#1B7A6E'};
  border: 2.5px solid ${({ theme }) => theme.color.bg};
  box-shadow: 0 1px 6px ${({ $over }) => $over ? 'rgba(220,38,38,0.50)' : 'rgba(27,122,110,0.45)'};
  left: ${({ $x }) => $x};
  transform: translate(-50%, -50%) scale(${({ $visible }) => $visible ? 1 : 0});
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition:
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${({ $delay }) => $delay},
    opacity 0.4s ease ${({ $delay }) => $delay};
`;

export const SpectrumAxisFoot = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 96px;
  gap: 20px;
  margin-top: 8px;

  .axis-cell {
    grid-column: 2;
    position: relative;
    height: 16px;
  }
  .axis-cell .lbl {
    position: absolute;
    top: 0;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme }) => theme.color.muted};
  }
  .axis-cell .zone { left: 8%; }
  .axis-cell .mid { left: 32%; transform: translateX(-50%); color: ${({ theme }) => theme.color.inkSoft}; }
  .axis-cell .right { right: 0; color: #DC2626; opacity: 0.75; }

  @media (max-width: 740px) {
    grid-template-columns: minmax(84px, 1fr) 1.6fr 70px;
    gap: 12px;
    .axis-cell .zone { display: none; }
  }
`;

export const SpectrumSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .stat {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 18px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: ${({ theme }) => theme.color.brandSoft};
  }
  .stat strong {
    font-size: 30px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
  }
  .stat .of { font-size: 18px; opacity: 0.5; }
  .stat .lbl {
    margin-top: 6px;
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.brand};
    text-align: center;
  }
  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.inkSoft};
  }

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

// ─── Pricing tiers — hybridmodell ────────────────────────────────────────────

export const PricingTiers = styled.div`
  max-width: 880px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
`;

export const PricingTier = styled.div`
  background: ${({ $featured, theme }) =>
    $featured ? theme.color.ink : theme.color.surface};
  border: ${({ $featured, theme }) =>
    $featured ? `2px solid ${theme.color.brand}` : `1px solid ${theme.color.border}`};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  @media (max-width: 740px) { padding: 28px 22px; }

  &::after {
    content: '';
    position: absolute;
    top: -40%; right: -25%;
    width: 60%; height: 200%;
    background: ${({ $featured }) =>
      $featured
        ? 'radial-gradient(circle, rgba(93,214,202,.14), transparent 60%)'
        : 'none'};
    pointer-events: none;
  }

  .tier-badge {
    display: inline-block;
    position: relative;
    z-index: 1;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .14em;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ $featured, theme }) =>
      $featured ? theme.color.brand : theme.color.brandSoft};
    color: ${({ $featured, theme }) =>
      $featured ? '#FAFAF7' : theme.color.brand};
    margin-bottom: 20px;
  }

  h3 {
    position: relative;
    z-index: 1;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -.025em;
    color: ${({ $featured }) => $featured ? '#FAFAF7' : 'inherit'};
    margin: 0 0 8px;
  }

  .tier-price {
    position: relative;
    z-index: 1;
    margin: 16px 0 6px;
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -.04em;
    font-feature-settings: "tnum";
    color: ${({ $featured }) => $featured ? '#FAFAF7' : 'inherit'};
    .period {
      font-size: 15px;
      font-weight: 400;
      color: ${({ $featured }) =>
        $featured ? 'rgba(250,250,247,.45)' : 'inherit'};
      letter-spacing: 0;
      margin-left: 4px;
    }
  }

  .tier-tagline {
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.55)' : 'inherit'};
    margin: 0 0 24px;
    line-height: 1.55;
  }

  ul {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
  }
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13.5px;
    color: ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.78)' : 'inherit'};
    line-height: 1.45;
    svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: ${({ $featured, theme }) =>
        $featured ? theme.color.accent : theme.color.brand};
    }
  }

  .tier-note {
    position: relative;
    z-index: 1;
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.35)' : 'inherit'};
    opacity: ${({ $featured }) => $featured ? 1 : 0.6};
  }

  .tier-addon {
    position: relative;
    z-index: 1;
    padding: 14px 16px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.06)' : 'rgba(27,122,110,.06)'};
    border: 1px solid ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.09)' : 'rgba(27,122,110,.14)'};
    font-size: 13px;
    color: ${({ $featured }) =>
      $featured ? 'rgba(250,250,247,.60)' : 'inherit'};
    line-height: 1.5;
    margin-top: 4px;
    strong {
      display: block;
      font-size: 14px;
      font-weight: 700;
      color: ${({ $featured }) => $featured ? '#FAFAF7' : 'inherit'};
      margin-bottom: 2px;
    }
  }
`;
