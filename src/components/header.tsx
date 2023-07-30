import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import styled, { css, useTheme } from 'styled-components';
import LogoSvg from 'public/logo.svg';
import MoonSvg from 'public/moon.svg';
import SunSvg from 'public/sun.svg';
import { mediaQueries as queries } from 'src/constants';
import NavLink from './nav-link';

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const router = useRouter();
  const { colorMode, setColorMode } = useTheme();

  const { pathname } = router;
  const isDarkMode = colorMode === 'dark';

  const toggleColorMode = () => {
    setColorMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <Container className={inter.className}>
      <LogoLink href="/">
        <LogoSvg />
      </LogoLink>
      <Nav>
        <NavList>
          <NavListItem isActive={pathname.startsWith('/about')}>
            <NavLink href="/about">About</NavLink>
          </NavListItem>
          <NavListItem isActive={pathname.startsWith('/blog')}>
            <NavLink href="/blog">Blog</NavLink>
          </NavListItem>
        </NavList>
      </Nav>
      <ToggleButton onClick={toggleColorMode}>
        {isDarkMode ? (
          <MoonSvg className="moon-icon" />
        ) : (
          <SunSvg className="sun-icon" />
        )}
      </ToggleButton>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
`;
const LogoLink = styled(NavLink)`
  flex: 0 0 auto;
  padding: 6px 10px;
  color: inherit;

  @media ${queries.tabletAndWider} {
    padding: 2px 10px;
  }

  > svg {
    width: 26px;
    height: 60px;

    @media ${queries.tabletAndWider} {
      width: 29px;
      height: 70px;
    }
  }
`;
const Nav = styled.nav`
  flex: 1 1 150px;
  margin-left: 28px;
  overflow-x: auto;
  color: ${(props) =>
    props.theme.colorMode === 'dark'
      ? 'var(--color-regent-gray)'
      : 'var(--color-gray)'};

  @media ${queries.tabletAndWider} {
    margin-left: 54px;
  }
`;
const NavList = styled.ul`
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const NavListItem = styled.li<{ isActive?: boolean }>`
  > ${NavLink} {
    display: block;
    font-size: 20px;
    padding: 6px 10px;
    color: inherit;

    ${(props) =>
      !!props.isActive &&
      css`
        font-weight: 600;
        text-decoration: underline;
        color: ${props.theme.colorMode === 'dark'
          ? 'var(--color-light-gray)'
          : 'var(--color-dark-gray)'};
      `};
  }
`;
const Button = styled.button.attrs({ type: 'button' })`
  all: unset;
  cursor: pointer;
`;
const ToggleButton = styled(Button)`
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;

  > .moon-icon {
    width: 18px;
    height: 18px;
    transform: translateX(2px);
  }
  > .sun-icon {
    width: 24px;
    height: 24px;
  }
`;
