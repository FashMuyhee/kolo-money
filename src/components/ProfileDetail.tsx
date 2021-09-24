import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../helpers/colors';

type Prop = {
  content: string;
  icon: string;
};

const ProfileDetail = ({content, icon}: Prop) => {
  return (
    <View style={styles.profileDetail}>
      <Icon name={icon} color={colors.primary} size={30} style={styles.icon} />
      <Text style={{fontSize:19}}>{content}</Text>
    </View>
  );
};

export default ProfileDetail;
const styles = StyleSheet.create({
  profileDetail: {
    height: 80,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    marginHorizontal: 15,
  },
});
