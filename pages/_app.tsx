import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
}
