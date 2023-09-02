import { ComponentProps } from 'react';
import styles from './quote.module.scss';

export default function Quote(props: ComponentProps<'blockquote'>) {
  const { children } = props;

  return (
    <blockquote className={styles.container}>{children}</blockquote>
  );
}
