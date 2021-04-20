import React, { useEffect, useState } from "react";
import { StyleSheet, Modal, View, Pressable } from "react-native";
import TouchSvg from "../Svg/TouchSvg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const TouchHere = ({
  x,
  y,
  visible,
  onRequestClose,
  duration,
  ringColor,
  handColor,
  delay,
}) => {
  // If x or y is not provided then set them to 100 so it can be dubugged properly
  // TODO:// throw error to user that x and y should be provided
  if (!x || isNaN(x)) x = 100;
  if (!y || isNaN(y)) y = 100;

  // check is delay is provided or not
  if (!delay || isNaN(delay)) delay = 0;

  // Progress value that drives the animation
  const progress = useSharedValue(0);

  // duration if not provided by user then set to 3500 which is somewhat perfect according to me
  const TIMER_CONFIG = { duration: duration ? duration : 3500 };

  // we have to wait till start things in motion so this state detrmines that
  const [delayCheck, setDelayCheck] = useState(true);

  // set progress from 0 to 1 with loading
  useEffect(() => {
    setTimeout(() => {
      setDelayCheck(false); // update state to render actual things
      progress.value = withTiming(1, TIMER_CONFIG); // Start the animation
    }, delay);
  }, []);

  // hard-coded positions
  const initialPos = {
    x: x - 70,
    y: y - 80,
    rotate: 60,
  };
  const endPos = {
    x: x - 47,
    y: y - 52,
    rotate: 150,
  };

  // main hand rotation and transformation
  const outerBoxStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 10,
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 0.33, 1],
            [initialPos.x, endPos.x, endPos.x]
          ),
        },
        {
          translateY: interpolate(
            progress.value,
            [0, 0.33, 1],
            [initialPos.y, endPos.y, endPos.y]
          ),
        },
        {
          rotate:
            interpolate(
              progress.value,
              [0, 0.33, 1],
              [initialPos.rotate, endPos.rotate, endPos.rotate]
            ) + "deg",
        },
      ],
    };
  });

  // Ring styling
  const ringStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 8,
      left: 25,
      width: 10,
      height: 10,
      borderRadius: 100,
      borderColor: ringColor ? ringColor : "black",
      opacity: interpolate(
        progress.value,
        [0, 0.33, 0.55, 0.66, 0.67, 0.8, 1],
        [0, 0, 1, 0, 0, 1, 0]
      ),
      borderWidth: interpolate(
        progress.value,
        [0, 0.33, 0.66, 0.67, 1],
        [0, 1.4, 0.5, 1.4, 0.5]
      ),
      transform: [
        {
          scale: interpolate(
            progress.value,
            [0, 0.33, 0.66, 0.67, 1],
            [0, 0, 10, 0, 10]
          ),
        },
      ],
    };
  });

  // If we are still in waiting mode then return nothing
  if (delayCheck) return null;

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 20,
        }}
        onPress={onRequestClose}
      ></Pressable>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "#0004",
          zIndex: 0,
        }}
      ></View>

      <Animated.View style={outerBoxStyle}>
        <TouchSvg width={70} height={70} handColor={handColor} />
        <Animated.View style={ringStyle}></Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default TouchHere;
