import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import validateEmail from '../helpers/validateEmail';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {saveUserCredentials} from './Biometric';

class AuthService {
  handleSignIn = async (email: string, password: string) => {
    if (!email || !password) {
      return {isError: true, msg: 'All Field are required'};
    }

    if (validateEmail(email)) {
      if (password.length >= 8) {
        try {
          let response = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          if (response) {
            saveUserCredentials({uid: email, password});
            return {msg: 'Login Successful', isError: false};
          }
        } catch (e) {
          if (e.code === 'auth/network-request-failed') {
            return {msg: 'Something went wrong, Try Again!!', isError: true};
          } else if (e.code === 'auth/wrong-password') {
            return {msg: 'Password Incorrect', isError: true};
          } else if (e.code === 'auth/user-not-found') {
            return {msg: 'User not found', isError: true};
          }
        }
      } else {
        return {
          isError: true,
          msg: 'Password Too Short, must be at least 8 characters ',
        };
      }
    } else {
      return {isError: true, msg: 'Invalid Email'};
    }
  };

  handleSignUp = async (
    email: string,
    fname: string,
    address: string,
    lname: string,
    password: string,
    phone: string,
  ) => {
    if (!email || !password || !fname || !lname || !address || !phone) {
      return {isError: true, msg: 'All Field are required'};
    }

    if (validateEmail(email)) {
      if (password.length >= 8) {
        try {
          let response = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          if (response) {
            const update = {
              displayName: `${fname} ${lname}`,
            };
            await auth().currentUser.updateProfile(update);
            try {
              await firestore()
                .collection('customers')
                .doc(response.user.uid)
                .set({
                  fname,
                  email,
                  address,
                  lname,
                  phone,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  _id: response.user.uid,
                  dp: null,
                });
              await auth().currentUser?.sendEmailVerification();
              return {
                msg: 'An Email Verification Link has been sent to your mail',
                isError: false,
              };
              // saveUserCredentials({uid: email, password});
            } catch (error) {
              console.log(error.message);
              return {
                isError: true,
                msg: 'Something went wrong try again ',
              };
            }
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        return {
          isError: true,
          msg: 'Password Too Short, must be at least 8 characters ',
        };
      }
    } else {
      return {isError: true, msg: 'Invalid Email'};
    }
  };

  handelLogout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
      // return {isError: true, msg: 'Invalid Email'};
    }
  };

  handleVerifyPhone = async (
    confirm: FirebaseAuthTypes.PhoneAuthSnapshot,
    code: string,
  ) => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let userData = await auth().currentUser.linkWithCredential(credential);
    } catch (error) {
      console.log(erorr);
    }
  };

  handleUploadDp = async (fileName: string, filePath: string) => {
    try {
      const user = auth().currentUser?.uid;
      const res = await storage().ref(fileName).putFile(filePath);
      await firestore().collection('customers').doc(user).update({
        dp: fileName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getProfileImage = async (imageName: string) => {
    try {
      const res = await storage()
        .ref('/' + imageName)
        .getDownloadURL();
      return res;
    } catch (error) {
      if ((error.code = 'storage/object-not-found')) {
        return null;
      }
      console.log(error);
    }
  };

  getUser = async () => {
    try {
      const user = auth().currentUser?.uid;
      const docRef = firestore().collection('customers').doc(user);
      const isExist = await docRef.get();
      if (isExist.exists) {
        const data = isExist.data();
        const dp = await this.getProfileImage(data?.dp);
        const profile = {...data, dpLink: dp};
        return profile;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkEmailVerifyStatus = async () => {
    try {
      const verified = auth().currentUser?.emailVerified;
      return verified;
    } catch (error) {
      console.log(error);
    }
  };

  sendEmailVerify = async () => {
    try {
      const verified = await auth().currentUser?.sendEmailVerification();
      return verified;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AuthService();
