import React from "react";
import { StyleSheet, Modal, View } from "react-native";
import TouchSvg from "../Svg/TouchSvg";

const TouchHere = ({ x, y, visible, onRequestClose }) => {
  // If x or y is not provided then set them to 0
  // TODO:// throw error to user that x and y should be provided
  if (!x || isNaN(x)) x = 0;
  if (!y || isNaN(y)) y = 0;
  x = x - 29;
  y = y - 10;
  return (
    <Modal visible={visible} onRequestClose={onRequestClose} transparent={true}>
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          borderColor: "red",
          borderWidth: 1,
          transform: [{ translateX: x }, { translateY: y }],
        }}
      >
        <TouchSvg width={70} height={70} />
      </View>
    </Modal>
  );
};

export default TouchHere;

const styles = StyleSheet.create({});
