import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

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
        // {
        //   rotate: interpolate(progress.value, [0, 1], [180 * index, 0]) + "deg",
        // },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
        },
        circleStyle,
      ]}
    >
      <View
        style={
          {
            //   borderWidth: 1,
            //   borderColor: "red",
          }
        }
      >
        <Svg height={SIZE} width={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <Circle r={SIZE / 2} cx={SIZE / 2} cy={SIZE / 2} fill="#009ca044" />
        </Svg>
      </View>
    </Animated.View>
  );
};

// #00BFA1
// #009CA0

export default FlowerLeaves;

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
    opacity: 0.6,
  },
});
