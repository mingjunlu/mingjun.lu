import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { mediaQueries as queries } from 'src/constants';
import Layout from 'src/layouts';

export default function About() {
  return (
    <>
      <Head>
        <title>About | Ming-jun Lu</title>
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
            src="/under-construction.png"
            alt="Under construction"
          />
        </ImageWrapper>
      </Layout.ErrorScreen>
    </>
  );
}

const ImageWrapper = styled.figure`
  position: relative;
  width: min(100%, calc(336px / 1.6));
  aspect-ratio: 336 /323;

  @media ${queries.tabletAndWider} {
    width: calc(336px / 1.4);
  }
  @media ${queries.laptopAndWider} {
    width: calc(336px / 1.2);
  }
  @media ${queries.desktopAndWider} {
    width: 336px;
  }
`;
