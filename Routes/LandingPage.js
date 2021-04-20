import React, { useRef, useState, useContext } from "react";
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

const { width, height } = Dimensions.get("window");

const NUMBER_OF_SLIDES = 4;

const colorPalate = ["#0000ff", "#004400", "#ff4444", "#ffb612"];

const LandingPage = () => {
  const { removeFirsttime } = useContext(LoaderContext);
  const scroll = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = async (index) => {
    if (index < 1 || index > NUMBER_OF_SLIDES + 1) return;
    if (index === NUMBER_OF_SLIDES + 1) {
      await removeFirsttime();
      return;
    }
    setCurrentPage(index);
    scroll.current?.scrollTo({ x: (index - 1) * width });
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
        <FirstPage goToPage={goToPage} />
        <SecondPage goToPage={goToPage} />
        <ThirdPage goToPage={goToPage} />
        <FourthPage goToPage={goToPage} />
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
            <View
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
            ></View>
          ))}
        </View>
        <Pressable
          style={{ ...styles.next }}
          onPress={() => goToPage(currentPage + 1)}
        >
          <ExpoLinearGradient
            colors={["#007cb0", "#00bfa1"]}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
          <Text style={styles.nextText}>
            {currentPage === NUMBER_OF_SLIDES ? "Explore" : "Next >"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const FirstPage = ({ goToPage }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "lightblue" }]}>
      <ExpoLinearGradient
        colors={["lightblue", "#66f"]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={styles.heading}>
        <Text style={styles.headingText}>Tired of working too much?</Text>
      </View>
      <WorkingSvg width={width - 10} height={width - 10} />
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Try some relaxing animations and calm yourself down.
        </Text>
      </View>
    </View>
  );
};

const SecondPage = ({ goToPage }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "lightgreen" }]}>
      <ExpoLinearGradient
        colors={["lightgreen", "#080"]}
        locations={[0.3, 1]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading, marginBottom: 20 }}>
        <Text style={{ ...styles.headingText, color: "#090", fontSize: 23 }}>
          Who doesn't like watching beutiful flowers?
        </Text>
      </View>
      <FlowerSvg width={width - 10} height={width - 10} />
      <View style={styles.bottom}>
        <Text style={{ ...styles.bottomText, color: "white" }}>
          Study shows that flower patterns calms our over acting brain.
        </Text>
      </View>
    </View>
  );
};

const ThirdPage = ({ goToPage }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "#ffc0cb" }]}>
      <ExpoLinearGradient
        colors={["#ffc0cb", "#ff908b"]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText, color: "#f44", fontSize: 23 }}>
          Doesn't like my color taste in app?
        </Text>
      </View>
      <CustomizationSvg width={width - 10} height={width - 10} />
      <View style={styles.bottom}>
        <Text
          style={{ ...styles.bottomText, color: "#333", textAlign: "justify" }}
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

const FourthPage = ({ goToPage }) => {
  return (
    <View style={[styles.landing, { backgroundColor: "#fa0" }]}>
      <ExpoLinearGradient
        colors={["#ffc200", "#ff8233"]}
        locations={[0.3, 1]}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View style={{ ...styles.heading }}>
        <Text style={{ ...styles.headingText, color: "#f62", fontSize: 23 }}>
          Concerned about your privacy?
        </Text>
      </View>
      <PrivacyProtectionSvg width={width - 10} height={width - 10} />
      <View style={styles.bottom}>
        <Text style={{ ...styles.bottomText, color: "#444", fontSize: 17 }}>
          Don't worry. I don't colllect any data. Everything stays in local
          device. For more info visit information section inside app. See you
          inside.
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