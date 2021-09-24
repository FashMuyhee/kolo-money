import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen, TransactionsScreen, SettingsScreen} from '../views';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../helpers/colors';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.accent,
        activeBackgroundColor: theme.colors.background,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: theme.colors.background,
          height: '7%',
          borderTopColor: theme.colors.background,
        },
      }}>
      <Tab.Screen
        name="transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({color}) => <Icon2 name="cash-multiple" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
