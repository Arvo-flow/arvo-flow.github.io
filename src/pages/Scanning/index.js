import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import Nav from '../../components/Nav';
import {
  Page, Wrap, VisualWrap, Ring, OrbitDot, Core,
  Headline, Sub, StepList, StepItem,
} from './styles';

const STEPS = [
  { label: 'Läser leverantörsfakturor från Fortnox', target: 412 },
  { label: 'Identifierar leverantörer & avtalstyper', target: 38 },
  { label: 'Jämför mot branschindex (50 000+ SMB)', target: 8 },
  { label: 'Sammanställer dina besparingsmöjligheter', target: 8 },
];

const Scanning = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const total = 187340;
    const dur = 5500;
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
      timers.push(setTimeout(() => setStepIdx(i + 1), 700 + i * 1200));
      timers.push(
        setTimeout(() => {
          setCounters((c) => {
            const next = [...c];
            next[i] = s.target;
            return next;
          });
        }, 1100 + i * 1200)
      );
    });
    timers.push(setTimeout(() => {
      try { sessionStorage.setItem('arvo:scanCompleted', '1'); } catch (e) {}
      navigate('/insights');
    }, 6200));
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
          Arvo Flow analyserar dina leverantörsfakturor och hittar var du betalar över marknadspris.
          Detta tar mindre än 30 sekunder.
        </Sub>

        <StepList>
          {STEPS.map((s, i) => {
            const state = i < stepIdx ? 'done' : i === stepIdx ? 'active' : 'pending';
            return (
              <StepItem key={s.label} $state={state}>
                <div className="idx">
                  {state === 'done' ? <Icon name="check" size={14} stroke={2.5} /> : i + 1}
                </div>
                <div className="label">{s.label}</div>
                <div className="detail">
                  {counters[i] > 0 ? counters[i].toLocaleString('sv-SE') : ''}
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
