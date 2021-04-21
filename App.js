import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Routes/Home";
import Flower from "./Routes/Flower";
import { Text, View } from "react-native";
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Test from "./Routes/Test";
import Settings from "./Routes/Settings";
import { LoaderProvider, LoaderContext } from "./Loader";
import LoadingFlower from "./Components/LoadingFlower";
import LandingPage from "./Routes/LandingPage";
import Inforrmation from "./Routes/Inforrmation";

const Drawer = createDrawerNavigator();

const app = () => {
  return (
    <LoaderProvider>
      <StatusBar hidden={true} />
      <Navigator />
    </LoaderProvider>
  );
};

const Navigator = () => {
  const { loading, firsttime } = useContext(LoaderContext);

  if (loading) return <LoadingFlower />;

  if (firsttime) return <LandingPage />;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={drawerComopnent}
        detachInactiveScreens={true}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            title: "Free Ball",
            drawerIcon: ({ focused, size }) => (
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                  borderColor: "black",
                  borderWidth: 1,
                  backgroundColor: focused ? "red" : "yellow",
                }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Flower"
          component={Flower}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="flower"
                size={size}
                color={focused ? "#00BFA1" : "#009CA0"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Test"
          component={Test}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="progress-wrench"
                size={size}
                color={focused ? "black" : "red"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="LandingPage"
          component={LandingPage}
          options={{
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="airplane-landing"
                size={size}
                color="#66f"
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Feather
                name="settings"
                size={size}
                color={focused ? "grey" : "black"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Information"
          component={Inforrmation}
          options={{
            title: "Support",
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? "information-outline" : "information"}
                size={size}
                color="black"
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const drawerComopnent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
          height: 70,
          borderBottomWidth: 2,
          borderRadius: 30,
          borderColor: "darkgrey",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo name="flower" size={24} color="black" />
        <Text
          style={{ flex: 1, color: "black", fontSize: 27, textAlign: "center" }}
        >
          Realxer
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default app;
