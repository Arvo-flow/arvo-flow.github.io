import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
  min-height: 100vh;
`;

export const Hero = styled.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
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
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 500; }
`;

export const Lede = styled.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
`;

export const Body = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px;
  margin-bottom: 16px;
  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const Dropzone = styled.div`
  border: 2px dashed ${({ theme, $active, $hasFile }) => {
    if ($active) return theme.color.brand;
    if ($hasFile) return theme.color.brand;
    return theme.color.borderStrong;
  }};
  background: ${({ theme, $active, $hasFile }) => {
    if ($active) return theme.color.brandSoft;
    if ($hasFile) return theme.color.brandSoft;
    return theme.color.surfaceAlt;
  }};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 40px 24px;
  text-align: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.motion.fast},
              border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.color.brandSoft};
    border-color: ${({ theme }) => theme.color.brand};
  }

  div.icon {
    margin: 0 auto 14px;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.brand};
  }

  strong.primary {
    display: block;
    font-size: 16px;
    color: ${({ theme }) => theme.color.ink};
    margin-bottom: 6px;
  }
  span.secondary {
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.muted};
  }
  span.filename {
    display: block;
    margin-top: 8px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.color.brandInk};
    word-break: break-all;
  }

  input[type="file"] { display: none; }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span.label {
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
  }

  select, input {
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
  }
`;

export const SubmitRow = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Disclaimer = styled.p`
  margin-top: 14px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedSoft};
  line-height: 1.55;
  text-align: center;

  a {
    color: ${({ theme }) => theme.color.brand};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const ErrorBox = styled.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.dangerSoft};
  border: 1px solid ${({ theme }) => theme.color.danger};
  font-size: 14px;
  color: ${({ theme }) => theme.color.danger};
  line-height: 1.5;
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${spin} 0.7s linear infinite;
`;

export const ProgressList = styled.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

export const ProgressItem = styled.li`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme, $state }) => $state === 'done' ? theme.color.surface : 'transparent'};
  border: 1px solid ${({ theme, $state }) =>
    $state === 'done' ? theme.color.borderStrong : 'transparent'};
  opacity: ${({ $state }) => $state === 'pending' ? 0.55 : 1};
  transition: opacity ${({ theme }) => theme.motion.base},
              background ${({ theme }) => theme.motion.base};

  div.bullet {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $state }) => {
      if ($state === 'done') return theme.color.brand;
      if ($state === 'active') return theme.color.brandSoft;
      return theme.color.surfaceAlt;
    }};
    color: ${({ theme, $state }) => $state === 'done' ? '#FAFAF7' : theme.color.muted};
    animation: ${({ $state }) => $state === 'active' ? pulse : 'none'} 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  div.label {
    font-size: 14.5px;
    color: ${({ theme, $state }) =>
      $state === 'pending' ? theme.color.muted : theme.color.ink};
    font-weight: ${({ $state }) => $state === 'active' ? 600 : 500};
  }
  div.time {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.color.mutedSoft};
  }
`;

export const ResultHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: end;
  margin-bottom: 24px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }

  h2 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  span.subtitle {
    margin-top: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    display: block;
  }
`;

export const SavingsBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandGradient};
  color: #FAFAF7;
  margin-bottom: 20px;

  span.kicker {
    display: block;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.85;
    margin-bottom: 8px;
  }
  span.amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
  }
  span.unit {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    opacity: 0.85;
    line-height: 1.5;
  }
`;

export const PriceNote = styled.p`
  margin-top: 10px;
  margin-bottom: ${({ $compact }) => $compact ? '10px' : '24px'};
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`;

export const SwitchCTARow = styled.div`
  margin-bottom: 24px;
`;

export const PartnerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 10px 0 4px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1.5px solid ${({ theme }) => theme.color.brand}55;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.brandSoft} 0%,
    ${({ theme }) => theme.color.surface} 100%
  );

  div.left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  span.verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    flex-shrink: 0;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }

  p.partner-name {
    margin: 0;
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
  }

  p.price-label {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.color.brand};
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  div.price-offer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
    margin-right: 16px;
    @media (max-width: 540px) { display: none; }
  }
  span.offer-price {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.ink};
  }
  span.offer-label {
    font-size: 11px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 1px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const NoSwitchBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  margin-bottom: 20px;

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.color.ink};
  }
  p {
    font-size: 14.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.muted};
  }
`;

