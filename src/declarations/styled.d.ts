import { Dispatch, SetStateAction } from 'react';
import 'styled-components';
import { ColorMode } from 'src/pages/_app.page';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorMode: ColorMode;
    setColorMode: Dispatch<SetStateAction<ColorMode>>;
  }
}
