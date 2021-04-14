import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Routes/Home";
import Flower from "./Routes/Flower";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const app = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Flower" component={Flower} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default app;
