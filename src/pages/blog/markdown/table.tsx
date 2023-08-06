import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Table(props: ComponentProps<'table'>) {
  const { children } = props;

  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: auto;
`;
const Container = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    border-bottom: 1px solid var(--color-french-gray);
  }
  // prettier-ignore
  th, td {
    padding: 6px;
  }
`;
