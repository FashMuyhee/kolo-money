import React from 'react';
import {View, StyleSheet, Image, StyleProp, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import logo from '../assets/images/logo.png';
import colors from '../helpers/colors';

type Prop = {
  title: String;
  extraStyle?: StyleProp<ViewStyle>;
};

const WelcomeTitle = ({title, extraStyle}: Prop) => {
  return (
    <View style={[styles.welcomeTitle, extraStyle]}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default WelcomeTitle;
const styles = StyleSheet.create({
  welcomeTitle: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderWidth: 1,
    marginBottom: 10,
  },
  title: {
    color: colors.primary,
    fontSize: 30,
  },
});
