import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider, ColorSelector } from "phoenix-rn-helper";

const Test = () => {
  const [check, setCheck] = React.useState("#ff0000");
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <ColorSelector
        value={check}
        onChange={(color) => setCheck(color)}
        style={{ width: 100, height: 100 }}
      />
      <Text>{check}</Text>
      <Divider size={2} color={"black"} margin={10} />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
