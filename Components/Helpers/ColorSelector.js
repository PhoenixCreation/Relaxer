import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import { ColorPicker, fromHsv } from "react-native-color-picker";

const ColorSelector = ({ value, onChange, style: givenStyle }) => {
  const [show, setShow] = useState(false);

  const styles = StyleSheet.create({
    container: {
      width: 30,
      height: 30,
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
      marginRight: 5,
    },
    pickerContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    colorPicker: {
      width: "70%",
      height: "70%",
      backgroundColor: "#d1d1d1cc",
      borderRadius: 10,
      borderColor: "black",
      borderWidth: 1,
      borderTopRightRadius: 0,
    },
    closeButton: {
      position: "absolute",
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "black",
      zIndex: 20,
      top: "15%",
      right: "15%",
      marginRight: -10,
      marginTop: -10,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <Pressable
      style={{ ...styles.container, ...givenStyle, backgroundColor: value }}
      onPress={() => setShow(true)}
    >
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        animationType="none"
        transparent={true}
      >
        <View style={styles.pickerContainer}>
          <Pressable onPress={() => setShow(false)} style={styles.closeButton}>
            <Text style={{ color: "white" }}>X</Text>
          </Pressable>
          <ColorPicker
            defaultColor={value}
            onColorChange={(hsvColor) => onChange(fromHsv(hsvColor))}
            style={styles.colorPicker}
          />
        </View>
      </Modal>
    </Pressable>
  );
};

export default ColorSelector;
