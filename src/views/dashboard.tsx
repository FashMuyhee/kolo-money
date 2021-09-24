import {
  NavBar,
  ScrollContainer,
  Activities,
  ActivityModal,
  EmailVerifyNotice,
} from '@components';
import React, {Fragment, useEffect, useState} from 'react';
import {View, StyleSheet,TouchableWithoutFeedback} from 'react-native';
import {Text, Avatar, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import Auth from '../service/Auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import colors from '../helpers/colors';
import {FlatList} from 'react-native-gesture-handler';
import save from '../assets/images/save.jpg';
import {recentActivities} from '../helpers/data';
import defaultUser from '../assets/images/user.png';
import {useSelector} from 'react-redux';
import {StackParamList} from '../navigation/param-list'
import {StackNavigationProp} from '@react-navigation/stack';

type HomeNavigationProp = StackNavigationProp<StackParamList, 'login'>;

type Props = {
  navigation: HomeNavigationProp;
};

const DashboardScreen:React.FC<Props> = ({navigation}) => {
  const [user, setUser] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined | null
  >(null);

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const {user: storeUser} = useSelector(state => state.app_store);
  console.log(storeUser);

  const loadUser = async () => {
    setLoading(true);
    const data = await Auth.getUser();
    console.log(data)
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
        center="Dashboard"
        right={
          <Icon
            name="log-out"
            color={theme.colors.text}
            size={30}
            onPress={() => Auth.handelLogout()}
          />
        }
      />
      <ScrollContainer>
        <View style={styles.heading}>
          <View>
            <Text style={styles.welcomeText}>Welcome To Kolo Money</Text>
            <Text style={styles.welcomeText}>{user?.fname}</Text>
          </View>
          <TouchableWithoutFeedback onPress={()=>navigation.navigate({name:'profile',params:{}})}>
          <Avatar.Image
            source={user?.dpLink ? {uri: user.dpLink} : defaultUser}
            size={80}
          />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.card}>
          <Avatar.Image source={save} size={150} />
          <View style={{marginRight: 20}}>
            <Text style={[styles.welcomeText, {color: 'white'}]}>
              Total Savings
            </Text>
            <Text style={styles.money}>{'\u20A6'}20,0000</Text>
          </View>
        </View>
        <Text style={{fontSize: 20}}>Recent Activities</Text>
        <FlatList
          data={recentActivities.slice(3, 9)}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Activities item={item} />}
          contentContainerStyle={{marginTop: 10}}
        />
      </ScrollContainer>
      <EmailVerifyNotice />
    </Fragment>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  navTittle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
  },
  welcomeText: {
    fontSize: 23,
    fontFamily: 'Futura-Bold',
  },
  card: {
    backgroundColor: colors.primary,
    height: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: '5%',
  },
  money: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  list: {
    height: 75,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  icons: {
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
});
