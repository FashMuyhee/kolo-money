import React from 'react';
import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

type ContainerProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({children, style}) => {
  const {colors} = useTheme();
  const myStyle = [
    styles.container,
    style,
    {backgroundColor: colors.background_2},
  ];

  return (
    <SafeAreaView mode="padding">
      <View style={myStyle}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '7%',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
});
