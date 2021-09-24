import {NavBar, Container, ScrollContainer} from '@components';
import React, {Fragment} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {List, Divider, Text, useTheme, Switch} from 'react-native-paper';
import colors from '../helpers/colors';
import {settingsData} from '../helpers/data';
import {useSelector, useDispatch} from 'react-redux';
import {
  switchSystemTheme,
  toggleTheme,
  toggleBiometricLogin,
} from '../store/action';

const SettingsScreen = () => {
  const themeColor = useTheme();
  const {isDark, isSystemTheme, isBiometric} = useSelector(
    state => state.app_store,
  );
  console.log(isBiometric);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleUseSystemTheme = () => {
    dispatch(switchSystemTheme());
  };
  const handleBiometricToggle = () => {
    dispatch(toggleBiometricLogin());
  };

  const RenderList = ({item}) => (
    <Fragment>
      <List.Item
        title={item.title}
        style={styles.list}
        titleStyle={{fontSize: 20, textTransform: 'capitalize'}}
        left={props => (
          <List.Icon
            {...props}
            color={themeColor.colors.text}
            icon={item.icon}
            style={styles.icons}
          />
        )}
      />
      <Divider />
    </Fragment>
  );

  return (
    <Fragment>
      <NavBar center="Settings" />
      <Container>
        {settingsData.map((item, key) => (
          <RenderList item={item} key={key} />
        ))}
        <View style={[styles.themeToggle, {marginTop: 20}]}>
          <Text style={{fontSize: 22}}>System Default Theme</Text>
          <Switch
            onValueChange={handleUseSystemTheme}
            value={isSystemTheme}
            color={colors.primary}
          />
        </View>
        <Divider />
        <View style={styles.themeToggle}>
          <Text style={{fontSize: 22}}>Dark Theme</Text>
          <Switch
            color={colors.primary}
            onValueChange={handleThemeToggle}
            value={isDark}
            disabled={isSystemTheme}
          />
        </View>
        <Divider />
        <View style={styles.themeToggle}>
          <Text style={{fontSize: 22}}>Enable Fingerprint Login</Text>
          <Switch
            color={colors.primary}
            onValueChange={handleBiometricToggle}
            value={isBiometric}
          />
        </View>
      </Container>
    </Fragment>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  list: {
    height: 70,
  },
  icons: {
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
});
