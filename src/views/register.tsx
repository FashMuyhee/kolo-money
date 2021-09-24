import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackParamList} from '../navigation/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container, WelcomeTitle, CustomBtn} from '@components';
import colors from '../helpers/colors';
import {TextInput, Text} from 'react-native-paper';
import AuthService from '../service/Auth';
import Snackbar from 'react-native-snackbar';
import SweetAlert from 'react-native-sweet-alert';
import {setEmailVerify} from '../store/action';
import {useDispatch} from 'react-redux';

type RegisterNavigationProp = StackNavigationProp<StackParamList, 'register'>;

type Props = {
  navigation: RegisterNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [fname, setFullname] = useState('');
  const [lname, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    setLoading(true);
    const res = await AuthService.handleSignUp(
      email,
      fname,
      address,
      lname,
      password,
      phone,
    );
    if (res?.msg) {
      Snackbar.show({
        text: res?.msg,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'ok',
          textColor: 'white',
          onPress: () => Snackbar.dismiss(),
        },
      });
      setLoading(false);
      return;
    }
    dispatch(setEmailVerify());
    SweetAlert.showAlertWithOptions({
      title: 'Account Verification has been sent to your email',
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#000',
      style: 'success',
      cancellable: true,
    });
    setLoading(false);
  };

  return (
    <Container>
      <WelcomeTitle
        title="Fill your Information"
        extraStyle={{marginTop: '10%'}}
      />
      <View style={styles.regForm}>
        <TextInput
          label="First Name"
          style={styles.input}
          left={<TextInput.Icon color={colors.primary} name="account" />}
          onChangeText={setFullname}
          value={fname}
          mode="outlined"
        />
        <TextInput
          value={lname}
          onChangeText={setUsername}
          label="Last Name"
          style={styles.input}
          left={<TextInput.Icon name="account" color={colors.primary} />}
          mode="outlined"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          label="Email"
          style={styles.input}
          left={<TextInput.Icon name="email" color={colors.primary} />}
          mode="outlined"
          keyboardType="email-address"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          label="Phone"
          style={styles.input}
          left={<TextInput.Icon name="phone" color={colors.primary} />}
          mode="outlined"
          keyboardType="phone-pad"
          placeholder="+2348038383223"
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          label="Address"
          style={styles.input}
          left={<TextInput.Icon name="google-maps" color={colors.primary} />}
          mode="outlined"
          multiline
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          label="Password"
          style={styles.input}
          secureTextEntry
          left={<TextInput.Icon name="lock" color={colors.primary} />}
          mode="outlined"
        />
        <CustomBtn
          title="Register"
          isLoading={loading}
          onPress={handleRegister}
        />
        <Text
          onPress={() => navigation.navigate({name: 'login', params: {}})}
          style={styles.linkText}>
          Already Have an Account ? Login
        </Text>
      </View>
    </Container>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  regForm: {
    height: '50%',
    marginTop: '10%',
  },
  input: {
    marginVertical: 10,
    height: 60,
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 20,
  },
});
