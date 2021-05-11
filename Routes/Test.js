import React, { useState, useEffect, useContext, useRef } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import RoundChart from "../Components/Helpers/RoundChart";

// import { Divider, TouchHere, CheckBox } from "phoenix-rn-helper";

const Test = () => {
  return (
    <View style={styles.container}>
      <RoundChart colors={["lightblue", "grey", "orange", "pink"]} />
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
});
