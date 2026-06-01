import styled, { keyframes, css } from 'styled-components';

// ── Keyframes ─────────────────────────────────────────────────────────────────

const fadeSlideUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`;

const checkReveal = keyframes`
  from { stroke-dashoffset: 24; }
  to   { stroke-dashoffset: 0; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ── Layout ────────────────────────────────────────────────────────────────────

export const ScrollWrap = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background: #0A1512;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
`;

export const Card = styled.section`
  height: 100vh;
  min-height: 600px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// ── Cover card ────────────────────────────────────────────────────────────────

export const CoverCard = styled(Card)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: radial-gradient(ellipse at 50% 30%, rgba(29,176,154,0.10) 0%, transparent 70%),
              #0A1512;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 80%, rgba(29,176,154,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const CoverEyebrow = styled.p`
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .18em;
  animation: ${fadeSlideUp} 0.7s ease both;
`;

export const CoverPeriod = styled.p`
  margin: 0 0 48px;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  animation: ${fadeSlideUp} 0.7s 0.1s ease both;
`;

export const SavingLabel = styled.p`
  margin: 0 0 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .12em;
  animation: ${fadeSlideUp} 0.7s 0.2s ease both;
`;

export const SavingNumber = styled.p`
  margin: 0 0 6px;
  font-size: clamp(52px, 9vw, 80px);
  font-weight: 800;
  color: #fff;
  line-height: 1;
  letter-spacing: -.03em;
  animation: ${fadeSlideUp} 0.7s 0.25s ease both;
`;

export const SavingUnit = styled.span`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 400;
  color: rgba(255,255,255,0.40);
  margin-left: 8px;
`;

export const InsightCount = styled.p`
  margin: 0 0 56px;
  font-size: 17px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  animation: ${fadeSlideUp} 0.7s 0.35s ease both;

  strong { color: #fff; }
`;

export const ScrollHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: ${fadeSlideUp} 0.7s 0.5s ease both;
`;

export const ScrollHintText = styled.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .06em;
`;

export const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  color: rgba(29,176,154,0.5);
  animation: ${bounce} 1.6s ease-in-out infinite;
`;

// ── Nav dots ──────────────────────────────────────────────────────────────────

export const NavDots = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 100;

  @media (max-width: 480px) { display: none; }
`;

export const NavDot = styled.button`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => $active ? '#1DB09A' : 'rgba(255,255,255,0.20)'};
  transform: scale(${({ $active }) => $active ? 1.5 : 1});
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
  padding: 0;

  &:hover { background: rgba(29,176,154,0.6); }
`;

// ── Insight card ──────────────────────────────────────────────────────────────

export const InsightCard = styled(Card)`
  padding: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(29,176,154,0.07) 0%, transparent 60%),
              #0A1512;
`;

export const InsightInner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 56px 36px 36px;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 48px 24px 28px; }
`;

export const Breadcrumb = styled.p`
  margin: 0 0 24px;
  font-size: 10px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const SupplierChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(29,176,154,0.12);
  border: 1px solid rgba(29,176,154,0.25);
  border-radius: 100px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #1DB09A;
  margin-bottom: 20px;
  transition-delay: 0.05s;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.05s ease, transform 0.5s 0.05s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${({ $type }) =>
    $type === 'recommendation' ? 'rgba(29,176,154,0.15)' :
    $type === 'cost_trend'     ? 'rgba(245,158,11,0.15)'  :
                                 'rgba(245,158,11,0.12)'};
  color: ${({ $type }) =>
    $type === 'recommendation' ? '#1DB09A' :
    $type === 'cost_trend'     ? '#F59E0B' :
                                 '#F59E0B'};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .12em;
  padding: 3px 8px;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Headline = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(24px, 4.5vw, 38px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -.02em;

  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s 0.1s ease, transform 0.55s 0.1s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const Subheadline = styled.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.5;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.17s ease, transform 0.5s 0.17s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const MetricGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 28px;

  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s 0.24s ease, transform 0.5s 0.24s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  @media (max-width: 480px) { flex-direction: column; gap: 12px; }
`;

export const MetricBlock = styled.div`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 18px 20px;
`;

