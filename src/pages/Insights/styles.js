import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
`;

const fadeLine = keyframes`
  0% { opacity: 0; transform: translateY(4px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
`;

export const SkeletonOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.color.bg};
  z-index: 80;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  animation: ${fadeOut} 0.5s ease forwards 3.8s;

  div.spinner {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.color.brandSoft};
    border-top-color: ${({ theme }) => theme.color.brand};
    animation: spin 0.9s linear infinite;
    margin-bottom: 24px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  h2 {
    font-size: 24px;
    line-height: 1.2;
    letter-spacing: -0.015em;
    max-width: 480px;
  }

  div.lineTrack {
    margin-top: 14px;
    height: 22px;
    width: 100%;
    max-width: 480px;
    position: relative;
  }
  div.lineTrack p {
    position: absolute;
    inset: 0;
    margin: 0;
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    animation: ${fadeLine} 1s ease-in-out forwards;
  }

  ul.skeletonRows {
    margin-top: 32px;
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul.skeletonRows li {
    height: 14px;
    border-radius: 4px;
    background: linear-gradient(90deg,
      ${({ theme }) => theme.color.surfaceAlt} 0%,
      ${({ theme }) => theme.color.surface} 50%,
      ${({ theme }) => theme.color.surfaceAlt} 100%);
    background-size: 800px 100%;
    animation: ${shimmer} 1.4s ease-in-out infinite;
  }
  ul.skeletonRows li:nth-child(1) { width: 100%; }
  ul.skeletonRows li:nth-child(2) { width: 88%; }
  ul.skeletonRows li:nth-child(3) { width: 76%; }
  ul.skeletonRows li:nth-child(4) { width: 92%; }
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
    letter-spacing: -0.025em;
    font-weight: 500;
    font-feature-settings: "tnum";
    em { font-style: italic; color: ${({ theme }) => theme.color.accent}; font-weight: 400; }
  }
  span.unit {
    font-size: 18px;
    color: rgba(250, 250, 247, 0.78);
    margin-left: 12px;
  }
  p.netMath {
    margin-top: 14px;
    font-size: 13px;
    color: rgba(250, 250, 247, 0.65);
    font-feature-settings: "tnum";
    letter-spacing: 0.005em;
    max-width: 480px;
  }
  p.netMath span.dash {
    color: rgba(250, 250, 247, 0.4);
    margin: 0 2px;
  }
  p {
    margin-top: 14px;
    font-size: 15px;
    color: rgba(250, 250, 247, 0.78);
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
    color: rgba(250, 250, 247, 0.78);
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
  &:hover div.cta {
    background: ${({ theme }) => theme.color.brandInk};
    box-shadow: ${({ theme }) => theme.shadow.brand};
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
    padding: 8px 14px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.brand};
    color: #FFFFFF;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.005em;
    transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast}, box-shadow ${({ theme }) => theme.motion.fast};
  }
`;

export const BiasLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
  transition: color ${({ theme }) => theme.motion.fast};

  a {
    color: ${({ theme }) => theme.color.muted};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.color.borderStrong};
    text-underline-offset: 2px;
    transition: color ${({ theme }) => theme.motion.fast};
  }
  a:hover { color: ${({ theme }) => theme.color.brand}; }
  svg { color: ${({ theme }) => theme.color.mutedSoft}; flex-shrink: 0; }
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

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;

  h3 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.015em;
    font-family: ${({ theme }) => theme.font.display};
    font-weight: 500;
  }
  span.badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
  }
  span.badge.warning {
    background: ${({ theme }) => theme.color.warningSoft};
    color: ${({ theme }) => theme.color.warning};
  }
  span.subtle {
    margin-left: auto;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    font-feature-settings: "tnum";
  }
`;

export const LockedCard = styled.button`
  text-align: left;
  background: ${({ theme }) => theme.color.surface};
  border: 1px dashed ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 24px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.motion.base};
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 120px; height: 120px;
    background: radial-gradient(circle at top right, rgba(168, 118, 26, 0.08), transparent 70%);
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.warning};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const LockedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;

  div.icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    color: ${({ theme }) => theme.color.muted};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
  }
  div.icon::after {
    content: '';
    position: absolute;
    bottom: -3px; right: -3px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.warning};
    border: 2px solid ${({ theme }) => theme.color.surface};
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
  }
  span.beta {
    font-size: 11px;
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-weight: 700;
    letter-spacing: 0.06em;
    background: ${({ theme }) => theme.color.warningSoft};
    color: ${({ theme }) => theme.color.warning};
    text-transform: uppercase;
  }
