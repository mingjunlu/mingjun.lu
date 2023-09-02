'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function AnalyticsScript() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isVercelDomain = location.hostname.includes('.vercel.app');
    setIsEnabled(isProduction && !isVercelDomain);
  }, []);

  if (!isEnabled) {
    return null;
  }
  return (
    <Script
      async
      id="load-analytics"
      data-token={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_TOKEN}
      src={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_SCRIPT}
    />
  );
}
