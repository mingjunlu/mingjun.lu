import Image from 'next/image';
import styled from 'styled-components';
import { Header, Metadata } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { site } from 'src/constants';

export default function About() {
  return (
    <>
      <Metadata title="About" url={`${site.url}/about`} />
      <Container>
        <Header />
        <Main>
          <ImageWrapper className="under-construction-light-wrapper">
            {/* Presence controlled by CSS display property */}
            <Image
              fill
              priority
              src="/under-construction-dark.png"
              alt="Under construction"
            />
            <Image
              fill
              priority
              src="/under-construction.png"
              alt="Under construction"
            />
          </ImageWrapper>
        </Main>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 18px 20px;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
  @media ${queries.tabletAndWider} {
    padding: 60px;
    max-width: 754px;
    margin: 0 auto;
  }
`;
const Main = styled.section`
  flex: 1 1 auto;
  display: grid;
  place-items: center;
  padding: 42px 0;

  @media ${queries.tabletAndWider} {
    padding: 54px 0;
    margin: 0 auto;
  }
`;
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
