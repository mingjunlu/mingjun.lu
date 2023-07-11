import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { mediaQueries as queries } from 'src/constants';
import Layout from 'src/layouts';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Ming-jun Lu</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Layout.ErrorScreen>
        <ImageWrapper>
          <Image
            fill
            priority
            src="/error-404.png"
            alt="Page not found"
          />
        </ImageWrapper>
      </Layout.ErrorScreen>
    </>
  );
}

const ImageWrapper = styled.figure`
  position: relative;
  width: min(100%, calc(612px / 2));
  aspect-ratio: 612 / 373;

  @media ${queries.tabletAndWider} {
    width: calc(612px / 1.5);
  }
  @media ${queries.laptopAndWider} {
    width: calc(612px / 1.25);
  }
  @media ${queries.desktopAndWider} {
    width: 612px;
  }
`;
