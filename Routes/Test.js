import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CheckBox from "../Components/Helpers/CheckBox";
// import { Divider, ColorSelector } from "phoenix-rn-helper";

const Test = () => {
  const [check, setCheck] = React.useState(true);
  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <CheckBox
        value={check}
        onChange={(e) => setCheck(e)}
        boxStyle={{ width: 50, height: 40, borderRadius: 0 }}
        TrueComponent={() => <Text style={{ color: "blue" }}>True</Text>}
        FalseCoponent={() => <Text style={{ color: "red" }}>False</Text>}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
