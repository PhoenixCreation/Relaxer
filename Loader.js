import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const LoaderContext = createContext();

const defaultSettings = {
  freeBall: {
    ballColor1: "#9800ff",
    ballColor2: "#003aff",
    backgroundColor1: "#ff9bea",
    backgroundColor2: "#ca00ff",
    springConstant: 5,
    scaleFactor: 1.6,
    vibration: true,
    string: true,
  },
  flower: {
    color1: "#00BFA1",
    color2: "#007CA0",
    additionalOptions: true,
  },
  others: {
    theme: "dark",
  },
};

const KEY = "@Relaxer_settings";
const FIRST_TIME_KEY = "@Relaxer_firsttime";

export const LoaderProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [firsttime, setFirsttime] = useState(false);

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
      const jsonValue = await AsyncStorage.multiGet([KEY, FIRST_TIME_KEY]);
      if (!jsonValue[1][1]) {
        setFirsttime(true);
      }
      if (!jsonValue[0][1]) {
        await AsyncStorage.setItem(KEY, JSON.stringify(defaultSettings));
        return defaultSettings;
      }
      return JSON.parse(jsonValue[0][1]);
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

  const removeFirsttime = async () => {
    await AsyncStorage.setItem(FIRST_TIME_KEY, "true");
    setFirsttime(false);
    return true;
  };

  return (
    <LoaderContext.Provider
      value={{
        loading,
        settings,
        setNewSettings,
        resetSettings,
        firsttime,
        removeFirsttime,
      }}
    >
      {props.children}
    </LoaderContext.Provider>
  );
};
