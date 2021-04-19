import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemeToggler from "../Components/Helpers/ThemeToggler";
// import { Divider, ColorSelector } from "phoenix-rn-helper";

const Test = () => {
  const [check, setCheck] = React.useState("dark");
  return (
    <View style={styles.container}>
      <ThemeToggler
        value={check}
        onChange={(e) => setCheck(e)}
        boxStyle={{
          width: 80,
          height: 80,
        }}
        duration={500}
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
