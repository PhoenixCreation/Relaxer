import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import TouchHere from "../Components/Helpers/TouchHere";
import TouchSvg from "../Components/Svg/TouchSvg";
// import { Divider, ColorSelector } from "phoenix-rn-helper";

const Test = () => {
  const [check, setCheck] = React.useState(true);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setCheck(true)}>
        <Text>{JSON.stringify(check)}</Text>
      </Pressable>
      <TouchHere
        visible={check}
        onRequestClose={() => setCheck(false)}
        x={200}
        y={200}
      />
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
