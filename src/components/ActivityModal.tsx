import React from 'react';
import {StyleSheet, Modal, ActivityIndicator, View} from 'react-native';
import colors from '../helpers/colors';
import {useTheme} from 'react-native-paper';

type CameralModal = {
  isLoading: boolean;
};

const ActivityModal: React.FC<CameralModal> = ({isLoading}) => {
  const theme = useTheme().colors;
  return (
    <Modal visible={isLoading} animationType="slide" transparent>
      <View style={{backgroundColor: theme.background}}>
        <ActivityIndicator
          animating
          color={colors.primary}
          size={50}
          style={styles.loader}
        />
      </View>
    </Modal>
  );
};

export default ActivityModal;

const styles = StyleSheet.create({
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
});
