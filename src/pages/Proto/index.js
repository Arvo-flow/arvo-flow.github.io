import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import styled, { keyframes } from 'styled-components';
import { CoverageStrip } from '../Landing/styles';
import {
  Dropzone, FormRow, Field, Disclaimer, Spinner,
} from '../TestaFaktura/styles';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ProtoPage = styled.main`
  background: ${({ theme }) => theme.color.bg};
  min-height: 100vh;
`;

const Hero = styled.section`
  max-width: 680px;
  margin: 0 auto;
  padding: 72px 28px 48px;
  animation: ${fadeUp} 0.5s ease both;
  @media (max-width: 720px) { padding: 48px 20px 32px; }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.size.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.inkSoft};
  margin-bottom: 28px;

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
`;

const Headline = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 500; }
`;

const Lede = styled.p`
  font-size: clamp(15px, 2vw, 17px);
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
  margin: 0 0 32px;
  max-width: 560px;
`;

const UploadCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.size.radius.xl};
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const InlineFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 12px;
  margin-top: 16px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const SubmitRow = styled.div`
  margin-top: 20px;
`;

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.dangerSoft};
  border: 1px solid ${({ theme }) => theme.color.danger};
  font-size: 13.5px;
  color: ${({ theme }) => theme.color.danger};
`;

const ProtoTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.color.mutedSoft};
  letter-spacing: 0.04em;

  span.badge {
    padding: 2px 7px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.muted};
  }
`;

const INDUSTRY_LABELS = {
  ehandel:     'E-handel & Detaljhandel',
  tillverkning:'Industri & Tillverkning',
  'it-tech':   'IT, Tech & Mjukvara',
  bygg:        'Bygg, Hantverk & Fastighet',
  hotell:      'Hotell, Restaurang & Event',
  konsult:     'Konsult & Företagstjänster',
  transport:   'Transport & Logistik',
  vard:        'Vård, Omsorg & Hälsa',
  ovrigt:      'Övrigt / Annan bransch',
};

const COVERAGE_CLUSTERS = [
  { label: 'Hårdvara & Print' },
  { label: 'Energi' },
  { label: 'Kommunikation' },
  { label: 'Mjukvara / SaaS' },
  { label: 'IT-tjänster' },
  { label: 'Fordon & Frakt' },
  { label: 'Kontor & Facility' },
  { label: 'HR & Hälsa' },
];

const MAX_PDF_SIZE = 3 * 1024 * 1024;

const Proto = () => {
  const navigate    = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile]           = useState(null);
  const [industry, setIndustry]   = useState('konsult');
  const [employees, setEmployees] = useState(5);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(false);

  const validateAndSetFile = (f) => {
    setError(null);
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Endast PDF-filer stöds.');
      return;
    }
    if (f.size > MAX_PDF_SIZE) {
      setError(`PDF är för stor (${(f.size / 1024 / 1024).toFixed(1)} MB). Max: 3 MB.`);
      return;
    }
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Välj en PDF-faktura först.'); return; }
    setLoading(true);

    // Encode file to base64 and pass via sessionStorage so /testa-faktura can pick it up
    const reader = new FileReader();
    reader.onload = () => {
      try {
        sessionStorage.setItem('proto_file_b64', reader.result);
        sessionStorage.setItem('proto_file_name', file.name);
        sessionStorage.setItem('proto_file_size', String(file.size));
        sessionStorage.setItem('proto_industry', industry);
        sessionStorage.setItem('proto_employees', String(employees));
        navigate('/testa-faktura?from=proto');
      } catch {
        // sessionStorage too small — navigate anyway, user re-uploads
        navigate('/testa-faktura');
      }
    };
    reader.onerror = () => { setLoading(false); setError('Kunde inte läsa filen.'); };
    reader.readAsDataURL(file);
  };

  return (
    <ProtoPage>
      <Nav variant="public" />

      <Hero>
        <Eyebrow><span className="dot" /> Testa själv · Gratis · 10 sekunder</Eyebrow>

        <Headline>
          Ladda upp <em>en</em> leverantörsfaktura<br />— få svar direkt.
        </Headline>
        <Lede>
          Vi visar exakt vad du betalar, hur du ligger mot branschsnittet och vad du
          kan spara. Ingen registrering, ingen kostnad.
        </Lede>

        <UploadCard>
          <form onSubmit={onSubmit}>
            <Dropzone
              $active={dragActive}
              $hasFile={!!file}
              onClick={() => fileInputRef.current?.click()}
              onDrop={onDrop}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={(e) => validateAndSetFile(e.target.files?.[0])}
              />
              <div className="icon">
                <Icon name={file ? 'check' : 'arrow'} size={26} stroke={2} />
              </div>
              {file ? (
                <>
                  <strong className="primary">PDF vald</strong>
                  <span className="filename">{file.name} · {(file.size / 1024).toFixed(0)} kB</span>
                </>
              ) : (
                <>
                  <strong className="primary">Dra hit din faktura — eller klicka för att välja</strong>
                  <span className="secondary">PDF, max 3 MB. Vi sparar inte filen.</span>
                </>
              )}
            </Dropzone>

            <InlineFormRow>
              <Field>
                <span className="label">Bransch</span>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {Object.entries(INDUSTRY_LABELS).map(([id, label]) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </Field>
              <Field>
                <span className="label">Anställda</span>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                />
              </Field>
            </InlineFormRow>

            {error && <ErrorBox>{error}</ErrorBox>}

            <SubmitRow>
              <Button
                type="submit"
                $variant="gradient"
                $size="lg"
                $full
                disabled={loading || !file}
              >
                {loading
                  ? <><Spinner /> Förbereder…</>
                  : <>Se vad en faktura avslöjar <Icon name="arrow" size={18} /></>}
              </Button>
            </SubmitRow>

            <Disclaimer>
              Fakturan analyseras via AI och raderas omedelbart.{' '}
              <Link to="/integritet">Integritetspolicy</Link>.
            </Disclaimer>
          </form>
        </UploadCard>

        <ProtoTag>
          <span className="badge">Prototyp</span>
          Testar sidlayout — dela inte länken externt
        </ProtoTag>
      </Hero>

      <CoverageStrip>
        <div className="track">
          {[...COVERAGE_CLUSTERS, ...COVERAGE_CLUSTERS].map((c, i) => (
            <span key={`${c.label}-${i}`}>{c.label} <em>·</em></span>
          ))}
        </div>
      </CoverageStrip>

      <Footer />
    </ProtoPage>
  );
};

export default Proto;
