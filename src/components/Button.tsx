import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';

type Prop = {
  title: String;
  onPress?: () => void;
  isLoading?: boolean;
};

const CustomBtn = ({title, onPress, isLoading}: Prop) => {
  return (
    <Button
      style={styles.btn}
      onPress={onPress}
      mode="contained"
      loading={isLoading}
      disabled={isLoading}
      labelStyle={{textTransform: 'uppercase', fontSize: 20}}>
      {title}
    </Button>
  );
};

export default CustomBtn;
const styles = StyleSheet.create({
  btn: {
    marginTop: 40,
    marginBottom: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
