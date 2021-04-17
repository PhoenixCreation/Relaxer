import React, { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "../Components/Helpers/Divider";
import { LoaderContext } from "../Loader";
import ColorSelector from "../Components/Helpers/ColorSelector";

const Settings = ({ navigation }) => {
  const { settings, setNewSettings, resetSettings } = useContext(LoaderContext);

  // Free ball settings
  const [ballBallColor1, setBallBallColor1] = useState(
    settings.freeBall.ballColor1
  );
  const [ballBallColor2, setBallBallColor2] = useState(
    settings.freeBall.ballColor2
  );
  const [ballBackgroundColor1, setBallBackgroundColor1] = useState(
    settings.freeBall.backgroundColor1
  );
  const [ballBackgroundColor2, setBallBackgroundColor2] = useState(
    settings.freeBall.backgroundColor2
  );

  // Flower Settings
  const [flowerColor1, setFlowerColor1] = useState(settings.flower.color1);
  const [flowerColor2, setFlowerColor2] = useState(settings.flower.color2);
  const [flowerAdditionalOptions, setFlowerAdditionalOptions] = useState(
    settings.flower.additionalOptions
  );

  // other Settings
  const [otherTheme, setOtherTheme] = useState(settings.others.theme);

  useEffect(() => {
    setBallBallColor1(settings.freeBall.ballColor1);
    setBallBallColor2(settings.freeBall.ballColor2);
    setBallBackgroundColor1(settings.freeBall.backgroundColor1);
    setBallBackgroundColor2(settings.freeBall.backgroundColor2);
    setFlowerColor1(settings.flower.color1);
    setFlowerColor2(settings.flower.color2);
    setFlowerAdditionalOptions(settings.flower.additionalOptions);
    setOtherTheme(settings.others.theme);
  }, [settings]);

  const saveSettings = () => {
    const newSettings = {
      freeBall: {
        ballColor1: ballBallColor1,
        ballColor2: ballBallColor2,
        backgroundColor1: ballBackgroundColor1,
        backgroundColor2: ballBackgroundColor2,
      },
      flower: {
        color1: flowerColor1,
        color2: flowerColor2,
        additionalOptions: flowerAdditionalOptions,
      },
      others: {
        theme: otherTheme,
      },
    };
    setNewSettings(newSettings);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.saveButton} onPress={saveSettings}>
        <MaterialCommunityIcons name="content-save" size={28} color="white" />
      </Pressable>
      <ScrollView style={styles.scrollView}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Settings</Text>
        </View>
        <View style={styles.advice}>
          <Text style={styles.adviceText}>
            If colors does not reflect instantly then refresh the app once or go
            to hell.
          </Text>
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
            <ColorSelector
              value={ballBallColor1}
              onChange={(color) => setBallBallColor1(color)}
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
            <ColorSelector
              value={ballBallColor2}
              onChange={(color) => setBallBallColor2(color)}
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
            <ColorSelector
              value={ballBackgroundColor1}
              onChange={(color) => setBallBackgroundColor1(color)}
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
            <ColorSelector
              value={ballBackgroundColor2}
              onChange={(color) => setBallBackgroundColor2(color)}
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
            This is gardient colors, make sure you select close colors for
            better expirience. OR you can just have fun.
          </Text>
        </View>
        <Divider size={1} color="#313131" margin={5} />
        <View style={styles.option}>
          <Text style={styles.optionText}>Flower color 1:</Text>
          <View style={{ flexDirection: "row" }}>
            <ColorSelector
              value={flowerColor1}
              onChange={(color) => setFlowerColor1(color)}
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
            <ColorSelector
              value={flowerColor2}
              onChange={(color) => setFlowerColor2(color)}
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
          <TextInput
            value={otherTheme}
            onChangeText={(e) => setOtherTheme(e)}
            style={styles.inputBox}
          ></TextInput>
        </View>
        <View style={styles.someSpaceForSaveButton}>
          <Pressable
            style={styles.resetButton}
            onPress={() => {
              resetSettings();
            }}
          >
            <MaterialCommunityIcons name="lock-reset" size={28} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
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
  saveButton: {
    position: "absolute",
    backgroundColor: "#1263f1",
    zIndex: 10,
    bottom: 0,
    right: 0,
    margin: 20,
    padding: 10,
    borderRadius: 100,
  },
  someSpaceForSaveButton: {
    height: 85,
    justifyContent: "center",
  },
  resetButton: {
    backgroundColor: "#1263f1",
    width: 50,
    padding: 10,
    marginLeft: 10,
    borderRadius: 100,
  },
});
