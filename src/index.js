import React from 'react';
import { createRoot } from 'react-dom/client';
import { initSentry } from './sentry';
import ArvoFlow from './ArvoFlow';

initSentry();

const root = createRoot(document.getElementById('root'));
root.render(<ArvoFlow />);
