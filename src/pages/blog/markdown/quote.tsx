import { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

export default function Quote(props: ComponentProps<'blockquote'>) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.blockquote`
  padding: 16px 30px;
  border-left: 4px solid var(--color-dark-gray);
  background-color: var(--color-light-gray);
  transition: background-color var(--transition-ease-in-out-250),
    border-color var(--transition-ease-in-out-250);

  ${(props) =>
    props.theme.colorMode === 'dark' &&
    css`
      border-color: var(--color-light-gray);
      background-color: var(--color-dark-gray);
    `}
`;
