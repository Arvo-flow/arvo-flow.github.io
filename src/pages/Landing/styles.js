import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const markerPop = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(27,122,110,0.28); }
  60%  { box-shadow: 0 0 0 7px rgba(27,122,110,0.10); }
  100% { box-shadow: 0 0 0 4px rgba(27,122,110,0.12); }
`;

const markerScale = keyframes`
  0%   { transform: scale(0); opacity: 0; }
  55%  { transform: scale(1.30); opacity: 1; }
  75%  { transform: scale(0.88); }
  100% { transform: scale(1); opacity: 1; }
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
  align-items: start;
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
  font-size: clamp(40px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: ${fadeUp} 0.7s 0.1s ease both;

  .line {
    display: block;
    white-space: nowrap;
  }
  em {
    display: block;
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
  margin-top: 58px; /* förankrar kortets topp mot rubrikens datumlinje */
  animation: ${fadeUp} 0.8s 0.2s ease both;
  @media (max-width: 980px) { margin-top: 0; }
`;

// Hero — ljus livscykel-timeline (Apple-ren, animeras in steg för steg)
export const HeroTimeline = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  padding: 28px 30px;

  .tl-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  .tl-brand {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.color.brand};
  }
  .tl-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    border: 1px solid ${({ theme }) => theme.color.brand}33;
    padding: 4px 9px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    transition: opacity .6s ease 3.3s;
    svg { color: ${({ theme }) => theme.color.brand}; }
  }

  .tl-body { padding: 18px 0 4px; }
  .tl-step {
    position: relative;
    display: flex;
    gap: 16px;
    padding-bottom: 22px;
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    transform: ${({ $visible }) => $visible ? 'none' : 'translateY(8px)'};
    transition: opacity .9s ease, transform .9s ease;
  }
  .tl-step:nth-child(1) { transition-delay: .3s; }
  .tl-step:nth-child(2) { transition-delay: 1.2s; }
  .tl-step:nth-child(3) { transition-delay: 2.1s; }
  .tl-step:last-child { padding-bottom: 0; }

  /* alla tre steg är avklarade — fyllda brand-prickar med bock */
  .tl-marker {
    position: relative;
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    margin-top: 2px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    border: 2px solid ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tl-marker::before {
    content: '';
    width: 5px;
    height: 2.5px;
    border-left: 1.5px solid #fff;
    border-bottom: 1.5px solid #fff;
    transform: translateY(-0.5px) rotate(-45deg);
  }
  .tl-step:nth-child(1) .tl-marker {
    animation: ${({ $visible }) => $visible ? markerScale : 'none'} .9s cubic-bezier(0.34, 1.56, 0.64, 1) .45s both;
  }
  .tl-step:nth-child(2) .tl-marker {
    animation: ${({ $visible }) => $visible ? markerScale : 'none'} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.35s both;
  }
  .tl-step:not(:last-child) .tl-marker::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    width: 1.5px;
    height: calc(100% + 16px);
    background: ${({ theme }) => theme.color.brand}33;
  }
  .tl-step.done .tl-marker {
    box-shadow: 0 0 0 0 ${({ theme }) => theme.color.brandSoft};
    animation:
      ${({ $visible }) => $visible ? markerScale : 'none'} .9s cubic-bezier(0.34, 1.56, 0.64, 1) 2.25s both,
      ${({ $visible }) => $visible ? markerPop : 'none'} 1s cubic-bezier(0.34, 1.56, 0.64, 1) 2.9s both;
  }
  .tl-body-text { display: flex; flex-direction: column; gap: 1px; }
  .tl-date {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: .03em;
    color: ${({ theme }) => theme.color.muted};
  }
  .tl-title {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -.01em;
    line-height: 1.2;
  }
  .tl-detail {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }

  .tl-foot {
    margin-top: 18px;
    padding-top: 20px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    opacity: ${({ $visible }) => $visible ? 1 : 0};
    transition: opacity .6s ease 3.5s;
  }
  .tl-saving { display: flex; flex-direction: column; gap: 3px; }
  .tl-saving-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: ${({ theme }) => theme.color.muted};
  }
  .tl-saving-value {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -.04em;
    line-height: 1;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
    .unit { font-size: 14px; font-weight: 400; color: ${({ theme }) => theme.color.muted}; margin-left: 3px; letter-spacing: 0; }
  }
  .tl-cta {
    padding: 12px 18px;
    border-radius: 10px;
    background: linear-gradient(135deg, #1B7A6E 0%, #2DB59F 100%);
    color: #fff;
    font-family: inherit;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: -.015em;
    cursor: default;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(27,122,110,.30);
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
    width: 40px; height: 40px;
    border-radius: 11px;
    background: linear-gradient(150deg, rgba(45,181,159,.24), rgba(27,122,110,.10));
    border: 1px solid rgba(93,214,202,.24);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.07);
    display: flex; align-items: center; justify-content: center;
    color: ${({ theme }) => theme.color.accent};
    flex-shrink: 0;
  }
  h4 {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 15.5px;
    font-weight: 700;
    color: #FAFAF7;
    margin: 0 0 4px;
    letter-spacing: -.01em;
    line-height: 1.2;
  }
  p {
    font-size: 13.5px;
    color: rgba(250,250,247,.72);
    line-height: 1.55;
    margin: 0;
  }
`;

const ctaPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,0); }
  50%       { box-shadow: 0 0 0 6px rgba(27,122,110,0.20); }
