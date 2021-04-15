import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { w3color } from "../colorCheck";

const Test = () => {
  const colorString = new w3color("#f0f453");

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(colorString)}</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
