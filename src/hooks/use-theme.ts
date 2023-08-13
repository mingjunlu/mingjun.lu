import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';

export type ColorMode = 'light' | 'dark' | undefined;

export default function useTheme() {
  const [colorMode, setColorMode] = useState<ColorMode>();
  const theme = useMemo(() => {
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode]);

  useEffect(() => {
    const root = document.documentElement;
    const isFirstLoad = colorMode === undefined;
    if (isFirstLoad) {
      const theme = root.getAttribute('data-theme');
      if (isValidTheme(theme)) {
        setColorMode(theme);
      }
    } else {
      root.setAttribute('data-theme', colorMode);
      Cookies.set('theme', colorMode, {
        expires: 30, // Days
        sameSite: 'strict',
        secure: true,
      });
    }
  }, [colorMode]);

  return theme;
}

function isValidTheme(
  value: unknown
): value is NonNullable<ColorMode> {
  return value === 'light' || value === 'dark';
}
