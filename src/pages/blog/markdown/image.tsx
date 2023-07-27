import { ComponentProps } from 'react';
import styled from 'styled-components';

export default function Image(props: ComponentProps<'img'>) {
  const { src, alt, title } = props;

  return (
    <Container loading="lazy" src={src} alt={alt} title={title} />
  );
}

const Container = styled.img`
  margin: 0 auto;
`;
