import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Quote(props: ComponentProps<'blockquote'>) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.blockquote`
  padding: 16px 30px;
  border-left: 4px solid var(--color-quote-foreground);
  color: var(--color-quote-foreground);
  background-color: var(--color-quote-background);
  transition: background-color var(--transition-ease-in-out-250),
    border-color var(--transition-ease-in-out-250);

  code {
    color: var(--color-quote-background);
    background-color: var(--color-quote-foreground);
  }
`;
