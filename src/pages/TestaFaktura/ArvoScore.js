import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const CIRC = 427.26; // 2π × 68

// ─── Score logic ─────────────────────────────────────────────────────────────

function calcSegmentScore(overpaymentPct, shouldSwitch) {
  if (!shouldSwitch) return 85;
  return Math.max(0, Math.round(100 - overpaymentPct * 1.5));
}

function getScoreStyle(score) {
  if (score < 45) return { stroke: '#DC2626', label: 'Kritisk',           isAlert: true  };
  if (score < 65) return { stroke: '#D97706', label: 'Suboptimerat',      isAlert: true  };
  if (score < 80) return { stroke: '#65A30D', label: 'Förbättringsläge',  isAlert: true  };
  return                 { stroke: '#1B7A6E', label: 'Optimalt',          isAlert: false };
}

function insightText(score, pct) {
  if (score < 45) return `Ni betalar ${pct} % mer än marknadspriset — ni förlorar pengar varje månad. Arvo genomför bytet omedelbart.`;
  if (score < 65) return `Ni betalar ${pct} % över marknadspriset — klar besparingspotential som Arvo kan realisera.`;
  if (score < 80) return `Ni betalar ${pct} % mer än marknadspriset — Arvo kan sänka den kostnaden åt er.`;
  return 'Ni har ett kostnadsoptimerat leverantörsnätverk.';
}

const CATEGORY_TO_CLUSTER = {
  skrivarleasing: 0, utrustningsleasing: 0,
  el: 1,
  mobil: 2, bredband: 2,
  'saas-productivity': 3, 'saas-crm': 3, 'saas-finance': 3, 'saas-other': 3, 'saas-creative': 3,
  'it-support': 4, serverhosting: 4,
  'transport-frakt': 5, 'leasing-bil': 5,
  kontorsmaterial: 6, 'städ-rengöring': 6, 'larm-bevakning': 6, 'faktura-tjanst': 6,
  foretagshalsovard: 7, loneadmin: 7,
};

// ─── Icons ───────────────────────────────────────────────────────────────────

const SvgPrint = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);
const SvgZap = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const SvgPhone = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const SvgMonitor = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const SvgServer = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const SvgTruck = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const SvgHome = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const SvgUsers = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const CLUSTER_ICONS = [SvgPrint, SvgZap, SvgPhone, SvgMonitor, SvgServer, SvgTruck, SvgHome, SvgUsers];

const CLUSTER_NAMES = [
  'Skrivare', 'El', 'Telefoni och bredband', 'Programvara',
  'IT', 'Fordon och frakt', 'Kontor och städ', 'Personal och hälsa',
];