export const QuoteLeadForm = styled.form`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.color.borderStrong};

  .qlf-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    @media (max-width: 480px) { grid-template-columns: 1fr; }
  }
  .qlf-full { grid-column: 1 / -1; }

  input[type="text"], input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 13px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    font-size: 14px;
    color: ${({ theme }) => theme.color.ink};
    background: ${({ theme }) => theme.color.surface};
    outline: none;
    &:focus { border-color: ${({ theme }) => theme.color.accent}; }
    &::placeholder { color: ${({ theme }) => theme.color.muted}; }
  }

  .qlf-mandate {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 12px 0 14px;
    padding: 12px 14px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: ${({ theme }) => theme.size.radius.md};
    cursor: pointer;

    input[type="checkbox"] {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      accent-color: ${({ theme }) => theme.color.brand};
      cursor: pointer;
    }
    span {
      font-size: 12.5px;
      line-height: 1.55;
      color: ${({ theme }) => theme.color.inkSoft};
      em { font-style: normal; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
    }
  }

  .qlf-sent {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: #ECFDF5;
    border: 1px solid #6EE7B7;
    border-radius: ${({ theme }) => theme.size.radius.md};
    font-size: 14px;
    color: #065F46;
    font-weight: 500;
  }
`;

export const MonitoringBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: #FFFBEB;
  border: 1.5px solid #D97706;
  margin-bottom: 20px;

  .monitoring-kicker {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #B45309;
    margin-bottom: 10px;
  }

  .monitoring-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D97706;
    box-shadow: 0 0 0 3px #FDE68A;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: #92400E;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    line-height: 1.65;
    color: #78350F;
    margin: 0;
  }
`;

export const OptimizeBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandSoft};
  border: 1.5px solid ${({ theme }) => theme.color.brand}55;
  margin-bottom: 20px;

  .kicker {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 10px;
  }
  .amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
  }
  .unit {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.brandInk};
    opacity: 0.85;
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
`;

export const CreditAlert = styled.div`
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.warningSoft};
  border-left: 3px solid ${({ theme }) => theme.color.warning};

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 6px;
  }
  p {
    font-size: 13.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
`;

export const KV = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin: 32px 0 0;
  @media (max-width: 540px) { grid-template-columns: 1fr; }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  dt {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
  }
  dd {
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    font-weight: 500;
    margin: 0;
  }
  dd small {
    display: block;
    margin-top: 4px;
    font-size: 11.5px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }
  div.full {
    grid-column: 1 / -1;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    padding-top: 14px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeUp} 0.2s ease both;
`;

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;

  button.close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surfaceAlt};
    color: ${({ theme }) => theme.color.muted};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    transition: background ${({ theme }) => theme.motion.fast};
    &:hover { background: ${({ theme }) => theme.color.border}; }
  }

  h3 {
    font-size: 22px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 8px;
    padding-right: 32px;
    em {
      font-style: normal;
      color: ${({ theme }) => theme.color.brand};
    }
  }

  p.sub {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
    margin: 0 0 20px;
  }

  div.context-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.brandSoft};
    border: 1px solid ${({ theme }) => theme.color.brand}33;
    font-size: 12.5px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.brandInk};
    margin-bottom: 20px;
  }

  div.modal-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
    &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
  }

  p.fine-print {
    margin: 4px 0 0;
    font-size: 11.5px;
    color: ${({ theme }) => theme.color.mutedSoft};
    text-align: center;
    line-height: 1.5;
  }

  button.manual-link {
    display: block;
    width: 100%;
    margin-top: 14px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    text-align: center;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { color: ${({ theme }) => theme.color.inkSoft}; }
  }

  button.back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 16px;
    &:hover { color: ${({ theme }) => theme.color.ink}; }
  }

  div.sent-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 0 4px;
    text-align: center;

    span.sent-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
    }
    p.sent-title {
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.ink};
      margin: 0;
    }
    p.sent-sub {
      font-size: 13.5px;
      color: ${({ theme }) => theme.color.muted};
      margin: 0;
      line-height: 1.5;
    }
  }
`;

