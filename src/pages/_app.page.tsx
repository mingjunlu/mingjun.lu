import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Layout } from 'src/components';
import { site } from 'src/constants';
import { ThemeContext } from 'src/contexts';
import { useTheme } from 'src/hooks';
import 'src/styles/reset.scss';
import '../styles/globals.scss';

config.autoAddCss = false;

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props;
  const theme = useTheme();

  const isAnalyticsEnabled =
    typeof window !== 'undefined' &&
    typeof site.url !== 'undefined' &&
    window.location.protocol === 'https:' &&
    window.location.href.includes(site.url);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <ThemeContext.Provider value={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContext.Provider>
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