const SvgAlert = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const SvgCheckCircle = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
);
const SvgLock = () => (
  <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const SvgLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

// ─── Styled components ────────────────────────────────────────────────────────

const Wrap = styled.div`
  background: #fff;
  border: 1px solid #D5E2DC;
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(27,122,110,.09), 0 4px 8px rgba(14,26,23,.06), 0 20px 48px rgba(14,26,23,.11);
  overflow: hidden;
  position: relative;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #5DD6CA 0%, #1B6E66 100%);
  }
`;

const Body = styled.div`
  padding: 36px 36px 0;
  @media (max-width: 600px) { padding: 24px 20px 0; }
`;

const Header = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 36px;
`;

const Title = styled.span`
  font-size: 16px; font-weight: 700; letter-spacing: -.025em; color: #0E1A17;
  sup { font-size: 9px; font-weight: 800; color: #1B7A6E; vertical-align: super; }
`;

const PilotDot = styled.span`
  width: 5px; height: 5px; border-radius: 50%; background: #1B7A6E; display: inline-block;
`;

const PilotBadge = styled.span`
  display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px;
  border-radius: 100px; background: #DCEEEA; color: #0E4F47;
  font-size: 10.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
`;

const Main = styled.div`
  display: grid; grid-template-columns: 164px 1fr; gap: 40px; align-items: center; margin-bottom: 36px;
  @media (max-width: 540px) {
    grid-template-columns: 1fr; justify-items: center; gap: 20px; margin-bottom: 24px;
  }
`;

const GaugeWrap = styled.div`
  position: relative; width: 164px; height: 164px; flex-shrink: 0;
  svg { width: 164px; height: 164px; transform: rotate(-90deg); }
  @media (max-width: 540px) {
    width: 120px; height: 120px;
    svg { width: 120px; height: 120px; }
  }
`;

const GaugeCenter = styled.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
`;

const GaugeNum = styled.div`
  font-size: 44px; font-weight: 700; letter-spacing: -.05em; line-height: 1;
  font-feature-settings: "tnum"; color: ${p => p.$color};
  @media (max-width: 540px) { font-size: 34px; }
`;

const GaugeDen = styled.div`
  font-size: 12.5px; color: #5C6E68; font-weight: 500; letter-spacing: .02em;
  @media (max-width: 540px) { font-size: 11px; }
`;

const GaugeTrack = styled.circle`
  fill: none; stroke-width: 10; stroke-linecap: round;
  stroke-dasharray: ${CIRC}; stroke-dashoffset: ${CIRC};
  stroke: ${p => p.$stroke};
  transition: stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1);
`;

const Meta = styled.div`
  display: flex; flex-direction: column; gap: 14px;
  @media (max-width: 540px) { width: 100%; align-items: center; }
`;

const Badge = styled.div`
  display: inline-flex; align-items: center; gap: 9px;
  padding: 7px 14px 7px 8px; border-radius: 100px;
  font-size: 13px; font-weight: 700; align-self: flex-start; background: #fff;
  ${p => p.$score < 45  && css`color: #7F1D1D; border: 2px solid #EF4444;`}
  ${p => p.$score >= 45 && p.$score < 65 && css`color: #78350F; border: 2px solid #F59E0B;`}
  ${p => p.$score >= 65 && p.$score < 80 && css`color: #365314; border: 2px solid #84CC16;`}
  ${p => p.$score >= 80 && css`color: #0E4F47; border: 2px solid #1B7A6E;`}
  @media (max-width: 540px) { align-self: center; font-size: 12px; padding: 6px 12px 6px 7px; }
`;

const BadgeIcon = styled.span`
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff;
  ${p => p.$score < 45  && css`background: #EF4444;`}
  ${p => p.$score >= 45 && p.$score < 65 && css`background: #F59E0B;`}
  ${p => p.$score >= 65 && p.$score < 80 && css`background: #65A30D;`}
  ${p => p.$score >= 80 && css`background: #1B7A6E;`}
  svg { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  @media (max-width: 540px) { width: 20px; height: 20px; }
`;

const Insight = styled.p`
  font-size: 17px; font-weight: 700; letter-spacing: -.03em; line-height: 1.35; color: #0E1A17;
  @media (max-width: 540px) { font-size: 15px; text-align: left; }
`;

const Desc = styled.p`
  font-size: 13.5px; line-height: 1.6; color: #3F4B47;
  letter-spacing: -.01em; font-weight: 400; max-width: 380px;
  @media (max-width: 540px) { font-size: 14px; max-width: 100%; text-align: left; }
`;

const Coverage = styled.div`
  display: flex; flex-direction: column; gap: 7px;
  @media (max-width: 540px) { width: 100%; }
`;

const CovLabel = styled.span`
  font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #5C6E68;
`;

const CovTrack = styled.div`
  height: 7px; border-radius: 4px; background: #E5EFEA; overflow: hidden;
`;

const CovFill = styled.div`
  height: 100%; border-radius: 4px; width: 0;
  background: linear-gradient(90deg, #5DD6CA, #1B6E66);
  transition: width 1.4s cubic-bezier(.4,0,.2,1);
`;

const CovText = styled.span`
  font-size: 13px; color: #3F4B47; font-weight: 500;
`;

const Breakdown = styled.div`
  display: flex; flex-direction: column; gap: 8px; margin-bottom: 36px;
`;

const BdRow = styled.div`
  display: grid; grid-template-columns: 44px 1fr auto auto; gap: 0 16px;
  align-items: center; padding: 15px 18px; border-radius: 12px;
  background: #fff; border: 1px solid #D5E2DC;
  transition: background .18s cubic-bezier(.4,0,.2,1);
  &:hover { background: #E5EFEA; }
  ${p => p.$hi && css`
    background: linear-gradient(135deg,rgba(93,214,202,.14) 0%,rgba(27,110,102,.07) 100%);
    border: 1px solid rgba(27,122,110,.2);
    &:hover { background: linear-gradient(135deg,rgba(93,214,202,.2) 0%,rgba(27,110,102,.1) 100%); }
  `}
  @media (max-width: 540px) { grid-template-columns: 40px 1fr auto; gap: 0 12px; }
`;

const BdIcon = styled.div`
  width: 44px; height: 44px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  ${p => p.$teal
    ? css`background: linear-gradient(135deg,#5DD6CA,#1B6E66); color: #fff; box-shadow: 0 2px 8px rgba(27,122,110,.25);`
    : css`background: #D5E2DC; color: #5C6E68;`
  }
`;

const BdLabel = styled.div`
  font-size: 14px; font-weight: 700; color: #0E1A17; letter-spacing: -.01em;
  @media (max-width: 540px) { font-size: 13px; }
`;

const BdSub = styled.div`
  font-size: 12px; color: #3F4B47; margin-top: 2px;
  @media (max-width: 540px) { font-size: 11px; }
`;

const BdScore = styled.div`
  font-size: 15px; font-weight: 700; font-feature-settings: "tnum"; white-space: nowrap;
  color: ${p => p.$color || '#5C6E68'};
  @media (max-width: 540px) { font-size: 14px; }
`;

const BdBadge = styled.span`
  font-size: 11px; padding: 4px 10px; border-radius: 100px; font-weight: 700; white-space: nowrap;
  ${p => p.$analyzed
    ? css`background: #DCEEEA; color: #0E4F47;`
    : css`background: #fff; color: #3F4B47; border: 1px solid #D5E2DC;`
  }
  @media (max-width: 540px) { display: none; }
`;

const Divider = styled.div`
  height: 1px; background: #D5E2DC; margin: 0 36px 32px;
  @media (max-width: 600px) { margin: 0 20px 24px; }
`;

const Grid = styled.div`
  padding: 0 36px 36px;
  @media (max-width: 600px) { padding: 0 20px 24px; }
`;

const GridLabel = styled.div`
  font-size: 13px; font-weight: 600; letter-spacing: -.01em; color: #3F4B47; margin-bottom: 16px;
`;

const Clusters = styled.div`
  display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px;
  @media (max-width: 640px) { grid-template-columns: repeat(2,minmax(0,1fr)); }
  @media (max-width: 540px) { gap: 8px; }
`;

const Cluster = styled.div`
  background: #fff; border: 1px solid #D5E2DC; border-radius: 12px;
  padding: 13px 14px; display: flex; flex-direction: row; align-items: center; gap: 11px;
  position: relative; min-width: 0; width: 100%;
  box-shadow: 0 0 0 1px rgba(14,26,23,.03),0 1px 3px rgba(14,26,23,.05),0 4px 14px rgba(14,26,23,.06);
  transition: transform .18s cubic-bezier(.4,0,.2,1), box-shadow .18s cubic-bezier(.4,0,.2,1), border-color .18s cubic-bezier(.4,0,.2,1);
  ${p => p.$analyzed && css`
    border-color: rgba(27,122,110,.3);
    background: linear-gradient(135deg,rgba(93,214,202,.1) 0%,#fff 80%);
    &:hover { border-color: rgba(27,122,110,.5); box-shadow: 0 0 0 1px rgba(27,122,110,.2),0 4px 8px rgba(14,26,23,.07),0 14px 32px rgba(27,122,110,.12); }
  `}
  ${p => p.$locked && css`
    opacity: .62;
    &:hover { transform: none; box-shadow: 0 0 0 1px rgba(14,26,23,.03),0 1px 3px rgba(14,26,23,.05),0 4px 14px rgba(14,26,23,.06); }
  `}
  ${p => !p.$locked && css`
    &:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(27,122,110,.1),0 4px 8px rgba(14,26,23,.07),0 14px 32px rgba(14,26,23,.10); }
  `}
  @media (max-width: 540px) { padding: 11px 12px; gap: 9px; }
`;

const ClIconCircle = styled.div`
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  ${p => p.$active
    ? css`background: linear-gradient(135deg,#5DD6CA,#1B6E66); color: #fff; box-shadow: 0 2px 8px rgba(27,122,110,.32);`
    : css`background: #E5EFEA; color: #BACBC2;`
  }
  @media (max-width: 540px) { width: 32px; height: 32px; }
`;

const ClBody = styled.div`
  display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1;
`;

const ClName = styled.div`
  font-size: 13px; font-weight: 700; color: #0E1A17; letter-spacing: -.01em; line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  @media (max-width: 540px) { font-size: 12px; }
`;

const ClStatus = styled.div`
  font-size: 11.5px; font-weight: 600; color: ${p => p.$active ? '#1B7A6E' : '#5C6E68'};
  @media (max-width: 540px) { font-size: 10.5px; }
`;

const ClSaving = styled.div`
  font-size: 12px; font-weight: 700; color: #0E4F47; margin-top: 1px;
  @media (max-width: 540px) { font-size: 10.5px; }
`;

const ClLock = styled.div`
  position: absolute; top: 9px; right: 9px;
  width: 18px; height: 18px; border-radius: 50%;
  background: #E5EFEA; border: 1px solid #D5E2DC;
  display: flex; align-items: center; justify-content: center;
  svg { width: 8px; height: 8px; stroke: #5C6E68; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
`;

const Cta = styled.div`
  margin-top: 22px; padding: 18px 20px; border-radius: 12px;
  background: linear-gradient(135deg,rgba(93,214,202,.08) 0%,rgba(27,110,102,.06) 100%);
  border: 1.5px solid rgba(27,122,110,.2);
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  @media (max-width: 540px) { flex-direction: column; align-items: flex-start; gap: 14px; }
`;

const CtaLeft = styled.div`
  display: flex; flex-direction: column; gap: 3px;
`;

const CtaHead = styled.div`
  font-size: 14px; font-weight: 700; letter-spacing: -.01em; color: #0E1A17;
  sup { font-size: 8px; font-weight: 700; color: #1B7A6E; vertical-align: super; }
`;

const CtaSub = styled.div`
  font-size: 12px; color: #3F4B47; line-height: 1.5;
`;

const CtaRight = styled.div`
  flex-shrink: 0;
  @media (max-width: 540px) { width: 100%; a, button { width: 100%; justify-content: center; } }
`;

const Methodology = styled.p`
  margin-top: 16px; font-size: 11px; color: #5C6E68;
  line-height: 1.6; font-style: italic; text-align: center;
`;

// ─── Component ───────────────────────────────────────────────────────────────

const ArvoScore = ({ result }) => {
  const trackRef = useRef(null);
  const fillRef  = useRef(null);

  const { recommendation, extracted, categorized } = result;
  const annualCost    = extracted?.annualCost ?? 0;
  const suggestedCost = recommendation?.suggestedAnnualCost ?? annualCost;
  const shouldSwitch  = recommendation?.shouldSwitch ?? false;

  const overpaymentPct = annualCost > 0 && shouldSwitch && suggestedCost < annualCost
    ? Math.round((annualCost - suggestedCost) / annualCost * 100)
    : 0;

  const segmentScore = calcSegmentScore(overpaymentPct, shouldSwitch);
  const C            = getScoreStyle(segmentScore);
  const offset       = parseFloat((CIRC * (1 - segmentScore / 100)).toFixed(2));

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (trackRef.current) trackRef.current.style.strokeDashoffset = offset;
      if (fillRef.current)  fillRef.current.style.width = '12.5%';
    });
    return () => cancelAnimationFrame(id);
  }, [offset]);

  const clusterIdx = CATEGORY_TO_CLUSTER[categorized?.category] ?? 0;
  const netSaving  = recommendation?.netSaving ?? 0;
  const savingText = netSaving > 0
    ? `−${new Intl.NumberFormat('sv-SE').format(netSaving)} kr/år`
    : null;

  const clusters = [
    { name: CLUSTER_NAMES[clusterIdx], Icon: CLUSTER_ICONS[clusterIdx], analyzed: true },
    ...CLUSTER_NAMES
      .map((name, i) => ({ name, Icon: CLUSTER_ICONS[i], analyzed: false }))
      .filter((_, i) => i !== clusterIdx),
  ];

  const BdAnalyzedIcon = CLUSTER_ICONS[clusterIdx];

  return (
    <Wrap>
      <Body>
        <Header>
          <Title>Arvo Score<sup>™</sup></Title>
          <PilotBadge><PilotDot />Pilot</PilotBadge>
        </Header>

        <Main>
          <GaugeWrap>
            <svg viewBox="0 0 164 164">
              <circle fill="none" stroke="#E5EFEA" strokeWidth="10" cx="82" cy="82" r="68" />
              <GaugeTrack ref={trackRef} cx="82" cy="82" r="68" $stroke={C.stroke} />
            </svg>
            <GaugeCenter>
              <GaugeNum $color={C.stroke}>{segmentScore}</GaugeNum>
              <GaugeDen>/100</GaugeDen>
            </GaugeCenter>
          </GaugeWrap>

          <Meta>
            <Badge $score={segmentScore}>
              <BadgeIcon $score={segmentScore}>
                {C.isAlert ? <SvgAlert /> : <SvgCheckCircle />}
              </BadgeIcon>
              {C.label}
            </Badge>
            <Insight>{insightText(segmentScore, overpaymentPct)}</Insight>
            <Desc>7 segment kvarstår att analysera — er totalbild kan skilja sig.</Desc>
            <Coverage>
              <CovLabel>Analysstäckning</CovLabel>
              <CovTrack><CovFill ref={fillRef} /></CovTrack>
              <CovText>1 av uppskattningsvis 8 aktiva segment</CovText>
            </Coverage>
          </Meta>
        </Main>

        <Breakdown>
          <BdRow $hi>
            <BdIcon $teal><BdAnalyzedIcon size={20} /></BdIcon>
            <div>
              <BdLabel>{CLUSTER_NAMES[clusterIdx]}</BdLabel>
              <BdSub>{extracted?.supplier}</BdSub>
            </div>
            <BdScore $color={C.stroke}>{segmentScore}/100</BdScore>
            <BdBadge $analyzed>Analyserat</BdBadge>
          </BdRow>
          <BdRow>
            <BdIcon><SvgLayers /></BdIcon>
            <div>
              <BdLabel>7 övriga segment</BdLabel>
              <BdSub>El, Programvara, Telefoni…</BdSub>
            </div>
            <BdScore>—</BdScore>
            <BdBadge>Ej analyserat</BdBadge>
          </BdRow>
        </Breakdown>
      </Body>

      <Divider />

      <Grid>
        <GridLabel>Segment — 1 av 8 analyserade</GridLabel>
        <Clusters>
          {clusters.map((cl) => (
            <Cluster key={cl.name} $analyzed={cl.analyzed} $locked={!cl.analyzed}>
              {!cl.analyzed && <ClLock><SvgLock /></ClLock>}
              <ClIconCircle $active={cl.analyzed}>
                <cl.Icon />
              </ClIconCircle>
              <ClBody>
                <ClName>{cl.name}</ClName>
                <ClStatus $active={cl.analyzed}>
                  {cl.analyzed ? 'Analyserat' : 'Ej analyserat'}
                </ClStatus>
                {cl.analyzed && savingText && <ClSaving>{savingText}</ClSaving>}
              </ClBody>
            </Cluster>
          ))}
        </Clusters>

        <Cta>
          <CtaLeft>
            <CtaHead>Lås upp er fullständiga Arvo Score<sup>™</sup></CtaHead>
            <CtaSub>Koppla Fortnox / Visma — vi skannar alla 8 segment och beräknar er verkliga score.</CtaSub>
          </CtaLeft>
          <CtaRight>
            <Button as={Link} to="/connect" $variant="gradient" $size="sm">
              Koppla Fortnox / Visma →
            </Button>
          </CtaRight>
        </Cta>

        <Methodology>
          Arvo Score™ beräknas utifrån faktisk överprisnivå i analyserade segment vägd mot branschsnitt för oanalyserade segment. Scoren uppdateras automatiskt för varje ny faktura.
        </Methodology>
      </Grid>
    </Wrap>
  );
};

export default ArvoScore;
