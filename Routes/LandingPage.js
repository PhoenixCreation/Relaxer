import React, { useRef, useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import WorkingSvg from "../Components/Svg/WorkingSvg";
import FlowerSvg from "../Components/Svg/FlowerSvg";
import CustomizationSvg from "../Components/Svg/CustomizationSvg";
import { LoaderContext } from "../Loader";
import PrivacyProtectionSvg from "../Components/Svg/PrivacyProtectionSvg";
import TouchHere from "../Components/Helpers/TouchHere";
import { color } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const NUMBER_OF_SLIDES = 4;

const colorPalate = ["#0000ff", "#004400", "#44bcff", "#9d5aff"];

const LandingPage = () => {
  const { removeFirsttime } = useContext(LoaderContext);
  const scroll = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [touchIndicator, setTouchIndicator] = useState(true);

  const goToPage = async (index) => {
    if (index < 1 || index > NUMBER_OF_SLIDES + 1) return;
    if (index === NUMBER_OF_SLIDES + 1) {
      await removeFirsttime();
      return;
    }
    setCurrentPage(index);
    scroll.current?.scrollTo({ x: (index - 1) * width });
  };

  const colors = {
    first: {
      top: "#add8e6",
      bottom: "#6666ff",
      textColor: "#4c43ff",
      bottomTextColor: "#000000",
      indicatorColor: "#0000ff",
    },
    second: {
      top: "#90ee90",
      bottom: "#008800",
      textColor: "#009900",
      bottomTextColor: "#ffffff",
      indicatorColor: "#004400",
    },
    third: {
      top: "#cbb9ff",
      bottom: "#a68bff",
      textColor: "#9c41c5",
      bottomTextColor: "#333333",
      indicatorColor: "#44bcff",
    },
    fourth: {
      top: "#9d5aff",
      bottom: "#3388ff",
      textColor: "#1500ff",
      bottomTextColor: "#444444",
      indicatorColor: "#9d5aff",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={false}
      >
        <FirstPage colors={colors} />
        <SecondPage colors={colors} />
        <ThirdPage colors={colors} />
        <FourthPage colors={colors} />
      </ScrollView>
      <Pressable
        style={{
          position: "absolute",
          right: 0,
          margin: 5,
        }}
        onPress={() => goToPage(NUMBER_OF_SLIDES + 1)}
      >
        <Text style={{ color: "grey" }}>{"skip >>"}</Text>
      </Pressable>
      <View
        style={{
          marginTop: -50,
          zIndex: 20,
          alignSelf: "center",
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{ ...styles.previous, opacity: currentPage === 1 ? 0.4 : 1 }}
          onPress={() => goToPage(currentPage - 1)}
        >
          <ExpoLinearGradient
            colors={["#00bfa1", "#007cb0"]}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
          <Text style={styles.previousText}>{"< Previous"}</Text>
        </Pressable>
        <View style={styles.pager}>
          {new Array(NUMBER_OF_SLIDES).fill(1).map((_, i) => (
            <Pressable
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  i === currentPage - 1 ? colorPalate[i] : "transparent",
                borderWidth: 1,
                borderColor: "black",
                marginRight: i === NUMBER_OF_SLIDES - 1 ? 0 : 10,
              }}
              onPress={() => goToPage(i + 1)}
            ></Pressable>
          ))}
        </View>
        <Pressable
          style={{
            ...styles.next,
            borderWidth: currentPage === NUMBER_OF_SLIDES ? 2 : 0,
            borderColor: "#ffff00",
          }}
          onPress={() => goToPage(currentPage + 1)}
        >
          <ExpoLinearGradient
            colors={["#007cb0", "#00bfa1"]}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
          <Text
            style={{
              ...styles.nextText,
              color: currentPage === NUMBER_OF_SLIDES ? "yellow" : "white",
              fontWeight: currentPage === NUMBER_OF_SLIDES ? "bold" : "normal",
            }}
          >
            {currentPage === NUMBER_OF_SLIDES ? "Explore" : "Next >"}
          </Text>
        </Pressable>
      </View>
      <TouchHere
        x={width - 80}
        y={height - 40}
        visible={touchIndicator}
        onRequestClose={() => setTouchIndicator(false)}
        duration={4000}
        delay={2000}
        ringColor="#fff"
        handColor="#fff"
      />
    </View>
  );
};

export const FirstPage = ({ colors }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "lightblue" }]}>
      <ExpoLinearGradient
        colors={[colors.first.top, colors.first.bottom]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={styles.heading}>
        <Text style={{ ...styles.headingText, color: colors.first.textColor }}>
          Tired of working too much?
        </Text>
      </View>
      <WorkingSvg
        width={width - 10}
        height={width - 10}
        color={colors.first.bottom}
      />
      <View style={styles.bottom}>
        <Text
          style={{ ...styles.bottomText, color: colors.first.bottomTextColor }}
        >
          Try some relaxing animations and calm yourself down.
        </Text>
      </View>
    </View>
  );
};

