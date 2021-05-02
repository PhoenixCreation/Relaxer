import React, { useState, useEffect, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Divider from "./Divider";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HEIGHT = 175;

const BarChart = ({ data, height }) => {
  const [currentSelection, setCurrentSelection] = useState(
    data[data.length - 1]
  );
  const MAX_VALUE = data.reduce((acc, current) => {
    if (acc < current.value) return current.value;
    else return acc;
  }, 0);
  const POINTS = [
    0,
    parseInt(MAX_VALUE / 4),
    parseInt(MAX_VALUE / 2),
    parseInt(MAX_VALUE / 1.33),
    parseInt(MAX_VALUE),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {JSON.stringify(currentSelection.value)}
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
  const delay = index * 300;

  const progress = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      progress.value = withTiming(1);
    }, delay);
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
    <Pressable onPress={() => onSelected(dt)}>
      <Animated.View style={style}>
        <Text style={styles.chartFooter}>{dt.day}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingVertical: 30,
    justifyContent: "space-between",
    backgroundColor: "#313131",
  },
  header: {
    width: "100%",
    alignItems: "center",
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
    zIndex: 0,
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
  },
});
