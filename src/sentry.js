import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = process.env.REACT_APP_SENTRY_DSN;
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? 'production',
    release:     process.env.REACT_APP_VERSION,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      // Filtrera bort icke-kritiska nätverksfel
      const msg = event.exception?.values?.[0]?.value ?? '';
      if (msg.includes('Network request failed') || msg.includes('Load failed')) return null;
      return event;
    },
  });
}

export { Sentry };
