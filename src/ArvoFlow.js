import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
import GlobalStyle from './assets/styles/global';

import Landing from './pages/Landing';
import Connect from './pages/Connect';
import Scanning from './pages/Scanning';
import Insights from './pages/Insights';
import Opportunity from './pages/Opportunity';
import Bias from './pages/Bias';

const ArvoFlow = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter basename="/flow">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/scanning" element={<Scanning />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/opportunity/:id" element={<Opportunity />} />
        <Route path="/bias" element={<Bias />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default ArvoFlow;
