import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AnimatedLabel from "../Components/Helpers/AnimatedLabel";
import { LoaderContext } from "../Loader";

const { width, height } = Dimensions.get("window");

const MAX = 200;

const Home = () => {
  const { settings } = useContext(LoaderContext);

  const theme = settings.others.theme === "light";

  const themeColors = {
    color: theme ? "#121212" : "#c1c1c1",
    backgroundColor: theme ? "#f1f1f1" : "#212121",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
      justifyContent: "space-between",
    },
    header: {
      width,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: themeColors.color,
    },
    incdicatorContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const [stressLevel, setStressLevel] = useState(0);

  const posY = useSharedValue(0);

  const fn = {
    setNewLevel: (value) => {
      setStressLevel(parseInt(Math.abs(value / MAX) * 100));
    },
  };

  const interpolateColor = (value, inputArray, outputArray) => {
    "worklet";
    const r = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.r)
    );
    const g = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.g)
    );
    const b = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.b)
    );
    const a = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.a)
    );
    return `rgba(${r},${g},${b},${a})`;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = posY.value;
    },
    onActive: ({ translationY }, ctx) => {
      if (ctx.y + translationY > 0) {
        posY.value = 0;
      } else if (ctx.y + translationY < -MAX) {
        posY.value = -MAX;
      } else {
        posY.value = ctx.y + translationY;
      }
    },
    onEnd: () => {
      runOnJS(fn.setNewLevel)(posY.value);
    },
  });

  const level = useDerivedValue(() => {
    const per = parseInt(
      interpolate(posY.value, [0, -MAX], [0, 100])
    ).toString();
    return per + "%";
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      height: interpolate(posY.value, [0, -MAX], [0, 100]) + "%",
      backgroundColor: interpolateColor(
        posY.value,
        [-MAX, -MAX / 2, 0],
        [
          { r: 255, g: 0, b: 0, a: 1 },
          { r: 255, g: 255, b: 0, a: 1 },
          { r: 0, g: 255, b: 0, a: 1 },
        ]
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>How much stressed are you?</Text>
      </View>
      <View style={styles.incdicatorContainer}>
        <AnimatedLabel text={level} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={{
              width: 60,
              height: MAX,
              borderColor: "black",
              borderWidth: 2,
              justifyContent: "flex-end",
            }}
          >
            <Animated.View style={containerStyle}></Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={styles.reconCont}>
        <Text>{stressLevel}</Text>
      </View>
    </View>
  );
};

export default Home;
