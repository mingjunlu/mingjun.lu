'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import styles from './nav-link.module.scss';

type NavLinkProps = ComponentProps<typeof Link>;

export default function NavLink(props: NavLinkProps) {
  const { children, className, ...rest } = props;
  const pathname = usePathname();

  const isActive = pathname?.startsWith(rest.href.toString());
  const combinedClassName = clsx(
    styles.container,
    isActive && 'active',
    className,
  );

  return (
    <Link className={combinedClassName} {...rest}>
      {children}
    </Link>
  );
}
