import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {StackParamList} from '../navigation/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container, ScrollContainer} from '@components';
import {Button, Text, useTheme} from 'react-native-paper';
import logo from '../assets/images/logo.png';
import colors from '../helpers/colors';

type WelcomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'welcome'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome = ({navigation}: Props) => {
  return (
    <ScrollContainer
      style={[styles.container, {backgroundColor: colors.white}]}>
      <Image source={logo} />
      <Text style={[styles.text, styles.textTitle]}>Kolo Money</Text>
      <View style={styles.subtitleWrapper}>
        <Text style={[styles.text, styles.textSubtitle]}>
          A Vehicle License Mobile Verification System
        </Text>
      </View>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.btn}
        labelStyle={styles.btnText}
        onPress={() => navigation.navigate({name: 'login', params: {}})}>
        Let's Get Started
      </Button>
    </ScrollContainer>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    color: 'white',
  },
  textTitle: {
    fontSize: 30,
    fontFamily: 'Futura-Bold',
    color: colors.primary,
  },
  textSubtitle: {
    fontSize: 23,
    textAlign: 'center',
    color: colors.primary,
  },
  subtitleWrapper: {
    width: '70%',
    marginVertical: '10%',
  },
  btn: {
    width: '80%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
  },
});
