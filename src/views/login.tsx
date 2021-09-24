import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackParamList} from '../navigation/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container, WelcomeTitle, CustomBtn} from '@components';
import {Text, TextInput} from 'react-native-paper';
import colors from '../helpers/colors';
import AuthService from '../service/Auth';
import Snackbar from 'react-native-snackbar';
import {
  checkSensor,
  authenticateBiometric,
  getCredentials,
} from '../service/Biometric';
import {useSelector, useDispatch} from 'react-redux';

type LoginNavigationProp = StackNavigationProp<StackParamList, 'login'>;

type Props = {
  navigation: LoginNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometryType, setBiometryType] = useState(false);
  const {isBiometric} = useSelector(state => state.app_store);

  const handleLogin = async () => {
    setLoading(true);
    const res = await AuthService.handleSignIn(email, password);
    Snackbar.show({text: res?.msg, duration: Snackbar.LENGTH_LONG});
    setLoading(false);
  };

  const checkSensorIsAvailable = async () => {
    const sensor = await checkSensor();
    setBiometryType(sensor);
  };

  const handleFingerPrintLogin = async () => {
    const isAuth = await authenticateBiometric(biometryType);
    if (isAuth) {
      const credentials = await getCredentials();
      if ((credentials?.username.length && credentials?.password.length) > 0)
        try {
          setLoading(true);
          const res = await AuthService.handleSignIn(
            credentials.username,
            credentials.password,
          );
          if (res) {
            Snackbar.show({text: 'Login Successful'});
            setLoading(false);
          }
        } catch (e) {
          console.error(e.message);
          setLoading(false);
        }
    }
  };

  useEffect(() => {
    checkSensorIsAvailable();
  }, []);

  return (
    <Container>
      <WelcomeTitle
        title="Welcome, Login to continue"
        extraStyle={{marginTop: '30%'}}
      />
      <View style={styles.loginForm}>
        <TextInput
          label="Email"
          style={styles.input}
          left={<TextInput.Icon color={colors.primary} name="email" />}
          onChangeText={setEmail}
          value={email}
          mode="outlined"
          disabled={loading}
        />
        <TextInput
          value={password}
          disabled={loading}
          onChangeText={setPassword}
          label="Password"
          style={styles.input}
          secureTextEntry
          left={<TextInput.Icon name="lock" color={colors.primary} />}
          right={
            <TextInput.Icon
              name="fingerprint"
              color={colors.primary}
              onPress={handleFingerPrintLogin}
              disabled={!isBiometric}
            />
          }
          mode="outlined"
        />
        <CustomBtn title="login" onPress={handleLogin} isLoading={loading} />
        <Text
          onPress={() => navigation.navigate({name: 'register', params: {}})}
          style={styles.linkText}>
          Don't Have an Account Yet ? Register
        </Text>
      </View>
    </Container>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  loginForm: {
    height: '50%',
    marginTop: '20%',
  },
  input: {
    marginTop: 15,
    marginBottom: 25,
    height: 60,
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 20,
  },
});
