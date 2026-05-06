import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { OPPORTUNITIES, formatKr } from '../../data/mockData';
import {
  Page, Container, BackLink, Head, HeadLeft, HeadSaving, Layout,
  Card, SideCol, CompareGrid, CompareCol, BenchCompact, Reasoning, Coverage,
  Steps, StepItem,
  ApproveCard, NetSaving, KeyValue, ApproveActions, ApproveBtn, Note, ConsiderLink,
  Modal, ModalCard,
} from './styles';

const Opportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const opp = OPPORTUNITIES.find((o) => o.id === id);
  const [stage, setStage] = useState('idle'); // idle | signing | done

  React.useEffect(() => {
    if (opp && opp.licensePending) navigate('/insights', { replace: true });
  }, [opp, navigate]);

  if (!opp) {
    return (
      <Page>
        <Nav variant="app" />
        <Container>
          <p>Möjligheten kunde inte hittas.</p>
          <Button onClick={() => navigate('/insights')} $variant="secondary">Tillbaka</Button>
        </Container>
      </Page>
    );
  }

  if (opp.licensePending) return null;

  const startSign = () => {
    setStage('signing');
    setTimeout(() => setStage('done'), 2400);
  };

  const finish = () => {
    setStage('idle');
    navigate('/insights');
  };

  const range = opp.benchmark.yourCost - opp.benchmark.industryLow;
  const pct = (val) => Math.max(2, Math.min(98, ((val - opp.benchmark.industryLow) / range) * 100));
  const youPos = pct(opp.benchmark.yourCost);
  const medianPos = pct(opp.benchmark.industryMedian);
  const newPos = pct(opp.suggestedAnnualCost);
  const oppNetSaving = netSaving(opp);
  const oppArvoFee = arvoFee(opp);

  return (
    <Page>
      <Nav variant="app" />
      <Container>
        <BackLink onClick={() => navigate('/insights')}>
          <Icon name="arrow" size={14} stroke={2} style={{ transform: 'rotate(180deg)' }} />
          Tillbaka till insikter
        </BackLink>

        <Head>
          <HeadLeft>
            <div className="tag">
              <Icon name={opp.icon} size={14} stroke={2.2} />
              {opp.category}
            </div>
            <h1>Byt till {opp.suggestedSupplier}.<br />Spara {formatKr(opp.savingPerYear)} per år.</h1>
            <p className="lede">{opp.why}</p>
          </HeadLeft>
          <HeadSaving>
            <div className="kicker">Din nettobesparing år 1</div>
            <div className="amount">+{oppNetSaving.toLocaleString('sv-SE')}</div>
            <div className="unit">kr · efter Arvos avgift {oppArvoFee.toLocaleString('sv-SE')} kr (20 %)</div>
          </HeadSaving>
        </Head>

        <Layout>
          <div>
            <Card>
              <h3>Sida vid sida</h3>
              <p>Identiskt täckningsomfång och servicenivå — bara ett bättre pris.</p>
              <CompareGrid>
                <CompareCol>
                  <span className="lbl">Idag</span>
                  <strong className="name">{opp.currentSupplier}</strong>
                  <div className="cost">{formatKr(opp.currentAnnualCost)}</div>
                  <div className="unit">per år</div>
                </CompareCol>
                <CompareCol $best>
                  <span className="badge">Rekommenderad</span>
                  <span className="lbl">Med Arvo Flow</span>
                  <strong className="name">{opp.suggestedSupplier}</strong>
                  <div className="cost">{formatKr(opp.suggestedAnnualCost)}</div>
                  <div className="unit">per år · spara {formatKr(oppNetSaving)} netto</div>
                </CompareCol>
              </CompareGrid>

              <BenchCompact>
                <div className="hero">
                  <span className="kicker">Du betalar idag</span>
                  <strong className="overpay">{Math.round(((opp.benchmark.yourCost - opp.benchmark.industryMedian) / opp.benchmark.industryMedian) * 100)} %</strong>
                  <span className="overpayLabel">över branschsnittet</span>
                </div>
                <div className="track">
                  <div className="suggested" style={{ left: `${newPos}%` }} />
                  <div className="median" style={{ left: `${Math.max(20, Math.min(80, medianPos))}%` }} />
                  <div className="you" style={{ left: `${youPos}%` }} />
                </div>
                <div className="legend">
                  <span><div className="dot suggested" /> Med Arvo {formatKr(opp.suggestedAnnualCost)}</span>
                  <span><div className="dot median" /> Snitt {formatKr(opp.benchmark.industryMedian)}</span>
                  <span><div className="dot you" /> Du {formatKr(opp.benchmark.yourCost)}</span>
                </div>
              </BenchCompact>

              <Reasoning>
                <span>Varför Arvo rekommenderar bytet</span>
                <p>{opp.why}</p>
              </Reasoning>
            </Card>

            <Card>
              <h3>Vad du får hos {opp.suggestedSupplier}</h3>
              <p>Vi har verifierat att täckning och servicenivå motsvarar eller överträffar ditt nuvarande avtal.</p>
              <Coverage>
                {opp.coverage.map((c) => (
                  <li key={c}><Icon name="check" size={16} stroke={2.2} /> {c}</li>
                ))}
              </Coverage>
            </Card>

            <Card>
              <h3>Så går bytet till</h3>
              <p>Arvo förbereder allt — du signerar med BankID och vi sköter resten.</p>
              <Steps>
                {opp.switchSteps.map((s, i) => (
                  <StepItem key={i}>
                    <div className="idx">{i + 1}</div>
                    <div className="text">{s}</div>
                  </StepItem>
                ))}
              </Steps>
            </Card>
          </div>

          <SideCol>
            <ApproveCard>
              <h3>Godkänn bytet</h3>
              <p>Vi förbereder allt och hanterar övergången. Du signerar med BankID och kan ångra inom 14 dagar utan kostnad.</p>
              <NetSaving>
                <span className="kicker">Din nettobesparing år 1</span>
                <span className="amount">{formatKr(oppNetSaving)}</span>
                <span className="fineprint">
                  Bruttobesparing {formatKr(opp.savingPerYear)} − Arvos success-fee {formatKr(oppArvoFee)} (20 %)
                </span>
              </NetSaving>
              <KeyValue>
                <div><dt>Avtalstid kvar</dt><dd>{opp.contractEndsIn === 0 ? 'Kan sägas upp nu' : `${opp.contractEndsIn} dagar`}</dd></div>
                <div><dt>Uppsägningstid</dt><dd>{opp.cancellationNotice} dagar</dd></div>
              </KeyValue>
              <ApproveActions>
                <ApproveBtn onClick={startSign}>
                  <Icon name="bankid" size={20} stroke={2} color="#FFFFFF" />
                  Godkänn byte med BankID
                </ApproveBtn>
              </ApproveActions>
              <Note>
                Vi sköter all onboarding hos {opp.suggestedSupplier} åt dig.
                14 dagars ångerrätt — bytet aktiveras inte förrän det nya avtalet är på plats.
              </Note>
              <ConsiderLink>
                <a href="#" onClick={(e) => e.preventDefault()}>Mejla mig sammanfattningen istället</a>
              </ConsiderLink>
            </ApproveCard>
          </SideCol>
        </Layout>
      </Container>

      {stage === 'signing' && (
        <Modal>
          <ModalCard>
            <div className="bankid">B</div>
            <h3>Öppna BankID-appen</h3>
            <p>Bekräfta för att godkänna bytet till {opp.suggestedSupplier}. Du behöver bara signera en gång — vi sköter resten.</p>
            <div className="dots"><span /><span /><span /></div>
          </ModalCard>
        </Modal>
      )}

      {stage === 'done' && (
        <Modal>
          <ModalCard>
            <div className="success">
              <Icon name="check" size={36} stroke={2.5} color="#1B7A6E" />
            </div>
            <h3>Bytet är igångsatt.</h3>
            <p>
              <strong>Du behöver inte göra något mer.</strong> Vi förhandlar uppsägningen
              med {opp.currentSupplier} och tecknar det nya avtalet med {opp.suggestedSupplier}
              {' '}åt dig. Du får bekräftelse på mejl när bytet är aktiverat.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button onClick={finish} $variant="gradient" $size="md" $full>
                Tillbaka till insikter
              </Button>
            </div>
          </ModalCard>
        </Modal>
      )}

      <Footer />
    </Page>
  );
};

export default Opportunity;
