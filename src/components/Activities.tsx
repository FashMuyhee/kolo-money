import {StyleSheet} from 'react-native';
import {List, useTheme} from 'react-native-paper';
import colors from '../helpers/colors';
import React from 'react';

const Activities = ({item}) => {
  const theme = useTheme();

  return (
    <List.Item
      title={item.title}
      description={item.desc}
      style={styles.list}
      titleStyle={{
        fontSize: 20,
        textTransform: 'capitalize',
      }}
      left={props => (
        <List.Icon
          {...props}
          color={theme.colors.text}
          icon="cash-multiple"
          style={styles.icons}
        />
      )}
    />
  );
};

export default Activities;

const styles = StyleSheet.create({
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
