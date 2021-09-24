import React, {useState, useContext} from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';
import {StackParamList} from '../navigation/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import {Container, CustomBtn} from '@components';
import colors from '../helpers/colors';
import {Text} from 'react-native-paper';
import AuthService from '../service/Auth';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {UserContext} from '../context/AuthContext';

type UploadDpNavigationProp = StackNavigationProp<StackParamList, 'upload'>;

type Props = {
  navigation: UploadDpNavigationProp;
};

type SelectedImage = {
  mime: string;
  uri: string;
};
const UploadDpScreen: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<SelectedImage>({
    mime: '',
    uri: '',
  });

  const user = useContext(UserContext);

  const handleCamera = async () => {
    const res = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
    setImg({uri: res?.path, mime: res?.mime});
  };
  const handleUpload = async () => {
    setLoading(true);
    const fileExt = img?.mime.split('/')[1];
    const fileName = `${user?.uid}.${fileExt}`;
    const file =
      Platform.OS === 'ios' ? img?.uri.replace('file://', '') : img?.uri;
    await AuthService.handleUploadDp(fileName, file);
    await AuthService.sendEmailVerify();

    // Snackbar.show({text: res?.msg, duration: Snackbar.LENGTH_LONG});
    navigation.navigate({name: 'home', params: {}});
    setLoading(false);
  };

  return (
    <Container>
      <View style={styles.regForm}>
        <Text style={styles.pageTitle}>Upload a Profile Image To Continue</Text>
        <View style={styles.imageWrapper}>
          {!img?.uri ? (
            <Icon
              name="camera"
              color={colors.primary}
              size={40}
              onPress={handleCamera}
            />
          ) : (
            <>
              <Image source={{uri: img.uri}} style={styles.selectedImg} />
              <Icon
                name="camera"
                color={colors.primary}
                size={40}
                onPress={handleCamera}
              />
            </>
          )}
        </View>
        <CustomBtn
          title="Upload Image"
          isLoading={loading}
          onPress={handleUpload}
        />
        <Text
          style={{color: colors.primary, textAlign: 'center',fontSize:20}}
          onPress={() => navigation.goBack()}>
          Back
        </Text>
      </View>
    </Container>
  );
};

export default UploadDpScreen;
const styles = StyleSheet.create({
  regForm: {
    height: '50%',
    marginTop: '30%',
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    marginBottom: '2%',
    alignSelf: 'center',
  },
  imageWrapper: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.grey,
    height: 400,
    width: '80%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  selectedImg: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: 'center',
  },
});
