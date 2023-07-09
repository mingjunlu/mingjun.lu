import Link from 'next/link';
import styled from 'styled-components';

const NavLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  text-underline-offset: 6px;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export default NavLink;
