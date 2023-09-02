import { ComponentProps } from 'react';
import styles from './image.module.scss';

export default function Image(props: ComponentProps<'img'>) {
  const { src, alt, title } = props;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      loading="lazy"
      src={src}
      alt={alt}
      title={title}
      className={styles.container}
    />
  );
}
