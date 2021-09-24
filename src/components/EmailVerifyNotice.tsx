import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import colors from '../helpers/colors';
import {useSelector} from 'react-redux';
import Auth from '../service/Auth';

const EmailVerifyNotice = () => {
  const [visible, setVisible] = useState(false);

  const {isEmailVerified} = useSelector(state => state.app_store);

  const themeColor = useTheme().colors;

  const sendVerification = async () => {
    await Auth.sendEmailVerify();
    setVisible(false)
  };

  useEffect(() => {
    if (!isEmailVerified) {
      setVisible(true);
    }
  }, []);

  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View
          style={[styles.content, {backgroundColor: themeColor.background}]}>
          <Text style={styles.title}>Dear User</Text>
          <Text style={styles.message}>
           You have Verify your email address, 🙏🙏 please do that so you enjoy the full service of Kolo Money 😁😁.</Text>
          <View style={styles.btnFlex}>
            <Button
              mode="contained"
              contentStyle={styles.updateBtn}
              onPress={sendVerification}>
              Send Verification
            </Button>
            <Button
              style={{marginLeft: 15}}
              onPress={() => setVisible(false)}
              mode="contained"
              contentStyle={styles.noBtn}>
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmailVerifyNotice;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    backgroundColor: 'white',
    width: '95%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: colors.primary,
    height: 180,
  },
  title: {
    color: colors.primary,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  updateBtn: {
    backgroundColor: 'green',
  },
  noBtn: {
    backgroundColor: 'red',
  },
  btnFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
});
