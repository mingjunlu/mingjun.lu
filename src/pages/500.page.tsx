import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { mediaQueries as queries } from 'src/constants';
import Layout from 'src/layouts';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Something Went Wrong | Ming-jun Lu</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.ErrorScreen>
        <ImageWrapper>
          <Image
            fill
            priority
            src="/error-500.png"
            alt="Something went wrong"
          />
        </ImageWrapper>
      </Layout.ErrorScreen>
    </>
  );
}

const ImageWrapper = styled.figure`
  position: relative;
  width: min(100%, calc(601px / 2));
  aspect-ratio: 601 / 373;

  @media ${queries.tabletAndWider} {
    width: calc(601px / 1.5);
  }
  @media ${queries.laptopAndWider} {
    width: calc(601px / 1.25);
  }
  @media ${queries.desktopAndWider} {
    width: 601px;
  }
`;
