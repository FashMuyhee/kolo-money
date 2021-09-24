import React, {useContext, Fragment, useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import avatar from '../assets/images/user.png';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../helpers/colors';
import {Container, NavBar, ProfileDetail, ActivityModal} from '@components';
import {Text, useTheme} from 'react-native-paper';
import {StackParamList} from '../navigation/param-list';
import {StackNavigationProp} from '@react-navigation/stack';
import Auth from '../service/Auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type ProfileNavigationProp = StackNavigationProp<StackParamList, 'profile'>;

type Props = {
  navigation: ProfileNavigationProp;
};

const Profile: React.FC<Props> = ({navigation}) => {
  const theme = useTheme().colors;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined | null
  >(null);

  const loadUser = async () => {
    setLoading(true);
    const data = await Auth.getUser();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return <ActivityModal isLoading={true} />;
  }
  return (
    <Fragment>
      <NavBar
        center="Profile"
        left={
          <Icon
            name="arrow-left"
            color={theme.text}
            size={30}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Container>
        <View style={styles.avatarWrap}>
          <Image
            source={user?.dpLink ? {uri: user.dpLink} : avatar}
            style={styles.avatar}
          />
          <Icon
            name="camera"
            color={colors.primary}
            size={40}
            onPress={() => navigation.navigate({name: 'upload', params: {}})}
          />
        </View>
        <ProfileDetail content={`${user?.fname} ${user?.lname}`} icon="user"/>
        <ProfileDetail content={user?.email} icon="mail"/>
        <ProfileDetail content={user?.phone} icon="phone"/>
        <ProfileDetail content={user?.address} icon="navigation"/>
      </Container>
    </Fragment>
  );
};

export default Profile;
const styles = StyleSheet.create({
  avatarWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    borderRadius: 250 / 2,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 20,
    marginRight: 20,
  },
});
