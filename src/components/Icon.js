import React from 'react';

const ICONS = {
  shield: (
    <path d="M12 2.5l8 3v6.5c0 4.6-3.3 8.7-8 9.5-4.7-.8-8-4.9-8-9.5V5.5l8-3z" />
  ),
  bolt: (
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  ),
  phone: (
    <path d="M5 3h4l2 5-3 2c1.4 2.8 3.7 5.1 6.5 6.5l2-3 5 2v4c0 1.1-.9 2-2 2-9.4 0-17-7.6-17-17 0-1.1.9-2 2-2z" />
  ),
  wifi: (
    <>
      <path d="M2 8.8a14 14 0 0120 0" />
      <path d="M5 12.6a9 9 0 0114 0" />
      <path d="M8.5 16.4a4 4 0 017 0" />
      <circle cx="12" cy="20" r="1" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </>
  ),
  truck: (
    <>
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7z" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="18" cy="18.5" r="2" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l5 5L20 7" />,
  upload: (
    <>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M12 17v-5M9.5 14.5L12 12l2.5 2.5" />
    </>
  ),
  spark: (
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="11" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>
  ),
  fortnox: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  bankid: (
    <>
      <path d="M5 3h14v18H5z" />
      <path d="M9 8c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 1 2 3 2 3-1 3-2" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </>
  ),
  'alert-circle': (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </>
  ),
  // 24/7-bevakning fångar avvikelsen — monitor-puls med spik
  pulse: (
    <path d="M2 13h4l2.5-7 4 14 2.5-7H22" />
  ),
  // Community Benchmark — fördelningsstaplar mot baslinje
  benchmark: (
    <>
      <path d="M3 20h18" />
      <path d="M6.5 20v-4.5" />
      <path d="M11 20v-10" />
      <path d="M15.5 20v-6.5" />
      <path d="M20 20v-13" />
    </>
  ),
  // Proaktiv avtalsbevakning — kalender med klocka (90-dagarsvarning)
  'calendar-clock': (
    <>
      <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6.5" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M17.5 15.6v2l1.4 1" />
    </>
  ),
};

const Icon = ({ name, size = 20, stroke = 1.6, color = 'currentColor', fill = 'none', ...rest }) => {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {path}
    </svg>
  );
};

export default Icon;
