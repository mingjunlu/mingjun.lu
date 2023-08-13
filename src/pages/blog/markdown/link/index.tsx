import { ComponentProps } from 'react';
import { NavLink } from 'src/components';
import styles from './link.module.scss';

export default function Link(props: ComponentProps<'a'>) {
  const { href = '#', children } = props;
  const isInternal = !!href?.startsWith('/');

  if (isInternal) {
    return (
      <NavLink href={href} className={styles.container}>
        {children}
      </NavLink>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.container}
    >
      {children}
    </a>
  );
}
