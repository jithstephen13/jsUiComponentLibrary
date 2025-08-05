import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import componentStyles from './components';

const direction = 'ltr';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'ksm'
};

export const themeStyles = {
  direction,
  ...foundations,
  config,
  ...componentStyles
};

export default extendTheme(themeStyles);
