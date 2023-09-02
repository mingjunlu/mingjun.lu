'use client';

import clsx from 'clsx';
import MoonSvg from 'public/moon.svg';
import SunSvg from 'public/sun.svg';
import { useTheme } from 'src/hooks';
import { isDarkMode } from 'src/utils/theme';
import styles from './theme-toggle.module.scss';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-label="開啟深色模式"
      aria-checked={theme && isDarkMode(theme)}
      onClick={toggleTheme}
      className={styles.container}
    >
      {/* Presence controlled by CSS display property */}
      <MoonSvg className={clsx('moon-icon', styles.moonIcon)} />
      <SunSvg className={clsx('sun-icon', styles.sunIcon)} />
    </button>
  );
}
