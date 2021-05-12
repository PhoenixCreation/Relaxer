import React, { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Divider from "./Divider";

const HEIGHT = 175;

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

const BarChart = ({ data, height }) => {
  const lastModified = data.reduce((acc, value) => {
    if (value.modified) return data.indexOf(value);
    else return acc;
  }, 0);
  const [currentSelection, setCurrentSelection] = useState(data[lastModified]);
  const [MAX_VALUE, setMAX_VALUE] = useState(100);
  const [POINTS, setPOINTS] = useState([
    0,
    parseInt(MAX_VALUE / 4),
    parseInt(MAX_VALUE / 2),
    parseInt(MAX_VALUE / 1.33),
    parseInt(MAX_VALUE),
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.barInfoCont}>
        <View style={styles.barInfo}>
          <View style={{ ...styles.barColor, backgroundColor: "#46f" }}></View>
          <Text style={styles.barName}>End</Text>
        </View>
        <View style={styles.barInfo}>
          <View style={{ ...styles.barColor, backgroundColor: "#f33" }}></View>
          <Text style={styles.barName}>Max</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`${currentSelection.day}`}</Text>
        <Text style={styles.headerText}>
          {`Max: ${currentSelection.maxValue}, End: ${currentSelection.value}`}
        </Text>
      </View>
      <View style={styles.chartCont}>
        <View style={styles.chartTopCont}>
          <View style={{ ...styles.chartMainCont, height: height }}>
            <View style={styles.dividersCont}>
              {POINTS.map((point, i) => (
                <Divider key={i} color="#b1b1b1" />
              ))}
            </View>
            <View style={styles.chart}>
              {data.map((dt, i) => {
                return (
                  <ChartBar
                    key={i}
                    onSelected={setCurrentSelection}
                    dt={dt}
                    max={MAX_VALUE}
                    currentSelection={currentSelection}
                    index={i}
                  />
                );
              })}
            </View>
            <View
              style={{
                ...styles.chart,
                ...StyleSheet.absoluteFillObject,
                zIndex: -1,
              }}
            >
              {data.map((dt, i) => {
                return (
                  <ChartMaxBar
                    key={i}
                    onSelected={setCurrentSelection}
                    dt={dt}
                    max={MAX_VALUE}
                    index={i}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.chartValuesCont}>
            {POINTS.map((point, i) => {
              return (
                <Text style={styles.chartValue} key={i}>
                  {JSON.stringify(point)}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default BarChart;

const ChartBar = ({ onSelected, dt, max, currentSelection, index }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1200 });
  }, []);

  const MAX_HEIGHT = parseInt((dt.value / max) * 100);

  const color = currentSelection === dt ? "#00f" : "#46f";

  const style = useAnimatedStyle(() => {
    return {
      width: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      marginVertical: StyleSheet.hairlineWidth,
      height: interpolate(progress.value, [0, 1], [0, MAX_HEIGHT]) + "%",
      backgroundColor: color,
    };
  });

  return (
    <Pressable
      onPress={() => onSelected(dt)}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={style}>
        <Text style={styles.chartFooter}>{dt.day}</Text>
      </Animated.View>
    </Pressable>
  );
};

const ChartMaxBar = ({ onSelected, dt, max, index }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000 });
  }, []);

  const MAX_HEIGHT = parseInt((dt.maxValue / max) * 100);

  const style = useAnimatedStyle(() => {
    return {
      width: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: "center",
      marginVertical: StyleSheet.hairlineWidth,
      height: interpolate(progress.value, [0, 1], [0, MAX_HEIGHT]) + "%",
      backgroundColor: "#ff2323",
    };
  });

  return (
    <Pressable
      onPress={() => onSelected(dt)}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={style}></Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingBottom: 30,
    justifyContent: "space-between",
    backgroundColor: "#313131",
  },
  header: {
    width: "100%",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  chartTopCont: {
    flexDirection: "row",
  },
  chartMainCont: {
    height: HEIGHT,
    flex: 1,
  },
  chartValuesCont: {
    justifyContent: "space-between",
    flexDirection: "column-reverse",
    marginVertical: -10,
    marginLeft: 5,
  },
  chartValue: {
    color: "white",
    fontSize: 14,
  },
  dividersCont: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    zIndex: -2,
  },
  chart: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  chartFooter: {
    color: "white",
    position: "absolute",
    bottom: -20,
    width: 30,
    textAlign: "center",
    zIndex: 50,
  },
  barInfoCont: {
    position: "absolute",
    right: 0,
    top: 0,
    margin: 10,
    paddingLeft: 5,
    paddingRight: 15,
  },
  barInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  barColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "red",
    marginRight: 5,
  },
  barName: {
    color: "#d1d1d1",
  },
});
