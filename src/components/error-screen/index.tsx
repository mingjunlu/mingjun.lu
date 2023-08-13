import { ReactNode } from 'react';
import styles from './error-screen.module.scss';

type ErrorScreenProps = {
  children: ReactNode;
};

export default function ErrorScreen(props: ErrorScreenProps) {
  const { children } = props;

  return <main className={styles.container}>{children}</main>;
}
