import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
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

  const [current, setCurrent] = useState(null);

  return (
    <Pressable
      style={[styles.roundCont, style]}
      onPress={() => setCurrent(null)}
    >
      <Svg width={200} height={200} viewBox="-5 -5 115 115">
        {thetas.map((crnt, i) => {
          return (
            <RoundChartPath
              key={i}
              theta={crnt.theta}
              index={i}
              color={crnt.color}
              opacity={current ? (current === values[i] ? 1 : 0.4) : 1}
              category={values[i]}
              setCurrent={setCurrent}
            />
          );
        })}
      </Svg>
      <Text style={styles.currentVal}>
        {current ? `${current * 100}%` : null}
      </Text>
    </Pressable>
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

const RoundChartPath = ({
  theta,
  index,
  color,
  opacity,
  setCurrent,
  category,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(1, { duration: 2500 });
    }, 1000);
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

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={color}
      opacity={opacity}
      onPress={() => setCurrent(category)}
    />
  );
};

export default RoundChart;

const styles = StyleSheet.create({
  roundCont: {
    borderRadius: 10,
    backgroundColor: "#313131",
    marginRight: 10,
    justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
  },
  currentVal: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
