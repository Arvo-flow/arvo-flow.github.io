import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import Nav from '../../components/Nav';
import {
  Page, Wrap, VisualWrap, Ring, OrbitDot, Core,
  Headline, Sub, StepList, StepItem,
} from './styles';

const STEPS = [
  { type: 'read', label: 'Läser leverantörsfakturor från Fortnox', target: 412 },
  { type: 'skip', label: 'Hoppar över kundfakturor & intäkter' },
  { type: 'read', label: 'Identifierar leverantörer & avtalstyper', target: 38 },
  { type: 'skip', label: 'Hoppar över lönedata & personnummer' },
  { type: 'read', label: 'Jämför mot branschindex (50 000+ SMB)', target: 8 },
  { type: 'skip', label: 'Hoppar över bankkonton & kassaflöde' },
  { type: 'read', label: 'Sammanställer dina besparingsmöjligheter', target: 8 },
];

const STEP_DURATION = 900;
const START_DELAY = 600;

const Scanning = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [counters, setCounters] = useState(() => STEPS.map(() => 0));

  useEffect(() => {
    const total = 187340;
    const dur = START_DELAY + STEP_DURATION * STEPS.length - 600;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * total));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const timers = [];
    STEPS.forEach((s, i) => {
      timers.push(setTimeout(() => setStepIdx(i + 1), START_DELAY + i * STEP_DURATION));
      if (s.type === 'read' && s.target) {
        timers.push(
          setTimeout(() => {
            setCounters((c) => {
              const next = [...c];
              next[i] = s.target;
              return next;
            });
          }, START_DELAY + 400 + i * STEP_DURATION)
        );
      }
    });
    timers.push(setTimeout(() => {
      try { sessionStorage.setItem('arvo:scanCompleted', '1'); } catch (e) {}
      navigate('/insights');
    }, START_DELAY + STEP_DURATION * STEPS.length + 400));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <Page>
      <Nav variant="public" />
      <Wrap>
        <VisualWrap>
          <Ring viewBox="0 0 220 220">
            <circle className="track" cx="110" cy="110" r="100" />
            <circle className="progress" cx="110" cy="110" r="100" />
          </Ring>
          <OrbitDot />
          <Core>
            <span>{count.toLocaleString('sv-SE')}</span>
          </Core>
        </VisualWrap>

        <Headline>Vi skannar din bokföring just nu…</Headline>
        <Sub>
          Arvo Flow analyserar bara dina leverantörsfakturor — ingenting annat.
          Du ser exakt vad vi rör och vad vi går förbi.
        </Sub>

        <StepList>
          {STEPS.map((s, i) => {
            const state = i < stepIdx ? 'done' : i === stepIdx ? 'active' : 'pending';
            return (
              <StepItem key={i} $state={state} $type={s.type}>
                <div className="idx">
                  {s.type === 'skip'
                    ? <Icon name="lock" size={12} stroke={2.4} color="#FFFFFF" />
                    : state === 'done' ? <Icon name="check" size={14} stroke={2.5} /> : (Math.floor(i / 2) + 1)}
                </div>
                <div className="label">{s.label}</div>
                <div className="detail">
                  {s.type === 'skip'
                    ? (state === 'pending' ? '' : 'Skyddat')
                    : (counters[i] > 0 ? counters[i].toLocaleString('sv-SE') : '')}
                </div>
              </StepItem>
            );
          })}
        </StepList>
      </Wrap>
    </Page>
  );
};

export default Scanning;
