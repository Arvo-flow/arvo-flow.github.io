import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { OPPORTUNITIES, formatKr } from '../../data/mockData';
import {
  Page, Container, BackLink, Head, HeadLeft, HeadSaving, Layout,
  Card, SideCol, CompareGrid, CompareCol, BenchBar, Reasoning, Coverage,
  Steps, StepItem,
  ApproveCard, KeyValue, ApproveActions, ApproveBtn, Note,
  Modal, ModalCard,
} from './styles';

const Opportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const opp = OPPORTUNITIES.find((o) => o.id === id);
  const [stage, setStage] = useState('idle'); // idle | signing | done

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

  const startSign = () => {
    setStage('signing');
    setTimeout(() => setStage('done'), 2400);
  };

  const finish = () => {
    setStage('idle');
    navigate('/insights');
  };

  const youPos = 95;
  const medianPos = ((opp.benchmark.industryMedian - opp.benchmark.industryLow) / (opp.benchmark.yourCost - opp.benchmark.industryLow)) * 100;
  const newPos = 5;

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
            <div className="kicker">Besparing år 1</div>
            <div className="amount">+{opp.savingPerYear.toLocaleString('sv-SE')}</div>
            <div className="unit">kr · {Math.round((opp.savingPerYear / opp.currentAnnualCost) * 100)} % lägre kostnad</div>
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
                  <div className="unit">per år · spara {formatKr(opp.savingPerYear)}</div>
                </CompareCol>
              </CompareGrid>

              <BenchBar>
                <div className="legend">
                  <span>Branschens lägsta</span>
                  <span>Du betalar idag</span>
                </div>
                <div className="track">
                  <div className="suggested" style={{ left: `${newPos}%` }} />
                  <div className="median" style={{ left: `${Math.max(20, Math.min(80, medianPos))}%` }} />
                  <div className="you" style={{ left: `${youPos}%` }}>!</div>
                </div>
                <div className="labels">
                  <span>Lägsta<strong>{formatKr(opp.benchmark.industryLow)}</strong></span>
                  <span>Branschsnitt<strong>{formatKr(opp.benchmark.industryMedian)}</strong></span>
                  <span>Du<strong>{formatKr(opp.benchmark.yourCost)}</strong></span>
                </div>
              </BenchBar>

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
              <KeyValue>
                <div><dt>Besparing år 1</dt><dd>{formatKr(opp.savingPerYear)}</dd></div>
                <div><dt>Avtalstid kvar</dt><dd>{opp.contractEndsIn === 0 ? 'Kan sägas upp nu' : `${opp.contractEndsIn} dagar`}</dd></div>
                <div><dt>Uppsägningstid</dt><dd>{opp.cancellationNotice} dagar</dd></div>
                <div><dt>Vår avgift</dt><dd>{formatKr(Math.round(opp.savingPerYear * 0.2))}</dd></div>
              </KeyValue>
              <ApproveActions>
                <ApproveBtn onClick={startSign}>
                  <Icon name="bankid" size={20} stroke={2} color="#FAFAF7" />
                  Signera med BankID
                </ApproveBtn>
                <Button as="a" href="#" $variant="ghost" $size="md" style={{ color: '#FAFAF7' }}>
                  Spara till senare
                </Button>
              </ApproveActions>
              <Note>14 dagars ångerrätt. Prisgaranti 12 månader. Du kan koppla bort Arvo Flow när som helst.</Note>
            </ApproveCard>

            <Card>
              <h3>Behöver du fundera?</h3>
              <p>
                Vi mejlar dig sammanfattningen så du kan stämma av med din bokförings­konsult eller
                styrelse. Bytet utförs aldrig utan din BankID-signatur.
              </p>
              <Button as="a" href="#" $variant="secondary" $size="md" style={{ marginTop: 16 }}>
                Mejla mig sammanfattningen
              </Button>
            </Card>
          </SideCol>
        </Layout>
      </Container>

      {stage === 'signing' && (
        <Modal>
          <ModalCard>
            <div className="bankid">B</div>
            <h3>Öppna BankID-appen</h3>
            <p>Vi har skickat en signeringsbegäran till ditt BankID. Öppna appen och bekräfta.</p>
            <div className="dots"><span /><span /><span /></div>
          </ModalCard>
        </Modal>
      )}

      {stage === 'done' && (
        <Modal>
          <ModalCard>
            <div className="success">
              <Icon name="check" size={36} stroke={2.5} color="#0F5132" />
            </div>
            <h3>Bytet är igångsatt.</h3>
            <p>
              Vi har skickat uppsägningen till {opp.currentSupplier} och tecknat det nya avtalet hos
              {' '}{opp.suggestedSupplier}. Du får en bekräftelse på mejl inom kort.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button onClick={finish} $variant="primary" $size="md" $full>
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
