import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LoaderContext } from "../../Loader";

const Header = ({ navigation, title }) => {
  const { settings } = useContext(LoaderContext);
  const theme = settings.others.theme === "light";
  const themeColors = {
    backgroundColor: theme ? "#eee" : "#121212",
    color: theme ? "#121212" : "#eee",
  };
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      backgroundColor: themeColors.backgroundColor,
    },
    menuOptionCont: {
      padding: 5,
    },
    settingsOptionCont: {
      padding: 5,
    },
    title: {
      color: themeColors.color,
      fontSize: 20,
    },
  });
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        style={styles.menuOptionCont}
      >
        <MaterialCommunityIcons
          name="menu"
          size={26}
          color={themeColors.color}
        />
      </Pressable>
      <View style={styles.titleCont}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsOptionCont}
      >
        <MaterialIcons name="settings" size={26} color={themeColors.color} />
      </Pressable>
    </View>
  );
};

export default Header;
