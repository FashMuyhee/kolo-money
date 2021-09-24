import {DarkTheme, configureFonts, Colors} from 'react-native-paper';

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
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: '#0d60d8',
    secondary: '#ff6300',
    white: 'white',
    grey: '#d2d2d2',
    // background: '#21254f',
    background: Colors.grey900,
    background_2: Colors.grey900,
  },
  fonts: configureFonts(fontConfig),
  roundness: 10,
  animation: {
    scale: 1.0,
  },
};

export default theme;
