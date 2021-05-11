import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedProps,
  interpolate,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const R = 50;
const W = 10;

const RoundChart = ({ values, colors, style }) => {
  if (!values) values = [0.9, 0.8, 0.5, 0.1];
  const thetas = values.map((value, i) => {
    return {
      theta: value === 1 ? value * Math.PI * 1.98 : value * Math.PI * 2,
      color: colors?.[i] ? colors[i] : "lightblue",
    };
  });

  return (
    <View style={[styles.roundCont, style]}>
      <Svg width={200} height={200} viewBox="-5 -5 115 115">
        {thetas.map(({ theta, color }, i) => {
          return (
            <RoundChartPath key={i} theta={theta} index={i} color={color} />
          );
        })}
      </Svg>
    </View>
  );
};

const createArc = (posx, posy, radius = R, angle) => {
  "worklet";
  const x1 = posx + Math.cos(angle - Math.PI / 2) * radius + W / 2;
  const y1 = posy + Math.sin(angle - Math.PI / 2) * radius;
  const x2 = posx + Math.cos(angle - Math.PI / 2) * (radius - W) + W / 2;
  const y2 = posy + Math.sin(angle - Math.PI / 2) * (radius - W);
  const x3 = posx + Math.cos(-Math.PI / 2) * (radius - W) + W / 2;
  const y3 = posy + Math.sin(-Math.PI / 2) * (radius - W);
  const x0 = posx + Math.cos(-Math.PI / 2) * radius + W / 2;
  const y0 = posy + Math.sin(-Math.PI / 2) * radius;
  return `
        M ${x0} ${y0}
        A ${radius} ${radius} 0 ${angle > Math.PI ? "1" : "0"} 1 ${x1} ${y1}
        A ${W / 2} ${W / 2} 0 0 1 ${x2} ${y2}
        A ${radius - W} ${radius - W} 0 ${
    angle > Math.PI ? "1" : "0"
  } 0 ${x3} ${y3}
        A ${W / 2} ${W / 2} 0 0 1 ${x0} ${y0}
    `;
};

const RoundChartPath = ({ theta, index, color }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2500 });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      d: createArc(
        50,
        50,
        R - W * index,
        interpolate(progress.value, [0, 1], [0, theta])
      ),
    };
  });

  return <AnimatedPath animatedProps={animatedProps} fill={color} />;
};

export default RoundChart;

const styles = StyleSheet.create({
  roundCont: {
    borderRadius: 10,
  },
});
