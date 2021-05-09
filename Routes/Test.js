import React, { useState, useEffect, useContext, useRef } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import BarChart from "../Components/Helpers/BarChart";

import { Divider, TouchHere, CheckBox } from "phoenix-rn-helper";

const data = [
  {
    day: "Sun",
    value: 10,
  },
  {
    day: "Mon",
    value: 5,
  },
  {
    day: "Tue",
    value: 50,
  },
  {
    day: "Wed",
    value: 90,
  },
  {
    day: "Thu",
    value: 100,
  },
  {
    day: "Fri",
    value: 40,
  },
  {
    day: "Sat",
    value: 70,
  },
];
const { width, height } = Dimensions.get("window");

const Test = () => {
  return (
    <View style={styles.container}>
      <View>
        <Divider size={10} />
      </View>
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
