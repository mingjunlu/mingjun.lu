import { HeadingProps } from 'react-markdown/lib/ast-to-react';
import styles from './heading-level-one.module.scss';

export default function HeadingLevelOne(props: HeadingProps) {
  const { children } = props;

  return <h1 className={styles.container}>{children}</h1>;
}
