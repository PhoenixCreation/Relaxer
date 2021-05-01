import React from "react";
import { StyleSheet, TextInput } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedLabel = ({ text, style }) => {
  const styles = StyleSheet.create({
    baseStyle: {
      color: "black",
    },
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
    };
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      value={text.value}
      style={[styles.baseStyle, style]}
      {...{ animatedProps }}
    />
  );
};

export default AnimatedLabel;
