import React, { useContext } from "react";
import { StyleSheet, Text, View, Vibration, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  Extrapolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { LoaderContext } from "../Loader";
import { w3color } from "../colorCheck";
import Svg, { Circle, Line } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnimatedLine = Animated.createAnimatedComponent(Line);

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

  const LineProps = useAnimatedProps(() => {
    const r = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor2.r, backColor1.r],
      Extrapolate.CLAMP
    );
    const g = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor2.g, backColor1.g],
      Extrapolate.CLAMP
    );
    const b = interpolate(
      scroll.value,
      [-50, 0, 500],
      [12, backColor2.b, backColor1.b],
      Extrapolate.CLAMP
    );
    return {
      x2: withSpring(touchX.value + width / 2, SPRING_CONFIG),
      y2: withSpring(touchY.value + height / 2, SPRING_CONFIG),
      stroke: `rgb(${r},${g},${b})`,
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
        {settings.freeBall.string && (
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{
              position: "absolute",
              top: -height / 2 + 40,
              left: -width / 2 + 40,
            }}
          >
            <AnimatedLine
              x1={width / 2}
              y1={height / 2}
              strokeWidth={2}
              animatedProps={LineProps}
            />
            <Circle r={10} cx={width / 2} cy={height / 2} fill="blue" />
          </Svg>
        )}
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
