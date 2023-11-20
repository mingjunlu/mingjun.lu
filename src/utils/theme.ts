export function isValidTheme(value: unknown): value is 'light' | 'dark' {
  return value === 'light' || value === 'dark';
}

export function isDarkMode(theme: unknown): theme is 'dark' {
  return theme === 'dark';
}
