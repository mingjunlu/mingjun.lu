import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/blog');
  }, [router]);

  return (
    <>
      <Head>
        <title>Ming-jun Lu</title>
      </Head>
    </>
  );
}
