import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Routes/Home";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const app = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default app;
