import { ReactNode } from 'react';
import { Header } from 'src/components';
import styles from './layout.module.scss';

type LayoutProp = {
  children: ReactNode;
};

export default function Layout(props: LayoutProp) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Header />
      <>{children}</>
    </div>
  );
}