`;

export const LockedSaving = styled.div`
  div.amount {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 36px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.warning};
    font-feature-settings: "tnum";
    em { font-style: italic; font-weight: 400; }
  }
  div.unit {
    margin-top: 6px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.unit strong { color: ${({ theme }) => theme.color.ink}; font-weight: 600; }
`;

export const LockedNote = styled.div`
  padding: 14px 16px;
  background: ${({ theme }) => theme.color.surfaceAlt};
  border-radius: ${({ theme }) => theme.size.radius.md};
  font-size: 13px;
  color: ${({ theme }) => theme.color.inkSoft};
  line-height: 1.5;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  svg { flex-shrink: 0; margin-top: 2px; color: ${({ theme }) => theme.color.warning}; }
`;

export const LockedFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.delta {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.warning};
  }
`;

const confettiFall = keyframes`
  0% { transform: translate3d(0, -40px, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(var(--drift, 0px), 480px, 0) rotate(var(--spin, 720deg)); opacity: 0; }
`;

export const ConfettiLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

export const ConfettiPiece = styled.span`
  position: absolute;
  top: 0;
  left: ${({ $x }) => $x}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.4}px;
  background: ${({ $color }) => $color};
  border-radius: 1px;
  --drift: ${({ $drift }) => $drift}px;
  --spin: ${({ $spin }) => $spin}deg;
  animation: ${confettiFall} ${({ $dur }) => $dur}s cubic-bezier(0.2, 0.6, 0.4, 1) ${({ $delay }) => $delay}s forwards;
`;

export const VipModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 26, 23, 0.55);
  backdrop-filter: blur(6px);
  z-index: ${({ theme }) => theme.z.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadein 0.25s ease;
  @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
`;

export const VipModalCard = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 480px;
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 40px 36px;
  box-shadow: ${({ theme }) => theme.shadow.lg};

  div.crown {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: ${({ theme }) => theme.color.warningSoft};
    color: ${({ theme }) => theme.color.warning};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  span.tag {
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.warning};
    background: ${({ theme }) => theme.color.warningSoft};
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    display: inline-block;
    margin-bottom: 14px;
  }
  h3 {
    font-size: 26px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 12px;
    font-size: 14.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.muted};
  }
  ul.benefits {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ul.benefits li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 14px;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  ul.benefits li svg { flex-shrink: 0; margin-top: 2px; color: ${({ theme }) => theme.color.brand}; }
  div.actions {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  div.confirmed {
    text-align: center;
    padding: 24px 0 12px;
    div.checkmark {
      width: 64px; height: 64px;
      margin: 0 auto 16px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const HeadlineSplit = styled.div`
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 16px; }

  div { position: relative; }
  div + div { padding-left: 24px; border-left: 1px solid rgba(250, 250, 247, 0.12);
    @media (max-width: 600px) { padding-left: 0; border-left: 0; padding-top: 16px; border-top: 1px solid rgba(250, 250, 247, 0.12); }
  }
  span.lbl {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(250, 250, 247, 0.78);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  span.lbl em {
    font-style: normal;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-size: 10px;
    letter-spacing: 0.04em;
  }
  span.lbl em.live {
    background: rgba(93, 214, 202, 0.18);
    color: #5DD6CA;
  }
  span.lbl em.beta {
    background: rgba(245, 213, 152, 0.18);
    color: #F5D598;
  }
  div.value {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 34px;
    line-height: 1;
    color: #FAFAF7;
    font-feature-settings: "tnum";
    letter-spacing: -0.02em;
  }
  div.value small {
    font-size: 13px;
    color: rgba(250, 250, 247, 0.78);
    margin-left: 8px;
    font-family: ${({ theme }) => theme.font.display};
    font-feature-settings: "tnum";
  }
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
