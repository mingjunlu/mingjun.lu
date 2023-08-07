import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Cookies from 'js-cookie';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { site } from 'src/constants';
import 'src/styles/reset.css';
import '../styles/globals.css';

config.autoAddCss = false;

export type ColorMode = 'light' | 'dark' | undefined;

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorMode, setColorMode] = useState<ColorMode>();

  const theme = useMemo(() => {
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode]);
  const isAnalyticsEnabled =
    typeof window !== 'undefined' &&
    typeof site.url !== 'undefined' &&
    window.location.protocol === 'https:' &&
    window.location.href.includes(site.url);

  useEffect(() => {
    const root = document.documentElement;
    const isFirstLoad = colorMode === undefined;
    if (isFirstLoad) {
      const theme = root.getAttribute('data-theme');
      if (isValidTheme(theme)) {
        setColorMode(theme);
      }
    } else {
      root.setAttribute('data-theme', colorMode);
      Cookies.set('theme', colorMode, {
        expires: 30, // Days
        sameSite: 'strict',
        secure: true,
      });
    }
  }, [colorMode]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      {isAnalyticsEnabled && (
        <Script
          async
          data-token={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_TOKEN}
          src={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_SCRIPT}
        />
      )}
    </>
  );
}

function isValidTheme(
  value: unknown
): value is NonNullable<ColorMode> {
  return value === 'light' || value === 'dark';
}
