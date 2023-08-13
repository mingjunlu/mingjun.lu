import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import LogoSvg from 'public/logo.svg';
import MoonSvg from 'public/moon.svg';
import SunSvg from 'public/sun.svg';
import { NavLink } from 'src/components';
import { ThemeContext } from 'src/contexts';
import styles from './header.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Header() {
  const router = useRouter();
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const { pathname } = router;
  const isDarkMode = colorMode === 'dark';

  const toggleColorMode = () => {
    setColorMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className={clsx(styles.container, inter.className)}>
      <NavLink href="/" className={styles.logoLink}>
        <LogoSvg />
      </NavLink>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={clsx({
              [styles.navListItem]: true,
              [styles.navListItemActive]:
                pathname.startsWith('/about'),
            })}
          >
            <NavLink href="/about">About</NavLink>
          </li>
          <li
            className={clsx({
              [styles.navListItem]: true,
              [styles.navListItemActive]:
                pathname.startsWith('/blog'),
            })}
          >
            <NavLink href="/blog">Blog</NavLink>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={toggleColorMode}
        className={styles.toggleButton}
      >
        {/* Presence controlled by CSS display property */}
        <MoonSvg className="moon-icon" />
        <SunSvg className="sun-icon" />
      </button>
    </header>
  );
}
