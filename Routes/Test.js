import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Test = () => {
  return (
    <View style={styles.container}>
      <Text>This is test slide</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
