import { ComponentProps } from 'react';
import styles from './table.module.scss';

export default function Table(props: ComponentProps<'table'>) {
  const { children } = props;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.container}>{children}</table>
    </div>
  );
}
