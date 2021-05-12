import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import AnimatedLabel from "../Components/Helpers/AnimatedLabel";
import BarChart from "../Components/Helpers/BarChart";
import RoundChart from "../Components/Helpers/RoundChart";
import { LoaderContext } from "../Loader";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    day: "Sun",
    value: 10,
    maxValue: 70,
    modified: false,
  },
  {
    day: "Mon",
    value: 5,
    maxValue: 20,
    modified: false,
  },
  {
    day: "Tue",
    value: 50,
    maxValue: 70,
    modified: false,
  },
  {
    day: "Wed",
    value: 90,
    maxValue: 100,
    modified: false,
  },
  {
    day: "Thu",
    value: 100,
    maxValue: 100,
    modified: false,
  },
  {
    day: "Fri",
    value: 40,
    maxValue: 60,
    modified: false,
  },
  {
    day: "Sat",
    value: 70,
    maxValue: 80,
    modified: false,
  },
];
const MAX = 200;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_DATA = DAYS.map((day) => ({
  day,
  value: 0,
  maxValue: 0,
  modified: false,
}));

const Home = ({ navigation }) => {
  const { settings } = useContext(LoaderContext);

  const theme = settings.others.theme === "light";

  const themeColors = {
    color: theme ? "#121212" : "#eee",
    backgroundColor: theme ? "#f1f1f1" : "#212121",
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColors.backgroundColor,
    },
    header: {
      width,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      color: themeColors.color,
    },
    incdicatorContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    slideAdvice: {
      color: themeColors.color,
      position: "absolute",
      width: MAX,
      left: -MAX / 2 - 20,
      top: MAX / 2 - 20,
      transform: [{ rotate: "-90deg" }],
    },
    chartCont: {
      marginTop: 20,
      marginHorizontal: 5,
      borderRadius: 10,
      overflow: "hidden",
    },
    label: {
      color: themeColors.color,
      fontSize: 16,
      width: "100%",
    },
    setBtn: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: "#2155ff",
      overflow: "hidden",
    },
    setBtnText: {
      color: themeColors.color,
      fontSize: 18,
    },
    summaryCont: {
      padding: 10,
    },
    summaryHeading: {
      fontSize: 19,
      fontWeight: "bold",
      color: themeColors.color,
    },
    summary: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    summaryTagCont: {
      justifyContent: "center",
      marginLeft: -20,
    },
    summaryTag: {
      flexDirection: "row",
      alignItems: "center",
    },
    summaryTagColor: {
      width: 20,
      height: 10,
      borderRadius: 5,
      backgroundColor: "red",
      marginRight: 5,
    },
    summaryTagText: {
      color: themeColors.color,
      fontSize: 12,
    },
  });

  const [data, setData] = useState(DATA);
  const [stressLevel, setStressLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [weekCount, setWeekCount] = useState(
    parseInt(
      (new Date().getTime() -
        new Date().getTimezoneOffset() * 60 * 1000 -
        3 * 24 * 3600000) /
        (7 * 24 * 3600000)
    )
  );
  const [summaryInfo, setSummaryInfo] = useState({
    average: 0,
    averageMax: 0,
    difference: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // console.log(await AsyncStorage.getAllKeys());
    const jsonValue = await AsyncStorage.getItem(`@Relaxer/${weekCount}`);

    if (!jsonValue) {
      await AsyncStorage.setItem(
        `@Relaxer/${weekCount}`,
        JSON.stringify(DEFAULT_DATA)
      );
      setData(DEFAULT_DATA);
      setLoading(false);
    } else {
      const newData = JSON.parse(jsonValue);
      setData(newData);
      const effectiveDays = newData.reduce((acc, crnt) => {
        return acc + crnt.modified;
      }, 0);
      const averageEOD = newData.reduce((acc, crnt) => acc + crnt.value, 0);
      const averageMax = newData.reduce((acc, crnt) => acc + crnt.maxValue, 0);
      const difference = newData.reduce(
        (acc, crnt) => acc + (crnt.maxValue - crnt.value),
        0
      );
      setSummaryInfo({
        average: parseInt(averageEOD / effectiveDays),
        averageMax: parseInt(averageMax / effectiveDays),
        difference: parseInt(difference / effectiveDays),
      });
      setLoading(false);
    }
  };

  const setNewStressLevel = async () => {
    try {
      setLoading(true);
      const oldData = data;
      const index = new Date().getDay();
      let value = stressLevel;
      let maxValue =
        stressLevel > oldData[index].maxValue
          ? stressLevel
          : oldData[index].maxValue;
      oldData[index] = { ...oldData[index], value, maxValue, modified: true };
      setData(oldData);
      const effectiveDays = oldData.reduce((acc, crnt) => {
        return acc + crnt.modified;
      }, 0);
      const averageEOD = oldData.reduce((acc, crnt) => acc + crnt.value, 0);
      const averageMax = oldData.reduce((acc, crnt) => acc + crnt.maxValue, 0);
      const difference = oldData.reduce(
        (acc, crnt) => acc + (crnt.maxValue - crnt.value),
        0
      );
      setSummaryInfo({
        average: parseInt(averageEOD / effectiveDays),
        averageMax: parseInt(averageMax / effectiveDays),
        difference: parseInt(difference / effectiveDays),
      });
      await AsyncStorage.setItem(
        `@Relaxer/${weekCount}`,
        JSON.stringify(oldData)
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("At setting current new level of stress => ", error);
    }
  };

  const posY = useSharedValue(0);

  const fn = {
    setNewLevel: (value) => {
      setStressLevel(parseInt(Math.abs(value / MAX) * 100));
    },
  };

  const interpolateColor = (value, inputArray, outputArray) => {
    "worklet";
    const r = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.r)
    );
    const g = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.g)
    );
    const b = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.b)
    );
    const a = interpolate(
      value,
      inputArray,
      outputArray.map((col) => col.a)
    );
    return `rgba(${r},${g},${b},${a})`;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.y = posY.value;
    },
    onActive: ({ translationY }, ctx) => {
      if (ctx.y + translationY / 2 > 0) {
        posY.value = 0;
      } else if (ctx.y + translationY / 2 < -MAX) {
        posY.value = -MAX;
      } else {
        posY.value = ctx.y + translationY / 2;
      }
    },
    onEnd: () => {
      runOnJS(fn.setNewLevel)(posY.value);
    },
  });

  const level = useDerivedValue(() => {
    const per = parseInt(interpolate(posY.value, [0, -MAX], [0, 100]));
    let levelLevel = "Low";
    if (per > 25 && per < 67) levelLevel = "Medium";
    if (per >= 67) levelLevel = "High";
    return `< ${per}% (${levelLevel})`;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      height: interpolate(posY.value, [0, -MAX], [1, 100]) + "%",
      backgroundColor: interpolateColor(
        posY.value,
        [-MAX, -MAX / 2, 0],
        [
          { r: 255, g: 0, b: 0, a: 1 },
          { r: 255, g: 255, b: 0, a: 1 },
          { r: 0, g: 255, b: 0, a: 1 },
        ]
      ),
    };
  });

  const lndicatorStyle = useAnimatedStyle(() => {
    return {
      width: 60,
      height: MAX,
      borderColor: interpolateColor(
        posY.value,
        [-MAX, -MAX / 2, 0],
        [
          { r: 0, g: 255, b: 0, a: 1 },
          { r: 0, g: 0, b: 255, a: 1 },
          { r: 255, g: 0, b: 0, a: 1 },
        ]
      ),
      borderWidth: 1,
      justifyContent: "flex-end",
      margin: 10,
      marginBottom: 20,
    };
  });

  return (
    <ScrollView
      style={{ backgroundColor: themeColors.backgroundColor }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>How much stressed are you?</Text>
      </View>
      <View style={styles.incdicatorContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={lndicatorStyle}>
            <Text style={styles.slideAdvice} numberOfLines={1}>
              Slide on bar to change levels
            </Text>
            <Animated.View style={containerStyle}>
              <View
                style={{
                  position: "absolute",
                  left: 60,
                  top: -14,
                }}
              >
                <AnimatedLabel text={level} style={styles.label} />
              </View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <TouchableOpacity onPress={() => setNewStressLevel()}>
          <View style={styles.setBtn}>
            <Text style={styles.setBtnText}>Set today's stress level</Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#00aa00" />
        </View>
      ) : (
        <View style={styles.chartCont}>
          <BarChart data={data} height={150} />
        </View>
      )}
      {loading ? (
        <View
          style={{
            flex: 1,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#f33442" />
        </View>
      ) : (
        <View style={styles.summaryCont}>
          <Text style={styles.summaryHeading}>This week:</Text>
          <View style={styles.summary}>
            <View style={{ transform: [{ scale: 0.8 }] }}>
              <RoundChart
                values={[
                  summaryInfo.average / 100,
                  // 1,
                  summaryInfo.averageMax / 100,
                  summaryInfo.difference / 100,
                  // 1,
                ]}
                colors={["#23f", "red", "green"]}
              />
            </View>
            <View style={styles.summaryTagCont}>
              <View style={styles.summaryTag}>
                <View
                  style={{ ...styles.summaryTagColor, backgroundColor: "#23f" }}
                />
                <Text style={styles.summaryTagText}>
                  Average End {`(${summaryInfo.average}%)`}
                </Text>
              </View>
              <View style={styles.summaryTag}>
                <View
                  style={{ ...styles.summaryTagColor, backgroundColor: "red" }}
                />
                <Text style={styles.summaryTagText}>
                  Average Max {`(${summaryInfo.averageMax}%)`}
                </Text>
              </View>
              <View style={styles.summaryTag}>
                <View
                  style={{
                    ...styles.summaryTagColor,
                    backgroundColor: "green",
                  }}
                />
                <Text style={styles.summaryTagText}>
                  Average Drop {`(${summaryInfo.difference}%)`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
