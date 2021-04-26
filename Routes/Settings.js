import React, { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "../Components/Helpers/Divider";
import { LoaderContext } from "../Loader";
import ColorSelector from "../Components/Helpers/ColorSelector";
import CheckBox from "../Components/Helpers/CheckBox";
import ThemeToggler from "../Components/Helpers/ThemeToggler";

const Settings = ({ navigation }) => {
  const { settings, setNewSettings, resetSettings } = useContext(LoaderContext);

  const theme = settings.others.theme === "light";

  const themeColors = {
    headingTextColor: theme ? "black" : "#eee",
    adviceTextColor: theme ? "#616161" : "#919191",
    backgroundColor: theme ? "white" : "#212121",
    dividerColor: theme ? "#313131" : "#a1a1a1",
    colorboxBorderColor: theme ? "black" : "white",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
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
      color: themeColors.headingTextColor,
    },
    screenHeading: {
      marginTop: 15,
      paddingHorizontal: 5,
      paddingVertical: 2,
    },
    screenHeadingText: {
      fontSize: 21,
      fontWeight: "bold",
      color: themeColors.headingTextColor,
    },
    option: {
      padding: 5,
    },
    optionSettings: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    optionText: {
      fontSize: 16,
      color: themeColors.headingTextColor,
    },
    inputBox: {
      width: 100,
      borderWidth: 1,
      borderColor: themeColors.headingTextColor,
      paddingHorizontal: 10,
      borderRadius: 10,
      color: themeColors.headingTextColor,
    },
    advice: {
      padding: 5,
      marginTop: -5,
    },
    adviceText: {
      color: themeColors.adviceTextColor,
    },
    innerAdvice: {},
    innerAdviceText: {
      color: themeColors.adviceTextColor,
      fontSize: 12.5,
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
    colorbox: {
      borderColor: themeColors.colorboxBorderColor,
    },
  });

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
  const [ballSpringConstant, setBallSpringConstant] = useState(
    settings.freeBall.springConstant
  );
  const [ballScaleFactor, setBallScaleFactor] = useState(
    settings.freeBall.scaleFactor
  );
  const [ballVibration, setBallVibration] = useState(
    settings.freeBall.vibration
  );
  const [ballString, setBallString] = useState(settings.freeBall.string);

  // Flower Settings
  const [flowerColor1, setFlowerColor1] = useState(settings.flower.color1);
  const [flowerColor2, setFlowerColor2] = useState(settings.flower.color2);
  const [flowerAdditionalOptions, setFlowerAdditionalOptions] = useState(
    settings.flower.additionalOptions
  );

  // other Settings
  const [otherTheme, setOtherTheme] = useState(settings.others.theme);

  // Called each time settings changes
  useEffect(() => {
    setBallBallColor1(settings.freeBall.ballColor1);
    setBallBallColor2(settings.freeBall.ballColor2);
    setBallBackgroundColor1(settings.freeBall.backgroundColor1);
    setBallBackgroundColor2(settings.freeBall.backgroundColor2);
    setBallSpringConstant(settings.freeBall.springConstant);
    setBallScaleFactor(settings.freeBall.scaleFactor);
    setBallVibration(settings.freeBall.vibration);
    setBallString(settings.freeBall.string);
    setFlowerColor1(settings.flower.color1);
    setFlowerColor2(settings.flower.color2);
    setFlowerAdditionalOptions(settings.flower.additionalOptions);
    setOtherTheme(settings.others.theme);
  }, [settings]);

  // Svae new settings
  const saveSettings = () => {
    // WARNING: always compare with defaultSettings in root:Loader.js
    const newSettings = {
      freeBall: {
        ballColor1: ballBallColor1,
        ballColor2: ballBallColor2,
        backgroundColor1: ballBackgroundColor1,
        backgroundColor2: ballBackgroundColor2,
        springConstant: ballSpringConstant,
        scaleFactor: ballScaleFactor,
        vibration: ballVibration,
        string: ballString,
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
    <View
      style={{
        ...styles.container,
      }}
    >
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
        <Divider size={1.5} color={theme ? "#212121" : "#d1d1d1"} margin={5} />
        <Pressable
          style={styles.screenHeading}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.screenHeadingText}>Free Ball</Text>
        </Pressable>
        <View style={styles.advice}>
          <Text style={styles.adviceText}>
            Do whatever you want to do with colors. Just make sure to not have
            same colors for ball and background.
          </Text>
        </View>
        <Divider size={1} color={theme ? "#313131" : "#c1c1c1"} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Ball color 1:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={ballBallColor1}
                onChange={(color) => setBallBallColor1(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={ballBallColor1}
                onChangeText={(e) => setBallBallColor1(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              Starting color of the main ball.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Ball color 2:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={ballBallColor2}
                onChange={(color) => setBallBallColor2(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={ballBallColor2}
                onChangeText={(e) => setBallBallColor2(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              Ending color of the main ball at the end of the scroll.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Background color 1:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={ballBackgroundColor1}
                onChange={(color) => setBallBackgroundColor1(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={ballBackgroundColor1}
                onChangeText={(e) => setBallBackgroundColor1(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>Initial background color</Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Background color 2:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={ballBackgroundColor2}
                onChange={(color) => setBallBackgroundColor2(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={ballBackgroundColor2}
                onChangeText={(e) => setBallBackgroundColor2(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              At the end of the scroll background color.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Spring Constant:</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={ballSpringConstant.toString()}
                onChangeText={(e) => setBallSpringConstant(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              {`Spring constatnt of the ball. \nLower value represents more loosen spring.\nIf you just want to have fun then 2 is recomended.`}
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Scale Factor:</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                value={ballScaleFactor.toString()}
                onChangeText={(e) => setBallScaleFactor(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              {`How much ball should scale at the end of scroll. \nIf you want to make it smaller then go below 1.\nGoing over 4 is not recomended but you can do whatever you want to do.`}
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Vibration:</Text>
            <CheckBox
              value={ballVibration}
              onChange={(e) => setBallVibration(e)}
            />
          </View>
          <View style={styles.innerAdvice}>
            <Text
              style={styles.innerAdviceText}
            >{`Vibration at the end of release of ball.\nIf you find it iritating then turn it off.\nBut if you are releasing stress then it is recomended to have it on because vibration increses blood flow in hand.`}</Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>String:</Text>
            <CheckBox value={ballString} onChange={(e) => setBallString(e)} />
          </View>
          <View style={styles.innerAdvice}>
            <Text
              style={styles.innerAdviceText}
            >{`String joining ball from middle point should be shown or not.`}</Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <Pressable
          style={styles.screenHeading}
          onPress={() => navigation.navigate("Flower")}
        >
          <Text style={styles.screenHeadingText}>Flower</Text>
        </Pressable>
        <View style={styles.advice}>
          <Text style={styles.adviceText}>
            This is gardient colors, make sure you select close colors for
            better expirience. OR you can just have fun.
          </Text>
        </View>
        <Divider size={1} color={theme ? "#313131" : "#c1c1c1"} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Flower color 1:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={flowerColor1}
                onChange={(color) => setFlowerColor1(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={flowerColor1}
                onChangeText={(e) => setFlowerColor1(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              Top gradient color of flower leave.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Flower color 2:</Text>
            <View style={{ flexDirection: "row" }}>
              <ColorSelector
                value={flowerColor2}
                onChange={(color) => setFlowerColor2(color)}
                style={styles.colorbox}
              />
              <TextInput
                value={flowerColor2}
                onChangeText={(e) => setFlowerColor2(e)}
                style={styles.inputBox}
              ></TextInput>
            </View>
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              Bottom gradient color of flower leave.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <Text style={styles.optionText}>Addition options:</Text>
            <CheckBox
              value={flowerAdditionalOptions}
              onChange={(e) => setFlowerAdditionalOptions(e)}
            />
          </View>
          <View style={styles.innerAdvice}>
            <Text style={styles.innerAdviceText}>
              Reset button to be shown or not.
            </Text>
          </View>
        </View>
        <Divider size={1} color={themeColors.dividerColor} margin={5} />
        <View style={styles.screenHeading}>
          <Text style={styles.screenHeadingText}>General</Text>
        </View>
        <View style={styles.advice}>
          <Text style={styles.adviceText}>Overall settings of the app.</Text>
        </View>
        <Divider size={1} color={theme ? "#313131" : "#c1c1c1"} margin={5} />
        <View style={styles.option}>
          <View style={styles.optionSettings}>
            <View style={styles.optionSettings}>
              <Text style={styles.optionText}>Theme:</Text>
              <ThemeToggler
                value={otherTheme}
                onChange={(newtheme) => setOtherTheme(newtheme)}
                duration={500}
                boxStyle={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#1263f1",
                  marginRight: 10,
                }}
                sunColor="yellow"
                moonColor="white"
              />
            </View>
          </View>
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
