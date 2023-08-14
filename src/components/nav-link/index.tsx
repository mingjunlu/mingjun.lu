import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps } from 'react';
import styles from './nav-link.module.scss';

type NavLinkProps = ComponentProps<typeof Link>;

export default function NavLink(props: NavLinkProps) {
  const { children, className, ...rest } = props;

  return (
    <Link
      prefetch={false}
      className={clsx(styles.container, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
