import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import FlowerLeaves from "../Components/FlowerLeaves";

const Flower = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  }, []);

  const reset = () => {
    progress.value = 0;
    progress.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
  };

  const rotater = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: interpolate(progress.value, [0, 1], [360, 0]) + "deg" },
      ],
    };
  });

  return (
    <>
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
              <FlowerLeaves index={index} key={index} progress={progress} />
            );
          })}
        </Animated.View>
      </View>
      <Button
        title="RESET"
        onPress={reset}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Button
        title="Stop"
        onPress={() => (progress.value = 1)}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </>
  );
};

export default Flower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#212121",
  },
});
