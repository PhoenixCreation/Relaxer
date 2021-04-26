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
import Divider from "./Components/Helpers/Divider";

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
  const { loading, firsttime, settings } = useContext(LoaderContext);

  if (loading) return <LoadingFlower />;

  if (firsttime) return <LandingPage />;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <DrawerComopnentCustom settings={settings} {...props} />
        )}
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

const DrawerComopnentCustom = (props) => {
  const { settings } = props;
  return (
    <DrawerContentScrollView
      style={{
        backgroundColor:
          settings.others.theme === "light" ? "white" : "#212121",
        color: settings.others.theme === "light" ? "black" : "white",
      }}
      {...props}
    >
      <View
        style={{
          width: "100%",
          height: 70,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Entypo
          name="flower"
          size={24}
          color={settings.others.theme === "light" ? "black" : "white"}
        />
        <Text
          style={{
            flex: 1,
            color: settings.others.theme === "light" ? "black" : "white",
            fontSize: 27,
            textAlign: "center",
          }}
        >
          Realxer
        </Text>
      </View>
      <Divider
        size={1}
        color={settings.others.theme === "light" ? "black" : "white"}
        margin={15}
      />
      <DrawerItemList
        activeTintColor={settings.others.theme === "light" ? "black" : "white"}
        inactiveTintColor={
          settings.others.theme === "light" ? "#313131" : "#c1c1c1"
        }
        {...props}
      />
    </DrawerContentScrollView>
  );
};

export default app;
