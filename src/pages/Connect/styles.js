import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 0%, ${({ theme }) => theme.color.brandSoft}, transparent 60%),
    radial-gradient(circle at 0% 100%, ${({ theme }) => theme.color.accentSoft}, transparent 55%),
    ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 540px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 48px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  animation: ${fadeUp} 0.5s ease both;
  @media (max-width: 600px) { padding: 32px 24px; }
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.brand};

  span.dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
  }
`;

export const Title = styled.h1`
  margin-top: 14px;
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

export const Lede = styled.p`
  margin-top: 14px;
  font-size: 16px;
  line-height: 1.55;
  color: ${({ theme }) => theme.color.muted};
`;

export const TrustBanner = styled.div`
  margin-top: 22px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.brandSoft};
  border: 1px solid ${({ theme }) => theme.color.brand};
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  align-items: center;

  div.lock {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: ${({ theme }) => theme.color.brand};
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  strong {
    display: block;
    font-size: 14.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brandInk};
    line-height: 1.4;
  }
  span {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.brandInk};
    opacity: 0.78;
    line-height: 1.45;
  }
`;

export const DataContract = styled.div`
  margin-top: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow:
    0 0 0 1px rgba(27, 122, 110, 0.10),
    0 4px 16px rgba(14, 26, 23, 0.07);
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

export const DataCol = styled.div`
  padding: 20px 22px;
  background: ${({ theme, $allow }) =>
    $allow ? 'rgba(27, 122, 110, 0.05)' : theme.color.surface};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  &:last-child { border-bottom: none; }

  @media (min-width: 481px) {
    border-bottom: none;
    border-right: 1px solid ${({ theme }) => theme.color.border};
    &:last-child { border-right: none; }
  }

  span.head {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme, $allow }) => ($allow ? theme.color.brand : theme.color.muted)};
    margin-bottom: 16px;
  }
  span.head div.dot {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: ${({ theme, $allow }) =>
      $allow ? theme.color.brand : 'rgba(14, 26, 23, 0.12)'};
    color: ${({ $allow }) => ($allow ? '#fff' : 'rgba(14,26,23,0.45)')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    flex-shrink: 0;
  }
  ul { display: flex; flex-direction: column; gap: 10px; }
  ul li {
    font-size: 13.5px;
    color: ${({ theme, $allow }) => ($allow ? theme.color.ink : theme.color.muted)};
    line-height: 1.35;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  ul li svg {
    flex-shrink: 0;
    color: ${({ theme, $allow }) => ($allow ? theme.color.brand : theme.color.muted)};
    opacity: ${({ $allow }) => ($allow ? 1 : 0.45)};
  }
`;

export const Reassurance = styled.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.color.muted};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  svg { color: ${({ theme }) => theme.color.brand}; opacity: 0.7; }
`;

export const NoWaste = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1px dashed ${({ theme }) => theme.color.brand};
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 12px;
  align-items: center;

  div.icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  strong {
    display: block;
    font-size: 13.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.4;
  }
  span {
    display: block;
    margin-top: 2px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.45;
  }
`;

export const ScanCounter = styled.div`
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surfaceAlt};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.muted};

  div.live {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
    flex-shrink: 0;
    animation: livepulse 2.4s ease-in-out infinite;
  }
  strong {
    color: ${({ theme }) => theme.color.ink};
    font-weight: 600;
    font-feature-settings: "tnum";
  }
  @keyframes livepulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.55; }
  }
`;

export const BadgeStrip = styled.div`
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surfaceAlt};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); }
`;

export const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;

  div.icon {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.brand};
  }
  strong {
    font-size: 11.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  span {
    font-size: 10.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.25;
  }
`;

export const ProviderRow = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const ProviderBtn = styled.button`
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid ${({ theme, $active }) => ($active ? theme.color.brand : theme.color.border)};
  border-radius: ${({ theme }) => theme.size.radius.md};
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  position: relative;
  transition: border-color ${({ theme }) => theme.motion.fast}, transform ${({ theme }) => theme.motion.fast};
  cursor: pointer;

  &:hover { transform: translateY(-1px); border-color: ${({ theme }) => theme.color.brand}; }

  strong { font-size: 14.5px; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
  span { font-size: 12.5px; color: ${({ theme }) => theme.color.muted}; }

  span.badge {
    position: absolute;
    top: 12px; right: 12px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    padding: 3px 8px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-weight: 600;
  }
`;

export const Trust = styled.ul`
  margin-top: 28px;
  padding: 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surfaceAlt};
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    gap: 10px;
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    align-items: flex-start;
  }
  li svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.color.brand};
    margin-top: 2px;
  }
`;

export const Actions = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SmallNote = styled.p`
  margin-top: 14px;
  text-align: center;
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.mutedSoft};
`;

export const ConsentRow = styled.label`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  align-items: start;
  padding: 14px 16px;
  border: 1px solid ${({ theme, $error }) => ($error ? theme.color.danger : theme.color.borderStrong)};
  background: ${({ theme, $error }) => ($error ? theme.color.dangerSoft : theme.color.surface)};
  border-radius: ${({ theme }) => theme.size.radius.md};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.motion.fast},
              background ${({ theme }) => theme.motion.fast};

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1.5px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    cursor: pointer;
    display: grid;
    place-items: center;
    margin-top: 1px;
    transition: all ${({ theme }) => theme.motion.fast};
  }
  input[type="checkbox"]::before {
    content: '';
    width: 11px;
    height: 11px;
    transform: scale(0);
    transition: transform ${({ theme }) => theme.motion.fast};
    background: #FAFAF7;
    clip-path: polygon(14% 44%, 0 58%, 38% 100%, 100% 24%, 84% 10%, 38% 65%);
  }
  input[type="checkbox"]:checked {
    background: ${({ theme }) => theme.color.brand};
    border-color: ${({ theme }) => theme.color.brand};
  }
  input[type="checkbox"]:checked::before { transform: scale(1); }
  input[type="checkbox"]:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.brand};
    outline-offset: 2px;
  }

  span.text {
    font-size: 13.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  span.text a {
    color: ${({ theme }) => theme.color.brand};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const ConsentError = styled.p`
  margin-top: 8px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.danger};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${spin} 0.7s linear infinite;
`;
