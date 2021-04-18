import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const CheckBox = ({
  value,
  onChange,
  TrueComponent,
  FalseCoponent,
  boxStyle,
}) => {
  let defaultLook = true;
  if (
    typeof TrueComponent === "function" &&
    typeof FalseCoponent === "function"
  ) {
    defaultLook = false;
  }
  const styles = StyleSheet.create({
    container: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor: "lightgrey",
      borderWidth: 1,
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <Pressable
      style={[styles.container, boxStyle]}
      onPress={() => onChange(!value)}
    >
      {!defaultLook ? (
        value ? (
          <TrueComponent />
        ) : (
          <FalseCoponent />
        )
      ) : (
        <Text>{value ? "✔️" : "❌"}</Text>
      )}
    </Pressable>
  );
};

export default CheckBox;
