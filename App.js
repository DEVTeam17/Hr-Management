import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import { useColorScheme } from "react-native";

import theme from "./src/context/theme";
import themeContext from "./src/context/themeContext";
import OnBoardingOneScreen from "./src/screens/OnBoardingOneScreen";
import OnBoardingTwoScreen from "./src/screens/OnBoardingTwoScreen";
import OnBoardingThreeScreen from "./src/screens/OnBoardingThreeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AnalyticScreen from "./src/screens/AnalyticScreen";
import AttendenceScreen from "./src/screens/AttendenceScreen";
import AttendenceSuccessScreen from "./src/screens/AttendenceSuccessScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import PaySlipPinScreen from "./src/screens/PaySlipPinScreen";
import SalarySlipScreen from "./src/screens/SalarySlipScreen";
import ResignScreen from "./src/screens/ResignScreen";
import ResignFormScreen from "./src/screens/ResignFormScreen";
import TimeOffScreen from "./src/screens/TimeOffScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const colorScheme = useColorScheme();
  let systemColor;
  if (colorScheme === "light") {
    systemColor = false;
  } else {
    systemColor = true;
  }

  const [darkMode, setDarkMode] = useState(systemColor);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="OnBoardingOneScreen"
            component={OnBoardingOneScreen}
          />
          <Stack.Screen
            name="OnBoardingTwoScreen"
            component={OnBoardingTwoScreen}
          />
          <Stack.Screen
            name="OnBoardingThreeScreen"
            component={OnBoardingThreeScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AnalyticScreen" component={AnalyticScreen} />
          <Stack.Screen name="AttendenceScreen" component={AttendenceScreen} />
          <Stack.Screen
            name="AttendenceSuccessScreen"
            component={AttendenceSuccessScreen}
          />
          <Stack.Screen name="ActivityScreen" component={ActivityScreen} />
          <Stack.Screen name="PaySlipPinScreen" component={PaySlipPinScreen} />
          <Stack.Screen name="SalarySlipScreen" component={SalarySlipScreen} />
          <Stack.Screen name="ResignScreen" component={ResignScreen} />
          <Stack.Screen name="ResignFormScreen" component={ResignFormScreen} />
          <Stack.Screen name="TimeOffScreen" component={TimeOffScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

export default App;
