import Head from 'next/head';
import Image from 'next/image';
import { ErrorScreen } from 'src/components';
import styles from './500.module.scss';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Something Went Wrong | Ming-jun Lu</title>
      </Head>
      <ErrorScreen>
        <figure className={styles.imageWrapper}>
          <Image
            fill
            priority
            src="/error-500.png"
            alt="Something went wrong"
          />
        </figure>
      </ErrorScreen>
    </>
  );
}
