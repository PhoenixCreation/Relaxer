import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
// import { Divider, TouchHere } from "phoenix-rn-helper";

const { width, height } = Dimensions.get("window");

const Test = () => {
  const [state, setState] = React.useState(true);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setState(!state)}>
        <Text>{JSON.stringify(state)}</Text>
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
