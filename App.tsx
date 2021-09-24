import React, {useEffect} from 'react';
import {StatusBar, useColorScheme,LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import StackNavigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import lightTheme from './src/config/light_theme';
import darkTheme from './src/config/dark_theme';
import {UserContextProvider} from './src/context/AuthContext';
import {useSelector, useDispatch} from 'react-redux';
import Auth from './src/service/Auth';
import {setEmailVerify} from './src/store/action';


export default function App() {
  const {isDark, isSystemTheme, isEmailVerified} = useSelector(
    (state: any) => state.app_store,
  );
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const isDarkTheme = () => {
    let theme = false;
    if (isSystemTheme) {
      if (colorScheme === 'dark') {
        theme = true;
      } else {
        theme = false;
      }
    } else if (isDark) {
      theme = true;
    }

    return theme;
  };

  const checkVerifyStatus = async () => {
    const isVerified = await Auth.checkEmailVerifyStatus();
    console.log('fire',isVerified)
    console.log(isEmailVerified)
    if (!isEmailVerified && isVerified) {
      dispatch(setEmailVerify());
    }
  };

  useEffect(() => {
    checkVerifyStatus();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const theme = isDarkTheme() ? darkTheme : lightTheme;
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={isDarkTheme() ? 'light-content' : 'dark-content'}
          />
          <StackNavigation />
        </PaperProvider>
      </SafeAreaProvider>
    </UserContextProvider>
  );
}
