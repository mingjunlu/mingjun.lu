import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Table(props: ComponentProps<'table'>) {
  const { children } = props;

  return <Container>{children}</Container>;
}

const Container = styled.table`
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid var(--color-french-gray);
  }
  // prettier-ignore
  th, td {
    padding: 6px;
  }
`;
