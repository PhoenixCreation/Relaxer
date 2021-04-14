import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const SIZE = 150;

const FlowerLeaves = ({ index, progress }) => {
  const theta = (index * 2 * Math.PI) / 6;
  const x = (SIZE / 2) * Math.cos(theta);
  const y = (SIZE / 2) * Math.sin(theta);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [0, x]) },
        { translateY: interpolate(progress.value, [0, 1], [0, y]) },
        { scale: interpolate(progress.value, [0, 1], [0.3, 1]) },
      ],
    };
  });

  const borderChanger = useAnimatedStyle(() => {
    return {
      borderRadius: interpolate(progress.value, [0, 1], [0, SIZE]),
    };
  });
  return (
    <Animated.View style={[{ position: "absolute" }, circleStyle]}>
      <LinearGradient colors={["#00BFA1", "#009CA0"]} style={styles.circle} />
      {/* <Animated.View style={[styles.circle, borderChanger]} /> */}
    </Animated.View>
  );
};

export default FlowerLeaves;

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    backgroundColor: "#00BFA1",
    opacity: 0.4,
  },
});
