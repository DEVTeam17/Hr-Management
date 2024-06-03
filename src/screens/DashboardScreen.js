import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { EventRegister } from "react-native-event-listeners";
import { useColorScheme } from "react-native";

import HomeScreen from "./HomeScreen";
import ActivityScreen from "./ActivityScreen";
import AttendenceScreen from "./AttendenceScreen";
import AnalyticScreen from "./AnalyticScreen";
import ProfileScreen from "./ProfileScreen";
import theme from "../context/theme";
import themeContext from "../context/themeContext";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  const colorScheme = useColorScheme();
  let systemColor;
  if (colorScheme === "light") {
    systemColor = false;
  } else {
    systemColor = true;
  }
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInActiveTintColor: "grey",
          headerShown: false,
        }}
        theme={darkMode === true ? DarkTheme : DefaultTheme}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Analytic"
          component={AnalyticScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="pie-chart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Attend"
          component={AttendenceScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="co-present" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={ActivityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="activity" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </themeContext.Provider>
  );
};

export default DashboardScreen;
