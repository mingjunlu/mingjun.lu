import { HeadingProps } from 'react-markdown/lib/ast-to-react';
import styled from 'styled-components';
import { mediaQueries as queries } from 'src/constants';

export default function HeadingLevelOne(props: HeadingProps) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.h1`
  order: -1;

  @media ${queries.tabletAndWider} {
    font-size: 2em;
  }
`;
