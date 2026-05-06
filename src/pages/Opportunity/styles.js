import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(15, 81, 50, 0.5); }
  50% { box-shadow: 0 0 0 14px rgba(15, 81, 50, 0); }
`;

export const Page = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.color.bg};
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.size.containerNarrow};
  margin: 0 auto;
  padding: 32px 28px 80px;
  @media (max-width: 740px) { padding: 20px 18px 60px; }
`;

export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.muted};
  margin-bottom: 24px;
  transition: color ${({ theme }) => theme.motion.fast};
  &:hover { color: ${({ theme }) => theme.color.ink}; }
`;

export const Head = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: start;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  animation: ${fadeUp} 0.5s ease both;

  @media (max-width: 740px) { grid-template-columns: 1fr; }
`;

export const HeadLeft = styled.div`
  div.tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  h1 {
    margin-top: 16px;
    font-size: clamp(34px, 4vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p.lede {
    margin-top: 14px;
    font-size: 16.5px;
    color: ${({ theme }) => theme.color.muted};
    max-width: 540px;
    line-height: 1.5;
  }
`;

export const HeadSaving = styled.aside`
  text-align: right;
  div.kicker {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  div.amount {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 56px;
    line-height: 1;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.color.success};
    font-feature-settings: "tnum";
    margin-top: 6px;
  }
  div.unit {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 6px;
  }
`;

export const Layout = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;
  align-items: start;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
  & + & { margin-top: 16px; }

  h3 {
    font-size: 19px;
    line-height: 1.3;
  }
  h3 + p { margin-top: 8px; font-size: 14px; color: ${({ theme }) => theme.color.muted}; line-height: 1.55; }
`;

export const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 90px;
  @media (max-width: 860px) { position: static; }
`;

export const CompareGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

export const CompareCol = styled.div`
  border: 1px solid ${({ theme, $best }) => ($best ? theme.color.brand : theme.color.border)};
  background: ${({ theme, $best }) => ($best ? theme.color.brandSoft : theme.color.surface)};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 20px;
  position: relative;

  span.lbl {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
  }
  strong.name {
    display: block;
    margin-top: 8px;
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
  }
  div.cost {
    margin-top: 14px;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 28px;
    line-height: 1;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    letter-spacing: -0.02em;
  }
  div.unit {
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
  }
  span.badge {
    position: absolute;
    top: -10px; right: 14px;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    font-size: 11px;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

export const BenchBar = styled.div`
  margin-top: 20px;

  div.legend {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 10px;
  }
  div.track {
    position: relative;
    height: 8px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border-radius: ${({ theme }) => theme.size.radius.pill};
  }
  div.median {
    position: absolute;
    top: -5px;
    width: 2px;
    height: 18px;
    background: ${({ theme }) => theme.color.muted};
  }
  div.you {
    position: absolute;
    top: -8px;
    width: 14px; height: 24px;
    border-radius: 6px;
    background: ${({ theme }) => theme.color.danger};
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FAFAF7;
    font-size: 10px;
    font-weight: 700;
  }
  div.suggested {
    position: absolute;
    top: -8px;
    width: 14px; height: 24px;
    border-radius: 6px;
    background: ${({ theme }) => theme.color.brand};
    transform: translateX(-50%);
  }
  div.labels {
    margin-top: 14px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
  }
  div.labels strong {
    color: ${({ theme }) => theme.color.ink};
    display: block;
    margin-top: 2px;
    font-size: 13px;
    font-feature-settings: "tnum";
  }
`;

export const Reasoning = styled.div`
  margin-top: 22px;
  padding: 18px 20px;
  border-left: 3px solid ${({ theme }) => theme.color.brand};
  background: ${({ theme }) => theme.color.brandSoft};
  border-radius: 0 ${({ theme }) => theme.size.radius.md} ${({ theme }) => theme.size.radius.md} 0;

  span {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  p {
    color: ${({ theme }) => theme.color.brandInk};
    font-size: 14.5px;
    line-height: 1.6;
  }
`;

export const Coverage = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 520px) { grid-template-columns: 1fr; }

  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${({ theme }) => theme.color.brand};
  }
`;

export const Steps = styled.ol`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StepItem = styled.li`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  align-items: flex-start;

  div.idx {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.surfaceAlt};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    flex-shrink: 0;
    margin-top: 2px;
  }
  div.text {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.5;
  }
`;

export const ApproveCard = styled(Card)`
  background: ${({ theme }) => theme.color.ink};
  color: #FAFAF7;
  border-color: ${({ theme }) => theme.color.ink};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%; right: -30%;
    width: 80%; height: 200%;
    background: radial-gradient(circle, rgba(93, 214, 202, 0.18), transparent 60%);
    pointer-events: none;
  }
  h3 { color: #FAFAF7; position: relative; }
  p { color: rgba(250, 250, 247, 0.75); position: relative; }
`;

export const KeyValue = styled.dl`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(250, 250, 247, 0.12);
  }
  div:last-child { border-bottom: none; }
  dt {
    font-size: 13px;
    color: rgba(250, 250, 247, 0.7);
  }
  dd {
    font-size: 14px;
    font-weight: 600;
    color: #FAFAF7;
    font-feature-settings: "tnum";
  }
`;

export const NetSaving = styled.div`
  position: relative;
  margin-top: 22px;
  padding: 18px 0 16px;
  border-top: 1px solid rgba(250, 250, 247, 0.12);
  border-bottom: 1px solid rgba(250, 250, 247, 0.12);
  display: flex;
  flex-direction: column;

  span.kicker {
    font-size: 12px;
    color: rgba(250, 250, 247, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  span.amount {
    margin-top: 6px;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 38px;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.accent};
    font-feature-settings: "tnum";
  }
  span.fineprint {
    margin-top: 10px;
    font-size: 11.5px;
    color: rgba(250, 250, 247, 0.72);
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
`;

export const ApproveActions = styled.div`
  position: relative;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ApproveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 56px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.brandGradient};
  color: #FFFFFF;
  font-size: 15.5px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  animation: ${pulse} 2.4s ease-in-out infinite;
  transition: transform ${({ theme }) => theme.motion.fast}, box-shadow ${({ theme }) => theme.motion.fast};
  box-shadow: ${({ theme }) => theme.shadow.brand};
  &:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27, 122, 110, 0.36); }
`;

export const Note = styled.p`
  position: relative;
  font-size: 12px;
  color: rgba(250, 250, 247, 0.75);
  margin-top: 8px;
  text-align: center;
`;

export const MailMeBtn = styled.a`
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 18px;
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.ink};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.size.radius.md};
  font-size: 14.5px;
  font-weight: 500;
  transition: background ${({ theme }) => theme.motion.fast};
  &:hover { background: ${({ theme }) => theme.color.surfaceAlt}; }
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 15, 14, 0.55);
  backdrop-filter: blur(6px);
  z-index: ${({ theme }) => theme.z.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadein 0.25s ease;

  @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 40px 32px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow.lg};

  h3 {
    font-size: 28px;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  p {
    margin-top: 10px;
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
  }

  div.bankid {
    width: 80px; height: 80px;
    margin: 0 auto 22px;
    border-radius: 20px;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.font.display};
    font-size: 38px;
    font-weight: 700;
  }
  div.success {
    width: 80px; height: 80px;
    margin: 0 auto 22px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.dots {
    margin-top: 24px;
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  div.dots span {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    opacity: 0.3;
    animation: bounce 1.2s ease-in-out infinite;
  }
  div.dots span:nth-child(2) { animation-delay: 0.15s; }
  div.dots span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes bounce {
    0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-4px); }
  }
`;
