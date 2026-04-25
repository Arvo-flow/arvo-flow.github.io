import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { COMPANY, SUMMARY, OPPORTUNITIES, TIMELINE, formatKr } from '../../data/mockData';
import {
  Page, Container, Greeting, Headline, HeadlineGrid, BigNumber, HeadlineSplit,
  Section, SectionHeader, OppGrid, OppCard, OppHead, OppSaving, OppFooter, Compare,
  LockedCard, LockedHead, LockedSaving, LockedNote, LockedFooter,
  VipModal, VipModalCard,
  TimelineWrap, TimelineList, TimelineItem, SkeletonOverlay,
} from './styles';

const FILTERS = [
  { id: 'all', label: 'Alla' },
  { id: 'high', label: 'Hög säkerhet' },
  { id: 'urgent', label: 'Brådskande' },
];

const Insights = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(() => {
    try { return sessionStorage.getItem('arvo:scanCompleted') !== '1'; }
    catch (e) { return false; }
  });

  useEffect(() => {
    if (!showSkeleton) return;
    const t = setTimeout(() => {
      setShowSkeleton(false);
      try { sessionStorage.setItem('arvo:scanCompleted', '1'); } catch (e) {}
    }, 2200);
    return () => clearTimeout(t);
  }, [showSkeleton]);

  useEffect(() => {
    if (showSkeleton) return;
    const total = SUMMARY.identifiedSavings;
    const dur = 1400;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimatedSavings(Math.round(eased * total));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showSkeleton]);

  const [vipFor, setVipFor] = useState(null);
  const [vipState, setVipState] = useState('idle');

  const filtered = useMemo(() => {
    if (filter === 'high') return OPPORTUNITIES.filter((o) => o.confidence === 'high');
    if (filter === 'urgent') return OPPORTUNITIES.filter((o) => o.contractEndsIn < 60);
    return OPPORTUNITIES;
  }, [filter]);

  const activeOpps = filtered.filter((o) => !o.licensePending);
  const lockedOpps = filtered.filter((o) => o.licensePending);

  const totalActive = activeOpps.reduce((s, o) => s + o.savingPerYear, 0);
  const totalLocked = lockedOpps.reduce((s, o) => s + o.savingPerYear, 0);

  const openVip = (opp) => {
    setVipFor(opp);
    setVipState('idle');
  };
  const confirmVip = () => setVipState('confirmed');
  const closeVip = () => {
    setVipFor(null);
    setVipState('idle');
  };

  return (
    <Page>
      {showSkeleton && (
        <SkeletonOverlay>
          <div className="spinner" />
          <h2>Analyserar 412 leverantörsfakturor…</h2>
          <p>Jämför mot 50 000+ andra svenska SMB:er för att hitta var du betalar över marknadspris.</p>
          <ul className="skeletonRows">
            <li /><li /><li /><li />
          </ul>
        </SkeletonOverlay>
      )}
      <Nav variant="app" />
      <Container>
        <Greeting>
          <div className="left">
            <small>{COMPANY.name} · Org {COMPANY.orgNumber}</small>
            <h1>God morgon, Johan.</h1>
          </div>
          <div className="right">
            <span className="live">Scanning klar 09:14</span>
          </div>
        </Greeting>

        <Headline>
          <HeadlineGrid>
            <BigNumber>
              <span className="kicker">Identifierad besparing år 1</span>
              <div className="amount tabular">
                <em>{animatedSavings.toLocaleString('sv-SE')}</em>
                <span className="unit">kr</span>
              </div>
              <p>
                Vi gick igenom {SUMMARY.invoicesAnalysed} leverantörsfakturor från
                {' '}{SUMMARY.suppliersAnalysed} olika leverantörer det senaste året och hittade
                {' '}{OPPORTUNITIES.length} tydliga bytesmöjligheter. Du kan godkänna varje ett
                separat med BankID — ingen leverantör byts utan din signatur.
              </p>
            </BigNumber>
            <HeadlineSplit>
              <div>
                <span className="lbl">Redo nu <em className="live">Live</em></span>
                <div className="value">
                  {totalActive.toLocaleString('sv-SE')}
                  <small>kr · {activeOpps.length} möjligheter</small>
                </div>
              </div>
              <div>
                <span className="lbl">Beta <em className="beta">Väntar på FI</em></span>
                <div className="value">
                  ~{totalLocked.toLocaleString('sv-SE')}
                  <small>kr · {lockedOpps.length} möjligheter</small>
                </div>
              </div>
            </HeadlineSplit>
          </HeadlineGrid>
        </Headline>

        <Section>
          <header>
            <div>
              <h2>Dina besparingsmöjligheter</h2>
              <p>Sorterade efter besparing per år. Klicka för detaljer + signera bytet.</p>
            </div>
            <div className="filters">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={filter === f.id ? 'active' : ''}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </header>

          <SectionHeader>
            <h3>Redo att aktiveras idag</h3>
            <span className="badge">Live</span>
            <span className="subtle">{activeOpps.length} möjligheter · {totalActive.toLocaleString('sv-SE')} kr/år</span>
          </SectionHeader>

          <OppGrid>
            {activeOpps.map((o) => (
              <OppCard key={o.id} onClick={() => navigate(`/opportunity/${o.id}`)}>
                <OppHead $high={o.confidence === 'high'}>
                  <div className="icon"><Icon name={o.icon} size={22} /></div>
                  <div className="text">
                    <span className="cat">{o.category}</span>
                    <strong>{o.suggestedSupplier}</strong>
                  </div>
                  <span className="confidence">
                    {o.confidence === 'high' ? 'Hög' : 'Medel'}
                  </span>
                </OppHead>

                <OppSaving>
                  <div className="amount">+{o.savingPerYear.toLocaleString('sv-SE')} kr</div>
                  <div className="unit">årlig besparing · {Math.round((o.savingPerYear / o.currentAnnualCost) * 100)} % lägre kostnad</div>
                </OppSaving>

                <Compare>
                  <div>
                    <span>Idag</span>
                    <strong>{formatKr(o.currentAnnualCost)}</strong>
                  </div>
                  <Icon name="arrow" size={18} />
                  <div className="right">
                    <span>Med Arvo</span>
                    <strong>{formatKr(o.suggestedAnnualCost)}</strong>
                  </div>
                </Compare>

                <OppFooter>
                  <div className="delta">
                    {o.contractEndsIn === 0
                      ? <>Avtalet kan sägas upp <span>nu</span></>
                      : <>Avtal löper i <span>{o.contractEndsIn} dgr</span></>}
                  </div>
                  <div className="cta">
                    Granska <Icon name="arrow" size={14} />
                  </div>
                </OppFooter>
              </OppCard>
            ))}
          </OppGrid>

          {lockedOpps.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <SectionHeader>
                <h3>Snart tillgängligt</h3>
                <span className="badge warning">Beta · Väntar på FI</span>
                <span className="subtle">{lockedOpps.length} möjligheter · ~{totalLocked.toLocaleString('sv-SE')} kr/år</span>
              </SectionHeader>

              <OppGrid>
                {lockedOpps.map((o) => (
                  <LockedCard key={o.id} onClick={() => openVip(o)}>
                    <LockedHead>
                      <div className="icon"><Icon name={o.icon} size={22} /></div>
                      <div className="text">
                        <span className="cat">{o.category}</span>
                        <strong>{o.currentSupplier}</strong>
                      </div>
                      <span className="beta">Beta</span>
                    </LockedHead>

                    <LockedSaving>
                      <div className="amount">~<em>{o.savingPerYear.toLocaleString('sv-SE')}</em> kr</div>
                      <div className="unit">
                        estimerad överbetalning · <strong>{o.overpaymentPercent} % över branschsnittet</strong>
                      </div>
                    </LockedSaving>

                    <LockedNote>
                      <Icon name="lock" size={16} stroke={2} />
                      <span>Vi väntar på godkännande från Finansinspektionen för att få byta din försäkring åt dig. Estimat baserat på din premie + branschindex.</span>
                    </LockedNote>

                    <LockedFooter>
                      <div className="delta">Lansering Q4 2026</div>
                      <div className="cta">
                        Ställ mig i VIP-kön <Icon name="arrow" size={14} />
                      </div>
                    </LockedFooter>
                  </LockedCard>
                ))}
              </OppGrid>
            </div>
          )}
        </Section>

        <Section>
          <header>
            <div>
              <h2>Din resa med Arvo</h2>
              <p>Så här ser tidslinjen ut — vi följer upp varje vecka och rapporterar.</p>
            </div>
          </header>

          <TimelineWrap>
            <TimelineList>
              {TIMELINE.map((t, i) => (
                <TimelineItem key={i} $state={t.status}>
                  <div className="label">{t.label}</div>
                  <div className="detail">{t.detail}</div>
                  <div className="week">v {t.week}</div>
                </TimelineItem>
              ))}
            </TimelineList>
          </TimelineWrap>
        </Section>
      </Container>

      {vipFor && (
        <VipModal onClick={(e) => { if (e.target === e.currentTarget) closeVip(); }}>
          <VipModalCard>
            {vipState === 'idle' ? (
              <>
                <div className="crown"><Icon name="spark" size={28} stroke={2} /></div>
                <span className="tag">Beta · VIP-kö</span>
                <h3>Vi byter din {vipFor.category.toLowerCase()} när FI är klart.</h3>
                <p>
                  Din nuvarande premie hos {vipFor.currentSupplier} ligger
                  <strong> {vipFor.overpaymentPercent} % över branschsnittet</strong> — en estimerad
                  överbetalning på cirka <strong>{vipFor.savingPerYear.toLocaleString('sv-SE')} kr/år</strong>.
                  Vi får inte teckna det nya avtalet åt dig förrän vi är registrerade
                  försäkringsförmedlare hos Finansinspektionen (FI).
                </p>
                <ul className="benefits">
                  <li><Icon name="check" size={16} stroke={2.2} /> Din plats i kön reserveras med Fortnox-data redan analyserad</li>
                  <li><Icon name="check" size={16} stroke={2.2} /> Du får mejl när vi går live — bytet utförs samma dag</li>
                  <li><Icon name="check" size={16} stroke={2.2} /> Garanterad placering före öppen lansering</li>
                </ul>
                <div className="actions">
                  <Button onClick={confirmVip} $variant="gradient" $size="lg" $full>
                    Reservera min plats — gratis
                  </Button>
                  <Button onClick={closeVip} $variant="ghost" $size="md" $full>
                    Stäng
                  </Button>
                </div>
              </>
            ) : (
              <div className="confirmed">
                <div className="checkmark"><Icon name="check" size={36} stroke={2.5} /></div>
                <h3>Din plats är reserverad.</h3>
                <p>
                  Vi har märkt din {vipFor.category.toLowerCase()} med VIP-flagga och hör av oss
                  så fort vi får grönt ljus från FI. Tills dess fortsätter vi optimera dina
                  övriga leverantörsavtal.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Button onClick={closeVip} $variant="primary" $size="md" $full>
                    Tillbaka till insikter
                  </Button>
                </div>
              </div>
            )}
          </VipModalCard>
        </VipModal>
      )}

      <Footer />
    </Page>
  );
};

export default Insights;
