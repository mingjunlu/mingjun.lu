import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { AppProps } from 'next/app';
import 'src/styles/globals.css';

config.autoAddCss = false;

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
