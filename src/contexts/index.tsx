import { createContext } from 'react';
import useTheme from 'src/hooks/use-theme';

type ThemeContextType = ReturnType<typeof useTheme>;

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setColorMode: () => {},
});
