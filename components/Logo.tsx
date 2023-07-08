import { ComponentProps } from 'react';
import styled from 'styled-components';

type LogoProps = Pick<ComponentProps<'svg'>, 'color'>;

export default function Logo(props: LogoProps) {
  const { color = 'currentColor' } = props;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 60">
      <path
        d="M19.508 2.33c.717.846 2.112 3.157 3.109 8.933 1.129 6.545 1.726 17.421.328 35.393l2.234.164c1.406-18.063.818-29.133-.353-35.919-1.167-6.766-2.935-9.39-4.01-10.406l-.003-.003L20.81.49a1.85 1.85 0 0 0-2.356-.125l-.003.003-5.986 4.523L6.715.692 6.715.691C5.66-.075 4.138.428 3.789 1.668L.085 14.812v.002a2.263 2.263 0 0 0 .311 1.888l.003.004 2.61 3.81 1.865-1.21-2.608-3.807h-.001a.13.13 0 0 1-.02-.104v-.003l3.56-12.637 6.683 4.879 7.02-5.305z"
        fill={color}
      />
      <path
        d="M.093 44.767 5.008 22.8l2.19.464-4.794 21.423h8.824v2.181H1.824c-1.129 0-1.978-1.016-1.732-2.097l.001-.004z"
        fill={color}
      />
      <path
        d="M13.85 36.79h2.637v18.419c0 1.44-1.199 2.61-2.68 2.61-1.479 0-2.681-1.167-2.681-2.61v-2.866H8.885v2.866c0 2.649 2.207 4.791 4.921 4.791 2.722 0 4.922-2.15 4.922-4.791v-20.6h-4.879v2.18z"
        fill={color}
      />
    </Svg>
  );
}

// Allow style overriding
const Svg = styled.svg``;
Logo.Container = Svg;
