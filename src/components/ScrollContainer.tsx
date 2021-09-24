import React from 'react';
import {StyleSheet, ScrollView, StyleProp, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

type ScrollContainerProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
const ScrollContainer = ({children, style}: ScrollContainerProps) => {
  const {colors} = useTheme();

  const myStyle = [
    styles.container,
    style,
    {backgroundColor: colors.background},
  ];

  return (
    <ScrollView
      contentContainerStyle={myStyle}
      horizontal={false}
      endFillColor="white">
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
