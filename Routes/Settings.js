import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Divider from "../Components/Helpers/Divider";

const Settings = () => {
  // Free ball settings
  const [ballBallColor1, setBallBallColor1] = useState("#ff0000");
  const [ballBallColor2, setBallBallColor2] = useState("#ffff00");
  const [ballBackgroundColor1, setBallBackgroundColor1] = useState("#ffffff");
  const [ballBackgroundColor2, setBallBackgroundColor2] = useState("#000000");

  // Flower Settings
  const [flowerColor1, setFlowerColor1] = useState("#00BFA1");
  const [flowerColor2, setFlowerColor2] = useState("#009CA0");
  const [flowerAdditionalOptions, setFlowerAdditionalOptions] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Settings</Text>
      </View>
      <Divider size={1.5} color="#212121" margin={5} />
      <View style={styles.screenHeading}>
        <Text style={styles.screenHeadingText}>Free Ball</Text>
      </View>
      <View style={styles.advice}>
        <Text style={styles.adviceText}>
          Do whatever you want to do with colors. Just make sure to not have
          same colors for ball and background.
        </Text>
      </View>
      <Divider size={1} color="#313131" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Ball color 1:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ ...styles.colorBox, backgroundColor: ballBallColor1 }}
          />
          <TextInput
            value={ballBallColor1}
            onChangeText={(e) => setBallBallColor1(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Ball color 2:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{ ...styles.colorBox, backgroundColor: ballBallColor2 }}
          />
          <TextInput
            value={ballBallColor2}
            onChangeText={(e) => setBallBallColor2(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Background color 1:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.colorBox,
              backgroundColor: ballBackgroundColor1,
            }}
          />
          <TextInput
            value={ballBackgroundColor1}
            onChangeText={(e) => setBallBackgroundColor1(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Background color 2:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.colorBox,
              backgroundColor: ballBackgroundColor2,
            }}
          />
          <TextInput
            value={ballBackgroundColor2}
            onChangeText={(e) => setBallBackgroundColor2(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.screenHeading}>
        <Text style={styles.screenHeadingText}>Flower</Text>
      </View>
      <View style={styles.advice}>
        <Text style={styles.adviceText}>
          This is gardient colors, make sure you select close colors for better
          expirience. OR you can just have fun.
        </Text>
      </View>
      <Divider size={1} color="#313131" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Flower color 1:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.colorBox,
              backgroundColor: flowerColor1,
            }}
          />
          <TextInput
            value={flowerColor1}
            onChangeText={(e) => setFlowerColor1(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Flower color 2:</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.colorBox,
              backgroundColor: flowerColor2,
            }}
          />
          <TextInput
            value={flowerColor2}
            onChangeText={(e) => setFlowerColor2(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Addition options:</Text>
        <Text>CheckBox TODO</Text>
      </View>
      <Divider size={1} color="#414141" margin={5} />
      <View style={styles.screenHeading}>
        <Text style={styles.screenHeadingText}>Other</Text>
      </View>
      <View style={styles.advice}>
        <Text style={styles.adviceText}>I don't know what to put here.</Text>
      </View>
      <Divider size={1} color="#313131" margin={5} />
      <View style={styles.option}>
        <Text style={styles.optionText}>Theme</Text>
        <TextInput value="Dark" style={styles.inputBox}></TextInput>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  heading: {
    padding: 5,
    marginBottom: 5,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  screenHeading: {
    marginTop: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  screenHeadingText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "black",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },
  inputBox: {
    width: 100,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 5,
  },
  advice: {
    padding: 5,
    marginTop: -5,
  },
  adviceText: {
    color: "#616161",
  },
});
