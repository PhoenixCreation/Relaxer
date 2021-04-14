import React from "react";
import { StyleSheet, Text, View, Vibration, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Flower from "./Flower";

const { width, height } = Dimensions.get("window");

const SPRING_CONFIG = {
  damping: 5,
};

const Home = () => {
  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const scroll = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = touchX.value;
      ctx.y = touchY.value;
    },
    onActive: (event, ctx) => {
      touchX.value = ctx.x + event.translationX;
      touchY.value = ctx.y + event.translationY;
    },
    onEnd: () => {
      touchX.value = 0;
      touchY.value = 0;
      runOnJS(Vibration.vibrate)();
    },
  });

  const ballStyle = useAnimatedStyle(() => {
    const r = interpolate(scroll.value, [-50, 0, 500], [12, 255, 255]);
    const g = interpolate(scroll.value, [-50, 0, 500], [12, 0, 155]);
    const b = interpolate(scroll.value, [-50, 0, 500], [12, 0, 12]);
    return {
      width: 80,
      height: 80,
      borderRadius: 100,
      backgroundColor: `rgb(${r},${g},${b})`,
      transform: [
        { translateX: withSpring(touchX.value, SPRING_CONFIG) },
        { translateY: withSpring(touchY.value, SPRING_CONFIG) },
        { scale: interpolate(scroll.value, [-50, 0, 500], [0.9, 1, 1.6]) },
      ],
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scroll.value = event.contentOffset.y;
  });

  const scrollStyle = useAnimatedStyle(() => {
    const r = interpolate(scroll.value, [-50, 0, 500], [12, 255, 12]);
    const g = interpolate(scroll.value, [-50, 0, 500], [12, 255, 12]);
    const b = interpolate(scroll.value, [-50, 0, 500], [12, 255, 12]);
    return {
      backgroundColor: `rgb(${r},${g},${b})`,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={[{ height: "100%", width: "100%" }, scrollStyle]}
        contentContainerStyle={{
          height: "200%",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Animated.ScrollView>
      <View style={{ position: "absolute", zIndex: 1 }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={ballStyle}></Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
