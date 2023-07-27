import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Quote(props: ComponentProps<'blockquote'>) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.blockquote`
  padding: 16px 30px;
  border-left: 4px solid var(--color-dark-gray);
  background-color: var(--color-light-gray);
`;
