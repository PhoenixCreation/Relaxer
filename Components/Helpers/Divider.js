import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Divider = ({ size, color, margin }) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: size ? size : StyleSheet.hairlineWidth,
      paddingHorizontal: margin ? margin : 0,
    },
    divider: {
      width: "100%",
      height: "100%",
      backgroundColor: color ? color : "grey",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>
    </View>
  );
};

export default Divider;
