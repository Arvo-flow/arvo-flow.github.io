import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.06); opacity: 1; }
`;

const orbit = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const dash = keyframes`
  0% { stroke-dashoffset: 380; }
  100% { stroke-dashoffset: 0; }
`;

export const Page = styled.main`
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 20%, ${({ theme }) => theme.color.brandSoft}, transparent 55%),
    ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
`;

export const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
`;

export const VisualWrap = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin-bottom: 44px;
`;

export const Ring = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  circle.track {
    fill: none;
    stroke: ${({ theme }) => theme.color.border};
    stroke-width: 1.5;
  }
  circle.progress {
    fill: none;
    stroke: ${({ theme }) => theme.color.brand};
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-dasharray: 380;
    animation: ${dash} 6s ease-in-out forwards;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`;

export const OrbitDot = styled.div`
  position: absolute;
  inset: 0;
  animation: ${orbit} 4s linear infinite;
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translate(-50%, -50%);
    width: 12px; height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 6px ${({ theme }) => theme.color.brandSoft};
  }
`;

export const Core = styled.div`
  position: absolute;
  inset: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${pulse} 2.4s ease-in-out infinite;

  span {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 38px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
  }
`;

export const Headline = styled.h1`
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.02em;
  line-height: 1.1;
  max-width: 640px;
`;

export const Sub = styled.p`
  margin-top: 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.muted};
  max-width: 520px;
`;

export const StepList = styled.ul`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 460px;
`;

export const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme, $state, $type }) => {
    if ($state === 'pending') return 'transparent';
    if ($type === 'skip') return theme.color.surfaceSunken;
    return theme.color.surface;
  }};
  border: 1px solid ${({ theme, $state, $type }) => {
    if ($state === 'pending') return 'transparent';
    if ($type === 'skip') return theme.color.borderStrong;
    return theme.color.borderStrong;
  }};
  text-align: left;
  animation: ${fadeIn} 0.4s ease both;
  opacity: ${({ $state }) => ($state === 'pending' ? 0.55 : 1)};
  transition: opacity ${({ theme }) => theme.motion.base},
              background ${({ theme }) => theme.motion.base};

  div.idx {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${({ theme, $state, $type }) => {
      if ($type === 'skip') {
        if ($state === 'pending') return theme.color.surfaceAlt;
        return theme.color.muted;
      }
      if ($state === 'done') return theme.color.brand;
      if ($state === 'active') return theme.color.brandSoft;
      return theme.color.surfaceAlt;
    }};
    color: ${({ theme, $state, $type }) => {
      if ($type === 'skip') return '#FFFFFF';
      if ($state === 'done') return '#FAFAF7';
      return theme.color.muted;
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 12.5px;
    font-weight: 600;
  }
  div.label {
    flex: 1;
    font-size: 14.5px;
    font-weight: 500;
    color: ${({ theme, $state, $type }) => {
      if ($type === 'skip') return theme.color.muted;
      if ($state === 'pending') return theme.color.muted;
      return theme.color.ink;
    }};
    font-style: ${({ $type }) => ($type === 'skip' ? 'italic' : 'normal')};
  }
  div.detail {
    font-size: 12.5px;
    color: ${({ theme, $type }) => ($type === 'skip' ? theme.color.mutedSoft : theme.color.muted)};
    font-feature-settings: "tnum";
    font-weight: ${({ $type }) => ($type === 'skip' ? 500 : 400)};
    text-transform: ${({ $type }) => ($type === 'skip' ? 'uppercase' : 'none')};
    letter-spacing: ${({ $type }) => ($type === 'skip' ? '0.06em' : '0')};
    font-size: ${({ $type }) => ($type === 'skip' ? '11px' : '12.5px')};
  }
`;
