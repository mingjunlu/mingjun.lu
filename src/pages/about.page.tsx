import Image from 'next/image';
import styled, { useTheme } from 'styled-components';
import { Header, Metadata } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { site } from 'src/constants';

export default function About() {
  const { colorMode } = useTheme();

  const isDarkMode = colorMode === 'dark';
  const imageSource = isDarkMode
    ? '/under-construction-dark.png'
    : '/under-construction.png';

  return (
    <>
      <Metadata title="About" url={`${site.url}/about`} />
      <Container>
        <Header />
        <Main>
          <ImageWrapper>
            <Image
              fill
              priority
              src={imageSource}
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
