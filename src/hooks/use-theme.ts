'use client';

import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';
import { Theme, isDarkMode, isValidTheme } from 'src/utils/theme';

export default function useTheme() {
  const [themeValue, setThemeValue] = useState<Theme>();

  const valueToReturn = useMemo(() => {
    const synchronizeTheme = (theme: Theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      Cookies.set('theme', theme, {
        expires: 30, // Days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
    };
    return {
      theme: themeValue,
      isDarkMode: isDarkMode(themeValue),
      setTheme(theme: Theme) {
        setThemeValue(theme);
        synchronizeTheme(theme);
      },
      toggleTheme() {
        if (!isValidTheme(themeValue)) {
          return;
        }
        const newTheme = isDarkMode(themeValue) ? 'light' : 'dark';
        setThemeValue(newTheme);
        synchronizeTheme(newTheme);
      },
    };
  }, [themeValue]);

  useEffect(() => {
    const value = document.documentElement.getAttribute('data-theme');
    setThemeValue(isValidTheme(value) ? value : 'light');
  }, []);

  return valueToReturn;
}
