import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyle from './assets/styles/global';
import { AuthProvider } from './contexts/AuthContext';

import Landing from './pages/Landing';
import Connect from './pages/Connect';
import Scanning from './pages/Scanning';
import Insights from './pages/Insights';
import Opportunity from './pages/Opportunity';
import Bias from './pages/Bias';
import Villkor from './pages/Villkor';
import Integritet from './pages/Integritet';
import Cookies from './pages/Cookies';
import TestaFaktura from './pages/TestaFaktura';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import OutcomeSurvey from './pages/OutcomeSurvey';
import ArvoScore from './pages/ArvoScore';
import Briefing from './pages/Briefing';
import Intelligence from './pages/Intelligence';
import Aktivera from './pages/Aktivera';
import ScrollToTop from './components/ScrollToTop';

const ArvoFlow = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/scanning" element={<Scanning />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/opportunity/:id" element={<Opportunity />} />
          <Route path="/bias" element={<Bias />} />
          <Route path="/villkor" element={<Villkor />} />
          <Route path="/integritet" element={<Integritet />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/testa-faktura" element={<TestaFaktura />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/utfall" element={<OutcomeSurvey />} />
          <Route path="/arvo-score" element={<ArvoScore />} />
          <Route path="/briefing/:token" element={<Briefing />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/aktivera" element={<Aktivera />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

export default ArvoFlow;
