export type Theme = 'light' | 'dark';

export function isValidTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function isDarkMode(theme: unknown) {
  return theme === 'dark';
}
