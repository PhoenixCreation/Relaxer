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
import { LoaderContext } from "../Loader";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    day: "Sun",
    value: 10,
    maxValue: 70,
  },
  {
    day: "Mon",
    value: 5,
    maxValue: 20,
  },
  {
    day: "Tue",
    value: 50,
    maxValue: 70,
  },
  {
    day: "Wed",
    value: 90,
    maxValue: 100,
  },
  {
    day: "Thu",
    value: 100,
    maxValue: 100,
  },
  {
    day: "Fri",
    value: 40,
    maxValue: 60,
  },
  {
    day: "Sat",
    value: 70,
    maxValue: 80,
  },
];
const MAX = 200;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_DATA = DAYS.map((day) => ({
  day,
  value: 0,
  maxValue: 0,
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
      fontSize: 18,
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
  });

  const [data, setData] = useState(DATA);
  const [stressLevel, setStressLevel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [weekCount, setWeekCount] = useState(
    parseInt((new Date().getTime() - 2 * 24 * 3600000) / (7 * 24 * 3600000))
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem(`@Relaxer/${weekCount}`);
    if (!jsonValue) {
      await AsyncStorage.setItem(
        `@Relaxer/${weekCount}`,
        JSON.stringify(DEFAULT_DATA)
      );
      setData(DEFAULT_DATA);
      setLoading(false);
    } else {
      setData(JSON.parse(jsonValue));
      setLoading(false);
    }
  };

  const setNewStressLevel = async () => {
    const oldData = data;
    const index = new Date().getDay();
    let value = stressLevel;
    let maxValue =
      stressLevel > oldData[index].maxValue
        ? stressLevel
        : oldData[index].maxValue;
    oldData[index] = { ...oldData[index], value, maxValue };
    setData(oldData);
    await AsyncStorage.setItem(
      `@Relaxer/${weekCount}`,
      JSON.stringify(oldData)
    );
    ToastAndroid.show("Updated today's stress level", ToastAndroid.LONG);
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
    return per + "%";
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
        <AnimatedLabel text={level} style={styles.label} />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={lndicatorStyle}>
            <Text style={styles.slideAdvice} numberOfLines={1}>
              Slide on bar to change levels
            </Text>
            <Animated.View style={containerStyle}></Animated.View>
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
    </ScrollView>
  );
};

export default Home;
