import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Header } from 'src/components';
import { site } from 'src/constants';
import { AnalyticsScript, InitialThemeScript } from 'src/scripts';
import 'src/styles/globals.scss';
import styles from './layout.module.scss';

config.autoAddCss = false;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <head>
        <InitialThemeScript />
        <AnalyticsScript />
      </head>
      <body>
        <div className={styles.container}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(`${site.url}`),
  };
}