export const FortnoxButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  border: none;
  background: #0055CC;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;

  &:hover { background: #0047B0; }

  span.f-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    background: #fff;
    color: #0055CC;
    font-size: 13px;
    font-weight: 900;
    line-height: 1;
    flex-shrink: 0;
  }
`;

export const Reasoning = styled.div`
  margin-top: 24px;
  padding-left: 16px;
  border-left: 3px solid ${({ theme }) => theme.color.brand}55;

  span.kicker {
    display: block;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 8px;
  }
  p {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 15px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
`;

export const LicenseOverageNote = styled.div`
  margin-top: 16px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1.5px solid ${({ theme }) => theme.color.warning}88;
  background: ${({ theme }) => theme.color.warningSoft};

  span.kicker {
    display: block;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 8px;
  }
  p {
    font-size: 14.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
  }
`;

export const NextSteps = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05), 0 1px 2px rgba(14,26,23,.04);

  h3 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin-bottom: 8px;
    sup {
      font-size: 9px;
      font-weight: 700;
      color: ${({ theme }) => theme.color.brand};
      vertical-align: super;
    }
  }
  p.sub {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.65;
    margin: 0 0 16px;
  }
  p.seg-count {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 10px;
  }

  .segment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 20px;
    @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); }
  }
  .segment-tile {
    position: relative;
    padding: 14px 14px 13px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1.5px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: border-color 0.15s;
  }
  .tile-active {
    border-color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
  }
  .tile-icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 8px;
    flex-shrink: 0;
  }
  .icon-active {
    background: ${({ theme }) => theme.color.brand};
    border-color: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    box-shadow: 0 2px 8px ${({ theme }) => theme.color.brand}44;
  }
  .tile-name {
    font-size: 12.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.015em;
    line-height: 1.25;
  }
  .tile-status {
    font-size: 11px;
    color: ${({ theme }) => theme.color.mutedSoft};
    font-weight: 500;
  }
  .status-active {
    color: ${({ theme }) => theme.color.brand};
    font-weight: 600;
  }
  .tile-metric {
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    letter-spacing: -0.03em;
    margin-top: 3px;
  }
  .tile-lock {
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${({ theme }) => theme.color.borderStrong};
    opacity: 0.7;
  }

  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.5;

    span.check {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
    }
  }
`;

export const ScoreDiag = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid var(--diag-color, ${({ theme }) => theme.color.borderStrong});
  margin-bottom: 16px;

  .gauge-wrap {
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
  }
  .gauge-svg {
    position: absolute;
    inset: 0;
  }
  .gauge-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    gap: 2px;
  }
  .gauge-val {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
  }
  .gauge-denom {
    font-size: 8px;
    font-weight: 600;
    opacity: 0.5;
    letter-spacing: 0;
  }
  .diag-body {
    flex: 1;
    min-width: 0;
  }
  .diag-top {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .diag-score-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.ink};
  }
  .diag-sep {
    color: ${({ theme }) => theme.color.borderStrong};
    font-size: 12px;
    flex-shrink: 0;
  }
  .diag-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
  .diag-label {
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .diag-text {
    font-size: 13px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
    line-height: 1.45;
  }
`;

export const EmailGate = styled.div`
  margin-top: 20px;
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};

  p.label {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    margin-bottom: 12px;
  }

  div.row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  input[type="email"] {
    flex: 1;
    min-width: 200px;
    padding: 11px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
    &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
  }

  p.note {
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.mutedSoft};
    line-height: 1.5;
  }

  div.sent {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.color.brand};
    font-size: 14.5px;
    font-weight: 500;
    padding: 4px 0;
  }
`;
