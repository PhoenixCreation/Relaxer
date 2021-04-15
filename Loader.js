import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const LoaderContext = createContext();

const defaultSettings = {
  freeBall: {
    ballColor1: "#ff0000",
    ballColor2: "#ffff00",
    backgroundColor1: "#ffffff",
    backgroundColor2: "#000000",
  },
  flower: {
    color1: "#00BFA1",
    color2: "#007CA0",
    additionalOptions: true,
  },
  others: {
    theme: "Light",
  },
};

const KEY = "@Relaxer_settings";

export const LoaderProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then((settings) => {
      setSettings(settings);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });
  }, []);

  const getSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY);
      if (!jsonValue) {
        await AsyncStorage.setItem(KEY, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
      return JSON.parse(jsonValue);
    } catch (error) {
      console.log("Settings Context Loading => " + error);
      return defaultSettings;
    }
  };

  const setNewSettings = async (newSettings) => {
    await AsyncStorage.setItem(KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
    if (newSettings === defaultSettings) {
      ToastAndroid.show("Default settings applied", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("Settings applied", ToastAndroid.LONG);
    }
  };

  const resetSettings = async () => {
    setNewSettings(defaultSettings);
  };

  return (
    <LoaderContext.Provider
      value={{ loading, settings, setNewSettings, resetSettings }}
    >
      {props.children}
    </LoaderContext.Provider>
  );
};
