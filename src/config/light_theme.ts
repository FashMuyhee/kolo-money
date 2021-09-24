import {DefaultTheme, configureFonts, Colors} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      white: string;
      grey: string;
      secondary: string;
      background_2: string;
    }
  }
}

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Futura',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Futura-Bold',
      fontWeight: '400',
    },
  },
};

const theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0d60d8',
    secondary: '#ff6300',
    white: 'white',
    grey: '#d2d2d2',
    background_2: Colors.grey200,
  },
  fonts: configureFonts(fontConfig),
  roundness: 10,
  animation: {
    scale: 1.0,
  },
};

export default theme;
