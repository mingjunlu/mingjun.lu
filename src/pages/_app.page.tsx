import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import 'src/styles/reset.css';
import '../styles/globals.css';

config.autoAddCss = false;

export type ColorMode = 'light' | 'dark';

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const theme = useMemo(() => {
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', colorMode);
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
      <Analytics />
    </>
  );
}
