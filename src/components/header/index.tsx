import clsx from 'clsx';
import { Inter } from 'next/font/google';
import LogoSvg from 'public/logo.svg';
import { ThemeToggle } from 'src/components';
import NavLink from '../nav-link';
import styles from './header.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  return (
    <header className={clsx(styles.container, inter.className)}>
      <NavLink href="/" aria-label="Home" className={styles.logoLink}>
        <LogoSvg className={styles.logo} />
      </NavLink>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink href="/about" className={clsx(styles.navLink)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink href="/blog" className={clsx(styles.navLink)}>
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
