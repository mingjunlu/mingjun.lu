import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Link(props: ComponentProps<'a'>) {
  const { href, children } = props;

  return (
    <Container href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </Container>
  );
}

const Container = styled.a`
  color: inherit;
  text-underline-offset: 4px;
`;
