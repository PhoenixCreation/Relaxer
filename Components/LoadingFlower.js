import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import LoadingFlowerLeaves from "./LoadingFlowerLeaves";

const LoadingFlower = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2500 }), -1, true);
  }, []);

  const rotater = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: interpolate(progress.value, [0, 1], [360, 0]) + "deg" },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
          rotater,
        ]}
      >
        {new Array(6).fill(1).map((_, index) => {
          return (
            <LoadingFlowerLeaves
              index={index}
              key={index}
              progress={progress}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

export default LoadingFlower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212121",
  },
});
