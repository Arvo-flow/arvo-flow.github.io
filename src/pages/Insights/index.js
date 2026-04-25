import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';
import { COMPANY, SUMMARY, OPPORTUNITIES, TIMELINE, formatKr } from '../../data/mockData';
import {
  Page, Container, Greeting, Headline, HeadlineGrid, BigNumber, StatList,
  Section, OppGrid, OppCard, OppHead, OppSaving, OppFooter, Compare,
  TimelineWrap, TimelineList, TimelineItem,
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

  useEffect(() => {
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
  }, []);

  const opps = useMemo(() => {
    if (filter === 'high') return OPPORTUNITIES.filter((o) => o.confidence === 'high');
    if (filter === 'urgent') return OPPORTUNITIES.filter((o) => o.contractEndsIn < 60);
    return OPPORTUNITIES;
  }, [filter]);

  return (
    <Page>
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
            <StatList>
              <div>
                <dt>Total leverantörskostnad / år</dt>
                <dd>{formatKr(SUMMARY.totalAnnualSpend)}</dd>
              </div>
              <div>
                <dt>Andel av kostnad du sparar</dt>
                <dd>{Math.round((SUMMARY.identifiedSavings / SUMMARY.totalAnnualSpend) * 100)} %</dd>
              </div>
              <div>
                <dt>Fakturor analyserade</dt>
                <dd>{SUMMARY.invoicesAnalysed}</dd>
              </div>
              <div>
                <dt>Leverantörer scannade</dt>
                <dd>{SUMMARY.suppliersAnalysed}</dd>
              </div>
            </StatList>
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

          <OppGrid>
            {opps.map((o) => (
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
      <Footer />
    </Page>
  );
};

export default Insights;