export const MetricValue = styled.p`
  margin: 0 0 4px;
  font-size: ${({ $primary }) => $primary ? 'clamp(28px, 5vw, 40px)' : 'clamp(20px, 3.5vw, 28px)'};
  font-weight: 800;
  color: ${({ $primary }) => $primary ? '#fff' : 'rgba(255,255,255,0.75)'};
  line-height: 1;
  letter-spacing: -.02em;
`;

export const MetricUnit = styled.span`
  font-size: 0.55em;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
`;

export const MetricLabel = styled.p`
  margin: 0;
  font-size: 11px;
  color: rgba(255,255,255,0.40);
  text-transform: uppercase;
  letter-spacing: .08em;
`;

export const ContextText = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  flex: 1;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.30s ease, transform 0.5s 0.30s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const CardFooter = styled.div`
  padding-top: 24px;

  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s 0.38s ease, transform 0.5s 0.38s ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const CtaButton = styled.button`
  width: 100%;
  padding: 17px 24px;
  border: none;
  border-radius: 12px;
  background: ${({ $done }) => $done
    ? 'rgba(29,176,154,0.15)'
    : 'linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%)'};
  color: ${({ $done }) => $done ? '#1DB09A' : '#fff'};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .01em;
  cursor: ${({ $done, $loading }) => ($done || $loading) ? 'default' : 'pointer'};
  transition: opacity 0.2s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;

  &:hover:not(:disabled) {
    opacity: ${({ $done }) => $done ? 1 : 0.92};
    transform: ${({ $done }) => $done ? 'none' : 'translateY(-1px)'};
  }

  &:active:not(:disabled) { transform: translateY(0); }
`;

export const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

export const SkipLink = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: rgba(255,255,255,0.30);
  font-size: 13px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
  text-align: center;

  &:hover { color: rgba(255,255,255,0.55); }
`;

// ── Summary card ──────────────────────────────────────────────────────────────

export const SummaryCard = styled(Card)`
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 32px;
  background: radial-gradient(ellipse at 50% 40%, rgba(29,176,154,0.09) 0%, transparent 65%),
              #0A1512;
`;

export const CheckCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(29,176,154,0.15);
  border: 1.5px solid rgba(29,176,154,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  animation: ${fadeSlideUp} 0.6s ease both;

  svg { overflow: visible; }

  svg path {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: ${checkReveal} 0.5s 0.3s ease forwards;
  }
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 12px;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  animation: ${fadeSlideUp} 0.6s 0.1s ease both;
`;

export const SummaryBody = styled.p`
  margin: 0 0 32px;
  font-size: 16px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
  max-width: 440px;
  animation: ${fadeSlideUp} 0.6s 0.2s ease both;
`;

export const ActionsList = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${fadeSlideUp} 0.6s 0.3s ease both;
`;

export const ActionItem = styled.div`
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.20);
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
`;

export const ActionCheck = styled.span`
  font-size: 16px;
  flex-shrink: 0;
`;

export const ActionText = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.80);
  line-height: 1.4;

  strong { color: #fff; }
`;

export const SummaryResponseNote = styled.p`
  margin: 0 0 36px;
  font-size: 14px;
  color: #1DB09A;
  animation: ${fadeSlideUp} 0.6s 0.4s ease both;
`;

export const SummaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 14px 24px;
  color: rgba(255,255,255,0.70);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
  animation: ${fadeSlideUp} 0.6s 0.45s ease both;

  &:hover {
    background: rgba(255,255,255,0.11);
    color: #fff;
  }
`;

// ── Loading state ──────────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  gap: 20px;
`;

export const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
`;

export const LoadingDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${pulse} 1.2s ${({ $i }) => $i * 0.2}s ease-in-out infinite;
`;

export const LoadingText = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.35);
  letter-spacing: .04em;
`;

// ── Error state ────────────────────────────────────────────────────────────────

export const ErrorWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0A1512;
  padding: 32px;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

export const ErrorTitle = styled.h1`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
`;

export const ErrorBody = styled.p`
  margin: 0 0 32px;
  font-size: 15px;
  color: rgba(255,255,255,0.45);
  max-width: 360px;
  line-height: 1.6;
`;

export const ErrorCta = styled.a`
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  transition: opacity 0.2s;

  &:hover { opacity: 0.88; }
`;
