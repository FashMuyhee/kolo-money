import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
type Prop = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center: string;
  customStyles?: StyleProp<ViewStyle>;
};

const NavBar = ({left, right, center, customStyles}: Prop) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.navbar,
        customStyles,
        {backgroundColor: colors.background},
      ]}>
      <View style={{alignItems: 'flex-start', width: '20%'}}>
        {left ? left : null}
      </View>
      <View style={{alignItems: 'center', width: '60%'}}>
        <Text style={[styles.navTitle, {color: colors.text}]}>{center}</Text>
      </View>
      <View style={{alignItems: 'flex-end', width: '20%'}}>
        {right ? right : null}
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    elevation: 1,
  },
  navbarItem: {
    width: '33.33%',
  },
  navTitle: {
    fontFamily: 'Futura-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
