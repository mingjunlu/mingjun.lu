import { ColorMode } from 'src/hooks/use-theme';

export function applyThemeOnFirstLoad() {
  document.documentElement.setAttribute(
    'data-theme',
    getInitialTheme()
  );

  function getInitialTheme(): NonNullable<ColorMode> {
    const persistedPreference = document.cookie
      .split('; ')
      .find(function (text) {
        return text.startsWith('theme=');
      });
    if (persistedPreference) {
      const theme = persistedPreference.split('=')[1];
      const isValidTheme = theme === 'light' || theme === 'dark';
      if (isValidTheme) {
        return theme; // User-preferred theme
      }
    }
    const mediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    if (typeof mediaQueryList.matches === 'boolean') {
      return mediaQueryList.matches ? 'dark' : 'light'; // System-preferred theme
    }
    return 'light'; // Default theme
  }
}
