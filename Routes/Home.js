import React, { useContext } from "react";
import { StyleSheet, Text, View, Vibration, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Flower from "./Flower";
import { LoaderContext } from "../Loader";
import { w3color } from "../colorCheck";

const { width, height } = Dimensions.get("window");

const SPRING_CONFIG = {
  damping: 5,
};

const Home = () => {
  const { settings } = useContext(LoaderContext);

  const transformColor = (color) => {
    return {
      r: new w3color(color).red,
      g: new w3color(color).green,
      b: new w3color(color).blue,
    };
  };

  const color1 = transformColor(settings.freeBall.ballColor1);
  const color2 = transformColor(settings.freeBall.ballColor2);
  const backColor1 = transformColor(settings.freeBall.backgroundColor1);
  const backColor2 = transformColor(settings.freeBall.backgroundColor2);

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
    const r = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, color1.r, color2.r]
    );
    const g = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, color1.g, color2.g]
    );
    const b = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, color1.b, color2.b]
    );
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
    const r = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor1.r, backColor2.r]
    );
    const g = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor1.g, backColor2.g]
    );
    const b = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor1.b, backColor2.b]
    );
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
        }}
      >
        <Text>Scroll Down to change the colors.</Text>
        <Text>Drag the ball and release to play with it</Text>
      </Animated.ScrollView>
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
