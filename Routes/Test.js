import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "phoenix-rn-helper";
console.log(Divider);

const Test = () => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <Divider size={40} margin={20} color="#ff5667" />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
