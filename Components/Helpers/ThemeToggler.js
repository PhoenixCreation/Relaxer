import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";

const ThemeToggler = ({
  value,
  onChange,
  duration,
  boxStyle,
  sunColor,
  moonColor,
}) => {
  // Convert in form of CheckBox where
  // light === true
  // dark === false
  if (value === "light") {
    value = true;
  } else if (value === "dark") {
    value = false;
  } else {
    // Throw custom error for invalie value
    throw `Please provide only "dark" or "light" as a value`;
  }

  // Duration of transition
  const TIMER_CONFIG = {
    duration: duration ? duration : 1000,
  };

  // Progress value to drive animations
  const progress = useSharedValue(value ? 0 : 1);

  // Default container(box) style
  const styles = StyleSheet.create({
    container: {
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: "#2155ff",
      padding: 5,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  // Each time state is changed
  const changeState = () => {
    if (value) {
      // from light to dark
      progress.value = withTiming(1, TIMER_CONFIG);
      onChange("dark");
    } else {
      // from dark to light
      progress.value = withTiming(0, TIMER_CONFIG);
      onChange("light");
    }
  };

  // rotate from 0 to 360 deg as per progress
  const roateAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: interpolate(progress.value, [0, 1], [0, 360]) + "deg" },
      ],
    };
  });

  // Styling of sun(opacity and scale)
  const sunStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.7, 1], [1, 0, 0]),
      transform: [
        {
          scale: interpolate(
            progress.value,
            [0, 0.4, 0.6, 1],
            [1, 0.3, 0.3, 1]
          ),
        },
      ],
    };
  });

  // Styling of moon(opacity and scale)
  const moonStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 0.3, 1], [0, 0, 1]),
      transform: [
        {
          scale: interpolate(
            progress.value,
            [0, 0.4, 0.6, 1],
            [1, 0.3, 0.3, 1]
          ),
        },
      ],
    };
  });

  return (
    <Pressable style={[styles.container, boxStyle]} onPress={changeState}>
      <Animated.View style={[{ flex: 1, width: "100%" }, roateAnimation]}>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            sunStyle,
          ]}
        >
          <SunSvg color={sunColor} />
        </Animated.View>
        <Animated.View
          style={[
            { position: "absolute", width: "100%", height: "100%" },
            moonStyle,
          ]}
        >
          <MoonSvg color={moonColor} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const MoonSvg = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ position: "absolute" }}
      {...props}
    >
      <Path
        d="M54.24 31.27l-5.1 2.68.97-5.67-4.12-4.02 5.7-.83 2.55-5.16 2.55 5.16 5.7.83-4.13 4.02.98 5.67-5.1-2.68zM67.7 47.09l-3.25 1.71.62-3.62-2.63-2.57 3.64-.52 1.62-3.3 1.63 3.3 3.64.52-2.64 2.57.63 3.62-3.26-1.71z"
        fill={props.color ? props.color : "#fff"}
      />
      <Path
        d="M88 65.11A40 40 0 1133.42 12.3 40 40 0 0088 65.11z"
        fill={props.color ? props.color : "#fff"}
      />
    </Svg>
  );
};

const SunSvg = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      style={{ position: "absolute" }}
    >
      <G fill={props.color ? props.color : "#fff"}>
        <Circle cx={50} cy={49.999} r={19.2} />
        <Path
          d="M50 9.501v8.1M21.363 21.363l5.726 5.729M9.502 49.999l8.1.001M21.363 78.637l5.729-5.728M50 90.499v-8.102M78.637 78.637l-5.729-5.728M90.498 50.001h-8.1M78.637 21.363l-5.729 5.729"
          stroke={props.color ? props.color : "#fff"}
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
};

export default ThemeToggler;
