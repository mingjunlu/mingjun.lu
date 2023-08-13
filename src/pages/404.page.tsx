import Head from 'next/head';
import Image from 'next/image';
import { ErrorScreen } from 'src/components';
import styles from './404.module.scss';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Ming-jun Lu</title>
      </Head>
      <ErrorScreen>
        <figure className={styles.imageWrapper}>
          <Image
            fill
            priority
            src="/error-404.png"
            alt="Page not found"
          />
        </figure>
      </ErrorScreen>
    </>
  );
}