`;

const livePulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(45,181,159,0.55); }
  70%  { box-shadow: 0 0 0 6px rgba(45,181,159,0); }
  100% { box-shadow: 0 0 0 0 rgba(45,181,159,0); }
`;

// Långsam scanlinje — Arvo läser av i realtid (rörelse, inte stökigt)
const scanSweep = keyframes`
  0%   { transform: translateY(-130%); opacity: 0; }
  10%  { opacity: 1; }
  45%  { transform: translateY(280%); opacity: 1; }
  55%  { opacity: 0; }
  100% { transform: translateY(280%); opacity: 0; }
`;

// Intelligence-sektion — en levande briefing där alla tre fakulteter
// (smyghöjningslarm · community benchmark · avtalsbevakning) fångas i
// arbete på samma verkliga fall. Speglar de tre pelarna till vänster.
export const IntelligencePreview = styled.div`
  position: relative;
  overflow: hidden;
  background: rgba(250,250,247,.04);
  border: 1px solid rgba(250,250,247,.10);
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 26px 28px;
  opacity: ${({ $visible }) => $visible === false ? 0 : 1};
  transform: ${({ $visible }) => $visible === false ? 'translateY(20px)' : 'none'};
  transition: opacity 0.8s ease, transform 0.8s ease;

  /* realtids-scan som sveper nedför kortet */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 34%;
    pointer-events: none;
    background: linear-gradient(180deg, transparent, rgba(93,214,202,0.09) 55%, transparent);
    transform: translateY(-130%);
    animation: ${({ $visible }) => $visible === false ? 'none' : scanSweep} 7s ease-in-out 1.6s infinite;
  }

  .preview-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(250,250,247,.08);
  }
  .preview-brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${({ theme }) => theme.color.accent};
  }
  .preview-brand .live {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.accent};
    animation: ${livePulse} 2.4s ease-out infinite;
  }
  .preview-time {
    font-size: 11px;
    color: rgba(250,250,247,.35);
  }

  /* Tre intelligenssignaler — speglar pelarnas ikoner till vänster.
     Inga skiljelinjer — luft och ikoner bär strukturen. */
  .signal {
    display: flex;
    gap: 13px;
    align-items: flex-start;
    padding: 17px 0;
    opacity: ${({ $visible }) => $visible === false ? 0 : 1};
    transform: ${({ $visible }) => $visible === false ? 'translateY(10px)' : 'none'};
    transition: opacity .6s ease, transform .6s ease;
  }
  .signal:nth-child(2) { padding-top: 20px; transition-delay: .12s; }
  .signal:nth-child(3) { transition-delay: .30s; }
  .signal:nth-child(4) { transition-delay: .48s; }

  .signal-ico {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, rgba(45,181,159,.22), rgba(27,122,110,.08));
    border: 1px solid rgba(93,214,202,.22);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
    color: ${({ theme }) => theme.color.accent};
  }
  .signal.alert .signal-ico {
    background: linear-gradient(150deg, rgba(217,119,6,.24), rgba(217,119,6,.06));
    border-color: rgba(245,158,11,.30);
    color: #FBBF24;
  }

  .signal-main { flex: 1; min-width: 0; }
  .signal-tag {
    display: block;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.accent};
    margin-bottom: 6px;
  }
  .signal.alert .signal-tag { color: #FBBF24; }

  .signal-line {
    font-size: 16px;
    font-weight: 700;
    color: #FAFAF7;
    letter-spacing: -.02em;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
  }
  .signal-line.sm { font-size: 14.5px; font-weight: 600; }
  .signal-line strong { color: ${({ theme }) => theme.color.accent}; font-weight: 800; }

  .badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    border-radius: 6px;
    padding: 2px 7px;
    white-space: nowrap;
  }
  .badge.up {
    color: #FCA5A5;
    background: rgba(220,38,38,.20);
  }

  .signal-sub {
    margin: 5px 0 0;
    font-size: 12.5px;
    color: rgba(250,250,247,.55);
    line-height: 1.5;
  }
  .signal-sub strong { color: #FAFAF7; font-weight: 600; }

  /* Community Benchmark — unit chart: rutnät av 15 bolag, 8 drabbade (er ringad).
     Rutnät i stället för en rad → läses som population, inte ett betyg. */
  .bench-grid {
    display: grid;
    grid-template-columns: repeat(8, 9px);
    gap: 6px;
    margin: 11px 0 10px;
    width: max-content;
  }
  .bench-grid span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(250,250,247,.15);
    transform: scale(${({ $visible }) => $visible === false ? 0 : 1});
    opacity: ${({ $visible }) => $visible === false ? 0 : 1};
    transition:
      transform .45s cubic-bezier(.34,1.56,.64,1),
      opacity .3s ease;
  }
  .bench-grid span.on {
    background: #D9923C;
  }
  .bench-grid span.you {
    background: #E8A24A;
    box-shadow: 0 0 0 2px rgba(250,250,247,.9);
  }

  .alert-saving {
    margin-top: 8px;
    padding: 18px 0 2px;
    border-top: 1px solid rgba(250,250,247,.08);
    opacity: ${({ $visible }) => $visible === false ? 0 : 1};
    transition: opacity .6s ease .62s;
  }
  .saving-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(250,250,247,.40);
    margin-bottom: 4px;
  }
  .saving-amount {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: -.04em;
    line-height: 1;
    color: ${({ theme }) => theme.color.accent};
    font-feature-settings: "tnum";
    .unit { font-size: 15px; font-weight: 400; color: rgba(250,250,247,.40); margin-left: 3px; letter-spacing: 0; }
  }

  .alert-actions {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    opacity: ${({ $visible }) => $visible === false ? 0 : 1};
    transition: opacity .6s ease .74s;
  }
  .btn-primary {
    flex: 1;
    padding: 12px 0;
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: linear-gradient(135deg, #1B7A6E 0%, #2DB59F 100%);
    border: none;
    color: #fff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -.015em;
    cursor: default;
    animation: ${ctaPulse} 2.8s ease-in-out 2s infinite;
  }
  .btn-secondary {
    padding: 12px 16px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: transparent;
    border: 1px solid rgba(250,250,247,.18);
    color: rgba(250,250,247,.80);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: default;
    white-space: nowrap;
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
  gap: 0;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.color.border};

  .sum-meta {
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
  }
  .sum-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 22px 0 0;
  }
  .sum-col + .sum-sep + .sum-col {
    padding: 0 22px;
  }
  .sum-col strong {
    font-size: 40px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.05em;
    font-feature-settings: "tnum";
  }
  .sum-col.bad strong  { color: #DC2626; }
  .sum-col.good strong { color: ${({ theme }) => theme.color.brand}; }
  .sum-col span {
    margin-top: 5px;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.muted};
    white-space: nowrap;
  }
  .sum-sep {
    width: 1px;
    height: 44px;
    background: ${({ theme }) => theme.color.border};
    flex-shrink: 0;
    margin: 0 4px;
  }
  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.inkSoft};
    padding-left: 28px;
    border-left: 1px solid ${({ theme }) => theme.color.border};
    margin-left: 24px;
  }

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    p { padding-left: 0; border-left: none; margin-left: 0; }
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
