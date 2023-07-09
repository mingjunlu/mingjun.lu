import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import LogoSvg from 'public/logo.svg';
import { mediaQueries as queries } from 'src/constants';
import NavLink from './nav-link';

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const router = useRouter();
  const { pathname } = router;

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

  @media ${queries.tabletAndWider} {
    padding: 2px 10px;
  }

  > svg {
    width: 26px;
    height: 60px;
    color: var(--color-dark-gray);

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
    color: var(--color-gray);

    ${(props) =>
      !!props.isActive &&
      css`
        font-weight: 600;
        text-decoration: underline;
        color: var(--color-dark-gray);
      `};
  }
`;