export const SecondPage = ({ colors }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "lightgreen" }]}>
      <ExpoLinearGradient
        colors={[colors.second.top, colors.second.bottom]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading, marginBottom: 20 }}>
        <Text
          style={{
            ...styles.headingText,
            color: colors.second.textColor,
            fontSize: 23,
          }}
        >
          Who doesn't like watching beutiful flowers?
        </Text>
      </View>
      <FlowerSvg width={width - 10} height={width - 10} />
      <View style={styles.bottom}>
        <Text
          style={{ ...styles.bottomText, color: colors.second.bottomTextColor }}
        >
          Study shows that flower patterns calms our over acting brain. I have
          one beautiful one on this app.
        </Text>
      </View>
    </View>
  );
};

export const ThirdPage = ({ colors }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "#ffc0cb" }]}>
      <ExpoLinearGradient
        colors={[colors.third.top, colors.third.bottom]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading }}>
        <Text
          style={{
            ...styles.headingText,
            color: colors.third.textColor,
            fontSize: 23,
          }}
        >
          Doesn't like my color taste in app?
        </Text>
      </View>
      <CustomizationSvg
        width={width - 10}
        height={width - 10}
        color={colors.third.bottom}
      />
      <View style={styles.bottom}>
        <Text
          style={{
            ...styles.bottomText,
            color: colors.third.bottomTextColor,
            textAlign: "justify",
          }}
        >
          Use your creativity and create great color combination to enjoy
          absolutly stunning animations.
        </Text>
        <Text style={{ color: "grey", fontSize: 11, textAlign: "center" }}>
          I actually suck at it so I have to give customization.
        </Text>
      </View>
    </View>
  );
};

export const FourthPage = ({ colors }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "#fa0" }]}>
      <ExpoLinearGradient
        colors={[colors.fourth.top, colors.fourth.bottom]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading }}>
        <Text
          style={{
            ...styles.headingText,
            color: colors.fourth.textColor,
            fontSize: 23,
          }}
        >
          Concerned about your privacy?
        </Text>
      </View>
      <PrivacyProtectionSvg
        width={width - 10}
        height={width - 10}
        color={colors.fourth.bottom}
      />
      <View style={styles.bottom}>
        <Text
          style={{
            ...styles.bottomText,
            color: colors.fourth.bottomTextColor,
            fontSize: 17,
          }}
        >
          Don't worry. I don't colllect any data. Everything stays in local
          device. For more info visit information section inside app.
        </Text>
        <Text
          style={{
            ...styles.bottomText,
            color: colors.fourth.bottomTextColor,
            fontSize: 17,
            marginTop: 0,
          }}
        >
          See you inside.
        </Text>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  landing: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    width: "100%",
    paddingHorizontal: 30,
  },
  headingText: {
    fontSize: 28,
    color: "#4c43ff",
    textAlign: "center",
    fontWeight: "bold",
  },
  bottom: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 30,
  },
  bottomText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  pager: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  previous: {
    height: 40,
    width: 120,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  previousText: {
    color: "#fff",
    fontSize: 16,
  },
  next: {
    height: 40,
    width: 120,
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
});
