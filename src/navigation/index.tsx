import React, {Fragment, useContext} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Welcome, LoginScreen, RegisterScreen, UploadDpScreen,Profile} from '../views';
import {NavigationContainer} from '@react-navigation/native';
import {StackParamList} from './param-list';
import TabNav from './tab';
import {UserContext} from '../context/AuthContext';

const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const user = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="login"
        mode="card"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {!user ? (
          <Fragment>
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="home" component={TabNav} />
            <Stack.Screen name="upload" component={UploadDpScreen} />
            <Stack.Screen name="profile" component={Profile} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
