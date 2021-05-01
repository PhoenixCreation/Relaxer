import React, { useState, useEffect, useContext, useRef } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

// import { Divider, TouchHere } from "phoenix-rn-helper";

const { width, height } = Dimensions.get("window");

const Test = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <Text>{"test"}</Text>
      </Pressable>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    width,
    height,
  },
});
