import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Divider, TouchHere } from "phoenix-rn-helper";

const Test = () => {
  const [check, setCheck] = React.useState(true);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setCheck(true)}>
        <Text>{JSON.stringify(check)}</Text>
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
});
